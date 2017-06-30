/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API axis", function() {
	const chart = util.generate({
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
	});

	describe("axis.labels", () => {
		it("should update y axis label", done => {
			chart.axis.labels({y: "New Y Axis Label"});

			setTimeout(() => {
				const label = chart.internal.main.select(".bb-axis-y-label");

				expect(label.text()).to.be.equal("New Y Axis Label");
				expect(label.attr("dx")).to.be.equal("-0.5em");
				expect(label.attr("dy")).to.be.equal("1.2em");

				done();
			}, 500);
		});

		it("should update y axis label", done => {
			chart.axis.labels({y2: "New Y2 Axis Label"});

			setTimeout(() => {
				const label = chart.internal.main.select(".bb-axis-y2-label");

				expect(label.text()).to.be.equal("New Y2 Axis Label");
				expect(label.attr("dx")).to.be.equal("-0.5em");
				expect(label.attr("dy")).to.be.equal("-0.5em");

				done();
			}, 500);
		});
	});
});
