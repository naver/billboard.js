/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {isDefined} from "../../module/util";
import {$AREA, $LINE, $SELECT, $SHAPE} from "../../config/classes";
import type {DataItem} from "../../../types/types";

/**
 * Toggler function to select or unselect
 * @param {boolean} isSelection Weather select or unselect
 * @param {Array} ids Target ids
 * @param {Array} indices Indices number
 * @param {boolean} resetOther Weather reset other selected points (only for selection)
 * @private
 */
function setSelection(
	isSelection = false,
	ids?: string | string[],
	indices?: number[],
	resetOther?: boolean
): void {
	const $$ = this;
	const {config, $el: {main}} = $$;
	const selectionGrouped = config.data_selection_grouped;
	const isSelectable = config.data_selection_isselectable.bind($$.api);

	if (!config.data_selection_enabled) {
		return;
	}

	main.selectAll(`.${$SHAPE.shapes}`)
		.selectAll(`.${$SHAPE.shape}`)
		.each(function(d) {
			const shape = d3Select(this);
			const {id, index} = d.data ? d.data : d;
			const toggle = $$.getToggle(this, d).bind($$);
			const isTargetId = selectionGrouped || !ids || ids.indexOf(id) >= 0;
			const isTargetIndex = !indices || indices.indexOf(index) >= 0;
			const isSelected = shape.classed($SELECT.SELECTED);

			// line/area selection not supported yet
			if (shape.classed($LINE.line) || shape.classed($AREA.area)) {
				return;
			}

			if (isSelection) {
				if (isTargetId && isTargetIndex && isSelectable(d) && !isSelected) {
					toggle(true, shape.classed($SELECT.SELECTED, true), d, index);
				} else if (isDefined(resetOther) && resetOther && isSelected) {
					toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
				}
			} else {
				if (isTargetId && isTargetIndex && isSelectable(d) && isSelected) {
					toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
				}
			}
		});
}

export default {
	/**
	 * Get selected data points.<br><br>
	 * By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
	 * @function selected
	 * @instance
	 * @memberof Chart
	 * @param {string} [targetId] You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
	 * @returns {Array} dataPoint Array of the data points.<br>ex.) `[{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ...]`
	 * @example
	 *  // all selected data points will be returned.
	 *  chart.selected();
	 *  // --> ex.) [{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ... ]
	 *
	 *  // all selected data points of data1 will be returned.
	 *  chart.selected("data1");
	 */
	selected(targetId?: string): DataItem[] {
		const $$ = this.internal;
		const dataPoint: DataItem[] = [];

		$$.$el.main.selectAll(`.${$SHAPE.shapes + $$.getTargetSelectorSuffix(targetId)}`)
			.selectAll(`.${$SHAPE.shape}`)
			.filter(function() {
				return d3Select(this).classed($SELECT.SELECTED);
			})
			.each(d => dataPoint.push(d));

		return dataPoint;
	},

	/**
	 * Set data points to be selected. ([`data.selection.enabled`](Options.html#.data%25E2%2580%25A4selection%25E2%2580%25A4enabled) option should be set true to use this method)
	 * @function select
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} [ids] id value to get selected.
	 * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
	 * @param {boolean} [resetOther] Unselect already selected.
	 * @example
	 *  // select all data points
	 *  chart.select();
	 *
	 *  // select all from 'data2'
	 *  chart.select("data2");
	 *
	 *  // select all from 'data1' and 'data2'
	 *  chart.select(["data1", "data2"]);
	 *
	 *  // select from 'data1', indices 2 and unselect others selected
	 *  chart.select("data1", [2], true);
	 *
	 *  // select from 'data1', indices 0, 3 and 5
	 *  chart.select("data1", [0, 3, 5]);
	 */
	select(ids?: string[] | string, indices?: number[], resetOther?: boolean): void {
		const $$ = this.internal;

		setSelection.bind($$)(true, ids, indices, resetOther);
	},

	/**
	 * Set data points to be un-selected.
	 * @function unselect
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} [ids] id value to be unselected.
	 * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
	 * @example
	 *  // unselect all data points
	 *  chart.unselect();
	 *
	 *  // unselect all from 'data1'
	 *  chart.unselect("data1");
	 *
	 *  // unselect from 'data1', indices 2
	 *  chart.unselect("data1", [2]);
	 */
	unselect(ids?: string | string[], indices?: number[]): void {
		const $$ = this.internal;

		setSelection.bind($$)(false, ids, indices);
	}
};
