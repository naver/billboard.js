/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * candlestick config options
 */
export default {
	/**
	 * Set candlestick options
	 * @name candlestick
	 * @memberof Options
	 * @type {object}
	 * @property {object} candlestick Candlestick object
	 * @property {number} [candlestick.width] Change the width.
	 * @property {number} [candlestick.width.ratio=0.6] Change the width by ratio.
	 * @property {number} [candlestick.width.max] The maximum width value for ratio.
	 * @property {number} [candlestick.width.dataname] Change the width for indicated dataset only.
	 * @property {number} [candlestick.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
	 * @property {number} [candlestick.width.dataname.max] The maximum width value for ratio.
	 * @property {object} [candlestick.color] Color setting.
	 * @property {string|object} [candlestick.color.down] Change down(bearish) value color.
	 * @property {string} [candlestick.color.down.dataname] Change down value color for indicated dataset only.
	 *
	 * @see [Demo](https://naver.github.io/billboard.js/demo/##Chart.CandlestickChart)
	 * @example
	 *  candlestick: {
	 *      width: 10,
	 *
	 *      // or
	 *      width: {
	 *         	ratio: 0.2,
	 *         	max: 20
	 *      },
	 *
	 *      // or specify width per dataset
	 *      width: {
	 *         	data1: 20,
	 *         	data2: {
	 *         	    ratio: 0.2,
	 *         		max: 20
	 *         	}
	 *      },
	 *      color: {
	 *  	  	// spcify bearish color
	 *  	  	down: "red",
	 *
	 *  	  	// or specify color per dataset
	 *  	  	down: {
	 *  	  		data1: "red",
	 *  	  		data2: "blue",
	 *  	  	}
	 *      }
	 *  }
	 */
	candlestick_width: <number|{ratio?: number; max?: number;}|undefined> undefined,
	candlestick_width_ratio: 0.6,
	candlestick_width_max: undefined,
	candlestick_color_down: <string|{[key: string]: string}> "red"
};
