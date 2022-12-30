/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import Options from "../Options/Options";
import {TYPE} from "../const";
import {extend} from "../../module/util";

// Axis
import {
	api as axisAPI,
	internal as axisInternal,
	options as axisOptions
} from "./axis";

// Shape
import shapeArc from "../../ChartInternal/shape/arc";
import shapeArea from "../../ChartInternal/shape/area";
import shapeBar from "../../ChartInternal/shape/bar";
import shapeCandlestick from "../../ChartInternal/shape/candlestick";
import shapeGauge from "../../ChartInternal/shape/gauge";
import shapeBubble from "../../ChartInternal/shape/bubble";
import shapeLine from "../../ChartInternal/shape/line";
import shapePoint from "../../ChartInternal/shape/point";
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
	bar,
	bubble,
	candlestick,
	donut,
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
	extend(ChartInternal.prototype, axisInternal.concat(module));
	extend(Chart.prototype, axisAPI);
	Options.setOptions(axisOptions.concat(option || []));
}

/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendLine(module?, option?): void {
	extendAxis([shapePoint, shapeLine].concat(module || []));
	Options.setOptions([optPoint, optLine].concat(option || []));
}

/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendArc(module?, option?): void {
	extend(ChartInternal.prototype, [shapeArc].concat(module || []));
	Options.setOptions(option);
}

// Area types
let area = (): string => (
	extendLine(shapeArea, [optArea]), (area = () => TYPE.AREA)()
);
let areaLineRange = (): string => (
	extendLine(shapeArea, [optArea]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)()
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
	extendArc([shapePoint, shapeRadar], [optPoint, optRadar]), (radar = () => TYPE.RADAR)()
);

// Axis based types
let bar = (): string => (extendAxis([shapeBar], optBar), (bar = () => TYPE.BAR)());
let bubble = (): string => (
	extendAxis([shapePoint, shapeBubble], [optBubble, optPoint]), (bubble = () => TYPE.BUBBLE)()
);
let candlestick = (): string => (
	extendAxis([shapeCandlestick], [optCandlestick]), (candlestick = () => TYPE.CANDLESTICK)()
);
let scatter = (): string => (
	extendAxis([shapePoint], [optPoint, optScatter]), (scatter = () => TYPE.SCATTER)()
);

// Non Axis based types
let treemap = (): string => (
	extendAxis([shapeTreemap], [optTreemap]), (treemap = () => TYPE.TREEMAP)()
);
