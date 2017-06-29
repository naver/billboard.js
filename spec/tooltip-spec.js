/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("Tooltip", function() {
	let chart;
	let tooltipConfiguration;
	let args = () => ({
			data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 50, 20, 10, 40, 15, 25],
					["data3", 150, 120, 110, 140, 115, 125]
				],
			},
			tooltip: tooltipConfiguration
		});

	beforeEach(() => {
		chart = util.initChart(chart, args());
	});

	describe("tooltip position", () => {
		before(() => {
			tooltipConfiguration = {};
		});

		describe("without left margin", () => {
			it("should show tooltip on proper position", () => {
				const eventRect = d3.select(".bb-event-rect-2").node();

				util.setMouseEvent(chart, "mousemove", 100, 100, eventRect);

				const tooltipContainer = d3.select(".bb-tooltip-container");
				const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
				const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));
				const topExpected = 115;
				const leftExpected = 280;

				expect(top).to.be.equal(topExpected);
				expect(left).to.be.above(leftExpected);
			});
		});

		describe("with left margin", () => {
			it("should set left margin", () => {
				d3.select("#chart").style("margin-left", "300px");
				expect(true).to.be.ok;
			});

			it("should show tooltip on proper position", () => {
				const eventRect = d3.select(".bb-event-rect-2").node();

				util.setMouseEvent(chart, "mousemove", 100, 100, eventRect);

				const tooltipContainer = d3.select(".bb-tooltip-container");
				const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
				const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));
				const topExpected = 115;
				const leftExpected = 280;

				expect(top).to.be.equal(topExpected);
				expect(left).to.be.above(leftExpected);
			});
		});
	});

	describe("tooltip positionFunction", () => {
		const topExpected = 37;
		const leftExpected = 79;

		before(() => {
			tooltipConfiguration = {
				position: (data, width, height, element) => {
					expect(data.length).to.be.equal(args().data.columns.length);
					expect(data[0].index).to.be.equal(2);
					expect(data[0].value).to.be.equal(100);
					expect(data[0].id).to.be.equal("data1");
					expect(width).to.be.above(0);
					expect(height).to.be.above(0);
					expect(element).to.be.equal(d3.select(".bb-event-rect-2").node());

					return {
						top: topExpected,
						left: leftExpected
					};
				}
			};
		});

		it("should be set to the coordinate where the function returned", () => {
				const eventRect = d3.select(".bb-event-rect-2").node();

				util.setMouseEvent(chart, "mousemove", 100, 100, eventRect);

				const tooltipContainer = d3.select(".bb-tooltip-container");
				const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
				const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));

				expect(top).to.be.equal(topExpected);
				expect(left).to.be.equal(leftExpected);
			});
	});

	describe("tooltip getTooltipContent", () => {
		it("should sort values desc", () => {
			const eventRect = d3.select(".bb-event-rect-2").node();

			util.setMouseEvent(chart, "mousemove", 100, 100, eventRect);

			const tooltips = d3.selectAll(".bb-tooltip tr").nodes();
			const len = tooltips.length;
			const expected = [
				"",
				"bb-tooltip-name-data3",
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data2"
			];

			for (let i = 0; i < len; i++) {
				expect(tooltips[i].className).to.be.equal(expected[i]);
			}
		});
	});
});
