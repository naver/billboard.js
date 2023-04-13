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
 * TableView plugin option class
 * @class TableviewOptions
 * @param {Options} options TableView plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
var Options = /** @class */ (function () {
    function Options() {
        return {
            /**
             * Set tableview holder selector.
             * - **NOTE:** If not set, will append new holder element dynamically right after chart element.
             * @name selector
             * @memberof plugin-tableview
             * @type {string}
             * @default undefined
             * @example
             *   selector: "#table-holder"
             */
            selector: undefined,
            /**
             * Set category title text
             * @name categoryTitle
             * @memberof plugin-tableview
             * @type {string}
             * @default "Category"
             * @example
             *   categoryTitle: "#table-holder"
             */
            categoryTitle: "Category",
            /**
             * Set category text format function.
             * @name categoryFormat
             * @memberof plugin-tableview
             * @type {Function}
             * @returns {string}
             * @default function(v) { // will return formatted value according x Axis type }}
             * @example
             *   categoryFormat: "#table-holder"
             */
            categoryFormat: function (v) {
                var category = v;
                if (this.$$.axis.isCategorized()) {
                    category = this.$$.categoryName(v);
                }
                else if (this.$$.axis.isTimeSeries()) {
                    category = v.toLocaleDateString();
                }
                return category;
            },
            /**
             * Set tableview holder class name.
             * @name class
             * @memberof plugin-tableview
             * @type {string}
             * @default undefined
             * @example
             *   class: "table-class-name"
             */
            class: undefined,
            /**
             * Set to apply default style(`.bb-tableview`) to tableview element.
             * @name style
             * @memberof plugin-tableview
             * @type {boolean}
             * @default true
             * @example
             *   style: false
             */
            style: true,
            /**
             * Set tableview title text.
             * - **NOTE:** If set [title.text](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.title), will be used when this option value is empty.
             * @name title
             * @memberof plugin-tableview
             * @type {string}
             * @default undefined
             * @example
             *   title: "Table Title Text"
             */
            title: undefined,
            /**
             * Update tableview from data visibility update(ex. legend toggle).
             * @name updateOnToggle
             * @memberof plugin-tableview
             * @type {boolean}
             * @default true
             * @example
             *   legendToggleUpdate: false
             */
            updateOnToggle: true
        };
    }
    return Options;
}());
var Options$1 = Options;

/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var defaultStyle = {
    id: "__tableview-style__",
    class: "bb-tableview",
    rule: ".bb-tableview {\n\t\tborder-collapse:collapse;\n\t\tborder-spacing:0;\n\t\tbackground:#fff;\n\t\tmin-width:100%;\n\t\tmargin-top:10px;\n\t\tfont-family:sans-serif;\n\t\tfont-size:.9em;\n\t}\n\t.bb-tableview tr:hover {\n\t\tbackground:#eef7ff;\n\t}\n\t.bb-tableview thead tr {\n\t\tbackground:#f8f8f8;\n\t}\n\t.bb-tableview caption,.bb-tableview td,.bb-tableview th {\n\t\ttext-align: center;\n\t\tborder:1px solid silver;\n\t\tpadding:.5em;\n\t}\n\t.bb-tableview caption {\n\t\tfont-size:1.1em;\n\t\tfont-weight:700;\n\t\tmargin-bottom: -1px;\n\t}"
};
// template
var tpl = {
    body: "<caption>{=title}</caption>\n\t\t<thead><tr>{=thead}</tr></thead>\n\t\t<tbody>{=tbody}</tbody>",
    thead: "<th scope=\"col\">{=title}</th>",
    tbodyHeader: "<th scope=\"row\">{=value}</th>",
    tbody: "<td>{=value}</td>"
};

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

var isNumber = function (v) { return typeof v === "number"; };
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
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
    var res = tpl;
    for (var x in data) {
        res = res.replace(new RegExp("{=".concat(x, "}"), "g"), data[x]);
    }
    return res;
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
 * Table view plugin.<br>
 * Generates table view for bound dataset.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * @class plugin-tableview
 * @param {object} options table view plugin options
 * @augments Plugin
 * @returns {TableView}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-tableview.js"></script>
 *
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        new bb.plugin.tableview({
 *          selector: "#my-table-view",
 *          categoryTitle: "Category",
 *          categoryFormat: function(v) {
 *              // do some transformation
 *              ...
 *              return v;
 *          },
 *          class: "my-class-name",
 *          style: true,
 *          title: "My Data List",
 *          updateOnToggle: false
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import TableView from "billboard.js/dist/billboardjs-plugin-tableview";
 *
 * bb.generate({
 *     ...
 *     plugins: [
 *        new TableView({ ... })
 *     ]
 * })
 */
var TableView = /** @class */ (function (_super) {
    __extends(TableView, _super);
    function TableView(options) {
        var _this = _super.call(this, options) || this;
        _this.config = new Options$1();
        return _this;
    }
    TableView.prototype.$beforeInit = function () {
        loadConfig.call(this, this.options);
    };
    TableView.prototype.$init = function () {
        var _a;
        var _b = this.config, className = _b.class, selector = _b.selector, style = _b.style;
        var element = document.querySelector(selector || ".".concat(className || defaultStyle.class));
        if (!element) {
            var chart = this.$$.$el.chart.node();
            element = document.createElement("table");
            chart.parentNode.insertBefore(element, chart.nextSibling);
        }
        if (element.tagName !== "TABLE") {
            var table = document.createElement("table");
            element.appendChild(table);
            element = table;
        }
        // append default css style
        if (style && !document.getElementById(defaultStyle.id)) {
            var s = document.createElement("style");
            s.id = defaultStyle.id;
            s.innerHTML = defaultStyle.rule;
            (document.head || document.getElementsByTagName("head")[0])
                .appendChild(s);
        }
        (_a = element.classList).add.apply(_a, [style && defaultStyle.class, className].filter(Boolean));
        this.element = element;
    };
    /**
     * Generate table
     * @private
     */
    TableView.prototype.generateTable = function () {
        var _this = this;
        var _a = this, $$ = _a.$$, config = _a.config, element = _a.element;
        var dataToShow = $$.filterTargetsToShow($$.data.targets);
        var thead = tplProcess(tpl.thead, {
            title: dataToShow.length ? this.config.categoryTitle : ""
        });
        var tbody = "";
        var rows = [];
        dataToShow.forEach(function (v) {
            thead += tplProcess(tpl.thead, { title: v.id });
            // make up value rows
            v.values.forEach(function (d, i) {
                if (!rows[i]) {
                    rows[i] = [d.x];
                }
                rows[i].push(d.value);
            });
        });
        rows.forEach(function (v) {
            tbody += "<tr>".concat(v.map(function (d, i) { return tplProcess(i ? tpl.tbody : tpl.tbodyHeader, {
                value: i === 0 ?
                    config.categoryFormat.bind(_this)(d) :
                    (isNumber(d) ? d.toLocaleString() : "")
            }); }).join(""), "</tr>");
        });
        var rx = /<[^>]+><\/[^>]+>/g;
        var r = tplProcess(tpl.body, _assign(_assign({}, config), { title: config.title || $$.config.title_text || "", thead: thead, tbody: tbody })).replace(rx, "");
        element.innerHTML = r;
    };
    TableView.prototype.$redraw = function () {
        var state = this.$$.state;
        var doNotUpdate = state.resizing || (!this.config.updateOnToggle && state.toggling);
        !doNotUpdate && this.generateTable();
    };
    TableView.prototype.$willDestroy = function () {
        var _a;
        this.element.parentNode.removeChild(this.element);
        // remove default css style when left one chart instance
        if (this.$$.charts.length === 1) {
            var s = document.getElementById(defaultStyle.id);
            (_a = s === null || s === void 0 ? void 0 : s.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(s);
        }
    };
    return TableView;
}(Plugin$1));

export { TableView as default };
