/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * TextOverlap plugin option class
 * @class TextOverlapOptions
 * @param {Options} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlapOptions}
 * @private
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Selector string for target text nodes within chart element.
			 * - **NOTE:** If no value is given, defaults to data label text elements.
			 * @name selector
			 * @memberof plugin-textoverlap
			 * @type {string}
			 * @default undefined
			 * @example
			 *  // selector for data label text nodes
			 * selector: ".bb-texts text"
			 */
			selector: undefined,

			/**
			 * Extent of label overlap prevention.
			 * @name extent
			 * @memberof plugin-textoverlap
			 * @type {number}
			 * @default 1
			 * @example
			 * 	extent: 1
			 */
			extent: 1,

			/**
			 * Minimum area needed to show a data label.
			 * @name area
			 * @memberof plugin-textoverlap
			 * @type {number}
			 * @default 0
			 * @example
			 * 	area: 0
			 */
			area: 0
		};
	}
}
