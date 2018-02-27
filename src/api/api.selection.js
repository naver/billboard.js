/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import Chart from "../internals/Chart";
import {isDefined, extend} from "../internals/util";
import CLASS from "../config/classes";

extend(Chart.prototype, {
	/**
	 * Get selected data points.<br><br>
	 * By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
	 * @method selected
	 * @instance
	 * @memberOf Chart
	 * @param {String} [targetId] You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
	 * @return {Array} dataPoint Array of the data points.<br>ex.) `[{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ...]`
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

		$$.main.selectAll(`.${CLASS.shapes + $$.getTargetSelectorSuffix(targetId)}`)
			.selectAll(`.${CLASS.shape}`)
			.filter(function() {
				return d3Select(this).classed(CLASS.SELECTED);
			})
			.each(d => dataPoint.push(d));

		return dataPoint;
	},

	/**
	 * Set data points to be selected. (`[data.selection.enabled](Options.html#.data%25E2%2580%25A4selection%25E2%2580%25A4enabled) option should be set true to use this method)`
	 * @method select
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} [ids] id value to get selected.
	 * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
	 * @param {Boolean} [resetOther] Unselect already selected.
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
		const config = $$.config;

		if (!config.data_selection_enabled) {
			return;
		}

		$$.main.selectAll(`.${CLASS.shapes}`)
			.selectAll(`.${CLASS.shape}`)
			.each(function(d, i) {
				const shape = d3Select(this);
				const id = d.data ? d.data.id : d.id;
				const toggle = $$.getToggle(this, d).bind($$);
				const isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0;
				const isTargetIndex = !indices || indices.indexOf(i) >= 0;
				const isSelected = shape.classed(CLASS.SELECTED);

				// line/area selection not supported yet
				if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
					return;
				}

				if (isTargetId && isTargetIndex) {
					if (config.data_selection_isselectable(d) && !isSelected) {
						toggle(true, shape.classed(CLASS.SELECTED, true), d, i);
					}
				} else if (isDefined(resetOther) && resetOther && isSelected) {
					toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
				}
			});
	},

	/**
	 * Set data points to be un-selected.
	 * @method unselect
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} [ids] id value to be unselected.
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
		const config = $$.config;

		if (!config.data_selection_enabled) {
			return;
		}

		$$.main.selectAll(`.${CLASS.shapes}`)
			.selectAll(`.${CLASS.shape}`)
			.each(function(d, i) {
				const shape = d3Select(this);
				const id = d.data ? d.data.id : d.id;
				const toggle = $$.getToggle(this, d).bind($$);
				const isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0;
				const isTargetIndex = !indices || indices.indexOf(i) >= 0;
				const isSelected = shape.classed(CLASS.SELECTED);

				// line/area selection not supported yet
				if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
					return;
				}

				if (isTargetId && isTargetIndex && config.data_selection_isselectable(d) && isSelected) {
					toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
				}
			});
	}
});
