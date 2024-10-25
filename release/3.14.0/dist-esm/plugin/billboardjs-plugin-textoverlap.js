/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.14.0
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { Delaunay } from 'd3-delaunay';
import { polygonCentroid, polygonArea } from 'd3-polygon';

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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */
/**
 * Get global object
 * @returns {object} window object
 * @private
 */
function getGlobal() {
    return (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object &&
        globalThis) ||
        (typeof global === "object" && global !== null && global.Object === Object && global) ||
        (typeof self === "object" && self !== null && self.Object === Object && self) ||
        Function("return this")();
}
var win = getGlobal();
var doc = win === null || win === void 0 ? void 0 : win.document;

var isDefined = function (v) { return typeof v !== "undefined"; };
var isObjectType = function (v) { return typeof v === "object"; };
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
                target[key] = isArray(value) ? value.concat() : value;
            }
        });
    }
    return mergeObj.apply(void 0, __spreadArray([target], objectN, false));
}
// emulate event
({
    mouse: (function () {
        var getParams = function () { return ({
            bubbles: false,
            cancelable: false,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0
        }); };
        try {
            // eslint-disable-next-line no-new
            new MouseEvent("t");
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                el.dispatchEvent(new MouseEvent(eventType, params));
            };
        }
        catch (_a) {
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
    Plugin.version = "3.14.0";
    return Plugin;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * TextOverlap plugin option class
 * @class TextOverlapOptions
 * @param {Options} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlapOptions}
 * @private
 */
var Options = /** @class */ (function () {
    function Options() {
        return {
            /**
             * Selector string for target text nodes within chart element.
             * - **NOTE:** If no value is given, defaults to data label text elements.
             * @name selector
             * @memberof plugin-textoverlap
             * @type {string}
             * @default undefined
             * @example
             *  // selector for data label text nodes
             * selector: ".bb-texts text"
             */
            selector: undefined,
            /**
             * Extent of label overlap prevention.
             * @name extent
             * @memberof plugin-textoverlap
             * @type {number}
             * @default 1
             * @example
             * 	extent: 1
             */
            extent: 1,
            /**
             * Minimum area needed to show a data label.
             * @name area
             * @memberof plugin-textoverlap
             * @type {number}
             * @default 0
             * @example
             * 	area: 0
             */
            area: 0
        };
    }
    return Options;
}());

/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Appropriate and works for axis based chart.
 * - **Required modules:**
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-delaunay](https://github.com/d3/d3-delaunay)
 * @class plugin-textoverlap
 * @requires d3-polygon
 * @requires d3-delaunay
 * @param {object} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlap}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-textoverlap.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *     	  columns: [ ... ]
 *     },
 *     ...
 *     plugins: [
 *        new bb.plugin.textoverlap({
 *          selector: ".bb-texts text",
 *          extent: 8,
 *          area: 3
 *        })
 *     ]
 *  });
 * @example
 * 	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */
var TextOverlap = /** @class */ (function (_super) {
    __extends(TextOverlap, _super);
    function TextOverlap(options) {
        var _this = _super.call(this, options) || this;
        _this.config = new Options();
        return _this;
    }
    TextOverlap.prototype.$init = function () {
        loadConfig.call(this, this.options);
    };
    TextOverlap.prototype.$redraw = function () {
        var _a = this, $el = _a.$$.$el, selector = _a.config.selector;
        var text = selector ? $el.main.selectAll(selector) : $el.text;
        !text.empty() && this.preventLabelOverlap(text);
    };
    /**
     * Generates the voronoi layout for data labels
     * @param {Array} points Indices values
     * @returns {object} Voronoi layout points and corresponding Data points
     * @private
     */
    TextOverlap.prototype.generateVoronoi = function (points) {
        var _a;
        var $$ = this.$$;
        var scale = $$.scale;
        var _b = ["x", "y"].map(function (v) { return scale[v].domain(); }), min = _b[0], max = _b[1];
        _a = [max[0], min[1]], min[1] = _a[0], max[0] = _a[1];
        return Delaunay
            .from(points)
            .voronoi(__spreadArray(__spreadArray([], min, true), max, true)); // bounds = [xmin, ymin, xmax, ymax], default value: [0, 0, 960, 500]
    };
    /**
     * Set text label's position to preventg overlap.
     * @param {d3Selection} text target text selection
     * @private
     */
    TextOverlap.prototype.preventLabelOverlap = function (text) {
        var _a = this.config, extent = _a.extent, area = _a.area;
        var points = text.data().map(function (v) { return [v.index, v.value]; });
        var voronoi = this.generateVoronoi(points);
        var i = 0;
        text.each(function () {
            var cell = voronoi.cellPolygon(i);
            if (cell && this) {
                var _a = points[i], x = _a[0], y = _a[1];
                // @ts-ignore wrong type definiton for d3PolygonCentroid
                var _b = polygonCentroid(cell), cx = _b[0], cy = _b[1];
                // @ts-ignore wrong type definiton for d3PolygonArea
                var polygonArea$1 = Math.abs(polygonArea(cell));
                var angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);
                var xTranslate = extent * (angle === 0 ? 1 : -1);
                var yTranslate = angle === -1 ? -extent : extent + 5;
                var txtAnchor = Math.abs(angle) === 1 ?
                    "middle" :
                    (angle === 0 ? "start" : "end");
                this.style.display = polygonArea$1 < area ? "none" : "";
                this.setAttribute("text-anchor", txtAnchor);
                this.setAttribute("dy", "0.".concat(angle === 1 ? 71 : 35, "em"));
                this.setAttribute("transform", "translate(".concat(xTranslate, ", ").concat(yTranslate, ")"));
            }
            i++;
        });
    };
    return TextOverlap;
}(Plugin));

export { TextOverlap as default };
