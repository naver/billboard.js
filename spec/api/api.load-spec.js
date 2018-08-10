/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("API load", function() {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 5000, 2000, 1000, 4000, 1500, 2500]
			]
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("indexed data as column", () => {
		it("should load additional data", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.load({
				columns: [
					["data3", 800, 500, 900, 500, 1000, 700]
				],
				done: () => {
					const target = main.select(`.${CLASS.chartLine}.${CLASS.target}.${CLASS.target}-data3`);
					const legendItem = legend.select(`.${CLASS.legendItem}.${CLASS.legendItem}-data3`);
					const circles = main.selectAll(`.${CLASS.circles}.${CLASS.circles}-data3 circle`);

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);
					expect(circles.size()).to.be.equal(6);

					done();
				}
			});
		});
	});

	describe("timeseries data as column", () => {
		let date = ["2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"];

		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x"].concat(date),
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 5000, 2000, 1000, 4000, 1500, 2500]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				},
			};
		});

		it("should load additional data", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.load({
				columns: [
					["x"].concat(date.concat().splice(1, 3)),
					["data3", 400, 500, 450]
				],
				done: () => {
					const target = main.select(`.${CLASS.chartLine}.${CLASS.target}.${CLASS.target}-data3`);
					const legendItem = legend.select(`.${CLASS.legendItem}.${CLASS.legendItem}-data3`);
					const circles = main.selectAll(`.${CLASS.circles}.${CLASS.circles}-data3 circle`);
					const tickTexts = main.selectAll(`.${CLASS.axisX} g.tick text`);

					expect(target.size()).to.be.equal(1);
					expect(legendItem.size()).to.be.equal(1);
					expect(circles.size()).to.be.equal(3);

					tickTexts.each(function(d, i) {
						const text = d3.select(this).select("tspan").text();

						expect(text).to.be.equal(date[i]);
					});

					done();
				}
			});
		});
	});

	describe("category data", () => {
		before(() => {
			args = {
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
			};
		});

		describe("as column", () => {
			it("should load additional data #1", done => {
				const main = chart.internal.main;
				const legend = chart.internal.legend;

				chart.load({
					columns: [
						["x", "cat2", "cat3", "cat4"],
						["data3", 800, 500, 900]
					],
					done: () => {
						const target = main.select(`.${CLASS.chartLine}.${CLASS.target}.${CLASS.target}-data3`);
						const legendItem = legend.select(`.${CLASS.legendItem}.${CLASS.legendItem}-data3`);
						const tickTexts = main.selectAll(`.${CLASS.axisX} g.tick text`);
						const expected = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];

						expect(target.size()).to.be.equal(1);
						expect(target.selectAll("circle").size()).to.be.equal(3);
						expect(legendItem.size()).to.be.equal(1);

						tickTexts.each(function(d, i) {
							const text = d3.select(this).select("tspan").text();

							expect(text).to.be.equal(expected[i]);
						});

						done();
					}
				});
			});

			it("should load additional data #2", done => {
				const main = chart.internal.main;
				const legend = chart.internal.legend;

				chart.load({
					columns: [
						["x", "new1", "new2", "new3", "new4", "new5", "new6"],
						["data3", 800, 500, 900, 500, 1000, 700]
					],
					done: () => {
						const target = main.select(`.${CLASS.chartLine}.${CLASS.target}.${CLASS.target}-data3`);
						const legendItem = legend.select(`.${CLASS.legendItem}.${CLASS.legendItem}-data3`);
						const tickTexts = main.selectAll(`.${CLASS.axisX} g.tick text`);
						const expected = ["new1", "new2", "new3", "new4", "new5", "new6"];

						expect(target.size()).to.be.equal(1);
						expect(legendItem.size()).to.be.equal(1);

						tickTexts.each(function(d, i) {
							const text = d3.select(this).select("tspan").text();

							expect(text).to.be.equal(expected[i]);
						});

						done();
					}
				});
			});
		});
	});

	describe("JSON data", () => {
		before(() => {
			args.data = {
				json: [
					{name: "www.site1.com", upload: 200, download: 200},
					{name: "www.site2.com", upload: 100, download: 300},
					{name: "www.site3.com", upload: 300, download: 200},
					{name: "www.site4.com", upload: 400, download: 100}
				],
				keys: {
					x: "name",
					value: ["upload", "download"]
				}
			};
		});

		it("should load json data", done => {
			const json = [
				{name: "www.site5.com", upload: 300, download: 100},
				{name: "www.site6.com", upload: 400, download: 200},
				{name: "www.site7.com", upload: 200, download: 400},
				{name: "www.site8.com", upload: 100, download: 500}
			];

			chart.load({
				json,
				done: () => {
					const categories = chart.categories();
					const upload = chart.data.values("upload");
					const download = chart.data.values("download");

					json.forEach((v, i) => {
						expect(v.name).to.be.equal(categories[i]);
						expect(v.upload).to.be.equal(upload[i]);
						expect(v.download).to.be.equal(download[i]);
					});

					done();
				}
			});
		});
	});

	describe("y Axis Label", () => {
		before(() => {
			args = {
				data: {
					columns: [
						['data1', 30, 200, 100, 400, 150],
						['data2', 45, 423, 356, 478, 166]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y: {
						label: {
							text: "Y Label",
								position: "outer-middle"
						},
						tick: {
							count: 5,
							format: d3.format("$,")
						}
					},
					y2:{
						show:true,
							label: {
							text: "Y2 Label",
							position: "outer-middle"
						}
					}
				}
			}
		});

		it("should be updated the axis label position ", done => {
			const axisLabel = chart.$.main.select(`.${CLASS.axisYLabel}`);
			const dy = +axisLabel.attr("dy");

			chart.load({
				columns: [
					["data5", 2300000, 1900000, 3000000, 5000000, 3000000]
				],
				unload: ["data1"],
				done: () => {
					setTimeout(() => {
						expect(+axisLabel.attr("dy")).to.be.below(dy);
						done();
					}, 500);
				}
			});

		})
	});
});
