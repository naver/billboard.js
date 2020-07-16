/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * data.selection config options
 */
export default {
	/**
	 * Set data selection enabled<br><br>
	 * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
	 *  - **NOTE:** for ESM imports, needs to import 'selection' exports and instantiate it by calling `selection()`.
	 *    - `enabled: selection()`
	 * @name data․selection․enabled
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataSelection)
	 * @example
	 * data: {
	 *    selection: {
	 *       enabled: true
	 *    }
	 * }
	 * @example
	 * // importing ESM
	 * import bb, {selection} from "billboard.js";
	 *
	 * data: {
	 *    selection: {
	 *       enabled: selection(),
	 *       ...
	 *    }
	 * }
	 */
	data_selection_enabled: false,

	/**
	 * Set grouped selection enabled.<br><br>
	 * If this option set true, multiple data points that have same x value will be selected by one selection.
	 * @name data․selection․grouped
	 * @memberof Options
	 * @type {boolean}
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
	 * @type {boolean}
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
	 * @type {boolean}
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
	data_onunselected: () => {}
};
