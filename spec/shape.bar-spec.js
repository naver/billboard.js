/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

const setMouseEvent = util.setMouseEvent;

describe("SHAPE BAR", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with groups", () => {
		describe("with indexed data", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"],
						],
						type: "bar"
					},
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3.select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("with timeseries data", () => {
			before(() => {
				args = {
					data: {
						x: "date",
						columns: [
							["date", "2012-12-24", "2012-12-25", "2012-12-26", "2012-12-27", "2012-12-28", "2012-12-29"],
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"],
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "timeseries",
						}
					}
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3.select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("with category data", () => {
			before(() => {
				args = {
					data: {
						x: "date",
						columns: [
							["date", "2012-12-24", "2012-12-25", "2012-12-26", "2012-12-27", "2012-12-28", "2012-12-29"],
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"],
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "category",
						}
					}
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3.select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});
	});

	describe("internal.isWithinBar", () => {
		describe("with normal axis", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", -150, 120, 110, 140, 115, 125]
						],
						type: "bar"
					},
					axis: {
						rotated: false
					}
				};

				expect(true).to.be.ok;
			});

			it("should not be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 0, 0);

				expect(chart.internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 31, 280);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});

			it("should not be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 280);

				expect(internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 350);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});
		});

		describe("with rotated axis", () => {
			before(() => {
				args.axis.rotated = true;
  			});

			it("should not be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 0, 0);

				expect(internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 190, 20);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});

			it("should be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 50);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});
		});
	});
});
