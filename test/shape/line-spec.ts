/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import {
	curveStepAfter as d3CurveStepAfter,
	curveStepBefore as d3CurveStepBefore
} from "d3-shape";
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE LINE", () => {
	let chart;
	let args;
	let skipEach = false;

	beforeEach(function() {
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
			const target = chart.$.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
			const commands = parseSvgPath(target.select(`.${CLASS.line}-data1`).attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("should not have shape-rendering when it's line chart", () => {
			chart.$.main.selectAll(`.${CLASS.line}`).each(function() {
				const style = d3Select(this).style("shape-rendering");

				expect(style).to.be.equal("auto");
			});
		});

		it("set options data.type='step' / line.step.type='step-after'", () => {
			args.data.type = "step";
			args.line.step.type = "step-after";
		});

		it("should have shape-rendering = crispedges when it's step chart", () => {
			chart.$.main.selectAll(`.${CLASS.line}`).each(function() {
				const style = d3Select(this).style("shape-rendering").toLowerCase();

				expect(style).to.be.equal("crispedges");
			});
		});

		it("set options data.type='spline'", () => {
			args.data.type = "spline";
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

		it("should not show the circle for null", (done) => {
			const target = chart.$.circles.filter(d => d.id === "data1");

			setTimeout(() => {
				target.each(function(d, i) {
					expect(this.style.opacity).to.be.equal(d.index === 1 ? "0" : "1");
				});

				done();
			}, 300)

		});

		it("should not draw a line segment for null data", done => {
			setTimeout(() => {
				const target = chart.$.main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`);
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

		it("set options spline.interpolation.type='foo'", () => {
			args.spline.interpolation.type = "foo";
		});

		it("should use cardinal interpolation when given option is not valid", () => {
			const to = chart.internal.getInterpolateType(chart.data()[0]);

			expect(to).to.be.equal("cardinal");
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
			const selectedCircle = chart.$.main.selectAll(`.${CLASS.selectedCircles}`);

			expect(selectedCircle.empty()).to.be.true;
		});

		it("<circle> node shouldn't be generated when point.show=false", () => {
			const circle = chart.$.main.selectAll("circle");

			expect(circle.empty()).to.be.true;
		});

		it("change option", () => {
			args.data.selection.enabled = false;
			args.point.show = true;
		});

		it("<g> selected node shouldn't be generated when data.selection.enabled=false", () => {
			const selectedCircle = chart.$.main.selectAll(`.${CLASS.selectedCircles}`);

			expect(selectedCircle.empty()).to.be.true;
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

		after(() => { skipEach = false; });

		it("check line.step.type=step-after option", () => {
			const generateChartWithStep = () => {
				chart = util.generate(args);
			};

			expect(generateChartWithStep).to.not.throw();
		});

		it("step-after type's interpolate use d3 curve function ", () => {
			const to = chart.internal.getInterpolate(chart.data()[0]);

			expect(to).to.be.equal(d3CurveStepAfter);
		});

		it("set options line.step.type='step-before'", () => {
			args.line.step.type = "step-before";
		});

		it("check line.step.type=step-before option", () => {
			const generateChartWithStep = () => {
				chart = util.generate(args)
			};

			expect(generateChartWithStep).to.not.throw();
		});

		it("step-before type's interpolate use d3 curve function ", () => {
			const to = chart.internal.getInterpolate(chart.data()[0]);

			expect(to).to.be.equal(d3CurveStepBefore);
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

			expect(chart.internal.config).to.have.property('line_classes');
		});

		it("config.line_classes should be an array and include the specified classes", () => {
			chart = util.generate(args);

			expect(chart.internal.config.line_classes).to.include('line-class-1');
			expect(chart.internal.config.line_classes).to.include('line-class-2');
		});

		it("should not be zerobased", () => {
			args.line.zerobased = false;
			chart = util.generate(args);

			const tickNodes = chart.$.svg.select(`.${CLASS.axisY}`).selectAll("g.tick");
			const tickElements = tickNodes.nodes();

			const translateValues = [
				"translate(0,391)",
				"translate(0,347)",
				"translate(0,303)",
				"translate(0,258)",
				"translate(0,214)",
				"translate(0,170)",
				"translate(0,125)",
				"translate(0,81)",
				"translate(0,37)"
			];

			tickNodes.each((data, index) => {
				expect(d3Select(tickElements[index]).attr("transform")).to.be.equal(translateValues[index]);
			});
		});

		it("should be zerobased", () => {
			args.line.zerobased = true;
			chart = util.generate(args);

			const tickNodes = chart.$.svg.select(`.${CLASS.axisY}`).selectAll("g.tick");
			const tickElements = tickNodes.nodes();

			const translateValues = [
				"translate(0,426)",
				"translate(0,378)",
				"translate(0,330)",
				"translate(0,282)",
				"translate(0,233)",
				"translate(0,185)",
				"translate(0,137)",
				"translate(0,88)",
				"translate(0,40)"
			];

			tickNodes.each((d, index) => {
				expect(d3Select(tickElements[index]).attr("transform")).to.be.equal(translateValues[index]);
			});
		});
	});
});
