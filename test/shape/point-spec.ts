/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("SHAPE POINT", () => {
	let chart;
	let args;

	beforeEach(() => {
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
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);
		});

		it("circle points are expanded?", () => {
			const index = 1;
			const r = chart.config("point.r");

			// when
			chart.internal.expandCircles(index);

			chart.$.circles.filter(d => d.x === index).each(function() {
				expect(+this.getAttribute("r")).to.be.above(r);
			});
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
					pattern: ["rectangle"]
				}
			};
		});

		it("Should render svg rect elements", () => {
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);

			circles.each(function() {
				expect(this.tagName).to.be.equal("rect");
			});
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
					pattern: [
						"<polygon points='2.5 0 0 5 5 5'></polygon>"
					]
				}
			};
		});

		it("Should render svg \"use\" elements", () => {
			const circles = chart.$.circles.filter(d => d.id === "data1");

			expect(circles.size()).to.be.equal(chart.data("data1")[0].values.length);

			circles.each(function() {
				expect(this.tagName).to.be.equal("use");
			});
		});

		it("set options point.pattern", () => {
			args.point.pattern = [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10' style='fill:#fff'></rect></g>"
			];
		});

		it("should be allowing to set groping nodes", () => {
			const innerHTML = chart.config("point.pattern")[0]
				.replace(/<\/?g>/g, "").replace(/'/g, '"');

			chart.$.defs.selectAll("g").each(function() {
				expect(this.innerHTML).to.be.equal(innerHTML);
			});
		});

		it("custom points are expanded?", () => {
			const index = 1;

			// when
			chart.internal.expandCircles(index);

			chart.$.circles.filter(d => d.x === index).each(function() {
				const scale = +this.getAttribute("transform").match(/scale\((.*)\)/)[1];

				expect(scale).to.be.equal(1.75);
			});
		});
	});

	describe("point transition", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					]
				}
			};
		});

		it("newly added points shouldn't be transitioning from the top/left", done => {
			const main = chart.$.main;
			const pos = [];
			let point;
			let interval;

			setTimeout(() => {
				interval = setInterval(() => {
					point = main.select(`.${CLASS.circles}-data2 .${CLASS.circle}-3`);
					pos.push(+point.attr("cx"));
				}, 20);

				chart.load({
					columns: [
						["data2", 44, 134, 98, 170]
					],
					done: function () {
						setTimeout(() => {
							clearInterval(interval);
							const currPos = +point.attr("cx");

							expect(Math.round(pos[0])).to.not.equal(0);
							expect(pos.every(v => v === currPos)).to.be.true;

							done();
						}, 500);
					}
				});
			}, 500);
		});
	});

	describe("point sensitivity", () => {
		before(() => {
			args = {
				size: {
					width: 400,
					height: 250
				},
				data: {
					columns: [
						["data1", 90, 40, 10],
						["data2", 5, 5, 5],
						["data3", 3, 3, 3]
					],
					groups: [["data1", "data2", "data3"]]
				},
				tooltip: {
					grouped: false
				}
			};
		});

		it("default sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 4}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(2);
		});

		it("set options point.sensitivity=3", () => {
			args.point = {
				sensitivity: 3
			};
		});

		it("lowered sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 4}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(1);
		});
	});
});
