/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasFlow from "../../canvas/flow";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {extend} from "../../module/util";
import {flow as svgFlow} from "./flow";

/**
 * Enable chart flow API for the canvas entry: the flow module with the canvas animation.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 */
export let flow = (): Record<string, never> => {
	svgFlow();
	extend(ChartInternal.prototype, canvasFlow);
	return (flow = () => ({}))();
};
