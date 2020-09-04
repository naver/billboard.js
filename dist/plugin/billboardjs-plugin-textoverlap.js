/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.3-nightly-20200904122750
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else if(typeof define === 'function' && define.amd)
		define("textoverlap", ["d3-selection", "d3-brush", "d3-voronoi", "d3-polygon"], factory);
	else if(typeof exports === 'object')
		exports["textoverlap"] = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["textoverlap"] = factory(root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


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
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.3-nightly-20200904122750");



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = ({
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
  chartCircles: "bb-chart-circles",
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
  legend: "bb-legend",
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
  main: "bb-main",
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
  subchart: "bb-subchart",
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
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadConfig; });
/* harmony import */ var _module_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
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
  var target,
      keys,
      read,
      thisConfig = this.config,
      find = function () {
    var key = keys.shift();
    return key && target && Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isObjectType */ "e"])(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isDefined */ "b"])(read) && (thisConfig[key] = read);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ textoverlap_TextOverlap; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-voronoi","commonjs2":"d3-voronoi","amd":"d3-voronoi","root":"d3"}
var external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_ = __webpack_require__(14);

// EXTERNAL MODULE: external {"commonjs":"d3-polygon","commonjs2":"d3-polygon","amd":"d3-polygon","root":"d3"}
var external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_ = __webpack_require__(15);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: ./src/config/config.ts
var config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/textoverlap/Options.ts
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
var Options = function () {
  return {
    /**
     * Set selector string for target text nodes
     * @name selector
     * @memberof plugin-textoverlap
     * @type {string}
     * @default ".bb-texts text"
     * @example
     *  // selector for data label text nodes
     * selector: ".bb-texts text"
     */
    selector: ".bb-texts text",

    /**
     * Set extent of label overlap prevention
     * @name extent
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 1
     * @example
     * 	extent: 1
     */
    extent: 1,

    /**
     * Set minimum area needed to show a data label
     * @name area
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 0
     * @example
     * 	area: 0
     */
    area: 0
  };
};


// CONCATENATED MODULE: ./src/Plugin/textoverlap/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */






/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-voronoi](https://github.com/d3/d3-voronoi)
 * @class plugin-textoverlap
 * @requires d3-selection
 * @requires d3-polygon
 * @requires d3-voronoi
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
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.textoverlap({
 *          selector: ".bb-texts text",
 *          extent: 8,
 *          area: 3
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */

var textoverlap_TextOverlap = /*#__PURE__*/function (_Plugin) {
  function TextOverlap(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(TextOverlap, _Plugin);

  var _proto = TextOverlap.prototype;
  return _proto.$init = function $init() {
    config["a" /* loadConfig */].call(this, this.options);
  }, _proto.$redraw = function $redraw() {
    var text = Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["selectAll"])(this.config.selector);
    text.empty() || this.preventLabelOverlap(text);
  }
  /**
   * Generates the voronoi layout for data labels
   * @param {object} data Indices values
   * @returns {object} Voronoi layout points and corresponding Data points
   * @private
   */
  , _proto.generateVoronoi = function generateVoronoi(data) {
    var $$ = this.$$,
        scale = $$.scale,
        _map = ["x", "y"].map(function (v) {
      return scale[v].domain();
    }),
        min = _map[0],
        max = _map[1],
        _ref = [max[0], min[1]];

    return min[1] = _ref[0], max[0] = _ref[1], Object(external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_["voronoi"])().extent([min, max]).polygons(data);
  }
  /**
   * Set text label's position to preventg overlap.
   * @param {d3Selection} text target text selection
   * @private
   */
  , _proto.preventLabelOverlap = function preventLabelOverlap(text) {
    var _this$config = this.config,
        extent = _this$config.extent,
        area = _this$config.area,
        cells = this.generateVoronoi(text.data().map(function (v) {
      return [v.x, v.value];
    })),
        i = 0;
    text.each(function () {
      var cell = cells[i++];

      if (cell && this) {
        var _cell$data = cell.data,
            x = _cell$data[0],
            y = _cell$data[1],
            _d3PolygonCentroid = Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonCentroid"])(cell),
            cx = _d3PolygonCentroid[0],
            cy = _d3PolygonCentroid[1],
            angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2),
            xTranslate = extent * (angle === 0 ? 1 : -1),
            yTranslate = angle === -1 ? -extent : extent + 5,
            txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";

        Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["select"])(this) // @ts-ignore
        .attr("display", Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonArea"])(cell) < area ? "none" : null).attr("text-anchor", txtAnchor).attr("dy", "0." + (angle === 1 ? 71 : 35) + "em").attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")");
      }
    });
  }, TextOverlap;
}(Plugin["a" /* default */]);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getRange; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ isDefined; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ isEmpty; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ isFunction; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ isObjectType; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ isString; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ parseDate; });

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, deepClone, diffDomain, endall, emulateEvent, extend, findIndex, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(11);

// CONCATENATED MODULE: ./src/module/browser.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @private
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
// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

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
    isboolean = function (v) {
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
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
};

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */


function hasValue(dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0;
  transition.each(function () {
    return ++n;
  }).on("end", function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];

    --n || cb.apply.apply(cb, [this].concat(args));
  });
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */


function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}
/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */


function setTextValue(node, text, dy, toMiddle) {
  if (dy === void 0 && (dy = [-1, 1]), toMiddle === void 0 && (toMiddle = !1), node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
    }
  }
}
/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */


function getRectSegList(path) {
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
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */


function getPathBox(path) {
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
}
/**
 * Return brush selection array
 * @param {object} {} Selection object
 * @param {object} {}.$el Selection object
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(_ref) {
  var selection,
      $el = _ref.$el,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes["a" /* default */].brush).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */


function getBoundingRect(node) {
  var needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
}
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @returns {number|string}
 * @private
 */


function getRandom(asStr) {
  asStr === void 0 && (asStr = !0);
  var rand = Math.random();
  return asStr ? rand + "" : rand;
}
/**
 * Find index based on binary search
 * @param {Array} arr Data array
 * @param {number} v Target number to find
 * @param {number} start Start index of data array
 * @param {number} end End index of data arr
 * @param {boolean} isRotated Weather is roted axis
 * @returns {number} Index number
 */


function findIndex(arr, v, start, end, isRotated) {
  if (start > end) return -1;
  var mid = Math.floor((start + end) / 2),
      _arr$mid = arr[mid],
      x = _arr$mid.x,
      _arr$mid$w = _arr$mid.w,
      w = _arr$mid$w === void 0 ? 0 : _arr$mid$w;
  return isRotated && (x = arr[mid].y, w = arr[mid].h), v >= x && v <= x + w ? mid : v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (_clone) {
    function clone() {
      return _clone.apply(this, arguments);
    }

    return clone.toString = function () {
      return _clone.toString();
    }, clone;
  }(function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) r[k] = clone(v[k]);

      return r;
    }

    return v;
  }), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) objectN[_key3] = arguments[_key3];

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || p in target || (target[p] = source[p]);

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }), rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


var getTranslation = function (node) {
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
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) objectN[_key4 - 1] = arguments[_key4];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  isAsc === void 0 && (isAsc = !0);
  var fn;
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, res) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */


var getRange = function (start, end, step) {
  step === void 0 && (step = 1);
  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) res.push(start + i * step);

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
      return new MouseEvent("t"), function (el, eventType, params) {
        params === void 0 && (params = getParams()), el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        params === void 0 && (params = getParams());
        var mouseEvent = doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

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
}; // emulate event


/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);

  return res;
}
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */


function parseDate(date) {
  var parsedDate;
  if (date instanceof Date) parsedDate = date;else if (isString(date)) {
    var config = this.config,
        format = this.format;
    parsedDate = format.dataTime(config.data_xFormat)(date);
  } else isNumber(date) && !isNaN(date) && (parsedDate = new Date(+date));
  return (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return !doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var isMobile = !1; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

  if (/Mobi/.test(win.navigator.userAgent) && touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0,
        hasTouch = "ontouchmove" in win || win.DocumentTouch && doc instanceof win.DocumentTouch; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true

    isMobile = hasTouchPoints || hasTouch;
  }

  var hasMouse = !(!mouse || isMobile) && "onmouseover" in win;
  return hasMouse && "mouse" || isMobile && "touch" || null;
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwic2VsZWN0b3IiLCJleHRlbnQiLCJUZXh0T3ZlcmxhcCIsImNhbGwiLCJkM1NlbGVjdEFsbCIsInByZXZlbnRMYWJlbE92ZXJsYXAiLCJnZW5lcmF0ZVZvcm9ub2kiLCJkYXRhIiwiJCQiLCJzY2FsZSIsIm1hcCIsInYiLCJkb21haW4iLCJtaW4iLCJtYXgiLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwieCIsInZhbHVlIiwiaSIsImVhY2giLCJjZWxsIiwieSIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwiTWF0aCIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInhUcmFuc2xhdGUiLCJ5VHJhbnNsYXRlIiwidHh0QW5jaG9yIiwiYWJzIiwiZDNTZWxlY3QiLCJhdHRyIiwiZDNQb2x5Z29uQXJlYSIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJmb3VuZCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJlbmRhbGwiLCJ0cmFuc2l0aW9uIiwiY2IiLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImh0bWwiLCJhcHBlbmQiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJpc1JvdGF0ZWQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJnZXRSYW5nZSIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsInBhcnNlRGF0ZSIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFD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QVEsSUFBSSxPQUFiLElBQTBCUCxRQUFRLElBQUksT0FBdEMsSUFBa0QsSUFBekQ7QUFDQSxDIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0ZXh0b3ZlcmxhcFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1icnVzaFwiLCBcImQzLXZvcm9ub2lcIiwgXCJkMy1wb2x5Z29uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuLyoqXG4gKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cbiAqIEBuYW1lIHZlcnNpb25cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQbHVnaW5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHRwdWJsaWMgJCQ7XG5cdHB1YmxpYyBvcHRpb25zO1xuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4wLjMtbmlnaHRseS0yMDIwMDkwNDEyMjc1MFwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFyYzogXCJiYi1hcmNcIixcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxuXHRhcmVhOiBcImJiLWFyZWFcIixcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcblx0YXhpczogXCJiYi1heGlzXCIsXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxuXHRiYXI6IFwiYmItYmFyXCIsXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxuXHRjaGFydENpcmNsZXM6IFwiYmItY2hhcnQtY2lyY2xlc1wiLFxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcblx0Z3JpZDogXCJiYi1ncmlkXCIsXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXG5cdGxlZ2VuZDogXCJiYi1sZWdlbmRcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdG1haW46IFwiYmItbWFpblwiLFxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXG5cdHN1YmNoYXJ0OiBcImJiLXN1YmNoYXJ0XCIsXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcblx0dGV4dDogXCJiYi10ZXh0XCIsXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcblxuLyoqXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcblx0bGV0IHRhcmdldDtcblx0bGV0IGtleXM7XG5cdGxldCByZWFkO1xuXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xuXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XG5cdFx0XHRyZXR1cm4gZmluZCgpO1xuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcblx0XHR0YXJnZXQgPSBjb25maWc7XG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XG5cdFx0cmVhZCA9IGZpbmQoKTtcblxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbiBjbGFzc1xuICogQGNsYXNzIFRleHRPdmVybGFwT3B0aW9uc1xuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7VGV4dE92ZXJsYXBPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBzZWxlY3RvciBzdHJpbmcgZm9yIHRhcmdldCB0ZXh0IG5vZGVzXG5cdFx0XHQgKiBAbmFtZSBzZWxlY3RvclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxuXHRcdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHRcdCAqIEBkZWZhdWx0IFwiLmJiLXRleHRzIHRleHRcIlxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAvLyBzZWxlY3RvciBmb3IgZGF0YSBsYWJlbCB0ZXh0IG5vZGVzXG5cdFx0XHQgKiBzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiXG5cdFx0XHQgKi9cblx0XHRcdHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IGV4dGVudCBvZiBsYWJlbCBvdmVybGFwIHByZXZlbnRpb25cblx0XHRcdCAqIEBuYW1lIGV4dGVudFxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxuXHRcdFx0ICogQHR5cGUge251bWJlcn1cblx0XHRcdCAqIEBkZWZhdWx0IDFcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBcdGV4dGVudDogMVxuXHRcdFx0ICovXG5cdFx0XHRleHRlbnQ6IDEsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IG1pbmltdW0gYXJlYSBuZWVkZWQgdG8gc2hvdyBhIGRhdGEgbGFiZWxcblx0XHRcdCAqIEBuYW1lIGFyZWFcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0XHQgKiBAZGVmYXVsdCAwXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRhcmVhOiAwXG5cdFx0XHQgKi9cblx0XHRcdGFyZWE6IDBcblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge3Zvcm9ub2kgYXMgZDNWb3Jvbm9pfSBmcm9tIFwiZDMtdm9yb25vaVwiO1xuaW1wb3J0IHtcblx0cG9seWdvbkNlbnRyb2lkIGFzIGQzUG9seWdvbkNlbnRyb2lkLFxuXHRwb2x5Z29uQXJlYSBhcyBkM1BvbHlnb25BcmVhXG59IGZyb20gXCJkMy1wb2x5Z29uXCI7XG5pbXBvcnQge1xuXHRzZWxlY3QgYXMgZDNTZWxlY3QsXG5cdHNlbGVjdEFsbCBhcyBkM1NlbGVjdEFsbFxufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2xvYWRDb25maWd9IGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XG5pbXBvcnQgUGx1Z2luIGZyb20gXCIuLi9QbHVnaW5cIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIjtcblxuLyoqXG4gKiBUZXh0T3ZlcmxhcCBwbHVnaW48YnI+XG4gKiBQcmV2ZW50cyBsYWJlbCBvdmVybGFwIHVzaW5nIFtWb3Jvbm9pIGxheW91dF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVm9yb25vaV9kaWFncmFtKS5cbiAqIC0gKipOT1RFOioqXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqICAgLSBbZDMtcG9seWdvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXBvbHlnb24pXG4gKiAgIC0gW2QzLXZvcm9ub2ldKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy12b3Jvbm9pKVxuICogQGNsYXNzIHBsdWdpbi10ZXh0b3ZlcmxhcFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLXBvbHlnb25cbiAqIEByZXF1aXJlcyBkMy12b3Jvbm9pXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1RleHRPdmVybGFwfVxuICogQGV4YW1wbGVcbiAqIC8vIFBsdWdpbiBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgdGhlIHVzZS5cbiAqIDxzY3JpcHQgc3JjPVwiJFlPVVJfUEFUSC9wbHVnaW4vYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwLmpzXCI+PC9zY3JpcHQ+XG4gKlxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgXHQgIGNvbHVtbnM6IFsgLi4uIF1cbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4udGV4dG92ZXJsYXAoe1xuICogICAgICAgICAgc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcbiAqICAgICAgICAgIGV4dGVudDogOCxcbiAqICAgICAgICAgIGFyZWE6IDNcbiAqICAgICBdXG4gKiAgfSk7XG4gKiBAZXhhbXBsZVxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcbiAqIGltcG9ydCBUZXh0T3ZlcmxhcCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwLmVzbVwiO1xuICpcbiAqIGJiLmdlbmVyYXRlKHtcbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IFRleHRPdmVybGFwKHsgLi4uIH0pXG4gKiAgICAgXVxuICogfSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE92ZXJsYXAgZXh0ZW5kcyBQbHVnaW4ge1xuXHRwcml2YXRlIGNvbmZpZztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcblx0fVxuXG5cdCRyZWRyYXcoKTogdm9pZCB7XG5cdFx0Y29uc3QgdGV4dCA9IGQzU2VsZWN0QWxsKHRoaXMuY29uZmlnLnNlbGVjdG9yKTtcblxuXHRcdCF0ZXh0LmVtcHR5KCkgJiYgdGhpcy5wcmV2ZW50TGFiZWxPdmVybGFwKHRleHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyB0aGUgdm9yb25vaSBsYXlvdXQgZm9yIGRhdGEgbGFiZWxzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIEluZGljZXMgdmFsdWVzXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFZvcm9ub2kgbGF5b3V0IHBvaW50cyBhbmQgY29ycmVzcG9uZGluZyBEYXRhIHBvaW50c1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Z2VuZXJhdGVWb3Jvbm9pKGRhdGEpIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XG5cdFx0Y29uc3QgW21pbiwgbWF4XSA9IFtcInhcIiwgXCJ5XCJdLm1hcCh2ID0+IHNjYWxlW3ZdLmRvbWFpbigpKTtcblxuXHRcdFttaW5bMV0sIG1heFswXV0gPSBbbWF4WzBdLCBtaW5bMV1dO1xuXG5cdFx0cmV0dXJuIGQzVm9yb25vaSgpXG5cdFx0XHQuZXh0ZW50KFttaW4sIG1heF0pXG5cdFx0XHQucG9seWdvbnMoZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRleHQgbGFiZWwncyBwb3NpdGlvbiB0byBwcmV2ZW50ZyBvdmVybGFwLlxuXHQgKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSB0ZXh0IHRhcmdldCB0ZXh0IHNlbGVjdGlvblxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTogdm9pZCB7XG5cdFx0Y29uc3Qge2V4dGVudCwgYXJlYX0gPSB0aGlzLmNvbmZpZztcblx0XHRjb25zdCBjZWxscyA9IHRoaXMuZ2VuZXJhdGVWb3Jvbm9pKHRleHQuZGF0YSgpLm1hcCh2ID0+IFt2LngsIHYudmFsdWVdKSk7XG5cdFx0bGV0IGkgPSAwO1xuXG5cdFx0dGV4dC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc3QgY2VsbCA9IGNlbGxzW2krK107XG5cblx0XHRcdGlmIChjZWxsICYmIHRoaXMpIHtcblx0XHRcdFx0Y29uc3QgW3gsIHldID0gY2VsbC5kYXRhO1xuXHRcdFx0XHRjb25zdCBbY3gsIGN5XSA9IGQzUG9seWdvbkNlbnRyb2lkKGNlbGwpO1xuXHRcdFx0XHRjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMihjeSAtIHksIGN4IC0geCkgLyBNYXRoLlBJICogMik7XG5cblx0XHRcdFx0Y29uc3QgeFRyYW5zbGF0ZSA9IGV4dGVudCAqIChhbmdsZSA9PT0gMCA/IDEgOiAtMSk7XG5cdFx0XHRcdGNvbnN0IHlUcmFuc2xhdGUgPSBhbmdsZSA9PT0gLTEgPyAtZXh0ZW50IDogZXh0ZW50ICsgNTtcblxuXHRcdFx0XHRjb25zdCB0eHRBbmNob3IgPSBNYXRoLmFicyhhbmdsZSkgPT09IDEgP1xuXHRcdFx0XHRcdFwibWlkZGxlXCIgOiAoYW5nbGUgPT09IDAgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcblxuXHRcdFx0XHRkM1NlbGVjdCh0aGlzKVxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHQuYXR0cihcImRpc3BsYXlcIiwgZDNQb2x5Z29uQXJlYShjZWxsKSA8IGFyZWEgPyBcIm5vbmVcIiA6IG51bGwpXG5cdFx0XHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCB0eHRBbmNob3IpXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgMC4ke2FuZ2xlID09PSAxID8gNzEgOiAzNX1lbWApXG5cdFx0XHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3hUcmFuc2xhdGV9LCAke3lUcmFuc2xhdGV9KWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xuXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XG5cblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSkoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5cbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xuXG5leHBvcnQge1xuXHRhc0hhbGZQaXhlbCxcblx0YnJ1c2hFbXB0eSxcblx0Y2FsbEZuLFxuXHRjYXBpdGFsaXplLFxuXHRjZWlsMTAsXG5cdGNvbnZlcnRJbnB1dFR5cGUsXG5cdGRlZXBDbG9uZSxcblx0ZGlmZkRvbWFpbixcblx0ZW5kYWxsLFxuXHRlbXVsYXRlRXZlbnQsXG5cdGV4dGVuZCxcblx0ZmluZEluZGV4LFxuXHRnZXRCcnVzaFNlbGVjdGlvbixcblx0Z2V0Qm91bmRpbmdSZWN0LFxuXHRnZXRDc3NSdWxlcyxcblx0Z2V0TWluTWF4LFxuXHRnZXRPcHRpb24sXG5cdGdldFBhdGhCb3gsXG5cdGdldFJhbmRvbSxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlY3RTZWdMaXN0LFxuXHRnZXRUcmFuc2xhdGlvbixcblx0Z2V0VW5pcXVlLFxuXHRoYXNWYWx1ZSxcblx0aXNBcnJheSxcblx0aXNib29sZWFuLFxuXHRpc0RlZmluZWQsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzTnVtYmVyLFxuXHRpc09iamVjdCxcblx0aXNPYmplY3RUeXBlLFxuXHRpc1N0cmluZyxcblx0aXNUYWJWaXNpYmxlLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNWYWx1ZSxcblx0bWVyZ2VBcnJheSxcblx0bWVyZ2VPYmosXG5cdG5vdEVtcHR5LFxuXHRwYXJzZURhdGUsXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcblxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XG5jb25zdCBpc1VuZGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XG5jb25zdCBjZWlsMTAgPSAodjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXG4pO1xuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0FycmF5ID0gKGFycjogYW55KTogYm9vbGVhbiA9PiBBcnJheS5pc0FycmF5KGFycik7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcblxuLyoqXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxuICogSWYgZGVmYXVsdCB2YWx1ZSBpcyBnaXZlbiwgd2lsbCByZXR1cm4gaWYgZ2l2ZW4ga2V5IHZhbHVlIG5vdCBmb3VuZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWVcbiAqIEByZXR1cm5zIHsqfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBleGlzdCBpbiB0aGUgZ2l2ZW4gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNWYWx1ZShkaWN0OiBvYmplY3QsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbGxGbihmbiwgLi4uYXJncyk6IGJvb2xlYW4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXG4gKiBAcGFyYW0ge2QzLnRyYW5zaXRpb259IHRyYW5zaXRpb24gVHJhbnNpdGlvblxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcblx0bGV0IG4gPSAwO1xuXG5cdHRyYW5zaXRpb25cblx0XHQuZWFjaCgoKSA9PiArK24pXG5cdFx0Lm9uKFwiZW5kXCIsIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcoc3RyKSA/XG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldFRleHRWYWx1ZShcblx0bm9kZTogZDNTZWxlY3Rpb24sXG5cdHRleHQ6IHN0cmluZyxcblx0ZHk6IG51bWJlcltdID0gWy0xLCAxXSxcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xuXHRcdG5vZGUudGV4dCh0ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcblxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XG5cblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcblxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxuXHRcdFx0XHRcdC50ZXh0KHYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XG5cdC8qXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXG5cdCAqICovXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xuXG5cdHJldHVybiBbXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXG5cdFx0e3gsIHl9LCAvLyBzZWcxXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXG5cdF07XG59XG5cbi8qKlxuICogR2V0IHN2ZyBib3VuZGluZyBwYXRoIGJveCBkaW1lbnNpb25cbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhCb3goXG5cdHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudFxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xuXG5cdHJldHVybiB7XG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fSBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0ge30uJGVsIFNlbGVjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9ICRlbC5zdWJjaGFydC5tYWluIHx8ICRlbC5tYWluO1xuXHRsZXQgc2VsZWN0aW9uO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmdDbGllbnRSZWN0LlxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRpbmdSZWN0KG5vZGUpOiB7XG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcbn0ge1xuXHRjb25zdCBuZWVkRXZhbHVhdGUgPSAhKFwicmVjdFwiIGluIG5vZGUpIHx8IChcblx0XHRcInJlY3RcIiBpbiBub2RlICYmIG5vZGUuaGFzQXR0cmlidXRlKFwid2lkdGhcIikgJiYgbm9kZS5yZWN0LndpZHRoICE9PSArbm9kZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKVxuXHQpO1xuXG5cdHJldHVybiBuZWVkRXZhbHVhdGUgP1xuXHRcdChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSA6IG5vZGUucmVjdDtcbn1cblxuLyoqXG4gKiBSZXRydW4gcmFuZG9tIG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcblx0Y29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG5cblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcbn1cblxuLyoqXG4gKiBGaW5kIGluZGV4IGJhc2VkIG9uIGJpbmFyeSBzZWFyY2hcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gdiBUYXJnZXQgbnVtYmVyIHRvIGZpbmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBpbmRleCBvZiBkYXRhIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBpbmRleCBvZiBkYXRhIGFyclxuICogQHBhcmFtIHtib29sZWFufSBpc1JvdGF0ZWQgV2VhdGhlciBpcyByb3RlZCBheGlzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBJbmRleCBudW1iZXJcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgdjogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgaXNSb3RhdGVkOiBib29sZWFuKTogbnVtYmVyIHtcblx0aWYgKHN0YXJ0ID4gZW5kKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0Y29uc3QgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG5cdGxldCB7eCwgdyA9IDB9ID0gYXJyW21pZF07XG5cblx0aWYgKGlzUm90YXRlZCkge1xuXHRcdHggPSBhcnJbbWlkXS55O1xuXHRcdHcgPSBhcnJbbWlkXS5oO1xuXHR9XG5cblx0aWYgKHYgPj0geCAmJiB2IDw9IHggKyB3KSB7XG5cdFx0cmV0dXJuIG1pZDtcblx0fVxuXG5cdHJldHVybiB2IDwgeCA/XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgc3RhcnQsIG1pZCAtIDEsIGlzUm90YXRlZCkgOlxuXHRcdGZpbmRJbmRleChhcnIsIHYsIG1pZCArIDEsIGVuZCwgaXNSb3RhdGVkKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIERlZXAgY29weSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IENsb25lZCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZXBDbG9uZSguLi5vYmplY3ROKSB7XG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IHIgPSBuZXcgdi5jb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xuXHRcdFx0XHRyW2tdID0gY2xvbmUodltrXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByO1xuXHRcdH1cblxuXHRcdHJldHVybiB2O1xuXHR9O1xuXG5cdHJldHVybiBvYmplY3ROLm1hcCh2ID0+IGNsb25lKHYpKVxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcblx0XHRcdHsuLi5hLCAuLi5jfVxuXHRcdCkpO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fEFycmF5fSBzb3VyY2UgU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xuXHR9XG5cblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=