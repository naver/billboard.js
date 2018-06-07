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
	}
});
