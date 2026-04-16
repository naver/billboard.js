/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiFlow from "../../Chart/api/flow";
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import internalFlow from "../../ChartInternal/interactions/flow";
import {extend} from "../../module/util";

/**
 * Enable chart flow API (chart.flow()).
 * Tree-shakable: only bundled when imported.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 * @example
 * // ESM — import to enable chart.flow()
 * import bb, {bar, flow} from "billboard.js";
 *
 * const chart = bb.generate({
 *   ...bar(),
 *   ...flow(),
 *   data: { columns: [...] }
 * });
 *
 * chart.flow({ columns: [...] }); // now available
 */
export let flow = (): Record<string, never> => {
	extend(ChartInternal.prototype, internalFlow);
	delete (Chart.prototype as any).flow; // remove stub before extending
	extend(Chart.prototype, [apiFlow]);
	return (flow = () => ({}))();
};
