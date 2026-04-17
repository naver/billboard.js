/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiExport from "../../Chart/api/export";
import Chart from "../../Chart/Chart";

/**
 * Enable chart export API (chart.export()).
 * Tree-shakable: only bundled when imported.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 * @example
 * // ESM — import to enable chart.export()
 * import bb, {exportApi} from "billboard.js";
 *
 * const chart = bb.generate({
 *   ...exportApi(),
 *   data: { columns: [...] }
 * });
 *
 * chart.export(); // now available
 */
export let exportApi = (): Record<string, never> => {
	// Direct assignment overrides the stub installed by Chart/api/stubs.
	// (extend() skips existing keys; direct assignment makes the override explicit.)
	(Chart.prototype as any).export = apiExport.export;
	return (exportApi = () => ({}))();
};
