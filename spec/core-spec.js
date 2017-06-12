/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("Core", function() {
	let chart;
	let args = {
		svg: {
			classname: "customclass"
		},
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		}
	};

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("init", function() {
		it("should be created", () => {
			const svg = d3.select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should set 3rd party property to Function", () => {
			Function.prototype.$extIsFunction = true;
			expect(true).to.be.ok;
		});

		it("should be created even if 3rd party property has been set", () => {
			const svg = d3.select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should be created with a custom class", () => {
			const svg = d3.select("#chart svg");

			expect(svg.attr("class")).not.to.be.null;
			expect(svg.attr("class")).to.be.equal("customclass");
		});
	});

	describe("size", function() {
		it("should have same width", () => {
			const svg = d3.select("#chart svg");

			expect(+svg.attr("width")).to.be.equal(640);
		});

		it("should have same height", () => {
			const svg = d3.select("#chart svg");

			expect(+svg.attr("height")).to.be.equal(480);
		});

	});

	describe("bindto", function() {
		describe("selector", function() {
			it("update args", function() {
				d3.select("#chart").html("");
				args.bindto = "#chart";
				expect(true).to.be.ok;
			});

			it("should be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		describe("d3.selection object", () => {
			it("update args", () => {
				d3.select("#chart").html("");
				args.bindto = d3.select("#chart");
				expect(true).to.be.ok;
			});

			it("should be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		describe("null", () => {
			it("update args", () => {
				d3.select("#chart").html("");
				args.bindto = "#chart-dummy";
				expect(true).to.be.ok;
			});

			it("should not be created", () => {
				const svg = d3.select("#chart svg");
				expect(svg.size()).to.be.equal(0);
			});
		});

		describe("empty string", () => {
			it("update args", () => {
				d3.select("#chart").html("");
				args.bindto = "#chart-dummy";
				expect(true).to.be.ok;
			});
			it("should not be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(0);
			});
		});

	});

	describe("empty data", () => {
		it("should upaate args for empty data", () => {
			args = {
				data: {
					columns: [
						["data1"],
						["data2"]
					]
				}
			};

			expect(true).to.be.ok;
		});

		it("should generate a chart", () => {
			const ticks = chart.internal.main.select(".bb-axis-x")
				.selectAll("g.tick");

			expect(ticks.size()).to.be.equal(0);
		});

		it("should upaate args for empty data", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x"],
						["data1"],
						["data2"]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				}
			};
			expect(true).to.be.ok;
		});

		it("should generate a chart", () => {
			const ticks = chart.internal.main.select(".bb-axis-x")
				.selectAll("g.tick");

			expect(ticks.size()).to.be.equal(0);
		});
	});
});
