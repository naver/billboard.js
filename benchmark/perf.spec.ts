/**
 * Performance benchmark for billboard.js
 *
 * Usage:
 *   pnpm run build && pnpm exec playwright test --config benchmark/playwright.config.ts
 *   BILLBOARD_CANVAS_EXTREME=1 pnpm run build && pnpm exec playwright test --config benchmark/playwright.config.ts
 *
 * Comparing branches:
 *   1. On master:  pnpm run build && pnpm exec playwright test --config benchmark/playwright.config.ts
 *   2. cp benchmark/results.json benchmark/baseline.json
 *   3. On branch:  pnpm run build && pnpm exec playwright test --config benchmark/playwright.config.ts
 *   → comparison table is printed automatically if baseline.json exists
 */
import * as fs from "fs";
import * as path from "path";
import {fileURLToPath} from "url";

import {test} from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PATH = path.resolve(__dirname, "../dist/billboard.pkgd.min.js");
const RESULTS_PATH = path.resolve(__dirname, "results.json");
const BASELINE_PATH = path.resolve(__dirname, "baseline.json");

const WARMUP = 2;
const ITERATIONS = 5;
const CANVAS_EXTREME = process.env.BILLBOARD_CANVAS_EXTREME === "1";

interface FlowParams {
	appendSize: number;
	duration?: number;
}

interface ScenarioParams {
	label: string;
	mode: "svg" | "canvas";
	type: string;
	series: number;
	size: number;
	groups?: string[][];
	showXTicks?: boolean;
	tickCulling?: boolean;
	tickTextShow?: boolean;
	flow?: FlowParams;
}

interface BenchmarkResult {
	generateTimes: number[];
	loadTimes: number[];
	flowTimes?: number[];
}

const SCENARIOS: ScenarioParams[] = [
	{label: "5x1000 bar", mode: "svg", type: "bar", series: 5, size: 1000},
	{
		label: "5x1000 stacked bar",
		mode: "svg",
		type: "bar",
		series: 5,
		size: 1000,
		groups: [["data0", "data1", "data2", "data3", "data4"]]
	},
	{label: "5x1000 line", mode: "svg", type: "line", series: 5, size: 1000},
	{label: "5x1000 area", mode: "svg", type: "area", series: 5, size: 1000},
	...["bar", "line", "area"].flatMap(type =>
		[1000, 5000, 10000].flatMap(size =>
			(size === 1000 ? [
				{label: `Canvas 5x${size} ${type}`, mode: "canvas", type, series: 5, size}
			] : [
				{label: `SVG 5x${size} ${type}`, mode: "svg", type, series: 5, size},
				{label: `Canvas 5x${size} ${type}`, mode: "canvas", type, series: 5, size}
			]) as ScenarioParams[]
		)
	),
	...(CANVAS_EXTREME ? [
		{
			label: "Canvas 1x1000000 scatter",
			mode: "canvas",
			type: "scatter",
			series: 1,
			size: 1_000_000
		},
		{
			label: "Canvas 1x100000 area",
			mode: "canvas",
			type: "area",
			series: 1,
			size: 100_000
		},
		{
			label: "Canvas 20000 treemap tiles",
			mode: "canvas",
			type: "treemap",
			series: 1,
			size: 20_000
		},
		{
			label: "Canvas 1x100000 dense x ticks",
			mode: "canvas",
			type: "line",
			series: 1,
			size: 100_000,
			showXTicks: true,
			tickCulling: false,
			tickTextShow: false
		},
		{
			label: "Canvas 1x100000 line flow",
			mode: "canvas",
			type: "line",
			series: 1,
			size: 100_000,
			flow: {
				appendSize: 1,
				duration: 30
			}
		}
	] as ScenarioParams[] : [])
];

function avg(arr: number[]): number {
	return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stddev(arr: number[]): number {
	const mean = avg(arr);
	return Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length);
}

function fmt(val: number, sd: number): string {
	return `${val.toFixed(1)} ± ${sd.toFixed(1)}`;
}

function pad(s: string, n: number): string {
	return s.padEnd(n);
}

function delta(current: number, baseline: number): string {
	const diff = current - baseline;
	const pct = (diff / baseline) * 100;
	const sign = diff <= 0 ? "" : "+";
	const marker = pct <= -5 ? " ✓" : pct >= 5 ? " ✗" : "";

	return `${sign}${pct.toFixed(1)}%${marker}`;
}

function getMetricCell(
	current: {avg: number, stddev: number},
	baseline?: {avg: number}
): string {
	const value = fmt(current.avg, current.stddev);

	return baseline ? `${value} (${delta(current.avg, baseline.avg)})` : value;
}

function getOptionalMetricCell(values?: number[], baseline?: {avg: number}): string {
	return values?.length ?
		getMetricCell({avg: avg(values), stddev: stddev(values)}, baseline) :
		"-";
}

test("performance benchmark", async ({page}) => {
	if (!fs.existsSync(DIST_PATH)) {
		throw new Error(`Build not found: ${DIST_PATH}\nRun 'pnpm run build' first.`);
	}

	await page.setContent(
		`<!DOCTYPE html><html><body>
      <div id="chart" style="width:800px;height:400px"></div>
    </body></html>`
	);
	await page.addScriptTag({path: DIST_PATH});

	const allResults: Record<string, BenchmarkResult> = {};

	for (const scenario of SCENARIOS) {
		const {
			label,
			mode,
			type,
			series,
			size,
			groups,
			showXTicks,
			tickCulling,
			tickTextShow,
			flow
		} = scenario;

		const results = await page.evaluate(
			async params => {
				function getData(s: number, n: number, type: string): any[][] {
					const columns: any[][] = [];

					if (type === "treemap") {
						for (let i = 0; i < n; i++) {
							columns.push([`data${i}`, Math.floor(Math.random() * 900) + 100]);
						}

						return columns;
					}

					for (let i = 0; i < s; i++) {
						const col: any[] = [`data${i}`];

						for (let j = 0; j < n; j++) {
							col.push(Math.floor(Math.random() * 900) + 100);
						}
						columns.push(col);
					}
					return columns;
				}

				function getFlowData(s: number, n: number): any[][] {
					const columns: any[][] = [];

					for (let i = 0; i < s; i++) {
						const col: any[] = [`data${i}`];

						for (let j = 0; j < n; j++) {
							col.push(Math.floor(Math.random() * 900) + 100);
						}

						columns.push(col);
					}

					return columns;
				}

				async function timeGenerate(columns: any[][]): Promise<{time: number; chart: any}> {
					return new Promise(resolve => {
						let resolved = false;
						let chartRef: any;
						const t = performance.now();
						chartRef = (window as any).bb.generate({
							...(params.mode === "canvas" ? {render: {mode: "canvas"}} : {}),
							data: {
								columns,
								type: params.type,
								...(params.groups ? {groups: params.groups} : {})
							},
							transition: {duration: 0},
							point: {focus: {only: true}},
							legend: {show: false},
							axis: {
								x: {
									tick: {
										show: !!params.showXTicks,
										...(params.tickCulling !== null ? {culling: params.tickCulling} : {}),
										...(params.tickTextShow !== null ? {
											text: {show: params.tickTextShow}
										} : {})
									}
								}
							},
							bindto: "#chart",
							onrendered: () => {
								if (!resolved) {
									resolved = true;
									const elapsed = performance.now() - t;
									// onrendered may fire synchronously before chartRef is assigned,
									// defer to next tick so chartRef is populated
									setTimeout(() => resolve({time: elapsed, chart: chartRef}), 0);
								}
							}
						});
					});
				}

				async function timeLoad(chart: any, columns: any[][]): Promise<number> {
					return new Promise(resolve => {
						const t = performance.now();

						chart.load({columns, done: () => resolve(performance.now() - t)});
					});
				}

				async function timeFlow(chart: any, columns: any[][]): Promise<number> {
					return new Promise(resolve => {
						const t = performance.now();

						chart.flow({
							columns,
							...(params.flow?.duration ? {duration: params.flow.duration} : {}),
							done: () => resolve(performance.now() - t)
						});
					});
				}

				// Warmup runs (discarded)
				for (let i = 0; i < params.warmup; i++) {
					const {chart} = await timeGenerate(getData(params.series, params.size, params.type));

					await timeLoad(chart, getData(params.series, params.size, params.type));
					if (params.flow) {
						await timeFlow(chart, getFlowData(params.series, params.flow.appendSize));
					}
					chart.destroy();
				}

				const generateTimes: number[] = [];
				const loadTimes: number[] = [];
				const flowTimes: number[] | undefined = params.flow ? [] : undefined;

				// Measured runs
				for (let i = 0; i < params.iterations; i++) {
					const {time: genTime, chart} = await timeGenerate(
						getData(params.series, params.size, params.type)
					);

					generateTimes.push(genTime);

					const loadTime = await timeLoad(chart, getData(params.series, params.size, params.type));

					loadTimes.push(loadTime);

					if (params.flow) {
						const flowTime = await timeFlow(chart, getFlowData(params.series, params.flow.appendSize));

						flowTimes?.push(flowTime);
					}

					chart.destroy();
				}

				return {generateTimes, loadTimes, flowTimes};
			},
			{
				mode,
				type,
				series,
				size,
				groups: groups ?? null,
				showXTicks: !!showXTicks,
				tickCulling: tickCulling ?? null,
				tickTextShow: tickTextShow ?? null,
				flow: flow ?? null,
				warmup: WARMUP,
				iterations: ITERATIONS
			}
		);

		allResults[label] = results;
	}

	// ── Print results ──────────────────────────────────────────────────────────
	const hasFlow = Object.values(allResults).some(r => r.flowTimes?.length);
	const C1 = 30, C2 = 20, C3 = 20, C4 = 20;
	const line = "─".repeat(C1 + C2 + C3 + (hasFlow ? C4 + 3 : 0) + 7);

	const baseline = fs.existsSync(BASELINE_PATH)
		? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf-8"))
		: null;

	console.log(`\n${"═".repeat(line.length)}`);
	console.log(`  billboard.js performance benchmark  (${ITERATIONS} runs, ${WARMUP} warmup)`);
	console.log(`${"═".repeat(line.length)}`);

	if (baseline) {
		// Comparison mode
		const CH1 = 30, CH2 = 30, CH3 = 30, CH4 = 30;
		const hline = "─".repeat(CH1 + CH2 + CH3 + (hasFlow ? CH4 + 3 : 0) + 7);

		console.log(`${pad("Scenario", CH1)} │ ${pad("Generate (ms)", CH2)} │ ${
			pad("Load (ms)", CH3)
		}${hasFlow ? ` │ Flow (ms)` : ""}`);
		console.log(hline);

		for (const [label, r] of Object.entries(allResults)) {
			const b = baseline.results?.[label];
			const gAvg = avg(r.generateTimes);
			const gSd = stddev(r.generateTimes);
			const lAvg = avg(r.loadTimes);
			const lSd = stddev(r.loadTimes);

			const gCell = getMetricCell({avg: gAvg, stddev: gSd}, b?.generate);
			const lCell = getMetricCell({avg: lAvg, stddev: lSd}, b?.load);
			const fCell = getOptionalMetricCell(r.flowTimes, b?.flow);

			console.log(`${pad(label, CH1)} │ ${pad(gCell, CH2)} │ ${pad(lCell, CH3)}${
				hasFlow ? ` │ ${fCell}` : ""
			}`);
		}
		console.log(hline);
		console.log("  ✓ = ≥5% faster   ✗ = ≥5% slower\n");
	} else {
		// Baseline mode
		console.log(`${pad("Scenario", C1)} │ ${pad("Generate (ms)", C2)} │ ${
			pad("Load (ms)", C3)
		}${hasFlow ? ` │ Flow (ms)` : ""}`);
		console.log(line);

		for (const [label, r] of Object.entries(allResults)) {
			const gAvg = avg(r.generateTimes);
			const gSd = stddev(r.generateTimes);
			const lAvg = avg(r.loadTimes);
			const lSd = stddev(r.loadTimes);
			const fCell = getOptionalMetricCell(r.flowTimes);

			console.log(`${pad(label, C1)} │ ${pad(fmt(gAvg, gSd), C2)} │ ${
				pad(fmt(lAvg, lSd), C3)
			}${hasFlow ? ` │ ${fCell}` : ""}`);
		}
		console.log(line);
		console.log(`\n  To compare: cp benchmark/results.json benchmark/baseline.json`);
	}

	// ── Save results ───────────────────────────────────────────────────────────
	const output = {
		timestamp: new Date().toISOString(),
		warmup: WARMUP,
		iterations: ITERATIONS,
		results: Object.fromEntries(
			Object.entries(allResults).map(([label, r]) => [
				label,
				{
					generate: {avg: avg(r.generateTimes), stddev: stddev(r.generateTimes), raw: r.generateTimes},
					load: {avg: avg(r.loadTimes), stddev: stddev(r.loadTimes), raw: r.loadTimes},
					...(r.flowTimes?.length ? {
						flow: {avg: avg(r.flowTimes), stddev: stddev(r.flowTimes), raw: r.flowTimes}
					} : {})
				}
			])
		)
	};

	fs.writeFileSync(RESULTS_PATH, JSON.stringify(output, null, 2));
	console.log(`Results saved → benchmark/results.json\n`);
});
