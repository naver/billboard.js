/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiColor = {
    /**
     * Get the color
     * @function color
     * @instance
     * @memberof Chart
     * @param {string} id id to get the color
     * @returns {string}
     * @example
     * chart.color("data1");
     */
    color(id) {
        return this.internal.color(id); // more patterns
    }
};

export { apiColor as default };
