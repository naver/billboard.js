/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import shapeLine from '../../../ChartInternal/shape/line.js';
import shapePoint from '../../../ChartInternal/shape/point.js';
import optPoint from '../../Options/common/point.js';
import optLine from '../../Options/shape/line.js';
import { extendAxisModules } from '../axis.core.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Extend Axis
 * @param {Array<object>} module Module to be extended
 * @param {Array<object>} option Option object to be extended
 * @private
 */
function extendAxis(module = [], option = []) {
    extendAxisModules(module, option);
}
/**
 * Extend Line type modules
 * @param {object|Array<object>} module Module to be extended
 * @param {Array<object>} option Option object to be extended
 * @private
 */
function extendLine(module, option = []) {
    const modules = Array.isArray(module) ? module : (module ? [module] : []);
    extendAxisModules([shapePointCommon, shapePoint, shapeLine].concat(modules), [optPoint, optLine].concat(option));
}

export { extendAxis, extendLine };
