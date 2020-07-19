/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {Chart} from "./chart";
import {ChartOptions} from "./options";

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

// shape modules
export const area: () => "area";
export const areaLineRange: () => "area-line-range";
export const areaSpline: () => "area-spline";
export const areaSplineRange: () => "area-spline-range";
export const areaStep: () => "area-step";
export const bar: () => "bar";
export const bubble: () => "bubble";
export const donut: () => "donut";
export const gauge: () => "gauge";
export const line: () => "line";
export const pie: () => "pie";
export const radar: () => "radar";
export const scatter: () => "scatter";
export const spline: () => "spline";
export const step: () => "step";

// interaction modules
export const selection: () => true;
export const subchart: () => true;
export const zoom: () => true;
