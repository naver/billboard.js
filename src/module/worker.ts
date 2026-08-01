/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "./browser";

// Store worker cache in memory
const cache: {[key: string]: {src: string, worker: Worker | null}} = {};
const disabledKeys = new Set<string>();
const DEFAULT_WORKER_TIMEOUT = 5000;

// Correlation id for worker request/response matching
let messageId = 0;

/**
 * Get Web Worker related browser APIs when all required primitives are available.
 * @returns {object|null} Worker API handles
 * @private
 */
function getWorkerAPI():
	| {Blob: typeof Blob, Worker: typeof Worker, URL: typeof URL}
	| null {
	const {Blob, Worker, URL} = window;

	return Worker && Blob && URL?.createObjectURL && URL?.revokeObjectURL ?
		{Blob, Worker, URL} :
		null;
}

/**
 * Generate a stable cache key from the worker source.
 * @param {string} str Worker source string
 * @returns {string} Cache key
 * @private
 */
function hashString(str: string): string {
	let hash = 2166136261;

	for (let i = 0, len = str.length; i < len; i++) {
		hash ^= str.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}

	return `worker-${str.length}-${(hash >>> 0).toString(36)}`;
}

/**
 * Release cached worker resources and optionally disable this worker for the session.
 * @param {string} key Cache key
 * @param {boolean} disable Whether to disable future worker attempts
 * @private
 */
function releaseWorker(key: string, disable = false): void {
	const cached = cache[key];
	const api = getWorkerAPI();

	if (disable) {
		disabledKeys.add(key);
	}

	if (cached) {
		cached.worker?.terminate();
		cached.src && api?.URL.revokeObjectURL(cached.src);
		delete cache[key];
	}
}

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
	const api = getWorkerAPI();
	const fnString = fn.toString();
	// Include depsFn in cache key to handle different dependencies
	const depsString = depsFn?.map(String).join(";") ?? "";
	const key = hashString(`${fnString}\n${depsString}`);

	if (!api || disabledKeys.has(key)) {
		return null;
	}

	if (!(key in cache)) {
		try {
			// Create Blob and Object URL for Web Worker
			const blob = new api.Blob([
				`${depsString}

				self.onmessage=function({data}) {
					try {
						const result = (${fnString}).apply(null, data.args);
						self.postMessage({id: data.id, result});
					} catch (error) {
						self.postMessage({
							id: data.id,
							error: error && (error.message || error.name) || String(error)
						});
					}
				};`
			], {
				type: "text/javascript"
			});

			cache[key] = {
				src: api.URL.createObjectURL(blob),
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
	const api = getWorkerAPI();

	// Return null if cache entry doesn't exist
	if (!cached || !api || disabledKeys.has(key)) {
		return null;
	}

	if (!cached.worker) {
		try {
			cached.worker = new api.Worker(src);
		} catch {
			releaseWorker(key, true);
			return null;
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
 * @param {number} timeout Worker response timeout in milliseconds.
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
	depsFn?: Function[],
	timeout = DEFAULT_WORKER_TIMEOUT
): Function {
	const runSync = function(...args: unknown[]) {
		const res = fn(...args);

		callback(res);
	};
	let runFn = runSync;

	if (useWorker) {
		const workerResources = getOrCreateWorkerResources(fn, depsFn);
		const worker = workerResources ? getWorker(workerResources.key, workerResources.src) : null;

		if (worker && workerResources) {
			const {key} = workerResources;

			runFn = function(...args: unknown[]) {
				// workers are cached and shared: match the response by id so concurrent
				// callers don't steal each other's result
				const id = ++messageId;
				let settled = false;

				const fallback = () => {
					if (!settled) {
						settled = true;
						cleanup();
						releaseWorker(key, true);
						runFn = runSync;
						runSync(...args);
					}
				};

				const handler = function(e: MessageEvent) {
					if (e.data?.id === id) {
						if (e.data.error) {
							fallback();
							return;
						}

						settled = true;
						cleanup();
						callback(e.data.result);
					}
				};

				const errorHandler = function() {
					fallback();
				};

				const timer = setTimeout(fallback, timeout);
				const cleanup = () => {
					clearTimeout(timer);
					worker.removeEventListener("message", handler);
					worker.removeEventListener("error", errorHandler);
				};

				worker.addEventListener("message", handler);
				worker.addEventListener("error", errorHandler);

				try {
					worker.postMessage({id, args});
				} catch {
					fallback();
				}
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
	const api = getWorkerAPI();

	for (const key in cache) {
		const cached = cache[key];

		if (cached.worker) {
			cached.worker.terminate();
		}

		if (cached.src) {
			api?.URL.revokeObjectURL(cached.src);
		}

		delete cache[key];
	}

	disabledKeys.clear();
}
