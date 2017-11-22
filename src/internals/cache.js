/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	hasCaches(ids) {
		for (let i = 0, len = ids.length; i < len; i++) {
			if (!(ids[i] in this.cache)) {
				return false;
			}
		}

		return true;
	},

	addCache(id, target) {
		this.cache[id] = this.cloneTarget(target);
	},

	getCaches(ids) {
		const targets = [];

		for (let i = 0, key; (key = ids[i]); i++) {
			if (key in this.cache) {
				targets.push(this.cloneTarget(this.cache[key]));
			}
		}

		return targets;
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
