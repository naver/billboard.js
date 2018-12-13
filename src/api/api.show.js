/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Show/Hide data series
	 * @private
	 */
	_showHide(show, targetIdsValue, options) {
		const $$ = this.internal;
		const targetIds = $$.mapToTargetIds(targetIdsValue);

		$$[`${show ? "remove" : "add"}HiddenTargetIds`](targetIds);
		const targets = $$.svg.selectAll($$.selectorTargets(targetIds));
		const opacity = show ? "1" : "0";

		targets.transition()
			.style("opacity", opacity, "important")
			.call($$.endall, () => {
				targets.style("opacity", null).style("opacity", opacity);
			});

		options.withLegend && $$[`${show ? "show" : "hide"}Legend`](targetIds);

		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
	},

	/**
	 * Show data series on chart
	 * @method show
	 * @instance
	 * @memberof Chart
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
		this._showHide(true, targetIdsValue, options);
	},

	/**
	 * Hide data series from chart
	 * @method hide
	 * @instance
	 * @memberof Chart
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
		this._showHide(false, targetIdsValue, options);
	},

	/**
	 * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
	 * @method toggle
	 * @instance
	 * @memberof Chart
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

