/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$AXIS} from "../../src/config/classes";

describe("API x", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe(".x()", () => {
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

		it("check for: indexed Axis", () => {
			const x = chart.x();
			let xValue = [0, 1, 2];
			const checkFn = v => {
				expect(x[v]).to.deep.equal(xValue);
			};

			Object.keys(x).forEach(checkFn);

			// update x value
			xValue = [2,5,8];
			Object.keys(chart.x(xValue)).forEach(checkFn);

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick tspan`).each(function(v, i) {
				expect(+this.textContent).to.be.equal(xValue[i]);
			});
		});

		it("set options for category Axis", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "a", "b", "c"],
						["data1", 30, 200, 100],
						["data2", 130, 100, 140]
					]
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("check for: category Axis", () => {
			const x = chart.x();
			let xValue = ["a", "b", "c"];

			expect(x).to.be.deep.equal(xValue);

			xValue = ["d", "e", "f"];
			expect(chart.x(xValue)).to.be.deep.equal(xValue);

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick tspan`).each(function(v, i) {
				expect(this.textContent).to.be.equal(xValue[i]);
			});
		});
	});

	describe(".xs()", () => {
		let xs: any = {
			x1: [10, 30, 45],
			x2: [30, 50, 75]
		};

		beforeAll(() => {
			args = {
				data: {
					xs: {
						data1: "x1",
						data2: "x2"
					},
					columns: [
						["x1"].concat(xs.x1),
						["x2"].concat(xs.x2),
						["data1", 30, 200, 100],
						["data2", 20, 180, 240]
					]
				}
			};
		});

		it("should return & update xs values", () => {
			let xsValue = chart.xs();

			Object.keys(xs).forEach((v, i) => {
				expect(xsValue[`data${i + 1}`]).to.deep.equal(xs[v]);
			});

			xs = {
				data1: [15, 35, 58],
				data2: [33, 55, 82]
			};

			xsValue = chart.xs(xs);
			expect(xsValue).to.be.deep.equal(xs);

			xsValue = xsValue.data1.concat(xsValue.data2).sort();

			chart.$.main.selectAll(`.${$AXIS.axisX} .tick tspan`).each(function(v, i) {
				expect(+this.textContent).to.be.equal(xsValue[i]);
			});
		});
	});
});
