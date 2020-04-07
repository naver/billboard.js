/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API data", function() {
	const data = [
		["data", 30, 30, 100, 400, 150, 250],
		["data2", 5000, 2000, 1000, 4000, 1500, 2500]
	];

	const chart = util.generate({
		data: {
			columns: data,
			names: {
				data: "Data Name 1",
				data2: "Data Name 2"
			},
			colors: {
				data: "#FF0000",
				data2: "#00FF00"
			},
			axes: {
				data: "y",
				data2: "y2"
			}
		},
		axis: {
			y2: {
				show: true
			}
		}
	});

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

	describe("data()", () => {
		it("should return all of data if no argument given", () => {
			const results = chart.data();
			const expected = ["data", "data2"];

			results.forEach((result, i) => {
				expect(result.id).to.be.equal(expected[i]);
			});
		});

		it("should return specifid data if string argument given", () => {
			let result = chart.data("data");

			expect(result.length).to.be.equal(1);
			expect(result[0].id).to.be.equal("data");

			// when
			result = chart.data("data2");

			expect(result.length).to.be.equal(1);
			expect(result[0].id).to.be.equal("data2");
		});

		it("should return specifid data if array argument given", () => {
			const results = chart.data(["data", "data2"]);

			expect(results.length).to.be.equal(2);
			expect(results[0].id).to.be.equal("data");
			expect(results[1].id).to.be.equal("data2");
		});

	});

	describe("data.shown()", () => {
		it("should return only shown targets", () => {
			let results;

			chart.hide("data");
			results = chart.data.shown();

			expect(results.length).to.be.equal(1);
			expect(results[0].id).to.be.equal("data2");

			// revert
			chart.show("data");
		});

	});

	describe("data.values()", () => {
		it("should return values for specified target", () => {
			const expectedValues1 = data[0].slice(1);
			const expectedValues2 = data[1].slice(1);

			// retrieve one data value
			let values = chart.data.values("data");

			expect(values.length).to.be.equal(expectedValues1.length);

			values.forEach((v, i) => {
				expect(v).to.be.equal(expectedValues1[i]);
			});

			// retrieve two data values
			values = chart.data.values(["data", "data2"]);

			expect(values.length).to.be.equal(expectedValues1.length + expectedValues2.length);

			values.forEach((v, i) => {
				const expected = expectedValues1.concat(expectedValues2);

				expect(v).to.be.equal(expected[i]);
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

			expect(results.data).to.be.equal("Data Name 1");
			expect(results.data2).to.be.equal("Data Name 2");
		});

		it("should return data.names specified as API", () => {
			const results = chart.data.names({
				data: "New Data Name 1",
				data2: "New Data Name 2"
			});

			expect(results.data).to.be.equal("New Data Name 1");
			expect(results.data2).to.be.equal("New Data Name 2");
		});

		it("should set data.names specified as API", () => {
			const svg = chart.$.svg;

			expect(svg.select(`.${CLASS.legendItem}-data text`).text())
				.to.be.equal("New Data Name 1");

			expect(svg.select(`.${CLASS.legendItem}-data2 text`).text())
				.to.be.equal("New Data Name 2");
		});
	});

	describe("data.colors()", () => {
		it("should return data.colors specified as argument", () => {
			const results = chart.data.colors();

			expect(toHex(results.data)).to.be.equal("#FF0000");
			expect(toHex(results.data2)).to.be.equal("#00FF00");
		});

		it("should return data.colors specified as API", () => {
			const results = chart.data.colors({
				data: "#00FF00",
				data2: "#FF0000"
			});

			expect(toHex(results.data)).to.be.equal("#00FF00");
			expect(toHex(results.data2)).to.be.equal("#FF0000");
		});

		it("should set data.colors specified as API", done => {
			setTimeout(() => {
				const svg = chart.$.svg;

				expect(toHex(svg.select(`.${CLASS.line}-data`).style("stroke")))
					.to.be.equal("#00ff00");

				expect(toHex(svg.select(`.${CLASS.line}-data2`).style("stroke")))
					.to.be.equal("#ff0000");

				expect(toHex(svg.select(`.${CLASS.legendItem}-data .${CLASS.legendItem}-tile`).style("stroke")))
					.to.be.equal("#00ff00");

				expect(toHex(svg.select(`.${CLASS.legendItem}-data2 .${CLASS.legendItem}-tile`).style("stroke")))
					.to.be.equal("#ff0000");

				done();
			}, 500);
		});

	});

	describe("data.axes()", () => {
		it("should return data.axes specified as argument", () => {
			const main = chart.$.main;
			const results = chart.data.axes();

			expect(results.data).to.be.equal("y");
			expect(results.data2).to.be.equal("y2");

			expect(main.select(`.${CLASS.axisY} g.tick text`).text())
				.to.be.equal("0");

			expect(main.select(`.${CLASS.axisY2} g.tick text`).text())
				.to.be.equal("1000");
		});

		it("should return data.axes specified as API", done => {
			const main = chart.$.main;
			const results = chart.data.axes({
				data: "y2",
				data2: "y"
			});

			setTimeout(() => {
				expect(results.data).to.be.equal("y2");
				expect(results.data2).to.be.equal("y");

				expect(main.select(`.${CLASS.axisY} g.tick text`).text())
					.to.be.equal("1000");

				expect(main.select(`.${CLASS.axisY2} g.tick text`).text())
					.to.be.equal("0");

				done();
			}, 500);
		});
	});

	describe("data.min/max()", () => {
		it("should return min value", () => {
			// @ts-ignore
			const min = Math.min(...data[0].slice(1));
			const minData = chart.data.min();

			minData.forEach(v => {
				expect(v.value).to.be.equal(min);
			});
		});

		it("should return max value", () => {
			// @ts-ignore
			const max = Math.max(...data[1].slice(1));
			const maxData = chart.data.max();

			maxData.forEach(v => {
				expect(v.value).to.be.equal(max);
			});
		});
	});
});
