/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * radar config options
 */
export default {
	/**
	 * Set radar options
	 * - **NOTE:**
	 *  > When x tick text contains `\n`, it's used as line break.
	 * @name radar
	 * @memberof Options
	 * @type {object}
	 * @property {object} radar Radar object
	 * @property {number} [radar.axis.max=undefined] The max value of axis. If not given, it'll take the max value from the given data.
	 * @property {boolean} [radar.axis.line.show=true] Show or hide axis line.
	 * @property {number} [radar.axis.text.position.x=0] x coordinate position, relative the original.
	 * @property {number} [radar.axis.text.position.y=0] y coordinate position, relative the original.
	 * @property {boolean} [radar.axis.text.show=true] Show or hide axis text.
	 * @property {boolean} [radar.direction.clockwise=false] Set the direction to be drawn.
	 * @property {number} [radar.level.depth=3] Set the level depth.
	 * @property {boolean} [radar.level.show=true] Show or hide level.
	 * @property {Function} [radar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
	 * @property {boolean} [radar.level.text.show=true] Show or hide level text.
	 * @property {number} [radar.size.ratio=0.87] Set size ratio.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.RadarChart)
	 * @see [Demo: radar axis](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxis)
	 * @see [Demo: radar level](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarLevel)
	 * @see [Demo: radar size](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarSize)
	 * @see [Demo: radar axis multiline](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxisMultiline)
	 * @example
	 *  radar: {
	 *      axis: {
	 *          max: 50,
	 *          line: {
	 *              show: false
	 *          },
	 *          text: {
	 *              position: {
	 *              	x: 0,
	 *              	y: 0
	 *              },
	 *              show: false
	 *          }
	 *      },
	 *      direction: {
	 *          clockwise: true
	 *      },
	 *      level: {
	 *          show: false,
	 *          text: {
	 *              format: function(x) {
	 *                  return x + "%";
	 *              },
	 *              show: true
	 *          }
	 *      },
	 *      size: {
	 *          ratio: 0.7
	 *      }
	 *  }
	 */
	radar_axis_max: <number|undefined> undefined,
	radar_axis_line_show: true,
	radar_axis_text_show: true,
	radar_axis_text_position: <{x?: number; y?: number;}> {},
	radar_level_depth: 3,
	radar_level_show: true,
	radar_level_text_format: (x: number) => (x % 1 === 0 ? x : x.toFixed(2)),
	radar_level_text_show: true,
	radar_size_ratio: 0.87,
	radar_direction_clockwise: false
};
