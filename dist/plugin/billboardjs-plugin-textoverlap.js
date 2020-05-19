/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.0-alpha
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0-alpha");



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
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
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

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, diffDomain, endall, emulateEvent, extend, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

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
 * @param {object} $el Selection object
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
 * Extend target from source object
 * @param {object} target Target object
 * @param {object} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || (target[p] = source[p]);

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
  for (var _len3 = arguments.length, objectN = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) objectN[_key3 - 1] = arguments[_key3];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwicmVhZCIsInRoaXNDb25maWciLCJmaW5kIiwic2hpZnQiLCJpc09iamVjdFR5cGUiLCJ1bmRlZmluZWQiLCJzcGxpdCIsImlzRGVmaW5lZCIsIk9wdGlvbnMiLCJzZWxlY3RvciIsImV4dGVudCIsIlRleHRPdmVybGFwIiwiY2FsbCIsImQzU2VsZWN0QWxsIiwicHJldmVudExhYmVsT3ZlcmxhcCIsImdlbmVyYXRlVm9yb25vaSIsImRhdGEiLCIkJCIsInNjYWxlIiwibWFwIiwidiIsImRvbWFpbiIsIm1pbiIsIm1heCIsImQzVm9yb25vaSIsInBvbHlnb25zIiwiY2VsbHMiLCJ4IiwidmFsdWUiLCJpIiwiZWFjaCIsImNlbGwiLCJ5IiwiZDNQb2x5Z29uQ2VudHJvaWQiLCJjeCIsImN5IiwiYW5nbGUiLCJNYXRoIiwicm91bmQiLCJhdGFuMiIsIlBJIiwieFRyYW5zbGF0ZSIsInlUcmFuc2xhdGUiLCJ0eHRBbmNob3IiLCJhYnMiLCJkM1NlbGVjdCIsImF0dHIiLCJkM1BvbHlnb25BcmVhIiwid2luIiwiZGVmIiwibyIsInNlbGYiLCJ3aW5kb3ciLCJnbG9iYWwiLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJkb2MiLCJkb2N1bWVudCIsImlzVmFsdWUiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNib29sZWFuIiwiY2VpbDEwIiwiY2VpbCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJkIiwiaXNFbXB0eSIsImxlbmd0aCIsIkRhdGUiLCJpc05hTiIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsInRyYW5zaXRpb24iLCJjYiIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJub2RlIiwiZHkiLCJ0b01pZGRsZSIsImluZGV4T2YiLCJkaWZmIiwibXVsdGlsaW5lIiwibGVuIiwiaHRtbCIsImFwcGVuZCIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ3aWR0aCIsImhlaWdodCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiJGVsIiwiZXZlbnQiLCJkM0V2ZW50IiwibWFpbiIsInN1YmNoYXJ0IiwidHlwZSIsInNlbGVjdCIsIkNMQVNTIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiYSIsImIiLCJjIiwiZiIsImdldFVuaXF1ZSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJyZWR1Y2UiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzb3J0VmFsdWUiLCJpc0FzYyIsImV2ZXJ5Iiwic29ydCIsImdldE1pbk1heCIsInJlcyIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJwYXJzZURhdGUiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiaGlkZGVuIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGFzVG91Y2hQb2ludHMiLCJtYXhUb3VjaFBvaW50cyIsImhhc1RvdWNoIiwiRG9jdW1lbnRUb3VjaCIsImhhc01vdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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aUIvSyxHQUF4RDtBQUVBLFNBQVFzTCxRQUFRLElBQUksT0FBYixJQUEwQlAsUUFBUSxJQUFJLE9BQXRDLElBQWtELElBQXpEO0FBQ0EsQyIsImZpbGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLXZvcm9ub2lcIiksIHJlcXVpcmUoXCJkMy1wb2x5Z29uXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidGV4dG92ZXJsYXBcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy12b3Jvbm9pXCIsIFwiZDMtcG9seWdvblwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0ZXh0b3ZlcmxhcFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxyXG4gKiBAY2xhc3MgUGx1Z2luXHJcbiAqL1xyXG4vKipcclxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXHJcbiAqIEBuYW1lIHZlcnNpb25cclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyb2YgUGx1Z2luXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBleGFtcGxlXHJcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XHJcblx0cHVibGljICQkO1xyXG5cdHB1YmxpYyBvcHRpb25zO1xyXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuMC1hbHBoYVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGJlZm9yZUluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkYWZ0ZXJJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHJlZHJhdygpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHdpbGxEZXN0cm95KCkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0YXJjOiBcImJiLWFyY1wiLFxyXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxyXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxyXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxyXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXHJcblx0YXhpczogXCJiYi1heGlzXCIsXHJcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXHJcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcclxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcclxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxyXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcclxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxyXG5cdGJhcjogXCJiYi1iYXJcIixcclxuXHRiYXJzOiBcImJiLWJhcnNcIixcclxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxyXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcclxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxyXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXHJcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXHJcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcclxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcclxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXHJcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxyXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxyXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXHJcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcclxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxyXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcclxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXHJcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXHJcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcclxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXHJcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxyXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxyXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXHJcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXHJcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxyXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXHJcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcclxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxyXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcclxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcclxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxyXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxyXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcclxuXHRncmlkOiBcImJiLWdyaWRcIixcclxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxyXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcclxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXHJcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXHJcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxyXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXHJcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXHJcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxyXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXHJcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxyXG5cdGxpbmU6IFwiYmItbGluZVwiLFxyXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXHJcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxyXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXHJcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcclxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXHJcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxyXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXHJcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxyXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxyXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXHJcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxyXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxyXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXHJcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcclxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcclxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXHJcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXHJcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcclxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXHJcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcclxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXHJcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxyXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXHJcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxyXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXHJcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxyXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcclxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxyXG5cdHpvb21SZWN0OiBcImJiLXpvb20tcmVjdFwiLFxyXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcclxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXHJcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxyXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XHJcblxyXG4vKipcclxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XHJcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xyXG5cdGxldCB0YXJnZXQ7XHJcblx0bGV0IGtleXM7XHJcblx0bGV0IHJlYWQ7XHJcblxyXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XHJcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XHJcblxyXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcclxuXHRcdFx0cmV0dXJuIGZpbmQoKTtcclxuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fTtcclxuXHJcblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xyXG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XHJcblx0XHRyZWFkID0gZmluZCgpO1xyXG5cclxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcclxuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uIGNsYXNzXHJcbiAqIEBjbGFzcyBUZXh0T3ZlcmxhcE9wdGlvbnNcclxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb25zXHJcbiAqIEBhdWdtZW50cyBQbHVnaW5cclxuICogQHJldHVybnMge1RleHRPdmVybGFwT3B0aW9uc31cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNldCBzZWxlY3RvciBzdHJpbmcgZm9yIHRhcmdldCB0ZXh0IG5vZGVzXHJcblx0XHRcdCAqIEBuYW1lIHNlbGVjdG9yXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcclxuXHRcdFx0ICogQHR5cGUge3N0cmluZ31cclxuXHRcdFx0ICogQGRlZmF1bHQgXCIuYmItdGV4dHMgdGV4dFwiXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqICAvLyBzZWxlY3RvciBmb3IgZGF0YSBsYWJlbCB0ZXh0IG5vZGVzXHJcblx0XHRcdCAqIHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCJcclxuXHRcdFx0ICovXHJcblx0XHRcdHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCIsXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IGV4dGVudCBvZiBsYWJlbCBvdmVybGFwIHByZXZlbnRpb25cclxuXHRcdFx0ICogQG5hbWUgZXh0ZW50XHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcclxuXHRcdFx0ICogQHR5cGUge251bWJlcn1cclxuXHRcdFx0ICogQGRlZmF1bHQgMVxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiBcdGV4dGVudDogMVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0ZXh0ZW50OiAxLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNldCBtaW5pbXVtIGFyZWEgbmVlZGVkIHRvIHNob3cgYSBkYXRhIGxhYmVsXHJcblx0XHRcdCAqIEBuYW1lIGFyZWFcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxyXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdFx0XHQgKiBAZGVmYXVsdCAwXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqIFx0YXJlYTogMFxyXG5cdFx0XHQgKi9cclxuXHRcdFx0YXJlYTogMFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge3Zvcm9ub2kgYXMgZDNWb3Jvbm9pfSBmcm9tIFwiZDMtdm9yb25vaVwiO1xyXG5pbXBvcnQge1xyXG5cdHBvbHlnb25DZW50cm9pZCBhcyBkM1BvbHlnb25DZW50cm9pZCxcclxuXHRwb2x5Z29uQXJlYSBhcyBkM1BvbHlnb25BcmVhXHJcbn0gZnJvbSBcImQzLXBvbHlnb25cIjtcclxuaW1wb3J0IHtcclxuXHRzZWxlY3QgYXMgZDNTZWxlY3QsXHJcblx0c2VsZWN0QWxsIGFzIGQzU2VsZWN0QWxsXHJcbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xyXG5pbXBvcnQge2xvYWRDb25maWd9IGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XHJcblxyXG4vKipcclxuICogVGV4dE92ZXJsYXAgcGx1Z2luPGJyPlxyXG4gKiBQcmV2ZW50cyBsYWJlbCBvdmVybGFwIHVzaW5nIFtWb3Jvbm9pIGxheW91dF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVm9yb25vaV9kaWFncmFtKS5cclxuICogLSAqKk5PVEU6KipcclxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxyXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cclxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcclxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXHJcbiAqICAgLSBbZDMtcG9seWdvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXBvbHlnb24pXHJcbiAqICAgLSBbZDMtdm9yb25vaV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXZvcm9ub2kpXHJcbiAqIEBjbGFzcyBwbHVnaW4tdGV4dG92ZXJsYXBcclxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxyXG4gKiBAcmVxdWlyZXMgZDMtcG9seWdvblxyXG4gKiBAcmVxdWlyZXMgZDMtdm9yb25vaVxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xyXG4gKiBAYXVnbWVudHMgUGx1Z2luXHJcbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcH1cclxuICogQGV4YW1wbGVcclxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcclxuICogICAgIGRhdGE6IHtcclxuICogICAgIFx0ICBjb2x1bW5zOiBbIC4uLiBdXHJcbiAqICAgICB9XHJcbiAqICAgICAuLi5cclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBiYi5wbHVnaW4udGV4dG92ZXJsYXAoe1xyXG4gKiAgICAgICAgICBzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxyXG4gKiAgICAgICAgICBleHRlbnQ6IDgsXHJcbiAqICAgICAgICAgIGFyZWE6IDNcclxuICogICAgIF1cclxuICogIH0pO1xyXG4gKiBAZXhhbXBsZVxyXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xyXG4gKiBpbXBvcnQgVGV4dE92ZXJsYXAgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcFwiO1xyXG4gKlxyXG4gKiBiYi5nZW5lcmF0ZSh7XHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgVGV4dE92ZXJsYXAoeyAuLi4gfSlcclxuICogICAgIF1cclxuICogfSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRPdmVybGFwIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRwcml2YXRlIGNvbmZpZztcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQkaW5pdCgpOiB2b2lkIHtcclxuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0JHJlZHJhdygpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRleHQgPSBkM1NlbGVjdEFsbCh0aGlzLmNvbmZpZy5zZWxlY3Rvcik7XHJcblxyXG5cdFx0IXRleHQuZW1wdHkoKSAmJiB0aGlzLnByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZXMgdGhlIHZvcm9ub2kgbGF5b3V0IGZvciBkYXRhIGxhYmVsc1xyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIEluZGljZXMgdmFsdWVzXHJcblx0ICogQHJldHVybnMge29iamVjdH0gVm9yb25vaSBsYXlvdXQgcG9pbnRzIGFuZCBjb3JyZXNwb25kaW5nIERhdGEgcG9pbnRzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRnZW5lcmF0ZVZvcm9ub2koZGF0YSkge1xyXG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XHJcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XHJcblx0XHRjb25zdCBbbWluLCBtYXhdID0gW1wieFwiLCBcInlcIl0ubWFwKHYgPT4gc2NhbGVbdl0uZG9tYWluKCkpO1xyXG5cclxuXHRcdFttaW5bMV0sIG1heFswXV0gPSBbbWF4WzBdLCBtaW5bMV1dO1xyXG5cclxuXHRcdHJldHVybiBkM1Zvcm9ub2koKVxyXG5cdFx0XHQuZXh0ZW50KFttaW4sIG1heF0pXHJcblx0XHRcdC5wb2x5Z29ucyhkYXRhKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldCB0ZXh0IGxhYmVsJ3MgcG9zaXRpb24gdG8gcHJldmVudGcgb3ZlcmxhcC5cclxuXHQgKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSB0ZXh0IHRhcmdldCB0ZXh0IHNlbGVjdGlvblxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTogdm9pZCB7XHJcblx0XHRjb25zdCB7ZXh0ZW50LCBhcmVhfSA9IHRoaXMuY29uZmlnO1xyXG5cdFx0Y29uc3QgY2VsbHMgPSB0aGlzLmdlbmVyYXRlVm9yb25vaSh0ZXh0LmRhdGEoKS5tYXAodiA9PiBbdi54LCB2LnZhbHVlXSkpO1xyXG5cdFx0bGV0IGkgPSAwO1xyXG5cclxuXHRcdHRleHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc3QgY2VsbCA9IGNlbGxzW2krK107XHJcblxyXG5cdFx0XHRpZiAoY2VsbCAmJiB0aGlzKSB7XHJcblx0XHRcdFx0Y29uc3QgW3gsIHldID0gY2VsbC5kYXRhO1xyXG5cdFx0XHRcdGNvbnN0IFtjeCwgY3ldID0gZDNQb2x5Z29uQ2VudHJvaWQoY2VsbCk7XHJcblx0XHRcdFx0Y29uc3QgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIoY3kgLSB5LCBjeCAtIHgpIC8gTWF0aC5QSSAqIDIpO1xyXG5cclxuXHRcdFx0XHRjb25zdCB4VHJhbnNsYXRlID0gZXh0ZW50ICogKGFuZ2xlID09PSAwID8gMSA6IC0xKTtcclxuXHRcdFx0XHRjb25zdCB5VHJhbnNsYXRlID0gYW5nbGUgPT09IC0xID8gLWV4dGVudCA6IGV4dGVudCArIDU7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHR4dEFuY2hvciA9IE1hdGguYWJzKGFuZ2xlKSA9PT0gMSA/XHJcblx0XHRcdFx0XHRcIm1pZGRsZVwiIDogKGFuZ2xlID09PSAwID8gXCJzdGFydFwiIDogXCJlbmRcIik7XHJcblxyXG5cdFx0XHRcdGQzU2VsZWN0KHRoaXMpXHJcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHRcdFx0XHQuYXR0cihcImRpc3BsYXlcIiwgZDNQb2x5Z29uQXJlYShjZWxsKSA8IGFyZWEgPyBcIm5vbmVcIiA6IG51bGwpXHJcblx0XHRcdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIHR4dEFuY2hvcilcclxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYDAuJHthbmdsZSA9PT0gMSA/IDcxIDogMzV9ZW1gKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3hUcmFuc2xhdGV9LCAke3lUcmFuc2xhdGV9KWApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogV2luZG93IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXHJcbmV4cG9ydCB7d2luIGFzIHdpbmRvdywgZG9jIGFzIGRvY3VtZW50fTtcclxuXHJcbmNvbnN0IHdpbiA9ICgoKSA9PiB7XHJcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xyXG5cclxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XHJcbn0pKCk7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXHJcblxyXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XHJcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XHJcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xyXG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhc0hhbGZQaXhlbCxcclxuXHRicnVzaEVtcHR5LFxyXG5cdGNhbGxGbixcclxuXHRjYXBpdGFsaXplLFxyXG5cdGNlaWwxMCxcclxuXHRjb252ZXJ0SW5wdXRUeXBlLFxyXG5cdGRpZmZEb21haW4sXHJcblx0ZW5kYWxsLFxyXG5cdGVtdWxhdGVFdmVudCxcclxuXHRleHRlbmQsXHJcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXHJcblx0Z2V0Qm91bmRpbmdSZWN0LFxyXG5cdGdldENzc1J1bGVzLFxyXG5cdGdldE1pbk1heCxcclxuXHRnZXRPcHRpb24sXHJcblx0Z2V0UGF0aEJveCxcclxuXHRnZXRSYW5kb20sXHJcblx0Z2V0UmFuZ2UsXHJcblx0Z2V0UmVjdFNlZ0xpc3QsXHJcblx0Z2V0VHJhbnNsYXRpb24sXHJcblx0Z2V0VW5pcXVlLFxyXG5cdGhhc1ZhbHVlLFxyXG5cdGlzQXJyYXksXHJcblx0aXNib29sZWFuLFxyXG5cdGlzRGVmaW5lZCxcclxuXHRpc0VtcHR5LFxyXG5cdGlzRnVuY3Rpb24sXHJcblx0aXNOdW1iZXIsXHJcblx0aXNPYmplY3QsXHJcblx0aXNPYmplY3RUeXBlLFxyXG5cdGlzU3RyaW5nLFxyXG5cdGlzVGFiVmlzaWJsZSxcclxuXHRpc1VuZGVmaW5lZCxcclxuXHRpc1ZhbHVlLFxyXG5cdG1lcmdlQXJyYXksXHJcblx0bWVyZ2VPYmosXHJcblx0bm90RW1wdHksXHJcblx0cGFyc2VEYXRlLFxyXG5cdHNhbml0aXNlLFxyXG5cdHNldFRleHRWYWx1ZSxcclxuXHRzb3J0VmFsdWUsXHJcblx0dG9BcnJheSxcclxuXHR0cGxQcm9jZXNzXHJcbn07XHJcblxyXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xyXG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcclxuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcclxuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcclxuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcclxuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XHJcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcclxuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xyXG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xyXG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xyXG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcclxuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcclxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XHJcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxyXG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxyXG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcclxuKTtcclxuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpcyBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XHJcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxyXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XHJcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcclxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcblx0bGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XHJcblxyXG5cdHJldHVybiBmb3VuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXHJcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcclxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcclxuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XHJcblxyXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcclxuXHRyZXR1cm4gaXNGbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcclxuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cclxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHRsZXQgbiA9IDA7XHJcblxyXG5cdHRyYW5zaXRpb25cclxuXHRcdC5lYWNoKCgpID0+ICsrbilcclxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XHJcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XHJcblx0XHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xyXG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cclxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcclxuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXHJcblx0bm9kZTogZDNTZWxlY3Rpb24sXHJcblx0dGV4dDogc3RyaW5nLFxyXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXHJcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4pIHtcclxuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xyXG5cdFx0bm9kZS50ZXh0KHRleHQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcclxuXHJcblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xyXG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xyXG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcclxuXHJcblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcclxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xyXG5cclxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcclxuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXHJcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcclxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxyXG5cdFx0XHRcdFx0LnRleHQodik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcclxuXHQvKlxyXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcclxuXHQgKiAqL1xyXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xyXG5cclxuXHRyZXR1cm4gW1xyXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXHJcblx0XHR7eCwgeX0sIC8vIHNlZzFcclxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXHJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXHJcblx0XTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGF0aEJveChcclxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcclxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xyXG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcclxuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcclxuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcclxuICogQHBhcmFtIHtvYmplY3R9ICRlbCBTZWxlY3Rpb24gb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XHJcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xyXG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcclxuXHRsZXQgc2VsZWN0aW9uO1xyXG5cclxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XHJcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xyXG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xyXG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cclxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XHJcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc2VsZWN0aW9uO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cclxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGdldEJvdW5kaW5nUmVjdCA9IChub2RlKToge1xyXG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxyXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxyXG59ID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XHJcblxyXG4vKipcclxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xyXG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG5cclxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYnJ1c2ggaXMgZW1wdHlcclxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcclxuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xyXG5cclxuXHRpZiAoc2VsZWN0aW9uKSB7XHJcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXHJcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXHJcblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXHJcblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gc291cmNlIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcclxuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XHJcblx0XHRzb3VyY2UuZm9yRWFjaCh2ID0+IGV4dGVuZCh0YXJnZXQsIHYpKTtcclxuXHR9XHJcblxyXG5cdC8vIGV4Y2x1ZGUgbmFtZSB3aXRoIG9ubHkgbnVtYmVyc1xyXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcclxuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApKSB7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGNhcGl0YWxpemUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgdG8gYXJyYXlcclxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcclxuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcclxuXHRsZXQgcnVsZXMgPSBbXTtcclxuXHJcblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHJ1bGVzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0dFbGVtZW50XHJcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcclxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xyXG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XHJcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcclxuXHJcblx0cmV0dXJuIGJhc2VWYWwgJiYgYmFzZVZhbC5udW1iZXJPZkl0ZW1zID9cclxuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxyXG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB1bmlxdWUgdmFsdWUgZnJvbSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XHJcblx0Y29uc3QgaXNEYXRlID0gZGF0YVswXSBpbnN0YW5jZW9mIERhdGU7XHJcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcclxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XHJcblxyXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgU291cmNlIGFycmF5XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcclxuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VPYmoodGFyZ2V0OiBvYmplY3QsIC4uLm9iamVjdE4pOiBhbnkge1xyXG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xyXG5cdFx0cmV0dXJuIHRhcmdldDtcclxuXHR9XHJcblxyXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcclxuXHJcblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xyXG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XHJcblxyXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XHJcblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xyXG59XHJcblxyXG4vKipcclxuICogU29ydCB2YWx1ZVxyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjIHRydWU6IGFzYywgZmFsc2U6IGRlc2NcclxuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xyXG5cdGxldCBmbjtcclxuXHJcblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XHJcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xyXG5cdFx0fSBlbHNlIGlmICghaXNBc2MpIHtcclxuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBtaW4vbWF4IHZhbHVlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfERhdGV8dW5kZWZpbmVkfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TWluTWF4KHR5cGU6IFwibWluXCIgfCBcIm1heFwiLCBkYXRhOiBudW1iZXJbXSB8IERhdGVbXSB8IGFueSk6IG51bWJlciB8IERhdGUgfCB1bmRlZmluZWQgfCBhbnkge1xyXG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcclxuXHJcblx0aWYgKHJlcy5sZW5ndGgpIHtcclxuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XHJcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcclxuXHRcdH0gZWxzZSBpZiAocmVzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzID0gdW5kZWZpbmVkO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCByYW5nZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRSYW5nZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc3RlcCA9IDEpOiBudW1iZXJbXSA9PiB7XHJcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xyXG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XHJcblxyXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xyXG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuLy8gZW11bGF0ZSBldmVudFxyXG5jb25zdCBlbXVsYXRlRXZlbnQgPSB7XHJcblx0bW91c2U6ICgoKSA9PiB7XHJcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xyXG5cdFx0XHRidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIHNjcmVlblg6IDAsIHNjcmVlblk6IDAsIGNsaWVudFg6IDAsIGNsaWVudFk6IDBcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcclxuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcclxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XHJcblx0XHRcdH07XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcclxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcclxuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xyXG5cclxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxyXG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXHJcblx0XHRcdFx0XHRldmVudFR5cGUsXHJcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcclxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxyXG5cdFx0XHRcdFx0d2luZG93LFxyXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcclxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcclxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcclxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXHJcblx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9KSgpLFxyXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XHJcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXHJcblx0XHRcdHRhcmdldDogZWwsXHJcblx0XHRcdHJhZGl1c1g6IDIuNSxcclxuXHRcdFx0cmFkaXVzWTogMi41LFxyXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcclxuXHRcdFx0Zm9yY2U6IDAuNVxyXG5cdFx0fSwgcGFyYW1zKSk7XHJcblxyXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXHJcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXHJcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxyXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxyXG5cdFx0fSkpO1xyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XHJcblx0bGV0IHJlcyA9IHRwbDtcclxuXHJcblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcclxuXHRcdHJlcyA9IHJlcy5yZXBsYWNlKG5ldyBSZWdFeHAoYHs9JHt4fX1gLCBcImdcIiksIGRhdGFbeF0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxyXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXHJcbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIFZhbHVlIG9mIGRhdGUgdG8gYmUgcGFyc2VkXHJcbiAqIEByZXR1cm5zIHtEYXRlfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcclxuXHRsZXQgcGFyc2VkRGF0ZTtcclxuXHJcblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcclxuXHR9IGVsc2UgaWYgKGlzU3RyaW5nKGRhdGUpKSB7XHJcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcclxuXHJcblx0XHRwYXJzZWREYXRlID0gZm9ybWF0LmRhdGFUaW1lKGNvbmZpZy5kYXRhX3hGb3JtYXQpKGRhdGUpO1xyXG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XHJcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xyXG5cdH1cclxuXHJcblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xyXG5cdFx0Y29uc29sZSAmJiBjb25zb2xlLmVycm9yICYmXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcnNlZERhdGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNUYWJWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcclxuICogQHBhcmFtIHtib29sZWFufSBtb3VzZSBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS5tb3VzZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XHJcblx0bGV0IGlzTW9iaWxlID0gZmFsc2U7XHJcblxyXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXHJcblx0aWYgKC9Nb2JpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSAmJiB0b3VjaCkge1xyXG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xyXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xyXG5cclxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXHJcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxyXG5cdFx0Y29uc3QgaGFzVG91Y2ggPSAoXCJvbnRvdWNobW92ZVwiIGluIHdpbmRvdyB8fCAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpO1xyXG5cclxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XHJcblx0fVxyXG5cclxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xyXG5cclxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9