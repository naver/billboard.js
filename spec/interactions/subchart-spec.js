/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import { doesNotReject } from "assert";

describe("SUBCHART", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("generate subchart", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "www.somesitename1.com", "www.somesitename2.com", "www.somesitename3.com"],
						["data1", 90, 100, 140],
						["data2", 130, 40, 200]
					],
					types: {
						data1: "bar",
						data2: "area-spline"
					}
				},
				axis: {
					x: {
					  type: "category"
					}
				},
				subchart: {
					show: true,
					axis: {
						x: {
							show: true,
							tick: {
								show: true,
								text: {
									show: true
								}
							}
						}
					}
				}
			};
		});

		it("should subchart elements generated", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			}).node().parentNode;
			const children = subchart.children;

			expect(children.length).to.be.equal(3);

			expect(children[0].querySelectorAll(`.${CLASS.chartBars}, .${CLASS.chartLines}`).length).to.be.equal(2);
			expect(children[1].classList.contains(CLASS.brush)).to.be.true;
			expect(children[2].classList.contains(CLASS.axisX)).to.be.true;
		});

		it("set options subchart.size={height:80}", () => {
			args.subchart.size = {height: 80};
		});

		it("should be applied height value", () => {
			const height = +chart.$.svg.select(".overlay").attr("height");

			expect(height).to.be.equal(args.subchart.size.height);
		});

		it("should generate tick nodes", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick line").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick text").length).to.be.equal(3);
		});

		it("set options subchart.axis.x.tick=false", () => {
			args.subchart.axis.x.tick.show = false;
		});

		it("shouldn't be generating tick lines", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick line").length).to.be.equal(0);
		});

		it("set options subchart.axis.x.tick.text=false", () => {
			args.subchart.axis.x.tick.show = true;
			args.subchart.axis.x.tick.text.show = false;
		});

		it("shouldn't be generating tick text", () => {
			const axis = chart.$.svg.selectAll(`.${CLASS.axisX}`).nodes()[1];

			expect(axis.querySelectorAll(".tick line").length).to.be.equal(3);
			expect(axis.querySelectorAll(".tick text").length).to.be.equal(0);
		});

		it("set options subchart.axis.x.show=false", () => {
			args.subchart.axis.x.show = false;
		});
		
		it("shouldn't be generating tick nodes", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			}).node().parentNode;
			const axis = subchart.querySelector(`.${CLASS.axisX}`).children;

			expect(axis.length).to.be.equal(1);
			expect(axis[0].classList.contains("domain")).to.be.true;
		});

		it("set options subchart.show=false", () => {
			args.subchart.show = false;
		});

		it("shouldn't be generating subchart's nodes", () => {
			const subchart = chart.$.svg.selectAll("[clip-path]").filter(function() {
				return /subchart/.test(this.getAttribute("clip-path"))
			});

			expect(subchart.empty()).to.be.true;
			expect(chart.internal.clipSubchart).to.be.undefined;
		})
	});

	describe("subchart selection", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["sample", 30, 200, 100, 400, 150, 250]
					]
				},
				subchart: {
					show: true
				}
			};
		});

		const checkSelection = done => {
			const selection = chart.$.svg.select(".selection");
			const overlay = chart.$.svg.select(".overlay").node();
			const baseWidth = 100;

			// do mouse selection
			util.fireEvent(overlay, "mousedown", {
				clientX: 100,
				clientY: 100
			}, chart);

			util.fireEvent(overlay, "mousemove", {
				clientX: 200,
				clientY: 200
			}, chart);

			util.fireEvent(overlay, "mouseup", {
				clientX: 200,
				clientY: 200
			}, chart);

			expect(+selection.attr("width")).to.be.equal(baseWidth);

			// when
			chart.resize({width:400});

			// should be maintain zoom area after resize
			setTimeout(() => {
				expect(+selection.attr("width")).to.be.below(baseWidth);
				expect(chart.internal.x.domain()).to.not.deep.equal(chart.internal.orgXDomain);
				done();
			}, 300);
		};

		it("should be select subchart area", checkSelection);

		it("set options axis.x.type='category'", () => {
			args.axis = {
				x: {
					type: "category",
					categories: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6"]
				}
			};
		});

		it("should be select subchart area for category type x axis", checkSelection);
	});
});
