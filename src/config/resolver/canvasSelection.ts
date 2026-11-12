/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasSelection, {selectionDraw} from "../../canvas/selection";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {extend} from "../../module/util";
import {registerCanvasFeature} from "./canvasType";
import {selectionModule} from "./interaction/selection";

/**
 * Enable data selection for the canvas entry: the selection module with the canvas selection.
 * @returns {boolean} true
 */
export let selection = (): boolean => {
	selectionModule();
	extend(ChartInternal.prototype, canvasSelection);
	registerCanvasFeature("selection", selectionDraw);
	return (selection = () => true)();
};
