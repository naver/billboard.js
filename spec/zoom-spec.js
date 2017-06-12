/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

describe("Zoom", function() {
	let chart;
	const args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 3150, 250],
				["data2", 50, 20, 10, 40, 15, 6025]
			]
		},
		axis: {
			x: {
				extent: [[1, 0], [2, 60]]
			}
		},
		zoom: {
			enable: true
		},
		subchart: {
			show: true
		}
	};

	beforeEach(() => {
		chart = util.initChart(chart, args);
	});

	describe("default extent", () => {
		describe("main chart domain", () => {
			it("should have original y domain", () => {
				const yDomain = chart.internal.y.domain();
				const expectedYDomain = [-591.5, 6626.5];

				expect(yDomain[0]).to.be.equal(expectedYDomain[0]);
				expect(yDomain[1]).to.be.equal(expectedYDomain[1]);
			});
		});

		describe("main chart domain", () => {
			it("should have original y domain in subchart", () => {
				const yDomain = chart.internal.y.domain();
				const subYDomain = chart.internal.subY.domain();

				expect(subYDomain[0]).to.be.equal(yDomain[0]);
				expect(subYDomain[1]).to.be.equal(yDomain[1]);
			});
		});

		describe("main chart domain", () => {
			it("should have specified brush extent", () => {
				const brushExtent = chart.internal.brush.extent()();
				const expectedBrushExtent = [[1, 0], [2, 60]];

				expect(brushExtent[0][1]).to.be.equal(expectedBrushExtent[0][1]);
				expect(brushExtent[1][1]).to.be.equal(expectedBrushExtent[1][1]);
			});
		});
	});
});
