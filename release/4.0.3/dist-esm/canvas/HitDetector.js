/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { getTreemapNodeRect } from '../ChartInternal/shape/core/geometry.js';
import { TYPE } from '../config/const.js';
import { getCanvasBarGeometry, getCanvasCandlestickGeometry } from './geometry.js';
import { isCanvasScatterType, isCanvasBubbleType, isCanvasTreemapType, isFiniteCanvasCoordinate, isCanvasBarType, getCanvasShapeIndices, isCanvasTargetSupported, getCanvasTargetVisibleRange, hasCanvasDrawableValue, isCanvasCandlestickType, isCanvasPointType, markCanvasPointOccupancy, createCanvasPointOccupancyGrid, DENSE_SCATTER_POINT_CULL_THRESHOLD } from './util.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Canvas-only spatial hit fallback. SVG point hit testing resolves from point_sensitivity;
// this keeps the point hit grid usable before a per-point sensitivity is known.
const HIT_DISTANCE = 24;
// Canvas-only spatial index bucket for rectangular shapes. SVG relies on DOM geometry,
// while canvas scans grid candidates; 64px balances bucket count and candidate length.
const BAR_CELL_SIZE = 64;
const HIT_GROUPED_TYPE_FILTERS = [
    isCanvasPointType,
    isCanvasBarType,
    isCanvasCandlestickType
];
/**
 * Get spatial grid cell coordinate.
 * @param {number} value Pixel coordinate
 * @param {number} size Cell size
 * @returns {number} Cell coordinate
 * @private
 */
function getCell(value, size) {
    return Math.floor(value / size);
}
/**
 * Add hit item to spatial grid cells it covers.
 * @param {Map} grid Spatial grid
 * @param {object} item Hit item
 * @param {number} size Cell size
 * @private
 */
function addGridItem(grid, item, size) {
    const minX = getCell(item.x, size);
    const maxX = getCell(item.x + (item.w ?? 0), size);
    const minY = getCell(item.y, size);
    const maxY = getCell(item.y + (item.h ?? 0), size);
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const key = `${x}:${y}`;
            const items = grid.get(key);
            items ? items.push(item) : grid.set(key, [item]);
        }
    }
}
/**
 * Get hit items around a coordinate from spatial grid.
 * @param {Map} grid Spatial grid
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} size Cell size
 * @param {number} radius Neighbor cell radius
 * @returns {Array} Candidate hit items
 * @private
 */
function getGridItems(grid, x, y, size, radius = 0) {
    const cellX = getCell(x, size);
    const cellY = getCell(y, size);
    const items = [];
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            const values = grid.get(`${cellX + dx}:${cellY + dy}`);
            if (values?.length) {
                for (let i = 0; i < values.length; i++) {
                    items.push(values[i]);
                }
            }
        }
    }
    return items;
}
/**
 * Get point hit sensitivity, avoiding radius work for fixed numeric sensitivity.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {number} Hit sensitivity
 * @private
 */
function getPointHitSensitivity($$, d) {
    const sensitivity = $$.config.point_sensitivity;
    if (Number.isFinite(sensitivity)) {
        return sensitivity;
    }
    $$.pointR?.(d);
    const resolved = $$.getPointSensitivity?.(d) ?? HIT_DISTANCE;
    return Number.isFinite(resolved) ? resolved : HIT_DISTANCE;
}
/**
 * Check whether point hit grid can use the same visible-center culling as dense scatter draw.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {boolean} Whether hit points can be culled
 * @private
 */
function shouldCullDenseScatterHitPoints($$, target) {
    return isCanvasScatterType($$, target) &&
        target.values.length > DENSE_SCATTER_POINT_CULL_THRESHOLD &&
        !$$.config.data_selection_enabled &&
        Number.isFinite($$.config.point_sensitivity) &&
        Number.isFinite($$.config.point_r);
}
/**
 * Build and query canvas hit-test indexes.
 * @private
 */
class HitDetector {
    bars = [];
    points = [];
    indices = [];
    barGrid = new Map();
    pointGrid = new Map();
    plot = { x: 0, y: 0, w: 0, h: 0 };
    pointCellSize = HIT_DISTANCE;
    maxPointSensitivity = HIT_DISTANCE;
    grouped = false;
    pointBased = false;
    indexAxis = "x";
    /**
     * Rebuild hit-test indexes from current chart geometry.
     * @param {object} $$ ChartInternal instance
     * @param {object} shape Cached draw shape object
     * @private
     */
    rebuild($$, shape) {
        const { current, margin, width, height } = $$.state;
        const targets = $$.filterTargetsToShow();
        this.bars = [];
        this.points = [];
        this.indices = [];
        this.barGrid = new Map();
        this.pointGrid = new Map();
        this.maxPointSensitivity = HIT_DISTANCE;
        this.indexAxis = $$.config.axis_rotated ? "y" : "x";
        this.plot = $$.state.hasTreemap ?
            { x: 0, y: 0, w: current.width, h: current.height } :
            { x: margin.left, y: margin.top, w: width, h: height };
        this.grouped = !!$$.config.tooltip_grouped && !$$.state.hasTreemap;
        this.pointBased = !($$.config.axis_x_forceAsSingle && this.grouped) && (!!$$.isMultipleX?.() ||
            targets.some(target => isCanvasScatterType($$, target) || isCanvasBubbleType($$, target)));
        const needsIndex = this.grouped &&
            (!this.pointBased ||
                ($$.config.data_selection_enabled && $$.config.data_selection_grouped));
        const indexMap = needsIndex ? new Map() : null;
        const addIndex = (x, y, data) => {
            if (!indexMap) {
                return;
            }
            const key = $$.getXCacheKey?.(data.x) ?? data.index;
            if (Number.isFinite(data.index) && !indexMap.has(key) &&
                isFiniteCanvasCoordinate(x, y)) {
                indexMap.set(key, { x, y, data });
            }
        };
        if ($$.state.hasTreemap) {
            const root = $$.getTreemapRoot?.($$.data.targets);
            const nodes = root?.children || [];
            for (const node of nodes) {
                const { data } = node;
                if (!isCanvasTreemapType($$, data)) {
                    continue;
                }
                const { x, y, w, h } = getTreemapNodeRect($$, node, root, true);
                if (!isFiniteCanvasCoordinate(x, y) ||
                    !isFiniteCanvasCoordinate(x + w, y + h)) {
                    continue;
                }
                this.addBar({ x, y, w, h, data });
            }
            this.indices = [];
            return;
        }
        if (shape.indices[TYPE.BAR] || targets.some(isCanvasBarType.bind(null, $$))) {
            const isBar = isCanvasBarType.bind(null, $$);
            const indices = getCanvasShapeIndices($$, shape, TYPE.BAR, isBar);
            const getPoints = $$.generateGetBarPoints(indices, false);
            targets
                .filter(isBar)
                .filter(target => isCanvasTargetSupported($$, target, HIT_GROUPED_TYPE_FILTERS))
                .forEach(target => {
                const range = getCanvasTargetVisibleRange($$, target);
                for (let i = range.start; i < range.end; i++) {
                    const d = target.values[i];
                    if (!hasCanvasDrawableValue($$, d)) {
                        continue;
                    }
                    const geometry = getCanvasBarGeometry($$, getPoints, d, i);
                    if (!geometry) {
                        continue;
                    }
                    const { rect } = geometry;
                    const x = margin.left + rect.x;
                    const y = margin.top + rect.y;
                    const { w, h } = rect;
                    this.addBar({ x, y, w, h, data: d });
                    addIndex(x + w / 2, y + h / 2, d);
                }
            });
        }
        if (shape.indices[TYPE.CANDLESTICK] ||
            targets.some(isCanvasCandlestickType.bind(null, $$))) {
            const isCandlestick = isCanvasCandlestickType.bind(null, $$);
            const indices = getCanvasShapeIndices($$, shape, TYPE.CANDLESTICK, isCandlestick);
            const getPoints = $$.generateGetCandlestickPoints?.(indices, false);
            if (getPoints) {
                targets
                    .filter(isCandlestick)
                    .filter(target => isCanvasTargetSupported($$, target, HIT_GROUPED_TYPE_FILTERS))
                    .forEach(target => {
                    const range = getCanvasTargetVisibleRange($$, target);
                    for (let i = range.start; i < range.end; i++) {
                        const d = target.values[i];
                        const value = $$.getCandlestickData?.(d);
                        if (!value) {
                            continue;
                        }
                        const geometry = getCanvasCandlestickGeometry($$, getPoints, d, i);
                        if (!geometry) {
                            continue;
                        }
                        const { body: rect } = geometry;
                        const x = margin.left + rect.x;
                        const y = margin.top + rect.y;
                        const { w, h } = rect;
                        this.addBar({
                            x,
                            y,
                            w: Math.max(1, w),
                            h: Math.max(1, h),
                            data: d
                        });
                        addIndex(x + w / 2, y + h / 2, d);
                    }
                });
            }
        }
        const { cx, cy } = shape.pos;
        if (cx && cy) {
            targets
                .filter(isCanvasPointType.bind(null, $$))
                .filter(target => isCanvasTargetSupported($$, target, HIT_GROUPED_TYPE_FILTERS))
                .forEach(target => {
                const range = getCanvasTargetVisibleRange($$, target);
                const occupancy = shouldCullDenseScatterHitPoints($$, target) ?
                    createCanvasPointOccupancyGrid(width, height, $$.config.point_r) :
                    null;
                for (let i = range.start; i < range.end; i++) {
                    const d = target.values[i];
                    if (!hasCanvasDrawableValue($$, d)) {
                        continue;
                    }
                    const x = margin.left + cx(d, i);
                    const y = margin.top + cy(d, i);
                    const sensitivity = getPointHitSensitivity($$, d);
                    if (!isFiniteCanvasCoordinate(x, y)) {
                        continue;
                    }
                    if (occupancy &&
                        !markCanvasPointOccupancy(occupancy, x - margin.left, y - margin.top)) {
                        continue;
                    }
                    this.addPoint({
                        x,
                        y,
                        sensitivity,
                        data: d
                    });
                    addIndex(x, y, d);
                }
            });
        }
        this.buildPointGrid();
        this.indices = indexMap ?
            Array.from(indexMap.values())
                .sort((a, b) => a[this.indexAxis] - b[this.indexAxis]) :
            [];
    }
    /**
     * Hit-test bars at the given canvas coordinates.
     * @param {number} mx Mouse x coordinate
     * @param {number} my Mouse y coordinate
     * @returns {object|null} Matching data row
     * @private
     */
    hitBar(mx, my) {
        for (const item of getGridItems(this.barGrid, mx, my, BAR_CELL_SIZE)) {
            const { w = 0, h = 0 } = item;
            if (mx >= item.x &&
                mx <= item.x + w &&
                my >= item.y &&
                my <= item.y + h) {
                return item.data;
            }
        }
        return null;
    }
    /**
     * Find the nearest point within sensitivity at the given canvas coordinates.
     * @param {number} mx Mouse x coordinate
     * @param {number} my Mouse y coordinate
     * @returns {object|null} Matching data row
     * @private
     */
    hitPoint(mx, my) {
        let nearest = null;
        let min = Number.POSITIVE_INFINITY;
        for (const item of getGridItems(this.pointGrid, mx, my, this.pointCellSize, 1)) {
            const dx = item.x - mx;
            const dy = item.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const sensitivity = item.sensitivity ?? HIT_DISTANCE;
            if (dist <= sensitivity && dist < min) {
                min = dist;
                nearest = item;
            }
        }
        return nearest?.data ?? null;
    }
    /**
     * Find the nearest data row for the given canvas coordinates.
     * @param {number} mx Mouse x coordinate
     * @param {number} my Mouse y coordinate
     * @returns {object|null} Matching data row
     * @private
     */
    findNearest(mx, my) {
        const bar = this.hitBar(mx, my);
        if (bar) {
            return bar;
        }
        if (!this.pointBased && this.grouped && this.isWithinPlot(mx, my)) {
            const item = this.findNearestIndexItem(mx, my);
            if (item) {
                return item.data;
            }
        }
        return this.hitPoint(mx, my);
    }
    /**
     * Find the nearest directly hit shape row, excluding grouped index fallback.
     * @param {number} mx Mouse x coordinate
     * @param {number} my Mouse y coordinate
     * @returns {object|null} Matching data row
     * @private
     */
    findNearestShape(mx, my) {
        return this.hitBar(mx, my) ?? this.hitPoint(mx, my);
    }
    /**
     * Find the nearest grouped x-index row for an axis-adjacent pointer coordinate.
     * @param {number} mx Mouse x coordinate
     * @param {number} my Mouse y coordinate
     * @returns {object|null} Matching data row
     * @private
     */
    findNearestIndexByCoord(mx, my) {
        return this.findNearestIndexItem(mx, my)?.data ?? null;
    }
    /**
     * Find data rows included by a rectangular selection area.
     * @param {object} rect Selection rectangle in canvas coordinates
     * @param {boolean} grouped Whether to match by the index axis only
     * @returns {Array} Matching data rows
     * @private
     */
    findInRect(rect, grouped = false) {
        const x1 = Math.min(rect.x, rect.x + rect.w);
        const x2 = Math.max(rect.x, rect.x + rect.w);
        const y1 = Math.min(rect.y, rect.y + rect.h);
        const y2 = Math.max(rect.y, rect.y + rect.h);
        const seen = new Set();
        const data = [];
        const add = (item) => {
            const d = item.data;
            const key = `${d.id}:${d.index}`;
            if (!seen.has(key)) {
                seen.add(key);
                data.push(d);
            }
        };
        if (grouped) {
            const axis = this.indexAxis;
            const min = axis === "y" ? y1 : x1;
            const max = axis === "y" ? y2 : x2;
            this.indices
                .filter(item => item[axis] >= min && item[axis] <= max)
                .forEach(add);
            return data;
        }
        this.bars
            .filter(item => {
            const w = item.w ?? 0;
            const h = item.h ?? 0;
            return !(x2 < item.x || item.x + w < x1) &&
                !(y2 < item.y || item.y + h < y1);
        })
            .forEach(add);
        this.points
            .filter(item => item.x >= x1 && item.x <= x2 && item.y >= y1 && item.y <= y2)
            .forEach(add);
        return data;
    }
    /**
     * Add bar-like hit item and register its grid coverage.
     * @param {object} item Hit item
     * @private
     */
    addBar(item) {
        this.bars.push(item);
        addGridItem(this.barGrid, item, BAR_CELL_SIZE);
    }
    /**
     * Add point-like hit item.
     * @param {object} item Hit item
     * @private
     */
    addPoint(item) {
        const sensitivity = item.sensitivity ?? HIT_DISTANCE;
        this.maxPointSensitivity = Math.max(this.maxPointSensitivity, sensitivity);
        this.points.push(item);
    }
    /**
     * Build point spatial grid after the maximum sensitivity is known.
     * @private
     */
    buildPointGrid() {
        this.pointCellSize = Math.max(1, this.maxPointSensitivity);
        this.pointGrid = new Map();
        for (const point of this.points) {
            addGridItem(this.pointGrid, point, this.pointCellSize);
        }
    }
    /**
     * Check if coordinates are inside the plot area.
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {boolean} Whether the coordinates are inside the plot
     * @private
     */
    isWithinPlot(x, y) {
        const { plot } = this;
        return x >= plot.x &&
            x <= plot.x + plot.w &&
            y >= plot.y &&
            y <= plot.y + plot.h;
    }
    /**
     * Find the nearest indexed data row by current index-axis coordinate.
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @returns {object|null} Matching hit item
     * @private
     */
    findNearestIndexItem(x, y) {
        const { indexAxis, indices } = this;
        const value = indexAxis === "y" ? y : x;
        if (!indices.length) {
            return null;
        }
        let start = 0;
        let end = indices.length - 1;
        while (start < end) {
            const mid = (start + end) >> 1;
            if (indices[mid][indexAxis] < value) {
                start = mid + 1;
            }
            else {
                end = mid;
            }
        }
        const current = indices[start];
        const previous = indices[start - 1];
        return previous &&
            Math.abs(previous[indexAxis] - value) < Math.abs(current[indexAxis] - value) ?
            previous :
            current;
    }
}

export { HitDetector as default };
