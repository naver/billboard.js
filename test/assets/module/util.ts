/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {window} from "../../../src/module/browser";

// fake module replaced during test build to '/src/module/util.ts' by webpack.NormalModuleReplacementPlugin
import * as orgUtil from "./fake";

export const {
	asHalfPixel,
	brushEmpty,
	callFn,
	capitalize,
	ceil10,
	diffDomain,
	endall,
	emulateEvent,
	extend,
	getBrushSelection,
	getBoundingRect,
	getCssRules,
	getMinMax,
	getOption,
	getPathBox,
	getRandom,
	getRange,
	getRectSegList,
	getTranslation,
	getUnique,
	hasValue,
	isArray,
	isboolean,
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
	sanitise,
	setTextValue,
	sortValue,
	toArray,
	tplProcess
} = orgUtil;

// Expose to global
// To mock return value, set returned value setting value
// ex) To mock 'convertInputType' to return true:
// --> window.$$TEST$$.convertInputType = true;
window.$$TEST$$ = {};

function getMock(name, ...args) {
	return name in window.$$TEST$$ ?
		window.$$TEST$$[name] : orgUtil[name](...args);
}

export function convertInputType(...args) {
	return getMock("convertInputType", ...args);
}

export function isTabVisible() {
	return getMock("isTabVisible");
}
