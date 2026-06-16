/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import CLASS from '../../config/classes.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Hoisted to module level to avoid recompilation on every getTargetSelectorSuffix() call
const RE_SELECTOR_SUFFIX = /[\x00-\x20\x7F-\xA0\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g; // eslint-disable-line no-control-regex
var classModule = {
    generateClass(prefix, targetId) {
        const cache = this.state.generateClassCache;
        const key = `${prefix}\0${targetId}`;
        let cls = cache.get(key);
        if (!cls) {
            cls = ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
            cache.set(key, cls);
        }
        return cls;
    },
    /**
     * Get class string
     * @param {string} type Shape type
     * @param {boolean} withShape Get with shape prefix
     * @returns {string} Class string
     * @private
     */
    getClass(type, withShape) {
        const isPlural = /s$/.test(type);
        const useIdKey = /^(area|arc|line|funnel|treemap)s?$/.test(type);
        const key = isPlural ? "id" : "index";
        return (d) => {
            const data = d.data || d;
            const result = (withShape ? this.generateClass(CLASS[isPlural ? "shapes" : "shape"], data[key]) : "") + this.generateClass(CLASS[type], data[useIdKey ? "id" : key]);
            return result.trim();
        };
    },
    /**
     * Get chart class string
     * @param {string} type Shape type
     * @returns {string} Class string
     * @private
     */
    getChartClass(type) {
        return (d) => CLASS[`chart${type}`] + this.classTarget((d.data ? d.data : d).id);
    },
    generateExtraLineClass() {
        const $$ = this;
        const classes = $$.config.line_classes || [];
        const ids = [];
        return function (d) {
            const id = d.id || d.data?.id || d;
            if (ids.indexOf(id) < 0) {
                ids.push(id);
            }
            return classes[ids.indexOf(id) % classes.length];
        };
    },
    classRegion(d, i) {
        return `${this.generateClass(CLASS.region, i)} ${"class" in d ? d.class : ""}`;
    },
    classTarget(id) {
        const additionalClassSuffix = this.config.data_classes[id];
        let additionalClass = "";
        if (additionalClassSuffix) {
            additionalClass = ` ${CLASS.target}-${additionalClassSuffix}`;
        }
        return this.generateClass(CLASS.target, id) + additionalClass;
    },
    classFocus(d) {
        return this.classFocused(d) + this.classDefocused(d);
    },
    classFocused(d) {
        return ` ${this.state.focusedTargetIds.has(d.id) ? CLASS.focused : ""}`;
    },
    classDefocused(d) {
        return ` ${this.state.defocusedTargetIds.has(d.id) ? CLASS.defocused : ""}`;
    },
    getTargetSelectorSuffix(targetId) {
        const targetStr = targetId || targetId === 0 ? `-${targetId}` : "";
        // replace control ascii(0 ~ 32) and extended ascii(127 ~ 160)
        return targetStr.replace(RE_SELECTOR_SUFFIX, "-");
    },
    selectorTarget(id, prefix = "", postfix = "") {
        const target = this.getTargetSelectorSuffix(id);
        // select target & circle
        return `${prefix}.${CLASS.target + target} ${postfix}, ${prefix}.${CLASS.circles + target} ${postfix}`;
    },
    selectorTargets(idsValue, prefix) {
        const ids = idsValue || [];
        return ids.length ? ids.map(id => this.selectorTarget(id, prefix)) : null;
    },
    selectorLegend(id) {
        return `.${CLASS.legendItem + this.getTargetSelectorSuffix(id)}`;
    },
    selectorLegends(ids) {
        return ids?.length ? ids.map(id => this.selectorLegend(id)) : null;
    }
};

export { classModule as default };
