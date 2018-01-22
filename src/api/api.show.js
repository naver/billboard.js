/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Show data series on chart
	 * @method show
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} [targetIdsValue=all] The target id value.
	 * @param {Object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | Boolean | false | whether or not display legend |
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

		options.withLegend && $$.showLegend(targetIds);

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
	},

	/**
	 * Hide data series from chart
	 * @method hide
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} [targetIdsValue=all] The target id value.
	 * @param {Object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | Boolean | false | whether or not display legend |
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

		options.withLegend && $$.hideLegend(targetIds);

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
	},

	/**
	 * Toggle data series on chart
	 * @method toggle
	 * @instance
	 * @memberOf Chart
	 * @param {Array} [targetIdsValue=all] The target id value.
	 * @param {Object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | Boolean | false | whether or not display legend |
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

