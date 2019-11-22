/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {select as d3Select} from "d3-selection";
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
					const box = d3Select(this).node().getBoundingClientRect();

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
					const box = d3Select(this).node().getBoundingClientRect();

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
					const box = d3Select(this).node().getBoundingClientRect();

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
					const box = d3Select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});

			describe("timeseries #3", () => {
				before(() => {
					args = {
						data: {
							x: "x",
							json: {
								Temperature:["29.39", "29.7", "29.37", "28.87", "28.62"],
								x:["01-01-2015 00:00", "02-01-2015 00:00", "03-01-2015 00:00", "04-01-2015 00:00", "05-01-2015 00:00"]
							},
							type: "area",
							xFormat: "%m-%d-%Y %H:%M"
						},
						axis: {
							x: {
								tick: {
									fit: false,
									count: 5
								},
								type: "timeseries"
							}
						}
					};
				});

				it("check if rect element generated correctly", () => {
					const rect = chart.$.main.selectAll(`.${CLASS.eventRectsSingle} rect`);
					let lastX = 0;

					expect(rect.size()).to.be.equal(args.data.json.x.length);

					rect.each(function(d, i) {
						const x = +this.getAttribute("x");

						expect(+this.getAttribute("x")).to.be.above(lastX);
						expect(+this.getAttribute("width")).to.be.above(0);

						lastX = x;
					});
				});
			});

			describe("timeseries #4", () => {
				before(() => {
					args = {
						data: {
							x: "x",
							json: {
								Temperature:["29.39", "29.7", "29.37", "28.87", "28.62", "27.72", "27.61", "27.82", "27.48", "26.78", "26.62", "26.64", "26.29", "26.01", "25.84", "25.07", "24.85", "24.01", "23.83", "22.8", "23", "22.64", "22.77", "22.64", "22.64", "22.62", "22.51", "21.42", "21.18", "20.93", "20.66", "20.48", "20.7", "21.24", "22.14", "22.78", "23.43", "23.16", "27.48", "26.78", "26.62", "26.64", "26.29", "26.01", "25.84", "25.07", "24.85", "24.01"],
								x:["01-01-2015 00:00", "02-01-2015 00:00", "03-01-2015 00:00", "04-01-2015 00:00", "05-01-2015 00:00", "06-01-2015 00:00", "07-01-2015 00:00", "08-01-2015 00:00", "09-01-2015 00:00", "10-01-2015 00:00", "11-01-2015 00:00", "12-01-2015 00:00", "01-01-2016 00:00", "02-01-2016 00:00", "03-01-2016 00:00", "04-01-2016 00:00", "05-01-2016 00:00", "06-01-2016 00:00", "07-01-2016 00:00", "08-01-2016 00:00", "09-01-2016 00:00", "10-01-2016 00:00", "11-01-2016 00:00", "12-01-2016 00:00", "01-01-2017 00:00", "02-01-2017 00:00", "03-01-2017 00:00", "04-01-2017 00:00", "05-01-2017 00:00", "06-01-2017 00:00", "07-01-2017 00:00", "08-01-2017 00:00", "09-01-2017 00:00", "10-01-2017 00:00", "11-01-2017 00:00", "12-01-2017 00:00", "01-01-2018 00:00", "02-01-2018 00:00", "03-01-2018 00:00", "04-01-2018 00:00", "05-01-2018 00:00", "06-01-2018 00:00", "07-01-2018 00:00", "08-01-2018 00:00", "09-01-2018 00:00", "10-01-2018 00:00", "11-01-2018 00:00", "12-01-2018 00:00"]
							},
							type: "area",
							xFormat: "%m-%d-%Y %H:%M"
						},
						axis: {
							x: {
								tick: {
									fit: false,
									count: 5
								},
								type: "timeseries"
							}
						}
					};
				});

				it("check if rect & data points are generated correctly", () => {
					const rect = chart.$.main.selectAll(`.${CLASS.eventRectsSingle} rect`);
					const dataLen = chart.data()[0].values.length;
					const circles = chart.$.line.circles;

					rect.each((d, i) => {
						expect(d.index).to.be.equal(i);
					});

					expect(rect.size()).to.be.equal(dataLen);
					expect(circles.size()).to.be.equal(dataLen);

					circles.each(function(d, i) {
						expect(this.classList.contains(`${CLASS.shape}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});
				});
			});

			describe("timeseries #5", () => {
				before(() => {
					args = {
						data: {
							x: "x",
							columns: [
								["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06", "2013-01-07", "2013-01-08", "2013-01-09", "2013-01-10", "2013-01-11", "2013-01-12"],
								["sample", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250],
								["sample2", 130, 100, 200, 300, 250, 150, 230, 130]
							]
						},
						axis: {
							x: {
							type: "timeseries",
							tick: {
								values: [
									"2013-01-05",
									"2013-01-10"
								]
							}
							}
						}
					};
				});

				it("check if rect & data points are generated correctly", () => {
					const rect = chart.$.main.selectAll(`.${CLASS.eventRectsSingle} rect`);
					const dataLen = chart.data()[0].values.length;
					const circles = chart.$.line.circles;

					const sampleCircle = circles.filter(d => d.id === "sample");
					const sample2Circle = circles.filter(d => d.id === "sample2");

					rect.each((d, i) => {
						expect(d.index).to.be.equal(i);
					});

					expect(rect.size()).to.be.equal(dataLen);
					expect(sampleCircle.size()).to.be.equal(dataLen);

					sampleCircle.each(function(d, i) {
						expect(this.classList.contains(`${CLASS.circle}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});

					sample2Circle.each(function(d, i) {
						expect(this.classList.contains(`${CLASS.circle}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});
				});

				it("check changes when 'sample' data is hidden", done => {
					// when
					chart.toggle("sample");

					setTimeout(() => {
						const rect = chart.$.main.selectAll(`.${CLASS.eventRectsSingle} rect`);
						const dataLen = chart.data()[1].values.length;
						const circles = chart.$.line.circles.filter(d => d.id === "sample2");

						rect.each((d, i) => {
							expect(d.index).to.be.equal(i);
						});

						expect(rect.size()).to.be.equal(dataLen);
						expect(circles.size()).to.be.equal(dataLen);

						circles.each(function(d, i) {
							expect(this.classList.contains(`${CLASS.circle}-${i}`)).to.be.true;
							expect(d.index).to.be.equal(i);
						});

						done();
					}, 500);
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

			describe("flow", () => {
				before(() => {
					args = {
						data: {
							x: "x",
							columns: [
								["x", "2012-12-29", "2012-12-30", "2012-12-31"],
								["data1", 230, 300, 330],
								["data2", 190, 230, 200]
							]
						},
						axis: {
							x: {
								type: "timeseries",
								tick: {
									format: "%m/%d"
								}
							}
						}
					};
				});

				it("check rect & data points generated after flow correctly", done => {
					setTimeout(() => {
						chart.flow({
							columns: [
								["x", '2013-01-11', '2013-01-21'],
								["data1", 500, 200],
								["data2", 100, 300]
							],
							duration: 500,
							done: function() {
								const rect = chart.$.main.selectAll(`.${CLASS.eventRectsSingle} rect`);
								const circlesData1 = chart.$.main.selectAll(`.${CLASS.circles}-data1 circle`);
								const circlesData2 = chart.$.main.selectAll(`.${CLASS.circles}-data2 circle`);

								rect.each((d, i) => {
									expect(d.index).to.be.equal(i);
								});

								["data1", "data2"].forEach(v => {
									expect(rect.size()).to.be.equal(chart.data(v)[0].values.length);
								});

								[circlesData1, circlesData2].forEach(v => {
									v.each(function(d, i) {
										expect(this.classList.contains(`${CLASS.circle}-${i}`)).to.be.true;
										expect(d.index).to.be.equal(i);
									});
								});

								done();
							}
						});
					}, 500);
				});
			});
		});
	});

	describe("Different interactions", () => {
		describe("check for data.onover/out", () => {
			let itemOver = [];
			let itemOut = [];

			const spyOver = sinon.spy((d, element) => itemOver.push({d, element}));
			const spyOut = sinon.spy((d, element) => itemOut.push({d, element}));

			before(() => {
				args = {
					data: {
						columns: [
							["data1", 300, 350, 300, 0, 0, 0],
							["data2", 130, 100, 140, 200, 150, 50]
						],
						onover: spyOver,
						onout: spyOut
					}
				};
			});

			afterEach(() => {
				itemOver = [];
				itemOut = [];
				spyOver.resetHistory();
				spyOut.resetHistory();
			});

			it("Callbacks were called correctly with its arguments?", done => {
				setTimeout(() => {
					const index = 1;
					const rect = chart.$.main.select(`.${CLASS.eventRect}-${index}`).node();

					util.fireEvent(rect, "mouseover", {
						clientX: 174,
						clientY: 200
					}, chart);

					util.fireEvent(rect, "mouseout", {
						clientX: 0,
						clientY: 0
					}, chart);

					expect(spyOver.calledTwice).to.be.true;
					expect(spyOut.calledTwice).to.be.true;

					itemOver.forEach((v, i) => {
						expect(v.d.x).to.be.equal(index);
						expect(v.element.tagName).to.be.equal("circle");

						expect(itemOut[i].d).to.be.deep.equal(v.d);
						expect(itemOut[i].element).to.be.deep.equal(v.element);
					});

					done();
				}, 500);
			});

			it("set options data.groups / tooltip.grouped=false", () => {
				args.data.groups = [["data1", "data2"]];
				args.tooltip = {grouped: false};
				args.point = {r:5};
			});

			it("Tooltip grouped false: Callbacks were called correctly with its arguments?", done => {
				setTimeout(() => {
					const index = 2;

					util.hoverChart(chart, "mousemove", {clientX: 250, clientY: 311});
					util.hoverChart(chart, "mouseout", {clientX: -100, clientY: -100});

					expect(spyOver.calledOnce).to.be.true;
					expect(spyOut.calledOnce).to.be.true;

					itemOver.forEach((v, i) => {
						expect(v.d.x).to.be.equal(index);
						expect(v.element.tagName).to.be.equal("circle");

						expect(itemOut[i].d).to.be.deep.equal(v.d);
						expect(itemOut[i].element).to.be.deep.equal(v.element);
					});

					done();
				}, 500);
			});

			it("Overlapped circles: Callbacks were called correctly with its arguments?", done => {
				setTimeout(() => {
					const index = 3;

					util.hoverChart(chart, "mousemove", {clientX: 360, clientY: 266}, index);
					util.hoverChart(chart, "mouseout", {clientX: -100, clientY: -100}, index);

					expect(spyOver.calledTwice).to.be.true;
					expect(spyOut.calledTwice).to.be.true;

					itemOver.forEach((v, i) => {
						expect(v.d.x).to.be.equal(index);
						expect(v.element.tagName).to.be.equal("circle");

						expect(itemOut[i].d).to.be.deep.equal(v.d);
						expect(itemOut[i].element).to.be.deep.equal(v.element);
					});

					done();
				}, 500);
			});
		});

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
					const el = d3Select(this);

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
					const el = d3Select(this);

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
					const el = d3Select(this);

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
				const circle = d3Select(`.${CLASS.shape}-2`).node();
				const rect = d3Select(`.${CLASS.eventRect}-2`).node();

				const box = circle.getBBox();
				const clientX = box.x;
				const clientY = box.y;

				util.fireEvent(rect, "click", {
					clientX, clientY
				}, chart);

				expect(d3Select(circle).classed(CLASS.SELECTED)).to.be.true;

				util.fireEvent(rect, "click", {
					clientX, clientY
				}, chart);

				expect(d3Select(circle).classed(CLASS.SELECTED)).to.be.false;
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
				util.simulator(chart.$.svg.node(), {
					pos: [250,150],
					deltaX: -200,
					deltaY: 0,
					duration: 500,
				}, () => {
					expect(selection).to.deep.equal([5, 4, 3, 2, 1, 0]);
					done();
				});
			});

			it("set options zoom.enabled=true", () => {
				args.zoom = {enabled: true};
			});

			it("showed each data points tooltip?", done => {
				chart.tooltip.show({x:1});

				chart.$.tooltip.selectAll(".value").each(function(d, i) {
					expect(+this.innerHTML).to.be.equal(args.data.columns[i][2]);
				});

				util.simulator(chart.$.svg.node(), {
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

	describe("check for data.over/out", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 10, 25]
					],
					type: "bar",
					onover: spy1,
					onout: spy2
				},
				interaction: {
					inputType: {
						mouse: true
					}
				}
			};
		});

		beforeEach(() => {
			spy1.resetHistory();
			spy2.resetHistory();
		});

		it("should be called callbacks for mouse events", () => {
			const main = chart.$.main;
			const eventRect = main.select(`.${CLASS.eventRect}-1`).node();

			util.fireEvent(eventRect, "mouseover");
			expect(spy1.calledTwice).to.be.true;

			util.fireEvent(eventRect, "mouseout");
			expect(spy2.calledTwice).to.be.true;
		});

		it("set options interaction.inputType.touch=true", () => {
			args.interaction.inputType.touch = true;
		});

		it("should be called callbacks for touch events", done => {
			chart.internal.callOverOutForTouch.last = null;

			util.simulator(chart.$.svg.node(), {
				pos: [250,150],
				deltaX: -100,
				deltaY: 0,
				duration: 500,
			}, () => {
				expect(spy1.callCount).to.be.equal(4);
				expect(spy2.calledTwice).to.be.true;

				done();
			});
		});

		it("set options data.type=radar", () => {
			args.data.type = "radar";
			args.interaction.inputType.touch = false;
		});

		it("should be called callbacks for mouse events", () => {
			const index = 2;
			const main = chart.$.main;
			const text = main.select(`.${CLASS.axis}-${index} text`).node();

			util.fireEvent(text, "mouseover");
			expect(spy1.calledTwice).to.be.true;

			main.selectAll(`.${CLASS.EXPANDED}`).each(d => {
				expect(d.index).to.be.equal(index);
			});

			util.fireEvent(text, "mouseout");
			expect(spy2.calledTwice).to.be.true;
			expect(main.selectAll(`.${CLASS.EXPANDED}`).size()).to.be.equal(0);
		});
	});
});
