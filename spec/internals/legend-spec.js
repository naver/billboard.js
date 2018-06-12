/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";
import CLASS from "../../src/config/classes";

describe("LEGEND", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("legend when multiple charts rendered", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["long data name 1", 30],
						["long data name 2", 50],
						["long data name 3", 90],
					]
				}
			};
		});

		it("should have properly computed legend width", () => {
			const expectedLeft = [156, 266, 378];
			const expectedWidth = [112, 114, 104];

			chart.internal.main.selectAll(".bb-legend-item").each(function(d, i) {
				const rect = d3.select(this)
					.node()
					.getBoundingClientRect();

				expect(rect.left).to.be.closeTo(expectedLeft[i], 20);
				expect(rect.width).to.be.closeTo(expectedWidth[i], 20);
			});
		});
	});

	describe("legend position", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				}
			};
		});

		it("should be located on the center of chart", () => {
			const box = chart.internal.legend.node()
				.getBoundingClientRect();

			expect(box.left + box.right).to.be.equal(638); // org : 640
		});
	});

	describe("legend as inset", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					]
				},
				legend: {
					position: "inset",
					inset: {
						step: null
					}
				}
			};
		});

		it("should be positioned properly", () => {
			const box = chart.internal.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.top).to.be.equal(5.5);
			expect(box.left).to.be.above(30);
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});

		it("set options legend.inset.step=1", () => {
			args.legend.inset.step = 1;
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
		});

		it("set options legend.inset.step=2", () => {
			args.legend.inset.step = 2;
		});

		it("should have automatically calculated height", () => {
			const box = chart.internal.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(48);
		});
	});

	describe("should update args to have only one series", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
					]
				},
				legend: {
					position: "inset"
				}
			};
		});

		it("should locate legend properly", () => {
			const box = chart.internal.svg
				.select(".bb-legend-background")
				.node()
				.getBoundingClientRect();

			expect(box.height).to.be.equal(28);
			expect(box.width).to.be.above(61);  // org : 64
		});
	});

	describe("legend.hide", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: true
				}
			};
		});

		it("should not show legends", () => {
			chart.internal.svg.selectAll(".bb-legend-item").each(function() {
				expect(d3.select(this).style("visibility")).to.be.equal("hidden");
			});
		});

		it("should update args", () => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					hide: "data2"
				}
			};
		});

		it("should not show legends", () => {
			const svg = chart.internal.svg;

			expect(svg.select(".bb-legend-item-data1").style("visibility")).to.be.equal("visible");
			expect(svg.select(".bb-legend-item-data2").style("visibility")).to.be.equal("hidden");
		});
	});

	describe("legend.show", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					show: false
				}
			};
		});

		it("should not initially have rendered any legend items", () => {
			expect(chart.internal.svg.selectAll(".bb-legend-item").empty()).to.be.equal(true);
		});

		it("allows us to show the legend on showLegend call", function() {
			chart.legend.show();

			chart.internal.svg.selectAll(".bb-legend-item").each(function() {
				expect(d3.select(this).style("visibility")).to.be.equal("visible");
				// This selects all the children, but we expect it to be empty
				expect(d3.select(this).size()).not.to.equal(0); // d3.selectAll("*")
			});
		});
	});

	describe("custom legend settings", () => {
		before(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					]
				},
				legend: {
					item: {
						tile: {
							width: 15,
							height: 2
						}
					}
				}
			};
		});

		it("renders the legend item with the correct width and height", () => {
			chart.internal.svg.selectAll(".bb-legend-item-tile").each(function() {
				const el = d3.select(this);
				const tileWidth = el.attr("x2") - el.attr("x1");

				expect(el.style("stroke-width")).to.be.equal(`${args.legend.item.tile.height}px`);
				expect(tileWidth).to.be.equal(args.legend.item.tile.width);
			});
		});

		it("set options legend.padding=10", () => {
			args.legend = {
				padding: 10
			};
		});

		it("renders the correct amount of padding on the legend element", function() {
			chart.internal.svg.selectAll(".bb-legend-item-padded1 .bb-legend-item-title, .bb-legend-item-padded2 .bb-legend-item-title")
				.each(function(v, i) {
					const parentNode = d3.select(this).node().parentNode;
					const itemWidth = parentNode.getBBox().width;
					const textBoxWidth = d3.select(parentNode).querySelector("text").getBBox().width;
					const tileWidth = 15; // default value is 10, plus 5 more for padding
					const expectedWidth = textBoxWidth + tileWidth + (i ? 0 : 10) + args.legend.padding;

					expect(itemWidth).to.be.equal(expectedWidth);
				});
		});
	});

	describe("set legend using template", () => {
		const itemClass = "abcd";

		before(() => {
			sandbox("legend-wrapper").innerHTML = "<ul id='legend'></ul>";

			args = {
				data: {
					columns: [
						["data1", 30, 200, 100, 400, 150, 250],
						["data2", 130, 100, 200, 100, 250, 150]
					],
					colors: {
						data1: "rgb(42, 208, 255)",
						data2: "rgb(250, 113, 113)"
					}
				},
				legend: {
					contents: {
						bindto: "#legend",
						template: `<li style="background-color:{=COLOR}" class="${itemClass}">{=TITLE}</li>`
					}
				}
			};
		});

		it("check for legend template setting with template string", () => {
			const legend = d3.select("#legend");
			const items = legend.selectAll(`.${CLASS.legendItem}`);

			expect(legend.html()).not.to.be.null;

			items.each(function(v) {
				const item = d3.select(this);

				expect(item.html()).to.be.equal(v);
				expect(item.style("background-color")).to.be.equal(chart.color(v));

				// should keep class value
				expect(item.classed(itemClass)).to.be.true;

				// check for event bind
				expect(item.on("click")).not.be.null;
			});

			expect(items.size()).to.be.equal(2);
		});

		it("set options legend.content.template as function", () => {
			args.legend.contents.template = function(title, color, data) {
				if (title !== "data1") {
					return `<li style='background-color:${color}'>${title}-${data[0].value}</li>`;
				}
			}
		});

		it("check for legend template setting with template function callback", () => {
			const legend = d3.select("#legend");
			const items = legend.selectAll(`.${CLASS.legendItem}`);

			expect(legend.html()).not.to.be.null;

			items.each(function(v) {
				const item = d3.select(this);

				expect(item.html()).to.be.equal(`${v}-${chart.data.values(v)[0]}`);
				expect(item.style("background-color")).to.be.equal(chart.color(v));

				// check for event bind
				expect(item.on("click")).not.be.null;
			});

			expect(items.size()).to.be.equal(1);
		});
	});

	describe("when using custom points", () => {
		before(() => {
			args = {
				data: {
				  columns: [
				    ["data1", 30, 200, 100, 400, 150, 250],
				    ["data2", 130, 100, 200, 100, 250, 150],
				    ["data3", 60, 190, 320, 520, 20, 300],
				    ["data4", 80, 20, 250, 320, 180, 50]
				  ]
				},
				legend: {
					usePoint: true
				},
				point: {
				  pattern: [
				    "circle",
				    "rectangle",
				    "<polygon points='2.5 0 0 5 5 5'></polygon>"
				  ]
				}
			};
		});

		it("should render custom points in legend", () => {
			const nodes = chart.internal.svg.selectAll(`.${CLASS.legendItem} .${CLASS.legendItemPoint}`);

			nodes.each((data, idx, selection) => {
				const node = selection[idx];
				const nodeName = node.nodeName.toLowerCase();
				const expected = (idx === 0 || idx === 3) ?
				  "circle" : (idx === 1) ? "rect" : (idx === 2) ? "use" : "";

				expect(nodeName).to.be.equal(expected);
			});

			expect(nodes.size()).to.be.equal(chart.data().length);
		});
	});
});
