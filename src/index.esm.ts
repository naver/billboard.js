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
const area = (): string => (extendLine(shapeArea, [optArea]), TYPE.AREA);
const areaLineRange = (): string => (extendLine(shapeArea, [optArea]), TYPE.AREA_LINE_RANGE);
const areaSpline = () => (extendLine(shapeArea, [optArea, optSpline]), TYPE.AREA_SPLINE);
const areaSplineRange = (): string => (
	extendLine(shapeArea, [optArea, optSpline]), TYPE.AREA_SPLINE_RANGE
);
const areaStep = (): string => (extendLine(shapeArea, [optArea]), TYPE.AREA_STEP);

// Line types
const line = (): string => (extendLine(), TYPE.LINE);
const spline = (): string => (extendLine(undefined, [optSpline]), TYPE.SPLINE);
const step = (): string => (extendLine(), TYPE.STEP);

// Arc types
const donut = (): string => (extendArc(undefined, [optDonut]), TYPE.DONUT);
const gauge = (): string => (extendArc(undefined, [optGauge]), TYPE.GAUGE);
const pie = (): string => (extendArc(undefined, [optPie]), TYPE.PIE);
const radar = (): string => (extendArc([shapePoint, shapeRadar], [optPoint, optRadar]), TYPE.RADAR);

// Axis based types
const bar = (): string => (extendAxis([shapeBar], optBar), TYPE.BAR);
const bubble = (): string => (
	extendAxis([shapePoint, shapeBubble], [optBubble, optPoint]), TYPE.BUBBLE
);
const scatter = (): string => (extendAxis([shapePoint], [optPoint, optScatter]), TYPE.SCATTER);
