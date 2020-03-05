/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {select as d3Select} from "d3-selection";
import {format as d3Format} from "d3-format";
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import {isNumber} from "../../src/internals/util";

describe("DATA", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	const checkXY = function(x, y, prefix = "c", delta = {x: 1, y: 1}) {
		if (isNumber(delta)) {
			delta = {x: delta, y: delta};
		}

		return function(d, i) {
			const node = d3Select(this);

			expect(+node.attr(`${prefix}x`)).to.be.closeTo(x[i], delta.x);
			expect(+node.attr(`${prefix}y`)).to.be.closeTo(y[i], delta.y);
		};
	};

	const checkDateVal = data => {
		data.forEach((v, i) => {
			expect(+v).to.be.equal(+new Date(2013, 0, i + 1, 0, 0, 0));
		});
	};

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

			chart.internal.main.selectAll(`.${CLASS.circles}-data1 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy));
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

			main.selectAll(`.${CLASS.circles}-443 .${CLASS.circle}`)
				.each(checkXY(expectedCx[443], expectedCy[443]));

			main.selectAll(`.${CLASS.circles}-995 .${CLASS.circle}`)
				.each(checkXY(expectedCx[995], expectedCy[995]));
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

		after(() => {
			args = {};
		})

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

			main.selectAll(`.${CLASS.circles}-443 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[443]));

			main.selectAll(`.${CLASS.circles}-995-996 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[995]));

			main.selectAll(`.${CLASS.circles}-112-0- .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[112]));

			main.selectAll(`.${CLASS.circles}-223-0--224 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[223]));

			main.selectAll(`.${CLASS.circles}-334-1--0--335 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[334]));

			main.selectAll(`.${CLASS.circles}-556-557-558-0- .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy[556]));

			main.selectAll(`.${CLASS.circles}-778-889 .${CLASS.circle}`)
				.each(checkXY(expectedCx, expectedCy["778.889"]));
		});
	});

	describe("load rows", () => {
		before(() => {
			args = {
				data: {
					rows: [
						["A", "B", "C"],
						[90, 120, 300],
						[40, 160, 240],
						[50, 200, 290]
					]
				}
			};
		});

		it("should load rows data correctly", () => {
			const data = chart.data();
			const dataName = args.data.rows[0];

			expect(data.length).to.be.equal(dataName.length);

			data.forEach((v, i) => {
				expect(v.id).to.be.equal(dataName[i]);
			});
		});
	});

	describe("XHR data loading", () => {
		const path = "/base/spec/assets/data/";

		before(() => {
			args = {
				data: {
					url: `${path}test.csv`
				}
			};
		});

		it("check for CSV file loading", done => {
			setTimeout(() => {
				const data = chart.data();

				expect(chart.$.chart.selectAll("svg").size()).to.be.equal(1);
				expect(data).to.not.be.null;
				expect(data.length).to.be.equal(3);

				done();
			}, 500);
		});

		it("set options data.mimeType='json'", () => {
			args = {
				data: {
					url: `${path}test.json`,
					mimeType: "json"
				}
			}
		});

		it("check for JSON file loading", done => {
			setTimeout(() => {
				const data = chart.data();

				expect(data).to.not.be.null;
				expect(data.length).to.be.equal(3);
				expect(chart.data.values("data1")).to.deep.equal([220, 240, 270, 250, 280]);

				done();
			}, 500);
		});
	});

	describe("check data.order", () => {
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

		it("set options data.order=desc", () => {
			args.data.order = "desc";
		});

		it("orderTargets shouldn't be changing its order", () => {
			const data = chart.data();
			const targetIds = data.map(v => v.id);

			// when
			chart.internal.orderTargets(data);

			data.map(v => v.id).forEach((v, i) => {
				expect(v).to.be.equal(targetIds[i]);
			});
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
				const xs = chart.internal.data.xs;

				expect(Object.keys(xs).length).to.be.equal(3);
				expect(xs.data1.length).to.be.equal(6);
				expect(xs.data2.length).to.be.equal(6);
				expect(xs.data3.length).to.be.equal(6);
			});

			it("should have integer index as x", () => {
				const xs = chart.internal.data.xs;

				for (let i = 0; i < xs.data3.length; i++) {
					expect(xs.data1[i]).to.be.equal(i);
					expect(xs.data2[i]).to.be.equal(i);
					expect(xs.data3[i]).to.be.equal(i);
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
					const xs = chart.internal.data.xs;

					expect(Object.keys(xs).length).to.be.equal(2);
					expect(xs.data1.length).to.be.equal(3);
					expect(xs.data2.length).to.be.equal(3);
				});

				it("should have Date object as x", () => {
					const xs = chart.internal.data.xs;

					checkDateVal(xs.data1);
					checkDateVal(xs.data2);
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
						const xs = chart.internal.data.xs;

						expect(Object.keys(xs).length).to.be.equal(2);
						expect(xs.data1.length).to.be.equal(3);
						expect(xs.data2.length).to.be.equal(3);
					});

					it("should have Date object as x", () => {
						const xs = chart.internal.data.xs;

						checkDateVal(xs.data1);
						checkDateVal(xs.data2);
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
					const xs = chart.internal.data.xs;

					expect(Object.keys(xs).length).to.be.equal(2);
					expect(xs.data1.length).to.be.equal(2);
					expect(xs.data2.length).to.be.equal(2);
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

					chart.internal.main.selectAll(`.${CLASS.axisX} g.tick text`).each(function(d, i) {
						expect(d3Select(this).text()).to.be.equal(expected[i]);
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
					const xs = chart.internal.data.xs;

					expect(Object.keys(xs).length).to.be.equal(2);
					expect(xs.data1.length).to.be.equal(2);
					expect(xs.data2.length).to.be.equal(2);
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`).each(function(d, i) {
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
					chart.internal.main.selectAll(`.${CLASS.texts}-${key} text.${CLASS.text}`)
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
				const main = chart.internal.main;

				main.selectAll(`.${CLASS.texts}-data1 text`).each(function(d, i) {
					expect(d3Select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
				});

				main.selectAll(`.${CLASS.texts}-data2 text`).each(function(d, i) {
					expect(d3Select(this).text()).to.equal(`${args.data.columns[1][i + 1]}`);
				});

				main.selectAll(`.${CLASS.texts}-data3 text`).each(function(d, i) {
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
					const main = chart.internal.main;

					main.selectAll(`.${CLASS.texts}-data1 text`).each(function(d, i) {
						expect(d3Select(this).text()).to.equal(`${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(`.${CLASS.texts}-data2 text`).each(function() {
						expect(d3Select(this).text()).to.be.equal("");
					});

					main.selectAll(`.${CLASS.texts}-data3 text`).each(function() {
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
					const main = chart.internal.main;

					main.selectAll(`.${CLASS.texts}-data1 text`).each(function(d, i) {
						expect(d3Select(this).text()).to.equal(`$${args.data.columns[0][i + 1]}`);
					});

					main.selectAll(`.${CLASS.texts}-data2 text`).each(function() {
						expect(d3Select(this).text()).to.equal("");
					});

					main.selectAll(`.${CLASS.texts}-data3 text`).each(function() {
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
								format: v => (v === null ? "Not Applicable" : d3Format("$")(v))
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
					const expectedYs = [68, 50, 68, 423];
					const expectedXs = [75, 225, 374, 524];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(189, 1);
					expect(domain[1]).to.be.closeTo(201, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [375, 40, 375, 422];
					const expectedXs = [6, 202, 397, 593];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(231.5, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [51, 145, 235, 327];
					const expectedXs = [488.5, 514, 488.5, 4];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 4));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(188, 1);
					expect(domain[1]).to.be.closeTo(202, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 130, 249, 370];
					const expectedXs = [76, 526, 76, 4];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(0, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [385, 11, 385, 12];
					const expectedXs = [74, 221, 368, 515];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 5));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-215, 2);
					expect(domain[1]).to.be.closeTo(25, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [394, 60, 394, 39];
					const expectedXs = [6, 198, 391, 583];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2);
					expect(domain[1]).to.be.closeTo(0, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 162, 269, 375];
					const expectedXs = [80, 584, 80, 514];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 10, y: 5}));
				});

				it("set options data.type='line' and padding", () => {
					args.data.type = "line";
					args.padding.left = 50;
					args.padding.bottom = 0;
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-222, 2); // -220.4755083436658 vs -223.64837940981494
					expect(domain[1]).to.be.closeTo(24, 1);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [69, 527, 69, 527]; // 72.50132230092231

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [392, 43, 52, 215];
					const expectedXs = [74, 221, 368, 515];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 10, y: 3}));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-243, 2);
					expect(domain[1]).to.be.closeTo(253, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [395, 40, 49, 211];
					const expectedXs = [6, 198, 391, 583];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-256, 4);
					expect(domain[1]).to.be.closeTo(261, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [72, 525, 513, 295];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", {x: 4, y: 2}));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-255, 5);
					expect(domain[1]).to.be.closeTo(262, 2);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [70, 527, 515, 297];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 3);
					expect(domain[1]).to.be.closeTo(886, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [385, 317, 370, 164];
					const expectedXs = [74, 225, 374, 524];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-95, 3);
					expect(domain[1]).to.be.closeTo(885, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [344, 284, 331, 144];
					const expectedXs = [6, 202, 397, 593];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(0, 1);
					expect(domain[1]).to.be.closeTo(890, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [57, 150, 77, 362];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 2));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-87, 4);
					expect(domain[1]).to.be.closeTo(889, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [107, 192, 125, 386];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-886, 6);
					expect(domain[1]).to.be.closeTo(0, 6);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [50, 117, 64, 270];
					const expectedXs = [74, 221, 368, 515];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 10));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-885, 3);
					expect(domain[1]).to.be.closeTo(95, 3);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [90, 151, 103, 290];
					const expectedXs = [6, 198, 391, 583];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 6);
					expect(domain[1]).to.be.closeTo(0, 5);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [57, 163, 269, 375];
					const expectedXs = [533, 441, 513, 232];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
						.each(checkXY(expectedXs, expectedYs, "", 3));
				});

				it("set options data.type='line'", () => {
					args.data.type = "line";
				});

				it("should have y domain with proper padding #2", () => {
					const domain = chart.internal.y.domain();

					expect(domain[0]).to.be.closeTo(-900, 7);
					expect(domain[1]).to.be.closeTo(97, 7);
				});

				it("should locate labels above each data point", () => {
					const expectedYs = [9, 147, 286, 424];
					const expectedXs = [479, 397, 461, 206];

					chart.internal.main.selectAll(`.${CLASS.texts}-data1 text`)
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
				const texts = chart.internal.main.selectAll(`.${CLASS.chartText} text.${CLASS.text}`);

				expect(texts.size()).to.be.equal(data.length);
			});

			it("should be zerobased", () => {
				args.scatter = {zerobased: true};
				chart = util.generate(args);

				const tickNodes = chart.$.svg.select(`.${CLASS.axisY}`).selectAll("g.tick");
				const translateValues = [426, 389, 352, 314, 277, 240, 202, 165, 127, 90, 53, 15];

				tickNodes.each(function(d, i) {
					expect(util.parseNum(this.getAttribute("transform"))).to.be.closeTo(translateValues[i], 1);
				});
			});

			it("should not be zerobased", () => {
				args.scatter = {zerobased: false};
				chart = util.generate(args);

				const tickNodes = chart.$.svg.select(`.${CLASS.axisY}`).selectAll("g.tick");
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
				const points = chart.internal.main.selectAll(`.${CLASS.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(data.length);
			});

			it("should not draw points for the linechart", () => {
				const id = "data2";
				const points = chart.internal.main.selectAll(`.${CLASS.shapes}-${id} circle`);

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
				const points = chart.internal.main.selectAll(`.${CLASS.shapes}-${id} circle`);

				expect(points.size()).to.be.equal(data.length);
			});

			it("should not draw points for the second line", () => {
				const id = "data2";
				const points = chart.internal.main.selectAll(`.${CLASS.shapes}-${id} circle`);

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
						text = main.select(`.${CLASS.texts}-data2 .${CLASS.text}-3`);
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

				chart.$.line.circles.each(function(d, i) {
					expect(+this.getAttribute("cy")).to.be.above(+texts[i].getAttribute("y"));
				});
			});

			it("set options axis.rotated=true", () => {
				args.axis.rotated = true;
			});

			it("label text should locate above the data points", () => {
				const texts = chart.$.text.texts.nodes();

				chart.$.line.circles.each(function(d, i) {
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
	});

	describe("inner functions", () => {
		it("should check returns of mapToTargetIds", () => {
			const internal = chart.internal;
			let data = [1, 2, 3];
			let newData = internal.mapToTargetIds(data);

			expect(newData).to.deep.equal(data);
			expect(newData).to.not.equal(data);

			// Given
			data = 1;

			// When
			newData = internal.mapToTargetIds(data);

			// Then
			expect(newData).to.deep.equal([data]);
			expect(newData).to.not.equal([data]);

			// Given
			data = internal.data.targets.map(d => d.id);

			// When
			newData = internal.mapToTargetIds();

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

	describe("data.regions", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 200, 400, 150, 250]
					],
					regions: {
						data1: [
							{
								start: 1,
								end: 2,
								style: {
									dasharray: "5 3"
								}
							},
							{
								start: 3
							}
						]
					}
				}
			};
		});

		const checkPathLengths = expected => {
			const line = chart.internal.main.select(`path.${CLASS.line}-data1`);
			const path = line.attr("d");

			expect(path.split("M").length).to.be.equal(expected.M);
			expect(path.split("L").length).to.be.equal(expected.L);
		}

		it("should be generating correct dashed path data", () => {
			checkPathLengths({M: 118, L: 119});
		});

		it("set options for null data", () => {
			args = {
				data: {
					columns: [
						["data1", null, 100, 200, null, 100, 20, 30, null, null]
					],
					regions: {
						data1: [
							{
								start: 0,
								end: 2,
								style: {
									dasharray: "5 3"
								}
							},
							{
								start: 5
							}
						]
					}
				}
			};
		});

		it("should be generating correct dashed path data", () => {
			checkPathLengths({M: 38, L: 37});
		});

		it("set options line.connectNull=true", () => {
			args.line = {connectNull: true};
		});

		it("should be generating correct dashed path data", () => {
			checkPathLengths({M: 37, L: 38});
		});
	});

	describe("data.stack", () => {
		let chartHeight = 0;

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 230, 50, 300],
						["data2", 198, 87, 580]
					],
					type: "bar",
					groups: [
						["data1", "data2"]
					],
					stack: {
						normalize: true
					}
				}
			};
		});

		it("check for the normalized y axis tick in percentage", () => {
			const tick = chart.$.main.selectAll(`.${CLASS.axisY} .tick tspan`);

			// check for the y axis to be in percentage
			tick.each(function (v, i) {
				expect(this.textContent).to.be.equal(`${i * 10}%`);
			});
		});

		it("check for the normalized bar's height", () => {
			chartHeight = +chart.$.main.selectAll(`.${CLASS.zoomRect}`).attr("height") - 1;
			const bars = chart.$.bar.bars.nodes().concat();

			bars.splice(0, 3).forEach((v, i) => {
				expect(v.getBBox().height + bars[i].getBBox().height).to.be.equal(chartHeight);
			});
		});

		it("check when hiding data", done => {
			// when
			chart.hide("data1");

			setTimeout(() => {
				chart.$.main.selectAll(`.${CLASS.target}-data2 path`).each(function() {
					expect(this.getBBox().height).to.be.equal(chartHeight);
				});

				done();
			}, 300);
		});

		it("set options data.columns", () => {
			args.data.columns = [
				["data1", 230, null, 300],
				["data2", 198, 87, null]
			];

			args.data.hide = ["false-data"];
		});

		it("check for null data", done => {
			const main = chart.$.main;
			const data1Bar = main.select(`.${CLASS.bars}-data1 .${CLASS.bar}-2`).node();
			const data2Bar = main.select(`.${CLASS.bars}-data2 .${CLASS.bar}-1`).node();

			expect(data1Bar.getBBox().height).to.be.equal(chartHeight);
			expect(data2Bar.getBBox().height).to.be.equal(chartHeight);

			// when
			chart.hide("data2");

			setTimeout(() => {
				expect(data2Bar.getBBox().height).to.be.equal(0);

				done();
			}, 500)
		});

		it("set options data.type='area'", () => {
			args.data.type = "area";
			args.data.columns = [
				["data1", 200, 387, 123],
				["data2", 200, 387, 123]
			];
		});

		it("check for the normalized area's height", () => {
			let areaHeight = 0;

			chart.$.main.selectAll(`.${CLASS.areas} path`).each(function() {
				areaHeight += this.getBBox().height;
			});

			expect(areaHeight).to.be.equal(chartHeight);
		});

		it("check for the normalized default tooltip", () => {
			let tooltipValue = 0;

			// show tooltip
			chart.tooltip.show({index:1});

			chart.$.tooltip.selectAll(".value").each(function() {
				tooltipValue += parseInt(this.textContent);
			});

			expect(tooltipValue).to.be.equal(100);
		});
	});

	describe("data.empty.label.text", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data", 50, 20, 10, 40, 15]
					],
					hide: ["data"],
					empty: {
						label: {
							text: "No Data"
						}
					}
				}
			};
		});

		it("check for empty label text", () => {
			const emptyLabelText = chart.$.main.select(`.${CLASS.text}.${CLASS.empty}`);

			expect(emptyLabelText.style("display")).to.be.equal("block");
		});

		it("check the visiblity on data toggles", done => {
			const emptyLabelText = chart.$.main.select(`.${CLASS.text}.${CLASS.empty}`);

			// display data
			chart.toggle();

			expect(emptyLabelText.style("display")).to.be.equal("none");

			// hide data
			chart.toggle();

			setTimeout(() => {
				expect(emptyLabelText.style("display")).to.be.equal("block");
				done();
			}, 300)
		});

		it("set options empty.label.text=''", () => {
			args.data.empty.label.text = "";
		});

		it("shouldn't be generating empty label text node", () => {
			const emptyLabelText = chart.$.main.select(`.${CLASS.text}.${CLASS.empty}`);

			expect(emptyLabelText.empty()).to.be.true;
		});
	});
});
