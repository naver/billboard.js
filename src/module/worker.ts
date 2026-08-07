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

/**
 * Parity self-test state, keyed as `${key}:${op}`: the in-flight check while it runs,
 * `true` once the worker agreed with the main thread.
 * @private
 */
const verifiedOps = new Map<string, true | Promise<boolean>>();

const DEFAULT_WORKER_TIMEOUT = 5000;

/**
 * Number of leading entries kept when sampling arguments for the parity self-test.
 * @private
 */
const VERIFY_SAMPLE_SIZE = 3;

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
	for (const verified of verifiedOps.keys()) {
		if (verified.startsWith(`${key}:`)) {
			verifiedOps.delete(verified);
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
 * Truncate conversion arguments to a small payload of the same shape.
 *
 * `args[0]` is the data array for every op: an array of series for `columns`, of rows
 * for `rows`, of records for `json`. Keeping a few leading entries - and, where those
 * entries are themselves arrays, a few leading cells of each - stays a valid payload
 * for all three while costing a fixed amount regardless of the real data size.
 * Anything that isn't an array is passed through untouched.
 * @param {Array} args Conversion arguments
 * @returns {Array} Sampled arguments
 * @private
 */
function getVerifySample(args: unknown[]): unknown[] {
	const [data, ...rest] = args;

	if (!Array.isArray(data)) {
		return args;
	}

	return [
		data.slice(0, VERIFY_SAMPLE_SIZE).map(entry =>
			// +1: a column/row entry leads with its name, which the values follow
			Array.isArray(entry) ? entry.slice(0, VERIFY_SAMPLE_SIZE + 1) : entry
		),
		...rest
	];
}

/**
 * Post a single request to the worker and resolve with its result.
 * @param {Worker} worker Worker instance
 * @param {string} op Worker op name
 * @param {Array} args Arguments to hand over
 * @param {number} timeout Response timeout in milliseconds
 * @returns {Promise} Worker result
 * @private
 */
function request(worker: Worker, op: string, args: unknown[], timeout: number): Promise<unknown> {
	// workers are cached and shared: match the response by id so concurrent callers
	// don't steal each other's result
	const id = ++messageId;
	let settled = false;
	let cleanup: () => void;

	const promise = new Promise((resolve, reject) => {
		const settle = (fn: Function, value: unknown) => {
			if (!settled) {
				settled = true;
				cleanup();
				fn(value);
			}
		};
		const handler = function(e: MessageEvent) {
			if (e.data?.id === id) {
				e.data.error ?
					settle(reject, new Error(e.data.error)) :
					settle(resolve, e.data.result);
			}
		};
		const errorHandler = function() {
			settle(reject, new Error("worker error"));
		};
		const timer = setTimeout(() => settle(reject, new Error("worker timeout")), timeout);

		cleanup = () => {
			clearTimeout(timer);
			worker.removeEventListener("message", handler);
			worker.removeEventListener("error", errorHandler);
		};

		worker.addEventListener("message", handler);
		worker.addEventListener("error", errorHandler);
	});

	// Thrown synchronously, not turned into a rejection: a worker that cannot even
	// accept a message must fall back on the main thread synchronously, so that
	// `bb.generate()` stays as synchronous as it is with `useWorker: false`.
	try {
		worker.postMessage({args, id, op});
	} catch (error) {
		settled = true;
		cleanup!();
		throw error;
	}

	return promise;
}

/**
 * Start the parity self-test for an op, on a sampled payload rather than the real one.
 *
 * The check answers "does this worker implement this op the way the main thread does",
 * which the sample settles just as well as the full dataset - and at a cost that does
 * not grow with it. Re-parsing the real payload here would hand back the very
 * main-thread work the offload was meant to avoid.
 * @param {Worker} worker Worker instance
 * @param {string} verifyKey Cache key as `${key}:${op}`
 * @param {string} op Worker op name
 * @param {function} fn Equivalent main-thread function
 * @param {Array} args Conversion arguments to sample from
 * @param {number} timeout Response timeout in milliseconds
 * @returns {Promise} Whether the worker matched the main thread
 * @private
 */
function startVerify(
	worker: Worker,
	verifyKey: string,
	op: string,
	fn: Function,
	args: unknown[],
	timeout: number
): Promise<boolean> {
	const sample = getVerifySample(args);
	const check = request(worker, op, sample, timeout)
		// a worker that errors or times out on the sample is handled by the real
		// request's own fallback: report it as unverified and let that path run
		.then(result => isSameResult(result, fn(...sample)), () => false)
		.then(matched => {
			matched ? verifiedOps.set(verifyKey, true) : verifiedOps.delete(verifyKey);

			return matched;
		});

	verifiedOps.set(verifyKey, check);

	return check;
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
 * @param {function} fn Equivalent main-thread function, used for fallback and for the
 * sampled parity self-test
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
				// any failure - worker error, {error} reply, timeout, postMessage throw,
				// parity mismatch - gives up on this worker for the session and redoes the
				// work on the main thread
				const fallback = () => {
					releaseWorker(key, true);
					runFn = runSync;
					runSync(...args);
				};

				try {
					const verifyKey = `${key}:${op}`;
					// Started before the real request is posted: the worker processes
					// messages in order, so the sampled result comes back first and the
					// check overlaps the real conversion instead of following it.
					const verified = verifiedOps.get(verifyKey) ??
						startVerify(worker, verifyKey, op, fn, args, timeout);

					request(worker, op, args, timeout).then(result => {
						// already verified: hand the result over without touching the
						// main-thread converter at all
						if (verified === true) {
							callback(result);
						} else {
							verified.then(matched => (matched ? callback(result) : fallback()));
						}
					}, fallback);
				} catch {
					// postMessage refused the payload outright - stay synchronous
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
	verifiedOps.clear();
}
