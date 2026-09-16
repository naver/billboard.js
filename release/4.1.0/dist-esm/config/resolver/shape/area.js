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
import area_default from "../../../ChartInternal/shape/area.js";
import area_default$1 from "../../Options/shape/area.js";
import spline_default from "../../Options/shape/spline.js";
import { extendLine } from "./axis.helpers.js";
//#region src/config/resolver/shape/area.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
let area = () => (extendLine(area_default, [area_default$1]), (area = () => TYPE.AREA)());
let areaLineRange = () => (extendLine(area_default, [area_default$1]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)());
let areaStepRange = () => (extendLine(area_default, [area_default$1]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)());
let areaSpline = () => (extendLine(area_default, [area_default$1, spline_default]), (areaSpline = () => TYPE.AREA_SPLINE)());
let areaSplineRange = () => (extendLine(area_default, [area_default$1, spline_default]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)());
let areaStep = () => (extendLine(area_default, [area_default$1]), (areaStep = () => TYPE.AREA_STEP)());
//#endregion
export { area, areaLineRange, areaSpline, areaSplineRange, areaStep, areaStepRange };
