/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	min as d3Min,
	max as d3Max,
	zoomIdentity as d3ZoomIdentity,
} from "d3";
import Chart from "../internals/Chart";
import {isDefined, extend} from "../internals/util";

/**
 * Zoom by giving x domain.
 * @method zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
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

	if (domain) {
		if ($$.isTimeSeries()) {
			domain = domain.map(x => $$.parseDate(x));
		}

		if ($$.config.subchart_show) {
			const xScale = $$.zoomScale || $$.x;

			$$.brush.getSelection().call($$.brush.move, [xScale(domain[0]), xScale(domain[1])]);
			resultDomain = domain;
		} else {
			const orgDomain = $$.x.orgDomain();
			const k = (orgDomain[1] - orgDomain[0]) / (domain[1] - domain[0]);
			const tx = $$.isTimeSeries() ?
				(0 - k * $$.x(domain[0].getTime())) : domain[0] - k * $$.x(domain[0]);

			$$.zoom.updateTransformScale(d3ZoomIdentity
				.translate(tx, 0)
				.scale(k));
			resultDomain = $$.zoomScale.domain();
		}

		$$.redraw({
			withTransition: true,
			withY: $$.config.zoom_rescale,
			withDimension: false
		});

		$$.config.zoom_onzoom.call(this, $$.x.orgDomain());
	} else {
		resultDomain = ($$.zoomScale || $$.x).domain();
	}
	return resultDomain;
};

/**
 * Enable and disable zooming.
 * @method zoom:enable
 * @instance
 * @memberof Chart
 * @param {Boolean} enabled If enabled is true, the feature of zooming will be enabled. If false is given, it will be disabled.
 * @example
 *  // Enable zooming
 *  chart.zoom.enable(true);
 */
zoom.enable = function(enabled) {
	const $$ = this.internal;

	$$.config.zoom_enabled = enabled;
	$$.updateAndRedraw();
};

/**
 * Set zoom max
 * @method zoom:max
 * @instance
 * @memberof Chart
 * @param {Number} max
 */
zoom.max = function(max) {
	const $$ = this.internal;
	const config = $$.config;

	if (max === 0 || max) {
		config.zoom_x_max = d3Max([$$.orgXDomain[1], max]);
	} else {
		return config.zoom_x_max;
	}

	return undefined;
};

/**
 * Set zoom min
 * @method zoom:min
 * @instance
 * @memberof Chart
 * @param {Number} min
 */
zoom.min = function(min) {
	const $$ = this.internal;
	const config = $$.config;

	if (min === 0 || min) {
		config.zoom_x_min = d3Min([$$.orgXDomain[0], min]);
	} else {
		return config.zoom_x_min;
	}

	return undefined;
};

/**
 * Set zoom range
 * @method zoom:range
 * @instance
 * @memberof Chart
 * @param {Object} range
 * @return {Object} range
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
zoom.range = function(range) {
	if (arguments.length) {
		isDefined(range.max) && this.domain.max(range.max);
		isDefined(range.min) && this.domain.min(range.min);
	} else {
		return {
			max: this.domain.max(),
			min: this.domain.min()
		};
	}

	return undefined;
};

extend(Chart.prototype, {
	zoom,
	/**
	 * Unzoom zoomed area
	 * @method unzoom
	 * @instance
	 * @memberof Chart
	 * @example
	 *  chart.unzoom();
	 */
	unzoom() {
		const $$ = this.internal;

		if ($$.config.subchart_show) {
			$$.brush.getSelection().call($$.brush.move, null);
		} else {
			$$.zoom.updateTransformScale(d3ZoomIdentity);
		}

		$$.redraw({
			withTransition: true,
			withY: $$.config.zoom_rescale
		});
	}
});
