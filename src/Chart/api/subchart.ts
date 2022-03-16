/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$COMMON} from "../../config/classes";

export default {
	subchart: {
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
		 *     // need to be instantiated by calling 'subchart()'
		 *     enabled: subchart()
		 *
		 *     // in case don't want subchart to be shown at initialization, instantiate with '!subchart()'
		 *     enabled: !subchart()
		 *     }
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
		}
	}
};
