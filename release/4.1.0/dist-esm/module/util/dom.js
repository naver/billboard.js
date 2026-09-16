/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { document as doc, window as win } from "../browser.js";
import { isString } from "./type-checks.js";
import { mergeObj, toArray } from "./object.js";
import { pointer } from "d3-selection";
//#region src/module/util/dom.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
* @ignore
*/
const RE_CSS_BB = /\s?(bb-)/g;
const RE_CSS_DOTS = /\.+/g;
/**
* Convert a CSS selector string to dot-notation class selector
* @param {string} s Selector string
* @returns {string}
* @private
*/
function getCssSelector(s) {
	return s.replace(RE_CSS_BB, ".$1").replace(RE_CSS_DOTS, ".");
}
/**
* Get boundingClientRect or BBox with caching.
* Internal helper for getBoundingRect() and getBBox()
* @param {boolean} relativeViewport Relative to viewport - true: will use .getBoundingClientRect(), false: will use .getBBox()
* @param {SVGElement} node Target element
* @param {boolean} forceEval Force evaluation
* @returns {object}
* @private
*/
function _getRect(relativeViewport, node, forceEval = false) {
	const _ = (n) => n[relativeViewport ? "getBoundingClientRect" : "getBBox"]();
	const cacheKey = relativeViewport ? "rectClient" : "rectBBox";
	if (forceEval) return _(node);
	else return !(cacheKey in node) || node.hasAttribute("width") && node[cacheKey].width !== +(node.getAttribute("width") || 0) ? node[cacheKey] = _(node) : node[cacheKey];
}
/**
* Set text value. If there're multiline add nodes.
* @param {d3Selection} node Text node
* @param {string} text Text value string
* @param {Array} dy dy value for multilined text
* @param {boolean} toMiddle To be alingned vertically middle
* @private
*/
function setTextValue(node, text, dy = [-1, 1], toMiddle = false) {
	if (!node || !isString(text)) return;
	if (text.indexOf("\n") === -1) node.text(text);
	else {
		const diff = [node.text(), text].map((v) => v.replace(/[\s\n]/g, ""));
		if (diff[0] !== diff[1]) {
			const multiline = text.split("\n");
			const len = toMiddle ? multiline.length - 1 : 1;
			node.html("");
			multiline.forEach((v, i) => {
				node.append("tspan").attr("x", 0).attr("dy", `${i === 0 ? dy[0] * len : dy[1]}em`).text(v);
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
function getRectSegList(path) {
	const { x, y, width, height } = getBBox(path, true);
	return [
		{
			x,
			y: y + height
		},
		{
			x,
			y
		},
		{
			x: x + width,
			y
		},
		{
			x: x + width,
			y: y + height
		}
	];
}
/**
* Get svg bounding path box dimension
* @param {SVGGraphicsElement} path Target svg element
* @returns {object}
* @private
*/
function getPathBox(path) {
	const { width, height } = getBoundingRect(path);
	const items = getRectSegList(path);
	return {
		x: items[0].x,
		y: Math.min(items[0].y, items[1].y),
		width,
		height
	};
}
/**
* Get event's current position coordinates
* @param {object} event Event object
* @param {SVGElement|HTMLElement} element Target element
* @returns {Array} [x, y] Coordinates x, y array
* @private
*/
function getPointer(event, element) {
	const touches = event && (event.touches || event.sourceEvent && event.sourceEvent.touches)?.[0];
	let pointer$1 = [0, 0];
	try {
		pointer$1 = pointer(touches || event, element);
	} catch {}
	return pointer$1.map((v) => isNaN(v) ? 0 : v);
}
/**
* Get boundingClientRect.
* @param {SVGElement} node Target element
* @param {boolean} forceEval Force evaluation
* @returns {object}
* @private
*/
function getBoundingRect(node, forceEval = false) {
	return _getRect(true, node, forceEval);
}
/**
* Get BBox.
* @param {SVGElement} node Target element
* @param {boolean} forceEval Force evaluation
* @returns {object}
* @private
*/
function getBBox(node, forceEval = false) {
	return _getRect(false, node, forceEval);
}
/**
* Add CSS rules
* @param {object} style Style object
* @param {string} selector Selector string
* @param {Array} prop Prps arrary
* @returns {number} Newely added rule index
* @private
*/
function addCssRules(style, selector, prop) {
	const { rootSelector = "", sheet } = style;
	const rule = `${rootSelector} ${getCssSelector(selector)} {${prop.join(";")}}`;
	return sheet[sheet.insertRule ? "insertRule" : "addRule"](rule, sheet.cssRules.length);
}
/**
* Get css rules for specified stylesheets
* @param {Array} styleSheets The stylesheets to get the rules from
* @returns {Array}
* @private
*/
function getCssRules(styleSheets) {
	let rules = [];
	styleSheets.forEach((sheet) => {
		try {
			if (sheet.cssRules && sheet.cssRules.length) rules = rules.concat(toArray(sheet.cssRules));
		} catch (e) {
			win.console?.warn(`Error while reading rules from ${sheet.href}: ${String(e)}`);
		}
	});
	return rules;
}
/**
* Get current window and container scroll position
* @param {HTMLElement} node Target element
* @returns {object} window scroll position
* @private
*/
function getScrollPosition(node) {
	return {
		x: (win.pageXOffset ?? win.scrollX ?? 0) + (node.scrollLeft ?? 0),
		y: (win.pageYOffset ?? win.scrollY ?? 0) + (node.scrollTop ?? 0)
	};
}
/**
* Get translation string from screen <--> svg point
* @param {SVGGraphicsElement} node graphics element
* @param {number} x target x point
* @param {number} y target y point
* @param {boolean} inverse inverse flag
* @returns {object}
*/
function getTransformCTM(node, x = 0, y = 0, inverse = true) {
	const point = new DOMPoint(x, y);
	const screen = node.getScreenCTM();
	const res = point.matrixTransform(inverse ? screen?.inverse() : screen);
	if (inverse === false) {
		const rect = getBoundingRect(node);
		res.x -= rect.x;
		res.y -= rect.y;
	}
	return res;
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
	return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0
	};
}
/**
* Get position value from element's attribute or transform
* @param {SVGElement} element SVG element
* @param {string} type Coordinate type ("x" or "y")
* @returns {number} Position value
* @private
*/
function getElementPos(element, type) {
	const attr = element?.getAttribute?.(type);
	if (attr) return parseFloat(attr);
	const matrix = getTranslation(element);
	return type === "x" ? matrix.e : matrix.f;
}
/**
* Check if svg element has viewBox attribute
* @param {d3Selection} svg Target svg selection
* @returns {boolean}
*/
function hasViewBox(svg) {
	const attr = svg.attr("viewBox");
	return attr ? attr.trim().split(/[\s,]+/).length === 4 : false;
}
/**
* Determine if given node has the specified style
* @param {d3Selection|SVGElement} node Target node
* @param {object} condition Conditional style props object
* @param {boolean} all If true, all condition should be matched
* @returns {boolean}
*/
function hasStyle(node, condition, all = false) {
	const isD3Node = !!node.node;
	let has = false;
	for (const [key, value] of Object.entries(condition)) {
		has = isD3Node ? node.style(key) === value : node.style[key] === value;
		if (all ? !has : has) break;
	}
	return has;
}
/**
* Return if the current doc is visible or not
* @returns {boolean}
* @private
*/
function isTabVisible() {
	return doc?.hidden === false || doc?.visibilityState === "visible";
}
/**
* Get the current input type
* @param {boolean} mouse Config value: interaction.inputType.mouse
* @param {boolean} touch Config value: interaction.inputType.touch
* @returns {string} "mouse" | "touch" | null
* @private
*/
function convertInputType(mouse, touch) {
	const { DocumentTouch, matchMedia, navigator } = win;
	const hasPointerCoarse = matchMedia?.("(pointer:coarse)").matches;
	let hasTouch = false;
	if (touch) {
		if (navigator && "maxTouchPoints" in navigator) hasTouch = navigator.maxTouchPoints > 0;
		else if ("ontouchmove" in win || DocumentTouch && doc instanceof DocumentTouch) hasTouch = true;
		else if (hasPointerCoarse) hasTouch = true;
		else {
			const UA = navigator.userAgent;
			hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
		}
	}
	return mouse && !hasPointerCoarse && matchMedia?.("(pointer:fine)").matches && "mouse" || hasTouch && "touch" || "mouse";
}
/**
* Schedule a RAF update to batch multiple redraw requests
* Manages a RAF state object to intelligently batch rapid updates while ensuring
* immediate execution for the first call (for test compatibility)
* @param {object} rafState RAF state object with pendingRaf property
* @param {number|null} rafState.pendingRaf ID of pending RAF or null
* @param {function} callback Function to execute in RAF
* @returns {void}
* @private
*/
function scheduleRAFUpdate(rafState, callback) {
	if (rafState.pendingRaf !== null) {
		win.cancelAnimationFrame(rafState.pendingRaf);
		rafState.pendingRaf = win.requestAnimationFrame(() => {
			rafState.pendingRaf = null;
			callback();
		});
	} else {
		rafState.pendingRaf = win.requestAnimationFrame(() => {
			rafState.pendingRaf = null;
		});
		callback();
	}
}
const emulateEvent = {
	mouse: (() => {
		const getParams = () => ({
			bubbles: false,
			cancelable: false,
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0
		});
		try {
			new MouseEvent("t");
			return (el, eventType, params = getParams()) => {
				el.dispatchEvent(new MouseEvent(eventType, params));
			};
		} catch {
			return (el, eventType, params = getParams()) => {
				const mouseEvent = doc.createEvent("MouseEvent");
				mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, params.screenX, params.screenY, params.clientX, params.clientY, false, false, false, false, 0, null);
				el.dispatchEvent(mouseEvent);
			};
		}
	})(),
	touch: (el, eventType, params) => {
		const touchObj = new Touch(mergeObj({
			identifier: Date.now(),
			target: el,
			radiusX: 2.5,
			radiusY: 2.5,
			rotationAngle: 10,
			force: .5
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
//#endregion
export { addCssRules, convertInputType, emulateEvent, getBBox, getBoundingRect, getCssRules, getElementPos, getPathBox, getPointer, getRectSegList, getScrollPosition, getTransformCTM, getTranslation, hasStyle, hasViewBox, isTabVisible, scheduleRAFUpdate, setTextValue };
