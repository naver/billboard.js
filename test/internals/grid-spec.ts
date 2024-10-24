/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import {$AXIS, $COMMON, $EVENT, $FOCUS, $GRID} from "../../src/config/classes";
import util from "../assets/util";

describe("GRID", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("check for default grid lines", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
					]
				},
				grid: {
					x: {
						show: true
					},
					y: {
						show: true
					}
				},
			};
		});

		it("should show 3 grid lines", () => {
			const checkGridLines = isX => {
				const grid = chart.$.grid.main.selectAll(`.${isX ? $GRID.xgrids : $GRID.ygrids} line`).nodes();

				chart.$.main.selectAll(`.${isX ? $AXIS.axisX : $AXIS.axisY} .tick`).each(function(d, i) {
					const node = grid[i];
					const name = isX ? "x" : "y";

					const attr = util.parseNum(this.getAttribute("transform").split(",")[isX ? 0 : 1]);
					const pos = +node.getAttribute(`${name}1`)
	
					expect(pos).to.be.equal(+node.getAttribute(`${name}2`));
					expect(attr).to.be.equal(pos);
				});
			}

			checkGridLines(true); // x grid
			checkGridLines(false); // y grid
		});

		
		it("check grid lines position for non rotated axis", () => {
			const checkGridLinesPos = isX => {
				const axis = chart.$.main.selectAll(`.${isX ? $AXIS.axisX : $AXIS.axisY} line`).nodes();
				const prop = isX ? "x" : "y";
	
				chart.$.grid.main.selectAll(`.${isX ? $GRID.xgrids : $GRID.ygrids} line`)
					.each(function(d, i) {
						const pos = this.getBoundingClientRect()[prop];
						const axisPos = axis[i].getBoundingClientRect()[prop];

						expect(pos).to.be.equal(axisPos);
	
				});
			}

			checkGridLinesPos("x");
			checkGridLinesPos("y");
		});

		it("set option: axis.rotated=true", () => {
			args.axis = {rotated: true};
		});

		it("check grid lines position for rotated axis", () => {
			const checkGridLinesPos = isX => {
				const axis = chart.$.main.selectAll(`.${isX ? $AXIS.axisX : $AXIS.axisY} line`).nodes();
				const prop = isX ? "y" : "x";
	
				chart.$.grid.main.selectAll(`.${isX ? $GRID.xgrids : $GRID.ygrids} line`)
					.each(function(d, i) {
						const pos = this.getBoundingClientRect()[prop];
						const axisPos = axis[i].getBoundingClientRect()[prop];

						expect(pos).to.be.equal(axisPos);
	
				});
			}

			checkGridLinesPos(true);
			checkGridLinesPos(false);
		});
	});

	describe("y grid show", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					y: {
						tick: {}
					}
				},
				grid: {
					y: {
						show: false,
						lines: [
							{value: 2, text: "Label on 2"}
						]
					}
				}
			};
		});

		it("should not show y grids", () => {
			expect(chart.$.main.select(`.${$GRID.ygrids}`).size()).to.be.equal(0);
		});

		it("set options grid.y.show=true", () => {
			args.grid.y.show = true;
		});

		it("should show y grids", function() {
			const ygrids = chart.$.main.select(`.${$GRID.ygrids}`);

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${$GRID.ygrid}`).size()).to.be.equal(9);
		});

		it("set options grid.y.ticks=3", () => {
			args.grid.y.ticks = 3;
		});

		it("should show only 3 y grids", () => {
			const ygrids = chart.$.main.select(`.${$GRID.ygrids}`);

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${$GRID.ygrid}`).size()).to.be.equal(3);
		});

		it("set options axis.y.tick.count=5", () => {
			args.axis.y.tick.count = 5;
		});

		it("should show grids depending on y axis ticks", () => {
			const ygrids = chart.$.main.select(`.${$GRID.ygrids}`);
			const expectedYs: number[] = [];

			ygrids.selectAll(`.${$GRID.ygrid}`).each(function(d, i) {
				expectedYs[i] = +d3Select(this).attr("y1");
			});

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${$GRID.ygrid}`).size()).to.be.equal(3);

			chart.$.main.select(`.${$AXIS.axisY}`).selectAll(".tick").each(function(d, i) {
				let y: any = d3Select(this).attr("transform").match(/,([^)]+)\)$/);

				if (y.length >= 1) {
					y = parseInt(y[1]);
				}

				if (expectedYs[i]) {
					expect(y).to.be.closeTo(expectedYs[i], 1);
				}
			});
		});

		it("set options", () => {
				args = {
					data: {
						columns: [
							["data1", 130, 340, 200, 500, 250, 350]
						],
						type: "line"
					},
					axis: {
						y: {
							min: 0
						}
					},
					grid: {
						y: {
							show: true,
							ticks: 5
						}
					}
				};
		});
		
		it("y grid showed with nice intervals?", () => {
			const yPos = [426, 319.75, 213.5, 107.25, 1];

			chart.$.grid.y.each(function(d, i) {
				expect(+this.getAttribute("y1")).to.be.equal(yPos[i]);
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 100, 50, 150, 200, 100, 350, 58, 210, 80, 126],
						["data2", 305, 350, 55, 25, 335, 29, 258, 310, 180, 226],
						["data3", 223, 121, 259, 247, 53, 159, 95, 111, 307, 337]
					],
					type: "line",
					labels: true
				},
				axis: {
					y: {
					type: "log",
					max: 400
					}
				},
				grid: {
					y: {
					show: true
					}
				}
			};
		});

		it("grid lines should fully generated for log type y axis", () => {
			const gridLen = chart.$.grid.y.size();
			const tickLen = chart.internal.$el.axis.y.selectAll(".tick").size();

			expect(gridLen).to.be.equal(tickLen);
		});

		it("shouldn't be throw error", () => {
			try {
				util.generate({
					"data": {
						"json": [
							{ "data_periodo": "2018-05-01", "int_exists": 0 },
							{ "data_periodo": "2018-06-01", "int_exists": 0 }
						],
						"keys": {
							"x": "data_periodo",
							"value": [
								"int_exists"
							]
						},
						"type": "line"
					},
					"axis": {
						"y": {
							"tick": {
								"format": null,
								"count": 1
							},
							"show": false,
							"max": 1,
							"min": 0.1
						},
					},
					"grid": {
						"y": {
							"show": true,
							"lines": [
								{
									"value": 0,
									"position": "start",
									"text": "assenza"
								},
								{
									"value": 1,
									"position": "start",
									"text": "presenza"
								}
							]
						}
					}
				});
			} catch (e) {
				// it shouldn't be thrown
				expect(false).to.be.true;
			}

			expect(true).to.be.ok;
		});
	});

	describe("front option", () => {
		beforeAll(() => {
			args = {
				data:{
					columns:[
						["data1",30,200,100,400,150,250]
					]
				},
				axis:{
					y:{
						tick:{
							count: 5
						}
					}
				},
				grid:{
					y:{
						show: true,
						lines:[
							{"value":2,"text":"Label on 2"}
						],
						ticks: 3
					}
				}
			};
		});

		it("grid element should positioned before chart element", () => {
			const grid = chart.$.main.select(`.${$GRID.grid}`).node();
			const nextSiblingClassName = grid.nextSibling.getAttribute("class");

			expect(nextSiblingClassName).to.be.equal($COMMON.chart);
		});

		it("set options grid.front=true", () => {
			args.grid.front = true;
		});

		it("grid element should positioned after gridLines element", () => {
			const grid = chart.$.main.select(`.${$FOCUS.xgridFocus}`).node().parentNode;
			const previousSiblingClassName = grid.previousSibling.getAttribute("class");

			expect(previousSiblingClassName).to.be.equal(`${$GRID.grid} ${$GRID.gridLines}`);
		});
	});

	describe("check node generation", () => {
		it("set options args.grid.y.lines = []", () => {
			args.grid.y.lines = [];
		});

		it("shouldn't be generating grid elements", () => {
			expect(chart.$.main.select(`.${$GRID.grid}.${$GRID.gridLines}`).empty()).to.be.true;
		});
	});

	describe("y grid lines", () => {
		describe("position #1", () => {7
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 10, 200, 100, 400, 150, 250]
						]
					},
					grid: {
						y: {
							lines: [
								{value: 30, text: "Label 30", position: "start"},
								{value: 145, text: "Label 145", position: "middle"},
								{value: 225, text: "Label 225"}
							]
						}
					}
				};
			});

			it("should show 3 grid lines", () => {
				expect(chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => new Promise(done => {
				setTimeout(() => {
					const lines = chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line line`);
					const expectedY1s = [373, 268, 196];

					lines.each(function (d, i) {
						const line = d3Select(this);
						const y1 = +line.attr("y1");

						y1 && expect(y1).to.be.closeTo(expectedY1s[i], 1);
					});

					done(1);
				}, 300);
			}));

			it("should locate grid texts properly", () => {
				const lines = chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function (d, i) {
					const text = d3Select(this).select("text");
					const textAnchor = text.attr("text-anchor");
					const dx = text.attr("dx");

					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});
		});

		describe("position #2", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 10, 200, 100, 400, 150, 250]
						]
					},
					axis: {
						rotated: true
					},
					grid: {
						y: {
							lines: [
								{value: 30, text: "Label 30", position: "start"},
								{value: 145, text: "Label 145", position: "middle"},
								{value: 225, text: "Label 225"}
							]
						}
					}
				};
			});

			it("should show 3 grid lines", () => {
				expect(chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => new Promise(done => {
				setTimeout(() => {
					const lines = chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line line`);
					const expectedX1s = [75, 220, 321];

					lines.each(function(d, i) {
						const line = d3Select(this);
						const x1 = Number(line.attr("x1"));

						x1 && expect(x1).to.be.closeTo(expectedX1s[i], 1);
					});

					done(1);
				}, 300);
			}));

			it("should locate grid texts properly", () => {
				const lines = chart.$.main.selectAll(`.${$GRID.ygrid}-lines .${$GRID.ygrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function(d, i) {
					const text = d3Select(this).select("text");
					const textAnchor = text.attr("text-anchor");
					const dx = text.attr("dx");

					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});
		});

		describe("lines.front option", () => {
			it("grid lines should positioned after chart element", () => {
				const gridLines = chart.$.main.select(`.${$GRID.grid}-lines`).node();
				const previousSiblingClassName = gridLines.previousSibling.getAttribute("class");

				expect(previousSiblingClassName).to.be.equal($COMMON.chart);
			});

			it("set options grid.lines.front=false", () => {
				args.grid.lines = {front: false};
			});

			it("grid lines should positioned before grid element", () => {
				const gridLines = chart.$.main.select(`.${$GRID.grid}-lines`).node();
				const nextSiblingClassName = gridLines.nextSibling.getAttribute("class");

				expect(nextSiblingClassName).to.be.equal($GRID.grid);
			});
		});
	});

	describe("x grid lines", () => {
		describe("position #1", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400],
						]
					},
					grid: {
						x: {
							lines: [
								{value: 1, text: "Label 1", position: "start"},
								{value: 2, text: "Label 2", position: "middle"},
								{value: 3, text: "Label 3"},
							]
						}
					},
				};
			});

			it("grid elements shouldn't receive any pointer events", () => {
				const {$el: {grid, gridLines}} = chart.internal;

				expect(grid.main.style("pointer-events")).to.be.equal("none");
				expect(gridLines.main.style("pointer-events")).to.be.equal("none");
			})

			it("should show 3 grid lines", () => {
				expect(chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => new Promise(done => {
				const lines = chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedX1s = [202, 397, 593];

				setTimeout(() => {
					lines.each(function (d, i) {
						const x1 = Number(d3Select(this).select("line").attr("x1"));

						expect(x1).to.be.closeTo(expectedX1s[i], 1);
					});

					done(1);
				}, 300);
			}));

			it("should locate grid texts properly", () => {
				const lines = chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function (d, i) {
					const text = d3Select(this).select("text");
					const textAnchor = text.attr("text-anchor");
					const dx = text.attr("dx");

					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});
		});

		describe("position #2", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400],
						]
					},
					axis: {
						rotated: true
					},
					grid: {
						x: {
							lines: [
								{value: 1, text: "Label 1", position: "start"},
								{value: 2, text: "Label 2", position: "middle"},
								{value: 3, text: "Label 3"},
							]
						}
					}
				};
			});

			it("should show 3 grid lines", () => {
				expect(chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => new Promise(done => {
				const lines = chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedY1s = [144, 283, 421];

				setTimeout(() => {
					lines.each(function(d, i) {
						const y1 = +d3Select(this).select("line").attr("y1");

						expect(y1).to.be.closeTo(expectedY1s[i], 1);
					});
					done(1);
				}, 300);
			}));

			it("should locate grid texts properly", () => {
				const lines = chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function(d, i) {
					const text = d3Select(this).select("text");
					const textAnchor = text.attr("text-anchor");
					const dx = text.attr("dx");

					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});

		});

		describe("with padding.top", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400],
						]
					},
					grid: {
						x: {
							lines: [
								{value: 3, text: "Label 3"}
							]
						}
					},
					padding: {
						top: 50
					}
				};
			});

			it("should show x grid lines", () => new Promise(done => {
				const lines = chart.$.main.select(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedX1 = 593;
				const expectedText = ["Label 3"];

				setTimeout(() => {
					lines.each(function(id, i) {
						const line = d3Select(this);
						const l = line.select("line");
						const t = line.select("text");

						expect(+l.attr("x1")).to.be.closeTo(expectedX1, 1);
						expect(t.text()).to.be.equal(expectedText[i]);
					});
					
					done(1);
				}, 300);
			}));
		});

		describe("on category axis", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "a", "b", "c", "d"],
							["data1", 30, 200, 100, 400],
						]
					},
					axis: {
						x: {
							type: "category"
						}
					},
					grid: {
						x: {
							lines: [
								{value: 3, text: "Label 3"},
								{value: "a", text: "Label a"}
							]
						}
					}
				};
			});

			it("should show x grid lines", () => new Promise(done => {
				const lines = chart.$.main.selectAll(`.${$GRID.xgrid}-lines .${$GRID.xgrid}-line`);
				const expectedX1 = [524, 75];
				const expectedText = ["Label 3", "Label a"];

				setTimeout(() => {
					lines.each(function(id, i) {
						const line = d3Select(this);
						const l = line.select("line");
						const t = line.select("text");

						expect(+l.attr("x1")).to.be.closeTo(expectedX1[i], 1);
						expect(t.text()).to.be.equal(expectedText[i]);
					});

					done(1);
				}, 300);
			}));
		});
	});

	describe("Grid x/y", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 120, 200]
					],
					type: "line"
				},
				grid: {
					x: {
					  show: true
					},
					y: {
					  show: true
					}
				},
				interaction: {
					enabled: false
				}
			};
		});

		it("should generate grid lines when interaction is disabled", () => {
			const {grid} = chart.$;

			expect(grid.x.size()).to.be.equal(chart.data.values("sample").length);
			expect(grid.y.size()).to.be.equal(9);
		});
	});

	describe("Focus grid lines", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "area",
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y2: {
						show: true
					}
				},
				tooltip: {
					grouped: false
				},
				grid: {
					focus: {
						show: true,
						y: true,
						edge: true
					}
				}
			};
		});

		const checkFocusGridPosition = expectedPositions => {
			chart.$.grid.main.selectAll("line").each(function(d, i) {
				["x1", "y1", "x2", "y2"].forEach(v => {
					expect(+this.getAttribute(v)).to.be.closeTo(expectedPositions[i][v], 1);
				});
			});
		}

		it("check for y Axis based edge focus grid line", () => {
			// to show y Axis based focus grid line
			chart.tooltip.show({
				data: { index: 2, value: 300 }
			});

			checkFocusGridPosition([
				{ x1: 226, y1: 95, x2: 226, y2: 426 }, // xgrid-focus
				{ x1: 0, y1: 95, x2: 226, y2: 95 }, // ygrid-focus
			]);
		});

		it("check for y2 Axis based edge focus grid line", () => {
			// to show y2 Axis based focus grid line
			chart.tooltip.show({
				data: { index: 2, id: "data2", value: 140 }
			});

			checkFocusGridPosition([
				{ x1: 226, y1: 156, x2: 226, y2: 426 }, // xgrid-focus
				{ x1: 226, y1: 156, x2: 560, y2: 156 }, // ygrid-focus
			]);
		});

		it("set options args.grid.focus.edge=false", () => {
			args.grid.focus.edge = false;
		});

		it("check for y Axis based non-edge focus grid line", () => {
			// to show y Axis based focus grid line
			chart.tooltip.show({
				data: { index: 2, value: 300 }
			});

			checkFocusGridPosition([
				{ x1: 226, y1: 0, x2: 226, y2: 426 }, // xgrid-focus
				{ x1: 0, y1: 95, x2: 560, y2: 95 }, // ygrid-focus
			]);
		});

		it("check for y2 Axis based non-edge focus grid line", () => {
			// to show y2 Axis based focus grid line
			chart.tooltip.show({
				data: { index: 2, id: "data2", value: 140 }
			});

			checkFocusGridPosition([
				{ x1: 226, y1: 0, x2: 226, y2: 426 }, // xgrid-focus
				{ x1: 0, y1: 156, x2: 560, y2: 156 }, // ygrid-focus
			]);
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
			args.grid.focus.edge = true;
		});

		it("check for y Axis based edge focus grid line", () => {
			// to show y Axis based focus grid line
			chart.tooltip.show({
				x: 2,
				mouse: [375.5, 39.5]
			});

			checkFocusGridPosition([
				{ x1: 0, y1: 162, x2: 376, y2: 162 }, // xgrid-focus
				{ x1: 376, y1: 0, x2: 376, y2: 162 }, // ygrid-focus
			]);
		});

		it("check for y2 Axis based edge focus grid line", () => {
			// to show y2 Axis based focus grid line
			chart.tooltip.show({
				x: 2,
				mouse: [459.5, 38.5]
			});

			checkFocusGridPosition([
				{ x1: 0, y1: 162, x2: 460, y2: 162 }, // xgrid-focus
				{ x1: 460, y1: 162, x2: 460, y2: 400 }, // ygrid-focus
			]);
		});

		it("set options args.grid.focus.edge=false", () => {
			args.grid.focus.edge = false;
		});

		it("check for y Axis based non-edge focus grid line", () => {
			// to show y Axis based focus grid line
			chart.tooltip.show({
				x: 2,
				mouse: [375.5, 39.5]
			});

			checkFocusGridPosition([
				{ x1: 0, y1: 162, x2: 590, y2: 162 }, // xgrid-focus
				{ x1: 376, y1: 0, x2: 376, y2: 400 }, // ygrid-focus
			]);
		});

		it("check for y2 Axis based non-edge focus grid line", () => {
			// to show y2 Axis based focus grid line
			chart.tooltip.show({
				x: 2,
				mouse: [459.5, 38.5]
			});

			checkFocusGridPosition([
				{ x1: 0, y1: 162, x2: 590, y2: 162 }, // xgrid-focus
				{ x1: 460, y1: 0, x2: 460, y2: 400 }, // ygrid-focus
			]);
		});
	});

	describe("Grid text position", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150,
							250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 
							150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 
							150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 
							150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 
							30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 
							300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 
							170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 
							170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 
							220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 
							200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 
							200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 
							350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 
							150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 
							150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 
							400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 
							250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 
							250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 
							100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 
							150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 
							150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 
							150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 
							400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 
							100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 
							350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 
							100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 
							240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 
							240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 
							200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 
							170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 
							170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 
							40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 
							170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 
							240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 
							200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 
							240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 
							350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 
							400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 
							150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 
							100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 
							250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 
							150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 
							350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 
							200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 
							240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 
							270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 
							100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 
							150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 
							50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 
							200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 
							240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 
							400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 
							250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 
							350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 
							170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 
							30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 
							140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 
							400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 
							250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 
							120, 70, 40, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 
							200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 
							240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 200, 100, 
							150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 
							150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 
							220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40, 400
						]
					] 
				},
				grid: {
					x: {
						lines: [
							{
								value: 100,
								text: "S"
							},
							{
								value: 300,
								text: "S"
							},
							{
								value: 500,
								text: "S"
							}
						]
					}
				},
				point: {
					focus: { only: true }
				},
				zoom: {
					enabled: true,
					type: "drag"
				}
			};
		});

		it("Grid text position should be updated", () => new Promise(done => {
			const {main} = chart.$;
			const eventRect = main.select(`.${$EVENT.eventRect}-75`).node();

			new Promise((resolve, reject) => {
				util.fireEvent(eventRect, "mousedown", {
					clientX: 100,
					clientY: 150
				}, chart);

				resolve(true);
			}).then(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						util.fireEvent(eventRect, "mousemove", {
							clientX: 300,
							clientY: 150
						}, chart);

						resolve(true);
					}, 300);
				});  
			}).then(() => {
				setTimeout(() => {
					util.fireEvent(eventRect, "mouseup", {
						clientX: 300,
						clientY: 150
					}, chart);

					main.selectAll(`.${$GRID.gridLines} .${$GRID.xgridLine}`).each(function() {
						const lineX = +this.querySelector("line").getAttribute("x1");
						const textY = +this.querySelector("text").getAttribute("y");

						expect(lineX).to.be.equal(textY);
					});

					done(1);
				}, 300);
			});
		}));
	});
});
