/**
 * Copyright (c) 2017 NAVER Corp.
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
		before(() => {
			args = {
				data: {
					columns: [
						["x", "Design", "Price", "Brand"],
						["data1", 30, 200, 100]
					],
					type: "radar"
				},
				radar: {}
			};
		});

		it("Should render level, axes and data edges", () => {
			const radar = chart.internal.main.select(`.${CLASS.chartRadars}`);
			const data = chart.data();
			const dataLen = data[0].values.length;

			const axes = radar.selectAll(`.${CLASS.axis} g`);
			const levels = radar.selectAll(`.${CLASS.levels} g`);

			expect(axes.size()).to.be.equal(dataLen);
			expect(levels.size()).to.be.equal(dataLen);

			// check levels and data points
			radar.selectAll("polygon").each(function() {
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
			const radar = chart.internal.main.select(`.${CLASS.chartRadars}`);
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
			const radar = chart.internal.main.select(`.${CLASS.chartRadars}`);
			const levels = radar.select(`.${CLASS.levels}`);
			const level = levels.selectAll("polygon");

			// check for level element depth size
			expect(args.radar.level.depth).to.be.equal(level.size());

			// level should be hidden
			level.each(function() {
				expect(this.style.visibility).to.be.equal("hidden");
			});
		});
	});
});
