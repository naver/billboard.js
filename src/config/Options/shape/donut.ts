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
     * @type {Object}
     * @property {Boolean} [donut.label.show=true] Show or hide label on each donut piece.
     * @property {Function} [donut.label.format] Set formatter for the label on each donut piece.
     * @property {Number} [donut.label.threshold=0.05] Set threshold to show/hide labels.
     * @property {Number|Function} [donut.label.ratio=undefined] Set ratio of labels position.
     * @property {Boolean} [donut.expand=true] Enable or disable expanding donut pieces.
     * @property {Number} [donut.expand.rate=0.98] Set expand rate.
     * @property {Number} [donut.expand.duration=50] Set expand transition time in ms.
     * @property {Number} [donut.width] Set width of donut chart.
     * @property {String} [donut.title=""] Set title of donut chart. Use `\n` character to enter line break.
     * @property {Number} [donut.padAngle=0] Set padding between data.
     * @property {Number} [donut.startingAngle=0] Set starting angle where data draws.
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
    donut_label_format: undefined,
    donut_label_threshold: 0.05,
    donut_label_ratio: undefined,
    donut_width: undefined,
    donut_title: "",
    donut_expand: {},
    donut_expand_rate: 0.98,
    donut_expand_duration: 50,
    donut_padAngle: 0,
    donut_startingAngle: 0
};
