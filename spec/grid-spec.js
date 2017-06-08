/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("chart grid", function () {
	var chart, args;

	beforeEach(function (done) {
		chart = util.initChart(chart, args, done);
	});

	describe("y grid show", function () {

		it("should update args", function () {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					y: {
						tick: {
						}
					}
				},
				grid: {
					y: {
						show: false
					}
				}
			};
			expect(true).to.be.ok;
		});

		it("should not show y grids", function () {
			expect(chart.internal.main.select(".bb-ygrids").size()).to.be.equal(0);
		});

		it("should update args to show y grids", function () {
			args.grid.y.show = true;
			expect(true).to.be.ok;
		});

		it("should show y grids", function () {
			var ygrids = chart.internal.main.select(".bb-ygrids");
			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(".bb-ygrid").size()).to.be.equal(9);
		});

		it("should update args to show only 3 y grids", function () {
			args.grid.y.ticks = 3;
			expect(true).to.be.ok;
		});

		it("should show only 3 y grids", function () {
			var ygrids = chart.internal.main.select(".bb-ygrids");
			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(".bb-ygrid").size()).to.be.equal(3);
		});

		it("should update args to show y grids depending on y axis ticks", function () {
			args.axis.y.tick.count = 5;
			expect(true).to.be.ok;
		});

		it("should show grids depending on y axis ticks", function () {
			var ygrids = chart.internal.main.select(".bb-ygrids"),
				expectedYs = [];
			ygrids.selectAll(".bb-ygrid").each(function (d, i) {
				expectedYs[i] = +d3.select(this).attr("y1");
			});
			expect(ygrids.size()).to.be.equal(1);
			expect(ygrids.selectAll(".bb-ygrid").size()).to.be.equal(5);
			chart.internal.main.select(".bb-axis-y").selectAll(".tick").each(function (d, i) {
				var y = d3.select(this).attr("transform")
					.match(/\d+\)/);
				if (y.length >= 1) {
					y = parseInt(y[0]);
				}
				expect(y).to.be.closeTo(expectedYs[i], 1);
			});
		});
	});

	describe("y grid lines", function () {

		describe("position", function () {

			it("should update args", function () {
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
				expect(true).to.be.ok;
			});

			it("should show 3 grid lines", function () {
				expect(chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line").size()).to.be.equal(3);
			});

			it("should locate grid lines properly", function () {
				var lines = chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line"),
					expectedY1s = [373, 268, 196];
				lines.each(function (d, i) {
					var y1 = Number(d3.select(this).select("line").attr("y1"));
					expect(y1).to.be.closeTo(expectedY1s[i], 1);
				});
			});

			it("should locate grid texts properly", function () {
				var lines = chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line"),
					expectedPositions = ["start", "middle", "end"],
					expectedDxs = [4, 0, -4];
				lines.each(function (d, i) {
					var text = d3.select(this).select("text"),
						textAnchor = text.attr("text-anchor"),
						dx = text.attr("dx");
					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});

			it("should update args", function () {
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
				expect(true).to.be.ok;
			});

			it("should show 3 grid lines", function () {
				expect(chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line").size()).to.be.equal(3);
			});

			it("should locate grid lines properly", function () {
				var lines = chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line"),
					expectedX1s = [75, 220, 321];
				lines.each(function (d, i) {
					var x1 = Number(d3.select(this).select("line").attr("x1"));
					expect(x1).to.be.closeTo(expectedX1s[i], 1);
				});
			});

			it("should locate grid texts properly", function () {
				var lines = chart.internal.main.selectAll(".bb-ygrid-lines .bb-ygrid-line"),
					expectedPositions = ["start", "middle", "end"],
					expectedDxs = [4, 0, -4];
				lines.each(function (d, i) {
					var text = d3.select(this).select("text"),
						textAnchor = text.attr("text-anchor"),
						dx = text.attr("dx");
					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});

		});
	});

	describe("x grid lines", function () {

		describe("position", function () {

			it("should have correct height", function () {
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
				expect(true).to.be.ok;
			});

			it("should show 3 grid lines", function () {
				expect(chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line").size()).to.be.equal(3);
			});

			it("should locate grid lines properly", function () {
				var lines = chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line"),
					expectedX1s = [202, 397, 593];
				lines.each(function (d, i) {
					var x1 = Number(d3.select(this).select("line").attr("x1"));
					expect(x1).to.be.closeTo(expectedX1s[i], 1);
				});
			});

			it("should locate grid texts properly", function () {
				var lines = chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line"),
					expectedPositions = ["start", "middle", "end"],
					expectedDxs = [4, 0, -4];
				lines.each(function (d, i) {
					var text = d3.select(this).select("text"),
						textAnchor = text.attr("text-anchor"),
						dx = text.attr("dx");
					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});

			it("should update args", function () {
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
				expect(true).to.be.ok;
			});

			it("should show 3 grid lines", function () {
				expect(chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line").size()).to.be.equal(3);
			});

			it("should locate grid lines properly", function () {
				var lines = chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line"),
					expectedY1s = [144, 283, 421];
				lines.each(function (d, i) {
					var y1 = Number(d3.select(this).select("line").attr("y1"));
					expect(y1).to.be.closeTo(expectedY1s[i], 1);
				});
			});

			it("should locate grid texts properly", function () {
				var lines = chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line"),
					expectedPositions = ["start", "middle", "end"],
					expectedDxs = [4, 0, -4];
				lines.each(function (d, i) {
					var text = d3.select(this).select("text"),
						textAnchor = text.attr("text-anchor"),
						dx = text.attr("dx");
					expect(textAnchor).to.be.equal(expectedPositions[i]);
					expect(+dx).to.be.equal(expectedDxs[i]);
				});
			});

		});

		describe("with padding.top", function () {

			it("should have correct height", function () {
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
				expect(true).to.be.ok;
			});

			it("should show x grid lines", function () {
				var lines = chart.internal.main.select(".bb-xgrid-lines .bb-xgrid-line"),
					expectedX1 = 593,
					expectedText = ["Label 3"];
				lines.each(function (id, i) {
					var line = d3.select(this),
						l = line.select("line"),
						t = line.select("text");
					expect(+l.attr("x1")).to.be.closeTo(expectedX1, 1);
					expect(t.text()).to.be.equal(expectedText[i]);
				});
			});

		});

		describe("on category axis", function () {

			it("should update args", function () {
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
				expect(true).to.be.ok;
			});

			it("should show x grid lines", function () {
				var lines = chart.internal.main.selectAll(".bb-xgrid-lines .bb-xgrid-line"),
					expectedX1 = [524, 75],
					expectedText = ["Label 3", "Label a"];
				lines.each(function (id, i) {
					var line = d3.select(this),
						l = line.select("line"),
						t = line.select("text");
					expect(+l.attr("x1")).to.be.closeTo(expectedX1[i], 1);
					expect(t.text()).to.be.equal(expectedText[i]);
				});
			});

		});
	});

});
