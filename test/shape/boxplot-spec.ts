/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import util from "../assets/util";
import bb, {boxplot as canvasBoxplot, canvas} from "../../src/index.canvas";
import {$CANVAS} from "../../src/canvas/classes";
import "../../src/scss/billboard.scss";
import {$BOXPLOT} from "../../src/ChartInternal/shape/core/boxplot";

const num = (s: string) => (s.match(/-?\d+\.?\d*/g) || []).map(Number);

describe("SHAPE BOXPLOT", () => {
	let chart;
	let args: any;

	beforeEach(() => {
		args = {
			data: {
				columns: [
					["data1", [1, 3, 5, 7, 9], [2, 4, 6, 8, 12], {not: "a boxplot"}, null]
				],
				type: "boxplot"
			},
			axis: {x: {type: "category"}}
		};
		chart = util.generate(args);
	});

	it("draws a box, a median and a whisker for each value, and keeps the axes", () => {
		const {internal: {$el, state}} = chart;

		expect(state.hasAxis).to.be.true;
		expect($el.main.selectAll(`.${$BOXPLOT.boxplot}`).size()).to.be.equal(2);

		const g = $el.main.select(`.${$BOXPLOT.boxplot}-0`);
		const box = num(g.select(`.${$BOXPLOT.boxplotBox}`).attr("d"));
		const median = num(g.select(`.${$BOXPLOT.boxplotMedian}`).attr("d"));
		const whisker = num(g.select(`.${$BOXPLOT.boxplotWhisker}`).attr("d"));

		// box: x0, q1 / x1, q1 / x1, q3 / x0, q3 (q3 is above q1)
		expect(box[0]).to.be.below(box[2]);
		expect(box[5]).to.be.below(box[1]);
		// the median is inside of the box and spans the width of it
		expect(median[1]).to.be.within(box[5], box[1]);
		expect(median[0]).to.be.closeTo(box[0], 0.01);
		expect(median[2]).to.be.closeTo(box[2], 0.01);
		// the whisker goes from max to min over the box
		expect(whisker[1]).to.be.below(box[5]);
		expect(whisker[7]).to.be.above(box[1]);
	});

	it("takes the min and max of the values in the domain of y", () => {
		const [min, max] = chart.internal.scale.y.domain();

		expect(min).to.be.at.most(1);
		expect(max).to.be.at.least(12);
	});

	it("swaps the coordinates when the axis is rotated", () => {
		chart = util.generate({...args, axis: {...args.axis, rotated: true}});

		const g = chart.internal.$el.main.select(`.${$BOXPLOT.boxplot}-0`);
		const box = num(g.select(`.${$BOXPLOT.boxplotBox}`).attr("d"));

		// q3 is on the right of q1 when rotated
		expect(box[4]).to.be.above(box[0]);
	});

	it("shows the five values in the tooltip", () => {
		chart.tooltip.show({index: 0});

		const text = chart.internal.$el.tooltip.text();

		["Max", "Q3", "Median", "Q1", "Min"].forEach(v => expect(text).to.include(v));
		expect(text).to.include("9");
	});

	it("is found by the pointer on the box", () => {
		const {internal: $$} = chart;
		const row = $$.data.targets[0].values[0];
		const node = $$.$el.main.select($$.getAxisTypeHooks("data1").hit($$, row)).node();

		expect(node).to.not.be.null;
	});

	it("fills the mean marker with white over the rule of the theme for paths", () => {
		chart = util.generate({
			...args,
			data: {columns: [["data1", [1, 3, 5, 7, 9, [], 5]]], type: "boxplot"},
			boxplot: {mean: {show: true}}
		});

		const mean = chart.internal.$el.main.select(`.${$BOXPLOT.boxplotMean}`).node();

		expect(getComputedStyle(mean).fill).to.be.equal("rgb(255, 255, 255)");
	});

	it("takes the width option", () => {
		chart = util.generate({...args, boxplot: {width: 20}});

		const box = num(
			chart.internal.$el.main.select(`.${$BOXPLOT.boxplotBox}`).attr("d")
		);

		expect(box[2] - box[0]).to.be.closeTo(20, 0.01);
	});

	describe("canvas", () => {
		let container;
		let c;

		const generate = (options = {}) => {
			container = document.createElement("div");
			document.body.appendChild(container);

			return bb.generate({
				bindto: container,
				render: {mode: canvas()},
				size: {width: 320, height: 240},
				data: {
					columns: [["data1", [1, 3, 5, 7, 9], [2, 4, 6, 8, 12]]],
					type: canvasBoxplot()
				},
				...options
			});
		};

		// the center of the box of the first value, in the coordinates of the page
		const boxCenter = chart => {
			const $$ = chart.internal;
			const getPoints = $$.generateGetBoxplotPoints($$.getShapeIndices($$.isBoxplotType), false);
			const [[x0, q1], [x1, q3]] = getPoints($$.data.targets[0].values[0], 0);
			const {margin} = $$.state;
			const rect = chart.$.canvas.node().getBoundingClientRect();
			const [cx, cy] = $$.config.axis_rotated ?
				[(q1 + q3) / 2, (x0 + x1) / 2] :
				[(x0 + x1) / 2, (q1 + q3) / 2];

			return {clientX: rect.left + margin.left + cx, clientY: rect.top + margin.top + cy};
		};

		afterEach(() => {
			c?.destroy();
			container?.remove();
		});

		it("draws the boxes on canvas without a fallback to svg", () => {
			const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
			const fillRect = vi.spyOn(CanvasRenderingContext2D.prototype, "fillRect");
			const strokeRect = vi.spyOn(CanvasRenderingContext2D.prototype, "strokeRect");

			c = generate();

			expect(container.querySelector(`canvas.${$CANVAS.canvas}`)).to.not.be.null;
			expect(container.querySelector("svg")).to.be.null;
			expect(warn.mock.calls.join(" ")).to.not.contain("boxplot");
			// one filled box and one stroked box for each of the two values
			expect(fillRect.mock.calls.filter(([, , w]) => w < 100).length).to.be.at.least(2);
			expect(strokeRect.mock.calls.length).to.be.at.least(2);

			[warn, fillRect, strokeRect].forEach(v => v.mockRestore());
		});

		it("draws the outliers and the mean on canvas", () => {
			const arc = vi.spyOn(CanvasRenderingContext2D.prototype, "arc");
			const fill = vi.spyOn(CanvasRenderingContext2D.prototype, "fill");

			c = generate({
				data: {
					columns: [["data1", [1, 3, 5, 7, 9, [14, 15], 5.5], [2, 4, 6, 8, 12]]],
					type: canvasBoxplot()
				},
				boxplot: {mean: {show: true}}
			});

			// the two outliers, and the mean marker of the first value
			expect(arc.mock.calls.filter(([, , r]) => r === 3).length).to.be.equal(2);
			expect(fill.mock.calls.length).to.be.at.least(1);

			[arc, fill].forEach(v => v.mockRestore());
		});

		[false, true].forEach(rotated => {
			it(`shows the tooltip and calls data.onclick of the hovered box (rotated: ${rotated})`, () => {
				const onclick = vi.fn();

				c = generate({
					axis: {rotated},
					data: {
						columns: [["data1", [1, 3, 5, 7, 9], [2, 4, 6, 8, 12]]],
						type: canvasBoxplot(),
						onclick
					}
				});

				const point = boxCenter(c);

				c.$.canvas.node().dispatchEvent(new MouseEvent("mousemove", {bubbles: true, ...point}));

				const tooltip = container.querySelector(".bb-tooltip-container") as HTMLElement;

				["Max", "Q3", "Median", "Q1", "Min"].forEach(v =>
					expect(tooltip.textContent).to.contain(v)
				);

				c.$.canvas.node().dispatchEvent(new MouseEvent("click", {bubbles: true, ...point}));
				expect(onclick.mock.calls[0][0]).to.deep.include({id: "data1", index: 0});
			});
		});
	});
});
