/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";
import CLASS from "../src/config/classes";

describe("INTERACTION", () => {
	let chart;
	let args;
	let clicked = false;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("generate event rects", () => {
		describe("custom x #1", () => {
			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 0, 1000, 3000, 10000],
							["data", 10, 10, 10, 10]
						],
						type: "bar"
					}
				};
			});

			it("should have 4 event rects properly", () => {
				const lefts = [69, 130, 198, 403];
				const widths = [61, 68, 205, 197.5];

				chart.internal.main.selectAll(".bb-event-rect").each(function (d, i) {
					const box = d3.select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(lefts[i], 10);
					expect(box.width).to.be.closeTo(widths[i], 10);
				});
			});
		});

		describe("custom x #2", () => {
			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 0],
							["data", 10]
						],
						type: "bar"
					}
				};
			});

			it("should have 1 event rects properly", () => {
				const eventRects = chart.internal.main.selectAll(".bb-event-rect");

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function() {
					const box = d3.select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});
		});

		describe("timeseries #1", () => {
			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "20140101", "20140201", "20140210", "20140301"],
							["data", 10, 10, 10, 10]
						]
					}
				};
			});

			it("should have 4 event rects properly", () => {
				const lefts = [33.5, 185.5, 348, 497.5];
				const widths = [152, 162.5, 149.5, 138.5];

				chart.internal.main.selectAll(".bb-event-rect").each(function (d, i) {
					const box = d3.select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(lefts[i], 10);
					expect(box.width).to.be.closeTo(widths[i], 10);
				});
			});
		});

		describe("timeseries #2", () => {
			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "20140101"],
							["data", 10]
						],
						onclick: () => {
							clicked = true;
						}
					}
				};
			});

			it("should have 1 event rects properly", () => {
				const eventRects = chart.internal.main.selectAll(".bb-event-rect");

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function() {
					const box = d3.select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});

			it("check for data click", () => {
				const main = chart.internal.main;
				const rect = main.select(".bb-event-rect.bb-event-rect-0").node();
				const circle = main.select(".bb-circles-data circle").node().getBBox();

				util.setMouseEvent(chart, "click", circle.x, circle.y, rect);

				expect(clicked).to.be.true;
			});
		});

		describe("check for event binding", () => {
			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 0, 1000, 3000, 10000],
							["data", 10, 10, 10, 10]
						]
					},
					interaction: {
						inputType: {
							touch: {
								preventDefault: false
							}
						}
					}
				};
			});

			it("check for mouse event bidings", () => {
				const internal = chart.internal;
				const svg = internal.svg;

				expect(svg.on("mouseenter")).to.not.be.null;
				expect(svg.on("mouseleave")).to.not.be.null;

				internal.main.selectAll(".bb-event-rect").each(function() {
					const el = d3.select(this);

					expect(el.on("mouseenter")).to.not.be.null;
					expect(el.on("mouseleave")).to.not.be.null;
					expect(el.on("mousemove")).to.not.be.null;
					expect(el.on("mouseover")).to.not.be.null;
					expect(el.on("mouseout")).to.not.be.null;
				});
			});

			it("set inputType.mouse=false", () => {
				args.interaction.inputType.mouse = false;
			});

			it("mouse events shouldn't be attached", () => {
				const internal = chart.internal;
				const svg = internal.svg;

				expect(svg.on("mouseenter")).to.be.undefined;
				expect(svg.on("mouseleave")).to.be.undefined;

				internal.main.selectAll(".bb-event-rect").each(function() {
					const el = d3.select(this);

					expect(el.on("mouseenter")).to.be.undefined;
					expect(el.on("mouseleave")).to.be.undefined;
					expect(el.on("mousemove")).to.be.undefined;
					expect(el.on("mouseover")).to.be.undefined;
					expect(el.on("mouseout")).to.be.undefined;
				});
			});

			it("check for inputType.preventDefault option", () => {
				const preventDefault = chart.internal.config.interaction_inputType_touch.preventDefault;

				expect(preventDefault).to.be.false;
			});

			it("set interaction.enabled=false", () => {
				args.interaction.enabled = false;
				args.interaction.inputType.mouse = true;
			});

			it("mouse events shouldn't be attached", () => {
				const internal = chart.internal;
				const svg = internal.svg;

				expect(svg.on("mouseenter")).to.be.undefined;
				expect(svg.on("mouseleave")).to.be.undefined;

				internal.main.selectAll(".bb-event-rect").each(function() {
					const el = d3.select(this);

					expect(el.on("mouseenter")).to.be.undefined;
					expect(el.on("mouseleave")).to.be.undefined;
					expect(el.on("mousemove")).to.be.undefined;
					expect(el.on("mouseover")).to.be.undefined;
					expect(el.on("mouseout")).to.be.undefined;
				});
			});
		});

		describe("check for data.selection", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250]
						],
						selection: {
							enabled: true
						}
					}
				};
			});

			it("data point circle should be selected and unselected", () => {
				const circle = d3.select(".bb-shape-2").node();
				const box = circle.getBBox();
				const rect = d3.select(".bb-event-rect-2").node();

				util.setMouseEvent(chart, "click", box.x, box.y, rect);
				expect(d3.select(circle).classed(CLASS.SELECTED)).to.be.true;

				util.setMouseEvent(chart, "click", box.x, box.y, rect);
				expect(d3.select(circle).classed(CLASS.SELECTED)).to.be.false;
			});
		});
	});
});
