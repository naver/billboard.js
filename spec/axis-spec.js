/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";
import {bb} from "../src/core";

describe("Axis", function() {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		},
		axis: {
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

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("axis.y.tick.count", () => {
		it("should update args to have only 1 tick on y axis", () => {
			args.axis.y.tick.count = 1;
			expect(true).to.be.ok;
		});

		it("should have only 1 tick on y axis", () => {
			const ticksSize = d3.select(".bb-axis-y").selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(1);
		});

		it("should update args to have 2 ticks on y axis", () => {
			args.axis.y.tick.count = 2;
			expect(true).to.be.ok;
		});

		it("should have 2 ticks on y axis", () => {
			const ticksSize = d3.select(".bb-axis-y")
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("should update args to have 3 ticks on y axis", () => {
			args.axis.y.tick.count = 3;
			expect(true).to.be.ok;
		});

		it("should have 3 ticks on y axis", () => {
			const ticksSize = d3.select(".bb-axis-y")
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(3);
		});

	});

	describe("axis.y.tick.values", () => {
		const values = [100, 500];

		it("should update args to have only 2 ticks on y axis", () => {
			args.axis.y.tick.values = values;
			expect(true).to.be.ok;
		});

		it("should have only 2 tick on y axis", () => {
			const ticksSize = d3.select(".bb-axis-y")
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("should have specified tick texts", () => {
			d3.select(".bb-axis-y").selectAll("g.tick").each(function(d, i) {
				const text = d3.select(this)
					.select("text").text();

				expect(+text).to.be.equal(values[i]);
			});
		});
	});

	describe("axis y timeseries", () => {
		it("should update args", () => {
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

			expect(true).to.be.ok;
		});

		it("should have 7 ticks on y axis", () => {
			const ticksSize = d3.select(".bb-axis-y")
				.selectAll("g.tick").size();

			// the count starts at initial value and increments by the set interval
			expect(ticksSize).to.be.equal(7);
		});

		it("should have specified 30 second intervals", () => {
			let prevValue;

			d3.select(".bb-axis-y")
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

		it("should update args to set axis.y.time", () => {
			args.axis.y.tick.time = {
				value : d3.timeMinute.every(60)
			};

			expect(true).to.be.ok;
		});

		it("should have specified 60 second intervals", () => {
			let prevValue;

			d3.select(".bb-axis-y").selectAll("g.tick").each((d, i) => {
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
				window.generatedTicks = tickGenerator();
			});

			it("should use 'function' to generate ticks", () => {
				d3.select(".bb-axis-x")
					.selectAll("g.tick")
					.each(function(d, i) {
						const tick = d3.select(this).select("text").text();

						expect(+tick).to.be.equal(window.generatedTicks[i]);
					});
			});
		});
	});

	describe("axis.x.tick.width", () => {
		describe("indexed x axis and y/y2 axis", () => {
			describe("not rotated", () => {
				it("should update args successfully", () => {
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

					expect(true).to.be.ok;
				});

				it("should construct indexed x axis properly", () => {
					const ticks = chart.internal.main.select(".bb-axis-x").selectAll("g.tick");
					const expectedX = "0";
					const expectedDy = ".71em";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function(d, i) {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(i + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("should set axis.x.tick.format", () => {
					args.axis.x = {
						tick: {
							format: () => "very long tick text on x axis"
						}
					};

					expect(true).to.be.ok;
				});

				it("should split x axis tick text to multiple lines", () => {
					const ticks = chart.internal.main.select(".bb-axis-x").selectAll("g.tick");
					const expectedTexts = ["very long tick text", "on x axis"];
					const expectedX = "0";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function() {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(2);

						tspans.each(function(d, i) {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(expectedTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							if (i === 0) {
								expect(tspan.attr("dy")).to.be.equal(".71em");
							} else {
								expect(tspan.attr("dy")).to.be.above(8);
							}
						});
					});
				});

				it("should construct y axis properly", () => {
					const ticks = chart.internal.main.select(".bb-axis-y").selectAll("g.tick");
					const expectedX = "-9";
					const expectedDy = "3";

					expect(ticks.size()).to.be.equal(9);

					ticks.each(function(d) {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(d + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("should construct y2 axis properly", () => {
					const ticks = chart.internal.main.select(".bb-axis-y2").selectAll("g.tick");
					const expectedX = "9";
					const expectedDy = "3";

					expect(ticks.size()).to.be.equal(9);

					ticks.each(function(d) {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(d + "");
							expect(tspan.attr("x")).to.be.equal(expectedX);
							expect(tspan.attr("dy")).to.be.equal(expectedDy);
						});
					});
				});

				it("should set big values in y", () => {
					args.data.columns = [
						["data1", 3000000000000000, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					];

					expect(true).to.be.ok;
				});

				it("should not split y axis tick text to multiple lines", () => {
					const ticks = chart.internal.main.select(".bb-axis-y2")
						.selectAll("g.tick");

					ticks.each(function() {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});
				});

			});

			describe("rotated", () => {
				it("should update args to rotate axis", () => {
					args.axis.rotated = true;
					expect(true).to.be.ok;
				});

				it("should split x axis tick text to multiple lines", () => {
					const ticks = chart.internal.main.select(".bb-axis-x").selectAll("g.tick");
					const expectedTexts = ["very long tick", "text on x axis"];
					const expectedX = "-9";

					expect(ticks.size()).to.be.equal(6);

					ticks.each(function() {
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(2);

						tspans.each(function(d, i) {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(expectedTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							if (i === 0) {
								expect(tspan.attr("dy")).to.be.below(0);
							} else {
								expect(tspan.attr("dy")).to.be.above(9);
							}
						});
					});
				});

				it("should not split y axis tick text to multiple lines", () => {
					const ticks = chart.internal.main.select(".bb-axis-y").selectAll("g.tick");
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
						const tspans = d3.select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);

						tspans.each(function() {
							const tspan = d3.select(this);

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
				it("should update args successfully", () => {
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
								type: "category"
							}
						}
					};

					expect(true).to.be.ok;
				});

				it("should locate ticks properly", () => {
					const ticks = chart.internal.main.select(".bb-axis-x")
						.selectAll("g.tick");

					ticks.each(function(d, i) {
						const tspans = d3.select(this).selectAll("tspan");
						const expectedX = "0";
						const expectedDy = ".71em";

						if (i > 0) { // i === 0 should be checked in next test
							expect(tspans.size()).to.be.equal(1);

							tspans.each(function() {
								const tspan = d3.select(this);

								expect(tspan.attr("x")).to.be.equal(expectedX);
								expect(tspan.attr("dy")).to.be.equal(expectedDy);
							});
						}
					});
				});

				it("should split tick text properly", () => {
					const tick = chart.internal.main.select(".bb-axis-x").select("g.tick");
					const tspans = tick.selectAll("tspan");
					const expectedTickTexts = [
							"this is a very",
							"long tick text",
							"on category axis"
						];
					const expectedX = "0";

					expect(tspans.size()).to.be.equal(expectedTickTexts.length);

					tspans.each(function(d, i) {
						const tspan = d3.select(this);

						expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
						expect(tspan.attr("x")).to.be.equal(expectedX);

						// unable to define pricise number because it differs depends on environment..
						if (i === 0) {
							expect(tspan.attr("dy")).to.be.equal(".71em");
						} else {
							expect(tspan.attr("dy")).to.be.above(8);
						}
					});
				});
			});

			describe("rotated", () => {
				it("should update args to rotate axis", () => {
					args.axis.rotated = true;
					expect(true).to.be.ok;
				});

				it("should locate ticks on rotated axis properly", () => {
					const ticks = chart.internal.main.select(".bb-axis-x").selectAll("g.tick");

					ticks.each(function(d, i) {
						const tspans = d3.select(this).selectAll("tspan");
						const expectedX = "-9";
						const expectedDy = "3";

						if (i > 0) { // i === 0 should be checked in next test
							expect(tspans.size()).to.be.equal(1);

							tspans.each(function() {
								const tspan = d3.select(this);

								expect(tspan.attr("x")).to.be.equal(expectedX);
								expect(tspan.attr("dy")).to.be.equal(expectedDy);
							});
						}
					});
				});

				it("should split tick text on rotated axis properly", () => {
					const tick = chart.internal.main.select(".bb-axis-x").select("g.tick");
					const tspans = tick.selectAll("tspan");
					const expectedTickTexts = [
							"this is a very",
							"long tick text on",
							"category axis"
						];
					const expectedX = "-9";

					expect(tspans.size()).to.be.equal(3);

					tspans.each(function(d, i) {
						const tspan = d3.select(this);

						expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
						expect(tspan.attr("x")).to.be.equal(expectedX);

						// unable to define pricise number because it differs depends on environment..
						if (i === 0) {
							expect(tspan.attr("dy")).to.be.below(0);
						} else {
							expect(tspan.attr("dy")).to.be.above(8);
						}
					});
				});

			});

			describe("option used", () => {
				describe("as null", () => {
					it("should update args not to split ticks", () => {
						args.axis.x.tick = {
							multiline: false
						};

						expect(true).to.be.ok;
					});

					it("should split x tick", () => {
						const tick = chart.internal.main.select(".bb-axis-x").select("g.tick");
						const tspans = tick.selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});

				});

				describe("as value", () => {
					it("should update args not to split ticks", () => {
						args.axis.x.tick = {
							width: 150
						};

						expect(true).to.be.ok;
					});

					it("should split x tick to 2 lines properly", () => {
						const tick = chart.internal.main.select(".bb-axis-x").select("g.tick");
						const tspans = tick.selectAll("tspan");
						const expectedTickTexts = [
								"this is a very long tick",
								"text on category axis"
							];
						const expectedX = "-9";

						expect(tspans.size()).to.be.equal(2);

						tspans.each(function(d, i) {
							const tspan = d3.select(this);

							expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
							expect(tspan.attr("x")).to.be.equal(expectedX);

							// unable to define pricise number because it differs depends on environment..
							if (i === 0) {
								expect(tspan.attr("dy")).to.be.below(0);
							} else {
								expect(tspan.attr("dy")).to.be.above(8);
							}
						});
					});
				});
			});
		});

		describe("with axis.x.tick.format", () => {
			it("should update args to use axis.x.tick.format", () => {
				args.axis.x.tick.format = () => {
					return ["this is a very long tick text", "on category axis"];
				};

				expect(true).to.be.ok;
			});

			it("should have multiline tick text", () => {
				const tick = chart.internal.main.select(".bb-axis-x").select("g.tick");
				const tspans = tick.selectAll("tspan");
				const expectedTickTexts = ["this is a very long tick text", "on category axis"];

				expect(tspans.size()).to.be.equal(2);

				tspans.each(function(d, i) {
					const tspan = d3.select(this);

					expect(tspan.text()).to.be.equal(expectedTickTexts[i]);
				});
			});

		});
	});

	describe("axis.x.tick.rotate", () => {
		describe("not rotated", () => {
			it("should update args successfully", () => {
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

				expect(true).to.be.ok;
			});

			it("should rotate tick texts", () => {
				chart.internal.main.selectAll(".bb-axis-x g.tick").each(function() {
					const tick = d3.select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(60)");
					expect(text.attr("y")).to.be.equal("1.5");
					expect(tspan.attr("dx")).to.be.equal("6.928203230275509");
				});
			});

			it("should have automatically calculated x axis height", () => {
				const box = chart.internal.main.select(".bb-axis-x").node().getBoundingClientRect();
				const height = chart.internal.getHorizontalAxisHeight("x");

				expect(box.height).to.be.above(50);
				expect(height).to.be.above(68);
				expect(height).to.be.below(80);
			});
		});
	});

	describe("axis.y.tick.rotate", () => {
		describe("not rotated", () => {
			it("should update args successfully", () => {
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

				expect(true).to.be.ok;
			});

			it("should rotate tick texts", done => {
				setTimeout(() => {
					chart.internal.main.selectAll(".bb-axis-y g.tick").each(function() {
						const tick = d3.select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");

						expect(Math.round(text.attr("transform").replace(/\D/g, ""))).to.be.equal(45);
						expect(text.attr("y")).to.be.equal("4");
						expect(parseFloat(tspan.attr("dx"))).to.be.closeTo(5.6, 0.5);
					});

					done();
				}, 1000);
			});

			it("should have automatically calculated y axis width", () => {
				const box = chart.internal.main.select(".bb-axis-y")
					.node().getBoundingClientRect();

				expect(box.width).to.be.closeTo(590, 1);
			});

		});
	});

	describe("axis.x.tick.fit", () => {
		describe("axis.x.tick.fit = true", () => {
			it("should set args for indexed data", () => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, 150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", 150, 120, 110, 140, 115, 125]
						]
					}
				};

				expect(true).to.be.ok;
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(6);
			});

			it("should set args for x-based data", () => {
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

				expect(true).to.be.ok;
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(6);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(6);
			});

		});

		describe("axis.x.tick.fit = false", () => {
			it("should set args for indexed data", () => {
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

				expect(true).to.be.ok;
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(11);
			});

			it("should set args for x-based data", () => {
				args.data = {
					x: "x",
					columns: [
						["x", 10, 20, 100, 110, 200, 1000],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				};

				expect(true).to.be.ok;
			});

			it("should show fitted ticks on indexed data", () => {
				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(10);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.internal.main.selectAll(".bb-axis-x g.tick");

				expect(ticks.size()).to.be.equal(10);
			});

		});
	});

	describe("axis.y.inner", () => {
		it("should update args", () => {
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

			expect(true).to.be.ok;
		});

		it("should not have inner y axis", () => {
			const paddingLeft = chart.internal.getCurrentPaddingLeft();
			const tickTexts = chart.internal.main.selectAll(".bb-axis-y g.tick text");

			expect(paddingLeft).to.be.above(19);

			tickTexts.each(function() {
				expect(+d3.select(this).attr("x")).to.be.below(0);
			});
		});

		it("should update args to have inner y axis", () => {
			args.axis.y.inner = true;
			expect(true).to.be.ok;
		});

		it("should have inner y axis", () => {
			const paddingLeft = chart.internal.getCurrentPaddingLeft();
			const tickTexts = chart.internal.main.selectAll(".bb-axis-y g.tick text");

			expect(paddingLeft).to.be.equal(1);

			tickTexts.each(function() {
				expect(+d3.select(this).attr("x")).to.be.above(0);
			});
		});

	});

	describe("axis.y2.inner", () => {
		it("should update args", () => {
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

			expect(true).to.be.ok;
		});

		it("should not have inner y axis", () => {
			const paddingRight = chart.internal.getCurrentPaddingRight();
			const tickTexts = chart.internal.main.selectAll(".bb-axis-2y g.tick text");

			expect(paddingRight).to.be.above(19);

			tickTexts.each(function() {
				expect(+d3.select(this).attr("x")).to.be.above(0);
			});
		});

		it("should update args to have inner y axis", () => {
			args.axis.y2.inner = true;

			expect(true).to.be.ok;
		});

		it("should have inner y axis", () => {
			const paddingRight = chart.internal.getCurrentPaddingRight();
			const tickTexts = chart.internal.main.selectAll(".bb-axis-2y g.tick text");

			expect(paddingRight).to.be.equal(2);

			tickTexts.each(function() {
				expect(+d3.select(this).attr("x")).to.be.below(0);
			});
		});
	});
});
