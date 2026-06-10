/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import CanvasAxisRenderer from "../../canvas/CanvasAxisRenderer";
import CanvasEngine from "../../canvas/CanvasEngine";
import CanvasRenderer from "../../canvas/CanvasRenderer";
import CanvasTheme from "../../canvas/CanvasTheme";
import {$CANVAS} from "../../canvas/classes";
import HitDetector from "../../canvas/HitDetector";
import {
	hasCanvasDrawableValue,
	isCanvasBarType,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasPointType,
	isCanvasScatterType,
	isCanvasTargetSupported,
	isCanvasTreemapType
} from "../../canvas/util";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {getRenderDataPoint} from "../../ChartInternal/shape/core/geometry";
import {$FOCUS, $LEGEND} from "../../config/classes";
import {window} from "../../module/browser";
import {KEY} from "../../module/Cache";
import {
	callFn,
	extend,
	getBoundingRect,
	isBoolean,
	isFunction,
	parseDate,
	sanitize,
	tplProcess
} from "../../module/util";

const CANVAS_SELECTABLE_TYPE_FILTERS = [
	isCanvasPointType,
	isCanvasBarType,
	isCanvasCandlestickType,
	isCanvasTreemapType
];
const CANVAS_LEGEND_TOUCH_TAP_THRESHOLD = 10;
const CANVAS_LEGEND_TOUCH_CLICK_TIMEOUT = 750;
const CANVAS_SUBCHART_HANDLE_SIZE = 6;
const CANVAS_SUBCHART_CLICK_TOLERANCE = 2;
const CANVAS_FLOW_ANIMATION_MAX_VALUES = 100000;
const CANVAS_HTML_ATTR_ESCAPE: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
const canvasSelectionDragRows = new WeakMap<object, Map<string, any>>();

/**
 * Emit canvas v1 unsupported option warning.
 * @param {string} message Warning message
 * @private
 */
function warn(message: string): void {
	window.console?.warn?.(`[billboard.js] ${message}`);
}

/**
 * Get formatted legend text.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Data id
 * @returns {string} Legend text
 * @private
 */
function getLegendText($$, id: string): string {
	const {config} = $$;
	const text = config.data_names[id] ?? id;

	return isFunction(config.legend_format) ?
		config.legend_format(text, id !== text ? id : undefined) :
		text;
}

/**
 * Escape a value for safe HTML attribute interpolation.
 * @param {string} value Attribute value
 * @returns {string} Escaped value
 * @private
 */
function escapeHtmlAttr(value: string): string {
	return `${value}`.replace(/[&<>"']/g, char => CANVAS_HTML_ATTR_ESCAPE[char]);
}

/**
 * Get the point pattern assigned to a legend item.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Data id
 * @returns {string} Point pattern
 * @private
 */
function getCanvasLegendPointPattern($$, id: string): string {
	const {config} = $$;
	const targetIds = $$.mapToIds?.($$.data.targets) || [];
	const pattern = $$.getValidPointPattern?.() || (
		Array.isArray(config.point_pattern) && config.point_pattern.length ?
			config.point_pattern :
			[config.point_type]
	);
	const index = Math.max(0, targetIds.indexOf(id));

	return pattern[index % pattern.length] || "circle";
}

/**
 * Build inline SVG markup for a canvas HTML legend point tile.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Data id
 * @returns {string} SVG markup
 * @private
 */
function getCanvasLegendPointIcon($$, id: string): string {
	const color = escapeHtmlAttr($$.color(id));
	const pattern = getCanvasLegendPointPattern($$, id);
	const svgAttrs = "viewBox=\"0 0 8 8\" aria-hidden=\"true\" focusable=\"false\" " +
		"style=\"display:block;width:100%;height:100%;overflow:visible;pointer-events:none\"";
	const paintAttrs = `fill="${color}" stroke="${color}"`;

	if (/^rect(angle)?$/i.test(pattern)) {
		return `<svg ${svgAttrs}><rect x="1" y="1" width="6" height="6" ${paintAttrs}></rect></svg>`;
	}

	if (!pattern || /^circle$/i.test(pattern)) {
		return `<svg ${svgAttrs}><circle cx="4" cy="4" r="3" ${paintAttrs}></circle></svg>`;
	}

	return `<svg ${svgAttrs}><g ${paintAttrs}>${sanitize(pattern)}</g></svg>`;
}

/**
 * Update legend item lookup cache for canvas HTML legends.
 * @param {object} $$ ChartInternal instance
 * @param {object} item Legend item selection
 * @private
 */
function updateCanvasLegendItemMap($$, item): void {
	const itemMap = new Map<string, HTMLElement>();

	item.each(function(id: string) {
		itemMap.set(id, this);
	});

	$$.cache.add(KEY.legendItemMap, itemMap);
}

/**
 * Apply shared canvas HTML legend classes and state.
 * @param {object} $$ ChartInternal instance
 * @param {object} item Legend item selection
 * @private
 */
function setCanvasHtmlLegendItem($$, item): void {
	const {config} = $$;

	item
		.attr("class", function(id: string) {
			const current = d3Select(this).attr("class") || "";
			const next = `${current} ${$$.generateClass($LEGEND.legendItem, id)}`;

			return Array.from(new Set(next.trim().split(/\s+/).filter(Boolean))).join(" ");
		})
		.style("visibility", id => ($$.isLegendToShow(id) ? null : "hidden"))
		.classed($LEGEND.legendItemHidden, id => !$$.isTargetToShow(id))
		.classed($CANVAS.legendItemInteractive, !!config.interaction_enabled);

	updateCanvasLegendItemMap($$, item);
}

/**
 * Apply SVG-compatible legend focus styling to canvas HTML legend items.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Focused data id
 * @private
 */
function setCanvasHtmlLegendFocus($$, id: string): void {
	const {legend} = $$.$el;
	const targetIds = $$.mapToTargetIds?.([id]) || [id];

	legend?.selectAll(`.${$LEGEND.legendItem}`)
		.classed($FOCUS.legendItemFocused, (d: string) => targetIds.indexOf(d) >= 0)
		.style("opacity", function(d: string) {
			return targetIds.indexOf(d) >= 0 ?
				null :
				$$.opacityForUnfocusedLegend.call($$, d3Select(this));
		});
}

/**
 * Revert canvas HTML legend focus styling.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function revertCanvasHtmlLegendFocus($$): void {
	const {legend} = $$.$el;

	legend?.selectAll(`.${$LEGEND.legendItem}`)
		.classed($FOCUS.legendItemFocused, false)
		.style("opacity", null);
}

/**
 * Apply SVG-compatible target focus state for canvas redraw.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Focused data id
 * @private
 */
function setCanvasLegendTargetFocus($$, id: string): void {
	const {state} = $$;
	const targetIds = $$.mapToTargetIds?.([id]) || [id];
	const focusedIds = targetIds.filter($$.isTargetToShow, $$);
	const focusedSet = new Set(focusedIds);
	const defocusedIds = ($$.mapToTargetIds?.() || [])
		.filter(targetId => !focusedSet.has(targetId) && $$.isTargetToShow(targetId));

	state.focusedTargetIds = focusedSet;
	state.defocusedTargetIds = new Set(defocusedIds);
	$$.renderCanvasFrame?.(undefined, null, false);
}

/**
 * Revert canvas target focus state.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function revertCanvasLegendTargetFocus($$): void {
	const {state} = $$;
	const changed = !!state.focusedTargetIds?.size || !!state.defocusedTargetIds?.size;

	state.focusedTargetIds = new Set();
	state.defocusedTargetIds = new Set();
	changed && $$.renderCanvasFrame?.(undefined, null, false);
}

/**
 * Get touch point from a canvas legend touch event.
 * @param {TouchEvent} event Touch event
 * @returns {Touch | undefined} Touch point
 * @private
 */
function getCanvasLegendTouchPoint(event): Touch | undefined {
	return event.changedTouches?.[0] || event.touches?.[0];
}

/**
 * Store the touch start position for canvas legend tap detection.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Legend data id
 * @param {TouchEvent} event Touch event
 * @private
 */
function setCanvasLegendTouchStart($$, id: string, event): void {
	const touch = getCanvasLegendTouchPoint(event);

	$$.state.canvasLegendTouch = touch ?
		{
			id,
			x: touch.clientX,
			y: touch.clientY,
			moved: false
		} :
		null;
}

/**
 * Update whether the current canvas legend touch moved beyond tap tolerance.
 * @param {object} $$ ChartInternal instance
 * @param {TouchEvent} event Touch event
 * @private
 */
function updateCanvasLegendTouchMove($$, event): void {
	const start = $$.state.canvasLegendTouch;
	const touch = start && getCanvasLegendTouchPoint(event);

	if (touch) {
		start.moved = start.moved ||
			Math.abs(touch.clientX - start.x) > CANVAS_LEGEND_TOUCH_TAP_THRESHOLD ||
			Math.abs(touch.clientY - start.y) > CANVAS_LEGEND_TOUCH_TAP_THRESHOLD;
	}
}

/**
 * Determine whether a touch sequence is a canvas legend tap.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Legend data id
 * @param {TouchEvent} event Touch event
 * @returns {boolean} Whether the touch sequence is a tap
 * @private
 */
function isCanvasLegendTouchTap($$, id: string, event): boolean {
	updateCanvasLegendTouchMove($$, event);

	const start = $$.state.canvasLegendTouch;

	$$.state.canvasLegendTouch = null;

	return !!start && start.id === id && !start.moved;
}

/**
 * Mark a canvas legend touch tap so the following compatibility click can be skipped.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Legend data id
 * @private
 */
function markCanvasLegendTouchClick($$, id: string): void {
	$$.state.canvasLegendLastTouchClickId = id;
	$$.state.canvasLegendLastTouchClickTime = Date.now();
}

/**
 * Check if a canvas legend click duplicates a recent touch tap.
 * @param {object} $$ ChartInternal instance
 * @param {string} id Legend data id
 * @returns {boolean} Whether the click is duplicate
 * @private
 */
function isDuplicateCanvasLegendTouchClick($$, id: string): boolean {
	const {state} = $$;
	const duplicate = state.canvasLegendLastTouchClickId === id &&
		Date.now() - (state.canvasLegendLastTouchClickTime || 0) <
			CANVAS_LEGEND_TOUCH_CLICK_TIMEOUT;

	if (duplicate) {
		state.canvasLegendLastTouchClickId = null;
		state.canvasLegendLastTouchClickTime = 0;
	}

	return duplicate;
}

/**
 * Bind canvas HTML legend interactions without invoking SVG focus paths.
 * @param {object} $$ ChartInternal instance
 * @param {object} item Legend item selection
 * @private
 */
function bindCanvasHtmlLegendInteractions($$, item): void {
	const {api, config, state} = $$;

	item.on("click dblclick mouseover mouseout touchstart touchmove touchend", null);

	if (!config.interaction_enabled) {
		return;
	}

	const interaction = config.legend_item_interaction;
	const eventType = typeof interaction === "object" && interaction?.dblclick ?
		"dblclick" :
		"click";
	const isTouch = state.inputType === "touch";
	const hasClickInteraction = interaction || isFunction(config.legend_item_onclick);
	const touchOption = isTouch ? getCanvasTouchListenerOption(config) : undefined;

	const handleCanvasLegendToggle = function(event, id): void {
		if (
			!callFn(config.legend_item_onclick, api, id, !state.hiddenTargetIds.has(id))
		) {
			const selected = d3Select(this);

			if (event.type === "dblclick" || event.altKey) {
				if (
					state.hiddenTargetIds.size &&
					!selected.classed($LEGEND.legendItemHidden)
				) {
					api.show();
				} else {
					api.hide();
					api.show(id);
				}
			} else {
				api.toggle(id);
				selected.classed($FOCUS.legendItemFocused, false);
			}
			revertCanvasLegendTargetFocus($$);
		}

		isTouch && $$.hideTooltip?.();
	};

	item.on(eventType, hasClickInteraction ?
		function(event, id) {
			if (
				isTouch && event.type === "click" &&
				isDuplicateCanvasLegendTouchClick($$, id)
			) {
				return;
			}

			handleCanvasLegendToggle.call(this, event, id);
		} :
		null);

	isTouch && eventType === "click" && hasClickInteraction && item
		.on("touchstart", function(event, id) {
			setCanvasLegendTouchStart($$, id, event);
		}, touchOption)
		.on("touchmove", event => {
			updateCanvasLegendTouchMove($$, event);
		}, touchOption)
		.on("touchend", function(event, id) {
			if (isCanvasLegendTouchTap($$, id, event)) {
				markCanvasLegendTouchClick($$, id);
				handleCanvasLegendToggle.call(this, event, id);
			}
		}, touchOption);

	!isTouch && item
		.on("mouseover", interaction || isFunction(config.legend_item_onover) ?
			function(event, id) {
				if (
					!callFn(config.legend_item_onover, api, id, !state.hiddenTargetIds.has(id))
				) {
					setCanvasHtmlLegendFocus($$, id);
					!state.transiting &&
						$$.isTargetToShow(id) &&
						setCanvasLegendTargetFocus($$, id);
				}
			} :
			null)
		.on("mouseout", interaction || isFunction(config.legend_item_onout) ?
			function(event, id) {
				if (
					!callFn(config.legend_item_onout, api, id, !state.hiddenTargetIds.has(id))
				) {
					revertCanvasHtmlLegendFocus($$);
					revertCanvasLegendTargetFocus($$);
				}
			} :
			null);
}

/**
 * Measure a legend text with the same SVG structure used by the default renderer.
 * @param {object} $$ ChartInternal instance
 * @param {string} text Legend text
 * @returns {object|null} Text bounding rect
 * @private
 */
function measureSvgLegendText($$, text: string): DOMRect | null {
	const chart = $$.$el.chart?.node?.();
	const doc = chart?.ownerDocument;

	if (!chart || !doc) {
		return null;
	}

	const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
	const group = doc.createElementNS("http://www.w3.org/2000/svg", "g");
	const textElement = doc.createElementNS("http://www.w3.org/2000/svg", "text");

	svg.style.cssText = "position:absolute;visibility:hidden;left:-10000px;top:-10000px;";
	group.setAttribute("class", $LEGEND.legendItem);
	textElement.textContent = text;
	group.appendChild(textElement);
	svg.appendChild(group);
	chart.appendChild(svg);

	const rect = getBoundingRect(textElement);

	svg.remove();

	return rect;
}

/**
 * Check if canvas can render the configured x axis type.
 * @param {string} type X axis type
 * @returns {boolean} Whether type is supported
 * @private
 */
function isSupportedCanvasXType(type: string): boolean {
	return /^(indexed|category|log|timeseries)$/.test(type);
}

/**
 * Check if canvas can render the configured y/y2 axis type.
 * @param {string} type Y axis type
 * @returns {boolean} Whether type is supported
 * @private
 */
function isSupportedCanvasYType(type: string): boolean {
	return /^(indexed|log|timeseries)$/.test(type);
}

/**
 * Get client position from mouse, pointer or touch event.
 * @param {Event} event Input event
 * @returns {object|null} Client position
 * @private
 */
function getCanvasEventClientPoint(event: MouseEvent | PointerEvent | TouchEvent) {
	const touchEvent = event as TouchEvent;
	const touch = touchEvent.changedTouches?.[0] || touchEvent.touches?.[0];

	return touch || ("clientX" in event ? event : null);
}

/**
 * Get data row under a canvas pointer event.
 * @param {object} $$ ChartInternal instance
 * @param {Event} event Input event
 * @param {boolean} shapeOnly Whether to skip grouped x-index fallback
 * @returns {object|null} Hit data row
 * @private
 */
function getCanvasEventDatum($$, event: MouseEvent | PointerEvent | TouchEvent, shapeOnly = false) {
	const point = getCanvasEventPoint($$, event);

	return point ?
		(shapeOnly ?
			$$.hitDetector.findNearestShape?.(point[0], point[1]) :
			$$.hitDetector.findNearest(point[0], point[1])) :
		null;
}

/**
 * Check whether a canvas pointer coordinate can select the grouped x index.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Canvas-local coordinates
 * @returns {boolean} Whether x-index hover is allowed
 * @private
 */
function isCanvasXIndexHoverArea($$, point: number[]): boolean {
	const {config, state} = $$;
	const {height, margin, width, xAxisHeight} = state;
	const [x, y] = point;
	const left = margin.left;
	const right = margin.left + width;
	const top = margin.top;
	const bottom = margin.top + height;
	const axisBand = config.axis_x_show ? Math.max(xAxisHeight || 0, 24) : 0;

	if ($$.isMultipleX?.() || state.hasTreemap) {
		return false;
	}

	return config.axis_rotated ?
		y >= top && y <= bottom && x >= left - axisBand && x <= right :
		x >= left && x <= right && y >= top && y <= bottom + axisBand;
}

/**
 * Check whether a canvas pointer coordinate is inside the main plot area.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Canvas-local coordinates
 * @returns {boolean} Whether axis tooltip can be shown
 * @private
 */
function isCanvasAxisTooltipArea($$, point: number[]): boolean {
	const {state: {height, margin, width}} = $$;
	const [x, y] = point;

	return x >= margin.left &&
		x <= margin.left + width &&
		y >= margin.top &&
		y <= margin.top + height;
}

/**
 * Get data row for hover from a canvas-local coordinate.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Canvas-local coordinates
 * @returns {object|null} Hover data row
 * @private
 */
function getCanvasHoverDatumFromPoint($$, point: number[]) {
	return $$.hitDetector.findNearest(point[0], point[1]) ||
		(isCanvasXIndexHoverArea($$, point) ?
			$$.hitDetector.findNearestIndexByCoord?.(point[0], point[1]) :
			null);
}

/**
 * Get visible canvas data rows for a tooltip target.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Base data row
 * @returns {Array} Tooltip data rows
 * @private
 */
function getCanvasTooltipData($$, d): any[] {
	const {config, state} = $$;
	const targetsToShow = $$.filterTargetsToShow($$.data.targets);
	const pointBased = isCanvasPointBasedInteraction($$, d);
	const sameXData = config.tooltip_grouped &&
			!state.hasTreemap &&
			!pointBased ?
		$$.filterByX?.(targetsToShow, d.x) :
		null;

	return (state.hasTreemap ?
		[d] :
		(pointBased ?
			[d] :
			(config.tooltip_grouped ?
				(sameXData?.length ?
					sameXData :
					targetsToShow.map(target => target.values[d.index]).filter(Boolean)) :
				[d])))
		.map(v => $$.addName?.(v) || v);
}

/**
 * Get data rows for canvas focus rendering.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Hover data row
 * @param {Array} selectedData Tooltip data rows
 * @returns {Array} Focus data rows
 * @private
 */
function getCanvasFocusData($$, d, selectedData): any[] {
	return $$.isMultipleX?.() && !isCanvasPointBasedInteraction($$, d) ?
		[$$.addName?.(d) || d] :
		selectedData;
}

/**
 * Get canvas-local coordinates from mouse, pointer or touch event.
 * @param {object} $$ ChartInternal instance
 * @param {Event} event Input event
 * @returns {Array|null} Canvas-local coordinates
 * @private
 */
function getCanvasEventPoint($$, event: MouseEvent | PointerEvent | TouchEvent): number[] | null {
	const point = getCanvasEventClientPoint(event);

	if (!point) {
		return null;
	}

	const canvas = $$.$el.canvas.node();
	const rect = getBoundingRect(canvas, true);

	return [point.clientX - rect.left, point.clientY - rect.top];
}

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
 * Get stable key for canvas data callbacks.
 * @param {object} d Data row
 * @returns {string|null} Data key
 * @private
 */
function getCanvasDataKey(d): string | null {
	return d ? `${d.id}:${d.index}` : null;
}

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
 * Check whether a canvas data row should interact as a single point.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {boolean} Whether the row should stay ungrouped
 * @private
 */
function isCanvasPointBasedInteraction($$, d): boolean {
	return !($$.config.axis_x_forceAsSingle && $$.config.tooltip_grouped) &&
		(isCanvasScatterType($$, d) || isCanvasBubbleType($$, d));
}

/**
 * Check if touch input is enabled by option.
 * @param {object} config Config object
 * @returns {boolean} Whether touch is enabled
 * @private
 */
function isCanvasTouchEnabled(config): boolean {
	return config.interaction_inputType_touch !== false;
}

/**
 * Get touch listener passive option following interaction.inputType.touch.preventDefault.
 * @param {object} config Config object
 * @returns {object} Event listener options
 * @private
 */
function getCanvasTouchListenerOption(config): AddEventListenerOptions {
	const preventDefault = config.interaction_inputType_touch?.preventDefault;
	const isPrevented = (isBoolean(preventDefault) && preventDefault) || false;
	const preventThreshold = (!isNaN(preventDefault) && preventDefault) || null;

	return {
		passive: !isPrevented && preventThreshold === null
	};
}

/**
 * Create touch preventDefault handler following interaction.inputType.touch.preventDefault.
 * @param {object} config Config object
 * @returns {function} Touch preventer
 * @private
 */
function getCanvasTouchPreventer(config): (event: TouchEvent) => void {
	const preventDefault = config.interaction_inputType_touch?.preventDefault;
	const isPrevented = (isBoolean(preventDefault) && preventDefault) || false;
	const preventThreshold = (!isNaN(preventDefault) && preventDefault) || null;
	let startPx;

	return event => {
		const touch = event.changedTouches?.[0] || event.touches?.[0];

		if (!touch) {
			return;
		}

		const currentXY = touch[`client${config.axis_rotated ? "Y" : "X"}`];

		if (event.type === "touchstart") {
			if (isPrevented) {
				event.preventDefault();
			} else if (preventThreshold !== null) {
				startPx = currentXY;
			}
		} else if (
			event.type === "touchmove" &&
			(
				isPrevented ||
				startPx === true ||
				(
					preventThreshold !== null &&
					Math.abs(startPx - currentXY) >= preventThreshold
				)
			)
		) {
			startPx = true;
			event.preventDefault();
		}
	};
}

/**
 * Check whether a pointer event should be handled by canvas pointer path.
 * @param {object} $$ ChartInternal instance
 * @param {PointerEvent} event Pointer event
 * @returns {boolean} Whether event should be handled
 * @private
 */
function shouldHandleCanvasPointerEvent($$, event: PointerEvent): boolean {
	return event.pointerType !== "mouse" && $$.state.inputType !== "touch";
}

/**
 * Check if click event duplicates a recent touch/pointer data click.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {boolean} Whether the click should skip data callback
 * @private
 */
function isDuplicateCanvasInputClick($$, d): boolean {
	const {state} = $$;
	const key = getCanvasDataKey(d);
	const duplicate = key &&
		state.canvasLastInputClickKey === key &&
		Date.now() - (state.canvasLastInputClickTime || 0) < 750;

	if (duplicate) {
		state.canvasLastInputClickKey = null;
		state.canvasLastInputClickTime = 0;
	}

	return Boolean(duplicate);
}

/**
 * Mark a touch/pointer data click so the following compatibility click can be ignored.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @private
 */
function markCanvasInputClick($$, d): void {
	$$.state.canvasLastInputClickKey = getCanvasDataKey(d);
	$$.state.canvasLastInputClickTime = Date.now();
}

/**
 * Get current animation timestamp.
 * @returns {number} Timestamp
 * @private
 */
function getCanvasAnimationTime(): number {
	return window.performance?.now?.() ?? Date.now();
}

/**
 * Check whether a domain can be interpolated for canvas flow.
 * @param {Array} domain Domain values
 * @param {boolean} isLog Whether the domain is in log scale
 * @returns {boolean} Whether domain is numeric/date-like
 * @private
 */
function isCanvasFlowDomain(domain, isLog = false): boolean {
	return Array.isArray(domain) &&
		domain.length >= 2 &&
		domain.every(v => Number.isFinite(+v) && (!isLog || +v > 0));
}

/**
 * Interpolate numeric/date domain values.
 * @param {Array} start Start domain
 * @param {Array} end End domain
 * @param {number} ratio Interpolation ratio
 * @param {boolean} isLog Whether to interpolate in log space
 * @returns {Array} Interpolated domain
 * @private
 */
function interpolateCanvasFlowDomain(start, end, ratio: number, isLog = false): any[] {
	return start.slice(0, 2).map((value, index) => {
		const next = isLog ?
			Math.exp(Math.log(+value) + ((Math.log(+end[index]) - Math.log(+value)) * ratio)) :
			+value + ((+end[index] - +value) * ratio);

		return value instanceof Date || end[index] instanceof Date ? new Date(next) : next;
	});
}

/**
 * Count current canvas flow values.
 * @param {object} $$ ChartInternal instance
 * @returns {number} Total values
 * @private
 */
function getCanvasFlowValueCount($$): number {
	return $$.data.targets.reduce((sum, target) => sum + target.values.length, 0);
}

/**
 * Sync y/y2 domains for canvas flow frames after data has been appended.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function syncCanvasFlowYDomains($$): void {
	const {scale} = $$;
	const targetsToShow = $$.filterTargetsToShow($$.data.targets);

	(["y", "y2"] as const).forEach(key => {
		scale[key]?.domain($$.getYDomain(targetsToShow, key));
	});

	scale.subY?.domain($$.getYDomain(targetsToShow, "y"));
	scale.subY2?.domain($$.getYDomain(targetsToShow, "y2"));
}

const canvasInternal = {
	/**
	 * Normalize unsupported options before initializing canvas mode.
	 * @private
	 */
	prepareCanvasConfig(): void {
		const {config, state} = this;

		this.warnUnsupportedCanvasOptions();

		if (
			state.orgConfig?.transition &&
			Object.prototype.hasOwnProperty.call(state.orgConfig.transition, "duration") &&
			state.orgConfig.transition.duration
		) {
			warn("canvas mode: transition.duration is ignored; canvas redraws synchronously.");
		}

		config.transition_duration = 0;

		if (!isSupportedCanvasXType(config.axis_x_type)) {
			config.axis_x_type = "indexed";
		}

		if (!isSupportedCanvasYType(config.axis_y_type)) {
			config.axis_y_type = "indexed";
		}

		if (!isSupportedCanvasYType(config.axis_y2_type)) {
			config.axis_y2_type = "indexed";
		}

		if (this.hasType?.("bubble")) {
			config.point_show = true;
			config.point_type = "circle";
		}
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
	 * Finish a pending canvas flow animation before accepting another flow mutation.
	 * @private
	 */
	flushCanvasFlow(): void {
		const {state} = this;

		if (!state.canvasFlowFinish) {
			return;
		}

		state.canvasFlowFrame !== null &&
			window.cancelAnimationFrame?.(state.canvasFlowFrame);
		state.canvasFlowFrame = null;
		state.canvasFlowFinish();
	},

	/**
	 * Animate canvas flow by interpolating the x domain, then commit the final data window.
	 * @param {object} flow Flow metadata
	 * @returns {boolean} Whether animation was started
	 * @private
	 */
	animateCanvasFlow(flow): boolean {
		const $$ = this;
		const {axis, data, org, scale, state} = $$;
		const {done = () => {}, duration, length, orgDataCount} = flow;
		const requestFrame = window.requestAnimationFrame?.bind(window);
		const isLog = !!axis.isLog?.("x");

		if (
			!requestFrame ||
			!duration ||
			!length ||
			!orgDataCount ||
			getCanvasFlowValueCount($$) > CANVAS_FLOW_ANIMATION_MAX_VALUES
		) {
			return false;
		}

		const startDomain = scale.x.domain().slice(0, 2);
		const startOrgDomain = org.xDomain?.slice?.();
		const startSubXDomain = scale.subX?.domain?.().slice?.();

		if (!isCanvasFlowDomain(startDomain, isLog)) {
			return false;
		}

		const removed = data.targets.map(target => target.values.splice(0, length));

		$$.updateXDomain($$.filterTargetsToShow(data.targets), true, true);

		const endDomain = scale.x.domain().slice(0, 2);
		const endOrgDomain = org.xDomain?.slice?.();

		data.targets.forEach((target, index) => {
			target.values.unshift(...removed[index]);
		});

		if (!isCanvasFlowDomain(endDomain, isLog)) {
			startOrgDomain && (org.xDomain = startOrgDomain);
			scale.x.domain(startDomain);
			startSubXDomain && scale.subX.domain(startSubXDomain);
			axis.x.scale(scale.x);

			return false;
		}

		syncCanvasFlowYDomains($$);

		let finished = false;
		const started = getCanvasAnimationTime();
		const finish = () => {
			if (finished) {
				return;
			}

			finished = true;
			data.targets.forEach(target => {
				target.values.splice(0, length);
			});

			endOrgDomain && (org.xDomain = endOrgDomain);
			scale.x.domain(endDomain);
			scale.subX?.domain?.(endOrgDomain ?? endDomain);
			axis.x.scale(scale.x);
			state.dirty.data = true;
			state._eventRectFingerprint = null;
			state.canvasShape = null;
			state._cachedDrawShape = null;

			$$.redraw({
				withLegend: true,
				withTransition: false,
				withTrimXDomain: false,
				withUpdateOrgXDomain: true,
				withUpdateXAxis: true,
				withUpdateXDomain: true
			});
			$$.updateTypesElements();
			state.canvasFlowFrame = null;
			state.canvasFlowFinish = null;
			state.flowing = false;
			done.call($$.api);
		};
		const render = (timestamp: number) => {
			const ratio = Math.min(1, Math.max(0, (timestamp - started) / duration));
			const domain = interpolateCanvasFlowDomain(startDomain, endDomain, ratio, isLog);

			scale.x.domain(domain);
			axis.x.scale(scale.x);
			state.canvasShape = null;
			state._cachedDrawShape = null;
			state._canvasVisibleRangeCache = null;
			state._canvasXTickValuesCache = null;
			$$.renderCanvasFrame(undefined, null, false);

			if (ratio < 1) {
				state.canvasFlowFrame = requestFrame(render);
			} else {
				finish();
			}
		};

		startOrgDomain && (org.xDomain = startOrgDomain);
		scale.x.domain(startDomain);
		startSubXDomain && scale.subX.domain(startSubXDomain);
		axis.x.scale(scale.x);
		state.flowing = true;
		state.cancelClick = true;
		$$.hideTooltip?.();
		state.canvasFlowFinish = finish;
		state.canvasFlowFrame = requestFrame(render);

		return true;
	},

	/**
	 * Initialize canvas renderers, theme, hit detector and event bindings.
	 * @private
	 */
	initCanvas(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const container = $el.chart.node();

		state.isCanvasMode = true;
		state.canvasInlineStyle.minHeight = container.style.minHeight;

		if (window.getComputedStyle(container).position === "static") {
			$el.chart.style("position", "relative");
		}

		$el.chart.style("min-height", `${state.current.height}px`);

		$$.canvasEngine = new CanvasEngine();
		$$.canvasEngine.init(container, state.current.width, $$.getCanvasSurfaceHeight());
		$el.canvas = d3Select($$.canvasEngine.canvas);

		$$.canvasTheme = new CanvasTheme();
		$$.canvasTheme.load(container, config.canvas_theme);

		$$.canvasAxisRenderer = new CanvasAxisRenderer($$.canvasEngine, $$.canvasTheme);
		$$.canvasRenderer = new CanvasRenderer($$.canvasEngine, $$.canvasTheme);
		$$.hitDetector = new HitDetector();

		$$.bindCanvasEvents();
		config.zoom_enabled && $$.bindZoomEvent?.();
	},

	/**
	 * Warn about options that canvas mode does not support yet.
	 * @private
	 */
	warnUnsupportedCanvasOptions(): void {
		const {config} = this;
		const unsupported = [
			[
				!isSupportedCanvasXType(config.axis_x_type),
				"axis.x.type other than indexed/category/log/timeseries"
			],
			[
				!isSupportedCanvasYType(config.axis_y_type),
				"axis.y.type other than indexed/log/timeseries"
			],
			[
				!isSupportedCanvasYType(config.axis_y2_type),
				"axis.y2.type other than indexed/log/timeseries"
			],
			[config.boost_useCssRule, "boost.useCssRule"],
			[this.hasArcType?.(), "arc charts"],
			[this.hasType?.("radar"), "radar chart"],
			[this.hasType?.("polar"), "polar chart"],
			[this.hasType?.("funnel"), "funnel chart"]
		];

		unsupported.forEach(([condition, name]) => {
			condition && warn(`canvas mode: ${name} is not yet supported.`);
		});
	},

	/**
	 * Bind pointer and click handlers to the canvas surface.
	 * @private
	 */
	bindCanvasEvents(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const canvas = $el.canvas.node();
		const preventTouchEvent = getCanvasTouchPreventer(config);
		const touchOption = getCanvasTouchListenerOption(config);

		canvas.addEventListener("mousemove", $$.onCanvasMouseMove.bind($$));
		canvas.addEventListener("mouseenter", event => {
			state.event = event;
			config.onover?.bind($$.api)(event);
		});
		canvas.addEventListener("mouseout", $$.onCanvasMouseOut.bind($$));
		canvas.addEventListener("mouseleave", event => {
			state.event = event;
			config.onout?.bind($$.api)(event);
		});
		canvas.addEventListener("mousedown", event => {
			if ($$.onCanvasSubchartBrushStart?.(event)) {
				return;
			}

			$$.onCanvasSelectionDragStart(event);
		});
		canvas.addEventListener("click", $$.onCanvasClick.bind($$));

		canvas.addEventListener("pointerdown", $$.onCanvasPointerDown.bind($$));
		canvas.addEventListener("pointerenter", $$.onCanvasPointerEnter.bind($$));
		canvas.addEventListener("pointermove", $$.onCanvasPointerMove.bind($$));
		canvas.addEventListener("pointerup", $$.onCanvasPointerUp.bind($$));
		canvas.addEventListener("pointerleave", $$.onCanvasPointerOut.bind($$));
		canvas.addEventListener("pointercancel", $$.onCanvasPointerCancel.bind($$));

		if (isCanvasTouchEnabled(config)) {
			canvas.addEventListener("touchstart", event => {
				preventTouchEvent(event);
				$$.onCanvasTouchStart(event);
			}, touchOption);
			canvas.addEventListener("touchmove", event => {
				preventTouchEvent(event);
				$$.onCanvasTouchMove(event);
			}, touchOption);
			canvas.addEventListener("touchend", $$.onCanvasTouchEnd.bind($$), touchOption);
			canvas.addEventListener("touchcancel", $$.onCanvasTouchCancel.bind($$), touchOption);
		}
	},

	/**
	 * Render and update the HTML legend used by canvas mode.
	 * @private
	 */
	updateHtmlLegend(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const chart = $el.chart.node();

		if (!config.legend_show || state.hasTreemap) {
			if (state.hasTreemap) {
				$el.legend?.remove();
				$el.legend = null;
			} else {
				$el.legend?.style("visibility", "hidden");
			}

			state.legendItemWidth = 0;
			state.legendItemHeight = 0;
			state.legendStep = 0;
			return;
		}

		const targetIds = $$.mapToIds($$.data.targets)
			.filter(id => config.data_names[id] !== null);

		if (config.legend_contents_bindto && config.legend_contents_template) {
			if ($$.updateHtmlLegendTemplate(targetIds)) {
				state.legendItemWidth = 0;
				state.legendItemHeight = 0;
				state.legendStep = 0;
				state.legendHasRendered = true;
			} else {
				state.legendItemWidth = 0;
				state.legendItemHeight = 0;
				state.legendStep = 0;
			}

			return;
		}

		if (!$el.legend) {
			$el.legend = d3Select(chart)
				.append("div")
				.classed($LEGEND.legend, true)
				.classed($CANVAS.legend, true);
		}

		$el.legend.style("visibility", null);

		const legendItems = $el.legend
			.selectAll(`button.${$LEGEND.legendItem}`)
			.data(targetIds, (id: string) => id);

		legendItems.exit().remove();

		const enter = legendItems.enter()
			.append("button")
			.attr("type", "button")
			.attr("data-id", id => id);

		enter.append("span")
			.classed($LEGEND.legendItemTile, true);

		enter.append("span")
			.classed($CANVAS.legendItemTitle, true);

		const item = enter.merge(legendItems as any)
			.attr("class", id => $$.generateClass($LEGEND.legendItem, id).trim());

		setCanvasHtmlLegendItem($$, item);

		item.select(`.${$LEGEND.legendItemTile}`)
			.classed($CANVAS.legendItemTileCircle,
				!config.legend_usePoint && config.legend_item_tile_type === "circle")
			.style("background-color", id => (config.legend_usePoint ? null : $$.color(id)))
			.html(id => (config.legend_usePoint ? getCanvasLegendPointIcon($$, id) : ""));

		item.select(`.${$CANVAS.legendItemTitle}`)
			.text(id => getLegendText($$, id));

		if (config.legend_tooltip) {
			item.attr("title", id => getLegendText($$, id));
		}

		bindCanvasHtmlLegendInteractions($$, item);

		$$.updateHtmlLegendSize(targetIds);
		$$.positionHtmlLegend();
		state.legendHasRendered = true;
	},

	/**
	 * Render canvas mode legend into custom HTML template container.
	 * @param {Array} targetIds Legend target ids
	 * @returns {boolean} Whether template legend was rendered
	 * @private
	 */
	updateHtmlLegendTemplate(targetIds: string[]): boolean {
		const $$ = this;
		const {api, config, $el} = $$;
		const wrapper = d3Select(config.legend_contents_bindto);
		const template = config.legend_contents_template;
		const ids: string[] = [];
		let html = "";

		if (wrapper.empty()) {
			return false;
		}

		targetIds.forEach(id => {
			const content = isFunction(template) ?
				sanitize(template.call(api, id, $$.color(id), api.data(id)[0].values)) :
				tplProcess(template, {
					COLOR: $$.color(id),
					TITLE: id
				});

			if (content) {
				ids.push(id);
				html += content;
			}
		});

		const legendItem = wrapper
			.html(html)
			.classed($LEGEND.legend, true)
			.classed($CANVAS.legend, false)
			.style("visibility", null)
			.selectAll(function() {
				return this.children;
			})
			.data(ids);

		setCanvasHtmlLegendItem($$, legendItem);
		bindCanvasHtmlLegendInteractions($$, legendItem);

		$el.legend = wrapper;

		return true;
	},

	/**
	 * Measure HTML legend items and update legend layout state.
	 * @param {Array} targetIds Visible legend target ids
	 * @private
	 */
	updateHtmlLegendSize(targetIds: string[]): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const itemSizes: number[] = [];
		const itemLayouts: Record<string, any> = {};
		let maxWidth = 0;
		let maxHeight = 0;
		let legendStep = 0;
		const useTemplateLegend = config.legend_contents_bindto && config.legend_contents_template;

		if (useTemplateLegend) {
			$el.legend.selectAll(`.${$LEGEND.legendItem}`)
				.each(function(id) {
					const rect = getBoundingRect(this, true);
					const text = `${getLegendText($$, id)}`;
					const fallbackWidth = Math.max(32, text.length * 7 + 24);
					const fallbackHeight = 20;
					const width = Math.ceil(rect.width || fallbackWidth);
					const height = Math.ceil(rect.height || fallbackHeight);

					itemSizes.push(width);
					maxWidth = Math.max(maxWidth, width);
					maxHeight = Math.max(maxHeight, height);
				});
		} else if (targetIds.length) {
			const isRightOrInset = state.isLegendRight || state.isLegendInset;
			const isRectangle = config.legend_item_tile_type !== "circle";
			const itemTileSize = {
				width: isRectangle ? config.legend_item_tile_width : config.legend_item_tile_r * 2,
				height: isRectangle ? config.legend_item_tile_height : config.legend_item_tile_r * 2
			};
			const dimension = {
				padding: {
					top: 4,
					right: 10
				},
				max: {
					width: 0,
					height: 0
				},
				posMin: 10,
				step: 0,
				tileWidth: itemTileSize.width + 5,
				totalLength: 0
			};
			const sizes = {
				offsets: {},
				widths: {},
				heights: {},
				margins: [0],
				steps: {}
			};
			const measured = targetIds.map((id, index) => {
				const text = `${getLegendText($$, id)}`;
				const rect = measureSvgLegendText($$, text);
				const fallbackWidth = Math.max(32, text.length * 7);
				const fallbackHeight = 12;
				const isLast = index === targetIds.length - 1;
				const hidden = config.legend_show && !$$.isLegendToShow(id);
				const width = hidden ? 0 : (
					(rect?.width || fallbackWidth) +
					dimension.tileWidth +
					(isLast && !isRightOrInset ? 0 : dimension.padding.right) +
					config.legend_padding
				);
				const height = hidden ? 0 : (rect?.height || fallbackHeight) +
					dimension.padding.top;

				dimension.max.width = Math.max(dimension.max.width, width);
				dimension.max.height = Math.max(dimension.max.height, height);

				return {
					id,
					hidden,
					width,
					height
				};
			});
			const areaLength = isRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
			const updateValues = (id: string, itemLength: number, withoutStep = false) => {
				let margin;

				if (!withoutStep) {
					margin = (areaLength - dimension.totalLength - itemLength) / 2;

					if (margin < dimension.posMin) {
						margin = (areaLength - itemLength) / 2;
						dimension.totalLength = 0;
						dimension.step++;
					}
				}

				sizes.steps[id] = dimension.step;
				sizes.margins[dimension.step] = state.isLegendInset ? 10 : margin;
				sizes.offsets[id] = dimension.totalLength;
				dimension.totalLength += itemLength;
			};

			if (state.isLegendInset) {
				dimension.step = config.legend_inset_step ?
					config.legend_inset_step :
					targetIds.length;
				state.legendStep = dimension.step;
			}

			measured.forEach(({id, hidden, width, height}) => {
				const itemWidth = config.legend_equally && !hidden ? dimension.max.width : width;
				const itemHeight = config.legend_equally && !hidden ? dimension.max.height : height;
				const itemLength = isRightOrInset ? itemHeight : itemWidth;

				sizes.widths[id] = itemWidth;
				sizes.heights[id] = itemHeight;
				itemSizes.push(itemWidth);
				maxWidth = Math.max(maxWidth, itemWidth);
				maxHeight = Math.max(maxHeight, itemHeight);

				if (hidden) {
					sizes.steps[id] = 0;
					sizes.offsets[id] = 0;
					return;
				}

				updateValues(id, itemLength);
			});

			const xForLegend = state.isLegendRight ?
				(id: string) => dimension.max.width * sizes.steps[id] :
				state.isLegendInset ?
				(id: string) => dimension.max.width * sizes.steps[id] + 10 :
				(id: string) => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
			const yForLegend = state.isLegendRight || state.isLegendInset ?
				(id: string) => sizes.margins[sizes.steps[id]] + sizes.offsets[id] :
				(id: string) => dimension.max.height * sizes.steps[id];
			const titleX = 4 + itemTileSize.width;
			const tileCenterY = 9;

			measured.forEach(({id, hidden}) => {
				const x = hidden ? 0 : xForLegend(id);
				const y = hidden ? 0 : yForLegend(id);

				itemLayouts[id] = {
					item: {
						x,
						y: y - 5,
						width: sizes.widths[id],
						height: sizes.heights[id]
					},
					title: {
						x: titleX,
						y: 0,
						height: sizes.heights[id]
					},
					tile: {
						x: -2,
						y: tileCenterY - (itemTileSize.height / 2),
						width: itemTileSize.width,
						height: itemTileSize.height
					}
				};
			});
			legendStep = dimension.step;
		}

		if (!targetIds.length) {
			state.legendItemWidth = 0;
			state.legendItemHeight = 0;
			state.legendStep = 0;
			return;
		}

		if (useTemplateLegend) {
			const availableWidth = Math.max(1, state.current.width);
			const rowGap = 10;
			let rows = 1;
			let rowWidth = 0;

			itemSizes.forEach(width => {
				if (rowWidth && rowWidth + rowGap + width > availableWidth) {
					rows++;
					rowWidth = width;
				} else {
					rowWidth += (rowWidth ? rowGap : 0) + width;
				}
			});

			state.legendStep = Math.max(0, rows - 1);
		} else {
			state.legendStep = legendStep;
		}

		state.legendItemWidth = maxWidth;
		state.legendItemHeight = Math.max(12, maxHeight);

		if (!useTemplateLegend) {
			$el.legend.selectAll(`button.${$LEGEND.legendItem}`)
				.each(function(id) {
					const layout = itemLayouts[id];
					const item = d3Select(this);

					if (!layout) {
						return;
					}

					item
						.style("left", `${layout.item.x}px`)
						.style("top", `${layout.item.y}px`)
						.style("width", `${layout.item.width}px`)
						.style("height", `${layout.item.height}px`);

					item.select(`.${$CANVAS.legendItemTitle}`)
						.style("left", `${layout.title.x}px`)
						.style("top", `${layout.title.y}px`)
						.style("height", `${layout.title.height}px`)
						.style("line-height", `${layout.title.height}px`);

					item.select(`.${$LEGEND.legendItemTile}`)
						.style("left", `${layout.tile.x}px`)
						.style("top", `${layout.tile.y}px`)
						.style("width", `${layout.tile.width}px`)
						.style("height", `${layout.tile.height}px`);
				});
		}
	},

	/**
	 * Get bottom legend block height separated from the canvas drawing surface.
	 * @returns {number} Legend block height
	 * @private
	 */
	getCanvasBottomLegendHeight(): number {
		const $$ = this;
		const {config, state, $el} = $$;

		if (
			!config.legend_show ||
			state.isLegendRight ||
			state.isLegendInset ||
			state.hasTreemap ||
			!$el.legend ||
			!state.legendItemHeight
		) {
			return 0;
		}

		const rectHeight = getBoundingRect($el.legend.node(), true).height;
		const rowHeight = state.legendItemHeight * (state.legendStep + 1);

		return Math.ceil(Math.max($$.getLegendHeight?.() || 0, rectHeight || rowHeight));
	},

	/**
	 * Get canvas drawing surface height excluding separately rendered bottom legend DOM.
	 * @returns {number} Canvas drawing surface height
	 * @private
	 */
	getCanvasSurfaceHeight(): number {
		const $$ = this;

		return Math.max(0, $$.state.current.height - $$.getCanvasBottomLegendHeight());
	},

	/**
	 * Position the HTML legend around or inside the canvas chart.
	 * @private
	 */
	positionHtmlLegend(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const legend = $el.legend;

		legend
			.classed($CANVAS.legendBottom, !state.isLegendRight && !state.isLegendInset)
			.classed($CANVAS.legendRight, state.isLegendRight)
			.classed($CANVAS.legendInset, state.isLegendInset)
			.style("top", null)
			.style("right", null)
			.style("bottom", null)
			.style("left", null)
			.style("width", null)
			.style("height", null)
			.style("min-height", null);

		if (state.isLegendRight) {
			legend
				.style("top", `${state.margin3.top}px`)
				.style("right", "0")
				.style("bottom", `${state.margin3.bottom}px`)
				.style("width", `${Math.max(0, $$.getLegendWidth())}px`);
		} else if (!state.isLegendInset) {
			const legendHeight = $$.getLegendHeight?.() || 0;

			legend
				.style("top", `${Math.max(0, state.current.height - legendHeight)}px`)
				.style("right", "0")
				.style("bottom", "auto")
				.style("left", "0");
		} else if (state.isLegendInset) {
			const isTop = state.isLegendTop;
			const isLeft = state.isLegendLeft;

			legend
				.style(isTop ? "top" : "bottom", `${config.legend_inset_y}px`)
				.style(isLeft ? "left" : "right", `${config.legend_inset_x}px`)
				.style("width",
					`${Math.max(0, state.legendItemWidth * (state.legendStep + 1) + 20)}px`);
		}
	},

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
		const targetIds = getCanvasSelectionIds(ids);
		let changed = false;

		if (!config.data_selection_enabled) {
			return;
		}

		eachCanvasSelectableData($$, d => {
			const key = getCanvasDataKey(d);
			const isTargetId = selectionGrouped || !targetIds || targetIds.indexOf(d.id) >= 0;
			const isTargetIndex = !indices || indices.indexOf(d.index) >= 0;
			const isSelected = selected.has(key);

			if (isSelection) {
				if (isTargetId && isTargetIndex && !isSelected) {
					selected.add(key);
					callFn(config.data_onselected, $$.api, d, $$.canvasEngine.canvas);
					changed = true;
				} else if (resetOther && isSelected) {
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
	 * Dispatch canvas data.onout callback for the current hovered row.
	 * @param {HTMLCanvasElement} canvas Canvas element
	 * @private
	 */
	dispatchCanvasDataOut(canvas): void {
		const $$ = this;
		const {config, state} = $$;
		const d = state.canvasDataHover;

		if (!d) {
			return;
		}

		state.canvasDataHover = null;
		state.canvasDataHoverKey = null;
		config.interaction_enabled && callFn(config.data_onout, $$.api, d, canvas);
	},

	/**
	 * Dispatch canvas data.onover callback when the hovered row changes.
	 * @param {object} d Data row
	 * @param {HTMLCanvasElement} canvas Canvas element
	 * @private
	 */
	dispatchCanvasDataOver(d, canvas): void {
		const $$ = this;
		const {config, state} = $$;
		const key = getCanvasDataKey(d);

		if (state.canvasDataHoverKey === key) {
			return;
		}

		$$.dispatchCanvasDataOut(canvas);
		state.canvasDataHover = d;
		state.canvasDataHoverKey = key;
		config.interaction_enabled && d && callFn(config.data_onover, $$.api, d, canvas);
	},

	/**
	 * Dispatch canvas data.onclick callback for a pointer position.
	 * @param {Event} event Input event
	 * @param {boolean} markInputClick Whether to suppress following compatibility click
	 * @returns {object|null} Clicked data row
	 * @private
	 */
	dispatchCanvasDataClick(event: MouseEvent | PointerEvent | TouchEvent, markInputClick = false) {
		const $$ = this;
		const {config, $el} = $$;
		const canvas = $el.canvas.node();
		const d = getCanvasEventDatum($$, event, true);

		if (!d || isDuplicateCanvasInputClick($$, d)) {
			return d;
		}

		if (config.interaction_enabled) {
			const dataRows = config.data_selection_grouped ?
				$$.filterTargetsToShow($$.data.targets)
					.map(target => target.values[d.index])
					.filter(Boolean) :
				[d];

			$$.toggleCanvasSelection?.(dataRows);
			dataRows.forEach(row => callFn(config.data_onclick, $$.api, row, canvas));
			markInputClick && markCanvasInputClick($$, d);
		}

		return d;
	},

	/**
	 * Update canvas subchart brush domain from an input event.
	 * @param {Event} event Input event
	 * @returns {boolean} Whether the brush was updated
	 * @private
	 */
	updateCanvasSubchartBrush(event: MouseEvent | PointerEvent | TouchEvent): boolean {
		const $$ = this;
		const {state} = $$;
		const start = state.canvasSubchartBrushStart;
		const origin = state.canvasSubchartBrushOrigin;
		const mode = state.canvasSubchartBrushMode;
		const coord = getCanvasSubchartBrushCoord($$, event, true);

		if (!state.canvasSubchartBrushDragging || start === null || coord === null || !mode) {
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
	},

	/**
	 * Handle canvas click and dispatch shape-level data onclick.
	 * @param {MouseEvent} event Mouse click event
	 * @private
	 */
	onCanvasClick(event: MouseEvent): void {
		const $$ = this;
		const {config, state} = $$;

		state.event = event;

		if (state.flowing || state.cancelClick) {
			state.cancelClick = false;
			return;
		}

		$$.dispatchCanvasDataClick(event);
		config.onclick?.bind($$.api)(event);
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
	 * Start non-mouse pointer-driven canvas subchart brushing.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerDown(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		const $$ = this;
		const canvas = $$.$el.canvas.node();

		if (!$$.startCanvasSubchartBrush(event)) {
			return;
		}

		const pointerId = event.pointerId;
		const matchesPointer = (event: PointerEvent) => event.pointerId === pointerId;
		const move = (event: PointerEvent) => {
			matchesPointer(event) && $$.updateCanvasSubchartBrush(event);
		};
		const end = (event: PointerEvent) => {
			if (matchesPointer(event)) {
				$$.endCanvasSubchartBrush(event);
				cleanup();
			}
		};
		const cancel = (event: PointerEvent) => {
			if (matchesPointer(event)) {
				$$.cancelCanvasSubchartBrush(event);
				cleanup();
			}
		};

		/**
		 * Remove temporary pointer brush listeners.
		 * @private
		 */
		function cleanup() {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", end);
			window.removeEventListener("pointercancel", cancel);
			try {
				canvas.releasePointerCapture?.(pointerId);
			} catch {
				// Synthetic pointer events used by tests may not be capturable.
			}
		}

		try {
			canvas.setPointerCapture?.(pointerId);
		} catch {
			// Synthetic pointer events used by tests may not be capturable.
		}
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", end);
		window.addEventListener("pointercancel", cancel);
	},

	/**
	 * Handle non-mouse pointer entering the canvas.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerEnter(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		this.state.event = event;
		this.config.onover?.bind(this.api)(event);
	},

	/**
	 * Handle non-mouse pointer movement over the canvas.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerMove(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		if (this.updateCanvasSubchartBrush(event)) {
			return;
		}

		this.onCanvasMouseMove(event);
	},

	/**
	 * Handle non-mouse pointer click.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerUp(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		this.state.event = event;

		if (this.endCanvasSubchartBrush(event)) {
			this.config.onout?.bind(this.api)(event);
			return;
		}

		this.dispatchCanvasDataClick(event, true);
		this.dispatchCanvasDataOut(this.$el.canvas.node());
	},

	/**
	 * Handle non-mouse pointer leaving the canvas.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerOut(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		if (this.state.canvasSubchartBrushDragging) {
			return;
		}

		this.state.event = event;
		this.onCanvasMouseOut();
		this.config.onout?.bind(this.api)(event);
	},

	/**
	 * Handle non-mouse pointer cancellation.
	 * @param {PointerEvent} event Pointer event
	 * @private
	 */
	onCanvasPointerCancel(event: PointerEvent): void {
		if (!shouldHandleCanvasPointerEvent(this, event)) {
			return;
		}

		this.state.event = event;
		if (this.cancelCanvasSubchartBrush(event)) {
			this.config.onout?.bind(this.api)(event);
			return;
		}

		this.onCanvasPointerOut(event);
	},

	/**
	 * Handle touch start over the canvas.
	 * @param {TouchEvent} event Touch event
	 * @private
	 */
	onCanvasTouchStart(event: TouchEvent): void {
		if (event.touches.length > 1) {
			return;
		}

		this.state.event = event;
		if (this.startCanvasSubchartBrush(event)) {
			return;
		}

		if (this.startCanvasSelectionDrag(event)) {
			return;
		}

		this.config.onover?.bind(this.api)(event);
		this.onCanvasMouseMove(event);
	},

	/**
	 * Handle touch move over the canvas.
	 * @param {TouchEvent} event Touch event
	 * @private
	 */
	onCanvasTouchMove(event: TouchEvent): void {
		if (event.touches.length > 1) {
			return;
		}

		if (this.updateCanvasSubchartBrush(event)) {
			return;
		}

		if (this.updateCanvasSelectionDrag(event)) {
			return;
		}

		this.onCanvasMouseMove(event);
	},

	/**
	 * Handle touch end over the canvas.
	 * @param {TouchEvent} event Touch event
	 * @private
	 */
	onCanvasTouchEnd(event: TouchEvent): void {
		this.state.event = event;

		if (this.endCanvasSubchartBrush(event)) {
			this.config.onout?.bind(this.api)(event);
			return;
		}

		if (this.endCanvasSelectionDrag(event)) {
			this.config.onout?.bind(this.api)(event);
			return;
		}

		this.dispatchCanvasDataClick(event, true);
		this.dispatchCanvasDataOut(this.$el.canvas.node());
		this.config.onout?.bind(this.api)(event);
	},

	/**
	 * Handle touch cancellation.
	 * @param {TouchEvent} event Touch event
	 * @private
	 */
	onCanvasTouchCancel(event: TouchEvent): void {
		this.state.event = event;
		this.cancelCanvasSubchartBrush(event);
		this.endCanvasSelectionDrag(event);
		this.onCanvasMouseOut();
		this.config.onout?.bind(this.api)(event);
	},

	/**
	 * Update canvas focus state and tooltip on pointer movement.
	 * @param {Event} event Mouse, pointer or touch move event
	 * @private
	 */
	onCanvasMouseMove(event: MouseEvent | PointerEvent | TouchEvent): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const canvas = $el.canvas.node();

		state.event = event;

		if (state.flowing) {
			return;
		}

		if (state.canvasSelectionDragging) {
			return;
		}

		if ($$.updateCanvasSubchartCursor?.(event)) {
			$$.dispatchCanvasDataOut(canvas);
			if (state.canvasFocusKey) {
				state.canvasFocusKey = null;
				$$.clearCanvasFocus();
			}
			$$.hideTooltip?.();
			return;
		}

		const point = getCanvasEventPoint($$, event);
		const d = point ? getCanvasHoverDatumFromPoint($$, point) : null;

		if (!d) {
			$$.dispatchCanvasDataOut(canvas);
			if (state.canvasFocusKey) {
				state.canvasFocusKey = null;
				$$.clearCanvasFocus();
			}
			if (point && config.axis_tooltip && isCanvasAxisTooltipArea($$, point)) {
				$$.renderCanvasAxisTooltip(point);
				$$.hideTooltip?.();
				return;
			}
			$$.hideTooltip?.();
			return;
		}

		$$.dispatchCanvasDataOver(d, canvas);

		const selectedData = getCanvasTooltipData($$, d);
		const focusData = getCanvasFocusData($$, d, selectedData);
		const focusKey = focusData.map(v => `${v.id}:${v.index}`).join("|");

		if (state.canvasFocusKey !== focusKey || config.axis_tooltip) {
			state.canvasFocusKey = focusKey;
			$$.renderCanvasFocus(focusData, point);
		}

		$$.showTooltip?.(selectedData, canvas);
	},

	/**
	 * Clear focus and tooltip state when the pointer leaves the canvas.
	 * @private
	 */
	onCanvasMouseOut(): void {
		const canvas = this.$el.canvas.node();

		canvas.style.cursor = "";
		this.dispatchCanvasDataOut(canvas);
		if (this.state.canvasFocusKey) {
			this.state.canvasFocusKey = null;
			this.clearCanvasFocus();
		} else if (this.config.axis_tooltip) {
			this.clearCanvasFocus();
		}
		this.hideTooltip?.();
	},

	/**
	 * Show canvas tooltip from linked tooltip propagation.
	 * @param {number} index Data index
	 * @returns {boolean} Whether linked tooltip was shown
	 * @private
	 */
	showCanvasLinkedTooltip(index: number): boolean {
		const $$ = this;
		const {$el, state} = $$;
		const canvas = $el.canvas?.node();
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);
		const d = targetsToShow.map(target => target.values[index]).find(Boolean);

		if (!canvas || !d) {
			$$.hideTooltip?.();
			return false;
		}

		const selectedData = getCanvasTooltipData($$, d);
		const focus = selectedData.find(v => v && hasCanvasDrawableValue($$, v)) ||
			selectedData[0];

		if (!selectedData.length || !focus) {
			$$.hideTooltip?.();
			return false;
		}

		const {left, top} = getBoundingRect(canvas, true);
		const point = getRenderDataPoint($$, focus);
		const eventPoint = [
			state.margin.left + point.x,
			state.margin.top + point.y
		];

		state.event = {
			clientX: left + eventPoint[0],
			clientY: top + eventPoint[1],
			currentTarget: canvas,
			target: canvas
		};
		state.canvasFocusKey = selectedData.map(v => `${v.id}:${v.index}`).join("|");

		$$.renderCanvasFocus(selectedData, eventPoint);
		$$.showTooltip?.(selectedData, canvas);

		return true;
	},

	/**
	 * Draw drag-zoom brush overlay on the cached canvas frame.
	 * @param {number} start Start coordinate
	 * @param {number} end End coordinate
	 * @private
	 */
	renderCanvasZoomBrush(start: number, end: number): void {
		const $$ = this;

		$$.canvasEngine.withOverlay(ctx => {
			$$.canvasRenderer.withContext(ctx, () => {
				$$.canvasRenderer.drawZoomBrush($$, start, end);
			});
		});
	},

	/**
	 * Clear drag-zoom brush overlay.
	 * @private
	 */
	clearCanvasZoomBrush(): void {
		this.canvasEngine.clearOverlay();
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
				$$.canvasRenderer.drawSelectionDragArea($$, rect);
			});
		});
	},

	/**
	 * Draw a complete canvas frame and optionally rebuild hit indexes.
	 * @param {object} shape Cached draw shape object
	 * @param {Array} focusData Focused data rows
	 * @param {boolean} rebuildHit Whether to rebuild hit indexes
	 * @private
	 */
	renderCanvasFrame(shape?, focusData?, rebuildHit = false): void {
		const $$ = this;
		const {state} = $$;
		const drawShape = shape || state.canvasShape || $$.getDrawShape();

		state.canvasShape = drawShape;
		state._canvasVisibleRangeCache = null;
		state._canvasXTickValuesCache = null;

		$$.canvasEngine.beginFrame(state.current.width, $$.getCanvasSurfaceHeight());

		try {
			// user callbacks (tick format, data label format, etc.) run within:
			// guard so a throwing formatter can't leak the saved context state
			$$.canvasRenderer.drawBackground($$);
			$$.canvasAxisRenderer.drawTitle($$);
			state.hasAxis && $$.canvasAxisRenderer.draw($$);
			$$.canvasRenderer.draw($$, drawShape);
			state.hasAxis && $$.config.grid_lines_front &&
				$$.canvasAxisRenderer.drawGridLines($$);
			$$.canvasRenderer.drawSubchart($$, drawShape);
			state.hasAxis && $$.canvasAxisRenderer.drawSubXAxis($$);
			$$.canvasRenderer.drawEmptyLabel($$);
			rebuildHit && $$.hitDetector.rebuild($$, drawShape);
		} finally {
			$$.canvasEngine.endFrame();
		}

		$$.canvasEngine.clearOverlay();
		state.canvasFocusMainRedraw = false;
		focusData && $$.renderCanvasFocus(focusData);
	},

	/**
	 * Restore the cached frame and draw focus overlays.
	 * @param {Array} focusData Focused data rows
	 * @param {Array} point Canvas-local pointer coordinate
	 * @private
	 */
	renderCanvasFocus(focusData, point?): void {
		const $$ = this;
		const {state} = $$;
		const withMainRedraw = $$.canvasRenderer.hasExpandedShapeFocus?.($$, focusData);

		if (withMainRedraw) {
			const drawShape = state.canvasShape || $$.getDrawShape();

			$$.canvasEngine.beginFrame(state.current.width, $$.getCanvasSurfaceHeight());

			try {
				$$.canvasRenderer.drawBackground($$);
				$$.canvasAxisRenderer.drawTitle($$);
				state.hasAxis && $$.canvasAxisRenderer.draw($$);
				$$.canvasRenderer.draw($$, drawShape, focusData);
				state.hasAxis && $$.config.grid_lines_front &&
					$$.canvasAxisRenderer.drawGridLines($$);
				$$.canvasRenderer.drawSubchart($$, drawShape);
				state.hasAxis && $$.canvasAxisRenderer.drawSubXAxis($$);
				$$.canvasRenderer.drawEmptyLabel($$);
			} finally {
				$$.canvasEngine.endFrame();
			}
		}

		state.canvasFocusMainRedraw = !!withMainRedraw;
		$$.canvasEngine.withOverlay(ctx => {
			$$.canvasRenderer.withContext(ctx, () => {
				$$.canvasRenderer.drawFocus($$, focusData);
			});
			$$.canvasAxisRenderer.withContext(ctx, () => {
				$$.canvasAxisRenderer.drawFocusedXAxisTick($$, focusData);
				point && $$.canvasAxisRenderer.drawAxisTooltip($$, point);
			});
		});
	},

	/**
	 * Draw only the canvas axis tooltip overlay.
	 * @param {Array} point Canvas-local pointer coordinate
	 * @private
	 */
	renderCanvasAxisTooltip(point): void {
		const $$ = this;

		$$.canvasEngine.withOverlay(ctx => {
			$$.canvasAxisRenderer.withContext(ctx, () => {
				$$.canvasAxisRenderer.drawAxisTooltip($$, point);
			});
		});
	},

	/**
	 * Restore the cached canvas frame without focus overlays.
	 * @private
	 */
	clearCanvasFocus(): void {
		const $$ = this;

		if ($$.state.canvasFocusMainRedraw) {
			$$.state.canvasFocusMainRedraw = false;
			$$.renderCanvasFrame(undefined, null, false);
		} else {
			$$.canvasEngine?.clearOverlay();
		}
	},

	/**
	 * Resize canvas surfaces and reload canvas theme values.
	 * @private
	 */
	resizeCanvas(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const container = $el.chart.node();

		$el.chart.style("min-height", `${state.current.height}px`);
		$$.canvasEngine?.resize(state.current.width, $$.getCanvasSurfaceHeight());
		$$.canvasTheme?.reload(container, config.canvas_theme);
	}
};

/**
 * Register canvas rendering modules and return canvas render mode.
 * @returns {string} Canvas render mode
 */
export let canvas = (): "canvas" => {
	extend(ChartInternal.prototype, canvasInternal);

	return (canvas = () => "canvas")();
};
