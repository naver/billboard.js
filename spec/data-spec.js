/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

describe("DATA", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("load json #1", () => {
		before(() => {
			args = {
				data: {
					json: {
						data1: [30, 20, 50],
						data2: [200, 130, 90]
					}
				}
			};
		});

		it("should draw correctly", () => {
			const expectedCx = [6, 299, 593];
			const expectedCy = [371, 391, 332];

			chart.internal.main.selectAll(".bb-circles-data1 .bb-circle").each(function (d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], +1);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[i], +1);
			});
		});
	});

	describe("load json #2", () => {
		before(() => {
			args = {
				data: {
					json: [{
						"date": "2014-06-03",
						"443": "3000",
						"995": "500"
					}, {
						"date": "2014-06-04",
						"443": "1000"
					}, {
						"date": "2014-06-05",
						"443": "5000",
						"995": "1000"
					}],
					keys: {
						x: "date",
						value: ["443", "995"]
					}
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("should draw correctly", () => {
			const expectedCx = {443: [98, 294, 490], 995: [98, 294, 490]};
			const expectedCy = {443: [194, 351, 36], 995: [391, 430, 351]};
			const main = chart.internal.main;

			main.selectAll(".bb-circles-443 .bb-circle").each(function (d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[443][i], 1);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[443][i], 1);
			});

			main.selectAll(".bb-circles-995 .bb-circle").each(function (d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[995][i], 1);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[995][i], 1);
			});
		});
	});

	describe("load json #3", () => {
		before(() => {
			args = {
				data: {
					json: [{
						"date": "2014-06-03",
						"443": "3000",
						"995": {"996": "500"},
						"112": ["600"],
						"223": [{"224": "100"}],
						"334": [[], [{"335": "300"}]],
						"556": {"557": {"558": ["1000"]}},
 						"778.889" : "700"
					}, {
						"date": "2014-06-04",
						"443": "1000",
						"112": ["700"],
						"223": [{"224": "200"}],
						"556": {"557": {"558": ["2000"]}},
						"778.889" : "300"
					}, {
						"date": "2014-06-05",
						"995": {"996": "1000"},
						"112": ["800"],
						"223": [{"224": "300"}],
						"443": "5000",
						"334": [[], [{"335": "500"}]],
						"556": {"557": {"558": ["3000"]}},
 						"778.889" : "800"
					}],
					keys: {
						x: "date",
						value: ["443", "995.996", "112[0]", "223[0].224", "334[1][0].335", "556.557.558[0]", "778.889"]
					}
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("should draw nested JSON correctly", () => {
			const main = chart.internal.main;
			const expectedCx = [98, 294, 490];
			const expectedCy = {
				443: [181, 326, 36],
				995: [362, 398, 326],
				112: [354, 347, 340],
				223: [391, 383, 376],
				334: [376, 398, 362],
				556: [326, 253, 181],
				"778.889": [347, 376, 340]
			};

			main.selectAll(".bb-circles-443 .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 1);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[443][i], 1);
			});

			main.selectAll(".bb-circles-995-996 .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[995][i], 1);
			});


			main.selectAll(".bb-circles-112-0- .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[112][i], 1);
			});

			main.selectAll(".bb-circles-223-0--224 .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[223][i], 1);
			});

			main.selectAll(".bb-circles-334-1--0--335 .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[334][i], 1);
			});

			main.selectAll(".bb-circles-556-557-558-0- .bb-circle").each(function(d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy[556][i], 1);
			});

			main.selectAll(".bb-circles-778-889 .bb-circle").each(function (d, i) {
				const circle = d3.select(this);

				expect(+circle.attr("cx")).to.be.closeTo(expectedCx[i], 0);
				expect(+circle.attr("cy")).to.be.closeTo(expectedCy["778.889"][i], 1);
			});
		});
	});

	describe("function in data.order", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					],
					order: () => 0
				}
			};
		});

		it("should return false in isOrderAsc and isOrderDesc functions", () => {
			expect(chart.internal.isOrderAsc() || chart.internal.isOrderDesc()).to.be.equal(false);
		});
	});

	describe("data.xs", () => {
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

		describe("normal x", () => {
			it("should have correct number of xs for each", () => {
				expect(Object.keys(chart.internal.data.xs).length).to.be.equal(3);
				expect(chart.internal.data.xs.data1.length).to.be.equal(6);
				expect(chart.internal.data.xs.data2.length).to.be.equal(6);
				expect(chart.internal.data.xs.data3.length).to.be.equal(6);
			});

			it("should have integer index as x", () => {
				for (let i = 0; i < chart.internal.data.xs.data3.length; i++) {
					expect(chart.internal.data.xs.data1[i]).to.be.equal(i);
					expect(chart.internal.data.xs.data2[i]).to.be.equal(i);
					expect(chart.internal.data.xs.data3[i]).to.be.equal(i);
				}
			});
		});

		describe("timeseries x", () => {
			describe("without xFormat", () => {
				before(() => {
					args = {
						data: {
							x: "date",
							columns: [
								["date", "2013-01-01", "2013-01-02", "2013-01-03"],
								["data1", 30, 200, 100],
								["data2", 130, 300, 200]
							]
						},
						axis: {
							x: {
								type: "timeseries"
							}
						}
					};
				});

				it("should have correct number of xs", () => {
					expect(Object.keys(chart.internal.data.xs).length).to.be.equal(2);
					expect(chart.internal.data.xs.data1.length).to.be.equal(3);
					expect(chart.internal.data.xs.data2.length).to.be.equal(3);
				});

				it("should have Date object as x", () => {
					const xs = chart.internal.data.xs;

					expect(+xs.data1[0]).to.be.equal(+new Date(2013, 0, 1, 0, 0, 0));
					expect(+xs.data1[1]).to.be.equal(+new Date(2013, 0, 2, 0, 0, 0));
					expect(+xs.data1[2]).to.be.equal(+new Date(2013, 0, 3, 0, 0, 0));
					expect(+xs.data2[0]).to.be.equal(+new Date(2013, 0, 1, 0, 0, 0));
					expect(+xs.data2[1]).to.be.equal(+new Date(2013, 0, 2, 0, 0, 0));
					expect(+xs.data2[2]).to.be.equal(+new Date(2013, 0, 3, 0, 0, 0));
				});
			});

			describe("with xFormat", () => {
				describe("timeseries x with xFormat", () => {
					before(() => {
						args = {
							data: {
								x: "date",
								xFormat: "%Y%m%d",
								columns: [
									["date", "20130101", "20130102", "20130103"],
									["data1", 30, 200, 100],
									["data2", 130, 300, 200]
								]
							},
							axis: {
								x: {
									type: "timeseries"
								}
							}
						};
					});

					it("should have correct number of xs", () => {
						expect(Object.keys(chart.internal.data.xs).length).to.be.equal(2);
						expect(chart.internal.data.xs.data1.length).to.be.equal(3);
						expect(chart.internal.data.xs.data2.length).to.be.equal(3);
					});

					it("should have Date object as x", () => {
						const xs = chart.internal.data.xs;

						expect(+xs.data1[0]).to.be.equal(+new Date(2013, 0, 1, 0, 0, 0));
						expect(+xs.data1[1]).to.be.equal(+new Date(2013, 0, 2, 0, 0, 0));
						expect(+xs.data1[2]).to.be.equal(+new Date(2013, 0, 3, 0, 0, 0));
						expect(+xs.data2[0]).to.be.equal(+new Date(2013, 0, 1, 0, 0, 0));
						expect(+xs.data2[1]).to.be.equal(+new Date(2013, 0, 2, 0, 0, 0));
						expect(+xs.data2[2]).to.be.equal(+new Date(2013, 0, 3, 0, 0, 0));
					});
				});
			});
		});

		describe("milliseconds timeseries x", () => {
			describe("as date string", () => {
				before(() => {
					args = {
						data: {
							x: "date",
							xFormat: "%Y-%m-%d %H:%M:%S.%L",
							columns: [
								["date", "2014-05-20 17:25:00.123", "2014-05-20 17:30:00.345"],
								["data1", 30, 200],
								["data2", 130, 300]
							]
						},
						axis: {
							x: {
								type: "timeseries",
								tick: {
									format: "%Y-%m-%d %H:%M:%S.%L",
									multiline: false
								}
							}
						}
					};
				});

				it("should have correct number of xs", () => {
					expect(Object.keys(chart.internal.data.xs).length).to.be.equal(2);
					expect(chart.internal.data.xs.data1.length).to.be.equal(2);
					expect(chart.internal.data.xs.data2.length).to.be.equal(2);
				});

				it("should have Date object as x", () => {
					const xs = chart.internal.data.xs;

					expect(+xs.data1[0]).to.be.equal(+new Date(2014, 4, 20, 17, 25, 0, 123));
					expect(+xs.data1[1]).to.be.equal(+new Date(2014, 4, 20, 17, 30, 0, 345));
					expect(+xs.data2[0]).to.be.equal(+new Date(2014, 4, 20, 17, 25, 0, 123));
					expect(+xs.data2[1]).to.be.equal(+new Date(2014, 4, 20, 17, 30, 0, 345));
				});

				it("should have milliseconds tick format", () => {
					const expected = ["2014-05-20 17:25:00.123", "2014-05-20 17:30:00.345"];

					chart.internal.main.selectAll(".bb-axis-x g.tick text").each(function(d, i) {
						expect(d3.select(this).text()).to.be.equal(expected[i]);
					});
				});
			});

			describe("as unixtime number", () => {
				before(() => {
					args = {
						data: {
							x: "date",
							columns: [
								["date", 1417622461123, 1417622522345],
								["data1", 30, 200],
								["data2", 130, 300]
							]
						},
						axis: {
							x: {
								type: "timeseries",
								tick: {
									format: "%Y-%m-%d %H:%M:%S.%L"
								}
							}
						}
					};
				});

				it("should have correct number of xs", () => {
					expect(Object.keys(chart.internal.data.xs).length).to.be.equal(2);
					expect(chart.internal.data.xs.data1.length).to.be.equal(2);
					expect(chart.internal.data.xs.data2.length).to.be.equal(2);
				});

				it("should have Date object as x", () => {
					const xs = chart.internal.data.xs;

					expect(+xs.data1[0]).to.be.equal(1417622461123);
					expect(+xs.data1[1]).to.be.equal(1417622522345);
					expect(+xs.data2[0]).to.be.equal(1417622461123);
					expect(+xs.data2[1]).to.be.equal(1417622522345);
				});
			});
		});
	});

	describe("data.label", () => {
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 3);
					});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 3);
					});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i] - 20, 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i] + 20, 3);
					});
				});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 3);
					});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 4);
					});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 3);
					});
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
					chart.internal.main.selectAll(`.bb-texts-${key} text.bb-text`).each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedTextY[key][i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedTextX[key][i], 4);
					});
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
				const main = chart.internal.main;

				main.selectAll(".bb-texts-data1 text").each(function(d, i) {
					expect(d3.select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
				});

				main.selectAll(".bb-texts-data2 text").each(function(d, i) {
					expect(d3.select(this).text()).to.equal(`${args.data.columns[1][i + 1]}`);
				});

				main.selectAll(".bb-texts-data3 text").each(function(d, i) {
					expect(d3.select(this).text()).to.equal(`${args.data.columns[2][i + 1]}`);
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
					const main = chart.internal.main;

					main.selectAll(".bb-texts-data1 text").each(function(d, i) {
						expect(d3.select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(".bb-texts-data2 text").each(function() {
						expect(d3.select(this).text()).to.be.equal("");
					});

					main.selectAll(".bb-texts-data3 text").each(function() {
						expect(d3.select(this).text()).to.be.equal("");
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
									data1: d3.format("$")
								}
							}
						}
					};
				});

				it("should have data labels on all data", () => {
					const main = chart.internal.main;

					main.selectAll(".bb-texts-data1 text").each(function(d, i) {
						expect(d3.select(this).text()).to.equal(`$${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(".bb-texts-data2 text").each(function() {
						expect(d3.select(this).text()).to.equal("");
					});

					main.selectAll(".bb-texts-data3 text").each(function() {
						expect(d3.select(this).text()).to.equal("");
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
				const domain = chart.internal.y.domain();

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
								format: v => (v === null ? "Not Applicable" : d3.format("$")(v))
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(227, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [67, 49, 67, 423];
					const expectedXs = [75, 225, 374, 524];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
				});

				it("set options data.type=line", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(189, 1);
					expect(domain[1]).to.be.closeTo(201, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [375, 40, 375, 422];
					const expectedXs = [6, 202, 397, 593];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(231.5, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [51, 145, 235, 327];
					const expectedXs = [488.5, 514, 488.5, 4];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
				});

				it("should update args", () => {
					args.data.type = "line";
					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(188, 1);
					expect(domain[1]).to.be.closeTo(202, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [9, 130, 249, 370];
					const expectedXs = [76, 526, 76, 4];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
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
									"Not Applicable" : d3.format("$")(v)
								)
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(0, 2);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [385, 11, 385, 12];
					const expectedXs = [74, 221, 368, 515];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 3);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(25, 2);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [394, 60, 394, 39];
					const expectedXs = [6, 198, 391, 583];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2);
					expect(domain[1]).to.be.closeTo(0, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [57, 162, 269, 375];
					const expectedXs = [80, 584, 80, 514];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 5);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 10);
					});
				});

				it("should update args", () => {
					args.data.type = "line";
					args.padding.left = 50;
					args.padding.bottom = 0;

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2); // -220.4755083436658 vs -223.64837940981494
					expect(domain[1]).to.be.closeTo(24, 1);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [69, 527, 69, 527]; // 72.50132230092231

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
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
									"Not Applicable" : d3.format("$")(v)
								)
							}
						}
					};
				});

				it("should have y domain with proper padding #1", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [392, 43, 52, 215];
					const expectedXs = [74, 221, 368, 515];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 10);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [395, 40, 49, 211];
					const expectedXs = [6, 198, 391, 583];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 10);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-256, 4);
					expect(domain[1]).to.be.closeTo(261, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [72, 525, 513, 295];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
				});

				it("should update args", () => {
					args.data.type = "line";
					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-255, 5);
					expect(domain[1]).to.be.closeTo(262, 2);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [70, 527, 515, 297];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 4);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 3);
					expect(domain[1]).to.be.closeTo(886, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [385, 317, 370, 164];
					const expectedXs = [74, 225, 374, 524];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-95, 3);
					expect(domain[1]).to.be.closeTo(885, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [344, 284, 331, 144];
					const expectedXs = [6, 202, 397, 593];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(890, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [57, 150, 77, 362];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-87, 4);
					expect(domain[1]).to.be.closeTo(889, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [107, 192, 125, 386];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-886, 3);
					expect(domain[1]).to.be.closeTo(0, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [50, 117, 64, 270];
					const expectedXs = [74, 221, 368, 515];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 3);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 10);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-885, 3);
					expect(domain[1]).to.be.closeTo(95, 3);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [90, 151, 103, 290];
					const expectedXs = [6, 198, 391, 583];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 4);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 10);
					});
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 6);
					expect(domain[1]).to.be.closeTo(0, 5);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [533, 441, 513, 232];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 3);
					});
				});

				it("should update args", () => {
					args.data.type = "line";

					expect(true).to.be.ok;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 7);
					expect(domain[1]).to.be.closeTo(97, 7);
				});

				it("should locate labels above each data point", () => {
					const texts = chart.internal.main.selectAll(".bb-texts-data1 text");
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [479, 397, 461, 206];

					texts.each(function(d, i) {
						const text = d3.select(this);

						expect(+text.attr("y")).to.be.closeTo(expectedYs[i], 2);
						expect(+text.attr("x")).to.be.closeTo(expectedXs[i], 2);
					});
				});
			});
		});
	});

	describe("inner functions", () => {
		it("should check returns of mapToTargetIds", () => {
			let data = [1, 2, 3];
			let newData = chart.internal.mapToTargetIds(data);

			expect(newData).to.deep.equal(data);
			expect(newData).to.not.equal(data);

			// Given
			data = 1;

			// When
			newData = chart.internal.mapToTargetIds(data);

			// Then
			expect(newData).to.deep.equal([data]);
			expect(newData).to.not.equal([data]);

			// Given
			data = chart.internal.data.targets.map(d => d.id);

			// When
			newData = chart.internal.mapToTargetIds();

			// Then
			expect(newData).to.deep.equal(data);
			expect(newData).to.not.equal(data);
		});
	});

	describe("data.onmin/onmax callbacks", () => {
		let minData;
		let maxData;

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 10, 100, 400, 150, 250],
						["data2", 10, 190, 95, 40, 15, 25]
					],
					onmin: d => {
						minData = d;
					},
					onmax: d => {
						maxData = d;
					}
				}
			};
		});

		it("check for onmin callback", done => {
			setTimeout(() => {
				expect(minData.length > 0).to.be.true;

				expect(minData[0].value).to.be.equal(10);
				expect(minData[0].value).to.be.equal(minData[1].value);
				expect(minData[0].id).to.not.be.equal(minData[1].id);

				done();
			}, 100);
		});

		it("check for onmax callback", done => {
			setTimeout(() => {
				expect(maxData.length > 0).to.be.true;

				expect(maxData[0].value).to.be.equal(400);
				expect(maxData[0].id).to.be.equal("data1");

				done();
			}, 100);
		});
	});
});
