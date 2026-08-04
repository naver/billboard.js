/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "./browser";

/**
 * The worker source constant (declared in config/globals.d.ts) is pre-bundled from
 * `src/module/worker.entry.ts` and injected at build time by config/worker-src.js.
 * Never name that constant outside the single reference in getWorkerSrc(): the
 * rolldown injection is textual, so a mention in a comment would inline the whole
 * source string a second time.
 *
 * Offloaded work is addressed by op name and the worker code is built
 * independently of the application bundle, so no application function is ever
 * stringified. Host toolchains that rewrite function bodies - coverage
 * instrumentation, babel helpers, bundler-hoisted module scope - cannot break
 * the worker anymore.
 */
// Store worker cache in memory
const cache: {[key: string]: {revoke: boolean, src: string, worker: Worker | null}} = {};
const disabledKeys = new Set<string>();
const verifiedKeys = new Set<string>();
const DEFAULT_WORKER_TIMEOUT = 5000;

// Correlation id for worker request/response matching
let messageId = 0;

type TWorkerOptions = {timeout?: number, workerUrl?: string};

/**
 * Get the build-injected worker source.
 * @returns {string} Worker source, or empty string when it wasn't injected
 * @private
 */
function getWorkerSrc(): string {
	try {
		// referenced exactly once: each occurrence inlines the whole source string
		return __WORKER_SRC__;
	} catch {
		// not injected (e.g. consuming src/*.ts directly) - stay on the main thread
		return "";
	}
}

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
 * Get Worker constructor when available.
 * @returns {function|null} Worker constructor
 * @private
 */
function getWorkerConstructor(): typeof Worker | null {
	return window.Worker || null;
}

/**
 * Normalize worker options while preserving the legacy numeric timeout argument.
 * @param {number|object} options Worker timeout or options
 * @returns {object} Normalized worker options
 * @private
 */
function normalizeWorkerOptions(options?: number | TWorkerOptions): Required<TWorkerOptions> {
	return typeof options === "number" ? {timeout: options, workerUrl: ""} : {
		timeout: options?.timeout ?? DEFAULT_WORKER_TIMEOUT,
		workerUrl: options?.workerUrl ?? ""
	};
}

/**
 * Release cached worker resources and optionally disable this worker for the session.
 * @param {string} key Cache key
 * @param {boolean} disable Whether to disable future worker attempts
 * @private
 */
function releaseWorker(key: string, disable = false): void {
	const cached = cache[key];

	if (disable) {
		disabledKeys.add(key);
	}

	if (cached) {
		cached.worker?.terminate();
		cached.revoke && getWorkerAPI()?.URL.revokeObjectURL(cached.src);
		delete cache[key];
	}

	// entries are stored per op as `${key}:${op}`, so a bare key never matches:
	// drop every op verified against the worker being released
	for (const verified of verifiedKeys) {
		if (verified.startsWith(`${key}:`)) {
			verifiedKeys.delete(verified);
		}
	}
}

/**
 * Compare worker and main-thread results for the parity self-test.
 * @param {unknown} actual Worker result
 * @param {unknown} expected Main-thread result
 * @returns {boolean} Whether results match
 * @private
 */
function isSameResult(actual, expected): boolean {
	if (actual === expected) {
		return true;
	}

	try {
		return JSON.stringify(actual) === JSON.stringify(expected);
	} catch {
		// Structured-cloned worker results should normally be serializable. If a custom
		// worker returns an exotic value, don't disable the worker on an unverifiable result.
		return true;
	}
}

/**
 * Get or create cached worker resources (Object URL, Worker)
 * @param {string} op Worker op name
 * @param {string} workerUrl Custom worker script URL.
 * @returns {{key: string, src: string}} Cache key and Object URL
 * @private
 */
function getOrCreateWorkerResources(op: string, workerUrl = ""):
	| {key: string, src: string}
	| null {
	const hasWorker = !!getWorkerConstructor();
	const api = workerUrl ? null : getWorkerAPI();
	const src = workerUrl ? "" : getWorkerSrc();
	// one worker per source: ops share a single cached worker per script
	const key = workerUrl || "blob";

	if (!hasWorker || (!workerUrl && (!api || !src)) || disabledKeys.has(key)) {
		return null;
	}

	if (!(key in cache)) {
		try {
			if (workerUrl) {
				cache[key] = {
					revoke: false,
					src: workerUrl,
					worker: null
				};
			} else if (api) {
				// Create Blob and Object URL for Web Worker
				const blob = new api.Blob([src], {
					type: "text/javascript"
				});

				cache[key] = {
					revoke: true,
					src: api.URL.createObjectURL(blob),
					worker: null
				};
			}
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
	const Worker = getWorkerConstructor();

	// Return null if cache entry doesn't exist
	if (!cached || !Worker || disabledKeys.has(key)) {
		return null;
	}

	if (!cached.worker) {
		try {
			cached.worker = new Worker(src);
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
 * @param {string} op Op name registered in src/module/worker.entry.ts
 * @param {function} fn Equivalent main-thread function, used for fallback and parity check
 * @param {function} callback Callback function to receive result from worker
 * @param {number|object} options Worker response timeout or options.
 * @returns {function}
 * @example
 * 	const worker = runWorker(true, "rows", rows, function(data) {
 * 		  // callback after worker is done
 * 	 	  console.log("result:", data);
 * 	   });
 *
 * 	worker(11111);
 * @private
 */
export function runWorker(
	useWorker = true,
	op: string,
	fn: Function,
	callback: Function,
	options?: number | TWorkerOptions
): Function {
	const {timeout, workerUrl} = normalizeWorkerOptions(options);
	const runSync = function(...args: unknown[]) {
		const res = fn(...args);

		callback(res);
	};
	let runFn = runSync;

	if (useWorker) {
		const workerResources = getOrCreateWorkerResources(op, workerUrl);
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

						if (!verifiedKeys.has(`${key}:${op}`)) {
							const expected = fn(...args);

							if (!isSameResult(e.data.result, expected)) {
								releaseWorker(key, true);
								runFn = runSync;
								callback(expected);
								return;
							}

							verifiedKeys.add(`${key}:${op}`);
						}

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
					worker.postMessage({args, id, op});
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
			cached.revoke && api?.URL.revokeObjectURL(cached.src);
		}

		delete cache[key];
	}

	disabledKeys.clear();
	verifiedKeys.clear();
}
