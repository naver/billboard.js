/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

/**
 * Define legend
 * @ignore
 */
const legend = extend(() => {}, {
	/**
	 * Show legend for each target.
	 * @method legend․show
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} targetIds
	 * - If targetIds is given, specified target's legend will be shown.
	 * - If only one target is the candidate, String can be passed.
	 * - If no argument is given, all of target's legend will be shown.
	 * @example
	 * // Show legend for data1.
	 * chart.legend.show("data1");
	 *
	 * // Show legend for data1 and data2.
	 * chart.legend.show(["data1", "data2"]);
	 *
	 * // Show all legend.
	 * chart.legend.show();
	 */
	show: function(targetIds) {
		const $$ = this.internal;

		$$.showLegend($$.mapToTargetIds(targetIds));
		$$.updateAndRedraw({withLegend: true});
	},

	/**
	 * Hide legend for each target.
	 * @method legend․hide
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} targetIds
	 * - If targetIds is given, specified target's legend will be hidden.
	 * - If only one target is the candidate, String can be passed.
	 * - If no argument is given, all of target's legend will be hidden.
	 * @example
	 * // Hide legend for data1.
	 * chart.legend.hide("data1");
	 *
	 * // Hide legend for data1 and data2.
	 * chart.legend.hide(["data1", "data2"]);
	 *
	 * // Hide all legend.
	 * chart.legend.hide();
	 */
	hide: function(targetIds) {
		const $$ = this.internal;

		$$.hideLegend($$.mapToTargetIds(targetIds));
		$$.updateAndRedraw({withLegend: true});
	}
});

extend(Chart.prototype, {legend});
