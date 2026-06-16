/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.0
*/
import { $LEVEL } from '../../config/classes.js';
import { getRange } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get data max value
 * @param {object} $$ ChartInternal instance
 * @returns {number} max value
 * @private
 */
function getDataMax($$) {
    const levelMax = $$.config.polar_level_max;
    let dataMax = $$.getMinMaxData().max[0].value;
    // Apply level max only when is greater than the data max value
    if (levelMax && levelMax > dataMax) {
        dataMax = levelMax;
    }
    return dataMax;
}
var shapePolar = {
    /**
     * Initialize polar
     * @private
     */
    initPolar() {
        const $$ = this;
        const { $el: { arcs }, config } = $$;
        const levelTextShow = config.polar_level_text_show;
        const levelTextBgColor = config.polar_level_text_backgroundColor;
        // append <g> for level
        arcs.levels = arcs.append("g")
            .attr("class", $LEVEL.levels);
        // set level text background color
        if (levelTextShow && levelTextBgColor) {
            $$.generateTextBGColorFilter(levelTextBgColor);
        }
    },
    /**
     * Get polar outer radius according to the data value
     * @param {object} d Data object
     * @param {numbet} outerRadius Outer radius
     * @returns {number} outer radius
     * @private
     */
    getPolarOuterRadius(d, outerRadius) {
        const dataMax = getDataMax(this);
        return ((d?.data.values[0].value ?? 0) / dataMax) * outerRadius;
    },
    /**
     * Update polar based on given data array
     * @param {object} targets Data object
     * @private
     */
    updateTargetsForPolar(targets) {
        // borrow from Arc
        this.updateTargetsForArc(targets);
    },
    /**
     * Called whenever redraw happens
     * @private
     */
    redrawPolar() {
        const $$ = this;
        const { config } = $$;
        config.polar_level_show && $$.updatePolarLevel();
    },
    /**
     * Update polar level circle
     * @private
     */
    updatePolarLevel() {
        const $$ = this;
        const { config, state, $el: { arcs: { levels } } } = $$;
        const depth = config.polar_level_depth;
        const dataMax = getDataMax($$);
        const levelData = getRange(0, depth);
        const outerRadius = state.radius;
        const levelRatio = levelData.map(l => outerRadius * ((l + 1) / depth));
        const levelTextFormat = (config.polar_level_text_format || function () { }).bind($$.api);
        const level = levels
            .selectAll(`.${$LEVEL.level}`)
            .data(levelData);
        level.exit().remove();
        const levelEnter = level.enter().append("g")
            .attr("class", (d, i) => `${$LEVEL.level} ${$LEVEL.level}-${i}`);
        // cx, cy, translate: Set center as origin (0,0) so that it can share same center with arcs
        levelEnter.append("circle");
        levelEnter
            .merge(level)
            .selectAll("circle")
            .style("visibility", config.polar_level_show ? null : "hidden")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", d => levelRatio[d]);
        if (config.polar_level_text_show) {
            const levelTextBackgroundColor = config.polar_level_text_backgroundColor;
            const defsId = `#${state.datetimeId}-labels-bg${$$.getTargetSelectorSuffix(levelTextBackgroundColor)}`;
            levelEnter.append("text")
                .style("text-anchor", "middle");
            levelEnter
                .merge(level)
                .selectAll("text")
                .attr("dy", d => -levelRatio[d] + 5)
                .attr("filter", levelTextBackgroundColor ? `url(${defsId})` : null)
                .text(d => levelTextFormat(dataMax / levelData.length * (d + 1)));
        }
    }
};

export { shapePolar as default };
