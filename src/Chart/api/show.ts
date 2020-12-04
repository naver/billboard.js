/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {endall} from "../../module/util";

/**
 * Show/Hide data series
 * @param {boolean} show Show or hide
 * @param {Array} targetIdsValue Target id values
 * @param {object} options Options
 * @private
 */
function showHide(show: boolean, targetIdsValue: string[], options: any): void {
	const $$ = this.internal;
	const targetIds = $$.mapToTargetIds(targetIdsValue);

	$$.state.toggling = true;

	$$[`${show ? "remove" : "add"}HiddenTargetIds`](targetIds);

	const targets = $$.$el.svg.selectAll($$.selectorTargets(targetIds));
	const opacity = show ? "1" : "0";

	show && targets.style("display", null);

	targets.transition()
		.style("opacity", opacity, "important")
		.call(endall, () => {
			// https://github.com/naver/billboard.js/issues/1758
			!show && targets.style("display", "none");
			targets.style("opacity", opacity);
		});

	options.withLegend && $$[`${show ? "show" : "hide"}Legend`](targetIds);

	$$.redraw({
		withUpdateOrgXDomain: true,
		withUpdateXDomain: true,
		withLegend: true
	});

	$$.state.toggling = false;
}

export default {
	/**
	 * Show data series on chart
	 * @function show
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} [targetIdsValue] The target id value.
	 * @param {object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | boolean | false | whether or not display legend |
	 *
	 * @example
	 * // show 'data1'
	 * chart.show("data1");
	 *
	 * // show 'data1' and 'data3'
	 * chart.show(["data1", "data3"]);
	 */
	show(targetIdsValue?: string[] | string, options = {}): void {
		showHide.call(this, true, targetIdsValue, options);
	},

	/**
	 * Hide data series from chart
	 * @function hide
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} [targetIdsValue] The target id value.
	 * @param {object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | boolean | false | whether or not display legend |
	 *
	 * @example
	 * // hide 'data1'
	 * chart.hide("data1");
	 *
	 * // hide 'data1' and 'data3'
	 * chart.hide(["data1", "data3"]);
	 */
	hide(targetIdsValue?: string[], options = {}): void {
		showHide.call(this, false, targetIdsValue, options);
	},

	/**
	 * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
	 * @function toggle
	 * @instance
	 * @memberof Chart
	 * @param {string|Array} [targetIds] The target id value.
	 * @param {object} [options] The object can consist with following members:<br>
	 *
	 *    | Key | Type | default | Description |
	 *    | --- | --- | --- | --- |
	 *    | withLegend | boolean | false | whether or not display legend |
	 *
	 * @example
	 * // toggle 'data1'
	 * chart.toggle("data1");
	 *
	 * // toggle 'data1' and 'data3'
	 * chart.toggle(["data1", "data3"]);
	 */
	toggle(targetIds: string|string[], options = {}): void {
		const $$ = this.internal;
		const targets = {show: <string[]> [], hide: <string[]> []};

		// sort show & hide target ids
		$$.mapToTargetIds(targetIds)
			.forEach((id: string) => targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id));

		// perform show & hide task separately
		// https://github.com/naver/billboard.js/issues/454
		targets.show.length && this.show(targets.show, options);
		targets.hide.length && setTimeout(() => this.hide(targets.hide, options), 0);
	}
};

