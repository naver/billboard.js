/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
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
		(isObjectType(o) && Object.keys(o).length === 0)
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
	const bbox = path.getBBox();
	const list = [];

	// seg0
	list.push({
		x: bbox.x,
		y: bbox.y + bbox.height
	});

	// seg1
	list.push({
		x: bbox.x,
		y: bbox.y
	});

	// seg2
	list.push({
		x: bbox.x + bbox.width,
		y: bbox.y
	});

	// seg3
	list.push({
		x: bbox.x + bbox.width,
		y: bbox.y + bbox.height
	});

	return list;
};

const getPathBox = path => {
	const box = path.getBoundingClientRect();
	const items = getRectSegList(path);
	const minX = items[0].x;
	const minY = Math.min(items[0].y, items[1].y);

	return {
		x: minX,
		y: minY,
		width: box.width,
		height: box.height,
	};
};

// return brush selection array
const getBrushSelection = function() {
	let selection = null;
	const event = d3Event;

	// check from event
	if (event && event.constructor.name === "BrushEvent") {
		selection = event.selection;
		// check from brush area selection
	} else if (this.context && (selection = this.context.select(`.${CLASS.brush}`).node())) {
		selection = d3BrushSelection(selection);
	}

	return selection;
};

const brushEmpty = function() {
	const selection = this.getBrushSelection();

	if (selection) {
		// brush selected area
		// two-dimensional: [[x0, y0], [x1, y1]]
		// one-dimensional: [x0, x1] or [y0, y1]
		return selection[0] === selection[1];
	}

	return true;
};

function extend(target = {}, source) {
	for (const p in source) {
		target[p] = source[p];
	}

	return target;
}

/**
 * Return first letter capitalized
 * @param {String} str
 * @return {String} capitalized string
 * @private
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Merge object returning new object
 * @param {Object} target
 * @param {Object} objectN
 * @returns {Object} merged target object
 * @private
 * @example
 *  var target = { a: 1 };
 *  utils.extend(target, { b: 2, c: 3 });
 *  target;  // { a: 1, b: 2, c: 3 };
 */
const merge = (target, ...objectN) => {
	if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
		return target;
	}

	const source = objectN.shift();

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach(key => {
			const value = source[key];

			if (isObject(value)) {
				!target[key] && (target[key] = {});

				target[key] = merge(target[key], value);
			} else {
				target[key] = isArray(value) ?
					value.concat() : value;
			}
		});
	}

	return extend(target, ...objectN);
};

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

export {
	asHalfPixel,
	brushEmpty,
	capitalize,
	ceil10,
	diffDomain,
	extend,
	getBrushSelection,
	getCssRules,
	getOption,
	getPathBox,
	getRectSegList,
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
	notEmpty,
	merge,
	sanitise,
	toArray
};
