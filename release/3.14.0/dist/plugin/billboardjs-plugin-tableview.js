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
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-brush"), require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-brush", "d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-brush"), require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["tableview"] = factory(root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ TableView; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(3);
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
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
const isEmpty = (o) => isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
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
function sanitize(str) {
  return isString(str) ? str.replace(/<(script|img)?/ig, "&lt;").replace(/(script)?>/ig, "&gt;") : str;
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
  const { width, height } = path.getBoundingClientRect();
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
function getBoundingRect(node) {
  const needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
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
  return point.matrixTransform(
    inverse ? screen == null ? void 0 : screen.inverse() : screen
  );
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
      const value = source[key];
      if (isObject(value)) {
        !target[key] && (target[key] = {});
        target[key] = mergeObj(target[key], value);
      } else {
        target[key] = isArray(value) ? value.concat() : value;
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
  return res;
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
    this.options = options;
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
__publicField(Plugin, "version", "3.14.0");

;// ./src/Plugin/tableview/const.ts

const defaultStyle = {
  id: "__tableview-style__",
  class: "bb-tableview",
  rule: `.bb-tableview {
		border-collapse:collapse;
		border-spacing:0;
		background:#fff;
		min-width:100%;
		margin-top:10px;
		font-family:sans-serif;
		font-size:.9em;
	}
	.bb-tableview tr:hover {
		background:#eef7ff;
	}
	.bb-tableview thead tr {
		background:#f8f8f8;
	}
	.bb-tableview caption,.bb-tableview td,.bb-tableview th {
		text-align: center;
		border:1px solid silver;
		padding:.5em;
	}
	.bb-tableview caption {
		font-size:1.1em;
		font-weight:700;
		margin-bottom: -1px;
	}`
};
const tpl = {
  body: `<caption>{=title}</caption>
		<thead><tr>{=thead}</tr></thead>
		<tbody>{=tbody}</tbody>`,
  thead: `<th scope="col">{=title}</th>`,
  tbodyHeader: `<th scope="row">{=value}</th>`,
  tbody: `<td>{=value}</td>`
};

;// ./src/Plugin/tableview/Options.ts
class Options {
  constructor() {
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
      selector: void 0,
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
      categoryFormat: function(v) {
        let category = v;
        if (this.$$.axis.isCategorized()) {
          category = this.$$.categoryName(v);
        } else if (this.$$.axis.isTimeSeries()) {
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
      class: void 0,
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
      title: void 0,
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
}

;// ./src/Plugin/tableview/index.ts
var tableview_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var tableview_getOwnPropSymbols = Object.getOwnPropertySymbols;
var tableview_hasOwnProp = Object.prototype.hasOwnProperty;
var tableview_propIsEnum = Object.prototype.propertyIsEnumerable;
var tableview_defNormalProp = (obj, key, value) => key in obj ? tableview_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var tableview_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (tableview_hasOwnProp.call(b, prop))
      tableview_defNormalProp(a, prop, b[prop]);
  if (tableview_getOwnPropSymbols)
    for (var prop of tableview_getOwnPropSymbols(b)) {
      if (tableview_propIsEnum.call(b, prop))
        tableview_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var tableview_publicField = (obj, key, value) => tableview_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);





class TableView extends Plugin {
  constructor(options) {
    super(options);
    tableview_publicField(this, "config");
    tableview_publicField(this, "element");
    this.config = new Options();
    return this;
  }
  $beforeInit() {
    loadConfig.call(this, this.options);
  }
  $init() {
    const { class: className, selector, style } = this.config;
    let element = document.querySelector(
      selector || `.${className || defaultStyle.class}`
    );
    if (!element) {
      const chart = this.$$.$el.chart.node();
      element = document.createElement("table");
      chart.parentNode.insertBefore(element, chart.nextSibling);
    }
    if (element.tagName !== "TABLE") {
      const table = document.createElement("table");
      element.appendChild(table);
      element = table;
    }
    if (style && !document.getElementById(defaultStyle.id)) {
      const s = document.createElement("style");
      s.id = defaultStyle.id;
      s.innerHTML = defaultStyle.rule;
      (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
    }
    element.classList.add(...[style && defaultStyle.class, className].filter(Boolean));
    this.element = element;
  }
  /**
   * Generate table
   * @private
   */
  generateTable() {
    const { $$, config, element } = this;
    const dataToShow = $$.filterTargetsToShow($$.data.targets);
    let thead = tplProcess(tpl.thead, {
      title: dataToShow.length ? this.config.categoryTitle : ""
    });
    let tbody = "";
    const rows = [];
    dataToShow.forEach((v) => {
      thead += tplProcess(tpl.thead, { title: v.id });
      v.values.forEach((d, i) => {
        if (!rows[i]) {
          rows[i] = [d.x];
        }
        rows[i].push(d.value);
      });
    });
    rows.forEach((v) => {
      tbody += `<tr>${v.map(
        (d, i) => tplProcess(i ? tpl.tbody : tpl.tbodyHeader, {
          value: i === 0 ? config.categoryFormat.bind(this)(d) : isNumber(d) ? d.toLocaleString() : config.nullString
        })
      ).join("")}</tr>`;
    });
    const rx = /(<\/?(script|img)[^>]*>|<[^>]+><\/[^>]+>)/ig;
    const r = tplProcess(tpl.body, __spreadProps(tableview_spreadValues({}, config), {
      title: config.title || $$.config.title_text || "",
      thead,
      tbody
    })).replace(rx, "");
    element.innerHTML = r;
  }
  $redraw() {
    const { state } = this.$$;
    const doNotUpdate = state.resizing || !this.config.updateOnToggle && state.toggling;
    !doNotUpdate && this.generateTable();
  }
  $willDestroy() {
    var _a, _b;
    (_a = this.element.parentNode) == null ? void 0 : _a.removeChild(this.element);
    if (this.$$.charts.length === 1) {
      const s = document.getElementById(defaultStyle.id);
      (_b = s == null ? void 0 : s.parentNode) == null ? void 0 : _b.removeChild(s);
    }
  }
}

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});