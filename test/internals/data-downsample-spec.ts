/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, describe, expect, it} from "vitest";
import util from "../assets/util";

describe("DATA: downsample", () => {
	let chart;
	const N = 10000;
	const wave = (k = 1) => Array.from({length: N}, (_, i) => Math.sin(i / 50 * k) * 100);
	const gen = (data, downsample = 500) => (chart = util.generate({
		data: {columns: [["data1", ...wave()], ["data2", ...wave(2)]], downsample, ...data},
		transition: {duration: 0}
	}));

	afterEach(() => chart?.destroy());

	it("reduces rows but keeps the first and last, and original values", () => {
		gen({});

		const v1 = chart.data("data1")[0].values;
		const v2 = chart.data("data2")[0].values;

		expect(v1.length).toBe(v2.length);
		expect(v1.length).toBe(500);
		expect(v1[0].value).toBe(wave()[0]);
		expect(v1[v1.length - 1].value).toBe(wave()[N - 1]);
		expect(v2[v2.length - 1].value).toBe(wave(2)[N - 1]);
	});

	it("is off by default and when data is not dense enough", () => {
		gen({}, 0);
		expect(chart.data("data1")[0].values.length).toBe(N);

		gen({}, N);
		expect(chart.data("data1")[0].values.length).toBe(N);
	});

	it("is skipped for bar type", () => {
		gen({type: "bar"});
		expect(chart.data("data1")[0].values.length).toBe(N);
	});

	it("keeps null gaps", () => {
		const y = wave();
		y.fill(null, 4000, 6000);
		gen({columns: [["data1", ...y]]});

		const v = chart.data("data1")[0].values;
		const nulls = v.filter(d => d.value === null);

		expect(nulls.length).toBeGreaterThan(0);
		expect(nulls.length).toBeLessThan(10);
		expect(v.some(d => d.value !== null && d.x > 4000 && d.x < 6000)).toBe(false);
	});

	it("keeps series aligned on the same rows, whatever each series looks like", () => {
		gen({columns: [
			["data1", ...wave()],
			["data2", ...wave(7)],
			["data3", ...Array.from({length: N}, (_, i) => (i * 7919) % 101)]
		]});

		const all = chart.data();
		const xs = all.map(d => d.values.map(v => v.x).join());

		expect(all.every(d => d.values.length === 500)).toBe(true);
		expect(new Set(xs).size).toBe(1);
		// every kept row holds the original value of every series
		const orig = [wave(), wave(7), Array.from({length: N}, (_, i) => (i * 7919) % 101)];

		all.forEach((d, k) => d.values.forEach(v => expect(v.value).toBe(orig[k][v.x])));
	});

	it("reduces the drawn nodes", () => {
		gen({});
		const circles = chart.$.main.selectAll("circle").size();
		const ticks = chart.$.main.selectAll(".bb-axis-x .tick").size();

		gen({}, 0);
		expect(circles).toBeLessThan(chart.$.main.selectAll("circle").size());
		expect(ticks).toBeLessThan(chart.$.main.selectAll(".bb-axis-x .tick").size());
	});

	["line", "spline", "step", "area", "area-spline", "area-step", "scatter"].forEach(type => {
		it(`applies to ${type}`, () => {
			gen({type});
			expect(chart.data("data1")[0].values.length).toBe(500);
		});
	});

	it("is skipped when the series are mixed with a bar type", () => {
		gen({types: {data2: "bar"}});
		expect(chart.data("data1")[0].values.length).toBe(N);
	});

	it("is skipped for non-lineish types", () => {
		["area-line-range", "bubble", "candlestick"].forEach(type => {
			gen({type, columns: [["data1", ...Array.from({length: N}, () => [1, 2, 3])]]});
			expect(chart.data("data1")[0].values.length).toBe(N);
		});
	});

	it("is skipped when values aren't plain numbers", () => {
		const y = wave();

		y[5000] = {high: 1, low: 0} as any;
		gen({columns: [["data1", ...y]]});

		expect(chart.data("data1")[0].values.length).toBe(N);
	});

	it("is skipped when series have their own x (data.xs)", () => {
		const x = Array.from({length: N}, (_, i) => i);

		gen({
			columns: [["x1", ...x], ["x2", ...x], ["data1", ...wave()], ["data2", ...wave(2)]],
			xs: {data1: "x1", data2: "x2"}
		});

		expect(chart.data("data1")[0].values.length).toBe(N);
	});

	it("applies when all series share one x, timeseries included", () => {
		const x = Array.from({length: N}, (_, i) => new Date(2026, 0, 1, 0, 0, i));

		gen({
			x: "x",
			columns: [["x", ...x], ["data1", ...wave()], ["data2", ...wave(2)]]
		});

		const v = chart.data("data1")[0].values;

		expect(v.length).toBe(500);
		expect(+new Date(v[0].x)).toBe(+x[0]);
		expect(+new Date(v[v.length - 1].x)).toBe(+x[N - 1]);
	});

	it("applies to load(), but not to the rows appended by it", async () => {
		gen({columns: [["data1", ...wave()]]});

		await new Promise<void>(resolve => chart.load({
			columns: [["data2", ...wave(3)]],
			done: () => resolve()
		}));

		expect(chart.data("data2")[0].values.length).toBe(500);
	});

	it("keeps x increasing on flow() after the rows were reduced", async () => {
		gen({columns: [["data1", ...wave()]]});

		await new Promise<void>(resolve => chart.flow({
			columns: [["data1", 1, 2, 3, 4, 5]],
			duration: 0,
			done: () => resolve()
		}));

		const xs = chart.data("data1")[0].values.map(v => v.x);

		expect(xs.length).toBe(500);
		expect(xs.every((x, i) => !i || x > xs[i - 1])).toBe(true);
		expect(xs[xs.length - 1]).toBe(N + 4);
	});

	it("keeps the original position on an indexed x axis", () => {
		gen({});

		const v = chart.data("data1")[0].values;

		expect(v[0].x).toBe(0);
		expect(v[v.length - 1].x).toBe(N - 1);
		expect(chart.internal.scale.x.domain()[1]).toBeGreaterThan(N - 2);
	});

	it("keeps the labels of category x axis on the original position", () => {
		const categories = Array.from({length: N}, (_, i) => `c${i}`);

		gen({}, 500);
		chart.destroy();
		chart = util.generate({
			data: {columns: [["data1", ...wave()]], downsample: 500},
			axis: {x: {type: "category", categories}},
			transition: {duration: 0}
		});

		const v = chart.data("data1")[0].values;

		expect(v.every(d => chart.categories()[d.x] === `c${d.x}`)).toBe(true);
		expect(v[v.length - 1].x).toBe(N - 1);
	});
});
