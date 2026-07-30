/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {ChartTypes} from "../../../../types/types";

/**
 * x Axis config options
 */
export default {
	/**
	 * Set subchart options.
	 * - **NOTE:** Not supported for non-Axis based(pie, donut, gauge, radar) types.
	 * @name subchart
	 * @memberof Options
	 * @type {object}
	 * @property {object} subchart Subchart object
	 * @property {boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
	 *  - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
	 *    - `show: subchart()`
	 * @property {string} [subchart.type] Set chart type for the subchart. Defaults to data.type.
	 * @property {object} [subchart.types] Set chart type for each data in the subchart. Defaults to data.types.
	 * @property {boolean} [subchart.brush.enabled=true] Enable subchart brush interaction.
	 * @property {boolean} [subchart.showHandle=false] Show sub chart's handle.
	 * @property {boolean} [subchart.grid.focus.continuous=false] Render x focus grid line as one continuous line across main chart and subchart when subchart brush is disabled.
	 * @property {boolean} [subchart.axis.x.show=true] Show or hide x axis.
	 * @property {boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
	 * @property {number} [subchart.axis.x.tick.count] Set the number of x axis ticks.
	 * @property {Array|function} [subchart.axis.x.tick.values] Set x axis tick values manually.
	 * @property {boolean|object} [subchart.axis.x.tick.culling] Setting for culling x axis ticks.
	 * @property {number} [subchart.axis.x.tick.culling.max] The number of x axis tick texts will be adjusted to less than this value.
	 * @property {boolean} [subchart.axis.x.tick.culling.lines=true] Control x axis tick line visibility within culling option.
	 * @property {boolean} [subchart.axis.x.tick.culling.reverse=false] Control x axis culling start point to be reversed.
	 * @property {boolean} [subchart.axis.x.tick.outer] Show or hide x axis outer tick.
	 * @property {function|string} [subchart.axis.x.tick.format] Use custom format for x axis ticks - see [axis.x.tick.format](#.axis․x․tick․format) for details.
	 * @property {boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
	 * @property {boolean} [subchart.axis.y.show=false] Show or hide y axis.
	 * @property {boolean} [subchart.axis.y.tick.show=true] Show or hide y axis tick line.
	 * @property {number} [subchart.axis.y.tick.count] Set the number of y axis ticks.
	 * @property {Array|function} [subchart.axis.y.tick.values] Set y axis tick values manually.
	 * @property {boolean|object} [subchart.axis.y.tick.culling] Setting for culling y axis ticks.
	 * @property {number} [subchart.axis.y.tick.culling.max] The number of y axis tick texts will be adjusted to less than this value.
	 * @property {boolean} [subchart.axis.y.tick.culling.lines=true] Control y axis tick line visibility within culling option.
	 * @property {boolean} [subchart.axis.y.tick.culling.reverse=false] Control y axis culling start point to be reversed.
	 * @property {boolean} [subchart.axis.y.tick.outer] Show or hide y axis outer tick.
	 * @property {function|string} [subchart.axis.y.tick.format] Use custom format for y axis ticks - see [axis.y.tick.format](#.axis․y․tick․format) for details.
	 * @property {boolean} [subchart.axis.y.tick.text.show=true] Show or hide y axis tick text.
	 * @property {boolean} [subchart.axis.y2.show=false] Show or hide y2 axis.
	 * @property {boolean} [subchart.axis.y2.tick.show=true] Show or hide y2 axis tick line.
	 * @property {number} [subchart.axis.y2.tick.count] Set the number of y2 axis ticks.
	 * @property {Array|function} [subchart.axis.y2.tick.values] Set y2 axis tick values manually.
	 * @property {boolean|object} [subchart.axis.y2.tick.culling] Setting for culling y2 axis ticks.
	 * @property {number} [subchart.axis.y2.tick.culling.max] The number of y2 axis tick texts will be adjusted to less than this value.
	 * @property {boolean} [subchart.axis.y2.tick.culling.lines=true] Control y2 axis tick line visibility within culling option.
	 * @property {boolean} [subchart.axis.y2.tick.culling.reverse=false] Control y2 axis culling start point to be reversed.
	 * @property {boolean} [subchart.axis.y2.tick.outer] Show or hide y2 axis outer tick.
	 * @property {function|string} [subchart.axis.y2.tick.format] Use custom format for y2 axis ticks - see [axis.y2.tick.format](#.axis․y2․tick․format) for details.
	 * @property {boolean} [subchart.axis.y2.tick.text.show=true] Show or hide y2 axis tick text.
	 * @property {Array} [subchart.init.range] Set initial selection domain range.
	 * @property {number} [subchart.size.height] Change the height of the subchart.
	 * @property {function} [subchart.onbrush] Set callback for brush event.<br>
	 *  Specified function receives the current zoomed x domain.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
	 * @example
	 *  subchart: {
	 *      show: true,
	 *      showHandle: true,
	 *
	 *      // render the overview with a different chart type than the main chart
	 *      type: "bar",
	 *
	 *      // override the type per data series
	 *      types: {
	 *      	data2: "area"
	 *      },
	 *      size: {
	 *          height: 20
	 *      },
	 *      brush: {
	 *      	// disable brush(zoom) interaction, rendering the subchart as a static overview
	 *      	enabled: false
	 *      },
	 *      grid: {
	 *      	focus: {
	 *      		// NOTE: works only when 'brush.enabled=false'
	 *      		continuous: true
	 *      	}
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
	 *      	},
	 *      	y: {
	 *      	  show: true,
	 *      	    tick: {
	 *      	      count: 3
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
	subchart_type: <ChartTypes | undefined>undefined,
	subchart_types: <Record<string, ChartTypes>>{},
	subchart_brush_enabled: true,
	subchart_showHandle: false,
	subchart_size_height: 60,
	subchart_grid_focus_continuous: false,
	subchart_axis_x_show: true,
	subchart_axis_x_tick_show: true,
	subchart_axis_x_tick_count: <number | undefined>undefined,
	subchart_axis_x_tick_values: <(string | Date | number)[] | (() => (string | Date | number)[])
		| undefined>undefined,
	subchart_axis_x_tick_culling: <boolean | object | undefined>undefined,
	subchart_axis_x_tick_culling_max: <number | undefined>undefined,
	subchart_axis_x_tick_culling_lines: <boolean | undefined>undefined,
	subchart_axis_x_tick_culling_reverse: <boolean | undefined>undefined,
	subchart_axis_x_tick_outer: <boolean | undefined>undefined,
	subchart_axis_x_tick_format: <Function | string | undefined>undefined,
	subchart_axis_x_tick_text_show: true,
	subchart_axis_y_show: false,
	subchart_axis_y_tick_show: true,
	subchart_axis_y_tick_count: <number | undefined>undefined,
	subchart_axis_y_tick_values: <number[] | (() => number[]) | undefined>undefined,
	subchart_axis_y_tick_culling: <boolean | object | undefined>undefined,
	subchart_axis_y_tick_culling_max: <number | undefined>undefined,
	subchart_axis_y_tick_culling_lines: <boolean | undefined>undefined,
	subchart_axis_y_tick_culling_reverse: <boolean | undefined>undefined,
	subchart_axis_y_tick_outer: <boolean | undefined>undefined,
	subchart_axis_y_tick_format: <Function | string | undefined>undefined,
	subchart_axis_y_tick_text_show: true,
	subchart_axis_y2_show: false,
	subchart_axis_y2_tick_show: true,
	subchart_axis_y2_tick_count: <number | undefined>undefined,
	subchart_axis_y2_tick_values: <number[] | (() => number[]) | undefined>undefined,
	subchart_axis_y2_tick_culling: <boolean | object | undefined>undefined,
	subchart_axis_y2_tick_culling_max: <number | undefined>undefined,
	subchart_axis_y2_tick_culling_lines: <boolean | undefined>undefined,
	subchart_axis_y2_tick_culling_reverse: <boolean | undefined>undefined,
	subchart_axis_y2_tick_outer: <boolean | undefined>undefined,
	subchart_axis_y2_tick_format: <Function | string | undefined>undefined,
	subchart_axis_y2_tick_text_show: true,
	subchart_init_range: <undefined | [number, number]>undefined,
	subchart_onbrush: () => {}
};
