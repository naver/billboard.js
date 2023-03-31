/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Axis based chart data config options
 */
export default {
	/**
	 * Specify the keys of the x values for each data.<br><br>
	 * This option can be used if we want to show the data that has different x values.
	 * @name data․xs
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   xs: {
	 *      data1: "x1",
	 *      data2: "x2"
	 *   }
	 * }
	 */
	data_xs: {},

	/**
	 * Set a format specifier to parse string specifed as x.
	 * @name data․xFormat
	 * @memberof Options
	 * @type {string}
	 * @default %Y-%m-%d
	 * @example
	 * data: {
	 *    x: "x",
	 *    columns: [
	 *        ["x", "01012019", "02012019", "03012019"],
	 *        ["data1", 30, 200, 100]
	 *    ],
	 *    // Format specifier to parse as datetime for given 'x' string value
	 *    xFormat: "%m%d%Y"
	 * },
	 * axis: {
	 *    x: {
	 *        type: "timeseries"
	 *    }
	 * }
	 * @see [D3's time specifier](https://github.com/d3/d3-time-format#locale_format)
	 */
	data_xFormat: "%Y-%m-%d",

	/**
	 * Set localtime format to parse x axis.
	 * @name data․xLocaltime
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @example
	 * data: {
	 *   xLocaltime: false
	 * }
	 */
	data_xLocaltime: true,

	/**
	 * Sort on x axis.
	 * - **NOTE:** This option works for lineish(area/line/spline/step) types only.
	 * @name data․xSort
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataXSort)
	 * @example
	 * data: {
	 *   xSort: false,
	 *   x: "x",
	 *   columns: [
	 *     // The line graph will start to be drawn following the x axis sequence
	 *     // Below data, wil start drawing x=1: 200, x=2: 300, x=3: 100
	 *     ["x", 3, 1, 2],
	 *     ["data1", 100, 200, 300]
	 *   ]
	 * }
	 */
	data_xSort: true,

	/**
	 * Set y axis the data related to. y and y2 can be used.
	 * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
	 * @name data․axes
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   axes: {
	 *     data1: "y",
	 *     data2: "y2"
	 *   }
	 * }
	 */
	data_axes: <{[key: string]: string}> {},

	/**
	 * Define regions for each data.<br>
	 * The values must be an array for each data and it should include an object that has `start`, `end` and `style`.
	 * - The object type should be as:
	 *   - start {number}: Start data point number. If not set, the start will be the first data point.
	 *   - [end] {number}: End data point number. If not set, the end will be the last data point.
	 *   - [style.dasharray="2 2"] {object}: The first number specifies a distance for the filled area, and the second a distance for the unfilled area.
	 * - **NOTE:** Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
	 * @name data․regions
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   regions: {
	 *     data1: [{
	 *         start: 1,
	 *         end: 2,
	 *         style: {
	 *             dasharray: "5 2"
	 *         }
	 *     }, {
	 *         start: 3
	 *     }],
	 *     ...
	 *   }
	 * }
	 */
	data_regions: <{start?: number; end?: number; style?: {dasharray: string;}}[]> {},

	/**
	 * Set the stacking to be normalized
	 * - **NOTE:**
	 *   - For stacking, '[data.groups](#.data%25E2%2580%25A4groups)' option should be set
	 *   - y Axis will be set in percentage value (0 ~ 100%)
	 *   - Must have postive values
	 * @name data․stack․normalize
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataStackNormalized)
	 * @example
	 * data: {
	 *   stack: {
	 *      normalize: true
	 *   }
	 * }
	 */
	data_stack_normalize: false
};
