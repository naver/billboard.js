/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import apiGrid from '../../Chart/api/grid.js';
import Chart from '../../Chart/Chart.js';
import ChartInternal from '../../ChartInternal/ChartInternal.js';
import internalGrid from '../../ChartInternal/internals/grid.js';
import optGrid from '../Options/common/grid.js';
import Options from '../Options/Options.js';
import { extend } from '../../module/util/object.js';

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
    extend(ChartInternal.prototype, internalGrid);
    // Direct assignment overrides stubs installed by Chart/api/stubs.
    Chart.prototype.xgrids = apiGrid.xgrids;
    Chart.prototype.ygrids = apiGrid.ygrids;
    Options.setOptions([optGrid]);
    return (grid = () => ({}))();
};

export { grid };
