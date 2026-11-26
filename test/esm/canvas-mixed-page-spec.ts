/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// one page with svg charts (modules of the svg entry) and canvas charts (modules of the canvas entry)
import {afterEach, describe, expect, it} from "vitest";
import * as canvasEntry from "../../src/index.canvas";
import * as svgEntry from "../../src/index.esm";

describe("ESM svg and canvas charts in a page", () => {
	const charts = [];
	const containers = [];

	afterEach(() => {
		charts.splice(0).forEach(c => c.destroy());
		containers.splice(0).forEach(c => c.remove());
	});

	function generate(bb, options) {
		const container = document.createElement("div");

		container.style.cssText = "position:absolute;top:0;left:0;width:400px;height:260px;";
		document.body.appendChild(container);
		containers.push(container);

		const chart = bb.generate({bindto: container, size: {width: 400, height: 260}, ...options});

		charts.push(chart);

		return chart;
	}

	it("should draw both with the feature modules of their own entry", async () => {
		const features = {
			grid: {x: {show: true}, y: {show: true}},
			subchart: {show: true, init_range: [1, 3]}
		};
		const columns = [["data1", 30, 200, 100, 400, 150]];

		[svgEntry, canvasEntry].forEach(entry => {
			entry.grid();
			entry.subchart();
			entry.selection();
		});

		const svg = generate(svgEntry.bb, {
			...features,
			data: {columns, type: svgEntry.line(), selection: {enabled: true}}
		});
		const canvas = generate(canvasEntry.bb, {
			...features,
			render: {mode: canvasEntry.canvas()},
			data: {columns, type: canvasEntry.line(), selection: {enabled: true}}
		});

		await new Promise(r => setTimeout(r, 200));

		// svg chart: drawn by svg, with its grid and subchart, untouched by the canvas parts
		expect(svg.$.main.select(".bb-xgrid").size()).to.be.above(0);
		expect(svg.$.svg.select(".bb-brush").size()).to.be.above(0);
		expect(svg.internal.state.isCanvasMode).to.be.false;
		expect(svg.internal.$el.canvas).to.be.undefined;

		svg.select(["data1"], [1]);
		expect(svg.selected().length).to.be.equal(1);
		expect(svg.$.main.selectAll(".bb-shape._selected_").size()).to.be.equal(1);

		// canvas chart: drawn by canvas
		const data = canvas.$.canvas.node().getContext("2d")
			.getImageData(0, 0, 400, 260).data;

		expect(canvas.internal.state.isCanvasMode).to.be.true;
		expect(data.some(v => v !== 0)).to.be.true;

		canvas.select(["data1"], [2]);
		expect(canvas.selected().length).to.be.equal(1);
		expect(canvas.internal.getCanvasFeature("grid")).to.not.be.undefined;
		expect(canvas.internal.getCanvasFeature("subchart")).to.not.be.undefined;
	});
});
