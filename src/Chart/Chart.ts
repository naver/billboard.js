/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../ChartInternal/ChartInternal";
import {loadConfig} from "../config/config";
import {extend, isFunction} from "../module/util";
import Plugin from "../Plugin/Plugin";

import apiAxis from "./api/axis";
import apiCategory from "./api/category";
import apiChart from "./api/chart";
import apiColor from "./api/color";
import apiData from "./api/data";
import apiExport from "./api/export";
import apiFlow from "./api/flow";
import apiFocus from "./api/focus";
import apiXGrid from "./api/grid.x";
import apiYGrid from "./api/grid.y";
import apiGroup from "./api/group";
import apiLegend from "./api/legend";
import apiLoad from "./api/load";
import apiRegion from "./api/regions";
import apiSelection from "./api/selection";
import apiShow from "./api/show";
import apiTooltip from "./api/tooltip";
import apiX from "./api/x";
import apiZoom from "./api/zoom";

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
	public plugins: Plugin[] = [];
	public internal: ChartInternal;

	constructor(options) {
		const ctx = this;
		const $$ = new ChartInternal(ctx);

		this.internal = $$;

		bindThis(Chart.prototype, this, this);
		loadConfig.call($$, options);

		$$.beforeInit();
		$$.init();
		$$.afterInit();
	}
}

// bind to namespaced APIs
function bindThis(fn, target, argThis) {
	Object.keys(fn).forEach(key => {
		const isFunc = isFunction(fn[key]);
		const isChild = target !== argThis;
		const hasChild = Object.keys(fn[key]).length > 0;

		if (isFunc && (!isChild && hasChild || isChild)) {
			target[key] = fn[key].bind(argThis);
		} else if (!isFunc) {
			target[key] = {}
		}

		hasChild && bindThis(fn[key], target[key], argThis);
	});
};

// extend API as part of Chart class
extend(Chart.prototype, [
	apiAxis,
	apiCategory,
	apiChart,
	apiColor,
	apiData,
	apiExport,
	apiFlow,
	apiFocus,
	apiXGrid,
	apiYGrid,
	apiGroup,
	apiLegend,
	apiLoad,
	apiRegion,
	apiSelection,
	apiShow,
	apiTooltip,
	apiX,
	apiZoom
]);
