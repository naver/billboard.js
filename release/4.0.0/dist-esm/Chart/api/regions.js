/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { $REGION } from '../../config/classes.js';
import { isTabVisible } from '../../module/util/dom.js';
import { extend, getOption } from '../../module/util/object.js';

/**
 * Redraw canvas after region API mutation.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function redrawCanvasRegions($$) {
    $$.state.canvasShape = null;
    $$.renderCanvasFrame?.(undefined, null, false);
}
/**
 * Region add/update function
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @param {boolean} isAdd If true, add new regions, otherwise update regions
 * @returns {Array} regions
 * @private
 */
function regionsFn(regions, isAdd = false) {
    const $$ = this.internal;
    const { config } = $$;
    const withTransition = config.transition_duration && isTabVisible();
    if (!regions) {
        return config.regions;
    }
    config.regions = isAdd ? config.regions.concat(regions) : regions;
    if ($$.state.isCanvasMode) {
        redrawCanvasRegions($$);
        return config.regions;
    }
    $$.updateRegion();
    $$.redrawRegion(withTransition);
    return config.regions;
}
/**
 * Update regions.
 * @function regions
 * @instance
 * @memberof Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as [regions](./Options.html#.regions) option.
 * @returns {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {
 *      axis: "y", end: 50, class: "regionY",
 *      label: {
 *      	text: "Region Text",
 *      	x: 5,  // position relative of the initial x coordinate
 *      	y: 5,  // position relative of the initial y coordinate
 *      	color: "red",  // color string
 *      	rotated: true  // make text to show in vertical or horizontal
 *      }
 *    }
 * ]);
 */
const regions = function (regions) {
    return regionsFn.bind(this)(regions);
};
extend(regions, {
    /**
     * Add new region.<br><br>
     * This API adds new region instead of replacing like regions.
     * @function regions․add
     * @instance
     * @memberof Chart
     * @param {Array|object} regions New region will be added. The format of this argument is the same as [regions](./Options.html#.regions) and it's possible to give an Object if only one region will be added.
     * @returns {Array} regions
     * @example
     * // Add a new region
     * chart.regions.add(
     *    {
     *      axis: "x", start: 5, class: "regionX",
     *      label: {
     *      	text: "Region Text",
     *      	color: "red"  // color string
     *      }
     *    }
     * );
     *
     * // Add new regions
     * chart.regions.add([
     *    {axis: "x", start: 5, class: "regionX"},
     *    {
     *      axis: "y", end: 50, class: "regionY",
     *      label: {
     *      	text: "Region Text",
     *      	x: 5,  // position relative of the initial x coordinate
     *      	y: 5,  // position relative of the initial y coordinate
     *      	color: "red",  // color string
     *      	rotated: true  // make text to show in vertical or horizontal
     *      }
     *    }
     * ]);
     */
    add: function (regions) {
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
    remove: function (optionsValue) {
        const $$ = this.internal;
        const { config, $T } = $$;
        const options = optionsValue || {};
        const classes = getOption(options, "classes", [$REGION.region]);
        let regions = config.regions;
        if ($$.state.isCanvasMode) {
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
            }
            else {
                config.regions = [];
            }
            redrawCanvasRegions($$);
            return config.regions;
        }
        const regionNodes = $$.$el.main.select(`.${$REGION.regions}`)
            .selectAll(classes.map(c => `.${c}`));
        $T(regionNodes)
            .style("opacity", "0")
            .remove();
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
        }
        else {
            config.regions = [];
        }
        return regions;
    }
});
var apiRegion = { regions };

export { apiRegion as default };
