/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */
export {
	win as window,
	doc as document,
	requestAnimationFrame, cancelAnimationFrame,
	requestIdleCallback, cancelIdleCallback
};

const win = (() => {
	const root = (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis) ||
		(typeof global === "object" && global !== null && global.Object === Object && global) ||
		(typeof self === "object" && self !== null && self.Object === Object && self);

	return root || Function("return this")();
})();
/* eslint-enable no-new-func, no-undef */

// fallback for non-supported environments
const hasRAF = typeof win.requestAnimationFrame === "function";
const hasRIC = typeof win.requestIdleCallback === "function";

const requestAnimationFrame = hasRAF ? win.requestAnimationFrame : (cb => setTimeout(cb, 1));
const cancelAnimationFrame = hasRAF ? win.cancelAnimationFrame : (id => clearTimeout(id));
const requestIdleCallback = hasRIC ? win.requestIdleCallback : requestAnimationFrame;
const cancelIdleCallback = hasRIC ? win.cancelIdleCallback : cancelAnimationFrame;

const doc = win?.document;
