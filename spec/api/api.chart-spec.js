/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
 /* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import bb from "../../src/core";

describe("API chart", () => {
	let chart;
	let args = {
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
			const svg = d3.select(chart.internal.main.node().parentNode);
			const width = +svg.attr("width");

			svg.attr("width", 100);
			chart.flush();

			expect(+svg.attr("width")).to.be.equal(width);
		});
	});

	describe("transform()", () => {
		it("should be transformed 'data1' to bar correctly", () => {
			const main = chart.internal.main;
			const bar = main.select(`.${CLASS.bars}-data1`);

			expect(bar.selectAll("path").size()).to.be.equal(0);
			chart.transform("bar", "data1");

			expect(bar.selectAll("path").size()).to.be.equal(chart.data()[0].values.length);
		});

		it("should be transformed all data to bar correctly", () => {
			const main = chart.internal.main;
			const bar = main.select(`.${CLASS.chartBars}`);

			expect(bar.selectAll("path").size()).to.be.equal(0);
			chart.transform("bar");

			expect(bar.selectAll("path").size()).to.be.equal(chart.data()[0].values.length + chart.data()[1].values.length);
		});

		it("should be transformed all data to pie correctly", () => {
			const main = chart.internal.main;
			const pie = main.select(`.${CLASS.chartArcs}`);

			expect(pie.selectAll("path").size()).to.be.equal(0);
			chart.transform("pie");

			expect(pie.selectAll("path").size()).to.be.equal(chart.data().length);
		});

		it("should be transformed line -> pie -> line", done => {
			const main = chart.internal.main;
			const pie = main.select(`.${CLASS.chartArcs}`);

			chart.transform("pie");

			setTimeout(() => {
				chart.transform("line");
			}, 500);

			setTimeout(() => {
				// pie should be redrawn
				expect(pie.selectAll("path").size()).to.be.equal(0);

				done();
			}, 1000);
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
			const main = chart.internal.main;
			const path = main.select(`.${CLASS.bars}-data1 path`);
			const barWidth = path.node().getBBox().width;

			chart.groups([
				["data1", "data2"]
			]);

			setTimeout(() => {
				// check for the groups data set
				expect(chart.groups()[0].length).to.be.equal(chart.data().length);

				// check for the bars were stacked
				expect(path.node().getBBox().width).to.be.equal(barWidth * 2);

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

			expect(d3.select("#chart svg").empty()).to.be.true;
			expect(Object.keys(chart).length).to.be.equal(0);
			expect(bb.instance.indexOf(chart) === -1).to.be.true;
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
	});
});
