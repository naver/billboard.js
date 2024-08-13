/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$COMMON, $ARC} from "../../src/config/classes";

describe("TOOLTIP: on redraws", function() {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	function getTooltipText(ctx) {
		const {tooltip} = ctx.$;

		return {
			name: tooltip.selectAll(".name"),
			value: tooltip.selectAll(".value")
		};
	}

	describe("Multiple xs", () => {
		beforeAll(() => {
			args = {
				data: {
					xs: {
						data1: "x1",
						data2: "x2"
					},
					columns: [
						["x1", 10, 30, 45, 50, 70, 100],
						["x2", 30, 50, 70, 100, 120],
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 20, 180, 148, 100, 190]
					],
					type: "line"
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			util.hoverChart(chart, "mousemove", {
				clientX: 487,
				clientY: 317
			});

			chart.load({
				xs: {
					data3: "x2"
				},
				columns: [
					["data3", 100, 250, 145, 100, 100]
				],
				done: function() {
					const {name, value} = getTooltipText(this);

					expect(name.size()).to.be.equal(3);
					expect(value.size()).to.be.equal(3);

					expect(name.filter((d, i) => i === 2).text()).to.be.equal("data3");
					expect(+value.filter((d, i) => i === 2).text()).to.be.equal(100);

					done(1);
				}
			});
		}));
	});

	describe("Single x", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 300, 350, 148, 300, 500]
					],
					type: "line"
				},
				point: {
					focus: {
						only: true
					}
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			util.hoverChart(chart, "mousemove", {
				clientX: 487,
				clientY: 317
			});

			chart.load({
				columns: [
					["data3", 100, 250, 145, 100, 100]
				],
				done: function() {
					const {name, value} = getTooltipText(this);
					const {circles} = this.$;

					expect(circles.size()).to.be.equal(2);
					
					// check if all data points are expanded
					circles.each(function() {
						expect(this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1).to.be.true;
						expect(+this.getAttribute("r")).to.be.greaterThan(4);
					});

					expect(name.filter((d, i) => i === 1).text()).to.be.equal("data3");
					expect(+value.filter((d, i) => i === 1).text()).to.be.equal(100);
					
					done(1);
				}
			});
		}));
	});

	describe("Single x, load different value", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 130, 340, 200, 500, 250]
					],
					type: "line"
				},
				axis: {
					y: {
						min: 0
					}
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			util.hoverChart(chart, "mousemove", {
				clientX: 487,
				clientY: 317
			});

			chart.load({
				columns: [
					["data1", 100, 250, 145, 100, 100]
				],
				done: function() {
					const {value} = getTooltipText(this);

					expect(value.size()).to.be.equal(1);
					expect(+value.text()).to.be.equal(100);
					
					done(1);
				}
			});
		}));
	});

	describe("Treemap", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 1300],
						["data2", 200],
						["data3", 500],
						["data4", 50],
						["data5", 100],
						["data6", 70],
						["data7", 200],
						["data8", 133],
						["data9", 220],
						["data10", 15]
					],
					type: "treemap",
					labels: {
						colors: "#fff"
					}
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			chart.tooltip.show({
				data: {
					id: "data1"
				}
			});

			chart.load({
				columns: [
					["data4", 1000],
					["data5", 280]
				],
				unload: ["data1"],
				done: function() {
					setTimeout(() => {
						const {name, value} = getTooltipText(this);

						expect(value.size()).to.be.equal(1);
						expect(value.text()).to.be.equal("38.20%");

						done(1);
					}, 300);
				}
			});
		}));
	});

	describe("Pie", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 120]
					],
					type: "pie"
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			const target = chart.$.arc.select(`path.${$ARC.arc}-data2`).node();

			setTimeout(() => {
				util.hoverChart(chart, "mouseover", {
					clientX: 350,
					clientY: 100
				}, target);

				const prev = getTooltipText(chart).value.text();
				
				expect(prev).to.be.equal("80.0%");

				chart.load({
					columns: [
						["sentosa", 20]
					],
					done: function() {
						setTimeout(() => {
							const current = getTooltipText(this).value.text();

							expect(prev).to.not.equal(current);
							expect(current).to.be.equal("70.6%");
							
							done(1);
						}, 300);
					}
				});
			}, 300);
		}));
	});

	describe("Radar", () => {
		beforeAll(() => {
			args = {
				data: {
					x: "x",
					columns: [
						["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
						["data1", 330, 350, 200, 380, 150],
						["data2", 130, 100, 30, 200, 80],
						["data3", 230, 153, 85, 300, 250]
					],
					type: "radar",
					labels: true
				},
				radar: {
					axis: {
						max: 400
					},
					level: {
						depth: 4
					},
					direction: {
						clockwise: true
					}
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			chart.tooltip.show({index: 2})

			chart.load({
				columns: [
					["data4", 220, 100, 50, 70, 120]
				],
				done: function() {
					const {name} = getTooltipText(this);

					expect(name.size()).to.be.equal(4);

					expect(name.filter(function(d, i) {
						return this.textContent === "data4";
					}).size()).to.be.equal(1);

					done(1);
				}
			});
		}));
	});

	describe("Using .groups() API", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", -30, 200, 200, 400, -150, 250],
						["data2", 130, 100, -100, 200, -150, 50],
						["data3", -230, 200, 200, -300, 250, 250]
					],
					type: "bar",
					groups: [
						[
						"data1",
						"data2"
						]
					]
				}
			};
		});

		it("tooltip has been updated?", () => new Promise(done => {
			// when
			chart.tooltip.show({index: 3});
			chart.groups([["data1", "data2", "data3"]]);

			setTimeout(() => {
				chart.load({
					columns: [["data4", 100, -50, 150, 200, -300, -100]],
					done: function() {
						const {name, value} = getTooltipText(this);

						expect(name.size()).to.be.equal(4);

						expect(name.filter(function(d, i) {
							return this.textContent === "data4";
						}).size()).to.be.equal(1);

						done(1);
					}
				});
			}, 300);
		}));
	});
});
