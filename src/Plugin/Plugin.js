/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */
/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
export default class Plugin {
	/**
	 * Version info string for plugin
	 * @name version
	 * @static
	 * @memberof Plugin
	 * @type {String}
	 * @example
	 *   bb.plugin.stanford.version;  // ex) 1.9.0
	 */
	static version = "#__VERSION__#";

	/**
	 * Constructor
	 * @param {Any} options config option object
	 * @private
	 */
	constructor(options = {}) {
		this.$$;
		this.options = options;
	}

	/**
	 * Lifecycle hook for 'beforeInit' phase.
	 * @private
	 */
	$beforeInit() {}

	/**
	 * Lifecycle hook for 'init' phase.
	 * @private
	 */
	$init() {}

	/**
	 * Lifecycle hook for 'afterInit' phase.
	 * @private
	 */
	$afterInit() {}

	/**
	 * Lifecycle hook for 'redraw' phase.
	 * @private
	 */
	$redraw() {}

	/**
	 * Lifecycle hook for 'willDestroy' phase.
	 * @private
	 */
	$willDestroy() {
		Object.keys(this).forEach(key => {
			this[key] = null;
			delete this[key];
		});
	}
}
