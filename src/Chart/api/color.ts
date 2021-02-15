/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export default {
	/**
	 * Get the color
	 * @function color
	 * @instance
	 * @memberof Chart
	 * @param {string} id id to get the color
	 * @returns {string}
	 * @example
	 * chart.color("data1");
	 */
	color(id: string): string {
		return this.internal.color(id); // more patterns
	}
};
