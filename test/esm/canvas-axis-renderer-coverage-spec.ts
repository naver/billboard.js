/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it, vi} from "vitest";

import CanvasAxisRenderer from "../../src/canvas/CanvasAxisRenderer";

function makeScale(initialDomain = [0, 10], initialRange = [0, 100]) {
	let domain = initialDomain.slice();
	const range = initialRange.slice();

	function scale(value) {
		const [d0, d1] = domain.map(Number);
		const [r0, r1] = range;

		return r0 + ((Number(value) - d0) / (d1 - d0)) * (r1 - r0);
	}

	scale.domain = next => {
		if (!next) {
			return domain;
		}

		domain = next.slice();
		return scale;
	};
	scale.range = () => range;
	scale.ticks = (count = 5) => {
		const len = Math.max(1, count);

		return Array.from({length: len}, (_, i) => (
			len === 1 ? domain[0] : domain[0] + ((domain[1] - domain[0]) * i / (len - 1))
		));
	};
	scale.copy = () => makeScale(domain, range);
	scale.invert = pixel => {
		const [d0, d1] = domain.map(Number);
		const [r0, r1] = range;

		return d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
	};
	scale.orgDomain = () => domain;

	return scale;
}

function makeAxisRenderer() {
	const canvas = document.createElement("canvas");
	canvas.width = 260;
	canvas.height = 220;

	const engine = {
		canvas,
		ctx: canvas.getContext("2d")
	};
	const style = {
		axis: {
			activeLabelColor: "#f00",
			labelColor: "#111",
			labelFont: "12px sans-serif",
			lineColor: "#333",
			lineWidth: 1,
			tickColor: "#444",
			tickWidth: 1,
			xLabelColor: "#123",
			xTickFont: "11px sans-serif",
			yLabelColor: "#234",
			yTickFont: "10px sans-serif",
			y2LabelColor: "#345",
			y2TickFont: "9px sans-serif"
		},
		grid: {
			dashArray: [2, 2],
			labelColor: "#555",
			labelFont: "10px sans-serif",
			lineColor: "#aaa",
			lineWidth: 1
		},
		region: {
			fill: "#ddd",
			labelColor: "#666",
			labelFont: "10px sans-serif",
			opacity: 0.3
		},
		title: {
			color: "#000",
			font: "14px sans-serif"
		}
	};

	return {
		renderer: new CanvasAxisRenderer(engine, {style})
	};
}

function makeContext(overrides = {}) {
	const scale = {
		x: makeScale([0, 4], [0, 120]),
		y: makeScale([0, 100], [100, 0]),
		y2: makeScale([0, 50], [100, 0]),
		subX: makeScale([0, 4], [0, 90]),
		zoom: null
	};
	const $$ = {
		api: {},
		axis: {
			generateTickValues(values, count) {
				return count ? values.slice(0, count) : values;
			},
			getLabelText: id => `${id.toUpperCase()} Axis`,
			getXAxisTickFormat: () => tick => tick === 2 ? ["two", "line"] : `x${tick}`,
			isCategorized: () => false,
			isLog: () => false,
			isTimeSeries: () => false,
			textAnchorForAxisLabel: id => id === "x" ? "middle" : (id === "y" ? "start" : "end"),
			x: {
				tickOffset: () => 10
			},
			xForAxisLabel: id => id === "x" ? 60 : 50,
			dxForAxisLabel: id => id === "y" ? "1em" : 2,
			dyForAxisLabel: id => id === "y2" ? "bad" : 4,
			y: {
				tickFormat: () => value => `y${value}`
			},
			y2: {
				tickFormat: () => value => `y2-${value}`
			}
		},
		data: {
			targets: [{
				id: "data1",
				values: [0, 1, 2, 3].map(index => ({
					id: "data1",
					index,
					x: index,
					value: index
				}))
			}]
		},
		filterTargetsToShow(targets) {
			return targets ?? this.data.targets;
		},
		config: {
			axis_rotated: false,
			axis_tooltip: {backgroundColor: {x: "#111", y: "#222", y2: "#333"}},
			axis_x_axes: [{tick: {count: 2, outer: false, format: value => `ax${value}`}}],
			axis_x_categories: [],
			axis_x_show: true,
			axis_x_tick_count: 3,
			axis_x_tick_culling: false,
			axis_x_tick_inner: false,
			axis_x_tick_multiline: true,
			axis_x_tick_outer: true,
			axis_x_tick_show: true,
			axis_x_tick_text_inner: {first: true, last: true},
			axis_x_tick_text_position: {x: 1, y: 2},
			axis_x_tick_text_show: true,
			axis_x_tick_values: [0, 1, 2, 3],
			axis_x_tick_width: 16,
			axis_y2_axes: [{tick: {count: 2, outer: false}}],
			axis_y2_show: true,
			axis_y2_tick_count: 3,
			axis_y2_tick_inner: false,
			axis_y2_tick_outer: true,
			axis_y2_tick_show: true,
			axis_y2_tick_text_position: {x: -1, y: 1},
			axis_y2_tick_text_show: true,
			axis_y_axes: [{tick: {count: 2, outer: false}}],
			axis_y_show: true,
			axis_y_tick_count: 3,
			axis_y_tick_inner: false,
			axis_y_tick_outer: true,
			axis_y_tick_show: true,
			axis_y_tick_text_position: {x: 1, y: -1},
			axis_y_tick_text_show: true,
			grid_lines_front: false,
			grid_x_lines: [
				{value: 1, text: "x-start", position: "start"},
				{value: 2, text: "x-middle", position: "middle"},
				{value: 3, text: "x-end", position: "end"}
			],
			grid_x_show: true,
			grid_y_lines: [
				{value: 20, text: "y-start", position: "start"},
				{value: 30, text: "y-middle", position: "middle", axis: "y2"},
				{value: 40, text: "y-end", position: "end"}
			],
			grid_y_show: true,
			grid_y_ticks: 3,
			regions: [
				{axis: "x", start: 0, end: 2, opacity: 0.2, label: {text: "region-x", center: "xy"}},
				{axis: "y", start: 20, end: 60, label: {text: "region-y", rotated: true}},
				{axis: "y2", start: 10, end: 30, label: {text: "region-y2", color: "#999"}},
				{axis: "z", start: 0, end: 1, label: {text: "ignored"}}
			],
			subchart_axis_x_show: true,
			subchart_axis_x_tick_show: true,
			subchart_axis_x_tick_text_show: true,
			subchart_show: true,
			title_padding: {top: 6},
			title_position: "right",
			title_text: "Canvas\nAxis"
		},
		format: {
			dataTime: () => value => new Date(`${value}T00:00:00Z`),
			subXAxisTick: tick => `sx${tick}`,
			xAxisTick: value => `time:${value}`
		},
		getAxisSize: () => 18,
		getAxisTickRotate: () => 35,
		mapTargetsToUniqueXs: () => [0, 1, 2, 3],
		scale,
		state: {
			current: {height: 220, width: 260},
			height: 100,
			height2: 40,
			margin: {left: 30, top: 20},
			margin2: {left: 30, top: 160},
			redrawGeneration: 1,
			width: 120,
			width2: 90
		}
	};
	const {axis, config, format, scale: scaleOverrides, state, ...rest} = overrides;

	Object.assign($$, rest);
	axis && Object.assign($$.axis, axis);
	config && Object.assign($$.config, config);
	format && Object.assign($$.format, format);
	scaleOverrides && Object.assign($$.scale, scaleOverrides);
	state && Object.assign($$.state, state);

	return $$;
}

describe("ESM canvas axis renderer coverage", () => {
	it("draws axes, title, regions, grid lines and focused x ticks", () => {
		const {renderer} = makeAxisRenderer();
		const ctx = makeContext();

		renderer.draw(ctx);
		renderer.drawTitle(ctx);
		renderer.drawSubXAxis(ctx);
		renderer.drawFocusedXAxisTick(ctx, [{x: 2}]);
		renderer.drawAxisTooltip(ctx, [70, 60]);

		expect(renderer.ctx).to.not.be.null;
	});

	it("adds extra horizontal clip padding for rotated x tick text", () => {
		const {renderer} = makeAxisRenderer();
		const ctx = makeContext();
		const rects: Array<{x: number, y: number, w: number, h: number}> = [];
		const rect = vi.spyOn(CanvasRenderingContext2D.prototype, "rect")
			.mockImplementation(function(x, y, w, h) {
				rects.push({x, y, w, h});
			});

		renderer.draw(ctx);

		expect(rects.some(({x, y, w, h}) =>
			x === 10 &&
			y === 0 &&
			w === 160 &&
			h === 220
		)).to.be.true;

		rect.mockRestore();
	});

	it("draws rotated axes, category regions and rotated axis tooltips", () => {
		const {renderer} = makeAxisRenderer();
		const ctx = makeContext({
			axis: {
				isCategorized: () => true
			},
			config: {
				axis_rotated: true,
				axis_tooltip: true,
				axis_x_categories: ["a", "b", "c"],
				axis_x_tick_inner: true,
				axis_x_tick_values: ["a", "b", "c"],
				axis_y2_tick_inner: true,
				axis_y_tick_inner: true,
				regions: [
					{axis: "x", start: "a", end: "c", label: {text: "category", center: "x"}},
					{axis: "y", end: 60, label: {text: "rotated-y", center: "y"}}
				],
				title_position: "center"
			}
		});

		renderer.draw(ctx);
		renderer.drawTitle(ctx);
		renderer.drawSubXAxis(ctx);
		renderer.drawFocusedXAxisTick(ctx, [{x: "b"}]);
		renderer.drawAxisTooltip(ctx, [80, 70]);
		renderer.drawAxisTooltip(ctx, [-10, -10]);

		const timeseriesTooltip = makeContext({
			axis: {
				isTimeSeries: id => id === "x"
			},
			config: {
				axis_tooltip: true,
				regions: []
			}
		});

		renderer.drawAxisTooltip(timeseriesTooltip, [80, 70]);

		expect(renderer.ctx).to.not.be.null;
	});

	it("returns early when optional axis layers are disabled", () => {
		const {renderer} = makeAxisRenderer();
		const ctx = makeContext({
			config: {
				axis_tooltip: false,
				grid_x_show: false,
				grid_y_show: false,
				regions: [],
				subchart_axis_x_show: false,
				title_text: ""
			}
		});

		renderer.drawGrid(ctx);
		renderer.drawGridLines(ctx);
		renderer.drawSubXAxis(ctx);
		renderer.drawTitle(ctx);
		renderer.drawFocusedXAxisTick(ctx, []);
		renderer.drawAxisTooltip(ctx, null);

		expect(renderer.ctx).to.not.be.null;
	});
});
