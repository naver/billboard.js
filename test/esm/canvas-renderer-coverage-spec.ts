/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it, vi} from "vitest";

import CanvasRenderer from "../../src/canvas/CanvasRenderer";
import {TYPE} from "../../src/config/const";

function makeRow(id, index, value = index) {
	return {id, index, x: index, value};
}

function makeRenderer() {
	const canvas = document.createElement("canvas");
	canvas.width = 240;
	canvas.height = 180;

	const engine = {
		canvas,
		ctx: canvas.getContext("2d")
	};
	const style = {
		axis: {lineColor: "#111", lineWidth: 1},
		emptyLabel: {font: "12px sans-serif", color: "#333"},
		focusGrid: {lineColor: "#999", lineWidth: 1, dashArray: []},
		grid: {lineColor: "#aaa", lineWidth: 1, dashArray: [], labelFont: "10px sans-serif", labelColor: "#333"},
		label: {font: "10px sans-serif", color: "#000"},
		region: {fill: "#eee", opacity: 0.2, labelFont: "10px sans-serif", labelColor: "#000"},
		selectedPoint: {fill: "#fff", stroke: "#000", lineWidth: 2},
		focusPoint: {fill: "#fff", stroke: "#000", lineWidth: 2},
		shape: {
			areaOpacity: 0.2,
			barConnectLineColor: "#000",
			barConnectLineWidth: 1,
			barExpandedOpacity: 0.8,
			barLineWidth: 0,
			barOpacity: 0.7,
			barStrokeColor: "#000",
			candlestickExpandedOpacity: 0.9,
			candlestickLineWidth: 1,
			lineFocusedWidth: 2,
			lineWidth: 1,
			pointFillColor: undefined,
			pointLineWidth: 1,
			pointStrokeColor: undefined,
			targetDefocusedOpacity: 0.3
		},
		subchartBrush: {
			fill: "#777",
			handleFill: "#fff",
			handleLineWidth: 1,
			handleOpacity: 1,
			handleStroke: "#111",
			opacity: 0.4
		},
		title: {font: "14px sans-serif", color: "#111"},
		treemap: {stroke: "#fff", lineWidth: 1},
		zoomBrush: {fill: "#ccc", opacity: 0.4}
	};

	return {
		canvas,
		renderer: new CanvasRenderer(engine, {style})
	};
}

function makeContext() {
	const targets = [
		{id: "bar", values: [makeRow("bar", 0, 10), makeRow("bar", 1, 20)]},
		{id: "candle", values: [makeRow("candle", 0, 10), makeRow("candle", 1, 20)]},
		{id: "scatter", values: [makeRow("scatter", 0, 10), makeRow("scatter", 1, 20)]}
	];

	return {
		api: {},
		axis: {
			getExtent: () => [5, 90],
			getId: () => "y"
		},
		color: value => {
			const id = typeof value === "string" ? value : value.id;
			return id === "candle" ? "#c33" : "#36c";
		},
		config: {
			area_front: false,
			axis_rotated: false,
			axis_y_inverted: false,
			bar_front: false,
			bar_radius: undefined,
			bar_radius_ratio: undefined,
			candlestick_color_down: {candle: "#900"},
			clipPath: false,
			data_groups: [],
			data_labels: false,
			data_selection_enabled: true,
			data_type: TYPE.BAR,
			data_types: {
				bar: TYPE.BAR,
				candle: TYPE.CANDLESTICK,
				scatter: TYPE.SCATTER
			},
			point_focus_only: false,
			point_opacity: undefined,
			point_pattern: ["circle", "rectangle"],
			point_r: 4,
			point_radialGradient: false,
			point_show: true,
			point_type: "circle",
			subchart_show: true,
			subchart_showHandle: true
		},
		data: {targets},
		filterTargetsToShow(list) {
			return list ?? this.data.targets;
		},
		generateGetBarPoints: () => (d, i) => [[i * 28, 0], [i * 28 + 12, 18]],
		generateGetCandlestickPoints: () => (d, i) => [[i * 28, 4], [i * 28 + 10, 16], [i * 28 + 5, 0, 20]],
		getBaseValue: d => d.value,
		getCanvasSelectedData: () => [
			targets[0].values[0],
			targets[1].values[0],
			targets[2].values[0]
		],
		getCandlestickData: d => ({_isUp: d.index === 1}),
		getShapeIndices: () => ({}),
		getYScaleById: () => value => value,
		isBarType: target => target.id === "bar",
		isGrouped: () => false,
		isPointFocusOnly: () => false,
		mapToIds: list => list.map(target => target.id),
		orderTargets: list => list,
		pointR: () => 4,
		pointSelectR: () => 8,
		scale: {
			subX: value => value * 10,
			x: value => value * 100,
			y: value => value * 100
		},
		state: {
			current: {height: 180, width: 240},
			defocusedTargetIds: new Set(["scatter"]),
			domain: [1, 8],
			hasAxis: true,
			hasTreemap: false,
			height: 100,
			height2: 40,
			hiddenTargetIds: new Set(),
			margin: {left: 10, top: 20},
			margin2: {left: 10, top: 130},
			width: 140,
			width2: 120
		},
		subxx: d => d.index * 30,
		updateCircleY: () => (d, i) => i * 12 + 5,
		xx: d => d.index * 30
	};
}

describe("ESM canvas renderer coverage", () => {
	it("draws subchart bars, candlesticks, scatter points, brush handles and selections", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.BAR]: {},
				[TYPE.CANDLESTICK]: {}
			},
			pos: {}
		};

		renderer.drawSubchart(ctx, shape);
		renderer.drawSelections(ctx, shape);

		expect(renderer.ctx).to.not.be.null;
	});

	it("covers rotated subchart brush and early return branches", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();

		ctx.config.axis_rotated = true;
		renderer.drawSubchartBrush(ctx);
		renderer.drawSubchartBrushHandle(ctx, 15, "start");
		renderer.drawSubchartBrushHandle(ctx, 35, "end");

		ctx.config.subchart_show = false;
		renderer.drawSubchart(ctx, {indices: {}, pos: {}});
		renderer.drawSubchartBrush(ctx);

		ctx.config.subchart_show = true;
		ctx.state.domain = [1, 1];
		renderer.drawSubchartBrush(ctx);

		expect(renderer.ctx).to.not.be.null;
	});

	it("draws root content and delegates treemap mode", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const calls: string[] = [];

		renderer.drawBars = () => calls.push("bars");
		renderer.drawCandlesticks = () => calls.push("candles");
		renderer.drawLines = () => calls.push("lines");
		renderer.drawAreas = () => calls.push("areas");
		renderer.drawCircles = () => calls.push("circles");
		renderer.drawSelections = () => calls.push("selections");
		renderer.drawLabels = () => calls.push("labels");
		renderer.drawTreemaps = () => calls.push("treemaps");

		renderer.draw(ctx, {indices: {}, pos: {}});
		expect(calls).to.deep.equal(["bars", "candles", "areas", "lines", "circles", "selections", "labels"]);

		calls.length = 0;
		ctx.config.area_front = true;
		ctx.config.bar_front = true;
		renderer.draw(ctx, {indices: {}, pos: {}});
		expect(calls).to.deep.equal(["candles", "lines", "areas", "circles", "bars", "selections", "labels"]);

		calls.length = 0;
		ctx.state.hasTreemap = true;
		renderer.draw(ctx, {indices: {}, pos: {}});
		expect(calls).to.deep.equal(["treemaps"]);
	});

	it("draws background, empty label and brush overlays", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const container = document.createElement("div");
		const image = document.createElement("canvas");

		document.body.appendChild(container);
		ctx.$el = {
			chart: {
				node: () => container
			}
		};

		ctx.config.background = null;
		renderer.drawBackground(ctx);

		ctx.config.background = {
			class: "matrix",
			color: "#abcdef"
		};
		renderer.backgroundClassStyleCache.set("matrix", {
			opacity: 0.5,
			transform: "matrix(1, 0, 0, 1, 2, 3)"
		});
		renderer.drawBackground(ctx);

		ctx.config.background = {
			class: "matrix3d",
			imgUrl: "/loaded.png"
		};
		renderer.backgroundClassStyleCache.set("matrix3d", {
			opacity: 0.8,
			transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,4,5,0,1)"
		});
		renderer.backgroundImageCache.set("/loaded.png", {
			image,
			loaded: true,
			loading: false
		});
		renderer.drawBackground(ctx);

		ctx.config.data_empty_label_text = "No data";
		ctx.data.targets = [];
		renderer.drawEmptyLabel(ctx);

		ctx.data.targets = [{id: "data1", values: []}];
		renderer.drawEmptyLabel(ctx);
		renderer.drawZoomBrush(ctx, 10, 30);
		renderer.drawZoomBrush(ctx, 10, 10);
		renderer.drawSelectionDragArea(ctx, {x: 0, y: 0, w: 50, h: 50});
		renderer.drawSelectionDragArea(ctx, {x: -100, y: -100, w: 1, h: 1});

		ctx.config.axis_rotated = true;
		renderer.drawZoomBrush(ctx, 5, 15);

		container.remove();
		expect(renderer.ctx).to.not.be.null;
	});

	it("covers background and label image cache helper branches", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const container = document.createElement("div");
		const style = document.createElement("style");

		document.body.appendChild(container);
		document.head.appendChild(style);
		style.textContent = ".canvas-bg-probe{opacity:.35;transform:matrix(1,0,0,1,6,7)}";
		ctx.$el = {
			chart: {
				node: () => container
			}
		};
		ctx.redraw = vi.fn();
		ctx.renderCanvasFrame = vi.fn();

		expect(renderer.getLabelImage("", ctx)).to.be.null;
		expect(renderer.getBackgroundImage("", ctx)).to.be.null;

		const labelEntry = renderer.getLabelImage("/label-cache.png", ctx);

		expect(labelEntry.loading).to.be.true;
		expect(renderer.getLabelImage("/label-cache.png", ctx)).to.equal(labelEntry);
		labelEntry.image.onload();
		expect(labelEntry.loaded).to.be.true;
		expect(labelEntry.loading).to.be.false;
		expect(ctx.redraw).toHaveBeenCalledTimes(1);
		labelEntry.image.onerror();
		expect(labelEntry.loaded).to.be.false;

		const backgroundEntry = renderer.getBackgroundImage("/background-cache.png", ctx);

		expect(backgroundEntry.loading).to.be.true;
		expect(renderer.getBackgroundImage("/background-cache.png", ctx)).to.equal(backgroundEntry);
		backgroundEntry.image.onload();
		expect(backgroundEntry.loaded).to.be.true;
		expect(backgroundEntry.loading).to.be.false;
		expect(ctx.renderCanvasFrame).toHaveBeenCalledWith(undefined, null, false);
		backgroundEntry.image.onerror();
		expect(backgroundEntry.loaded).to.be.false;

		ctx.config.background = {
			color: "#135790"
		};
		renderer.drawBackground(ctx);

		ctx.config.background = {
			class: "canvas-bg-probe",
			color: "#246801"
		};
		renderer.drawBackground(ctx);
		renderer.drawBackground(ctx);

		ctx.config.background = {
			class: "canvas-bg-probe",
			imgUrl: "/background-pending.png"
		};
		renderer.drawBackground(ctx);

		style.remove();
		container.remove();
		expect(renderer.backgroundClassStyleCache.has("canvas-bg-probe")).to.be.true;
	});

	it("draws point focus, circles and data labels", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.BAR]: {},
				[TYPE.CANDLESTICK]: {}
			},
			pos: {
				cx: (d, i) => i * 20 + 10,
				cy: d => d.value
			}
		};

		ctx.canvasTheme = renderer.theme;
		ctx.config.color_onover = d => d.id === "scatter" ? "#ff00ff" : null;
		ctx.config.data_labels = {
			border: {
				fill: "#fff",
				padding: 1,
				radius: 2,
				stroke: "#111",
				strokeWidth: 1
			},
			rotate: 15
		};
		ctx.config.data_labels_backgroundColors = "#eeeeee";
		ctx.config.data_labels_position = {x: 1, y: 2};
		ctx.config.grid_focus_edge = true;
		ctx.config.grid_focus_show = true;
		ctx.config.grid_focus_y = true;
		ctx.config.point_radialGradient = {
			stops: [[0, "#fff", 1], [1, "#000", 0.2]]
		};
		ctx.config.tooltip_grouped = false;
		ctx.config.tooltip_show = true;
		ctx.dataLabelFormat = () => value => `label:${value}`;
		ctx.generateGetBarPoints = () => (d, i) => [
			[i * 20, 0],
			[i * 20, 20],
			[i * 20 + 12, 20],
			[i * 20 + 12, 0]
		];
		ctx.hasDataLabel = () => true;
		ctx.labelishData = target => target.values;
		ctx.pointExpandedR = () => 10;
		ctx.shouldDrawPointsForLine = () => true;
		ctx.state.canvasFocusMainRedraw = false;
		ctx.state.focusedTargetIds = new Set(["scatter"]);
		ctx.updateTextColor = d => d.id === "bar" ? "#123456" : null;

		renderer.drawCircles(ctx, shape, [ctx.data.targets[2].values[0]]);
		renderer.drawLabels(ctx, shape);
		renderer.drawFocus(ctx, [ctx.data.targets[2].values[0]]);
		expect(renderer.hasExpandedShapeFocus(ctx, [ctx.data.targets[2].values[0]])).to.be.false;
		expect(renderer.hasExpandedShapeFocus(ctx, [ctx.data.targets[0].values[0]])).to.be.true;
		expect(renderer.hasExpandedShapeFocus(ctx, [ctx.data.targets[1].values[0]])).to.be.true;

		ctx.config.axis_rotated = true;
		ctx.config.point_show = false;
		renderer.drawCircles(ctx, shape);
		renderer.drawFocus(ctx, [ctx.data.targets[2].values[1]]);

		expect(renderer.ctx).to.not.be.null;
	});

	it("covers focus label skip cases and loaded label images", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const valid = ctx.data.targets[2].values[0];
		const noText = ctx.data.targets[2].values[1];
		const invalidPosition = makeRow("scatter", 2, 30);

		ctx.canvasEngine = {ctx: renderer.ctx};
		ctx.canvasTheme = renderer.theme;
		ctx.config.data_labels = {
			image: {
				height: 8,
				pos: {x: 1, y: -1},
				url: "/label-image.png",
				width: 10
			},
			rotate: 0
		};
		ctx.config.data_labels_backgroundColors = () => null;
		ctx.config.data_labels_position = (type, value, id, index) =>
			index === 2 && type === "x" ? Infinity : 0;
		ctx.config.grid_focus_show = false;
		ctx.config.tooltip_show = true;
		ctx.dataLabelFormat = () => (value, id, index) =>
			index === 1 ? null : `focus:${value}`;
		ctx.hasDataLabel = () => false;
		ctx.pointExpandedR = () => 9;
		ctx.updateTextColor = () => undefined;

		renderer.drawFocus(ctx, [valid]);

		ctx.hasDataLabel = () => true;
		renderer.drawFocus(ctx, [ctx.data.targets[0].values[0]]);
		renderer.drawFocus(ctx, [valid, noText, invalidPosition]);

		const entry = renderer.labelImageCache.get("/label-image.png");

		expect(entry.loaded).to.be.false;
		entry.loaded = true;
		renderer.drawFocus(ctx, [valid]);

		ctx.config.axis_rotated = true;
		renderer.drawFocus(ctx, [valid]);

		expect(renderer.ctx).to.not.be.null;
	});

	it("draws data labels for rotated, centered and negative shapes", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.BAR]: {},
				[TYPE.CANDLESTICK]: {}
			},
			pos: {
				cx: (d, i) => i * 18 + 5,
				cy: d => d.value
			}
		};

		ctx.canvasEngine = {ctx: renderer.ctx};
		ctx.canvasTheme = renderer.theme;
		ctx.config.data_labels = {
			border: true,
			centered: false,
			rotate: 0
		};
		ctx.config.data_labels_backgroundColors = {
			bar: "#ffeeee",
			candle: null,
			scatter: undefined
		};
		ctx.config.data_labels_position = {
			bar: {x: -1, y: 1},
			x: 2,
			y: -2
		};
		ctx.data.targets[0].values = [
			makeRow("bar", 0, -10),
			makeRow("bar", 1, 20)
		];
		ctx.data.targets[1].values = [
			makeRow("candle", 0, 10),
			makeRow("candle", 1, 20)
		];
		ctx.data.targets[2].values = [
			makeRow("scatter", 0, -5),
			makeRow("scatter", 1, 0)
		];
		ctx.dataLabelFormat = () => value => `value:${value}`;
		ctx.generateGetBarPoints = () => (d, i) => [
			[i * 22, 0],
			[i * 22, d.value],
			[i * 22 + 14, d.value],
			[i * 22 + 14, 0]
		];
		ctx.hasDataLabel = () => true;
		ctx.labelishData = target => target.values;
		ctx.state.hasNegativeValue = true;
		ctx.state.hasPositiveValue = false;

		renderer.drawLabels(ctx, shape);

		ctx.config.axis_rotated = true;
		renderer.drawLabels(ctx, shape);

		ctx.config.data_labels.centered = true;
		renderer.drawLabels(ctx, shape);

		ctx.config.data_labels.rotate = 220;
		ctx.config.axis_y_inverted = true;
		renderer.drawLabels(ctx, shape);

		expect(renderer.ctx).to.not.be.null;
	});

	it("covers subchart target skip branches for optional generators", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.AREA]: {},
				[TYPE.BAR]: {},
				[TYPE.CANDLESTICK]: {},
				[TYPE.LINE]: {}
			},
			pos: {}
		};

		ctx.config.data_types = {
			area: TYPE.AREA,
			bar: TYPE.BAR,
			candle: TYPE.CANDLESTICK,
			line: TYPE.LINE
		};
		ctx.data.targets = [
			{id: "area", values: [makeRow("area", 0, null)]},
			{id: "line", values: [makeRow("line", 0, null)]},
			ctx.data.targets[0],
			ctx.data.targets[1]
		];
		ctx.generateGetBarPoints = () => null;
		ctx.generateGetCandlestickPoints = () => null;
		ctx.updateCircleY = () => null;
		renderer.drawSubchart(ctx, shape);

		ctx.generateGetBarPoints = () => (d, i) => [
			[i * 12, 0],
			[i * 12 + 6, d.value]
		];
		ctx.generateGetCandlestickPoints = () => (d, i) => [
			[i * 12, 1],
			[i * 12 + 5, 9],
			[i * 12 + 2, 0, 10]
		];
		ctx.getCandlestickData = () => null;
		ctx.subxx = null;
		ctx.updateCircleY = () => (d, i) => i * 5;
		renderer.drawSubchart(ctx, shape);

		expect(renderer.ctx).to.not.be.null;
	});

	it("draws bar and candlestick foreground paths", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.BAR]: {},
				[TYPE.CANDLESTICK]: {}
			},
			pos: {}
		};

		ctx.canvasTheme = renderer.theme;
		ctx.config.bar_connectLine = "start-end";
		ctx.config.bar_linearGradient = {
			stops: [[0, "#fff", 1], [1, null, 0.2]]
		};
		ctx.config.color_onover = {
			bar: "#ff00ff",
			candle: "#00ffff"
		};
		ctx.generateGetBarPoints = () => (d, i) => [
			[i * 20, 0],
			[i * 20, 20],
			[i * 20 + 12, 20],
			[i * 20 + 12, 0]
		];
		renderer.theme.style.shape.barLineWidth = 1;

		renderer.drawBars(ctx, shape, [ctx.data.targets[0].values[0]]);
		renderer.drawCandlesticks(ctx, shape, [ctx.data.targets[1].values[0]]);

		expect(renderer.ctx).to.not.be.null;
	});

	it("draws connect line variants and rounded bars", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const shape = {
			indices: {
				[TYPE.BAR]: {}
			},
			pos: {}
		};
		const connectLineTypes = ["start-start", "start-end", "end-start", "end-end"];

		ctx.canvasTheme = renderer.theme;
		ctx.config.bar_radius = 3;
		ctx.config.data_groups = [["bar"]];
		ctx.generateGetBarPoints = () => (d, i) => [
			[i * 20, 0],
			[i * 20, d.value],
			[i * 20 + 12, d.value],
			[i * 20 + 12, 0]
		];
		ctx.isGrouped = id => id === "bar";
		renderer.theme.style.shape.barLineWidth = 1;

		for (const axisRotated of [false, true]) {
			ctx.config.axis_rotated = axisRotated;

			for (const type of connectLineTypes) {
				ctx.config.bar_connectLine = type;
				renderer.drawBars(ctx, shape, [ctx.data.targets[0].values[1]]);
			}
		}

		expect(renderer.ctx).to.not.be.null;
	});

	it("draws rotated focus grid and treemap labels", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const focus = ctx.data.targets[2].values[0];

		ctx.config.axis_rotated = true;
		ctx.config.axis_tooltip = false;
		ctx.config.color_onover = "#ff00ff";
		ctx.config.grid_focus_edge = true;
		ctx.config.grid_focus_show = true;
		ctx.config.grid_focus_y = true;
		ctx.config.point_show = true;
		ctx.config.tooltip_grouped = false;
		ctx.config.tooltip_show = true;
		ctx.axis.getId = () => "y2";
		ctx.canvasTheme = renderer.theme;
		ctx.state.canvasFocusMainRedraw = false;

		renderer.drawFocus(ctx, [focus]);

		ctx.config.axis_rotated = false;
		ctx.config.data_type = TYPE.TREEMAP;
		ctx.config.data_types = {
			ignored: TYPE.LINE,
			tile: TYPE.TREEMAP
		};
		ctx.config.treemap_label_format = (value, ratio, id) =>
			id === "empty" ? null : `${id}:${value}:${ratio}`;
		ctx.config.treemap_label_show = true;
		ctx.config.treemap_label_threshold = 0.2;
		ctx.data.targets = [];
		ctx.getTreemapRoot = () => ({
			children: [
				{data: {id: "ignored", name: "ignored", ratio: 1, value: 1}, x0: 0, x1: 1, y0: 0, y1: 1},
				{data: {id: "tile", name: "tile", ratio: 0.1, value: 1}, x0: 0, x1: 1, y0: 0, y1: 1},
				{data: {id: "empty", name: "empty", ratio: 0.8, value: 2}, x0: 1, x1: 2, y0: 1, y1: 2},
				{data: {id: "tile", name: "tile", ratio: 0.8, value: 3}, x0: 2, x1: 4, y0: 2, y1: 4},
				{data: {id: "tile", name: "tile", ratio: 0.9, value: 4}, x0: 4, x1: 2, y0: 4, y1: 2}
			]
		});
		ctx.scale.x = value => value * 20;
		ctx.scale.y = value => value * 15;

		renderer.drawTreemaps(ctx);

		expect(renderer.ctx).to.not.be.null;
	});

	it("positions treemap labels using SVG-compatible centered option", () => {
		const {renderer} = makeRenderer();
		const ctx = makeContext();
		const records: Array<{
			text: string,
			x: number,
			y: number,
			textAlign: string,
			textBaseline: string
		}> = [];
		const fillText = vi
			.spyOn(CanvasRenderingContext2D.prototype, "fillText")
			.mockImplementation(function(text, x, y) {
				records.push({
					text: String(text),
					x: Number(x),
					y: Number(y),
					textAlign: this.textAlign,
					textBaseline: this.textBaseline
				});
			});
		const left = 20;
		const top = 10;
		const width = 100;
		const height = 70;
		const lineHeight = 10;
		renderer.ctx.font = "10px sans-serif";
		const metrics = renderer.ctx.measureText("tile");
		const fontBoundingHeight = (
			(metrics.fontBoundingBoxAscent || 0) +
			(metrics.fontBoundingBoxDescent || 0)
		) || (
			(metrics.actualBoundingBoxAscent || 0) +
			(metrics.actualBoundingBoxDescent || 0)
		);
		const textHeight = Math.max(lineHeight, fontBoundingHeight) + lineHeight;

		ctx.config.data_type = TYPE.TREEMAP;
		ctx.config.data_types = {tile: TYPE.TREEMAP};
		ctx.config.data_labels = {centered: false};
		ctx.config.treemap_label_format = () => "tile\n80%";
		ctx.config.treemap_label_show = true;
		ctx.config.treemap_label_threshold = 0;
		ctx.getTreemapRoot = () => ({
			children: [{
				data: {id: "tile", name: "tile", ratio: 0.8, value: 3},
				x0: 1,
				x1: 6,
				y0: 1,
				y1: 8
			}]
		});
		ctx.scale.x = value => value * 20;
		ctx.scale.y = value => value * 10;

		renderer.drawTreemaps(ctx);

		const nonCentered = records.find(record => record.text === "tile");
		const nonCenteredSecondLine = records.find(record => record.text === "80%");

		expect(nonCentered?.x).to.be.equal(left + 5);
		expect(nonCentered?.y).to.be.equal(top + textHeight + 5 - lineHeight);
		expect(nonCenteredSecondLine?.y).to.be.equal(top + textHeight + 5);
		expect(nonCentered?.textAlign).to.be.equal("left");
		expect(nonCentered?.textBaseline).to.be.equal("alphabetic");

		records.length = 0;
		ctx.config.data_labels.centered = true;
		renderer.drawTreemaps(ctx);

		const centered = records.find(record => record.text === "tile");
		const centeredSecondLine = records.find(record => record.text === "80%");

		expect(centered?.x).to.be.equal(left + width / 2);
		expect(centered?.y).to.be.equal(top + height / 2 - 5);
		expect(centeredSecondLine?.y).to.be.equal(top + height / 2 + 5);
		expect(centered?.textAlign).to.be.equal("center");
		expect(centered?.textBaseline).to.be.equal("middle");

		fillText.mockRestore();
	});

	it("clears image caches on destroy", () => {
		const {renderer} = makeRenderer();
		const labelImage = new Image();
		const backgroundImage = new Image();

		labelImage.onload = () => {};
		labelImage.onerror = () => {};
		backgroundImage.onload = () => {};
		backgroundImage.onerror = () => {};
		renderer.labelImageCache.set("/label.png", {
			image: labelImage,
			loaded: false,
			loading: true
		});
		renderer.backgroundImageCache.set("/bg.png", {
			image: backgroundImage,
			loaded: false,
			loading: true
		});
		renderer.backgroundClassStyleCache.set("bg", {opacity: 0.5});

		renderer.destroy();

		expect(labelImage.onload).to.be.null;
		expect(backgroundImage.onerror).to.be.null;
		expect(renderer.labelImageCache.size).to.be.equal(0);
		expect(renderer.backgroundImageCache.size).to.be.equal(0);
		expect(renderer.backgroundClassStyleCache.size).to.be.equal(0);
	});
});
