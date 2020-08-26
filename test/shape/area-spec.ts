/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE AREA", () => {
	let chart;
	let args;
	let skipEach = false;

	beforeEach(function() {
		if (skipEach) {
			return;
		}

		chart = util.generate(args);
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
			chart.$.main.selectAll(`path.${CLASS.line}`).each(function(d) {
				const line = d3Select(this);

				// it should have 4 lines
				expect(line.attr("d").split("L").length).to.be.equal(4);
			});
		});
	});

	describe("area path generation", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 20000, 35000, 30000]
					],
					type: "area"
				},
				axis: {
					y: {
						min: 10000,
						padding: {
							bottom: 0
						}
					}
				}
			};
		});

		// check non-grouped bar path position
		const checkBarPathPos = type => {
			// Get x Axis pos
			let xAxisYPos = chart.$.main.select(`.${CLASS.axisX} path`).node().getBoundingClientRect();

			xAxisYPos = type === "y" ? xAxisYPos[type] : xAxisYPos[type] + xAxisYPos.width;

			chart.$.line.areas.each(function() {
				const rect = this.getBoundingClientRect();
			
				expect(rect[type] + (type === "y" ? rect.height : 0)).to.be.closeTo(xAxisYPos, 1);
			});
		}


		it("check bar path node position: non rotated Axis", () => {
			checkBarPathPos("y");
		});

		it("set option axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check bar path node position: rotated Axis", () => {
			checkBarPathPos("x");
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
			const target = chart.$.main.select(`.${CLASS.chartLine}.${CLASS.target}-${dataName}`);
			const commands = target.select(`.${CLASS.line}-${dataName}`).attr("d").split("C");
			const dataLen = chart.internal.filterRemoveNull(chart.data(dataName)[0].values).length;

			expect(commands.length).to.be.equal(dataLen);

			// null data points, shouldn't be showing
			chart.$.circles.filter(d => d.id === dataName).each(function(d, i) {
				expect(+this.style.opacity).to.be.equal(i > 1 ? 1 : 0);
			})
		};

		it("Should render the lines correctly when array data supplied", done => {
			setTimeout(() => {
				checkLineLen("data1");
				checkLineLen("data2");
				done();
			}, 300)
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

	describe("combined area-range type with grouped data", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", [130,120,110], [120,110,100], [150,140,130], [140,130,120],[160,150,140],[150,140,130]],
					],
					type: "bar",
					types: {
						data3: "area-line-range"
					},
					groups: [
						["data1", "data2"]
					]
				}
			}
		});

		it("check for correct generation", () => {
			const d = chart.$.line.lines.attr("d");
			const box = util.getBBox(d3Select(`.${CLASS.chartLine}.${CLASS.target}-data3`));

			// check for correct path data
			expect(/NaN/.test(d)).to.be.false;

			// check for correct pos
			expect(Math.round(box.height)).to.be.equal(83);
			expect(Math.round(box.y)).to.be.equal(205);
		});
	});

	describe("rotated area-step type", () => {
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
			const path = chart.$.main.selectAll(`.${CLASS.target}-data1 path`);

			path.each(function(v, i) {
				expect(this.getAttribute("d")).to.be.equal(pathData[i ? "area" : "line"]);
			});
		}

		it("check the correct path generation", () => {
			checkPath({
				line: "M64.36363636363636,-33L64.36363636363636,2L64.36363636363636,2L64.36363636363636,72.5L429.0909090909091,72.5L429.0909090909091,143.5L214.54545454545456,143.5L214.54545454545456,214L364.7272727272727,214L364.7272727272727,284.5L321.8181818181818,284.5L321.8181818181818,355.5L536.3636363636364,355.5L536.3636363636364,426L536.3636363636364,426L536.3636363636364,461",
				area: "M64.36363636363636,-33L64.36363636363636,2L64.36363636363636,2L64.36363636363636,72.5L429.0909090909091,72.5L429.0909090909091,143.5L214.54545454545456,143.5L214.54545454545456,214L364.7272727272727,214L364.7272727272727,284.5L321.8181818181818,284.5L321.8181818181818,355.5L536.3636363636364,355.5L536.3636363636364,426L536.3636363636364,426L536.3636363636364,461L0,461L0,426L0,426L0,355.5L0,355.5L0,284.5L0,284.5L0,214L0,214L0,143.5L0,143.5L0,72.5L0,72.5L0,2L0,2L0,-33Z"
			});
		});

		it("set options args.line.step.type='step-before'", () => {
			args.line.step.type = "step-before";
		});

		it("check the correct path generation - step-before", () => {
			checkPath({
				line: "M64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L429.0909090909091,37L429.0909090909091,108L214.54545454545456,108L214.54545454545456,179L364.7272727272727,179L364.7272727272727,249L321.8181818181818,249L321.8181818181818,320L536.3636363636364,320L536.3636363636364,391L536.3636363636364,391L536.3636363636364,461L536.3636363636364,461",
				area: "M64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L429.0909090909091,37L429.0909090909091,108L214.54545454545456,108L214.54545454545456,179L364.7272727272727,179L364.7272727272727,249L321.8181818181818,249L321.8181818181818,320L536.3636363636364,320L536.3636363636364,391L536.3636363636364,391L536.3636363636364,461L536.3636363636364,461L0,532L0,461L0,461L0,391L0,391L0,320L0,320L0,249L0,249L0,179L0,179L0,108L0,108L0,37L0,37L0,-33L0,-33Z"
			});
		});

		it("set options args.line.step.type='step-after'", () => {
			args.line.step.type = "step-after";
		});

		it("check the correct path generation - step-after", () => {
			checkPath({
				line: "M64.36363636363636,-104L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L64.36363636363636,37L64.36363636363636,108L429.0909090909091,108L429.0909090909091,179L214.54545454545456,179L214.54545454545456,249L364.7272727272727,249L364.7272727272727,320L321.8181818181818,320L321.8181818181818,391L536.3636363636364,391L536.3636363636364,461L536.3636363636364,461",
				area: "M64.36363636363636,-104L64.36363636363636,-33L64.36363636363636,-33L64.36363636363636,37L64.36363636363636,37L64.36363636363636,108L429.0909090909091,108L429.0909090909091,179L214.54545454545456,179L214.54545454545456,249L364.7272727272727,249L364.7272727272727,320L321.8181818181818,320L321.8181818181818,391L536.3636363636364,391L536.3636363636364,461L536.3636363636364,461L0,461L0,461L0,461L0,391L0,391L0,320L0,320L0,249L0,249L0,179L0,179L0,108L0,108L0,37L0,37L0,-33L0,-33Z"
			});
		});
	});

	describe("Stacked area-step with category & timeseries x Axis type", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1",  57, 41, 31],
						["data2",  55, 55, 55]
					],
					groups: [
						["data1", "data2"]
					],
					type: "area-step"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		const checkPath = expected => {
			const {areas, lines} = chart.$.line;
			
			areas.each(function(d) {
				expect(this.getAttribute("d")).to.be.equal(expected.areas[d.id]);
			});

			lines.each(function(d) {
				expect(this.getAttribute("d")).to.be.equal(expected.lines[d.id]);
			});
		}

		it("should be rendering correctly for category type", () => {		
			const expectedPath = {
				areas: {
					data1: 'M-99,229.36850649350652L0.5,229.36850649350652L0.5,229.36850649350652L200,229.36850649350652L200,284.5633116883116L399.5,284.5633116883116L399.5,319.06006493506493L598.5,319.06006493506493L598.5,319.06006493506493L698,319.06006493506493L698,426L598.5,426L598.5,426L399.5,426L399.5,426L200,426L200,426L0.5,426L0.5,426L-99,426Z',
					data2: 'M-99,39.63636363636368L0.5,39.63636363636368L0.5,39.63636363636368L200,39.63636363636368L200,94.83116883116878L399.5,94.83116883116878L399.5,129.3279220779221L598.5,129.3279220779221L598.5,129.3279220779221L698,129.3279220779221L698,319.06006493506493L598.5,319.06006493506493L598.5,319.06006493506493L399.5,319.06006493506493L399.5,284.5633116883116L200,284.5633116883116L200,229.36850649350652L0.5,229.36850649350652L0.5,229.36850649350652L-99,229.36850649350652Z'
				},
				lines: {
					data1: 'M-99,229.36850649350652L0.5,229.36850649350652L0.5,229.36850649350652L200,229.36850649350652L200,284.5633116883116L399.5,284.5633116883116L399.5,319.06006493506493L598.5,319.06006493506493L598.5,319.06006493506493L698,319.06006493506493',
					data2: 'M-99,39.63636363636368L0.5,39.63636363636368L0.5,39.63636363636368L200,39.63636363636368L200,94.83116883116878L399.5,94.83116883116878L399.5,129.3279220779221L598.5,129.3279220779221L598.5,129.3279220779221L698,129.3279220779221'
				}
			};

			checkPath(expectedPath);
		});

		it("set options: axis.x.type='timeseries'", () => {
			args.data.x = "x";
			args.data.columns.push(["x", "2020-04-01", "2020-04-02"]);
			args.axis.x.type = "timeseries";
		});

		it("should be rendering correctly for timeseries type", () => {		
			const expectedPath = {
				areas: {
					data1: 'M6,229.36850649350652L299.5,229.36850649350652L299.5,284.5633116883116L593,284.5633116883116L593,426L299.5,426L299.5,426L6,426Z',
					data2: 'M6,39.63636363636368L299.5,39.63636363636368L299.5,94.83116883116878L593,94.83116883116878L593,284.5633116883116L299.5,284.5633116883116L299.5,229.36850649350652L6,229.36850649350652Z'
				},
				lines: {
					data1: 'M6,229.36850649350652L299.5,229.36850649350652L299.5,284.5633116883116L593,284.5633116883116',
					data2: 'M6,39.63636363636368L299.5,39.63636363636368L299.5,94.83116883116878L593,94.83116883116878'
				}
			};

			checkPath(expectedPath);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 400000, 18000, 0, -18000, -400000],
						["data2", 31000, 31000, 0, -31000, -31000]
					],
					type: "area-step",
					groups: [["data1", "data2"]],
					labels: {
						show: true
					},
					order: null
				},
				axis: {
					x: {
						categories: [
							"category1",
							"category2",
							"category3",
							"category4",
							"category5"
						],
						type: "category"
					}
				}
			};
		});

		it("check data label text position", () => {
			const expected = {
				data1: [
					[57, 52.97743035922552],
					[171, 200.54648436616517], 
					[285, 207.5],
					[398, 235.95351563383483],
					[512, 383.52256964077446]
				],
				data2: [
					[57, 41.0019312120655],
					[171, 188.57098521900514],
					[285, 207.5],
					[398, 247.9290147809948],
					[512, 395.49806878793447]
				]
			};

			const checkPos = id => {
				chart.$.text.texts.filter(d => d.id === id).each(function(d, i) {
					const x = +this.getAttribute("x");
					const y = +this.getAttribute("y");
					const expectedPos = expected[id][i];
	
					expect(x).to.be.closeTo(expectedPos[0], 1);
					expect(y).to.be.closeTo(expectedPos[1], 1);
				});
			}

			checkPos("data1");
			checkPos("data2");
		});
	});

	describe("area linear gradient", () => {
		before(() => {
			args = {
				data: {
				columns: [
						["data1", 230, 280, 251, 400, 150, 546, 158],
						["hello there", 230, 280, 251, 400, 150, 546, 158],
						["123 test", 130, 220, 120, 129, 410, 100, 440]
					],
					type: "area",
				},
				area: {
					linearGradient: true
				}
			}
		});

		it("should generate liearGradient element", () => {
			const internal = chart.internal;
			const expected = {
				x: [0, 0],
				y: [0, 1],
				offset: [0, 1],
				opacity: [1, 0]
			};

			chart.data().forEach(v => {
				const color = chart.color(v.id);
				const selectorSuffix = internal.getTargetSelectorSuffix(v.id);
				const id = `#${internal.state.datetimeId}-areaGradient${selectorSuffix}`;
				const gradient = chart.$.svg.select(id);

				expect(gradient.empty()).to.be.false;
				expect([+gradient.attr("x1"), +gradient.attr("x2")]).to.be.deep.equal(expected.x);
				expect([+gradient.attr("y1"), +gradient.attr("y2")]).to.be.deep.equal(expected.y);

				gradient.selectAll("stop").each(function(d, i) {
					const stop = d3Select(this);

					expect(+stop.attr("offset")).to.be.equal(expected.offset[i]);
					expect(stop.attr("stop-color")).to.be.equal(color);
					expect(+stop.attr("stop-opacity")).to.be.equal(expected.opacity[i]);
				});

				expect(chart.$.line.areas.filter(`.${CLASS.area}${selectorSuffix}`).style("fill")).to.be.equal(`url("${id}")`);
			});
		});

		it("set options: customzied linearGradient", () => {
			args.area.linearGradient = {
				x: [1, 0],
				y: [0, 1],
				stops: [
					[0, id => id == "data1" ? "red" : "yellow", 1],
					[0.3, "orange", 0.5],
					[0.6, "green", 0.7],
					[0.8, "purple", 0.7],
					[1, null, 1]
				]
			};
		});

		it("should generate customized liearGradient element", () => {
			const internal = chart.internal;

			chart.data().forEach(v => {
				const selectorSuffix = internal.getTargetSelectorSuffix(v.id);
				const id = `#${internal.state.datetimeId}-areaGradient${selectorSuffix}`;
				const gradient = chart.$.svg.select(id);

				expect(gradient.empty()).to.be.false;
				expect([+gradient.attr("x1"), +gradient.attr("x2")]).to.be.deep.equal(args.area.linearGradient.x);
				expect([+gradient.attr("y1"), +gradient.attr("y2")]).to.be.deep.equal(args.area.linearGradient.y);

				const stops = args.area.linearGradient.stops;

				gradient.selectAll("stop").each(function(d, i) {
					const color = i === 0 ? stops[i][1](v.id) : stops[i][1];
					const stop = d3Select(this);

					expect(+stop.attr("offset")).to.be.equal(stops[i][0]);
					expect(stop.attr("stop-color")).to.be.equal(color || chart.color(v.id));
					expect(+stop.attr("stop-opacity")).to.be.equal(stops[i][2]);
				});

				expect(chart.$.line.areas.filter(`.${CLASS.area}${selectorSuffix}`).style("fill")).to.be.equal(`url("${id}")`);
			});
		});

		it("set options: reset options", () => {
			args = {
				data: {
					columns: [["data"]],
					type: "area"
				},
				area: {
					linearGradient: true
				}
			};
		});

		it("should generate customized liearGradient element", done => {
			setTimeout(() => {
				chart.load({
				  columns: [
					["data", 10, 20, 30, 40]
				  ],
				  done: () => {
					  expect(chart.$.defs.select("linearGradient").empty()).to.be.false;
					  done();
				  }
				});
			  }, 1000);
		});
	});

	describe("area options", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100]
					],
					type: "area"
				},
				area: {
					front: false
				}
			};
		});

		it("check stacking order: area.front=false", () => {
			const stacking = [CLASS.areas, CLASS.lines, CLASS.circles];

			chart.$.main.selectAll(".bb-chart-line > g").each(function(d, i) {
				expect(this.classList.contains(stacking[i])).to.be.true;
			});
		});

		it("set options: area.front=true", () => {
			args.area.front = true;
		});

		it("check stacking order: area.front=true", () => {
			const stacking = [CLASS.lines, CLASS.areas, CLASS.circles];

			chart.$.main.selectAll(".bb-chart-line > g").each(function(d, i) {
				expect(this.classList.contains(stacking[i])).to.be.true;
			});
		});
	});
});
