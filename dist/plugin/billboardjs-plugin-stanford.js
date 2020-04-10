/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
 * 
 * @version 1.11.1-nightly-20200410133203
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("stanford", ["d3-selection", "d3-interpolate", "d3-color", "d3-scale", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["stanford"] = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(self);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _getPrototypeOf; });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Version info string for plugin
   * @name version
   * @static
   * @memberof Plugin
   * @type {String}
   * @example
   *   bb.plugin.stanford.version;  // ex) 1.9.0
   */

  /**
   * Constructor
   * @param {Any} config config option object
   * @private
   */
  function Plugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Plugin), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Plugin, [{
    key: "$beforeInit",
    value: function $beforeInit() {}
    /**
     * Lifecycle hook for 'init' phase.
     * @private
     */

  }, {
    key: "$init",
    value: function $init() {}
    /**
     * Lifecycle hook for 'afterInit' phase.
     * @private
     */

  }, {
    key: "$afterInit",
    value: function $afterInit() {}
    /**
     * Lifecycle hook for 'redraw' phase.
     * @private
     */

  }, {
    key: "$redraw",
    value: function $redraw() {}
    /**
     * Lifecycle hook for 'willDestroy' phase.
     * @private
     */

  }, {
    key: "$willDestroy",
    value: function $willDestroy() {
      var _this = this;

      Object.keys(this).forEach(function (key) {
        _this[key] = null, delete _this[key];
      });
    }
  }]), Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Plugin, "version", "1.11.1-nightly-20200410133203");



/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ stanford_Stanford; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(23);

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(12);

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(13);

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(14);

// CONCATENATED MODULE: ./src/config/classes.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var classes = ({
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  area: "bb-area",
  areas: "bb-areas",
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  bar: "bb-bar",
  bars: "bb-bars",
  brush: "bb-brush",
  button: "bb-button",
  buttonZoomReset: "bb-zoom-reset",
  chart: "bb-chart",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsTitle: "bb-chart-arcs-title",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars",
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  circle: "bb-circle",
  circles: "bb-circles",
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale",
  defocused: "bb-defocused",
  dragarea: "bb-dragarea",
  empty: "bb-empty",
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single",
  focused: "bb-focused",
  gaugeValue: "bb-gauge-value",
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemFocused: "bb-legend-item-focused",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile",
  level: "bb-level",
  levels: "bb-levels",
  line: "bb-line",
  lines: "bb-lines",
  region: "bb-region",
  regions: "bb-regions",
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  shape: "bb-shape",
  shapes: "bb-shapes",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  xgrid: "bb-xgrid",
  xgridFocus: "bb-xgrid-focus",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridFocus: "bb-ygrid-focus",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids",
  zoomBrush: "bb-zoom-brush",
  zoomRect: "bb-zoom-rect",
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(7);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(10);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(15);

// CONCATENATED MODULE: ./src/internals/browser.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @module
 * @ignore
 */

/* eslint-disable no-new-func, no-undef */
var win = function () {
  var def = function (o) {
    return typeof o !== "undefined" && o;
  };

  return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */



// CONCATENATED MODULE: ./src/internals/util.js



/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */





var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isBoolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return Object(esm_typeof["a" /* default */])(v) === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return arr && arr.constructor === Array;
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
},
    getOption = function (options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
},
    hasValue = function (dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
},
    callFn = function (fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
},
    sanitise = function (str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
},
    setTextValue = function (node, text) {
  var dy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [-1, 1],
      toMiddle = !!(arguments.length > 3 && arguments[3] !== undefined) && arguments[3];
  if (node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", "".concat(i === 0 ? dy[0] * len : dy[1], "em")).text(v);
      });
    }
  }
},
    getRectSegList = function (path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
},
    getPathBox = function (path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
},
    getBrushSelection = function (ctx) {
  var selection = null,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = ctx.context || ctx.main;
  return event && event.constructor.name === "BrushEvent" ? selection = event.selection : main && (selection = main.select(".".concat(classes.brush)).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
},
    getBoundingRect = function (node) {
  return node.rect || (node.rect = node.getBoundingClientRect());
},
    getRandom = function () {
  var asStr = !(arguments.length > 0 && arguments[0] !== undefined) || arguments[0];
  return Math.random() + (asStr ? "" : 0);
},
    brushEmpty = function (ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
},
    extend = function () {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      source = arguments.length > 1 ? arguments[1] : undefined;

  for (var p in source) target[p] = source[p];

  return target;
},
    capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
},
    getCssRules = function (styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from ".concat(sheet.href, ": ").concat(e.toString()));
    }
  }), rules;
},
    getTranslation = function (node) {
  var transform = node ? node.transform : null,
      baseVal = transform ? transform.baseVal : [];
  return baseVal.length ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
},
    getUnique = function (data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
},
    mergeArray = function (arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
},
    mergeObj = function (_mergeObj) {
  function mergeObj() {
    return _mergeObj.apply(this, arguments);
  }

  return mergeObj.toString = function () {
    return _mergeObj.toString();
  }, mergeObj;
}(function (target) {
  for (var _len2 = arguments.length, objectN = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) objectN[_key2 - 1] = arguments[_key2];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}),
    sortValue = function (data) {
  var fn,
      isAsc = !(arguments.length > 1 && arguments[1] !== undefined) || arguments[1];
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
},
    getMinMax = function (type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, _toConsumableArray(res)) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
},
    getRange = function (start, end) {
  for (var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1, res = [], n = Math.max(0, Math.ceil((end - start) / step)) | 0, i = start; i < n; i++) res.push(start + i * step);

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      return new MouseEvent("t"), function (el, eventType) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getParams();
        el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getParams(),
            mouseEvent = doc.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
},
    tplProcess = function (tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=".concat(x, "}"), "g"), data[x]);

  return res;
};


// EXTERNAL MODULE: ./src/plugin/Plugin.js
var Plugin = __webpack_require__(11);

// CONCATENATED MODULE: ./src/plugin/stanford/Options.js


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @extends Plugin
 * @return {StanfordOptions}
 * @private
 */
var Options_Options = function Options() {
  return Object(classCallCheck["a" /* default */])(this, Options), {
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
     * @type {Object}
    	 * @property {Number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {Number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {Number} [scale.width=20] Width of the color scale
     * @property {String|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
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
     * @type {Object}
     * @property {Number} [padding.top=0] Top padding value.
     * @property {Number} [padding.right=0] Right padding value.
     * @property {Number} [padding.bottom=0] Bottom padding value.
     * @property {Number} [padding.left=0] Left padding value.
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
};


// CONCATENATED MODULE: ./src/plugin/stanford/classes.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
// CONCATENATED MODULE: ./src/plugin/stanford/util.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
function pointInRegion(point, region) {
  // thanks to: http://bl.ocks.org/bycoffe/5575904
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var x = point.x,
      y = point.value,
      inside = !1;

  for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
    var xi = region[i].x,
        yi = region[i].y,
        xj = region[j].x,
        yj = region[j].y;
    yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi && (inside = !inside);
  }

  return inside;
}

function compareEpochs(a, b) {
  return a.epochs < b.epochs ? -1 : a.epochs > b.epochs ? 1 : 0;
}

function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  for (var point1, point2, area = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) point1 = points[i], point2 = points[j], area += point1.x * point2.y, area -= point1.y * point2.x;

  return area /= 2, area;
}

function getCentroid(points) {
  for (var f, area = getRegionArea(points), x = 0, y = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    var _point = points[i],
        _point2 = points[j];
    f = _point.x * _point2.y - _point2.x * _point.y, x += (_point.x + _point2.x) * f, y += (_point.y + _point2.y) * f;
  }

  return f = area * 6, {
    x: x / f,
    y: y / f
  };
}


// CONCATENATED MODULE: ./src/plugin/stanford/Elements.js



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

var Elements_Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    Object(classCallCheck["a" /* default */])(this, Elements), this.owner = owner;
    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines), elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }

  return Object(createClass["a" /* default */])(Elements, [{
    key: "updateStanfordLines",
    value: function updateStanfordLines(duration) {
      var $$ = this.owner.$$,
          main = $$.main,
          config = $$.config,
          isRotated = config.axis_rotated,
          xvCustom = this.xvCustom.bind($$),
          yvCustom = this.yvCustom.bind($$),
          stanfordLine = main.select(".".concat(stanford_classes.stanfordLines)).style("shape-rendering", "geometricprecision").selectAll(".".concat(stanford_classes.stanfordLine)).data(this.owner.config.lines);
      stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
      // enter
      var stanfordLineEnter = stanfordLine.enter().append("g");
      stanfordLineEnter.append("line").style("opacity", "0"), stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
        return stanford_classes.stanfordLine + (d["class"] ? " ".concat(d["class"]) : "");
      }).select("line").transition().duration(duration).attr("x1", function (d) {
        return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
      }).attr("x2", function (d) {
        return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
      }).attr("y1", function (d) {
        return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
      }).attr("y2", function (d) {
        return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
      }).transition().style("opacity", "1");
    }
  }, {
    key: "updateStanfordRegions",
    value: function updateStanfordRegions(duration) {
      var $$ = this.owner.$$,
          main = $$.main,
          config = $$.config,
          isRotated = config.axis_rotated,
          xvCustom = this.xvCustom.bind($$),
          yvCustom = this.yvCustom.bind($$),
          countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
          stanfordRegion = main.select(".".concat(stanford_classes.stanfordRegions)).selectAll(".".concat(stanford_classes.stanfordRegion)).data(this.owner.config.regions);
      stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
      // enter
      var stanfordRegionEnter = stanfordRegion.enter().append("g");
      stanfordRegionEnter.append("polygon").style("opacity", "0"), stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), stanfordRegion = stanfordRegionEnter.merge(stanfordRegion), stanfordRegion.attr("class", function (d) {
        return stanford_classes.stanfordRegion + (d["class"] ? " ".concat(d["class"]) : "");
      }).select("polygon").transition().duration(duration).attr("points", function (d) {
        return d.points.map(function (value) {
          return [isRotated ? yvCustom(value, "y") : xvCustom(value, "x"), isRotated ? xvCustom(value, "x") : yvCustom(value, "y")].join(",");
        }).join(" ");
      }).transition().style("opacity", function (d) {
        return (d.opacity ? d.opacity : .2) + "";
      }), stanfordRegion.select("text").transition().duration(duration).attr("x", function (d) {
        return isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x");
      }).attr("y", function (d) {
        return isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y");
      }).text(function (d) {
        if (d.text) {
          var _countPointsInRegion = countPointsInRegion(d.points),
              value = _countPointsInRegion.value,
              percentage = _countPointsInRegion.percentage;

          return d.text(value, percentage);
        }

        return "";
      }).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", "1");
    }
  }, {
    key: "updateStanfordElements",
    value: function updateStanfordElements() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.updateStanfordLines(duration), this.updateStanfordRegions(duration);
    }
  }, {
    key: "xvCustom",
    value: function xvCustom(d, xyValue) {
      var $$ = this,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return $$.isTimeSeries() ? value = $$.parseDate(value) : $$.isCategorized() && isString(value) && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
    }
  }, {
    key: "yvCustom",
    value: function yvCustom(d, xyValue) {
      var $$ = this,
          yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return Math.ceil(yScale(value));
    }
  }]), Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(16);

// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(17);

// CONCATENATED MODULE: ./src/plugin/stanford/ColorScale.js



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

var ColorScale_ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    Object(classCallCheck["a" /* default */])(this, ColorScale), this.owner = owner;
  }

  return Object(createClass["a" /* default */])(ColorScale, [{
    key: "drawColorScale",
    value: function drawColorScale() {
      var $$ = this.owner.$$,
          config = this.owner.config,
          target = $$.data.targets[0],
          height = $$.height - config.padding_bottom - config.padding_top,
          barWidth = config.scale_width,
          barHeight = 5,
          points = getRange(config.padding_bottom, height, barHeight),
          inverseScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequential"])(target.colors).domain([points[points.length - 1], points[0]]);
      this.colorScale && this.colorScale.remove(), this.colorScale = $$.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, ".concat(config.padding_top, ")")).selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
        return i * barHeight;
      }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
        return inverseScale(d);
      });
      // Legend Axis
      var axisScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleLog"])().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
          legendAxis = Object(external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_["axisRight"])(axisScale),
          scaleFormat = config.scale_format;
      scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : isFunction(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat(Object(external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_["format"])("d"));
      // Draw Axis
      var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(".concat(barWidth, ",0)")).call(legendAxis);
      scaleFormat === "pow10" && axis.selectAll(".tick text").text(null).filter(function (d) {
        return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
      }) // Power of Ten
      .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
      .text(function (d) {
        return Math.round(Math.log(d) / Math.LN10);
      }), this.colorScale.attr("transform", "translate(".concat($$.currentWidth - this.xForColorScale(), ", 0)"));
    }
  }, {
    key: "xForColorScale",
    value: function xForColorScale() {
      return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
    }
  }, {
    key: "getColorScalePadding",
    value: function getColorScalePadding() {
      return this.xForColorScale() + this.owner.config.padding_left + 20;
    }
  }]), ColorScale;
}();


// CONCATENATED MODULE: ./src/plugin/stanford/index.js








function _createSuper(Derived) { return function () { var result, Super = Object(getPrototypeOf["a" /* default */])(Derived); if (_isNativeReflectConstruct()) { var NewTarget = Object(getPrototypeOf["a" /* default */])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else result = Super.apply(this, arguments); return Object(possibleConstructorReturn["a" /* default */])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if (typeof Proxy === "function") return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0; } catch (e) { return !1; } }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */










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
 * @param {Object} options Stanford plugin options
 * @extends Plugin
 * @return {Stanford}
 * @example
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

var stanford_Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return Object(classCallCheck["a" /* default */])(this, Stanford), _this = _super.call(this, options), _this.config = new Options_Options(), Object(possibleConstructorReturn["a" /* default */])(_this, Object(assertThisInitialized["a" /* default */])(_this));
  }

  Object(inherits["a" /* default */])(Stanford, _Plugin);

  var _super = _createSuper(Stanford);

  return Object(createClass["a" /* default */])(Stanford, [{
    key: "$beforeInit",
    value: function $beforeInit() {
      var _this2 = this,
          $$ = this.$$;

      $$.config.data_xSort = !1, $$.isMultipleX = function () {
        return !0;
      }, $$.showGridFocus = function () {}, $$.labelishData = function (d) {
        return d.values;
      }, $$.opacityForCircle = function () {
        return 1;
      };
      var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);

      $$.getCurrentPaddingRight = function () {
        return getCurrentPaddingRight() + (_this2.colorScale ? _this2.colorScale.getColorScalePadding() : 0);
      };
    }
  }, {
    key: "$init",
    value: function $init() {
      var $$ = this.$$;
      $$.loadConfig.bind(this)(this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale_ColorScale(this), this.elements = new Elements_Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
    }
  }, {
    key: "$redraw",
    value: function $redraw(duration) {
      this.colorScale && this.colorScale.drawColorScale(), this.elements && this.elements.updateStanfordElements(duration);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return new Options_Options();
    }
  }, {
    key: "convertData",
    value: function convertData() {
      var data = this.$$.data.targets,
          epochs = this.options.epochs;
      data.forEach(function (d) {
        d.values.forEach(function (v, i) {
          v.epochs = epochs[i];
        }), d.minEpochs = undefined, d.maxEpochs = undefined, d.colors = undefined, d.colorscale = undefined;
      });
    }
  }, {
    key: "xvCustom",
    value: function xvCustom(d, xyValue) {
      var $$ = this,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return $$.isTimeSeries() ? value = $$.parseDate(value) : $$.isCategorized() && isString(value) && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
    }
  }, {
    key: "yvCustom",
    value: function yvCustom(d, xyValue) {
      var $$ = this,
          yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return Math.ceil(yScale(value));
    }
  }, {
    key: "initStanfordData",
    value: function initStanfordData() {
      var config = this.config,
          target = this.$$.data.targets[0];
      target.values.sort(compareEpochs);
      // Get array of epochs
      var epochs = target.values.map(function (a) {
        return a.epochs;
      });
      target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, _toConsumableArray(epochs)) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, _toConsumableArray(epochs)) : config.scale_max, target.colors = isFunction(config.colors) ? config.colors : Object(external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_["interpolateHslLong"])(Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(250, 1, .5), Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(0, 1, .5)), target.colorscale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequentialLog"])(target.colors).domain([target.minEpochs, target.maxEpochs]);
    }
  }, {
    key: "getStanfordPointColor",
    value: function getStanfordPointColor(d) {
      var target = this.data.targets[0];
      return target.colorscale(d.epochs);
    }
  }, {
    key: "setStanfordTooltip",
    value: function setStanfordTooltip() {
      var config = this.$$.config;
      isEmpty(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
        var _this3 = this,
            html = "<table class=\"".concat(classes.tooltip, "\"><tbody>");

        return d.forEach(function (v) {
          html += "<tr>\n\t\t\t\t\t\t\t<th>".concat(defaultTitleFormat(_this3.config.data_x), "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultValueFormat(v.x), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>").concat(defaultTitleFormat(v.id), "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultValueFormat(v.value), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"").concat(classes.tooltipName, "-").concat(v.id, "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:").concat(color(v), "\"></span>").concat(defaultTitleFormat("Epochs"), "</td>\n\t\t\t\t\t\t\t<td class=\"value\">").concat(defaultValueFormat(v.epochs), "</td>\n\t\t\t\t\t\t</tr>");
        }), "".concat(html, "</tbody></table>");
      });
    }
  }, {
    key: "countEpochsInRegion",
    value: function countEpochsInRegion(region) {
      var $$ = this,
          target = $$.data.targets[0],
          total = target.values.reduce(function (accumulator, currentValue) {
        return accumulator + +currentValue.epochs;
      }, 0),
          value = target.values.reduce(function (accumulator, currentValue) {
        return pointInRegion(currentValue, region) ? accumulator + +currentValue.epochs : accumulator;
      }, 0);
      return {
        value: value,
        percentage: value === 0 ? 0 : +(value / total * 100).toFixed(1)
      };
    }
  }]), Stanford;
}(Plugin["a" /* default */]);



/***/ }),
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _inherits; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9QbHVnaW4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2ludGVybmFscy9icm93c2VyLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvaW50ZXJuYWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL3N0YW5mb3JkL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHMuanMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsInYiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNEZWZpbmVkIiwiaXNCb29sZWFuIiwiY2VpbDEwIiwiTWF0aCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzT2JqZWN0VHlwZSIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsInZhbHVlIiwiZm91bmQiLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsInNhbml0aXNlIiwic3RyIiwicmVwbGFjZSIsInNldFRleHRWYWx1ZSIsIm5vZGUiLCJkeSIsInRvTWlkZGxlIiwiaW5kZXhPZiIsImRpZmYiLCJtYXAiLCJtdWx0aWxpbmUiLCJzcGxpdCIsImxlbiIsImh0bWwiLCJpIiwiYXBwZW5kIiwiYXR0ciIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0UGF0aEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1zIiwibWluIiwiZ2V0QnJ1c2hTZWxlY3Rpb24iLCJjdHgiLCJzZWxlY3Rpb24iLCJldmVudCIsImQzRXZlbnQiLCJtYWluIiwiY29udGV4dCIsIm5hbWUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiZXh0ZW5kIiwic291cmNlIiwicCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImEiLCJiIiwiYyIsImYiLCJnZXRVbmlxdWUiLCJkYXRhIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsInJlZHVjZSIsIm1lcmdlT2JqIiwib2JqZWN0TiIsInNoaWZ0Iiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJ0eXBlIiwicmVzIiwidW5kZWZpbmVkIiwiZ2V0UmFuZ2UiLCJzdGFydCIsImVuZCIsInN0ZXAiLCJtYXgiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsIk9wdGlvbnMiLCJjb2xvcnMiLCJlcG9jaHMiLCJzY2FsZV9taW4iLCJzY2FsZV9tYXgiLCJzY2FsZV93aWR0aCIsInNjYWxlX2Zvcm1hdCIsInBhZGRpbmdfdG9wIiwicGFkZGluZ19yaWdodCIsInBhZGRpbmdfYm90dG9tIiwicGFkZGluZ19sZWZ0IiwicG9pbnRJblJlZ2lvbiIsInBvaW50IiwiaW5zaWRlIiwiaiIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImdldFJlZ2lvbkFyZWEiLCJwb2ludHMiLCJwb2ludDEiLCJwb2ludDIiLCJsIiwiZ2V0Q2VudHJvaWQiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsImR1cmF0aW9uIiwiY29uZmlnIiwiaXNSb3RhdGVkIiwiYXhpc19yb3RhdGVkIiwieHZDdXN0b20iLCJiaW5kIiwieXZDdXN0b20iLCJzdHlsZSIsInNlbGVjdEFsbCIsImV4aXQiLCJ0cmFuc2l0aW9uIiwicmVtb3ZlIiwic3RhbmZvcmRMaW5lRW50ZXIiLCJlbnRlciIsIm1lcmdlIiwiY291bnRQb2ludHNJblJlZ2lvbiIsImNvdW50RXBvY2hzSW5SZWdpb24iLCJzdGFuZm9yZFJlZ2lvbkVudGVyIiwiam9pbiIsIm9wYWNpdHkiLCJwZXJjZW50YWdlIiwidXBkYXRlU3RhbmZvcmRMaW5lcyIsInVwZGF0ZVN0YW5mb3JkUmVnaW9ucyIsInh5VmFsdWUiLCJnZXRCYXNlVmFsdWUiLCJpc1RpbWVTZXJpZXMiLCJwYXJzZURhdGUiLCJpc0NhdGVnb3JpemVkIiwiYXhpc194X2NhdGVnb3JpZXMiLCJ5U2NhbGUiLCJ5MiIsIkNvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiYmFyV2lkdGgiLCJiYXJIZWlnaHQiLCJpbnZlcnNlU2NhbGUiLCJkM1NjYWxlU2VxdWVudGlhbCIsImRvbWFpbiIsInN2ZyIsImF4aXNTY2FsZSIsImQzU2NhbGVMb2ciLCJtaW5FcG9jaHMiLCJtYXhFcG9jaHMiLCJyYW5nZSIsImxlZ2VuZEF4aXMiLCJkM0F4aXNSaWdodCIsInNjYWxlRm9ybWF0IiwidGlja1ZhbHVlcyIsInRpY2tGb3JtYXQiLCJkM0Zvcm1hdCIsInBvdyIsImxvZyIsIkxOMTAiLCJyb3VuZCIsImN1cnJlbnRXaWR0aCIsInhGb3JDb2xvclNjYWxlIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJnZXRDb2xvclNjYWxlUGFkZGluZyIsImxvYWRDb25maWciLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImRyYXdDb2xvclNjYWxlIiwiJHJlZHJhdyIsInVwZGF0ZVN0YW5mb3JkRWxlbWVudHMiLCJjb2xvcnNjYWxlIiwiZDNJbnRlcnBvbGF0ZUhzbExvbmciLCJkM0hzbCIsImQzU2NhbGVTZXF1ZW50aWFsTG9nIiwidG9vbHRpcF9jb250ZW50cyIsImRlZmF1bHRUaXRsZUZvcm1hdCIsImRlZmF1bHRWYWx1ZUZvcm1hdCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQWtEO0FBQ25DO0FBQ2Y7QUFDQSxvQ0FBb0MseUVBQWdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRix5RUFBZ0I7QUFDdEcsQzs7Ozs7OztBQ1JBO0FBQWU7QUFDZjs7QUFFQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7OztBQ1JBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDSkE7QUFBQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDZEE7QUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBK0M7QUFDYTtBQUM3QztBQUNmLGVBQWUsMkVBQU87QUFDdEI7QUFDQTs7QUFFQSxTQUFTLDhFQUFxQjtBQUM5QixDOzs7Ozs7O0FDUkE7QUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7OztBQ2RBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNMQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7O0FDYkEsaUQ7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7OztBQUlBOzs7O0lBSXFCQSxNO0FBQ3BCOzs7Ozs7Ozs7O0FBV0E7Ozs7O0FBS0Esb0JBQTBCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJO0FBQUEscUhBQ3pCLEtBQUtBLE9BQUwsR0FBZUEsT0FEVTtBQUV6QjtBQUVEOzs7Ozs7OztrQ0FJYyxDQUFFO0FBRWhCOzs7Ozs7OzRCQUlRLENBQUU7QUFFVjs7Ozs7OztpQ0FJYSxDQUFFO0FBRWY7Ozs7Ozs7OEJBSVUsQ0FBRTtBQUVaOzs7Ozs7O21DQUllO0FBQUE7O0FBQ2RDLFlBQU0sQ0FBQ0MsSUFBUCxDQUFZLElBQVosRUFBa0JDLE9BQWxCLENBQTBCLFVBQUFDLEdBQUcsRUFBSTtBQUNoQyxhQUFJLENBQUNBLEdBQUQsQ0FBSixHQUFZLElBRG9CLEVBRWhDLE9BQU8sS0FBSSxDQUFDQSxHQUFELENBRnFCO0FBR2hDLE9BSEQsQ0FEYztBQUtkOzs7O2tHQXREbUJMLE0sYUFVSCwrQjs7Ozs7Ozs7QUNsQmxCLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsaUQ7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQSxpRDs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBa0Q7QUFDbkM7QUFDZixpQ0FBaUMsMkNBQWdCO0FBQ2pELEM7O0FDSGU7QUFDZjtBQUNBLEM7Ozs7O0FDRmU7QUFDZjtBQUNBLEM7O0FDRm9EO0FBQ0o7QUFDc0I7QUFDbEI7QUFDckM7QUFDZixTQUFTLGtCQUFpQixTQUFTLGdCQUFlLFNBQVMscURBQTBCLFNBQVMsa0JBQWlCO0FBQy9HLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7Ozs7O0FBSUE7Ozs7QUFJZTtBQUNkTSxLQUFHLEVBQUUsUUFEUztBQUVkQyxjQUFZLEVBQUUsbUJBRkE7QUFHZEMsTUFBSSxFQUFFLFNBSFE7QUFJZEMsTUFBSSxFQUFFLFNBSlE7QUFLZEMsT0FBSyxFQUFFLFVBTE87QUFNZEMsTUFBSSxFQUFFLFNBTlE7QUFPZEMsT0FBSyxFQUFFLFdBUE87QUFRZEMsWUFBVSxFQUFFLGlCQVJFO0FBU2RDLE9BQUssRUFBRSxXQVRPO0FBVWRDLFFBQU0sRUFBRSxZQVZNO0FBV2RDLGFBQVcsRUFBRSxrQkFYQztBQVlkQyxZQUFVLEVBQUUsaUJBWkU7QUFhZEMsS0FBRyxFQUFFLFFBYlM7QUFjZEMsTUFBSSxFQUFFLFNBZFE7QUFlZEMsT0FBSyxFQUFFLFVBZk87QUFnQmRDLFFBQU0sRUFBRSxXQWhCTTtBQWlCZEMsaUJBQWUsRUFBRSxlQWpCSDtBQWtCZEMsT0FBSyxFQUFFLFVBbEJPO0FBbUJkQyxVQUFRLEVBQUUsY0FuQkk7QUFvQmRDLFdBQVMsRUFBRSxlQXBCRztBQXFCZEMscUJBQW1CLEVBQUUsMEJBckJQO0FBc0JkQyxtQkFBaUIsRUFBRSx5QkF0Qkw7QUF1QmRDLG1CQUFpQixFQUFFLHlCQXZCTDtBQXdCZEMsb0JBQWtCLEVBQUUsMEJBeEJOO0FBeUJkQyxnQkFBYyxFQUFFLHFCQXpCRjtBQTBCZEMscUJBQW1CLEVBQUUsMkJBMUJQO0FBMkJkQyxVQUFRLEVBQUUsY0EzQkk7QUE0QmRDLFdBQVMsRUFBRSxlQTVCRztBQTZCZEMsV0FBUyxFQUFFLGVBN0JHO0FBOEJkQyxZQUFVLEVBQUUsZ0JBOUJFO0FBK0JkQyxZQUFVLEVBQUUsZ0JBL0JFO0FBZ0NkQyxhQUFXLEVBQUUsaUJBaENDO0FBaUNkQyxXQUFTLEVBQUUsZUFqQ0c7QUFrQ2RDLFlBQVUsRUFBRSxnQkFsQ0U7QUFtQ2RDLFFBQU0sRUFBRSxXQW5DTTtBQW9DZEMsU0FBTyxFQUFFLFlBcENLO0FBcUNkQyxjQUFZLEVBQUUsa0JBckNBO0FBc0NkQyxZQUFVLEVBQUUsZUF0Q0U7QUF1Q2RDLFdBQVMsRUFBRSxjQXZDRztBQXdDZEMsVUFBUSxFQUFFLGFBeENJO0FBeUNkQyxPQUFLLEVBQUUsVUF6Q087QUEwQ2RDLFdBQVMsRUFBRSxlQTFDRztBQTJDZEMsWUFBVSxFQUFFLGdCQTNDRTtBQTRDZEMsb0JBQWtCLEVBQUUseUJBNUNOO0FBNkNkQyxrQkFBZ0IsRUFBRSx1QkE3Q0o7QUE4Q2RDLFNBQU8sRUFBRSxZQTlDSztBQStDZEMsWUFBVSxFQUFFLGdCQS9DRTtBQWdEZEMsTUFBSSxFQUFFLFNBaERRO0FBaURkQyxXQUFTLEVBQUUsZUFqREc7QUFrRGRDLGtCQUFnQixFQUFFLHNCQWxESjtBQW1EZEMsWUFBVSxFQUFFLGdCQW5ERTtBQW9EZEMsaUJBQWUsRUFBRSxzQkFwREg7QUFxRGRDLG1CQUFpQixFQUFFLHdCQXJETDtBQXNEZEMsa0JBQWdCLEVBQUUsdUJBdERKO0FBdURkQyxpQkFBZSxFQUFFLHNCQXZESDtBQXdEZEMsZ0JBQWMsRUFBRSxxQkF4REY7QUF5RGRDLE9BQUssRUFBRSxVQXpETztBQTBEZEMsUUFBTSxFQUFFLFdBMURNO0FBMkRkQyxNQUFJLEVBQUUsU0EzRFE7QUE0RGRDLE9BQUssRUFBRSxVQTVETztBQTZEZEMsUUFBTSxFQUFFLFdBN0RNO0FBOERkQyxTQUFPLEVBQUUsWUE5REs7QUErRGRDLGdCQUFjLEVBQUUsb0JBL0RGO0FBZ0VkQyxpQkFBZSxFQUFFLHFCQWhFSDtBQWlFZEMsT0FBSyxFQUFFLFVBakVPO0FBa0VkQyxRQUFNLEVBQUUsV0FsRU07QUFtRWRDLGtCQUFnQixFQUFFLHNCQW5FSjtBQW9FZEMsY0FBWSxFQUFFLGtCQXBFQTtBQXFFZEMsZUFBYSxFQUFFLG1CQXJFRDtBQXNFZEMsZ0JBQWMsRUFBRSxvQkF0RUY7QUF1RWRDLGlCQUFlLEVBQUUscUJBdkVIO0FBd0VkQyxRQUFNLEVBQUUsV0F4RU07QUF5RWRDLE1BQUksRUFBRSxTQXpFUTtBQTBFZEMsT0FBSyxFQUFFLFVBMUVPO0FBMkVkQyxPQUFLLEVBQUUsVUEzRU87QUE0RWRDLFNBQU8sRUFBRSxZQTVFSztBQTZFZEMsa0JBQWdCLEVBQUUsc0JBN0VKO0FBOEVkQyxhQUFXLEVBQUUsaUJBOUVDO0FBK0VkQyxPQUFLLEVBQUUsVUEvRU87QUFnRmRDLFlBQVUsRUFBRSxnQkFoRkU7QUFpRmRDLFdBQVMsRUFBRSxlQWpGRztBQWtGZEMsWUFBVSxFQUFFLGdCQWxGRTtBQW1GZEMsUUFBTSxFQUFFLFdBbkZNO0FBb0ZkQyxPQUFLLEVBQUUsVUFwRk87QUFxRmRDLFlBQVUsRUFBRSxnQkFyRkU7QUFzRmRDLFdBQVMsRUFBRSxlQXRGRztBQXVGZEMsWUFBVSxFQUFFLGdCQXZGRTtBQXdGZEMsUUFBTSxFQUFFLFdBeEZNO0FBeUZkQyxXQUFTLEVBQUUsZUF6Rkc7QUEwRmRDLFVBQVEsRUFBRSxjQTFGSTtBQTJGZEMsVUFBUSxFQUFFLFlBM0ZJO0FBNEZkQyxVQUFRLEVBQUUsWUE1Rkk7QUE2RmRDLFVBQVEsRUFBRSxZQTdGSTtBQThGZEMsaUJBQWUsRUFBRTtBQTlGSCxDQUFmLEU7Ozs7Ozs7Ozs7O0FDUkE7Ozs7O0FBSUE7Ozs7OztBQUtBO0lBQ01DLEdBQUcsR0FBSSxZQUFNO0FBQ2xCLE1BQU1DLEdBQUcsR0FBRyxVQUFBQyxDQUFDO0FBQUEsV0FBSSxPQUFPQSxDQUFQLEtBQWEsV0FBYixJQUE0QkEsQ0FBaEM7QUFBQSxHQUFiOztBQUVBLFNBQU9ELEdBQUcsQ0FBQ0UsSUFBRCxDQUFILElBQWFGLEdBQUcsQ0FBQ0csTUFBRCxDQUFoQixJQUE0QkgsR0FBRyxDQUFDSSxNQUFELENBQS9CLElBQTJDSixHQUFHLENBQUNLLFVBQUQsQ0FBOUMsSUFBOERDLFFBQVEsQ0FBQyxhQUFELENBQVIsRUFBckU7QUFDQSxDQUpXLEU7SUFPTkMsR0FBRyxHQUFHUixHQUFHLElBQUlBLEdBQUcsQ0FBQ1MsUTtBQUZ2Qjs7Ozs7Ozs7QUNmQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7SUFFTUMsT0FBTyxHQUFHLFVBQUFDLENBQUM7QUFBQSxTQUFJQSxDQUFDLElBQUlBLENBQUMsS0FBSyxDQUFmO0FBQUEsQztJQUNYQyxVQUFVLEdBQUcsVUFBQUQsQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFVBQWpCO0FBQUEsQztJQUNkRSxRQUFRLEdBQUcsVUFBQUYsQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFFBQWpCO0FBQUEsQztJQUNaRyxRQUFRLEdBQUcsVUFBQUgsQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFFBQWpCO0FBQUEsQztJQUNaSSxXQUFXLEdBQUcsVUFBQUosQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFdBQWpCO0FBQUEsQztJQUNmSyxTQUFTLEdBQUcsVUFBQUwsQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFdBQWpCO0FBQUEsQztJQUNiTSxTQUFTLEdBQUcsVUFBQU4sQ0FBQztBQUFBLFNBQUksT0FBT0EsQ0FBUCxLQUFhLFNBQWpCO0FBQUEsQztJQUNiTyxNQUFNLEdBQUcsVUFBQVAsQ0FBQztBQUFBLFNBQUlRLElBQUksQ0FBQ0MsSUFBTCxDQUFVVCxDQUFDLEdBQUcsRUFBZCxJQUFvQixFQUF4QjtBQUFBLEM7SUFDVlUsV0FBVyxHQUFHLFVBQUFDLENBQUM7QUFBQSxTQUFJSCxJQUFJLENBQUNDLElBQUwsQ0FBVUUsQ0FBVixJQUFlLEVBQW5CO0FBQUEsQztJQUNmQyxVQUFVLEdBQUcsVUFBQUMsQ0FBQztBQUFBLFNBQUlBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBWjtBQUFBLEM7SUFDZEMsWUFBWSxHQUFHLFVBQUFkLENBQUM7QUFBQSxTQUFJLHNDQUFPQSxDQUFQLE1BQWEsUUFBakI7QUFBQSxDO0lBQ2hCZSxPQUFPLEdBQUcsVUFBQXhCLENBQUM7QUFBQSxTQUNoQmEsV0FBVyxDQUFDYixDQUFELENBQVgsSUFBa0JBLENBQUMsS0FBSyxJQUF4QixJQUNDVyxRQUFRLENBQUNYLENBQUQsQ0FBUixJQUFlQSxDQUFDLENBQUN5QixNQUFGLEtBQWEsQ0FEN0IsSUFFQ0YsWUFBWSxDQUFDdkIsQ0FBRCxDQUFaLElBQW1CLEVBQUVBLENBQUMsWUFBWTBCLElBQWYsQ0FBbkIsSUFBMkM5SCxNQUFNLENBQUNDLElBQVAsQ0FBWW1HLENBQVosRUFBZXlCLE1BQWYsS0FBMEIsQ0FGdEUsSUFHQ2IsUUFBUSxDQUFDWixDQUFELENBQVIsSUFBZTJCLEtBQUssQ0FBQzNCLENBQUQsQ0FKTDtBQUFBLEM7SUFNWDRCLFFBQVEsR0FBRyxVQUFBNUIsQ0FBQztBQUFBLFNBQUksQ0FBQ3dCLE9BQU8sQ0FBQ3hCLENBQUQsQ0FBWjtBQUFBLEM7SUFRWjZCLE9BQU8sR0FBRyxVQUFBQyxHQUFHO0FBQUEsU0FBSUEsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFdBQUosS0FBb0JDLEtBQS9CO0FBQUEsQztJQVFiQyxRQUFRLEdBQUcsVUFBQUMsR0FBRztBQUFBLFNBQUlBLEdBQUcsSUFBSSxDQUFDQSxHQUFHLENBQUNDLFFBQVosSUFBd0JaLFlBQVksQ0FBQ1csR0FBRCxDQUFwQyxJQUE2QyxDQUFDTCxPQUFPLENBQUNLLEdBQUQsQ0FBekQ7QUFBQSxDO0lBRWRFLFNBQVMsR0FBRyxVQUFDekksT0FBRCxFQUFVSSxHQUFWLEVBQWVzSSxZQUFmO0FBQUEsU0FDakJ2QixTQUFTLENBQUNuSCxPQUFPLENBQUNJLEdBQUQsQ0FBUixDQUFULEdBQTBCSixPQUFPLENBQUNJLEdBQUQsQ0FBakMsR0FBeUNzSSxZQUR4QjtBQUFBLEM7SUFJWkMsUUFBUSxHQUFHLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUNqQyxNQUFJQyxLQUFLLEtBQVQ7QUFJQSxTQUZBN0ksTUFBTSxDQUFDQyxJQUFQLENBQVkwSSxJQUFaLEVBQWtCekksT0FBbEIsQ0FBMEIsVUFBQUMsR0FBRztBQUFBLFdBQUt3SSxJQUFJLENBQUN4SSxHQUFELENBQUosS0FBY3lJLEtBQWYsS0FBMEJDLEtBQUssS0FBL0IsQ0FBSjtBQUFBLEdBQTdCLENBRUEsRUFBT0EsS0FBUDtBQUNBLEM7SUFTS0MsTUFBTSxHQUFHLFVBQUNDLEVBQUQsRUFBaUI7QUFBQSxXQUN6QkMsSUFBSSxHQUFHbEMsVUFBVSxDQUFDaUMsRUFBRCxDQURRLDJCQUFURSxJQUFTLGtFQUFUQSxJQUFTOztBQUkvQixTQURBRCxJQUFJLElBQUlELEVBQUUsQ0FBQ0csSUFBSCxPQUFBSCxFQUFFLEVBQVNFLElBQVQsQ0FDVixFQUFPRCxJQUFQO0FBQ0EsQztJQVFLRyxRQUFRLEdBQUcsVUFBQUMsR0FBRztBQUFBLFNBQUtyQyxRQUFRLENBQUNxQyxHQUFELENBQVIsR0FBZ0JBLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLElBQVosRUFBa0IsTUFBbEIsRUFBMEJBLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLE1BQXhDLENBQWhCLEdBQWtFRCxHQUF2RTtBQUFBLEM7SUFVZEUsWUFBWSxHQUFHLFVBQUNDLElBQUQsRUFBTzNFLElBQVAsRUFBZ0Q7QUFBQSxNQUFuQzRFLEVBQW1DLHVFQUE5QixDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FBOEI7QUFBQSxNQUFyQkMsUUFBcUI7QUFDcEUsTUFBS0YsSUFBRCxJQUFVeEMsUUFBUSxDQUFDbkMsSUFBRCxDQUF0QixFQUlBLElBQUlBLElBQUksQ0FBQzhFLE9BQUwsQ0FBYSxJQUFiLE1BQXVCLENBQUMsQ0FBNUIsRUFDQ0gsSUFBSSxDQUFDM0UsSUFBTCxDQUFVQSxJQUFWLENBREQsTUFFTztBQUNOLFFBQU0rRSxJQUFJLEdBQUcsQ0FBQ0osSUFBSSxDQUFDM0UsSUFBTCxFQUFELEVBQWNBLElBQWQsRUFBb0JnRixHQUFwQixDQUF3QixVQUFBL0MsQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQ3dDLE9BQUYsQ0FBVSxTQUFWLEVBQXFCLEVBQXJCLENBQUo7QUFBQSxLQUF6QixDQUFiOztBQUVBLFFBQUlNLElBQUksQ0FBQyxDQUFELENBQUosS0FBWUEsSUFBSSxDQUFDLENBQUQsQ0FBcEIsRUFBeUI7QUFBQSxVQUNsQkUsU0FBUyxHQUFHakYsSUFBSSxDQUFDa0YsS0FBTCxDQUFXLElBQVgsQ0FETTtBQUFBLFVBRWxCQyxHQUFHLEdBQUdOLFFBQVEsR0FBR0ksU0FBUyxDQUFDaEMsTUFBVixHQUFtQixDQUF0QixHQUEwQixDQUZ0QjtBQUt4QjBCLFVBQUksQ0FBQ1MsSUFBTCxDQUFVLEVBQVYsQ0FMd0IsRUFPeEJILFNBQVMsQ0FBQzNKLE9BQVYsQ0FBa0IsVUFBQzJHLENBQUQsRUFBSW9ELENBQUosRUFBVTtBQUMzQlYsWUFBSSxDQUFDVyxNQUFMLENBQVksT0FBWixFQUNFQyxJQURGLENBQ08sR0FEUCxFQUNZLENBRFosRUFFRUEsSUFGRixDQUVPLElBRlAsWUFFZ0JGLENBQUMsS0FBSyxDQUFOLEdBQVVULEVBQUUsQ0FBQyxDQUFELENBQUYsR0FBUU8sR0FBbEIsR0FBd0JQLEVBQUUsQ0FBQyxDQUFELENBRjFDLFNBR0U1RSxJQUhGLENBR09pQyxDQUhQLENBRDJCO0FBSzNCLE9BTEQsQ0FQd0I7QUFheEI7QUFDRDtBQUNELEM7SUFHS3VELGNBQWMsR0FBRyxVQUFBQyxJQUFJLEVBQUk7QUFDOUI7Ozs7Ozs7QUFEOEIsc0JBUUFBLElBQUksQ0FBQ0MsT0FBTCxFQVJBO0FBQUEsTUFRdkJDLENBUnVCLGlCQVF2QkEsQ0FSdUI7QUFBQSxNQVFwQkMsQ0FSb0IsaUJBUXBCQSxDQVJvQjtBQUFBLE1BUWpCQyxLQVJpQixpQkFRakJBLEtBUmlCO0FBQUEsTUFRVkMsTUFSVSxpQkFRVkEsTUFSVTs7QUFVOUIsU0FBTyxDQUNOO0FBQUNILEtBQUMsRUFBREEsQ0FBRDtBQUFJQyxLQUFDLEVBQUVBLENBQUMsR0FBR0U7QUFBWCxHQURNLEVBQ2M7QUFDcEI7QUFBQ0gsS0FBQyxFQUFEQSxDQUFEO0FBQUlDLEtBQUMsRUFBREE7QUFBSixHQUZNLEVBRUU7QUFDUjtBQUFDRCxLQUFDLEVBQUVBLENBQUMsR0FBR0UsS0FBUjtBQUFlRCxLQUFDLEVBQURBO0FBQWYsR0FITSxFQUdhO0FBQ25CO0FBQUNELEtBQUMsRUFBRUEsQ0FBQyxHQUFHRSxLQUFSO0FBQWVELEtBQUMsRUFBRUEsQ0FBQyxHQUFHRTtBQUF0QixHQUpNLENBSXdCO0FBSnhCLEdBQVA7QUFNQSxDO0lBRUtDLFVBQVUsR0FBRyxVQUFBTixJQUFJLEVBQUk7QUFBQSw4QkFDRkEsSUFBSSxDQUFDTyxxQkFBTCxFQURFO0FBQUEsTUFDbkJILEtBRG1CLHlCQUNuQkEsS0FEbUI7QUFBQSxNQUNaQyxNQURZLHlCQUNaQSxNQURZO0FBQUEsTUFFcEJHLEtBRm9CLEdBRVpULGNBQWMsQ0FBQ0MsSUFBRCxDQUZGO0FBQUEsTUFHcEJFLENBSG9CLEdBR2hCTSxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNOLENBSE87QUFBQSxNQUlwQkMsQ0FKb0IsR0FJaEJuRCxJQUFJLENBQUN5RCxHQUFMLENBQVNELEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0wsQ0FBbEIsRUFBcUJLLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0wsQ0FBOUIsQ0FKZ0I7O0FBTTFCLFNBQU87QUFDTkQsS0FBQyxFQUFEQSxDQURNO0FBQ0hDLEtBQUMsRUFBREEsQ0FERztBQUNBQyxTQUFLLEVBQUxBLEtBREE7QUFDT0MsVUFBTSxFQUFOQTtBQURQLEdBQVA7QUFHQSxDO0lBR0tLLGlCQUFpQixHQUFHLFVBQUFDLEdBQUcsRUFBSTtBQUFBLE1BQzVCQyxTQUFTLEdBQUcsSUFEZ0I7QUFBQSxNQUUxQkMsS0FBSyxHQUFHQyx3RkFGa0I7QUFBQSxNQUcxQkMsSUFBSSxHQUFHSixHQUFHLENBQUNLLE9BQUosSUFBZUwsR0FBRyxDQUFDSSxJQUhBO0FBYWhDLFNBUElGLEtBQUssSUFBSUEsS0FBSyxDQUFDL0MsV0FBTixDQUFrQm1ELElBQWxCLEtBQTJCLFlBT3hDLEdBTkNMLFNBQVMsR0FBR0MsS0FBSyxDQUFDRCxTQU1uQixHQUpXRyxJQUFJLEtBQUtILFNBQVMsR0FBR0csSUFBSSxDQUFDRyxNQUFMLFlBQWdCQyxPQUFLLENBQUN0SyxLQUF0QixHQUErQnFJLElBQS9CLEVBQWpCLENBSWYsS0FIQzBCLFNBQVMsR0FBR1EsNkZBQWdCLENBQUNSLFNBQUQsQ0FHN0IsR0FBT0EsU0FBUDtBQUNBLEM7SUFHS1MsZUFBZSxHQUFHLFVBQUFuQyxJQUFJO0FBQUEsU0FBSUEsSUFBSSxDQUFDb0MsSUFBTCxLQUFjcEMsSUFBSSxDQUFDb0MsSUFBTCxHQUFZcEMsSUFBSSxDQUFDcUIscUJBQUwsRUFBMUIsQ0FBSjtBQUFBLEM7SUFHdEJnQixTQUFTLEdBQUc7QUFBQSxNQUFDQyxLQUFEO0FBQUEsU0FBa0J4RSxJQUFJLENBQUN5RSxNQUFMLE1BQWlCRCxLQUFLLEdBQUcsRUFBSCxHQUFRLENBQTlCLENBQWxCO0FBQUEsQztJQUVaRSxVQUFVLEdBQUcsVUFBQWYsR0FBRyxFQUFJO0FBQ3pCLE1BQU1DLFNBQVMsR0FBR0YsaUJBQWlCLENBQUNDLEdBQUQsQ0FBbkM7QUFEeUIsVUFHckJDLFNBSHFCLElBT2pCQSxTQUFTLENBQUMsQ0FBRCxDQUFULEtBQWlCQSxTQUFTLENBQUMsQ0FBRCxDQVBUO0FBV3pCLEM7SUFFS2UsTUFBTSxHQUFHLFlBQXlCO0FBQUEsTUFBeEJySCxNQUF3Qix1RUFBZixFQUFlO0FBQUEsTUFBWHNILE1BQVc7O0FBQ3ZDLE9BQUssSUFBTUMsQ0FBWCxJQUFnQkQsTUFBaEIsRUFDQ3RILE1BQU0sQ0FBQ3VILENBQUQsQ0FBTixHQUFZRCxNQUFNLENBQUNDLENBQUQsQ0FEbkI7O0FBSUEsU0FBT3ZILE1BQVA7QUFDQSxDO0lBUUt3SCxVQUFVLEdBQUcsVUFBQS9DLEdBQUc7QUFBQSxTQUFJQSxHQUFHLENBQUNnRCxNQUFKLENBQVcsQ0FBWCxFQUFjQyxXQUFkLEtBQThCakQsR0FBRyxDQUFDa0QsS0FBSixDQUFVLENBQVYsQ0FBbEM7QUFBQSxDO0lBUWhCQyxPQUFPLEdBQUcsVUFBQTFGLENBQUM7QUFBQSxTQUFJLEdBQUd5RixLQUFILENBQVNwRCxJQUFULENBQWNyQyxDQUFkLENBQUo7QUFBQSxDO0lBUVgyRixXQUFXLEdBQUcsVUFBQUMsV0FBVyxFQUFJO0FBQ2xDLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBWUEsU0FWQUQsV0FBVyxDQUFDdk0sT0FBWixDQUFvQixVQUFBeU0sS0FBSyxFQUFJO0FBQzVCLFFBQUk7QUFDQ0EsV0FBSyxDQUFDQyxRQUFOLElBQWtCRCxLQUFLLENBQUNDLFFBQU4sQ0FBZS9FLE1BRGxDLEtBRUY2RSxLQUFLLEdBQUdBLEtBQUssQ0FBQ0csTUFBTixDQUFhTixPQUFPLENBQUNJLEtBQUssQ0FBQ0MsUUFBUCxDQUFwQixDQUZOO0FBSUgsS0FKRCxDQUlFLE9BQU9FLENBQVAsRUFBVTtBQUNYQyxhQUFPLENBQUNDLEtBQVIsMENBQWdETCxLQUFLLENBQUNNLElBQXRELGVBQStESCxDQUFDLENBQUNJLFFBQUYsRUFBL0QsRUFEVztBQUVYO0FBQ0QsR0FSRCxDQVVBLEVBQU9SLEtBQVA7QUFDQSxDO0lBUUtTLGNBQWMsR0FBRyxVQUFBNUQsSUFBSSxFQUFJO0FBQUEsTUFDeEI2RCxTQUFTLEdBQUc3RCxJQUFJLEdBQUdBLElBQUksQ0FBQzZELFNBQVIsR0FBb0IsSUFEWjtBQUFBLE1BRXhCQyxPQUFPLEdBQUdELFNBQVMsR0FBR0EsU0FBUyxDQUFDQyxPQUFiLEdBQXVCLEVBRmxCO0FBSTlCLFNBQU9BLE9BQU8sQ0FBQ3hGLE1BQVIsR0FBaUJ3RixPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsQ0FBaEIsRUFBbUJDLE1BQXBDLEdBQTZDO0FBQUNDLEtBQUMsRUFBRSxDQUFKO0FBQU9DLEtBQUMsRUFBRSxDQUFWO0FBQWFDLEtBQUMsRUFBRSxDQUFoQjtBQUFtQmhHLEtBQUMsRUFBRSxDQUF0QjtBQUF5Qm9GLEtBQUMsRUFBRSxDQUE1QjtBQUErQmEsS0FBQyxFQUFFO0FBQWxDLEdBQXBEO0FBQ0EsQztJQVFLQyxTQUFTLEdBQUcsVUFBQUMsSUFBSSxFQUFJO0FBQUEsTUFDbkJDLE1BQU0sR0FBR0QsSUFBSSxDQUFDLENBQUQsQ0FBSixZQUFtQi9GLElBRFQ7QUFBQSxNQUVuQkosQ0FBQyxHQUFHLENBQUNvRyxNQUFNLEdBQUdELElBQUksQ0FBQ2pFLEdBQUwsQ0FBU21FLE1BQVQsQ0FBSCxHQUFzQkYsSUFBN0IsRUFDUkcsTUFEUSxDQUNELFVBQUNuSCxDQUFELEVBQUlvRCxDQUFKLEVBQU81RCxJQUFQO0FBQUEsV0FBZ0JBLElBQUksQ0FBQ3FELE9BQUwsQ0FBYTdDLENBQWIsTUFBb0JvRCxDQUFwQztBQUFBLEdBREMsQ0FGZTtBQUt6QixTQUFPNkQsTUFBTSxHQUFHcEcsQ0FBQyxDQUFDa0MsR0FBRixDQUFNLFVBQUEvQyxDQUFDO0FBQUEsV0FBSSxJQUFJaUIsSUFBSixDQUFTakIsQ0FBVCxDQUFKO0FBQUEsR0FBUCxDQUFILEdBQTZCYSxDQUExQztBQUNBLEM7SUFRS3VHLFVBQVUsR0FBRyxVQUFBL0YsR0FBRztBQUFBLFNBQUtBLEdBQUcsSUFBSUEsR0FBRyxDQUFDTCxNQUFYLEdBQW9CSyxHQUFHLENBQUNnRyxNQUFKLENBQVcsVUFBQ2hDLENBQUQsRUFBSXdCLENBQUo7QUFBQSxXQUFVeEIsQ0FBQyxDQUFDVyxNQUFGLENBQVNhLENBQVQsQ0FBVjtBQUFBLEdBQVgsQ0FBcEIsR0FBd0QsRUFBN0Q7QUFBQSxDO0lBU2hCUyxRQUFRO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBQUcsVUFBQ3hKLE1BQUQsRUFBd0I7QUFBQSxxQ0FBWnlKLE9BQVksd0VBQVpBLE9BQVk7O0FBQ3hDLE1BQUksQ0FBQ0EsT0FBTyxDQUFDdkcsTUFBVCxJQUFvQnVHLE9BQU8sQ0FBQ3ZHLE1BQVIsS0FBbUIsQ0FBbkIsSUFBd0IsQ0FBQ3VHLE9BQU8sQ0FBQyxDQUFELENBQXhELEVBQ0MsT0FBT3pKLE1BQVA7QUFHRCxNQUFNc0gsTUFBTSxHQUFHbUMsT0FBTyxDQUFDQyxLQUFSLEVBQWY7QUFnQkEsU0FkSWhHLFFBQVEsQ0FBQzFELE1BQUQsQ0FBUixJQUFvQjBELFFBQVEsQ0FBQzRELE1BQUQsQ0FjaEMsSUFiQ2pNLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZZ00sTUFBWixFQUFvQi9MLE9BQXBCLENBQTRCLFVBQUFDLEdBQUcsRUFBSTtBQUNsQyxRQUFNeUksS0FBSyxHQUFHcUQsTUFBTSxDQUFDOUwsR0FBRCxDQUFwQjtBQUVJa0ksWUFBUSxDQUFDTyxLQUFELENBSHNCLElBSWpDLENBQUNqRSxNQUFNLENBQUN4RSxHQUFELENBQVAsS0FBaUJ3RSxNQUFNLENBQUN4RSxHQUFELENBQU4sR0FBYyxFQUEvQixDQUppQyxFQUtqQ3dFLE1BQU0sQ0FBQ3hFLEdBQUQsQ0FBTixHQUFjZ08sUUFBUSxDQUFDeEosTUFBTSxDQUFDeEUsR0FBRCxDQUFQLEVBQWN5SSxLQUFkLENBTFcsSUFPakNqRSxNQUFNLENBQUN4RSxHQUFELENBQU4sR0FBYzhILE9BQU8sQ0FBQ1csS0FBRCxDQUFQLEdBQ2JBLEtBQUssQ0FBQ2lFLE1BQU4sRUFEYSxHQUNJakUsS0FSZTtBQVVsQyxHQVZELENBYUQsRUFBT3VGLFFBQVEsTUFBUixVQUFTeEosTUFBVCxTQUFvQnlKLE9BQXBCLEVBQVA7QUFDQSxDQXRCYSxDO0lBK0JSRSxTQUFTLEdBQUcsVUFBQ1QsSUFBRCxFQUF3QjtBQUFBLE1BQ3JDOUUsRUFEcUM7QUFBQSxNQUFqQndGLEtBQWlCO0FBYXpDLFNBVklWLElBQUksQ0FBQyxDQUFELENBQUosWUFBbUIvRixJQVV2QixHQVRDaUIsRUFBRSxHQUFHd0YsS0FBSyxHQUFHLFVBQUNmLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVVELENBQUMsR0FBR0MsQ0FBZDtBQUFBLEdBQUgsR0FBcUIsVUFBQ0QsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUEsQ0FBQyxHQUFHRCxDQUFkO0FBQUEsR0FTaEMsR0FQS2UsS0FBSyxJQUFJLENBQUNWLElBQUksQ0FBQ1csS0FBTCxDQUFXekcsS0FBWCxDQU9mLEdBTkVnQixFQUFFLEdBQUcsVUFBQ3lFLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVVELENBQUMsR0FBR0MsQ0FBZDtBQUFBLEdBTVAsR0FMWSxDQUFDYyxLQUtiLEtBSkV4RixFQUFFLEdBQUcsVUFBQ3lFLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVdELENBQUMsR0FBR0MsQ0FBSixJQUFTLENBQUMsQ0FBWCxJQUFrQkQsQ0FBQyxHQUFHQyxDQUFKLElBQVMsQ0FBM0IsSUFBa0NELENBQUMsS0FBS0MsQ0FBTixJQUFXLENBQXZEO0FBQUEsR0FJUCxHQUFPSSxJQUFJLENBQUNoQixNQUFMLEdBQWM0QixJQUFkLENBQW1CMUYsRUFBbkIsQ0FBUDtBQUNBLEM7SUFTSzJGLFNBQVMsR0FBRyxVQUFDQyxJQUFELEVBQU9kLElBQVAsRUFBZ0I7QUFDakMsTUFBSWUsR0FBRyxHQUFHZixJQUFJLENBQUNHLE1BQUwsQ0FBWSxVQUFBbkgsQ0FBQztBQUFBLFdBQUltQixRQUFRLENBQUNuQixDQUFELENBQVo7QUFBQSxHQUFiLENBQVY7QUFZQSxTQVZJK0gsR0FBRyxDQUFDL0csTUFVUixHQVRLYixRQUFRLENBQUM0SCxHQUFHLENBQUMsQ0FBRCxDQUFKLENBU2IsR0FSRUEsR0FBRyxHQUFHdkgsSUFBSSxDQUFDc0gsSUFBRCxDQUFKLE9BQUF0SCxJQUFJLHFCQUFVdUgsR0FBVixFQVFaLEdBUFlBLEdBQUcsQ0FBQyxDQUFELENBQUgsWUFBa0I5RyxJQU85QixLQU5FOEcsR0FBRyxHQUFHTixTQUFTLENBQUNNLEdBQUQsRUFBTUQsSUFBSSxLQUFLLEtBQWYsQ0FBVCxDQUErQixDQUEvQixDQU1SLElBSENDLEdBQUcsR0FBR0MsU0FHUCxFQUFPRCxHQUFQO0FBQ0EsQztJQVVLRSxRQUFRLEdBQUcsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQTBCO0FBSTFDLFdBSjZCQyxJQUk3Qix1RUFKb0MsQ0FJcEMsRUFITUwsR0FBRyxHQUFHLEVBR1osRUFGTXBILENBQUMsR0FBR0gsSUFBSSxDQUFDNkgsR0FBTCxDQUFTLENBQVQsRUFBWTdILElBQUksQ0FBQ0MsSUFBTCxDQUFVLENBQUMwSCxHQUFHLEdBQUdELEtBQVAsSUFBZ0JFLElBQTFCLENBQVosSUFBK0MsQ0FFekQsRUFBU2hGLENBQUMsR0FBRzhFLEtBQWIsRUFBb0I5RSxDQUFDLEdBQUd6QyxDQUF4QixFQUEyQnlDLENBQUMsRUFBNUIsRUFDQzJFLEdBQUcsQ0FBQ08sSUFBSixDQUFTSixLQUFLLEdBQUc5RSxDQUFDLEdBQUdnRixJQUFyQixDQUREOztBQUlBLFNBQU9MLEdBQVA7QUFDQSxDO0lBR0tRLFlBQVksR0FBRztBQUNwQkMsT0FBSyxFQUFHLFlBQU07QUFDYixRQUFNQyxTQUFTLEdBQUc7QUFBQSxhQUFPO0FBQ3hCQyxlQUFPLElBRGlCO0FBQ1JDLGtCQUFVLElBREY7QUFDV0MsZUFBTyxFQUFFLENBRHBCO0FBQ3VCQyxlQUFPLEVBQUUsQ0FEaEM7QUFDbUNDLGVBQU8sRUFBRSxDQUQ1QztBQUMrQ0MsZUFBTyxFQUFFO0FBRHhELE9BQVA7QUFBQSxLQUFsQjs7QUFJQSxRQUFJO0FBSUgsYUFGQSxJQUFJQyxVQUFKLENBQWUsR0FBZixDQUVBLEVBQU8sVUFBQ0MsRUFBRCxFQUFLQyxTQUFMLEVBQXlDO0FBQUEsWUFBekJDLE1BQXlCLHVFQUFoQlYsU0FBUyxFQUFPO0FBQy9DUSxVQUFFLENBQUNHLGFBQUgsQ0FBaUIsSUFBSUosVUFBSixDQUFlRSxTQUFmLEVBQTBCQyxNQUExQixDQUFqQixDQUQrQztBQUUvQyxPQUZEO0FBR0EsS0FQRCxDQU9FLE9BQU9sRCxDQUFQLEVBQVU7QUFDWDtBQUNBLGFBQU8sVUFBQ2dELEVBQUQsRUFBS0MsU0FBTCxFQUF5QztBQUFBLFlBQXpCQyxNQUF5Qix1RUFBaEJWLFNBQVMsRUFBTztBQUFBLFlBQ3pDWSxVQUFVLEdBQUd2SixHQUFRLENBQUN3SixXQUFULENBQXFCLFlBQXJCLENBRDRCO0FBSS9DRCxrQkFBVSxDQUFDRSxjQUFYLENBQ0NMLFNBREQsRUFFQ0MsTUFBTSxDQUFDVCxPQUZSLEVBR0NTLE1BQU0sQ0FBQ1IsVUFIUixFQUlDbEosR0FKRCxFQUtDLENBTEQsRUFLSTtBQUNIMEosY0FBTSxDQUFDUCxPQU5SLEVBTWlCTyxNQUFNLENBQUNOLE9BTnhCLEVBT0NNLE1BQU0sQ0FBQ0wsT0FQUixFQU9pQkssTUFBTSxDQUFDSixPQVB4QixrQkFRNkIsQ0FSN0IsRUFRZ0MsSUFSaEMsQ0FKK0MsRUFlL0NFLEVBQUUsQ0FBQ0csYUFBSCxDQUFpQkMsVUFBakIsQ0FmK0M7QUFnQi9DLE9BaEJEO0FBaUJBO0FBQ0QsR0FoQ00sRUFEYTtBQWtDcEJHLE9BQUssRUFBRSxlQUFDUCxFQUFELEVBQUtDLFNBQUwsRUFBZ0JDLE1BQWhCLEVBQTJCO0FBQ2pDLFFBQU1NLFFBQVEsR0FBRyxJQUFJQyxLQUFKLENBQVVwQyxRQUFRLENBQUM7QUFDbkNxQyxnQkFBVSxFQUFFMUksSUFBSSxDQUFDMkksR0FBTCxFQUR1QjtBQUVuQzlMLFlBQU0sRUFBRW1MLEVBRjJCO0FBR25DWSxhQUFPLEVBQUUsR0FIMEI7QUFJbkNDLGFBQU8sRUFBRSxHQUowQjtBQUtuQ0MsbUJBQWEsRUFBRSxFQUxvQjtBQU1uQ0MsV0FBSyxFQUFFO0FBTjRCLEtBQUQsRUFPaENiLE1BUGdDLENBQWxCLENBQWpCO0FBU0FGLE1BQUUsQ0FBQ0csYUFBSCxDQUFpQixJQUFJYSxVQUFKLENBQWVmLFNBQWYsRUFBMEI7QUFDMUNQLGdCQUFVLElBRGdDO0FBRTFDRCxhQUFPLElBRm1DO0FBRzFDd0IsY0FBUSxJQUhrQztBQUkxQ0MsYUFBTyxFQUFFLENBQUNWLFFBQUQsQ0FKaUM7QUFLMUNXLG1CQUFhLEVBQUUsRUFMMkI7QUFNMUNDLG9CQUFjLEVBQUUsQ0FBQ1osUUFBRDtBQU4wQixLQUExQixDQUFqQixDQVZpQztBQWtCakM7QUFwRG1CLEM7SUE4RGZhLFVBQVUsR0FBRyxVQUFDQyxHQUFELEVBQU12RCxJQUFOLEVBQWU7QUFDakMsTUFBSWUsR0FBRyxHQUFHd0MsR0FBVjs7QUFFQSxPQUFLLElBQU03RyxDQUFYLElBQWdCc0QsSUFBaEIsRUFDQ2UsR0FBRyxHQUFHQSxHQUFHLENBQUN2RixPQUFKLENBQVksSUFBSWdJLE1BQUosYUFBZ0I5RyxDQUFoQixRQUFzQixHQUF0QixDQUFaLEVBQXdDc0QsSUFBSSxDQUFDdEQsQ0FBRCxDQUE1QyxDQURQOztBQUlBLFNBQU9xRSxHQUFQO0FBQ0EsQzs7Ozs7Ozs7O0FDNWFEOzs7OztBQUlBOzs7Ozs7OztJQVFxQjBDLGUsR0FDcEIsbUJBQWM7QUFDYixtRUFBTztBQUVOOzs7Ozs7Ozs7OztBQVdBQyxVQUFNLEVBQUUxQyxTQWJGOztBQWVOOzs7Ozs7Ozs7QUFTQTJDLFVBQU0sRUFBRSxFQXhCRjs7QUEwQk47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBek4sU0FBSyxFQUFFLEVBOUNEOztBQWdETjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBME4sYUFBUyxFQUFFNUMsU0F4RUw7QUF5RU42QyxhQUFTLEVBQUU3QyxTQXpFTDtBQTBFTjhDLGVBQVcsRUFBRSxFQTFFUDtBQTJFTkMsZ0JBQVksRUFBRS9DLFNBM0VSOztBQTZFTjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkFnRCxlQUFXLEVBQUUsQ0E5RlA7QUErRk5DLGlCQUFhLEVBQUUsQ0EvRlQ7QUFnR05DLGtCQUFjLEVBQUUsQ0FoR1Y7QUFpR05DLGdCQUFZLEVBQUUsQ0FqR1I7O0FBbUdOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBL04sV0FBTyxFQUFFO0FBbElILEdBQVA7QUFvSUEsQzs7OztBQ2xKRjs7Ozs7QUFJQTs7OztBQUllO0FBQ2R4QixZQUFVLEVBQUUsZUFERTtBQUVkNkIsa0JBQWdCLEVBQUUsc0JBRko7QUFHZEMsY0FBWSxFQUFFLGtCQUhBO0FBSWRDLGVBQWEsRUFBRSxtQkFKRDtBQUtkQyxnQkFBYyxFQUFFLG9CQUxGO0FBTWRDLGlCQUFlLEVBQUU7QUFOSCxDQUFmLEU7O0FDUkE7Ozs7O0FBS0EsU0FBU3VOLGFBQVQsQ0FBdUJDLEtBQXZCLEVBQThCbE8sTUFBOUIsRUFBc0M7QUFBRTtBQUN2QztBQUNBO0FBRnFDLE1BRy9CdUcsQ0FBQyxHQUFHMkgsS0FBSyxDQUFDM0gsQ0FIcUI7QUFBQSxNQUkvQkMsQ0FBQyxHQUFHMEgsS0FBSyxDQUFDdEosS0FKcUI7QUFBQSxNQUtqQ3VKLE1BQU0sS0FMMkI7O0FBT3JDLE9BQUssSUFBSWxJLENBQUMsR0FBRyxDQUFSLEVBQVdtSSxDQUFDLEdBQUdwTyxNQUFNLENBQUM2RCxNQUFQLEdBQWdCLENBQXBDLEVBQXVDb0MsQ0FBQyxHQUFHakcsTUFBTSxDQUFDNkQsTUFBbEQsRUFBMER1SyxDQUFDLEdBQUduSSxDQUFDLEVBQS9ELEVBQW1FO0FBQUEsUUFDNURvSSxFQUFFLEdBQUdyTyxNQUFNLENBQUNpRyxDQUFELENBQU4sQ0FBVU0sQ0FENkM7QUFBQSxRQUU1RCtILEVBQUUsR0FBR3RPLE1BQU0sQ0FBQ2lHLENBQUQsQ0FBTixDQUFVTyxDQUY2QztBQUFBLFFBSTVEK0gsRUFBRSxHQUFHdk8sTUFBTSxDQUFDb08sQ0FBRCxDQUFOLENBQVU3SCxDQUo2QztBQUFBLFFBSzVEaUksRUFBRSxHQUFHeE8sTUFBTSxDQUFDb08sQ0FBRCxDQUFOLENBQVU1SCxDQUw2QztBQU85QzhILE1BQUUsR0FBRzlILENBQU4sS0FBY2dJLEVBQUUsR0FBR2hJLENBQXBCLElBQTRCRCxDQUFDLEdBQUcsQ0FBQ2dJLEVBQUUsR0FBR0YsRUFBTixLQUFhN0gsQ0FBQyxHQUFHOEgsRUFBakIsS0FBd0JFLEVBQUUsR0FBR0YsRUFBN0IsSUFBbUNELEVBUG5CLEtBVWpFRixNQUFNLEdBQUcsQ0FBQ0EsTUFWdUQ7QUFZbEU7O0FBRUQsU0FBT0EsTUFBUDtBQUNBOztBQUVELFNBQVNNLGFBQVQsQ0FBdUJqRixDQUF2QixFQUEwQkMsQ0FBMUIsRUFBNkI7QUFBQSxTQUN4QkQsQ0FBQyxDQUFDZ0UsTUFBRixHQUFXL0QsQ0FBQyxDQUFDK0QsTUFEVyxHQUVwQixDQUFDLENBRm1CLEdBS3hCaEUsQ0FBQyxDQUFDZ0UsTUFBRixHQUFXL0QsQ0FBQyxDQUFDK0QsTUFMVyxHQU1wQixDQU5vQixHQVNyQixDQVRxQjtBQVU1Qjs7QUFFRCxTQUFTa0IsYUFBVCxDQUF1QkMsTUFBdkIsRUFBK0I7QUFBRTtBQUtoQyxXQUhJQyxNQUdKLEVBRklDLE1BRUosRUFKSXRTLElBQUksR0FBRyxDQUlYLEVBQVMwSixDQUFDLEdBQUcsQ0FBYixFQUFnQjZJLENBQUMsR0FBR0gsTUFBTSxDQUFDOUssTUFBM0IsRUFBbUN1SyxDQUFDLEdBQUdVLENBQUMsR0FBRyxDQUEzQyxFQUE4QzdJLENBQUMsR0FBRzZJLENBQWxELEVBQXFEVixDQUFDLEdBQUduSSxDQUFKLEVBQU9BLENBQUMsRUFBN0QsRUFDQzJJLE1BQU0sR0FBR0QsTUFBTSxDQUFDMUksQ0FBRCxDQURoQixFQUVDNEksTUFBTSxHQUFHRixNQUFNLENBQUNQLENBQUQsQ0FGaEIsRUFHQzdSLElBQUksSUFBSXFTLE1BQU0sQ0FBQ3JJLENBQVAsR0FBV3NJLE1BQU0sQ0FBQ3JJLENBSDNCLEVBSUNqSyxJQUFJLElBQUlxUyxNQUFNLENBQUNwSSxDQUFQLEdBQVdxSSxNQUFNLENBQUN0SSxDQUozQjs7QUFTQSxTQUZBaEssSUFBSSxJQUFJLENBRVIsRUFBT0EsSUFBUDtBQUNBOztBQUVELFNBQVN3UyxXQUFULENBQXFCSixNQUFyQixFQUE2QjtBQU81QixXQUZJaEYsQ0FFSixFQU5NcE4sSUFBSSxHQUFHbVMsYUFBYSxDQUFDQyxNQUFELENBTTFCLEVBSklwSSxDQUFDLEdBQUcsQ0FJUixFQUhJQyxDQUFDLEdBQUcsQ0FHUixFQUFTUCxDQUFDLEdBQUcsQ0FBYixFQUFnQjZJLENBQUMsR0FBR0gsTUFBTSxDQUFDOUssTUFBM0IsRUFBbUN1SyxDQUFDLEdBQUdVLENBQUMsR0FBRyxDQUEzQyxFQUE4QzdJLENBQUMsR0FBRzZJLENBQWxELEVBQXFEVixDQUFDLEdBQUduSSxDQUFKLEVBQU9BLENBQUMsRUFBN0QsRUFBaUU7QUFBQSxRQUMxRDJJLE1BQU0sR0FBR0QsTUFBTSxDQUFDMUksQ0FBRCxDQUQyQztBQUFBLFFBRTFENEksT0FBTSxHQUFHRixNQUFNLENBQUNQLENBQUQsQ0FGMkM7QUFJaEV6RSxLQUFDLEdBQUdpRixNQUFNLENBQUNySSxDQUFQLEdBQVdzSSxPQUFNLENBQUNySSxDQUFsQixHQUFzQnFJLE9BQU0sQ0FBQ3RJLENBQVAsR0FBV3FJLE1BQU0sQ0FBQ3BJLENBSm9CLEVBS2hFRCxDQUFDLElBQUksQ0FBQ3FJLE1BQU0sQ0FBQ3JJLENBQVAsR0FBV3NJLE9BQU0sQ0FBQ3RJLENBQW5CLElBQXdCb0QsQ0FMbUMsRUFNaEVuRCxDQUFDLElBQUksQ0FBQ29JLE1BQU0sQ0FBQ3BJLENBQVAsR0FBV3FJLE9BQU0sQ0FBQ3JJLENBQW5CLElBQXdCbUQsQ0FObUM7QUFPaEU7O0FBSUQsU0FGQUEsQ0FBQyxHQUFHcE4sSUFBSSxHQUFHLENBRVgsRUFBTztBQUNOZ0ssS0FBQyxFQUFFQSxDQUFDLEdBQUdvRCxDQUREO0FBRU5uRCxLQUFDLEVBQUVBLENBQUMsR0FBR21EO0FBRkQsR0FBUDtBQUlBOzs7Ozs7O0FDaEZEOzs7O0FBSUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7SUFNcUJxRixpQjtBQUNwQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBLCtEQUNsQixLQUFLQSxLQUFMLEdBQWFBLEtBREs7QUFHbEI7QUFDQSxRQUFNQyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsRUFBTixDQUFTL0gsSUFBVCxDQUFjRyxNQUFkLENBQXFCLFdBQXJCLEVBQ2ZyQixNQURlLENBQ1IsR0FEUSxFQUVmQyxJQUZlLENBRVYsT0FGVSxFQUVEcUIsZ0JBQUssQ0FBQ2xILGdCQUZMLENBQWpCO0FBSUE0TyxZQUFRLENBQUNoSixNQUFULENBQWdCLEdBQWhCLEVBQXFCQyxJQUFyQixDQUEwQixPQUExQixFQUFtQ3FCLGdCQUFLLENBQUNoSCxhQUF6QyxDQVJrQixFQVNsQjBPLFFBQVEsQ0FBQ2hKLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUJDLElBQXJCLENBQTBCLE9BQTFCLEVBQW1DcUIsZ0JBQUssQ0FBQzlHLGVBQXpDLENBVGtCO0FBVWxCOzs7O3dDQUVtQjBPLFEsRUFBVTtBQUFBLFVBQ3ZCRCxFQUFFLEdBQUcsS0FBS0YsS0FBTCxDQUFXRSxFQURPO0FBQUEsVUFFdkIvSCxJQUFJLEdBQUcrSCxFQUFFLENBQUMvSCxJQUZhO0FBQUEsVUFHdkJpSSxNQUFNLEdBQUdGLEVBQUUsQ0FBQ0UsTUFIVztBQUFBLFVBSXZCQyxTQUFTLEdBQUdELE1BQU0sQ0FBQ0UsWUFKSTtBQUFBLFVBS3ZCQyxRQUFRLEdBQUcsS0FBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CTixFQUFuQixDQUxZO0FBQUEsVUFNdkJPLFFBQVEsR0FBRyxLQUFLQSxRQUFMLENBQWNELElBQWQsQ0FBbUJOLEVBQW5CLENBTlk7QUFBQSxVQVN2QjVPLFlBQVksR0FBRzZHLElBQUksQ0FBQ0csTUFBTCxZQUFnQkMsZ0JBQUssQ0FBQ2hILGFBQXRCLEdBQ25CbVAsS0FEbUIsQ0FDYixpQkFEYSxFQUNNLG9CQUROLEVBRW5CQyxTQUZtQixZQUVMcEksZ0JBQUssQ0FBQ2pILFlBRkQsR0FHbkJzSixJQUhtQixDQUdkLEtBQUtvRixLQUFMLENBQVdJLE1BQVgsQ0FBa0J0UCxLQUhKLENBVFE7QUFlN0JRLGtCQUFZLENBQUNzUCxJQUFiLEdBQW9CQyxVQUFwQixHQUNFVixRQURGLENBQ1dBLFFBRFgsRUFFRU8sS0FGRixDQUVRLFNBRlIsRUFFbUIsR0FGbkIsRUFHRUksTUFIRixFQWY2QjtBQW9CN0I7QUFDQSxVQUFNQyxpQkFBaUIsR0FBR3pQLFlBQVksQ0FBQzBQLEtBQWIsR0FBcUIvSixNQUFyQixDQUE0QixHQUE1QixDQUExQjtBQUVBOEosdUJBQWlCLENBQUM5SixNQUFsQixDQUF5QixNQUF6QixFQUNFeUosS0FERixDQUNRLFNBRFIsRUFDbUIsR0FEbkIsQ0F2QjZCLEVBMEI3QkssaUJBQWlCLENBQ2ZFLEtBREYsQ0FDUTNQLFlBRFIsRUFFRTRGLElBRkYsQ0FFTyxPQUZQLEVBRWdCLFVBQUF6QyxDQUFDO0FBQUEsZUFBSThELGdCQUFLLENBQUNqSCxZQUFOLElBQXNCbUQsQ0FBQyxTQUFELGNBQWNBLENBQUMsU0FBZixJQUEwQixFQUFoRCxDQUFKO0FBQUEsT0FGakIsRUFHRTZELE1BSEYsQ0FHUyxNQUhULEVBSUV1SSxVQUpGLEdBS0VWLFFBTEYsQ0FLV0EsUUFMWCxFQU1FakosSUFORixDQU1PLElBTlAsRUFNYSxVQUFBekMsQ0FBQztBQUFBLGVBQUs0TCxTQUFTLEdBQUdJLFFBQVEsQ0FBQ2hNLENBQUQsRUFBSSxJQUFKLENBQVgsR0FBdUI4TCxRQUFRLENBQUM5TCxDQUFELEVBQUksSUFBSixDQUE3QztBQUFBLE9BTmQsRUFPRXlDLElBUEYsQ0FPTyxJQVBQLEVBT2EsVUFBQXpDLENBQUM7QUFBQSxlQUFLNEwsU0FBUyxHQUFHSSxRQUFRLENBQUNoTSxDQUFELEVBQUksSUFBSixDQUFYLEdBQXVCOEwsUUFBUSxDQUFDOUwsQ0FBRCxFQUFJLElBQUosQ0FBN0M7QUFBQSxPQVBkLEVBUUV5QyxJQVJGLENBUU8sSUFSUCxFQVFhLFVBQUF6QyxDQUFDO0FBQUEsZUFBSzRMLFNBQVMsR0FBR0UsUUFBUSxDQUFDOUwsQ0FBRCxFQUFJLElBQUosQ0FBWCxHQUF1QmdNLFFBQVEsQ0FBQ2hNLENBQUQsRUFBSSxJQUFKLENBQTdDO0FBQUEsT0FSZCxFQVNFeUMsSUFURixDQVNPLElBVFAsRUFTYSxVQUFBekMsQ0FBQztBQUFBLGVBQUs0TCxTQUFTLEdBQUdFLFFBQVEsQ0FBQzlMLENBQUQsRUFBSSxJQUFKLENBQVgsR0FBdUJnTSxRQUFRLENBQUNoTSxDQUFELEVBQUksSUFBSixDQUE3QztBQUFBLE9BVGQsRUFVRW9NLFVBVkYsR0FXRUgsS0FYRixDQVdRLFNBWFIsRUFXbUIsR0FYbkIsQ0ExQjZCO0FBc0M3Qjs7OzBDQUVxQlAsUSxFQUFVO0FBQUEsVUFDekJELEVBQUUsR0FBRyxLQUFLRixLQUFMLENBQVdFLEVBRFM7QUFBQSxVQUV6Qi9ILElBQUksR0FBRytILEVBQUUsQ0FBQy9ILElBRmU7QUFBQSxVQUd6QmlJLE1BQU0sR0FBR0YsRUFBRSxDQUFDRSxNQUhhO0FBQUEsVUFJekJDLFNBQVMsR0FBR0QsTUFBTSxDQUFDRSxZQUpNO0FBQUEsVUFLekJDLFFBQVEsR0FBRyxLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUJOLEVBQW5CLENBTGM7QUFBQSxVQU16Qk8sUUFBUSxHQUFHLEtBQUtBLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQk4sRUFBbkIsQ0FOYztBQUFBLFVBT3pCZ0IsbUJBQW1CLEdBQUcsS0FBS2xCLEtBQUwsQ0FBV21CLG1CQUFYLENBQStCWCxJQUEvQixDQUFvQ04sRUFBcEMsQ0FQRztBQUFBLFVBVTNCMU8sY0FBYyxHQUFHMkcsSUFBSSxDQUFDRyxNQUFMLFlBQWdCQyxnQkFBSyxDQUFDOUcsZUFBdEIsR0FDbkJrUCxTQURtQixZQUNMcEksZ0JBQUssQ0FBQy9HLGNBREQsR0FFbkJvSixJQUZtQixDQUVkLEtBQUtvRixLQUFMLENBQVdJLE1BQVgsQ0FBa0JwUCxPQUZKLENBVlU7QUFlL0JRLG9CQUFjLENBQUNvUCxJQUFmLEdBQXNCQyxVQUF0QixHQUNFVixRQURGLENBQ1dBLFFBRFgsRUFFRU8sS0FGRixDQUVRLFNBRlIsRUFFbUIsR0FGbkIsRUFHRUksTUFIRixFQWYrQjtBQW9CL0I7QUFDQSxVQUFNTSxtQkFBbUIsR0FBRzVQLGNBQWMsQ0FBQ3dQLEtBQWYsR0FBdUIvSixNQUF2QixDQUE4QixHQUE5QixDQUE1QjtBQUVBbUsseUJBQW1CLENBQUNuSyxNQUFwQixDQUEyQixTQUEzQixFQUNFeUosS0FERixDQUNRLFNBRFIsRUFDbUIsR0FEbkIsQ0F2QitCLEVBMEIvQlUsbUJBQW1CLENBQUNuSyxNQUFwQixDQUEyQixNQUEzQixFQUNFQyxJQURGLENBQ08sV0FEUCxFQUNvQm1KLFNBQVMsR0FBRyxhQUFILEdBQW1CLEVBRGhELEVBRUVLLEtBRkYsQ0FFUSxTQUZSLEVBRW1CLEdBRm5CLENBMUIrQixFQThCL0JsUCxjQUFjLEdBQUc0UCxtQkFBbUIsQ0FBQ0gsS0FBcEIsQ0FBMEJ6UCxjQUExQixDQTlCYyxFQWlDL0JBLGNBQWMsQ0FDWjBGLElBREYsQ0FDTyxPQURQLEVBQ2dCLFVBQUF6QyxDQUFDO0FBQUEsZUFBSThELGdCQUFLLENBQUMvRyxjQUFOLElBQXdCaUQsQ0FBQyxTQUFELGNBQWNBLENBQUMsU0FBZixJQUEwQixFQUFsRCxDQUFKO0FBQUEsT0FEakIsRUFFRTZELE1BRkYsQ0FFUyxTQUZULEVBR0V1SSxVQUhGLEdBSUVWLFFBSkYsQ0FJV0EsUUFKWCxFQUtFakosSUFMRixDQUtPLFFBTFAsRUFLaUIsVUFBQXpDLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNpTCxNQUFGLENBQVMvSSxHQUFULENBQWEsVUFBQWhCLEtBQUs7QUFBQSxpQkFBSSxDQUMxQzBLLFNBQVMsR0FBR0ksUUFBUSxDQUFDOUssS0FBRCxFQUFRLEdBQVIsQ0FBWCxHQUEwQjRLLFFBQVEsQ0FBQzVLLEtBQUQsRUFBUSxHQUFSLENBREQsRUFFMUMwSyxTQUFTLEdBQUdFLFFBQVEsQ0FBQzVLLEtBQUQsRUFBUSxHQUFSLENBQVgsR0FBMEI4SyxRQUFRLENBQUM5SyxLQUFELEVBQVEsR0FBUixDQUZELEVBR3pDMEwsSUFIeUMsQ0FHcEMsR0FIb0MsQ0FBSjtBQUFBLFNBQWxCLEVBR1JBLElBSFEsQ0FHSCxHQUhHLENBQUo7QUFBQSxPQUxsQixFQVNFUixVQVRGLEdBVUVILEtBVkYsQ0FVUSxTQVZSLEVBVW1CLFVBQUFqTSxDQUFDO0FBQUEsZ0JBQVdBLENBQUMsQ0FBQzZNLE9BQUYsR0FBWTdNLENBQUMsQ0FBQzZNLE9BQWQsR0FBd0IsRUFBbkM7QUFBQSxPQVZwQixDQWpDK0IsRUE2Qy9COVAsY0FBYyxDQUFDOEcsTUFBZixDQUFzQixNQUF0QixFQUNFdUksVUFERixHQUVFVixRQUZGLENBRVdBLFFBRlgsRUFHRWpKLElBSEYsQ0FHTyxHQUhQLEVBR1ksVUFBQXpDLENBQUM7QUFBQSxlQUFLNEwsU0FBUyxHQUFHSSxRQUFRLENBQUNYLFdBQVcsQ0FBQ3JMLENBQUMsQ0FBQ2lMLE1BQUgsQ0FBWixFQUF3QixHQUF4QixDQUFYLEdBQTBDYSxRQUFRLENBQUNULFdBQVcsQ0FBQ3JMLENBQUMsQ0FBQ2lMLE1BQUgsQ0FBWixFQUF3QixHQUF4QixDQUFoRTtBQUFBLE9BSGIsRUFJRXhJLElBSkYsQ0FJTyxHQUpQLEVBSVksVUFBQXpDLENBQUM7QUFBQSxlQUFLNEwsU0FBUyxHQUFHRSxRQUFRLENBQUNULFdBQVcsQ0FBQ3JMLENBQUMsQ0FBQ2lMLE1BQUgsQ0FBWixFQUF3QixHQUF4QixDQUFYLEdBQTBDZSxRQUFRLENBQUNYLFdBQVcsQ0FBQ3JMLENBQUMsQ0FBQ2lMLE1BQUgsQ0FBWixFQUF3QixHQUF4QixDQUFoRTtBQUFBLE9BSmIsRUFLRS9OLElBTEYsQ0FLTyxVQUFBOEMsQ0FBQyxFQUFJO0FBQ1YsWUFBSUEsQ0FBQyxDQUFDOUMsSUFBTixFQUFZO0FBQUEscUNBQ2lCdVAsbUJBQW1CLENBQUN6TSxDQUFDLENBQUNpTCxNQUFILENBRHBDO0FBQUEsY0FDSi9KLEtBREksd0JBQ0pBLEtBREk7QUFBQSxjQUNHNEwsVUFESCx3QkFDR0EsVUFESDs7QUFHWCxpQkFBTzlNLENBQUMsQ0FBQzlDLElBQUYsQ0FBT2dFLEtBQVAsRUFBYzRMLFVBQWQsQ0FBUDtBQUNBOztBQUVELGVBQU8sRUFBUDtBQUNBLE9BYkYsRUFjRXJLLElBZEYsQ0FjTyxhQWRQLEVBY3NCLFFBZHRCLEVBZUVBLElBZkYsQ0FlTyxtQkFmUCxFQWU0QixRQWY1QixFQWdCRTJKLFVBaEJGLEdBaUJFSCxLQWpCRixDQWlCUSxTQWpCUixFQWlCbUIsR0FqQm5CLENBN0MrQjtBQStEL0I7Ozs2Q0FFb0M7QUFBQSxVQUFkUCxRQUFjLHVFQUFILENBQUc7QUFDcEMsV0FBS3FCLG1CQUFMLENBQXlCckIsUUFBekIsQ0FEb0MsRUFFcEMsS0FBS3NCLHFCQUFMLENBQTJCdEIsUUFBM0IsQ0FGb0M7QUFHcEM7Ozs2QkFFUTFMLEMsRUFBR2lOLE8sRUFBUztBQUFBLFVBQ2R4QixFQUFFLEdBQUcsSUFEUztBQUFBLFVBRWhCdkssS0FBSyxHQUFHK0wsT0FBTyxHQUFHak4sQ0FBQyxDQUFDaU4sT0FBRCxDQUFKLEdBQWdCeEIsRUFBRSxDQUFDeUIsWUFBSCxDQUFnQmxOLENBQWhCLENBRmY7QUFVcEIsYUFOSXlMLEVBQUUsQ0FBQzBCLFlBQUgsRUFNSixHQUxDak0sS0FBSyxHQUFHdUssRUFBRSxDQUFDMkIsU0FBSCxDQUFhbE0sS0FBYixDQUtULEdBSld1SyxFQUFFLENBQUM0QixhQUFILE1BQXNCaE8sUUFBUSxDQUFDNkIsS0FBRCxDQUl6QyxLQUhDQSxLQUFLLEdBQUd1SyxFQUFFLENBQUNFLE1BQUgsQ0FBVTJCLGlCQUFWLENBQTRCdEwsT0FBNUIsQ0FBb0NoQyxDQUFDLENBQUNrQixLQUF0QyxDQUdULEdBQU92QixJQUFJLENBQUNDLElBQUwsQ0FBVTZMLEVBQUUsQ0FBQzVJLENBQUgsQ0FBSzNCLEtBQUwsQ0FBVixDQUFQO0FBQ0E7Ozs2QkFFUWxCLEMsRUFBR2lOLE8sRUFBUztBQUFBLFVBQ2R4QixFQUFFLEdBQUcsSUFEUztBQUFBLFVBRWQ4QixNQUFNLEdBQUd2TixDQUFDLENBQUNqSCxJQUFGLElBQVVpSCxDQUFDLENBQUNqSCxJQUFGLEtBQVcsSUFBckIsR0FBNEIwUyxFQUFFLENBQUMrQixFQUEvQixHQUFvQy9CLEVBQUUsQ0FBQzNJLENBRmxDO0FBQUEsVUFHZDVCLEtBQUssR0FBRytMLE9BQU8sR0FBR2pOLENBQUMsQ0FBQ2lOLE9BQUQsQ0FBSixHQUFnQnhCLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JsTixDQUFoQixDQUhqQjtBQUtwQixhQUFPTCxJQUFJLENBQUNDLElBQUwsQ0FBVTJOLE1BQU0sQ0FBQ3JNLEtBQUQsQ0FBaEIsQ0FBUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1SkY7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7SUFNcUJ1TSxxQjtBQUNwQixzQkFBWWxDLEtBQVosRUFBbUI7QUFBQSxpRUFDbEIsS0FBS0EsS0FBTCxHQUFhQSxLQURLO0FBRWxCOzs7O3FDQUVnQjtBQUFBLFVBQ1ZFLEVBQUUsR0FBRyxLQUFLRixLQUFMLENBQVdFLEVBRE47QUFBQSxVQUVWRSxNQUFNLEdBQUcsS0FBS0osS0FBTCxDQUFXSSxNQUZWO0FBQUEsVUFHVjFPLE1BQU0sR0FBR3dPLEVBQUUsQ0FBQ3RGLElBQUgsQ0FBUXVILE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FIQztBQUFBLFVBSVYxSyxNQUFNLEdBQUd5SSxFQUFFLENBQUN6SSxNQUFILEdBQVkySSxNQUFNLENBQUN0QixjQUFuQixHQUFvQ3NCLE1BQU0sQ0FBQ3hCLFdBSjFDO0FBQUEsVUFLVndELFFBQVEsR0FBR2hDLE1BQU0sQ0FBQzFCLFdBTFI7QUFBQSxVQU1WMkQsU0FBUyxHQUFHLENBTkY7QUFBQSxVQU9WM0MsTUFBTSxHQUFHN0QsUUFBUSxDQUFDdUUsTUFBTSxDQUFDdEIsY0FBUixFQUF3QnJILE1BQXhCLEVBQWdDNEssU0FBaEMsQ0FQUDtBQUFBLFVBU1ZDLFlBQVksR0FBR0MsOEZBQWlCLENBQUM3USxNQUFNLENBQUM0TSxNQUFSLENBQWpCLENBQ25Ca0UsTUFEbUIsQ0FDWixDQUFDOUMsTUFBTSxDQUFDQSxNQUFNLENBQUM5SyxNQUFQLEdBQWdCLENBQWpCLENBQVAsRUFBNEI4SyxNQUFNLENBQUMsQ0FBRCxDQUFsQyxDQURZLENBVEw7QUFZWixXQUFLbFEsVUFaTyxJQWFmLEtBQUtBLFVBQUwsQ0FBZ0JzUixNQUFoQixFQWJlLEVBZ0JoQixLQUFLdFIsVUFBTCxHQUFrQjBRLEVBQUUsQ0FBQ3VDLEdBQUgsQ0FBT3hMLE1BQVAsQ0FBYyxHQUFkLEVBQ2hCQyxJQURnQixDQUNYLE9BRFcsRUFDRixFQURFLEVBRWhCQSxJQUZnQixDQUVYLFFBRlcsRUFFRE8sTUFGQyxFQUdoQlAsSUFIZ0IsQ0FHWCxPQUhXLEVBR0ZxQixnQkFBSyxDQUFDL0ksVUFISixDQWhCRixFQXFCaEIsS0FBS0EsVUFBTCxDQUFnQnlILE1BQWhCLENBQXVCLEdBQXZCLEVBQ0VDLElBREYsQ0FDTyxXQURQLHlCQUNvQ2tKLE1BQU0sQ0FBQ3hCLFdBRDNDLFFBRUUrQixTQUZGLENBRVksTUFGWixFQUdFL0YsSUFIRixDQUdPOEUsTUFIUCxFQUlFc0IsS0FKRixHQUtFL0osTUFMRixDQUtTLE1BTFQsRUFNRUMsSUFORixDQU1PLEdBTlAsRUFNWSxVQUFDekMsQ0FBRCxFQUFJdUMsQ0FBSjtBQUFBLGVBQVVBLENBQUMsR0FBR3FMLFNBQWQ7QUFBQSxPQU5aLEVBT0VuTCxJQVBGLENBT08sR0FQUCxFQU9ZLENBUFosRUFRRUEsSUFSRixDQVFPLE9BUlAsRUFRZ0JrTCxRQVJoQixFQVNFbEwsSUFURixDQVNPLFFBVFAsRUFTaUJtTCxTQVRqQixFQVVFbkwsSUFWRixDQVVPLE1BVlAsRUFVZSxVQUFBekMsQ0FBQztBQUFBLGVBQUk2TixZQUFZLENBQUM3TixDQUFELENBQWhCO0FBQUEsT0FWaEIsQ0FyQmdCO0FBaUNoQjtBQWpDZ0IsVUFrQ1ZpTyxTQUFTLEdBQUdDLHVGQUFVLEdBQzFCSCxNQURnQixDQUNULENBQUM5USxNQUFNLENBQUNrUixTQUFSLEVBQW1CbFIsTUFBTSxDQUFDbVIsU0FBMUIsQ0FEUyxFQUVoQkMsS0FGZ0IsQ0FFVixDQUNOcEQsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFZVSxNQUFNLENBQUN4QixXQUFuQixHQUFpQ2MsTUFBTSxDQUFDQSxNQUFNLENBQUM5SyxNQUFQLEdBQWdCLENBQWpCLENBQXZDLEdBQTZEeU4sU0FBN0QsR0FBeUUsQ0FEbkUsRUFFTjNDLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWVUsTUFBTSxDQUFDeEIsV0FGYixDQUZVLENBbENGO0FBQUEsVUF5Q1ZtRSxVQUFVLEdBQUdDLHFGQUFXLENBQUNOLFNBQUQsQ0F6Q2Q7QUFBQSxVQTBDVk8sV0FBVyxHQUFHN0MsTUFBTSxDQUFDekIsWUExQ1g7QUE0Q1pzRSxpQkFBVyxLQUFLLE9BNUNKLEdBNkNmRixVQUFVLENBQUNHLFVBQVgsQ0FBc0IsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEdBQVIsRUFBYSxHQUFiLEVBQW1CLEdBQW5CLEVBQTBCLEdBQTFCLEVBQWtDLEdBQWxDLEVBQTJDLEdBQTNDLENBQXRCLENBN0NlLEdBOENMclAsVUFBVSxDQUFDb1AsV0FBRCxDQTlDTCxHQStDZkYsVUFBVSxDQUFDSSxVQUFYLENBQXNCRixXQUF0QixDQS9DZSxHQWlEZkYsVUFBVSxDQUFDSSxVQUFYLENBQXNCQyx3RkFBUSxDQUFDLEdBQUQsQ0FBOUIsQ0FqRGU7QUFvRGhCO0FBQ0EsVUFBTTVWLElBQUksR0FBRyxLQUFLZ0MsVUFBTCxDQUFnQnlILE1BQWhCLENBQXVCLEdBQXZCLEVBQ1hDLElBRFcsQ0FDTixPQURNLEVBQ0csYUFESCxFQUVYQSxJQUZXLENBRU4sV0FGTSxzQkFFb0JrTCxRQUZwQixVQUdYbk0sSUFIVyxDQUdOOE0sVUFITSxDQUFiO0FBS0lFLGlCQUFXLEtBQUssT0ExREosSUEyRGZ6VixJQUFJLENBQUNtVCxTQUFMLENBQWUsWUFBZixFQUNFaFAsSUFERixDQUNPLElBRFAsRUFFRW9KLE1BRkYsQ0FFUyxVQUFBdEcsQ0FBQztBQUFBLGVBQUlBLENBQUMsR0FBR0wsSUFBSSxDQUFDaVAsR0FBTCxDQUFTLEVBQVQsRUFBYWpQLElBQUksQ0FBQ0MsSUFBTCxDQUFVRCxJQUFJLENBQUNrUCxHQUFMLENBQVM3TyxDQUFULElBQWNMLElBQUksQ0FBQ21QLElBQW5CLEdBQTBCLEtBQXBDLENBQWIsQ0FBSixLQUFpRSxDQUFyRTtBQUFBLE9BRlYsRUFFa0Y7QUFGbEYsT0FHRTVSLElBSEYsQ0FHTyxFQUhQLEVBSUVzRixNQUpGLENBSVMsT0FKVCxFQUtFQyxJQUxGLENBS08sSUFMUCxFQUthLE9BTGIsRUFLc0I7QUFMdEIsT0FNRXZGLElBTkYsQ0FNTyxVQUFBOEMsQ0FBQztBQUFBLGVBQUlMLElBQUksQ0FBQ29QLEtBQUwsQ0FBV3BQLElBQUksQ0FBQ2tQLEdBQUwsQ0FBUzdPLENBQVQsSUFBY0wsSUFBSSxDQUFDbVAsSUFBOUIsQ0FBSjtBQUFBLE9BTlIsQ0EzRGUsRUFvRWhCLEtBQUsvVCxVQUFMLENBQWdCMEgsSUFBaEIsQ0FBcUIsV0FBckIsc0JBQStDZ0osRUFBRSxDQUFDdUQsWUFBSCxHQUFrQixLQUFLQyxjQUFMLEVBQWpFLFVBcEVnQjtBQXFFaEI7OztxQ0FFZ0I7QUFDaEIsYUFBTyxLQUFLMUQsS0FBTCxDQUFXSSxNQUFYLENBQWtCdkIsYUFBbEIsR0FDTixLQUFLclAsVUFBTCxDQUFnQjhHLElBQWhCLEdBQXVCZSxPQUF2QixHQUFpQ0csS0FEbEM7QUFFQTs7OzJDQUVzQjtBQUN0QixhQUFPLEtBQUtrTSxjQUFMLEtBQXdCLEtBQUsxRCxLQUFMLENBQVdJLE1BQVgsQ0FBa0JyQixZQUExQyxHQUF5RCxFQUFoRTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0Y7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtGcUI0RSxpQjtBQUNwQixvQkFBWTdXLE9BQVosRUFBcUI7QUFBQTs7QUFJcEIsZ0dBSE1BLE9BR04sR0FGQSxNQUFLc1QsTUFBTCxHQUFjLElBQUkvQixlQUFKLEVBRWQ7QUFDQTs7Ozs7Ozs7a0NBRWE7QUFBQTtBQUFBLFVBQ1A2QixFQUFFLEdBQUcsS0FBS0EsRUFESDs7QUFJYkEsUUFBRSxDQUFDRSxNQUFILENBQVV3RCxVQUFWLEtBSmEsRUFLYjFELEVBQUUsQ0FBQzJELFdBQUgsR0FBaUI7QUFBQTtBQUFBLE9BTEosRUFNYjNELEVBQUUsQ0FBQzRELGFBQUgsR0FBbUIsWUFBTSxDQUFFLENBTmQsRUFPYjVELEVBQUUsQ0FBQzZELFlBQUgsR0FBa0IsVUFBQXRQLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUN1UCxNQUFOO0FBQUEsT0FQTixFQVFiOUQsRUFBRSxDQUFDK0QsZ0JBQUgsR0FBc0I7QUFBQSxlQUFNLENBQU47QUFBQSxPQVJUO0FBVWIsVUFBTUMsc0JBQXNCLEdBQUdoRSxFQUFFLENBQUNnRSxzQkFBSCxDQUEwQjFELElBQTFCLENBQStCTixFQUEvQixDQUEvQjs7QUFFQUEsUUFBRSxDQUFDZ0Usc0JBQUgsR0FBNEI7QUFBQSxlQUMzQkEsc0JBQXNCLE1BQ3JCLE1BQUksQ0FBQzFVLFVBQUwsR0FBa0IsTUFBSSxDQUFDQSxVQUFMLENBQWdCMlUsb0JBQWhCLEVBQWxCLEdBQTJELENBRHRDLENBREs7QUFBQSxPQVpmO0FBaUJiOzs7NEJBRU87QUFDUCxVQUFNakUsRUFBRSxHQUFHLEtBQUtBLEVBQWhCO0FBRUFBLFFBQUUsQ0FBQ2tFLFVBQUgsQ0FBYzVELElBQWQsQ0FBbUIsSUFBbkIsRUFBeUIsS0FBSzFULE9BQTlCLENBSE8sRUFJUG9ULEVBQUUsQ0FBQ21FLEtBQUgsR0FBVyxLQUFLQyxxQkFBTCxDQUEyQjlELElBQTNCLENBQWdDTixFQUFoQyxDQUpKLEVBTVAsS0FBSzFRLFVBQUwsR0FBa0IsSUFBSTBTLHFCQUFKLENBQWUsSUFBZixDQU5YLEVBT1AsS0FBS2pDLFFBQUwsR0FBZ0IsSUFBSUYsaUJBQUosQ0FBYSxJQUFiLENBUFQsRUFTUCxLQUFLd0UsV0FBTCxFQVRPLEVBVVAsS0FBS0MsZ0JBQUwsRUFWTyxFQVdQLEtBQUtDLGtCQUFMLEVBWE8sRUFZUCxLQUFLalYsVUFBTCxDQUFnQmtWLGNBQWhCLEVBWk8sRUFjUCxLQUFLQyxPQUFMLEVBZE87QUFlUDs7OzRCQUVPeEUsUSxFQUFVO0FBQ2pCLFdBQUszUSxVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JrVixjQUFoQixFQURGLEVBRWpCLEtBQUt6RSxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBYzJFLHNCQUFkLENBQXFDekUsUUFBckMsQ0FGQTtBQUdqQjs7O2lDQUVZO0FBQ1osYUFBTyxJQUFJOUIsZUFBSixFQUFQO0FBQ0E7OztrQ0FFYTtBQUFBLFVBQ1B6RCxJQUFJLEdBQUcsS0FBS3NGLEVBQUwsQ0FBUXRGLElBQVIsQ0FBYXVILE9BRGI7QUFBQSxVQUVQNUQsTUFBTSxHQUFHLEtBQUt6UixPQUFMLENBQWF5UixNQUZmO0FBSWIzRCxVQUFJLENBQUMzTixPQUFMLENBQWEsVUFBQXdILENBQUMsRUFBSTtBQUNqQkEsU0FBQyxDQUFDdVAsTUFBRixDQUFTL1csT0FBVCxDQUFpQixVQUFDMkcsQ0FBRCxFQUFJb0QsQ0FBSixFQUFVO0FBQzFCcEQsV0FBQyxDQUFDMkssTUFBRixHQUFXQSxNQUFNLENBQUN2SCxDQUFELENBRFM7QUFFMUIsU0FGRCxDQURpQixFQUtqQnZDLENBQUMsQ0FBQ21PLFNBQUYsR0FBY2hILFNBTEcsRUFNakJuSCxDQUFDLENBQUNvTyxTQUFGLEdBQWNqSCxTQU5HLEVBT2pCbkgsQ0FBQyxDQUFDNkosTUFBRixHQUFXMUMsU0FQTSxFQVFqQm5ILENBQUMsQ0FBQ29RLFVBQUYsR0FBZWpKLFNBUkU7QUFTakIsT0FURCxDQUphO0FBY2I7Ozs2QkFFUW5ILEMsRUFBR2lOLE8sRUFBUztBQUFBLFVBQ2R4QixFQUFFLEdBQUcsSUFEUztBQUFBLFVBR2hCdkssS0FBSyxHQUFHK0wsT0FBTyxHQUFHak4sQ0FBQyxDQUFDaU4sT0FBRCxDQUFKLEdBQWdCeEIsRUFBRSxDQUFDeUIsWUFBSCxDQUFnQmxOLENBQWhCLENBSGY7QUFXcEIsYUFOSXlMLEVBQUUsQ0FBQzBCLFlBQUgsRUFNSixHQUxDak0sS0FBSyxHQUFHdUssRUFBRSxDQUFDMkIsU0FBSCxDQUFhbE0sS0FBYixDQUtULEdBSld1SyxFQUFFLENBQUM0QixhQUFILE1BQXNCaE8sUUFBUSxDQUFDNkIsS0FBRCxDQUl6QyxLQUhDQSxLQUFLLEdBQUd1SyxFQUFFLENBQUNFLE1BQUgsQ0FBVTJCLGlCQUFWLENBQTRCdEwsT0FBNUIsQ0FBb0NoQyxDQUFDLENBQUNrQixLQUF0QyxDQUdULEdBQU92QixJQUFJLENBQUNDLElBQUwsQ0FBVTZMLEVBQUUsQ0FBQzVJLENBQUgsQ0FBSzNCLEtBQUwsQ0FBVixDQUFQO0FBQ0E7Ozs2QkFFUWxCLEMsRUFBR2lOLE8sRUFBUztBQUFBLFVBQ2R4QixFQUFFLEdBQUcsSUFEUztBQUFBLFVBRWQ4QixNQUFNLEdBQUd2TixDQUFDLENBQUNqSCxJQUFGLElBQVVpSCxDQUFDLENBQUNqSCxJQUFGLEtBQVcsSUFBckIsR0FBNEIwUyxFQUFFLENBQUMrQixFQUEvQixHQUFvQy9CLEVBQUUsQ0FBQzNJLENBRmxDO0FBQUEsVUFHZDVCLEtBQUssR0FBRytMLE9BQU8sR0FBR2pOLENBQUMsQ0FBQ2lOLE9BQUQsQ0FBSixHQUFnQnhCLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JsTixDQUFoQixDQUhqQjtBQUtwQixhQUFPTCxJQUFJLENBQUNDLElBQUwsQ0FBVTJOLE1BQU0sQ0FBQ3JNLEtBQUQsQ0FBaEIsQ0FBUDtBQUNBOzs7dUNBRWtCO0FBQUEsVUFDWnlLLE1BQU0sR0FBRyxLQUFLQSxNQURGO0FBQUEsVUFFWjFPLE1BQU0sR0FBRyxLQUFLd08sRUFBTCxDQUFRdEYsSUFBUixDQUFhdUgsT0FBYixDQUFxQixDQUFyQixDQUZHO0FBTWxCelEsWUFBTSxDQUFDc1MsTUFBUCxDQUFjeEksSUFBZCxDQUFtQmdFLGFBQW5CLENBTmtCO0FBUWxCO0FBQ0EsVUFBTWpCLE1BQU0sR0FBRzdNLE1BQU0sQ0FBQ3NTLE1BQVAsQ0FBY3JOLEdBQWQsQ0FBa0IsVUFBQTRELENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNnRSxNQUFOO0FBQUEsT0FBbkIsQ0FBZjtBQUVBN00sWUFBTSxDQUFDa1IsU0FBUCxHQUFvQjlOLEtBQUssQ0FBQ3NMLE1BQU0sQ0FBQzVCLFNBQVIsQ0FBTixHQUE4Q3BLLElBQUksQ0FBQ3lELEdBQUwsT0FBQXpELElBQUkscUJBQVFtSyxNQUFSLEVBQWxELEdBQTJCNkIsTUFBTSxDQUFDNUIsU0FYbkMsRUFZbEI5TSxNQUFNLENBQUNtUixTQUFQLEdBQW9CL04sS0FBSyxDQUFDc0wsTUFBTSxDQUFDM0IsU0FBUixDQUFOLEdBQThDckssSUFBSSxDQUFDNkgsR0FBTCxPQUFBN0gsSUFBSSxxQkFBUW1LLE1BQVIsRUFBbEQsR0FBMkI2QixNQUFNLENBQUMzQixTQVpuQyxFQWNsQi9NLE1BQU0sQ0FBQzRNLE1BQVAsR0FBZ0J6SyxVQUFVLENBQUN1TSxNQUFNLENBQUM5QixNQUFSLENBQVYsR0FDZjhCLE1BQU0sQ0FBQzlCLE1BRFEsR0FDQ3dHLG1IQUFvQixDQUFDQyxrRkFBSyxDQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsRUFBVCxDQUFOLEVBQXFCQSxrRkFBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sRUFBUCxDQUExQixDQWZuQixFQWlCbEJyVCxNQUFNLENBQUNtVCxVQUFQLEdBQW9CRyxpR0FBb0IsQ0FBQ3RULE1BQU0sQ0FBQzRNLE1BQVIsQ0FBcEIsQ0FDbEJrRSxNQURrQixDQUNYLENBQUM5USxNQUFNLENBQUNrUixTQUFSLEVBQW1CbFIsTUFBTSxDQUFDbVIsU0FBMUIsQ0FEVyxDQWpCRjtBQW1CbEI7OzswQ0FFcUJwTyxDLEVBQUc7QUFDeEIsVUFBTS9DLE1BQU0sR0FBRyxLQUFLa0osSUFBTCxDQUFVdUgsT0FBVixDQUFrQixDQUFsQixDQUFmO0FBRUEsYUFBT3pRLE1BQU0sQ0FBQ21ULFVBQVAsQ0FBa0JwUSxDQUFDLENBQUM4SixNQUFwQixDQUFQO0FBQ0E7Ozt5Q0FFb0I7QUFDcEIsVUFBTTZCLE1BQU0sR0FBRyxLQUFLRixFQUFMLENBQVFFLE1BQXZCO0FBRUl6TCxhQUFPLENBQUN5TCxNQUFNLENBQUM2RSxnQkFBUixDQUhTLEtBSW5CN0UsTUFBTSxDQUFDNkUsZ0JBQVAsR0FBMEIsVUFBU3hRLENBQVQsRUFBWXlRLGtCQUFaLEVBQWdDQyxrQkFBaEMsRUFBb0RkLEtBQXBELEVBQTJEO0FBQUE7QUFBQSxZQUNoRnROLElBQUksNEJBQW9Cd0IsT0FBSyxDQUFDekcsT0FBMUIsZUFENEU7O0FBa0JwRixlQWZBMkMsQ0FBQyxDQUFDeEgsT0FBRixDQUFVLFVBQUEyRyxDQUFDLEVBQUk7QUFDZG1ELGNBQUksc0NBQ0ltTyxrQkFBa0IsQ0FBQyxNQUFJLENBQUM5RSxNQUFMLENBQVlnRixNQUFiLENBRHRCLHNEQUVrQkQsa0JBQWtCLENBQUN2UixDQUFDLENBQUMwRCxDQUFILENBRnBDLDJFQUtJNE4sa0JBQWtCLENBQUN0UixDQUFDLENBQUN5UixFQUFILENBTHRCLHNEQU1rQkYsa0JBQWtCLENBQUN2UixDQUFDLENBQUMrQixLQUFILENBTnBDLCtEQVFVNEMsT0FBSyxDQUFDdkcsV0FSaEIsY0FRK0I0QixDQUFDLENBQUN5UixFQVJqQyxrRkFTK0NoQixLQUFLLENBQUN6USxDQUFELENBVHBELHVCQVNtRXNSLGtCQUFrQixDQUFDLFFBQUQsQ0FUckYsc0RBVWtCQyxrQkFBa0IsQ0FBQ3ZSLENBQUMsQ0FBQzJLLE1BQUgsQ0FWcEMsNkJBRFU7QUFhZCxTQWJELENBZUEsWUFBVXhILElBQVY7QUFDQSxPQXZCa0I7QUF5QnBCOzs7d0NBRW1CaEcsTSxFQUFRO0FBQUEsVUFDckJtUCxFQUFFLEdBQUcsSUFEZ0I7QUFBQSxVQUVyQnhPLE1BQU0sR0FBR3dPLEVBQUUsQ0FBQ3RGLElBQUgsQ0FBUXVILE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FGWTtBQUFBLFVBSXJCbUQsS0FBSyxHQUFHNVQsTUFBTSxDQUFDc1MsTUFBUCxDQUFjL0ksTUFBZCxDQUFxQixVQUFDc0ssV0FBRCxFQUFjQyxZQUFkO0FBQUEsZUFDbENELFdBQVcsSUFBVUMsWUFBWSxDQUFDakgsTUFEQTtBQUFBLE9BQXJCLEVBQzhCLENBRDlCLENBSmE7QUFBQSxVQU9yQjVJLEtBQUssR0FBR2pFLE1BQU0sQ0FBQ3NTLE1BQVAsQ0FBYy9JLE1BQWQsQ0FBcUIsVUFBQ3NLLFdBQUQsRUFBY0MsWUFBZCxFQUErQjtBQUFBLGVBQzdEeEcsYUFBYSxDQUFDd0csWUFBRCxFQUFlelUsTUFBZixDQURnRCxHQUV6RHdVLFdBQVcsSUFBVUMsWUFBWSxDQUFDakgsTUFGdUIsR0FLMURnSCxXQUwwRDtBQU1qRSxPQU5hLEVBTVgsQ0FOVyxDQVBhO0FBZTNCLGFBQU87QUFDTjVQLGFBQUssRUFBTEEsS0FETTtBQUVONEwsa0JBQVUsRUFBRTVMLEtBQUssS0FBSyxDQUFWLEdBQWtELENBQWxELEdBQWMsQ0FBQyxDQUFDQSxLQUFLLEdBQUcyUCxLQUFSLEdBQWdCLEdBQWpCLEVBQXNCRyxPQUF0QixDQUE4QixDQUE5QjtBQUZyQixPQUFQO0FBSUE7O0VBcEtvQzVZLHlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDakd2QjtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7QUNQOEM7QUFDL0I7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtCQUFrQixlQUFjO0FBQ2hDLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE2X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE3X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjApO1xuIiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG4pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi4vLi4vaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTBfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHQvKipcblx0ICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG5cdCAqIEBuYW1lIHZlcnNpb25cblx0ICogQHN0YXRpY1xuXHQgKiBAbWVtYmVyb2YgUGx1Z2luXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBleGFtcGxlXG5cdCAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcblx0ICovXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIxLjExLjEtbmlnaHRseS0yMDIwMDQxMDEzMzIwM1wiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gY29uZmlnIGNvbmZpZyBvcHRpb24gb2JqZWN0XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYmVmb3JlSW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYmVmb3JlSW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnaW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkaW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYWZ0ZXJJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRhZnRlckluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3JlZHJhdycgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkcmVkcmF3KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICd3aWxsRGVzdHJveScgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkd2lsbERlc3Ryb3koKSB7XG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0dGhpc1trZXldID0gbnVsbDtcblx0XHRcdGRlbGV0ZSB0aGlzW2tleV07XG5cdFx0fSk7XG5cdH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE2X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xN19fOyIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXlcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5XCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXlcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmRCYWNrZ3JvdW5kOiBcImJiLWxlZ2VuZC1iYWNrZ3JvdW5kXCIsXG5cdGxlZ2VuZEl0ZW06IFwiYmItbGVnZW5kLWl0ZW1cIixcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXG5cdGxlZ2VuZEl0ZW1Gb2N1c2VkOiBcImJiLWxlZ2VuZC1pdGVtLWZvY3VzZWRcIixcblx0bGVnZW5kSXRlbUhpZGRlbjogXCJiYi1sZWdlbmQtaXRlbS1oaWRkZW5cIixcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXG5cdGxlZ2VuZEl0ZW1UaWxlOiBcImJiLWxlZ2VuZC1pdGVtLXRpbGVcIixcblx0bGV2ZWw6IFwiYmItbGV2ZWxcIixcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxuXHRsaW5lOiBcImJiLWxpbmVcIixcblx0bGluZXM6IFwiYmItbGluZXNcIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0em9vbVJlY3Q6IFwiYmItem9vbS1yZWN0XCIsXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBtb2R1bGVcbiAqIEBpZ25vcmVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XG5cblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSkoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5cbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XG5cbmV4cG9ydCB7XG5cdHdpbiBhcyB3aW5kb3csXG5cdGRvYyBhcyBkb2N1bWVudFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xuXG5jb25zdCBpc1ZhbHVlID0gdiA9PiB2IHx8IHYgPT09IDA7XG5jb25zdCBpc0Z1bmN0aW9uID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNTdHJpbmcgPSB2ID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSB2ID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNVbmRlZmluZWQgPSB2ID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNEZWZpbmVkID0gdiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzQm9vbGVhbiA9IHYgPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xuY29uc3QgY2VpbDEwID0gdiA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xuY29uc3QgYXNIYWxmUGl4ZWwgPSBuID0+IE1hdGguY2VpbChuKSArIDAuNTtcbmNvbnN0IGRpZmZEb21haW4gPSBkID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcbmNvbnN0IGlzRW1wdHkgPSBvID0+IChcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXG4pO1xuY29uc3Qgbm90RW1wdHkgPSBvID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNBcnJheSA9IGFyciA9PiBhcnIgJiYgYXJyLmNvbnN0cnVjdG9yID09PSBBcnJheTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcblxuY29uc3QgZ2V0T3B0aW9uID0gKG9wdGlvbnMsIGtleSwgZGVmYXVsdFZhbHVlKSA9PiAoXG5cdGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlXG4pO1xuXG5jb25zdCBoYXNWYWx1ZSA9IChkaWN0LCB2YWx1ZSkgPT4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn07XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FsbEZuID0gKGZuLCAuLi5hcmdzKSA9PiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufTtcblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBzYW5pdGlzZSA9IHN0ciA9PiAoaXNTdHJpbmcoc3RyKSA/IHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cik7XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtCb29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuY29uc3Qgc2V0VGV4dFZhbHVlID0gKG5vZGUsIHRleHQsIGR5ID0gWy0xLCAxXSwgdG9NaWRkbGUgPSBmYWxzZSkgPT4ge1xuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcblx0XHRub2RlLnRleHQodGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XG5cblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xuXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XG5cblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcblx0XHRcdFx0XHQudGV4dCh2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcblxuLy8gc3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXG5jb25zdCBnZXRSZWN0U2VnTGlzdCA9IHBhdGggPT4ge1xuXHQvKlxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xuXHQgKiAqL1xuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcblxuXHRyZXR1cm4gW1xuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxuXHRcdHt4LCB5fSwgLy8gc2VnMVxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xuXHRdO1xufTtcblxuY29uc3QgZ2V0UGF0aEJveCA9IHBhdGggPT4ge1xuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xuXG5cdHJldHVybiB7XG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxuXHR9O1xufTtcblxuLy8gcmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuY29uc3QgZ2V0QnJ1c2hTZWxlY3Rpb24gPSBjdHggPT4ge1xuXHRsZXQgc2VsZWN0aW9uID0gbnVsbDtcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xuXHRjb25zdCBtYWluID0gY3R4LmNvbnRleHQgfHwgY3R4Lm1haW47XG5cblx0Ly8gY2hlY2sgZnJvbSBldmVudFxuXHRpZiAoZXZlbnQgJiYgZXZlbnQuY29uc3RydWN0b3IubmFtZSA9PT0gXCJCcnVzaEV2ZW50XCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59O1xuXG4vLyBHZXQgYm91bmRpbmdDbGllbnRSZWN0LiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cbmNvbnN0IGdldEJvdW5kaW5nUmVjdCA9IG5vZGUgPT4gbm9kZS5yZWN0IHx8IChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblxuLy8gcmV0cnVuIHJhbmRvbSBudW1iZXJcbmNvbnN0IGdldFJhbmRvbSA9IChhc1N0ciA9IHRydWUpID0+IE1hdGgucmFuZG9tKCkgKyAoYXNTdHIgPyBcIlwiIDogMCk7XG5cbmNvbnN0IGJydXNoRW1wdHkgPSBjdHggPT4ge1xuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xuXG5cdGlmIChzZWxlY3Rpb24pIHtcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxuXHRcdC8vIG9uZS1kaW1lbnNpb25hbDogW3gwLCB4MV0gb3IgW3kwLCB5MV1cblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IGV4dGVuZCA9ICh0YXJnZXQgPSB7fSwgc291cmNlKSA9PiB7XG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IHN0ciA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IHZcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHRvQXJyYXkgPSB2ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRDc3NSdWxlcyA9IHN0eWxlU2hlZXRzID0+IHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7U1ZHTWF0cml4fSBtYXRyaXhcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFRyYW5zbGF0aW9uID0gbm9kZSA9PiB7XG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gPyB0cmFuc2Zvcm0uYmFzZVZhbCA6IFtdO1xuXG5cdHJldHVybiBiYXNlVmFsLmxlbmd0aCA/IGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOiB7YTogMCwgYjogMCwgYzogMCwgZDogMCwgZTogMCwgZjogMH07XG59O1xuXG4vKipcbiAqIEdldCB1bmlxdWUgdmFsdWUgZnJvbSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICogQHJldHVybiB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VW5pcXVlID0gZGF0YSA9PiB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn07XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBtZXJnZUFycmF5ID0gYXJyID0+IChhcnIgJiYgYXJyLmxlbmd0aCA/IGFyci5yZWR1Y2UoKHAsIGMpID0+IHAuY29uY2F0KGMpKSA6IFtdKTtcblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3ROXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgbWVyZ2VPYmogPSAodGFyZ2V0LCAuLi5vYmplY3ROKSA9PiB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59O1xuXG4vKipcbiAqIFNvcnQgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgdmFsdWUgdG8gYmUgc29ydGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQXNjIHRydWU6IGFzYywgZmFsc2U6IGRlc2NcbiAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHNvcnRWYWx1ZSA9IChkYXRhLCBpc0FzYyA9IHRydWUpID0+IHtcblx0bGV0IGZuO1xuXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdGZuID0gaXNBc2MgPyAoYSwgYikgPT4gYSAtIGIgOiAoYSwgYikgPT4gYiAtIGE7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gYSAtIGI7XG5cdFx0fSBlbHNlIGlmICghaXNBc2MpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkYXRhLmNvbmNhdCgpLnNvcnQoZm4pO1xufTtcblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybiB7TnVtYmVyfERhdGV8dW5kZWZpbmVkfVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0TWluTWF4ID0gKHR5cGUsIGRhdGEpID0+IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQsIGVuZCwgc3RlcCA9IDEpID0+IHtcblx0Y29uc3QgcmVzID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsLCBldmVudFR5cGUsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMpKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gUG9seWZpbGxzIERPTTQgTW91c2VFdmVudFxuXHRcdFx0cmV0dXJuIChlbCwgZXZlbnRUeXBlLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWwsIGV2ZW50VHlwZSwgcGFyYW1zKSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHRwbFByb2Nlc3MgPSAodHBsLCBkYXRhKSA9PiB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59O1xuXG5leHBvcnQge1xuXHRhc0hhbGZQaXhlbCxcblx0YnJ1c2hFbXB0eSxcblx0Y2FsbEZuLFxuXHRjYXBpdGFsaXplLFxuXHRjZWlsMTAsXG5cdGRpZmZEb21haW4sXG5cdGVtdWxhdGVFdmVudCxcblx0ZXh0ZW5kLFxuXHRnZXRCcnVzaFNlbGVjdGlvbixcblx0Z2V0Qm91bmRpbmdSZWN0LFxuXHRnZXRDc3NSdWxlcyxcblx0Z2V0TWluTWF4LFxuXHRnZXRPcHRpb24sXG5cdGdldFBhdGhCb3gsXG5cdGdldFJhbmRvbSxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlY3RTZWdMaXN0LFxuXHRnZXRUcmFuc2xhdGlvbixcblx0Z2V0VW5pcXVlLFxuXHRoYXNWYWx1ZSxcblx0aXNBcnJheSxcblx0aXNCb29sZWFuLFxuXHRpc0RlZmluZWQsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzTnVtYmVyLFxuXHRpc09iamVjdCxcblx0aXNPYmplY3RUeXBlLFxuXHRpc1N0cmluZyxcblx0aXNVbmRlZmluZWQsXG5cdGlzVmFsdWUsXG5cdG1lcmdlQXJyYXksXG5cdG1lcmdlT2JqLFxuXHRub3RFbXB0eSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBvcHRpb24gY2xhc3NcbiAqIEBjbGFzcyBTdGFuZm9yZE9wdGlvbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBTdGFuZm9yZCBwbHVnaW4gb3B0aW9uc1xuICogQGV4dGVuZHMgUGx1Z2luXG4gKiBAcmV0dXJuIHtTdGFuZm9yZE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgdGhlIGNvbG9yIG9mIHRoZSBjb2xvciBzY2FsZS4gVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMSwgYW5kIHNob3VsZCByZXR1cm4gYSBjb2xvci5cblx0XHRcdCAqIEBuYW1lIGNvbG9yc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0Z1bmN0aW9ufVxuXHRcdFx0ICogQGRlZmF1bHQgdW5kZWZpbmVkXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcblx0XHRcdCAqICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcblx0XHRcdCAqICAgKVxuXHRcdFx0ICovXG5cdFx0XHRjb2xvcnM6IHVuZGVmaW5lZCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTcGVjaWZ5IHRoZSBrZXkgb2YgZXBvY2hzIHZhbHVlcyBpbiB0aGUgZGF0YS5cblx0XHRcdCAqIEBuYW1lIGVwb2Noc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBcdGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXVxuXHRcdFx0Ki9cblx0XHRcdGVwb2NoczogW10sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2hvdyBhZGRpdGlvbmFsIGxpbmVzIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCBsaW5lIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHQgXHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiB8IHgxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyB8XG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IHgyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgIHxcblx0XHRcdCAqIHwgeTIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgbGluZXM6IFtcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0bGluZXM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBzY2FsZSB2YWx1ZXNcblx0XHRcdCAqIEBuYW1lIHNjYWxlXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7T2JqZWN0fVxuIFx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbc2NhbGUubWluPXVuZGVmaW5lZF0gTWluaW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGxvd2VzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbc2NhbGUubWF4PXVuZGVmaW5lZF0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGhpZ2hlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3NjYWxlLndpZHRoPTIwXSBXaWR0aCBvZiB0aGUgY29sb3Igc2NhbGVcblx0XHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfEZ1bmN0aW9ufSBbc2NhbGUuZm9ybWF0PXVuZGVmaW5lZF0gRm9ybWF0IG9mIHRoZSBheGlzIG9mIHRoZSBjb2xvciBzY2FsZS4gVXNlICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMCBvciBhIGN1c3RvbSBmdW5jdGlvbi4gRXhhbXBsZTogZDMuZm9ybWF0KFwiZFwiKVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBzY2FsZToge1xuXHRcdFx0ICogICAgbWF4OiAxMDAwMCxcblx0XHRcdCAqICAgIG1pbjogMSxcblx0XHRcdCAqICAgIHdpZHRoOiA1MDAsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gc3BlY2lmeSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTBcblx0XHRcdCAqICAgIGZvcm1hdDogXCJwb3cxMFwiLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIG9yIHNwZWNpZnkgYSBmb3JtYXQgZnVuY3Rpb25cblx0XHRcdCAqICAgIGZvcm1hdDogZnVuY3Rpb24oeCkge1xuXHRcdFx0ICogICAgXHRyZXR1cm4geCArXCIlXCI7XG5cdFx0XHQgKiAgICB9XG5cdFx0XHQgKiAgfSxcblx0XHRcdCAqL1xuXHRcdFx0c2NhbGVfbWluOiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV9tYXg6IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX3dpZHRoOiAyMCxcblx0XHRcdHNjYWxlX2Zvcm1hdDogdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBwYWRkaW5nIGZvciBjb2xvciBzY2FsZSBlbGVtZW50XG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7T2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtwYWRkaW5nLnRvcD0wXSBUb3AgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy5yaWdodD0wXSBSaWdodCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy5sZWZ0PTBdIExlZnQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgcGFkZGluZzoge1xuXHRcdFx0ICogICAgIHRvcDogMTUsXG5cdFx0XHQgKiAgICAgcmlnaHQ6IDAsXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxuXHRcdFx0ICogICAgIGxlZnQ6IDBcblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRwYWRkaW5nX3RvcDogMCxcblx0XHRcdHBhZGRpbmdfcmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcblx0XHRcdHBhZGRpbmdfbGVmdDogMCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgcmVnaW9ucyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggcmVnaW9uIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHRcdCAqICAgfCBLZXkgfCBUeXBlIHwgRGVmYXVsdCB8IEF0dHJpYnV0ZXMgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiAgIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XG5cdFx0XHQgKiAgIHwgb3BhY2l0eSB8IE51bWJlciB8IGAwLjJgIHwgJmx0O29wdGlvbmFsPiB8IFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIHJlZ2lvbiBhcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgfFxuXHRcdFx0ICogICB8IHRleHQgfCBGdW5jdGlvbiB8ICB8ICZsdDtvcHRpb25hbD4gfCBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYW5kIHBlcmNlbnRhZ2Ugb2YgdGhlIG51bWJlciBvZiBlcG9jaHMgaW4gdGhpcyByZWdpb24uPGJyPlJldHVybiBhIHN0cmluZyB0byBwbGFjZSB0ZXh0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHJlZ2lvbi4gfFxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcblx0XHRcdCAqIEBuYW1lIHJlZ2lvbnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICByZWdpb25zOiBbXG5cdFx0XHQgKiAgICAgICB7XG5cdFx0XHQgKiAgICAgICAgICAgcG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2Vcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogNDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICBdLFxuXHRcdFx0ICogICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuXHRcdFx0ICogICAgICAgICAgICAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcblx0XHRcdCAqICAgICAgICAgICB9LFxuXHRcdFx0ICogICAgICAgICAgIG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG5cdFx0XHQgKiAgICAgICAgICAgY2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG5cdFx0IFx0ICogICAgICAgfSxcblx0XHRcdCAqICAgICAgIC4uLlxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdHJlZ2lvbnM6IFtdXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gcG9pbnRJblJlZ2lvbihwb2ludCwgcmVnaW9uKSB7IC8vIHRoYW5rcyB0bzogaHR0cDovL2JsLm9ja3Mub3JnL2J5Y29mZmUvNTU3NTkwNFxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cblx0Ly8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuXHRjb25zdCB4ID0gcG9pbnQueDtcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xuXHRsZXQgaW5zaWRlID0gZmFsc2U7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcblx0XHRjb25zdCB4aSA9IHJlZ2lvbltpXS54O1xuXHRcdGNvbnN0IHlpID0gcmVnaW9uW2ldLnk7XG5cblx0XHRjb25zdCB4aiA9IHJlZ2lvbltqXS54O1xuXHRcdGNvbnN0IHlqID0gcmVnaW9uW2pdLnk7XG5cblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG5cdFx0aWYgKGludGVyc2VjdCkge1xuXHRcdFx0aW5zaWRlID0gIWluc2lkZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaW5zaWRlO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlRXBvY2hzKGEsIGIpIHtcblx0aWYgKGEuZXBvY2hzIDwgYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRpZiAoYS5lcG9jaHMgPiBiLmVwb2Nocykge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKSB7IC8vIHRoYW5rcyB0bzogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYyODIzMzAvZmluZC1jZW50ZXJwb2ludC1vZi1wb2x5Z29uLWluLWphdmFzY3JpcHRcblx0bGV0IGFyZWEgPSAwO1xuXHRsZXQgcG9pbnQxO1xuXHRsZXQgcG9pbnQyO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRwb2ludDIgPSBwb2ludHNbal07XG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xuXHRcdGFyZWEgLT0gcG9pbnQxLnkgKiBwb2ludDIueDtcblx0fVxuXG5cdGFyZWEgLz0gMjtcblxuXHRyZXR1cm4gYXJlYTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2VudHJvaWQocG9pbnRzKSB7XG5cdGNvbnN0IGFyZWEgPSBnZXRSZWdpb25BcmVhKHBvaW50cyk7XG5cblx0bGV0IHggPSAwO1xuXHRsZXQgeSA9IDA7XG5cdGxldCBmO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdGNvbnN0IHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRjb25zdCBwb2ludDIgPSBwb2ludHNbal07XG5cblx0XHRmID0gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50Mi54ICogcG9pbnQxLnk7XG5cdFx0eCArPSAocG9pbnQxLnggKyBwb2ludDIueCkgKiBmO1xuXHRcdHkgKz0gKHBvaW50MS55ICsgcG9pbnQyLnkpICogZjtcblx0fVxuXG5cdGYgPSBhcmVhICogNjtcblxuXHRyZXR1cm4ge1xuXHRcdHg6IHggLyBmLFxuXHRcdHk6IHkgLyBmXG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGNvbXBhcmVFcG9jaHMsXG5cdGdldENlbnRyb2lkLFxuXHRnZXRSZWdpb25BcmVhLFxuXHRwb2ludEluUmVnaW9uXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gXCIuLi8uLi9pbnRlcm5hbHMvdXRpbFwiO1xuaW1wb3J0IHtnZXRDZW50cm9pZH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGVsZW1lbnQgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMge1xuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gb3duZXIuJCQubWFpbi5zZWxlY3QoXCIuYmItY2hhcnRcIilcblx0XHRcdC5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkRWxlbWVudHMpO1xuXG5cdFx0ZWxlbWVudHMuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRMaW5lcyk7XG5cdFx0ZWxlbWVudHMuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRSZWdpb25zKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pIHtcblx0XHRjb25zdCAkJCA9IHRoaXMub3duZXIuJCQ7XG5cdFx0Y29uc3QgbWFpbiA9ICQkLm1haW47XG5cdFx0Y29uc3QgY29uZmlnID0gJCQuY29uZmlnO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLUxpbmVzXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLnN0YW5mb3JkTGluZXN9YClcblx0XHRcdC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImdlb21ldHJpY3ByZWNpc2lvblwiKVxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lfWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5saW5lcyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRMaW5lLmV4aXQoKS50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG5cdFx0XHQucmVtb3ZlKCk7XG5cblx0XHQvLyBlbnRlclxuXHRcdGNvbnN0IHN0YW5mb3JkTGluZUVudGVyID0gc3RhbmZvcmRMaW5lLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyLmFwcGVuZChcImxpbmVcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXJcblx0XHRcdC5tZXJnZShzdGFuZm9yZExpbmUpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRMaW5lICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwibGluZVwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkxXCIpIDogeHZDdXN0b20oZCwgXCJ4MVwiKSkpXG5cdFx0XHQuYXR0cihcIngyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTJcIikgOiB4dkN1c3RvbShkLCBcIngyXCIpKSlcblx0XHRcdC5hdHRyKFwieTFcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MVwiKSA6IHl2Q3VzdG9tKGQsIFwieTFcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngyXCIpIDogeXZDdXN0b20oZCwgXCJ5MlwiKSkpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbikge1xuXHRcdGNvbnN0ICQkID0gdGhpcy5vd25lci4kJDtcblx0XHRjb25zdCBtYWluID0gJCQubWFpbjtcblx0XHRjb25zdCBjb25maWcgPSAkJC5jb25maWc7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IGNvdW50UG9pbnRzSW5SZWdpb24gPSB0aGlzLm93bmVyLmNvdW50RXBvY2hzSW5SZWdpb24uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1SZWdpb25zXG5cdFx0bGV0IHN0YW5mb3JkUmVnaW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9uc31gKVxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb259YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLnJlZ2lvbnMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkUmVnaW9uLmV4aXQoKS50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG5cdFx0XHQucmVtb3ZlKCk7XG5cblx0XHQvLyBlbnRlclxuXHRcdGNvbnN0IHN0YW5mb3JkUmVnaW9uRW50ZXIgPSBzdGFuZm9yZFJlZ2lvbi5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInBvbHlnb25cIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJ0ZXh0XCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBpc1JvdGF0ZWQgPyBcInJvdGF0ZSgtOTApXCIgOiBcIlwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbiA9IHN0YW5mb3JkUmVnaW9uRW50ZXIubWVyZ2Uoc3RhbmZvcmRSZWdpb24pO1xuXG5cdFx0Ly8gdXBkYXRlXG5cdFx0c3RhbmZvcmRSZWdpb25cblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZFJlZ2lvbiArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcInBvbHlnb25cIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwicG9pbnRzXCIsIGQgPT4gZC5wb2ludHMubWFwKHZhbHVlID0+IFtcblx0XHRcdFx0aXNSb3RhdGVkID8geXZDdXN0b20odmFsdWUsIFwieVwiKSA6IHh2Q3VzdG9tKHZhbHVlLCBcInhcIiksXG5cdFx0XHRcdGlzUm90YXRlZCA/IHh2Q3VzdG9tKHZhbHVlLCBcInhcIikgOiB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpXG5cdFx0XHRdLmpvaW4oXCIsXCIpKS5qb2luKFwiIFwiKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgZCA9PiBTdHJpbmcoZC5vcGFjaXR5ID8gZC5vcGFjaXR5IDogMC4yKSk7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbi5zZWxlY3QoXCJ0ZXh0XCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInhcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikgOiB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSkpXG5cdFx0XHQuYXR0cihcInlcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikgOiB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSkpXG5cdFx0XHQudGV4dChkID0+IHtcblx0XHRcdFx0aWYgKGQudGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IHt2YWx1ZSwgcGVyY2VudGFnZX0gPSBjb3VudFBvaW50c0luUmVnaW9uKGQucG9pbnRzKTtcblxuXHRcdFx0XHRcdHJldHVybiBkLnRleHQodmFsdWUsIHBlcmNlbnRhZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHR9KVxuXHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuXHRcdFx0LmF0dHIoXCJkb21pbmFudC1iYXNlbGluZVwiLCBcIm1pZGRsZVwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uID0gMCkge1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbik7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb24pO1xuXHR9XG5cblx0eHZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmICgkJC5pc1RpbWVTZXJpZXMoKSkge1xuXHRcdFx0dmFsdWUgPSAkJC5wYXJzZURhdGUodmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoJCQuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSAkJC5jb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gJCQueTIgOiAkJC55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcbmltcG9ydCB7Zm9ybWF0IGFzIGQzRm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbCBhcyBkM1NjYWxlU2VxdWVudGlhbCwgc2NhbGVMb2cgYXMgZDNTY2FsZUxvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc0Z1bmN0aW9uLCBnZXRSYW5nZX0gZnJvbSBcIi4uLy4uL2ludGVybmFscy91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTY2FsZSB7XG5cdGNvbnN0cnVjdG9yKG93bmVyKSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXHR9XG5cblx0ZHJhd0NvbG9yU2NhbGUoKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLm93bmVyLiQkO1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRoaXMub3duZXIuY29uZmlnO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblx0XHRjb25zdCBoZWlnaHQgPSAkJC5oZWlnaHQgLSBjb25maWcucGFkZGluZ19ib3R0b20gLSBjb25maWcucGFkZGluZ190b3A7XG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XG5cdFx0Y29uc3QgYmFySGVpZ2h0ID0gNTtcblx0XHRjb25zdCBwb2ludHMgPSBnZXRSYW5nZShjb25maWcucGFkZGluZ19ib3R0b20sIGhlaWdodCwgYmFySGVpZ2h0KTtcblxuXHRcdGNvbnN0IGludmVyc2VTY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLCBwb2ludHNbMF1dKTtcblxuXHRcdGlmICh0aGlzLmNvbG9yU2NhbGUpIHtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5yZW1vdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSAkJC5zdmcuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCA1MClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1MuY29sb3JTY2FsZSk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke2NvbmZpZy5wYWRkaW5nX3RvcH0pYClcblx0XHRcdC5zZWxlY3RBbGwoXCJiYXJzXCIpXG5cdFx0XHQuZGF0YShwb2ludHMpXG5cdFx0XHQuZW50ZXIoKVxuXHRcdFx0LmFwcGVuZChcInJlY3RcIilcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCBiYXJXaWR0aClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCBkID0+IGludmVyc2VTY2FsZShkKSk7XG5cblx0XHQvLyBMZWdlbmQgQXhpc1xuXHRcdGNvbnN0IGF4aXNTY2FsZSA9IGQzU2NhbGVMb2coKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pXG5cdFx0XHQucmFuZ2UoW1xuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3AgKyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICsgYmFySGVpZ2h0IC0gMSxcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wXG5cdFx0XHRdKTtcblxuXHRcdGNvbnN0IGxlZ2VuZEF4aXMgPSBkM0F4aXNSaWdodChheGlzU2NhbGUpO1xuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNjYWxlRm9ybWF0KSkge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KHNjYWxlRm9ybWF0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KGQzRm9ybWF0KFwiZFwiKSk7XG5cdFx0fVxuXG5cdFx0Ly8gRHJhdyBBeGlzXG5cdFx0Y29uc3QgYXhpcyA9IHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHtiYXJXaWR0aH0sMClgKVxuXHRcdFx0LmNhbGwobGVnZW5kQXhpcyk7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0YXhpcy5zZWxlY3RBbGwoXCIudGljayB0ZXh0XCIpXG5cdFx0XHRcdC50ZXh0KG51bGwpXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiBkIC8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCAtIDFlLTEyKSkgPT09IDEpIC8vIFBvd2VyIG9mIFRlblxuXHRcdFx0XHQudGV4dCgxMClcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdC5hdHRyKFwiZHlcIiwgXCItLjdlbVwiKSAvLyBodHRwczovL2JsLm9ja3Mub3JnL21ib3N0b2NrLzY3MzgyMjlcblx0XHRcdFx0LnRleHQoZCA9PiBNYXRoLnJvdW5kKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgkeyQkLmN1cnJlbnRXaWR0aCAtIHRoaXMueEZvckNvbG9yU2NhbGUoKX0sIDApYCk7XG5cdH1cblxuXHR4Rm9yQ29sb3JTY2FsZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5vd25lci5jb25maWcucGFkZGluZ19yaWdodCArXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUubm9kZSgpLmdldEJCb3goKS53aWR0aDtcblx0fVxuXG5cdGdldENvbG9yU2NhbGVQYWRkaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLnhGb3JDb2xvclNjYWxlKCkgKyB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX2xlZnQgKyAyMDtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpbnRlcnBvbGF0ZUhzbExvbmcgYXMgZDNJbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtoc2wgYXMgZDNIc2x9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWxMb2cgYXMgZDNTY2FsZVNlcXVlbnRpYWxMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi8uLi9jb25maWcvY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZ30gZnJvbSBcIi4uLy4uL2ludGVybmFscy91dGlsXCI7XG5pbXBvcnQgUGx1Z2luIGZyb20gXCIuLi9QbHVnaW5cIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIjtcbmltcG9ydCBFbGVtZW50cyBmcm9tIFwiLi9FbGVtZW50c1wiO1xuaW1wb3J0IENvbG9yU2NhbGUgZnJvbSBcIi4vQ29sb3JTY2FsZVwiO1xuaW1wb3J0IHtwb2ludEluUmVnaW9uLCBjb21wYXJlRXBvY2hzfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW5cbiAqIC0gKipOT1RFOioqXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cbiAqICAgLSBJcyBwcmVmZXJhYmxlIHVzZSBgc2NhdHRlcmAgYXMgZGF0YS50eXBlXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiAgIC0gW2QzLWludGVycG9sYXRlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtaW50ZXJwb2xhdGUpXG4gKiAgIC0gW2QzLWNvbG9yXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtY29sb3IpXG4gKiAgIC0gW2QzLXNjYWxlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2NhbGUpXG4gKiAgIC0gW2QzLWJydXNoXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYnJ1c2gpXG4gKiAgIC0gW2QzLWF4aXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1heGlzKVxuICogICAtIFtkMy1mb3JtYXRdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1mb3JtYXQpXG4gKiBAY2xhc3MgcGx1Z2luLXN0YW5mb3JkXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXG4gKiBAcmVxdWlyZXMgZDMtaW50ZXJwb2xhdGVcbiAqIEByZXF1aXJlcyBkMy1jb2xvclxuICogQHJlcXVpcmVzIGQzLXNjYWxlXG4gKiBAcmVxdWlyZXMgZDMtYnJ1c2hcbiAqIEByZXF1aXJlcyBkMy1heGlzXG4gKiBAcmVxdWlyZXMgZDMtZm9ybWF0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBTdGFuZm9yZCBwbHVnaW4gb3B0aW9uc1xuICogQGV4dGVuZHMgUGx1Z2luXG4gKiBAcmV0dXJuIHtTdGFuZm9yZH1cbiAqIEBleGFtcGxlXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICAgICBjb2x1bW5zOiBbIC4uLiBdLFxuICogICAgICAgIHR5cGU6IFwic2NhdHRlclwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcbiAqICAgICAgICAgICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcbiAqICAgICAgICAgICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuICogICAgICAgICAgICksXG4gKiAgICAgICAgICAgZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdLFxuICogICAgICAgICAgIGxpbmVzOiBbXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cbiAqICAgICAgICAgICBdLFxuICogICAgICAgICAgIHNjYWxlOiB7XG4gKiAgICAgICAgICAgXHRtYXg6IDEwMDAwLFxuICogICAgICAgICAgICAgXHRtaW46IDEsXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxuICogICAgICAgICAgICAgXHRmb3JtYXQ6ICdwb3cxMCcsXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XG4gKiAgICAgICAgICAgXHR0b3A6IDE1LFxuICogICAgICAgICAgIFx0cmlnaHQ6IDAsXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXG4gKiAgICAgICAgICAgXHRsZWZ0OiAwXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgXHR7XG4gKiAgICAgICAgICAgICAgIFx0cG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2VcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogNDAsIHk6IDQwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogNDAgfVxuICogICAgICAgICAgICAgICBcdF0sXG4gKiAgICAgICAgICAgICAgIFx0dGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG4gKiAgICAgICAgICAgICAgIFx0ICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuICogICAgICAgICAgICAgICBcdH0sXG4gKiAgICAgICAgICAgICAgIFx0b3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcbiAqICAgICAgICAgICAgICAgXHRjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcbiAqICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgXHQuLi5cbiAqICAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFN0YW5mb3JkIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmRcIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBTdGFuZm9yZCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5mb3JkIGV4dGVuZHMgUGx1Z2luIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGJlZm9yZUluaXQoKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLiQkO1xuXG5cdFx0Ly8gb3ZlcnJpZGUgb24gY29uZmlnIHZhbHVlcyAmIG1ldGhvZHNcblx0XHQkJC5jb25maWcuZGF0YV94U29ydCA9IGZhbHNlO1xuXHRcdCQkLmlzTXVsdGlwbGVYID0gKCkgPT4gdHJ1ZTtcblx0XHQkJC5zaG93R3JpZEZvY3VzID0gKCkgPT4ge307XG5cdFx0JCQubGFiZWxpc2hEYXRhID0gZCA9PiBkLnZhbHVlcztcblx0XHQkJC5vcGFjaXR5Rm9yQ2lyY2xlID0gKCkgPT4gMTtcblxuXHRcdGNvbnN0IGdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0LmJpbmQoJCQpO1xuXG5cdFx0JCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICgpID0+IChcblx0XHRcdGdldEN1cnJlbnRQYWRkaW5nUmlnaHQoKSArIChcblx0XHRcdFx0dGhpcy5jb2xvclNjYWxlID8gdGhpcy5jb2xvclNjYWxlLmdldENvbG9yU2NhbGVQYWRkaW5nKCkgOiAwXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdCRpbml0KCkge1xuXHRcdGNvbnN0ICQkID0gdGhpcy4kJDtcblxuXHRcdCQkLmxvYWRDb25maWcuYmluZCh0aGlzKSh0aGlzLm9wdGlvbnMpO1xuXHRcdCQkLmNvbG9yID0gdGhpcy5nZXRTdGFuZm9yZFBvaW50Q29sb3IuYmluZCgkJCk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JTY2FsZSh0aGlzKTtcblx0XHR0aGlzLmVsZW1lbnRzID0gbmV3IEVsZW1lbnRzKHRoaXMpO1xuXG5cdFx0dGhpcy5jb252ZXJ0RGF0YSgpO1xuXHRcdHRoaXMuaW5pdFN0YW5mb3JkRGF0YSgpO1xuXHRcdHRoaXMuc2V0U3RhbmZvcmRUb29sdGlwKCk7XG5cdFx0dGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cblx0XHR0aGlzLiRyZWRyYXcoKTtcblx0fVxuXG5cdCRyZWRyYXcoZHVyYXRpb24pIHtcblx0XHR0aGlzLmNvbG9yU2NhbGUgJiYgdGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cdFx0dGhpcy5lbGVtZW50cyAmJiB0aGlzLmVsZW1lbnRzLnVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24pO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gbmV3IE9wdGlvbnMoKTtcblx0fVxuXG5cdGNvbnZlcnREYXRhKCkge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiQkLmRhdGEudGFyZ2V0cztcblx0XHRjb25zdCBlcG9jaHMgPSB0aGlzLm9wdGlvbnMuZXBvY2hzO1xuXG5cdFx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xuXHRcdFx0ZC52YWx1ZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHR2LmVwb2NocyA9IGVwb2Noc1tpXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkLm1pbkVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQubWF4RXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9yc2NhbGUgPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRpZiAoJCQuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gJCQucGFyc2VEYXRlKHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKCQkLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gJCQuY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnkyIDogJCQueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxuXG5cdGluaXRTdGFuZm9yZERhdGEoKSB7XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy4kJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHQvLyBUT0RPIFNUQU5GT1JEIHNlZSBpZiAoZGF0YS5qcyAtPiBvcmRlclRhcmdldHMpKyBjYW4gYmUgdXNlZCBpbnN0ZWFkXG5cdFx0Ly8gTWFrZSBsYXJnZXIgdmFsdWVzIGFwcGVhciBvbiB0b3Bcblx0XHR0YXJnZXQudmFsdWVzLnNvcnQoY29tcGFyZUVwb2Nocyk7XG5cblx0XHQvLyBHZXQgYXJyYXkgb2YgZXBvY2hzXG5cdFx0Y29uc3QgZXBvY2hzID0gdGFyZ2V0LnZhbHVlcy5tYXAoYSA9PiBhLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQubWluRXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9taW4pID8gY29uZmlnLnNjYWxlX21pbiA6IE1hdGgubWluKC4uLmVwb2Nocyk7XG5cdFx0dGFyZ2V0Lm1heEVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWF4KSA/IGNvbmZpZy5zY2FsZV9tYXggOiBNYXRoLm1heCguLi5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0LmNvbG9ycyA9IGlzRnVuY3Rpb24oY29uZmlnLmNvbG9ycykgP1xuXHRcdFx0Y29uZmlnLmNvbG9ycyA6IGQzSW50ZXJwb2xhdGVIc2xMb25nKGQzSHNsKDI1MCwgMSwgMC41KSwgZDNIc2woMCwgMSwgMC41KSk7XG5cblx0XHR0YXJnZXQuY29sb3JzY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsTG9nKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSk7XG5cdH1cblxuXHRnZXRTdGFuZm9yZFBvaW50Q29sb3IoZCkge1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0cmV0dXJuIHRhcmdldC5jb2xvcnNjYWxlKGQuZXBvY2hzKTtcblx0fVxuXG5cdHNldFN0YW5mb3JkVG9vbHRpcCgpIHtcblx0XHRjb25zdCBjb25maWcgPSB0aGlzLiQkLmNvbmZpZztcblxuXHRcdGlmIChpc0VtcHR5KGNvbmZpZy50b29sdGlwX2NvbnRlbnRzKSkge1xuXHRcdFx0Y29uZmlnLnRvb2x0aXBfY29udGVudHMgPSBmdW5jdGlvbihkLCBkZWZhdWx0VGl0bGVGb3JtYXQsIGRlZmF1bHRWYWx1ZUZvcm1hdCwgY29sb3IpIHtcblx0XHRcdFx0bGV0IGh0bWwgPSBgPHRhYmxlIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwfVwiPjx0Ym9keT5gO1xuXG5cdFx0XHRcdGQuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRodG1sICs9IGA8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh0aGlzLmNvbmZpZy5kYXRhX3gpfTwvdGg+XG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi54KX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0cj5cblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KHYuaWQpfTwvdGg+XG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi52YWx1ZSl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHIgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXBOYW1lfS0ke3YuaWR9XCI+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5hbWVcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtjb2xvcih2KX1cIj48L3NwYW4+JHtkZWZhdWx0VGl0bGVGb3JtYXQoXCJFcG9jaHNcIil9PC90ZD5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LmVwb2Nocyl9PC90ZD5cblx0XHRcdFx0XHRcdDwvdHI+YDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGAke2h0bWx9PC90Ym9keT48L3RhYmxlPmA7XG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdGNvdW50RXBvY2hzSW5SZWdpb24ocmVnaW9uKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdGNvbnN0IHRvdGFsID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+XG5cdFx0XHRhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKSwgMCk7XG5cblx0XHRjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiB7XG5cdFx0XHRpZiAocG9pbnRJblJlZ2lvbihjdXJyZW50VmFsdWUsIHJlZ2lvbikpIHtcblx0XHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdFx0fSwgMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWUsXG5cdFx0XHRwZXJjZW50YWdlOiB2YWx1ZSAhPT0gMCA/ICsodmFsdWUgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgxKSA6IDBcblx0XHR9O1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn0iLCJpbXBvcnQgc2V0UHJvdG90eXBlT2YgZnJvbSBcIi4vc2V0UHJvdG90eXBlT2ZcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9