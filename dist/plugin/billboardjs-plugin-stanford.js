/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 1.11.1-nightly-20200530141107
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
  if (n === "Map" || n === "Set") return Array.from(o);
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Plugin, "version", "1.11.1-nightly-20200530141107");



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

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);

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
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
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








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var result, Super = Object(getPrototypeOf["a" /* default */])(Derived); if (hasNativeReflectConstruct) { var NewTarget = Object(getPrototypeOf["a" /* default */])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else result = Super.apply(this, arguments); return Object(possibleConstructorReturn["a" /* default */])(this, result); }; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9QbHVnaW4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2ludGVybmFscy9icm93c2VyLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvaW50ZXJuYWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL3N0YW5mb3JkL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHMuanMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsInYiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNEZWZpbmVkIiwiaXNCb29sZWFuIiwiY2VpbDEwIiwiTWF0aCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzT2JqZWN0VHlwZSIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsInZhbHVlIiwiZm91bmQiLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsInNhbml0aXNlIiwic3RyIiwicmVwbGFjZSIsInNldFRleHRWYWx1ZSIsIm5vZGUiLCJkeSIsInRvTWlkZGxlIiwiaW5kZXhPZiIsImRpZmYiLCJtYXAiLCJtdWx0aWxpbmUiLCJzcGxpdCIsImxlbiIsImh0bWwiLCJpIiwiYXBwZW5kIiwiYXR0ciIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0UGF0aEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1zIiwibWluIiwiZ2V0QnJ1c2hTZWxlY3Rpb24iLCJjdHgiLCJzZWxlY3Rpb24iLCJldmVudCIsImQzRXZlbnQiLCJtYWluIiwiY29udGV4dCIsIm5hbWUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiZXh0ZW5kIiwic291cmNlIiwicCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJhIiwiYiIsImMiLCJmIiwiZ2V0VW5pcXVlIiwiZGF0YSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJyZWR1Y2UiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzaGlmdCIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJzb3J0IiwiZ2V0TWluTWF4IiwidHlwZSIsInJlcyIsInVuZGVmaW5lZCIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwibWF4IiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsImluc2lkZSIsImoiLCJ4aSIsInlpIiwieGoiLCJ5aiIsImNvbXBhcmVFcG9jaHMiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiRWxlbWVudHMiLCJvd25lciIsImVsZW1lbnRzIiwiJCQiLCJkdXJhdGlvbiIsImNvbmZpZyIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJleGl0IiwidHJhbnNpdGlvbiIsInJlbW92ZSIsInN0YW5mb3JkTGluZUVudGVyIiwiZW50ZXIiLCJtZXJnZSIsImNvdW50UG9pbnRzSW5SZWdpb24iLCJjb3VudEVwb2Noc0luUmVnaW9uIiwic3RhbmZvcmRSZWdpb25FbnRlciIsImpvaW4iLCJvcGFjaXR5IiwicGVyY2VudGFnZSIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJ4eVZhbHVlIiwiZ2V0QmFzZVZhbHVlIiwiaXNUaW1lU2VyaWVzIiwicGFyc2VEYXRlIiwiaXNDYXRlZ29yaXplZCIsImF4aXNfeF9jYXRlZ29yaWVzIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwidGFyZ2V0cyIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJ0aWNrRm9ybWF0IiwiZDNGb3JtYXQiLCJwb3ciLCJsb2ciLCJMTjEwIiwicm91bmQiLCJjdXJyZW50V2lkdGgiLCJ4Rm9yQ29sb3JTY2FsZSIsIlN0YW5mb3JkIiwiZGF0YV94U29ydCIsImlzTXVsdGlwbGVYIiwic2hvd0dyaWRGb2N1cyIsImxhYmVsaXNoRGF0YSIsInZhbHVlcyIsIm9wYWNpdHlGb3JDaXJjbGUiLCJnZXRDdXJyZW50UGFkZGluZ1JpZ2h0IiwiZ2V0Q29sb3JTY2FsZVBhZGRpbmciLCJsb2FkQ29uZmlnIiwiY29sb3IiLCJnZXRTdGFuZm9yZFBvaW50Q29sb3IiLCJjb252ZXJ0RGF0YSIsImluaXRTdGFuZm9yZERhdGEiLCJzZXRTdGFuZm9yZFRvb2x0aXAiLCJkcmF3Q29sb3JTY2FsZSIsIiRyZWRyYXciLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwiY29sb3JzY2FsZSIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsInRvb2x0aXBfY29udGVudHMiLCJkZWZhdWx0VGl0bGVGb3JtYXQiLCJkZWZhdWx0VmFsdWVGb3JtYXQiLCJkYXRhX3giLCJpZCIsInRvdGFsIiwiYWNjdW11bGF0b3IiLCJjdXJyZW50VmFsdWUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFrRDtBQUNu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QUFLLEtBQUssQ0FBVixHQUFrRCxDQUFsRCxHQUFjLENBQUMsQ0FBQ0EsS0FBSyxHQUFHNFAsS0FBUixHQUFnQixHQUFqQixFQUFzQkcsT0FBdEIsQ0FBOEIsQ0FBOUI7QUFGckIsT0FBUDtBQUlBOztFQXBLb0M3WSx5Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2pHdkI7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7O0FDUDhDO0FBQy9CO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsZUFBYztBQUNoQyxDIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWludGVycG9sYXRlXCIpLCByZXF1aXJlKFwiZDMtY29sb3JcIiksIHJlcXVpcmUoXCJkMy1zY2FsZVwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtYXhpc1wiKSwgcmVxdWlyZShcImQzLWZvcm1hdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInN0YW5mb3JkXCIsIFtcImQzLXNlbGVjdGlvblwiLCBcImQzLWludGVycG9sYXRlXCIsIFwiZDMtY29sb3JcIiwgXCJkMy1zY2FsZVwiLCBcImQzLWJydXNoXCIsIFwiZDMtYXhpc1wiLCBcImQzLWZvcm1hdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzdGFuZm9yZFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWludGVycG9sYXRlXCIpLCByZXF1aXJlKFwiZDMtY29sb3JcIiksIHJlcXVpcmUoXCJkMy1zY2FsZVwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtYXhpc1wiKSwgcmVxdWlyZShcImQzLWZvcm1hdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1wic3RhbmZvcmRcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xN19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIwKTtcbiIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXlcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4uLy4uL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IGFzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tIFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEwX187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcblx0LyoqXG5cdCAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuXHQgKiBAbmFtZSB2ZXJzaW9uXG5cdCAqIEBzdGF0aWNcblx0ICogQG1lbWJlcm9mIFBsdWdpblxuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKiBAZXhhbXBsZVxuXHQgKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG5cdCAqL1xuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMS4xMS4xLW5pZ2h0bHktMjAyMDA1MzAxNDExMDdcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IGNvbmZpZyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTdfXzsiLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5XCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWRcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0YXJjOiBcImJiLWFyY1wiLFxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcblx0YXJjczogXCJiYi1hcmNzXCIsXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxuXHRheGlzOiBcImJiLWF4aXNcIixcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXG5cdGF4aXNZOiBcImJiLWF4aXMteVwiLFxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXG5cdGF4aXNZTGFiZWw6IFwiYmItYXhpcy15LWxhYmVsXCIsXG5cdGJhcjogXCJiYi1iYXJcIixcblx0YmFyczogXCJiYi1iYXJzXCIsXG5cdGJydXNoOiBcImJiLWJydXNoXCIsXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcblx0Y2hhcnQ6IFwiYmItY2hhcnRcIixcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXG5cdGNoYXJ0QXJjc0JhY2tncm91bmQ6IFwiYmItY2hhcnQtYXJjcy1iYWNrZ3JvdW5kXCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVW5pdDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXVuaXRcIixcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcblx0Y2hhcnRCYXI6IFwiYmItY2hhcnQtYmFyXCIsXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXG5cdGNoYXJ0TGluZTogXCJiYi1jaGFydC1saW5lXCIsXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxuXHRjaGFydFJhZGFyczogXCJiYi1jaGFydC1yYWRhcnNcIixcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxuXHRjaXJjbGU6IFwiYmItY2lyY2xlXCIsXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxuXHRlbXB0eTogXCJiYi1lbXB0eVwiLFxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXG5cdGV2ZW50UmVjdHNNdWx0aXBsZTogXCJiYi1ldmVudC1yZWN0cy1tdWx0aXBsZVwiLFxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcblx0Z2F1Z2VWYWx1ZTogXCJiYi1nYXVnZS12YWx1ZVwiLFxuXHRncmlkOiBcImJiLWdyaWRcIixcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdHJlZ2lvbjogXCJiYi1yZWdpb25cIixcblx0cmVnaW9uczogXCJiYi1yZWdpb25zXCIsXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxuXHRzZWxlY3RlZENpcmNsZXM6IFwiYmItc2VsZWN0ZWQtY2lyY2xlc1wiLFxuXHRzaGFwZTogXCJiYi1zaGFwZVwiLFxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIixcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxuXHR0ZXh0OiBcImJiLXRleHRcIixcblx0dGV4dHM6IFwiYmItdGV4dHNcIixcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXG5cdHRvb2x0aXBDb250YWluZXI6IFwiYmItdG9vbHRpcC1jb250YWluZXJcIixcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXG5cdHhncmlkRm9jdXM6IFwiYmIteGdyaWQtZm9jdXNcIixcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxuXHR4Z3JpZHM6IFwiYmIteGdyaWRzXCIsXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcblx0eWdyaWRMaW5lOiBcImJiLXlncmlkLWxpbmVcIixcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXG5cdHpvb21CcnVzaDogXCJiYi16b29tLWJydXNoXCIsXG5cdHpvb21SZWN0OiBcImJiLXpvb20tcmVjdFwiLFxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBXaW5kb3cgb2JqZWN0XG4gKiBAbW9kdWxlXG4gKiBAaWdub3JlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuY29uc3Qgd2luID0gKCgpID0+IHtcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xuXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuXG5leHBvcnQge1xuXHR3aW4gYXMgd2luZG93LFxuXHRkb2MgYXMgZG9jdW1lbnRcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuY29uc3QgaXNWYWx1ZSA9IHYgPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9IHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9IHYgPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0Jvb2xlYW4gPSB2ID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9IHYgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gbiA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gZCA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9IHYgPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gbyA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gbyA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSBhcnIgPT4gYXJyICYmIGFyci5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbmNvbnN0IGdldE9wdGlvbiA9IChvcHRpb25zLCBrZXksIGRlZmF1bHRWYWx1ZSkgPT4gKFxuXHRpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZVxuKTtcblxuY29uc3QgaGFzVmFsdWUgPSAoZGljdCwgdmFsdWUpID0+IHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59O1xuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhbGxGbiA9IChmbiwgLi4uYXJncykgPT4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn07XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuY29uc3Qgc2FuaXRpc2UgPSBzdHIgPT4gKGlzU3RyaW5nKHN0cikgPyBzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHIpO1xuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHNldFRleHRWYWx1ZSA9IChub2RlLCB0ZXh0LCBkeSA9IFstMSwgMV0sIHRvTWlkZGxlID0gZmFsc2UpID0+IHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIHN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuY29uc3QgZ2V0UmVjdFNlZ0xpc3QgPSBwYXRoID0+IHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn07XG5cbmNvbnN0IGdldFBhdGhCb3ggPSBwYXRoID0+IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn07XG5cbi8vIHJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbmNvbnN0IGdldEJydXNoU2VsZWN0aW9uID0gY3R4ID0+IHtcblx0bGV0IHNlbGVjdGlvbiA9IG51bGw7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9IGN0eC5jb250ZXh0IHx8IGN0eC5tYWluO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQnJ1c2hFdmVudFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufTtcblxuLy8gR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC4gQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSBub2RlID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbi8vIHJldHJ1biByYW5kb20gbnVtYmVyXG5jb25zdCBnZXRSYW5kb20gPSAoYXNTdHIgPSB0cnVlKSA9PiBNYXRoLnJhbmRvbSgpICsgKGFzU3RyID8gXCJcIiA6IDApO1xuXG5jb25zdCBicnVzaEVtcHR5ID0gY3R4ID0+IHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBleHRlbmQgPSAodGFyZ2V0ID0ge30sIHNvdXJjZSkgPT4ge1xuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhcGl0YWxpemUgPSBzdHIgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSB2XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gdiA9PiBbXS5zbGljZS5jYWxsKHYpO1xuXG4vKipcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0Q3NzUnVsZXMgPSBzdHlsZVNoZWV0cyA9PiB7XG5cdGxldCBydWxlcyA9IFtdO1xuXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcnVsZXM7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcbiAqIEByZXR1cm4ge0FycmF5fSBVbmlxdWUgYXJyYXkgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFVuaXF1ZSA9IGRhdGEgPT4ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59O1xuXG4vKipcbiAqIE1lcmdlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgbWVyZ2VBcnJheSA9IGFyciA9PiAoYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXSk7XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0TlxuICogQHJldHVybnMge09iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IG1lcmdlT2JqID0gKHRhcmdldCwgLi4ub2JqZWN0TikgPT4ge1xuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xufTtcblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBzb3J0VmFsdWUgPSAoZGF0YSwgaXNBc2MgPSB0cnVlKSA9PiB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn07XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm4ge051bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldE1pbk1heCA9ICh0eXBlLCBkYXRhKSA9PiB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogR2V0IHJhbmdlXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gZW5kIEVuZCBudW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwIFN0ZXAgbnVtYmVyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0LCBlbmQsIHN0ZXAgPSAxKSA9PiB7XG5cdGNvbnN0IHJlcyA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbCwgZXZlbnRUeXBlLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWwsIGV2ZW50VHlwZSwgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdGV2ZW50VHlwZSxcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcblx0XHRcdFx0XHR3aW5kb3csXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXG5cdFx0XHRcdFx0cGFyYW1zLmNsaWVudFgsIHBhcmFtcy5jbGllbnRZLFxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KSgpLFxuXHR0b3VjaDogKGVsLCBldmVudFR5cGUsIHBhcmFtcykgPT4ge1xuXHRcdGNvbnN0IHRvdWNoT2JqID0gbmV3IFRvdWNoKG1lcmdlT2JqKHtcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXG5cdFx0XHR0YXJnZXQ6IGVsLFxuXHRcdFx0cmFkaXVzWDogMi41LFxuXHRcdFx0cmFkaXVzWTogMi41LFxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXG5cdFx0XHRmb3JjZTogMC41XG5cdFx0fSwgcGFyYW1zKSk7XG5cblx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBUb3VjaEV2ZW50KGV2ZW50VHlwZSwge1xuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRzaGlmdEtleTogdHJ1ZSxcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcblx0XHRcdGNoYW5nZWRUb3VjaGVzOiBbdG91Y2hPYmpdXG5cdFx0fSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlICAmIHJldHVybiBib3VuZCBzdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0cGxQcm9jZXNzID0gKHRwbCwgZGF0YSkgPT4ge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRkaWZmRG9tYWluLFxuXHRlbXVsYXRlRXZlbnQsXG5cdGV4dGVuZCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzQm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgU3RhbmZvcmRPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBleHRlbmRzIFBsdWdpblxuICogQHJldHVybiB7U3RhbmZvcmRPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG5cdFx0XHQgKiAgIClcblx0XHRcdCAqL1xuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXG5cdFx0XHQgKiBAbmFtZSBlcG9jaHNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cblx0XHRcdCovXG5cdFx0XHRlcG9jaHM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0IFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCB4MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzICB8XG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGxpbmVzOiBbXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdGxpbmVzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2NhbGUgdmFsdWVzXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge09iamVjdH1cbiBcdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtzY2FsZS53aWR0aD0yMF0gV2lkdGggb2YgdGhlIGNvbG9yIHNjYWxlXG5cdFx0XHQgKiBAcHJvcGVydHkge1N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgc2NhbGU6IHtcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXG5cdFx0XHQgKiAgICBtaW46IDEsXG5cdFx0XHQgKiAgICB3aWR0aDogNTAwLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXG5cdFx0XHQgKiAgICBmb3JtYXQ6IFwicG93MTBcIixcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXG5cdFx0XHQgKiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHgpIHtcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xuXHRcdFx0ICogICAgfVxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHNjYWxlX21pbjogdW5kZWZpbmVkLFxuXHRcdFx0c2NhbGVfbWF4OiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV93aWR0aDogMjAsXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IHVuZGVmaW5lZCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgcGFkZGluZyBmb3IgY29sb3Igc2NhbGUgZWxlbWVudFxuXHRcdFx0ICogQG5hbWUgcGFkZGluZ1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge09iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy50b3A9MF0gVG9wIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcucmlnaHQ9MF0gUmlnaHQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy5ib3R0b209MF0gQm90dG9tIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcubGVmdD0wXSBMZWZ0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHBhZGRpbmc6IHtcblx0XHRcdCAqICAgICB0b3A6IDE1LFxuXHRcdFx0ICogICAgIHJpZ2h0OiAwLFxuXHRcdFx0ICogICAgIGJvdHRvbTogMCxcblx0XHRcdCAqICAgICBsZWZ0OiAwXG5cdFx0XHQgKiAgfSxcblx0XHRcdCAqL1xuXHRcdFx0cGFkZGluZ190b3A6IDAsXG5cdFx0XHRwYWRkaW5nX3JpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZ19ib3R0b206IDAsXG5cdFx0XHRwYWRkaW5nX2xlZnQ6IDAsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2hvdyBhZGRpdGlvbmFsIHJlZ2lvbnMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIHJlZ2lvbiBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiAgIHwgS2V5IHwgVHlwZSB8IERlZmF1bHQgfCBBdHRyaWJ1dGVzIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogICB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiAgIHwgcG9pbnRzIHwgQXJyYXkgfCAgfCB8IEFjY2VwdHMgYSBncm91cCBvZiBvYmplY3RzIHRoYXQgaGFzIHggYW5kIHkuPGJyPlRoZXNlIHBvaW50cyBzaG91bGQgYmUgYWRkZWQgaW4gYSBjb3VudGVyLWNsb2Nrd2lzZSBmYXNoaW9uIHRvIG1ha2UgYSBjbG9zZWQgcG9seWdvbi4gfFxuXHRcdFx0ICogICB8IG9wYWNpdHkgfCBOdW1iZXIgfCBgMC4yYCB8ICZsdDtvcHRpb25hbD4gfCBTZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSByZWdpb24gYXMgdmFsdWUgYmV0d2VlbiAwIGFuZCAxIHxcblx0XHRcdCAqICAgfCB0ZXh0IHwgRnVuY3Rpb24gfCAgfCAmbHQ7b3B0aW9uYWw+IHwgVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGFuZCBwZXJjZW50YWdlIG9mIHRoZSBudW1iZXIgb2YgZXBvY2hzIGluIHRoaXMgcmVnaW9uLjxicj5SZXR1cm4gYSBzdHJpbmcgdG8gcGxhY2UgdGV4dCBpbiB0aGUgbWlkZGxlIG9mIHRoZSByZWdpb24uIHxcblx0XHRcdCAqICAgfCBjbGFzcyB8IFN0cmluZyB8IHwgJmx0O29wdGlvbmFsPiB8IFNlIGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIHJlZ2lvbiwgdXNlIHRoZSBmaWxsIHByb3BlcnR5IGluIGNzcyB0byBzZXQgYSBiYWNrZ3JvdW5kIGNvbG9yLiB8XG5cdFx0XHQgKiBAbmFtZSByZWdpb25zXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgcmVnaW9uczogW1xuXHRcdFx0ICogICAgICAge1xuXHRcdFx0ICogICAgICAgICAgIHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogMCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDQwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgXSxcblx0XHRcdCAqICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcblx0XHRcdCAqICAgICAgICAgICAgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG5cdFx0XHQgKiAgICAgICAgICAgfSxcblx0XHRcdCAqICAgICAgICAgICBvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuXHRcdFx0ICogICAgICAgICAgIGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuXHRcdCBcdCAqICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAuLi5cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRyZWdpb25zOiBbXVxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbikgeyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXG5cdC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcblx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XG5cdFx0Y29uc3QgeGkgPSByZWdpb25baV0ueDtcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xuXG5cdFx0Y29uc3QgeGogPSByZWdpb25bal0ueDtcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xuXG5cdFx0Y29uc3QgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcblxuXHRcdGlmIChpbnRlcnNlY3QpIHtcblx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc2lkZTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZUVwb2NocyhhLCBiKSB7XG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0aWYgKGEuZXBvY2hzID4gYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cykgeyAvLyB0aGFua3MgdG86IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MjgyMzMwL2ZpbmQtY2VudGVycG9pbnQtb2YtcG9seWdvbi1pbi1qYXZhc2NyaXB0XG5cdGxldCBhcmVhID0gMDtcblx0bGV0IHBvaW50MTtcblx0bGV0IHBvaW50MjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0cG9pbnQyID0gcG9pbnRzW2pdO1xuXHRcdGFyZWEgKz0gcG9pbnQxLnggKiBwb2ludDIueTtcblx0XHRhcmVhIC09IHBvaW50MS55ICogcG9pbnQyLng7XG5cdH1cblxuXHRhcmVhIC89IDI7XG5cblx0cmV0dXJuIGFyZWE7XG59XG5cbmZ1bmN0aW9uIGdldENlbnRyb2lkKHBvaW50cykge1xuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xuXG5cdGxldCB4ID0gMDtcblx0bGV0IHkgPSAwO1xuXHRsZXQgZjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0Y29uc3QgcG9pbnQyID0gcG9pbnRzW2pdO1xuXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xuXHRcdHggKz0gKHBvaW50MS54ICsgcG9pbnQyLngpICogZjtcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XG5cdH1cblxuXHRmID0gYXJlYSAqIDY7XG5cblx0cmV0dXJuIHtcblx0XHR4OiB4IC8gZixcblx0XHR5OiB5IC8gZlxuXHR9O1xufVxuXG5leHBvcnQge1xuXHRjb21wYXJlRXBvY2hzLFxuXHRnZXRDZW50cm9pZCxcblx0Z2V0UmVnaW9uQXJlYSxcblx0cG9pbnRJblJlZ2lvblxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWxzL3V0aWxcIjtcbmltcG9ydCB7Z2V0Q2VudHJvaWR9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3Rcblx0XHRjb25zdCBlbGVtZW50cyA9IG93bmVyLiQkLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXG5cdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcblxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkTGluZXMpO1xuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLm93bmVyLiQkO1xuXHRcdGNvbnN0IG1haW4gPSAkJC5tYWluO1xuXHRcdGNvbnN0IGNvbmZpZyA9ICQkLmNvbmZpZztcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xuXHRcdGNvbnN0IHN0YW5mb3JkTGluZSA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZExpbmVzfWApXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcubGluZXMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkTGluZS5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZExpbmVFbnRlciA9IHN0YW5mb3JkTGluZS5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyXG5cdFx0XHQubWVyZ2Uoc3RhbmZvcmRMaW5lKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkyXCIpIDogeHZDdXN0b20oZCwgXCJ4MlwiKSkpXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb24pIHtcblx0XHRjb25zdCAkJCA9IHRoaXMub3duZXIuJCQ7XG5cdFx0Y29uc3QgbWFpbiA9ICQkLm1haW47XG5cdFx0Y29uc3QgY29uZmlnID0gJCQuY29uZmlnO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtUmVnaW9uc1xuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5yZWdpb25zKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZFJlZ2lvbi5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZFJlZ2lvbkVudGVyID0gc3RhbmZvcmRSZWdpb24uZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgaXNSb3RhdGVkID8gXCJyb3RhdGUoLTkwKVwiIDogXCJcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24gPSBzdGFuZm9yZFJlZ2lvbkVudGVyLm1lcmdlKHN0YW5mb3JkUmVnaW9uKTtcblxuXHRcdC8vIHVwZGF0ZVxuXHRcdHN0YW5mb3JkUmVnaW9uXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXG5cdFx0XHRcdGlzUm90YXRlZCA/IHl2Q3VzdG9tKHZhbHVlLCBcInlcIikgOiB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpLFxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24uc2VsZWN0KFwidGV4dFwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4XCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpIDogeHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikpKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxuXHRcdFx0LnRleHQoZCA9PiB7XG5cdFx0XHRcdGlmIChkLnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZC50ZXh0KHZhbHVlLCBwZXJjZW50YWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fSlcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcblx0XHRcdC5hdHRyKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApIHtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRpZiAoJCQuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gJCQucGFyc2VEYXRlKHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKCQkLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gJCQuY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnkyIDogJCQueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtheGlzUmlnaHQgYXMgZDNBeGlzUmlnaHR9IGZyb20gXCJkMy1heGlzXCI7XG5pbXBvcnQge2Zvcm1hdCBhcyBkM0Zvcm1hdH0gZnJvbSBcImQzLWZvcm1hdFwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWwgYXMgZDNTY2FsZVNlcXVlbnRpYWwsIHNjYWxlTG9nIGFzIGQzU2NhbGVMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNGdW5jdGlvbiwgZ2V0UmFuZ2V9IGZyb20gXCIuLi8uLi9pbnRlcm5hbHMvdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0fVxuXG5cdGRyYXdDb2xvclNjYWxlKCkge1xuXHRcdGNvbnN0ICQkID0gdGhpcy5vd25lci4kJDtcblx0XHRjb25zdCBjb25maWcgPSB0aGlzLm93bmVyLmNvbmZpZztcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cdFx0Y29uc3QgaGVpZ2h0ID0gJCQuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmdfYm90dG9tIC0gY29uZmlnLnBhZGRpbmdfdG9wO1xuXHRcdGNvbnN0IGJhcldpZHRoID0gY29uZmlnLnNjYWxlX3dpZHRoO1xuXHRcdGNvbnN0IGJhckhlaWdodCA9IDU7XG5cdFx0Y29uc3QgcG9pbnRzID0gZ2V0UmFuZ2UoY29uZmlnLnBhZGRpbmdfYm90dG9tLCBoZWlnaHQsIGJhckhlaWdodCk7XG5cblx0XHRjb25zdCBpbnZlcnNlU2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbCh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSwgcG9pbnRzWzBdXSk7XG5cblx0XHRpZiAodGhpcy5jb2xvclNjYWxlKSB7XG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gJCQuc3ZnLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLmNvbG9yU2NhbGUpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtjb25maWcucGFkZGluZ190b3B9KWApXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxuXHRcdFx0LmRhdGEocG9pbnRzKVxuXHRcdFx0LmVudGVyKClcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgZCA9PiBpbnZlcnNlU2NhbGUoZCkpO1xuXG5cdFx0Ly8gTGVnZW5kIEF4aXNcblx0XHRjb25zdCBheGlzU2NhbGUgPSBkM1NjYWxlTG9nKClcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxuXHRcdFx0LnJhbmdlKFtcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wICsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSArIGJhckhlaWdodCAtIDEsXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxuXHRcdFx0XSk7XG5cblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzY2FsZUZvcm1hdCkpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChkM0Zvcm1hdChcImRcIikpO1xuXHRcdH1cblxuXHRcdC8vIERyYXcgQXhpc1xuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7YmFyV2lkdGh9LDApYClcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxuXHRcdFx0XHQudGV4dChudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGQgPT4gZCAvIE1hdGgucG93KDEwLCBNYXRoLmNlaWwoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTAgLSAxZS0xMikpID09PSAxKSAvLyBQb3dlciBvZiBUZW5cblx0XHRcdFx0LnRleHQoMTApXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHQuYXR0cihcImR5XCIsIFwiLS43ZW1cIikgLy8gaHR0cHM6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay82NzM4MjI5XG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5jdXJyZW50V2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xuXHR9XG5cblx0eEZvckNvbG9yU2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG5cdH1cblxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy54Rm9yQ29sb3JTY2FsZSgpICsgdGhpcy5vd25lci5jb25maWcucGFkZGluZ19sZWZ0ICsgMjA7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmd9IGZyb20gXCIuLi8uLi9pbnRlcm5hbHMvdXRpbFwiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcbmltcG9ydCB7cG9pbnRJblJlZ2lvbiwgY29tcGFyZUVwb2Noc30gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxuICogQHJlcXVpcmVzIGQzLWJydXNoXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBleHRlbmRzIFBsdWdpblxuICogQHJldHVybiB7U3RhbmZvcmR9XG4gKiBAZXhhbXBsZVxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgICAgY29sdW1uczogWyAuLi4gXSxcbiAqICAgICAgICB0eXBlOiBcInNjYXR0ZXJcIlxuICogICAgIH1cbiAqICAgICAuLi5cbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IGJiLnBsdWdpbi5zdGFuZm9yZCh7XG4gKiAgICAgICAgICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG4gKiAgICAgICAgICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcbiAqICAgICAgICAgICApLFxuICogICAgICAgICAgIGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXSxcbiAqICAgICAgICAgICBsaW5lczogW1xuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG4gKiAgICAgICAgICAgXSxcbiAqICAgICAgICAgICBzY2FsZToge1xuICogICAgICAgICAgIFx0bWF4OiAxMDAwMCxcbiAqICAgICAgICAgICAgIFx0bWluOiAxLFxuICogICAgICAgICAgIFx0d2lkdGg6IDUwMCxcbiAqICAgICAgICAgICAgIFx0Zm9ybWF0OiAncG93MTAnLFxuICogICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgcGFkZGluZzoge1xuICogICAgICAgICAgIFx0dG9wOiAxNSxcbiAqICAgICAgICAgICBcdHJpZ2h0OiAwLFxuICogICAgICAgICAgIFx0Ym90dG9tOiAwLFxuICogICAgICAgICAgIFx0bGVmdDogMFxuICogICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgcmVnaW9uczogW1xuICogICAgICAgICAgIFx0e1xuICogICAgICAgICAgICAgICBcdHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogMCB9LFxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDQwLCB5OiA0MCB9LFxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDQwIH1cbiAqICAgICAgICAgICAgICAgXHRdLFxuICogICAgICAgICAgICAgICBcdHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuICogICAgICAgICAgICAgICBcdCAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcbiAqICAgICAgICAgICAgICAgXHR9LFxuICogICAgICAgICAgICAgICBcdG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG4gKiAgICAgICAgICAgICAgIFx0Y2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG4gKiAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgIFx0Li4uXG4gKiAgICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICBdXG4gKiAgfSk7XG4gKiBAZXhhbXBsZVxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcbiAqIGltcG9ydCBTdGFuZm9yZCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRiZWZvcmVJbml0KCkge1xuXHRcdGNvbnN0ICQkID0gdGhpcy4kJDtcblxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XG5cblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcblxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQkaW5pdCgpIHtcblx0XHRjb25zdCAkJCA9IHRoaXMuJCQ7XG5cblx0XHQkJC5sb2FkQ29uZmlnLmJpbmQodGhpcykodGhpcy5vcHRpb25zKTtcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcblxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXG5cdFx0dGhpcy4kcmVkcmF3KCk7XG5cdH1cblxuXHQkcmVkcmF3KGR1cmF0aW9uKSB7XG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBPcHRpb25zKCk7XG5cdH1cblxuXHRjb252ZXJ0RGF0YSgpIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy4kJC5kYXRhLnRhcmdldHM7XG5cdFx0Y29uc3QgZXBvY2hzID0gdGhpcy5vcHRpb25zLmVwb2NocztcblxuXHRcdGRhdGEuZm9yRWFjaChkID0+IHtcblx0XHRcdGQudmFsdWVzLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0di5lcG9jaHMgPSBlcG9jaHNbaV07XG5cdFx0XHR9KTtcblxuXHRcdFx0ZC5taW5FcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLm1heEVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnNjYWxlID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXHR9XG5cblx0eHZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblxuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKCQkLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLnBhcnNlRGF0ZSh2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmICgkJC5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLmNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQueCh2YWx1ZSkpO1xuXHR9XG5cblx0eXZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC55MiA6ICQkLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cblxuXHRpbml0U3RhbmZvcmREYXRhKCkge1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xuXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcblxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xuXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xuXHR9XG5cblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XG5cdH1cblxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKSB7XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy4kJC5jb25maWc7XG5cblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcblxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodGhpcy5jb25maWcuZGF0YV94KX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8L3RyPmA7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbikge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHRjb25zdCB0b3RhbCA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PlxuXHRcdFx0YWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2NocyksIDApO1xuXG5cdFx0Y29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKHBvaW50SW5SZWdpb24oY3VycmVudFZhbHVlLCByZWdpb24pKSB7XG5cdFx0XHRcdHJldHVybiBhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yO1xuXHRcdH0sIDApO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlLFxuXHRcdFx0cGVyY2VudGFnZTogdmFsdWUgIT09IDAgPyArKHZhbHVlIC8gdG90YWwgKiAxMDApLnRvRml4ZWQoMSkgOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59IiwiaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gXCIuL3NldFByb3RvdHlwZU9mXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==