/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * heatmap config options
 */
export default {
	/**
	 * Set heatmap options.<br>
	 * The data is a matrix: `data.x` names the columns, a data series is a row, and its values are the cells.
	 * The cells are colored by their value: the colors of `heatmap.color.range` are spread from the min to the max value.
	 * - **NOTE:** `data.colors` doesn't color the cells (the legend shows the color of the rows).
	 * - **NOTE:** The first series is the top row. A `null` value is a cell of `heatmap.color.none`.
	 * - **NOTE:** With `heatmap.cell.ratio`, the chart height is set automatically from its width, so the cells keep the ratio and no space is left under them.
	 *  It follows the width on resize. Set `size.height` to fix the height: the cells are then the biggest of the ratio that fit in it.
	 * - **NOTE:** `.hide(id)` removes the row: the other cells keep their colors. The names that don't fit are skipped.
	 *
	 * The interactions:
	 * - [data.onover](#.data․onover), [data.onout](#.data․onout) and [data.onclick](#.data․onclick) are called with the data of a cell `{id, x, index, value, name}`,
	 *  where `id` is the row, `x` the name of the column, `index` the index of the column and `name` is "row / column".
	 * - `.focus(id)` and the legend hover dim the other rows.
	 * @name heatmap
	 * @memberof Options
	 * @type {object}
	 * @property {object} heatmap Heatmap object
	 * @property {Array} [heatmap.color.range=["#f6efa6","#d88273","#bf444c"]] The colors from the min to the max value (two or more).
	 * @property {Array} [heatmap.color.ranges] The colors by the ranges of the values, instead of a color range spread on the values: `[{from, to, color, name}]`.
	 *  The first range that has the value (`from` <= value <= `to`) is used. Without `from` or `to`, the range has no lower or upper limit.
	 *  A value in no range is of `heatmap.color.none`. The color bar has a band for each range, with its `name` (or `from - to`).
	 * @property {number} [heatmap.color.min] The value of the first color. When it isn't set, the min value of the data is used.
	 * @property {number} [heatmap.color.max] The value of the last color. When it isn't set, the max value of the data is used.
	 * @property {string} [heatmap.color.none="#ebedf0"] The color of a cell without a value. Set `null` to draw nothing there.
	 * @property {number} [heatmap.cell.ratio] The ratio of the width to the height of the cells: `1` makes them squares, `2` twice as wide as high.
	 *  The chart is as high as the cells need, from its width, so no space is left (and follows the width on resize).
	 *  When `size.height` is set, the cells are the biggest of the ratio that fit in it, and the space left is empty. When the ratio isn't set, the cells fill the chart.
	 * @property {number} [heatmap.cell.padding=0] The gap between the cells in pixels.
	 * @property {number} [heatmap.cell.radius=0] The radius of the corners of the cells in pixels.
	 * @property {number} [heatmap.cell.border.width=0] The width of the border of the cells in pixels.
	 * @property {string} [heatmap.cell.border.color="#fff"] The color of the border of the cells.
	 * @property {boolean} [heatmap.label.show=false] Show the values in the cells.
	 * @property {function} [heatmap.label.format] Set the formatter of the values in the cells.
	 *  - **NOTE:** The arguments are the value, the name of the column and the id of the row.
	 * @property {string} [heatmap.label.color] The color of the values. When it isn't set, black or white is used to read on the cell.
	 * @property {boolean} [heatmap.axis.x.show=true] Show the names of the columns.
	 * @property {string} [heatmap.axis.x.position="bottom"] The position of the names of the columns: "bottom" or "top".
	 * @property {boolean} [heatmap.axis.y.show=true] Show the names of the rows.
	 * @property {boolean} [heatmap.colorbar.show=true] Show the color bar, with the min and the max value, at the right of the cells.
	 * @property {string} [heatmap.colorbar.position="right"] The position of the color bar: "right" (vertical), "bottom" or "top" (horizontal, the min value at the left).
	 * @property {function} [heatmap.colorbar.format] Set the formatter of the values of the color bar.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.HeatmapChart)
	 * @example
	 *  data: {
	 *      x: "x",
	 *      columns: [
	 *          // the columns
	 *          ["x", "Mon", "Tue", "Wed"],
	 *          // the rows
	 *          ["Morning", 3, 8, 5],
	 *          ["Evening", 9, null, 1]
	 *      ],
	 *      type: "heatmap"  // for ESM, import {heatmap} from "billboard.js" and do type: heatmap()
	 *  },
	 *  heatmap: {
	 *      color: {
	 *          range: ["#ffffcc", "#41b6c4", "#0c2c84"],
	 *          min: 0,
	 *          max: 10,
	 *          none: "#eee",
	 *          // or by the ranges of the values
	 *          ranges: [
	 *              {to: 0, color: "#ebedf0", name: "none"},
	 *              {from: 1, to: 9, color: "#9be9a8"},
	 *              {from: 10, color: "#216e39", name: "10+"}
	 *          ]
	 *      },
	 *      cell: {
	 *          ratio: 1,
	 *          padding: 2,
	 *          radius: 3,
	 *          border: {
	 *              width: 1,
	 *              color: "#fff"
	 *          }
	 *      },
	 *      label: {
	 *          show: true,
	 *          format: function(value, x, id) {
	 *              return value + "%";
	 *          }
	 *      },
	 *      axis: {
	 *          x: {
	 *              position: "top"
	 *          }
	 *      },
	 *      colorbar: {
	 *          show: true,
	 *          position: "bottom"
	 *      }
	 *  }
	 */
	heatmap_color_range: ["#f6efa6", "#d88273", "#bf444c"],
	heatmap_color_ranges: <
		| {from?: number, to?: number, color: string, name?: string}[]
		| undefined
	>undefined,
	heatmap_color_min: <number | undefined>undefined,
	heatmap_color_max: <number | undefined>undefined,
	heatmap_color_none: <string | null>"#ebedf0",
	heatmap_cell_ratio: <number | undefined>undefined,
	heatmap_cell_padding: 0,
	heatmap_cell_radius: 0,
	heatmap_cell_border_width: 0,
	heatmap_cell_border_color: "#fff",
	heatmap_label_show: false,
	heatmap_label_format: <((value: number, x: string, id: string) => string) | undefined>undefined,
	heatmap_label_color: <string | undefined>undefined,
	heatmap_axis_x_show: true,
	heatmap_axis_x_position: <"bottom" | "top">"bottom",
	heatmap_axis_y_show: true,
	heatmap_colorbar_show: true,
	heatmap_colorbar_position: <"right" | "bottom" | "top">"right",
	heatmap_colorbar_format: <((value: number) => string) | undefined>undefined
};
