/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import apiAxis from '../../Chart/api/axis.js';
import apiGroup from '../../Chart/api/group.js';
import apiX from '../../Chart/api/x.js';
import axis from '../../ChartInternal/Axis/Axis.js';
import eventrect from '../../ChartInternal/interactions/eventrect.js';
import clip from '../../ChartInternal/internals/clip.js';
import sizeAxis from '../../ChartInternal/internals/size.axis.js';
import optAxis from '../Options/axis/axis.js';
import optDataAxis from '../Options/data/axis.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Modules exports for Axis based chart
 */
// Chart
const api = [
    apiAxis,
    apiGroup,
    apiX
];
const internal = {
    axis,
    clip,
    eventrect,
    sizeAxis
};
const options = {
    optDataAxis,
    optAxis
};

export { api, internal, options };
