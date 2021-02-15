/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {extend} from "../../module/util";

/**
 * Update y grid lines.
 * @function ygrids
 * @instance
 * @memberof Chart
 * @param {Array} grids Y grid lines will be replaced with this argument. The format of this argument is the same as grid.y.lines.
 * @returns {object}
 * @example
 *  // Show 2 y grid lines
 * chart.ygrids([
 *    {value: 100, text: "Label 1"},
 *    {value: 400, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 100, text: "Label 1"}, {value: 400, text: "Label 4"}]
 */
function ygrids(grids: {value?: number, text?: string}[]): {value?: number, text?: string}[] {
	const $$ = this.internal;
	const {config} = $$;

	if (!grids) {
		return config.grid_y_lines;
	}

	config.grid_y_lines = grids;
	$$.redrawWithoutRescale();

	return config.grid_y_lines;
}

extend(ygrids, {
	/**
	 * Add y grid lines.<br>
	 * This API adds new y grid lines instead of replacing like ygrids.
	 * @function ygrids․add
	 * @instance
	 * @memberof Chart
	 * @param {Array|object} grids New y grid lines will be added. The format of this argument is the same as grid.y.lines and it's possible to give an Object if only one line will be added.
	 * @returns {object}
	 * @example
	 *  // Add a new x grid line
	 * chart.ygrids.add(
	 *   {value: 400, text: "Label 4"}
	 * );
	 *
	 * // Add new x grid lines
	 * chart.ygrids.add([
	 *   {value: 200, text: "Label 2"},
	 *   {value: 400, text: "Label 4"}
	 * ]);
	 */
	add: function(grids: {value?: number, text?: string}[]): {value?: number, text?: string}[] {
		return this.ygrids(
			this.internal.config.grid_y_lines
				.concat(grids || [])
		);
	},

	/**
	 * Remove y grid lines.<br>
	 * This API removes x grid lines.
	 * @function ygrids․remove
	 * @instance
	 * @memberof Chart
	 * @param {object} params This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
	 * @param {number} [params.value] target value
	 * @param {string} [params.class] target class
	 * @example
	 * // y grid line on y = 200 will be removed
	 * chart.ygrids.remove({value: 200});
	 *
	 * // y grid lines that have 'grid-A' will be removed
	 * chart.ygrids.remove({
	 *   class: "grid-A"
	 * });
	 *
	 * // all of y grid lines will be removed
	 * chart.ygrids.remove();
	 */
	remove: function(params?: {value?: number, class?: string}): void { // TODO: multiple
		this.internal.removeGridLines(params, false);
	}
});

export default {ygrids};
