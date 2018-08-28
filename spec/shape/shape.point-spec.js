/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
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
			const target = chart.$.svg.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const circlesEl = target.select(`.${CLASS.circles}-data1`).node();
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
					pattern: ["rectangle"]
				}
			};
		});

		it("Should render svg rect elements", () => {
			const target = chart.$.svg.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const circlesEl = target.select(`.${CLASS.circles}-data1`).node();
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
					pattern: [
						"<polygon points='5 2.5 2.5 5 7.5 5'></polygon>"
					]
				}
			};
		});

		it("Should render svg \"use\" elements", () => {
			const target = chart.$.svg.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const circlesEl = target.select(`.${CLASS.circles}-data1`).node();
			const polygons = circlesEl.getElementsByTagName("use");

			expect(polygons.length).to.be.equal(6);
		});

		it("set options point.pattern", () => {
			args.point.pattern = [
				"<g><circle cx='10' cy='10' r='10'></circle><rect x='5' y='5' width='10' height='10'></rect></g>"
			];
		});

		it("should be allowing to set groping nodes", () => {
			const innerHTML = chart.config("point.pattern")[0]
				.replace(/<\/?g>/g, "").replace(/'/g, '"');

			chart.$.defs.selectAll("g").each(function() {
				expect(this.innerHTML).to.be.equal(innerHTML);
			});
		});
	});
});
