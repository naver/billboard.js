/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import util from "../assets/util";
import {$AXIS, $SHAPE, $TEXT} from "../../src/config/classes";
import {isNumber} from "../../src/module/util";

describe("TEXT", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

    const checkXY = function(x, y, prefix = "c", delta: any = {x: 1, y: 1}) {
		if (isNumber(delta)) {
			delta = {x: delta, y: delta};
		}

		return function(d, i) {			
			const node = d3Select(this);

			expect(+node.attr(`${prefix}x`)).to.be.closeTo(x[i], delta.x);
			expect(+node.attr(`${prefix}y`)).to.be.closeTo(y[i], delta.y);
		};
	};

    describe("data.labels", () => {
		describe("on line chart", () => {
			before(() => {
				args = {
					padding: {
						left: 50
					},
					data: {
						columns: [
							["data1", 1030, 2200, 2100],
							["data2", 1150, 2010, 1200],
							["data3", -1150, -2010, -1200],
							["data4", -1030, -2200, -2100]
						],
						type: "line",
						labels: true
					}
				};
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [128, 39, 48],
					data2: [119, 55, 115],
					data3: [314, 379, 318],
					data4: [305, 394, 386]
				};

				const expectedTextX = {
					data1: [6, 294, 583],
					data2: [6, 294, 583],
					data3: [6, 294, 583],
					data4: [6, 294, 583]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 3));
				});
			});

			it("set options data.groups to be stacked", () => {
				args.data.groups = [
					["data1", "data2"],
					["data3", "data4"]
				];
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [120, 40, 75],
					data2: [161, 127, 159],
					data3: [272.5, 307, 274.5],
					data4: [313, 394, 358]
				};
				const expectedTextX = {
					data1: [6, 296, 583],
					data2: [6, 296, 583],
					data3: [6, 296, 583],
					data4: [6, 296, 583]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 3));
				});
			});

			it("set options data.labels.position", () => {
				args.data.labels = {
					position: {
						x: 20,
						y: -20
					}
				};
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [120, 40, 75],
					data2: [161, 127, 159],
					data3: [272.5, 307, 274.5],
					data4: [313, 394, 358]
				};
				const expectedTextX = {
					data1: [6, 296, 583],
					data2: [6, 296, 583],
					data3: [6, 296, 583],
					data4: [6, 296, 583]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`).each(function(d, i) {
						const text = d3Select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i] - 20, 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i] + 20, 3);
					});
				});
			});

			it("set options data.labels.colors", () => {
				args.data.labels = {
					colors: "red"
				};
			});

			it("check for all data label texts colors to have same color", () => {
				chart.$.text.texts.each(function() {
					expect(this.style.fill).to.be.equal(args.data.labels.colors);
				});
			});

			it("set options data.labels.colors", () => {
				args.data.labels = {
					colors: {
						data1: "red",
						data2: "green",
						data3: "yellow",
						data4: "cyan"
					}
				};
			});

			it("check for all data label texts colors to have different color", () => {
				chart.$.text.texts.each(function(d) {
					expect(this.style.fill).to.be.equal(args.data.labels.colors[d.id]);
				});
			});

			it("text property shouldn't be empty", () => {
				const texts = chart.$.text.texts;

				expect(texts.empty()).to.be.false;
				expect(texts.size() > 0).to.be.true;
			});

			it("set option data.labels=false", () => {
				args.data.labels = false;
			});

			it("shouldn't be thrown error", () => {
				// reaching this test, means test was passed.
				expect(true).to.be.true;
			});
		});

		describe("on area chart", () => {
			before(() => {
				args = {
					padding: {
						left: 50
					},
					data: {
						columns: [
							["data1", 1030, 2200, 2100],
							["data2", 1150, 2010, 1200],
							["data3", -1150, -2010, -1200],
							["data4", -1030, -2200, -2100],
						],
						type: "area",
						labels: true
					}
				};
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [129, 40, 48],
					data2: [120, 55, 116],
					data3: [314, 379, 318],
					data4: [305, 394, 386],
				};
				const expectedTextX = {
					data1: [6, 294, 583],
					data2: [6, 294, 583],
					data3: [6, 294, 583],
					data4: [6, 294, 583]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 3));
				});
			});

			it("set options data.groups to be stacked", () => {
				args.data.groups = [
					["data1", "data2"],
					["data3", "data4"]
				];
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [121, 40, 76],
					data2: [161, 127, 159],
					data3: [272.5, 306.5, 274.5],
					data4: [313, 394, 358]
				};
				const expectedTextX = {
					data1: [6, 294, 583],
					data2: [6, 294, 583],
					data3: [6, 294, 583],
					data4: [6, 294, 583]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 4));
				});
			});
		});

		describe("on bar chart", () => {
			before(() => {
				args = {
					padding: {
						left: 50
					},
					data: {
						columns: [
							["data1", 1030, 2200, 2100],
							["data2", 1150, 2010, 1200],
							["data3", -1150, -2010, -1200],
							["data4", -1030, -2200, -2100],
						],
						type: "bar",
						labels: true
					}
				};
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [132, 43, 51],
					data2: [123, 58, 119],
					data3: [311, 376, 315],
					data4: [302, 391, 383]
				};
				const expectedTextX = {
					data1: [53, 249, 445],
					data2: [83, 279, 475],
					data3: [112, 308, 504],
					data4: [142, 338, 534],
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 3));
				});
			});

			it("set options data.groups to be stacked", () => {
				args.data.groups = [
					["data1", "data2"],
					["data3", "data4"]
				];
			});

			it("should locate data labels in correct position", () => {
				const expectedTextY = {
					data1: [124, 43, 79],
					data2: [164, 130, 162],
					data3: [269.5, 304, 271.5],
					data4: [310, 391, 355],
				};
				const expectedTextX = {
					data1: [68.6, 264, 460],
					data2: [68.6, 264, 460],
					data3: [127, 323, 519],
					data4: [127, 323, 519]
				};

				Object.keys(expectedTextY).forEach(key => {
					chart.$.main.selectAll(`.${$TEXT.texts}-${key} text.${$TEXT.text}`)
						.each(checkXY(expectedTextX[key], expectedTextY[key], "", 4));
				});
			});

			it("set options data.labels.centered=true", () => {
				args.data.labels = {
					centered: true,
					colors: "white"
				};
			});

			it("check for data label text position", () => {
				const index = 1;
				let j = 0;
				const bars = chart.$.bar.bars.filter(d => d.index === index);
				const texts = chart.$.text.texts.filter(d => d.index === index).nodes();

				bars.each(function(d) {
					const barRect = this.getBoundingClientRect();
					const textRect = texts[j++].getBoundingClientRect();

					expect(
						(barRect.height / 2) - (textRect.y + (textRect.height / 2) - barRect.y)
					).to.be.closeTo(3, 3);
				});
			});

			it("set options axis.rotated=true", () => {
				args.axis = {
					rotated: true
				}
			});

			it("check for data label text position when is rotated", () => {
				const index = 1;
				let j = 0;
				const bars = chart.$.bar.bars.filter(d => d.index === index);
				const texts = chart.$.text.texts.filter(d => d.index === index).nodes();

				bars.each(function(d) {
					const barRect = this.getBoundingClientRect();
					const textRect = texts[j++].getBoundingClientRect();

					expect(
						(barRect.width / 2) - (textRect.x - barRect.x)
					).to.be.closeTo(textRect.width / 2, 3);
				});
			});
		});

		describe("for all targets", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 100, 200, 100, 400, 150, 250],
							["data2", 10, 20, 10, 40, 15, 25],
							["data3", 1000, 2000, 1000, 4000, 1500, 2500]
						],
						labels: true
					}
				};
			});

			it("should have data labels on all data", () => {
				const main = chart.$.main;

				main.selectAll(`.${$TEXT.texts}-data1 text`).each(function(d, i) {
					expect(d3Select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
				});

				main.selectAll(`.${$TEXT.texts}-data2 text`).each(function(d, i) {
					expect(d3Select(this).text()).to.equal(`${args.data.columns[1][i + 1]}`);
				});

				main.selectAll(`.${$TEXT.texts}-data3 text`).each(function(d, i) {
					expect(d3Select(this).text()).to.equal(`${args.data.columns[2][i + 1]}`);
				});
			});
		});

		describe("for each target", () => {
			describe("as true", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data1", 100, 200, 100, 400, 150, 250],
								["data2", 10, 20, 10, 40, 15, 25],
								["data3", 1000, 2000, 1000, 4000, 1500, 2500]
							],
							labels: {
								format: {
									data1: true
								}
							}
						}
					};
				});

				it("should have data labels on all data", () => {
					const main = chart.$.main;

					main.selectAll(`.${$TEXT.texts}-data1 text`).each(function(d, i) {
						expect(d3Select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(`.${$TEXT.texts}-data2 text`).each(function() {
						expect(d3Select(this).text()).to.be.equal("");
					});

					main.selectAll(`.${$TEXT.texts}-data3 text`).each(function() {
						expect(d3Select(this).text()).to.be.equal("");
					});
				});
			});

			describe("as function", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data1", 100, 200, 100, 400, 150, 250],
								["data2", 10, 20, 10, 40, 15, 25],
								["data3", 1000, 2000, 1000, 4000, 1500, 2500]
							],
							labels: {
								format: {
									data1: d3Format("$")
								}
							}
						}
					};
				});

				it("should have data labels on all data", () => {
					const main = chart.$.main;

					main.selectAll(`.${$TEXT.texts}-data1 text`).each(function(d, i) {
						expect(d3Select(this).text()).to.equal(`$${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(`.${$TEXT.texts}-data2 text`).each(function() {
						expect(d3Select(this).text()).to.equal("");
					});

					main.selectAll(`.${$TEXT.texts}-data3 text`).each(function() {
						expect(d3Select(this).text()).to.equal("");
					});
				});
			});
		});

		describe("with small values", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 0.03, 0.2, 0.1, 0.4, 0.15, 0.250]
						],
						labels: true
					}
				};
			});

			it("should have proper y domain", () => {
				const domain = chart.internal.scale.y.domain();

				expect(domain[0]).to.be.closeTo(-0.02, 0.005);
				expect(domain[1]).to.be.closeTo(0.45, 0.005);
			});
		});

		describe("with positive values and null", () => {
			describe("on not rotated axis", () => {
				before(() => {
					args = {
						padding: {
							left: 40
						},
						data: {
							columns: [
								["data1", 190, 200, 190, null],
							],
							type: "bar",
							labels: {
								format: v => (v === null ? "Not Applicable" : d3Format("$")(v))
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(227, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [68, 50, 68, 423];
					const expectedXs = [75, 225, 374, 524];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(189, 1);
					expect(domain[1]).to.be.closeTo(201, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [375, 40, 375, 422];
					const expectedXs = [6, 202, 397, 593];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});
			});

			describe("on rotated axis", () => {
				before(() => {
					args.padding.bottom = 50;
					args.padding.top = 5;
					args.data.type = "bar";
					args.axis = {
						rotated: true
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(231.5, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [51, 145, 235, 327];
					const expectedXs = [488.5, 514, 488.5, 4];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 4));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(188, 1);
					expect(domain[1]).to.be.closeTo(202, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 130, 249, 370];
					const expectedXs = [76, 526, 76, 4];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 4));
				});
			});
		});

		describe("with negative values and null", () => {
			describe("on not rotated axis", () => {
				before(() => {
					args = {
						padding: {
							left: 50
						},
						data: {
							columns: [
								["data1", -190, 0, -190, null]
							],
							type: "bar",
							labels: {
								format: v => (v === null ?
									"Not Applicable" : d3Format("$")(v)
								)
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(0, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [385, 11, 385, 12];
					const expectedXs = [74, 221, 368, 515];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 5));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(25, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [394, 60, 394, 39];
					const expectedXs = [6, 198, 391, 583];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 4));
				});
			});

			describe("on rotated axis", () => {
				before(() => {
					args.padding.left = 50;
					args.padding.bottom = 0;

					args.data.type = "bar";
					args.axis = {
						rotated: true
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2);
					expect(domain[1]).to.be.closeTo(0, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 162, 269, 375];
					const expectedXs = [80, 584, 80, 514];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 10, y: 5}));
				});

				it("set options data.type='line' and padding", () => {
					args.data.type = "line";
					args.padding.left = 50;
					args.padding.bottom = 0;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2); // -220.4755083436658 vs -223.64837940981494
					expect(domain[1]).to.be.closeTo(24, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [69, 527, 69, 527]; // 72.50132230092231

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 4, y: 2}));
				});
			});
		});

		describe("with positive and negative values and null", () => {
			describe("on non rotated axis", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data1", -190, 200, 190, null],
							],
							type: "bar",
							labels: {
								format: v => (v === null ?
									"Not Applicable" : d3Format("$")(v)
								)
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [392, 43, 52, 215];
					const expectedXs = [74, 221, 368, 515];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 10, y: 3}));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [395, 40, 49, 211];
					const expectedXs = [6, 198, 391, 583];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 10, y: 3}));
				});
			});

			describe("on rotated axis", () => {
				before(() => {
					args.data.type = "bar";
					args.axis = {
						rotated: true
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-256, 4);
					expect(domain[1]).to.be.closeTo(261, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [72, 525, 513, 295];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 4, y: 2}));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-255, 5);
					expect(domain[1]).to.be.closeTo(262, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [70, 527, 515, 297];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 4, y: 2}));
				});
			});
		});

		describe("with positive grouped values", () => {
			describe("on non rotated axis", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data1", 30, 200, 100, 500],
								["data2", 50, 20, 10, 40],
								["data3", 250, 220, 210, 240]
							],
							groups: [["data1", "data2", "data3"]],
							labels: true,
							type: "bar"
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(0, 3);
					expect(domain[1]).to.be.closeTo(886, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [385, 317, 370, 164];
					const expectedXs = [74, 225, 374, 524];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-95, 3);
					expect(domain[1]).to.be.closeTo(885, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [344, 284, 331, 144];
					const expectedXs = [6, 202, 397, 593];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});
			});

			describe("on rotated axis", () => {
				before(() => {
					args.data.type = "bar";
					args.axis = {
						rotated: true
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(890, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [57, 150, 77, 362];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-87, 4);
					expect(domain[1]).to.be.closeTo(889, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [107, 192, 125, 386];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});
			});
		});

		describe("with negative grouped values", () => {
			describe("on non rotated axis", () => {
				before(() => {
					args = {
						data: {
							columns: [
								["data1", -30, -200, -100, -500],
								["data2", -50, -20, -10, -40],
								["data3", -250, -220, -210, -240]
							],
							groups: [["data1", "data2", "data3"]],
							labels: true,
							type: "bar"
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-886, 6);
					expect(domain[1]).to.be.closeTo(0, 6);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [50, 117, 64, 270];
					const expectedXs = [74, 221, 368, 515];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 10));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-885, 3);
					expect(domain[1]).to.be.closeTo(95, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [90, 151, 103, 290];
					const expectedXs = [6, 198, 391, 583];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 10));
				});
			});

			describe("on rotated axis", () => {
				before(() => {
					args.data.type = "bar";
					args.axis = {
						rotated: true
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 6);
					expect(domain[1]).to.be.closeTo(0, 5);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [533, 441, 513, 232];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 3));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.scale.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 7);
					expect(domain[1]).to.be.closeTo(97, 7);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [479, 397, 461, 206];

					chart.$.main.selectAll(`.${$TEXT.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 5));
				});
			});
		});

		describe("on scatter type", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 500]
						],
						labels: true,
						type: "scatter"
					}
				}
			});

			it("data text label should be generated", () => {
				const data = chart.data.values("data1");
				const texts = chart.$.main.selectAll(`.${$TEXT.chartText} text.${$TEXT.text}`);

				expect(texts.size()).to.be.equal(data.length);
			});

			it("should be zerobased", () => {
				args.scatter = {zerobased: true};
				chart = util.generate(args);

				const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
				const translateValues = [426, 389, 352, 314, 277, 240, 202, 165, 127, 90, 53, 15];

				tickNodes.each(function(d, i) {
					expect(util.parseNum(this.getAttribute("transform"))).to.be.closeTo(translateValues[i], 1);
				});
			});

			it("should not be zerobased", () => {
				args.scatter = {zerobased: false};
				chart = util.generate(args);

				const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
				const translateValues = [402, 367, 331, 296, 260, 225, 189, 154, 118, 83, 47, 12];

				tickNodes.each(function(d, i) {
					expect(util.parseNum(this.getAttribute("transform"))).to.be.closeTo(translateValues[i], 1);
				});
			});
		});

		describe("on scatter + line type", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 500],
							["data2", 10, 100, 200, 400]
						],
						types: {
							data1: "scatter",
							data2: "line"
						}
					},
					line: {
						point: false
					}
				}
			});

			it("should draw points for the scatterplot", () => {
				const id = "data1";
				const data = chart.data.values(id);
				const points = chart.$.main.selectAll(`.${$SHAPE.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(data.length);
			});

			it("should not draw points for the linechart", () => {
				const id = "data2";
				const points = chart.$.main.selectAll(`.${$SHAPE.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(0);
			});
		});

		describe("on line with array points option", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 500],
							["data2", 10, 100, 200, 400]
						]
					},
					line: {
						point: ["data1"]
					}
				}
			});

			it("should draw points for the first line", () => {
				const id = "data1";
				const data = chart.data.values(id);
				const points = chart.$.main.selectAll(`.${$SHAPE.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(data.length);
			});

			it("should not draw points for the second line", () => {
				const id = "data2";
				const points = chart.$.main.selectAll(`.${$SHAPE.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(0);
			});
		});

		describe("text transition", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100],
							["data2", 130, 100, 140]
						],
						labels: true
					}
				};
			});

			it("newly added text shouldn't be transitioning from the top/left", done => {
				const main = chart.$.main;
				const pos = [];
				let text;
				let interval;

				setTimeout(() => {
					interval = setInterval(() => {
						text = main.select(`.${$TEXT.texts}-data2 .${$TEXT.text}-3`);
						pos.push(+text.attr("x"));
					}, 20);

					chart.load({
						columns: [
							["data2", 44, 134, 98, 170]
						],
						done: function () {
							setTimeout(() => {
								clearInterval(interval);
								const currPos = +text.attr("x");

								expect(Math.round(pos[0])).to.not.equal(0);
								expect(pos.every(v => v === currPos)).to.be.true;

								done();
							}, 500);
						}
					});
				}, 500);
			});
		});

		describe("when all data values are 0", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 0, 0, 0, 0],
						],
						labels: true
					},
					axis: {
						y: {
							min: 0
						}
					}
				};
			});

			it("label text should locate above the data points", () => {
				const texts = chart.$.text.texts.nodes();

				chart.$.circles.each(function(d, i) {
					expect(+this.getAttribute("cy")).to.be.above(+texts[i].getAttribute("y"));
				});
			});

			it("set options axis.rotated=true", () => {
				args.axis.rotated = true;
			});

			it("label text should locate above the data points", () => {
				const texts = chart.$.text.texts.nodes();

				chart.$.circles.each(function(d, i) {
					expect(+this.getAttribute("cx")).to.be.below(+texts[i].getAttribute("x"));
				});
			});
		});

		describe("Labels' postion", () => {
			const pos = {};

			before(() => {
				args = {
					data: {
						columns: [
							["data1", 150, 240, 400, 300, 200],
							["data2", 80, 120, 300, 240, 115]
						],
						type: "area",
						labels: {
							show: true
						}
					},
					axis: {
						x: {
							padding: {
								left: 0.5,
								right: 0.5
							}
						}
					}
				};
			});

			it("Collect default label position", () => {
				chart.$.text.texts.each(function(d) {
					if (!(d.id in pos)) {
						pos[d.id] = [];
					}

					pos[d.id].push([+this.getAttribute("x"), +this.getAttribute("y")]);
				});
			});

			it("Set options data.labels.position", () => {
				args.data.labels.position = {
					data1: {x: 3, y: -10},
					data2: {x: 3, y: 30}
				};
			});

			it("Check position relative its original value", () => {
				const confPos = args.data.labels.position;

				chart.$.text.texts.each(function(d, i) {
					const currPos = [+this.getAttribute("x"), +this.getAttribute("y")];
					const expectedPos = pos[d.id][i];

					expect(currPos).to.be.deep.equal([
						expectedPos[0] + confPos[d.id].x,
						expectedPos[1] + confPos[d.id].y
					]);
				});
			});
		});

		describe("labels.colors callback", () => {
			let ctx = [];

			before(() => {
				args = {
					data: {
						columns: [
							["data1", 100, 150, 300],
							["data2", 130, 210, 140],
							["data3", 220, 150, 50]
						],
						labels: {
							colors: function(color, d) {
								ctx.push(this);
								return d.value > 200 ? "cyan" : color;
							}
						}
					}
				}
			});

			it("callback called correctly?", () => {
				chart.$.text.texts.each(function(d) {
					if (d.value > 200) {
						expect(this.style.fill).to.be.equal("cyan");
					}
				});

				// check the data.labels.colors callback context
				expect(ctx.every(v => v === chart)).to.be.true;
			});
		});

		describe("labels.backgroundColors", () => {
			let ctx = [];

			before(() => {
				args = {
					data: {
						columns: [
							["data 1 2 3", 30, 200, 100],
							["data2", 430, 300, 500]
						],
						labels: {
							backgroundColors: "red"
						},
						type: "line"
					}
				}
			});

			const checkFilter = () => {
				const {$el} = chart.internal;
				const filter = $el.defs.select("filter[id*='labels-bg']");
				const filterId = filter.attr("id");

				expect(
					filter.select("feFlood").attr("flood-color")
				).to.be.equal(args.data.labels.backgroundColors);

				$el.text.each(function(d) {
					expect(this.getAttribute("filter").indexOf(filterId) > -1).to.be.ok;
				});
			};

			it("should set filter definition and text nodes for line type", () => {
				checkFilter();
			});

			it("set options data.type='pie'", () => {
				args.data.type = "pie";
			});

			it("should set filter definition and text nodes for pie type", () => {
				checkFilter();
			});

			it("set options data.type='pie'", () => {
				args.data.type = "line";
				args.data.labels.backgroundColors = {
					"data 1": "red"
				};
			});

			it("should set filter definition and text nodes for line type", () => {
				const {$el} = chart.internal;
				const filter = $el.defs.select("filter[id*='labels-bg-data-1']");
				const filterId = filter.attr("id");

				expect(filter.size()).to.be.equal(1);

				$el.text.each(function(d) {
					if (d.id === "data-1") {
						expect(this.getAttribute("filter").indexOf(filterId) > -1).to.be.ok;
					} else {
						expect(this.getAttribute("filter")).to.be.null;
					}
				});
			});
		});

		describe("text positon with xs option", () => {
			before(() => {
				args = {
					data: {
						xs: { data1: "x", data2: "x2" },
						columns: [
							["x", "2021-02-20", "2021-02-22"],
							["x2", "2021-02-24", "2021-02-27"],
							[
								"data1",
								{ open: 1300, high: 1369, low: 1200, close: 1339, volume: 100 },
								{ open: 1348, high: 1371, low: 1271, close: 1320 },
							],
							["data2", 1500, 1111]
						],
						types: {
							data1: "candlestick",
							data2: "bar",
						},
						labels: true,
					},
					axis: {
						x: {
							type: "timeseries",
							tick: {
								format: "%Y-%m-%d",
							}
						}
					}
				}
			});

			it("texts should correctly positioned", () => {
				const expectedPos = [
					[147, 82],
					[231, 122],
					[315, 50],
					[441, 146]
				];

                chart.$.text.texts.each(function() {
					const expected = expectedPos.shift();

					expect(+this.getAttribute("x")).to.be.closeTo(expected[0], 1);
					expect(+this.getAttribute("y")).to.be.closeTo(expected[1], 2);
                })
			});
		});
	});
});