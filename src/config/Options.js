/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.<br>
			 * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
			 * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
			 * @name bindto
			 * @memberof Options
			 * @property {String|HTMLElement|d3.selection} bindto=#chart Specify the element where chart will be drawn.
			 * @property {String|HTMLElement|d3.selection} bindto.element=#chart Specify the element where chart will be drawn.
			 * @property {String} [bindto.classname=bb] Specify the class name of bind element.<br>
			 *     **NOTE:** When class name isn't `bb`, then you also need to update the default CSS to be rendered correctly.
			 * @default #chart
			 * @example
			 * bindto: "#myContainer"
			 *
			 * // or HTMLElement
			 * bindto: document.getElementById("myContainer")
			 *
			 * // or D3 selection object
			 * bindto: d3.select("#myContainer")
			 *
			 * // or to change default classname
			 * bindto: {
			 *    element: "#chart",
			 *    classname: "bill-board"  // ex) <div id='chart' class='bill-board'>
			 * }
			 */
			bindto: "#chart",

			/**
			 * Set 'clip-path' attribute for chart element
			 * - **NOTE:**
			 *  > When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
			 *  > Is to make chart element positioned over axis element.
			 * @name clipPath
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.clipPath)
			 * @example
			 * // don't set 'clip-path' attribute
			 * clipPath: false
			 */
			clipPath: true,

			/**
			 * Set svg element's class name
			 * @name svg
			 * @memberof Options
			 * @type {Object}
			 * @property {String} [svg.classname] class name for svg element
			 * @example
			 * svg: {
             *   classname: "test_class"
			 * }
			 */
			svg_classname: undefined,

			/**
			 * The desired size of the chart element.
			 * If value is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
			 * @name size
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [size.width] width of the chart element
			 * @property {Number} [size.height] height of the chart element
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.ChartSize)
			 * @example
			 * size: {
             *   width: 640,
             *   height: 480
			 * }
			 */
			size_width: undefined,
			size_height: undefined,

			/**
			 * The padding of the chart element.
			 * @name padding
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [padding.top] padding on the top of chart
			 * @property {Number} [padding.right] padding on the right of chart
			 * @property {Number} [padding.bottom] padding on the bottom of chart
			 * @property {Number} [padding.left] padding on the left of chart
			 * @example
			 * padding: {
             *   top: 20,
             *   right: 20,
             *   bottom: 20,
             *   left: 20
			 * }
			 */
			padding_left: undefined,
			padding_right: undefined,
			padding_top: undefined,
			padding_bottom: undefined,

			/**
			 * Set chart resize options
			 * @name resize
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
			 * @example
			 *  resize: {
			 *      auto: false
			 *  }
			 */
			resize_auto: true,

			/**
			 * Set zoom options
			 * @name zoom
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [zoom.enabled=false] Enable zooming.
			 * @property {String} [zoom.enabled.type='wheel'] Set zoom interaction type.
			 *  - **Available types:**
			 *    - wheel
			 *    - drag
			 * @property {Boolean} [zoom.rescale=false] Enable to rescale after zooming.<br>
			 *  If true set, y domain will be updated according to the zoomed region.
			 * @property {Array} [zoom.extent=[1, 10]] Change zoom extent.
			 * @property {Number|Date} [zoom.x.min] Set x Axis minimum zoom range
			 * @property {Number|Date} [zoom.x.max] Set x Axis maximum zoom range
			 * @property {Function} [zoom.onzoomstart=undefined] Set callback that is called when zooming starts.<br>
			 *  Specified function receives the zoom event.
			 * @property {Function} [zoom.onzoom=undefined] Set callback that is called when the chart is zooming.<br>
			 *  Specified function receives the zoomed domain.
			 * @property {Function} [zoom.onzoomend=undefined] Set callback that is called when zooming ends.<br>
			 *  Specified function receives the zoomed domain.
			 * @property {Boolean|Object} [zoom.resetButton=true] Set to display zoom reset button for 'drag' type zoom
			 * @property {String} [zoom.resetButton.text='Reset Zoom'] Text value for zoom reset button.
			 * @see [Demo:zoom](https://naver.github.io/billboard.js/demo/#Interaction.Zoom)
			 * @see [Demo:drag zoom](https://naver.github.io/billboard.js/demo/#Interaction.DragZoom)
			 * @example
			 *  zoom: {
			 *      enabled: {
             *          type: "drag"
             *      },
			 *      rescale: true,
			 *      extent: [1, 100]  // enable more zooming
			 *      x: {
			 *          min: -1,  // set min range
			 *          max: 10  // set max range
			 *      },
			 *      onzoomstart: function(event) { ... },
			 *      onzoom: function(domain) { ... },
			 *      onzoomend: function(domain) { ... },
			 *
			 *      // show reset button when is zoomed-in
			 *      resetButton: true,
			 *
			 *      // customized text value for reset zoom button
			 *      resetButton: {
			 *          text: "Unzoom"
			 *      }
			 *  }
			 */
			zoom_enabled: undefined,
			zoom_extent: undefined,
			zoom_privileged: false,
			zoom_rescale: false,
			zoom_onzoom: undefined,
			zoom_onzoomstart: undefined,
			zoom_onzoomend: undefined,
			zoom_resetButton: true,
			zoom_x_min: undefined,
			zoom_x_max: undefined,

			/**
			 * Interaction options
			 * @name interaction
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [interaction.enabled=true] Indicate if the chart should have interactions.<br>
			 *     If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
			 * @property {Boolean} [interaction.brighten=true] Make brighter for the selected area (ex. 'pie' type data selected area)
			 * @property {Boolean} [interaction.inputType.mouse=true] enable or disable mouse interaction
			 * @property {Boolean} [interaction.inputType.touch=true] enable or disable  touch interaction
			 * @property {Boolean|Number} [interaction.inputType.touch.preventDefault=false] enable or disable to call event.preventDefault on touchstart & touchmove event. It's usually used to prevent document scrolling.
			 * @see [Demo: touch.preventDefault](https://naver.github.io/billboard.js/demo/#Interaction.PreventScrollOnTouch)
			 * @example
			 * interaction: {
             *    enabled: false,
             *    brighten: false,
             *    inputType: {
             *        mouse: true,
             *        touch: false
             *
             *        // or declare preventDefault explicitly.
             *        // In this case touch inputType is enabled by default
             *        touch: {
             *            preventDefault: true
             *
             *            // or threshold pixel value (pixel moved from touchstart to touchmove)
             *            preventDefault: 5
             *        }
             *    }
			 * }
			 */
			interaction_enabled: true,
			interaction_brighten: true,
			interaction_inputType_mouse: true,
			interaction_inputType_touch: {},

			/**
			 * Set a callback to execute when mouse/touch enters the chart.
			 * @name onover
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onover: function() {
			 *   ...
			 * }
			 */
			onover: () => {},

			/**
			 * Set a callback to execute when mouse/touch leaves the chart.
			 * @name onout
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onout: function() {
			 *   ...
			 * }
			 */
			onout: () => {},

			/**
			 * Set a callback to execute when user resizes the screen.
			 * @name onresize
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onresize: function() {
			 *   ...
			 * }
			 */
			onresize: () => {},

			/**
			 * SSet a callback to execute when screen resize finished.
			 * @name onresized
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onresized: function() {
			 *   ...
			 * }
			 */
			onresized: () => {},

			/**
			 * Set a callback to execute before the chart is initialized
			 * @name onbeforeinit
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onbeforeinit: function() {
			 *   ...
			 * }
			 */
			onbeforeinit: undefined,

			/**
			 * Set a callback to execute when the chart is initialized.
			 * @name oninit
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * oninit: function() {
			 *   ...
			 * }
			 */
			oninit: () => {},

			/**
			 * Set a callback to execute after the chart is initialized
			 * @name onafterinit
			 * @memberof Options
			 * @type {Function}
			 * @default function(){}
			 * @example
			 * onafterinit: function() {
			 *   ...
			 * }
			 */
			onafterinit: undefined,

			/**
			 * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
			 * @name onrendered
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * onrendered: function() {
			 *   ...
			 * }
			 */
			onrendered: undefined,

			/**
			 * Set duration of transition (in milliseconds) for chart animation.<br><br>
			 * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
			 * @name transition
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [transition.duration=350] duration in milliseconds
			 * @example
			 * transition: {
			 *    duration: 500
			 * }
			 */
			transition_duration: 350,

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
			 * Set a format to parse string specifed as x.
			 * @name data․xFormat
			 * @memberof Options
			 * @type {String}
			 * @default %Y-%m-%d
			 * @example
			 * data: {
             *   xFormat: "%Y-%m-%d %H:%M:%S"
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
			 * @property {Function} [data.labels.format={}] Set formatter function for data labels.<br>
			 * The formatter function receives 4 arguments such as v, id, i, j and it must return a string that will be shown as the label. The arguments are:<br>
			 *  - `v` is the value of the data point where the label is shown.
			 *  - `id` is the id of the data where the label is shown.
			 *  - `i` is the index of the data point where the label is shown.
			 *  - `j` is the sub index of the data point where the label is shown.<br><br>
			 * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
			 * @property {Number} [data.labels.position.x=0] x coordinate position, relative the original.
			 * @property {NUmber} [data.labels.position.y=0] y coordinate position, relative the original.
			 * @memberof Options
			 * @type {Object}
			 * @default {}
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
			 * @see [Demo: labels format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
			 * @see [Demo: labels position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
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
			 *     position: {
			 *        x: -10,
			 *        y: 10
			 *     }
			 *   }
			 * }
			 */
			data_labels: {},
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
			 * Set data selection enabled<br><br>
			 * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
			 * @name data․selection․enabled
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataSelection)
			 * @example
			 * data: {
			 *    selection: {
			 *       enabled: true
			 *    }
			 * }
			 */
			data_selection_enabled: false,

			/**
			 * Set grouped selection enabled.<br><br>
			 * If this option set true, multiple data points that have same x value will be selected by one selection.
			 * @name data․selection․grouped
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * data: {
			 *    selection: {
			 *       grouped: true
			 *    }
			 * }
			 */
			data_selection_grouped: false,

			/**
			 * Set a callback for each data point to determine if it's selectable or not.<br><br>
			 * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
			 * @name data․selection․isselectable
			 * @memberof Options
			 * @type {Function}
			 * @default function() { return true; }
			 * @example
			 * data: {
			 *    selection: {
			 *       isselectable: function(d) { ... }
			 *    }
			 * }
			 */
			data_selection_isselectable: () => true,

			/**
			 * Set multiple data points selection enabled.<br><br>
			 * If this option set true, multile data points can have the selected state at the same time. If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
			 * @name data․selection․multiple
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * data: {
			 *    selection: {
			 *       multiple: false
			 *    }
			 * }
			 */
			data_selection_multiple: true,

			/**
			 * Enable to select data points by dragging.
			 * If this option set true, data points can be selected by dragging.
			 * - **NOTE:** If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
			 * @name data․selection․draggable
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * data: {
			 *    selection: {
			 *       draggable: true
			 *   }
			 * }
			 */
			data_selection_draggable: false,

			/**
			 * Set a callback for click event on each data point.<br><br>
			 * This callback will be called when each data point clicked and will receive d and element as the arguments. d is the data clicked and element is the element clicked. In this callback, this will be the Chart object.
			 * @name data․onclick
			 * @memberof Options
			 * @type {Function}
			 * @default function() {}
			 * @example
			 * data: {
			 *     onclick: function(d, element) { ... }
			 * }
			 */
			data_onclick: () => {},

			/**
			 * Set a callback for mouse/touch over event on each data point.<br><br>
			 * This callback will be called when mouse cursor or via touch moves onto each data point and will receive d as the argument. d is the data where mouse cursor moves onto. In this callback, this will be the Chart object.
			 * @name data․onover
			 * @memberof Options
			 * @type {Function}
			 * @default function() {}
			 * @example
			 * data: {
			 *     onover: function(d) { ... }
			 * }
			 */
			data_onover: () => {},

			/**
			 * Set a callback for mouse/touch out event on each data point.<br><br>
			 * This callback will be called when mouse cursor or via touch moves out each data point and will receive d as the argument. d is the data where mouse cursor moves out. In this callback, this will be the Chart object.
			 * @name data․onout
			 * @memberof Options
			 * @type {Function}
			 * @default function() {}
			 * @example
			 * data: {
			 *     onout: function(d) { ... }
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
			 */
			data_columns: undefined,

			/**
			 * Used if loading JSON via data.url.
			 * @name data․mimeType
			 * @memberof Options
			 * @type {String}
			 * @default undefined
			 * @example
			 * data: {
			 *     mimeType: "json"
			 * }
			 */
			data_mimeType: undefined,

			/**
			 * Choose which JSON object keys correspond to desired data.
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
			 * Set text displayed when empty data.
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
			data_empty_label_text: "",

			/**
			 * Set subchart options
			 * @name subchart
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
			 * @property {Boolean} [subchart.axis.x.show=true] Show or hide x axis.
			 * @property {Boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
			 * @property {Boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
			 * @property {Number} [subchart.size.height] Change the height of the subchart.
			 * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
			 *  Specified function receives the current zoomed x domain.
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
			 * @example
			 *  subchart: {
			 * 		axis: {
			 * 			x: {
			 * 				show: true,
			 * 				tick: {
			 * 					show: true,
			 * 					text: {
			 * 						show: false
			 * 					}
			 * 				}
			 * 			}
			 * 		},
			 *      show: true,
			 *      size: {
			 *          height: 20
			 *      },
			 *      onbrush: function(domain) { ... }
			 *  }
			 */
			subchart_show: false,
			subchart_size_height: 60,
			subchart_axis_x_show: true,
			subchart_axis_x_tick_show: true,
			subchart_axis_x_tick_text_show: true,
			subchart_onbrush: () => {},

			/**
			 * Set color of the data values
			 * @name color
			 * @memberof Options
			 * @type {Object}
			 * @property {String|Object|Function} [color.onover] Set the color value for each data point when mouse/touch onover event occurs.
			 * @property {Array} [color.pattern] custom color pattern
			 * @property {Function} [color.tiles] if defined, allows use svg's patterns to fill data area. It should return an array of [SVGPatternElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement).
			 *  - **NOTE:** The pattern element's id will be defined as `bb-colorize-pattern-$COLOR-VALUE`.<br>
			 *    ex. When color pattern value is `['red', '#fff']` and defined 2 patterns,then ids for pattern elements are:<br>
			 *    - `bb-colorize-pattern-red`
			 *    - `bb-colorize-pattern-fff`
			 * @property {Object} [color.threshold] color threshold for gauge and tooltip color
			 * @property {String} [color.threshold.unit] If set to `value`, the threshold will be based on the data value. Otherwise it'll be based on equation of the `threshold.max` option value.
			 * @property {Array} [color.threshold.values] Threshold values for each steps
			 * @property {Array} [color.threshold.max=100] The base value to determine threshold step value condition. When the given value is 15 and max 10, then the value for threshold is `15*100/10`.
			 * @example
			 *  color: {
			 *      pattern: ["#1f77b4", "#aec7e8", ...],
			 *
			 *      // Set colors' patterns
			 *      // it should return an array of SVGPatternElement
			 *      tiles: function() {
			 *         var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
			 *         var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			 *         var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			 *
			 *         pattern.setAttribute("patternUnits", "userSpaceOnUse");
			 *         pattern.setAttribute("width", "32");
			 *         pattern.setAttribute("height", "32");
			 *
			 *         g.style.fill = "#000";
			 *         g.style.opacity = "0.2";
             *
			 *         circle1.setAttribute("cx", "3");
			 *         circle1.setAttribute("cy", "3");
			 *         circle1.setAttribute("r", "3");
             *
			 *         g.appendChild(circle1);
			 *         pattern.appendChild(g);
			 *
			 *         return [pattern];
			 *      },
			 *
			 *      // for threshold usage, pattern values should be set for each steps
			 *      pattern: ["grey", "green", "yellow", "orange", "red"],
			 *      threshold: {
			 *          unit: "value",
			 *          values: [10, 20, 30, 40, 50],  // when the value is 20, 'green' will be set and the value is 40, 'orange' will be set.
			 *          max: 30  // the equation for max is: value*100/30
			 *      },
			 *
			 *      // set all data to 'red'
			 *      onover: "red",
			 *
			 *      // set different color for data
			 *      onover: {
			 *          data1: "red",
			 *          data2: "yellow"
			 *      },
			 *
			 *      // will pass data object to the callback
			 *      onover: function(d) {
			 *          return d.id === "data1" ? "red" : "green";
			 *      }
			 *  }
			 */
			color_pattern: [],
			color_tiles: undefined,
			color_threshold: {},
			color_onover: undefined,

			/**
			 * Legend options
			 * @name legend
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [legend.show=true] Show or hide legend.
			 * @property {Boolean} [legend.hide=false] Hide legend
			 *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
			 * @property {String|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
			 * @property {String|Function} [legend.contents.template=undefined] Set item's template.<br>
			 *  - If set `string` value, within template the 'color' and 'title' can be replaced using template-like syntax string:
			 *    - {=COLOR}: data color value
			 *    - {=TITLE}: data title value
			 *  - If set `function` value, will pass following arguments to the given function:
			 *   - title {String}: data's id value
			 *   - color {String}: color string
			 *   - data {Array}: data array
			 * @property {String} [legend.position=bottom] Change the position of legend.<br>
			 *  Available values are: `bottom`, `right` and `inset` are supported.
			 * @property {Object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
			 *  This option accepts object that has the keys `anchor`, `x`, `y` and `step`.
			 *  - **anchor** decides the position of the legend:
			 *   - top-left
			 *   - top-right
			 *   - bottom-left
			 *   - bottom-right
			 *  - **x** and **y**:
			 *   - set the position of the legend based on the anchor.
			 *  - **step**:
			 *   - defines the max step the legend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
			 * @property {Boolean} [legend.equally=false] Set to all items have same width size.
			 * @property {Boolean} [legend.padding=0] Set padding value
			 * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
			 * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
			 * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
			 * @property {Number} [legend.item.tile.width=10] Set width of item tile element
			 * @property {Number} [legend.item.tile.height=10] Set height of item tile element
			 * @property {Boolean} [legend.usePoint=false] Whether to use custom points in legend.
			 * @see [Demo: position](https://naver.github.io/billboard.js/demo/#Legend.LegendPosition)
			 * @see [Demo: contents.template](https://naver.github.io/billboard.js/demo/#Legend.LegendTemplate1)
			 * @see [Demo: usePoint](https://naver.github.io/billboard.js/demo/#Legend.usePoint)
			 * @example
			 *  legend: {
			 *      show: true,
			 *      hide: true,
			 *      //or hide: "data1"
             *      //or hide: ["data1", "data2"]
			 *      contents: {
			 *          bindto: "#legend",   // <ul id='legend'></ul>
			 *
			 *          // will be as: <li style='background-color:#1f77b4'>data1</li>
			 *          template: "<li style='background-color:{=COLOR}'>{=TITLE}</li>"
			 *
			 *          // or using function
			 *          template: function(id, color, data) {
			 *               // if you want omit some legend, return falsy value
			 *               if (title !== "data1") {
			 *                    return "<li style='background-color:"+ color +">"+ title +"</li>";
			 *               }
			 *          }
			 *      },
             *      position: "bottom",  // bottom, right, inset
			 *      inset: {
			 *          anchor: "top-right"  // top-left, top-right, bottom-left, bottom-right
			 *          x: 20,
			 *          y: 10,
			 *          step: 2
			 *      },
             *      equally: false,
             *      padding: 10,
             *      item: {
			 *          onclick: function(id) { ... },
			 *          onover: function(id) { ... },
			 *          onout: function(id) { ... },
			 *
			 *          // set tile's size
			 *          tile: {
			 *              width: 20,
			 *              height: 15
			 *          }
			 *      },
			 *      usePoint: true
			 *  }
			 */
			legend_show: true,
			legend_hide: false,
			legend_contents_bindto: undefined,
			legend_contents_template: undefined,
			legend_position: "bottom",
			legend_inset_anchor: "top-left",
			legend_inset_x: 10,
			legend_inset_y: 0,
			legend_inset_step: undefined,
			legend_item_onclick: undefined,
			legend_item_onover: undefined,
			legend_item_onout: undefined,
			legend_equally: false,
			legend_padding: 0,
			legend_item_tile_width: 10,
			legend_item_tile_height: 10,
			legend_usePoint: false,

			/**
			 * Switch x and y axis position.
			 * @name axis․rotated
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   rotated: true
			 * }
			 */
			axis_rotated: false,

			/**
			 * Set clip-path attribute for x axis element
			 * @name axis․x․clipPath
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo]()
			 * @example
			 * // don't set 'clip-path' attribute
			 * clipPath: false
			 */
			axis_x_clipPath: true,

			/**
			 * Show or hide x axis.
			 * @name axis․x․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   x: {
			 *     show: false
			 *   }
			 * }
			 */
			axis_x_show: true,

			/**
			 * Set type of x axis.<br><br>
			 * **Available Values:**
			 * - timeseries
			 * - category
			 * - indexed
			 * @name axis․x․type
			 * @memberof Options
			 * @type {String}
			 * @default indexed
			 * @see [Demo: indexed](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
			 * @see [Demo: timeseries](https://naver.github.io/billboard.js/demo/#Chart.TimeseriesChart)
			 * @see [Demo: category](https://naver.github.io/billboard.js/demo/#Data.CategoryData)
			 * @example
			 * axis: {
			 *   x: {
			 *     type: "timeseries"
			 *   }
			 * }
			 */
			axis_x_type: "indexed",

			/**
			 * Set how to treat the timezone of x values.<br>
			 * If true, treat x value as localtime. If false, convert to UTC internally.
			 * @name axis․x․localtime
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   x: {
			 *     localtime: false
			 *   }
			 * }
			 */
			axis_x_localtime: true,

			/**
			 * Set category names on category axis.
			 * This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
			 * @name axis․x․categories
			 * @memberof Options
			 * @type {Array}
			 * @default []
			 * @example
			 * axis: {
			 *   x: {
			 *     categories: ["Category 1", "Category 2", ...]
			 *   }
			 * }
			 */
			axis_x_categories: [],

			/**
			 * Centerise ticks on category axis.
			 * @name axis․x․tick․centered
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       centered: true
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_centered: false,

			/**
			 * A function to format tick value. Format string is also available for timeseries data.
			 * @name axis․x․tick․format
			 * @memberof Options
			 * @type {Function|String}
			 * @default undefined
			 * @see [D3's time specifier](https://github.com/d3/d3-time-format#locale_format)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *        // for timeseries, a 'datetime' object is given as parameter
			 *       format: function(x) {
			 *           return x.getFullYear();
			 *       }
			 *
			 *       // for category, index(Number) and categoryName(String) are given as parameter
			 *       format: function(index, categoryName) {
			 *           return categoryName.substr(0, 10);
			 *       },
			 *
			 *        // for timeseries format specifier
			 *        format: "%Y-%m-%d %H:%M:%S"
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_format: undefined,

			/**
			 * Setting for culling ticks.<br><br>
			 * If true is set, the ticks will be culled, then only limitted tick text will be shown. This option does not hide the tick lines. If false is set, all of ticks will be shown.<br><br>
			 * We can change the number of ticks to be shown by axis.x.tick.culling.max.
			 * @name axis․x․tick․culling
			 * @memberof Options
			 * @type {Boolean}
			 * @default
			 * - true for indexed axis and timeseries axis
			 * - false for category axis
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       culling: false
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_culling: {},

			/**
			 * The number of tick texts will be adjusted to less than this value.
			 * @name axis․x․tick․culling․max
			 * @memberof Options
			 * @type {Number}
			 * @default 10
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       culling: {
			 *           max: 5
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_culling_max: 10,

			/**
			 * The number of x axis ticks to show.<br><br>
			 * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will have rough second value).
			 * @name axis․x․tick․count
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       count: 5
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_count: undefined,

			/**
			 * Show or hide x axis tick line.
			 * @name axis․x․tick․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       show: false
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_show: true,

			/**
			 * Show or hide x axis tick text.
			 * @name axis․x․tick․text․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       text: {
			 *           show: false
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_text_show: true,

			/**
			 * Set the x Axis tick text's position relatively its original position
			 * @name axis․x․tick․text․position
			 * @memberof Options
			 * @type {Object}
			 * @default {x: 0, y:0}
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       text: {
			 *         position: {
			 *           x: 10,
			 *           y: 10
			 *         }
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_text_position: {x: 0, y: 0},

			/**
			 * Fit x axis ticks.
			 * - **true**: ticks will be positioned nicely to have same intervals.
			 * - **false**: ticks will be positioned according to x value of the data points.
			 * @name axis․x․tick․fit
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickFitting)
			 * @see [Demo: for timeseries zoom](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickTimeseries)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       fit: false
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_fit: true,

			/**
			 * Set the x values of ticks manually.<br><br>
			 * If this option is provided, the position of the ticks will be determined based on those values. This option works with timeseries data and the x values will be parsed accoding to the type of the value and data.xFormat option.
			 * @name axis․x․tick․values
			 * @memberof Options
			 * @type {Array}
			 * @default null
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       values: [1, 2, 4, 8, 16, 32, ...]
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_values: null,

			/**
			 * Rotate x axis tick text.<br>
			 * If you set negative value, it will rotate to opposite direction.
			 * @name axis․x․tick․rotate
			 * @memberof Options
			 * @type {Number}
			 * @default 0
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.RotateXAxisTickText)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       rotate: 60
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_rotate: 0,

			/**
			 * Show x axis outer tick.
			 * @name axis․x․tick․outer
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       outer: false
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_outer: true,

			/**
			 * Set tick text to be multiline
			 * - **NOTE:**
			 *  > When x tick text contains `\n`, it's used as line break and 'axis.x.tick.width' option is ignored.
			 * @name axis․x․tick․multiline
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickMultiline)
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       multiline: false
			 *     }
			 *   }
			 * }
			 * @example
			 * // example of line break with '\n'
			 * // In this case, 'axis.x.tick.width' is ignored
			 * data: {
			 *    x: "x",
			 *    columns: [
			 *        ["x", "long\ntext", "Another\nLong\nText"],
			 *        ...
			 *    ],
			 * }
			 */
			axis_x_tick_multiline: true,


			/**
			 * Set tick width
			 * - **NOTE:**
			 *  > When x tick text contains `\n`, this option is ignored.
			 * @name axis․x․tick․width
			 * @memberof Options
			 * @type {Number}
			 * @default null
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       width: 50
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_width: null,

			/**
			 * Set to display system tooltip(via 'title' attribute) for tick text
			 * - **NOTE:** Only available for category axis type (`axis.x.type='category'`)
			 * @name axis․x․tick․tooltip
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   x: {
			 *     tick: {
			 *       tooltip: true
			 *     }
			 *   }
			 * }
			 */
			axis_x_tick_tooltip: false,

			/**
			 * Set max value of x axis range.
			 * @name axis․x․max
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     max: 100
			 *   }
			 * }
			 */
			axis_x_max: undefined,

			/**
			 * Set min value of x axis range.
			 * @name axis․x․min
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     min: -100
			 *   }
			 * }
			 */
			axis_x_min: undefined,

			/**
			 * Set padding for x axis.<br><br>
			 * If this option is set, the range of x axis will increase/decrease according to the values.
			 * If no padding is needed in the rage of x axis, 0 should be set.
			 * - **NOTE:**
			 *   The padding values aren't based on pixels. It differs according axis types<br>
			 *   - **category:** The unit of tick value
			 *     ex. the given value `1`, is same as the width of 1 tick width
			 *   - **timeseries:** Numeric time value
			 *     ex. the given value `1000*60*60*24`, which is numeric time equivalent of a day, is same as the width of 1 tick width
			 * @name axis․x․padding
			 * @memberof Options
			 * @type {Object}
			 * @default {}
			 * @example
			 * axis: {
			 *   x: {
			 *     padding: {
			 *       // when axis type is 'category'
			 *       left: 1,  // set left padding width of equivalent value of a tick's width
			 *       right: 0.5  // set right padding width as half of equivalent value of tick's width
			 *
			 *       // when axis type is 'timeseries'
			 *       left: 1000*60*60*24,  // set left padding width of equivalent value of a day tick's width
			 *       right: 1000*60*60*12   // set right padding width as half of equivalent value of a day tick's width
			 *     }
			 *   }
			 * }
			 */
			axis_x_padding: {},

			/**
			 * Set height of x axis.<br><br>
			 * The height of x axis can be set manually by this option. If you need more space for x axis, please use this option for that. The unit is pixel.
			 * @name axis․x․height
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     height: 20
			 *   }
			 * }
			 */
			axis_x_height: undefined,

			/**
			 * Set default extent for subchart and zoom. This can be an array or function that returns an array.
			 * @name axis․x․extent
			 * @memberof Options
			 * @type {Array|Function}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     // extent range as a pixel value
			 *     extent: [0, 200],
			 *
			 *     // when axis is 'timeseries', parsable datetime string
			 *     extent: ["2019-03-01", "2019-03-05"],
			 *
			 *     // return extent value
			 *     extent: function(domain, scale) {
			 *    	 var extent = domain.map(function(v) {
			 *     	    return scale(v);
			 *     	 });
			 *
			 *   	 // it should return a format of array
			 *   	 // ex) [0, 584]
			 *     	 return extent;
			 *     }
			 *   }
			 * }
			 */
			axis_x_extent: undefined,

			/**
			 * Set label on x axis.<br><br>
			 *  You can set x axis label and change its position by this option. string and object can be passed and we can change the poisiton by passing object that has position key. Available position differs according to the axis direction (vertical or horizontal). If string set, the position will be the default.
			 *  - **If it's horizontal axis:**
			 *    - inner-right [default]
			 *    - inner-center
			 *    - inner-left
			 *    - outer-right
			 *    - outer-center
			 *    - outer-left
			 *  - **If it's vertical axis:**
			 *    - inner-top [default]
			 *    - inner-middle
			 *    - inner-bottom
			 *    - outer-top
			 *    - outer-middle
			 *    - outer-bottom
			 * @name axis․x․label
			 * @memberof Options
			 * @type {String|Object}
			 * @default undefined
			 * @example
			 * axis: {
			 *   x: {
			 *     label: "Your X Axis"
			 *   }
			 * }
			 *
			 * axis: {
			 *   x: {
			 *     label: {
			 *        text: "Your X Axis",
			 *        position: "outer-center"
			 *     }
			 *   }
			 * }
			 */
			axis_x_label: {},

			/**
			 * Set additional axes for x Axis.
			 * - **NOTE:** Axis' scale is based on x Axis value
			 *
			 * Each axis object should consist with following options:
			 *
			 * | Name | Type | Default | Description |
			 * | --- | --- | --- | --- |
			 * | tick.outer | Boolean | true | Show outer tick |
			 * | tick.format | Function | - | Set formatter for tick text |
			 * | tick.count | Number | - | Set the number of y axis ticks |
			 * | tick.values | Array | - | Set tick values manually |
			 * @name axis․x․axes
			 * @memberof Options
			 * @type {Array}
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
			 * @example
			 * x: {
			 *    axes: [
			 *      {
			 *        tick: {
			 *          outer: false,
			 *          format: function(x) {
			 *             return x + "%";
			 *          },
			 *          count: 2,
			 *          values: [10, 20, 30]
			 *        }
			 *      },
			 *      ...
			 *    ]
			 * }
			 */
			axis_x_axes: [],

			/**
			 * Set clip-path attribute for y axis element
			 * @name axis․y․clipPath
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * // don't set 'clip-path' attribute
			 * clipPath: false
			 */
			axis_y_clipPath: true,

			/**
			 * Show or hide y axis.
			 * @name axis․y․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   y: {
			 *     show: false
			 *   }
			 * }
			 */
			axis_y_show: true,

			/**
			 * Set type of y axis.<br><br>
			 * **Available Values:**
			 *   - timeseries
			 *   - category
			 *   - indexed
			 * @name axis․y․type
			 * @memberof Options
			 * @type {String}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     type: "timeseries"
			 *   }
			 * }
			 */
			axis_y_type: undefined,

			/**
			 * Set max value of y axis.
			 * - **NOTE:** Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
			 * @name axis․y․max
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     max: 1000
			 *   }
			 * }
			 */
			axis_y_max: undefined,

			/**
			 * Set min value of y axis.
			 * - **NOTE:**
			 *   Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
			 * @name axis․y․min
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     min: 1000
			 *   }
			 * }
			 */
			axis_y_min: undefined,

			/**
			 * Change the direction of y axis.<br><br>
			 * If true set, the direction will be from the top to the bottom.
			 * @name axis․y․inverted
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   y: {
			 *     inverted: true
			 *   }
			 * }
			 */
			axis_y_inverted: false,

			/**
			 * Set center value of y axis.
			 * @name axis․y․center
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     center: 0
			 *   }
			 * }
			 */
			axis_y_center: undefined,

			/**
			 * Show y axis inside of the chart.
			 * @name axis․y․inner
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   y: {
			 *     inner: true
			 *   }
			 * }
			 */
			axis_y_inner: false,

			/**
			 * Set label on y axis.<br><br>
			 * You can set y axis label and change its position by this option. This option works in the same way as axis.x.label.
			 * @name axis․y․label
			 * @memberof Options
			 * @type {String|Object}
			 * @default {}
			 * @example
			 * axis: {
			 *   y: {
			 *     label: "Your Y Axis"
			 *   }
			 * }
			 *
			 * axis: {
			 *   y: {
			 *     label: {
			 *        text: "Your Y Axis",
			 *        position: "outer-middle"
			 *     }
			 *   }
			 * }
			 */
			axis_y_label: {},

			/**
			 * Set formatter for y axis tick text.<br><br>
			 * This option accepts d3.format object as well as a function you define.
			 * @name axis․y․tick․format
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       format: function(x) {
			 *           return x.getFullYear();
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_format: undefined,

			/**
			 * Show y axis outer tick.
			 * @name axis․y․tick․outer
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       outer: false
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_outer: true,

			/**
			 * Set y axis tick values manually.
			 * @name axis․y․tick․values
			 * @memberof Options
			 * @type {Array}
			 * @default null
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       values: [100, 1000, 10000]
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_values: null,
			axis_y_tick_rotate: 0,

			/**
			 * Set the number of y axis ticks.<br><br>
			 * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
			 * @name axis․y․tick․count
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       count: 5
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_count: undefined,

			/**
			 * Show or hide y axis tick line.
			 * @name axis․y․tick․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       show: false
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_show: true,

			/**
			* Show or hide y axis tick text.
			* @name axis․y․tick․text․show
			* @memberof Options
			* @type {Boolean}
			* @default true
			* @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			* @example
			* axis: {
			*   y: {
			*     tick: {
			*       text: {
			*           show: false
			*       }
			*     }
			*   }
			* }
			*/
			axis_y_tick_text_show: true,

			/**
			 * Set the y Axis tick text's position relatively its original position
			 * @name axis․y․tick․text․position
			 * @memberof Options
			 * @type {Object}
			 * @default {x: 0, y:0}
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       text: {
			 *         position: {
			 *           x: 10,
			 *           y: 10
			 *         }
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_y_tick_text_position: {x: 0, y: 0},

			/**
			 * Set the number of y axis ticks.<br><br>
			 * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
			 * @name axis․y․tick․time
			 * @memberof Options
			 * @private
			 * @type {Object}
			 * @property {Function} [time.value] D3's time interval function (https://github.com/d3/d3-time#intervals)
			 * @example
			 * axis: {
			 *   y: {
			 *     tick: {
			 *       time: {
			 *          // ticks at 15-minute intervals
			 *          // https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
			 *          value: d3.timeMinute.every(15)
			 *       }
			 *     }
			 *   }
			 * }
			 */
			// @TODO: not fully implemented yet
			axis_y_tick_time_value: undefined,

			/**
			 * Set padding for y axis.<br><br>
			 * You can set padding for y axis to create more space on the edge of the axis.
			 * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
			 *
			 * - **NOTE:** For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
			 * @name axis․y․padding
			 * @memberof Options
			 * @type {Object}
			 * @default {}
			 * @example
			 * axis: {
			 *   y: {
			 *     padding: {
			 *       top: 0,
			 *       bottom: 0
			 *     }
			 *   }
			 * }
			 */
			axis_y_padding: {},

			/**
			 * Set default range of y axis.<br><br>
			 * This option set the default value for y axis when there is no data on init.
			 * @name axis․y․default
			 * @memberof Options
			 * @type {Array}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y: {
			 *     default: [0, 1000]
			 *   }
			 * }
			 */
			axis_y_default: undefined,

			/**
			 * Set additional axes for y Axis.
			 * - **NOTE:** Axis' scale is based on y Axis value
			 *
			 * Each axis object should consist with following options:
			 *
			 * | Name | Type | Default | Description |
			 * | --- | --- | --- | --- |
			 * | tick.outer | Boolean | true | Show outer tick |
			 * | tick.format | Function | - | Set formatter for tick text |
			 * | tick.count | Number | - | Set the number of y axis ticks |
			 * | tick.values | Array | - | Set tick values manually |
			 * @name axis․y․axes
			 * @memberof Options
			 * @type {Array}
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
			 * @example
			 * y: {
			 *    axes: [
			 *      {
			 *        tick: {
			 *          outer: false,
			 *          format: function(x) {
			 *             return x + "%";
			 *          },
			 *          count: 2,
			 *          values: [10, 20, 30]
			 *        }
			 *      },
			 *      ...
			 *    ]
			 * }
			 */
			axis_y_axes: [],

			/**
			 * Show or hide y2 axis.
			 * @name axis․y2․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   y2: {
			 *     show: true
			 *   }
			 * }
			 */
			axis_y2_show: false,

			/**
			 * Set max value of y2 axis.
			 * @name axis․y2․max
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     max: 1000
			 *   }
			 * }
			 */
			axis_y2_max: undefined,

			/**
			 * Set min value of y2 axis.
			 * @name axis․y2․min
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     min: -1000
			 *   }
			 * }
			 */
			axis_y2_min: undefined,

			/**
			 * Change the direction of y2 axis.<br><br>
			 * If true set, the direction will be from the top to the bottom.
			 * @name axis․y2․inverted
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   y2: {
			 *     inverted: true
			 *   }
			 * }
			 */
			axis_y2_inverted: false,

			/**
			 * Set center value of y2 axis.
			 * @name axis․y2․center
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     center: 0
			 *   }
			 * }
			 */
			axis_y2_center: undefined,

			/**
			 * Show y2 axis inside of the chart.
			 * @name axis․y2․inner
			 * @memberof Options
			 * @type {Boolean}
			 * @default false
			 * @example
			 * axis: {
			 *   y2: {
			 *     inner: true
			 *   }
			 * }
			 */
			axis_y2_inner: false,

			/**
			 * Set label on y2 axis.<br><br>
			 * You can set y2 axis label and change its position by this option. This option works in the same way as axis.x.label.
			 * @name axis․y2․label
			 * @memberof Options
			 * @type {String|Object}
			 * @default {}
			 * @example
			 * axis: {
			 *   y2: {
			 *     label: "Your Y2 Axis"
			 *   }
			 * }
			 *
			 * axis: {
			 *   y2: {
			 *     label: {
			 *        text: "Your Y2 Axis",
			 *        position: "outer-middle"
			 *     }
			 *   }
			 * }
			 */
			axis_y2_label: {},

			/**
			 * Set formatter for y2 axis tick text.<br><br>
			 * This option works in the same way as axis.y.format.
			 * @name axis․y2․tick․format
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       format: d3.format("$,")
			 *       //or format: function(d) { return "$" + d; }
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_format: undefined,

			/**
			 * Show or hide y2 axis outer tick.
			 * @name axis․y2․tick․outer
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       outer: false
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_outer: true,

			/**
			 * Set y2 axis tick values manually.
			 * @name axis․y2․tick․values
			 * @memberof Options
			 * @type {Array}
			 * @default null
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       values: [100, 1000, 10000]
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_values: null,

			/**
			 * Set the number of y2 axis ticks.
			 * - **NOTE:** This works in the same way as axis.y.tick.count.
			 * @name axis․y2․tick․count
			 * @memberof Options
			 * @type {Number}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       count: 5
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_count: undefined,

			/**
			 * Show or hide y2 axis tick line.
			 * @name axis․y2․tick․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       show: false
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_show: true,

			/**
			 * Show or hide y2 axis tick text.
			 * @name axis․y2․tick․text․show
			 * @memberof Options
			 * @type {Boolean}
			 * @default true
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       text: {
			 *           show: false
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_text_show: true,

			/**
			 * Set the y2 Axis tick text's position relatively its original position
			 * @name axis․y2․tick․text․position
			 * @memberof Options
			 * @type {Object}
			 * @default {x: 0, y:0}
			 * @example
			 * axis: {
			 *   y2: {
			 *     tick: {
			 *       text: {
			 *         position: {
			 *           x: 10,
			 *           y: 10
			 *         }
			 *       }
			 *     }
			 *   }
			 * }
			 */
			axis_y2_tick_text_position: {x: 0, y: 0},

			/**
			 * Set the number of y2 axis ticks.
			 * - **NOTE:** This works in the same way as axis.y.tick.count.
			 * @name axis․y2․padding
			 * @memberof Options
			 * @type {Object}
			 * @default {}
			 * @example
			 * axis: {
			 *   y2: {
			 *     padding: {
			 *       top: 100,
			 *       bottom: 100
			 *     }
			 *   }
			 * }
			 */
			axis_y2_padding: {},

			/**
			 * Set default range of y2 axis.<br><br>
			 * This option set the default value for y2 axis when there is no data on init.
			 * @name axis․y2․default
			 * @memberof Options
			 * @type {Array}
			 * @default undefined
			 * @example
			 * axis: {
			 *   y2: {
			 *     default: [0, 1000]
			 *   }
			 * }
			 */
			axis_y2_default: undefined,

			/**
			 * Set additional axes for y2 Axis.
			 * - **NOTE:** Axis' scale is based on y2 Axis value
			 *
			 * Each axis object should consist with following options:
			 *
			 * | Name | Type | Default | Description |
			 * | --- | --- | --- | --- |
			 * | tick.outer | Boolean | true | Show outer tick |
			 * | tick.format | Function | - | Set formatter for tick text |
			 * | tick.count | Number | - | Set the number of y axis ticks |
			 * | tick.values | Array | - | Set tick values manually |
			 * @name axis․y2․axes
			 * @memberof Options
			 * @type {Array}
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
			 * @example
			 * y2: {
			 *    axes: [
			 *      {
			 *        tick: {
			 *          outer: false,
			 *          format: function(x) {
			 *             return x + "%";
			 *          },
			 *          count: 2,
			 *          values: [10, 20, 30]
			 *        }
			 *      },
			 *      ...
			 *    ]
			 * }
			 */
			axis_y2_axes: [],

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
			 * @property {Boolean} [focus.show=true] Show grids when focus.
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
			 *       {value: 5, text: "Label on 5", class: "label-5"}
			 *       {value: 6, text: "Label on 6", position: "start"}
			 *     ]
			 *   },
			 *   y: {
			 *     show: true,
			 *     lines: [
			 *       {value: 100, text: "Label on 100"},
			 *       {value: 200, text: "Label on 200", class: "label-200"}
			 *       {value: 300, text: "Label on 300", position: 'middle'}
			 *     ],
			 *     ticks: 5
			 *   },
			 *   front: true,
			 *   focus: {
			 *      show: false
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
			grid_focus_show: true,
			grid_front: false,
			grid_lines_front: true,

			/**
			 * Set point options
			 * @name point
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [point.show=true] Whether to show each point in line.
			 * @property {Number|Function} [point.r=2.5] The radius size of each point.<br>
			 *  - **NOTE:** Disabled for 'bubble' type
			 * @property {Boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
			 * @property {Number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.<br>
			 *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
			 * @property {Number} [point.select.r=point.r*4] The radius size of each point on selected.
			 * @property {String} [point.type="circle"] The type of point to be drawn<br>
			 * - **NOTE:**
			 *  - If chart has 'bubble' type, only circle can be used.
			 *  - For IE, non circle point expansions are not supported due to lack of transform support.
			 * - **Available Values:**
			 *  - circle
			 *  - rectangle
			 * @property {Array} [point.pattern=[]] The type of point or svg shape as string, to be drawn for each line<br>
			 * - **NOTE:**
			 *  - This is an `experimental` feature and can have some unexpected behaviors.
			 *  - If chart has 'bubble' type, only circle can be used.
			 *  - For IE, non circle point expansions are not supported due to lack of transform support.
			 * - **Available Values:**
			 *  - circle
			 *  - rectangle
			 *  - svg shape tag interpreted as string<br>
			 *    (ex. `<polygon points='2.5 0 0 5 5 5'></polygon>`)
			 * @see [Demo: point type](https://naver.github.io/billboard.js/demo/#Point.RectanglePoints)
			 * @example
			 *  point: {
			 *      show: false,
			 *      r: 5,
			 *
			 *      // or customize the radius
			 *      r: function(d) {
			 *          ...
			 *          return r;
			 *      },
			 *
			 *      focus: {
			 *          expand: {
			 *              enabled: true,
			 *              r: 1
			 *          }
			 *      },
			 *      select: {
			 *          r: 3
			 *      },
			 *
			 *      // valid values are "circle" or "rectangle"
			 *      type: "rectangle",
			 *
			 *      // or indicate as pattern
 			 *      pattern: [
 			 *        "circle",
 			 *        "rectangle",
 			 *        "<polygon points='0 6 4 0 -4 0'></polygon>"
 			 *     ],
			 *  }
			 */
			point_show: true,
			point_r: 2.5,
			point_sensitivity: 10,
			point_focus_expand_enabled: true,
			point_focus_expand_r: undefined,
			point_pattern: [],
			point_select_r: undefined,
			point_type: "circle",

			/**
			 * Set line options
			 * @name line
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
			 *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
			 * @property {Array}   [line.classes=undefined] If set, used to set a css class on each line.
			 * @property {Boolean} [line.step.type=step] Change step type for step chart.<br>
			 * **Available values:**
			 * - step
			 * - step-before
			 * - step-after
			 * @property {Boolean|Array} [line.point=true] Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
			 * @example
			 *  line: {
			 *      connectNull: true,
			 *      classes: [
			 *          "line-class1",
			 *          "line-class2"
			 *      ],
			 *      step: {
			 *          type: "step-after"
			 *      },
			 *
			 *      // hide all data points ('point.show=false' also has similar effect)
			 *      point: false,
			 *
			 *      // show data points for only indicated datas
			 *      point: [
			 *          "data1", "data3"
			 *      ]
			 *  }
			 */
			line_connectNull: false,
			line_step_type: "step",
			line_classes: undefined,
			line_point: true,

			/**
			 * Set bar options
			 * @name bar
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [bar.padding=0] The padding pixel value between each bar.
			 * @property {Number} [bar.radius] Set the radius of bar edge in pixel.
			 * - **NOTE:** Works only for non-stacked bar
			 * @property {Number} [bar.radius.ratio] Set the radius ratio of bar edge in relative the bar's width.
			 * @property {Number} [bar.width] Change the width of bar chart.
			 * @property {Number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
			 * @property {Number} [bar.width.max] The maximum width value for ratio.
			 * @property {Number} [bar.width.dataname] Change the width of bar for indicated dataset only.
			 * - **NOTE:**
			 *   - Works only for non-stacked bar
			 *   - Bars are centered accoding its total width value
			 * @property {Number} [bar.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
			 * @property {Number} [bar.width.dataname.max] The maximum width value for ratio.
			 * @property {Boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
			 * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
			 * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
			 * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
			 * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
			 * @example
			 *  bar: {
			 *      padding: 1,
			 *
			 *      // the 'radius' option can be used only for non-stacking bars
			 *      radius: 10,
			 *      // or
			 *      radius: {
			 *          ratio: 0.5
			 *      }
			 *
			 *      width: 10,
			 *
			 *      // or
			 *      width: {
			 *          ratio: 0.2,
			 *          max: 20
			 *      },
			 *
			 *      // or specify width per dataset
			 *      width: {
			 *          data1: 20,
			 *          data2: {
			 *              ratio: 0.2,
			 *              max: 20
			 *          }
			 *      },
			 *
			 *      zerobased: false
			 *  }
			 */
			bar_padding: 0,
			bar_radius: undefined,
			bar_radius_ratio: undefined,
			bar_width: undefined,
			bar_width_ratio: 0.6,
			bar_width_max: undefined,
			bar_zerobased: true,

			/**
			 * Set bubble options
			 * @name bubble
			 * @memberof Options
			 * @type {Object}
			 * @property {Number|Function} [bubble.maxR=35] Set the max bubble radius value
			 * @example
			 *  bubble: {
			 *      // ex) If 100 is the highest value among data bound, the representation bubble of 100 will have radius of 50.
			 *      // And the lesser will have radius relatively from tha max value.
			 *      maxR: 50,
			 *
			 *      // or set radius callback
			 *      maxR: function(d) {
			 *          // ex. of d param - {x: Fri Oct 06 2017 00:00:00 GMT+0900, value: 80, id: "data2", index: 5}
			 *          ...
			 *          return Math.sqrt(d.value * 2);
			 *      }
			 *  }
			 */
			bubble_maxR: 35,

			/**
			 * Set area options
			 * @name area
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
			 * @property {Boolean} [area.above=false] Set background area above the data chart line.
			 * @property {Boolean|Object} [area.linearGradient=false] Set the linear gradient on area.<br><br>
			 * Or customize by giving below object value:
			 *  - x {Array}: `x1`, `x2` value
			 *  - y {Array}: `y1`, `y2` value
			 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
			 * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient), [&lt;stop>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop)
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
			 * @see [Demo: above](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Above)
			 * @see [Demo: linearGradient](https://naver.github.io/billboard.js/demo/#AreaChartOptions.LinearGradient)
			 * @example
			 *  area: {
			 *      zerobased: false,
			 *      above: true,
			 *
			 *      // will generate follwing linearGradient:
			 *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
			 *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
			 *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
			 *      // </linearGradient>
			 *      linearGradient: true,
			 *
			 *      // Or customized gradient
			 *      linearGradient: {
			 *      	x: [0, 0],  // x1, x2 attributes
			 *      	y: [0, 0],  // y1, y2 attributes
			 *      	stops: [
			 *      		// offset, stop-color, stop-opacity
			 *      		[0, "#7cb5ec", 1],
			 *
			 *      		// setting 'null' for stop-color, will set its original data color
			 *      		[0.5, null, 0],
			 *
			 *      		// setting 'function' for stop-color, will pass data id as argument.
			 *      		// It should return color string or null value
			 *      		[1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
			 *      	]
			 *      }
			 *  }
			 */
			area_zerobased: true,
			area_above: false,
			area_linearGradient: false,

			/**
			 * Set pie options
			 * @name pie
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [pie.label.show=true] Show or hide label on each pie piece.
			 * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
			 * @property {Number} [pie.label.threshold=0.05] Set threshold to show/hide labels.
			 * @property {Number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
			 * @property {Boolean|Object} [pie.expand=true] Enable or disable expanding pie pieces.
			 * @property {Number} [pie.expand.duration=50] Set expand transition time in ms.
			 * @property {Number} [pie.innerRadius=0] Sets the inner radius of pie arc.
			 * @property {Number} [pie.padAngle=0] Set padding between data.
			 * @property {Number} [pie.padding=0] Sets the gap between pie arcs.
			 * @example
			 *  pie: {
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
			 *              ...
			 *              return ratio;
			 *          },
			 *          // or set ratio number
			 *          ratio: 0.5
			 *      },
			 *
			 *      // disable expand transition for interaction
			 *      expand: false,
			 *
			 *      // set duration of expand transition to 500ms.
			 *      expand: {
			 *          duration: 500
			 *      },
			 *
			 *      innerRadius: 0,
			 *      padAngle: 0.1,
			 *      padding: 0
			 *  }
			 */
			pie_label_show: true,
			pie_label_format: undefined,
			pie_label_threshold: 0.05,
			pie_label_ratio: undefined,
			pie_expand: {},
			pie_expand_duration: 50,
			pie_innerRadius: 0,
			pie_padAngle: 0,
			pie_padding: 0,

			/**
			 * Set gauge options
			 * @name gauge
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
			 * @property {Boolean} [gauge.label.show=true] Show or hide label on gauge.
			 * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.
			 * @property {Function} [gauge.label.extents] Set customized min/max label text.
			 * @property {Boolean} [gauge.expand=true] Enable or disable expanding gauge.
			 * @property {Number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
			 * @property {Number} [gauge.min=0] Set min value of the gauge.
			 * @property {Number} [gauge.max=100] Set max value of the gauge.
			 * @property {Number} [gauge.startingAngle=-1 * Math.PI / 2]
			 * @property {String} [gauge.units] Set units of the gauge.
			 * @property {Number} [gauge.width] Set width of gauge chart.
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
			 *      expand: false,
			 *
			 *      // or set duration
			 *      expand: {
			 *          duration: 20
			 *      },
			 *      min: -100,
			 *      max: 200,
			 *      units: "%",
			 *      width: 10
			 *  }
			 */
			gauge_fullCircle: false,
			gauge_label_show: true,
			gauge_label_format: undefined,
			gauge_min: 0,
			gauge_max: 100,
			gauge_startingAngle: -1 * Math.PI / 2,
			gauge_label_extents: undefined,
			gauge_units: undefined,
			gauge_width: undefined,
			gauge_expand: {},
			gauge_expand_duration: 50,


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
			 * @property {Number} [donut.width] Set width of donut chart.
			 * @property {String} [donut.title=""] Set title of donut chart. Use `\n` character to enter line break.
			 * @property {Number} [donut.padAngle=0] Set padding between data.
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
			 *      expand: false,
			 *      width: 10,
			 *      padAngle: 0.2,
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
			donut_expand_duration: 50,
			donut_padAngle: 0,

			/**
			 * Set spline options
			 * - **Available interpolation type values:**
			 *  - basis (d3.curveBasis)
			 *  - basis-closed (d3.curveBasisClosed)
			 *  - basis-open (d3.curveBasisOpen)
			 *  - bundle (d3.curveBundle)
			 *  - cardinal (d3.curveCardinal)
			 *  - cardinal-closed (d3.curveCardinalClosed)
			 *  - cardinal-open (d3.curveCardinalOpen)
			 *  - catmull-rom (d3.curveCatmullRom)
			 *  - catmull-rom-closed (d3.curveCatmullRomClosed)
			 *  - catmull-rom-open (d3.curveCatmullRomOpen)
			 *  - monotone-x (d3.curveMonotoneX)
			 *  - monotone-y (d3.curveMonotoneY)
			 *  - natural (d3.curveNatural)
			 *  - linear-closed (d3.curveLinearClosed)
			 *  - linear (d3.curveLinear)
			 *  - step (d3.curveStep)
			 *  - step-after (d3.curveStepAfter)
			 *  - step-before (d3.curveStepBefore)
			 * @name spline
			 * @memberof Options
			 * @type {Object}
			 * @property {String} [spline.interpolation.type="cardinal"]
			 * @see [Interpolation (d3 v4)](http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502)
			 * @example
			 *  spline: {
			 *      interpolation: {
			 *          type: "cardinal"
			 *      }
			 *  }
			 */
			spline_interpolation_type: "cardinal",

			/**
			 * Set radar options
			 * @name radar
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [radar.axis.max=undefined] The max value of axis. If not given, it'll take the max value from the given data.
			 * @property {Boolean} [radar.axis.line.show=true] Show or hide axis line.
			 * @property {Boolean} [radar.axis.text.show=true] Show or hide axis text.
			 * @property {Boolean} [radar.direction.clockwise=false] Set the direction to be drawn.
			 * @property {Number} [radar.level.depth=3] Set the level depth.
			 * @property {Boolean} [radar.level.show=true] Show or hide level.
			 * @property {Function} [radar.level.text.format=(x) => (x % 1 === 0 ? x : x.toFixed(2))] Set format function for the level value.
			 * @property {Boolean} [radar.level.text.show=true] Show or hide level text.
			 * @property {Number} [radar.size.ratio=0.87] Set size ratio.
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.RadarChart)
			 * @see [Demo: radar axis](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxis)
			 * @see [Demo: radar level](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarLevel)
			 * @see [Demo: radar size](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarSize)
			 * @example
			 *  radar: {
			 *      axis: {
			 *          max: 50,
			 *          line: {
			 *              show: false
			 *          },
			 *          text: {
			 *              show: false
			 *          }
			 *      },
			 *      direction: {
			 *          clockwise: true
			 *      },
			 *      level: {
			 *          show: false,
			 *          text: {
			 *              format: function(x) {
			 *                  return x + "%";
			 *              },
			 *              show: true
			 *          }
			 *      },
			 *      size: {
			 *          ratio: 0.7
			 *      }
			 *  }
			 */
			radar_axis_max: undefined,
			radar_axis_line_show: true,
			radar_axis_text_show: true,
			radar_level_depth: 3,
			radar_level_show: true,
			radar_level_text_format: x => (x % 1 === 0 ? x : x.toFixed(2)),
			radar_level_text_show: true,
			radar_size_ratio: 0.87,
			radar_direction_clockwise: false,

			/**
			 * Show rectangles inside the chart.<br><br>
			 * This option accepts array including object that has axis, start, end and class. The keys start, end and class are optional.
			 * axis must be x, y or y2. start and end should be the value where regions start and end. If not specified, the edge values will be used. If timeseries x axis, date string, Date object and unixtime integer can be used. If class is set, the region element will have it as class.
			 * @name regions
			 * @memberof Options
			 * @type {Array}
			 * @default []
			 * @example
			 *  regions: [
			 *    {
			 *      axis: "x",
			 *      start: 1,
			 *      end: 4,
			 *      class: "region-1-4"
			 *    }
			 *  ]
			 */
			regions: [],

			/**
			 * Tooltip options
			 * @name tooltip
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [tooltip.show=true] Show or hide tooltip.<br>
			 * @property {Boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
			 *   - **NOTE:** The overlapped data points will be displayed as grouped even if set false.
			 * @property {Boolean} [tooltip.linked=false] Set if tooltips on all visible charts with like x points are shown together when one is shown.
			 * @property {String} [tooltip.linked.name=""] Groping name for linked tooltip.<br>If specified, linked tooltip will be groped interacting to be worked only with the same name.
			 * @property {Function} [tooltip.format.title] Set format for the title of tooltip.<br>
			 *  Specified function receives x of the data point to show.
			 * @property {Function} [tooltip.format.name] Set format for the name of each data in tooltip.<br>
			 *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
			 * @property {Function} [tooltip.format.value] Set format for the value of each data in tooltip.<br>
			 *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
			 *  If undefined returned, the row of that value will be skipped.
			 * @property {Function} [tooltip.position] Set custom position for the tooltip.<br>
			 *  This option can be used to modify the tooltip position by returning object that has top and left.
			 * @property {Function} [tooltip.contents] Set custom HTML for the tooltip.<br>
			 *  Specified function receives data, defaultTitleFormat, defaultValueFormat and color of the data point to show. If tooltip.grouped is true, data includes multiple data points.
			 * @property {Boolean} [tooltip.init.show=false] Show tooltip at the initialization.
			 * @property {Number} [tooltip.init.x=0] Set x Axis index to be shown at the initialization.
			 * @property {Object} [tooltip.init.position={top: "0px",left: "50px"}] Set the position of tooltip at the initialization.
			 * @property {Function} [tooltip.onshow] Set a callback that will be invoked before the tooltip is shown.
			 * @property {Function} [tooltip.onhide] Set a callback that will be invoked before the tooltip is hidden.
			 * @property {Function} [tooltip.onshown] Set a callback that will be invoked after the tooltip is shown
			 * @property {Function} [tooltip.onhidden] Set a callback that will be invoked after the tooltip is hidden.
			 * @property {String|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
			 *  **Available Values:**
			 *  - `desc`: In descending data value order
			 *  - `asc`: In ascending data value order
			 *  - `null`: It keeps the data display order<br>
			 *     **NOTE:** When `data.groups` is set, the order will follow as the stacked graph order.<br>
			 *      If want to order as data bound, set any value rather than asc, desc or null. (ex. empty string "")
			 *  - `function(data1, data2) { ... }`: [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
			 * @example
			 *  tooltip: {
			 *      show: true,
			 *      grouped: false,
			 *      format: {
			 *          title: function(x) { return "Data " + x; },
			 *          name: function(name, ratio, id, index) { return name; },
			 *          value: function(value, ratio, id, index) { return ratio; }
			 *      },
			 *      position: function(data, width, height, element) {
			 *          return {top: 0, left: 0}
  			 *      },
  			 *      contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
  			 *          return ... // formatted html as you want
    		 *      },
    		 *
    		 *      // sort tooltip data value display in ascending order
    		 *      order: "asc",
    		 *
			 *      // specifying sort function
			 *      order: function(a, b) {
			 *         // param data passed format
			 *         {x: 5, value: 250, id: "data1", index: 5, name: "data1"}
			 *           ...
			 *      },
			 *
			 *      // show at the initialization
			 *      init: {
			 *          show: true,
			 *          x: 2,
			 *          position: {
			 *              top: "150px",
			 *              left: "250px"
			 *          }
			 *      },
			 *
			 *      // fires prior tooltip is shown
			 *      onshow: function() { ...},
			 *      // fires prior tooltip is hidden
			 *      onhide: function() { ... },
			 *      // fires after tooltip is shown
			 *      onshown: function() { ... },
			 *      // fires after tooltip is hidden
			 *      onhidden: function() { ... },
			 *
			 *      // Link any tooltips when multiple charts are on the screen where same x coordinates are available
			 *      // Useful for timeseries correlation
			 *      linked: true,
			 *
			 *      // Specify name to interact those with the same name only.
			 *      linked: {
			 *          name: "some-group"
			 *      }
			 *  }
			 */
			tooltip_show: true,
			tooltip_grouped: true,
			tooltip_format_title: undefined,
			tooltip_format_name: undefined,
			tooltip_format_value: undefined,
			tooltip_position: undefined,
			tooltip_contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
				return this.getTooltipContent ?
					this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) : "";
			},
			tooltip_init_show: false,
			tooltip_init_x: 0,
			tooltip_init_position: {
				top: "0px",
				left: "50px"
			},
			tooltip_linked: false,
			tooltip_linked_name: "",
			tooltip_onshow: () => {},
			tooltip_onhide: () => {},
			tooltip_onshown: () => {},
			tooltip_onhidden: () => {},
			tooltip_order: null,

			/**
			 * Set title options
			 * @name title
			 * @memberof Options
			 * @type {Object}
			 * @property {String} [title.text] Title text. If contains `\n`, it's used as line break allowing multiline title.
			 * @property {Number} [title.padding.top=0] Top padding value.
			 * @property {Number} [title.padding.right=0] Right padding value.
			 * @property {Number} [title.padding.bottom=0] Bottom padding value.
			 * @property {Number} [title.padding.left=0] Left padding value.
			 * @property {String} [title.position=center] Available values are: 'center', 'right' and 'left'.
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#Title.MultilinedTitle)
			 * @example
			 *  title: {
			 *      text: "Title Text",
			 *
			 *      // or Multiline title text
			 *      text: "Main title text\nSub title text",
			 *
			 *      padding: {
			 *          top: 10,
			 *          right: 10,
			 *          bottom: 10,
			 *          left: 10
			 *      },
			 *      position: "center"
			 *  }
			 */
			title_text: undefined,
			title_padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			title_position: "center"
		};
	}
}
