/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {ChartTypes} from "../../../../types/types";

/**
 * data config options
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
	 * Converts data id value
	 * @name data․idConverter
	 * @memberof Options
	 * @type {Function}
	 * @default function(id) { return id; }
	 * @example
	 * data: {
	 *    idConverter: function(id) {
	 *       // when id is 'data1', converts to be 'data2'
	 *       // 'data2' should be given as the initial data value
	 *       if (id === "data1") {
	 *          return "data2";
	 *       } else {
	 *          return id;
	 *       }
	 *    }
	 * }
	 */
	data_idConverter: id => id,

	/**
	 * Set custom data name.
	 * If a name is set to `null`, the series is omitted from the legend.
	 * @name data․names
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataName)
	 * @example
	 * data: {
	 *   names: {
	 *     data1: "Data Name 1",
	 *     data2: "Data Name 2"
	 *   }
	 * }
	 */
	data_names: <{[key: string]: string|null}> {},

	/**
	 * Set custom data class.<br><br>
	 * If this option is specified, the element g for the data has an additional class that has the prefix 'bb-target-' (eg. bb-target-additional-data1-class).
	 * @name data․classes
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   classes: {
	 *     data1: "additional-data1-class",
	 *     data2: "additional-data2-class"
	 *   }
	 * }
	 */
	data_classes: <{[key: string]: string}> {},

	/**
	 * Set chart type at once.<br><br>
	 * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.<br><br>
	 * **Available Values:**
	 * - area
	 * - area-line-range
	 * - area-spline
	 * - area-spline-range
	 * - area-step
	 * - bar
	 * - bubble
	 * - candlestick
	 * - donut
	 * - gauge
	 * - line
	 * - pie
	 * - polar
	 * - radar
	 * - scatter
	 * - spline
	 * - step
	 * - treemap
	 * @name data․type
	 * @memberof Options
	 * @type {string}
	 * @default "line"<br>NOTE: When importing shapes by ESM, `line()` should be specified for type.
	 * @example
	 * data: {
	 *    type: "bar"
	 * }
	 * @example
	 * // Generate chart by importing ESM
	 * // Import types to be used only, where this will make smaller bundle size.
	 * import bb, {
	 *   area,
	 *   areaLineRange,
	 *   areaSpline,
	 *   areaSplineRange,
	 *   areaStep,
	 *   bar,
	 *   bubble,
	 *   candlestick,
	 *   donut,
	 *   gauge,
	 *   line,
	 *   pie,
	 *   polar,
	 *   radar,
	 *   scatter,
	 *   spline,
	 *   step,
	 *   treemap
	 * }
	 *
	 * bb.generate({
	 *   ...,
	 *   data: {
	 *     type: bar()
	 *   }
	 * });
	 */
	data_type: <ChartTypes|undefined> undefined,

	/**
	 * Set chart type for each data.<br>
	 * This setting overwrites data.type setting.
	 * - **NOTE:** `radar` and `treemap` type can't be combined with other types.
	 * @name data․types
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   types: {
	 *     data1: "bar",
	 *     data2: "spline"
	 *   }
	 * }
	 * @example
	 * // Generate chart by importing ESM
	 * // Import types to be used only, where this will make smaller bundle size.
	 * import bb, {
	 *   area,
	 *   areaLineRange,
	 *   areaSpline,
	 *   areaSplineRange,
	 *   areaStep,
	 *   bar,
	 *   bubble,
	 *   candlestick,
	 *   donut,
	 *   gauge,
	 *   line,
	 *   pie,
	 *   polar,
	 *   radar,
	 *   scatter,
	 *   spline,
	 *   step,
	 *   treemap
	 * }
	 *
	 * bb.generate({
	 *   ...,
	 *   data: {
	 *     types: {
	 *       data1: bar(),
	 *       data1: spline()
	 *     }
	 *   }
	 * });
	 */
	data_types: <{[key: string]: ChartTypes}> {},

	/**
	 *  This option changes the order of stacking data and pieces of pie/donut.
	 *  - If `null` specified, it will be the order the data loaded.
	 *  - If function specified, it will be used as [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)<br><br>
	 *
	 *  **Available Values:**
	 *  - `desc`: In descending order
	 *  - `asc`: In ascending order
	 *  - `null`: It keeps the data load order
	 *  - `function(data1, data2) { ... }`: Array.sort compareFunction
	 *
	 *  **NOTE**: order function, only works for Axis based types & Arc types, except `Radar` type.
	 * @name data․order
	 * @memberof Options
	 * @type {string|Function|null}
	 * @default desc
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataOrder)
	 * @example
	 * data: {
	 *   // in descending order (default)
	 *   order: "desc"
	 *
	 *   // in ascending order
	 *   order: "asc"
	 *
	 *   // keeps data input order
	 *   order: null
	 *
	 *   // specifying sort function
	 *   order: function(a, b) {
	 *       // param data passed format
	 *       // {
	 *       //   id: "data1", id_org: "data1", values: [
	 *       //      {x: 5, value: 250, id: "data1", index: 5, name: "data1"},
	 *       //       ...
	 *       //   ]
	 *       // }
	 *
	 *       const reducer = (p, c) => p + Math.abs(c.value);
	 *       const aSum = a.values.reduce(reducer, 0);
	 *       const bSum = b.values.reduce(reducer, 0);
	 *
	 *       // ascending order
	 *       return aSum - bSum;
	 *
	 *       // descending order
	 *       // return bSum - aSum;
	 *   }
	 * }
	 */
	data_order: <"desc"|"asc"|Function|null> "desc",

	/**
	 * Set groups for the data for stacking.
	 * @name data․groups
	 * @memberof Options
	 * @type {Array}
	 * @default []
	 * @example
	 * data: {
	 *   groups: [
	 *     ["data1", "data2"],
	 *     ["data3"]
	 *   ]
	 * }
	 */
	data_groups: <string[][]> [],

	/**
	 * Set how zero value will be treated on groups.<br>
	 * Possible values:
	 * - `zero`: 0 will be positioned at absolute axis zero point.
	 * - `positive`: 0 will be positioned at the top of a stack.
	 * - `negative`: 0 will be positioned at the bottom of a stack.
	 * @name data․groupsZeroAs
	 * @memberof Options
	 * @type {string}
	 * @default "positive"
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.Groups)
	 * @example
	 * data: {
	 *   groupsZeroAs: "zero" // "positive" or "negative"
	 * }
	 */
	data_groupsZeroAs: <"zero" | "positive" | "negative"> "positive",

	/**
	 * Set color converter function.<br><br>
	 * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc. And it must return a string that represents color (e.g. '#00ff00').
	 * @name data․color
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataColor)
	 * @example
	 * data: {
	 *   color: function(color, d) { ... }
	 * }
	 */
	data_color: <Function|undefined> undefined,

	/**
	 * Set color for each data.
	 * @name data․colors
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @example
	 * data: {
	 *   colors: {
	 *     data1: "#ff0000",
	 *     data2: function(d) {
	 *        return "#000";
	 *     }
	 *     ...
	 *   }
	 * }
	 */
	data_colors: <{[key: string]: string|(() => string);}> {},

	/**
	 * Set labels options
	 * @name data․labels
	 * @memberof Options
	 * @type {object}
	 * @property {object} data Data object
	 * @property {boolean} [data.labels=false] Show or hide labels on each data points
	 * @property {boolean} [data.labels.centered=false] Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
	 * @property {Function} [data.labels.format] Set formatter function for data labels.<br>
	 * The formatter function receives 4 arguments such as v, id, i, j and it **must return a string**(`\n` character will be used as line break) that will be shown as the label.<br><br>
	 * The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data series point where the label is shown.
	 *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
	 * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
	 * @property {string|object} [data.labels.backgroundColors] Set label text background colors.
	 * @property {string|object|Function} [data.labels.colors] Set label text colors.
	 * @property {object} [data.labels.position] Set each dataset position, relative the original.
	 * @property {number} [data.labels.position.x=0] x coordinate position, relative the original.
	 * @property {number} [data.labels.position.y=0] y coordinate position, relative the original.
	 * @property {object} [data.labels.rotate] Rotate label text. Specify degree value in a range of `0 ~ 360`.
	 * - **NOTE:** Depend on rotate value, text position need to be adjusted manually(using `data.labels.position` option) to be shown nicely.
	 * @memberof Options
	 * @type {object}
	 * @default {}
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
	 * @see [Demo: label colors](https://naver.github.io/billboard.js/demo/#Data.DataLabelColors)
	 * @see [Demo: label format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
	 * @see [Demo: label multiline](https://naver.github.io/billboard.js/demo/#Data.DataLabelMultiline)
	 * @see [Demo: label overlap](https://naver.github.io/billboard.js/demo/#Data.DataLabelOverlap)
	 * @see [Demo: label position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
	 * @see [Demo: label rotate](https://naver.github.io/billboard.js/demo/#Data.DataLabelRotate)
	 * @example
	 * data: {
	 *   labels: true,
	 *
	 *   // or set specific options
	 *   labels: {
	 *     format: function(v, id, i, j) {
	 *         ...
	 *         // to multiline, return with '\n' character
	 *         return "Line1\nLine2";
	 *     },
	 *
	 *     // it's possible to set for each data
	 *     format: {
	 *         data1: function(v, id, i, texts) { ... },
	 *         ...
	 *     },
	 *
	 *     // align text to center of the 'bar' shape (works only for 'bar' type)
	 *     centered: true,
	 *
	 *     // apply backgound color for label texts
	 *     backgroundColors: "red",
	 *
	 *     // set differenct backround colors per dataset
	 *     backgroundColors: {
	 *          data1: "green",
	 *          data2: "yellow"
	 *     }
	 *
	 *     // apply for all label texts
	 *     colors: "red",
	 *
	 *     // set different colors per dataset
	 *     // for not specified dataset, will have the default color value
	 *     colors: {
	 *        data1: "yellow",
	 *        data3: "green"
	 *     },
	 *
	 *     // call back for label text color
	 *     colors: function(color, d) {
	 *         // color: the default data label color string
	 *         // data: ex) {x: 0, value: 200, id: "data3", index: 0}
	 *         ....
	 *         return d.value > 200 ? "cyan" : color;
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
	 *     },
	 *
	 *	   // rotate degree for label text
	 *     rotate: 90
	 *   }
	 * }
	 */
	data_labels:
		<boolean | {
			centered?: boolean;
			format?: Function;
			colors?: string|{[key: string]: string};
			position?: {[key: string]: number}|{[key: string]: {x?: number; y?: number;}};
			rotate?: number;
		}> {},
	data_labels_backgroundColors: <string|{[key: string]: string}|undefined> undefined,
	data_labels_colors: <string|object|Function|undefined> undefined,
	data_labels_position: {},

	/**
	 * Hide each data when the chart appears.<br><br>
	 * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
	 * @name data․hide
	 * @memberof Options
	 * @type {boolean|Array}
	 * @default false
	 * @example
	 * data: {
	 *   // all of data will be hidden
	 *   hide: true
	 *
	 *   // specified data will be hidden
	 *   hide: ["data1", ...]
	 * }
	 */
	data_hide: <string[]|boolean> false,

	/**
	 * Filter values to be shown
	 * The data value is the same as the returned by `.data()`.
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	 * @name data․filter
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @example
	 * data: {
	 *   // filter for id value
	 *   filter: function(v) {
	 *      // v: [{id: "data1", id_org: "data1", values: [
	 *      //      {x: 0, value: 130, id: "data2", index: 0}, ...]
	 *      //    }, ...]
	 *      return v.id !== "data1";
	 *   }
	 */
	data_filter: <(() => boolean)|undefined> undefined,

	/**
	 * Set a callback for click event on each data point.<br><br>
	 * This callback will be called when each data point clicked and will receive `d` and element as the arguments.
	 * - `d` is the data clicked and element is the element clicked.
	 * - `element` is the current interacting svg element.
	 * - In this callback, `this` will be the Chart object.
	 * @name data․onclick
	 * @memberof Options
	 * @type {Function}
	 * @default function() {}
	 * @example
	 * data: {
	 *     onclick: function(d, element) {
	 *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
	 *        // element - <circle>
	 *        ...
	 *     }
	 * }
	 */
	data_onclick: () => {},

	/**
	 * Set a callback for mouse/touch over event on each data point.<br><br>
	 * This callback will be called when mouse cursor or via touch moves onto each data point and will receive `d` and `element` as the argument.
	 * - `d` is the data where mouse cursor moves onto.
	 * - `element` is the current interacting svg element.
	 * - In this callback, `this` will be the Chart object.
	 * @name data․onover
	 * @memberof Options
	 * @type {Function}
	 * @default function() {}
	 * @example
	 * data: {
	 *     onover: function(d, element) {
	 *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
	 *        // element - <circle>
	 *        ...
	 *     }
	 * }
	 */
	data_onover: () => {},

	/**
	 * Set a callback for mouse/touch out event on each data point.<br><br>
	 * This callback will be called when mouse cursor or via touch moves out each data point and will receive `d` as the argument.
	 * - `d` is the data where mouse cursor moves out.
	 * - `element` is the current interacting svg element.
	 * - In this callback, `this` will be the Chart object.
	 * @name data․onout
	 * @memberof Options
	 * @type {Function}
	 * @default function() {}
	 * @example
	 * data: {
	 *     onout: function(d, element) {
	 *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
	 *        // element - <circle>
	 *        ...
	 *     }
	 * }
	 */
	data_onout: () => {},

	/**
	 * Set a callback for when data is shown.<br>
	 * The callback will receive shown data ids in array.
	 * @name data․onshown
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @example
	 *  data: {
	 *    onshown: function(ids) {
	 *      // ids - ["data1", "data2", ...]
	 *      ...
	 *    }
	 *  }
	 */
	data_onshown: <Function|undefined> undefined,

	/**
	 * Set a callback for when data is hidden.<br>
	 * The callback will receive hidden data ids in array.
	 * @name data․onhidden
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @example
	 *  data: {
	 *    onhidden: function(ids) {
	 *      // ids - ["data1", "data2", ...]
	 *      ...
	 *    }
	 *  }
	 */
	data_onhidden: <Function|undefined> undefined,

	/**
	 * Set a callback for minimum data
	 * - **NOTE:** For 'area-line-range' and 'area-spline-range', `mid` data will be taken for the comparison
	 * @name data․onmin
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
	 * @example
	 *  onmin: function(data) {
	 *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
	 *    ...
	 *  }
	 */
	data_onmin: <Function|undefined> undefined,

	/**
	 * Set a callback for maximum data
	 * - **NOTE:** For 'area-line-range' and 'area-spline-range', `mid` data will be taken for the comparison
	 * @name data․onmax
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
	 * @example
	 *  onmax: function(data) {
	 *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
	 *    ...
	 *  }
	 */
	data_onmax: <Function|undefined> undefined,

	/**
	 * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
	 * @name data․url
	 * @memberof Options
	 * @type {string}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.LoadData)
	 * @example
	 * data: {
	 *     url: "/data/test.csv"
	 * }
	 */
	data_url: <string|undefined> undefined,

	/**
	 * XHR header value
	 * - **NOTE:** Should be used with `data.url` option
	 * @name data․headers
	 * @memberof Options
	 * @type {string}
	 * @default undefined
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
	 * @example
	 * data: {
	 *     url: "/data/test.csv",
	 *     headers: {
	 *        "Content-Type": "text/xml",
	 *        ...
	 *     }
	 * }
	 */
	data_headers: <object|undefined> undefined,

	/**
	 * Parse a JSON object for data. See also data.keys.
	 * @name data․json
	 * @memberof Options
	 * @type {Array}
	 * @default undefined
	 * @see [data․keys](#.data%25E2%2580%25A4keys)
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.JSONData)
	 * @example
	 * data: {
	 *     json: [
	 *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
	 *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
	 *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
	 *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
	 *     ],
	 *     keys: {
	 *       // x: "name", // it's possible to specify 'x' when category axis
	 *       value: ["upload", "download"]
	 *     }
	 * }
	 */
	data_json: <object[]|undefined> undefined,

	/**
	 * Load data from a multidimensional array, with the first element containing the data names, the following containing related data in that order.
	 * @name data․rows
	 * @memberof Options
	 * @type {Array}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.RowOrientedData)
	 * @example
	 * data: {
	 *   rows: [
	 *     ["A", "B", "C"],
	 *     [90, 120, 300],
	 *     [40, 160, 240],
	 *     [50, 200, 290],
	 *     [120, 160, 230],
	 *     [80, 130, 300],
	 *     [90, 220, 320]
	 *   ]
	 * }
	 *
	 * // for 'bar' type, data can contain:
	 * // - an array of [start, end] data following the order
	 * data: {
	 *   rows: [
	 *      ["data1", "data2"],
	 *      [[100, 150], 120],
	 *      [[200, 300], 55],
	 *      [[-400, 500], 60]
	 *   ],
	 *   type: "bar"
	 * }
	 *
	 * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
	 * // - an array of [high, mid, low] data following the order
	 * // - or an object with 'high', 'mid' and 'low' key value
	 * data: {
	 *   rows: [
	 *      ["data1", "data2"],
	 *      [
	 *        // or {high:150, mid: 140, low: 110}, 120
	 *        [150, 140, 110], 120
	 *      ],
	 *      [[155, 130, 115], 55],
	 *      [[160, 135, 120], 60]
	 *   ],
	 *   types: {
	 *       data1: "area-line-range",
	 *       data2: "line"
	 *   }
	 * }
	 *
	 * // for 'bubble' type, data can contain dimension value:
	 * // - an array of [y, z] data following the order
	 * // - or an object with 'y' and 'z' key value
	 * // 'y' is for y axis coordination and 'z' is the bubble radius value
	 * data: {
	 *   rows: [
	 *      ["data1", "data2"],
	 *      [
	 *        // or {y:10, z: 140}, 120
	 *        [10, 140], 120
	 *      ],
	 *      [[100, 30], 55],
	 *      [[50, 100], 60]
	 *   ],
	 *   types: {
	 *       data1: "bubble",
	 *       data2: "line"
	 *   }
	 * }
	 *
	 * // for 'canlestick' type, data should contain:
	 * // - an array of [open, high, low, close, volume(optional)] data following the order
	 * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
	 * data: {
	 *   rows: [
	 *      ["data1", "data2"],
	 *		[
	 *			// open, high, low, close, volume (optional)
	 *			{open: 1300, high: 1369, low: 1200, close: 1339, volume: 100},
	 *			[1000, 1100, 850, 870]
	 *		],
	 *		[
	 *			{open: 1348, high: 1371, low: 1271, close: 1320},
	 *			[870, 1250, 830, 1200, 50]
	 *		]
	 *   ],
	 *   type: "candlestick"
	 * }
	 */
	data_rows: <(string|number)[][]|undefined> undefined,

	/**
	 * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
	 * @name data․columns
	 * @memberof Options
	 * @type {Array}
	 * @default undefined
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.ColumnOrientedData)
	 * @example
	 * data: {
	 *   columns: [
	 *      ["data1", 30, 20, 50, 40, 60, 50],
	 *      ["data2", 200, 130, 90, 240, 130, 220],
	 *      ["data3", 300, 200, 160, 400, 250, 250]
	 *   ]
	 * }
	 *
	 * // for 'bar' type, data can contain:
	 * // - an array of [start, end] data following the order
	 * data: {
	 *   columns: [
	 *     ["data1", -100, 50, [100, 200], [200, 300]],
	 *     ["data2", -200, 300, [-100, 100], [-50, -30]],
	 *   ],
	 *   type: "bar"
	 * }
	 *
	 * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
	 * // - an array of [high, mid, low] data following the order
	 * // - or an object with 'high', 'mid' and 'low' key value
	 * data: {
	 *   columns: [
	 *      ["data1",
	 *          [150, 140, 110],  // or {high:150, mid: 140, low: 110}
	 *          [150, 140, 110],
	 *          [150, 140, 110]
	 *      ]
	 *   ],
	 *   type: "area-line-range"
	 * }
	 *
	 * // for 'bubble' type, data can contain dimension value:
	 * // - an array of [y, z] data following the order
	 * // - or an object with 'y' and 'z' key value
	 * // 'y' is for y axis coordination and 'z' is the bubble radius value
	 * data: {
	 *   columns: [
	 *      ["data1",
	 *          [10, 140],  // or {y:10, z: 140}
	 *          [100, 30],
	 *          [50, 100]
	 *      ]
	 *   ],
	 *   type: "bubble"
	 * }
	 *
	 * // for 'canlestick' type, data should contain:
	 * // - an array of [open, high, low, close, volume(optional)] data following the order
	 * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
	 * data: {
	 *   columns: [
	 *      ["data1",
	 *          [1000, 1100, 850, 870, 100],  // or {open:1000, high: 1100, low: 870, volume: 100}
	 *          [870, 1250, 830, 1200]  // 'volume' can be omitted
	 *      ]
	 *   ],
	 *   type: "candlestick"
	 * }
	 */
	data_columns: <(string|number)[][]|undefined> undefined,

	/**
	 * Used if loading JSON via data.url.
	 * - **Available Values:**
	 *   - json
	 *   - csv
	 *   - tsv
	 * @name data․mimeType
	 * @memberof Options
	 * @type {string}
	 * @default csv
	 * @example
	 * data: {
	 *     mimeType: "json"
	 * }
	 */
	data_mimeType: <"csv"|"json"|"tsv"> "csv",

	/**
	 * Choose which JSON object keys correspond to desired data.
	 * - **NOTE:** Only for JSON object given as array.
	 * @name data․keys
	 * @memberof Options
	 * @type {string}
	 * @default undefined
	 * @example
	 * data: {
	 *     json: [
	 *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
	 *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
	 *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
	 *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
	 *     ],
	 *     keys: {
	 *       // x: "name", // it's possible to specify 'x' when category axis
	 *       value: ["upload", "download"]
	 *     }
	 * }
	 */
	data_keys: <{x?: string; value?: string[]}|undefined> undefined,

	/**
	 * Set text label to be displayed when there's no data to show.
	 * - ex. Toggling all visible data to not be shown, unloading all current data, etc.
	 * @name data․empty․label․text
	 * @memberof Options
	 * @type {string}
	 * @default ""
	 * @example
	 * data: {
	 *   empty: {
	 *     label: {
	 *       text: "No Data"
	 *     }
	 *   }
	 * }
	 */
	data_empty_label_text: ""
};
