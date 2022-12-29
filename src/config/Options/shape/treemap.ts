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
	 * @property {Function} [treemap.label.format] Set formatter for the label text.
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
	 *          // set label text formatter
	 *          format: function(value, ratio, id) {
	 *              return d3.format("$")(value);
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *
	 *          // set ratio number
	 *          ratio: 0.05
	 *      }
	 *  }
	 */
	treemap_tile: "binary",
	treemap_label_format: <(() => number|string)|undefined> undefined,
	treemap_label_threshold: 0.05,
	treemap_label_show: true
};
