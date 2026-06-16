/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import shapePoint from '../../../ChartInternal/shape/point.js';
import shapeRadar from '../../../ChartInternal/shape/radar.js';
import { TYPE } from '../../const.js';
import optPoint from '../../Options/common/point.js';
import optRadar from '../../Options/shape/radar.js';
import { options, internal } from '../axis.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let radar = () => (extendArc([internal.eventrect, shapePoint, shapeRadar], [optPoint, optRadar, { axis_x_categories: options.optAxis.axis_x_categories }]), (radar = () => TYPE.RADAR)());

export { radar };
