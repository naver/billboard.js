/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isDefined} from "../internals/util";

/* eslint-disable no-new-func, no-nested-ternary */
const win = isDefined(window) && window.Math === Math ? window : isDefined(self) && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

export {win as window};
export const document = win.document;
