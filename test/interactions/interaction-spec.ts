/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$ARC, $AXIS, $BAR, $CIRCLE, $COMMON, $FOCUS, $EVENT, $SELECT, $SHAPE} from "../../src/config/classes";

describe("INTERACTION", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("generate event rects", () => {
		describe("custom x #1", () => {
			beforeAll(() => {
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
				expect(chart.internal.state.inputType).to.be.equal("mouse");
			});

			it("should have 4 event rects properly", () => {
				const lefts = [0, 99.5, 167.5, 372.5];
				const widths = [99.5, 68, 205, 235.5];

				chart.internal.state.eventReceiver.coords.forEach((v, i) => {
					expect(v.x).to.be.closeTo(lefts[i], 10);
					expect(v.w).to.be.closeTo(widths[i], 10);
				});
			});
		});

		describe("custom x #2", () => {
			beforeAll(() => {
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
				const eventRects = chart.$.main.selectAll(`.${$EVENT.eventRect}`);

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function () {
					const box = d3Select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});
		});

		describe("timeseries #1", () => {
			beforeAll(() => {
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
				const lefts = [3, 155, 317.5, 467];
				const widths = [152, 162.5, 149.5, 138.5];

				chart.internal.state.eventReceiver.coords.forEach((v, i) => {
					expect(v.x).to.be.closeTo(lefts[i], 10);
					expect(v.w).to.be.closeTo(widths[i], 10);
				});
			});
		});

		describe("timeseries #2", () => {
			beforeAll(() => {
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
				const eventRects = chart.$.main.selectAll(`.${$EVENT.eventRect}`);

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function () {
					const box = d3Select(this).node().getBoundingClientRect();

					expect(box.left).to.be.closeTo(30.5, 10);
					expect(box.width).to.be.closeTo(608, 10);
				});
			});

			describe("timeseries #3", () => {
				beforeAll(() => {
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
					const {coords, data} = chart.internal.state.eventReceiver;
					let lastX = 0;

					expect(coords.length).to.be.equal(args.data.json.x.length);

					data.forEach((d, i) => {
						expect(d.index).to.be.equal(i);
					});

					coords.forEach((v, i) => {
						i && expect(v.x).to.be.above(lastX);
						expect(v.w).to.be.above(0);

						lastX = v.x;
					});
				});
			});

			describe("timeseries #4", () => {
				beforeAll(() => {
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
					const {coords, data} = chart.internal.state.eventReceiver;
					const dataLen = chart.data()[0].values.length;
					const {circles} = chart.$;

					data.forEach((d, i) => {
						expect(d.index).to.be.equal(i);
					});

					expect(coords.length).to.be.equal(dataLen);
					expect(circles.size()).to.be.equal(dataLen);

					circles.each(function(d, i) {
						expect(this.classList.contains(`${$SHAPE.shape}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});
				});
			});

			describe("timeseries #5", () => {
				beforeAll(() => {
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
					const {coords, data} = chart.internal.state.eventReceiver;
					const dataLen = chart.data()[0].values.length;
					const circles = chart.$.circles;

					data.forEach((d, i) => {
						expect(d.index).to.be.equal(i);
					});

					const sampleCircle = circles.filter(d => d.id === "sample");
					const sample2Circle = circles.filter(d => d.id === "sample2");

					expect(coords.length).to.be.equal(dataLen);
					expect(sampleCircle.size()).to.be.equal(dataLen);

					sampleCircle.each(function(d, i) {
						expect(this.classList.contains(`${$CIRCLE.circle}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});

					sample2Circle.each(function(d, i) {
						expect(this.classList.contains(`${$CIRCLE.circle}-${i}`)).to.be.true;
						expect(d.index).to.be.equal(i);
					});
				});

				it("check changes when 'sample' data is hidden", () => new Promise(done => {
					// when
					chart.toggle("sample");

					setTimeout(() => {
						const {coords, data} = chart.internal.state.eventReceiver;
						const dataLen = chart.data()[1].values.length;
						const circles = chart.$.circles.filter(d => d.id === "sample2");

						data.forEach((d, i) => {
							expect(d.index).to.be.equal(i);
						});

						expect(coords.length).to.be.equal(dataLen);
						expect(circles.size()).to.be.equal(dataLen);

						circles.each(function(d, i) {
							expect(this.classList.contains(`${$CIRCLE.circle}-${i}`)).to.be.true;
							expect(d.index).to.be.equal(i);
						});

						done(1);
					}, 300);
				}));
			});

			describe("indexed", () => {
				beforeAll(() => {
					args = {
						data: {
							columns: [
								["data", 10, 20, 30, 40, 50]
							]
						}
					};
				});

				it("rect elements should be positioned without gaps", () => {
					const rect: number[] = [];

					chart.$.main.selectAll(`.${$EVENT.eventRect}`).each(function(d, i) {
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
				beforeAll(() => {
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

				it("check rect & data points generated after flow correctly", () => new Promise(done => {
					setTimeout(() => {
						chart.flow({
							columns: [
								["x", '2013-01-11', '2013-01-21'],
								["data1", 500, 200],
								["data2", 100, 300]
							],
							duration: 500,
							done: function() {
								const {coords, data} = chart.internal.state.eventReceiver;
								const circlesData1 = chart.$.main.selectAll(`.${$CIRCLE.circles}-data1 circle`);
								const circlesData2 = chart.$.main.selectAll(`.${$CIRCLE.circles}-data2 circle`);

								data.forEach((d, i) => {
									expect(d.index).to.be.equal(i);
								});

								["data1", "data2"].forEach(v => {
									expect(coords.length).to.be.equal(chart.data(v)[0].values.length);
								});

								[circlesData1, circlesData2].forEach(v => {
									v.each(function(d, i) {
										expect(this.classList.contains(`${$CIRCLE.circle}-${i}`)).to.be.true;
										expect(d.index).to.be.equal(i);
									});
								});

								done(1);
							}
						});
					}, 300);
				}));
			});
		});
	});

	describe("Different interactions", () => {
		describe("check for data.onover/out", () => {
			let itemOver = [];
			let itemOut = [];

			const spyOver = sinon.spy((d, element) => itemOver.push({d, element}));
			const spyOut = sinon.spy((d, element) => itemOut.push({d, element}));

			beforeAll(() => {
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

			it("Callbacks were called correctly with its arguments?", () => new Promise(done => {
				setTimeout(() => {
					const index = 1;
					const rect = chart.internal.$el.eventRect.node();
					chart.internal.state.eventReceiver.coords[index];
					//chart.$.main.select(`.${$EVENT.eventRect}-${index}`).node();

					util.fireEvent(rect, "mousemove", {
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

					done(1);
				}, 300);
			}));

			it("set options data.groups / tooltip.grouped=false", () => {
				args.data.groups = [["data1", "data2"]];
				args.tooltip = {grouped: false};
				args.point = {r:5};
			});

			it("Tooltip grouped false: Callbacks were called correctly with its arguments?", () => new Promise(done => {
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

					done(1);
				}, 300);
			}));

			it("Overlapped circles: Callbacks were called correctly with its arguments?", () => new Promise(done => {
				setTimeout(() => {
					const index = 3;

					util.hoverChart(chart, "mousemove", {clientX: 360, clientY: 266});
					util.hoverChart(chart, "mouseout", {clientX: -100, clientY: -100});

					expect(spyOver.calledTwice).to.be.true;
					expect(spyOut.calledTwice).to.be.true;

					itemOver.forEach((v, i) => {
						expect(v.d.x).to.be.equal(index);
						expect(v.element.tagName).to.be.equal("circle");

						expect(itemOut.some(t => JSON.stringify(t) === JSON.stringify(v))).to.be.true;
						expect(itemOut.some(t => t.element === v.element)).to.be.true;
					});

					done(1);
				}, 300);
			}));

			it("set options", () => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 200, 130, 150, 250],
							["data2", 130, 100, 140, 150, 150, 50],
							["data3", 130, 100, 140, 220, 150, 50]
						],
						groups: [
							["data1", "data2"]
						],
						type: "bar",
						onover: spyOver,
						onout: spyOut
					},
					bar: {
						sensitivity: 0
					},
					tooltip: {
						show: false,
						grouped: false,
					}
				};
			});

			it("callback should called correctly on same x Axis for bar type.", () => new Promise(done => {
				new Promise(resolve => {
					util.hoverChart(chart, "mousemove", {
						clientX: 360,
						clientY: 300
					});

					setTimeout(resolve, 300);
				}).then(() => {
					new Promise(resolve => {
						util.hoverChart(chart, "mousemove", {
							clientX: 340,
							clientY: 300
						});

						setTimeout(resolve, 300);
					});
				}).then(() => {
					new Promise(resolve => {
						util.hoverChart(chart, "mousemove", {
							clientX: 340,
							clientY: 200
						});

						setTimeout(resolve, 300);
					});
				})
				.then(() => {
					const expectedX = 3;
					const expectedFlow = {
						over: ["data3", "data2", "data1"],
						out: ["data3", "data2"]
					};

					itemOver
						.map(({d: {x, id}}) => ({x, id}))
						.forEach((v, i) => {							
							expect(v.x).to.be.equal(expectedX);
							expect(expectedFlow.over[i]).to.be.equal(v.id);
						});

					itemOut
						.map(({d: {x, id}}) => ({x, id}))
						.forEach((v, i) => {							
							expect(v.x).to.be.equal(expectedX);
							expect(expectedFlow.out[i]).to.be.equal(v.id);
						});

					done(1);
				});
			}));

			it("should focused/defocused state class set & unset correctly.", () => new Promise(done => {
				new Promise(resolve => {
					util.hoverChart(chart, "mousemove", {
						clientX: 360,
						clientY: 300
					});

					setTimeout(resolve, 300);
				}).then(() => {
					new Promise(resolve => {
						util.hoverChart(chart, "mousemove", {
							clientX: 240,
							clientY: 300
						});

						setTimeout(resolve, 300);
					});
				}).then(() => {
					const expanded = chart.$.bar.bars.filter(`.${$COMMON.EXPANDED}`);

					expect(expanded.size()).to.be.equal(chart.data().length);

					expanded.each(d => {
						expect(d.index).to.be.equal(2);
					});

					done(1);
				});
			}));
		});

		describe("check for data.onclick", () => {
			let clicked = false;
			let data;

			beforeAll(() => {
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
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data1 circle`));

				util.fireEvent(eventRect.node(), "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);
			});
			
			it("set option point.sensitivity='radius'", () => {
				args.point.sensitivity = "radius";
			});

			it("check for data click for line: when point.senstivity='radius'", () => {
				const main = chart.$.main;
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data1 circle`));

				util.fireEvent(eventRect.node(), "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(10);

				delete args.point.sensitivity;
			});

			it("set option point.type='rectangle'", () => {
				args.point.pattern = ["rectangle"];
				clicked = false;
				data = null;
			});

			it("check for data click for rectangle data point", () => {
				const main = chart.$.main;
				const rect = main.select(`.${$EVENT.eventRect}.${$EVENT.eventRect}`).node();
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data1 rect`));

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
				const rect = main.select(`.${$EVENT.eventRect}.${$EVENT.eventRect}`).node();
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data2 use`));

				util.fireEvent(rect, "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(20);
			});

			it("set option data.type='area'", () => {
				args.data.type = "area";
				args.point.pattern = [];

				clicked = false;
				data = null;
			});

			it("check for data click for area", () => {
				const main = chart.$.main;
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data1 circle`));

				util.fireEvent(eventRect.node(), "click", {
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
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data2 circle`));

				util.fireEvent(eventRect.node(), "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(20);
			});

			it("set option data.type='bubble'", () => {
				args.data.type = "bubble";
				args.point = {
					sensitivity: 25
				};
				clicked = false;
				data = null;
			});

			it("check for data click for bubble", () => {
				const main = chart.$.main;
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}-data2 circle`));
				const delta = 50;

				util.fireEvent(eventRect.node(), "click", {
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
				const {eventRect} = chart.internal.$el;
				const path = util.getBBox(main.select(`.${$BAR.bars}-data1 path`));

				util.fireEvent(eventRect.node(), "click", {
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
				const path = main.select(`.${$ARC.arcs}-data1 path`).node();
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
				const path = main.select(`.${$ARC.arcs}-data1 path`).node();
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
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(main.select(`.${$CIRCLE.circles}.${$CIRCLE.circles}-data1 circle`));

				util.fireEvent(eventRect.node(), "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(clicked).to.be.true;
				expect(data.value).to.be.equal(30);
			});

			it("set option", () => {
				args = {
					data: {
						xs: {
							data1: "x1",
							data2: "x2"
						},
						columns: [
							["x1", 1, 2, 3, 4, 5],
							["x2", 1, 2, 4, 5, 6],
							["data1", 4, 1, 6, 8, 10],
							["data2", 5, 2, 6, 7, 8]
						],
						type: "line", // for ESM specify as: line()
						onclick: sinon.spy()
					},
					zoom: {
						enabled: true,
						type: "drag",
					}
				}
			});

			it("onclick callback should be called once", () => {
				const {eventRect} = chart.internal.$el;
				const circle = util.getBBox(chart.$.circles.node());

				util.fireEvent(eventRect.node(), "click", {
					clientX: circle.x,
					clientY: circle.y
				}, chart);

				expect(args.data.onclick.calledOnce).to.be.true;
			});
		});

		describe("check for data.onclick on touch", () => {
			let clicked = false;
			let data;

			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 10],
							["data2", 20]
						],
						onclick: d => {
							clicked = true;
							data = d;
						},
						type: "pie"
					},
					interaction: {
						inputType: {
							touch: true
						}
					}
				};
			});

			it("should be called data.oncick", () => new Promise(done => {
				new Promise((resolve, reject) => {
					args.onrendered = resolve;

					chart = util.generate(args);
				}).then(() => {
					const path = chart.$.arc.select(`path.${$ARC.arc}-data2`).node();

					util.fireEvent(path, "click", {
						clientX: 50,
						clientY: 100
					}, chart);

					// when
					util.fireEvent(path, "touchstart", {
						clientX: 50,
						clientY: 100
					}, chart);

					expect(clicked).to.be.true;
					expect(data).to.be.deep.equal({
						id: 'data2',
						value: 20,
						ratio: 0.6666666666666666,
						index: 1,
						name: 'data2'
					});

					done(1);
				});
			}));
		});

		describe("check for event binding", () => {
			beforeAll(() => {
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
				const {main, svg} = chart.internal.$el;

				expect(svg.on("mouseenter")).to.not.be.null;
				expect(svg.on("mouseleave")).to.not.be.null;

				main.selectAll(`.${$EVENT.eventRect}`).each(function() {
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
				const {main, svg} = chart.internal.$el;

				expect(svg.on("mouseenter")).to.be.undefined;
				expect(svg.on("mouseleave")).to.be.undefined;

				main.selectAll(`.${$EVENT.eventRect}`).each(function() {
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
				const {main, svg} = chart.internal.$el;

				expect(svg.on("mouseenter")).to.be.undefined;
				expect(svg.on("mouseleave")).to.be.undefined;

				main.selectAll(`.${$EVENT.eventRect}`).each(function() {
					const el = d3Select(this);

					expect(el.on("mouseenter")).to.be.undefined;
					expect(el.on("mouseleave")).to.be.undefined;
					expect(el.on("mousemove")).to.be.undefined;
					expect(el.on("mouseover")).to.be.undefined;
					expect(el.on("mouseout")).to.be.undefined;
				});
			});

			it("Focus grid line and event rect shouldn't be generated", () => {
				expect(chart.$.grid.main.select(`.${$FOCUS.xgridFocus}`).empty()).to.be.true;
				expect(chart.$.main.select(`.${$EVENT.eventRects}`).empty()).to.be.true;
			});

			it("Event listener shouldn't be set for legend", () => {
				expect(chart.$.legend.select("g").on("click mouseout mouseover")).to.be.undefined;
			});
		});

		describe("check for data.selection", () => {
			beforeAll(() => {
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
				const circle: any = d3Select(`.${$SHAPE.shape}-2`).node();
				const {eventRect} = chart.internal.$el;

				const box = circle.getBBox();
				const clientX = box.x;
				const clientY = box.y;

				util.fireEvent(eventRect.node(), "click", {
					clientX, clientY
				}, chart);

				expect(d3Select(circle).classed($SELECT.SELECTED)).to.be.true;

				util.fireEvent(eventRect.node(), "click", {
					clientX, clientY
				}, chart);

				expect(d3Select(circle).classed($SELECT.SELECTED)).to.be.false;
			});
		});

		describe("check for touch move selection #1", () => {
			const selection = [];

			beforeAll(() => {
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
				expect(chart.internal.state.inputType).to.be.equal("touch");
			});

			it("showed each data points tooltip?", () => new Promise(done => {
				util.simulator(chart.internal.$el.eventRect.node(), {
					pos: [250,150],
					deltaX: -200,
					deltaY: 0,
					duration: 500,
				}, () => {
					expect(selection).to.deep.equal([5, 4, 3, 2, 1, 0]);
					done(1);
				});
			}));

			it("set options zoom.enabled=true", () => {
				args.zoom = {enabled: true};
			});

			it("showed each data points tooltip?", () => new Promise(done => {
				chart.tooltip.show({x:1});

				chart.$.tooltip.selectAll(".value").each(function(d, i) {
					expect(+this.innerHTML).to.be.equal(args.data.columns[i][2]);
				});

				util.simulator(chart.internal.$el.eventRect.node(), {
					pos: [250,150],
					deltaX: -200,
					deltaY: 0,
					duration: 500,
				}, () => {
					expect(selection).to.deep.equal([5, 4, 3, 2, 1, 0]);
					done(1);
				});
			}));

			it("set option onresized", () => {
				args.onresized = sinon.spy();
			});

			it("check if tooltip visibility maintained and position updated after resize", () => new Promise(done => {
				let left;

				new Promise(resolve => {
					util.simulator(chart.internal.$el.eventRect.node(), {
						pos: [250,150],
						deltaX: -200,
						deltaY: 0,
						duration: 500,
					}, resolve);

					//setTimeout(resolve, 300);
				}).then(resolve => {
					left = parseInt(chart.$.tooltip.style("left"));
					
					// when
					chart.resize({width: 300});

					// @ts-ignore
					setTimeout(resolve, 300);
				}).then(() => {

					setTimeout(() => {
						expect(args.onresized.calledOnce).to.be.true;
						expect(parseInt(chart.$.tooltip.style("left"))).to.be.above(left);
	
						done(1);
					}, 300);
				});
			}));

			it("check if data point radius size roll back after hide API is called", () => new Promise(done => {
				const x = 2;
				chart.tooltip.show({x});
				chart.tooltip.hide();

				setTimeout(() => {
					const points = chart.$.circles.filter(`.${$CIRCLE.circle}-${x}`);

					expect(+points.attr("r")).to.be.equal(chart.config("point.r"));
					done(1);
				}, 100);
			}));
		});
	});

	describe("check for touch move selection #2", () => {
		const selection = [];

		beforeAll(() => {
			args = {
				data: {	
					columns: [
						["data", 3000, 2000, 1000, 4000]
					]
				},
				interaction: {
					inputType: {
						touch: true
					}
				}
			};
		});

		it("x focus grid position & visibility should be maintained after resize", () => new Promise(done => {
			new Promise(resolve => {
				// when
				util.simulator(chart.internal.$el.eventRect.node(), {
					pos: [250,150],
					deltaX: -200,
					deltaY: 0,
					duration: 500,
				}, resolve);
			}).then(resolve => {
				chart.resize({width:300});

				// @ts-ignore
				setTimeout(resolve, 300);
			}).then(() => {
				setTimeout(() => {
					const xGridFocus = chart.$.main.select(`.${$FOCUS.xgridFocus} line`);
					const x = chart.internal.xx(xGridFocus.datum());
	
					expect(x).to.be.equal(+xGridFocus.attr("x1"));
					expect(x).to.be.equal(+xGridFocus.attr("x2"));
					expect(xGridFocus.style("visibility")).to.be.equal("visible");
	
					done(1);
				}, 300);
			});
		}));

		it("set option grid.focus.show=false", () => {
			args.grid = {
				focus: {
					show: false
				}
			};
		});

		it("should not throwing error when grid focus is not shown", () => {
			expect(chart.tooltip.show({x:2})).to.not.throw;
		});
	});

	describe("check for data.over/out", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		beforeAll(() => {
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

		it("should be called callbacks for fireEvent", () => {
			const main = chart.$.main;
			const eventRect = chart.internal.$el.eventRect.node();

			util.fireEvent(eventRect, "mousemove", {
				clientX: 174,
				clientY: 200
			}, chart);
			
			expect(spy1.calledTwice).to.be.true;

			util.fireEvent(eventRect, "mouseout", {
				clientX: 174,
				clientY: 200
			}, chart);

			expect(spy2.calledTwice).to.be.true;
		});

		it("set options interaction.inputType.touch=true", () => {
			args.interaction.inputType.touch = true;
		});

		it("should be called callbacks for touch events", () => new Promise(done => {
			const {internal: {$el, callOverOutForTouch}} = chart;

			callOverOutForTouch.last = null;

			util.simulator($el.eventRect.node(), {
				pos: [250,150],
				deltaX: -100,
				deltaY: 0,
				duration: 500,
			}, () => {
				expect(spy1.callCount).to.be.equal(4);
				expect(spy2.calledTwice).to.be.true;

				done(1);
			});
		}));

		it("set options data.type=radar", () => {
			args.data.type = "radar";
			args.interaction.inputType.touch = false;
		});

		it("should be called callbacks for mouse events", () => {
			const index = 2;
			const main = chart.$.main;
			const text = main.select(`.${$AXIS.axis}-${index} text`).node();

			util.fireEvent(text, "mouseover");
			expect(spy1.calledTwice).to.be.true;

			main.selectAll(`.${$COMMON.EXPANDED}`).each(d => {
				expect(d.index).to.be.equal(index);
			});

			util.fireEvent(text, "mouseout");
			expect(spy2.calledTwice).to.be.true;
			expect(main.selectAll(`.${$COMMON.EXPANDED}`).size()).to.be.equal(0);
		});
	});

	describe("check for arc data name", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["catégorie 1", 20],
						["catégorie 2 2", 80]
					],
					type: "pie"
				}
			};
		});

		it("should not throw error", () => {
			expect(() => {
				chart.internal.setOverOut(true, {
					id: "catégorie 1"
				});

				chart.internal.setOverOut(true, {
					id: "catégorie 2 2"
				});
			}).to.not.throw();
		});
	});

	describe("check for bubble null data", () => {
		beforeAll(() => {
			args = {
				data: {
					json: [
					   {
						  "x":1,
						  "b":null,
						  "a":[1,2]
					   },
					   {
						  "x":2,
						  "b":null,
						  "a":[3,1]
					   },
					   {
						  "x":3,
						  "b":[0,2],
						  "a":null
					   },
					   {
						  "x":4,
						  "b":[3,2],
						  "a":[7,5]
					   },
					   {
						  "x":5,
						  "b":[5,3],
						  "a":[2,10]
					   }
					],
					keys: {
					   "x":"x",
					   "value":[
						  "a",
						  "b"
					   ]
					},
					type: "bubble"
				},
				point: {
					sensitivity: 25
				}
			};
		});

		it("should show tooltip", () => {
			const point = chart.$.circles.filter(v => v.id === "b" && v.index === 2);
			const r = +point.attr("r");

			// when
			chart.tooltip.show({
				mouse: [308.5, 400]
			});

			chart.$.tooltip.selectAll(".name, .value").each(function() {
				if (this.classList.contains("name")) {
					expect(this.textContent).to.be.equal("b");
				} else if (this.classList.contains("value")) {
					expect(+this.textContent).to.be.equal(2);
				}
			});

			expect(+point.attr("r")).to.be.above(r);
		});
	});

	describe("interaction.onover", () => {
		const spy = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					onout: spy
			 	},
			  	interaction: {
					onout: false
			  	}
			}
		});

		it("should maintain 'selected' state", () => {
			util.hoverChart(chart, "mousemove", {clientX: 250, clientY: 311});
			util.hoverChart(chart, "mouseout", {clientX: -100, clientY: -100});

			expect(chart.$.tooltip.style("display")).to.be.equal("block");
			expect(spy.called).to.be.false;
		});
	});
});
