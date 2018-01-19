/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";

describe("TITLE", () => {
	let chart;
	let args = {
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

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("when given a title config option", () => {
		describe("with no padding and no position", () => {
			it("renders the title at the default config position", () => {
				const titleEl = chart.internal.svg.select(".bb-title");

				expect(+titleEl.attr("x") + titleEl.node().getBBox().width / 2).to.be.closeTo(320, 1);
				expect(+titleEl.attr("y")).to.equal(titleEl.node().getBBox().height);
			});

			it("renders the title text", () => {
				const titleEl = chart.internal.svg.select(".bb-title");

				expect(titleEl.node().textContent).to.equal("new title");
			});
		});

		describe("with padding", () => {
			before(() => {
				args = {
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
						position: "top-center"
					}
				};
			});

			describe("and position center", () => {
				it("renders the title at the default config position", () => {
					const titleEl = chart.internal.svg.select(".bb-title");

					expect(+titleEl.attr("x") + titleEl.node().getBBox().width / 2).to.be.closeTo(320, 1);
					expect(+titleEl.attr("y")).to.be.closeTo(37, 2);
				});

				it("adds the correct amount of padding to fit the title", () => {
					expect(chart.internal.getCurrentPaddingTop()).to.equal(
						args.title.padding.top +
						chart.internal.svg.select(".bb-title").node().getBBox().height +
						args.title.padding.bottom
					);
				});
			});

			describe("and position left", () => {
				before(() => {
					args.title.position = "top-left";
				});

				it("renders the title at the default config position", () => {
					const titleEl = chart.internal.svg.select(".bb-title");

					expect(+titleEl.attr("x")).to.be.closeTo(50, 2);
					expect(+titleEl.attr("y")).to.be.closeTo(36, 2); // org : 34
				});
			});

			describe("and position right", () => {
				before(() => {
					args.title.position = "top-right";
				});

				it("renders the title at the default config position", () => {
					const titleEl = chart.internal.svg.select(".bb-title");

					expect(+titleEl.attr("x") + titleEl.node().getBBox().width).to.be.closeTo(610, 1);
					expect(+titleEl.attr("y")).to.be.closeTo(36, 2);
				});
			});
		});
	});
});
