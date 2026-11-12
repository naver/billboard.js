/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isContinuousGridFocusEnabled} from "../ChartInternal/internals/subchart.util";
import {
	getBarRadiusInfo,
	getBarRadiusResolver,
	getStackingBarRadiusSet
} from "../ChartInternal/shape/core/barRadius";
import {getLineRegionSegments} from "../ChartInternal/shape/core/dataRegion";
import {
	getRenderDataPoint,
	getRenderPoint,
	getShapePoint
} from "../ChartInternal/shape/core/geometry";
import {generateDrawAreaPath, generateDrawLinePath} from "../ChartInternal/shape/core/path";
import {TYPE} from "../config/const";
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
	hasCanvasDrawableValue,
	isCanvasAreaType,
	isCanvasBarType,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasLineType,
	isCanvasPointType,
	isCanvasScatterType,
	isCanvasTargetSupported,
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

	return state.customType || state.hasTreemap ? {x: 0, y: 0} : {
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
export function drawCanvasLine($$, target, indices, painter: CanvasPainter, isSub = false): void {
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
export function drawCanvasArea($$, target, indices, painter: CanvasPainter, isSub = false): void {
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
export function isCanvasTargetFocused($$, d): boolean {
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
export function getCanvasTargetFocusOpacity($$, d): number {
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
export function isCanvasRenderableTarget($$, target): boolean {
	return isCanvasTargetSupported($$, target, RENDERER_GROUPED_TYPE_FILTERS);
}

/**
 * Get canvas point opacity following SVG circle defaults.
 * @param {object} $$ ChartInternal instance
 * @param {object} target Data target
 * @returns {number} Point opacity
 * @private
 */
export function getPointOpacity($$, target): number {
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
export function getTargetPointRadius($$, target, d): number {
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
export function getPointType($$, target): CanvasPointPattern {
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
export function getCandlestickColor($$, d, value): string {
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
	painter: CanvasPainter;
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
		public theme: CanvasTheme
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
	drawLabelImage($$, d, text: string, x: number, y: number): {x: number, y: number} {
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
	drawDataLabel($$, d, text: string, x: number, y: number): void {
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
		// the type that is the whole chart is drawn by its module, alone
		const exclusive = $$.getCanvasTypeParts?.().find(part => part.exclusive);

		if (exclusive) {
			exclusive.draw?.call($$, this, shape, focusData);
			return;
		}

		if ($$.state.customType) {
			// registered by the module of the type: bundles without it do not carry its drawing
			$$.getCustomTypeParts()?.canvas?.draw?.call($$, this);
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

			$$.getCanvasFeature?.("selection")?.draw.call($$, this, shape);
			this.drawLabels($$, shape);
		};

		$$.config.clipPath === false ?
			drawContent() :
			this.painter.clipRect({x: margin.left, y: margin.top, w: width, h: height},
				drawContent);
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
	 * Draw focus grid and focused points on canvas.
	 * @param {object} $$ ChartInternal instance
	 * @param {Array} selectedData Focused data rows
	 * @private
	 */
	drawFocus($$, selectedData): void {
		// a custom type has no axis, so there is no focus grid or point to draw
		if (!selectedData?.length || $$.state.customType) {
			return;
		}

		const {painter} = this;
		const {style} = this.theme;
		const {margin} = $$.state;
		const focus = selectedData.find(d =>
			d &&
			hasCanvasDrawableValue($$, d)
		);

		$$.config.subchart_grid_focus !== false &&
			!isContinuousGridFocusEnabled($$) &&
			$$.getCanvasFeature?.("subchart")?.drawFocus.call($$, this, selectedData);

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
				const continuousFocus = isContinuousGridFocusEnabled($$);
				const focusEndX = continuousFocus ?
					$$.state.margin2.left - margin.left + $$.state.width2 :
					$$.state.width;
				const focusEndY = continuousFocus ?
					$$.state.margin2.top - margin.top + $$.state.height2 :
					$$.state.height;

				if (hasIndexCoordinate) {
					painter.strokePath(() => {
						if (isRotated) {
							painter.traceLine(
								crispEdgeX(0),
								y,
								isEdge && hasValueCoordinate ? x : crispEdgeX(focusEndX),
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
								crispEdgeY(focusEndY)
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
