/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * arc config options
 */
export default {
	/**
	 * Set arc options
	 * @name arc
	 * @memberof Options
	 * @type {object}
	 * @property {object} arc Arc object
	 * @property {number|Function} [arc.cornerRadius=0] Set corner radius of Arc(donut/gauge/pie/polar) shape.
	 *  - **NOTE:**
	 * 	  - Corner radius can't surpass the `(outerRadius - innerRadius) /2` of indicated shape.
	 * @property {number} [arc.cornerRadius.ratio=0] Set ratio relative of outer radius.
	 * @property {object} [arc.needle] Set needle options.
	 * @property {boolean} [arc.needle.show=false] Show or hide needle.
	 * @property {string} [arc.needle.color] Set needle filled color.
	 * @property {Function} [arc.needle.path] Set custom needle path function.
	 *  - **NOTE:**
	 *   - The path should be starting from 0,0 (which is center) to top center coordinate.
	 *   - The function will receive, `length`{number} parameter which indicating the needle length in pixel relative to radius.
	 * @property {number} [arc.needle.value] Set needle value.
	 *  - **NOTE:**
	 *   - For single gauge chart, needle will point the data value by default, otherwise will point 0(zero).
	 * @property {number} [arc.needle.length=100] Set needle length in percentages relative to radius.
	 * @property {object} [arc.needle.top] Set needle top options.
	 * @property {number} [arc.needle.top.rx=0] Set needle top [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
	 * @property {number} [arc.needle.top.ry=0] Set needle top [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
	 * @property {number} [arc.needle.top.width=0] Set needle top width in pixel.
	 * @property {object} [arc.needle.bottom] Set needle bottom options.
	 * @property {number} [arc.needle.bottom.rx=1] Set needle bottom [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
	 * @property {number} [arc.needle.bottom.ry=1] Set needle bottom [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
	 * @property {number} [arc.needle.bottom.width=15] Set needle bottom width in pixel.
	 * @property {number} [arc.needle.bottom.len=0] Set needle bottom length in pixel. Setting this value, will make bottom larger starting from center.
	 * @property {object} [arc.rangeText] Set rangeText options.
	 * @property {Array} [arc.rangeText.values] Set range text values to be shown around Arc.
	 * - When `unit: 'absolute'`: Given values are treated as absolute values.
	 * - When `unit: '%'`: Given values are treated as percentages.
	 * @property {string} [arc.rangeText.unit="absolute"] Specify the range text unit.
	 * - "absolute": Show absolute value
	 * - "%": Show percentage value
	 * @property {boolean} [arc.rangeText.fiexed=false] Set if range text shown will be fixed w/o data toggle update. Only available for gauge chart.
	 * @property {Function} [arc.rangeText.format] Set format function for the range text.
	 * @property {number} [arc.rangeText.position] Set position function or object for the range text.
	 * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutCornerRadius)
	 * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#PieChartOptions.CornerRadius)
	 * @see [Demo: Donut needle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutNeedle)
	 * @see [Demo: Donut RangeText](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutRangeText)
	 * @see [Demo: Gauge corner radius](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeCornerRadius)
	 * @see [Demo: Gauge needle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeNeedle)
	 * @see [Demo: Gauge RangeText](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeRangeText)
	 * @example
	 *  arc: {
	 *      cornerRadius: 12,
	 *
	 *      // can customize corner radius for each data with function callback
	 *      //
	 *      // The function will receive:
	 *      // - id {string}: Data id
	 *      // - value {number}: Data value
	 *      // - outerRadius {number}: Outer radius value
	 *      cornerRadius: function(id, value, outerRadius) {
	 *          return (id === "data1" && value > 10) ?
	 *          	50 : outerRadius * 1.2;
	 *      },
	 *
	 *      // set ratio relative of outer radius
	 *      cornerRadius: {
	 *          ratio: 0.5
	 *      },
	 *
	 *      needle: {
	 *       	show: true,
	 *       	color: "red", // any valid CSS color
	 *       	path: function(length) {
	 *       	  const len = length - 20;
	 *
	 *       	  // will return upper arrow shape path
	 *       	  // Note: The path should begun from '0,0' coordinate to top center.
	 *       	  const path = `M 0 -${len + 20}
	 *       		L -12 -${len}
	 *       		L -5 -${len}
	 *       		L -5 0
	 *       		A 1 1 0 0 0 5 0
	 *       		L 5 -${len}
	 *       		L 12 -${len} Z`;
	 *
	 *       	  return path;
	 *       	},
	 *       	value: 40,  // will make needle to point value 40.
	 *       	length: 80, // needle length in percentages relative to radius.
	 *
	 *       	top: {
	 *       	  // rx and ry are the two radii of the ellipse;
	 *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
	 *       	  rx: 1,
	 *       	  ry: 1,
	 *       	  width: 5
	 *       	},
	 *       	bottom: {
	 *       	  // rx and ry are the two radii of the ellipse;
	 *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
	 *       	  rx: 1,
	 *       	  ry: 1,
	 *       	  width: 10
	 *       	  len: 10
	 *       	}
	 *      },
	 *
	 *      rangeText: {
	 *       	values: [15, 30, 50, 75, 95],
	 *       	unit: "%",
	 *       	fixed: false, // only available for gauge chart
	 *       	format: function(v) {
	 *       	  return v === 15 ? "Fifteen" : v;
	 *       	},
	 *
	 *       	position: function(v) {
	 *       	  return v === 15 ? {x: 20, y: 10} : null; // can return one props value also.
	 *       	},
	 *       	position: {x: 10, y: 15},
	 *       	position: {x: 10}
	 *      }
	 *  }
	 */
	arc_cornerRadius: <number | ((id: string, value: number) => number)>0,
	arc_cornerRadius_ratio: 0,
	arc_needle_show: false,
	arc_needle_color: <string | undefined>undefined,
	arc_needle_value: <number | undefined>undefined,
	arc_needle_path: undefined,
	arc_needle_length: 100,
	arc_needle_top_rx: 0,
	arc_needle_top_ry: 0,
	arc_needle_top_width: 0,
	arc_needle_bottom_rx: 1,
	arc_needle_bottom_ry: 1,
	arc_needle_bottom_width: 15,
	arc_needle_bottom_len: 0,
	arc_rangeText_values: <number[] | undefined>undefined,
	arc_rangeText_unit: <"absolute" | "%">"absolute",
	arc_rangeText_fixed: false,
	arc_rangeText_format: <((v: number) => number) | undefined>undefined,
	arc_rangeText_position: <
		| ((v: number) => {x?: number, y?: number})
		| {x?: number, y?: number}
		| undefined
	>undefined
};
