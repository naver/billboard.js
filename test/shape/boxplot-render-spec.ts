/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$BOXPLOT} from "../../src/ChartInternal/shape/core/boxplot";

const nums = (s: string) => (s.match(/-?\d+\.?\d*(?:e-?\d+)?/g) || []).map(Number);

type Box = {id: string, index: number, x0: number, x1: number, y0: number, y1: number, d: string};

// the geometry of every drawn box, in the coordinates of the page (rotation is already applied)
function boxes(chart): Box[] {
	const out: Box[] = [];

	chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplot}`).each(function(d: any) {
		const g = (this as SVGGElement);
		const path = g.querySelector(`.${$BOXPLOT.boxplotBox}`)!.getAttribute("d") || "";
		const n = nums(path);
		const xs = n.filter((_, i) => i % 2 === 0);
		const ys = n.filter((_, i) => i % 2 === 1);

		out.push({
			id: d.id,
			index: d.index,
			x0: Math.min(...xs),
			x1: Math.max(...xs),
			y0: Math.min(...ys),
			y1: Math.max(...ys),
			d: path
		});
	});

	return out;
}

const base = (columns, extra: any = {}) => ({
	data: {columns, type: "boxplot", ...extra.data},
	axis: {x: {type: "category"}, ...extra.axis},
	...Object.fromEntries(Object.entries(extra).filter(([k]) => !["data", "axis"].includes(k)))
});

const two = [
	["Seoul", [-9, -4, 1, 5, 12], [-6, -1, 4, 8, 14], [-1, 3, 8, 13, 19]],
	["Busan", [-4, 0, 4, 8, 13], [-2, 2, 6, 9, 14], [2, 6, 10, 14, 18]]
];
const three = [...two, ["Jeju", [0, 3, 6, 10, 15], [1, 4, 8, 11, 16], [3, 7, 11, 15, 20]]];

const timeseries = (columns: any[]) => ({
	data: {
		x: "x",
		columns: [["x", "2026-01-01", "2026-02-01", "2026-03-01"], ...columns],
		type: "boxplot"
	},
	axis: {x: {type: "timeseries"}}
});

// [name, options]
const cases: [string, any][] = [
	["default, 2 series", base(two)],
	["default, 3 series", base(three)],
	["1 series", base([two[0]])],
	["width: number", base(two, {boxplot: {width: 20}})],
	["width: ratio", base(two, {boxplot: {width: {ratio: 0.3}}})],
	["width: ratio and max", base(two, {boxplot: {width: {ratio: 0.9, max: 30}}})],
	["width: all series", base(two, {
		boxplot: {width: {Seoul: {ratio: 0.4, max: 30}, Busan: {ratio: 0.2, max: 20}}}
	})],
	["width: some series only", base(two, {
		boxplot: {width: {Busan: {ratio: 0.2, max: 20}}}
	})],
	["rotated", base(two, {axis: {rotated: true}})],
	["rotated, width: number", base(two, {axis: {rotated: true}, boxplot: {width: 14}})],
	["rotated, 3 series", base(three, {axis: {rotated: true}})],
	["timeseries", timeseries(two)],
	["timeseries, width: all series", {
		...timeseries(two),
		boxplot: {width: {Seoul: {ratio: 0.4, max: 36}, Busan: {ratio: 0.4, max: 20}}}
	}],
	["indexed x axis", {data: {columns: two, type: "boxplot"}}],
	["y axis min and max", base(two, {axis: {y: {min: -20, max: 30}}})],
	["y2 axis", base(two, {data: {axes: {Busan: "y2"}}, axis: {y2: {show: true}}})],
	["negative only", base([["n", [-50, -40, -30, -20, -10], [-45, -35, -25, -15, -5]]])],
	["data labels on", base(two, {data: {labels: true}})],
	["grouped tooltip off", base(two, {tooltip: {grouped: false}})],
	["legend on the right", base(two, {legend: {position: "right"}})],
	["size", base(two, {size: {width: 300, height: 200}})],
	["padding", base(two, {padding: {left: 80, right: 80}})],
	["zoom", base(two, {zoom: {enabled: true}})],
	["a short list, null and an object", base([
		["a", [1, 2, 3, 4, 5], [1, 2, 3], null, {min: 1}, [1, 2, 3, 4, 5], [5, 4, 3, 2, 1]]
	])]
];

describe("SHAPE BOXPLOT: rendering with options", () => {
	let chart;

	afterEach(() => {
		chart?.destroy();
	});

	cases.forEach(([name, options]) => {
		it(`draws valid boxes: ${name}`, () => {
			chart = util.generate(options);

			const {state} = chart.internal;
			const list = boxes(chart);

			expect(list.length).to.be.above(0);

			list.forEach(b => {
				expect(b.d, `${b.id}-${b.index}`).to.not.match(/NaN|Infinity|undefined/);
				// a box has a size
				expect(b.x1 - b.x0, `width of ${b.id}-${b.index}`).to.be.above(0);
				expect(b.y1 - b.y0, `height of ${b.id}-${b.index}`).to.be.above(0);
				// inside of the plot area
				expect(b.x0, `x0 of ${b.id}-${b.index}`).to.be.at.least(-1);
				expect(b.x1, `x1 of ${b.id}-${b.index}`).to.be.at.most(state.width + 1);
			});

			// the parts of every box keep their order: the whisker covers the box, the median is in it
			chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplot}`).each(function(d: any) {
				const part = cls => nums(this.querySelector(`.${cls}`).getAttribute("d"));
				const rotated = chart.internal.config.axis_rotated;
				const along = (n: number[]) => n.filter((_, i) => i % 2 === +!rotated);
				const box = along(part($BOXPLOT.boxplotBox));
				const median = along(part($BOXPLOT.boxplotMedian))[0];
				const whisker = along(part($BOXPLOT.boxplotWhisker));
				const [lo, hi] = [Math.min(...box), Math.max(...box)];

				expect(median, `median of ${d.id}-${d.index}`).to.be.within(lo - 0.01, hi + 0.01);
				expect(Math.min(...whisker)).to.be.at.most(lo + 0.01);
				expect(Math.max(...whisker)).to.be.at.least(hi - 0.01);
			});
		});

		it(`does not overlap the series of an index: ${name}`, () => {
			chart = util.generate(options);

			const rotated = chart.internal.config.axis_rotated;
			const byIndex = new Map<number, Box[]>();

			boxes(chart).forEach(b => byIndex.set(b.index, [...(byIndex.get(b.index) || []), b]));

			byIndex.forEach((list, index) => {
				const sorted = [...list].sort((a, b) => rotated ? a.y0 - b.y0 : a.x0 - b.x0);

				for (let i = 1; i < sorted.length; i++) {
					const [prev, cur] = [sorted[i - 1], sorted[i]];
					const gap = rotated ? cur.y0 - prev.y1 : cur.x0 - prev.x1;

					expect(gap, `${prev.id} and ${cur.id} at index ${index}`).to.be.at.least(-0.5);
				}
			});
		});
	});

	describe("changes of the data", () => {
		it("lays out the remaining series again when a series is hidden and shown", () => {
			chart = util.generate(base(three, {transition: {duration: 0}}));

			const width = id => {
				const b = boxes(chart).find(v => v.id === id && v.index === 0)!;

				return b.x1 - b.x0;
			};
			const before = width("Seoul");

			chart.hide("Jeju");
			const two = boxes(chart).filter(b => b.id !== "Jeju");

			expect(width("Seoul")).to.be.above(before);
			expect(two.every(b => !/NaN/.test(b.d))).to.be.true;

			chart.show("Jeju");
			expect(width("Seoul")).to.be.closeTo(before, 0.01);
		});

		it("draws the boxes of the data loaded and removes those of the data unloaded", () => {
			chart = util.generate(base(two, {transition: {duration: 0}}));

			chart.load({columns: [["Jeju", [0, 3, 6, 10, 15], [1, 4, 8, 11, 16], [3, 7, 11, 15, 20]]]});
			expect(new Set(boxes(chart).map(b => b.id)).size).to.be.equal(3);

			chart.unload({ids: ["Seoul"]});
			expect(new Set(boxes(chart).map(b => b.id))).to.deep.equal(new Set(["Busan", "Jeju"]));
			boxes(chart).forEach(b => expect(b.d).to.not.match(/NaN/));
		});

		it("follows the new values and the new size", () => {
			chart = util.generate(base(two, {transition: {duration: 0}}));

			const before = boxes(chart).find(b => b.id === "Seoul" && b.index === 0)!;

			chart.load({columns: [["Seoul", [-90, -40, 1, 50, 120], [-6, -1, 4, 8, 14], [-1, 3, 8, 13, 19]]]});
			const after = boxes(chart).find(b => b.id === "Seoul" && b.index === 0)!;

			expect(after.y1 - after.y0).to.not.be.closeTo(before.y1 - before.y0, 0.5);

			chart.resize({width: 300, height: 180});
			boxes(chart).forEach(b => {
				expect(b.d).to.not.match(/NaN/);
				expect(b.x1).to.be.at.most(chart.internal.state.width + 1);
			});
		});

		it("keeps the domain of the y axis over every value, even when a series is hidden", () => {
			chart = util.generate(base(two));

			const [min, max] = chart.internal.scale.y.domain();

			expect(min).to.be.at.most(-9);
			expect(max).to.be.at.least(19);

			chart.hide("Seoul");
			const [min2, max2] = chart.internal.scale.y.domain();

			expect(min2).to.be.at.most(-4);
			expect(max2).to.be.at.least(18);
		});
	});

	describe("mixed types", () => {
		it("draws a boxplot with a line and a bar of the same chart", () => {
			chart = util.generate({
				data: {
					columns: [
						["box", [1, 3, 5, 7, 9], [2, 4, 6, 8, 10]],
						["line", 5, 6],
						["bar", 4, 5]
					],
					types: {box: "boxplot", line: "line", bar: "bar"}
				},
				axis: {x: {type: "category"}}
			});

			expect(boxes(chart).length).to.be.equal(2);
			expect(chart.internal.$el.main.selectAll(".bb-line").size()).to.be.above(0);
			expect(chart.internal.$el.main.selectAll(".bb-bar").size()).to.be.equal(2);
			boxes(chart).forEach(b => expect(b.d).to.not.match(/NaN/));
		});
	});

	describe("samples, outliers, mean and whiskers", () => {
		const samples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100];
		const withSamples = (extra: any = {}, columns: any[] = [["data1", samples, [10, 20, 30, 40, 50]]]) =>
			base(columns, {boxplot: {samples: true, ...extra.boxplot}, ...extra.rest});

		it("calculates the quartiles, the whiskers and the outliers from the samples", () => {
			chart = util.generate(withSamples());

			const $$ = chart.internal;
			const data = $$.getBoxplotData($$.data.targets[0].values[0]);

			expect(data.q1).to.be.closeTo(3.25, 1e-9);
			expect(data.median).to.be.closeTo(5.5, 1e-9);
			expect(data.q3).to.be.closeTo(7.75, 1e-9);
			// the whiskers stop at the samples next to the fence of 1.5 times of the range
			expect(data.min).to.be.equal(1);
			expect(data.max).to.be.equal(9);
			expect(data.outliers).to.deep.equal([100]);
		});

		it("takes the multiple of the range for the whiskers", () => {
			chart = util.generate(withSamples({boxplot: {whisker: {iqr: 100}}}));

			const $$ = chart.internal;
			const data = $$.getBoxplotData($$.data.targets[0].values[0]);

			expect(data.max).to.be.equal(100);
			expect(data.outliers).to.deep.equal([]);
		});

		it("draws a circle for each outlier, and covers them in the domain of y", () => {
			chart = util.generate(withSamples());

			const circles = chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplotOutlier}`);

			expect(circles.size()).to.be.equal(1);
			circles.each(function() {
				// M cx-r,cy a r,r 0 1,0 2r,0 a ...
				const [x, cy, r] = nums((this as Element).getAttribute("d")!);

				expect(x + r).to.be.above(0);
				expect(cy).to.be.within(0, chart.internal.state.height);
				expect(r).to.be.equal(3);
			});
			expect(chart.internal.scale.y.domain()[1]).to.be.at.least(100);
		});

		it("hides the outliers, and leaves them out of the domain", () => {
			chart = util.generate(withSamples({boxplot: {outlier: {show: false}}}));

			expect(chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplotOutlier}`).size()).to.be.equal(0);
			expect(chart.internal.scale.y.domain()[1]).to.be.below(100);
		});

		it("takes the outliers and the mean of the summary", () => {
			chart = util.generate(base(
				[["data1", [1, 3, 5, 7, 9, [14, 15, -4], 5.5], [2, 4, 6, 8, 10]]],
				{boxplot: {mean: {show: true, r: 6}, outlier: {r: 5}}}
			));

			const main = chart.internal.$el.main;
			const [min, max] = chart.internal.scale.y.domain();

			expect(main.selectAll(`.${$BOXPLOT.boxplotOutlier}`).size()).to.be.equal(3);
			expect(main.selectAll(`.${$BOXPLOT.boxplotMean}`).size()).to.be.equal(1);
			expect(nums(main.select(`.${$BOXPLOT.boxplotOutlier}`).attr("d"))[2]).to.be.equal(5);
			expect(min).to.be.at.most(-4);
			expect(max).to.be.at.least(15);

			chart.tooltip.show({index: 0});

			const text = chart.internal.$el.tooltip.text();

			expect(text).to.include("Mean");
			expect(text).to.include("Outliers");
		});

		it("does not draw the mean unless it is shown", () => {
			chart = util.generate(base([["data1", [1, 3, 5, 7, 9, [], 5.5]]]));

			expect(chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplotMean}`).size()).to.be.equal(0);
		});

		it("draws the outliers on the axis of the category when the axis is rotated", () => {
			chart = util.generate(withSamples({rest: {axis: {rotated: true, x: {type: "category"}}}}));

			chart.internal.$el.main.selectAll(`.${$BOXPLOT.boxplotOutlier}`).each(function() {
				const [x, , r] = nums((this as Element).getAttribute("d")!);

				// the value is on the horizontal axis
				expect(x + r).to.be.within(0, chart.internal.state.width);
			});
		});

		[0, 0.5, 1].forEach(width => {
			it(`sets the width of the caps of the whiskers by the box: ${width}`, () => {
				chart = util.generate(base(two, {boxplot: {whisker: {width}}}));

				const main = chart.internal.$el.main;
				const g = main.select(`.${$BOXPLOT.boxplot}-0`);
				const box = nums(g.select(`.${$BOXPLOT.boxplotBox}`).attr("d"));
				const whisker = nums(g.select(`.${$BOXPLOT.boxplotWhisker}`).attr("d"));
				const boxWidth = box[2] - box[0];

				if (width === 0) {
					// the stem only
					expect(whisker.length).to.be.equal(8);
				} else {
					// the cap at the max: M x-c,y L x+c,y
					expect(whisker[10] - whisker[8]).to.be.closeTo(boxWidth * width, 0.01);
				}
			});
		});
	});
});
