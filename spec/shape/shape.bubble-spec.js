/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import CLASS from "../../src/config/classes";
import util from "../assets/util";
import {isArray, isObject} from "../../src/internals/util";

describe("SHAPE BUBBLE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with indexed data", () => {
		let maxR = d => Math.sqrt(d.value * 2);

		before(() => {
			args = {
				data: {
					columns: [
						['data1', 30, 350, 200, 380, 150],
						['data2', 130, 100, 10, 200, 80]
					],
					type: "bubble"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("check the radius: default", () => {
			// check for the maximum
			let r = +chart.$.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");
			expect(r).to.be.equal(35);

			// check for the minimum
			r = +chart.$.main.select(`.${CLASS.circles}-data2 .${CLASS.circle}-2`).attr("r");
			expect(r).to.be.closeTo(5, 1);
		});

		it("bubble size should be updated", done => {
			chart.load({
				columns: [
					['data1', 500, 350, 200, 380, 10]
				]
			});

			setTimeout(() => {
				chart.$.main.selectAll(`.${CLASS.circles}-data1 circle`)
					.each(function(v, i) {
						const r = +d3.select(this).attr("r");

						if (i === 0) {
							expect(r).to.be.equal(35);
						} else if (i === 4) {
							expect(r).to.be.closeTo(5, 1);
							done();
						}
					});
			}, 500);
		});

		it("set options bubble.maxR", () => {
			args.bubble = {
				maxR: 50
			};
		});

		it("check the radius: customized", () => {
			const r = +chart.$.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");

			expect(r).to.be.equal(50);
		});

		it("set options data.labels", () => {
			args.data.labels = true
		});

		it("check for the label text", () => {
			args.data.columns.forEach((v, i) => {
				chart.$.main.selectAll(`.${CLASS.chartTexts}-data${i+1} text`).each(function(w, j) {
					expect(+d3.select(this).text()).to.be.equal(v[j+1]);
				});
			});
		});

		it("set options bubble.maxR as function", () => {
			args.bubble = { maxR };
		});

		it("check the radius: customized", () => {
			const value = chart.data.values("data1")[3];
			const r = +chart.$.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");

			expect(r).to.be.equal(maxR({value}));
		});

		it("set options bubble.maxR as non-valid string", () => {
			args.bubble = {
				maxR: "non-valid"
			};
		});

		it("check the radius: customized", () => {
			const value = chart.data.values("data1")[3];
			const r = +chart.$.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");

			expect(r).to.be.equal(
				chart.internal.getBubbleR({value})
			);
		});
	});

	describe("with dimension data", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 20, 40, 60],
						["data2", {y: 350, z: 150}, 200, {y: 200, z: 150}],
						["data3", [150, 50], {y: 350, z: 50}, [400, 50]],
					],
					type: "bubble"
				},
				axis: {
					x: {
						type: "category"
					}
				}
			};
		});

		it("check for the correct rendering", () => {
			let data = [];
			let i = 0;

			args.data.columns.forEach(v => {
				data = data.concat(v.slice(1));
			});

			chart.$.line.circles.each(function(v) {
				// check for data value
				expect(v.value).to.be.deep.equal(data[i]);

				// check for the radius size
				expect(+this.getAttribute("r")).to.be.equal(chart.internal.getBubbleR(v));

				// check for the y position
				const y = (isArray(v.value) && v.value[0]) ||
					(isObject(v.value) && v.value.y) || v.value;

				expect(+this.getAttribute("cy")).to.be.equal(chart.internal.y(y));

				i++;
			});
		});
	});
});
