/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {columns, json, rows} from "../../src/ChartInternal/data/convert.helper";
import {cleanupWorkers, runWorker} from "../../src/module/worker";
import {ops} from "../../src/module/worker.entry";

/**
 * End-to-end checks against a REAL browser Worker (no mocks).
 *
 * The mocked suites in module-coverage-spec verify the fallback chain; these
 * verify that the pre-bundled worker source actually executes, which is what
 * decides whether `boost.useWorker` can ever be enabled by default.
 *
 * Regression guard: while the worker source was produced by
 * `Function.prototype.toString()`, this suite failed with
 * "cov_xxx is not defined" under coverage instrumentation - the same class of
 * failure reported for React/webpack setups.
 */

/**
 * These tests assert the worker path specifically, so the fallback timer must
 * never win the race: `runWorker`'s 5s default sits below vitest's 10s
 * `testTimeout`, so a worker that starts slowly under parallel browser load
 * silently falls back, delivers the correct main-thread result, and fails here
 * as "expected +0 to equal 1" on the reply count. Raising it past `testTimeout`
 * turns that into an honest test timeout.
 */
const WORKER_OPTIONS = {timeout: 30_000};
describe("WORKER real execution", () => {
	let OriginalWorker;
	let instances: {worker: Worker, errors: string[], replies: any[]}[] = [];

	function trackWorkers() {
		OriginalWorker = window.Worker;
		instances = [];

		window.Worker = class TrackedWorker extends OriginalWorker {
			constructor(...args) {
				super(...args);

				const entry = {
					worker: this as unknown as Worker,
					errors: [] as string[],
					replies: [] as any[]
				};

				// a broken worker source surfaces either as an 'error' event (parse /
				// top-level ReferenceError) or as an {error} reply (throw inside onmessage)
				this.addEventListener("error", (e: ErrorEvent) => entry.errors.push(e.message));
				this.addEventListener("message", (e: MessageEvent) => entry.replies.push(e.data));
				instances.push(entry);
			}
		};
	}

	function expectWorkerHandled(expected) {
		expect(instances.length, "a Worker was constructed").to.be.equal(1);

		const [{errors, replies}] = instances;

		expect(errors, "Worker error events").to.be.deep.equal([]);
		expect(replies.length, "the Worker replied (not a fallback)").to.be.equal(1);
		expect(replies[0].error).to.be.undefined;
		expect(replies[0].result).to.be.deep.equal(expected);
	}

	// the worker cache is module state shared across spec files in the same browser
	// page: a mocked worker left cached elsewhere would be reused here and time out
	beforeEach(() => {
		cleanupWorkers();
	});

	afterEach(() => {
		cleanupWorkers();

		if (OriginalWorker) {
			window.Worker = OriginalWorker;
			OriginalWorker = null;
		}
	});

	it("runs the 'json' op in a real Worker", () => new Promise((resolve, reject) => {
		trackWorkers();

		const data = [
			{name: "a", value: 10},
			{name: "b", value: 20}
		];
		const keys = {value: ["value"], x: "name"};
		const expected = json(data, keys);

		runWorker(true, "json", json, result => {
			try {
				expect(result).to.be.deep.equal(expected);
				expectWorkerHandled(expected);
				resolve(1);
			} catch (e) {
				reject(e);
			}
		}, WORKER_OPTIONS)(data, keys);
	}));

	it("runs the 'rows' op in a real Worker", () => new Promise((resolve, reject) => {
		trackWorkers();

		const data = [["x", "data1"], [1, 30], [2, 200]];
		const expected = rows(data);

		runWorker(true, "rows", rows, result => {
			try {
				expect(result).to.be.deep.equal(expected);
				expectWorkerHandled(expected);
				resolve(1);
			} catch (e) {
				reject(e);
			}
		}, WORKER_OPTIONS)(data);
	}));

	it("runs the 'columns' op in a real Worker", () => new Promise((resolve, reject) => {
		trackWorkers();

		const data = [["data1", 30, 200], ["data2", 130, 100]];
		const expected = columns(data);

		runWorker(true, "columns", columns, result => {
			try {
				expect(result).to.be.deep.equal(expected);
				expectWorkerHandled(expected);
				resolve(1);
			} catch (e) {
				reject(e);
			}
		}, WORKER_OPTIONS)(data);
	}));

	it("registers every op name used by convertData", () => {
		// convert.ts addresses the worker by these names; a rename on either side
		// would otherwise only surface as a silent main-thread fallback
		expect(Object.keys(ops).sort()).to.be.deep.equal(["columns", "json", "rows"]);
	});

	it("falls back to the main thread for an unknown op", () => new Promise((resolve, reject) => {
		trackWorkers();

		const data = [["data1", 30, 200]];

		runWorker(true, "__nope__", columns, result => {
			try {
				// the worker rejects the op, and the main thread produces the result
				expect(result).to.be.deep.equal(columns(data));
				expect(instances.length).to.be.equal(1);
				expect(instances[0].replies[0].error).to.be.equal("Unknown worker op: __nope__");
				resolve(1);
			} catch (e) {
				reject(e);
			}
		}, WORKER_OPTIONS)(data);
	}));
});
