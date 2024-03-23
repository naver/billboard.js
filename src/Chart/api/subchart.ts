/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {TDomain} from "../../ChartInternal/data/IData";
import {$COMMON} from "../../config/classes";
import {extend, parseDate} from "../../module/util";

/**
 * Select subchart by giving x domain range.
 * - **ℹ️ NOTE:**
 *  - Due to the limitations of floating point precision, domain value may not be exact returning approximately values.
 * @function subchart
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain range is given, the subchart will be seleted to the given domain. If no argument is given, the current subchart selection domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Specify domain for subchart selection
 *  chart.subchart([1, 2]);
 *
 *  // Get the current subchart selection domain range
 *  // Domain value may not be exact returning approximately values.
 *  chart.subchart();
 */
// NOTE: declared funciton assigning to variable to prevent duplicated method generation in JSDoc.
const subchart = function<T = TDomain[]>(domainValue?: T): T | undefined {
	const $$ = this.internal;
	const {axis, brush, config, scale: {x, subX}, state} = $$;
	let domain;

	if (config.subchart_show) {
		domain = domainValue;

		if (Array.isArray(domain)) {
			if (axis.isTimeSeries()) {
				domain = domain.map(x => parseDate.bind($$)(x));
			}

			const isWithinRange = $$.withinRange(
				domain,
				$$.getZoomDomain("subX", true),
				$$.getZoomDomain("subX")
			);

			if (isWithinRange) {
				state.domain = domain;

				brush.move(
					brush.getSelection(),
					domain.map(subX)
				);
			}
		} else {
			domain = state.domain ?? x.orgDomain();
		}
	}

	return domain as T;
};

extend(subchart, {
	/**
	 * Show subchart
	 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
	 * @function subchart․show
	 * @instance
	 * @memberof Chart
	 * @example
	 * // for ESM imports, needs to import 'subchart' and must be instantiated first to enable subchart's API.
	 * import {subchart} from "billboard.js";
	 *
	 * const chart = bb.generate({
	 *   ...
	 *   subchart: {
	 *      // need to be instantiated by calling 'subchart()'
	 *      enabled: subchart()
	 *
	 *      // in case don't want subchart to be shown at initialization, instantiate with '!subchart()'
	 *      enabled: !subchart()
	 *   }
	 * });
	 *
	 * chart.subchart.show();
	 */
	show(): void {
		const $$ = this.internal;
		const {$el: {subchart}, config} = $$;
		const show = config.subchart_show;

		if (!show) {
			// unbind zoom event bound to chart rect area
			$$.unbindZoomEvent();

			config.subchart_show = !show;
			!subchart.main && $$.initSubchart();

			let $target = subchart.main.selectAll(`.${$COMMON.target}`);

			// need to cover when new data has been loaded
			if ($$.data.targets.length !== $target.size()) {
				$$.updateSizes();
				$$.updateTargetsForSubchart($$.data.targets);

				$target = subchart.main?.selectAll(`.${$COMMON.target}`);
			}

			$target?.style("opacity", null);
			subchart.main?.style("display", null);

			this.resize();
		}
	},

	/**
	 * Hide generated subchart
	 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
	 * @function subchart․hide
	 * @instance
	 * @memberof Chart
	 * @example
	 *  chart.subchart.hide();
	 */
	hide(): void {
		const $$ = this.internal;
		const {$el: {subchart: {main}}, config} = $$;

		if (config.subchart_show && main?.style("display") !== "none") {
			config.subchart_show = false;
			main.style("display", "none");

			this.resize();
		}
	},

	/**
	 * Toggle the visiblity of subchart
	 * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
	 * @function subchart․toggle
	 * @instance
	 * @memberof Chart
	 * @example
	 * // When subchart is hidden, will be shown
	 * // When subchart is shown, will be hidden
	 * chart.subchart.toggle();
	 */
	toggle(): void {
		const $$ = this.internal;
		const {config} = $$;

		this.subchart[config.subchart_show ? "hide" : "show"]();
	},

	/**
	 * Reset subchart selection
	 * @function subchart․reset
	 * @instance
	 * @memberof Chart
	 * @example
	 * // Reset subchart selection
	 * chart.subchart.reset();
	 */
	reset(): void {
		const $$ = this.internal;
		const {brush} = $$;

		brush.clear(brush.getSelection());
	}
});

export default {
	subchart
};
