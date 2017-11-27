/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

/**
 * Update x grid lines.
 * @method xgrids
 * @instance
 * @memberOf Chart
 * @param {Array} grids X grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines.
 * @example
 *  // Show 2 x grid lines
 * chart.xgrids([
 *    {value: 1, text: "Label 1"},
 *    {value: 4, text: "Label 4"}
 * ]);
 */
const xgrids = function(grids) {
	const $$ = this.internal;
	const config = $$.config;

	if (!grids) {
		return config.grid_x_lines;
	}

	config.grid_x_lines = grids;
	$$.redrawWithoutRescale();

	return config.grid_x_lines;
};

extend(xgrids, {
	/**
	 * Add x grid lines.<br>
	 * This API adds new x grid lines instead of replacing like xgrids.
	 * @method xgrids․add
	 * @instance
	 * @memberOf Chart
	 * @param {Array|Object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
	 * @example
	 *  // Add a new x grid line
	 * chart.xgrids.add(
	 *   {value: 4, text: "Label 4"}
	 * );
	 *
	 * // Add new x grid lines
	 * chart.xgrids.add([
	 *   {value: 2, text: "Label 2"},
	 *   {value: 4, text: "Label 4"}
	 * ]);
	 */
	add: function(grids) {
		return this.xgrids(
			this.internal.config.grid_x_lines
				.concat(grids || [])
		);
	},

	/**
	 * Remove x grid lines.<br>
	 * This API removes x grid lines.
	 * @method xgrids․remove
	 * @instance
	 * @memberOf Chart
	 * @param {Object} params This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
	 * @example
	 * // x grid line on x = 2 will be removed
	 * chart.xgrids.remove({value: 2});
	 *
	 * // x grid lines that have 'grid-A' will be removed
	 * chart.xgrids.remove({
	 *   class: "grid-A"
	 * });
	 *
	 * // all of x grid lines will be removed
	 * chart.xgrids.remove();
	 */
	remove: function(params) { // TODO: multiple
		this.internal.removeGridLines(params, true);
	}
});


/**
 * Update y grid lines.
 * @method ygrids
 * @instance
 * @memberOf Chart
 * @param {Array} grids Y grid lines will be replaced with this argument. The format of this argument is the same as grid.y.lines.
 * @example
 *  // Show 2 y grid lines
 * chart.ygrids([
 *    {value: 100, text: "Label 1"},
 *    {value: 400, text: "Label 4"}
 * ]);
 */
const ygrids = function(grids) {
	const $$ = this.internal;
	const config = $$.config;

	if (!grids) {
		return config.grid_y_lines;
	}

	config.grid_y_lines = grids;
	$$.redrawWithoutRescale();

	return config.grid_y_lines;
};

extend(ygrids, {
	/**
	 * Add y grid lines.<br>
	 * This API adds new y grid lines instead of replacing like ygrids.
	 * @method ygrids․add
	 * @instance
	 * @memberOf Chart
	 * @param {Array|Object} grids New y grid lines will be added. The format of this argument is the same as grid.y.lines and it's possible to give an Object if only one line will be added.
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
	add: function(grids) {
		return this.ygrids(
			this.internal.config.grid_y_lines
				.concat(grids || [])
		);
	},

	/**
	 * Remove y grid lines.<br>
	 * This API removes x grid lines.
	 * @method ygrids․remove
	 * @instance
	 * @memberOf Chart
	 * @param {Object} params This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
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
	remove: function(params) { // TODO: multiple
		this.internal.removeGridLines(params, false);
	}
});

extend(Chart.prototype, {
	xgrids,
	ygrids
});
