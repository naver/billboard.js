/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * funnel config options
 */
export default {
	/**
	 * Set funnel options
	 * @name funnel
	 * @memberof Options
	 * @type {object}
	 * @property {object} funnel Funnel object
	 * @property {number} [funnel.neck.width=0] Set funnel neck width.
	 * @property {number} [funnel.neck.height=0] Set funnel neck height.
	 * @property {number} [funnel.neck.width.ratio] Set funnel neck width in ratio.
	 * @property {number} [funnel.neck.height.ratio] Set funnel neck height in ratio.
	 * @property {boolean} [funnel.rotated=false] Set funnel direction rotated. When set to `true`, the funnel will be rendered horizontally (left to right) instead of vertically (top to bottom).
	 * @property {boolean} [funnel.spline=false] Enable spline (curved) edges for the funnel.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
	 * @example
	 *  funnel: {
	 *      neck: {
	 *          width: 200,
	 *          height: 100,
	 *
	 *          // or specify as ratio value (relative to the chart size)
	 *          width: {
	 *            ratio: 0.5
	 *          },
	 *          height: {
	 *            ratio: 0.5
	 *          }
	 *      },
	 *
	 *      // Render funnel horizontally (left to right)
	 *      rotated: true,
	 *
	 *      // Enable curved edges
	 *      spline: true
	 *  }
	 */
	funnel_neck_width: <number | {ratio: number}>0,
	funnel_neck_height: <number | {ratio: number}>0,
	funnel_rotated: false,
	funnel_spline: false
};
