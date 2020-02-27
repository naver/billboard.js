/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";

/**
 * Main chart class.
 * - Note: Instantiated via `bb.generate()`.
 * @class Chart
 * @example
 * var chart = bb.generate({
 *  data: {
 *    columns: [
 *	    ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
 * 	    ["count1", 11, 8, 7, 6, 5 ],
 *	    ["count2", 9, 3, 6, 2, 8 ]
 *   ]}
 * }
 * @see {@link bb.generate} for the initialization.
*/
/**
 * Access instance's primary node elements
 * @member {Object} $
 * @property {Object} $
 * @property {d3.selection} $.chart Wrapper element
 * @property {d3.selection} $.svg Main svg element
 * @property {d3.selection} $.defs Definition element
 * @property {d3.selection} $.main Main grouping element
 * @property {d3.selection} $.tooltip Tooltip element
 * @property {d3.selection} $.legend Legend element
 * @property {d3.selection} $.title Title element
 * @property {d3.selection} $.grid Grid element
 * @property {d3.selection} $.arc Arc element
 * @property {Object} $.bar
 * @property {d3.selection} $.bar.bars Bar elements
 * @property {Object} $.line
 * @property {d3.selection} $.line.lines Line elements
 * @property {d3.selection} $.line.areas Areas elements
 * @property {d3.selection} $.line.circles Data point circle elements
 * @property {Object} $.text
 * @property {d3.selection} $.text.texts Data label text elements
 * @memberof Chart
 * @example
 * var chart = bb.generate({ ... });
 *
 * chart.$.chart; // wrapper element
 * chart.$.line.circles;  // all data point circle elements
 */
export default class Chart {
	constructor(config) {
		const $$ = new ChartInternal(this);

		/**
		 * Plugin instance array
		 * @member {Array} plugins
		 * @memberof Chart
		 * @instance
 	 	 * @example
		 *  var chart = bb.generate({
		 *     ...
		 *     plugins: [
		 *        new bb.plugin.stanford({ ... }),
		 *        new PluginA()
		 *     ]
		 *  });
		 *
		 *  chart.plugins; // [Stanford, PluginA] - instance array
		 */
		this.plugins = [];
		this.internal = $$;

		$$.loadConfig(config);
		$$.beforeInit(config);
		$$.init();

		// bind "this" to nested API
		(function bindThis(fn, target, argThis) {
			Object.keys(fn).forEach(key => {
				target[key] = fn[key].bind(argThis);

				Object.keys(fn[key]).length &&
					bindThis(fn[key], target[key], argThis);
			});
		})(Chart.prototype, this, this);
	}
}
