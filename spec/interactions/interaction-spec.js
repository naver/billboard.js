/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("INTERACTION", () => {
	let chart;
	let args;

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

			it("inputType should be 'mouse", () => {
				expect(chart.internal.inputType).to.be.equal("mouse");
			});

			it("should have 4 event rects properly", () => {
				const lefts = [69, 130, 198, 403];
				const widths = [61, 68, 205, 197.5];

				chart.$.main.selectAll(`.${CLASS.eventRect}`).each(function (d, i) {
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
				const eventRects = chart.$.main.selectAll(`.${CLASS.eventRect}`);

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function () {
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

				chart.$.main.selectAll(`.${CLASS.eventRect}`).each(function (d, i) {
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
						]
					}
				};
			});

			it("should have 1 event rects properly", () => {
				const eventRects = chart.$.main.selectAll(`.${CLASS.eventRect}`);

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function () {
					const box = d3.select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});

			describe("indexed", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data", 10, 20, 30, 40, 50]
							]
						}
					};
				});

				it("rect elements should be positioned without gaps", () => {
					const rect = [];

					chart.$.main.selectAll(`.${CLASS.eventRect}`).each(function(d, i) {
						const x = +this.getAttribute("x");
						const width = +this.getAttribute("width");

						if (i > 0) {
							expect(rect[i - 1]).to.be.equal(x);
						}

						rect.push(x + width);
					});
				});
			});
		});
	});

	describe("Different interactions", () => {
		describe("check for data.onclick", () => {
			let clicked = false;
			let data;

			before(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "20140101"],
							["data1", 10],
							["data2", 20]
						],
						onclick: d => {
							clicked = true;
							data = d;
						}
					},
					point: {
						type: "circle"
					}
				};
			});

			it("check for data click for line", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}-0`).node();
				const circle = main.select(`.${CLASS.circles}-data1 circle`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option point.type='rectangle'", () => {
				args.point.pattern = ["rectangle"];
				clicked = false;
				data = null;
			});

			it("check for data click for rectangle data point", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}`).node();
				const circle = main.select(`.${CLASS.circles}-data1 rect`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option point.type=polygon(custom triangle)", () => {
				args.point.pattern = 	[
					"<polygon points='5 2.5 2.5 5 7.5 5'></polygon>"
				];

				clicked = false;
				data = null;
			});

			it("check for data click for polygon data point", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}`).node();
				const circle = main.select(`.${CLASS.circles}-data2 use`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(20);
			});

			it("set option data.type='area'", () => {
				args.data.type = "area";
				args.point.pattern = ["circle"];

				clicked = false;
				data = null;
			});

			it("check for data click for area", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}-0`).node();
				const circle = main.select(`.${CLASS.circles}-data1 circle`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option data.type='scatter'", () => {
				args.data.type = "scatter";
				clicked = false;
				data = null;
			});

			it("check for data click for scatter", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}`).node();
				const circle = main.select(`.${CLASS.circles}-data2 circle`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(20);
			});

			it("set option data.type='bubble'", () => {
				args.data.type = "bubble";
				clicked = false;
				data = null;
			});

			it("check for data click for bubble", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}`).node();
				const circle = main.select(`.${CLASS.circles}-data2 circle`).node().getBBox();
				const delta = 50;

				util.fireEvent(rect, "click", {
					clientX: circle.x + delta,
					clientY: circle.y + delta
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(20);
			});

			it("set option data.type='bar'", () => {
				args.data.type = "bar";
				clicked = false;
				data = null;
			});

			it("check for data click for bar", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}-0`).node();
				const path = main.select(`.${CLASS.bars}-data1 path`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: path.x,
					clientY: path.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option data.type='pie'", () => {
				args.data.type = "pie";
				clicked = false;
				data = null;
			});

			it("check for data click for pie", () => {
				const main = chart.$.main;
				const path = main.select(`.${CLASS.arcs}-data1 path`).node();
				const box = path.getBBox();

				util.fireEvent(path, "click", {
					clientX: Math.abs(box.x),
					clientY: Math.abs(box.y)
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option data.type='gauge'", () => {
				args.data.type = "gauge";
				clicked = false;
				data = null;
			});

			it("check for data click for gauge", () => {
				const main = chart.$.main;
				const path = main.select(`.${CLASS.arcs}-data1 path`).node();
				const box = path.getBBox();

				util.fireEvent(path, "click", {
					clientX: Math.abs(box.x),
					clientY: Math.abs(box.y)
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});

			it("set option data.xs", () => {
				args.data.columns = [
					['x', '2010-12-15', '2011-10-21', '2012-11-10', '2013-10-21', '2014-11-21', '2015-11-21'],
					['data1', 30, 200, 100, 400, 150, 250],
					['x2', '2008-8-21', '2009-5-21', '2010-3-21', '2011-9-22', '2014-11-21', '2015-11-21'],
					['data2', 130, 340, 200, 500, 250, 350]
				];

				args.data.type = "line";

				args.data.xs = {
					'data1': 'x',
					'data2': 'x2',
				};

				args.axis = {
					x: {
						type: "timeseries"
					}
				};

				clicked = false;
				data = null;
			});

			it("check for data click for multiple xs", () => {
				const main = chart.$.main;
				const rect = main.select(`.${CLASS.eventRects}.${CLASS.eventRectsMultiple} rect`).node();
				const circle = main.select(`.${CLASS.circles}.${CLASS.circles}-data1 circle`).node().getBBox();

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(30);
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

				internal.main.selectAll(`.${CLASS.eventRect}`).each(function() {
					const el = d3.select(this);

					expect(el.on("mouseenter")).to.not.be.null;
					expect(el.on("mouseleave")).to.not.be.null;
					expect(el.on("mousemove")).to.not.be.null;
					expect(el.on("mouseover")).to.not.be.null;
					expect(el.on("mouseout")).to.not.be.null;
				});
			});

			it("set option inputType.mouse=false", () => {
				args.interaction.inputType.mouse = false;
			});

			it("mouse events shouldn't be attached", () => {
				const internal = chart.internal;
				const svg = internal.svg;

				expect(svg.on("mouseenter")).to.be.undefined;
				expect(svg.on("mouseleave")).to.be.undefined;

				internal.main.selectAll(`.${CLASS.eventRect}`).each(function() {
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

				internal.main.selectAll(`.${CLASS.eventRect}`).each(function() {
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
							enabled: true,
							draggable: true
						}
					}
				};
			});

			it("data point circle should be selected and unselected", () => {
				const circle = d3.select(`.${CLASS.shape}-2`).node();
				const rect = d3.select(`.${CLASS.eventRect}-2`).node();

				const box = circle.getBBox();
				const clientX = box.x;
				const clientY = box.y;

				util.fireEvent(rect, "click", {
					clientX, clientY
				}, chart);

				expect(d3.select(circle).classed(CLASS.SELECTED)).to.be.true;

				util.fireEvent(rect, "click", {
					clientX, clientY
				}, chart);

				expect(d3.select(circle).classed(CLASS.SELECTED)).to.be.false;
			});
		});

		describe("check for touch move selection", () => {
			const selection = [];

			before(() => {
				// Given
				args = {
					size: {
						width: 250,
						height: 300
					},
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 10, 190, 95, 40, 15, 25]
						]
					},
					interaction: {
						inputType: {
							touch: true
						}
					},
					tooltip: {
						format: {
							title: function(title) {
								if (selection.indexOf(title) === -1) {
									selection.push(title);
								}

								return title;
							}
						}
					}
				};
			});

			it("inputType should be 'touch", () => {
				expect(chart.internal.inputType).to.be.equal("touch");
			});

			it("showed each data points tooltip?", done => {
				util.simulator(chart.internal.svg.node(), {
					pos: [250,150],
					deltaX: -200,
					deltaY: 0,
					duration: 500,
				}, () => {
					expect(selection).to.deep.equal([5, 4, 3, 2, 1, 0]);
					done();
				});
			});
		});
	});
});
