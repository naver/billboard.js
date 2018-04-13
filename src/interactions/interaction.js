/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	mouse as d3Mouse,
	select as d3Select,
	event as d3Event
} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, isBoolean} from "../internals/util";

// emulate event
const emulateEvent = {
	mouse: (() => {
		const getParams = () => ({
			bubbles: false, cancelable: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0
		});

		try {
			// eslint-disable-next-line no-new
			new MouseEvent("t");

			return (el, eventType, params = getParams()) => {
				el.dispatchEvent(new MouseEvent(eventType, params));
			};
		} catch (e) {
			// Polyfills DOM4 MouseEvent
			return (el, eventType, params = getParams()) => {
				const mouseEvent = document.createEvent("MouseEvent");

				// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
				mouseEvent.initMouseEvent(
					eventType,
					params.bubbles,
					params.cancelable,
					window,
					0, // the event's mouse click count
					params.screenX, params.screenY,
					params.clientX, params.clientY,
					false, false, false, false, 0, null
				);

				el.dispatchEvent(mouseEvent);
			};
		}
	})(),
	touch: (el, eventType, params) => {
		const touchObj = new Touch(Object.assign({
			identifier: Date.now(),
			target: el,
			radiusX: 2.5,
			radiusY: 2.5,
			rotationAngle: 10,
			force: 0.5
		}, params));

		el.dispatchEvent(new TouchEvent(eventType, {
			cancelable: true,
			bubbles: true,
			shiftKey: true,
			touches: [touchObj],
			targetTouches: [],
			changedTouches: [touchObj]
		}));
	}
};

extend(ChartInternal.prototype, {
	/**
	 * Initialize the area that detects the event.
	 * Add a container for the zone that detects the event.
	 * @private
	 */
	initEventRect() {
		const $$ = this;

		$$.main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.eventRects)
			.style("fill-opacity", "0");
	},

	/**
	 * Redraws the area that detects the event.
	 * @private
	 */
	redrawEventRect() {
		const $$ = this;
		const config = $$.config;
		const isMultipleX = $$.isMultipleX();
		const eventRects = $$.main.select(`.${CLASS.eventRects}`)
			.style("cursor", config.zoom_enabled ? config.axis_rotated ? "ns-resize" : "ew-resize" : null)
			.classed(CLASS.eventRectsMultiple, isMultipleX)
			.classed(CLASS.eventRectsSingle, !isMultipleX);

		// rects for mouseover
		let eventRectUpdate;
		let maxDataCountTarget;

		// clear old rects
		eventRects.selectAll(`.${CLASS.eventRect}`).remove();

		// open as public constiable
		$$.eventRect = eventRects.selectAll(`.${CLASS.eventRect}`);

		if (isMultipleX) {
			eventRectUpdate = $$.eventRect.data([0]);
			// update
			// enter : only one rect will be added
			eventRectUpdate = $$.generateEventRectsForMultipleXs(eventRectUpdate.enter())
				.merge(eventRectUpdate);
			$$.updateEventRect(eventRectUpdate);
			// exit : not needed because always only one rect exists
		} else {
			// Set data and update $$.eventRect
			maxDataCountTarget = $$.getMaxDataCountTarget($$.data.targets);
			eventRects.datum(maxDataCountTarget ? maxDataCountTarget.values : []);
			$$.eventRect = eventRects.selectAll(`.${CLASS.eventRect}`);
			eventRectUpdate = $$.eventRect.data(d => d);

			// exit
			eventRectUpdate.exit().remove();

			// update
			eventRectUpdate = $$.generateEventRectsForSingleX(eventRectUpdate.enter())
				.merge(eventRectUpdate);

			$$.updateEventRect(eventRectUpdate);
		}

		if ($$.inputType === "touch" && !$$.hasArcType()) {
			const getEventRect = () => {
				const touch = d3Event.changedTouches[0];

				return d3Select(document.elementFromPoint(touch.clientX, touch.clientY));
			};

			const getIndex = eventRect => {
				let index = eventRect && eventRect.attr("class") && eventRect.attr("class")
					.replace(new RegExp(`(${CLASS.eventRect}-?|s)`, "g"), "") * 1;

				if (isNaN(index) || index === null) {
					index = -1;
				}

				return index;
			};

			const selectRect = context => {
				if (isMultipleX) {
					$$.selectRectForMultipleXs(context);
				} else {
					const eventRect = getEventRect();
					const index = getIndex(eventRect);

					$$.setOver(index);

					index === -1 ?
						$$.unselectRect() :
						$$.selectRectForSingle(context, eventRect, index);
				}
			};

			// call event.preventDefault()
			// according 'interaction.inputType.touch.preventDefault' option
			const preventDefault = config.interaction_inputType_touch.preventDefault;
			const isPrevented = (isBoolean(preventDefault) && preventDefault) || false;
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

			$$.svg
				.on("touchstart touchmove", function() {
					const eventRect = getEventRect();

					if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
						if ($$.dragging || $$.flowing || $$.hasArcType()) {
							return;
						}

						preventEvent(d3Event);
						selectRect(this);
					} else {
						$$.unselectRect();
					}
				})
				.on("touchend", () => {
					const eventRect = getEventRect();

					if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
						if ($$.hasArcType() || !$$.toggleShape || $$.cancelClick) {
							$$.cancelClick && ($$.cancelClick = false);

							return;
						}

						// Call event handler
						const index = getIndex(eventRect);

						!isMultipleX && index !== -1 &&
							$$.main.selectAll(`.${CLASS.shape}-${index}`)
								.each(d2 => config.data_onout.call($$.api, d2));
					}
				});
		}
	},

	/**
	 * Updates the location and size of the eventRect.
	 * @private
	 * @param {Object} d3.select(CLASS.eventRects) object.
	 */
	updateEventRect(eventRectUpdate) {
		const $$ = this;
		const config = $$.config;
		const xScale = $$.zoomScale || $$.x;
		const eventRectData = eventRectUpdate || $$.eventRect.data();// set update selection if null
		let x;
		let y;
		let w;
		let h;

		if ($$.isMultipleX()) {
			// TODO: rotated not supported yet
			x = 0;
			y = 0;
			w = $$.width;
			h = $$.height;
		} else {
			let rectW;
			let rectX;

			if (($$.isCustomX() || $$.isTimeSeries()) && !$$.isCategorized()) {
				// update index for x that is used by prevX and nextX
				$$.updateXs();

				rectW = d => {
					let prevX = $$.getPrevX(d.index);
					let nextX = $$.getNextX(d.index);

					// if there this is a single data point make the eventRect full width (or height)
					if (prevX === null && nextX === null) {
						return config.axis_rotated ? $$.height : $$.width;
					}

					if (prevX === null) {
						prevX = xScale.domain()[0];
					}

					if (nextX === null) {
						nextX = xScale.domain()[1];
					}

					return Math.max(0, (xScale(nextX) - xScale(prevX)) / 2);
				};

				rectX = d => {
					const nextX = $$.getNextX(d.index);
					const thisX = $$.data.xs[d.id][d.index];
					let prevX = $$.getPrevX(d.index);

					// if there this is a single data point position the eventRect at 0
					if (prevX === null && nextX === null) {
						return 0;
					}

					if (prevX === null) {
						prevX = xScale.domain()[0];
					}

					return (xScale(thisX) + xScale(prevX)) / 2;
				};
			} else {
				rectW = $$.getEventRectWidth();
				rectX = d => xScale(d.x) - (rectW / 2);
			}

			x = config.axis_rotated ? 0 : rectX;
			y = config.axis_rotated ? rectX : 0;
			w = config.axis_rotated ? $$.width : rectW;
			h = config.axis_rotated ? rectW : $$.height;
		}

		eventRectData.attr("class", $$.classEvent.bind($$))
			.attr("x", x)
			.attr("y", y)
			.attr("width", w)
			.attr("height", h);
	},

	selectRectForSingle(context, eventRect, index) {
		const $$ = this;
		const config = $$.config;
		const selectedData = $$.getAllValuesOnIndex(index);

		if (config.tooltip_grouped) {
			$$.showTooltip(selectedData, context);
			$$.showXGridFocus(selectedData);

			if (!config.data_selection_enabled || config.data_selection_grouped) {
				return;
			}
		}

		$$.main.selectAll(`.${CLASS.shape}-${index}`)
			.each(function() {
				d3Select(this).classed(CLASS.EXPANDED, true);

				if (config.data_selection_enabled) {
					eventRect.style("cursor", config.data_selection_grouped ? "pointer" : null);
				}

				if (!config.tooltip_grouped) {
					$$.hideXGridFocus();
					$$.hideTooltip();

					if (!config.data_selection_grouped) {
						$$.expandCirclesBars(index);
					}
				}
			})
			.filter(function(d) { return $$.isWithinShape(this, d); })
			.each(function(d) {
				if (config.data_selection_enabled) {
					if (config.data_selection_grouped || config.data_selection_isselectable(d)) {
						eventRect.style("cursor", "pointer");
					}
				}

				if (!config.tooltip_grouped) {
					$$.showTooltip([d], this);
					$$.showXGridFocus([d]);
					$$.expandCirclesBars(index, d.id, true);
				}
			});
	},

	expandCirclesBars(index, id, reset) {
		const $$ = this;
		const config = $$.config;

		config.point_focus_expand_enabled &&
			$$.expandCircles(index, id, reset);

		$$.expandBars(index, id, reset);
	},

	selectRectForMultipleXs(context) {
		const $$ = this;
		const config = $$.config;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		// do nothing when dragging
		if ($$.dragging || $$.hasArcType(targetsToShow)) {
			return;
		}

		const mouse = d3Mouse(context);
		const closest = $$.findClosestFromTargets(targetsToShow, mouse);
		let sameXData;

		if ($$.mouseover && (!closest || closest.id !== $$.mouseover.id)) {
			config.data_onout.call($$.api, $$.mouseover);
			$$.mouseover = undefined;
		}

		if (!closest) {
			$$.unselectRect();
			return;
		}

		if ($$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped) {
			sameXData = [closest];
		} else {
			sameXData = $$.filterByX(targetsToShow, closest.x);
		}

		// show tooltip when cursor is close to some point
		const selectedData = sameXData.map(d => $$.addName(d));

		$$.showTooltip(selectedData, context);

		// expand points
		$$.expandCirclesBars(closest.index, closest.id, true);

		// Show xgrid focus line
		$$.showXGridFocus(selectedData);

		// Show cursor as pointer if point is close to mouse position
		if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
			$$.svg.select(`.${CLASS.eventRect}`).style("cursor", "pointer");

			if (!$$.mouseover) {
				config.data_onover.call($$.api, closest);
				$$.mouseover = closest;
			}
		}
	},

	/**
	 * Unselect EventRect.
	 * @private
	 */
	unselectRect() {
		const $$ = this;

		$$.svg.select(`.${CLASS.eventRect}`).style("cursor", null);
		$$.hideXGridFocus();
		$$.hideTooltip();
		$$.unexpandCircles();
		$$.unexpandBars();
	},

	setOver(index) {
		const $$ = this;
		const config = $$.config;

		$$.expandCirclesBars(index, null, true);

		// Call event handler
		index !== -1 && $$.main.selectAll(`.${CLASS.shape}-${index}`)
			.each(d2 => config.data_onover.call($$.api, d2));
	},

	/**
	 * Create eventRect for each data on the x-axis.
	 * Register touch and drag events.
	 * @private
	 * @param {Object} d3.select(CLASS.eventRects) object.
	 * @returns {Object} d3.select(CLASS.eventRects) object.
	 */
	generateEventRectsForSingleX(eventRectEnter) {
		const $$ = this;
		const config = $$.config;

		const rect = eventRectEnter.append("rect")
			.attr("class", $$.classEvent.bind($$))
			.style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)
			.on("click", d => {
				if ($$.hasArcType() || !$$.toggleShape || $$.cancelClick) {
					$$.cancelClick && ($$.cancelClick = false);

					return;
				}

				const index = d.index;

				$$.main.selectAll(`.${CLASS.shape}-${index}`).each(function(d2) {
					if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
						$$.toggleShape(this, d2, index);
						$$.config.data_onclick.call($$.api, d2, this);
					}
				});
			})
			.call(
				config.data_selection_draggable && $$.drag ?
					(d3Drag()
						.origin(Object)
						.on("drag", function() { $$.drag(d3Mouse(this)); })
						.on("dragstart", function() { $$.dragstart(d3Mouse(this)); })
						.on("dragend", () => { $$.dragend(); })
					) : () => {}
			);

		if ($$.inputType === "mouse") {
			rect
				.on("mouseover", d => {
					// do nothing while dragging/flowing
					if ($$.dragging || $$.flowing || $$.hasArcType()) {
						return;
					}

					$$.setOver(d.index);
				})
				.on("mousemove", function(d) {
					// do nothing while dragging/flowing
					if ($$.dragging || $$.flowing || $$.hasArcType()) {
						return;
					}

					let index = d.index;
					const eventRect = $$.svg.select(`.${CLASS.eventRect}-${index}`);

					if ($$.isStepType(d) &&
						$$.config.line_step_type === "step-after" &&
						d3Mouse(this)[0] < $$.x($$.getXValue(d.id, index))
					) {
						index -= 1;
					}

					index === -1 ?
						$$.unselectRect() : $$.selectRectForSingle(this, eventRect, index);
				})
				.on("mouseout", d => {
					// chart is destroyed
					if (!$$.config || $$.hasArcType()) {
						return;
					}

					const index = d.index;

					$$.unselectRect();

					// Call event handler
					$$.main.selectAll(`.${CLASS.shape}-${index}`)
						.each(d2 => config.data_onout.call($$.api, d2));
				});
		}

		return rect;
	},

	/**
	 * Create an eventRect,
	 * Register touch and drag events.
	 * @private
	 * @param {Object} d3.select(CLASS.eventRects) object.
	 * @returns {Object} d3.select(CLASS.eventRects) object.
	 */
	generateEventRectsForMultipleXs(eventRectEnter) {
		const $$ = this;
		const config = $$.config;

		const rect = eventRectEnter
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", $$.width)
			.attr("height", $$.height)
			.attr("class", CLASS.eventRect)
			.on("click", function() {
				const targetsToShow = $$.filterTargetsToShow($$.data.targets);

				if ($$.hasArcType(targetsToShow)) {
					return;
				}

				const mouse = d3Mouse(this);
				const closest = $$.findClosestFromTargets(targetsToShow, mouse);

				if (!closest) {
					return;
				}

				// select if selection enabled
				if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
					$$.main.selectAll(`.${CLASS.shapes}${$$.getTargetSelectorSuffix(closest.id)}`)
						.selectAll(`.${CLASS.shape}-${closest.index}`)
						.each(function() {
							if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
								$$.toggleShape(this, closest, closest.index);
								$$.config.data_onclick.call($$.api, closest, this);
							}
						});
				}
			})
			.call(
				config.data_selection_draggable && $$.drag ?
					(d3Drag().origin(Object)
						.on("drag", function() { $$.drag(d3Mouse(this)); })
						.on("dragstart", function() { $$.dragstart(d3Mouse(this)); })
						.on("dragend", () => { $$.dragend(); })
					) : () => {}
			);

		if ($$.inputType === "mouse") {
			rect
				.on("mouseover mousemove", function() {
					$$.selectRectForMultipleXs(this);
				})
				.on("mouseout", () => {
					// chart is destroyed
					if (!$$.config || $$.hasArcType()) {
						return;
					}

					$$.unselectRect();
				});
		}

		return rect;
	},

	/**
	 * Dispatch a mouse event.
	 * @private
	 * @param {String} type event type
	 * @param {Number} index Index of eventRect
	 * @param {Array} mouse x and y coordinate value
	 */
	dispatchEvent(type, index, mouse) {
		const $$ = this;
		const selector = `.${
			$$.isMultipleX() ? CLASS.eventRect : `${CLASS.eventRect}-${index}`
		}`;

		const eventRect = $$.main.select(selector).node();
		const box = eventRect.getBoundingClientRect();
		const x = box.left + (mouse ? mouse[0] : 0) + (box.width / 2);
		const y = box.top + (mouse ? mouse[1] : 0);
		const params = {
			screenX: x,
			screenY: y,
			clientX: x,
			clientY: y
		};

		emulateEvent[/^mouse/.test(type) ? "mouse" : "touch"](eventRect, type, params);
	}
});
