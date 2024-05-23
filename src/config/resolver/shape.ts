/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {extend} from "../../module/util";
import {TYPE} from "../const";
import Options from "../Options/Options";

// Axis
import {api as axisAPI, internal as axisInternal, options as axisOptions} from "./axis";

// Shape
import shapeArc from "../../ChartInternal/shape/arc";
import shapeArea from "../../ChartInternal/shape/area";
import shapeBar from "../../ChartInternal/shape/bar";
import shapeBubble from "../../ChartInternal/shape/bubble";
import shapeCandlestick from "../../ChartInternal/shape/candlestick";
import shapeFunnel from "../../ChartInternal/shape/funnel";
import shapeGauge from "../../ChartInternal/shape/gauge";
import shapeLine from "../../ChartInternal/shape/line";
import shapePoint from "../../ChartInternal/shape/point";
import shapePointCommon from "../../ChartInternal/shape/point.common";
import shapePolar from "../../ChartInternal/shape/polar";
import shapeRadar from "../../ChartInternal/shape/radar";
import shapeTreemap from "../../ChartInternal/shape/treemap";

// Options
import optPoint from "../Options/common/point";
import optArea from "../Options/shape/area";
import optBar from "../Options/shape/bar";
import optBubble from "../Options/shape/bubble";
import optCandlestick from "../Options/shape/candlestick";
import optLine from "../Options/shape/line";
import optScatter from "../Options/shape/scatter";
import optSpline from "../Options/shape/spline";

// Non-Axis based
import optArc from "../Options/shape/arc";
import optDonut from "../Options/shape/donut";
import optFunnel from "../Options/shape/funnel";
import optGauge from "../Options/shape/gauge";
import optPie from "../Options/shape/pie";
import optPolar from "../Options/shape/polar";
import optRadar from "../Options/shape/radar";
import optTreemap from "../Options/shape/treemap";

export {
	area,
	areaLineRange,
	areaSpline,
	areaSplineRange,
	areaStep,
	areaStepRange,
	bar,
	bubble,
	candlestick,
	donut,
	funnel,
	gauge,
	line,
	pie,
	polar,
	radar,
	scatter,
	spline,
	step,
	treemap
};

/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendAxis(module, option?): void {
	extend(ChartInternal.prototype, Object.values(axisInternal).concat(module));
	extend(Chart.prototype, axisAPI);
	Options.setOptions(Object.values(axisOptions).concat(option || []));
}

/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendLine(module?, option?): void {
	extendAxis([shapePointCommon, shapePoint, shapeLine].concat(module || []));
	Options.setOptions([optPoint, optLine].concat(option || []));
}

/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendArc(module?, option?): void {
	extend(ChartInternal.prototype, [shapeArc, shapePointCommon].concat(module || []));
	Options.setOptions([optPoint].concat(option || []));
}

// Area types
let area = (): string => (
	extendLine(shapeArea, [optArea]), (area = () => TYPE.AREA)()
);
let areaLineRange = (): string => (
	extendLine(shapeArea, [optArea]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)()
);
let areaStepRange = (): string => (
	extendLine(shapeArea, [optArea]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)()
);
let areaSpline = () => (
	extendLine(shapeArea, [optArea, optSpline]), (areaSpline = () => TYPE.AREA_SPLINE)()
);
let areaSplineRange = (): string => (
	extendLine(shapeArea, [optArea, optSpline]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)()
);
let areaStep = (): string => (
	extendLine(shapeArea, [optArea]), (areaStep = () => TYPE.AREA_STEP)()
);

// Line types
let line = (): string => (extendLine(), (line = () => TYPE.LINE)());
let spline = (): string => (extendLine(undefined, [optSpline]), (spline = () => TYPE.SPLINE)());
let step = (): string => (extendLine(), (step = () => TYPE.STEP)());

// Arc types
let donut = (): string => (
	extendArc(undefined, [optArc, optDonut]), (donut = () => TYPE.DONUT)()
);
let gauge = (): string => (
	extendArc([shapeGauge], [optArc, optGauge]), (gauge = () => TYPE.GAUGE)()
);
let pie = (): string => (
	extendArc(undefined, [optArc, optPie]), (pie = () => TYPE.PIE)()
);
let polar = (): string => (
	extendArc([shapePolar], [optArc, optPolar]), (polar = () => TYPE.POLAR)()
);
let radar = (): string => (
	extendArc(
		[axisInternal.eventrect, shapePoint, shapeRadar],
		[optPoint, optRadar, {axis_x_categories: axisOptions.optAxis.axis_x_categories}]
	), (radar = () => TYPE.RADAR)()
);

// Axis based types
let bar = (): string => (
	extendAxis([shapeBar, shapePointCommon], [optBar, optPoint]), (bar = () => TYPE.BAR)()
);
let bubble = (): string => (
	extendAxis(
		[shapePointCommon, shapePoint, shapeBubble],
		[optBubble, optPoint]
	), (bubble = () => TYPE.BUBBLE)()
);
let candlestick = (): string => (
	extendAxis(
		[shapeCandlestick, shapePointCommon],
		[optCandlestick, optPoint]
	), (candlestick = () => TYPE.CANDLESTICK)()
);
let scatter = (): string => (
	extendAxis(
		[shapePointCommon, shapePoint],
		[optPoint, optScatter]
	), (scatter = () => TYPE.SCATTER)()
);

// Non Axis based types
let funnel = (): string => (
	extendArc([shapeFunnel], [optFunnel]), (funnel = () => TYPE.FUNNEL)()
);
let treemap = (): string => (
	extendAxis([shapeTreemap], [optTreemap]), (treemap = () => TYPE.TREEMAP)()
);
