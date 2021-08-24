/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
export default {
	/**
	 * Set subchart options.
	 * - **NOTE:** Not supported for `bubble`, `scatter` and non-Axis based(pie, donut, gauge, radar) types.
	 * @name subchart
	 * @memberof Options
	 * @type {object}
	 * @property {object} subchart Subchart object
	 * @property {boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
	 *  - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
	 *    - `show: subchart()`
	 * @property {boolean} [subchart.showHandle=false] Show sub chart's handle.
	 * @property {boolean} [subchart.axis.x.show=true] Show or hide x axis.
	 * @property {boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
	 * @property {Function|string} [subchart.axis.x.tick.format] Use custom format for x axis ticks - see [axis.x.tick.format](#.axis․x․tick․format) for details.
	 * @property {boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
	 * @property {Array} [subchart.init.range] Set initial selection domain range.
	 * @property {number} [subchart.size.height] Change the height of the subchart.
	 * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
	 *  Specified function receives the current zoomed x domain.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
	 * @example
	 *  subchart: {
	 *      show: true,
	 *      showHandle: true,
	 *      size: {
	 *          height: 20
	 *      },
	 *      init: {
	 *          // specify initial range domain selection
	 *          range: [1, 2]
	 *      },
	 *      axis: {
	 *      	x: {
	 *      	  show: true,
	 *      	    tick: {
	 *      	      show: true,
	 *      	      format: (x) => d3Format(".1f")(x)
	 *      	      text: {
	 *      	        show: false
	 *      	      }
	 *      	    }
	 *      	}
	 *      },
	 *      onbrush: function(domain) { ... }
	 *  }
	 * @example
	 * // importing ESM
	 * import bb, {subchart} from "billboard.js";
	 *
	 * subchart: {
	 *      show: subchart(),
	 *      ...
	 * }
	 */
	subchart_show: false,
	subchart_showHandle: false,
	subchart_size_height: 60,
	subchart_axis_x_show: true,
	subchart_axis_x_tick_show: true,
	subchart_axis_x_tick_format: <Function|string|undefined> undefined,
	subchart_axis_x_tick_text_show: true,
	subchart_init_range: <undefined|[number, number]> undefined,
	subchart_onbrush: () => {}
};
