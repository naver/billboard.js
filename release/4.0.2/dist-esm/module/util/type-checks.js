/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
const isValue = (v) => v || v === 0;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const ceil10 = (v) => Math.ceil(v / 10) * 10;
const asHalfPixel = (n) => Math.ceil(n) + 0.5;
const diffDomain = (d) => d[1] - d[0];
const isObjectType = (v) => typeof v === "object";
const isEmptyObject = (obj) => {
    for (const x in obj) {
        return false;
    }
    return true;
};
const isEmpty = (o) => (isUndefined(o) || o === null ||
    (isString(o) && o.length === 0) ||
    (isObjectType(o) && !(o instanceof Date) && isEmptyObject(o)) ||
    (isNumber(o) && isNaN(o)));
const notEmpty = (o) => !isEmpty(o);
/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
const isArray = (arr) => Array.isArray(arr);
/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
const isObject = (obj) => obj && !obj?.nodeType && isObjectType(obj) && !isArray(obj);

export { asHalfPixel, ceil10, diffDomain, isArray, isBoolean, isDefined, isEmpty, isEmptyObject, isFunction, isNumber, isObject, isObjectType, isString, isUndefined, isValue, notEmpty };
