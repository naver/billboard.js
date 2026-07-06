/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
import { getRenderRect, getCandlestickGeometry } from '../ChartInternal/shape/core/geometry.js';
import { isFiniteCanvasCoordinate } from './util.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get drawable canvas bar geometry from common SVG shape points.
 * @param {object} $$ ChartInternal instance
 * @param {function} getPoints Shape point resolver
 * @param {object} d Data row
 * @param {number} index Data index
 * @returns {object|null} Drawable bar geometry
 * @private
 */
function getCanvasBarGeometry($$, getPoints, d, index) {
    const points = getPoints(d, index);
    const rect = getRenderRect($$, points);
    return isFiniteCanvasCoordinate(rect.x, rect.y) &&
        isFiniteCanvasCoordinate(rect.x + rect.w, rect.y + rect.h) ?
        { points, rect } :
        null;
}
/**
 * Get drawable canvas candlestick geometry from common SVG shape points.
 * @param {object} $$ ChartInternal instance
 * @param {function} getPoints Shape point resolver
 * @param {object} d Data row
 * @param {number} index Data index
 * @returns {object|null} Drawable candlestick geometry
 * @private
 */
function getCanvasCandlestickGeometry($$, getPoints, d, index) {
    const points = getPoints(d, index);
    const { body, wickStart, wickEnd } = getCandlestickGeometry($$, points);
    return isFiniteCanvasCoordinate(body.x, body.y) &&
        isFiniteCanvasCoordinate(body.x + body.w, body.y + body.h) &&
        isFiniteCanvasCoordinate(wickStart[0], wickStart[1]) &&
        isFiniteCanvasCoordinate(wickEnd[0], wickEnd[1]) ?
        { body, points, wickStart, wickEnd } :
        null;
}

export { getCanvasBarGeometry, getCanvasCandlestickGeometry };
