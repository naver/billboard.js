/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * TableView plugin option class
 * @class TableviewOptions
 * @param {Options} options TableView plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Set tableview holder selector.
			 * - **NOTE:** If not set, will append new holder element dynamically right after chart element.
			 * @name selector
			 * @memberof plugin-tableview
			 * @type {string}
			 * @default undefined
			 * @example
			 *   selector: "#table-holder"
			 */
			selector: undefined,

			/**
			 * Set category title text
			 * @name categoryTitle
			 * @memberof plugin-tableview
			 * @type {string}
			 * @default "Category"
			 * @example
			 *   categoryTitle: "#table-holder"
			 */
			categoryTitle: "Category",

			/**
			 * Set category text format function.
			 * @name categoryFormat
			 * @memberof plugin-tableview
			 * @type {Function}
			 * @returns {string}
			 * @default function(v) { // will return formatted value according x Axis type }}
			 * @example
			 *   categoryFormat: "#table-holder"
			 */
			categoryFormat: function(v: Date|number|string): string {
				let category = v;

				if (this.$$.axis.isCategorized()) {
					category = this.$$.categoryName(v);
				} else if (this.$$.axis.isTimeSeries()) {
					category = (v as Date).toLocaleDateString();
				}

				return category as string;
			},

			/**
			 * Set tableview holder class name.
			 * @name class
			 * @memberof plugin-tableview
			 * @type {string}
			 * @default undefined
			 * @example
			 *   class: "table-class-name"
			 */
			class: undefined,

			/**
			 * Set to apply default style(`.bb-tableview`) to tableview element.
			 * @name style
			 * @memberof plugin-tableview
			 * @type {boolean}
			 * @default true
			 * @example
			 *   style: false
			 */
			style: true,

			/**
			 * Set tableview title text.
			 * - **NOTE:** If set [title.text](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.title), will be used when this option value is empty.
			 * @name title
			 * @memberof plugin-tableview
			 * @type {string}
			 * @default undefined
			 * @example
			 *   title: "Table Title Text"
			 */
			title: undefined,

			/**
			 * Update tableview from data visibility update(ex. legend toggle).
			 * @name updateOnToggle
			 * @memberof plugin-tableview
			 * @type {boolean}
			 * @default true
			 * @example
			 *   legendToggleUpdate: false
			 */
			updateOnToggle: true
		};
	}
}
