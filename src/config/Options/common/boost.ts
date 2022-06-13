/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * boost config options
 */
export default {
	/**
	 * Set boost options
	 * @name boost
	 * @memberof Options
	 * @type {object}
	 * @property {object} boost boost object
	 * @property {boolean} [boost.useCssRule=false] Avoid setting inline styles for each shape elements.
	 * - **NOTE:**
	 *   - Will append &lt;style> to the head tag and will add shpes' CSS rules dynamically.
	 *   - For now, covers colors related properties (fill, stroke, etc.) only.
	 * @example
	 *  boost: {
	 *      useCssRule: true
	 *  }
	 */
	boost_useCssRule: false
};
