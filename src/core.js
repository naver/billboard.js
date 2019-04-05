/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
import Chart from "./internals/Chart";
import ChartInternal from "./internals/ChartInternal";
import Axis from "./axis/Axis";
import {isObject, mergeObj} from "./internals/util";

import "./config/config";
import "./internals/scale";
import "./internals/domain";
import "./data/data";
import "./data/data.convert";
import "./data/data.load";
import "./internals/category";
import "./interactions/interaction";
import "./internals/size";
import "./shape/shape";
import "./shape/arc";
import "./shape/bar";
import "./shape/bubble";
import "./shape/line";
import "./shape/point";
import "./shape/radar";
import "./internals/text";
import "./internals/type";
import "./internals/grid";
import "./internals/tooltip";
import "./internals/legend";
import "./internals/title";
import "./internals/clip";
import "./internals/region";
import "./interactions/drag";
import "./internals/selection";
import "./interactions/subchart";
import "./interactions/zoom";
import "./internals/color";
import "./internals/format";
import "./internals/cache";
import "./internals/class";
import "./api/api.focus";
import "./api/api.show";
import "./api/api.zoom";
import "./api/api.load";
import "./api/api.flow";
import "./api/api.selection";
import "./api/api.transform";
import "./api/api.group";
import "./api/api.grid";
import "./api/api.region";
import "./api/api.data";
import "./api/api.category";
import "./api/api.color";
import "./api/api.x";
import "./api/api.axis";
import "./api/api.legend";
import "./api/api.chart";
import "./api/api.tooltip";
import "./api/api.export";

let defaults = {};

/**
 * @namespace bb
 * @version #__VERSION__#
 */
const bb = {
	/**
	 * Version information
	 * @property {String} version version
	 * @example
	 *    bb.version;  // "1.0.0"
	 * @memberof bb
	 */
	version: "#__VERSION__#",

	/**
	 * Generate chart
	 * @param {Options} options chart options
	 * @memberof bb
	 * @return {Chart}
	 * @see {@link Options} for different generation options
	 * @see {@link Chart} for different methods API
	 * @example
	 *  <!-- chart holder -->
	 * <div id="LineChart"></div>
	 * @example
	 *   // generate chart with options
	 *  var chart = bb.generate({
	 *      "bindto": "#LineChart"
	 *      "data": {
	 *          "columns": [
	 *              ["data1", 30, 200, 100, 400, 150, 250],
	 *              ["data2", 50, 20, 10, 40, 15, 25]
	 *           ]
	 *      }
	 *  });
	 *
	 *  // call some API
	 *  // ex) get the data of 'data1'
	 *  chart.data("data1");
	 */
	generate(config) {
		const options = mergeObj({}, defaults, config);
		const inst = new Chart(options);

		inst.internal.charts = this.instance;
		this.instance.push(inst);

		return inst;
	},

	/**
	 * Set or get global default options.
	 * - **NOTE:**
	 *   - The options values settings are valid within page context only.
	 *   - If is called multiple times, will override the last value.
	 * @param {Options} options chart options
	 * @memberof bb
	 * @return {Options}
	 * @see {@link Options}
	 * @example
	 * // Set same option value as for `.generate()`
	 * bb.defaults({
	 *   data: {
	 *     type: "bar"
	 *   }
	 * });
	 *
	 * bb.defaults();  // {data:{type: "bar"}}
	 *
	 * // data.type defaults to 'bar'
	 * var chart = bb.generate({ ... });
	 */
	defaults(options) {
		if (isObject(options)) {
			defaults = options;
		}

		return defaults;
	},

	/**
	 * An array containing instance created
	 * @property {Array} instance instance array
	 * @example
	 *  // generate charts
	 *  var chart1 = bb.generate(...);
	 *  var chart2 = bb.generate(...);
	 *
	 *  bb.instance;  // [ chart1, chart2, ... ]
	 * @memberof bb
	 */
	instance: [],

	/**
	 * Namespace for plugins
	 * @property {Object} plugin plugin namespace
	 * @example
	 *  // Stanford diagram plugin
	 *  bb.plugin.stanford;
	 * @memberof bb
	 */
	plugin: {},

	/**
	 * Internal chart object
	 * @private
	 */
	chart: {
		fn: Chart.prototype,
		internal: {
			fn: ChartInternal.prototype,
			axis: {
				fn: Axis.prototype
			}
		}
	}
};

export {bb};
export default bb;
