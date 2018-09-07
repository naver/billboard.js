/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max
} from "d3-array";
import {zoomIdentity as d3ZoomIdentity} from "d3-zoom";
import Chart from "../internals/Chart";
import {callFn, isDefined, isObject, isString, extend} from "../internals/util";

/**
 * Zoom by giving x domain.
 * @method zoom
 * @instance
 * @memberOf Chart
 * @param {Array} domainValue If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @return {Array} domain value in array
 * @example
 *  // Zoom to specified domain
 *  chart.zoom([10, 20]);
 *
 *  // Get the current zoomed domain
 *  chart.zoom();
 */
const zoom = function(domainValue) {
	const $$ = this.internal;
	let domain = domainValue;
	let resultDomain;

	if ($$.config.zoom_enabled && domain) {
		const isTimeSeries = $$.isTimeSeries();

		if (isTimeSeries) {
			domain = domain.map(x => $$.parseDate(x));
		}

		if ($$.config.subchart_show) {
			const xScale = $$.zoomScale || $$.x;

			$$.brush.getSelection().call($$.brush.move, [xScale(domain[0]), xScale(domain[1])]);
			resultDomain = domain;
		} else {
			$$.x.domain(domain);
			$$.zoomScale = $$.x;
			$$.xAxis.scale($$.zoomScale);

			resultDomain = $$.zoomScale.orgDomain();
		}

		$$.redraw({
			withTransition: true,
			withY: $$.config.zoom_rescale,
			withDimension: false
		});

		$$.setZoomResetButton();
		callFn($$.config.zoom_onzoom, this, $$.x.orgDomain());
	} else {
		resultDomain = $$.zoomScale ?
			$$.zoomScale.domain() : $$.x.orgDomain();
	}

	return resultDomain;
};

extend(zoom, {
	/**
	 * Enable and disable zooming.
	 * @method zoom․enable
	 * @instance
	 * @memberOf Chart
	 * @param {String|Boolean} enabled Possible string values are "wheel" or "drag". If enabled is true, "wheel" will be used. If false is given, zooming will be disabled.<br>When set to false, the current zooming status will be reset.
	 * @example
	 *  // Enable zooming using the mouse wheel
	 *  chart.zoom.enable(true);
	 *  // Or
	 *  chart.zoom.enable("wheel");
	 *
	 *  // Enable zooming by dragging
	 *  chart.zoom.enable("drag");
	 *
	 *  // Disable zooming
	 *  chart.zoom.enable(false);
	 */
	enable: function(enabled = "wheel") {
		const $$ = this.internal;
		const config = $$.config;
		let enableType = enabled;

		if (enabled) {
			enableType = isString(enabled) && /^(drag|wheel)$/.test(enabled) ?
				{type: enabled} : enabled;
		}

		config.zoom_enabled = enableType;

		if (!$$.zoom) {
			$$.initZoom();
			$$.initZoomBehaviour();
			$$.bindZoomEvent();
		} else if (enabled === false) {
			$$.bindZoomEvent(false);
		}

		$$.updateAndRedraw();
	},

	/**
	 * Set or get x Axis maximum zoom range value
	 * @method zoom․max
	 * @instance
	 * @memberOf Chart
	 * @param {Number} [max] maximum value to set for zoom
	 * @return {Number} zoom max value
	 * @example
	 *  // Set maximum range value
	 *  chart.zoom.max(20);
	 */
	max: function(max) {
		const $$ = this.internal;
		const config = $$.config;

		if (max === 0 || max) {
			config.zoom_x_max = d3Max([$$.orgXDomain[1], max]);
		}

		return config.zoom_x_max;
	},

	/**
	 * Set or get x Axis minimum zoom range value
	 * @method zoom․min
	 * @instance
	 * @memberOf Chart
	 * @param {Number} [min] minimum value tp set for zoom
	 * @return {Number} zoom min value
	 * @example
	 *  // Set minimum range value
	 *  chart.zoom.min(-1);
	 */
	min: function(min) {
		const $$ = this.internal;
		const config = $$.config;

		if (min === 0 || min) {
			config.zoom_x_min = d3Min([$$.orgXDomain[0], min]);
		}

		return config.zoom_x_min;
	},

	/**
	 * Set zoom range
	 * @method zoom․range
	 * @instance
	 * @memberOf Chart
	 * @param {Object} [range]
	 * @return {Object} zoom range value
	 * {
	 *   min: 0,
	 *   max: 100
	 * }
	 * @example
	 *  chart.zoom.range({
	 *      min: 10,
	 *      max: 100
	 *  });
	 */
	range: function(range) {
		const zoom = this.zoom;

		if (isObject(range)) {
			isDefined(range.min) && zoom.min(range.min);
			isDefined(range.max) && zoom.max(range.max);
		}

		return {
			min: zoom.min(),
			max: zoom.max()
		};
	}
});

extend(Chart.prototype, {
	zoom,

	/**
	 * Unzoom zoomed area
	 * @method unzoom
	 * @instance
	 * @memberOf Chart
	 * @example
	 *  chart.unzoom();
	 */
	unzoom() {
		const $$ = this.internal;
		const config = $$.config;

		if ($$.zoomScale) {
			config.subchart_show ?
				$$.brush.getSelection().call($$.brush.move, null) :
				$$.zoom.updateTransformScale(d3ZoomIdentity);

			$$.updateZoom();
			$$.zoom.resetBtn && $$.zoom.resetBtn.style("display", "none");

			$$.redraw({
				withTransition: true,
				withY: config.zoom_rescale
			});
		}
	}
});
