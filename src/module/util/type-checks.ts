/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */

const isValue = (v: any): boolean => v || v === 0;
const isFunction = (v: unknown): v is (...args: any[]) => any => typeof v === "function";
const isString = (v: unknown): v is string => typeof v === "string";
const isNumber = (v: unknown): v is number => typeof v === "number";
const isUndefined = (v: unknown): v is undefined => typeof v === "undefined";
const isDefined = (v: unknown): boolean => typeof v !== "undefined";
const isBoolean = (v: unknown): boolean => typeof v === "boolean";
const ceil10 = (v: number): number => Math.ceil(v / 10) * 10;
const asHalfPixel = (n: number): number => Math.ceil(n) + 0.5;
const diffDomain = (d: number[]): number => d[1] - d[0];
const isObjectType = (v: unknown): v is Record<string | number, any> => typeof v === "object";

const isEmptyObject = (obj: object): boolean => {
	for (const x in obj) {
		return false;
	}
	return true;
};

const isEmpty = (o: unknown): boolean => (
	isUndefined(o) || o === null ||
	(isString(o) && o.length === 0) ||
	(isObjectType(o) && !(o instanceof Date) && isEmptyObject(o)) ||
	(isNumber(o) && isNaN(o))
);

const notEmpty = (o: unknown): boolean => !isEmpty(o);

/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
const isArray = (arr: any): arr is any[] => Array.isArray(arr);

/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
const isObject = (obj: any): boolean => obj && !obj?.nodeType && isObjectType(obj) && !isArray(obj);

export {
	asHalfPixel,
	ceil10,
	diffDomain,
	isArray,
	isBoolean,
	isDefined,
	isEmpty,
	isEmptyObject,
	isFunction,
	isNumber,
	isObject,
	isObjectType,
	isString,
	isUndefined,
	isValue,
	notEmpty
};
