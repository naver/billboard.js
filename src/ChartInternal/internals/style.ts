/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$SHAPE} from "../../config/classes";
import type {d3Selection} from "../../../types/types";
import type {IDataRow} from "../data/IData";
import {addCssRules, isFunction, isString} from "../../module/util";

export default {
	/**
	 * Add props color css rule to given selector
	 * @param {boolean} withShape Set shpes' prefix class
	 * @param {string} selector CSS selector
	 * @param {Array} props CSS props list
	 * @param {Function} propsFn Function to retrieve value or determine for props
	 * @returns {Function}
	 * @private
	 */
	setCssRule(withShape: boolean, selector: string, props: string[], propsFn: Function): Function {
		const $$ = this;
		const {config, state: {cssRule, style}} = $$;

		return config.boost_useCssRule ? (selection: d3Selection) => {
			selection.each((d: IDataRow) => {
				const res = propsFn && propsFn?.call($$, d);
				const shapeSelector = `${
					withShape ? `.${$SHAPE.shapes + $$.getTargetSelectorSuffix(d.id)}` : ""
				}${selector}`;

				(selector in cssRule) && style.sheet.deleteRule(cssRule[shapeSelector]);
				$$.state.cssRule[shapeSelector] = addCssRules(
					style,
					shapeSelector,
					props.filter(Boolean).map(v => (
						isString(res) && v.indexOf(":") === -1 ? `${v}: ${res}` : (v || "")
					))
				);
			});
		} : () => {};
	},

	/**
	 * Get style prop value
	 * @param {Function|string} v Value
	 * @returns {string|null}
	 * @private
	 */
	getStylePropValue(v: Function|string): string|null {
		const {config: {boost_useCssRule: useCssRule}} = this;

		return useCssRule ? null : isFunction(v) ? v.bind(this) : v;
	}
};
