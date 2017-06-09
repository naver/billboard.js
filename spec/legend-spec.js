/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {
	selectAll as d3SelectAll,
	select as d3Select,
} from "d3";
import util from "./assets/util";

describe("chart legend", () => {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("legend when multiple charts rendered", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 50],
						["data3", 100]
					]
				}
			};
			expect(true).to.be.ok;
		});

		it("should update args with long data names", () => {
			args = {
				data: {
					columns: [
						["long data name 1", 30],
						["long data name 2", 50],
						["long data name 3", 90],
					]
				}
			};
			expect(true).to.be.ok;
		});

		it("should have properly computed legend width", () => {
			const isChrome = (window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1);
			const expectedLeft = isChrome ? [156, 266, 378] : [133, 260, 386];
			const expectedWidth = isChrome ? [112, 114, 104] : [129, 129, 119];

			d3SelectAll(".bb-legend-item").each(function(d, i) {
				const rect = d3Select(this)
					.node()
					.getBoundingClientRect();

				expect(rect.left).to.be.closeTo(expectedLeft[i], 20);
				expect(rect.width).to.be.closeTo(expectedWidth[i], 20);
			});
		});
	});

	describe("legend position", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				}
			};
			expect(true).to.be.ok;
		});
		it("should be located on the center of chart", () => {
			const box = chart.internal.legend.node()
				.getBoundingClientRect();

			expect(box.left + box.right).to.be.equal(638); // org : 640
		});
	});
	describe("legend as inset", () => {
		it("should change the legend to 'inset' successfully", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				legend: {
					position: "inset",
					inset: {
						step: null
					}
				}
			};
			expect(true).to.be.ok;
		});
		it("should be positioned properly", () => {
			const box = d3Select(".bb-legend-background").node()
				.getBoundingClientRect();

			expect(box.top).to.be.equal(5.5);
			expect(box.left).to.be.above(30);
		});
		it("should have automatically calculated height", () => {
			const box = d3Select(".bb-legend-background").node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});
		it("should change the legend step to 1 successfully", () => {
			args.legend.inset.step = 1;
			expect(true).to.be.ok;
		});
		it("should have automatically calculated height", () => {
			const box = d3Select(".bb-legend-background").node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
		});
		it("should change the legend step to 2 successfully", () => {
			args.legend.inset.step = 2;
			expect(true).to.be.ok;
		});
		it("should have automatically calculated height", () => {
			const box = d3Select(".bb-legend-background").node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});
		it("should update args to have only one series", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				legend: {
					position: "inset"
				}
			};
			expect(true).to.be.ok;
		});
		it("should locate legend properly", () => {
			const box = d3Select(".bb-legend-background").node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
			expect(box.width).to.be.above(61);  // org : 64
		});
	});
	describe("legend.hide", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: true
				}
			};
			expect(true).to.be.ok;
		});
		it("should not show legends", () => {
			d3SelectAll(".bb-legend-item").each(function() {
				expect(d3Select(this).style("visibility")).to.be.equal("hidden");
			});
		});
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: "data2"
				}
			};
			expect(true).to.be.ok;
		});
		it("should not show legends", () => {
			expect(d3Select(".bb-legend-item-data1").style("visibility")).to.be.equal("visible");
			expect(d3Select(".bb-legend-item-data2").style("visibility")).to.be.equal("hidden");
		});
	});
	describe("legend.show", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					show: false
				}
			};

			expect(true).to.be.ok;
		});

		it("should not initially have rendered any legend items", () => {
			expect(d3SelectAll(".bb-legend-item").empty()).to.be.equal(true);
		});

		it("allows us to show the legend on showLegend call", function() {
			chart.legend.show();
			d3SelectAll(".bb-legend-item").each(function() {
				expect(d3Select(this).style("visibility")).to.be.equal("visible");
				// This selects all the children, but we expect it to be empty
				expect(d3Select(this).size()).not.to.equal(0); // d3SelectAll("*")
			});
		});
	});
	describe("custom legend size", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					item: {
						tile: {
							width: 15,
							height: 2
						}
					}
				}
			};

			expect(true).to.be.ok;
		});

		it("renders the legend item with the correct width and height", () => {
			d3SelectAll(".bb-legend-item-tile").each(function() {
				const tileWidth = d3Select(this).attr("x2") - d3Select(this).attr("x1");

				expect(d3Select(this).style("stroke-width")).to.be.equal(`${args.legend.item.tile.height}px`);
				expect(tileWidth).to.be.equal(args.legend.item.tile.width);
			});
		});
	});

	describe("custom legend padding", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["padded1", 30, 200, 100, 400, 150, 250],
						["padded2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					padding: 10
				}
			};
			expect(true).to.be.ok;
		});

		it("renders the correct amount of padding on the legend element", function() {
			d3SelectAll(".bb-legend-item-padded1 .bb-legend-item-title, .bb-legend-item-padded2 .bb-legend-item-title").each(function(el, index) {
				const itemWidth = d3Select(this)
					.node()
					.parentNode
					.getBBox()
					.width;
				const textBoxWidth = d3Select(d3Select(this).node().parentNode)
					.d3Select("text")
					.node()
					.getBBox()
					.width;
				const tileWidth = 15; // default value is 10, plus 5 more for padding
				const expectedWidth = textBoxWidth + tileWidth + (index ? 0 : 10) + args.legend.padding;

				expect(itemWidth).to.be.equal(expectedWidth);
			});
		});
	});
});
