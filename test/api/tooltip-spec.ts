/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {timeFormat as d3TimeFormat} from "d3-time-format";
import util from "../assets/util";
import {$TOOLTIP} from "../../src/config/classes";
import sinon from "sinon";

describe("API tooltip", () => {
	let chart;
	let args: any = {
		data: {
			x: "x",
			columns: [
				["x", "2018-01-01", "2018-01-02", "2018-01-03", "2018-01-04", "2018-01-05"],
				["data1", 30, 200, 100, 400, 150],
				["data2", 5000, 2000, 1000, 4000, 1500]
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

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("for non multiple x", () => {
		it("should show/hide tooltip using 'index' option", () => {
			const {config} = chart.internal;
			const {tooltip} = chart.$;
			const x = 1;

			// show tooltip
			chart.tooltip.show({
				index: x,
				mouse: [10, 200]
			});

			expect(tooltip.html()).to.be.ok;
			expect(tooltip.style("display")).to.be.equal("block");

			// check if tooltip data are correctly rendered
			chart.data().forEach(v => {
				const id = v.id;
				const data = tooltip.select(`.${$TOOLTIP.tooltipName}-${id}`);
				const value = chart.data(id)[0].values[x];

				expect(id).to.be.equal(v.id);
				expect(tooltip.select("th").html()).to.be.equal(d3TimeFormat(config.axis_x_tick_format)(value.x));
				expect(data.select(".name").text()).to.be.equal(id);
				expect(+data.select(".value").html()).to.be.equal(value.value);
			});

			// hide tooltip
			chart.tooltip.hide();

			expect(tooltip.style("display")).to.be.equal("none");
		});

		it("should show/hide tooltip using 'x' option", () => {
			const {tooltip} = chart.$;
			const x = new Date("2018-01-03 00:00");

			// show tooltip
			chart.tooltip.show({ x });

			expect(tooltip.html()).to.be.ok;
			expect(tooltip.style("display")).to.be.equal("block");

			// hide tooltip
			chart.tooltip.hide();

			expect(tooltip.style("display")).to.be.equal("none");
		});

		it("tooltip should be shown for same index after: show() -> hide() -> show()", () => {
			const index = 3;

			chart.tooltip.show({index});
			chart.tooltip.hide();
			chart.tooltip.show({index});

			expect(chart.$.tooltip.style("display")).to.be.equal("block");
		});
	});

	describe("for multiple x", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					xs: {
						data1: "x1",
						data2: "x2",
					},
					columns: [
						["x1", "2018-08-1", "2018-09-1", "2018-10-1"],
						["x2", "2018-10-14", "2018-10-28"],
						["data1", 10, 15, 18],
						["data2", 14, 14]
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
					onshow: spy1,
					onhide: spy2
				}
			}
		});

		it("check for tooltip.show/hide() for data.xs option", () => {
			const value = 15;

			chart.tooltip.show({
				data: {
					x: new Date("2018-09-1 0:0:0"),
					id: "y",
					value
				}
			});

			chart.tooltip.hide();

			expect(spy1.called).to.be.true;
			expect(spy2.called).to.be.true;
			expect(+chart.$.tooltip.select(".value").text()).to.be.equal(value);
		});

		it("set options", () => {
			args = {
				data: {
					type: "line",
					xs: {
					  "data0": "data0X",
					  "data1": "data1X",
					  "data2": "data2X"
					},
					columns: [
						  ["data0X", 1641362431000, 1641362451000],
						  ["data1X", 1641362431000, 1641362432000],
						  ["data2X", 1641362432000, 1641362538000],
						  ["data0", 2, 2],
						  ["data1", 0, 0],
						  ["data2", 1, 1]
					  ]
				},
				zoom: {
					enabled: true,
					type: "drag"
				},
				grid: {
					x: {
						show: false
					},
					y: {
						show: true,
						ticks: 6
					}
				},
				legend: {
					show: false
				},
				axis: {
				x: {
					type: "timeseries",
					tick: {
						fit: false,
						format: "%Y-%m-%d %H:%M:%S"
					}
				},
				y: {
					min: 0,
					padding: 10
				}
				},
				tooltip: {
					grouped: false
				},
				line: {
					point: false
				},
				point: {
					show: false,
					sensitivity: 2
				},
				transition: {
					duration: 0
				}
			};
		});

		it("tooltip.show() should work when zoom in", () => {
			const {tooltip} = chart.$;

			// when
			chart.zoom([1641362431000, 1641362451000]);

			chart.tooltip.show({
				data: {
					x: 1641362432000,
					id: "data2",
					value: 1
				}
			});

			expect(tooltip.style("display")).to.be.equal("block");
			expect(tooltip.select(".name").text()).to.be.equal("data2");
			expect(+tooltip.select(".value").text()).to.be.equal(1);
		});
	});

	describe("for tooltip.grouped=false", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "2018-08-1", "2018-09-1", "2018-10-1"],
						["data1", 10, 15, 18],
						["data2", 14, 14]
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
					grouped: false,
					onshow: spy1,
					onhide: spy2
				}
			}
		});

		it("check for tooltip.show/hide() for data.xs option", () => {
			const value = 14;

			chart.tooltip.show({
				data: {
					x: new Date("2018-09-1 0:0:0"),
					id: "y",
					value
				}
			});

			chart.tooltip.hide();

			expect(spy1.called).to.be.true;
			expect(spy2.called).to.be.true;
			expect(+chart.$.tooltip.select(".value").text()).to.be.equal(value);
		});
	});

	describe("when tooltip.show=false option is set", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [['rating', 70]],
					type: "gauge"
				},
				tooltip: {
					show: false
				}
			};
		});

		it("Call of .tooltip.hide() shouldn't throw error", () => {
			try {
				chart.tooltip.hide();
				expect(true).to.be.ok;
			} catch(e) {
				// if called, means error was thrown
				expect(true).to.be.false;
			}
		});
	});

	describe("tooltip.show() for arc types", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 100],
						["data2", 90],
						["data3", 50],
						["data4", 20]
					],
					type: "pie",
				},
				transition: {
					duration: 0
				}
			};
		});

		it("should show tooltip correctly using 'index'?", () => new Promise(done => {
			setTimeout(() => {
				const {tooltip} = chart.$;

				// when
				chart.tooltip.show({index:2});

				expect(tooltip.select(".name").text()).to.be.equal("data3");
				expect(tooltip.select(".value").text()).to.be.equal("19.2%");

				done(1);
			}, 300);
		}));

		it("should show tooltip correctly using 'id'?", () => new Promise(done => {
			setTimeout(() => {
				const {tooltip} = chart.$;

				// when
				chart.tooltip.show({data: {id: "data3"}});

				expect(tooltip.select(".name").text()).to.be.equal("data3");
				expect(tooltip.select(".value").text()).to.be.equal("19.2%");

				done(1);
			}, 300);
		}));

		it("set options tooltip.init", () => {
			args.tooltip = {
				init: {
					show: true,
					x: 1
				}
			};
		});

		it("should show tooltip at initialization", () => {
			const {tooltip} = chart.$;

			expect(tooltip.select(".name").text()).to.be.equal("data2");
			expect(tooltip.select(".value").text()).to.be.equal("34.6%");
		});
	});

	describe("on rotated axis", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 150, 140, 110, 100, 300],
						["data1", 30, 200, 100, 400, 150],
						["data2", 130, 340, 200, 500, 250]
					],
					type: "line"
				},
				axis: {
					rotated: true
				}
			};
		});

		function checkTooltip(x, categoryName?) {
			const type = chart.config("axis.x.type");
			let value = x;

			// when
			chart.tooltip.show({x});

			let th = chart.$.tooltip.select("th").text();

			if (type === "timeseries") {
				value = chart.internal.format.xAxisTick(x);
			}

			expect(isNaN(th) ? th : +th).to.be.equal(categoryName ?? value);
		}

		it("check for indexed x axis type", () => {
			chart.xs().data1.forEach(v => {
				checkTooltip(v);
			});
		});

		it("set options", () => {
			args.data.x = "x";
			args.data.columns.unshift(
				["x", "2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"]
			);
			args.axis.x = {
				type: "timeseries",
				tick: {
					format: "%Y-%m-%d"
				}
			};
		});

		it("check for timeseries x axis type", () => {
			chart.xs().data1.forEach(v => {
				checkTooltip(+v);
			});
		});

		it("set options", () => {
			args.data.columns[0] = ["x", "a", "b", "c", "d", "e"];
			args.axis.x = {
				type: "category"
			};
		});

		it("check for category x axis type", () => {
			chart.categories().forEach((v, i) => {
				checkTooltip(i, v);
			});
		});
	});
});
