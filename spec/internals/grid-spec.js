/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {select as d3Select} from "d3-selection";
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("GRID", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("check for default grid lines", () => {
		before(() => {
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
				const grid = chart.$.grid.selectAll(`.${isX ? CLASS.xgrids : CLASS.ygrids} line`).nodes();

				chart.$.main.selectAll(`.${isX ? CLASS.axisX : CLASS.axisY} .tick`).each(function(d, i) {
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
				const axis = chart.$.main.selectAll(`.${isX ? CLASS.axisX : CLASS.axisY} line`).nodes();
				const prop = isX ? "x" : "y";
	
				chart.$.grid.selectAll(`.${isX ? CLASS.xgrids : CLASS.ygrids} line`)
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
				const axis = chart.$.main.selectAll(`.${isX ? CLASS.axisX : CLASS.axisY} line`).nodes();
				const prop = isX ? "y" : "x";
	
				chart.$.grid.selectAll(`.${isX ? CLASS.xgrids : CLASS.ygrids} line`)
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
		before(() => {
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
			expect(chart.internal.main.select(`.${CLASS.ygrids}`).size()).to.be.equal(0);
		});

		it("set options grid.y.show=true", () => {
			args.grid.y.show = true;
		});

		it("should show y grids", function() {
			const ygrids = chart.internal.main.select(`.${CLASS.ygrids}`);

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${CLASS.ygrid}`).size()).to.be.equal(9);
		});

		it("set options grid.y.ticks=3", () => {
			args.grid.y.ticks = 3;
		});

		it("should show only 3 y grids", () => {
			const ygrids = chart.internal.main.select(`.${CLASS.ygrids}`);

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${CLASS.ygrid}`).size()).to.be.equal(3);
		});

		it("set options axis.y.tick.count=5", () => {
			args.axis.y.tick.count = 5;
		});

		it("should show grids depending on y axis ticks", () => {
			const ygrids = chart.internal.main.select(`.${CLASS.ygrids}`);
			const expectedYs = [];

			ygrids.selectAll(`.${CLASS.ygrid}`).each(function(d, i) {
				expectedYs[i] = +d3Select(this).attr("y1");
			});

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${CLASS.ygrid}`).size()).to.be.equal(5);

			chart.internal.main.select(`.${CLASS.axisY}`).selectAll(".tick").each(function(d, i) {
				let y = d3Select(this).attr("transform").match(/\d+\)/);

				if (y.length >= 1) {
					y = parseInt(y[0]);
				}

				expect(y).to.be.closeTo(expectedYs[i], 1);
			});
		});
	});

	describe("front option", () => {
		it("grid element should positioned before chart element", () => {
			const grid = chart.internal.main.select(`.${CLASS.grid}`).node();
			const nextSiblingClassName = grid.nextSibling.getAttribute("class");

			expect(nextSiblingClassName).to.be.equal(CLASS.chart);
		});

		it("set options grid.front=true", () => {
			args.grid.front = true;
		});

		it("grid element should positioned after gridLines element", () => {
			const grid = chart.internal.main.select(`.${CLASS.xgridFocus}`).node().parentNode;
			const previousSiblingClassName = grid.previousSibling.getAttribute("class");

			expect(previousSiblingClassName).to.be.equal(`${CLASS.grid} ${CLASS.gridLines}`);
		});
	});

	describe("check node generation", () => {
		it("set options args.grid.y.lines = []", () => {
			args.grid.y.lines = [];
		});

		it("shouldn't be generating grid elements", () => {
			expect(chart.$.main.select(`.${CLASS.grid}.${CLASS.gridLines}`).empty()).to.be.true;
		});
	});

	describe("y grid lines", () => {
		describe("position #1", () => {7
			before(() => {
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
				expect(chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", done => {
				setTimeout(() => {
					const lines = chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line line`);
					const expectedY1s = [373, 268, 196];

					lines.each(function (d, i) {
						const line = d3Select(this);
						const y1 = +line.attr("y1");

						y1 && expect(y1).to.be.closeTo(expectedY1s[i], 1);
					});

					done();
				}, 500);
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line`);
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
			before(() => {
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
				expect(chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", done => {
				setTimeout(() => {
					const lines = chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line line`);
					const expectedX1s = [75, 220, 321];

					lines.each(function(d, i) {
						const line = d3Select(this);
						const x1 = Number(line.attr("x1"));

						x1 && expect(x1).to.be.closeTo(expectedX1s[i], 1);
					});

					done();
				}, 500);
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.ygrid}-lines .${CLASS.ygrid}-line`);
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
				const gridLines = chart.internal.main.select(`.${CLASS.grid}-lines`).node();
				const previousSiblingClassName = gridLines.previousSibling.getAttribute("class");

				expect(previousSiblingClassName).to.be.equal(CLASS.chart);
			});

			it("set options grid.lines.front=false", () => {
				args.grid.lines = {front: false};
			});

			it("grid lines should positioned before grid element", () => {
				const gridLines = chart.internal.main.select(`.${CLASS.grid}-lines`).node();
				const nextSiblingClassName = gridLines.nextSibling.getAttribute("class");

				expect(nextSiblingClassName).to.be.equal(CLASS.grid);
			});
		});
	});

	describe("x grid lines", () => {
		describe("position #1", () => {
			before(() => {
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

			it("should show 3 grid lines", () => {
				expect(chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedX1s = [202, 397, 593];

				lines.each(function (d, i) {
					const x1 = Number(d3Select(this).select("line").attr("x1"));

					expect(x1).to.be.closeTo(expectedX1s[i], 1);
				});
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
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
			before(() => {
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
					},
				};
			});

			it("should show 3 grid lines", () => {
				expect(chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`).size()).to.be.equal(3);
			});

			it("should locate grid lines properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedY1s = [144, 283, 421];

				lines.each(function(d, i) {
					const y1 = +d3Select(this).select("line").attr("y1");

					expect(y1).to.be.closeTo(expectedY1s[i], 1);
				});
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
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
			before(() => {
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

			it("should show x grid lines", () => {
				const lines = chart.internal.main.select(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedX1 = 593;
				const expectedText = ["Label 3"];

				lines.each(function(id, i) {
					const line = d3Select(this);
					const l = line.select("line");
					const t = line.select("text");

					expect(+l.attr("x1")).to.be.closeTo(expectedX1, 1);
					expect(t.text()).to.be.equal(expectedText[i]);
				});
			});

		});

		describe("on category axis", () => {
			before(() => {
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

			it("should show x grid lines", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedX1 = [524, 75];
				const expectedText = ["Label 3", "Label a"];

				lines.each(function(id, i) {
					const line = d3Select(this);
					const l = line.select("line");
					const t = line.select("text");

					expect(+l.attr("x1")).to.be.closeTo(expectedX1[i], 1);
					expect(t.text()).to.be.equal(expectedText[i]);
				});
			});
		});
	});

	describe("Focus grid lines", () => {
		before(() => {
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
			chart.$.grid.selectAll("line").each(function(d, i) {
				["x1", "y1", "x2", "y2"].forEach(v => {
					expect(+this.getAttribute(v)).to.be.equal(expectedPositions[i][v]);
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
});
