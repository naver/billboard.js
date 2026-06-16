/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import ChartInternal from '../../../ChartInternal/ChartInternal.js';
import shapeArc from '../../../ChartInternal/shape/arc.js';
import shapePointCommon from '../../../ChartInternal/shape/core/point.js';
import optPoint from '../../Options/common/point.js';
import Options from '../../Options/Options.js';
import { extend } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendArc(module, option) {
    extend(ChartInternal.prototype, [shapeArc, shapePointCommon].concat(module || []));
    Options.setOptions([optPoint].concat(option || []));
}

export { extendArc };
