/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("DRAG", function() {
	let chart;

	describe("default extent", () => {
		before(() => {
			chart = util.generate({
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
			});
		});

		it("should set dragStart xy coordinates", () => {
			const internal = chart.internal;
			const xy = [95.5, 83.5];

			// when
			internal.dragstart(xy);

			expect(xy).to.deep.equal(internal.dragStart);

			// dragging flag to be set true
			expect(internal.dragging).to.be.true;
		});

		it("should set drag area and points to be selected", () => {
			const internal = chart.internal;
			const main = chart.$.main;

			// when
			internal.drag([186.5, 320.5]);

			// circles are selected?
			expect(main.selectAll(`.${CLASS.selectedCircles}`).size()).to.be.equal(2);
			expect(main.selectAll(`.${CLASS.INCLUDED}`).size()).to.be.equal(2);

			// check for selection rect
			const dragAreaRect = main.select(`.${CLASS.dragarea}`).node().getBBox();

			expect(dragAreaRect.width).to.be.above(0);
			expect(dragAreaRect.height).to.be.above(0);
		});

		it("selected points should be unselected and drag area should be removed", done => {
			const internal = chart.internal;
			const main = chart.$.main;

			// when
			internal.dragend();

			setTimeout(() => {
				expect(main.selectAll(`.${CLASS.INCLUDED}`).size()).to.be.equal(0);

				// check for selection rect
				expect(main.select(`.${CLASS.dragarea}`).empty()).to.be.true;

				// dragging flag to be set false
				expect(internal.dragging).to.be.false;

				done();
			}, 500);
		});
	});
});
