/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {zoomTransform as d3ZoomTransform} from "d3-zoom";
import sinon from "sinon";
import {$AXIS, $EVENT, $GRID, $REGION, $ZOOM} from "../../src/config/classes";
import util from "../assets/util";

describe("ZOOM", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("default extent", () => {
		beforeAll(() => {
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
				const yDomain = chart.internal.scale.y.domain();
				const expectedYDomain = [-591.5, 6626.5];

				expect(yDomain[0]).to.be.equal(expectedYDomain[0]);
				expect(yDomain[1]).to.be.equal(expectedYDomain[1]);
			});

			it("should have original y domain in subchart", () => {
				const yDomain = chart.internal.scale.y.domain();
				const subYDomain = chart.internal.scale.subY.domain();

				expect(subYDomain[0]).to.be.equal(yDomain[0]);
				expect(subYDomain[1]).to.be.equal(yDomain[1]);
			});

			it("should have specified brush extent", () => {
				const brushExtent = chart.internal.brush.extent()();
				const expectedBrushExtent = [[1, 0], [2, 60]];

				expect(brushExtent[0][1]).to.be.equal(expectedBrushExtent[0][1]);
				expect(brushExtent[1][1]).to.be.equal(expectedBrushExtent[1][1]);
			});

			it("initialization with empty data", () => {
				expect(
					util.generate({
						data: {
							x: "x",
							columns: [],
							type: "line"
						},
						zoom: {
							enabled: true
						}
					})
				).to.not.throw;
			});
		});
	});

	describe("zoom event", () => {
		const spyOnZoomStart = sinon.spy();
		const spyOnZoom = sinon.spy(domain => (zoomDomain = domain));
		const spyOnZoomEnd = sinon.spy(domain => (zoomDomain = domain));
		let zoomDomain;
		let eventOrder: string[] = [];

		beforeAll(() => {
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
					enabled: true,
					type: "wheel",
					onzoomstart: spyOnZoomStart,
					onzoom: spyOnZoom,
					onzoomend: spyOnZoomEnd
				},
				transition: {
					duration: 0
				}
			};
		});

		it("check for data zoom", () => {
			const {coords} = chart.internal.state.eventReceiver;
			const xValue = coords[2].x;

			// when
			chart.zoom([0,3]);  // zoom in

			expect(coords[2].x).to.be.above(xValue);
		});

		it("check for zoom event callbacks", () => new Promise(done => {
			const {$el: {eventRect}} = chart.internal;
			const rect = eventRect.node();

			// must set initial zoom level or the following pans will fail
			chart.zoom([0, 3]);
			new Promise((resolve, reject) => {
				util.fireEvent(rect, "mousedown", {
					clientX: 100,
					clientY: 150
				}, chart);

				resolve(true);
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (spyOnZoomStart.called) {
							expect(spyOnZoomStart.args[0][0].type).to.be.equal("start");

							util.fireEvent(rect, "mousemove", {
								clientX: 120,
								clientY: 150
							}, chart);

							resolve("--> onzoomstart callback called!");
						}
					}, 300);
				});
			}).then((msg) => {
				console.log(msg);

				return new Promise((resolve, reject) => {
					setTimeout(() => {
						if (spyOnZoom.called) {
							expect(spyOnZoom.args[0][0].map(Math.round)).to.be.deep.equal([0, 3]);

							util.fireEvent(rect, "mouseup", {
								clientX: 120,
								clientY: 150
							}, chart);

							// call explicitly, due to mouseup isn't firing well programmatically.
							chart.internal.onZoomEnd();

							resolve("--> onzoom callback called!");
						};
					}, 300);
				})
			}).then((msg) => {
				console.log(msg);
				console.log("--> onzoomend callback called!");

				expect(spyOnZoomEnd.called).to.be.true;

				done(1);
			});
		}));

		it("check for data zoom", () => {
			const {coords} = chart.internal.state.eventReceiver;
			const xValue = coords[2].x;

			// when
			chart.zoom([0,3]);  // zoom in

			expect(coords[2].x).to.be.above(xValue);
		});

		it("check for x axis resize after zoom", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${$AXIS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0,4]);
			chart.resize({width:400});

			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for x axis resize after zoom in/out", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${$AXIS.axisX} > .domain`);
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
			expect(chart.internal.scale.zoom.domain().map(Math.round)).to.be.deep.equal(zoomValue); // zoomScale value is updated on zoom in

			chart.unzoom(); // zoom set to initial
			expect(chart.internal.scale.zoom).to.be.null; // zoomScale null on zoom out to initial

		});

		it("check for subX domain values after zoom", () => {
			const zoomValue = [1, 3];
			const {x, subX} = chart.internal.scale;

			chart.zoom(zoomValue); // zoom in
			expect(subX.domain()).to.not.deep.equal(zoomValue); // subX value not updated on zoom in

			chart.unzoom(); // zoom set to initial
			expect(subX.domain()).to.be.deep.equal(x.orgDomain()); // subX value not updated on zoom in
		});

		it("set options: zoom.type='drag'", () => {
			args.zoom = {
				enabled: true,
				type: "drag",
				onzoomstart: () => {
					eventOrder.push("start");
				},
				onzoom: () => {
					eventOrder.push("zoom");
				},
				onzoomend: () => {
					eventOrder.push("end");
				}
			};
		});

		it("check on zoom event triggering during drag zooming", () => new Promise(done => {
			const {$: {main}, internal: {scale, $el}} = chart;
			const eventRect = $el.eventRect.node();;

		
			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 50,
					clientY: 100
				}, chart);

				resolve(true);
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 150,
							clientY: 100
						}, chart);

						resolve(true);
					}, 300);
				});
			}).then(() => {
				setTimeout(() => {
					util.fireEvent(eventRect, "mouseup", {
						clientX: 150,
						clientY: 100
					}, chart);
	
					expect(eventOrder).to.be.deep.equal(["start", "zoom", "end"]);

					// when
					chart.unzoom();

					// the call of .unzoom() shouldn't be triggering zooming event
					expect(eventOrder).to.be.deep.equal(["start", "zoom", "end"]);

					done(1);
				}, 300);
			});
		}));
	});

	describe("zoom wheel", () => {
		beforeAll(() => {
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
				},
				grid: {
					x: {
						show: true,
						lines: [{ value: 3, text: "123" }]
					},
					y: {
						lines: [
							{value: 100, text: "Label on 100"},
						]
					}
				},
				zoom: {
					rescale: true,
					enabled: true
				}
			};
		});

		it("check with rescale option", () => {
			const orgDomain = {
				x: chart.internal.scale.x.domain(),
				y: chart.internal.scale.y.domain()
			};
			const eventRect = chart.internal.$el.eventRect.node();
			const xGridLine = chart.$.main.select(`.${$GRID.xgridLine} line`);
			const xPos = {x1: +xGridLine.attr("x1"), x2: +xGridLine.attr("x2")};

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -100,
				clientX: 159,
				clientY: 137
			});

			["x", "y"].forEach(id => {
				const domain = orgDomain[id];

				// x Grid line also should zoom-in
				if (id === "x") {
					expect(+xGridLine.attr("x1")).to.be.greaterThan(xPos.x1);
					expect(+xGridLine.attr("x2")).to.be.greaterThan(xPos.x2);
				}

				expect(
					chart.internal.scale[id].domain()
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
					chart.internal.scale[id].domain()
						.every((v, i) => v === domain[i])
				).to.be.true;
			});
		});

		it("grid also should scale", () => new Promise(done => {
			const getX = selector => chart.$.main.select(selector).node().getBoundingClientRect().x;

			// when zoom in
			chart.zoom([1,3.5]);

			setTimeout(() => {
				expect(
					getX(`.${$GRID.xgrids} line:nth-child(2)`)
				).to.be.equal(
					getX(`.${$AXIS.axisX} g.tick:nth-child(5) line`)
				);

				done(1);
			}, 350);
		}));

		it("should eventReceiver size to be updated", () => new Promise(done => {
			const {internal: {$el, state: {eventReceiver}}} = chart;
			const eventRect = $el.eventRect.node();
			const {w} = eventReceiver.coords[1];

			// tooltip position
			chart.tooltip.show({x:2});
			const tooltipLeft = parseInt(chart.$.tooltip.style("left"), 10);
			chart.tooltip.hide();

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -100,
				clientX: 159,
				clientY: 137
			});

			setTimeout(() => {
				expect(eventReceiver.coords[1].w).to.be.greaterThan(w);

				chart.tooltip.show({x:2});
				expect(parseInt(chart.$.tooltip.style("left"), 10)).to.be.below(tooltipLeft);

				done(1);
			}, 300);
		}));
	});

	describe("wheel zoom doesn't stick", () => {
		beforeAll(() => {
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
				},
				zoom: {
					enabled: true
				}
			};
		});

		function drag(down, move, up) {
			const eventRect = chart.internal.$el.eventRect.node();
			return new Promise((resolve) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: down.x,
					clientY: down.y
				}, chart);
				resolve(true);
			}).then(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: move.x,
							clientY: move.y
						}, chart);

						resolve(true);
					}, 300);
				})
			}).then(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mouseup", {
							clientX: up.x,
							clientY: up.y
						}, chart);
						resolve(true);
					}, 300);
				});
			})
		}

		it("check doesn't stick left",  () => new Promise(done => {
			const {internal: {$el}} = chart;
			const eventRect = $el.eventRect.node();

			chart.zoom([0, 2]);
			drag({x: 150, y: 150}, {x: 2000, y: 120}, {x: 2000, y: 120}).then(() => {
				expect(d3ZoomTransform(eventRect).x).to.approximately(0, 0.01);
				expect(chart.zoom()[0]).to.approximately(0, 0.1);
				drag({x: 150, y: 150}, {x: 0, y: 130}, {x: 0, y: 130}).then(() => {
					expect(d3ZoomTransform(eventRect).x).to.approximately(-150, 0.01);
					expect(chart.zoom()[0]).to.greaterThan(0);

					done(1);
				});
			});
		}));

		it("check doesn't stick right",  () => new Promise(done => {
			chart.zoom([4, 5]);
			drag({x: 150, y: 150}, {x: -2000, y: 120}, {x: -2000, y: 120}).then(() => {
				expect(chart.zoom()[1]).to.greaterThan(5);
				drag({x: 150, y: 150}, {x: 300, y: 130}, {x: 300, y: 130}).then(() => {
					expect(chart.zoom()[1]).to.lessThan(5);
					done(1);
				});
			});
		}));

		it("set rotated", () => {
			args.axis = {rotated: true};
		});

		it("check doesn't stick rotated",  () => new Promise(done => {
			chart.zoom([0, 3]);
			drag({x: 150, y: 150}, {x: 150, y: 2000}, {x: 150, y: 2000}).then(() => {
				expect(chart.zoom()[0]).to.approximately(0, 0.1);
				drag({x: 150, y: 150}, {x: 150, y: 0}, {x: 150, y: 0}).then(() => {
					expect(chart.zoom()[0]).to.greaterThan(0);
					done(1);
				});
			});
		}));
	});


	describe("zoom type drag #1", () => {
		const spy = sinon.spy();
		let clickedData;

		beforeAll(() => {
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
					enabled: true,
					type: "drag"
				},
				transition: {
					duration: 0
				}
			};
		});

		it("check event props on zoomEnd to not throw error.", () => {
			const {internal} = chart;

			internal.zoom.startEvent = {
				type: "touch",
				changedTouches: [1]
			};

			expect(internal.onZoomEnd()).to.not.throw;
		});

		it("check for data zoom", () => new Promise(done => {
			const {eventReceiver} = chart.internal.state;
			const xValue = eventReceiver.coords[2].x;

			// when
			chart.zoom([0, 2]);  // zoom in

			setTimeout(() => {
				expect(eventReceiver.coords[2].x).to.be.above(xValue);
				done(1);
			}, 350);
		}));

		it("check for x axis resize after zoom", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${$AXIS.axisX} > .domain`);
			const pathValue = +domain.attr("d").match(rx)[1];

			chart.zoom([0, 4]);
			chart.resize({width: 400});

			expect(+domain.attr("d").match(rx)[1]).to.be.above(pathValue);
		});

		it("check for x axis resize after zoom in/out", () => {
			const main = chart.$.main;
			const rx = /H(\d+)/;

			const domain = main.select(`.${$AXIS.axisX} > .domain`);
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

			const resetBtn = chart.$.chart.select(`.${$ZOOM.buttonZoomReset}`);

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

			const resetBtn = chart.$.chart.select(`.${$ZOOM.buttonZoomReset}`);

			expect(resetBtn.empty()).to.be.false;
			expect(resetBtn.text()).to.be.equal("test");
		});

		it("set options zoom.resetButton.onclick", () => {
			args.zoom.resetButton.onclick = spy;
		});

		it("check for the reset zoom button onclick callback", () => {
			// when
			chart.zoom([0, 4]);

			const resetBtn = chart.$.chart.select(`.${$ZOOM.buttonZoomReset}`).node();

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
			const axisY = chart.$.main.select(`.${$AXIS.axisY}`);

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
			const {eventRect} = chart.internal.$el;
			const circle = util.getBBox(chart.$.circles);

			util.fireEvent(eventRect.node(), "click", {
				clientX: circle.x + 7,
				clientY: circle.y + 10
			}, chart);

			expect(clickedData).to.not.be.undefined;
		});

		it("shouldn't throw error on '.flow() -> .zoom()' flow calls", () => new Promise(done => {
			// when flow
			chart.flow({
				columns: [
					["data1", 37]
				],
				length: 0,
				duration: 0,
				done: function() {
					expect(this.zoom([1,2])).to.not.throw;
					done(1);
				}
			});
		}));
	});

	describe("zoom type drag #2: with data loading", () => {
		const spy = sinon.spy();
		let clickedData;

		beforeAll(() => {
			args = {
				size: {
					width: 300,
					height: 250
				},
				data: {
					x: "x",
					columns: [
					  ["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
					  ["data1", 30, 200, 100, 400, 150, 250],
					  ["data2", 130, 340, 200, 500, 250, 350]
					],
					type: "line"
				},
				zoom: {
					enabled: true,
					type: "drag",
					rescale: true
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};
		});

		it("should unzoom with new loaded domain.", () => {
			let domain;

			// 1) zoom in
			chart.zoom([
				"2013-01-01", "2013-01-02"
			]);

			// 2) unzoom & load new data
			chart.unzoom();
			chart.load({
				columns: [
				  [
					"x",
					"2013-01-01",
					"2013-01-02",
					"2013-01-03",
					"2013-01-04",
					"2013-01-05",
					"2013-01-06",
					"2013-01-07",
					"2013-01-08",
					"2013-01-09",
					"2013-01-10"
				  ],
				  ["data1", 30, 200, 100, 400, 150, 250, 200, 200, 200, 200],
				  ["data2", 130, 340, 200, 500, 250, 350, 300, 300, 300, 300]
				],
				done() {
					domain = this.internal.scale.x.domain();
				}
			  });

			// 3) zoom in again
			chart.zoom([
				"2013-01-01", "2013-01-02"
			]);

			// 4) unzoom
			chart.unzoom();

			// expect to reset with new domain
			expect(chart.internal.scale.x.domain()).to.be.deep.equal(domain);
		});
	});
	

	describe("zoom on regions", () => {
		beforeAll(() => {
			args = {
				zoom: {
					enabled: true,
					type: "drag"
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

		it("region area should be resized on zoom", () => new Promise(done => {
			const main = chart.$.main;
			const regionRect = main.select(`.${$REGION.region}-0 rect`);
			const lineWidth = util.getBBox(chart.$.line.lines).width;

			const size = {
				width: +regionRect.attr("width"),
				x: +regionRect.attr("x")
			};

			// when
			chart.zoom([1,3]);

			setTimeout(() => {
				expect(+regionRect.attr("width")).to.be.above(size.width);
				expect(+regionRect.attr("x")).to.be.below(size.x);
				expect(+util.getBBox(chart.$.line.lines).width).to.be.above(lineWidth);

				done(1);
			}, 350);
		}));
	});

	describe("zoom scale consistency for dragging", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 3150, 250],
						["data2", 50, 20, 10, 40, 15, 6025]
					]
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("zoom scale should maintained on dragging interaction", () => new Promise(done => {
			const internal = chart.internal;
			const {main} = internal.$el;
			const zoomDomain = [0,2];

			// when
			chart.zoom(zoomDomain);

			const eventRect = main.select(`.${$EVENT.eventRect}-2`).node();
			const zoomedDomain = internal.zoom.getDomain().map(Math.round);

			expect(zoomedDomain).to.be.deep.equal(zoomDomain);

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 150
				}, chart);

				resolve(true);
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 130,
							clientY: 150
						}, chart);

						resolve(true);
					}, 300);
				});
			}).then(() => {
				setTimeout(() => {
					util.fireEvent(eventRect, "mouseup", {
						clientX: 150,
						clientY: 150
					}, chart);

					//expect(internal.scale.x.domain()).to.be.deep.equal(zoomedDomain);

					done(1);
				}, 300);
			});
		}));
	});

	describe("zoom tick fit", () => {
		beforeAll(() => {
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
					enabled: true,
					type: "drag"
				},
				transition: {
					duration: 0
				}
			};
		});

		it("check zoom-in tick format for timeseries", () => {
			const selector = `.${$AXIS.axisX} .tick text`;

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
		beforeAll(() => {
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
					enabled: true,
					type: "drag"
				}
			};
		});

		it("check on drag zooming", () => new Promise(done => {
			const {$: {main}, internal: {scale, $el}} = chart;
			const eventRect = $el.eventRect.node();;

			const zoomedDomain = scale.x.domain();
			const size = {w: 0, h: 0};
			let brush;
			let yAxisTickText;

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 100
				}, chart);

				brush = main.select(`.${$ZOOM.zoomBrush}`);
				yAxisTickText = +chart.$.main.selectAll(`.${$AXIS.axisY} .tick tspan`).nodes().pop().textContent;

				size.w = +brush.attr("width");
				size.h = +brush.attr("height");

				resolve(true);
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 100,
							clientY: 130
						}, chart);

						resolve(true);
					}, 300);
				});
			}).then(() => {
				setTimeout(() => {
					expect(+brush.attr("width")).to.be.equal(size.w);
					expect(+brush.attr("height")).to.be.above(size.h);
					expect(+brush.attr("height")).to.be.equal(30);

					util.fireEvent(eventRect, "mouseup", {
						clientX: 100,
						clientY: 200
					}, chart);

					// y axis rescaled?
					const tickText = +main.selectAll(`.${$AXIS.axisY} .tick tspan`).nodes().pop().textContent;

					expect(tickText).to.be.below(yAxisTickText);
					expect(tickText).to.be.equal(400);

					scale.x.domain().forEach((v, i) => {
						expect(v).to.be[i ? "below" : "above"](zoomedDomain[i]);
					});

					done(1);
				}, 300);
			});
		}));

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
			const {internal: {scale, $el}} = chart;
			const {eventRect} = $el;

			const orgDomain = {
				x: scale.x.domain(),
				y: scale.y.domain()
			};

			// when zoom in
			util.fireEvent(eventRect.node(), "wheel", {
				deltaX: 0,
				deltaY: -200,
				clientX: 259,
				clientY: 137
			});

			["x", "y"].forEach(id => {
				const domain = scale[id].domain();
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
			const eventRect = chart.$.main.select(`.${$EVENT.eventRect}`).node();
			const value = args.data.columns[0][2];

			// when zoom in
			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: -500,
				clientX: 259,
				clientY: 137
			});

			const {x, y} = chart.$.circles
				.filter(d => d.id === "data1" && d.value === value)
				.node()
				.getBBox();

			const target = internal.findClosestFromTargets(internal.data.targets, [x, y]);

			expect(target && target.value === value).to.be.true;
		});
	});

	describe("zoom on legend toggle", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 150]
					]
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("should maintain zoom level on legend toggle",() => {
			const domain = [1, 2];
			const checkDomain = scale => {
				scale.domain().forEach((v, i) => {
					expect(Math.round(v)).to.be.equal(domain[i]);
				});
			}

			chart.zoom(domain);
			chart.toggle();

			checkDomain(chart.internal.scale.zoom);

			chart.toggle();

			checkDomain(chart.internal.scale.zoom);
		});
	});

	describe("zoom rescale culling", () => {
		beforeAll(() => {
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

			const tickTexts = chart.$.main.selectAll(`.${$AXIS.axisY} .tick text`)
				.filter(function() { return this.style.display === ""});

			expect(tickTexts.size()).to.be.equal(args.axis.y.tick.culling.max);
		});
	});

	describe("bar's width based on ratio", () => {
		beforeAll(() => {
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
			const {$: {bar}, internal: {$el: {eventRect}}} = chart;
			const len: number[] = [];

			bar.bars.each(function() {
				len.push(this.getBoundingClientRect().width);
			});

			// when zoom in
			util.fireEvent(eventRect.node(), "wheel", {
				deltaX: 0,
				deltaY: -100,
				clientX: 159,
				clientY: 137
			});

			bar.bars.each(function(d, i) {
				expect(this.getBoundingClientRect().width).to.be.greaterThan(len[i]);
			});

			// when zoom out
			util.fireEvent(eventRect.node(), "wheel", {
				deltaX: 0,
				deltaY: 100,
				clientX: 159,
				clientY: 137
			});

			bar.bars.each(function(d, i) {
				expect(this.getBoundingClientRect().width).to.be.closeTo(len[i], 1);
			});
		});

		it("set options: zoom.entabled.type='drag'", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar"
				},
				bar: {
					width: {
						ratio: 0.8
					}
				},
				zoom: {
					enabled: true
				}
			};
		});

		it("bar width should scales as zoom scales", () => new Promise(done => {
			const {bars} = chart.$.bar;
			const width: number[] = [];

			bars.each(function() {
				width.push(this.getBoundingClientRect().width);
			})

			// when
			chart.zoom([2,5]);

			setTimeout(() => {
				let last;

				bars.each(function(d, i) {
					const w = Math.round(this.getBoundingClientRect().width);

					expect(w).to.be.greaterThan(width[i]);

					last && expect(last).to.be.equal(w);
					last = w;
				});

				done(1);
			}, 300);
		}));
	});

	describe("bar's width with x Axis min/max", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2022-08-01", "2022-08-02", "2022-08-03", "2022-08-04", "2022-08-05", "2022-08-06"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar",
					groups: [["data1", "data2"]]
				},
				axis: {
					x: {
					  type: "timeseries",
					  min: "2022-08-01",
					  max: "2022-08-26"
					}
				},
				zoom: {
					enabled: true
				}
			};
		});

		it("check bar's width during zoom in/out: timeseries", () => new Promise(done => {
			const width: number[] = [];
			const {bar: {bars}} = chart.$;

			bars.each(function() {
				width.push(this.getBoundingClientRect().width);
			});

			new Promise(resolve => {
				// when
				chart.zoom(["2022-08-01", "2022-08-08"]);
				
				setTimeout(resolve, 300);
			}).then(() => {
				return new Promise(resolve => {
					bars.each(function(d, i) {
						expect(this.getBoundingClientRect().width > width[i]).to.be.true;
					});

					// when
					chart.unzoom();

					setTimeout(resolve, 300);
				});
			}).then(() => {
				bars.each(function(d, i) {
					expect(this.getBoundingClientRect().width).to.be.equal(width[i]);
				});

				done(1);
			});
		}));

		it("set options: axis.x.type='indexed'", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar",
					groups: [["data1", "data2"]]
				},
				axis: {
					x: {
						min: -2,
						max: 30
					}
				},
				zoom: {
					enabled: true
				}
			}
		});

		it("check bar's width during zoom in/out: indexed", () => new Promise(done => {
			const width: number[] = [];
			const {bar: {bars}} = chart.$;

			bars.each(function() {
				width.push(this.getBoundingClientRect().width);
			});

			new Promise(resolve => {
				// when
				chart.zoom([1, 3]);
				
				setTimeout(resolve, 300);
			}).then(() => {
				return new Promise(resolve => {
					bars.each(function(d, i) {
						expect(this.getBoundingClientRect().width > width[i]).to.be.true;
					});

					// when
					chart.unzoom();

					setTimeout(resolve, 300);
				});
			}).then(() => {
				bars.each(function(d, i) {
					expect(this.getBoundingClientRect().width).to.be.equal(width[i]);
				});

				done(1);
			});
		}));
	});

	describe("Multiple Xs zooming", () => {
		beforeAll(() => {
			args = {
				"data": {
				"columns": [
					[
						"x",
						"2020-07-27 17:36:11",
						"2020-07-24 00:04:03",
						"2020-07-19 16:49:12",
						"2020-07-17 15:32:12",
						"2020-07-12 12:27:07",
						"2020-07-10 18:18:08",
						"2020-07-09 11:07:12",
						"2020-07-03 11:48:48",
						"2020-07-02 05:28:09",
						"2020-06-26 20:07:06",
						"2020-06-24 08:09:06",
						"2020-06-19 10:52:57",
						"2020-06-18 13:31:57",
						"2020-06-14 16:34:53",
						"2020-06-11 09:48:52",
						"2020-06-10 14:45:52",
						"2020-06-07 20:02:53",
						"2020-06-07 03:37:49",
						"2020-06-06 10:39:53",
						"2020-06-05 16:34:53",
						"2020-06-04 22:02:49",
						"2020-06-04 06:58:49",
						"2020-06-03 12:57:49",
						"2020-06-02 18:52:49",
						"2020-06-02 01:47:47",
						"2020-06-01 10:10:47",
						"2020-05-31 15:35:47",
						"2020-05-30 21:07:46",
						"2020-05-30 05:29:05",
						"2020-05-29 11:27:14",
						"2020-05-28 17:14:08",
						"2020-05-28 00:31:06",
					],
					[
						"data1",
						"91538160",
						"71160364",
						"94240483",
						"56610209",
						"66834305",
						"56696555",
						"4699982",
						"60275153",
						"39488196",
						"96218675",
						"453234",
						"59625804",
						"13768388",
						"10245038",
						"70210880",
						"26642773",
						"61205182",
						"42996467",
						"5741450",
						"82111637",
						"53314635",
						"79181678",
						"60427615",
						"50784216",
						"43681850",
						"22326434",
						"10789463",
						"41478216",
						"29221927",
						"18432167",
						"11748761",
						"4582908",
					],
					[
						"x2",
						"2020-07-25 10:41:05",
						"2020-07-17 20:23:03",
						"2020-07-12 00:03:07",
						"2020-07-02 15:44:10",
						"2020-06-18 21:47:56",
						"2020-06-11 10:37:52",
						"2020-06-07 08:21:50",
						"2020-06-05 12:51:51",
					],
					[
						"data2",
						"90",
						"90",
						"70",
						"80",
						"90",
						"90",
						"100",
						"100",
					],
					],
					"xFormat": "%Y-%m-%d %H:%M:%S",
					"axes": {
						"data1": "y",
						"data2": "y2"
					},
					"xs": {
						"data1": "x",
						"data2": "x2"
					}
				},
				"zoom": {
					"enabled": true,
					type: "drag"
				},
				"axis": {
					"x": {
						"type": "timeseries",
						tick: {
							format: "%Y-%m-%d %H:%M:%S"
						}
					},
					"y2": {
						"show": true,
					}
				},
				"point": {
					"focus": {
						"only": true
					}
				}
			}
		});

		it("shouldn't be throwing error during the zoom", () => {
			chart.tooltip.show({
				data: {
					x: new Date("2020-07-19 16:49:12"),
					id: "data1",
					value: 94240483
				}
			});

			expect(
				chart.zoom([
					new Date("2020-07-04T22:07:43.415Z"),
					new Date("2020-07-22T20:25:17.875Z")
				])
			).to.not.throw;
		});
	});

	describe("with API combination", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
					],
					type: "line",
				},
				zoom: {
					enabled: true, 
				},
				transition: {
					duration: 0
				}
			};
		});

		it("shouldn't be throwing error during the zoom", () => new Promise(done => {
			const line = chart.$.line.lines.node();
			const eventRect = chart.internal.$el.eventRect.node();

			// when
			chart.zoom([24, 30]);

			const len = line.getTotalLength();

			util.fireEvent(eventRect, "wheel", {
				deltaX: 0,
				deltaY: 500,
				clientX: 159,
				clientY: 137
			});

			setTimeout(() => {
				expect(line.getTotalLength()).to.be.below(len);

				done(1);
			}, 350);
		}));
	});

	describe("with region API combination", () => {
		beforeAll(() => {
			args = {
				data: {
					type: "area",
					json: [
						{
						  value: 467,
						  timestamp: 1651217329888,
						},
						{
						  value: 467,
						  timestamp: 1651217929888,
						},
						{
						  value: 468,
						  timestamp: 1651218529888,
						},
						{
						  value: 468,
						  timestamp: 1651219129888,
						},
						{
						  value: 469,
						  timestamp: 1651219729888,
						},
						{
						  value: 470,
						  timestamp: 1651220329888,
						  isWithinThreshold: false,
						},
						{
						  value: 470,
						  timestamp: 1651220929888,
						  isWithinThreshold: false,
						},
						{
						  value: 471,
						  timestamp: 1651221529888,
						  isWithinThreshold: false,
						},
						{
						  value: 470,
						  timestamp: 1651222129888,
						  isWithinThreshold: false,
						},
						{
						  value: 469,
						  timestamp: 1651222729888,
						},
						{
						  value: 468,
						  timestamp: 1651223329888,
						},
						{
						  value: 468,
						  timestamp: 1651223929888,
						},
						{
						  value: 468,
						  timestamp: 1651224529888,
						},
						{
						  value: 467,
						  timestamp: 1651225129888,
						},
						{
						  value: 465,
						  timestamp: 1651225729888,
						},
						{
						  value: 464,
						  timestamp: 1651226329888,
						},
						{
						  value: 464,
						  timestamp: 1651226929888,
						},
						{
						  value: 462,
						  timestamp: 1651227529888,
						},
						{
						  value: 462,
						  timestamp: 1651228129888,
						}
					],
					keys: {
						value: ["value"],
						x: "timestamp",
					},
				},
				zoom: {
					enabled: true,
					type: "drag"
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d %H:%M:%S"
						}
					}
				}
			};
		});

		it("shoudn't throw error on zoom -> unzoom -> regions call", () => {
			// when
			try {
				chart.zoom([
					"2022-04-29 16:48:49",
					"2022-04-29 17:28:49"
				]);
				chart.unzoom();
				chart.regions([{
					start: 1651217329888,
					end: 1651228129888
				}]);
			} catch (e) {
				throw Error(e);
			}

			expect(true).to.be.true;
		});
	});
});
