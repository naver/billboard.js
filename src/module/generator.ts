/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {d3Transition} from "../../types/types";
import {
	cancelAnimationFrame,
	cancelIdleCallback,
	requestAnimationFrame,
	requestIdleCallback,
	window
} from "./browser";
import {isArray, isNumber, isTabVisible, runUntil} from "./util";

const {setTimeout, clearTimeout} = window;

/**
 * Generate resize queue function
 * @param {boolean|number} option Resize option
 * @param {()=>void} live Called on every resize event, throttled by animation frame.
 *  Used to reflect the size change before the delayed call takes place.
 * @returns {Fucntion}
 * @private
 */
export function generateResize(option: boolean | number, live?: Function) {
	const fn: Function[] = [];
	let timeout;
	let rafId: number | null = null;

	const callResizeFn = function() {
		// Delay all resize functions call, to prevent unintended excessive call from resize event
		callResizeFn.clear();

		// One pending frame at most: when the live call takes longer than a frame,
		// events coalesce instead of piling up.
		if (live && rafId === null) {
			rafId = requestAnimationFrame(() => {
				rafId = null;
				live();
			});
		}

		if (option === false) {
			timeout = requestIdleCallback(() => {
				timeout = null;
				fn.forEach((f: Function) => f());
			}, {timeout: 200});
		} else {
			timeout = setTimeout(() => {
				timeout = null;
				fn.forEach((f: Function) => f());
			}, isNumber(option) ? option : 200);
		}
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

	callResizeFn.add = f => fn.push(f);

	callResizeFn.remove = f => {
		const index = fn.indexOf(f);

		index !== -1 && fn.splice(index, 1);
	};

	return callResizeFn;
}

type Transition = boolean | d3Transition;

/**
 * Generate transition queue function
 * @returns {function}
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

	f.add = function(t: Transition | Transition[]) {
		isArray(t) ? (transitionsToWait = transitionsToWait.concat(t)) : transitionsToWait.push(t);
	};

	return f;
}
