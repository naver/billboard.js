/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll,  describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import {$COMMON, $LINE} from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE AREA-RANGE", () => {
	let chart;
	let args;
	let skipEach = false;

	beforeEach(function() {
		if (skipEach) {
			return;
		}

		chart = util.generate(args);
	});

	describe("area-range type generation", () => {
		const min = 120;
		const max = 220;

		beforeAll(() => {
			args = {
				data: {
					x: "timestamps",
					columns: [
						["timestamps", "2013-01-01", "2013-01-02", "2013-01-03", "2013-01-04", "2013-01-05", "2013-01-06"],
						["data1",
							[null, null, null],
							null,
							[160, 135, 120],
							[135, min, 110],
							[180, 150, 130],
							[199, 160, 125]
						],
						["data2",
							null,
							{high: null, mid: null, low: null},
							{high: 230, mid: max, low: 200},
							{high: 210, mid: 200, low: 180},
							{high: 220, mid: 210, low: 190},
							{high: 200, mid: 180, low: 160}
						],
						["data3", 130, 140, 200, 150, 210, 150]
					],
					type: "area-spline-range",
					types: {
						data3: "bubble"
					}
				},
				axis: {
					x: {
						type: "timeseries"
					}
				}
			};
		});

		const checkLineLen = dataName => {
			const target = chart.$.main.select(`.${$LINE.chartLine}.${$COMMON.target}-${dataName}`);
			const commands = target.select(`.${$LINE.line}-${dataName}`).attr("d").split("C");
			const dataLen = chart.internal.filterRemoveNull(chart.data(dataName)[0].values).length;

			expect(commands.length).to.be.equal(dataLen);

			// null data points, shouldn't be showing
			chart.$.circles.filter(d => d.id === dataName).each(function(d, i) {
				expect(this.style.opacity).to.be.equal(i > 1 ? '' : "0");
			})
		};

		it("Should render the lines correctly when array data supplied", () => new Promise(done => {
			setTimeout(() => {
				checkLineLen("data1");
				checkLineLen("data2");
				done(1);
			}, 300)
		}));

		it("should use cardinal interpolation by default", () => {
			expect(chart.internal.config.spline_interpolation_type).to.be.equal("cardinal");
		});

		it("should return correct min/max data", () => {
			const minMax = chart.internal.getMinMaxValue();

			expect(minMax.min).to.be.equal(min);
			expect(minMax.max).to.be.equal(max);
		});
	});

	describe("combined area-range type with grouped data", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 20, 50, 40, 60, 50],
						["data2", 200, 130, 90, 240, 130, 220],
						["data3", [130,120,110], [120,110,100], [150,140,130], [140,130,120],[160,150,140],[150,140,130]],
					],
					type: "bar",
					types: {
						data3: "area-line-range"
					},
					groups: [
						["data1", "data2"]
					]
				}
			}
		});

		it("check for correct generation", () => {
			const d = chart.$.line.lines.attr("d");
			const box = util.getBBox(d3Select(`.${$LINE.chartLine}.${$COMMON.target}-data3`));

			// check for correct path data
			expect(/NaN/.test(d)).to.be.false;

			// check for correct pos
			expect(Math.round(box.height)).to.be.equal(83);
			expect(Math.round(box.y)).to.be.equal(205);
		});

		it("set options", () => {
			args = {
				data: {
					columns: [
						["data1",
							[70, 40, 30],
							[155, 130, 115],
							[160, 135, 120],
							[200, 120, 110],
							[95, 50, 40]
						],
						["data2",
							[350, 220, 110],
							[255, 230, 195],
							[260, 250, 190],
							[235, 220, 210],
							[180, 150, 100]
						],
						["data3",
							[280, 250, 200],
							[355, 330, 295],
							[360, 350, 290],
							[450, 320, 210],
							[399, 360, 330]
						]
					],
					types: {
						data1: "area-step-range",
						data2: "area-spline-range",
						data3: "area-line-range"
					}
				}
			};
		});

		it("check all range type path", () => {
			const expected = [
				"M6,400.242L79.5,400.242L79.5,327.263L226.5,327.263L226.5,322.97L373.5,322.97L373.5,331.556L520.5,331.556L520.5,391.657L594,391.657L594,344.434L520.5,344.434L520.5,254.283L373.5,254.283L373.5,288.626L226.5,288.626L226.5,292.919L79.5,292.919L79.5,365.899L6,365.899Z",
				"M6,331.556C6,331.556,104,270.024,153,258.576C202,247.128,251,265.015,300,262.869C349,260.722,398,232.818,447,245.697C496,258.576,594,340.141,594,340.141L594,271.455C594,271.455,496,235.68,447,224.232C398,212.785,349,205.63,300,202.768C251,199.906,202,219.939,153,207.061C104,194.182,6,125.495,6,125.495Z",
				"M6,254.283L153,172.717L300,177.01L447,245.697L594,142.667L594,83.424L447,39.636L300,116.909L153,121.202L6,185.596Z"
			];

			chart.$.line.areas.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected.shift());
			});
		});
	});

	describe("area-step-range", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1",
							[70, 40, 30],
							[155, 130, 115],
							[160, 135, 120],
							[200, 120, 110],
							[95, 50, 40],
							[199, 160, 125]
						],
						["data2",
							[350, 220, 110],
							[255, 230, 195],
							[260, 250, 190],
							[235, 220, 210],
							[180, 150, 100],
							[299, 260, 230]
						]
					],
					type: "area-step-range"
				}
			};
		});

		it("check range path", () => {
			const expected = [
				"M6,392.883L65,392.883L65,299.052L182.5,299.052L182.5,293.532L300,293.532L300,304.571L417.5,304.571L417.5,381.844L535,381.844L535,288.013L594,288.013L594,206.325L535,206.325L535,321.13L417.5,321.13L417.5,205.221L300,205.221L300,249.377L182.5,249.377L182.5,254.896L65,254.896L65,348.727L6,348.727Z",
				"M6,304.571L65,304.571L65,210.74L182.5,210.74L182.5,216.26L300,216.26L300,194.182L417.5,194.182L417.5,315.61L535,315.61L535,172.104L594,172.104L594,95.935L535,95.935L535,227.299L417.5,227.299L417.5,166.584L300,166.584L300,138.987L182.5,138.987L182.5,144.506L65,144.506L65,39.636L6,39.636Z"
			];

			chart.$.line.areas.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected.shift());
			});	
		});
	});
});
