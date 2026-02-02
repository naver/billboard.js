/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.18.0-nightly-20260202005442
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { select } from 'd3-selection';

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
    })()});

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
     * Load plugin config from options
     * @private
     */
    Plugin.prototype.loadConfig = function () {
        loadConfig.call(this, this.options);
    };
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
    Plugin.version = "3.18.0-nightly-20260202005442";
    return Plugin;
}());

/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */
var BubbleCompare = /** @class */ (function (_super) {
    __extends(BubbleCompare, _super);
    function BubbleCompare(options) {
        var _this = _super.call(this, options) || this;
        return _this;
    }
    BubbleCompare.prototype.$init = function () {
        var $$ = this.$$;
        $$.findClosest = this.findClosest.bind(this);
        $$.getBubbleR = this.getBubbleR.bind(this);
        $$.pointExpandedR = this.pointExpandedR.bind(this);
    };
    BubbleCompare.prototype.pointExpandedR = function (d) {
        var baseR = this.getBubbleR(d);
        var _a = this.options.expandScale, expandScale = _a === void 0 ? 1 : _a;
        BubbleCompare.raiseFocusedBubbleLayer(d);
        this.changeCursorPoint();
        return baseR * expandScale;
    };
    BubbleCompare.raiseFocusedBubbleLayer = function (d) {
        d.raise && select(d.node().parentNode.parentNode).raise();
    };
    BubbleCompare.prototype.changeCursorPoint = function () {
        this.$$.$el.eventRect.style("cursor", "pointer");
    };
    BubbleCompare.prototype.findClosest = function (values, pos) {
        var _this = this;
        var $$ = this.$$;
        return values
            .filter(function (v) { return v && !$$.isBarType(v.id); })
            .reduce(function (acc, cur) {
            var d = $$.dist(cur, pos);
            return d < _this.getBubbleR(cur) ? cur : acc;
        }, 0);
    };
    BubbleCompare.prototype.getBubbleR = function (d) {
        var _this = this;
        var _a = this.options, minR = _a.minR, maxR = _a.maxR;
        var curVal = this.getZData(d);
        if (!curVal)
            return minR;
        var _b = this.$$.data.targets.reduce(function (_a, cur) {
            var accMin = _a[0], accMax = _a[1];
            var val = _this.getZData(cur.values[0]);
            return [Math.min(accMin, val), Math.max(accMax, val)];
        }, [10000, 0]), min = _b[0], max = _b[1];
        var size = min > 0 && max === min ? 0 : curVal / max;
        return Math.abs(size) * (maxR - minR) + minR;
    };
    BubbleCompare.prototype.getZData = function (d) {
        return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
    };
    BubbleCompare.version = "0.0.1";
    return BubbleCompare;
}(Plugin));

export { BubbleCompare as default };
