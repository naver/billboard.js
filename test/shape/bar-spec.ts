/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS, $BAR, $COMMON, $EVENT, $SHAPE} from "../../src/config/classes";

describe("SHAPE BAR", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with groups", () => {
		describe("with indexed data", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"],
						],
						type: "bar"
					},
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.$.main.selectAll(`.${$BAR.bars}-data1 .${$BAR.bar}`).each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("with timeseries data", () => {
			let barWidth = 0;

			before(() => {
				args = {
					data: {
						x: "date",
						columns: [
							["date", "2012-12-24", "2012-12-25", "2012-12-26", "2012-12-27", "2012-12-28", "2012-12-29"],
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"]
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "timeseries"
						}
					}
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.$.main.selectAll(`.${$BAR.bars}-data1 .${$BAR.bar}`).each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					// Get bar width for the next test
					if (i === 0) {
						barWidth = rect.width;
					}

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});

			it("set options axis.x.tick.count", () => {
				args.axis.x.tick = {
					count: 3
				};
			});

			it("check for bar width regardless tick count limit", () => {
				const width = chart.$.main.select(`.${$BAR.bars}-data1 .${$BAR.bar}`).node()
					.getBoundingClientRect().width;

				expect(width).to.be.equal(barWidth);
			});
		});

		describe("with category data", () => {
			before(() => {
				args = {
					data: {
						x: "date",
						columns: [
							["date", "2012-12-24", "2012-12-25", "2012-12-26", "2012-12-27", "2012-12-28", "2012-12-29"],
							["data1", 30, 200, -100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
						],
						groups: [
							["data1", "data2"],
						],
						type: "bar"
					},
					axis: {
						x: {
							type: "category",
						}
					}
				};
			});

			it("should be stacked", () => {
				const expectedBottom = [275, 293, 365, 281, 395, 290];

				chart.$.main.selectAll(`.${$BAR.bars}-data1 .${$BAR.bar}`).each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
			});
		});

		describe("Stacking order", () => {
			before(() => {
				args = {
					data: {
						json: [
							{
								"dateCreated":1623259144000,
								"ticketNumber":"A",
								"offset":136231810,
								"#911879":136230810,"#911859":27582860,
								"#911757":87955410,"#911589":205023100,
								"#911586":25582630,"#910424":1002204060,
								"#910192":164842690,"#909860":539594390,
								"#909835":544597750,"#909833":769800,
								"#909790":5051080,"#909770":47497790,
								"#909730":19151110,"#909631":75536300,
								"#909469":59282880,"#909463":11763480,
								"#909397":33546620,"#909121":340100210,
								"#909008":37436850,"#909007":613970,
								"#908982":38611320,"#908924":19555810,
								"#908903":7515450
							},
						],
						keys: {
							"x": "ticketNumber",
							"value": [
								"offset","#912544","#912541","#912524","#912294","#912291","#912281",
								"#912214","#912154","#912151","#912147","#912009","#911961","#911842",
								"#911840","#911758","#911532","#911531","#911440","#911435","#911196",
								"#911179","#911178","#910843","#910159","#909879","#909854","#909557",
								"#909528","#909145","#909141","#909139","#909123","#908942","#908914",
								"#908788","#908786","#908656","#908643","#908642","#908602","#908501",
								"#908436","#907771","#907752","#907495","#907488","#907484","#907465",
								"#907445","#907440","#907367","#911879","#911859","#911757","#911589",
								"#911586","#910424","#910192","#909860","#909835","#909833","#909790",
								"#909770","#909730","#909631","#909469","#909463","#909397","#909121",
								"#909008","#909007","#908982","#908924","#908903","#912644","#910271",
								"#909544","#909539","#909097","#909021","#908957","#908947"
							]
						},
						groups: [
							[
								"offset","#912544","#912541","#912524","#912294","#912291","#912281",
								"#912214","#912154","#912151","#912147","#912009","#911961","#911842",
								"#911840","#911758","#911532","#911531","#911440","#911435","#911196",
								"#911179","#911178","#910843","#910159","#909879","#909854","#909557",
								"#909528","#909145","#909141","#909139","#909123","#908942","#908914",
								"#908788","#908786","#908656","#908643","#908642","#908602","#908501",
								"#908436","#907771","#907752","#907495","#907488","#907484","#907465",
								"#907445","#907440","#907367","#911879","#911859","#911757","#911589",
								"#911586","#910424","#910192","#909860","#909835","#909833","#909790",
								"#909770","#909730","#909631","#909469","#909463","#909397","#909121",
								"#909008","#909007","#908982","#908924","#908903","#912644","#910271",
								"#909544","#909539","#909097","#909021","#908957","#908947"
							]
						],
						type: "bar",
						order: null
					},
					axis: {
						x: {
							type: "category"
						}
					},
					legend: {
						show: false
					}
				};
			});

			const chkecPath = (bars, expected) => {
				let i = 0;

				bars.each(function() {
					expect(this.getAttribute("d").indexOf(expected[i++]) > -1).to.be.true;
				});
			}

			it("should be stacked correctly: data.order=null", () => {
				const expected = [
					"M109.6,446",
					"M109.6,430",
					"M109.6,415",
					"M109.6,411",
					"M109.6,401",
					"M109.6,378",
					"M109.6,375",
					"M109.6,262",
					"M109.6,243",
					"M109.6,182",
					"M109.6,120",
					"M109.6,120",
					"M109.6,119",
					"M109.6,114",
					"M109.6,112",
					"M109.6,103",
					"M109.6,96",
					"M109.6,95",
					"M109.6,91",
					"M109.6,53",
					"M109.6,48",
					"M109.6,48",
					"M109.6,44",
					"M109.6,42"
				];

				chkecPath(chart.$.bar.bars, expected);
			});

			it("set options data.order='asc'", () => {
				args.data.order = "asc";
			});

			it("should be stacked correctly: data.order='asc'", () => {
				const expected = [
					"M109.6,128",
					"M109.6,113",
					"M109.6,54",
					"M109.6,97",
					"M109.6,170",
					"M109.6,51",
					"M109.6,446",
					"M109.6,147",
					"M109.6,270",
					"M109.6,332",
					"M109.6,41",
					"M109.6,42",
					"M109.6,72",
					"M109.6,46",
					"M109.6,87",
					"M109.6,79",
					"M109.6,44",
					"M109.6,58",
					"M109.6,209",
					"M109.6,62",
					"M109.6,41",
					"M109.6,67",
					"M109.6,48",
					"M109.6,43"
				];

				chkecPath(chart.$.bar.bars, expected);
			});

			it("set options data.order='desc'", () => {
				args.data.order = "desc";
			});

			it("should be stacked correctly: data.order='desc'", () => {
				const expected = [
					"M109.6,374",
					"M109.6,389",
					"M109.6,435",
					"M109.6,399",
					"M109.6,339",
					"M109.6,438",
					"M109.6,155",
					"M109.6,358",
					"M109.6,278",
					"M109.6,216",
					"M109.6,445",
					"M109.6,445",
					"M109.6,420",
					"M109.6,443",
					"M109.6,408",
					"M109.6,414",
					"M109.6,444",
					"M109.6,432",
					"M109.6,316",
					"M109.6,428",
					"M109.6,446",
					"M109.6,424",
					"M109.6,440",
					"M109.6,445"
				];

				chkecPath(chart.$.bar.bars, expected);
			});
		});
	});

	describe("internal.isWithinBar", () => {
		describe("with normal axis", () => {
			before(() => {
				args = {
					data: {
						columns: [
							["data1", 30, 200, 100, 400, -150, 250],
							["data2", 50, 20, 10, 40, 15, 25],
							["data3", -150, 120, 110, 140, 115, 125]
						],
						type: "bar"
					},
					axis: {
						rotated: false
					}
				};
			});

			it("should not be within bar", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 0,
					clientY: 0
				}, chart);
			});

			it("should be within bar", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 31,
					clientY: 280
				}, chart);
			});

			it("should not be within bar of negative value", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 280
				}, chart);
			});

			it("should be within bar of negative value", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 350
				}, chart);
			});
		});

		describe("with rotated axis", () => {
			before(() => {
				args.axis.rotated = true;
  			});

			it("should not be within bar", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 0,
					clientY: 0
				}, chart);
			});

			it("should be within bar", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 190,
					clientY: 20
				}, chart);
			});

			it("should be within bar of negative value", done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done();
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 50
				}, chart);
			});
		});
	});

	describe("multiple xs", () => {
		before(() => {
			args = {
				data: {
					type: "bar",
					xs: {
						"data1": "x",
						"data2": "x2"
					},
					x: "x",
					columns: [
						["x", "a", "b", "c", "d"],
						["x2", "e", "f", "g", "h"],
						["data1", 2407067, 3499561, 2811458, 2766504],
						["data2", 2211645, 2211645, 2200597, 2352318]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("should not throw error on click", () => {
			const bar = chart.$.main.select(`.${$EVENT.eventRectsMultiple} rect`).node();

			expect(() => util.fireEvent(bar, "click")).to.not.throw();
		});

		it("set options", () => {
			args = {
				data: {
					xs: {
						"Sep": "x1",
						"Aug": "x2",
						"Jul": "x2"
					},
					type: "bar",
					columns: [
						["x1", "05"],
						["Sep", 2],
						["x2", "01", "08", "29"],
						["Jul", 1, 1, 1],
						["Aug", 2, 2, 2]
					],
					groups: [
						//["Jul", "Aug"]
					]
				},
				bar: {
					width: {
						ratio: 0.2
					}
				}
			};
		});

		it("Bars should be positioned correctly", () => {
			const expectedPath = [
				"M154.46904761904761,426V39.63636363636365 H158.76904761904763 V426z",
				"M95.36666666666666,426V232.8181818181818 H99.66666666666666 V426z",
				"M195.0333333333333,426V232.8181818181818 H199.33333333333331 V426z",
				"M494.03333333333336,426V232.8181818181818 H498.33333333333337 V426z",
				"M99.66666666666666,426V39.63636363636365 H103.96666666666665 V426z",
				"M199.33333333333331,426V39.63636363636365 H203.63333333333333 V426z",
				"M498.33333333333337,426V39.63636363636365 H502.6333333333334 V426z"
			];

			chart.$.bar.bars.each(function() {
				expect(this.getAttribute("d")).to.be.equal(expectedPath.shift());
			});
		});

		it("set options groups=[['Jul', 'Aug']]", () => {
			args.data.groups = [
				["Jul", "Aug"]
			];
		});

		it("Grouped bars should be positined correctly", () => {
			const expectedPath = [
				"M152.3190476190476,426V168.4242424242424 H160.9190476190476 V426z",
				"M95.36666666666666,426V297.21212121212125 H103.96666666666665 V426z",
				"M195.0333333333333,426V297.21212121212125 H203.6333333333333 V426z",
				"M494.03333333333336,426V297.21212121212125 H502.6333333333334 V426z",
				"M95.36666666666666,297.21212121212125V39.636363636363654 H103.96666666666665 V297.21212121212125z",
				"M195.0333333333333,297.21212121212125V39.636363636363654 H203.6333333333333 V297.21212121212125z",
				"M494.03333333333336,297.21212121212125V39.636363636363654 H502.6333333333334 V297.21212121212125z"
			];

			chart.$.bar.bars.each(function() {
				expect(this.getAttribute("d")).to.be.equal(expectedPath.shift());
			});
		});
	});

	describe("options", () => {
		const width = 15;
		const padding = 3;

		before(() => {
			args = {
				data: {
					type: "bar",
					columns: [
						["data1", 30, 200, -100, 400, 150, 250],
						["data2", 130, 340, 200, 500, 250, 350]
					]
				},
				bar: {
					width,
					padding,
					radius: 10
				},
				axis: {
					rotated: false
				}
			};
		});

		const checkRadius = path => {
			const removeSpace = v => v.replace(/\s/g,"");
			const {main} = chart.$;

			// check the path from the third data value
			main.selectAll(`.${$SHAPE.shape}.${$BAR.bar}-2`).each(function(d, i) {
				expect(removeSpace(this.getAttribute("d"))).to.be.equal(removeSpace(path[i]));
			})
		};

		it(`bar width should be ${width}px`, () => {
			const barWidth = util.getBBox(chart.$.main.select(`.${$BAR.chartBar} path.${$SHAPE.shape}`)).width;

			expect(barWidth).to.be.equal(width);
		});

		it(`bar padding should be ${padding}px`, () => {
			const {main} = chart.$;
			const targetClass = `.${$BAR.chartBar}.${$COMMON.target}`;

			const bar1 = util.getBBox(main.select(`${targetClass}-data1 path.${$SHAPE.shape}`)).x + width;
			const bar2 = util.getBBox(main.select(`${targetClass}-data2 path.${$SHAPE.shape}`)).x;

			expect(bar2 - bar1).to.be.equal(padding);
		});

		it("check the bar radius", () => {
			const path = [
				"M228.5,331.55555555555554 V380.5833333333333 a10,10 1 0 0 10,10H233.5 a10,10 1 0 0 10,-10V331.55555555555554z",
				"M246.5,331.55555555555554 V223.5 a10,10 0 0 1 10,-10H251.5 a10,10 0 0 1 10,10V331.55555555555554z"
			];

			checkRadius(path);
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check the rotated axis bar radius", () => {
			checkRadius([
				"M131.11111111111111,161.16666666666669H39.166666666666664 a10,10 1 0 0 -10,10V166.16666666666669 a10,10 1 0 0 10,10H131.11111111111111z",
				"M131.11111111111111,179.16666666666669H285 a10,10 0 0 1 10,10V184.16666666666669 a10,10 0 0 1 -10,10H131.11111111111111z"
			]);
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = false;
			args.bar.radius = {ratio: 0.5};
		});

		it("check the axis bar radius in ratio", () => {
			const path = [
				"M228.5,331.55555555555554 V383.0833333333333 a7.5,7.5 1 0 0 7.5,7.5 H236 a7.5,7.5 1 0 0 7.5,-7.5 V331.55555555555554z",
				"M246.5,331.55555555555554 V221 a7.5,7.5 0 0 1 7.5,-7.5 H254 a7.5,7.5 0 0 1 7.5,7.5 V331.55555555555554z"
			];

			checkRadius(path);
		});

		it("set options bar.width for each dataset", () => {
			args.bar.width = {
				data1: 20,
				data2: 40
			};
		});

		it("each data should be rendered with different width", () => {
			chart.data().map(v => v.id).forEach(id => {
				chart.$.main.selectAll(`.${$BAR.bars}-${id} path`).each(function() {
					expect(Math.round(this.getBBox().width)).to.be.equal(args.bar.width[id]);
				});
			});
		});

		it("set options bar.width's ratio", () => {
			args.bar.width.data1 = {
				ratio: 0.5
			};

			args.bar.width.data2 = {
				ratio: 1,
				max: 30
			};
		});

		it("each data should be rendered with different width", () => {
			const expected = [25, 30];

			chart.data().map(v => v.id).forEach((id, i) => {
				chart.$.main.selectAll(`.${$BAR.bars}-${id} path`).each(function() {
					expect(Math.round(this.getBBox().width)).to.be.equal(expected[i]);
				});
			});
		});

		it("set options: data names with 'width' and 'total'", () => {
			args = {
				data: {
					type: "bar",
					columns: [
					  ["width", 50],
					  ["total", 100]
					]
				  },
				  bar: {
					width: {
						max: 71
					}
				}
			}
		});

		it("should render correctly for data key names for 'width' and 'total'", () => {
			chart.$.bar.bars.each(function() {
				expect(this.getBoundingClientRect().width).to.be.equal(args.bar.width.max);
			})
		});

		it("set options: bar.label.threshold=0 & all data values with 0(zero)", () => {
			args = {
				data: {
					columns: [
						["data1", 0, 0],
						["data2", 0, 0]
					],
					type: "bar",
					labels: true
				},
				bar: {
					label: {
						threshold: 0
					}
				}
			};
		});

		it("check the label visibility when all data values are 0(zero)", () => {
			chart.$.text.texts.each(function() {
				expect(this.textContent).to.be.equal("0");
				expect(this.style.opacity).to.be.equal("");
			});
		});
	});

	describe("bar indices", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 4, null, 4],
						["data2", null, 3, null],
						["data3", 1, 4, 4]
					],
					type: "bar"
				},
				bar: {
					indices: {
						removeNull: true
					}
				}
			}
		});

		it("should redefined bar indices removing nullish values.", () => {
			const {$: {bar}, internal} = chart;

			bar.bars.each(d => {
				const indices = internal.getIndices(null, d);

				expect(indices.__max__).to.be.equal(1);
				expect(indices.data3).to.be.equal(1);
				expect(indices["data1" in indices ? "data1" : "data2"]).to.be.equal(0);
			});
		});
	});

	describe("bar radius", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data", 0, 30],
					],
					type: "bar"
				},
				clipPath: false,
				bar: {
					radius: {
						ratio: 0.2
					}
				}
			}
		});

		// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
		// it("for zero value, Arc 'a' path command shouldn't be added ", () => {
		// 	expect(chart.$.bar.bars.attr("d").indexOf("a") === -1).to.be.true;
		// });

		it("set options", () => {
			args.data.columns[0][0] = 2;
		});

		it("clip-path attribute should be added, to avoid wrong rendering for small values", () => {
			const chartBars = chart.$.main.select(`.${$BAR.chartBars}`).node();

			expect(chartBars.getAttribute("clip-path")).to.be.ok;
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", -80, 200],
						["data2", -130, 50],
						["data3", 80, 100],
						["data4", 120, 100],
						["data5", 120, -100],
						["data6", -120, 150]
					],
					type: "bar",
					groups: [
						["data1", "data2", "data3"],
						["data4", "data5"],
					],
					order: "desc"
				},
				bar: {
					radius: {
						ratio: 0.4
					}
				}
			};
		});

		it("should apply bar radius for stacking bars", () => {
			let radiusCount = 0;
			const expected = [
				[
					{id: "data1", value: -80},
					{id: "data3", value: 80},
					{id: "data5", value: 120},
					{id: "data6", value: -120}
				],
				[
					{id: "data1", value: 200},
					{id: "data4", value: 100},
					{id: "data5", value: -100},
					{id: "data6", value: 150}
				]
			];

			chart.$.bar.bars.each(function(d) {
				const hasRadius = this.getAttribute("d").indexOf("a") > -1;

				if (hasRadius) {
					const found = expected[d.index].some(v => v.id === d.id && v.value === d.value);

					expect(found).to.be.true;
					radiusCount++;
				}
			});

			expect(radiusCount).to.be.equal(8);
		});

		it("set options", () => {
			args = {				
				data: {
					columns: [
						["d3", 3, 5, 8, 3, 9, 2]
					],
					type: "bar",
					labels: false
				},
				bar: {
					padding: 2,
					radius: {
						ratio: 0.2
					}
				}
			};
		});

		it("path data should remain with Arc command with value 0(zero).", done => {
			// when
			chart.load({
				columns: [["d3", 3, 5, 8, 3, 9, 0]],
				done: function() {
					const d = this.$.bar.bars.filter(":last-child").attr("d");

					expect(/\sa\d+/.test(d)).to.be.true;
					done();
				}
			});
		})
	});

	describe("bar linear gradient", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 230, 280, 251, 400, 150, 546, 158],
						["hello there", 230, 280, 251, 400, 150, 546, 158],
						["123 test", 130, 220, 120, 129, 410, 100, 440]
					],
					type: "bar",
				},
				bar: {
					linearGradient: true
				}
			}
		});

		it("should generate liearGradient element", () => {
			const internal = chart.internal;
			const expected = {
				x: [0, 0],
				y: [0, 1],
				offset: [0, 1],
				opacity: [1, 0]
			};

			chart.data().forEach(v => {
				const color = chart.color(v.id);
				const selectorSuffix = internal.getTargetSelectorSuffix(v.id);
				const id = `#${internal.state.datetimeId}-gradient${selectorSuffix}`;
				const gradient = chart.$.svg.select(id);

				expect(gradient.empty()).to.be.false;
				expect([+gradient.attr("x1"), +gradient.attr("x2")]).to.be.deep.equal(expected.x);
				expect([+gradient.attr("y1"), +gradient.attr("y2")]).to.be.deep.equal(expected.y);

				gradient.selectAll("stop").each(function(d, i) {
					const stop = d3Select(this);

					expect(+stop.attr("offset")).to.be.equal(expected.offset[i]);
					expect(stop.attr("stop-color")).to.be.equal(color);
					expect(+stop.attr("stop-opacity")).to.be.equal(expected.opacity[i]);
				});

				expect(chart.$.bar.bars.filter(d => d.id === v.id).style("fill")).to.be.equal(`url("${id}")`);
			});
		});

		it("set options: customzied linearGradient", () => {
			args.bar = {
				linearGradient: {
					x: [1, 0],
					y: [0, 1],
					stops: [
						[0, id => id == "data1" ? "red" : "yellow", 1],
						[0.3, "orange", 0.5],
						[0.6, "green", 0.7],
						[0.8, "purple", 0.7],
						[1, null, 1]
					]
				}
			};
		});

		it("should generate customized liearGradient element", () => {
			const internal = chart.internal;

			chart.data().forEach(v => {
				const selectorSuffix = internal.getTargetSelectorSuffix(v.id);
				const id = `#${internal.state.datetimeId}-gradient${selectorSuffix}`;
				const gradient = chart.$.svg.select(id);

				expect(gradient.empty()).to.be.false;
				expect([+gradient.attr("x1"), +gradient.attr("x2")]).to.be.deep.equal(args.bar.linearGradient.x);
				expect([+gradient.attr("y1"), +gradient.attr("y2")]).to.be.deep.equal(args.bar.linearGradient.y);

				const stops = args.bar.linearGradient.stops;

				gradient.selectAll("stop").each(function(d, i) {
					const color = i === 0 ? stops[i][1](v.id) : stops[i][1];
					const stop = d3Select(this);

					expect(+stop.attr("offset")).to.be.equal(stops[i][0]);
					expect(stop.attr("stop-color")).to.be.equal(color || chart.color(v.id));
					expect(+stop.attr("stop-opacity")).to.be.equal(stops[i][2]);
				});

				expect(chart.$.bar.bars.filter(d => d.id === v.id).style("fill")).to.be.equal(`url("${id}")`);
			});
		});

		it("set options", () => {
			args.bar.linearGradient = true;
			args.axis = {
				rotated: true
			};
		});

		it("check for axis rotated gradient", () => {
			const expected = [1, 0, 0, 0];

			chart.$.defs.selectAll("linearGradient").each(function() {
				["x1", "x2", "y1", "y2"].forEach((v, i) => {
					expect(+this.getAttribute(v)).to.be.equal(expected[i]);
				});
			});
		});

		it("set options: reset options", () => {
			args = {
				data: {
					columns: [["data"]],
					type: "bar"
				},
				bar: {
					linearGradient: true
				}
			};
		});

		it("should generate customized liearGradient element", done => {
			setTimeout(() => {
				chart.load({
				  columns: [
					["data", 10, 20, 30, 40]
				  ],
				  done: () => {
					  expect(chart.$.defs.select("linearGradient").empty()).to.be.false;
					  done();
				  }
				});
			  }, 1000);
		});

	});

	describe("bar overlap", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 80, 150, 100],
						["data2", 100, 120, 130],
						["data3", 150, 80, 120]
					],
					type: "bar"
				},
				bar: {
					width: {
						data1: 60,
						data2: 40,
						data3: 20
					},
					overlap: true
				}
			};
		});

		it("bars should positioned at the center of each x Axis ticks.", () => {
			const {x} = chart.internal.scale;
			const {bars} = chart.$.bar;
			const dataNames = chart.data().map(v => v.id);
			const {width} = args.bar;
			const ticks = dataNames.map((v, i) => x(i));
			const re = /^M(\d+)/;

			dataNames.forEach(id => {
				const bar = bars.filter(d => d.id === id).nodes();

				ticks.forEach((t, i) => {
					const xPos = +bar[i].getAttribute("d").match(re)?.[1] ?? 0;
					const expectedX = t - width[id] / 2;

					expect(xPos).to.be.closeTo(expectedX, 1);
				});
			});
		});
	});

	describe("bar position", () => {
		before(() => {
			args = {
				data: {
				  columns: [
					["data1", 378, 200],
					["data2", 130, 100]
				  ],
				  types: {
					data1: "bar",
					data2: "line"
				  }
				},
				bar: {
				  width: {
					ratio: 0.5
				  }
				}
			};
		});

		it("check for the correct bar width & position", () => {
			const expectedPath = [
				"M74.75,426V39.63636363636365 H224.25 V426z",
				"M373.75,426V221.5747955747956 H523.25 V426z"
			];

			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
			});
		});

		// check non-grouped bar path position
		const checkBarPathPos = type => {
			// Get x Axis pos
			let xAxisYPos = chart.$.main.select(`.${$AXIS.axisX} path`).node().getBoundingClientRect();

			xAxisYPos = type === "y" ? xAxisYPos[type] : xAxisYPos[type] + xAxisYPos.width;
	
			chart.$.bar.bars.each(function() {
				const rect = this.getBoundingClientRect();
			
				expect(rect[type] + (type === "y" ? rect.height : 0)).to.be.closeTo(xAxisYPos, 1);
			});
		}

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 20000, 35000, 30000]
					],
					type: "bar"
				  },
				  axis: {
					y: {
						min: 10000,
						padding: {
							bottom: 0
						}
					}
				}
			};
		});

		it("check bar path node position: non rotated Axis", () => {
			checkBarPathPos("y");
		});

		it("set option axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check bar path node position: rotated Axis", () => {
			checkBarPathPos("x");
		});

		it("set options", () => {
			args = {
				size: {width: 82},
			  data: {
				columns: [
					["data1", 30, 200, 100, 400, 150, 30, 50, 60, 81]
				],
				type: "bar"
			  },
			  bar: {
				width: {
				  ratio: 0.85
				}
			  }
			};
		});

		it("bar's x position interval should be same", () => {
			const interval: number[] = [];
			let lastX = 0;

			chart.$.bar.bars.each(function(d, i) {
				const x = this.getBoundingClientRect().x;

				if (i > 0) {
					interval.push(Math.ceil(x - lastX));
				}

				lastX = x;
			});

			expect(
				interval.every((v, i, arr) => (i > 0 ? arr[i - 1] === v : true))
			).to.be.true;
		});
	});

	describe("bar sensitivity", () => {
		before(() => {
			args = {
				size: {
					width: 400,
					height: 250
				},
				data: {
					columns: [
						["data1", 90, 40, 10],
						["data2", 5, 5, 5],
						["data3", 3, 3, 3],
					],
					groups: [["data1", "data2", "data3"]],
					type: "bar"
				},
				tooltip: {
					grouped: false
				}
			};
		});

		it("default sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 3}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(2);
		});

		it("set options point.sensitivity=3", () => {
			args.bar = {
				sensitivity: 0
			};
		});

		it("lowered sensitivity", () => {
			chart.tooltip.show({
				data: {x: 1, value: 3}
			});

			expect(chart.$.tooltip.selectAll(".name").size()).to.be.equal(1);
		});
	});

	describe("bar label.threshold", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 230],
						["data2", 1000, 0],
						["data3", -30, -230],
						["data4", -1000, 0]
					],
					type: "bar",
					groups: [
						["data1", "data2"]
					],
					labels: true
				},
				bar: {
					label: {
						threshold: 0.1
					}
				}
			};
		});

		const checkLabel = function(expected) {
			const hiddenIds = chart.internal.state.hiddenTargetIds;

			const res = chart.$.text.texts.filter(function(d) {
				return hiddenIds.indexOf(d.id) === -1 && this.style.fillOpacity === "";
			}).nodes().map(n => +n.textContent);

			expect(res).to.be.deep.equal(expected);
		}

		it("check data label shown #1", done => {
			checkLabel([1000, -1000]);

			// when
			chart.hide("data2");

			setTimeout(() => {
				checkLabel([230, -230, -1000]);
				done();
			}, 350);
		});

		it("check data label shown #2", done => {
			// when
			chart.hide(["data2", "data4"]);

			setTimeout(() => {
				checkLabel([230, -230]);
				done();
			}, 350);
		});

		it("check data label shown #3", done => {
			// when
			chart.hide(["data1", "data2", "data4"]);

			setTimeout(() => {
				checkLabel([-30, -230]);
				done();
			}, 350);
		});
	});

	describe("bar width on zoom", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250]
					],
					type: "bar"
				},
				zoom: {
					enabled: true
				},
				transition: {
					duration: 0
				}
			};
		});

		it("should maintain width size after toggle", done => {
			const zoomBarWidth: number[] = [];

			// when
			chart.zoom([1, 3]);

			new Promise((resolve, reject) => {
				setTimeout(() => {
					chart.$.bar.bars.each(function() {
						zoomBarWidth.push(parseInt(this.getBoundingClientRect().width));
					});

					resolve(true);
				}, 350);
			}).then(() => {
				return new Promise((resolve, reject) => {
					chart.hide();

					setTimeout(resolve, 350);
				});
			}).then((msg) => {
				return new Promise((resolve, reject) => {
					chart.show();

					setTimeout(resolve, 350);
				});
			}).then(() => {
				chart.$.bar.bars.each(function(d, i) {
					const w = parseInt(this.getBoundingClientRect().width);

					expect(w).to.be.equal(zoomBarWidth[i]);
				});

				done();
			});
		});
	});

	describe("bar within a range", () => {
		it("should render bars with a single column", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", [100, 200], [200, 300]]
					],
					type: "bar"
				}
			});
			const expectedPath = [
				"M59.8,297.21212121212125V168.4242424242424 H239.2 V297.21212121212125z",
				"M358.8,168.4242424242424V39.63636363636365 H538.2 V168.4242424242424z"
			];
			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
			});
		});

		// it("should throw an error with an array value when it's numbers of elements greater than 2", () => {
		// 	const generateChart = () => {
		// 		chart = util.generate({
		// 			data: {
		// 				columns: [
		// 					["data1", [100, 200, 300]]
		// 				],
		// 				type: "bar"
		// 			}
		// 		});
		// 	};
		// 	expect(generateChart).to.throw();
		// });

		// it("should throw an error with reversed ranges", () => {
		// 	const generateChart = () => {
		// 		chart = util.generate({
		// 			data: {
		// 				columns: [
		// 					["data1", [200, 100]]
		// 				],
		// 				type: "bar"
		// 			}
		// 		});
		// 	};
		// 	expect(generateChart).to.throw();
		// });

		it("should render bars with multiple columns", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", [100, 200], [200, 300]],
						["data2", [-100, 100], [-50, -30]],
					],
					type: "bar"
				}
			});
			const expectedPathMap = {
				data1: [
					"M58.8,213.5V124.95833333333331 H147 V213.5z",
					"M352.8,124.95833333333331V36.41666666666668 H441 V124.95833333333331z"
				],
				data2: [
					"M147,390.5833333333333V213.5 H235.2 V390.5833333333333z",
					"M441,346.3125V328.6041666666667 H529.2 V346.3125z"
				],
			};
			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPathMap[d.id][i]);
			});
		});

		it("should render bars with single values and ranges together", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 100, 200, [100, 200], [200, 300]],
						["data2", -100, -50, [-100, 100], [-50, -30]],
					],
					type: "bar"
				}
			});
			const expectedPathMap = {
				data1: [
					"M29.4,302.04166666666663V213.5 H73.5 V302.04166666666663z",
					"M176.4,302.04166666666663V124.95833333333331 H220.5 V302.04166666666663z",
					"M323.4,213.5V124.95833333333331 H367.5 V213.5z",
					"M470.4,124.95833333333331V36.41666666666668 H514.5 V124.95833333333331z",
				],
				data2: [
					"M73.5,302.04166666666663V390.5833333333333 H117.6 V302.04166666666663z",
					"M220.5,302.04166666666663V346.3125 H264.6 V302.04166666666663z",
					"M367.5,390.5833333333333V213.5 H411.6 V390.5833333333333z",
					"M514.5,346.3125V328.6041666666667 H558.6 V346.3125z",
				],
			};
			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPathMap[d.id][i]);
			});
		});

		it("should render grouped bars", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 100, 200, [100, 200], [200, 300]],
						["data2", -100, -50, [-100, 50], [-50, -30]],
					],
          type: "bar",
          groups: [["data1", "data2"]],
				}
			});
			const expectedPathMap = {
				data1: [
					"M29.4,302.04166666666663V213.5 H117.6 V302.04166666666663z",
					"M176.4,302.04166666666663V124.95833333333331 H264.6 V302.04166666666663z",
					"M323.4,213.5V124.95833333333331 H411.59999999999997 V213.5z",
					"M470.4,124.95833333333331V36.41666666666668 H558.6 V124.95833333333331z",
				],
				data2: [
					"M29.4,302.04166666666663V390.5833333333333 H117.6 V302.04166666666663z",
					"M176.4,302.04166666666663V346.3125 H264.6 V302.04166666666663z",
					"M323.4,390.5833333333333V257.77083333333337 H411.59999999999997 V390.5833333333333z",
					"M470.4,346.3125V328.6041666666667 H558.6 V346.3125z",
				],
			};
			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPathMap[d.id][i]);
			});
		});
	});

	describe("rotated & inverted axis", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 50, 70, 100, 150, 250],
						["data2", -30, -50, -70, -100, -150, -250]
					],
					type: "bar",
					labels: true
				},
				axis: {
					rotated: true,
					y: {
						inverted: true
					}
				}
			};
		});

		it("bar should be drawn correctly.", () => {
			const texts = chart.$.text.texts.nodes();

			chart.$.bar.bars.each(function(d, i) {
				const text = texts.shift();
				const {x: textX} = text.getBoundingClientRect();
				const barRect = this.getBoundingClientRect();
				const {id} = d;

				// check bar shape has been rendered
				expect(barRect.width > 0).to.be.true;

				// check data label text's position
				expect(text.getAttribute("text-anchor")).to.be.equal(id === "data1" ? "end" : "start");

				if (id === "data1") {
					expect(textX < barRect.x).to.be.true;
				} else if (id === "data2") {
					expect(textX > barRect.x + barRect.width).to.be.true;
				}
			});
		});
	});
});
