/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {columns, json, rows} from "../ChartInternal/data/convert.helper";

/**
 * Worker entry point.
 *
 * This module is bundled separately at build time and injected into
 * `src/module/worker.ts` as the `__WORKER_SRC__` string constant. It is never
 * part of the main bundle graph.
 *
 * Offloaded work is addressed by op name, so no function source is ever
 * stringified or evaluated. That keeps the worker immune to whatever transform
 * the host toolchain applies to billboard.js sources - coverage instrumentation,
 * babel helpers or bundler-hoisted module scope references cannot leak in.
 */
export const ops = {
	columns,
	json,
	rows
};

type TWorkerRequest = {args: unknown[], id: number, op: keyof typeof ops};

const ctx = self as unknown as {
	onmessage: ((e: {data: TWorkerRequest}) => void) | null,
	postMessage: (message: unknown) => void
};

/**
 * Run the requested op and post the result back, keyed by the request id.
 * @param {object} e Message event carrying the op name and arguments
 * @param {object} e.data Request payload: `{args, id, op}`
 * @private
 */
export function handleMessage({data}: {data: TWorkerRequest}): void {
	const {args, id, op} = data;

	try {
		const fn = ops[op];

		if (!fn) {
			throw new Error(`Unknown worker op: ${op}`);
		}

		ctx.postMessage({id, result: (fn as Function)(...args)});
	} catch (error) {
		ctx.postMessage({
			id,
			error: error && ((error as Error).message || (error as Error).name) || String(error)
		});
	}
}

// A dedicated worker has no `window`. The guard keeps this module importable from
// specs (see test/module/worker-real-spec.ts) without hijacking window.onmessage.
if (typeof window === "undefined") {
	ctx.onmessage = handleMessage;
}
