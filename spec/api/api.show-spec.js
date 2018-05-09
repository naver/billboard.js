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
				expect(+main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`).style("opacity")).to.be.equal(0);
				expect(+main.select(`.${CLASS.chartLine}.${CLASS.target}-data2`).style("opacity")).to.be.equal(1);

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
				expect(+main.select(`.${CLASS.chartLine}.${CLASS.target}-data1`).style("opacity")).to.be.equal(1);
				expect(+main.select(`.${CLASS.chartLine}.${CLASS.target}-data2`).style("opacity")).to.be.equal(0);

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
});
