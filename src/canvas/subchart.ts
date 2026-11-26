/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {AxisTickFormat} from "../../types/axis";
import {getMainCoordFromSubchartCoord} from "../ChartInternal/internals/subchart.util";
import {AXIS_TICK_PADDING, AXIS_TICK_SIZE, SUBCHART_BRUSH_HANDLE_PATH, TYPE} from "../config/const";
import {getCanvasEventPoint} from "../config/resolver/canvas";
import {window} from "../module/browser";
import {parseDate} from "../module/util";
import {
	getSubXTickLineValues,
	getSubXTickValues,
	getYTickValues,
	normalizeXValue,
	type YAxisId
} from "./axisTicks";
import {
	getAxisTickFont,
	getHorizontalXAxisClipRect,
	getRotatedXAxisClipRect,
	getXOuterTickDirection,
	getXTickTextDirection,
	getXTickTextLineHeight,
	getXTickTextLines,
	getXTickTextWidth,
	isInAxisRange
} from "./CanvasAxisRenderer";
import {
	drawCanvasArea,
	drawCanvasLine,
	getCandlestickColor,
	getCanvasTargetFocusOpacity,
	getPointOpacity,
	getTargetPointRadius,
	isCanvasRenderableTarget,
	isCanvasTargetFocused
} from "./CanvasRenderer";
import {getCanvasBarGeometry, getCanvasCandlestickGeometry} from "./geometry";
import {drawPointPattern} from "./pointPattern";
import {
	getCanvasShapeIndices,
	getFontSize,
	hasCanvasDrawableValue,
	isCanvasAreaType,
	isCanvasBarType,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasLineType,
	isCanvasScatterType,
	isFiniteCanvasCoordinate
} from "./util";

const CANVAS_SUBCHART_HANDLE_SIZE = 6;
const CANVAS_SUBCHART_CLICK_TOLERANCE = 2;
const subchartBrushHandlePathCache = new Map<string, Path2D>();

/**
 * Normalize a subchart domain range for the current x axis type.
 * @param {object} $$ ChartInternal instance
 * @param {Array} domain Domain range
 * @returns {Array} Normalized domain range
 * @private
 */
function normalizeCanvasSubchartDomain($$, domain): any[] | null {
	if (!Array.isArray(domain) || domain.length < 2) {
		return null;
	}

	const values = domain.slice(0, 2);

	return $$.axis?.isTimeSeries?.() ? values.map(value => parseDate.call($$, value)) : values;
}

/**
 * Get the canvas-space rectangle occupied by the subchart plot.
 * @param {object} $$ ChartInternal instance
 * @returns {object|null} Subchart rectangle
 * @private
 */
function getCanvasSubchartRect($$): {x: number, y: number, w: number, h: number} | null {
	const {config, state} = $$;

	if (!config.subchart_show || !state.hasAxis || state.width2 <= 0 || state.height2 <= 0) {
		return null;
	}

	return {
		x: state.margin2.left,
		y: state.margin2.top,
		w: state.width2,
		h: state.height2
	};
}

/**
 * Check whether a canvas point is inside the subchart plot area.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Canvas-local point
 * @returns {boolean} Whether point is in the subchart
 * @private
 */
function isCanvasSubchartPoint($$, point: number[]): boolean {
	const rect = getCanvasSubchartRect($$);

	return !!rect &&
		point[0] >= rect.x &&
		point[0] <= rect.x + rect.w &&
		point[1] >= rect.y &&
		point[1] <= rect.y + rect.h;
}

/**
 * Convert a canvas subchart point to the equivalent main plot point.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Canvas-local point
 * @returns {Array|null} Main plot point or null when not applicable
 * @private
 */
function getCanvasMainPointFromSubchart($$, point: number[]): number[] | null {
	const {config, state} = $$;
	const rect = getCanvasSubchartRect($$);

	if (config.subchart_brush_enabled !== false || !rect || !isCanvasSubchartPoint($$, point)) {
		return null;
	}

	const mainCoord = getMainCoordFromSubchartCoord(
		$$,
		config.axis_rotated ? point[1] - rect.y : point[0] - rect.x
	);

	if (mainCoord === null) {
		return null;
	}

	return config.axis_rotated ?
		[state.margin.left + (state.width / 2), state.margin.top + mainCoord] :
		[state.margin.left + mainCoord, state.margin.top + (state.height / 2)];
}

/**
 * Get the allowed local brush coordinate extent for canvas subchart interactions.
 * @param {object} $$ ChartInternal instance
 * @returns {Array} Brush extent in subchart-local pixels
 * @private
 */
function getCanvasSubchartBrushExtent($$): [number, number] {
	const rect = getCanvasSubchartRect($$);
	const axisLength = rect ? ($$.config.axis_rotated ? rect.h : rect.w) : 0;
	const extent = $$.axis?.getExtent?.();
	const values = Array.isArray(extent) ? extent.slice(0, 2) : [];

	if (values.length === 2 && values.every(Number.isFinite)) {
		const start = Math.max(0, Math.min(axisLength, values[0]));
		const end = Math.max(0, Math.min(axisLength, values[1]));

		return [Math.min(start, end), Math.max(start, end)];
	}

	return [0, axisLength];
}

/**
 * Get the local brush coordinate from a canvas subchart pointer event.
 * @param {object} $$ ChartInternal instance
 * @param {Event} event Input event
 * @param {boolean} clampToExtent Whether to clamp pointer outside brush extent
 * @returns {number|null} Brush coordinate
 * @private
 */
function getCanvasSubchartBrushCoord(
	$$,
	event: MouseEvent | PointerEvent | TouchEvent,
	clampToExtent = false
):
	| number
	| null {
	const point = getCanvasEventPoint($$, event);
	const rect = point && getCanvasSubchartRect($$);

	if (!point || !rect || !isCanvasSubchartPoint($$, point)) {
		return null;
	}

	const raw = $$.config.axis_rotated ? point[1] - rect.y : point[0] - rect.x;
	const [min, max] = getCanvasSubchartBrushExtent($$);

	if (!clampToExtent && (raw < min || raw > max)) {
		return null;
	}

	return Math.max(min, Math.min(max, raw));
}

/**
 * Build a scale domain from two subchart brush coordinates.
 * @param {object} $$ ChartInternal instance
 * @param {number} start Brush start coordinate
 * @param {number} end Brush end coordinate
 * @returns {Array} Domain range
 * @private
 */
function getCanvasSubchartDomainFromCoords($$, start: number, end: number): any[] {
	const coordStart = Math.min(start, end);
	const coordEnd = Math.max(start, end);

	return [
		$$.scale.subX.invert(coordStart),
		$$.scale.subX.invert(coordEnd)
	];
}

/**
 * Get current canvas subchart brush selection in local subchart pixels.
 * @param {object} $$ ChartInternal instance
 * @returns {Array|null} Brush selection pixels
 * @private
 */
function getCanvasSubchartBrushSelection($$): [number, number] | null {
	const {scale, state} = $$;
	const domain = state.domain;

	if (!domain?.length || !scale.subX) {
		return null;
	}

	const rect = getCanvasSubchartRect($$);
	const p0 = scale.subX(domain[0]);
	const p1 = scale.subX(domain[1]);

	if (!rect || !Number.isFinite(p0) || !Number.isFinite(p1)) {
		return null;
	}

	const [min, max] = getCanvasSubchartBrushExtent($$);

	return [
		Math.max(min, Math.min(max, Math.min(p0, p1))),
		Math.max(min, Math.min(max, Math.max(p0, p1)))
	];
}

/**
 * Get the subchart brush mode at a local brush coordinate.
 * @param {object} $$ ChartInternal instance
 * @param {number} coord Brush coordinate
 * @returns {string} Brush mode
 * @private
 */
function getCanvasSubchartBrushMode($$, coord: number):
	| "select"
	| "move"
	| "resize-start"
	| "resize-end" {
	const selection = getCanvasSubchartBrushSelection($$);

	if (!selection) {
		return "select";
	}

	const [start, end] = selection;

	if (Math.abs(coord - start) <= CANVAS_SUBCHART_HANDLE_SIZE) {
		return "resize-start";
	}

	if (Math.abs(coord - end) <= CANVAS_SUBCHART_HANDLE_SIZE) {
		return "resize-end";
	}

	return coord > start && coord < end ? "move" : "select";
}

/**
 * Clamp a subchart brush selection to the subchart extent.
 * @param {object} $$ ChartInternal instance
 * @param {number} start Selection start pixel
 * @param {number} end Selection end pixel
 * @returns {Array} Clamped selection pixels
 * @private
 */
function clampCanvasSubchartSelection($$, start: number, end: number): [number, number] {
	const [min, max] = getCanvasSubchartBrushExtent($$);

	return [
		Math.max(min, Math.min(max, start)),
		Math.max(min, Math.min(max, end))
	];
}

/**
 * Get cursor for a canvas subchart brush mode.
 * @param {object} $$ ChartInternal instance
 * @param {string} mode Brush mode
 * @returns {string} CSS cursor
 * @private
 */
function getCanvasSubchartCursor($$, mode: string): string {
	if (/^resize/.test(mode)) {
		return $$.config.axis_rotated ? "ns-resize" : "ew-resize";
	}

	return mode === "move" ? "move" : "crosshair";
}

/**
 * Get cached Path2D for a subchart brush handle.
 * @param {string} axis Brush axis
 * @param {string} type Brush handle side
 * @returns {Path2D|null}
 * @private
 */
function getSubchartBrushHandlePath(axis: "x" | "y", type: "start" | "end"): Path2D | null {
	const Path2DCtor = window.Path2D;

	if (!Path2DCtor) {
		return null;
	}

	const key = `${axis}:${type}`;
	const cached = subchartBrushHandlePathCache.get(key);

	if (cached) {
		return cached;
	}

	const path = new Path2DCtor(SUBCHART_BRUSH_HANDLE_PATH[axis][type]);

	subchartBrushHandlePathCache.set(key, path);

	return path;
}

/**
 * Get tick formatter for the canvas subchart y/y2 axis.
 * @param {object} $$ ChartInternal context
 * @param {string} id Axis id
 * @returns {function} Tick formatter
 * @private
 */
function getSubYTickFormat($$, id: YAxisId): AxisTickFormat {
	const subAxisId = id === "y2" ? "subY2" : "subY";
	const axisFormat = $$.axis?.[subAxisId]?.tickFormat?.();
	const configFormat = $$.config[`subchart_axis_${id}_tick_format`] ||
		$$.config[`axis_${id}_tick_format`];

	if (axisFormat) {
		return axisFormat;
	}

	return typeof configFormat === "function" ? configFormat.bind($$.api) : (v => v);
}

/**
 * Draw the canvas subchart overview and brush selection.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @param {object} _shape Cached main shape object
 * @private
 */
function drawSubchart(renderer, $$, _shape?): void {
	const {config, state} = $$;

	// Keep accepting the main chart shape from existing internal calls.
	void _shape;

	if (!config.subchart_show || !state.hasAxis || state.width2 <= 0 || state.height2 <= 0) {
		return;
	}

	const {ctx, painter, theme: {style}} = renderer;
	const {margin2, width2, height2} = state;
	const rect = {x: margin2.left, y: margin2.top, w: width2, h: height2};

	$$.withSubchartTypeContext(() => {
		const targets = $$.filterTargetsToShow()
			.filter(isCanvasRenderableTarget.bind(null, $$));
		const shape = $$.getDrawShape();

		$$.updateSubchartYDomain?.(targets);

		painter.withState(() => {
			painter.clipRect(rect, () => {
				painter.withTranslation(rect.x, rect.y, () => {
					const areaTargets = targets.filter(isCanvasAreaType.bind(null, $$));
					const areaIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.AREA,
						isCanvasAreaType.bind(null, $$)
					);

					for (const target of areaTargets) {
						if (!target.values.some(hasCanvasDrawableValue.bind(null, $$))) {
							continue;
						}

						ctx.globalAlpha = style.shape.areaOpacity *
							getCanvasTargetFocusOpacity($$, target);
						ctx.fillStyle = $$.color(target.id);
						drawCanvasArea($$, target, areaIndices, painter, true);
					}
					ctx.globalAlpha = 1;

					const barTargets = targets.filter(isCanvasBarType.bind(null, $$));
					const barIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.BAR,
						isCanvasBarType.bind(null, $$)
					);
					const getBarPoints = $$.generateGetBarPoints?.(barIndices, true);

					if (getBarPoints) {
						for (const target of barTargets) {
							ctx.globalAlpha = style.shape.barOpacity *
								getCanvasTargetFocusOpacity($$, target);
							ctx.fillStyle = $$.color(target.id);
							target.values.forEach((d, i) => {
								if (!hasCanvasDrawableValue($$, d)) {
									return;
								}

								const geometry = getCanvasBarGeometry($$, getBarPoints, d, i);
								const fill = $$.getSubchartCandlestickBarColor?.(d, true) ||
									ctx.fillStyle;

								geometry && painter.fillRect(geometry.rect, {fill});
							});
						}
						ctx.globalAlpha = 1;
					}

					const candlestickTargets = targets.filter(
						isCanvasCandlestickType.bind(null, $$)
					);
					const candlestickIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.CANDLESTICK,
						isCanvasCandlestickType.bind(null, $$)
					);
					const getCandlestickPoints = $$.generateGetCandlestickPoints?.(
						candlestickIndices,
						true
					);

					if (getCandlestickPoints) {
						ctx.lineWidth = style.shape.candlestickLineWidth;
						for (const target of candlestickTargets) {
							const targetOpacity = getCanvasTargetFocusOpacity($$, target);

							ctx.globalAlpha = targetOpacity;
							target.values.forEach((d, i) => {
								const value = $$.getCandlestickData?.(d);
								const geometry = value && getCanvasCandlestickGeometry(
									$$,
									getCandlestickPoints,
									d,
									i
								);

								if (!geometry) {
									return;
								}

								const color = getCandlestickColor($$, {id: target.id}, value);

								ctx.strokeStyle = color;
								ctx.fillStyle = color;
								painter.strokePath(() => {
									painter.traceLine(
										geometry.wickStart[0],
										geometry.wickStart[1],
										geometry.wickEnd[0],
										geometry.wickEnd[1]
									);
								});
								painter.fillRect(geometry.body, {fill: ctx.fillStyle});
							});
						}
					}

					const lineTargets = targets.filter(isCanvasLineType.bind(null, $$));
					const lineIndices = getCanvasShapeIndices(
						$$,
						shape,
						TYPE.LINE,
						isCanvasLineType.bind(null, $$)
					);

					ctx.globalAlpha = 1;
					for (const target of lineTargets) {
						if (!target.values.some(hasCanvasDrawableValue.bind(null, $$))) {
							continue;
						}

						ctx.globalAlpha = getCanvasTargetFocusOpacity($$, target);
						ctx.lineWidth = isCanvasTargetFocused($$, target) ?
							style.shape.lineFocusedWidth :
							style.shape.lineWidth;
						ctx.strokeStyle = $$.color(target.id);
						drawCanvasLine($$, target, lineIndices, painter, true);
					}
					ctx.globalAlpha = 1;

					if (config.point_show && !$$.isPointFocusOnly?.()) {
						const cy = $$.updateCircleY?.(true);
						const cx = $$.subxx?.bind($$);

						if (cx && cy) {
							for (const target of targets) {
								if (
									!isCanvasScatterType($$, target) &&
									!isCanvasBubbleType($$, target)
								) {
									continue;
								}

								const color = $$.color(target.id);
								const pointFill = style.shape.pointFillColor || color;
								const pointStroke = style.shape.pointStrokeColor || color;
								const pointLineWidth = pointStroke ?
									(style.shape.pointLineWidth ?? 1) :
									0;
								const pointStyle = pointStroke && pointLineWidth > 0 ?
									{
										fill: pointFill,
										stroke: pointStroke,
										lineWidth: pointLineWidth
									} :
									{fill: pointFill};

								ctx.globalAlpha = getPointOpacity($$, target) *
									getCanvasTargetFocusOpacity($$, target);
								target.values.forEach((d, i) => {
									if (!hasCanvasDrawableValue($$, d)) {
										return;
									}

									const x = config.axis_rotated ? cy(d, i) : cx(d);
									const y = config.axis_rotated ? cx(d) : cy(d, i);
									const r = Math.min(getTargetPointRadius($$, target, d), 3);

									if (isFiniteCanvasCoordinate(x, y)) {
										drawPointPattern(painter, "circle", x, y, r, pointStyle);
									}
								});
							}
							ctx.globalAlpha = 1;
						}
					}
				});
			});

			drawSubchartBrush(renderer, $$);
		});
	});
}

/**
 * Draw current subchart brush selection.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @private
 */
function drawSubchartBrush(renderer, $$): void {
	const {config, scale, state} = $$;
	const domain = state.domain;

	if (
		!config.subchart_show ||
		config.subchart_brush_enabled === false ||
		!domain?.length ||
		!scale.subX
	) {
		return;
	}

	const {margin2, width2, height2} = state;
	const p0 = scale.subX(domain[0]);
	const p1 = scale.subX(domain[1]);
	const axisLength = config.axis_rotated ? height2 : width2;
	const extent = $$.axis?.getExtent?.();
	const extentValues =
		Array.isArray(extent) && extent.length >= 2 && extent.every(Number.isFinite) ?
			extent.slice(0, 2) :
			[0, axisLength];
	const extentStart = Math.max(0, Math.min(axisLength, Math.min(...extentValues)));
	const extentEnd = Math.max(0, Math.min(axisLength, Math.max(...extentValues)));
	const start = Math.max(extentStart, Math.min(extentEnd, Math.min(p0, p1)));
	const end = Math.max(extentStart, Math.min(extentEnd, Math.max(p0, p1)));
	const size = end - start;

	if (size <= 0) {
		return;
	}

	const rect = config.axis_rotated ?
		{x: margin2.left, y: margin2.top + start, w: width2, h: size} :
		{x: margin2.left + start, y: margin2.top, w: size, h: height2};

	renderer.painter.fillRect(rect, {
		fill: renderer.theme.style.subchartBrush.fill,
		alpha: renderer.theme.style.subchartBrush.opacity
	});

	if (config.subchart_showHandle) {
		drawSubchartBrushHandle(renderer, $$, start, "start");
		drawSubchartBrushHandle(renderer, $$, end, "end");
	}
}

/**
 * Draw a visible subchart brush resize handle.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @param {number} coord Brush handle coordinate
 * @param {string} type Brush handle side
 * @private
 */
function drawSubchartBrushHandle(renderer, $$, coord: number, type: "start" | "end"): void {
	const {config, state: {margin2, width2, height2}} = $$;
	const {ctx, painter, theme: {style}} = renderer;
	const isRotated = config.axis_rotated;
	const fill = style.subchartBrush.handleFill;
	const stroke = style.subchartBrush.handleStroke;
	const x = isRotated ? margin2.left + (width2 / 2) : margin2.left + coord;
	const y = isRotated ? margin2.top + coord : margin2.top + (height2 / 2);
	const path = getSubchartBrushHandlePath(isRotated ? "y" : "x", type);

	if (!path) {
		return;
	}

	painter.withState(() => {
		ctx.translate(x, y);
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = style.subchartBrush.handleLineWidth;
		ctx.globalAlpha = style.subchartBrush.handleOpacity;
		ctx.fill(path);
		ctx.globalAlpha = 1;
		ctx.stroke(path);
	});
}

/**
 * Draw synchronized focus grid on the canvas subchart.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @param {Array} selectedData Focused data rows
 * @private
 */
function drawSubchartFocus(renderer, $$, selectedData): void {
	const {config, scale, state} = $$;
	const focus = selectedData?.find(d =>
		d &&
		hasCanvasDrawableValue($$, d)
	);

	if (
		!focus ||
		!config.subchart_show ||
		config.subchart_grid_focus_continuous ||
		config.subchart_brush_enabled !== false ||
		config.grid_focus_show === false ||
		config.subchart_grid_focus === false ||
		!config.tooltip_show ||
		config.axis_tooltip ||
		!scale.subX ||
		state.width2 <= 0 ||
		state.height2 <= 0
	) {
		return;
	}

	const {margin2, width2, height2} = state;
	const pos = scale.subX(focus.x);

	if (!Number.isFinite(pos)) {
		return;
	}

	const {painter, theme: {style}} = renderer;
	const lineWidth = style.axis.lineWidth;
	const x = painter.crisp(margin2.left + pos, lineWidth);
	const y = painter.crisp(margin2.top + pos, lineWidth);

	painter.strokePath(() => {
		config.axis_rotated ?
			painter.traceLine(margin2.left, y, margin2.left + width2, y) :
			painter.traceLine(x, margin2.top, x, margin2.top + height2);
	}, {
		lineDash: style.focusGrid.dashArray,
		lineWidth: style.focusGrid.lineWidth,
		stroke: style.focusGrid.lineColor
	});
}

/**
 * Draw the canvas subchart x axis.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @private
 */
function drawSubXAxis(renderer, $$): void {
	const {ctx, painter, theme: {style: {axis}}} = renderer;
	const {
		config,
		format,
		scale,
		state: {current, margin2, width2, height2}
	} = $$;

	if (
		!config.subchart_show ||
		!config.subchart_axis_x_show ||
		!scale.subX ||
		width2 <= 0 ||
		height2 <= 0
	) {
		return;
	}

	const isRotated = config.axis_rotated;
	const x = painter.crisp(margin2.left, axis.lineWidth);
	const y = painter.crisp(margin2.top + height2, axis.lineWidth);
	const x1 = margin2.left;
	const x2 = margin2.left + width2;
	const y1 = margin2.top;
	const y2 = margin2.top + height2;
	const rangeStart = isRotated ? y1 : x1;
	const rangeEnd = isRotated ? y2 : x2;
	const ticks = getSubXTickValues($$);
	const lineTicks = getSubXTickLineValues($$, ticks, axis.tickWidth);
	const outerTick = config.subchart_axis_x_tick_outer ?? config.axis_x_tick_outer;
	const tickDirection = isRotated ?
		(config.axis_x_tick_inner ? 1 : -1) :
		(config.axis_x_tick_inner ? -1 : 1);
	const outerTickDirection = getXOuterTickDirection(isRotated);
	const tickTextDirection = getXTickTextDirection(isRotated);
	const tickTextPosition = config.axis_x_tick_text_position;
	const tickRotate = !isRotated ? ($$.getAxisTickRotate?.("x") || 0) : 0;
	const tickFormat = format.subXAxisTick || $$.axis?.getXAxisTickFormat?.(true);

	painter.clipRect(
		isRotated ? getRotatedXAxisClipRect(margin2, current.width, height2) : {
			...getHorizontalXAxisClipRect(
				margin2,
				width2,
				current.height - margin2.top
			),
			y: margin2.top
		},
		() => {
			ctx.globalAlpha = 1;
			ctx.strokeStyle = axis.lineColor;
			ctx.lineWidth = axis.lineWidth;
			ctx.setLineDash([]);

			painter.strokePath(() => {
				if (isRotated) {
					painter.traceLine(x, y1, x, y2);
				} else {
					painter.traceLine(x1, y, x2, y);
				}

				if (outerTick) {
					if (isRotated) {
						painter.traceLine(x, y1, x + (AXIS_TICK_SIZE * outerTickDirection), y1);
						painter.traceLine(x, y2, x + (AXIS_TICK_SIZE * outerTickDirection), y2);
					} else {
						painter.traceLine(x1, y, x1, y + (AXIS_TICK_SIZE * outerTickDirection));
						painter.traceLine(x2, y, x2, y + (AXIS_TICK_SIZE * outerTickDirection));
					}
				}
			});

			const tickFont = getAxisTickFont(axis, "x");

			ctx.font = tickFont;
			ctx.fillStyle = axis.labelColor;
			ctx.textAlign = isRotated ? (tickTextDirection > 0 ? "left" : "right") : "center";
			ctx.textBaseline = isRotated ? "middle" : (tickTextDirection > 0 ? "top" : "bottom");
			ctx.strokeStyle = axis.tickColor;
			ctx.lineWidth = axis.tickWidth;

			// invariant across ticks: measure/resolve once per draw pass
			const lineHeight = getXTickTextLineHeight(painter, getFontSize(tickFont));
			const tickTextWidth = getXTickTextWidth($$, ticks, isRotated, scale.subX);

			if (config.subchart_axis_x_tick_show) {
				for (const tick of lineTicks) {
					const tickPos = scale.subX(normalizeXValue($$, tick));
					const tx = margin2.left + tickPos;
					const ty = margin2.top + tickPos;
					const pos = isRotated ? ty : tx;

					if (!isInAxisRange(pos, rangeStart, rangeEnd)) {
						continue;
					}

					painter.strokePath(() => {
						if (isRotated) {
							painter.traceLine(x, ty, x + (AXIS_TICK_SIZE * tickDirection), ty);
						} else {
							painter.traceLine(tx, y, tx, y + (AXIS_TICK_SIZE * tickDirection));
						}
					});
				}
			}

			for (const tick of ticks) {
				const tickPos = scale.subX(normalizeXValue($$, tick));
				const tx = margin2.left + tickPos;
				const ty = margin2.top + tickPos;
				const pos = isRotated ? ty : tx;

				if (!isInAxisRange(pos, rangeStart, rangeEnd)) {
					continue;
				}

				if (!config.subchart_axis_x_tick_text_show) {
					continue;
				}

				const lines = getXTickTextLines(
					$$,
					painter,
					tickFormat,
					tick,
					ticks,
					isRotated,
					scale.subX,
					tickTextWidth
				);
				let textX;
				let textY;

				if (isRotated) {
					textX = x + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
						(tickTextPosition.x || 0);
					textY = ty + (tickTextPosition.y || 0);
					ctx.textAlign = tickTextDirection > 0 ? "left" : "right";
					ctx.textBaseline = "middle";
				} else {
					textX = tx + (tickTextPosition.x || 0);
					textY = y + ((AXIS_TICK_SIZE + AXIS_TICK_PADDING) * tickTextDirection) +
						(tickTextPosition.y || 0);
					ctx.textAlign = tickRotate ? (tickRotate > 0 ? "left" : "right") : "center";
					ctx.textBaseline = tickTextDirection > 0 ? "top" : "bottom";
				}

				painter.withState(textCtx => {
					textCtx.translate(textX, textY);
					tickRotate && textCtx.rotate(tickRotate * Math.PI / 180);

					lines.forEach((line, i) => {
						textCtx.fillText(line, 0, i * lineHeight);
					});
				});
			}
		}
	);
}

/**
 * Draw the canvas subchart y/y2 axes.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @private
 */
function drawSubYAxes(renderer, $$): void {
	const {
		config,
		scale,
		state: {margin2, width2, height2}
	} = $$;

	if (!config.subchart_show || width2 <= 0 || height2 <= 0) {
		return;
	}

	(["y", "y2"] as YAxisId[]).forEach(id => {
		const subScale = id === "y2" ? scale.subY2 : scale.subY;

		if (!config[`subchart_axis_${id}_show`] || !subScale) {
			return;
		}

		renderer.drawYAxis($$, id, {
			scale: subScale,
			ticks: getYTickValues($$, id, undefined, true, subScale, `subchart_axis_${id}`),
			format: getSubYTickFormat($$, id),
			index: 0,
			outerTick: config[`subchart_axis_${id}_tick_outer`] ??
				config[`axis_${id}_tick_outer`],
			margin: margin2,
			width: width2,
			height: height2,
			prefix: `subchart_axis_${id}`,
			tickShow: config[`subchart_axis_${id}_tick_show`],
			tickTextShow: config[`subchart_axis_${id}_tick_text_show`],
			tickTextPosition: config[`axis_${id}_tick_text_position`]
		});
	});
}

/**
 * Canvas subchart interaction: the brush, its cursor and the selected domain.
 * Added to the chart by subchart(): bundles without the module do not carry it.
 * @private
 */
export default {
	/**
	 * Convert a canvas subchart point to the equivalent main plot point.
	 * @param {Array} point Canvas-local point
	 * @returns {Array|null} Main plot point or null when not applicable
	 * @private
	 */
	getCanvasMainPointFromSubchart(point: number[]): number[] | null {
		return getCanvasMainPointFromSubchart(this, point);
	},

	/**
	 * Apply the current canvas subchart selection to the main x domain.
	 * @private
	 */
	applyCanvasSubchartDomain(): void {
		const $$ = this;
		const {axis, config, scale, state} = $$;

		if (!config.subchart_show || !state.hasAxis || !scale.subX) {
			return;
		}

		if (!state.rendered && !state.domain && config.subchart_init_range) {
			state.domain = normalizeCanvasSubchartDomain($$, config.subchart_init_range);
		}

		const domain = normalizeCanvasSubchartDomain($$, state.domain);

		if (
			!domain ||
			!$$.withinRange(domain, $$.getZoomDomain("subX", true), $$.getZoomDomain("subX"))
		) {
			return;
		}

		state.domain = domain;
		scale.x.domain(domain);
		axis.x.scale(scale.x);
	},

	/**
	 * Set the canvas subchart selection domain and redraw the main chart.
	 * @param {Array} domain Domain range
	 * @param {boolean} redraw Whether to redraw immediately
	 * @param {boolean} callCallback Whether to call subchart.onbrush
	 * @returns {Array|undefined} Applied domain range
	 * @private
	 */
	setCanvasSubchartDomain(domain, redraw = true, callCallback = false): any[] | undefined {
		const $$ = this;
		const {config, scale, state} = $$;
		const nextDomain = normalizeCanvasSubchartDomain($$, domain);

		if (
			!config.subchart_show ||
			!nextDomain ||
			!$$.withinRange(nextDomain, $$.getZoomDomain("subX", true), $$.getZoomDomain("subX"))
		) {
			return undefined;
		}

		state.domain = nextDomain;
		scale.zoom = null;

		if (redraw) {
			$$.redraw({
				withTransition: false,
				withY: config.zoom_rescale,
				withSubchart: false,
				withEventRect: false,
				withDimension: false
			});
		}

		callCallback && config.subchart_onbrush.bind($$.api)(state.domain);

		return state.domain;
	},

	/**
	 * Clear the canvas subchart brush selection and restore the full x domain.
	 * @param {boolean} redraw Whether to redraw immediately
	 * @param {boolean} callCallback Whether to call subchart.onbrush
	 * @private
	 */
	clearCanvasSubchartDomain(redraw = true, callCallback = false): void {
		const $$ = this;
		const {axis, config, org, scale, state} = $$;

		if (!config.subchart_show) {
			return;
		}

		state.domain = undefined;
		scale.zoom = null;

		if (org.xDomain?.length) {
			scale.x.domain(org.xDomain);
			axis.x.scale(scale.x);
		}

		if (redraw) {
			$$.redraw({
				withTransition: false,
				withUpdateXDomain: true,
				withUpdateOrgXDomain: false,
				withY: config.zoom_rescale,
				withSubchart: false,
				withEventRect: false,
				withDimension: false
			});
		}

		callCallback && config.subchart_onbrush.bind($$.api)(scale.x.orgDomain());
	},

	/**
	 * Update canvas subchart brush domain from an input event.
	 * @param {Event} event Input event
	 * @returns {boolean} Whether the brush was updated
	 * @private
	 */
	updateCanvasSubchartBrush(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const {config, state} = $$;
		const start = state.canvasSubchartBrushStart;
		const origin = state.canvasSubchartBrushOrigin;
		const mode = state.canvasSubchartBrushMode;
		const coord = getCanvasSubchartBrushCoord($$, event, true);

		if (
			config.subchart_brush_enabled === false ||
			!state.canvasSubchartBrushDragging ||
			start === null ||
			coord === null ||
			!mode
		) {
			return false;
		}

		const delta = coord - start;

		if (Math.abs(delta) > CANVAS_SUBCHART_CLICK_TOLERANCE) {
			state.canvasSubchartBrushMoved = true;
		}

		if (!state.canvasSubchartBrushMoved) {
			event.preventDefault?.();
			return true;
		}

		let selection: [number, number];

		if (mode === "move" && origin) {
			const [extentStart, extentEnd] = getCanvasSubchartBrushExtent($$);
			const size = origin[1] - origin[0];
			let nextStart = origin[0] + delta;
			let nextEnd = origin[1] + delta;

			if (nextStart < extentStart) {
				nextEnd += extentStart - nextStart;
				nextStart = extentStart;
			}

			if (nextEnd > extentEnd) {
				nextStart -= nextEnd - extentEnd;
				nextEnd = extentEnd;
			}

			selection = [
				Math.max(extentStart, Math.min(extentEnd - size, nextStart)),
				Math.min(extentEnd, Math.max(extentStart + size, nextEnd))
			];
		} else if (mode === "resize-start" && origin) {
			selection = clampCanvasSubchartSelection($$, coord, origin[1]);
		} else if (mode === "resize-end" && origin) {
			selection = clampCanvasSubchartSelection($$, origin[0], coord);
		} else {
			selection = clampCanvasSubchartSelection($$, start, coord);
		}

		const domain = getCanvasSubchartDomainFromCoords($$, selection[0], selection[1]);

		$$.setCanvasSubchartDomain(domain, true);
		state.cancelClick = true;
		event.preventDefault?.();

		return true;
	},

	/**
	 * Update cursor while hovering over the canvas subchart brush area.
	 * @param {Event} event Input event
	 * @returns {boolean} Whether the pointer is over the subchart
	 * @private
	 */
	updateCanvasSubchartCursor(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const canvas = $$.$el.canvas.node();

		if ($$.config.subchart_brush_enabled === false) {
			canvas.style.cursor = "";
			return false;
		}

		const coord = getCanvasSubchartBrushCoord($$, event);

		if (coord === null) {
			canvas.style.cursor = "";
			return false;
		}

		const mode = getCanvasSubchartBrushMode($$, coord);

		canvas.style.cursor = getCanvasSubchartCursor($$, mode);

		return true;
	},

	/**
	 * Start a canvas subchart brush gesture.
	 * @param {Event} event Mouse, pointer or touch event
	 * @returns {boolean} Whether brushing started
	 * @private
	 */
	startCanvasSubchartBrush(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;

		if ($$.config.subchart_brush_enabled === false) {
			return false;
		}

		const coord = getCanvasSubchartBrushCoord($$, event);

		if (coord === null) {
			return false;
		}

		const mode = getCanvasSubchartBrushMode($$, coord);

		state.event = event;
		state.canvasSubchartBrushDragging = true;
		state.canvasSubchartBrushMode = mode;
		state.canvasSubchartBrushStart = coord;
		state.canvasSubchartBrushOrigin = getCanvasSubchartBrushSelection($$);
		state.canvasSubchartBrushMoved = false;
		state.cancelClick = true;
		$$.setDragStatus(true);
		event.preventDefault?.();

		return true;
	},

	/**
	 * End a canvas subchart brush gesture.
	 * @param {Event} event Mouse, pointer or touch event
	 * @returns {boolean} Whether brushing ended
	 * @private
	 */
	endCanvasSubchartBrush(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;

		if (!state.canvasSubchartBrushDragging) {
			return false;
		}

		$$.updateCanvasSubchartBrush(event);

		const shouldClear = state.canvasSubchartBrushMode === "select" &&
			!state.canvasSubchartBrushMoved;
		const shouldCallback = state.canvasSubchartBrushMoved || shouldClear;

		if (shouldClear) {
			$$.clearCanvasSubchartDomain?.(true, true);
		} else if (shouldCallback) {
			$$.config.subchart_onbrush.bind($$.api)(state.domain ?? $$.scale.x.orgDomain());
		}

		state.canvasSubchartBrushDragging = false;
		state.canvasSubchartBrushMode = null;
		state.canvasSubchartBrushStart = null;
		state.canvasSubchartBrushOrigin = null;
		state.canvasSubchartBrushMoved = false;
		$$.setDragStatus(false);
		event.preventDefault?.();

		return true;
	},

	/**
	 * Cancel a canvas subchart brush gesture without applying callbacks.
	 * @param {Event} event Mouse, pointer or touch event
	 * @returns {boolean} Whether brushing was cancelled
	 * @private
	 */
	cancelCanvasSubchartBrush(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;

		if (!state.canvasSubchartBrushDragging) {
			return false;
		}

		state.canvasSubchartBrushDragging = false;
		state.canvasSubchartBrushMode = null;
		state.canvasSubchartBrushStart = null;
		state.canvasSubchartBrushOrigin = null;
		state.canvasSubchartBrushMoved = false;
		$$.setDragStatus(false);
		event.preventDefault?.();

		return true;
	},

	/**
	 * Start mouse-driven canvas subchart brushing.
	 * @param {MouseEvent} event Mouse event
	 * @returns {boolean} Whether brushing started
	 * @private
	 */
	onCanvasSubchartBrushStart(event: MouseEvent): boolean {
		const $$ = this;

		if (!$$.startCanvasSubchartBrush(event)) {
			return false;
		}

		const move = (event: MouseEvent) => {
			$$.updateCanvasSubchartBrush(event);
		};
		const end = (event: MouseEvent) => {
			$$.endCanvasSubchartBrush(event);
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseup", end);
		};

		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", end);

		return true;
	}
};

/**
 * Canvas drawing of the subchart, its axes and its focus line.
 * The functions are called with the chart (ChartInternal) as `this`.
 * Added to the chart by subchart(): bundles without the module do not carry it.
 * @private
 */
export const subchartDraw = {
	draw(renderer, shape?): void {
		drawSubchart(renderer, this, shape);
	},

	drawXAxis(axisRenderer): void {
		drawSubXAxis(axisRenderer, this);
	},

	drawYAxes(axisRenderer): void {
		drawSubYAxes(axisRenderer, this);
	},

	drawBrush(renderer): void {
		drawSubchartBrush(renderer, this);
	},

	drawBrushHandle(renderer, coord: number, type: "start" | "end"): void {
		drawSubchartBrushHandle(renderer, this, coord, type);
	},

	drawFocus(renderer, selectedData): void {
		drawSubchartFocus(renderer, this, selectedData);
	}
};
