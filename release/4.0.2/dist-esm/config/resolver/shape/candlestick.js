/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapeCandlestick from '../../../ChartInternal/shape/candlestick.js';
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import { TYPE } from '../../const.js';
import optPoint from '../../Options/common/point.js';
import optCandlestick from '../../Options/shape/candlestick.js';
import { extendAxis } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let candlestick = () => (extendAxis([shapeCandlestick, shapePointCommon], [optCandlestick, optPoint]), (candlestick = () => TYPE.CANDLESTICK)());

export { candlestick };
