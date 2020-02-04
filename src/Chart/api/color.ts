/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export default {
	/**
	 * Get the color
	 * @method color
	 * @instance
	 * @memberof Chart
	 * @param {String} id id to get the color
	 * @example
	 * chart.color("data1");
	 */
	color(id: string) {
		return this.internal.color(id); // more patterns
	}
};
