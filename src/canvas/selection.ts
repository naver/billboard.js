/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	getBarRadiusInfo,
	getBarRadiusResolver,
	getStackingBarRadiusSet
} from "../ChartInternal/shape/core/barRadius";
import {getRenderDataPoint} from "../ChartInternal/shape/core/geometry";
import {TYPE} from "../config/const";
import {getCanvasDataKey, getCanvasEventPoint} from "../config/resolver/canvas";
import {callFn} from "../module/util";
import {getPointType} from "./CanvasRenderer";
import {getCanvasBarGeometry, getCanvasCandlestickGeometry} from "./geometry";
import {drawPointPattern} from "./pointPattern";
import {
	getCanvasShapeIndices,
	hasCanvasDrawableValue,
	isCanvasBarType,
	isCanvasCandlestickType,
	isCanvasPointType,
	isCanvasTargetSupported,
	isCanvasTreemapType,
	isFiniteCanvasCoordinate
} from "./util";

const CANVAS_SELECTABLE_TYPE_FILTERS = [
	isCanvasPointType,
	isCanvasBarType,
	isCanvasCandlestickType,
	isCanvasTreemapType
];

const canvasSelectionDragRows = new WeakMap<object, Map<string, any>>();

/**
 * Get canvas drag selection delta rows from current and previous hit rows.
 * @param {object} $$ ChartInternal instance
 * @param {Array} dataRows Current drag hit rows
 * @returns {object} Current included keys and rows to toggle
 * @private
 */
function getCanvasSelectionDragDelta($$, dataRows): {included: Set<string>, rows: any[]} {
	const previousKeys = $$.state.canvasSelectionDragIncluded as Set<string>;
	const previousRows = canvasSelectionDragRows.get($$) || new Map<string, any>();
	const currentRows = new Map<string, any>();
	const included = new Set<string>();
	const rows: any[] = [];

	dataRows
		.filter(d => isCanvasSelectableData($$, d))
		.forEach(d => {
			const key = getCanvasDataKey(d);

			if (key) {
				included.add(key);
				!currentRows.has(key) && currentRows.set(key, d);
			}
		});

	currentRows.forEach((d, key) => {
		!previousKeys.has(key) && rows.push(d);
	});
	previousRows.forEach((d, key) => {
		!included.has(key) && rows.push(d);
	});
	canvasSelectionDragRows.set($$, currentRows);

	return {included, rows};
}

/**
 * Normalize a data id or id list.
 * @param {string|Array} ids Data ids
 * @returns {Array|null} Normalized ids
 * @private
 */
function getCanvasSelectionIds(ids?: string | string[]): string[] | null {
	return ids ? (Array.isArray(ids) ? ids : [ids]) : null;
}

/**
 * Check whether a canvas data row participates in selection.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {boolean} Whether the row can be selected
 * @private
 */
function isCanvasSelectableData($$, d): boolean {
	return d &&
		hasCanvasDrawableValue($$, d) &&
		isCanvasTargetSupported($$, d, CANVAS_SELECTABLE_TYPE_FILTERS) &&
		CANVAS_SELECTABLE_TYPE_FILTERS.some(filter => filter($$, d)) &&
		$$.config.data_selection_isselectable.bind($$.api)(d);
}

/**
 * Iterate selectable canvas rows.
 * @param {object} $$ ChartInternal instance
 * @param {function} callback Row callback
 * @private
 */
function eachCanvasSelectableData($$, callback: (d) => void): void {
	$$.filterTargetsToShow($$.data.targets)
		.filter(target => isCanvasTargetSupported($$, target, CANVAS_SELECTABLE_TYPE_FILTERS))
		.forEach(target => {
			target.values.forEach(d => {
				isCanvasSelectableData($$, d) && callback(d);
			});
		});
}

/**
 * Draw selected canvas shapes.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @param {object} shape Cached draw shape object
 * @private
 */
function drawSelections(renderer, $$, shape): void {
	const selectedData = $$.getCanvasSelectedData?.();

	if (
		!$$.config.data_selection_enabled || !selectedData?.length ||
		$$.state.customType || $$.state.hasTreemap
	) {
		return;
	}

	const {ctx, painter, theme: {style}} = renderer;
	const {margin} = $$.state;
	const isBar = isCanvasBarType.bind(null, $$);
	const isCandlestick = isCanvasCandlestickType.bind(null, $$);
	const barPoints = selectedData.some(isBar) ?
		$$.generateGetBarPoints(
			getCanvasShapeIndices($$, shape, TYPE.BAR, isBar),
			false
		) :
		null;
	const candlestickPoints = selectedData.some(isCandlestick) ?
		$$.generateGetCandlestickPoints?.(
			getCanvasShapeIndices($$, shape, TYPE.CANDLESTICK, isCandlestick),
			false
		) :
		null;
	const getRadius = barPoints ? getBarRadiusResolver($$) : null;
	const stackingRadiusSet = getRadius ? getStackingBarRadiusSet($$) : new Set<string>();

	painter.withTranslation(margin.left, margin.top, () => {
		selectedData.forEach(d => {
			const color = $$.color(d.id);

			if (isBar(d) && barPoints) {
				const geometry = getCanvasBarGeometry($$, barPoints, d, d.index);

				if (!geometry) {
					return;
				}

				const {points, rect} = geometry;
				const corners = getRadius ?
					getBarRadiusInfo($$, d, points, getRadius, stackingRadiusSet).corners :
					0;

				getRadius ?
					painter.fillRoundRect(rect, corners, {fill: "#fff", alpha: 0.3}) :
					painter.fillRect(rect, {fill: "#fff", alpha: 0.3});
				getRadius ?
					painter.strokeRoundRect(rect, corners, {stroke: color, lineWidth: 2}) :
					painter.strokeRect(rect, {stroke: color, lineWidth: 2});
			} else if (isCandlestick(d) && candlestickPoints) {
				const value = $$.getCandlestickData?.(d);

				if (!value) {
					return;
				}

				const geometry = getCanvasCandlestickGeometry($$, candlestickPoints, d, d.index);

				if (!geometry) {
					return;
				}

				const {body, wickStart, wickEnd} = geometry;

				painter.strokePath(() => {
					painter.traceLine(wickStart[0], wickStart[1], wickEnd[0], wickEnd[1]);
				}, {stroke: color, lineWidth: 3});
				painter.fillRect(body, {fill: "#fff", alpha: 0.3});
				painter.strokeRect(body, {stroke: color, lineWidth: 2});
			} else if (isCanvasPointType($$, d)) {
				const pointType = getPointType($$, {id: d.id});
				const {x, y} = getRenderDataPoint($$, d);
				const r = $$.pointR?.(d) ?? 2.5;
				const selectR = $$.pointSelectR?.(d) ?? (r * 2);

				if (!isFiniteCanvasCoordinate(x, y)) {
					return;
				}

				drawPointPattern(painter, "circle", x, y, selectR, {
					fill: style.selectedPoint.fill,
					lineWidth: style.selectedPoint.lineWidth,
					stroke: style.selectedPoint.stroke || color
				});

				// with point.focus.only, the data point is rendered only while it's
				// focused, so a selected-but-unfocused point shows just the selection
				// ring (matching SVG). Skip drawing the data point itself here.
				if (!$$.isPointFocusOnly?.()) {
					drawPointPattern(painter, pointType, x, y, r, {
						fill: style.shape.pointFillColor || color,
						stroke: style.shape.pointStrokeColor || color,
						lineWidth: style.shape.pointLineWidth ?? 1
					});
				}
			}
		});

		ctx.globalAlpha = 1;
	});
}

/**
 * Draw data selection drag area.
 * @param {object} renderer Canvas renderer
 * @param {object} $$ ChartInternal instance
 * @param {object} rect Selection rectangle
 * @private
 */
function drawSelectionDragArea(renderer, $$, rect): void {
	const {margin, width, height} = $$.state;
	const plot = {
		x: margin.left,
		y: margin.top,
		w: width,
		h: height
	};
	const x = Math.max(plot.x, rect.x);
	const y = Math.max(plot.y, rect.y);
	const right = Math.min(plot.x + plot.w, rect.x + rect.w);
	const bottom = Math.min(plot.y + plot.h, rect.y + rect.h);

	if (right <= x || bottom <= y) {
		return;
	}

	renderer.painter.fillRect({
		x,
		y,
		w: right - x,
		h: bottom - y
	}, {
		fill: renderer.theme.style.zoomBrush.fill,
		alpha: renderer.theme.style.zoomBrush.opacity
	});
}

/**
 * Canvas data selection: selecting rows by click or drag, and drawing them.
 * Added to the chart by selection(): bundles without the module do not carry it.
 * @private
 */
export default {
	/**
	 * Get selected canvas data rows.
	 * @param {string} targetId Target id
	 * @returns {Array} Selected rows
	 * @private
	 */
	getCanvasSelectedData(targetId?: string): any[] {
		const $$ = this;
		const selected = $$.state.canvasSelection;
		const data: any[] = [];

		if (!$$.config.data_selection_enabled || !selected?.size) {
			return data;
		}

		eachCanvasSelectableData($$, d => {
			(!targetId || d.id === targetId) &&
				selected.has(getCanvasDataKey(d)) &&
				data.push(d);
		});

		return data;
	},
	/**
	 * Select or unselect canvas data rows.
	 * @param {boolean} isSelection Whether to select
	 * @param {string|Array} ids Target ids
	 * @param {Array} indices Target indices
	 * @param {boolean} resetOther Whether to reset unrelated selections
	 * @private
	 */
	setCanvasSelection(
		isSelection = false,
		ids?: string | string[],
		indices?: number[],
		resetOther?: boolean
	): void {
		const $$ = this;
		const {config, state} = $$;
		const selected = state.canvasSelection;
		const selectionGrouped = config.data_selection_grouped;
		let targetIds = getCanvasSelectionIds(ids);
		let changed = false;
		const singleSelection = isSelection && !config.data_selection_multiple;
		let resetDone = !singleSelection;

		if (!config.data_selection_enabled) {
			return;
		}

		// When multiple selection is disabled, only one data point (or one x-index
		// group when 'grouped' is enabled) can hold the selected state at a time.
		// Clear any current selection only when the narrowed request can select a point.
		if (singleSelection) {
			indices = indices?.length ? [indices[0]] : [0];

			// non-grouped single selection targets exactly one point, so narrow to a
			// single id (the first requested, or the first shown when none given).
			if (!selectionGrouped) {
				if (targetIds) {
					targetIds = targetIds.slice(0, 1);
				} else {
					const [firstTarget] = $$.filterTargetsToShow($$.data.targets);

					targetIds = firstTarget ? [firstTarget.id] : [];
				}
			}
		}

		eachCanvasSelectableData($$, d => {
			const key = getCanvasDataKey(d);
			const isTargetId = selectionGrouped || !targetIds || targetIds.indexOf(d.id) >= 0;
			const isTargetIndex = !indices || indices.indexOf(d.index) >= 0;
			const isSelected = selected.has(key);

			if (isSelection) {
				if (isTargetId && isTargetIndex && (!isSelected || singleSelection)) {
					if (!resetDone) {
						$$.setCanvasSelection(false);
						resetDone = true;
					}

					if (selected.has(key)) {
						return;
					}

					selected.add(key);
					callFn(config.data_onselected, $$.api, d, $$.canvasEngine.canvas);
					changed = true;
				} else if ((!singleSelection || resetDone) && resetOther && isSelected) {
					selected.delete(key);
					callFn(config.data_onunselected, $$.api, d, $$.canvasEngine.canvas);
					changed = true;
				}
			} else if (isTargetId && isTargetIndex && isSelected) {
				selected.delete(key);
				callFn(config.data_onunselected, $$.api, d, $$.canvasEngine.canvas);
				changed = true;
			}
		});

		changed && $$.renderCanvasFrame?.(undefined, null, false);
	},
	/**
	 * Toggle canvas data selection from a click.
	 * @param {Array} dataRows Data rows to toggle
	 * @private
	 */
	toggleCanvasSelection(dataRows): void {
		const $$ = this;
		const {config, state} = $$;
		const selected = state.canvasSelection;
		let changed = false;

		if (!config.data_selection_enabled) {
			return;
		}

		dataRows
			.filter(d => isCanvasSelectableData($$, d))
			.forEach(d => {
				const key = getCanvasDataKey(d);
				const isSelected = selected.has(key);

				if (!config.data_selection_multiple) {
					eachCanvasSelectableData($$, selectedData => {
						const selectedKey = getCanvasDataKey(selectedData);
						const shouldReset = config.data_selection_grouped ?
							selectedData.id === d.id :
							selectedKey !== key;

						if (shouldReset && selected.has(selectedKey)) {
							selected.delete(selectedKey);
							callFn(
								config.data_onunselected,
								$$.api,
								selectedData,
								$$.canvasEngine.canvas
							);
							changed = true;
						}
					});
				}

				if (isSelected && selected.has(key)) {
					selected.delete(key);
					callFn(config.data_onunselected, $$.api, d, $$.canvasEngine.canvas);
				} else {
					selected.add(key);
					callFn(config.data_onselected, $$.api, d, $$.canvasEngine.canvas);
				}

				changed = true;
			});

		changed && $$.renderCanvasFrame?.(undefined, null, false);
	},
	/**
	 * Check whether canvas draggable selection can start.
	 * @param {MouseEvent|TouchEvent} event Input event
	 * @returns {boolean} Whether drag selection can start
	 * @private
	 */
	canStartCanvasSelectionDrag(event: MouseEvent | TouchEvent): boolean {
		const $$ = this;
		const {config} = $$;
		const mouse = event as MouseEvent;

		return Boolean(
			config.interaction_enabled &&
				config.data_selection_enabled &&
				config.data_selection_draggable &&
				config.data_selection_multiple &&
				!config.zoom_enabled &&
				(mouse.button === undefined || mouse.button === 0)
		);
	},
	/**
	 * Get the selected data rows inside the current canvas drag rectangle.
	 * @param {object} rect Canvas rectangle
	 * @returns {Array} Included rows
	 * @private
	 */
	getCanvasSelectionDragData(rect): any[] {
		const $$ = this;
		const {config} = $$;
		const data = $$.hitDetector.findInRect(rect, config.data_selection_grouped);

		if (!config.data_selection_grouped) {
			return data;
		}

		const indices = new Set(data.map(d => d.index));

		return $$.filterTargetsToShow($$.data.targets)
			.flatMap(target => target.values.filter(d => indices.has(d.index)));
	},
	/**
	 * Start canvas draggable selection.
	 * @param {MouseEvent|TouchEvent} event Input event
	 * @returns {boolean} Whether drag started
	 * @private
	 */
	startCanvasSelectionDrag(event: MouseEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;
		const point = getCanvasEventPoint($$, event);

		if (!point || !$$.canStartCanvasSelectionDrag(event)) {
			return false;
		}

		state.dragStart = point;
		state.canvasSelectionDragStart = point;
		state.canvasSelectionDragIncluded = new Set<string>();
		state.canvasSelectionDragging = true;
		state.canvasSelectionDragMoved = false;
		canvasSelectionDragRows.set($$, new Map<string, any>());
		$$.setDragStatus(true);
		$$.hideTooltip?.();
		event.preventDefault?.();

		return true;
	},
	/**
	 * Update canvas draggable selection.
	 * @param {MouseEvent|TouchEvent} event Input event
	 * @returns {boolean} Whether drag was handled
	 * @private
	 */
	updateCanvasSelectionDrag(event: MouseEvent | TouchEvent): boolean {
		const $$ = this;
		const {config, state} = $$;
		const start = state.canvasSelectionDragStart;
		const point = getCanvasEventPoint($$, event);

		if (!state.canvasSelectionDragging || !start || !point) {
			return false;
		}

		const [sx, sy] = start;
		const [mx, my] = point;
		const minX = Math.min(sx, mx);
		const maxX = Math.max(sx, mx);
		const minY = config.data_selection_grouped ? state.margin.top : Math.min(sy, my);
		const maxY = config.data_selection_grouped ?
			state.margin.top + state.height :
			Math.max(sy, my);
		const rect = {
			x: minX,
			y: minY,
			w: maxX - minX,
			h: maxY - minY
		};
		const moved = Math.abs(mx - sx) > 4 || Math.abs(my - sy) > 4;

		state.canvasSelectionDragMoved = state.canvasSelectionDragMoved || moved;

		if (moved) {
			const {included, rows} = getCanvasSelectionDragDelta(
				$$,
				$$.getCanvasSelectionDragData(rect)
			);

			rows.length && $$.toggleCanvasSelection(rows);
			state.canvasSelectionDragIncluded = included;
			state.cancelClick = true;
		}

		$$.renderCanvasSelectionDrag(rect);
		event.preventDefault?.();

		return true;
	},
	/**
	 * End canvas draggable selection.
	 * @param {MouseEvent|TouchEvent} event Input event
	 * @returns {boolean} Whether drag ended
	 * @private
	 */
	endCanvasSelectionDrag(event: MouseEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;

		if (!state.canvasSelectionDragging) {
			return false;
		}

		$$.updateCanvasSelectionDrag(event);
		state.cancelClick = state.cancelClick || state.canvasSelectionDragMoved;
		state.dragStart = null;
		state.canvasSelectionDragStart = null;
		state.canvasSelectionDragIncluded = new Set<string>();
		state.canvasSelectionDragging = false;
		state.canvasSelectionDragMoved = false;
		canvasSelectionDragRows.delete($$);
		$$.setDragStatus(false);
		$$.clearCanvasFocus();
		event.preventDefault?.();

		return true;
	},
	/**
	 * Start mouse-driven canvas draggable selection.
	 * @param {MouseEvent} event Mouse event
	 * @private
	 */
	onCanvasSelectionDragStart(event: MouseEvent): void {
		const $$ = this;
		const {state} = $$;

		if (!$$.startCanvasSelectionDrag(event)) {
			return;
		}

		const move = (event: MouseEvent) => {
			$$.updateCanvasSelectionDrag(event);
		};
		const end = (event: MouseEvent) => {
			$$.endCanvasSelectionDrag(event);
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseup", end);
			state.canvasSelectionDragMoveHandler = null;
			state.canvasSelectionDragEndHandler = null;
		};

		state.canvasSelectionDragMoveHandler = move;
		state.canvasSelectionDragEndHandler = end;
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", end);
	},
	/**
	 * Draw selection drag overlay on the cached canvas frame.
	 * @param {object} rect Selection rectangle
	 * @private
	 */
	renderCanvasSelectionDrag(rect): void {
		const $$ = this;

		$$.canvasEngine.withOverlay(ctx => {
			$$.canvasRenderer.withContext(ctx, () => {
				drawSelectionDragArea($$.canvasRenderer, $$, rect);
			});
		});
	}
};

/**
 * Canvas drawing of the selected rows and the selection drag area.
 * The functions are called with the chart (ChartInternal) as `this`.
 * @private
 */
export const selectionDraw = {
	draw(renderer, shape): void {
		drawSelections(renderer, this, shape);
	},

	drawDragArea(renderer, rect): void {
		drawSelectionDragArea(renderer, this, rect);
	}
};
