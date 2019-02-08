/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	scaleTime as d3ScaleTime,
	scaleLinear as d3ScaleLinear
} from "d3-scale";
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
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
		const offset = offsetValue || (() => $$.xAxis.tickOffset());
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
	updateScales(isInit) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		// update edges
		$$.xMin = isRotated ? 1 : 0;
		$$.xMax = isRotated ? $$.height : $$.width;
		$$.yMin = isRotated ? 0 : $$.height;
		$$.yMax = isRotated ? $$.width : 1;
		$$.subXMin = $$.xMin;
		$$.subXMax = $$.xMax;
		$$.subYMin = isRotated ? 0 : $$.height2;
		$$.subYMax = isRotated ? $$.width2 : 1;

		// update scales
		// x Axis
		$$.x = $$.getX($$.xMin, $$.xMax, $$.x && $$.x.orgDomain(), () => $$.xAxis.tickOffset());
		$$.subX = $$.getX($$.xMin, $$.xMax, $$.orgXDomain, d => (d % 1 ? 0 : $$.subXAxis.tickOffset()));

		$$.xAxisTickFormat = $$.axis.getXAxisTickFormat();
		$$.xAxisTickValues = $$.axis.getXAxisTickValues();

		$$.xAxis = $$.axis
			.getXAxis("x", $$.x, config.axis_x_tick_outer, isInit);

		$$.subXAxis = $$.axis
			.getXAxis("subX", $$.subX, config.axis_x_tick_outer, isInit);

		// y Axis
		$$.y = $$.getY($$.yMin, $$.yMax, $$.y ? $$.y.domain() : config.axis_y_default);
		$$.subY = $$.getY($$.subYMin, $$.subYMax, $$.subY ? $$.subY.domain() : config.axis_y_default);

		$$.yAxisTickValues = $$.axis.getYAxisTickValues();

		$$.yAxis = $$.axis
			.getYAxis("y", $$.y, config.axis_y_tick_outer, isInit);

		// y2 Axis
		if (config.axis_y2_show) {
			$$.y2 = $$.getY($$.yMin, $$.yMax, $$.y2 ? $$.y2.domain() : config.axis_y2_default);
			$$.subY2 = $$.getY($$.subYMin, $$.subYMax,
				$$.subY2 ? $$.subY2.domain() : config.axis_y2_default);

			$$.y2AxisTickValues = $$.axis.getY2AxisTickValues();

			$$.y2Axis = $$.axis
				.getYAxis("y2", $$.y2, config.axis_y2_tick_outer, isInit);
		}

		// update for arc
		$$.updateArc && $$.updateArc();
	},
});
