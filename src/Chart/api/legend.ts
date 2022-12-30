/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Define legend
 * @ignore
 */
const legend = {
	/**
	 * Show legend for each target.
	 * - **NOTE:** Legend APIs aren't supported for `treemap` type.
	 * @function legend․show
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIds
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
	show: function(targetIds?: string | string[]): void {
		const $$ = this.internal;

		$$.showLegend($$.mapToTargetIds(targetIds));
		$$.updateAndRedraw({withLegend: true});
	},

	/**
	 * Hide legend for each target.
	 * @function legend․hide
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIds
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
	hide: function(targetIds?: string | string[]): void {
		const $$ = this.internal;

		$$.hideLegend($$.mapToTargetIds(targetIds));
		$$.updateAndRedraw({withLegend: true});
	}
};

export default {legend};
