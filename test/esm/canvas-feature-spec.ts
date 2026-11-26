/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// the canvas drawing of grid, flow and subchart is carried by the module of the feature only
import {afterEach, describe, expect, it, vi} from "vitest";
import {bb, canvas, flow, grid, line, selection, subchart} from "../../src/index.canvas";
import {grid as svgGrid, selection as svgSelection, subchart as svgSubchart} from "../../src/index.esm";
import ChartInternal from "../../src/ChartInternal/ChartInternal";

describe("ESM canvas feature modules", () => {
	let chart;
	let container;

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
	});

	function generate(options = {}) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			size: {width: 320, height: 240},
			render: {mode: canvas()},
			data: {columns: [["data1", 30, 200, 100, 400]], type: line()},
			...options
		}));
	}

	it("should carry no canvas code of the features until their modules are called", () => {
		// (this is the first test of this file: the page has the modules that were called by it only)
		const proto: any = ChartInternal.prototype;

		expect(proto.canvasFeatures?.grid).to.be.undefined;
		expect(proto.canvasFeatures?.subchart).to.be.undefined;
		expect(proto.animateCanvasFlow).to.be.undefined;
		expect(proto.startCanvasSubchartBrush).to.be.undefined;
		expect(proto.canvasFeatures?.selection).to.be.undefined;
		expect(proto.setCanvasSelection).to.be.undefined;
	});

	it("should warn when a feature is imported from the svg entry only", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

		svgGrid();
		svgSubchart();
		svgSelection();

		generate({
			grid: {x: {show: true}},
			subchart: {show: true},
			data: {columns: [["data1", 30, 200, 100]], type: line(), selection: {enabled: true}}
		});

		const messages = warn.mock.calls.map(c => String(c[0]));

		warn.mockRestore();

		["grid", "subchart", "selection"].forEach(name =>
			expect(messages.some(m => m.includes(`${name} is not drawn`))).to.be.true
		);
	});

	it("should handle pointer input and drawing of a chart without the feature modules", () => {
		const errors = [];
		const onError = e => errors.push(e);

		window.addEventListener("error", onError);

		const canvasEl = generate().$.canvas.node();
		const rect = canvasEl.getBoundingClientRect();
		const init = {clientX: rect.left + 100, clientY: rect.top + 100, bubbles: true};

		["mousedown", "mousemove", "mouseup", "mouseleave", "click"].forEach(type =>
			canvasEl.dispatchEvent(new MouseEvent(type, init))
		);
		["pointerdown", "pointermove", "pointerup", "pointercancel", "pointerleave"].forEach(type =>
			canvasEl.dispatchEvent(new PointerEvent(type, {...init, pointerId: 1}))
		);
		chart.resize({width: 300, height: 200});

		window.removeEventListener("error", onError);

		expect(errors.length).to.be.equal(0);
	});

	it("should add the canvas code of a feature when its module is called", () => {
		const proto: any = ChartInternal.prototype;

		grid();
		subchart();
		flow();
		selection();

		expect(proto.canvasFeatures.grid.draw).to.be.a("function");
		expect(proto.canvasFeatures.subchart.draw).to.be.a("function");
		expect(proto.animateCanvasFlow).to.be.a("function");
		expect(proto.startCanvasSubchartBrush).to.be.a("function");
		expect(proto.canvasFeatures.selection.draw).to.be.a("function");
		expect(proto.setCanvasSelection).to.be.a("function");
	});
});
