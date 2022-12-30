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
export function area(): "area";
export function areaLineRange(): "area-line-range";
export function areaSpline(): "area-spline";
export function areaSplineRange(): "area-spline-range";
export function areaStep(): "area-step";
export function bar(): "bar";
export function bubble(): "bubble";
export function candlestick(): "candlestick";
export function donut(): "donut";
export function gauge(): "gauge";
export function line(): "line";
export function pie(): "pie";
export function polar(): "polar";
export function radar(): "radar";
export function scatter(): "scatter";
export function spline(): "spline";
export function step(): "step";
export function treemap(): "treemap";

// interaction modules
export function selection(): true;
export function subchart(): true;
export function zoom(): true;
