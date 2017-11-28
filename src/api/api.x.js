/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Get and set x values for the chart.
	 * @method x
	 * @instance
	 * @memberOf Chart
	 * @param {Array} x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 * @return {Object} xs
	 * @example
	 *  // Get current x values
	 *  chart.x();
	 *
	 *  // Update x values for all targets
	 *  chart.x([100, 200, 300, 400, ...]);
	 */
	x(x) {
		const $$ = this.internal;

		if (arguments.length) {
			$$.updateTargetX($$.data.targets, x);

			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true
			});
		}

		return $$.data.xs;
	},

	/**
	 * Get and set x values for the chart.
	 * @method xs
	 * @instance
	 * @memberOf Chart
	 * @param {Array} xs If xs is given, specified target's x values will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 * @return {Object} xs
	 * @example
	 *  // Get current x values
	 *  chart.xs();
	 *
	 *  // Update x values for all targets
	 *  chart.xs({
	 *    data1: [10, 20, 30, 40, ...],
	 *    data2: [100, 200, 300, 400, ...]
	 *  });
	 */
	xs(xs) {
		const $$ = this.internal;

		if (arguments.length) {
			$$.updateTargetXs($$.data.targets, xs);

			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true
			});
		}

		return $$.data.xs;
	}
});
