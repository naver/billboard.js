/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * tooltip config options
 */
export default {
	/**
	 * Tooltip options
	 * @name tooltip
	 * @memberof Options
	 * @type {object}
	 * @property {object} tooltip Tooltip object
	 * @property {boolean} [tooltip.show=true] Show or hide tooltip.
	 * @property {boolean} [tooltip.doNotHide=false] Make tooltip keep showing not hiding on interaction.
	 * @property {boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
	 *   - **NOTE:** The overlapped data points will be displayed as grouped even if set false.
	 * @property {boolean} [tooltip.linked=false] Set if tooltips on all visible charts with like x points are shown together when one is shown.
	 * @property {string} [tooltip.linked.name=""] Groping name for linked tooltip.<br>If specified, linked tooltip will be groped interacting to be worked only with the same name.
	 * @property {Function} [tooltip.format.title] Set format for the title of tooltip.<br>
	 *  Specified function receives x of the data point to show.
	 * @property {Function} [tooltip.format.name] Set format for the name of each data in tooltip.<br>
	 *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
	 * @property {Function} [tooltip.format.value] Set format for the value of each data in tooltip. If undefined returned, the row of that value will be skipped to be called.
	 *  - Will pass following arguments to the given function:
	 *    - `value {string}`: Value of the data point
	 *    - `ratio {number}`: Ratio of the data point in the `pie/donut/gauge` and `area/bar` when contains grouped data. Otherwise is `undefined`.
	 *    - `id {string}`: id of the data point
	 *    - `index {number}`: Index of the data point
	 * @property {Function} [tooltip.position] Set custom position function for the tooltip.<br>
	 *  This option can be used to modify the tooltip position by returning object that has top and left.
	 *  - Will pass following arguments to the given function:
	 *    - `data {Array}`: Current selected data array object.
	 *    - `width {number}`: Width of tooltip.
	 *    - `height {number}`: Height of tooltip.
	 *    - `element {SVGElement}`: Tooltip event bound element
	 *    - `pos {object}`: Current position of the tooltip.
	 * @property {Function|object} [tooltip.contents] Set custom HTML for the tooltip.<br>
	 *  If tooltip.grouped is true, data includes multiple data points.<br><br>
	 *  Specified function receives `data` array and `defaultTitleFormat`, `defaultValueFormat` and `color` functions of the data point to show.
	 *  - **Note:**
	 *    - defaultTitleFormat:
	 *      - if `axis.x.tick.format` option will be used if set.
	 *      - otherwise, will return function based on tick format type(category, timeseries).
	 *    - defaultValueFormat:
	 *	    - for Arc type (except gauge, radar), the function will return value from `(ratio * 100).toFixed(1)`.
	 *	    - for Axis based types, will be used `axis.[y|y2].tick.format` option value if is set.
	 *	    - otherwise, will parse value and return as number.
	 * @property {string|HTMLElement} [tooltip.contents.bindto=undefined] Set CSS selector or element reference to bind tooltip.
	 *  - **NOTE:** When is specified, will not be updating tooltip's position.
	 * @property {string} [tooltip.contents.template=undefined] Set tooltip's template.<br><br>
	 *  Within template, below syntax will be replaced using template-like syntax string:
	 *    - **{{ ... }}**: the doubly curly brackets indicate loop block for data rows.
	 *    - **{=CLASS_TOOLTIP}**: default tooltip class name `bb-tooltip`.
	 *    - **{=CLASS_TOOLTIP_NAME}**: default tooltip data class name (ex. `bb-tooltip-name-data1`)
	 *    - **{=TITLE}**: title value.
	 *    - **{=COLOR}**: data color.
	 *    - **{=VALUE}**: data value.
	 * @property {object} [tooltip.contents.text=undefined] Set additional text content within data loop, using template syntax.
	 *  - **NOTE:** It should contain `{ key: Array, ... }` value
	 *    - 'key' name is used as substitution within template as '{=KEY}'
	 *    - The value array length should match with the data length
	 * @property {boolean} [tooltip.init.show=false] Show tooltip at the initialization.
	 * @property {number} [tooltip.init.x=0] Set x Axis index(or index for Arc(donut, gauge, pie) types) to be shown at the initialization.
	 * @property {object} [tooltip.init.position={top: "0px",left: "50px"}] Set the position of tooltip at the initialization.
	 * @property {Function} [tooltip.onshow] Set a callback that will be invoked before the tooltip is shown.
	 * @property {Function} [tooltip.onhide] Set a callback that will be invoked before the tooltip is hidden.
	 * @property {Function} [tooltip.onshown] Set a callback that will be invoked after the tooltip is shown
	 * @property {Function} [tooltip.onhidden] Set a callback that will be invoked after the tooltip is hidden.
	 * @property {string|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
	 *  **Available Values:**
	 *  - `desc`: In descending data value order
	 *  - `asc`: In ascending data value order
	 *  - `null`: It keeps the data display order<br>
	 *     **NOTE:** When `data.groups` is set, the order will follow as the stacked graph order.<br>
	 *      If want to order as data bound, set any value rather than asc, desc or null. (ex. empty string "")
	 *  - `function(data1, data2) { ... }`: [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
	 * @see [Demo: Hide Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.HideTooltip)
	 * @see [Demo: Tooltip Grouping](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipGrouping)
	 * @see [Demo: Tooltip Format](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipFormat)
	 * @see [Demo: Linked Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.LinkedTooltips)
	 * @see [Demo: Tooltip Template](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipTemplate)
	 * @example
	 *  tooltip: {
	 *      show: true,
	 *      doNotHide: true,
	 *      grouped: false,
	 *      format: {
	 *          title: function(x) { return "Data " + x; },
	 *          name: function(name, ratio, id, index) { return name; },
	 *          value: function(value, ratio, id, index) { return ratio; }
	 *      },
	 *      position: function(data, width, height, element, pos) {
	 *          // data: [{x, index, id, name, value}, ...]
	 *          // width: Tooltip width
	 *          // height: Tooltip height
	 *          // element: Tooltip event bound element
	 *          // pos: {
	 *          //   x: Current mouse event x position,
	 *          //   y: Current mouse event y position,
	 *          //   xAxis: Current x Axis position (the value is given for axis based chart type only)
	 *          // }
	 *          return {top: 0, left: 0}
	 *      },
	 *
	 *      contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
	 *          return ... // formatted html as you want
	 *      },
	 *
	 *       // specify tooltip contents using template
	 *       // - example of HTML returned:
	 *       // <ul class="bb-tooltip">
	 *       //   <li class="bb-tooltip-name-data1"><span>250</span><br><span style="color:#00c73c">data1</span></li>
	 *       //   <li class="bb-tooltip-name-data2"><span>50</span><br><span style="color:#fa7171">data2</span></li>
	 *       // </ul>
	 *       contents: {
	 *      	bindto: "#tooltip",
	 *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
	 *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span><br>' +
	 *      			'<span style=color:{=COLOR}>{=NAME}</span></li>' +
	 *      		'}}</ul>'
	 *      }
	 *
	 *       // with additional text value
	 *       // - example of HTML returned:
	 *       // <ul class="bb-tooltip">
	 *       //   <li class="bb-tooltip-name-data1"><span>250</span><br>comment1<span style="color:#00c73c">data1</span>text1</li>
	 *       //   <li class="bb-tooltip-name-data2"><span>50</span><br>comment2<span style="color:#fa7171">data2</span>text2</li>
	 *       // </ul>
	 *       contents: {
	 *      	bindto: "#tooltip",
	 *      	text: {
	 *      		// a) 'key' name is used as substitution within template as '{=KEY}'
	 *      		// b) the length should match with the data length
	 *      		VAR1: ["text1", "text2"],
	 *      		VAR2: ["comment1", "comment2"],
	 *      	},
	 *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
	 *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span>{=VAR2}<br>' +
	 *      			'<span style=color:{=COLOR}>{=NAME}</span>{=VAR1}</li>' +
	 *      		'}}</ul>'
	 *      }
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
	 *          x: 2, // x Axis index(or index for Arc(donut, gauge, pie) types)
	 *          position: {
	 *              top: "150px",
	 *              left: "250px"
	 *          }
	 *      },
	 *
	 *      // fires prior tooltip is shown
	 *      onshow: function(selectedData) {
	 *      	// current dataset selected
	 *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
	 *      	selectedData;
	 *      },
	 *
	 *      // fires prior tooltip is hidden
	 *      onhide: function(selectedData) {
	 *      	// current dataset selected
	 *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
	 *      	selectedData;
	 *      },
	 *
	 *      // fires after tooltip is shown
	 *      onshown: function(selectedData) {
	 *      	// current dataset selected
	 *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
	 *      	selectedData;
	 *      },
	 *
	 *      // fires after tooltip is hidden
	 *      onhidden: function(selectedData) {
	 *      	// current dataset selected
	 *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
	 *      	selectedData;
	 *      },
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
	tooltip_doNotHide: false,
	tooltip_grouped: true,
	tooltip_format_title: <(() => string)|undefined> undefined,
	tooltip_format_name: <(() => string)|undefined> undefined,
	tooltip_format_value: <(() => number)|undefined> undefined,
	tooltip_position: <(() => {top: number; left: number;})|undefined> undefined,
	tooltip_contents: <
			(() => string)|{bindto: string; template: string; text?: {[key: string]: string[]}}
		> {},
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
	tooltip_order: <string|Function|null> null
};
