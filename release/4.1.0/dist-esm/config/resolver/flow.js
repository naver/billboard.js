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
import ChartInternal from "../../ChartInternal/ChartInternal.js";
import Chart from "../../Chart/Chart.js";
import flow_default from "../../Chart/api/flow.js";
import flow_default$1 from "../../ChartInternal/interactions/flow.js";
//#region src/config/resolver/flow.ts
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
	extend(ChartInternal.prototype, flow_default$1);
	Chart.prototype.flow = flow_default.flow;
	return (flow = () => ({}))();
};
//#endregion
export { flow };
