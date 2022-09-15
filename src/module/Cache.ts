/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isValue, toArray} from "./util";
import type {DataRow} from "../../types/types";

/**
 * Constant for cache key
 * - NOTE: Prefixed with '$', will be resetted when .load() is called
 * @private
 */
export const KEY = {
	bubbleBaseLength: "$baseLength",
	colorPattern: "__colorPattern__",
	dataMinMax: "$dataMinMax",
	dataTotalSum: "$dataTotalSum",
	dataTotalPerIndex: "$totalPerIndex",
	legendItemTextBox: "legendItemTextBox",
	radarPoints: "$radarPoints",
	setOverOut: "setOverOut",
	callOverOutForTouch: "callOverOutForTouch",
	textRect: "textRect"
};

export default class Cache {
	private cache = {};

	/**
	 * Add cache
	 * @param {string} key Cache key
	 * @param {*} value Value to be stored
	 * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
	 * @returns {*} Added data value
	 * @private
	 */
	add(key: string, value, isDataType = false) {
		this.cache[key] = isDataType ? this.cloneTarget(value) : value;
		return this.cache[key];
	}

	/**
	 * Remove cache
	 * @param {string|Array} key Cache key
	 * @private
	 */
	remove(key: string | string[]) {
		toArray(key).forEach(v => delete this.cache[v]);
	}

	/**
	 * Get cahce
	 * @param {string|Array} key Cache key
	 * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
	 * @returns {*}
	 * @private
	 */
	get(key: string, isDataType = false): any | null {
		if (isDataType) {
			const targets: any[] = [];

			for (let i = 0, id; (id = key[i]); i++) {
				if (id in this.cache) {
					targets.push(this.cloneTarget(this.cache[id]));
				}
			}

			return targets;
		} else {
			const value = this.cache[key];

			return isValue(value) ? value : null;
		}
	}

	/**
	 * Reset cached data
	 * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
	 * @private
	 */
	reset(all?: boolean): void {
		const $$ = this;

		for (const x in $$.cache) {
			// reset the prefixed '$' key(which is internal use data) only.
			if (all || /^\$/.test(x)) {
				$$.cache[x] = null;
			}
		}
	}

	/**
	 * Clone data target object
	 * @param {object} target Data object
	 * @returns {object}
	 * @private
	 */
	// eslint-disable-next-line camelcase
	cloneTarget(target: DataRow): DataRow {
		return {
			id: target.id,
			id_org: target.id_org,
			values: target.values.map(d => ({x: d.x, value: d.value, id: d.id}))
		};
	}
}
