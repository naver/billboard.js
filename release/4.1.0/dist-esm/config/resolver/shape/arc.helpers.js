/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { extend } from "../../../module/util/object.js";
import Options from "../../Options/Options.js";
import ChartInternal from "../../../ChartInternal/ChartInternal.js";
import point_default from "../../../ChartInternal/shape/core/point.js";
import point_default$1 from "../../Options/common/point.js";
import arc_default from "../../../ChartInternal/shape/arc.js";
//#region src/config/resolver/shape/arc.helpers.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Extend Arc type modules
* @param {Array} module Module to be extended
* @param {Array} option Option object to be extended
* @private
*/
function extendArc(module, option) {
	extend(ChartInternal.prototype, [arc_default, point_default].concat(module || []));
	Options.setOptions([point_default$1].concat(option || []));
}
//#endregion
export { extendArc };
