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
	 * - **NOTE:**
	 *  > When x tick text contains `\n`, it's used as line break.
	 * @name polar
	 * @memberof Options
	 * @type {object}
	 * @property {object} polar Polar object
	 * @property {number} [polar.level.depth=3] Set the level depth.
	 * @property {number} [polar.size.max=undefined] Set the chart size. Same as setting the max value of the polar chart. If not given, it'll take the max value from the given data.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @example
	 *  polar: {
	 * 		level: {
	 * 			depth: 3
	 * 		},
	 * 		size: {
	 * 			max: 200
	 * 		}
	 *  }
	 */
	polar_level_depth: 3,
	polar_size_max: <number|undefined> undefined,
};
