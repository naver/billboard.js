/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import { TYPE_BY_CATEGORY, TYPE } from '../../config/const.js';
import { isNumber, isArray, isString } from '../../module/util/type-checks.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Module-level constant: avoids re-creating the list on every isInterpolationType() call
// https://github.com/d3/d3-shape#curves
const INTERPOLATION_TYPES = new Set([
    "basis",
    "basis-closed",
    "basis-open",
    "bundle",
    "cardinal",
    "cardinal-closed",
    "cardinal-open",
    "catmull-rom",
    "catmull-rom-closed",
    "catmull-rom-open",
    "linear",
    "linear-closed",
    "monotone-x",
    "monotone-y",
    "natural"
]);
var typeInternals = {
    /**
     * Check if the given chart type is valid
     * @param {string} type Chart type string
     * @returns {boolean}
     * @private
     */
    isValidChartType(type) {
        return !!(type && Object.values(TYPE).indexOf(type) > -1);
    },
    setTargetType(targetIds, type) {
        const $$ = this;
        const { config, state: { withoutFadeIn } } = $$;
        $$.mapToTargetIds(targetIds).forEach(id => {
            withoutFadeIn[id] = type === config.data_types[id];
            config.data_types[id] = type;
        });
        if (!targetIds) {
            config.data_type = type;
        }
    },
    /**
     * Updte current used chart types
     * @private
     */
    updateTypesElements() {
        const $$ = this;
        const { state: { current } } = $$;
        Object.keys(TYPE).forEach(v => {
            const t = TYPE[v];
            const has = $$.hasType(t, null, true);
            const idx = current.types.indexOf(t);
            if (idx === -1 && has) {
                current.types.push(t);
            }
            else if (idx > -1 && !has) {
                current.types.splice(idx, 1);
            }
        });
        // Update current chart elements reference
        $$.setChartElements();
    },
    /**
     * Check if given chart types exists
     * @param {string} type Chart type
     * @param {Array} targetsValue Data array
     * @param {boolean} checkFromData Force to check type cotains from data targets
     * @returns {boolean}
     * @private
     */
    hasType(type, targetsValue, checkFromData = false) {
        const $$ = this;
        const { config, state: { current } } = $$;
        const types = config.data_types;
        const targets = targetsValue || $$.data.targets;
        if (!checkFromData && current.types?.indexOf(type) > -1) {
            return true;
        }
        else if (targets?.length) {
            return targets.some(target => {
                const t = types[target.id];
                return t === type || (!t && type === "line");
            });
        }
        else if (Object.keys(types).length) {
            return Object.values(types).some(t => t === type);
        }
        return config.data_type === type;
    },
    /**
     * Check if contains given chart types
     * @param {string} type Type key
     * @param {object} targets Target data
     * @param {Array} exclude Excluded types
     * @returns {boolean}
     * @private
     */
    hasTypeOf(type, targets, exclude = []) {
        if (type in TYPE_BY_CATEGORY) {
            return !TYPE_BY_CATEGORY[type]
                .filter((v) => exclude.indexOf(v) === -1)
                .every((v) => !this.hasType(v, targets));
        }
        return false;
    },
    /**
     * Check if given data is certain chart type
     * @param {object} d Data object
     * @param {string|Array} type chart type
     * @returns {boolean}
     * @private
     */
    isTypeOf(d, type) {
        const id = isString(d) ? d : d.id;
        const dataType = this.config && (this.config.data_types?.[id] || this.config.data_type);
        return isArray(type) ? type.indexOf(dataType) >= 0 : dataType === type;
    },
    hasPointType() {
        const $$ = this;
        return $$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter");
    },
    /**
     * Check if contains arc types chart
     * @param {object} targets Target data
     * @param {Array} exclude Excluded types
     * @returns {boolean}
     * @private
     */
    hasArcType(targets, exclude) {
        return this.hasTypeOf("Arc", targets, exclude);
    },
    hasMultiArcGauge() {
        return this.hasType("gauge") && this.config.gauge_type === "multi";
    },
    isLineType(d) {
        const id = isString(d) ? d : d.id;
        return !this.config.data_types[id] ||
            this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
    },
    isStepType(d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
    },
    isSplineType(d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
    },
    isAreaType(d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
    },
    isAreaRangeType(d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
    },
    isBarType(d) {
        return this.isTypeOf(d, "bar");
    },
    isBubbleType(d) {
        return this.isTypeOf(d, "bubble");
    },
    isCandlestickType(d) {
        return this.isTypeOf(d, "candlestick");
    },
    isScatterType(d) {
        return this.isTypeOf(d, "scatter");
    },
    isTreemapType(d) {
        return this.isTypeOf(d, "treemap");
    },
    isPieType(d) {
        return this.isTypeOf(d, "pie");
    },
    isFunnelType(d) {
        return this.isTypeOf(d, "funnel");
    },
    isGaugeType(d) {
        return this.isTypeOf(d, "gauge");
    },
    isDonutType(d) {
        return this.isTypeOf(d, "donut");
    },
    isPolarType(d) {
        return this.isTypeOf(d, "polar");
    },
    isRadarType(d) {
        return this.isTypeOf(d, "radar");
    },
    isArcType(d) {
        return this.isPieType(d) ||
            this.isDonutType(d) ||
            this.isGaugeType(d) ||
            this.isPolarType(d) ||
            this.isRadarType(d);
    },
    // determine if is 'circle' data point
    isCirclePoint(node) {
        const { config } = this;
        const pattern = config.point_pattern;
        const isCircle = node?.tagName === "circle" || (config.point_type === "circle" &&
            (!pattern || (isArray(pattern) && pattern.length === 0)));
        return isCircle;
    },
    lineData(d) {
        return this.isLineType(d) ? [d] : [];
    },
    arcData(d) {
        return this.isArcType(d.data) ? [d] : [];
    },
    /**
     * Get data adapt for data label showing
     * @param {object} d Data object
     * @returns {Array}
     * @private
     */
    labelishData(d) {
        return this.isBarType(d) ||
            this.isLineType(d) ||
            this.isScatterType(d) ||
            this.isBubbleType(d) ||
            this.isCandlestickType(d) ||
            this.isFunnelType(d) ||
            this.isRadarType(d) ||
            this.isTreemapType(d) ?
            d.values.filter(v => isNumber(v.value) || Boolean(v.value)) :
            [];
    },
    barLineBubbleData(d) {
        return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
    },
    isInterpolationType(type) {
        return INTERPOLATION_TYPES.has(type);
    }
};

export { typeInternals as default };
