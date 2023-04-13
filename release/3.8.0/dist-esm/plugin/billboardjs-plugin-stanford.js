/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.8.0
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { interpolateHslLong } from 'd3-interpolate';
import { hsl } from 'd3-color';
import { scaleSequential, scaleSymlog, scaleSequentialLog } from 'd3-scale';
import { axisRight } from 'd3-axis';
import { format } from 'd3-format';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + (b + "") + " is not a constructor or null");
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var _assign = function __assign() {
  _assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
var $COMMON = {
    button: "bb-button",
    chart: "bb-chart",
    empty: "bb-empty",
    main: "bb-main",
    target: "bb-target",
    EXPANDED: "_expanded_"
};
var $ARC = {
    arc: "bb-arc",
    arcLabelLine: "bb-arc-label-line",
    arcs: "bb-arcs",
    chartArc: "bb-chart-arc",
    chartArcs: "bb-chart-arcs",
    chartArcsBackground: "bb-chart-arcs-background",
    chartArcsTitle: "bb-chart-arcs-title"
};
var $AREA = {
    area: "bb-area",
    areas: "bb-areas"
};
var $AXIS = {
    axis: "bb-axis",
    axisX: "bb-axis-x",
    axisXLabel: "bb-axis-x-label",
    axisY: "bb-axis-y",
    axisY2: "bb-axis-y2",
    axisY2Label: "bb-axis-y2-label",
    axisYLabel: "bb-axis-y-label"
};
var $BAR = {
    bar: "bb-bar",
    bars: "bb-bars",
    chartBar: "bb-chart-bar",
    chartBars: "bb-chart-bars"
};
var $CANDLESTICK = {
    candlestick: "bb-candlestick",
    candlesticks: "bb-candlesticks",
    chartCandlestick: "bb-chart-candlestick",
    chartCandlesticks: "bb-chart-candlesticks",
    valueDown: "bb-value-down",
    valueUp: "bb-value-up"
};
var $CIRCLE = {
    chartCircles: "bb-chart-circles",
    circle: "bb-circle",
    circles: "bb-circles"
};
var $COLOR = {
    colorPattern: "bb-color-pattern",
    colorScale: "bb-colorscale"
};
var $DRAG = {
    dragarea: "bb-dragarea",
    INCLUDED: "_included_"
};
var $GAUGE = {
    chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
    chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
    chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
    chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
    gaugeValue: "bb-gauge-value"
};
var $LEGEND = {
    legend: "bb-legend",
    legendBackground: "bb-legend-background",
    legendItem: "bb-legend-item",
    legendItemEvent: "bb-legend-item-event",
    legendItemHidden: "bb-legend-item-hidden",
    legendItemPoint: "bb-legend-item-point",
    legendItemTile: "bb-legend-item-tile"
};
var $LINE = {
    chartLine: "bb-chart-line",
    chartLines: "bb-chart-lines",
    line: "bb-line",
    lines: "bb-lines"
};
var $EVENT = {
    eventRect: "bb-event-rect",
    eventRects: "bb-event-rects",
    eventRectsMultiple: "bb-event-rects-multiple",
    eventRectsSingle: "bb-event-rects-single",
};
var $FOCUS = {
    focused: "bb-focused",
    defocused: "bb-defocused",
    legendItemFocused: "bb-legend-item-focused",
    xgridFocus: "bb-xgrid-focus",
    ygridFocus: "bb-ygrid-focus"
};
var $GRID = {
    grid: "bb-grid",
    gridLines: "bb-grid-lines",
    xgrid: "bb-xgrid",
    xgridLine: "bb-xgrid-line",
    xgridLines: "bb-xgrid-lines",
    xgrids: "bb-xgrids",
    ygrid: "bb-ygrid",
    ygridLine: "bb-ygrid-line",
    ygridLines: "bb-ygrid-lines",
    ygrids: "bb-ygrids"
};
var $RADAR = {
    chartRadar: "bb-chart-radar",
    chartRadars: "bb-chart-radars"
};
var $REGION = {
    region: "bb-region",
    regions: "bb-regions"
};
var $SELECT = {
    selectedCircle: "bb-selected-circle",
    selectedCircles: "bb-selected-circles",
    SELECTED: "_selected_"
};
var $SHAPE = {
    shape: "bb-shape",
    shapes: "bb-shapes",
};
var $SUBCHART = {
    brush: "bb-brush",
    subchart: "bb-subchart"
};
var $TEXT = {
    chartText: "bb-chart-text",
    chartTexts: "bb-chart-texts",
    text: "bb-text",
    texts: "bb-texts",
    title: "bb-title",
    TextOverlapping: "text-overlapping"
};
var $TOOLTIP = {
    tooltip: "bb-tooltip",
    tooltipContainer: "bb-tooltip-container",
    tooltipName: "bb-tooltip-name"
};
var $TREEMAP = {
    treemap: "bb-treemap",
    chartTreemap: "bb-chart-treemap",
    chartTreemaps: "bb-chart-treemaps"
};
var $ZOOM = {
    buttonZoomReset: "bb-zoom-reset",
    zoomBrush: "bb-zoom-brush"
};
_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign({}, $COMMON), $ARC), $AREA), $AXIS), $BAR), $CANDLESTICK), $CIRCLE), $COLOR), $DRAG), $GAUGE), $LEGEND), $LINE), $EVENT), $FOCUS), $GRID), $RADAR), $REGION), $SELECT), $SHAPE), $SUBCHART), $TEXT), $TOOLTIP), $TREEMAP), $ZOOM);

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var win = (function () {
    var root = (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis) ||
        (typeof global === "object" && global !== null && global.Object === Object && global) ||
        (typeof self === "object" && self !== null && self.Object === Object && self);
    return root || Function("return this")();
})();
var doc = win === null || win === void 0 ? void 0 : win.document;

var isFunction = function (v) { return typeof v === "function"; };
var isString = function (v) { return typeof v === "string"; };
var isNumber = function (v) { return typeof v === "number"; };
var isUndefined = function (v) { return typeof v === "undefined"; };
var isDefined = function (v) { return typeof v !== "undefined"; };
var isObjectType = function (v) { return typeof v === "object"; };
var isEmpty = function (o) { return (isUndefined(o) || o === null ||
    (isString(o) && o.length === 0) ||
    (isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0) ||
    (isNumber(o) && isNaN(o))); };
/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
var isArray = function (arr) { return Array.isArray(arr); };
/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
var isObject = function (obj) { return obj && !(obj === null || obj === void 0 ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj); };
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */
function mergeObj(target) {
    var objectN = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objectN[_i - 1] = arguments[_i];
    }
    if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
        return target;
    }
    var source = objectN.shift();
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var value = source[key];
            if (isObject(value)) {
                !target[key] && (target[key] = {});
                target[key] = mergeObj(target[key], value);
            }
            else {
                target[key] = isArray(value) ?
                    value.concat() : value;
            }
        });
    }
    return mergeObj.apply(void 0, __spreadArray([target], objectN, false));
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */
var getRange = function (start, end, step) {
    if (step === void 0) { step = 1; }
    var res = [];
    var n = Math.max(0, Math.ceil((end - start) / step)) | 0;
    for (var i = start; i < n; i++) {
        res.push(start + i * step);
    }
    return res;
};
// emulate event
({
    mouse: (function () {
        var getParams = function () { return ({
            bubbles: false, cancelable: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0
        }); };
        try {
            // eslint-disable-next-line no-new
            new MouseEvent("t");
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                el.dispatchEvent(new MouseEvent(eventType, params));
            };
        }
        catch (e) {
            // Polyfills DOM4 MouseEvent
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                var mouseEvent = doc.createEvent("MouseEvent");
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
                mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
                params.screenX, params.screenY, params.clientX, params.clientY, false, false, false, false, 0, null);
                el.dispatchEvent(mouseEvent);
            };
        }
    })(),
    touch: function (el, eventType, params) {
        var touchObj = new Touch(mergeObj({
            identifier: Date.now(),
            target: el,
            radiusX: 2.5,
            radiusY: 2.5,
            rotationAngle: 10,
            force: 0.5
        }, params));
        el.dispatchEvent(new TouchEvent(eventType, {
            cancelable: true,
            bubbles: true,
            shiftKey: true,
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj]
        }));
    }
});
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */
function parseDate(date) {
    var _a;
    var parsedDate;
    if (date instanceof Date) {
        parsedDate = date;
    }
    else if (isString(date)) {
        var _b = this, config = _b.config, format = _b.format;
        // if fails to parse, try by new Date()
        // https://github.com/naver/billboard.js/issues/1714
        parsedDate = (_a = format.dataTime(config.data_xFormat)(date)) !== null && _a !== void 0 ? _a : new Date(date);
    }
    else if (isNumber(date) && !isNaN(date)) {
        parsedDate = new Date(+date);
    }
    if (!parsedDate || isNaN(+parsedDate)) {
        console && console.error &&
            console.error("Failed to parse x '".concat(date, "' to Date object"));
    }
    return parsedDate;
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
    var thisConfig = this.config;
    var target;
    var keys;
    var read;
    var find = function () {
        var key = keys.shift();
        if (key && target && isObjectType(target) && key in target) {
            target = target[key];
            return find();
        }
        else if (!key) {
            return target;
        }
        return undefined;
    };
    Object.keys(thisConfig).forEach(function (key) {
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
var Plugin = /** @class */ (function () {
    /**
     * Constructor
     * @param {Any} options config option object
     * @private
     */
    function Plugin(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    /**
     * Lifecycle hook for 'beforeInit' phase.
     * @private
     */
    Plugin.prototype.$beforeInit = function () { };
    /**
     * Lifecycle hook for 'init' phase.
     * @private
     */
    Plugin.prototype.$init = function () { };
    /**
     * Lifecycle hook for 'afterInit' phase.
     * @private
     */
    Plugin.prototype.$afterInit = function () { };
    /**
     * Lifecycle hook for 'redraw' phase.
     * @private
     */
    Plugin.prototype.$redraw = function () { };
    /**
     * Lifecycle hook for 'willDestroy' phase.
     * @private
     */
    Plugin.prototype.$willDestroy = function () {
        var _this = this;
        Object.keys(this).forEach(function (key) {
            _this[key] = null;
            delete _this[key];
        });
    };
    Plugin.version = "3.8.0";
    return Plugin;
}());
var Plugin$1 = Plugin;

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
var Options = /** @class */ (function () {
    function Options() {
        return {
            /**
             * Set the color of the color scale. This function receives a value between 0 and 1, and should return a color.
             * @name colors
             * @memberof plugin-stanford
             * @type {Function}
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
             * @property {string|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
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
    return Options;
}());
var Options$1 = Options;

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
    var x = point.x;
    var y = point.value;
    var inside = false;
    for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
        var xi = region[i].x;
        var yi = region[i].y;
        var xj = region[j].x;
        var yj = region[j].y;
        var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
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
    var area = 0;
    var point1;
    var point2;
    for (var i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
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
    var area = getRegionArea(points);
    var x = 0;
    var y = 0;
    var f;
    for (var i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
        var point1 = points[i];
        var point2 = points[j];
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
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */
var Elements = /** @class */ (function () {
    function Elements(owner) {
        this.owner = owner;
        // MEMO: Avoid blocking eventRect
        var elements = owner.$$.$el.main.select(".bb-chart")
            .append("g")
            .attr("class", CLASS.stanfordElements);
        elements.append("g").attr("class", CLASS.stanfordLines);
        elements.append("g").attr("class", CLASS.stanfordRegions);
    }
    Elements.prototype.updateStanfordLines = function (duration) {
        var $$ = this.owner.$$;
        var config = $$.config, main = $$.$el.main;
        var isRotated = config.axis_rotated;
        var xvCustom = this.xvCustom.bind($$);
        var yvCustom = this.yvCustom.bind($$);
        // Stanford-Lines
        var stanfordLine = main.select(".".concat(CLASS.stanfordLines))
            .style("shape-rendering", "geometricprecision")
            .selectAll(".".concat(CLASS.stanfordLine))
            .data(this.owner.config.lines);
        // exit
        stanfordLine.exit().transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        var stanfordLineEnter = stanfordLine.enter().append("g");
        stanfordLineEnter.append("line")
            .style("opacity", "0");
        stanfordLineEnter
            .merge(stanfordLine)
            .attr("class", function (d) { return CLASS.stanfordLine + (d.class ? " ".concat(d.class) : ""); })
            .select("line")
            .transition()
            .duration(duration)
            .attr("x1", function (d) { return (isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1")); })
            .attr("x2", function (d) { return (isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2")); })
            .attr("y1", function (d) { return (isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1")); })
            .attr("y2", function (d) { return (isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2")); })
            .transition()
            .style("opacity", null);
    };
    Elements.prototype.updateStanfordRegions = function (duration) {
        var $$ = this.owner.$$;
        var config = $$.config, main = $$.$el.main;
        var isRotated = config.axis_rotated;
        var xvCustom = this.xvCustom.bind($$);
        var yvCustom = this.yvCustom.bind($$);
        var countPointsInRegion = this.owner.countEpochsInRegion.bind($$);
        // Stanford-Regions
        var stanfordRegion = main.select(".".concat(CLASS.stanfordRegions))
            .selectAll(".".concat(CLASS.stanfordRegion))
            .data(this.owner.config.regions);
        // exit
        stanfordRegion.exit().transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        var stanfordRegionEnter = stanfordRegion.enter().append("g");
        stanfordRegionEnter.append("polygon")
            .style("opacity", "0");
        stanfordRegionEnter.append("text")
            .attr("transform", isRotated ? "rotate(-90)" : "")
            .style("opacity", "0");
        stanfordRegion = stanfordRegionEnter.merge(stanfordRegion);
        // update
        stanfordRegion
            .attr("class", function (d) { return CLASS.stanfordRegion + (d.class ? " ".concat(d.class) : ""); })
            .select("polygon")
            .transition()
            .duration(duration)
            .attr("points", function (d) { return d.points.map(function (value) { return [
            isRotated ? yvCustom(value, "y") : xvCustom(value, "x"),
            isRotated ? xvCustom(value, "x") : yvCustom(value, "y")
        ].join(","); }).join(" "); })
            .transition()
            .style("opacity", function (d) { return String(d.opacity ? d.opacity : 0.2); });
        stanfordRegion.select("text")
            .transition()
            .duration(duration)
            .attr("x", function (d) { return (isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x")); })
            .attr("y", function (d) { return (isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y")); })
            .text(function (d) {
            if (d.text) {
                var _a = countPointsInRegion(d.points), value = _a.value, percentage = _a.percentage;
                return d.text(value, percentage);
            }
            return "";
        })
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .transition()
            .style("opacity", null);
    };
    Elements.prototype.updateStanfordElements = function (duration) {
        if (duration === void 0) { duration = 0; }
        this.updateStanfordLines(duration);
        this.updateStanfordRegions(duration);
    };
    Elements.prototype.xvCustom = function (d, xyValue) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        if (axis.isTimeSeries()) {
            value = parseDate.call($$, value);
        }
        else if (axis.isCategorized() && isString(value)) {
            value = config.axis_x_categories.indexOf(d.value);
        }
        return Math.ceil($$.scale.x(value));
    };
    Elements.prototype.yvCustom = function (d, xyValue) {
        var $$ = this;
        var yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y;
        var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        return Math.ceil(yScale(value));
    };
    return Elements;
}());
var Elements$1 = Elements;

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Stanford diagram plugin color scale class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */
var ColorScale = /** @class */ (function () {
    function ColorScale(owner) {
        this.owner = owner;
    }
    ColorScale.prototype.drawColorScale = function () {
        var _a = this.owner, $$ = _a.$$, config = _a.config;
        var target = $$.data.targets[0];
        var height = $$.state.height - config.padding_bottom - config.padding_top;
        var barWidth = config.scale_width;
        var barHeight = 5;
        var points = getRange(config.padding_bottom, height, barHeight);
        var inverseScale = scaleSequential(target.colors)
            .domain([points[points.length - 1], points[0]]);
        if (this.colorScale) {
            this.colorScale.remove();
        }
        this.colorScale = $$.$el.svg.append("g")
            .attr("width", 50)
            .attr("height", height)
            .attr("class", CLASS.colorScale);
        this.colorScale.append("g")
            .attr("transform", "translate(0, ".concat(config.padding_top, ")"))
            .selectAll("bars")
            .data(points)
            .enter()
            .append("rect")
            .attr("y", function (d, i) { return i * barHeight; })
            .attr("x", 0)
            .attr("width", barWidth)
            .attr("height", barHeight)
            .attr("fill", function (d) { return inverseScale(d); });
        // Legend Axis
        var axisScale = scaleSymlog()
            .domain([target.minEpochs, target.maxEpochs])
            .range([
            points[0] + config.padding_top + points[points.length - 1] + barHeight - 1,
            points[0] + config.padding_top
        ]);
        var legendAxis = axisRight(axisScale);
        var scaleFormat = config.scale_format;
        if (scaleFormat === "pow10") {
            legendAxis.tickValues([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]);
        }
        else if (isFunction(scaleFormat)) {
            legendAxis.tickFormat(scaleFormat);
        }
        else {
            legendAxis.tickFormat(format("d"));
        }
        // Draw Axis
        var axis = this.colorScale.append("g")
            .attr("class", "legend axis")
            .attr("transform", "translate(".concat(barWidth, ",0)"))
            .call(legendAxis);
        if (scaleFormat === "pow10") {
            axis.selectAll(".tick text")
                .text(null)
                .filter(function (d) { return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1; }) // Power of Ten
                .text(10)
                .append("tspan")
                .attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
                .text(function (d) { return Math.round(Math.log(d) / Math.LN10); });
        }
        this.colorScale.attr("transform", "translate(".concat($$.state.current.width - this.xForColorScale(), ", 0)"));
    };
    ColorScale.prototype.xForColorScale = function () {
        return this.owner.config.padding_right +
            this.colorScale.node().getBBox().width;
    };
    ColorScale.prototype.getColorScalePadding = function () {
        return this.xForColorScale() + this.owner.config.padding_left + 20;
    };
    return ColorScale;
}());
var ColorScale$1 = ColorScale;

/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Is preferable use `scatter` as data.type
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-interpolate](https://github.com/d3/d3-interpolate)
 *   - [d3-color](https://github.com/d3/d3-color)
 *   - [d3-scale](https://github.com/d3/d3-scale)
 *   - [d3-brush](https://github.com/d3/d3-brush)
 *   - [d3-axis](https://github.com/d3/d3-axis)
 *   - [d3-format](https://github.com/d3/d3-format)
 * @class plugin-stanford
 * @requires d3-selection
 * @requires d3-interpolate
 * @requires d3-color
 * @requires d3-scale
 * @requires d3-brush
 * @requires d3-axis
 * @requires d3-format
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
 *	import {bb} from "billboard.js";
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */
var Stanford = /** @class */ (function (_super) {
    __extends(Stanford, _super);
    function Stanford(options) {
        var _this = _super.call(this, options) || this;
        _this.config = new Options$1();
        return _this;
    }
    Stanford.prototype.$beforeInit = function () {
        var _this = this;
        var $$ = this.$$;
        // override on config values & methods
        $$.config.data_xSort = false;
        $$.isMultipleX = function () { return true; };
        $$.showGridFocus = function () { };
        $$.labelishData = function (d) { return d.values; };
        $$.opacityForCircle = function () { return 1; };
        var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);
        $$.getCurrentPaddingRight = function () { return (getCurrentPaddingRight() + (_this.colorScale ? _this.colorScale.getColorScalePadding() : 0)); };
    };
    Stanford.prototype.$init = function () {
        var $$ = this.$$;
        loadConfig.call(this, this.options);
        $$.color = this.getStanfordPointColor.bind($$);
        this.colorScale = new ColorScale$1(this);
        this.elements = new Elements$1(this);
        this.convertData();
        this.initStanfordData();
        this.setStanfordTooltip();
        this.colorScale.drawColorScale();
        this.$redraw();
    };
    Stanford.prototype.$redraw = function (duration) {
        var _a, _b;
        (_a = this.colorScale) === null || _a === void 0 ? void 0 : _a.drawColorScale();
        (_b = this.elements) === null || _b === void 0 ? void 0 : _b.updateStanfordElements(duration);
    };
    Stanford.prototype.getOptions = function () {
        return new Options$1();
    };
    Stanford.prototype.convertData = function () {
        var data = this.$$.data.targets;
        var epochs = this.options.epochs;
        data.forEach(function (d) {
            d.values.forEach(function (v, i) {
                v.epochs = epochs[i];
            });
            d.minEpochs = undefined;
            d.maxEpochs = undefined;
            d.colors = undefined;
            d.colorscale = undefined;
        });
    };
    Stanford.prototype.xvCustom = function (d, xyValue) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        if (axis.isTimeSeries()) {
            value = parseDate.call($$, value);
        }
        else if (axis.isCategorized() && isString(value)) {
            value = config.axis_x_categories.indexOf(d.value);
        }
        return Math.ceil($$.scale.x(value));
    };
    Stanford.prototype.yvCustom = function (d, xyValue) {
        var $$ = this;
        var scale = $$.scale;
        var yScale = d.axis && d.axis === "y2" ? scale.y2 : scale.y;
        var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
        return Math.ceil(yScale(value));
    };
    Stanford.prototype.initStanfordData = function () {
        var config = this.config;
        var target = this.$$.data.targets[0];
        // TODO STANFORD see if (data.js -> orderTargets)+ can be used instead
        // Make larger values appear on top
        target.values.sort(compareEpochs);
        // Get array of epochs
        var epochs = target.values.map(function (a) { return a.epochs; });
        target.minEpochs = !isNaN(config.scale_min) ? config.scale_min : Math.min.apply(Math, epochs);
        target.maxEpochs = !isNaN(config.scale_max) ? config.scale_max : Math.max.apply(Math, epochs);
        target.colors = isFunction(config.colors) ?
            config.colors : interpolateHslLong(hsl(250, 1, 0.5), hsl(0, 1, 0.5));
        target.colorscale = scaleSequentialLog(target.colors)
            .domain([target.minEpochs, target.maxEpochs]);
    };
    Stanford.prototype.getStanfordPointColor = function (d) {
        var target = this.data.targets[0];
        return target.colorscale(d.epochs);
    };
    Stanford.prototype.setStanfordTooltip = function () {
        var config = this.$$.config;
        if (isEmpty(config.tooltip_contents)) {
            config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                var data_x = config.data_x;
                var html = "<table class=\"".concat($TOOLTIP.tooltip, "\"><tbody>");
                d.forEach(function (v) {
                    var _a = v.id, id = _a === void 0 ? "" : _a, _b = v.value, value = _b === void 0 ? 0 : _b, _c = v.epochs, epochs = _c === void 0 ? 0 : _c, _d = v.x, x = _d === void 0 ? "" : _d;
                    html += "<tr>\n\t\t\t\t\t\t\t<th>".concat(data_x || "", "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultTitleFormat(x), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>").concat(v.id, "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultValueFormat(value), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"").concat($TOOLTIP.tooltipName, "-").concat(id, "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:").concat(color(v), "\"></span>Epochs</td>\n\t\t\t\t\t\t\t<td class=\"value\">").concat(defaultValueFormat(epochs), "</td>\n\t\t\t\t\t\t</tr>");
                });
                return "".concat(html, "</tbody></table>");
            };
        }
    };
    Stanford.prototype.countEpochsInRegion = function (region) {
        var $$ = this;
        var target = $$.data.targets[0];
        var total = target.values.reduce(function (accumulator, currentValue) {
            return accumulator + Number(currentValue.epochs);
        }, 0);
        var value = target.values.reduce(function (accumulator, currentValue) {
            if (pointInRegion(currentValue, region)) {
                return accumulator + Number(currentValue.epochs);
            }
            return accumulator;
        }, 0);
        return {
            value: value,
            percentage: value !== 0 ? +(value / total * 100).toFixed(1) : 0
        };
    };
    return Stanford;
}(Plugin$1));

export { Stanford as default };
