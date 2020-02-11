/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {getMinMax, isArray, isFunction, isNumber, isObject} from "../../module/util";

export default {
	/**
	 * Initializer
	 * @private
	 */
	initBubble() {
		const $$ = this;
		const {config} = $$;

		if ($$.hasType("bubble")) {
			config.point_show = true;
			config.point_type = "circle";
			config.point_sensitivity = 25;
		}
	},

	/**
	 * Get user agent's computed value for the total length of the path in user units
	 * https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength
	 * @return {Number}
	 * @private
	 */
	getBaseLength() {
		const $$ = this;
		const {axis} = $$.$el;
		const cacheKey = "$baseLength";
		let baseLength = $$.cache.get(cacheKey);

		if (!baseLength) {
			$$.cache.add(cacheKey, baseLength = getMinMax("min", [
				axis.x.select("path").node()
					.getTotalLength(),
				axis.y.select("path").node()
					.getTotalLength()
			]));
		}

		return baseLength;
	},

	/**
	 * Get the radius value for bubble circle
	 * @param {Object} d
	 * @return {Number}
	 * @private
 	 */
	getBubbleR(d) {
		const $$ = this;
		let maxR = $$.config.bubble_maxR;

		if (isFunction(maxR)) {
			maxR = maxR(d);
		} else if (!isNumber(maxR)) {
			maxR = ($$.getBaseLength() / ($$.getMaxDataCount() * 2)) + 12;
		}

		const max = getMinMax("max", $$.getMinMaxData().max.map(d => (
			$$.isBubbleZType(d) ?
				$$.getBubbleZData(d.value, "y") : (
					isObject(d.value) ? d.value.mid : d.value
				)
		)));
		const maxArea = maxR * maxR * Math.PI;
		const area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) * (maxArea / max);

		return Math.sqrt(area / Math.PI);
	},

	/**
	 * Get bubble dimension data
	 * @param {Object|Array} d data value
	 * @param {String} type - y or z
	 * @return {Number}
	 * @private
	 */
	getBubbleZData(d, type) {
		return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
	},

	/**
	 * Determine if bubble has dimension data
	 * @param {Object|array} d data value
	 * @return {Boolean}
	 * @private
	 */
	isBubbleZType(d) {
		const $$ = this;

		return $$.isBubbleType(d) && (
			(isObject(d.value) && ("z" in d.value || "y" in d.value)) ||
			(isArray(d.value) && d.value.length === 2)
		);
	}
};
