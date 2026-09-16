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
import category_default from "../../Chart/api/category.js";
//#region src/config/resolver/category.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Enable chart category API (chart.category() / chart.categories()).
* Tree-shakable: only bundled when imported.
* @returns {object} Empty options object (safe to spread into bb.generate())
* @example
* // ESM — import to enable category APIs
* import bb, {bar, category} from "billboard.js";
*
* const chart = bb.generate({
*   ...bar(),
*   ...category(),
*   data: { columns: [...] }
* });
*
* chart.categories(["A", "B", "C"]);
*/
let category = () => {
	Chart.prototype.category = category_default.category;
	Chart.prototype.categories = category_default.categories;
	return (category = () => ({}))();
};
//#endregion
export { category };
