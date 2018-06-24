/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
 /* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("API show", () => {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400],
				["data2", 500, 800, 500, 2000]
			]
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("hide()", () => {
		it("Hide partial data", done => {
			const internal = chart.internal;
			const main = internal.main;

			chart.hide("data1");

			setTimeout(() => {
				const selector = `.${CLASS.chartLine}.${CLASS.target}`;

				expect(+main.select(`${selector}-data1`).style("opacity")).to.be.equal(0);
				expect(+main.select(`${selector}-data2`).style("opacity")).to.be.equal(1);

				expect(+internal.svg.selectAll(`.${CLASS.legendItemHidden}`).size()).to.be.equal(1);

				done();
			}, 500);
		});

		it("Hide all data", () => {
			const internal = chart.internal;
			const main = internal.main;

			// hide all data
			chart.hide();

			main.selectAll(`.${CLASS.chartLine}`).each(function() {
				expect(+this.style.opacity).to.be.equal(0);
			});

			const legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);

			expect(+legend.size()).to.be.equal(chart.data().length);

			legend.each(function() {
				expect(+d3.select(this).style("opacity")).to.be.equal(0.15);
			});

			// hide legend
			chart.hide(null, {withLegend:true});

			legend.each(function() {
				expect(+d3.select(this).style("opacity")).to.be.equal(0);
			});
		});
	});

	describe("show()", () => {
		it("Show partial data", done => {
			const internal = chart.internal;
			const main = internal.main;

			chart.hide();
			chart.show("data1");

			setTimeout(() => {
				const selector = `.${CLASS.chartLine}.${CLASS.target}`;

				expect(+main.select(`${selector}-data1`).style("opacity")).to.be.equal(1);
				expect(+main.select(`${selector}-data2`).style("opacity")).to.be.equal(0);

				expect(+internal.svg.selectAll(`.${CLASS.legendItemHidden}`).size()).to.be.equal(1);

				done();
			}, 500);
		});

		it("Show all data", done => {
			const internal = chart.internal;
			const main = internal.main;
			let legend;

			// hide all data
			chart.hide();

			legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);
			expect(+legend.size()).to.be.equal(chart.data().length);

			// show all data
			chart.show();

			setTimeout(() => {
				main.selectAll(`.${CLASS.chartLine}`).each(function() {
					expect(+this.style.opacity).to.be.equal(1);
				});

				legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);

				expect(+legend.size()).to.be.equal(0);

				legend.each(function() {
					expect(+d3.select(this).style("opacity")).to.be.equal(1);
				});

				done();
			}, 500);
		});

		it("Show all data using 'withLegend' option", done => {
			const internal = chart.internal;
			const main = internal.main;

			// hide all data and legend
			chart.hide(null, {withLegend: true});

			// show all data without legend
			chart.show(null, {withLegend: false});

			setTimeout(() => {
				main.selectAll(`.${CLASS.chartLine}`).each(function() {
					expect(+this.style.opacity).to.be.equal(1);
				});

				const legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);

				expect(+legend.size()).to.be.equal(0);

				internal.svg.selectAll(`.${CLASS.legendItem}`).each(function() {
					expect(+d3.select(this).style("opacity")).to.be.equal(0);
				});

				done();
			}, 500);
		});
	});

	describe("toggle()", () => {
		it("should be toggled hiding and showing data", done => {
			const internal = chart.internal;
			const main = internal.main;
			let legend;

			// hide data
			chart.toggle();

			setTimeout(() => {
				main.selectAll(`.${CLASS.chartLine}`).each(function() {
					expect(+this.style.opacity).to.be.below(1);
				});

				legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);

				expect(+legend.size()).to.be.equal(chart.data().length);

				legend.each(function() {
					expect(+d3.select(this).style("opacity")).to.be.equal(0.15);
				});

				// show data
				chart.toggle();
			}, 100);

			setTimeout(() => {
				main.selectAll(`.${CLASS.chartLine}`).each(function() {
					expect(+this.style.opacity).to.be.equal(1);
				});

				legend = internal.svg.selectAll(`.${CLASS.legendItemHidden}`);

				expect(+legend.size()).to.be.equal(0);

				legend.each(function() {
					expect(+d3.select(this).style("opacity")).to.be.equal(1);
				});

				done();
			}, 500);
		});
	});

	describe("check toggle interaction", () => {
		const ids = ["FirstPercentage", "SecondPercentage", "ThirdPercentage"];

		it("set options", () => {
			args = {
				data: {
					json: [{
						Name: "Some Data",
						FirstPercentage: 0.20,
						SecondPercentage: 0.10,
						ThirdPercentage: 0.15
					}],
					keys: {
						x: "Name",
						value: ids
					},
					type: "bar",
					hide: [ids[2]]
				},
				axis: {
					x: {
						type: "category"
					}
				},
				transition: {
					duration: 10
				}
			};
		});

		it("should correctly rendered having same width", done => {
			const main = chart.internal.main;
			const barWidth = Math.round(main.select(`.${CLASS.bars}-${ids[0]}`).node().getBBox().width);

			chart.toggle(ids.concat().splice(1));

			setTimeout(() => {
				main.selectAll(`.${CLASS.bars}-${ids[0]}, .${CLASS.bars}-${ids[2]}`)
					.each(function() {
						expect(Math.round(this.getBBox().width)).to.be.equal(barWidth);
					});

				done();
			}, 500);
		});
	});
});
