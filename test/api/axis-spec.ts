/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeAll, afterAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS} from "../../src/config/classes";

describe("API axis", function() {
	let chart;
	let main;
	const rx = /translate\(([^,]*),.*/;

	beforeAll(() => {
		return new Promise(resolve => {
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
				transition: {
					duration: 0
				},
				onrendered: function() {
					main = this.internal.$el.main;
					resolve(1);
				}
			});
		});
	}, 1500);

	describe("axis.labels()", () => {
		it("should update y axis label", () => new Promise(done => {
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

				done(1);
			}, 300);
		}));

		it("should update y axis label", () => new Promise(done => {
			// when
			chart.axis.labels({
				y2: "New Y2 Axis Label"
			});

			setTimeout(() => {
				const label = main.select(`.${$AXIS.axisY2Label}`);

				expect(label.text()).to.be.equal("New Y2 Axis Label");
				expect(label.attr("dx")).to.be.equal("-0.5em");
				expect(label.attr("dy")).to.be.equal("-0.5em");

				done(1);
			}, 300);
		}));

		it("should return axis labels", () => {
			expect(chart.axis.labels()).to.be.deep.equal({
				y: 'New Y Axis Label',
				y2: 'New Y2 Axis Label'
			});
		});
	});

	describe("axis.min/max()", () => {
		it("should update axis min value", () => new Promise(done => {
			const xAxisTick = main.select(`.${$AXIS.axisX} .tick`).node();
			const xTickValue = +xAxisTick.getAttribute("transform").replace(rx, "$1");
			const x = -1;
			const y = 0;
			const y2 = 5;

			// when
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

				done(1);
			}, 300);
		}));

		it("should update axis max value", () => new Promise(done => {
			const xAxisTick = main.selectAll(`.${$AXIS.axisX} .tick`).nodes();
			const lastIndex = xAxisTick.length - 1;

			const lastXTickValue = +xAxisTick[lastIndex].getAttribute("transform").replace(rx, "$1");
			const x = 10;
			const y = 300;
			const y2 = 100;

			// when
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

				done(1);
			}, 300);
		}));

		it("axis.min(): check unset & shorthand", () => {
			const current = chart.axis.min();

			afterAll(() => {
				chart.axis?.min?.(current);
			})

			// when
			chart.axis.min({
				y: false
			});

			const min = chart.axis.min();

			Object.keys(min).forEach(key => {
				if (key === "y") {
					expect(min[key]).to.be.undefined;
				} else {
					expect(typeof min[key] === "number").to.be.true;
				}
			});

			// when - shorthand
			chart.axis.min(-100);

			expect(chart.axis.min()).to.be.deep.equal({
				x: -1, y: -100, y2: -100
			});

			// when - shorthand
			chart.axis.min(false);

			expect(chart.axis.min()).to.be.deep.equal({
				x: -1, y: undefined, y2: undefined
			});
		});

		it("axis.max(): check unset & shorthand", () => {
			const current = chart.axis.max();

			afterAll(() => {
				chart.axis?.max?.(current);
			})

			// when
			chart.axis.max({
				y2: false
			});

			const max = chart.axis.max();

			Object.keys(max).forEach(key => {
				if (key === "y2") {
					expect(max[key]).to.be.undefined;
				} else {
					expect(typeof max[key] === "number").to.be.true;
				}
			});

			// when - shorthand
			chart.axis.max(1000);

			expect(chart.axis.max()).to.be.deep.equal({
				x: 10, y: 1000, y2: 1000
			});

			// when - shorthand
			chart.axis.max(false);

			expect(chart.axis.max()).to.be.deep.equal({
				x: 10, y: undefined, y2: undefined
			});
		});
	});

	describe("axis.range()", () => {
		it("should update axis min/max value", () => new Promise(done => {
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

				done(1);
			}, 300);
		}));

		it("axis.range(): check unset & shorthand", () => {
			const current = chart.axis.range();

			afterAll(() => {
				chart.axis?.range?.(current);
			});

			// when
			chart.axis.range({
				min: {
					y: false
				},
				max: {
					y2: false
				}
			});

			const range = chart.axis.range();

			expect(range.min.y).to.be.undefined;
			expect(range.max.y2).to.be.undefined;

			// when - shorthand
			chart.axis.range({
				min: -100,
				max: 15000
			});

			expect(chart.axis.range()).to.deep.equal({
				min: {x: -10, y: -100, y2: -100},
				max: {x: 100, y: 15000, y2: 15000}
			});

			// when - shorthand
			chart.axis.range({
				min: false,
				max: false
			});

			expect(chart.axis.range()).to.deep.equal({
				min: {x: -10, y: undefined, y2: undefined},
				max: {x: 100, y: undefined, y2: undefined}
			});
		});
	});
});
