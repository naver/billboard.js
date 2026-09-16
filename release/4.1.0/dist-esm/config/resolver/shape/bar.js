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
import point_default from "../../../ChartInternal/shape/core/point.js";
import point_default$1 from "../../Options/common/point.js";
import { extendAxis } from "./axis.helpers.js";
import bar_default from "../../../ChartInternal/shape/bar.js";
import bar_default$1 from "../../Options/shape/bar.js";
//#region src/config/resolver/shape/bar.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let bar = () => (extendAxis([bar_default, point_default], [bar_default$1, point_default$1]), (bar = () => TYPE.BAR)());
//#endregion
export { bar };
