/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {toArray} from "./util";

export default class Cache {
	private cache = {};

	/**
	 * Add cache
	 * @param {String} key
	 * @param {*} value
	 * @param {Boolean} isDataType
	 * @private
	 */
	add(key: string, value, isDataType = false) {
		this.cache[key] = isDataType ? this.cloneTarget(value) : value;
	}

	/**
	 * Remove cache
	 * @param {String|Array} key
	 * @private
	 */
	remove(key: string | string[]) {
		toArray(key).forEach(v => delete this.cache[v]);
	}

	/**
	 * Get cahce
	 * @param {String|Array} key
	 * @param {Boolean} isDataType
	 * @return {*}
	 * @private
	 */
	get(key, isDataType = false) {
		if (isDataType) {
			const targets: any[] = [];

			for (let i = 0, id; (id = key[i]); i++) {
				if (id in this.cache) {
					targets.push(this.cloneTarget(this.cache[id]));
				}
			}

			return targets;
		} else {
			return this.cache[key] || null;
		}
	}

	/**
	 * reset cached data
	 * @param {Boolean} all true: reset all data, false: reset only '$' prefixed key data
	 * @private
 	 */
	reset(all?: boolean) {
		const $$ = this;

		for (const x in $$.cache) {
			// reset the prefixed '$' key(which is internal use data) only.
			if (all || /^\$/.test(x)) {
				$$.cache[x] = null;
			}
		}
	}

	cloneTarget(target) {
		return {
			id: target.id,
			id_org: target.id_org,
			values: target.values.map(d => ({x: d.x, value: d.value, id: d.id}))
		};
	}
}
