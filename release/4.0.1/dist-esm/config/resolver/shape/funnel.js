/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import shapeFunnel from '../../../ChartInternal/shape/funnel.js';
import { TYPE } from '../../const.js';
import optFunnel from '../../Options/shape/funnel.js';
import { extendArc } from './arc.helpers.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
let funnel = () => (extendArc([shapeFunnel], [optFunnel]), (funnel = () => TYPE.FUNNEL)());

export { funnel };
