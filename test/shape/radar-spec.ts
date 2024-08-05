/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$AXIS, $COMMON, $LEVEL, $RADAR} from "../../src/config/classes";

describe("SHAPE RADAR", () => {
	let chart;
	let args;

	beforeEach(function(){
		chart = util.generate(args);
	});

	describe("default radar", () => {
		let points;

		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Design", "Price", "Brand"],
						["data1", 230, 0, 100]
					],
					type: "radar"
				},
				radar: {}
			};
		});

		it("radar should be positioned at center", () => {
			const rect = chart.$.main.select(`.${$RADAR.chartRadars}`).node().getBoundingClientRect();
			const left = (chart.$.chart.node().getBoundingClientRect().width - rect.width) / 2;

			expect(left).to.be.closeTo(rect.x, 5);
		});

		it("data points should positioned next to radar polygon element", () => {
			expect(chart.internal.$el.radar.select(`.${$COMMON.target}-data1 polygon`).node().nextSibling.querySelectorAll("circle").length).to.equal(3);
		});

		it("check for shape rendering", () => new Promise(done => {
			const radar = chart.$.main.select(`.${$RADAR.chartRadars}`);
			const expectedPoints = "233,30.290000000000003 233,233 309.32696069614934,277.06739130434784";

			setTimeout(() => {
				expect(radar.select(".bb-shapes polygon").attr("points")).to.be.equal(expectedPoints);

				done(1);
			}, 300)
		}));

		it("Should render level, axes and data edges", () => {
			const radar = chart.$.main.select(`.${$RADAR.chartRadars}`);
			const data = chart.data();
			const dataLen = data[0].values.length;

			const axes = radar.selectAll(`.${$AXIS.axis} g`);
			const levels = radar.selectAll(`.${$LEVEL.levels} g`);

			expect(axes.size()).to.be.equal(dataLen);
			expect(levels.size()).to.be.equal(dataLen);

			// check levels and data points
			levels.selectAll("polygon").each(function() {
				const len = this.getAttribute("points").replace(/[^,]/g,"").length;

				expect(len).to.be.equal(dataLen);
			});
		});

		it("set axis options", () => {
			args.radar.axis = {
				line: {
					show: false
				},
				text: {
					show: false
				}
			};
		});

		it("check for axis options", () => {
			const radar = chart.$.main.select(`.${$RADAR.chartRadars}`);
			const axis = radar.selectAll(`.${$AXIS.axis}`);

			expect(axis.selectAll("line").empty()).to.be.true;
			expect(axis.selectAll("text").empty()).to.be.true;
		});

		it("set level options", () => {
			args.radar.level = {
				depth: 8,
				show: false
			};
		});

		it("check for level options", () => {
			const radar = chart.$.main.select(`.${$RADAR.chartRadars}`);
			const levels = radar.select(`.${$LEVEL.levels}`);
			const level = levels.selectAll("polygon");

			// check for level element depth size
			expect(args.radar.level.depth).to.be.equal(level.size());

			// level should be hidden
			level.each(function() {
				expect(this.style.visibility).to.be.equal("hidden");
			});
		});

		it("set  options: hidden elements to show", () => {
			args.radar.axis.line.show = true;
			args.radar.axis.text.show = true;
			args.radar.level.show = true;
		});

		it("check for resize", () => {
			const radars = chart.$.main.select(`.${$RADAR.chartRadars}`);
			const level = radars.select(`.${$LEVEL.levels}`);
			const axis = radars.select(`.${$AXIS.axis}`);

			const old = [radars, level, axis].map(v => util.getBBox(v));

			// when
			chart.resize({width: 200,height: 200});

			[radars, level, axis].forEach((v, i) => {
				const resized = util.getBBox(v);

				expect(old[i].width).to.be.above(resized.width);
				expect(old[i].height).to.be.above(resized.height);
			});
		});

		it("set options radar.direction.clockwise=true", () => {
			// retrieve point data for next the next test
			points = [];

			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`)
				.each(function() {
					points.push([+this.getAttribute("x"), +this.getAttribute("y")]);
				});

			args.radar.direction = {
				clockwise: true
			};
		});

		it("check for direction", () => {
			const texts = chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`);

			texts.each(function(d, i) {
				const newPoints = [+this.getAttribute("x"), +this.getAttribute("y")];

				expect(points[i === 0 ? 0 : (points.length - i)]).to.deep.equal(newPoints);
			});
		});

		it("set options", () => {
			args = {
				padding: {
					top: 20
				},
				data: {
					x: "x",
					columns: [
						["x", "1st\nPrize", "2nd\nPrize", "3rd Prize"],
						["data1", 230, 250, 100],
						["data2", 150, 150, 230]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 300
					}
				}
			};
		});

		it("check for multiline axis text", () => {
			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`)
				.each(function(d, i) {
					expect(this.childNodes.length).to.be.equal(i === 2 ? 1 : 2);
				});
		});

		it("check for data label text", () => {
			chart.$.text.texts.each(function() {
				expect(this.getAttribute("x")).to.not.be.empty;
				expect(this.getAttribute("y")).to.not.be.empty;
			});
		});
	});

	describe("Axis", () => {
		const textPos: any = [];

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 330, 350, 220, 400, 150, 330, 230, 390, 95, 195, 220]
					],
					type: "radar"
				}
			};
		});

		it("check if default indexed axis text are showing", () => {
			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`)
				.each(function(d, i) {
					expect(+this.textContent).to.be.equal(i);
				});
		});

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "a", "b", "c"],
						["data", 230, 250, 300]
					],
					type: "radar"
				},
				radar:{
					direction: {
						clockwise: true
					}
				}
			};
		});

		it("check for the default text position", () => {
			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} g`)
				.each(function(d, i) {
					const line = this.firstChild.getBoundingClientRect();
					const text = this.lastChild.getBoundingClientRect();
					let distance = 0;

					if (i === 0) {
						distance = line.top - text.bottom;
					} else if (i === 1) {
						distance = text.left - line.right;
					} else if (i === 2) {
						distance = line.left - text.right;
					}

					expect(distance).to.be.above(20);
				});
		});

		it("set options radar.axis.text.position", () => {
			args.radar.axis = {
				text: {
					position: {
						x: 10,
						y: 12
					}
				}
			};

			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`)
				.each(function() {
					textPos.push(this.getBoundingClientRect());
				});
		});

		it("check for axis text position", () => {
			const {x, y} = args.radar.axis.text.position;

			chart.$.main.selectAll(`.${$RADAR.chartRadars} .${$AXIS.axis} text`)
				.each(function(d, i) {
					const rect = this.getBoundingClientRect();
					let distance = 0;

					if (i === 0) {
						expect(rect.left).to.be.equal(textPos[i].left);
						expect(textPos[i].top - y).to.be.equal(rect.top);
					} else {
						expect(Math.abs(rect.left - textPos[i].left)).to.be.equal(x);
						expect(Math.abs(rect.top - textPos[i].top)).to.be.equal(y);
					}
				});
		});

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, 30, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar", // for ESM specify as: radar()
					labels: true
				},
				radar: {
					axis: {
					  max: 400
					},
					level: {
					  depth: 4
					},
					direction: {
					  clockwise: true
					}
				}
			}
		})

		it("check for data label text position", () => {
			const pos = {
				x: [218, 375.83020652047145, 273.73967547489525, 112.09461659769906, 150.35848291979795, 218, 263.0943447201347, 226.36095132123427, 162.26032452510478, 181.92452422389223, 218, 286.9943474218061, 241.68936207683046, 134.39048678765712, 105.26413819966326],
				y: [55.5305, 160.71785724099158, 288.71908157657623, 357.76625499549493, 190.0219388175678, 150.3605, 197.34795921171187, 223.50786223648646, 288.71908157657623, 200.2783673693695, 102.94550000000001, 189.58237759391918, 244.6056096700449, 327.0786223648644, 175.36989802927968]
			};

			chart.$.text.texts.each(function() {
				expect(+this.getAttribute("x")).to.be.equal(pos.x.shift());
				expect(+this.getAttribute("y")).to.be.equal(pos.y.shift());
			});
		});
	});

	describe("point.focus.only", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, null, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar"
				  },
				  radar: {
					direction: {
					  clockwise: true
					}
				  },
				  point: {
					focus: {
						only: true
					}
				  }
			};
		});

		it("circle visibility", () => {
			const {circles} = chart.$;
			const pos = {};
			let x = 3;

			circles.each(function(d) {
				pos[d.id] = [+this.getAttribute("cx"), +this.getAttribute("cy")];
			});

			expect(circles.size()).to.be.equal(chart.data().length);

			// when
			chart.tooltip.show({x});

			circles.each(function(d) {
				const p = pos[d.id];
				
				expect(+this.getAttribute("cx")).to.be.above(p[0]);
				expect(+this.getAttribute("cy")).to.be.above(p[1]);
			});

			// when
			x = 2;
			chart.tooltip.show({x});

			// 'null' data point shoudn't be displayed
			expect(circles.filter(function() {
				return this.getAttribute("style").indexOf("hidden") === -1;
			}).size()).to.be.equal(chart.data().length);
		});
	});

	describe("size & position", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, null, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar"
				}
			};
		});

		it("should resize with axes texts", () => new Promise(done => {
			const {$el: {radar}, state} = chart.internal;
			const yPos = util.parseNum(radar.attr("transform").replace(/[^,]+/, ""));

			// when
			chart.resize({width: 300});

			setTimeout(() => {
				expect(util.parseNum(radar.attr("transform").replace(/[^,]+/, ""))).to.be.greaterThan(yPos);
				expect(radar.node().getBoundingClientRect().width).to.be.below(state.width);

				done(1);
			}, 300);
		}));
	});
});
