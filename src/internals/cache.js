/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	hasCaches(key, isDataType = false) {
		if (isDataType) {
			for (let i = 0, len = key.length; i < len; i++) {
				if (!(key[i] in this.cache)) {
					return false;
				}
			}

			return true;
		} else {
			return key in this.cache;
		}
	},

	addCache(key, value, isDataType = false) {
		this.cache[key] = isDataType ? this.cloneTarget(value) : value;
	},

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
