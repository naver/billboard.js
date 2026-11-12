/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, beforeEach, it, expect */
import {beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import util from "../assets/util";
import {$BULLET} from "../../src/ChartInternal/shape/core/bullet";
import {$COMMON, $TEXT} from "../../src/config/classes";
// the stylesheets as text: every theme has to style the title
// @ts-ignore
import baseScss from "../../src/scss/billboard.scss?raw";
// @ts-ignore
import darkScss from "../../src/scss/theme/dark.scss?raw";
// @ts-ignore
import datalabScss from "../../src/scss/theme/datalab.scss?raw";
// @ts-ignore
import graphScss from "../../src/scss/theme/graph.scss?raw";
// @ts-ignore
import insightScss from "../../src/scss/theme/insight.scss?raw";
// @ts-ignore
import modernScss from "../../src/scss/theme/modern.scss?raw";

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

		it("should render range bands and a measure for each bullet", () => {
			const {$el: {bullet}} = chart.internal;

			bullet.selectAll(`.${$BULLET.chartBullet}`).each(function() {
				const g = this;

				expect(g.querySelectorAll(`.${$BULLET.bulletRange}`).length).to.be.above(0);
				expect(g.querySelectorAll(`.${$BULLET.bulletMeasure}`).length).to.be.equal(1);
			});
		});

		it("should not draw data labels unless data.labels is set, like the other types", () => {
			expect(chart.$.svg.selectAll(`.${$TEXT.chartTexts} .${$TEXT.text}`).size()).to.be.equal(0);
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

	describe("bullet data labels", () => {
		const columns = [["data1", 50], ["data2", 20]];
		const texts = () => chart.$.svg.selectAll(`.${$TEXT.chartTexts} .${$TEXT.text}`);
		const text = (i = 0) => texts().nodes()[i];
		const make = (options = {}) => {
			chart = util.generate({
				data: {columns, type: "bullet", labels: true},
				bullet: {ranges: [40, 70, 100]},
				...options
			});

			return chart;
		};
		const measure = (i = 0) => chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletMeasure}`).nodes()[i];

		it("should draw one label per bullet, with the measure value", () => {
			make();

			expect(texts().size()).to.be.equal(2);
			expect(texts().nodes().map(n => n.textContent)).to.deep.equal(["50", "20"]);
		});

		it("should show the last value of a series", () => {
			make({data: {columns: [["data1", 10, 40]], type: "bullet", labels: true}});

			expect(text().textContent).to.be.equal("40");
		});

		it("should place the label beside the measure, centered on its row", () => {
			make();

			const m = measure().getBoundingClientRect();
			const t = text().getBoundingClientRect();

			expect(t.left).to.be.at.least(m.right);
			expect(t.left - m.right).to.be.below(15);
			expect((t.top + t.bottom) / 2).to.be.closeTo((m.top + m.bottom) / 2, 4);
			expect(text().getAttribute("text-anchor")).to.be.equal("start");
		});

		it("should clear the dot marker", () => {
			make({bullet: {ranges: [40, 70, 100], type: "dot", marker: {size: 12}}});

			const m = measure().getBoundingClientRect();

			expect(text().getBoundingClientRect().left).to.be.at.least(m.right);
		});

		it("should place the label above the measure when rotated", () => {
			make({bullet: {ranges: [40, 70, 100], rotated: true}});

			const m = measure().getBoundingClientRect();
			const t = text().getBoundingClientRect();

			expect(text().getAttribute("text-anchor")).to.be.equal("middle");
			expect(t.bottom).to.be.at.most(m.top + 1);
			expect((t.left + t.right) / 2).to.be.closeTo((m.left + m.right) / 2, 2);
		});

		it("should center the label on the measure with data.labels.centered", () => {
			make({data: {columns, type: "bullet", labels: {centered: true}}});

			const m = measure().getBoundingClientRect();
			const t = text().getBoundingClientRect();

			expect(text().getAttribute("text-anchor")).to.be.equal("middle");
			expect((t.left + t.right) / 2).to.be.closeTo((m.left + m.right) / 2, 2);
			expect((t.top + t.bottom) / 2).to.be.closeTo((m.top + m.bottom) / 2, 4);
		});

		it("should hide the labels when bullet.label.show=false", () => {
			make({bullet: {ranges: [40, 70, 100], label: {show: false}}});

			expect(texts().size()).to.be.equal(0);
		});

		it("should format with bullet.label.format over data.labels.format", () => {
			make({
				data: {columns, type: "bullet", labels: {format: v => `d:${v}`}},
				bullet: {ranges: [40, 70, 100], label: {format: (value, id) => `${id}: ${value}`}}
			});

			expect(text().textContent).to.be.equal("data1: 50");
		});

		it("should format with data.labels.format: function and object by data id", () => {
			make({data: {columns, type: "bullet", labels: {format: (v, id) => `${id}=${v}`}}});

			expect(text().textContent).to.be.equal("data1=50");

			make({data: {columns, type: "bullet", labels: {format: {data1: v => "$" + v}}}});

			// a data id without a format shows nothing, same as the other types
			expect(texts().nodes().map(n => n.textContent)).to.deep.equal(["$50", ""]);
		});

		it("should not color the label with the series color", () => {
			make();

			expect(text().style.fill).to.not.be.equal(util.hexToRgb(chart.color("data1")));
		});

		it("should apply data.labels.colors", () => {
			make({data: {columns, type: "bullet", labels: {colors: "#ff0000"}}});

			expect(text().style.fill).to.be.equal(util.hexToRgb("#ff0000"));

			make({data: {columns, type: "bullet", labels: {colors: {data2: "#00ff00"}}}});

			expect(text(1).style.fill).to.be.equal(util.hexToRgb("#00ff00"));
		});

		it("should move the label with data.labels.position", () => {
			make();

			const before = text().getBoundingClientRect();

			make({data: {columns, type: "bullet", labels: {position: {x: 20, y: 7}}}});

			const after = text().getBoundingClientRect();

			expect(after.left - before.left).to.be.closeTo(20, 1);
			expect(after.top - before.top).to.be.closeTo(7, 1);
		});

		it("should support data.labels.rotate and data.labels.border", () => {
			make({data: {columns, type: "bullet", labels: {rotate: 90, border: true}}});

			expect(text().getAttribute("transform")).to.include("rotate(90");
			expect(chart.$.svg.selectAll(`.${$TEXT.chartTexts} rect`).size()).to.be.above(0);
		});

		it("should hide the label together with its bullet", () => {
			make();
			chart.hide("data1");

			const hidden = text().parentNode.parentNode;

			expect(hidden.getAttribute("class")).to.include("bb-target-data1");
		});

		it("should let the pointer through the labels to the measure", () => {
			make();

			expect(getComputedStyle(chart.$.svg.select(`.${$TEXT.chartTexts}`).node()).pointerEvents)
				.to.be.equal("none");
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

		it("should not show tooltip on range band hover", () => {
			const {internal} = chart;
			const range = internal.$el.bullet.select(`.${$BULLET.bulletRange}`).node();

			util.fireEvent(range, "mouseover");
			util.fireEvent(range, "mousemove", {
				clientX: 100,
				clientY: 100
			}, chart);

			expect(chart.$.tooltip.html()).to.be.empty;
		});

		it("should position the tooltip next to the pointer", () => {
			const measure = chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node();

			util.fireEvent(measure, "mouseover");
			util.fireEvent(measure, "mousemove", {clientX: 100, clientY: 100}, chart);

			// inline value: style("left") falls back to the computed "0px" when it is unset
			const left = parseFloat(chart.$.tooltip.node().style.left);

			// the axis chart formula left it unset (NaN)
			expect(Number.isFinite(left)).to.be.true;
			// next to the pointer, not shifted by the offset of the bullet area
			expect(left).to.be.closeTo(100 - chart.$.svg.node().getBoundingClientRect().left, 2);
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

	describe("bullet axis & measure value", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 10, 40],
						["data2", 45]
					],
					type: "bullet"
				},
				bullet: {
					ranges: [100]
				}
			};
		});

		it("should render an axis with ticks for each bullet", () => {
			const axes = chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletAxis}`);

			expect(axes.size()).to.be.equal(2);
			expect(axes.select(".tick").size()).to.be.above(0);
		});

		it("should use the last data value as the measure", () => {
			const {bullet} = chart.internal.$el;
			const g = bullet.select(`.${$BULLET.chartBullet}`);
			const full = +g.select(`.${$BULLET.bulletRange}`).attr("width");
			const measure = +g.select(`.${$BULLET.bulletMeasure}`).attr("width");

			// last value 40 of domain 100
			expect(measure / full).to.be.closeTo(0.4, 0.001);
		});

		it("should render the axis on the left when rotated", () => {
			chart.config("bullet.rotated", true, true);

			const axis = chart.internal.$el.bullet.select(`.${$BULLET.bulletAxis}`);

			expect(axis.empty()).to.be.false;
			// vertical axis has no horizontal translation of its own
			expect(axis.attr("transform")).to.be.null;
		});

		it("should not render the axis when bullet.axis.show=false", () => {
			chart.config("bullet.axis.show", false, true);

			expect(chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletAxis}`).size()).to.be.equal(0);
		});
	});

	describe("bullet data update", () => {
		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45]
					],
					type: "bullet"
				},
				bullet: {
					ranges: [100]
				}
			};
		});

		it("should add a row on load", () => new Promise(done => {
			chart.load({
				columns: [["data3", 20]],
				done() {
					const {bullet} = chart.internal.$el;

					expect(bullet.selectAll(`.${$BULLET.chartBullet}`).size()).to.be.equal(3);
					expect(bullet.selectAll(`.${$BULLET.bulletMeasure}`).size()).to.be.equal(3);
					done(1);
				}
			});
		}));

		it("should remove a row on unload", () => new Promise(done => {
			chart.unload({
				ids: "data1",
				done() {
					const {bullet} = chart.internal.$el;

					expect(bullet.selectAll(`.${$BULLET.chartBullet}`).size()).to.be.equal(1);
					done(1);
				}
			});
		}));
	});

	describe("bullet input options", () => {
		const data = {columns: [["data1", 50]], type: "bullet"};
		const getMeasure = () => chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node();

		it("should show tooltip on touchstart and hide on touchend", () => {
			chart = util.generate({data, interaction: {inputType: {touch: true, mouse: false}}});

			util.fireEvent(getMeasure(), "touchstart", {}, chart);
			expect(chart.$.tooltip.html()).to.not.be.empty;

			util.fireEvent(getMeasure(), "touchend");
			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});

		it("should not bind events when interaction.enabled=false", () => {
			chart = util.generate({data, interaction: {enabled: false}});

			util.fireEvent(getMeasure(), "mouseover");
			util.fireEvent(getMeasure(), "mousemove", {clientX: 100, clientY: 100}, chart);

			expect(chart.$.tooltip?.html() ?? "").to.be.empty;
		});

		it("should keep the tooltip on mouseout when interaction.onout=false", () => {
			chart = util.generate({data, interaction: {onout: false}});

			util.fireEvent(getMeasure(), "mouseover");
			util.fireEvent(getMeasure(), "mousemove", {clientX: 100, clientY: 100}, chart);
			util.fireEvent(getMeasure(), "mouseout");

			expect(chart.$.tooltip.style("display")).to.not.be.equal("none");
		});
	});

	describe("bullet range and layout fallbacks", () => {
		it("should generate auto ranges when the ranges callback returns nothing", () => {
			chart = util.generate({
				data: {columns: [["data1", 50]], type: "bullet"},
				bullet: {ranges: () => undefined}
			});

			expect(chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletRange}`).size())
				.to.be.equal(3);
		});

		it("should not reserve legend space when the legend is hidden", () => {
			const columns = [["data1", 50]];
			const withLegend = util.generate({data: {columns, type: "bullet"}}).internal.getBulletSize();

			chart = util.generate({data: {columns, type: "bullet"}, legend: {show: false}});

			expect(chart.internal.getBulletSize().height).to.be.above(withLegend.height);
		});
	});

	describe("bullet classes and public api, same as the other types", () => {
		let overEl;

		beforeAll(() => {
			overEl = null;
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45]
					],
					type: "bullet",
					classes: {data1: "myclass"},
					onover: (d, el) => {
						overEl = el;
					}
				},
				color: {pattern: ["#111111", "#222222"]},
				bullet: {
					ranges: [100]
				}
			};
		});

		it("should set target classes and data.classes on each row group", () => {
			const group = chart.internal.$el.bullet.select(`.${$BULLET.chartBullet}`);

			expect(group.classed("bb-target")).to.be.true;
			expect(group.classed("bb-target-data1")).to.be.true;
			expect(group.classed("bb-target-myclass")).to.be.true;
		});

		it("should set shape classes on the measure", () => {
			const measure = chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`);

			// same pattern as funnel: bb-shape bb-shape-<index> bb-<type> bb-<type>-<id>
			["bb-shape", "bb-shape-0", "bb-bullet", "bb-bullet-data1"].forEach(cls => {
				expect(measure.classed(cls), cls).to.be.true;
			});
		});

		it("should apply color.pattern to the measure", () => {
			const measures = chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletMeasure}`);

			expect(util.hexToRgb("#111111")).to.be.equal(measures.nodes()[0].style.fill);
			expect(util.hexToRgb("#222222")).to.be.equal(measures.nodes()[1].style.fill);
		});

		it("should pass the measure element to data.onover", () => {
			const measure = chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node();

			util.fireEvent(measure, "mouseover");

			expect(overEl).to.be.equal(measure);
		});

		it("should apply data.names to the tooltip", () => {
			chart.config("data.names", {data1: "Name One"}, true);

			chart.tooltip.show({data: {id: "data1"}});

			expect(chart.$.tooltip.text()).to.contain("Name One");
		});

		it("should show and hide the tooltip by tooltip.show() and tooltip.hide()", () => {
			chart.tooltip.show({data: {id: "data2"}});

			expect(chart.$.tooltip.style("display")).to.not.be.equal("none");
			expect(chart.$.tooltip.text()).to.contain("data2");

			chart.tooltip.hide();

			expect(chart.$.tooltip.style("display")).to.be.equal("none");
		});
	});

	describe("bullet redraw updates the elements in place", () => {
		const cls = [$BULLET.bulletRange, $BULLET.bulletMeasure, $BULLET.bulletTarget, $BULLET.bulletAxis];
		const count = (selector) => chart.internal.$el.bullet.selectAll(selector).size();
		const eachRow = (fn) => chart.internal.$el.bullet.selectAll(`.${$BULLET.chartBullet}`).each(function() {
			fn(this);
		});

		beforeAll(() => {
			args = {
				data: {
					columns: [
						["data1", 30],
						["data2", 45],
						["data3", 25]
					],
					type: "bullet",
					labels: true
				},
				bullet: {
					ranges: [60, 80, 100],
					target: 70
				},
				transition: {
					duration: 0
				}
			};
		});

		// every row keeps exactly one of each part: nothing is left over or duplicated
		function expectParts({target = 1, axis = 1} = {}) {
			expect(count(`.${$BULLET.bulletRange}`)).to.be.equal(9);
			expect(count(`.${$BULLET.bulletMeasure}`)).to.be.equal(3);
			expect(count(`.${$BULLET.bulletTarget}`)).to.be.equal(3 * target);
			expect(count(`.${$BULLET.bulletAxis}`)).to.be.equal(3 * axis);
		}

		it("should keep the same elements on redraw", () => {
			const parts = [];

			eachRow(g => parts.push(cls.map(c => g.querySelector(`.${c}`))));

			chart.flush();

			eachRow(g => {
				const before = parts.shift();

				cls.forEach((c, i) => expect(g.querySelector(`.${c}`), c).to.be.equal(before[i]));
			});
		});

		it("should not touch the DOM on an unchanged redraw", () => {
			const bullets = new MutationObserver(() => {});
			const labels = new MutationObserver(() => {});

			bullets.observe(chart.internal.$el.bullet.node(), {childList: true, subtree: true});
			labels.observe(chart.$.svg.select(`.${$TEXT.chartTexts}`).node(), {childList: true, subtree: true});
			chart.flush();

			const changes = bullets.takeRecords().filter(r => r.type === "childList").map(r =>
				`${r.target.nodeName}.${r.target.getAttribute?.("class")} +[${[...r.addedNodes].map(n => n.nodeName)}] -[${[...r.removedNodes].map(n => n.nodeName)}]`
			);
			// the data labels are shared with the other types: they set their text again on redraw
			const labelElements = labels.takeRecords()
				.reduce((sum, r) => sum + [...r.addedNodes].filter(node => node.nodeType === 1).length, 0);

			bullets.disconnect();
			labels.disconnect();

			// no element, no text node: not even the tick labels are set again
			expect(changes, changes.join(" | ")).to.have.length(0);
			expect(labelElements).to.be.equal(0);
		});

		it("should draw the axis again when its scale changes", () => {
			const labels = () => chart.internal.$el.bullet.selectAll(`.${$BULLET.bulletAxis} .tick text`)
				.nodes().map(n => n.textContent).join(",");
			const before = labels();

			chart.config("bullet.ranges", [200], true);

			expect(labels()).to.not.be.equal(before);
		});

		it("should swap the measure element between bar and dot", () => {
			chart.config("bullet.type", "dot", true);
			expectParts();
			expect(chart.internal.$el.bullet.selectAll("circle").size()).to.be.equal(3);
			expect(chart.internal.$el.bullet.selectAll(`rect.${$BULLET.bulletMeasure}`).size()).to.be.equal(0);

			chart.config("bullet.type", "bar", true);
			expectParts();
			expect(chart.internal.$el.bullet.selectAll("circle").size()).to.be.equal(0);
			// the swapped element keeps its paint order: above the ranges, below the target
			eachRow(g => {
				const order = [...g.children].map(el => el.getAttribute("class").split(" ")[0]);

				expect(order.indexOf($BULLET.bulletMeasure)).to.be.below(order.indexOf($BULLET.bulletTarget));
				expect(order.indexOf($BULLET.bulletTarget)).to.be.below(order.indexOf($BULLET.bulletAxis));
			});
		});

		it("should redraw the axis for the orientation without stale attributes", () => {
			const tickLine = () => chart.internal.$el.bullet.select(`.${$BULLET.bulletAxis} .tick line`);

			chart.config("bullet.rotated", true, true);
			expectParts();
			// the vertical axis draws x2, the horizontal one y2: the other must not be left behind
			expect(tickLine().attr("x2")).to.not.be.null;
			expect(tickLine().attr("y2")).to.be.null;

			chart.config("bullet.rotated", false, true);
			expectParts();
			expect(tickLine().attr("y2")).to.not.be.null;
			expect(tickLine().attr("x2")).to.be.null;
		});

		it("should add and remove the target, axis and data labels", () => {
			chart.config("bullet.target", null, true);
			expectParts({target: 0});

			chart.config("bullet.target", 70, true);
			expectParts();

			chart.config("bullet.axis.show", false, true);
			expectParts({axis: 0});

			chart.config("bullet.axis.show", true, true);
			expectParts();

			chart.config("bullet.label.show", false, true);
			expect(chart.$.svg.selectAll(`.${$TEXT.chartTexts} .${$TEXT.text}`).size()).to.be.equal(0);

			chart.config("bullet.label.show", true, true);
			expect(chart.$.svg.selectAll(`.${$TEXT.chartTexts} .${$TEXT.text}`).size()).to.be.equal(3);
		});

		it("should reflect changed ranges on redraw", () => {
			chart.config("bullet.ranges", [60], true);

			const g = chart.internal.$el.bullet.select(`.${$BULLET.chartBullet}`);
			const full = +g.select(`.${$BULLET.bulletRange}`).attr("width");
			const measure = +g.select(`.${$BULLET.bulletMeasure}`).attr("width");

			// the old ranges are not kept: value 30 of the new domain 70 (target)
			expect(count(`.${$BULLET.bulletRange}`)).to.be.equal(3);
			expect(measure / full).to.be.closeTo(30 / 60, 0.001);
		});

		it("should compute the layout once for all rows", () => {
			const columns = Array.from({length: 30}, (_, i) => [`d${i}`, 10 + i]);
			const many = util.generate({data: {columns, type: "bullet"}});
			const $$ = many.internal;
			const orig = $$.getLegendHeight.bind($$);
			let calls = 0;

			$$.getLegendHeight = () => {
				calls++;
				return orig();
			};

			many.flush();

			// it was called for every row before: now it doesn't depend on the row count
			expect(calls).to.be.below(10);
		});
	});

	describe("bullet with the right legend", () => {
		it("should keep the plot clear of the legend", () => {
			chart = util.generate({
				data: {columns: [["data1", 30], ["data2", 45]], type: "bullet"},
				legend: {position: "right"}
			});

			const $$ = chart.internal;
			const {left, width} = $$.getBulletSize();
			const legendX = parseFloat(/translate\(([-\d.]+)/.exec($$.$el.legend.attr("transform"))[1]);

			// the legend is at the right side, and the plot ends before it
			expect(legendX).to.be.above($$.state.current.width / 2);
			expect(left + width).to.be.at.most(legendX);
		});
	});

	describe("bullet width.target.ratio", () => {
		const data = {columns: [["data1", 30], ["data2", 45]], type: "bullet"};
		// target marker length of the first row
		const targetLength = () => {
			const line = chart.internal.$el.bullet.select(`.${$BULLET.bulletTarget}`).node();

			return Math.abs(line.y2.baseVal.value - line.y1.baseVal.value);
		};
		const bandInner = () => chart.internal.getBulletLayout().bandInner;

		[
			["a number", 70],
			["a function", () => 70],
			["an object by data id", {data1: 70, data2: 70}]
		].forEach(([name, target]) => {
			it(`should apply the ratio when target is ${name}`, () => {
				chart = util.generate({
					data,
					bullet: {ranges: [100], target, width: {target: {ratio: 0.3}}}
				});

				expect(targetLength()).to.be.closeTo(bandInner() * 0.3, 0.01);
			});
		});

		it("should use 0.6 by default and follow chart.config()", () => {
			chart = util.generate({data, bullet: {ranges: [100], target: 70}});

			expect(targetLength()).to.be.closeTo(bandInner() * 0.6, 0.01);

			chart.config("bullet.width.target.ratio", 0.9, true);

			expect(targetLength()).to.be.closeTo(bandInner() * 0.9, 0.01);
		});

		it("should keep the measure thickness separate from the target length", () => {
			chart = util.generate({
				data,
				bullet: {ranges: [100], target: 70, width: {ratio: 0.5, target: {ratio: 0.2}}}
			});

			const measure = chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`);

			expect(+measure.attr("height")).to.be.closeTo(bandInner() * 0.5, 0.01);
			expect(targetLength()).to.be.closeTo(bandInner() * 0.2, 0.01);
		});
	});

	describe("bullet transition", () => {
		const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
		const measureRect = () => chart.internal.$el.bullet.select(`.${$BULLET.bulletMeasure}`).node()
			.getBoundingClientRect();
		const labelRect = () => chart.$.svg.select(`.${$TEXT.chartTexts} .${$TEXT.text}`).node()
			.getBoundingClientRect();
		const read = () => {
			const m = measureRect();

			return {width: m.width, gap: labelRect().left - m.right};
		};

		beforeAll(() => {
			args = {
				data: {columns: [["data1", 30]], type: "bullet", labels: true},
				bullet: {ranges: [100]},
				transition: {duration: 400}
			};
		});

		it("should move the measure and its label together", async () => {
			await sleep(600);

			const start = read();

			chart.load({columns: [["data1", 90]]});
			await sleep(150);

			const mid = read();

			await sleep(700);

			const end = read();

			// the measure is in transit, not jumping to the end
			expect(mid.width).to.be.above(start.width + 20);
			expect(mid.width).to.be.below(end.width - 20);
			// and the label keeps the same distance from it all along
			expect(mid.gap).to.be.closeTo(start.gap, 3);
			expect(end.gap).to.be.closeTo(start.gap, 3);
		});

		it("should draw a new row in place, not sliding in", async () => {
			await sleep(600);

			const transform = () => chart.internal.$el.bullet.selectAll(`.${$BULLET.chartBullet}`)
				.nodes()[1]?.getAttribute("transform");

			chart.load({columns: [["data2", 50]]});
			await sleep(60);

			const early = transform();

			await sleep(700);

			expect(early).to.not.be.undefined;
			expect(early).to.be.equal(transform());
		});

		it("should not transit when the chart is redrawn by chart.config()", () => {
			const before = measureRect().height;

			chart.config("bullet.width.ratio", 0.9, true);

			// the new thickness is there right after the call
			expect(measureRect().height).to.be.above(before * 2);
		});

		it("should end with the axis of the new domain", async () => {
			chart = util.generate({
				data: {columns: [["data1", 30]], type: "bullet", labels: true},
				transition: {duration: 300}
			});
			await sleep(500);

			chart.load({columns: [["data1", 400]]});
			await sleep(800);

			const $$ = chart.internal;
			const {axis} = $$.getBulletRowGeometry($$.getBulletData()[0], $$.getBulletLayout());
			const labels = $$.$el.bullet.selectAll(`.${$BULLET.bulletAxis} .tick text`).nodes()
				.map(n => n.textContent);

			expect(labels).to.deep.equal(axis.ticks.map(axis.format));
		});
	});

	describe("bullet range band colors from the theme", () => {
		const bands = () => chart.internal.$el.bullet.select(`.${$BULLET.chartBullet}`)
			.selectAll(`.${$BULLET.bulletRange}`).nodes();
		// the bands are drawn from the largest to the smallest
		const fills = () => bands().map(node => getComputedStyle(node).fill);

		beforeAll(() => {
			args = {
				data: {columns: [["data1", 30]], type: "bullet"},
				bullet: {ranges: [40, 70, 100]}
			};
		});

		it("should leave the default colors to the stylesheet", () => {
			bands().forEach(node => {
				expect(node.style.fill).to.be.equal("");
				expect(node.style.getPropertyValue("--bb-t")).to.not.be.equal("");
			});

			// the smallest band is the darkest: hsl(0, 0%, 55%) ~ hsl(0, 0%, 90%)
			expect(fills()).to.deep.equal(["rgb(230, 230, 230)", "rgb(185, 185, 185)", "rgb(140, 140, 140)"]);
		});

		it("should follow the theme variables", () => {
			chart.internal.$el.bullet
				.style("--bb-bullet-range-min", "20%")
				.style("--bb-bullet-range-max", "40%");

			expect(fills()).to.deep.equal(["rgb(102, 102, 102)", "rgb(77, 77, 77)", "rgb(51, 51, 51)"]);
		});

		it("should use bullet.range.colors instead of the theme", () => {
			chart.config("bullet.range.colors", ["#ff0000", "#00ff00", "#0000ff"], true);

			bands().forEach(node => {
				expect(node.style.fill).to.not.be.equal("");
				expect(node.style.getPropertyValue("--bb-t")).to.be.equal("");
			});
			expect(fills()).to.deep.equal(["rgb(0, 0, 255)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]);
		});

		it("should return to the theme when bullet.range.colors is removed", () => {
			chart.config("bullet.range.colors", ["#ff0000", "#00ff00", "#0000ff"], true);
			chart.config("bullet.range.colors", null, true);

			bands().forEach(node => {
				expect(node.style.fill).to.be.equal("");
				expect(node.style.getPropertyValue("--bb-t")).to.not.be.equal("");
			});
			expect(fills()).to.deep.equal(["rgb(230, 230, 230)", "rgb(185, 185, 185)", "rgb(140, 140, 140)"]);
		});
	});

	describe("bullet is a custom type for the shared code", () => {
		it("should set the custom type only for a bullet chart", () => {
			expect(util.generate({data: {columns: [["data1", 1]], type: "bullet"}}).internal.state.customType)
				.to.be.equal("bullet");

			// (funnel is a custom type of its own module as well: see custom-type-spec)
			["line", "bar", "pie"].forEach(type => {
				const $$ = util.generate({data: {columns: [["data1", 1]], type}}).internal;

				expect($$.state.customType, type).to.be.null;
				expect($$.getCustomTypeHooks({id: "data1"}), type).to.be.null;
			});
		});

		it("should hand the shared code the hooks of its module", () => {
			const $$ = util.generate({data: {columns: [["data1", 1]], type: "bullet"}}).internal;

			expect($$.getCustomTypeHooks({id: "data1"})).to.be.equal($$.customTypeHooks);
			["textAnchor", "textX", "textY", "labelData", "labelFormat", "tooltipTarget"].forEach(name => {
				expect($$.customTypeHooks[name], name).to.be.a("function");
			});
		});

		it("should accept the type name of the custom type as a valid chart type", () => {
			const bulletChart = util.generate({data: {columns: [["data1", 1]], type: "bullet"}}).internal;
			const lineChart = util.generate({data: {columns: [["data1", 1]]}}).internal;

			expect(bulletChart.isValidChartType("bullet")).to.be.true;
			// it is not a built in type: another chart does not know it
			expect(lineChart.isValidChartType("bullet")).to.be.false;
			expect(lineChart.isValidChartType("bar")).to.be.true;
		});
	});

	describe("bullet regressions", () => {
		it("should keep the measure above the ranges when the range count grows", async () => {
			let count = 3;
			const c = util.generate({
				data: {columns: [["data1", 30]], type: "bullet"},
				bullet: {ranges: () => (count === 3 ? [20, 40, 60] : [10, 20, 40, 60])}
			});

			count = 4;
			c.load({columns: [["data1", 35]]});
			await new Promise(r => setTimeout(r, 600));

			const kids = Array.from(c.$.main.select(`.${$BULLET.chartBullet}`).node().children)
				.map((el: any) => el.getAttribute("class"));
			const isRange = kids.map(v => v.indexOf($BULLET.bulletRange) > -1);

			expect(isRange.filter(Boolean).length).to.be.equal(4);
			expect(isRange.lastIndexOf(true)).to.be.below(
				kids.findIndex(v => v.indexOf($BULLET.bulletMeasure) > -1)
			);
		});

		[false, true].forEach(rotated => {
			it(`should not draw a negative size for a negative value (rotated=${rotated})`, () => {
				const c = util.generate({
					data: {columns: [["data1", -20]], type: "bullet"},
					bullet: {ranges: [50, 75, 100], rotated}
				});
				const measure = c.$.main.select(`.${$BULLET.bulletMeasure}`);

				expect(+measure.attr("width")).to.be.at.least(0);
				expect(+measure.attr("height")).to.be.at.least(0);
			});
		});

		it("should show the tooltip of the row at the given index by tooltip.show({index})", () => {
			const c = util.generate({
				data: {columns: [["data1", 30], ["data2", 45]], type: "bullet"}
			});

			c.tooltip.show({index: 1});

			expect(c.$.tooltip.style("display")).to.not.be.equal("none");
			expect(c.$.tooltip.text()).to.contain("data2");
			expect(c.$.tooltip.text()).to.not.contain("data1");
		});
	});

	describe("bullet with negative values", () => {
		const gen = (columns, extra = {}) => util.generate({
			data: {columns, type: "bullet", labels: true},
			bullet: {ranges: [50, 75, 100], ...extra}
		});
		const geometry = c => {
			const $$ = c.internal;
			const layout = $$.getBulletLayout();
			const row = layout.rows[0];

			return {layout, row, geom: $$.getBulletRowGeometry(row, layout)};
		};

		it("should include 0 in the domain, and keep 0 as the min for positive values", () => {
			expect(geometry(gen([["data1", -20]])).row.domainMin).to.be.equal(-20);
			expect(geometry(gen([["data1", 30]])).row.domainMin).to.be.equal(0);
		});

		it("should draw the measure from the zero position toward the value", () => {
			const {layout, geom} = geometry(gen([["data1", -20]]));
			const zero = 20 / 120 * layout.axisLen;

			expect(geom.measure.x).to.be.closeTo(0, 0.01);
			expect(geom.measure.width).to.be.closeTo(zero, 0.01);
		});

		it("should draw a positive value from the zero position when the domain has negatives", () => {
			const {layout, geom} = geometry(gen([["data1", 60]], {target: -10}));
			const zero = 10 / 110 * layout.axisLen;

			expect(geom.measure.x).to.be.closeTo(zero, 0.01);
			expect(geom.measure.width).to.be.closeTo(60 / 110 * layout.axisLen, 0.01);
		});

		it("should draw upward from the zero position when rotated", () => {
			const {layout, geom} = geometry(gen([["data1", -20]], {rotated: true}));
			const zero = 20 / 120 * layout.axisLen;

			// the negative value ends at the bottom, the bar goes down from the zero position
			expect(geom.measure.y).to.be.closeTo(layout.area.height - zero, 0.01);
			expect(geom.measure.height).to.be.closeTo(zero, 0.01);
		});

		it("should handle values that are all negative", () => {
			const {layout, geom} = geometry(gen([["data1", -20]], {ranges: null}));

			// the domain is [-20, 0]: the zero position is the end of the axis
			expect(geom.measure.x).to.be.closeTo(0, 0.01);
			expect(geom.measure.width).to.be.closeTo(layout.axisLen, 0.01);
		});

		it("should generate the default ranges from the whole domain", () => {
			const {row} = geometry(gen([["data1", 80]], {ranges: null, target: -20}));

			expect(row.ranges).to.deep.equal([-20 + 100 * 0.5, -20 + 100 * 0.75, 80]);
		});

		it("should draw the axis over the negative domain", () => {
			const c = gen([["data1", -20]]);
			const ticks = c.$.main.selectAll(`.${$BULLET.bulletAxis} .tick text`).nodes()
				.map((el: any) => el.textContent);

			expect(ticks.some(v => /^[-\u2212]/.test(v))).to.be.true;
			expect(ticks).to.include("0");
		});

		it("should place the label of a negative value at the zero position", () => {
			const {layout, geom} = geometry(gen([["data1", -20]]));

			// the measure can end at the edge of the plot, where the label would not fit
			expect(geom.label.x).to.be.closeTo(20 / 120 * layout.axisLen + 5, 0.01);
		});

		it("should keep room for the label of values that are all negative", () => {
			const width = (columns, extra) => geometry(gen(columns, extra)).layout.area.width;

			// the bar of 20 ends before the end of the axis (100): its label has room
			expect(width([["data1", -20]], {ranges: null})).to.be.below(width([["data1", 20]], {}));
		});

		it("should keep room for the label of a bar that ends at the end of the axis", () => {
			const width = (columns, extra) => geometry(gen(columns, extra)).layout.area.width;

			// no ranges: the value is the end of the scale, as the default ranges follow it
			expect(width([["data1", 275]], {ranges: null})).to.be.below(width([["data1", 275]], {ranges: [300]}));
			expect(width([["data1", 300]], {ranges: [300]})).to.be.below(width([["data1", 275]], {ranges: [300]}));
		});

		it("should place the label of a negative value above the zero position when rotated", () => {
			const {layout, geom} = geometry(gen([["data1", -20]], {rotated: true}));

			expect(geom.label.y).to.be.closeTo(layout.area.height - 20 / 120 * layout.axisLen - 6, 0.01);
		});
	});

	describe("bullet multiple targets", () => {
		const gen = (target, columns = [["data1", 30], ["data2", 20]], extra = {}) => util.generate({
			data: {columns, type: "bullet"},
			bullet: {ranges: [100], target, ...extra}
		});
		const countPerRow = c => c.$.main.selectAll(`.${$BULLET.chartBullet}`).nodes()
			.map((g: any) => g.querySelectorAll(`.${$BULLET.bulletTarget}`).length);

		it("should draw a marker for each value of an array shared by the rows", () => {
			const c = gen([60, 80]);

			expect(countPerRow(c)).to.deep.equal([2, 2]);

			const {targets} = c.internal.getBulletRowGeometry(
				c.internal.getBulletData()[0], c.internal.getBulletLayout());

			expect(targets.length).to.be.equal(2);
			expect(targets[1].x1).to.be.above(targets[0].x1);
		});

		it("should accept an array for the id of an object, or from a function", () => {
			expect(countPerRow(gen({data1: [60, 80], data2: 50}))).to.deep.equal([2, 1]);
			expect(countPerRow(gen((id, value) => id === "data1" ? [value, 70, 90] : value)))
				.to.deep.equal([3, 1]);
		});

		it("should ignore values that are not numbers in the array", () => {
			expect(countPerRow(gen([60, null, "x", 80]))).to.deep.equal([2, 2]);
		});

		it("should include every target in the domain", () => {
			const c = gen([40, 150], [["data1", 30]], {ranges: null});

			expect(c.internal.getBulletData()[0].domainMax).to.be.equal(150);
		});

		it("should keep the single value forms as they were", () => {
			expect(countPerRow(gen(60))).to.deep.equal([1, 1]);
			expect(countPerRow(gen({data1: 60}))).to.deep.equal([1, 0]);
			expect(countPerRow(gen(null))).to.deep.equal([0, 0]);
		});

		it("should add and remove the markers in place on redraw", () => {
			const c = gen([60, 80]);
			const first = c.$.main.select(`.${$BULLET.bulletTarget}`).node();

			c.config("bullet.target", [60, 80, 90], true);
			expect(countPerRow(c)).to.deep.equal([3, 3]);
			expect(c.$.main.select(`.${$BULLET.bulletTarget}`).node()).to.be.equal(first);

			c.config("bullet.target", 70, true);
			expect(countPerRow(c)).to.deep.equal([1, 1]);
			expect(c.$.main.select(`.${$BULLET.bulletTarget}`).node()).to.be.equal(first);
		});

		it("should keep the markers paint order: below the axis, above the measure", () => {
			const c = gen([60, 80]);
			const kids = Array.from(c.$.main.select(`.${$BULLET.chartBullet}`).node().children)
				.map((el: any) => el.getAttribute("class"));
			const idx = name => kids.map(k => k.indexOf(name) > -1);

			expect(idx($BULLET.bulletTarget).lastIndexOf(true)).to.be.below(kids.findIndex(
				k => k.indexOf($BULLET.bulletAxis) > -1));
			expect(idx($BULLET.bulletMeasure).lastIndexOf(true)).to.be.below(
				idx($BULLET.bulletTarget).indexOf(true));
		});

		it("should show the tooltip of the row from any of its markers", () => {
			const c = gen([60, 80]);
			const markers = c.$.main.select(`.${$BULLET.chartBullet}`)
				.selectAll(`.${$BULLET.bulletTarget}`).nodes();

			markers.forEach((el: any) => {
				expect(el.__data__.id).to.be.equal("data1");
			});
		});
	});

	describe("bullet axis min, max and ticks", () => {
		const gen = (axis, columns = [["data1", 30], ["data2", 80]], extra = {}) => util.generate({
			data: {columns, type: "bullet"},
			bullet: {axis, ...extra}
		});
		const rowOf = (c, i = 0) => {
			const $$ = c.internal;
			const layout = $$.getBulletLayout();
			const row = layout.rows[i];

			return {layout, row, geom: $$.getBulletRowGeometry(row, layout)};
		};
		const tickTexts = (c, i = 0) => c.$.main.selectAll(`.${$BULLET.chartBullet}`).filter((d, j) => j === i)
			.selectAll(".tick text").nodes().map((el: any) => el.textContent);

		it("should keep the scale of each bullet when min and max are not given", () => {
			const c = gen({});

			expect(rowOf(c, 0).row.domainMax).to.be.equal(30);
			expect(rowOf(c, 1).row.domainMax).to.be.equal(80);
		});

		it("should share the scale between the bullets when min and max are given", () => {
			const c = gen({min: -20, max: 100});

			[0, 1].forEach(i => {
				expect(rowOf(c, i).row.domainMin).to.be.equal(-20);
				expect(rowOf(c, i).row.domainMax).to.be.equal(100);
			});
			expect(rowOf(c, 0).geom.axis.ticks).to.deep.equal(rowOf(c, 1).geom.axis.ticks);
		});

		it("should draw a value above max up to the end of the axis", () => {
			const {layout, geom} = rowOf(gen({max: 100}, [["data1", 150]]));

			expect(geom.measure.x).to.be.closeTo(0, 0.01);
			expect(geom.measure.width).to.be.closeTo(layout.axisLen, 0.01);
		});

		it("should not draw a target out of the scale", () => {
			const {geom} = rowOf(gen({max: 100}, [["data1", 30]], {target: [50, 120]}));

			expect(geom.targets.length).to.be.equal(1);
		});

		it("should draw the measure from the nearest end of the axis when 0 is not in the scale", () => {
			const {layout, geom} = rowOf(gen({min: 50, max: 100}, [["data1", 80]]));

			expect(geom.measure.x).to.be.closeTo(0, 0.01);
			expect(geom.measure.width).to.be.closeTo(30 / 50 * layout.axisLen, 0.01);
		});

		it("should keep room for the label of a value above max", () => {
			const width = columns => rowOf(util.generate({
				data: {columns, type: "bullet", labels: true},
				bullet: {axis: {max: 100}}
			})).layout.area.width;

			expect(width([["data1", 150]])).to.be.below(width([["data1", 50]]));
		});

		it("should ignore min and max that do not make a range", () => {
			const {row} = rowOf(gen({min: 100, max: 50}, [["data1", 30]]));

			expect(row.domainMin).to.be.equal(0);
			expect(row.domainMax).to.be.equal(30);
		});

		it("should generate the default ranges from the given scale", () => {
			const {row} = rowOf(gen({min: 0, max: 200}, [["data1", 30]], {ranges: null}));

			expect(row.ranges).to.deep.equal([100, 150, 200]);
		});

		it("should use the tick count as a hint", () => {
			const auto = rowOf(gen({})).geom.axis.ticks.length;
			const few = rowOf(gen({tick: {count: 2}})).geom.axis.ticks.length;

			expect(few).to.be.below(auto);
		});

		it("should draw the given tick values that are in the scale", () => {
			const c = gen({max: 100, tick: {values: [0, 25, 100, 400]}});

			expect(rowOf(c).geom.axis.ticks).to.deep.equal([0, 25, 100]);
			expect(tickTexts(c)).to.deep.equal(["0", "25", "100"]);
		});

		it("should format the tick labels, and redraw them when the format changes", () => {
			const c = gen({tick: {format: v => `${v}%`}});

			expect(tickTexts(c).length).to.be.above(0);
			expect(tickTexts(c).every(v => /%$/.test(v))).to.be.true;

			c.config("bullet.axis.tick.format", v => `${v}#`, true);

			expect(tickTexts(c).every(v => /#$/.test(v))).to.be.true;
		});

		it("should apply the tick options when rotated", () => {
			const c = gen({tick: {values: [0, 10], format: v => `<${v}>`}}, [["data1", 30]], {rotated: true});

			expect(tickTexts(c)).to.deep.equal(["<0>", "<10>"]);
		});
	});

	describe("bullet row titles", () => {
		const gen = (title, extra = {}, data = {}) => util.generate({
			data: {columns: [["data1", 30], ["data2", 80]], type: "bullet", ...data},
			bullet: {title, ...extra}
		});
		const titles = c => c.$.main.selectAll(`.${$BULLET.bulletTitle}`).nodes()
			.map((el: any) => el.textContent);

		it("should not draw the titles by default", () => {
			expect(titles(gen(undefined))).to.deep.equal([]);
			expect(titles(gen({show: false}))).to.deep.equal([]);
		});

		it("should draw the id of each row, or its data name", () => {
			expect(titles(gen({show: true}))).to.deep.equal(["data1", "data2"]);
			expect(titles(gen({show: true}, {}, {names: {data1: "Name One"}})))
				.to.deep.equal(["Name One", "data2"]);
		});

		it("should draw the text given by an object or a function", () => {
			expect(titles(gen({show: true, text: {data1: "A"}}))).to.deep.equal(["A", "data2"]);
			expect(titles(gen({show: true, text: (id, value) => `${id}:${value}`})))
				.to.deep.equal(["data1:30", "data2:80"]);
		});

		it("should keep the room for the titles beside the plot, and draw them clear of it", () => {
			const base = gen(undefined).internal.getBulletLayout();
			const c = gen({show: true});
			const layout = c.internal.getBulletLayout();
			const {title} = c.internal.getBulletRowGeometry(layout.rows[0], layout);

			expect(layout.area.left).to.be.above(base.area.left);
			expect(layout.area.width).to.be.below(base.area.width);
			// the title ends before the first tick label of the axis
			expect(layout.area.left + title.x).to.be.at.least(0);
			expect(title.anchor).to.be.equal("end");
			expect(title.x).to.be.below(0);
		});

		it("should keep the room under the columns when rotated", () => {
			const base = gen(undefined, {rotated: true}).internal.getBulletLayout();
			const c = gen({show: true}, {rotated: true});
			const layout = c.internal.getBulletLayout();
			const {title} = c.internal.getBulletRowGeometry(layout.rows[0], layout);

			expect(layout.area.height).to.be.below(base.area.height);
			expect(layout.area.width).to.be.equal(base.area.width);
			expect(title.anchor).to.be.equal("middle");
			expect(title.y).to.be.above(layout.area.height);
		});

		it("should hide the title with its row", () => {
			const c = gen({show: true});
			const title = c.$.main.select(`.${$BULLET.bulletTitle}`).node();

			// hiding the data hides the group of the row: the title is in it
			expect(title.parentNode.getAttribute("class")).to.include("bb-target-data1");
		});

		it("should update and remove the titles in place on redraw", () => {
			const c = gen({show: true});
			const first = c.$.main.select(`.${$BULLET.bulletTitle}`).node();

			c.config("bullet.title.text", {data1: "Changed"}, true);

			expect(titles(c)).to.deep.equal(["Changed", "data2"]);
			expect(c.$.main.select(`.${$BULLET.bulletTitle}`).node()).to.be.equal(first);

			c.config("bullet.title.show", false, true);

			expect(titles(c)).to.deep.equal([]);
		});

		it("should not move the plot when the titles are not shown", () => {
			const a = gen(undefined).internal.getBulletLayout().area;
			const b = gen({show: false, text: {data1: "x"}}).internal.getBulletLayout().area;

			expect(b).to.deep.equal(a);
		});
	});

	describe("bullet click event", () => {
		const gen = (extra = {}, data = {}) => {
			const calls: any[] = [];
			const c = util.generate({
				data: {
					columns: [["data1", 30], ["data2", 45]],
					type: "bullet",
					onclick: (d, el) => calls.push([d.id, d.value, el.tagName, el.getAttribute("class")]),
					...data
				},
				bullet: {ranges: [100], target: 60},
				...extra
			});

			return {c, calls};
		};
		const click = el => el.dispatchEvent(new MouseEvent("click", {bubbles: true}));

		it("should call data.onclick with the row and the clicked element", () => {
			const {c, calls} = gen();
			const row = c.$.main.select(`.${$BULLET.chartBullet}.bb-target-data2`);

			click(row.select(`.${$BULLET.bulletMeasure}`).node());
			click(row.select(`.${$BULLET.bulletTarget}`).node());

			expect(calls.map(v => v.slice(0, 3))).to.deep.equal([
				["data2", 45, "rect"],
				["data2", 45, "line"]
			]);
		});

		it("should not call data.onclick from a range band", () => {
			const {c, calls} = gen();

			click(c.$.main.select(`.${$BULLET.bulletRange}`).node());

			expect(calls).to.deep.equal([]);
		});

		it("should call data.onclick from the dot measure", () => {
			const {c, calls} = gen({bullet: {type: "dot", ranges: [100]}});

			click(c.$.main.select(`.${$BULLET.bulletMeasure}`).node());

			expect(calls.map(v => v.slice(0, 3))).to.deep.equal([["data1", 30, "circle"]]);
		});

		it("should call it with the chart as this", () => {
			let self;
			const c = util.generate({
				data: {columns: [["data1", 30]], type: "bullet", onclick() { self = this; }},
				bullet: {ranges: [100]}
			});

			click(c.$.main.select(`.${$BULLET.bulletMeasure}`).node());

			expect(self).to.be.equal(c);
		});

		it("should not call data.onclick when interaction is disabled", () => {
			const {c, calls} = gen({interaction: {enabled: false}});

			click(c.$.main.select(`.${$BULLET.bulletMeasure}`).node());

			expect(calls).to.deep.equal([]);
		});
	});

	describe("bullet title style and long titles", () => {
		const themes = {
			base: baseScss,
			dark: darkScss,
			datalab: datalabScss,
			graph: graphScss,
			insight: insightScss,
			modern: modernScss
		};

		Object.keys(themes).forEach(name => {
			it(`should style the title like the axis text in the ${name} theme`, () => {
				const css = themes[name];
				const title = /\.bb-bullet-title\s*\{[^}]*?fill:\s*([^;]+);/.exec(css)?.[1];
				const axis = /\.bb-bullet-axis\s*\{[\s\S]*?text\s*\{\s*fill:\s*([^;]+);/.exec(css)?.[1];

				expect(title, "the title is styled").to.be.a("string");
				expect(title).to.be.equal(axis);
			});
		});

		it("should follow the stylesheet for the color and the size of the title", () => {
			const style = document.createElement("style");

			style.textContent = ".bb-chart-bullets .bb-bullet-title { fill: #ff0000; font-size: 14px; }";
			document.head.appendChild(style);

			try {
				const gen = text => util.generate({
					data: {columns: [["data1", 30]], type: "bullet"},
					bullet: {title: {show: true, text: {data1: text}}}
				});
				const c = gen("Title");
				const node = c.$.main.select(`.${$BULLET.bulletTitle}`).node();

				expect(getComputedStyle(node).fill).to.be.equal("rgb(255, 0, 0)");
				expect(getComputedStyle(node).fontSize).to.be.equal("14px");

				// the room for the title is measured with the same size
				const wide = c.internal.getBulletLayout().area.left;

				style.textContent = ".bb-chart-bullets .bb-bullet-title { font-size: 11px; }";

				expect(gen("Title").internal.getBulletLayout().area.left).to.be.below(wide);
			} finally {
				style.remove();
			}
		});

		it("should not break the layout with a very long title", () => {
			const c = util.generate({
				data: {columns: [["data1", 30], ["data2", 20]], type: "bullet"},
				bullet: {title: {show: true, text: {data1: "x".repeat(300)}}}
			});
			const layout = c.internal.getBulletLayout();
			const {measure} = c.internal.getBulletRowGeometry(layout.rows[0], layout);

			// there is no room left for the plot: it is empty, and not negative
			expect(layout.area.width).to.be.equal(0);
			expect(measure.width).to.be.equal(0);
			expect(c.$.main.selectAll(`.${$BULLET.bulletTitle}`).size()).to.be.equal(2);
		});
	});

	describe("bullet color by value", () => {
		// the legend asks the color of the id: a string without a value
		const color = (c, d) => d.value === undefined ? c : (d.value >= 50 ? "#2ca02c" : "#d62728");

		it("should color the measure by the data.color callback with the row", () => {
			const c = util.generate({
				data: {columns: [["data1", 30], ["data2", 80]], type: "bullet", color},
				bullet: {ranges: [100]}
			});
			const $$ = c.internal;
			const layout = $$.getBulletLayout();

			// the geometry is shared by the SVG and the canvas renderer
			expect(layout.rows.map(d => $$.getBulletRowGeometry(d, layout).color))
				.to.deep.equal(["#d62728", "#2ca02c"]);
			expect(c.$.main.selectAll(`.${$BULLET.bulletMeasure}`).nodes()
				.map((el: any) => getComputedStyle(el).fill))
				.to.deep.equal(["rgb(214, 39, 40)", "rgb(44, 160, 44)"]);
		});

		it("should keep the series color for the legend", () => {
			const c = util.generate({
				data: {columns: [["data1", 30]], type: "bullet", color, colors: {data1: "#0000ff"}},
				bullet: {ranges: [100]}
			});
			const tile = c.$.legend.select(".bb-legend-item-tile").node() as Element;

			expect(getComputedStyle(tile).stroke).to.be.equal("rgb(0, 0, 255)");
		});

		it("should follow the value when the data is loaded", () => {
			const c = util.generate({
				data: {columns: [["data1", 30]], type: "bullet", color},
				bullet: {ranges: [100]}
			});

			c.load({columns: [["data1", 90]]});

			const $$ = c.internal;
			const layout = $$.getBulletLayout();

			expect($$.getBulletRowGeometry(layout.rows[0], layout).color).to.be.equal("#2ca02c");
		});
	});

	describe("bullet input that can not be drawn or is too much", () => {
		const gen = (bullet, columns = [["data1", 30], ["data2", 50]], data = {}) => util.generate({
			data: {columns, type: "bullet", ...data},
			bullet
		});
		const widths = c => c.$.main.selectAll(`.${$BULLET.bulletMeasure}`).nodes()
			.map((el: any) => +el.getAttribute("width"));
		const allFinite = c => widths(c).every(Number.isFinite);

		it("should ignore a target that is NaN or Infinity", () => {
			[NaN, Infinity, -Infinity, [NaN, 60, Infinity]].forEach(target => {
				const c = gen({ranges: [100], target});

				expect(allFinite(c), String(target)).to.be.true;
			});
			expect(c => c).to.be.a("function");
		});

		it("should keep the other targets, and the other rows", () => {
			const c = gen({ranges: [100], target: (id) => id === "data1" ? NaN : [60, NaN]});
			const rows = c.internal.getBulletData();

			expect(rows.map(d => d.targets)).to.deep.equal([[], [60]]);
			expect(allFinite(c)).to.be.true;
		});

		it("should ignore the ranges that are not finite", () => {
			const c = gen({ranges: [NaN, 50, Infinity, 20]});

			expect(c.internal.getBulletData()[0].ranges).to.deep.equal([20, 50]);
			expect(allFinite(c)).to.be.true;
		});

		it("should ignore the axis min and max that are not finite", () => {
			[NaN, Infinity, -Infinity].forEach(v => {
				const c = gen({ranges: [100], axis: {min: v, max: v}});
				const row = c.internal.getBulletData()[0];

				expect([row.domainMin, row.domainMax], String(v)).to.deep.equal([0, 100]);
				expect(allFinite(c)).to.be.true;
			});
		});

		it("should draw a value that is Infinity as 0", () => {
			const c = gen({ranges: [100]}, [["data1", Infinity], ["data2", 50]]);

			expect(c.internal.getBulletData()[0].value).to.be.equal(0);
			expect(allFinite(c)).to.be.true;
		});

		it("should drop the tick values that are not finite", () => {
			const c = gen({ranges: [100], axis: {tick: {values: [0, NaN, 50, Infinity]}}});
			const $$ = c.internal;
			const layout = $$.getBulletLayout();

			expect($$.getBulletRowGeometry(layout.rows[0], layout).axis.ticks).to.deep.equal([0, 50]);
		});

		it("should use the title text of the id itself, not of Object.prototype", () => {
			const title = (id, extra = {}, data = {}) => util.generate({
				data: {columns: [[id, 30]], type: "bullet", ...data},
				bullet: {title: {show: true, ...extra}}
			}).$.main.select(`.${$BULLET.bulletTitle}`).node().textContent;

			["constructor", "toString", "hasOwnProperty"].forEach(id => {
				expect(title(id, {text: {other: "x"}}), id).to.be.equal(id);
				expect(title(id, {}, {names: {other: "x"}}), id).to.be.equal(id);
			});
			// the own key still works (the config drops a key named "constructor" by itself)
			expect(title("toString", {text: {toString: "Own"}})).to.be.equal("Own");
			expect(title("toString", {}, {names: {toString: "Name"}})).to.be.equal("Name");
		});

		it("should not break with more values than the arguments of a function", () => {
			const c = gen({ranges: [100]});
			const $$ = c.internal;

			$$.config.bullet_ranges = new Array(200000).fill(50);
			$$.config.bullet_target = new Array(200000).fill(70);

			expect(() => $$.getBulletData()).to.not.throw();
			expect($$.getBulletData()[0].domainMax).to.be.equal(70);
		});

		it("should not make more ticks than the pixels of the axis", () => {
			const c = gen({ranges: [100]});
			const $$ = c.internal;

			$$.config.bullet_axis_tick_count = 1e6;

			const layout = $$.getBulletLayout();
			const {axis} = $$.getBulletRowGeometry(layout.rows[0], layout);

			expect(axis.ticks.length).to.be.at.most(layout.axisLen);
		});

		it("should get the rows once to lay out, so the callbacks are called once for a row", () => {
			let calls = 0;
			const c = gen({
				ranges: () => { calls++; return [100]; },
				title: {show: true}
			}, [["data1", 30], ["data2", 50], ["data3", 70]], {labels: true});

			calls = 0;
			c.internal.getBulletLayout();

			expect(calls).to.be.equal(3);
		});

		it("should make the labels of an axis once for the rows that share it", () => {
			let calls = 0;
			const columns = Array.from({length: 20}, (_, i) => [`d${i}`, 10 + i]);
			const c = gen({
				ranges: [100],
				axis: {tick: {format: v => { calls++; return v; }}}
			}, columns);
			const $$ = c.internal;

			calls = 0;

			const layout = $$.getBulletLayout();
			const ticks = layout.rows.map(d => $$.getBulletRowGeometry(d, layout).axis.ticks.length);

			// one call for each tick of the one axis, and not of each row
			expect(new Set(ticks).size).to.be.equal(1);
			expect(calls).to.be.equal(ticks[0]);
		});
	});
});
