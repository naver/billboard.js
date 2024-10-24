/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import {$AXIS, $CIRCLE, $TEXT} from "../../src/config/classes";
import util from "../assets/util";
import {isArray, isObject} from "../../src/module/util";

describe("SHAPE BUBBLE", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("with indexed data", () => {
		let maxR = d => Math.sqrt(d.value * 2);

		beforeAll(() => {
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
			let r = +chart.$.main.select(`.${$CIRCLE.circles}-data1 .${$CIRCLE.circle}-3`).attr("r");
			expect(r).to.be.equal(35);

			// check for the minimum
			r = +chart.$.main.select(`.${$CIRCLE.circles}-data2 .${$CIRCLE.circle}-2`).attr("r");
			expect(r).to.be.closeTo(5, 1);
		});

		it("bubble size should be updated", () => new Promise(done => {
			chart.load({
				columns: [
					['data1', 500, 350, 200, 380, 10]
				],
				done: function() {
					chart.$.main.selectAll(`.${$CIRCLE.circles}-data1 circle`)
						.each(function(v, i) {
							const r = +d3Select(this).attr("r");

							if (i === 0) {
								expect(r).to.be.equal(35);
							} else if (i === 4) {
								expect(r).to.be.closeTo(5, 1);
								done(1);
							}
						});
				}
			});
		}));

		it("set options bubble.maxR", () => {
			args.bubble = {
				maxR: 50
			};
		});

		it("check the radius: customized", () => {
			const r = +chart.$.main.select(`.${$CIRCLE.circles}-data1 .${$CIRCLE.circle}-3`).attr("r");

			expect(r).to.be.equal(50);
		});

		it("set options data.labels", () => {
			args.data.labels = true
		});

		it("check for the label text", () => {
			args.data.columns.forEach((v, i) => {
				chart.$.main.selectAll(`.${$TEXT.chartTexts}-data${i+1} text`).each(function(w, j) {
					expect(+d3Select(this).text()).to.be.equal(v[j+1]);
				});
			});
		});

		it("set options bubble.maxR as function", () => {
			args.bubble = { maxR };
		});

		it("check the radius: customized", () => {
			const value = chart.data.values("data1")[3];
			const r = +chart.$.main.select(`.${$CIRCLE.circles}-data1 .${$CIRCLE.circle}-3`).attr("r");

			expect(r).to.be.equal(maxR({value}));
		});

		it("set options bubble.maxR as non-valid string", () => {
			args.bubble = {
				maxR: "non-valid"
			};
		});

		it("check the radius: customized", () => {
			const value = chart.data.values("data1")[3];
			const r = +chart.$.main.select(`.${$CIRCLE.circles}-data1 .${$CIRCLE.circle}-3`).attr("r");

			expect(r).to.be.equal(
				chart.internal.getBubbleR({value})
			);
		});

		it("set options [bubble.zerobased=true]", () => {
			args.bubble = {
				zerobased: true
			};
		});

		it("should be zerobased", () => {
			chart = util.generate(args);

			const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
			const translateValues = [426, 377, 328, 279, 230, 181, 131, 82, 33];

			tickNodes.each(function(d, i) {
				expect(util.parseNum(this.getAttribute("transform"))).to.be.closeTo(translateValues[i], 1);
			});
		});

		it("set options [bubble.zerobased=false]", () => {
			args.bubble = {
				zerobased: false
			};
		});

		it("should not be zerobased", () => {
			chart = util.generate(args);

			const tickNodes = chart.$.svg.select(`.${$AXIS.axisY}`).selectAll("g.tick");
			const translateValues = [389, 344, 299, 254, 209, 164, 119, 74, 29];

			tickNodes.each(function(d, i) {
				expect(util.parseNum(this.getAttribute("transform"))).to.be.closeTo(translateValues[i], 1);
			});
		});
	});

	describe("with dimension data", () => {
		beforeAll(() => {
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

			chart.$.circles.each(function(v) {
				// check for data value
				expect(v.value).to.be.deep.equal(data[i]);

				// check for the radius size
				expect(+this.getAttribute("r")).to.be.equal(chart.internal.getBubbleR(v));

				// check for the y position
				const y = (isArray(v.value) && v.value[0]) ||
					(isObject(v.value) && v.value.y) || v.value;

				expect(+this.getAttribute("cy")).to.be.equal(chart.internal.scale.y(y));

				i++;
			});
		});
	});
});
