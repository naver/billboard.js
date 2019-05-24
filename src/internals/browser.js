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

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
const isMobile = (
	win.navigator && win.navigator.userAgent &&
		win.navigator.userAgent.indexOf("Mobi") > -1
) || false;

export {
	win as window,
	doc as document,
	isMobile
};
