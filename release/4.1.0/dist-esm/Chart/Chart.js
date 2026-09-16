/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isFunction, notEmpty } from "../module/util/type-checks.js";
import { extend } from "../module/util/object.js";
import ChartInternal from "../ChartInternal/ChartInternal.js";
import { loadConfig } from "../config/config.js";
import chart_default from "./api/chart.js";
import color_default from "./api/color.js";
import data_default from "./api/data.js";
import focus_default from "./api/focus.js";
import legend_default from "./api/legend.js";
import load_default from "./api/load.js";
import show_default from "./api/show.js";
import tooltip_default from "./api/tooltip.js";
//#region src/Chart/Chart.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Main chart class.
* - Note: Instantiated via `bb.generate()`.
* @class Chart
* @example
* var chart = bb.generate({
*  data: {
*    columns: [
*        ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
*        ["count1", 11, 8, 7, 6, 5 ],
*        ["count2", 9, 3, 6, 2, 8 ]
*   ]}
* }
* @see {@link bb.generate} for the initialization.
*/
/**
* Access instance's primary node elements
* @member {object} $
* @property {object} $ Access instance's primary node elements
* @property {d3.selection} $.chart Wrapper element
* @property {d3.selection} $.svg Main svg element
* @property {d3.selection} $.defs Definition element
* @property {d3.selection} $.main Main grouping element
* @property {d3.selection} $.needle Needle element
*  - **NOTE:**
*    - The element will have `bb-needle` as class name.
*    - Will provide special helper `.updateHelper(value: number, updateConfig: boolean)` method to facilitate needle position update.
* @property {d3.selection} $.tooltip Tooltip element
* @property {d3.selection} $.legend Legend element
* @property {d3.selection} $.title Title element
* @property {d3.selection} $.grid Grid element
* @property {d3.selection} $.arc Arc element
* @property {d3.selection} $.circles Data point circle elements
* @property {object} $.bar Bar element object
* @property {d3.selection} $.bar.bars Bar elements
* @property {d3.selection} $.candlestick Candlestick elements
* @property {object} $.line Line element object
* @property {d3.selection} $.line.lines Line elements
* @property {d3.selection} $.line.areas Areas elements
* @property {object} $.text Text element object
* @property {d3.selection} $.text.texts Data label text elements
* @memberof Chart
* @example
* const chart = bb.generate({ ... });
*
* chart.$.chart; // wrapper element
* chart.$.line.circles;  // all data point circle elements
* @example
* // Update arc needle position
* const chart = bb.generate({
*   data: {
*     type: "donut"
*   },
*   arc: {
*     needle: {
*       show: true,
*       ...
*     }
*   }
* });
*
* chart.$.needle.updateHelper(70);  // update needle position to point value 70.
*
* // update needle position to point value 70 and the config value.
* // NOTE: updating config value, will update needle pointer initial value too.
* chart.$.needle.updateHelper(70, true);
*
* // update needle point position every 1 second
* let i = 0;
* setInterval(() => {
*   chart.$.needle.updateHelper(i += 10);
* }, 1000)
*/
/**
* Plugin instance array
* @member {Array} plugins
* @memberof Chart
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
var Chart = class Chart {
	plugins = [];
	internal;
	constructor(options) {
		const $$ = new ChartInternal(this);
		this.internal = $$;
		(function bindThis(fn, target, argThis) {
			Object.keys(fn).forEach((key) => {
				const isFunc = isFunction(fn[key]);
				const isChild = target !== argThis;
				const isNotNil = notEmpty(fn[key]);
				const hasChild = isNotNil && Object.keys(fn[key]).length > 0;
				if (isFunc && (!isChild && hasChild || isChild)) target[key] = fn[key].bind(argThis);
				else if (isNotNil && !isFunc) target[key] = {};
				else target[key] = fn[key];
				hasChild && bindThis(fn[key], target[key], argThis);
			});
		})(Chart.prototype, this, this);
		loadConfig.call($$, options);
		$$.beforeInit();
		$$.init();
	}
};
extend(Chart.prototype, [
	chart_default,
	color_default,
	data_default,
	focus_default,
	legend_default,
	load_default,
	show_default,
	tooltip_default
]);
//#endregion
export { Chart as default };
