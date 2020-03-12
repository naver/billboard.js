/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
export default {
	/**
	 * Set subchart options
	 * @name subchart
	 * @memberof Options
	 * @type {Object}
	 * @property {Boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
	 * @property {Boolean} [subchart.axis.x.show=true] Show or hide x axis.
	 * @property {Boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
	 * @property {Boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
	 * @property {Number} [subchart.size.height] Change the height of the subchart.
	 * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
	 *  Specified function receives the current zoomed x domain.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
	 * @example
	 *  subchart: {
	 *      axis: {
	 *      	x: {
	 *      	  show: true,
	 *      	    tick: {
	 *      	      show: true,
	 *      	      text: {
	 *      	        show: false
	 *      	      }
	 *      	    }
	 *      	}
	 *      },
	 *      show: true,
	 *      size: {
	 *          height: 20
	 *      },
	 *      onbrush: function(domain) { ... }
	 *  }
	 */
	subchart_show: false,
	subchart_size_height: 60,
	subchart_axis_x_show: true,
	subchart_axis_x_tick_show: true,
	subchart_axis_x_tick_text_show: true,
	subchart_onbrush: () => {}
};
