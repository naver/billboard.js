/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import bb from "../../src";

describe("API chart", () => {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400],
				["data2", 500, 800, 500, 2000]
			]
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("flush()", () => {
		it("should be flushed correctly", () => {
			const svg = d3Select(chart.$.main.node().parentNode);
			const width = +svg.attr("width");

			svg.attr("width", 100);
			chart.flush();

			expect(+svg.attr("width")).to.be.equal(width);
		});
	});

	describe("groups()", () => {
		it("set options ", () => {
			args.data.type = "bar";
		});

		it("should not have any group set", () => {
			expect(chart.groups().length).to.be.equal(0);
		});

		it("should update groups correctly", done => {
			const main = chart.$.main;
			const path = main.select(`.${CLASS.bars}-data1 path`);
			const barWidth = util.getBBox(path).width;

			chart.groups([
				["data1", "data2"]
			]);

			setTimeout(() => {
				// check for the groups data set
				expect(chart.groups()[0].length).to.be.equal(chart.data().length);

				// check for the bars were stacked
				expect(util.getBBox(path).width).to.be.equal(barWidth * 2);

				done();
			}, 500);
		});
	});

	describe("resize()", () => {
		it("should resize correctly", () => {
			const newSize = {width: 1200, height: 1400};

			chart.resize(newSize);

			expect(chart.internal.getCurrentWidth()).to.be.equal(newSize.width);
			expect(chart.internal.getCurrentHeight()).to.be.equal(newSize.height);
		});
	});

	describe("destroy()", () => {
		it("should be destroyed", () => {
			chart.destroy();

			expect(d3Select("#chart svg").empty()).to.be.true;
			expect(Object.keys(chart).length).to.be.equal(0);
			expect(bb.instance.indexOf(chart) === -1).to.be.true;
		});

		it("should be destroyed without throwing error", done => {
			chart = util.generate({
				data: {
					columns: [["data1", 50, 20]]
				}
			});

			setTimeout(() => {
				chart.load({
					columns: [["data1", 100, 150]],
					unload: ["data1"]
				});

				chart.destroy();
				setTimeout(done, 500);
			}, 500);
		});

		it("should not throw error when already destroyed", () => {
			chart.destroy();
			chart.destroy();
		});
	});

	describe("config()", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data", 91.4]
					],
					type: "gauge"
				},
				gauge: {
					max: 1000
				}
			};
		});

		it("check for the getter/setter functionality", () => {
			let expected;
			let max;

			// check for getter
			expected = 1000;
			max = +chart.config("gauge.max");
			expect(max).to.be.equal(expected);

			// check for setter
			expected = 50;
			max = +chart.config("gauge.max", expected);
			expect(max).to.be.equal(expected);

			expected = null;
			max = chart.config("gauge.max", expected);
			expect(max).to.be.equal(expected);

			// check for the setter and redraw
			expected = 100;
			max = +chart.config("gauge.max", expected, true);

			expect(max).to.be.equal(expected);
			expect(+chart.$.arc.select(`.${CLASS.chartArcsGaugeMax}`).text()).to.be.equal(expected);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
							["data1", 30, 20, 50, 40, 60]
					]
				},
				axis: {
					y: {
						tick: {
							count: 3
						}
					}
				}
			};
		});

		it("check for the axis config update", () => {
			const axisYTick = chart.$.main.selectAll(`.${CLASS.axisY} .tick`);
			const expected = [];

			// axis y tick is outer
			axisYTick.each(function() {
				const line = this.querySelector("line");
				const text = this.querySelector("text");
				const tspan = text.querySelector("tspan");

				expected.push({
					line: +line.getAttribute("x2"),
					text: +text.getAttribute("x"),
					tspan: +tspan.getAttribute("x")
				});

				expect(text.style.textAnchor).to.be.equal("end");
			});

			// when
			chart.config("axis.y.inner", true, true);

			// axis y tick is inner
			axisYTick.each(function(d, i) {
				const line = this.querySelector("line");
				const text = this.querySelector("text");
				const tspan = text.querySelector("tspan");

				expect(+line.getAttribute("x2")).to.be.equal(Math.abs(expected[i].line));
				expect(+text.getAttribute("x")).to.be.equal(Math.abs(expected[i].text));
				expect(text.style.textAnchor).to.be.equal("start");
				expect(+tspan.getAttribute("x")).to.be.equal(Math.abs(expected[i].tspan));
			});
		});
	});
});
