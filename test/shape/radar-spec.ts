/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("SHAPE RADAR", () => {
	let chart;
	let args;

	beforeEach(function(){
		chart = util.generate(args);
	});

	describe("default radar", () => {
		let points;

		before(() => {
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
			const rect = chart.$.main.select(".bb-chart-radars").node().getBoundingClientRect();
			const left = (chart.element.getBoundingClientRect().width - rect.width) / 2;

			expect(left).to.be.closeTo(rect.x, 3);
		});

		it("data points should positioned over radar chart element", () => {
			expect(chart.internal.radars.node().nextSibling.classList.contains(CLASS.chartLines)).to.be.true;
		});

		it("check for shape rendering", done => {
			const radar = chart.$.main.select(`.${CLASS.chartRadars}`);
			const expectedPoints = "233,30.290000000000003 233,233 309.32696069614934,277.06739130434784";

			setTimeout(() => {
				expect(radar.select(".bb-shapes polygon").attr("points")).to.be.equal(expectedPoints);

				done();
			}, 200)
		});

		it("Should render level, axes and data edges", () => {
			const radar = chart.$.main.select(`.${CLASS.chartRadars}`);
			const data = chart.data();
			const dataLen = data[0].values.length;

			const axes = radar.selectAll(`.${CLASS.axis} g`);
			const levels = radar.selectAll(`.${CLASS.levels} g`);

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
			const radar = chart.$.main.select(`.${CLASS.chartRadars}`);
			const axis = radar.selectAll(`.${CLASS.axis}`);

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
			const radar = chart.$.main.select(`.${CLASS.chartRadars}`);
			const levels = radar.select(`.${CLASS.levels}`);
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
			const radars = chart.$.main.select(`.${CLASS.chartRadars}`);
			const level = radars.select(`.${CLASS.levels}`);
			const axis = radars.select(`.${CLASS.axis}`);

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

			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`)
				.each(function() {
					points.push([+this.getAttribute("x"), +this.getAttribute("y")]);
				});

			args.radar.direction = {
				clockwise: true
			};
		});

		it("check for direction", () => {
			const texts = chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`);

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
			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`)
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
		const textPos = [];

		before(() => {
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
			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`)
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
			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} g`)
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

			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`)
				.each(function() {
					textPos.push(this.getBoundingClientRect());
				});
		});

		it("check for axis text position", () => {
			const {x, y} = args.radar.axis.text.position;

			chart.$.main.selectAll(`.${CLASS.chartRadars} .${CLASS.axis} text`)
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
	});
});
