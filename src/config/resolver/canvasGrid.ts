/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import canvasGrid from "../../canvas/grid";
import {registerCanvasFeature} from "./canvasType";
import {grid as svgGrid} from "./grid";

/**
 * Enable grid for the canvas entry: the grid module with the canvas drawing of the grid.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 */
export let grid = (): Record<string, never> => {
	svgGrid();
	registerCanvasFeature("grid", canvasGrid);
	return (grid = () => ({}))();
};
