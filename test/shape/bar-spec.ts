/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS, $BAR, $COMMON, $EVENT, $LINE, $SHAPE} from "../../src/config/classes";

describe.skip("SHAPE BAR", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with groups", () => {
		describe("with indexed data", () => {
			beforeAll(() => {
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

			beforeAll(() => {
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

				expect(width).to.be.closeTo(barWidth, 1);
			});
		});

		describe("with category data", () => {
			beforeAll(() => {
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
			beforeAll(() => {
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
					//console.log(this.getAttribute("d"))
					expect(this.getAttribute("d").indexOf(expected[i++]) > -1).to.be.true;
				});
			}

			it("should be stacked correctly: data.order=null", () => {
				const expected = [
					"M109.80000000000001,446V430.54636550534036",
					"M109.80000000000001,430.54636550534036V415.09284444699557",
					"M109.80000000000001,415.09284444699557V411.9639464549821",
					"M109.80000000000001,411.9639464549821V401.9866088715797",
					"M109.80000000000001,401.9866088715797V378.7295439440708",
					"M109.80000000000001,378.7295439440708V375.8275446721525",
					"M109.80000000000001,375.8275446721525V262.1412093566052",
					"M109.80000000000001,262.1412093566052V243.44206206951793",
					"M109.80000000000001,243.44206206951793V182.2324629426413",
					"M109.80000000000001,182.2324629426413V120.4553010953897",
					"M109.80000000000001,120.4553010953897V120.3679778202017",
					"M109.80000000000001,120.3679778202017V119.7950019188811",
					"M109.80000000000001,119.7950019188811V114.40702765674587",
					"M109.80000000000001,114.40702765674587V112.23459631264922",
					"M109.80000000000001,112.23459631264922V103.66603680162933",
					"M109.80000000000001,103.66603680162933V96.94120535946638",
					"M109.80000000000001,96.94120535946638V95.60679953820306",
					"M109.80000000000001,95.60679953820306V91.80139458901215",
					"M109.80000000000001,91.80139458901215V53.22168007962563",
					"M109.80000000000001,53.22168007962563V48.97498177523255",
					"M109.80000000000001,48.97498177523255V48.90533528099098",
					"M109.80000000000001,48.90533528099098V44.5254094278709",
					"M109.80000000000001,44.5254094278709V42.30707040714577",
					"M109.80000000000001,42.30707040714577V41.45454545454555"
				];

				chkecPath(chart.$.bar.bars, expected);
			});

			it("set options data.order='asc'", () => {
				args.data.order = "asc";
			});

			it("should be stacked correctly: data.order='asc'", () => {
				const expected = [
					"M109.80000000000001,128.79097698634183V113.3373424916822",
					"M109.80000000000001,113.3373424916822V97.8838214333374",
					"M109.80000000000001,54.793089527912855V51.66419153589936",
					"M109.80000000000001,97.8838214333374V87.906483849935",
					"M109.80000000000001,170.74718920093795V147.4901242734291",
					"M109.80000000000001,51.66419153589936V48.762192263981035",
					"M109.80000000000001,446V332.3136646844527",
					"M109.80000000000001,147.4901242734291V128.79097698634183",
					"M109.80000000000001,270.5365028372011V209.32690371032447",
					"M109.80000000000001,332.3136646844527V270.5365028372011",
					"M109.80000000000001,41.61151522397512V41.52419194878712",
					"M109.80000000000001,42.18449112529572V41.61151522397512",
					"M109.80000000000001,72.61309289675216V67.22511863461693",
					"M109.80000000000001,46.54385324325591V44.37142189915926",
					"M109.80000000000001,87.906483849935V79.33792433891512",
					"M109.80000000000001,79.33792433891512V72.61309289675216",
					"M109.80000000000001,44.37142189915926V43.03701607789594",
					"M109.80000000000001,58.59849447710377V54.793089527912855",
					"M109.80000000000001,209.32690371032447V170.74718920093795",
					"M109.80000000000001,62.84519278149685V58.59849447710377",
					"M109.80000000000001,41.52419194878712V41.45454545454555",
					"M109.80000000000001,67.22511863461693V62.84519278149685",
					"M109.80000000000001,48.762192263981035V46.54385324325591",
					"M109.80000000000001,43.03701607789594V42.18449112529572",
				];

				chkecPath(chart.$.bar.bars, expected);
			});

			it("set options data.order='desc'", () => {
				args.data.order = "desc";
			});

			it("should be stacked correctly: data.order='desc'", () => {
				const expected = [
					"M109.80000000000001,374.11720296286336V358.6635684682037",
					"M109.80000000000001,389.57072402120815V374.11720296286336",
					"M109.80000000000001,435.7903539186462V432.6614559266327",
					"M109.80000000000001,399.54806160461055V389.57072402120815",
					"M109.80000000000001,339.96442118111645V316.7073562536076",
					"M109.80000000000001,438.6923531905645V435.7903539186462",
					"M109.80000000000001,155.14088077009285V41.45454545454555",
					"M109.80000000000001,358.6635684682037V339.96442118111645",
					"M109.80000000000001,278.1276417442211V216.91804261734444",
					"M109.80000000000001,216.91804261734444V155.14088077009285",
					"M109.80000000000001,445.93035350575843V445.84303023057043",
					"M109.80000000000001,445.84303023057043V445.27005432924983",
					"M109.80000000000001,420.2294268199286V414.8414525577934",
					"M109.80000000000001,443.0831235553863V440.91069221128964",
					"M109.80000000000001,408.11662111563044V399.54806160461055",
					"M109.80000000000001,414.8414525577934V408.11662111563044",
					"M109.80000000000001,444.4175293766496V443.0831235553863",
					"M109.80000000000001,432.6614559266327V428.8560509774418",
					"M109.80000000000001,316.7073562536076V278.1276417442211",
					"M109.80000000000001,428.8560509774418V424.6093526730487",
					"M109.80000000000001,446V445.93035350575843",
					"M109.80000000000001,424.6093526730487V420.2294268199286",
					"M109.80000000000001,440.91069221128964V438.6923531905645",
					"M109.80000000000001,445.27005432924983V444.4175293766496",
				];

				chkecPath(chart.$.bar.bars, expected);
			});
		});
	});

	describe("internal.isWithinBar", () => {
		describe("with normal axis", () => {
			beforeAll(() => {
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

			it("should not be within bar", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 0,
					clientY: 0
				}, chart);
			}));

			it("should be within bar", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 31,
					clientY: 280
				}, chart);
			}));

			it("should not be within bar of negative value", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 280
				}, chart);
			}));

			it("should be within bar of negative value", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 350
				}, chart);
			}));
		});

		describe("with rotated axis", () => {
			beforeAll(() => {
				args.axis.rotated = true;
  			});

			it("should not be within bar", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.not.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 0,
					clientY: 0
				}, chart);
			}));

			it("should be within bar", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data1 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 190,
					clientY: 20
				}, chart);
			}));

			it("should be within bar of negative value", () => new Promise(done => {
				const internal = chart.internal;
				const bar = chart.$.main.select(`.${$COMMON.target}-data3 .${$BAR.bar}-0`)
					.on("click", function(event) {
						internal.state.event = event;

						expect(internal.isWithinBar(this)).to.be.ok;
						done(1);
					});

				util.fireEvent(bar.node(), "click", {
					clientX: 68,
					clientY: 50
				}, chart);
			}));
		});
	});

	describe("multiple xs", () => {
		beforeAll(() => {
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
						["x2", "01", "08", "29"],
						["Sep", 2],
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
				"M154.74166666666667,426V39.63636363636365 H159.0202380952381 V426z",
				"M95.5547619047619,426V232.8181818181818 H99.83333333333333 V426z",
				"M195.38809523809522,426V232.8181818181818 H199.66666666666666 V426z",
				"M494.8880952380953,426V232.8181818181818 H499.1666666666667 V426z",
				"M99.83333333333333,426V39.63636363636365 H104.11190476190475 V426z",
				"M199.66666666666666,426V39.63636363636365 H203.9452380952381 V426z",
				"M499.1666666666667,426V39.63636363636365 H503.4452380952381 V426z",
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
				"M152.60238095238094,426V168.4242424242424 H161.1595238095238 V426z",
				"M95.5547619047619,426V297.21212121212125 H104.11190476190475 V426z",
				"M195.38809523809522,426V297.21212121212125 H203.94523809523807 V426z",
				"M494.8880952380953,426V297.21212121212125 H503.44523809523815 V426z",
				"M95.5547619047619,297.21212121212125V39.636363636363654 H104.11190476190475 V297.21212121212125z",
				"M195.38809523809522,297.21212121212125V39.636363636363654 H203.94523809523807 V297.21212121212125z",
				"M494.8880952380953,297.21212121212125V39.636363636363654 H503.44523809523815 V297.21212121212125z",
			  ];

			  chart.$.bar.bars.each(function() {
				expect(this.getAttribute("d")).to.be.equal(expectedPath.shift());
			});
		});

		it("set options", () => {
			args = {
				data: {
					xs: { 
						"Buy": "x1",
						"Sell": "x2"
					},
					columns: [
						["x1", "2018-07-05", "2018-07-11"],
						["x2","2018-07-02","2018-07-05"],
						["Buy", 33, 3],
						["Sell", 7, 33]
					],
					type: "bar", 
					groups: [[ "Buy", "Sell"]]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%y-%m-%d"
						},
					}
				}
			}
		});

		it("should stack bars, form same multiple xs.", () => {
			const {bars} = chart.$.bar;
			const expectedPath = {
				Buy: [
					[219, 426],
					[419, 426]
				],
				Sell: [
					[119, 426],
					[219, 232]
				]
			}

			const getStartPoint = str => str.replace(/^M([^V]+)V.*/, "$1").split(",").map(Math.floor);

			bars.filter(d => d.id === "Buy").each(function(d, i) {
				const expected = expectedPath[d.id][i];

				getStartPoint(this.getAttribute("d")).forEach((v, j) => {
					expect(v).to.be.closeTo(expected[j], 1);
				});
			});


			bars.filter(d => d.id === "Sell").each(function(d, i) {
				const expected = expectedPath[d.id][i];

				getStartPoint(this.getAttribute("d")).forEach((v, j) => {
					expect(v).to.be.closeTo(expected[j], 1);
				});
			});
		});
	});

	describe("options", () => {
		const width = 15;
		const padding = 3;

		beforeAll(() => {
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
				"M228.91666666666669,331.55555555555554V380.5833333333333 a10 10 1 0 0 10,10H233.91666666666669 a10 10 1 0 0 10,-10V331.55555555555554z",
				"M246.91666666666669,331.55555555555554V223.5 a10 10 0 0 1 10,-10H251.91666666666669 a10 10 0 0 1 10,10V331.55555555555554z"
			];

			checkRadius(path);
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("check the rotated axis bar radius", () => {
			checkRadius([
				"M131.11111111111111,161.16666666666669H59.166666666666664 a10 10 1 0 0 -10,10V166.16666666666669 a10 10 1 0 0 10,10H131.11111111111111z",
				"M131.11111111111111,179.16666666666669H285 a10 10 0 0 1 10,10V184.16666666666669 a10 10 0 0 1 -10,10H131.11111111111111z"
			]);
		});

		it("set options axis.rotated=true", () => {
			args.axis.rotated = false;
			args.bar.radius = {ratio: 0.5};
		});

		it("check the axis bar radius in ratio", () => {
			const path = [
				"M228.91666666666669,331.55555555555554V383.0833333333333 a7.5 7.5 1 0 0 7.5,7.5H236.41666666666669 a7.5 7.5 1 0 0 7.5,-7.5V331.55555555555554z",
				"M246.91666666666669,331.55555555555554V221 a7.5 7.5 0 0 1 7.5,-7.5H254.41666666666669 a7.5 7.5 0 0 1 7.5,7.5V331.55555555555554z"
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
			const expected = [24, 30];

			chart.data().map(v => v.id).forEach((id, i) => {
				chart.$.main.selectAll(`.${$BAR.bars}-${id} path`).each(function() {
					expect(Math.floor(this.getBBox().width)).to.be.closeTo(expected[i], 1);
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

		it("set options: bar.front=true", () => {
			args = {
				data: {
					columns: [
						["data1", 230, 180, 250, 270, 220],
						["data2", 200, 190, 290, 140, 130]
					],
					types: {
						data1: "bar",
						data2: "area"
					}
				},
				bar: {
					front: true
				}
			};
		});

		it("check bar element position on DOM hierarchy.", () => {
			const bars = chart.$.main.select(`.${$COMMON.chart} .${$BAR.chartBars}`).node();
			
			// check the bar element position
			expect(bars.previousSibling.classList.contains($LINE.chartLines)).to.be.true;
			expect(bars.nextSibling.classList.contains($EVENT.eventRects)).to.be.true;
		});

		it("set options", () => {
			args = {
				data: {
					columns: [ 
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					],
					type: "bar"
				},
				bar: {
					width: function(width, targetsNum, maxDataCount) {
						return width / (targetsNum * maxDataCount)
					}
				}
			}
		});

		it("should bar width size adjust from width callback", () => {
			const getTargetWidth = () => {
				const chartWidth = chart.internal.state.width;
				const data = chart.data();
				const targetsNum = data.length;
				const maxDataCount = data[0].values.length;
				
				return args.bar.width(chartWidth, targetsNum, maxDataCount);
			}

			chart.$.bar.bars.each(function() {
				expect(this.getBoundingClientRect().width).to.be.closeTo(getTargetWidth(), 1);
			});

			// when
			chart.resize({width: 500});

			chart.$.bar.bars.each(function() {
				expect(this.getBoundingClientRect().width).to.be.closeTo(getTargetWidth(), 1);
			});
		});
	});

	describe("bar indices", () => {
		beforeAll(() => {
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
		beforeAll(() => {
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
			let nonRadiusCount = 0;
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
				const hasRadius = !/a0 0/.test(this.getAttribute("d"));

				if (hasRadius) {
					const found = expected[d.index].some(v => v.id === d.id && v.value === d.value);

					expect(found).to.be.true;
					radiusCount++;
				} else {
					nonRadiusCount++;
				}
			});

			expect(radiusCount).to.be.equal(8);
			expect(nonRadiusCount).to.be.equal(4);
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

		it("path data should remain with Arc command with value 0(zero).", () => new Promise(done => {
			// when
			chart.load({
				columns: [["d3", 3, 5, 8, 3, 9, 0]],
				done: function() {
					const d = this.$.bar.bars.filter(":last-child").attr("d");

					expect(/\sa\d+/.test(d)).to.be.true;
					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {				
				data: {
					columns: [
						["data1", 250],
						["data2", -250]
					],
					type: "bar"
				},
				bar: {
					radius: {
						ratio: 0.5
					}
				},
				axis: {
					rotated: true
				}
			};
		});

		it("radius should be rendered correclty on rotated axis", () => {
			const expected = [
				'M295,85.80000000000001H477.23333333333323 a63.599999999999994 63.599999999999994 0 0 1 63.599999999999994,63.599999999999994V149.4 a63.599999999999994 63.599999999999994 0 0 1 -63.599999999999994,63.599999999999994H295z',
				'M295,213H112.76666666666665 a63.599999999999994 63.599999999999994 1 0 0 -63.599999999999994,63.599999999999994V276.6 a63.599999999999994 63.599999999999994 1 0 0 63.599999999999994,63.599999999999994H295z'
			];

			chart.$.bar.bars.each(function() {
				expect(this.getAttribute("d")).to.be.equal(expected.shift());
			});
		});

		it("set options: axis.y.inverted=true", () => {
			args.axis.y = {
				inverted: true
			};
		});

		it("radius should be rendered correclty on rotated & inverted axis", () => {
			const expected = [
				'M295,85.80000000000001H112.76666666666668 a63.599999999999994 63.599999999999994 1 0 0 -63.599999999999994,63.599999999999994V149.4 a63.599999999999994 63.599999999999994 1 0 0 63.599999999999994,63.599999999999994H295z',
				'M295,213H477.23333333333323 a63.599999999999994 63.599999999999994 0 0 1 63.599999999999994,63.599999999999994V276.6 a63.599999999999994 63.599999999999994 0 0 1 -63.599999999999994,63.599999999999994H295z'
			];

			chart.$.bar.bars.each(function() {
				expect(this.getAttribute("d")).to.be.equal(expected.shift());
			});
		});
	});

	describe("bar radius surpassing condition", () => {
		beforeAll(() => {
			args = {
				data: {
					type: "bar",
					columns:[
						["data", -10289158423, -204482173, 3075954443]
					]
				},
				axis: {
					y: {
						"min":-50000000000,
						"max":50000000000,
						"tick":{
							"show":false,
							"outer":false,
							"text":{
								"position":{
									"x":-20
								}
							},
							"stepSize": 25000000000
						},"padding":0
					}
				},
				bar: {
					radius: 2,
					width: 10,
					padding: 2
				}
			};
		});

		it("should negative value set clip-path", () => {
			chart.$.bar.bars.each(function(d, i) {
				if (i === 1) {
					const d = this.getAttribute("d");					
					const value = [d.match(/,([^V]*)/)[1], d.match(/V([^\s]*)/)[1]].reduce((a, c) => +a - +c);

					expect(+this.style.clipPath.match(/\(([^px]*)/)[1]).to.be.closeTo(value, 1);
				} else {
					expect(this.style.clipPath).to.be.equal("");
				}
			});
		});

		it("set options: set positive data value", () => {
			args.data.columns[0][2] = 204482173;
		});

		it("should positive value set clip-path", () => {
			chart.$.bar.bars.each(function(d, i) {
				if (i === 1) {
					const d = this.getAttribute("d");					
					const value = [d.match(/,([^V]*)/)[1], d.match(/V([^\s]*)/)[1]].reduce((a, c) => +c - +a);

					expect(+this.style.clipPath.match(/\s([^px]*)px\)$/)[1]).to.be.closeTo(value, 1);
				} else {
					expect(this.style.clipPath).to.be.equal("");
				}
			});
		});

		it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("should positive value set clip-path for rotated axis", () => {
			chart.$.bar.bars.each(function(d, i) {
				if (i === 1) {
					const d = this.getAttribute("d");					
					const value = [d.match(/M([^,]*)/)[1], d.match(/H([^\s]*)/)[1]].reduce((a, c) => +a - +c);

					expect(+this.style.clipPath.match(/\s([^px]*)px\)$/)[1]).to.be.closeTo(value, 1);
				} else {
					expect(this.style.clipPath).to.be.equal("");
				}
			});
		});

		it("set options: set negative data value", () => {
			args.data.columns[0][2] = -204482173;
		});

		it("should negative value set clip-path for rotated axis", () => {
			chart.$.bar.bars.each(function(d, i) {
				if (i === 1) {
					const d = this.getAttribute("d");					
					const value = [d.match(/M([^,]*)/)[1], d.match(/H([^\s]*)/)[1]].reduce((a, c) => +c - +a);

					expect(+this.style.clipPath.match(/px\s([^px]*)/)[1]).to.be.closeTo(value, 1);
				} else {
					expect(this.style.clipPath).to.be.equal("");
				}
			});
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", -80],
						["data2", 80],
						["data3", -120]
					],
					type: "bar",
					groups: [
						[
							"data1",
							"data2"
						]
					],
					order: "desc"
				},
				bar: {
					radius: {
						ratio: 0.5
					}
				},
				transition: {
					duration: 0
				}
			};
		});

		it("clip-path style should be updated", () => {
			// when
			chart.hide("data3");
			
			chart.$.bar.bars.each(function(d) {
				if (d.id !== "data3") {
					expect(this.style.clipPath.length > 0).to.be.true;
				} else {
					expect(this.style.clipPath).to.be.equal("");
				}					
			});

			// when
			chart.show("data3");

			chart.$.bar.bars.each(function(d) {
				expect(this.style.clipPath).to.be.equal("");
			});
		})
	});

	describe("bar linear gradient", () => {
		beforeAll(() => {
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

		it("should generate customized liearGradient element", () => new Promise(done => {
			chart.load({
				columns: [
					["data", 10, 20, 30, 40]
				],
				done() {
					expect(chart.$.defs.select("linearGradient").empty()).to.be.false;
					done(1);
				}
			});
		}));

	});

	describe("bar overlap", () => {
		beforeAll(() => {
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
					const xPos = +bar[i].getAttribute("d").match(re)?.[1] || 0;
					const expectedX = t - width[id] / 2;

					expect(xPos).to.be.closeTo(expectedX, 1);
				});
			});
		});
	});

	describe("bar position", () => {
		beforeAll(() => {
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
				"M74.875,426V39.63636363636365 H224.625 V426z",
				"M374.375,426V221.5747955747956 H524.125 V426z"
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
		beforeAll(() => {
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
		beforeAll(() => {
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

		it("check data label shown #1", () => new Promise(done => {
			checkLabel([1000, -1000]);

			// when
			chart.hide("data2");

			setTimeout(() => {
				checkLabel([230, -230, -1000]);
				done(1);
			}, 350);
		}));

		it("check data label shown #2", () => new Promise(done => {
			// when
			chart.hide(["data2", "data4"]);

			setTimeout(() => {
				checkLabel([230, -230]);
				done(1);
			}, 350);
		}));

		it("check data label shown #3", () => new Promise(done => {
			// when
			chart.hide(["data1", "data2", "data4"]);

			setTimeout(() => {
				checkLabel([-30, -230]);
				done(1);
			}, 350);
		}));
	});

	describe("bar width on zoom", () => {
		beforeAll(() => {
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

		it("should maintain width size after toggle", () => new Promise(done => {
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

				done(1);
			});
		}));
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
				"M59.900000000000006,297.21212121212125V168.4242424242424 H239.6 V297.21212121212125z",
				"M359.4,168.4242424242424V39.63636363636365 H539.0999999999999 V168.4242424242424z",
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
				"data1": [
				  "M58.900000000000006,213.5V124.95833333333331 H147.25 V213.5z",
				  "M353.4,124.95833333333331V36.41666666666668 H441.75 V124.95833333333331z",
				],
				"data2": [
				  "M147.25,390.5833333333333V213.5 H235.6 V390.5833333333333z",
				  "M441.75,346.3125V328.6041666666667 H530.1 V346.3125z",
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
				"data1": [
				  "M29.450000000000003,302.04166666666663V213.5 H73.625 V302.04166666666663z",
				  "M176.7,302.04166666666663V124.95833333333331 H220.875 V302.04166666666663z",
				  "M323.95,213.5V124.95833333333331 H368.125 V213.5z",
				  "M471.2,124.95833333333331V36.41666666666668 H515.375 V124.95833333333331z",
				],
				"data2": [
				  "M73.625,302.04166666666663V390.5833333333333 H117.8 V302.04166666666663z",
				  "M220.875,302.04166666666663V346.3125 H265.05 V302.04166666666663z",
				  "M368.125,390.5833333333333V213.5 H412.3 V390.5833333333333z",
				  "M515.375,346.3125V328.6041666666667 H559.55 V346.3125z",
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
				"data1": [
					"M29.450000000000003,302.04166666666663V213.5 H117.8 V302.04166666666663z",
					"M176.7,302.04166666666663V124.95833333333331 H265.04999999999995 V302.04166666666663z",
					"M323.95,213.5V124.95833333333331 H412.29999999999995 V213.5z",
					"M471.2,124.95833333333331V36.41666666666668 H559.55 V124.95833333333331z",
				  ],
				  "data2": [
					"M29.450000000000003,302.04166666666663V390.5833333333333 H117.8 V302.04166666666663z",
					"M176.7,302.04166666666663V346.3125 H265.04999999999995 V302.04166666666663z",
					"M323.95,390.5833333333333V257.77083333333337 H412.29999999999995 V390.5833333333333z",
					"M471.2,346.3125V328.6041666666667 H559.55 V346.3125z",
				  ],
			};

			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPathMap[d.id][i]);
			});
		});
	});

	describe("rotated & inverted axis", () => {
		beforeAll(() => {
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

	describe("bar.connectLine", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", -30, [30, 200], 150, 400, -150, 250],
						["data2", 100, -100, 200, -150, 50],
						["data3", -230, 200, 200, -300, 250, 250],
						["data4", 100, 200, 100, 150, 50]
					],
					type: "bar", 
					groups: [
						[
							"data1",
							"data2"
						]
					]
				  },
				axis: {
					rotated: true
				},
				bar: {
					connectLine: "start-end"
				}
			};
		});

		it("should generate connect line correctly", () => {
			const expected = [
				"M245.83333333333334,29.266666666666666L376.9444444444444,85.80000000000001 M265.5,99.93333333333334L344.1666666666667,156.4666666666667 M245.83333333333334,170.60000000000002L508.05555555555566,227.13333333333335 M245.83333333333334,241.26666666666668L147.5,297.8 M245.83333333333334,311.93333333333334L409.72222222222223,368.46666666666664z",
				"M245.83333333333334,29.266666666666666L180.2777777777778,85.80000000000001 M245.83333333333334,99.93333333333334L475.2777777777777,156.4666666666667 M344.1666666666667,170.60000000000002L147.5,227.13333333333335 M245.83333333333334,241.26666666666668L278.6111111111111,297.8z",
				"M245.83333333333334,43.39999999999999L376.9444444444444,99.93333333333334 M245.83333333333334,114.06666666666666L376.9444444444444,170.60000000000002 M245.83333333333334,184.73333333333335L49.16666666666666,241.26666666666668 M245.83333333333334,255.4L409.72222222222223,311.93333333333334 M245.83333333333334,326.06666666666666L409.72222222222223,382.59999999999997z",
				"M245.83333333333334,57.53333333333332L376.9444444444444,114.06666666666666 M245.83333333333334,128.2L311.3888888888889,184.73333333333335 M245.83333333333334,198.86666666666667L344.1666666666667,255.4 M245.83333333333334,269.5333333333333L278.6111111111111,326.06666666666666z"
			];

			chart.$.main.selectAll(".bb-bar-connectLine").each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected[i]);
			});
		});

		it("set options: bar.connectLine", () => {
			args.bar.connectLine = {
				data1: "start-start",
				data4: "end-end"
			};
		});

		it("should generate connect line only specified.", () => {
			expect(chart.$.main.selectAll(".bb-bar-connectLine").size()).to.be.equal(2);
		});

		it("set options: bar.connectLine", () => {
			args.bar.connectLine = {
				data1: "start-start",
				data2: "start-end",
				data3: "end-start",
				data4: "end-end"
			};
		});

		it("should generate different connect line per data correctly", () => {
			const expected = [
				"M245.83333333333334,29.266666666666666L265.5,85.80000000000001 M265.5,99.93333333333334L245.83333333333334,156.4666666666667 M245.83333333333334,170.60000000000002L245.83333333333334,227.13333333333335 M245.83333333333334,241.26666666666668L245.83333333333334,297.8 M245.83333333333334,311.93333333333334L245.83333333333334,368.46666666666664z",
				"M245.83333333333334,29.266666666666666L180.2777777777778,85.80000000000001 M245.83333333333334,99.93333333333334L475.2777777777777,156.4666666666667 M344.1666666666667,170.60000000000002L147.5,227.13333333333335 M245.83333333333334,241.26666666666668L278.6111111111111,297.8z",
				"M95.05555555555557,43.39999999999999L245.83333333333334,99.93333333333334 M376.9444444444444,114.06666666666666L245.83333333333334,170.60000000000002 M376.9444444444444,184.73333333333335L245.83333333333334,241.26666666666668 M49.16666666666666,255.4L245.83333333333334,311.93333333333334 M409.72222222222223,326.06666666666666L245.83333333333334,382.59999999999997z",
				"M311.3888888888889,57.53333333333332L376.9444444444444,114.06666666666666 M376.9444444444444,128.2L311.3888888888889,184.73333333333335 M311.3888888888889,198.86666666666667L344.1666666666667,255.4 M344.1666666666667,269.5333333333333L278.6111111111111,326.06666666666666z"
			];

			chart.$.main.selectAll(".bb-bar-connectLine").each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected[i]);
			});
		});

		it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("should generate connect line correctly in rotated axis", () => {
			const expected = [
				"M245.83333333333334,29.266666666666666L265.5,85.80000000000001 M265.5,99.93333333333334L245.83333333333334,156.4666666666667 M245.83333333333334,170.60000000000002L245.83333333333334,227.13333333333335 M245.83333333333334,241.26666666666668L245.83333333333334,297.8 M245.83333333333334,311.93333333333334L245.83333333333334,368.46666666666664z",
				"M245.83333333333334,29.266666666666666L180.2777777777778,85.80000000000001 M245.83333333333334,99.93333333333334L475.2777777777777,156.4666666666667 M344.1666666666667,170.60000000000002L147.5,227.13333333333335 M245.83333333333334,241.26666666666668L278.6111111111111,297.8z",
				"M95.05555555555557,43.39999999999999L245.83333333333334,99.93333333333334 M376.9444444444444,114.06666666666666L245.83333333333334,170.60000000000002 M376.9444444444444,184.73333333333335L245.83333333333334,241.26666666666668 M49.16666666666666,255.4L245.83333333333334,311.93333333333334 M409.72222222222223,326.06666666666666L245.83333333333334,382.59999999999997z",
				"M311.3888888888889,57.53333333333332L376.9444444444444,114.06666666666666 M376.9444444444444,128.2L311.3888888888889,184.73333333333335 M311.3888888888889,198.86666666666667L344.1666666666667,255.4 M344.1666666666667,269.5333333333333L278.6111111111111,326.06666666666666z"
			];

			chart.$.main.selectAll(".bb-bar-connectLine").each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected[i]);
			});
		});

		it("set options: bar.connectLine", () => {
			args.bar.connectLine = "end-end";
		});

		it("should generate connect line correctly in rotated axis", () => {
			const expected = [
				"M226.16666666666669,29.266666666666666L376.9444444444444,85.80000000000001 M376.9444444444444,99.93333333333334L344.1666666666667,156.4666666666667 M344.1666666666667,170.60000000000002L508.05555555555566,227.13333333333335 M508.05555555555566,241.26666666666668L147.5,297.8 M147.5,311.93333333333334L409.72222222222223,368.46666666666664z",
				"M311.3888888888889,29.266666666666666L180.2777777777778,85.80000000000001 M180.2777777777778,99.93333333333334L475.2777777777777,156.4666666666667 M475.2777777777777,170.60000000000002L147.5,227.13333333333335 M147.5,241.26666666666668L278.6111111111111,297.8z",
				"M95.05555555555557,43.39999999999999L376.9444444444444,99.93333333333334 M376.9444444444444,114.06666666666666L376.9444444444444,170.60000000000002 M376.9444444444444,184.73333333333335L49.16666666666666,241.26666666666668 M49.16666666666666,255.4L409.72222222222223,311.93333333333334 M409.72222222222223,326.06666666666666L409.72222222222223,382.59999999999997z",
				"M311.3888888888889,57.53333333333332L376.9444444444444,114.06666666666666 M376.9444444444444,128.2L311.3888888888889,184.73333333333335 M311.3888888888889,198.86666666666667L344.1666666666667,255.4 M344.1666666666667,269.5333333333333L278.6111111111111,326.06666666666666z"
			]

			chart.$.main.selectAll(".bb-bar-connectLine").each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected[i]);
			});
		});

		it("set options: bar.connectLine", () => {
			args.bar.connectLine = {
				data2: "start-start",
				data3: "end-end"
			};
		});

		it("should generate connect line only specified in rotated axis", () => {
			expect(chart.$.main.selectAll(".bb-bar-connectLine").size()).to.be.equal(2);
		});
	});
});
