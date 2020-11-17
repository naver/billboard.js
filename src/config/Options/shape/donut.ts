/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * donut config options
 */
export default {
	/**
	 * Set donut options
	 * @name donut
	 * @memberof Options
	 * @type {object}
	 * @property {object} donut Donut object
	 * @property {boolean} [donut.label.show=true] Show or hide label on each donut piece.
	 * @property {Function} [donut.label.format] Set formatter for the label on each donut piece.
	 * @property {number} [donut.label.threshold=0.05] Set threshold ratio to show/hide labels.
	 * @property {number|Function} [donut.label.ratio=undefined] Set ratio of labels position.
	 * @property {boolean} [donut.expand=true] Enable or disable expanding donut pieces.
	 * @property {number} [donut.expand.rate=0.98] Set expand rate.
	 * @property {number} [donut.expand.duration=50] Set expand transition time in ms.
	 * @property {number} [donut.width] Set width of donut chart.
	 * @property {string} [donut.title=""] Set title of donut chart. Use `\n` character for line break.
	 * @property {number} [donut.padAngle=0] Set padding between data.
	 * @property {number} [donut.startingAngle=0] Set starting angle where data draws.
	 * @example
	 *  donut: {
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
	 *          	...
	 *          	return ratio;
	 *          },
	 *          // or set ratio number
	 *          ratio: 0.5
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
	 *      width: 10,
	 *      padAngle: 0.2,
	 *      startingAngle: 1,
	 *      title: "Donut Title"
	 *
	 *      // title with line break
	 *      title: "Title1\nTitle2"
	 *  }
	 */
	donut_label_show: true,
	donut_label_format: <(() => number|string)|undefined> undefined,
	donut_label_threshold: 0.05,
	donut_label_ratio: <number|(() => number)|undefined> undefined,
	donut_width: <number|undefined> undefined,
	donut_title: "",
	donut_expand: <boolean|{rate?: number; duration?: number;}> {},
	donut_expand_rate: 0.98,
	donut_expand_duration: 50,
	donut_padAngle: 0,
	donut_startingAngle: 0
};
