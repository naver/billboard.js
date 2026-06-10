/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE, TYPE_BY_CATEGORY} from "../config/const";

type CanvasTarget = string | {id: string};
type CanvasTypeFilter = ($$, target: CanvasTarget) => boolean;
export const DENSE_SCATTER_POINT_CULL_THRESHOLD = 100000;
export type CanvasValueRange = {start: number, end: number};
export type CanvasPointOccupancyGrid = {
	data: Uint8Array,
	height: number,
	offset: number,
	width: number
};

/**
 * Get font size from canvas font shorthand.
 * `parseFloat()` alone fails for style/weight-prefixed shorthands like "bold 20px sans-serif".
 * @param {string} font Canvas font shorthand
 * @returns {number} Font size
 * @private
 */
export function getFontSize(font: string): number {
	const match = /(\d+(?:\.\d+)?)px/.exec(font);
	const size = match ? parseFloat(match[1]) : parseFloat(font);

	return Number.isFinite(size) ? size : 12;
}

/**
 * Get cached or generated shape indices for a canvas target type.
 * @param {object} $$ ChartInternal instance
 * @param {object} shape Cached draw shape object
 * @param {string} type Shape type key
 * @param {function} typeFilter Target type filter
 * @returns {object} Shape indices
 * @private
 */
export function getCanvasShapeIndices($$, shape, type: string, typeFilter): object {
	return shape.indices[type] || $$.getShapeIndices(typeFilter);
}

/**
 * Check if grouped data can be handled for a canvas target.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @param {Array} groupedTypeFilters Supported grouped target filters
 * @returns {boolean} Whether target is supported
 * @private
 */
export function isCanvasTargetSupported(
	$$,
	target: CanvasTarget,
	groupedTypeFilters: CanvasTypeFilter[] = []
): boolean {
	const id = typeof target === "string" ? target : target?.id;

	return !$$.isGrouped?.(id) || groupedTypeFilters.some(filter => filter($$, target));
}

/**
 * Get the effective chart type for a canvas target.
 * @param {object} config Config object
 * @param {object|string} target Data target, data row or id
 * @returns {string} Chart type
 * @private
 */
export function getCanvasTargetType(config, target?: CanvasTarget): string {
	const id = typeof target === "string" ? target : target?.id;

	return (id && config.data_types?.[id]) || config.data_type || TYPE.LINE;
}

/**
 * Convert a scale-domain value into a number usable for binary searches.
 * @param {number|Date|string} value Scale-domain value
 * @returns {number|null} Comparable number
 * @private
 */
export function getCanvasComparableValue(value): number | null {
	const comparable = +value;

	return Number.isFinite(comparable) ? comparable : null;
}

/**
 * Get the current comparable x domain.
 * @param {object} $$ ChartInternal instance
 * @returns {Array|null} Comparable domain
 * @private
 */
export function getCanvasComparableXDomain($$): [number, number] | null {
	const domain = ($$.scale.zoom || $$.scale.x)?.domain?.();
	const start = getCanvasComparableValue(domain?.[0]);
	const end = getCanvasComparableValue(domain?.[1]);

	return start === null || end === null ? null : [Math.min(start, end), Math.max(start, end)];
}

/**
 * Get the row x value as a comparable number.
 * @param {object} row Data row
 * @returns {number|null} Comparable x value
 * @private
 */
function getComparableRowX(row): number | null {
	return getCanvasComparableValue(row?.x);
}

/**
 * Find the first sorted row whose x value is not before the target.
 * @param {Array} values Data rows sorted by x
 * @param {number} target Target x value
 * @param {boolean} ascending Whether rows are ascending by x
 * @returns {number} Row index
 * @private
 */
function lowerBoundCanvasRows(values, target: number, ascending: boolean): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = (low + high) >> 1;
		const value = getComparableRowX(values[mid]);

		if (value === null) {
			return 0;
		}

		if (ascending ? value < target : value > target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * Find the first sorted row whose x value is after the target.
 * @param {Array} values Data rows sorted by x
 * @param {number} target Target x value
 * @param {boolean} ascending Whether rows are ascending by x
 * @returns {number} Row index
 * @private
 */
function upperBoundCanvasRows(values, target: number, ascending: boolean): number {
	let low = 0;
	let high = values.length;

	while (low < high) {
		const mid = (low + high) >> 1;
		const value = getComparableRowX(values[mid]);

		if (value === null) {
			return values.length;
		}

		if (ascending ? value <= target : value >= target) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
}

/**
 * Get the visible row range for the current x domain.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {number} padding Extra rows to include around the domain edge
 * @returns {object} Half-open row range
 * @private
 */
export function getCanvasTargetVisibleRange($$, target, padding = 1): CanvasValueRange {
	const values = target?.values || [];
	const fullRange = {start: 0, end: values.length};
	const domain = getCanvasComparableXDomain($$);

	if (!values.length || !domain) {
		return fullRange;
	}

	const state = $$.state;
	const cache = state._canvasVisibleRangeCache ||
		(state._canvasVisibleRangeCache = new Map<
			string,
			{key: string, range: CanvasValueRange}
		>());
	const key = [
		target.id,
		values.length,
		state.dataGeneration,
		domain[0],
		domain[1],
		padding
	].join(":");
	const cached = cache.get(target.id);

	if (cached?.key === key) {
		return cached.range;
	}

	const first = getComparableRowX(values[0]);
	const last = getComparableRowX(values[values.length - 1]);

	if (first === null || last === null) {
		return fullRange;
	}

	const ascending = first <= last;
	const start = lowerBoundCanvasRows(values, domain[0], ascending);
	const end = upperBoundCanvasRows(values, domain[1], ascending);
	const range = {
		start: Math.max(0, Math.min(start, end) - padding),
		end: Math.min(values.length, Math.max(start, end) + padding)
	};

	cache.set(target.id, {key, range});

	return range;
}

/**
 * Check if a target should be handled as a canvas bar.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is a bar
 * @private
 */
export function isCanvasBarType($$, target: CanvasTarget): boolean {
	return getCanvasTargetType($$.config, target) === TYPE.BAR;
}

/**
 * Check if a target should be handled as a canvas area.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is an area
 * @private
 */
export function isCanvasAreaType($$, target: CanvasTarget): boolean {
	return TYPE_BY_CATEGORY.Area.indexOf(getCanvasTargetType($$.config, target)) > -1;
}

/**
 * Check if a target should be handled as a canvas line.
 * Area charts are line-like because they also draw a stroke and points.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is line-like
 * @private
 */
export function isCanvasLineType($$, target: CanvasTarget): boolean {
	const type = getCanvasTargetType($$.config, target);

	return TYPE_BY_CATEGORY.Line.indexOf(type) > -1;
}

/**
 * Check if a target should be handled as a canvas scatter point.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is scatter
 * @private
 */
export function isCanvasScatterType($$, target: CanvasTarget): boolean {
	return getCanvasTargetType($$.config, target) === TYPE.SCATTER;
}

/**
 * Check if a target should be handled as a canvas bubble point.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is bubble
 * @private
 */
export function isCanvasBubbleType($$, target: CanvasTarget): boolean {
	return getCanvasTargetType($$.config, target) === TYPE.BUBBLE;
}

/**
 * Check if a target should be handled as a canvas point.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is point-like
 * @private
 */
export function isCanvasPointType($$, target: CanvasTarget): boolean {
	return isCanvasLineType($$, target) ||
		isCanvasScatterType($$, target) ||
		isCanvasBubbleType($$, target);
}

/**
 * Check if a target should be handled as a canvas candlestick.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is candlestick
 * @private
 */
export function isCanvasCandlestickType($$, target: CanvasTarget): boolean {
	return getCanvasTargetType($$.config, target) === TYPE.CANDLESTICK;
}

/**
 * Check if a target should be handled as a canvas treemap.
 * @param {object} $$ ChartInternal instance
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether target is treemap
 * @private
 */
export function isCanvasTreemapType($$, target: CanvasTarget): boolean {
	return getCanvasTargetType($$.config, target) === TYPE.TREEMAP;
}

/**
 * Check if data groups can be rendered for the target in canvas mode.
 * @param {object} config Config object
 * @param {object|string} target Data target, data row or id
 * @returns {boolean} Whether grouped rendering is supported
 * @private
 */
export function isCanvasGroupedType(config, target: CanvasTarget): boolean {
	const type = getCanvasTargetType(config, target);

	return type === TYPE.BAR || TYPE_BY_CATEGORY.Area.indexOf(type) > -1;
}

/**
 * Check if a data row has a drawable base value.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {boolean} Whether the row can be drawn or hit-tested
 * @private
 */
export function hasCanvasDrawableValue($$, d): boolean {
	const value = $$.getBaseValue(d);

	return value !== null && value !== undefined;
}

/**
 * Check if coordinates can be used on canvas.
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @returns {boolean} Whether both coordinates are finite
 * @private
 */
export function isFiniteCanvasCoordinate(x: number, y: number): boolean {
	return Number.isFinite(x) && Number.isFinite(y);
}

/**
 * Create an occupancy grid for dense point center culling.
 * @param {number} width Plot width
 * @param {number} height Plot height
 * @param {number} radius Point radius
 * @returns {object} Occupancy grid
 * @private
 */
export function createCanvasPointOccupancyGrid(
	width: number,
	height: number,
	radius: number
): CanvasPointOccupancyGrid {
	const offset = Math.ceil(radius) + 1;
	const gridWidth = Math.max(1, Math.ceil(width) + (offset * 2) + 1);
	const gridHeight = Math.max(1, Math.ceil(height) + (offset * 2) + 1);

	return {
		data: new Uint8Array(gridWidth * gridHeight),
		height: gridHeight,
		offset,
		width: gridWidth
	};
}

/**
 * Mark a point center in the occupancy grid.
 * @param {object} grid Occupancy grid
 * @param {number} x Point x coordinate
 * @param {number} y Point y coordinate
 * @returns {boolean} Whether this center has not been marked yet
 * @private
 */
export function markCanvasPointOccupancy(
	grid: CanvasPointOccupancyGrid,
	x: number,
	y: number
): boolean {
	const px = Math.round(x) + grid.offset;
	const py = Math.round(y) + grid.offset;

	if (px < 0 || px >= grid.width || py < 0 || py >= grid.height) {
		return false;
	}

	const index = py * grid.width + px;

	if (grid.data[index]) {
		return false;
	}

	grid.data[index] = 1;
	return true;
}
