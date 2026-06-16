/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.1
*/
import { getScale } from '../internals/scale.js';
import { getBBox } from '../../module/util/dom.js';
import { isValue, isDefined } from '../../module/util/type-checks.js';

class AxisRendererHelper {
    owner;
    config;
    scale;
    charSize = {};
    constructor(owner) {
        const scale = getScale();
        const { config, params } = owner;
        this.owner = owner;
        this.config = config;
        this.scale = scale;
        if (config.noTransition || !params.config.transition_duration) {
            config.withoutTransition = true;
        }
        // set range
        config.range = this.scaleExtent((params.orgXScale || scale).range());
    }
    /**
     * Compute a character dimension
     * @param {string} orient Axis orientation
     * @param {d3.selection} text SVG text selection
     * @param {boolean} memoize memoize the calculated size
     * @returns {{w: number, h: number}}
     * @private
     */
    getSizeFor1Char(orient, text, memoize = true) {
        // default size for one character
        const size = {
            w: 5.5,
            h: 11.5
        };
        if (this.charSize[orient] && memoize) {
            return this.charSize[orient];
        }
        !text.empty() && text
            .text("0")
            .call((el) => {
            try {
                const { width, height } = getBBox(el.node(), true);
                if (width && height) {
                    size.w = width;
                    size.h = height;
                }
            }
            finally {
                el.text("");
            }
        });
        this.charSize[orient] = size;
        return size;
    }
    /**
     * Get tick transform setter function
     * @param {string} id Axis id
     * @returns {(selection: d3Selection, scale) => void} transfrom setter function
     * @private
     */
    getTickTransformSetter(id) {
        const { config } = this;
        const fn = id === "x" ?
            value => `translate(${value + config.tickOffset},0)` :
            value => `translate(0,${value})`;
        return (selection, scale) => {
            selection.attr("transform", d => {
                const x = scale(d);
                return isValue(d) ? fn(x) : null;
            });
        };
    }
    scaleExtent(domain) {
        const start = domain[0];
        const stop = domain[domain.length - 1];
        return start < stop ? [start, stop] : [stop, start];
    }
    generateTicks(scale, isYAxes) {
        const { tickStepSize } = this.owner.params;
        const [start, end] = scale.domain();
        let ticks = [];
        // When 'axis[y|y2].tick.stepSize' option is set
        if (isYAxes && tickStepSize) {
            let interval = Math.round(start);
            while (interval <= end) {
                ticks.push(interval);
                interval += tickStepSize;
            }
        }
        else if (scale.ticks) {
            const { tickArguments } = this.config;
            // adjust excessive tick count show
            if (scale.type === "log" && !tickArguments) {
                // nicer symlog ticks didn't implemented yet: https://github.com/d3/d3-scale/issues/162
                // get ticks values from logScale
                const s = getScale("_log")
                    .domain([start > 0 ? start : 1, end])
                    .range(scale.range());
                ticks = s.ticks();
                for (let cnt = end.toFixed().length; ticks.length > 15; cnt--) {
                    ticks = s.ticks(cnt);
                }
                ticks.splice(0, 1, start);
                ticks.splice(ticks.length - 1, 1, end);
            }
            else {
                ticks = scale
                    .ticks(...(this.config.tickArguments || []));
            }
        }
        return ticks;
    }
    copyScale() {
        const newScale = this.scale.copy();
        if (!newScale.domain().length) {
            newScale.domain(this.scale.domain());
        }
        newScale.type = this.scale.type;
        return newScale;
    }
    textFormatted(v) {
        const tickFormat = this.config.tickFormat;
        // to round float numbers from 'binary floating point'
        // https://en.wikipedia.org/wiki/Double-precision_floating-point_format
        // https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand
        const value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
        const formatted = tickFormat ? tickFormat(value) : value;
        return isDefined(formatted) ? formatted : "";
    }
    transitionise(selection) {
        const { config } = this;
        let transitionSelection = selection;
        if (config.withoutTransition) {
            transitionSelection = selection.interrupt();
        }
        else if (config.transition || !this.owner.params.noTransition) {
            // prevent for 'transition not found' case
            // https://github.com/naver/billboard.js/issues/2140
            try {
                transitionSelection = selection.transition(config.transition);
            }
            catch { }
        }
        return transitionSelection;
    }
}

export { AxisRendererHelper as default };
