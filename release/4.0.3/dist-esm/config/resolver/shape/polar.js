/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import shapePolar from '../../../ChartInternal/shape/polar.js';
import { TYPE } from '../../const.js';
import optArc from '../../Options/shape/arc.js';
import optPolar from '../../Options/shape/polar.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let polar = () => (extendArc([shapePolar], [optArc, optPolar]), (polar = () => TYPE.POLAR)());

export { polar };
