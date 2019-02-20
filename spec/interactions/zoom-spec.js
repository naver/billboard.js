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
							if (spyOnZoom.called) {
								util.fireEvent(eventRect, "mouseup", {
									clientX: 100,
									clientY: 150
								}, chart);

								// call explicitly, due to mouseup isn't firing well programmatically.
								chart.internal.onZoomEnd();

								resolve("--> onzoom callback called!");
							}
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

    describe("zoom type drag", () => {
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
});
