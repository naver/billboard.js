/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

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
			let barWidth = 0;

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
							["data1", "data2"]
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "timeseries"
						}
					}
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3.select(this).node()
						.getBoundingClientRect();

					// Get bar width for the next test
					if (i === 0) {
						barWidth = rect.width;
					}

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});

			it("set options axis.x.tick.count", () => {
				args.axis.x.tick = {
					count: 3
				};
			});

			it("check for bar width regardless tick count limit", () => {
				const width = chart.internal.main.select(".bb-bars-data1 .bb-bar").node()
					.getBoundingClientRect().width;

				expect(width).to.be.equal(barWidth);
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
			});

			it("should not be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 0,
					clientY: 0
				}, chart);

				expect(chart.internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 31,
					clientY: 280
				}, chart);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});

			it("should not be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 68,
					clientY: 280
				}, chart);

				expect(internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 68,
					clientY: 350
				}, chart);

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

				util.fireEvent(null, "click", {
					clientX: 0,
					clientY: 0
				}, chart);

				expect(internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data1 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 190,
					clientY: 20
				}, chart);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});

			it("should be within bar of negative value", () => {
				const internal = chart.internal;
				const bar = internal.main.select(".bb-target-data3 .bb-bar-0").node();

				util.fireEvent(null, "click", {
					clientX: 68,
					clientY: 50
				}, chart);

				expect(internal.isWithinBar(bar)).to.be.ok;
			});
		});
	});
});
