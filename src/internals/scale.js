/**
 * Copyright (c) 2017 NAVER Corp.
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

	getX(min, max, domain, offsetValue) {
		const $$ = this;
		let scale = $$.getScale(min, max, $$.isTimeSeries());
		const _scale = domain ? scale.domain(domain) : scale;
		let key;
		let offset;

		// Define customized scale if categorized axis
		if ($$.isCategorized()) {
			offset = offsetValue || function() { return 0; };
			scale = function(d, raw) {
				const v = _scale(d) + offset(d);

				return raw ? v : Math.ceil(v);
			};
		} else {
			scale = function(d, raw) {
				const v = _scale(d);

				return raw ? v : Math.ceil(v);
			};
		}

		// define functions
		for (key in _scale) {
			scale[key] = _scale[key];
		}

		scale.orgDomain = function() {
			return _scale.domain();
		};

		// define custom domain() for categorized axis
		if ($$.isCategorized()) {
			scale.domain = function(domainValue) {
				let domain = domainValue;

				if (!arguments.length) {
					domain = this.orgDomain();
					return [domain[0], domain[1] + 1];
				}

				_scale.domain(domain);

				return scale;
			};
		}

		return scale;
	},

	getY(min, max, domain) {
		const scale = this.getScale(min, max, this.isTimeSeriesY());

		if (domain) {
			scale.domain(domain);
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
	 * @param {Boolean} withoutTransitionAtInit - param is given at the init rendering
	 */
	updateScales(withoutTransitionAtInit) {
		const $$ = this;
		const config = $$.config;
		const forInit = !$$.x;

		// update edges
		$$.xMin = config.axis_rotated ? 1 : 0;
		$$.xMax = config.axis_rotated ? $$.height : $$.width;
		$$.yMin = config.axis_rotated ? 0 : $$.height;
		$$.yMax = config.axis_rotated ? $$.width : 1;
		$$.subXMin = $$.xMin;
		$$.subXMax = $$.xMax;
		$$.subYMin = config.axis_rotated ? 0 : $$.height2;
		$$.subYMax = config.axis_rotated ? $$.width2 : 1;

		// update scales
		$$.x = $$.getX($$.xMin, $$.xMax,
			forInit ? undefined : $$.x.orgDomain(), () => $$.xAxis.tickOffset());

		$$.y = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y_default : $$.y.domain());
		$$.y2 = $$.getY($$.yMin, $$.yMax, forInit ? config.axis_y2_default : $$.y2.domain());
		$$.subX = $$.getX($$.xMin, $$.xMax, $$.orgXDomain, d => (d % 1 ? 0 : $$.subXAxis.tickOffset()));
		$$.subY = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y_default : $$.subY.domain());
		$$.subY2 = $$.getY($$.subYMin, $$.subYMax, forInit ? config.axis_y2_default : $$.subY2.domain());

		// update axes
		$$.xAxisTickFormat = $$.axis.getXAxisTickFormat();
		$$.xAxisTickValues = $$.axis.getXAxisTickValues();
		$$.yAxisTickValues = $$.axis.getYAxisTickValues();
		$$.y2AxisTickValues = $$.axis.getY2AxisTickValues();

		$$.xAxis = $$.axis
			.getXAxis($$.x, $$.xOrient, $$.xAxisTickFormat,
				$$.xAxisTickValues, config.axis_x_tick_outer, withoutTransitionAtInit);

		$$.subXAxis = $$.axis
			.getXAxis($$.subX, $$.subXOrient, $$.xAxisTickFormat,
				$$.xAxisTickValues, config.axis_x_tick_outer);

		$$.yAxis = $$.axis
			.getYAxis($$.y, $$.yOrient, config.axis_y_tick_format,
				$$.yAxisTickValues, config.axis_y_tick_outer);

		$$.y2Axis = $$.axis
			.getYAxis($$.y2, $$.y2Orient, config.axis_y2_tick_format,
				$$.y2AxisTickValues, config.axis_y2_tick_outer);

		// update for arc
		$$.updateArc && $$.updateArc();
	},
});
