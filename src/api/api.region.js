/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import CLASS from "../config/classes";
import {getOption, extend} from "../internals/util";

/**
 * Update regions.
 * @method regions
 * @instance
 * @memberOf Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @return {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {axis: "y", end: 50, class: "regionY"}
 * ]);
 */
const regions = function(regions) {
	const $$ = this.internal;
	const config = $$.config;

	if (!regions) {
		return config.regions;
	}

	config.regions = regions;
	$$.redrawWithoutRescale();

	return regions;
};

extend(regions, {
	/**
	 * Add new region.<br><br>
	 * This API adds new region instead of replacing like regions.
	 * @method regions․add
	 * @instance
	 * @memberOf Chart
	 * @param {Array|Object} regions New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
	 * @return {Array} regions
	 * @example
	 * // Add a new region
	 * chart.regions.add(
	 *    {axis: "x", start: 5, class: "regionX"}
	 * );
	 *
	 * // Add new regions
	 * chart.regions.add([
	 *    {axis: "x", start: 5, class: "regionX"},
	 *    {axis: "y", end: 50, class: "regionY"}
	 *]);
	 */
	add: function(regions) {
		const $$ = this.internal;
		const config = $$.config;

		if (!regions) {
			return config.regions;
		}

		config.regions = config.regions.concat(regions);
		$$.redrawWithoutRescale();

		return config.regions;
	},

	/**
	 * Remove regions.<br><br>
	 * This API removes regions.
	 * @method regions․remove
	 * @instance
	 * @memberOf Chart
	 * @param {Object} regions This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be removed.
	 * @return {Array} regions Removed regions
	 * @example
	 * // regions that have 'region-A' or 'region-B' will be removed.
	 * chart.regions.remove({
	 *   classes: [
	 *     "region-A", "region-B"
	 *   ]
	 * });
	 *
	 * // all of regions will be removed.
	 * chart.regions.remove();
	 */
	remove: function(optionsValue) {
		const $$ = this.internal;
		const config = $$.config;

		const options = optionsValue || {};
		const duration = getOption(options, "duration", config.transition_duration);
		const classes = getOption(options, "classes", [CLASS.region]);
		let regions = $$.main.select(`.${CLASS.regions}`)
			.selectAll(classes.map(c => `.${c}`));

		(duration ? regions.transition().duration(duration) : regions)
			.style("opacity", "0")
			.remove();

		regions = config.regions;

		if (Object.keys(options).length) {
			regions = regions.filter(region => {
				let found = false;

				if (!region.class) {
					return true;
				}

				region.class.split(" ").forEach(c => {
					if (classes.indexOf(c) >= 0) {
						found = true;
					}
				});

				return !found;
			});

			config.regions = regions;
		} else {
			config.regions = [];
		}

		return regions;
	}
});

extend(Chart.prototype, {regions});
