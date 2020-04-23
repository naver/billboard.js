/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
 * 
 * @version 1.12.6
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Plugin, "version", "1.12.6");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9QbHVnaW4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2ludGVybmFscy9icm93c2VyLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvaW50ZXJuYWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL3N0YW5mb3JkL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHMuanMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsInYiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNEZWZpbmVkIiwiaXNCb29sZWFuIiwiY2VpbDEwIiwiTWF0aCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzT2JqZWN0VHlwZSIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsInZhbHVlIiwiZm91bmQiLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsInNhbml0aXNlIiwic3RyIiwicmVwbGFjZSIsInNldFRleHRWYWx1ZSIsIm5vZGUiLCJkeSIsInRvTWlkZGxlIiwiaW5kZXhPZiIsImRpZmYiLCJtYXAiLCJtdWx0aWxpbmUiLCJzcGxpdCIsImxlbiIsImh0bWwiLCJpIiwiYXBwZW5kIiwiYXR0ciIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0UGF0aEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1zIiwibWluIiwiZ2V0QnJ1c2hTZWxlY3Rpb24iLCJjdHgiLCJzZWxlY3Rpb24iLCJldmVudCIsImQzRXZlbnQiLCJtYWluIiwiY29udGV4dCIsIm5hbWUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiZXh0ZW5kIiwic291cmNlIiwicCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJhIiwiYiIsImMiLCJmIiwiZ2V0VW5pcXVlIiwiZGF0YSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJyZWR1Y2UiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzaGlmdCIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJzb3J0IiwiZ2V0TWluTWF4IiwidHlwZSIsInJlcyIsInVuZGVmaW5lZCIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwibWF4IiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsImluc2lkZSIsImoiLCJ4aSIsInlpIiwieGoiLCJ5aiIsImNvbXBhcmVFcG9jaHMiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiRWxlbWVudHMiLCJvd25lciIsImVsZW1lbnRzIiwiJCQiLCJkdXJhdGlvbiIsImNvbmZpZyIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJleGl0IiwidHJhbnNpdGlvbiIsInJlbW92ZSIsInN0YW5mb3JkTGluZUVudGVyIiwiZW50ZXIiLCJtZXJnZSIsImNvdW50UG9pbnRzSW5SZWdpb24iLCJjb3VudEVwb2Noc0luUmVnaW9uIiwic3RhbmZvcmRSZWdpb25FbnRlciIsImpvaW4iLCJvcGFjaXR5IiwicGVyY2VudGFnZSIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJ4eVZhbHVlIiwiZ2V0QmFzZVZhbHVlIiwiaXNUaW1lU2VyaWVzIiwicGFyc2VEYXRlIiwiaXNDYXRlZ29yaXplZCIsImF4aXNfeF9jYXRlZ29yaWVzIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwidGFyZ2V0cyIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJ0aWNrRm9ybWF0IiwiZDNGb3JtYXQiLCJwb3ciLCJsb2ciLCJMTjEwIiwicm91bmQiLCJjdXJyZW50V2lkdGgiLCJ4Rm9yQ29sb3JTY2FsZSIsIlN0YW5mb3JkIiwiZGF0YV94U29ydCIsImlzTXVsdGlwbGVYIiwic2hvd0dyaWRGb2N1cyIsImxhYmVsaXNoRGF0YSIsInZhbHVlcyIsIm9wYWNpdHlGb3JDaXJjbGUiLCJnZXRDdXJyZW50UGFkZGluZ1JpZ2h0IiwiZ2V0Q29sb3JTY2FsZVBhZGRpbmciLCJsb2FkQ29uZmlnIiwiY29sb3IiLCJnZXRTdGFuZm9yZFBvaW50Q29sb3IiLCJjb252ZXJ0RGF0YSIsImluaXRTdGFuZm9yZERhdGEiLCJzZXRTdGFuZm9yZFRvb2x0aXAiLCJkcmF3Q29sb3JTY2FsZSIsIiRyZWRyYXciLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwiY29sb3JzY2FsZSIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsInRvb2x0aXBfY29udGVudHMiLCJkZWZhdWx0VGl0bGVGb3JtYXQiLCJkZWZhdWx0VmFsdWVGb3JtYXQiLCJkYXRhX3giLCJpZCIsInRvdGFsIiwiYWNjdW11bGF0b3IiLCJjdXJyZW50VmFsdWUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFrRDtBQUNu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QUssS0FBSyxDQUFWLEdBQWtELENBQWxELEdBQWMsQ0FBQyxDQUFDQSxLQUFLLEdBQUc0UCxLQUFSLEdBQWdCLEdBQWpCLEVBQXNCRyxPQUF0QixDQUE4QixDQUE5QjtBQUZyQixPQUFQO0FBSUE7O0VBcEtvQzdZLHlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDakd2QjtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7QUNQOEM7QUFDL0I7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtCQUFrQixlQUFjO0FBQ2hDLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE2X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE3X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjApO1xuIiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG4pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi4vLi4vaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTBfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHQvKipcblx0ICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG5cdCAqIEBuYW1lIHZlcnNpb25cblx0ICogQHN0YXRpY1xuXHQgKiBAbWVtYmVyb2YgUGx1Z2luXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBleGFtcGxlXG5cdCAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcblx0ICovXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIxLjEyLjZcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IGNvbmZpZyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTdfXzsiLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5XCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWRcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0YXJjOiBcImJiLWFyY1wiLFxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcblx0YXJjczogXCJiYi1hcmNzXCIsXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxuXHRheGlzOiBcImJiLWF4aXNcIixcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXG5cdGF4aXNZOiBcImJiLWF4aXMteVwiLFxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXG5cdGF4aXNZTGFiZWw6IFwiYmItYXhpcy15LWxhYmVsXCIsXG5cdGJhcjogXCJiYi1iYXJcIixcblx0YmFyczogXCJiYi1iYXJzXCIsXG5cdGJydXNoOiBcImJiLWJydXNoXCIsXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcblx0Y2hhcnQ6IFwiYmItY2hhcnRcIixcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXG5cdGNoYXJ0QXJjc0JhY2tncm91bmQ6IFwiYmItY2hhcnQtYXJjcy1iYWNrZ3JvdW5kXCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVW5pdDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXVuaXRcIixcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcblx0Y2hhcnRCYXI6IFwiYmItY2hhcnQtYmFyXCIsXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXG5cdGNoYXJ0TGluZTogXCJiYi1jaGFydC1saW5lXCIsXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxuXHRjaGFydFJhZGFyczogXCJiYi1jaGFydC1yYWRhcnNcIixcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxuXHRjaXJjbGU6IFwiYmItY2lyY2xlXCIsXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxuXHRlbXB0eTogXCJiYi1lbXB0eVwiLFxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXG5cdGV2ZW50UmVjdHNNdWx0aXBsZTogXCJiYi1ldmVudC1yZWN0cy1tdWx0aXBsZVwiLFxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcblx0Z2F1Z2VWYWx1ZTogXCJiYi1nYXVnZS12YWx1ZVwiLFxuXHRncmlkOiBcImJiLWdyaWRcIixcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdHJlZ2lvbjogXCJiYi1yZWdpb25cIixcblx0cmVnaW9uczogXCJiYi1yZWdpb25zXCIsXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxuXHRzZWxlY3RlZENpcmNsZXM6IFwiYmItc2VsZWN0ZWQtY2lyY2xlc1wiLFxuXHRzaGFwZTogXCJiYi1zaGFwZVwiLFxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIixcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxuXHR0ZXh0OiBcImJiLXRleHRcIixcblx0dGV4dHM6IFwiYmItdGV4dHNcIixcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXG5cdHRvb2x0aXBDb250YWluZXI6IFwiYmItdG9vbHRpcC1jb250YWluZXJcIixcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXG5cdHhncmlkRm9jdXM6IFwiYmIteGdyaWQtZm9jdXNcIixcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxuXHR4Z3JpZHM6IFwiYmIteGdyaWRzXCIsXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcblx0eWdyaWRMaW5lOiBcImJiLXlncmlkLWxpbmVcIixcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXG5cdHpvb21CcnVzaDogXCJiYi16b29tLWJydXNoXCIsXG5cdHpvb21SZWN0OiBcImJiLXpvb20tcmVjdFwiLFxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBXaW5kb3cgb2JqZWN0XG4gKiBAbW9kdWxlXG4gKiBAaWdub3JlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuY29uc3Qgd2luID0gKCgpID0+IHtcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xuXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuXG5leHBvcnQge1xuXHR3aW4gYXMgd2luZG93LFxuXHRkb2MgYXMgZG9jdW1lbnRcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuY29uc3QgaXNWYWx1ZSA9IHYgPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9IHYgPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9IHYgPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0Jvb2xlYW4gPSB2ID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9IHYgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gbiA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gZCA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9IHYgPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gbyA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gbyA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSBhcnIgPT4gYXJyICYmIGFyci5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbmNvbnN0IGdldE9wdGlvbiA9IChvcHRpb25zLCBrZXksIGRlZmF1bHRWYWx1ZSkgPT4gKFxuXHRpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZVxuKTtcblxuY29uc3QgaGFzVmFsdWUgPSAoZGljdCwgdmFsdWUpID0+IHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59O1xuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhbGxGbiA9IChmbiwgLi4uYXJncykgPT4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn07XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuY29uc3Qgc2FuaXRpc2UgPSBzdHIgPT4gKGlzU3RyaW5nKHN0cikgPyBzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHIpO1xuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHNldFRleHRWYWx1ZSA9IChub2RlLCB0ZXh0LCBkeSA9IFstMSwgMV0sIHRvTWlkZGxlID0gZmFsc2UpID0+IHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIHN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuY29uc3QgZ2V0UmVjdFNlZ0xpc3QgPSBwYXRoID0+IHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn07XG5cbmNvbnN0IGdldFBhdGhCb3ggPSBwYXRoID0+IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn07XG5cbi8vIHJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbmNvbnN0IGdldEJydXNoU2VsZWN0aW9uID0gY3R4ID0+IHtcblx0bGV0IHNlbGVjdGlvbiA9IG51bGw7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9IGN0eC5jb250ZXh0IHx8IGN0eC5tYWluO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQnJ1c2hFdmVudFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufTtcblxuLy8gR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC4gQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSBub2RlID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbi8vIHJldHJ1biByYW5kb20gbnVtYmVyXG5jb25zdCBnZXRSYW5kb20gPSAoYXNTdHIgPSB0cnVlKSA9PiBNYXRoLnJhbmRvbSgpICsgKGFzU3RyID8gXCJcIiA6IDApO1xuXG5jb25zdCBicnVzaEVtcHR5ID0gY3R4ID0+IHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBleHRlbmQgPSAodGFyZ2V0ID0ge30sIHNvdXJjZSkgPT4ge1xuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhcGl0YWxpemUgPSBzdHIgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSB2XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gdiA9PiBbXS5zbGljZS5jYWxsKHYpO1xuXG4vKipcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0Q3NzUnVsZXMgPSBzdHlsZVNoZWV0cyA9PiB7XG5cdGxldCBydWxlcyA9IFtdO1xuXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcnVsZXM7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFcbiAqIEByZXR1cm4ge0FycmF5fSBVbmlxdWUgYXJyYXkgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFVuaXF1ZSA9IGRhdGEgPT4ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59O1xuXG4vKipcbiAqIE1lcmdlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgbWVyZ2VBcnJheSA9IGFyciA9PiAoYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXSk7XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0TlxuICogQHJldHVybnMge09iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IG1lcmdlT2JqID0gKHRhcmdldCwgLi4ub2JqZWN0TikgPT4ge1xuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xufTtcblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBzb3J0VmFsdWUgPSAoZGF0YSwgaXNBc2MgPSB0cnVlKSA9PiB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn07XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm4ge051bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldE1pbk1heCA9ICh0eXBlLCBkYXRhKSA9PiB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogR2V0IHJhbmdlXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gZW5kIEVuZCBudW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwIFN0ZXAgbnVtYmVyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0LCBlbmQsIHN0ZXAgPSAxKSA9PiB7XG5cdGNvbnN0IHJlcyA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbCwgZXZlbnRUeXBlLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWwsIGV2ZW50VHlwZSwgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdGV2ZW50VHlwZSxcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcblx0XHRcdFx0XHR3aW5kb3csXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXG5cdFx0XHRcdFx0cGFyYW1zLmNsaWVudFgsIHBhcmFtcy5jbGllbnRZLFxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KSgpLFxuXHR0b3VjaDogKGVsLCBldmVudFR5cGUsIHBhcmFtcykgPT4ge1xuXHRcdGNvbnN0IHRvdWNoT2JqID0gbmV3IFRvdWNoKG1lcmdlT2JqKHtcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXG5cdFx0XHR0YXJnZXQ6IGVsLFxuXHRcdFx0cmFkaXVzWDogMi41LFxuXHRcdFx0cmFkaXVzWTogMi41LFxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXG5cdFx0XHRmb3JjZTogMC41XG5cdFx0fSwgcGFyYW1zKSk7XG5cblx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBUb3VjaEV2ZW50KGV2ZW50VHlwZSwge1xuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRzaGlmdEtleTogdHJ1ZSxcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcblx0XHRcdGNoYW5nZWRUb3VjaGVzOiBbdG91Y2hPYmpdXG5cdFx0fSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlICAmIHJldHVybiBib3VuZCBzdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0cGxQcm9jZXNzID0gKHRwbCwgZGF0YSkgPT4ge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRkaWZmRG9tYWluLFxuXHRlbXVsYXRlRXZlbnQsXG5cdGV4dGVuZCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzQm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgU3RhbmZvcmRPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBleHRlbmRzIFBsdWdpblxuICogQHJldHVybiB7U3RhbmZvcmRPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG5cdFx0XHQgKiAgIClcblx0XHRcdCAqL1xuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXG5cdFx0XHQgKiBAbmFtZSBlcG9jaHNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cblx0XHRcdCovXG5cdFx0XHRlcG9jaHM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0IFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCB4MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzICB8XG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGxpbmVzOiBbXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdGxpbmVzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2NhbGUgdmFsdWVzXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge09iamVjdH1cbiBcdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtzY2FsZS53aWR0aD0yMF0gV2lkdGggb2YgdGhlIGNvbG9yIHNjYWxlXG5cdFx0XHQgKiBAcHJvcGVydHkge1N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgc2NhbGU6IHtcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXG5cdFx0XHQgKiAgICBtaW46IDEsXG5cdFx0XHQgKiAgICB3aWR0aDogNTAwLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXG5cdFx0XHQgKiAgICBmb3JtYXQ6IFwicG93MTBcIixcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXG5cdFx0XHQgKiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHgpIHtcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xuXHRcdFx0ICogICAgfVxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHNjYWxlX21pbjogdW5kZWZpbmVkLFxuXHRcdFx0c2NhbGVfbWF4OiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV93aWR0aDogMjAsXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IHVuZGVmaW5lZCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgcGFkZGluZyBmb3IgY29sb3Igc2NhbGUgZWxlbWVudFxuXHRcdFx0ICogQG5hbWUgcGFkZGluZ1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge09iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy50b3A9MF0gVG9wIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcucmlnaHQ9MF0gUmlnaHQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbcGFkZGluZy5ib3R0b209MF0gQm90dG9tIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcubGVmdD0wXSBMZWZ0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHBhZGRpbmc6IHtcblx0XHRcdCAqICAgICB0b3A6IDE1LFxuXHRcdFx0ICogICAgIHJpZ2h0OiAwLFxuXHRcdFx0ICogICAgIGJvdHRvbTogMCxcblx0XHRcdCAqICAgICBsZWZ0OiAwXG5cdFx0XHQgKiAgfSxcblx0XHRcdCAqL1xuXHRcdFx0cGFkZGluZ190b3A6IDAsXG5cdFx0XHRwYWRkaW5nX3JpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZ19ib3R0b206IDAsXG5cdFx0XHRwYWRkaW5nX2xlZnQ6IDAsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2hvdyBhZGRpdGlvbmFsIHJlZ2lvbnMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIHJlZ2lvbiBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiAgIHwgS2V5IHwgVHlwZSB8IERlZmF1bHQgfCBBdHRyaWJ1dGVzIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogICB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiAgIHwgcG9pbnRzIHwgQXJyYXkgfCAgfCB8IEFjY2VwdHMgYSBncm91cCBvZiBvYmplY3RzIHRoYXQgaGFzIHggYW5kIHkuPGJyPlRoZXNlIHBvaW50cyBzaG91bGQgYmUgYWRkZWQgaW4gYSBjb3VudGVyLWNsb2Nrd2lzZSBmYXNoaW9uIHRvIG1ha2UgYSBjbG9zZWQgcG9seWdvbi4gfFxuXHRcdFx0ICogICB8IG9wYWNpdHkgfCBOdW1iZXIgfCBgMC4yYCB8ICZsdDtvcHRpb25hbD4gfCBTZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSByZWdpb24gYXMgdmFsdWUgYmV0d2VlbiAwIGFuZCAxIHxcblx0XHRcdCAqICAgfCB0ZXh0IHwgRnVuY3Rpb24gfCAgfCAmbHQ7b3B0aW9uYWw+IHwgVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGFuZCBwZXJjZW50YWdlIG9mIHRoZSBudW1iZXIgb2YgZXBvY2hzIGluIHRoaXMgcmVnaW9uLjxicj5SZXR1cm4gYSBzdHJpbmcgdG8gcGxhY2UgdGV4dCBpbiB0aGUgbWlkZGxlIG9mIHRoZSByZWdpb24uIHxcblx0XHRcdCAqICAgfCBjbGFzcyB8IFN0cmluZyB8IHwgJmx0O29wdGlvbmFsPiB8IFNlIGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIHJlZ2lvbiwgdXNlIHRoZSBmaWxsIHByb3BlcnR5IGluIGNzcyB0byBzZXQgYSBiYWNrZ3JvdW5kIGNvbG9yLiB8XG5cdFx0XHQgKiBAbmFtZSByZWdpb25zXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgcmVnaW9uczogW1xuXHRcdFx0ICogICAgICAge1xuXHRcdFx0ICogICAgICAgICAgIHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogMCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDQwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgXSxcblx0XHRcdCAqICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcblx0XHRcdCAqICAgICAgICAgICAgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG5cdFx0XHQgKiAgICAgICAgICAgfSxcblx0XHRcdCAqICAgICAgICAgICBvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuXHRcdFx0ICogICAgICAgICAgIGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuXHRcdCBcdCAqICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAuLi5cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRyZWdpb25zOiBbXVxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbikgeyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXG5cdC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcblx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XG5cdFx0Y29uc3QgeGkgPSByZWdpb25baV0ueDtcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xuXG5cdFx0Y29uc3QgeGogPSByZWdpb25bal0ueDtcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xuXG5cdFx0Y29uc3QgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcblxuXHRcdGlmIChpbnRlcnNlY3QpIHtcblx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc2lkZTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZUVwb2NocyhhLCBiKSB7XG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0aWYgKGEuZXBvY2hzID4gYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cykgeyAvLyB0aGFua3MgdG86IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MjgyMzMwL2ZpbmQtY2VudGVycG9pbnQtb2YtcG9seWdvbi1pbi1qYXZhc2NyaXB0XG5cdGxldCBhcmVhID0gMDtcblx0bGV0IHBvaW50MTtcblx0bGV0IHBvaW50MjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0cG9pbnQyID0gcG9pbnRzW2pdO1xuXHRcdGFyZWEgKz0gcG9pbnQxLnggKiBwb2ludDIueTtcblx0XHRhcmVhIC09IHBvaW50MS55ICogcG9pbnQyLng7XG5cdH1cblxuXHRhcmVhIC89IDI7XG5cblx0cmV0dXJuIGFyZWE7XG59XG5cbmZ1bmN0aW9uIGdldENlbnRyb2lkKHBvaW50cykge1xuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xuXG5cdGxldCB4ID0gMDtcblx0bGV0IHkgPSAwO1xuXHRsZXQgZjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0Y29uc3QgcG9pbnQyID0gcG9pbnRzW2pdO1xuXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xuXHRcdHggKz0gKHBvaW50MS54ICsgcG9pbnQyLngpICogZjtcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XG5cdH1cblxuXHRmID0gYXJlYSAqIDY7XG5cblx0cmV0dXJuIHtcblx0XHR4OiB4IC8gZixcblx0XHR5OiB5IC8gZlxuXHR9O1xufVxuXG5leHBvcnQge1xuXHRjb21wYXJlRXBvY2hzLFxuXHRnZXRDZW50cm9pZCxcblx0Z2V0UmVnaW9uQXJlYSxcblx0cG9pbnRJblJlZ2lvblxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzU3RyaW5nfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWxzL3V0aWxcIjtcbmltcG9ydCB7Z2V0Q2VudHJvaWR9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3Rcblx0XHRjb25zdCBlbGVtZW50cyA9IG93bmVyLiQkLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXG5cdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcblxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkTGluZXMpO1xuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLm93bmVyLiQkO1xuXHRcdGNvbnN0IG1haW4gPSAkJC5tYWluO1xuXHRcdGNvbnN0IGNvbmZpZyA9ICQkLmNvbmZpZztcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xuXHRcdGNvbnN0IHN0YW5mb3JkTGluZSA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZExpbmVzfWApXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcubGluZXMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkTGluZS5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZExpbmVFbnRlciA9IHN0YW5mb3JkTGluZS5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyXG5cdFx0XHQubWVyZ2Uoc3RhbmZvcmRMaW5lKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkyXCIpIDogeHZDdXN0b20oZCwgXCJ4MlwiKSkpXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb24pIHtcblx0XHRjb25zdCAkJCA9IHRoaXMub3duZXIuJCQ7XG5cdFx0Y29uc3QgbWFpbiA9ICQkLm1haW47XG5cdFx0Y29uc3QgY29uZmlnID0gJCQuY29uZmlnO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtUmVnaW9uc1xuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5yZWdpb25zKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZFJlZ2lvbi5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZFJlZ2lvbkVudGVyID0gc3RhbmZvcmRSZWdpb24uZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgaXNSb3RhdGVkID8gXCJyb3RhdGUoLTkwKVwiIDogXCJcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24gPSBzdGFuZm9yZFJlZ2lvbkVudGVyLm1lcmdlKHN0YW5mb3JkUmVnaW9uKTtcblxuXHRcdC8vIHVwZGF0ZVxuXHRcdHN0YW5mb3JkUmVnaW9uXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXG5cdFx0XHRcdGlzUm90YXRlZCA/IHl2Q3VzdG9tKHZhbHVlLCBcInlcIikgOiB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpLFxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24uc2VsZWN0KFwidGV4dFwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4XCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpIDogeHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikpKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxuXHRcdFx0LnRleHQoZCA9PiB7XG5cdFx0XHRcdGlmIChkLnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZC50ZXh0KHZhbHVlLCBwZXJjZW50YWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fSlcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcblx0XHRcdC5hdHRyKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApIHtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRpZiAoJCQuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gJCQucGFyc2VEYXRlKHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKCQkLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gJCQuY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnkyIDogJCQueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtheGlzUmlnaHQgYXMgZDNBeGlzUmlnaHR9IGZyb20gXCJkMy1heGlzXCI7XG5pbXBvcnQge2Zvcm1hdCBhcyBkM0Zvcm1hdH0gZnJvbSBcImQzLWZvcm1hdFwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWwgYXMgZDNTY2FsZVNlcXVlbnRpYWwsIHNjYWxlTG9nIGFzIGQzU2NhbGVMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNGdW5jdGlvbiwgZ2V0UmFuZ2V9IGZyb20gXCIuLi8uLi9pbnRlcm5hbHMvdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0fVxuXG5cdGRyYXdDb2xvclNjYWxlKCkge1xuXHRcdGNvbnN0ICQkID0gdGhpcy5vd25lci4kJDtcblx0XHRjb25zdCBjb25maWcgPSB0aGlzLm93bmVyLmNvbmZpZztcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cdFx0Y29uc3QgaGVpZ2h0ID0gJCQuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmdfYm90dG9tIC0gY29uZmlnLnBhZGRpbmdfdG9wO1xuXHRcdGNvbnN0IGJhcldpZHRoID0gY29uZmlnLnNjYWxlX3dpZHRoO1xuXHRcdGNvbnN0IGJhckhlaWdodCA9IDU7XG5cdFx0Y29uc3QgcG9pbnRzID0gZ2V0UmFuZ2UoY29uZmlnLnBhZGRpbmdfYm90dG9tLCBoZWlnaHQsIGJhckhlaWdodCk7XG5cblx0XHRjb25zdCBpbnZlcnNlU2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbCh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSwgcG9pbnRzWzBdXSk7XG5cblx0XHRpZiAodGhpcy5jb2xvclNjYWxlKSB7XG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gJCQuc3ZnLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLmNvbG9yU2NhbGUpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtjb25maWcucGFkZGluZ190b3B9KWApXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxuXHRcdFx0LmRhdGEocG9pbnRzKVxuXHRcdFx0LmVudGVyKClcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgZCA9PiBpbnZlcnNlU2NhbGUoZCkpO1xuXG5cdFx0Ly8gTGVnZW5kIEF4aXNcblx0XHRjb25zdCBheGlzU2NhbGUgPSBkM1NjYWxlTG9nKClcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxuXHRcdFx0LnJhbmdlKFtcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wICsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSArIGJhckhlaWdodCAtIDEsXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxuXHRcdFx0XSk7XG5cblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzY2FsZUZvcm1hdCkpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChkM0Zvcm1hdChcImRcIikpO1xuXHRcdH1cblxuXHRcdC8vIERyYXcgQXhpc1xuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7YmFyV2lkdGh9LDApYClcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxuXHRcdFx0XHQudGV4dChudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGQgPT4gZCAvIE1hdGgucG93KDEwLCBNYXRoLmNlaWwoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTAgLSAxZS0xMikpID09PSAxKSAvLyBQb3dlciBvZiBUZW5cblx0XHRcdFx0LnRleHQoMTApXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHQuYXR0cihcImR5XCIsIFwiLS43ZW1cIikgLy8gaHR0cHM6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay82NzM4MjI5XG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5jdXJyZW50V2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xuXHR9XG5cblx0eEZvckNvbG9yU2NhbGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG5cdH1cblxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy54Rm9yQ29sb3JTY2FsZSgpICsgdGhpcy5vd25lci5jb25maWcucGFkZGluZ19sZWZ0ICsgMjA7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmd9IGZyb20gXCIuLi8uLi9pbnRlcm5hbHMvdXRpbFwiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcbmltcG9ydCB7cG9pbnRJblJlZ2lvbiwgY29tcGFyZUVwb2Noc30gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxuICogQHJlcXVpcmVzIGQzLWJydXNoXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBleHRlbmRzIFBsdWdpblxuICogQHJldHVybiB7U3RhbmZvcmR9XG4gKiBAZXhhbXBsZVxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgICAgY29sdW1uczogWyAuLi4gXSxcbiAqICAgICAgICB0eXBlOiBcInNjYXR0ZXJcIlxuICogICAgIH1cbiAqICAgICAuLi5cbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IGJiLnBsdWdpbi5zdGFuZm9yZCh7XG4gKiAgICAgICAgICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG4gKiAgICAgICAgICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcbiAqICAgICAgICAgICApLFxuICogICAgICAgICAgIGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXSxcbiAqICAgICAgICAgICBsaW5lczogW1xuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG4gKiAgICAgICAgICAgXSxcbiAqICAgICAgICAgICBzY2FsZToge1xuICogICAgICAgICAgIFx0bWF4OiAxMDAwMCxcbiAqICAgICAgICAgICAgIFx0bWluOiAxLFxuICogICAgICAgICAgIFx0d2lkdGg6IDUwMCxcbiAqICAgICAgICAgICAgIFx0Zm9ybWF0OiAncG93MTAnLFxuICogICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgcGFkZGluZzoge1xuICogICAgICAgICAgIFx0dG9wOiAxNSxcbiAqICAgICAgICAgICBcdHJpZ2h0OiAwLFxuICogICAgICAgICAgIFx0Ym90dG9tOiAwLFxuICogICAgICAgICAgIFx0bGVmdDogMFxuICogICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgcmVnaW9uczogW1xuICogICAgICAgICAgIFx0e1xuICogICAgICAgICAgICAgICBcdHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogMCB9LFxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDQwLCB5OiA0MCB9LFxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDQwIH1cbiAqICAgICAgICAgICAgICAgXHRdLFxuICogICAgICAgICAgICAgICBcdHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuICogICAgICAgICAgICAgICBcdCAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcbiAqICAgICAgICAgICAgICAgXHR9LFxuICogICAgICAgICAgICAgICBcdG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG4gKiAgICAgICAgICAgICAgIFx0Y2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG4gKiAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgIFx0Li4uXG4gKiAgICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICBdXG4gKiAgfSk7XG4gKiBAZXhhbXBsZVxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcbiAqIGltcG9ydCBTdGFuZm9yZCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRiZWZvcmVJbml0KCkge1xuXHRcdGNvbnN0ICQkID0gdGhpcy4kJDtcblxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XG5cblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcblxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQkaW5pdCgpIHtcblx0XHRjb25zdCAkJCA9IHRoaXMuJCQ7XG5cblx0XHQkJC5sb2FkQ29uZmlnLmJpbmQodGhpcykodGhpcy5vcHRpb25zKTtcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcblxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXG5cdFx0dGhpcy4kcmVkcmF3KCk7XG5cdH1cblxuXHQkcmVkcmF3KGR1cmF0aW9uKSB7XG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBPcHRpb25zKCk7XG5cdH1cblxuXHRjb252ZXJ0RGF0YSgpIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy4kJC5kYXRhLnRhcmdldHM7XG5cdFx0Y29uc3QgZXBvY2hzID0gdGhpcy5vcHRpb25zLmVwb2NocztcblxuXHRcdGRhdGEuZm9yRWFjaChkID0+IHtcblx0XHRcdGQudmFsdWVzLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0di5lcG9jaHMgPSBlcG9jaHNbaV07XG5cdFx0XHR9KTtcblxuXHRcdFx0ZC5taW5FcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLm1heEVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnNjYWxlID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXHR9XG5cblx0eHZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblxuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKCQkLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLnBhcnNlRGF0ZSh2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmICgkJC5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLmNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQueCh2YWx1ZSkpO1xuXHR9XG5cblx0eXZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC55MiA6ICQkLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cblxuXHRpbml0U3RhbmZvcmREYXRhKCkge1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xuXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcblxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xuXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xuXHR9XG5cblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XG5cdH1cblxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKSB7XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy4kJC5jb25maWc7XG5cblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcblxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodGhpcy5jb25maWcuZGF0YV94KX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8L3RyPmA7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbikge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHRjb25zdCB0b3RhbCA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PlxuXHRcdFx0YWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2NocyksIDApO1xuXG5cdFx0Y29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKHBvaW50SW5SZWdpb24oY3VycmVudFZhbHVlLCByZWdpb24pKSB7XG5cdFx0XHRcdHJldHVybiBhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yO1xuXHRcdH0sIDApO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlLFxuXHRcdFx0cGVyY2VudGFnZTogdmFsdWUgIT09IDAgPyArKHZhbHVlIC8gdG90YWwgKiAxMDApLnRvRml4ZWQoMSkgOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59IiwiaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gXCIuL3NldFByb3RvdHlwZU9mXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==