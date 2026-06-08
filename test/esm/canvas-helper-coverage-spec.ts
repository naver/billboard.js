/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
import {describe, expect, it} from "vitest";

import {parseCanvasColor, withOpacity} from "../../src/canvas/color";
import CanvasPainter from "../../src/canvas/CanvasPainter";
import CanvasTheme from "../../src/canvas/CanvasTheme";
import {getCanvasBarGeometry, getCanvasCandlestickGeometry} from "../../src/canvas/geometry";
import {
	createCanvasPointOccupancyGrid,
	getCanvasComparableValue,
	getCanvasComparableXDomain,
	getCanvasShapeIndices,
	getCanvasTargetType,
	getCanvasTargetVisibleRange,
	hasCanvasDrawableValue,
	isCanvasAreaType,
	isCanvasBarType,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasGroupedType,
	isCanvasLineType,
	isCanvasPointType,
	isCanvasScatterType,
	isCanvasTargetSupported,
	isCanvasTreemapType,
	isFiniteCanvasCoordinate,
	markCanvasPointOccupancy
} from "../../src/canvas/util";
import {drawPointPattern} from "../../src/canvas/pointPattern";
import {
	drawLabelDecorations,
	getCanvasTextAlign,
	getLabelBackgroundColor,
	getLabelImageOption,
	getLabelImagePosition,
	getLabelImageUrl,
	getLabelPosition,
	getLabelRotateAnchor,
	getPointLabelAnchor,
	getRotatedLabelPosition
} from "../../src/canvas/labels";
import {TYPE} from "../../src/config/const";

describe("ESM canvas helper coverage", () => {
	function getContext() {
		const ctx = document.createElement("canvas").getContext("2d")!;

		ctx.font = "10px sans-serif";

		return ctx;
	}

	function getInternal(config = {}) {
		const ctx = getContext();

		return {
			api: {},
			axis: {
				getId: () => "y"
			},
			canvasEngine: {ctx},
			color: () => "#123456",
			config: {
				axis_rotated: false,
				axis_y_inverted: false,
				data_labels: {rotate: 0},
				data_labels_backgroundColors: null,
				data_labels_position: null,
				data_type: "line",
				data_types: {},
				point_r: 4,
				...config
			},
			dataLabelFormat: () => value => value,
			getBubbleZData: value => value.z,
			getCandlestickData: () => ({close: 7, _isUp: false}),
			isBubbleZType: () => false,
			isCandlestickType: () => false,
			state: {
				hasNegativeValue: false,
				hasPositiveValue: true
			},
			updateTextColor: () => null
		};
	}

	describe("color", () => {
		it("applies opacity to supported CSS color values", () => {
			expect(withOpacity("#abc", 0.5)).to.be.equal("rgba(170,187,204,0.5)");
			expect(withOpacity("#aabbcc", 0.25)).to.be.equal("rgba(170,187,204,0.25)");
			expect(withOpacity("rgb(1, 2, 3)", 0.4)).to.be.equal("rgba(1, 2, 3,0.4)");
			expect(withOpacity("rgba(1, 2, 3, 0.5)", 0.4)).to.be.equal("rgba(1, 2, 3,0.2)");
			expect(withOpacity("red", 0.5)).to.be.equal("rgba(255,0,0,0.5)");
			expect(withOpacity("not-a-color", 0.5)).to.be.equal("not-a-color");
			expect(withOpacity("red", 1)).to.be.equal("red");
			expect(withOpacity("red", undefined as any)).to.be.equal("red");
			expect(parseCanvasColor("not-a-color")).to.be.null;
		});
	});

	describe("util", () => {
		function makeScale(domain = [0, 10]) {
			const scale = value => Number(value);

			scale.domain = () => domain;

			return scale;
		}

		it("resolves canvas type helpers and grouped support branches", () => {
			const $$ = {
				config: {
					data_type: TYPE.LINE,
					data_types: {
						area: TYPE.AREA,
						bar: TYPE.BAR,
						bubble: TYPE.BUBBLE,
						candle: TYPE.CANDLESTICK,
						scatter: TYPE.SCATTER,
						treemap: TYPE.TREEMAP
					}
				},
				getShapeIndices: () => ({generated: true}),
				isGrouped: id => id === "bar"
			};

			expect(getCanvasShapeIndices($$, {indices: {bar: {cached: true}}}, "bar", () => true))
				.to.deep.equal({cached: true});
			expect(getCanvasShapeIndices($$, {indices: {}}, "bar", () => true))
				.to.deep.equal({generated: true});
			expect(getCanvasTargetType($$.config, "missing")).to.be.equal(TYPE.LINE);
			expect(getCanvasTargetType({data_types: {}}, undefined)).to.be.equal(TYPE.LINE);
			expect(isCanvasBarType($$, "bar")).to.be.true;
			expect(isCanvasAreaType($$, "area")).to.be.true;
			expect(isCanvasLineType($$, "area")).to.be.true;
			expect(isCanvasScatterType($$, "scatter")).to.be.true;
			expect(isCanvasBubbleType($$, "bubble")).to.be.true;
			expect(isCanvasPointType($$, "bubble")).to.be.true;
			expect(isCanvasCandlestickType($$, "candle")).to.be.true;
			expect(isCanvasTreemapType($$, "treemap")).to.be.true;
			expect(isCanvasGroupedType($$.config, "bar")).to.be.true;
			expect(isCanvasGroupedType($$.config, "area")).to.be.true;
			expect(isCanvasGroupedType($$.config, "scatter")).to.be.false;
			expect(isCanvasTargetSupported($$, "bar")).to.be.false;
			expect(isCanvasTargetSupported($$, "bar", [isCanvasBarType])).to.be.true;
			expect(isCanvasTargetSupported($$, "scatter")).to.be.true;
		});

		it("resolves comparable x domains and visible ranges", () => {
			const target = {
				id: "data1",
				values: [0, 1, 2, 3, 4].map(index => ({x: index, value: index}))
			};
			const $$ = {
				scale: {x: makeScale([1, 3]), zoom: null},
				state: {dataGeneration: 1}
			};

			expect(getCanvasComparableValue(new Date(10))).to.be.equal(10);
			expect(getCanvasComparableValue("bad")).to.be.null;
			expect(getCanvasComparableXDomain($$)).to.deep.equal([1, 3]);
			expect(getCanvasTargetVisibleRange($$, target, 0)).to.deep.equal({start: 1, end: 4});
			expect(getCanvasTargetVisibleRange($$, target, 0)).to.deep.equal({start: 1, end: 4});

			$$.scale.zoom = makeScale([3, 1]);
			expect(getCanvasComparableXDomain($$)).to.deep.equal([1, 3]);

			const descending = {
				id: "data2",
				values: [4, 3, 2, 1, 0].map(index => ({x: index, value: index}))
			};

			expect(getCanvasTargetVisibleRange($$, descending, 1)).to.deep.equal({start: 1, end: 4});
			expect(getCanvasTargetVisibleRange({
				scale: {x: makeScale(["bad", 3]), zoom: null},
				state: {}
			}, target)).to.deep.equal({start: 0, end: 5});
			expect(getCanvasTargetVisibleRange($$, {
				id: "bad",
				values: [{x: "bad", value: 1}, {x: 2, value: 2}]
			})).to.deep.equal({start: 0, end: 2});
			expect(getCanvasTargetVisibleRange($$, null)).to.deep.equal({start: 0, end: 0});
		});

		it("checks drawable values, coordinates and occupancy grid boundaries", () => {
			const $$ = {
				getBaseValue: d => d.value
			};
			const grid = createCanvasPointOccupancyGrid(1, 1, 0);

			expect(hasCanvasDrawableValue($$, {value: 0})).to.be.true;
			expect(hasCanvasDrawableValue($$, {value: null})).to.be.false;
			expect(isFiniteCanvasCoordinate(1, 2)).to.be.true;
			expect(isFiniteCanvasCoordinate(1, Infinity)).to.be.false;
			expect(markCanvasPointOccupancy(grid, 0, 0)).to.be.true;
			expect(markCanvasPointOccupancy(grid, 0, 0)).to.be.false;
			expect(markCanvasPointOccupancy(grid, -10, 0)).to.be.false;
			expect(markCanvasPointOccupancy(grid, 0, 10)).to.be.false;
		});
	});

	describe("geometry and point patterns", () => {
		it("covers painter no-op style and zero-radius rectangle paths", () => {
			const painter = new CanvasPainter(getContext());

			painter.applyStyle();
			painter.fillRoundRect({x: 10, y: 10, w: -5, h: -4}, 0);
			painter.strokeRoundRect({x: 10, y: 10, w: -5, h: -4}, 0);
			painter.textLines("a\nb", 0, 0, {maxWidth: 20});

			expect(painter.context).to.not.be.null;
		});

		it("returns null for non-finite canvas geometry", () => {
			const $$ = {
				config: {axis_rotated: false}
			};

			expect(getCanvasBarGeometry($$, () => [
				[0, 0],
				[Infinity, 10]
			], {}, 0)).to.be.null;
			expect(getCanvasCandlestickGeometry($$, () => [
				[0, 0],
				[10, 10],
				[5, Infinity, 20]
			], {}, 0)).to.be.null;
			expect(getCanvasCandlestickGeometry($$, () => [
				[0, 0],
				[10, 10],
				[5, 0, 20]
			], {}, 0)).to.not.be.null;
		});

		it("draws custom SVG point patterns and falls back for invalid ones", () => {
			const ctx = getContext();
			const painter = new CanvasPainter(ctx);
			const pattern = `
				<svg viewBox="0 0 10 10">
					<defs>
						<linearGradient id="g" x1="bad" y1="0%" x2="100%" y2="100%">
							<stop offset="bad" stop-color="#fff" stop-opacity=".5" />
							<stop offset="75%" stop-color="#000" />
						</linearGradient>
						<symbol id="s">
							<rect x="1" y="1" width="3" height="4" fill="url(#g)" stroke="none" />
						</symbol>
					</defs>
					<use href="#s" x="1" y="2" />
					<polyline points="0,0 5,5 10,0" fill="none" stroke="#123" />
					<path d="M1 1 L9 9" fill="none" stroke="#456" />
				</svg>
			`;

			drawPointPattern(painter, pattern, 10, 10, 6, {
				fill: "#111",
				stroke: "#222",
				lineWidth: 2
			}, 3);
			drawPointPattern(painter, "<svg></svg>", 10, 10, 6, {fill: "#111"});
			drawPointPattern(painter, "not-svg", 10, 10, 6, {fill: "#111"});

			expect(ctx).to.not.be.null;
		});
	});

	describe("labels", () => {
		it("resolves label position and image options", () => {
			const datum = {id: "data1", index: 2, value: 10};
			const $$ = getInternal({
				data_labels: {
					image(value, id, index) {
						return value === 10 ? {
							url: "/img/{=ID}.png",
							width: index,
							height: 5
						} : null;
					}
				},
				data_labels_position(type, value, id, index, texts) {
					expect(this).to.be.equal($$.api);
					expect([type, value, id, index, texts]).to.be.deep.equal(["x", 10, "data1", 2, []]);

					return 12;
				}
			});

			const image = getLabelImageOption($$, datum);

			expect(getLabelPosition($$, datum, "x", [])).to.be.equal(12);
			expect(image).to.include({url: "/img/{=ID}.png", width: 2, height: 5});
			expect(getLabelImageUrl(image!, datum)).to.be.equal("/img/data1.png");
			expect(getLabelImageOption(getInternal({data_labels: {image: {url: "/static.png"}}}), datum))
				.to.deep.include({url: "/static.png", width: 0, height: 0});
		});

		it("positions label images for rotated and non-rotated axes", () => {
			const datum = {id: "data1", index: 0, value: 10};
			const option = {url: "/img.png", width: 20, height: 10, pos: {x: 1, y: 2}};
			const normal = getLabelImagePosition(getInternal(), option, "label", 50, 60);
			const rotated = getLabelImagePosition(getInternal({axis_rotated: true}), option, "label", 50, 60);

			expect(normal.textX).to.be.equal(50);
			expect(normal.textY).to.be.equal(65);
			expect(rotated.textX).to.be.equal(60);
			expect(rotated.textY).to.be.equal(60);
		});

		it("resolves label background colors and draws decorations", () => {
			const datum = {id: "data1", index: 0, value: 10};
			const $$ = getInternal({
				data_labels: {
					border: {
						fill: "#ffffff",
						padding: "1 2",
						radius: 3,
						stroke: "#000000",
						strokeWidth: 2
					},
					rotate: 90
				},
				data_labels_backgroundColors: "#eeeeee"
			});
			const calls: string[] = [];
			const painter = {
				context: $$.canvasEngine.ctx,
				fillRoundRect(box, radius, options) {
					calls.push(`fill:${radius}:${options.fill}`);
				},
				strokeRoundRect(box, radius, options) {
					calls.push(`stroke:${radius}:${options.stroke}:${options.lineWidth}`);
				},
				withState(callback) {
					callback({
						rotate: () => calls.push("rotate"),
						translate: () => calls.push("translate")
					});
				}
			};

			expect(getLabelBackgroundColor($$, datum)).to.be.equal("#eeeeee");
			expect(getLabelBackgroundColor(getInternal({
				data_labels_backgroundColors(color, d) {
					return `${color}:${d.id}`;
				}
			}), datum)).to.be.equal("#123456:data1");
			expect(getLabelBackgroundColor(getInternal({
				data_labels_backgroundColors: {data1: null, data2: "blue"}
			}), datum)).to.be.null;

			drawLabelDecorations($$, painter, datum, "label", 50, 60);

			expect(calls).to.include.members([
				"translate",
				"rotate",
				"fill:3:#eeeeee",
				"fill:3:#ffffff",
				"stroke:3:#000000:2"
			]);
		});

		it("resolves rotated label anchors and positions", () => {
			expect(getLabelRotateAnchor(90)).to.be.equal("end");
			expect(getLabelRotateAnchor(180)).to.be.equal("middle");
			expect(getLabelRotateAnchor(200)).to.be.equal("start");
			expect(getCanvasTextAlign("start")).to.be.equal("left");
			expect(getCanvasTextAlign("middle")).to.be.equal("center");
			expect(getCanvasTextAlign("end")).to.be.equal("right");

			expect(getRotatedLabelPosition(getInternal({
				axis_rotated: true,
				data_labels: {rotate: 200}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 18,
				y: 24,
				textAlign: "left"
			});
			expect(getRotatedLabelPosition(getInternal({
				axis_rotated: true,
				data_labels: {rotate: 90}
			}), {id: "data1", value: -10}, 10, 20)).to.deep.equal({
				x: 2,
				y: 24,
				textAlign: "right"
			});
			expect(getRotatedLabelPosition(getInternal({
				axis_y_inverted: true,
				data_labels: {rotate: 200}
			}), {id: "data1", value: -10}, 10, 20)).to.deep.equal({
				x: 14,
				y: 19,
				textAlign: "left"
			});
			expect(getRotatedLabelPosition(getInternal({
				data_labels: {rotate: 180}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 10,
				y: 12,
				textAlign: "center"
			});
		});

		it("resolves point label anchors for rotated, bubble and line-like data", () => {
			const datum = {id: "data1", value: 10};
			const rotatedCtx = getContext();
			const bubbleCtx = getContext();
			const lineCtx = getContext();
			const negativeCtx = getContext();

			expect(getPointLabelAnchor(getInternal({axis_rotated: true}), rotatedCtx, datum, 10, 20))
				.to.deep.equal({x: 16, y: 20});
			expect(rotatedCtx.textAlign).to.be.equal("left");
			expect(rotatedCtx.textBaseline).to.be.equal("middle");

			expect(getPointLabelAnchor(getInternal({data_type: "bubble"}), bubbleCtx, datum, 10, 20))
				.to.deep.equal({x: 10, y: 20});
			expect(bubbleCtx.textAlign).to.be.equal("center");
			expect(bubbleCtx.textBaseline).to.be.equal("middle");

			expect(getPointLabelAnchor(getInternal({data_type: "line", point_r: 10}), lineCtx,
				datum, 10, 20).y).to.be.lessThan(20);
			expect(lineCtx.textBaseline).to.be.equal("bottom");

			expect(getPointLabelAnchor(getInternal({
				axis_y_inverted: true,
				data_type: "scatter",
				point_r: 10
			}), negativeCtx, {id: "data1", value: -1}, 10, 20).y).to.be.lessThan(20);
			expect(negativeCtx.textBaseline).to.be.equal("bottom");
		});
	});

	describe("CanvasTheme", () => {
		it("maps supported SVG selectors to canvas drawing style overrides", () => {
			const container = document.createElement("div");
			const theme = new CanvasTheme();

			document.body.appendChild(container);
			theme.load(container, {
				selectors: {
					"svg.bb g.bb-axis > path.domain": {stroke: "#111111", strokeWidth: 2},
					".bb-axis line": {stroke: "#222222", "stroke-width": 3},
					".bb-axis text": {
						fill: "#333333",
						fontStyle: "italic",
						fontSize: "12px",
						fontFamily: "Arial"
					},
					".bb-axis-x text": {fill: "#444444", font: "10px serif"},
					".bb-axis-y text": {fill: "#555555", font: "11px serif"},
					".bb-axis-y2 text": {fill: "#666666", font: "12px serif"},
					".bb-axis .tick._active_ text": {fill: "#777777"},
					".bb-axis-x-label": {fill: "#888888", font: "13px serif"},
					".bb-axis-y-label": {fill: "#999999", font: "14px serif"},
					".bb-axis-y2-label": {fill: "#aaaaaa", font: "15px serif"},
					".bb-grid line": {
						stroke: "#bbbbbb",
						"stroke-width": 4,
						"stroke-dasharray": "2 3"
					},
					".bb-grid text": {fill: "#cccccc", font: "16px serif"},
					".bb-grid .bb-xgrid-focus": {
						stroke: "#dddddd",
						"stroke-width": 5,
						"stroke-dasharray": [4, 5]
					},
					".bb-region": {fill: "#eeeeee", opacity: 0.5},
					".bb-region text": {fill: "#010101", font: "17px serif"},
					".bb-bar": {opacity: 0.4, stroke: "#020202", "stroke-width": 6},
					".bb-bar._expanded_": {opacity: 0.6},
					".bb-candlestick": {"stroke-width": 7},
					".bb-candlestick._expanded_": {opacity: 0.7},
					".bb-line": {stroke: "#030303", "stroke-width": 8},
					".bb-target.bb-focused .bb-line": {"stroke-width": 9},
					".bb-target.bb-defocused": {opacity: 0.2},
					".bb-area": {opacity: 0.3},
					".bb-circle": {fill: "#040404", stroke: "#050505", "stroke-width": 10},
					".bb-selected-circle": {fill: "#060606", stroke: "#070707", "stroke-width": 11},
					".bb-circle._expanded_": {fill: "#080808", stroke: "#090909", "stroke-width": 12},
					".bb-zoom-brush": {fill: "#101010", opacity: 0.8},
					".bb-brush .selection": {fill: "#111111", opacity: 0.9},
					".bb-brush .handle--custom": {
						fill: "#121212",
						opacity: 0.6,
						stroke: "#131313",
						"stroke-width": 13
					},
					".bb-chart-treemaps rect": {stroke: "#141414", "stroke-width": 14},
					".bb-empty": {fill: "#151515", font: "18px serif"},
					".bb-text": {fill: "#161616", font: "19px serif"},
					".bb-title": {fill: "#171717", font: "20px serif"},
					".unknown-selector": {fill: "#ffffff"}
				},
				axis: {
					labelColor: "#181818",
					labelFont: "21px serif"
				},
				grid: {
					dashArray: "6, 7"
				}
			});

			expect(theme.style.axis.lineColor).to.be.equal("#111111");
			expect(theme.style.axis.tickColor).to.be.equal("#222222");
			expect(theme.style.axis.xLabelColor).to.be.equal("#181818");
			expect(theme.style.axis.y2TickFont).to.be.equal("21px serif");
			expect(theme.style.axis.activeLabelColor).to.be.equal("#777777");
			expect(theme.style.grid.lineWidth).to.be.equal(4);
			expect(theme.style.grid.dashArray).to.be.deep.equal([6, 7]);
			expect(theme.style.focusGrid.dashArray).to.be.deep.equal([4, 5]);
			expect(theme.style.region).to.include({fill: "#eeeeee", opacity: 0.5});
			expect(theme.style.shape).to.include({
				barOpacity: 0.4,
				barExpandedOpacity: 0.6,
				barLineWidth: 6,
				candlestickLineWidth: 7,
				candlestickExpandedOpacity: 0.7,
				lineWidth: 8,
				lineFocusedWidth: 9,
				targetDefocusedOpacity: 0.2,
				areaOpacity: 0.3,
				pointLineWidth: 10
			});
			expect(theme.style.selectedPoint).to.deep.include({fill: "#060606", lineWidth: 11});
			expect(theme.style.focusPoint).to.deep.include({fill: "#080808", lineWidth: 12});
			expect(theme.style.zoomBrush).to.deep.equal({fill: "#101010", opacity: 0.8});
			expect(theme.style.subchartBrush).to.deep.include({
				fill: "#111111",
				opacity: 0.9,
				handleFill: "#121212",
				handleOpacity: 0.6,
				handleStroke: "#131313",
				handleLineWidth: 13
			});
			expect(theme.style.treemap).to.deep.include({stroke: "#141414", lineWidth: 14});
			expect(theme.style.emptyLabel).to.deep.include({color: "#151515", font: "18px serif"});
			expect(theme.style.label).to.deep.include({color: "#161616", font: "19px serif"});
			expect(theme.style.title).to.deep.include({color: "#171717", font: "20px serif"});

			container.remove();
		});
	});
});
