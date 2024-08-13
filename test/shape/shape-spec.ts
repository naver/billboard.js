/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";

describe("SHAPE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("shapes rendering", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
					  ["data1", 100, 200, 300, 400, 500],
					  ["data2", -100, -200, -300, -400, -500]
					],
					types: {
					  data1: "area-step",
					  data2: "bar"
					},
					axes: {
					  data1: "y",
					  data2: "y2"
					},
					labels: {
					  show: true
					}
				  },
				  area: {
					linearGradient: true
				},
				axis: {
					y: {
					  show: true,
					  min: -1000,
					  max: 1000
					},
					y2: {
					  show: true,
					  min: -1000,
					  max: 1000
					}
				},
				legend: {
					show: false
				}
			};
		});

		it("area/bars combination with positive and negative values", () => {
			const expectedY = 228;

			// check area
			let rect = chart.$.line.areas.node().getBoundingClientRect();

			expect(rect.y + rect.height).to.be.equal(expectedY);

			// check area data label text position
			chart.$.text.texts.filter(d => d.id === "data1").each(function() {
				expect(this.getBoundingClientRect().y).to.be.below(expectedY);
			});
			
			// check bars
			let height = 0;

			chart.$.bar.bars.each(function() {
				rect = this.getBoundingClientRect();

				expect(rect.y).to.be.equal(expectedY);
				expect(rect.height).to.be.above(height);

				height = rect.height;
			});

			// check bars data label text position
			chart.$.text.texts.filter(d => d.id === "data2").each(function() {
				expect(this.getBoundingClientRect().y).to.be.above(expectedY);
			});
		});
	});
});
