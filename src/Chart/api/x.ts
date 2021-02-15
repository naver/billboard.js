/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isArray, isObject} from "../../module/util";

export default {
	/**
	 * Get and set x values for the chart.
	 * @function x
	 * @instance
	 * @memberof Chart
	 * @param {Array} x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 * @returns {object} xs
	 * @example
	 *  // Get current x values
	 *  chart.x();
	 *
	 *  // Update x values for all targets
	 *  chart.x([100, 200, 300, 400, ...]);
	 */
	x(x?: number[]): { [key: string] : number[] } {
		const $$ = this.internal;
		const {axis, data} = $$;
		const isCategorized = axis.isCustomX() && axis.isCategorized();

		if (isArray(x)) {
			if (isCategorized) {
				this.categories(x);
			} else {
				$$.updateTargetX(data.targets, x);

				$$.redraw({
					withUpdateOrgXDomain: true,
					withUpdateXDomain: true
				});
			}
		}

		return isCategorized ? this.categories() : data.xs;
	},

	/**
	 * Get and set x values for the chart.
	 * @function xs
	 * @instance
	 * @memberof Chart
	 * @param {Array} xs If xs is given, specified target's x values will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
	 * @returns {object} xs
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
	xs(xs?: { [key: string] : number[] }): { [key: string] : number[] } {
		const $$ = this.internal;

		if (isObject(xs)) {
			$$.updateTargetXs($$.data.targets, xs);

			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true
			});
		}

		return $$.data.xs;
	}
};
