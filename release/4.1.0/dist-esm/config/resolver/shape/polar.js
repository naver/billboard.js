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
import polar_default from "../../../ChartInternal/shape/polar.js";
import polar_default$1 from "../../Options/shape/polar.js";
//#region src/config/resolver/shape/polar.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let polar = () => (extendArc([polar_default], [arc_default, polar_default$1]), (polar = () => TYPE.POLAR)());
//#endregion
export { polar };
