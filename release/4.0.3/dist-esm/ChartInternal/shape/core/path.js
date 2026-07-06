/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { area, line } from 'd3-shape';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get values with step handling for line-like paths.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data target (needs `.id` for per-series step type detection)
 * @param {Array} values Null-filtered values to draw
 * @returns {Array} Drawable values
 * @private
 */
function getLineValues($$, d, values) {
    return $$.isStepType(d) ? $$.convertValuesToStep(values) : values;
}
/**
 * Generate line path drawing function shared by SVG and canvas renderers.
 * @param {object} $$ ChartInternal instance
 * @param {object} lineIndices Shape indices
 * @param {boolean} isSub Whether to use subchart scales
 * @param {object} context Optional canvas path context
 * @returns {function} Line path drawing function
 * @private
 */
function generateDrawLinePath($$, lineIndices, isSub, context) {
    const { config, scale } = $$;
    const lineConnectNull = config.line_connectNull;
    const isRotated = config.axis_rotated;
    const getPoints = $$.generateGetLinePoints(lineIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
    const yValue = (d, i) => ($$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.getBaseValue(d)));
    let line$1 = line();
    line$1 = isRotated ? line$1.x(yValue).y(xValue) : line$1.x(xValue).y(yValue);
    context && (line$1 = line$1.context(context));
    if (!lineConnectNull) {
        line$1 = line$1.defined(d => $$.getBaseValue(d) !== null);
    }
    const x = isSub ? scale.subX : scale.x;
    return d => {
        const y = yScale(d.id, isSub);
        let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
        let x0 = 0;
        let y0 = 0;
        let path;
        if ($$.isLineType(d)) {
            const regions = config.data_regions[d.id];
            if (regions && !context && $$.lineWithRegions) {
                if ($$.isAreaRangeType(d)) {
                    values = values.map(dv => ({ ...dv, value: $$.getRangedData(dv, "mid") }));
                }
                if ($$.isStepType(d)) {
                    values = $$.convertValuesToStep(values);
                }
                path = $$.lineWithRegions(values, scale.zoom || x, y, regions);
            }
            else {
                path = line$1.curve($$.getCurve(d))(getLineValues($$, d, values));
            }
        }
        else {
            if (values[0]) {
                x0 = x(values[0].x);
                y0 = y(values[0].value);
            }
            path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
        }
        return path || (context ? undefined : "M 0 0");
    };
}
/**
 * Generate area path drawing function shared by SVG and canvas renderers.
 * @param {object} $$ ChartInternal instance
 * @param {object} areaIndices Shape indices
 * @param {boolean} isSub Whether to use subchart scales
 * @param {object} context Optional canvas path context
 * @returns {function} Area path drawing function
 * @private
 */
function generateDrawAreaPath($$, areaIndices, isSub, context) {
    const { config } = $$;
    const lineConnectNull = config.line_connectNull;
    const isRotated = config.axis_rotated;
    const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
    const value0 = (d, i) => ($$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "high") : $$.getShapeYMin(d.id)));
    const value1 = (d, i) => ($$.isGrouped(d.id) ? getPoints(d, i)[1][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "low") : d.value));
    return d => {
        let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
        let x0 = 0;
        let y0 = 0;
        let path;
        if ($$.isAreaType(d)) {
            let area$1 = area();
            area$1 = isRotated ?
                area$1.y(xValue)
                    .x0(value0)
                    .x1(value1) :
                area$1.x(xValue)
                    .y0(config.area_above ? 0 : (config.area_below ? $$.state.height : value0))
                    .y1(value1);
            context && (area$1 = area$1.context(context));
            if (!lineConnectNull) {
                area$1 = area$1.defined(d => $$.getBaseValue(d) !== null);
            }
            if ($$.isStepType(d)) {
                values = $$.convertValuesToStep(values);
            }
            path = area$1.curve($$.getCurve(d))(values);
        }
        else {
            if (values[0]) {
                x0 = $$.scale.x(values[0].x);
                y0 = $$.getYScaleById(d.id)(values[0].value);
            }
            path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
        }
        return path || (context ? undefined : "M 0 0");
    };
}

export { generateDrawAreaPath, generateDrawLinePath };
