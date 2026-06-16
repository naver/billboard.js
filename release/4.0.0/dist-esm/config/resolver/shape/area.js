/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import shapeArea from '../../../ChartInternal/shape/area.js';
import { TYPE } from '../../const.js';
import optArea from '../../Options/shape/area.js';
import optSpline from '../../Options/shape/spline.js';
import { extendLine } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let area = () => (extendLine(shapeArea, [optArea]), (area = () => TYPE.AREA)());
let areaLineRange = () => (extendLine(shapeArea, [optArea]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)());
let areaStepRange = () => (extendLine(shapeArea, [optArea]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)());
let areaSpline = () => (extendLine(shapeArea, [optArea, optSpline]), (areaSpline = () => TYPE.AREA_SPLINE)());
let areaSplineRange = () => (extendLine(shapeArea, [optArea, optSpline]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)());
let areaStep = () => (extendLine(shapeArea, [optArea]), (areaStep = () => TYPE.AREA_STEP)());

export { area, areaLineRange, areaSpline, areaSplineRange, areaStep, areaStepRange };
