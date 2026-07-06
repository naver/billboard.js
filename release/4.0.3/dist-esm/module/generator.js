/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { requestIdleCallback, window as win, cancelIdleCallback } from './browser.js';
import { isNumber, isArray } from './util/type-checks.js';
import { runUntil } from './util/object.js';
import { isTabVisible } from './util/dom.js';

const { setTimeout, clearTimeout } = win;
/**
 * Generate resize queue function
 * @param {boolean|number} option Resize option
 * @returns {Fucntion}
 * @private
 */
function generateResize(option) {
    const fn = [];
    let timeout;
    const callResizeFn = function () {
        // Delay all resize functions call, to prevent unintended excessive call from resize event
        callResizeFn.clear();
        if (option === false) {
            timeout = requestIdleCallback(() => {
                timeout = null;
                fn.forEach((f) => f());
            }, { timeout: 200 });
        }
        else {
            timeout = setTimeout(() => {
                timeout = null;
                fn.forEach((f) => f());
            }, isNumber(option) ? option : 200);
        }
    };
    callResizeFn.clear = () => {
        if (timeout) {
            (option === false ? cancelIdleCallback : clearTimeout)(timeout);
            timeout = null;
        }
    };
    callResizeFn.add = f => fn.push(f);
    callResizeFn.remove = f => {
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
    // 'f' is called as selection.call(f, ...);
    const f = function (selection, callback) {
        /**
         * Check if transition is complete
         * @returns {boolean} Whether transition is complete
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
                }
                catch {
                    done++;
                }
            }
            return done === transitionsToWait.length;
        }
        runUntil(() => {
            callback?.();
        }, loop);
    };
    f.add = function (t) {
        isArray(t) ? (transitionsToWait = transitionsToWait.concat(t)) : transitionsToWait.push(t);
    };
    return f;
}

export { generateResize, generateWait };
