/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasSubchart, {subchartDraw} from "../../canvas/subchart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {extend} from "../../module/util";
import {registerCanvasFeature} from "./canvasType";
import {subchartModule} from "./interaction/subchart";

/**
 * Enable subchart for the canvas entry: the subchart module with the canvas drawing and brush.
 * @returns {boolean} true
 */
export let subchart = (): boolean => {
	subchartModule();
	extend(ChartInternal.prototype, canvasSubchart);
	registerCanvasFeature("subchart", subchartDraw);
	return (subchart = () => true)();
};
