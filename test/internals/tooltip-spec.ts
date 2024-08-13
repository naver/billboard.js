/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import {
	select as d3Select,
	namespaces as d3Namespaces
} from "d3-selection";
import util from "../assets/util";
import {$TOOLTIP} from "../../src/config/classes";
import {isNumber, isUndefined, isString} from "../../src/module/util";

describe("TOOLTIP", function() {
	let chart;
	let chart2;
	let args: any = {
		data: {
			x: "x",
			columns: [
				['x', 2, 4, 6, 8, 10, 12],
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		},
		tooltip: {}
	};
	let args2: any = {
		bindto: "#chart2",
		data: {
			x: "x",
			columns: [
				['x', 1, 3, 5, 7, 9, 11],
				["data1-2", 30, 200, 100, 400, 150, 250],
				["data2-2", 50, 20, 10, 40, 15, 25],
				["data3-2", 150, 120, 110, 140, 115, 125]
			]
		},
		tooltip: {}
	};

	const spy1 = sinon.spy();
	const spy2 = sinon.spy();

	// check for the tooltip's ordering
	const checkTooltip = (checkChart, expected?) => {
		checkChart.tooltip.show({index:2});

		const tooltips = checkChart.$.tooltip
			.selectAll("tr")
			.nodes();

		if (expected) {
			for (let i = 1, el; (el = tooltips[i]); i++) {
				expect(el.className).to.be.equal(expected[i - 1]);
			}
		}
	};

	// check for the tooltip's ordering
	const checkLinkedTooltip = (chart1, chart2, expected?) => {
		util.hoverChart(chart1, "mousemove", {
			clientX: 270,
			clientY: 100
		});

		const tooltips = chart2.$.tooltip
			.selectAll("tr")
			.nodes();

		if (expected) {
			for (let i = 1, el; (el = tooltips[i]); i++) {
				expect(el.className).to.be.equal(`${$TOOLTIP.tooltipName}-${expected[i - 1]}`);
			}
		}
	};

	const tooltipPos = {
		top: 37,
		left: 79
	};

	const tooltipPosition = function(data, width, height, element) {
		expect(this).to.be.equal(chart);

		expect(data.length).to.be.equal(args.data.columns.length - 1);
		expect(data[0].index).to.be.equal(2);
		expect(data[0].value).to.be.equal(100);
		expect(/^data1(\-2)?$/.test(data[0].id)).to.be.true;
		expect(width).to.be.above(0);
		expect(height).to.be.above(0);

		// expect(element).to.be.equal(this.$el.main.select(`.${CLASS.eventRect}-2`).node());

		return tooltipPos;
	};

	const checkCallback = (checkChart, doHide) => {
		util.hoverChart(checkChart, "mousemove", {
			clientX: 270,
			clientY: 200
		});

		doHide && util.hoverChart(checkChart, "mouseout");
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("Tooltip callbacks", () => {
		const called = [];
		const spy = {
			onshow: sinon.spy(function(data) { called.push({ctx: this, data, type: "onshow"}) }),
			onshown: sinon.spy(function(data) { called.push({ctx: this, data, type: "onshown"}) }),
			onhide: sinon.spy(function(data) { called.push({ctx: this, data, type: "onhide"}) }),
			onhidden: sinon.spy(function(data) { called.push({ctx: this, data, type: "onhidden"}) })
		};
		let orgArgs;

		const check = fn => {
			["show", "shown", "hide", "hidden"].forEach((v, i) => {
				fn(`on${v}`, i);
			});
		}

		beforeAll(() => {
			check((name) => {
				args.tooltip[name] = spy[name];
			});
		});

		afterAll(() => {
			// restore original args
			args = orgArgs;
		});

		afterEach(() => {
			called.length = 0;

			check((name) => {
				spy[name].resetHistory();
			});
		});

		it("chart tooltip onshow/onshown/onhide/onhidden functions should be called", () => {
			const expectedData = JSON.stringify([
				{x: 6, value: 100, id: 'data1', index: 2, r: 2.5, name: 'data1'},
				{x: 6, value: 10, id: 'data2', index: 2, r: 2.5, name: 'data2'},
				{x: 6, value: 110, id: 'data3', index: 2, r: 2.5, name: 'data3'}
			]);

			checkCallback(chart, true);

			check((name, i) => {
				const call = called[i];

				expect(spy[name].calledOnce).to.be.true;

				// check the call order: onshow -> onshown -> onhide -> onhidden
				expect(call.type).to.be.equal(name);

				// check the context
				expect(call.ctx).to.be.equal(chart);

				// check the passed data argument
				expect(JSON.stringify(call.data)).to.be.equal(expectedData);
			});
		});

		it("set options", () => {
			orgArgs = args;

			args = {
				data: {
					columns: [
						["data1", 30, 200, 200, 130, 150, 250],
						["data2", 130, 100, 140, 150, 150, 50],
						["data3", 130, 100, 140, 220, 150, 50]
					],
					groups: [
						["data1", "data2"]
					],
					type: "bar"
				},
				tooltip: {
					show: true,
					grouped: false,
					contents: () => "",
					onshow: spy.onshow,
					onshown: spy.onshown,
					onhide: spy.onhide,
					onhidden: spy.onhidden
				}
			};
		})
		
		it("tooltip events should be called", () => new Promise(function(done) {
			new Promise(resolve => {
				util.hoverChart(chart, "mousemove", {
					clientX: 360,
					clientY: 300
				});

				setTimeout(resolve, 300);
			}).then(() => {
				new Promise(resolve => {
					util.hoverChart(chart, "mousemove", {
						clientX: 340,
						clientY: 300
					});

					setTimeout(resolve, 300);
				});
			}).then(() => {
				new Promise(resolve => {
					util.hoverChart(chart, "mousemove", {
						clientX: 340,
						clientY: 200
					});

					setTimeout(resolve, 300);
				});
			}).then(() => {
				new Promise(resolve => {
					util.hoverChart(chart, "mouseout", {
						clientX: 0,
						clientY: 0
					});

					setTimeout(resolve, 300);
				});
			})
			.then(() => {
				const expectedFlow = [
					["onshow", "data3"],
					["onshown", "data3"],
					["onshow", "data2"],
					["onshown", "data2"],
					["onshow", "data1"],
					["onshown", "data1"],
					["onhide", "data1"],
					["onhidden", "data1"]
				];

				called.forEach((v, i) => {
					const {data, type} = v;
					const d = data[0];
					
					expect(d.x).to.be.equal(3);
					expect([type, d.id]).to.be.deep.equal(expectedFlow[i]);
				})
				
				done(1);
			});
		}));
	});

	describe("tooltip.position callback function", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", 2, 4, 6, 8, 10, 12],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				tooltip: {
					position: tooltipPosition
				}
			}
		});

		afterAll(() => {
			delete args.tooltip.position;
		});

		it("should be set to the coordinate where the function returned", () => {
			util.hoverChart(chart, "mousemove", {
				clientX: 270,
				clientY: 100
			});

			const {tooltip} = chart.$;

			const top = Math.floor(+tooltip.style("top").replace(/px/, ""));
			const left = Math.floor(+tooltip.style("left").replace(/px/, ""));

			expect(top).to.be.equal(tooltipPos.top);
			expect(left).to.be.equal(tooltipPos.left);
		});

		it("set option tooltip.position", () => {
			args.tooltip.position = () => ({
				top: 50, left: 600
			});

			args.tooltip.doNotHide = true;
		});

		it("tooltip repositioning: when the pos is greater than the current width", () => new Promise(done => {
			util.hoverChart(chart);

			const {tooltip} = chart.$;
			const left = parseInt(tooltip.style("left"));

			// do resize
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(parseInt(tooltip.style("left"))).to.be.below(left);
				done(1);
			}, 200);
		}));

		it("set option tooltip.position", () => {
			args.data.axes = {
				data3: "y2"
			};
			args.axis = {
				y2: {
					show: true
				}
			}

			args.tooltip.position = function(data, width, height, element, pos) {
				const {scale: {y, y2}, state: {margin}} = this.internal;

				expect(pos.x).to.be.equal(99.5);
				expect(pos.y).to.be.equal(100.5);

				expect(pos.xAxis).to.be.equal(
					this.internal.scale.x(data[0].x) + margin.left
				);

				data.forEach(({id, value}) => {
					const isY2 = id === "data3";
					const scale = isY2 ? y2 : y;

					expect(pos.yAxis(value, id)).to.be.equal(
						scale(value) + this.internal.state.margin.top
					);

					if (isY2) {
						expect(y2(value) + margin.top).to.be.equal(pos.yAxis(value, null, "y2"));
					} else {
						expect(y(value) + margin.top).to.be.equal(pos.yAxis(value, null, "y"));
					}
					
				})

				return {
					top: 50, left: 300
				};
			};
		});

		it("tooltip repositioning: when the chart width is increasing", () => new Promise(done => {
			chart.resize({width:450});
			util.hoverChart(chart);

			const {tooltip} = chart.$;
			const left = parseInt(tooltip.style("left"));

			// do resize
			chart.resize({width:640});
			chart.internal.resizeFunction();

			setTimeout(() => {
				expect(parseInt(tooltip.style("left"))).to.be.above(left);

				done(1);
			}, 200);
		}));
	});

	describe("tooltip order", () => {
		it("should sort values in data display order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data1`,
				`${$TOOLTIP.tooltipName}-data2`,
				`${$TOOLTIP.tooltipName}-data3`
			]);
		});

		it("set options tooltip.order=asc", () => {
			args.tooltip.order = "asc";
		});

		it("should sort values in ascending order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data2`,
				`${$TOOLTIP.tooltipName}-data1`,
				`${$TOOLTIP.tooltipName}-data3`
			]);
		});

		it("set options tooltip.order=desc", () => {
			args.tooltip.order = "desc";
		});

		it("should sort values in descending order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data3`,
				`${$TOOLTIP.tooltipName}-data1`,
				`${$TOOLTIP.tooltipName}-data2`
			]);
		});

		// check for stacking bar
		it("set options data.groups", () => {
			args.data.type = "bar";
			args.data.groups = [["data1", "data2", "data3"]];
			args.tooltip.order = args.data.order = "desc";
		});

		it("stacked bar: should sort values in descending order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data3`,
				`${$TOOLTIP.tooltipName}-data1`,
				`${$TOOLTIP.tooltipName}-data2`
			]);
		});

		it("set options tooltip.order=asc", () => {
			args.tooltip.order = args.data.order = "asc";
		});

		it("stacked bar: should sort values in ascending order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data2`,
				`${$TOOLTIP.tooltipName}-data1`,
				`${$TOOLTIP.tooltipName}-data3`
			]);
		});

		it("set options tooltip.order=null", () => {
			args.tooltip.order = args.data.order = null;
		});

		it("stacked bar: should be ordered in data input order", () => {
			checkTooltip(chart, [
				`${$TOOLTIP.tooltipName}-data3`,
				`${$TOOLTIP.tooltipName}-data2`,
				`${$TOOLTIP.tooltipName}-data1`
			]);
		});

		it("set options tooltip.order=function", () => {
			args.tooltip.order = sinon.spy(function(a, b) {
				return a.value - b.value;
			});
		});

		it("data.order function should be called", () => {
			checkTooltip(chart);
			expect(args.tooltip.order.called).to.be.true
		});
	});

	describe("linked tooltip", () => {
		beforeEach(() => {
			spy1.resetHistory();
			spy2.resetHistory();
		});

		it("should not be throwing error", () => {
			chart.internal.charts = null;
			expect(() => chart.internal._handleLinkedCharts()).to.not.throw();
		});

		it("set options tooltip.linked=false", () => {
			args.tooltip.linked = false;
			args2.tooltip.onshow = spy2;
		});

		it("second chart tooltip shouldn't be called", () => {
			util.hoverChart(chart);

			expect(args2.tooltip.onshow.called).to.be.false;
		});

		it("set options tooltip.linked=false", () => {
			args.tooltip.onshow = spy1;
			args2.tooltip.linked = args.tooltip.linked = {name: "some"};

			chart2 = util.generate(args2);
		});

		it("both charts should be called", () => {
			util.hoverChart(chart2);

			expect(args.tooltip.onshow.called).to.be.false;
			expect(args2.tooltip.onshow.called).to.be.true;
		});

		it("should linked tooltip target instance differs than the originated chart.", () => {
			const {$el: {eventRect, tooltip}, state} = chart.internal;
			state.event = {
				isTrusted: true,
				currentTarget: eventRect.node(),
				target: eventRect.node(),
				clientX: 147,
				clientY: 14
			};
			const index = 4;

			// when
			chart.internal._handleLinkedCharts(true, index);

			const name = chart2.$.tooltip.selectAll(".name").nodes().map(v => v.textContent);
			const value = chart2.$.tooltip.selectAll(".value").nodes().map(v => +v.textContent);

			chart2.data().forEach((v, i) => {
				expect(v.id).to.be.equal(name[i]);
				expect(v.values[index].value).to.be.equal(value[i]);
			});
		});
	});

	describe("linked tooltip positionFunction", () => {
		beforeAll(() => {
			args2.tooltip.position = args.tooltip.position = tooltipPosition;
			chart2 = util.generate(args2);
		});

		it("linked tooltips should be set to the coordinate where the function returned", () => {
			util.hoverChart(chart, "mousemove", {
				clientX: 270,
				clientY: 100
			});

			[chart, chart2].forEach((v, i) => {
				const {tooltip} = v.$;
				const top = parseInt(tooltip.style("top"));
				const left = parseInt(tooltip.style("left"));

				if (i === 0) {
					expect(top).to.be.equal(tooltipPos.top);
					expect(left).to.be.equal(tooltipPos.left);

				// chart2 instance event shouldn't be called, due to the event.isTrusted is false
				} else {
					expect(isNaN(top)).to.be.true;
					expect(isNaN(left)).to.be.true;
				}
			});
		});
	});

	describe("linked tooltip order", () => {
		beforeAll(() => {
			delete args.tooltip.position;
			delete args2.tooltip.position;
		});

		beforeEach(() => {
			chart2 = util.generate(args2);
		});

		it("chart 1 should sort values in data display order", () => {
			checkLinkedTooltip(chart, chart2, [
				"data1-2", "data2-2", "data3-2"
			]);
		});

		it("chart 2 should sort values in data display order", () => {
			checkLinkedTooltip(chart2, chart, [
				"data1", "data2", "data3"
			]);
		});

		it("linked charts set options tooltip.order=asc", () => {
			args2.tooltip.order = args.tooltip.order = "asc";
		});

		it("chart 1 should sort values ascending order", () => {
			checkLinkedTooltip(chart, chart2, [
				"data2-2", "data1-2", "data3-2"
			]);
		});

		it("chart 2 should sort values ascending order", () => {
			checkLinkedTooltip(chart2, chart, [
				"data2", "data1", "data3"
			]);
		});

		it("linked charts set options tooltip.order=desc", () => {
			args2.tooltip.order = args.tooltip.order = "desc";
		});

		it("chart 1 set options tooltip.order=desc", () => {
			checkLinkedTooltip(chart, chart2, [
				"data3-2", "data1-2", "data2-2"
			]);
		});

		it("chart 2 set options tooltip.order=desc", () => {
			checkLinkedTooltip(chart2, chart, [
				"data3", "data1", "data2"
			]);
		});

		// check for stacking bar
		it("linked charts  set options data.groups", () => {
			args.data.type = "bar";
			args.data.groups = [["data1", "data2", "data3"]];
			args.tooltip.order = args.data.order = "desc";

			args2.data.type = args.data.type;
			args2.data.groups = [["data1-2", "data2-2", "data3-2"]];
			args2.tooltip.order = args.tooltip.order;

		});

		it("chart 1 stacked bar: should sort values in descending order", () => {
			checkLinkedTooltip(chart, chart2, [
				"data3-2", "data1-2", "data2-2"
			]);
		});

		it("chart 2 stacked bar: should sort values in descending order", () => {
			checkLinkedTooltip(chart2, chart, [
				"data3", "data1", "data2"
			]);
		});

		it("linked charts  set options tooltip.order=asc", () => {
			args2.tooltip.order = args2.data.order = args.tooltip.order = args.data.order = "asc";
		});

		it("chart 1 stacked bar: should sort values in ascending order", () => {
			checkLinkedTooltip(chart, chart2, [
				"data2-2", "data1-2", "data3-2"
			]);
		});

		it("chart 2 stacked bar: should sort values in ascending order", () => {
			checkLinkedTooltip(chart2, chart, [
				"data2", "data1", "data3"
			]);
		});

		it("linked charts set options tooltip.order=null", () => {
			args2.tooltip.order = args2.data.order = args.tooltip.order = args.data.order = null;
		});

		it("chart 1 stacked bar: should be ordered in data input order", () => {
			checkLinkedTooltip(chart, chart2, [
				"data3-2", "data2-2", "data1-2"
			]);
		});

		it("chart 2 stacked bar: should be ordered in data input order", () => {
			checkLinkedTooltip(chart2, chart, [
				"data3", "data2", "data1"
			]);
		});

		it("linked charts set options tooltip.order=function", () => {
			args2.tooltip.order = args.tooltip.order = sinon.spy((a, b) =>  a.value - b.value);
		});

		it("chart 1 data.order function should be called", () => {
			checkLinkedTooltip(chart, chart2);
			expect(args.tooltip.order.called).to.be.true;
		});

		it("chart 2 data.order function should be called", () => {
			checkLinkedTooltip(chart2, chart);
			expect(args2.tooltip.order.called).to.be.true;
		});
	});

	describe("tooltip display at initialization", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				tooltip: {
					init: {
						show: true,
						x: 1,
						position: {
							left: 100,
							top: 30
						}
					}
				}
			};
		});

		it("tooltip should be displayed", () => {
			const tooltip = chart.$.tooltip;
			const pos = {
				left: tooltip.style("left"),
				top: tooltip.style("top")
			};
			const dataLen = chart.data().length;
			const name = tooltip.selectAll(".name");
			const value = tooltip.selectAll(".value");

			expect(tooltip.style("display")).to.be.equal("block");

			expect(pos.left).to.be.equal(args.tooltip.init.position.left + "px");
			expect(pos.top).to.be.equal(args.tooltip.init.position.top + "px");

			expect(name.size()).to.be.equal(dataLen);
			expect(value.size()).to.be.equal(dataLen);
			expect(+tooltip.select("th").text()).to.be.equal(args.tooltip.init.x);
		});

		it("set options: data.type='pie'", () => {
			args.data.type = "pie";
		});

		it("check if tooltip shows correct data values for pie", () => {
			const tooltip = chart.$.tooltip;			
			const name = tooltip.selectAll(".name");
			const value = tooltip.selectAll(".value");

			expect(name.size()).to.be.equal(1);
			expect(value.size()).to.be.equal(1);

			expect(name.text()).to.be.equal("data3");
			expect(value.text()).to.be.equal("37.1%");
		});

		it("set options: timeseries x axis", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2023-08-24", "2023-08-25", "2023-08-26", "2023-08-27", "2023-08-28", "2023-08-29"],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				},
				tooltip: {
					init: {
						show: true,
						x: "2023-08-28"			
					}
				}
			};
		});

		it("check if tooltip shows correct data values", () => {
			const tooltip = chart.$.tooltip;
			const dataLen = chart.data().length;
			const name = tooltip.selectAll(".name");
			const value = tooltip.selectAll(".value");

			const valueAtIndex = chart.data().map(v => {
				return v.values[4].value
			});

			// is has correct data values?
			value.each(function(d, i) {
				expect(+this.textContent).to.be.equal(valueAtIndex[i]);
			});

			expect(tooltip.node().getBoundingClientRect().x).to.be.closeTo(405, 5);
			expect(name.size()).to.be.equal(dataLen);
			expect(value.size()).to.be.equal(dataLen);
			expect(tooltip.select("th").text()).to.be.equal(args.tooltip.init.x);
		});
	});

	describe("tooltip grouped=false", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 100, 400, 1000, 900, 500],
						["data2", 20, 40, 500, 300, 200],
						["data3", 80, 350, 800, 450, 500],
						["data4", 150, 240, 300, 700, 300]
					]
				},
				tooltip: {
					grouped: false
				},
				point: {
					pattern: [
						"circle",
						"rectangle",
						"<path d='m3.937502,2.348755c1.314192,-3.618047 6.463238,0 0,4.651779c-6.463238,-4.651779 -1.314192,-8.269826 0,-4.651779z' />",
						"<polygon points='2.5 0 0 5 5 5'></polygon>"
					]
				}
			};
		});

		it("tooltip should be displayed", () => {
			// check for custom point shape
			util.hoverChart(chart, undefined, {
				clientX: 292,
				clientY: 107
			});

			let value = +chart.$.tooltip.select(`.${$TOOLTIP.tooltipName}-data3 .value`).text();

			expect(value).to.be.equal(800);

			// check for circle point shape
			util.hoverChart(chart, undefined, {clientX: 292, clientY: 34});

			value = +chart.$.tooltip.select(`.${$TOOLTIP.tooltipName}-data1 .value`).html();

			expect(value).to.be.equal(1000);
		});

		it("check for overlapped data points", () => {
			const expectedData = {
				data1: 500,
				data3: 500
			};

			// check for custom point shape
			util.hoverChart(chart, undefined, {clientX: 581, clientY: 214});

			chart.$.tooltip.selectAll(".name")
				.each(function() {
					const name = this.textContent;

					expect(name in expectedData).to.be.true;
					expect(+this.nextSibling.textContent).to.be.equal(expectedData[name]);
				});
		});
	});

	describe("tooltip for area-range", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1", [150, 140, 110],
							[155, 130, 115],
							[160, 135, 120],
							[135, 120, 110],
							[180, 150, 130],
							[199, 160, 125]
						],
						["data2", 130, 340, 200, 500, 250, 350]
					],
					types: {
						data1: "area-line-range"
					}
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						}
					}
				}
			};
		});

		it("area-ranged type tooltip should be displayed correctly", () => {
			// check for custom point shape
			util.hoverChart(chart, undefined, {clientX: 185, clientY: 107});

			let value = chart.$.tooltip.select(`.${$TOOLTIP.tooltipName}-data1 .value`).text();

			expect(value).to.be.equal("Mid: 135 High: 160 Low: 120");

			value = +chart.$.tooltip.select(`.${$TOOLTIP.tooltipName}-data2 .value`).text();

			expect(value).to.be.equal(200);
		});
	});

	describe("tooltip for null data", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 10, null],
						["data2", null, 20]
					]
				}
			};
		});

		it("check when first data is null", () => {
			chart.tooltip.show({x:1});

			const tooltip = chart.$.tooltip;

			expect(tooltip.select(".name").node().textContent).to.be.equal("data2");
			expect(+tooltip.select(".value").node().textContent).to.be.equal(20);
		});
	});

	describe("tooltip for dynamic loaded data", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					]
				}
			};
		});

		it("load data to be adding more columns", () => new Promise(done => {
				chart.load({
					columns: [
						["data2", 44, 134, 98, 170]
					],
					done() {
						try {
							chart.tooltip.show({index: 3});
							expect(+chart.$.tooltip.select(".value").html()).to.be.equal(170);
						} catch(e) {
							expect(false).to.be.true;
						}

						expect(true).to.be.true;
						done(1);
					}
				});
		}));

		it("set options", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05"],
						["data1", 30, 200, 100, 400, 150]
					]
				  },
				  axis: {
					x: {
					  type: "timeseries",
					  tick: {
						format: "%Y-%m-%d"
					  }
					}
				}
			};
		});

		it("should correctly showing tooltip for loaded data", () => new Promise(done => {
			chart.load({
				columns: [
					["x", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05"],
					["data2", 220, 150, 40, 250]
				],
				done() {
					const index = 1;
					const expected = [200, 220];

					chart.tooltip.show({index});

					const tooltipValue = chart.$.tooltip.selectAll(".value").nodes();

					chart.data().forEach((v, i) => {
						expect(+tooltipValue[i].textContent).to.be.equal(expected[i]);
					 });

					done(1);
				}
			});
		}));

		it("set options", () => {
			args = {
				data: {
					x:"x",
					columns: [
						["x", 10, 30, 40, 60, 80],
						["data1", 230, 190, 50, 10, 60]
					]
				},
			};
		});

		it("should correclty show tooltip for new added x Axis ticks", () => new Promise(done => {
			chart.load({
				columns: [
				  	// when load different data name than the generated, it will add new axis ticks
					["x", 35, 60, 85],
					["data2", 10, 20, 160]
				],
				done() {
					const value = [];

					[1, 2, 5, 6].forEach(v => {
						chart.tooltip.show({index: v});
						value.push(chart.$.tooltip.select(".value").html());
					});

					[190, 10, 60, 160].forEach((v, i) => {
						expect(+value[i]).to.be.equal(v);
					});

					// when
					chart.toggle("data1");

					setTimeout(() => {
						chart.tooltip.show({index: 2});
						expect(+chart.$.tooltip.select(".value").html()).to.be.equal(160);

						done(1);
					}, 300);
				}
			});
		}));

		it("should correclty show tooltip for overriden x Axis ticks", () => new Promise(done => {
			chart.load({
				columns: [
				  	// when load same data name than the generated, it will add override axis ticks
					["x", 35, 60, 85],
					["data1", 10, 20, 160]
				],
				done() {
					chart.data()[0].values.forEach((v, i) => {
						chart.tooltip.show({index: i});

						expect(+chart.$.tooltip.select(".value").html()).to.be.equal(v.value);
					});

					done(1);
				}
			});
		}));
	});

	describe("tooltip display", () => {
		beforeAll(() => {
			util.sandbox("tooltip-wrapper").innerHTML = "<div id='tooltip'></div>";

			args = {
				data: {
					columns: [
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					],
					colors: {
						data1: "#00c73c",
						data2: "#fa7171"
					}
				},
				tooltip: {
					doNotHide: true
				}
			};
		});

		it("set options tooltip.contents", () => {
			args.tooltip.contents = function(data, defaultTitleFormat, defaultValueFormat, color) {
				const d = data[0];
				const value = defaultValueFormat(d.value, d?.ratio, d.id);
				const hasYTickFormat = !!args.axis?.y?.tick?.format;

				expect(typeof value === (hasYTickFormat ? "string" : "number")).to.be.ok;

				return value;
			};
		});

		it("tooltip.contents' defaultValueFormat should return number type.", () => {
			// when
			chart.tooltip.show({x:1});
		});

		it("set options tooltip.contents", () => {
			args.axis = {
				y: {
					tick: {
						format: function(x) {
							return `${x}`;
						}
					}
				}
			}
		});

		it("tooltip.contents' defaultValueFormat should return string type.", () => {
			// when
			chart.tooltip.show({x:1});
		});

		it("tooltip shouldn't be hiding", () => {
			util.hoverChart(chart, "mousemove", {clientX: 185, clientY: 107});
			util.hoverChart(chart, "mouseout", {clientX: -100, clientY: -100});

			expect(chart.$.tooltip.style("display")).to.be.equal("block");

			// when is called .hide(), it should be hide
			chart.tooltip.hide();
			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});

		it("set options tooltip.contents", () => {
			args.tooltip.contents = {
				bindto: "#tooltip",
				text: {
					VAR: ["!!comment", "test!!"]
				},
				template: `<ul><li>Index<br>{=TITLE}</li>
					{{<li class={=CLASS_TOOLTIP_NAME}>
					<span>{=VALUE}</span><br>{=VAR}
					<span style=color:{=COLOR}>{=NAME}</span></li>}}</ul>`
			};
		});

		it("check for tooltip contents template", () => {
			const html = `<ul><li>Index<br>2</li><li class="bb-tooltip-name-data1"><span>100</span><br>!!comment<span style="color:#00c73c">data1</span></li><li class="bb-tooltip-name-data2"><span>140</span><br>test!!<span style="color:#fa7171">data2</span></li></ul>`;

			util.hoverChart(chart, "mousemove", {
				clientX: 450,
				clientY: 107
			});

			util.hoverChart(chart, "mouseout", {
				clientX: -100,
				clientY: -100
			});

			expect(d3Select("#tooltip").html()).to.be.equal(html);
		});

		it("set options tooltip.grouped=false", () => {
			args.tooltip.grouped = false;
		});

		it("check for tooltip contents template when is non-grouped", () => {
			const texts = args.tooltip.contents.text.VAR;

			chart.tooltip.show({
				data: {x: 1, id: "data2",value: 100}
			});

			expect(chart.$.tooltip.html().indexOf(texts[1]) > -1).to.be.true;

			chart.tooltip.show({
				data: {x: 1, id: "data1", value: 200}
			});

			expect(chart.$.tooltip.html().indexOf(texts[0]) > -1).to.be.true;
		});

		it("set options color.tiles", () => {
			delete args.data.colors;
			delete args.tooltip.contents;

			args.color = {
				tiles: function() {
					var pattern = d3Select(document.createElementNS(d3Namespaces.svg, "pattern"))
						.attr("patternUnits", "userSpaceOnUse")
						.attr("width", "6")
						.attr("height", "6");

					var g = pattern
						.append("g")
						.attr("fill-rule", "evenodd")
						.attr("stroke-width", 1)
						.append("g")
						.attr("fill", "rgb(255, 127, 14)");

					g.append("polygon").attr("points", "5 0 6 0 0 6 0 5");
					g.append("polygon").attr("points", "6 5 6 6 5 6");

					// Should return an array of SVGPatternElement
					return [
						pattern.node()
					];
				}
			}
		});

		it("check for color tiled tooltip", () => {
			const id = chart.data().map(v => v.id);

			// when
			chart.tooltip.show({x:0});

			chart.$.tooltip.selectAll(".name").each(function(d, i) {
				expect(/^<svg>(.*)<\/svg>$/.test(this.innerHTML.replace(id[i], ""))).to.be.true;
			});
		});
	});

	describe("tooltip display: after dynamic dimension update", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["Male", -83, -143, -100, -120, -150, -85],
						["Female", 130, 100, 140, 175, 150, 50]
					],
					type: "bar",
					groups: [
						["Male", "Female"]
					],
				},
				axis: {
					rotated: true
				}
			}
		});

		it("Rotated Axis: should tooltip show correctly", () => {
			// when
			chart.$.chart.style("margin-top", "100px");
			chart.tooltip.show({index:1});

			expect(chart.$.tooltip.select("th").text()).to.be.equal("1");

			chart.$.chart.style("margin-top", null);
		});

		it("set options: axis.rotated=false", () => {
			args.axis.rotated = false;
		});

		it("Non-rotated Axis: should tooltip show correctly", () => {
			// when
			chart.$.chart.style("margin-left", "100px");
			chart.tooltip.show({index:1});

			expect(chart.$.tooltip.select("th").text()).to.be.equal("1");

			chart.$.chart.style("margin-left", null);
		});
	});

	describe("tooltip: candlestick type with xs option", () => {
		beforeAll(() => {
			args = {
				data: {
					xs: {
						data1: "x"
					},
					columns: [
						["x", "2021-02-20"],
						["data1", { open: 1300, high: 1369, low: 1200, close: 1339, volume: 100 }]
					],
					type: "candlestick",
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
			};
		});

		it("should display tooltip", () => {
			util.hoverChart(chart, "mousemove", {clientX: 180, clientY: 130});

			expect(chart.$.tooltip.select(".value").html())
				.to.be.equal(`<b>Open:</b> 1300 <b>High:</b> 1369 <b>Low:</b> 1200 <b>Close:</b> 1339 <b>Volume:</b> 100`);
		});
	});

	describe("tooltip: bar type within a range", () => {
		it("should display start ~ end", () => {
			chart = util.generate({
				data: {
					columns: [
						["data1", [1300, 1339]],
					],
					type: "bar",
				}
			});
			util.hoverChart(chart, "mousemove", {clientX: 180, clientY: 130});

			expect(chart.$.tooltip.select(".value").html())
				.to.be.equal("1300~1339");
		});
	});

	describe("tooltip: format", () => {
		const spyTitle = sinon.spy();
		const spyName = sinon.spy();
		const spy = sinon.spy(function(value, ratio, id, index) {
			return [value, ratio, id, index];
		});
	
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 50, 80, 10],
						["data2", 50, 20, 90]
					],
					type: "bar", // for ESM specify as: bar()
					groups: [
						["data1", "data2"]
					],
				},
				tooltip: {
					format: {
						title: spyTitle,
						name: spyName,
						value: spy
					}
				}
			};
		});

		afterAll(() => {
			spyTitle.resetHistory();
			spyName.resetHistory();
			spy.resetHistory();
		});
	
		it("check if ratio value is given to format function for 'bar' type.", () => {
			chart.data.values("data1").forEach((v, i) => {
				chart.tooltip.show({x: i});

				expect(spy.callCount).to.be.equal(args.data.columns.length);
				expect(spy.args.every(v => v.length === 4)).to.be.true;
				expect(spy.args.every(v => {
					const [value, ratio, id, index]= v;
	
					return isNumber(value) && isNumber(ratio) && isString(id) && isNumber(index);
				})).to.be.true;

				// check ratio
				expect(spy.returnValues.reduce((p, a) => p?.[1] ?? p + a[1], 0)).to.be.equal(1);
				
				// title formatter should be called only once
				expect(spyTitle.callCount).to.be.equal(i + 1);				

				// name formatter should be called as row's data length times
				expect(spyName.callCount).to.be.equal((i + 1) * 2);

				spy.resetHistory();
			});
		});

		it("set option: data.type='area'", () => {
			args.data.type = "area";
		});

		it("check if ratio value is given to format function for 'area' type.", () => {
			chart.data.values("data1").forEach((v, i) => {
				chart.tooltip.show({x: i});

				expect(spy.callCount).to.be.equal(args.data.columns.length);
				
				expect(spy.args.every(v => v.length === 4)).to.be.true;
				expect(spy.args.every(v => {
					const [value, ratio, id, index]= v;
	
					return isNumber(value) && isNumber(ratio) && isString(id) && isNumber(index);
				})).to.be.true;

				// check ratio
				expect(spy.returnValues.reduce((p, a) => p?.[1] ?? p + a[1], 0)).to.be.equal(1);

				spy.resetHistory();
			});
		});

		it("set option: data.type='area'", () => {
			args.data.columns.push(["data3", 50, 20, 90]);
		});

		it("check correct ratio value is given when contains non-grouped single data series.", () => {
			chart.data.values("data1").forEach((v, i) => {
				chart.tooltip.show({x: i});

				expect(spy.callCount).to.be.equal(args.data.columns.length);

				// check ratio
				expect(spy.returnValues.reduce((p, a) => p?.[1] ?? p + a[1], 0)).to.be.equal(1);

				spy.resetHistory();
			});
		});

		it("set options", () => {
			spy.resetHistory();

			args = {
				data: {
					columns: [
						["data1", [0, 100], [100, 250], 30]
					],
					type: "bar"
			  },
			  tooltip: {
				format: {
				  value: spy
				}
			  }
			};
		});

		it("check bar ranged data", () => {
			// when
			chart.tooltip.show({x: 1});

			expect(spy.callCount).to.be.equal(1);
			expect(spy.args.every(v => v.length === 4)).to.be.true;
			expect(spy.args.every(v => {
				const [value, ratio, id, index]= v;

				return Array.isArray(value) && isUndefined(ratio) && isString(id) && isNumber(index);
			})).to.be.true;

			spy.resetHistory();

			// when
			chart.tooltip.show({x: 2});

			expect(spy.callCount).to.be.equal(1);
		});

		it("set options: area-line-range type", () => {
			spy.resetHistory();

			args = {
				data: {
					columns: [
						["data1", [199, 160, 125], [180, 150, 130], [135, 120, 110]]
					],
					type: "area-line-range"
			  	},
				tooltip: {
					format: {
						value: spy
					}
				}
			};
		});

		it("check for area-line-range data", () => {
			// when
			chart.tooltip.show({x: 2});

			expect(spy.callCount).to.be.equal(3);
			expect(spy.args.every(v => v.length === 4)).to.be.true;
			expect(spy.args.every(v => {
				const [value, ratio, id, index]= v;

				return isNumber(value) && isUndefined(ratio) && isString(id) && isNumber(index);
			})).to.be.true;
			spy.resetHistory();

			// when
			chart.tooltip.show({x: 1});

			expect(spy.callCount).to.be.equal(3);
		});

		it("set options: candlestick type", () => {
			spy.resetHistory();

			args = {
				data: {
					columns: [
						["data1", 
							[1327, 1369, 1289, 1348],
							[1348, 1371, 1314, 1320],
							[1320, 1412, 1314, 1394, 500]
						]
					],
					type: "candlestick"
			  	},
				tooltip: {
					format: {
						value: spy
					}
				}
			};
		});

		it("check for candlestick data", () => {
			const data = chart.data.values("data1");

			// when data contains volume data
			chart.tooltip.show({x: 2});

			expect(spy.callCount).to.be.equal(data[2].length);
			expect(spy.args.every(v => v.length === 4)).to.be.true;
			expect(spy.args.every(v => {
				const [value, ratio, id, index]= v;

				return isNumber(value) && isUndefined(ratio) && isString(id) && isNumber(index);
			})).to.be.true;

			spy.resetHistory();

			// when
			chart.tooltip.show({x: 1});

			expect(spy.callCount).to.be.equal(data[1].length);
		});

		it("set options: pie type", () => {
			spy.resetHistory();

			args = {
				data: {
					columns: [
						["data1", 50],
						["data2", 50],
					],
					type: "pie"
			  	},
				tooltip: {
					format: {
						value: spy
					}
				}
			};
		});

		it("check for pie data", () => {
			// when
			chart.tooltip.show({data: {index: 1}});

			expect(spy.callCount).to.be.equal(1);
			expect(spy.args.every(v => v.length === 4)).to.be.true;
			expect(spy.args.every(v => {
				const [value, ratio, id, index]= v;

				return isNumber(value) && isNumber(ratio) && isString(id) && isNumber(index);
			})).to.be.true;

			spy.resetHistory();
		});
	});	

	describe("tooltip: show", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
					  ["data1", 30, 200, 100, 400, 150, 250],
					  ["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				tooltip: {
					show: false
				}
			};
		});

		it("tooltip element should be null", () => {
			util.hoverChart(chart, "mouseover", {
				clientX: 360,
				clientY: 300
			});

			expect(chart.$.tooltip).to.be.null;

			// check exception when tooltip.show=false
			expect(
				chart.internal.setTooltipPosition()
			).to.not.throw;
		});
	});
});
