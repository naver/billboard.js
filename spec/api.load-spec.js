/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API load", function() {
	let chart;

	describe("indexed data", () => {
		describe("as column", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					]
				}
			});

			it("should load additional data", done => {
				const main = chart.internal.main;
				const legend = chart.internal.legend;

				chart.load({
					columns: [
						["data3", 800, 500, 900, 500, 1000, 700]
					]
				});

				setTimeout(() => {
					const target = main.select(".bb-chart-line.bb-target.bb-target-data3");
					const legendItem = legend.select(".bb-legend-item.bb-legend-item-data3");

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);

					done();
				}, 500);
			});

		});

	});

	describe("category data", () => {
		chart = util.generate({
			data: {
				x: "x",
				columns: [
					["x", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6"],
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 5000, 2000, 1000, 4000, 1500, 2500]
				]
			},
			axis: {
				x: {
					type: "category"
				}
			}
		});

		describe("as column", () => {
			it("should load additional data", done => {
				const main = chart.internal.main;
				const legend = chart.internal.legend;

				chart.load({
					columns: [
						["data3", 800, 500, 900, 500, 1000, 700]
					]
				});

				setTimeout(() => {
					const target = main.select(".bb-chart-line.bb-target.bb-target-data3");
					const legendItem = legend.select(".bb-legend-item.bb-legend-item-data3");
					const tickTexts = main.selectAll(".bb-axis-x g.tick text");
					const expected = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);

					tickTexts.each(function(d, i) {
						const text = d3.select(this).select("tspan").text();

						expect(text).to.be.equal(expected[i]);
					});

					done();
				}, 500);
			});

			it("should load additional data", done => {
				const main = chart.internal.main;
				const legend = chart.internal.legend;

				chart.load({
					columns: [
						["x", "new1", "new2", "new3", "new4", "new5", "new6"],
						["data3", 800, 500, 900, 500, 1000, 700]
					]
				});

				setTimeout(() => {
					const target = main.select(".bb-chart-line.bb-target.bb-target-data3");
					const legendItem = legend.select(".bb-legend-item.bb-legend-item-data3");
					const tickTexts = main.selectAll(".bb-axis-x g.tick text");
					const expected = ["new1", "new2", "new3", "new4", "new5", "new6"];

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);

					tickTexts.each(function(d, i) {
						const text = d3.select(this).select("tspan").text();

						expect(text).to.be.equal(expected[i]);
					});

					done();
				}, 500);
			});
		});
	});
});
