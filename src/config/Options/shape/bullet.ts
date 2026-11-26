/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bullet config options
 */
export default {
	/**
	 * Set bullet options.<br><br>
	 * The bullet chart (a.k.a. bullet graph) compares a single quantitative measure
	 * against qualitative ranges and an optional comparative target marker.<br>
	 * Each data series renders as one bullet, using the last data value of the series as the measure.<br>
	 * By default the scale of a bullet includes everything drawn and 0, and the measure is drawn from the 0 position to its value: a negative value extends the scale below 0, and its label is placed at the 0 position. Use `bullet.axis.min` and `bullet.axis.max` to set the scale, and to share it between the bullets.<br>
	 * [data.onover](#.data․onover), [data.onout](#.data․onout) and [data.onclick](#.data․onclick) are called with the row of the bullet when its measure or its target markers are hovered or clicked. The range bands are not the data of the row. Use `bullet.rotated` to switch between
	 * horizontal (default) and vertical layouts, and `bullet.type` to render the
	 * measure as a solid bar or as a dot marker.
	 * @name bullet
	 * @memberof Options
	 * @type {object}
	 * @property {object} bullet Bullet object
	 * @property {boolean} [bullet.rotated=false] Set bullet orientation.<br>When `false`, bullets are rendered horizontally (measure grows to the right). When `true`, bullets are rendered vertically (measure grows upward).
	 * @property {string} [bullet.type="bar"] Set how the measure value is rendered.<br>
	 * - **Available type values:**
	 *   - `bar`: render the measure as a solid bar growing from the baseline.
	 *   - `dot`: render the measure as a dot marker positioned at the measure value.
	 * @property {number} [bullet.marker.size=0] Set the dot radius (in px) used when `bullet.type="dot"`. When `0`, the radius is derived from the bullet thickness.
	 * @property {Array|function|object} [bullet.ranges] Set the qualitative range band thresholds.<br>
	 *  - Can be given as:
	 *    - `Array`: shared ascending thresholds applied to every bullet (e.g. `[50, 75, 90]`).
	 *    - `object`: per-data-id thresholds (e.g. `{data1: [50, 75, 90]}`).
	 *    - `Function`: callback `function(id, value) { return [...] }` returning thresholds per bullet.
	 *  - When omitted, three bands are generated automatically from the measure/target domain.
	 * @property {number|Array|function|object} [bullet.target] Set the comparative target marker value.<br>
	 *  - Can be given as a `number` or an `Array` of numbers (shared), an `object` keyed by data id (a number or an Array of numbers), or a `Function` `function(id, value) { return number | number[] }`.
	 *  - Give an `Array` to draw more than one marker for a bullet (e.g. a warning and an error line). All the markers share the same style: `.bb-bullet-target`.
	 * @property {object} [bullet.width] Set the thickness of the measure and the length of the target marker.
	 * @property {number} [bullet.width.ratio=0.35] Set the measure thickness as a ratio (0~1) of the bullet band.
	 * @property {object} [bullet.width.target] Set the target marker length.
	 * @property {number} [bullet.width.target.ratio=0.6] Set the target marker length as a ratio (0~1) of the bullet band.
	 * @property {Array|function} [bullet.range.colors] Set the qualitative range band colors.<br>
	 *  - Can be given as an `Array` of color strings (ordered from the smallest to the largest band) or a `Function` `function(index, length) { return color }`. When omitted, the grayscale of the theme is used: the lightness of the first (smallest) and the last band are the CSS variables `--bb-bullet-range-min` and `--bb-bullet-range-max` of `.bb-chart-bullets` (default `55%` and `90%`, the dark themes use darker ones), and the bands in between are interpolated.
	 * @property {number} [bullet.padding=4] Set the padding (in px) between each bullet band.
	 * @property {boolean} [bullet.axis.show=true] Show or hide the quantitative scale axis drawn under (beside, when rotated) each bullet.
	 * @property {number} [bullet.axis.min] Set the min value of the scale of every bullet. When not given, the scale of each bullet is calculated from its values and ranges, so bullets do not share the scale.<br>
	 *  - Set both `min` and `max` to make the bullets share the same scale.
	 *  - A value out of the scale is drawn up to the end of the axis, and a target out of the scale is not drawn.
	 *  - When the scale does not include 0, the measure is drawn from the end of the axis nearest to 0.
	 *  - When `min` is not less than `max`, both are ignored.
	 * @property {number} [bullet.axis.max] Set the max value of the scale of every bullet. See `bullet.axis.min`.
	 * @property {number} [bullet.axis.tick.count] Set the approximate number of the ticks of the axis. D3 picks round values, so the actual number can differ. When not given, it follows the length of the axis.
	 * @property {Array} [bullet.axis.tick.values] Set the values of the ticks. The values out of the scale are not drawn. It takes precedence over `bullet.axis.tick.count`.
	 * @property {function} [bullet.axis.tick.format] Set the format of the tick labels.<br>
	 *  - **Arguments:**
	 *    - `value {number}`: Tick value
	 * @property {boolean} [bullet.title.show=false] Show or hide the title of each bullet.<br>
	 * The title is drawn on the left of the bullet (under the column, when rotated), so the bullets can be told apart without the legend. A long title takes the room of the bullet.
	 * @property {object|function} [bullet.title.text] Set the text of the title. By default it is the data name (`data.names`), or the data id.<br>
	 *  - Can be given as an `object` keyed by data id, or a `Function` `function(id, value) { return string }`.
	 * @property {boolean} [bullet.label.show=true] Show or hide the measure value label.<br>
	 * The label is the data label of the measure: it is drawn when [data.labels](#.data․labels) is set, and customized by its options (`format`, `colors`, `position`, `centered`, `rotate`, `border`, `image`).
	 * @property {function} [bullet.label.format] Set a formatter for the measure value label.<br>
	 * Takes precedence over `data.labels.format`.<br>
	 * - **Arguments:**
	 *   - `value {number}`: Measure value
	 *   - `id {string}`: Data id
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.BulletChart)
	 * @see [Demo: Bullet axis and negative value](https://naver.github.io/billboard.js/demo/#BulletChartOptions.BulletAxis)
	 * @see [Demo: Bullet target and color by value](https://naver.github.io/billboard.js/demo/#BulletChartOptions.BulletTarget)
	 * @see [Demo: Bullet title](https://naver.github.io/billboard.js/demo/#BulletChartOptions.BulletTitle)
	 * @example
	 *  bullet: {
	 *      // render vertically
	 *      rotated: true,
	 *
	 *      // render the measure as a dot marker
	 *      type: "dot",
	 *      marker: {
	 *          size: 6
	 *      },
	 *
	 *      // qualitative range bands (ascending)
	 *      ranges: [50, 75, 90],
	 *
	 *      // or per data id
	 *      // ranges: {data1: [50, 75, 90]},
	 *
	 *      // or as a callback
	 *      // ranges: function(id, value) { return [50, 75, 90]; },
	 *
	 *      // comparative target marker
	 *      target: 85,
	 *
	 *      // or more than one: [70, 85]
	 *      // target: [70, 85],
	 *
	 *      // measure thickness & target marker length, as a ratio of the bullet band
	 *      width: {
	 *          ratio: 0.35,
	 *          target: {
	 *              ratio: 0.6
	 *          }
	 *      },
	 *
	 *      // range band colors
	 *      range: {
	 *          colors: ["#b3b3b3", "#cccccc", "#e6e6e6"]
	 *      },
	 *
	 *      padding: 4,
	 *
	 *      // quantitative scale axis
	 *      axis: {
	 *          show: true,
	 *
	 *          // the scale of every bullet: the bullets share it
	 *          min: 0,
	 *          max: 100,
	 *
	 *          tick: {
	 *              count: 5,
	 *              // values: [0, 50, 100],
	 *              format: function(value) {
	 *                  return value + "%";
	 *              }
	 *          }
	 *      },
	 *
	 *      // title of each bullet
	 *      title: {
	 *          show: true,
	 *          text: function(id, value) {
	 *              return id.toUpperCase();
	 *          }
	 *      },
	 *
	 *      // the value label is a data label: set data.labels to show it
	 *      // data: {labels: true},
	 *      label: {
	 *          show: true,
	 *          format: function(value, id) {
	 *              return value;
	 *          }
	 *      }
	 *  }
	 */
	bullet_rotated: false,
	bullet_type: "bar",
	bullet_marker_size: 0,
	bullet_ranges: <number[] | ((id: string, value: number) => number[]) | {[key: string]: number[]}
		| null>null,
	bullet_target: <number | number[] | ((id: string, value: number) => number | number[]) | {
		[key: string]: number | number[]
	} | null>null,
	bullet_width_ratio: 0.35,
	bullet_width_target_ratio: 0.6,
	bullet_range_colors: <string[] | ((index: number, length: number) => string) | null>null,
	bullet_padding: 4,
	bullet_axis_show: true,
	bullet_axis_min: <number | undefined>undefined,
	bullet_axis_max: <number | undefined>undefined,
	bullet_axis_tick_count: <number | undefined>undefined,
	bullet_axis_tick_values: <number[] | undefined>undefined,
	bullet_axis_tick_format: <((value: number) => string | number) | undefined>undefined,
	bullet_title_show: false,
	bullet_title_text: <((id: string, value: number) => string) | {[key: string]: string}
		| undefined>undefined,
	bullet_label_show: true,
	bullet_label_format: <((value: number, id: string) => string | number) | undefined>undefined
};
