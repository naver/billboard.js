/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
export default {
	/**
	 * Set polar options
	 * @name polar
	 * @memberof Options
	 * @type {object}
	 * @property {object} polar Polar object
	 * @property {number} [polar.level.depth=3] Set the level depth.
	 * @property {boolean} [polar.level.show=true] Show or hide level.
	 * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
	 * @property {boolean} [polar.level.text.show=true] Show or hide level text.
	 * @property {number} [polar.size.max=undefined] Set the chart size. Same as setting the max value of the polar chart. If not given, it'll take the max value from the given data.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @see [Demo: polar level](https://naver.github.io/billboard.js/demo/#PolarChartOptions.PolarLevel)
	 * @see [Demo: polar size](https://naver.github.io/billboard.js/demo/#PolarChartOptions.PolarSize)
	 * @example
	 *  polar: {
	 *      level: {
	 *          depth: 3,
	 *          show: true,
	 *          text: {
	 *              format: function(x) {
	 *                  return x + "%";
	 *              },
	 *              show: true
	 *          }
	 *      },
	 *      size: {
	 *          max: 200
	 *      }
	 *  }
	 */
	polar_level_depth: 3,
	polar_level_show: true,
	polar_level_text_format: (x: number) => (x % 1 === 0 ? x : x.toFixed(2)),
	polar_level_text_show: true,
	polar_size_max: <number|undefined> undefined,
};
