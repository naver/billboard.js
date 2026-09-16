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
import gauge_default from "../../../ChartInternal/shape/gauge.js";
import gauge_default$1 from "../../Options/shape/gauge.js";
//#region src/config/resolver/shape/gauge.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let gauge = () => (extendArc([gauge_default], [arc_default, gauge_default$1]), (gauge = () => TYPE.GAUGE)());
//#endregion
export { gauge };
