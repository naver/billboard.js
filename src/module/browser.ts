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
	const def = o => typeof o === "object" && o !== null && o.Object === Object && o;

	// Prioritize referencing Node.js global first to prevent refence error
	// https://github.com/naver/billboard.js/issues/1778
	let freeGlobal = def(global);

	try {
		if (!freeGlobal) {
			freeGlobal = def(globalThis) || def(self) || def(window);
		}
	} catch (e) {}

	return freeGlobal || Function("return this")();
})();
/* eslint-enable no-new-func, no-undef */

const doc = win && win.document;
