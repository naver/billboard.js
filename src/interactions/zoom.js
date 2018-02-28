/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max
} from "d3-array";
import {event as d3Event} from "d3-selection";
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
		const config = $$.config;
		let startEvent;

		$$.zoomScale = null;
		$$.zoom = d3Zoom()
			.duration(0)
			.on("start", () => {
				startEvent = d3Event.sourceEvent;

				$$.zoom.altDomain = d3Event.sourceEvent.altKey ?
					$$.x.orgDomain() : null;

				config.zoom_onzoomstart.call($$.api, d3Event.sourceEvent);
			})
			.on("zoom", () => {
				$$.redrawForZoom.call($$);
			})
			.on("end", () => {
				const event = d3Event.sourceEvent;

				// if click, do nothing. otherwise, click interaction will be canceled.
				if (event && startEvent.clientX === event.clientX && startEvent.clientY === event.clientY) {
					return;
				}

				$$.redrawEventRect();
				$$.updateZoom();

				isFunction(config.zoom_onzoomend) && config.zoom_onzoomend.call($$.api, $$.x.orgDomain());
			});

		$$.zoom.orgScaleExtent = () => {
			const extent = config.zoom_extent ? config.zoom_extent : [1, 10];

			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		};

		$$.zoom.updateScaleExtent = function() {
			const ratio = diffDomain($$.x.orgDomain()) / diffDomain($$.getZoomDomain());
			const extent = this.orgScaleExtent();

			this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);

			return this;
		};

		$$.zoom.updateTransformScale = function(transform) {
			const newScale = transform.rescaleX($$.x);

			newScale.domain($$.trimXDomain(newScale.domain()));
			$$.zoomScale = newScale;
			$$.xAxis.scale($$.zoomScale);
			$$.main.select(`.${CLASS.eventRects}`).node().__zoom = transform;
		};
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
		const z = $$.config.zoom_enabled ? $$.zoom : () => {};

		// bind zoom module
		// $$.main.select(`.${CLASS.zoomRect}`)
		// 	.call(z)
		// 	.on("dblclick.zoom", null);

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

		$$.main.select(`.${CLASS.eventRects}`)
			.call(z)
			.on("dblclick.zoom", null);
	},

	/**
	 * Redraw the zoom.
	 * @private
	 */
	redrawForZoom() {
		const $$ = this;
		const config = $$.config;

		if (!config.zoom_enabled) {
			return;
		}

		const zoom = $$.zoom;
		const x = $$.x;
		const event = d3Event;
		const transform = event.transform;

		$$.zoom.updateTransformScale(transform);

		if ($$.filterTargetsToShow($$.data.targets).length === 0) {
			return;
		}

		if (event.sourceEvent.type === "mousemove" && zoom.altDomain) {
			x.domain(zoom.altDomain);
			transform.scale($$.zoomScale).updateScaleExtent();
			return;
		}

		if ($$.isCategorized() && x.orgDomain()[0] === $$.orgXDomain[0]) {
			x.domain([$$.orgXDomain[0] - 1e-10, x.orgDomain()[1]]);
		}

		$$.redraw({
			withTransition: false,
			withY: config.zoom_rescale,
			withSubchart: false,
			withEventRect: false,
			withDimension: false
		});

		if (event.sourceEvent.type === "mousemove") {
			$$.cancelClick = true;
		}

		isFunction(config.zoom_onzoom) && config.zoom_onzoom.call($$.api, x.orgDomain());
	},
});
