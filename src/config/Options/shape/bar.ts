/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bar config options
 */
export default {
	/**
	 * Set bar options
	 * @name bar
	 * @memberof Options
	 * @type {object}
	 * @property {object} bar Bar object
	 * @property {number} [bar.indices.removeNull=false] Remove nullish data on bar indices positions.
	 * @property {number} [bar.label.threshold=0] Set threshold ratio to show/hide labels.
	 * @property {boolean|object} [bar.linearGradient=false] Set the linear gradient on bar.<br><br>
	 * Or customize by giving below object value:
	 *  - x {Array}: `x1`, `x2` value
	 *  - y {Array}: `y1`, `y2` value
	 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
	 * @property {boolean} [bar.overlap=false] Bars will be rendered at same position, which will be overlapped each other. (for non-grouped bars only)
	 * @property {number} [bar.padding=0] The padding pixel value between each bar.
	 * @property {number} [bar.radius] Set the radius of bar edge in pixel.
	 * @property {number} [bar.radius.ratio] Set the radius ratio of bar edge in relative the bar's width.
	 * @property {number} [bar.sensitivity=2] The senstivity offset value for interaction boundary.
	 * @property {number} [bar.width] Change the width of bar chart.
	 * @property {number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
	 * @property {number} [bar.width.max] The maximum width value for ratio.
	 * @property {number} [bar.width.dataname] Change the width of bar for indicated dataset only.
	 * - **NOTE:**
	 *   - Works only for non-stacked bar
	 *   - Bars are centered accoding its total width value
	 * @property {number} [bar.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
	 * @property {number} [bar.width.dataname.max] The maximum width value for ratio.
	 * @property {boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
	 * @see [Demo: bar indices](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarIndices)
	 * @see [Demo: bar overlap](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarOverlap)
	 * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
	 * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
	 * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
	 * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
	 * @example
	 *  bar: {
	 *      // remove nullish data on bar indices postions
	 *      indices: {
	 *          removeNull: true
	 *      },
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
	 *      },
	 *
	 *      // remove nullish da
	 *      overlap: true,
	 *
	 *      padding: 1,
	 *
	 *      // bar radius
	 *      radius: 10,
	 *      // or
	 *      radius: {
	 *          ratio: 0.5
	 *      }
	 *
	 *      label: {
	 *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the y Axis domain range value.
	 *          // if data value is below than 0.1, text label will be hidden.
	 *          threshold: 0.1,
	 *      },
	 *
	 *      // will not have offset between each bar elements for interaction
	 *      sensitivity: 0,
	 *
	 *      width: 10,
	 *
	 *      // or
	 *      width: {
	 *          ratio: 0.2,
	 *          max: 20
	 *      },
	 *
	 *      // or specify width per dataset
	 *      width: {
	 *          data1: 20,
	 *          data2: {
	 *              ratio: 0.2,
	 *              max: 20
	 *          }
	 *      },
	 *
	 *      zerobased: false
	 *  }
	 */
	bar_label_threshold: 0,
	bar_linearGradient: <
	boolean|{x?: number[]; y?: number[]; stops?: [number, string|Function|null, number]}
	> false,
	bar_indices_removeNull: false,
	bar_overlap: false,
	bar_padding: 0,
	bar_radius: <number|{ratio: number}|undefined> undefined,
	bar_radius_ratio: <number|undefined> undefined,
	bar_sensitivity: 2,
	bar_width: <number|{ratio?: number; max?: number;}|undefined> undefined,
	bar_width_ratio: 0.6,
	bar_width_max: undefined,
	bar_zerobased: true
};
