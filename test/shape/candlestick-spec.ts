/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {isArray} from "../../src/module/util";
import {$CANDLESTICK, $COMMON} from "../../src/config/classes";

describe("SHAPE CANDLESTICK", () => {
	let chart;
	let args;

	beforeEach(function(){
		chart = util.generate(args);
	});

	describe("default candlestick", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1",
							{open: 100, high: 130, low: 5, close: 30},
							[30, 200, 5, 150],
						]
					],
					type: "candlestick",
					labels: true
				},
				axis: {
					x:{
						type: "category"
					}
				},
				candlestick: {
					color: {
						down: {
							data1: "red"
						}
					}
				}
			};
		});

		it("check for basic rendering", () => {
			const expectedPath = [
				/^M59\.\d+,217\.\d+V33\d\.\d+ H239\.\d+ V217\.\d+z$/,
				/^M359\.4,33\d\.\d+V132\.\d+ H539\.\d+/
			];

			const expectedLinePos = [
				{
					x1: 150,
					x2: 150,
					y1: 379.9980687879345,
					y2: 166.5390062393005
				},
				{
					x1: 449,
					x2: 449,
					y1: 379.9980687879345,
					y2: 47.001931212065486
				}
			];

			chart.$.candlestick.each(function(d, i) {
				const data = chart.internal.getCandlestickData(d);
				const path = this.querySelector("path");
				const line = this.querySelector("line");

				// check for bearish data
				if (this.getAttribute("class").indexOf($CANDLESTICK.valueDown) > -1) {
					expect(data._isUp).to.be.false;
					expect(data.close < data.open).to.be.true;

					expect(path.style.fill).to.be.equal(args.candlestick.color.down.data1);

				// check for bullrish data
				} else {
					expect(data.close > data.open).to.be.true;
					expect(this.getAttribute("class").indexOf($CANDLESTICK.valueUp) > -1).to.be.true;
				}
 
				expect(expectedPath[i].test(path.getAttribute("d"))).to.be.true;
				
				expect(+line.getAttribute("x1")).to.be.closeTo(expectedLinePos[i].x1, 1);
				expect(+line.getAttribute("x2")).to.be.closeTo(expectedLinePos[i].x2, 1);
				expect(+line.getAttribute("y1")).to.be.closeTo(expectedLinePos[i].y1, 1);
				expect(+line.getAttribute("y2")).to.be.closeTo(expectedLinePos[i].y2, 1);
			});

			// data text label should be displying 'close' value
			chart.$.text.texts.each(function(d) {
				const {value} = d;

				expect(+this.textContent).to.be.equal(isArray(value) ? value[3] : value.close);
			});
		});

		it("set options candlestick.width=20", () => {
			args.candlestick.width = 20;
		});

		it("candlestick's bar width should be fixed", () => {
			chart.$.candlestick.each(function(d, i) {
				expect(+this.querySelector("path").getBoundingClientRect().width).to.be.equal(args.candlestick.width);
			});
		});

		it("check for the expand & unexpand of shape", () => {
			const index = 1;

			// when
			chart.tooltip.show({index});

			chart.$.candlestick.each(function(d, i) {
				const hasExpandedClass = this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1;

				expect(hasExpandedClass).to.be[i === index ? "true" : "false"];
			});

			// when
			chart.tooltip.hide();

			chart.$.candlestick.each(function() {
				const hasExpandedClass = this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1;

				expect(hasExpandedClass).to.be.false;
			});
		});

		it("set options: with wrong nullish data", () => {
			args = {
				data: {
					columns: [
						["data1",
							{open: 100, high: 130, low: 5, close: 30, volume: 100},
							[10,20,null, null, 10],
						]
					],
					type: "candlestick"
				}
			};
		});

		it("for wrong data, path shouldn't render.", () => {
			const d = chart.internal.$el.main.selectAll(".bb-shape:last-child path").attr("d");

			expect(d).to.be.equal("M0,0V0 H0 V0z");			
		});
	});

	describe("rotated axis", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1",
							{open: 100, high: 140, low: -40, close: -20}
						]
					],
					type: "candlestick",
					labels: true
				},
				axis: {
					rotated: true,
					x: {
						type: "category"
					}
				},
				grid: {
					y: {
						show: true
					}
				}
			};
		});

		it("should rendered correctly.", () => {
			const {$el: {candlestick}, scale: {y}} = chart.internal;
			const data = chart.data("data1")[0].values[0].value;

			const line = candlestick.select("line");
			const path = candlestick.select("path").attr("d");

			// check line position
			expect(+line.attr("x1")).to.be.equal(y(data.low));
			expect(+line.attr("x2")).to.be.equal(y(data.high));

			// check path position
			expect(path.indexOf(y(data.close)) > -1).to.be.true;
			expect(path.indexOf(y(data.open)) > -1).to.be.true;
		});
	});

	describe("candlestick + combination", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2021-03-01", "2021-03-02", "2021-03-03"],
						["data1",
							{open: 100, high: 130, low: 5, close: 30},
							[30, 200, 5, 150],
						],
						[
							"data2",
							[109,200,68,172],
							null,
							{open: 100, high: 130, low: 5, close: 30}
						],
						["data3", 180, 100, 70],
						["data4", 180, 100, 70],
					],
					types: {
						data1: "candlestick",
						data2: "candlestick",
						data3: "line",
						data4: "step"
					},
					colors: {
						data2: "black"
					},
					labels: true
				},
				axis: {
					x:{
						type: "timeseries",
						padding: {
							left: 1000*60*60*24,
							right: 1000*60*60*24
						}
					}
				},
				candlestick: {
					width: {
						ratio: 0.7
					},
					color: {
						down: {
							data1: "red",
							data2: "purple"
						}
					}
				}
			};
		});

		it("should be rendered correctly", () => {
			const expected = {
				data1: {
					path: {
						0: /^M97\.\d+,217\.\d+V33[67]\.\d+ H149\.\d+ V217\.\d+z$/,
						1: /^M247\.\d+,33[67]\.\d+V132\.\d+ H299\.5 V33[67]\.\d+z/
					},
					line: {
						0: {
							x1: 123.425, x2: 123.425,
							y1: 379.9980687879345, y2: 166.5390062393005
						},
						1: {
							x1: 272.925, x2: 272.925,
							y1: 379.9980687879345, y2: 47.001931212065486
						}
					}
				},
				data2: {
					path: {
						0: /^M149.75,202\.\d+V9[45]\.\d+ H202\.\d+ V202\.\d+z$/,
						2: /^M449.25,217\.\d+V33[67]\.\d+ H501\.\d+ V217\.\d+z$/
					},
					line: {
						0: {
							x1: 175.575, x2: 175.575,
							y1: 272.41470126342296, y2: 47.001931212065486
						},
						2: {
							x1: 474.575, x2: 474.575,
							y1: 379.9980687879345, y2: 166.5390062393005
						}
					}
				}

			}

			chart.$.candlestick.each(function(d, i) {
				const data = chart.internal.getCandlestickData(d);
				const path = this.querySelector("path");
				const line = this.querySelector("line");

				// check for bearish data
				if (this.getAttribute("class").indexOf($CANDLESTICK.valueDown) > -1) {
					expect(data._isUp).to.be.false;
					expect(data.close < data.open).to.be.true;

					expect(path.style.fill).to.be.equal(args.candlestick.color.down[d.id]);

				// check for bullrish data
				} else {
					expect(data.close > data.open).to.be.true;
					expect(this.getAttribute("class").indexOf($CANDLESTICK.valueUp) > -1).to.be.true;
				}

				const compareData = expected[d.id];

				expect(compareData.path[d.index].test(path.getAttribute("d"))).to.be.true;
				
				expect(+line.getAttribute("x1")).to.be.closeTo(compareData.line[d.index].x1, 1);
				expect(+line.getAttribute("x2")).to.be.closeTo(compareData.line[d.index].x2, 1);
				expect(+line.getAttribute("y1")).to.be.closeTo(compareData.line[d.index].y1, 1);
				expect(+line.getAttribute("y2")).to.be.closeTo(compareData.line[d.index].y2, 1);
			});

			const expectedLine = {
				data3: /^M149.75,8[01]\.\d+L299.5,217\.\d+/,
				data4: /^M149.75,8[01]\.\d+L224/
			};

			chart.$.line.lines.each(function(d, i) {
				expect(expectedLine[d.id].test(this.getAttribute("d"))).to.be.true;
			})
		});
	});

	describe("dynamic load", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [],
					labels: true
				},
			};
		});

		it("should generate candlestick from empty chart", () => new Promise(done => {
			const data = [					
					["data1",
						{open: 100, high: 130, low: 5, close: 30, volume: 100},
						[30, 200, 5, 150, 200],
					]
				];

			// when
			chart.load({
				columns: data,
				type: "candlestick",
				done() {
					const {$el: {candlestick, tooltip}} = this.internal;

					expect(candlestick.size()).to.be.equal(2);

					// when
					this.tooltip.show({x: 0});

					// check if tooltip content shows correct data
					const str = JSON.stringify(data[0][1])
						.replace(/[{}\",]/g, "")
						.replace(/(\d)(?=[a-z])/g, "$1 ")
						.replace(/(:)(\d)/g, "$1 $2");

					expect(str).to.be.equal(tooltip.select(".value").text().toLowerCase());

					done(1);
				}
			});
		}));
	});
});
