/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { $SHAPE } from '../../config/classes.js';
import { isFunction, isString } from '../../module/util/type-checks.js';
import { addCssRules } from '../../module/util/dom.js';

var style = {
    /**
     * Add props color css rule to given selector
     * @param {boolean} withShape Set shpes' prefix class
     * @param {string} selector CSS selector
     * @param {Array} props CSS props list
     * @param {function} propsFn Function to retrieve value or determine for props
     * @returns {function}
     * @private
     */
    setCssRule(withShape, selector, props, propsFn) {
        const $$ = this;
        const { config, state: { cssRule, style } } = $$;
        return config.boost_useCssRule ?
            (selection) => {
                selection.each((d) => {
                    const res = propsFn && propsFn?.call($$, d);
                    const shapeSelector = `${withShape ? `.${$SHAPE.shapes + $$.getTargetSelectorSuffix(d.id)}` : ""}${selector}`;
                    (selector in cssRule) && style.sheet.deleteRule(cssRule[shapeSelector]);
                    $$.state.cssRule[shapeSelector] = addCssRules(style, shapeSelector, props.filter(Boolean).map(v => (isString(res) && v.indexOf(":") === -1 ? `${v}: ${res}` : (v || ""))));
                });
            } :
            () => { };
    },
    /**
     * Get style prop value
     * @param {function|string} v Value
     * @returns {string|null}
     * @private
     */
    getStylePropValue(v) {
        const { config: { boost_useCssRule: useCssRule } } = this;
        return useCssRule ? null : isFunction(v) ? v.bind(this) : v;
    }
};

export { style as default };
