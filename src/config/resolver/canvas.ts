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
import {hasCanvasDrawableValue, isCanvasBubbleType, isCanvasScatterType} from "../../canvas/util";
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
	sanitize,
	tplProcess
} from "../../module/util";
import type {ICanvasTypeParts} from "./canvasType";

const CANVAS_LEGEND_TOUCH_TAP_THRESHOLD = 10;
const CANVAS_LEGEND_TOUCH_CLICK_TIMEOUT = 750;
const CANVAS_HTML_ATTR_ESCAPE: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};

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
					// hidden data's legend shouldn't react on hover (mirrors SVG focus guard)
					if (!state.transiting && $$.isTargetToShow(id)) {
						setCanvasHtmlLegendFocus($$, id);
						setCanvasLegendTargetFocus($$, id);
					}
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
function measureSvgLegendText(
	$$,
	text: string
): {width: number, height: number, ascent: number} | null {
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
	// the text is drawn at y=0 of the svg: its top is the ascent above it
	const ascent = svg.getBoundingClientRect().top - rect.top;

	svg.remove();

	return {width: rect.width, height: rect.height, ascent};
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

	if ($$.isMultipleX?.() || state.customType || state.hasTreemap) {
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
			!state.customType &&
			!state.hasTreemap &&
			!pointBased ?
		$$.filterByX?.(targetsToShow, d.x) :
		null;

	return (state.customType || state.hasTreemap ?
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
export function getCanvasEventPoint($$, event: MouseEvent | PointerEvent | TouchEvent):
	| number[]
	| null {
	const point = getCanvasEventClientPoint(event);

	if (!point) {
		return null;
	}

	const canvas = $$.$el.canvas.node();
	const rect = getBoundingRect(canvas, true);

	return [point.clientX - rect.left, point.clientY - rect.top];
}

/**
 * Get stable key for canvas data callbacks.
 * @param {object} d Data row
 * @returns {string|null} Data key
 * @private
 */
export function getCanvasDataKey(d): string | null {
	return d ? `${d.id}:${d.index}` : null;
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
 * Chart types that are drawn on canvas by the canvas part of their module (registerCanvasType()).
 * With the svg part only, nothing draws them: the canvas mode falls back to svg.
 * Only the names: a type is not judged by this list when its canvas part is there.
 * @private
 */
const CANVAS_PART_NEEDED = ["treemap"];

const canvasInternal = {
	/**
	 * Get the reason of the svg fallback for a type whose canvas part is not imported.
	 * @returns {string|null} Unsupported chart type reason
	 * @private
	 */
	getUnsupportedCanvasPart(): string | null {
		const missing = CANVAS_PART_NEEDED.find(name =>
			this.hasType(name) && !this.canvasTypes?.[name]
		);

		return missing ? `${missing} chart without its canvas module` : null;
	},

	/**
	 * Get the canvas drawing of an optional feature (registerCanvasFeature()).
	 * @param {string} name Feature name
	 * @returns {object|undefined} Functions of the feature, undefined if its module is not imported
	 * @private
	 */
	getCanvasFeature(name: string): any {
		return this.canvasFeatures?.[name];
	},

	/**
	 * Get the canvas parts of the chart types the chart has (registerCanvasType()).
	 * @returns {Array} Parts of the types, in the order they were registered
	 * @private
	 */
	getCanvasTypeParts(): ICanvasTypeParts[] {
		const types = this.canvasTypes;

		return types ?
			Object.keys(types).filter(name => this.hasType(name)).map(name => types[name]) :
			[];
	},

	/**
	 * Warn when a feature module of the svg entry is imported, but its canvas drawing is not.
	 * The canvas drawing comes with the module of the canvas entry ("billboard.js/canvas").
	 * @private
	 */
	warnMissingCanvasFeatures(): void {
		const {config} = this;
		const features = [
			// [feature, installed by the svg module, used by the chart]
			[
				"grid",
				this.initGrid,
				config.grid_x_show || config.grid_y_show ||
				config.grid_x_lines?.length || config.grid_y_lines?.length
			],
			["subchart", this.initSubchart, config.subchart_show],
			["selection", this.selectPoint, config.data_selection_enabled]
		];

		features.forEach(([name, installed, used]) => {
			installed && used && !this.canvasFeatures?.[name as string] && warn(
				`canvas mode: ${name} is not drawn, because it is not imported from "billboard.js/canvas".`
			);
		});
	},

	/**
	 * Normalize unsupported options before initializing canvas mode.
	 * @private
	 */
	prepareCanvasConfig(): void {
		const {config, state} = this;

		this.warnUnsupportedCanvasOptions();
		this.warnMissingCanvasFeatures();

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
		$$.canvasTheme.load(container, config.canvas_theme,
			$$.getCustomTypeParts?.()?.canvas?.theme);

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
			[this.hasType?.("polar"), "polar chart"]
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

			$$.onCanvasSelectionDragStart?.(event);
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

		// sanitize the concatenated html, as each item's content can form a tag when joined
		const legendItem = wrapper
			.html(sanitize(html))
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
					height,
					text: rect
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
			// SVG draws the text with its baseline 14px below the top of the item (yText - yRect).
			// The HTML text is centered in the line box of the item: place it where SVG has it.
			const getTitleY = (id: string, text) =>
				text ? 14 - text.ascent - (sizes.heights[id] - text.height) / 2 : 0;

			measured.forEach(({id, hidden, text}) => {
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
						y: hidden ? 0 : getTitleY(id, text),
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

		if (!$$.startCanvasSubchartBrush?.(event)) {
			return;
		}

		const pointerId = event.pointerId;
		const matchesPointer = (event: PointerEvent) => event.pointerId === pointerId;
		const move = (event: PointerEvent) => {
			matchesPointer(event) && $$.updateCanvasSubchartBrush?.(event);
		};
		const end = (event: PointerEvent) => {
			if (matchesPointer(event)) {
				$$.endCanvasSubchartBrush?.(event);
				cleanup();
			}
		};
		const cancel = (event: PointerEvent) => {
			if (matchesPointer(event)) {
				$$.cancelCanvasSubchartBrush?.(event);
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

		if (this.updateCanvasSubchartBrush?.(event)) {
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

		if (this.endCanvasSubchartBrush?.(event)) {
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
		if (this.cancelCanvasSubchartBrush?.(event)) {
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
		if (this.startCanvasSubchartBrush?.(event)) {
			return;
		}

		if (this.startCanvasSelectionDrag?.(event)) {
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

		if (this.updateCanvasSubchartBrush?.(event)) {
			return;
		}

		if (this.updateCanvasSelectionDrag?.(event)) {
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

		if (this.endCanvasSubchartBrush?.(event)) {
			this.config.onout?.bind(this.api)(event);
			return;
		}

		if (this.endCanvasSelectionDrag?.(event)) {
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
		this.cancelCanvasSubchartBrush?.(event);
		this.endCanvasSelectionDrag?.(event);
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

		const rawPoint = getCanvasEventPoint($$, event);
		const point = rawPoint && ($$.getCanvasMainPointFromSubchart?.(rawPoint) || rawPoint);
		const d = point ? getCanvasHoverDatumFromPoint($$, point) : null;

		if (!d) {
			$$.dispatchCanvasDataOut(canvas);
			if (state.canvasFocusKey) {
				state.canvasFocusKey = null;
				$$.clearCanvasFocus();
			}
			if (rawPoint && config.axis_tooltip && isCanvasAxisTooltipArea($$, rawPoint)) {
				$$.renderCanvasAxisTooltip(rawPoint);
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
				$$.getCanvasFeature?.("grid")?.drawLines.call($$, $$.canvasAxisRenderer);
			$$.getCanvasFeature?.("subchart")?.draw.call($$, $$.canvasRenderer, drawShape);
			state.hasAxis &&
				$$.getCanvasFeature?.("subchart")?.drawXAxis.call($$, $$.canvasAxisRenderer);
			state.hasAxis &&
				$$.getCanvasFeature?.("subchart")?.drawYAxes.call($$, $$.canvasAxisRenderer);
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
					$$.getCanvasFeature?.("grid")?.drawLines.call($$, $$.canvasAxisRenderer);
				$$.getCanvasFeature?.("subchart")?.draw.call($$, $$.canvasRenderer, drawShape);
				state.hasAxis &&
					$$.getCanvasFeature?.("subchart")?.drawXAxis.call($$, $$.canvasAxisRenderer);
				state.hasAxis &&
					$$.getCanvasFeature?.("subchart")?.drawYAxes.call($$, $$.canvasAxisRenderer);
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

		// about to draw on exact pixels: drop any stretched state
		$$.clearResizePreview();

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
