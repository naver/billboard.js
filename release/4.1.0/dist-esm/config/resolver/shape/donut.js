/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { TYPE } from "../../const.js";
import arc_default from "../../Options/shape/arc.js";
import donut_default from "../../Options/shape/donut.js";
import { extendArc } from "./arc.helpers.js";
//#region src/config/resolver/shape/donut.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let donut = () => (extendArc(void 0, [arc_default, donut_default]), (donut = () => TYPE.DONUT)());
//#endregion
export { donut };
