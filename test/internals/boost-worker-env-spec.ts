/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeEach, describe, expect, it} from "vitest";

import {cleanupWorkers} from "../../src/module/worker";
import util from "../assets/util";

/**
 * Environment matrix for `boost.useWorker`, at chart level.
 *
 * boost-spec covers option plumbing and the sync paths; these cases assert the
 * chart actually renders in each environment the worker can land in:
 * real worker, static worker script (strict CSP), blocked worker, and a runtime
 * with no Worker/Blob/URL at all (the SSR-ish shape of this module's guards).
 *
 * Every case must end with the same rendered result - that equivalence is what
 * makes enabling the worker by default safe.
 */
describe("BOOST worker environments", () => {
	const COLUMNS = [
		["data1", 30, 200, 100, 400, 150, 250],
		["data2", 50, 150, 150, 150, 50, 150]
	];
	const JSON_DATA = [
		{x: 1, value1: 10, value2: 20},
		{x: 2, value1: 15, value2: 25},
		{x: 3, value1: 20, value2: 30}
	];
	let chart;

	/**
	 * Wait until the (possibly worker-driven, async) data conversion landed.
	 */
	function waitForData(instance, expectedIds: string[], timeout = 4000) {
		return new Promise<void>((resolve, reject) => {
			const start = performance.now();
			const poll = () => {
				const ids = instance.data().map(v => v.id);

				if (expectedIds.every(id => ids.includes(id))) {
					resolve();
					return;
				}

				if (performance.now() - start > timeout) {
					reject(new Error(`data not converted in time, got: ${ids.join()}`));
					return;
				}

				setTimeout(poll, 20);
			};

			poll();
		});
	}

	beforeEach(() => {
		cleanupWorkers();
	});

	afterEach(() => {
		cleanupWorkers();
		chart?.destroy();
		chart = null;
	});

	it("renders columns data through a real Worker", async () => {
		chart = util.generate({
			boost: {useWorker: true},
			data: {columns: COLUMNS, type: "line"}
		});

		await waitForData(chart, ["data1", "data2"]);

		expect(chart.data.values("data1")).to.be.deep.equal([30, 200, 100, 400, 150, 250]);
		expect(chart.$.line.lines.size()).to.be.equal(2);
	});

	it("renders json data through a real Worker", async () => {
		chart = util.generate({
			boost: {useWorker: true},
			data: {
				json: JSON_DATA,
				keys: {x: "x", value: ["value1", "value2"]},
				type: "line"
			}
		});

		await waitForData(chart, ["value1", "value2"]);

		expect(chart.data.values("value1")).to.be.deep.equal([10, 15, 20]);
	});

	// exercises dist/billboard.worker.js, the script `boost.workerUrl` is meant to
	// point at when `blob:` workers are refused
	it("renders through a static worker script (strict CSP path)", async ctx => {
		const workerUrl = "/dist/billboard.worker.js";
		const res = await fetch(workerUrl).catch(() => null);

		if (!res?.ok) {
			// dist isn't built in this run; the blob cases above still cover execution
			ctx.skip();
			return;
		}

		chart = util.generate({
			boost: {useWorker: true, workerUrl},
			data: {columns: COLUMNS, type: "line"}
		});

		await waitForData(chart, ["data1", "data2"]);

		expect(chart.data.values("data2")).to.be.deep.equal([50, 150, 150, 150, 50, 150]);
	});

	it("renders when Worker construction is blocked (CSP worker-src 'none')", async () => {
		const OriginalWorker = window.Worker;

		window.Worker = class {
			constructor() {
				throw new Error("Blocked by Content Security Policy");
			}
		} as unknown as typeof Worker;

		try {
			chart = util.generate({
				boost: {useWorker: true},
				data: {columns: COLUMNS, type: "line"}
			});

			await waitForData(chart, ["data1", "data2"]);

			expect(chart.data.values("data1")).to.be.deep.equal([30, 200, 100, 400, 150, 250]);
		} finally {
			window.Worker = OriginalWorker;
		}
	});

	it("renders when blob URLs are blocked (CSP script-src)", async () => {
		const originalCreateObjectURL = window.URL.createObjectURL;

		window.URL.createObjectURL = () => {
			throw new Error("Blocked by Content Security Policy");
		};

		try {
			chart = util.generate({
				boost: {useWorker: true},
				data: {columns: COLUMNS, type: "line"}
			});

			await waitForData(chart, ["data1", "data2"]);

			expect(chart.$.line.lines.size()).to.be.equal(2);
		} finally {
			window.URL.createObjectURL = originalCreateObjectURL;
		}
	});

	describe("useWorker: 'auto'", () => {
		function trackWorkerUse() {
			const OriginalWorker = window.Worker;
			const created: string[] = [];

			window.Worker = class extends OriginalWorker {
				constructor(...args) {
					super(...args);
					created.push(String(args[0]));
				}
			};

			return {created, restore: () => (window.Worker = OriginalWorker)};
		}

		it("stays on the main thread for small data", async () => {
			const {created, restore} = trackWorkerUse();

			try {
				chart = util.generate({
					boost: {useWorker: "auto"},
					data: {columns: COLUMNS, type: "line"}
				});

				// small payload: converted synchronously, no worker created
				expect(chart.data.values("data1")).to.be.deep.equal([30, 200, 100, 400, 150, 250]);
				expect(created).to.be.deep.equal([]);
			} finally {
				restore();
			}
		});

		it("offloads data past the threshold", async () => {
			const {created, restore} = trackWorkerUse();

			try {
				const big = [
					["data1", ...Array.from({length: 4000}, (_, i) => i)],
					["data2", ...Array.from({length: 4000}, (_, i) => i * 2)]
				];

				chart = util.generate({
					boost: {useWorker: "auto"},
					data: {columns: big, type: "line"}
				});

				await waitForData(chart, ["data1", "data2"]);

				expect(created.length).to.be.equal(1);
				expect(chart.data.values("data1").length).to.be.equal(4000);
			} finally {
				restore();
			}
		});
	});

	it("renders when Worker/Blob APIs are absent", async () => {
		const {Worker: OriginalWorker, Blob: OriginalBlob} = window;

		// @ts-ignore - emulate a runtime without the worker primitives
		delete window.Worker;
		// @ts-ignore
		delete window.Blob;

		try {
			chart = util.generate({
				boost: {useWorker: true},
				data: {
					json: JSON_DATA,
					keys: {x: "x", value: ["value1", "value2"]},
					type: "line"
				}
			});

			await waitForData(chart, ["value1", "value2"]);

			expect(chart.data.values("value2")).to.be.deep.equal([20, 25, 30]);
		} finally {
			window.Worker = OriginalWorker;
			window.Blob = OriginalBlob;
		}
	});
});
