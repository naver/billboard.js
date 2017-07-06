/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

describe("SHAPE LINE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	const parseSvgPath = util.parseSvgPath;

	describe("shape-rendering for line chart", () => {
		before(() => {
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
		});

		it("Should render the lines correctly", () => {
			const target = chart.internal.main.select(".bb-chart-line.bb-target-data1");
			const commands = parseSvgPath(target.select(".bb-line-data1").attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("should not have shape-rendering when it's line chart", () => {
			chart.internal.main.selectAll(".bb-line").each(function() {
				const style = d3.select(this).style("shape-rendering");

				expect(style).to.be.equal("auto");
			});
		});

		it("should change to step chart", () => {
			args.data.type = "step";

			expect(true).to.be.ok;
		});

		it("should have shape-rendering = crispedges when it's step chart", () => {
			chart.internal.main.selectAll(".bb-line").each(function() {
				const style = d3.select(this).style("shape-rendering").toLowerCase();

				expect(style).to.be.equal("crispedges");
			});
		});

		it("should change to spline chart", () => {
			args.data.type = "spline";

			expect(true).to.be.ok;
		});

		it("should use cardinal interpolation by default", () => {
			expect(chart.internal.config.spline_interpolation_type).to.be.equal("cardinal");
		});
	});

	describe("point.show option", () => {
		before(() => {
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
		});

		it("should not show the circle for null", () => {
			const target = chart.internal.main.select(".bb-chart-line.bb-target-data1");

			expect(+target.select(".bb-circle-0").style("opacity")).to.be.equal(1);
			expect(+target.select(".bb-circle-1").style("opacity")).to.be.equal(0);
			expect(+target.select(".bb-circle-2").style("opacity")).to.be.equal(1);
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
		before(() => {
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
		});

		it("should update interpolation function", () => {
			const to = chart.internal.getInterpolateType(chart.data()[0]);

			expect(to).to.be.equal("monotone-x");
		});

		it("should not use a non-valid interpolation", () => {
			args.spline.interpolation.type = "foo";

			expect(true).to.be.ok;
		});

		it("should use cardinal interpolation when given option is not valid", () => {
			const to = chart.internal.getInterpolateType(chart.data()[0]);

			expect(to).to.be.equal("cardinal");
		});
	});

	describe("timeseries stacked area when line.connectNull=true", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["timestamps", 1495584000000, 1495605600000, 1495627200000, 1495648800000, 1495670400000],
						["data1", 300, 150,  null, 120, 140],
						["data2", 100, null, 200,  100, 100],
						["data3", 100, 160,  200,  null, 50]
					],
					x: "timestamps",
					order: "asc",
					type: "area",
					groups: [
						["data1", "data2", "data3"]
					]
				},
				line: {
					connectNull: true
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

		it("check for line path data count", () => {
			chart.internal.main.selectAll("path.bb-line").each(function(d) {
				const line = d3.select(this);

				// it should have 4 lines
				expect(line.attr("d").split("L").length).to.be.equal(4);
			});
		});
	});
});
