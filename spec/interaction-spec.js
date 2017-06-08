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

describe("chart interaction", () => {
	const isChrome = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("generate event rects", () => {
		describe("custom x", () => {
			it("should generate bar chart", () => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 0, 1000, 3000, 10000],
							["data", 10, 10, 10, 10]
						],
						type: "bar"
					}
				};
				return expect(true).to.be.ok;
			});

			it("should have 4 event rects properly", () => {
				const lefts = isChrome ? [69, 130, 198, 403] : [78, 138, 205.5, 407.5];
				const widths = isChrome ? [61, 68, 205, 197.5] : [60, 67.5, 202, 194];

				d3SelectAll(".bb-event-rect").each(function(d, i) {
					const box = d3Select(this).node()
						.getBoundingClientRect();

					expect(box.left).to.be.closeTo(lefts[i], 10);
					expect(box.width).to.be.closeTo(widths[i], 10);
				});
			});

			it("should generate bar chart with only one data", () => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 0],
							["data", 10]
						],
						type: "bar"
					}
				};
				return expect(true).to.be.ok;
			});

			it("should have 1 event rects properly", () => {
				const eventRects = d3SelectAll(".bb-event-rect");

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function() {
					const box = d3Select(this).node()
						.getBoundingClientRect();

					expect(box.left).to.be.closeTo(isChrome ? 30.5 : 40.5, 10);
					expect(box.width).to.be.closeTo(isChrome ? 608 : 598, 10);
				});
			});
		});

		describe("timeseries", () => {
			it("should generate line chart with timeseries", () => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "20140101", "20140201", "20140210", "20140301"],
							["data", 10, 10, 10, 10]
						]
					}
				};
				return expect(true).to.be.ok;
			});

			it("should have 4 event rects properly", () => {
				const lefts = isChrome ? [33.5, 185.5, 348, 497.5] : [43.5, 193, 353, 500];
				const widths = isChrome ? [152, 162.5, 149.5, 138.5] : [149.5, 160, 147, 136];

				d3SelectAll(".bb-event-rect").each(function(d, i) {
					const box = d3Select(this).node()
						.getBoundingClientRect();

					expect(box.left).to.be.closeTo(lefts[i], 10);
					expect(box.width).to.be.closeTo(widths[i], 10);
				});
			});

			it("should generate line chart with only 1 data timeseries", () => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "20140101"],
							["data", 10]
						]
					}
				};

				return expect(true).to.be.ok;
			});

			it("should have 1 event rects properly", () => {
				const eventRects = d3SelectAll(".bb-event-rect");

				expect(eventRects.size()).to.be.equal(1);

				eventRects.each(function() {
					const box = d3Select(this).node()
						.getBoundingClientRect();

					expect(box.left).to.be.closeTo(isChrome ? 30.5 : 40.5, 10);
					expect(box.width).to.be.closeTo(isChrome ? 608 : 598, 10);
				});
			});
		});
	});
});
