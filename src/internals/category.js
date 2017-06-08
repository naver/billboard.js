/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Category Name
	 * @private
	 * @param {Number} index
	 * @returns {String} gategory Name
	 */
	categoryName(i) {
		const config = this.config;

		return i < config.axis_x_categories.length ? config.axis_x_categories[i] : i;
	},
});
