/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Get the color
	 * @method color
	 * @instance
	 * @memberof Chart
	 * @param {String} id id to get the color
	 * @example
	 * chart.color("data1");
	 */
	color(id) {
		const $$ = this.internal;

		return $$.color(id); // more patterns
	}
});
