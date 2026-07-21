/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import type {DataItem} from "../../../types/types";
import {$AREA, $LINE, $SELECT, $SHAPE} from "../../config/classes";
import {isDefined} from "../../module/util";

/**
 * Toggler function to select or unselect when point.focus.only=true.<br><br>
 * In this mode only a single shared circle element is rendered per series, so
 * selection can't rely on per-index shape elements existing in the DOM. Iterate
 * over the data instead and draw/remove the selected-circle elements directly.
 * @param {boolean} isSelection Weather select or unselect
 * @param {Array} ids Target ids
 * @param {Array} indices Indices number
 * @param {boolean} resetOther Weather reset other selected points (only for selection)
 * @private
 */
function setSelectionForFocusOnly(
	isSelection: boolean,
	ids?: string | string[],
	indices?: number[],
	resetOther?: boolean
): void {
	const $$ = this;
	const {config, $el: {main}} = $$;
	const selectionGrouped = config.data_selection_grouped;
	const isSelectable = config.data_selection_isselectable.bind($$.api);
	const targetIds = isDefined(ids) ? ([] as string[]).concat(ids as string | string[]) : null;
	const singleSelection = isSelection && !config.data_selection_multiple;
	let resetDone = !singleSelection;

	// Remove the selected-circle synchronously. The shape's selection state is
	// represented solely by these elements in focus.only mode, so relying on
	// unselectPoint's transitioned removal would let rapid API calls interrupt
	// each other's transition and leave orphaned circles behind.
	const unselect = (circle, d, index) => {
		$$.unselectPoint(circle, d, index);
		circle.interrupt().remove();
	};

	$$.getTargetsToShow().forEach(target => {
		const {id} = target;
		const isTargetId = selectionGrouped || !targetIds || targetIds.indexOf(id) >= 0;
		const selectedCircles = main.select(
			`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(id)}`
		);

		target.values.forEach(d => {
			const {index} = d;
			const isTargetIndex = !indices || indices.indexOf(index) >= 0;
			const circle = selectedCircles.selectAll(`.${$SELECT.selectedCircle}-${index}`);
			const isSelected = !circle.empty();

			if (isSelection) {
				if (
					isTargetId && isTargetIndex && isSelectable(d) &&
					(!isSelected || singleSelection)
				) {
					if (!resetDone) {
						setSelectionForFocusOnly.call($$, false);
						resetDone = true;
					}

					$$.selectPoint(null, d, index);
				} else if (
					(!singleSelection || resetDone) &&
					isDefined(resetOther) &&
					resetOther &&
					isSelected
				) {
					unselect(circle, d, index);
				}
			} else if (isTargetId && isTargetIndex && isSelected) {
				unselect(circle, d, index);
			}
		});
	});
}

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
	const singleSelection = isSelection && !config.data_selection_multiple;
	let resetDone = !singleSelection;

	if (!config.data_selection_enabled) {
		return;
	}

	// When multiple selection is disabled, only one data point (or one x-index
	// group when 'grouped' is enabled) can hold the selected state at a time.
	// Clear any current selection only when the narrowed request can select a point.
	if (singleSelection) {
		indices = indices?.length ? [indices[0]] : [0];

		// non-grouped single selection targets exactly one point, so narrow to a
		// single id (the first requested, or the first shown when none given).
		if (!selectionGrouped) {
			const targetIds = isDefined(ids) ?
				([] as string[]).concat(ids as string | string[]) :
				$$.getTargetsToShow().map(t => t.id);

			ids = targetIds.slice(0, 1);
		}
	}

	if ($$.isPointFocusOnly?.()) {
		setSelectionForFocusOnly.call($$, isSelection, ids, indices, resetOther);
		return;
	}

	main.selectAll(`.${$SHAPE.shapes}`)
		.selectAll(`.${$SHAPE.shape}`)
		.each(function(d) {
			const shape = d3Select(this);
			const {id, index} = d.data ? d.data : d;
			const isTargetId = selectionGrouped || !ids || ids.indexOf(id) >= 0;
			const isTargetIndex = !indices || indices.indexOf(index) >= 0;

			// line/area selection not supported yet
			if (shape.classed($LINE.line) || shape.classed($AREA.area)) {
				return;
			}

			const toggle = $$.getToggle(this, d).bind($$);
			const isSelected = shape.classed($SELECT.SELECTED);

			if (isSelection) {
				if (
					isTargetId &&
					isTargetIndex &&
					isSelectable(d) &&
					(!isSelected || singleSelection)
				) {
					if (!resetDone) {
						setSelection.call($$, false);
						resetDone = true;
					}

					!shape.classed($SELECT.SELECTED) &&
						toggle(true, shape.classed($SELECT.SELECTED, true), d, index);
				} else if (
					(!singleSelection || resetDone) &&
					isDefined(resetOther) &&
					resetOther &&
					isSelected
				) {
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

		if ($$.state.isCanvasMode) {
			return $$.getCanvasSelectedData?.(targetId) || dataPoint;
		}

		// point.focus.only=true renders no per-index shape, so the selected-circle
		// elements are the source of truth for the selection state.
		if ($$.isPointFocusOnly?.()) {
			$$.$el.main
				.selectAll(`.${$SELECT.selectedCircles + $$.getTargetSelectorSuffix(targetId)}`)
				.selectAll(`.${$SELECT.selectedCircle}`)
				.each(d => dataPoint.push(d));

			return dataPoint;
		}

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

		if ($$.state.isCanvasMode) {
			$$.setCanvasSelection?.(true, ids, indices, resetOther);
			return;
		}

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

		if ($$.state.isCanvasMode) {
			$$.setCanvasSelection?.(false, ids, indices);
			return;
		}

		setSelection.bind($$)(false, ids, indices);
	}
};
