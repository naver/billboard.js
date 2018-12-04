/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import { Chart } from "./chart";
import { Options } from "./options";

export const bb: {
	/**
	 * Generate chart
	 * @param options Chart generation options
	 */
	generate(options: Options): Chart;

	/**
	 * Version information
	 */
	version: string;

	/**
	 * An array containing instance created
	 */
	instance: Chart[];
};
