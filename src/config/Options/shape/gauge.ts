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
	 * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
	 * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
	 * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.
	 * @property {Function} [gauge.label.extents] Set customized min/max label text.
	 * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
	 * @property {number} [gauge.expand.rate=0.98] Set expand rate.
	 * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
	 * @property {number} [gauge.min=0] Set min value of the gauge.
	 * @property {number} [gauge.max=100] Set max value of the gauge.
	 * @property {number} [gauge.startingAngle=-1 * Math.PI / 2] Set starting angle where data draws.
	 * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character to enter line break.
	 * @property {string} [gauge.units] Set units of the gauge.
	 * @property {number} [gauge.width] Set width of gauge chart.
	 * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
	 * **Available Values:**
	 * - single
	 * - multi
	 * @property {string} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
	 * @example
	 *  gauge: {
	 *      fullCircle: false,
	 *      label: {
	 *          show: false,
	 *          format: function(value, ratio) {
	 *              return value;
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *          extents: function(value, isMax) {
	 *              return (isMax ? "Max:" : "Min:") + value;
	 *          }
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
	 *      arcs: {
	 *          minWidth: 5
	 *      }
	 *  }
	 */
	gauge_fullCircle: false,
	gauge_label_show: true,
	gauge_label_format: <(() => string)|undefined> undefined,
	gauge_label_extents: <(() => string)|undefined> undefined,
	gauge_min: 0,
	gauge_max: 100,
	gauge_type: "single",
	gauge_startingAngle: -1 * Math.PI / 2,
	gauge_title: "",
	gauge_units: <string|undefined> undefined,
	gauge_width: <number|undefined> undefined,
	gauge_arcs_minWidth: 5,
	gauge_expand: <boolean|{duration: number}> {},
	gauge_expand_rate: 0.98,
	gauge_expand_duration: 50
};
