/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import dataSelection from "./selection";
import {mergeObj} from "../../../module/util";

/**
 * data config options
 */
export default mergeObj({
    /**
     * Specify the key of x values in the data.<br><br>
     * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data on the key will be used for category names.
     * @name data․x
     * @memberof Options
     * @type {String}
     * @default undefined
     * @example
     * data: {
     *   x: "date"
     * }
     */
    data_x: undefined,

    /**
     * Specify the keys of the x values for each data.<br><br>
     * This option can be used if we want to show the data that has different x values.
     * @name data․xs
     * @memberof Options
     * @type {Object}
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
     * @type {String}
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
     * @type {Boolean}
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
     * @type {Boolean}
     * @default true
     * @example
     * data: {
     *   xSort: false
     * }
     */
    data_xSort: true,

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
     * @name data․names
     * @memberof Options
     * @type {Object}
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
    data_names: {},

    /**
     * Set custom data class.<br><br>
     * If this option is specified, the element g for the data has an additional class that has the prefix 'bb-target-' (eg. bb-target-additional-data1-class).
     * @name data․classes
     * @memberof Options
     * @type {Object}
     * @default {}
     * @example
     * data: {
     *   classes: {
     *     data1: "additional-data1-class",
     *     data2: "additional-data2-class"
     *   }
     * }
     */
    data_classes: {},

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
    data_groups: [],

    /**
     * Set y axis the data related to. y and y2 can be used.
     * @name data․axes
     * @memberof Options
     * @type {Object}
     * @default {}
     * @example
     * data: {
     *   axes: {
     *     data1: "y",
     *     data2: "y2"
     *   }
     * }
     */
    data_axes: {},

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
     * - donut
     * - gauge
     * - line
     * - pie
     * - radar
     * - scatter
     * - spline
     * - step
     * @name data․type
     * @memberof Options
     * @type {String}
     * @default line
     * @example
     * data: {
     *    type: "bar"
     * }
     */
    data_type: undefined,

    /**
     * Set chart type for each data.<br>
     * This setting overwrites data.type setting.
     * - **NOTE:** `radar` type can't be combined with other types.
     * @name data․types
     * @memberof Options
     * @type {Object}
     * @default {}
     * @example
     * data: {
     *   types: {
     *     data1: "bar",
     *     data2: "spline"
     *   }
     * }
     */
    data_types: {},

    /**
     * Set labels options
     * @name data․labels
     * @memberof Options
     * @type {Object}
     * @property {Boolean} [data.labels=false] Show or hide labels on each data points
     * @property {Boolean} [data.labels.centered=false] Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
     * @property {Function} [data.labels.format] Set formatter function for data labels.<br>
     * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:<br>
     *  - `v` is the value of the data point where the label is shown.
     *  - `id` is the id of the data where the label is shown.
     *  - `i` is the index of the data point where the label is shown.
     *  - `j` is the sub index of the data point where the label is shown.<br><br>
     * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
     * @property {String|Object} [data.labels.colors] Set label text colors.
     * @property {Object} [data.labels.position] Set each dataset position, relative the original.
     * @property {Number} [data.labels.position.x=0] x coordinate position, relative the original.
     * @property {Number} [data.labels.position.y=0] y coordinate position, relative the original.
     * @memberof Options
     * @type {Object}
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
    data_labels: {},
    data_labels_colors: undefined,
    data_labels_position: {},

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
     * @name data․order
     * @memberof Options
     * @type {String|Function|null}
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
     *       {
     *          id: "data1", id_org: "data1", values: [
     *              {x: 5, value: 250, id: "data1", index: 5, name: "data1"},
     *              ...
     *          ]
     *       }
     *   }
     * }
     */
    data_order: "desc",

    /**
     * Define regions for each data.<br>
     * The values must be an array for each data and it should include an object that has `start`, `end` and `style`.
     * - The object type should be as:
     *   - start {Number}: Start data point number. If not set, the start will be the first data point.
     *   - [end] {Number}: End data point number. If not set, the end will be the last data point.
     *   - [style.dasharray="2 2"] {Object}: The first number specifies a distance for the filled area, and the second a distance for the unfilled area.
     * - **NOTE:** Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
     * @name data․regions
     * @memberof Options
     * @type {Object}
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
    data_regions: {},

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
    data_color: undefined,

    /**
     * Set color for each data.
     * @name data․colors
     * @memberof Options
     * @type {Object}
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
    data_colors: {},

    /**
     * Hide each data when the chart appears.<br><br>
     * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
     * @name data․hide
     * @memberof Options
     * @type {Boolean|Array}
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
    data_hide: false,

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
    data_filter: undefined,

    /**
     * Set the stacking to be normalized
     * - **NOTE:**
     *   - For stacking, '[data.groups](#.data%25E2%2580%25A4groups)' option should be set
     *   - y Axis will be set in percentage value (0 ~ 100%)
     *   - Must have postive values
     * @name data․stack․normalize
     * @memberof Options
     * @type {Boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataStackNormalized)
     * @example
     * data: {
     *   stack: {
     *      normalize: true
     *   }
     * }
     */
    data_stack_normalize: false,

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
     * Set a callback for on data selection.
     * @name data․onselected
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onselected: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
     *        // element - <circle>
     *        ...
     *    }
     * }
     */
    data_onselected: () => {},

    /**
     * Set a callback for on data un-selection.
     * @name data․onunselected
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onunselected: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
     *        // element - <circle>
     *        ...
     *    }
     * }
     */
    data_onunselected: () => {},

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
    data_onmin: undefined,

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
    data_onmax: undefined,

    /**
     * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
     * @name data․url
     * @memberof Options
     * @type {String}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.LoadData)
     * @example
     * data: {
     *     url: "/data/test.csv"
     * }
     */
    data_url: undefined,

    /**
     * XHR header value
     * - **NOTE:** Should be used with `data.url` option
     * @name data․headers
     * @memberof Options
     * @type {String}
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
    data_headers: undefined,

    /**
     * Parse a JSON object for data. See also data.keys.
     * @name data․json
     * @memberof Options
     * @type {Object}
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
    data_json: undefined,

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
     */
    data_rows: undefined,

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
     */
    data_columns: undefined,

    /**
     * Used if loading JSON via data.url.
     * - **Available Values:**
     *   - json
     *   - csv
     *   - tsv
     * @name data․mimeType
     * @memberof Options
     * @type {String}
     * @default csv
     * @example
     * data: {
     *     mimeType: "json"
     * }
     */
    data_mimeType: "csv",

    /**
     * Choose which JSON object keys correspond to desired data.
     * - **NOTE:** Only for JSON object given as array.
     * @name data․keys
     * @memberof Options
     * @type {String}
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
    data_keys: undefined,

    /**
     * Set text label to be displayed when there's no data to show.
     * - ex. Toggling all visible data to not be shown, unloading all current data, etc.
     * @name data․empty․label․text
     * @memberof Options
     * @type {String}
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
}, dataSelection);
