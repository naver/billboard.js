/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
//#region src/ChartInternal/internals/category.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
var category_default = { 
/**
* Category Name
* @param {number} i Index number
* @returns {string} category Name
* @private
*/
categoryName(i) {
	const { axis_x_categories } = this.config;
	return axis_x_categories?.[i] ?? i;
} };
//#endregion
export { category_default as default };
