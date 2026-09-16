/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import axis_default from "../../Chart/api/axis.js";
import group_default from "../../Chart/api/group.js";
import x_default from "../../Chart/api/x.js";
import Axis_default from "../../ChartInternal/Axis/Axis.js";
import eventrect_default from "../../ChartInternal/interactions/eventrect.js";
import clip_default from "../../ChartInternal/internals/clip.js";
import size_axis_default from "../../ChartInternal/internals/size.axis.js";
import axis_default$1 from "../Options/axis/axis.js";
import axis_default$2 from "../Options/data/axis.js";
//#region src/config/resolver/axis.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Modules exports for Axis based chart
*/
const api = [
	axis_default,
	group_default,
	x_default
];
const internal = {
	axis: Axis_default,
	clip: clip_default,
	eventrect: eventrect_default,
	sizeAxis: size_axis_default
};
const options = {
	optDataAxis: axis_default$2,
	optAxis: axis_default$1
};
//#endregion
export { api, internal, options };
