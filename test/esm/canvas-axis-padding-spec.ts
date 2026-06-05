/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/* global describe, afterEach, it, expect */
import {afterEach, describe, expect, it} from "vitest";
import {$CANVAS} from "../../src/canvas/classes";
import {$LEGEND} from "../../src/config/classes";
import {canvas} from "../../src/index.canvas";
import bb from "../../src/index";

describe("ESM canvas axis padding", function() {
	let charts = [];
	let containers = [];

	afterEach(() => {
		charts.forEach(chart => chart.destroy());
		containers.forEach(container => container.remove());
		charts = [];
		containers = [];
	});

	function generate(options) {
		const container = document.createElement("div");

		container.style.cssText = "position:absolute;top:0;left:0;width:420px;height:300px;";
		document.body.appendChild(container);
		containers.push(container);

		const chart = bb.generate({
			bindto: container,
			size: {
				width: 420,
				height: 300
			},
			data: {
				columns: [
					["data1", 10, 200, 1000, 4000],
					["data2", 1000, 20000, 30000, 40000]
				],
				type: "line",
				axes: {
					data2: "y2"
				}
			},
			axis: {
				y2: {
					show: true
				}
			},
			point: {
				show: false
			},
			transition: {
				duration: 0
			},
			...options
		});

		charts.push(chart);

		return chart;
	}

	function getRelativeRect(element: Element, root: Element) {
		const rect = element.getBoundingClientRect();
		const rootRect = root.getBoundingClientRect();

		return {
			left: rect.left - rootRect.left,
			top: rect.top - rootRect.top,
			right: rect.right - rootRect.left,
			bottom: rect.bottom - rootRect.top,
			width: rect.width,
			height: rect.height
		};
	}

	function expectCloseRect(actual, expected, tolerance = 1) {
		expect(actual.left).to.be.closeTo(expected.left, tolerance);
		expect(actual.top).to.be.closeTo(expected.top, tolerance);
		expect(actual.right).to.be.closeTo(expected.right, tolerance);
		expect(actual.bottom).to.be.closeTo(expected.bottom, tolerance);
		expect(actual.width).to.be.closeTo(expected.width, tolerance);
		expect(actual.height).to.be.closeTo(expected.height, tolerance);
	}

	[
		["bottom legend", {}],
		["right legend", {legend: {position: "right"}}],
		["bottom legend with fit padding", {padding: {mode: "fit"}}],
		["right legend with fit padding", {padding: {mode: "fit"}, legend: {position: "right"}}]
	].forEach(([name, options]) => {
		it(`should align canvas axis padding with SVG ${name} layout`, () => {
			const svgChart = generate(options);
			const canvasChart = generate({
				...options,
				render: {
					mode: canvas()
				}
			});
			const svgState = svgChart.internal.state;
			const canvasState = canvasChart.internal.state;
			const legend = canvasChart.internal.$el.chart.node()
				.querySelector(`.${$CANVAS.legend}`) as HTMLElement;
			const isRightLegend = (options as any).legend?.position === "right";

			expect(canvasState.current.maxTickSize.y.width).to.be.equal(
				svgState.current.maxTickSize.y.width
			);
			expect(canvasState.current.maxTickSize.y2.width).to.be.equal(
				svgState.current.maxTickSize.y2.width
			);
			expect(canvasState.current.maxTickSize.x.height).to.be.equal(
				svgState.current.maxTickSize.x.height
			);
			expect(canvasState.margin.left).to.be.equal(svgState.margin.left);
			expect(canvasState.margin.right).to.be.closeTo(svgState.margin.right, 5);
			expect(canvasState.margin.bottom).to.be.closeTo(svgState.margin.bottom, 5);
			expect(legend).not.to.be.null;

			if (isRightLegend) {
				expect(legend.style.top).to.be.equal(`${canvasState.margin3.top}px`);
				expect(legend.style.bottom).to.be.equal(`${canvasState.margin3.bottom}px`);
				expect(parseFloat(legend.style.width))
					.to.be.closeTo(canvasChart.internal.getLegendWidth(), 0.01);
				expect(parseFloat(canvasChart.internal.$el.chart.style("min-height")))
					.to.be.equal(canvasState.current.height);
			} else {
				expect(legend.style.top).to.be.equal(
					`${canvasState.current.height - canvasChart.internal.getLegendHeight()}px`
				);
				expect(legend.style.bottom).to.be.equal("auto");
				expect(parseFloat(canvasChart.internal.$el.chart.style("min-height")))
					.to.be.equal(canvasState.current.height);
			}
		});
	});

	[
		["bottom legend", {}],
		["right legend", {legend: {position: "right"}}]
	].forEach(([name, options]) => {
		it(`should align canvas legend item layout with SVG ${name}`, () => {
			const svgChart = generate(options);
			const canvasChart = generate({
				...options,
				render: {
					mode: canvas()
				}
			});
			const svgRoot = svgChart.internal.$el.chart.node();
			const canvasRoot = canvasChart.internal.$el.chart.node();

			["data1", "data2"].forEach(id => {
				const svgEventRect = svgRoot.querySelector(
					`.${$LEGEND.legendItem}-${id} .${$LEGEND.legendItemEvent}`
				);
				const canvasItem = canvasRoot.querySelector(`button[data-id="${id}"]`);

				expect(svgEventRect).not.to.be.null;
				expect(canvasItem).not.to.be.null;
				expectCloseRect(
					getRelativeRect(canvasItem, canvasRoot),
					getRelativeRect(svgEventRect, svgRoot)
				);
			});
		});
	});
});
