/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import { hierarchy, treemap, treemapResquarify, treemapSquarify, treemapSliceDice, treemapSlice, treemapDice, treemapBinary } from 'd3-hierarchy';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Convert data for treemap hierarchy
 * @param {object} data Data object
 * @returns {Array} Array of data for treemap hierarchy
 * @private
 */
function convertDataToTreemapData(data) {
    const $$ = this;
    return data.map(d => {
        const { id, values } = d;
        const { value } = values[0];
        return {
            name: id,
            id, // needed to keep compatibility on whole code logic
            value,
            ratio: $$.getRatio("treemap", values[0])
        };
    });
}
var shapeTreemapCommon = {
    /**
     * Initialize treemap layout generator.
     * @private
     */
    initTreemapLayout() {
        this.treemap = treemap()
            .tile(this.getTreemapTile());
    },
    /**
     * Get tiling function
     * @returns {function}
     * @private
     */
    getTreemapTile() {
        const $$ = this;
        const { config, state: { current: { width, height } } } = $$;
        const tile = {
            binary: treemapBinary,
            dice: treemapDice,
            slice: treemapSlice,
            sliceDice: treemapSliceDice,
            squarify: treemapSquarify,
            resquarify: treemapResquarify
        }[config.treemap_tile ?? "binary"] ?? treemapBinary;
        return (node, x0, y0, x1, y1) => {
            tile(node, 0, 0, width, height);
            for (const child of node.children) {
                child.x0 = x0 + child.x0 / width * (x1 - x0);
                child.x1 = x0 + child.x1 / width * (x1 - x0);
                child.y0 = y0 + child.y0 / height * (y1 - y0);
                child.y1 = y0 + child.y1 / height * (y1 - y0);
            }
        };
    },
    /**
     * Get treemap hierarchy data
     * @param {Array} targets Data targets
     * @returns {object}
     * @private
     */
    getTreemapData(targets) {
        const $$ = this;
        return {
            name: "root",
            children: convertDataToTreemapData.bind($$)($$.filterTargetsToShow(targets.filter($$.isTreemapType, $$)))
        };
    },
    /**
     * Get treemap hierarchy root.
     * @param {Array} targets Data targets
     * @returns {object}
     * @private
     */
    getTreemapRoot(targets) {
        const $$ = this;
        const data = $$.getTreemapData(targets ?? $$.data.targets);
        const hierarchyData = hierarchy(data).sum(d => d.value);
        const sortFn = $$.getSortCompareFn(true);
        if (!$$.treemap) {
            $$.initTreemapLayout();
        }
        return $$.treemap(sortFn ? hierarchyData.sort(sortFn) : hierarchyData);
    }
};

export { shapeTreemapCommon as default };
