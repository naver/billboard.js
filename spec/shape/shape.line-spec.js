/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE LINE", () => {
	let chart;
	let args;
	let skipEach = false;

	beforeEach(() => {
		if (skipEach) {
			return;
		}
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
				},
				line: {
					step: {}
				}
			};
		});

		it("Should render the lines correctly", () => {
			const target = chart.internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const commands = parseSvgPath(target.select(`.${CLASS.line}-data1`).attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("should not have shape-rendering when it's line chart", () => {
			chart.internal.main.selectAll(`.${CLASS.line}`).each(function() {
				const style = d3.select(this).style("shape-rendering");

				expect(style).to.be.equal("auto");
			});
		});

		it("should change to step chart", () => {
			args.data.type = "step";

			expect(true).to.be.ok;
		});

		it("should change line type to step-after", () => {
			args.line.step.type = "step-after";

			expect(true).to.be.ok;
		});


		it("should have shape-rendering = crispedges when it's step chart", () => {
			chart.internal.main.selectAll(`.${CLASS.line}`).each(function() {
				const style = d3.select(this).style("shape-rendering")
					.toLowerCase();

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
			const target = chart.internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);

			expect(+target.select(`.${CLASS.circle}-0`).style("opacity")).to.be.equal(1);
			expect(+target.select(`.${CLASS.circle}-1`).style("opacity")).to.be.equal(0);
			expect(+target.select(`.${CLASS.circle}-2`).style("opacity")).to.be.equal(1);
		});

		it("should not draw a line segment for null data", done => {
			setTimeout(() => {
				const target = chart.internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
				const commands = parseSvgPath(target.select(`.${CLASS.line}-data1`).attr("d"));
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
						["data1", 300, 150, null, 120, 140],
						["data2", 100, null, 200, 100, 100],
						["data3", 100, 160, 200, null, 50]
					],
					x: "timestamps",
					order: "asc",
					type: "area",
					groups: [["data1", "data2", "data3"]]
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
			chart.internal.main.selectAll(`path.${CLASS.line}`).each(function(d) {
				const line = d3.select(this);

				// it should have 4 lines
				expect(line.attr("d").split("L").length).to.be.equal(4);
			});
		});
	});

	describe("data point nodes generation", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 0, 15, 25]
					],
					selection: {
						enabled: true
					}
				},
				point: {
					show: false
				}
			};
		});

		it("<g> selected node shouldn't be generated when point.show=false", () => {
			const selectedCircle = chart.internal.main.selectAll(`.${CLASS.selectedCircles}`);

			expect(selectedCircle.empty()).to.be.true;
		});

		it("<circle> node shouldn't be generated when point.show=false", () => {
			const circle = chart.internal.main.selectAll("circle");

			expect(circle.empty()).to.be.true;
		});

		it("change option", () => {
			args.data.selection.enabled = false;
			args.point.show = true;
		});

		it("<g> selected node shouldn't be generated when data.selection.enabled=false", () => {
			const selectedCircle = chart.internal.main.selectAll(`.${CLASS.selectedCircles}`);

			expect(selectedCircle.empty()).to.be.true;
		});
	});

	describe("area-range type generation", () => {
		before(() => {
			skipEach = true;
			args = {
				data: {
					x: "timestamps",
					columns: [
						["timestamps", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1", [150, 140, 110], [155, 130, 115], [160, 135, 120], [135, 120, 110], [180, 150, 130], [199, 160, 125]],
						[
							"data2", {high: 155, low: 145, mid: 150},
							{high: 200, mid: 190, low: 150},
							{high: 230, mid: 215, low: 200},
							{high: 210, mid: 200, low: 180},
							{high: 220, mid: 210, low: 190},
							{high: 200, mid: 180, low: 160}
						],
					],
					type: "area-spline-range",
				},
			};
		});

		it("Should render the lines correctly when array data supplied", () => {
			const target = chart.internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const commands = parseSvgPath(target.select(`.${CLASS.line}-data1`).attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("Should render the lines correctly when array data supplied", () => {
			const target = chart.internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-data2`);
			const commands = parseSvgPath(target.select(`.${CLASS.line}-data2`).attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("should use cardinal interpolation by default", () => {
			expect(chart.internal.config.spline_interpolation_type).to.be.equal("cardinal");
		});

		it("should change to area-line-range chart", () => {
			args.data.type = "area-line-range chart";

			expect(true).to.be.ok;
		});
	});

	describe("step type generation", () => {
		before(() => {
			skipEach = true;
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 0, 15, 25]
					],
					type: "step"
				},
				line: {
					step: {
						type: "step-after"
					}
				}
			};
		});

		it("check line.step.type=step-after option", () => {
			const generateChartWithStep = () => {
				chart = util.generate(args);
			};

			expect(generateChartWithStep).to.not.throw();
		});

		it("step-after type's interpolate use d3 curve function ", () => {
			const to = chart.internal.getInterpolate(chart.data()[0]);

			expect(to).to.be.equal(d3.curveStepAfter);
		});

		it("should change to line.step.type option", () => {
			args.line.step.type = "step-before";

			expect(true).to.be.ok;
		});

		it("check line.step.type=step-before option", () => {
			const generateChartWithStep = () => {
				chart = util.generate(args);
			};

			expect(generateChartWithStep).to.not.throw();
		});

		it("step-before type's interpolate use d3 curve function ", () => {
			const to = chart.internal.getInterpolate(chart.data()[0]);

			expect(to).to.be.equal(d3.curveStepBefore);
		});

		after(() => {
			skipEach = false;
		});
	});

	describe("line options", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 0, 15, 25]
					]
				},
				line: {
					classes: [
						"line-class-1",
						"line-class-2"
					]
				}
			};
		});

		it("should not throw when using the line.classes options", () => {
			const generateChartWithLineClasses = () => {
				chart = util.generate(args);
			};

			expect(generateChartWithLineClasses).to.not.throw();
		});

		it("should define config.line_classes", () => {
			chart = util.generate(args);

			expect(chart.internal.config).to.have.property("line_classes");
		});

		it("config.line_classes should be an array and include the specified classes", () => {
			chart = util.generate(args);

			expect(chart.internal.config.line_classes).to.include("line-class-1");
			expect(chart.internal.config.line_classes).to.include("line-class-2");
		});
	});
});
