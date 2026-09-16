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
import { extendArc } from "./arc.helpers.js";
import pie_default from "../../Options/shape/pie.js";
//#region src/config/resolver/shape/pie.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let pie = () => (extendArc(void 0, [arc_default, pie_default]), (pie = () => TYPE.PIE)());
//#endregion
export { pie };
