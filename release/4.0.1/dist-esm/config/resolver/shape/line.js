/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import { TYPE } from '../../const.js';
import optSpline from '../../Options/shape/spline.js';
import { extendLine } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let line = () => (extendLine(), (line = () => TYPE.LINE)());
let spline = () => (extendLine(undefined, [optSpline]), (spline = () => TYPE.SPLINE)());
let step = () => (extendLine(), (step = () => TYPE.STEP)());

export { line, spline, step };
