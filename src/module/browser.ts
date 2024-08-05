/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */
/**
 * Get global object
 * @returns {object} window object
 * @private
 */
function getGlobal() {
	return (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object &&
		globalThis) ||
		(typeof global === "object" && global !== null && global.Object === Object && global) ||
		(typeof self === "object" && self !== null && self.Object === Object && self) ||
		Function("return this")();
}

/**
 * Get fallback object
 * @param {object} w global object
 * @returns {Array} fallback object array
 * @private
 */
export function getFallback(w?) {
	const hasRAF = typeof w?.requestAnimationFrame === "function" &&
		typeof w?.cancelAnimationFrame === "function";
	const hasRIC = typeof w?.requestIdleCallback === "function" &&
		typeof w?.cancelIdleCallback === "function";
	const request = cb => setTimeout(cb, 1);
	const cancel = id => clearTimeout(id);

	return [
		hasRAF ? w.requestAnimationFrame : request,
		hasRAF ? w.cancelAnimationFrame : cancel,
		hasRIC ? w.requestIdleCallback : request,
		hasRIC ? w.cancelIdleCallback : cancel
	];
}

const win = getGlobal();
const doc = win?.document;

const [
	requestAnimationFrame,
	cancelAnimationFrame,
	requestIdleCallback,
	cancelIdleCallback
] = getFallback(win);

export {
	cancelAnimationFrame,
	cancelIdleCallback,
	doc as document,
	requestAnimationFrame,
	requestIdleCallback,
	win as window
};
