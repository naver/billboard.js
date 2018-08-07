/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "./internals/Chart";
import ChartInternal from "./internals/ChartInternal";
import Axis from "./axis/Axis";
import "./scss/billboard.scss";

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
	 * @memberOf bb
	 */
	version: "#__VERSION__#",

	/**
	 * Generate chart
	 * @param {Options} options chart options
	 * @memberOf bb
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
		const inst = new Chart(config);

		inst.internal.charts = this.instance;
		this.instance.push(inst);

		return inst;
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
	 * @memberOf bb
	 */
	instance: [],

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

require("./config/config.js");
require("./internals/scale.js");
require("./internals/domain.js");
require("./data/data.js");
require("./data/data.convert.js");
require("./data/data.load.js");
require("./internals/category.js");
require("./interactions/interaction.js");
require("./internals/size.js");
require("./shape/shape.js");
require("./shape/arc.js");
require("./shape/bar.js");
require("./shape/bubble.js");
require("./shape/line.js");
require("./shape/point.js");
require("./shape/radar.js");
require("./internals/text.js");
require("./internals/type.js");
require("./internals/grid.js");
require("./internals/tooltip.js");
require("./internals/legend.js");
require("./internals/title.js");
require("./internals/clip.js");
require("./internals/region.js");
require("./interactions/drag.js");
require("./internals/selection.js");
require("./interactions/subchart.js");
require("./interactions/zoom.js");
require("./internals/color.js");
require("./internals/format.js");
require("./internals/cache.js");
require("./internals/class.js");
require("./api/api.focus.js");
require("./api/api.show.js");
require("./api/api.zoom.js");
require("./api/api.load.js");
require("./api/api.flow.js");
require("./api/api.selection.js");
require("./api/api.transform.js");
require("./api/api.group.js");
require("./api/api.grid.js");
require("./api/api.region.js");
require("./api/api.data.js");
require("./api/api.category.js");
require("./api/api.color.js");
require("./api/api.x.js");
require("./api/api.axis.js");
require("./api/api.legend.js");
require("./api/api.chart.js");
require("./api/api.tooltip.js");
require("./axis/bb.axis.js");
require("./internals/ua.js");
require("./api/api.export.js");

export {bb};
export default bb;
