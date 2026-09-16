/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { cancelAnimationFrame, cancelIdleCallback, requestAnimationFrame, requestIdleCallback, window as win } from "./browser.js";
import { isArray, isNumber } from "./util/type-checks.js";
import { runUntil } from "./util/object.js";
import { isTabVisible } from "./util/dom.js";
//#region src/module/generator.ts
const { setTimeout, clearTimeout } = win;
/**
* Generate resize queue function
* @param {boolean|number} option Resize option
* @param {()=>void} live Called on every resize event, throttled by animation frame.
*  Used to reflect the size change before the delayed call takes place.
* @returns {Fucntion}
* @private
*/
function generateResize(option, live) {
	const fn = [];
	let timeout;
	let rafId = null;
	const callResizeFn = function() {
		callResizeFn.clear();
		if (live && rafId === null) rafId = requestAnimationFrame(() => {
			rafId = null;
			live();
		});
		if (option === false) timeout = requestIdleCallback(() => {
			timeout = null;
			fn.forEach((f) => f());
		}, { timeout: 200 });
		else timeout = setTimeout(() => {
			timeout = null;
			fn.forEach((f) => f());
		}, isNumber(option) ? option : 200);
	};
	callResizeFn.clear = () => {
		if (timeout) {
			(option === false ? cancelIdleCallback : clearTimeout)(timeout);
			timeout = null;
		}
	};
	callResizeFn.clearLive = () => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};
	callResizeFn.add = (f) => fn.push(f);
	callResizeFn.remove = (f) => {
		const index = fn.indexOf(f);
		index !== -1 && fn.splice(index, 1);
	};
	return callResizeFn;
}
/**
* Generate transition queue function
* @returns {function}
* @private
*/
function generateWait() {
	let transitionsToWait = [];
	const f = function(selection, callback) {
		/**
		* Check if transition is complete
		* @returns {boolean} Whether transition is complete
		* @private
		*/
		function loop() {
			let done = 0;
			for (let i = 0, t; t = transitionsToWait[i]; i++) {
				if (t === true || t.empty?.()) {
					done++;
					continue;
				}
				if (isTabVisible() === false) {
					done = transitionsToWait.length;
					break;
				}
				try {
					t.transition();
				} catch {
					done++;
				}
			}
			return done === transitionsToWait.length;
		}
		runUntil(() => {
			callback?.();
		}, loop);
	};
	f.add = function(t) {
		isArray(t) ? transitionsToWait = transitionsToWait.concat(t) : transitionsToWait.push(t);
	};
	return f;
}
//#endregion
export { generateResize, generateWait };
