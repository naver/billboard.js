/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isValue, isDefined, isObjectType, isNumber} from "../../module/util";

type AxisOption = {
	x?: number | false;
	y?: number | false;
	y2?: number | false;
} | number | false;

type RangeAxisOption = {
	min? : AxisOption;
	max?: AxisOption;
};

/**
 * Set the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @param {object} value Value to be set
 * @private
 */
function setMinMax($$, type: "min" | "max", value: AxisOption): void {
	const {config} = $$;
	const helper = (key, value) => {
		const v = isNumber(value) ? value : (
			value === false ? undefined : null
		);

		if (v !== null) {
			config[`axis_${key}_${type}`] = v;
		}
	};

	if (isDefined(value)) {
		if (isObjectType(value)) {
			Object.keys(value).forEach(key => {
				helper(key, value[key]);
			});
		} else if (isNumber(value) || value === false) {
			// shorthand values affects only y and y2.
			["y", "y2"].forEach(key => {
				helper(key, value);
			});
		}

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true
		});
	}
}

/**
 * Get the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @returns {{x, y, y2}}
 * @private
 */
function getMinMax($$, type: "min" | "max"): {x: number, y: number, y2: number} {
	const {config} = $$;

	return {
		x: config[`axis_x_${type}`],
		y: config[`axis_y_${type}`],
		y2: config[`axis_y2_${type}`]
	};
}

/**
 * Define axis
 * @ignore
 */
const axis = {
	/**
	 * Get and set axis labels.
	 * @function axis․labels
	 * @instance
	 * @memberof Chart
	 * @param {object} labels specified axis' label to be updated.
	 * @param {string} [labels.x] x Axis string
	 * @param {string} [labels.y] y Axis string
	 * @param {string} [labels.y2] y2 Axis string
	 * @returns {object|undefined} axis labels text object
	 * @example
	 * // Update axis' label
	 * chart.axis.labels({
	 *   x: "New X Axis Label",
	 *   y: "New Y Axis Label",
	 *   y2: "New Y2 Axis Label"
	 * });
	 *
	 * chart.axis.labels();
	 * // --> {
	 * //  x: "New X Axis Label",
	 * //  y: "New Y Axis Label",
	 * //  y2: "New Y2 Axis Label"
	 * // }
	 */
	labels: function<T>(labels?: {x?: string, y?: string, y2?: string}): T | undefined {
		const $$ = this.internal;
		let labelText;

		if (labels) {
			Object.keys(labels).forEach(axisId => {
				$$.axis.setLabelText(axisId, labels[axisId]);
			});

			$$.axis.updateLabels();
		}

		["x", "y", "y2"].forEach(v => {
			const text = $$.axis.getLabelText(v);

			if (text) {
				!labelText && (labelText = {});
				labelText[v] = text;
			}
		});

		return <T>labelText;
	},

	/**
	 * Get and set axis min value.
	 * @function axis․min
	 * @instance
	 * @memberof Chart
	 * @param {object} min If min is given, specified axis' min value will be updated.<br>
	 *   If no argument is given, the min values set on generating option for each axis will be returned.
	 *   If not set any min values on generation, it will return `undefined`.<br>
	 *   To unset specific axis max, set `false` to each of them.
	 * @returns {object|undefined}
	 * @example
	 * // Update axis' min
	 * chart.axis.min({
	 *   x: -10,
	 *   y: 1000,
	 *   y2: 100
	 * });
	 *
	 * // To unset specific axis min, set false to each of them.
	 * chart.axis.min({
	 *   x: false,
	 *   y: false,
	 *   y2: false
	 * });
	 *
	 * // shorthand (only affects y and y2 axis)
	 * chart.axis.min(-50);
	 * chart.axis.min(false);
	 */
	min: function(min?: AxisOption): object|void {
		const $$ = this.internal;

		return isValue(min) || min === false ?
			setMinMax($$, "min", min as AxisOption) :
			getMinMax($$, "min");
	},

	/**
	 * Get and set axis max value.
	 * @function axis․max
	 * @instance
	 * @memberof Chart
	 * @param {object} max If max is given, specified axis' max value will be updated.<br>
	 *   If no argument is given, the max values set on generating option for each axis will be returned.
	 *   If not set any max values on generation, it will return `undefined`.<br>
	 *   To unset specific axis max, set `false` to each of them.
	 * @returns {object|undefined}
	 * @example
	 * // Update axis' label
	 * chart.axis.max({
	 *    x: 100,
	 *    y: 1000,
	 *    y2: 10000
	 * });
	 *
	 * // To unset specific axis max, set false to each of them.
	 * chart.axis.max({
	 *   x: false,
	 *   y: false,
	 *   y2: false
	 * });
	 *
	 * // shorthand (only affects y and y2 axis)
	 * chart.axis.max(10);
	 * chart.axis.max(false);
	 */
	max: function(max?: AxisOption): object|void {
		const $$ = this.internal;

		return isValue(max) || max === false ?
			setMinMax($$, "max", max as AxisOption) :
			getMinMax($$, "max");
	},

	/**
	 * Get and set axis min and max value.
	 * @function axis․range
	 * @instance
	 * @memberof Chart
	 * @param {object} range If range is given, specified axis' min and max value will be updated.
	 *   If no argument is given, the current min and max values for each axis will be returned.<br>
	 *   To unset specific axis max, set `false` to each of them.
	 * @returns {object|undefined}
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
	 *
	 * // To unset specific axis max, set false to each of them.
	 * chart.axis.range({
	 *   min: {
	 *     x: false,
	 *     y: false,
	 *     y2: false
	 *   },
	 *   max: {
	 *     x: false,
	 *     y: false,
	 *     y2: false
	 *   },
	 * });
	 *
	 * // shorthand (only affects y and y2 axis)
	 * chart.axis.range({ min: -50, max: 1000 });
	 * chart.axis.range({ min: false, max: false });
	 */
	range: function(range: RangeAxisOption): object|void {
		const {axis} = this;

		if (arguments.length) {
			const {min, max} = range;

			isDefined(max) && axis.max(max);
			isDefined(min) && axis.min(min);
		} else {
			return {
				max: axis.max(),
				min: axis.min()
			};
		}

		return undefined;
	}
};

export default {axis};
