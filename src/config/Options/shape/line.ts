/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * line config options
 */
export default {
	/**
	 * Set line options
	 * @name line
	 * @memberof Options
	 * @type {object}
	 * @property {object} line Line object
	 * @property {boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
	 *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
	 * @property {Array}   [line.classes=undefined] If set, used to set a css class on each line.
	 * @property {boolean} [line.step.type=step] Change step type for step chart.<br>
	 * **Available values:**
	 * - step
	 * - step-before
	 * - step-after
	 * @property {boolean} [line.step.tooltipMatch=false] Set to `true` for `step-before` and `step-after` types to have cursor/tooltip match to hovered step's point instead of nearest point.
	 * @property {boolean|Array} [line.point=true] Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
	 * @property {boolean} [line.zerobased=false] Set if min or max value will be 0 on line chart.
	 * @example
	 *  line: {
	 *      connectNull: true,
	 *      classes: [
	 *          "line-class1",
	 *          "line-class2"
	 *      ],
	 *      step: {
	 *          type: "step-after",
	 *
	 *          // to have cursor/tooltip match to hovered step's point instead of nearest point.
	 *          tooltipMatch: true
	 *      },
	 *
	 *      // hide all data points ('point.show=false' also has similar effect)
	 *      point: false,
	 *
	 *      // show data points for only indicated datas
	 *      point: [
	 *          "data1", "data3"
	 *      ],
	 *
	 *      zerobased: false
	 *  }
	 */
	line_connectNull: false,
	line_step_type: <"step"|"step-before"|"step-after"> "step",
	line_step_tooltipMatch: false,
	line_zerobased: false,
	line_classes: <string[]|undefined> undefined,
	line_point: <string[]|boolean> true
};
