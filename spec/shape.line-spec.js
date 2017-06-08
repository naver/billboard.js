/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {
	selectAll as d3SelectAll,
	select as d3Select,
} from "d3";
import util from "./assets/util";

describe("chart shape line", () => {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	const parseSvgPath = util.parseSvgPath;

	describe("shape-rendering for line chart", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					],
					type: "line"
				}
			};
			return expect(true).to.be.ok;
		});

		it("Should render the lines correctly", done => {
			setTimeout(() => {
				const target = chart.internal.main.select(".bb-chart-line.bb-target-data1");
				const commands = parseSvgPath(target.select(".bb-line-data1").attr("d"));

				expect(commands.length).to.be.equal(6);
				done();
			}, 500);
		});

		it("should not have shape-rendering when it's line chart", () => {
			d3SelectAll(".bb-line").each(function() {
				const style = d3Select(this).style("shape-rendering");

				expect(style).to.be.equal("auto");
			});
		});

		it("should change to step chart", () => {
			args.data.type = "step";
			return expect(true).to.be.ok;
		});

		it("should have shape-rendering = crispedges when it's step chart", () => {
			d3SelectAll(".bb-line").each(function() {
				const style = d3Select(this).style("shape-rendering")
					.toLowerCase();

				expect(style).to.be.equal("crispedges");
			});
		});

		it("should change to spline chart", () => {
			args.data.type = "spline";
			return expect(true).to.be.ok;
		});

		it("should use cardinal interpolation by default", () => {
			expect(chart.internal.config.spline_interpolation_type).to.be.equal("cardinal");
		});
	});

	describe("point.show option", () => {
		it("should change args to include null data", () => {
			args = {
				data: {
					columns: [
						["data1", 30, null, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					],
					type: "line"
				}
			};
			return expect(true).to.be.ok;
		});

		it("should not show the circle for null", done => {
			setTimeout(() => {
				const target = chart.internal.main.select(".bb-chart-line.bb-target-data1");

				expect(+target.select(".bb-circle-0").style("opacity")).to.be.equal(1);
				expect(+target.select(".bb-circle-1").style("opacity")).to.be.equal(0);
				expect(+target.select(".bb-circle-2").style("opacity")).to.be.equal(1);
				done();
			}, 500);
		});

		it("should not draw a line segment for null data", done => {
			setTimeout(() => {
				const target = chart.internal.main.select(".bb-chart-line.bb-target-data1");
				const commands = parseSvgPath(target.select(".bb-line-data1").attr("d"));
				let segments = 0;

				for (let i = 0; i < commands.length; i++) {
					commands[i].command === "L" && segments++;
				}
				expect(segments).to.be.equal(3);
				done();
			}, 500);
		});
	});

	describe("spline.interpolation option", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", -150, 120, 110, 140, 115, 125]
					],
					type: "spline"
				},
				spline: {
					interpolation: {
						type: "monotone-x"
					}
				}
			};

			return expect(true).to.be.ok;
		});

		it("should update interpolation function", () => {
			const to = chart.internal.getInterpolateType(chart.data()[0]);

			expect(to).to.be.equal("monotone-x");
		});

		it("should not use a non-valid interpolation", () => {
			args.spline.interpolation.type = "foo";
			return expect(true).to.be.ok;
		});

		it("should use cardinal interpolation when given option is not valid", () => {
			const to = chart.internal.getInterpolateType(chart.data()[0]);

			expect(to).to.be.equal("cardinal");
		});
	});
});
