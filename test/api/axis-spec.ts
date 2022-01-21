/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS} from "../../src/config/classes";

describe("API axis", function() {
	let chart;
	let main;
	const rx = /translate\((\d+),.*/;

	before(() => {
		return new Promise((resolve) => {
			chart = util.generate({
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
						padding: {
							bottom: 0
						}
					},
					y2: {
						show: true,
						label: "Y2 Axis Label"
					}
				},
				onrendered: function() {
					main = this.internal.$el.main;
					resolve(true);
				}
			});
		});
	});

	describe("axis.labels()", () => {
		it("should update y axis label", done => {
			const axisLabel = {
				y: "New Y Axis Label"
			};

			// when
			const labels = chart.axis.labels(axisLabel);

			setTimeout(() => {
				const label = main.select(`.${$AXIS.axisYLabel}`);

				expect(label.text()).to.be.equal("New Y Axis Label");
				expect(label.attr("dx")).to.be.equal("-0.5em");
				expect(label.attr("dy")).to.be.equal("1.2em");

				expect(labels).to.be.deep.equal({
					y: axisLabel.y,
					y2: "Y2 Axis Label"
				});

				done();
			}, 500);
		});

		it("should update y axis label", done => {
			// when
			chart.axis.labels({
				y2: "New Y2 Axis Label"
			});

			setTimeout(() => {
				const label = main.select(`.${$AXIS.axisY2Label}`);

				expect(label.text()).to.be.equal("New Y2 Axis Label");
				expect(label.attr("dx")).to.be.equal("-0.5em");
				expect(label.attr("dy")).to.be.equal("-0.5em");

				done();
			}, 500);
		});

		it("should return axis labels", () => {
			expect(chart.axis.labels()).to.be.deep.equal({
				y: 'New Y Axis Label',
				y2: 'New Y2 Axis Label'
			});
		});
	});

	describe("axis.min/max()", () => {
		it("should update axis min value", done => {
			const xAxisTick = main.select(`.${$AXIS.axisX} .tick`).node();
			const xTickValue = +xAxisTick.getAttribute("transform").replace(rx, "$1");
			const x = -1;
			const y = 0;
			const y2 = 5;

			chart.axis.min({
				x,
				y,
				y2
			});

			setTimeout(() => {
				let tspan;

				// check for x max value
				expect(xTickValue).to.be.below(+xAxisTick.getAttribute("transform").replace(rx, "$1"));

				// check for y max value
				tspan = main.selectAll(`.${$AXIS.axisY} tspan`).filter(function() {
					return +d3Select(this).text() === y;
				});

				expect(tspan.empty()).to.be.false;

				tspan = main.selectAll(`.${$AXIS.axisY2} tspan`).filter(function() {
					return +d3Select(this).text() === y2;
				});

				expect(tspan.empty()).to.be.false;

				done();
			}, 500);
		});

		it("should update axis max value", done => {
			const xAxisTick = main.selectAll(`.${$AXIS.axisX} .tick`).nodes();
			const lastIndex = xAxisTick.length - 1;

			const lastXTickValue = +xAxisTick[lastIndex].getAttribute("transform").replace(rx, "$1");
			const x = 10;
			const y = 300;
			const y2 = 100;

			chart.axis.max({
				x,
				y,
				y2
			});

			setTimeout(() => {
				let tspan;

				// check for x max value
				expect(lastXTickValue).to.be.above(+xAxisTick[lastIndex].getAttribute("transform").replace(rx, "$1"));

				// check for y max value
				tspan = main.selectAll(`.${$AXIS.axisY} tspan`).nodes();
				expect(+tspan[tspan.length - 1].innerHTML).to.be.equal(y);

				// check for y2 max value
				tspan = main.selectAll(`.${$AXIS.axisY2} tspan`).nodes();
				expect(+tspan[tspan.length - 1].innerHTML).to.be.equal(y2);

				done();
			}, 500);
		});
	});

	describe("axis.range()", () => {
		it("should update axis min/max value", done => {
			const xAxisTick = main.selectAll(`.${$AXIS.axisX} .tick`).nodes();
			const xTickValueMin = +xAxisTick[0].getAttribute("transform").replace(rx, "$1");
			const xTickValueMax = +xAxisTick[xAxisTick.length - 1].getAttribute("transform").replace(rx, "$1");

			const min = {
				x: -10,
				y: -1000,
				y2: -10000
			};
			const max = {
				x: 100,
				y: 1000,
				y2: 10000
			};

			chart.axis.range({
				min: {
					x: min.x,
					y: min.y,
					y2: min.y2
				},
				max: {
					x: max.x,
					y: max.y,
					y2: max.y2
				},
			});

			setTimeout(() => {
				let tspan;

				// check for x value
				expect(xTickValueMin).to.be.above(+xAxisTick[0].getAttribute("transform").replace(rx, "$1"));
				expect(xTickValueMax).to.be.above(+xAxisTick[xAxisTick.length - 1].getAttribute("transform").replace(rx, "$1"));

				// check for y value
				tspan = main.selectAll(`.${$AXIS.axisY} tspan`).filter(function() {
					const val = +d3Select(this).text();

					return val === min.y || val === max.y;
				});

				expect(tspan.size()).to.be.equal(2);

				// check for y2 value
				tspan = main.selectAll(`.${$AXIS.axisY2} tspan`).filter(function() {
					const val = +d3Select(this).text();

					return val === min.y2 || val === max.y2;
				});

				expect(tspan.size()).to.be.equal(2);

				done();
			}, 500);
		});
	});
});
