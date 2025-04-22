/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import {$AXIS} from "../../src/config/classes";
import util from "../assets/util";

describe("X AXIS", function() {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150]
			],
			type: "line"
		},
		axis: {
			x: {
				inverted: true
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("axis.x.inverted", () => {
		describe("different x axis types", () => {
			it("check 'indexed' type axis", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);
				const xPos = [];
				
				ticks.each(function(v) {
					xPos[v] = util.parseNum(this.getAttribute("transform").split(",")[0]);
				});

				xPos.reduce((prev, curr) => {
					expect(prev > curr).to.be.true;

					return curr;
				});
			});

			it("set options: axis.x.type='timeseries'", () => {
				args.axis.x.type = "timeseries";
				args.axis.x.tick = {
					format: "%Y-%m-%d"
				};

				args.data = {
					x: "x",
					columns: [
						["x", "2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-6"],
						["data1", 30, 200, 100, 400, 150]
					]
				};
			});

			it("check 'timeseries' type axis", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);
				const xPos = [];
				const expected = [
					"2023-01-01 00:00:00",
					"2023-01-02 00:00:00",
					"2023-01-03 00:00:00",
					"2023-01-04 00:00:00",
					"2023-01-06 00:00:00",
				].map(v => new Date(v));
				
				ticks.each(function(v, i) {
					expect(v).to.be.deep.equal(expected[i]);
					xPos[i] = util.parseNum(this.getAttribute("transform").split(",")[0]);
				});

				xPos.reduce((prev, curr) => {
					expect(prev > curr).to.be.true;

					return curr;
				});
			});

			it("set options: axis.x.type='category'", () => {
				args.axis.x.type = "category";
				args.axis.x.tick = {};

				args.data = {
					x: "x",
					columns: [
						["x", "type a", "type b", "type c", "type d", "type e"],
						["data1", 30, 200, 100, 400, 150]
					]
				};
			});

			it("check 'category' type axis", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);

				const xPos = [];
				const expected = [
					"type a", "type b", "type c", "type d", "type e" 
				];
				
				ticks.each(function(v, i) {
					expect(this.querySelector("tspan").textContent).to.be.equal(expected[i]);
				
					xPos[v] = util.parseNum(this.getAttribute("transform").split(",")[0]);
				});

				xPos.reduce((prev, curr) => {
					expect(prev > curr).to.be.true;

					return curr;
				});
			});

			it("set options: axis.rotated", () => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150]
						],
						type: "line"
					},
					axis: {
						rotated: true,
						x: {
							inverted: true,
						}
					}
				};
			});

			it("check 'rotated' type axis", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} .tick`);
				const xPos = [];
				
				ticks.each(function(v) {
					xPos[v] = util.parseNum(this.getAttribute("transform").split(",")[1]);
				});

				xPos.reduce((prev, curr) => {
					expect(prev > curr).to.be.true;

					return curr;
				});
			});
		});

		describe("subchart", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150]
						],
						type: "line"
					},
					axis: {
						x: {
							inverted: true,
						}
					},
					subchart: {
						show: true,
						init: {
							range: [3, 1]
						}
					}
				}
			});

			it("check initial zoom domain.", () => {
				const {scale: {x, subX}, brush} = chart.internal;
				const domain = x.domain().map(Math.round);
				const brushSelection = brush.getSelection().select(".selection").node();

				expect(Math.round(brushSelection.getAttribute("width"))).to.be.closeTo(subX(1) - subX(3), 1);
				expect(domain).to.be.deep.equal(args.subchart.init.range);

			});
		});

		describe("zoom", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150]
						],
						type: "line"
					},
					axis: {
						x: {
							inverted: true,
						}
					},
					zoom: {
						enabled: true
					},
					transition: {
						duration: 0
					}
				}
			});

			it("should zoom & unzoomed.", () => {
				const {line: {lines}} = chart.$;
				const initialPath = lines.attr("d");

				// when
				chart.zoom([3, 2]);
				
				const {zoom} = chart.internal.scale;

				expect(lines.attr("d")).to.be.equal("M1797,390.583L1198,227.858L599,323.579L0,36.417L-599,275.718");

				expect(zoom(2) - zoom(3)).to.be.closeTo(600, 5);

				// when
				chart.unzoom();

				// chart has unzoomed?
				expect(lines.attr("d")).to.be.equal(initialPath);
			});
		});

		describe("x Axis dimension", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "www.somesitename1.com", "www.somesitename2.com", "www.somesitename3.com", "www.somesitename4.com", "www.somesitename5.com", "www.somesitename6.com", "www.somesitename7.com", "www.somesitename8.com", "www.somesitename9.com", "www.somesitename10.com", "www.somesitename11.com", "www.somesitename12.com"],
							["pv", 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400]
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "category",
							tick: {
								rotate: 75,
								multiline: false,
								tooltip: true
							},
							height: 130
						}
					}
				};
			});

			it("should clipPath for x axis size defined as x Axis' dimension.", () => {
				const clipRect = chart.internal.$el.defs.select("[id$=xaxis] rect");
				const axisRect = chart.$.main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();

				expect(axisRect.height).to.be.below(+clipRect.attr("height"));		
				expect(+clipRect.attr("y") > -50).to.be.be.ok;
			});

			it("set options", () => {
				args = {
					data: {
						columns: [
							["pv", 90, 100, 140]
						],
						type: "bar"
					},
					legend: {
						show: false
					},
					axis: {
						x: {
							height: 0
						}
					}
				};
			});

			it("x axis height option should be applied", () => {
				const {$: {main}, internal: {state}} = chart;
				
				expect(
					main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect().y
				).to.be.above(state.height);
			});
		});

		describe("tick.text.inner", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						xFormat: "%Y",
						columns: [
							["x", "2020", "2021", "2022", "2023", "2024"],
							["data1", 30, 200, 100, 400, 150],
							["data2", 130, 340, 200, 500, 250]
						],
						type: "line"
					},
					axis: {
						x: {
							type: "timeseries",
							tick: {
								format: "%Y-%m-%d %H:%M:%S",
								text: {
									inner: true
								}
							}
						}
					}
				};
			});

			it("should first & last tick text to be positioned at inner.", () => {
				chart.internal.$el.axis.x
					.selectAll(".tick:first-of-type > text, .tick:last-of-type > text").each(function(d, i) {
						const anchor = this.style.textAnchor;

						expect(anchor).to.be.equal(i === 0 ? "start" : "end");
					});
			});

			it("set options: axis.x.tick.text.inner={first:true, last:false}", () => {
				args.axis.x.tick.text.inner = {
					first: true,
					last: false
				};	
			});

			it("should first tick text to be positioned at inner.", () => {
				chart.internal.$el.axis.x
					.selectAll(".tick:first-of-type > text, .tick:last-of-type > text").each(function(d, i) {
						const anchor = this.style.textAnchor;

						expect(anchor).to.be.equal(i === 0 ? "start" : "middle");
					});
			});

			it("set options: axis.x.tick.text.inner={first:false, last:true}", () => {
				args.axis.x.tick.text.inner = {
					first: false,
					last: true
				};	
			});

			it("should last tick text to be positioned at inner.", () => {
				chart.internal.$el.axis.x
					.selectAll(".tick:first-of-type > text, .tick:last-of-type > text").each(function(d, i) {
						const anchor = this.style.textAnchor;

						expect(anchor).to.be.equal(i === 0 ? "middle" : "end");
					});
			});
		});
	});

	describe("axis.x.forceAsSingle", () => {
		beforeAll(() => {
			args = {
				data: {
				  columns: [
					  ["data1", 30, 350, 200, 380, 150]
				  ],
				  type: "scatter"
				},
				tooltip: {
				  grouped: true
				},
				axis: {
				  x: {
					forceAsSingle: true
				  }
				}
			};
		});

		function checkSingleX(ctx, x = 2) {
			const {grid, tooltip} = ctx.$;

			// when
			ctx.tooltip.show({x});

			expect(+tooltip.select("th").text()).to.be.equal(x);
			expect(+grid.main.select("line.bb-xgrid-focus").attr("x1") > 0).to.be.ok;
		}

		it("scatter: should interact as single x", () => {
			checkSingleX(chart);
		});

		it("set options: data.type='bubble'", () => {
			args.data.type = "bubble";
		});

		it("bubble: should interact as single x", () => {
			checkSingleX(chart);
		});

		it("set options: tooltop.grouped=false", () => {
			args.tooltip.grouped = false;
		});

		it("shouldn't work as single x, when tooltip.grouped=false is set", () => {
			chart.tooltip.show({x: 2});

			expect(chart.$.tooltip.html()).to.be.empty;
		});

		it("set options: data.type='line'", () => {
			args = {
				data: {
					columns: [
						["x1", 1, 3, 5, 7, 9],
						["x2", 2, 4, 6, 8, 10],
						["data1", 30, 350, 200, 380, 150],
						["data2", 130, 120, 330, 280, 230]
					],
					type: "line",
					xs: {
						data1: "x1",
						data2: "x2"
					}
				},
				tooltip: {
					grouped: true
				},
				axis: {
					x: {
						forceAsSingle: true
					}
				}
			};
		});

		it("line data.xs: should interact as single x", () => {
			checkSingleX(chart, 5);
		});
	});
});
