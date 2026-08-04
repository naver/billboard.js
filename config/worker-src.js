/**
 * Bundle src/module/worker.entry.ts into a self-contained worker source string.
 *
 * The result is injected as the `__WORKER_SRC__` constant by every build
 * pipeline (webpack, rolldown, vitest), so the worker never depends on
 * `Function.prototype.toString` of transformed application code.
 */
import {buildSync} from "esbuild";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

let cached = null;

export function getWorkerSource() {
	if (cached === null) {
		const {outputFiles} = buildSync({
			entryPoints: [
				resolve(dirname(fileURLToPath(import.meta.url)), "../src/module/worker.entry.ts")
			],
			bundle: true,
			minify: true,
			format: "iife",
			target: "es2015",
			legalComments: "none",
			write: false
		});

		cached = outputFiles[0].text;
	}

	return cached;
}
