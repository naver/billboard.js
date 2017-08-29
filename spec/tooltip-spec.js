/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";
import CLASS from "../src/config/classes";

describe("TOOLTIP", function() {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		},
		tooltip: {}
	};
	let spy;

	// check for the tooltip's ordering
	const checkTooltip = (chart, expected) => {
		const eventRect = chart.internal.main
			.select(`.${CLASS.eventRect}-2`)
			.node();

		util.fireEvent(eventRect, "mousemove", {
			clientX: 100,
			clientY: 100
		}, chart);

		const tooltips =  d3.select(chart.element)
			.selectAll(`.${CLASS.tooltip} tr`)
			.nodes();

		if (expected) {
			for (let i = 1, el; (el = tooltips[i]); i++) {
				expect(el.className).to.be.equal(expected[i - 1]);
			}
		}
	};


	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("tooltip position", () => {
		describe("without left margin", () => {
			it("should show tooltip on proper position", () => {
				const eventRect = chart.internal.main.select(`.${CLASS.eventRect}-2`).node();

				util.fireEvent(eventRect, "mousemove", {
					clientX: 100,
					clientY: 100
				}, chart);

				const tooltipContainer = chart.internal.tooltip;
				const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
				const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));
				const topExpected = 115;
				const leftExpected = 280;

				expect(top).to.be.equal(topExpected);
				expect(left).to.be.above(leftExpected);
			});
		});

		describe("with left margin", () => {
			before(() => {
				chart.element.style.marginLeft = "300px";
			});

			it("should show tooltip on proper position", () => {
				const eventRect = chart.internal.main.select(`.${CLASS.eventRect}-2`).node();

				util.fireEvent(eventRect, "mousemove", {
					clientX: 100,
					clientY: 100
				}, chart);

				const tooltipContainer = d3.select(chart.element).select(`.${CLASS.tooltipContainer}`);
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
			args.tooltip = {
				position: (data, width, height, element) => {
					expect(data.length).to.be.equal(args.data.columns.length);
					expect(data[0].index).to.be.equal(2);
					expect(data[0].value).to.be.equal(100);
					expect(data[0].id).to.be.equal("data1");
					expect(width).to.be.above(0);
					expect(height).to.be.above(0);
					expect(element).to.be.equal(chart.internal.main.select(`.${CLASS.eventRect}-2`).node());

					return {
						top: topExpected,
						left: leftExpected
					};
				}
			};
		});

		it("should be set to the coordinate where the function returned", () => {
			const eventRect = chart.internal.main.select(`.${CLASS.eventRect}-2`).node();

			util.fireEvent(eventRect, "mousemove", {
				clientX: 100,
				clientY: 100
			}, chart);

			const tooltipContainer =  d3.select(chart.element).select(`.${CLASS.tooltipContainer}`);
			const top = Math.floor(+tooltipContainer.style("top").replace(/px/, ""));
			const left = Math.floor(+tooltipContainer.style("left").replace(/px/, ""));

			expect(top).to.be.equal(topExpected);
			expect(left).to.be.equal(leftExpected);
		});
	});

	describe("tooltip order", () => {
		it("should sort values in descending order", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data3",
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data2"
			]);
		});

		it("set options data.order=asc", () => {
			args.data.order = "asc";
		});

		it("should sort values ascending order", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data2",
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data3"
			]);
		});

		it("set options data.order=null", () => {
			args.data.order = null;
		});

		it("set options data.order=null", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data2",
				"bb-tooltip-name-data3"
			]);
		});

		// check for stacking bar
		it("set options data.groups", () => {
			args.data.type = "bar";
			args.data.groups = [["data1", "data2", "data3"]];
			args.data.order = "desc";
		});

		it("stacked bar: should sort values in descending order", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data3",
				"bb-tooltip-name-data2"
			]);
		});

		it("set options data.order=asc", () => {
			args.data.order = "asc";
		});

		it("stacked bar: should sort values in ascending order", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data2",
				"bb-tooltip-name-data3",
				"bb-tooltip-name-data1"
			]);
		});

		it("set options data.order=null", () => {
			args.data.order = null;
		});

		it("stacked bar: should be ordered in data input order", () => {
			checkTooltip(chart, [
				"bb-tooltip-name-data1",
				"bb-tooltip-name-data2",
				"bb-tooltip-name-data3"
			]);
		});

		it("set options data.order=function", () => {
			args.data.order = spy = sinon.spy(function(a, b) {
				return a.value - b.value;
			});
		});

		it("data.order function should be called", () => {
			checkTooltip(chart);
 			expect(spy.called).to.be.true;
		});
	});
});
