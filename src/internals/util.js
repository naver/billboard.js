/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {event as d3Event} from "d3-selection";
import {brushSelection as d3BrushSelection} from "d3-brush";
import CLASS from "../config/classes";

const isValue = v => v || v === 0;
const isFunction = v => typeof v === "function";
const isString = v => typeof v === "string";
const isNumber = v => typeof v === "number";
const isUndefined = v => typeof v === "undefined";
const isDefined = v => typeof v !== "undefined";
const isBoolean = v => typeof v === "boolean";
const ceil10 = v => Math.ceil(v / 10) * 10;
const asHalfPixel = n => Math.ceil(n) + 0.5;
const diffDomain = d => d[1] - d[0];
const isObjectType = v => typeof v === "object";
const isEmpty = o => (
	isUndefined(o) || o === null ||
	(isString(o) && o.length === 0) ||
	(isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0) ||
	(isNumber(o) && isNaN(o))
);
const notEmpty = o => !isEmpty(o);

/**
 * Check if is array
 * @param {Array} arr
 * @returns {Boolean}
 * @private
 */
const isArray = arr => arr && arr.constructor === Array;

/**
 * Check if is object
 * @param {Object} obj
 * @returns {Boolean}
 * @private
 */
const isObject = obj => obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);

const getOption = (options, key, defaultValue) => (
	isDefined(options[key]) ? options[key] : defaultValue
);

const hasValue = (dict, value) => {
	let found = false;

	Object.keys(dict).forEach(key => (dict[key] === value) && (found = true));

	return found;
};

/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @return {Boolean} true: fn is function, false: fn is not function
 * @private
 */
const callFn = (fn, ...args) => {
	const isFn = isFunction(fn);

	isFn && fn.call(...args);
	return isFn;
};

/**
 * Replace tag sign to html entity
 * @param {String} str
 * @return {String}
 * @private
 */
const sanitise = str => (isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str);

// substitution of SVGPathSeg API polyfill
const getRectSegList = path => {
	/*
	 * seg1 ---------- seg2
	 *   |               |
	 *   |               |
	 *   |               |
	 * seg0 ---------- seg3
	 * */
	const {x, y, width, height} = path.getBBox();

	return [
		{x, y: y + height}, // seg0
		{x, y}, // seg1
		{x: x + width, y}, // seg2
		{x: x + width, y: y + height} // seg3
	];
};

const getPathBox = path => {
	const {width, height} = path.getBoundingClientRect();
	const items = getRectSegList(path);
	const x = items[0].x;
	const y = Math.min(items[0].y, items[1].y);

	return {
		x, y, width, height
	};
};

// return brush selection array
const getBrushSelection = ctx => {
	let selection = null;
	const event = d3Event;
	const main = ctx.context || ctx.main;

	// check from event
	if (event && event.constructor.name === "BrushEvent") {
		selection = event.selection;
	// check from brush area selection
	} else if (main && (selection = main.select(`.${CLASS.brush}`).node())) {
		selection = d3BrushSelection(selection);
	}

	return selection;
};

// retrun random number
const getRandom = (asStr = true) => Math.random() + (asStr ? "" : 0);

const brushEmpty = ctx => {
	const selection = getBrushSelection(ctx);

	if (selection) {
		// brush selected area
		// two-dimensional: [[x0, y0], [x1, y1]]
		// one-dimensional: [x0, x1] or [y0, y1]
		return selection[0] === selection[1];
	}

	return true;
};

const extend = (target = {}, source) => {
	for (const p in source) {
		target[p] = source[p];
	}

	return target;
};

/**
 * Return first letter capitalized
 * @param {String} str
 * @return {String} capitalized string
 * @private
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Convert to array
 * @param {Object} v
 * @returns {Array}
 * @private
 */
const toArray = v => [].slice.call(v);

/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
const getCssRules = styleSheets => {
	let rules = [];

	styleSheets.forEach(sheet => {
		try {
			if (sheet.cssRules && sheet.cssRules.length) {
				rules = rules.concat(toArray(sheet.cssRules));
			}
		} catch (e) {
			console.error(`Error while reading rules from ${sheet.href}: ${e.toString()}`);
		}
	});

	return rules;
};

/**
 * Get unique value from array
 * @param {Array} data
 * @return {Array} Unique array value
 * @private
 */
const getUnique = data => data.filter((v, i, self) => self.indexOf(v) === i);

/**
 * Merge array
 * @param {Array} arr
 * @return {Array}
 * @private
 */
const mergeArray = arr => (arr && arr.length ? arr.reduce((p, c) => p.concat(c)) : []);

/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {Boolean} isAsc true: asc, false: desc
 * @return {Number|String|Date} sorted date
 * @private
 */
const sortValue = (data, isAsc = true) => {
	let fn;

	if (data[0] instanceof Date) {
		fn = isAsc ? (a, b) => a - b : (a, b) => b - a;
	} else if (!isAsc) {
		fn = (a, b) => (a > b && -1) || (a < b && 1) || (a === b && 0);
	}

	return data.concat().sort(fn);
};

/**
 * Get min/max value
 * @param {String} type 'min' or 'max'
 * @param {Array} data Array data value
 * @retun {Number|Date|undefined}
 * @private
 */
const getMinMax = (type, data) => {
	let res = data.filter(v => notEmpty(v));

	if (res.length) {
		if (isNumber(res[0])) {
			res = Math[type](...res);
		} else if (res[0] instanceof Date) {
			res = sortValue(res, type === "min")[0];
		}
	} else {
		res = undefined;
	}

	return res;
};

/**
 * Get range
 * @param {Number} start Start number
 * @param {Number} end End number
 * @return {Array}
 * @private
 */
const getRange = (start, end) => {
	const res = [];

	for (let i = start; i < end; i++) {
		res.push(i);
	}

	return res;
};

// emulate event
const emulateEvent = {
	mouse: (() => {
		const getParams = () => ({
			bubbles: false, cancelable: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0
		});

		try {
			// eslint-disable-next-line no-new
			new MouseEvent("t");

			return (el, eventType, params = getParams()) => {
				el.dispatchEvent(new MouseEvent(eventType, params));
			};
		} catch (e) {
			// Polyfills DOM4 MouseEvent
			return (el, eventType, params = getParams()) => {
				const mouseEvent = document.createEvent("MouseEvent");

				// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
				mouseEvent.initMouseEvent(
					eventType,
					params.bubbles,
					params.cancelable,
					window,
					0, // the event's mouse click count
					params.screenX, params.screenY,
					params.clientX, params.clientY,
					false, false, false, false, 0, null
				);

				el.dispatchEvent(mouseEvent);
			};
		}
	})(),
	touch: (el, eventType, params) => {
		const touchObj = new Touch(Object.assign({
			identifier: Date.now(),
			target: el,
			radiusX: 2.5,
			radiusY: 2.5,
			rotationAngle: 10,
			force: 0.5
		}, params));

		el.dispatchEvent(new TouchEvent(eventType, {
			cancelable: true,
			bubbles: true,
			shiftKey: true,
			touches: [touchObj],
			targetTouches: [],
			changedTouches: [touchObj]
		}));
	}
};

export {
	asHalfPixel,
	brushEmpty,
	callFn,
	capitalize,
	ceil10,
	diffDomain,
	emulateEvent,
	extend,
	getBrushSelection,
	getCssRules,
	getMinMax,
	getOption,
	getPathBox,
	getRandom,
	getRange,
	getRectSegList,
	getUnique,
	hasValue,
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
	notEmpty,
	sanitise,
	sortValue,
	toArray
};
