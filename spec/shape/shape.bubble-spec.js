/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import CLASS from "../../src/config/classes";
import util from "../assets/util";

describe("SHAPE BUBBLE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with indexed data", () => {
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
			let r = +chart.internal.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");
			expect(r).to.be.equal(35);

			// check for the minimum
			r = +chart.internal.main.select(`.${CLASS.circles}-data2 .${CLASS.circle}-2`).attr("r");
			expect(r).to.be.closeTo(5, 1);
		});

		it("bubble size should be updated", done => {
			chart.load({
				columns: [
					['data1', 500, 350, 200, 380, 10]
				]
			});

			setTimeout(() => {
				chart.internal.main.selectAll(`.${CLASS.circles}-data1 circle`)
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
			const r = +chart.internal.main.select(`.${CLASS.circles}-data1 .${CLASS.circle}-3`).attr("r");

			expect(r).to.be.equal(50);
		});

		it("set options data.labels", () => {
			args.data.labels = true
		});

		it("check for the label text", () => {
			args.data.columns.forEach((v, i) => {
				chart.internal.main.selectAll(`.${CLASS.chartTexts}-data${i+1} text`).each(function(w, j) {
					expect(+d3.select(this).text()).to.be.equal(v[j+1]);
				});
			});
		});
	});
});
