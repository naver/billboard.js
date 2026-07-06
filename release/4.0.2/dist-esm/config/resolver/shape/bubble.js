/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import shapeBubbleCommon from '../../../ChartInternal/shape/core/bubble.js';
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import shapePoint from '../../../ChartInternal/shape/point.js';
import { TYPE } from '../../const.js';
import optPoint from '../../Options/common/point.js';
import optBubble from '../../Options/shape/bubble.js';
import { extendAxis } from './axis.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let bubble = () => (extendAxis([shapePointCommon, shapePoint, shapeBubbleCommon], [optBubble, optPoint]), (bubble = () => TYPE.BUBBLE)());

export { bubble };
