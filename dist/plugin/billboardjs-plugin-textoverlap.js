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
 * Gets the SVGMatrix of an SVGElement
 * @param {SVGElement} node Target node
 * @returns {SVGMatrix} matrix
 * @private
 */


function getTranslation(node) {
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
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwicmVhZCIsInRoaXNDb25maWciLCJmaW5kIiwic2hpZnQiLCJpc09iamVjdFR5cGUiLCJ1bmRlZmluZWQiLCJzcGxpdCIsImlzRGVmaW5lZCIsIk9wdGlvbnMiLCJzZWxlY3RvciIsImV4dGVudCIsIlRleHRPdmVybGFwIiwiY2FsbCIsImQzU2VsZWN0QWxsIiwicHJldmVudExhYmVsT3ZlcmxhcCIsImdlbmVyYXRlVm9yb25vaSIsImRhdGEiLCIkJCIsInNjYWxlIiwibWFwIiwidiIsImRvbWFpbiIsIm1pbiIsIm1heCIsImQzVm9yb25vaSIsInBvbHlnb25zIiwiY2VsbHMiLCJ4IiwidmFsdWUiLCJpIiwiZWFjaCIsImNlbGwiLCJ5IiwiZDNQb2x5Z29uQ2VudHJvaWQiLCJjeCIsImN5IiwiYW5nbGUiLCJNYXRoIiwicm91bmQiLCJhdGFuMiIsIlBJIiwieFRyYW5zbGF0ZSIsInlUcmFuc2xhdGUiLCJ0eHRBbmNob3IiLCJhYnMiLCJkM1NlbGVjdCIsImF0dHIiLCJkM1BvbHlnb25BcmVhIiwid2luIiwiZGVmIiwibyIsInNlbGYiLCJ3aW5kb3ciLCJnbG9iYWwiLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJkb2MiLCJkb2N1bWVudCIsImlzVmFsdWUiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNib29sZWFuIiwiY2VpbDEwIiwiY2VpbCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJkIiwiaXNFbXB0eSIsImxlbmd0aCIsIkRhdGUiLCJpc05hTiIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsInRyYW5zaXRpb24iLCJjYiIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJub2RlIiwiZHkiLCJ0b01pZGRsZSIsImluZGV4T2YiLCJkaWZmIiwibXVsdGlsaW5lIiwibGVuIiwiaHRtbCIsImFwcGVuZCIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ3aWR0aCIsImhlaWdodCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiJGVsIiwiZXZlbnQiLCJkM0V2ZW50IiwibWFpbiIsInN1YmNoYXJ0IiwidHlwZSIsInNlbGVjdCIsIkNMQVNTIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsImdldEl0ZW0iLCJtYXRyaXgiLCJhIiwiYiIsImMiLCJmIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwiZmlsdGVyIiwibWVyZ2VBcnJheSIsInJlZHVjZSIsIm1lcmdlT2JqIiwib2JqZWN0TiIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJzb3J0IiwiZ2V0TWluTWF4IiwicmVzIiwiZ2V0UmFuZ2UiLCJzdGFydCIsImVuZCIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsInBhcnNlRGF0ZSIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7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QUFJLGlCQUFpQm5MLEdBQWpCLElBQTRCQSxHQUFNLENBQUNvTCxhQUFQLElBQXdCL0ssR0FBUSxZQUFZTCxHQUFNLENBQUNvTCxhQU41QyxFQUlyRDtBQUNBOztBQUdBTixZQUFRLEdBQUdHLGNBQWMsSUFBSUUsUUFSd0I7QUFTckQ7O0FBRUQsTUFBTUUsUUFBUSxLQUFHLENBQUFqRCxLQUFLLElBQUswQyxRQUFiLEtBQXlCLGlCQUFpQjlLLEdBQXhEO0FBRUEsU0FBUXFMLFFBQVEsSUFBSSxPQUFiLElBQTBCUCxRQUFRLElBQUksT0FBdEMsSUFBa0QsSUFBekQ7QUFDQSxDIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0ZXh0b3ZlcmxhcFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1icnVzaFwiLCBcImQzLXZvcm9ub2lcIiwgXCJkMy1wb2x5Z29uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy12b3Jvbm9pXCIpLCByZXF1aXJlKFwiZDMtcG9seWdvblwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuLyoqXG4gKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cbiAqIEBuYW1lIHZlcnNpb25cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQbHVnaW5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHRwdWJsaWMgJCQ7XG5cdHB1YmxpYyBvcHRpb25zO1xuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4wLjAtYWxwaGFcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmRCYWNrZ3JvdW5kOiBcImJiLWxlZ2VuZC1iYWNrZ3JvdW5kXCIsXG5cdGxlZ2VuZEl0ZW06IFwiYmItbGVnZW5kLWl0ZW1cIixcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXG5cdGxlZ2VuZEl0ZW1Gb2N1c2VkOiBcImJiLWxlZ2VuZC1pdGVtLWZvY3VzZWRcIixcblx0bGVnZW5kSXRlbUhpZGRlbjogXCJiYi1sZWdlbmQtaXRlbS1oaWRkZW5cIixcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXG5cdGxlZ2VuZEl0ZW1UaWxlOiBcImJiLWxlZ2VuZC1pdGVtLXRpbGVcIixcblx0bGV2ZWw6IFwiYmItbGV2ZWxcIixcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxuXHRsaW5lOiBcImJiLWxpbmVcIixcblx0bGluZXM6IFwiYmItbGluZXNcIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0em9vbVJlY3Q6IFwiYmItem9vbS1yZWN0XCIsXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xuXG4vKipcbiAqIExvYWQgY29uZmlndXJhdGlvbiBvcHRpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVXNlcidzIGdlbmVyYXRpb24gY29uZmlnIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZyhjb25maWc6IE9wdGlvbnMpOiB2b2lkIHtcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xuXHRsZXQgdGFyZ2V0O1xuXHRsZXQga2V5cztcblx0bGV0IHJlYWQ7XG5cblx0Y29uc3QgZmluZCA9ICgpID0+IHtcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XG5cblx0XHRpZiAoa2V5ICYmIHRhcmdldCAmJiBpc09iamVjdFR5cGUodGFyZ2V0KSAmJiBrZXkgaW4gdGFyZ2V0KSB7XG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcblx0XHRcdHJldHVybiBmaW5kKCk7XG5cdFx0fSBlbHNlIGlmICgha2V5KSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH07XG5cblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdHRhcmdldCA9IGNvbmZpZztcblx0XHRrZXlzID0ga2V5LnNwbGl0KFwiX1wiKTtcblx0XHRyZWFkID0gZmluZCgpO1xuXG5cdFx0aWYgKGlzRGVmaW5lZChyZWFkKSkge1xuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcblx0XHR9XG5cdH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgVGV4dE92ZXJsYXBPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHNlbGVjdG9yIHN0cmluZyBmb3IgdGFyZ2V0IHRleHQgbm9kZXNcblx0XHRcdCAqIEBuYW1lIHNlbGVjdG9yXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdFx0ICogQGRlZmF1bHQgXCIuYmItdGV4dHMgdGV4dFwiXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIC8vIHNlbGVjdG9yIGZvciBkYXRhIGxhYmVsIHRleHQgbm9kZXNcblx0XHRcdCAqIHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCJcblx0XHRcdCAqL1xuXHRcdFx0c2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgZXh0ZW50IG9mIGxhYmVsIG92ZXJsYXAgcHJldmVudGlvblxuXHRcdFx0ICogQG5hbWUgZXh0ZW50XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdFx0ICogQGRlZmF1bHQgMVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXh0ZW50OiAxXG5cdFx0XHQgKi9cblx0XHRcdGV4dGVudDogMSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgbWluaW11bSBhcmVhIG5lZWRlZCB0byBzaG93IGEgZGF0YSBsYWJlbFxuXHRcdFx0ICogQG5hbWUgYXJlYVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi10ZXh0b3ZlcmxhcFxuXHRcdFx0ICogQHR5cGUge251bWJlcn1cblx0XHRcdCAqIEBkZWZhdWx0IDBcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBcdGFyZWE6IDBcblx0XHRcdCAqL1xuXHRcdFx0YXJlYTogMFxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7dm9yb25vaSBhcyBkM1Zvcm9ub2l9IGZyb20gXCJkMy12b3Jvbm9pXCI7XG5pbXBvcnQge1xuXHRwb2x5Z29uQ2VudHJvaWQgYXMgZDNQb2x5Z29uQ2VudHJvaWQsXG5cdHBvbHlnb25BcmVhIGFzIGQzUG9seWdvbkFyZWFcbn0gZnJvbSBcImQzLXBvbHlnb25cIjtcbmltcG9ydCB7XG5cdHNlbGVjdCBhcyBkM1NlbGVjdCxcblx0c2VsZWN0QWxsIGFzIGQzU2VsZWN0QWxsXG59IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuXG4vKipcbiAqIFRleHRPdmVybGFwIHBsdWdpbjxicj5cbiAqIFByZXZlbnRzIGxhYmVsIG92ZXJsYXAgdXNpbmcgW1Zvcm9ub2kgbGF5b3V0XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Wb3Jvbm9pX2RpYWdyYW0pLlxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1wb2x5Z29uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtcG9seWdvbilcbiAqICAgLSBbZDMtdm9yb25vaV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXZvcm9ub2kpXG4gKiBAY2xhc3MgcGx1Z2luLXRleHRvdmVybGFwXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXG4gKiBAcmVxdWlyZXMgZDMtcG9seWdvblxuICogQHJlcXVpcmVzIGQzLXZvcm9ub2lcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7VGV4dE92ZXJsYXB9XG4gKiBAZXhhbXBsZVxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgXHQgIGNvbHVtbnM6IFsgLi4uIF1cbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4udGV4dG92ZXJsYXAoe1xuICogICAgICAgICAgc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIixcbiAqICAgICAgICAgIGV4dGVudDogOCxcbiAqICAgICAgICAgIGFyZWE6IDNcbiAqICAgICBdXG4gKiAgfSk7XG4gKiBAZXhhbXBsZVxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcbiAqIGltcG9ydCBUZXh0T3ZlcmxhcCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXRleHRvdmVybGFwXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgVGV4dE92ZXJsYXAoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0T3ZlcmxhcCBleHRlbmRzIFBsdWdpbiB7XG5cdGNvbmZpZztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcblx0fVxuXG5cdCRyZWRyYXcoKTogdm9pZCB7XG5cdFx0Y29uc3QgdGV4dCA9IGQzU2VsZWN0QWxsKHRoaXMuY29uZmlnLnNlbGVjdG9yKTtcblxuXHRcdCF0ZXh0LmVtcHR5KCkgJiYgdGhpcy5wcmV2ZW50TGFiZWxPdmVybGFwKHRleHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyB0aGUgdm9yb25vaSBsYXlvdXQgZm9yIGRhdGEgbGFiZWxzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIEluZGljZXMgdmFsdWVzXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFZvcm9ub2kgbGF5b3V0IHBvaW50cyBhbmQgY29ycmVzcG9uZGluZyBEYXRhIHBvaW50c1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Z2VuZXJhdGVWb3Jvbm9pKGRhdGEpIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XG5cdFx0Y29uc3QgW21pbiwgbWF4XSA9IFtcInhcIiwgXCJ5XCJdLm1hcCh2ID0+IHNjYWxlW3ZdLmRvbWFpbigpKTtcblxuXHRcdFttaW5bMV0sIG1heFswXV0gPSBbbWF4WzBdLCBtaW5bMV1dO1xuXG5cdFx0cmV0dXJuIGQzVm9yb25vaSgpXG5cdFx0XHQuZXh0ZW50KFttaW4sIG1heF0pXG5cdFx0XHQucG9seWdvbnMoZGF0YSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRleHQgbGFiZWwncyBwb3NpdGlvbiB0byBwcmV2ZW50ZyBvdmVybGFwLlxuXHQgKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSB0ZXh0IHRhcmdldCB0ZXh0IHNlbGVjdGlvblxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTogdm9pZCB7XG5cdFx0Y29uc3Qge2V4dGVudCwgYXJlYX0gPSB0aGlzLmNvbmZpZztcblx0XHRjb25zdCBjZWxscyA9IHRoaXMuZ2VuZXJhdGVWb3Jvbm9pKHRleHQuZGF0YSgpLm1hcCh2ID0+IFt2LngsIHYudmFsdWVdKSk7XG5cdFx0bGV0IGkgPSAwO1xuXG5cdFx0dGV4dC5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc3QgY2VsbCA9IGNlbGxzW2krK107XG5cblx0XHRcdGlmIChjZWxsICYmIHRoaXMpIHtcblx0XHRcdFx0Y29uc3QgW3gsIHldID0gY2VsbC5kYXRhO1xuXHRcdFx0XHRjb25zdCBbY3gsIGN5XSA9IGQzUG9seWdvbkNlbnRyb2lkKGNlbGwpO1xuXHRcdFx0XHRjb25zdCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMihjeSAtIHksIGN4IC0geCkgLyBNYXRoLlBJICogMik7XG5cblx0XHRcdFx0Y29uc3QgeFRyYW5zbGF0ZSA9IGV4dGVudCAqIChhbmdsZSA9PT0gMCA/IDEgOiAtMSk7XG5cdFx0XHRcdGNvbnN0IHlUcmFuc2xhdGUgPSBhbmdsZSA9PT0gLTEgPyAtZXh0ZW50IDogZXh0ZW50ICsgNTtcblxuXHRcdFx0XHRjb25zdCB0eHRBbmNob3IgPSBNYXRoLmFicyhhbmdsZSkgPT09IDEgP1xuXHRcdFx0XHRcdFwibWlkZGxlXCIgOiAoYW5nbGUgPT09IDAgPyBcInN0YXJ0XCIgOiBcImVuZFwiKTtcblxuXHRcdFx0XHRkM1NlbGVjdCh0aGlzKVxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHQuYXR0cihcImRpc3BsYXlcIiwgZDNQb2x5Z29uQXJlYShjZWxsKSA8IGFyZWEgPyBcIm5vbmVcIiA6IG51bGwpXG5cdFx0XHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCB0eHRBbmNob3IpXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgMC4ke2FuZ2xlID09PSAxID8gNzEgOiAzNX1lbWApXG5cdFx0XHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3hUcmFuc2xhdGV9LCAke3lUcmFuc2xhdGV9KWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xuXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XG5cblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSkoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5cbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xuXG5leHBvcnQge1xuXHRhc0hhbGZQaXhlbCxcblx0YnJ1c2hFbXB0eSxcblx0Y2FsbEZuLFxuXHRjYXBpdGFsaXplLFxuXHRjZWlsMTAsXG5cdGNvbnZlcnRJbnB1dFR5cGUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc2Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1RhYlZpc2libGUsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHBhcnNlRGF0ZSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG4vKipcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxuICogQHJldHVybnMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xuXHRsZXQgbiA9IDA7XG5cblx0dHJhbnNpdGlvblxuXHRcdC5lYWNoKCgpID0+ICsrbilcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XG59XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxuXHRub2RlOiBkM1NlbGVjdGlvbixcblx0dGV4dDogc3RyaW5nLFxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn1cblxuLyoqXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEJveChcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9ICRlbCBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcblx0bGV0IHNlbGVjdGlvbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldEJvdW5kaW5nUmVjdCA9IChub2RlKToge1xuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXG59ID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbi8qKlxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYnJ1c2ggaXMgZW1wdHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBicnVzaEVtcHR5KGN0eCk6IGJvb2xlYW4ge1xuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xuXG5cdGlmIChzZWxlY3Rpb24pIHtcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxuXHRcdC8vIG9uZS1kaW1lbnNpb25hbDogW3gwLCB4MV0gb3IgW3kwLCB5MV1cblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gc291cmNlIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XG5cdGlmIChpc0FycmF5KHNvdXJjZSkpIHtcblx0XHRzb3VyY2UuZm9yRWFjaCh2ID0+IGV4dGVuZCh0YXJnZXQsIHYpKTtcblx0fVxuXG5cdC8vIGV4Y2x1ZGUgbmFtZSB3aXRoIG9ubHkgbnVtYmVyc1xuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XG5cdFx0aWYgKC9eXFxkKyQvLnRlc3QocCkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhcGl0YWxpemUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodjogQ1NTU3R5bGVEZWNsYXJhdGlvbiB8IGFueSk6IGFueSA9PiBbXS5zbGljZS5jYWxsKHYpO1xuXG4vKipcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XG5cdGxldCBydWxlcyA9IFtdO1xuXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcnVsZXM7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBUYXJnZXQgbm9kZVxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGlvbihub2RlKSB7XG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gPyB0cmFuc2Zvcm0uYmFzZVZhbCA6IFtdO1xuXG5cdHJldHVybiBiYXNlVmFsLmxlbmd0aCA/IGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOiB7YTogMCwgYjogMCwgYzogMCwgZDogMCwgZTogMCwgZjogMH07XG59XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=