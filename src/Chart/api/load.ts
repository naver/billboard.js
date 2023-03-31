/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {requestIdleCallback} from "../../module/browser";
import {isString, isArray} from "../../module/util";
import {callDone} from "../../ChartInternal/data/load";

export default {
	/**
	 * Load data to the chart.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
	 * - <b>Note:</b>
	 *   - unload should be used if some data needs to be unloaded simultaneously.
	 *     If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
	 *   - done will be called after data loaded, but it's not after rendering.
	 *     It's because rendering will finish after some transition and there is some time lag between loading and rendering
	 * @function load
	 * @instance
	 * @memberof Chart
	 * @param {object} args The object can consist with following members:<br>
	 *
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | columns | Array | The `columns` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | json | Array | The `json` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | rows | Array | The `rows` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | url | string | The data from `url` will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | &nbsp; | | |
	 *    | append | boolean | Load data appending it to the current dataseries.<br>If the existing chart has`x` value, should provide with corresponding `x` value for newly loaded data.  |
	 *    | axes | Object | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
	 *    | categories | Array | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
	 *    | classes | Object | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
	 *    | colors | Object | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
	 *    | data | Obejct | Data objects to be loaded. Checkout the example. |
	 *    | done | Function | The specified function will be called after data loaded.|
	 *    | headers | string |  Set request header if loading via `data.url`.<br>@see [data․headers](Options.html#.data%25E2%2580%25A4headers) |
	 *    | keys | Object |  Choose which JSON objects keys correspond to desired data.<br>**NOTE:** Only for JSON object given as array.<br>@see [data․keys](Options.html#.data%25E2%2580%25A4keys) |
	 *    | mimeType | string |  Set 'json' if loading JSON via url.<br>@see [data․mimeType](Options.html#.data%25E2%2580%25A4mimeType) |
	 *    | names | Object | Same as data.names() |
	 *    | resizeAfter | boolean | Resize after the load. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of load. |
	 *    | type | string | The type of targets will be updated. |
	 *    | types | Object | The types of targets will be updated. |
	 *    | unload | Array | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
	 *    | xs | string | Same as data.xs option  |
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataFromURL)
	 * @example
	 * // Load data1 and unload data2 and data3
	 * chart.load({
	 *     columns: [
	 *        ["data1", 100, 200, 150, ...],
	 *        ...
	 *    ],
	 *    unload: ["data2", "data3"],
	 *    url: "...",
	 *    done: function() { ... }
	 *    resizeAfter: true  // will resize after load
	 * });
	 * @example
	 * const chart = bb.generate({
	 *   data: {
	 *     columns: [
	 *       ["data1", 20, 30, 40]
	 *     ]
	 *   }
	 * });
	 *
	 * chart.load({
	 *    columns: [
	 *        // with 'append' option, the 'data1' will have `[20,30,40,50,60]`.
	 *        ["data1", 50, 60]
	 *    ],
	 *    append: true
	 * });
	 * @example
	 * const chart = bb.generate({
	 *   data: {
	 *     x: "x",
	 *     xFormat: "%Y-%m-%dT%H:%M:%S",
	 *     columns: [
	 *       ["x", "2021-01-03T03:00:00", "2021-01-04T12:00:00", "2021-01-05T21:00:00"],
	 *       ["data1", 36, 30, 24]
	 *     ]
	 *   },
	 *   axis: {
	 *     x: {
	 *       type: "timeseries"
	 *     }
	 *   }
	 * };
	 *
	 * chart.load({
	 *   columns: [
	 *     // when existing chart has `x` value, should provide correponding 'x' value.
	 *     // with 'append' option, the 'data1' will have `[36,30,24,37]`.
	 *     ["x", "2021-02-01T08:00:00"],
	 *     ["data1", 37]
	 *   ],
	 *   append: true
	 * });
	 * @example
	 * // myAPI.json
	 * // {
	 * //   "data1": [220, 240, 270, 250, 280],
	 * //   "data2": [180, 150, 300, 70, 120]
	 * // }
	 *
	 * chart.load({
	 *     url: './data/myAPI.json',
	 *     mimeType: "json",
	 *
	 *     // set request header if is needed
	 *     headers: {
	 *       "Content-Type": "text/json"
	 *     }
	 * });
	 * @example
	 * chart.load({
	 *     data: [
	 *       // equivalent as: columns: [["data1", 30, 200, 100]]
	 *       {"data1": 30}, {"data1": 200}, {"data1": 100}
	 *
	 *       // or
	 *       // equivalent as: columns: [["data1", 10, 20], ["data2", 13, 30]]
	 *       // {"data1": 10, "data2": 13}, {"data1": 20, "data2": 30}}
	 *     ]
	 * });
	 * @example
	 * chart.load({
	 *     json: [
	 *          {name: "www.site1.com", upload: 800, download: 500, total: 400},
	 *     ],
	 *     keys: {
	 *         x: "name",
	 *         value: ["upload", "download"]
	 *     }
	 * });
	 * @example
	 * chart.load({
	 *   json: {
	 *       data1:[30, 20, 50, 40, 60, 50],
	 *       data2:[200, 130, 90, 240, 130, 220],
	 *   }
	 * });
	 */
	load(args): void {
		const $$ = this.internal;
		const {config} = $$;

		// update xs if specified
		args.xs && $$.addXs(args.xs);

		// update names if exists
		"names" in args && this.data.names(args.names);

		// update classes if exists
		"classes" in args && Object.keys(args.classes).forEach(id => {
			config.data_classes[id] = args.classes[id];
		});

		// update categories if exists
		if ("categories" in args && $$.axis.isCategorized()) {
			config.axis_x_categories = args.categories;
		}

		// update axes if exists
		"axes" in args && Object.keys(args.axes).forEach(id => {
			config.data_axes[id] = args.axes[id];
		});

		// update colors if exists
		"colors" in args && Object.keys(args.colors).forEach(id => {
			config.data_colors[id] = args.colors[id];
		});

		// unload if needed
		if ("unload" in args && args.unload !== false) {
			// TODO: do not unload if target will load (included in url/rows/columns)
			$$.unload($$.mapToTargetIds(args.unload === true ? null : args.unload), () => {
				// to mitigate improper rendering for multiple consecutive calls
				// https://github.com/naver/billboard.js/issues/2121
				requestIdleCallback(() => $$.loadFromArgs(args));
			});
		} else {
			$$.api.tooltip.hide();
			$$.loadFromArgs(args);
		}
	},

	/**
	 * Unload data to the chart.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
	 * - <b>Note:</b>
	 * If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.<br>
	 * `done` will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
	 * @function unload
	 * @instance
	 * @memberof Chart
	 * @param {object} argsValue
	 *  | key | Type | Description |
	 *  | --- | --- | --- |
	 *  | ids | String &vert; Array | Target id data to be unloaded. If not given, all data will be unloaded. |
	 *  | done | Fuction | Callback after data is unloaded. |
	 *  | resizeAfter | boolean | Resize after the unload. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of unload. |
	 * @example
	 *  // Unload data2 and data3
	 *  chart.unload({
	 *    ids: ["data2", "data3"],
	 *    done: function() {
	 *       // called after the unloaded
	 *    },
	 *    resizeAfter: true  // will resize after unload
	 *  });
	 */
	unload(argsValue): void {
		const $$ = this.internal;
		let args = argsValue || {};

		if (isArray(args)) {
			args = {ids: args};
		} else if (isString(args)) {
			args = {ids: [args]};
		}

		const ids = $$.mapToTargetIds(args.ids);

		$$.unload(ids, () => {
			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true,
				withLegend: true
			});

			$$.cache.remove(ids);
			callDone.call($$, args.done, args.resizeAfter);
		});
	}
};
