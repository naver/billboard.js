/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import apiCategory from "../../Chart/api/category";
import Chart from "../../Chart/Chart";

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
export let category = (): Record<string, never> => {
	// Direct assignment overrides stubs installed by Chart/api/stubs.
	(Chart.prototype as any).category = apiCategory.category;
	(Chart.prototype as any).categories = apiCategory.categories;
	return (category = () => ({}))();
};
