/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {pointer as d3Pointer} from "d3-selection";
import {brushSelection as d3BrushSelection} from "d3-brush";
import type {d3Selection} from "../../types/types";
import {document, window, requestAnimationFrame} from "./browser";

export {
	addCssRules,
	asHalfPixel,
	brushEmpty,
	callFn,
	capitalize,
	camelize,
	ceil10,
	convertInputType,
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
	isTabVisible,
	isUndefined,
	isValue,
	mergeArray,
	mergeObj,
	notEmpty,
	parseDate,
	runUntil,
	sanitise,
	setTextValue,
	sortValue,
	toArray,
	tplProcess
};

const isValue = (v: any): boolean => v || v === 0;
const isFunction = (v: unknown): v is ((...args: any[]) => any) => typeof v === "function";
const isString = (v: unknown): v is string => typeof v === "string";
const isNumber = (v: unknown): v is number => typeof v === "number";
const isUndefined = (v: unknown): v is undefined => typeof v === "undefined";
const isDefined = (v: unknown): boolean => typeof v !== "undefined";
const isboolean = (v: unknown): boolean => typeof v === "boolean";
const ceil10 = (v: number): number => Math.ceil(v / 10) * 10;
const asHalfPixel = (n: number): number => Math.ceil(n) + 0.5;
const diffDomain = (d: number[]): number => d[1] - d[0];
const isObjectType = (v: unknown): v is Record<string | number, any> => typeof v === "object";
const isEmpty = (o: unknown): boolean => (
	isUndefined(o) || o === null ||
	(isString(o) && o.length === 0) ||
	(isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0) ||
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

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options: object, key: string, defaultValue): any {
	return isDefined(options[key]) ? options[key] : defaultValue;
}

/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */
function hasValue(dict: object, value: any): boolean {
	let found = false;

	Object.keys(dict).forEach(key => (dict[key] === value) && (found = true));

	return found;
}

/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} thisArg "this" value for fn
 * @param {*} args Arguments for fn
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
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */
function sanitise(str: string): string {
	return isString(str) ?
		str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}

/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */
function setTextValue(
	node: d3Selection,
	text: string,
	dy: number[] = [-1, 1],
	toMiddle: boolean = false
) {
	if (!node || !isString(text)) {
		return;
	}

	if (text.indexOf("\n") === -1) {
		node.text(text);
	} else {
		const diff = [node.text(), text].map(v => v.replace(/[\s\n]/g, ""));

		if (diff[0] !== diff[1]) {
			const multiline = text.split("\n");
			const len = toMiddle ? multiline.length - 1 : 1;

			// reset possible text
			node.html("");

			multiline.forEach((v, i) => {
				node.append("tspan")
					.attr("x", 0)
					.attr("dy", `${i === 0 ? dy[0] * len : dy[1]}em`)
					.text(v);
			});
		}
	}
}

/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */
function getRectSegList(path: SVGGraphicsElement): {x: number, y: number}[] {
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
}

/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */
function getPathBox(
	path: SVGGraphicsElement
): {x: number, y: number, width: number, height: number} {
	const {width, height} = path.getBoundingClientRect();
	const items = getRectSegList(path);
	const x = items[0].x;
	const y = Math.min(items[0].y, items[1].y);

	return {
		x, y, width, height
	};
}


/**
 * Get event's current position coordinates
 * @param {object} event Event object
 * @param {SVGElement|HTMLElement} element Target element
 * @returns {Array} [x, y] Coordinates x, y array
 * @private
 */
function getPointer(event, element?: Element): number[] {
	const touches = event && (event.touches || (event.sourceEvent && event.sourceEvent.touches))?.[0];
	const pointer = d3Pointer(touches || event, element);

	return pointer.map(v => (isNaN(v) ? 0 : v));
}

/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */
function getBrushSelection(ctx) {
	const {event, $el} = ctx;
	const main = $el.subchart.main || $el.main;
	let selection;

	// check from event
	if (event && event.type === "brush") {
		selection = event.selection;
	// check from brush area selection
	} else if (main && (selection = main.select(".bb-brush").node())) {
		selection = d3BrushSelection(selection);
	}

	return selection;
}

/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */
function getBoundingRect(node): {
	left: number, top: number, right: number, bottom: number,
	x: number, y: number, width: number, height: number
} {
	const needEvaluate = !("rect" in node) || (
		"rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width")
	);

	return needEvaluate ?
		(node.rect = node.getBoundingClientRect()) : node.rect;
}

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
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */
function brushEmpty(ctx): boolean {
	const selection = getBrushSelection(ctx);

	if (selection) {
		// brush selected area
		// two-dimensional: [[x0, y0], [x1, y1]]
		// one-dimensional: [x0, x1] or [y0, y1]
		return selection[0] === selection[1];
	}

	return true;
}

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
 * Add CSS rules
 * @param {object} style Style object
 * @param {string} selector Selector string
 * @param {Array} prop Prps arrary
 * @returns {number} Newely added rule index
 * @private
 */
function addCssRules(style, selector: string, prop: string[]): number {
	const {rootSelctor, sheet} = style;
	const getSelector = s => s
		.replace(/\s?(bb-)/g, ".$1")
		.replace(/\.+/g, ".");

	const rule = `${rootSelctor} ${getSelector(selector)} {${prop.join(";")}}`;

	return sheet[sheet.insertRule ? "insertRule" : "addRule"](
		rule,
		sheet.cssRules.length
	);
}

/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets: any[]) {
	let rules = [];

	styleSheets.forEach(sheet => {
		try {
			if (sheet.cssRules && sheet.cssRules.length) {
				rules = rules.concat(toArray(sheet.cssRules));
			}
		} catch (e) {
			window.console?.warn(`Error while reading rules from ${sheet.href}: ${e.toString()}`);
		}
	});

	return rules;
}

/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */
function getTranslation(node) {
	const transform = node ? node.transform : null;
	const baseVal = transform && transform.baseVal;

	return baseVal && baseVal.numberOfItems ?
		baseVal.getItem(0).matrix :
		{a: 0, b: 0, c: 0, d: 0, e: 0, f: 0};
}

/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */
function getUnique(data: any[]): any[] {
	const isDate = data[0] instanceof Date;
	const d = (isDate ? data.map(Number) : data)
		.filter((v, i, self) => self.indexOf(v) === i);

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
			const value = source[key];

			if (isObject(value)) {
				!target[key] && (target[key] = {});
				target[key] = mergeObj(target[key], value);
			} else {
				target[key] = isArray(value) ?
					value.concat() : value;
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
function getMinMax(type: "min" | "max", data: number[] | Date[] | any): number | Date | undefined | any {
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

// emulate event
const emulateEvent = {
	mouse: (() => {
		const getParams = () => ({
			bubbles: false, cancelable: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0
		});

		try {
			// eslint-disable-next-line no-new
			new MouseEvent("t");

			return (el: SVGElement | HTMLElement, eventType: string, params = getParams()) => {
				el.dispatchEvent(new MouseEvent(eventType, params));
			};
		} catch (e) {
			// Polyfills DOM4 MouseEvent
			return (el: SVGElement | HTMLElement, eventType: string, params = getParams()) => {
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
	touch: (el: SVGElement | HTMLElement, eventType: string, params: any) => {
		const touchObj = new Touch(mergeObj({
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

/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl: string, data: object): string {
	let res = tpl;

	for (const x in data) {
		res = res.replace(new RegExp(`{=${x}}`, "g"), data[x]);
	}

	return res;
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
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */
function isTabVisible(): boolean {
	return document?.hidden === false || document?.visibilityState === "visible";
}

/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */
function convertInputType(mouse: boolean, touch: boolean): "mouse" | "touch" | null {
	const {DocumentTouch, matchMedia, navigator} = window;
	let hasTouch = false;

	if (touch) {
		// Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
		if (navigator && "maxTouchPoints" in navigator) {
			hasTouch = navigator.maxTouchPoints > 0;

		// Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
		// On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
		} else if ("ontouchmove" in window || (DocumentTouch && document instanceof DocumentTouch)) {
			hasTouch = true;
		} else {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection
			if (matchMedia?.("(pointer:coarse)").matches) {
				hasTouch = true;
			} else {
				// Only as a last resort, fall back to user agent sniffing
				const UA = navigator.userAgent;

				hasTouch = (
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
				);
			}
		}
	}

	// Check if agent has mouse using any-hover, touch devices (e.g iPad) with external mouse will return true as long as mouse is connected
	// https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/#aa-testing-the-capabilities-of-all-inputs
	// Demo: https://patrickhlauke.github.io/touch/pointer-hover-any-pointer-any-hover/
	const hasMouse = mouse && ["any-hover:hover", "any-pointer:fine"]
		.some(v => matchMedia?.(`(${v})`).matches);

	// fallback to 'mouse' if no input type is detected.
	return (hasMouse && "mouse") || (hasTouch && "touch") || "mouse";
}

/**
 * Run function until given condition function return true
 * @param {Function} fn Function to be executed when condition is true
 * @param {Function} conditionFn Condition function to check if condition is true
 * @private
 */
function runUntil(fn: Function, conditionFn: Function): void {
	if (conditionFn() === false) {
		requestAnimationFrame(() => runUntil(fn, conditionFn));
	} else {
		fn();
	}
}

