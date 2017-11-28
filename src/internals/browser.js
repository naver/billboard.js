/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isDefined} from "../internals/util";

/**
 * Window object
 * @module
 * @ignore
 */
/* eslint-disable no-new-func */
const win = isDefined(window) && window.Math === Math ?
	window : isDefined(self) && (
		self.Math === Math ?
			self : Function("return this")()
	);
/* eslint-enable no-new-func */

const doc = win.document;

export {
	win as window,
	doc as document
};
