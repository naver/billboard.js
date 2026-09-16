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
import regions_default from "../../Chart/api/regions.js";
import region_default from "../../ChartInternal/internals/region.js";
//#region src/config/resolver/regions.ts
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
	extend(ChartInternal.prototype, region_default);
	Chart.prototype.regions = regions_default.regions;
	return (regions = () => ({}))();
};
//#endregion
export { regions };
