/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export default {
	/**
	 * Category Name
	 * @private
	 * @param {Number} index
	 * @returns {String} gategory Name
	 */
	categoryName(i) {
		const {axis_x_categories: categories} = this.config;

		return i < categories.length ? categories[i] : i;
	},
};
