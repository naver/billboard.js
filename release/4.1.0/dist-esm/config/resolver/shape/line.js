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
import spline_default from "../../Options/shape/spline.js";
import { extendLine } from "./axis.helpers.js";
//#region src/config/resolver/shape/line.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let line = () => (extendLine(), (line = () => TYPE.LINE)());
let spline = () => (extendLine(void 0, [spline_default]), (spline = () => TYPE.SPLINE)());
let step = () => (extendLine(), (step = () => TYPE.STEP)());
//#endregion
export { line, spline, step };
