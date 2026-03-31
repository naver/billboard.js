/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.18.0-nightly-20260331005932
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { interpolateHslLong } from 'd3-interpolate';
import { scaleSequential, scaleSymlog, scaleSequentialLog } from 'd3-scale';
import { axisRight } from 'd3-axis';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
const $TOOLTIP = {
    tooltip: "bb-tooltip",
    tooltipName: "bb-tooltip-name"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isObjectType = (v) => typeof v === "object";
const isEmptyObject = (obj) => {
    for (const x in obj) {
        return false;
    }
    return true;
};
const isEmpty = (o) => (isUndefined(o) || o === null ||
    (isString(o) && o.length === 0) ||
    (isObjectType(o) && !(o instanceof Date) && isEmptyObject(o)) ||
    (isNumber(o) && isNaN(o)));

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */
const getRange = (start, end, step = 1) => {
    const res = [];
    const n = Math.max(0, Math.ceil((end - start) / step)) | 0;
    for (let i = start; i < n; i++) {
        res.push(start + i * step);
    }
    return res;
};
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */
function parseDate(date) {
    let parsedDate;
    if (date instanceof Date) {
        parsedDate = date;
    }
    else if (isString(date)) {
        const { config, format } = this;
        // if fails to parse, try by new Date()
        // https://github.com/naver/billboard.js/issues/1714
        parsedDate = format.dataTime(config.data_xFormat)(date) ?? new Date(date);
    }
    else if (isNumber(date) && !isNaN(date)) {
        parsedDate = new Date(+date);
    }
    if (!parsedDate || isNaN(+parsedDate)) {
        console && console.error &&
            console.error(`Failed to parse x '${date}' to Date object`);
    }
    return parsedDate;
}

/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
    const thisConfig = this.config;
    let target;
    let keys;
    let read;
    const find = () => {
        const key = keys.shift();
        if (key && target && isObjectType(target) && key in target) {
            target = target[key];
            return find();
        }
        else if (!key) {
            return target;
        }
        return undefined;
    };
    Object.keys(thisConfig).forEach(key => {
        target = config;
        keys = key.split("_");
        read = find();
        if (isDefined(read)) {
            thisConfig[key] = read;
        }
    });
    // only should run in the ChartInternal context
    if (this.api) {
        this.state.orgConfig = config;
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */
/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
class Plugin {
    $$;
    options;
    config;
    static version = "3.18.0-nightly-20260331005932";
    /**
     * Constructor
     * @param {Any} options config option object
     * @private
     */
    constructor(options = {}) {
        this.options = options;
    }
    /**
     * Load plugin config from options
     * @private
     */
    loadConfig() {
        loadConfig.call(this, this.options);
    }
    /**
     * Lifecycle hook for 'beforeInit' phase.
     * @private
     */
    $beforeInit() { }
    /**
     * Lifecycle hook for 'init' phase.
     * @private
     */
    $init() { }
    /**
     * Lifecycle hook for 'afterInit' phase.
     * @private
     */
    $afterInit() { }
    /**
     * Lifecycle hook for 'redraw' phase.
     * @private
     */
    $redraw() { }
    /**
     * Lifecycle hook for 'willDestroy' phase.
     * @private
     */
    $willDestroy() {
        Object.keys(this).forEach(key => {
            this[key] = null;
            delete this[key];
        });
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
var CLASS = {
    colorScale: "bb-colorscale",
    stanfordElements: "bb-stanford-elements",
    stanfordLine: "bb-stanford-line",
    stanfordLines: "bb-stanford-lines",
    stanfordRegion: "bb-stanford-region",
    stanfordRegions: "bb-stanford-regions"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * Check if point is in region
 * @param {object} point Point
 * @param {Array} region Region
 * @returns {boolean}
 * @private
 */
function pointInRegion(point, region) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    const x = point.x;
    const y = point.value;
    let inside = false;
    for (let i = 0, j = region.length - 1; i < region.length; j = i++) {
        const xi = region[i].x;
        const yi = region[i].y;
        const xj = region[j].x;
        const yj = region[j].y;
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}
/**
 * Compare epochs
 * @param {object} a Target
 * @param {object} b Source
 * @returns {number}
 * @private
 */
function compareEpochs(a, b) {
    if (a.epochs < b.epochs) {
        return -1;
    }
    if (a.epochs > b.epochs) {
        return 1;
    }
    return 0;
}
/**
 * Get region area
 * @param {Array} points Points
 * @returns {number}
 * @private
 */
function getRegionArea(points) {
    let area = 0;
    let point1;
    let point2;
    for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
        point1 = points[i];
        point2 = points[j];
        area += point1.x * point2.y;
        area -= point1.y * point2.x;
    }
    area /= 2;
    return area;
}
/**
 * Get centroid
 * @param {Array} points Points
 * @returns {object}
 * @private
 */
function getCentroid(points) {
    const area = getRegionArea(points);
    let x = 0;
    let y = 0;
    let f;
    for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
        const point1 = points[i];
        const point2 = points[j];
        f = point1.x * point2.y - point2.x * point1.y;
        x += (point1.x + point2.x) * f;
        y += (point1.y + point2.y) * f;
    }
    f = area * 6;
    return {
        x: x / f,
        y: y / f
    };
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Simple number formatter.
 * Supports "d" specifier (decimal notation, rounded to integer).
 * @param {string} specifier Format specifier
 * @returns {function} Formatter function
 */
function format(specifier) {
    {
        return (n) => Math.round(n).toString();
    }
}
/**
 * Stanford diagram plugin color scale class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */
class ColorScale {
    owner;
    colorScale;
    constructor(owner) {
        this.owner = owner;
    }
    drawColorScale() {
        const { $$, config } = this.owner;
        const target = $$.data.targets[0];
        const height = $$.state.height - config.padding_bottom - config.padding_top;
        const barWidth = config.scale_width;
        const barHeight = 5;
        const points = getRange(config.padding_bottom, height, barHeight);
        const inverseScale = scaleSequential(target.colors)
            .domain([points[points.length - 1], points[0]]);
        if (this.colorScale) {
            this.colorScale.remove();
        }
        this.colorScale = $$.$el.svg.append("g")
            .attr("width", 50)
            .attr("height", height)
            .attr("class", CLASS.colorScale);
        this.colorScale.append("g")
            .attr("transform", `translate(0, ${config.padding_top})`)
            .selectAll("bars")
            .data(points)
            .enter()
            .append("rect")
            .attr("y", (d, i) => i * barHeight)
            .attr("x", 0)
            .attr("width", barWidth)
            .attr("height", barHeight)
            .attr("fill", d => inverseScale(d));
        // Legend Axis
        const axisScale = scaleSymlog()
            .domain([target.minEpochs, target.maxEpochs])
            .range([
            points[0] + config.padding_top + points[points.length - 1] + barHeight - 1,
            points[0] + config.padding_top
        ]);
        const legendAxis = axisRight(axisScale);
        const scaleFormat = config.scale_format;
        if (scaleFormat === "pow10") {
            legendAxis.tickValues([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]);
        }
        else if (isFunction(scaleFormat)) {
            legendAxis.tickFormat(scaleFormat);
        }
        else {
            legendAxis.tickFormat(format());
        }
        // Draw Axis
        const axis = this.colorScale.append("g")
            .attr("class", "legend axis")
            .attr("transform", `translate(${barWidth},0)`)
            .call(legendAxis);
        if (scaleFormat === "pow10") {
            axis.selectAll(".tick text")
                .text(null)
                .filter(d => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1) // Power of Ten
                .text(10)
                .append("tspan")
                .attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
                .text(d => Math.round(Math.log(d) / Math.LN10));
        }
        this.colorScale.attr("transform", `translate(${$$.state.current.width - this.xForColorScale()}, 0)`);
    }
    xForColorScale() {
        return this.owner.config.padding_right +
            this.colorScale.node().getBBox().width;
    }
    getColorScalePadding() {
        return this.xForColorScale() + this.owner.config.padding_left + 20;
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck
/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */
class Elements {
    owner;
    constructor(owner) {
        this.owner = owner;
        // MEMO: Avoid blocking eventRect
        const elements = owner.$$.$el.main.select(".bb-chart")
            .append("g")
            .attr("class", CLASS.stanfordElements);
        elements.append("g").attr("class", CLASS.stanfordLines);
        elements.append("g").attr("class", CLASS.stanfordRegions);
    }
    updateStanfordLines(duration) {
        const { $$ } = this.owner;
        const { config, $el: { main } } = $$;
        const isRotated = config.axis_rotated;
        const xvCustom = this.xvCustom.bind($$);
        const yvCustom = this.yvCustom.bind($$);
        // Stanford-Lines
        const stanfordLine = main.select(`.${CLASS.stanfordLines}`)
            .style("shape-rendering", "geometricprecision")
            .selectAll(`.${CLASS.stanfordLine}`)
            .data(this.owner.config.lines);
        // exit
        stanfordLine.exit().transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        const stanfordLineEnter = stanfordLine.enter().append("g");
        stanfordLineEnter.append("line")
            .style("opacity", "0");
        stanfordLineEnter
            .merge(stanfordLine)
            .attr("class", d => CLASS.stanfordLine + (d.class ? ` ${d.class}` : ""))
            .select("line")
            .transition()
            .duration(duration)
            .attr("x1", d => {
            const v = isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
            return v;
        })
            .attr("x2", d => (isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2")))
            .attr("y1", d => {
            const v = isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
            return v;
        })
            .attr("y2", d => (isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2")))
            .transition()
            .style("opacity", null);
    }
    updateStanfordRegions(duration) {
        const { $$ } = this.owner;
        const { config, $el: { main } } = $$;
        const isRotated = config.axis_rotated;
        const xvCustom = this.xvCustom.bind($$);
        const yvCustom = this.yvCustom.bind($$);
        const countPointsInRegion = this.owner.countEpochsInRegion.bind($$);
        // Stanford-Regions
        let stanfordRegion = main.select(`.${CLASS.stanfordRegions}`)
            .selectAll(`.${CLASS.stanfordRegion}`)
            .data(this.owner.config.regions);
        // exit
        stanfordRegion.exit().transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        const stanfordRegionEnter = stanfordRegion.enter().append("g");
        stanfordRegionEnter.append("polygon")
            .style("opacity", "0");
        stanfordRegionEnter.append("text")
            .attr("transform", isRotated ? "rotate(-90)" : "")
            .style("opacity", "0");
        stanfordRegion = stanfordRegionEnter.merge(stanfordRegion);
        // update
        stanfordRegion
            .attr("class", d => CLASS.stanfordRegion + (d.class ? ` ${d.class}` : ""))
            .select("polygon")
            .transition()
            .duration(duration)
            .attr("points", d => d.points.map(value => [
            isRotated ? yvCustom(value, "y") : xvCustom(value, "x"),
            isRotated ? xvCustom(value, "x") : yvCustom(value, "y")
        ].join(",")).join(" "))
            .transition()
            .style("opacity", d => String(d.opacity ? d.opacity : 0.2));
        stanfordRegion.select("text")
            .transition()
            .duration(duration)
            .attr("x", d => (isRotated ?
            yvCustom(getCentroid(d.points), "y") :
            xvCustom(getCentroid(d.points), "x")))
            .attr("y", d => (isRotated ?
            xvCustom(getCentroid(d.points), "x") :
            yvCustom(getCentroid(d.points), "y")))
            .text(d => {
            if (d.text) {
                const { value, percentage } = countPointsInRegion(d.points);
                return d.text(value, percentage);
            }
            return "";
        })
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .transition()
            .style("opacity", null);
    }
    updateStanfordElements(duration = 0) {
        this.updateStanfordLines(duration);
        this.updateStanfordRegions(duration);
    }
    xvCustom(d, xyValue) {
        const $$ = this;
        const { axis, config } = $$;
        let value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        if (axis.isTimeSeries()) {
            value = parseDate.call($$, value);
        }
        else if (axis.isCategorized() && isString(value)) {
            value = config.axis_x_categories.indexOf(d.value);
        }
        return $$.scale.x(value);
    }
    yvCustom(d, xyValue) {
        const $$ = this;
        const yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y;
        const value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        return yScale(value);
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @augments Plugin
 * @returns {StanfordOptions}
 * @private
 */
class Options {
    constructor() {
        return {
            /**
             * Set the color of the color scale. This function receives a value between 0 and 1, and should return a color.
             * @name colors
             * @memberof plugin-stanford
             * @type {function}
             * @default undefined
             * @example
             *   colors: d3.interpolateHslLong(
             *      d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
             *   )
             */
            colors: undefined,
            /**
             * Specify the key of epochs values in the data.
             * @name epochs
             * @memberof plugin-stanford
             * @type {Array}
             * @default []
             * @example
             * 	epochs: [ 1, 1, 2, 2, ... ]
             */
            epochs: [],
            /**
             * Show additional lines anywhere on the chart.
             * - Each line object should consist with following options:
             *
             * | Key | Type | Description |
             * | --- | --- | --- |
             * | x1 | Number | Starting position on the x axis |
             * | y1 | Number | Starting position on the y axis |
             * | x2 | Number | Ending position on the x axis  |
             * | y2 | Number | Ending position on the y axis |
             * | class | String | Optional value. Set a custom css class to this line. |
             * @type {Array}
             * @memberof plugin-stanford
             * @default []
             * @example
             *   lines: [
             *       { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
             *       { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
             *   ]
             */
            lines: [],
            /**
             * Set scale values
             * @name scale
             * @memberof plugin-stanford
             * @type {object}
             * @property {object} [scale] scale object
             * @property {number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
             * @property {number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
             * @property {number} [scale.width=20] Width of the color scale
             * @property {string|function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
             * @example
             *  scale: {
             *    max: 10000,
             *    min: 1,
             *    width: 500,
             *
             *    // specify 'pow10' to format as powers of 10
             *    format: "pow10",
             *
             *    // or specify a format function
             *    format: function(x) {
             *    	return x +"%";
             *    }
             *  },
             */
            scale_min: undefined,
            scale_max: undefined,
            scale_width: 20,
            scale_format: undefined,
            /**
             * The padding for color scale element
             * @name padding
             * @memberof plugin-stanford
             * @type {object}
             * @property {object} [padding] padding object
             * @property {number} [padding.top=0] Top padding value.
             * @property {number} [padding.right=0] Right padding value.
             * @property {number} [padding.bottom=0] Bottom padding value.
             * @property {number} [padding.left=0] Left padding value.
             * @example
             *  padding: {
             *     top: 15,
             *     right: 0,
             *     bottom: 0,
             *     left: 0
             *  },
             */
            padding_top: 0,
            padding_right: 0,
            padding_bottom: 0,
            padding_left: 0,
            /**
             * Show additional regions anywhere on the chart.
             * - Each region object should consist with following options:
             *
             *   | Key | Type | Default | Attributes | Description |
             *   | --- | --- | --- | --- | --- |
             *   | points | Array |  | | Accepts a group of objects that has x and y.<br>These points should be added in a counter-clockwise fashion to make a closed polygon. |
             *   | opacity | Number | `0.2` | &lt;optional> | Sets the opacity of the region as value between 0 and 1 |
             *   | text | Function |  | &lt;optional> | This function receives a value and percentage of the number of epochs in this region.<br>Return a string to place text in the middle of the region. |
             *   | class | String | | &lt;optional> | Se a custom css class to this region, use the fill property in css to set a background color. |
             * @name regions
             * @memberof plugin-stanford
             * @type {Array}
             * @default []
             * @example
             *   regions: [
             *       {
             *           points: [ // add points counter-clockwise
             *               { x: 0, y: 0 },
             *               { x: 40, y: 40 },
             *               { x: 0, y: 40 },
             *           ],
             *           text: function (value, percentage) {
             *               return `Normal Operations: ${value} (${percentage}%)`;
             *           },
             *           opacity: 0.2, // 0 to 1
             *           class: "test-polygon1"
             *       },
             *       ...
             *   ]
             */
            regions: []
        };
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck
/**
 * Creates an HSL color object.
 * @param {number} h Hue (0-360)
 * @param {number} s Saturation (0-1)
 * @param {number} l Lightness (0-1)
 * @param {number} opacity Opacity (0-1), defaults to 1
 * @returns {HSLColor} HSL color object
 */
function hsl(h, s, l, opacity = 1) {
    return {
        h: +h,
        s: 1,
        l: 0.5,
        opacity: +opacity
    };
}
/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Is preferable use `scatter` as data.type
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-interpolate](https://github.com/d3/d3-interpolate)
 *   - [d3-scale](https://github.com/d3/d3-scale)
 *   - [d3-brush](https://github.com/d3/d3-brush)
 *   - [d3-axis](https://github.com/d3/d3-axis)
 * @class plugin-stanford
 * @requires d3-selection
 * @requires d3-interpolate
 * @requires d3-scale
 * @requires d3-brush
 * @requires d3-axis
 * @param {object} options Stanford plugin options
 * @augments Plugin
 * @returns {Stanford}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-stanford.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "scatter"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({
 *           colors: d3.interpolateHslLong(
 *              d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
 *           ),
 *           epochs: [ 1, 1, 2, 2, ... ],
 *           lines: [
 *                  { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
 *                  { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
 *           ],
 *           scale: {
 *           	max: 10000,
 *             	min: 1,
 *           	width: 500,
 *             	format: 'pow10',
 *           },
 *           padding: {
 *           	top: 15,
 *           	right: 0,
 *           	bottom: 0,
 *           	left: 0
 *           },
 *           regions: [
 *           	{
 *               	points: [ // add points counter-clockwise
 *               	    { x: 0, y: 0 },
 *               	    { x: 40, y: 40 },
 *               	    { x: 0, y: 40 }
 *               	],
 *               	text: function (value, percentage) {
 *               	    return `Normal Operations: ${value} (${percentage}%)`;
 *               	},
 *               	opacity: 0.2, // 0 to 1
 *               	class: "test-polygon1"
 *              },
 *             	...
 *           ]
 *        }
 *     ]
 *  });
 * @example
 * 	import {bb} from "billboard.js";
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */
class Stanford extends Plugin {
    colorScale;
    elements;
    constructor(options) {
        super(options);
        this.config = new Options();
        return this;
    }
    $beforeInit() {
        const { $$ } = this;
        // override on config values & methods
        $$.config.data_xSort = false;
        $$.isMultipleX = () => true;
        $$.showGridFocus = () => { };
        $$.labelishData = d => d.values;
        $$.opacityForCircle = () => 1;
        const getCurrentPadding = $$.getCurrentPadding.bind($$);
        $$.getCurrentPadding = () => {
            const padding = getCurrentPadding();
            padding.right += this.colorScale ? this.colorScale.getColorScalePadding() : 0;
            return padding;
        };
    }
    $init() {
        const { $$ } = this;
        this.loadConfig();
        $$.color = this.getStanfordPointColor.bind($$);
        this.colorScale = new ColorScale(this);
        this.elements = new Elements(this);
        this.convertData();
        this.initStanfordData();
        this.setStanfordTooltip();
        this.colorScale.drawColorScale();
        $$.right += this.colorScale ? this.colorScale.getColorScalePadding() : 0;
        this.$redraw();
    }
    $redraw(duration) {
        this.colorScale?.drawColorScale();
        this.elements?.updateStanfordElements(duration);
    }
    getOptions() {
        return new Options();
    }
    convertData() {
        const data = this.$$.data.targets;
        const epochs = this.options.epochs;
        data.forEach(d => {
            d.values.forEach((v, i) => {
                v.epochs = epochs[i];
            });
            d.minEpochs = undefined;
            d.maxEpochs = undefined;
            d.colors = undefined;
            d.colorscale = undefined;
        });
    }
    initStanfordData() {
        const { config } = this;
        const target = this.$$.data.targets[0];
        // TODO STANFORD see if (data.js -> orderTargets)+ can be used instead
        // Make larger values appear on top
        target.values.sort(compareEpochs);
        // Get min/max epochs
        let minEpoch = Infinity;
        let maxEpoch = -Infinity;
        for (let i = 0; i < target.values.length; i++) {
            const e = target.values[i].epochs;
            if (e < minEpoch)
                minEpoch = e;
            if (e > maxEpoch)
                maxEpoch = e;
        }
        target.minEpochs = !isNaN(config.scale_min) ? config.scale_min : minEpoch;
        target.maxEpochs = !isNaN(config.scale_max) ? config.scale_max : maxEpoch;
        target.colors = isFunction(config.colors) ?
            config.colors :
            interpolateHslLong(hsl(250), hsl(0));
        target.colorscale = scaleSequentialLog(target.colors)
            .domain([target.minEpochs, target.maxEpochs]);
    }
    getStanfordPointColor(d) {
        const target = this.data.targets[0];
        return target.colorscale(d.epochs);
    }
    setStanfordTooltip() {
        const { config } = this.$$;
        if (isEmpty(config.tooltip_contents)) {
            config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                const { data_x } = config;
                let html = `<table class="${$TOOLTIP.tooltip}"><tbody>`;
                d.forEach(v => {
                    const { id = "", value = 0, epochs = 0, x = "" } = v;
                    html += `<tr>
							<th>${data_x || ""}</th>
							<th class="value">${defaultTitleFormat(x)}</th>
						</tr>
						<tr>
							<th>${v.id}</th>
							<th class="value">${defaultValueFormat(value)}</th>
						</tr>
						<tr class="${$TOOLTIP.tooltipName}-${id}">
							<td class="name"><span style="background-color:${color(v)}"></span>Epochs</td>
							<td class="value">${defaultValueFormat(epochs)}</td>
						</tr>`;
                });
                return `${html}</tbody></table>`;
            };
        }
    }
    countEpochsInRegion(region) {
        const $$ = this;
        const target = $$.data.targets[0];
        const total = target.values.reduce((accumulator, currentValue) => accumulator + Number(currentValue.epochs), 0);
        const value = target.values.reduce((accumulator, currentValue) => {
            if (pointInRegion(currentValue, region)) {
                return accumulator + Number(currentValue.epochs);
            }
            return accumulator;
        }, 0);
        return {
            value,
            percentage: value !== 0 ? +(value / total * 100).toFixed(1) : 0
        };
    }
}

export { Stanford as default };
