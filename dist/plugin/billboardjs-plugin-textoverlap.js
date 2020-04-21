/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * http://naver.github.io/billboard.js/
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
var Plugin =
/*#__PURE__*/
function () {
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
__webpack_require__.r(__webpack_exports__);

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return textoverlap_TextOverlap; });




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

var textoverlap_TextOverlap =
/*#__PURE__*/
function (_Plugin) {
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
/* unused harmony export asHalfPixel */
/* unused harmony export brushEmpty */
/* unused harmony export callFn */
/* unused harmony export capitalize */
/* unused harmony export ceil10 */
/* unused harmony export convertInputType */
/* unused harmony export diffDomain */
/* unused harmony export endall */
/* unused harmony export emulateEvent */
/* unused harmony export extend */
/* unused harmony export getBrushSelection */
/* unused harmony export getBoundingRect */
/* unused harmony export getCssRules */
/* unused harmony export getMinMax */
/* unused harmony export getOption */
/* unused harmony export getPathBox */
/* unused harmony export getRandom */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRange; });
/* unused harmony export getRectSegList */
/* unused harmony export getTranslation */
/* unused harmony export getUnique */
/* unused harmony export hasValue */
/* unused harmony export isArray */
/* unused harmony export isboolean */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isFunction; });
/* unused harmony export isNumber */
/* unused harmony export isObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isObjectType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isString; });
/* unused harmony export isTabVisible */
/* unused harmony export isUndefined */
/* unused harmony export isValue */
/* unused harmony export mergeArray */
/* unused harmony export mergeObj */
/* unused harmony export notEmpty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return parseDate; });
/* unused harmony export sanitise */
/* unused harmony export setTextValue */
/* unused harmony export sortValue */
/* unused harmony export toArray */
/* unused harmony export tplProcess */
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
 * @param {SVGGraphicsElement} node
 * @return {SVGMatrix} matrix
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwicmVhZCIsInRoaXNDb25maWciLCJmaW5kIiwic2hpZnQiLCJpc09iamVjdFR5cGUiLCJ1bmRlZmluZWQiLCJzcGxpdCIsImlzRGVmaW5lZCIsIk9wdGlvbnMiLCJzZWxlY3RvciIsImV4dGVudCIsIlRleHRPdmVybGFwIiwiY2FsbCIsImQzU2VsZWN0QWxsIiwicHJldmVudExhYmVsT3ZlcmxhcCIsImdlbmVyYXRlVm9yb25vaSIsImRhdGEiLCIkJCIsInNjYWxlIiwibWFwIiwidiIsImRvbWFpbiIsIm1pbiIsIm1heCIsImQzVm9yb25vaSIsInBvbHlnb25zIiwiY2VsbHMiLCJ4IiwidmFsdWUiLCJpIiwiZWFjaCIsImNlbGwiLCJ5IiwiZDNQb2x5Z29uQ2VudHJvaWQiLCJjeCIsImN5IiwiYW5nbGUiLCJNYXRoIiwicm91bmQiLCJhdGFuMiIsIlBJIiwieFRyYW5zbGF0ZSIsInlUcmFuc2xhdGUiLCJ0eHRBbmNob3IiLCJhYnMiLCJkM1NlbGVjdCIsImF0dHIiLCJkM1BvbHlnb25BcmVhIiwid2luIiwiZGVmIiwibyIsInNlbGYiLCJ3aW5kb3ciLCJnbG9iYWwiLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJkb2MiLCJkb2N1bWVudCIsImlzVmFsdWUiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNib29sZWFuIiwiY2VpbDEwIiwiY2VpbCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJkIiwiaXNFbXB0eSIsImxlbmd0aCIsIkRhdGUiLCJpc05hTiIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsInRyYW5zaXRpb24iLCJjYiIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJub2RlIiwiZHkiLCJ0b01pZGRsZSIsImluZGV4T2YiLCJkaWZmIiwibXVsdGlsaW5lIiwibGVuIiwiaHRtbCIsImFwcGVuZCIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ3aWR0aCIsImhlaWdodCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiJGVsIiwiZXZlbnQiLCJkM0V2ZW50IiwibWFpbiIsInN1YmNoYXJ0IiwidHlwZSIsInNlbGVjdCIsIkNMQVNTIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiYSIsImIiLCJjIiwiZiIsImdldFVuaXF1ZSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJyZWR1Y2UiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzb3J0VmFsdWUiLCJpc0FzYyIsImV2ZXJ5Iiwic29ydCIsImdldE1pbk1heCIsInJlcyIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJwYXJzZURhdGUiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiaGlkZGVuIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGFzVG91Y2hQb2ludHMiLCJtYXhUb3VjaFBvaW50cyIsImhhc1RvdWNoIiwiRG9jdW1lbnRUb3VjaCIsImhhc01vdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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QUFBLFFBTS9DQyxRQUFRLEdBQUksaUJBQWlCcEwsR0FBakIsSUFBNEJBLEdBQU0sQ0FBQ3FMLGFBQVAsSUFBd0JoTCxHQUFRLFlBQVlMLEdBQU0sQ0FBQ3FMLGFBTjVDLEVBSXJEO0FBQ0E7O0FBR0FOLFlBQVEsR0FBR0csY0FBYyxJQUFJRSxRQVJ3QjtBQVNyRDs7QUFFRCxNQUFNRSxRQUFRLEtBQUcsQ0FBQWpELEtBQUssSUFBSzBDLFFBQWIsS0FBeUIsaUJBQWlCL0ssR0FBeEQ7QUFFQSxTQUFRc0wsUUFBUSxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInRleHRvdmVybGFwXCIsIFtcImQzLXNlbGVjdGlvblwiLCBcImQzLWJydXNoXCIsIFwiZDMtdm9yb25vaVwiLCBcImQzLXBvbHlnb25cIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLXZvcm9ub2lcIiksIHJlcXVpcmUoXCJkMy1wb2x5Z29uXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJ0ZXh0b3ZlcmxhcFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cclxuICogQGNsYXNzIFBsdWdpblxyXG4gKi9cclxuLyoqXHJcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxyXG4gKiBAbmFtZSB2ZXJzaW9uXHJcbiAqIEBzdGF0aWNcclxuICogQG1lbWJlcm9mIFBsdWdpblxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xyXG5cdHB1YmxpYyAkJDtcclxuXHRwdWJsaWMgb3B0aW9ucztcclxuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4wLjAtYWxwaGFcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRiZWZvcmVJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRpbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGFmdGVySW5pdCgpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRyZWRyYXcoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCR3aWxsRGVzdHJveSgpIHtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dGhpc1trZXldID0gbnVsbDtcclxuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGFyYzogXCJiYi1hcmNcIixcclxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcclxuXHRhcmNzOiBcImJiLWFyY3NcIixcclxuXHRhcmVhOiBcImJiLWFyZWFcIixcclxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxyXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxyXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxyXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXHJcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXHJcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcclxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXHJcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcclxuXHRiYXI6IFwiYmItYmFyXCIsXHJcblx0YmFyczogXCJiYi1iYXJzXCIsXHJcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcclxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXHJcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcclxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxyXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxyXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXHJcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcclxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxyXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcclxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcclxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcclxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxyXG5cdGNoYXJ0Q2lyY2xlczogXCJiYi1jaGFydC1jaXJjbGVzXCIsXHJcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcclxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXHJcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxyXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxyXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXHJcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxyXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcclxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcclxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxyXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxyXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcclxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxyXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXHJcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcclxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXHJcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXHJcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcclxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcclxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXHJcblx0Z3JpZDogXCJiYi1ncmlkXCIsXHJcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcclxuXHRsZWdlbmRCYWNrZ3JvdW5kOiBcImJiLWxlZ2VuZC1iYWNrZ3JvdW5kXCIsXHJcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxyXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxyXG5cdGxlZ2VuZEl0ZW1Gb2N1c2VkOiBcImJiLWxlZ2VuZC1pdGVtLWZvY3VzZWRcIixcclxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxyXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxyXG5cdGxlZ2VuZEl0ZW1UaWxlOiBcImJiLWxlZ2VuZC1pdGVtLXRpbGVcIixcclxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxyXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcclxuXHRsaW5lOiBcImJiLWxpbmVcIixcclxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxyXG5cdHJlZ2lvbjogXCJiYi1yZWdpb25cIixcclxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcclxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcclxuXHRzZWxlY3RlZENpcmNsZXM6IFwiYmItc2VsZWN0ZWQtY2lyY2xlc1wiLFxyXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXHJcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxyXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcclxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxyXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcclxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcclxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxyXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcclxuXHR0ZXh0OiBcImJiLXRleHRcIixcclxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxyXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXHJcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXHJcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxyXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxyXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXHJcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxyXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXHJcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxyXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcclxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxyXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcclxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxyXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcclxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXHJcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcclxuXHR6b29tUmVjdDogXCJiYi16b29tLXJlY3RcIixcclxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXHJcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxyXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcclxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgY29uZmlndXJhdGlvbiBvcHRpb25cclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xyXG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcclxuXHRsZXQgdGFyZ2V0O1xyXG5cdGxldCBrZXlzO1xyXG5cdGxldCByZWFkO1xyXG5cclxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xyXG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xyXG5cclxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcclxuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XHJcblx0XHRcdHJldHVybiBmaW5kKCk7XHJcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH07XHJcblxyXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdHRhcmdldCA9IGNvbmZpZztcclxuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xyXG5cdFx0cmVhZCA9IGZpbmQoKTtcclxuXHJcblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XHJcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X187IiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbiBjbGFzc1xyXG4gKiBAY2xhc3MgVGV4dE92ZXJsYXBPcHRpb25zXHJcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xyXG4gKiBAYXVnbWVudHMgUGx1Z2luXHJcbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcE9wdGlvbnN9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTZXQgc2VsZWN0b3Igc3RyaW5nIGZvciB0YXJnZXQgdGV4dCBub2Rlc1xyXG5cdFx0XHQgKiBAbmFtZSBzZWxlY3RvclxyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXHJcblx0XHRcdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0XHRcdCAqIEBkZWZhdWx0IFwiLmJiLXRleHRzIHRleHRcIlxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgLy8gc2VsZWN0b3IgZm9yIGRhdGEgbGFiZWwgdGV4dCBub2Rlc1xyXG5cdFx0XHQgKiBzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNldCBleHRlbnQgb2YgbGFiZWwgb3ZlcmxhcCBwcmV2ZW50aW9uXHJcblx0XHRcdCAqIEBuYW1lIGV4dGVudFxyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXHJcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XHJcblx0XHRcdCAqIEBkZWZhdWx0IDFcclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogXHRleHRlbnQ6IDFcclxuXHRcdFx0ICovXHJcblx0XHRcdGV4dGVudDogMSxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTZXQgbWluaW11bSBhcmVhIG5lZWRlZCB0byBzaG93IGEgZGF0YSBsYWJlbFxyXG5cdFx0XHQgKiBAbmFtZSBhcmVhXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcclxuXHRcdFx0ICogQHR5cGUge251bWJlcn1cclxuXHRcdFx0ICogQGRlZmF1bHQgMFxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiBcdGFyZWE6IDBcclxuXHRcdFx0ICovXHJcblx0XHRcdGFyZWE6IDBcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHt2b3Jvbm9pIGFzIGQzVm9yb25vaX0gZnJvbSBcImQzLXZvcm9ub2lcIjtcclxuaW1wb3J0IHtcclxuXHRwb2x5Z29uQ2VudHJvaWQgYXMgZDNQb2x5Z29uQ2VudHJvaWQsXHJcblx0cG9seWdvbkFyZWEgYXMgZDNQb2x5Z29uQXJlYVxyXG59IGZyb20gXCJkMy1wb2x5Z29uXCI7XHJcbmltcG9ydCB7XHJcblx0c2VsZWN0IGFzIGQzU2VsZWN0LFxyXG5cdHNlbGVjdEFsbCBhcyBkM1NlbGVjdEFsbFxyXG59IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcclxuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQgUGx1Z2luIGZyb20gXCIuLi9QbHVnaW5cIjtcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRleHRPdmVybGFwIHBsdWdpbjxicj5cclxuICogUHJldmVudHMgbGFiZWwgb3ZlcmxhcCB1c2luZyBbVm9yb25vaSBsYXlvdXRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zvcm9ub2lfZGlhZ3JhbSkuXHJcbiAqIC0gKipOT1RFOioqXHJcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cclxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXHJcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXHJcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxyXG4gKiAgIC0gW2QzLXBvbHlnb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1wb2x5Z29uKVxyXG4gKiAgIC0gW2QzLXZvcm9ub2ldKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy12b3Jvbm9pKVxyXG4gKiBAY2xhc3MgcGx1Z2luLXRleHRvdmVybGFwXHJcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cclxuICogQHJlcXVpcmVzIGQzLXBvbHlnb25cclxuICogQHJlcXVpcmVzIGQzLXZvcm9ub2lcclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7VGV4dE92ZXJsYXB9XHJcbiAqIEBleGFtcGxlXHJcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XHJcbiAqICAgICBkYXRhOiB7XHJcbiAqICAgICBcdCAgY29sdW1uczogWyAuLi4gXVxyXG4gKiAgICAgfVxyXG4gKiAgICAgLi4uXHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnRleHRvdmVybGFwKHtcclxuICogICAgICAgICAgc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcclxuICogICAgICAgICAgZXh0ZW50OiA4LFxyXG4gKiAgICAgICAgICBhcmVhOiAzXHJcbiAqICAgICBdXHJcbiAqICB9KTtcclxuICogQGV4YW1wbGVcclxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcclxuICogaW1wb3J0IFRleHRPdmVybGFwIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXBcIjtcclxuICpcclxuICogYmIuZ2VuZXJhdGUoe1xyXG4gKiAgICAgcGx1Z2luczogW1xyXG4gKiAgICAgICAgbmV3IFRleHRPdmVybGFwKHsgLi4uIH0pXHJcbiAqICAgICBdXHJcbiAqIH0pXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0T3ZlcmxhcCBleHRlbmRzIFBsdWdpbiB7XHJcblx0cHJpdmF0ZSBjb25maWc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0JGluaXQoKTogdm9pZCB7XHJcblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcclxuXHR9XHJcblxyXG5cdCRyZWRyYXcoKTogdm9pZCB7XHJcblx0XHRjb25zdCB0ZXh0ID0gZDNTZWxlY3RBbGwodGhpcy5jb25maWcuc2VsZWN0b3IpO1xyXG5cclxuXHRcdCF0ZXh0LmVtcHR5KCkgJiYgdGhpcy5wcmV2ZW50TGFiZWxPdmVybGFwKHRleHQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIHRoZSB2b3Jvbm9pIGxheW91dCBmb3IgZGF0YSBsYWJlbHNcclxuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBJbmRpY2VzIHZhbHVlc1xyXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFZvcm9ub2kgbGF5b3V0IHBvaW50cyBhbmQgY29ycmVzcG9uZGluZyBEYXRhIHBvaW50c1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0Z2VuZXJhdGVWb3Jvbm9pKGRhdGEpIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xyXG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xyXG5cdFx0Y29uc3QgW21pbiwgbWF4XSA9IFtcInhcIiwgXCJ5XCJdLm1hcCh2ID0+IHNjYWxlW3ZdLmRvbWFpbigpKTtcclxuXHJcblx0XHRbbWluWzFdLCBtYXhbMF1dID0gW21heFswXSwgbWluWzFdXTtcclxuXHJcblx0XHRyZXR1cm4gZDNWb3Jvbm9pKClcclxuXHRcdFx0LmV4dGVudChbbWluLCBtYXhdKVxyXG5cdFx0XHQucG9seWdvbnMoZGF0YSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXQgdGV4dCBsYWJlbCdzIHBvc2l0aW9uIHRvIHByZXZlbnRnIG92ZXJsYXAuXHJcblx0ICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gdGV4dCB0YXJnZXQgdGV4dCBzZWxlY3Rpb25cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk6IHZvaWQge1xyXG5cdFx0Y29uc3Qge2V4dGVudCwgYXJlYX0gPSB0aGlzLmNvbmZpZztcclxuXHRcdGNvbnN0IGNlbGxzID0gdGhpcy5nZW5lcmF0ZVZvcm9ub2kodGV4dC5kYXRhKCkubWFwKHYgPT4gW3YueCwgdi52YWx1ZV0pKTtcclxuXHRcdGxldCBpID0gMDtcclxuXHJcblx0XHR0ZXh0LmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IGNlbGwgPSBjZWxsc1tpKytdO1xyXG5cclxuXHRcdFx0aWYgKGNlbGwgJiYgdGhpcykge1xyXG5cdFx0XHRcdGNvbnN0IFt4LCB5XSA9IGNlbGwuZGF0YTtcclxuXHRcdFx0XHRjb25zdCBbY3gsIGN5XSA9IGQzUG9seWdvbkNlbnRyb2lkKGNlbGwpO1xyXG5cdFx0XHRcdGNvbnN0IGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmF0YW4yKGN5IC0geSwgY3ggLSB4KSAvIE1hdGguUEkgKiAyKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgeFRyYW5zbGF0ZSA9IGV4dGVudCAqIChhbmdsZSA9PT0gMCA/IDEgOiAtMSk7XHJcblx0XHRcdFx0Y29uc3QgeVRyYW5zbGF0ZSA9IGFuZ2xlID09PSAtMSA/IC1leHRlbnQgOiBleHRlbnQgKyA1O1xyXG5cclxuXHRcdFx0XHRjb25zdCB0eHRBbmNob3IgPSBNYXRoLmFicyhhbmdsZSkgPT09IDEgP1xyXG5cdFx0XHRcdFx0XCJtaWRkbGVcIiA6IChhbmdsZSA9PT0gMCA/IFwic3RhcnRcIiA6IFwiZW5kXCIpO1xyXG5cclxuXHRcdFx0XHRkM1NlbGVjdCh0aGlzKVxyXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJkaXNwbGF5XCIsIGQzUG9seWdvbkFyZWEoY2VsbCkgPCBhcmVhID8gXCJub25lXCIgOiBudWxsKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCB0eHRBbmNob3IpXHJcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAwLiR7YW5nbGUgPT09IDEgPyA3MSA6IDM1fWVtYClcclxuXHRcdFx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt4VHJhbnNsYXRlfSwgJHt5VHJhbnNsYXRlfSlgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIFdpbmRvdyBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xyXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XHJcblxyXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xyXG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcclxuXHJcblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xyXG59KSgpO1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xyXG5cclxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xyXG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xyXG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XHJcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0YXNIYWxmUGl4ZWwsXHJcblx0YnJ1c2hFbXB0eSxcclxuXHRjYWxsRm4sXHJcblx0Y2FwaXRhbGl6ZSxcclxuXHRjZWlsMTAsXHJcblx0Y29udmVydElucHV0VHlwZSxcclxuXHRkaWZmRG9tYWluLFxyXG5cdGVuZGFsbCxcclxuXHRlbXVsYXRlRXZlbnQsXHJcblx0ZXh0ZW5kLFxyXG5cdGdldEJydXNoU2VsZWN0aW9uLFxyXG5cdGdldEJvdW5kaW5nUmVjdCxcclxuXHRnZXRDc3NSdWxlcyxcclxuXHRnZXRNaW5NYXgsXHJcblx0Z2V0T3B0aW9uLFxyXG5cdGdldFBhdGhCb3gsXHJcblx0Z2V0UmFuZG9tLFxyXG5cdGdldFJhbmdlLFxyXG5cdGdldFJlY3RTZWdMaXN0LFxyXG5cdGdldFRyYW5zbGF0aW9uLFxyXG5cdGdldFVuaXF1ZSxcclxuXHRoYXNWYWx1ZSxcclxuXHRpc0FycmF5LFxyXG5cdGlzYm9vbGVhbixcclxuXHRpc0RlZmluZWQsXHJcblx0aXNFbXB0eSxcclxuXHRpc0Z1bmN0aW9uLFxyXG5cdGlzTnVtYmVyLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGlzT2JqZWN0VHlwZSxcclxuXHRpc1N0cmluZyxcclxuXHRpc1RhYlZpc2libGUsXHJcblx0aXNVbmRlZmluZWQsXHJcblx0aXNWYWx1ZSxcclxuXHRtZXJnZUFycmF5LFxyXG5cdG1lcmdlT2JqLFxyXG5cdG5vdEVtcHR5LFxyXG5cdHBhcnNlRGF0ZSxcclxuXHRzYW5pdGlzZSxcclxuXHRzZXRUZXh0VmFsdWUsXHJcblx0c29ydFZhbHVlLFxyXG5cdHRvQXJyYXksXHJcblx0dHBsUHJvY2Vzc1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcclxuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XHJcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XHJcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XHJcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XHJcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xyXG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XHJcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcclxuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcclxuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcclxuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XHJcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXHJcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxyXG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXHJcbik7XHJcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaXMgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxyXG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcclxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xyXG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG5cdGxldCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xyXG5cclxuXHRyZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxyXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XHJcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xyXG5cclxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XHJcblx0cmV0dXJuIGlzRm47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXHJcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXHJcbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblx0bGV0IG4gPSAwO1xyXG5cclxuXHR0cmFuc2l0aW9uXHJcblx0XHQuZWFjaCgoKSA9PiArK24pXHJcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xyXG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cclxuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXHJcbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcclxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxyXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxyXG5cdHRleHQ6IHN0cmluZyxcclxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxyXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcclxuXHRcdG5vZGUudGV4dCh0ZXh0KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XHJcblxyXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcclxuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcclxuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XHJcblxyXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XHJcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcclxuXHJcblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXHJcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcclxuXHRcdFx0XHRcdC50ZXh0KHYpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XHJcblx0LypcclxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXHJcblx0ICogKi9cclxuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcclxuXHJcblx0cmV0dXJuIFtcclxuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxyXG5cdFx0e3gsIHl9LCAvLyBzZWcxXHJcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xyXG5cdF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhdGhCb3goXHJcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XHJcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcclxuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XHJcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XHJcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZWwgU2VsZWN0aW9uIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xyXG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcclxuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XHJcblx0bGV0IHNlbGVjdGlvbjtcclxuXHJcblx0Ly8gY2hlY2sgZnJvbSBldmVudFxyXG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcclxuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcclxuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXHJcblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xyXG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNlbGVjdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXHJcbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSAobm9kZSk6IHtcclxuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcclxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcclxufSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xyXG5cclxuLyoqXHJcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XHJcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcclxuXHJcblx0aWYgKHNlbGVjdGlvbikge1xyXG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxyXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxyXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxyXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XHJcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xyXG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XHJcblx0fVxyXG5cclxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcclxuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XHJcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSkge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHRvIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XHJcblxyXG4vKipcclxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XHJcblx0bGV0IHJ1bGVzID0gW107XHJcblxyXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBydWxlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtTVkdNYXRyaXh9IG1hdHJpeFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcclxuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xyXG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmJhc2VWYWw7XHJcblxyXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XHJcblx0XHRiYXNlVmFsLmdldEl0ZW0oMCkubWF0cml4IDpcclxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBTb3VyY2UgZGF0YVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xyXG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xyXG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXHJcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xyXG5cclxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2UgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XHJcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcclxuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XHJcblxyXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcclxuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xyXG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xyXG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdmFsdWVcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcclxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzb3J0VmFsdWUoZGF0YTogYW55W10sIGlzQXNjID0gdHJ1ZSk6IGFueVtdIHtcclxuXHRsZXQgZm47XHJcblxyXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xyXG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcclxuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XHJcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgbWluL21heCB2YWx1ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcclxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcclxuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XHJcblxyXG5cdGlmIChyZXMubGVuZ3RoKSB7XHJcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xyXG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XHJcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcyA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcmFuZ2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBudW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xyXG5cdGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcclxuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xyXG5cclxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcclxuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8vIGVtdWxhdGUgZXZlbnRcclxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xyXG5cdG1vdXNlOiAoKCkgPT4ge1xyXG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcclxuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXHJcblx0XHR9KTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XHJcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcclxuXHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcclxuXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcclxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxyXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxyXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXHJcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcclxuXHRcdFx0XHRcdHdpbmRvdyxcclxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XHJcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXHJcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXHJcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSkoKSxcclxuXHR0b3VjaDogKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xyXG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxyXG5cdFx0XHR0YXJnZXQ6IGVsLFxyXG5cdFx0XHRyYWRpdXNYOiAyLjUsXHJcblx0XHRcdHJhZGl1c1k6IDIuNSxcclxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXHJcblx0XHRcdGZvcmNlOiAwLjVcclxuXHRcdH0sIHBhcmFtcykpO1xyXG5cclxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XHJcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxyXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxyXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcclxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cclxuXHRcdH0pKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cdGxldCByZXMgPSB0cGw7XHJcblxyXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XHJcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcGFyc2VkIGRhdGUgdmFsdWVcclxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxyXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJucyB7RGF0ZX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgYW55KTogRGF0ZSB7XHJcblx0bGV0IHBhcnNlZERhdGU7XHJcblxyXG5cdGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XHJcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgZm9ybWF0fSA9IHRoaXM7XHJcblxyXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcclxuXHR9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGUpICYmICFpc05hTihkYXRlKSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcclxuXHR9XHJcblxyXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcclxuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgeCAnJHtkYXRlfScgdG8gRGF0ZSBvYmplY3RgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJzZWREYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gIWRvY3VtZW50LmhpZGRlbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcclxuICogQHBhcmFtIHtib29sZWFufSB0b3VjaCBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS50b3VjaFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xyXG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5cclxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxyXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcclxuXHRcdC8vIFNvbWUgRWRnZSBkZXNrdG9wIHJldHVybiB0cnVlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8yMDQxNzA3NC9cclxuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcclxuXHJcblx0XHQvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy90b3VjaGV2ZW50cy5qc1xyXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcclxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcclxuXHJcblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIChoYXNNb3VzZSAmJiBcIm1vdXNlXCIpIHx8IChpc01vYmlsZSAmJiBcInRvdWNoXCIpIHx8IG51bGw7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==