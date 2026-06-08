/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiRegion from "../../Chart/api/regions";
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import internalRegion from "../../ChartInternal/internals/region";
import {extend} from "../../module/util";

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
export let regions = (): Record<string, never> => {
	extend(ChartInternal.prototype, internalRegion);
	// Direct assignment overrides stub installed by Chart/api/stubs.
	(Chart.prototype as any).regions = apiRegion.regions;
	return (regions = () => ({}))();
};
