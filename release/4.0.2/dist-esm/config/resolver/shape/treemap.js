/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapeTreemap from '../../../ChartInternal/shape/treemap.js';
import { TYPE } from '../../const.js';
import optTreemap from '../../Options/shape/treemap.js';
import { extendAxis } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let treemap = () => (extendAxis([shapeTreemap], [optTreemap]), (treemap = () => TYPE.TREEMAP)());

export { treemap };
