/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import util from "./assets/util";

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
						["data2", 50, 20, 10, 40, 15, 25],
					],
					type: "bar"
				},
				color: {
					tiles: function() {
						function circlePattern(fillColor, opacity, radiusMin, radiusMax) {
							const pattern = document.createElementNS(
								"http://www.w3.org/2000/svg", "pattern");
							pattern.setAttribute("patternUnits", "userSpaceOnUse");
							pattern.setAttribute("width", "32");
							pattern.setAttribute("height", "32");

							const g = document.createElementNS(
								"http://www.w3.org/2000/svg", "g");
							g.style.fill = fillColor || "#000";
							g.style.opacity = opacity || "0.2";

							const rmin = radiusMin || "3";
							const rmax = radiusMax || "9";

							const circle1 = document.createElementNS(
								"http://www.w3.org/2000/svg", "circle")
							circle1.setAttribute("cx", "3");
							circle1.setAttribute("cy", "3");
							circle1.setAttribute("r", rmin);

							const circle2 = document.createElementNS(
								"http://www.w3.org/2000/svg", "circle")
							circle2.setAttribute("cx", "13");
							circle2.setAttribute("cy", "13");
							circle2.setAttribute("r", rmax);

							g.appendChild(circle1);
							g.appendChild(circle2);
							pattern.appendChild(g);
							return pattern;
						}

						return [
							circlePattern("#FFF", "0.2", "1", "10"),
							circlePattern("#000", "0.3", "3", "6")
						];
					}
				}
			};
		});

		it("should create patterns property", () => {
			expect(chart.internal.patterns).to.be.an('array');
		});

		it("patterns should be an array with id and pattern objects", () => {
			const patterns = chart.internal.patterns;
			const numPatterns = patterns.length;

			const valid = patterns.map(p => {
				return typeof p.id === 'string' && p.node.nodeName.toLowerCase() === 'pattern';
			});

			expect(valid.length).to.be.equal(numPatterns);
		});

		describe("pattern names", () => {
			before(() => {
				args.color.pattern = ['red', 'gold', 'green'];
			})

			it("should create correct pattern names", () => {
				const expectedIds = [
					'bb-colorize-pattern-red',
					'bb-colorize-pattern-gold',
					'bb-colorize-pattern-green'
				];

				const patterns = chart.internal.patterns;

				patterns.forEach((p, idx) => {
					expect(p.id).to.be.equal(expectedIds[idx]);
					expect(p.node.id).to.be.equal(expectedIds[idx]);
				});
			});
		})

	});
});
