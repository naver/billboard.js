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
