/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("GRID", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
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
						show: false
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
				expectedYs[i] = +d3.select(this).attr("y1");
			});

			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(`.${CLASS.ygrid}`).size()).to.be.equal(5);

			chart.internal.main.select(`.${CLASS.axisY}`).selectAll(".tick").each(function(d, i) {
				let y = d3.select(this).attr("transform").match(/\d+\)/);

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

	describe("y grid lines", () => {
		describe("position #1", () => {
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
						const line = d3.select(this);
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
					const text = d3.select(this).select("text");
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
						const line = d3.select(this);
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
					const text = d3.select(this).select("text");
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
					const x1 = Number(d3.select(this).select("line").attr("x1"));

					expect(x1).to.be.closeTo(expectedX1s[i], 1);
				});
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function (d, i) {
					const text = d3.select(this).select("text");
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
					const y1 = +d3.select(this).select("line").attr("y1");

					expect(y1).to.be.closeTo(expectedY1s[i], 1);
				});
			});

			it("should locate grid texts properly", () => {
				const lines = chart.internal.main.selectAll(`.${CLASS.xgrid}-lines .${CLASS.xgrid}-line`);
				const expectedPositions = ["start", "middle", "end"];
				const expectedDxs = [4, 0, -4];

				lines.each(function(d, i) {
					const text = d3.select(this).select("text");
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
					const line = d3.select(this);
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
					const line = d3.select(this);
					const l = line.select("line");
					const t = line.select("text");

					expect(+l.attr("x1")).to.be.closeTo(expectedX1[i], 1);
					expect(t.text()).to.be.equal(expectedText[i]);
				});
			});
		});
	});
});
