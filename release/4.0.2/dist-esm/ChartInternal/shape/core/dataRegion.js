/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import { isValue, isUndefined } from '../../../module/util/type-checks.js';
import { parseDate } from '../../../module/util/object.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
const DEFAULT_DASHARRAY = "2 2";
/**
 * Normalize data.regions start/end values against chart axis type.
 * @param {object} $$ ChartInternal instance
 * @param {Array} values Target values
 * @param {Array} regions Regions to normalize
 * @returns {Array} Normalized regions
 * @private
 */
function normalizeDataRegions($$, values, regions) {
    const isTimeSeries = $$.axis.isTimeSeries();
    const getValue = (value, fallback) => (isUndefined(value) ? fallback : (isTimeSeries ? parseDate.call($$, value) : value));
    return (regions || []).map(region => ({
        start: getValue(region.start, values[0]?.x),
        end: getValue(region.end, values[values.length - 1]?.x),
        style: region.style || { dasharray: DEFAULT_DASHARRAY }
    }));
}
/**
 * Get region style for an x value.
 * @param {number|string|Date} x X value
 * @param {Array} regions Normalized regions
 * @returns {object|boolean} Region style or false
 * @private
 */
function getDataRegionStyle(x, regions) {
    for (let i = 0, region; (region = regions[i]); i++) {
        if (region.start < x && x <= region.end) {
            return region.style;
        }
    }
    return false;
}
/**
 * Parse a data region dasharray value for canvas.
 * @param {object} style Region style
 * @returns {Array} Canvas line dash
 * @private
 */
function getDataRegionDash(style) {
    const dash = String(style?.dasharray || DEFAULT_DASHARRAY)
        .split(/[\s,]+/)
        .map(Number)
        .filter(Number.isFinite);
    return dash.length ? dash : [2, 2];
}
/**
 * Get line segments annotated with region dash settings.
 * @param {object} $$ ChartInternal instance
 * @param {Array} values Target values
 * @param {function} x X scale
 * @param {function} y Y scale
 * @param {Array} regions Regions to apply
 * @returns {Array} Line region segments
 * @private
 */
function getLineRegionSegments($$, values, x, y, regions) {
    const isRotated = $$.config.axis_rotated;
    const normalizedRegions = normalizeDataRegions($$, values, regions);
    const segments = [];
    for (let i = 1; i < values.length; i++) {
        const prev = values[i - 1];
        const current = values[i];
        if (!isValue(prev.value) || !isValue(current.value)) {
            segments.push({ isBreak: true });
            continue;
        }
        const style = getDataRegionStyle(current.x, normalizedRegions);
        const x0 = x(prev.x);
        const y0 = y(prev.value);
        const x1 = x(current.x);
        const y1 = y(current.value);
        segments.push({
            start: isRotated ? [y0, x0] : [x0, y0],
            end: isRotated ? [y1, x1] : [x1, y1],
            dash: style ? getDataRegionDash(style) : []
        });
    }
    return segments;
}

export { getDataRegionDash, getDataRegionStyle, getLineRegionSegments, normalizeDataRegions };
