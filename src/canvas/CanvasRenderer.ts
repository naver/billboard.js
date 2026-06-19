/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	getBarRadiusInfo,
	getBarRadiusResolver,
	getStackingBarRadiusSet
} from "../ChartInternal/shape/core/barRadius";
import {getLineRegionSegments} from "../ChartInternal/shape/core/dataRegion";
import {
	getRenderDataPoint,
	getRenderPoint,
	getShapePoint,
	getTreemapLabelText,
	getTreemapNodeRect
} from "../ChartInternal/shape/core/geometry";
import {generateDrawAreaPath, generateDrawLinePath} from "../ChartInternal/shape/core/path";
import {SUBCHART_BRUSH_HANDLE_PATH, TYPE} from "../config/const";
import {window} from "../module/browser";
import {asHalfPixel, isFunction, isNumber, isObject, isString} from "../module/util";
import CanvasEngine from "./CanvasEngine";
import CanvasPainter, {CanvasRect} from "./CanvasPainter";
import CanvasTheme from "./CanvasTheme";
import {withOpacity} from "./color";
import {getCanvasBarGeometry, getCanvasCandlestickGeometry} from "./geometry";
import {
	drawLabelDecorations,
	getExpandedFocusMatcher,
	getLabelColor,
	getLabelDecorationBox,
	getLabelImageOption,
	getLabelImagePosition,
	getLabelImageUrl,
	getLabelPosition,
	getLabelText,
	getPointLabelAnchor,
	getRotatedLabelPosition,
	type LabelImageCacheEntry
} from "./labels";
import {CanvasPointPattern, drawPointPattern} from "./pointPattern";
import {
	createCanvasPointOccupancyGrid,
	DENSE_SCATTER_POINT_CULL_THRESHOLD,
	getCanvasShapeIndices,
	getCanvasTargetVisibleRange,
	getFontSize,
	hasCanvasDrawableValue,
	isCanvasAreaType,
	isCanvasBarType,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasLineType,
	isCanvasPointType,
	isCanvasScatterType,
	isCanvasTargetSupported,
	isCanvasTreemapType,
	isFiniteCanvasCoordinate,
	markCanvasPointOccupancy
} from "./util";

const RENDERER_GROUPED_TYPE_FILTERS = [
	isCanvasAreaType,
	isCanvasBarType,
	isCanvasPointType,
	isCanvasCandlestickType
];
// Small point series are faster as one batched path; beyond this, huge paths make
// fill() expensive, so canvas draws circles individually. SVG has no equivalent knob.
const MAX_BATCHED_CIRCLE_POINTS = 1000;
const canvasFocusLookupCache = new WeakMap<any[], Map<string, any>>();
const subchartBrushHandlePathCache = new Map<string, Path2D>();

type BarConnectLineType = "start-start" | "start-end" | "end-start" | "end-end";
type CanvasBarConnectLineBox = {x: number, y: number, width: number, height: number};
type CanvasBackgroundClassStyle = {opacity?: number, transform?: string};
type CanvasBackgroundImageRect = {x: number, y: number, w: number, h: number};
type CanvasLinearGradientShape = "area" | "bar";
type CanvasLinearGradientOption = boolean | {
	x?: [number, number],
	y?: [number, number],
	stops?: [number, string | null | Function, number][]
};

/**
 * Apply a CSS matrix transform to a canvas context.
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {string} transform CSS transform value
 * @private
 */
function applyCssMatrixTransform(ctx: CanvasRenderingContext2D, transform?: string): void {
	if (!transform || transform === "none") {
		return;
	}

	const matrix = transform.match(/^matrix\(([^)]+)\)$/);
	const matrix3d = transform.match(/^matrix3d\(([^)]+)\)$/);

	if (matrix) {
		const values = matrix[1].split(",").map(value => Number(value.trim()));

		values.length === 6 &&
			values.every(Number.isFinite) &&
			ctx.transform(values[0], values[1], values[2], values[3], values[4], values[5]);
	} else if (matrix3d) {
		const values = matrix3d[1].split(",").map(value => Number(value.trim()));

		values.length === 16 &&
			values.every(Number.isFinite) &&
			ctx.transform(values[0], values[1], values[4], values[5], values[12], values[13]);
	}
}

/**
 * Get SVG image equivalent destination rect for canvas background.
 * @param {HTMLImageElement} image Image element
 * @param {number} width Background viewport width
 * @param {number} height Background viewport height
 * @returns {object} Destination rect
 * @private
 */
function getPreservedAspectRatioRect(
	image: HTMLImageElement,
	width: number,
	height: number
): CanvasBackgroundImageRect {
	const imageWidth = image.naturalWidth || image.width;
	const imageHeight = image.naturalHeight || image.height;

	if (!imageWidth || !imageHeight || !width || !height) {
		return {x: 0, y: 0, w: width, h: height};
	}

	const scale = Math.min(width / imageWidth, height / imageHeight);
	const w = imageWidth * scale;
	const h = imageHeight * scale;

	return {
		x: (width - w) / 2,
		y: (height - h) / 2,
		w,
		h
	};
}

/**
 * Get SVG main group translate offset for canvas background image parity.
 * @param {object} $$ ChartInternal instance
 * @returns {object} Main group offset
 * @private
 */
function getBackgroundImageOffset($$): {x: number, y: number} {
	const {state} = $$;

	return state.hasFunnel || state.hasTreemap ? {x: 0, y: 0} : {
		x: asHalfPixel(state.margin.left),
		y: asHalfPixel(state.margin.top)
	};
}

/**
 * Draw a canvas line target directly from common geometry.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {object} indices Shape indices
 * @param {CanvasPainter} painter Canvas painter
 * @param {boolean} isSub Whether to use subchart scales
 * @private
 */
function drawCanvasLine($$, target, indices, painter: CanvasPainter, isSub = false): void {
	painter.strokePath(ctx => {
		generateDrawLinePath($$, indices, isSub, ctx)(target);
	}, {lineDash: []});
}

/**
 * Draw a canvas area target directly from common geometry.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {object} indices Shape indices
 * @param {CanvasPainter} painter Canvas painter
 * @param {boolean} isSub Whether to use subchart scales
 * @private
 */
function drawCanvasArea($$, target, indices, painter: CanvasPainter, isSub = false): void {
	painter.fillPath(ctx => {
		generateDrawAreaPath($$, indices, isSub, ctx)(target);
	});
}

/**
 * Get a target copy clipped to the current visible x range.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {object} Original target or a visible values copy
 * @private
 */
function getVisibleCanvasTarget($$, target) {
	const range = getCanvasTargetVisibleRange($$, target);

	return range.start === 0 && range.end === target.values.length ? target : {
		...target,
		values: target.values.slice(range.start, range.end)
	};
}

/**
 * Get focused row for a datum or target.
 * @param {Array} focusData Focused data rows
 * @param {object} d Rendered data row or target
 * @returns {object|null}
 * @private
 */
function getFocusedCanvasDatum(focusData, d) {
	if (!focusData?.length || !d?.id) {
		return null;
	}

	let lookup = canvasFocusLookupCache.get(focusData);

	if (!lookup) {
		lookup = new Map();

		for (const focus of focusData) {
			if (!focus?.id) {
				continue;
			}

			const targetKey = `${focus.id}:*`;

			if (!lookup.has(targetKey)) {
				lookup.set(targetKey, focus);
			}

			if ("index" in focus) {
				lookup.set(`${focus.id}:${focus.index}`, focus);
			}
		}

		canvasFocusLookupCache.set(focusData, lookup);
	}

	return "index" in d ?
		lookup.get(`${d.id}:${d.index}`) || null :
		lookup.get(`${d.id}:*`) || null;
}

/**
 * Get cached Path2D for a subchart brush handle.
 * @param {string} axis Brush axis
 * @param {string} type Brush handle side
 * @returns {Path2D|null}
 * @private
 */
function getSubchartBrushHandlePath(axis: "x" | "y", type: "start" | "end"): Path2D | null {
	const Path2DCtor = window.Path2D;

	if (!Path2DCtor) {
		return null;
	}

	const key = `${axis}:${type}`;
	const cached = subchartBrushHandlePathCache.get(key);

	if (cached) {
		return cached;
	}

	const path = new Path2DCtor(SUBCHART_BRUSH_HANDLE_PATH[axis][type]);

	subchartBrushHandlePathCache.set(key, path);

	return path;
}

/**
 * Resolve color.onover for a focused data row.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Focused data row
 * @returns {string|null}
 * @private
 */
function getCanvasOverColor($$, d): string | null {
	const onover = $$.config.color_onover;

	if (!onover || !d) {
		return null;
	}

	if (isObject(onover)) {
		return d.id in onover ? onover[d.id] : null;
	} else if (isString(onover)) {
		return onover;
	} else if (isFunction(onover)) {
		return onover.call($$.api, d);
	}

	return null;
}

/**
 * Resolve a target/datum color, including color.onover focus color.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data target or row
 * @param {Array} focusData Focused data rows
 * @returns {string}
 * @private
 */
function getCanvasRenderColor($$, d, focusData?): string {
	const focus = getFocusedCanvasDatum(focusData, d);
	const overColor = getCanvasOverColor($$, focus);

	return overColor || $$.color(d.id);
}

/**
 * Get target id from a data target or row.
 * @param {object} d Data target or row
 * @returns {string|undefined} Target id
 * @private
 */
function getCanvasTargetId(d): string | undefined {
	return d?.id || d?.data?.id;
}

/**
 * Check whether the canvas target is focused.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data target or row
 * @returns {boolean} Whether target is focused
 * @private
 */
function isCanvasTargetFocused($$, d): boolean {
	const id = getCanvasTargetId(d);

	return !!id && $$.state.focusedTargetIds?.has(id);
}

/**
 * Get SVG-compatible target focus opacity.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data target or row
 * @returns {number} Target opacity
 * @private
 */
function getCanvasTargetFocusOpacity($$, d): number {
	const id = getCanvasTargetId(d);

	return id && $$.state.defocusedTargetIds?.has(id) ?
		$$.canvasTheme.style.shape.targetDefocusedOpacity :
		1;
}

/**
 * Get normalized bounding box for area gradient coordinates.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {object} indices Shape indices
 * @param {boolean} isSub Whether to use subchart scales
 * @returns {object|null}
 * @private
 */
function getCanvasAreaBounds($$, target, indices, isSub = false): CanvasRect | null {
	const getPoints = $$.generateGetAreaPoints?.(indices, isSub);

	if (!getPoints) {
		return null;
	}

	const range = getCanvasTargetVisibleRange($$, target);
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	for (let i = range.start; i < range.end; i++) {
		const d = target.values[i];

		if (!hasCanvasDrawableValue($$, d)) {
			continue;
		}

		getPoints(d, i).forEach(([x, y]) => {
			if (!isFiniteCanvasCoordinate(x, y)) {
				return;
			}

			minX = Math.min(minX, x);
			minY = Math.min(minY, y);
			maxX = Math.max(maxX, x);
			maxY = Math.max(maxY, y);
		});
	}

	return Number.isFinite(minX) && Number.isFinite(minY) ?
		{x: minX, y: minY, w: maxX - minX, h: maxY - minY} :
		null;
}

/**
 * Resolve objectBoundingBox gradient coordinate.
 * @param {number} value Normalized coordinate
 * @param {number} origin Bounding box origin
 * @param {number} size Bounding box size
 * @returns {number}
 * @private
 */
function getLinearGradientCoord(value: number | undefined, origin: number, size: number): number {
	return origin + size * (isNumber(value) ? value : 0);
}

/**
 * Create a canvas linear gradient from area/bar linearGradient options.
 * @param {object} $$ ChartInternal instance
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} target Data target
 * @param {string} shape Shape option prefix
 * @param {object} rect Shape bounding box
 * @param {string} baseColor Fallback target color
 * @returns {CanvasGradient|string}
 * @private
 */
function getCanvasLinearGradientFill(
	$$,
	ctx: CanvasRenderingContext2D,
	target,
	shape: CanvasLinearGradientShape,
	rect: CanvasRect | null,
	baseColor: string
): CanvasGradient | string {
	const option = $$.config[`${shape}_linearGradient`] as CanvasLinearGradientOption;

	if (!option || !rect || !rect.w || !rect.h) {
		return baseColor;
	}

	const isRotated = $$.config.axis_rotated;
	const gradientOption = typeof option === "object" ? option : {};
	const x = gradientOption.x || (isRotated ? [1, 0] : [0, 0]);
	const y = gradientOption.y || (isRotated ? [0, 0] : [0, 1]);
	const stops = Array.isArray(gradientOption.stops) ?
		gradientOption.stops :
		[[0, baseColor, 1], [1, baseColor, 0]];
	const gradient = ctx.createLinearGradient(
		getLinearGradientCoord(x[0], rect.x, rect.w),
		getLinearGradientCoord(y[0], rect.y, rect.h),
		getLinearGradientCoord(x[1], rect.x, rect.w),
		getLinearGradientCoord(y[1], rect.y, rect.h)
	);

	stops.forEach(([offset, stopColor, stopOpacity]) => {
		const colorValue = isFunction(stopColor) ? stopColor.call($$.api, target.id) : stopColor;
		const color = String(colorValue || baseColor);
		const numericOffset = Number(offset);
		const parsedOffset = Number.isFinite(numericOffset) ?
			Math.max(0, Math.min(1, numericOffset)) :
			0;

		gradient.addColorStop(parsedOffset, withOpacity(color, stopOpacity));
	});

	return gradient;
}

/**
 * Check if a target is supported by canvas v1.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {boolean} Whether the target is supported
 * @private
 */
function isCanvasRenderableTarget($$, target): boolean {
	return isCanvasTargetSupported($$, target, RENDERER_GROUPED_TYPE_FILTERS);
}

/**
 * Get canvas point opacity following SVG circle defaults.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {number} Point opacity
 * @private
 */
function getPointOpacity($$, target): number {
	const opacity = $$.config.point_opacity;

	return Number.isFinite(opacity) ? opacity : (
		isCanvasScatterType($$, target) || isCanvasBubbleType($$, target) ? 0.5 : 1
	);
}

/**
 * Get a target point radius without calling pointR for static non-bubble points.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {object} d Data row
 * @returns {number} Point radius
 * @private
 */
function getTargetPointRadius($$, target, d): number {
	const pointR = $$.config.point_r;

	return isCanvasBubbleType($$, target) || isFunction(pointR) ? ($$.pointR?.(d) ?? 2.5) : pointR;
}

/**
 * Check whether dense scatter point drawing can skip duplicate pixel centers.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {string} pointType Canvas point type
 * @param {boolean} hasGradient Whether radial gradient point fill is enabled
 * @returns {boolean} Whether pixel-center culling can be used
 * @private
 */
function shouldCullDenseScatterPoints($$, target, pointType, hasGradient: boolean): boolean {
	return !hasGradient &&
		pointType === "circle" &&
		isCanvasScatterType($$, target) &&
		!isFunction($$.config.point_r) &&
		target.values.length > DENSE_SCATTER_POINT_CULL_THRESHOLD;
}

/**
 * Get configured bar connect line type for a target.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Data id
 * @returns {string|null} Connect line type
 * @private
 */
function getBarConnectLineType($$, id: string): BarConnectLineType | null {
	const {bar_connectLine: connectLine} = $$.config;
	const type = isObject(connectLine) ? connectLine[id] : connectLine;

	return /^(start|end)-(start|end)$/.test(type) ? type : null;
}

/**
 * Get SVG-compatible bar connect line geometry.
 * @param {object} $$ ChartInternal instance
 * @param {Array} points Shared bar points
 * @param {object} radiusInfo Bar radius geometry info
 * @returns {object} Connect line geometry
 * @private
 */
function getBarConnectLineBox($$, points: number[][], radiusInfo): CanvasBarConnectLineBox {
	const {indexX, indexY, pos} = radiusInfo;

	return $$.config.axis_rotated ?
		{
			x: points[0][indexX],
			y: points[0][indexY],
			width: points[0][indexX] - pos,
			height: points[2][indexY] - points[0][indexY]
		} :
		{
			x: points[0][indexX],
			y: pos,
			width: points[2][indexX] - points[0][indexX],
			height: points[3][indexY] - pos
		};
}

/**
 * Draw SVG-compatible bar connect lines.
 * @param {object} $$ ChartInternal instance
 * @param {object} painter Canvas painter
 * @param {string} type Connect line type
 * @param {Array} boxes Bar connect line geometry list
 * @param {number} alpha Line opacity
 * @private
 */
function drawBarConnectLine(
	$$,
	painter: CanvasPainter,
	type: BarConnectLineType,
	boxes: CanvasBarConnectLineBox[],
	alpha = 1
): void {
	if (boxes.length < 2) {
		return;
	}

	const isRotated = $$.config.axis_rotated;
	const isStart = /^start-(start|end)$/.test(type);
	const isEnd = /^end-(start|end)$/.test(type);
	const isToEnd = /\w+-end$/.test(type);
	const isToStart = /\w+-start$/.test(type);
	const getMovePoint = (box: CanvasBarConnectLineBox) => ({
		x: isRotated ? (isEnd ? box.x - box.width : box.x) : (box.x + box.width),
		y: isRotated ? box.y + box.height : (isStart ? box.y + box.height : box.y)
	});
	const getLinePoint = (box: CanvasBarConnectLineBox) => ({
		x: isRotated ? box.x - (isToEnd ? box.width : 0) : box.x,
		y: isRotated ? box.y : box.y + (isToStart ? box.height : 0)
	});
	let movePoint = getMovePoint(boxes[0]);

	painter.strokePath(() => {
		for (let i = 1; i < boxes.length; i++) {
			const linePoint = getLinePoint(boxes[i]);

			painter.traceLine(movePoint.x, movePoint.y, linePoint.x, linePoint.y);

			if (i < boxes.length - 1) {
				movePoint = getMovePoint(boxes[i]);
			}
		}
	}, {
		alpha,
		stroke: $$.canvasTheme.style.shape.barConnectLineColor,
		lineWidth: $$.canvasTheme.style.shape.barConnectLineWidth,
		lineDash: []
	});
}

/**
 * Get normalized canvas point shape for the target.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {string} Canvas point shape
 * @private
 */
function getPointType($$, target): CanvasPointPattern {
	const {config} = $$;

	if (isCanvasBubbleType($$, target)) {
		return "circle";
	}

	const targetIds = $$.mapToIds?.($$.data.targets) || [];
	const pattern = Array.isArray(config.point_pattern) && config.point_pattern.length ?
		config.point_pattern :
		[config.point_type];
	const index = Math.max(0, targetIds.indexOf(target.id));
	const type = pattern[index % pattern.length];

	return /^rect(angle)?$/i.test(type) || type === "rectangle" ? "rectangle" : (type || "circle");
}

/**
 * Get point fill style, including canvas radial gradient when configured.
 * @param {object} $$ ChartInternal instance
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} d Data row
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} r Point radius
 * @param {string} fallback Fallback color
 * @returns {string|CanvasGradient} Fill style
 * @private
 */
function getPointFillStyle(
	$$,
	ctx: CanvasRenderingContext2D,
	d,
	x: number,
	y: number,
	r: number,
	fallback: string
): string | CanvasGradient {
	const option = $$.config.point_radialGradient;

	if (!option || !r) {
		return fallback;
	}

	const gradientOption = isObject(option) ? option : {};
	const cx = isNumber(gradientOption.cx) ? gradientOption.cx : 0.3;
	const cy = isNumber(gradientOption.cy) ? gradientOption.cy : 0.3;
	const radius = isNumber(gradientOption.r) ? gradientOption.r : 0.7;
	const stops = Array.isArray(gradientOption.stops) ?
		gradientOption.stops :
		[[0.1, null, 1], [0.9, null, 0]];
	const gradientX = x + (cx - 0.5) * r * 2;
	const gradientY = y + (cy - 0.5) * r * 2;
	const gradient = ctx.createRadialGradient(
		gradientX,
		gradientY,
		0,
		gradientX,
		gradientY,
		Math.max(1, r * radius * 2)
	);

	stops.forEach(([offset, stopColor, stopOpacity]) => {
		let color = isFunction(stopColor) ? stopColor.bind($$.api)(d.id) : stopColor;

		if (!color) {
			color = fallback;
		}

		// addColorStop throws IndexSizeError for out-of-range offsets
		const numericOffset = Number(offset);
		const parsedOffset = Number.isFinite(numericOffset) ?
			Math.max(0, Math.min(1, numericOffset)) :
			0;

		gradient.addColorStop(parsedOffset, withOpacity(color, stopOpacity));
	});

	return gradient;
}

/**
 * Get candlestick fill color for the data row.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @param {object} value Parsed candlestick value
 * @returns {string} Fill color
 * @private
 */
function getCandlestickColor($$, d, value): string {
	const downColor = $$.config.candlestick_color_down;
	const color = value?._isUp ? $$.color(d) : (
		downColor && typeof downColor === "object" ? downColor[d.id] : downColor
	);

	return color || $$.color(d);
}

/**
 * Check if points should be drawn for a line target.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {boolean} Whether points should be drawn
 * @private
 */
function shouldDrawPoints($$, target): boolean {
	return $$.shouldDrawPointsForLine ? $$.shouldDrawPointsForLine(target) : true;
}

/**
 * Check whether two canvas dash arrays are equal.
 * @param {Array} a First dash array
 * @param {Array} b Second dash array
 * @returns {boolean} Whether arrays have the same values
 * @private
 */
function isSameDash(a: number[], b: number[]): boolean {
	return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Draw a line target with per-data dashed regions.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @param {object} painter Canvas painter
 * @private
 */
function drawCanvasLineWithDataRegions($$, target, painter: CanvasPainter): void {
	const {config, scale} = $$;
	const x = scale.zoom || scale.x;
	const y = $$.getYScaleById(target.id);
	const rawValues = config.line_connectNull ? $$.filterRemoveNull(target.values) : target.values;
	let values = $$.isAreaRangeType(target) ?
		rawValues.map(d => ({...d, value: $$.getRangedData(d, "mid")})) :
		rawValues;

	if ($$.isStepType(target)) {
		values = $$.convertValuesToStep(values);
	}

	const segments = getLineRegionSegments($$, values, x, y, config.data_regions[target.id]);
	let currentDash: number[] | null = null;
	let currentPoints: number[][] = [];
	const flush = (): void => {
		if (currentPoints.length < 2 || !currentDash) {
			currentPoints = [];
			return;
		}

		painter.strokePath(ctx => {
			const [start, ...rest] = currentPoints;

			ctx.moveTo(start[0], start[1]);
			rest.forEach(point => {
				ctx.lineTo(point[0], point[1]);
			});
		}, {lineDash: currentDash});

		currentPoints = [];
	};
	const appendSegment = (start: number[], end: number[], dash: number[]): void => {
		if (!currentDash || !isSameDash(currentDash, dash)) {
			flush();
			currentDash = dash;
			currentPoints = [start, end];
		} else {
			currentPoints.push(end);
		}
	};

	for (const {start, end, dash, isBreak} of segments) {
		if (isBreak || !start || !end || !dash) {
			flush();
			currentDash = null;
			continue;
		}

		if (
			!isFiniteCanvasCoordinate(start[0], start[1]) ||
			!isFiniteCanvasCoordinate(end[0], end[1])
		) {
			flush();
			currentDash = null;
			continue;
		}

		appendSegment(start, end, dash);
	}

	flush();
}

/**
 * Draw axis-based chart shapes on canvas.
 * @private
 */
export default class CanvasRenderer {
	private painter: CanvasPainter;
	private labelImageCache = new Map<string, LabelImageCacheEntry>();
	private backgroundImageCache = new Map<string, LabelImageCacheEntry>();
	private backgroundClassStyleCache = new Map<string, CanvasBackgroundClassStyle>();

	/**
	 * Constructor.
	 * @param {CanvasEngine} engine Canvas drawing engine
	 * @param {CanvasTheme} theme Canvas theme resolver
	 * @private
	 */
	constructor(
		private engine: CanvasEngine,
		private theme: CanvasTheme
	) {
		this.painter = new CanvasPainter(engine.ctx);
	}

	/**
	 * Get the drawing context for the main canvas.
	 * @returns {CanvasRenderingContext2D} Canvas drawing context
	 * @private
	 */
	get ctx(): CanvasRenderingContext2D {
		return this.painter.context;
	}

	/**
	 * Run renderer draw calls on another canvas context.
	 * @param {CanvasRenderingContext2D} ctx Canvas drawing context
	 * @param {function} draw Draw callback
	 * @private
	 */
	withContext(ctx: CanvasRenderingContext2D, draw: () => void): void {
		this.painter.withContext(ctx, draw);
	}

	/**
	 * Release renderer caches that can hold chart or DOM references.
	 * @private
	 */
	destroy(): void {
		const clearImageHandler = (entry: LabelImageCacheEntry) => {
			entry.image.onload = null;
			entry.image.onerror = null;
		};

		this.labelImageCache.forEach(clearImageHandler);
		this.backgroundImageCache.forEach(clearImageHandler);
		this.labelImageCache.clear();
		this.backgroundImageCache.clear();
		this.backgroundClassStyleCache.clear();
	}

	/**
	 * Get cached image for data label.
	 * @param {string} url Image URL
	 * @param {object} $$ ChartInternal instance
	 * @returns {object|null} Cached image entry
	 * @private
	 */
	private getLabelImage(url: string, $$): LabelImageCacheEntry | null {
		if (!url || !window.Image) {
			return null;
		}

		let entry = this.labelImageCache.get(url);

		if (!entry) {
			const nextEntry = {
				image: new window.Image(),
				loaded: false,
				loading: true
			};
			entry = nextEntry;
			this.labelImageCache.set(url, entry);

			nextEntry.image.onload = () => {
				nextEntry.loaded = true;
				nextEntry.loading = false;
				$$.redraw?.();
			};
			nextEntry.image.onerror = () => {
				nextEntry.loaded = false;
				nextEntry.loading = false;
			};
			nextEntry.image.src = url;
		}

		return entry;
	}

	/**
	 * Get cached chart background image.
	 * @param {string} url Image URL
	 * @param {object} $$ ChartInternal instance
	 * @returns {object|null} Cached image entry
	 * @private
	 */
	private getBackgroundImage(url: string, $$): LabelImageCacheEntry | null {
		if (!url || !window.Image) {
			return null;
		}

		let entry = this.backgroundImageCache.get(url);

		if (!entry) {
			const nextEntry = {
				image: new window.Image(),
				loaded: false,
				loading: true
			};
			entry = nextEntry;
			this.backgroundImageCache.set(url, entry);

			nextEntry.image.onload = () => {
				nextEntry.loaded = true;
				nextEntry.loading = false;
				$$.renderCanvasFrame?.(undefined, null, false);
			};
			nextEntry.image.onerror = () => {
				nextEntry.loaded = false;
				nextEntry.loading = false;
			};
			nextEntry.image.src = url;
		}

		return entry;
	}

	/**
	 * Resolve background.class CSS values that canvas can reasonably mirror.
	 * @param {object} $$ ChartInternal instance
	 * @param {string} className Background class name
	 * @returns {object} Class style
	 * @private
	 */
	private getBackgroundClassStyle($$, className?: string): CanvasBackgroundClassStyle {
		if (!className || !window.document) {
			return {};
		}

		const cached = this.backgroundClassStyleCache.get(className);

		if (cached) {
			return cached;
		}

		const probe = window.document.createElement("div");

		probe.className = className;
		probe.style.cssText =
			"position:absolute;visibility:hidden;pointer-events:none;width:1px;height:1px;";
		$$.$el.chart.node().appendChild(probe);

		const style = window.getComputedStyle(probe);
		const opacity = parseFloat(style.opacity);
		const result = {
			opacity: Number.isFinite(opacity) ? opacity : undefined,
			transform: style.transform || undefined
		};

		probe.remove();
		this.backgroundClassStyleCache.set(className, result);

		return result;
	}

	/**
	 * Draw configured chart background behind all canvas layers.
	 * @param {object} $$ ChartInternal instance
	 * @private
	 */
	drawBackground($$): void {
		const bg = $$.config.background;

		if (!bg?.imgUrl && !bg?.color) {
			return;
		}

		const {ctx, painter} = this;
		const {current, margin, width, height} = $$.state;
		const classStyle = this.getBackgroundClassStyle($$, bg.class);

		painter.withState(() => {
			if (classStyle.opacity !== undefined) {
				ctx.globalAlpha *= classStyle.opacity;
			}

			if (bg.imgUrl) {
				const entry = this.getBackgroundImage(bg.imgUrl, $$);

				if (entry?.loaded) {
					const offset = getBackgroundImageOffset($$);
					const rect = getPreservedAspectRatioRect(
						entry.image,
						current.width,
						current.height
					);

					ctx.translate(offset.x, offset.y);
					applyCssMatrixTransform(ctx, classStyle.transform);
					ctx.drawImage(entry.image, rect.x, rect.y, rect.w, rect.h);
				}
			} else if (bg.color) {
				applyCssMatrixTransform(ctx, classStyle.transform);
				painter.fillRect({
					x: margin.left,
					y: margin.top,
					w: width,
					h: height
				}, {fill: bg.color});
			}
		});
	}

	/**
	 * Draw data label image when loaded, or queue it for loading.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} d Data row
	 * @param {string} text Label text
	 * @param {number} x Label x coordinate
	 * @param {number} y Label y coordinate
	 * @returns {object} Adjusted text position
	 * @private
	 */
	private drawLabelImage($$, d, text: string, x: number, y: number): {x: number, y: number} {
		const option = getLabelImageOption($$, d);

		if (!option?.url) {
			return {x, y};
		}

		const url = getLabelImageUrl(option, d);
		const position = getLabelImagePosition($$, option, text, x, y, d);
		const entry = this.getLabelImage(url, $$);

		if (entry?.loaded) {
			this.ctx.drawImage(
				entry.image,
				position.x,
				position.y,
				option.width,
				option.height
			);
		}

		return {
			x: position.textX,
			y: position.textY
		};
	}

	/**
	 * Draw a data label at a resolved canvas position.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} d Data row
	 * @param {string} text Label text
	 * @param {number} x Label x coordinate
	 * @param {number} y Label y coordinate
	 * @private
	 */
	private drawDataLabel($$, d, text: string, x: number, y: number): void {
		const {painter, theme: {style}} = this;

		({x, y} = this.drawLabelImage($$, d, text, x, y));
		if ($$.config.data_labels.rotate) {
			const position = getRotatedLabelPosition($$, d, x, y);

			x = position.x;
			y = position.y;
			this.ctx.textAlign = position.textAlign;
		}

		this.ctx.fillStyle = getLabelColor($$, d, style.label.color);
		drawLabelDecorations($$, painter, d, text, x, y);
		painter.textLines(text, x, y, {
			angle: $$.config.data_labels.rotate
		});
	}

	/**
	 * Redraw focused point data labels over the hover overlay.
	 * @param {object} $$ ChartInternal instance
	 * @param {Array} selectedData Focused data rows
	 * @private
	 */
	private drawFocusLabels($$, selectedData): void {
		if (!$$.hasDataLabel?.()) {
			return;
		}

		const {ctx, theme: {style}} = this;
		const rows = selectedData.filter(d =>
			d &&
			hasCanvasDrawableValue($$, d) &&
			isCanvasPointType($$, d) &&
			isCanvasRenderableTarget($$, {id: d.id})
		);
		const texts = {
			size: () => rows.length
		};

		if (!rows.length) {
			return;
		}

		ctx.font = style.label.font;

		rows.forEach(d => {
			const text = getLabelText($$, d);
			let {x, y} = getRenderDataPoint($$, d);

			if (!text) {
				return;
			}

			({x, y} = getPointLabelAnchor($$, ctx, d, x, y));
			x += getLabelPosition($$, d, "x", texts);
			y += getLabelPosition($$, d, "y", texts);

			if (!isFiniteCanvasCoordinate(x, y)) {
				return;
			}

			this.drawDataLabel($$, d, text, x, y);
		});
	}

	/**
	 * Draw all supported canvas shape layers.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @private
	 */
	draw($$, shape, focusData?): void {
		if ($$.state.hasTreemap) {
			this.drawTreemaps($$);
			return;
		}

		const {margin, width, height} = $$.state;
		const drawLineLayers = () => {
			if (!$$.config.area_front) {
				this.drawAreas($$, shape, focusData);
			}

			this.drawLines($$, shape);

			if ($$.config.area_front) {
				this.drawAreas($$, shape, focusData);
			}

			this.drawCircles($$, shape, focusData);
		};

		const drawContent = () => {
			if (!$$.config.bar_front) {
				this.drawBars($$, shape, focusData);
			}

			this.drawCandlesticks($$, shape, focusData);
			drawLineLayers();

			if ($$.config.bar_front) {
				this.drawBars($$, shape, focusData);
			}

			this.drawSelections($$, shape);
			this.drawLabels($$, shape);
		};

		$$.config.clipPath === false ?
			drawContent() :
			this.painter.clipRect({x: margin.left, y: margin.top, w: width, h: height},
				drawContent);
	}

	/**
	 * Draw the canvas subchart overview and brush selection.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @private
	 */
	drawSubchart($$, shape): void {
		const {config, state} = $$;

		if (!config.subchart_show || !state.hasAxis || state.width2 <= 0 || state.height2 <= 0) {
			return;
		}

		const {ctx, painter, theme: {style}} = this;
		const {margin2, width2, height2} = state;
		const rect = {x: margin2.left, y: margin2.top, w: width2, h: height2};
		const targets = $$.filterTargetsToShow()
			.filter(isCanvasRenderableTarget.bind(null, $$));

		painter.withState(() => {
			ctx.strokeStyle = style.axis.lineColor;
			ctx.lineWidth = style.axis.lineWidth;
			painter.strokePath(() => {
				if (config.axis_rotated) {
					painter.traceLine(rect.x, rect.y, rect.x, rect.y + rect.h);
				} else {
					painter.traceLine(rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h);
				}
			});

			painter.clipRect(rect, () => {
				painter.withTranslation(rect.x, rect.y, () => {
					const areaTargets = targets.filter(isCanvasAreaType.bind(null, $$));
					const areaIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.AREA,
						isCanvasAreaType.bind(null, $$)
					);

					ctx.globalAlpha = style.shape.areaOpacity;
					for (const target of areaTargets) {
						if (!target.values.some(hasCanvasDrawableValue.bind(null, $$))) {
							continue;
						}

						ctx.fillStyle = $$.color(target.id);
						drawCanvasArea($$, target, areaIndices, painter, true);
					}
					ctx.globalAlpha = 1;

					const barTargets = targets.filter(isCanvasBarType.bind(null, $$));
					const barIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.BAR,
						isCanvasBarType.bind(null, $$)
					);
					const getBarPoints = $$.generateGetBarPoints?.(barIndices, true);

					if (getBarPoints) {
						ctx.globalAlpha = style.shape.barOpacity;
						for (const target of barTargets) {
							ctx.fillStyle = $$.color(target.id);
							target.values.forEach((d, i) => {
								if (!hasCanvasDrawableValue($$, d)) {
									return;
								}

								const geometry = getCanvasBarGeometry($$, getBarPoints, d, i);

								geometry && painter.fillRect(geometry.rect, {fill: ctx.fillStyle});
							});
						}
						ctx.globalAlpha = 1;
					}

					const candlestickTargets = targets.filter(
						isCanvasCandlestickType.bind(null, $$)
					);
					const candlestickIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.CANDLESTICK,
						isCanvasCandlestickType.bind(null, $$)
					);
					const getCandlestickPoints = $$.generateGetCandlestickPoints?.(
						candlestickIndices,
						true
					);

					if (getCandlestickPoints) {
						ctx.lineWidth = style.shape.candlestickLineWidth;
						for (const target of candlestickTargets) {
							target.values.forEach((d, i) => {
								const value = $$.getCandlestickData?.(d);
								const geometry = value && getCanvasCandlestickGeometry(
									$$,
									getCandlestickPoints,
									d,
									i
								);

								if (!geometry) {
									return;
								}

								const color = getCandlestickColor($$, {id: target.id}, value);

								ctx.strokeStyle = color;
								ctx.fillStyle = color;
								painter.strokePath(() => {
									painter.traceLine(
										geometry.wickStart[0],
										geometry.wickStart[1],
										geometry.wickEnd[0],
										geometry.wickEnd[1]
									);
								});
								painter.fillRect(geometry.body, {fill: ctx.fillStyle});
							});
						}
					}

					const lineTargets = targets.filter(isCanvasLineType.bind(null, $$));
					const lineIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.LINE,
						isCanvasLineType.bind(null, $$)
					);

					ctx.globalAlpha = 1;
					ctx.lineWidth = style.shape.lineWidth;
					for (const target of lineTargets) {
						if (!target.values.some(hasCanvasDrawableValue.bind(null, $$))) {
							continue;
						}

						ctx.strokeStyle = $$.color(target.id);
						drawCanvasLine($$, target, lineIndices, painter, true);
					}

					if (config.point_show && !$$.isPointFocusOnly?.()) {
						const cy = $$.updateCircleY?.(true);
						const cx = $$.subxx?.bind($$);

						if (cx && cy) {
							for (const target of targets) {
								if (
									!isCanvasScatterType($$, target) &&
									!isCanvasBubbleType($$, target)
								) {
									continue;
								}

								const color = $$.color(target.id);
								const pointFill = style.shape.pointFillColor || color;
								const pointStroke = style.shape.pointStrokeColor || color;
								const pointLineWidth = pointStroke ?
									(style.shape.pointLineWidth ?? 1) :
									0;
								const pointStyle = pointStroke && pointLineWidth > 0 ?
									{
										fill: pointFill,
										stroke: pointStroke,
										lineWidth: pointLineWidth
									} :
									{fill: pointFill};

								ctx.globalAlpha = getPointOpacity($$, target);
								target.values.forEach((d, i) => {
									if (!hasCanvasDrawableValue($$, d)) {
										return;
									}

									const x = config.axis_rotated ? cy(d, i) : cx(d);
									const y = config.axis_rotated ? cx(d) : cy(d, i);
									const r = Math.min(getTargetPointRadius($$, target, d), 3);

									if (isFiniteCanvasCoordinate(x, y)) {
										drawPointPattern(painter, "circle", x, y, r, pointStyle);
									}
								});
							}
							ctx.globalAlpha = 1;
						}
					}
				});
			});

			this.drawSubchartBrush($$);
		});
	}

	/**
	 * Draw current subchart brush selection.
	 * @param {object} $$ ChartInternal instance
	 * @private
	 */
	drawSubchartBrush($$): void {
		const {config, scale, state} = $$;
		const domain = state.domain;

		if (!config.subchart_show || !domain?.length || !scale.subX) {
			return;
		}

		const {margin2, width2, height2} = state;
		const p0 = scale.subX(domain[0]);
		const p1 = scale.subX(domain[1]);
		const axisLength = config.axis_rotated ? height2 : width2;
		const extent = $$.axis?.getExtent?.();
		const extentValues =
			Array.isArray(extent) && extent.length >= 2 && extent.every(Number.isFinite) ?
				extent.slice(0, 2) :
				[0, axisLength];
		const extentStart = Math.max(0, Math.min(axisLength, Math.min(...extentValues)));
		const extentEnd = Math.max(0, Math.min(axisLength, Math.max(...extentValues)));
		const start = Math.max(extentStart, Math.min(extentEnd, Math.min(p0, p1)));
		const end = Math.max(extentStart, Math.min(extentEnd, Math.max(p0, p1)));
		const size = end - start;

		if (size <= 0) {
			return;
		}

		const rect = config.axis_rotated ?
			{x: margin2.left, y: margin2.top + start, w: width2, h: size} :
			{x: margin2.left + start, y: margin2.top, w: size, h: height2};

		this.painter.fillRect(rect, {
			fill: this.theme.style.subchartBrush.fill,
			alpha: this.theme.style.subchartBrush.opacity
		});

		if (config.subchart_showHandle) {
			this.drawSubchartBrushHandle($$, start, "start");
			this.drawSubchartBrushHandle($$, end, "end");
		}
	}

	/**
	 * Draw a visible subchart brush resize handle.
	 * @param {object} $$ ChartInternal instance
	 * @param {number} coord Brush handle coordinate
	 * @param {string} type Brush handle side
	 * @private
	 */
	drawSubchartBrushHandle($$, coord: number, type: "start" | "end"): void {
		const {config, state: {margin2, width2, height2}} = $$;
		const {ctx, painter, theme: {style}} = this;
		const isRotated = config.axis_rotated;
		const fill = style.subchartBrush.handleFill;
		const stroke = style.subchartBrush.handleStroke;
		const x = isRotated ? margin2.left + (width2 / 2) : margin2.left + coord;
		const y = isRotated ? margin2.top + coord : margin2.top + (height2 / 2);
		const path = getSubchartBrushHandlePath(isRotated ? "y" : "x", type);

		if (!path) {
			return;
		}

		painter.withState(() => {
			ctx.translate(x, y);
			ctx.fillStyle = fill;
			ctx.strokeStyle = stroke;
			ctx.lineWidth = style.subchartBrush.handleLineWidth;
			ctx.globalAlpha = style.subchartBrush.handleOpacity;
			ctx.fill(path);
			ctx.globalAlpha = 1;
			ctx.stroke(path);
		});
	}

	/**
	 * Draw bar shapes on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @private
	 */
	drawBars($$, shape, focusData?): void {
		const {ctx, painter, theme: {style}} = this;
		const isBar = isCanvasBarType.bind(null, $$);
		const isExpanded = getExpandedFocusMatcher($$, focusData, isCanvasBarType);
		const targets = $$.filterTargetsToShow()
			.filter(isBar)
			.filter(isCanvasRenderableTarget.bind(null, $$));
		const getPoints = $$.generateGetBarPoints(
			getCanvasShapeIndices($$, shape, TYPE.BAR, isBar),
			false
		);
		const {margin} = $$.state;
		const getRadius = getBarRadiusResolver($$);
		const stackingRadiusSet = getRadius ? getStackingBarRadiusSet($$) : new Set<string>();

		if (!getPoints) {
			return;
		}

		painter.withTranslation(margin.left, margin.top, () => {
			for (const target of targets) {
				const range = getCanvasTargetVisibleRange($$, target);
				const connectLineType = getBarConnectLineType($$, target.id);
				const targetOpacity = getCanvasTargetFocusOpacity($$, target);
				const connectLineBoxes: CanvasBarConnectLineBox[] = [];
				const bars: Array<
					{
						d: any,
						points: number[][],
						rect: CanvasRect,
						radiusInfo: ReturnType<typeof getBarRadiusInfo>
					}
				> = [];

				for (let i = range.start; i < range.end; i++) {
					const d = target.values[i];

					if (!hasCanvasDrawableValue($$, d)) {
						continue;
					}

					const geometry = getCanvasBarGeometry($$, getPoints, d, i);

					if (!geometry) {
						continue;
					}

					const {points, rect} = geometry;
					const radiusInfo = getBarRadiusInfo(
						$$,
						d,
						points,
						getRadius,
						stackingRadiusSet,
						$$.isStackingRadiusData?.bind($$)
					);

					bars.push({d, points, rect, radiusInfo});

					if (connectLineType) {
						connectLineBoxes.push(getBarConnectLineBox($$, points, radiusInfo));
					}
				}

				if (connectLineType && style.shape.barConnectLineWidth > 0) {
					drawBarConnectLine(
						$$,
						painter,
						connectLineType,
						connectLineBoxes,
						targetOpacity
					);
				}

				for (const {d, rect, radiusInfo} of bars) {
					const overColor = getCanvasOverColor($$, getFocusedCanvasDatum(focusData, d));
					const color = overColor || $$.color(target.id);
					const fillAlpha = isExpanded(d) ?
						style.shape.barExpandedOpacity :
						style.shape.barOpacity;
					const alpha = fillAlpha * targetOpacity;

					ctx.fillStyle = overColor ?
						color :
						getCanvasLinearGradientFill($$, ctx, target, "bar", rect, color);

					getRadius ?
						painter.fillRoundRect(
							rect,
							radiusInfo.corners,
							{alpha}
						) :
						painter.fillRect(rect, {alpha});

					if (style.shape.barLineWidth > 0) {
						ctx.strokeStyle = style.shape.barStrokeColor;
						ctx.lineWidth = style.shape.barLineWidth;
						getRadius ?
							painter.strokeRoundRect(
								rect,
								radiusInfo.corners,
								{alpha: style.shape.barOpacity * targetOpacity}
							) :
							painter.strokeRect(rect, {
								alpha: style.shape.barOpacity * targetOpacity
							});
					}
				}
			}
		});
	}

	/**
	 * Draw candlestick shapes on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @private
	 */
	drawCandlesticks($$, shape, focusData?): void {
		const {ctx, painter, theme: {style}} = this;
		const isCandlestick = isCanvasCandlestickType.bind(null, $$);
		const isExpanded = getExpandedFocusMatcher($$, focusData, isCanvasCandlestickType);
		const targets = $$.filterTargetsToShow()
			.filter(isCandlestick)
			.filter(isCanvasRenderableTarget.bind(null, $$));
		const getPoints = $$.generateGetCandlestickPoints?.(
			getCanvasShapeIndices($$, shape, TYPE.CANDLESTICK, isCandlestick),
			false
		);
		const {margin} = $$.state;

		if (!getPoints) {
			return;
		}

		painter.withTranslation(margin.left, margin.top, () => {
			ctx.lineWidth = style.shape.candlestickLineWidth;

			for (const target of targets) {
				const range = getCanvasTargetVisibleRange($$, target);
				const targetOpacity = getCanvasTargetFocusOpacity($$, target);
				const lineWidth = style.shape.candlestickLineWidth;
				const strokeColor = style.shape.candlestickStrokeColor || "#000";

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

					const {body: rect, wickStart, wickEnd} = geometry;

					ctx.fillStyle = getCanvasOverColor($$, getFocusedCanvasDatum(focusData, d)) ||
						getCandlestickColor($$, d, value);
					ctx.strokeStyle = strokeColor;
					ctx.globalAlpha = targetOpacity;
					lineWidth > 0 && painter.strokePath(() => {
						painter.traceLine(wickStart[0], wickStart[1], wickEnd[0], wickEnd[1]);
					});
					painter.fillRect(rect, {
						alpha: (
							isExpanded(d) ? style.shape.candlestickExpandedOpacity : 1
						) * targetOpacity
					});
					lineWidth > 0 && painter.strokeRect(rect, {
						alpha: targetOpacity,
						lineWidth,
						stroke: strokeColor
					});
				}
			}
			ctx.globalAlpha = 1;
		});
	}

	/**
	 * Check whether focus data requires a full redraw to reflect _expanded_ shape styles.
	 * @param {object} $$ ChartInternal instance
	 * @param {Array} selectedData Focused data rows
	 * @returns {boolean} Whether focused shapes need a main redraw
	 * @private
	 */
	hasExpandedShapeFocus($$, selectedData): boolean {
		return !!selectedData?.some(d =>
			d &&
			(
				isCanvasBarType($$, d) ||
				isCanvasCandlestickType($$, d)
			)
		);
	}

	/**
	 * Draw line strokes on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @private
	 */
	drawLines($$, shape): void {
		const {ctx, painter, theme: {style}} = this;
		const isLine = isCanvasLineType.bind(null, $$);
		const targets = $$.filterTargetsToShow()
			.filter(isLine)
			.filter(isCanvasRenderableTarget.bind(null, $$));
		const indices = getCanvasShapeIndices($$, shape, TYPE.LINE, isLine);
		const {margin} = $$.state;

		if (!$$.generateGetLinePoints) {
			return;
		}

		painter.withTranslation(margin.left, margin.top, () => {
			for (const target of targets) {
				const visibleTarget = getVisibleCanvasTarget($$, target);

				if (!visibleTarget.values.some(hasCanvasDrawableValue.bind(null, $$))) {
					continue;
				}

				ctx.globalAlpha = getCanvasTargetFocusOpacity($$, target);
				ctx.lineWidth = isCanvasTargetFocused($$, target) ?
					style.shape.lineFocusedWidth :
					style.shape.lineWidth;
				ctx.strokeStyle = $$.color(target.id);
				$$.config.data_regions?.[visibleTarget.id] ?
					drawCanvasLineWithDataRegions($$, visibleTarget, painter) :
					drawCanvasLine($$, visibleTarget, indices, painter);
			}
			ctx.globalAlpha = 1;
		});
	}

	/**
	 * Draw area fills on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @private
	 */
	drawAreas($$, shape, focusData?): void {
		const {ctx, painter, theme: {style}} = this;
		const isArea = isCanvasAreaType.bind(null, $$);
		const targets = $$.filterTargetsToShow()
			.filter(isArea)
			.filter(isCanvasRenderableTarget.bind(null, $$));
		const indices = getCanvasShapeIndices($$, shape, TYPE.AREA, isArea);
		const {margin} = $$.state;

		if (!$$.generateGetAreaPoints) {
			return;
		}

		painter.withTranslation(margin.left, margin.top, () => {
			for (const target of targets) {
				const visibleTarget = getVisibleCanvasTarget($$, target);

				if (!visibleTarget.values.some(hasCanvasDrawableValue.bind(null, $$))) {
					continue;
				}

				const color = getCanvasRenderColor($$, visibleTarget, focusData);

				ctx.globalAlpha = style.shape.areaOpacity * getCanvasTargetFocusOpacity($$, target);
				ctx.fillStyle = getCanvasLinearGradientFill(
					$$,
					ctx,
					visibleTarget,
					"area",
					// Bounds computation walks visible rows, so skip it when no gradient is set.
					// Use the original target so the range cache stays aligned with unsliced values.
					$$.config.area_linearGradient ? getCanvasAreaBounds($$, target, indices) : null,
					color
				);
				drawCanvasArea($$, visibleTarget, indices, painter);
			}
			ctx.globalAlpha = 1;
		});
	}

	/**
	 * Draw point circles on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @private
	 */
	drawCircles($$, shape, focusData?): void {
		if (!$$.config.point_show || $$.isPointFocusOnly?.()) {
			return;
		}

		const {ctx, painter, theme: {style}} = this;
		const {cx, cy} = shape.pos;
		const {margin} = $$.state;
		const isExpanded = getExpandedFocusMatcher($$, focusData, isCanvasPointType);
		const hasExpandedFocus = !!focusData?.some(d => d && isCanvasPointType($$, d));

		if (!cx || !cy) {
			return;
		}

		painter.withTranslation(margin.left, margin.top, () => {
			for (const target of $$.filterTargetsToShow()) {
				if (
					!isCanvasPointType($$, target) ||
					!isCanvasRenderableTarget($$, target) ||
					(isCanvasLineType($$, target) && !shouldDrawPoints($$, target))
				) {
					continue;
				}

				const color = $$.color(target.id);
				const pointType = getPointType($$, target);
				const targetOpacity = getCanvasTargetFocusOpacity($$, target);
				const hasGradient = !!$$.config.point_radialGradient;
				const cullDenseScatter = shouldCullDenseScatterPoints(
					$$,
					target,
					pointType,
					hasGradient
				);
				const range = getCanvasTargetVisibleRange($$, target);
				const visibleCount = range.end - range.start;
				const occupancy = cullDenseScatter ?
					createCanvasPointOccupancyGrid(
						$$.state.width,
						$$.state.height,
						getTargetPointRadius($$, target,
							target.values[range.start] || target.values[0])
					) :
					null;

				const pointAlpha = getPointOpacity($$, target) * targetOpacity;

				ctx.fillStyle = color;
				ctx.globalAlpha = pointAlpha;
				const pointFill = style.shape.pointFillColor || color;
				const pointStroke = style.shape.pointStrokeColor || color;
				const pointLineWidth = pointStroke ? (style.shape.pointLineWidth ?? 1) : 0;
				const hasPointStroke = !!pointStroke && pointLineWidth > 0;
				const mergeSameColorStroke = hasPointStroke &&
					pointType === "circle" &&
					isNumber(pointAlpha) &&
					pointAlpha < 1 &&
					pointFill === pointStroke;

				if (!hasExpandedFocus && !hasGradient && pointType === "circle") {
					ctx.fillStyle = pointFill;
					if (hasPointStroke && !mergeSameColorStroke) {
						ctx.strokeStyle = pointStroke;
						ctx.lineWidth = pointLineWidth;
					}

					if (visibleCount > MAX_BATCHED_CIRCLE_POINTS) {
						for (let i = range.start; i < range.end; i++) {
							const d = target.values[i];

							if (!hasCanvasDrawableValue($$, d)) {
								continue;
							}

							const baseR = getTargetPointRadius($$, target, d);
							const r = mergeSameColorStroke ? baseR + pointLineWidth / 2 : baseR;
							const x = cx(d, i);
							const y = cy(d, i);

							if (!isFiniteCanvasCoordinate(x, y)) {
								continue;
							}

							if (occupancy && !markCanvasPointOccupancy(occupancy, x, y)) {
								continue;
							}

							ctx.beginPath();
							ctx.arc(x, y, r, 0, Math.PI * 2);
							ctx.fill();
							hasPointStroke && !mergeSameColorStroke && ctx.stroke();
						}
					} else {
						ctx.beginPath();
						for (let i = range.start; i < range.end; i++) {
							const d = target.values[i];

							if (!hasCanvasDrawableValue($$, d)) {
								continue;
							}

							const baseR = getTargetPointRadius($$, target, d);
							const r = mergeSameColorStroke ? baseR + pointLineWidth / 2 : baseR;
							const x = cx(d, i);
							const y = cy(d, i);

							if (!isFiniteCanvasCoordinate(x, y)) {
								continue;
							}

							painter.traceCircle(x, y, r);
						}
						ctx.fill();
						hasPointStroke && !mergeSameColorStroke && ctx.stroke();
					}
				} else {
					for (let i = range.start; i < range.end; i++) {
						const d = target.values[i];

						if (!hasCanvasDrawableValue($$, d)) {
							continue;
						}

						const expanded = isExpanded(d);
						const baseR = getTargetPointRadius($$, target, d);
						const r = expanded ?
							($$.pointExpandedR?.(d) ??
								(baseR * 1.75)) :
							baseR;
						const x = cx(d, i);
						const y = cy(d, i);
						const overColor = getCanvasOverColor($$, d);
						const renderColor = overColor || color;
						const renderPointFill = style.shape.pointFillColor || renderColor;
						const renderPointStroke = style.shape.pointStrokeColor || renderColor;
						const fill = expanded ?
							(overColor || style.focusPoint.fill || renderPointFill) :
							renderPointFill;
						const stroke = expanded ?
							(overColor || style.focusPoint.stroke || renderColor) :
							renderPointStroke;
						const lineWidth = expanded ? style.focusPoint.lineWidth : pointLineWidth;
						const alpha = getPointOpacity($$, d) * targetOpacity;
						const hasStroke = !!stroke && (lineWidth ?? 0) > 0;
						const mergeSameColorStroke = pointType === "circle" &&
							hasStroke &&
							isNumber(alpha) &&
							alpha < 1 &&
							fill === stroke;
						const drawR = mergeSameColorStroke ? r + (lineWidth || 0) / 2 : r;

						if (!isFiniteCanvasCoordinate(x, y)) {
							continue;
						}

						ctx.fillStyle = hasGradient ?
							getPointFillStyle($$, ctx, d, x, y, r, renderColor) :
							fill;
						ctx.globalAlpha = alpha;
						drawPointPattern(
							painter,
							pointType,
							x,
							y,
							drawR,
							hasStroke && !mergeSameColorStroke ?
								{
									fill: ctx.fillStyle,
									stroke,
									lineWidth
								} :
								undefined,
							baseR
						);
					}
				}
			}
		});
	}

	/**
	 * Draw selected canvas shapes.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @private
	 */
	drawSelections($$, shape): void {
		const selectedData = $$.getCanvasSelectedData?.();

		if (!$$.config.data_selection_enabled || !selectedData?.length || $$.state.hasTreemap) {
			return;
		}

		const {ctx, painter, theme: {style}} = this;
		const {margin} = $$.state;
		const isBar = isCanvasBarType.bind(null, $$);
		const isCandlestick = isCanvasCandlestickType.bind(null, $$);
		const barPoints = selectedData.some(isBar) ?
			$$.generateGetBarPoints(
				getCanvasShapeIndices($$, shape, TYPE.BAR, isBar),
				false
			) :
			null;
		const candlestickPoints = selectedData.some(isCandlestick) ?
			$$.generateGetCandlestickPoints?.(
				getCanvasShapeIndices($$, shape, TYPE.CANDLESTICK, isCandlestick),
				false
			) :
			null;
		const getRadius = barPoints ? getBarRadiusResolver($$) : null;
		const stackingRadiusSet = getRadius ? getStackingBarRadiusSet($$) : new Set<string>();

		painter.withTranslation(margin.left, margin.top, () => {
			selectedData.forEach(d => {
				const color = $$.color(d.id);

				if (isBar(d) && barPoints) {
					const geometry = getCanvasBarGeometry($$, barPoints, d, d.index);

					if (!geometry) {
						return;
					}

					const {points, rect} = geometry;
					const corners = getRadius ?
						getBarRadiusInfo($$, d, points, getRadius, stackingRadiusSet).corners :
						0;

					getRadius ?
						painter.fillRoundRect(rect, corners, {fill: "#fff", alpha: 0.3}) :
						painter.fillRect(rect, {fill: "#fff", alpha: 0.3});
					getRadius ?
						painter.strokeRoundRect(rect, corners, {stroke: color, lineWidth: 2}) :
						painter.strokeRect(rect, {stroke: color, lineWidth: 2});
				} else if (isCandlestick(d) && candlestickPoints) {
					const value = $$.getCandlestickData?.(d);

					if (!value) {
						return;
					}

					const geometry = getCanvasCandlestickGeometry($$, candlestickPoints, d,
						d.index);

					if (!geometry) {
						return;
					}

					const {body, wickStart, wickEnd} = geometry;

					painter.strokePath(() => {
						painter.traceLine(wickStart[0], wickStart[1], wickEnd[0], wickEnd[1]);
					}, {stroke: color, lineWidth: 3});
					painter.fillRect(body, {fill: "#fff", alpha: 0.3});
					painter.strokeRect(body, {stroke: color, lineWidth: 2});
				} else if (isCanvasPointType($$, d)) {
					const pointType = getPointType($$, {id: d.id});
					const {x, y} = getRenderDataPoint($$, d);
					const r = $$.pointR?.(d) ?? 2.5;
					const selectR = $$.pointSelectR?.(d) ?? (r * 2);

					if (!isFiniteCanvasCoordinate(x, y)) {
						return;
					}

					drawPointPattern(painter, "circle", x, y, selectR, {
						fill: style.selectedPoint.fill,
						lineWidth: style.selectedPoint.lineWidth,
						stroke: style.selectedPoint.stroke || color
					});
					drawPointPattern(painter, pointType, x, y, r, {
						fill: style.shape.pointFillColor || color,
						stroke: style.shape.pointStrokeColor || color,
						lineWidth: style.shape.pointLineWidth ?? 1
					});
				}
			});

			ctx.globalAlpha = 1;
		});
	}

	/**
	 * Draw data labels on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} shape Cached draw shape object
	 * @private
	 */
	drawLabels($$, shape): void {
		if (!$$.hasDataLabel?.()) {
			return;
		}

		const {ctx, painter, theme: {style}} = this;
		const {margin} = $$.state;
		const {cx, cy} = shape.pos;
		const barPoints = shape.indices[TYPE.BAR] ?
			$$.generateGetBarPoints(shape.indices[TYPE.BAR], false) :
			null;
		const candlestickPoints = $$.generateGetCandlestickPoints ?
			$$.generateGetCandlestickPoints(
				getCanvasShapeIndices(
					$$,
					shape,
					TYPE.CANDLESTICK,
					isCanvasCandlestickType.bind(null, $$)
				),
				false
			) :
			null;
		const targets = $$.filterTargetsToShow()
			.filter(target =>
				(
					isCanvasBarType($$, target) ||
					isCanvasPointType($$, target) ||
					isCanvasAreaType($$, target) ||
					isCanvasCandlestickType($$, target)
				) &&
				isCanvasRenderableTarget($$, target)
			);
		const targetRows: Array<{d, text: string}[]> = [];
		let labelCount = 0;

		targets.forEach(target => {
			const range = getCanvasTargetVisibleRange($$, target);
			const data = $$.labelishData(target);
			const rows: {d, text: string}[] = [];

			for (let i = 0; i < data.length; i++) {
				const d = data[i];
				const text = getLabelText($$, d);

				if (
					text &&
					d.index >= range.start &&
					d.index < range.end &&
					hasCanvasDrawableValue($$, d)
				) {
					rows.push({d, text});
				}
			}

			labelCount += rows.length;
			rows.length && targetRows.push(rows);
		});

		const texts = {
			size: () => labelCount
		};

		painter.withTranslation(margin.left, margin.top, () => {
			ctx.font = style.label.font;
			ctx.textAlign = "center";

			targetRows
				.forEach(rows => {
					for (const {d, text} of rows) {
						let x;
						let y;

						if (isCanvasBarType($$, d) && barPoints) {
							const geometry = getCanvasBarGeometry($$, barPoints, d, d.index);

							if (!geometry) {
								continue;
							}

							const {points, rect} = geometry;
							const value = $$.getBaseValue(d);
							const end = getRenderPoint($$, points[2]);
							const isNegative = value < 0;
							const labelHeight = getLabelDecorationBox(ctx, text, 0, 0).h;

							x = $$.config.axis_rotated && !$$.config.data_labels.centered ?
								end[0] + (isNegative ? -4 : 4) :
								rect.x + rect.w / 2;
							y = $$.config.data_labels.centered ?
								rect.y + rect.h / 2 :
								($$.config.axis_rotated ? rect.y + rect.h / 2 : end[1] + (
									isNegative ? labelHeight - 3 : -3
								));
							ctx.textAlign = $$.config.axis_rotated &&
									!$$.config.data_labels.centered ?
								(isNegative ? "right" : "left") :
								"center";
							ctx.textBaseline = $$.config.data_labels.centered ?
								"middle" :
								($$.config.axis_rotated ? "middle" : "alphabetic");
						} else if (isCanvasCandlestickType($$, d) && candlestickPoints) {
							const value = $$.getCandlestickData?.(d);
							const geometry = getCanvasCandlestickGeometry(
								$$,
								candlestickPoints,
								d,
								d.index
							);
							const isUp = value?._isUp;

							if (!geometry) {
								continue;
							}

							const {wickEnd, wickStart} = geometry;
							const isInverted = $$.config[`axis_${$$.axis?.getId(d.id)}_inverted`];

							x = $$.config.axis_rotated ?
								(isUp ? wickEnd[0] + 4 : wickStart[0] - 4) :
								wickStart[0];
							y = $$.config.axis_rotated ?
								wickStart[1] + 3 :
								(isUp ? wickEnd[1] - 3 : wickStart[1] + 12);
							!$$.config.axis_rotated && isInverted &&
								(y += 15 * (isUp ? 1 : -1));
							ctx.textAlign = $$.config.axis_rotated ?
								(isUp ? "left" : "right") :
								"center";
							ctx.textBaseline = "alphabetic";
						} else if (cx && cy) {
							({x, y} = getShapePoint(shape.pos, d, d.index));
							({x, y} = getPointLabelAnchor($$, ctx, d, x, y));
						}

						x += getLabelPosition($$, d, "x", texts);
						y += getLabelPosition($$, d, "y", texts);

						if (!isFiniteCanvasCoordinate(x, y)) {
							continue;
						}

						this.drawDataLabel($$, d, text, x, y);
					}
				});
		});
	}

	/**
	 * Draw empty-data label on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @private
	 */
	drawEmptyLabel($$): void {
		const text = $$.config.data_empty_label_text;
		const targetsToShow = $$.filterTargetsToShow();

		if (!text || targetsToShow.length) {
			return;
		}

		const {margin, width, height} = $$.state;
		const {style} = this.theme;

		this.painter.text(String(text), margin.left + width / 2, margin.top + height / 2, {
			fill: style.emptyLabel.color,
			font: style.emptyLabel.font,
			textAlign: "center",
			textBaseline: "middle"
		});
	}

	/**
	 * Draw drag-zoom brush overlay.
	 * @param {object} $$ ChartInternal instance
	 * @param {number} start Start coordinate
	 * @param {number} end End coordinate
	 * @private
	 */
	drawZoomBrush($$, start: number, end: number): void {
		const {axis_rotated} = $$.config;
		const {height, margin, width} = $$.state;
		const brushStart = Math.min(start, end);
		const brushSize = Math.abs(end - start);
		const rect = axis_rotated ?
			{x: margin.left, y: margin.top + brushStart, w: width, h: brushSize} :
			{x: margin.left + brushStart, y: margin.top, w: brushSize, h: height};

		if (brushSize <= 0) {
			return;
		}

		this.painter.fillRect(rect, {
			fill: this.theme.style.zoomBrush.fill,
			alpha: this.theme.style.zoomBrush.opacity
		});
	}

	/**
	 * Draw data selection drag area.
	 * @param {object} $$ ChartInternal instance
	 * @param {object} rect Selection rectangle
	 * @private
	 */
	drawSelectionDragArea($$, rect): void {
		const {margin, width, height} = $$.state;
		const plot = {
			x: margin.left,
			y: margin.top,
			w: width,
			h: height
		};
		const x = Math.max(plot.x, rect.x);
		const y = Math.max(plot.y, rect.y);
		const right = Math.min(plot.x + plot.w, rect.x + rect.w);
		const bottom = Math.min(plot.y + plot.h, rect.y + rect.h);

		if (right <= x || bottom <= y) {
			return;
		}

		this.painter.fillRect({
			x,
			y,
			w: right - x,
			h: bottom - y
		}, {
			fill: this.theme.style.zoomBrush.fill,
			alpha: this.theme.style.zoomBrush.opacity
		});
	}

	/**
	 * Draw treemap tiles and labels on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @private
	 */
	drawTreemaps($$): void {
		const {ctx, painter, theme: {style}} = this;
		const {config} = $$;
		const root = $$.getTreemapRoot?.($$.data.targets);
		const nodes = root?.children || [];

		painter.withState(() => {
			ctx.lineWidth = style.treemap.lineWidth;
			ctx.strokeStyle = style.treemap.stroke;

			for (const node of nodes) {
				const {data} = node;

				if (!isCanvasTreemapType($$, data)) {
					continue;
				}

				const {x, y, w, h} = getTreemapNodeRect($$, node, root, true);

				if (
					!isFiniteCanvasCoordinate(x, y) ||
					!isFiniteCanvasCoordinate(x + w, y + h) ||
					w <= 0 ||
					h <= 0
				) {
					continue;
				}

				const rect = {x, y, w, h};

				ctx.fillStyle = $$.color(data.name);
				painter.fillRect(rect);
				painter.strokeRect(rect);

				if (
					!config.treemap_label_show ||
					(data.ratio || 0) < (config.treemap_label_threshold || 0)
				) {
					continue;
				}

				const label = getTreemapLabelText($$, data, w, h);

				if (!label) {
					continue;
				}

				const lines = label.split("\n");
				const isCentered = !!config.data_labels.centered;

				ctx.font = style.label.font;
				const lineHeight = getFontSize(ctx.font);
				const metrics = ctx.measureText(lines[0] ?? "");
				const fontBoundingHeight = (
					(metrics.fontBoundingBoxAscent || 0) +
					(metrics.fontBoundingBoxDescent || 0)
				) || (
					(metrics.actualBoundingBoxAscent || 0) +
					(metrics.actualBoundingBoxDescent || 0)
				);
				const textHeight = Math.max(lineHeight, fontBoundingHeight) +
					((lines.length - 1) * lineHeight);
				const blockY = isCentered ? y + h / 2 : y + textHeight + 5;
				let textX = isCentered ? x + w / 2 : x + 5;
				let textY = blockY - (lines.length - 1) * lineHeight / (isCentered ? 2 : 1);

				ctx.textAlign = isCentered ? "center" : "left";
				ctx.textBaseline = isCentered ? "middle" : "alphabetic";
				({x: textX, y: textY} = this.drawLabelImage($$, data, label, textX, textY));
				ctx.fillStyle = getLabelColor($$, data, style.label.color);
				drawLabelDecorations(
					$$,
					painter,
					data,
					label,
					textX,
					isCentered ? textY + ((lines.length - 1) * lineHeight / 2) : blockY
				);

				lines.forEach((line, i) => {
					painter.text(line, textX, textY + i * lineHeight, {
						maxWidth: Math.max(0, w - 8)
					});
				});
			}
		});
	}

	/**
	 * Draw focus grid and focused points on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {Array} selectedData Focused data rows
	 * @private
	 */
	drawFocus($$, selectedData): void {
		if (!selectedData?.length) {
			return;
		}

		const {painter} = this;
		const {style} = this.theme;
		const {margin} = $$.state;
		const focus = selectedData.find(d =>
			d &&
			hasCanvasDrawableValue($$, d)
		);

		painter.withTranslation(margin.left, margin.top, () => {
			if (
				$$.config.tooltip_show &&
				$$.config.grid_focus_show !== false &&
				!$$.config.axis_tooltip &&
				focus
			) {
				const {x, y} = getRenderDataPoint($$, focus);
				const axisLineWidth = style.axis.lineWidth;
				const isRotated = $$.config.axis_rotated;
				const hasIndexCoordinate = Number.isFinite(isRotated ? y : x);
				const hasValueCoordinate = Number.isFinite(isRotated ? x : y);
				const crispEdgeX = value =>
					painter.crisp(margin.left + value, axisLineWidth) - margin.left;
				const crispEdgeY = value =>
					painter.crisp(margin.top + value, axisLineWidth) - margin.top;
				const isEdge = $$.config.grid_focus_edge && !$$.config.tooltip_grouped;

				if (hasIndexCoordinate) {
					painter.strokePath(() => {
						if (isRotated) {
							painter.traceLine(
								crispEdgeX(0),
								y,
								isEdge && hasValueCoordinate ? x : crispEdgeX($$.state.width),
								y
							);

							if (
								hasValueCoordinate &&
								$$.config.grid_focus_y &&
								!$$.config.tooltip_grouped
							) {
								const isY2 = $$.axis?.getId(focus.id) === "y2";

								painter.traceLine(
									x,
									isEdge && !isY2 ? y : crispEdgeY(0),
									x,
									isEdge && isY2 ? y : crispEdgeY($$.state.height)
								);
							}
						} else {
							painter.traceLine(
								x,
								isEdge && hasValueCoordinate ? y : crispEdgeY(0),
								x,
								crispEdgeY($$.state.height)
							);

							if (
								hasValueCoordinate &&
								$$.config.grid_focus_y &&
								!$$.config.tooltip_grouped
							) {
								const isY2 = $$.axis?.getId(focus.id) === "y2";

								painter.traceLine(
									isEdge && isY2 ? x : crispEdgeX(0),
									y,
									isEdge && !isY2 ? x : crispEdgeX($$.state.width),
									y
								);
							}
						}
					}, {
						lineDash: style.focusGrid.dashArray,
						lineWidth: style.focusGrid.lineWidth,
						stroke: style.focusGrid.lineColor
					});
				}
			}

			if ($$.config.point_show && !$$.state.canvasFocusMainRedraw) {
				selectedData
					.filter(d =>
						d &&
						hasCanvasDrawableValue($$, d) &&
						isCanvasPointType($$, d) &&
						isCanvasRenderableTarget($$, {id: d.id})
					)
					.forEach(d => {
						const pointType = getPointType($$, {id: d.id});
						const {x, y} = getRenderDataPoint($$, d);
						const baseR = $$.pointR?.(d) ?? 2.5;
						const r = $$.pointExpandedR?.(d) ?? (baseR * 1.75);
						const overColor = getCanvasOverColor($$, d);
						const color = overColor || $$.color(d.id);
						const fill = overColor ||
							style.focusPoint.fill ||
							style.shape.pointFillColor ||
							color;
						const stroke = overColor || style.focusPoint.stroke || color;
						const lineWidth = style.focusPoint.lineWidth;
						const alpha = getPointOpacity($$, d);
						const hasStroke = !!stroke && (lineWidth ?? 0) > 0;
						const mergeSameColorStroke = pointType === "circle" &&
							hasStroke &&
							isNumber(alpha) &&
							alpha < 1 &&
							fill === stroke;

						if (!isFiniteCanvasCoordinate(x, y)) {
							return;
						}

						drawPointPattern(
							painter,
							pointType,
							x,
							y,
							mergeSameColorStroke ? r + (lineWidth || 0) / 2 : r,
							hasStroke && !mergeSameColorStroke ?
								{fill, lineWidth, stroke, alpha} :
								{fill, alpha},
							baseR
						);
					});
			}

			this.drawFocusLabels($$, selectedData);
		});
	}
}
