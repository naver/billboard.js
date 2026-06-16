/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import apiCategory from '../../Chart/api/category.js';
import Chart from '../../Chart/Chart.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Enable chart category API (chart.category() / chart.categories()).
 * Tree-shakable: only bundled when imported.
 * @returns {object} Empty options object (safe to spread into bb.generate())
 * @example
 * // ESM — import to enable category APIs
 * import bb, {bar, category} from "billboard.js";
 *
 * const chart = bb.generate({
 *   ...bar(),
 *   ...category(),
 *   data: { columns: [...] }
 * });
 *
 * chart.categories(["A", "B", "C"]);
 */
let category = () => {
    // Direct assignment overrides stubs installed by Chart/api/stubs.
    Chart.prototype.category = apiCategory.category;
    Chart.prototype.categories = apiCategory.categories;
    return (category = () => ({}))();
};

export { category };
