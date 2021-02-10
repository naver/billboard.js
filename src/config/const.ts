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
	BAR: "bar",
	BUBBLE: "bubble",
	CANDLESTICK: "candlestick",
	DONUT: "donut",
	GAUGE: "gauge",
	LINE: "line",
	PIE: "pie",
	RADAR: "radar",
	SCATTER: "scatter",
	SPLINE: "spline",
	STEP: "step"
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
		TYPE.AREA_STEP
	],
	AreaRange: [
		TYPE.AREA_SPLINE_RANGE,
		TYPE.AREA_LINE_RANGE
	],
	Arc: [
		TYPE.PIE,
		TYPE.DONUT,
		TYPE.GAUGE,
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
		TYPE.AREA_STEP
	],
	Step: [
		TYPE.STEP,
		TYPE.AREA_STEP
	],
	Spline: [
		TYPE.SPLINE,
		TYPE.AREA_SPLINE,
		TYPE.AREA_SPLINE_RANGE
	]
};
