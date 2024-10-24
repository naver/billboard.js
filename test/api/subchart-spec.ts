/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import sinon from "sinon";
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {fireEvent} from "../assets/helper";

describe("API subchart", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("Initialization", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 500, 60]
					]
				},
				axis: {
					x: {
						tick: {
							culling: {
								max: 3
							}
						}
					}
				},
				subchart: {
					show: true,
					axis: {
						x: {
							tick: {
								text: {
									show: false
								}
							}
						}
					}
				}
			};
		});

		it("should initialize without error", () => {
			// will reach this, if no error occurs on the generation
			expect(true).to.be.ok;
		});
	});

	describe(".subchart.show/hide/toggle()", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "line",
				},
				subchart: {
					show: false
				}
			};
		});

		it("check subchart interactions", () => {
			const {$el: {axis, subchart}} = chart.internal;

			expect(subchart.main).to.be.null;

			// when
			chart.subchart.show();

			expect(subchart.main).to.be.not.null;

			// when
			chart.subchart.hide();

			expect(subchart.main.style("display")).to.be.equal("none");

			// when
			chart.subchart.toggle();

			expect(subchart.main.style("display")).to.be.not.equal("none");
			const xAxisYPos = util.parseNum(axis.x.attr("transform"));


			// when
			chart.subchart.toggle();

			expect(subchart.main.style("display")).to.be.equal("none");
			expect(util.parseNum(axis.x.attr("transform"))).to.be.above(xAxisYPos);
		});

		it("dynamic data load", () => new Promise(done => {
			// when
			chart.subchart.show();

			const path = chart.internal.$el.subchart.line.attr("d");

			chart.subchart.hide();

			chart.load({
				columns: [
					["data1", 30, 20, 50]
				],
				done: function() {
					// show subchart again
					this.subchart.show();

					const currentPath =  this.internal.$el.subchart.line.attr("d");

					expect(currentPath).to.be.not.equal(path);
					expect(currentPath).to.be.equal("M5.873,38.694L299.5,55.083L593.127,5.917");
					done(1);
				}
			});
		}));
	});

	describe("usage with other combination", () => {
		const spy = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					type: "line"
				},
				subchart: {
					show: true,
					showHandle: true
				},
				transition: {
					duration: 0
				},
				zoom: {
					onzoomstart: spy
				}
			};
		});

		it("Zoom reset button should be hidden during subchart interaction", () => {
			let {eventRect} = chart.internal.$el;
			
			eventRect = eventRect.node();

			const rect = eventRect.getBoundingClientRect();

			// when
			chart.zoom.enable("drag");
			chart.zoom([1,2]);

			const {zoomResetBtn} = chart.internal.$el;

			expect(zoomResetBtn.style("display")).to.be.equal("inline");

			// when
			chart.subchart.toggle();

			expect(zoomResetBtn.style("display")).to.be.equal("none");

			// when
			fireEvent(eventRect, "click", {
				clientX: rect.x + 10,
				clientY: rect.y
			}, chart);

			expect(spy.calledOnce).to.be.false;
		});
	});

	describe(".subchart() / .subchart.reset()", () => {
		const spy = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					],
					type: "line"
				},
				axis: {
					y: {
						show: false
					}
				},
				subchart: {
					show: true,
					showHandle: true
				}
			};
		});

		it("check subchart selection and reset", () => {
			const {brush, scale: {x, subX}} = chart.internal;
			const range = [1, 3];

			// when
			chart.subchart(range);

			expect(chart.subchart()).to.deep.equal(range);		

			const selection = brush.getSelection().select(".selection");
			const posX = +selection.attr("x");
			const width = +selection.attr("width");

			expect(posX).to.be.equal(subX(range[0]));
			expect(posX + width).to.be.closeTo(subX(range[1]), 1);

			// when
			chart.subchart.reset();

			expect(selection.attr("width")).to.be.null;
			expect(x.domain()).to.be.deep.equal(subX.domain());
		});

		it("when trying to give out of bounds data.", () => {
			const {brush, scale: {x, subX}} = chart.internal;
			const selection = brush.getSelection().select(".selection");
			const range = [100, 200];

			// when
			chart.subchart(range);

			expect(chart.subchart()).to.deep.equal(x.orgDomain());
			expect(selection.attr("width")).to.be.null;
			expect(x.domain()).to.be.deep.equal(subX.domain());

			// when
			chart.subchart([3, 1]);

			expect(selection.attr("width")).to.be.null;
			expect(x.domain()).to.be.deep.equal(subX.domain());

			// when
			chart.subchart([2, 2]);

			expect(selection.attr("width")).to.be.null;
			expect(x.domain()).to.be.deep.equal(subX.domain());
		});

		it("set options: subchart.onbrush", () => {
			args.subchart.onbrush = spy;
		});

		it("onbrush callback should be called once.", () => {
			const range = [1, 2.5];

			expect(spy.callCount).to.be.equal(0);

			// when
			chart.subchart(range);

			expect(spy.callCount).to.be.equal(1);
			expect(spy.args[0][0]).to.be.deep.equal(range);
			
		});

		it("only first range value is updated?", () => {
			const range = [0, 1];

			// when
			chart.subchart(range);

			const handlebar = chart.internal.brush.getSelection()
				.selectAll(".handle--custom"); // .filter(":last-child").node();

			// when
			util.doDrag(handlebar.node(), {clientX: 100, clientY: 0}, {clientX: 150, clientY: 0}, chart);

			expect(chart.subchart()[1]).to.be.equal(range[1]);
		});

		it("set options: axis.x.type='timeseries'", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", '2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05'],
						["data1", 30, 200, 100, 170, 150],
					],
					type: "line"
				  },
				axis: {
					x: {
						type: "timeseries"
					}
				},
				subchart: {
					show: true,
					showHandle: true
				}
			};
		});

		it("when x is timeseries", () => {
			const {brush, scale: {x, subX}} = chart.internal;
			const range = ["2023-08-03", "2023-08-05"];
			const rangeParsed = range.map(v => new Date(`${v} 00:00`));

			// when
			chart.subchart(range);

			const selection = brush.getSelection().select(".selection");
			const posX = +selection.attr("x");
			const width = +selection.attr("width");

			expect(posX).to.be.equal(subX(rangeParsed[0]));
			expect(posX + width).to.be.closeTo(subX(rangeParsed[1]), 1);

			// when
			chart.subchart.reset();

			expect(selection.attr("width")).to.be.null;
			expect(x.domain()).to.be.deep.equal(subX.domain());
		});
	});
});
