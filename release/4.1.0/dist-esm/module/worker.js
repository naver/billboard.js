/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { window as win } from "./browser.js";
//#region src/module/worker.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
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
const cache = {};
const disabledKeys = /* @__PURE__ */ new Set();
/**
* Parity self-test state, keyed as `${key}:${op}`: the in-flight check while it runs,
* `true` once the worker agreed with the main thread.
* @private
*/
const verifiedOps = /* @__PURE__ */ new Map();
const DEFAULT_WORKER_TIMEOUT = 5e3;
/**
* Number of leading entries kept when sampling arguments for the parity self-test.
* @private
*/
const VERIFY_SAMPLE_SIZE = 3;
let messageId = 0;
/**
* Get the build-injected worker source.
* @returns {string} Worker source, or empty string when it wasn't injected
* @private
*/
function getWorkerSrc() {
	try {
		return "var bbWorker=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e){let t=[];return e.forEach(function(e,n){let r=e[0];e.forEach(function(e,i){if(i>0){if(t[i-1]===void 0&&(t[i-1]={}),e===void 0)throw Error(`Source data is missing a component at (${n}, ${i})!`);t[i-1][r]=e}})}),t}function n(e){let t=e[0],n=[];return e.forEach(function(e,r){if(r>0){let i={};e.forEach(function(e,n){if(e===void 0)throw Error(`Source data is missing a component at (${r}, ${n})!`);i[t[n]]=e}),n.push(i)}}),n}function r(e,r){let i=[],a,o;if(Array.isArray(e)){let t=function(e,t){if(e[t]!==void 0)return e[t];let n=t.replace(/\\[(\\w+)\\]/g,`.$1`).replace(/^\\./,``).split(`.`),r=e;return n.some(function(e){return!(r=r&&typeof r==`object`&&e in r?r[e]:void 0)}),r};a=r.x?r.value.concat(r.x):r.value,i.push(a),e.forEach(function(e){let n=a.map(function(n){let r=t(e,n);return r===void 0&&(r=null),r});i.push(n)}),o=n(i)}else Object.keys(e).forEach(function(t){let n=[].concat(e[t]);n.unshift?.(t),i.push(n)}),o=t(i);return o}let i={columns:t,json:r,rows:n},a=self;function o({data:e}){let{args:t,id:n,op:r}=e;try{let e=i[r];if(!e)throw Error(`Unknown worker op: ${r}`);a.postMessage({id:n,result:e(...t)})}catch(e){a.postMessage({id:n,error:e&&(e.message||e.name)||String(e)})}}return typeof window>`u`&&(a.onmessage=o),e.handleMessage=o,e.ops=i,e})({});";
	} catch {
		return "";
	}
}
/**
* Get Web Worker related browser APIs when all required primitives are available.
* @returns {object|null} Worker API handles
* @private
*/
function getWorkerAPI() {
	const { Blob, Worker, URL } = win;
	return Worker && Blob && URL?.createObjectURL && URL?.revokeObjectURL ? {
		Blob,
		Worker,
		URL
	} : null;
}
/**
* Get Worker constructor when available.
* @returns {function|null} Worker constructor
* @private
*/
function getWorkerConstructor() {
	return win.Worker || null;
}
/**
* Normalize worker options while preserving the legacy numeric timeout argument.
* @param {number|object} options Worker timeout or options
* @returns {object} Normalized worker options
* @private
*/
function normalizeWorkerOptions(options) {
	return typeof options === "number" ? {
		timeout: options,
		workerUrl: ""
	} : {
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
function releaseWorker(key, disable = false) {
	const cached = cache[key];
	if (disable) disabledKeys.add(key);
	if (cached) {
		cached.worker?.terminate();
		cached.revoke && getWorkerAPI()?.URL.revokeObjectURL(cached.src);
		delete cache[key];
	}
	for (const verified of verifiedOps.keys()) if (verified.startsWith(`${key}:`)) verifiedOps.delete(verified);
}
/**
* Compare worker and main-thread results for the parity self-test.
* @param {unknown} actual Worker result
* @param {unknown} expected Main-thread result
* @returns {boolean} Whether results match
* @private
*/
function isSameResult(actual, expected) {
	if (actual === expected) return true;
	try {
		return JSON.stringify(actual) === JSON.stringify(expected);
	} catch {
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
function getVerifySample(args) {
	const [data, ...rest] = args;
	if (!Array.isArray(data)) return args;
	return [data.slice(0, VERIFY_SAMPLE_SIZE).map((entry) => Array.isArray(entry) ? entry.slice(0, 4) : entry), ...rest];
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
function request(worker, op, args, timeout) {
	const id = ++messageId;
	let settled = false;
	let cleanup;
	const promise = new Promise((resolve, reject) => {
		const settle = (fn, value) => {
			if (!settled) {
				settled = true;
				cleanup();
				fn(value);
			}
		};
		const handler = function(e) {
			if (e.data?.id === id) e.data.error ? settle(reject, new Error(e.data.error)) : settle(resolve, e.data.result);
		};
		const errorHandler = function() {
			settle(reject, /* @__PURE__ */ new Error("worker error"));
		};
		const timer = setTimeout(() => settle(reject, /* @__PURE__ */ new Error("worker timeout")), timeout);
		cleanup = () => {
			clearTimeout(timer);
			worker.removeEventListener("message", handler);
			worker.removeEventListener("error", errorHandler);
		};
		worker.addEventListener("message", handler);
		worker.addEventListener("error", errorHandler);
	});
	try {
		worker.postMessage({
			args,
			id,
			op
		});
	} catch (error) {
		settled = true;
		cleanup();
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
function startVerify(worker, verifyKey, op, fn, args, timeout) {
	const sample = getVerifySample(args);
	const check = request(worker, op, sample, timeout).then((result) => isSameResult(result, fn(...sample)), () => false).then((matched) => {
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
function getOrCreateWorkerResources(op, workerUrl = "") {
	const hasWorker = !!getWorkerConstructor();
	const api = workerUrl ? null : getWorkerAPI();
	const src = workerUrl ? "" : getWorkerSrc();
	const key = workerUrl || "blob";
	if (!hasWorker || !workerUrl && (!api || !src) || disabledKeys.has(key)) return null;
	if (!(key in cache)) try {
		if (workerUrl) cache[key] = {
			revoke: false,
			src: workerUrl,
			worker: null
		};
		else if (api) {
			const blob = new api.Blob([src], { type: "text/javascript" });
			cache[key] = {
				revoke: true,
				src: api.URL.createObjectURL(blob),
				worker: null
			};
		}
	} catch {
		return null;
	}
	return {
		key,
		src: cache[key].src
	};
}
/**
* Get or create cached WebWorker instance
* @param {string} key Cache key
* @param {string} src URL object as string
* @returns {Worker} WebWorker instance
* @private
*/
function getWorker(key, src) {
	const cached = cache[key];
	const Worker = getWorkerConstructor();
	if (!cached || !Worker || disabledKeys.has(key)) return null;
	if (!cached.worker) try {
		cached.worker = new Worker(src);
	} catch {
		releaseWorker(key, true);
		return null;
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
function runWorker(useWorker = true, op, fn, callback, options) {
	const { timeout, workerUrl } = normalizeWorkerOptions(options);
	const runSync = function(...args) {
		callback(fn(...args));
	};
	let runFn = runSync;
	if (useWorker) {
		const workerResources = getOrCreateWorkerResources(op, workerUrl);
		const worker = workerResources ? getWorker(workerResources.key, workerResources.src) : null;
		if (worker && workerResources) {
			const { key } = workerResources;
			runFn = function(...args) {
				const fallback = () => {
					releaseWorker(key, true);
					runFn = runSync;
					runSync(...args);
				};
				try {
					const verifyKey = `${key}:${op}`;
					const verified = verifiedOps.get(verifyKey) ?? startVerify(worker, verifyKey, op, fn, args, timeout);
					request(worker, op, args, timeout).then((result) => {
						if (verified === true) callback(result);
						else verified.then((matched) => matched ? callback(result) : fallback());
					}, fallback);
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
function cleanupWorkers() {
	const api = getWorkerAPI();
	for (const key in cache) {
		const cached = cache[key];
		if (cached.worker) cached.worker.terminate();
		if (cached.src) cached.revoke && api?.URL.revokeObjectURL(cached.src);
		delete cache[key];
	}
	disabledKeys.clear();
	verifiedOps.clear();
}
//#endregion
export { cleanupWorkers, getWorker, runWorker };
