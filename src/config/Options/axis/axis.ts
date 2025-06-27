/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import x from "./x";
import y from "./y";
import y2 from "./y2";

/**
 * y Axis  config options
 */
export default {
	/**
	 * Setup the way to evaluate tick text size.
	 * - **NOTE:**
	 *   - Setting `false` or custom evaluator, highly recommended to memoize evaluated text dimension value to not degrade performance.
	 * @name axis․evalTextSize
	 * @memberof Options
	 * @type {boolean|Function}
	 * @default true
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.AxisEvalTextSize)
	 * @example
	 * axis: {
	 *   // will evaluate getting text size every time.
	 *   evalTextSize: false.
	 *
	 *   // set a custom evaluator
	 *   evalTextSize: function(textElement, axisId) {
	 *     // set some character to be evaluated
	 *     // NOTE: The dummy textElement is a descendant of given axisId('x', 'y' or 'y2').
	 *     textElement.textContent = "0";
	 *
	 *     // get the size
	 *     const box = textElement.getBBox();
	 *
	 *     // clear text
	 *     textElement.textContent = "";
	 *
	 *     return { w: 7, h: 12};
	 *   },
	 *
	 *   // set a custom evaluator by returning fixed value
	 *   evalTextSize: function(textElement, axisId) {
	 *     return {
	 *        x: {w: 7, h: 12},
	 *        y: {w: 15.75, h: 30},
	 *        y2: {w: 9.5, h: 18}
	 *     }[axisId];
	 *   }
	 * }
	 */
	axis_evalTextSize: <
		| boolean
		| ((text: SVGTextElement, axisId: "x" | "y" | "y2") => {w: number, h: number})
	>true,

	/**
	 * Switch x and y axis position.
	 * @name axis․rotated
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @example
	 * axis: {
	 *   rotated: true
	 * }
	 */
	axis_rotated: false,

	/**
	 * Set axis tooltip.
	 * - **NOTE:**
	 *   - When enabled, will disable default focus grid line.
	 *   - For `timeseries` x Axis, tootlip will be formatted using x Axis' tick format.
	 *   - For `category` x Axis, tootlip will be displaying scales' value text.
	 * @name axis․tooltip
	 * @memberof Options
	 * @type {boolean}
	 * @default false
	 * @property {object} axis Axis object
	 * @property {boolean} [axis.tooltip=false] Show tooltip or not.
	 * @property {string|object} [axis.tooltip.backgroundColor] Set axis tooltip text background colors.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.AxisTooltip)
	 * @example
	 * axis: {
	 *     tooltip: true, // default background color is
	 *
	 *     // set backgound color for axis tooltip texts
	 *     tooltip: {
	 *          backgroundColor: "red",
	 *
	 *          // set differenct backround colors per axes
	 *          // NOTE: In this case, only specified axes tooltip will appear.
	 *          backgroundColor: {
	 *               x: "green",
	 *               y: "yellow",
	 *               y2: "red"
	 *          }
	 *     }
	 * }
	 */
	axis_tooltip: <boolean | {
		backgroundColor?: string | {x?: string, y?: string, y2?: string}
	}>false,
	...x,
	...y,
	...y2
};
