/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * TextOverlap plugin option class
 * @class TextOverlapOptions
 * @param {Options} options TextOverlap plugin options
 * @extends Plugin
 * @return {TextOverlapOptions}
 * @private
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Set selector string for target text nodes
			 * @name selector
			 * @memberof plugin-textoverlap
			 * @type {String}
			 * @default ".bb-texts text"
			 * @example
			 *  // selector for data label text nodes
			 * selector: ".bb-texts text"
			 */
			selector: ".bb-texts text",

			/**
			 * Set extent of label overlap prevention
			 * @name extent
			 * @memberof plugin-textoverlap
			 * @type {Number}
			 * @default 1
			 * @example
			 * 	extent: 1
			 */
			extent: 1,

			/**
			 * Set minimum area needed to show a data label
			 * @name area
			 * @memberof plugin-textoverlap
			 * @type {Number}
			 * @default 0
			 * @example
			 * 	area: 0
			 */
			area: 0
		};
	}
}
