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
	 * Each data series renders as one bullet. Use `bullet.rotated` to switch between
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
	 * @property {number|function|object} [bullet.target] Set the comparative target marker value.<br>
	 *  - Can be given as a `number` (shared), an `object` keyed by data id, or a `Function` `function(id, value) { return number }`.
	 * @property {object} [bullet.width] Set the measure thickness.
	 * @property {number} [bullet.width.ratio=0.35] Set the measure thickness as a ratio (0~1) of the bullet band.
	 * @property {object} [bullet.target.width] Set the target marker length.
	 * @property {number} [bullet.target.width.ratio=0.6] Set the target marker length as a ratio (0~1) of the bullet band.
	 * @property {Array|function} [bullet.range.colors] Set the qualitative range band colors.<br>
	 *  - Can be given as an `Array` of color strings (ordered from the smallest to the largest band) or a `Function` `function(index, length) { return color }`. When omitted, a grayscale palette is used.
	 * @property {number} [bullet.padding=4] Set the padding (in px) between each bullet band.
	 * @property {boolean} [bullet.label.show=true] Show or hide the measure value label.
	 * @property {function} [bullet.label.format] Set a formatter for the measure value label.<br>
	 * - **Arguments:**
	 *   - `value {number}`: Measure value
	 *   - `id {string}`: Data id
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.BulletChart)
	 * @example
	 *  bullet: {
	 *      // render vertically
	 *      rotated: false,
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
	 *      // measure & target thickness
	 *      width: {
	 *          ratio: 0.35
	 *      },
	 *
	 *      // range band colors
	 *      range: {
	 *          colors: ["#b3b3b3", "#cccccc", "#e6e6e6"]
	 *      },
	 *
	 *      padding: 4,
	 *
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
	bullet_target: <number | ((id: string, value: number) => number) | {[key: string]: number}
		| null>null,
	bullet_width_ratio: 0.35,
	bullet_target_width_ratio: 0.6,
	bullet_range_colors: <string[] | ((index: number, length: number) => string) | null>null,
	bullet_padding: 4,
	bullet_label_show: true,
	bullet_label_format: <((value: number, id: string) => string | number) | undefined>undefined
};
