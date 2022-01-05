export interface TableViewOptions {
	/**
	 * Set tableview holder selector.
	 * - **NOTE:** If not set, will append new holder element dynamically.
	 */
	selector?: string;

	/**
	 * Set category title text
	 */
	categoryTitle?: string;

	/**
	 * Set category text format function.
	 */
	categoryFormat?: (v: Date|number|string) => string;

	/**
	 * Set tableview holder class name.
	 */
	class?: string;

	/**
	 * Set to apply default style to tableview element.
	 */
	style?: boolean;

	/**
	 * Set tableview title text.
	 * - **NOTE:** If set [title.text](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.title), will be used when this option value is empty.
	 */
	title?: string;

	/**
	 * Update tableview from data visibility update(ex. legend toggle).
	 */
	updateOnToggle?: boolean;
}
