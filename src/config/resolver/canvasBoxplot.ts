/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasBoxplotDraw from "../../canvas/boxplot";
import shapeBoxplotCommon from "../../ChartInternal/shape/core/boxplot";
import optPoint from "../Options/common/point";
import optBoxplot from "../Options/shape/boxplot";
import {extendAxisModules} from "./axis.core";
import {registerAxisType} from "./customType";
import {boxplotAxisType} from "./shape/boxplot";

/**
 * Canvas boxplot shape marker.
 * Installed to satisfy chart type import checks without importing the SVG boxplot renderer.
 * @private
 */
const canvasBoxplotModule = {
	/**
	 * No-op canvas boxplot initializer.
	 * Canvas mode draws boxplots through the module of the type.
	 * @private
	 */
	initBoxplot(): void {},

	/**
	 * No-op: boxplot has no SVG elements in canvas mode.
	 * @private
	 */
	updateTargetsForBoxplot(): void {}
};

/**
 * Register modules and options required for canvas boxplot charts.
 * Canvas mode draws the boxplot through the module of the type: bundles without it do not carry it.
 * @returns {string} Boxplot chart type
 */
export let boxplot = (): string => (
	extendAxisModules([canvasBoxplotModule, shapeBoxplotCommon], [optPoint, optBoxplot]),
		registerAxisType("boxplot", {...boxplotAxisType, canvas: canvasBoxplotDraw}),
		(boxplot = () => "boxplot")()
);
