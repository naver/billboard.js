/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {drag as d3Drag} from "d3-drag";
import {
	zoom as d3Zoom,
	zoomIdentity as d3ZoomIdentity,
	zoomTransform as d3ZoomTransform
} from "d3-zoom";
import {$COMMON, $ZOOM} from "../../config/classes";
import {window} from "../../module/browser";
import {callFn, diffDomain, getPointer, isFunction} from "../../module/util";

export default {
	/**
	 * Initialize zoom.
	 * @private
	 */
	initZoom(): void {
		const $$ = this;

		$$.scale.zoom = null;

		$$.generateZoom();

		$$.config.zoom_type === "drag" &&
			$$.initZoomBehaviour();
	},

	/**
	 * Bind zoom event
	 * @param {boolean} bind Weather bind or unbound
	 * @private
	 */
	bindZoomEvent(bind = true): void {
		const $$ = this;
		const {config} = $$;
		const zoomEnabled = config.zoom_enabled;

		if (zoomEnabled && bind) {
			// Do not bind zoom event when subchart is shown
			!config.subchart_show &&
				$$.bindZoomOnEventRect();
		} else if (bind === false) {
			$$.api.unzoom();
			$$.unbindZoomEvent();
		}
	},

	/**
	 * Generate zoom
	 * @private
	 */
	generateZoom(): void {
		const $$ = this;
		const {config, org, scale} = $$;

		const zoom = d3Zoom().duration(0)
			.on("start", $$.onZoomStart.bind($$))
			.on("zoom", $$.onZoom.bind($$))
			.on("end", $$.onZoomEnd.bind($$));

		// get zoom extent
		// @ts-ignore
		zoom.orgScaleExtent = (): [number, number] => {
			const extent = config.zoom_extent || [1, 10];

			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		};

		// @ts-ignore
		zoom.updateScaleExtent = function() {
			const ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
			const extent = this.orgScaleExtent();

			// https://d3js.org/d3-zoom#zoom_scaleExtent
			this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);

			return this;
		};

		/**
		 * Update scale according zoom transform value
		 * @param {object} transform transform object
		 * @param {boolean} correctTransform if the d3 transform should be updated after rescaling
		 * @private
		 */
		// @ts-ignore
		zoom.updateTransformScale = (transform: d3ZoomTransform,
			correctTransform: boolean): void => {
			const isRotated = config.axis_rotated;

			// in case of resize, update range of orgXScale
			org.xScale?.range(scale.x.range());

			// rescale from the original scale
			const newScale = transform[
				isRotated ? "rescaleY" : "rescaleX"
			](org.xScale || scale.x);

			// prevent drag zoom to be out of range
			if (newScale.domain().some(v => /(Invalid Date|NaN)/.test(v.toString()))) {
				return;
			}

			const domain = $$.trimXDomain(newScale.domain());
			const rescale = config.zoom_rescale;

			newScale.domain(domain, org.xDomain);

			// prevent chart from panning off the edge and feeling "stuck"
			// https://github.com/naver/billboard.js/issues/2588
			if (correctTransform) {
				const t = newScale(scale.x.domain()[0]);
				const tX = isRotated ? transform.x : t;
				const tY = isRotated ? t : transform.y;

				$$.$el.eventRect.property("__zoom",
					d3ZoomIdentity.translate(tX, tY).scale(transform.k));
			}

			if (!$$.state.xTickOffset) {
				$$.state.xTickOffset = $$.axis.x.tickOffset();
			}

			scale.zoom = $$.getCustomizedXScale(newScale);
			$$.axis.x.scale(scale.zoom);

			if (rescale) {
				// copy current initial x scale in case of rescale option is used
				!org.xScale && (org.xScale = scale.x.copy());
				scale.x.domain(domain);
			} else if (org.xScale) {
				scale.x.domain(org.xScale.domain());
				org.xScale = null;
			}
		};

		/**
		 * Get zoom domain
		 * @returns {Array} zoom domain
		 * @private
		 */
		// @ts-ignore
		zoom.getDomain = (): (number | Date)[] => {
			const domain = scale[scale.zoom ? "zoom" : "subX"].domain();
			const isCategorized = $$.axis.isCategorized();

			if (isCategorized) {
				domain[1] -= 2;
			}

			return domain;
		};

		$$.zoom = zoom;
	},

	/**
	 * 'start' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoomStart(event): void {
		const $$ = this;
		const {sourceEvent} = event;

		if (sourceEvent) {
			$$.zoom.startEvent = sourceEvent;
			$$.state.zooming = true;
			callFn($$.config.zoom_onzoomstart, $$.api, event);
		}
	},

	/**
	 * 'zoom' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoom(event): void {
		const $$ = this;
		const {config, scale, state, org} = $$;
		const {sourceEvent} = event;
		const isUnZoom = event?.transform === d3ZoomIdentity;

		if (
			!config.zoom_enabled ||
			$$.filterTargetsToShow($$.data.targets).length === 0 ||
			(!scale.zoom && sourceEvent?.type.indexOf("touch") > -1 &&
				sourceEvent?.touches.length === 1)
		) {
			return;
		}

		if (event.sourceEvent) {
			state.zooming = true;
			state.domain = undefined;
		}

		const isMousemove = sourceEvent?.type === "mousemove";
		const isZoomOut = sourceEvent?.wheelDelta < 0;
		const {transform} = event;

		if (!isMousemove && isZoomOut && scale.x.domain().every((v, i) => v !== org.xDomain[i])) {
			scale.x.domain(org.xDomain);
		}

		$$.zoom.updateTransformScale(transform, config.zoom_type === "wheel" && sourceEvent);

		// do zoom transiton when:
		// - zoom type 'drag'
		// - when .unzoom() is called (event.transform === d3ZoomIdentity)
		const doTransition = config.transition_duration > 0 &&
			!config.subchart_show && (
				state.dragging || isUnZoom || !event.sourceEvent
			);

		$$.redraw({
			withTransition: doTransition,
			withY: config.zoom_rescale,
			withSubchart: false,
			withEventRect: false,
			withDimension: false
		});

		$$.state.cancelClick = isMousemove;

		// do not call event cb when is .unzoom() is called
		!isUnZoom && callFn(
			config.zoom_onzoom,
			$$.api,
			$$.state.domain ?? $$.zoom.getDomain()
		);
	},

	/**
	 * 'end' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoomEnd(event): void {
		const $$ = this;
		const {config, state} = $$;
		let {startEvent} = $$.zoom;
		let e = event?.sourceEvent;
		const isUnZoom = event?.transform === d3ZoomIdentity;

		if (startEvent?.type.indexOf("touch") > -1) {
			startEvent = startEvent.changedTouches[0];
			e = e?.changedTouches?.[0];
		}

		// if click, do nothing. otherwise, click interaction will be canceled.
		if (
			config.zoom_type === "drag" && (
				e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY
			)
		) {
			return;
		}

		state.zooming = false;
		$$.redrawEventRect();
		$$.updateZoom();

		// do not call event cb when is .unzoom() is called
		!isUnZoom && (e || state.dragging) && callFn(
			config.zoom_onzoomend,
			$$.api,
			$$.state.domain ?? $$.zoom.getDomain()
		);
	},

	/**
	 * Update zoom
	 * @param {boolean} force Force unzoom
	 * @private
	 */
	updateZoom(force: boolean): void {
		const $$ = this;
		const {subX, x, zoom} = $$.scale;

		if (zoom) {
			const zoomDomain = zoom.domain();
			const xDomain = subX.domain();
			const delta = 0.015; // arbitrary value

			const isfullyShown = $$.config.axis_x_inverted ?
				(
					zoomDomain[0] >= xDomain[0] || (zoomDomain[0] + delta) >= xDomain[0]
				) && (
					xDomain[1] >= zoomDomain[1] || xDomain[1] >= (zoomDomain[1] + delta)
				) :
				(
					zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]
				) && (
					xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta)
				);

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			if (force || isfullyShown) {
				$$.axis.x.scale(subX);
				x.domain(subX.orgDomain());
				$$.scale.zoom = null;
			}
		}
	},

	/**
	 * Set zoom transform to event rect
	 * @param {Function} x x Axis scale function
	 * @param {Array} domain Domain value to be set
	 * @private
	 */
	updateCurrentZoomTransform(x, domain: [number, number]): void {
		const $$ = this;
		const {$el: {eventRect}, config} = $$;
		const isRotated = config.axis_rotated;

		// Get transform from given domain value
		// https://github.com/d3/d3-zoom/issues/57#issuecomment-246434951
		const translate = [-x(domain[0]), 0];
		const transform = d3ZoomIdentity
			.scale(x.range()[1] / (
				x(domain[1]) - x(domain[0])
			))
			.translate(
				...(isRotated ? translate.reverse() : translate) as [number, number]
			);

		eventRect.call($$.zoom.transform, transform);
	},

	/**
	 * Attach zoom event on <rect>
	 * @private
	 */
	bindZoomOnEventRect(): void {
		const $$ = this;
		const {config, $el: {eventRect, svg}} = $$;
		const behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;

		// On Safari, event can't be built inside the svg content
		// for workaround, register wheel event on <svg> element first
		// https://bugs.webkit.org/show_bug.cgi?id=226683#c3
		// https://stackoverflow.com/questions/67836886/wheel-event-is-not-fired-on-a-svg-group-element-in-safari
		if (
			window.GestureEvent &&
			/^((?!chrome|android|mobile).)*safari/i.test(window.navigator?.userAgent)
		) {
			svg.on("wheel", () => {});
		}

		eventRect?.call(behaviour)
			.on("dblclick.zoom", null);
	},

	/**
	 * Initialize the drag behaviour used for zooming.
	 * @private
	 */
	initZoomBehaviour(): void {
		const $$ = this;
		const {config, state} = $$;
		const isRotated = config.axis_rotated;
		let start = 0;
		let end = 0;
		let zoomRect;
		let extent;

		const prop = {
			axis: isRotated ? "y" : "x",
			attr: isRotated ? "height" : "width",
			index: isRotated ? 1 : 0
		};

		$$.zoomBehaviour = d3Drag()
			.clickDistance(4)
			.on("start", function(event) {
				// get extent at first zooming, when is zoomed do not consider
				extent = $$.scale.zoom ? null : $$.axis.getExtent();

				state.event = event;
				$$.setDragStatus(true);
				$$.unselectRect();

				if (!zoomRect) {
					zoomRect = $$.$el.main.append("rect")
						.attr("clip-path", state.clip.path)
						.attr("class", $ZOOM.zoomBrush)
						.attr("width", isRotated ? state.width : 0)
						.attr("height", isRotated ? 0 : state.height);
				}

				start = getPointer(event, this as SVGAElement)[prop.index];

				if (extent) {
					if (start < extent[0]) {
						start = extent[0];
					} else if (start > extent[1]) {
						start = extent[1];
					}
				}

				end = start;

				zoomRect
					.attr(prop.axis, start)
					.attr(prop.attr, 0);

				$$.onZoomStart(event);
			})
			.on("drag", function(event) {
				end = getPointer(event, this as SVGAElement)[prop.index];

				if (extent) {
					if (end > extent[1]) {
						end = extent[1];
					} else if (end < extent[0]) {
						end = extent[0];
					}
				}

				zoomRect
					.attr(prop.axis, Math.min(start, end))
					.attr(prop.attr, Math.abs(end - start));
			})
			.on("end", event => {
				const scale = $$.scale.zoom || $$.scale.x;

				state.event = event;

				zoomRect
					.attr(prop.axis, 0)
					.attr(prop.attr, 0);

				if (start > end) {
					[start, end] = [end, start];
				}

				if (start < 0) {
					end += Math.abs(start);
					start = 0;
				}

				if (start !== end) {
					$$.api.zoom([start, end].map(v => scale.invert(v)));
				}

				$$.setDragStatus(false);
			});
	},

	setZoomResetButton(): void {
		const $$ = this;
		const {config, $el} = $$;
		const resetButton = config.zoom_resetButton;

		if (resetButton && config.zoom_type === "drag") {
			if (!$el.zoomResetBtn) {
				$el.zoomResetBtn = $$.$el.chart.append("div")
					.classed($COMMON.button, true)
					.append("span")
					.on("click", function() {
						isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
						$$.api.unzoom();
					})
					.classed($ZOOM.buttonZoomReset, true)
					.text(resetButton.text || "Reset Zoom");
			} else {
				$el.zoomResetBtn.style("display", null);
			}
		}
	},

	getZoomTransform() {
		const $$ = this;
		const {$el: {eventRect}} = $$;

		return eventRect?.node() ? d3ZoomTransform(eventRect.node()) : {k: 1};
	}
};
