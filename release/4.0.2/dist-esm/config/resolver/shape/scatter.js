/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import shapePoint from '../../../ChartInternal/shape/point.js';
import { TYPE } from '../../const.js';
import optPoint from '../../Options/common/point.js';
import optScatter from '../../Options/shape/scatter.js';
import { extendAxis } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let scatter = () => (extendAxis([shapePointCommon, shapePoint], [optPoint, optScatter]), (scatter = () => TYPE.SCATTER)());

export { scatter };
