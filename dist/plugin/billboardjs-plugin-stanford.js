/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.3-nightly-20200908152358
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
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.3-nightly-20200908152358");



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
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
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ stanford_Stanford; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(6);

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(7);

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(8);

// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// EXTERNAL MODULE: ./src/config/config.ts
var config_config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @augments Plugin
 * @returns {StanfordOptions}
 * @private
 */
var Options = function () {
  return {
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
     * @type {object}
     * @property {object} [scale] scale object
     * @property {number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {number} [scale.width=20] Width of the color scale
     * @property {string|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
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
     * @type {object}
     * @property {object} [padding] padding object
     * @property {number} [padding.top=0] Top padding value.
     * @property {number} [padding.right=0] Right padding value.
     * @property {number} [padding.bottom=0] Bottom padding value.
     * @property {number} [padding.left=0] Left padding value.
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


// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
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
// EXTERNAL MODULE: ./src/module/util.ts + 1 modules
var util = __webpack_require__(18);

// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */

/**
 * Check if point is in region
 * @param {object} point Point
 * @param {Array} region Region
 * @returns {boolean}
 * @private
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
/**
 * Compare epochs
 * @param {object} a Target
 * @param {object} b Source
 * @returns {number}
 * @private
 */


function compareEpochs(a, b) {
  return a.epochs < b.epochs ? -1 : a.epochs > b.epochs ? 1 : 0;
}
/**
 * Get region area
 * @param {Array} points Points
 * @returns {number}
 * @private
 */


function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  for (var point1, point2, area = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) point1 = points[i], point2 = points[j], area += point1.x * point2.y, area -= point1.y * point2.x;

  return area /= 2, area;
}
/**
 * Get centroid
 * @param {Array} points Points
 * @returns {object}
 * @private
 */


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


// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck


/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var Elements_Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    Object(defineProperty["a" /* default */])(this, "owner", void 0), this.owner = owner;
    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.$el.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines), elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }

  var _proto = Elements.prototype;
  return _proto.updateStanfordLines = function updateStanfordLines(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        stanfordLine = main.select("." + stanford_classes.stanfordLines).style("shape-rendering", "geometricprecision").selectAll("." + stanford_classes.stanfordLine).data(this.owner.config.lines);
    stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordLineEnter = stanfordLine.enter().append("g");
    stanfordLineEnter.append("line").style("opacity", "0"), stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
      return stanford_classes.stanfordLine + (d.class ? " " + d.class : "");
    }).select("line").transition().duration(duration).attr("x1", function (d) {
      return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
    }).attr("x2", function (d) {
      return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
    }).attr("y1", function (d) {
      return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
    }).attr("y2", function (d) {
      return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
    }).transition().style("opacity", "1");
  }, _proto.updateStanfordRegions = function updateStanfordRegions(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
        stanfordRegion = main.select("." + stanford_classes.stanfordRegions).selectAll("." + stanford_classes.stanfordRegion).data(this.owner.config.regions);
    stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordRegionEnter = stanfordRegion.enter().append("g");
    stanfordRegionEnter.append("polygon").style("opacity", "0"), stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), stanfordRegion = stanfordRegionEnter.merge(stanfordRegion), stanfordRegion.attr("class", function (d) {
      return stanford_classes.stanfordRegion + (d.class ? " " + d.class : "");
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
  }, _proto.updateStanfordElements = function updateStanfordElements(duration) {
    duration === void 0 && (duration = 0), this.updateStanfordLines(duration), this.updateStanfordRegions(duration);
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(12);

// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(13);

// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts


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
    Object(defineProperty["a" /* default */])(this, "owner", void 0), Object(defineProperty["a" /* default */])(this, "colorScale", void 0), this.owner = owner;
  }

  var _proto = ColorScale.prototype;
  return _proto.drawColorScale = function drawColorScale() {
    var _this$owner = this.owner,
        $$ = _this$owner.$$,
        config = _this$owner.config,
        target = $$.data.targets[0],
        height = $$.state.height - config.padding_bottom - config.padding_top,
        barWidth = config.scale_width,
        barHeight = 5,
        points = Object(util["a" /* getRange */])(config.padding_bottom, height, barHeight),
        inverseScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequential"])(target.colors).domain([points[points.length - 1], points[0]]);
    this.colorScale && this.colorScale.remove(), this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      return i * barHeight;
    }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
      return inverseScale(d);
    });
    // Legend Axis
    var axisScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleLog"])().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
        legendAxis = Object(external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_["axisRight"])(axisScale),
        scaleFormat = config.scale_format;
    scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : Object(util["d" /* isFunction */])(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat(Object(external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_["format"])("d"));
    // Draw Axis
    var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(" + barWidth + ",0)").call(legendAxis);
    scaleFormat === "pow10" && axis.selectAll(".tick text").text(null).filter(function (d) {
      return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
    }) // Power of Ten
    .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
    .text(function (d) {
      return Math.round(Math.log(d) / Math.LN10);
    }), this.colorScale.attr("transform", "translate(" + ($$.state.current.width - this.xForColorScale()) + ", 0)");
  }, _proto.xForColorScale = function xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  }, _proto.getColorScalePadding = function getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  }, ColorScale;
}();


// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck










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
 * @param {object} options Stanford plugin options
 * @augments Plugin
 * @returns {Stanford}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-stanford.js"></script>
 *
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
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford.esm";
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

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "colorScale", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "elements", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(Stanford, _Plugin);

  var _proto = Stanford.prototype;
  return _proto.$beforeInit = function $beforeInit() {
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
  }, _proto.$init = function $init() {
    var $$ = this.$$;
    config_config["a" /* loadConfig */].call(this, this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale_ColorScale(this), this.elements = new Elements_Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
  }, _proto.$redraw = function $redraw(duration) {
    this.colorScale && this.colorScale.drawColorScale(), this.elements && this.elements.updateStanfordElements(duration);
  }, _proto.getOptions = function getOptions() {
    return new Options();
  }, _proto.convertData = function convertData() {
    var data = this.$$.data.targets,
        epochs = this.options.epochs;
    data.forEach(function (d) {
      d.values.forEach(function (v, i) {
        v.epochs = epochs[i];
      }), d.minEpochs = undefined, d.maxEpochs = undefined, d.colors = undefined, d.colorscale = undefined;
    });
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        scale = $$.scale,
        yScale = d.axis && d.axis === "y2" ? scale.y2 : scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, _proto.initStanfordData = function initStanfordData() {
    var config = this.config,
        target = this.$$.data.targets[0];
    target.values.sort(compareEpochs);
    // Get array of epochs
    var epochs = target.values.map(function (a) {
      return a.epochs;
    });
    target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, epochs) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, epochs) : config.scale_max, target.colors = Object(util["d" /* isFunction */])(config.colors) ? config.colors : Object(external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_["interpolateHslLong"])(Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(250, 1, .5), Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(0, 1, .5)), target.colorscale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequentialLog"])(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }, _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }, _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    Object(util["c" /* isEmpty */])(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
      var html = "<table class=\"" + classes["a" /* default */].tooltip + "\"><tbody>";
      return d.forEach(function (v) {
        html += "<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(config.data_x) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(v.id) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + classes["a" /* default */].tooltipName + "-" + v.id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>" + defaultTitleFormat("Epochs") + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(v.epochs) + "</td>\n\t\t\t\t\t\t</tr>";
      }), html + "</tbody></table>";
    });
  }, _proto.countEpochsInRegion = function countEpochsInRegion(region) {
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
  }, Stanford;
}(Plugin["a" /* default */]);



/***/ }),
/* 17 */,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsImdldE1pbk1heCIsInJlcyIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FB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ZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWludGVycG9sYXRlXCIpLCByZXF1aXJlKFwiZDMtY29sb3JcIiksIHJlcXVpcmUoXCJkMy1zY2FsZVwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtYXhpc1wiKSwgcmVxdWlyZShcImQzLWZvcm1hdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInN0YW5mb3JkXCIsIFtcImQzLXNlbGVjdGlvblwiLCBcImQzLWludGVycG9sYXRlXCIsIFwiZDMtY29sb3JcIiwgXCJkMy1zY2FsZVwiLCBcImQzLWJydXNoXCIsIFwiZDMtYXhpc1wiLCBcImQzLWZvcm1hdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzdGFuZm9yZFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWludGVycG9sYXRlXCIpLCByZXF1aXJlKFwiZDMtY29sb3JcIiksIHJlcXVpcmUoXCJkMy1zY2FsZVwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtYXhpc1wiKSwgcmVxdWlyZShcImQzLWZvcm1hdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1wic3RhbmZvcmRcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTYpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cbiAqIEBjbGFzcyBQbHVnaW5cbiAqL1xuLyoqXG4gKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cbiAqIEBuYW1lIHZlcnNpb25cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQbHVnaW5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAZXhhbXBsZVxuICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHRwdWJsaWMgJCQ7XG5cdHB1YmxpYyBvcHRpb25zO1xuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4wLjMtbmlnaHRseS0yMDIwMDkwODE1MjM1OFwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFyYzogXCJiYi1hcmNcIixcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxuXHRhcmVhOiBcImJiLWFyZWFcIixcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcblx0YXhpczogXCJiYi1heGlzXCIsXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxuXHRiYXI6IFwiYmItYmFyXCIsXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxuXHRjaGFydENpcmNsZXM6IFwiYmItY2hhcnQtY2lyY2xlc1wiLFxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcblx0Z3JpZDogXCJiYi1ncmlkXCIsXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXG5cdGxlZ2VuZDogXCJiYi1sZWdlbmRcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdG1haW46IFwiYmItbWFpblwiLFxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXG5cdHN1YmNoYXJ0OiBcImJiLXN1YmNoYXJ0XCIsXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcblx0dGV4dDogXCJiYi10ZXh0XCIsXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcblxuLyoqXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcblx0bGV0IHRhcmdldDtcblx0bGV0IGtleXM7XG5cdGxldCByZWFkO1xuXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xuXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XG5cdFx0XHRyZXR1cm4gZmluZCgpO1xuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcblx0XHR0YXJnZXQgPSBjb25maWc7XG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XG5cdFx0cmVhZCA9IGZpbmQoKTtcblxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgU3RhbmZvcmRPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG5cdFx0XHQgKiAgIClcblx0XHRcdCAqL1xuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXG5cdFx0XHQgKiBAbmFtZSBlcG9jaHNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cblx0XHRcdCAqL1xuXHRcdFx0ZXBvY2hzOiA8bnVtYmVyW10+IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiB8IHgxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyB8XG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IHgyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgIHxcblx0XHRcdCAqIHwgeTIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgbGluZXM6IFtcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0bGluZXM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBzY2FsZSB2YWx1ZXNcblx0XHRcdCAqIEBuYW1lIHNjYWxlXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtzY2FsZV0gc2NhbGUgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS53aWR0aD0yMF0gV2lkdGggb2YgdGhlIGNvbG9yIHNjYWxlXG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgc2NhbGU6IHtcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXG5cdFx0XHQgKiAgICBtaW46IDEsXG5cdFx0XHQgKiAgICB3aWR0aDogNTAwLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXG5cdFx0XHQgKiAgICBmb3JtYXQ6IFwicG93MTBcIixcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXG5cdFx0XHQgKiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHgpIHtcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xuXHRcdFx0ICogICAgfVxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHNjYWxlX21pbjogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX21heDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX3dpZHRoOiA8bnVtYmVyfHVuZGVmaW5lZD4gMjAsXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIHBhZGRpbmcgZm9yIGNvbG9yIHNjYWxlIGVsZW1lbnRcblx0XHRcdCAqIEBuYW1lIHBhZGRpbmdcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gW3BhZGRpbmddIHBhZGRpbmcgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnJpZ2h0PTBdIFJpZ2h0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcuYm90dG9tPTBdIEJvdHRvbSBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBwYWRkaW5nOiB7XG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcblx0XHRcdCAqICAgICByaWdodDogMCxcblx0XHRcdCAqICAgICBib3R0b206IDAsXG5cdFx0XHQgKiAgICAgbGVmdDogMFxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxuXHRcdFx0cGFkZGluZ19yaWdodDogMCxcblx0XHRcdHBhZGRpbmdfYm90dG9tOiAwLFxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCByZWdpb24gb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqICAgfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogICB8IHBvaW50cyB8IEFycmF5IHwgIHwgfCBBY2NlcHRzIGEgZ3JvdXAgb2Ygb2JqZWN0cyB0aGF0IGhhcyB4IGFuZCB5Ljxicj5UaGVzZSBwb2ludHMgc2hvdWxkIGJlIGFkZGVkIGluIGEgY291bnRlci1jbG9ja3dpc2UgZmFzaGlvbiB0byBtYWtlIGEgY2xvc2VkIHBvbHlnb24uIHxcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XG5cdFx0XHQgKiAgIHwgdGV4dCB8IEZ1bmN0aW9uIHwgIHwgJmx0O29wdGlvbmFsPiB8IFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBhbmQgcGVyY2VudGFnZSBvZiB0aGUgbnVtYmVyIG9mIGVwb2NocyBpbiB0aGlzIHJlZ2lvbi48YnI+UmV0dXJuIGEgc3RyaW5nIHRvIHBsYWNlIHRleHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcmVnaW9uLiB8XG5cdFx0XHQgKiAgIHwgY2xhc3MgfCBTdHJpbmcgfCB8ICZsdDtvcHRpb25hbD4gfCBTZSBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyByZWdpb24sIHVzZSB0aGUgZmlsbCBwcm9wZXJ0eSBpbiBjc3MgdG8gc2V0IGEgYmFja2dyb3VuZCBjb2xvci4gfFxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIHJlZ2lvbnM6IFtcblx0XHRcdCAqICAgICAgIHtcblx0XHRcdCAqICAgICAgICAgICBwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgIF0sXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG5cdFx0XHQgKiAgICAgICAgICAgICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuXHRcdFx0ICogICAgICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcblx0XHRcdCAqICAgICAgICAgICBjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcblx0XHRcdCAqICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAuLi5cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRyZWdpb25zOiBbXVxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cblxuaW1wb3J0IHtnZXRSYW5nZSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4uLy4uL21vZHVsZS91dGlsXCI7XG5cbi8qKlxuICogQ2hlY2sgaWYgcG9pbnQgaXMgaW4gcmVnaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gcG9pbnQgUG9pbnRcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ2lvbiBSZWdpb25cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcG9pbnRJblJlZ2lvbihwb2ludCwgcmVnaW9uKTogYm9vbGVhbiB7IC8vIHRoYW5rcyB0bzogaHR0cDovL2JsLm9ja3Mub3JnL2J5Y29mZmUvNTU3NTkwNFxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cblx0Ly8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuXHRjb25zdCB4ID0gcG9pbnQueDtcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xuXHRsZXQgaW5zaWRlID0gZmFsc2U7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcblx0XHRjb25zdCB4aSA9IHJlZ2lvbltpXS54O1xuXHRcdGNvbnN0IHlpID0gcmVnaW9uW2ldLnk7XG5cblx0XHRjb25zdCB4aiA9IHJlZ2lvbltqXS54O1xuXHRcdGNvbnN0IHlqID0gcmVnaW9uW2pdLnk7XG5cblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG5cdFx0aWYgKGludGVyc2VjdCkge1xuXHRcdFx0aW5zaWRlID0gIWluc2lkZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaW5zaWRlO1xufVxuXG4vKipcbiAqIENvbXBhcmUgZXBvY2hzXG4gKiBAcGFyYW0ge29iamVjdH0gYSBUYXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBiIFNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYik6IG51bWJlciB7XG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0aWYgKGEuZXBvY2hzID4gYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG4vKipcbiAqIEdldCByZWdpb24gYXJlYVxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKTogbnVtYmVyIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxuXHRsZXQgYXJlYSA9IDA7XG5cdGxldCBwb2ludDE7XG5cdGxldCBwb2ludDI7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdHBvaW50MiA9IHBvaW50c1tqXTtcblx0XHRhcmVhICs9IHBvaW50MS54ICogcG9pbnQyLnk7XG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xuXHR9XG5cblx0YXJlYSAvPSAyO1xuXG5cdHJldHVybiBhcmVhO1xufVxuXG4vKipcbiAqIEdldCBjZW50cm9pZFxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRyb2lkKHBvaW50cykge1xuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xuXG5cdGxldCB4ID0gMDtcblx0bGV0IHkgPSAwO1xuXHRsZXQgZjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0Y29uc3QgcG9pbnQyID0gcG9pbnRzW2pdO1xuXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xuXHRcdHggKz0gKHBvaW50MS54ICsgcG9pbnQyLngpICogZjtcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XG5cdH1cblxuXHRmID0gYXJlYSAqIDY7XG5cblx0cmV0dXJuIHtcblx0XHR4OiB4IC8gZixcblx0XHR5OiB5IC8gZlxuXHR9O1xufVxuXG5leHBvcnQge1xuXHRjb21wYXJlRXBvY2hzLFxuXHRnZXRDZW50cm9pZCxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlZ2lvbkFyZWEsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzU3RyaW5nLFxuXHRwYXJzZURhdGUsXG5cdHBvaW50SW5SZWdpb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7Z2V0Q2VudHJvaWQsIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcblx0cHJpdmF0ZSBvd25lcjtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gb3duZXIuJCQuJGVsLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXG5cdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcblxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkTGluZXMpO1xuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xuXHRcdGNvbnN0IHN0YW5mb3JkTGluZSA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZExpbmVzfWApXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcubGluZXMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkTGluZS5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZExpbmVFbnRlciA9IHN0YW5mb3JkTGluZS5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyXG5cdFx0XHQubWVyZ2Uoc3RhbmZvcmRMaW5lKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkyXCIpIDogeHZDdXN0b20oZCwgXCJ4MlwiKSkpXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHtjb25maWcsICRlbDoge21haW59fSA9ICQkO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtUmVnaW9uc1xuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5yZWdpb25zKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZFJlZ2lvbi5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZFJlZ2lvbkVudGVyID0gc3RhbmZvcmRSZWdpb24uZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgaXNSb3RhdGVkID8gXCJyb3RhdGUoLTkwKVwiIDogXCJcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24gPSBzdGFuZm9yZFJlZ2lvbkVudGVyLm1lcmdlKHN0YW5mb3JkUmVnaW9uKTtcblxuXHRcdC8vIHVwZGF0ZVxuXHRcdHN0YW5mb3JkUmVnaW9uXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXG5cdFx0XHRcdGlzUm90YXRlZCA/IHl2Q3VzdG9tKHZhbHVlLCBcInlcIikgOiB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpLFxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24uc2VsZWN0KFwidGV4dFwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4XCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpIDogeHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikpKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxuXHRcdFx0LnRleHQoZCA9PiB7XG5cdFx0XHRcdGlmIChkLnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZC50ZXh0KHZhbHVlLCBwZXJjZW50YWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fSlcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcblx0XHRcdC5hdHRyKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApOiB2b2lkIHtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC5zY2FsZS55MiA6ICQkLnNjYWxlLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7YXhpc1JpZ2h0IGFzIGQzQXhpc1JpZ2h0fSBmcm9tIFwiZDMtYXhpc1wiO1xuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsIGFzIGQzU2NhbGVTZXF1ZW50aWFsLCBzY2FsZUxvZyBhcyBkM1NjYWxlTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTY2FsZSB7XG5cdHByaXZhdGUgb3duZXI7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0fVxuXG5cdGRyYXdDb2xvclNjYWxlKCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJCwgY29uZmlnfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXHRcdGNvbnN0IGhlaWdodCA9ICQkLnN0YXRlLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nX2JvdHRvbSAtIGNvbmZpZy5wYWRkaW5nX3RvcDtcblx0XHRjb25zdCBiYXJXaWR0aCA9IGNvbmZpZy5zY2FsZV93aWR0aDtcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xuXHRcdGNvbnN0IHBvaW50cyA9IGdldFJhbmdlKGNvbmZpZy5wYWRkaW5nX2JvdHRvbSwgaGVpZ2h0LCBiYXJIZWlnaHQpO1xuXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIHBvaW50c1swXV0pO1xuXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9ICQkLiRlbC5zdmcuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCA1MClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1MuY29sb3JTY2FsZSk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke2NvbmZpZy5wYWRkaW5nX3RvcH0pYClcblx0XHRcdC5zZWxlY3RBbGwoXCJiYXJzXCIpXG5cdFx0XHQuZGF0YShwb2ludHMpXG5cdFx0XHQuZW50ZXIoKVxuXHRcdFx0LmFwcGVuZChcInJlY3RcIilcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCBiYXJXaWR0aClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCBkID0+IGludmVyc2VTY2FsZShkKSk7XG5cblx0XHQvLyBMZWdlbmQgQXhpc1xuXHRcdGNvbnN0IGF4aXNTY2FsZSA9IGQzU2NhbGVMb2coKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pXG5cdFx0XHQucmFuZ2UoW1xuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3AgKyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICsgYmFySGVpZ2h0IC0gMSxcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wXG5cdFx0XHRdKTtcblxuXHRcdGNvbnN0IGxlZ2VuZEF4aXMgPSBkM0F4aXNSaWdodChheGlzU2NhbGUpO1xuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNjYWxlRm9ybWF0KSkge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KHNjYWxlRm9ybWF0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KGQzRm9ybWF0KFwiZFwiKSk7XG5cdFx0fVxuXG5cdFx0Ly8gRHJhdyBBeGlzXG5cdFx0Y29uc3QgYXhpcyA9IHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHtiYXJXaWR0aH0sMClgKVxuXHRcdFx0LmNhbGwobGVnZW5kQXhpcyk7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0YXhpcy5zZWxlY3RBbGwoXCIudGljayB0ZXh0XCIpXG5cdFx0XHRcdC50ZXh0KG51bGwpXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiBkIC8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCAtIDFlLTEyKSkgPT09IDEpIC8vIFBvd2VyIG9mIFRlblxuXHRcdFx0XHQudGV4dCgxMClcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdC5hdHRyKFwiZHlcIiwgXCItLjdlbVwiKSAvLyBodHRwczovL2JsLm9ja3Mub3JnL21ib3N0b2NrLzY3MzgyMjlcblx0XHRcdFx0LnRleHQoZCA9PiBNYXRoLnJvdW5kKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgkeyQkLnN0YXRlLmN1cnJlbnQud2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xuXHR9XG5cblx0eEZvckNvbG9yU2NhbGUoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5vd25lci5jb25maWcucGFkZGluZ19yaWdodCArXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUubm9kZSgpLmdldEJCb3goKS53aWR0aDtcblx0fVxuXG5cdGdldENvbG9yU2NhbGVQYWRkaW5nKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMueEZvckNvbG9yU2NhbGUoKSArIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfbGVmdCArIDIwO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IHtpbnRlcnBvbGF0ZUhzbExvbmcgYXMgZDNJbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtoc2wgYXMgZDNIc2x9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWxMb2cgYXMgZDNTY2FsZVNlcXVlbnRpYWxMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi8uLi9jb25maWcvY2xhc3Nlc1wiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcbmltcG9ydCB7Y29tcGFyZUVwb2NocywgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZSwgcG9pbnRJblJlZ2lvbn0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxuICogQHJlcXVpcmVzIGQzLWJydXNoXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZH1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5qc1wiPjwvc2NyaXB0PlxuICpcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJzY2F0dGVyXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuICogICAgICAgICAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG4gKiAgICAgICAgICAgKSxcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXG4gKiAgICAgICAgICAgbGluZXM6IFtcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuICogICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgc2NhbGU6IHtcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXG4gKiAgICAgICAgICAgICBcdG1pbjogMSxcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHBhZGRpbmc6IHtcbiAqICAgICAgICAgICBcdHRvcDogMTUsXG4gKiAgICAgICAgICAgXHRyaWdodDogMCxcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICBcdHtcbiAqICAgICAgICAgICAgICAgXHRwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiA0MCB9XG4gKiAgICAgICAgICAgICAgIFx0XSxcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcbiAqICAgICAgICAgICAgICAgXHQgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG4gKiAgICAgICAgICAgICAgIFx0fSxcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuICogICAgICAgICAgICAgICBcdGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuICogICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICBcdC4uLlxuICogICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgU3RhbmZvcmQgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5lc21cIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBTdGFuZm9yZCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5mb3JkIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblx0cHJpdmF0ZSBlbGVtZW50cztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkYmVmb3JlSW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XG5cblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcblxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xuXHRcdCQkLmNvbG9yID0gdGhpcy5nZXRTdGFuZm9yZFBvaW50Q29sb3IuYmluZCgkJCk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JTY2FsZSh0aGlzKTtcblx0XHR0aGlzLmVsZW1lbnRzID0gbmV3IEVsZW1lbnRzKHRoaXMpO1xuXG5cdFx0dGhpcy5jb252ZXJ0RGF0YSgpO1xuXHRcdHRoaXMuaW5pdFN0YW5mb3JkRGF0YSgpO1xuXHRcdHRoaXMuc2V0U3RhbmZvcmRUb29sdGlwKCk7XG5cdFx0dGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cblx0XHR0aGlzLiRyZWRyYXcoKTtcblx0fVxuXG5cdCRyZWRyYXcoZHVyYXRpb24/OiBudW1iZXIpOiB2b2lkIHtcblx0XHR0aGlzLmNvbG9yU2NhbGUgJiYgdGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cdFx0dGhpcy5lbGVtZW50cyAmJiB0aGlzLmVsZW1lbnRzLnVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24pO1xuXHR9XG5cblxuXHRnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xuXHRcdHJldHVybiBuZXcgT3B0aW9ucygpO1xuXHR9XG5cblx0Y29udmVydERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzO1xuXHRcdGNvbnN0IGVwb2NocyA9IHRoaXMub3B0aW9ucy5lcG9jaHM7XG5cblx0XHRkYXRhLmZvckVhY2goZCA9PiB7XG5cdFx0XHRkLnZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdHYuZXBvY2hzID0gZXBvY2hzW2ldO1xuXHRcdFx0fSk7XG5cblx0XHRcdGQubWluRXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5tYXhFcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9ycyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzY2FsZSA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gc2NhbGUueTIgOiBzY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG5cblx0aW5pdFN0YW5mb3JkRGF0YSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy4kJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHQvLyBUT0RPIFNUQU5GT1JEIHNlZSBpZiAoZGF0YS5qcyAtPiBvcmRlclRhcmdldHMpKyBjYW4gYmUgdXNlZCBpbnN0ZWFkXG5cdFx0Ly8gTWFrZSBsYXJnZXIgdmFsdWVzIGFwcGVhciBvbiB0b3Bcblx0XHR0YXJnZXQudmFsdWVzLnNvcnQoY29tcGFyZUVwb2Nocyk7XG5cblx0XHQvLyBHZXQgYXJyYXkgb2YgZXBvY2hzXG5cdFx0Y29uc3QgZXBvY2hzID0gdGFyZ2V0LnZhbHVlcy5tYXAoYSA9PiBhLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQubWluRXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9taW4pID8gY29uZmlnLnNjYWxlX21pbiA6IE1hdGgubWluKC4uLmVwb2Nocyk7XG5cdFx0dGFyZ2V0Lm1heEVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWF4KSA/IGNvbmZpZy5zY2FsZV9tYXggOiBNYXRoLm1heCguLi5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0LmNvbG9ycyA9IGlzRnVuY3Rpb24oY29uZmlnLmNvbG9ycykgP1xuXHRcdFx0Y29uZmlnLmNvbG9ycyA6IGQzSW50ZXJwb2xhdGVIc2xMb25nKGQzSHNsKDI1MCwgMSwgMC41KSwgZDNIc2woMCwgMSwgMC41KSk7XG5cblx0XHR0YXJnZXQuY29sb3JzY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsTG9nKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSk7XG5cdH1cblxuXHRnZXRTdGFuZm9yZFBvaW50Q29sb3IoZCkge1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0cmV0dXJuIHRhcmdldC5jb2xvcnNjYWxlKGQuZXBvY2hzKTtcblx0fVxuXG5cdHNldFN0YW5mb3JkVG9vbHRpcCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcy4kJDtcblxuXHRcdGlmIChpc0VtcHR5KGNvbmZpZy50b29sdGlwX2NvbnRlbnRzKSkge1xuXHRcdFx0Y29uZmlnLnRvb2x0aXBfY29udGVudHMgPSBmdW5jdGlvbihkLCBkZWZhdWx0VGl0bGVGb3JtYXQsIGRlZmF1bHRWYWx1ZUZvcm1hdCwgY29sb3IpIHtcblx0XHRcdFx0bGV0IGh0bWwgPSBgPHRhYmxlIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwfVwiPjx0Ym9keT5gO1xuXG5cdFx0XHRcdGQuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRodG1sICs9IGA8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdChjb25maWcuZGF0YV94KX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8L3RyPmA7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbik6IHt2YWx1ZTogbnVtYmVyLCBwZXJjZW50YWdlOiBudW1iZXJ9IHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Y29uc3QgdG90YWwgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT5cblx0XHRcdGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpLCAwKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcblx0XHRcdGlmIChwb2ludEluUmVnaW9uKGN1cnJlbnRWYWx1ZSwgcmVnaW9uKSkge1xuXHRcdFx0XHRyZXR1cm4gYWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2Nocyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdHBlcmNlbnRhZ2U6IHZhbHVlICE9PSAwID8gKyh2YWx1ZSAvIHRvdGFsICogMTAwKS50b0ZpeGVkKDEpIDogMFxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XG5cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59KSgpO1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cblxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XG5cbmV4cG9ydCB7XG5cdGFzSGFsZlBpeGVsLFxuXHRicnVzaEVtcHR5LFxuXHRjYWxsRm4sXG5cdGNhcGl0YWxpemUsXG5cdGNlaWwxMCxcblx0Y29udmVydElucHV0VHlwZSxcblx0ZGVlcENsb25lLFxuXHRkaWZmRG9tYWluLFxuXHRlbmRhbGwsXG5cdGVtdWxhdGVFdmVudCxcblx0ZXh0ZW5kLFxuXHRmaW5kSW5kZXgsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc2Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1RhYlZpc2libGUsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHBhcnNlRGF0ZSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG4vKipcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxuICogQHJldHVybnMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xuXHRsZXQgbiA9IDA7XG5cblx0dHJhbnNpdGlvblxuXHRcdC5lYWNoKCgpID0+ICsrbilcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XG59XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxuXHRub2RlOiBkM1NlbGVjdGlvbixcblx0dGV4dDogc3RyaW5nLFxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn1cblxuLyoqXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEJveChcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHt9IFNlbGVjdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fS4kZWwgU2VsZWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge2QzLmJydXNoU2VsZWN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0QnJ1c2hTZWxlY3Rpb24oeyRlbH0pIHtcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XG5cdGxldCBzZWxlY3Rpb247XG5cblx0Ly8gY2hlY2sgZnJvbSBldmVudFxuXHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufVxuXG4vKipcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXG4gKiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ1JlY3Qobm9kZSk6IHtcblx0bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxufSB7XG5cdGNvbnN0IG5lZWRFdmFsdWF0ZSA9ICEoXCJyZWN0XCIgaW4gbm9kZSkgfHwgKFxuXHRcdFwicmVjdFwiIGluIG5vZGUgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoXCJ3aWR0aFwiKSAmJiBub2RlLnJlY3Qud2lkdGggIT09ICtub2RlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpXG5cdCk7XG5cblx0cmV0dXJuIG5lZWRFdmFsdWF0ZSA/XG5cdFx0KG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpIDogbm9kZS5yZWN0O1xufVxuXG4vKipcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzU3RyIENvbnZlcnQgcmV0dXJuZWQgdmFsdWUgYXMgc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcblxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xufVxuXG4vKipcbiAqIEZpbmQgaW5kZXggYmFzZWQgb24gYmluYXJ5IHNlYXJjaFxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IFRhcmdldCBudW1iZXIgdG8gZmluZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IGluZGV4IG9mIGRhdGEgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIGluZGV4IG9mIGRhdGEgYXJyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm90YXRlZCBXZWF0aGVyIGlzIHJvdGVkIGF4aXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEluZGV4IG51bWJlclxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCB2OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpc1JvdGF0ZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuXHRpZiAoc3RhcnQgPiBlbmQpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRjb25zdCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcblx0bGV0IHt4LCB3ID0gMH0gPSBhcnJbbWlkXTtcblxuXHRpZiAoaXNSb3RhdGVkKSB7XG5cdFx0eCA9IGFyclttaWRdLnk7XG5cdFx0dyA9IGFyclttaWRdLmg7XG5cdH1cblxuXHRpZiAodiA+PSB4ICYmIHYgPD0geCArIHcpIHtcblx0XHRyZXR1cm4gbWlkO1xuXHR9XG5cblx0cmV0dXJuIHYgPCB4ID9cblx0XHRmaW5kSW5kZXgoYXJyLCB2LCBzdGFydCwgbWlkIC0gMSwgaXNSb3RhdGVkKSA6XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgbWlkICsgMSwgZW5kLCBpc1JvdGF0ZWQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogRGVlcCBjb3B5IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcblx0Y29uc3QgY2xvbmUgPSB2ID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHY7XG5cdH07XG5cblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXG5cdFx0LnJlZHVjZSgoYSwgYykgPT4gKFxuXHRcdFx0ey4uLmEsIC4uLmN9XG5cdFx0KSk7XG59XG5cbi8qKlxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R8QXJyYXl9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XG5cdH1cblxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn1cblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn1cblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge0RhdGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xuXHRsZXQgcGFyc2VkRGF0ZTtcblxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xuXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xuXHR9XG5cblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XG5cdH1cblxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcblxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XG5cdH1cblxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xuXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==