/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {isUndefined, extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Update groups for the targets.
	 * @method groups
	 * @instance
	 * @memberOf Chart
	 * @param {Array} groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
	 * @example
	 *  // data1 and data2 will be a new group.
	 *  chart.groups([
	 *     ["data1", "data2"]
	 *  ]);
	 */
	groups(groups) {
		const $$ = this.internal;
		const config = $$.config;

		if (isUndefined(groups)) {
			return config.data_groups;
		}

		config.data_groups = groups;
		$$.redraw();

		return config.data_groups;
	}
});
