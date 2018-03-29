/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API tooltip", () => {
	const chart = util.generate({
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
	});

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
