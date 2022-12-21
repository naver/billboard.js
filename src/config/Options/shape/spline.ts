/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * spline config options
 */
export default {
	/**
	 * Set spline options
	 * - **Available interpolation type values:**
	 *  - basis (d3.curveBasis)
	 *  - basis-closed (d3.curveBasisClosed)
	 *  - basis-open (d3.curveBasisOpen)
	 *  - bundle (d3.curveBundle)
	 *  - cardinal (d3.curveCardinal)
	 *  - cardinal-closed (d3.curveCardinalClosed)
	 *  - cardinal-open (d3.curveCardinalOpen)
	 *  - catmull-rom (d3.curveCatmullRom)
	 *  - catmull-rom-closed (d3.curveCatmullRomClosed)
	 *  - catmull-rom-open (d3.curveCatmullRomOpen)
	 *  - monotone-x (d3.curveMonotoneX)
	 *  - monotone-y (d3.curveMonotoneY)
	 *  - natural (d3.curveNatural)
	 *  - linear-closed (d3.curveLinearClosed)
	 *  - linear (d3.curveLinear)
	 *  - step (d3.curveStep)
	 *  - step-after (d3.curveStepAfter)
	 *  - step-before (d3.curveStepBefore)
	 * @name spline
	 * @memberof Options
	 * @type {object}
	 * @property {object} spline Spline object
	 * @property {object} spline.interpolation Spline interpolation object
	 * @property {string} [spline.interpolation.type="cardinal"] Interpolation type
	 * @see [Interpolation (d3 v4)](http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502)
	 * @example
	 *  spline: {
	 *      interpolation: {
	 *          type: "cardinal"
	 *      }
	 *  }
	 */
	spline_interpolation_type: "cardinal"
};
