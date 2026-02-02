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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * HTML/SVG Sanitization module
 * Pure whitelist approach - only explicitly allowed tags, attributes, and protocols pass through
 */
// Whitelist of allowed HTML/SVG tags
var ALLOWED_TAGS = new Set([
    // HTML tags for tooltip/legend templates
    "span",
    "div",
    "p",
    "br",
    "b",
    "i",
    "em",
    "strong",
    "u",
    "s",
    "sub",
    "sup",
    "ul",
    "ol",
    "li",
    "dl",
    "dt",
    "dd",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "caption",
    "colgroup",
    "col",
    "hr",
    "pre",
    "code",
    "blockquote",
    "a",
    "img",
    // SVG tags for point patterns
    "svg",
    "g",
    "path",
    "circle",
    "ellipse",
    "rect",
    "line",
    "polyline",
    "polygon",
    "text",
    "tspan",
    "textPath",
    "use",
    "defs",
    "symbol",
    "clipPath",
    "mask",
    "linearGradient",
    "radialGradient",
    "stop",
    "pattern",
    "marker",
    "title",
    "desc"
]);
// Whitelist of allowed attributes
var ALLOWED_ATTRS = new Set([
    // Common attributes
    "class",
    "id",
    "style",
    "title",
    "lang",
    "dir",
    // HTML specific
    "href",
    "src",
    "alt",
    "width",
    "height",
    "colspan",
    "rowspan",
    "scope",
    "headers",
    // SVG presentation attributes
    "d",
    "points",
    "x",
    "y",
    "x1",
    "x2",
    "y1",
    "y2",
    "cx",
    "cy",
    "r",
    "rx",
    "ry",
    "dx",
    "dy",
    "viewBox",
    "preserveAspectRatio",
    "transform",
    "fill",
    "fill-opacity",
    "fill-rule",
    "stroke",
    "stroke-width",
    "stroke-opacity",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-dasharray",
    "stroke-dashoffset",
    "opacity",
    "clip-path",
    "clip-rule",
    "mask",
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "text-anchor",
    "dominant-baseline",
    "offset",
    "stop-color",
    "stop-opacity",
    "gradientUnits",
    "gradientTransform",
    "spreadMethod",
    "patternUnits",
    "patternTransform",
    "marker-start",
    "marker-mid",
    "marker-end",
    "markerWidth",
    "markerHeight",
    "refX",
    "refY",
    "xlink:href"
]);
// Whitelist of allowed URI protocols
var ALLOWED_URI_PROTOCOLS = new Set([
    "http:",
    "https:",
    "mailto:"
]);
// Attributes that contain URIs
var URI_ATTRS = new Set(["href", "src", "xlink:href"]);
// Pre-compiled regex patterns for performance
var TAG_NAME_REGEX = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/;
var CLOSING_TAG_REGEX = /^<\/([a-zA-Z][a-zA-Z0-9]*)\s*>$/;
var OPENING_TAG_REGEX = /^<([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(\/?)>$/;
var ATTR_REGEX = /([a-zA-Z][\w:-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
var URL_IN_STYLE_REGEX = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi;
// Dangerous CSS patterns
var DANGEROUS_CSS_PATTERNS = [
    "expression(",
    "behavior:",
    "binding:",
    "@import",
    "@charset",
    "-moz-binding:"
];
/**
 * Decode HTML entities in a string
 * @param {string} str String with potential HTML entities
 * @returns {string} Decoded string
 * @private
 */
function decodeHTMLEntities(str) {
    return str
        // Named entities
        .replace(/&colon;/gi, ":")
        .replace(/&newline;/gi, "\n")
        .replace(/&tab;/gi, "\t")
        .replace(/&nbsp;/gi, " ")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, "\"")
        .replace(/&apos;/gi, "'")
        // Numeric entities (decimal)
        .replace(/&#(\d+);/gi, function (_, code) { return String.fromCharCode(parseInt(code, 10)); })
        // Numeric entities (hex)
        .replace(/&#x([0-9a-f]+);/gi, function (_, code) { return String.fromCharCode(parseInt(code, 16)); });
}
/**
 * Check if a URI is safe (whitelist approach)
 * @param {string} uri URI to check
 * @returns {boolean} Whether the URI is safe
 * @private
 */
function isSafeURI(uri) {
    // Decode HTML entities first to prevent bypass
    var decoded = decodeHTMLEntities(uri).trim();
    // Remove any whitespace/control characters that could be used for bypass
    // eslint-disable-next-line no-control-regex
    var normalized = decoded.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
    // Empty or fragment-only URIs are safe
    if (!normalized || normalized.startsWith("#")) {
        return true;
    }
    // Relative paths are safe
    if (normalized.startsWith("/") ||
        normalized.startsWith("./") ||
        normalized.startsWith("../") ||
        !normalized.includes(":")) {
        return true;
    }
    // Check if protocol is in whitelist
    var colonIndex = normalized.indexOf(":");
    if (colonIndex > 0) {
        var protocol = normalized.substring(0, colonIndex + 1);
        return ALLOWED_URI_PROTOCOLS.has(protocol);
    }
    return false;
}
/**
 * Check if a style value is safe (whitelist approach)
 * @param {string} style Style attribute value
 * @returns {string|null} Sanitized style or null if unsafe
 * @private
 */
function sanitizeStyleValue(style) {
    // Decode HTML entities first
    var decoded = decodeHTMLEntities(style);
    // Remove any control characters
    // eslint-disable-next-line no-control-regex
    var cleaned = decoded.replace(/[\u0000-\u001f]/g, "");
    // Check for url() - only allow safe URIs inside
    URL_IN_STYLE_REGEX.lastIndex = 0;
    var match;
    while ((match = URL_IN_STYLE_REGEX.exec(cleaned)) !== null) {
        if (!isSafeURI(match[1])) {
            return null;
        }
    }
    // Check for dangerous CSS patterns (expression, behavior, etc.)
    var normalizedLower = cleaned.toLowerCase().replace(/\s/g, "");
    for (var _i = 0, DANGEROUS_CSS_PATTERNS_1 = DANGEROUS_CSS_PATTERNS; _i < DANGEROUS_CSS_PATTERNS_1.length; _i++) {
        var pattern = DANGEROUS_CSS_PATTERNS_1[_i];
        if (normalizedLower.includes(pattern)) {
            return null;
        }
    }
    return style;
}
// Lookup table for encoding dangerous characters in attribute values
var ATTR_ENCODE_MAP = {
    "\"": "&quot;",
    "'": "&#39;",
    "`": "&#96;"
};
var ATTR_ENCODE_REGEX = /["'`]/g;
/**
 * Encode dangerous characters in attribute values to HTML entities
 * This prevents attribute injection attacks where quotes/backticks break out of the attribute context
 * @param {string} value Attribute value
 * @returns {string} Encoded value
 * @private
 */
function encodeAttrValue(value) {
    return value.replace(ATTR_ENCODE_REGEX, function (char) { return ATTR_ENCODE_MAP[char]; });
}
/**
 * Sanitize attribute value using whitelist approach
 * @param {string} name Attribute name
 * @param {string} value Attribute value
 * @param {boolean} wasUnquoted Whether the value was originally unquoted
 * @returns {string|null} Sanitized value if safe, null if should be removed
 * @private
 */
function sanitizeAttrValue(name, value, wasUnquoted) {
    if (wasUnquoted === void 0) { wasUnquoted = false; }
    // Check URI attributes with whitelist
    if (URI_ATTRS.has(name)) {
        if (!isSafeURI(value)) {
            return null;
        }
        // Encode dangerous characters in URI values to prevent attribute injection
        return wasUnquoted ? encodeAttrValue(value) : value;
    }
    // Check style attribute
    if (name === "style") {
        var sanitizedStyle = sanitizeStyleValue(value);
        if (sanitizedStyle === null) {
            return null;
        }
        // Encode dangerous characters in style values
        return wasUnquoted ? encodeAttrValue(sanitizedStyle) : sanitizedStyle;
    }
    // For other attributes, check for embedded event handlers
    var decoded = decodeHTMLEntities(value).toLowerCase().replace(/\s/g, "");
    if (/\bon\w+=/.test(decoded)) {
        return null;
    }
    // Encode dangerous characters to prevent attribute injection
    return wasUnquoted ? encodeAttrValue(value) : value;
}
/**
 * Extract tag name from a tag string
 * Returns null if not a valid tag format
 * @param {string} tag Tag string starting with <
 * @returns {string|null} Lowercase tag name or null
 * @private
 */
function extractTagName(tag) {
    // Must start with < followed immediately by letter (no spaces allowed)
    var match = tag.match(TAG_NAME_REGEX);
    return match ? match[1].toLowerCase() : null;
}
/**
 * Check if a tag is in the whitelist
 * @param {string} tag Tag string
 * @returns {boolean} Whether tag is allowed
 * @private
 */
function isAllowedTag(tag) {
    var tagName = extractTagName(tag);
    return tagName !== null && ALLOWED_TAGS.has(tagName);
}
/**
 * Sanitize a single HTML/SVG tag (only called for allowed tags)
 * @param {string} fullTag The full tag string including < and >
 * @returns {string} Sanitized tag
 * @private
 */
function sanitizeTag(fullTag) {
    // Closing tag
    var closingMatch = fullTag.match(CLOSING_TAG_REGEX);
    if (closingMatch) {
        return "</".concat(closingMatch[1].toLowerCase(), ">");
    }
    // Opening tag
    var openingMatch = fullTag.match(OPENING_TAG_REGEX);
    if (!openingMatch) {
        return "";
    }
    var tagName = openingMatch[1], attrString = openingMatch[2], selfClose = openingMatch[3];
    var lowerTagName = tagName.toLowerCase();
    // Parse and filter attributes, preserving original quote style
    var allowedAttrs = [];
    ATTR_REGEX.lastIndex = 0;
    var attrMatch;
    while ((attrMatch = ATTR_REGEX.exec(attrString)) !== null) {
        var attrName = attrMatch[1].toLowerCase();
        var doubleQuotedValue = attrMatch[2];
        var singleQuotedValue = attrMatch[3];
        var unquotedValue = attrMatch[4];
        // Skip event handlers (on*)
        if (attrName.startsWith("on")) {
            continue;
        }
        // Determine original quote style and value
        var attrValue = void 0;
        var quoteChar = void 0;
        if (doubleQuotedValue !== undefined) {
            attrValue = doubleQuotedValue;
            quoteChar = "\"";
        }
        else if (singleQuotedValue !== undefined) {
            attrValue = singleQuotedValue;
            quoteChar = "'";
        }
        else if (unquotedValue !== undefined) {
            attrValue = unquotedValue;
            quoteChar = "\"";
        }
        else {
            // Boolean attribute (no value)
            if (ALLOWED_ATTRS.has(attrName)) {
                allowedAttrs.push(attrName);
            }
            continue;
        }
        if (ALLOWED_ATTRS.has(attrName)) {
            var wasUnquoted = unquotedValue !== undefined;
            var sanitizedValue = sanitizeAttrValue(attrName, attrValue, wasUnquoted);
            if (sanitizedValue !== null) {
                allowedAttrs.push("".concat(attrName, "=").concat(quoteChar).concat(sanitizedValue).concat(quoteChar));
            }
        }
    }
    var attrsStr = allowedAttrs.length > 0 ? " ".concat(allowedAttrs.join(" ")) : "";
    var selfCloseStr = selfClose ? "/>" : ">";
    return "<".concat(lowerTagName).concat(attrsStr).concat(selfCloseStr);
}
/**
 * Sanitize HTML string to prevent XSS attacks
 * Pure whitelist approach - allowed tags are sanitized, others are escaped
 * @param {string} str Target string value
 * @returns {string} Sanitized string with only allowed elements
 * @private
 */
function sanitize(str) {
    if (typeof str !== "string" || !str || str.indexOf("<") === -1) {
        return str;
    }
    // Single pass: sanitize allowed tags, escape disallowed ones
    // Also match orphaned fragments like "ipt>" from broken tags
    return str.replace(/<\/?[^>]*>|[^<>\s]+>/g, function (match) {
        // Remove HTML comments
        if (match.startsWith("<!--")) {
            return "";
        }
        // Orphaned fragment (e.g., "ipt>") → escape '>'
        if (!match.startsWith("<")) {
            return match.slice(0, -1) + "&gt;";
        }
        // Allowed tag → sanitize attributes
        if (isAllowedTag(match)) {
            return sanitizeTag(match);
        }
        // Disallowed tag → escape all '<' to prevent execution
        return match.replace(/</g, "&lt;");
    });
}

var isNumber = function (v) { return typeof v === "number"; };
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
    return sanitize(res);
}

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
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Constants values for plugin option
 * @ignore
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
             * @type {function}
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
            updateOnToggle: true,
            /**
             * Set how null value to be shown.
             * @name nullString
             * @memberof plugin-tableview
             * @type {string}
             * @default "-"
             * @example
             *   nullString: "N/A"
             */
            nullString: "-"
        };
    }
    return Options;
}());

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
 *          updateOnToggle: false,
 *          nullString: "N/A"
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
        _this.config = new Options();
        return _this;
    }
    TableView.prototype.$beforeInit = function () {
        this.loadConfig();
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
            tbody += "<tr>".concat(v.map(function (d, i) {
                return tplProcess(i ? tpl.tbody : tpl.tbodyHeader, {
                    value: i === 0 ?
                        config.categoryFormat.bind(_this)(d) :
                        (isNumber(d) ? d.toLocaleString() : config.nullString)
                });
            }).join(""), "</tr>");
        });
        element.innerHTML = tplProcess(tpl.body, __assign(__assign({}, config), { title: config.title || $$.config.title_text || "", thead: thead, tbody: tbody }));
    };
    TableView.prototype.$redraw = function () {
        var state = this.$$.state;
        var doNotUpdate = state.resizing || (!this.config.updateOnToggle && state.toggling);
        !doNotUpdate && this.generateTable();
    };
    TableView.prototype.$willDestroy = function () {
        var _a, _b;
        (_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.element);
        // remove default css style when left one chart instance
        if (this.$$.charts.length === 1) {
            var s = document.getElementById(defaultStyle.id);
            (_b = s === null || s === void 0 ? void 0 : s.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(s);
        }
    };
    return TableView;
}(Plugin));

export { TableView as default };
