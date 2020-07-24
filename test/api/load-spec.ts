/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import CLASS from "../../src/config/classes";
import util from "../assets/util";
import { area } from "../../src/config/resolver/shape";

describe("API load", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("XHR data loading", () => {
		before(() => {
			args = {
				data: {
					columns: []
				}
			};
		});

		it("should be load data via 'url'", done => {
			chart.load({
				url: "/base/test/assets/data/test.json",
				mimeType: "json",
				headers: {
					"Content-Type": "text/xml"
				},
				done: () => {
					expect(chart.data().length).to.be.equal(3);
					done();
				}
			});
		});
	});

	describe("check for load options", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30, 40, 50],
						["data2", 130, 100, 140, 35, 110]
					]
				},
				axis: {
					x: {
						type: "category"
					},
					y2: {
						show: true,
						max: 1000
					}
				}
			}
		});

		it("options has been updated properly?", done => {
			const className = "abcd";
			const color = "red";
			const categories = ["cat1", "cat2", "cat3", "cat4", "cat5"];

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 130, 120, 150, 140, 160],
						["data4", 30, 20, 50, 40, 60]
					],
					unload: ["data1"],
					type: "bar",
					classes: {
						"data1": className
					},
					colors: {
						"data2": color
					},
					categories,
					axes: {
						data2: "y2"
					},
					done: function() {
						const main = chart.$.main;

						// updated classname?
						expect(main.select(`.${CLASS.target}-data1.${CLASS.target}-${className}`).empty()).to.be.false;

						// updated category?
						expect(chart.categories()).to.deep.equal(categories);

						// updated color?
						expect(chart.color("data2")).to.be.equal(color);

						// updated type?
						expect(chart.config("data.types")).deep.equal({data1: "bar", data4: "bar"});

						// updated axes?
						expect(+main.selectAll(".bb-axis-y2 .tick tspan").nodes().pop().textContent).to.be.equal(1000);

						done();
					}
				});
			}, 500);
		});
	});

	describe("indexed data as column", () => {
		it("should load additional data", done => {
			const main = chart.$.main;
			const legend = chart.$.legend;

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
			const main = chart.$.main;
			const legend = chart.$.legend;

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
						const text = d3Select(this).select("tspan").text();

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
				const main = chart.$.main;
				const legend = chart.$.legend;

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
						expect(chart.$.circles.filter(d => d.id === "data3").size()).to.be.equal(3);
						expect(legendItem.size()).to.be.equal(1);

						tickTexts.each(function(d, i) {
							const text = d3Select(this).select("tspan").text();

							expect(text).to.be.equal(expected[i]);
						});

						done();
					}
				});
			});

			it("should load additional data #2", done => {
				const main = chart.$.main;
				const legend = chart.$.legend;

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
							const text = d3Select(this).select("tspan").text();

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

	describe("data point circle display", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 130, 100, 140, 200, 150],
						["data2", 230, 200, 240, 300, 250]
					  ]
				}
			};
		});

		it("when 'bar' type is loaded, circles should be removed", done => {
			const circleSize = chart.$.circles.size();

			// when
			chart.load({
				columns: [
					["data1", 200, 140, 240, 250, 250]
				],
				type: "bar",
				done: function() {
					expect(chart.$.circles.size()).to.be.equal(circleSize / 2);
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
							format: d3Format("$,")
						}
					},
					y2:{
						show: true,
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
		});

		it("check for .unload()", () => {
			const target = "data2";

			// when
			chart.unload({
				ids: target,
				done: () => {
					expect(chart.data(target).length).to.be.equal(0);
					expect(chart.internal.cache.get(target)).to.be.null;
				}
			});
		});
	});

	describe("check for event rect", () => {
		const cols = [
			["x",0, 10, 15, 20, 25, 30, 35, 40, 45, 50],
			["English",12,15,6,23,13,28,71,16,21,10],
			["Russian",0,0,1,2,0,0,5,0,1,1],
			["Spanish",0,3,0,2,0,0,1,0,1,2],
			["Portuguese",1,0,0,0,0,0,0,1,1,0],
			["German",0,0,0,0,0,1,0,0,0,1],
			["Dutch",0,0,0,0,0,0,0,0,0,0],
			["French",0,1,0,0,0,0,0,0,0,1],
			["Chinese",0,0,0,0,0,0,0,0,5,0],
		];
		const cols2 = [
			["x",0, 5, 7, 12, 20, 22, 23, 24, 30, 35],
			["English",12,9,31,26,17,6,11,23,20,12],
			["Russian",0,1,1,1,0,0,4,2,0,0],
			["Spanish",0,0,7,2,2,1,1,2,3,0],
			["Portuguese",1,1,4,0,0,0,0,0,0,0],
			["German",0,0,0,11,0,12,1,0,0,0],
			["Dutch",0,0,0,0,0,1,0,0,0,0],
			["French",0,0,2,2,0,0,0,0,2,0],
			["Chinese",0,0,0,0,0,0,0,0,0,0],
		];

		before(() => {
			args = {
				data: {
					x: "x",
					type: "area-spline",
					columns: cols
				}
			};
		});

		it("should be correctly updating eventRect elements", done => {
			chart.load({
				columns: cols2,
				done: () => {
					let lastX = 0;

					chart.$.main.selectAll(`.${CLASS.eventRects} rect`).each(function(v, i) {
						const x = +this.getAttribute("x");

						expect(x).to.be.above(lastX);
						expect(this.classList.contains(`${CLASS.eventRect}-${i}`)).to.be.true;

						lastX = x;
					});

					done();
				}
			});
		});
	});

	describe("different type loading", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
					]
				}
			};
		});

		it("check 'line' -> 'area' type loading", done => {
			const {areas} = chart.$.line;

			expect(areas).to.be.null;

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 100, 200, 300]
					],
					type: "area",
					done: function() {
						const {areas} = this.$.line;

						expect(areas && !areas.empty()).to.be.true;
						done();
					}
				});
			}, 500);
		});

		it("set options data.type='area'", () => {
			args.data.type = "area";
		});

		it("check 'area' -> 'area-spline' type loading", done => {
			const {areas} = chart.$.line;

			expect(areas && !areas.empty()).to.be.true;

			setTimeout(() => {
				chart.load({
					columns: [
						["data1", 100, 200, 300]
					],
					type: "area-spline",
					done: function() {
						const {areas} = this.$.line;

						expect(areas && !areas.empty()).to.be.true;

						// check for duplicated node appends
						expect(chart.$.main.selectAll(`.${CLASS.areas}`).size()).to.be.equal(1);
						done();
					}
				});
			}, 500);
		});
	});
});
