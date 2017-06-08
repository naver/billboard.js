/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {
	select as d3Select,
} from "d3";
import util from "./assets/util";

const setMouseEvent = util.setMouseEvent;

describe("chart shape bar", () => {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("with groups", () => {
		describe("with indexed data", () => {
			it("should update args", () => {
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
				return expect(true).to.be.ok;
			});
			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("with timeseries data", () => {
			it("should update args", () => {
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
				return expect(true).to.be.ok;
			});
			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("with category data", () => {
			it("should update args", () => {
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
				return expect(true).to.be.ok;
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.internal.main.selectAll(".bb-bars-data1 .bb-bar").each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});
	});

	describe("internal.isWithinBar", () => {
		describe("with normal axis", () => {
			it("should update args", () => {
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
				return expect(true).to.be.ok;
			});

			it("should not be within bar", () => {
				const bar = d3Select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 0, 0);
				return expect(chart.internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const bar = d3Select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 31, 280);
				return expect(chart.internal.isWithinBar(bar)).to.be.ok;
			});

			it("should not be within bar of negative value", () => {
				const bar = d3Select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 280);
				return expect(chart.internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar of negative value", () => {
				const bar = d3Select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 350);
				return expect(chart.internal.isWithinBar(bar)).to.be.ok;
			});
		});

		describe("with rotated axis", () => {
			it("should change the chart as axis rotated", () => {
				args.axis.rotated = true;
				return expect(true).to.be.ok;
			});

			it("should not be within bar", () => {
				const bar = d3Select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 0, 0);
				return expect(chart.internal.isWithinBar(bar)).to.not.be.ok;
			});

			it("should be within bar", () => {
				const bar = d3Select(".bb-target-data1 .bb-bar-0").node();

				setMouseEvent(chart, "click", 190, 20);
				return expect(chart.internal.isWithinBar(bar)).to.be.ok;
			});

			it("should be within bar of negative value", () => {
				const bar = d3Select(".bb-target-data3 .bb-bar-0").node();

				setMouseEvent(chart, "click", 68, 50);
				return expect(chart.internal.isWithinBar(bar)).to.be.ok;
			});
		});
	});
});
