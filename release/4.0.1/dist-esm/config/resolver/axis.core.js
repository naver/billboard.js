/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import Chart from '../../Chart/Chart.js';
import ChartInternal from '../../ChartInternal/ChartInternal.js';
import Options from '../Options/Options.js';
import { api, internal, options } from './axis.js';
import { extend } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get object values without requiring Object.values().
 * @param {object} obj Source object
 * @returns {Array} Object values
 * @private
 */
function getValues(obj) {
    return Object.keys(obj).map(key => obj[key]);
}
/**
 * Extend shared axis modules without importing renderer-specific shape modules.
 * @param {Array} module Internal modules
 * @param {Array} option Option modules
 * @private
 */
function extendAxisModules(module = [], option = []) {
    extend(ChartInternal.prototype, getValues(internal).concat(module));
    extend(Chart.prototype, api);
    Options.setOptions(getValues(options).concat(option));
}

export { extendAxisModules };
