/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import util from "../assets/util";
import {parseNum} from "../assets/helper";
import x from "../../src/Chart/api/x";

describe("TREEMAP", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("shapes rendering", () => {
		before(() => {
			args = {
				padding: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				data: {
					columns: [
						["data1", 1000],
						["data2", 200],
						["data3", 500],
						["data4", 50],
						["data5", 100],
						["data6", 70],
						["data7", 200],
						["data8", 133],
						["data9", 220],
						["data10", 15],
					],
					type: "treemap",
					labels: {
						colors: "#000",
						centered: true
						
					}
				},
				treemap: {
					label:{
						threshold: 0.03
					}
				}
			};
		});

		it("check rect position", () => {
			const expectedXY = {
				data1: [0, 0],
				data2: [257, 232],
				data3: [257, 0],
				data4: [552, 389],
				data5: [561, 232],
				data6: [457, 389],
				data7: [257, 356],
				data8: [457, 232],
				data9: [523, 0],
				data10: [552, 459]
			};

			// check rect pos
			chart.internal.$el.treemap.selectAll("g").each(function(d) {
				const coords = this.getAttribute("transform").trim().split(",").map(parseNum);

				expect(coords).to.be.deep.equal(expectedXY[d.data.id]);
			});
		});

		it("check rect size", () => {
			const expectedSize = {
				data1: [257, 480],
				data2: [200, 124],
				data3: [266, 232],
				data4: [88, 70],
				data5: [79, 157],
				data6: [95, 91],
				data7: [200, 124],
				data8: [104, 157],
				data9: [117, 232],
				data10: [88, 21]
			};

			// check rect size
			chart.internal.$el.treemap.selectAll("rect").each(function(d) {
				const rectSize = [
					+this.getAttribute("width"),
					+this.getAttribute("height")
				];

				expect(rectSize).to.be.deep.equal(expectedSize[d.data.id]);
			});
		});

		it("check text position", () => {
			const expectedTextXY = {
				data1: [128.5, 251.75],
				data2: [305.75, 357],
				data3: [127.75, 390],
				data4: [435.75, 596],
				data5: [322.25, 600.5],
 				data6: [446.25, 504.5],
				data7: [357, 429.75],
				data8: [322.25, 509],
				data9: [127.75, 581.5],
				data10: [481.25, 596]
			};

			// check text pos & threshold
			const totalValue = chart.internal.$el.treemap.datum().value;
			let i = 0;

			chart.$.text.texts.each(function(d) {
				const coords = this.parentNode.getAttribute("transform").trim().split(" ").map(parseNum).sort();
				const isUnderThreshold = d.value  / totalValue < args.treemap.label.threshold;

				coords.forEach((v, i) => {
					expect(v).to.be.closeTo(expectedTextXY[d.id][i], 20);
				});
				
				expect(this.childElementCount).to.be.equal(2);
				expect(/data\d+\.\d+%/.test(this.textContent)).to.be.ok;

				if (isUnderThreshold) {
					i++;
					expect(this.style.opacity).to.be.equal("0");
				}
			});

			expect(i).to.be.equal(3);
		});

		it("set options: padding", () => {
			args.padding = {
				top: 10,
				right: 20,
				bottom: 30,
				left: 40
			};
		});

		it("check padding", () => {
			const {internal: {scale: {x, y}}} = chart;
			const {svg, main} = chart.$;

			const xRange = x.range();
			const yRange = y.range();

			expect(xRange[0]).to.be.equal(args.padding.left);
			expect(xRange[1]).to.be.equal(+svg.attr("width") - args.padding.right);
			expect(yRange[0]).to.be.equal(args.padding.top);
			expect(yRange[1]).to.be.equal(+svg.attr("height") -args.padding.bottom);
		});
	});

	describe("label options", () => {
		before(() => {
			args.treemap.label = {
				show: false,
				format: function(value, ratio, id) {
					return value;
				}
			};
		});

		after(() => {
			args.treemap.label = {
				show: true
			};
		});

		it("formatter applied correctly?", () => {
			chart.$.text.texts.each(function(d) {
				expect(this.style.opacity).to.be.equal("0");
				expect(+this.textContent).to.be.equal(d.value);
			});
		});
	});

	describe("interaction", () => {
		it("data load via .load() API", done => {
			const orgValue = chart.data.values("data1");
			const dataLen = chart.data().length;

			chart.load({
				columns: [
					["data1", 300]
				], 
				unload: ["data10"],
				done: function() {
					expect(this.data.values("data1")[0]).to.be.equal(300);
					expect(chart.data().length).to.be.equal(dataLen - 1);
					done();
				}
			});
		});

		it("tooltip show via .tooltip.show() API", () => {
			const id = "data1";

			// when
			chart.tooltip.show({data: {id}});

			expect(chart.$.tooltip.select(".name").text()).to.be.equal(id);
			expect(chart.$.tooltip.style("display")).to.be.equal("block");

			// when
			chart.tooltip.hide();

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});
	});
});
