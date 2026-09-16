/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import point_default from "../../../ChartInternal/shape/core/point.js";
import line_default from "../../../ChartInternal/shape/line.js";
import point_default$1 from "../../../ChartInternal/shape/point.js";
import point_default$2 from "../../Options/common/point.js";
import line_default$1 from "../../Options/shape/line.js";
import { extendAxisModules } from "../axis.core.js";
//#region src/config/resolver/shape/axis.helpers.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Extend Axis
* @param {Array<object>} module Module to be extended
* @param {Array<object>} option Option object to be extended
* @private
*/
function extendAxis(module = [], option = []) {
	extendAxisModules(module, option);
}
/**
* Extend Line type modules
* @param {object|Array<object>} module Module to be extended
* @param {Array<object>} option Option object to be extended
* @private
*/
function extendLine(module, option = []) {
	extendAxisModules([
		point_default,
		point_default$1,
		line_default
	].concat(Array.isArray(module) ? module : module ? [module] : []), [point_default$2, line_default$1].concat(option));
}
//#endregion
export { extendAxis, extendLine };
