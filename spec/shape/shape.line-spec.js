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

		it("set options data.type='step' / line.step.type='step-after'", () => {
			args.data.type = "step";
			args.line.step.type = "step-after";
		});

		it("should have shape-rendering = crispedges when it's step chart", () => {
			chart.internal.main.selectAll(`.${CLASS.line}`).each(function() {
				const style = d3.select(this).style("shape-rendering").toLowerCase();

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

		it("set options spline.interpolation.type='foo'", () => {
			args.spline.interpolation.type = "foo";
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
		const min = 120;
		const max = 220;

		before(() => {
			args = {
				data: {
					x: "timestamps",
					columns: [
						["timestamps", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1",
							[null, null, null],
							null,
							[160, 135, 120],
							[135, min, 110],
							[180, 150, 130],
							[199, 160, 125]
						],
						["data2",
							null,
							{high: null, mid: null, low: null},
							{high: 230, mid: max, low: 200},
							{high: 210, mid: 200, low: 180},
							{high: 220, mid: 210, low: 190},
							{high: 200, mid: 180, low: 160}
						],
						["data3", 130, 140, 200, 150, 210, 150]
					],
					type: "area-spline-range",
					types: {
						data3: "bubble"
					}
				},
				axis: {
					x: {
						type: "timeseries"
					}
				}
			};
		});

		const checkLineLen = dataName => {
			const internal = chart.internal;
			const target = internal.main.select(`.${CLASS.chartLine}.${CLASS.target}-${dataName}`);
			const commands = target.select(`.${CLASS.line}-${dataName}`).attr("d").split("C");
			const dataLen = internal.filterRemoveNull(chart.data(dataName)[0].values).length;

			expect(commands.length).to.be.equal(dataLen);

			// null data points, shouldn't be showing
			internal.main.selectAll(`.${CLASS.circles}-${dataName} circle`).each(function(d, i) {
				expect(+this.style.opacity).to.be.equal(i > 1 ? 1 : 0);
			})
		};

		it("Should render the lines correctly when array data supplied", () => {
			checkLineLen("data1");
			checkLineLen("data2");
		});

		it("should use cardinal interpolation by default", () => {
			expect(chart.internal.config.spline_interpolation_type).to.be.equal("cardinal");
		});

		it("should return correct min/max data", () => {
			const minMax = chart.internal.getMinMaxValue();

			expect(minMax.min).to.be.equal(min);
			expect(minMax.max).to.be.equal(max);
		});
	});

	describe("rotated step type", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "1", "2", "3", "4", "5", "6"],
						["data1", 30, 200, 100, 170, 150, 250]
					],
					type: "area-step"
				},
				line: {
					step: {}
				},
				axis: {
					rotated: true,
					x: {
						type: "category"
					}
				}
			};
		});

		function checkPath(pathData) {
			const path = chart.internal.main.selectAll(`.${CLASS.target}-data1 path`);

			path.each(function(v, i) {
				expect(this.getAttribute("d")).to.be.equal(pathData[i ? "area" : "line"]);
			});
		}

		it("check the correct path generation", () => {
			checkPath({
				line: "M64.36363636363636,-33L64.36363636363636,2L64.36363636363636,2L64.36363636363636,72.5L429.0909090909091,72.5L429.0909090909091,143.5L214.54545454545456,143.5L214.54545454545456,214L364.7272727272727,214L364.7272727272727,284.5L321.8181818181818,284.5L321.8181818181818,355.5L536.3636363636364,355.5L536.3636363636364,461.5L536.3636363636364,461.5L536.3636363636364,532",
				area: "M64.36363636363636,-33L64.36363636363636,2L64.36363636363636,2L64.36363636363636,72.5L429.0909090909091,72.5L429.0909090909091,143.5L214.54545454545456,143.5L214.54545454545456,214L364.7272727272727,214L364.7272727272727,284.5L321.8181818181818,284.5L321.8181818181818,355.5L536.3636363636364,355.5L536.3636363636364,461.5L536.3636363636364,461.5L536.3636363636364,532L0,532L0,461.5L0,461.5L0,355.5L0,355.5L0,284.5L0,284.5L0,214L0,214L0,143.5L0,143.5L0,72.5L0,72.5L0,2L0,2L0,-33Z"
			});
		});

		it("set options args.line.step.type='step-before'", () => {
			args.line.step.type = "step-before";
		});

		it("check the correct path generation - step-before", () => {
			checkPath({
				line: "M64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L429.0909090909091,37L429.0909090909091,108L214.54545454545456,108L214.54545454545456,179L364.7272727272727,179L364.7272727272727,249L321.8181818181818,249L321.8181818181818,320L536.3636363636364,320L536.3636363636364,391L536.3636363636364,391L536.3636363636364,532L536.3636363636364,532",
				area: "M64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L429.0909090909091,37L429.0909090909091,108L214.54545454545456,108L214.54545454545456,179L364.7272727272727,179L364.7272727272727,249L321.8181818181818,249L321.8181818181818,320L536.3636363636364,320L536.3636363636364,391L536.3636363636364,391L536.3636363636364,532L536.3636363636364,532L0,603L0,532L0,532L0,391L0,391L0,320L0,320L0,249L0,249L0,179L0,179L0,108L0,108L0,37L0,37L0,-33L0,-33Z"
			});
		});

		it("set options args.line.step.type='step-after'", () => {
			args.line.step.type = "step-after";
		});

		it("check the correct path generation - step-before", () => {
			checkPath({
				line: "M64.36363636363636,-104L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L64.36363636363636,37L64.36363636363636,108L429.0909090909091,108L429.0909090909091,179L214.54545454545456,179L214.54545454545456,249L364.7272727272727,249L364.7272727272727,320L321.8181818181818,320L321.8181818181818,391L536.3636363636364,391L536.3636363636364,603L536.3636363636364,603",
				area: "M64.36363636363636,-104L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L64.36363636363636,37L64.36363636363636,108L429.0909090909091,108L429.0909090909091,179L214.54545454545456,179L214.54545454545456,249L364.7272727272727,249L364.7272727272727,320L321.8181818181818,320L321.8181818181818,391L536.3636363636364,391L536.3636363636364,603L536.3636363636364,603L0,603L0,603L0,603L0,391L0,391L0,320L0,320L0,249L0,249L0,179L0,179L0,108L0,108L0,37L0,37L0,-33L0,-33Z"
			});
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

			expect(to).to.be.equal(d3.curveStepAfter);
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

			expect(to).to.be.equal(d3.curveStepBefore);
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
	});
});
