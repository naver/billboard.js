/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * treemap config options
 */
export default {
	/**
	 * Set treemap options
	 * @name treemap
	 * @memberof Options
	 * @type {object}
	 * @property {object} treemap Treemap object
	 * @property {string} [treemap.tile="binary"] Treemap tile type
	 * - **Available tile type values:**
	 * 	- binary ([d3.treemapBinary](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapBinary))
	 * 	- dice ([d3.treemapDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapDice))
	 * 	- slice ([d3.treemapSlice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSlice))
	 * 	- sliceDice ([d3.treemapSliceDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSliceDice))
	 * 	- squrify ([d3.treemapSquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSquarify))
	 * 	- resquarify ([d3.treemapResquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapResquarify))
	 * @property {function} [treemap.label.format] Set formatter for the label text.<br>
	 * - **Arguments:**
	 *   - `value {number}`: Data value
	 *   - `ratio {number}`: The `ratio` of how much space this tile occupies relative to the total area (0~1)
	 *   - `id {string}`: Data id
	 *   - `size {object}`: Tile size `{width, height}` in pixels
	 * @property {number} [treemap.label.threshold=0.05] Set threshold ratio to show/hide labels text.
	 * @property {number} [treemap.label.show=true] Show or hide label text.
	 * @see [Demo: treemap](https://naver.github.io/billboard.js/demo/#Chart.TreemapChart)
	 * @example
	 *  treemap: {
	 *      // "binary", "dice", "slice", "sliceDice", "squrify", "resquarify"
	 *      tile: "dice",
	 *
	 *      label: {
	 *          // show or hide label text
	 *          show: false,
	 *
	 *          // Example 1: Format with currency
	 *          format: function(value, ratio, id, size) {
	 *              // size: {width, height} - tile size in pixels
	 *              return d3.format("$")(value);
	 *          },
	 *
	 *          // Example 2: Show different content based on tile size
	 *          format: function(value, ratio, id, size) {
	 *              if (size.width > 100 && size.height > 50) {
	 *                  return `${id}\n${d3.format("$")(value)}\n(${(ratio * 100).toFixed(1)}%)`;
	 *              } else if (size.width > 50) {
	 *                  return `${id}\n${d3.format("$")(value)}`;
	 *              } else {
	 *                  return d3.format("$")(value);
	 *              }
	 *          },
	 *
	 *          // Example 3: Include tile dimensions in label
	 *          format: function(value, ratio, id, size) {
	 *              return `${id}\n${value}\n${size.width.toFixed(0)}x${size.height.toFixed(0)}px`;
	 *          },
	 *
	 *          // Example 4: Conditional formatting based on ratio
	 *          format: function(value, ratio, id, size) {
	 *              return ratio > 0.1 ?
	 *                  `${id}\n${value} (${(ratio * 100).toFixed(1)}%)` :
	 *                  value;
	 *          },
	 *
	 *          // set ratio number
	 *          ratio: 0.05
	 *      }
	 *  }
	 */
	treemap_tile: "binary",
	treemap_label_format: <(() => number | string) | undefined>undefined,
	treemap_label_threshold: 0.05,
	treemap_label_show: true
};
