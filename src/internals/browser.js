/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @module
 * @ignore
 */
/* eslint-disable no-new-func, no-undef */
const win = (() => {
	const def = o => typeof o !== "undefined" && o;

	return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
})();
/* eslint-enable no-new-func, no-undef */

const doc = win && win.document;

export {
	win as window,
	doc as document
};
