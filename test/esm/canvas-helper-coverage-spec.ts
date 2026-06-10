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
	getExpandedFocusMatcher,
	getLabelBackgroundColor,
	getLabelBorderOption,
	getLabelColor,
	getLabelDecorationBox,
	getLabelImageOption,
	getLabelImagePosition,
	getLabelImageUrl,
	getLabelPosition,
	getLabelRotateAnchor,
	getLabelText,
	getLabelValue,
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

		it("positions multiline text using SVG tspan offsets", () => {
			const ctx = getContext();
			const painter = new CanvasPainter(ctx);
			const calls = [];
			const originalFillText = ctx.fillText;

			ctx.fillText = function(text, x, y, maxWidth) {
				calls.push([`${text}`, x, y, maxWidth]);
			};

			try {
				painter.textLines("a\nb", 10, 20);
				expect(calls).to.deep.equal([
					["a", 0, -10, undefined],
					["b", 0, 0, undefined]
				]);

				calls.length = 0;
				painter.textLines("a\nb\nc", 10, 20, {font: "12px sans-serif", maxWidth: 30});
				expect(calls).to.deep.equal([
					["a", 0, -24, 30],
					["b", 0, -12, 30],
					["c", 0, 0, 30]
				]);
			} finally {
				ctx.fillText = originalFillText;
			}
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

		it("draws additional custom SVG point pattern primitives", () => {
			const ctx = getContext();
			const painter = new CanvasPainter(ctx);
			const pattern = `
				<svg>
					<defs>
						<radialGradient id="rg" cx="50%" cy="bad" r="100%" fx="bad" fy="25%" fr="bad">
							<stop offset="150%" stop-color="#f00" stop-opacity=".5" />
							<stop offset="-1" style="stop-color:#0f0;stop-opacity:.25" />
						</radialGradient>
						<g id="loop"><use href="#loop" /></g>
					</defs>
					<g transform="translate(1 2) scale(2) rotate(45) matrix(1 0 0 1 1 1)">
						<circle cx="4" cy="4" r="2" fill="url(#rg)" />
						<ellipse cx="5" cy="6" rx="3" ry="2" stroke="url(#missing)" />
						<polygon points="0,0 4,4 8,0" />
						<line x1="0" y1="8" x2="8" y2="8" />
						<rect width="0" height="5" />
						<path />
					</g>
					<use xlink:href="#missing" />
					<use href="#loop" />
				</svg>
			`;

			drawPointPattern(painter, pattern, 10, 10, 6, {
				fill: "#111",
				stroke: "#222",
				lineWidth: 2
			});
			drawPointPattern(painter, pattern, 10, 10, 3, {
				fill: "#111",
				stroke: "#222",
				lineWidth: 2
			});
			drawPointPattern(painter, "circle", 10, 10, 4, {fill: "#111"});
			drawPointPattern(painter, "circle", 10, 10, 0, {fill: "#111"});

			expect(ctx).to.not.be.null;
		});

		it("draws custom SVG point patterns with inherited styles and transform edge cases", () => {
			const ctx = getContext();
			const painter = new CanvasPainter(ctx);
			const originalPath2D = window.Path2D;
			const pattern = `
				<g fill="none" stroke="url(#lg)" opacity=".5"
					transform="translate(2) scale(1.5) rotate(30 4 4) skewX(10) skewY(5) matrix(1 0 0 1 1 1)">
					<defs>
						<linearGradient id="empty"></linearGradient>
						<linearGradient id="lg" x1="2" y1="3" x2="8" y2="bad">
							<stop offset=".25" style="stop-color:#f00;stop-opacity:.8" />
							<stop offset="bad" stop-color="#00f" />
						</linearGradient>
					</defs>
					<polyline points="0,0 5,5 10" />
					<polygon points="" />
					<circle r="0" />
					<ellipse rx="0" ry="2" />
					<rect x="bad" y="2" width="3" height="4" fill="none" stroke="#111"
						stroke-width="2" fill-opacity=".2" stroke-opacity=".4" />
					<line x1="1" y1="2" x2="bad" y2="4" fill="#222" stroke="none" />
					<path d="M0 0 L5 5" fill="none" stroke="#333" />
					<use href="" xlink:href="#missing" />
				</g>
			`;

			drawPointPattern(painter, pattern, 10, 10, 8, {
				fill: "#aaa",
				stroke: "#bbb",
				lineWidth: 1
			}, 4);
			drawPointPattern(painter, pattern, 10, 10, 4, {
				fill: "#aaa",
				stroke: "#bbb",
				lineWidth: 1
			}, 0);

			window.Path2D = undefined;
			drawPointPattern(painter, pattern, 10, 10, 5, {
				fill: "#aaa",
				stroke: "#bbb",
				lineWidth: 1
			});
			window.Path2D = originalPath2D;

			expect(ctx).to.not.be.null;
		});
	});

	describe("labels", () => {
		it("resolves label values, text and expanded focus matchers", () => {
			const datum = {id: "data1", index: 1, value: 10};
			const bubble = {
				...getInternal(),
				isBubbleZType: () => true
			};
			const candle = {
				...getInternal(),
				isCandlestickType: () => true,
				getCandlestickData: () => ({close: 99})
			};
			const emptyCandle = {
				...getInternal(),
				isCandlestickType: () => true,
				getCandlestickData: () => null
			};

			expect(getLabelValue(bubble, {value: {z: 7}})).to.be.equal(7);
			expect(getLabelValue(candle, datum)).to.be.equal(99);
			expect(getLabelValue(emptyCandle, datum)).to.be.equal(10);
			expect(getLabelText({
				...getInternal(),
				dataLabelFormat: () => () => null
			}, datum)).to.be.null;
			expect(getLabelText({
				...getInternal(),
				dataLabelFormat: () => () => undefined
			}, datum)).to.be.null;
			expect(getLabelText({
				...getInternal(),
				dataLabelFormat: () => () => 123
			}, datum)).to.be.equal("123");

			const groupedMatcher = getExpandedFocusMatcher(getInternal({
				tooltip_grouped: true
			}), [
				{id: "data1", index: 2},
				{id: "data2", index: 2}
			], () => true);

			expect(getExpandedFocusMatcher(getInternal(), null, () => true)(datum)).to.be.false;
			expect(groupedMatcher({id: "data3", index: 2})).to.be.true;
			expect(groupedMatcher({id: "data3", index: 3})).to.be.false;

			const matcher = getExpandedFocusMatcher(getInternal(), [
				{id: "data1", index: 1},
				null,
				{id: "data2", index: 1}
			], ($$, d) => d.id === "data1");

			expect(matcher(datum)).to.be.true;
			expect(matcher({id: "data2", index: 1})).to.be.false;
		});

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
			expect(getLabelPosition(getInternal({
				data_labels_position: {
					other: {x: 5},
					x: 7
				}
			}), datum, "x", [])).to.be.equal(7);
			expect(image).to.include({url: "/img/{=ID}.png", width: 2, height: 5});
			expect(getLabelImageUrl(image!, datum)).to.be.equal("/img/data1.png");
			expect(getLabelImageOption($$, {...datum, value: 0})).to.be.null;
			expect(getLabelImageOption(getInternal({data_labels: {image: {url: "/static.png"}}}), datum))
				.to.deep.include({url: "/static.png", width: 0, height: 0});
			expect(getLabelImageOption(getInternal({
				data_labels: {
					image: {
						height: 4,
						pos: {x: 1},
						width: 3
					}
				}
			}), datum)).to.deep.include({url: "", width: 3, height: 4});
			expect(getLabelImageOption(getInternal({data_labels: false}), datum)).to.be.null;
		});

		it("positions label images for rotated and non-rotated axes", () => {
			const datum = {id: "data1", index: 0, value: 10};
			const option = {url: "/img.png", width: 20, height: 10, pos: {x: 1, y: 2}};
			const normal = getLabelImagePosition(getInternal(), option, "label", 50, 60);
			const rotated = getLabelImagePosition(getInternal({axis_rotated: true}), option, "label", 50, 60);
			const treemap = getLabelImagePosition({
				...getInternal(),
				isTreemapType: () => true
			}, option, "label", 50, 60, datum);

			expect(normal.textX).to.be.equal(50);
			expect(normal.textY).to.be.equal(65);
			expect(rotated.textX).to.be.equal(60);
			expect(rotated.textY).to.be.equal(60);
			expect(getLabelImagePosition(getInternal(), {url: "/img.png"}, "label", 20, 30))
				.to.deep.include({textX: 20, textY: 30});
			expect(treemap.textX).to.be.equal(normal.textX);
			expect(treemap.textY).to.be.equal(normal.textY);
			expect(treemap.y).to.be.lessThan(normal.y);
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
			expect(getLabelColor({
				color: () => null,
				updateTextColor: () => "#101010"
			}, datum, "#202020")).to.be.equal("#101010");
			expect(getLabelColor({
				color: () => null,
				updateTextColor: () => null
			}, datum, "#202020")).to.be.equal("#202020");
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

		it("includes alphabetic baseline descent in label decoration boxes", () => {
			const ctx = {
				font: "10px sans-serif",
				textAlign: "center",
				textBaseline: "alphabetic",
				measureText: () => ({
					width: 20,
					fontBoundingBoxAscent: 10,
					fontBoundingBoxDescent: 2
				})
			};
			const box = getLabelDecorationBox(ctx, "30", 50, 60);

			expect(box).to.deep.equal({
				x: 40,
				y: 50,
				w: 20,
				h: 12
			});
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
			expect(getRotatedLabelPosition(getInternal({
				axis_rotated: true,
				data_labels: {rotate: 180}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 18,
				y: 12,
				textAlign: "center"
			});
			expect(getRotatedLabelPosition(getInternal({
				axis_rotated: true,
				data_labels: {rotate: 90}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 10,
				y: 24,
				textAlign: "right"
			});
			expect(getRotatedLabelPosition(getInternal({
				axis_y_inverted: true,
				data_labels: {rotate: 90}
			}), {id: "data1", value: -10}, 10, 20)).to.deep.equal({
				x: 6,
				y: 19,
				textAlign: "right"
			});
			expect(getRotatedLabelPosition(getInternal({
				data_labels: {rotate: 90}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 6,
				y: 20,
				textAlign: "right"
			});
			expect(getRotatedLabelPosition(getInternal({
				axis_y_inverted: true,
				data_labels: {rotate: 200}
			}), {id: "data1", value: 10}, 10, 20)).to.deep.equal({
				x: 14,
				y: 27,
				textAlign: "left"
			});
			expect(getRotatedLabelPosition({
				...getInternal({
					axis_y_inverted: true,
					data_labels: {rotate: 200},
					data_type: TYPE.CANDLESTICK
				}),
				getCandlestickData: () => ({_isUp: true})
			}, {id: "data1", value: [1, 2, 3, 4]}, 10, 20)).to.deep.equal({
				x: 14,
				y: 33,
				textAlign: "left"
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

		it("covers label border defaults, boxes and inverted anchors", () => {
			const ctx = getContext();

			ctx.textAlign = "right";
			ctx.textBaseline = "bottom";
			expect(getLabelBorderOption(false)).to.be.null;
			expect(getLabelBorderOption(true)).to.deep.include({
				radius: 10,
				stroke: "#000",
				strokeWidth: 1,
				fill: "none"
			});
			expect(getLabelBorderOption({
				padding: {top: 1, right: 2, bottom: 3, left: 4},
				radius: "bad",
				strokeWidth: "bad"
			}).padding.left).to.be.equal(4);
			expect(getLabelDecorationBox(ctx, "abc", 20, 30).x).to.be.lessThan(20);

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			expect(getLabelDecorationBox(ctx, "a\nb", 20, 30, {
				top: 1,
				right: 2,
				bottom: 3,
				left: 4
			}).h).to.be.greaterThan(20);
			expect(getLabelDecorationBox({
				font: "bad",
				measureText: () => ({}),
				textAlign: "start",
				textBaseline: "top"
			}, "", 20, 30).h).to.be.equal(12);

			const invertedPositive = getContext();
			const zeroNegative = getContext();

			expect(getPointLabelAnchor(getInternal({
				axis_y_inverted: true,
				data_type: "line"
			}), invertedPositive, {id: "data1", value: 1}, 10, 20).y).to.be.greaterThan(20);
			expect(invertedPositive.textBaseline).to.be.equal("top");
			expect(getPointLabelAnchor({
				...getInternal({
					data_type: "line"
				}),
				state: {
					hasNegativeValue: true,
					hasPositiveValue: false
				}
			}, zeroNegative, {id: "data1", value: 0}, 10, 20).y).to.be.greaterThan(20);
			expect(zeroNegative.textBaseline).to.be.equal("top");
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

		it("reloads cached theme inputs and maps selector aliases", () => {
			const container = document.createElement("div");
			const theme = new CanvasTheme();
			let loadCount = 0;

			document.body.appendChild(container);
			theme.load(container);

			const originalLoad = theme.load.bind(theme);

			theme.load = (...args) => {
				loadCount++;
				return originalLoad(...args);
			};
			theme.reload(container);
			expect(loadCount).to.be.equal(0);

			container.className = "theme-a";
			theme.reload(container);
			expect(loadCount).to.be.equal(1);

			container.setAttribute("style", "color: rgb(1, 2, 3)");
			theme.reload(container, {
				selectors: {
					".bb-axis .domain": {stroke: "transparent", strokeWidth: "bad"},
					".bb-axis .tick line": {stroke: "none", strokeWidth: 0},
					".bb-axis .tick text": {
						fill: "rgba(0, 0, 0, 0)",
						fontSize: "",
						fontFamily: "Arial"
					},
					".tick._active_ text": {fill: "#123123"},
					".bb-grid .bb-xgrid": {stroke: "#010203", strokeDasharray: "0 bad 8"},
					".bb-xgrid-focus line": {stroke: "#020304"},
					".bb-region rect": {fill: "#030405", fillOpacity: 0.25},
					".bb-brush .extent": {fill: "#040506", fillOpacity: 0.5},
					".bb-chart-treemaps rect": {stroke: "#050607"}
				}
			});

			expect(loadCount).to.be.equal(2);
			expect(theme.style.axis.activeLabelColor).to.be.equal("#123123");
			expect(theme.style.grid.dashArray).to.deep.equal([8]);
			expect(theme.style.region.opacity).to.be.equal(0.25);
			expect(theme.style.subchartBrush.opacity).to.be.equal(0.5);

			container.remove();
		});

		it("normalizes theme override fallbacks and composed font selector values", () => {
			const container = document.createElement("div");
			const theme = new CanvasTheme();

			document.body.appendChild(container);
			theme.load(container, {
				selectors: {
					".bb-axis text": {
						fontSize: "13px",
						fontFamily: "Arial",
						fontStyle: "italic",
						fontVariant: "small-caps",
						fontWeight: "700",
						lineHeight: "18px"
					},
					".bb-grid line": {strokeDasharray: [0, 4, Number.NaN, 6]},
					".bb-circle": {stroke: "transparent", strokeWidth: "bad"},
					".bb-brush .handle--custom": {stroke: "transparent", strokeWidth: "bad"}
				},
				axis: {
					labelColor: "#334455",
					labelFont: "15px serif"
				},
				focusGrid: {
					lineWidth: "bad",
					dashArray: "bad 9"
				},
				region: {
					opacity: "bad"
				},
				shape: {
					barOpacity: "bad",
					barExpandedOpacity: "bad",
					barLineWidth: "bad",
					candlestickLineWidth: "bad",
					candlestickExpandedOpacity: "bad",
					lineWidth: "bad",
					lineFocusedWidth: "bad",
					areaOpacity: "bad",
					targetDefocusedOpacity: "bad",
					pointLineWidth: "bad"
				},
				selectedPoint: {
					lineWidth: "bad"
				},
				focusPoint: {
					lineWidth: "bad"
				},
				zoomBrush: {
					opacity: "bad"
				},
				subchartBrush: {
					opacity: "bad",
					handleOpacity: "bad"
				},
				treemap: {
					lineWidth: "bad"
				}
			});

			expect(theme.style.axis.xTickFont).to.be.equal("15px serif");
			expect(theme.style.axis.y2TickFont).to.be.equal("15px serif");
			expect(theme.style.axis.xLabelColor).to.be.equal("#334455");
			expect(theme.style.axis.y2LabelColor).to.be.equal("#334455");
			expect(theme.style.grid.dashArray).to.deep.equal([4, 6]);
			expect(theme.style.focusGrid.dashArray).to.deep.equal([9]);
			expect(theme.style.shape.pointLineWidth).to.be.undefined;
			expect(theme.style.subchartBrush.handleLineWidth).to.be.equal(1);

			container.remove();
		});
	});
});
