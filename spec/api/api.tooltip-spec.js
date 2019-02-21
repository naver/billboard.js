/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API tooltip", () => {
	let chart;
	let args = {
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
			const internal = chart.internal;
			const config = internal.config;
			const tooltip = internal.tooltip;
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
				const data = tooltip.select(`.${CLASS.tooltipName}-${id}`);
				const value = chart.data(id)[0].values[x];

				expect(id).to.be.equal(v.id);
				expect(tooltip.select("th").html()).to.be.equal(d3.timeFormat(config.axis_x_tick_format)(value.x));
				expect(data.select(".name").text()).to.be.equal(id);
				expect(+data.select(".value").html()).to.be.equal(value.value);
			});

			// hide tooltip
			chart.tooltip.hide();

			expect(tooltip.style("display")).to.be.equal("none");
		});

		it("should show/hide tooltip using 'x' option", () => {
			const tooltip = chart.internal.tooltip;
			const x = new Date("2018-01-03 00:00");

			// show tooltip
			chart.tooltip.show({ x });

			expect(tooltip.html()).to.be.ok;
			expect(tooltip.style("display")).to.be.equal("block");

			// hide tooltip
			chart.tooltip.hide();

			expect(tooltip.style("display")).to.be.equal("none");
		});
	});

	describe("for multiple x", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		before(() => {
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
	});

	describe("for tooltip.grouped=false", () => {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();

		before(() => {
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
});
