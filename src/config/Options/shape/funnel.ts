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
	 *      }
	 *  }
	 */
	funnel_neck_width: <number | {ratio: number}>0,
	funnel_neck_height: <number | {ratio: number}>0
};
