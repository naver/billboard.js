/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapeBar from '../../../ChartInternal/shape/bar.js';
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import { TYPE } from '../../const.js';
import optPoint from '../../Options/common/point.js';
import optBar from '../../Options/shape/bar.js';
import { extendAxis } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let bar = () => (extendAxis([shapeBar, shapePointCommon], [optBar, optPoint]), (bar = () => TYPE.BAR)());

export { bar };
