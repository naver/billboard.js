/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * area config options
 */
export default {
	/**
	 * Set area options
	 * @name area
	 * @memberof Options
	 * @type {object}
	 * @property {object} area Area object
	 * @property {boolean} [area.above=false] Set background area `above` the data chart line.
	 * @property {boolean} [area.below=false] Set background area `below` the data chart line.
	 *  - **NOTE**: Can't be used along with `above` option. When above & below options are set to true, `above` will be prioritized.
	 * @property {boolean} [area.front=true] Set area node to be positioned over line node.
	 * @property {boolean|object} [area.linearGradient=false] Set the linear gradient on area.<br><br>
	 * Or customize by giving below object value:
	 *  - x {Array}: `x1`, `x2` value
	 *  - y {Array}: `y1`, `y2` value
	 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
	 * @property {boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
	 * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient), [&lt;stop>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop)
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
	 * @see [Demo: above](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Above)
	 * @see [Demo: below](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Below)
	 * @see [Demo: linearGradient](https://naver.github.io/billboard.js/demo/#AreaChartOptions.LinearGradient)
	 * @example
	 *  area: {
	 *      above: true,
	 *      below: false,
	 *      zerobased: false,
	 *
	 *      // <g class='bb-areas'> will be positioned behind the line <g class='bb-lines'> in stacking order
	 *      front: false,
	 *
	 *      // will generate follwing linearGradient:
	 *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
	 *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
	 *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
	 *      // </linearGradient>
	 *      linearGradient: true,
	 *
	 *      // Or customized gradient
	 *      linearGradient: {
	 *      	x: [0, 0],  // x1, x2 attributes
	 *      	y: [0, 0],  // y1, y2 attributes
	 *      	stops: [
	 *      	  // offset, stop-color, stop-opacity
	 *      	  [0, "#7cb5ec", 1],
	 *
	 *      	  // setting 'null' for stop-color, will set its original data color
	 *      	  [0.5, null, 0],
	 *
	 *      	  // setting 'function' for stop-color, will pass data id as argument.
	 *      	  // It should return color string or null value
	 *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
	 *      	]
	 *      }
	 *  }
	 */
	area_above: false,
	area_below: false,
	area_front: true,
	area_linearGradient: <
	boolean|{x?: number[]; y?: number[]; stops?: [number, string|Function|null, number]}
	> false,
	area_zerobased: true
};
