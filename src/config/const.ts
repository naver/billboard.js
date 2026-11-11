/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Chart type constant
 * @private
 */
export const TYPE = {
	AREA: "area",
	AREA_LINE_RANGE: "area-line-range",
	AREA_SPLINE: "area-spline",
	AREA_SPLINE_RANGE: "area-spline-range",
	AREA_STEP: "area-step",
	AREA_STEP_RANGE: "area-step-range",
	BAR: "bar",
	BUBBLE: "bubble",
	CANDLESTICK: "candlestick",
	DONUT: "donut",
	FUNNEL: "funnel",
	GAUGE: "gauge",
	LINE: "line",
	PIE: "pie",
	POLAR: "polar",
	RADAR: "radar",
	SCATTER: "scatter",
	SPLINE: "spline",
	STEP: "step",
	TREEMAP: "treemap"
};

/**
 * Chart types that are drawn on canvas by the canvas part of their module (registerCanvasType()).
 * With the svg part only, nothing draws them: the canvas mode falls back to svg.
 * Only the names: a type is not judged by this list when its canvas part is there.
 * @private
 */
export const CANVAS_PART_NEEDED = ["treemap"];

/**
 * Optional API modules and their resolver module name.
 * Used by checkApiModuleImport() to surface a helpful error when a user calls
 * chart.export() / chart.flow() without importing the matching resolver.
 * @private
 */
export const API_MODULE_NEEDED = {
	export: "exportApi",
	flow: "flow",
	xgrids: "grid",
	ygrids: "grid",
	regions: "regions",
	category: "category",
	categories: "category"
};

/**
 * Axis rendering constants shared by SVG and canvas renderers.
 * @private
 */
// A resize redraw costing more than one frame makes the whole drag stretch the
// rendering instead of redrawing it. 16ms is the budget of a 60fps frame.
export const RESIZE_FRAME_BUDGET = 16;

export const AXIS_DEFAULT_TICK_COUNT = 10;
export const AXIS_TICK_SIZE = 6;
export const AXIS_TICK_PADDING = 3;
export const AXIS_TICK_LENGTH = AXIS_TICK_SIZE + AXIS_TICK_PADDING;
export const AXIS_TICK_LINE_OVERLAP_PADDING = 1;

/**
 * Subchart brush handle path constants shared by SVG and canvas renderers.
 * @private
 */
export const SUBCHART_BRUSH_HANDLE_PATH = {
	x: {
		start: "M0 -8.5 A6 6 0 0 0 -6.5 -3.5 V2.5 A6 6 0 0 0 0 8.5 Z M-2 -3.5 V3.5 M-4 -3.5 V3.5z",
		end: "M0 -8.5 A6 6 0 0 1 6.5 -3.5 V2.5 A6 6 0 0 1 0 8.5 Z M2 -3.5 V3.5 M4 -3.5 V3.5z"
	},
	y: {
		start: "M8.5 0 a6 6 0 0 0 -6 -6.5 H-2.5 a 6 6 0 0 0 -6 6.5 z m-5 -2 H-3.5 m7 -2 H-3.5z",
		end: "M8.5 0 a6 -6 0 0 1 -6 6.5 H-2.5 a 6 -6 0 0 1 -6 -6.5z m-5 2 H-3.5 m7 2 H-3.5z"
	}
} as const;

/**
 * Chart type module and its method from ChartInternal class, needed to be initialized.
 * It is keyed by the name given to `data.type`, for the types of their own module too.
 * The method has to be there for every mode: the module of "billboard.js/canvas" has no part
 * for the svg mode (see getTypeMethod()), so it is a method of the part both of them have.
 * Used by checkModuleImport() to tell that the module of a type was not imported: a name that is not
 * here (a typo for example) is never reported.
 * @private
 */
export const TYPE_METHOD_NEEDED: Record<string, string> = {
	area: "initArea",
	"area-line-range": "initArea",
	"area-spline": "initArea",
	"area-spline-range": "initArea",
	"area-step": "initArea",
	"area-step-range": "initArea",
	bar: "initBar",
	bubble: "initCircle",
	bullet: "getBulletData",
	candlestick: "initCandlestick",
	donut: "initArc",
	funnel: "initFunnel",
	gauge: "initArc",
	line: "initLine",
	pie: "initArc",
	polar: "initPolar",
	radar: "initCircle",
	scatter: "initCircle",
	spline: "initLine",
	step: "initLine",
	treemap: "initTreemap"
};

/**
 * chart types by category
 * @private
 */
export const TYPE_BY_CATEGORY = {
	Area: [
		TYPE.AREA,
		TYPE.AREA_SPLINE,
		TYPE.AREA_SPLINE_RANGE,
		TYPE.AREA_LINE_RANGE,
		TYPE.AREA_STEP,
		TYPE.AREA_STEP_RANGE
	],
	AreaRange: [
		TYPE.AREA_SPLINE_RANGE,
		TYPE.AREA_LINE_RANGE,
		TYPE.AREA_STEP_RANGE
	],
	Arc: [
		TYPE.PIE,
		TYPE.DONUT,
		TYPE.GAUGE,
		TYPE.POLAR,
		TYPE.RADAR
	],
	Line: [
		TYPE.LINE,
		TYPE.SPLINE,
		TYPE.AREA,
		TYPE.AREA_SPLINE,
		TYPE.AREA_SPLINE_RANGE,
		TYPE.AREA_LINE_RANGE,
		TYPE.STEP,
		TYPE.AREA_STEP,
		TYPE.AREA_STEP_RANGE
	],
	Step: [
		TYPE.STEP,
		TYPE.AREA_STEP,
		TYPE.AREA_STEP_RANGE
	],
	Spline: [
		TYPE.SPLINE,
		TYPE.AREA_SPLINE,
		TYPE.AREA_SPLINE_RANGE
	]
};
