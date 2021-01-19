/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import State from "../../src/config/Store/State";

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

				chart.$.main.selectAll(`.${CLASS.bars}-data1 .${CLASS.bar}`).each(function(d, i) {
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

				chart.$.main.selectAll(`.${CLASS.bars}-data1 .${CLASS.bar}`).each(function(d, i) {
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
				const width = chart.$.main.select(`.${CLASS.bars}-data1 .${CLASS.bar}`).node()
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

				chart.$.main.selectAll(`.${CLASS.bars}-data1 .${CLASS.bar}`).each(function(d, i) {
					const rect = d3Select(this).node()
						.getBoundingClientRect();

					expect(rect.bottom).to.be.closeTo(expectedBottom[i], 1); // change -1 => 1
				});
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
				const bar = chart.$.main.select(`.${CLASS.target}-data1 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data1 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data3 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data3 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data1 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data1 .${CLASS.bar}-0`)
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
				const bar = chart.$.main.select(`.${CLASS.target}-data3 .${CLASS.bar}-0`)
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
			const bar = chart.$.main.select(`.${CLASS.eventRectsMultiple} rect`).node();

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

		it("Bars should be positined correctly", () => {
			const expectedPath = [
				"M147.03333333333333,426V39.63636363636365 H166.96666666666667 V426z",
				"M80.06666666666666,426V232.8181818181818 H100 V426z",
				"M180.06666666666666,426V232.8181818181818 H200 V426z",
				"M479.06666666666666,426V232.8181818181818 H499 V426z",
				"M100,426V39.63636363636365 H119.93333333333334 V426z",
				"M200,426V39.63636363636365 H219.93333333333334 V426z",
				"M499,426V39.63636363636365 H518.9333333333334 V426z"
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
				"M137.06666666666666,426V168.4242424242424 H176.93333333333334 V426z",
				"M80.06666666666666,426V297.21212121212125 H119.93333333333334 V426z",
				"M180.06666666666666,426V297.21212121212125 H219.93333333333334 V426z",
				"M479.06666666666666,426V297.21212121212125 H518.9333333333334 V426z",
				"M80.06666666666666,297.21212121212125V39.636363636363654 H119.93333333333334 V297.21212121212125z",
				"M180.06666666666666,297.21212121212125V39.636363636363654 H219.93333333333334 V297.21212121212125z",
				"M479.06666666666666,297.21212121212125V39.636363636363654 H518.9333333333334 V297.21212121212125z"
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
			main.selectAll(`.${CLASS.shape}.${CLASS.bar}-2`).each(function(d, i) {
				expect(removeSpace(this.getAttribute("d"))).to.be.equal(removeSpace(path[i]));
			})
		};

		it(`bar width should be ${width}px`, () => {
			const barWidth = util.getBBox(chart.$.main.select(`.${CLASS.chartBar} path.${CLASS.shape}`)).width;

			expect(barWidth).to.be.equal(width);
		});

		it(`bar padding should be ${padding}px`, () => {
			const {main} = chart.$;
			const targetClass = `.${CLASS.chartBar}.${CLASS.target}`;

			const bar1 = util.getBBox(main.select(`${targetClass}-data1 path.${CLASS.shape}`)).x + width;
			const bar2 = util.getBBox(main.select(`${targetClass}-data2 path.${CLASS.shape}`)).x;

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
				"M131.11111111111111,161.5 H39.166666666666664 a10,10 1 0 0 -10,10 V166.5 a10,10 1 0 0 10,10 H131.11111111111111z",
				"M131.11111111111111,179.5 H285 a10,10 0 0 1 10,10 V184.5 a10,10 0 0 1 -10,10 H131.11111111111111z"
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
				chart.$.main.selectAll(`.${CLASS.bars}-${id} path`).each(function() {
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
				chart.$.main.selectAll(`.${CLASS.bars}-${id} path`).each(function() {
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
				"M75.25,426V39.63636363636365 H224.75 V426z",
				"M374.25,426V221.5747955747956 H523.75 V426z"
			];

			chart.$.bar.bars.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expectedPath[i]);
			});
		});

		// check non-grouped bar path position
		const checkBarPathPos = type => {
			// Get x Axis pos
			let xAxisYPos = chart.$.main.select(`.${CLASS.axisX} path`).node().getBoundingClientRect();

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
				return hiddenIds.indexOf(d.id) === -1 && this.style.fillOpacity === "1";
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
});
