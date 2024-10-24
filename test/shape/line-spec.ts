/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import {
	curveStepAfter as d3CurveStepAfter,
	curveStepBefore as d3CurveStepBefore
} from "d3-shape";
import {$AXIS, $COMMON, $LINE, $SELECT} from "../../src/config/classes";
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
		beforeAll(() => {
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
			const target = chart.$.main.select(`.${$LINE.chartLine}.${$COMMON.target}-data1`);
			const commands = parseSvgPath(target.select(`.${$LINE.line}-data1`).attr("d"));

			expect(commands.length).to.be.equal(6);
		});

		it("should not have shape-rendering when it's line chart", () => {
			chart.$.main.selectAll(`.${$LINE.line}`).each(function() {
				const style = d3Select(this).style("shape-rendering");

				expect(style).to.be.equal("auto");
			});
		});

		it("set options data.type='step' / line.step.type='step-after'", () => {
			args.data.type = "step";
			args.line.step.type = "step-after";
		});

		it("should 'shape-rendering' shouldn't be set 'crispedges' when it's step chart", () => {
			chart.$.main.selectAll(`.${$LINE.line}`).each(function() {
				const style = d3Select(this).style("shape-rendering").toLowerCase();

				expect(style).to.be.equal("auto");
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
		beforeAll(() => {
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

		it("should not show the circle for null",  () => new Promise(done => {
			const target = chart.$.circles.filter(d => d.id === "data1");

			setTimeout(() => {
				target.each(function(d, i) {
					expect(this.style.opacity).to.be.equal(d.index === 1 ? "0" : "");
				});

				done(1);
			}, 300)

		}));

		it("should not draw a line segment for null data", () => new Promise(done => {
			setTimeout(() => {
				const target = chart.$.main.select(`.${$LINE.chartLine}.${$COMMON.target}-data1`);
				const commands: any = parseSvgPath(target.select(`.${$LINE.line}-data1`).attr("d"));
				let segments = 0;

				for (let i = 0; i < commands.length; i++) {
					commands[i].command === "L" && segments++;
				}

				expect(segments).to.be.equal(3);

				done(1);
			}, 300);
		}));
	});

	describe("spline.interpolation option", () => {
		beforeAll(() => {
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
		beforeAll(() => {
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
			const selectedCircle = chart.$.main.selectAll(`.${$SELECT.selectedCircles}`);

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
			const selectedCircle = chart.$.main.selectAll(`.${$SELECT.selectedCircles}`);

			expect(selectedCircle.empty()).to.be.true;
		});
	});

	describe("step type generation", () => {
		beforeAll(() => {
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

		afterAll(() => { skipEach = false; });

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

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100]
					],
					type: "step"
				},
				point: {
					pattern: [
						"<polygon points='2.5 0 0 2.5 2.5 5 5 2.5 2.5 0'></polygon>"
					]
				},
				tooltip: {
					grouped: false
				}
			};
		});

		it("should correctly show tooltip with tooltip.grouped=false.", () => {
			// when
			chart.tooltip.show({
				data: {id:"data1", value: 200, x: 1}
			});

			expect(+chart.$.tooltip.select(".value").text()).to.be.equal(chart.data.values("data1")[1])
		});
	});

	describe("step type: category axis & line.ConnectNull", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "1", "2", "3", "4", "5", "6", "7"],
						["column1", 1000, null, 1000, 1200, null, null, -1700],
						["column2", 4000, null, 2000, 2200, null, 2400, -2400]
					],
					type: "step",
				},
				line: {
					connectNull: true
				},
				axis: {
					x: {
						type: "category"
					}
				}
			}
		});

		it("should be generated correctly", () => {
			const path = {
				column1: "M-42.071,202.432L0,202.432L0,202.432L126.214,202.432L126.214,202.432L252.429,202.432L252.429,191.365L420.714,191.365L420.714,351.846L589,351.846L589,351.846L631.071,351.846",
				column2: "M-42.071,36.417L0,36.417L0,36.417L126.214,36.417L126.214,147.094L252.429,147.094L252.429,136.026L378.643,136.026L378.643,124.958L504.857,124.958L504.857,390.583L589,390.583L589,390.583L631.071,390.583"
			}

			chart.$.line.lines.each(function(d) {
				expect(this.getAttribute("d")).to.be.equal(path[d.id]);
			})
		});
	});

	describe("line options", () => {
		const rx = /,([^)]+)\)/;

		beforeAll(() => {
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

			const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
			const tickElements = tickNodes.nodes();

			const translateValues = [
				391, 347, 303, 258, 214, 170, 125, 81, 37
			];

			tickNodes.each((data, index) => {
				const transform = tickElements[index].getAttribute("transform");				

				expect(+transform.match(rx)[1]).to.be.closeTo(translateValues[index], 1);
			});
		});

		it("should be zerobased", () => {
			args.line.zerobased = true;
			chart = util.generate(args);

			const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
			const tickElements = tickNodes.nodes();

			const translateValues = [
				426, 378, 330, 282, 233, 185, 137, 88, 40
			];

			tickNodes.each((data, index) => {
				const transform = tickElements[index].getAttribute("transform");				

				expect(+transform.match(rx)[1]).to.be.closeTo(translateValues[index], 1);
			});
		});
	});
});
