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
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Sparkline plugin option class
 * @class SparklineOptions
 * @param {Options} options Sparkline plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
var Options = /** @class */ (function () {
    function Options() {
        return {
            /**
             * Specify sparkline charts holder selector.
             * - **NOTE:** The amount of holder should match with the amount of data. If has less, will append necessaray amount nodes as sibling of main chart.
             * @name selector
             * @memberof plugin-sparkline
             * @type {string}
             * @default undefined
             * @example
             *   selector: ".sparkline"
             */
            selector: undefined
        };
    }
    return Options;
}());
var Options$1 = Options;

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
                target[key] = isArray(value) ?
                    value.concat() : value;
            }
        });
    }
    return mergeObj.apply(void 0, __spreadArray([target], objectN, false));
}
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
 * Sparkline plugin.<br>
 * Generates sparkline charts
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *
 * - **Bear in mind:**
 * - Use this plugin to visualize multiple tiny chart only and chart APIs won't work properly.
 * - Sparkline chart size will be based on the main chart element size. To control spakrline charts, is highly recommended to set `size` option.
 * - Bubble, scatter and Arc(pie, donut, ratdar) types aren't supported.
 * - Some options will be stricted to be:
 *   - `resize.auto = false`
 *   - `axis.x.show = false`
 *   - `axis.y.show = false`
 *   - `axis.y.padding = 10`
 *   - `legend.show = false`
 *
 * @class plugin-sparkline
 * @param {object} options sparkline plugin options
 * @augments Plugin
 * @returns {Sparkline}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-sparkline.js"></script>
 *
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        	new bb.plugin.sparkline({
 *        	  selector: ".sparkline"
 *        	}),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import Sparkline from "billboard.js/dist/billboardjs-plugin-sparkline";
 *
 * bb.generate({
 *     ...
 *     plugins: [
 *        new Sparkline({ ... })
 *     ]
 * })
 */
var Sparkline = /** @class */ (function (_super) {
    __extends(Sparkline, _super);
    function Sparkline(options) {
        var _this = _super.call(this, options) || this;
        _this.config = new Options$1();
        return _this;
    }
    Sparkline.prototype.$beforeInit = function () {
        loadConfig.call(this, this.options);
        this.validate();
        this.element = [].slice.call(document.querySelectorAll(this.config.selector));
        // override internal methods
        this.overrideInternals();
        // override options
        this.overrideOptions();
        // bind event handlers's context
        this.overHandler = this.overHandler.bind(this);
        this.moveHandler = this.moveHandler.bind(this);
        this.outHandler = this.outHandler.bind(this);
    };
    Sparkline.prototype.validate = function () {
        var _a = this, $$ = _a.$$, config = _a.config;
        var msg = "";
        if (!config.selector || !document.querySelector(config.selector)) {
            msg = "No holder elements found from given selector option.";
        }
        if ($$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType($$.data.targets)) {
            msg = "Contains non supported chart types.";
        }
        if (msg) {
            throw new Error("[Sparkline plugin] ".concat(msg));
        }
    };
    Sparkline.prototype.overrideInternals = function () {
        var $$ = this.$$;
        var getBarW = $$.getBarW, getIndices = $$.getIndices;
        // override internal methods to positioning bars
        $$.getIndices = function (indices, d, caller) {
            return caller === "getShapeX" ? {} : getIndices.call(this, indices, d);
        };
        $$.getBarW = function (type, axis) {
            return getBarW.call(this, type, axis, 1);
        };
    };
    Sparkline.prototype.overrideOptions = function () {
        var config = this.$$.config;
        config.legend_show = false;
        config.resize_auto = false;
        config.axis_x_show = false;
        // set default axes padding
        if (config.padding !== false) {
            var hasOption = function (o) { return Object.keys(o || {}).length > 0; };
            if (hasOption(config.axis_x_padding)) {
                config.axis_x_padding = {
                    left: 15,
                    right: 15,
                    unit: "px"
                };
            }
            if (hasOption(config.axis_y_padding)) {
                config.axis_y_padding = 5;
            }
        }
        config.axis_y_show = false;
        if (!config.tooltip_position) {
            config.tooltip_position = function (data, width, height) {
                var event = this.internal.state.event;
                var top = event.pageY - (height * 1.35);
                var left = event.pageX - (width / 2);
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }
                return { top: top, left: left };
            };
        }
    };
    Sparkline.prototype.$init = function () {
        var _a;
        var $el = this.$$.$el;
        // make disable-ish main chart element
        $el.chart
            .style("width", "0")
            .style("height", "0")
            .style("pointer-events", "none");
        ((_a = $el.tooltip) === null || _a === void 0 ? void 0 : _a.node()) && document.body.appendChild($el.tooltip.node());
    };
    Sparkline.prototype.$afterInit = function () {
        var $$ = this.$$;
        $$.$el.svg.attr("style", null)
            .style("width", "0")
            .style("height", "0");
        this.bindEvents(true);
    };
    /**
     * Bind tooltip event handlers for each sparkline elements.
     * @param {boolean} bind or unbind
     * @private
     */
    Sparkline.prototype.bindEvents = function (bind) {
        var _this = this;
        if (bind === void 0) { bind = true; }
        var config = this.$$.config;
        if (config.interaction_enabled && config.tooltip_show) {
            var method_1 = "".concat(bind ? "add" : "remove", "EventListener");
            this.element
                .forEach(function (el) {
                var svg = el.querySelector("svg");
                svg[method_1]("mouseover", _this.overHandler);
                svg[method_1]("mousemove", _this.moveHandler);
                svg[method_1]("mouseout", _this.outHandler);
            });
        }
    };
    Sparkline.prototype.overHandler = function (e) {
        var $$ = this.$$;
        var eventReceiver = $$.state.eventReceiver;
        eventReceiver.rect = e.target.getBoundingClientRect();
    };
    Sparkline.prototype.moveHandler = function (e) {
        var _a, _b, _c;
        var $$ = this.$$;
        var index = $$.getDataIndexFromEvent(e);
        var data = (_a = $$.api.data(e.target.__id)) === null || _a === void 0 ? void 0 : _a[0];
        var d = (_b = data === null || data === void 0 ? void 0 : data.values) === null || _b === void 0 ? void 0 : _b[index];
        if (d && !d.name) {
            d.name = d.id;
        }
        $$.state.event = e;
        if ($$.config.point_focus_only && d) {
            (_c = $$.showCircleFocus) === null || _c === void 0 ? void 0 : _c.call($$, [d]);
        }
        $$.setExpand(index, data.id, true);
        $$.showTooltip([d], e.target);
    };
    Sparkline.prototype.outHandler = function (e) {
        var $$ = this.$$;
        $$.state.event = e;
        $$.config.point_focus_only ?
            $$.hideCircleFocus() : $$.unexpandCircles();
        $$.hideTooltip();
    };
    Sparkline.prototype.$redraw = function () {
        var _a;
        var $$ = this.$$;
        var $el = $$.$el;
        var el = this.element;
        var data = $$.api.data();
        var svgWrapper = (_a = $el.chart.html().match(/<svg[^>]*>/)) === null || _a === void 0 ? void 0 : _a[0];
        // append sparkline holder if is less than the data length
        if (el.length < data.length) {
            var chart = $el.chart.node();
            for (var i = data.length - el.length; i > 0; i--) {
                chart.parentNode.insertBefore(el[0].cloneNode(), chart.nextSibling);
            }
            this.element = document.querySelectorAll(this.config.selector);
            el = this.element;
        }
        data.map(function (v) { return v.id; })
            .forEach(function (id, i) {
            var selector = ".".concat($COMMON.target, "-").concat(id);
            var shape = $el.main.selectAll(selector);
            var svg = el[i].querySelector("svg");
            if (!svg) {
                el[i].innerHTML = "".concat(svgWrapper, "</svg>");
                svg = el[i].querySelector("svg");
                svg.__id = id;
            }
            if (!svg.querySelector(selector)) {
                shape.style("opacity", null);
            }
            shape
                .style("fill", "none")
                .style("opacity", null);
            svg.innerHTML = "";
            svg.appendChild(shape.node());
        });
    };
    Sparkline.prototype.$willDestroy = function () {
        this.bindEvents(false);
        this.element
            .forEach(function (el) {
            el.innerHTML = "";
        });
    };
    Sparkline.version = "0.0.1";
    return Sparkline;
}(Plugin$1));

export { Sparkline as default };
