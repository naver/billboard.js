/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "../assets/util";
import CLASS from "../../src/config/classes";
import {isString} from "../../src/internals/util";

describe("COLOR", () => {
	let chart;
	let args;

	beforeEach(() => {
		chart = util.generate(args);
	});

	describe("tiles", () => {
		before(() => {
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
							const pattern = d3.select(document.createElementNS(d3.namespaces.svg, "pattern"))
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
			const patterns = chart.internal.patterns;
			const numPatterns = patterns.length;

			const valid = patterns.map(p => {
				return isString(p.id) && p.node.nodeName.toLowerCase() === "pattern";
			});

			expect(valid.length).to.be.equal(numPatterns);
		});

		it("check for legend color tiles", () => {
			const colors = [chart.color("data1"), chart.color("data2")];

			d3.selectAll(`.${CLASS.legendItem} .${CLASS.legendItemTile}`)
				.each(function(v, i) {
					const stroke = d3.select(this).style("stroke").replace(/\"/g, "");

					expect(stroke).to.be.equal(colors[i]);
			});
		});

		it("check for tooltip color tiles", () => {
			const colors = [chart.color("data1"), chart.color("data2")];
			const eventRect = chart.internal.main
				.select(`.${CLASS.eventRect}-1`)
				.node();

			util.fireEvent(eventRect, "mousemove", {
				clientX: 100,
				clientY: 100
			}, chart);

			d3.select(chart.element)
				.selectAll(`.${CLASS.tooltip} td rect`)
				.each(function(v, i) {
					const fill = d3.select(this).style("fill").replace(/\"/g, "");

					expect(fill).to.be.equal(colors[i]);
				});
		});

		describe("pattern names", () => {
			before(() => {
				args.color.pattern = ['red', 'gold', 'green'];
			});

			it("should create correct pattern names", () => {
				const internal = chart.internal;
				const datetimeId = internal.datetimeId;
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
			const checkStroke = () => {
				const internal = chart.internal;
				const rx = /#bb-\d+-pattern-/;

				chart.data().forEach(v => {
					const id = v.id;
					const isLine = internal.isTypeOf(id, ["line", "spline", "step"]) || !internal.config.data_types[id];
					const stroke = internal.main.select(`.${CLASS.shapes}-${id} path`).style("stroke");

					expect(rx.test(stroke)).to.be[!isLine];
				})
			};

			it("set options data.type=undefined", () => {
				args.data.type = undefined;
			});

			it("check for stroke", checkStroke);

			it("set options data.type=line", () => {
				args.data.type = "line";
			});

			it("check for stroke", checkStroke);

			it("set options data.type=spline", () => {
				args.data.type = "spline";
			});

			it("check for stroke", checkStroke);

			it("set options data.type=step", () => {
				args.data.type = "step";
			});

			it("check for stroke", checkStroke);

			it("set options data.type", () => {
				args.data.type = undefined;
				args.data.types = {
					data1: "bar",
					data2: "line"
				};
			});

			it("check for stroke", checkStroke);
		});
	});
});
