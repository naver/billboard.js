/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API axis", function() {
	let chart;
	let args;

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("axis.labels", () => {
		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 50, 20, 10]
					],
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					y: {
						label: "Y Axis Label"
					},
					y2: {
						show: true,
						label: "Y2 Axis Label"
					}
				}
			};

			expect(true).to.be.ok;
		});

		it("should update y axis label", () => {
			chart.axis.labels({y: "New Y Axis Label"});

			const label = d3.select(".bb-axis-y-label");

			expect(label.text()).to.be.equal("New Y Axis Label");
			expect(label.attr("dx")).to.be.equal("-0.5em");
			expect(label.attr("dy")).to.be.equal("1.2em");
		});

		it("should update y axis label", () => {
			chart.axis.labels({y2: "New Y2 Axis Label"});

			const label = d3.select(".bb-axis-y2-label");

			expect(label.text()).to.be.equal("New Y2 Axis Label");
			expect(label.attr("dx")).to.be.equal("-0.5em");
			expect(label.attr("dy")).to.be.equal("-0.5em");
		});
	});
});
