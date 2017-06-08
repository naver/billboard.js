/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	drag as d3Drag,
	mouse as d3Mouse,
	select as d3Select,
	event as d3Event
} from "d3";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend} from "../internals/util";

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
			eventRectUpdate = $$.generateEventRectsForMultipleXs(eventRectUpdate.enter())  // enter : only one rect will be added
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
			let startClientY;

			const selectRect = context => {
				const eventType = d3Event.type;
				const touch = d3Event.changedTouches[0];
				const axisRotated = $$.config.axis_rotated;

				// If movement is less than 5px, scrolling outside the chart is prevented from working.
				const currentClientY = touch.clientY;

				if (eventType === "touchstart") {
					startClientY = currentClientY;
					axisRotated && d3Event.preventDefault();
				} else if (eventType === "touchmove" && startClientY) {
					const moveY = Math.abs(startClientY - currentClientY);

					if (!axisRotated && moveY < 5) {
						d3Event.preventDefault();
					}
				}

				if (isMultipleX) {
					$$.selectRectForMultipleXs(context);
				} else {
					const eventRect = getEventRect();
					const index = getIndex(eventRect);

					if (index === -1) {
						$$.unselectRect();
					} else {
						$$.selectRectForSingle(context, eventRect, index);
					}
				}
			};

			const touchHandler = function() {
				const eventRect = getEventRect();

				if (eventRect.classed(CLASS.eventRect)) {
					if ($$.dragging || $$.flowing || $$.hasArcType()) {
						return;
					}

					selectRect(this);
				} else {
					$$.unselectRect();
				}
			};

			$$.svg.on("touchstart", touchHandler)
				.on("touchmove", touchHandler)
				.on("touchend", () => {
					const eventRect = getEventRect();

					if (eventRect.classed(CLASS.eventRect)) {
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
	 * @param {Object} D3.select(CLASS.eventRects) object.
	 */
	updateEventRect(eventRectUpdate) {
		const $$ = this;
		const config = $$.config;
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

					if (prevX === null) { prevX = $$.x.domain()[0]; }
					if (nextX === null) { nextX = $$.x.domain()[1]; }
					return Math.max(0, ($$.x(nextX) - $$.x(prevX)) / 2);
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
						prevX = $$.x.domain()[0];
					}

					return ($$.x(thisX) + $$.x(prevX)) / 2;
				};
			} else {
				const edgs = $$.getEdgeX($$.data.targets);

				rectW = ($$.x(edgs[1]) - $$.x(edgs[0])) / $$.getMaxDataCount();
				rectX = d => $$.x(d.x) - (rectW / 2);
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
		// Show tooltip
		const selectedData = $$.filterTargetsToShow($$.data.targets)
			.map(t => $$.addName($$.getValueOnIndex(t.values, index)));

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
						$$.unexpandCircles(index);
						$$.unexpandBars(index);
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
					if (config.point_focus_expand_enabled) { $$.expandCircles(index, d.id, true); }
					$$.expandBars(index, d.id, true);
				}
			});
	},

	selectRectForMultipleXs(context) {
		const $$ = this;
		const config = $$.config;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		if ($$.dragging) { return; } // do nothing when dragging
		if ($$.hasArcType(targetsToShow)) { return; }

		const mouse = d3Mouse($$.main.select(`.${CLASS.eventRects} .${CLASS.eventRect}`).node());
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

		if ($$.isScatterType(closest) || !config.tooltip_grouped) {
			sameXData = [closest];
		} else {
			sameXData = $$.filterByX(targetsToShow, closest.x);
		}
		// show tooltip when cursor is close to some point
		const selectedData = sameXData.map(d => $$.addName(d));

		$$.showTooltip(selectedData, context);

		// expand points
		if (config.point_focus_expand_enabled) {
			$$.expandCircles(closest.index, closest.id, true);
		}
		$$.expandBars(closest.index, closest.id, true);

		// Show xgrid focus line
		$$.showXGridFocus(selectedData);

		// Show cursor as pointer if point is close to mouse position
		if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
			$$.svg.select(`${CLASS.eventRect}`).style("cursor", "pointer");
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

	/**
	 * Create eventRect for each data on the x-axis.
	 * Register touch and drag events.
	 * @private
	 * @param {Object} D3.select(CLASS.eventRects) object.
	 * @returns {Object} D3.select(CLASS.eventRects) object.
	 */
	generateEventRectsForSingleX(eventRectEnter) {
		const $$ = this;
		const config = $$.config;
		const isMouse = ($$.inputType === "mouse");

		return eventRectEnter.append("rect")
			.attr("class", $$.classEvent.bind($$))
			.style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)
			.on(isMouse ? "mouseover" : undefined, d => {
				if ($$.dragging || $$.flowing || $$.hasArcType()) {
					return;
				} // do nothing while dragging/flowing

				const index = d.index;

				// Expand shapes for selection
				if (config.point_focus_expand_enabled) {
					$$.expandCircles(index, null, true);
				}

				$$.expandBars(index, null, true);

				// Call event handler
				index !== -1 && $$.main.selectAll(`.${CLASS.shape}-${index}`)
					.each(d2 => config.data_onover.call($$.api, d2));
			})
			.on(isMouse ? "mousemove" : undefined, function(d) {
				if ($$.dragging || $$.flowing || $$.hasArcType()) {
					return;
				} // do nothing while dragging/flowing

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
			.on(isMouse ? "mouseout" : undefined, d => {
				if (!$$.config || $$.hasArcType()) {
					return;
				} // chart is destroyed

				const index = d.index;

				$$.unselectRect();
				// Call event handler
				$$.main.selectAll(`.${CLASS.shape}-${index}`)
					.each(d2 => config.data_onout.call($$.api, d2));
			})
			.on(isMouse ? "click" : undefined, d => {
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
				config.data_selection_draggable && $$.drag ? (
					d3Drag().origin(Object)
						.on("drag", function() { $$.drag(d3Mouse(this)); })
						.on("dragstart", function() { $$.dragstart(d3Mouse(this)); })
						.on("dragend", () => { $$.dragend(); })
				) : () => {}
			);
	},

	/**
	 * Create an eventRect,
	 * Register touch and drag events.
	 * @private
	 * @param {Object} D3.select(CLASS.eventRects) object.
	 * @returns {Object} D3.select(CLASS.eventRects) object.
	 */
	generateEventRectsForMultipleXs(eventRectEnter) {
		const $$ = this;
		const config = $$.config;
		const isMouse = ($$.inputType === "mouse");

		return eventRectEnter
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", $$.width)
			.attr("height", $$.height)
			.attr("class", CLASS.eventRect)
			.on(isMouse ? "mouseover" : undefined, function() {
				$$.selectRectForMultipleXs(this);
			})
			.on(isMouse ? "mouseout" : undefined, () => {
				if (!$$.config || $$.hasArcType()) {
					return;
				} // chart is destroyed

				$$.unselectRect();
			})
			.on(isMouse ? "mousemove" : undefined, function() {
				$$.selectRectForMultipleXs(this);
			})
			.on(isMouse ? "click" : undefined, function() {
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
						.each(() => {
							if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
								$$.toggleShape(this, closest, closest.index);
								$$.config.data_onclick.call($$.api, closest, this);
							}
						});
				}
			})
			.call(
				config.data_selection_draggable && $$.drag ? (
					d3Drag().origin(Object)
						.on("drag", function() { $$.drag(d3Mouse(this)); })
						.on("dragstart", function() { $$.dragstart(d3Mouse(this)); })
						.on("dragend", () => { $$.dragend(); })
				) : () => {}
			);
	},

	/**
	 * Dispatch an event.
	 * @private
	 * @param {String} type event type
	 * @param {Number} index Index of eventRect
	 * @param {Object} mouse Object
	 */
	dispatchEvent(type, index, mouse) {
		const $$ = this;
		const selector = $$.isMultipleX() ?
			`.${CLASS.eventRect}` : `${CLASS.eventRect}-${index}`;

		const eventRect = $$.main.select(selector).node();
		const box = eventRect.getBoundingClientRect();
		const x = box.left + (mouse ? mouse[0] : 0);
		const y = box.top + (mouse ? mouse[1] : 0);

		const event = document.createEvent("MouseEvents")
			.initMouseEvent(type, true, true, window, 0, x, y, x, y, false, false, false, false, 0, null);

		eventRect.dispatchEvent(event);
	},
});
