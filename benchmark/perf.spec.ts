/**
 * Performance benchmark for billboard.js
 *
 * Usage:
 *   npm run build && npx playwright test --config benchmark/playwright.config.ts
 *
 * Comparing branches:
 *   1. On master:  npm run build && npx playwright test --config benchmark/playwright.config.ts
 *   2. cp benchmark/results.json benchmark/baseline.json
 *   3. On branch:  npm run build && npx playwright test --config benchmark/playwright.config.ts
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

interface ScenarioParams {
	label: string;
	type: string;
	series: number;
	size: number;
	groups?: string[][];
}

const SCENARIOS: ScenarioParams[] = [
	{label: "5x1000 bar", type: "bar", series: 5, size: 1000},
	{
		label: "5x1000 stacked bar",
		type: "bar",
		series: 5,
		size: 1000,
		groups: [["data0", "data1", "data2", "data3", "data4"]]
	},
	{label: "5x1000 line", type: "line", series: 5, size: 1000},
	{label: "5x1000 area", type: "area", series: 5, size: 1000}
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

test("performance benchmark", async ({page}) => {
	if (!fs.existsSync(DIST_PATH)) {
		throw new Error(`Build not found: ${DIST_PATH}\nRun 'npm run build' first.`);
	}

	await page.setContent(
		`<!DOCTYPE html><html><body>
      <div id="chart" style="width:800px;height:400px"></div>
    </body></html>`
	);
	await page.addScriptTag({path: DIST_PATH});

	const allResults: Record<string, {generateTimes: number[]; loadTimes: number[]}> = {};

	for (const scenario of SCENARIOS) {
		const {label, type, series, size, groups} = scenario;

		const results = await page.evaluate(
			async params => {
				function getData(s: number, n: number): any[][] {
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
							data: {
								columns,
								type: params.type,
								...(params.groups ? {groups: params.groups} : {})
							},
							transition: {duration: 0},
							point: {focus: {only: true}},
							legend: {show: false},
							axis: {x: {tick: {show: false}}},
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

				// Warmup runs (discarded)
				for (let i = 0; i < params.warmup; i++) {
					const {chart} = await timeGenerate(getData(params.series, params.size));

					await timeLoad(chart, getData(params.series, params.size));
					chart.destroy();
				}

				const generateTimes: number[] = [];
				const loadTimes: number[] = [];

				// Measured runs
				for (let i = 0; i < params.iterations; i++) {
					const {time: genTime, chart} = await timeGenerate(getData(params.series, params.size));

					generateTimes.push(genTime);

					const loadTime = await timeLoad(chart, getData(params.series, params.size));

					loadTimes.push(loadTime);
					chart.destroy();
				}

				return {generateTimes, loadTimes};
			},
			{type, series, size, groups: groups ?? null, warmup: WARMUP, iterations: ITERATIONS}
		);

		allResults[label] = results;
	}

	// ── Print results ──────────────────────────────────────────────────────────
	const C1 = 22, C2 = 20, C3 = 20;
	const line = "─".repeat(C1 + C2 + C3 + 7);

	const baseline = fs.existsSync(BASELINE_PATH)
		? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf-8"))
		: null;

	console.log(`\n${"═".repeat(line.length)}`);
	console.log(`  billboard.js performance benchmark  (${ITERATIONS} runs, ${WARMUP} warmup)`);
	console.log(`${"═".repeat(line.length)}`);

	if (baseline) {
		// Comparison mode
		const CH1 = 22, CH2 = 30, CH3 = 30;
		const hline = "─".repeat(CH1 + CH2 + CH3 + 7);

		console.log(`${pad("Scenario", CH1)} │ ${pad("Generate (ms)", CH2)} │ Load (ms)`);
		console.log(hline);

		for (const [label, r] of Object.entries(allResults)) {
			const b = baseline.results?.[label];
			const gAvg = avg(r.generateTimes);
			const gSd = stddev(r.generateTimes);
			const lAvg = avg(r.loadTimes);
			const lSd = stddev(r.loadTimes);

			if (b) {
				const gCell = `${fmt(gAvg, gSd)} (${delta(gAvg, b.generate.avg)})`;
				const lCell = `${fmt(lAvg, lSd)} (${delta(lAvg, b.load.avg)})`;

				console.log(`${pad(label, CH1)} │ ${pad(gCell, CH2)} │ ${lCell}`);
			} else {
				console.log(`${pad(label, CH1)} │ ${pad(fmt(gAvg, gSd), CH2)} │ ${fmt(lAvg, lSd)}`);
			}
		}
		console.log(hline);
		console.log("  ✓ = ≥5% faster   ✗ = ≥5% slower\n");
	} else {
		// Baseline mode
		console.log(`${pad("Scenario", C1)} │ ${pad("Generate (ms)", C2)} │ Load (ms)`);
		console.log(line);

		for (const [label, r] of Object.entries(allResults)) {
			const gAvg = avg(r.generateTimes);
			const gSd = stddev(r.generateTimes);
			const lAvg = avg(r.loadTimes);
			const lSd = stddev(r.loadTimes);

			console.log(`${pad(label, C1)} │ ${pad(fmt(gAvg, gSd), C2)} │ ${fmt(lAvg, lSd)}`);
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
					load: {avg: avg(r.loadTimes), stddev: stddev(r.loadTimes), raw: r.loadTimes}
				}
			])
		)
	};

	fs.writeFileSync(RESULTS_PATH, JSON.stringify(output, null, 2));
	console.log(`Results saved → benchmark/results.json\n`);
});
