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
	 * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutCornerRadius)
	 * @see [Demo: Gauge corner radius](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeCornerRadius)
	 * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#PieChartOptions.CornerRadius)
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
	 *      }
	 *  }
	 */
	arc_cornerRadius: <
		number|((id: string, value: number) => number)
	> 0,
	arc_cornerRadius_ratio: 0
};
