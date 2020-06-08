/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import Chart from "./Chart/Chart";
import ChartInternal from "./ChartInternal/ChartInternal";
import {TYPE} from "./config/const";
import {extend} from "./module/util";

// Axis
import {
	api as apiAxis,
	internal as internalAxis
} from "./config/resolver/axis";

// Shape
import shapeArc from "./ChartInternal/shape/arc";
import shapeArea from "./ChartInternal/shape/area";
import shapeBar from "./ChartInternal/shape/bar";
import shapeBubble from "./ChartInternal/shape/bubble";
import shapeLine from "./ChartInternal/shape/line";
import shapePoint from "./ChartInternal/shape/point";
import shapeRadar from "./ChartInternal/shape/radar";

// Options
import Options from "./config/Options/Options";

// Axis based
import optDataAxis from "./config/Options/data/axis";
import optAxis from "./config/Options/axis/axis";
import optGrid from "./config/Options/common/grid";
import optPoint from "./config/Options/common/point";
import optSubchart from "./config/Options/common/subchart";
import optZoom from "./config/Options/common/zoom";

import optArea from "./config/Options/shape/area";
import optBar from "./config/Options/shape/bar";
import optBubble from "./config/Options/shape/bubble";
import optLine from "./config/Options/shape/line";
import optScatter from "./config/Options/shape/scatter";
import optSpline from "./config/Options/shape/spline";

// Non-Axis based
import optDonut from "./config/Options/shape/donut";
import optGauge from "./config/Options/shape/gauge";
import optPie from "./config/Options/shape/pie";
import optRadar from "./config/Options/shape/radar";

export {default, bb} from "./core";
export {
	area,
	areaLineRange,
	areaSpline,
	areaSplineRange,
	areaStep,
	bar,
	bubble,
	donut,
	gauge,
	line,
	pie,
	radar,
	scatter,
	spline,
	step
};

/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendAxis(module, option?): void {
	extend(ChartInternal.prototype, [...internalAxis, ...module]);
	extend(Chart.prototype, apiAxis);

	Options.setOptions([
		optDataAxis,
		optAxis,
		optGrid,
		optSubchart,
		optZoom
	].concat(option || []));
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
let donut = (): string => (extendArc(undefined, [optDonut]), (donut = () => TYPE.DONUT)());
let gauge = (): string => (extendArc(undefined, [optGauge]), (gauge = () => TYPE.GAUGE)());
let pie = (): string => (extendArc(undefined, [optPie]), (pie = () => TYPE.PIE)());
let radar = (): string => (
	extendArc([shapePoint, shapeRadar], [optPoint, optRadar]), (radar = () => TYPE.RADAR)()
);

// Axis based types
let bar = (): string => (extendAxis([shapeBar], optBar), (bar = () => TYPE.BAR)());
let bubble = (): string => (
	extendAxis([shapePoint, shapeBubble], [optBubble, optPoint]), (bubble = () => TYPE.BUBBLE)()
);
let scatter = (): string => (
	extendAxis([shapePoint], [optPoint, optScatter]), (scatter = () => TYPE.SCATTER)()
);
