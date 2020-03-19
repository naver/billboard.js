/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export default {
	/**
	 * Set specified category name on category axis.
	 * @function category
	 * @instance
	 * @memberof Chart
	 * @param {number} i index of category to be changed
	 * @param {string} category category value to be changed
	 * @returns {string}
	 * @example
	 * chart.category(2, "Category 3");
	 */
	category(i: number, category: string): string {
		const $$ = this.internal;
		const {config} = $$;

		if (arguments.length > 1) {
			config.axis_x_categories[i] = category;
			$$.redraw();
		}

		return config.axis_x_categories[i];
	},

	/**
	 * Set category names on category axis.
	 * @function categories
	 * @instance
	 * @memberof Chart
	 * @param {Array} categories This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
	 * @returns {Array}
	 * @example
	 * chart.categories([
	 *      "Category 1", "Category 2", ...
	 * ]);
	 */
	categories(categories: string[]): string[] {
		const $$ = this.internal;
		const {config} = $$;

		if (!arguments.length) {
			return config.axis_x_categories;
		}

		config.axis_x_categories = categories;
		$$.redraw();

		return config.axis_x_categories;
	}
};
