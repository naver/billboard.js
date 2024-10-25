/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, afterEach, describe, expect, it} from "vitest";
import sinon from "sinon";
import util from "../assets/util";
import {$AXIS, $GRID, $LINE, $TEXT} from "../../src/config/classes";
import {window} from "../../src/module/browser";

describe("API flow", () => {
	let chart;
	let args: any = {
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

	describe("basic functionality #1", () => {
		beforeAll(()=> {
			chart = util.generate(args);
		});

		it("should flow updating the data", () => new Promise(done => {
			chart.flow({
				columns: [
					["x", "2017-02-11", "2017-02-21"],
					["data1", 500, 200],
					["data2", 100, 300],
					["data3", 200, 120]
				],
				done() {
					const lineSize = this.internal.$el.main.selectAll(`.${$LINE.chartLines} > g`).size();

					expect(lineSize).to.be.equal(this.data().length);
					done(1);
				}
			});
		}));

		it("should flow correctly with options", () => new Promise(done => {
			const spy = sinon.spy(function() {
				chart.internal.$el.main.selectAll(`.${$AXIS.axisX} .tick tspan`).each(function(d, i) {
					expect(this.textContent).to.be.equal(tickText[i]);
					expect(d.splitted).to.be.equal(tickText[i]);
				});

				expect(spy.called).to.be.true;
				done(1);
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
		}));

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

	describe("basic functionality #2", () => {
		beforeAll(()=> {
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

		it("ticks should translate", () => new Promise(done => {
			const moved: number[] = [];
			let interval;

			chart.flow({
				columns: [
					["x", '2021-01-11', '2021-01-21'],
					["data1", 500, 200],
					["data2", 100, 300],
					["data3", 200, 120]
				],
				duration: 1500,
				done() {
					clearInterval(interval);

					moved.reduce((a, c) => {
						expect(a >= c - 5).to.be.true;
						return a + c;
					});

					done(1);
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
			}, 100);
		}));
	});

	describe("Indexed and category type axis", () => {
		it("Indexed axis: should flow without error", () => new Promise(done => {
			const chart = util.generate({
				data: {
					columns: [
					  ["data", 20, 30, 40]
				  ]
				}
			});

			chart.flow({
				columns: [
					["data", 50, 60]
				],
				done() {
					expect(true).to.be.true;
					this.destroy();

					done(1);
				}
			});
		}));

		it("Category axis: should flow without error", () => new Promise(done => {
			const chart = util.generate({
				data: {
					x: "x",
					columns: [
						["x", "a", "b", "c"],
						["data", 20, 30, 40]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			});

			chart.flow({
				columns: [
					["x", "d", "e"],
					["data", 50, 60]
				],
				done() {
					expect(true).to.be.true;
					this.destroy();

					done(1);
				}
			});
		}));
	});

	describe("check options", () => {
		beforeEach(() => {
			chart = util.generate(args);
		});

		afterEach(() => {
			chart?.destroy();
		});

		beforeAll(() => {
			args = {
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
							format: "%y/%m/%d"
						}
					}
				}
			};
		});

		it("should flow not surpassing indicated 'to' option value.", () => new Promise(done => {
			chart.flow({
				columns: [
					["x", '2017-02-01', '2017-02-10'],
					["data1", 500, 200]
		
				],
				to: "2017-01-11",
				duration: 500,
				done() {
					const tick = this.internal.$el.axis.x.select(".tick");

					expect(tick.text()).to.be.equal("17/01/11");
					expect(+tick.attr("transform").match(/\(([^,]+)/)[1]).to.be.closeTo(6, 1);

					done(1);
				}
			})
		}));

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [],
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};
		});

		it("when flows from timeseries x axis empty data", () => new Promise(done => {
			chart.flow({
				columns: [
					["x", '2017-02-01', '2017-02-10'],
					["data1", 100, 200]
		
				],
				duration: 500,
				done() {
					const tick = this.internal.$el.axis.x.select(".tick");

					expect(tick.text()).to.be.equal("2017-02-01");
					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					columns: [],
					type: "line"
				}
			};
		});

		it("indexed axis: when flows from indexed x axis empty data", () => new Promise(done => {
			chart.flow({
				columns: [
					["data1", 100]
		
				],
				duration: 500,
				done() {
					const tick = this.internal.$el.axis.x.select(".tick");

					expect(tick.text()).to.be.equal("0");

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [			
					],
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};
		});

		it("timeseires axis: when flows from indexed x axis empty data", () => new Promise(done => {
			chart.flow({
				columns: [
					["x", "2023-08-25"],
					["data1", 100]
		
				],
				duration: 500,
				done() {
					const tick = this.internal.$el.axis.x.select(".tick");

					expect(tick.text()).to.be.equal("2023-08-25");

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 10, 12, 11]
					],
					type: "line",
					labels: true
				},
				point: {
					type: "rectangle"
				},
				grid: {
					x: {
						show: true,
						lines: [
							{value: 2, text: "Label on 2"},
						]
					}
				},
				regions: [
					{
						axis: "x",
						start: 0,
						end: 1,
						class: "region-1-4"
					}
				]
			};
		});

		it("grid & regions should flow", () => new Promise(done => {
			chart.flow({
				columns: [
					["data1", 200]
			
				],
				duration: 300,
				done() {
					const {$el} = this.internal;
				
					// grids
					const xgrids = $el.grid.main.selectAll(`.${$GRID.xgrids} line`);

					expect(xgrids.size()).to.be.equal(2);

					// region
					const regionRect = $el.region.list.select("rect").node().getBoundingClientRect();

					expect(regionRect.x).to.be.below(-240);
					
					// data label text
					const text = $el.main.selectAll(`.${$TEXT.chartText} text`);

					text.each(function(d, i) {
						expect(+this.textContent).to.be.equal(d.value);						
					});

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 20, 30, 40]
					]
				}
			}
		});

		it("should flow correctly with newly added data", () => new Promise(done => {
			chart.flow({
				columns: [
					["data1", 50, 60],
					["data2", 20, 30]
				],
				done() {
					this.$.main.selectAll(`.${$LINE.chartLine} path`).each(function(d, i) {
						const rect = this.getBoundingClientRect();
						const pos = [rect.width, rect.x];
						const expected = {
							data1: [588, 46.5],
							data2: [294, 340.5]
						};

						expected[d.id].forEach((v, i) => {
							expect(v).to.be.closeTo(pos[i], 1);
						});
					});

					done(1);
				}
			});
		}));
	});
});
