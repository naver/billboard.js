/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleTime as d3ScaleTime,
	scaleLinear as d3ScaleLinear
} from "d3-scale";
import {isString, isValue, parseDate} from "../../module/util";

export default {
	getScale(min, max, forTimeseries) {
		return (forTimeseries ?
			d3ScaleTime() : d3ScaleLinear()
		).range([min, max]);
	},

	/**
	 * Get x Axis scale function
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Number} domain
	 * @param {Function} offset The offset getter to be sum
	 * @return {Function} scale
	 * @private
	 */
	getXScale(min, max, domain, offset) {
		const $$ = this;
		const scale = $$.scale.zoom || $$.getScale(min, max, $$.axis.isTimeSeries());

		return $$.getCustomizedScale(
			domain ? scale.domain(domain) : scale,
			offset
		);
	},

	/**
	 * Get y Axis scale function
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Number} domain
	 * @return {Function} scale
	 * @private
	 */
	getYScale(min, max, domain) {
		const $$ = this;
		const scale = $$.getScale(min, max, $$.axis.isTimeSeriesY());

		domain && scale.domain(domain);

		return scale;
	},

	/**
	 * Get y Axis scale
	 * @param {String} id Axis id
	 * @param {Boolean} isSub Weather is sub Axis
	 * @private
	 */
	getYScaleById(id: string, isSub = false) {
		const isY2 = this.axis.getId(id) === "y2";
		const key = isSub ? (isY2 ? "subY2" : "subY") : (isY2 ? "y2" : "y");

		return this.scale[key];
	},

	/**
	 * Get customized scale
	 * @param {d3.scaleLinear|d3.scaleTime} scaleValue
	 * @param {Function} offsetValue Offset getter to be sum
	 * @return {} scale
	 * @private
	 */
	getCustomizedScale(scaleValue, offsetValue) {
		const $$ = this;
		const offset = offsetValue || (() => $$.axis.x.tickOffset());
		const scale = function(d, raw) {
			const v = scaleValue(d) + offset();

			return raw ? v : Math.ceil(v);
		};

		// copy original scale methods
		for (const key in scaleValue) {
			scale[key] = scaleValue[key];
		}

		scale.orgDomain = () => scaleValue.domain();
		scale.orgScale = () => scaleValue;

		// define custom domain() for categorized axis
		if ($$.axis.isCategorized()) {
			scale.domain = function(domainValue) {
				let domain = domainValue;

				if (!arguments.length) {
					domain = this.orgDomain();

					return [domain[0], domain[1] + 1];
				}

				scaleValue.domain(domain);

				return scale;
			};
		}

		return scale;
	},

	/**
	 * Update scale
	 * @private
	 * @param {Boolean} isInit - param is given at the init rendering
	 */
	updateScales(isInit, updateXDomain = true) {
		const $$ = this;
		const {axis, config, format, org, scale,
			state: {width, height, width2, height2, hasAxis}
		} = $$;

		if (hasAxis) {
			const isRotated = config.axis_rotated;

			// update edges
			const min = {
				x: isRotated ? 1 : 0,
				y: isRotated ? 0 : height,
				subX: isRotated ? 1 : 0,
				subY: isRotated ? 0 : height2
			};

			const max = {
				x: isRotated ? height : width,
				y: isRotated ? width : 1,
				subX: isRotated ? height : width,
				subY: isRotated ? width2 : 1
			};

			// update scales
			// x Axis
			const xDomain = updateXDomain && scale.x && scale.x.orgDomain();
			const xSubDomain = updateXDomain && org.xDomain;

			scale.x = $$.getXScale(min.x, max.x, xDomain, () => axis.x.tickOffset());
			scale.subX = $$.getXScale(min.x, max.x, xSubDomain, d => (d % 1 ? 0 : axis.subX.tickOffset()));

			format.xAxisTick = axis.getXAxisTickFormat();

			axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);

			if (config.subchart_show) {
				axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
			}

			// y Axis
			scale.y = $$.getYScale(min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default);
			scale.subY = $$.getYScale(
				min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default);

			axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);

			// y2 Axis
			if (config.axis_y2_show) {
				scale.y2 = $$.getYScale(min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default);
				scale.subY2 = $$.getYScale(min.subY, max.subY,
					scale.subY2 ? scale.subY2.domain() : config.axis_y2_default);

				axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
			}
		} else {
			// update for arc
			$$.updateArc && $$.updateArc();
		}
	},

	/**
	 * Get the zoom or unzoomed scaled value
	 * @param {Date|Number|Object} d Data value
	 * @private
	 */
	xx(d): number {
		const $$ = this;
		const {config, scale: {x, zoom}} = $$;
		const fn = config.zoom_enabled && zoom ?
			zoom : x;

		return d ? fn(isValue(d.x) ? d.x : d) : null;
	},

	xv(d): number {
		const $$ = this;
		const {axis, config, scale: {x}} = $$;
		let value = $$.getBaseValue(d);

		if (axis.isTimeSeries()) {
			value = parseDate.call($$, value);
		} else if (axis.isCategorized() && isString(value)) {
			value = config.axis_x_categories.indexOf(value);
		}

		return Math.ceil(x(value));
	},

	yv(d): number {
		const $$ = this;
		const {scale: {y, y2}} = $$;
		const yScale = d.axis && d.axis === "y2" ? y2 : y;

		return Math.ceil(yScale($$.getBaseValue(d)));
	},

	subxx(d): number {
		return d ? this.scale.subX(d.x) : null;
	}
};
