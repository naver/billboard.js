/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export interface Plugin {
	/**
	 * Version info string for plugin
	 */
	version: string;

	/**
	 * Lifecycle hook for 'beforeInit' phase.
	 */
	$beforeInit?: () => void;

	/**
	 * Lifecycle hook for 'init' phase.
	 */
	$init?: () => void;

	/**
	 * Lifecycle hook for 'afterInit' phase.
	 */
	$afterInit?: () => void;

	/**
	 * Lifecycle hook for 'redraw' phase.
	 */
	$redraw?: () => void;

	/**
	 * Lifecycle hook for 'willDestroy' phase.
	 */
	$willDestroy?: () => void;
}
