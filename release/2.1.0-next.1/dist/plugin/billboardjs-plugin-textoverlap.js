/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.1.0-next.1
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.1.0-next.1");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwic2VsZWN0b3IiLCJleHRlbnQiLCJUZXh0T3ZlcmxhcCIsImNhbGwiLCJkM1NlbGVjdEFsbCIsInByZXZlbnRMYWJlbE92ZXJsYXAiLCJnZW5lcmF0ZVZvcm9ub2kiLCJkYXRhIiwiJCQiLCJzY2FsZSIsIm1hcCIsInYiLCJkb21haW4iLCJtaW4iLCJtYXgiLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwieCIsInZhbHVlIiwiaSIsImVhY2giLCJjZWxsIiwieSIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwiTWF0aCIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInhUcmFuc2xhdGUiLCJ5VHJhbnNsYXRlIiwidHh0QW5jaG9yIiwiYWJzIiwiZDNTZWxlY3QiLCJhdHRyIiwiZDNQb2x5Z29uQXJlYSIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJmb3VuZCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJlbmRhbGwiLCJ0cmFuc2l0aW9uIiwiY2IiLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImh0bWwiLCJhcHBlbmQiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJnZXRSYW5nZSIsInN0YXJ0IiwiZW5kIiwic3RlcCIsInB1c2giLCJlbXVsYXRlRXZlbnQiLCJtb3VzZSIsImdldFBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsIk1vdXNlRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsInBhcmFtcyIsImRpc3BhdGNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwicGFyc2VEYXRlIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImhpZGRlbiIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImhhc1RvdWNoUG9pbnRzIiwibWF4VG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsIkRvY3VtZW50VG91Y2giLCJoYXNNb3VzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFtRDtBQUNsRixDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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LFVBTEksQ0FBQ0MsVUFBRCxJQUFldEosS0FBSyxDQUFDLENBQUNzSixVQUFGLENBS3hCLEtBSkNqRSxPQUFPLElBQUlBLE9BQU8sQ0FBQ0MsS0FBbkIsSUFDQ0QsT0FBTyxDQUFDQyxLQUFSLHlCQUFvQytELElBQXBDLHNCQUdGLEVBQU9DLFVBQVA7QUFDQTtBQUVEOzs7Ozs7O0FBS0EsU0FBU0ksWUFBVCxHQUFpQztBQUNoQyxTQUFPLENBQUMxSyxHQUFRLENBQUMySyxNQUFqQjtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFNBQVNDLGdCQUFULENBQTBCekMsS0FBMUIsRUFBMENnQixLQUExQyxFQUFvRjtBQUNuRixNQUFJMEIsUUFBUSxLQUFaLENBRG1GLENBR25GOztBQUNBLE1BQUksT0FBT3JGLElBQVAsQ0FBWTdGLEdBQU0sQ0FBQ21MLFNBQVAsQ0FBaUJDLFNBQTdCLEtBQTJDNUIsS0FBL0MsRUFBc0Q7QUFDckQ7QUFEcUQsUUFFL0M2QixjQUFjLEdBQUdyTCxHQUFNLENBQUNtTCxTQUFQLElBQW9CLG9CQUFvQm5MLEdBQU0sQ0FBQ21MLFNBQS9DLElBQTREbkwsR0FBTSxDQUFDbUwsU0FBUCxDQUFpQkcsY0FBakIsR0FBa0MsQ0FGaEU7QUFBQSxRQU0vQ0MsUUFBUSxHQUFJLGlCQUFpQnZMLEdBQWpCLElBQTRCQSxHQUFNLENBQUN3TCxhQUFQLElBQXdCbkwsR0FBUSxZQUFZTCxHQUFNLENBQUN3TCxhQU41QyxFQUlyRDtBQUNBOztBQUdBTixZQUFRLEdBQUdHLGNBQWMsSUFBSUUsUUFSd0I7QUFTckQ7O0FBRUQsTUFBTUUsUUFBUSxLQUFHLENBQUFqRCxLQUFLLElBQUswQyxRQUFiLEtBQXlCLGlCQUFpQmxMLEdBQXhEO0FBRUEsU0FBUXlMLFFBQVEsSUFBSSxPQUFiLElBQTBCUCxRQUFRLElBQUksT0FBdEMsSUFBa0QsSUFBekQ7QUFDQSxDIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0ZXh0b3ZlcmxhcFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1icnVzaFwiLCBcImQzLXZvcm9ub2lcIiwgXCJkMy1wb2x5Z29uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuLyoqXG4gKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cbiAqIEBuYW1lIHZlcnNpb25cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQbHVnaW5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHRwdWJsaWMgJCQ7XG5cdHB1YmxpYyBvcHRpb25zO1xuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4xLjAtbmV4dC4xXCI7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYmVmb3JlSW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYmVmb3JlSW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnaW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkaW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYWZ0ZXJJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRhZnRlckluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3JlZHJhdycgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkcmVkcmF3KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICd3aWxsRGVzdHJveScgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkd2lsbERlc3Ryb3koKSB7XG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0dGhpc1trZXldID0gbnVsbDtcblx0XHRcdGRlbGV0ZSB0aGlzW2tleV07XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0YXJjOiBcImJiLWFyY1wiLFxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcblx0YXJjczogXCJiYi1hcmNzXCIsXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxuXHRheGlzOiBcImJiLWF4aXNcIixcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXG5cdGF4aXNZOiBcImJiLWF4aXMteVwiLFxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXG5cdGF4aXNZTGFiZWw6IFwiYmItYXhpcy15LWxhYmVsXCIsXG5cdGJhcjogXCJiYi1iYXJcIixcblx0YmFyczogXCJiYi1iYXJzXCIsXG5cdGJydXNoOiBcImJiLWJydXNoXCIsXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcblx0Y2hhcnQ6IFwiYmItY2hhcnRcIixcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXG5cdGNoYXJ0QXJjc0JhY2tncm91bmQ6IFwiYmItY2hhcnQtYXJjcy1iYWNrZ3JvdW5kXCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVW5pdDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXVuaXRcIixcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcblx0Y2hhcnRCYXI6IFwiYmItY2hhcnQtYmFyXCIsXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXG5cdGNoYXJ0Q2lyY2xlczogXCJiYi1jaGFydC1jaXJjbGVzXCIsXG5cdGNoYXJ0TGluZTogXCJiYi1jaGFydC1saW5lXCIsXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxuXHRjaGFydFJhZGFyczogXCJiYi1jaGFydC1yYWRhcnNcIixcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxuXHRjaXJjbGU6IFwiYmItY2lyY2xlXCIsXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxuXHRlbXB0eTogXCJiYi1lbXB0eVwiLFxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXG5cdGV2ZW50UmVjdHNNdWx0aXBsZTogXCJiYi1ldmVudC1yZWN0cy1tdWx0aXBsZVwiLFxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcblx0Z2F1Z2VWYWx1ZTogXCJiYi1nYXVnZS12YWx1ZVwiLFxuXHRncmlkOiBcImJiLWdyaWRcIixcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcblx0bGVnZW5kOiBcImJiLWxlZ2VuZFwiLFxuXHRsZWdlbmRCYWNrZ3JvdW5kOiBcImJiLWxlZ2VuZC1iYWNrZ3JvdW5kXCIsXG5cdGxlZ2VuZEl0ZW06IFwiYmItbGVnZW5kLWl0ZW1cIixcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXG5cdGxlZ2VuZEl0ZW1Gb2N1c2VkOiBcImJiLWxlZ2VuZC1pdGVtLWZvY3VzZWRcIixcblx0bGVnZW5kSXRlbUhpZGRlbjogXCJiYi1sZWdlbmQtaXRlbS1oaWRkZW5cIixcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXG5cdGxlZ2VuZEl0ZW1UaWxlOiBcImJiLWxlZ2VuZC1pdGVtLXRpbGVcIixcblx0bGV2ZWw6IFwiYmItbGV2ZWxcIixcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxuXHRsaW5lOiBcImJiLWxpbmVcIixcblx0bGluZXM6IFwiYmItbGluZXNcIixcblx0bWFpbjogXCJiYi1tYWluXCIsXG5cdHJlZ2lvbjogXCJiYi1yZWdpb25cIixcblx0cmVnaW9uczogXCJiYi1yZWdpb25zXCIsXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxuXHRzZWxlY3RlZENpcmNsZXM6IFwiYmItc2VsZWN0ZWQtY2lyY2xlc1wiLFxuXHRzaGFwZTogXCJiYi1zaGFwZVwiLFxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIixcblx0c3ViY2hhcnQ6IFwiYmItc3ViY2hhcnRcIixcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxuXHR0ZXh0OiBcImJiLXRleHRcIixcblx0dGV4dHM6IFwiYmItdGV4dHNcIixcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXG5cdHRvb2x0aXBDb250YWluZXI6IFwiYmItdG9vbHRpcC1jb250YWluZXJcIixcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXG5cdHhncmlkRm9jdXM6IFwiYmIteGdyaWQtZm9jdXNcIixcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxuXHR4Z3JpZHM6IFwiYmIteGdyaWRzXCIsXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcblx0eWdyaWRMaW5lOiBcImJiLXlncmlkLWxpbmVcIixcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXG5cdHpvb21CcnVzaDogXCJiYi16b29tLWJydXNoXCIsXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xuXG4vKipcbiAqIExvYWQgY29uZmlndXJhdGlvbiBvcHRpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVXNlcidzIGdlbmVyYXRpb24gY29uZmlnIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZyhjb25maWc6IE9wdGlvbnMpOiB2b2lkIHtcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xuXHRsZXQgdGFyZ2V0O1xuXHRsZXQga2V5cztcblx0bGV0IHJlYWQ7XG5cblx0Y29uc3QgZmluZCA9ICgpID0+IHtcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XG5cblx0XHRpZiAoa2V5ICYmIHRhcmdldCAmJiBpc09iamVjdFR5cGUodGFyZ2V0KSAmJiBrZXkgaW4gdGFyZ2V0KSB7XG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcblx0XHRcdHJldHVybiBmaW5kKCk7XG5cdFx0fSBlbHNlIGlmICgha2V5KSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH07XG5cblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdHRhcmdldCA9IGNvbmZpZztcblx0XHRrZXlzID0ga2V5LnNwbGl0KFwiX1wiKTtcblx0XHRyZWFkID0gZmluZCgpO1xuXG5cdFx0aWYgKGlzRGVmaW5lZChyZWFkKSkge1xuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcblx0XHR9XG5cdH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgVGV4dE92ZXJsYXBPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHNlbGVjdG9yIHN0cmluZyBmb3IgdGFyZ2V0IHRleHQgbm9kZXNcblx0XHRcdCAqIEBuYW1lIHNlbGVjdG9yXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdFx0ICogQGRlZmF1bHQgXCIuYmItdGV4dHMgdGV4dFwiXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIC8vIHNlbGVjdG9yIGZvciBkYXRhIGxhYmVsIHRleHQgbm9kZXNcblx0XHRcdCAqIHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCJcblx0XHRcdCAqL1xuXHRcdFx0c2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgZXh0ZW50IG9mIGxhYmVsIG92ZXJsYXAgcHJldmVudGlvblxuXHRcdFx0ICogQG5hbWUgZXh0ZW50XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdFx0ICogQGRlZmF1bHQgMVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXh0ZW50OiAxXG5cdFx0XHQgKi9cblx0XHRcdGV4dGVudDogMSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgbWluaW11bSBhcmVhIG5lZWRlZCB0byBzaG93IGEgZGF0YSBsYWJlbFxuXHRcdFx0ICogQG5hbWUgYXJlYVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxuXHRcdFx0ICogQHR5cGUge251bWJlcn1cblx0XHRcdCAqIEBkZWZhdWx0IDBcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBcdGFyZWE6IDBcblx0XHRcdCAqL1xuXHRcdFx0YXJlYTogMFxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7dm9yb25vaSBhcyBkM1Zvcm9ub2l9IGZyb20gXCJkMy12b3Jvbm9pXCI7XG5pbXBvcnQge1xuXHRwb2x5Z29uQ2VudHJvaWQgYXMgZDNQb2x5Z29uQ2VudHJvaWQsXG5cdHBvbHlnb25BcmVhIGFzIGQzUG9seWdvbkFyZWFcbn0gZnJvbSBcImQzLXBvbHlnb25cIjtcbmltcG9ydCB7XG5cdHNlbGVjdCBhcyBkM1NlbGVjdCxcblx0c2VsZWN0QWxsIGFzIGQzU2VsZWN0QWxsXG59IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuXG4vKipcbiAqIFRleHRPdmVybGFwIHBsdWdpbjxicj5cbiAqIFByZXZlbnRzIGxhYmVsIG92ZXJsYXAgdXNpbmcgW1Zvcm9ub2kgbGF5b3V0XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Wb3Jvbm9pX2RpYWdyYW0pLlxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1wb2x5Z29uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtcG9seWdvbilcbiAqICAgLSBbZDMtdm9yb25vaV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXZvcm9ub2kpXG4gKiBAY2xhc3MgcGx1Z2luLXRleHRvdmVybGFwXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXG4gKiBAcmVxdWlyZXMgZDMtcG9seWdvblxuICogQHJlcXVpcmVzIGQzLXZvcm9ub2lcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7VGV4dE92ZXJsYXB9XG4gKiBAZXhhbXBsZVxuICogLy8gUGx1Z2luIG11c3QgYmUgbG9hZGVkIGJlZm9yZSB0aGUgdXNlLlxuICogPHNjcmlwdCBzcmM9XCIkWU9VUl9QQVRIL3BsdWdpbi9iaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXAuanNcIj48L3NjcmlwdD5cbiAqXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICBcdCAgY29sdW1uczogWyAuLi4gXVxuICogICAgIH1cbiAqICAgICAuLi5cbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IGJiLnBsdWdpbi50ZXh0b3ZlcmxhcCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxuICogICAgICAgICAgZXh0ZW50OiA4LFxuICogICAgICAgICAgYXJlYTogM1xuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFRleHRPdmVybGFwIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXAuZXNtXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgVGV4dE92ZXJsYXAoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0T3ZlcmxhcCBleHRlbmRzIFBsdWdpbiB7XG5cdHByaXZhdGUgY29uZmlnO1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRpbml0KCk6IHZvaWQge1xuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xuXHR9XG5cblx0JHJlZHJhdygpOiB2b2lkIHtcblx0XHRjb25zdCB0ZXh0ID0gZDNTZWxlY3RBbGwodGhpcy5jb25maWcuc2VsZWN0b3IpO1xuXG5cdFx0IXRleHQuZW1wdHkoKSAmJiB0aGlzLnByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGVzIHRoZSB2b3Jvbm9pIGxheW91dCBmb3IgZGF0YSBsYWJlbHNcblx0ICogQHBhcmFtIHtvYmplY3R9IGRhdGEgSW5kaWNlcyB2YWx1ZXNcblx0ICogQHJldHVybnMge29iamVjdH0gVm9yb25vaSBsYXlvdXQgcG9pbnRzIGFuZCBjb3JyZXNwb25kaW5nIERhdGEgcG9pbnRzXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRnZW5lcmF0ZVZvcm9ub2koZGF0YSkge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXHRcdGNvbnN0IHtzY2FsZX0gPSAkJDtcblx0XHRjb25zdCBbbWluLCBtYXhdID0gW1wieFwiLCBcInlcIl0ubWFwKHYgPT4gc2NhbGVbdl0uZG9tYWluKCkpO1xuXG5cdFx0W21pblsxXSwgbWF4WzBdXSA9IFttYXhbMF0sIG1pblsxXV07XG5cblx0XHRyZXR1cm4gZDNWb3Jvbm9pKClcblx0XHRcdC5leHRlbnQoW21pbiwgbWF4XSlcblx0XHRcdC5wb2x5Z29ucyhkYXRhKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGV4dCBsYWJlbCdzIHBvc2l0aW9uIHRvIHByZXZlbnRnIG92ZXJsYXAuXG5cdCAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IHRleHQgdGFyZ2V0IHRleHQgc2VsZWN0aW9uXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcmV2ZW50TGFiZWxPdmVybGFwKHRleHQpOiB2b2lkIHtcblx0XHRjb25zdCB7ZXh0ZW50LCBhcmVhfSA9IHRoaXMuY29uZmlnO1xuXHRcdGNvbnN0IGNlbGxzID0gdGhpcy5nZW5lcmF0ZVZvcm9ub2kodGV4dC5kYXRhKCkubWFwKHYgPT4gW3YueCwgdi52YWx1ZV0pKTtcblx0XHRsZXQgaSA9IDA7XG5cblx0XHR0ZXh0LmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zdCBjZWxsID0gY2VsbHNbaSsrXTtcblxuXHRcdFx0aWYgKGNlbGwgJiYgdGhpcykge1xuXHRcdFx0XHRjb25zdCBbeCwgeV0gPSBjZWxsLmRhdGE7XG5cdFx0XHRcdGNvbnN0IFtjeCwgY3ldID0gZDNQb2x5Z29uQ2VudHJvaWQoY2VsbCk7XG5cdFx0XHRcdGNvbnN0IGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmF0YW4yKGN5IC0geSwgY3ggLSB4KSAvIE1hdGguUEkgKiAyKTtcblxuXHRcdFx0XHRjb25zdCB4VHJhbnNsYXRlID0gZXh0ZW50ICogKGFuZ2xlID09PSAwID8gMSA6IC0xKTtcblx0XHRcdFx0Y29uc3QgeVRyYW5zbGF0ZSA9IGFuZ2xlID09PSAtMSA/IC1leHRlbnQgOiBleHRlbnQgKyA1O1xuXG5cdFx0XHRcdGNvbnN0IHR4dEFuY2hvciA9IE1hdGguYWJzKGFuZ2xlKSA9PT0gMSA/XG5cdFx0XHRcdFx0XCJtaWRkbGVcIiA6IChhbmdsZSA9PT0gMCA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xuXG5cdFx0XHRcdGQzU2VsZWN0KHRoaXMpXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdC5hdHRyKFwiZGlzcGxheVwiLCBkM1BvbHlnb25BcmVhKGNlbGwpIDwgYXJlYSA/IFwibm9uZVwiIDogbnVsbClcblx0XHRcdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIHR4dEFuY2hvcilcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAwLiR7YW5nbGUgPT09IDEgPyA3MSA6IDM1fWVtYClcblx0XHRcdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7eFRyYW5zbGF0ZX0sICR7eVRyYW5zbGF0ZX0pYCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XG5cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59KSgpO1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cblxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XG5cbmV4cG9ydCB7XG5cdGFzSGFsZlBpeGVsLFxuXHRicnVzaEVtcHR5LFxuXHRjYWxsRm4sXG5cdGNhcGl0YWxpemUsXG5cdGNlaWwxMCxcblx0Y29udmVydElucHV0VHlwZSxcblx0ZGVlcENsb25lLFxuXHRkaWZmRG9tYWluLFxuXHRlbmRhbGwsXG5cdGVtdWxhdGVFdmVudCxcblx0ZXh0ZW5kLFxuXHRnZXRCcnVzaFNlbGVjdGlvbixcblx0Z2V0Qm91bmRpbmdSZWN0LFxuXHRnZXRDc3NSdWxlcyxcblx0Z2V0TWluTWF4LFxuXHRnZXRPcHRpb24sXG5cdGdldFBhdGhCb3gsXG5cdGdldFJhbmRvbSxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlY3RTZWdMaXN0LFxuXHRnZXRUcmFuc2xhdGlvbixcblx0Z2V0VW5pcXVlLFxuXHRoYXNWYWx1ZSxcblx0aXNBcnJheSxcblx0aXNib29sZWFuLFxuXHRpc0RlZmluZWQsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzTnVtYmVyLFxuXHRpc09iamVjdCxcblx0aXNPYmplY3RUeXBlLFxuXHRpc1N0cmluZyxcblx0aXNUYWJWaXNpYmxlLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNWYWx1ZSxcblx0bWVyZ2VBcnJheSxcblx0bWVyZ2VPYmosXG5cdG5vdEVtcHR5LFxuXHRwYXJzZURhdGUsXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcblxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XG5jb25zdCBpc1VuZGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XG5jb25zdCBjZWlsMTAgPSAodjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXG4pO1xuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0FycmF5ID0gKGFycjogYW55KTogYm9vbGVhbiA9PiBBcnJheS5pc0FycmF5KGFycik7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcblxuLyoqXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxuICogSWYgZGVmYXVsdCB2YWx1ZSBpcyBnaXZlbiwgd2lsbCByZXR1cm4gaWYgZ2l2ZW4ga2V5IHZhbHVlIG5vdCBmb3VuZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWVcbiAqIEByZXR1cm5zIHsqfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBleGlzdCBpbiB0aGUgZ2l2ZW4gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNWYWx1ZShkaWN0OiBvYmplY3QsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbGxGbihmbiwgLi4uYXJncyk6IGJvb2xlYW4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXG4gKiBAcGFyYW0ge2QzLnRyYW5zaXRpb259IHRyYW5zaXRpb24gVHJhbnNpdGlvblxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcblx0bGV0IG4gPSAwO1xuXG5cdHRyYW5zaXRpb25cblx0XHQuZWFjaCgoKSA9PiArK24pXG5cdFx0Lm9uKFwiZW5kXCIsIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcoc3RyKSA/XG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldFRleHRWYWx1ZShcblx0bm9kZTogZDNTZWxlY3Rpb24sXG5cdHRleHQ6IHN0cmluZyxcblx0ZHk6IG51bWJlcltdID0gWy0xLCAxXSxcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xuXHRcdG5vZGUudGV4dCh0ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcblxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XG5cblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcblxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxuXHRcdFx0XHRcdC50ZXh0KHYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XG5cdC8qXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXG5cdCAqICovXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xuXG5cdHJldHVybiBbXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXG5cdFx0e3gsIHl9LCAvLyBzZWcxXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXG5cdF07XG59XG5cbi8qKlxuICogR2V0IHN2ZyBib3VuZGluZyBwYXRoIGJveCBkaW1lbnNpb25cbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhCb3goXG5cdHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudFxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xuXG5cdHJldHVybiB7XG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fSBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0ge30uJGVsIFNlbGVjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9ICRlbC5zdWJjaGFydC5tYWluIHx8ICRlbC5tYWluO1xuXHRsZXQgc2VsZWN0aW9uO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmdDbGllbnRSZWN0LlxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0Qm91bmRpbmdSZWN0ID0gKG5vZGUpOiB7XG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcbn0gPT4gbm9kZS5yZWN0IHx8IChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblxuLyoqXG4gKiBSZXRydW4gcmFuZG9tIG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcblx0Y29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG5cblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIERlZXAgY29weSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IENsb25lZCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZXBDbG9uZSguLi5vYmplY3ROKSB7XG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IHIgPSBuZXcgdi5jb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xuXHRcdFx0XHRyW2tdID0gY2xvbmUodltrXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByO1xuXHRcdH1cblxuXHRcdHJldHVybiB2O1xuXHR9O1xuXG5cdHJldHVybiBvYmplY3ROLm1hcCh2ID0+IGNsb25lKHYpKVxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcblx0XHRcdHsuLi5hLCAuLi5jfVxuXHRcdCkpO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fEFycmF5fSBzb3VyY2UgU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xuXHR9XG5cblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=