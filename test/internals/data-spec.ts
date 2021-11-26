/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import sinon from "sinon";
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import {isNumber} from "../../src/module/util";

describe("DATA", () => {
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

			chart.$.main.selectAll(`.${CLASS.circles}-data1 .${CLASS.circle}`)
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
			const expectedCy = {443: [194, 351, 36], 995: [391, 0, 351]};
			const main = chart.$.main;

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
			const main = chart.$.main;
			const expectedCx = [98, 294, 490];
			const expectedCy = {
				443: [181, 326, 36],
				995: [362, 0, 326],
				112: [354, 347, 340],
				223: [391, 383, 376],
				334: [376, 0, 362],
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
		const path = "/base/test/assets/data/";

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

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1", 130],
						["data2", 30],
						["data3", 100],
					],
					type: "bar",
					groups: [
						["data1", "data2", "data3"]
					],
					order: function(a, b) {
						const reducer = (p, c) => p + Math.abs(c.value);
						const aSum = a.values.reduce(reducer, 0);
						const bSum = b.values.reduce(reducer, 0);
				
						return aSum - bSum;
					}
				  }
			};
		});

		it("check for ascending", () => {
			const data = [];

			chart.$.bar.bars.each(function(d) {
				data.push([d.id, this.getBoundingClientRect().y]);
			});

			data.sort((a, b) => a[1] - b[1]);

			expect(
				data.every((v, i, array) => {
					if (i === 0) {
						return true;
					}

					return v[1] > array[i - 1][1];
				})
			).to.be.true;
		});

		it("set options data.order", () => {
			args.data.order = function(a, b) {
				const reducer = (p, c) => p + Math.abs(c.value);
				const aSum = a.values.reduce(reducer, 0);
				const bSum = b.values.reduce(reducer, 0);
		
				return bSum - aSum;
			};
		});

		it("check for descending", () => {
			const data = [];

			chart.$.bar.bars.each(function(d) {
				data.push([d.id, this.getBoundingClientRect().y]);
			});

			data.sort((a, b) => b[1] - a[1]);

			expect(
				data.every((v, i, array) => {
					if (i === 0) {
						return true;
					}

					return v[1] < array[i - 1][1];
				})
			).to.be.true;
		});

		it("set options data.order", () => {
			args.data.type = "pie";
			args.data.order = (a, b) => a - b;
		});

		it("check for ascending", () => {
			const data = [];

			chart.$.arc.selectAll(`g.${CLASS.shapes}`).each(function(d, i) {
				data.push([d.data.id, d.startAngle]);
			});

			data.sort((a, b) => a[1] - b[1]);
			expect(
				data.every((v, i, array) => {
					if (i === 0) {
						return true;
					}

					return v[1] > array[i - 1][1];
				})
			).to.be.true;
		});

		it("set options data.order", () => {
			args.data.order = (a, b) => b - a;
		});

		it("check for descending", () => {
			const data = [];

			chart.$.arc.selectAll(`g.${CLASS.shapes}`).each(function(d, i) {
				data.push([d.data.id, d.startAngle]);
			});

			data.sort((a, b) => b[1] - a[1]);
			expect(
				data.every((v, i, array) => {
					if (i === 0) {
						return true;
					}

					return v[1] < array[i - 1][1];
				})
			).to.be.true;
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

					chart.$.main.selectAll(`.${CLASS.axisX} g.tick text`).each(function(d, i) {
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

	describe("inner functions", () => {
		it("should check returns of mapToTargetIds", () => {
			const internal = chart.internal;
			let data: number | number[] = [1, 2, 3];
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
			const line = chart.$.main.select(`path.${CLASS.line}-data1`);
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
			chartHeight = +chart.internal.$el.eventRect.attr("height") - 1;
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

	describe("Multilined data.label text", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["x1", 30,400, -200, -100,  150, 250],
					],
					type: "line",
					labels: {
						format: (v, id ,i, j) => {
							return v > 0 ?
								"Ipsum is\nsimply dummy text" :
								"Lorem Ipsum is simply dummy text";
						}
					}
				}
			}
		});

		it("label texts should be multilined correctly.", () => {
			chart.$.text.texts.each(function(d) {
				if (d.value > 0) {
					expect(this.children.length).to.be.equal(2);

					expect(this.getAttribute("transform")).to.not.be.null;
					expect(this.getAttribute("x")).to.be.null;
					expect(this.getAttribute("y")).to.be.null;
				} else {
					expect(this.children.length).to.be.equal(0);

					expect(this.getAttribute("transform")).to.be.null;
					expect(this.getAttribute("x")).to.not.be.null;
					expect(this.getAttribute("y")).to.not.be.null;
				}
				
			});
		});
	});

	describe("data.onshown/onhidden", () => {
		const spyShown = sinon.spy();
		const spyHidden = sinon.spy();

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "line",
					onshown: spyShown,
					onhidden: spyHidden
				}
			};
		});

		afterEach(() => {
			spyHidden.resetHistory();
			spyShown.resetHistory();
		});

		it("check on continuous .hide()/.show() APIs.", done => {
			new Promise((resolve, reject) => {
				// hide
				chart.hide();

				setTimeout(() => {
					expect(spyHidden.calledOnce).to.be.true;
					expect(spyHidden.args[0][0]).to.deep.equal(chart.data().map(v => v.id));

					resolve(true);
				}, 300);
				
			}).then(() => {
				return new Promise((resolve, reject) => {
					// when is called already hidden, do not call onhidden callback
					chart.hide();

					setTimeout(() => {
						expect(spyHidden.callCount).to.be.equal(1);
	
						resolve(true);
					}, 300);
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					// show
					chart.show();
					
					setTimeout(() => {
						expect(spyShown.calledOnce).to.be.true;
						expect(spyShown.args[0][0]).to.deep.equal(chart.data().map(v => v.id));

						resolve(true);
					}, 300);
				});
			}).then(() => {
				// when is called already shown, do not call onshown callback
				chart.show();

				setTimeout(() => {
					expect(spyShown.callCount).to.be.equal(1);

					done();
				}, 300);
			 });
		});

		it("check on continuous .hide()/.show() APIs giving specific data id.", done => {
			const id = "data1";

			new Promise((resolve, reject) => {
				// hide
				chart.hide(id);

				setTimeout(() => {
					expect(spyHidden.calledOnce).to.be.true;
					expect(spyHidden.args[0][0]).to.deep.equal([id]);

					resolve(true);
				}, 300);
			}).then(() => {
				return new Promise((resolve, reject) => {
					// when is called already hidden, do not call onhidden callback
					chart.hide(id);

					setTimeout(() => {
						expect(spyHidden.callCount).to.be.equal(1);
	
						resolve(true);
					}, 300);
				});
			}).then(() => {
				return new Promise((resolve, reject) => {
					// show
					chart.show();
					
					setTimeout(() => {
						expect(spyShown.calledOnce).to.be.true;
						expect(spyShown.args[0][0]).to.deep.equal([id]);

						resolve(true);
					}, 300);
				});
			}).then(() => {
				// when is called already shown, do not call onshown callback
				chart.show();

				setTimeout(() => {
					expect(spyShown.callCount).to.be.equal(1);

					done();
				}, 300);
			});
		});
	});
});
