/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Axis based chart data config options
 */
export default {
	/**
	 * Specify the key of x values in the data.<br><br>
	 * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data on the key will be used for category names.
	 * @name data․x
	 * @memberof Options
	 * @type {string}
	 * @default undefined
	 * @example
	 * data: {
	 *   x: "date"
	 * }
	 */
	data_x: <string|undefined> undefined,

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
	 * @name data․xSort
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @example
	 * data: {
	 *   xSort: false
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
	 * Set labels options
	 * @name data․labels
	 * @memberof Options
	 * @type {object}
	 * @property {object} data Data object
	 * @property {boolean} [data.labels=false] Show or hide labels on each data points
	 * @property {boolean} [data.labels.centered=false] Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
	 * @property {Function} [data.labels.format] Set formatter function for data labels.<br>
	 * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data point where the label is shown.
	 *  - `j` is the sub index of the data point where the label is shown.<br><br>
	 * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
	 * @property {string|object} [data.labels.colors] Set label text colors.
	 * @property {object} [data.labels.position] Set each dataset position, relative the original.
	 * @property {number} [data.labels.position.x=0] x coordinate position, relative the original.
	 * @property {number} [data.labels.position.y=0] y coordinate position, relative the original.
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
	 * @see [Demo: label colors](https://naver.github.io/billboard.js/demo/#Data.DataLabelColors)
	 * @see [Demo: label format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
	 * @see [Demo: label overlap](https://naver.github.io/billboard.js/demo/#Data.DataLabelOverlap)
	 * @see [Demo: label position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
	 * @example
	 * data: {
	 *   labels: true,
	 *
	 *   // or set specific options
	 *   labels: {
	 *     format: function(v, id, i, j) { ... },
	 *
	 *     // it's possible to set for each data
	 *     format: {
	 *         data1: function(v, id, i, j) { ... },
	 *         ...
	 *     },
	 *
	 *     // align text to center of the 'bar' shape (works only for 'bar' type)
	 *     centered: true,
	 *
	 *     // apply for all label texts
	 *     colors: "red",
	 *
	 *     // or set different colors per dataset
	 *     // for not specified dataset, will have the default color value
	 *     colors: {
	 *        data1: "yellow",
	 *        data3: "green"
	 *     },
	 *
	 *     // set x, y coordinate position
	 *     position: {
	 *        x: -10,
	 *        y: 10
	 *     },
	 *
	 *     // or set x, y coordinate position by each dataset
	 *     position: {
	 *        data1: {x: 5, y: 5},
	 *        data2: {x: 10, y: -20}
	 *     }
	 *   }
	 * }
	 */
	data_labels:
		<boolean | {
			centered?: boolean;
			format?: Function;
			colors?: string|{[key: string]: string};
			position?: {[key: string]: number}|{[key: string]: {x?: number; y?: number;}}
		}> {},
	data_labels_colors: <string|object|undefined> undefined,
	data_labels_position: {},

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
