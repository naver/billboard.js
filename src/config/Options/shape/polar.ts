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
	 * @property {number} [polar.level.max=undefined] Set the chart size. Same as setting the max value of the polar chart. If not given, it'll take the max value from the given data.
	 * @property {boolean} [polar.level.show=true] Show or hide level.
	 * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
	 * @property {boolean} [polar.level.text.show=true] Show or hide level text.
	 * @property {number} [polar.padAngle=0] Set padding between polar arcs.
	 * @property {number} [polar.padding=0] Sets the gap between polar arcs.
	 * @property {number} [polar.startingAngle=0] Set starting angle where data draws.
	 * @property {number} [polar.size.ratio=0.87] Set size ratio.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @see [Demo: pad angle](https://naver.github.io/billboard.js/demo/#PolarChartOptions.PadAngle)
	 * @see [Demo: padding](https://naver.github.io/billboard.js/demo/#PolarChartOptions.Padding)
	 * @see [Demo: polar level](https://naver.github.io/billboard.js/demo/#PolarChartOptions.PolarLevel)
	 * @see [Demo: polar size](https://naver.github.io/billboard.js/demo/#PolarChartOptions.PolarSize)
	 * @see [Demo: starting angle](https://naver.github.io/billboard.js/demo/#PolarChartOptions.StartingAngle)
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
	 *          ratio: 0.7
	 *      },
	 *      padAngle: 0.1,
	 *      padding: 0,
	 *      startingAngle: 1
	 *  }
	 */
	polar_level_depth: 3,
	polar_level_max: <number|undefined> undefined,
	polar_level_show: true,
	polar_level_text_format: (x: number) => (x % 1 === 0 ? x : x.toFixed(2)),
	polar_level_text_show: true,
	polar_size_ratio: 0.87,
	polar_padAngle: 0,
	polar_padding: 0,
	polar_startingAngle: 0
};
