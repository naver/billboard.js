/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { KEY } from '../../../module/Cache.js';
import { isObject, isFunction, isNumber } from '../../../module/util/type-checks.js';
import { getMinMax } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeBubbleCommon = {
    /**
     * Initializer
     * @private
     */
    initBubble() {
        const $$ = this;
        const { config } = $$;
        if ($$.hasType("bubble")) {
            config.point_show = true;
            config.point_type = "circle";
        }
    },
    /**
     * Get user agent's computed value
     * @returns {number}
     * @private
     */
    getBaseLength() {
        const $$ = this;
        const { width, height } = $$.state;
        const cacheKey = KEY.bubbleBaseLength;
        let baseLength = $$.cache.get(cacheKey);
        if (!baseLength) {
            $$.cache.add(cacheKey, baseLength = getMinMax("min", [width, height]));
        }
        return baseLength;
    },
    /**
     * Get the radius value for bubble circle
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    getBubbleR(d) {
        const $$ = this;
        let maxR = $$.config.bubble_maxR;
        if (isFunction(maxR)) {
            maxR = maxR.bind($$.api)(d);
        }
        else if (!isNumber(maxR)) {
            maxR = ($$.getBaseLength() / ($$.getMaxDataCount() * 2)) + 12;
        }
        const cacheKey = KEY.bubbleMaxValue;
        let max = $$.cache.get(cacheKey);
        if (max === null) {
            $$.cache.add(cacheKey, max = getMinMax("max", $$.getMinMaxData().max.map(d => ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "y") : (isObject(d.value) ? d.value.mid : d.value)))));
        }
        const maxArea = maxR * maxR * Math.PI;
        const area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) *
            (maxArea / max);
        return Math.sqrt(area / Math.PI);
    },
    /**
     * Get bubble dimension data
     * @param {object|Array} d data value
     * @param {string} type - y or z
     * @returns {number}
     * @private
     */
    getBubbleZData(d, type) {
        return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
    }
};

export { shapeBubbleCommon as default };
