/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {DataRow} from "../../types/types";
import {isString, isValue} from "./util";

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
	domainMinMax: "$domainMinMax",
	filteredTargets: "$filteredTargets",
	filteredNullish: "$filteredNullish",
	svgLeft: "$svgLeft",
	visibilityChecksum: "visibilityChecksum",
	legendItemTextBox: "legendItemTextBox",
	legendItemMap: "$legendItemMap",
	radarPoints: "$radarPoints",
	radarTextWidth: "$radarTextWidth",
	setOverOut: "setOverOut",
	callOverOutForTouch: "callOverOutForTouch",
	textRect: "textRect",
	shapeOffset: "$shapeOffset",
	maxTickSize: "$maxTickSize"
};

export default class Cache {
	private cache = new Map<string, any>();

	/**
	 * Add cache
	 * @param {string} key Cache key
	 * @param {string|number|boolean|object|Array|function|null|undefined} value Value to be stored
	 * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
	 * @returns {string|number|boolean|object|Array|function|null|undefined} Added data value
	 * @private
	 */
	add(key: string, value, isDataType = false) {
		const v = isDataType ? this.cloneTarget(value) : value;

		this.cache.set(key, v);
		return v;
	}

	/**
	 * Remove cache
	 * @param {string|Array} key Cache key
	 * @private
	 */
	remove(key: string | string[]) {
		const keys = isString(key) ? [key] : key;

		for (let i = 0; i < keys.length; i++) {
			this.cache.delete(keys[i]);
		}
	}

	/**
	 * Get cahce
	 * @param {string|Array} key Cache key
	 * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
	 * @returns {string|number|boolean|object|Array|function|null} Cached value
	 * @private
	 */
	get(key: string | string[], isDataType = false): any | null {
		// when is isDataType, key should be string array
		if (isDataType && Array.isArray(key)) {
			const targets: any[] = [];

			for (let i = 0, id; (id = key[i]); i++) {
				if (this.cache.has(id)) {
					targets.push(this.cache.get(id));
				}
			}

			return targets;
		} else {
			const value = this.cache.get(key as string);

			return isValue(value) ? value : null;
		}
	}

	/**
	 * Check if cache key exists
	 * @param {string} key Cache key
	 * @returns {boolean} True if key exists in cache
	 * @private
	 */
	has(key: string): boolean {
		return this.cache.has(key);
	}

	/**
	 * Get all cache keys
	 * @returns {string[]} Array of cache keys
	 * @private
	 */
	getKeys(): string[] {
		return Array.from(this.cache.keys());
	}

	/**
	 * Reset cached data
	 * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
	 * @private
	 */
	reset(all?: boolean): void {
		if (all) {
			this.cache.clear();
		} else {
			this.cache.forEach((_, x) => {
				if (/^\$/.test(x)) {
					this.cache.delete(x);
				}
			});
		}
	}

	/**
	 * Clone data target object
	 * @param {object} target Data object
	 * @returns {object}
	 * @private
	 */
	cloneTarget(target: DataRow): DataRow {
		return {
			id: target.id,
			id_org: target.id_org,
			values: target.values.map(d => ({x: d.x, value: d.value, id: d.id}))
		};
	}
}
