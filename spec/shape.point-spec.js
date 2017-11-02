/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

describe("SHAPE POINT", () => {
	let chart;
	let args;
	let skipEach = false;

	beforeEach(function(){
		if(skipEach){
			return ;
		}
		chart = util.generate(args);
	});

	describe("default point type", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				}
			};
		});

		it("Should render svg circle elements", () => {
			const target = chart.internal.svg.select(".bb-chart-line.bb-target-data1");
			const circlesEl = target.select(".bb-circles-data1").node();
			const circles = circlesEl.getElementsByTagName("circle");

			expect(circles.length).to.be.equal(6);
		});
	});

	describe("rectangle point type", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				},
				point: {
					type: "rectangle"
				}
			};
		});

		it("Should render svg rect elements", () => {
			const target = chart.internal.svg.select(".bb-chart-line.bb-target-data1");
			const circlesEl = target.select(".bb-circles-data1").node();
			const rects = circlesEl.getElementsByTagName("rect");

			expect(rects.length).to.be.equal(6);
		});
	});

	describe("custom point type", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					]
				},
				point: {
					type: "custom",
					create(element, cssClassFn, sizeFn, fillStyleFn) {
						return element.enter().append("polygon")
							.attr("class", cssClassFn)
							.style("fill", fillStyleFn);
					},
					update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
						withTransition, flow, selectedCircles) {

						let mainCircles;
						const triangleSize = 10;

						function getPoints(d) {
							const x1 = xPosFn(d);
							const y1 = yPosFn(d) - (triangleSize * 0.5);
							const x2 = x1 - (triangleSize * 0.5);
							const y2 = y1 + triangleSize;
							const x3 = x1 + (triangleSize * 0.5);
							const y3 = y2;

							return `${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
						}

						mainCircles = element
							.attr("points", getPoints)
							.style("opacity", opacityStyleFn)
							.style("fill", fillStyleFn);

						return mainCircles;
					}
				}
			};
		});

		it("Should render svg polygon elements", () => {
			const target = chart.internal.svg.select(".bb-chart-line.bb-target-data1");
			const circlesEl = target.select(".bb-circles-data1").node();
			const polygons = circlesEl.getElementsByTagName("polygon");

			expect(polygons.length).to.be.equal(6);
		});
	});
});
