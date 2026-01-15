/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * gauge config options
 */
export default {
	/**
	 * Set gauge options
	 * @name gauge
	 * @memberof Options
	 * @type {object}
	 * @property {object} gauge Gauge object
	 * @property {boolean} [gauge.background=""] Set background color. (The `.bb-chart-arcs-background` element)
	 * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
	 * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
	 * @property {function} [gauge.label.extents] Set customized min/max label text.
	 * @property {function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.<br>
	 * Will pass following arguments to the given function:
	 * - value {number}: absolute value
	 * - ratio {number}: value's ratio
	 * - id {string}: data's id value
	 * @property {number|function} [gauge.label.ratio=undefined] Set ratio of labels position.
	 * @property {number} [gauge.label.threshold=0] Set threshold ratio to show/hide labels.
	 * @property {boolean|object} [gauge.label.line=false] Enable label with lines (displayed outside with connector lines).
	 *  - **NOTE:** Only applicable for single gauge (not for `gauge.type="multi"`).
	 *  - `true`: Enable label with lines with default settings
	 *  - `false`: Labels are displayed inside the gauge (default behavior).
	 *  - `{show: boolean, distance: number, text: boolean}`: Enable label with lines with custom settings. When object member is not provided, it will be set to default values.
	 * @property {boolean} [gauge.label.line.show=true] Show or hide connector lines.
	 * @property {number} [gauge.label.line.distance=20] Set the distance of the horizontal part of the connector line in pixels.
	 * @property {boolean|function} [gauge.label.line.text=true] Show text at the end of the connector line (outside the shape).
	 *  - `true`: show data "id" text
	 *  - `false`: use default formatter(label.format) to show text
	 *  - `function(value, ratio, id)`: Custom formatter function for the text.
	 *  - **NOTE:** When the viewport size decreases, the size is adjusted based on the shape, so text may appear clipped. In this case, consider setting `overflow: visible` on the SVG node.
	 * @property {object|function} [gauge.label.image] Set image to be displayed next to the label text.<br><br>
	 * When function is specified, will receives 3 arguments such as `v, id, i` and it must return an image object with `url`, `width`, `height`, and optional `pos` properties.<br><br>
	 * The arguments are:<br>
	 *  - `v` is the value of the data point where the label is shown.
	 *  - `id` is the id of the data where the label is shown.
	 *  - `i` is the index of the data series point where the label is shown.
	 * @property {string} gauge.label.image.url Image URL path. Can use placeholder `{=ID}` which will be replaced with the data ID.
	 * @property {number} gauge.label.image.width Image width in pixels.
	 * @property {number} gauge.label.image.height Image height in pixels.
	 * @property {object} [gauge.label.image.pos] Image position relative to the label text.
	 * @property {number} [gauge.label.image.pos.x=0] x coordinate position, relative the original.
	 * @property {number} [gauge.label.image.pos.y=0] y coordinate position, relative the original.
	 * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
	 * @property {number} [gauge.expand.rate=0.98] Set expand rate.
	 * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
	 * @property {boolean} [gauge.enforceMinMax=false] Enforce to given min/max value.
	 * - **Note:** Only works for single data series.
	 * 	- When `gauge.min=50` and given value is `30`, gauge will render as empty value.
	 * 	- When `gauge.max=100` and given value is `120`, gauge will render till 100, not surpassing max value.
	 * @property {number} [gauge.min=0] Set min value of the gauge.
	 * @property {number} [gauge.max=100] Set max value of the gauge.
	 * @property {number} [gauge.startingAngle=-1 * Math.PI / 2] Set starting angle where data draws.
	 *
	 * **Limitations:**
	 * - when `gauge.fullCircle=false`:
	 *   - -1 * Math.PI / 2 <= startingAngle <= Math.PI / 2
	 *   - `startingAngle <= -1 * Math.PI / 2` defaults to `-1 * Math.PI / 2`
	 *   - `startingAngle >= Math.PI / 2` defaults to `Math.PI / 2`
	 * - when `gauge.fullCircle=true`:
	 *   - -1 * Math.PI < startingAngle < Math.PI
	 *   - `startingAngle < -1 * Math.PI` defaults to `Math.PI`
	 *   - `startingAngle >  Math.PI` defaults to `Math.PI`
	 * @property {number} [gauge.arcLength=100] Set the length of the arc to be drawn in percent from -100 to 100.<br>
	 * Negative value will draw the arc **counterclockwise**. Need to be used in conjunction with `gauge.fullCircle=true`.
	 *
	 * **Limitations:**
	 * - -100 <= arcLength (in percent) <= 100
	 * - 'arcLength < -100' defaults to -100
	 * - 'arcLength > 100' defaults to 100
	 * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character for line break.
	 *  - **NOTE:**
	 *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
	 * @property {string} [gauge.units] Set units of the gauge.
	 * @property {number} [gauge.width] Set width of gauge chart.
	 * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
	 * **Available Values:**
	 * - single
	 * - multi
	 * @property {number} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
	 * @see [Demo: enforceMinMax, min/max](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeMinMax)
	 * @see [Demo: archLength](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeArcLength)
	 * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeStartingAngle)
	 * @see [Demo: label image](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeLabelImage)
	 * @see [Demo: label line](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeLabelLine)
	 * @see [Demo: label ratio](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeLabelRatio)
	 * @example
	 *  gauge: {
	 *      background: "#eee", // will set 'fill' css prop for '.bb-chart-arcs-background' classed element.
	 *      fullCircle: false,
	 *      label: {
	 *          show: false,
	 *          format: function(value, ratio, id) {
	 *              return value;
	 *
	 *              // to multiline, return with '\n' character
	 *              // return value +"%\nLine1\n2Line2";
	 *          },
	 *
	 *           extents: function(value, isMax) {
	 *              return (isMax ? "Max:" : "Min:") + value;
	 *          },
	 *
	 *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
	 *          // if data value is below than 0.1, text label will be hidden.
	 *          threshold: 0.1,
	 *
	 *          // Enable label with lines (displayed outside with connector lines)
	 *          // NOTE: Only works with single gauge (not gauge.type="multi")
	 *          line: true,   // enable label with lines with default settings
	 *          line: {       // enable label with lines with custom settings
	 *              show: true,      // enable lines (default: true when line is enabled)
	 *              distance: 30,    // distance of horizontal line in pixels (default: 20)
	 *
	 *              // show text at the end of connector line (outside the shape)
	 *              text: true,  // use default formatter
	 *              text: function(value, ratio, id) {  // custom formatter
	 *                  return d3.format(".1%")(ratio);
	 *              }
	 *          },
	 *
	 *          // set ratio callback. Should return ratio value
	 *          ratio: function(d, radius, h) {
	 *              ...
	 *              return ratio;
	 *          },
	 *          // or set ratio number
	 *          ratio: 0.5,
	 *
	 *          // set image to be displayed next to the label text
	 *          image: {
	 *             url: "./sample.svg",
	 *
	 *             // use placeholder to dynamically set image URL based on data ID
	 *             url: "./images/{=ID}.svg",  // will be replaced to "./images/data1.svg", "./images/data2.svg", etc.
	 *             width: 35,
	 *             height: 35,
	 *             pos: {
	 *                x: 0,
	 *                y: 0
	 *             }
	 *          },
	 *
	 *          // or use function to return image configuration dynamically
	 *          image: function(v, id, i) {
	 *             // Return different images based on value
	 *             if (v > 500) {
	 *                return {
	 *                   url: "./high-value.svg",
	 *                   width: 40,
	 *                   height: 40,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             } else if (v > 100) {
	 *                return {
	 *                   url: "./medium-value.svg",
	 *                   width: 30,
	 *                   height: 30,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             } else if(v < 5) {
	 *                // Return falsy value in case of don't want to show image
	 *                return null;
	 *             } else {
	 *                return {
	 *                   url: "./low-value.svg",
	 *                   width: 20,
	 *                   height: 20,
	 *                   pos: { x: 0, y: 0 }
	 *                };
	 *             }
	 *          }
	 *      },
	 *
	 *      // disable expand transition for interaction
	 *      expand: false,
	 *
	 *      expand: {
	 *      	// set duration of expand transition to 500ms.
	 *          duration: 500,
	 *
	 *      	// set expand area rate
	 *          rate: 1
	 *      },
	 *
	 *      // enforce min/max value.
	 * 		// when given value < min, will render as empty value.
	 * 		// when value > max, will render to given max value not surpassing it.
	 *      enforceMinMax: true,
	 *
	 *      min: -100,
	 *      max: 200,
	 *      type: "single"  // or 'multi'
	 *      title: "Title Text",
	 *
	 *      // when 'arc.needle.show=true' is set, can show current needle value.
	 *      title: "Needle value:\n{=NEEDLE_VALUE}",
	 *
	 *      units: "%",
	 *      width: 10,
	 *      startingAngle: -1 * Math.PI / 2,
	 *      arcLength: 100,
	 *      arcs: {
	 *          minWidth: 5
	 *      }
	 *  }
	 */
	gauge_background: "",
	gauge_fullCircle: false,
	gauge_label_show: true,
	gauge_label_extents: <(() => string) | undefined>undefined,
	gauge_label_format: <(() => string) | undefined>undefined,
	gauge_label_ratio: <(() => number) | undefined>undefined,
	gauge_label_threshold: 0,
	gauge_label_line: <boolean | {
		show?: boolean,
		distance?: number,
		text?: boolean | ((value: number, ratio: number, id: string) => string)
	}>false,
	gauge_label_image: <
		| {url: string, width: number, height: number, pos?: {x?: number, y?: number}}
		| ((v: number, id: string, i: number) => {
			url: string,
			width: number,
			height: number,
			pos?: {x?: number, y?: number}
		} | null)
		| undefined
	>undefined,
	gauge_enforceMinMax: false,
	gauge_min: 0,
	gauge_max: 100,
	gauge_type: "single",
	gauge_startingAngle: -1 * Math.PI / 2,
	gauge_arcLength: 100,
	gauge_title: "",
	gauge_units: <string | undefined>undefined,
	gauge_width: <number | undefined>undefined,
	gauge_arcs_minWidth: 5,
	gauge_expand: <boolean | {duration: number}>{},
	gauge_expand_rate: 0.98,
	gauge_expand_duration: 50
};
