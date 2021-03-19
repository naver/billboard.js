/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import CLASS from "../../config/classes";

type FocusParam = string | string[];

export default {
	/**
	 * This API highlights specified targets and fade out the others.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
	 * @function focus
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIdsValue Target ids to be highlighted.
	 * @example
	 *  // data1 will be highlighted and the others will be faded out
	 *  chart.focus("data1");
	 *
	 * // data1 and data2 will be highlighted and the others will be faded out
	 * chart.focus(["data1", "data2"]);
	 *
	 * // all targets will be highlighted
	 * chart.focus();
	 */
	focus(targetIdsValue?: FocusParam): void {
		const $$ = this.internal;
		const {state} = $$;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $$.$el.svg.selectAll(
			$$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
		);

		this.revert();
		this.defocus();

		candidates.classed(CLASS.focused, true).classed(CLASS.defocused, false);

		if ($$.hasArcType() && !state.hasRadar) {
			$$.expandArc(targetIds);

			$$.hasType("gauge") &&
				$$.markOverlapped(targetIdsValue, $$, `.${CLASS.gaugeValue}`);
		}

		$$.toggleFocusLegend(targetIds, true);

		state.focusedTargetIds = targetIds;
		state.defocusedTargetIds = state.defocusedTargetIds.filter(id => targetIds.indexOf(id) < 0);
	},

	/**
	 * This API fades out specified targets and reverts the others.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
	 * @function defocus
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIdsValue Target ids to be faded out.
	 * @example
	 * // data1 will be faded out and the others will be reverted.
	 * chart.defocus("data1");
	 *
	 * // data1 and data2 will be faded out and the others will be reverted.
	 * chart.defocus(["data1", "data2"]);
	 *
	 * // all targets will be faded out.
	 * chart.defocus();
	 */
	defocus(targetIdsValue?: FocusParam): void {
		const $$ = this.internal;
		const {state} = $$;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $$.$el.svg.selectAll(
			$$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
		);

		candidates.classed(CLASS.focused, false).classed(CLASS.defocused, true);

		if ($$.hasArcType()) {
			$$.unexpandArc(targetIds);

			$$.hasType("gauge") &&
				$$.undoMarkOverlapped($$, `.${CLASS.gaugeValue}`);
		}

		$$.toggleFocusLegend(targetIds, false);

		state.focusedTargetIds = state.focusedTargetIds.filter(id => targetIds.indexOf(id) < 0);
		state.defocusedTargetIds = targetIds;
	},

	/**
	 * This API reverts specified targets.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
	 * @function revert
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} targetIdsValue Target ids to be reverted
	 * @example
	 * // data1 will be reverted.
	 * chart.revert("data1");
	 *
	 * // data1 and data2 will be reverted.
	 * chart.revert(["data1", "data2"]);
	 *
	 * // all targets will be reverted.
	 * chart.revert();
	 */
	revert(targetIdsValue?: FocusParam): void {
		const $$ = this.internal;
		const {config, state, $el} = $$;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $el.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets

		candidates.classed(CLASS.focused, false).classed(CLASS.defocused, false);
		$$.hasArcType() && $$.unexpandArc(targetIds);

		if (config.legend_show) {
			$$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
			$el.legend.selectAll($$.selectorLegends(targetIds))
				.filter(function() {
					return d3Select(this).classed(CLASS.legendItemFocused);
				})
				.classed(CLASS.legendItemFocused, false);
		}

		state.focusedTargetIds = [];
		state.defocusedTargetIds = [];
	}
};
