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
		const scale = $$.zoomScale || $$.getScale(min, max, $$.isTimeSeries());

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
		return this.axis.getId(id) === "y2" ? this.y2 : this.y;
	},

	getSubYScale(id) {
		return this.axis.getId(id) === "y2" ? this.subY2 : this.subY;
	},

	/**
	 * Update scale
	 * @private
	 * @param {Boolean} isInit - param is given at the init rendering
	 */
	updateScales(isInit, updateXDomain = true) {
		const $$ = this;
		const config = $$.config;
		const {width, height, width2, height2} = $$.state;
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
		const xDomain = updateXDomain && $$.x && $$.x.orgDomain();
		const xSubDomain = updateXDomain && $$.orgXDomain;

		$$.x = $$.getX(min.x, max.x, xDomain, () => $$.axis.x.tickOffset());
		$$.subX = $$.getX(min.x, max.x, xSubDomain, d => (d % 1 ? 0 : $$.axis.subX.tickOffset()));

		$$.axis.xTickFormat = $$.axis.getXAxisTickFormat();
		$$.axis.xTickValues = $$.axis.getTickValues("x");

		$$.axis.x = $$.axis
			.getAxis("x", $$.x, config.axis_x_tick_outer, isInit);

		$$.axis.subX = $$.axis
			.getAxis("subX", $$.subX, config.axis_x_tick_outer, isInit);

		// y Axis
		$$.y = $$.getY(min.y, max.y, $$.y ? $$.y.domain() : config.axis_y_default);
		$$.subY = $$.getY(min.subY, max.subY, $$.subY ? $$.subY.domain() : config.axis_y_default);

		$$.axis.yTickValues = $$.axis.getTickValues("y");

		$$.axis.y = $$.axis
			.getAxis("y", $$.y, config.axis_y_tick_outer, isInit);

		// y2 Axis
		if (config.axis_y2_show) {
			$$.y2 = $$.getY(min.y, max.y, $$.y2 ? $$.y2.domain() : config.axis_y2_default);
			$$.subY2 = $$.getY(min.subY, max.subY,
				$$.subY2 ? $$.subY2.domain() : config.axis_y2_default);

			$$.axis.y2TickValues = $$.axis.getTickValues("y2");

			$$.axis.y2 = $$.axis
				.getAxis("y2", $$.y2, config.axis_y2_tick_outer, isInit);
		}

		// update for arc
		$$.updateArc && $$.updateArc();
	},
};
