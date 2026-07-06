/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { isDefined, isValue, isObjectType, isNumber } from '../../module/util/type-checks.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Set the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @param {object} value Value to be set
 * @private
 */
function setMinMax($$, type, value) {
    const { config } = $$;
    const helper = (key, value) => {
        const v = isNumber(value) ? value : (value === false ? undefined : null);
        if (v !== null) {
            config[`axis_${key}_${type}`] = v;
        }
    };
    if (isDefined(value)) {
        if (isObjectType(value)) {
            Object.keys(value).forEach(key => {
                helper(key, value[key]);
            });
        }
        else if (isNumber(value) || value === false) {
            // shorthand values affects only y and y2.
            ["y", "y2"].forEach(key => {
                helper(key, value);
            });
        }
        $$.state.dirty.data = true;
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
function getMinMax($$, type) {
    const { config } = $$;
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
     * - **NOTE:** Only applicable for chart types which has x and y axes.
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
    labels: function (labels) {
        const $$ = this.internal;
        let labelText;
        if (labels) {
            Object.keys(labels).forEach(axisId => {
                $$.axis.setLabelText(axisId, labels[axisId]);
            });
            if ($$.state.isCanvasMode) {
                $$.renderCanvasFrame?.(undefined, null, false);
            }
            else {
                $$.axis.updateLabels();
            }
        }
        ["x", "y", "y2"].forEach(v => {
            const text = $$.axis.getLabelText(v);
            if (text) {
                !labelText && (labelText = {});
                labelText[v] = text;
            }
        });
        return labelText;
    },
    /**
     * Get and set axis min value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
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
    min: function (min) {
        const $$ = this.internal;
        return isValue(min) || min === false ?
            setMinMax($$, "min", min) :
            getMinMax($$, "min");
    },
    /**
     * Get and set axis max value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
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
    max: function (max) {
        const $$ = this.internal;
        return isValue(max) || max === false ?
            setMinMax($$, "max", max) :
            getMinMax($$, "max");
    },
    /**
     * Get and set axis min and max value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
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
    range: function (range) {
        const { axis } = this;
        if (arguments.length) {
            const { min, max } = range;
            isDefined(max) && axis.max(max);
            isDefined(min) && axis.min(min);
        }
        else {
            return {
                max: axis.max(),
                min: axis.min()
            };
        }
        return undefined;
    }
};
var apiAxis = { axis };

export { apiAxis as default };
