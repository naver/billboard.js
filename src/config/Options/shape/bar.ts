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
	 * @property {number} [bar.label.threshold=0] Set threshold ratio to show/hide labels.
	 * @property {number} [bar.padding=0] The padding pixel value between each bar.
	 * @property {number} [bar.radius] Set the radius of bar edge in pixel.
	 * - **NOTE:** Works only for non-stacked bar
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
	 * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
	 * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
	 * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
	 * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
	 * @example
	 *  bar: {
	 *      padding: 1,
	 *
	 *      // the 'radius' option can be used only for non-stacking bars
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
	bar_padding: 0,
	bar_radius: <number|{ratio: number}|undefined> undefined,
	bar_radius_ratio: <number|undefined> undefined,
	bar_sensitivity: 2,
	bar_width: <number|{ratio?: number; max?: number;}|undefined> undefined,
	bar_width_ratio: 0.6,
	bar_width_max: undefined,
	bar_zerobased: true
};
