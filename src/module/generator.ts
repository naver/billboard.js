/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isArray} from "./util";

/**
 * Generate resize queue function
 * @private
 */
export function generateResize(): Function {
	const fn = [];
	let timeout;

	function callResizeFn() {
		// Delay all resize functions call, to prevent unintended excessive call from resize event
		if (timeout) {
			window.clearTimeout(timeout);
			timeout = null;
		}

		timeout = window.setTimeout(() => {
			fn.forEach(f => f());
		}, 200);
	}

	callResizeFn.add = f => fn.push(f);
	callResizeFn.remove = f => fn.splice(fn.indexOf(f), 1);

	return callResizeFn;
}

/**
 * Generate transition queue function
 * @private
 */
export function generateWait(): Function {
	let transitionsToWait = [];
	const f = function(t, callback) {
		let timer;

		function loop() {
			let done = 0;

			for (let i = 0, t; (t = transitionsToWait[i]); i++) {
				if (t.empty()) {
					done++;
					continue;
				}

				try {
					t.transition();
				} catch (e) {
					done++;
				}
			}

			timer && clearTimeout(timer);

			if (done === transitionsToWait.length) {
				callback && callback();
			} else {
				timer = setTimeout(loop, 50);
			}
		}

		loop();
	};

	f.add = function(t) {
		isArray(t) ?
			(transitionsToWait = transitionsToWait.concat(t)) :
			transitionsToWait.push(t);
	};

	return f;
}
