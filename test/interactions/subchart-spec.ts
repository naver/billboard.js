/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {expect} from "chai";
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("SUBCHART", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	// do mouse drag selection
	const doDrag = (from = {clientX: 100, clientY: 100}, to = {clientX: 200, clientY: 200}) => {
		const overlay = chart.$.svg.select(".overlay").node();

		util.fireEvent(overlay, "mousedown", from, chart);
		util.fireEvent(overlay, "mousemove", to, chart);
		util.fireEvent(overlay, "mouseup", from, chart);
	};

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
			const baseWidth = 100;

			// mouse drag selection on subchart
			doDrag();

			expect(+selection.attr("width")).to.be.equal(baseWidth);

			// when
			chart.resize({width:400});

			// should be maintain zoom area after resize
			setTimeout(() => {
				expect(+selection.attr("width")).to.be.below(baseWidth);
				expect(chart.internal.scale.x.domain()).to.not.deep.equal(chart.internal.orgXDomain);
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

	describe("the extent", () => {
		before(() => {
			args = {
				data: {
					x: "x",
					columns: [
						['x', '2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05'],
						["data1", 10, 5, 3, 8, 7]
					]
				},
				subchart: {
					show: true
				},
				axis: {
					x: {
						type: "timeseries",
						tick: {
							format: "%Y-%m-%d"
						},
						extent: [0, 100]
					}
				}
			};
		});

		it("should be limiting selection area", () => {
			const selection = chart.$.svg.select(".selection");

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(Math.floor(selection.attr("width"))).to.be.equal(args.axis.x.extent[1]);
		});

		it("set options axis.x.extent=datetime", () => {
			args.axis.x.extent = ["2019-01-01", "2019-01-02"];
		});

		it("should be limiting selection area for datetime extent", () => {
			const selection = chart.$.svg.select(".selection");			
			const range = args.axis.x.extent
				.map(v => chart.internal.scale.subX(new Date(v)))
				.reduce((a, c) => Math.abs(a - c));

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(+selection.attr("width")).to.be.closeTo(range, 10);
		});

		it("set options axis.x.extent=[0, 100]", () => {
			args.axis.x.extent = (domain, scale) => [0, 100];
		});

		it("should be limiting selection area", () => {
			const selection = chart.$.svg.select(".selection");

			// mouse drag selection on subchart
			doDrag( {clientX: 0, clientY: 0}, {clientX: 300, clientY: 300});

			// selection shouldn't over pass
			expect(Math.floor(selection.attr("width"))).to.be.equal(args.axis.x.extent()[1]);
		});
	});
});
