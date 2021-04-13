/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";
import {isboolean, getPointer, isFunction} from "../../module/util";

export default {
	/**
	 * Initialize the area that detects the event.
	 * Add a container for the zone that detects the event.
	 * @private
	 */
	initEventRect(): void {
		const $$ = this;

		$$.$el.main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.eventRects)
			.style("fill-opacity", "0");
	},

	/**
	 * Redraws the area that detects the event.
	 * @private
	 */
	redrawEventRect(): void {
		const $$ = this;
		const {config, state, $el} = $$;
		const isMultipleX = $$.isMultipleX();

		if ($el.eventRect) {
			$$.updateEventRect($el.eventRect, true);
		} else {
			const eventRects = $$.$el.main.select(`.${CLASS.eventRects}`)
				.style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ? (
					config.axis_rotated ? "ns-resize" : "ew-resize"
				) : null)
				.classed(CLASS.eventRectsMultiple, isMultipleX)
				.classed(CLASS.eventRectsSingle, !isMultipleX);

			// append event <rect>
			const eventRectUpdate = eventRects.selectAll(`.${CLASS.eventRect}`)
				.data([0])
				.enter()
				.append("rect");

			$$.updateEventRect(eventRectUpdate);

			// bind event to <rect> element
			isMultipleX ?
				$$.generateEventRectsForMultipleXs(eventRectUpdate) :
				$$.generateEventRectsForSingleX(eventRectUpdate);

			// bind draggable selection
			eventRectUpdate.call($$.getDraggableSelection());

			$el.eventRect = eventRectUpdate;

			if ($$.state.inputType === "touch" && !$el.svg.on("touchstart.eventRect") && !$$.hasArcType()) {
				$$.bindTouchOnEventRect(isMultipleX);
			}
		}

		if (!isMultipleX) {
			// Set data and update eventReceiver.data
			const xAxisTickValues = $$.getMaxDataCountTarget();

			// update data's index value to be alinged with the x Axis
			$$.updateDataIndexByX(xAxisTickValues);
			$$.updateXs(xAxisTickValues);
			$$.updatePointClass && $$.updatePointClass(true);

			state.eventReceiver.data = xAxisTickValues;
		}

		$$.updateEventRectData();
	},

	bindTouchOnEventRect(isMultipleX: boolean): void {
		const $$ = this;
		const {config, state, $el: {eventRect, svg}} = $$;

		const selectRect = context => {
			if (isMultipleX) {
				$$.selectRectForMultipleXs(context);
			} else {
				const index = $$.getDataIndexFromEvent(state.event);

				$$.callOverOutForTouch(index);

				index === -1 ?
					$$.unselectRect() :
					$$.selectRectForSingle(context, eventRect, index);
			}
		};

		const unselectRect = () => {
			$$.unselectRect();
			$$.callOverOutForTouch();
		};

		// call event.preventDefault()
		// according 'interaction.inputType.touch.preventDefault' option
		const preventDefault = config.interaction_inputType_touch.preventDefault;
		const isPrevented = (isboolean(preventDefault) && preventDefault) || false;
		const preventThreshold = (!isNaN(preventDefault) && preventDefault) || null;
		let startPx;

		const preventEvent = event => {
			const eventType = event.type;
			const touch = event.changedTouches[0];
			const currentXY = touch[`client${config.axis_rotated ? "Y" : "X"}`];

			// prevent document scrolling
			if (eventType === "touchstart") {
				if (isPrevented) {
					event.preventDefault();
				} else if (preventThreshold !== null) {
					startPx = currentXY;
				}
			} else if (eventType === "touchmove") {
				if (isPrevented || startPx === true || (
					preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold
				)) {
					// once prevented, keep prevented during whole 'touchmove' context
					startPx = true;
					event.preventDefault();
				}
			}
		};

		// bind touch events
		eventRect
			.on("touchstart", event => {
				state.event = event;
				$$.updateEventRect();
			})
			.on("touchstart.eventRect touchmove.eventRect", event => {
				state.event = event;

				if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
					// if touch points are > 1, means doing zooming interaction. In this case do not execute tooltip codes.
					if (state.dragging || state.flowing || $$.hasArcType() || event.touches.length > 1) {
						return;
					}

					preventEvent(event);
					selectRect(eventRect.node());
				} else {
					unselectRect();
				}
			}, true)
			.on("touchend.eventRect", event => {
				state.event = event;

				if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
					if ($$.hasArcType() || !$$.toggleShape || state.cancelClick) {
						state.cancelClick && (state.cancelClick = false);
					}
				}
			}, true);

		svg.on("touchstart", event => {
			state.event = event;

			const {target} = event;

			if (target && target !== eventRect.node()) {
				unselectRect();
			}
		});
	},

	/**
	 * Update event rect size
	 * @param {d3Selection} eventRect Event <rect> element
	 * @param {boolean} force Force to update
	 * @private
	 */
	updateEventRect(eventRect?, force = false): void {
		const $$ = this;
		const {state, $el} = $$;
		const {eventReceiver, width, height, rendered, resizing} = state;
		const rectElement = eventRect || $el.eventRect;

		const updateClientRect = (): void => {
			eventReceiver && (
				eventReceiver.rect = rectElement.node().getBoundingClientRect()
			);
		};

		if (!rendered || resizing || force) {
			rectElement
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", width)
				.attr("height", height);

			// only for init
			if (!rendered) {
				rectElement.attr("class", CLASS.eventRect);
			}
		}

		updateClientRect();
	},

	/**
	 * Updates the location and size of the eventRect.
	 * @private
	 */
	updateEventRectData(): void {
		const $$ = this;
		const {config, scale, state} = $$;
		const xScale = scale.zoom || scale.x;
		const isRotated = config.axis_rotated;
		let x;
		let y;
		let w;
		let h;

		if ($$.isMultipleX()) {
			// TODO: rotated not supported yet
			x = 0;
			y = 0;
			w = state.width;
			h = state.height;
		} else {
			let rectW;
			let rectX;

			if ($$.axis.isCategorized()) {
				rectW = $$.getEventRectWidth();
				rectX = d => xScale(d.x) - (rectW / 2);
			} else {
				const getPrevNextX = ({index}) => ({
					prev: $$.getPrevX(index),
					next: $$.getNextX(index)
				});

				rectW = (d): number => {
					const x = getPrevNextX(d);

					// if there this is a single data point make the eventRect full width (or height)
					if (x.prev === null && x.next === null) {
						return isRotated ? state.height : state.width;
					}

					if (x.prev === null) {
						x.prev = xScale.domain()[0];
					}

					if (x.next === null) {
						x.next = xScale.domain()[1];
					}

					return Math.max(0, (xScale(x.next) - xScale(x.prev)) / 2);
				};

				rectX = (d): number => {
					const x = getPrevNextX(d);
					const thisX = d.x;

					// if there this is a single data point position the eventRect at 0
					if (x.prev === null && x.next === null) {
						return 0;
					}

					if (x.prev === null) {
						x.prev = xScale.domain()[0];
					}

					return (xScale(thisX) + xScale(x.prev)) / 2;
				};
			}

			x = isRotated ? 0 : rectX;
			y = isRotated ? rectX : 0;
			w = isRotated ? state.width : rectW;
			h = isRotated ? rectW : state.height;
		}

		const {eventReceiver} = state;
		const call: any = (fn, v) => (isFunction(fn) ? fn(v) : fn);

		// reset for possible remains coords data before the data loading
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

	selectRectForMultipleXs(context): void {
		const $$ = this;
		const {config, state} = $$;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		// do nothing when dragging
		if (state.dragging || $$.hasArcType(targetsToShow)) {
			return;
		}

		const mouse = getPointer(state.event, context);
		const closest = $$.findClosestFromTargets(targetsToShow, mouse);

		if (state.mouseover && (!closest || closest.id !== state.mouseover.id)) {
			config.data_onout.call($$.api, state.mouseover);
			state.mouseover = undefined;
		}

		if (!closest) {
			$$.unselectRect();
			return;
		}

		const sameXData = (
			$$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped
		) ? [closest] : $$.filterByX(targetsToShow, closest.x);

		// show tooltip when cursor is close to some point
		const selectedData = sameXData.map(d => $$.addName(d));

		$$.showTooltip(selectedData, context);

		// expand points
		$$.setExpand(closest.index, closest.id, true);

		// Show xgrid focus line
		$$.showGridFocus(selectedData);

		// Show cursor as pointer if point is close to mouse position
		if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
			$$.$el.svg.select(`.${CLASS.eventRect}`).style("cursor", "pointer");

			if (!state.mouseover) {
				config.data_onover.call($$.api, closest);
				state.mouseover = closest;
			}
		}
	},

	/**
	 * Unselect EventRect.
	 * @private
	 */
	unselectRect(): void {
		const $$ = this;
		const {config, $el: {circle, tooltip}} = $$;

		$$.$el.svg.select(`.${CLASS.eventRect}`).style("cursor", null);
		$$.hideGridFocus();

		if (tooltip) {
			$$.hideTooltip();
			$$._handleLinkedCharts(false);
		}

		circle && !config.point_focus_only && $$.unexpandCircles();
		$$.expandBarTypeShapes(false);
	},

	/**
	 * Create eventRect for each data on the x-axis.
	 * Register touch and drag events.
	 * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
	 * @returns {object} d3.select(CLASS.eventRects) object.
	 * @private
	 */
	generateEventRectsForSingleX(eventRectEnter) {
		const $$ = this;
		const {config, state} = $$;
		const {eventReceiver} = state;

		const rect = eventRectEnter
			.style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)
			.on("click", function(event) {
				state.event = event;

				const {currentIdx, data} = eventReceiver;
				const d = data[
					currentIdx === -1 ?
						$$.getDataIndexFromEvent(event) : currentIdx
				];

				$$.clickHandlerForSingleX.bind(this)(d, $$);
			});

		if (state.inputType === "mouse") {
			const getData = event => {
				const index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;

				return index > -1 ? eventReceiver.data[index] : null;
			};

			rect
				.on("mouseover", event => {
					state.event = event;
					$$.updateEventRect();
				})
				.on("mousemove", function(event) {
					const d = getData(event);

					state.event = event;

					// do nothing while dragging/flowing
					if (state.dragging || state.flowing || $$.hasArcType() ||
						!d || (config.tooltip_grouped && d && d.index === eventReceiver.currentIdx)
					) {
						return;
					}

					let {index} = d;

					if ($$.isStepType(d) &&
						config.line_step_type === "step-after" &&
						getPointer(event, this)[0] < $$.scale.x($$.getXValue(d.id, index))
					) {
						index -= 1;
					}

					if (index !== eventReceiver.currentIdx) {
						$$.setOverOut(false, eventReceiver.currentIdx);
						eventReceiver.currentIdx = index;
					}

					index === -1 ?
						$$.unselectRect() : $$.selectRectForSingle(this, rect, index);

					// As of individual data point(or <path>) element can't bind mouseover/out event
					// to determine current interacting element, so use 'mousemove' event instead.
					$$.setOverOut(index !== -1, index);
				})
				.on("mouseout", event => {
					state.event = event;

					// chart is destroyed
					if (!config || $$.hasArcType() || eventReceiver.currentIdx === -1) {
						return;
					}

					$$.unselectRect();
					$$.setOverOut(false, eventReceiver.currentIdx);

					// reset the event current index
					eventReceiver.currentIdx = -1;
				});
		}

		return rect;
	},

	clickHandlerForSingleX(d, ctx): void {
		const $$ = ctx;
		const {config, state, $el: {main}} = $$;

		if (!d || $$.hasArcType() || state.cancelClick) {
			state.cancelClick && (state.cancelClick = false);

			return;
		}

		const {index} = d;

		main.selectAll(`.${CLASS.shape}-${index}`)
			.each(function(d2) {
				if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
					$$.toggleShape && $$.toggleShape(this, d2, index);
					config.data_onclick.bind($$.api)(d2, this);
				}
			});
	},

	/**
	 * Create an eventRect,
	 * Register touch and drag events.
	 * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
	 * @private
	 */
	generateEventRectsForMultipleXs(eventRectEnter): void {
		const $$ = this;
		const {state} = $$;

		eventRectEnter
			.on("click", function(event) {
				state.event = event;
				$$.clickHandlerForMultipleXS.bind(this)($$);
			});

		if (state.inputType === "mouse") {
			eventRectEnter
				.on("mouseover mousemove", function(event) {
					state.event = event;
					$$.selectRectForMultipleXs(this);
				})
				.on("mouseout", event => {
					state.event = event;

					// chart is destroyed
					if (!$$.config || $$.hasArcType()) {
						return;
					}

					$$.unselectRect();
				});
		}
	},

	clickHandlerForMultipleXS(ctx): void {
		const $$ = ctx;
		const {config, state} = $$;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		if ($$.hasArcType(targetsToShow)) {
			return;
		}

		const mouse = getPointer(state.event, this);
		const closest = $$.findClosestFromTargets(targetsToShow, mouse);

		if (!closest) {
			return;
		}

		// select if selection enabled
		if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
			$$.$el.main.selectAll(`.${CLASS.shapes}${$$.getTargetSelectorSuffix(closest.id)}`)
				.selectAll(`.${CLASS.shape}-${closest.index}`)
				.each(function() {
					if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
						$$.toggleShape && $$.toggleShape(this, closest, closest.index);
						config.data_onclick.bind($$.api)(closest, this);
					}
				});
		}
	}
};
