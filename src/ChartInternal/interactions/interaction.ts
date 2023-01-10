/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import {$ARC, $AXIS, $COMMON, $SHAPE, $TREEMAP} from "../../config/classes";
import {KEY} from "../../module/Cache";
import {emulateEvent, getPointer, isNumber, isObject} from "../../module/util";
import type {IArcDataRow} from "../data/IData";

export default {
	selectRectForSingle(context, eventRect, index: number): void {
		const $$ = this;
		const {config, $el: {main, circle}} = $$;
		const isSelectionEnabled = config.data_selection_enabled;
		const isSelectionGrouped = config.data_selection_grouped;
		const isSelectable = config.data_selection_isselectable;
		const isTooltipGrouped = config.tooltip_grouped;
		const selectedData = $$.getAllValuesOnIndex(index);

		if (isTooltipGrouped) {
			$$.showTooltip(selectedData, context);
			$$.showGridFocus?.(selectedData);

			if (!isSelectionEnabled || isSelectionGrouped) {
				return;
			}
		}

		// remove possible previous focused state
		!circle && main.selectAll(`.${$COMMON.EXPANDED}:not(.${$SHAPE.shape}-${index})`).classed($COMMON.EXPANDED, false);

		const shapeAtIndex = main.selectAll(`.${$SHAPE.shape}-${index}`)
			.classed($COMMON.EXPANDED, true)
			.style("cursor", isSelectable ? "pointer" : null)
			.filter(function(d) {
				return $$.isWithinShape(this, d);
			});

		if (shapeAtIndex.empty() && !isTooltipGrouped) {
			$$.hideGridFocus?.();
			$$.hideTooltip();

			!isSelectionGrouped && $$.setExpand(index);
		}

		shapeAtIndex
			.call(selected => {
				const d = selected.data();

				if (isSelectionEnabled &&
					(isSelectionGrouped || isSelectable?.bind($$.api)(d))
				) {
					eventRect.style("cursor", "pointer");
				}

				if (!isTooltipGrouped) {
					$$.showTooltip(d, context);
					$$.showGridFocus?.(d);
					$$.unexpandCircles?.();

					selected.each(d => $$.setExpand(index, d.id));
				}
			});
	},

	/**
	 * Expand data shape/point
	 * @param {number} index Index number
	 * @param {string} id Data id
	 * @param {boolean} reset Reset expand state
	 * @private
	 */
	setExpand(index: number, id?: string, reset?: boolean): void {
		const $$ = this;
		const {config, $el: {circle}} = $$;

		circle && config.point_focus_expand_enabled &&
			$$.expandCircles(index, id, reset);

		// bar, candlestick
		$$.expandBarTypeShapes(true, index, id, reset);
	},

	/**
	 * Expand/Unexpand bar type shapes
	 * @param {boolean} expand Expand or unexpand
	 * @param {number} i Shape index
	 * @param {string} id Data id
	 * @param {boolean} reset Reset expand style
	 * @private
	 */
	expandBarTypeShapes(expand = true, i?: number, id?: string, reset?: boolean): void {
		const $$ = this;

		["bar", "candlestick"]
			.filter(v => $$.$el[v])
			.forEach(v => {
				reset && $$.$el[v].classed($COMMON.EXPANDED, false);
				$$.getShapeByIndex(v, i, id).classed($COMMON.EXPANDED, expand);
			});
	},

	/**
	 * Handle data.onover/out callback options
	 * @param {boolean} isOver Over or not
	 * @param {number|object} d data object
	 * @private
	 */
	setOverOut(isOver: boolean, d: number | IArcDataRow): void {
		const $$ = this;
		const {config, state: {hasRadar, hasTreemap}, $el: {main}} = $$;
		const isArcTreemap = isObject(d);

		// Call event handler
		if (isArcTreemap || d !== -1) {
			const callback = config[isOver ? "data_onover" : "data_onout"].bind($$.api);

			config.color_onover && $$.setOverColor(isOver, d, isArcTreemap);

			if (isArcTreemap && "id") {
				const selector = hasTreemap ? $TREEMAP.treemap : $ARC.arc;

				callback(d, main.select(`.${selector}${$$.getTargetSelectorSuffix((d as IArcDataRow).id)}`).node());
			} else if (!config.tooltip_grouped) {
				const last = $$.cache.get(KEY.setOverOut) || [];

				// select based on the index
				const shapesAtIndex = main.selectAll(`.${$SHAPE.shape}-${d}`)
					.filter(function(d) {
						return $$.isWithinShape(this, d);
					});

				// filter if has new selection
				const shape = shapesAtIndex.filter(function() {
					return last.every(v => v !== this);
				});

				// call onout callback
				if (!isOver || shapesAtIndex.empty() || (
					last.length === shape.size() && shape.nodes().every(((v, i) => v !== last[i]))
				)) {
					while (last.length) {
						const target = last.pop();

						config.data_onout.bind($$.api)(d3Select(target).datum(), target);
					}
				}

				// call onover callback
				shape.each(function() {
					if (isOver) {
						callback(d3Select(this).datum(), this);
						last.push(this);
					}
				});

				$$.cache.add(KEY.setOverOut, last);
			} else {
				if (isOver) {
					config.point_focus_only && hasRadar ?
						$$.showCircleFocus($$.getAllValuesOnIndex(d, true)) :
						$$.setExpand(d, null, true);
				}

				!$$.isMultipleX() && main.selectAll(`.${$SHAPE.shape}-${d}`)
					.each(function(d) {
						callback(d, this);
					});
			}
		}
	},

	/**
	 * Call data.onover/out callback for touch event
	 * @param {number|object} d target index or data object for Arc type
	 * @private
	 */
	callOverOutForTouch(d): void {
		const $$ = this;
		const last = $$.cache.get(KEY.callOverOutForTouch);

		if (isObject(d) && last ? d.id !== last.id : (d !== last)) {
			(last || isNumber(last)) && $$.setOverOut(false, last);
			(d || isNumber(d)) && $$.setOverOut(true, d);

			$$.cache.add(KEY.callOverOutForTouch, d);
		}
	},

	/**
	 * Return draggable selection function
	 * @returns {Function}
	 * @private
	 */
	getDraggableSelection(): Function {
		const $$ = this;
		const {config, state} = $$;

		return config.interaction_enabled && config.data_selection_draggable && $$.drag ?
			d3Drag()
				.on("drag", function(event) {
					state.event = event;
					$$.drag(getPointer(event, this));
				})
				.on("start", function(event) {
					state.event = event;
					$$.dragstart(getPointer(event, this));
				})
				.on("end", event => {
					state.event = event;
					$$.dragend();
				}) : () => {};
	},

	/**
	 * Dispatch a mouse event.
	 * @private
	 * @param {string} type event type
	 * @param {number} index Index of eventRect
	 * @param {Array} mouse x and y coordinate value
	 */
	dispatchEvent(type: string, index: number, mouse): void {
		const $$ = this;
		const {config, state: {
			eventReceiver, hasAxis, hasRadar, hasTreemap
		}, $el: {eventRect, arcs, radar, treemap}} = $$;
		const element = (
			(hasTreemap && eventReceiver.rect) ||
			(hasRadar && radar.axes.select(`.${$AXIS.axis}-${index} text`)) || (
				eventRect || arcs?.selectAll(`.${$COMMON.target} path`).filter((d, i) => i === index)
			)
		)?.node();

		if (element) {
			const isMultipleX = $$.isMultipleX();
			let {width, left, top} = element.getBoundingClientRect();

			if (hasAxis && !hasRadar && !isMultipleX) {
				const coords = eventReceiver.coords[index];

				width = coords.w;
				left += coords.x;
				top += coords.y;
			}

			const x = left + (mouse ? mouse[0] : 0) + (
				isMultipleX || config.axis_rotated ? 0 : (width / 2)
			);
			const y = top + (mouse ? mouse[1] : 0);
			const params = {
				screenX: x,
				screenY: y,
				clientX: x,
				clientY: y
			};

			emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](
				hasTreemap ? treemap.node() : element,
				type, params);
		}
	},

	setDragStatus(isDragging: boolean): void {
		this.state.dragging = isDragging;
	},

	/**
	 * Unbind zoom events
	 * @private
	 */
	unbindZoomEvent(): void {
		const $$ = this;
		const {$el: {eventRect, zoomResetBtn}} = $$;

		eventRect?.on(".zoom wheel.zoom .drag", null);

		zoomResetBtn?.on("click", null)
			.style("display", "none");
	},

	/**
	 * Unbind all attached events
	 * @private
	 */
	unbindAllEvents():	void {
		const $$ = this;
		const {$el: {arcs, eventRect, legend, region, svg, treemap}, brush} = $$;
		const list = [
			"wheel",
			"click",
			"mouseover",
			"mousemove",
			"mouseout",
			"touchstart",
			"touchmove",
			"touchend",
			"touchstart.eventRect",
			"touchmove.eventRect",
			"touchend.eventRect",
			".brush",
			".drag",
			".zoom",
			"wheel.zoom",
			"dblclick.zoom"
		].join(" ");

		// detach all possible event types
		[svg, eventRect, region?.list, brush?.getSelection(), arcs?.selectAll("path"), legend?.selectAll("g"), treemap]
			.forEach(v => v?.on(list, null));

		$$.unbindZoomEvent?.();
	}
};
