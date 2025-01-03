/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {drag as d3Drag} from "d3-drag";
import {select as d3Select} from "d3-selection";
import {$ARC, $AXIS, $COMMON, $SHAPE} from "../../config/classes";
import {KEY} from "../../module/Cache";
import {
	emulateEvent,
	getPointer,
	getTransformCTM,
	hasViewBox,
	isNumber,
	isObject
} from "../../module/util";
import type {IArcDataRow} from "../data/IData";

export default {
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
		const {config, state: {hasFunnel, hasRadar, hasTreemap}, $el: {main}} = $$;
		const isArcishData = isObject(d);

		// Call event handler
		if (isArcishData || d !== -1) {
			const callback = config[isOver ? "data_onover" : "data_onout"].bind($$.api);

			config.color_onover && $$.setOverColor(isOver, d, isArcishData);

			if (isArcishData && "id") {
				const suffix = $$.getTargetSelectorSuffix((d as IArcDataRow).id);
				const selector = hasFunnel || hasTreemap ?
					`${$COMMON.target + suffix} .${$SHAPE.shape}` :
					$ARC.arc + suffix;

				callback(d, main.select(`.${selector}`).node());
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
				if (
					!isOver || shapesAtIndex.empty() || (
						last.length === shape.size() && shape.nodes().every((v, i) => v !== last[i])
					)
				) {
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
					hasRadar && $$.isPointFocusOnly() ?
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
					$$.drag(getPointer(event, <SVGElement>this));
				})
				.on("start", function(event) {
					state.event = event;
					$$.dragstart(getPointer(event, <SVGElement>this));
				})
				.on("end", event => {
					state.event = event;
					$$.dragend();
				}) :
			() => {};
	},

	/**
	 * Dispatch a mouse event.
	 * @private
	 * @param {string} type event type
	 * @param {number} index Index of eventRect
	 * @param {Array} mouse x and y coordinate value
	 */
	dispatchEvent(type: string, index: number, mouse: [number, number]): void {
		const $$ = this;
		const {
			config,
			state: {
				eventReceiver,
				hasAxis,
				hasFunnel,
				hasRadar,
				hasTreemap
			},
			$el: {eventRect, funnel, radar, svg, treemap}
		} = $$;
		let element = (
			((hasFunnel || hasTreemap) && eventReceiver.rect) ||
			(hasRadar && radar.axes.select(`.${$AXIS.axis}-${index} text`)) || (
				eventRect || $$.getArcElementByIdOrIndex?.(index)
			)
		)?.node();

		if (element) {
			const isMultipleX = $$.isMultipleX();
			const isRotated = config.axis_rotated;
			let {width, left, top} = element.getBoundingClientRect();

			if (hasAxis && !hasRadar && !isMultipleX) {
				const coords = eventReceiver.coords[index];

				if (coords) {
					width = coords.w;
					left += coords.x;
					top += coords.y;
				} else {
					width = 0;
					left = 0;
					top = 0;
				}
			}

			let x = left + (mouse ? mouse[0] : 0) + (
				isMultipleX || isRotated ? 0 : (width / 2)
			);

			// value 4, is to adjust coordinate value set from: scale.ts - updateScales(): $$.getResettedPadding(1)
			let y = top + (mouse ? mouse[1] : 0) + (isRotated ? 4 : 0);

			if (hasViewBox(svg)) {
				const ctm = getTransformCTM($$.$el.eventRect.node(), x, y, false);

				x = ctm.x;
				y = ctm.y;
			}

			const params = {
				screenX: x,
				screenY: y,
				clientX: x,
				clientY: y,
				bubbles: hasRadar // radar type needs to bubble up event
			};

			// for funnel and treemap event bound to <g> node
			if (hasFunnel || hasTreemap) {
				element = (funnel ?? treemap).node();
			}

			emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](
				element,
				type,
				params
			);
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
	unbindAllEvents(): void {
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
		[
			svg,
			eventRect,
			region?.list,
			brush?.getSelection(),
			arcs?.selectAll("path"),
			legend?.selectAll("g"),
			treemap
		]
			.forEach(v => v?.on(list, null));

		$$.unbindZoomEvent?.();
	}
};
