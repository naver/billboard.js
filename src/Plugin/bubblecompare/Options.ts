/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Bubble compare plugin option class
 * @class BubblecompareOptions
 * @param {Options} options Bubblecompare plugin options
 * @augments Plugin
 * @returns {BubblecompareOptions}
 * @private
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Set minimum size of bubble radius. (px)
			 * @name minR
			 * @memberof plugin-bubblecompare
			 * @type {number}
			 * @default 11
			 * @example
			 *   minR: 11
			 */
			minR: 11,

			/**
			 * Set maximum size of bubble radius. (px)
			 * @name maxR
			 * @memberof plugin-bubblecompare
			 * @type {number}
			 * @default 11
			 * @example
			 *   maxR: 74
			 */
			maxR: 11,

			/**
			 * Specify bubble expand ratio when focused
			 * @name expandScale
			 * @memberof plugin-bubblecompare
			 * @type {number}
			 * @default 1
			 * @example
			 *   expandScale: 1.2
			 */
			expandScale: 1
		};
	}
}
