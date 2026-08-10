/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * boost config options
 */
export default {
	/**
	 * Set boost options
	 * @name boost
	 * @memberof Options
	 * @type {object}
	 * @property {object} boost boost object
	 * @property {boolean} [boost.useCssRule=false] Avoid setting inline styles for each shape elements.
	 * - **NOTE:**
	 *   - Will append &lt;style> to the head tag and will add shpes' CSS rules dynamically.
	 *   - For now, covers colors related properties (fill, stroke, etc.) only.
	 * @property {boolean|string} [boost.useWorker=false] Use Web Worker as possible for processing.
	 * - **Available values:**
	 *   - `false`: never offload.
	 *   - `true`: always offload when a Worker can be created.
	 *   - `"auto"`: offload only when the given data exceeds ~5,000 cells, since smaller
	 *     payloads lose more to structured cloning than they gain.
	 * - **NOTE:**
	 *   - For now, only applies for data conversion at the initial time.
	 *   - As of Web Worker's async nature, handling chart instance synchronously is not recommended.
	 *   - When Worker isn't available, fails or times out, data conversion falls back to main thread.
	 *   - When given data is empty, useWorker will be ignored.
	 * @property {string} [boost.workerUrl=undefined] Use a custom static worker script URL instead of an inline Blob worker.
	 * - **NOTE:**
	 *   - **Requires `boost.useWorker` to be enabled** — this option only selects where the
	 *     worker source comes from, it does not turn offloading on by itself.
	 *   - Useful for strict CSP environments that disallow `blob:` workers. Without it under
	 *     such a policy, worker creation throws and each conversion waits out the 5s timeout
	 *     before falling back, so the chart still renders but the initial draw is delayed.
	 *   - Point it at `dist/billboard.worker.js`, shipped in the package, or any script
	 *     implementing the same protocol: receive `{id, op, args}` and post back
	 *     `{id, result}` or `{id, error}`. No `eval()` is involved.
	 *   - With a bundler, make sure the file is emitted as a **real asset**, not inlined:
	 *     it is ~1.5KB, and inlining turns it into a `data:` URI, which a strict CSP
	 *     blocks exactly like `blob:`. Copying it into the static/public directory is the
	 *     option that works everywhere.
	 *   - Any failure (load error, unknown op, timeout, result mismatch) falls back to the main thread.
	 * @example
	 * // offload data conversion on a Worker, using the inline Blob worker
	 *  boost: {
	 *      useCssRule: true,
	 *      useWorker: true
	 *  }
	 * @example
	 * // offload only past ~5,000 cells
	 *  boost: {
	 *      useWorker: "auto"
	 *  }
	 * @example
	 * // strict CSP: serve the shipped script and point at it.
	 * // 'useWorker' still has to be on - 'workerUrl' alone offloads nothing.
	 *  boost: {
	 *      useWorker: true,
	 *      workerUrl: "$YOUR_PATH/dist/billboard.worker.js"
	 *  }
	 * @example
	 * // ESM: the file is reachable as a package subpath.
	 * // Vite - '?url' resolves it, but assets under 4KB are inlined as a 'data:' URI,
	 * // which a strict CSP rejects. Opt that one file out of inlining:
	 * //
	 * //   // vite.config.js
	 * //   export default {
	 * //     build: {
	 * //       assetsInlineLimit: path => /billboard\.worker\.js$/.test(path) ? false : undefined
	 * //     }
	 * //   };
	 * import bb, {bar} from "billboard.js";
	 * import workerUrl from "billboard.js/dist/billboard.worker.js?url";
	 *
	 * bb.generate({
	 *     boost: {useWorker: true, workerUrl},
	 *     data: {columns: [["data1", 30, 200, 100]], type: bar()}
	 * });
	 * @example
	 * // ESM, bundler-agnostic: copy the file into the served static directory
	 * //   cp node_modules/billboard.js/dist/billboard.worker.js public/
	 * bb.generate({
	 *     boost: {useWorker: true, workerUrl: "/billboard.worker.js"},
	 *     data: {columns: [["data1", 30, 200, 100]]}
	 * });
	 */
	boost_useCssRule: false,
	boost_useWorker: false,
	boost_workerUrl: undefined
};
