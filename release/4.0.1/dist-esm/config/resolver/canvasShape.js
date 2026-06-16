/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import shapeBubbleCommon from '../../ChartInternal/shape/core/bubble.js';
import shapeCandlestickCommon from '../../ChartInternal/shape/core/candlestick.js';
import shapeTreemapCommon from '../../ChartInternal/shape/core/treemap.js';
import { TYPE } from '../const.js';
import optPoint from '../Options/common/point.js';
import optArea from '../Options/shape/area.js';
import optBar from '../Options/shape/bar.js';
import optBubble from '../Options/shape/bubble.js';
import optCandlestick from '../Options/shape/candlestick.js';
import optLine from '../Options/shape/line.js';
import optScatter from '../Options/shape/scatter.js';
import optSpline from '../Options/shape/spline.js';
import optTreemap from '../Options/shape/treemap.js';
import { extendAxisModules } from './axis.core.js';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Canvas line shape marker.
 * Installed to satisfy chart type import checks without importing SVG line renderer.
 * @private
 */
const canvasLineModule = {
    /**
     * No-op canvas line initializer.
     * Canvas mode creates drawing surfaces through canvas().
     * @private
     */
    initLine() { }
};
/**
 * Canvas area shape marker.
 * Installed to satisfy chart type import checks without importing SVG area renderer.
 * @private
 */
const canvasAreaModule = {
    /**
     * No-op canvas area initializer.
     * Canvas mode creates drawing surfaces through canvas().
     * @private
     */
    initArea() { }
};
/**
 * Canvas bar shape marker.
 * Installed to satisfy chart type import checks without importing SVG bar renderer.
 * @private
 */
const canvasBarModule = {
    /**
     * No-op canvas bar initializer.
     * Canvas mode creates drawing surfaces through canvas().
     * @private
     */
    initBar() { }
};
/**
 * Canvas point shape marker.
 * Installed to satisfy chart type import checks without importing SVG point renderer.
 * @private
 */
const canvasPointModule = {
    /**
     * No-op canvas circle initializer.
     * Canvas mode draws circles through CanvasRenderer.
     * @private
     */
    initCircle() { }
};
/**
 * Canvas candlestick shape marker.
 * Installed to satisfy chart type import checks without importing SVG candlestick renderer.
 * @private
 */
const canvasCandlestickModule = {
    /**
     * No-op canvas candlestick initializer.
     * Canvas mode draws candlesticks through CanvasRenderer.
     * @private
     */
    initCandlestick() { }
};
/**
 * Canvas treemap shape marker.
 * Installed to satisfy chart type import checks without importing SVG treemap renderer.
 * @private
 */
const canvasTreemapModule = {
    /**
     * Initialize the shared treemap layout without SVG elements.
     * @private
     */
    initTreemap() {
        this.initTreemapLayout?.();
    }
};
/**
 * Extend axis/options needed by canvas axis-based shapes without importing SVG shape modules.
 * @param {Array<object>} module Internal modules
 * @param {Array<object>} option Option modules
 * @private
 */
function extendCanvasAxisShape(module = [], option = []) {
    extendAxisModules(module, option);
}
/**
 * Register modules and options required for canvas line charts.
 * @returns {string} Line chart type
 */
let line = () => (extendCanvasAxisShape([canvasLineModule], [optPoint, optLine]), (line = () => TYPE.LINE)());
/**
 * Register modules and options required for canvas spline charts.
 * @returns {string} Spline chart type
 */
let spline = () => (extendCanvasAxisShape([canvasLineModule], [optPoint, optLine, optSpline]), (spline = () => TYPE.SPLINE)());
/**
 * Register modules and options required for canvas step charts.
 * @returns {string} Step chart type
 */
let step = () => (extendCanvasAxisShape([canvasLineModule], [optPoint, optLine]), (step = () => TYPE.STEP)());
/**
 * Register modules and options required for canvas area charts.
 * @returns {string} Area chart type
 */
let area = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea]), (area = () => TYPE.AREA)());
/**
 * Register modules and options required for canvas area-line-range charts.
 * @returns {string} Area line range chart type
 */
let areaLineRange = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)());
/**
 * Register modules and options required for canvas area-spline charts.
 * @returns {string} Area spline chart type
 */
let areaSpline = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea, optSpline]), (areaSpline = () => TYPE.AREA_SPLINE)());
/**
 * Register modules and options required for canvas area-spline-range charts.
 * @returns {string} Area spline range chart type
 */
let areaSplineRange = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea, optSpline]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)());
/**
 * Register modules and options required for canvas area-step charts.
 * @returns {string} Area step chart type
 */
let areaStep = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea]), (areaStep = () => TYPE.AREA_STEP)());
/**
 * Register modules and options required for canvas area-step-range charts.
 * @returns {string} Area step range chart type
 */
let areaStepRange = () => (extendCanvasAxisShape([canvasLineModule, canvasAreaModule], [optPoint, optLine, optArea]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)());
/**
 * Register modules and options required for canvas bar charts.
 * @returns {string} Bar chart type
 */
let bar = () => (extendCanvasAxisShape([canvasBarModule], [optBar]), (bar = () => TYPE.BAR)());
/**
 * Register modules and options required for canvas scatter charts.
 * @returns {string} Scatter chart type
 */
let scatter = () => (extendCanvasAxisShape([canvasPointModule], [optPoint, optScatter]), (scatter = () => TYPE.SCATTER)());
/**
 * Register modules and options required for canvas bubble charts.
 * @returns {string} Bubble chart type
 */
let bubble = () => (extendCanvasAxisShape([canvasPointModule, shapeBubbleCommon], [optPoint, optBubble]), (bubble = () => TYPE.BUBBLE)());
/**
 * Register modules and options required for canvas candlestick charts.
 * @returns {string} Candlestick chart type
 */
let candlestick = () => (extendCanvasAxisShape([canvasCandlestickModule, shapeCandlestickCommon], [optPoint, optCandlestick]), (candlestick = () => TYPE.CANDLESTICK)());
/**
 * Register modules and options required for canvas treemap charts.
 * @returns {string} Treemap chart type
 */
let treemap = () => (extendCanvasAxisShape([canvasTreemapModule, shapeTreemapCommon], [optTreemap]), (treemap = () => TYPE.TREEMAP)());

export { area, areaLineRange, areaSpline, areaSplineRange, areaStep, areaStepRange, bar, bubble, candlestick, line, scatter, spline, step, treemap };
