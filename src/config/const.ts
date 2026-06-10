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
 * @private
 */
export const TYPE_METHOD_NEEDED = {
	AREA: "initArea",
	AREA_LINE_RANGE: "initArea",
	AREA_SPLINE: "initArea",
	AREA_SPLINE_RANGE: "initArea",
	AREA_STEP: "initArea",
	AREA_STEP_RANGE: "initArea",
	BAR: "initBar",
	BUBBLE: "initCircle",
	CANDLESTICK: "initCandlestick",
	DONUT: "initArc",
	FUNNEL: "initFunnel",
	GAUGE: "initArc",
	LINE: "initLine",
	PIE: "initArc",
	POLAR: "initPolar",
	RADAR: "initCircle",
	SCATTER: "initCircle",
	SPLINE: "initLine",
	STEP: "initLine",
	TREEMAP: "initTreemap"
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
