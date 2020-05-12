/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * color config options
 */
export default {
	/**
	 * Set color of the data values
	 * @name color
	 * @memberof Options
	 * @type {object}
	 * @property {object} color color object
	 * @property {string|object|Function} [color.onover] Set the color value for each data point when mouse/touch onover event occurs.
	 * @property {Array|null} [color.pattern=[]] Set custom color pattern. Passing `null` will not set a color for these elements, which requires the usage of custom CSS-based theming to work.
	 * @property {Function} [color.tiles] if defined, allows use svg's patterns to fill data area. It should return an array of [SVGPatternElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement).
	 *  - **NOTE:** The pattern element's id will be defined as `bb-colorize-pattern-$COLOR-VALUE`.<br>
	 *    ex. When color pattern value is `['red', '#fff']` and defined 2 patterns,then ids for pattern elements are:<br>
	 *    - `bb-colorize-pattern-red`
	 *    - `bb-colorize-pattern-fff`
	 * @property {object} [color.threshold] color threshold for gauge and tooltip color
	 * @property {string} [color.threshold.unit] If set to `value`, the threshold will be based on the data value. Otherwise it'll be based on equation of the `threshold.max` option value.
	 * @property {Array} [color.threshold.values] Threshold values for each steps
	 * @property {number} [color.threshold.max=100] The base value to determine threshold step value condition. When the given value is 15 and max 10, then the value for threshold is `15*100/10`.
	 * @example
	 *  color: {
	 *      pattern: ["#1f77b4", "#aec7e8", ...],
	 *
	 *      // Set colors' patterns
	 *      // it should return an array of SVGPatternElement
	 *      tiles: function() {
	 *         var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
	 *         var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	 *         var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	 *
	 *         pattern.setAttribute("patternUnits", "userSpaceOnUse");
	 *         pattern.setAttribute("width", "32");
	 *         pattern.setAttribute("height", "32");
	 *
	 *         g.style.fill = "#000";
	 *         g.style.opacity = "0.2";
	 *
	 *         circle1.setAttribute("cx", "3");
	 *         circle1.setAttribute("cy", "3");
	 *         circle1.setAttribute("r", "3");
	 *
	 *         g.appendChild(circle1);
	 *         pattern.appendChild(g);
	 *
	 *         return [pattern];
	 *      },
	 *
	 *      // for threshold usage, pattern values should be set for each steps
	 *      pattern: ["grey", "green", "yellow", "orange", "red"],
	 *      threshold: {
	 *          unit: "value",
	 *
	 *          // when value is 20 => 'green', value is 40 => 'orange' will be set.
	 *          values: [10, 20, 30, 40, 50],
	 *
	 *          // the equation for max:
	 *          // - unit == 'value': max => 30
	 *          // - unit != 'value': max => value*100/30
	 *          max: 30
	 *      },
	 *
	 *      // set all data to 'red'
	 *      onover: "red",
	 *
	 *      // set different color for data
	 *      onover: {
	 *          data1: "red",
	 *          data2: "yellow"
	 *      },
	 *
	 *      // will pass data object to the callback
	 *      onover: function(d) {
	 *          return d.id === "data1" ? "red" : "green";
	 *      }
	 *  }
	 */
	color_pattern: <(string|null)[]> [],
	color_tiles: <(() => [])|undefined> undefined,
	color_threshold: <{unit?: string; values?: number[]; max: number;}> {},
	color_onover: <string|object|undefined> undefined
};
