/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3
*/
import { brushSelection } from 'd3-brush';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */
function getBrushSelection(ctx) {
    const { event, $el } = ctx;
    const main = $el.subchart.main || $el.main;
    let selection;
    // check from event
    if (event && event.type === "brush") {
        selection = event.selection;
        // check from brush area selection
    }
    else if (main && (selection = main.select(".bb-brush").node())) {
        selection = brushSelection(selection);
    }
    return selection;
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */
function brushEmpty(ctx) {
    const selection = getBrushSelection(ctx);
    if (selection) {
        // brush selected area
        // two-dimensional: [[x0, y0], [x1, y1]]
        // one-dimensional: [x0, x1] or [y0, y1]
        return selection[0] === selection[1];
    }
    return true;
}

export { brushEmpty, getBrushSelection };
