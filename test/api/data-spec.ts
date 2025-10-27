/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$AXIS, $LEGEND, $LINE} from "../../src/config/classes";

describe("API data", function() {
	let chart;
	const data = [
		["data", 30, 30, 100, 400, 150, 250],
		["data2", 5000, 2000, 1000, 4000, 1500, 2500]
	];

	beforeAll(() => {
		return new Promise((resolve) => {
			chart = util.generate({				
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
				},
				onrendered: resolve
			});
		});
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
			const legendText = {
				data: "New New Data Name Value 1",
				data2: "New New Data Name Value 2",
			};
			const pos = {};
			const updatedPos = {};

			chart.$.legend.selectAll("g").each(function(id) {
				pos[id] = [
					+this.querySelector("text").getAttribute("x"),
					+this.querySelector("rect").getAttribute("x")
				];
			});

			// when
			const results = chart.data.names(legendText);

			chart.$.legend.selectAll("g").each(function(id) {
				const text = this.querySelector("text");

				expect(results[id]).to.be.equal(text.textContent);

				updatedPos[id] = [
					+text.getAttribute("x"),
					+this.querySelector("rect").getAttribute("x")
				];
			});

			expect(results).to.be.deep.equal(legendText);

			Object.keys(updatedPos).forEach(id => {
				expect(updatedPos[id].every((v, i) => v >= pos[id][i])).to.be.true;
			});
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

		it("should set data.colors specified as API", () => new Promise(done => {
			setTimeout(() => {
				const svg = chart.$.svg;

				expect(toHex(svg.select(`.${$LINE.line}-data`).style("stroke")))
					.to.be.equal("#00ff00");

				expect(toHex(svg.select(`.${$LINE.line}-data2`).style("stroke")))
					.to.be.equal("#ff0000");

				expect(toHex(svg.select(`.${$LEGEND.legendItem}-data .${$LEGEND.legendItem}-tile`).style("stroke")))
					.to.be.equal("#00ff00");

				expect(toHex(svg.select(`.${$LEGEND.legendItem}-data2 .${$LEGEND.legendItem}-tile`).style("stroke")))
					.to.be.equal("#ff0000");

				done(1);
			}, 350);
		}));

	});

	describe("data.axes()", () => {
		it("should return data.axes specified as argument", () => {
			const main = chart.$.main;
			const results = chart.data.axes();

			expect(results.data).to.be.equal("y");
			expect(results.data2).to.be.equal("y2");

			expect(main.select(`.${$AXIS.axisY} g.tick text`).text())
				.to.be.equal("0");

			expect(main.select(`.${$AXIS.axisY2} g.tick text`).text())
				.to.be.equal("1000");
		});

		it("should return data.axes specified as API", () => new Promise(done => {
			const main = chart.$.main;
			const results = chart.data.axes({
				data: "y2",
				data2: "y"
			});

			setTimeout(() => {
				expect(results.data).to.be.equal("y2");
				expect(results.data2).to.be.equal("y");

				expect(main.select(`.${$AXIS.axisY} g.tick text`).text())
					.to.be.equal("1000");

				expect(main.select(`.${$AXIS.axisY2} g.tick text`).text())
					.to.be.equal("0");

				done(1);
			}, 350);
		}));
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

	describe("data.colors() with gradient", () => {
		let gradientChart;

		it("should update gradient stop colors for area_linearGradient", () => new Promise(done => {
			gradientChart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					type: "area",
					colors: {
						data1: "#ff0000",
						data2: "#00ff00"
					}
				},
				area: {
					linearGradient: {
						x: [0, 0],
						y: [0, 1],
						stops: [
							[0, "#ff0000", 1],
							[1, "#ff0000", 0]
						]
					}
				},
				onrendered: function() {
					const defs = this.$.defs;
					
					// Check initial gradient stop colors
					const gradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
					expect(toHex(gradientData1.attr("stop-color"))).to.be.equal("#ff0000");

					// Update colors
					this.data.colors({
						data1: "#0000ff",
						data2: "#ffff00"
					});

					setTimeout(() => {
						// Check updated gradient stop colors
						const updatedGradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
						expect(toHex(updatedGradientData1.attr("stop-color"))).to.be.equal("#0000ff");

						// Check that both stops have been updated
						const stops = defs.selectAll("[id$='-gradient-data1'] stop");
						stops.each(function() {
							expect(toHex(this.getAttribute("stop-color"))).to.be.equal("#0000ff");
						});

						gradientChart.destroy();
						done(1);
					}, 350);
				}
			});
		}));

		it("should update gradient stop colors for bar_linearGradient", () => new Promise(done => {
			gradientChart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar",
					colors: {
						data1: "#ff0000"
					}
				},
				bar: {
					linearGradient: {
						x: [0, 0],
						y: [0, 1],
						stops: [
							[0, "#ff0000", 1],
							[1, "#ff0000", 0]
						]
					}
				},
				onrendered: function() {
					const defs = this.$.defs;
					
					// Check initial gradient stop colors
					const gradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
					expect(toHex(gradientData1.attr("stop-color"))).to.be.equal("#ff0000");

					// Update colors
					this.data.colors({
						data1: "#00ff00"
					});

					setTimeout(() => {
						// Check updated gradient stop colors
						const updatedGradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
						expect(toHex(updatedGradientData1.attr("stop-color"))).to.be.equal("#00ff00");

						// Check that all stops have been updated
						const stops = defs.selectAll("[id$='-gradient-data1'] stop");
						stops.each(function() {
							expect(toHex(this.getAttribute("stop-color"))).to.be.equal("#00ff00");
						});

						gradientChart.destroy();
						done(1);
					}, 350);
				}
			});
		}));

		it("should update gradient stop colors for point_radialGradient", () => new Promise(done => {
			gradientChart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "scatter",
					colors: {
						data1: "#ff0000"
					}
				},
				point: {
					radialGradient: {
						cx: 0.5,
						cy: 0.5,
						r: 0.5,
						stops: [
							[0, "#ff0000", 1],
							[1, "#ff0000", 0]
						]
					}
				},
				onrendered: function() {
					const defs = this.$.defs;
					
					// Check initial gradient stop colors
					const gradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
					expect(toHex(gradientData1.attr("stop-color"))).to.be.equal("#ff0000");

					// Update colors
					this.data.colors({
						data1: "#ffff00"
					});

					setTimeout(() => {
						// Check updated gradient stop colors
						const updatedGradientData1 = defs.select("[id$='-gradient-data1'] stop:first-child");
						expect(toHex(updatedGradientData1.attr("stop-color"))).to.be.equal("#ffff00");

						// Check that all stops have been updated
						const stops = defs.selectAll("[id$='-gradient-data1'] stop");
						stops.each(function() {
							expect(toHex(this.getAttribute("stop-color"))).to.be.equal("#ffff00");
						});

						gradientChart.destroy();
						done(1);
					}, 350);
				}
			});
		}));

		it("should not update gradient stop colors when stops have different colors", () => new Promise(done => {
			// Manually modify gradient after creation to have different colors
			gradientChart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "area",
					colors: {
						data1: "#ff0000"
					}
				},
				area: {
					linearGradient: {
						x: [0, 0],
						y: [0, 1],
						stops: [
							[0, "#ff0000", 1],
							[1, "#ff0000", 0]
						]
					}
				},
				onrendered: function() {
					const defs = this.$.defs;
					
					// Manually set different colors for stops to simulate mixed gradient
					// Using style instead of setAttribute since the code checks style.stopColor
					const stops = defs.selectAll("[id$='-gradient-data1'] stop");
					stops.nodes()[0].style.stopColor = "#ff0000";
					stops.nodes()[1].style.stopColor = "#0000ff";

					// Verify initial colors
					const initialFirstColor = toHex(stops.nodes()[0].style.stopColor);
					const initialLastColor = toHex(stops.nodes()[1].style.stopColor);
					
					expect(initialFirstColor).to.be.equal("#ff0000");
					expect(initialLastColor).to.be.equal("#0000ff");

					// Update colors
					this.data.colors({
						data1: "#00ff00"
					});

					setTimeout(() => {
						// Check that gradient stops remain unchanged (different colors)
						const updatedStops = defs.selectAll("[id$='-gradient-data1'] stop");
						const updatedFirstColor = toHex(updatedStops.nodes()[0].style.stopColor);
						const updatedLastColor = toHex(updatedStops.nodes()[1].style.stopColor);
						
						expect(updatedFirstColor).to.be.equal("#ff0000");
						expect(updatedLastColor).to.be.equal("#0000ff");

						gradientChart.destroy();
						done(1);
					}, 350);
				}
			});
		}));

		it("should update gradient stop colors for data id with spaces", () => new Promise(done => {
			gradientChart = util.generate({
				data: {
					columns: [
						["data 1", 30, 200, 100, 400, 150, 250],
						["data 2", 50, 20, 10, 40, 15, 25]
					],
					type: "area",
					colors: {
						"data 1": "#ff0000",
						"data 2": "#00ff00"
					}
				},
				area: {
					linearGradient: {
						x: [0, 0],
						y: [0, 1],
						stops: [
							[0, "#ff0000", 1],
							[1, "#ff0000", 0]
						]
					}
				},
				onrendered: function() {
					const defs = this.$.defs;
					
					// Check initial gradient stop colors for data id with spaces
					const gradientData1 = defs.select("[id$='-gradient-data-1'] stop:first-child");
					expect(toHex(gradientData1.attr("stop-color"))).to.be.equal("#ff0000");

					// Update colors
					this.data.colors({
						"data 1": "#0000ff",
						"data 2": "#ffff00"
					});

					setTimeout(() => {
						// Check updated gradient stop colors
						const updatedGradientData1 = defs.select("[id$='-gradient-data-1'] stop:first-child");
						expect(toHex(updatedGradientData1.attr("stop-color"))).to.be.equal("#0000ff");

						// Check that both stops have been updated
						const stops = defs.selectAll("[id$='-gradient-data-1'] stop");
						stops.each(function() {
							expect(toHex(this.getAttribute("stop-color"))).to.be.equal("#0000ff");
						});

						gradientChart.destroy();
						done(1);
					}, 350);
				}
			});
		}));
	});
});
