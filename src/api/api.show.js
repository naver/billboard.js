/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Show data points
	 * @method show
	 * @instance
	 * @memberof Chart
	 * @param {String|Array} targetIdsValue
	 * @param {Object} options
	 */
	show(targetIdsValue, options = {}) {
		const $$ = this.internal;

		const targetIds = $$.mapToTargetIds(targetIdsValue);

		$$.removeHiddenTargetIds(targetIds);
		const targets = $$.svg.selectAll($$.selectorTargets(targetIds));

		targets.transition()
			.style("opacity", "1", "important")
			.call($$.endall, () => {
				targets.style("opacity", null).style("opacity", "1");
			});

		options.withLegend &&
		$$.showLegend(targetIds);

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
	},

	/**
	 * Hide data points
	 * @method hide
	 * @instance
	 * @memberof Chart
	 * @param {String|Array} targetIdsValue
	 * @param {Object} options
	 */
	hide(targetIdsValue, options = {}) {
		const $$ = this.internal;
		const targetIds = $$.mapToTargetIds(targetIdsValue);

		$$.addHiddenTargetIds(targetIds);
		const targets = $$.svg.selectAll($$.selectorTargets(targetIds));

		targets.transition()
			.style("opacity", "0", "important")
			.call($$.endall, () => {
				targets.style("opacity", null).style("opacity", "0");
			});

		options.withLegend &&
		$$.hideLegend(targetIds);

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
	},

	/**
	 * Toggle data points
	 * @method toggle
	 * @instance
	 * @memberof Chart
	 * @param {Array} targetIds
	 * @param {Object} options
	 */
	toggle(targetIds, options = {}) {
		const that = this;
		const $$ = this.internal;

		$$.mapToTargetIds(targetIds).forEach(targetId => {
			$$.isTargetToShow(targetId) ?
				that.hide(targetId, options) : that.show(targetId, options);
		});
	}
});

