/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterEach, describe, expect, it} from "vitest";
import {$DRAG, $SELECT} from "../../src/config/classes";
import util from "../assets/util";
import { transition } from "d3-transition";

describe("DRAG", function() {
	let chart;
	let args: any = {
		data: {
			selection: {
				enabled: true,
				draggable: true
			},
			columns: [
				["data1", 30, 200, 100, 170, 150, 250],
				["data2", 130, 100, 140, 35, 110, 50]
			],
			types: {
				data1: "line",
				data2: "area-spline"
			},
			colors: {
				data1: "red",
				data2: "green"
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	afterEach(() => {
		chart.destroy();
	});

	describe("default extent", () => {
		it("should set dragStart xy coordinates", () => {
			const {internal} = chart;
			const xy = [95.5, 83.5];

			// when
			internal.dragstart(xy);

			expect(xy).to.deep.equal(internal.state.dragStart);

			// dragging flag to be set true
			expect(internal.state.dragging).to.be.true;
		});

		it("should set drag area and points to be selected", () => {
			const {internal} = chart;
			const {main} = chart.$;

			// when
			internal.drag([186.5, 320.5]);

			// circles are selected?
			expect(main.selectAll(`.${$SELECT.selectedCircles}`).size()).to.be.equal(2);
			expect(main.selectAll(`.${$DRAG.INCLUDED}`).size()).to.be.equal(3);
		});

		it("selected points should be unselected and drag area should be removed", () => new Promise(done => {
			const {internal} = chart;
			const {main} = chart.$;

			// when
			internal.dragend();

			setTimeout(() => {
				expect(main.selectAll(`.${$DRAG.INCLUDED}`).size()).to.be.equal(0);

				// check for selection rect
				expect(main.select(`.${$DRAG.dragarea}`).empty()).to.be.true;

				// dragging flag to be set false
				expect(internal.state.dragging).to.be.false;

				done(1);
			}, 300);
		}));
	});

	describe("selection.draggable", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 170, 150, 250],
						["data2", 130, 100, 140, 35, 110, 50]
					],
					selection: {
					  enabled: true,
					  draggable: true
					}
				}
			};
		});

		it("should select data points by dragging event", () => new Promise(done => {
			const {internal: {$el}} = chart;

			util.doDrag($el.eventRect.node(), {
				clientX: 34.5,
				clientY: 20
			}, {
				clientX: 380,
				clientY: 340,
			});

			setTimeout(() => {
				const selectedCircle = $el.chart.selectAll(`.${$SELECT.selectedCircles}`);

				expect(selectedCircle.size()).to.be.equal(2);
				done(1);
			}, 300);
		}));

		it("set options: data.type='bar'", () => {
			args.data.type = "bar";
		});

		it("bar should be selected by drag", () => new Promise(done => {
			const {internal: {$el}} = chart;

			util.doDrag($el.eventRect.node(), {
				clientX: 34.5,
				clientY: 20
			}, {
				clientX: 280,
				clientY: 340,
			});

			setTimeout(() => {
				const selected = $el.chart.selectAll(`.${$SELECT.SELECTED}`);

				
				expect(selected.size()).to.be.equal(4);

				done(1);
			}, 300);
		}));

		it("set options: data.selection.enabled=fasle", () => {
			args.data.selection.enabled = false;
		});

		it("shouldn't be selected by drag", () => new Promise(done => {
			const {internal: {$el}} = chart;

			util.doDrag($el.eventRect.node(), {
				clientX: 34.5,
				clientY: 20
			}, {
				clientX: 280,
				clientY: 340,
			});

			setTimeout(() => {
				const selected = $el.chart.selectAll(`.${$SELECT.SELECTED}`);
				
				expect(selected.size()).to.be.equal(0);

				done(1);
			}, 300);
		}));
	});

	describe("axis.x.extent", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					json: {
					  Temperature: [
						"23.43",
						"23.16",
						"27.48",
						"26.78",
						"26.62",
						"26.64",
						"26.29",
						"26.01",
						"25.84",
						"25.07",
						"24.85",
						"24.01",
					  ],
					  x: [
						"2018-01-01",
						"2018-02-01",
						"2018-03-01",
						"2018-04-01",
						"2018-05-01",
						"2018-06-01",
						"2018-07-01",
						"2018-08-01",
						"2018-09-01",
						"2018-10-01",
						"2018-11-01",
						"2018-12-01",
					  ],
					},
					type: "area",
				},
				axis: {
					x: {
						tick: {
							fit: false,
							count: 5
						},
						type: "timeseries",
						extent: ["2018-04-01", "2018-07-01"],
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

		it("drag zoom can't surpass the extent", () => new Promise(done => {
			const {internal: {$el, scale}} = chart;

			util.doDrag($el.eventRect.node(), {
				clientX: 50,
				clientY: 50
			}, {
				clientX: 550,
				clientY: 50,
			});

			setTimeout(() => {
				const zoomed = chart.zoom().map(v => Number(v).toString());

				expect(/^15225.*/.test(zoomed[0])).to.be.true;
				expect(/^1530.*/.test(zoomed[1])).to.be.true;

				done(1);
			}, 300);
		}));

		it("set options: subchart.show=true", () => {
			args.subchart = {
				show: true
			};

			args.zoom.enabled = false;
		});

		it("subchart selection width should match with extent", () => {
			const {internal: {brush, scale}} = chart;
			const overlay = brush.getSelection().select(".overlay");
			const start = scale.x(new Date(`${args.axis.x.extent[0]} 00:00:00`));
			const end = scale.x(new Date(`${args.axis.x.extent[1]} 00:00:00`));

			expect(+overlay.attr("x")).to.be.equal(start);
			expect(+overlay.attr("x") + +overlay.attr("width")).to.be.equal(end);
		});
	});
});
