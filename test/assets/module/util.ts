/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {window} from "./browser";
import * as orgUtil from "../../../src/module/util";

export const {
	addCssRules,
	asHalfPixel,
	brushEmpty,
	callFn,
	capitalize,
	camelize,
	ceil10,
	deepClone,
	diffDomain,
	endall,
	emulateEvent,
	extend,
	findIndex,
	getBrushSelection,
	getBoundingRect,
	getCssRules,
	getMinMax,
	getOption,
	getPathBox,
	getPointer,
	getRandom,
	getRange,
	getRectSegList,
	getScrollPosition,
	getTranslation,
	getTransformCTM,
	getUnique,
	hasStyle,
	hasValue,
	hasViewBox,
	isArray,
	isBoolean,
	isDefined,
	isEmpty,
	isFunction,
	isNumber,
	isObject,
	isObjectType,
	isString,
	isUndefined,
	isValue,
	mergeArray,
	mergeObj,
	notEmpty,
	parseDate,
	runUntil,
	sanitize,
	setTextValue,
	sortValue,
	toArray,
	tplProcess
} = orgUtil;

// specify fake values
const fakeUtil = {
	isTabVisible: () => true
};

// Expose to global
// To mock return value, set returned value setting value
// ex) To mock 'convertInputType' to return true:
// --> window.$$TEST$$.convertInputType = true;
window.$$TEST$$ = {};

function getMock(name, ...args) {
	return name in window.$$TEST$$ ?
		window.$$TEST$$[name] : fakeUtil[name]?.(...args) ?? orgUtil[name](...args);
}

export function convertInputType(...args) {
	return getMock("convertInputType", ...args);
}

export function isTabVisible() {
	return getMock("isTabVisible");
}
