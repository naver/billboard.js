/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS, $BAR, $GAUGE} from "../../src/config/classes";
import bb from "../../src";

describe("API chart", () => {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400],
				["data2", 500, 800, 500, 2000]
			]
		},
		transition: {
			duration: 0
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

		it("should update groups correctly", function() {
			const main = chart.$.main;
			const path = main.select(`.${$BAR.bars}-data1 path`);
			const barWidth = util.getBBox(path).width;

			// when
			chart.groups([
				["data1", "data2"]
			]);

			// check for the groups data set
			expect(chart.groups()[0].length).to.be.equal(chart.data().length);

			// check for the bars were stacked
			expect(util.getBBox(path).width).to.be.closeTo(barWidth * 2, 1);
		});
	});

	describe("resize()", () => {
		it("should resize correctly", () => {
			const newSize = {width: 1200, height: 1400};

			chart.resize(newSize);

			expect(chart.internal.getCurrentWidth()).to.be.equal(newSize.width);
			expect(chart.internal.getCurrentHeight()).to.be.equal(newSize.height);
		});

		it("set options resize.auto=false", () => {
			args.resize = {
				auto: false
			}
		});

		it("event <rect> element should resize", () => {
			const {eventRect} = chart.internal.$el;
			const height = +eventRect.attr("height");

			// when
			chart.resize({height:600});

			expect(+eventRect.attr("height")).to.be.above(height);
		});

		it("updating event rect during resize state", () => {
			// force resizing state
			chart.internal.state.resizing = true;

			expect(
				chart.internal.updateEventRect()
			).to.not.throw;
		});
	});

	describe("destroy()", () => {
		it("should be destroyed", () => {
			chart.destroy();

			expect(d3Select("#chart svg").empty()).to.be.true;
			
			// all methods should be ressetted
			Object.keys(chart).forEach(key => {
				expect(chart[key]()).to.be.undefined;
				expect(/^\(\)\s?=\>\s?\{/.test(chart[key].toString())).to.be.true;
			});

			// @ts-ignore
			expect(bb.instance.indexOf(chart) === -1).to.be.true;

			const el = <HTMLDivElement>document.getElementById("chart");

			// should revert removing className and styles
			expect(el.classList.contains("bb")).to.be.false;
			expect(el.style.position).to.be.equal("");
		});

		it("should be destroyed without throwing error", () => new Promise(done => {
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
			}, 300);
		}));

		it("should not throw error when already destroyed", () => {
			chart.destroy();
			chart.destroy();
		});

		it("events should be unbound on destroy", () => {
			const {internal} = chart;
			const {$el: {eventRect}} = internal;

			// all bound events are removed
			chart.internal.unbindAllEvents();

			["mouseover", "mousemove", "mouseout"].forEach(event => {
				expect(eventRect.on(event)).to.be.undefined;
			});

			chart.destroy();
		});
	});

	describe("config()", () => {
		beforeAll(() => {
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
			expect(+chart.$.arc.select(`.${$GAUGE.chartArcsGaugeMax}`).text()).to.be.equal(expected);
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
			const axisYTick = chart.$.main.selectAll(`.${$AXIS.axisY} .tick`);
			const expected: {[key: string]: number}[] = [];

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

		it("should return generation options object.", () => {
			expect(args).to.be.deep.equal(chart.config());
		});
	});
});
