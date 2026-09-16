/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { brushSelection } from "d3-brush";
//#region src/module/util/brush.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
* @ignore
*/
/**
* Return brush selection array
* @param {object} ctx Current instance
* @returns {d3.brushSelection}
* @private
*/
function getBrushSelection(ctx) {
	const { event, $el } = ctx;
	const main = $el.subchart.main || $el.main;
	let selection;
	if (event && event.type === "brush") selection = event.selection;
	else if (main && (selection = main.select(".bb-brush").node())) selection = brushSelection(selection);
	return selection;
}
/**
* Check if brush is empty
* @param {object} ctx Bursh context
* @returns {boolean}
* @private
*/
function brushEmpty(ctx) {
	const selection = getBrushSelection(ctx);
	if (selection) return selection[0] === selection[1];
	return true;
}
//#endregion
export { brushEmpty, getBrushSelection };
