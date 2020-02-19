/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleTime as d3ScaleTime,
	scaleLinear as d3ScaleLinear
} from "d3-scale";

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
	getX(min, max, domain, offset) {
		const $$ = this;
		const scale = $$.scale.zoom || $$.getScale(min, max, $$.isTimeSeries());

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
	getY(min, max, domain) {
		const scale = this.getScale(min, max, this.isTimeSeriesY());

		domain && scale.domain(domain);

		return scale;
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
		if ($$.isCategorized()) {
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

	getYScale(id) {
		const {y, y2} = this.scale;
		return this.axis.getId(id) === "y2" ? y2 : y;
	},

	getSubYScale(id) {
		const {subY, subY2} = this.scale;
		return this.axis.getId(id) === "y2" ? subY2 : subY;
	},

	/**
	 * Update scale
	 * @private
	 * @param {Boolean} isInit - param is given at the init rendering
	 */
	updateScales(isInit, updateXDomain = true) {
		const $$ = this;
		const {axis, config, format, org, scale,
			state: {width, height, width2, height2}
		} = $$;

		if ($$.hasAxis) {
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
			}

			// update scales
			// x Axis
			const xDomain = updateXDomain && scale.x && scale.x.orgDomain();
			const xSubDomain = updateXDomain && org.xDomain;

			scale.x = $$.getX(min.x, max.x, xDomain, () => axis.x.tickOffset());
			scale.subX = $$.getX(min.x, max.x, xSubDomain, d => (d % 1 ? 0 : axis.subX.tickOffset()));

			format.xAxisTick = axis.getXAxisTickFormat();
			axis.tick.x = axis.getTickValues("x");

			axis.x = axis.getAxis("x", scale.x, config.axis_x_tick_outer, isInit);

			if (config.subchart_show) {
				axis.subX = axis.getAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
			}

			// y Axis
			scale.y = $$.getY(min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default);
			scale.subY = $$.getY(min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default);

			axis.tick.y = axis.getTickValues("y");
			axis.y = axis.getAxis("y", scale.y, config.axis_y_tick_outer, isInit);

			// y2 Axis
			if (config.axis_y2_show) {
				scale.y2 = $$.getY(min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default);
				scale.subY2 = $$.getY(min.subY, max.subY,
					scale.subY2 ? scale.subY2.domain() : config.axis_y2_default);

				axis.tick.y2 = axis.getTickValues("y2");
				axis.y2 = axis.getAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
			}
		} else {
			// update for arc
			$$.updateArc && $$.updateArc();
		}
	},
};
