/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
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
	 * @property {boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
	 * @property {number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
	 *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
	 * @property {boolean} [point.focus.only=false] Show point only when is focused.
	 * @property {number|null} [point.opacity=undefined] Set point opacity value.
	 * - **NOTE:**
	 *	- `null` will make to not set inline 'opacity' css prop.
	 *	- when no value(or undefined) is set, it defaults to set opacity value according its chart types.
	 * @property {number} [point.sensitivity=10] The senstivity value for interaction boundary.
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
	point_sensitivity: 10,
	point_focus_expand_enabled: true,
	point_focus_expand_r: <number|undefined> undefined,
	point_focus_only: false,
	point_opacity: <number|null|undefined> undefined,
	point_pattern: <string[]> [],
	point_select_r: <number|undefined> undefined,
	point_type: "circle"
};
