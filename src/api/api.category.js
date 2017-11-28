/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Set specified category name on category axis.
	 * @method category
	 * @instance
	 * @memberOf Chart
	 * @param {Number} i index of category to be changed
	 * @param {String} category category value to be changed
	 * @example
	 * chart.category(2, "Category 3");
	 */
	category(i, category) {
		const $$ = this.internal;
		const config = $$.config;

		if (arguments.length > 1) {
			config.axis_x_categories[i] = category;
			$$.redraw();
		}

		return config.axis_x_categories[i];
	},

	/**
	 * Set category names on category axis.
	 * @method categories
	 * @instance
	 * @memberOf Chart
	 * @param {Array} categories This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
	 * @example
	 * chart.categories([
	 *      "Category 1", "Category 2", ...
	 * ]);
	 */
	categories(categories) {
		const $$ = this.internal;
		const config = $$.config;

		if (!arguments.length) {
			return config.axis_x_categories;
		}

		config.axis_x_categories = categories;
		$$.redraw();

		return config.axis_x_categories;
	}
});
