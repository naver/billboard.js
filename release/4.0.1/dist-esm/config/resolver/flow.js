/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import apiFlow from '../../Chart/api/flow.js';
import Chart from '../../Chart/Chart.js';
import ChartInternal from '../../ChartInternal/ChartInternal.js';
import internalFlow from '../../ChartInternal/interactions/flow.js';
import { extend } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
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
let flow = () => {
    extend(ChartInternal.prototype, internalFlow);
    // Direct assignment overrides the stub installed by Chart/api/stubs.
    // (extend() skips existing keys; direct assignment makes the override explicit.)
    Chart.prototype.flow = apiFlow.flow;
    return (flow = () => ({}))();
};

export { flow };
