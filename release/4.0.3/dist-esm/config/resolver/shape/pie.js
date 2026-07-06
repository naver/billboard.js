/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { TYPE } from '../../const.js';
import optArc from '../../Options/shape/arc.js';
import optPie from '../../Options/shape/pie.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let pie = () => (extendArc(undefined, [optArc, optPie]), (pie = () => TYPE.PIE)());

export { pie };
