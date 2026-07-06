/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import { select } from 'd3-selection';
import { $AREA, $CIRCLE, $LINE } from '../../config/classes.js';
import { generateDrawAreaPath } from './core/path.js';
import { getShapeColorWithGradient } from './shape.js';
import { getRandom } from '../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeArea = {
    initArea(mainLine) {
        const $$ = this;
        const { config } = $$;
        mainLine
            .insert("g", `.${config.area_front ? $CIRCLE.circles : $LINE.lines}`)
            .attr("class", $$.getClass("areas", true));
    },
    /**
     * Update area color
     * @param {object} d Data object
     * @returns {string} Color string
     * @private
     */
    updateAreaColor(d) {
        const $$ = this;
        return getShapeColorWithGradient.call($$, d, "area_linearGradient", $$.color);
    },
    /**
     * Generate/Update elements
     * @param {boolean} withTransition Transition for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateArea(withTransition, isSub = false) {
        const $$ = this;
        if ($$.state.isCanvasMode) {
            return;
        }
        const { config, state, $el, $T } = $$;
        const $root = isSub ? $el.subchart : $el;
        config.area_linearGradient && $$.updateLinearGradient();
        const area = $root.main.selectAll(`.${$AREA.areas}`)
            .selectAll(`.${$AREA.area}`)
            .data($$.lineData.bind($$));
        $T(area.exit(), withTransition)
            .style("opacity", "0")
            .remove();
        $root.area = area.enter().append("path")
            .attr("class", $$.getClass("area", true))
            .style("fill", $$.updateAreaColor.bind($$))
            .style("opacity", function () {
            state.orgAreaOpacity = select(this).style("opacity");
            return "0";
        })
            .merge(area);
        area.style("opacity", state.orgAreaOpacity);
        // calculate ratio if grouped data exists
        $$.setRatioForGroupedData($root.area.data());
    },
    /**
     * Redraw function
     * @param {function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawArea(drawFn, withTransition, isSub = false) {
        const $$ = this;
        if ($$.state.isCanvasMode) {
            return [];
        }
        const { area } = isSub ? this.$el.subchart : this.$el;
        const { orgAreaOpacity } = $$.state;
        return [
            $$.$T(area, withTransition, getRandom())
                .attr("d", drawFn)
                .style("fill", $$.updateAreaColor.bind($$))
                .style("opacity", d => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity))
        ];
    },
    /**
     * Generate area path data
     * @param {object} areaIndices Indices
     * @param {boolean} isSub Weather is sub axis
     * @returns {function}
     * @private
     */
    generateDrawArea(areaIndices, isSub) {
        const $$ = this;
        return generateDrawAreaPath($$, areaIndices, isSub);
    }
};

export { shapeArea as default };
