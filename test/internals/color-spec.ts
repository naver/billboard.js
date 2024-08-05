/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {
	select as d3Select,
	namespaces as d3Namespaces
} from "d3-selection";
import {beforeEach, beforeAll, afterAll, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$ARC, $BAR, $COLOR, $COMMON, $EVENT, $LEGEND, $SHAPE, $TOOLTIP} from "../../src/config/classes";
import {KEY as CACHE_KEY} from "../../src/module/Cache";
import {isFunction, isObject, isString} from "../../src/module/util";

describe("COLOR", () => {
	let chart;
	let args: any = {
		data: {
			columns: [
				["data1", 30, 20, 50],
				["data2", 200, 130, 90],
				["data3", 300, 200, 160],
				["data4", 200, 130, 90],
				["data5", 130, 120, 150],
				["data6", 90, 70, 20],
				["data7", 283, 170, 275],
				["data8", 300, 200, 160],
				["data9", 130, 120, 150],
				["data10", 130, 120, 150]
			],
			type: "bar"
		}
	};

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("color pattern", () => {
		const pattern = ["#00c73c", "#fa7171", "#2ad0ff", "#7294ce", "#e3e448", "#cc7e6e", "#fb6ccf", "#c98dff", "#4aea99", "#bbbbbb"];
		const styleSheet = document.createElement("style");

		beforeAll(() => {
			styleSheet.innerHTML = `.${$COLOR.colorPattern} {
				background-image: url("${pattern.join(";")}");
			}`;

			document.head.appendChild(styleSheet);
		});

		afterAll(() => {
			styleSheet.parentNode?.removeChild(styleSheet);
			document.body[CACHE_KEY.colorPattern] = null;
		});

		it("should get and parse from the stylesheet", () => {			
			const color = chart.internal.generateColor();
			const pttrn: string[] = [];
			
			chart.data().forEach(v => {
				pttrn.push(color(v.id));
			});

			expect(pttrn).to.deep.equal(pattern);

			// // check if pattern value are cached
			expect(document.body["__colorPattern__"]).to.deep.equal(pattern);
		});

		it("check if color pattern applied to data elements", () => {
			chart.$.main.selectAll(`.${$BAR.chartBars} .${$COMMON.target} path:first-child`)
				.each(function(v, i) {
					expect(this.style.fill).to.be.equal(util.hexToRgb(pattern[i]));
				});
		});
	});

	describe("tiles", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30, 200, -100, 400, -150, 250],
						["data2", 50, 20, 10, 40, 15, 25]
					],
					type: "bar"
				},
				color: {
					pattern: ["red", "blue"],
					tiles: function() {
						function circlePattern(fillColor, opacity, radiusMin, radiusMax) {
							const pattern = d3Select(document.createElementNS(d3Namespaces.svg, "pattern"))
								.attr("patternUnits", "userSpaceOnUse")
								.attr("width", "32")
								.attr("height", "32");

							const g = pattern
								.append("g")
								.style("fill", fillColor || "#000")
								.style("opactiy", opacity || "0.2");

							g
								.append("circle")
								.attr("cx", "3")
								.attr("cy", "3")
								.attr("r", radiusMin || "3");

							g
								.append("circle")
								.attr("cx", "13")
								.attr("cy", "13")
								.attr("r", radiusMax || "9");

							return pattern.node();
						}

						return [
							circlePattern("#FFF", "0.2", "3", "10"),
							circlePattern("yellow", "0.3", "3", "3")
						];
					}
				}
			};
		});

		it("should create patterns property", () => {
			expect(chart.internal.patterns).to.be.an("array");
		});

		it("patterns should be an array with id and pattern objects", () => {
			const {patterns} = chart.internal;
			const numPatterns = patterns.length;

			const valid = patterns.map(p => {
				return isString(p.id) && p.node.nodeName.toLowerCase() === "pattern";
			});

			expect(valid.length).to.be.equal(numPatterns);
		});

		it("check for legend color tiles", () => {
			const colors = [chart.color("data1"), chart.color("data2")];

			chart.$.legend.selectAll(`.${$LEGEND.legendItemTile}`)
				.each(function(v, i) {
					const stroke = d3Select(this).style("stroke").replace(/\"/g, "");

					expect(stroke).to.be.equal(colors[i]);
			});
		});

		it("check for tooltip color tiles", () => {
			const colors = [chart.color("data1"), chart.color("data2")];
			const eventRect = chart.$.main
				.select(`.${$EVENT.eventRect}-1`)
				.node();

			util.fireEvent(eventRect, "mousemove", {
				clientX: 100,
				clientY: 100
			}, chart);

			d3Select(chart.element)
				.selectAll(`.${$TOOLTIP.tooltip} td rect`)
				.each(function(v, i) {
					const fill = d3Select(this).style("fill").replace(/\"/g, "");

					expect(fill).to.be.equal(colors[i]);
				});
		});

		describe("pattern names", () => {
			beforeAll(() => {
				args.color.pattern = ['red', 'gold', 'green'];
			});

			it("should create correct pattern names", () => {
				const {internal} = chart;
				const {datetimeId} = internal.state;
				const expectedIds = [
					`${datetimeId}-pattern-red`,
					`${datetimeId}-pattern-gold`,
					`${datetimeId}-pattern-green`
				];

				internal.patterns.forEach((p, idx) => {
					const id = `${expectedIds[idx]}-${idx}`;

					expect(p.id).to.be.equal(id);
					expect(p.node.id).to.be.equal(id);
				});
			});
		});

		describe("pattern shouldn't be applying for line types", () => {
			const checkFill = () => {
				const {internal} = chart;
				const rx = /#bb-\d+-pattern-/;

				chart.data().forEach(v => {
					const id = v.id;
					const isLine = internal.isTypeOf(id, ["line", "spline", "step"]) || !internal.config.data_types[id];
					const stroke = internal.$el.main.select(`.${$SHAPE.shapes}-${id} path`).style("fill");
					// @ts-ignore
					expect(rx.test(stroke)).to.be[!isLine];
				})
			};

			it("set options data.type=undefined", () => {
				args.data.type = undefined;
			});

			it("check for fill", checkFill);

			it("set options data.type=line", () => {
				args.data.type = "line";
			});

			it("check for fill", checkFill);

			it("set options data.type=spline", () => {
				args.data.type = "spline";
			});

			it("check for fill", checkFill);

			it("set options data.type=step", () => {
				args.data.type = "step";
			});

			it("check for fill", checkFill);

			it("set options data.type", () => {
				args.data.type = undefined;
				args.data.types = {
					data1: "bar",
					data2: "line"
				};
			});

			it("check for fill", checkFill);
		});
	});

	describe("color.onover", () => {
		const barStrokeColor = "blue";

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 20, 30],
						["data2", 20, 10, 25]
					],
					types: {
						data2: "bar"
					},
				},
				color: {
					onover: "yellow"
				},
				onafterinit: function() {
					// set bar stroke color value manually
					this.$.bar.bars
						.style("stroke", barStrokeColor)
						.style("stroke-width", 1)
				}
			}
		});

		// check color.onover
		const checkColor = (chart, colorOnover) => {
			const {$: {main}, internal: {$el}} = chart;
			const eventRect = $el.eventRect.node();
			const shape = main.selectAll(`.${$SHAPE.shape}-1`);
			const originalColor: any = [];

			shape.each(function() {
				originalColor.push({
					fill: this.style.fill,
					stroke: this.style.stroke
				});
			});

			util.fireEvent(eventRect, "mousemove", {
				clientX: 313,
				clientY: 200
			}, chart);

			shape.each(function(d) {
				let color = colorOnover;

				if (isObject(color)) {
					color = color[d.id];
				} else if (isFunction(color)) {
					color = color();
				}

				expect(this.style.fill).to.be.equal(color);

				if (this.tagName === "path") {
					expect(this.style.stroke).to.be.equal(barStrokeColor);
				}
			});

			// check for restoration
			util.fireEvent(eventRect, "mouseout");

			shape.each(function(d, i) {
				expect(this.style.fill).to.be.equal(originalColor[i].fill);
				expect(this.style.stroke).to.be.equal(originalColor[i].stroke);
		   });
		};

		it("check the onover color when string value is given", () => {
			checkColor(chart, args.color.onover);
		});

		it("set options color.onover={ ... }", () => {
			args.data.types.data1 = "bar";
			args.data.gropus = [["data1", "data2"]];

			args.color.onover = {
				data1: "red",
				data2: "yellow"
			};
		});

		it("check the onover color when object value is given", () => {
			checkColor(chart, args.color.onover);
		});

		it("set options color.onover=function(){}", () => {
			args.color.onover = function() {
				return "green";
			};
		});

		it("check the onover color when function value is given", () => {
			checkColor(chart, args.color.onover);
		});

		it("set options data.type=pie", () => {
			args = {
				data: {
					columns: [
						["data1", 10],
						["data2", 20]
					],
					type: "pie"
				},
				color: {
					onover: "red"
				},
				transition: {
					duration: 0
				}
			};
		});

		it("check for the arc type", () => new Promise(done => {
			setTimeout(() => {
				const {main} = chart.$;
				const arc = main.select(`.${$ARC.arc}-data1`).node();
				const originalColor = arc.style.fill;

				util.fireEvent(arc, "mouseover");

				expect(arc.style.fill).to.be.equal(args.color.onover);

				util.fireEvent(arc, "mouseout");
				expect(arc.style.fill).to.be.equal(originalColor);

				done(1);
			}, 300);
		}));
	});

	describe("color.threshold", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data", 0]
					],
					type: "gauge"
				},
				color: {
					pattern: ["rgb(255, 0, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)"],
					threshold: {
						values: [0, 20, 40, 60, 80]
					}
				}
			}
		});

		it("check for color update", () => new Promise(done => {
			const path = chart.$.arc.select(`path.${$ARC.arc}-data`);
			let i = 0;

			expect(path.style("fill")).to.be.equal(args.color.pattern[i++]);

			chart.load({columns: [["data", 19]]});

			setTimeout(() => {
				expect(path.style("fill")).to.be.equal(args.color.pattern[i++]);
				chart.load({columns: [["data", 40]]});
			}, 300);

			setTimeout(() => {
				expect(path.style("fill")).to.be.equal(args.color.pattern[i++]);
				done(1);
			}, 600);
		}));
	});

	describe("Tooltip color", () => {
		const c = {data1: "yellow", data2: "green"};

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 50]
					],
					color: (color, d) => c[d.id] || color
				}
			};
		});

		it("should apply correct color values", () => {			
			chart.$.circles.each(function(d) {
				expect(this.style.fill).to.be.equal(c[d.id]);
			});

			// when
			chart.tooltip.show({index:0});


			["data1", "data2"].forEach(v => {
				expect(chart.$.tooltip.selectAll(`.${$TOOLTIP.tooltipName}-${v} .name span`).style("background-color")).to.be.equal(c[v]);
			});
		});

		it("set option data.type='donut'", () => {
			args.data.type = "donut";
		});

		it("arc should apply correct color values", () => {
			chart.$.arc.selectAll("path").each(function(d) {
				expect(this.style.fill).to.be.equal(
					chart.internal.$el.legend.select(`.${$LEGEND.legendItem}-${d.data.id} line`).style("stroke")
				);
			});
		});
	});
});
