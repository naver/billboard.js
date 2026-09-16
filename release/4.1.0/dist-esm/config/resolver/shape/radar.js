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
import point_default from "../../../ChartInternal/shape/point.js";
import point_default$1 from "../../Options/common/point.js";
import { internal, options } from "../axis.js";
import { extendArc } from "./arc.helpers.js";
import radar_default from "../../../ChartInternal/shape/radar.js";
import radar_default$1 from "../../Options/shape/radar.js";
//#region src/config/resolver/shape/radar.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let radar = () => (extendArc([
	internal.eventrect,
	point_default,
	radar_default
], [
	point_default$1,
	radar_default$1,
	{ axis_x_categories: options.optAxis.axis_x_categories }
]), (radar = () => TYPE.RADAR)());
//#endregion
export { radar };
