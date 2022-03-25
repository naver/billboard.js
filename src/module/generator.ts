/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {d3Transition} from "../../types/types";
import {window} from "./browser";
import {isArray, isTabVisible} from "./util";

const {setTimeout, clearTimeout} = window;

/**
 * Generate resize queue function
 * @returns {Fucntion}
 * @private
 */
export function generateResize() {
	const fn: any[] = [];
	let timeout;

	const callResizeFn = function() {
		// Delay all resize functions call, to prevent unintended excessive call from resize event
		callResizeFn.clear();

		timeout = setTimeout(() => {
			fn.forEach((f: Function) => f());
		}, 200);
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
		let timer;

		/**
		 * Check if transition is complete
		 * @private
		 */
		function loop() {
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

			timer && clearTimeout(timer);

			if (done === transitionsToWait.length) {
				callback?.();
			} else {
				timer = setTimeout(loop, 50);
			}
		}

		loop();
	};

	f.add = function(t: Transition | Transition[]) {
		isArray(t) ?
			(transitionsToWait = transitionsToWait.concat(t)) :
			transitionsToWait.push(t);
	};

	return f;
}
