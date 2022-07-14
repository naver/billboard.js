/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "./browser";

// Store blob in memory
const blob = {};

/**
 * Get Object URL
 * @param {Function} fn Function to be executed in worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {string}
 * @private
 */
function getObjectURL(fn: Function, depsFn?: Function[]): string {
	const fnString = fn.toString();
	const key = fnString.replace(/(function|[\s\W\n])/g, "").substring(0, 15);

	if (!(key in blob)) {
		// Web Worker body
		blob[key] = new window.Blob([
			`${depsFn?.map(String).join(";") ?? ""}

			self.onmessage=function({data}) {
				const result = (${fnString}).apply(null, data);
				self.postMessage(result);
			};`
		], {
			type: "text/javascript"
		});
	}

	return window.URL.createObjectURL(blob[key]);
}

/**
 * Create and run on Web Worker
 * @param {boolean} useWorker Use Web Worker
 * @param {Function} fn Function to be executed in worker
 * @param {Function} callback Callback function to receive result from worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {object}
 * @example
 * 	const worker = runWorker(function(arg) {
 *		  // do some tasks...
 *		  console.log("param:", A(arg));
 *
 *		  return 1234;
 *	   }, function(data) {
 *		  // callback after worker is done
 *	 	  console.log("result:", data);
 *	   },
 *	   [function A(){}]
 *	);
 *
 *	worker(11111);
 * @private
 */
export function runWorker(
	useWorker = true, fn: Function, callback: Function, depsFn?: Function[]
): Function {
	let runFn;

	if (window.Worker && useWorker) {
		const src = getObjectURL(fn, depsFn);
		const worker = new window.Worker(src);

		runFn = function(...args) {
			// trigger worker
			worker.postMessage(args);

			// listen worker
			worker.onmessage = function(e) {
				// release object URL from memory
				window.URL.revokeObjectURL(src);

				return callback(e.data);
			};

			// handle error
			worker.onerror = function(e) {
				console.error(e);
			};

			// return new Promise((resolve, reject) => {
			// 	worker.onmessage = ({data}) => resolve(data);
			// 	worker.onerror = reject;
			// });
		};
	} else {
		runFn = function(...args) {
			const res = fn(...args);

			callback(res);
		};
	}

	return runFn;
}
