/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {extend, isTabVisible} from "../../module/util";

type GridsParam = {
	value?: number,
	class?: string,
	text?: string
}[];

/**
 * Update grid lines.
 * @param {Array} grids grid lines to update
 * @param {string} axisId axis' id: "x" or "y"
 * @returns {Array}
 * @private
 */
function grid(grids: GridsParam, axisId: "x" | "y"): GridsParam {
	const $$ = this.internal;
	const {config} = $$;
	const withTransition = config.transition_duration && isTabVisible();
	const gridPropLines = `grid_${axisId}_lines`;

	if (!grids) {
		return config[gridPropLines];
	}

	config[gridPropLines] = grids;

	$$.updateGrid();
	$$.redrawGrid(withTransition);

	return config[gridPropLines];
}

/**
 * Add grid lines.
 * @param {Array|object} grids grid lines to add
 * @param {string} axisId axis' id: "x" or "y"
 * @returns {Array}
 * @private
 */
function add(grids: GridsParam, axisId: "x" | "y"): GridsParam {
	const gridPropLines = `grid_${axisId}_lines`;

	return grid.bind(this)(
		this.internal.config[gridPropLines].concat(grids || []),
		axisId
	);
}

/**
 * Remove grid lines.
 * @param {object} grids grid lines to remove
 * @param {boolean} isXAxis weather is x axis or not
 * @private
 */
function remove(grids: GridsParam | undefined, isXAxis: boolean): void {
	this.internal.removeGridLines(grids, isXAxis);
}

/**
 * Update x grid lines.
 * @function xgrids
 * @instance
 * @memberof Chart
 * @param {Array} grids X grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines.
 * @returns {Array}
 * @example
 *  // Show 2 x grid lines
 * chart.xgrids([
 *    {value: 1, text: "Label 1"},
 *    {value: 4, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 1, text: "Label 1"}, {value: 4, text: "Label 4"}]
 */
const xgrids = function(grids: GridsParam): GridsParam {
	return grid.bind(this)(grids, "x");
};

extend(xgrids, {
	/**
	 * Add x grid lines.<br>
	 * This API adds new x grid lines instead of replacing like xgrids.
	 * @function xgrids․add
	 * @instance
	 * @memberof Chart
	 * @param {Array|object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
	 * @returns {Array}
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
	add(grids: GridsParam): GridsParam {
		return add.bind(this)(grids, "x");
	},

	/**
	 * Remove x grid lines.<br>
	 * This API removes x grid lines.
	 * @function xgrids․remove
	 * @instance
	 * @memberof Chart
	 * @param {object} grids This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
	 * @param {number} [grids.value] target value
	 * @param {string} [grids.class] target class
	 * @returns {void}
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
	remove(grids?: GridsParam): void { // TODO: multiple
		return remove.bind(this)(grids, true);
	}
});

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
const ygrids = function(grids: GridsParam): GridsParam {
	return grid.bind(this)(grids, "y");
};

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
	add(grids: GridsParam): GridsParam {
		return add.bind(this)(grids, "y");
	},

	/**
	 * Remove y grid lines.<br>
	 * This API removes x grid lines.
	 * @function ygrids․remove
	 * @instance
	 * @memberof Chart
	 * @param {object} grids This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
	 * @param {number} [grids.value] target value
	 * @param {string} [grids.class] target class
	 * @returns {void}
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
	remove(grids?: GridsParam): void { // TODO: multiple
		return remove.bind(this)(grids, false);
	}
});

export default {xgrids, ygrids};
