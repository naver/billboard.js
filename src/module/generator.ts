/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {d3Transition} from "../../types/types";
import {window, requestIdleCallback} from "./browser";
import {isArray, isNumber, isTabVisible, runUntil} from "./util";

const {setTimeout, clearTimeout} = window;

/**
 * Generate resize queue function
 * @param {boolean|number} option Resize option
 * @returns {Fucntion}
 * @private
 */
export function generateResize(option: boolean|number) {
	const fn: Function[] = [];
	let timeout;

	const callResizeFn = function() {
		// Delay all resize functions call, to prevent unintended excessive call from resize event
		callResizeFn.clear();

		if (option === false) {
			requestIdleCallback(() => {
				fn.forEach((f: Function) => f());
			}, {timeout: 200});
		} else {
			timeout = setTimeout(() => {
				fn.forEach((f: Function) => f());
			}, isNumber(option) ? option : 200);
		}
	};

	callResizeFn.clear = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	callResizeFn.add = f => fn.push(f);
	callResizeFn.remove = f => fn.splice(fn.indexOf(f), 1);

	return callResizeFn;
}

type Transition = boolean | d3Transition;

/**
 * Generate transition queue function
 * @returns {Function}
 * @private
 */
export function generateWait() {
	let transitionsToWait: Transition[] = [];

	// 'f' is called as selection.call(f, ...);
	const f = function(selection: d3Transition, callback: Function) {
		/**
		 * Check if transition is complete
		 * @returns {boolean} Whether transition is complete
		 * @private
		 */
		function loop(): boolean {
			let done = 0;

			for (let i = 0, t; (t = transitionsToWait[i]); i++) {
				if (t === true || t.empty?.()) {
					done++;
					continue;
				}

				// when tab isn't visible exit loop
				if (isTabVisible() === false) {
					done = transitionsToWait.length;
					break;
				}

				try {
					t.transition();
				} catch (e) {
					done++;
				}
			}

			return done === transitionsToWait.length;
		}

		runUntil(() => {
			callback?.();
		}, loop);
	};

	f.add = function(t: Transition | Transition[]) {
		isArray(t) ?
			(transitionsToWait = transitionsToWait.concat(t)) :
			transitionsToWait.push(t);
	};

	return f;
}
