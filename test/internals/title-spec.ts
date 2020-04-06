/**
 * Copyright (c) 2017 ~ present NAVER Corp.
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
				const title = chart.$.svg.select(".bb-title").node();
				const [x, y] = title.parentNode
					.getAttribute("transform")
					.split(",")
					.map(v => util.parseNum(v));

				expect(x).to.be.equal(chart.internal.currentWidth / 2);
				expect(y).to.be.equal(title.getBBox().height);
			});

			it("renders the title text", () => {
				const titleEl = chart.$.svg.select(".bb-title");

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
						position: "center"
					}
				};
			});

			describe("and position center", () => {
				it("renders the title at the default config position", () => {
					const title = chart.$.svg.select(".bb-title").node();
					const [x, y] = title.parentNode
						.getAttribute("transform")
						.split(",")
						.map(v => util.parseNum(v));
	
					expect(x).to.be.equal(chart.internal.currentWidth / 2);
					expect(y).to.be.equal(title.getBBox().height + args.title.padding.top);
				});

				it("adds the correct amount of padding to fit the title", () => {
					const height = chart.$.svg.select(".bb-title").node().getBBox().height;

					expect(chart.internal.getCurrentPaddingTop()).to.equal(
						args.title.padding.top + height + args.title.padding.bottom
					);
				});
			});

			describe("and position left", () => {
				before(() => {
					args.title.position = "left";
				});

				it("renders the title at the default config position", () => {
					const title = chart.$.svg.select(".bb-title").node();
					const [x, y] = title.parentNode
						.getAttribute("transform")
						.split(",")
						.map(v => util.parseNum(v));

					expect(x).to.be.equal(0);
					expect(y).to.be.equal(title.getBBox().height + args.title.padding.top);
				});
			});

			describe("and position right", () => {
				before(() => {
					args.title.position = "right";
				});

				it("renders the title at the default config position", () => {
					const title = chart.$.svg.select(".bb-title").node();
					const [x, y] = title.parentNode
						.getAttribute("transform")
						.split(",")
						.map(v => util.parseNum(v));

					expect(x).to.be.equal(chart.internal.currentWidth);
					expect(y).to.be.equal(title.getBBox().height + args.title.padding.top);
				});
			});
		});
	});
});
