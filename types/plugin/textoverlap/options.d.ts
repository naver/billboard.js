/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export interface TextOverlapOptions {
	/**
	 * Set selector string for target text nodes
	 */
	selector?: string;

	/**
	 * Set extent of label overlap prevention
	 */
	extent?: number;

	/**
	 * Set minimum area needed to show a data label
	 */
	area?: number;
}
