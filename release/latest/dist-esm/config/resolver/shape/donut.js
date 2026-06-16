/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { TYPE } from '../../const.js';
import optArc from '../../Options/shape/arc.js';
import optDonut from '../../Options/shape/donut.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let donut = () => (extendArc(undefined, [optArc, optDonut]), (donut = () => TYPE.DONUT)());

export { donut };
