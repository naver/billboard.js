/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.3
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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.3");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsImdldE1pbk1heCIsInJlcyIsInN0YXJ0IiwiZW5kIiwic3RlcCIsInB1c2giLCJlbXVsYXRlRXZlbnQiLCJtb3VzZSIsImdldFBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsIk1vdXNlRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsInBhcmFtcyIsImRpc3BhdGNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImhpZGRlbiIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImhhc1RvdWNoUG9pbnRzIiwibWF4VG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsIkRvY3VtZW50VG91Y2giLCJoYXNNb3VzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFtRDtBQUNsRixDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7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LEtBQVIseUJBQW9DeUQsSUFBcEMsc0JBR0YsRUFBT0MsVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTSSxZQUFULEdBQWlDO0FBQ2hDLFNBQU8sQ0FBQ2pKLEdBQVEsQ0FBQ2tKLE1BQWpCO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsZ0JBQVQsQ0FBMEJ4QyxLQUExQixFQUEwQ2dCLEtBQTFDLEVBQW9GO0FBQ25GLE1BQUl5QixRQUFRLEtBQVosQ0FEbUYsQ0FHbkY7O0FBQ0EsTUFBSSxPQUFPL0UsSUFBUCxDQUFZMUUsR0FBTSxDQUFDMEosU0FBUCxDQUFpQkMsU0FBN0IsS0FBMkMzQixLQUEvQyxFQUFzRDtBQUNyRDtBQURxRCxRQUUvQzRCLGNBQWMsR0FBRzVKLEdBQU0sQ0FBQzBKLFNBQVAsSUFBb0Isb0JBQW9CMUosR0FBTSxDQUFDMEosU0FBL0MsSUFBNEQxSixHQUFNLENBQUMwSixTQUFQLENBQWlCRyxjQUFqQixHQUFrQyxDQUZoRTtBQUFBLFFBTS9DQyxRQUFRLEdBQUksaUJBQWlCOUosR0FBakIsSUFBNEJBLEdBQU0sQ0FBQytKLGFBQVAsSUFBd0IxSixHQUFRLFlBQVlMLEdBQU0sQ0FBQytKLGFBTjVDLEVBSXJEO0FBQ0E7O0FBR0FOLFlBQVEsR0FBR0csY0FBYyxJQUFJRSxRQVJ3QjtBQVNyRDs7QUFFRCxNQUFNRSxRQUFRLEtBQUcsQ0FBQWhELEtBQUssSUFBS3lDLFFBQWIsS0FBeUIsaUJBQWlCekosR0FBeEQ7QUFFQSxTQUFRZ0ssUUFBUSxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuM1wiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFyYzogXCJiYi1hcmNcIixcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxuXHRhcmVhOiBcImJiLWFyZWFcIixcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcblx0YXhpczogXCJiYi1heGlzXCIsXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxuXHRiYXI6IFwiYmItYmFyXCIsXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxuXHRjaGFydENpcmNsZXM6IFwiYmItY2hhcnQtY2lyY2xlc1wiLFxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcblx0Z3JpZDogXCJiYi1ncmlkXCIsXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXG5cdGxlZ2VuZDogXCJiYi1sZWdlbmRcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdG1haW46IFwiYmItbWFpblwiLFxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXG5cdHN1YmNoYXJ0OiBcImJiLXN1YmNoYXJ0XCIsXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcblx0dGV4dDogXCJiYi10ZXh0XCIsXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxuXHRFWFBBTkRFRDogXCJfZXhwYW5kZWRfXCIsXG5cdFNFTEVDVEVEOiBcIl9zZWxlY3RlZF9cIixcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxuXHRUZXh0T3ZlcmxhcHBpbmc6IFwidGV4dC1vdmVybGFwcGluZ1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcblxuLyoqXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcblx0bGV0IHRhcmdldDtcblx0bGV0IGtleXM7XG5cdGxldCByZWFkO1xuXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xuXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XG5cdFx0XHRyZXR1cm4gZmluZCgpO1xuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcblx0XHR0YXJnZXQgPSBjb25maWc7XG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XG5cdFx0cmVhZCA9IGZpbmQoKTtcblxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgU3RhbmZvcmRPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG5cdFx0XHQgKiAgIClcblx0XHRcdCAqL1xuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXG5cdFx0XHQgKiBAbmFtZSBlcG9jaHNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cblx0XHRcdCAqL1xuXHRcdFx0ZXBvY2hzOiA8bnVtYmVyW10+IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiB8IHgxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyB8XG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IHgyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgIHxcblx0XHRcdCAqIHwgeTIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgbGluZXM6IFtcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0bGluZXM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBzY2FsZSB2YWx1ZXNcblx0XHRcdCAqIEBuYW1lIHNjYWxlXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtzY2FsZV0gc2NhbGUgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS53aWR0aD0yMF0gV2lkdGggb2YgdGhlIGNvbG9yIHNjYWxlXG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgc2NhbGU6IHtcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXG5cdFx0XHQgKiAgICBtaW46IDEsXG5cdFx0XHQgKiAgICB3aWR0aDogNTAwLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXG5cdFx0XHQgKiAgICBmb3JtYXQ6IFwicG93MTBcIixcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXG5cdFx0XHQgKiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHgpIHtcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xuXHRcdFx0ICogICAgfVxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHNjYWxlX21pbjogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX21heDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX3dpZHRoOiA8bnVtYmVyfHVuZGVmaW5lZD4gMjAsXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIHBhZGRpbmcgZm9yIGNvbG9yIHNjYWxlIGVsZW1lbnRcblx0XHRcdCAqIEBuYW1lIHBhZGRpbmdcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gW3BhZGRpbmddIHBhZGRpbmcgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnJpZ2h0PTBdIFJpZ2h0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcuYm90dG9tPTBdIEJvdHRvbSBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBwYWRkaW5nOiB7XG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcblx0XHRcdCAqICAgICByaWdodDogMCxcblx0XHRcdCAqICAgICBib3R0b206IDAsXG5cdFx0XHQgKiAgICAgbGVmdDogMFxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxuXHRcdFx0cGFkZGluZ19yaWdodDogMCxcblx0XHRcdHBhZGRpbmdfYm90dG9tOiAwLFxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCByZWdpb24gb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqICAgfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogICB8IHBvaW50cyB8IEFycmF5IHwgIHwgfCBBY2NlcHRzIGEgZ3JvdXAgb2Ygb2JqZWN0cyB0aGF0IGhhcyB4IGFuZCB5Ljxicj5UaGVzZSBwb2ludHMgc2hvdWxkIGJlIGFkZGVkIGluIGEgY291bnRlci1jbG9ja3dpc2UgZmFzaGlvbiB0byBtYWtlIGEgY2xvc2VkIHBvbHlnb24uIHxcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XG5cdFx0XHQgKiAgIHwgdGV4dCB8IEZ1bmN0aW9uIHwgIHwgJmx0O29wdGlvbmFsPiB8IFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBhbmQgcGVyY2VudGFnZSBvZiB0aGUgbnVtYmVyIG9mIGVwb2NocyBpbiB0aGlzIHJlZ2lvbi48YnI+UmV0dXJuIGEgc3RyaW5nIHRvIHBsYWNlIHRleHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcmVnaW9uLiB8XG5cdFx0XHQgKiAgIHwgY2xhc3MgfCBTdHJpbmcgfCB8ICZsdDtvcHRpb25hbD4gfCBTZSBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyByZWdpb24sIHVzZSB0aGUgZmlsbCBwcm9wZXJ0eSBpbiBjc3MgdG8gc2V0IGEgYmFja2dyb3VuZCBjb2xvci4gfFxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIHJlZ2lvbnM6IFtcblx0XHRcdCAqICAgICAgIHtcblx0XHRcdCAqICAgICAgICAgICBwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgIF0sXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG5cdFx0XHQgKiAgICAgICAgICAgICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuXHRcdFx0ICogICAgICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcblx0XHRcdCAqICAgICAgICAgICBjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcblx0XHRcdCAqICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAuLi5cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRyZWdpb25zOiBbXVxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cblxuaW1wb3J0IHtnZXRSYW5nZSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4uLy4uL21vZHVsZS91dGlsXCI7XG5cbi8qKlxuICogQ2hlY2sgaWYgcG9pbnQgaXMgaW4gcmVnaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gcG9pbnQgUG9pbnRcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ2lvbiBSZWdpb25cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcG9pbnRJblJlZ2lvbihwb2ludCwgcmVnaW9uKTogYm9vbGVhbiB7IC8vIHRoYW5rcyB0bzogaHR0cDovL2JsLm9ja3Mub3JnL2J5Y29mZmUvNTU3NTkwNFxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cblx0Ly8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuXHRjb25zdCB4ID0gcG9pbnQueDtcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xuXHRsZXQgaW5zaWRlID0gZmFsc2U7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcblx0XHRjb25zdCB4aSA9IHJlZ2lvbltpXS54O1xuXHRcdGNvbnN0IHlpID0gcmVnaW9uW2ldLnk7XG5cblx0XHRjb25zdCB4aiA9IHJlZ2lvbltqXS54O1xuXHRcdGNvbnN0IHlqID0gcmVnaW9uW2pdLnk7XG5cblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG5cdFx0aWYgKGludGVyc2VjdCkge1xuXHRcdFx0aW5zaWRlID0gIWluc2lkZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaW5zaWRlO1xufVxuXG4vKipcbiAqIENvbXBhcmUgZXBvY2hzXG4gKiBAcGFyYW0ge29iamVjdH0gYSBUYXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBiIFNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYik6IG51bWJlciB7XG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0aWYgKGEuZXBvY2hzID4gYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG4vKipcbiAqIEdldCByZWdpb24gYXJlYVxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKTogbnVtYmVyIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxuXHRsZXQgYXJlYSA9IDA7XG5cdGxldCBwb2ludDE7XG5cdGxldCBwb2ludDI7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdHBvaW50MiA9IHBvaW50c1tqXTtcblx0XHRhcmVhICs9IHBvaW50MS54ICogcG9pbnQyLnk7XG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xuXHR9XG5cblx0YXJlYSAvPSAyO1xuXG5cdHJldHVybiBhcmVhO1xufVxuXG4vKipcbiAqIEdldCBjZW50cm9pZFxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRyb2lkKHBvaW50cykge1xuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xuXG5cdGxldCB4ID0gMDtcblx0bGV0IHkgPSAwO1xuXHRsZXQgZjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0Y29uc3QgcG9pbnQyID0gcG9pbnRzW2pdO1xuXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xuXHRcdHggKz0gKHBvaW50MS54ICsgcG9pbnQyLngpICogZjtcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XG5cdH1cblxuXHRmID0gYXJlYSAqIDY7XG5cblx0cmV0dXJuIHtcblx0XHR4OiB4IC8gZixcblx0XHR5OiB5IC8gZlxuXHR9O1xufVxuXG5leHBvcnQge1xuXHRjb21wYXJlRXBvY2hzLFxuXHRnZXRDZW50cm9pZCxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlZ2lvbkFyZWEsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzU3RyaW5nLFxuXHRwYXJzZURhdGUsXG5cdHBvaW50SW5SZWdpb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7Z2V0Q2VudHJvaWQsIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcblx0cHJpdmF0ZSBvd25lcjtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gb3duZXIuJCQuJGVsLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXG5cdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcblxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkTGluZXMpO1xuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xuXHRcdGNvbnN0IHN0YW5mb3JkTGluZSA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZExpbmVzfWApXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcubGluZXMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkTGluZS5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZExpbmVFbnRlciA9IHN0YW5mb3JkTGluZS5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyXG5cdFx0XHQubWVyZ2Uoc3RhbmZvcmRMaW5lKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkyXCIpIDogeHZDdXN0b20oZCwgXCJ4MlwiKSkpXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHtjb25maWcsICRlbDoge21haW59fSA9ICQkO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtUmVnaW9uc1xuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5yZWdpb25zKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZFJlZ2lvbi5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZFJlZ2lvbkVudGVyID0gc3RhbmZvcmRSZWdpb24uZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgaXNSb3RhdGVkID8gXCJyb3RhdGUoLTkwKVwiIDogXCJcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24gPSBzdGFuZm9yZFJlZ2lvbkVudGVyLm1lcmdlKHN0YW5mb3JkUmVnaW9uKTtcblxuXHRcdC8vIHVwZGF0ZVxuXHRcdHN0YW5mb3JkUmVnaW9uXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXG5cdFx0XHRcdGlzUm90YXRlZCA/IHl2Q3VzdG9tKHZhbHVlLCBcInlcIikgOiB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpLFxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24uc2VsZWN0KFwidGV4dFwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4XCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpIDogeHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikpKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxuXHRcdFx0LnRleHQoZCA9PiB7XG5cdFx0XHRcdGlmIChkLnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZC50ZXh0KHZhbHVlLCBwZXJjZW50YWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fSlcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcblx0XHRcdC5hdHRyKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApOiB2b2lkIHtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC5zY2FsZS55MiA6ICQkLnNjYWxlLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7YXhpc1JpZ2h0IGFzIGQzQXhpc1JpZ2h0fSBmcm9tIFwiZDMtYXhpc1wiO1xuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsIGFzIGQzU2NhbGVTZXF1ZW50aWFsLCBzY2FsZUxvZyBhcyBkM1NjYWxlTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTY2FsZSB7XG5cdHByaXZhdGUgb3duZXI7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0fVxuXG5cdGRyYXdDb2xvclNjYWxlKCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJCwgY29uZmlnfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXHRcdGNvbnN0IGhlaWdodCA9ICQkLnN0YXRlLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nX2JvdHRvbSAtIGNvbmZpZy5wYWRkaW5nX3RvcDtcblx0XHRjb25zdCBiYXJXaWR0aCA9IGNvbmZpZy5zY2FsZV93aWR0aDtcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xuXHRcdGNvbnN0IHBvaW50cyA9IGdldFJhbmdlKGNvbmZpZy5wYWRkaW5nX2JvdHRvbSwgaGVpZ2h0LCBiYXJIZWlnaHQpO1xuXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIHBvaW50c1swXV0pO1xuXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9ICQkLiRlbC5zdmcuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCA1MClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1MuY29sb3JTY2FsZSk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke2NvbmZpZy5wYWRkaW5nX3RvcH0pYClcblx0XHRcdC5zZWxlY3RBbGwoXCJiYXJzXCIpXG5cdFx0XHQuZGF0YShwb2ludHMpXG5cdFx0XHQuZW50ZXIoKVxuXHRcdFx0LmFwcGVuZChcInJlY3RcIilcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCBiYXJXaWR0aClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCBkID0+IGludmVyc2VTY2FsZShkKSk7XG5cblx0XHQvLyBMZWdlbmQgQXhpc1xuXHRcdGNvbnN0IGF4aXNTY2FsZSA9IGQzU2NhbGVMb2coKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pXG5cdFx0XHQucmFuZ2UoW1xuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3AgKyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICsgYmFySGVpZ2h0IC0gMSxcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wXG5cdFx0XHRdKTtcblxuXHRcdGNvbnN0IGxlZ2VuZEF4aXMgPSBkM0F4aXNSaWdodChheGlzU2NhbGUpO1xuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNjYWxlRm9ybWF0KSkge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KHNjYWxlRm9ybWF0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KGQzRm9ybWF0KFwiZFwiKSk7XG5cdFx0fVxuXG5cdFx0Ly8gRHJhdyBBeGlzXG5cdFx0Y29uc3QgYXhpcyA9IHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHtiYXJXaWR0aH0sMClgKVxuXHRcdFx0LmNhbGwobGVnZW5kQXhpcyk7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0YXhpcy5zZWxlY3RBbGwoXCIudGljayB0ZXh0XCIpXG5cdFx0XHRcdC50ZXh0KG51bGwpXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiBkIC8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCAtIDFlLTEyKSkgPT09IDEpIC8vIFBvd2VyIG9mIFRlblxuXHRcdFx0XHQudGV4dCgxMClcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdC5hdHRyKFwiZHlcIiwgXCItLjdlbVwiKSAvLyBodHRwczovL2JsLm9ja3Mub3JnL21ib3N0b2NrLzY3MzgyMjlcblx0XHRcdFx0LnRleHQoZCA9PiBNYXRoLnJvdW5kKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgkeyQkLnN0YXRlLmN1cnJlbnQud2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xuXHR9XG5cblx0eEZvckNvbG9yU2NhbGUoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5vd25lci5jb25maWcucGFkZGluZ19yaWdodCArXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUubm9kZSgpLmdldEJCb3goKS53aWR0aDtcblx0fVxuXG5cdGdldENvbG9yU2NhbGVQYWRkaW5nKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMueEZvckNvbG9yU2NhbGUoKSArIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfbGVmdCArIDIwO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IHtpbnRlcnBvbGF0ZUhzbExvbmcgYXMgZDNJbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtoc2wgYXMgZDNIc2x9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWxMb2cgYXMgZDNTY2FsZVNlcXVlbnRpYWxMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi8uLi9jb25maWcvY2xhc3Nlc1wiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcbmltcG9ydCB7Y29tcGFyZUVwb2NocywgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZSwgcG9pbnRJblJlZ2lvbn0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxuICogQHJlcXVpcmVzIGQzLWJydXNoXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZH1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5qc1wiPjwvc2NyaXB0PlxuICpcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJzY2F0dGVyXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuICogICAgICAgICAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG4gKiAgICAgICAgICAgKSxcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXG4gKiAgICAgICAgICAgbGluZXM6IFtcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuICogICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgc2NhbGU6IHtcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXG4gKiAgICAgICAgICAgICBcdG1pbjogMSxcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHBhZGRpbmc6IHtcbiAqICAgICAgICAgICBcdHRvcDogMTUsXG4gKiAgICAgICAgICAgXHRyaWdodDogMCxcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICBcdHtcbiAqICAgICAgICAgICAgICAgXHRwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiA0MCB9XG4gKiAgICAgICAgICAgICAgIFx0XSxcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcbiAqICAgICAgICAgICAgICAgXHQgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG4gKiAgICAgICAgICAgICAgIFx0fSxcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuICogICAgICAgICAgICAgICBcdGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuICogICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICBcdC4uLlxuICogICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgU3RhbmZvcmQgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5lc21cIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBTdGFuZm9yZCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5mb3JkIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblx0cHJpdmF0ZSBlbGVtZW50cztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkYmVmb3JlSW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XG5cblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcblxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xuXHRcdCQkLmNvbG9yID0gdGhpcy5nZXRTdGFuZm9yZFBvaW50Q29sb3IuYmluZCgkJCk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JTY2FsZSh0aGlzKTtcblx0XHR0aGlzLmVsZW1lbnRzID0gbmV3IEVsZW1lbnRzKHRoaXMpO1xuXG5cdFx0dGhpcy5jb252ZXJ0RGF0YSgpO1xuXHRcdHRoaXMuaW5pdFN0YW5mb3JkRGF0YSgpO1xuXHRcdHRoaXMuc2V0U3RhbmZvcmRUb29sdGlwKCk7XG5cdFx0dGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cblx0XHR0aGlzLiRyZWRyYXcoKTtcblx0fVxuXG5cdCRyZWRyYXcoZHVyYXRpb24/OiBudW1iZXIpOiB2b2lkIHtcblx0XHR0aGlzLmNvbG9yU2NhbGUgJiYgdGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cdFx0dGhpcy5lbGVtZW50cyAmJiB0aGlzLmVsZW1lbnRzLnVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24pO1xuXHR9XG5cblxuXHRnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xuXHRcdHJldHVybiBuZXcgT3B0aW9ucygpO1xuXHR9XG5cblx0Y29udmVydERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzO1xuXHRcdGNvbnN0IGVwb2NocyA9IHRoaXMub3B0aW9ucy5lcG9jaHM7XG5cblx0XHRkYXRhLmZvckVhY2goZCA9PiB7XG5cdFx0XHRkLnZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdHYuZXBvY2hzID0gZXBvY2hzW2ldO1xuXHRcdFx0fSk7XG5cblx0XHRcdGQubWluRXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5tYXhFcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9ycyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzY2FsZSA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gc2NhbGUueTIgOiBzY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG5cblx0aW5pdFN0YW5mb3JkRGF0YSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy4kJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHQvLyBUT0RPIFNUQU5GT1JEIHNlZSBpZiAoZGF0YS5qcyAtPiBvcmRlclRhcmdldHMpKyBjYW4gYmUgdXNlZCBpbnN0ZWFkXG5cdFx0Ly8gTWFrZSBsYXJnZXIgdmFsdWVzIGFwcGVhciBvbiB0b3Bcblx0XHR0YXJnZXQudmFsdWVzLnNvcnQoY29tcGFyZUVwb2Nocyk7XG5cblx0XHQvLyBHZXQgYXJyYXkgb2YgZXBvY2hzXG5cdFx0Y29uc3QgZXBvY2hzID0gdGFyZ2V0LnZhbHVlcy5tYXAoYSA9PiBhLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQubWluRXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9taW4pID8gY29uZmlnLnNjYWxlX21pbiA6IE1hdGgubWluKC4uLmVwb2Nocyk7XG5cdFx0dGFyZ2V0Lm1heEVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWF4KSA/IGNvbmZpZy5zY2FsZV9tYXggOiBNYXRoLm1heCguLi5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0LmNvbG9ycyA9IGlzRnVuY3Rpb24oY29uZmlnLmNvbG9ycykgP1xuXHRcdFx0Y29uZmlnLmNvbG9ycyA6IGQzSW50ZXJwb2xhdGVIc2xMb25nKGQzSHNsKDI1MCwgMSwgMC41KSwgZDNIc2woMCwgMSwgMC41KSk7XG5cblx0XHR0YXJnZXQuY29sb3JzY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsTG9nKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSk7XG5cdH1cblxuXHRnZXRTdGFuZm9yZFBvaW50Q29sb3IoZCkge1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0cmV0dXJuIHRhcmdldC5jb2xvcnNjYWxlKGQuZXBvY2hzKTtcblx0fVxuXG5cdHNldFN0YW5mb3JkVG9vbHRpcCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcy4kJDtcblxuXHRcdGlmIChpc0VtcHR5KGNvbmZpZy50b29sdGlwX2NvbnRlbnRzKSkge1xuXHRcdFx0Y29uZmlnLnRvb2x0aXBfY29udGVudHMgPSBmdW5jdGlvbihkLCBkZWZhdWx0VGl0bGVGb3JtYXQsIGRlZmF1bHRWYWx1ZUZvcm1hdCwgY29sb3IpIHtcblx0XHRcdFx0bGV0IGh0bWwgPSBgPHRhYmxlIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwfVwiPjx0Ym9keT5gO1xuXG5cdFx0XHRcdGQuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRodG1sICs9IGA8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdChjb25maWcuZGF0YV94KX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8L3RyPmA7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbik6IHt2YWx1ZTogbnVtYmVyLCBwZXJjZW50YWdlOiBudW1iZXJ9IHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Y29uc3QgdG90YWwgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT5cblx0XHRcdGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpLCAwKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcblx0XHRcdGlmIChwb2ludEluUmVnaW9uKGN1cnJlbnRWYWx1ZSwgcmVnaW9uKSkge1xuXHRcdFx0XHRyZXR1cm4gYWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2Nocyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdHBlcmNlbnRhZ2U6IHZhbHVlICE9PSAwID8gKyh2YWx1ZSAvIHRvdGFsICogMTAwKS50b0ZpeGVkKDEpIDogMFxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XG5cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59KSgpO1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cblxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XG5cbmV4cG9ydCB7XG5cdGFzSGFsZlBpeGVsLFxuXHRicnVzaEVtcHR5LFxuXHRjYWxsRm4sXG5cdGNhcGl0YWxpemUsXG5cdGNlaWwxMCxcblx0Y29udmVydElucHV0VHlwZSxcblx0ZGVlcENsb25lLFxuXHRkaWZmRG9tYWluLFxuXHRlbmRhbGwsXG5cdGVtdWxhdGVFdmVudCxcblx0ZXh0ZW5kLFxuXHRnZXRCcnVzaFNlbGVjdGlvbixcblx0Z2V0Qm91bmRpbmdSZWN0LFxuXHRnZXRDc3NSdWxlcyxcblx0Z2V0TWluTWF4LFxuXHRnZXRPcHRpb24sXG5cdGdldFBhdGhCb3gsXG5cdGdldFJhbmRvbSxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlY3RTZWdMaXN0LFxuXHRnZXRUcmFuc2xhdGlvbixcblx0Z2V0VW5pcXVlLFxuXHRoYXNWYWx1ZSxcblx0aXNBcnJheSxcblx0aXNib29sZWFuLFxuXHRpc0RlZmluZWQsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzTnVtYmVyLFxuXHRpc09iamVjdCxcblx0aXNPYmplY3RUeXBlLFxuXHRpc1N0cmluZyxcblx0aXNUYWJWaXNpYmxlLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNWYWx1ZSxcblx0bWVyZ2VBcnJheSxcblx0bWVyZ2VPYmosXG5cdG5vdEVtcHR5LFxuXHRwYXJzZURhdGUsXG5cdHNhbml0aXNlLFxuXHRzZXRUZXh0VmFsdWUsXG5cdHNvcnRWYWx1ZSxcblx0dG9BcnJheSxcblx0dHBsUHJvY2Vzc1xufTtcblxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcbmNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNTdHJpbmcgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIjtcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XG5jb25zdCBpc1VuZGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNEZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XG5jb25zdCBjZWlsMTAgPSAodjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XG5jb25zdCBhc0hhbGZQaXhlbCA9IChuOiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKG4pICsgMC41O1xuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcbmNvbnN0IGlzT2JqZWN0VHlwZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+IChcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XG5cdChpc09iamVjdFR5cGUobykgJiYgIShvIGluc3RhbmNlb2YgRGF0ZSkgJiYgT2JqZWN0LmtleXMobykubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXG4pO1xuY29uc3Qgbm90RW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAhaXNFbXB0eShvKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0FycmF5ID0gKGFycjogYW55KTogYm9vbGVhbiA9PiBBcnJheS5pc0FycmF5KGFycik7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIERhdGEgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcblxuLyoqXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxuICogSWYgZGVmYXVsdCB2YWx1ZSBpcyBnaXZlbiwgd2lsbCByZXR1cm4gaWYgZ2l2ZW4ga2V5IHZhbHVlIG5vdCBmb3VuZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWVcbiAqIEByZXR1cm5zIHsqfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0T3B0aW9uKG9wdGlvbnM6IG9iamVjdCwga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZSk6IGFueSB7XG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBleGlzdCBpbiB0aGUgZ2l2ZW4gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gZGljdCBUYXJnZXQgb2JqZWN0IHRvIGJlIGNoZWNrZWRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYXNWYWx1ZShkaWN0OiBvYmplY3QsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0bGV0IGZvdW5kID0gZmFsc2U7XG5cblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcblxuXHRyZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbGxGbihmbiwgLi4uYXJncyk6IGJvb2xlYW4ge1xuXHRjb25zdCBpc0ZuID0gaXNGdW5jdGlvbihmbik7XG5cblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xuXHRyZXR1cm4gaXNGbjtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXG4gKiBAcGFyYW0ge2QzLnRyYW5zaXRpb259IHRyYW5zaXRpb24gVHJhbnNpdGlvblxuICogQHBhcmFtIHtGdWNudGlvbn0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVuZGFsbCh0cmFuc2l0aW9uLCBjYjogRnVuY3Rpb24pOiB2b2lkIHtcblx0bGV0IG4gPSAwO1xuXG5cdHRyYW5zaXRpb25cblx0XHQuZWFjaCgoKSA9PiArK24pXG5cdFx0Lm9uKFwiZW5kXCIsIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRcdCEtLW4gJiYgY2IuYXBwbHkodGhpcywgLi4uYXJncyk7XG5cdFx0fSk7XG59XG5cbi8qKlxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nIHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcoc3RyKSA/XG5cdFx0c3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGV4dCB2YWx1ZSBzdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldFRleHRWYWx1ZShcblx0bm9kZTogZDNTZWxlY3Rpb24sXG5cdHRleHQ6IHN0cmluZyxcblx0ZHk6IG51bWJlcltdID0gWy0xLCAxXSxcblx0dG9NaWRkbGU6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xuXHRcdG5vZGUudGV4dCh0ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcblxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XG5cblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcblxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxuXHRcdFx0XHRcdC50ZXh0KHYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogU3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XG5cdC8qXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXG5cdCAqICovXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xuXG5cdHJldHVybiBbXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXG5cdFx0e3gsIHl9LCAvLyBzZWcxXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXG5cdF07XG59XG5cbi8qKlxuICogR2V0IHN2ZyBib3VuZGluZyBwYXRoIGJveCBkaW1lbnNpb25cbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhCb3goXG5cdHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudFxuKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xuXHRjb25zdCB4ID0gaXRlbXNbMF0ueDtcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xuXG5cdHJldHVybiB7XG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybiBicnVzaCBzZWxlY3Rpb24gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fSBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0ge30uJGVsIFNlbGVjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtkMy5icnVzaFNlbGVjdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJydXNoU2VsZWN0aW9uKHskZWx9KSB7XG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcblx0Y29uc3QgbWFpbiA9ICRlbC5zdWJjaGFydC5tYWluIHx8ICRlbC5tYWluO1xuXHRsZXQgc2VsZWN0aW9uO1xuXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcblx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09IFwiYnJ1c2hcIikge1xuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmdDbGllbnRSZWN0LlxuICogQ2FjaGUgdGhlIGV2YWx1YXRlZCB2YWx1ZSBvbmNlIGl0IHdhcyBjYWxsZWQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0Qm91bmRpbmdSZWN0ID0gKG5vZGUpOiB7XG5cdGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLFxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcbn0gPT4gbm9kZS5yZWN0IHx8IChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblxuLyoqXG4gKiBSZXRydW4gcmFuZG9tIG51bWJlclxuICogQHBhcmFtIHtib29sZWFufSBhc1N0ciBDb252ZXJ0IHJldHVybmVkIHZhbHVlIGFzIHN0cmluZ1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcblx0Y29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG5cblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIERlZXAgY29weSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IENsb25lZCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZXBDbG9uZSguLi5vYmplY3ROKSB7XG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IHIgPSBuZXcgdi5jb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xuXHRcdFx0XHRyW2tdID0gY2xvbmUodltrXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByO1xuXHRcdH1cblxuXHRcdHJldHVybiB2O1xuXHR9O1xuXG5cdHJldHVybiBvYmplY3ROLm1hcCh2ID0+IGNsb25lKHYpKVxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcblx0XHRcdHsuLi5hLCAuLi5jfVxuXHRcdCkpO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fEFycmF5fSBzb3VyY2UgU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xuXHR9XG5cblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=