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
	 * Version information
	 */
	version: string;

	/**
	 * An array containing instance created
	 */
	instance: Chart[];
};
