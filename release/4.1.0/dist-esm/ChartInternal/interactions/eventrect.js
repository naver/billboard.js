/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isBoolean, isFunction } from "../../module/util/type-checks.js";
import { getBoundingRect, getPointer, getScrollPosition } from "../../module/util/dom.js";
import { $COMMON, $EVENT, $SHAPE } from "../../config/classes.js";
//#region src/ChartInternal/interactions/eventrect.ts
var eventrect_default = {
	/**
	* Initialize the area that detects the event.
	* Add a container for the zone that detects the event.
	* @private
	*/
	initEventRect() {
		this.$el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $EVENT.eventRects).style("fill-opacity", "0");
	},
	/**
	* Redraws the area that detects the event.
	* @private
	*/
	redrawEventRect() {
		const $$ = this;
		const { config, state, $el } = $$;
		const isMultipleX = $$.isMultipleX();
		const isInverted = config.axis_x_inverted;
		if ($el.eventRect) $$.updateEventRect($el.eventRect, true);
		else if ($$.data.targets.length) {
			const eventRectUpdate = $$.$el.main.select(`.${$EVENT.eventRects}`).style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ? config.axis_rotated ? "ns-resize" : "ew-resize" : null).classed($EVENT.eventRectsMultiple, isMultipleX).classed($EVENT.eventRectsSingle, !isMultipleX).selectAll(`.${$EVENT.eventRect}`).data([0]).enter().append("rect");
			$$.updateEventRect(eventRectUpdate);
			$$.updateEventType(eventRectUpdate);
			eventRectUpdate.call($$.getDraggableSelection());
			$el.eventRect = eventRectUpdate;
			if ($$.state.inputType === "touch" && !$el.svg.on("touchstart.eventRect") && !$$.hasArcType()) $$.bindTouchOnEventRect();
			state.rendered && $$.updateEventRect($el.eventRect, true);
		}
		if (!isMultipleX) {
			const xAxisTickValues = $$.getMaxDataCountTarget();
			if (!config.data_xSort || isInverted) xAxisTickValues.sort((a, b) => isInverted ? b.x - a.x : a.x - b.x);
			$$.updateDataIndexByX(xAxisTickValues);
			$$.updateXs(xAxisTickValues);
			$$.updatePointClass?.(true);
			state.eventReceiver.data = xAxisTickValues;
		}
		$$.updateEventRectData();
	},
	bindTouchOnEventRect() {
		const $$ = this;
		const { config, state, $el: { eventRect, svg } } = $$;
		const selectRect = (context) => {
			if ($$.isMultipleX()) $$.selectRectForMultipleXs(context);
			else {
				const index = $$.getDataIndexFromEvent(state.event);
				$$.callOverOutForTouch(index);
				index === -1 ? $$.unselectRect() : $$.selectRectForSingle(context, index);
			}
		};
		const unselectRect = () => {
			$$.unselectRect();
			$$.callOverOutForTouch();
		};
		const preventDefault = config.interaction_inputType_touch.preventDefault;
		const isPrevented = isBoolean(preventDefault) && preventDefault || false;
		const preventThreshold = !isNaN(preventDefault) && preventDefault || null;
		let startPx;
		const passiveOption = !isPrevented && preventThreshold === null;
		const preventEvent = (event) => {
			const eventType = event.type;
			const currentXY = event.changedTouches[0][`client${config.axis_rotated ? "Y" : "X"}`];
			if (eventType === "touchstart") {
				if (isPrevented) event.preventDefault();
				else if (preventThreshold !== null) startPx = currentXY;
			} else if (eventType === "touchmove") {
				if (isPrevented || startPx === true || preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold) {
					startPx = true;
					event.preventDefault();
				}
			}
		};
		eventRect.on("touchstart", (event) => {
			state.event = event;
			$$.updateEventRect();
		}, { passive: passiveOption }).on("touchstart.eventRect touchmove.eventRect", (event) => {
			state.event = event;
			if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
				if (state.dragging || state.flowing || $$.hasArcType() || event.touches.length > 1) return;
				preventEvent(event);
				selectRect(eventRect.node());
			} else unselectRect();
		}, { passive: passiveOption }).on("touchend.eventRect", (event) => {
			state.event = event;
			if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
				if ($$.hasArcType() || !$$.toggleShape || state.cancelClick) state.cancelClick && (state.cancelClick = false);
			}
		}, { passive: passiveOption });
		svg.on("touchstart", (event) => {
			state.event = event;
			const { target } = event;
			if (target && target !== eventRect.node()) unselectRect();
		}, { passive: passiveOption });
	},
	/**
	* Update event rect size
	* @param {d3Selection} eventRect Event <rect> element
	* @param {boolean} force Force to update
	* @private
	*/
	updateEventRect(eventRect, force = false) {
		const { state, $el } = this;
		const { eventReceiver, width, height, rendered, resizing } = state;
		const rectElement = eventRect || $el.eventRect;
		const updateClientRect = () => {
			if (eventReceiver) {
				const scrollPos = getScrollPosition($el.chart.node());
				eventReceiver.rect = getBoundingRect(rectElement.node(), true).toJSON();
				eventReceiver.rect.top += scrollPos.y;
				eventReceiver.rect.left += scrollPos.x;
			}
		};
		if (!rendered || resizing || force) {
			rectElement.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height);
			if (!rendered || force) rectElement.classed($EVENT.eventRect, true);
		}
		updateClientRect();
	},
	/**
	* Update event type (single or multiple x)
	* @param {d3Selection | boolean} target Target element or boolean to rebind event
	*/
	updateEventType(target) {
		const $$ = this;
		const isRebindCall = isBoolean(target);
		const eventRect = isRebindCall ? $$.$el.eventRect : target;
		const unbindEvent = isRebindCall ? target !== eventRect?.datum().multipleX : false;
		if (eventRect) {
			unbindEvent && eventRect?.on("mouseover mousemove mouseout click", null);
			$$.isMultipleX() ? $$.generateEventRectsForMultipleXs(eventRect) : $$.generateEventRectsForSingleX(eventRect);
		}
	},
	/**
	* Updates the location and size of the eventRect.
	* @private
	*/
	updateEventRectData() {
		const $$ = this;
		const { config, scale, state } = $$;
		const xScale = scale.zoom || scale.x;
		const isRotated = config.axis_rotated;
		const isMultipleX = $$.isMultipleX();
		const xDomain = xScale?.domain();
		const fingerprint = xDomain ? `${xDomain[0]}_${xDomain[1]}_${state.width}_${state.height}_${$$.data.targets.length}_${state.dataGeneration}_${[...state.hiddenTargetIds].join(",")}` : null;
		if (fingerprint && fingerprint === state._eventRectFingerprint) return;
		state._eventRectFingerprint = fingerprint;
		let x;
		let y;
		let w;
		let h;
		$$.updateEventType(isMultipleX);
		if (isMultipleX) {
			x = 0;
			y = 0;
			w = state.width;
			h = state.height;
		} else {
			let rectW;
			let rectX;
			if ($$.axis.isCategorized()) {
				rectW = $$.getEventRectWidth();
				rectX = (d) => xScale(d.x) - rectW / 2;
			} else {
				const getPrevNextX = ({ index }) => ({
					prev: $$.getPrevX(index),
					next: $$.getNextX(index)
				});
				rectW = (d) => {
					const x = getPrevNextX(d);
					const xDomain = xScale.domain();
					let val;
					if (x.prev === null && x.next === null) val = isRotated ? state.height : state.width;
					else if (x.prev === null) val = (xScale(x.next) + xScale(d.x)) / 2;
					else if (x.next === null) val = xScale(xDomain[1]) - (xScale(x.prev) + xScale(d.x)) / 2;
					else val = Math.max(0, (xScale(x.next) - xScale(x.prev)) / 2);
					return val;
				};
				rectX = (d) => {
					const x = getPrevNextX(d);
					let val;
					if (x.prev === null && x.next === null) val = 0;
					else if (x.prev === null) val = xScale(xScale.domain()[0]);
					else val = (xScale(d.x) + xScale(x.prev)) / 2;
					return val;
				};
			}
			x = isRotated ? 0 : rectX;
			y = isRotated ? rectX : 0;
			w = isRotated ? state.width : rectW;
			h = isRotated ? rectW : state.height;
		}
		const { eventReceiver } = state;
		const call = (fn, v) => isFunction(fn) ? fn(v) : fn;
		eventReceiver.coords.splice(eventReceiver.data.length);
		eventReceiver.data.forEach((d, i) => {
			eventReceiver.coords[i] = {
				x: call(x, d),
				y: call(y, d),
				w: call(w, d),
				h: call(h, d)
			};
		});
	},
	/**
	* Seletct rect for single x value
	* @param {d3Selection} context Event rect element
	* @param {number} index x Axis index
	* @private
	*/
	selectRectForSingle(context, index) {
		const $$ = this;
		const { config, state, $el: { main, circle } } = $$;
		const isSelectionEnabled = config.data_selection_enabled;
		const isSelectionGrouped = config.data_selection_grouped;
		const isSelectable = config.data_selection_isselectable;
		const isTooltipGrouped = config.tooltip_grouped;
		const selectedData = $$.getAllValuesOnIndex(index);
		if (isTooltipGrouped) {
			$$.showTooltip(selectedData, context);
			$$.showGridFocus?.(selectedData);
			$$.showSubchartGridFocus?.(selectedData);
			if (!isSelectionEnabled || isSelectionGrouped) return;
		}
		!circle && main.selectAll(`.${$COMMON.EXPANDED}:not(.${$SHAPE.shape}-${index})`).classed($COMMON.EXPANDED, false);
		const shapeAtIndex = main.selectAll(`.${$SHAPE.shape}-${index}`).classed($COMMON.EXPANDED, true).style("cursor", isSelectable ? "pointer" : null).filter(function(d) {
			return $$.isWithinShape(this, d);
		});
		shapeAtIndex.call((selected) => {
			const d = selected.data();
			if (isSelectionEnabled && (isSelectionGrouped || isSelectable?.bind($$.api)(d))) context.style.cursor = "pointer";
			if (!isTooltipGrouped) {
				$$.showTooltip(d, context);
				$$.showGridFocus?.(d);
				$$.showSubchartGridFocus?.(d);
				$$.unexpandCircles?.();
				selected.each((d) => $$.setExpand(index, d.id));
			}
		});
		if (!isTooltipGrouped && shapeAtIndex.empty()) {
			const mouse = getPointer(state.event, context);
			const closestData = selectedData.filter((d) => {
				if ($$.isTargetToShow(d.id)) return $$.dist(d, mouse) < $$.getPointSensitivity(d);
				return false;
			});
			if (closestData.length > 0) {
				let closest = closestData[0];
				let minDist = $$.dist(closest, mouse);
				for (let i = 1; i < closestData.length; i++) {
					const d = closestData[i];
					const dist = $$.dist(d, mouse);
					if (dist < minDist) {
						minDist = dist;
						closest = d;
					}
				}
				$$.showTooltip([closest], context);
				$$.showGridFocus?.([closest]);
				$$.showSubchartGridFocus?.([closest]);
				$$.unexpandCircles?.();
				$$.setExpand(index, closest.id, true);
				if (isSelectionEnabled && (isSelectionGrouped || isSelectable?.bind($$.api)(closest))) context.style.cursor = "pointer";
			} else if (config.interaction_onout) {
				$$.hideGridFocus?.();
				$$.hideSubchartGridFocus?.();
				$$.hideTooltip();
				!isSelectionGrouped && $$.setExpand(index);
			}
		}
	},
	/**
	* Select rect for multiple x values
	* @param {d3Selection} context Event rect element
	* @param {boolean} [triggerEvent=true] Whether trigger event or not
	* @private
	*/
	selectRectForMultipleXs(context, triggerEvent = true) {
		const $$ = this;
		const { config, state } = $$;
		const targetsToShow = $$.getTargetsToShow();
		if (state.dragging || $$.hasArcType(targetsToShow)) return;
		const mouse = getPointer(state.event, context);
		const closest = $$.findClosestFromTargets(targetsToShow, mouse);
		if (triggerEvent && state.mouseover && (!closest || closest.id !== state.mouseover.id)) {
			config.data_onout.call($$.api, state.mouseover);
			state.mouseover = void 0;
		}
		if (!closest) {
			$$.unselectRect();
			return;
		}
		const selectedData = ($$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped ? [closest] : $$.filterByX(targetsToShow, closest.x)).map((d) => $$.addName(d));
		$$.showTooltip(selectedData, context);
		$$.setExpand(closest.index, closest.id, true);
		$$.showGridFocus?.(selectedData);
		$$.showSubchartGridFocus?.(selectedData);
		const dist = $$.dist(closest, mouse);
		if ($$.isBarType(closest.id) || dist < $$.getPointSensitivity(closest)) {
			$$.$el.eventRect.style("cursor", "pointer");
			if (triggerEvent && (!state.mouseover || state.mouseover.x !== closest.x || state.mouseover.id !== closest.id)) {
				config.data_onover.call($$.api, closest);
				state.mouseover = closest;
			}
		}
	},
	/**
	* Unselect EventRect.
	* @private
	*/
	unselectRect() {
		const $$ = this;
		const { state, $el: { circle, tooltip } } = $$;
		state._lastTooltipMouse = null;
		if (state.isCanvasMode) {
			$$.clearCanvasFocus?.();
			tooltip && $$.hideTooltip();
			return;
		}
		$$.$el.eventRect?.style("cursor", null);
		$$.hideGridFocus?.();
		$$.hideSubchartGridFocus?.();
		if (tooltip) {
			$$.hideTooltip();
			$$._handleLinkedCharts(false);
		}
		circle && !$$.isPointFocusOnly() && $$.unexpandCircles();
		$$.expandBarTypeShapes(false);
	},
	/**
	* Create eventRect for each data on the x-axis.
	* Register touch and drag events.
	* @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
	* @returns {object} d3.select($EVENT.eventRects) object.
	* @private
	*/
	generateEventRectsForSingleX(eventRectEnter) {
		const $$ = this;
		const { config, state } = $$;
		const { eventReceiver } = state;
		const rect = eventRectEnter.style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null).on("click", function(event) {
			state.event = event;
			const { currentIdx, data } = eventReceiver;
			const d = data[currentIdx === -1 ? $$.getDataIndexFromEvent(event) : currentIdx];
			$$.clickHandlerForSingleX.bind(this)(d, $$);
		}).datum({ multipleX: false });
		if (state.inputType === "mouse") {
			const getData = (event) => {
				const index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;
				return index > -1 ? eventReceiver.data[index] : null;
			};
			rect.on("mouseover", (event) => {
				state.event = event;
				$$.updateEventRect();
				Object.values($$.$el.axisTooltip).forEach((v) => v?.style("display", null));
			}).on("mousemove", function(event) {
				const d = getData(event);
				state.event = event;
				if (!d) return;
				let { index } = d;
				const stepType = config.line_step_type;
				if (config.line_step_tooltipMatch && $$.hasType("step") && /^step\-(before|after)$/.test(stepType)) {
					const scale = $$.scale.zoom || $$.scale.x;
					const xs = $$.axis.xs[index];
					const inverted = scale.invert(getPointer(event, this)[0]);
					if (stepType === "step-after" && inverted < xs) index -= 1;
					else if (stepType === "step-before" && inverted > xs) index += 1;
				}
				$$.showAxisGridFocus?.();
				const eventOnSameIdx = config.tooltip_grouped && index === eventReceiver.currentIdx;
				if (state.dragging || state.flowing || $$.hasArcType() || eventOnSameIdx) {
					if (config.tooltip_show && eventOnSameIdx) {
						const [mx, my] = getPointer(event, this);
						const last = state._lastTooltipMouse;
						if (!last || (mx - last[0]) ** 2 + (my - last[1]) ** 2 >= 9) {
							state._lastTooltipMouse = [mx, my];
							$$.setTooltipPosition();
						}
					}
					return;
				}
				if (index !== eventReceiver.currentIdx) {
					$$.setOverOut(false, eventReceiver.currentIdx);
					eventReceiver.currentIdx = index;
				}
				index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, index);
				$$.setOverOut(index !== -1, index);
			}).on("mouseout", (event) => {
				state.event = event;
				if (!$$.config || $$.hasArcType() || eventReceiver.currentIdx === -1 || !config.interaction_onout) return;
				$$.hideAxisGridFocus?.();
				$$.unselectRect();
				$$.setOverOut(false, eventReceiver.currentIdx);
				eventReceiver.currentIdx = -1;
			});
		}
		return rect;
	},
	clickHandlerForSingleX(d, ctx) {
		const $$ = ctx;
		const { config, state, $el: { main } } = $$;
		if (!d || $$.hasArcType() || state.cancelClick) {
			state.cancelClick && (state.cancelClick = false);
			return;
		}
		const { index } = d;
		main.selectAll(`.${$SHAPE.shape}-${index}`).each(function(d2) {
			if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
				$$.toggleShape?.(this, d2, index);
				config.data_onclick.bind($$.api)(d2, this);
			}
		});
	},
	/**
	* Create an eventRect,
	* Register touch and drag events.
	* @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
	* @private
	*/
	generateEventRectsForMultipleXs(eventRectEnter) {
		const $$ = this;
		const { config, state } = $$;
		eventRectEnter.on("click", function(event) {
			state.event = event;
			$$.clickHandlerForMultipleXS.bind(this)($$);
		}).datum({ multipleX: true });
		if (state.inputType === "mouse") eventRectEnter.on("mouseover mousemove", function(event) {
			state.event = event;
			$$.selectRectForMultipleXs(this);
		}).on("mouseout", (event) => {
			state.event = event;
			if (!$$.config || $$.hasArcType() || !config.interaction_onout) return;
			$$.unselectRect();
		});
	},
	clickHandlerForMultipleXS(ctx) {
		const $$ = ctx;
		const { config, state } = $$;
		const targetsToShow = $$.getTargetsToShow();
		if ($$.hasArcType(targetsToShow)) return;
		const mouse = getPointer(state.event, this);
		const closest = $$.findClosestFromTargets(targetsToShow, mouse);
		if (!closest) return;
		const sensitivity = $$.getPointSensitivity(closest);
		if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < sensitivity) $$.$el.main.selectAll(`.${$SHAPE.shapes}${$$.getTargetSelectorSuffix(closest.id)}`).selectAll(`.${$SHAPE.shape}-${closest.index}`).each(function() {
			if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
				$$.toggleShape?.(this, closest, closest.index);
				config.data_onclick.bind($$.api)(closest, this);
			}
		});
	}
};
//#endregion
export { eventrect_default as default };
