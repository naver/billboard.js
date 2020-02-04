/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * grid config options
 */
export default {
    /**
     * Set related options
     * @name grid
     * @memberof Options
     * @type {Object}
     * @property {Boolean} [front=false] Set 'grid & focus lines' to be positioned over grid lines and chart elements.
     * @property {Boolean} [x.show=false] Show grids along x axis.
     * @property {Array} [x.lines=[]] Show additional grid lines along x axis.<br>
     *  This option accepts array including object that has value, text, position and class. text, position and class are optional. For position, start, middle and end (default) are available.
     *  If x axis is category axis, value can be category name. If x axis is timeseries axis, value can be date string, Date object and unixtime integer.
     * @property {Boolean} [y.show=false] Show grids along x axis.
     * @property {Array} [y.lines=[]] Show additional grid lines along y axis.<br>
     *  This option accepts array including object that has value, text, position and class.
     * @property {Number} [y.ticks=10] Number of y grids to be shown.
     * @property {Boolean} [focus.edge=false] Show edged focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
     * @property {Boolean} [focus.show=true] Show grid line when focus.
     * @property {Boolean} [focus.y=false] Show y coordinate focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
     * @property {Boolean} [lines.front=true] Set grid lines to be positioned over chart elements.
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Grid.GridLines)
     * @see [Demo: X Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalXGridLines)
     * @see [Demo: Y Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalYGridLines)
     * @example
     * grid: {
     *   x: {
     *     show: true,
     *     lines: [
     *       {value: 2, text: "Label on 2"},
     *       {value: 5, text: "Label on 5", class: "label-5"},
     *       {value: 6, text: "Label on 6", position: "start"}
     *     ]
     *   },
     *   y: {
     *     show: true,
     *     lines: [
     *       {value: 100, text: "Label on 100"},
     *       {value: 200, text: "Label on 200", class: "label-200"},
     *       {value: 300, text: "Label on 300", position: 'middle'}
     *     ],
     *     ticks: 5
     *   },
     *   front: true,
     *   focus: {
     *      show: false,
     *
     *      // Below options are available when 'tooltip.grouped=false' option is set
     *      edge: true,
     *      y: true
     *   },
     *   lines: {
     *      front: false
     *   }
     * }
     */
    grid_x_show: false,
    grid_x_type: "tick",
    grid_x_lines: [],
    grid_y_show: false,
    grid_y_lines: [],
    grid_y_ticks: 10,
    grid_focus_edge: false,
    grid_focus_show: true,
    grid_focus_y: false,
    grid_front: false,
    grid_lines_front: true
};
