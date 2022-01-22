/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {expect} from "chai";
import sinon from "sinon";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import {$AXIS, $COMMON, $GRID} from "../../src/config/classes";
import {window, document} from "../../src/module/browser";

describe("CORE", function() {
	let chart;
	let args: any = {
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
			const svg = d3Select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should set 3rd party property to Function", () => {
			// @ts-ignore
			Function.prototype.$extIsFunction = true;
			expect(true).to.be.ok;
		});

		it("should be created even if 3rd party property has been set", () => {
			const svg = d3Select("#chart svg");

			expect(svg).not.to.be.null;
		});

		it("should be created with a custom class", () => {
			const svg = d3Select("#chart svg");

			expect(svg.attr("class")).not.to.be.null;
			expect(svg.attr("class")).to.be.equal("customclass");
		});

		it("y2 Axis shouldn't be generated", () => {
			const y2 = chart.$.main.select(`.${$AXIS.axisY2}`);

			expect(y2.empty()).to.be.true;
		});

		it("check for browser object", () => {
			expect(window === Function("return this")()).to.be.true;
			expect(document.body).to.be.not.undefined;
		})
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

	describe("onrendered callbacks", () => {
		const spy = sinon.spy(function() {
			const {type} = args.data;
			const {main} = this.$;
			let d;

			if (type === "radar") {
				d = main.select("polygon").attr("points");
			} else {
				d = main.select("path").attr("d");
			}

		  return d;
		});

		before(() => {
			args = {
				data: {
				  columns: [
					  ["data1", 330, 350, 200, 380, 150],
					  ["data2", 130, 100, 30, 200, 80]
				  ],
				  type: "radar",
				  labels: true
				},
				onrendered: spy
			}
		});

		it("check radar type", () => {
			expect(spy.returnValues).to.be.not.empty;
		});

		it("set options data.type='donut'", () => {
			args.data.type = "donut";
			spy.resetHistory();
		});

		// Note: Arc types are rendered with transition
		it("check donut type", done => {
			setTimeout(() => {
				expect(spy.returnValues).to.be.not.empty;
				done();
			}, 300);
		});

		it("set options data.type='line'", () => {
			args.data.type = "line";
			spy.resetHistory();
		});

		// Note: Arc types are rendered with transition
		it("check line type", done => {
			chart.toggle("data1");

			setTimeout(() => {
				expect(spy.returnValues).to.be.not.empty;
				expect(spy.callCount);
				done();
			}, 300);
		});
	});

	describe("size", () => {
		it("should have same width", () => {
			const svg = d3Select("#chart svg");

			expect(+svg.attr("width")).to.be.equal(640);
		});

		it("should have same height", () => {
			const svg = d3Select("#chart svg");

			expect(+svg.attr("height")).to.be.equal(480);
		});

	});

	describe("bindto", () => {
		it("selector", () => {
			before(() => {
				d3Select("#chart").html("");
				args.bindto = "#chart";
			});

			it("should be created", () => {
				const svg = d3Select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		it("d3Selection object", () => {
			before(() => {
				d3Select("#chart").html("");
				args.bindto = d3Select("#chart");
			});

			it("should be created", () => {
				const svg = d3Select("#chart svg");

				expect(svg.size()).to.be.equal(1);
			});
		});

		it("null", () => {
			before(() => {
				d3Select("#chart").html("");
				args.bindto = "#chart-dummy";
			});

			it("should not be created", () => {
				const svg = d3Select("#chart svg");

				expect(svg.size()).to.be.equal(0);
			});
		});

		it("empty string", () => {
			before(() => {
				d3Select("#chart").html("");
				args.bindto = "#chart-dummy";
			});

			it("should not be created", () => {
				const svg = d3Select("#chart svg");

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
			const ticks = chart.$.main.select(`.${$AXIS.axisX}`)
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
			const ticks = chart.$.main.select(`.${$AXIS.axisX}`)
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
			const main = chart.$.main.select(`.${$COMMON.chart}`);

			expect(main.attr("clip-path")).to.not.be.null;
		});

		it("set option: axis.y2.show=true", () => {
			args.axis = {
				y2: {
					show: true
				}
			};
		});

		it("check for chart node's position", () => {
			const next = chart.$.main.select(`.${$AXIS.axisY2}`).node().nextSibling;

			// axis element should be the last positioned
			expect(next).to.be.null;
		});

		it("set option: clipPath=false", () => {
			args.clipPath = false;
		});

		it("clip-path property should be null", () => {
			const main = chart.$.main.select(`.${$COMMON.chart}`);

			expect(main.attr("clip-path")).to.be.null;
		});

		it("check for chart node's position", () => {
			const previous = chart.$.main.select(`.${$COMMON.chart}`).node().previousSibling;

			// chart element should positioned after axis element
			expect(d3Select(previous).classed($GRID.grid)).to.be.true;
		});
	});

	describe("padding", () => {
		before(() => {
			args = {
				data: {
					columns: [["data", 130, 100, 140, 35, 110, 50]],
					type: "area"
				},
				axis: {},
				legend: {
					show: false
				},
				size: {
					width: 300,
					height: 150
				},
				padding: false
			};
		});

		it("Area shape should have same size as the container's size.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("Event <rect> element should have same size as the container's size.", () => {
			const {width, height} = chart.internal.$el.eventRect.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("Axes and subchart options should be disabled.", () => {
			expect(chart.config("axis.x.show")).to.be.false;
			expect(chart.config("axis.y.show")).to.be.false;
			expect(chart.config("axis.y2.show")).to.be.false;
			expect(chart.config("subchart.show")).to.be.false;
		});

		it("set option: axis.rotated = true", () => {
			args.axis.rotated = true;
		});

		it("Area shape should have same size as the container's size for rotated axis.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});

		it("set option: data.labels = true", () => {
			delete args.axis.rotated;
			args.data.labels = true;
		});

		it("Area shape's height should be smaller as data label text shows.", () => {
			const {width, height} = chart.$.line.areas.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.below(args.size.height);
		});

		it("set option: data.type='bar'", () => {
			delete args.data.labels;
			args.data.type = "bar";
		});

		it("Event <rect> element should have same size as the container's size for 'bar' type.", () => {
			const {width, height} = chart.internal.$el.eventRect.node().getBoundingClientRect();

			expect(width).to.be.equal(args.size.width);
			expect(height).to.be.equal(args.size.height);
		});
	});
});
