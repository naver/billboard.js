/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API data", function() {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 5000, 2000, 1000, 4000, 1500, 2500]
			],
			names: {
				data1: "Data Name 1",
				data2: "Data Name 2"
			},
			colors: {
				data1: "#FF0000",
				data2: "#00FF00"
			},
			axes: {
				data1: "y",
				data2: "y2"
			}
		},
		axis: {
			y2: {
				show: true
			}
		}
	};

	function toHex(value) {
		function rgb2hex(rgb) {
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

			return (rgb && rgb.length === 4) ? "#" +
				("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : "";
		}

		return value.match("rgb") ? rgb2hex(value) : value;
	}

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("data()", () => {

		it("should return all of data if no argument given", () => {
			const results = chart.data();
			const expected = ["data1", "data2"];

			results.forEach(function (result, i) {
				expect(result.id).to.be.equal(expected[i]);
			});
		});

		it("should return specifid data if string argument given", () => {
			const results = chart.data("data1");

			expect(results.length).to.be.equal(1);
			expect(results[0].id).to.be.equal("data1");
		});

		it("should return specifid data if array argument given", () => {
			const results = chart.data(["data1", "data2"]);

			expect(results.length).to.be.equal(2);
			expect(results[0].id).to.be.equal("data1");
			expect(results[1].id).to.be.equal("data2");
		});

	});

	describe("data.shown()", () => {
		it("should return only shown targets", () => {
			let results;

			chart.hide("data1");
			results = chart.data.shown();

			expect(results.length).to.be.equal(1);
			expect(results[0].id).to.be.equal("data2");
		});

	});

	describe("data.values()", () => {
		it("should return values for specified target", () => {
			const values = chart.data.values("data1");
			const expectedValues = [30, 200, 100, 400, 150, 250];

			expect(values.length).to.be.equal(6);

			values.forEach((v, i) => {
				expect(v).to.be.equal(expectedValues[i]);
			});
		});

		it("should return null when no args", () => {
			const values = chart.data.values();

			expect(values).to.be.null;
		});

	});

	describe("data.names()", () => {
		it("should return data.names specified as argument", () => {
			const results = chart.data.names();

			expect(results.data1).to.be.equal("Data Name 1");
			expect(results.data2).to.be.equal("Data Name 2");
		});

		it("should return data.names specified as api", () => {
			const results = chart.data.names({
				data1: "New Data Name 1",
				data2: "New Data Name 2"
			});

			expect(results.data1).to.be.equal("New Data Name 1");
			expect(results.data2).to.be.equal("New Data Name 2");
		});

		it("should set data.names specified as api", () => {
			expect(d3.select(".bb-legend-item-data1 text").text())
				.to.be.equal("New Data Name 1");

			expect(d3.select(".bb-legend-item-data2 text").text())
				.to.be.equal("New Data Name 2");
		});

	});

	describe("data.colors()", () => {
		it("should return data.colors specified as argument", () => {
			const results = chart.data.colors();

			expect(toHex(results.data1)).to.be.equal("#FF0000");
			expect(toHex(results.data2)).to.be.equal("#00FF00");
		});

		it("should return data.colors specified as api", () => {
			const results = chart.data.colors({
				data1: "#00FF00",
				data2: "#FF0000"
			});

			expect(toHex(results.data1)).to.be.equal("#00FF00");
			expect(toHex(results.data2)).to.be.equal("#FF0000");
		});

		it("should set data.colors specified as api", () => {
			expect(toHex(d3.select(".bb-line-data1").style("stroke")))
				.to.be.equal("#00ff00");

			expect(toHex(d3.select(".bb-line-data2").style("stroke")))
				.to.be.equal("#ff0000");

			expect(toHex(d3.select(".bb-legend-item-data1 .bb-legend-item-tile").style("stroke")))
				.to.be.equal("#00ff00");

			expect(toHex(d3.select(".bb-legend-item-data2 .bb-legend-item-tile").style("stroke")))
				.to.be.equal("#ff0000");
		});

	});

	describe("data.axes()", () => {

		it("should return data.axes specified as argument", () => {
			const results = chart.data.axes();

			expect(results.data1).to.be.equal("y");
			expect(results.data2).to.be.equal("y2");

			expect(d3.select(".bb-axis-y g.tick text").text())
				.to.be.equal("0");

			expect(d3.select(".bb-axis-y2 g.tick text").text())
				.to.be.equal("1000");
		});

		it("should return data.axes specified as api", () => {
			const results = chart.data.axes({
				data1: "y2",
				data2: "y"
			});

			expect(results.data1).to.be.equal("y2");
			expect(results.data2).to.be.equal("y");

			expect(d3.select(".bb-axis-y g.tick text").text())
				.to.be.equal("1000");

			expect(d3.select(".bb-axis-y2 g.tick text").text())
				.to.be.equal("0");
		});
	});
});
