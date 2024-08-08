/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {beforeAll, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$COMMON, $FOCUS, $LEGEND, $LINE} from "../../src/config/classes";

describe("API focus", function() {
	let chart;
	let legend;
	let main;

	// focus class name
	const focused = $FOCUS.focused;
	const defocused = $FOCUS.defocused;
	const itemFocused = $FOCUS.legendItemFocused;

	// get fixed number
	const getFixed = (val, len = 1) => +(+val).toFixed(len);

	beforeAll(() => {
		return new Promise((resolve) => {
			chart = util.generate({
				data: {
					columns: [
						["data1", 30, 200, 100, 400],
						["data2", 500, 800, 500, 2000],
						["data3", 5000, 2000, 500, 4000]
					]
				},
				transition: {
					duration: 0
				},
				onrendered: function() {
					legend = this.$.legend;
					main = this.$.main;

					resolve();
				}
			});
		});
	});

	describe("focus()", () => {
		it("should focus all targets", () => {
			chart.focus();

			const targets = main.select(".bb-chart-line.bb-target");
			const legendItems = legend.select(".bb-legend-item");

			targets.each(function() {
				const line = d3Select(this);

				expect(line.classed(focused)).to.be.ok;
			});

			legendItems.each(function() {
				const item = d3Select(this);

				expect(item.classed(itemFocused)).to.be.ok;
			});
		});

		it("should focus one target", () => new Promise(done => {
			const {legend, main} = chart.$;
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

			chart.focus("data2");

			setTimeout(() => {
				expect(targets.data1.classed(focused)).to.not.be.ok;
				expect(targets.data2.classed(focused)).to.be.ok;
				expect(targets.data3.classed(focused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				done(1);
			}, 300);
		}));

		it("should focus multiple targets", () => new Promise(done => {
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

			chart.focus(["data1", "data2"]);

			setTimeout(() => {
				expect(targets.data1.classed(focused)).to.be.ok;
				expect(targets.data2.classed(focused)).to.be.ok;
				expect(targets.data3.classed(focused)).to.not.be.ok;

				expect(legendItems.data1.classed(itemFocused)).to.be.ok;
				expect(legendItems.data2.classed(itemFocused)).to.be.ok;
				expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

				done(1);
			}, 300);
		}));
	});

	describe("defocus()", () => {
		it("should defocus all targets", () => new Promise(done => {
			const targets = main.selectAll(".bb-chart-line.bb-target");
			const legendItems = legend.selectAll(".bb-legend-item");

			chart.defocus();

			setTimeout(() => {
				targets.each(function () {
					const line = d3Select(this);

					expect(line.classed(focused)).to.not.be.ok;
					expect(line.classed(defocused)).to.be.ok;
				});

				legendItems.each(function () {
					const item = d3Select(this);

					expect(item.classed(itemFocused)).to.not.be.ok;
					expect(getFixed(item.style("opacity"))).to.be.equal(0.3);
				});

				done(1);
			}, 300);
		}));


		it("should defocus one target", () => {
			const targets = main.selectAll(`.${$LINE.chartLine}.${$COMMON.target}`);
			const legendItems = legend.selectAll(`.${$LEGEND.legendItem}`);

			chart.focus();
			chart.defocus("data2");

			targets.each(function() {
				const target = d3Select(this);

				if (target.attr("class").indexOf("data2") > -1) {
					expect(target.classed(defocused)).to.be.ok;
				} else {
					expect(target.classed(defocused)).to.not.be.ok;
				}
			});

			legendItems.each(function() {
				const el = d3Select(this);
				const opacity = el.style("opacity");
				const isFocused = el.classed(itemFocused);

				if (el.attr("class").indexOf("data2") > -1) {
					expect(isFocused).to.not.be.ok;
					expect(getFixed(opacity)).to.be.equal(0.3);
				} else {
					expect(isFocused).to.be.ok;
					expect(opacity === "1" || opacity === "").to.be.ok;
				}
			});
		});

		it("should defocus multiple targets", () => new Promise(done => {
			const targets = main.selectAll(`.${$LINE.chartLine}.${$COMMON.target}`);
			const legendItems = legend.selectAll(`.${$LEGEND.legendItem}`);

			chart.focus();
			chart.defocus(["data1", "data2"]);

			setTimeout(() => {
				targets.each(function() {
					const target = d3Select(this);

					if (target.attr("class").indexOf("data3") > -1) {
						expect(target.classed(defocused)).to.not.be.ok;
					} else {
						expect(target.classed(defocused)).to.be.ok;
					}
				});

				legendItems.each(function() {
					const legend = d3Select(this);
					const opacity = legend.style("opacity");

					if (legend.attr("class").indexOf("data3") > -1) {
						expect(legend.classed(itemFocused)).to.be.ok;
						expect(opacity === "1" || opacity === "").to.be.ok;
					} else {
						expect(legend.classed(itemFocused)).to.not.be.ok;
						expect(+opacity).to.be.equal(0.3);
					}
				});

				done(1);
			}, 300);
		}));

		it("should defocus multiple targets after focused", () => new Promise(done => {
			chart.focus();

			setTimeout(() => {
				chart.defocus(["data1", "data2"]);
				setTimeout(() => {
					const className = `.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data`;
					const targets = {
						data1: main.select(`${className}1`),
						data2: main.select(`${className}2`),
						data3: main.select(`${className}3`)
					};

					const legendItems = {
						data1: legend.select(`.${$LEGEND.legendItem}-data1`),
						data2: legend.select(`.${$LEGEND.legendItem}-data2`),
						data3: legend.select(`.${$LEGEND.legendItem}-data3`)
					};

					expect(targets.data1.classed(defocused)).to.be.ok;
					expect(targets.data2.classed(defocused)).to.be.ok;
					expect(targets.data3.classed(defocused)).to.not.be.ok;

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					expect(getFixed(legendItems.data1.style("opacity"))).to.be.equal(0.3);
					expect(getFixed(legendItems.data2.style("opacity"))).to.be.equal(0.3);

					expect(
						legendItems.data3.style("opacity") == "1" ||
						legendItems.data3.style("opacity") == ""
					).to.be.ok;

					done(1);
				}, 300);
			}, 300);
		}));
	});

	describe("revert()", () => {
		it("should revert all targets after focus", () => new Promise(done => {
			chart.focus();

			setTimeout(() => {
				chart.revert();

				setTimeout(() => {
					const targets = main.selectAll(`.${$LINE.chartLine}.${$COMMON.target}`);
					const legendItems = legend.selectAll(`.${$LEGEND.legendItem}`);

					targets.each(function() {
						const line = d3Select(this);

						expect(line.classed(focused)).to.not.be.ok;
					});

					legendItems.each(function () {
						const item = d3Select(this);
						const opacity = item.style("opacity");

						expect(item.classed(itemFocused)).to.not.be.ok;
						expect(opacity === "1" || opacity === "").to.be.ok;
					});

					done(1);
				}, 300);
			}, 300);
		}));

		it("should revert all targets after defocus", () => new Promise(done => {
			chart.defocus();

			setTimeout(() => {
				chart.revert();

				setTimeout(function () {
					const targets = main.selectAll(`.${$LINE.chartLine}.${$COMMON.target}`);
					const legendItems = legend.selectAll(`.${$LEGEND.legendItem}`);

					targets.each(function () {
						const line = d3Select(this);

						expect(line.classed(defocused)).to.not.be.ok;
					});

					legendItems.each(function () {
						const item = d3Select(this);
						const opacity = item.style("opacity");

						expect(item.classed(itemFocused)).to.not.be.ok;
						expect(opacity === "1" || opacity === "").to.be.ok;
					});

					done(1);
				}, 300);
			}, 300);
		}));

		it("should revert one target after focus", () => new Promise(done => {
			chart.focus();

			setTimeout(() => {
				chart.revert("data2");

				setTimeout(() => {
					const className = `.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data`;
					const targets = {
						data1: main.select(`${className}1`),
						data2: main.select(`${className}2`),
						data3: main.select(`${className}3`)
					};

					const legendItems = {
						data1: legend.select(`.${$LEGEND.legendItem}-data1`),
						data2: legend.select(`.${$LEGEND.legendItem}-data2`),
						data3: legend.select(`.${$LEGEND.legendItem}-data3`)
					};

					expect(targets.data1.classed(focused)).to.be.ok;
					expect(targets.data2.classed(focused)).to.not.be.ok;
					expect(targets.data3.classed(focused)).to.be.ok;

					expect(
						legendItems.data1.style("opacity") == "1" ||
						legendItems.data1.style("opacity") == ""
					).to.be.ok;

					expect(
						legendItems.data2.style("opacity") == "1" ||
						legendItems.data2.style("opacity") == ""
					).to.be.ok;

					expect(
						legendItems.data3.style("opacity") == "1" ||
						legendItems.data3.style("opacity") == ""
					).to.be.ok;

					expect(legendItems.data1.classed(itemFocused)).to.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					done(1);
				}, 300);
			}, 300);
		}));

		it("should revert one target after defocus", () => new Promise(done => {
			chart.defocus();

			setTimeout(() => {
				chart.revert("data2");

				setTimeout(() => {
					const className = `.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data`;
					const targets = {
						data1: main.select(`${className}1`),
						data2: main.select(`${className}2`),
						data3: main.select(`${className}3`)
					};

					const legendItems = {
						data1: legend.select(`.${$LEGEND.legendItem}-data1`),
						data2: legend.select(`.${$LEGEND.legendItem}-data2`),
						data3: legend.select(`.${$LEGEND.legendItem}-data3`)
					};

					expect(targets.data1.classed(defocused)).to.be.ok;
					expect(targets.data2.classed(defocused)).to.not.be.ok;
					expect(targets.data3.classed(defocused)).to.be.ok;

					expect(getFixed(legendItems.data1.style("opacity"))).to.be.equal(0.3);
					expect(
						legendItems.data2.style("opacity") === "1" ||
						legendItems.data2.style("opacity") === ""
					).to.be.ok;
					expect(getFixed(legendItems.data3.style("opacity"))).to.be.equal(0.3);

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

					done(1);
				}, 300);
			}, 300);
		}));

		it("should focus multiple targets after focus", () => new Promise(done => {
			const {legend, main} = chart.$;

			chart.focus();

			setTimeout(() => {
				chart.revert(["data1", "data2"]);

				setTimeout(() => {
					const className = `.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data`;
					const targets = {
						data1: main.select(`${className}1`),
						data2: main.select(`${className}2`),
						data3: main.select(`${className}3`)
					};

					const legendItems = {
						data1: legend.select(`.${$LEGEND.legendItem}-data1`),
						data2: legend.select(`.${$LEGEND.legendItem}-data2`),
						data3: legend.select(`.${$LEGEND.legendItem}-data3`)
					};

					expect(targets.data1.classed(focused)).to.not.be.ok;
					expect(targets.data2.classed(focused)).to.not.be.ok;
					expect(targets.data3.classed(focused)).to.be.ok;

					expect(
						legendItems.data1.style("opacity") == "1" ||
						legendItems.data1.style("opacity") == ""
					).to.be.ok;

					expect(
						legendItems.data2.style("opacity") == "1" ||
						legendItems.data2.style("opacity") == ""
					).to.be.ok;

					expect(
						legendItems.data3.style("opacity") == "1" ||
						legendItems.data3.style("opacity") == ""
					).to.be.ok;

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.be.ok;

					done(1);
				}, 300);
			}, 300);
		}));

		it("should focus multiple targets after defocus", () => new Promise(done => {
			chart.defocus();

			setTimeout(() => {
				chart.revert(["data1", "data2"]);

				setTimeout(() => {
					const className = `.${$LINE.chartLine}.${$COMMON.target}.${$COMMON.target}-data`;
					const targets = {
						data1: main.select(`${className}1`),
						data2: main.select(`${className}2`),
						data3: main.select(`${className}3`)
					};

					const legendItems = {
						data1: legend.select(`.${$LEGEND.legendItem}-data1`),
						data2: legend.select(`.${$LEGEND.legendItem}-data2`),
						data3: legend.select(`.${$LEGEND.legendItem}-data3`)
					};

					expect(targets.data1.classed(defocused)).to.not.be.ok;
					expect(targets.data2.classed(defocused)).to.not.be.ok;
					expect(targets.data3.classed(defocused)).to.be.ok;

					expect(
						legendItems.data1.style("opacity") == "1" ||
						legendItems.data1.style("opacity") == ""
					).to.be.ok;

					expect(
						legendItems.data2.style("opacity") == "1" ||
						legendItems.data2.style("opacity") == ""
					).to.be.ok;

					expect(getFixed(legendItems.data3.style("opacity"))).to.be.equal(0.3);

					expect(legendItems.data1.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data2.classed(itemFocused)).to.not.be.ok;
					expect(legendItems.data3.classed(itemFocused)).to.not.be.ok;

					done(1);
				}, 300);
			}, 300);
		}));

	});

	describe("when legend.show=false", () => {
		beforeAll(() => {
			return new Promise((resolve) => {
				chart = util.generate({
					data: {
						columns: [
							["data1", 30, 200, 100, 400],
							["data2", 500, 800, 500, 2000],
							["data3", 5000, 2000, 500, 4000]
						]
					},
					legend: {
						show: false
					},
					onrendered: function() {
						legend = this.$.legend;
						main = this.$.main;
	
						resolve();
					}
				});
			});
		});

		it("should focus all targets without showing legend", () => new Promise(done => {
			chart.focus();

			setTimeout(() => {
				const targets = main.select(`.${$LINE.chartLine}.${$COMMON.target}`);

				targets.each(function() {
					const line = d3Select(this);

					expect(line.classed(focused)).to.be.ok;
				});

				expect(legend).to.be.null;

				done(1);
			}, 300);
		}));

		it("should defocus all targets without showing legend", () => new Promise(done => {
			chart.defocus();

			setTimeout(() => {
				const targets = main.select(".bb-chart-line.bb-target");

				targets.each(function() {
					const line = d3Select(this);

					expect(line.classed(defocused)).to.be.ok;
				});

				expect(legend).to.be.null;

				done(1);
			}, 300);
		}));

		it("should revert all targets after focus", () => new Promise(done => {
			chart.focus();

			setTimeout(() => {
				chart.revert();

				setTimeout(() => {
					const targets = main.select(`.${$LINE.chartLine}.${$COMMON.target}`);

					targets.each(function() {
						const line = d3Select(this);

						expect(line.classed(focused)).to.not.be.ok;
					});

					expect(legend).to.be.null;

					done(1);
				}, 300);
			}, 300);
		}));
	});
});
