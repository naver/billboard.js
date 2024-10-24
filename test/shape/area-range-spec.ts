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
				"M5.873,400.242L79.279,400.242L79.279,327.263L226.093,327.263L226.093,322.97L372.907,322.97L372.907,331.556L519.721,331.556L519.721,391.657L593.127,391.657L593.127,344.434L519.721,344.434L519.721,254.283L372.907,254.283L372.907,288.626L226.093,288.626L226.093,292.919L79.279,292.919L79.279,365.899L5.873,365.899Z",
				"M5.873,331.556C5.873,331.556,103.748,270.024,152.686,258.576C201.624,247.128,250.562,265.015,299.5,262.869C348.438,260.722,397.376,232.818,446.314,245.697C495.252,258.576,593.127,340.141,593.127,340.141L593.127,271.455C593.127,271.455,495.252,235.68,446.314,224.232C397.376,212.785,348.438,205.63,299.5,202.768C250.562,199.906,201.624,219.939,152.686,207.061C103.748,194.182,5.873,125.495,5.873,125.495Z",
				"M5.873,254.283L152.686,172.717L299.5,177.01L446.314,245.697L593.127,142.667L593.127,83.424L446.314,39.636L299.5,116.909L152.686,121.202L5.873,185.596Z"
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
				"M5.873,392.883L64.598,392.883L64.598,299.052L182.049,299.052L182.049,293.532L299.5,293.532L299.5,304.571L416.951,304.571L416.951,381.844L534.402,381.844L534.402,288.013L593.127,288.013L593.127,206.325L534.402,206.325L534.402,321.13L416.951,321.13L416.951,205.221L299.5,205.221L299.5,249.377L182.049,249.377L182.049,254.896L64.598,254.896L64.598,348.727L5.873,348.727Z",
				"M5.873,304.571L64.598,304.571L64.598,210.74L182.049,210.74L182.049,216.26L299.5,216.26L299.5,194.182L416.951,194.182L416.951,315.61L534.402,315.61L534.402,172.104L593.127,172.104L593.127,95.935L534.402,95.935L534.402,227.299L416.951,227.299L416.951,166.584L299.5,166.584L299.5,138.987L182.049,138.987L182.049,144.506L64.598,144.506L64.598,39.636L5.873,39.636Z"
			];

			chart.$.line.areas.each(function(d, i) {
				expect(this.getAttribute("d")).to.be.equal(expected.shift());
			});	
		});
	});
});
