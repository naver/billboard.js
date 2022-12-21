/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * polar config options
 */
export default {
	/**
	 * Set polar options
	 * @name polar
	 * @memberof Options
	 * @type {object}
	 * @property {object} polar Polar object
	 * @property {boolean} [polar.label.show=true] Show or hide label on each polar piece.
	 * @property {Function} [polar.label.format] Set formatter for the label on each polar piece.
	 * @property {number} [polar.label.threshold=0.05] Set threshold ratio to show/hide labels.
	 * @property {number|Function} [polar.label.ratio=undefined] Set ratio of labels position.
	 * @property {number} [polar.level.depth=3] Set the level depth.
	 * @property {boolean} [polar.level.show=true] Show or hide level.
	 * @property {string} [polar.level.text.backgroundColor="#fff"] Set label text's background color.
	 * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
	 * @property {boolean} [polar.level.text.show=true] Show or hide level text.
	 * @property {number} [polar.padAngle=0] Set padding between data.
	 * @property {number} [polar.padding=0] Sets the gap between pie arcs.
	 * @property {number} [polar.startingAngle=0] Set starting angle where data draws.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @example
	 *  polar: {
	 *      label: {
	 *          show: false,
	 *          format: function(value, ratio, id) {
	 *              return d3.format("$")(value);
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *
	 *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
	 *          // if data value is below than 0.1, text label will be hidden.
	 *          threshold: 0.1,
	 *
	 *          // set ratio callback. Should return ratio value
	 *          ratio: function(d, radius, h) {
	 *              ...
	 *              return ratio;
	 *          },
	 *          // or set ratio number
	 *          ratio: 0.5
	 *      },
	 *      level: {
	 *          depth: 3,
	 *          max: 500,
	 *          show: true,
	 *          text: {
	 *              format: function(x) {
	 *                  return x + "%";
	 *              },
	 *              show: true,
	 *              backgroundColor: "red"
	 *          }
	 *      },
	 *      padAngle: 0.1,
	 *      padding: 0,
	 *      startingAngle: 1
	 *  }
	 */
	polar_label_show: true,
	polar_label_format: <(() => number|string)|undefined> undefined,
	polar_label_threshold: 0.05,
	polar_label_ratio: <(() => number)|undefined> undefined,
	polar_level_depth: 3,
	polar_level_max: <number|undefined> undefined,
	polar_level_show: true,
	polar_level_text_backgroundColor: "#fff",
	polar_level_text_format: (x: number) => (x % 1 === 0 ? x : x.toFixed(2)),
	polar_level_text_show: true,
	polar_padAngle: 0,
	polar_padding: 0,
	polar_startingAngle: 0
};
