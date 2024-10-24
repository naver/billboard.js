/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import {timeMinute as d3TimeMinute} from "d3-time";
import util from "../assets/util";
import {getBoundingRect} from "../../src/module/util";
import bb from "../../src";
import {$AXIS} from "../../src/config/classes";
import AxisRendererHelper from "../../src/ChartInternal/Axis/AxisRendererHelper";
//import getSizeFor1Char from "exports-loader?getSizeFor1Char!../../src/axis/bb.axis";

describe("AXIS", function() {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		},
		axis: {
			x: {
				tick: {
					count: undefined
				}
			},
			y: {
				tick: {
					values: null,
					count: undefined
				}
			},
			y2: {
				tick: {
					values: null,
					count: undefined
				}
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("axis.x.tick.count", () => {
		afterAll(() => {
			args.axis.x.type = "indexed";
			args.axis.x.tick.count = undefined;
		});

		it("set options axis.x.tick.count=3", () => {
			args.axis.x.type = "category";
			args.axis.x.tick.count = 3;
		});

		it("should have only 3 tick on x axis", () => {
			const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick");

			expect(ticks.size()).to.be.equal(3);
			expect(ticks.data()).to.be.deep.equal([0,3,5]);
		});

		it("x Axis ticks should be positioned correctly", () => {
			const expectedXPos = [50, 350, 550];

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick`).each(function(d, i) {
				expect(
					util.ceil(util.parseNum(this.getAttribute("transform").split(",")[0]))
				).to.be.equal(expectedXPos[i]);
			});
		});

		it("set option axis.x.tick.count=10", () => {
			args.axis.x.tick.count = 10;
		});

		it("x Axis tick size shouldn't surpass real data size", () => {
			const tickSize = chart.internal.$el.axis.x.selectAll(".tick").size();

			expect(tickSize).to.be.equal(chart.data()[0].values.length);
			expect(tickSize).to.be.below(args.axis.x.tick.count);
		});
	});

	describe("axis.y.tick.count", () => {
		it("set options axis.y.tick.count=1", () => {
			args.axis.y.tick.count = 1;
		});

		it("should have only 1 tick on y axis", () => {
			const ticksSize = chart.$.main.select(`.${$AXIS.axisY}`).selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(1);
		});

		it("set options axis.y.tick.count=2", () => {
			args.axis.y.tick.count = 2;
		});

		it("should have 2 ticks on y axis", () => {
			const ticksSize = chart.$.main.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("set options axis.y.tick.count=3", () => {
			args.axis.y.tick.count = 3;
		});

		it("should have 3 ticks on y axis", () => {
			const ticksSize = chart.$.main.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(3);
		});
	});

	describe("axis.y.tick.values", () => {
		const values = [100, 500];

		beforeAll(() => {
			args.axis.y.tick.values = values;
		});

		it("should compute char dimension", () => {
			const size = AxisRendererHelper.getSizeFor1Char(d3Select(".tick"));

			expect(size.w && size.h).to.be.ok;
			expect(AxisRendererHelper.getSizeFor1Char()).to.be.equal(size);
		});

		it("should have only 2 tick on y axis", () => {
			const ticksSize = chart.$.main.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("should have specified tick texts", () => {
			chart.$.main.select(`.${$AXIS.axisY}`).selectAll("g.tick").each(function(d, i) {
				const text = d3Select(this)
					.select("text").text();

				expect(+text).to.be.equal(values[i]);
			});
		});
	});

	describe("tick values less than 0", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data", 0.01, 0.02, 0, 0.01]
					]
				},
				axis: {
					y: {
						padding: {
							bottom: 0
						}
					}
				}
			};
		});

		it("tick values should be shown correctly", () => {
			chart.$.main
				.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick").each((v, i) => {
				i > 0 && expect(v > 0).to.be.true;
			});
		});
	});

	describe("tick values less than 0", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
					  	["x", 495, 740, 1500, 3000, 4500, 6000, 7500, 9000, 10500, 12000, 13500, 15000],
						["data", 47.911, 47.915, 48.437, 49.117, 49.583, 50.28, 51.712, 53.103, 54.456, 55.955, 56.752, 56.851]
					]
				},
				axis: {
					x: {
						tick: {
							culling: false
						}
					}
				}
			};
		});

		it("Indexed x axis should scale correct order", () => {
			chart.$.main.selectAll(".bb-axis-x .tick tspan").each(function(d, i) {
				expect(+this.textContent).to.be.equal(args.data.columns[0][i + 1]);
			});
		});
	});

	describe("y/y2 Axes tick.stepSize", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 40, 30, 30, 40, 250],
						["data2", 130, 100, 140, 200, 150],
					],
					axes: {
						data2: "y2"
					}
				},
				axis: {
					y: {
						tick: {
							stepSize: 33
						}
					},
					y2: {
						show: true,
						tick: {
							stepSize: 20
						}
					}
				}
			}
		});

		it("check if y/y2 ticks intervals are generated correctly", () => {
			let startTick;

			const check = (id, stepSize) => {
				chart.$.main.selectAll(`.bb-axis-${id} .tick tspan`).each(function(d, i) {
					if (i === 0) {
						startTick = +this.textContent;
					}

					expect(+this.textContent).to.be.equal(i ? startTick + (stepSize * i) : startTick);
				});
			}

			check("y", args.axis.y.tick.stepSize);
			check("y2", args.axis.y2.tick.stepSize);
		});

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2021-08-01", "2021-08-02", "2021-08-03", "2021-08-04", "2021-08-05", "2021-08-06", "2021-08-07", "2021-08-08", "2021-08-09", "2021-08-10"],
						["Data", 8.0, 0.0, 15.0, 0.0, 0.0, 0.0, 0.0, 0.0, 16.0, 0.0]
					],
					type: "line",
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%d/%m"
						}
					},
					y: {
						tick: { 
							stepSize: 1
						}
					}
				}
			};
		});

		it("y Axis tick value should be rounded", () => {
			chart.internal.$el.axis.y.selectAll(".tick").each(function() {
				expect(this.textContent % 1).to.be.equal(0);
			});
		});
	});

	describe("axis label", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 170, 150, 250]
					]
				},
				axis:{
					x: {
						label: {
							text: 'This is a very long label centered'
						}
					},
					y: {
						label: {
							text: 'This is a very long label centered'
						}
					},
					y2: {
						show: true,
						label: {
							text: 'This is a very long label centered'
						}
					}
				}
			};
		});

 		const checkAnchor = value => {
			["x", "y", "y2"].forEach(v => {
				const anchor = chart.$.main.select(`.${$AXIS[`axis${v.toUpperCase()}Label`]}`);

 				expect(anchor.style("text-anchor")).to.be.equal(value);
			});
		};

 		it("check axis label position ==> x: inner-right, y/y2: inner-top", () => {
			// x: inner-right, y/y2: inner-top
			checkAnchor("end");
		});

 		it("set options label.position=center/middle", () => {
			args.axis.x.label.position = "inner-center";
			args.axis.y.label.position = "inner-middle";
			args.axis.y2.label.position = "inner-middle";
		});

 		it("check axis label position ==> x: inner-center, y/y2: inner-middle", () => {
			// x: inner-right, y/y2: inner-top
			checkAnchor("middle");
		});

 		it("set options label.position=left/bottom", () => {
			args.axis.x.label.position = "inner-left";
			args.axis.y.label.position = "inner-bottom";
			args.axis.y2.label.position = "inner-bottom";
		});

 		it("check axis label position ==> x: inner-left, y/y2: inner-bottom", () => {
			// x: inner-right, y/y2: inner-top
			checkAnchor("start");
		});
	});

	describe("axis outer label position", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "www.site1.com", "www.site2.com", "www.site3.com", "www.site4.com"],
						["download", 3000, 2000, 1000, 4000],
					],
					type: "bar"
				},
				axis: {
					x: {
						type: "category",
						tick: {
							rotate: 70
						},
						label: {
							text: "number",
							position: "outer-center"
						}
					},
					y: {
						min: 1000,
						tick: {
							rotate: 60
						},
						label: {
							text: "y text",
							position: "outer-center"
						}
					},
					y2: {
						show: true,
						tick: {
							rotate: 70
						},
						label: {
							text: "number",
							position: "outer-center"
						}
					}
				}
			}
		});

		const getRect = id => {
			const axis = chart.$.main.select(`.${$AXIS[`axis${id.toUpperCase()}`]}`);
			const tick = axis.select(".tick").node().getBoundingClientRect();
			const label = axis.select("text").node().getBoundingClientRect();
			
			return {tick, label};
		}

		it("when legend is visible: x Axis label text is positioned above of tick text?", () => {
			const {label, tick} = getRect("x");

			// label text is positioned above of tick text?
			expect(label.y).to.be.above(tick.y + tick.height);
		});

		it("set option legend.show", () => {
			args.legend = {show: false};
		});

		it("when legend is invisible: x Axis label text is positioned above of tick text?", () => {
			const {label, tick} = getRect("x");

			// label text is positioned above of tick text?
			expect(label.y).to.be.above(tick.y + tick.height);
		});

		it("y Axis label text is positioned before the tick text?", () => {
			const {label, tick} = getRect("y");

			// label text is positioned below of tick text?
			expect(label.x).to.be.below(tick.x);
		});

		it("y2 Axis label text is positioned after the tick text?", () => {
			const {label, tick} = getRect("y2");

			// label text is positioned above of tick text?
			expect(label.x).to.be.above(tick.x);
		});

		it("set option legend.show", () => {
			args.axis.rotated = true;
		});

		it("y Axis label text is positioned above of tick text?", () => {
			const {label, tick} = getRect("y");

			// label text is positioned above of tick text?
			expect(label.y).to.be.above(tick.y + tick.height);
		});

		it("y2 Axis label text is positioned below of tick text?", () => {
			const {label, tick} = getRect("y2");

			// label text is positioned below of tick text?
			expect(label.y).to.be.below(tick.y + tick.height);
		});
	});

	describe("axis y timeseries", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["times", 60000, 120000, 180000, 240000]
					]
				},
				axis: {
					y: {
						type : "timeseries",
						tick: {
							time: {
							}
						}
					}
				}
			};
		});

		it("should have 7 ticks on y axis", () => {
			const ticksSize = chart.$.main.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick").size();

			// the count starts at initial value and increments by the set interval
			expect(ticksSize).to.be.equal(7);
		});

		it("should have specified 30 second intervals", () => {
			let prevValue;

			chart.$.main.select(`.${$AXIS.axisY}`)
				.selectAll("g.tick")
				.each((d, i) => {
					if (i !== 0) {
						const result = d - prevValue;

						// expressed in milliseconds
						expect(result).to.equal(30000);
					}
					prevValue = d;
				});
		});

		it("set options axis.y.tick.time", () => {
			args.axis.y.tick.time = {
				value : d3TimeMinute.every(60)
			};
		});

		it("should have specified 60 second intervals", () => {
			let prevValue;

			chart.$.main.select(`.${$AXIS.axisY}`).selectAll("g.tick").each((d, i) => {
				if (i !== 0) {
					let result = d - prevValue;

					expect(result).to.equal(60000); // expressed in milliseconds
				}

				prevValue = d;
			});
		});
	});

	describe("axis.x.tick.values", () => {
		describe("function is provided", () => {
			let generatedTicks;
			let tickGenerator = () => {
				const values = [];

				for (let i = 0; i <= 300; i += 50) {
					values.push(i);
				}

				return values;
			};

			beforeEach(function() {
				args.axis.x = {
					tick: {
						values: tickGenerator
					}
				};

				chart = bb.generate(args);
				generatedTicks = tickGenerator();
			});

			it("should use 'function' to generate ticks", () => {
				chart.$.main.select(`.${$AXIS.axisX}`)
					.selectAll("g.tick")
					.each(function(d, i) {
						const tick = d3Select(this).select("text").text();

						expect(+tick).to.be.equal(generatedTicks[i]);
					});
			});
		});
	});

	describe("axis.x.tick.width", () => {
		describe("indexed x axis and y/y2 axis", () => {
			describe("not rotated", () => {
				beforeAll(() => {
					args = {
						data: {
							columns: [
								["data1", 30, 200, 100, 400, 150, 250],
								["data2", 50, 20, 10, 40, 15, 25]
							],
							axes: {
								data2: "y2"
							}
						},
						axis: {
							y2: {
								show: true
							}
						}
					};
				});

				it("should construct indexed x axis properly", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick");
					const expectedX = "0";
					const expectedDy = ".71em";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function(d, i) {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(i + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("set options axis.x.tick.format", () => {
					args.axis.x = {
						tick: {
							format: () => "very long tick text on x axis"
						}
					};
				});

				it("should split x axis tick text to multiple lines", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick");
					const expectedTexts = ["very long tick", "text on x axis"];
					const expectedX = "0";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function() {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(2);

						tspans.each(function(d, i) {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(expectedTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							if (i === 0) {
								expect(parseFloat(tspan.attr("dy"))).to.be.equal(0.71);
							} else {
								expect(parseFloat(tspan.attr("dy"))).to.be.above(8);
							}
						});
					});
				});

				it("should construct y axis properly", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisY}`).selectAll("g.tick");
					const expectedX = "-9";
					const expectedDy = "3";

					expect(ticks.size()).to.be.equal(9);

					ticks.each(function(d) {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(d + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("should construct y2 axis properly", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisY2}`).selectAll("g.tick");
					const expectedX = "9";
					const expectedDy = "3";

					expect(ticks.size()).to.be.equal(9);

					ticks.each(function(d) {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(d + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("set options data.columns, big values in y", () => {
					args.data.columns = [
						["data1", 3000000000000000, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					];
				});

				it("should not split y axis tick text to multiple lines", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisY2}`)
						.selectAll("g.tick");

					ticks.each(function() {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});
				});

			});

			describe("rotated", () => {
				beforeAll(() => {
					args.axis.rotated = true;
				});

				it("should split x axis tick text to multiple lines", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick");
					const expectedTexts = ["very long tick", "text on x axis"];
					const expectedX = "-9";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function() {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(2);

						tspans.each(function(d, i) {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(expectedTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							if (i === 0) {
								expect(parseFloat(tspan.attr("dy"))).to.be.below(0);
							} else {
								expect(parseFloat(tspan.attr("dy"))).to.be.above(9);
							}
						});
					});
				});

				it("should not split y axis tick text to multiple lines", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisY}`).selectAll("g.tick");
					const expectedTexts = [
						"0",
						"500000000000000",
						"1000000000000000",
						"1500000000000000",
						"2000000000000000",
						"2500000000000000",
						"3000000000000000"
					];
					const expectedX = "0";
					const expectedDy = ".71em";

					expect(ticks.size()).to.be.equal(7);

					ticks.each(function(d, i) {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(expectedTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

			});
		});

		describe("category axis", () => {
			describe("not rotated", () => {
				beforeAll(() => {
					args = {
						data: {
							x: "x",
							columns: [
								["x", "this is a very long tick text on category axis", "cat1", "cat2", "cat3", "cat4", "cat5"],
								["data1", 30, 200, 100, 400, 150, 250],
								["data2", 50, 20, 10, 40, 15, 25]
							]
						},
						axis: {
							x: {
								type: "category",
								tick: {
									tooltip: true
								}
							}
						}
					};
				});

				it("should locate ticks properly", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`)
						.selectAll("g.tick");

					ticks.each(function(d, i) {
						const tspans = d3Select(this).selectAll("tspan");
						const expectedX = "0";
						const expectedDy = ".71em";

						if (i > 0) { // i === 0 should be checked in next test
							expect(tspans.size()).to.be.equal(1);

							tspans.each(function() {
								const tspan = d3Select(this);

								expect(tspan.attr("x")).to.be.equal(expectedX);
								expect(tspan.attr("dy")).to.be.equal(expectedDy);
							});
						}
					});
				});

				it("should split tick text properly", () => {
					const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
					const tspans = tick.selectAll("tspan");
					const expectedTickTexts = [
							"this is a very",
							"long tick text",
							"on category",
							"axis"
						];
					const expectedX = "0";

					expect(tspans.size()).to.be.equal(expectedTickTexts.length);

					tspans.each(function(d, i) {
						const tspan = d3Select(this);

						expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
						expect(tspan.attr("x")).to.be.equal(expectedX);

						// unable to define pricise number because it differs depends on environment..
						if (i === 0) {
							expect(parseFloat(tspan.attr("dy"))).to.be.equal(0.71);
						} else {
							expect(parseFloat(tspan.attr("dy"))).to.be.above(8);
						}
					});
				});

				it("should set tooltip", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`)
						.selectAll("g.tick");
					const categories = chart.categories();

					ticks.each(function(d, i) {
						expect(d3Select(this).select("title").text()).to.be.equal(categories[i]);
					});

					// check when toggling displaying data series
					expect(() => chart.hide("data1")).to.not.throw();
				});

				it("shouldn't be addede duplicated tooltip <title> elements", () => new Promise(done => {
					chart.load({
						columns: [
							["data1", 130, 120, 150, 140]							
						],
						done: function() {
							chart.$.main.selectAll(`.${$AXIS.axisX} .tick text`).each(function() { 
								expect(d3Select(this).selectAll("title").size()).to.be.equal(1);
							});

							done(1);
						}
					});
				}));
			});

			describe("rotated", () => {
				beforeAll(() => {
					args.axis.rotated = true;
				});

				it("should locate ticks on rotated axis properly", () => {
					const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick");

					ticks.each(function(d, i) {
						const texts = d3Select(this).selectAll("text");
						const tspans = texts.selectAll("tspan");

						const expectedX = "-9";
						const expectedY = "36";

						texts.each(function() {
							const text = d3Select(this);

							expect(text.attr("x")).to.be.equal(expectedX);
							expect(util.ceil(text.attr("y"))).to.be.equal(+expectedY);
						});

						if (i > 0) { // i === 0 should be checked in next test
							const expectedDy = "3";

							expect(tspans.size()).to.be.equal(1);

							tspans.each(function() {
								const tspan = d3Select(this);

								expect(tspan.attr("x")).to.be.equal(expectedX);
								expect(tspan.attr("dy")).to.be.equal(expectedDy);
							});
						}
					});
				});

				it("should split tick text on rotated axis properly", () => {
					const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
					const tspans = tick.selectAll("tspan");
					const expectedTickTexts = [
							"this is a very",
							"long tick text",
							"on category",
							"axis"
						];
					const expectedX = "-9";

					expect(tspans.size()).to.be.equal(expectedTickTexts.length);

					tspans.each(function(d, i) {
						const tspan = d3Select(this);

						expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
						expect(tspan.attr("x")).to.be.equal(expectedX);

						// unable to define pricise number because it differs depends on environment..
						if (i === 0) {
							expect(parseFloat(tspan.attr("dy"))).to.be.below(0);
						} else {
							expect(parseFloat(tspan.attr("dy"))).to.be.above(8);
						}
					});
				});

				it("set options legend.show=false", () => {
					args.legend = {show: false};
				});

				it("should locate tick texts on rotated axis properly", () => {
					const ticksText = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick text");

					ticksText.each(function() {
						expect(util.ceil(+this.getAttribute("y"))).to.be.equal(37);
					});
				});
			});

			describe("option used", () => {
				describe("as null", () => {
					beforeAll(() => {
						args.axis.x.tick = {
							multiline: false
						};
					});

					it("should split x tick", () => {
						const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
						const tspans = tick.selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});

				});

				describe("as value", () => {
					beforeAll(() => {
						args.axis.x.tick = {
							width: 150
						};
					});

					it("should split x tick to 2 lines properly", () => {
						const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
						const tspans = tick.selectAll("tspan");
						const expectedTickTexts = [
								"this is a very long tick",
								"text on category axis"
							];
						const expectedX = "-9";

						expect(tspans.size()).to.be.equal(expectedTickTexts.length);

						tspans.each(function(d, i) {
							const tspan = d3Select(this);

							expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							// unable to define pricise number because it differs depends on environment..
							if (i === 0) {
								expect(parseFloat(tspan.attr("dy"))).to.be.below(0);
							} else {
								expect(parseFloat(tspan.attr("dy"))).to.be.above(8);
							}
						});
					});
				});
			});
		});

		describe("with axis.x.tick.format", () => {
			const tickTexts = ["this is a very long tick text", "on category axis"];

			beforeAll(() => {
				args.axis.x.tick.format = () => tickTexts;
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
				const tspans = tick.selectAll("tspan");

				expect(tspans.size()).to.be.equal(tickTexts.length);

				tspans.each(function(d, i) {
					const tspan = d3Select(this);

					expect(tspan.text()).to.be.equal(tickTexts[i]);
				});
			});
		});

		describe("tick text with '\n' to line break", () => {
			const tickText = "this is a very\nlong\ntick text";

			beforeAll(() => {
				args.axis.x.tick.format = () => tickText;
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
				const tspans = tick.selectAll("tspan");
				const lineBreaks = tickText.split("\n");

				expect(tspans.size()).to.be.equal(lineBreaks.length);

				tspans.each(function(d, i) {
					const tspan = d3Select(this);

					expect(tspan.text()).to.be.equal(lineBreaks[i]);
				});
			});
		});

		describe("axis.x.tick.format for category type", () => {
			const len = 3;

			beforeAll(() => {
				args.axis.x.tick.format = (i, name) => name && name.substr(0, len);
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${$AXIS.axisX}`).select("g.tick");
				const tspans = tick.selectAll("tspan");

				tspans.each(function() {
					expect(this.textContent.length).to.be.equal(len);
				});
			});
		});
	});

	describe("axis x height", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					xFormat: "%Y",
					columns: [
						["x", "2010", "2011", "2012", "2013", "2014", "2015"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					],
					type: "line"
				  },
				  axis: {
					x: {
					  type: "timeseries",
					  localtime: false,
					  tick: {
						format: "%Y-%m-%d %H:%M:%S"
					  }
					}
				}
			}
		});

		it("shouldn't overlap x Axis tick text with legend", () => {
			const {axis: {x}, legend} = chart.internal.$el;

			const xBottom = x.node().getBoundingClientRect().bottom;
			const legendTop = legend.node().getBoundingClientRect().top;

			expect(legendTop > xBottom).to.be.true;			
		});

		it("set option: legend.show=false", () => {
			args.legend = {
				show: false
			};
		});

		it("x Axis tick text should stay within container", () => {
			const {$el: {axis: {x}}, state} = chart.internal;
			const xBottom = x.node().getBoundingClientRect().bottom;

			expect(xBottom).to.be.below(state.current.height);
		});

		it("set option: legend.show=false", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "First Q\n2018", "Second\nQ 2018", "3Q\nYear\n2018", "Forth\nQuarter\n2018"],
						["data", 30, 100, 400, 150]
					],
					type: "line"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("shouldn't overlap x Axis tick text with legend", () => {
			const {axis: {x}, legend} = chart.internal.$el;

			const xBottom = x.node().getBoundingClientRect().bottom;
			const legendTop = legend.node().getBoundingClientRect().top;

			expect(legendTop > xBottom).to.be.true;			
		});
	});

	describe("axis.x.tick.tooltip", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
					  [
						"x",
						"John",
						"Aron",
						"David",
						"Chris",
						"Tyler",
						"Mike",
						"0",
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10"
					  ],
					  ["data1", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
					],
					type: "bar"
				},
				axis: {
					rotated: true,
					x: {
						type: "category",
						tick: {
						tooltip: true
						}
					}
				}
			}
		});

		it("<title> elements should be generated", () => {
			chart.internal.$el.axis.x.selectAll(".tick")
				.each(function() {
					expect(this.querySelector("title")).to.not.be.null;
				});
		})
	});

	describe("axis.x.tick.rotate", () => {
		describe("rotation > 0", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "category 1", "category 2", "category 3", "category 4", "category 5", "category 6"],
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25]
						]
					},
					axis: {
						x: {
							type: "category",
							tick: {
								rotate: 60
							}
						}
					}
				};
			});

			it("should rotate tick texts", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(60)");
					expect(text.attr("y")).to.be.equal("1.5");
					expect(tspan.attr("dx")).to.be.equal("6.928203230275509");
				});
			});

			it("should have automatically calculated x axis height", () => {
				const internal = chart.internal;
				const box = internal.$el.main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();
				const height = internal.getHorizontalAxisHeight("x");

				expect(box.height).to.be.above(50);
				expect(height).to.be.above(67);
				expect(height).to.be.below(80);
			});
		});

		describe("rotation < 0", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", "category 1", "category 2", "category 3", "category 4", "category 5", "category 6"],
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25]
						]
					},
					axis: {
						x: {
							type: "category",
							tick: {
								rotate: -60
							}
						}
					}
				};
			});

			it("should rotate tick texts", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(-60)");
					expect(text.attr("y")).to.be.equal("1.5");
					expect(tspan.attr("dx")).to.be.equal("-6.928203230275509");
				});
			});

			it("should have automatically calculated x axis height", () => {
				const internal = chart.internal;
				const box = internal.$el.main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();
				const height = internal.getHorizontalAxisHeight("x");

				expect(box.height).to.be.above(50);
				expect(height).to.be.above(67);
				expect(height).to.be.below(80);
			});

			it("set options: axis.x.tick.multiline=false", () => {
				args.axis.x.tick.multiline = false;
			});

			it("x Axis shouldn't be overlapped with the legend", () => {
				const {legend, main} = chart.$;
				const legendRect = legend.node().getBoundingClientRect();
				const xAxisRect = main.selectAll(`.${$AXIS.axisX}`).node().getBoundingClientRect();
				
				expect(legendRect.top > xAxisRect.bottom).to.be.true;
			});
		});
	});

	describe("axis.x.tick.autorotate", () => {
		const defaultPadding = 10;

		function compare(expectedXAxisTickRotate, expectedXAxisBoundingClientRect, expectedHorizontalXAxisHeight, expectedXAxisTickTextY2Overflow) {
			const internal = chart.internal;
			const xAxisBoundingClientRect = internal.$el.main.select(`.${$AXIS.axisX}`).node().getBoundingClientRect();
			const horizontalXAxisHeight = internal.getHorizontalAxisHeight("x");
			const xAxisTickRotate = internal.getAxisTickRotate("x");

			expect(xAxisTickRotate).to.be.equal(expectedXAxisTickRotate);
			expect(xAxisBoundingClientRect.height).to.be.closeTo(expectedXAxisBoundingClientRect, 1.5);
			expect(horizontalXAxisHeight).to.be.closeTo(expectedHorizontalXAxisHeight, 2);

			const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

			expect(xAxisTickTextY2Overflow).to.be.closeTo(expectedXAxisTickTextY2Overflow, 1);
		}

		function compareOverflow(expectedOverflow) {
			const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

			expect(xAxisTickTextY2Overflow).to.be.above(0, "5");
			expect(xAxisTickTextY2Overflow).to.be.closeTo(expectedOverflow, 1);
		}

		describe("`axis.x.type = category`", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						columns: [
							[
								"x",
								"categoryname1",
								"categoryname2",
								"categoryname3",
								"categoryname4",
								"categoryname5",
								"categoryname6"
							],
							["data1", 30, 200, 100, 400, 150, 250, 180]
						]
					},
					axis: {
						x: {
							type: "category",
							tick: {
								rotate: 15,
								autorotate: true,
								fit: true,
								centered: false,
								culling: false,
								multiline: false
							},
							clipPath: false
						}
					}
				};
			});

			it("should not rotate tick texts if there is enough space between ticks", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
						const tick = d3Select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");

						expect(text.attr("transform")).to.be.null;
						expect(text.attr("y")).to.be.equal("9");
						expect(tspan.attr("dx")).to.be.equal("0");
					});

				compare(0, 18.8125, 30, 0);
			});

			it("should not use the height of the longest tick text when ticks are not rotated", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.null;
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("0");
				});

				compare(0, 18.8125, 30, 0);
			});

			it("update args", () => {
				args = {
					...args,
					legend: {
						position: "right"
					}
				};
				args.data.columns[0] = [
					"x",
					"categoryname1111",
					"categoryname2222",
					"categoryname3333",
					"categoryname4444",
					"categoryname5555",
					"categoryname6666"
				]
			});

			it("should rotate tick texts if there is not enough space between ticks and legend is right", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(15)");
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
				});

				compare(15, 43, 53, 10)
			});

			it("update args", () => {
				args.data.columns[0] = [
					"x",
					"somecategoryname1",
					"somecategoryname2",
					"somecategoryname3",
					"somecategoryname4",
					"somecategoryname5",
					"somecategoryname6",
					"somecategoryname7"
				]
			});

			it("should rotate tick texts if there is not enough space between ticks", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
						const tick = d3Select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");

						expect(text.attr("transform")).to.be.equal("rotate(15)");
						expect(text.attr("y")).to.be.equal("9");
						expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
					});

				compare(15, 45, 56, 18)
			});

			it("should not resize x axis when all data hidden", () => {
				chart.hide("data1");

				compare(args.axis.x.tick.rotate, 6, 55, 18);

				chart.show("data1");
			});

			it("reset args", () => {
				args.data.columns[0] = [
					"x",
					"somecategoryname1",
					"somecategoryname2",
					"somecategoryname3",
					"somecategoryname4",
					"somecategoryname5",
					"somecategoryname6"
				];
				args.axis.x.tick.rotate = 0;
			});

			describe("xAxisTickTextY2Overflow", () => {
				it("should be 0 if not rotated", () => {
					const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

					expect(xAxisTickTextY2Overflow).to.be.equal(0);
				});

				it("update config", () => {
					args.axis.x.tick.rotate = 15;
					args.data.columns[0] = [
						"x",
						"somecategoryname1",
						"somecategoryname2",
						"somecategoryname3",
						"somecategoryname4",
						"somecategoryname5",
						"somecategoryname6",
						"somecategoryname7"
					];
				});

				it("should be above 0 if rotated", () => {
					compareOverflow(18);
				});

				it("update config", () => {
					args.axis.x.padding = {right: 2};
				});

				it("should be defaultPadding if padding right is set", () => {
					compareOverflow(defaultPadding);
				});

				it("update config", () => {
					args.axis.x.padding = {left: 2};
				});

				it("should be above defaultPadding if padding left is set", () => {
					compareOverflow( 27);
				});

				it("update config", () => {
					args.axis.x.padding = {left: 2, right: 2};
				});

				it("should be equal to defaultPadding if padding is set", () => {
					compareOverflow(defaultPadding);
				});
			});

			it("axis X should maintain its position on legend toggle", () => new Promise(done => {
				const axisXTransform = chart.$.main.select(`.${$AXIS.axisX}`).attr("transform");

				// when
				chart.toggle();

				setTimeout(() => {
					expect(chart.$.main.select(`.${$AXIS.axisX}`).attr("transform")).to.be.equal(axisXTransform);
					done(1);
				})
			}));
		});

		describe("`axis.x.type = timeseries`", () => {
			beforeAll(() => {
				args = {
					data: {
						x: "x",
						json: {
							Temperature: ["29.39", "29.7", "29.37", "28.87", "28.62", "27.72", "27.61", "27.82", "27.48", "26.78", "26.62", "26.64", "26.29", "26.01", "25.84", "25.07", "24.85", "24.01", "23.83", "22.8", "23", "22.64", "22.77", "22.64", "22.64", "22.62", "22.51", "21.42", "21.18", "20.93", "20.66", "20.48", "20.7", "21.24", "22.14", "22.78", "23.43", "23.16", "27.48", "26.78", "26.62", "26.64", "26.29", "26.01", "25.84", "25.07", "24.85", "24.01"],
							x: ["01-01-2015 00:00", "02-01-2015 00:00", "03-01-2015 00:00", "04-01-2015 00:00", "05-01-2015 00:00", "06-01-2015 00:00", "07-01-2015 00:00", "08-01-2015 00:00", "09-01-2015 00:00", "10-01-2015 00:00", "11-01-2015 00:00", "12-01-2015 00:00", "01-01-2016 00:00", "02-01-2016 00:00", "03-01-2016 00:00", "04-01-2016 00:00", "05-01-2016 00:00", "06-01-2016 00:00", "07-01-2016 00:00", "08-01-2016 00:00", "09-01-2016 00:00", "10-01-2016 00:00", "11-01-2016 00:00", "12-01-2016 00:00", "01-01-2017 00:00", "02-01-2017 00:00", "03-01-2017 00:00", "04-01-2017 00:00", "05-01-2017 00:00", "06-01-2017 00:00", "07-01-2017 00:00", "08-01-2017 00:00", "09-01-2017 00:00", "10-01-2017 00:00", "11-01-2017 00:00", "12-01-2017 00:00", "01-01-2018 00:00", "02-01-2018 00:00", "03-01-2018 00:00", "04-01-2018 00:00", "05-01-2018 00:00", "06-01-2018 00:00", "07-01-2018 00:00", "08-01-2018 00:00", "09-01-2018 00:00", "10-01-2018 00:00", "11-01-2018 00:00", "12-01-2018 00:00"]
						},
						type: "area",
						xFormat: "%m-%d-%Y %H:%M"
					},
					axis: {
						x: {
							type: "timeseries",
							tick: {
								multiline: false,
								culling: false,
								autorotate: true,
								rotate: 15,
								count: 5,
								format: "%Y-%m-%d %H:%M:%S",
							},
							clipPath: false
						}
					}
				};
			});

			it("should not rotate tick texts if there is enough space between ticks", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.null;
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("0");
				});

				compare(0, 18.8125, 30, 0);
			});

			it("should not use the height of the longest tick text when ticks are not rotated", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.null;
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("0");
				});

				compare(0, 18.8125, 30, 0);
			});

			it("update args", () => {
				args.axis.x.tick.count = 10;
			});

			it("should rotate tick texts if there is not enough space between ticks", () => {
				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(15)");
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
				});

				compare(15, 45.145263671875, 56.439983076254386, 108.67536019184263)
			});

			it("should not resize x axis when all data hidden", () => {
				chart.hide("Temperature");

				compare(args.axis.x.tick.rotate, 6, 55, 108);
			});

			it("should resize when show hidden data", () => {
				chart.show("Temperature");

				compare(15, 45.145263671875, 56.439983076254386, 108.67536019184263)
			});

			it("update args", () => {
				args.axis.x.tick.count = 0;
			});

			it("should rotate tick texts and show all 48 ticks", () => {
				let shownTicks = 0;

				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function(d, i) {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					shownTicks = i;

					expect(text.attr("transform")).to.be.equal("rotate(15)");
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
				});

				expect(shownTicks + 1).to.be.equal(48);

				compare(15, 45.145263671875, 56.439983076254386, 108.67536019184263)
			});

			it("update args", () => {
				args.axis.x.tick.fit = false;
			});

			it("should rotate tick texts and show 16 ticks without overflow", () => {
				let shownTicks = 0;

				chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`).each(function(d, i) {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					shownTicks = i;

					expect(text.attr("transform")).to.be.equal("rotate(15)");
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
				});

				expect(shownTicks + 1).to.be.equal(16);

				compare(15, 45.145263671875, 56.439983076254386, 0)
			});

			it("reset args", () => {
				args.axis.x.tick.count = 5;
				args.axis.x.tick.fit = true;
			});

			describe("xAxisTickTextY2Overflow", () => {
				it("should be 0 if not rotated", () => {
					const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

					expect(xAxisTickTextY2Overflow).to.be.equal(0);
				});

				it("reset args", () => {
					args.axis.x.tick.count = 10;
				});

				it("should be above 0 if not rotated", () => {
					compareOverflow(108.67536019184263);
				});

				it("update config", () => {
					args.axis.x.padding = { right: 1000*60*60*24*365 }; // 1 year
				});

				it("should be defaultPadding if padding right is set", () => {
					compareOverflow(defaultPadding);
				});

				it("update config", () => {
					args.axis.x.padding = { left: 1000*60*60*24*365 }; // 1 year
				});

				it("should be above 10 if padding left is set", () => {
					compareOverflow(108.67536019184263);
				});

				it("update config", () => {
					const padding = 1000*60*60*24*365;

					args.axis.x.padding = {left: padding, right: padding}; // 1 year
				});

				it("should be defaultPadding if padding is set", () => {
					compareOverflow(defaultPadding);
				});
			});

			it("axis X should maintain its position on legend toggle", () => new Promise(done => {
				const axisXTransform = chart.$.main.select(`.${$AXIS.axisX}`).attr("transform");

				// when
				chart.toggle();

				setTimeout(() => {
					expect(chart.$.main.select(`.${$AXIS.axisX}`).attr("transform")).to.be.equal(axisXTransform);
					done(1);
				})
			}));
		});
	});

	describe("axis.y.tick.format", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100]
					],
				},
				axis: {
					y: {
						tick: {
							format: function(x) {
								return this.data.values("data1")[0];
							}
						}
					}
				}
			};
		});

		it("tick.format context should be chart instance itself.", () => {
			// when
			chart.tooltip.show({x:1});

			expect(+chart.$.tooltip.select(".value").text()).to.be.equal(30);
		});
	});

	describe("axis.y.tick.rotate", () => {
		describe("y Axis", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250, 100, 600],
							["data2", 50, 20, 10, 40, 15, 25],
						]
					},
					axis: {
						rotated: true,
						y: {
							tick: {
								rotate: 45
							}
						}
					}
				};
			});

			it("should rotate tick texts", () => new Promise(done => {
				chart.$.main.selectAll(`.${$AXIS.axisY} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");
					const transform: any = text.attr("transform");

					transform &&
						expect(Math.round(transform.replace(/[A-z()]/g, ""))).to.be.equal(args.axis.y.tick.rotate);

					expect(text.attr("y")).to.be.equal("4");
					expect(parseFloat(tspan.attr("dx"))).to.be.closeTo(5.6, 0.5);
				});

				done(1);
			}));

			it("should have automatically calculated y axis width", () => {
				const box = chart.$.main.select(`.${$AXIS.axisY}`)
					.node().getBoundingClientRect();

				expect(box.width).to.be.closeTo(590, 1);
			});
		});

		describe("y2 Axis", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250, 100, 600],
							["data2", 50, 20, 10, 40, 15, 25],
						]
					},
					axis: {
						rotated: true,
						y2: {
							show: true,
							tick: {
								rotate: 45
							}
						}
					}
				};
			});

			it("should rotate tick texts", () => new Promise(done => {
				chart.$.main.selectAll(`.${$AXIS.axisY2} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");
					const transform: any = text.attr("transform");

					transform &&
						expect(Math.round(transform.replace(/[A-z()]/g, ""))).to.be.equal(args.axis.y2.tick.rotate);

					expect(+text.attr("y")).to.be.closeTo(-13, 0.5);
					expect(parseFloat(tspan.attr("dx"))).to.be.closeTo(-5.6, 0.5);
				});

				done(1);
			}));

			it("should have automatically calculated y axis width", () => {
				const box = chart.$.main.select(`.${$AXIS.axisY2}`)
					.node().getBoundingClientRect();

				expect(box.width).to.be.closeTo(590, 1);
			});

		});
	});

	describe("axis.x.tick.fit", () => {
		describe("axis.x.tick.fit = true", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", 150, 120, 110, 140, 115, 125]
						]
					}
				};
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(6);
			});

			it("set options for x-based data", () => {
				args = {
					data: {
						x: "x",
						columns: [
							["x", 10, 20, 100, 110, 200, 1000],
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", 150, 120, 110, 140, 115, 125]
						]
					}
				};
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(6);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(6);
			});

		});

		describe("axis.x.tick.fit = false", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", 150, 120, 110, 140, 115, 125]
						]
					},
					axis: {
						x: {
							tick: {
								fit: false
							}
						}
					}
				};
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(11);
			});

			it("set options x-based data", () => {
				args.data = {
					x: "x",
					columns: [
						["x", 10, 20, 100, 110, 200, 1000],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				};
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(10);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.$.main.selectAll(`.${$AXIS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(10);
			});

			it("set option data.type='bar'", () => {
				args.data.type = "bar";
			});

			it("bar type with tick.fit=false, shouldn't throw error", () => {
				expect(true).to.be.ok;
			});
		});
	});

	describe("y/y2 Axis inner", () => {
		describe("axis.y.inner", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25]
						]
					},
					axis: {
						y: {
							inner: false
						}
					}
				};
			});

			it("should not have inner y axis", () => {
				const paddingLeft = chart.internal.getCurrentPaddingByDirection("left")
				const tickTexts = chart.$.main.selectAll(`.${$AXIS.axisY} g.tick text`);

				expect(paddingLeft).to.be.above(19);

				tickTexts.each(function() {
					expect(+d3Select(this).attr("x")).to.be.below(0);
				});
			});

			it("set options axis.y.inner=true", () => {
				args.axis.y.inner = true;
			});

			it("should have inner y axis", () => {
				const paddingLeft = chart.internal.getCurrentPaddingByDirection("left");
				const tickTexts = chart.$.main.selectAll(`.${$AXIS.axisY} g.tick text`);

				expect(paddingLeft).to.be.equal(0);

				tickTexts.each(function() {
					expect(+d3Select(this).attr("x")).to.be.above(0);
				});
			});

		});

		describe("axis.y2.inner", () => {
			beforeAll(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25]
						]
					},
					axis: {
						y2: {
							show: true,
							inner: false
						}
					}
				};
			});

			it("should not have inner y axis", () => {
				const paddingRight = chart.internal.getCurrentPaddingByDirection("right");
				const tickTexts = chart.$.main.selectAll(`.${$AXIS.axisY2} g.tick text`);

				expect(paddingRight).to.be.above(19);

				tickTexts.each(function() {
					expect(+d3Select(this).attr("x")).to.be.above(0);
				});
			});

			it("set options axis.y2.inner=true", () => {
				args.axis.y2.inner = true;
			});

			it("should have inner y2 axis", () => {
				const paddingRight = chart.internal.getCurrentPaddingByDirection("right");
				const tickTexts = chart.$.main.selectAll(`.${$AXIS.axisY2} g.tick text`);

				expect(paddingRight).to.be.equal(1);

				tickTexts.each(function() {
					expect(+d3Select(this).attr("x")).to.be.below(0);
				});
			});
		});
	});
	
	describe("y/y2 Axis inverted", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, -100],
						["data2", 130, 100, 140]
					],
					type: "bar"
				},
				axis: {
					y: {
						inverted: true
					},
					y2: {
						show: true
					}
				}
			}
		});

		function checkInvertedAxis(bars, axisId) {
			const y0 = chart.internal.scale[axisId](0);

			bars.each(function({value}) {
				const d = this.getAttribute("d");
				const {y, height} = this.getBoundingClientRect();

				// every bar shape's starting y coordinate should be from 0(y0)
				expect(+d.match(/,(\d+\.\d+)V/)[1]).to.be.equal(y0);

				if (value > 0) {
					expect(y + height).to.be.above(y0);
				} else {
					expect(y).to.be.below(y0);
				}
			});
		}

		it("bar should be draw correctly on inverted y axis.", () => {
			const {bar: {bars}} = chart.$;

			checkInvertedAxis(bars, "y");
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, -100],
						["data2", 130, 100, 140]
					],
					type: "bar",
					axes: {
						data1: "y2",
						data2: "y2",
					}
				},
				axis: {
					y: {
						show: false
					},
					y2: {
						show: true,
						inverted: true
					}
				}
			};
		});

		it("bar should be draw correctly on inverted y2 axis.", () => {
			const {bar: {bars}} = chart.$;

			checkInvertedAxis(bars, "y2");
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, -100],
						["data2", 50, -50, 70]
					],
					type: "bar",
					axes: {
						data1: "y",
						data2: "y2",
					}
				},
				axis: {
					y: {
						inverted: true
					},
					y2: {
						show: true,
						inverted: true
					}
				}
			}
		});

		it("should draw bars bound to differenct axes with inverted option correctly.", () => {
			const {bar: {bars}} = chart.$;

			checkInvertedAxis(bars.filter(({id}) => id === "data1"), "y");
			checkInvertedAxis(bars.filter(({id}) => id === "data2"), "y2");
		})
	});

	describe("axis.rotated", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150],
						["data2", 50, 20, 10, 40, 15],
						["data3", 50, 20, 10, 40, 15],
						["data4", 30, 200, 130, 400, 30],
						["data5", 50, 20, 10, 40, 415]
					]
				},
				legend: {
					show: false
				},
				axis: {
					x: {
						type: "category",
						categories: ["cat1", "cat2", "cat3", "cat4", "cat5"]
					},
					rotated: true
				}
			};
		});

		it("should render ticks of rotated axis inside bar position range", () => {
			const ticks = chart.$.main.select(`.${$AXIS.axisX}`).selectAll("g.tick").nodes();

			chart.internal.state.eventReceiver.coords.forEach((d, idx) => {
				const tick = d3Select(ticks[idx]);
				const y = +tick.attr("transform").match(/,([^)]*)/)[1];

				expect(y).to.closeTo(d.y, 1);
			});
		});

		it("y Axis clipPath element's x/y value should be < 0", () => {
			const {state, $el} = chart.internal;
			const yAxisClipPathRect = $el.svg.select(`#${state.clip.idYAxis} rect`);

			expect(+yAxisClipPathRect.attr("x")).to.be.below(0);
			expect(+yAxisClipPathRect.attr("y")).to.be.below(0);
		});
	});

	describe("axis tick visiblity", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "www.somesitename1.com", "www.somesitename2.com", "www.somesitename3.com"],
						["data1", 90, 100, 140],
						["data2", 130, 40, 200]
					],
					types: {
						data1: "bar",
						data2: "area-spline"
				}
				},
				axis: {
					x: {
						type: "category",
						tick: {
							rotate: 75,
							multiline: false,
							tooltip: true,
							show: false,
							text: {
								show: false
							}
						}
					},
					y: {
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					},
					y2: {
						show: true,
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					}
				}
			};
		});

		it("axes tick shouldn't be shown", () => {
			["x", "y", "y2"].forEach(id => {
				const axis = chart.$.main.select(`.${$AXIS.axis}-${id}`);

				expect(axis.select(".tick").empty()).to.be.true;
			});
		});

		it("set options tick.show=true", () => {
			args.axis.x.tick.show = args.axis.y.tick.show = args.axis.y2.tick.show = true;
		});

		it("axes tick line should be shown", () => {
			["x", "y", "y2"].forEach(id => {
				const axis = chart.$.main.select(`.${$AXIS.axis}-${id}`);

				expect(axis.selectAll(".tick line").empty()).to.be.false;
				expect(axis.selectAll(".tick text").size()).to.be.equal(0);
			});
		});

		it("set options tick.text.show=true", () => {
			args.axis.x.tick.show = args.axis.y.tick.show = args.axis.y2.tick.show = false;
			args.axis.x.tick.text = args.axis.y.tick.text = args.axis.y2.tick.text = {show: true};
		});

		it("axes tick text should be shown", () => {
			["x", "y", "y2"].forEach(id => {
				const axis = chart.$.main.select(`.${$AXIS.axis}-${id}`);

				expect(axis.selectAll(".tick text").empty()).to.be.false;
				expect(axis.selectAll(".tick line").size()).to.be.equal(0);
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
					  ["data1", 90, 100, 140, 200, 100]
					],
					type: "bar",
				},
				axis: {
					x: {
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					},
					y: {
						tick: {
							show: false,
							text: {
								show: false
							}
						}
					}
				}
			};
		});

		it("should show tick without error", () => {
			expect(
				chart.config("axis.y.tick.show", true, true)
			).to.not.throw;

			expect(
				chart.internal.$el.axis.y.selectAll(".tick").size() > 0
			).to.be.true;
		});
	});

	describe("axis text on 'binary floating point'", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 20.5, 20.65, 20.79, 20.93, 21.1, 21.5, 21.7, 21.9, 22.1, 22.2]
					]
				},
				axis: {
					y: {
						min: 20.1,
						tick: {
							count: 6
						}
					}
				}
			};
		});

		it("should be rounded tick text values", () => {
			// should not contain unrounded float numbers: ex) 0.30000000000000004
			const rx = /\d+\.\d+0{5,}\d$/;

			chart.$.main.selectAll(`.${$AXIS.axisY} tspan`).each(v => {
				expect(rx.test(v.splitted)).to.be.false;
			});
		});
	});

	describe("axis text's position", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "category 1", "category 2", "category 3", "category 4", "category 5", "category 6"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				axis: {
					x: {
						type: "category",
						tick: {
							text: {
								position: {
									x: 20,
									y: 10
								}
							}
						}
					},
					y: {
						tick: {
							text: {
								position: {
									x: -5,
									y: 20
								}
							}
						}
					},
					y2: {
						show: true,
						tick: {
							text: {
								position: {
									x: 0,
									y: 10
								}
							}
						}
					}
				}
			};
		});

		it("should be rounded tick text values", () => {
			const main = chart.$.main;

			["x", "y", "y2"].forEach(v => {
				const pos = args.axis[v].tick.text.position;

				main.selectAll(`.${$AXIS[`axis${v.toUpperCase()}`]} tspan`).each(function() {
					const tspan = d3Select(this);

					expect(+tspan.attr("dx")).to.be.equal(pos.x);
					expect(+tspan.attr("dy")).to.be.equal(pos.y + (v !== "x" ? 3 : 0));
				});
			});
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("should be rounded tick text values", () => {
			const main = chart.$.main;

			["x", "y", "y2"].forEach(v => {
				const pos = args.axis[v].tick.text.position;

				main.selectAll(`.${$AXIS[`axis${v.toUpperCase()}`]} tspan`).each(function() {
					const tspan = d3Select(this);

					expect(+tspan.attr("dx")).to.be.equal(pos.x);
					expect(+tspan.attr("dy")).to.be.equal(pos.y + (v === "x" ? 3 : 0));
				});
			});
		});
	});

	describe("axis clipPath", () => {
		it("set options axis.x.clipPath=false / axis.y.clipPath=false", () => {
			args.axis.y.clipPath = args.axis.x.clipPath = false;
		});

		it("shouldn't be set 'clipPath' attribute", () => {
			chart.$.main
				.selectAll(`.${$AXIS.axisX},.${$AXIS.axisY}`).each(function() {
					expect(this.getAttribute("clip-path")).to.be.null;
				});
		});
	});

	describe("when data is zero, unnecessary tick shouldn't be showing", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 0]
					]
				},
				axis: {
					y: {
						tick: {
							count: 4
						}
					}
				}
			}
		});

		it("only one tick should be generated even counts are greater than 1", () => {
			const ticks = chart.$.main.selectAll(`.${$AXIS.axisY} .tick`);

			expect(ticks.size()).to.be.equal(1);
		});
	});

	describe("Axis show", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150],
						["data2", 50, 20, 10, 40, 15]
					]
				},
				axis: {
					x: {
						show: false
					},
					y: {
						show: false
					}
				}
			};
		});

		it("x and y axis should be hidden", () => {
			const main = chart.$.main;
			const {x, y} = chart.internal.scale;

			expect(x && y).to.be.ok;

			["x", "y"].forEach(v => {
				expect(main.select(`.bb-axis-${v}`).style("visibility")).to.be.equal("hidden");
			});
		});

		it("y Axis domain should update even is hidden", () => new Promise(done => {
			const yDomain = chart.internal.scale.y.domain();

			// when
			chart.load({
				columns: [
					['data1', 500, 600, 500, 4000, 750, 2000],
					['data2', 123, 444, 555, 112, 3321, 232],
				],
				done: function() {
					// after dynamic data load, y axis domain should be updated
					expect(yDomain).to.not.be.deep.equal(
						this.internal.scale.y.domain()
					);

					done(1);
				}
			});
		}));
	});

	describe("Multi axes", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150],
						["data2", 50, 20, 10, 40, 15]
					]
				},
				axis: {
					x: {
						axes: [
							{
								tick: {
									outer: false,
									count: 9
								}
							}
						]
					},
					y: {
						axes: [
							{
								tick: {
									count: 5
								}
							},
							{
								tick: {
									outer: false,
									format: x => `${x}%`,
									count: 2
								}
							}
						]
					},
					y2: {
						show: true,
						axes: [
							{
								tick: {
									values: [0.35, 0.75]
								}
							}
						]
					}
				}
			}
		});

		const checkRange = id => {
			const range = chart.internal.scale[id].range();
			const axisRange = chart.internal.axis.axesList[id][0].scale().range();

			return range.every((v, i) => v === axisRange[i]);
		};

		const checkXAxes = (rotated?) => {
			const main = chart.$.main;
			const xAxisY = util.parseNum(main.select(`.${$AXIS.axis}-x`).attr("transform"));
			const axis1 = main.select(`.${$AXIS.axis}-x-1`);

			expect(util.parseNum(axis1.attr("transform"))).to.be[rotated ? "below" : "above"](xAxisY);

			let tickValue = -0.5;
			axis1.selectAll(".tick text").each(function() {
				expect(+this.textContent).to.be.equal(tickValue += 0.5);
			});

			expect(checkRange("x")).to.be.true;
		};

		const checkYAxes = (rotated?) => {
			const main = chart.$.main;
			const yAxisY = util.parseNum(main.select(`.${$AXIS.axis}-y`).attr("transform"));
			let yAxes = chart.internal.axis.axesList.y;
			const toBeMethod = rotated ? "above" : "below";

			yAxes = yAxes.map((v, i) => main.select(`.${$AXIS.axis}-y-${i + 1}`));

			yAxes.map(v => util.parseNum(v.attr("transform")))
				.reduce((p, curr) => {
					expect(p).to.be[toBeMethod](yAxisY);
					expect(curr).to.be[toBeMethod](p);
				});

			const expectedTickValue = [
				["0", "100", "200", "300", "400"],
				["0%", "200%", "400%"]
			]

			yAxes.forEach((v, i) => {
				v.selectAll(".tick text").each(function(d, j) {
					expect(this.textContent).to.be.equal(expectedTickValue[i][j]);
				});
			});

			expect(checkRange("y")).to.be.true;
		};

		const checkY2Axes = (rotated?) => {
			const main = chart.$.main;
			const yAxisY = util.parseNum(main.select(`.${$AXIS.axis}-y2`).attr("transform").split(",")[rotated ? 1 : 0]);
			const axis1 = main.select(`.${$AXIS.axis}-y2-1`);

			expect(util.parseNum(axis1.attr("transform"))).to.be[rotated ? "below" : "above"](yAxisY);

			const expectedTickValues = args.axis.y2.axes[0].tick.values;

			axis1.selectAll(".tick text").each(function(d, i) {
				expect(+this.textContent).to.be.equal(expectedTickValues[i]);
			});

			expect(checkRange("y2")).to.be.true;
		};

		it("check for axes generation", () => {
			const main = chart.$.main;
			const axesList = chart.internal.axis.axesList;

			["x", "y", "y2"].forEach(id => {
				axesList[id].forEach((v, i) => {
					expect(main.select(`.${$AXIS.axis}-${id}-${i + 1}`).empty()).to.be.false;
				});
			});
		});

		it("check for x Axes", () => {
			checkXAxes();
		});

		it("check for y Axes", () => {
			checkYAxes();
		});

		it("check for y2 Axes", () => {
			checkY2Axes();
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check for rotated x Axes", () => {
			checkXAxes(true);
		});

		it("check for rotated y Axes", () => {
			checkYAxes(true);
		});

		it("check for rotated y2 Axes", () => {
			checkY2Axes(true);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1",30,200,100,400,150],
						["data2",50,20,10,40,15]
					]
				},
				axis:{
					x:{
						axes: [{domain: [0, 500]}]
					},
					y:{
						axes: [
							{domain: [0, 1000]},
							{domain: [0, 2000]}
						]
					},
					y2:{
						show: true,
						axes: [{domain: [0, 300]}]
					}
				}
			};
		});

		it("check axes domain value", () => {
			const main = chart.$.main;

			["x", "y", "y2"].forEach(id => {
				chart.internal.axis.axesList[id]
					.forEach((v, i) => {
						const axis = main.select(`.${$AXIS.axis}-${id}-${i + 1}`);
						const domain = v.scale().domain();

						expect(domain).to.be.deep.equal(args.axis[id].axes[i].domain);
						expect(+axis.select(`.tick text`).text()).to.be.equal(domain[0]);
						expect(+axis.select(`.tick:last-child text`).text()).to.be.equal(domain[1]);
					});
			});
		})
	});

	describe("y Axis size", () => {
		beforeAll(() => {
			args = {
				data: {
				  columns: [
						  ["sample", 30, 200, 100, 400, 150, 2500]
				  ]
				},
				axis: {
				  y: {
					tick: {
					  format: function(x) { return d3Format("$,")(x); },
					  count: 12
					},
				  }
				}
			};
		});

		it("check y Axis width sizing", () => {
			const axisY = chart.$.main.select(`.${$AXIS.axisY}`);

			expect(axisY.node().getBoundingClientRect().width).to.be.equal(
				axisY.select(".tick:nth-child(12)").node().getBoundingClientRect().width
			);
		});

		it("set option", () => {
			args = {
				data: {
					columns: [
						["data1"]
					],
					empty: {
						label: {
							text: "No data..."
						}
					},
					type: "line"
				},
				axis: {
					y: {
						label: "Your Y Axis",
						position: ""
					}
				}
			};
		});

		it("<clipPath> width shouldn't truncate y axis tick when has no data", () => {
			const rect = chart.internal.$el.defs.selectAll("clipPath[id$='yaxis'] rect");

			expect(+rect.attr("width")).to.be.equal(60);
		});

		it("set options: axis.y.label", () => {
			args.axis.y.label = {
				text: "Your Y Axis",
				position: "outer-middle"
			};

			args.axis.y2 = {
				show: true,
				label: args.axis.y.label
			}
		});

		it("label text shouldn't be overlapped with tick text", () => {
			const y = chart.$.main.select(`.${$AXIS.axisY}`);
			const y2 = chart.$.main.select(`.${$AXIS.axisY2}`);

			[y, y2].forEach((v, i) => {
				const labelRect = v.select("text").node().getBoundingClientRect();
				const tickRect = v.select(".tick:nth-child(7)").node().getBoundingClientRect();

				// y axis
				if (i === 0) {
					expect(labelRect.x + labelRect.width < tickRect.x).to.be.true;

				// y2 axis
				} else {
					expect(labelRect.x > tickRect.x + tickRect.width).to.be.true
				}
			});
		})
	});

	describe("Axes tick culling", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250],
						["data2", 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 30, 200, 100, 400, 150, 250, 200, 100, 400, 150, 250]
					],
					axes: {
						data2: "y2"
					}
				},
				axis: {
					x: {
					tick: {
						culling: {
							max: 4
						}
					}
					},
					y: {
						tick: {
							culling: {
								max: 3
							}
						}
					},
					y2: {
						show: true,
						tick: {
							culling: true
						}
					}
				},
				subchart: {
					show: true
				}
			};
		});

		const checkTickValues = () => {
			const expected = {
				x: [0, 6, 12, 18],
				y: [0, 200, 400],
				y2: [0, 100, 200, 300, 400]
			};

			["subX", "x", "y", "y2"].forEach(v => {
				const data = chart.internal.$el.axis[v]
					.selectAll(".tick text").filter(function() {
						return this.style.display === "";
					}).data();

				expect(data).to.be.deep.equal(expected[v === "subX" ? "x" : v]);
			});
		}

		it("check tick values are culled", () => {
			checkTickValues();
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check tick values are culled when axis is rotated", () => {
			checkTickValues();
		});

		it("set options: set axes tick culling lines to 'false'", () => {
			args.axis.x.tick.culling.lines = false;
			args.axis.y.tick.culling.lines = false;
			args.axis.y2.tick.culling = {
				max: 3,
				lines: false
			};

			args.subchart.show = false;
		});

		it("check that tick lines are hidden", () => {
			const {$el: {axis}} = chart.internal;
			const selector = ".tick:not([style='display: none;'])";

			["x", "y", "y2"].forEach(v => {
				expect(axis[v].selectAll(selector).size()).to.be.equal(args.axis[v].tick.culling.max);
			});
		});

		it("set options", () => {
			args = {
				data: {
					x: "periods",
					xFormat: "%Y",
					type: "line",
					columns: [
						["periods", "2011", "2012", "2013", "2014", "2015","2016"],
						["data1", 30, 200, 100, 170, 150, 250]
					]
				},
			  axis: {
				x: {
				  tick: {
					culling: {
					  max: 8
					}
				  }
				}
			  }
			}
		});

		it("tick text's culling visibility should work correctly", () => new Promise(done => {
			// count visibility text nodes
			const countVisibility = () => {
				let visible = 0;
				let hidden = 0;

				chart.internal.$el.axis.x.selectAll(".tick text")
					.each(function() {
						if (this.style.display === "none") {
							hidden++;
						} else {
							visible++;
						}
					});

				return {visible, hidden};
			};

			new Promise((resolve, reject) => {
				// load new dataset
				chart.load({
					columns: [
						["periods", "1999", "2000", "2001", "2002", "2003","2004","2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015","2016"],
						["data1", 30, 200, 100, 170, 150, 250, 30, 200, 100, 170, 150, 250, 30, 200, 100, 170, 150, 250]
					],
					done: resolve
				});
			}).then(() => {
				const {visible, hidden} = countVisibility();

				expect(visible).to.equal(6);
				expect(hidden).to.equal(12);				

				return new Promise((resolve, reject) => {
					// revert to original dataset
					chart.load({
						columns: args.data.columns,
						done: resolve
					});
				});
			}).then(() => {
				const {visible, hidden} = countVisibility();

				expect(visible).to.equal(6);
				expect(hidden).to.equal(0);	

				done(1);
			});
		}));
	});
	
	describe("Axes tick padding", () => {
		beforeAll(() => {
			args = {
				data: {      
					columns: [
						["data1", 4, 4, 3, 3]
					]
				},
				axis: {      
					y: {
						max: 5,
						tick: {
							values: [0, 1, 2, 3, 4, 5],
							count: 5
						},
						padding: {
							top: 20
						}
					}
				}
			};
		});

		it("using both tick.values & count option not to make spaced left padding", () => {
			const tickValues = chart.internal.axis.getTickValues("y");
			const translateX = +(chart.$.main.attr("transform").match(/(\d+[\.\d]*)/) || [0])[0];

			expect(tickValues.every(v => v % 1 === 0)).to.be.true;
			expect(translateX).to.be.closeTo(30.5, 1);
		});

		it("should work with axis.x.padding=10 option", () => new Promise(done => {
			const option = {
				data: {
					x: "x",
					columns: [
						["x", "2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					],
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
						format: "%Y-%m-%d"
						},
						padding: 100
					}
				},
				subchart: {
					show: true,
					init: {
						range: [
							+new Date("2020-01-02 00:00:00"),
							+new Date("2020-01-03 00:00:00")
						]
					}
				},
				onafterinit: function() {		
					// reaching at this point, means no issue happened
					expect(true).to.be.ok;

					done(1);
				}
			};

			util.generate(option);			
		}));

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", 1, 2, 3, 4, 5],
						["data1", 30, 200, 100, 400, 150],
					],
					type: "line"
				},
				axis: {
					x: {
						type: "category",
						tick: {
							rotate: 5
						},
						padding: 10
					}
				}
			}
		});

		it("check if axis.x.padding correctly set when is given as number value.", () => {
			const {state} = chart.internal;
			const padding = args.axis.x.padding;

			expect(state.axis.x.padding).to.be.deep.equal({left: padding, right: padding});
		});

		it("set options axis.x.padding={left: 5}", () => {
			args.axis.x.padding = {left: 5};
		});

		it("check if axis.x.padding correctly set when is given as 'left' key only.", () => {
			const {state} = chart.internal;
			const padding = args.axis.x.padding;
			
			padding.right = 0;

			expect(state.axis.x.padding).to.be.deep.equal(padding);
		});

		it("set options axis.x.padding={left: 15, right: 5}", () => {
			args.axis.x.padding = {left: 15, right: 5};
		});

		it("check if axis.x.padding correctly set when is given as object type.", () => {
			const {state} = chart.internal;
			const padding = args.axis.x.padding;

			expect(state.axis.x.padding).to.be.deep.equal(padding);
		});
	});

	describe("Axis tick.values", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2022-01-01", "2022-01-02", "2022-01-03", "2022-01-04", "2022-01-05", "2022-01-06"],
						["data1", 30, 200, 100, 400, 150, 250]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d",
							 fit: false,
							values: [
								"2022-01-01",
								"2022-01-03",,
								"2022-01-05"
							]
						}
					}
				}
			};
		});

		it("tick transform translate shoudn't contain NaN value.", () => {
			chart.$.main.selectAll(".tick")
				.each(function() {
					const hasNaN = this.getAttribute("transform")?.indexOf("NaN") >= 0;

					expect(hasNaN).to.be.false;
				});
		});
	});

	describe("axis min/max", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 100, 100],
						["data2", 50, 20, 10, 50, 60]
					]			
				},
				axis: {
					x: {
						min: {
							fit: true,
							value: -1
						},
						max: {
							fit: true,
							value: 10
						}
					}
				}
			}
		});

		it("check if x axis min/max is fitten.", () => {
			const yAxisRect = getBoundingRect(chart.$.main.select(`.${$AXIS.axisY}`).node());
			const lineRect = getBoundingRect(chart.$.line.lines.node());

			// check min
			expect(lineRect.left).to.be.closeTo(yAxisRect.right, 10);

			// check max
			expect(lineRect.right).to.be.closeTo(chart.internal.state.current.width, 10);
		});

		it("set option axis.min/max.fit=false", () => {
			args.axis.x.max.fit = args.axis.x.min.fit = false;
		});

		it("check if x axis min/max is not fitten.", () => {
			const yAxisRect = getBoundingRect(chart.$.main.select(`.${$AXIS.axisY}`).node());
			const lineRect = getBoundingRect(chart.$.line.lines.node());

			// check min
			expect(lineRect.left - yAxisRect.right > 50).to.be.true;

			// check max
			expect(chart.internal.state.current.width - lineRect.right > 300).to.be.true;
		});

		it("set option axis.min/max.value", () => {
			args.axis.x.min = {
				fit: true,
				value: 1
			};

			args.axis.x.max = {
				fit: true,
				value: 3
			}
		});

		it("check if x axis min/max is not fitten.", () => {
			const currWidth = chart.internal.state.current.width;

			chart.internal.$el.axis.x.selectAll(".tick").each(function(d, i) {
				const xPos = +util.parseNum(this.getAttribute("transform"));

				console.log(xPos, this.getAttribute("transform"))

				if (i === 0) { // check min
					expect(xPos).to.be.below(0);
				} else if (i === 4) { // check max 
					expect(xPos).to.be.above(currWidth);
				} else {
					expect(xPos > 0 && xPos < currWidth).to.be.true;
				}
			});
		});

		it("the use of axis.x.max option, shouldn't throw error", () => {
			const args = {
				data: {
					x: "x",
					columns: [
					["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
					["data1", 30, 200, 100, 400, 150, 250],
					["data2", 130, 340, 200, 500, 250, 350]
					],
					type: "line", 
				},
				axis: {
					x: {
						max: "2013-01-04",
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};

			expect(bb.generate(args)).to.not.throw;
		});

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "1180", "980", "915"],
						["1180", 74.07, null, null],
						["980", null, 43.75, null],
						["915", null, null, 42.47]
					],
					type: "bar",
					groups: [
						["1180", "980", "915"]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("y Axis max value should be scaled properly", () => {
			const {internal} = chart;
			const {max} = internal.getMinMaxValue();

			expect(internal.scale.y.domain()[1]).to.be.closeTo(max, 10);
			expect(+internal.$el.axis.y.select(".tick:nth-child(10) tspan").text()).to.be.closeTo(max, 10);
		});
	});

	describe("x Axis padding: unit='px'", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						['data1', 80, 250, 200, 200, 250, 150],
						['data2', 170, 350, 240, 200, 250, 150]
					],
					type: "line"
				},
				axis: {
					x: {
						padding: {
							left: 100,
							right: 80,
							unit: "px"
						}
					}
				}
			}
		});

		const chkPadding = () => {
			const lines = chart.$.line.lines.node();
			let rect = lines.getBoundingClientRect();
			let expected = {left: 129.5, right: 568.5};

			expect(rect.left).to.be.closeTo(expected.left, 1);
			expect(rect.right).to.be.closeTo(expected.right, 1);

			// when
			chart.resize({width: 300});

			
			rect = lines.getBoundingClientRect();
			expected = {left: 106.5, right: 246.5};

			expect(rect.left).to.be.closeTo(expected.left, 1);
			expect(rect.right).to.be.closeTo(expected.right, 1);
		};

		it("should apply pixel value paddings", () => {
			chkPadding();
		});

		it("set options axis.x.type='timeseries'", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05", "2021-01-06"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					],
					type: "line"
				},
				axis: {
					x: {
						type: "timeseries",
						padding: {
							left: 100,
							right: 80,
							unit: "px"
						}
					}
				}
			}
		});

		it("should apply pixel value paddings for axis.x.type='timeseies'", () => {
			chkPadding();
		});
	});

	describe("x Axis tick width size", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "City of New York"],
						["data1", 380],
						["data2", 302]
					],
					order: null,
					type: "bar",
					groups: [['data1', 'data2']],
				},
				axis: {
					x: {
						type: 'category',
						tick: {
							multiline: false
						}
					},
					rotated: true,
				}
			};
		});

		it("x Axis tick width should be evaluated correctly", () => {
			const {state: {current: {maxTickSize}}} = chart.internal;

			const {width} = maxTickSize.x;
			const tickWdith = chart.$.main.select(`.${$AXIS.axisX} tspan`).node().getBoundingClientRect().width;

			expect(width).to.be.equal(tickWdith);
		});
	});

	describe("Log axis type", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x"  ,
					columns: [
						["x", 100, 395, 740, 1500, 3000, 4500],
						["data1", 210, 1150, 12000, 100000, 1000000],
						["data2", 100, 100, 100, 100, 100]
					],
					axes: {
						data1: "y",
						data2: "y2"
					},
					types: {
					  data1: "bar"
					}
				  },
				  axis: {
					x: {
						type: "log",
						min: 50
					},
					y: {
					  type: "log"
					},
					y2: {
						show: true,
						type: "log"
					}
				}
			}
		});

		const checkAxisTickPos = () => {
			["x", "y", "y2"].forEach(id => {
				const scale = chart.internal.scale[id];

				chart.internal.$el.axis[id].selectAll(".tick").each(function(d) {
					expect(scale(d)).to.be.closeTo(
						util.parseNum(this.getAttribute("transform").replace(/(0,|,0)/, "")), 1
					);
				});
			});
		};

		it("check ticks scaled correctly", () => {
			checkAxisTickPos();
		});

		it("set options: y/y2 axes min/max", () => {
			args.axis.y.min = 10;
			args.axis.y.max = 100000000;

			args.axis.y2.min = 30;
			args.axis.y2.max = 20000;
		});

		it("check ticks min/max & scales", () => {
			["y", "y2"].forEach(id => {
				const ticks = chart.internal.$el.axis[id].selectAll(".tick text").nodes();
				const {min, max} = args.axis[id];

				expect(+ticks[0].textContent).to.be.equal(min);
				expect(+ticks[ticks.length - 1].textContent).to.be.equal(max);
			});

			checkAxisTickPos();
		});
	});

	describe("Axis interval", () => {
		beforeAll(() => {
			args = {
				data: {
					type: "bar",
					x: 'delay_h',
					columns: [
						["delay_h", 3, 7, 19, 23, 27, 31, 43, 95],
						["%_prev", 0.10119911436525857, 0.12312515071135761, 0.13627814192077514, 0.16357498301071968, 0.21011026590963894, 0.14735734484950785, 0.10892868886599294, 0],
						["%_last", 0.1931098539221481, 0.30997213543865576, 0.31714937093641815, 0.08642235919952715, 0.06869036561682006, 0, 0, 0.005615131301190577]
					]
				}
			};
		});

		it("check the tick interval to be calculated based on the scale & ticks value", () => {
			// tick's inteval shouldn't be based on the assumption of ticks having same interval
			expect(util.ceil(chart.internal.axis.x.tickInterval())).to.be.equal(23);

			// bar widht's value should be set based on the scaled tick interval
			expect(chart.$.bar.bars.node().getBoundingClientRect().width).to.be.closeTo(6, 1);
		});
	});

	describe("Axis type combination", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", 100, 395, 740, 1500, 3000],
						["data1", 210, 1150, 12000, 100000, 1000000],
						["data2", 100, 100, 100, 100, 100]
					],
					axes: {
						data1: "y",
						data2: "y2"
					},
					types: {
						data1: "bar"
					}
				},
				bar: {
					width: {
						ratio: 0.3
					}
				},
				axis: {
					x: {
						type: "indexed"
					},
					y: {
						type: "log",
						min: 10,
						max: 100000000
					},
					y2: {
						show: true,
						type: "indexed",
						min: 0,
						max: 200,
						padding: {
							top: 0,
							bottom: 0
						}
					}
				}
			};
		});

		it("check for different scale types", () => {
			const {scale, $el} = chart.internal;
			const tickValues = {
				x: [100, 395, 740, 1500, 3000],
				y: [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000],
				y2: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
			};

			["x", "y", "y2"].forEach(id => {				
				$el.axis[id].selectAll(".tick").each(function(d, i) {
					const pos = +this.getAttribute("transform").replace(/([a-z()]|,0|0,)/g, "");

					expect(tickValues[id][i]).to.be.equal(d);
					expect(Math.round(scale[id](d))).to.be.closeTo(pos, 1);
				});
			});
		});
	});

	describe("Axis x type localtime", () => {
		beforeAll(() => {
			args = {
				data: {
					x: 'x',
					columns: [
						['x', 1356998400000, 1357084800000, 1357171200000, 1357257600000, 1357344000000, 1357430400000],
						['data1', 30, 200, 100, 400, 150],
						['data2', 130, 340, 200, 500, 250, 350]
					],
					type: "line"
				  },
				  axis: {
					  y: {
						  show: false
					  },
					x: {
						localtime: false,
						type: "timeseries",
						tick: {
							fit: false
						}
					}
				}
			};
		});

		it("check if datetime treated as UTC", () => {
			const res = [];
			const expected = [
				['12 AM', '12 PM', '12 AM', '12 PM', '12 AM', '12 PM', '12 AM', '12 PM', '12 AM', '12 PM', '12 AM'],
				['2013', '12 PM', 'Jan 02', '12 PM', 'Jan 03', '12 PM', 'Jan 04', '12 PM', 'Jan 05', '12 PM', 'Jan 06']
			];
			
			expect(chart.internal.scale.x.type).to.be.equal("utc");

			chart.internal.$el.axis.x.selectAll(".tick text tspan")
				.each(function() {
					res.push(this.innerHTML);
				});

 			expect(res.every((v, i) => v === expected[0][i]) || res.every((v, i) => v === expected[1][i])).to.be.true;
		});
	});

	describe("axis.tooltip", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 120, 220, 250],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "line",
					axes: {
						data1: "y",
						data2: "y2"
					}
				},
				axis: {
					tooltip: true,
					y2: {
						show: true
					}
				}
			};
		});

		it("axis tooltip generated & shows correct scale values?", () => {
			const {internal: {$el}} = chart;
			const expected = {
				x: '3.00',
				y: '373.97',
				y2: '215.64'
			};

			// when
			chart.tooltip.show({x: 3});

			["x", "y", "y2"].forEach(id => {
				expect($el.axisTooltip[id].text()).to.be.equal(expected[id]);
			});
		});

		it("set options: axis.tooltip.backgroundColor", () => {
			args.axis.tooltip = {
				backgroundColor: {
					x: "red",
					y: "blue",
					y2: "green"
				}
			};
		});

		it("should axis.tooltip.backgroundColor applied correctly?", () => {
			const {internal: {$el}} = chart;
			const expected = {
				x: '3.00',
				y: '373.97',
				y2: '215.64'
			};

			// when
			chart.tooltip.show({x: 3});

			const filter = chart.internal.$el.defs.selectAll("filter");

			["x", "y", "y2"].forEach(id => {
				const url = $el.axisTooltip[id].attr("filter").replace(/(^url\(|\)$)/g, "");
				const filter = $el.defs.select(url);
				
				expect(filter.size());
				expect(args.axis.tooltip.backgroundColor[id]).to.be.equal(filter.select("feFlood").attr("flood-color"));
			});
		});
	});

	describe("axis.evalTextSize", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data2", 130, 100, 140, 200, 150]
					]
				},
				axis: {
					x: {
						type: "category",
						categories: [
							"Some label with a very long text which will definitely be wrapped in an odd way", 
							"Some label with a very long text which will definitely be wrapped in an odd way", 
							"Some label with a very long text which will definitely be wrapped in an odd way",
							"Some label with a very long text which will definitely be wrapped in an odd way",
							"Some label with a very long text which will definitely be wrapped in an odd way"
						]
					},
					evalTextSize: sinon.spy(function(text) {
						return {
							w: 5,
							h: 5
						}
					})
				}
			};
		});

		it("check custom evaluator", () => {
			const tick = chart.internal.$el.axis.x.select(".tick").node();
			const {width, height} = tick.getBoundingClientRect();

			expect(width).to.be.closeTo(116, 3);
			expect(height).to.be.closeTo(35, 3);

			expect(args.axis.evalTextSize.called).to.be.true;
			expect(args.axis.evalTextSize.args[0][0].tagName === "text").to.be.true;
		});

		it("set options: axis.evalTextSize=false", () => {
			args.axis.evalTextSize = false;
		});

		it("check dimension evaluation not memoized.", () => new Promise(done => {
			const text = chart.internal.$el.axis.x.select(".tick text");

			// when
			text.style("font-size", "5px");  // change font size
			chart.resize({width: 300});

			setTimeout(() => {
				const tick = chart.internal.$el.axis.x.select(".tick").node();
				const {width, height} = tick.getBoundingClientRect();

				expect(width < 41).to.be.true;
				// expect(height < 60).to.be.true;

				// reset font-size
				text.style("font-size", null);

				done(1);
			}, 300);
		}));
	});
});
