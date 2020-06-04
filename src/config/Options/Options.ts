/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common
import main from "./common/main";
import data from "./data/data";
import dataSelection from "./data/selection";
import color from "./common/color";
import interaction from "./common/interaction";
import legend from "./common/legend";
import title from "./common/title";
import tooltip from "./common/tooltip";

import {isObject} from "../../module/util";

/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */
function deepCopy(...objectN) {
	const clone = v => {
		if (isObject(v) && v.constructor) {
			const r = new v.constructor();

			for (const k in v) {
				r[k] = clone(v[k]);
			}

			return r;
		}

		return v;
	};

	return objectN.map(v => clone(v))
		.reduce((a, c) => (
			{...a, ...c}
		));
}

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
export default class Options {
	static data = {};

	static setOptions(...options) {
		this.data = options
			.reduce((a, c) => ({...a, ...c}), this.data);
	}

	constructor() {
		return deepCopy(
			main,
			data,
			dataSelection,
			color,
			interaction,
			legend,
			title,
			tooltip,
			Options.data
		);
	}
}
