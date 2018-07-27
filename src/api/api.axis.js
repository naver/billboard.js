/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {isValue, isDefined, isObjectType, extend} from "../internals/util";

/**
 * Set the min/max value
 * @param {Chart} $$
 * @param {String} type
 * @param {Object} value
 * @return {undefined}
 * @private
 */
const setMinMax = ($$, type, value) => {
	const config = $$.config;
	const axisX = `axis_x_${type}`;
	const axisY = `axis_y_${type}`;
	const axisY2 = `axis_y2_${type}`;

	if (isDefined(value)) {
		if (isObjectType(value)) {
			isValue(value.x) && (config[axisX] = value.x);
			isValue(value.y) && (config[axisY] = value.y);
			isValue(value.y2) && (config[axisY2] = value.y2);
		} else {
			config[axisY] = value;
			config[axisY2] = value;
		}

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true
		});
	}

	return undefined;
};

/**
 * Get the min/max value
 * @param {Chart} $$
 * @param {String} type
 * @return {{x, y, y2}}
 * @private
 */
const getMinMax = ($$, type) => {
	const config = $$.config;
	const axisX = `axis_x_${type}`;
	const axisY = `axis_y_${type}`;
	const axisY2 = `axis_y2_${type}`;

	return {
		x: config[axisX],
		y: config[axisY],
		y2: config[axisY2]
	};
};

/**
 * Define axis
 * @ignore
 */
const axis = extend(() => {}, {
	/**
	 * Get and set axis labels.
	 * @method axis․labels
	 * @instance
	 * @memberOf Chart
	 * @param {Object} labels specified axis' label to be updated.
	 * @example
	 * // Update axis' label
	 * chart.axis.labels({
	 *   x: "New X Axis Label",
	 *   y: "New Y Axis Label"
	 * });
	 */
	labels: function(labels) {
		const $$ = this.internal;

		if (arguments.length) {
			Object.keys(labels).forEach(axisId => {
				$$.axis.setLabelText(axisId, labels[axisId]);
			});

			$$.axis.updateLabels();
		}
	},

	/**
	 * Get and set axis min value.
	 * @method axis․min
	 * @instance
	 * @memberOf Chart
	 * @param {Object} min If min is given, specified axis' min value will be updated.<br>
	 *     If no argument is given, the min values set on generating option for each axis will be returned.
	 *     If not set any min values on generation, it will return `undefined`.
	 * @example
	 * // Update axis' min
	 * chart.axis.min({
	 *   x: -10,
	 *   y: 1000,
	 *   y2: 100
	 * });
	 */
	min: function(min) {
		const $$ = this.internal;

		return arguments.length ?
			setMinMax($$, "min", min) :
			getMinMax($$, "min");
	},

	/**
	 * Get and set axis max value.
	 * @method axis․max
	 * @instance
	 * @memberOf Chart
	 * @param {Object} max If max is given, specified axis' max value will be updated.<br>
	 *     If no argument is given, the max values set on generating option for each axis will be returned.
	 *     If not set any max values on generation, it will return `undefined`.
	 * @example
	 * // Update axis' label
	 * chart.axis.max({
	 *    x: 100,
	 *    y: 1000,
	 *    y2: 10000
	 * });
	 */
	max: function(max) {
		const $$ = this.internal;

		return arguments.length ?
			setMinMax($$, "max", max) :
			getMinMax($$, "max");
	},

	/**
	 * Get and set axis min and max value.
	 * @method axis․range
	 * @instance
	 * @memberOf Chart
	 * @param {Object} range If range is given, specified axis' min and max value will be updated. If no argument is given, the current min and max values for each axis will be returned.
	 * @example
	 * // Update axis' label
	 * chart.axis.range({
	 *   min: {
	 *     x: -10,
	 *     y: -1000,
	 *     y2: -10000
	 *   },
	 *   max: {
	 *     x: 100,
	 *     y: 1000,
	 *     y2: 10000
	 *   },
	 * });
	 */
	range: function(range) {
		const axis = this.axis;

		if (arguments.length) {
			isDefined(range.max) && axis.max(range.max);
			isDefined(range.min) && axis.min(range.min);
		} else {
			return {
				max: axis.max(),
				min: axis.min()
			};
		}

		return undefined;
	}
});

extend(Chart.prototype, {axis});
