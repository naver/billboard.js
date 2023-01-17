/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isValue, isDefined} from "../../module/util";

/**
 * Define tooltip
 * @ignore
 */
const tooltip = {
	/**
	 * Show tooltip
	 * @function tooltip․show
	 * @instance
	 * @memberof Chart
	 * @param {object} args The object can consist with following members:<br>
	 *
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | index | Number | Determine focus by index |
	 *    | x | Number &vert; Date | Determine focus by x Axis index |
	 *    | mouse | Array | Determine x and y coordinate value relative the targeted '.bb-event-rect' x Axis.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
	 *    | data | Object | When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is used or [tooltip.grouped](Options.html#.tooltip) set to 'false', `should be used giving this param`.<br><br>**Key:**<br>- x {number &verbar; Date}: x Axis value<br>- index {number}: x Axis index (useless for data.xs)<br>- id {string}: data id<br>- value {number}: The corresponding value for tooltip. |
	 *
	 * @example
	 *  // show the 2nd x Axis coordinate tooltip
	 *  // for Arc(gauge, donut & pie) and radar type, approch showing tooltip by using "index" number.
	 *  chart.tooltip.show({
	 *    index: 1
	 *  });
	 *
	 *  // show tooltip for the 3rd x Axis in x:50 and y:100 coordinate of '.bb-event-rect' of the x Axis.
	 *  chart.tooltip.show({
	 *    x: 2,
	 *    mouse: [50, 100]
	 *  });
	 *
	 *  // show tooltip for timeseries x axis
	 *  chart.tooltip.show({
	 *    x: new Date("2018-01-02 00:00")
	 *  });
	 *
	 *  // treemap type can be shown by using "id" only.
	 *  chart.tooltip.show({
	 *    data: {
	 *        id: "data1"  // data id
	 *    }
	 *  });
	 *
	 *  // when data.xs is used
	 *  chart.tooltip.show({
	 *    data: {
	 *        x: 3,  // x Axis value
	 *        id: "data1",  // data id
	 *        value: 500  // data value
	 *    }
	 *  });
	 *
	 *  // when data.xs isn't used, but tooltip.grouped=false is set
	 *  chart.tooltip.show({
	 *    data: {
	 *        index: 3,  // or 'x' key value
	 *        id: "data1",  // data id
	 *        value: 500  // data value
	 *    }
	 *  });
	 */
	show: function(args): void {
		const $$ = this.internal;
		const {$el, config, state: {eventReceiver, hasTreemap, inputType}} = $$;
		let index;
		let mouse;

		// determine mouse position on the chart
		if (args.mouse) {
			mouse = args.mouse;
		}

		// determine focus data
		if (args.data) {
			const {data} = args;
			const y = $$.getYScaleById(data.id)(data.value);

			if (hasTreemap && data.id) {
				eventReceiver.rect = $el.main.select(`${$$.selectorTarget(data.id, undefined, "rect")}`);
			} else if ($$.isMultipleX()) {
				// if multiple xs, target point will be determined by mouse
				mouse = [$$.scale.x(data.x), y];
			} else {
				if (!config.tooltip_grouped) {
					mouse = [0, y];
				}

				index = isValue(data.index) ? data.index : $$.getIndexByX(data.x);
			}
		} else if (isDefined(args.x)) {
			index = $$.getIndexByX(args.x);
		} else if (isDefined(args.index)) {
			index = args.index;
		}

		(inputType === "mouse" ?
			["mouseover", "mousemove"] : ["touchstart"]
		).forEach(eventName => {
			$$.dispatchEvent(eventName, index, mouse);
		});
	},

	/**
	 * Hide tooltip
	 * @function tooltip․hide
	 * @instance
	 * @memberof Chart
	 */
	hide: function(): void {
		const $$ = this.internal;
		const {state: {inputType}, $el: {tooltip}} = $$;
		const data = tooltip?.datum();

		if (data) {
			const {index} = JSON.parse(data.current)[0];

			// make to finalize, possible pending event flow set from '.tooltip.show()' call
			(inputType === "mouse" ?
				["mouseout"] : ["touchend"]
			).forEach(eventName => {
				$$.dispatchEvent(eventName, index);
			});
		}

		// reset last touch point index
		inputType === "touch" && $$.callOverOutForTouch();

		$$.hideTooltip(true);
		$$.hideGridFocus?.();

		$$.unexpandCircles?.();
		$$.expandBarTypeShapes?.(false);
	}
};

export default {tooltip};
