/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend, isString, isArray} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Load data to the chart.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
	 * - <b>Note:</b>
	 * unload should be used if some data needs to be unloaded simultaneously. If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
	 * done will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering
	 * @method load
	 * @instance
	 * @memberOf Chart
	 * @param {Object} args The object can consist with following members:<br>
	 *
	 *    | Key | Description |
	 *    | --- | --- |
	 *    | - url<br>- json<br>- rows<br>- columns | The data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
	 *    | classes | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
	 *    | categories | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
	 *    | axes | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
	 *    | colors | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
	 *    | - type<br>- types | The type of targets will be updated. type must be String and types must be Object. |
	 *    | unload | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
	 *    | done | The specified function will be called after data loaded.|
	 *
	 * @example
	 *  // Load data1 and unload data2 and data3
	 *  chart.load({
	 *     columns: [
	 *        ["data1", 100, 200, 150, ...],
	 *        ...
	 *    ],
	 *    unload: ["data2", "data3"],
	 *    url: "...",
	 *    done: function() { ... }
	 *  });
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

		// use cache if exists
		if ("cacheIds" in args && $$.hasCaches(args.cacheIds, true)) {
			$$.load($$.getCache(args.cacheIds, true), args.done);
			return;
		}

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
	 * @memberOf Chart
	 * @param {Object} args
	 * - If ids given, the data that has specified target id will be unloaded. ids should be String or Array. If ids is not specified, all data will be unloaded.
	 * - If done given, the specified function will be called after data loded.
	 * @example
	 *  // Unload data2 and data3
	 *  chart.unload({
	 *    ids: ["data2", "data3"]
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

		$$.unload($$.mapToTargetIds(args.ids), () => {
			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true,
				withLegend: true
			});

			args.done && args.done();
		});
	}
});
