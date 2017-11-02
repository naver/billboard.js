/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import * as d3 from "d3";
import Chart from "./internals/Chart";
import ChartInternal from "./internals/ChartInternal";
import Axis from "./axis/Axis";
import * as util from "./internals/util";
import "./scss/main.scss";

/**
 * @namespace bb
 * @version #__VERSION__#
 */
const bb = {
	/**
	 * Version information
	 * @property {String} version version
	 * @example
	 * 	bb.version;  // "1.0.0"
	 * @memberof bb
	 */
	version: "#__VERSION__#",
	/**
	 * generate charts
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
		return new Chart(config);
	},
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

for (const p in util) {
	!/^__/.test(p) && (ChartInternal.prototype[p] = util[p]);
}

require("./config/config.js");
require("./internals/scale.js");
require("./internals/domain.js");
require("./data/data.js");
require("./data/data.convert.js");
require("./data/data.load.js");
require("./internals/category.js");
require("./interactions/interaction.js");
require("./internals/size.js");
require("./internals/shape.js");
require("./internals/shape.line.js");
require("./internals/shape.point.js");
require("./internals/shape.bar.js");
require("./internals/text.js");
require("./internals/type.js");
require("./internals/grid.js");
require("./internals/tooltip.js");
require("./internals/legend.js");
require("./internals/title.js");
require("./internals/clip.js");
require("./internals/arc.js");
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

export {bb, d3};
