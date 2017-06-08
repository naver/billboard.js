/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @license MIT
 * @ignore
 */
import ChartInternal from "./ChartInternal";

/**
 * Main chart class.
 * - Note: Instantiated via `bb.generate()`.
 * @class Chart
 * @example
 * var chart = bb.generate({
 *  data: {
 *    columns: [
 *	    ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
 * 	    ["count1", 11, 8, 7, 6, 5 ],
 *	    ["count2", 9, 3, 6, 2, 8 ]
 *   ]}
 * }
 * @see {@link bb.generate} for the initialization.
*/
export default class Chart {
	constructor(config) {
		const $$ = new ChartInternal(this);

		this.internal = $$;

		$$.loadConfig(config);
		$$.beforeInit(config);
		$$.init();
		$$.afterInit(config);

		// bind "this" to nested API
		(function bindThis(fn, target, argThis) {
			Object.keys(fn).forEach(key => {
				target[key] = fn[key].bind(argThis);

				Object.keys(fn[key]).length &&
					bindThis(fn[key], target[key], argThis);
			});
		})(Chart.prototype, this, this);
	}
}
