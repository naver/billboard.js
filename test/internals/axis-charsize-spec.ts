/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {select as d3Select} from "d3-selection";
import util from "../assets/util";
import AxisRendererHelper from "../../src/ChartInternal/Axis/AxisRendererHelper";

describe("AXIS: size of one character", () => {
	let svg;
	const makeHelper = chart => new AxisRendererHelper({
		config: {},
		params: {owner: chart, config: {transition_duration: 0}}
	} as any);
	const addText = (count = 3) => {
		const g = svg.append("g");

		return g.selectAll("text").data(Array.from({length: count}, (_, i) => i))
			.enter().append("text").text("tick");
	};

	beforeEach(() => {
		svg = d3Select(document.body).append("svg").style("font-size", "12px");
	});

	afterEach(() => svg.remove());

	it("measures a character and empties every text", () => {
		const text = addText();
		const size = makeHelper({}).getSizeFor1Char("bottom", text, false);

		expect(size.w).toBeGreaterThan(0);
		expect(size.h).toBeGreaterThan(0);
		expect(text.nodes().every(n => n.textContent === "")).toBe(true);
	});

	it("measures only once per chart and font, and still empties every text", () => {
		const chart = {};
		const first = makeHelper(chart).getSizeFor1Char("bottom", addText(), false);
		const text = addText();
		let measured = 0;
		const org = SVGGraphicsElement.prototype.getBBox;

		SVGGraphicsElement.prototype.getBBox = function(...a) {
			measured++;

			return org.apply(this, a);
		};

		try {
			// a new renderer is made per redraw, so the helper is new but the chart is the same
			const second = makeHelper(chart).getSizeFor1Char("bottom", text, false);

			expect(measured).toBe(0);
			expect(second).toEqual(first);
			expect(text.nodes().every(n => n.textContent === "")).toBe(true);
		} finally {
			SVGGraphicsElement.prototype.getBBox = org;
		}
	});

	it("measures again when the font changes", () => {
		const chart = {};
		const small = makeHelper(chart).getSizeFor1Char("bottom", addText(), false);

		svg.style("font-size", "30px");

		const big = makeHelper(chart).getSizeFor1Char("bottom", addText(), false);

		expect(big.w).toBeGreaterThan(small.w);
		expect(big.h).toBeGreaterThan(small.h);
	});

	it("doesn't share the size between charts", () => {
		const a = makeHelper({}).getSizeFor1Char("bottom", addText(), false);

		svg.style("font-size", "30px");

		const b = makeHelper({}).getSizeFor1Char("bottom", addText(), false);

		expect(b.w).toBeGreaterThan(a.w);
	});
});

describe("AXIS: tick text on zoom", () => {
	it("doesn't replace the text of ticks that keep their value", async () => {
		const chart = util.generate({
			data: {columns: [["data1", ...Array.from({length: 1000}, (_, i) => i % 50)]]},
			zoom: {enabled: true},
			transition: {duration: 0}
		});
		const root = chart.$.chart.node();
		const ticks = () => root.querySelectorAll(".bb-axis-x .tick text").length;
		let added = 0;
		const observer = new MutationObserver(list => list.forEach(m => {
			m.addedNodes.forEach(n => n.nodeType === 3 && added++);
		}));

		chart.zoom([100, 600]);
		await new Promise(r => setTimeout(r, 30));
		expect(ticks()).toBeGreaterThan(500);

		observer.observe(root, {childList: true, subtree: true});
		chart.zoom([200, 700]);
		await new Promise(r => setTimeout(r, 30));
		observer.takeRecords().forEach(m => m.addedNodes.forEach(n => n.nodeType === 3 && added++));
		observer.disconnect();

		// only the ticks entering the range get a new text node
		expect(added).toBeLessThan(ticks() / 2);
		chart.destroy();
	});
});
