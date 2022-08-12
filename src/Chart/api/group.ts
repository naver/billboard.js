/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isUndefined} from "../../module/util";

export default {
	/**
	 * Update groups for the targets.
	 * @function groups
	 * @instance
	 * @memberof Chart
	 * @param {Array} groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
	 * @returns {Array} Grouped data names array
	 * @example
	 *  // data1 and data2 will be a new group.
	 *  chart.groups([
	 *     ["data1", "data2"]
	 *  ]);
	 */
	groups<T = string[][]>(groups: T): T {
		const $$ = this.internal;
		const {config} = $$;

		if (isUndefined(groups)) {
			return config.data_groups;
		}

		config.data_groups = groups;
		$$.redraw();

		return config.data_groups;
	}
};
