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
 * @returns {boolean}
 */
function extendAxis(...module) {
	extend(ChartInternal.prototype, [...internalAxis, ...module]);
	extend(Chart.prototype, apiAxis);
	return true;
}

/**
 * Extend Line type modules
 * @param {Array} module Module to be extended
 * @returns {boolean}
 */
function extendLine(...module) {
	extendAxis(shapePoint, shapeLine, ...module);
	return true;
}

/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @returns {boolean}
 */
function extendArc(...module) {
	extend(ChartInternal.prototype, [shapeArc, ...module]);
	return true;
}

// Area types
const area = () => (extendLine(shapeArea) && TYPE.AREA);
const areaLineRange = () => (extendLine(shapeArea) && TYPE.AREA_LINE_RANGE);
const areaSpline = () => (extendLine(shapeArea) && TYPE.AREA_SPLINE);
const areaSplineRange = () => (extendLine(shapeArea) && TYPE.AREA_SPLINE_RANGE);
const areaStep = () => (extendLine(shapeArea) && TYPE.AREA_STEP);

// Line types
const line = () => (extendLine() && TYPE.LINE);
const spline = () => (extendLine() && TYPE.SPLINE);
const step = () => (extendLine() && TYPE.STEP);

// Arc types
const donut = () => (extendArc() && TYPE.DONUT);
const gauge = () => (extendArc() && TYPE.GAUGE);
const pie = () => (extendArc() && TYPE.PIE);
const radar = () => (extendArc(shapePoint, shapeRadar) && TYPE.RADAR);

// Axis based types
const bar = () => (extendAxis(shapeBar) && TYPE.BAR);
const bubble = () => (extendAxis(shapePoint, shapeBubble) && TYPE.BUBBLE);
const scatter = () => (extendAxis(shapePoint) && TYPE.SCATTER);
