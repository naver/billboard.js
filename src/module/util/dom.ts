/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {pointer as d3Pointer} from "d3-selection";
import type {d3Selection} from "../../../types/types";
import {document, window} from "../browser";
import {mergeObj, toArray} from "./object";
import {isString} from "./type-checks";

// ====================================
// Internal Helper (Not Exported)
// ====================================

/**
 * Get boundingClientRect or BBox with caching.
 * Internal helper for getBoundingRect() and getBBox()
 * @param {boolean} relativeViewport Relative to viewport - true: will use .getBoundingClientRect(), false: will use .getBBox()
 * @param {SVGElement} node Target element
 * @param {boolean} forceEval Force evaluation
 * @returns {object}
 * @private
 */
function _getRect(
	relativeViewport: boolean,
	node: SVGElement & Partial<{rect: DOMRect | SVGRect}>,
	forceEval = false
): DOMRect | SVGRect {
	const _ = n => n[relativeViewport ? "getBoundingClientRect" : "getBBox"]();

	if (forceEval) {
		return _(node);
	} else {
		// will cache the value if the element is not a SVGElement or the width is not set
		const needEvaluate = !("rect" in node) || (
			"rect" in node && node.hasAttribute("width") &&
			node.rect!.width !== +(node.getAttribute("width") || 0)
		);

		return needEvaluate ? (node.rect = _(node)) : node.rect!;
	}
}

// ====================================
// Exported
// ====================================

/**
 * Set text value. If there're multiline add nodes.
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
	 */
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
	const {width, height} = getBoundingRect(path);
	const items = getRectSegList(path);
	const x = items[0].x;
	const y = Math.min(items[0].y, items[1].y);

	return {
		x,
		y,
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
function getPointer(event, element?: HTMLElement | SVGElement): number[] {
	const touches = event &&
		(event.touches || (event.sourceEvent && event.sourceEvent.touches))?.[0];
	let pointer = [0, 0];

	try {
		pointer = d3Pointer(touches || event, element);
	} catch {}

	return pointer.map(v => (isNaN(v) ? 0 : v));
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
function addCssRules(style, selector: string, prop: string[]): number {
	const {rootSelector = "", sheet} = style;
	const getSelector = s =>
		s
			.replace(/\s?(bb-)/g, ".$1")
			.replace(/\.+/g, ".");

	const rule = `${rootSelector} ${getSelector(selector)} {${prop.join(";")}}`;

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
 * Get current window and container scroll position
 * @param {HTMLElement} node Target element
 * @returns {object} window scroll position
 * @private
 */
function getScrollPosition(node: HTMLElement) {
	return {
		x: (window.pageXOffset ?? window.scrollX ?? 0) + (node.scrollLeft ?? 0),
		y: (window.pageYOffset ?? window.scrollY ?? 0) + (node.scrollTop ?? 0)
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
function getTransformCTM(node: SVGGraphicsElement, x = 0, y = 0, inverse = true): DOMPoint {
	const point = new DOMPoint(x, y);
	const screen = <DOMMatrix>node.getScreenCTM();
	const res = point.matrixTransform(
		inverse ? screen?.inverse() : screen
	);

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

	return baseVal && baseVal.numberOfItems ?
		baseVal.getItem(0).matrix :
		{a: 0, b: 0, c: 0, d: 0, e: 0, f: 0};
}

/**
 * Get position value from element's attribute or transform
 * @param {SVGElement} element SVG element
 * @param {string} type Coordinate type ("x" or "y")
 * @returns {number} Position value
 * @private
 */
function getElementPos(element: SVGElement | undefined, type: "x" | "y"): number {
	const attr = element?.getAttribute?.(type);

	if (attr) {
		return parseFloat(attr);
	}

	const matrix = getTranslation(element);

	return type === "x" ? matrix.e : matrix.f;
}

/**
 * Check if svg element has viewBox attribute
 * @param {d3Selection} svg Target svg selection
 * @returns {boolean}
 */
function hasViewBox(svg: d3Selection): boolean {
	const attr = svg.attr("viewBox");

	return attr ? /(\d+(\.\d+)?){3}/.test(attr) : false;
}

/**
 * Determine if given node has the specified style
 * @param {d3Selection|SVGElement} node Target node
 * @param {object} condition Conditional style props object
 * @param {boolean} all If true, all condition should be matched
 * @returns {boolean}
 */
function hasStyle(node, condition: Record<string, string>, all = false): boolean {
	const isD3Node = !!node.node;
	let has = false;

	for (const [key, value] of Object.entries(condition)) {
		has = isD3Node ? node.style(key) === value : node.style[key] === value;

		if (all === false && has) {
			break;
		}
	}

	return has;
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

	// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer#coarse
	const hasPointerCoarse = matchMedia?.("(pointer:coarse)").matches;
	let hasTouch = false;

	if (touch) {
		// Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
		if (navigator && "maxTouchPoints" in navigator) {
			hasTouch = navigator.maxTouchPoints > 0;

			// Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
			// On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
		} else if (
			"ontouchmove" in window || (DocumentTouch && document instanceof DocumentTouch)
		) {
			hasTouch = true;
		} else {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection
			if (hasPointerCoarse) {
				hasTouch = true;
			} else {
				// Only as a last resort, fall back to user agent sniffing
				const UA = navigator.userAgent;

				hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
	}

	// For non-touch device, media feature condition is: '(pointer:coarse) = false' and '(pointer:fine) = true'
	// https://github.com/naver/billboard.js/issues/3854#issuecomment-2404183158
	const hasMouse = mouse && !hasPointerCoarse && matchMedia?.("(pointer:fine)").matches;

	// fallback to 'mouse' if no input type is detected.
	return (hasMouse && "mouse") || (hasTouch && "touch") || "mouse";
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
function scheduleRAFUpdate(rafState: {pendingRaf: number | null}, callback: () => void): void {
	// If there's already a pending RAF, we're in a rapid update scenario
	// Cancel it and schedule a new one to batch the updates
	if (rafState.pendingRaf !== null) {
		window.cancelAnimationFrame(rafState.pendingRaf);

		// Schedule new RAF
		rafState.pendingRaf = window.requestAnimationFrame(() => {
			rafState.pendingRaf = null;
			callback();
		});
	} else {
		// First call - execute immediately for test compatibility
		// But set pending RAF to detect rapid consecutive calls
		rafState.pendingRaf = window.requestAnimationFrame(() => {
			rafState.pendingRaf = null;
		});

		callback();
	}
}

// emulate event
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
			// eslint-disable-next-line no-new
			new MouseEvent("t");

			return (el: SVGElement | HTMLElement, eventType: string, params = getParams()) => {
				el.dispatchEvent(new MouseEvent(eventType, params));
			};
		} catch {
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
					params.screenX,
					params.screenY,
					params.clientX,
					params.clientY,
					false,
					false,
					false,
					false,
					0,
					null
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

export {
	addCssRules,
	convertInputType,
	emulateEvent,
	getBBox,
	getBoundingRect,
	getCssRules,
	getElementPos,
	getPathBox,
	getPointer,
	getRectSegList,
	getScrollPosition,
	getTransformCTM,
	getTranslation,
	hasStyle,
	hasViewBox,
	isTabVisible,
	scheduleRAFUpdate,
	setTextValue
};
