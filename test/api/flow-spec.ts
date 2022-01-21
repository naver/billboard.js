/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import util from "../assets/util";
import {$AXIS, $LINE} from "../../src/config/classes";
import {window} from "../../src/module/browser";

describe("API flow", () => {
	let chart;
	let args = {
		data: {
			x: "x",
			columns: [
				["x", "2017-01-11", "2017-01-21", "2017-01-25"],
				["data1", 130, 140, 130],
				["data2", 150, 160, 145]
			],
			type: "line"
		},
		axis: {
			x: {
				type: "timeseries",
				tick: {
					format: "%m/%d"
				}
			}
		}
	};

	describe("basic functionality", () => {
		before(()=> {
			chart = util.generate(args);
		});

		it("should flow updating the data", done => {
			chart.flow({
				columns: [
					["x", "2017-02-11", "2017-02-21"],
					["data1", 500, 200],
					["data2", 100, 300],
					["data3", 200, 120]
				],
				done: function () {
					const lineSize = this.internal.$el.main.selectAll(`.${$LINE.chartLines} > g`).size();

					expect(lineSize).to.be.equal(this.data().length);
					done();
				}
			});
		});

		it("should flow correctly with options", done => {
			const spy = sinon.spy(function() {
				chart.internal.$el.main.selectAll(`.${$AXIS.axisX} .tick tspan`).each(function(d, i) {
					expect(this.textContent).to.be.equal(tickText[i]);
					expect(d.splitted).to.be.equal(tickText[i]);
				});

				expect(spy.called).to.be.true;
				done();
			});
			const tickText = ["01/25", "02/11", "02/21", "03/11", "03/21"];

			chart.flow({
				columns: [
					["x", "2017-03-11", "2017-03-21"],
					["data1", 500, 200]
				],
				length: 2,
				duration: 1000,
				done: spy
			});
		});

		it("check when is not visible", () => {
			const spy = sinon.spy();

			window.$$TEST$$.isTabVisible = false;
			
			chart.flow({
				columns: [
					["x", "2017-03-30"],
					["data1", 500]
				],
				done: spy
			});

			const lastTickText = chart.$.main.selectAll(`.${$AXIS.axisX} .tick tspan`)
				.nodes().pop().innerHTML;

			// when tab is not visible, it shouldn't be executed
			expect(spy.called).to.be.false;
			expect(lastTickText).to.be.equal("03/21");

			// restore
			delete window.$$TEST$$.isTabVisible;
		});
	});

	describe("basic functionality", () => {
		before(()=> {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2020-12-29", "2020-12-30", "2020-12-31"],
						["data1", 230, 300, 330],
						["data2", 190, 230, 200],
						["data3", 90, 130, 180]
					],
					type: "line"
				  },
				  axis: {
					x: {
					  type: "timeseries",
					  tick: {
						format: "%m/%d"
					  }
					}
				}
			};

			chart = util.generate(args);
		});

		it("ticks should translate", done => {
			const moved = [];
			let interval;

			chart.flow({
				columns: [
					["x", '2021-01-11', '2021-01-21'],
					["data1", 500, 200],
					["data2", 100, 300],
					["data3", 200, 120]
				],
				duration: 1500,
				done: () => {
					clearInterval(interval);

					moved.reduce((a, c) => {
						expect(a >= c - 5).to.be.true;
						return a + c;
					});

					done();
				}
			});
		
			interval = setInterval(function() {
				const translateX = util.parseNum(
					chart.internal.$el.axis.x.select(".tick")
					.filter(":nth-child(2)")
					.attr("transform")
				);

				if (translateX < 0) {
					moved.push(Math.abs(translateX));
				}				
			}, 50);
		});
	});
});
