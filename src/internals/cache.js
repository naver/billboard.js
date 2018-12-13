/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {toArray, extend} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Add cache
	 * @param {String} key
	 * @param {*} value
	 * @param {Boolean} isDataType
	 * @private
	 */
	addCache(key, value, isDataType = false) {
		this.cache[key] = isDataType ? this.cloneTarget(value) : value;
	},

	/**
	 * Remove cache
	 * @param {String|Array} key
	 * @private
	 */
	removeCache(key) {
		toArray(key).forEach(v => delete this.cache[v]);
	},

	/**
	 * Get cahce
	 * @param {String|Array} key
	 * @param {Boolean} isDataType
	 * @return {*}
	 * @private
	 */
	getCache(key, isDataType = false) {
		if (isDataType) {
			const targets = [];

			for (let i = 0, id; (id = key[i]); i++) {
				if (id in this.cache) {
					targets.push(this.cloneTarget(this.cache[id]));
				}
			}

			return targets;
		} else {
			return this.cache[key] || null;
		}
	},

	/**
	 * reset cached data
	 * @param {Boolean} all true: reset all data, false: reset only '$' prefixed key data
	 * @private
 	 */
	resetCache(all) {
		const $$ = this;

		for (const x in $$.cache) {
			// reset the prefixed '$' key(which is internal use data) only.
			if (all || /^\$/.test(x)) {
				$$.cache[x] = null;
			}
		}
	}
});
