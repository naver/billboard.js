/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export interface Axis {
	/**
	 * Switch x and y axis position.
	 */
	rotated?: boolean;
	x?: XAxisConfiguration;
	y?: YAxisConfiguration;
	y2?: YAxisConfiguration;
}

export interface XAxisConfiguration {
	/**
	 * Show or hide x axis.
	 */
	show?: boolean;

	/**
	 * Set type of x axis (timeseries, category, indexed)
	 */
	type?: string;

	/**
	 * Set how to treat the timezone of x values.
	 * If true, treat x value as localtime. If false, convert to UTC internally.
	 */
	localtime?: boolean;

	/**
	 * Set category names on category axis.
	 * This must be an array that includes category names in string.
	 * If category names are included in the date by data.x option, this is not required.
	 */
	categories?: string[];

	tick?: XTickConfiguration;

	/**
	 * Set max value of x axis range.
	 */
	max?: string | number | Date;

	/**
	 * Set min value of x axis range.
	 */
	min?: string | number | Date;

	/**
	 * Set padding for x axis.
	 * If this option is set, the range of x axis will increase/decrease according to the values.
	 * If no padding is needed in the ragen of x axis, 0 should be set. On category axis, this option will be ignored.
	 */
	padding?: {
		left?: number;
		right?: number;
	};

	/**
	 * Set height of x axis.
	 * The height of x axis can be set manually by this option.
	 * If you need more space for x axis, please use this option for that. The unit is pixel.
	 */
	height?: number;

	/**
	 * Set default extent for subchart and zoom.
	 * This can be an array or function that returns an array.
	 */
	extent?: number[] | string[] | (
		(
			domain: Date|string|number[],
			scale: (value: any) => number
		) => number[]
	);

	/**
	 * Set label on x axis.
	 * You can set x axis label and change its position by this option.
	 * string and object can be passed and we can change the poisiton by passing object that has position key.
	 *
	 * Available position differs according to the axis direction (vertical or horizontal). If string set, the position will be the default.
	 * - Valid horizontal positions: inner-right (Default), inner-center, inner-left, outer-right, outer-center, outer-left
	 * - Valid vertical positions: inner-top, inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
	 */
	label?: string | { text: string; position: string };

	/**
	 * Set clip-path attribute for x axis element.
	 */
	clipPath?: boolean;

	/**
	 * Set additional axes for Axis
	 */
	axes?: AxesConfiguration[];
}

export interface YAxisConfiguration {
	/**
	 * Show or hide y axis.
	 */
	show?: boolean;

	/**
	 * Show y axis inside of the chart.
	 */
	inner?: boolean;

	/**
	 * Set max value of y axis.
	 */
	max?: number;

	/**
	 * Set min value of y axis.
	 */
	min?: number;

	/**
	 * Change the direction of y axis.
	 * If true set, the direction will be from the top to the bottom.
	 */
	inverted?: boolean;

	/**
	 * Set center value of y axis.
	 */
	center?: number;

	/**
	 * Set label on y axis. This option works in the same way as axis.x.label.
	 *
	 * - Valid horizontal positions:
	 *   - inner-right (Default), inner-center, inner-left, outer-right, outer-center, outer-left
	 * - Valid vertical positions:
	 *   - inner-top, inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
	 */
	label?: string | { text: string; position: string };

	tick?: YTickConfiguration;

	/**
	 * Set padding for y axis.
	 * You can set padding for y axis to create more space on the edge of the axis.
	 * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
	 */
	padding?: {
		top?: number;
		bottom?: number;
	};

	/**
	 * Set default range of y axis.
	 * This option set the default value for y axis when there is no data on init.
	 */
	default?: number[];

	/**
	 * Set clip-path attribute for x axis element.
	 */
	clipPath?: boolean;

	/**
	 * Set additional axes for Axis
	 */
	axes?: AxesConfiguration[];
}

export interface XTickConfiguration {
	/**
	 * Centerise ticks on category axis
	 */
	centered?: boolean;

	/**
	 * A function to format tick value. Format string is also available for timeseries data.
	 */
	format?: string
		| ((x: number | Date) => string | number)
		| ((index: number, categoryName: string) => string);

	/**
	 * Setting for culling ticks.
	 * If true is set, the ticks will be culled, then only limitted tick text will be shown.
	 * This option does not hide the tick lines. If false is set, all of ticks will be shown.
	 */
	culling?: boolean | {
		/**
		 * The number of tick texts will be adjusted to less than this value.
		 */
		max?: number;
	};

	/**
	 * The number of x axis ticks to show.
	 * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will
	 * have rough second value).
	 */
	count?: number;

	/**
	 * Fit x axis ticks.
	 * - true: ticks will be positioned nicely to have same intervals.
	 * - false: ticks will be positioned according to x value of the data points.
	 */
	fit?: boolean;

	/**
	 * Set the x values of ticks manually.
	 * If this option is provided, the position of the ticks will be determined based on those values.
	 * This option works with timeseries data and the x values will be parsed accoding to the type of the value and data.xFormat option.
	 */
	values?: number[] | string[];

	/**
	 * Rotate x axis tick text. If you set negative value, it will rotate to opposite direction.
	 */
	rotate?: number;

	/**
	 * Show x axis outer tick.
	 */
	outer?: boolean;

	/**
	 * Set width of x axis tick.
	 */
	width?: number;

	/**
	 * Set tick text to be multiline
	 * - NOTE: When x tick text contains \n, it's used as line break and 'axis.x.tick.width' option is ignored.
	 */
	multiline?: boolean;

	/**
	 * Set to display system tooltip(via 'title' attribute) for tick text
	 * - NOTE: Only available for category axis type (axis.x.type='category')
	 */
	tooltip?: boolean;

	/**
	 * Show or hide tick line.
	 */
	show?: boolean;

	text?: {
		/**
		 * Set the x Axis tick text's position relatively its original position
		 */
		position?: {
			x?: number;
			y?: number;
		};

		/**
		 * Show or hide tick text
		 */
		show?: boolean;
	};
}

export interface YTickConfiguration {
	/**
	 * Show or hide outer tick.
	 */
	outer?: boolean;

	/**
	 * Set the y values of ticks manually.
	 */
	values?: number[];

	/**
	 * The number of y axis ticks to show.
	 * The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely.
	 * In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
	 */
	count?: number;

	/**
	 * Set formatter for y axis tick text.
	 * This option accepts d3.format object as well as a function you define.
	 */
	format?(x: number): string;

	text?: {
		/**
		 * Set the x Axis tick text's position relatively its original position
		 */
		position?: {
			x?: number;
			y?: number;
		}
	};
}

export interface AxesConfiguration {
	tick?: {
		/**
		 * Show outer tick
		 */
		outer?: boolean;

		/**
		 * Set formatter for tick text
		 */
		format?: (x: string) => string;

		/**
		 * Set the number of y axis ticks
		 */
		count?: number;

		/**
		 * Set tick values manually
		 */
		values?: number|string|Date[];
	};
}
