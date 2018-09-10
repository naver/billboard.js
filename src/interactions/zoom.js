/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max
} from "d3-array";
import {
	mouse as d3Mouse,
	event as d3Event,
	select as d3Select
} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import {zoom as d3Zoom} from "d3-zoom";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, callFn, diffDomain} from "../internals/util";

extend(ChartInternal.prototype, {
	/**
	 * Initialize zoom.
	 * @private
	 */
	initZoom() {
		const $$ = this;

		$$.zoomScale = null;
		$$.generateZoom();
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

		if (zoomEnabled && bind) {
			$$.bindZoomOnEventRect(zoomEnabled.type);
		} else if (bind === false) {
			$$.api.unzoom();

			$$.main.select(`.${CLASS.eventRects}`)
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
			const newScale = transform.rescaleX($$.subX.orgScale());
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

		if (!config.zoom_enabled) {
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
		callFn(config.zoom_onzoom, $$.api, $$.subX.domain());
	},

	/**
	 * 'end' event listener
	 * @private
	 */
	onZoomEnd() {
		const $$ = this;
		const startEvent = $$.zoom.startEvent;

		// if click, do nothing. otherwise, click interaction will be canceled.
		if (event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY) {
			return;
		}

		$$.redrawEventRect();
		$$.updateZoom();

		callFn($$.config.zoom_onzoomend, $$.api, $$.subX.domain());
	},

	/**
	 * Get zoom domain
	 * @private
	 * @returns {Array} zoom domain
	 */
	getZoomDomain() {
		const $$ = this;
		const config = $$.config;
		const min = d3Min([$$.orgXDomain[0], config.zoom_x_min]);
		const max = d3Max([$$.orgXDomain[1], config.zoom_x_max]);

		return [min, max];
	},

	/**
	 * Update zoom
	 * @private
	 */
	updateZoom() {
		const $$ = this;

		if ($$.zoomScale) {
			const zoomDomain = $$.zoomScale.domain();
			const xDomain = $$.subX.domain();
			const delta = 0.015; // arbitrary value

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			if (
				(zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) &&
				(xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta))
			) {
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
	bindZoomOnEventRect(type) {
		const $$ = this;
		const behaviour = type === "drag" ? $$.zoomBehaviour : $$.zoom;

		$$.main.select(`.${CLASS.eventRects}`)
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
