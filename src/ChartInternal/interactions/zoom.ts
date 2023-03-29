/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {drag as d3Drag} from "d3-drag";
import {zoomIdentity as d3ZoomIdentity, zoom as d3Zoom, ZoomTransform as d3ZoomTransform} from "d3-zoom";
import {$COMMON, $ZOOM} from "../../config/classes";
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
		zoom.updateTransformScale = (transform: d3ZoomTransform, correctTransform: boolean): void => {
			const isRotated = config.axis_rotated;

			// in case of resize, update range of orgXScale
			org.xScale?.range(scale.x.range());

			// rescale from the original scale
			const newScale = transform[
				isRotated ? "rescaleY" : "rescaleX"
			](org.xScale || scale.x);

			const domain = $$.trimXDomain(newScale.domain());
			const rescale = config.zoom_rescale;

			newScale.domain(domain, org.xDomain);

			// prevent chart from panning off the edge and feeling "stuck"
			// https://github.com/naver/billboard.js/issues/2588
			if (correctTransform) {
				const t = newScale(scale.x.domain()[0]);
				const tX = isRotated ? transform.x : t;
				const tY = isRotated ? t : transform.y;

				$$.$el.eventRect.property("__zoom", d3ZoomIdentity.translate(tX, tY).scale(transform.k));
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
			}
		};

		/**
		 * Get zoom domain
		 * @returns {Array} zoom domain
		 * @private
		 */
		// @ts-ignore
		zoom.getDomain = (): number|Date[] => {
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
			(!scale.zoom && sourceEvent?.type.indexOf("touch") > -1 && sourceEvent?.touches.length === 1)
		) {
			return;
		}

		if (event.sourceEvent) {
			state.zooming = true;
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
		!isUnZoom && callFn(config.zoom_onzoom, $$.api, $$.zoom.getDomain());
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
		if (config.zoom_type === "drag" && (
			e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY
		)) {
			return;
		}

		$$.redrawEventRect();
		$$.updateZoom();

		state.zooming = false;

		// do not call event cb when is .unzoom() is called
		!isUnZoom && (e || state.dragging) && callFn(config.zoom_onzoomend, $$.api, $$.zoom.getDomain());
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

			const isfullyShown = $$.config.axis_x_inverted ? (
				zoomDomain[0] >= xDomain[0] || (zoomDomain[0] + delta) >= xDomain[0]
			) && (
				xDomain[1] >= zoomDomain[1] || xDomain[1] >= (zoomDomain[1] + delta)
			) : (
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
	 * Attach zoom event on <rect>
	 * @private
	 */
	bindZoomOnEventRect(): void {
		const $$ = this;
		const {config, $el: {eventRect}} = $$;
		const behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;

		// Since Chrome 89, wheel zoom not works properly
		// Applying the workaround: https://github.com/d3/d3-zoom/issues/231#issuecomment-802305692
		$$.$el.svg.on("wheel", () => {});

		eventRect
			.call(behaviour)
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

		const prop = {
			axis: isRotated ? "y" : "x",
			attr: isRotated ? "height" : "width",
			index: isRotated ? 1 : 0
		};

		$$.zoomBehaviour = d3Drag()
			.clickDistance(4)
			.on("start", function(event) {
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

				start = getPointer(event, this)[prop.index];
				end = start;

				zoomRect
					.attr(prop.axis, start)
					.attr(prop.attr, 0);

				$$.onZoomStart(event);
			})
			.on("drag", function(event) {
				end = getPointer(event, this)[prop.index];

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
	}
};
