/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export interface StanfordOptions {
	/**
	 * Set the color of the color scale.
	 */
	colors?: (value: number) => string;

	/**
	 * Specify the key of epochs values in the data.
	 */
	epochs?: number[];

	/**
	 * Show additional lines anywhere on the chart.
	 */
	lines?: StanfordLineOptions[];

	padding?: {
		/**
		 * The padding on the top of the color scale.
		 */
		top?: number;

		/**
		 * The padding on the right of the color scale.
		 */
		right?: number;

		/**
		 * The padding on the bottom of the color scale.
		 */

		bottom?: number;

		/**
		 * The padding on the left of the color scale.
		 */
		left?: number;
	};

	/**
	 * Show additional regions anywhere on the chart
	 */
	regions?: StanfordRegionOptions[];

	scale?: {
		/**
		 * Minimum value of the color scale. Default: lowest value in epochs
		 */
		min?: number;

		/**
		 * Maximum value of the color scale. Default: highest value in epochs
		 */
		max?: number;

		/**
		 * Width of the color scale
		 */
		width?: number;

		/**
		 * Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function.
		 */
		format?: string | ((x: number) => string);
	};
}

export interface StanfordLineOptions {
	/**
	 * Starting position of the line on the x axis
	 */
	x1?: number;
	/**
	 * Starting position of the line on the y axis
	 */
	y1?: number;
	/**
	 * Ending position of the line on the x axis
	 */
	x2?: number;
	/**
	 * Ending position of the line on the x axis
	 */
	y2?: number;
	/**
	 * Set a custom css class to this line.
	 */
	class?: string;
}

export interface StanfordRegionOptions {
	/**
	 * Accepts a group of objects that has x and y.
	 */
	points?: StanfordPointOptions[];
	/**
	 * Sets the opacity of the region as value between 0 and 1. Default: 0.2
	 */
	opacity?: number;
	/**
	 * This function receives a value and percentage of the number of epochs in this region.
	 * Return a string to place text in the middle of the region.
	 */
	text?: (value: number, percentage: number) => string;
	/**
	 * Set a custom css class to this region, use the fill property in css to set a background color.
	 */
	class?: string;
}

export interface StanfordPointOptions {
	x?: number;
	y?: number;
}

export interface StanfordTextOptions {
	x?: number;
	y?: number;
	content?: string;
	class?: string;
}
