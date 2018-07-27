/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {isValue, isDefined, extend} from "../internals/util";

/**
 * Define tooltip
 * @ignore
 */
const tooltip = extend(() => {}, {
	/**
	 * Show tooltip
	 * @method tooltip․show
	 * @instance
	 * @memberOf Chart
	 * @param {Object} args The object can consist with following members:<br>
	 *
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | index | Number | Determine focus by index |
	 *    | x | Number &vert; Date | Determine focus by x Axis index |
	 *    | data | Object | Determine focus data with following keys: `x` or `index`.<br>When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is set, the target is determined by mouse position and needs specify `x`, `id` and `value`. |
	 *    | mouse | Array | Determine x and y coordinate value relative the targeted x Axis element.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
	 *
	 * @example
	 *  // show the 2nd x Axis coordinate tooltip
	 *  chart.tooltip.show({
	 *    index: 1
	 *  });
	 *
	 *  // show tooltip for the 3rd x Axis in x:50 and y:100 coordinate relative the x Axis element.
	 *  chart.tooltip.show({
	 *    data: {x: 2},
	 *    mouse: [50, 100]
	 *  });
	 *
	 *  // show tooltip for timeseries x axis
	 *  chart.tooltip.show({
	 *    x: new Date("2018-01-02 00:00")
	 *  });
	 */
	show: function(args = {}) {
		const $$ = this.internal;
		let index;
		let mouse;

		// determine mouse position on the chart
		if (args.mouse) {
			mouse = args.mouse;
		}

		// determine focus data
		if (args.data) {
			if ($$.isMultipleX()) {
				// if multiple xs, target point will be determined by mouse
				mouse = [
					$$.x(args.data.x),
					$$.getYScale(args.data.id)(args.data.value)
				];

				index = null;
			} else {
				// TODO: when tooltip_grouped = false
				index = isValue(args.data.index) ? args.data.index : $$.getIndexByX(args.data.x);
			}
		} else if (isDefined(args.x)) {
			index = $$.getIndexByX(args.x);
		} else if (isDefined(args.index)) {
			index = args.index;
		}

		// emulate events to show
		($$.inputType === "mouse" ?
			["mouseover", "mousemove"] : ["touchstart"]
		).forEach(eventName => {
			$$.dispatchEvent(eventName, index, mouse);
		});
	},

	/**
	 * Hide tooltip
	 * @method tooltip․hide
	 * @instance
	 * @memberOf Chart
	 */
	hide: function() {
		const $$ = this.internal;

		$$.hideTooltip();
		$$.hideXGridFocus();
		$$.unexpandCircles();
		$$.unexpandBars();
	}
});

extend(Chart.prototype, {tooltip});
