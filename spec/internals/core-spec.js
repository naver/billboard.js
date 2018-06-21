/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("CORE", function() {
	let chart;
	let args = {
		svg: {
			classname: "customclass"
		},
		data: {
			columns: [
				["data1", 30, 200, 100, 400, 150, 250],
				["data2", 50, 20, 10, 40, 15, 25],
				["data3", 150, 120, 110, 140, 115, 125]
			]
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("init", () => {
		it("should be created", () => {
			const svg = d3.select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should set 3rd party property to Function", () => {
			Function.prototype.$extIsFunction = true;
			expect(true).to.be.ok;
		});

		it("should be created even if 3rd party property has been set", () => {
			const svg = d3.select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should be created with a custom class", () => {
			const svg = d3.select("#chart svg");

			expect(svg.attr("class")).not.to.be.null;
			expect(svg.attr("class")).to.be.equal("customclass");
		});
	});

	describe("init callbacks", () => {
		let oninit = false;
		let onbeforeinit = false;
		let onafterinit = false;

		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25],
						["data3", 150, 120, 110, 140, 115, 125]
					]
				},
				oninit: () => {
					oninit = true;
				},
				onbeforeinit: () => {
					onbeforeinit = true;
				},
				onafterinit: () => {
					onafterinit = true;
				}
			}
		});

		it("check for oninit callback", () => {
			expect(oninit).to.be.true;
		});

		it("check for onbeforeinit callback", () => {
			expect(onbeforeinit).to.be.true;
		});

		it("check for onafterinit callback", () => {
			expect(onafterinit).to.be.true;
		});
	});

	describe("size", () => {
		it("should have same width", () => {
			const svg = d3.select("#chart svg");

			expect(+svg.attr("width")).to.be.equal(640);
		});

		it("should have same height", () => {
			const svg = d3.select("#chart svg");

			expect(+svg.attr("height")).to.be.equal(480);
		});

	});

	describe("bindto", () => {
		describe("selector", () => {
			before(() => {
				d3.select("#chart").html("");
				args.bindto = "#chart";
			});

			it("should be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		describe("d3.selection object", () => {
			before(() => {
				d3.select("#chart").html("");
				args.bindto = d3.select("#chart");
			});

			it("should be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		describe("null", () => {
			before(() => {
				d3.select("#chart").html("");
				args.bindto = "#chart-dummy";
			});

			it("should not be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(0);
			});
		});

		describe("empty string", () => {
			before(() => {
				d3.select("#chart").html("");
				args.bindto = "#chart-dummy";
			});

			it("should not be created", () => {
				const svg = d3.select("#chart svg");

				expect(svg.size()).to.be.equal(0);
			});
		});

	});

	describe("empty data", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1"],
						["data2"]
					]
				}
			};
		});

		it("should generate a chart", () => {
			const ticks = chart.internal.main.select(`.${CLASS.axisX}`)
				.selectAll("g.tick");

			expect(ticks.size()).to.be.equal(0);
		});

		it("should update args for empty data", () => {
			args = {
				data: {
					x: "x",
					columns: [
						["x"],
						["data1"],
						["data2"]
					]
				},
				axis: {
					x: {
						type: "timeseries"
					}
				}
			};

			expect(true).to.be.ok;
		});

		it("should generate a chart", () => {
			const ticks = chart.internal.main.select(`.${CLASS.axisX}`)
				.selectAll("g.tick");

			expect(ticks.size()).to.be.equal(0);
		});
	});

	describe("options", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 50, 120, 175],
						["data2", 130, 100, 0, 170, 75, 140]
					]
				},
				clipPath: true
			};
		});

		it("chart should have clip-path property", () => {
			const main = chart.internal.main.select(`.${CLASS.chart}`);

			expect(main.attr("clip-path")).to.not.be.null;
		});

		it("check for chart node's position", () => {
			const next = chart.internal.main.select(`.${CLASS.axisY2}`).node().nextSibling;

			// axis element should be the last positioned
			expect(next).to.be.null;
		});

		it("set option clipPath=false", () => {
			args.clipPath = false;
		});

		it("clip-path property should be null", () => {
			const main = chart.internal.main.select(`.${CLASS.chart}`);

			expect(main.attr("clip-path")).to.be.null;
		});

		it("check for chart node's position", () => {
			const previous = chart.internal.main.select(`.${CLASS.chart}`).node().previousSibling;

			// chart element should positioned after axis element
			expect(d3.select(previous).classed(CLASS.axisY2)).to.be.true;
		});
	});
});
