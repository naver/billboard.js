/**
 * Copyright (c) 2017 ~ present NAVER Corp.
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
	 * @memberof Chart
	 * @param {Object} args The object can consist with following members:<br>
	 *
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | index | Number | Determine focus by index |
	 *    | x | Number &vert; Date | Determine focus by x Axis index |
	 *    | mouse | Array | Determine x and y coordinate value relative the targeted x Axis element.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
	 *    | data | Object | When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is used or [tooltip.grouped](Options.html#.tooltip) set to 'false', `should be used giving this param`.<br><br>**Key:**<br>- x {Number &verbar; Date}: x Axis value<br>- index {Number}: x Axis index (useless for data.xs)<br>- id {String}: Axis id. 'y' or 'y2'(default 'y')<br>- value {Number}: The corresponding value for tooltip. |
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
	 *
	 *  // when data.xs is used
	 *  chart.tooltip.show({
	 *    data: {
	 *        x: 3,  // x Axis value
	 *        id: "y",  // axis id. 'y' or 'y2' (default 'y')
	 *        value: 500  // data value
	 *    }
	 *  });
	 *
	 *  // when data.xs isn't used, but tooltip.grouped=false is set
	 *  chart.tooltip.show({
	 *    data: {
	 *        index: 3,  // or 'x' key value
	 *        id: "y",  // axis id. 'y' or 'y2' (default 'y')
	 *        value: 500  // data value
	 *    }
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
			const y = $$.getYScale(args.data.id)(args.data.value);

			if ($$.isMultipleX()) {
				// if multiple xs, target point will be determined by mouse
				mouse = [$$.x(args.data.x), y];
			} else {
				if (!$$.config.tooltip_grouped) {
					mouse = [0, y];
				}

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
	 * @memberof Chart
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
