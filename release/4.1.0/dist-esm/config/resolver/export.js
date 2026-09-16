/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import Chart from "../../Chart/Chart.js";
import export_default from "../../Chart/api/export.js";
//#region src/config/resolver/export.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
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
let exportApi = () => {
	Chart.prototype.export = export_default.export;
	return (exportApi = () => ({}))();
};
//#endregion
export { exportApi };
