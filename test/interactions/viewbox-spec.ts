/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterEach, describe, expect, it, afterAll} from "vitest";
import {getTransformCTM} from "../assets/module/util";
import {fireEvent} from "../assets/helper";
import util from "../assets/util";

describe("viewBox", function() {
	let chart;
	let temp: any = [];
	let args: any = {
		size: {
			width: 300,
			height: 200
		},
		resize: {
			auto: false
		},
		data: {
			columns: [
				["data1", 300, 350, 300, 0, 0, 0],
				["data2", 130, 100, 140, 200, 150, 50]
			],
			type: "bar"
		},
		axis: {
			rotated: false
		},
		onrendered() {
			this.$.svg.attr("viewBox", "0 0 320 240")
				.style("width", "100%")
				.style("height", "auto");
		},
		tooltip: {
			onshown() {
				const type = this.config("data.type");
				const selector = type === "bar" ? "th" : ".name";
				const value = this.$.tooltip.select(selector)?.text?.();

				temp.push(value);
			}
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	afterEach(() => {
		temp = [];
		chart.destroy();
	});

	describe("check interaction", () => {
		beforeAll(() => {
			args = {
				size: {
					width: 300,
					height: 200
				},
				resize: {
					auto: false
				},
				data: {
					columns: [
						["data1", 300, 350, 300, 0, 0, 0],
						["data2", 130, 100, 140, 200, 150, 50]
					],
					type: "bar"
				},
				axis: {
					rotated: false
				},
				onafterinit() {
					this.$.svg.attr("viewBox", "0 0 320 240")
						.style("width", "100%")
						.style("height", "auto");
				},
				tooltip: {
					onshown() {
						const type = this.config("data.type");
						const isBar = type === "bar";
						const selector = isBar ? "th" : ".name";
						const value = this.$.tooltip.select(selector)?.text?.();

						this.$.tooltip.style("top")

						if (isBar) {
							temp.push(value);
						} else {
							temp.push({
								top: util.parseNum(this.$.tooltip.style("top")),
								left: util.parseNum(this.$.tooltip.style("left")),
								value
							});
						}
					}
				}
			};
		});

		it("check transform CTM", () => {
			const {internal: {$el: {svg}}} = chart;
			const ctm = getTransformCTM(svg.node(), 100, 100);
			const inverse = getTransformCTM(svg.node(), ctm.x, ctm.y, false);

			expect(inverse.x).to.be.equal(100);
			expect(inverse.y).to.be.equal(100);
		});

		it("should show tooltip on viewBox scale", () => {
			const {internal: {$el: {eventRect}}} = chart;

			[70, 170, 270, 370, 430, 470].forEach(x => {
				fireEvent(eventRect.node(), "mousemove", {
					clientX: x,
					clientY: 50
				}, chart);
			});

			expect(temp.map(Number)).to.be.deep.equal([0, 1, 2, 3, 4, 5]);
		});

		it("set options: axis.rotated=true", () => {
			args.axis.rotated = true;
		});

		it("should show tooltip on viewBox scale: roated axis", () => {
			const {internal: {$el: {eventRect}}} = chart;

			[10, 50, 80, 100, 150, 200, 250].forEach(y => {
				fireEvent(eventRect.node(), "mousemove", {
					clientX: 50,
					clientY: y
				}, chart);
			});

			expect(temp.map(Number)).to.be.deep.equal([0, 1, 2, 3, 4, 5]);

		});

		it("set options", () => {
			args.data.type = "pie";
		});

		it("should show tooltip on pie", () => {
			const {arc} = chart.$;
			const expected = [
				{
					"left": 0,
					"top": 426.656,
					"value": "data1",
				  },
				  {
					"left": 445.297,
					"top": 213.328,
					"value": "data2",
				  }
			];

			arc.selectAll("path").each(function(d, i) {
				fireEvent(this, "mousemove", {
					clientX: 250,
					clientY: 150
				}, chart);
			});

			expect(temp).to.be.deep.equal(expected);
		});
	});
});
