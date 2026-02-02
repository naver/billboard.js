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
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-brush"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection", "d3-brush"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"), require("d3-brush"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ BubbleCompare; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(2);
;// ./src/module/browser.ts
function getGlobal() {
  return typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof global === "object" && global !== null && global.Object === Object && global || typeof self === "object" && self !== null && self.Object === Object && self || Function("return this")();
}
function getFallback(w) {
  const hasRAF = typeof (w == null ? void 0 : w.requestAnimationFrame) === "function" && typeof (w == null ? void 0 : w.cancelAnimationFrame) === "function";
  const hasRIC = typeof (w == null ? void 0 : w.requestIdleCallback) === "function" && typeof (w == null ? void 0 : w.cancelIdleCallback) === "function";
  const request = (cb) => setTimeout(cb, 1);
  const cancel = (id) => clearTimeout(id);
  return [
    hasRAF ? w.requestAnimationFrame : request,
    hasRAF ? w.cancelAnimationFrame : cancel,
    hasRIC ? w.requestIdleCallback : request,
    hasRIC ? w.cancelIdleCallback : cancel
  ];
}
const win = getGlobal();
const doc = win == null ? void 0 : win.document;
const [
  requestAnimationFrame,
  cancelAnimationFrame,
  requestIdleCallback,
  cancelIdleCallback
] = getFallback(win);


;// ./src/module/sanitize.ts
const ALLOWED_TAGS = /* @__PURE__ */ new Set([
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
const ALLOWED_ATTRS = /* @__PURE__ */ new Set([
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
const ALLOWED_URI_PROTOCOLS = /* @__PURE__ */ new Set([
  "http:",
  "https:",
  "mailto:"
]);
const URI_ATTRS = /* @__PURE__ */ new Set(["href", "src", "xlink:href"]);
const TAG_NAME_REGEX = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/;
const CLOSING_TAG_REGEX = /^<\/([a-zA-Z][a-zA-Z0-9]*)\s*>$/;
const OPENING_TAG_REGEX = /^<([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(\/?)>$/;
const ATTR_REGEX = /([a-zA-Z][\w:-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
const URL_IN_STYLE_REGEX = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi;
const DANGEROUS_CSS_PATTERNS = [
  "expression(",
  "behavior:",
  "binding:",
  "@import",
  "@charset",
  "-moz-binding:"
];
function decodeHTMLEntities(str) {
  return str.replace(/&colon;/gi, ":").replace(/&newline;/gi, "\n").replace(/&tab;/gi, "	").replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&apos;/gi, "'").replace(/&#(\d+);/gi, (_, code) => String.fromCharCode(parseInt(code, 10))).replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}
function isSafeURI(uri) {
  const decoded = decodeHTMLEntities(uri).trim();
  const normalized = decoded.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
  if (!normalized || normalized.startsWith("#")) {
    return true;
  }
  if (normalized.startsWith("/") || normalized.startsWith("./") || normalized.startsWith("../") || !normalized.includes(":")) {
    return true;
  }
  const colonIndex = normalized.indexOf(":");
  if (colonIndex > 0) {
    const protocol = normalized.substring(0, colonIndex + 1);
    return ALLOWED_URI_PROTOCOLS.has(protocol);
  }
  return false;
}
function sanitizeStyleValue(style) {
  const decoded = decodeHTMLEntities(style);
  const cleaned = decoded.replace(/[\u0000-\u001f]/g, "");
  URL_IN_STYLE_REGEX.lastIndex = 0;
  let match;
  while ((match = URL_IN_STYLE_REGEX.exec(cleaned)) !== null) {
    if (!isSafeURI(match[1])) {
      return null;
    }
  }
  const normalizedLower = cleaned.toLowerCase().replace(/\s/g, "");
  for (const pattern of DANGEROUS_CSS_PATTERNS) {
    if (normalizedLower.includes(pattern)) {
      return null;
    }
  }
  return style;
}
const ATTR_ENCODE_MAP = {
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;"
};
const ATTR_ENCODE_REGEX = /["'`]/g;
function encodeAttrValue(value) {
  return value.replace(ATTR_ENCODE_REGEX, (char) => ATTR_ENCODE_MAP[char]);
}
function sanitizeAttrValue(name, value, wasUnquoted = false) {
  if (URI_ATTRS.has(name)) {
    if (!isSafeURI(value)) {
      return null;
    }
    return wasUnquoted ? encodeAttrValue(value) : value;
  }
  if (name === "style") {
    const sanitizedStyle = sanitizeStyleValue(value);
    if (sanitizedStyle === null) {
      return null;
    }
    return wasUnquoted ? encodeAttrValue(sanitizedStyle) : sanitizedStyle;
  }
  const decoded = decodeHTMLEntities(value).toLowerCase().replace(/\s/g, "");
  if (/\bon\w+=/.test(decoded)) {
    return null;
  }
  return wasUnquoted ? encodeAttrValue(value) : value;
}
function extractTagName(tag) {
  const match = tag.match(TAG_NAME_REGEX);
  return match ? match[1].toLowerCase() : null;
}
function isAllowedTag(tag) {
  const tagName = extractTagName(tag);
  return tagName !== null && ALLOWED_TAGS.has(tagName);
}
function sanitizeTag(fullTag) {
  const closingMatch = fullTag.match(CLOSING_TAG_REGEX);
  if (closingMatch) {
    return `</${closingMatch[1].toLowerCase()}>`;
  }
  const openingMatch = fullTag.match(OPENING_TAG_REGEX);
  if (!openingMatch) {
    return "";
  }
  const [, tagName, attrString, selfClose] = openingMatch;
  const lowerTagName = tagName.toLowerCase();
  const allowedAttrs = [];
  ATTR_REGEX.lastIndex = 0;
  let attrMatch;
  while ((attrMatch = ATTR_REGEX.exec(attrString)) !== null) {
    const attrName = attrMatch[1].toLowerCase();
    const doubleQuotedValue = attrMatch[2];
    const singleQuotedValue = attrMatch[3];
    const unquotedValue = attrMatch[4];
    if (attrName.startsWith("on")) {
      continue;
    }
    let attrValue;
    let quoteChar;
    if (doubleQuotedValue !== void 0) {
      attrValue = doubleQuotedValue;
      quoteChar = '"';
    } else if (singleQuotedValue !== void 0) {
      attrValue = singleQuotedValue;
      quoteChar = "'";
    } else if (unquotedValue !== void 0) {
      attrValue = unquotedValue;
      quoteChar = '"';
    } else {
      if (ALLOWED_ATTRS.has(attrName)) {
        allowedAttrs.push(attrName);
      }
      continue;
    }
    if (ALLOWED_ATTRS.has(attrName)) {
      const wasUnquoted = unquotedValue !== void 0;
      const sanitizedValue = sanitizeAttrValue(attrName, attrValue, wasUnquoted);
      if (sanitizedValue !== null) {
        allowedAttrs.push(`${attrName}=${quoteChar}${sanitizedValue}${quoteChar}`);
      }
    }
  }
  const attrsStr = allowedAttrs.length > 0 ? ` ${allowedAttrs.join(" ")}` : "";
  const selfCloseStr = selfClose ? "/>" : ">";
  return `<${lowerTagName}${attrsStr}${selfCloseStr}`;
}
function sanitize(str) {
  if (typeof str !== "string" || !str || str.indexOf("<") === -1) {
    return str;
  }
  return str.replace(
    /<\/?[^>]*>|[^<>\s]+>/g,
    (match) => {
      if (match.startsWith("<!--")) {
        return "";
      }
      if (!match.startsWith("<")) {
        return match.slice(0, -1) + "&gt;";
      }
      if (isAllowedTag(match)) {
        return sanitizeTag(match);
      }
      return match.replace(/</g, "&lt;");
    }
  );
}

;// ./src/module/util.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};




function _getRect(relativeViewport, node, forceEval = false) {
  const _ = (n) => n[relativeViewport ? "getBoundingClientRect" : "getBBox"]();
  if (forceEval) {
    return _(node);
  } else {
    const needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +(node.getAttribute("width") || 0);
    return needEvaluate ? node.rect = _(node) : node.rect;
  }
}
function _forEachValidItem(items, callback) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item) {
      callback(item, i);
    }
  }
}
const isValue = (v) => v || v === 0;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const ceil10 = (v) => Math.ceil(v / 10) * 10;
const asHalfPixel = (n) => Math.ceil(n) + 0.5;
const diffDomain = (d) => d[1] - d[0];
const isObjectType = (v) => typeof v === "object";
const isEmptyObject = (obj) => {
  for (const x in obj) {
    return false;
  }
  return true;
};
const isEmpty = (o) => isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && isEmptyObject(o) || isNumber(o) && isNaN(o);
const notEmpty = (o) => !isEmpty(o);
const isArray = (arr) => Array.isArray(arr);
const isObject = (obj) => obj && !(obj == null ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj);
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
function hasValue(dict, value) {
  let found = false;
  Object.keys(dict).forEach((key) => dict[key] === value && (found = true));
  return found;
}
function callFn(fn, thisArg, ...args) {
  const isFn = isFunction(fn);
  isFn && fn.call(thisArg, ...args);
  return isFn;
}
function endall(transition, cb) {
  let n = 0;
  const end = function(...args) {
    !--n && cb.apply(this, ...args);
  };
  if ("duration" in transition) {
    transition.each(() => ++n).on("end", end);
  } else {
    ++n;
    transition.call(end);
  }
}
function setTextValue(node, text, dy = [-1, 1], toMiddle = false) {
  if (!node || !isString(text)) {
    return;
  }
  if (text.indexOf("\n") === -1) {
    node.text(text);
  } else {
    const diff = [node.text(), text].map((v) => v.replace(/[\s\n]/g, ""));
    if (diff[0] !== diff[1]) {
      const multiline = text.split("\n");
      const len = toMiddle ? multiline.length - 1 : 1;
      node.html("");
      multiline.forEach((v, i) => {
        node.append("tspan").attr("x", 0).attr("dy", `${i === 0 ? dy[0] * len : dy[1]}em`).text(v);
      });
    }
  }
}
function getRectSegList(path) {
  const { x, y, width, height } = path.getBBox();
  return [
    { x, y: y + height },
    // seg0
    { x, y },
    // seg1
    { x: x + width, y },
    // seg2
    { x: x + width, y: y + height }
    // seg3
  ];
}
function getPathBox(path) {
  const { width, height } = getBoundingRect(path);
  const items = getRectSegList(path);
  const x = items[0].x;
  const y = Math.min(items[0].y, items[1].y);
  return {
    x,
    y,
    width,
    height
  };
}
function getPointer(event, element) {
  var _a;
  const touches = event && ((_a = event.touches || event.sourceEvent && event.sourceEvent.touches) == null ? void 0 : _a[0]);
  let pointer = [0, 0];
  try {
    pointer = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.pointer)(touches || event, element);
  } catch (e) {
  }
  return pointer.map((v) => isNaN(v) ? 0 : v);
}
function getBrushSelection(ctx) {
  const { event, $el } = ctx;
  const main = $el.subchart.main || $el.main;
  let selection;
  if (event && event.type === "brush") {
    selection = event.selection;
  } else if (main && (selection = main.select(".bb-brush").node())) {
    selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection);
  }
  return selection;
}
function getBoundingRect(node, forceEval = false) {
  return _getRect(true, node, forceEval);
}
function getBBox(node, forceEval = false) {
  return _getRect(false, node, forceEval);
}
function getRandom(asStr = true, min = 0, max = 1e4) {
  const crpt = win.crypto || win.msCrypto;
  const rand = crpt ? min + crpt.getRandomValues(new Uint32Array(1))[0] % (max - min + 1) : Math.floor(Math.random() * (max - min) + min);
  return asStr ? String(rand) : rand;
}
function findIndex(arr, v, start, end, isRotated) {
  if (start > end) {
    return -1;
  }
  const mid = Math.floor((start + end) / 2);
  let { x, w = 0 } = arr[mid];
  if (isRotated) {
    x = arr[mid].y;
    w = arr[mid].h;
  }
  if (v >= x && v <= x + w) {
    return mid;
  }
  return v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
function brushEmpty(ctx) {
  const selection = getBrushSelection(ctx);
  if (selection) {
    return selection[0] === selection[1];
  }
  return true;
}
function deepClone(...objectN) {
  const clone = (v) => {
    if (isObject(v) && v.constructor) {
      const r = new v.constructor();
      for (const k in v) {
        r[k] = clone(v[k]);
      }
      return r;
    }
    return v;
  };
  return objectN.map((v) => clone(v)).reduce((a, c) => __spreadValues(__spreadValues({}, a), c));
}
function extend(target = {}, source) {
  if (isArray(source)) {
    source.forEach((v) => extend(target, v));
  }
  for (const p in source) {
    if (/^\d+$/.test(p) || p in target) {
      continue;
    }
    target[p] = source[p];
  }
  return target;
}
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function camelize(str, separator = "-") {
  return str.split(separator).map((v, i) => i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()).join("");
}
const toArray = (v) => [].slice.call(v);
function addCssRules(style, selector, prop) {
  const { rootSelector = "", sheet } = style;
  const getSelector = (s) => s.replace(/\s?(bb-)/g, ".$1").replace(/\.+/g, ".");
  const rule = `${rootSelector} ${getSelector(selector)} {${prop.join(";")}}`;
  return sheet[sheet.insertRule ? "insertRule" : "addRule"](
    rule,
    sheet.cssRules.length
  );
}
function getCssRules(styleSheets) {
  let rules = [];
  styleSheets.forEach((sheet) => {
    var _a;
    try {
      if (sheet.cssRules && sheet.cssRules.length) {
        rules = rules.concat(toArray(sheet.cssRules));
      }
    } catch (e) {
      (_a = win.console) == null ? void 0 : _a.warn(`Error while reading rules from ${sheet.href}: ${e.toString()}`);
    }
  });
  return rules;
}
function getScrollPosition(node) {
  var _a, _b, _c, _d, _e, _f;
  return {
    x: ((_b = (_a = win.pageXOffset) != null ? _a : win.scrollX) != null ? _b : 0) + ((_c = node.scrollLeft) != null ? _c : 0),
    y: ((_e = (_d = win.pageYOffset) != null ? _d : win.scrollY) != null ? _e : 0) + ((_f = node.scrollTop) != null ? _f : 0)
  };
}
function getTransformCTM(node, x = 0, y = 0, inverse = true) {
  const point = new DOMPoint(x, y);
  const screen = node.getScreenCTM();
  const res = point.matrixTransform(
    inverse ? screen == null ? void 0 : screen.inverse() : screen
  );
  if (inverse === false) {
    const rect = getBoundingRect(node);
    res.x -= rect.x;
    res.y -= rect.y;
  }
  return res;
}
function getTranslation(node) {
  const transform = node ? node.transform : null;
  const baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
}
function getUnique(data) {
  const isDate = data[0] instanceof Date;
  const d = (isDate ? data.map(Number) : data).filter((v, i, self) => self.indexOf(v) === i);
  return isDate ? d.map((v) => new Date(v)) : d;
}
function mergeArray(arr) {
  return arr && arr.length ? arr.reduce((p, c) => p.concat(c)) : [];
}
function mergeObj(target, ...objectN) {
  if (!objectN.length || objectN.length === 1 && !objectN[0]) {
    return target;
  }
  const source = objectN.shift();
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (!/^(__proto__|constructor|prototype)$/i.test(key)) {
        const value = source[key];
        if (isObject(value)) {
          !target[key] && (target[key] = {});
          target[key] = mergeObj(target[key], value);
        } else {
          target[key] = isArray(value) ? value.concat() : value;
        }
      }
    });
  }
  return mergeObj(target, ...objectN);
}
function sortValue(data, isAsc = true) {
  let fn;
  if (data[0] instanceof Date) {
    fn = isAsc ? (a, b) => a - b : (a, b) => b - a;
  } else {
    if (isAsc && !data.every(isNaN)) {
      fn = (a, b) => a - b;
    } else if (!isAsc) {
      fn = (a, b) => a > b && -1 || a < b && 1 || a === b && 0;
    }
  }
  return data.concat().sort(fn);
}
function getMinMax(type, data) {
  let res = data.filter((v) => notEmpty(v));
  if (res.length) {
    if (isNumber(res[0])) {
      res = Math[type](...res);
    } else if (res[0] instanceof Date) {
      res = sortValue(res, type === "min")[0];
    }
  } else {
    res = void 0;
  }
  return res;
}
const getRange = (start, end, step = 1) => {
  const res = [];
  const n = Math.max(0, Math.ceil((end - start) / step)) | 0;
  for (let i = start; i < n; i++) {
    res.push(start + i * step);
  }
  return res;
};
const emulateEvent = {
  mouse: (() => {
    const getParams = () => ({
      bubbles: false,
      cancelable: false,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0
    });
    try {
      new MouseEvent("t");
      return (el, eventType, params = getParams()) => {
        el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      return (el, eventType, params = getParams()) => {
        const mouseEvent = doc.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(
          eventType,
          params.bubbles,
          params.cancelable,
          win,
          0,
          // the event's mouse click count
          params.screenX,
          params.screenY,
          params.clientX,
          params.clientY,
          false,
          false,
          false,
          false,
          0,
          null
        );
        el.dispatchEvent(mouseEvent);
      };
    }
  })(),
  touch: (el, eventType, params) => {
    const touchObj = new Touch(mergeObj({
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
};
function tplProcess(tpl, data) {
  let res = tpl;
  for (const x in data) {
    res = res.replace(new RegExp(`{=${x}}`, "g"), data[x]);
  }
  return sanitize(res);
}
function parseDate(date) {
  var _a;
  let parsedDate;
  if (date instanceof Date) {
    parsedDate = date;
  } else if (isString(date)) {
    const { config, format } = this;
    parsedDate = (_a = format.dataTime(config.data_xFormat)(date)) != null ? _a : new Date(date);
  } else if (isNumber(date) && !isNaN(date)) {
    parsedDate = /* @__PURE__ */ new Date(+date);
  }
  if (!parsedDate || isNaN(+parsedDate)) {
    console && console.error && console.error(`Failed to parse x '${date}' to Date object`);
  }
  return parsedDate;
}
function hasViewBox(svg) {
  const attr = svg.attr("viewBox");
  return attr ? /(\d+(\.\d+)?){3}/.test(attr) : false;
}
function hasStyle(node, condition, all = false) {
  const isD3Node = !!node.node;
  let has = false;
  for (const [key, value] of Object.entries(condition)) {
    has = isD3Node ? node.style(key) === value : node.style[key] === value;
    if (all === false && has) {
      break;
    }
  }
  return has;
}
function isTabVisible() {
  var _a, _b;
  return ((_a = doc) == null ? void 0 : _a.hidden) === false || ((_b = doc) == null ? void 0 : _b.visibilityState) === "visible";
}
function convertInputType(mouse, touch) {
  const { DocumentTouch, matchMedia, navigator } = win;
  const hasPointerCoarse = matchMedia == null ? void 0 : matchMedia("(pointer:coarse)").matches;
  let hasTouch = false;
  if (touch) {
    if (navigator && "maxTouchPoints" in navigator) {
      hasTouch = navigator.maxTouchPoints > 0;
    } else if ("ontouchmove" in win || DocumentTouch && doc instanceof DocumentTouch) {
      hasTouch = true;
    } else {
      if (hasPointerCoarse) {
        hasTouch = true;
      } else {
        const UA = navigator.userAgent;
        hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
  }
  const hasMouse = mouse && !hasPointerCoarse && (matchMedia == null ? void 0 : matchMedia("(pointer:fine)").matches);
  return hasMouse && "mouse" || hasTouch && "touch" || "mouse";
}
function runUntil(fn, conditionFn) {
  if (conditionFn() === false) {
    requestAnimationFrame(() => runUntil(fn, conditionFn));
  } else {
    fn();
  }
}
function parseShorthand(value) {
  if (isObject(value) && !isString(value)) {
    const obj = value;
    return {
      top: obj.top || 0,
      right: obj.right || 0,
      bottom: obj.bottom || 0,
      left: obj.left || 0
    };
  }
  const values = (isString(value) ? value.trim().split(/\s+/) : [value]).map((v) => +v || 0);
  const [a, b = a, c = a, d = b] = values;
  return { top: a, right: b, bottom: c, left: d };
}
function scheduleRAFUpdate(rafState, callback) {
  if (rafState.pendingRaf !== null) {
    win.cancelAnimationFrame(rafState.pendingRaf);
    rafState.pendingRaf = win.requestAnimationFrame(() => {
      rafState.pendingRaf = null;
      callback();
    });
  } else {
    rafState.pendingRaf = win.requestAnimationFrame(() => {
      rafState.pendingRaf = null;
    });
    callback();
  }
}
function toSet(items, keyFn = ((item) => item)) {
  const set = /* @__PURE__ */ new Set();
  _forEachValidItem(items, (item, i) => {
    set.add(keyFn(item, i));
  });
  return set;
}
function toMap(items, keyFn, valueFn = ((item) => item)) {
  const map = /* @__PURE__ */ new Map();
  _forEachValidItem(items, (item, i) => {
    map.set(keyFn(item, i), valueFn(item, i));
  });
  return map;
}


;// ./src/config/config.ts

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
    } else if (!key) {
      return target;
    }
    return void 0;
  };
  Object.keys(thisConfig).forEach((key) => {
    target = config;
    keys = key.split("_");
    read = find();
    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  });
  if (this.api) {
    this.state.orgConfig = config;
  }
}

;// ./src/Plugin/Plugin.ts
var Plugin_defProp = Object.defineProperty;
var Plugin_defNormalProp = (obj, key, value) => key in obj ? Plugin_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => Plugin_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class Plugin {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  constructor(options = {}) {
    __publicField(this, "$$");
    __publicField(this, "options");
    __publicField(this, "config");
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
  $beforeInit() {
  }
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  $init() {
  }
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  $afterInit() {
  }
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  $redraw() {
  }
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  $willDestroy() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
      delete this[key];
    });
  }
}
__publicField(Plugin, "version", "3.18.0-nightly-20260202005442");

;// ./src/Plugin/bubblecompare/index.ts
var bubblecompare_defProp = Object.defineProperty;
var bubblecompare_defNormalProp = (obj, key, value) => key in obj ? bubblecompare_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var bubblecompare_publicField = (obj, key, value) => bubblecompare_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);


const _BubbleCompare = class _BubbleCompare extends Plugin {
  constructor(options) {
    super(options);
    bubblecompare_publicField(this, "$$");
    return this;
  }
  $init() {
    const { $$ } = this;
    $$.findClosest = this.findClosest.bind(this);
    $$.getBubbleR = this.getBubbleR.bind(this);
    $$.pointExpandedR = this.pointExpandedR.bind(this);
  }
  pointExpandedR(d) {
    const baseR = this.getBubbleR(d);
    const { expandScale = 1 } = this.options;
    _BubbleCompare.raiseFocusedBubbleLayer(d);
    this.changeCursorPoint();
    return baseR * expandScale;
  }
  static raiseFocusedBubbleLayer(d) {
    d.raise && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(d.node().parentNode.parentNode).raise();
  }
  changeCursorPoint() {
    this.$$.$el.eventRect.style("cursor", "pointer");
  }
  findClosest(values, pos) {
    const { $$ } = this;
    return values.filter((v) => v && !$$.isBarType(v.id)).reduce((acc, cur) => {
      const d = $$.dist(cur, pos);
      return d < this.getBubbleR(cur) ? cur : acc;
    }, 0);
  }
  getBubbleR(d) {
    const { minR, maxR } = this.options;
    const curVal = this.getZData(d);
    if (!curVal) return minR;
    const [min, max] = this.$$.data.targets.reduce(
      ([accMin, accMax], cur) => {
        const val = this.getZData(cur.values[0]);
        return [Math.min(accMin, val), Math.max(accMax, val)];
      },
      [1e4, 0]
    );
    const size = min > 0 && max === min ? 0 : curVal / max;
    return Math.abs(size) * (maxR - minR) + minR;
  }
  getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }
};
bubblecompare_publicField(_BubbleCompare, "version", `0.0.1`);
let BubbleCompare = _BubbleCompare;


}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});