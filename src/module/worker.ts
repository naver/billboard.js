/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "./browser";

// Store worker cache in memory
const cache: {[key: string]: {src: string, worker: Worker | null}} = {};

// Correlation id for worker request/response matching
let messageId = 0;

/**
 * Get or create cached worker resources (Object URL, Worker)
 * @param {function} fn Function to be executed in worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {{key: string, src: string}} Cache key and Object URL
 * @private
 */
function getOrCreateWorkerResources(fn: Function, depsFn?: Function[]):
	| {key: string, src: string}
	| null {
	const fnString = fn.toString();
	// Include depsFn in cache key to handle different dependencies
	const depsString = depsFn?.map(String).join(";") ?? "";
	const key = (fnString + depsString).replace(/(function|[\s\W\n])/g, "").substring(0, 30);

	if (!(key in cache)) {
		try {
			// Create Blob and Object URL for Web Worker
			const blob = new window.Blob([
				`${depsString}

				self.onmessage=function({data}) {
					const result = (${fnString}).apply(null, data.args);
					self.postMessage({id: data.id, result});
				};`
			], {
				type: "text/javascript"
			});

			cache[key] = {
				src: window.URL.createObjectURL(blob),
				worker: null
			};
		} catch {
			return null;
		}
	}

	return {key, src: cache[key].src};
}

/**
 * Get or create cached WebWorker instance
 * @param {string} key Cache key
 * @param {string} src URL object as string
 * @returns {Worker} WebWorker instance
 * @private
 */
export function getWorker(key: string, src: string): Worker | null {
	const cached = cache[key];

	// Return null if cache entry doesn't exist
	if (!cached) {
		return null;
	}

	if (!cached.worker) {
		try {
			cached.worker = new window.Worker(src);
		} catch {
			return null;
		}

		// handle error
		if (cached.worker) {
			cached.worker.onerror = function(e: ErrorEvent) {
				// eslint-disable-next-line no-console
				console.error ? console.error(e) : console.log(e);
			};
		}
	}

	return cached.worker;
}

/**
 * Create and run on Web Worker
 * @param {boolean} useWorker Use Web Worker
 * @param {function} fn Function to be executed in worker
 * @param {function} callback Callback function to receive result from worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {function}
 * @example
 * 	const worker = runWorker(function(arg) {
 * 		  // do some tasks...
 * 		  console.log("param:", A(arg));
 *
 * 		  return 1234;
 * 	   }, function(data) {
 * 		  // callback after worker is done
 * 	 	  console.log("result:", data);
 * 	   },
 * 	   [function A(){}]
 * 	);
 *
 * 	worker(11111);
 * @private
 */
export function runWorker(
	useWorker = true,
	fn: Function,
	callback: Function,
	depsFn?: Function[]
): Function {
	let runFn = function(...args: unknown[]) {
		const res = fn(...args);

		callback(res);
	};

	if (window.Worker && useWorker) {
		const workerResources = getOrCreateWorkerResources(fn, depsFn);
		const worker = workerResources && getWorker(workerResources.key, workerResources.src);

		if (worker) {
			runFn = function(...args: unknown[]) {
				// workers are cached and shared: match the response by id so concurrent
				// callers don't steal each other's result
				const id = ++messageId;

				const handler = function(e: MessageEvent) {
					if (e.data?.id === id) {
						worker.removeEventListener("message", handler);
						callback(e.data.result);
					}
				};

				worker.addEventListener("message", handler);
				worker.postMessage({id, args});
			};
		}
	}

	return runFn;
}

/**
 * Clean-up all cached workers and release resources
 * @private
 */
export function cleanupWorkers(): void {
	for (const key in cache) {
		const cached = cache[key];

		if (cached.worker) {
			cached.worker.terminate();
		}

		if (cached.src) {
			window.URL.revokeObjectURL(cached.src);
		}

		delete cache[key];
	}
}
