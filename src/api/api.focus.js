/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import Chart from "../internals/Chart";
import CLASS from "../config/classes";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * This API highlights specified targets and fade out the others.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
	 * @method focus
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} targetIdsValue Target ids to be highlighted.
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
	focus(targetIdsValue) {
		const $$ = this.internal;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $$.svg.selectAll(
			$$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
		);

		this.revert();
		this.defocus();

		candidates.classed(CLASS.focused, true).classed(CLASS.defocused, false);

		$$.hasArcType() &&
		$$.expandArc(targetIds);

		$$.toggleFocusLegend(targetIds, true);

		$$.focusedTargetIds = targetIds;
		$$.defocusedTargetIds = $$.defocusedTargetIds.filter(id => targetIds.indexOf(id) < 0);
	},

	/**
	 * This API fades out specified targets and reverts the others.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
	 * @method defocus
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} Target ids to be faded out.
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
	defocus(targetIdsValue) {
		const $$ = this.internal;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $$.svg.selectAll(
			$$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
		);

		candidates.classed(CLASS.focused, false).classed(CLASS.defocused, true);
		$$.hasArcType() && $$.unexpandArc(targetIds);
		$$.toggleFocusLegend(targetIds, false);

		$$.focusedTargetIds = $$.focusedTargetIds.filter(id => targetIds.indexOf(id) < 0);
		$$.defocusedTargetIds = targetIds;
	},

	/**
	 * This API reverts specified targets.<br><br>
	 * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
	 * @method revert
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} Target ids to be reverted
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
	revert(targetIdsValue) {
		const $$ = this.internal;
		const targetIds = $$.mapToTargetIds(targetIdsValue);
		const candidates = $$.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets

		candidates.classed(CLASS.focused, false).classed(CLASS.defocused, false);
		$$.hasArcType() && $$.unexpandArc(targetIds);

		if ($$.config.legend_show) {
			$$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
			$$.legend.selectAll($$.selectorLegends(targetIds))
				.filter(function() {
					return d3Select(this).classed(CLASS.legendItemFocused);
				})
				.classed(CLASS.legendItemFocused, false);
		}

		$$.focusedTargetIds = [];
		$$.defocusedTargetIds = [];
	}
});
