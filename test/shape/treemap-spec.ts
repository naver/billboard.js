/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import sinon from "sinon";
import util from "../assets/util";
import {parseNum} from "../assets/helper";

describe("TREEMAP", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("shapes rendering", () => {
		beforeAll(() => {
			args = {
				padding: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				data: {
					columns: [
						["data1", 1000],
						["data2", 200],
						["data3", 500],
						["data4", 50],
						["data5", 100],
						["data6", 70],
						["data7", 200],
						["data8", 133],
						["data9", 220],
						["data10", 15],
					],
					type: "treemap",
					labels: {
						colors: "#000",
						centered: true
						
					}
				},
				treemap: {
					label:{
						threshold: 0.03
					}
				}
			};
		});

		it("check rect position", () => {
			const expectedXY = {
				data1: [0, 0],
				data2: [257, 232],
				data3: [257, 0],
				data4: [552, 389],
				data5: [561, 232],
				data6: [457, 389],
				data7: [257, 356],
				data8: [457, 232],
				data9: [523, 0],
				data10: [552, 459]
			};

			// check rect pos
			chart.internal.$el.treemap.selectAll("g").each(function(d) {
				const coords = this.getAttribute("transform").trim().split(",").map(parseNum);

				expect(coords).to.be.deep.equal(expectedXY[d.data.id]);
			});
		});

		it("check rect size", () => {
			const expectedSize = {
				data1: [257, 480],
				data2: [200, 124],
				data3: [266, 232],
				data4: [88, 70],
				data5: [79, 157],
				data6: [95, 91],
				data7: [200, 124],
				data8: [104, 157],
				data9: [117, 232],
				data10: [88, 21]
			};

			// check rect size
			chart.internal.$el.treemap.selectAll("rect").each(function(d) {
				const rectSize = [
					+this.getAttribute("width"),
					+this.getAttribute("height")
				];

				expect(rectSize).to.be.deep.equal(expectedSize[d.data.id]);
			});
		});

		it("check text position", () => {
			const expectedTextXY = {
				data1: [128.5, 251.75],
				data2: [305.75, 357],
				data3: [127.75, 390],
				data4: [435.75, 596],
				data5: [322.25, 600.5],
 				data6: [446.25, 504.5],
				data7: [357, 429.75],
				data8: [322.25, 509],
				data9: [127.75, 581.5],
				data10: [481.25, 596]
			};

			// check text pos & threshold
			const totalValue = chart.internal.$el.treemap.datum().value;
			let i = 0;

			chart.$.text.texts.each(function(d) {
				const coords = this.parentNode.getAttribute("transform").trim().split(" ").map(parseNum).sort();
				const isUnderThreshold = d.value  / totalValue < args.treemap.label.threshold;

				coords.forEach((v, i) => {
					expect(v).to.be.closeTo(expectedTextXY[d.id][i], 20);
				});
				
				expect(this.childElementCount).to.be.equal(2);
				expect(/data\d+\.\d+%/.test(this.textContent)).to.be.ok;

				if (isUnderThreshold) {
					i++;
					expect(this.style.opacity).to.be.equal("0");
				}
			});

			expect(i).to.be.equal(3);
		});

		it("set options: padding", () => {
			args.padding = {
				top: 10,
				right: 20,
				bottom: 30,
				left: 40
			};
		});

		it("check padding", () => {
			const {internal: {scale: {x, y}}} = chart;
			const {svg, main} = chart.$;

			const xRange = x.range();
			const yRange = y.range();

			expect(xRange[0]).to.be.equal(args.padding.left);
			expect(xRange[1]).to.be.equal(+svg.attr("width") - args.padding.right);
			expect(yRange[0]).to.be.equal(args.padding.top);
			expect(yRange[1]).to.be.equal(+svg.attr("height") -args.padding.bottom);
		});
		
		it("generate from JSON data", () => {
			const param = {
				data: {
					json: [
						{name: "a", upload: 200, download: 200},
						{name: "b", upload: 190, download: 230},
					],
					keys: {
						value: ["upload", "download"]
					},
					type: "treemap",
					labels: {
						colors: "#000",
						centered: true
					}
				}
			};
			const treemap = util.generate(param);

			const data = treemap.data();

			expect(data.length).to.be.equal(2);

			data.forEach((v, i) => {
				expect(v.id).to.be.equal(param.data.keys.value[i]);
			});

			treemap.destroy();
		});

		it("should generate w/o error", () => {
			const param = {
				data: {
					columns: [
						["data1", 1300],
					],
					type: "treemap"
				  },
				  bindto: "#chart25"
			};

			// generate with only given argument
			const treemap = util.generate(param, true)

			treemap.destroy();

			expect(true).to.be.ok;
		});
	});

	describe("label options", () => {
		beforeAll(() => {
			args.treemap.label = {
				show: false,
				format: function(value, ratio, id) {
					return value;
				}
			};
		});

		afterAll(() => {
			args.treemap.label = {
				show: true
			};
		});

		it("formatter applied correctly?", () => {
			chart.$.text.texts.each(function(d) {
				expect(this.style.opacity).to.be.equal("0");
				expect(+this.textContent).to.be.equal(d.value);
			});
		});
	});

	describe("interaction", () => {
		it("data load via .load() API", () => new Promise(done => {
			const orgValue = chart.data.values("data1");
			const dataLen = chart.data().length;

			chart.load({
				columns: [
					["data1", 300]
				], 
				unload: ["data10"],
				done: function() {
					expect(this.data.values("data1")[0]).to.be.equal(300);
					expect(chart.data().length).to.be.equal(dataLen - 1);
					done(1);
				}
			});
		}));

		it("tooltip show via .tooltip.show() API", () => {
			const id = "data1";

			// when
			chart.tooltip.show({data: {id}});

			expect(chart.$.tooltip.select(".name").text()).to.be.equal(id);
			expect(chart.$.tooltip.style("display")).to.be.equal("block");

			// when
			chart.tooltip.hide();

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});

		it("set options: set inputType='touch'", () => {
			args = {
				data: {
					rows: [
						["data1", "data2", "data3", "data4"],
						[300, 200, 500, 380]
					],
					type: "treemap",
					labels: true
				},
				interaction: {
					inputType: {
						touch: true
					}
				},
				treemap: {
					tile: "dice"
				}
			}
		});

		it("should show tooltip with touch input.", () => {
			const id = "data3";
			const treemap =  chart.internal.$el.treemap.node();

			// when
			chart.tooltip.show({data: {id}})

			expect(chart.$.tooltip.select(".name").text()).to.be.equal(id);
		});
	});

	describe("data.onover/out", () => {
		let overSpy = sinon.spy();
		let outSpy = sinon.spy();

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 130],
						["data2", 200],
						["data3", 500]
					],
					type: "treemap",
					onover: overSpy,
					onout: outSpy
				}
			}
		});

		it("should argument passed correctly", () => {
			const id = "data1";

			// when
			chart.tooltip.show({data: {id}});

			expect(overSpy.called).to.be.true;
			let [data, element] = overSpy.args[0];

			expect(data.id === id).to.be.true;
			expect(element.tagName).to.be.equal("rect");

			// when
			chart.tooltip.hide();
			[data, element] = overSpy.args[0];

			expect(outSpy.called).to.be.true;

			expect(data.id === id).to.be.true;
			expect(element.tagName).to.be.equal("rect");
		});
	});

	describe("label format with dimensions", () => {
		let formatSpy;

		beforeAll(() => {
			formatSpy = sinon.spy((value, ratio, id, dimensions) => {
				return `${id}: ${value} (${dimensions.width.toFixed(0)}x${dimensions.height.toFixed(0)})`;
			});

			args = {
				data: {
					columns: [
						["data1", 1000],
						["data2", 500],
						["data3", 300],
						["data4", 200]
					],
					type: "treemap",
					labels: {
						colors: "#000",
						centered: true
					}
				},
				treemap: {
					label: {
						format: formatSpy
					}
				}
			};
		});

		it("should pass width and height to label format function", () => {
			expect(formatSpy.called).to.be.true;

			// Check that format function was called with correct arguments
			formatSpy.args.forEach((callArgs, i) => {
				const [value, ratio, id, size] = callArgs;

				// Verify all expected parameters are present
				expect(value).to.be.a("number");
				expect(ratio).to.be.a("number");
				expect(id).to.be.a("string");
				expect(size).to.be.an("object");

				// Verify dimensions object has width and height
				expect(size).to.have.property("width");
				expect(size).to.have.property("height");
				expect(size.width).to.be.a("number");
				expect(size.height).to.be.a("number");

				// Width and height should be positive for visible nodes
				expect(size.width).to.be.greaterThan(0);
				expect(size.height).to.be.greaterThan(0);
			});
		});

		it("should render labels with dimension information", () => {
			const texts = chart.$.text.texts;

			texts.each(function(d) {
				const textContent = this.textContent;
				const pattern = new RegExp(`${d.id}: ${d.value} \\(\\d+x\\d+\\)`);

				expect(pattern.test(textContent)).to.be.true;
			});
		});

		it("should calculate dimensions correctly for each node", () => {
			const {internal: {scale: {x, y}}} = chart;

			chart.internal.$el.treemap.selectAll("g").each(function(d) {
				const {x0, x1, y0, y1} = d;
				const expectedWidth = x(x1) - x(x0);
				const expectedHeight = y(y1) - y(y0);

				// Find the corresponding format call for this data id
				const formatCall = formatSpy.args.find(args => args[2] === d.data.id);

				if (formatCall) {
					const [, , , dimensions] = formatCall;

					expect(dimensions.width).to.be.closeTo(expectedWidth, 0.1);
					expect(dimensions.height).to.be.closeTo(expectedHeight, 0.1);
				}
			});
		});
	});

	describe("label threshold visibility", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 1000],
						["data2", 200],
						["data3", 500],
						["data4", 50],
						["data5", 100],
						["data6", 20]
					],
					type: "treemap",
					labels: true
				},
				treemap: {
					label: {
						threshold: 0.05,
						format: function(value, ratio, id, size) {
							return `${id} (${size.width.toFixed(0)}x${size.height.toFixed(0)})`;
						}
					}
				}
			};
		});

		it("should hide labels below threshold regardless of dimensions", () => {
			const threshold = args.treemap.label.threshold;
			const totalValue = chart.internal.$el.treemap.datum().value;
			let hiddenCount = 0;
			let visibleCount = 0;

			chart.$.text.texts.each(function(d) {
				const ratio = d.value / totalValue;
				const isUnderThreshold = ratio < threshold;
				const opacity = this.style.opacity;

				if (isUnderThreshold) {
					expect(opacity).to.be.equal("0");
					hiddenCount++;
				} else {
					expect(opacity).to.not.equal("0");
					visibleCount++;
				}
			});

			// Verify that some labels are hidden and some are visible
			expect(hiddenCount).to.be.greaterThan(0);
			expect(visibleCount).to.be.greaterThan(0);
		});

		it("should still calculate dimensions for hidden labels", () => {
			const threshold = args.treemap.label.threshold;
			const totalValue = chart.internal.$el.treemap.datum().value;

			chart.data().forEach(data => {
				const ratio = data.values[0].value / totalValue;
				const isUnderThreshold = ratio < threshold;

				if (isUnderThreshold) {
					// Even for hidden labels, dimensions should be calculated
					const text = chart.$.text.texts.filter(function(d) {
						return d.id === data.id;
					});

					text.each(function() {
						// The text content should still contain dimension info
						const hasPattern = /\(\d+x\d+\)/.test(this.textContent);
						expect(hasPattern).to.be.true;
					});
				}
			});
		});
	});
});
