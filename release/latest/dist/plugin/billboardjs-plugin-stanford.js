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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsImdldE1pbk1heCIsInJlcyIsInN0YXJ0IiwiZW5kIiwic3RlcCIsInB1c2giLCJlbXVsYXRlRXZlbnQiLCJtb3VzZSIsImdldFBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsIk1vdXNlRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsInBhcmFtcyIsImRpc3BhdGNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImhpZGRlbiIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImhhc1RvdWNoUG9pbnRzIiwibWF4VG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsIkRvY3VtZW50VG91Y2giLCJoYXNNb3VzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFtRDtBQUNsRixDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7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LEtBQVIseUJBQW9DeUQsSUFBcEMsc0JBR0YsRUFBT0MsVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTSSxZQUFULEdBQWlDO0FBQ2hDLFNBQU8sQ0FBQ2pKLEdBQVEsQ0FBQ2tKLE1BQWpCO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsZ0JBQVQsQ0FBMEJ4QyxLQUExQixFQUEwQ2dCLEtBQTFDLEVBQW9GO0FBQ25GLE1BQUl5QixRQUFRLEtBQVosQ0FEbUYsQ0FHbkY7O0FBQ0EsTUFBSSxPQUFPL0UsSUFBUCxDQUFZMUUsR0FBTSxDQUFDMEosU0FBUCxDQUFpQkMsU0FBN0IsS0FBMkMzQixLQUEvQyxFQUFzRDtBQUNyRDtBQURxRCxRQUUvQzRCLGNBQWMsR0FBRzVKLEdBQU0sQ0FBQzBKLFNBQVAsSUFBb0Isb0JBQW9CMUosR0FBTSxDQUFDMEosU0FBL0MsSUFBNEQxSixHQUFNLENBQUMwSixTQUFQLENBQWlCRyxjQUFqQixHQUFrQyxDQUZoRTtBQUFBLFFBTS9DQyxRQUFRLEdBQUksaUJBQWlCOUosR0FBakIsSUFBNEJBLEdBQU0sQ0FBQytKLGFBQVAsSUFBd0IxSixHQUFRLFlBQVlMLEdBQU0sQ0FBQytKLGFBTjVDLEVBSXJEO0FBQ0E7O0FBR0FOLFlBQVEsR0FBR0csY0FBYyxJQUFJRSxRQVJ3QjtBQVNyRDs7QUFFRCxNQUFNRSxRQUFRLEtBQUcsQ0FBQWhELEtBQUssSUFBS3lDLFFBQWIsS0FBeUIsaUJBQWlCekosR0FBeEQ7QUFFQSxTQUFRZ0ssUUFBUSxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIHRvIGdlbmVyYXRlIGJpbGxib2FyZC5qcyBwbHVnaW5cclxuICogQGNsYXNzIFBsdWdpblxyXG4gKi9cclxuLyoqXHJcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxyXG4gKiBAbmFtZSB2ZXJzaW9uXHJcbiAqIEBzdGF0aWNcclxuICogQG1lbWJlcm9mIFBsdWdpblxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xyXG5cdHB1YmxpYyAkJDtcclxuXHRwdWJsaWMgb3B0aW9ucztcclxuXHRzdGF0aWMgdmVyc2lvbiA9IFwiMi4wLjBcIjtcclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRiZWZvcmVJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRpbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGFmdGVySW5pdCgpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCRyZWRyYXcoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdCR3aWxsRGVzdHJveSgpIHtcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0dGhpc1trZXldID0gbnVsbDtcclxuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGFyYzogXCJiYi1hcmNcIixcclxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcclxuXHRhcmNzOiBcImJiLWFyY3NcIixcclxuXHRhcmVhOiBcImJiLWFyZWFcIixcclxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxyXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxyXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxyXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXHJcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXHJcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcclxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXHJcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcclxuXHRiYXI6IFwiYmItYmFyXCIsXHJcblx0YmFyczogXCJiYi1iYXJzXCIsXHJcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcclxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXHJcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcclxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxyXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxyXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXHJcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcclxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxyXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcclxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcclxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcclxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxyXG5cdGNoYXJ0Q2lyY2xlczogXCJiYi1jaGFydC1jaXJjbGVzXCIsXHJcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcclxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXHJcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxyXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxyXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXHJcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxyXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcclxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcclxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxyXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxyXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcclxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxyXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXHJcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcclxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXHJcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXHJcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcclxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcclxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXHJcblx0Z3JpZDogXCJiYi1ncmlkXCIsXHJcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcclxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXHJcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxyXG5cdGxlZ2VuZEl0ZW06IFwiYmItbGVnZW5kLWl0ZW1cIixcclxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcclxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXHJcblx0bGVnZW5kSXRlbUhpZGRlbjogXCJiYi1sZWdlbmQtaXRlbS1oaWRkZW5cIixcclxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcclxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXHJcblx0bGV2ZWw6IFwiYmItbGV2ZWxcIixcclxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXHJcblx0bGluZTogXCJiYi1saW5lXCIsXHJcblx0bGluZXM6IFwiYmItbGluZXNcIixcclxuXHRtYWluOiBcImJiLW1haW5cIixcclxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXHJcblx0cmVnaW9uczogXCJiYi1yZWdpb25zXCIsXHJcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXHJcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcclxuXHRzaGFwZTogXCJiYi1zaGFwZVwiLFxyXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcclxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXHJcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcclxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXHJcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXHJcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIixcclxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxyXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcclxuXHR0ZXh0OiBcImJiLXRleHRcIixcclxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxyXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXHJcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXHJcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxyXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxyXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXHJcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxyXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXHJcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxyXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcclxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxyXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcclxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxyXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcclxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXHJcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcclxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXHJcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxyXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcclxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgY29uZmlndXJhdGlvbiBvcHRpb25cclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xyXG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcclxuXHRsZXQgdGFyZ2V0O1xyXG5cdGxldCBrZXlzO1xyXG5cdGxldCByZWFkO1xyXG5cclxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xyXG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xyXG5cclxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcclxuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XHJcblx0XHRcdHJldHVybiBmaW5kKCk7XHJcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH07XHJcblxyXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdHRhcmdldCA9IGNvbmZpZztcclxuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xyXG5cdFx0cmVhZCA9IGZpbmQoKTtcclxuXHJcblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XHJcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX187IiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXHJcbiAqIEBjbGFzcyBTdGFuZm9yZE9wdGlvbnNcclxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXHJcbiAqIEBhdWdtZW50cyBQbHVnaW5cclxuICogQHJldHVybnMge1N0YW5mb3JkT3B0aW9uc31cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNldCB0aGUgY29sb3Igb2YgdGhlIGNvbG9yIHNjYWxlLiBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBhbmQgc2hvdWxkIHJldHVybiBhIGNvbG9yLlxyXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxyXG5cdFx0XHQgKiBAdHlwZSB7RnVuY3Rpb259XHJcblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxyXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXHJcblx0XHRcdCAqICAgKVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXHJcblx0XHRcdCAqIEBuYW1lIGVwb2Noc1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdFx0ICogQGRlZmF1bHQgW11cclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cclxuXHRcdFx0ICovXHJcblx0XHRcdGVwb2NoczogPG51bWJlcltdPiBbXSxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgbGluZXMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxyXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcclxuXHRcdFx0ICpcclxuXHRcdFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxyXG5cdFx0XHQgKiB8IC0tLSB8IC0tLSB8IC0tLSB8XHJcblx0XHRcdCAqIHwgeDEgfCBOdW1iZXIgfCBTdGFydGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzIHxcclxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxyXG5cdFx0XHQgKiB8IHgyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgIHxcclxuXHRcdFx0ICogfCB5MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeSBheGlzIHxcclxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxyXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcclxuXHRcdFx0ICogQGRlZmF1bHQgW11cclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogICBsaW5lczogW1xyXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcclxuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XHJcblx0XHRcdCAqICAgXVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0bGluZXM6IFtdLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNldCBzY2FsZSB2YWx1ZXNcclxuXHRcdFx0ICogQG5hbWUgc2NhbGVcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxyXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxyXG5cdFx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gW3NjYWxlXSBzY2FsZSBvYmplY3RcclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5taW49dW5kZWZpbmVkXSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogbG93ZXN0IHZhbHVlIGluIGVwb2Noc1xyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLndpZHRoPTIwXSBXaWR0aCBvZiB0aGUgY29sb3Igc2NhbGVcclxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd8RnVuY3Rpb259IFtzY2FsZS5mb3JtYXQ9dW5kZWZpbmVkXSBGb3JtYXQgb2YgdGhlIGF4aXMgb2YgdGhlIGNvbG9yIHNjYWxlLiBVc2UgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwIG9yIGEgY3VzdG9tIGZ1bmN0aW9uLiBFeGFtcGxlOiBkMy5mb3JtYXQoXCJkXCIpXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqICBzY2FsZToge1xyXG5cdFx0XHQgKiAgICBtYXg6IDEwMDAwLFxyXG5cdFx0XHQgKiAgICBtaW46IDEsXHJcblx0XHRcdCAqICAgIHdpZHRoOiA1MDAsXHJcblx0XHRcdCAqXHJcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXHJcblx0XHRcdCAqICAgIGZvcm1hdDogXCJwb3cxMFwiLFxyXG5cdFx0XHQgKlxyXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXHJcblx0XHRcdCAqICAgIGZvcm1hdDogZnVuY3Rpb24oeCkge1xyXG5cdFx0XHQgKiAgICBcdHJldHVybiB4ICtcIiVcIjtcclxuXHRcdFx0ICogICAgfVxyXG5cdFx0XHQgKiAgfSxcclxuXHRcdFx0ICovXHJcblx0XHRcdHNjYWxlX21pbjogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcclxuXHRcdFx0c2NhbGVfbWF4OiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxyXG5cdFx0XHRzY2FsZV93aWR0aDogPG51bWJlcnx1bmRlZmluZWQ+IDIwLFxyXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogVGhlIHBhZGRpbmcgZm9yIGNvbG9yIHNjYWxlIGVsZW1lbnRcclxuXHRcdFx0ICogQG5hbWUgcGFkZGluZ1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbcGFkZGluZ10gcGFkZGluZyBvYmplY3RcclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnRvcD0wXSBUb3AgcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnJpZ2h0PTBdIFJpZ2h0IHBhZGRpbmcgdmFsdWUuXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5ib3R0b209MF0gQm90dG9tIHBhZGRpbmcgdmFsdWUuXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5sZWZ0PTBdIExlZnQgcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogIHBhZGRpbmc6IHtcclxuXHRcdFx0ICogICAgIHRvcDogMTUsXHJcblx0XHRcdCAqICAgICByaWdodDogMCxcclxuXHRcdFx0ICogICAgIGJvdHRvbTogMCxcclxuXHRcdFx0ICogICAgIGxlZnQ6IDBcclxuXHRcdFx0ICogIH0sXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRwYWRkaW5nX3RvcDogMCxcclxuXHRcdFx0cGFkZGluZ19yaWdodDogMCxcclxuXHRcdFx0cGFkZGluZ19ib3R0b206IDAsXHJcblx0XHRcdHBhZGRpbmdfbGVmdDogMCxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgcmVnaW9ucyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXHJcblx0XHRcdCAqIC0gRWFjaCByZWdpb24gb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XHJcblx0XHRcdCAqXHJcblx0XHRcdCAqICAgfCBLZXkgfCBUeXBlIHwgRGVmYXVsdCB8IEF0dHJpYnV0ZXMgfCBEZXNjcmlwdGlvbiB8XHJcblx0XHRcdCAqICAgfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfFxyXG5cdFx0XHQgKiAgIHwgcG9pbnRzIHwgQXJyYXkgfCAgfCB8IEFjY2VwdHMgYSBncm91cCBvZiBvYmplY3RzIHRoYXQgaGFzIHggYW5kIHkuPGJyPlRoZXNlIHBvaW50cyBzaG91bGQgYmUgYWRkZWQgaW4gYSBjb3VudGVyLWNsb2Nrd2lzZSBmYXNoaW9uIHRvIG1ha2UgYSBjbG9zZWQgcG9seWdvbi4gfFxyXG5cdFx0XHQgKiAgIHwgb3BhY2l0eSB8IE51bWJlciB8IGAwLjJgIHwgJmx0O29wdGlvbmFsPiB8IFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIHJlZ2lvbiBhcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgfFxyXG5cdFx0XHQgKiAgIHwgdGV4dCB8IEZ1bmN0aW9uIHwgIHwgJmx0O29wdGlvbmFsPiB8IFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBhbmQgcGVyY2VudGFnZSBvZiB0aGUgbnVtYmVyIG9mIGVwb2NocyBpbiB0aGlzIHJlZ2lvbi48YnI+UmV0dXJuIGEgc3RyaW5nIHRvIHBsYWNlIHRleHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcmVnaW9uLiB8XHJcblx0XHRcdCAqICAgfCBjbGFzcyB8IFN0cmluZyB8IHwgJmx0O29wdGlvbmFsPiB8IFNlIGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIHJlZ2lvbiwgdXNlIHRoZSBmaWxsIHByb3BlcnR5IGluIGNzcyB0byBzZXQgYSBiYWNrZ3JvdW5kIGNvbG9yLiB8XHJcblx0XHRcdCAqIEBuYW1lIHJlZ2lvbnNcclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxyXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XHJcblx0XHRcdCAqIEBkZWZhdWx0IFtdXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqICAgcmVnaW9uczogW1xyXG5cdFx0XHQgKiAgICAgICB7XHJcblx0XHRcdCAqICAgICAgICAgICBwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxyXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogMCB9LFxyXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogNDAsIHk6IDQwIH0sXHJcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiA0MCB9LFxyXG5cdFx0XHQgKiAgICAgICAgICAgXSxcclxuXHRcdFx0ICogICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xyXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xyXG5cdFx0XHQgKiAgICAgICAgICAgfSxcclxuXHRcdFx0ICogICAgICAgICAgIG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXHJcblx0XHRcdCAqICAgICAgICAgICBjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcclxuXHRcdFx0ICogICAgICAgfSxcclxuXHRcdFx0ICogICAgICAgLi4uXHJcblx0XHRcdCAqICAgXVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0cmVnaW9uczogW11cclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXHJcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxyXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXHJcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxyXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxyXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCJcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcblxyXG5pbXBvcnQge2dldFJhbmdlLCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgcGFyc2VEYXRlfSBmcm9tIFwiLi4vLi4vbW9kdWxlL3V0aWxcIjtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBwb2ludCBpcyBpbiByZWdpb25cclxuICogQHBhcmFtIHtvYmplY3R9IHBvaW50IFBvaW50XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ2lvbiBSZWdpb25cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBwb2ludEluUmVnaW9uKHBvaW50LCByZWdpb24pOiBib29sZWFuIHsgLy8gdGhhbmtzIHRvOiBodHRwOi8vYmwub2Nrcy5vcmcvYnljb2ZmZS81NTc1OTA0XHJcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXHJcblx0Ly8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxyXG5cdGNvbnN0IHggPSBwb2ludC54O1xyXG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcclxuXHRsZXQgaW5zaWRlID0gZmFsc2U7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XHJcblx0XHRjb25zdCB4aSA9IHJlZ2lvbltpXS54O1xyXG5cdFx0Y29uc3QgeWkgPSByZWdpb25baV0ueTtcclxuXHJcblx0XHRjb25zdCB4aiA9IHJlZ2lvbltqXS54O1xyXG5cdFx0Y29uc3QgeWogPSByZWdpb25bal0ueTtcclxuXHJcblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xyXG5cclxuXHRcdGlmIChpbnRlcnNlY3QpIHtcclxuXHRcdFx0aW5zaWRlID0gIWluc2lkZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBpbnNpZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlIGVwb2Noc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gYSBUYXJnZXRcclxuICogQHBhcmFtIHtvYmplY3R9IGIgU291cmNlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlRXBvY2hzKGEsIGIpOiBudW1iZXIge1xyXG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fVxyXG5cclxuXHRpZiAoYS5lcG9jaHMgPiBiLmVwb2Nocykge1xyXG5cdFx0cmV0dXJuIDE7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCByZWdpb24gYXJlYVxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgUG9pbnRzXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cyk6IG51bWJlciB7IC8vIHRoYW5rcyB0bzogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYyODIzMzAvZmluZC1jZW50ZXJwb2ludC1vZi1wb2x5Z29uLWluLWphdmFzY3JpcHRcclxuXHRsZXQgYXJlYSA9IDA7XHJcblx0bGV0IHBvaW50MTtcclxuXHRsZXQgcG9pbnQyO1xyXG5cclxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcclxuXHRcdHBvaW50MSA9IHBvaW50c1tpXTtcclxuXHRcdHBvaW50MiA9IHBvaW50c1tqXTtcclxuXHRcdGFyZWEgKz0gcG9pbnQxLnggKiBwb2ludDIueTtcclxuXHRcdGFyZWEgLT0gcG9pbnQxLnkgKiBwb2ludDIueDtcclxuXHR9XHJcblxyXG5cdGFyZWEgLz0gMjtcclxuXHJcblx0cmV0dXJuIGFyZWE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgY2VudHJvaWRcclxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q2VudHJvaWQocG9pbnRzKSB7XHJcblx0Y29uc3QgYXJlYSA9IGdldFJlZ2lvbkFyZWEocG9pbnRzKTtcclxuXHJcblx0bGV0IHggPSAwO1xyXG5cdGxldCB5ID0gMDtcclxuXHRsZXQgZjtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XHJcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XHJcblx0XHRjb25zdCBwb2ludDIgPSBwb2ludHNbal07XHJcblxyXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xyXG5cdFx0eCArPSAocG9pbnQxLnggKyBwb2ludDIueCkgKiBmO1xyXG5cdFx0eSArPSAocG9pbnQxLnkgKyBwb2ludDIueSkgKiBmO1xyXG5cdH1cclxuXHJcblx0ZiA9IGFyZWEgKiA2O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0eDogeCAvIGYsXHJcblx0XHR5OiB5IC8gZlxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcblx0Y29tcGFyZUVwb2NocyxcclxuXHRnZXRDZW50cm9pZCxcclxuXHRnZXRSYW5nZSxcclxuXHRnZXRSZWdpb25BcmVhLFxyXG5cdGlzRW1wdHksXHJcblx0aXNGdW5jdGlvbixcclxuXHRpc1N0cmluZyxcclxuXHRwYXJzZURhdGUsXHJcblx0cG9pbnRJblJlZ2lvblxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8vIEB0cy1ub2NoZWNrXHJcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XHJcbmltcG9ydCB7Z2V0Q2VudHJvaWQsIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbi8qKlxyXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXHJcbiAqIEBjbGFzcyBDb2xvclNjYWxlXHJcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyB7XHJcblx0cHJpdmF0ZSBvd25lcjtcclxuXHJcblx0Y29uc3RydWN0b3Iob3duZXIpIHtcclxuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcclxuXHJcblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3RcclxuXHRcdGNvbnN0IGVsZW1lbnRzID0gb3duZXIuJCQuJGVsLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXHJcblx0XHRcdC5hcHBlbmQoXCJnXCIpXHJcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRFbGVtZW50cyk7XHJcblxyXG5cdFx0ZWxlbWVudHMuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRMaW5lcyk7XHJcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZFJlZ2lvbnMpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcclxuXHRcdGNvbnN0IHtjb25maWcsICRlbDoge21haW59fSA9ICQkO1xyXG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcclxuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcclxuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcclxuXHJcblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLnN0YW5mb3JkTGluZXN9YClcclxuXHRcdFx0LnN0eWxlKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiZ2VvbWV0cmljcHJlY2lzaW9uXCIpXHJcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxyXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5saW5lcyk7XHJcblxyXG5cdFx0Ly8gZXhpdFxyXG5cdFx0c3RhbmZvcmRMaW5lLmV4aXQoKS50cmFuc2l0aW9uKClcclxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxyXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxyXG5cdFx0XHQucmVtb3ZlKCk7XHJcblxyXG5cdFx0Ly8gZW50ZXJcclxuXHRcdGNvbnN0IHN0YW5mb3JkTGluZUVudGVyID0gc3RhbmZvcmRMaW5lLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcclxuXHJcblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkTGluZUVudGVyXHJcblx0XHRcdC5tZXJnZShzdGFuZm9yZExpbmUpXHJcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZExpbmUgKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcclxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxyXG5cdFx0XHQuYXR0cihcIngyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTJcIikgOiB4dkN1c3RvbShkLCBcIngyXCIpKSlcclxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngxXCIpIDogeXZDdXN0b20oZCwgXCJ5MVwiKSkpXHJcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxyXG5cdFx0XHQudHJhbnNpdGlvbigpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XHJcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xyXG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cdFx0Y29uc3QgY291bnRQb2ludHNJblJlZ2lvbiA9IHRoaXMub3duZXIuY291bnRFcG9jaHNJblJlZ2lvbi5iaW5kKCQkKTtcclxuXHJcblx0XHQvLyBTdGFuZm9yZC1SZWdpb25zXHJcblx0XHRsZXQgc3RhbmZvcmRSZWdpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb25zfWApXHJcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXHJcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLnJlZ2lvbnMpO1xyXG5cclxuXHRcdC8vIGV4aXRcclxuXHRcdHN0YW5mb3JkUmVnaW9uLmV4aXQoKS50cmFuc2l0aW9uKClcclxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxyXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxyXG5cdFx0XHQucmVtb3ZlKCk7XHJcblxyXG5cdFx0Ly8gZW50ZXJcclxuXHRcdGNvbnN0IHN0YW5mb3JkUmVnaW9uRW50ZXIgPSBzdGFuZm9yZFJlZ2lvbi5lbnRlcigpLmFwcGVuZChcImdcIik7XHJcblxyXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxyXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBpc1JvdGF0ZWQgPyBcInJvdGF0ZSgtOTApXCIgOiBcIlwiKVxyXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcclxuXHJcblx0XHRzdGFuZm9yZFJlZ2lvbiA9IHN0YW5mb3JkUmVnaW9uRW50ZXIubWVyZ2Uoc3RhbmZvcmRSZWdpb24pO1xyXG5cclxuXHRcdC8vIHVwZGF0ZVxyXG5cdFx0c3RhbmZvcmRSZWdpb25cclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkUmVnaW9uICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXHJcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxyXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXHJcblx0XHRcdFx0aXNSb3RhdGVkID8geXZDdXN0b20odmFsdWUsIFwieVwiKSA6IHh2Q3VzdG9tKHZhbHVlLCBcInhcIiksXHJcblx0XHRcdFx0aXNSb3RhdGVkID8geHZDdXN0b20odmFsdWUsIFwieFwiKSA6IHl2Q3VzdG9tKHZhbHVlLCBcInlcIilcclxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBkID0+IFN0cmluZyhkLm9wYWNpdHkgPyBkLm9wYWNpdHkgOiAwLjIpKTtcclxuXHJcblx0XHRzdGFuZm9yZFJlZ2lvbi5zZWxlY3QoXCJ0ZXh0XCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxyXG5cdFx0XHQuYXR0cihcInhcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikgOiB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSkpXHJcblx0XHRcdC5hdHRyKFwieVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSA6IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpKSlcclxuXHRcdFx0LnRleHQoZCA9PiB7XHJcblx0XHRcdFx0aWYgKGQudGV4dCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qge3ZhbHVlLCBwZXJjZW50YWdlfSA9IGNvdW50UG9pbnRzSW5SZWdpb24oZC5wb2ludHMpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBkLnRleHQodmFsdWUsIHBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIFwiXCI7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcclxuXHRcdFx0LmF0dHIoXCJkb21pbmFudC1iYXNlbGluZVwiLCBcIm1pZGRsZVwiKVxyXG5cdFx0XHQudHJhbnNpdGlvbigpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApOiB2b2lkIHtcclxuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbik7XHJcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbik7XHJcblx0fVxyXG5cclxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHtheGlzLCBjb25maWd9ID0gJCQ7XHJcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcclxuXHJcblx0XHRpZiAoYXhpcy5pc1RpbWVTZXJpZXMoKSkge1xyXG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XHJcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHR2YWx1ZSA9IGNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQuc2NhbGUueCh2YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0eXZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCAkJCA9IHRoaXM7XHJcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC5zY2FsZS55MiA6ICQkLnNjYWxlLnk7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuaW1wb3J0IHtheGlzUmlnaHQgYXMgZDNBeGlzUmlnaHR9IGZyb20gXCJkMy1heGlzXCI7XHJcbmltcG9ydCB7Zm9ybWF0IGFzIGQzRm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XHJcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsIGFzIGQzU2NhbGVTZXF1ZW50aWFsLCBzY2FsZUxvZyBhcyBkM1NjYWxlTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IHtpc0Z1bmN0aW9uLCBnZXRSYW5nZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXHJcbiAqIEBjbGFzcyBDb2xvclNjYWxlXHJcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclNjYWxlIHtcclxuXHRwcml2YXRlIG93bmVyO1xyXG5cdHByaXZhdGUgY29sb3JTY2FsZTtcclxuXHJcblx0Y29uc3RydWN0b3Iob3duZXIpIHtcclxuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcclxuXHR9XHJcblxyXG5cdGRyYXdDb2xvclNjYWxlKCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyQkLCBjb25maWd9ID0gdGhpcy5vd25lcjtcclxuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcclxuXHRcdGNvbnN0IGhlaWdodCA9ICQkLnN0YXRlLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nX2JvdHRvbSAtIGNvbmZpZy5wYWRkaW5nX3RvcDtcclxuXHRcdGNvbnN0IGJhcldpZHRoID0gY29uZmlnLnNjYWxlX3dpZHRoO1xyXG5cdFx0Y29uc3QgYmFySGVpZ2h0ID0gNTtcclxuXHRcdGNvbnN0IHBvaW50cyA9IGdldFJhbmdlKGNvbmZpZy5wYWRkaW5nX2JvdHRvbSwgaGVpZ2h0LCBiYXJIZWlnaHQpO1xyXG5cclxuXHRcdGNvbnN0IGludmVyc2VTY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsKHRhcmdldC5jb2xvcnMpXHJcblx0XHRcdC5kb21haW4oW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIHBvaW50c1swXV0pO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbG9yU2NhbGUpIHtcclxuXHRcdFx0dGhpcy5jb2xvclNjYWxlLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29sb3JTY2FsZSA9ICQkLiRlbC5zdmcuYXBwZW5kKFwiZ1wiKVxyXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIDUwKVxyXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXHJcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1MuY29sb3JTY2FsZSk7XHJcblxyXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcclxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke2NvbmZpZy5wYWRkaW5nX3RvcH0pYClcclxuXHRcdFx0LnNlbGVjdEFsbChcImJhcnNcIilcclxuXHRcdFx0LmRhdGEocG9pbnRzKVxyXG5cdFx0XHQuZW50ZXIoKVxyXG5cdFx0XHQuYXBwZW5kKFwicmVjdFwiKVxyXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXHJcblx0XHRcdC5hdHRyKFwieFwiLCAwKVxyXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIGJhcldpZHRoKVxyXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXHJcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCBkID0+IGludmVyc2VTY2FsZShkKSk7XHJcblxyXG5cdFx0Ly8gTGVnZW5kIEF4aXNcclxuXHRcdGNvbnN0IGF4aXNTY2FsZSA9IGQzU2NhbGVMb2coKVxyXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSlcclxuXHRcdFx0LnJhbmdlKFtcclxuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3AgKyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICsgYmFySGVpZ2h0IC0gMSxcclxuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3BcclxuXHRcdFx0XSk7XHJcblxyXG5cdFx0Y29uc3QgbGVnZW5kQXhpcyA9IGQzQXhpc1JpZ2h0KGF4aXNTY2FsZSk7XHJcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XHJcblxyXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcclxuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xyXG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNjYWxlRm9ybWF0KSkge1xyXG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoc2NhbGVGb3JtYXQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KGQzRm9ybWF0KFwiZFwiKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRHJhdyBBeGlzXHJcblx0XHRjb25zdCBheGlzID0gdGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXHJcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHtiYXJXaWR0aH0sMClgKVxyXG5cdFx0XHQuY2FsbChsZWdlbmRBeGlzKTtcclxuXHJcblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xyXG5cdFx0XHRheGlzLnNlbGVjdEFsbChcIi50aWNrIHRleHRcIilcclxuXHRcdFx0XHQudGV4dChudWxsKVxyXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiBkIC8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCAtIDFlLTEyKSkgPT09IDEpIC8vIFBvd2VyIG9mIFRlblxyXG5cdFx0XHRcdC50ZXh0KDEwKVxyXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxyXG5cdFx0XHRcdC5hdHRyKFwiZHlcIiwgXCItLjdlbVwiKSAvLyBodHRwczovL2JsLm9ja3Mub3JnL21ib3N0b2NrLzY3MzgyMjlcclxuXHRcdFx0XHQudGV4dChkID0+IE1hdGgucm91bmQoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTApKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbG9yU2NhbGUuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7JCQuc3RhdGUuY3VycmVudC53aWR0aCAtIHRoaXMueEZvckNvbG9yU2NhbGUoKX0sIDApYCk7XHJcblx0fVxyXG5cclxuXHR4Rm9yQ29sb3JTY2FsZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xyXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUubm9kZSgpLmdldEJCb3goKS53aWR0aDtcclxuXHR9XHJcblxyXG5cdGdldENvbG9yU2NhbGVQYWRkaW5nKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy54Rm9yQ29sb3JTY2FsZSgpICsgdGhpcy5vd25lci5jb25maWcucGFkZGluZ19sZWZ0ICsgMjA7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLy8gQHRzLW5vY2hlY2tcclxuaW1wb3J0IHtpbnRlcnBvbGF0ZUhzbExvbmcgYXMgZDNJbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xyXG5pbXBvcnQge2hzbCBhcyBkM0hzbH0gZnJvbSBcImQzLWNvbG9yXCI7XHJcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuLi8uLi9jb25maWcvY2xhc3Nlc1wiO1xyXG5pbXBvcnQge2xvYWRDb25maWd9IGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XHJcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xyXG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XHJcbmltcG9ydCBFbGVtZW50cyBmcm9tIFwiLi9FbGVtZW50c1wiO1xyXG5pbXBvcnQgQ29sb3JTY2FsZSBmcm9tIFwiLi9Db2xvclNjYWxlXCI7XHJcbmltcG9ydCB7Y29tcGFyZUVwb2NocywgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZSwgcG9pbnRJblJlZ2lvbn0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXHJcbiAqIC0gKipOT1RFOioqXHJcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cclxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXHJcbiAqICAgLSBJcyBwcmVmZXJhYmxlIHVzZSBgc2NhdHRlcmAgYXMgZGF0YS50eXBlXHJcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXHJcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxyXG4gKiAgIC0gW2QzLWludGVycG9sYXRlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtaW50ZXJwb2xhdGUpXHJcbiAqICAgLSBbZDMtY29sb3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1jb2xvcilcclxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxyXG4gKiAgIC0gW2QzLWJydXNoXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYnJ1c2gpXHJcbiAqICAgLSBbZDMtYXhpc10oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWF4aXMpXHJcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxyXG4gKiBAY2xhc3MgcGx1Z2luLXN0YW5mb3JkXHJcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cclxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXHJcbiAqIEByZXF1aXJlcyBkMy1jb2xvclxyXG4gKiBAcmVxdWlyZXMgZDMtc2NhbGVcclxuICogQHJlcXVpcmVzIGQzLWJydXNoXHJcbiAqIEByZXF1aXJlcyBkMy1heGlzXHJcbiAqIEByZXF1aXJlcyBkMy1mb3JtYXRcclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7U3RhbmZvcmR9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFBsdWdpbiBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgdGhlIHVzZS5cclxuICogPHNjcmlwdCBzcmM9XCIkWU9VUl9QQVRIL3BsdWdpbi9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanNcIj48L3NjcmlwdD5cclxuICpcclxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcclxuICogICAgIGRhdGE6IHtcclxuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXHJcbiAqICAgICAgICB0eXBlOiBcInNjYXR0ZXJcIlxyXG4gKiAgICAgfVxyXG4gKiAgICAgLi4uXHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcclxuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxyXG4gKiAgICAgICAgICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcclxuICogICAgICAgICAgICksXHJcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXHJcbiAqICAgICAgICAgICBsaW5lczogW1xyXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxyXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxyXG4gKiAgICAgICAgICAgXSxcclxuICogICAgICAgICAgIHNjYWxlOiB7XHJcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXHJcbiAqICAgICAgICAgICAgIFx0bWluOiAxLFxyXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxyXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcclxuICogICAgICAgICAgIH0sXHJcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XHJcbiAqICAgICAgICAgICBcdHRvcDogMTUsXHJcbiAqICAgICAgICAgICBcdHJpZ2h0OiAwLFxyXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXHJcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcclxuICogICAgICAgICAgIH0sXHJcbiAqICAgICAgICAgICByZWdpb25zOiBbXHJcbiAqICAgICAgICAgICBcdHtcclxuICogICAgICAgICAgICAgICBcdHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXHJcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXHJcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcclxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDQwIH1cclxuICogICAgICAgICAgICAgICBcdF0sXHJcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcclxuICogICAgICAgICAgICAgICBcdCAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcclxuICogICAgICAgICAgICAgICBcdH0sXHJcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxyXG4gKiAgICAgICAgICAgICAgIFx0Y2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXHJcbiAqICAgICAgICAgICAgICB9LFxyXG4gKiAgICAgICAgICAgICBcdC4uLlxyXG4gKiAgICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgXVxyXG4gKiAgfSk7XHJcbiAqIEBleGFtcGxlXHJcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XHJcbiAqIGltcG9ydCBTdGFuZm9yZCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmVzbVwiO1xyXG4gKlxyXG4gKiBiYi5nZW5lcmF0ZSh7XHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcclxuICogICAgIF1cclxuICogfSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5mb3JkIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRwcml2YXRlIGNvbmZpZztcclxuXHRwcml2YXRlIGNvbG9yU2NhbGU7XHJcblx0cHJpdmF0ZSBlbGVtZW50cztcclxuXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xyXG5cdFx0c3VwZXIob3B0aW9ucyk7XHJcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQkYmVmb3JlSW5pdCgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xyXG5cclxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXHJcblx0XHQkJC5jb25maWcuZGF0YV94U29ydCA9IGZhbHNlO1xyXG5cdFx0JCQuaXNNdWx0aXBsZVggPSAoKSA9PiB0cnVlO1xyXG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xyXG5cdFx0JCQubGFiZWxpc2hEYXRhID0gZCA9PiBkLnZhbHVlcztcclxuXHRcdCQkLm9wYWNpdHlGb3JDaXJjbGUgPSAoKSA9PiAxO1xyXG5cclxuXHRcdGNvbnN0IGdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0LmJpbmQoJCQpO1xyXG5cclxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXHJcblx0XHRcdGdldEN1cnJlbnRQYWRkaW5nUmlnaHQoKSArIChcclxuXHRcdFx0XHR0aGlzLmNvbG9yU2NhbGUgPyB0aGlzLmNvbG9yU2NhbGUuZ2V0Q29sb3JTY2FsZVBhZGRpbmcoKSA6IDBcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdCRpbml0KCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XHJcblxyXG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XHJcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xyXG5cclxuXHRcdHRoaXMuY29sb3JTY2FsZSA9IG5ldyBDb2xvclNjYWxlKHRoaXMpO1xyXG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcclxuXHJcblx0XHR0aGlzLmNvbnZlcnREYXRhKCk7XHJcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcclxuXHRcdHRoaXMuc2V0U3RhbmZvcmRUb29sdGlwKCk7XHJcblx0XHR0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcclxuXHJcblx0XHR0aGlzLiRyZWRyYXcoKTtcclxuXHR9XHJcblxyXG5cdCRyZWRyYXcoZHVyYXRpb24/OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdHRoaXMuY29sb3JTY2FsZSAmJiB0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcclxuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcclxuXHR9XHJcblxyXG5cclxuXHRnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xyXG5cdFx0cmV0dXJuIG5ldyBPcHRpb25zKCk7XHJcblx0fVxyXG5cclxuXHRjb252ZXJ0RGF0YSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiQkLmRhdGEudGFyZ2V0cztcclxuXHRcdGNvbnN0IGVwb2NocyA9IHRoaXMub3B0aW9ucy5lcG9jaHM7XHJcblxyXG5cdFx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xyXG5cdFx0XHRkLnZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcblx0XHRcdFx0di5lcG9jaHMgPSBlcG9jaHNbaV07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZC5taW5FcG9jaHMgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGQubWF4RXBvY2hzID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRkLmNvbG9ycyA9IHVuZGVmaW5lZDtcclxuXHRcdFx0ZC5jb2xvcnNjYWxlID0gdW5kZWZpbmVkO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHtheGlzLCBjb25maWd9ID0gJCQ7XHJcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcclxuXHJcblx0XHRpZiAoYXhpcy5pc1RpbWVTZXJpZXMoKSkge1xyXG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XHJcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xyXG5cdFx0XHR2YWx1ZSA9IGNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQuc2NhbGUueCh2YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0eXZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCAkJCA9IHRoaXM7XHJcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XHJcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyBzY2FsZS55MiA6IHNjYWxlLnk7XHJcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHRpbml0U3RhbmZvcmREYXRhKCk6IHZvaWQge1xyXG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy4kJC5kYXRhLnRhcmdldHNbMF07XHJcblxyXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxyXG5cdFx0Ly8gTWFrZSBsYXJnZXIgdmFsdWVzIGFwcGVhciBvbiB0b3BcclxuXHRcdHRhcmdldC52YWx1ZXMuc29ydChjb21wYXJlRXBvY2hzKTtcclxuXHJcblx0XHQvLyBHZXQgYXJyYXkgb2YgZXBvY2hzXHJcblx0XHRjb25zdCBlcG9jaHMgPSB0YXJnZXQudmFsdWVzLm1hcChhID0+IGEuZXBvY2hzKTtcclxuXHJcblx0XHR0YXJnZXQubWluRXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9taW4pID8gY29uZmlnLnNjYWxlX21pbiA6IE1hdGgubWluKC4uLmVwb2Nocyk7XHJcblx0XHR0YXJnZXQubWF4RXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9tYXgpID8gY29uZmlnLnNjYWxlX21heCA6IE1hdGgubWF4KC4uLmVwb2Nocyk7XHJcblxyXG5cdFx0dGFyZ2V0LmNvbG9ycyA9IGlzRnVuY3Rpb24oY29uZmlnLmNvbG9ycykgP1xyXG5cdFx0XHRjb25maWcuY29sb3JzIDogZDNJbnRlcnBvbGF0ZUhzbExvbmcoZDNIc2woMjUwLCAxLCAwLjUpLCBkM0hzbCgwLCAxLCAwLjUpKTtcclxuXHJcblx0XHR0YXJnZXQuY29sb3JzY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsTG9nKHRhcmdldC5jb2xvcnMpXHJcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKTtcclxuXHR9XHJcblxyXG5cdGdldFN0YW5mb3JkUG9pbnRDb2xvcihkKSB7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcclxuXHJcblx0XHRyZXR1cm4gdGFyZ2V0LmNvbG9yc2NhbGUoZC5lcG9jaHMpO1xyXG5cdH1cclxuXHJcblx0c2V0U3RhbmZvcmRUb29sdGlwKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXMuJCQ7XHJcblxyXG5cdFx0aWYgKGlzRW1wdHkoY29uZmlnLnRvb2x0aXBfY29udGVudHMpKSB7XHJcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XHJcblx0XHRcdFx0bGV0IGh0bWwgPSBgPHRhYmxlIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwfVwiPjx0Ym9keT5gO1xyXG5cclxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XHJcblx0XHRcdFx0XHRodG1sICs9IGA8dHI+XHJcblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KGNvbmZpZy5kYXRhX3gpfTwvdGg+XHJcblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LngpfTwvdGg+XHJcblx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodi5pZCl9PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XHJcblx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdDx0ciBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcE5hbWV9LSR7di5pZH1cIj5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LmVwb2Nocyl9PC90ZD5cclxuXHRcdFx0XHRcdFx0PC90cj5gO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gYCR7aHRtbH08L3Rib2R5PjwvdGFibGU+YDtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvdW50RXBvY2hzSW5SZWdpb24ocmVnaW9uKToge3ZhbHVlOiBudW1iZXIsIHBlcmNlbnRhZ2U6IG51bWJlcn0ge1xyXG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xyXG5cclxuXHRcdGNvbnN0IHRvdGFsID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+XHJcblx0XHRcdGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpLCAwKTtcclxuXHJcblx0XHRjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiB7XHJcblx0XHRcdGlmIChwb2ludEluUmVnaW9uKGN1cnJlbnRWYWx1ZSwgcmVnaW9uKSkge1xyXG5cdFx0XHRcdHJldHVybiBhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yO1xyXG5cdFx0fSwgMCk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dmFsdWUsXHJcblx0XHRcdHBlcmNlbnRhZ2U6IHZhbHVlICE9PSAwID8gKyh2YWx1ZSAvIHRvdGFsICogMTAwKS50b0ZpeGVkKDEpIDogMFxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogV2luZG93IG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXHJcbmV4cG9ydCB7d2luIGFzIHdpbmRvdywgZG9jIGFzIGRvY3VtZW50fTtcclxuXHJcbmNvbnN0IHdpbiA9ICgoKSA9PiB7XHJcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xyXG5cclxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XHJcbn0pKCk7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXHJcblxyXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XHJcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XHJcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xyXG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRhc0hhbGZQaXhlbCxcclxuXHRicnVzaEVtcHR5LFxyXG5cdGNhbGxGbixcclxuXHRjYXBpdGFsaXplLFxyXG5cdGNlaWwxMCxcclxuXHRjb252ZXJ0SW5wdXRUeXBlLFxyXG5cdGRlZXBDbG9uZSxcclxuXHRkaWZmRG9tYWluLFxyXG5cdGVuZGFsbCxcclxuXHRlbXVsYXRlRXZlbnQsXHJcblx0ZXh0ZW5kLFxyXG5cdGdldEJydXNoU2VsZWN0aW9uLFxyXG5cdGdldEJvdW5kaW5nUmVjdCxcclxuXHRnZXRDc3NSdWxlcyxcclxuXHRnZXRNaW5NYXgsXHJcblx0Z2V0T3B0aW9uLFxyXG5cdGdldFBhdGhCb3gsXHJcblx0Z2V0UmFuZG9tLFxyXG5cdGdldFJhbmdlLFxyXG5cdGdldFJlY3RTZWdMaXN0LFxyXG5cdGdldFRyYW5zbGF0aW9uLFxyXG5cdGdldFVuaXF1ZSxcclxuXHRoYXNWYWx1ZSxcclxuXHRpc0FycmF5LFxyXG5cdGlzYm9vbGVhbixcclxuXHRpc0RlZmluZWQsXHJcblx0aXNFbXB0eSxcclxuXHRpc0Z1bmN0aW9uLFxyXG5cdGlzTnVtYmVyLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGlzT2JqZWN0VHlwZSxcclxuXHRpc1N0cmluZyxcclxuXHRpc1RhYlZpc2libGUsXHJcblx0aXNVbmRlZmluZWQsXHJcblx0aXNWYWx1ZSxcclxuXHRtZXJnZUFycmF5LFxyXG5cdG1lcmdlT2JqLFxyXG5cdG5vdEVtcHR5LFxyXG5cdHBhcnNlRGF0ZSxcclxuXHRzYW5pdGlzZSxcclxuXHRzZXRUZXh0VmFsdWUsXHJcblx0c29ydFZhbHVlLFxyXG5cdHRvQXJyYXksXHJcblx0dHBsUHJvY2Vzc1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcclxuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XHJcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XHJcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XHJcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XHJcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xyXG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XHJcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcclxuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcclxuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcclxuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XHJcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXHJcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxyXG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXHJcbik7XHJcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaXMgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxyXG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcclxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xyXG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG5cdGxldCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xyXG5cclxuXHRyZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxyXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XHJcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xyXG5cclxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XHJcblx0cmV0dXJuIGlzRm47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXHJcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXHJcbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblx0bGV0IG4gPSAwO1xyXG5cclxuXHR0cmFuc2l0aW9uXHJcblx0XHQuZWFjaCgoKSA9PiArK24pXHJcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xyXG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cclxuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXHJcbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcclxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxyXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxyXG5cdHRleHQ6IHN0cmluZyxcclxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxyXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcclxuXHRcdG5vZGUudGV4dCh0ZXh0KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XHJcblxyXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcclxuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcclxuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XHJcblxyXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XHJcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcclxuXHJcblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXHJcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcclxuXHRcdFx0XHRcdC50ZXh0KHYpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XHJcblx0LypcclxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXHJcblx0ICogKi9cclxuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcclxuXHJcblx0cmV0dXJuIFtcclxuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxyXG5cdFx0e3gsIHl9LCAvLyBzZWcxXHJcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xyXG5cdF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhdGhCb3goXHJcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XHJcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcclxuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XHJcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XHJcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fSBTZWxlY3Rpb24gb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fS4kZWwgU2VsZWN0aW9uIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xyXG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcclxuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XHJcblx0bGV0IHNlbGVjdGlvbjtcclxuXHJcblx0Ly8gY2hlY2sgZnJvbSBldmVudFxyXG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcclxuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcclxuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXHJcblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xyXG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNlbGVjdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXHJcbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSAobm9kZSk6IHtcclxuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcclxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcclxufSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xyXG5cclxuLyoqXHJcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XHJcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcclxuXHJcblx0aWYgKHNlbGVjdGlvbikge1xyXG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxyXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxyXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxyXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWVwIGNvcHkgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcclxuXHRjb25zdCBjbG9uZSA9IHYgPT4ge1xyXG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcclxuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xyXG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHY7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXHJcblx0XHQucmVkdWNlKChhLCBjKSA9PiAoXHJcblx0XHRcdHsuLi5hLCAuLi5jfVxyXG5cdFx0KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R8QXJyYXl9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XHJcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xyXG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XHJcblx0fVxyXG5cclxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcclxuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XHJcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHRvIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XHJcblxyXG4vKipcclxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XHJcblx0bGV0IHJ1bGVzID0gW107XHJcblxyXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBydWxlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxyXG4gKiBAcGFyYW0ge1NWR0VsZW1lbnR9IG5vZGUgTm9kZSBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcclxuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xyXG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmJhc2VWYWw7XHJcblxyXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XHJcblx0XHRiYXNlVmFsLmdldEl0ZW0oMCkubWF0cml4IDpcclxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBTb3VyY2UgZGF0YVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xyXG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xyXG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXHJcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xyXG5cclxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2UgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XHJcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcclxuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XHJcblxyXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcclxuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xyXG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xyXG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdmFsdWVcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcclxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzb3J0VmFsdWUoZGF0YTogYW55W10sIGlzQXNjID0gdHJ1ZSk6IGFueVtdIHtcclxuXHRsZXQgZm47XHJcblxyXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xyXG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcclxuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XHJcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgbWluL21heCB2YWx1ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcclxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcclxuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XHJcblxyXG5cdGlmIChyZXMubGVuZ3RoKSB7XHJcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xyXG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XHJcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcyA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcmFuZ2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBudW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xyXG5cdGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcclxuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xyXG5cclxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcclxuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8vIGVtdWxhdGUgZXZlbnRcclxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xyXG5cdG1vdXNlOiAoKCkgPT4ge1xyXG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcclxuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXHJcblx0XHR9KTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XHJcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcclxuXHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcclxuXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcclxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxyXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxyXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXHJcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcclxuXHRcdFx0XHRcdHdpbmRvdyxcclxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XHJcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXHJcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXHJcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSkoKSxcclxuXHR0b3VjaDogKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xyXG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxyXG5cdFx0XHR0YXJnZXQ6IGVsLFxyXG5cdFx0XHRyYWRpdXNYOiAyLjUsXHJcblx0XHRcdHJhZGl1c1k6IDIuNSxcclxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXHJcblx0XHRcdGZvcmNlOiAwLjVcclxuXHRcdH0sIHBhcmFtcykpO1xyXG5cclxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XHJcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxyXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxyXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcclxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cclxuXHRcdH0pKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cdGxldCByZXMgPSB0cGw7XHJcblxyXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XHJcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcGFyc2VkIGRhdGUgdmFsdWVcclxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxyXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJucyB7RGF0ZX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgYW55KTogRGF0ZSB7XHJcblx0bGV0IHBhcnNlZERhdGU7XHJcblxyXG5cdGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XHJcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgZm9ybWF0fSA9IHRoaXM7XHJcblxyXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcclxuXHR9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGUpICYmICFpc05hTihkYXRlKSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcclxuXHR9XHJcblxyXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcclxuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgeCAnJHtkYXRlfScgdG8gRGF0ZSBvYmplY3RgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJzZWREYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gIWRvY3VtZW50LmhpZGRlbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcclxuICogQHBhcmFtIHtib29sZWFufSB0b3VjaCBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS50b3VjaFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xyXG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5cclxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxyXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcclxuXHRcdC8vIFNvbWUgRWRnZSBkZXNrdG9wIHJldHVybiB0cnVlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8yMDQxNzA3NC9cclxuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcclxuXHJcblx0XHQvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy90b3VjaGV2ZW50cy5qc1xyXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcclxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcclxuXHJcblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIChoYXNNb3VzZSAmJiBcIm1vdXNlXCIpIHx8IChpc01vYmlsZSAmJiBcInRvdWNoXCIpIHx8IG51bGw7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==