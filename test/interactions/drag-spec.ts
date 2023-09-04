/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {$DRAG, $SELECT} from "../../src/config/classes";
import util from "../assets/util";

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

		it("selected points should be unselected and drag area should be removed", done => {
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

				done();
			}, 500);
		});
	});

	describe("selection.draggable", () => {
		before(() => {
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

		it("should select data points by dragging event", done => {
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
				done();
			}, 500);
		});

		it("set options: data.type='bar'", () => {
			args.data.type = "bar";
		});

		it("bar should be selected by drag", done => {
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

				done();
			}, 500);
		});

		it("set options: data.selection.enabled=fasle", () => {
			args.data.selection.enabled = false;
		});

		it("shouldn't be selected by drag", done => {
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

				done();
			}, 500);
		});
	});
});
