/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {zoomIdentity as d3ZoomIdentity, zoomTransform as d3ZoomTransform} from "d3-zoom";
import type {TDomainRange} from "../../ChartInternal/data/IData";
import {extend, getMinMax, isDefined, isObject, parseDate} from "../../module/util";

/**
 * Zoom by giving x domain range.
 * - **ℹ️ NOTE:**
 *  - For `wheel` type zoom, the minimum zoom range will be set as the given domain range. To get the initial state, [.unzoom()](#unzoom) should be called.
 *  - To be used [zoom.enabled](Options.html#.zoom) option should be set as `truthy`.
 *  - When x axis type is `category`, domain range should be specified as index numbers.
 *  - Due to the limitations of floating point precision, domain value may not be exact returning approximately values.
 * @function zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain range is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Zoom to specified domain range
 *  chart.zoom([10, 20]);
 *
 *  // For timeseries x axis, the domain value can be string, but the format should match with the 'data.xFormat' option.
 *  chart.zoom(["2021-02-03", "2021-02-08"]);
 *
 *  // For category x axis, the domain value should be index number.
 *  chart.zoom([0, 3]);
 *
 *  // Get the current zoomed domain range
 *  // Domain value may not be exact returning approximately values.
 *  chart.zoom();
 */
// NOTE: declared funciton assigning to variable to prevent duplicated method generation in JSDoc.
const zoom = function<T = TDomainRange>(domainValue?: T): T | undefined {
	const $$ = this.internal;
	const {axis, config, org, scale, state} = $$;
	const isCategorized = axis.isCategorized();
	let domain;

	if (config.zoom_enabled) {
		domain = domainValue;

		if (Array.isArray(domain)) {
			if (axis.isTimeSeries()) {
				domain = domain.map(x => parseDate.bind($$)(x));
			}

			const isWithinRange = $$.withinRange(
				domain,
				$$.getZoomDomain("zoom", true),
				$$.getZoomDomain("zoom")
			);

			if (isWithinRange) {
				state.domain = domain;

				domain = $$.getZoomDomainValue(domain);

				// hide any possible tooltip show before the zoom
				$$.api.tooltip.hide();

				if (config.subchart_show) {
					const x = scale.zoom || scale.x;

					$$.brush.getSelection().call($$.brush.move, domain.map(x));
					// resultDomain = domain;
				} else {
					// in case of 'config.zoom_rescale=true', use org.xScale
					const x = isCategorized ? scale.x.orgScale() : (org.xScale || scale.x);

					$$.updateCurrentZoomTransform(x, domain);
				}

				$$.setZoomResetButton();
			}
		} else {
			domain = $$.zoom.getDomain();
		}
	}

	return state.domain ?? domain;
};

extend(zoom, {
	/**
	 * Enable and disable zooming.
	 * @function zoom․enable
	 * @instance
	 * @memberof Chart
	 * @param {string|boolean} enabled Possible string values are "wheel" or "drag". If enabled is true, "wheel" will be used. If false is given, zooming will be disabled.<br>When set to false, the current zooming status will be reset.
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
	enable(enabled: boolean | "wheel" | "drag" | any): void {
		const $$ = this.internal;
		const {config} = $$;

		if (/^(drag|wheel)$/.test(enabled)) {
			config.zoom_type = enabled;
		}

		config.zoom_enabled = !!enabled;

		if (!$$.zoom) {
			$$.initZoom();
			$$.bindZoomEvent();
		} else if (enabled === false) {
			$$.bindZoomEvent(false);
		}

		$$.updateAndRedraw();
	},

	/**
	 * Set or get x Axis maximum zoom range value
	 * @function zoom․max
	 * @instance
	 * @memberof Chart
	 * @param {number} [max] maximum value to set for zoom
	 * @returns {number} zoom max value
	 * @example
	 *  // Set maximum range value
	 *  chart.zoom.max(20);
	 */
	max(max?: number): number {
		const $$ = this.internal;
		const {config, org: {xDomain}} = $$;

		if (max === 0 || max) {
			config.zoom_x_max = getMinMax("max", [xDomain[1], max]);
		}

		return config.zoom_x_max;
	},

	/**
	 * Set or get x Axis minimum zoom range value
	 * @function zoom․min
	 * @instance
	 * @memberof Chart
	 * @param {number} [min] minimum value to set for zoom
	 * @returns {number} zoom min value
	 * @example
	 *  // Set minimum range value
	 *  chart.zoom.min(-1);
	 */
	min(min?: number): number {
		const $$ = this.internal;
		const {config, org: {xDomain}} = $$;

		if (min === 0 || min) {
			config.zoom_x_min = getMinMax("min", [xDomain[0], min]);
		}

		return config.zoom_x_min;
	},

	/**
	 * Set zoom range
	 * @function zoom․range
	 * @instance
	 * @memberof Chart
	 * @param {object} [range] zoom range
	 * @returns {object} zoom range value
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
	range(range): {min: (number | undefined)[], max: (number | undefined)[]} {
		const zoom = this.zoom;

		if (isObject(range)) {
			const {min, max} = range;

			isDefined(min) && zoom.min(min);
			isDefined(max) && zoom.max(max);
		}

		return {
			min: zoom.min(),
			max: zoom.max()
		};
	}
});

export default {
	zoom,

	/**
	 * Unzoom zoomed area
	 * - **NOTE:** Calling .unzoom() will not trigger zoom events.
	 * @function unzoom
	 * @instance
	 * @memberof Chart
	 * @example
	 *  chart.unzoom();
	 */
	unzoom(): void {
		const $$ = this.internal;
		const {config, $el: {eventRect, zoomResetBtn}, scale: {zoom}, state} = $$;

		if (zoom) {
			config.subchart_show ?
				$$.brush.getSelection().call($$.brush.move, null) :
				$$.zoom.updateTransformScale(d3ZoomIdentity);

			$$.updateZoom(true);
			zoomResetBtn?.style("display", "none");

			// reset transform
			if (d3ZoomTransform(eventRect.node()) !== d3ZoomIdentity) {
				$$.zoom.transform(eventRect, d3ZoomIdentity);
			}

			state.domain = undefined;
		}
	}
};
