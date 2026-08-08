/**
 * Bundle src/module/worker.entry.ts into a self-contained worker source string.
 *
 * The result is injected as the `__WORKER_SRC__` constant by every build
 * pipeline (webpack, rolldown, vitest), so the worker never depends on
 * `Function.prototype.toString` of transformed application code.
 *
 * Bundled with rolldown, which the ESM build already uses. Don't reach for another
 * bundler here: it would become a declared devDependency for this single call, while
 * every bundler already in the tree is reached indirectly, through a loader or plugin.
 */
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {build} from "rolldown";

let cached = null;

/**
 * Get the bundled worker source, building it at most once per process.
 * @returns {Promise<string>} Minified IIFE worker source
 */
export function getWorkerSource() {
	// the promise is the cache: concurrent callers share one build
	cached ??= build({
		input: resolve(dirname(fileURLToPath(import.meta.url)), "../src/module/worker.entry.ts"),
		write: false,
		output: {
			format: "iife",
			minify: true,
			// worker.entry.ts exports `ops`/`handleMessage` for the specs to import.
			// An IIFE has to put them somewhere, and naming that binding is what
			// silences rolldown's MISSING_NAME_OPTION_FOR_IIFE_EXPORT warning. The
			// worker never reads it - it self-registers through `self.onmessage`.
			name: "bbWorker"
		}
	}).then(({output}) => output[0].code);

	return cached;
}
