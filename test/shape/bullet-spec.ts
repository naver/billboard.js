/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeAll, beforeEach, describe, expect, it} from "vitest";
import util from "../assets/util";
import {$BULLET} from "../../src/config/classes";

describe("SHAPE BULLET", () => {
	let chart;
	let args;

	beforeEach(function() {
		chart = util.generate(args);
	});

	describe("default bullet", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "bullet"
				}
			};
		});

		it("should render the bullet container group", () => {
			const {$el: {bullet}} = chart.internal;

			expect(bullet).to.not.be.null;
			expect(bullet.classed($BULLET.chartBullets)).to.be.true;
		});

		it("should render one bullet group per data series", () => {
			const {$el: {bullet}} = chart.internal;
			const groups = bullet.selectAll(`.${$BULLET.chartBullet}`);

			expect(groups.size()).to.be.equal(3);
		});

		it("should render range bands, a measure and a label for each bullet", () => {
			const {$el: {bullet}} = chart.internal;

			bullet.selectAll(`.${$BULLET.chartBullet}`).each(function() {
				const g = this;

				expect(g.querySelectorAll(`.${$BULLET.bulletRange}`).length).to.be.above(0);
				expect(g.querySelectorAll(`.${$BULLET.bulletMeasure}`).length).to.be.equal(1);
				expect(g.querySelectorAll(`.${$BULLET.bulletLabel}`).length).to.be.equal(1);
			});
		});

		it("should render measure as <rect> by default", () => {
			const {$el: {bullet}} = chart.internal;
			const measure = bullet.select(`.${$BULLET.bulletMeasure}`).node();

			expect(measure.tagName.toLowerCase()).to.be.equal("rect");
		});
	});

	describe("bullet ranges & target", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 50]
					],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100],
					target: 80
				}
			};
		});

		it("should render a range band per provided threshold", () => {
			const {$el: {bullet}} = chart.internal;
			const ranges = bullet.selectAll(`.${$BULLET.bulletRange}`);

			expect(ranges.size()).to.be.equal(3);
		});

		it("should scale the measure relative to the range domain", () => {
			const {$el: {bullet}} = chart.internal;
			const ranges = bullet.selectAll(`.${$BULLET.bulletRange}`).nodes();

			// widest range band corresponds to the domain max (100)
			const fullWidth = Math.max(...ranges.map(r => +r.getAttribute("width")));
			const measureWidth = +bullet.select(`.${$BULLET.bulletMeasure}`).attr("width");

			// value 50 of domain 100 => half of the full width
			expect(measureWidth / fullWidth).to.be.closeTo(0.5, 0.02);
		});

		it("should render the comparative target marker", () => {
			const {$el: {bullet}} = chart.internal;
			const target = bullet.select(`.${$BULLET.bulletTarget}`);

			expect(target.empty()).to.be.false;
			expect(target.node().tagName.toLowerCase()).to.be.equal("line");
		});

		it("should accept per-id ranges/target objects", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50], ["data2", 20]],
					type: "bullet"
				},
				bullet: {
					ranges: {data1: [40, 70, 100], data2: [10, 20, 30]},
					target: {data1: 80, data2: 25}
				}
			});

			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.bulletTarget}`).size()).to.be.equal(2);
		});
	});

	describe("bullet type: dot", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					type: "dot",
					ranges: [40, 70, 100],
					marker: {size: 7}
				}
			};
		});

		it("should render the measure as a <circle>", () => {
			const {$el: {bullet}} = chart.internal;
			const measure = bullet.select(`.${$BULLET.bulletMeasure}`).node();

			expect(measure.tagName.toLowerCase()).to.be.equal("circle");
			expect(+measure.getAttribute("r")).to.be.equal(7);
		});
	});

	describe("bullet rotated (vertical)", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [["data1", 50], ["data2", 80]],
					type: "bullet"
				},
				bullet: {
					rotated: true,
					ranges: [40, 70, 100],
					target: 90
				}
			};
		});

		it("should render vertically with positive height measures", () => {
			const {$el: {bullet}} = chart.internal;

			bullet.selectAll(`.${$BULLET.bulletMeasure}`).each(function() {
				expect(+this.getAttribute("height")).to.be.above(0);
			});
		});

		it("should render target markers as horizontal lines", () => {
			const {$el: {bullet}} = chart.internal;
			const target = bullet.select(`.${$BULLET.bulletTarget}`).node();

			// horizontal line => y1 === y2
			expect(+target.getAttribute("y1")).to.be.equal(+target.getAttribute("y2"));
		});
	});

	describe("bullet label options", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100],
					label: {
						show: false
					}
				}
			};
		});

		it("should hide labels when label.show=false", () => {
			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.bulletLabel}`).size()).to.be.equal(0);
		});

		it("should format labels when label.format is given", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100],
					label: {
						format: (value, id) => `${id}: ${value}`
					}
				}
			});

			const {$el: {bullet}} = chart.internal;
			const label = bullet.select(`.${$BULLET.bulletLabel}`);

			expect(label.text()).to.be.equal("data1: 50");
		});
	});

	describe("bullet range colors & auto ranges", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				}
			};
		});

		it("should auto-generate 3 range bands when ranges are omitted", () => {
			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.bulletRange}`).size()).to.be.equal(3);
		});

		it("should apply range.colors array", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100],
					range: {
						colors: ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"]
					}
				}
			});

			const {$el: {bullet}} = chart.internal;
			const fills = bullet.selectAll(`.${$BULLET.bulletRange}`).nodes()
				.map(n => n.style.fill);

			expect(fills).to.include("rgb(255, 0, 0)");
			expect(fills).to.include("rgb(0, 0, 255)");
		});

		it("should apply range.colors callback", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100],
					range: {
						colors: (index, length) => {
							expect(length).to.be.equal(3);
							return "rgb(10, 20, 30)";
						}
					}
				}
			});

			const {$el: {bullet}} = chart.internal;
			const fills = bullet.selectAll(`.${$BULLET.bulletRange}`).nodes()
				.map(n => n.style.fill);

			expect(fills.every(f => f === "rgb(10, 20, 30)")).to.be.true;
		});

		it("should resolve ranges/target via callbacks", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: (id, value) => {
						expect(id).to.be.equal("data1");
						expect(value).to.be.equal(50);
						return [40, 70, 100];
					},
					target: (id, value) => value + 30
				}
			});

			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.bulletRange}`).size()).to.be.equal(3);
			expect(bullet.select(`.${$BULLET.bulletTarget}`).empty()).to.be.false;
		});

		it("should derive dot radius from thickness when marker.size=0", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					type: "dot",
					ranges: [40, 70, 100]
				}
			});

			const {$el: {bullet}} = chart.internal;
			const r = +bullet.select(`.${$BULLET.bulletMeasure}`).attr("r");

			expect(r).to.be.above(0);
		});
	});

	describe("bullet interaction", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100]
				}
			};
		});

		it("should show tooltip on measure hover", () => {
			const {internal} = chart;
			const measure = internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node();

			util.fireEvent(measure, "mouseover");
			util.fireEvent(measure, "mousemove", {
				clientX: 100,
				clientY: 100
			}, chart);

			expect(chart.$.tooltip.html()).to.not.be.empty;
		});

		it("should hide tooltip on mouseout", () => {
			const {internal} = chart;
			const measure = internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node();

			util.fireEvent(measure, "mouseover");
			util.fireEvent(measure, "mouseout");

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});
	});

	describe("bullet edge cases", () => {
		it("should handle zero values without error", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 0]],
					type: "bullet"
				}
			});

			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.chartBullet}`).size()).to.be.equal(1);
			expect(+bullet.select(`.${$BULLET.bulletMeasure}`).attr("width")).to.be.equal(0);
		});

		it("should reserve space for a bottom legend", () => {
			chart = util.generate({
				data: {
					columns: [["data1", 50]],
					type: "bullet"
				},
				bullet: {
					ranges: [40, 70, 100]
				},
				legend: {
					position: "bottom"
				}
			});

			const {$el: {bullet}} = chart.internal;

			expect(bullet.selectAll(`.${$BULLET.bulletRange}`).size()).to.be.equal(3);
		});
	});
});
