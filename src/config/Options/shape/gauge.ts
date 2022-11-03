/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * gauge config options
 */
export default {
	/**
	 * Set gauge options
	 * @name gauge
	 * @memberof Options
	 * @type {object}
	 * @property {object} gauge Gauge object
	 * @property {boolean} [gauge.background=""] Set background color. (The `.bb-chart-arcs-background` element)
	 * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
	 * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
	 * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.<br>
	 * Will pass following arguments to the given function:
	 * - value {number}: absolute value
	 * - ratio {number}: value's ratio
	 * - id {string}: data's id value
	 * @property {Function} [gauge.label.extents] Set customized min/max label text.
	 * @property {number} [gauge.label.threshold=0] Set threshold ratio to show/hide labels.
	 * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
	 * @property {number} [gauge.expand.rate=0.98] Set expand rate.
	 * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
	 * @property {number} [gauge.min=0] Set min value of the gauge.
	 * @property {number} [gauge.max=100] Set max value of the gauge.
	 * @property {number} [gauge.startingAngle=-1 * Math.PI / 2] Set starting angle where data draws.
	 *
	 * **Limitations:**
	 * - when `gauge.fullCircle=false`:
	 *   - -1 * Math.PI / 2 <= startingAngle <= Math.PI / 2
	 *   - `startingAngle <= -1 * Math.PI / 2` defaults to `-1 * Math.PI / 2`
	 *   - `startingAngle >= Math.PI / 2` defaults to `Math.PI / 2`
	 * - when `gauge.fullCircle=true`:
	 *   - -1 * Math.PI < startingAngle < Math.PI
	 *   - `startingAngle < -1 * Math.PI` defaults to `Math.PI`
	 *   - `startingAngle >  Math.PI` defaults to `Math.PI`
	 * @property {number} [gauge.arcLength=100] Set the length of the arc to be drawn in percent from -100 to 100.<br>
	 * Negative value will draw the arc **counterclockwise**. Need to be used in conjunction with `gauge.fullCircle=true`.
	 *
	 * **Limitations:**
	 * - -100 <= arcLength (in percent) <= 100
	 * - 'arcLength < -100' defaults to -100
	 * - 'arcLength > 100' defaults to 100
	 * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character for line break.
	 * @property {string} [gauge.units] Set units of the gauge.
	 * @property {number} [gauge.width] Set width of gauge chart.
	 * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
	 * **Available Values:**
	 * - single
	 * - multi
	 * @property {number} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
	 * @see [Demo: archLength](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeArcLength)
	 * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeStartingAngle)
	 * @example
	 *  gauge: {
	 *      background: "#eee", // will set 'fill' css prop for '.bb-chart-arcs-background' classed element.
	 *      fullCircle: false,
	 *      label: {
	 *          show: false,
	 *          format: function(value, ratio, id) {
	 *              return value;
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *
	 *           extents: function(value, isMax) {
	 *              return (isMax ? "Max:" : "Min:") + value;
	 *          },
	 *
	 *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
	 *          // if data value is below than 0.1, text label will be hidden.
	 *          threshold: 0.1,
	 *      },
	 *
	 *      // disable expand transition for interaction
	 *      expand: false,
	 *
	 *      expand: {
	 *      	// set duration of expand transition to 500ms.
	 *          duration: 500,
	 *
	 *      	// set expand area rate
	 *          rate: 1
	 *      },
	 *
	 *      min: -100,
	 *      max: 200,
	 *      type: "single"  // or 'multi'
	 *      title: "Title Text",
	 *      units: "%",
	 *      width: 10,
	 *      startingAngle: -1 * Math.PI / 2,
	 *      arcLength: 100,
	 *      arcs: {
	 *          minWidth: 5
	 *      }
	 *  }
	 */
	gauge_background: "",
	gauge_fullCircle: false,
	gauge_label_show: true,
	gauge_label_format: <(() => string)|undefined> undefined,
	gauge_label_extents: <(() => string)|undefined> undefined,
	gauge_label_threshold: 0,
	gauge_min: 0,
	gauge_max: 100,
	gauge_type: "single",
	gauge_startingAngle: -1 * Math.PI / 2,
	gauge_arcLength: 100,
	gauge_title: "",
	gauge_units: <string|undefined> undefined,
	gauge_width: <number|undefined> undefined,
	gauge_arcs_minWidth: 5,
	gauge_expand: <boolean|{duration: number}> {},
	gauge_expand_rate: 0.98,
	gauge_expand_duration: 50
};
