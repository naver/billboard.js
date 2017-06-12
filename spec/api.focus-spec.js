/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "./assets/util";

describe("API focus", function() {
	let chart;
	let args = {
		data: {
			columns: [
				["data1", 30, 200, 100, 400],
				["data2", 1000, 800, 500, 2000],
				["data3", 5000, 2000, 1000, 4000]
			]
		}
	};

	// focus class name
	const focused = "bb-focused";
	const defocused = "bb-defocused";
	const itemFocused = "bb-legend-item-focused";

	// get fixed number
	const getFixed = (val, len = 1) => +(+val).toFixed(len);

	beforeEach(done => {
		chart = util.initChart(chart, args, done);
	});

	describe("focus", () => {
		it("should focus all targets", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				const targets = main.select(".bb-chart-line.bb-target");
				const legendItems = legend.select(".bb-legend-item");

				targets.each(function() {
					const line = d3.select(this);

					expect(line.classed(focused)).to.be.ok;
				});

				legendItems.each(function() {
					const item = d3.select(this);

					expect(item.classed(itemFocused)).to.be.ok;
				});

				done();
			}, 1000);
		});

		it("should focus one target", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus("data2");

			setTimeout(() => {
				const targets = {
					data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
					data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
					data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
				};

				const legendItems = {
					data1: legend.select(".bb-legend-item-data1"),
					data2: legend.select(".bb-legend-item-data2"),
					data3: legend.select(".bb-legend-item-data3")
				};

				expect(targets.data1.classed(focused)).to.not.be.ok;
				expect(targets.data2.classed(focused)).to.be.ok;
				expect(targets.data3.classed(focused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				done();
			}, 1000);
		});

		it("should focus multiple targets", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus(["data1", "data2"]);

			setTimeout(() => {
				const targets = {
					data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
					data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
					data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
				};


				const legendItems = {
					data1: legend.select(".bb-legend-item-data1"),
					data2: legend.select(".bb-legend-item-data2"),
					data3: legend.select(".bb-legend-item-data3")
				};

				expect(targets.data1.classed(focused)).to.be.ok;
				expect(targets.data2.classed(focused)).to.be.ok;
				expect(targets.data3.classed(focused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				done();
			}, 1000);
		});
	});

	describe("defocus", () => {
		it("should defocus all targets", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus();

			setTimeout(() => {
				const targets = main.select(".bb-chart-line.bb-target");
				const legendItems = legend.select(".bb-legend-item");

				targets.each(function() {
					const line = d3.select(this);

					expect(line.classed(focused)).to.not.be.ok;
					expect(line.classed(defocused)).to.be.ok;
				});

				legendItems.each(function() {
					const item = d3.select(this);

					expect(item.classed(itemFocused)).to.not.be.ok;
					expect(getFixed(item.style("opacity"))).to.be.equal(0.3);
				});

				done();
			}, 1000);
		});

		it("should defocus one target", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus("data2");

			setTimeout(() => {
				const targets = {
					data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
					data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
					data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
				};

				const legendItems = {
					data1: legend.select(".bb-legend-item-data1"),
					data2: legend.select(".bb-legend-item-data2"),
					data3: legend.select(".bb-legend-item-data3")
				};

				expect(targets.data1.classed(defocused)).to.not.be.ok;
				expect(targets.data2.classed(defocused)).to.be.ok;
				expect(targets.data3.classed(defocused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				expect(+legendItems.data1.style("opacity")).to.be.equal(1);
				expect(getFixed(legendItems.data2.style("opacity"))).to.be.equal(0.3);
				expect(+legendItems.data3.style("opacity")).to.be.equal(1);

				done();
			}, 1000);
		});

		it("should defocus multiple targets", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus(["data1", "data2"]);

			setTimeout(() => {
				const targets = {
					data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
					data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
					data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
				};

				const legendItems = {
					data1: legend.select(".bb-legend-item-data1"),
					data2: legend.select(".bb-legend-item-data2"),
					data3: legend.select(".bb-legend-item-data3")
				};

				expect(targets.data1.classed(defocused)).to.be.ok;
				expect(targets.data2.classed(defocused)).to.be.ok;
				expect(targets.data3.classed(defocused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				expect(getFixed(legendItems.data1.style("opacity"))).to.be.equal(0.3);
				expect(getFixed(legendItems.data2.style("opacity"))).to.be.equal(0.3);
				expect(+legendItems.data3.style("opacity")).to.be.equal(1);

				done();
			}, 1000);
		});

		it("should defocus multiple targets after focused", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				chart.defocus(["data1", "data2"]);
				setTimeout(() => {
					const targets = {
						data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
						data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
						data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
					};

					const legendItems = {
						data1: legend.select(".bb-legend-item-data1"),
						data2: legend.select(".bb-legend-item-data2"),
						data3: legend.select(".bb-legend-item-data3")
					};

					expect(targets.data1.classed(defocused)).to.be.ok;
					expect(targets.data2.classed(defocused)).to.be.ok;
					expect(targets.data3.classed(defocused)).to.not.be.ok;

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					expect(getFixed(legendItems.data1.style("opacity"))).to.be.equal(0.3);
					expect(getFixed(legendItems.data2.style("opacity"))).to.be.equal(0.3);
					expect(+legendItems.data3.style("opacity")).to.be.equal(1);

					done();
				}, 1000);
			}, 1000);
		});

	});

	describe("revert", () => {
		it("should revert all targets after focus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				chart.revert();

				setTimeout(() => {
					const targets = main.select(".bb-chart-line.bb-target");
					const legendItems = legend.select(".bb-legend-item");

					targets.each(function() {
						const line = d3.select(this);

						expect(line.classed(focused)).to.not.be.ok;
					});

					legendItems.each(function () {
						const item = d3.select(this);

						expect(item.classed(itemFocused)).to.not.be.ok;
						expect(+item.style("opacity")).to.be.equal(1);
					});

					done();
				}, 1000);
			}, 1000);
		});

		it("should revert all targets after defocus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus();

			setTimeout(() => {
				chart.revert();

				setTimeout(function () {
					const targets = main.select(".bb-chart-line.bb-target");
					const legendItems = legend.select(".bb-legend-item");

					targets.each(function () {
						const line = d3.select(this);

						expect(line.classed(defocused)).to.not.be.ok;
					});

					legendItems.each(function () {
						const item = d3.select(this);

						expect(item.classed(itemFocused)).to.not.be.ok;
						expect(+item.style("opacity")).to.be.equal(1);
					});

					done();
				}, 1000);
			}, 1000);
		});

		it("should revert one target after focus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				chart.revert("data2");

				setTimeout(() => {
					const targets = {
						data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
						data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
						data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
					};

					const legendItems = {
						data1: legend.select(".bb-legend-item-data1"),
						data2: legend.select(".bb-legend-item-data2"),
						data3: legend.select(".bb-legend-item-data3")
					};

					expect(targets.data1.classed(focused)).to.be.ok;
					expect(targets.data2.classed(focused)).to.not.be.ok;
					expect(targets.data3.classed(focused)).to.be.ok;

					expect(+legendItems.data1.style("opacity")).to.be.equal(1);
					expect(+legendItems.data2.style("opacity")).to.be.equal(1);
					expect(+legendItems.data3.style("opacity")).to.be.equal(1);

					expect(legendItems.data1.classed(itemFocused)).to.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					done();
				}, 1000);
			}, 1000);
		});

		it("should revert one target after defocus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus();

			setTimeout(() => {
				chart.revert("data2");

				setTimeout(() => {
					const targets = {
						data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
						data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
						data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
					};

					const legendItems = {
						data1: legend.select(".bb-legend-item-data1"),
						data2: legend.select(".bb-legend-item-data2"),
						data3: legend.select(".bb-legend-item-data3")
					};

					expect(targets.data1.classed(defocused)).to.be.ok;
					expect(targets.data2.classed(defocused)).to.not.be.ok;
					expect(targets.data3.classed(defocused)).to.be.ok;

					expect(getFixed(legendItems.data1.style("opacity"))).to.be.equal(0.3);
					expect(+legendItems.data2.style("opacity")).to.be.equal(1);
					expect(getFixed(legendItems.data3.style("opacity"))).to.be.equal(0.3);

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

					done();
				}, 1000);
			}, 1000);
		});

		it("should focus multiple targets after focus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				chart.revert(["data1", "data2"]);

				setTimeout(() => {
					const targets = {
						data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
						data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
						data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
					};

					const legendItems = {
						data1: legend.select(".bb-legend-item-data1"),
						data2: legend.select(".bb-legend-item-data2"),
						data3: legend.select(".bb-legend-item-data3")
					};

					expect(targets.data1.classed(focused)).to.not.be.ok;
					expect(targets.data2.classed(focused)).to.not.be.ok;
					expect(targets.data3.classed(focused)).to.be.ok;

					expect(+legendItems.data1.style("opacity")).to.be.equal(1);
					expect(+legendItems.data2.style("opacity")).to.be.equal(1);
					expect(+legendItems.data3.style("opacity")).to.be.equal(1);

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					done();
				}, 1000);
			}, 1000);
		});

		it("should focus multiple targets after defocus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus();

			setTimeout(() => {
				chart.revert(["data1", "data2"]);

				setTimeout(() => {
					const targets = {
						data1: main.select(".bb-chart-line.bb-target.bb-target-data1"),
						data2: main.select(".bb-chart-line.bb-target.bb-target-data2"),
						data3: main.select(".bb-chart-line.bb-target.bb-target-data3")
					};

					const legendItems = {
						data1: legend.select(".bb-legend-item-data1"),
						data2: legend.select(".bb-legend-item-data2"),
						data3: legend.select(".bb-legend-item-data3")
					};

					expect(targets.data1.classed(defocused)).to.not.be.ok;
					expect(targets.data2.classed(defocused)).to.not.be.ok;
					expect(targets.data3.classed(defocused)).to.be.ok;

					expect(+legendItems.data1.style("opacity")).to.be.equal(1);
					expect(+legendItems.data2.style("opacity")).to.be.equal(1);
					expect(getFixed(legendItems.data3.style("opacity"))).to.be.equal(0.3);

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

					done();
				}, 1000);
			}, 1000);
		});

	});

	describe("when legend.show = false", () => {
		it("should update args to hide legend", () => {
			args.legend = {
				show: false
			};

			return expect(true).to.be.ok;
		});

		it("should focus all targets without showing legend", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				const targets = main.select(".bb-chart-line.bb-target");
				const legendItems = legend.select(".bb-legend-item");

				targets.each(function() {
					const line = d3.select(this);

					expect(line.classed(focused)).to.be.ok;
				});

				expect(legendItems.size()).to.be.equal(0);

				done();
			}, 1000);
		});

		it("should defocus all targets without showing legend", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.defocus();

			setTimeout(() => {
				const targets = main.select(".bb-chart-line.bb-target");
				const legendItems = legend.select(".bb-legend-item");

				targets.each(function() {
					const line = d3.select(this);

					expect(line.classed(defocused)).to.be.ok;
				});

				expect(legendItems.size()).to.be.equal(0);

				done();
			}, 1000);
		});

		it("should revert all targets after focus", done => {
			const main = chart.internal.main;
			const legend = chart.internal.legend;

			chart.focus();

			setTimeout(() => {
				chart.revert();

				setTimeout(() => {
					const targets = main.select(".bb-chart-line.bb-target");
					const legendItems = legend.select(".bb-legend-item");

					targets.each(function() {
						const line = d3.select(this);

						expect(line.classed(focused)).to.not.be.ok;
					});

					expect(legendItems.size()).to.be.equal(0);

					done();
				}, 1000);
			}, 1000);
		});
	});
});
