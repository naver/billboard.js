/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {
	select as d3Select
} from "d3";
import util from "./assets/util";

describe("chart title", () => {
	let chart;
	let config;

	describe("when given a title config option", () => {
		describe("with no padding and no position", () => {
			beforeEach(done => {
				config = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250]
						]
					},
					axis: {
						x: {
							padding: {
								left: 0,
								right: 0,
							}
						}
					},
					title: {
						text: "new title"
					}
				};
				chart = util.initChart(chart, config, done);
			});

			it("renders the title at the default config position", () => {
				const titleEl = d3Select(".bb-title");

				expect(+titleEl.attr("x") + titleEl.node().getBBox().width / 2).to.be.closeTo(320, 1);
				expect(+titleEl.attr("y")).to.equal(titleEl.node().getBBox().height);
			});

			it("renders the title text", () => {
				const titleEl = d3Select(".bb-title");

				expect(titleEl.node().textContent).to.equal("new title");
			});
		});

		describe("with padding", () => {
			let config;
			const getConfig = function(titlePosition) {
				return {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250]
						]
					},
					title: {
						text: "positioned title",
						padding: {
							top: 20,
							right: 30,
							bottom: 40,
							left: 50
						},
						position: titlePosition
					}
				};
			};

			describe("and position center", () => {
				beforeEach(done => {
					config = getConfig("top-center");
					chart = util.initChart(chart, config, done);
				});
				it("renders the title at the default config position", () => {
					const titleEl = d3Select(".bb-title");

					expect(+titleEl.attr("x") + titleEl.node().getBBox().width / 2).to.be.closeTo(320, 1);
					expect(+titleEl.attr("y")).to.be.closeTo(37, 1);
				});
				it("adds the correct amount of padding to fit the title", () => {
					expect(chart.internal.getCurrentPaddingTop()).to.equal(
						config.title.padding.top + d3Select(".bb-title").node()
							.getBBox().height + config.title.padding.bottom
					);
				});
			});

			describe("and position left", () => {
				beforeEach(done => {
					config = getConfig("top-left");
					chart = util.initChart(chart, config, done);
				});
				it("renders the title at the default config position", () => {
					const titleEl = d3Select(".bb-title");

					expect(+titleEl.attr("x")).to.be.closeTo(50, 2);
					expect(+titleEl.attr("y")).to.be.closeTo(36, 2); // org : 34
				});
			});

			describe("and position right", () => {
				beforeEach(done => {
					config = getConfig("top-right");
					chart = util.initChart(chart, config, done);
				});
				it("renders the title at the default config position", () => {
					const titleEl = d3Select(".bb-title");
					expect(+titleEl.attr("x") + titleEl.node().getBBox().width).to.be.closeTo(610, 1);
					expect(+titleEl.attr("y")).to.be.closeTo(36, 2);
				});
			});
		});
	});
});
