/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";

describe("TITLE", () => {
	let chart;
	let args: any = {
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
				const titleRect = title.getBoundingClientRect();
				const [x, y] = title.parentNode
					.getAttribute("transform")
					.split(",")
					.map(v => util.parseNum(v));

				expect(x).to.be.equal(chart.internal.state.current.width / 2);
				expect(y).to.be.equal(titleRect.height);
				expect(title.style.textAnchor).to.be.equal("middle");
			});

			it("renders the title text", () => {
				const titleEl = chart.$.svg.select(".bb-title");

				expect(titleEl.node().textContent).to.equal("new title");
			});
		});

		describe("with padding", () => {
			beforeAll(() => {
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
					const titleRect = title.getBoundingClientRect();
					const [x, y] = title.parentNode
						.getAttribute("transform")
						.split(",")
						.map(v => util.parseNum(v));
	
					expect(x).to.be.equal(chart.internal.state.current.width / 2);
					expect(y).to.be.equal(titleRect.height + args.title.padding.top);
					expect(title.style.textAnchor).to.be.equal("middle");
				});

				it("adds the correct amount of padding to fit the title", () => {
					const height = chart.$.svg.select(".bb-title").node().getBBox().height;

					expect(chart.internal.getCurrentPaddingByDirection("top")).to.equal(
						args.title.padding.top + height + args.title.padding.bottom
					);
				});

				it("check x axis <clipPath>'s height", () => {
					const {internal: {state}, $: {svg}} = chart;
					const xClipPath = svg.select(`#${state.clip.idXAxis} rect`).node();

					expect(Math.abs(+xClipPath.getAttribute("y"))).to.be.below(100);
					
				});
			});

			describe("and position left", () => {
				beforeAll(() => {
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
				beforeAll(() => {
					args.title.position = "right";
				});

				it("renders the title at the default config position", () => {
					const title = chart.$.svg.select(".bb-title").node();
					const [x, y] = title.parentNode
						.getAttribute("transform")
						.split(",")
						.map(v => util.parseNum(v));

					expect(x).to.be.equal(chart.internal.state.current.width);
					expect(y).to.be.equal(title.getBBox().height + args.title.padding.top);
				});
			});
		});
	});
});
