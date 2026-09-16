/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { extend } from "../../module/util/object.js";
import Options from "../Options/Options.js";
import ChartInternal from "../../ChartInternal/ChartInternal.js";
import Chart from "../../Chart/Chart.js";
import grid_default from "../../Chart/api/grid.js";
import grid_default$1 from "../../ChartInternal/internals/grid.js";
import grid_default$2 from "../Options/common/grid.js";
//#region src/config/resolver/grid.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Enable chart grid API (chart.xgrids() / chart.ygrids()).
* Tree-shakable: only bundled when imported.
* @returns {object} Empty options object (safe to spread into bb.generate())
* @example
* // ESM — import to enable grid APIs and grid rendering
* import bb, {bar, grid} from "billboard.js";
*
* const chart = bb.generate({
*   ...bar(),
*   ...grid(),
*   data: { columns: [...] },
*   grid: { x: { lines: [...] } }
* });
*
* chart.xgrids([{value: 1, text: "Label"}]);
*/
let grid = () => {
	extend(ChartInternal.prototype, grid_default$1);
	Chart.prototype.xgrids = grid_default.xgrids;
	Chart.prototype.ygrids = grid_default.ygrids;
	Options.setOptions([grid_default$2]);
	return (grid = () => ({}))();
};
//#endregion
export { grid };
