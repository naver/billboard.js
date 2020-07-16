/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.0
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0");



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

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, deepClone, diffDomain, endall, emulateEvent, extend, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

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


var getBoundingRect = function (node) {
  return node.rect || (node.rect = node.getBoundingClientRect());
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwic2VsZWN0b3IiLCJleHRlbnQiLCJUZXh0T3ZlcmxhcCIsImNhbGwiLCJkM1NlbGVjdEFsbCIsInByZXZlbnRMYWJlbE92ZXJsYXAiLCJnZW5lcmF0ZVZvcm9ub2kiLCJkYXRhIiwiJCQiLCJzY2FsZSIsIm1hcCIsInYiLCJkb21haW4iLCJtaW4iLCJtYXgiLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwieCIsInZhbHVlIiwiaSIsImVhY2giLCJjZWxsIiwieSIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwiTWF0aCIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInhUcmFuc2xhdGUiLCJ5VHJhbnNsYXRlIiwidHh0QW5jaG9yIiwiYWJzIiwiZDNTZWxlY3QiLCJhdHRyIiwiZDNQb2x5Z29uQXJlYSIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJmb3VuZCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJlbmRhbGwiLCJ0cmFuc2l0aW9uIiwiY2IiLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImh0bWwiLCJhcHBlbmQiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJnZXRSYW5nZSIsInN0YXJ0IiwiZW5kIiwic3RlcCIsInB1c2giLCJlbXVsYXRlRXZlbnQiLCJtb3VzZSIsImdldFBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsIk1vdXNlRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsInBhcmFtcyIsImRpc3BhdGNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwicGFyc2VEYXRlIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImhpZGRlbiIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImhhc1RvdWNoUG9pbnRzIiwibWF4VG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsIkRvY3VtZW50VG91Y2giLCJoYXNNb3VzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFtRDtBQUNsRixDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7O0FDbEZBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7Ozs7O0FDTkE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNKQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7O0FDYkEsZ0Q7Ozs7Ozs7Ozs7O0FDQUE7Ozs7O0FBSUE7Ozs7O0FBSUE7Ozs7Ozs7OztJQVNxQkEsTTtBQUtwQjs7Ozs7QUFLQSxrQkFBWUMsT0FBWixFQUEwQjtBQUFkQSxXQUFjLGdCQUFkQSxPQUFjLEdBQUosRUFBSSxzUEFDekIsS0FBS0EsT0FBTCxHQUFlQSxPQURVO0FBRXpCO0FBRUQ7Ozs7Ozs7Z0JBSUFDLFcsR0FBQSx1QkFBYyxDQUFFO0FBRWhCOzs7O1dBSUFDLEssR0FBQSxpQkFBUSxDQUFFO0FBRVY7Ozs7V0FJQUMsVSxHQUFBLHNCQUFhLENBQUU7QUFFZjs7OztXQUlBQyxPLEdBQUEsbUJBQVUsQ0FBRTtBQUVaOzs7O1dBSUFDLFksR0FBQSx3QkFBZTtBQUFBOztBQUNkQyxVQUFNLENBQUNDLElBQVAsQ0FBWSxJQUFaLEVBQWtCQyxPQUFsQixDQUEwQixVQUFBQyxHQUFHLEVBQUk7QUFDaEMsV0FBSSxDQUFDQSxHQUFELENBQUosR0FBWSxJQURvQixFQUVoQyxPQUFPLEtBQUksQ0FBQ0EsR0FBRCxDQUZxQjtBQUdoQyxLQUhELENBRGM7QUFLZCxHOzs7a0dBL0NtQlYsTSxhQUdILE87Ozs7Ozs7Ozs7OztBQ3BCbEI7Ozs7O0FBSUE7Ozs7QUFJZTtBQUNkVyxLQUFHLEVBQUUsUUFEUztBQUVkQyxjQUFZLEVBQUUsbUJBRkE7QUFHZEMsTUFBSSxFQUFFLFNBSFE7QUFJZEMsTUFBSSxFQUFFLFNBSlE7QUFLZEMsT0FBSyxFQUFFLFVBTE87QUFNZEMsTUFBSSxFQUFFLFNBTlE7QUFPZEMsT0FBSyxFQUFFLFdBUE87QUFRZEMsWUFBVSxFQUFFLGlCQVJFO0FBU2RDLE9BQUssRUFBRSxXQVRPO0FBVWRDLFFBQU0sRUFBRSxZQVZNO0FBV2RDLGFBQVcsRUFBRSxrQkFYQztBQVlkQyxZQUFVLEVBQUUsaUJBWkU7QUFhZEMsS0FBRyxFQUFFLFFBYlM7QUFjZEMsTUFBSSxFQUFFLFNBZFE7QUFlZEMsT0FBSyxFQUFFLFVBZk87QUFnQmRDLFFBQU0sRUFBRSxXQWhCTTtBQWlCZEMsaUJBQWUsRUFBRSxlQWpCSDtBQWtCZEMsT0FBSyxFQUFFLFVBbEJPO0FBbUJkQyxVQUFRLEVBQUUsY0FuQkk7QUFvQmRDLFdBQVMsRUFBRSxlQXBCRztBQXFCZEMscUJBQW1CLEVBQUUsMEJBckJQO0FBc0JkQyxtQkFBaUIsRUFBRSx5QkF0Qkw7QUF1QmRDLG1CQUFpQixFQUFFLHlCQXZCTDtBQXdCZEMsb0JBQWtCLEVBQUUsMEJBeEJOO0FBeUJkQyxnQkFBYyxFQUFFLHFCQXpCRjtBQTBCZEMscUJBQW1CLEVBQUUsMkJBMUJQO0FBMkJkQyxVQUFRLEVBQUUsY0EzQkk7QUE0QmRDLFdBQVMsRUFBRSxlQTVCRztBQTZCZEMsY0FBWSxFQUFFLGtCQTdCQTtBQThCZEMsV0FBUyxFQUFFLGVBOUJHO0FBK0JkQyxZQUFVLEVBQUUsZ0JBL0JFO0FBZ0NkQyxZQUFVLEVBQUUsZ0JBaENFO0FBaUNkQyxhQUFXLEVBQUUsaUJBakNDO0FBa0NkQyxXQUFTLEVBQUUsZUFsQ0c7QUFtQ2RDLFlBQVUsRUFBRSxnQkFuQ0U7QUFvQ2RDLFFBQU0sRUFBRSxXQXBDTTtBQXFDZEMsU0FBTyxFQUFFLFlBckNLO0FBc0NkQyxjQUFZLEVBQUUsa0JBdENBO0FBdUNkQyxZQUFVLEVBQUUsZUF2Q0U7QUF3Q2RDLFdBQVMsRUFBRSxjQXhDRztBQXlDZEMsVUFBUSxFQUFFLGFBekNJO0FBMENkQyxPQUFLLEVBQUUsVUExQ087QUEyQ2RDLFdBQVMsRUFBRSxlQTNDRztBQTRDZEMsWUFBVSxFQUFFLGdCQTVDRTtBQTZDZEMsb0JBQWtCLEVBQUUseUJBN0NOO0FBOENkQyxrQkFBZ0IsRUFBRSx1QkE5Q0o7QUErQ2RDLFNBQU8sRUFBRSxZQS9DSztBQWdEZEMsWUFBVSxFQUFFLGdCQWhERTtBQWlEZEMsTUFBSSxFQUFFLFNBakRRO0FBa0RkQyxXQUFTLEVBQUUsZUFsREc7QUFtRGRDLFFBQU0sRUFBRSxXQW5ETTtBQW9EZEMsa0JBQWdCLEVBQUUsc0JBcERKO0FBcURkQyxZQUFVLEVBQUUsZ0JBckRFO0FBc0RkQyxpQkFBZSxFQUFFLHNCQXRESDtBQXVEZEMsbUJBQWlCLEVBQUUsd0JBdkRMO0FBd0RkQyxrQkFBZ0IsRUFBRSx1QkF4REo7QUF5RGRDLGlCQUFlLEVBQUUsc0JBekRIO0FBMERkQyxnQkFBYyxFQUFFLHFCQTFERjtBQTJEZEMsT0FBSyxFQUFFLFVBM0RPO0FBNERkQyxRQUFNLEVBQUUsV0E1RE07QUE2RGRDLE1BQUksRUFBRSxTQTdEUTtBQThEZEMsT0FBSyxFQUFFLFVBOURPO0FBK0RkQyxNQUFJLEVBQUUsU0EvRFE7QUFnRWRDLFFBQU0sRUFBRSxXQWhFTTtBQWlFZEMsU0FBTyxFQUFFLFlBakVLO0FBa0VkQyxnQkFBYyxFQUFFLG9CQWxFRjtBQW1FZEMsaUJBQWUsRUFBRSxxQkFuRUg7QUFvRWRDLE9BQUssRUFBRSxVQXBFTztBQXFFZEMsUUFBTSxFQUFFLFdBckVNO0FBc0VkQyxrQkFBZ0IsRUFBRSxzQkF0RUo7QUF1RWRDLGNBQVksRUFBRSxrQkF2RUE7QUF3RWRDLGVBQWEsRUFBRSxtQkF4RUQ7QUF5RWRDLGdCQUFjLEVBQUUsb0JBekVGO0FBMEVkQyxpQkFBZSxFQUFFLHFCQTFFSDtBQTJFZEMsVUFBUSxFQUFFLGFBM0VJO0FBNEVkQyxRQUFNLEVBQUUsV0E1RU07QUE2RWRDLE1BQUksRUFBRSxTQTdFUTtBQThFZEMsT0FBSyxFQUFFLFVBOUVPO0FBK0VkQyxPQUFLLEVBQUUsVUEvRU87QUFnRmRDLFNBQU8sRUFBRSxZQWhGSztBQWlGZEMsa0JBQWdCLEVBQUUsc0JBakZKO0FBa0ZkQyxhQUFXLEVBQUUsaUJBbEZDO0FBbUZkQyxPQUFLLEVBQUUsVUFuRk87QUFvRmRDLFlBQVUsRUFBRSxnQkFwRkU7QUFxRmRDLFdBQVMsRUFBRSxlQXJGRztBQXNGZEMsWUFBVSxFQUFFLGdCQXRGRTtBQXVGZEMsUUFBTSxFQUFFLFdBdkZNO0FBd0ZkQyxPQUFLLEVBQUUsVUF4Rk87QUF5RmRDLFlBQVUsRUFBRSxnQkF6RkU7QUEwRmRDLFdBQVMsRUFBRSxlQTFGRztBQTJGZEMsWUFBVSxFQUFFLGdCQTNGRTtBQTRGZEMsUUFBTSxFQUFFLFdBNUZNO0FBNkZkQyxXQUFTLEVBQUUsZUE3Rkc7QUE4RmRDLFVBQVEsRUFBRSxZQTlGSTtBQStGZEMsVUFBUSxFQUFFLFlBL0ZJO0FBZ0dkQyxVQUFRLEVBQUUsWUFoR0k7QUFpR2RDLGlCQUFlLEVBQUU7QUFqR0gsQ0FBZixFOzs7Ozs7O0FDUkE7QUFBQTtBQUFBOzs7O0FBSUE7O0FBR0E7Ozs7O0FBS08sU0FBU0MsVUFBVCxDQUFvQkMsTUFBcEIsRUFBMkM7QUFBQSxNQUU3Q3ZCLE1BRjZDO0FBQUEsTUFHN0M5RSxJQUg2QztBQUFBLE1BSTdDc0csSUFKNkM7QUFBQSxNQUMzQ0MsVUFBbUIsR0FBRyxLQUFLRixNQURnQjtBQUFBLE1BTTNDRyxJQUFJLEdBQUcsWUFBTTtBQUNsQixRQUFNdEcsR0FBRyxHQUFHRixJQUFJLENBQUN5RyxLQUFMLEVBQVo7QUFEa0IsV0FHZHZHLEdBQUcsSUFBSTRFLE1BQVAsSUFBaUI0Qix5RUFBWSxDQUFDNUIsTUFBRCxDQUE3QixJQUF5QzVFLEdBQUcsSUFBSTRFLE1BSGxDLElBSWpCQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQzVFLEdBQUQsQ0FKRSxFQUtWc0csSUFBSSxFQUxNLElBTU50RyxHQU5NLEdBVVh5RyxTQVZXLEdBT1Y3QixNQVBVO0FBV2xCLEdBakJnRDs7QUFtQmpEL0UsUUFBTSxDQUFDQyxJQUFQLENBQVl1RyxVQUFaLEVBQXdCdEcsT0FBeEIsQ0FBZ0MsVUFBQUMsR0FBRyxFQUFJO0FBQ3RDNEUsVUFBTSxHQUFHdUIsTUFENkIsRUFFdENyRyxJQUFJLEdBQUdFLEdBQUcsQ0FBQzBHLEtBQUosQ0FBVSxHQUFWLENBRitCLEVBR3RDTixJQUFJLEdBQUdFLElBQUksRUFIMkIsRUFLbENLLHNFQUFTLENBQUNQLElBQUQsQ0FMeUIsS0FNckNDLFVBQVUsQ0FBQ3JHLEdBQUQsQ0FBVixHQUFrQm9HLElBTm1CO0FBUXRDLEdBUkQsQ0FuQmlEO0FBNEJqRCxDOzs7Ozs7QUN4Q0QsaUQ7Ozs7Ozs7O0FDQUEsaUQ7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7QUFJQTs7Ozs7Ozs7SUFRcUJRLE8sR0FDcEIsWUFBYztBQUNiLFNBQU87QUFDTjs7Ozs7Ozs7OztBQVVBQyxZQUFRLEVBQUUsZ0JBWEo7O0FBYU47Ozs7Ozs7OztBQVNBQyxVQUFNLEVBQUUsQ0F0QkY7O0FBd0JOOzs7Ozs7Ozs7QUFTQTFHLFFBQUksRUFBRTtBQWpDQSxHQUFQO0FBbUNBLEM7Ozs7Ozs7O0FDakRGOzs7O0FBSUE7QUFDQTtBQUlBO0FBSUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkNxQjJHLHVCO0FBR3BCLHVCQUFZeEgsT0FBWixFQUFxQjtBQUFBOztBQUlwQixtQkFIQSxtQkFBTUEsT0FBTixDQUdBLGdJQUZBLE1BQUs0RyxNQUFMLEdBQWMsSUFBSVMsT0FBSixFQUVkO0FBQ0E7Ozs7O2dCQUVEbkgsSyxHQUFBLGlCQUFjO0FBQ2J5RyxnQ0FBVSxDQUFDYyxJQUFYLENBQWdCLElBQWhCLEVBQXNCLEtBQUt6SCxPQUEzQixDQURhO0FBRWIsRyxTQUVESSxPLEdBQUEsbUJBQWdCO0FBQ2YsUUFBTWtGLElBQUksR0FBR29DLG9HQUFXLENBQUMsS0FBS2QsTUFBTCxDQUFZVSxRQUFiLENBQXhCO0FBRUNoQyxRQUFJLENBQUNuQyxLQUFMLEVBQUQsSUFBaUIsS0FBS3dFLG1CQUFMLENBQXlCckMsSUFBekIsQ0FIRjtBQUlmO0FBRUQ7Ozs7OztXQU1Bc0MsZSxHQUFBLHlCQUFnQkMsSUFBaEIsRUFBc0I7QUFBQSxRQUNkQyxFQURjLEdBQ1IsSUFEUSxDQUNkQSxFQURjO0FBQUEsUUFFZEMsS0FGYyxHQUVMRCxFQUZLLENBRWRDLEtBRmM7QUFBQSxlQUdGLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBV0MsR0FBWCxDQUFlLFVBQUFDLENBQUM7QUFBQSxhQUFJRixLQUFLLENBQUNFLENBQUQsQ0FBTCxDQUFTQyxNQUFULEVBQUo7QUFBQSxLQUFoQixDQUhFO0FBQUEsUUFHZEMsR0FIYztBQUFBLFFBR1RDLEdBSFM7QUFBQSxlQUtGLENBQUNBLEdBQUcsQ0FBQyxDQUFELENBQUosRUFBU0QsR0FBRyxDQUFDLENBQUQsQ0FBWixDQUxFOztBQU9yQixXQUZDQSxHQUFHLENBQUMsQ0FBRCxDQUVKLFlBRlNDLEdBQUcsQ0FBQyxDQUFELENBRVosWUFBT0MsNEZBQVMsR0FDZGQsTUFESyxDQUNFLENBQUNZLEdBQUQsRUFBTUMsR0FBTixDQURGLEVBRUxFLFFBRkssQ0FFSVQsSUFGSixDQUFQO0FBR0E7QUFFRDs7Ozs7V0FLQUYsbUIsR0FBQSw2QkFBb0JyQyxJQUFwQixFQUFnQztBQUFBLHVCQUNSLEtBQUtzQixNQURHO0FBQUEsUUFDeEJXLE1BRHdCLGdCQUN4QkEsTUFEd0I7QUFBQSxRQUNoQjFHLElBRGdCLGdCQUNoQkEsSUFEZ0I7QUFBQSxRQUV6QjBILEtBRnlCLEdBRWpCLEtBQUtYLGVBQUwsQ0FBcUJ0QyxJQUFJLENBQUN1QyxJQUFMLEdBQVlHLEdBQVosQ0FBZ0IsVUFBQUMsQ0FBQztBQUFBLGFBQUksQ0FBQ0EsQ0FBQyxDQUFDTyxDQUFILEVBQU1QLENBQUMsQ0FBQ1EsS0FBUixDQUFKO0FBQUEsS0FBakIsQ0FBckIsQ0FGaUI7QUFBQSxRQUczQkMsQ0FIMkIsR0FHdkIsQ0FIdUI7QUFLL0JwRCxRQUFJLENBQUNxRCxJQUFMLENBQVUsWUFBVztBQUNwQixVQUFNQyxJQUFJLEdBQUdMLEtBQUssQ0FBQ0csQ0FBQyxFQUFGLENBQWxCOztBQUVBLFVBQUlFLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQUEseUJBQ0ZBLElBQUksQ0FBQ2YsSUFESDtBQUFBLFlBQ1ZXLENBRFU7QUFBQSxZQUNQSyxDQURPO0FBQUEsaUNBRUFDLG9HQUFpQixDQUFDRixJQUFELENBRmpCO0FBQUEsWUFFVkcsRUFGVTtBQUFBLFlBRU5DLEVBRk07QUFBQSxZQUdYQyxLQUhXLEdBR0hDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLEtBQUwsQ0FBV0osRUFBRSxHQUFHSCxDQUFoQixFQUFtQkUsRUFBRSxHQUFHUCxDQUF4QixJQUE2QlUsSUFBSSxDQUFDRyxFQUFsQyxHQUF1QyxDQUFsRCxDQUhHO0FBQUEsWUFLWEMsVUFMVyxHQUtFL0IsTUFBTSxJQUFJMEIsS0FBSyxLQUFLLENBQVYsR0FBYyxDQUFkLEdBQWtCLENBQUMsQ0FBdkIsQ0FMUjtBQUFBLFlBTVhNLFVBTlcsR0FNRU4sS0FBSyxLQUFLLENBQUMsQ0FBWCxHQUFlLENBQUMxQixNQUFoQixHQUF5QkEsTUFBTSxHQUFHLENBTnBDO0FBQUEsWUFRWGlDLFNBUlcsR0FRQ04sSUFBSSxDQUFDTyxHQUFMLENBQVNSLEtBQVQsTUFBb0IsQ0FBcEIsR0FDakIsUUFEaUIsR0FDTEEsS0FBSyxLQUFLLENBQVYsR0FBYyxPQUFkLEdBQXdCLEtBVHBCOztBQVdqQlMseUdBQVEsQ0FBQyxJQUFELENBQVIsQ0FDQztBQURELFNBRUVDLElBRkYsQ0FFTyxTQUZQLEVBRWtCQyxnR0FBYSxDQUFDaEIsSUFBRCxDQUFiLEdBQXNCL0gsSUFBdEIsR0FBNkIsTUFBN0IsR0FBc0MsSUFGeEQsRUFHRThJLElBSEYsQ0FHTyxhQUhQLEVBR3NCSCxTQUh0QixFQUlFRyxJQUpGLENBSU8sSUFKUCxVQUlrQlYsS0FBSyxLQUFLLENBQVYsR0FBYyxFQUFkLEdBQW1CLEVBSnJDLFVBS0VVLElBTEYsQ0FLTyxXQUxQLGlCQUtpQ0wsVUFMakMsVUFLZ0RDLFVBTGhELE9BWGlCO0FBaUJqQjtBQUNELEtBckJELENBTCtCO0FBMkIvQixHO0VBdEV1Q3hKLHlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUR6Qzs7Ozs7QUFJQTs7Ozs7QUFJQTtBQUNBOztJQUVNOEosR0FBRyxHQUFJLFlBQU07QUFDbEIsTUFBTUMsR0FBRyxHQUFHLFVBQUFDLENBQUM7QUFBQSxXQUFJLE9BQU9BLENBQVAsS0FBYSxXQUFiLElBQTRCQSxDQUFoQztBQUFBLEdBQWI7O0FBRUEsU0FBT0QsR0FBRyxDQUFDRSxJQUFELENBQUgsSUFBYUYsR0FBRyxDQUFDRyxNQUFELENBQWhCLElBQTRCSCxHQUFHLENBQUNJLE1BQUQsQ0FBL0IsSUFBMkNKLEdBQUcsQ0FBQ0ssVUFBRCxDQUE5QyxJQUE4REMsUUFBUSxDQUFDLGFBQUQsQ0FBUixFQUFyRTtBQUNBLENBSlcsRTtJQU9OQyxHQUFHLEdBQUdSLEdBQUcsSUFBSUEsR0FBRyxDQUFDUyxRO0FBRnZCLHlDOzs7Ozs7Ozs7OztBQ2hCQTs7Ozs7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztJQStDTUMsT0FBTyxHQUFHLFVBQUN0QyxDQUFEO0FBQUEsU0FBcUJBLENBQUMsSUFBSUEsQ0FBQyxLQUFLLENBQWhDO0FBQUEsQztJQUNWdUMsVUFBVSxHQUFHLFVBQUN2QyxDQUFEO0FBQUEsU0FBcUIsT0FBT0EsQ0FBUCxLQUFhLFVBQWxDO0FBQUEsQztJQUNid0MsUUFBUSxHQUFHLFVBQUN4QyxDQUFEO0FBQUEsU0FBcUIsT0FBT0EsQ0FBUCxLQUFhLFFBQWxDO0FBQUEsQztJQUNYeUMsUUFBUSxHQUFHLFVBQUN6QyxDQUFEO0FBQUEsU0FBcUIsT0FBT0EsQ0FBUCxLQUFhLFFBQWxDO0FBQUEsQztJQUNYMEMsV0FBVyxHQUFHLFVBQUMxQyxDQUFEO0FBQUEsU0FBcUIsT0FBT0EsQ0FBUCxLQUFhLFdBQWxDO0FBQUEsQztJQUNkYixTQUFTLEdBQUcsVUFBQ2EsQ0FBRDtBQUFBLFNBQXFCLE9BQU9BLENBQVAsS0FBYSxXQUFsQztBQUFBLEM7SUFDWjJDLFNBQVMsR0FBRyxVQUFDM0MsQ0FBRDtBQUFBLFNBQXFCLE9BQU9BLENBQVAsS0FBYSxTQUFsQztBQUFBLEM7SUFDWjRDLE1BQU0sR0FBRyxVQUFDNUMsQ0FBRDtBQUFBLFNBQW9CaUIsSUFBSSxDQUFDNEIsSUFBTCxDQUFVN0MsQ0FBQyxHQUFHLEVBQWQsSUFBb0IsRUFBeEM7QUFBQSxDO0lBQ1Q4QyxXQUFXLEdBQUcsVUFBQ0MsQ0FBRDtBQUFBLFNBQW9COUIsSUFBSSxDQUFDNEIsSUFBTCxDQUFVRSxDQUFWLElBQWUsRUFBbkM7QUFBQSxDO0lBQ2RDLFVBQVUsR0FBRyxVQUFDQyxDQUFEO0FBQUEsU0FBeUJBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBakM7QUFBQSxDO0lBQ2JqRSxZQUFZLEdBQUcsVUFBQ2dCLENBQUQ7QUFBQSxTQUFxQixPQUFPQSxDQUFQLEtBQWEsUUFBbEM7QUFBQSxDO0lBQ2ZrRCxPQUFPLEdBQUcsVUFBQ3BCLENBQUQ7QUFBQSxTQUNmWSxXQUFXLENBQUNaLENBQUQsQ0FBWCxJQUFrQkEsQ0FBQyxLQUFLLElBQXhCLElBQ0NVLFFBQVEsQ0FBQ1YsQ0FBRCxDQUFSLElBQWVBLENBQUMsQ0FBQ3FCLE1BQUYsS0FBYSxDQUQ3QixJQUVDbkUsWUFBWSxDQUFDOEMsQ0FBRCxDQUFaLElBQW1CLEVBQUVBLENBQUMsWUFBWXNCLElBQWYsQ0FBbkIsSUFBMkMvSyxNQUFNLENBQUNDLElBQVAsQ0FBWXdKLENBQVosRUFBZXFCLE1BQWYsS0FBMEIsQ0FGdEUsSUFHQ1YsUUFBUSxDQUFDWCxDQUFELENBQVIsSUFBZXVCLEtBQUssQ0FBQ3ZCLENBQUQsQ0FKTjtBQUFBLEM7SUFNVndCLFFBQVEsR0FBRyxVQUFDeEIsQ0FBRDtBQUFBLFNBQXFCLENBQUNvQixPQUFPLENBQUNwQixDQUFELENBQTdCO0FBQUEsQztJQVFYeUIsT0FBTyxHQUFHLFVBQUNDLEdBQUQ7QUFBQSxTQUF1QkMsS0FBSyxDQUFDRixPQUFOLENBQWNDLEdBQWQsQ0FBdkI7QUFBQSxDO0lBUVZFLFFBQVEsR0FBRyxVQUFDQyxHQUFEO0FBQUEsU0FBdUJBLEdBQUcsSUFBSSxDQUFDQSxHQUFHLENBQUNDLFFBQVosSUFBd0I1RSxZQUFZLENBQUMyRSxHQUFELENBQXBDLElBQTZDLENBQUNKLE9BQU8sQ0FBQ0ksR0FBRCxDQUE1RTtBQUFBLEM7O0FBRWpCOzs7Ozs7Ozs7QUFTQSxTQUFTRSxTQUFULENBQW1COUwsT0FBbkIsRUFBb0NTLEdBQXBDLEVBQWlEc0wsWUFBakQsRUFBb0U7QUFDbkUsU0FBTzNFLFNBQVMsQ0FBQ3BILE9BQU8sQ0FBQ1MsR0FBRCxDQUFSLENBQVQsR0FBMEJULE9BQU8sQ0FBQ1MsR0FBRCxDQUFqQyxHQUF5Q3NMLFlBQWhEO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBZ0N4RCxLQUFoQyxFQUFxRDtBQUNwRCxNQUFJeUQsS0FBSyxLQUFUO0FBSUEsU0FGQTVMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZMEwsSUFBWixFQUFrQnpMLE9BQWxCLENBQTBCLFVBQUFDLEdBQUc7QUFBQSxXQUFLd0wsSUFBSSxDQUFDeEwsR0FBRCxDQUFKLEtBQWNnSSxLQUFmLEtBQTBCeUQsS0FBSyxLQUEvQixDQUFKO0FBQUEsR0FBN0IsQ0FFQSxFQUFPQSxLQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsRUFBaEIsRUFBc0M7QUFBQSxXQUMvQkMsSUFBSSxHQUFHN0IsVUFBVSxDQUFDNEIsRUFBRCxDQURjLDJCQUFmRSxJQUFlLGtFQUFmQSxJQUFlOztBQUlyQyxTQURBRCxJQUFJLElBQUlELEVBQUUsQ0FBQzNFLElBQUgsT0FBQTJFLEVBQUUsRUFBU0UsSUFBVCxDQUNWLEVBQU9ELElBQVA7QUFDQTtBQUVEOzs7Ozs7OztBQU1BLFNBQVNFLE1BQVQsQ0FBZ0JDLFVBQWhCLEVBQTRCQyxFQUE1QixFQUFnRDtBQUMvQyxNQUFJekIsQ0FBQyxHQUFHLENBQVI7QUFFQXdCLFlBQVUsQ0FDUjdELElBREYsQ0FDTztBQUFBLFdBQU0sRUFBRXFDLENBQVI7QUFBQSxHQURQLEVBRUUwQixFQUZGLENBRUssS0FGTCxFQUVZLFlBQWtCO0FBQUEsdUNBQU5KLElBQU0sb0RBQU5BLElBQU07O0FBQzNCLE1BQUV0QixDQUFILElBQVF5QixFQUFFLENBQUNFLEtBQUgsT0FBQUYsRUFBRSxHQUFPLElBQVAsU0FBZ0JILElBQWhCLEVBRGtCO0FBRTVCLEdBSkYsQ0FIK0M7QUFRL0M7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTTSxRQUFULENBQWtCQyxHQUFsQixFQUF1QztBQUN0QyxTQUFPcEMsUUFBUSxDQUFDb0MsR0FBRCxDQUFSLEdBQ05BLEdBQUcsQ0FBQ0MsT0FBSixDQUFZLElBQVosRUFBa0IsTUFBbEIsRUFBMEJBLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLE1BQXhDLENBRE0sR0FDNENELEdBRG5EO0FBRUE7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNFLFlBQVQsQ0FDQ0MsSUFERCxFQUVDMUgsSUFGRCxFQUdDMkgsRUFIRCxFQUlDQyxRQUpELEVBS0U7QUFDRCxNQUhBRCxFQUdBLGdCQUhBQSxFQUdBLEdBSGUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBR2YsR0FGQUMsUUFFQSxnQkFGQUEsUUFFQSxRQUFLRixJQUFELElBQVV2QyxRQUFRLENBQUNuRixJQUFELENBQXRCLEVBSUEsSUFBSUEsSUFBSSxDQUFDNkgsT0FBTCxDQUFhLElBQWIsTUFBdUIsQ0FBQyxDQUE1QixFQUNDSCxJQUFJLENBQUMxSCxJQUFMLENBQVVBLElBQVYsQ0FERCxNQUVPO0FBQ04sUUFBTThILElBQUksR0FBRyxDQUFDSixJQUFJLENBQUMxSCxJQUFMLEVBQUQsRUFBY0EsSUFBZCxFQUFvQjBDLEdBQXBCLENBQXdCLFVBQUFDLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUM2RSxPQUFGLENBQVUsU0FBVixFQUFxQixFQUFyQixDQUFKO0FBQUEsS0FBekIsQ0FBYjs7QUFFQSxRQUFJTSxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVlBLElBQUksQ0FBQyxDQUFELENBQXBCLEVBQXlCO0FBQUEsVUFDbEJDLFNBQVMsR0FBRy9ILElBQUksQ0FBQzZCLEtBQUwsQ0FBVyxJQUFYLENBRE07QUFBQSxVQUVsQm1HLEdBQUcsR0FBR0osUUFBUSxHQUFHRyxTQUFTLENBQUNqQyxNQUFWLEdBQW1CLENBQXRCLEdBQTBCLENBRnRCO0FBS3hCNEIsVUFBSSxDQUFDTyxJQUFMLENBQVUsRUFBVixDQUx3QixFQU94QkYsU0FBUyxDQUFDN00sT0FBVixDQUFrQixVQUFDeUgsQ0FBRCxFQUFJUyxDQUFKLEVBQVU7QUFDM0JzRSxZQUFJLENBQUNRLE1BQUwsQ0FBWSxPQUFaLEVBQ0U3RCxJQURGLENBQ08sR0FEUCxFQUNZLENBRFosRUFFRUEsSUFGRixDQUVPLElBRlAsR0FFZ0JqQixDQUFDLEtBQUssQ0FBTixHQUFVdUUsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRSyxHQUFsQixHQUF3QkwsRUFBRSxDQUFDLENBQUQsQ0FGMUMsVUFHRTNILElBSEYsQ0FHTzJDLENBSFAsQ0FEMkI7QUFLM0IsT0FMRCxDQVB3QjtBQWF4QjtBQUNEO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTd0YsY0FBVCxDQUF3QkMsSUFBeEIsRUFBNEU7QUFDM0U7Ozs7Ozs7QUFEMkUsc0JBUTdDQSxJQUFJLENBQUNDLE9BQUwsRUFSNkM7QUFBQSxNQVFwRW5GLENBUm9FLGlCQVFwRUEsQ0FSb0U7QUFBQSxNQVFqRUssQ0FSaUUsaUJBUWpFQSxDQVJpRTtBQUFBLE1BUTlEK0UsS0FSOEQsaUJBUTlEQSxLQVI4RDtBQUFBLE1BUXZEQyxNQVJ1RCxpQkFRdkRBLE1BUnVEOztBQVUzRSxTQUFPLENBQ047QUFBQ3JGLEtBQUMsRUFBREEsQ0FBRDtBQUFJSyxLQUFDLEVBQUVBLENBQUMsR0FBR2dGO0FBQVgsR0FETSxFQUNjO0FBQ3BCO0FBQUNyRixLQUFDLEVBQURBLENBQUQ7QUFBSUssS0FBQyxFQUFEQTtBQUFKLEdBRk0sRUFFRTtBQUNSO0FBQUNMLEtBQUMsRUFBRUEsQ0FBQyxHQUFHb0YsS0FBUjtBQUFlL0UsS0FBQyxFQUFEQTtBQUFmLEdBSE0sRUFHYTtBQUNuQjtBQUFDTCxLQUFDLEVBQUVBLENBQUMsR0FBR29GLEtBQVI7QUFBZS9FLEtBQUMsRUFBRUEsQ0FBQyxHQUFHZ0Y7QUFBdEIsR0FKTSxDQUl3QjtBQUp4QixHQUFQO0FBTUE7QUFFRDs7Ozs7Ozs7QUFNQSxTQUFTQyxVQUFULENBQ0NKLElBREQsRUFFeUQ7QUFBQSw4QkFDaENBLElBQUksQ0FBQ0sscUJBQUwsRUFEZ0M7QUFBQSxNQUNqREgsS0FEaUQseUJBQ2pEQSxLQURpRDtBQUFBLE1BQzFDQyxNQUQwQyx5QkFDMUNBLE1BRDBDO0FBQUEsTUFFbERHLEtBRmtELEdBRTFDUCxjQUFjLENBQUNDLElBQUQsQ0FGNEI7QUFBQSxNQUdsRGxGLENBSGtELEdBRzlDd0YsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTeEYsQ0FIcUM7QUFBQSxNQUlsREssQ0FKa0QsR0FJOUNLLElBQUksQ0FBQ2YsR0FBTCxDQUFTNkYsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTbkYsQ0FBbEIsRUFBcUJtRixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNuRixDQUE5QixDQUo4Qzs7QUFNeEQsU0FBTztBQUNOTCxLQUFDLEVBQURBLENBRE07QUFDSEssS0FBQyxFQUFEQSxDQURHO0FBQ0ErRSxTQUFLLEVBQUxBLEtBREE7QUFDT0MsVUFBTSxFQUFOQTtBQURQLEdBQVA7QUFHQTtBQUVEOzs7Ozs7Ozs7QUFPQSxTQUFTSSxpQkFBVCxPQUFrQztBQUc3QixNQUFBQyxTQUFTO0FBQUEsTUFIY0MsR0FHZCxRQUhjQSxHQUdkO0FBQUEsTUFGUEMsS0FFTyxHQUZDQyx3RkFFRDtBQUFBLE1BRFA3SixJQUNPLEdBREEySixHQUFHLENBQUMvSSxRQUFKLENBQWFaLElBQWIsSUFBcUIySixHQUFHLENBQUMzSixJQUN6QjtBQVViLFNBUEk0SixLQUFLLElBQUlBLEtBQUssQ0FBQ0UsSUFBTixLQUFlLE9BTzVCLEdBTkNKLFNBQVMsR0FBR0UsS0FBSyxDQUFDRixTQU1uQixHQUpXMUosSUFBSSxLQUFLMEosU0FBUyxHQUFHMUosSUFBSSxDQUFDK0osTUFBTCxPQUFnQkMsMEJBQUssQ0FBQ2hOLEtBQXRCLEVBQStCd0wsSUFBL0IsRUFBakIsQ0FJZixLQUhDa0IsU0FBUyxHQUFHTyw2RkFBZ0IsQ0FBQ1AsU0FBRCxDQUc3QixHQUFPQSxTQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsSUFBTVEsZUFBZSxHQUFHLFVBQUMxQixJQUFEO0FBQUEsU0FHbkJBLElBQUksQ0FBQzJCLElBQUwsS0FBYzNCLElBQUksQ0FBQzJCLElBQUwsR0FBWTNCLElBQUksQ0FBQ2UscUJBQUwsRUFBMUIsQ0FIbUI7QUFBQSxDQUF4QjtBQUtBOzs7Ozs7OztBQU1BLFNBQVNhLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTJEO0FBQXhDQSxPQUF3QyxnQkFBeENBLEtBQXdDO0FBQzFELE1BQU1DLElBQUksR0FBRzVGLElBQUksQ0FBQzZGLE1BQUwsRUFBYjtBQUVBLFNBQU9GLEtBQUssR0FBVUMsSUFBVixRQUFrQkEsSUFBOUI7QUFDQTtBQUVEOzs7Ozs7OztBQU1BLFNBQVNFLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQWtDO0FBQ2pDLE1BQU1mLFNBQVMsR0FBR0QsaUJBQWlCLENBQUNnQixHQUFELENBQW5DO0FBRGlDLFVBRzdCZixTQUg2QixJQU96QkEsU0FBUyxDQUFDLENBQUQsQ0FBVCxLQUFpQkEsU0FBUyxDQUFDLENBQUQsQ0FQRDtBQVdqQztBQUVEOzs7Ozs7OztBQU1BLFNBQVNnQixTQUFULEdBQStCO0FBQUEsV0FDeEJDLEtBQUs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBRyxVQUFBbEgsQ0FBQyxFQUFJO0FBQ2xCLFFBQUkwRCxRQUFRLENBQUMxRCxDQUFELENBQVIsSUFBZUEsQ0FBQyxDQUFDbUgsV0FBckIsRUFBa0M7QUFDakMsVUFBTUMsQ0FBQyxHQUFHLElBQUlwSCxDQUFDLENBQUNtSCxXQUFOLEVBQVY7O0FBRUEsV0FBSyxJQUFNRSxDQUFYLElBQWdCckgsQ0FBaEIsRUFDQ29ILENBQUMsQ0FBQ0MsQ0FBRCxDQUFELEdBQU9ILEtBQUssQ0FBQ2xILENBQUMsQ0FBQ3FILENBQUQsQ0FBRixDQURiOztBQUlBLGFBQU9ELENBQVA7QUFDQTs7QUFFRCxXQUFPcEgsQ0FBUDtBQUNBLEdBWlUsQ0FEbUIsNEJBQVRzSCxPQUFTLG9EQUFUQSxPQUFTOztBQWU5QixTQUFPQSxPQUFPLENBQUN2SCxHQUFSLENBQVksVUFBQUMsQ0FBQztBQUFBLFdBQUlrSCxLQUFLLENBQUNsSCxDQUFELENBQVQ7QUFBQSxHQUFiLEVBQ0x1SCxNQURLLENBQ0UsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsMkNBQ0hELENBREcsR0FDR0MsQ0FESDtBQUFBLEdBREYsQ0FBUDtBQUlBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVNDLE1BQVQsQ0FBZ0J0SyxNQUFoQixFQUE2QnVLLE1BQTdCLEVBQTZDO0FBSzVDO0FBQ0EsT0FBSyxJQUFNQyxDQUFYLElBTmV4SyxNQU1mLGdCQU5lQSxNQU1mLEdBTndCLEVBTXhCLEdBTEltRyxPQUFPLENBQUNvRSxNQUFELENBS1gsSUFKQ0EsTUFBTSxDQUFDcFAsT0FBUCxDQUFlLFVBQUF5SCxDQUFDO0FBQUEsV0FBSTBILE1BQU0sQ0FBQ3RLLE1BQUQsRUFBUzRDLENBQVQsQ0FBVjtBQUFBLEdBQWhCLENBSUQsRUFBZ0IySCxNQUFoQixFQUNLLFFBQVFFLElBQVIsQ0FBYUQsQ0FBYixLQUFtQkEsQ0FBQyxJQUFJeEssTUFEN0IsS0FLQ0EsTUFBTSxDQUFDd0ssQ0FBRCxDQUFOLEdBQVlELE1BQU0sQ0FBQ0MsQ0FBRCxDQUxuQjs7QUFRQSxTQUFPeEssTUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7O0lBTU0wSyxVQUFVLEdBQUcsVUFBQ2xELEdBQUQ7QUFBQSxTQUF5QkEsR0FBRyxDQUFDbUQsTUFBSixDQUFXLENBQVgsRUFBY0MsV0FBZCxLQUE4QnBELEdBQUcsQ0FBQ3FELEtBQUosQ0FBVSxDQUFWLENBQXZEO0FBQUEsQztJQVFiQyxPQUFPLEdBQUcsVUFBQ2xJLENBQUQ7QUFBQSxTQUF1QyxHQUFHaUksS0FBSCxDQUFTekksSUFBVCxDQUFjUSxDQUFkLENBQXZDO0FBQUEsQztBQU5oQjs7Ozs7Ozs7QUFRQTs7Ozs7O0FBTUEsU0FBU21JLFdBQVQsQ0FBcUJDLFdBQXJCLEVBQXlDO0FBQ3hDLE1BQUlDLEtBQUssR0FBRyxFQUFaO0FBWUEsU0FWQUQsV0FBVyxDQUFDN1AsT0FBWixDQUFvQixVQUFBK1AsS0FBSyxFQUFJO0FBQzVCLFFBQUk7QUFDQ0EsV0FBSyxDQUFDQyxRQUFOLElBQWtCRCxLQUFLLENBQUNDLFFBQU4sQ0FBZXBGLE1BRGxDLEtBRUZrRixLQUFLLEdBQUdBLEtBQUssQ0FBQ0csTUFBTixDQUFhTixPQUFPLENBQUNJLEtBQUssQ0FBQ0MsUUFBUCxDQUFwQixDQUZOO0FBSUgsS0FKRCxDQUlFLE9BQU9FLENBQVAsRUFBVTtBQUNYQyxhQUFPLENBQUNDLEtBQVIscUNBQWdETCxLQUFLLENBQUNNLElBQXRELFVBQStESCxDQUFDLENBQUNJLFFBQUYsRUFBL0QsQ0FEVztBQUVYO0FBQ0QsR0FSRCxDQVVBLEVBQU9SLEtBQVA7QUFDQTtBQUVEOzs7Ozs7OztBQU1BLElBQU1TLGNBQWMsR0FBRyxVQUFBL0QsSUFBSSxFQUFJO0FBQUEsTUFDeEJnRSxTQUFTLEdBQUdoRSxJQUFJLEdBQUdBLElBQUksQ0FBQ2dFLFNBQVIsR0FBb0IsSUFEWjtBQUFBLE1BRXhCQyxPQUFPLEdBQUdELFNBQVMsSUFBSUEsU0FBUyxDQUFDQyxPQUZUO0FBSTlCLFNBQU9BLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxhQUFuQixHQUNORCxPQUFPLENBQUNFLE9BQVIsQ0FBZ0IsQ0FBaEIsRUFBbUJDLE1BRGIsR0FFTjtBQUFDM0IsS0FBQyxFQUFFLENBQUo7QUFBTzRCLEtBQUMsRUFBRSxDQUFWO0FBQWEzQixLQUFDLEVBQUUsQ0FBaEI7QUFBbUJ4RSxLQUFDLEVBQUUsQ0FBdEI7QUFBeUJ3RixLQUFDLEVBQUUsQ0FBNUI7QUFBK0JZLEtBQUMsRUFBRTtBQUFsQyxHQUZEO0FBR0EsQ0FQRDtBQVNBOzs7Ozs7OztBQU1BLFNBQVNDLFNBQVQsQ0FBbUIxSixJQUFuQixFQUF1QztBQUFBLE1BQ2hDMkosTUFBTSxHQUFHM0osSUFBSSxDQUFDLENBQUQsQ0FBSixZQUFtQndELElBREk7QUFBQSxNQUVoQ0gsQ0FBQyxHQUFHLENBQUNzRyxNQUFNLEdBQUczSixJQUFJLENBQUNHLEdBQUwsQ0FBU3lKLE1BQVQsQ0FBSCxHQUFzQjVKLElBQTdCLEVBQ1I2SixNQURRLENBQ0QsVUFBQ3pKLENBQUQsRUFBSVMsQ0FBSixFQUFPc0IsSUFBUDtBQUFBLFdBQWdCQSxJQUFJLENBQUNtRCxPQUFMLENBQWFsRixDQUFiLE1BQW9CUyxDQUFwQztBQUFBLEdBREMsQ0FGNEI7QUFLdEMsU0FBTzhJLE1BQU0sR0FBR3RHLENBQUMsQ0FBQ2xELEdBQUYsQ0FBTSxVQUFBQyxDQUFDO0FBQUEsV0FBSSxJQUFJb0QsSUFBSixDQUFTcEQsQ0FBVCxDQUFKO0FBQUEsR0FBUCxDQUFILEdBQTZCaUQsQ0FBMUM7QUFDQTtBQUVEOzs7Ozs7OztBQU1BLFNBQVN5RyxVQUFULENBQW9CbEcsR0FBcEIsRUFBdUM7QUFDdEMsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNMLE1BQVgsR0FBb0JLLEdBQUcsQ0FBQytELE1BQUosQ0FBVyxVQUFDSyxDQUFELEVBQUlILENBQUo7QUFBQSxXQUFVRyxDQUFDLENBQUNZLE1BQUYsQ0FBU2YsQ0FBVCxDQUFWO0FBQUEsR0FBWCxDQUFwQixHQUF3RCxFQUEvRDtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVNrQyxRQUFULENBQWtCdk0sTUFBbEIsRUFBbUQ7QUFBQSxxQ0FBZGtLLE9BQWMsd0VBQWRBLE9BQWM7O0FBQ2xELE1BQUksQ0FBQ0EsT0FBTyxDQUFDbkUsTUFBVCxJQUFvQm1FLE9BQU8sQ0FBQ25FLE1BQVIsS0FBbUIsQ0FBbkIsSUFBd0IsQ0FBQ21FLE9BQU8sQ0FBQyxDQUFELENBQXhELEVBQ0MsT0FBT2xLLE1BQVA7QUFHRCxNQUFNdUssTUFBTSxHQUFHTCxPQUFPLENBQUN2SSxLQUFSLEVBQWY7QUFnQkEsU0FkSTJFLFFBQVEsQ0FBQ3RHLE1BQUQsQ0FBUixJQUFvQnNHLFFBQVEsQ0FBQ2lFLE1BQUQsQ0FjaEMsSUFiQ3RQLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZcVAsTUFBWixFQUFvQnBQLE9BQXBCLENBQTRCLFVBQUFDLEdBQUcsRUFBSTtBQUNsQyxRQUFNZ0ksS0FBSyxHQUFHbUgsTUFBTSxDQUFDblAsR0FBRCxDQUFwQjtBQUVJa0wsWUFBUSxDQUFDbEQsS0FBRCxDQUhzQixJQUlqQyxDQUFDcEQsTUFBTSxDQUFDNUUsR0FBRCxDQUFQLEtBQWlCNEUsTUFBTSxDQUFDNUUsR0FBRCxDQUFOLEdBQWMsRUFBL0IsQ0FKaUMsRUFLakM0RSxNQUFNLENBQUM1RSxHQUFELENBQU4sR0FBY21SLFFBQVEsQ0FBQ3ZNLE1BQU0sQ0FBQzVFLEdBQUQsQ0FBUCxFQUFjZ0ksS0FBZCxDQUxXLElBT2pDcEQsTUFBTSxDQUFDNUUsR0FBRCxDQUFOLEdBQWMrSyxPQUFPLENBQUMvQyxLQUFELENBQVAsR0FDYkEsS0FBSyxDQUFDZ0ksTUFBTixFQURhLEdBQ0loSSxLQVJlO0FBVWxDLEdBVkQsQ0FhRCxFQUFPbUosUUFBUSxNQUFSLFVBQVN2TSxNQUFULFNBQW9Ca0ssT0FBcEIsRUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVNzQyxTQUFULENBQW1CaEssSUFBbkIsRUFBZ0NpSyxLQUFoQyxFQUFxRDtBQUFyQkEsT0FBcUIsZ0JBQXJCQSxLQUFxQjtBQUNwRCxNQUFJMUYsRUFBSjtBQVlBLFNBVkl2RSxJQUFJLENBQUMsQ0FBRCxDQUFKLFlBQW1Cd0QsSUFVdkIsR0FUQ2UsRUFBRSxHQUFHMEYsS0FBSyxHQUFHLFVBQUNyQyxDQUFELEVBQUk0QixDQUFKO0FBQUEsV0FBVTVCLENBQUMsR0FBRzRCLENBQWQ7QUFBQSxHQUFILEdBQXFCLFVBQUM1QixDQUFELEVBQUk0QixDQUFKO0FBQUEsV0FBVUEsQ0FBQyxHQUFHNUIsQ0FBZDtBQUFBLEdBU2hDLEdBUEtxQyxLQUFLLElBQUksQ0FBQ2pLLElBQUksQ0FBQ2tLLEtBQUwsQ0FBV3pHLEtBQVgsQ0FPZixHQU5FYyxFQUFFLEdBQUcsVUFBQ3FELENBQUQsRUFBSTRCLENBQUo7QUFBQSxXQUFVNUIsQ0FBQyxHQUFHNEIsQ0FBZDtBQUFBLEdBTVAsR0FMWSxDQUFDUyxLQUtiLEtBSkUxRixFQUFFLEdBQUcsVUFBQ3FELENBQUQsRUFBSTRCLENBQUo7QUFBQSxXQUFXNUIsQ0FBQyxHQUFHNEIsQ0FBSixJQUFTLENBQUMsQ0FBWCxJQUFrQjVCLENBQUMsR0FBRzRCLENBQUosSUFBUyxDQUEzQixJQUFrQzVCLENBQUMsS0FBSzRCLENBQU4sSUFBVyxDQUF2RDtBQUFBLEdBSVAsR0FBT3hKLElBQUksQ0FBQzRJLE1BQUwsR0FBY3VCLElBQWQsQ0FBbUI1RixFQUFuQixDQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBUzZGLFNBQVQsQ0FBbUIzRCxJQUFuQixFQUF3Q3pHLElBQXhDLEVBQXdHO0FBQ3ZHLE1BQUlxSyxHQUFHLEdBQUdySyxJQUFJLENBQUM2SixNQUFMLENBQVksVUFBQXpKLENBQUM7QUFBQSxXQUFJc0QsUUFBUSxDQUFDdEQsQ0FBRCxDQUFaO0FBQUEsR0FBYixDQUFWO0FBWUEsU0FWSWlLLEdBQUcsQ0FBQzlHLE1BVVIsR0FUS1YsUUFBUSxDQUFDd0gsR0FBRyxDQUFDLENBQUQsQ0FBSixDQVNiLEdBUkVBLEdBQUcsR0FBR2hKLElBQUksQ0FBQ29GLElBQUQsQ0FBSixPQUFBcEYsSUFBSSxFQUFVZ0osR0FBVixDQVFaLEdBUFlBLEdBQUcsQ0FBQyxDQUFELENBQUgsWUFBa0I3RyxJQU85QixLQU5FNkcsR0FBRyxHQUFHTCxTQUFTLENBQUNLLEdBQUQsRUFBTTVELElBQUksS0FBSyxLQUFmLENBQVQsQ0FBK0IsQ0FBL0IsQ0FNUixJQUhDNEQsR0FBRyxHQUFHaEwsU0FHUCxFQUFPZ0wsR0FBUDtBQUNBO0FBRUQ7Ozs7Ozs7Ozs7SUFRTUMsUUFBUSxHQUFHLFVBQUNDLEtBQUQsRUFBZ0JDLEdBQWhCLEVBQTZCQyxJQUE3QixFQUFvRDtBQUF2QkEsTUFBdUIsZ0JBQXZCQSxJQUF1QixHQUFoQixDQUFnQjtBQUFBLE1BQzlESixHQUFhLEdBQUcsRUFEOEM7QUFBQSxNQUU5RGxILENBQUMsR0FBRzlCLElBQUksQ0FBQ2QsR0FBTCxDQUFTLENBQVQsRUFBWWMsSUFBSSxDQUFDNEIsSUFBTCxDQUFVLENBQUN1SCxHQUFHLEdBQUdELEtBQVAsSUFBZ0JFLElBQTFCLENBQVosSUFBK0MsQ0FGVzs7QUFJcEUsT0FBSyxJQUFJNUosQ0FBQyxHQUFHMEosS0FBYixFQUFvQjFKLENBQUMsR0FBR3NDLENBQXhCLEVBQTJCdEMsQ0FBQyxFQUE1QixFQUNDd0osR0FBRyxDQUFDSyxJQUFKLENBQVNILEtBQUssR0FBRzFKLENBQUMsR0FBRzRKLElBQXJCLENBREQ7O0FBSUEsU0FBT0osR0FBUDtBQUNBLEM7SUFHS00sWUFBWSxHQUFHO0FBQ3BCQyxPQUFLLEVBQUcsWUFBTTtBQUNiLFFBQU1DLFNBQVMsR0FBRztBQUFBLGFBQU87QUFDeEJDLGVBQU8sSUFEaUI7QUFDUkMsa0JBQVUsSUFERjtBQUNXQyxlQUFPLEVBQUUsQ0FEcEI7QUFDdUJDLGVBQU8sRUFBRSxDQURoQztBQUNtQ0MsZUFBTyxFQUFFLENBRDVDO0FBQytDQyxlQUFPLEVBQUU7QUFEeEQsT0FBUDtBQUFBLEtBQWxCOztBQUlBLFFBQUk7QUFJSCxhQUZBLElBQUlDLFVBQUosQ0FBZSxHQUFmLENBRUEsRUFBTyxVQUFDQyxFQUFELEVBQStCQyxTQUEvQixFQUFrREMsTUFBbEQsRUFBMkU7QUFBekJBLGNBQXlCLGdCQUF6QkEsTUFBeUIsR0FBaEJWLFNBQVMsRUFBTyxHQUNqRlEsRUFBRSxDQUFDRyxhQUFILENBQWlCLElBQUlKLFVBQUosQ0FBZUUsU0FBZixFQUEwQkMsTUFBMUIsQ0FBakIsQ0FEaUY7QUFFakYsT0FGRDtBQUdBLEtBUEQsQ0FPRSxPQUFPMUMsQ0FBUCxFQUFVO0FBQ1g7QUFDQSxhQUFPLFVBQUN3QyxFQUFELEVBQStCQyxTQUEvQixFQUFrREMsTUFBbEQsRUFBMkU7QUFBekJBLGNBQXlCLGdCQUF6QkEsTUFBeUIsR0FBaEJWLFNBQVMsRUFBTztBQUNqRixZQUFNWSxVQUFVLEdBQUdoSixHQUFRLENBQUNpSixXQUFULENBQXFCLFlBQXJCLENBQW5CLENBRGlGLENBR2pGOztBQUNBRCxrQkFBVSxDQUFDRSxjQUFYLENBQ0NMLFNBREQsRUFFQ0MsTUFBTSxDQUFDVCxPQUZSLEVBR0NTLE1BQU0sQ0FBQ1IsVUFIUixFQUlDM0ksR0FKRCxFQUtDLENBTEQsRUFLSTtBQUNIbUosY0FBTSxDQUFDUCxPQU5SLEVBTWlCTyxNQUFNLENBQUNOLE9BTnhCLEVBT0NNLE1BQU0sQ0FBQ0wsT0FQUixFQU9pQkssTUFBTSxDQUFDSixPQVB4QixrQkFRNkIsQ0FSN0IsRUFRZ0MsSUFSaEMsQ0FKaUYsRUFlakZFLEVBQUUsQ0FBQ0csYUFBSCxDQUFpQkMsVUFBakIsQ0FmaUY7QUFnQmpGLE9BaEJEO0FBaUJBO0FBQ0QsR0FoQ00sRUFEYTtBQWtDcEJHLE9BQUssRUFBRSxlQUFDUCxFQUFELEVBQStCQyxTQUEvQixFQUFrREMsTUFBbEQsRUFBa0U7QUFDeEUsUUFBTU0sUUFBUSxHQUFHLElBQUlDLEtBQUosQ0FBVS9CLFFBQVEsQ0FBQztBQUNuQ2dDLGdCQUFVLEVBQUV2SSxJQUFJLENBQUN3SSxHQUFMLEVBRHVCO0FBRW5DeE8sWUFBTSxFQUFFNk4sRUFGMkI7QUFHbkNZLGFBQU8sRUFBRSxHQUgwQjtBQUluQ0MsYUFBTyxFQUFFLEdBSjBCO0FBS25DQyxtQkFBYSxFQUFFLEVBTG9CO0FBTW5DQyxXQUFLLEVBQUU7QUFONEIsS0FBRCxFQU9oQ2IsTUFQZ0MsQ0FBbEIsQ0FBakI7QUFTQUYsTUFBRSxDQUFDRyxhQUFILENBQWlCLElBQUlhLFVBQUosQ0FBZWYsU0FBZixFQUEwQjtBQUMxQ1AsZ0JBQVUsSUFEZ0M7QUFFMUNELGFBQU8sSUFGbUM7QUFHMUN3QixjQUFRLElBSGtDO0FBSTFDQyxhQUFPLEVBQUUsQ0FBQ1YsUUFBRCxDQUppQztBQUsxQ1csbUJBQWEsRUFBRSxFQUwyQjtBQU0xQ0Msb0JBQWMsRUFBRSxDQUFDWixRQUFEO0FBTjBCLEtBQTFCLENBQWpCLENBVndFO0FBa0J4RTtBQXBEbUIsQyxFQURyQjs7O0FBd0RBOzs7Ozs7O0FBT0EsU0FBU2EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBaUMzTSxJQUFqQyxFQUF1RDtBQUN0RCxNQUFJcUssR0FBRyxHQUFHc0MsR0FBVjs7QUFFQSxPQUFLLElBQU1oTSxDQUFYLElBQWdCWCxJQUFoQixFQUNDcUssR0FBRyxHQUFHQSxHQUFHLENBQUNwRixPQUFKLENBQVksSUFBSTJILE1BQUosUUFBZ0JqTSxDQUFoQixRQUFzQixHQUF0QixDQUFaLEVBQXdDWCxJQUFJLENBQUNXLENBQUQsQ0FBNUMsQ0FEUDs7QUFJQSxTQUFPMEosR0FBUDtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVN3QyxTQUFULENBQW1CQyxJQUFuQixFQUE2RDtBQUM1RCxNQUFJQyxVQUFKO0FBRUEsTUFBSUQsSUFBSSxZQUFZdEosSUFBcEIsRUFDQ3VKLFVBQVUsR0FBR0QsSUFEZCxNQUVPLElBQUlsSyxRQUFRLENBQUNrSyxJQUFELENBQVosRUFBb0I7QUFBQSxRQUNuQi9OLE1BRG1CLEdBQ0QsSUFEQyxDQUNuQkEsTUFEbUI7QUFBQSxRQUNYaU8sTUFEVyxHQUNELElBREMsQ0FDWEEsTUFEVztBQUcxQkQsY0FBVSxHQUFHQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JsTyxNQUFNLENBQUNtTyxZQUF2QixFQUFxQ0osSUFBckMsQ0FIYTtBQUkxQixHQUpNLE1BSUlqSyxRQUFRLENBQUNpSyxJQUFELENBQVIsSUFBa0IsQ0FBQ3JKLEtBQUssQ0FBQ3FKLElBQUQsQ0FKNUIsS0FLTkMsVUFBVSxHQUFHLElBQUl2SixJQUFKLENBQVMsQ0FBQ3NKLElBQVYsQ0FMUDtBQWFQLFVBTEksQ0FBQ0MsVUFBRCxJQUFldEosS0FBSyxDQUFDLENBQUNzSixVQUFGLENBS3hCLEtBSkNqRSxPQUFPLElBQUlBLE9BQU8sQ0FBQ0MsS0FBbkIsSUFDQ0QsT0FBTyxDQUFDQyxLQUFSLHlCQUFvQytELElBQXBDLHNCQUdGLEVBQU9DLFVBQVA7QUFDQTtBQUVEOzs7Ozs7O0FBS0EsU0FBU0ksWUFBVCxHQUFpQztBQUNoQyxTQUFPLENBQUMxSyxHQUFRLENBQUMySyxNQUFqQjtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVNDLGdCQUFULENBQTBCekMsS0FBMUIsRUFBMENnQixLQUExQyxFQUFvRjtBQUNuRixNQUFJMEIsUUFBUSxLQUFaLENBRG1GLENBR25GOztBQUNBLE1BQUksT0FBT3JGLElBQVAsQ0FBWTdGLEdBQU0sQ0FBQ21MLFNBQVAsQ0FBaUJDLFNBQTdCLEtBQTJDNUIsS0FBL0MsRUFBc0Q7QUFDckQ7QUFEcUQsUUFFL0M2QixjQUFjLEdBQUdyTCxHQUFNLENBQUNtTCxTQUFQLElBQW9CLG9CQUFvQm5MLEdBQU0sQ0FBQ21MLFNBQS9DLElBQTREbkwsR0FBTSxDQUFDbUwsU0FBUCxDQUFpQkcsY0FBakIsR0FBa0MsQ0FGaEU7QUFBQSxRQU0vQ0MsUUFBUSxHQUFJLGlCQUFpQnZMLEdBQWpCLElBQTRCQSxHQUFNLENBQUN3TCxhQUFQLElBQXdCbkwsR0FBUSxZQUFZTCxHQUFNLENBQUN3TCxhQU41QyxFQUlyRDtBQUNBOztBQUdBTixZQUFRLEdBQUdHLGNBQWMsSUFBSUUsUUFSd0I7QUFTckQ7O0FBRUQsTUFBTUUsUUFBUSxLQUFHLENBQUFqRCxLQUFLLElBQUswQyxRQUFiLEtBQXlCLGlCQUFpQmxMLEdBQXhEO0FBRUEsU0FBUXlMLFFBQVEsSUFBSSxPQUFiLElBQTBCUCxRQUFRLElBQUksT0FBdEMsSUFBa0QsSUFBekQ7QUFDQSxDIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0ZXh0b3ZlcmxhcFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1icnVzaFwiLCBcImQzLXZvcm9ub2lcIiwgXCJkMy1wb2x5Z29uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X187IiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXHJcbiAqIEBjbGFzcyBQbHVnaW5cclxuICovXHJcbi8qKlxyXG4gKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cclxuICogQG5hbWUgdmVyc2lvblxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZW1iZXJvZiBQbHVnaW5cclxuICogQHR5cGUge3N0cmluZ31cclxuICogQGV4YW1wbGVcclxuICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcclxuXHRwdWJsaWMgJCQ7XHJcblx0cHVibGljIG9wdGlvbnM7XHJcblx0c3RhdGljIHZlcnNpb24gPSBcIjIuMC4wXCI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yXHJcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3RcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYmVmb3JlSW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkYmVmb3JlSW5pdCgpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnaW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkaW5pdCgpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYWZ0ZXJJbml0JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRhZnRlckluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3JlZHJhdycgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkcmVkcmF3KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICd3aWxsRGVzdHJveScgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkd2lsbERlc3Ryb3koKSB7XHJcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XHJcblx0XHRcdGRlbGV0ZSB0aGlzW2tleV07XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRhcmM6IFwiYmItYXJjXCIsXHJcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXHJcblx0YXJjczogXCJiYi1hcmNzXCIsXHJcblx0YXJlYTogXCJiYi1hcmVhXCIsXHJcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcclxuXHRheGlzOiBcImJiLWF4aXNcIixcclxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcclxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxyXG5cdGF4aXNZOiBcImJiLWF4aXMteVwiLFxyXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXHJcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxyXG5cdGF4aXNZTGFiZWw6IFwiYmItYXhpcy15LWxhYmVsXCIsXHJcblx0YmFyOiBcImJiLWJhclwiLFxyXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxyXG5cdGJydXNoOiBcImJiLWJydXNoXCIsXHJcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxyXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXHJcblx0Y2hhcnQ6IFwiYmItY2hhcnRcIixcclxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcclxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxyXG5cdGNoYXJ0QXJjc0JhY2tncm91bmQ6IFwiYmItY2hhcnQtYXJjcy1iYWNrZ3JvdW5kXCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcclxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlVW5pdDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXVuaXRcIixcclxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXHJcblx0Y2hhcnRCYXI6IFwiYmItY2hhcnQtYmFyXCIsXHJcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcclxuXHRjaGFydENpcmNsZXM6IFwiYmItY2hhcnQtY2lyY2xlc1wiLFxyXG5cdGNoYXJ0TGluZTogXCJiYi1jaGFydC1saW5lXCIsXHJcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxyXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcclxuXHRjaGFydFJhZGFyczogXCJiYi1jaGFydC1yYWRhcnNcIixcclxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxyXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcclxuXHRjaXJjbGU6IFwiYmItY2lyY2xlXCIsXHJcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXHJcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcclxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcclxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXHJcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcclxuXHRlbXB0eTogXCJiYi1lbXB0eVwiLFxyXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXHJcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxyXG5cdGV2ZW50UmVjdHNNdWx0aXBsZTogXCJiYi1ldmVudC1yZWN0cy1tdWx0aXBsZVwiLFxyXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXHJcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXHJcblx0Z2F1Z2VWYWx1ZTogXCJiYi1nYXVnZS12YWx1ZVwiLFxyXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxyXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXHJcblx0bGVnZW5kOiBcImJiLWxlZ2VuZFwiLFxyXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcclxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXHJcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXHJcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxyXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXHJcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXHJcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxyXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXHJcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxyXG5cdGxpbmU6IFwiYmItbGluZVwiLFxyXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXHJcblx0bWFpbjogXCJiYi1tYWluXCIsXHJcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxyXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXHJcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcclxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXHJcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxyXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXHJcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxyXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxyXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXHJcblx0c3ViY2hhcnQ6IFwiYmItc3ViY2hhcnRcIixcclxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXHJcblx0dGV4dDogXCJiYi10ZXh0XCIsXHJcblx0dGV4dHM6IFwiYmItdGV4dHNcIixcclxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxyXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxyXG5cdHRvb2x0aXBDb250YWluZXI6IFwiYmItdG9vbHRpcC1jb250YWluZXJcIixcclxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcclxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxyXG5cdHhncmlkRm9jdXM6IFwiYmIteGdyaWQtZm9jdXNcIixcclxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxyXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcclxuXHR4Z3JpZHM6IFwiYmIteGdyaWRzXCIsXHJcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcclxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXHJcblx0eWdyaWRMaW5lOiBcImJiLXlncmlkLWxpbmVcIixcclxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXHJcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxyXG5cdHpvb21CcnVzaDogXCJiYi16b29tLWJydXNoXCIsXHJcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxyXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcclxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXHJcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVXNlcidzIGdlbmVyYXRpb24gY29uZmlnIHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZyhjb25maWc6IE9wdGlvbnMpOiB2b2lkIHtcclxuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XHJcblx0bGV0IHRhcmdldDtcclxuXHRsZXQga2V5cztcclxuXHRsZXQgcmVhZDtcclxuXHJcblx0Y29uc3QgZmluZCA9ICgpID0+IHtcclxuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcclxuXHJcblx0XHRpZiAoa2V5ICYmIHRhcmdldCAmJiBpc09iamVjdFR5cGUodGFyZ2V0KSAmJiBrZXkgaW4gdGFyZ2V0KSB7XHJcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xyXG5cdFx0XHRyZXR1cm4gZmluZCgpO1xyXG5cdFx0fSBlbHNlIGlmICgha2V5KSB7XHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9O1xyXG5cclxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHR0YXJnZXQgPSBjb25maWc7XHJcblx0XHRrZXlzID0ga2V5LnNwbGl0KFwiX1wiKTtcclxuXHRcdHJlYWQgPSBmaW5kKCk7XHJcblxyXG5cdFx0aWYgKGlzRGVmaW5lZChyZWFkKSkge1xyXG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb24gY2xhc3NcclxuICogQGNsYXNzIFRleHRPdmVybGFwT3B0aW9uc1xyXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7VGV4dE92ZXJsYXBPcHRpb25zfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IHNlbGVjdG9yIHN0cmluZyBmb3IgdGFyZ2V0IHRleHQgbm9kZXNcclxuXHRcdFx0ICogQG5hbWUgc2VsZWN0b3JcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxyXG5cdFx0XHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdFx0XHQgKiBAZGVmYXVsdCBcIi5iYi10ZXh0cyB0ZXh0XCJcclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogIC8vIHNlbGVjdG9yIGZvciBkYXRhIGxhYmVsIHRleHQgbm9kZXNcclxuXHRcdFx0ICogc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIlxyXG5cdFx0XHQgKi9cclxuXHRcdFx0c2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTZXQgZXh0ZW50IG9mIGxhYmVsIG92ZXJsYXAgcHJldmVudGlvblxyXG5cdFx0XHQgKiBAbmFtZSBleHRlbnRcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxyXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdFx0XHQgKiBAZGVmYXVsdCAxXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqIFx0ZXh0ZW50OiAxXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRleHRlbnQ6IDEsXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IG1pbmltdW0gYXJlYSBuZWVkZWQgdG8gc2hvdyBhIGRhdGEgbGFiZWxcclxuXHRcdFx0ICogQG5hbWUgYXJlYVxyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXHJcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XHJcblx0XHRcdCAqIEBkZWZhdWx0IDBcclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogXHRhcmVhOiAwXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRhcmVhOiAwXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbmltcG9ydCB7dm9yb25vaSBhcyBkM1Zvcm9ub2l9IGZyb20gXCJkMy12b3Jvbm9pXCI7XHJcbmltcG9ydCB7XHJcblx0cG9seWdvbkNlbnRyb2lkIGFzIGQzUG9seWdvbkNlbnRyb2lkLFxyXG5cdHBvbHlnb25BcmVhIGFzIGQzUG9seWdvbkFyZWFcclxufSBmcm9tIFwiZDMtcG9seWdvblwiO1xyXG5pbXBvcnQge1xyXG5cdHNlbGVjdCBhcyBkM1NlbGVjdCxcclxuXHRzZWxlY3RBbGwgYXMgZDNTZWxlY3RBbGxcclxufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XHJcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIjtcclxuXHJcbi8qKlxyXG4gKiBUZXh0T3ZlcmxhcCBwbHVnaW48YnI+XHJcbiAqIFByZXZlbnRzIGxhYmVsIG92ZXJsYXAgdXNpbmcgW1Zvcm9ub2kgbGF5b3V0XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Wb3Jvbm9pX2RpYWdyYW0pLlxyXG4gKiAtICoqTk9URToqKlxyXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXHJcbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxyXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxyXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcclxuICogICAtIFtkMy1wb2x5Z29uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtcG9seWdvbilcclxuICogICAtIFtkMy12b3Jvbm9pXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdm9yb25vaSlcclxuICogQGNsYXNzIHBsdWdpbi10ZXh0b3ZlcmxhcFxyXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXHJcbiAqIEByZXF1aXJlcyBkMy1wb2x5Z29uXHJcbiAqIEByZXF1aXJlcyBkMy12b3Jvbm9pXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb25zXHJcbiAqIEBhdWdtZW50cyBQbHVnaW5cclxuICogQHJldHVybnMge1RleHRPdmVybGFwfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXHJcbiAqIDxzY3JpcHQgc3JjPVwiJFlPVVJfUEFUSC9wbHVnaW4vYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwLmpzXCI+PC9zY3JpcHQ+XHJcbiAqXHJcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XHJcbiAqICAgICBkYXRhOiB7XHJcbiAqICAgICBcdCAgY29sdW1uczogWyAuLi4gXVxyXG4gKiAgICAgfVxyXG4gKiAgICAgLi4uXHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnRleHRvdmVybGFwKHtcclxuICogICAgICAgICAgc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcclxuICogICAgICAgICAgZXh0ZW50OiA4LFxyXG4gKiAgICAgICAgICBhcmVhOiAzXHJcbiAqICAgICBdXHJcbiAqICB9KTtcclxuICogQGV4YW1wbGVcclxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcclxuICogaW1wb3J0IFRleHRPdmVybGFwIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXAuZXNtXCI7XHJcbiAqXHJcbiAqIGJiLmdlbmVyYXRlKHtcclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBUZXh0T3ZlcmxhcCh7IC4uLiB9KVxyXG4gKiAgICAgXVxyXG4gKiB9KVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE92ZXJsYXAgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHByaXZhdGUgY29uZmlnO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdCRpbml0KCk6IHZvaWQge1xyXG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHQkcmVkcmF3KCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgdGV4dCA9IGQzU2VsZWN0QWxsKHRoaXMuY29uZmlnLnNlbGVjdG9yKTtcclxuXHJcblx0XHQhdGV4dC5lbXB0eSgpICYmIHRoaXMucHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdlbmVyYXRlcyB0aGUgdm9yb25vaSBsYXlvdXQgZm9yIGRhdGEgbGFiZWxzXHJcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGEgSW5kaWNlcyB2YWx1ZXNcclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBWb3Jvbm9pIGxheW91dCBwb2ludHMgYW5kIGNvcnJlc3BvbmRpbmcgRGF0YSBwb2ludHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGdlbmVyYXRlVm9yb25vaShkYXRhKSB7XHJcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcclxuXHRcdGNvbnN0IHtzY2FsZX0gPSAkJDtcclxuXHRcdGNvbnN0IFttaW4sIG1heF0gPSBbXCJ4XCIsIFwieVwiXS5tYXAodiA9PiBzY2FsZVt2XS5kb21haW4oKSk7XHJcblxyXG5cdFx0W21pblsxXSwgbWF4WzBdXSA9IFttYXhbMF0sIG1pblsxXV07XHJcblxyXG5cdFx0cmV0dXJuIGQzVm9yb25vaSgpXHJcblx0XHRcdC5leHRlbnQoW21pbiwgbWF4XSlcclxuXHRcdFx0LnBvbHlnb25zKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2V0IHRleHQgbGFiZWwncyBwb3NpdGlvbiB0byBwcmV2ZW50ZyBvdmVybGFwLlxyXG5cdCAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IHRleHQgdGFyZ2V0IHRleHQgc2VsZWN0aW9uXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcmV2ZW50TGFiZWxPdmVybGFwKHRleHQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtleHRlbnQsIGFyZWF9ID0gdGhpcy5jb25maWc7XHJcblx0XHRjb25zdCBjZWxscyA9IHRoaXMuZ2VuZXJhdGVWb3Jvbm9pKHRleHQuZGF0YSgpLm1hcCh2ID0+IFt2LngsIHYudmFsdWVdKSk7XHJcblx0XHRsZXQgaSA9IDA7XHJcblxyXG5cdFx0dGV4dC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zdCBjZWxsID0gY2VsbHNbaSsrXTtcclxuXHJcblx0XHRcdGlmIChjZWxsICYmIHRoaXMpIHtcclxuXHRcdFx0XHRjb25zdCBbeCwgeV0gPSBjZWxsLmRhdGE7XHJcblx0XHRcdFx0Y29uc3QgW2N4LCBjeV0gPSBkM1BvbHlnb25DZW50cm9pZChjZWxsKTtcclxuXHRcdFx0XHRjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMihjeSAtIHksIGN4IC0geCkgLyBNYXRoLlBJICogMik7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHhUcmFuc2xhdGUgPSBleHRlbnQgKiAoYW5nbGUgPT09IDAgPyAxIDogLTEpO1xyXG5cdFx0XHRcdGNvbnN0IHlUcmFuc2xhdGUgPSBhbmdsZSA9PT0gLTEgPyAtZXh0ZW50IDogZXh0ZW50ICsgNTtcclxuXHJcblx0XHRcdFx0Y29uc3QgdHh0QW5jaG9yID0gTWF0aC5hYnMoYW5nbGUpID09PSAxID9cclxuXHRcdFx0XHRcdFwibWlkZGxlXCIgOiAoYW5nbGUgPT09IDAgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcclxuXHJcblx0XHRcdFx0ZDNTZWxlY3QodGhpcylcclxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcclxuXHRcdFx0XHRcdC5hdHRyKFwiZGlzcGxheVwiLCBkM1BvbHlnb25BcmVhKGNlbGwpIDwgYXJlYSA/IFwibm9uZVwiIDogbnVsbClcclxuXHRcdFx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgdHh0QW5jaG9yKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgMC4ke2FuZ2xlID09PSAxID8gNzEgOiAzNX1lbWApXHJcblx0XHRcdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7eFRyYW5zbGF0ZX0sICR7eVRyYW5zbGF0ZX0pYCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBXaW5kb3cgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cclxuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xyXG5cclxuY29uc3Qgd2luID0gKCgpID0+IHtcclxuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XHJcblxyXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcclxufSkoKTtcclxuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cclxuXHJcbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcclxuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcclxuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xyXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdGFzSGFsZlBpeGVsLFxyXG5cdGJydXNoRW1wdHksXHJcblx0Y2FsbEZuLFxyXG5cdGNhcGl0YWxpemUsXHJcblx0Y2VpbDEwLFxyXG5cdGNvbnZlcnRJbnB1dFR5cGUsXHJcblx0ZGVlcENsb25lLFxyXG5cdGRpZmZEb21haW4sXHJcblx0ZW5kYWxsLFxyXG5cdGVtdWxhdGVFdmVudCxcclxuXHRleHRlbmQsXHJcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXHJcblx0Z2V0Qm91bmRpbmdSZWN0LFxyXG5cdGdldENzc1J1bGVzLFxyXG5cdGdldE1pbk1heCxcclxuXHRnZXRPcHRpb24sXHJcblx0Z2V0UGF0aEJveCxcclxuXHRnZXRSYW5kb20sXHJcblx0Z2V0UmFuZ2UsXHJcblx0Z2V0UmVjdFNlZ0xpc3QsXHJcblx0Z2V0VHJhbnNsYXRpb24sXHJcblx0Z2V0VW5pcXVlLFxyXG5cdGhhc1ZhbHVlLFxyXG5cdGlzQXJyYXksXHJcblx0aXNib29sZWFuLFxyXG5cdGlzRGVmaW5lZCxcclxuXHRpc0VtcHR5LFxyXG5cdGlzRnVuY3Rpb24sXHJcblx0aXNOdW1iZXIsXHJcblx0aXNPYmplY3QsXHJcblx0aXNPYmplY3RUeXBlLFxyXG5cdGlzU3RyaW5nLFxyXG5cdGlzVGFiVmlzaWJsZSxcclxuXHRpc1VuZGVmaW5lZCxcclxuXHRpc1ZhbHVlLFxyXG5cdG1lcmdlQXJyYXksXHJcblx0bWVyZ2VPYmosXHJcblx0bm90RW1wdHksXHJcblx0cGFyc2VEYXRlLFxyXG5cdHNhbml0aXNlLFxyXG5cdHNldFRleHRWYWx1ZSxcclxuXHRzb3J0VmFsdWUsXHJcblx0dG9BcnJheSxcclxuXHR0cGxQcm9jZXNzXHJcbn07XHJcblxyXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xyXG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcclxuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcclxuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcclxuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcclxuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XHJcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcclxuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xyXG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xyXG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xyXG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcclxuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcclxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XHJcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxyXG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxyXG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcclxuKTtcclxuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpcyBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XHJcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxyXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XHJcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcblx0bGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XHJcblxyXG5cdHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXHJcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcclxuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XHJcblxyXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcclxuXHRyZXR1cm4gaXNGbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcclxuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cclxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHRsZXQgbiA9IDA7XHJcblxyXG5cdHRyYW5zaXRpb25cclxuXHRcdC5lYWNoKCgpID0+ICsrbilcclxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XHJcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XHJcblx0XHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xyXG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cclxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcclxuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXHJcblx0bm9kZTogZDNTZWxlY3Rpb24sXHJcblx0dGV4dDogc3RyaW5nLFxyXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXHJcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xyXG5cdFx0bm9kZS50ZXh0KHRleHQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcclxuXHJcblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xyXG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xyXG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcclxuXHJcblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcclxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcclxuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXHJcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcclxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxyXG5cdFx0XHRcdFx0LnRleHQodik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcclxuXHQvKlxyXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcclxuXHQgKiAqL1xyXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xyXG5cclxuXHRyZXR1cm4gW1xyXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXHJcblx0XHR7eCwgeX0sIC8vIHNlZzFcclxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXHJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXHJcblx0XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGF0aEJveChcclxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcclxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xyXG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcclxuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcclxuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcclxuICogQHBhcmFtIHtvYmplY3R9IHt9IFNlbGVjdGlvbiBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHt9LiRlbCBTZWxlY3Rpb24gb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XHJcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xyXG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcclxuXHRsZXQgc2VsZWN0aW9uO1xyXG5cclxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XHJcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xyXG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xyXG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cclxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XHJcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc2VsZWN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cclxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGdldEJvdW5kaW5nUmVjdCA9IChub2RlKToge1xyXG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxyXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxyXG59ID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XHJcblxyXG4vKipcclxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xyXG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG5cclxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYnJ1c2ggaXMgZW1wdHlcclxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcclxuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xyXG5cclxuXHRpZiAoc2VsZWN0aW9uKSB7XHJcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXHJcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXHJcblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXHJcblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZXAgY29weSBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBDbG9uZWQgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWVwQ2xvbmUoLi4ub2JqZWN0Tikge1xyXG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XHJcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xyXG5cdFx0XHRjb25zdCByID0gbmV3IHYuY29uc3RydWN0b3IoKTtcclxuXHJcblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XHJcblx0XHRcdFx0cltrXSA9IGNsb25lKHZba10pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdjtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gb2JqZWN0Ti5tYXAodiA9PiBjbG9uZSh2KSlcclxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcclxuXHRcdFx0ey4uLmEsIC4uLmN9XHJcblx0XHQpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdHxBcnJheX0gc291cmNlIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcclxuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XHJcblx0XHRzb3VyY2UuZm9yRWFjaCh2ID0+IGV4dGVuZCh0YXJnZXQsIHYpKTtcclxuXHR9XHJcblxyXG5cdC8vIGV4Y2x1ZGUgbmFtZSB3aXRoIG9ubHkgbnVtYmVyc1xyXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcclxuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGNhcGl0YWxpemUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdG8gYXJyYXlcclxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcclxuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcclxuXHRsZXQgcnVsZXMgPSBbXTtcclxuXHJcblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHJ1bGVzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0dFbGVtZW50XHJcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcclxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xyXG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XHJcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcclxuXHJcblx0cmV0dXJuIGJhc2VWYWwgJiYgYmFzZVZhbC5udW1iZXJPZkl0ZW1zID9cclxuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxyXG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB1bmlxdWUgdmFsdWUgZnJvbSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XHJcblx0Y29uc3QgaXNEYXRlID0gZGF0YVswXSBpbnN0YW5jZW9mIERhdGU7XHJcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcclxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XHJcblxyXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgU291cmNlIGFycmF5XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcclxuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VPYmoodGFyZ2V0OiBvYmplY3QsIC4uLm9iamVjdE4pOiBhbnkge1xyXG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xyXG5cdFx0cmV0dXJuIHRhcmdldDtcclxuXHR9XHJcblxyXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcclxuXHJcblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xyXG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XHJcblxyXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XHJcblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xyXG59XHJcblxyXG4vKipcclxuICogU29ydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjIHRydWU6IGFzYywgZmFsc2U6IGRlc2NcclxuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xyXG5cdGxldCBmbjtcclxuXHJcblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XHJcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xyXG5cdFx0fSBlbHNlIGlmICghaXNBc2MpIHtcclxuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBtaW4vbWF4IHZhbHVlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfERhdGV8dW5kZWZpbmVkfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TWluTWF4KHR5cGU6IFwibWluXCIgfCBcIm1heFwiLCBkYXRhOiBudW1iZXJbXSB8IERhdGVbXSB8IGFueSk6IG51bWJlciB8IERhdGUgfCB1bmRlZmluZWQgfCBhbnkge1xyXG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcclxuXHJcblx0aWYgKHJlcy5sZW5ndGgpIHtcclxuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XHJcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcclxuXHRcdH0gZWxzZSBpZiAocmVzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzID0gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCByYW5nZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRSYW5nZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc3RlcCA9IDEpOiBudW1iZXJbXSA9PiB7XHJcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xyXG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XHJcblxyXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xyXG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuLy8gZW11bGF0ZSBldmVudFxyXG5jb25zdCBlbXVsYXRlRXZlbnQgPSB7XHJcblx0bW91c2U6ICgoKSA9PiB7XHJcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xyXG5cdFx0XHRidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIHNjcmVlblg6IDAsIHNjcmVlblk6IDAsIGNsaWVudFg6IDAsIGNsaWVudFk6IDBcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcclxuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcclxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XHJcblx0XHRcdH07XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcclxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcclxuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xyXG5cclxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxyXG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXHJcblx0XHRcdFx0XHRldmVudFR5cGUsXHJcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcclxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxyXG5cdFx0XHRcdFx0d2luZG93LFxyXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcclxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcclxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcclxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXHJcblx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9KSgpLFxyXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XHJcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXHJcblx0XHRcdHRhcmdldDogZWwsXHJcblx0XHRcdHJhZGl1c1g6IDIuNSxcclxuXHRcdFx0cmFkaXVzWTogMi41LFxyXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcclxuXHRcdFx0Zm9yY2U6IDAuNVxyXG5cdFx0fSwgcGFyYW1zKSk7XHJcblxyXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXHJcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXHJcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxyXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxyXG5cdFx0fSkpO1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XHJcblx0bGV0IHJlcyA9IHRwbDtcclxuXHJcblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcclxuXHRcdHJlcyA9IHJlcy5yZXBsYWNlKG5ldyBSZWdFeHAoYHs9JHt4fX1gLCBcImdcIiksIGRhdGFbeF0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxyXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXHJcbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIFZhbHVlIG9mIGRhdGUgdG8gYmUgcGFyc2VkXHJcbiAqIEByZXR1cm5zIHtEYXRlfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcclxuXHRsZXQgcGFyc2VkRGF0ZTtcclxuXHJcblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcclxuXHR9IGVsc2UgaWYgKGlzU3RyaW5nKGRhdGUpKSB7XHJcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcclxuXHJcblx0XHRwYXJzZWREYXRlID0gZm9ybWF0LmRhdGFUaW1lKGNvbmZpZy5kYXRhX3hGb3JtYXQpKGRhdGUpO1xyXG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XHJcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xyXG5cdH1cclxuXHJcblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xyXG5cdFx0Y29uc29sZSAmJiBjb25zb2xlLmVycm9yICYmXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcnNlZERhdGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNUYWJWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcclxuICogQHBhcmFtIHtib29sZWFufSBtb3VzZSBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS5tb3VzZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XHJcblx0bGV0IGlzTW9iaWxlID0gZmFsc2U7XHJcblxyXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXHJcblx0aWYgKC9Nb2JpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSAmJiB0b3VjaCkge1xyXG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xyXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xyXG5cclxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXHJcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxyXG5cdFx0Y29uc3QgaGFzVG91Y2ggPSAoXCJvbnRvdWNobW92ZVwiIGluIHdpbmRvdyB8fCAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpO1xyXG5cclxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XHJcblx0fVxyXG5cclxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9