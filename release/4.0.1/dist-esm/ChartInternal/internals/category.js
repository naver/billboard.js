/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var category = {
    /**
     * Category Name
     * @param {number} i Index number
     * @returns {string} category Name
     * @private
     */
    categoryName(i) {
        const { axis_x_categories } = this.config;
        return axis_x_categories?.[i] ?? i;
    }
};

export { category as default };
