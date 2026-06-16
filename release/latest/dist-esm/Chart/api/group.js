/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { isUndefined } from '../../module/util/type-checks.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiGroup = {
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
    groups(groups) {
        const $$ = this.internal;
        const { config } = $$;
        if (isUndefined(groups)) {
            return config.data_groups;
        }
        config.data_groups = groups;
        $$.state.dirty.data = true;
        $$.redraw();
        return config.data_groups;
    }
};

export { apiGroup as default };
