/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import { Chart } from "./chart";
import { Options } from "./options";
import { d3Selection } from "./types";
declare module "billboard.js" {
	export namespace bb {
		/**
		 * Generate chart
		 * @param options Chart generation options
		 */
		export function generate(options: Options): Chart;

		/**
		 * Version information
		 */
		export const version: string;

		/**
		 * An array containing instance created
		 */
		export const instance: Chart[];

		export const $: {
			/**
			 * Wrapper element
			 */
			chart: d3Selection;

			/**
			 * Main svg element
			 */
			svg: d3Selection;

			/**
			 * Definition element
			 */
			defs: d3Selection;

			/**
			 * Main grouping element
			 */
			main: d3Selection;

			/**
			 * Tooltip element
			 */
			tooltip: d3Selection;

			/**
			 * Legend element
			 */
			legend: d3Selection;

			/**
			 * Title element
			 */
			title: d3Selection;

			/**
			 * Grid element
			 */
			grid: d3Selection;

			/**
			 * Arc element
			 */
			arc: d3Selection;

			bar: {
				/**
				 * Bar elements
				 */
				bars: d3Selection;
			};

			line: {
				/**
				 * Line elements
				 */
				lines: d3Selection;

				/**
				 * Areas elements
				 */
				areas: d3Selection;

				/**
				 * Data point circle elements
				 */
				circles: d3Selection;
			};

			text: {
				/**
				 * Data label text elements
				 */
				texts: d3Selection;
			};
		};
	}
}
