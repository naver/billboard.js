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
	 * @property {boolean} [boost.useWorker=false] Use Web Worker as possible for processing.
	 * - **NOTE:**
	 *   - For now, only applies for data conversion at the initial time.
	 *   - As of Web Worker's async nature, handling chart instance synchronously is not recommended.
	 *   - When Worker isn't available, fails or times out, data conversion falls back to main thread.
	 *   - When given data is empty, useWorker will be ignored.
	 * @example
	 *  boost: {
	 *      useCssRule: true,
	 *      useWorker: false
	 *  }
	 */
	boost_useCssRule: false,
	boost_useWorker: false
};
