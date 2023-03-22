/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$REGION} from "../../config/classes";
import {getOption, extend, isTabVisible} from "../../module/util";

type RegionsParam = {axis?: "add" | "update", class?: string, start?: number, end?: number}[];

/**
 * Region add/update function
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @param {boolean} isAdd If true, add new regions, otherwise update regions
 * @returns {Array} regions
 * @private
 */
function regionsFn(regions: RegionsParam, isAdd = false): RegionsParam {
	const $$ = this.internal;
	const {config} = $$;
	const withTransition = config.transition_duration && isTabVisible();

	if (!regions) {
		return config.regions;
	}

	config.regions = isAdd ? config.regions.concat(regions) : regions;

	$$.updateRegion();
	$$.redrawRegion(withTransition);

	return isAdd ? config.regions : regions;
}

/**
 * Update regions.
 * @function regions
 * @instance
 * @memberof Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @returns {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {axis: "y", end: 50, class: "regionY"}
 * ]);
 */
const regions = function(regions: RegionsParam): RegionsParam {
	return regionsFn.bind(this)(regions);
};

extend(regions, {
	/**
	 * Add new region.<br><br>
	 * This API adds new region instead of replacing like regions.
	 * @function regions․add
	 * @instance
	 * @memberof Chart
	 * @param {Array|object} regions New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
	 * @returns {Array} regions
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
	add: function(regions: RegionsParam): RegionsParam {
		return regionsFn.bind(this)(regions, true);
	},

	/**
	 * Remove regions.<br><br>
	 * This API removes regions.
	 * @function regions․remove
	 * @instance
	 * @memberof Chart
	 * @param {object} optionsValue This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be removed.
	 * @returns {Array} regions Removed regions
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
	remove: function(optionsValue: RegionsParam): RegionsParam {
		const $$ = this.internal;
		const {config, $T} = $$;

		const options = optionsValue || {};
		const classes = getOption(options, "classes", [$REGION.region]);
		let regions = $$.$el.main.select(`.${$REGION.regions}`)
			.selectAll(classes.map(c => `.${c}`));

		$T(regions)
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

export default {regions};
