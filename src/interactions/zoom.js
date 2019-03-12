/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	mouse as d3Mouse,
	event as d3Event,
	select as d3Select
} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import {zoom as d3Zoom} from "d3-zoom";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, callFn, diffDomain, getMinMax, isDefined} from "../internals/util";

extend(ChartInternal.prototype, {
	/**
	 * Initialize zoom.
	 * @private
	 */
	initZoom() {
		const $$ = this;

		$$.zoomScale = null;

		$$.generateZoom();
		$$.initZoomBehaviour();
	},

	/**
	 * Bind zoom event
	 * @param {Boolean} bind Weather bind or unbound
	 * @private
	 */
	bindZoomEvent(bind = true) {
		const $$ = this;
		const zoomEnabled = $$.config.zoom_enabled;

		$$.redrawEventRect();

		const eventRects = $$.main.select(`.${CLASS.eventRects}`);

		if (zoomEnabled && bind) {
			$$.bindZoomOnEventRect(eventRects, zoomEnabled.type);
		} else if (bind === false) {
			$$.api.unzoom();

			eventRects
				.on(".zoom", null)
				.on(".drag", null);
		}
	},

	/**
	 * Generate zoom
	 * @private
	 */
	generateZoom() {
		const $$ = this;
		const config = $$.config;

		const zoom = d3Zoom().duration(0)
			.on("start", $$.onZoomStart.bind($$))
			.on("zoom", $$.onZoom.bind($$))
			.on("end", $$.onZoomEnd.bind($$));

		// get zoom extent
		zoom.orgScaleExtent = () => {
			const extent = config.zoom_extent || [1, 10];

			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		};

		zoom.updateScaleExtent = function() {
			const ratio = diffDomain($$.x.orgDomain()) / diffDomain($$.getZoomDomain());
			const extent = this.orgScaleExtent();

			this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);

			return this;
		};

		/**
		 * Update scale according zoom transform value
		 * @param {Object} transform
		 * @private
		 */
		zoom.updateTransformScale = transform => {
			// rescale from the original scale
			const newScale = transform.rescaleX($$.x);
			const domain = $$.trimXDomain(newScale.domain());
			const rescale = config.zoom_rescale;

			newScale.domain(domain, $$.orgXDomain);

			$$.zoomScale = $$.getCustomizedScale(newScale);
			$$.xAxis.scale($$.zoomScale);

			rescale && $$.x.domain($$.zoomScale.orgDomain());
		};

		$$.zoom = zoom;
	},

	/**
	 * 'start' event listener
	 * @private
	 */
	onZoomStart() {
		const $$ = this;
		const event = d3Event.sourceEvent;

		if (!event) {
			return;
		}

		$$.zoom.altDomain = event.altKey ?
			$$.x.orgDomain() : null;

		$$.zoom.startEvent = event;
		callFn($$.config.zoom_onzoomstart, $$.api, event);
	},

	/**
	 * 'zoom' event listener
	 * @private
	 */
	onZoom() {
		const $$ = this;
		const config = $$.config;
		const event = d3Event;

		if (!config.zoom_enabled || !event.sourceEvent) {
			return;
		}

		const isMousemove = event.sourceEvent.type === "mousemove";
		const transform = event.transform;

		$$.zoom.updateTransformScale(transform);

		if ($$.filterTargetsToShow($$.data.targets).length === 0) {
			return;
		}

		if (isMousemove && $$.zoom.altDomain) {
			$$.x.domain($$.zoom.altDomain);
			transform.scale($$.zoomScale).updateScaleExtent();
			return;
		}

		if ($$.isCategorized() && $$.x.orgDomain()[0] === $$.orgXDomain[0]) {
			$$.x.domain([$$.orgXDomain[0] - 1e-10, $$.x.orgDomain()[1]]);
		}

		$$.redraw({
			withTransition: false,
			withY: config.zoom_rescale,
			withSubchart: false,
			withEventRect: false,
			withDimension: false
		});

		$$.cancelClick = isMousemove;
		callFn(config.zoom_onzoom, $$.api, $$.zoomScale.domain());
	},

	/**
	 * 'end' event listener
	 * @private
	 */
	onZoomEnd() {
		const $$ = this;
		const startEvent = $$.zoom.startEvent;

		// if click, do nothing. otherwise, click interaction will be canceled.
		if (!startEvent ||
			(event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY)
		) {
			return;
		}

		$$.redrawEventRect();
		$$.updateZoom();

		callFn($$.config.zoom_onzoomend, $$.api, $$[$$.zoomScale ? "zoomScale" : "subX"].domain());
	},

	/**
	 * Get zoom domain
	 * @returns {Array} zoom domain
 	 * @private
	 */
	getZoomDomain() {
		const $$ = this;
		const config = $$.config;
		let [min, max] = $$.orgXDomain;

		if (isDefined(config.zoom_x_min)) {
			min = getMinMax("min", [min, config.zoom_x_min]);
		}

		if (isDefined(config.zoom_x_max)) {
			max = getMinMax("max", [max, config.zoom_x_max]);
		}

		return [min, max];
	},

	/**
	 * Update zoom
	 * @param {Boolean} force Force unzoom
	 * @private
	 */
	updateZoom(force) {
		const $$ = this;

		if ($$.zoomScale) {
			const zoomDomain = $$.zoomScale.domain();
			const xDomain = $$.subX.domain();
			const delta = 0.015; // arbitrary value

			const isfullyShown = (zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) &&
				(xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta));

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			if (force || isfullyShown) {
				$$.xAxis.scale($$.subX);
				$$.x.domain($$.subX.orgDomain());
				$$.zoomScale = null;
			}
		}
	},

	/**
	 * Attach zoom event on <rect>
	 * @private
	 */
	bindZoomOnEventRect(eventRects, type) {
		const $$ = this;
		const behaviour = type === "drag" ? $$.zoomBehaviour : $$.zoom;

		eventRects
			.call(behaviour)
			.on("dblclick.zoom", null);
	},

	/**
	 * Initialize the drag behaviour used for zooming.
	 * @private
	 */
	initZoomBehaviour() {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		let start = 0;
		let end = 0;
		let zoomRect = null;

		$$.zoomBehaviour = d3Drag()
			.clickDistance(4)
			.on("start", function() {
				$$.setDragStatus(true);

				if (!zoomRect) {
					zoomRect = $$.main.append("rect")
						.attr("clip-path", $$.clipPath)
						.attr("class", CLASS.zoomBrush)
						.attr("width", isRotated ? $$.width : 0)
						.attr("height", isRotated ? 0 : $$.height);
				}

				start = d3Mouse(this)[0];
				end = start;

				zoomRect
					.attr("x", start)
					.attr("width", 0);

				$$.onZoomStart();
			})
			.on("drag", function() {
				end = d3Mouse(this)[0];

				zoomRect
					.attr("x", Math.min(start, end))
					.attr("width", Math.abs(end - start));
			})
			.on("end", function(d) {
				const scale = $$.zoomScale || $$.x;

				$$.setDragStatus(false);

				zoomRect
					.attr("x", 0)
					.attr("width", 0);

				if (start > end) {
					[start, end] = [end, start];
				}

				if (start < 0) {
					end += Math.abs(start);
					start = 0;
				}

				if (start !== end) {
					$$.api.zoom([start, end].map(v => scale.invert(v)));
					$$.onZoomEnd();
				} else {
					if ($$.isMultipleX()) {
						$$.clickHandlerForMultipleXS.bind(this)($$);
					} else {
						const event = d3Event.sourceEvent || d3Event;
						const [x, y] = "clientX" in event ? [event.clientX, event.clientY] : [event.x, event.y];
						const target = document.elementFromPoint(x, y);

						$$.clickHandlerForSingleX.bind(target)(d3Select(target).datum(), $$);
					}
				}
			});
	},

	setZoomResetButton() {
		const $$ = this;
		const config = $$.config;
		const resetButton = config.zoom_resetButton;

		if (resetButton && config.zoom_enabled.type === "drag") {
			if (!$$.zoom.resetBtn) {
				$$.zoom.resetBtn = $$.selectChart.append("div")
					.classed(CLASS.button, true)
					.append("span")
					.on("click", $$.api.unzoom.bind($$))
					.classed(CLASS.buttonZoomReset, true)
					.text(resetButton.text || "Reset Zoom");
			} else {
				$$.zoom.resetBtn.style("display", null);
			}
		}
	}
});
