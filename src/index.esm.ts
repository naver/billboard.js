/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import Chart from "./Chart/Chart";
import ChartInternal from "./ChartInternal/ChartInternal";
import Options from "./config/Options/Options";
import {TYPE} from "./config/const";
import {extend} from "./module/util";
import {
	axisAPI, axisInternal, axisOptions,

	shapeArc, shapeArea, shapeBar, shapeBubble,
	shapeGauge, shapeLine, shapePoint, shapeRadar,

	optPoint, optArea, optBar, optBubble, optLine, optScatter,
	optSpline, optDonut, optGauge, optPie, optRadar
} from "./config/resolver";

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
let donut = (): string => (extendArc(undefined, [optDonut]), (donut = () => TYPE.DONUT)());
let gauge = (): string => (extendArc([shapeGauge], [optGauge]), (gauge = () => TYPE.GAUGE)());
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
