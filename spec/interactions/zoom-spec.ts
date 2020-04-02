/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("ZOOM", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("default extent", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					]
				},
				axis: {
					x: {
						extent: [[1, 0], [2, 60]]
					}
				},
				zoom: {
					enabled: true
				},
				subchart: {
					show: true
				}
			};
		});

		describe("main chart domain", () => {
			it("should have original y domain", () => {
				const yDomain = chart.internal.y.domain();
				const expectedYDomain = [-591.5, 6626.5];

				expect(yDomain[0]).to.be.equal(expectedYDomain[0]);
				expect(yDomain[1]).to.be.equal(expectedYDomain[1]);
			});
		});

		describe("main chart domain", () => {
			it("should have original y domain in subchart", () => {
				const yDomain = chart.internal.y.domain();
				const subYDomain = chart.internal.subY.domain();

				expect(subYDomain[0]).to.be.equal(yDomain[0]);
				expect(subYDomain[1]).to.be.equal(yDomain[1]);
			});
		});

		describe("main chart domain", () => {
			it("should have specified brush extent", () => {
				const brushExtent = chart.internal.brush.extent()();
				const expectedBrushExtent = [[1, 0], [2, 60]];

				expect(brushExtent[0][1]).to.be.equal(expectedBrushExtent[0][1]);
				expect(brushExtent[1][1]).to.be.equal(expectedBrushExtent[1][1]);
			});
		});
	});

	describe("zoom event", () => {
		let zoomDomain;
		const spyOnZoomStart = sinon.spy();
		const spyOnZoom = sinon.spy(domain => (zoomDomain = domain));
		const spyOnZoomEnd = sinon.spy(domain => (zoomDomain = domain));

		before(() => {
			args = {
				size: {
					width: 300,
					height: 250
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					]
				},
				zoom: {
					enabled: {
						type: "wheel"
					},
					onzoomstart: spyOnZoomStart,
					onzoom: spyOnZoom,
					onzoomend: spyOnZoomEnd
				}
			};
		});

		it("check for data zoom", () => {
			const main = chart.internal.main;
			const xValue = +main.select(`.${CLASS.eventRect}-2`).attr("x");

			// when
			chart.zoom([0,3]);  // zoom in

			expect(+main.select(`.${CLASS.eventRect}-2`).attr("x")).to.be.above(xValue);
		});

		it("check for zoom event callbacks", done => {
			const main = chart.internal.main;
			const eventRect = main.select(`.${CLASS.eventRect}-2`).node();

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 150
				}, chart);

				resolve();
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (spyOnZoomStart.called) {
							expect(spyOnZoomStart.args[0][0].type).to.be.equal("mousedown");

							util.fireEvent(eventRect, "mousemove", {
								clientX: 100,
								clientY: 150
							}, chart);

							resolve("--> onzoomstart callback called!");
						}
					}, 500);
				});
			}).then((msg) => {
				console.log(msg);

				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (spyOnZoom.called) {
							expect(spyOnZoom.args[0][0]).to.be.deep.equal([0, 3]);

							util.fireEvent(eventRect, "mouseup", {
								clientX: 100,
								clientY: 150
							}, chart);

							// call explicitly, due to mouseup isn't firing well programmatically.
							chart.internal.onZoomEnd();

							resolve("--> onzoom callback called!");
						};
					}, 500);
				})
			}).then((msg) => {
				console.log(msg);
				console.log("--> onzoomend callback called!");

				expect(spyOnZoomEnd.called).to.be.true;

				done();
			});
		});

		it("check for data zoom", () => {
			const main = chart.internal.main;
			const xValue = +main.select(`.${CLASS.eventRect}-2`).attr("x");

			// when
			chart.zoom([0,3]);  // zoom in

			expect(+main.select(`.${CLASS.eventRect}-2`).attr("x")).to.be.above(xValue);
		});

		it("check for x axis resize after zoom", () => {
			const main = chart.internal.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${CLASS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0,4]);
			chart.resize({width:400});

			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for x axis resize after zoom in/out", () => {
			const main = chart.internal.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${CLASS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0,4]);  // zoom in
			chart.zoom([0,6]);  // zoom out

			expect(+domain.attr("d").match(rx)[1]).to.be.equal(pathValue);

			// resize
			chart.resize({width:400});

			// check if chart react on resize
			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for updated domain on zoomScale after zoom in", () => {
			const zoomValue = [1, 3];

			chart.zoom(zoomValue); // zoom in
			expect(chart.internal.zoomScale.domain()).to.be.deep.equal(zoomValue); // zoomScale value is updated on zoom in

			chart.unzoom(); // zoom set to initial
			expect(chart.internal.zoomScale).to.be.null; // zoomScale null on zoom out to initial

		});

		it("check for subX domain values after zoom", () => {
			const zoomValue = [1, 3];
			const subX = chart.internal.subX;

			chart.zoom(zoomValue); // zoom in
			expect(subX.domain()).to.not.deep.equal(zoomValue); // subX value not updated on zoom in

			chart.unzoom(); // zoom set to initial
			expect(subX.domain()).to.be.deep.equal(chart.internal.x.orgDomain()); // subX value not updated on zoom in
		});
	});

	describe("zoom wheel", () => {
		before(() => {
			args = {
				size: {
					width: 300,
					height: 250
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					]
				},
				grid: {
					x: {
						show: true
					}
				},
				zoom: {
					rescale: true,
					enabled: true
				}
			};
		});

		it("check with rescale option", () => {
			const eventRect = chart.$.main.select(`.${CLASS.eventRect}-2`).node();
			const orgDomain = {
				x: chart.internal.x.domain(),
				y: chart.internal.y.domain()
			};

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -100,
				clientX: 159,
				clientY: 137
			});

			["x", "y"].forEach(id => {
				const domain = orgDomain[id];

				expect(
					chart.internal[id].domain()
						.every((v, i) => i > 0 ? v < domain[i] : v > domain[i])
				).to.be.true;
			});

			// when zoom out
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: 100,
				clientX: 159,
				clientY: 137
			});

			["x", "y"].forEach(id => {
				const domain = orgDomain[id];

				expect(
					chart.internal[id].domain()
						.every((v, i) => v === domain[i])
				).to.be.true;
			});
		});

		it("grid also should scale", done => {
			const getX = selector => chart.$.main.select(selector).node().getBoundingClientRect().x;

			// when zoom in
			chart.zoom([1,3]);

			setTimeout(() => {
				expect(
					getX(`.${CLASS.xgrids} line:nth-child(2)`)
				).to.be.equal(
					getX(`.${CLASS.axisX} g.tick:nth-child(4) line`)
				);

				done();
			}, 300);
		})
	});

	describe("zoom type drag", () => {
		const spy = sinon.spy();
		let clickedData;

		before(() => {
			args = {
				size: {
					width: 300,
					height: 250
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					],
					onclick: d => {
						clickedData = d;
					}
				},
				zoom: {
					enabled: {
						type: "drag"
					}
				}
			};
		});

		it("check for data zoom", () => {
			const main = chart.$.main;
			const xValue = +main.select(`.${CLASS.eventRect}-2`).attr("x");

			// when
			chart.zoom([0, 3]);  // zoom in

			expect(+main.select(`.${CLASS.eventRect}-2`).attr("x")).to.be.above(xValue);
		});

		it("check for x axis resize after zoom", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${CLASS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0, 4]);
			chart.resize({width: 400});

			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for x axis resize after zoom in/out", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${CLASS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0, 4]);  // zoom in
			chart.zoom([0, 6]);  // zoom out

			expect(+domain.attr("d").match(rx)[1]).to.be.equal(pathValue);

			// resize
			chart.resize({width: 400});

			// check if chart react on resize
			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for the reset zoom button", () => {
			// when
			chart.zoom([0, 4]);

			const resetBtn = chart.$.chart.select(`.${CLASS.buttonZoomReset}`);

			expect(resetBtn.empty()).to.be.false;

			// when button is clicked
			resetBtn.node().click();

			expect(resetBtn.style("display")).to.be.equal("none");
		});

		it("set options zoom.resetButton.text='test'", () => {
			args.zoom.resetButton = {
				text: "test"
			};
		});

		it("check for the custom reset zoom button text", () => {
			// when
			chart.zoom([0, 4]);

			const resetBtn = chart.$.chart.select(`.${CLASS.buttonZoomReset}`);

			expect(resetBtn.empty()).to.be.false;
			expect(resetBtn.text()).to.be.equal("test");
		});

		it("set options zoom.resetButton.onclick", () => {
			args.zoom.resetButton.onclick = spy;
		});

		it("check for the reset zoom button onclick callback", () => {
			// when
			chart.zoom([0, 4]);

			const resetBtn = chart.$.chart.select(`.${CLASS.buttonZoomReset}`).node();

			util.fireEvent(resetBtn, "click", {
				clientX: 0,
				clientY: 0
			}, chart);

			expect(spy.calledOnce).to.be.true;
			expect(spy.args[0][0]).to.be.equal(resetBtn);
		});

		it("set options zoom.rescale=true", () => {
			args.zoom.rescale = true;
		});

		it("check for the y axis rescale", () => {
			const axisY = chart.$.main.select(`.${CLASS.axisY}`);

			// when
			chart.zoom([0, 2]);

			let tick = axisY.selectAll(".tick").nodes().pop();

			expect(+tick.textContent).to.be.equal(200);

			// when
			chart.zoom([2, 4]);

			tick = axisY.selectAll(".tick").nodes().pop();

			expect(+tick.textContent).to.be.equal(3000);
		});

		it("check for data.onclick", () => {
			const main = chart.$.main;
			const rect = main.select(`.${CLASS.eventRect}.${CLASS.eventRect}-0`).node();
			const circle = chart.$.line.circles.node().getBBox();

			util.fireEvent(rect, "click", {
				clientX: circle.x,
				clientY: circle.y
			}, chart);

			expect(clickedData).to.not.be.undefined;
		});
	});

	describe("zoom on regions", () => {
		before(() => {
			args = {
				zoom: {
					enabled: {
						type: "drag"
					}
				},
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					regions: {
						sample: [{
							start: 1,
							end: 2,
							style: {
								dasharray: "5 2"
							}
						}]
					}
				},
				regions: [
					{
						start: "1",
						end: "2"
					}
				],
			};
		});

		it("region area should be resized on zoom", done => {
			const main = chart.$.main;
			const regionRect = main.select(`.${CLASS.region}-0 rect`);
			const lineWidth = chart.$.line.lines.node().getBBox().width;

			const size = {
				width: +regionRect.attr("width"),
				x: +regionRect.attr("x")
			};

			// when
			chart.zoom([1,3]);

			setTimeout(() => {
				expect(+regionRect.attr("width")).to.be.above(size.width);
				expect(+regionRect.attr("x")).to.be.below(size.x);
				expect(+chart.$.line.lines.node().getBBox().width).to.be.above(lineWidth);

				done();
			}, 500);
		});
	});

	describe ("zoom scale consistency for dragging", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					]
				},
				zoom: {
					enabled: true
				}
			};
		});

		it("zoom scale should maintained on dragging interaction", done => {
			const internal = chart.internal;
			const main = internal.main;
			const zoomDomain = [0,2];

			// when
			chart.zoom(zoomDomain);

			const eventRect = main.select(`.${CLASS.eventRect}-2`).node();
			const zoomedDomain = internal.x.domain();

			expect(zoomedDomain).to.be.deep.equal(zoomDomain);

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 150
				}, chart);

				resolve();
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 130,
							clientY: 150
						}, chart);

						resolve();
					}, 500);
				});
			}).then(() => {
				setTimeout(() => {
					util.fireEvent(eventRect, "mouseup", {
						clientX: 150,
						clientY: 150
					}, chart);

					expect(internal.x.domain()).to.be.deep.equal(zoomedDomain);

					done();
				}, 500);
			});
		});
	});

	describe("zoom tick fit", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					json: {
						"Temperature": [
							"29.37",
							"28.87",
							"28.62",
							"27.72",
							"27.61",
							"27.82",
							"27.48",
							"26.78",
							"26.62",
							"26.64",
							"26.29",
							"26.01"
						],
						"x": [
							"01-01-2015 00:00",
							"02-01-2015 00:00",
							"03-01-2015 00:00",
							"01-01-2016 00:00",
							"02-01-2016 00:00",
							"03-01-2016 00:00",
							"01-01-2017 00:00",
							"02-01-2017 00:00",
							"03-01-2017 00:00",
							"01-01-2018 00:00",
							"02-01-2018 00:00",
							"03-01-2018 00:00"
						]
					},
					type: "area",
					xFormat: "%m-%d-%Y %H:%M",
				},
				axis: {
					x: {
						tick: {
							fit: false,
							count: 5
						},
						type: "timeseries"
					}
				},
				zoom: {
					enabled: {
						type: "drag"
					}
				}
				};
		});

		it("check zoom-in tick format for timeseries", () => {
			const selector = `.${CLASS.axisX} .tick text`;

			chart.$.main.selectAll(selector).each(function(d, i) {
				expect(+this.textContent).to.be.equal(2015 + i);
			});

			// when
			chart.zoom([new Date("01-01-2016 00:00"), new Date("02-01-2016 00:00")]);

			const expected = ["Jan 03", "Jan 10", "Jan 17", "Jan 24", "Jan 31"];

			chart.$.main.selectAll(selector).each(function(d, i) {
				expect(this.textContent).to.be.equal(expected[i]);
			});
		});
	});

	describe("zoom for rotated axis", () => {
		before(() => {
			args = {
				size: {
					width: 300,
					height: 250
				},
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 6025, 20, 10, 40, 15, 25]
					]
			},
			axis: {
				rotated: true
			},
				zoom: {
					rescale: true,
					enabled: {
						type: "drag"
					}
				}
			};
		});

		it("check on drag zooming", done => {
			const internal = chart.internal;
			const main = chart.$.main;
			const eventRect = main.select(`.${CLASS.eventRect}-2`).node();
			const zoomedDomain = internal.x.domain();
			const size = {w: 0, h: 0};
			let brush;
			let yAxisTickText;

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 100
				}, chart);

				brush = main.select(`.${CLASS.zoomBrush}`);
				yAxisTickText = +chart.$.main.selectAll(`.${CLASS.axisY} .tick tspan`).nodes().pop().textContent;

				size.w = +brush.attr("width");
				size.h = +brush.attr("height");

				resolve();
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 100,
							clientY: 130
						}, chart);

						resolve();
					}, 500);
				});
			}).then(() => {
				setTimeout(() => {
					expect(+brush.attr("width")).to.be.equal(size.w);
					expect(+brush.attr("height")).to.be.above(size.h);
					expect(+brush.attr("height")).to.be.equal(30);

					//console.log(size, brush.attr("width"), brush.attr("height"));
					util.fireEvent(eventRect, "mouseup", {
						clientX: 100,
						clientY: 200
					}, chart);

					// y axis rescaled?
					const tickText = +chart.$.main.selectAll(`.${CLASS.axisY} .tick tspan`).nodes().pop().textContent;

					expect(tickText).to.be.below(yAxisTickText);
					expect(tickText).to.be.equal(400);

					internal.x.domain().forEach((v, i) => {
						expect(v).to.be[i ? "below" : "above"](zoomedDomain[i]);
					});

					done();
				}, 500);
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
							["data1", 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
					],
					type: "bar"
				},
				axis: {
					rotated: true,
					x: {
						type: "category",
						tick: {
							rotate: 40,
							multiline: false
						}
					}
				},
				bar: {
					width: {
						ratio: 0.6
					}
				},
				zoom: {
					enabled: true,
					rescale: true
				}
			};
		});

		it("check on wheel zooming", () => {
			const eventRect = chart.$.main.select(`.${CLASS.eventRect}-40`).node();
			const orgDomain = {
				x: chart.internal.x.domain(),
				y: chart.internal.y.domain()
			};

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -200,
				clientX: 159,
				clientY: 137
			});

			["x", "y"].forEach(id => {
				const domain = chart.internal[id].domain();
				const org = orgDomain[id];

				if (id === "x") {
					expect(
						domain.every((v, i) => i > 0 ? v < org[i] : v > org[i])
					).to.be.true;
				} else {
					expect(
						domain.every((v, i) => i > 0 ? v < org[i] : v === org[i])
					).to.be.true;
				}
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
							["data1", 30, 350, 200],
							["data2", 130, 100, 10],
							["data3", 230, 153, 85]
					],
					types: {
							data1: "scatter",
					},
					labels: true
				},
				bubble: {
					maxR: 50
				},
				axis: {
					x: {
						type: "category"
					},
					y: {
						max: 450
					}
				},
				zoom: {
					enabled: true
				}
			};
		});

		it("check on wheel zooming", () => {
			const internal = chart.internal;
			const eventRect = chart.$.main.select(`.${CLASS.eventRect}`).node();
			const value = args.data.columns[0][2];

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -500,
				clientX: 259,
				clientY: 137
			});

			const {x, y} = chart.$.line.circles
				.filter(d => d.id === "data1" && d.value === value)
				.node()
				.getBBox();

			const target = internal.findClosestFromTargets(internal.data.targets, [x, y]);

			expect(target && target.value === value).to.be.true;
		});
	});

	describe("zoom on legend toggle", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 150]
					]
				},
				zoom: {
					enabled: true
				}
			};
		});

		it("should maintain zoom level on legend toggle",() => {
			const domain = [1, 2];
			const checkDomain = scale => {
				scale.domain().forEach((v, i) => {
					expect(v).to.be.equal(domain[i]);
				});
			}

			chart.zoom(domain);
			chart.toggle();

			checkDomain(chart.internal.zoomScale);

			chart.toggle();

			checkDomain(chart.internal.zoomScale);
		});
	});

	describe("zoom rescale culling", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
				},
				axis: {
					y: {
						tick: {
							culling: {
								max: 3
							}
						}
					}
				},
				zoom: {
					rescale: true,
					enabled: true
				}
			};
		});

		it("check y Axis culling after zoom", () => {
			chart.zoom([4,5]);

			const tickTexts = chart.$.main.selectAll(`.${CLASS.axisY} .tick text`)
				.filter(function() { return this.style.display === "block"});

			expect(tickTexts.size()).to.be.equal(args.axis.y.tick.culling.max);
		});
	});

	describe("bar's width based on ratio", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.8
					}
				},
				axis: {
					x: {
						type: "timeseries"
					}
				},
				zoom: {
					enabled: {
						type: "wheel"
					}
				}
			}
		});

		it("check bar's width during wheel zoom in/out", () => {
			const eventRect = chart.$.main.select(`.${CLASS.eventRect}-2`).node();
			const len = [];

			chart.$.bar.bars.each(function() {
				len.push(this.getTotalLength());
			});

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -100,
				clientX: 159,
				clientY: 137
			});

			chart.$.bar.bars.each(function(d, i) {
				expect(this.getTotalLength()).to.be.greaterThan(len[i]);
			});

			// when zoom out
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: 100,
				clientX: 159,
				clientY: 137
			});

			chart.$.bar.bars.each(function(d, i) {
				expect(this.getTotalLength()).to.be.equal(len[i]);
			});
		});
	});
});
