/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapeGauge from '../../../ChartInternal/shape/gauge.js';
import { TYPE } from '../../const.js';
import optArc from '../../Options/shape/arc.js';
import optGauge from '../../Options/shape/gauge.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let gauge = () => (extendArc([shapeGauge], [optArc, optGauge]), (gauge = () => TYPE.GAUGE)());

export { gauge };
