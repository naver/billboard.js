/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {requestAnimationFrame, window} from "../browser";
import {sanitize} from "../sanitize";
import {
	isArray,
	isDefined,
	isFunction,
	isNumber,
	isObject,
	isString,
	notEmpty
} from "./type-checks";

/**
 * Internal helper to iterate over array items and invoke a callback for each valid item
 * @param {Array} items Array to iterate
 * @param {function} callback Callback function (item, index) => void
 * @private
 */
function _forEachValidItem<T>(items: T[], callback: (item: T, index: number) => void): void {
	for (let i = 0; i < items.length; i++) {
		const item = items[i];

		if (item) {
			callback(item, i);
		}
	}
}

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {string|number|boolean|object|Array|function|null|undefined} defaultValue Default value
 * @returns {string|number|boolean|object|Array|function|null|undefined} Option value or default value
 * @private
 */
function getOption(options: object, key: string, defaultValue): any {
	return isDefined(options[key]) ? options[key] : defaultValue;
}

/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {string|number|boolean|object|Array|function|null|undefined} value Value to be checked
 * @returns {boolean}
 * @private
 */
function hasValue(dict: object, value: any): boolean {
	for (const key in dict) {
		if (dict[key] === value) return true;
	}

	return false;
}

/**
 * Call function with arguments
 * @param {function} fn Function to be called
 * @param {object|null|undefined} thisArg "this" value for fn
 * @param {...(string|number|boolean|object|Array|function|null|undefined)} args Arguments for fn
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */
function callFn(fn: unknown, thisArg: any, ...args: any[]): boolean {
	const isFn = isFunction(fn);

	isFn && fn.call(thisArg, ...args);
	return isFn;
}

/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */
function endall(transition, cb: Function): void {
	let n = 0;

	const end = function(...args) {
		!--n && cb.apply(this, ...args);
	};

	// if is transition selection
	if ("duration" in transition) {
		transition
			.each(() => ++n)
			.on("end", end);
	} else {
		++n;
		transition.call(end);
	}
}

/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Camelize from kebob style string
 * @param {string} str Target string
 * @param {string} separator Separator string
 * @returns {string} camelized string
 * @private
 */
function camelize(str: string, separator = "-"): string {
	return str.split(separator)
		.map((v, i) => (
			i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()
		))
		.join("");
}

/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */
const toArray = (v: CSSStyleDeclaration | any): any => [].slice.call(v);

/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */
function deepClone(...objectN) {
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
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */
function extend(target = {}, source): object {
	if (isArray(source)) {
		source.forEach(v => extend(target, v));
	}

	// exclude name with only numbers
	for (const p in source) {
		if (/^\d+$/.test(p) || p in target) {
			continue;
		}

		target[p] = source[p];
	}

	return target;
}

/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */
function getUnique(data: any[]): any[] {
	const isDate = data[0] instanceof Date;
	const d = Array.from(new Set(isDate ? data.map(Number) : data));

	return isDate ? d.map(v => new Date(v)) : d;
}

/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */
function mergeArray(arr: any[]): any[] {
	return arr && arr.length ? arr.reduce((p, c) => p.concat(c)) : [];
}

/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */
function mergeObj(target: object, ...objectN): any {
	if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
		return target;
	}

	const source = objectN.shift();

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach(key => {
			if (!/^(__proto__|constructor|prototype)$/i.test(key)) {
				const value = source[key];

				if (isObject(value)) {
					!target[key] && (target[key] = {});
					target[key] = mergeObj(target[key], value);
				} else {
					target[key] = isArray(value) ? value.concat() : value;
				}
			}
		});
	}

	return mergeObj(target, ...objectN);
}

/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */
function sortValue(data: any[], isAsc = true): any[] {
	let fn;

	if (data[0] instanceof Date) {
		fn = isAsc ? (a, b) => a - b : (a, b) => b - a;
	} else {
		if (isAsc && !data.every(isNaN)) {
			fn = (a, b) => a - b;
		} else if (!isAsc) {
			fn = (a, b) => (a > b && -1) || (a < b && 1) || (a === b && 0);
		}
	}

	return data.concat().sort(fn);
}

/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */
function getMinMax(type: "min" | "max", data: number[] | Date[] | any): number | Date | undefined
	| any {
	let res = data.filter(v => notEmpty(v));

	if (res.length) {
		if (isNumber(res[0])) {
			let result = type === "min" ? Infinity : -Infinity;

			for (const v of res) {
				if (type === "min" ? v < result : v > result) {
					result = v;
				}
			}

			res = result;
		} else if (res[0] instanceof Date) {
			res = sortValue(res, type === "min")[0];
		}
	} else {
		res = undefined;
	}

	return res;
}

/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */
const getRange = (start: number, end: number, step = 1): number[] => {
	const res: number[] = [];
	const n = Math.max(0, Math.ceil((end - start) / step)) | 0;

	for (let i = start; i < n; i++) {
		res.push(start + i * step);
	}

	return res;
};

/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number|string}
 * @private
 */
function getRandom(asStr = true, min = 0, max = 10000) {
	const crpt = window.crypto || window.msCrypto;
	const rand = crpt ?
		min + crpt.getRandomValues(new Uint32Array(1))[0] % (max - min + 1) :
		Math.floor(Math.random() * (max - min) + min);

	return asStr ? String(rand) : rand;
}

/**
 * Find index based on binary search
 * @param {Array} arr Data array
 * @param {number} v Target number to find
 * @param {number} start Start index of data array
 * @param {number} end End index of data arr
 * @param {boolean} isRotated Weather is roted axis
 * @returns {number} Index number
 * @private
 */
function findIndex(arr, v: number, start: number, end: number, isRotated: boolean): number {
	if (start > end) {
		return -1;
	}

	const mid = Math.floor((start + end) / 2);
	let {x, w = 0} = arr[mid];

	if (isRotated) {
		x = arr[mid].y;
		w = arr[mid].h;
	}

	if (v >= x && v <= x + w) {
		return mid;
	}

	return v < x ?
		findIndex(arr, v, start, mid - 1, isRotated) :
		findIndex(arr, v, mid + 1, end, isRotated);
}

/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl: string, data: object): string {
	return sanitize(tpl.replace(/\{=([^}]+)\}/g, (_, key) => data[key] ?? ""));
}

/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */
function parseDate(date: Date | string | number | any): Date {
	let parsedDate;

	if (date instanceof Date) {
		parsedDate = date;
	} else if (isString(date)) {
		const {config, format} = this;

		// if fails to parse, try by new Date()
		// https://github.com/naver/billboard.js/issues/1714
		parsedDate = format.dataTime(config.data_xFormat)(date) ?? new Date(date);
	} else if (isNumber(date) && !isNaN(date)) {
		parsedDate = new Date(+date);
	}

	if (!parsedDate || isNaN(+parsedDate)) {
		console && console.error &&
			console.error(`Failed to parse x '${date}' to Date object`);
	}

	return parsedDate;
}

/**
 * Parse CSS shorthand values (padding, margin, border-radius, etc.)
 * @param {number|string|object} value Shorthand value(s)
 * @returns {object} Parsed object with top, right, bottom, left properties
 * @private
 */
function parseShorthand(
	value: number | string | object
): {top: number, right: number, bottom: number, left: number} {
	if (isObject(value) && !isString(value)) {
		const obj = value as {top?: number, right?: number, bottom?: number, left?: number};
		return {
			top: obj.top || 0,
			right: obj.right || 0,
			bottom: obj.bottom || 0,
			left: obj.left || 0
		};
	}

	const values = (isString(value) ? value.trim().split(/\s+/) : [value]).map(v => +v || 0);
	const [a, b = a, c = a, d = b] = values;

	return {top: a, right: b, bottom: c, left: d};
}

/**
 * Run function until given condition function return true
 * @param {function} fn Function to be executed when condition is true
 * @param {function(): boolean} conditionFn Condition function to check if condition is true
 * @private
 */
function runUntil(fn: Function, conditionFn: Function): void {
	if (conditionFn() === false) {
		requestAnimationFrame(() => runUntil(fn, conditionFn));
	} else {
		fn();
	}
}

/**
 * Convert an array to a Set by applying a key extractor
 * @param {Array} items Array of items to convert to Set
 * @param {function} keyFn Function to extract key from each item (item, index) => key. Defaults to identity function
 * @returns {Set} Set with extracted keys
 * @private
 */
function toSet<T, K = T>(
	items: T[],
	keyFn: (item: T, index: number) => K = (item => item as unknown as K)
): Set<K> {
	const set = new Set<K>();

	_forEachValidItem(items, (item, i) => {
		set.add(keyFn(item, i));
	});

	return set;
}

/**
 * Convert an array to a Map by applying key and value extractors
 * @param {Array} items Array of items to convert to Map
 * @param {function} keyFn Function to extract key from each item (item, index) => key
 * @param {function} valueFn Function to extract value from each item (item, index) => value. Defaults to identity function
 * @returns {Map} Map with extracted keys and values
 * @private
 */
function toMap<T, K, V = T>(
	items: T[],
	keyFn: (item: T, index: number) => K,
	valueFn: (item: T, index: number) => V = (item => item as unknown as V)
): Map<K, V> {
	const map = new Map<K, V>();

	_forEachValidItem(items, (item, i) => {
		map.set(keyFn(item, i), valueFn(item, i));
	});

	return map;
}

export {
	callFn,
	camelize,
	capitalize,
	deepClone,
	endall,
	extend,
	findIndex,
	getMinMax,
	getOption,
	getRandom,
	getRange,
	getUnique,
	hasValue,
	mergeArray,
	mergeObj,
	parseDate,
	parseShorthand,
	runUntil,
	sortValue,
	toArray,
	toMap,
	toSet,
	tplProcess
};
