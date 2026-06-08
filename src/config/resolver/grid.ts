/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiGrid from "../../Chart/api/grid";
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import internalGrid from "../../ChartInternal/internals/grid";
import {extend} from "../../module/util";
import optGrid from "../Options/common/grid";
import Options from "../Options/Options";

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
export let grid = (): Record<string, never> => {
	extend(ChartInternal.prototype, internalGrid);
	// Direct assignment overrides stubs installed by Chart/api/stubs.
	(Chart.prototype as any).xgrids = apiGrid.xgrids;
	(Chart.prototype as any).ygrids = apiGrid.ygrids;
	Options.setOptions([optGrid]);
	return (grid = () => ({}))();
};
