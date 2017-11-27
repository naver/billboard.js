/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {isValue, isDefined, extend} from "../internals/util";

/**
 * Define tooltip
 */
const tooltip = extend(() => {}, {
	/**
	 * Show tooltip
	 * @method tooltip․show
	 * @instance
	 * @memberOf Chart
	 * @param {Array} args
	 */
	show: function(args) {
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

		// emulate mouse events to show
		$$.dispatchEvent("mouseover", index, mouse);
		$$.dispatchEvent("mousemove", index, mouse);

		$$.config.tooltip_onshow.call($$, args.data);
	},

	/**
	 * Hide tooltip
	 * @method tooltip․hide
	 * @instance
	 * @memberOf Chart
	 */
	hide: function() {
		const $$ = this.internal;

		// TODO: get target data by checking the state of focus
		$$.dispatchEvent("mouseout", 0);

		$$.config.tooltip_onhide.call(this);
	}
});

extend(Chart.prototype, {tooltip});
