/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import {timeMinute as d3TimeMinute} from "d3-time";
import util from "../assets/util";
import bb from "../../src/core";
import CLASS from "../../src/config/classes";
import AxisRendererHelper from "../../src/axis/AxisRendererHelper";
//import getSizeFor1Char from "exports-loader?getSizeFor1Char!../../src/axis/bb.axis";

describe("AXIS", function() {
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
		after(() => {
			args.axis.x.type = "indexed";
			args.axis.x.tick.count = undefined;
		});

		it("set options axis.x.tick.count=3", () => {
			args.axis.x.type = "category";
			args.axis.x.tick.count = 3;
		});

		it("should have only 3 tick on x axis", () => {
			const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick");

			expect(ticks.size()).to.be.equal(3);
			expect(ticks.data()).to.be.deep.equal([0,3,5]);
		});
	});

	describe("axis.y.tick.count", () => {
		it("set options axis.y.tick.count=1", () => {
			args.axis.y.tick.count = 1;
		});

		it("should have only 1 tick on y axis", () => {
			const ticksSize = chart.$.main.select(`.${CLASS.axisY}`).selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(1);
		});

		it("set options axis.y.tick.count=2", () => {
			args.axis.y.tick.count = 2;
		});

		it("should have 2 ticks on y axis", () => {
			const ticksSize = chart.$.main.select(`.${CLASS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("set options axis.y.tick.count=3", () => {
			args.axis.y.tick.count = 3;
		});

		it("should have 3 ticks on y axis", () => {
			const ticksSize = chart.$.main.select(`.${CLASS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(3);
		});
	});

	describe("axis.y.tick.values", () => {
		const values = [100, 500];

		before(() => {
			args.axis.y.tick.values = values;
		});

		it("should compute char dimension", () => {
			const size = AxisRendererHelper.getSizeFor1Char(d3Select(".tick"));

			expect(size.w && size.h).to.be.ok;
			expect(AxisRendererHelper.getSizeFor1Char()).to.be.equal(size);
		});

		it("should have only 2 tick on y axis", () => {
			const ticksSize = chart.$.main.select(`.${CLASS.axisY}`)
				.selectAll("g.tick").size();

			expect(ticksSize).to.be.equal(2);
		});

		it("should have specified tick texts", () => {
			chart.$.main.select(`.${CLASS.axisY}`).selectAll("g.tick").each(function(d, i) {
				const text = d3Select(this)
					.select("text").text();

				expect(+text).to.be.equal(values[i]);
			});
		});
	});

	describe("tick values less than 0", () => {
		before(() => {
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
				.select(`.${CLASS.axisY}`)
				.selectAll("g.tick").each((v, i) => {
				i > 0 && expect(v > 0).to.be.true;
			});
		});
	});

	describe("tick values less than 0", () => {
		before(() => {
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
		before(() => {
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
	});

	describe("axis label", () => {
		before(() => {
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
				const anchor = chart.$.main.select(`.${CLASS[`axis${v.toUpperCase()}Label`]}`);

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

	describe("axis y timeseries", () => {
		before(() => {
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
			const ticksSize = chart.$.main.select(`.${CLASS.axisY}`)
				.selectAll("g.tick").size();

			// the count starts at initial value and increments by the set interval
			expect(ticksSize).to.be.equal(7);
		});

		it("should have specified 30 second intervals", () => {
			let prevValue;

			chart.$.main.select(`.${CLASS.axisY}`)
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

			chart.$.main.select(`.${CLASS.axisY}`).selectAll("g.tick").each((d, i) => {
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
				chart.$.main.select(`.${CLASS.axisX}`)
					.selectAll("g.tick")
					.each(function(d, i) {
						const tick = d3Select(this).select("text").text();

						expect(+tick).to.be.equal(window.generatedTicks[i]);
					});
			});
		});
	});

	describe("axis.x.tick.width", () => {
		describe("indexed x axis and y/y2 axis", () => {
			describe("not rotated", () => {
				before(() => {
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
					const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisY}`).selectAll("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisY2}`).selectAll("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisY2}`)
						.selectAll("g.tick");

					ticks.each(function() {
						const tspans = d3Select(this).selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});
				});

			});

			describe("rotated", () => {
				before(() => {
					args.axis.rotated = true;
				});

				it("should split x axis tick text to multiple lines", () => {
					const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisY}`).selectAll("g.tick");
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
				before(() => {
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
					const ticks = chart.$.main.select(`.${CLASS.axisX}`)
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
					const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
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
					const ticks = chart.$.main.select(`.${CLASS.axisX}`)
						.selectAll("g.tick");
					const categories = chart.categories();

					ticks.each(function(d, i) {
						expect(d3Select(this).select("title").text()).to.be.equal(categories[i]);
					});

					// check when toggling displaying data series
					expect(() => chart.hide("data1")).to.not.throw();
				});
			});

			describe("rotated", () => {
				before(() => {
					args.axis.rotated = true;
				});

				it("should locate ticks on rotated axis properly", () => {
					const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick");

					ticks.each(function(d, i) {
						const texts = d3Select(this).selectAll("text");
						const tspans = texts.selectAll("tspan");

						const expectedX = "-9";
						const expectedY = "36";

						texts.each(function() {
							const text = d3Select(this);

							expect(text.attr("x")).to.be.equal(expectedX);
							expect(text.attr("y")).to.be.equal(expectedY);
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
					const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
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
					const ticksText = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick text");

					ticksText.each(function() {
						expect(+this.getAttribute("y")).to.be.equal(37);
					});
				});
			});

			describe("option used", () => {
				describe("as null", () => {
					before(() => {
						args.axis.x.tick = {
							multiline: false
						};
					});

					it("should split x tick", () => {
						const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
						const tspans = tick.selectAll("tspan");

						expect(tspans.size()).to.be.equal(1);
					});

				});

				describe("as value", () => {
					before(() => {
						args.axis.x.tick = {
							width: 150
						};
					});

					it("should split x tick to 2 lines properly", () => {
						const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
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

			before(() => {
				args.axis.x.tick.format = () => tickTexts;
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
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

			before(() => {
				args.axis.x.tick.format = () => tickText;
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
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

			before(() => {
				args.axis.x.tick.format = (i, name) => name && name.substr(0, len);
			});

			it("should have multiline tick text", () => {
				const tick = chart.$.main.select(`.${CLASS.axisX}`).select("g.tick");
				const tspans = tick.selectAll("tspan");

				tspans.each(function() {
					expect(this.textContent.length).to.be.equal(len);
				});
			});
		});
	});

	describe("axis.x.tick.rotate", () => {
		describe("not rotated", () => {
			before(() => {
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
				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function() {
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
				const box = internal.main.select(`.${CLASS.axisX}`).node().getBoundingClientRect();
				const height = internal.getHorizontalAxisHeight("x");

				expect(box.height).to.be.above(50);
				expect(height).to.be.above(68);
				expect(height).to.be.below(80);
			});
		});
	});

	describe("axis.x.tick.autorotate", () => {
		const defaultPadding = 10;

		function compare(expectedXAxisTickRotate, expectedXAxisBoundingClientRect, expectedHorizontalXAxisHeight, expectedXAxisTickTextY2Overflow) {
			const internal = chart.internal;
			const xAxisBoundingClientRect = internal.main.select(`.${CLASS.axisX}`).node().getBoundingClientRect();
			const horizontalXAxisHeight = internal.getHorizontalAxisHeight("x");
			const xAxisTickRotate = internal.getAxisTickRotate("x");

			expect(xAxisTickRotate).to.be.equal(expectedXAxisTickRotate);
			expect(xAxisBoundingClientRect.height).to.be.closeTo(expectedXAxisBoundingClientRect, 1);
			expect(horizontalXAxisHeight).to.be.closeTo(expectedHorizontalXAxisHeight, 1);

			const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

			expect(xAxisTickTextY2Overflow).to.be.closeTo(expectedXAxisTickTextY2Overflow, 1);
		}

		function compareOverflow(expectedOverflow) {
			const xAxisTickTextY2Overflow = chart.internal.axis.getXAxisTickTextY2Overflow(defaultPadding);

			expect(xAxisTickTextY2Overflow).to.be.above(0, 5);
			expect(xAxisTickTextY2Overflow).to.be.equal(expectedOverflow);
		}

		describe("`axis.x.type = category`", () => {
			before(() => {
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
								"categoryname6",
								"categoryname7"
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
								centered: false,
								multiline: false
							}
						}
					}
				};
			});

			it("should not rotate tick texts if there is enough space between ticks", () => {
				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function() {
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
				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function() {
						const tick = d3Select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");

						expect(text.attr("transform")).to.be.equal("rotate(15)");
						expect(text.attr("y")).to.be.equal("9");
						expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
					});

				compare(15, 45.525421142578125, 56.82012354874871, 70.72956162437113)
			});

			it("should resize when all data hidden", () => {
				chart.hide("data1");

				compare(0, 6, 30, 0)

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
					"somecategoryname6",
					"somecategoryname7"
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
					compareOverflow(70.72956162437113);
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
					compareOverflow(79.79293033656657);
				});

				it("update config", () => {
					args.axis.x.padding = 2;
				});

				it("should be above defaultPadding if padding is set", () => {
					compareOverflow(defaultPadding);
				});
			});
		});

		describe("`axis.x.type = timeseries`", () => {
			before(() => {
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
						}
					}
				};
			});

			it("should not rotate tick texts if there is enough space between ticks", () => {
				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function() {
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
				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function() {
					const tick = d3Select(this);
					const text = tick.select("text");
					const tspan = text.select("tspan");

					expect(text.attr("transform")).to.be.equal("rotate(15)");
					expect(text.attr("y")).to.be.equal("9");
					expect(tspan.attr("dx")).to.be.equal("2.070552360820166");
				});

				compare(15, 45.145263671875, 56.439983076254386, 108.67536019184263)
			});

			it("should resize when all data hidden", () => {
				chart.hide("Temperature");

				compare(0, 6, 30, 0)
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

				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function(d, i) {
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

				chart.$.main.selectAll(`.${CLASS.axisX} g.tick`).each(function(d, i) {
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
					args.axis.x.padding = 1000*60*60*24*365; // 1 year
				});

				it("should be defaultPadding if padding is set", () => {
					compareOverflow(defaultPadding);
				});
			});
		});
	});

	describe("axis.y.tick.rotate", () => {
		describe("y Axis", () => {
			before(() => {
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

			it("should rotate tick texts", done => {
				setTimeout(() => {
					chart.$.main.selectAll(`.${CLASS.axisY} g.tick`).each(function() {
						const tick = d3Select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");
						const transform = text.attr("transform");

						transform &&
							expect(Math.round(transform.replace(/[A-z()]/g, ""))).to.be.equal(args.axis.y.tick.rotate);

						expect(text.attr("y")).to.be.equal("4");
						expect(parseFloat(tspan.attr("dx"))).to.be.closeTo(5.6, 0.5);
					});

					done();
				}, 1000);
			});

			it("should have automatically calculated y axis width", () => {
				const box = chart.$.main.select(`.${CLASS.axisY}`)
					.node().getBoundingClientRect();

				expect(box.width).to.be.closeTo(590, 1);
			});
		});

		describe("y2 Axis", () => {
			before(() => {
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

			it("should rotate tick texts", done => {
				setTimeout(() => {
					chart.$.main.selectAll(`.${CLASS.axisY2} g.tick`).each(function() {
						const tick = d3Select(this);
						const text = tick.select("text");
						const tspan = text.select("tspan");
						const transform = text.attr("transform");

						transform &&
							expect(Math.round(transform.replace(/[A-z()]/g, ""))).to.be.equal(args.axis.y2.tick.rotate);

						expect(+text.attr("y")).to.be.closeTo(-13, 0.5);
						expect(parseFloat(tspan.attr("dx"))).to.be.closeTo(-5.6, 0.5);
					});

					done();
				}, 1000);
			});

			it("should have automatically calculated y axis width", () => {
				const box = chart.$.main.select(`.${CLASS.axisY2}`)
					.node().getBoundingClientRect();

				expect(box.width).to.be.closeTo(590, 1);
			});

		});
	});

	describe("axis.x.tick.fit", () => {
		describe("axis.x.tick.fit = true", () => {
			before(() => {
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
				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

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
				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(6);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(6);
			});

		});

		describe("axis.x.tick.fit = false", () => {
			before(() => {
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
				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

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
				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(10);
			});

			it("should show fitted ticks after hide and show", () => {
				chart.hide();
				chart.show();

				const ticks = chart.$.main.selectAll(`.${CLASS.axisX} g.tick`);

				expect(ticks.size()).to.be.equal(10);
			});

		});
	});

	describe("axis.y.inner", () => {
		before(() => {
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
			const paddingLeft = chart.internal.getCurrentPaddingLeft();
			const tickTexts = chart.$.main.selectAll(`.${CLASS.axisY} g.tick text`);

			expect(paddingLeft).to.be.above(19);

			tickTexts.each(function() {
				expect(+d3Select(this).attr("x")).to.be.below(0);
			});
		});

		it("set options axis.y.inner=true", () => {
			args.axis.y.inner = true;
		});

		it("should have inner y axis", () => {
			const paddingLeft = chart.internal.getCurrentPaddingLeft();
			const tickTexts = chart.$.main.selectAll(`.${CLASS.axisY} g.tick text`);

			expect(paddingLeft).to.be.equal(1);

			tickTexts.each(function() {
				expect(+d3Select(this).attr("x")).to.be.above(0);
			});
		});

	});

	describe("axis.y2.inner", () => {
		before(() => {
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
			const paddingRight = chart.internal.getCurrentPaddingRight();
			const tickTexts = chart.$.main.selectAll(`.${CLASS.axisY2} g.tick text`);

			expect(paddingRight).to.be.above(19);

			tickTexts.each(function() {
				expect(+d3Select(this).attr("x")).to.be.above(0);
			});
		});

		it("set options axis.y2.inner=true", () => {
			args.axis.y2.inner = true;
		});

		it("should have inner y axis", () => {
			const paddingRight = chart.internal.getCurrentPaddingRight();
			const tickTexts = chart.$.main.selectAll(`.${CLASS.axisY2} g.tick text`);

			expect(paddingRight).to.be.equal(2);

			tickTexts.each(function() {
				expect(+d3Select(this).attr("x")).to.be.below(0);
			});
		});
	});

	describe("axis.x.rotated", () => {
		before(() => {
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
			const barRects = chart.$.main.select(`.${CLASS.eventRects}`).selectAll(`rect.${CLASS.eventRect}`);
			const ticks = chart.$.main.select(`.${CLASS.axisX}`).selectAll("g.tick").nodes();

			barRects.each(function(d, idx){
				const y = d3Select(this).attr("y");
				const tick = d3Select(ticks[idx]);

				expect(tick.attr("transform")).to.be.equal("translate(0,"+y+")");
			});
		});
	});

	describe("axis tick visiblity", () => {
		before(() => {
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
				const axis = chart.$.main.select(`.${CLASS.axis}-${id}`);

				expect(axis.select(".tick").empty()).to.be.true;
			});
		});

		it("set options tick.show=true", () => {
			args.axis.x.tick.show = args.axis.y.tick.show = args.axis.y2.tick.show = true;
		});

		it("axes tick line should be shown", () => {
			["x", "y", "y2"].forEach(id => {
				const axis = chart.$.main.select(`.${CLASS.axis}-${id}`);

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
				const axis = chart.$.main.select(`.${CLASS.axis}-${id}`);

				expect(axis.selectAll(".tick text").empty()).to.be.false;
				expect(axis.selectAll(".tick line").size()).to.be.equal(0);
			});
		});
	});

	describe("axis text on 'binary floating point'", () => {
		before(() => {
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

			chart.$.main.selectAll(`.${CLASS.axisY} tspan`).each(v => {
				expect(rx.test(v.splitted)).to.be.false;
			});
		});
	});

	describe("axis text's position", () => {
		before(() => {
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

				main.selectAll(`.${CLASS[`axis${v.toUpperCase()}`]} tspan`).each(function() {
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

				main.selectAll(`.${CLASS[`axis${v.toUpperCase()}`]} tspan`).each(function() {
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
				.selectAll(`.${CLASS.axisX},.${CLASS.axisY}`).each(function() {
					expect(this.getAttribute("clip-path")).to.be.null;
				});
		});
	});

	describe("when data is zero, unnecessary tick shouldn't be showing", () => {
		before(() => {
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
			const ticks = chart.$.main.selectAll(`.${CLASS.axisY} .tick`);

			expect(ticks.size()).to.be.equal(1);
		});
	});

	describe("Axis show", () => {
		before(() => {
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
			const internal = chart.internal;

			expect(internal.x && internal.y).to.be.ok;

			["x", "y"].forEach(v => {
				expect(main.select(`.bb-axis-${v}`).style("visibility")).to.be.equal("hidden");
			});
		});
	});

	describe("Multi axes", () => {
		before(() => {
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
			const range = chart.internal[id].range();
			const axisRange = chart.internal.axesList[id][0].scale().range();

			return range.every((v, i) => v === axisRange[i]);
		};

		const checkXAxes = rotated => {
			const main = chart.$.main;
			const xAxisY = util.parseNum(main.select(`.${CLASS.axis}-x`).attr("transform"));
			const axis1 = main.select(`.${CLASS.axis}-x-1`);

			expect(util.parseNum(axis1.attr("transform"))).to.be[rotated ? "below" : "above"](xAxisY);

			let tickValue = -0.5;
			axis1.selectAll(".tick text").each(function() {
				expect(+this.textContent).to.be.equal(tickValue += 0.5);
			});

			expect(checkRange("x")).to.be.true;
		};

		const checkYAxes = rotated => {
			const main = chart.$.main;
			const yAxisY = util.parseNum(main.select(`.${CLASS.axis}-y`).attr("transform"));
			let yAxes = chart.internal.axesList.y;
			const toBeMethod = rotated ? "above" : "below";

			yAxes = yAxes.map((v, i) => main.select(`.${CLASS.axis}-y-${i + 1}`));

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

		const checkY2Axes = rotated => {
			const main = chart.$.main;
			const yAxisY = util.parseNum(main.select(`.${CLASS.axis}-y2`).attr("transform"));
			const axis1 = main.select(`.${CLASS.axis}-y2-1`);

			expect(util.parseNum(axis1.attr("transform"))).to.be[rotated ? "below" : "above"](yAxisY);

			const expectedTickValues = args.axis.y2.axes[0].tick.values;

			axis1.selectAll(".tick text").each(function(d, i) {
				expect(+this.textContent).to.be.equal(expectedTickValues[i]);
			});

			expect(checkRange("y2")).to.be.true;
		};

		it("check for axes generation", () => {
			const main = chart.$.main;
			const axesList = chart.internal.axesList;

			["x", "y", "y2"].forEach(id => {
				axesList[id].forEach((v, i) => {
					expect(main.select(`.${CLASS.axis}-${id}-${i + 1}`).empty()).to.be.false;
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
				chart.internal.axesList[id]
					.forEach((v, i) => {
						const axis = main.select(`.${CLASS.axis}-${id}-${i + 1}`);
						const domain = v.scale().domain();

						expect(domain).to.be.deep.equal(args.axis[id].axes[i].domain);
						expect(+axis.select(`.tick text`).text()).to.be.equal(domain[0]);
						expect(+axis.select(`.tick:last-child text`).text()).to.be.equal(domain[1]);
					});
			});
		})
	});

	describe("y Axis size", () => {
		before(() => {
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
			const axisY = chart.$.main.select(`.${CLASS.axisY}`);

			expect(axisY.node().getBoundingClientRect().width).to.be.equal(
				axisY.select(".tick:nth-child(12)").node().getBoundingClientRect().width
			);
		});
	});

	describe("Axes tick culling", () => {
		before(() => {
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

			["subx", "x", "y", "y2"].forEach(v => {
				const data = chart.internal.axes[v]
					.selectAll(".tick text").filter(function() {
						return this.style.display === "block";
					}).data();

				expect(data).to.be.deep.equal(expected[v === "subx" ? "x" : v]);
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
	});
});
