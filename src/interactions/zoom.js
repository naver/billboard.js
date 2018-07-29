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
	event as d3Event
} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import {zoom as d3Zoom} from "d3-zoom";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, diffDomain, isFunction} from "../internals/util";

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
	 * Generate zoom
	 * @private
	 */
	generateZoom() {
		const $$ = this;
		const config = $$.config;

		const zoom = d3Zoom().duration(0)
			.on("start", $$.onStart.bind($$))
			.on("zoom", $$.onZoom.bind($$))
			.on("end", $$.onEnd.bind($$));

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
			const newScale = transform.rescaleX($$.x.orgScale());

			newScale.domain($$.trimXDomain(newScale.domain()));

			$$.zoomScale = $$.getCustomizedScale(newScale);
			$$.xAxis.scale($$.zoomScale);
		};

		$$.zoom = zoom;
	},

	/**
	 * 'start' event listener
	 * @private
	 */
	onStart() {
		const $$ = this;
		const event = d3Event.sourceEvent;
		const onzoomstart = $$.config.zoom_onzoomstart;

		$$.zoom.altDomain = event.altKey ?
			$$.x.orgDomain() : null;

		$$.zoom.startEvent = event;
		isFunction(onzoomstart) && onzoomstart.call($$.api, event);
	},

	/**
	 * 'zoom' event listener
	 * @private
	 */
	onZoom() {
		const $$ = this;
		const config = $$.config;
		const event = d3Event;

		if (config.zoom_enabled !== true && !config.zoom_enabled_type) {
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
		isFunction(config.zoom_onzoom) && config.zoom_onzoom.call($$.api, $$.x.orgDomain());
	},

	/**
	 * 'end' event listener
	 * @private
	 */
	onEnd() {
		const $$ = this;
		const event = d3Event.sourceEvent;
		const onzoomend = $$.config.zoom_onzoomend;
		const startEvent = $$.zoom.startEvent;

		// if click, do nothing. otherwise, click interaction will be canceled.
		if (event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY) {
			return;
		}

		$$.redrawEventRect();
		$$.updateZoom();

		isFunction(onzoomend) && onzoomend.call($$.api, $$.x.orgDomain());
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
			const xDomain = $$.x.domain();
			const delta = 0.015; // arbitrary value

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			if (
				(zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) &&
				(xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta))
			) {
				$$.xAxis.scale($$.x);
				$$.zoomScale = null;
			}
		}
	},

	/**
	 * Attach zoom event on <rect>
	 * @private
	 */
	bindZoomOnEventRect() {
		const $$ = this;

		$$.main.select(`.${CLASS.eventRects}`)
			.call($$.zoom)
			.on("dblclick.zoom", null);
	},

	/**
	 * Initialize the drag behaviour used for zooming.
	 * @private
	 */
	initZoomBehaviour() {
		const $$ = this;
		let start = 0;
		let end = 0;
		let zoomRect = null;

		$$.zoomBehaviour = d3Drag()
			.on("start", function() {
				if (!zoomRect) {
					zoomRect = $$.main.append("rect")
						.attr("clip-path", $$.clipPath)
						.attr("class", CLASS.zoomBrush)
						.attr("x", 0)
						.attr("y", 0)
						.attr("width", $$.config.axis_rotated ? $$.width : 0)
						.attr("height", $$.config.axis_rotated ? 0 : $$.height);
				}

				start = d3Mouse(this)[0];
				end = start;
				zoomRect
					.attr("x", start)
					.attr("width", 0);
			})
			.on("drag", function() {
				end = d3Mouse(this)[0];

				zoomRect
					.attr("x", Math.min(start, end))
					.attr("width", Math.abs(end - start));
			})
			.on("end", () => {
				zoomRect
					.attr("x", 0)
					.attr("width", 0);

				if (start > end) {
					[start, end] = [end, start];
				}

				$$.x.domain([$$.x.invert(start), $$.x.invert(end)]);

				$$.redraw();

				isFunction($$.config.zoom_onzoom) && $$.config.zoom_onzoom.call($$.api, $$.x.orgDomain());
			});
	},

	/**
	 * Enable zooming by dragging using the zoombehaviour.
	 * @private
	 */
	bindZoomOnDrag() {
		const $$ = this;

		$$.main.select(`.${CLASS.chart}`).call($$.zoomBehaviour);
	}
});
