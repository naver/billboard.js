/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {select} from "d3-selection";
import {describe, expect, it, vi} from "vitest";

import ChartInternal from "../../src/ChartInternal/ChartInternal";
import {canvas as canvasMode} from "../../src/config/resolver/canvas";
import {TYPE} from "../../src/config/const";
import {window} from "../../src/module/browser";

canvasMode();

const proto = ChartInternal.prototype as any;

function call(name, ctx, ...args) {
	return proto[name].call(ctx, ...args);
}

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
	scale.orgDomain = () => domain;
	scale.range = () => range;
	scale.invert = pixel => {
		const [d0, d1] = domain.map(Number);
		const [r0, r1] = range;

		return d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
	};

	return scale;
}

function makeRow(id, index, value = index) {
	return {id, index, x: index, value};
}

function makeContext(overrides = {}) {
	const container = document.createElement("div");
	const canvas = document.createElement("canvas");
	const targets = [
		{
			id: "data1",
			values: [makeRow("data1", 0, 10), makeRow("data1", 1, 20)]
		},
		{
			id: "data2",
			values: [makeRow("data2", 0, 30), makeRow("data2", 1, 40)]
		}
	];
	const callbacks = {
		click: [],
		selected: [],
		unselected: [],
		over: [],
		out: [],
		brush: [],
		redraw: [],
		render: []
	};
	const ctx = {
		api: {
			data: id => [targets.find(target => target.id === id)],
			hide: vi.fn(),
			show: vi.fn(),
			toggle: vi.fn()
		},
		axis: {
			getExtent: () => null,
			isLog: () => false,
			isTimeSeries: () => false,
			x: {
				scale: vi.fn()
			}
		},
		callbacks,
		cache: {
			add: vi.fn()
		},
		canvasAxisRenderer: {
			draw: vi.fn(),
			drawAxisTooltip: vi.fn(),
			drawFocusedXAxisTick: vi.fn(),
			drawGridLines: vi.fn(),
			drawSubXAxis: vi.fn(),
			drawTitle: vi.fn(),
			withContext(ctx, cb) {
				cb();
			}
		},
		canvasEngine: {
			beginFrame: vi.fn(),
			canvas,
			clearOverlay: vi.fn(),
			endFrame: vi.fn(),
			resize: vi.fn(),
			withOverlay(cb) {
				cb(canvas.getContext("2d"));
			}
		},
		canvasRenderer: {
			draw: vi.fn(),
			drawBackground: vi.fn(),
			drawEmptyLabel: vi.fn(),
			drawFocus: vi.fn(),
			drawSelectionDragArea: vi.fn(),
			drawSubchart: vi.fn(),
			drawZoomBrush: vi.fn(),
			hasExpandedShapeFocus: () => false,
			withContext(ctx, cb) {
				cb();
			}
		},
		canvasTheme: {
			reload: vi.fn()
		},
		color: id => id === "data1" ? "#111" : "#222",
		config: {
			axis_rotated: false,
			axis_x_show: true,
			axis_x_type: "indexed",
			axis_y2_type: "indexed",
			axis_y_type: "indexed",
			canvas_theme: null,
			data_names: {},
			data_onclick: (d, node) => callbacks.click.push([d, node]),
			data_onout: (d, node) => callbacks.out.push([d, node]),
			data_onover: (d, node) => callbacks.over.push([d, node]),
			data_onselected: (d, node) => callbacks.selected.push([d, node]),
			data_onunselected: (d, node) => callbacks.unselected.push([d, node]),
			data_selection_draggable: true,
			data_selection_enabled: true,
			data_selection_grouped: false,
			data_selection_isselectable: () => true,
			data_selection_multiple: true,
			data_type: TYPE.BAR,
			data_types: {},
			grid_lines_front: true,
			interaction_enabled: true,
			interaction_inputType_touch: true,
			legend_contents_bindto: null,
			legend_contents_template: null,
			legend_equally: false,
			legend_format: null,
			legend_inset_step: null,
			legend_inset_x: 4,
			legend_inset_y: 5,
			legend_item_interaction: true,
			legend_item_onclick: null,
			legend_item_onout: null,
			legend_item_onover: null,
			legend_item_tile_height: 10,
			legend_item_tile_r: 5,
			legend_item_tile_type: "rectangle",
			legend_item_tile_width: 10,
			legend_padding: 0,
			legend_show: true,
			legend_tooltip: true,
			legend_usePoint: false,
			onclick: event => callbacks.click.push(["chart", event]),
			onout: event => callbacks.out.push(["chart", event]),
			onover: event => callbacks.over.push(["chart", event]),
			point_show: false,
			point_type: "rectangle",
			subchart_init_range: null,
			subchart_onbrush: domain => callbacks.brush.push(domain),
			subchart_show: true,
			tooltip_grouped: true,
			transition_duration: 100,
			zoom_enabled: false,
			zoom_rescale: true
		},
		data: {targets},
		filterByX: (list, x) => list.flatMap(target => target.values.filter(v => v.x === x)),
		filterTargetsToShow(list) {
			return list ?? this.data.targets;
		},
		generateClass: (base, id) => `${base} ${base}-${id}`,
		getBaseValue: d => d.value,
		getCanvasSurfaceHeight() {
			return call("getCanvasSurfaceHeight", this);
		},
		getDrawShape: () => ({indices: {}}),
		getLegendHeight: () => 24,
		getLegendWidth: () => 200,
		getYDomain: () => [0, 100],
		getZoomDomain: () => [0, 10],
		hasArcType: () => false,
		hasType: () => false,
		hideTooltip: vi.fn(),
		hitDetector: {
			findInRect: () => [targets[0].values[0], targets[1].values[0]],
			findNearest: () => targets[0].values[0],
			findNearestShape: () => targets[0].values[0],
			findNearestIndexByCoord: () => targets[0].values[1],
			rebuild: vi.fn()
		},
		isGrouped: () => false,
		isLegendToShow: () => true,
		isMultipleX: () => false,
		isTargetToShow: () => true,
		mapToIds: list => list.map(target => target.id),
		mapToTargetIds: ids => ids || targets.map(target => target.id),
		opacityForUnfocusedLegend: () => 0.2,
		org: {
			xDomain: [0, 10]
		},
		redraw: options => callbacks.redraw.push(options),
		renderCanvasFrame(shape, focusData, rebuildHit) {
			callbacks.render.push({shape, focusData, rebuildHit});
		},
		scale: {
			subX: makeScale([0, 10], [0, 100]),
			subY: makeScale(),
			subY2: makeScale(),
			x: makeScale([0, 10], [0, 100]),
			y: makeScale(),
			y2: makeScale(),
			zoom: null
		},
		setDragStatus: vi.fn(),
		state: {
			_cachedDrawShape: null,
			_canvasVisibleRangeCache: null,
			_canvasXTickValuesCache: null,
			cancelClick: false,
			canvasFocusMainRedraw: false,
			canvasInlineStyle: {},
			canvasLastInputClickKey: null,
			canvasLastInputClickTime: 0,
			canvasSelection: new Set(),
			canvasSelectionDragging: false,
			current: {height: 150, width: 240},
			dirty: {data: false},
			domain: null,
			event: null,
			flowing: false,
			hasAxis: true,
			hasTreemap: false,
			height: 80,
			height2: 40,
			hiddenTargetIds: new Set(),
			inputType: "mouse",
			isLegendInset: false,
			isLegendLeft: false,
			isLegendRight: false,
			isLegendTop: false,
			legendHasRendered: false,
			legendItemHeight: 10,
			legendItemWidth: 10,
			legendStep: 0,
			margin: {left: 10, top: 10},
			margin2: {left: 20, top: 100},
			margin3: {bottom: 2, top: 3},
			orgConfig: {},
			rendered: true,
			transiting: false,
			width: 100,
			width2: 100,
			xAxisHeight: 16
		},
		updateTextColor: () => null,
		updateTypesElements: vi.fn(),
		updateXDomain: vi.fn(() => {
			ctx.org.xDomain = [1, 11];
			ctx.scale.x.domain([1, 11]);
		}),
		withinRange: () => true,
		$el: {
			canvas: select(canvas),
			chart: select(container),
			legend: null
		}
	};

	container.appendChild(canvas);
	document.body.appendChild(container);

	const {axis, config, scale, state, ...rest} = overrides;

	Object.assign(ctx, rest);
	config && Object.assign(ctx.config, config);
	state && Object.assign(ctx.state, state);
	scale && Object.assign(ctx.scale, scale);
	axis && Object.assign(ctx.axis, axis);

	Object.getOwnPropertyNames(proto).forEach(name => {
		if (
			name !== "constructor" &&
			typeof proto[name] === "function" &&
			!(name in ctx)
		) {
			ctx[name] = proto[name].bind(ctx);
		}
	});

	return ctx;
}

function dispatchMouse(node, type, x, y, extra = {}) {
	node.dispatchEvent(new MouseEvent(type, {
		bubbles: true,
		clientX: x,
		clientY: y,
		...extra
	}));
}

function dispatchTouch(node, type, x, y) {
	const event = new Event(type, {bubbles: true, cancelable: true});
	const touch = {clientX: x, clientY: y};

	Object.defineProperty(event, "changedTouches", {value: [touch]});
	Object.defineProperty(event, "touches", {value: [touch]});
	node.dispatchEvent(event);
}

describe("ESM canvas internal coverage", () => {
	it("normalizes unsupported canvas config and warnings", () => {
		const warn = vi.spyOn(window.console, "warn").mockImplementation(() => {});
		const ctx = makeContext({
			config: {
				axis_x_type: "pow",
				axis_y2_type: "pow",
				axis_y_type: "pow"
			},
			hasArcType: () => true,
			hasType: type => ["bubble", "radar", "polar", "funnel"].includes(type),
			state: {
				orgConfig: {transition: {duration: 50}}
			}
		});

		call("prepareCanvasConfig", ctx);

		expect(ctx.config.axis_x_type).to.be.equal("indexed");
		expect(ctx.config.axis_y_type).to.be.equal("indexed");
		expect(ctx.config.axis_y2_type).to.be.equal("indexed");
		expect(ctx.config.point_show).to.be.true;
		expect(ctx.config.point_type).to.be.equal("circle");
		expect(ctx.config.transition_duration).to.be.equal(0);
		expect(warn).toHaveBeenCalled();

		warn.mockRestore();
		ctx.$el.chart.node().remove();
	});

	it("applies, sets and clears canvas subchart domains", () => {
		const ctx = makeContext({
			axis: {
				isTimeSeries: () => true,
				x: {scale: vi.fn()}
			},
			config: {
				subchart_init_range: ["2026-01-01", "2026-01-03"]
			},
			format: {
				dataTime: () => value => new Date(`${value}T00:00:00Z`)
			},
			state: {
				domain: null,
				rendered: false
			}
		});

		call("applyCanvasSubchartDomain", ctx);
		expect(ctx.state.domain[0]).to.be.instanceOf(Date);
		expect(ctx.axis.x.scale).toHaveBeenCalled();

		ctx.axis.isTimeSeries = () => false;
		expect(call("setCanvasSubchartDomain", ctx, [1, 4], false, true)).to.be.deep.equal([1, 4]);
		expect(ctx.scale.zoom).to.be.null;
		expect(ctx.callbacks.brush.at(-1)).to.be.deep.equal([1, 4]);

		ctx.withinRange = () => false;
		expect(call("setCanvasSubchartDomain", ctx, [20, 30])).to.be.undefined;

		ctx.withinRange = () => true;
		call("clearCanvasSubchartDomain", ctx, false, true);
		expect(ctx.state.domain).to.be.undefined;
		expect(ctx.scale.x.domain()).to.be.deep.equal([0, 10]);
		expect(ctx.callbacks.brush.at(-1)).to.be.deep.equal([0, 10]);

		ctx.config.subchart_show = false;
		expect(call("setCanvasSubchartDomain", ctx, [1, 2])).to.be.undefined;
		call("clearCanvasSubchartDomain", ctx);
		ctx.$el.chart.node().remove();
	});

	it("renders and positions HTML legends including interaction branches", () => {
		const ctx = makeContext();

		call("updateHtmlLegend", ctx);

		const legend = ctx.$el.legend.node();
		const items = Array.from(legend.querySelectorAll("button"));

		expect(items).to.have.length(2);
		expect(items[0].getAttribute("title")).to.be.equal("data1");

		dispatchMouse(items[0], "mouseover", 12, 12);
		expect(ctx.state.focusedTargetIds.has("data1")).to.be.true;

		dispatchMouse(items[0], "mouseout", 12, 12);
		expect(ctx.state.focusedTargetIds.size).to.be.equal(0);

		dispatchMouse(items[0], "click", 12, 12);
		expect(ctx.api.toggle).toHaveBeenCalledWith("data1");

		ctx.state.hiddenTargetIds.add("data2");
		dispatchMouse(items[0], "click", 12, 12, {altKey: true});
		expect(ctx.api.show).toHaveBeenCalled();

		ctx.state.hiddenTargetIds.clear();
		dispatchMouse(items[0], "click", 12, 12, {altKey: true});
		expect(ctx.api.hide).toHaveBeenCalled();
		expect(ctx.api.show).toHaveBeenCalledWith("data1");

		ctx.state.hasTreemap = true;
		call("updateHtmlLegend", ctx);
		expect(ctx.$el.legend).to.be.null;
		ctx.$el.chart.node().remove();
	});

	it("handles HTML legend formatter, point icons and interaction variants", () => {
		const formatted = makeContext({
			color: id => id === "data1" ? "#1<2" : "#345678",
			config: {
				data_names: {
					data1: "Named & Data"
				},
				legend_format(text, id) {
					return `${text}:${id || "self"}`;
				},
				legend_item_interaction: {dblclick: true},
				legend_item_tile_type: "circle",
				legend_usePoint: true,
				point_pattern: ["rectangle", "", "<path d='M0 0L8 8' />"]
			}
		});

		call("updateHtmlLegend", formatted);

		const formattedItems = Array.from(formatted.$el.legend.node().querySelectorAll("button"));

		expect(formattedItems[0].getAttribute("title")).to.be.equal("Named & Data:data1");
		expect(formattedItems[0].querySelector("rect")).to.not.be.null;
		expect(formattedItems[1].querySelector("circle")).to.not.be.null;

		dispatchMouse(formattedItems[0], "dblclick", 12, 12);
		expect(formatted.api.hide).toHaveBeenCalled();
		expect(formatted.api.show).toHaveBeenCalledWith("data1");
		formatted.$el.chart.node().remove();

		const handled = makeContext({
			config: {
				legend_item_onclick: () => true,
				legend_item_onout: () => true,
				legend_item_onover: () => true
			}
		});

		call("updateHtmlLegend", handled);

		const handledItem = handled.$el.legend.node().querySelector("button");

		dispatchMouse(handledItem, "mouseover", 12, 12);
		dispatchMouse(handledItem, "mouseout", 12, 12);
		dispatchMouse(handledItem, "click", 12, 12);
		expect(handled.state.focusedTargetIds).to.be.undefined;
		expect(handled.api.toggle).not.toHaveBeenCalled();
		handled.$el.chart.node().remove();

		const disabled = makeContext({
			config: {
				interaction_enabled: false
			}
		});

		call("updateHtmlLegend", disabled);
		dispatchMouse(disabled.$el.legend.node().querySelector("button"), "click", 12, 12);
		expect(disabled.api.toggle).not.toHaveBeenCalled();
		disabled.$el.chart.node().remove();
	});

	it("renders template legends and handles measurement fallbacks", () => {
		const bindto = document.createElement("div");
		const ctx = makeContext({
			config: {
				legend_contents_bindto: bindto,
				legend_contents_template(id) {
					return `<button data-id="${id}"><span>${id}</span></button>`;
				}
			},
			getLegendText: null
		});

		document.body.appendChild(bindto);

		expect(call("updateHtmlLegendTemplate", ctx, ["data1", "data2"])).to.be.true;
		call("updateHtmlLegendSize", ctx, ["data1", "data2"]);
		call("positionHtmlLegend", ctx);
		expect(ctx.state.legendHasRendered).to.be.false;
		expect(ctx.state.legendItemWidth).to.be.greaterThan(0);

		ctx.config.legend_contents_bindto = "#missing-template-legend";
		expect(call("updateHtmlLegendTemplate", ctx, ["data1"])).to.be.false;
		call("updateHtmlLegend", ctx);
		expect(ctx.state.legendItemWidth).to.be.equal(0);

		ctx.state.isLegendRight = true;
		ctx.config.legend_contents_bindto = null;
		ctx.config.legend_contents_template = null;
		call("updateHtmlLegend", ctx);
		expect(ctx.$el.legend.style("right")).to.be.equal("0px");

		ctx.state.isLegendRight = false;
		ctx.state.isLegendInset = true;
		ctx.state.isLegendTop = true;
		ctx.state.isLegendLeft = true;
		call("positionHtmlLegend", ctx);
		expect(ctx.$el.legend.style("left")).to.be.equal("4px");

		bindto.remove();
		ctx.$el.chart.node().remove();
	});

	it("initializes canvas mode and covers hidden/equal legend layout branches", () => {
		const initCtx = makeContext({
			bindCanvasEvents: vi.fn(),
			bindZoomEvent: vi.fn(),
			config: {
				zoom_enabled: true
			}
		});

		call("initCanvas", initCtx);
		expect(initCtx.state.isCanvasMode).to.be.true;
		expect(initCtx.$el.chart.style("position")).to.be.equal("relative");
		expect(initCtx.bindCanvasEvents).toHaveBeenCalled();
		expect(initCtx.bindZoomEvent).toHaveBeenCalled();
		initCtx.$el.chart.node().remove();

		const legendCtx = makeContext({
			config: {
				legend_equally: true
			},
			getLegendWidth: () => 20,
			isLegendToShow: id => id !== "data2"
		});

		call("updateHtmlLegend", legendCtx);
		expect(legendCtx.state.legendItemWidth).to.be.greaterThan(0);
		expect(legendCtx.$el.legend.select("button.bb-legend-item-data2").style("visibility"))
			.to.be.equal("hidden");
		legendCtx.$el.chart.node().remove();
	});

	it("handles canvas selection API and drag selection branches", () => {
		const ctx = makeContext();

		expect(call("getCanvasSelectedData", ctx)).to.be.deep.equal([]);

		call("setCanvasSelection", ctx, true, "data1", [0], false);
		expect(call("getCanvasSelectedData", ctx, "data1").map(d => d.index)).to.be.deep.equal([0]);
		expect(ctx.callbacks.selected).to.have.length(1);

		call("setCanvasSelection", ctx, false, "data1", [0]);
		expect(call("getCanvasSelectedData", ctx)).to.be.deep.equal([]);
		expect(ctx.callbacks.unselected).to.have.length(1);

		ctx.config.data_selection_multiple = false;
		call("toggleCanvasSelection", ctx, [ctx.data.targets[0].values[0]]);
		call("toggleCanvasSelection", ctx, [ctx.data.targets[0].values[1]]);
		expect(ctx.state.canvasSelection.has("data1:0")).to.be.false;
		expect(ctx.state.canvasSelection.has("data1:1")).to.be.true;

		ctx.config.data_selection_multiple = true;
		ctx.config.data_selection_grouped = true;
		expect(call("getCanvasSelectionDragData", ctx, {x: 0, y: 0, w: 10, h: 10}))
			.to.have.length(2);

		const canvas = ctx.$el.canvas.node();
		vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
			bottom: 150,
			height: 150,
			left: 0,
			right: 240,
			top: 0,
			width: 240,
			x: 0,
			y: 0
		});

		const start = new MouseEvent("mousedown", {button: 0, clientX: 20, clientY: 20});
		const move = new MouseEvent("mousemove", {clientX: 40, clientY: 45});
		const end = new MouseEvent("mouseup", {clientX: 40, clientY: 45});

		expect(call("startCanvasSelectionDrag", ctx, start)).to.be.true;
		expect(call("updateCanvasSelectionDrag", ctx, move)).to.be.true;
		expect(call("endCanvasSelectionDrag", ctx, end)).to.be.true;
		expect(ctx.state.canvasSelectionDragging).to.be.false;

		ctx.config.data_selection_enabled = false;
		expect(call("startCanvasSelectionDrag", ctx, start)).to.be.false;
		ctx.$el.chart.node().remove();
	});

	it("handles selection disabled, reset and grouped toggle variants", () => {
		const disabled = makeContext({
			config: {
				data_selection_enabled: false
			}
		});

		call("setCanvasSelection", disabled, true);
		call("toggleCanvasSelection", disabled, [disabled.data.targets[0].values[0]]);
		expect(disabled.state.canvasSelection.size).to.be.equal(0);
		disabled.$el.chart.node().remove();

		const reset = makeContext();

		call("setCanvasSelection", reset, true, ["data1", "data2"], [0, 1], false);
		expect(reset.state.canvasSelection.size).to.be.equal(4);
		call("setCanvasSelection", reset, true, "data1", [0], true);
		expect(reset.state.canvasSelection.has("data1:0")).to.be.false;
		expect(reset.state.canvasSelection.has("data2:1")).to.be.false;
		reset.$el.chart.node().remove();

		const grouped = makeContext({
			config: {
				data_selection_grouped: true,
				data_selection_multiple: false
			}
		});

		call("toggleCanvasSelection", grouped, [grouped.data.targets[0].values[0]]);
		call("toggleCanvasSelection", grouped, [grouped.data.targets[1].values[0]]);
		expect(grouped.state.canvasSelection.has("data1:0")).to.be.true;
		expect(grouped.state.canvasSelection.has("data2:0")).to.be.true;
		call("toggleCanvasSelection", grouped, [grouped.data.targets[0].values[0]]);
		expect(grouped.state.canvasSelection.has("data1:0")).to.be.true;
		grouped.$el.chart.node().remove();
	});

	it("dispatches canvas data callbacks, duplicate clicks and hover state", () => {
		const ctx = makeContext();
		const canvas = ctx.$el.canvas.node();

		vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
			bottom: 150,
			height: 150,
			left: 0,
			right: 240,
			top: 0,
			width: 240,
			x: 0,
			y: 0
		});

		const event = new MouseEvent("click", {clientX: 20, clientY: 20});
		const row = call("dispatchCanvasDataClick", ctx, event, true);

		expect(row).to.be.equal(ctx.data.targets[0].values[0]);
		expect(ctx.callbacks.click[0][0]).to.be.equal(row);

		expect(call("dispatchCanvasDataClick", ctx, event)).to.be.equal(row);
		expect(ctx.state.canvasLastInputClickKey).to.be.null;

		call("dispatchCanvasDataOver", ctx, row, canvas);
		call("dispatchCanvasDataOver", ctx, row, canvas);
		expect(ctx.callbacks.over).to.have.length(1);
		call("dispatchCanvasDataOut", ctx, canvas);
		expect(ctx.callbacks.out).to.have.length(1);

		ctx.hitDetector.findNearestShape = () => null;
		expect(call("dispatchCanvasDataClick", ctx, event)).to.be.null;
		ctx.$el.chart.node().remove();
	});

	it("handles canvas mouse move cleanup and axis tooltip fallback branches", () => {
		const ctx = makeContext();
		const canvas = ctx.$el.canvas.node();

		vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
			bottom: 150,
			height: 150,
			left: 0,
			right: 240,
			top: 0,
			width: 240,
			x: 0,
			y: 0
		});

		ctx.state.flowing = true;
		call("onCanvasMouseMove", ctx, new MouseEvent("mousemove", {clientX: 20, clientY: 20}));
		ctx.state.flowing = false;
		ctx.state.canvasSelectionDragging = true;
		call("onCanvasMouseMove", ctx, new MouseEvent("mousemove", {clientX: 20, clientY: 20}));
		ctx.state.canvasSelectionDragging = false;

		ctx.clearCanvasFocus = vi.fn();
		ctx.dispatchCanvasDataOut = vi.fn();
		ctx.hideTooltip = vi.fn();
		ctx.state.canvasFocusKey = "data1:0";
		ctx.updateCanvasSubchartCursor = () => true;
		call("onCanvasMouseMove", ctx, new MouseEvent("mousemove", {clientX: 20, clientY: 20}));
		expect(ctx.state.canvasFocusKey).to.be.null;
		expect(ctx.clearCanvasFocus).toHaveBeenCalled();

		ctx.updateCanvasSubchartCursor = () => false;
		ctx.hitDetector.findNearest = () => null;
		ctx.hitDetector.findNearestIndexByCoord = () => null;
		ctx.config.axis_tooltip = true;
		ctx.clearCanvasFocus.mockClear();
		call("onCanvasMouseMove", ctx, new MouseEvent("mousemove", {clientX: 30, clientY: 30}));
		expect(ctx.canvasAxisRenderer.drawAxisTooltip).toHaveBeenCalled();

		ctx.state.canvasFocusKey = null;
		ctx.config.axis_tooltip = true;
		call("onCanvasMouseOut", ctx);
		expect(ctx.clearCanvasFocus).toHaveBeenCalled();
		ctx.$el.chart.node().remove();
	});

	it("handles subchart brush cursor, move, resize, cancel and clear branches", () => {
		const ctx = makeContext({
			state: {
				domain: [2, 5]
			}
		});
		const canvas = ctx.$el.canvas.node();

		vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({
			bottom: 150,
			height: 150,
			left: 0,
			right: 240,
			top: 0,
			width: 240,
			x: 0,
			y: 0
		});

		expect(call("updateCanvasSubchartCursor", ctx, new MouseEvent("mousemove", {
			clientX: 50,
			clientY: 110
		}))).to.be.true;
		expect(canvas.style.cursor).to.be.equal("move");

		expect(call("startCanvasSubchartBrush", ctx, new MouseEvent("mousedown", {
			clientX: 50,
			clientY: 110
		}))).to.be.true;
		expect(call("updateCanvasSubchartBrush", ctx, new MouseEvent("mousemove", {
			clientX: 65,
			clientY: 110
		}))).to.be.true;
		expect(call("endCanvasSubchartBrush", ctx, new MouseEvent("mouseup", {
			clientX: 65,
			clientY: 110
		}))).to.be.true;

		ctx.state.domain = [2, 5];
		expect(call("startCanvasSubchartBrush", ctx, new MouseEvent("mousedown", {
			clientX: 20,
			clientY: 110
		}))).to.be.true;
		expect(call("updateCanvasSubchartBrush", ctx, new MouseEvent("mousemove", {
			clientX: 25,
			clientY: 110
		}))).to.be.true;
		expect(call("cancelCanvasSubchartBrush", ctx, new MouseEvent("pointercancel", {
			clientX: 25,
			clientY: 110
		}))).to.be.true;

		ctx.state.domain = null;
		expect(call("startCanvasSubchartBrush", ctx, new MouseEvent("mousedown", {
			clientX: 30,
			clientY: 110
		}))).to.be.true;
		expect(call("endCanvasSubchartBrush", ctx, new MouseEvent("mouseup", {
			clientX: 30,
			clientY: 110
		}))).to.be.true;
		expect(ctx.state.domain).to.be.undefined;

		expect(call("updateCanvasSubchartCursor", ctx, new MouseEvent("mousemove", {
			clientX: 5,
			clientY: 5
		}))).to.be.false;
		expect(canvas.style.cursor).to.be.equal("");
		ctx.$el.chart.node().remove();
	});

	it("binds canvas events and handles touch and pointer paths", () => {
		const ctx = makeContext({
			config: {
				interaction_inputType_touch: {preventDefault: 5},
				onout: event => ctx.callbacks.out.push(["chart", event.type]),
				onover: event => ctx.callbacks.over.push(["chart", event.type])
			},
			onCanvasMouseMove(event) {
				this.state.event = event;
			},
			onCanvasMouseOut() {
				this.state.canvasMouseOut = true;
			},
			onCanvasTouchCancel(event) {
				this.state.touchCancel = event.type;
			},
			onCanvasTouchEnd(event) {
				this.state.touchEnd = event.type;
			},
			onCanvasTouchMove(event) {
				this.state.touchMove = event.type;
			},
			onCanvasTouchStart(event) {
				this.state.touchStart = event.type;
			}
		});
		const canvas = ctx.$el.canvas.node();

		call("bindCanvasEvents", ctx);
		canvas.dispatchEvent(new MouseEvent("mouseenter", {bubbles: true}));
		canvas.dispatchEvent(new MouseEvent("mouseleave", {bubbles: true}));
		canvas.dispatchEvent(new PointerEvent("pointerenter", {
			bubbles: true,
			pointerType: "touch"
		}));
		canvas.dispatchEvent(new PointerEvent("pointermove", {
			bubbles: true,
			clientX: 15,
			clientY: 15,
			pointerType: "touch"
		}));
		canvas.dispatchEvent(new PointerEvent("pointerup", {
			bubbles: true,
			clientX: 15,
			clientY: 15,
			pointerType: "touch"
		}));
		canvas.dispatchEvent(new PointerEvent("pointerleave", {
			bubbles: true,
			pointerType: "touch"
		}));
		canvas.dispatchEvent(new PointerEvent("pointercancel", {
			bubbles: true,
			pointerType: "touch"
		}));

		dispatchTouch(canvas, "touchstart", 10, 10);
		dispatchTouch(canvas, "touchmove", 30, 10);
		dispatchTouch(canvas, "touchend", 30, 10);
		dispatchTouch(canvas, "touchcancel", 30, 10);

		expect(ctx.callbacks.over.map(([, type]) => type)).to.include("pointerenter");
		expect(ctx.state.touchStart).to.be.equal("touchstart");
		expect(ctx.state.touchMove).to.be.equal("touchmove");
		expect(ctx.state.touchEnd).to.be.equal("touchend");
		expect(ctx.state.touchCancel).to.be.equal("touchcancel");

		ctx.state.inputType = "touch";
		call("onCanvasPointerEnter", ctx, new PointerEvent("pointerenter", {pointerType: "touch"}));
		call("onCanvasPointerDown", ctx, new PointerEvent("pointerdown", {pointerType: "mouse"}));

		const prevented = makeContext({
			config: {
				axis_rotated: true,
				interaction_inputType_touch: {preventDefault: true}
			},
			onCanvasTouchStart(event) {
				this.state.touchPrevented = event.defaultPrevented;
			}
		});

		call("bindCanvasEvents", prevented);
		dispatchTouch(prevented.$el.canvas.node(), "touchstart", 10, 30);
		expect(prevented.state.touchPrevented).to.be.true;
		prevented.$el.chart.node().remove();
		ctx.$el.chart.node().remove();
	});

	it("covers canvas flow and frame rendering branches", () => {
		const ctx = makeContext();
		const originalRequestAnimationFrame = window.requestAnimationFrame;
		const originalCancelAnimationFrame = window.cancelAnimationFrame;

		window.requestAnimationFrame = cb => {
			cb(window.performance.now() + 1000);
			return 1;
		};
		window.cancelAnimationFrame = vi.fn();

		expect(call("animateCanvasFlow", ctx, {
			done() {
				ctx.state.doneCalled = true;
			},
			duration: 50,
			length: 1,
			orgDataCount: 2
		})).to.be.true;
		expect(ctx.state.doneCalled).to.be.true;
		expect(ctx.state.flowing).to.be.false;

		ctx.state.canvasFlowFinish = vi.fn();
		ctx.state.canvasFlowFrame = 2;
		call("flushCanvasFlow", ctx);
		expect(window.cancelAnimationFrame).toHaveBeenCalledWith(2);

		expect(call("animateCanvasFlow", ctx, {duration: 0, length: 1, orgDataCount: 2}))
			.to.be.false;

		const invalidStart = makeContext({
			scale: {
				x: makeScale([NaN, 10], [0, 100])
			}
		});

		expect(call("animateCanvasFlow", invalidStart, {
			duration: 50,
			length: 1,
			orgDataCount: 2
		})).to.be.false;
		invalidStart.$el.chart.node().remove();

		const invalidEnd = makeContext({
			updateXDomain() {
				this.org.xDomain = [NaN, 20];
				this.scale.x.domain([NaN, 20]);
			}
		});

		expect(call("animateCanvasFlow", invalidEnd, {
			duration: 50,
			length: 1,
			orgDataCount: 2
		})).to.be.false;
		expect(invalidEnd.scale.x.domain()).to.be.deep.equal([0, 10]);
		invalidEnd.$el.chart.node().remove();

		const tooLarge = makeContext();

		tooLarge.data.targets[0].values = Array.from({length: 100001}, (_, index) =>
			makeRow("data1", index, index)
		);
		expect(call("animateCanvasFlow", tooLarge, {
			duration: 50,
			length: 1,
			orgDataCount: 2
		})).to.be.false;
		tooLarge.$el.chart.node().remove();

		call("renderCanvasFrame", ctx, null, [ctx.data.targets[0].values[0]], true);
		expect(ctx.hitDetector.rebuild).toHaveBeenCalled();
		expect(ctx.canvasAxisRenderer.drawGridLines).toHaveBeenCalled();

		ctx.canvasRenderer.hasExpandedShapeFocus = () => true;
		call("renderCanvasFocus", ctx, [ctx.data.targets[0].values[0]], [20, 30]);
		expect(ctx.state.canvasFocusMainRedraw).to.be.true;
		call("clearCanvasFocus", ctx);
		expect(ctx.callbacks.render.at(-1).rebuildHit).to.be.false;

		call("renderCanvasZoomBrush", ctx, 10, 20);
		call("clearCanvasZoomBrush", ctx);
		call("renderCanvasSelectionDrag", ctx, {x: 1, y: 2, w: 3, h: 4});
		call("renderCanvasAxisTooltip", ctx, [1, 2]);
		call("resizeCanvas", ctx);

		expect(ctx.canvasEngine.resize).toHaveBeenCalled();
		expect(ctx.canvasTheme.reload).toHaveBeenCalled();

		window.requestAnimationFrame = originalRequestAnimationFrame;
		window.cancelAnimationFrame = originalCancelAnimationFrame;
		ctx.$el.chart.node().remove();
	});
});
