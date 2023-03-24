/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * y2 Axis  config options
 */
export default {
	/**
	 * Show or hide y2 axis.
	 * - **NOTE**:
	 *   - When set to `false` will not generate y2 axis node. In this case, all 'y2' axis related functionality won't work properly.
	 *   - If need to use 'y2' related options while y2 isn't visible, set the value `true` and control visibility by css display property.
	 * @name axis․y2․show
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @example
	 * axis: {
	 *   y2: {
	 *     show: true
	 *   }
	 * }
	 */
	axis_y2_show: false,

	/**
	 * Set type of y2 axis.<br><br>
	 * **Available Values:**
	 *  - indexed
	 *  - log
	 *  - timeseries
	 *
	 * **NOTE:**<br>
	 * - **log** type:
	 *   - the bound data values must be exclusively-positive.
	 *   - y2 axis min value should be >= 0.
	 *   - [`data.groups`](#.data%25E2%2580%25A4groups)(stacked data) option aren't supported.
	 *
	 * @name axis․y2․type
	 * @memberof Options
	 * @type {string}
	 * @default "indexed"
	 * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
	 * @example
	 * axis: {
	 *   y2: {
	 *     type: "indexed"
	 *   }
	 * }
	 */
	axis_y2_type: <"indexed"|"log"|"timeseries"> "indexed",

	/**
	 * Set max value of y2 axis.
	 * @name axis․y2․max
	 * @memberof Options
	 * @type {number}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     max: 1000
	 *   }
	 * }
	 */
	axis_y2_max: <number|undefined> undefined,

	/**
	 * Set min value of y2 axis.
	 * @name axis․y2․min
	 * @memberof Options
	 * @type {number}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     min: -1000
	 *   }
	 * }
	 */
	axis_y2_min: <number|undefined> undefined,

	/**
	 * Change the direction of y2 axis.<br><br>
	 * If true set, the direction will be `top -> bottom`.
	 * @name axis․y2․inverted
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
	 * @example
	 * axis: {
	 *   y2: {
	 *     inverted: true
	 *   }
	 * }
	 */
	axis_y2_inverted: false,

	/**
	 * Set center value of y2 axis.
	 * @name axis․y2․center
	 * @memberof Options
	 * @type {number}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     center: 0
	 *   }
	 * }
	 */
	axis_y2_center: <number|undefined> undefined,

	/**
	 * Show y2 axis inside of the chart.
	 * @name axis․y2․inner
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @example
	 * axis: {
	 *   y2: {
	 *     inner: true
	 *   }
	 * }
	 */
	axis_y2_inner: false,

	/**
	 * Set label on y2 axis.<br><br>
	 * You can set y2 axis label and change its position by this option. This option works in the same way as [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label).
	 * @name axis․y2․label
	 * @memberof Options
	 * @type {string|object}
	 * @default {}
	 * @see [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label) for position string value.
	 * @example
	 * axis: {
	 *   y2: {
	 *     label: "Your Y2 Axis"
	 *   }
	 * }
	 *
	 * axis: {
	 *   y2: {
	 *     label: {
	 *        text: "Your Y2 Axis",
	 *        position: "outer-middle"
	 *     }
	 *   }
	 * }
	 */
	axis_y2_label: <string|object> {},

	/**
	 * Set formatter for y2 axis tick text.<br><br>
	 * This option works in the same way as axis.y.format.
	 * @name axis․y2․tick․format
	 * @memberof Options
	 * @type {Function}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       format: d3.format("$,")
	 *       //or format: function(d) { return "$" + d; }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_format: <Function|undefined> undefined,

	/**
	 * Setting for culling ticks.
	 * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
	 *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.y2.tick.culling.lines=false`.
	 * - `false`: all of ticks will be shown.<br><br>
	 * The number of ticks to be shown can be chaned by `axis.y2.tick.culling.max`.
	 * @name axis․y2․tick․culling
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       culling: false
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_culling: false,

	/**
	 * The number of tick texts will be adjusted to less than this value.
	 * @name axis․y2․tick․culling․max
	 * @memberof Options
	 * @type {number}
	 * @default 5
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       culling: {
	 *           max: 5
	 *       }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_culling_max: 5,

	/**
	 * Control visibility of tick lines within culling option, along with tick text.
	 * @name axis․y2․tick․culling․lines
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       culling: {
	 *           lines: false,
	 *       }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_culling_lines: true,

	/**
	 * Show or hide y2 axis outer tick.
	 * @name axis․y2․tick․outer
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       outer: false
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_outer: true,

	/**
	 * Set y2 axis tick values manually.
	 * @name axis․y2․tick․values
	 * @memberof Options
	 * @type {Array|Function}
	 * @default null
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       values: [100, 1000, 10000],
	 *
	 *       // an Array value should be returned
	 *       values: function() {
	 *       	return [ ... ];
	 *       }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_values: <number[]|(()=> number[])|null> null,

	/**
	 * Rotate y2 axis tick text.
	 * - If you set negative value, it will rotate to opposite direction.
	 * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `true`.
	 * @name axis․y2․tick․rotate
	 * @memberof Options
	 * @type {number}
	 * @default 0
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       rotate: 60
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_rotate: 0,

	/**
	 * Set the number of y2 axis ticks.
	 * - **NOTE:** This works in the same way as axis.y.tick.count.
	 * @name axis․y2․tick․count
	 * @memberof Options
	 * @type {number}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       count: 5
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_count: <number|undefined> undefined,

	/**
	 * Show or hide y2 axis tick line.
	 * @name axis․y2․tick․show
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       show: false
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_show: true,

	/**
	 * Set axis tick step(interval) size.
	 * - **NOTE:** Will be ignored if `axis.y2.tick.count` or `axis.y2.tick.values` options are set.
	 * @name axis․y2․tick․stepSize
	 * @memberof Options
	 * @type {number}
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.StepSizeForYAxis)
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       // tick value will step as indicated interval value.
	 *       // ex) 'stepSize=15' ==> [0, 15, 30, 45, 60]
	 *       stepSize: 15
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_stepSize: <number|null> null,

	/**
	 * Show or hide y2 axis tick text.
	 * @name axis․y2․tick․text․show
	 * @memberof Options
	 * @type {boolean}
	 * @default true
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       text: {
	 *           show: false
	 *       }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_text_show: true,

	/**
	 * Set the y2 Axis tick text's position relatively its original position
	 * @name axis․y2․tick․text․position
	 * @memberof Options
	 * @type {object}
	 * @default {x: 0, y:0}
	 * @example
	 * axis: {
	 *   y2: {
	 *     tick: {
	 *       text: {
	 *         position: {
	 *           x: 10,
	 *           y: 10
	 *         }
	 *       }
	 *     }
	 *   }
	 * }
	 */
	axis_y2_tick_text_position: {x: 0, y: 0},

	/**
	 * Set padding for y2 axis.<br><br>
	 * You can set padding for y2 axis to create more space on the edge of the axis.
	 * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
	 *
	 * - **NOTE:**
	 *   - Given values are translated relative to the y2 Axis domain value for padding
	 *   - For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
	 * @name axis․y2․padding
	 * @memberof Options
	 * @type {object|number}
	 * @default {}
	 * @example
	 * axis: {
	 *   y2: {
	 *     padding: {
	 *       top: 100,
	 *       bottom: 100
	 *     }
	 *
	 *     // or set both values at once.
	 *     padding: 10
	 * }
	 */
	axis_y2_padding: <number|{top?: number; bottom?: number;}> {},

	/**
	 * Set default range of y2 axis.<br><br>
	 * This option set the default value for y2 axis when there is no data on init.
	 * @name axis․y2․default
	 * @memberof Options
	 * @type {Array}
	 * @default undefined
	 * @example
	 * axis: {
	 *   y2: {
	 *     default: [0, 1000]
	 *   }
	 * }
	 */
	axis_y2_default: undefined,

	/**
	 * Set additional axes for y2 Axis.
	 * - **NOTE:** Axis' scale is based on y2 Axis value if domain option isn't set.
	 *
	 * Each axis object should consist with following options:
	 *
	 * | Name | Type | Default | Description |
	 * | --- | --- | --- | --- |
	 * | domain | Array | - | Set the domain value |
	 * | tick.outer | boolean | true | Show outer tick |
	 * | tick.format | Function | - | Set formatter for tick text |
	 * | tick.count | Number | - | Set the number of y axis ticks |
	 * | tick.values | Array | - | Set tick values manually |
	 * @name axis․y2․axes
	 * @memberof Options
	 * @type {Array}
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
	 * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
	 * @example
	 * y2: {
	 *    axes: [
	 *      {
	 *        // if set, will not be correlated with the main y2 Axis domain value
	 *        domain: [0, 1000],
	 *        tick: {
	 *          outer: false,
	 *          format: function(x) {
	 *             return x + "%";
	 *          },
	 *          count: 2,
	 *          values: [10, 20, 30]
	 *        }
	 *      },
	 *      ...
	 *    ]
	 * }
	 */
	axis_y2_axes: []
};
