/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */
export {win as window, doc as document};

const win = (() => {
	const root = (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis) ||
		(typeof global === "object" && global !== null && global.Object === Object && global) ||
		(typeof self === "object" && self !== null && self.Object === Object && self);

	return root || Function("return this")();
})();
/* eslint-enable no-new-func, no-undef */

const doc = win && win.document;
