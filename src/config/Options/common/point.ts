/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {IDataPoint} from "../../../ChartInternal/data/IData";

/**
 * point config options
 */
export default {
	/**
	 * Set point options
	 * @name point
	 * @memberof Options
	 * @type {object}
	 * @property {object} point Point object
	 * @property {boolean} [point.show=true] Whether to show each point in line.
	 * @property {number|Function} [point.r=2.5] The radius size of each point.
	 *  - **NOTE:** Disabled for 'bubble' type
	 * @property {boolean|object} [point.radialGradient=false] Set the radial gradient on point.<br><br>
	 * Or customize by giving below object value:
	 *  - cx {number}: `cx` value (default: `0.3`)
	 *  - cy {number}: `cy` value (default: `0.3`)
	 *  - r {number}: `r` value (default: `0.7`)
	 *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
	 *    - (default: `[[0.1, $DATA_COLOR, 1], [0.9, $DATA_COLOR, 0]]`)
	 * @property {boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
	 * @property {number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
	 *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
	 * @property {boolean} [point.focus.only=false] Show point only when is focused.
	 * @property {number|null} [point.opacity=undefined] Set point opacity value.
	 * - **NOTE:**
	 * 	- `null` will make to not set inline 'opacity' css prop.
	 * 	- when no value(or undefined) is set, it defaults to set opacity value according its chart types.
	 * @property {number|string|Function} [point.sensitivity=10] The senstivity value for interaction boundary.
	 * - **Available Values:**
	 *   - {number}: Absolute sensitivity value which is the distance from the data point in pixel.
	 *   - "radius": sensitivity based on point's radius
	 *   - Function: callback for each point to determine the sensitivity<br>
	 *    	```js
	 *   	sensitivity: function(d) {
	 * 	  // ex. of argument d:
	 * 	  // ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
	 *
	 * 	  // returning d.r, will make sensitivity same as point's radius value.
	 *  	  return d.r;
	 * 	}
	 * 	```
	 * @property {number} [point.select.r=point.r*4] The radius size of each point on selected.
	 * @property {string} [point.type="circle"] The type of point to be drawn
	 * - **NOTE:**
	 *   - If chart has 'bubble' type, only circle can be used.
	 *   - For IE, non circle point expansions are not supported due to lack of transform support.
	 * - **Available Values:**
	 *   - circle
	 *   - rectangle
	 * @property {Array} [point.pattern=[]] The type of point or svg shape as string, to be drawn for each line
	 * - **NOTE:**
	 *   - This is an `experimental` feature and can have some unexpected behaviors.
	 *   - If chart has 'bubble' type, only circle can be used.
	 *   - For IE, non circle point expansions are not supported due to lack of transform support.
	 * - **Available Values:**
	 *   - circle
	 *   - rectangle
	 *   - svg shape tag interpreted as string<br>
	 *     (ex. `<polygon points='2.5 0 0 5 5 5'></polygon>`)
	 * @see [Demo: point type](https://naver.github.io/billboard.js/demo/#Point.RectanglePoints)
	 * @see [Demo: point focus only](https://naver.github.io/billboard.js/demo/#Point.FocusOnly)
	 * @see [Demo: point radialGradient](https://naver.github.io/billboard.js/demo/#Point.RadialGradientPoint)
	 * @see [Demo: point sensitivity](https://naver.github.io/billboard.js/demo/#Point.PointSensitivity)
	 * @example
	 *  point: {
	 *      show: false,
	 *      r: 5,
	 *
	 *      // or customize the radius
	 *      r: function(d) {
	 *          ...
	 *          return r;
	 *      },
	 *
	 *      // will generate follwing radialGradient:
	 *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
	 *      // <radualGradient cx="0.3" cy="0.3" r="0.7">
	 *      //    <stop offset="0.1" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
	 *      //    <stop offset="0.9" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
	 *      // </radialrGradient>
	 *      radialGradient: true,
	 *
	 *      // Or customized gradient
	 *      radialGradient: {
	 *      	cx: 0.3,  // cx attributes
	 *      	cy: 0.5,  // cy attributes
	 *      	r: 0.7,  // r attributes
	 *      	stops: [
	 *      	  // offset, stop-color, stop-opacity
	 *      	  [0, "#7cb5ec", 1],
	 *
	 *      	  // setting 'null' for stop-color, will set its original data color
	 *      	  [0.5, null, 0],
	 *
	 *      	  // setting 'function' for stop-color, will pass data id as argument.
	 *      	  // It should return color string or null value
	 *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
	 *      	]
	 *      },
	 *
	 *      focus: {
	 *          expand: {
	 *              enabled: true,
	 *              r: 1
	 *          },
	 *          only: true
	 *      },
	 *
	 *      // do not set inline 'opacity' css prop setting
	 *      opacity: null,
	 *
	 *      // set every data point's opacity value
	 *      opacity: 0.7,
	 *
	 *      select: {
	 *          r: 3
	 *      },
	 *
	 *      // having lower value, means how closer to be for interaction
	 *      sensitivity: 3,
	 *
	 *      // sensitivity based on point's radius
	 *      sensitivity: "radius",
	 *
	 *      // callback for each point to determine the sensitivity
	 *      sensitivity: function(d) {
	 * 	// ex. of argument d:
	 * 	// ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
	 *
	 * 	// returning d.r, will make sensitivity same as point's radius value.
	 * 	return d.r;
	 *      }
	 *
	 *      // valid values are "circle" or "rectangle"
	 *      type: "rectangle",
	 *
	 *      // or indicate as pattern
	 *      pattern: [
	 *        "circle",
	 *        "rectangle",
	 *        "<polygon points='0 6 4 0 -4 0'></polygon>"
	 *     ],
	 *  }
	 */
	point_show: true,
	point_r: 2.5,
	point_radialGradient: <boolean | {
		cx?: number,
		cy?: number,
		r?: number,
		stops?: [number, string | null | Function, number]
	}>false,
	point_sensitivity: <number | "radius" | ((d: IDataPoint) => number)>10,
	point_focus_expand_enabled: true,
	point_focus_expand_r: <number | undefined>undefined,
	point_focus_only: false,
	point_opacity: <number | null | undefined>undefined,
	point_pattern: <string[]>[],
	point_select_r: <number | undefined>undefined,
	point_type: "circle"
};
