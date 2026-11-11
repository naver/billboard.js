/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// the canvas parts of the types are registered by name, and the parts of the types of a chart are used
import {afterEach, describe, expect, it} from "vitest";
import {bar, bb, canvas, line, treemap} from "../../src/index.canvas";
import ChartInternal from "../../src/ChartInternal/ChartInternal";
import {registerCanvasType} from "../../src/config/resolver/canvasType";

describe("ESM canvas type registry", () => {
	let chart;
	let container;

	afterEach(() => {
		chart?.destroy();
		container?.remove();
		chart = null;
		container = null;
	});

	function generate(options) {
		container = document.createElement("div");
		container.style.cssText = "position:absolute;top:0;left:0;width:320px;height:240px;";
		document.body.appendChild(container);

		return (chart = bb.generate({
			bindto: container,
			size: {width: 320, height: 240},
			render: {mode: canvas()},
			...options
		}));
	}

	it("should have no canvas part of a type until its module is called", () => {
		// (this is the first test of this file: the page has the modules that were called by it only)
		expect((<any>ChartInternal.prototype).canvasTypes?.treemap).to.be.undefined;

		treemap();

		const parts = (<any>ChartInternal.prototype).canvasTypes.treemap;

		expect(parts.exclusive).to.be.true;
		expect(parts.draw).to.be.a("function");
		expect(parts.hits).to.be.a("function");
	});

	it("should use the parts of the type the chart has, and of no other", () => {
		const treemapChart = generate({data: {columns: [["data1", 30], ["data2", 20]], type: treemap()}});

		expect(treemapChart.internal.getCanvasTypeParts().length).to.be.equal(1);
		expect(treemapChart.internal.getCanvasTypeParts()[0].exclusive).to.be.true;

		chart.destroy();
		container.remove();

		const barChart = generate({data: {columns: [["data1", 30]], type: bar()}});

		expect(barChart.internal.getCanvasTypeParts()).to.deep.equal([]);
	});

	it("should keep the parts of the types apart, in the order they were registered", () => {
		const draw = () => {};

		line();
		bar();
		registerCanvasType("bar", {draw});
		registerCanvasType("line", {hits: () => {}});

		const types = (<any>ChartInternal.prototype).canvasTypes;
		const mixed = generate({
			data: {columns: [["a", 1, 2], ["b", 3, 4]], types: {a: "bar", b: "line"}}
		});

		// both of the types of the chart are active: the types that are not in the chart are not
		expect(mixed.internal.getCanvasTypeParts()).to.deep.equal([types.bar, types.line]);
		expect(types.bar.draw).to.be.equal(draw);
		expect(types.treemap.exclusive).to.be.true;
	});

	it("should add to the parts of a name that is registered again", () => {
		const draw = () => {};
		const hits = () => {};

		registerCanvasType("merged", {draw});
		registerCanvasType("merged", {hits});

		const merged = (<any>ChartInternal.prototype).canvasTypes.merged;

		expect(merged.draw).to.be.equal(draw);
		expect(merged.hits).to.be.equal(hits);
	});

	it("should draw a type that is the whole chart by its part alone", () => {
		const chart = generate({data: {columns: [["data1", 30], ["data2", 20]], type: treemap()}});
		const canvasEl = container.querySelector("canvas");
		const {width, height} = canvasEl;
		const data = canvasEl.getContext("2d").getImageData(0, 0, width, height).data;
		let colored = 0;

		for (let i = 0; i < data.length; i += 4) {
			data[i + 3] > 0 && colored++;
		}

		// the tiles are drawn on the surface, and the chart is not left blank
		expect(colored).to.be.above(width * height * 0.5);
		expect(chart.internal.hitDetector.findNearest(20, 20)?.id).to.be.oneOf(["data1", "data2"]);
	});
});
