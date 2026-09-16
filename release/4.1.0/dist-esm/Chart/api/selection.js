/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isDefined } from "../../module/util/type-checks.js";
import { $AREA, $LINE, $SELECT, $SHAPE } from "../../config/classes.js";
import { select } from "d3-selection";
//#region src/Chart/api/selection.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
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
function setSelectionForFocusOnly(isSelection, ids, indices, resetOther) {
	const $$ = this;
	const { config, $el: { main } } = $$;
	const selectionGrouped = config.data_selection_grouped;
	const isSelectable = config.data_selection_isselectable.bind($$.api);
	const targetIds = isDefined(ids) ? [].concat(ids) : null;
	const singleSelection = isSelection && !config.data_selection_multiple;
	let resetDone = !singleSelection;
	const unselect = (circle, d, index) => {
		$$.unselectPoint(circle, d, index);
		circle.interrupt().remove();
	};
	$$.getTargetsToShow().forEach((target) => {
		const { id } = target;
		const isTargetId = selectionGrouped || !targetIds || targetIds.indexOf(id) >= 0;
		const selectedCircles = main.select(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(id)}`);
		target.values.forEach((d) => {
			const { index } = d;
			const isTargetIndex = !indices || indices.indexOf(index) >= 0;
			const circle = selectedCircles.selectAll(`.${$SELECT.selectedCircle}-${index}`);
			const isSelected = !circle.empty();
			if (isSelection) {
				if (isTargetId && isTargetIndex && isSelectable(d) && (!isSelected || singleSelection)) {
					if (!resetDone) {
						setSelectionForFocusOnly.call($$, false);
						resetDone = true;
					}
					$$.selectPoint(null, d, index);
				} else if ((!singleSelection || resetDone) && isDefined(resetOther) && resetOther && isSelected) unselect(circle, d, index);
			} else if (isTargetId && isTargetIndex && isSelected) unselect(circle, d, index);
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
function setSelection(isSelection = false, ids, indices, resetOther) {
	const $$ = this;
	const { config, $el: { main } } = $$;
	const selectionGrouped = config.data_selection_grouped;
	const isSelectable = config.data_selection_isselectable.bind($$.api);
	const singleSelection = isSelection && !config.data_selection_multiple;
	let resetDone = !singleSelection;
	if (!config.data_selection_enabled) return;
	if (singleSelection) {
		indices = indices?.length ? [indices[0]] : [0];
		if (!selectionGrouped) ids = (isDefined(ids) ? [].concat(ids) : $$.getTargetsToShow().map((t) => t.id)).slice(0, 1);
	}
	if ($$.isPointFocusOnly?.()) {
		setSelectionForFocusOnly.call($$, isSelection, ids, indices, resetOther);
		return;
	}
	main.selectAll(`.${$SHAPE.shapes}`).selectAll(`.${$SHAPE.shape}`).each(function(d) {
		const shape = select(this);
		const { id, index } = d.data ? d.data : d;
		const isTargetId = selectionGrouped || !ids || ids.indexOf(id) >= 0;
		const isTargetIndex = !indices || indices.indexOf(index) >= 0;
		if (shape.classed($LINE.line) || shape.classed($AREA.area)) return;
		const toggle = $$.getToggle(this, d).bind($$);
		const isSelected = shape.classed($SELECT.SELECTED);
		if (isSelection) {
			if (isTargetId && isTargetIndex && isSelectable(d) && (!isSelected || singleSelection)) {
				if (!resetDone) {
					setSelection.call($$, false);
					resetDone = true;
				}
				!shape.classed($SELECT.SELECTED) && toggle(true, shape.classed($SELECT.SELECTED, true), d, index);
			} else if ((!singleSelection || resetDone) && isDefined(resetOther) && resetOther && isSelected) toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
		} else if (isTargetId && isTargetIndex && isSelectable(d) && isSelected) toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
	});
}
var selection_default = {
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
	selected(targetId) {
		const $$ = this.internal;
		const dataPoint = [];
		if ($$.state.isCanvasMode) return $$.getCanvasSelectedData?.(targetId) || dataPoint;
		if ($$.isPointFocusOnly?.()) {
			$$.$el.main.selectAll(`.${$SELECT.selectedCircles + $$.getTargetSelectorSuffix(targetId)}`).selectAll(`.${$SELECT.selectedCircle}`).each((d) => dataPoint.push(d));
			return dataPoint;
		}
		$$.$el.main.selectAll(`.${$SHAPE.shapes + $$.getTargetSelectorSuffix(targetId)}`).selectAll(`.${$SHAPE.shape}`).filter(function() {
			return select(this).classed($SELECT.SELECTED);
		}).each((d) => dataPoint.push(d));
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
	select(ids, indices, resetOther) {
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
	unselect(ids, indices) {
		const $$ = this.internal;
		if ($$.state.isCanvasMode) {
			$$.setCanvasSelection?.(false, ids, indices);
			return;
		}
		setSelection.bind($$)(false, ids, indices);
	}
};
//#endregion
export { selection_default as default };
