/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend, isString, isArray} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Load data to the chart.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
	 * - <b>Note:</b>
	 *   - unload should be used if some data needs to be unloaded simultaneously.
	 *     If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
	 *   - done will be called after data loaded, but it's not after rendering.
	 *     It's because rendering will finish after some transition and there is some time lag between loading and rendering
	 * @method load
	 * @instance
	 * @memberof Chart
	 * @param {Object} args The object can consist with following members:<br>
	 *
	 *    | Key | Description |
	 *    | --- | --- |
	 *    | - url<br>- json<br>- rows<br>- columns | The data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | data | Data objects to be loaded. Checkout the example. |
	 *    | names | Same as data.names() |
	 *    | xs | Same as data.xs option  |
	 *    | classes | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
	 *    | categories | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
	 *    | axes | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
	 *    | colors | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
	 *    | headers |  Set request header if loading via `data.url`.<br>@see [data․headers](Options.html#.data%25E2%2580%25A4headers) |
	 *    | keys |  Choose which JSON objects keys correspond to desired data.<br>**NOTE:** Only for JSON object given as array.<br>@see [data․keys](Options.html#.data%25E2%2580%25A4keys) |
	 *    | mimeType |  Set 'json' if loading JSON via url.<br>@see [data․mimeType](Options.html#.data%25E2%2580%25A4mimeType) |
	 *    | - type<br>- types | The type of targets will be updated. type must be String and types must be Object. |
	 *    | unload | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
	 *    | done | The specified function will be called after data loaded.|
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
	 */
	load(args) {
		const $$ = this.internal;
		const config = $$.config;

		// update xs if specified
		args.xs && $$.addXs(args.xs);

		// update names if exists
		"names" in args && this.data.names(args.names);

		// update classes if exists
		"classes" in args && Object.keys(args.classes).forEach(id => {
			config.data_classes[id] = args.classes[id];
		});

		// update categories if exists
		if ("categories" in args && $$.isCategorized()) {
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
			$$.unload($$.mapToTargetIds(args.unload === true ? null : args.unload), () =>
				$$.loadFromArgs(args)
			);
		} else {
			$$.loadFromArgs(args);
		}
	},

	/**
	 * Unload data to the chart.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
	 * - <b>Note:</b>
	 * If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.<br>
	 * `done` will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
	 * @method unload
	 * @instance
	 * @memberof Chart
	 * @param {Object} args
	 *  | key | Type | Description |
	 *  | --- | --- | --- |
	 *  | ids | String &vert; Array | Target id data to be unloaded. If not given, all data will be unloaded. |
	 *  | done | Fuction | Callback after data is unloaded. |
	 * @example
	 *  // Unload data2 and data3
	 *  chart.unload({
	 *    ids: ["data2", "data3"],
	 *    done: function() {
	 *       // called after the unloaded
	 *    }
	 *  });
	 */
	unload(argsValue) {
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

			$$.removeCache(ids);
			args.done && args.done();
		});
	}
});
