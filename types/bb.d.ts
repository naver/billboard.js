/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import { Chart } from "./chart";
import { ChartOptions } from "./options";

export const bb: {
	/**
	 * Generate chart
	 * @param options Chart generation options
	 */
	generate(options: ChartOptions): Chart;

	/**
	 * Set or get global default options.
	 * - **NOTE:**
	 *   - The options values settings are valid within page context only.
	 *   - If is called multiple times, will override the last value.
	 * @param options Chart generation options
	 */
	defaults(options: ChartOptions): ChartOptions;

	/**
	 * Version information
	 */
	version: string;

	/**
	 * An array containing instance created
	 */
	instance: Chart[];
};
