/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../internals/ChartInternal";
import {extend, getMinMax, isFunction, isNumber, isObject} from "../internals/util";

extend(ChartInternal.prototype, {
	/**
	 * Initializer
	 * @private
	 */
	initBubble() {
		const $$ = this;
		const config = $$.config;

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
		const cacheKey = "$baseLength";
		let baseLength = $$.getCache(cacheKey);

		if (!baseLength) {
			$$.addCache(cacheKey, baseLength = getMinMax("min", [
				$$.axes.x.select("path").node()
					.getTotalLength(),
				$$.axes.y.select("path").node()
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

		const max = getMinMax("max", $$.getMinMaxData().max.map(d => (isObject(d.value) ? d.value.mid : d.value)));
		const maxArea = maxR * maxR * Math.PI;
		const area = d.value * (maxArea / max);

		return Math.sqrt(area / Math.PI);
	}
});
