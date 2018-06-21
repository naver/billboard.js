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
	 *
	 * @example
	 * // show 'data1'
	 * chart.show("data1");
	 *
	 * // show 'data1' and 'data3'
	 * chart.show(["data1", "data3"]);
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
	 *
	 * @example
	 * // hide 'data1'
	 * chart.hide("data1");
	 *
	 * // hide 'data1' and 'data3'
	 * chart.hide(["data1", "data3"]);
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
	 * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
	 * @method toggle
	 * @instance
	 * @memberOf Chart
	 * @param {String|Array} [targetIdsValue=all] The target id value.
	 * @param {Object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | Boolean | false | whether or not display legend |
	 *
	 * @example
	 * // toggle 'data1'
	 * chart.toggle("data1");
	 *
	 * // toggle 'data1' and 'data3'
	 * chart.toggle(["data1", "data3"]);
	 */
	toggle(targetIds, options = {}) {
		const $$ = this.internal;
		const targets = {show: [], hide: []};

		// sort show & hide target ids
		$$.mapToTargetIds(targetIds)
			.forEach(id => targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id));

		// perform show & hide task separately
		// https://github.com/naver/billboard.js/issues/454
		targets.show.length && this.show(targets.show, options);
		targets.hide.length && setTimeout(() => this.hide(targets.hide, options), 0);
	}
});

