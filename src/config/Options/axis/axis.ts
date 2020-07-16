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
	...x,
	...y,
	...y2
};
