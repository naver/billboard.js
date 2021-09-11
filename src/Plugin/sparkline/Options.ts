/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Sparkline plugin option class
 * @class SparklineOptions
 * @param {Options} options Sparkline plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Specify sparkline charts holder selector.
			 * - **NOTE:** The amount of holder should match with the amount of data. If has less, will append necessaray amount nodes as sibling of main chart.
			 * @name selector
			 * @memberof plugin-sparkline
			 * @type {string}
			 * @default undefined
			 * @example
			 *   selector: ".sparkline"
			 */
			selector: undefined
		};
	}
}
