/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import apiRegion from '../../Chart/api/regions.js';
import Chart from '../../Chart/Chart.js';
import ChartInternal from '../../ChartInternal/ChartInternal.js';
import internalRegion from '../../ChartInternal/internals/region.js';
import { extend } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Enable chart regions API (chart.regions()).
 * Tree-shakable: only bundled when imported.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 * @example
 * // ESM — import to enable regions API and region rendering
 * import bb, {bar, regions} from "billboard.js";
 *
 * const chart = bb.generate({
 *   ...bar(),
 *   ...regions(),
 *   data: { columns: [...] },
 *   regions: [{ start: 1, end: 2, class: "hl" }]
 * });
 *
 * chart.regions([{start: 1, end: 3}]);
 */
let regions = () => {
    extend(ChartInternal.prototype, internalRegion);
    // Direct assignment overrides stub installed by Chart/api/stubs.
    Chart.prototype.regions = apiRegion.regions;
    return (regions = () => ({}))();
};

export { regions };
