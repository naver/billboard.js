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

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.1.0-next.1");



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJzdWJjaGFydCIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsImdldE1pbk1heCIsInJlcyIsInN0YXJ0IiwiZW5kIiwic3RlcCIsInB1c2giLCJlbXVsYXRlRXZlbnQiLCJtb3VzZSIsImdldFBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwic2NyZWVuWCIsInNjcmVlblkiLCJjbGllbnRYIiwiY2xpZW50WSIsIk1vdXNlRXZlbnQiLCJlbCIsImV2ZW50VHlwZSIsInBhcmFtcyIsImRpc3BhdGNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImhpZGRlbiIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImhhc1RvdWNoUG9pbnRzIiwibWF4VG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsIkRvY3VtZW50VG91Y2giLCJoYXNNb3VzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFtRDtBQUNsRixDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7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LEtBQVIseUJBQW9DeUQsSUFBcEMsc0JBR0YsRUFBT0MsVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTSSxZQUFULEdBQWlDO0FBQ2hDLFNBQU8sQ0FBQ2pKLEdBQVEsQ0FBQ2tKLE1BQWpCO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsZ0JBQVQsQ0FBMEJ4QyxLQUExQixFQUEwQ2dCLEtBQTFDLEVBQW9GO0FBQ25GLE1BQUl5QixRQUFRLEtBQVosQ0FEbUYsQ0FHbkY7O0FBQ0EsTUFBSSxPQUFPL0UsSUFBUCxDQUFZMUUsR0FBTSxDQUFDMEosU0FBUCxDQUFpQkMsU0FBN0IsS0FBMkMzQixLQUEvQyxFQUFzRDtBQUNyRDtBQURxRCxRQUUvQzRCLGNBQWMsR0FBRzVKLEdBQU0sQ0FBQzBKLFNBQVAsSUFBb0Isb0JBQW9CMUosR0FBTSxDQUFDMEosU0FBL0MsSUFBNEQxSixHQUFNLENBQUMwSixTQUFQLENBQWlCRyxjQUFqQixHQUFrQyxDQUZoRTtBQUFBLFFBTS9DQyxRQUFRLEdBQUksaUJBQWlCOUosR0FBakIsSUFBNEJBLEdBQU0sQ0FBQytKLGFBQVAsSUFBd0IxSixHQUFRLFlBQVlMLEdBQU0sQ0FBQytKLGFBTjVDLEVBSXJEO0FBQ0E7O0FBR0FOLFlBQVEsR0FBR0csY0FBYyxJQUFJRSxRQVJ3QjtBQVNyRDs7QUFFRCxNQUFNRSxRQUFRLEtBQUcsQ0FBQWhELEtBQUssSUFBS3lDLFFBQWIsS0FBeUIsaUJBQWlCekosR0FBeEQ7QUFFQSxTQUFRZ0ssUUFBUSxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjEuMC1uZXh0LjFcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XG5cbi8qKlxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XG5cdGxldCB0YXJnZXQ7XG5cdGxldCBrZXlzO1xuXHRsZXQgcmVhZDtcblxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcblxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xuXHRcdFx0cmV0dXJuIGZpbmQoKTtcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xuXHRcdHJlYWQgPSBmaW5kKCk7XG5cblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xuXHRcdH1cblx0fSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIG9wdGlvbiBjbGFzc1xuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmRPcHRpb25zfVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCB0aGUgY29sb3Igb2YgdGhlIGNvbG9yIHNjYWxlLiBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBhbmQgc2hvdWxkIHJldHVybiBhIGNvbG9yLlxuXHRcdFx0ICogQG5hbWUgY29sb3JzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdFx0XHQgKiBAZGVmYXVsdCB1bmRlZmluZWRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuXHRcdFx0ICogICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuXHRcdFx0ICogICApXG5cdFx0XHQgKi9cblx0XHRcdGNvbG9yczogdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNwZWNpZnkgdGhlIGtleSBvZiBlcG9jaHMgdmFsdWVzIGluIHRoZSBkYXRhLlxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdXG5cdFx0XHQgKi9cblx0XHRcdGVwb2NoczogPG51bWJlcltdPiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgbGluZXMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIGxpbmUgb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogfCBLZXkgfCBUeXBlIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxuXHRcdFx0ICogfCB5MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCB4MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzICB8XG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxuXHRcdFx0ICogfCBjbGFzcyB8IFN0cmluZyB8IE9wdGlvbmFsIHZhbHVlLiBTZXQgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgbGluZS4gfFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGxpbmVzOiBbXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB5MTogMCwgeDI6IDY1LCB5MjogNjUsIGNsYXNzOiBcImxpbmUxXCIgfSxcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdGxpbmVzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2NhbGUgdmFsdWVzXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbc2NhbGVdIHNjYWxlIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5taW49dW5kZWZpbmVkXSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogbG93ZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS5tYXg9dW5kZWZpbmVkXSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogaGlnaGVzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxuXHRcdFx0ICogQHByb3BlcnR5IHtzdHJpbmd8RnVuY3Rpb259IFtzY2FsZS5mb3JtYXQ9dW5kZWZpbmVkXSBGb3JtYXQgb2YgdGhlIGF4aXMgb2YgdGhlIGNvbG9yIHNjYWxlLiBVc2UgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwIG9yIGEgY3VzdG9tIGZ1bmN0aW9uLiBFeGFtcGxlOiBkMy5mb3JtYXQoXCJkXCIpXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHNjYWxlOiB7XG5cdFx0XHQgKiAgICBtYXg6IDEwMDAwLFxuXHRcdFx0ICogICAgbWluOiAxLFxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBzcGVjaWZ5ICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMFxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gb3Igc3BlY2lmeSBhIGZvcm1hdCBmdW5jdGlvblxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHQgKiAgICBcdHJldHVybiB4ICtcIiVcIjtcblx0XHRcdCAqICAgIH1cblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRzY2FsZV9taW46IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV9tYXg6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cdFx0XHRzY2FsZV93aWR0aDogPG51bWJlcnx1bmRlZmluZWQ+IDIwLFxuXHRcdFx0c2NhbGVfZm9ybWF0OiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFRoZSBwYWRkaW5nIGZvciBjb2xvciBzY2FsZSBlbGVtZW50XG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtwYWRkaW5nXSBwYWRkaW5nIG9iamVjdFxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnRvcD0wXSBUb3AgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5yaWdodD0wXSBSaWdodCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5sZWZ0PTBdIExlZnQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgcGFkZGluZzoge1xuXHRcdFx0ICogICAgIHRvcDogMTUsXG5cdFx0XHQgKiAgICAgcmlnaHQ6IDAsXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxuXHRcdFx0ICogICAgIGxlZnQ6IDBcblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRwYWRkaW5nX3RvcDogMCxcblx0XHRcdHBhZGRpbmdfcmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcblx0XHRcdHBhZGRpbmdfbGVmdDogMCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgcmVnaW9ucyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggcmVnaW9uIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHRcdCAqICAgfCBLZXkgfCBUeXBlIHwgRGVmYXVsdCB8IEF0dHJpYnV0ZXMgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiAgIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XG5cdFx0XHQgKiAgIHwgb3BhY2l0eSB8IE51bWJlciB8IGAwLjJgIHwgJmx0O29wdGlvbmFsPiB8IFNldHMgdGhlIG9wYWNpdHkgb2YgdGhlIHJlZ2lvbiBhcyB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEgfFxuXHRcdFx0ICogICB8IHRleHQgfCBGdW5jdGlvbiB8ICB8ICZsdDtvcHRpb25hbD4gfCBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYW5kIHBlcmNlbnRhZ2Ugb2YgdGhlIG51bWJlciBvZiBlcG9jaHMgaW4gdGhpcyByZWdpb24uPGJyPlJldHVybiBhIHN0cmluZyB0byBwbGFjZSB0ZXh0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHJlZ2lvbi4gfFxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcblx0XHRcdCAqIEBuYW1lIHJlZ2lvbnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICByZWdpb25zOiBbXG5cdFx0XHQgKiAgICAgICB7XG5cdFx0XHQgKiAgICAgICAgICAgcG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2Vcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogNDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICBdLFxuXHRcdFx0ICogICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xuXHRcdFx0ICogICAgICAgICAgICAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcblx0XHRcdCAqICAgICAgICAgICB9LFxuXHRcdFx0ICogICAgICAgICAgIG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXG5cdFx0XHQgKiAgICAgICAgICAgY2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXG5cdFx0XHQgKiAgICAgICB9LFxuXHRcdFx0ICogICAgICAgLi4uXG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0cmVnaW9uczogW11cblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5cbmltcG9ydCB7Z2V0UmFuZ2UsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuLi8uLi9tb2R1bGUvdXRpbFwiO1xuXG4vKipcbiAqIENoZWNrIGlmIHBvaW50IGlzIGluIHJlZ2lvblxuICogQHBhcmFtIHtvYmplY3R9IHBvaW50IFBvaW50XG4gKiBAcGFyYW0ge0FycmF5fSByZWdpb24gUmVnaW9uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbik6IGJvb2xlYW4geyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcblx0Ly8gcmF5LWNhc3RpbmcgYWxnb3JpdGhtIGJhc2VkIG9uXG5cdC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC52YWx1ZTtcblx0bGV0IGluc2lkZSA9IGZhbHNlO1xuXG5cdGZvciAobGV0IGkgPSAwLCBqID0gcmVnaW9uLmxlbmd0aCAtIDE7IGkgPCByZWdpb24ubGVuZ3RoOyBqID0gaSsrKSB7XG5cdFx0Y29uc3QgeGkgPSByZWdpb25baV0ueDtcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xuXG5cdFx0Y29uc3QgeGogPSByZWdpb25bal0ueDtcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xuXG5cdFx0Y29uc3QgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSkgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcblxuXHRcdGlmIChpbnRlcnNlY3QpIHtcblx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc2lkZTtcbn1cblxuLyoqXG4gKiBDb21wYXJlIGVwb2Noc1xuICogQHBhcmFtIHtvYmplY3R9IGEgVGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gYiBTb3VyY2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb21wYXJlRXBvY2hzKGEsIGIpOiBudW1iZXIge1xuXHRpZiAoYS5lcG9jaHMgPCBiLmVwb2Nocykge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBHZXQgcmVnaW9uIGFyZWFcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWdpb25BcmVhKHBvaW50cyk6IG51bWJlciB7IC8vIHRoYW5rcyB0bzogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYyODIzMzAvZmluZC1jZW50ZXJwb2ludC1vZi1wb2x5Z29uLWluLWphdmFzY3JpcHRcblx0bGV0IGFyZWEgPSAwO1xuXHRsZXQgcG9pbnQxO1xuXHRsZXQgcG9pbnQyO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRwb2ludDIgPSBwb2ludHNbal07XG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xuXHRcdGFyZWEgLT0gcG9pbnQxLnkgKiBwb2ludDIueDtcblx0fVxuXG5cdGFyZWEgLz0gMjtcblxuXHRyZXR1cm4gYXJlYTtcbn1cblxuLyoqXG4gKiBHZXQgY2VudHJvaWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcblx0Y29uc3QgYXJlYSA9IGdldFJlZ2lvbkFyZWEocG9pbnRzKTtcblxuXHRsZXQgeCA9IDA7XG5cdGxldCB5ID0gMDtcblx0bGV0IGY7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0Y29uc3QgcG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcblxuXHRcdGYgPSBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQyLnggKiBwb2ludDEueTtcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XG5cdFx0eSArPSAocG9pbnQxLnkgKyBwb2ludDIueSkgKiBmO1xuXHR9XG5cblx0ZiA9IGFyZWEgKiA2O1xuXG5cdHJldHVybiB7XG5cdFx0eDogeCAvIGYsXG5cdFx0eTogeSAvIGZcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0Y29tcGFyZUVwb2Nocyxcblx0Z2V0Q2VudHJvaWQsXG5cdGdldFJhbmdlLFxuXHRnZXRSZWdpb25BcmVhLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc1N0cmluZyxcblx0cGFyc2VEYXRlLFxuXHRwb2ludEluUmVnaW9uXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2dldENlbnRyb2lkLCBpc1N0cmluZywgcGFyc2VEYXRlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gZWxlbWVudCBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyB7XG5cdHByaXZhdGUgb3duZXI7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cblx0XHQvLyBNRU1POiBBdm9pZCBibG9ja2luZyBldmVudFJlY3Rcblx0XHRjb25zdCBlbGVtZW50cyA9IG93bmVyLiQkLiRlbC5tYWluLnNlbGVjdChcIi5iYi1jaGFydFwiKVxuXHRcdFx0LmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRFbGVtZW50cyk7XG5cblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZFJlZ2lvbnMpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtTGluZXNcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxuXHRcdFx0LnN0eWxlKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiZ2VvbWV0cmljcHJlY2lzaW9uXCIpXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZExpbmV9YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXIuYXBwZW5kKFwibGluZVwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZExpbmUgKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJsaW5lXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcIngxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTFcIikgOiB4dkN1c3RvbShkLCBcIngxXCIpKSlcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngxXCIpIDogeXZDdXN0b20oZCwgXCJ5MVwiKSkpXG5cdFx0XHQuYXR0cihcInkyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDJcIikgOiB5dkN1c3RvbShkLCBcInkyXCIpKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgY291bnRQb2ludHNJblJlZ2lvbiA9IHRoaXMub3duZXIuY291bnRFcG9jaHNJblJlZ2lvbi5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcblx0XHRsZXQgc3RhbmZvcmRSZWdpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb25zfWApXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbn1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwicG9seWdvblwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInRleHRcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XG5cblx0XHQvLyB1cGRhdGVcblx0XHRzdGFuZm9yZFJlZ2lvblxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkUmVnaW9uICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwicG9seWdvblwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJwb2ludHNcIiwgZCA9PiBkLnBvaW50cy5tYXAodmFsdWUgPT4gW1xuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcblx0XHRcdFx0aXNSb3RhdGVkID8geHZDdXN0b20odmFsdWUsIFwieFwiKSA6IHl2Q3VzdG9tKHZhbHVlLCBcInlcIilcblx0XHRcdF0uam9pbihcIixcIikpLmpvaW4oXCIgXCIpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBkID0+IFN0cmluZyhkLm9wYWNpdHkgPyBkLm9wYWNpdHkgOiAwLjIpKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcblx0XHRcdC5hdHRyKFwieVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSA6IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpKSlcblx0XHRcdC50ZXh0KGQgPT4ge1xuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3Qge3ZhbHVlLCBwZXJjZW50YWdlfSA9IGNvdW50UG9pbnRzSW5SZWdpb24oZC5wb2ludHMpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdH0pXG5cdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24gPSAwKTogdm9pZCB7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbik7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gJCQuc2NhbGUueTIgOiAkJC5zY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcbmltcG9ydCB7Zm9ybWF0IGFzIGQzRm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbCBhcyBkM1NjYWxlU2VxdWVudGlhbCwgc2NhbGVMb2cgYXMgZDNTY2FsZUxvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc0Z1bmN0aW9uLCBnZXRSYW5nZX0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGNvbG9yIHNjYWxlIGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xuXHRwcml2YXRlIG93bmVyO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cdH1cblxuXHRkcmF3Q29sb3JTY2FsZSgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCQsIGNvbmZpZ30gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblx0XHRjb25zdCBoZWlnaHQgPSAkJC5zdGF0ZS5oZWlnaHQgLSBjb25maWcucGFkZGluZ19ib3R0b20gLSBjb25maWcucGFkZGluZ190b3A7XG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XG5cdFx0Y29uc3QgYmFySGVpZ2h0ID0gNTtcblx0XHRjb25zdCBwb2ludHMgPSBnZXRSYW5nZShjb25maWcucGFkZGluZ19ib3R0b20sIGhlaWdodCwgYmFySGVpZ2h0KTtcblxuXHRcdGNvbnN0IGludmVyc2VTY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLCBwb2ludHNbMF1dKTtcblxuXHRcdGlmICh0aGlzLmNvbG9yU2NhbGUpIHtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5yZW1vdmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSAkJC4kZWwuc3ZnLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLmNvbG9yU2NhbGUpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtjb25maWcucGFkZGluZ190b3B9KWApXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxuXHRcdFx0LmRhdGEocG9pbnRzKVxuXHRcdFx0LmVudGVyKClcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXG5cdFx0XHQuYXR0cihcInlcIiwgKGQsIGkpID0+IGkgKiBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXG5cdFx0XHQuYXR0cihcImhlaWdodFwiLCBiYXJIZWlnaHQpXG5cdFx0XHQuYXR0cihcImZpbGxcIiwgZCA9PiBpbnZlcnNlU2NhbGUoZCkpO1xuXG5cdFx0Ly8gTGVnZW5kIEF4aXNcblx0XHRjb25zdCBheGlzU2NhbGUgPSBkM1NjYWxlTG9nKClcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxuXHRcdFx0LnJhbmdlKFtcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wICsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSArIGJhckhlaWdodCAtIDEsXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxuXHRcdFx0XSk7XG5cblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcblx0XHRjb25zdCBzY2FsZUZvcm1hdCA9IGNvbmZpZy5zY2FsZV9mb3JtYXQ7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrVmFsdWVzKFsxLCAxMCwgMTAwLCAxMDAwLCAxMDAwMCwgMTAwMDAwLCAxMDAwMDAwLCAxMDAwMDAwMF0pO1xuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzY2FsZUZvcm1hdCkpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChkM0Zvcm1hdChcImRcIikpO1xuXHRcdH1cblxuXHRcdC8vIERyYXcgQXhpc1xuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBcImxlZ2VuZCBheGlzXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7YmFyV2lkdGh9LDApYClcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxuXHRcdFx0XHQudGV4dChudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGQgPT4gZCAvIE1hdGgucG93KDEwLCBNYXRoLmNlaWwoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTAgLSAxZS0xMikpID09PSAxKSAvLyBQb3dlciBvZiBUZW5cblx0XHRcdFx0LnRleHQoMTApXG5cdFx0XHRcdC5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHQuYXR0cihcImR5XCIsIFwiLS43ZW1cIikgLy8gaHR0cHM6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay82NzM4MjI5XG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5zdGF0ZS5jdXJyZW50LndpZHRoIC0gdGhpcy54Rm9yQ29sb3JTY2FsZSgpfSwgMClgKTtcblx0fVxuXG5cdHhGb3JDb2xvclNjYWxlKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfcmlnaHQgK1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XG5cdH1cblxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLnhGb3JDb2xvclNjYWxlKCkgKyB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX2xlZnQgKyAyMDtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsTG9nIGFzIGQzU2NhbGVTZXF1ZW50aWFsTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XG5pbXBvcnQgQ29sb3JTY2FsZSBmcm9tIFwiLi9Db2xvclNjYWxlXCI7XG5pbXBvcnQge2NvbXBhcmVFcG9jaHMsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGUsIHBvaW50SW5SZWdpb259IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpblxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogICAtIElzIHByZWZlcmFibGUgdXNlIGBzY2F0dGVyYCBhcyBkYXRhLnR5cGVcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqICAgLSBbZDMtaW50ZXJwb2xhdGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1pbnRlcnBvbGF0ZSlcbiAqICAgLSBbZDMtY29sb3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1jb2xvcilcbiAqICAgLSBbZDMtc2NhbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZSlcbiAqICAgLSBbZDMtYnJ1c2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1icnVzaClcbiAqICAgLSBbZDMtYXhpc10oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWF4aXMpXG4gKiAgIC0gW2QzLWZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWZvcm1hdClcbiAqIEBjbGFzcyBwbHVnaW4tc3RhbmZvcmRcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1pbnRlcnBvbGF0ZVxuICogQHJlcXVpcmVzIGQzLWNvbG9yXG4gKiBAcmVxdWlyZXMgZDMtc2NhbGVcbiAqIEByZXF1aXJlcyBkMy1icnVzaFxuICogQHJlcXVpcmVzIGQzLWF4aXNcbiAqIEByZXF1aXJlcyBkMy1mb3JtYXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAYXVnbWVudHMgUGx1Z2luXG4gKiBAcmV0dXJucyB7U3RhbmZvcmR9XG4gKiBAZXhhbXBsZVxuICogLy8gUGx1Z2luIG11c3QgYmUgbG9hZGVkIGJlZm9yZSB0aGUgdXNlLlxuICogPHNjcmlwdCBzcmM9XCIkWU9VUl9QQVRIL3BsdWdpbi9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanNcIj48L3NjcmlwdD5cbiAqXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICAgICBjb2x1bW5zOiBbIC4uLiBdLFxuICogICAgICAgIHR5cGU6IFwic2NhdHRlclwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcbiAqICAgICAgICAgICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcbiAqICAgICAgICAgICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuICogICAgICAgICAgICksXG4gKiAgICAgICAgICAgZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdLFxuICogICAgICAgICAgIGxpbmVzOiBbXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuICogICAgICAgICAgICAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cbiAqICAgICAgICAgICBdLFxuICogICAgICAgICAgIHNjYWxlOiB7XG4gKiAgICAgICAgICAgXHRtYXg6IDEwMDAwLFxuICogICAgICAgICAgICAgXHRtaW46IDEsXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxuICogICAgICAgICAgICAgXHRmb3JtYXQ6ICdwb3cxMCcsXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XG4gKiAgICAgICAgICAgXHR0b3A6IDE1LFxuICogICAgICAgICAgIFx0cmlnaHQ6IDAsXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXG4gKiAgICAgICAgICAgXHRsZWZ0OiAwXG4gKiAgICAgICAgICAgfSxcbiAqICAgICAgICAgICByZWdpb25zOiBbXG4gKiAgICAgICAgICAgXHR7XG4gKiAgICAgICAgICAgICAgIFx0cG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2VcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogNDAsIHk6IDQwIH0sXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogNDAgfVxuICogICAgICAgICAgICAgICBcdF0sXG4gKiAgICAgICAgICAgICAgIFx0dGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG4gKiAgICAgICAgICAgICAgIFx0ICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuICogICAgICAgICAgICAgICBcdH0sXG4gKiAgICAgICAgICAgICAgIFx0b3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcbiAqICAgICAgICAgICAgICAgXHRjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcbiAqICAgICAgICAgICAgICB9LFxuICogICAgICAgICAgICAgXHQuLi5cbiAqICAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFN0YW5mb3JkIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuZXNtXCI7XG4gKlxuICogYmIuZ2VuZXJhdGUoe1xuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgU3RhbmZvcmQoeyAuLi4gfSlcbiAqICAgICBdXG4gKiB9KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XG5cdHByaXZhdGUgY29uZmlnO1xuXHRwcml2YXRlIGNvbG9yU2NhbGU7XG5cdHByaXZhdGUgZWxlbWVudHM7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGJlZm9yZUluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHQvLyBvdmVycmlkZSBvbiBjb25maWcgdmFsdWVzICYgbWV0aG9kc1xuXHRcdCQkLmNvbmZpZy5kYXRhX3hTb3J0ID0gZmFsc2U7XG5cdFx0JCQuaXNNdWx0aXBsZVggPSAoKSA9PiB0cnVlO1xuXHRcdCQkLnNob3dHcmlkRm9jdXMgPSAoKSA9PiB7fTtcblx0XHQkJC5sYWJlbGlzaERhdGEgPSBkID0+IGQudmFsdWVzO1xuXHRcdCQkLm9wYWNpdHlGb3JDaXJjbGUgPSAoKSA9PiAxO1xuXG5cdFx0Y29uc3QgZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQuYmluZCgkJCk7XG5cblx0XHQkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gKCkgPT4gKFxuXHRcdFx0Z2V0Q3VycmVudFBhZGRpbmdSaWdodCgpICsgKFxuXHRcdFx0XHR0aGlzLmNvbG9yU2NhbGUgPyB0aGlzLmNvbG9yU2NhbGUuZ2V0Q29sb3JTY2FsZVBhZGRpbmcoKSA6IDBcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcblx0XHQkJC5jb2xvciA9IHRoaXMuZ2V0U3RhbmZvcmRQb2ludENvbG9yLmJpbmQoJCQpO1xuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XG5cdFx0dGhpcy5lbGVtZW50cyA9IG5ldyBFbGVtZW50cyh0aGlzKTtcblxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcblx0XHR0aGlzLmluaXRTdGFuZm9yZERhdGEoKTtcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXG5cdFx0dGhpcy4kcmVkcmF3KCk7XG5cdH1cblxuXHQkcmVkcmF3KGR1cmF0aW9uPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xuXHRcdHRoaXMuZWxlbWVudHMgJiYgdGhpcy5lbGVtZW50cy51cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uKTtcblx0fVxuXG5cblx0Z2V0T3B0aW9ucygpOiBPcHRpb25zIHtcblx0XHRyZXR1cm4gbmV3IE9wdGlvbnMoKTtcblx0fVxuXG5cdGNvbnZlcnREYXRhKCk6IHZvaWQge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLiQkLmRhdGEudGFyZ2V0cztcblx0XHRjb25zdCBlcG9jaHMgPSB0aGlzLm9wdGlvbnMuZXBvY2hzO1xuXG5cdFx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xuXHRcdFx0ZC52YWx1ZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHR2LmVwb2NocyA9IGVwb2Noc1tpXTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkLm1pbkVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQubWF4RXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9yc2NhbGUgPSB1bmRlZmluZWQ7XG5cdFx0fSk7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9IHBhcnNlRGF0ZS5jYWxsKCQkLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XG5cdH1cblxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/IHNjYWxlLnkyIDogc2NhbGUueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxuXG5cdGluaXRTdGFuZm9yZERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Ly8gVE9ETyBTVEFORk9SRCBzZWUgaWYgKGRhdGEuanMgLT4gb3JkZXJUYXJnZXRzKSsgY2FuIGJlIHVzZWQgaW5zdGVhZFxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xuXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcblxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xuXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xuXHR9XG5cblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XG5cdH1cblxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXMuJCQ7XG5cblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcblx0XHRcdGNvbmZpZy50b29sdGlwX2NvbnRlbnRzID0gZnVuY3Rpb24oZCwgZGVmYXVsdFRpdGxlRm9ybWF0LCBkZWZhdWx0VmFsdWVGb3JtYXQsIGNvbG9yKSB7XG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcblxuXHRcdFx0XHRkLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQoY29uZmlnLmRhdGFfeCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LngpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodi5pZCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LnZhbHVlKX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0ciBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcE5hbWV9LSR7di5pZH1cIj5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwibmFtZVwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2NvbG9yKHYpfVwiPjwvc3Bhbj4ke2RlZmF1bHRUaXRsZUZvcm1hdChcIkVwb2Noc1wiKX08L3RkPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYuZXBvY2hzKX08L3RkPlxuXHRcdFx0XHRcdFx0PC90cj5gO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gYCR7aHRtbH08L3Rib2R5PjwvdGFibGU+YDtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Y291bnRFcG9jaHNJblJlZ2lvbihyZWdpb24pOiB7dmFsdWU6IG51bWJlciwgcGVyY2VudGFnZTogbnVtYmVyfSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdGNvbnN0IHRvdGFsID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+XG5cdFx0XHRhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKSwgMCk7XG5cblx0XHRjb25zdCB2YWx1ZSA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PiB7XG5cdFx0XHRpZiAocG9pbnRJblJlZ2lvbihjdXJyZW50VmFsdWUsIHJlZ2lvbikpIHtcblx0XHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XG5cdFx0fSwgMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWUsXG5cdFx0XHRwZXJjZW50YWdlOiB2YWx1ZSAhPT0gMCA/ICsodmFsdWUgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgxKSA6IDBcblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xuXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XG5cblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSkoKTtcbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5cbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7YnJ1c2hTZWxlY3Rpb24gYXMgZDNCcnVzaFNlbGVjdGlvbn0gZnJvbSBcImQzLWJydXNoXCI7XG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi9jb25maWcvY2xhc3Nlc1wiO1xuXG5leHBvcnQge1xuXHRhc0hhbGZQaXhlbCxcblx0YnJ1c2hFbXB0eSxcblx0Y2FsbEZuLFxuXHRjYXBpdGFsaXplLFxuXHRjZWlsMTAsXG5cdGNvbnZlcnRJbnB1dFR5cGUsXG5cdGRlZXBDbG9uZSxcblx0ZGlmZkRvbWFpbixcblx0ZW5kYWxsLFxuXHRlbXVsYXRlRXZlbnQsXG5cdGV4dGVuZCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzYm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVGFiVmlzaWJsZSxcblx0aXNVbmRlZmluZWQsXG5cdGlzVmFsdWUsXG5cdG1lcmdlQXJyYXksXG5cdG1lcmdlT2JqLFxuXHRub3RFbXB0eSxcblx0cGFyc2VEYXRlLFxuXHRzYW5pdGlzZSxcblx0c2V0VGV4dFZhbHVlLFxuXHRzb3J0VmFsdWUsXG5cdHRvQXJyYXksXG5cdHRwbFByb2Nlc3Ncbn07XG5cbmNvbnN0IGlzVmFsdWUgPSAodjogYW55KTogYm9vbGVhbiA9PiB2IHx8IHYgPT09IDA7XG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc051bWJlciA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNib29sZWFuID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcbmNvbnN0IGRpZmZEb21haW4gPSAoZDogbnVtYmVyW10pOiBudW1iZXIgPT4gZFsxXSAtIGRbMF07XG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpOiBib29sZWFuID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbi8qKlxuICogR2V0IHNwZWNpZmllZCBrZXkgdmFsdWUgZnJvbSBvYmplY3RcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IHZhbHVlXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xuXHRyZXR1cm4gaXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGxldCBmb3VuZCA9IGZhbHNlO1xuXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XG5cblx0cmV0dXJuIGZvdW5kO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xuXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcblx0cmV0dXJuIGlzRm47XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiBhZnRlciBhbGwgdHJhbnNpdGlvbnMgZW5kc1xuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdGxldCBuID0gMDtcblxuXHR0cmFuc2l0aW9uXG5cdFx0LmVhY2goKCkgPT4gKytuKVxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxuXHR0ZXh0OiBzdHJpbmcsXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2Vcbikge1xuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcblx0XHRub2RlLnRleHQodGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XG5cblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xuXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XG5cblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcblx0XHRcdFx0XHQudGV4dCh2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWN0U2VnTGlzdChwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnQpOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9W10ge1xuXHQvKlxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xuXHQgKiAqL1xuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcblxuXHRyZXR1cm4gW1xuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxuXHRcdHt4LCB5fSwgLy8gc2VnMVxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xuXHRdO1xufVxuXG4vKipcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRQYXRoQm94KFxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0ge30gU2VsZWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHt9LiRlbCBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcblx0bGV0IHNlbGVjdGlvbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldEJvdW5kaW5nUmVjdCA9IChub2RlKToge1xuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXG59ID0+IG5vZGUucmVjdCB8fCAobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbi8qKlxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYnJ1c2ggaXMgZW1wdHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBicnVzaEVtcHR5KGN0eCk6IGJvb2xlYW4ge1xuXHRjb25zdCBzZWxlY3Rpb24gPSBnZXRCcnVzaFNlbGVjdGlvbihjdHgpO1xuXG5cdGlmIChzZWxlY3Rpb24pIHtcblx0XHQvLyBicnVzaCBzZWxlY3RlZCBhcmVhXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxuXHRcdC8vIG9uZS1kaW1lbnNpb25hbDogW3gwLCB4MV0gb3IgW3kwLCB5MV1cblx0XHRyZXR1cm4gc2VsZWN0aW9uWzBdID09PSBzZWxlY3Rpb25bMV07XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBEZWVwIGNvcHkgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0TiBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBDbG9uZWQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWVwQ2xvbmUoLi4ub2JqZWN0Tikge1xuXHRjb25zdCBjbG9uZSA9IHYgPT4ge1xuXHRcdGlmIChpc09iamVjdCh2KSAmJiB2LmNvbnN0cnVjdG9yKSB7XG5cdFx0XHRjb25zdCByID0gbmV3IHYuY29uc3RydWN0b3IoKTtcblxuXHRcdFx0Zm9yIChjb25zdCBrIGluIHYpIHtcblx0XHRcdFx0cltrXSA9IGNsb25lKHZba10pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdjtcblx0fTtcblxuXHRyZXR1cm4gb2JqZWN0Ti5tYXAodiA9PiBjbG9uZSh2KSlcblx0XHQucmVkdWNlKChhLCBjKSA9PiAoXG5cdFx0XHR7Li4uYSwgLi4uY31cblx0XHQpKTtcbn1cblxuLyoqXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdHxBcnJheX0gc291cmNlIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XG5cdGlmIChpc0FycmF5KHNvdXJjZSkpIHtcblx0XHRzb3VyY2UuZm9yRWFjaCh2ID0+IGV4dGVuZCh0YXJnZXQsIHYpKTtcblx0fVxuXG5cdC8vIGV4Y2x1ZGUgbmFtZSB3aXRoIG9ubHkgbnVtYmVyc1xuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XG5cdFx0aWYgKC9eXFxkKyQvLnRlc3QocCkgfHwgcCBpbiB0YXJnZXQpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYXBpdGFsaXplZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGNhcGl0YWxpemUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuXG4vKipcbiAqIENvbnZlcnQgdG8gYXJyYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodjogQ1NTU3R5bGVEZWNsYXJhdGlvbiB8IGFueSk6IGFueSA9PiBbXS5zbGljZS5jYWxsKHYpO1xuXG4vKipcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xuICogQHBhcmFtIHtBcnJheX0gc3R5bGVTaGVldHMgVGhlIHN0eWxlc2hlZXRzIHRvIGdldCB0aGUgcnVsZXMgZnJvbVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XG5cdGxldCBydWxlcyA9IFtdO1xuXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcnVsZXM7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgU1ZHTWF0cml4IG9mIGFuIFNWR0dFbGVtZW50XG4gKiBAcGFyYW0ge1NWR0VsZW1lbnR9IG5vZGUgTm9kZSBlbGVtZW50XG4gKiBAcmV0dXJucyB7U1ZHTWF0cml4fSBtYXRyaXhcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFRyYW5zbGF0aW9uID0gbm9kZSA9PiB7XG5cdGNvbnN0IHRyYW5zZm9ybSA9IG5vZGUgPyBub2RlLnRyYW5zZm9ybSA6IG51bGw7XG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmJhc2VWYWw7XG5cblx0cmV0dXJuIGJhc2VWYWwgJiYgYmFzZVZhbC5udW1iZXJPZkl0ZW1zID9cblx0XHRiYXNlVmFsLmdldEl0ZW0oMCkubWF0cml4IDpcblx0XHR7YTogMCwgYjogMCwgYzogMCwgZDogMCwgZTogMCwgZjogMH07XG59O1xuXG4vKipcbiAqIEdldCB1bmlxdWUgdmFsdWUgZnJvbSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBTb3VyY2UgZGF0YVxuICogQHJldHVybnMge0FycmF5fSBVbmlxdWUgYXJyYXkgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZShkYXRhOiBhbnlbXSk6IGFueVtdIHtcblx0Y29uc3QgaXNEYXRlID0gZGF0YVswXSBpbnN0YW5jZW9mIERhdGU7XG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXG5cdFx0LmZpbHRlcigodiwgaSwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHYpID09PSBpKTtcblxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xufVxuXG4vKipcbiAqIE1lcmdlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgU291cmNlIGFycmF5XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XG5cdHJldHVybiBhcnIgJiYgYXJyLmxlbmd0aCA/IGFyci5yZWR1Y2UoKHAsIGMpID0+IHAuY29uY2F0KGMpKSA6IFtdO1xufVxuXG4vKipcbiAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0TiBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VPYmoodGFyZ2V0OiBvYmplY3QsIC4uLm9iamVjdE4pOiBhbnkge1xuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xuXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0IXRhcmdldFtrZXldICYmICh0YXJnZXRba2V5XSA9IHt9KTtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBpc0FycmF5KHZhbHVlKSA/XG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBtZXJnZU9iaih0YXJnZXQsIC4uLm9iamVjdE4pO1xufVxuXG4vKipcbiAqIFNvcnQgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgdmFsdWUgdG8gYmUgc29ydGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjIHRydWU6IGFzYywgZmFsc2U6IGRlc2NcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb3J0VmFsdWUoZGF0YTogYW55W10sIGlzQXNjID0gdHJ1ZSk6IGFueVtdIHtcblx0bGV0IGZuO1xuXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdGZuID0gaXNBc2MgPyAoYSwgYikgPT4gYSAtIGIgOiAoYSwgYikgPT4gYiAtIGE7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gYSAtIGI7XG5cdFx0fSBlbHNlIGlmICghaXNBc2MpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkYXRhLmNvbmNhdCgpLnNvcnQoZm4pO1xufVxuXG4vKipcbiAqIEdldCBtaW4vbWF4IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xuICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBkYXRhIHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfERhdGV8dW5kZWZpbmVkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0TWluTWF4KHR5cGU6IFwibWluXCIgfCBcIm1heFwiLCBkYXRhOiBudW1iZXJbXSB8IERhdGVbXSB8IGFueSk6IG51bWJlciB8IERhdGUgfCB1bmRlZmluZWQgfCBhbnkge1xuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XG5cblx0aWYgKHJlcy5sZW5ndGgpIHtcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xuXHRcdFx0cmVzID0gTWF0aFt0eXBlXSguLi5yZXMpO1xuXHRcdH0gZWxzZSBpZiAocmVzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlcyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIFN0ZXAgbnVtYmVyXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRSYW5nZSA9IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgc3RlcCA9IDEpOiBudW1iZXJbXSA9PiB7XG5cdGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcblx0Y29uc3QgbiA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCkpIHwgMDtcblxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcblx0XHRyZXMucHVzaChzdGFydCArIGkgKiBzdGVwKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59O1xuXG4vLyBlbXVsYXRlIGV2ZW50XG5jb25zdCBlbXVsYXRlRXZlbnQgPSB7XG5cdG1vdXNlOiAoKCkgPT4ge1xuXHRcdGNvbnN0IGdldFBhcmFtcyA9ICgpID0+ICh7XG5cdFx0XHRidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIHNjcmVlblg6IDAsIHNjcmVlblk6IDAsIGNsaWVudFg6IDAsIGNsaWVudFk6IDBcblx0XHR9KTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XG5cdFx0XHRuZXcgTW91c2VFdmVudChcInRcIik7XG5cblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMpKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Ly8gUG9seWZpbGxzIERPTTQgTW91c2VFdmVudFxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTW91c2VFdmVudC9pbml0TW91c2VFdmVudFxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdGV2ZW50VHlwZSxcblx0XHRcdFx0XHRwYXJhbXMuYnViYmxlcyxcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcblx0XHRcdFx0XHR3aW5kb3csXG5cdFx0XHRcdFx0MCwgLy8gdGhlIGV2ZW50J3MgbW91c2UgY2xpY2sgY291bnRcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXG5cdFx0XHRcdFx0cGFyYW1zLmNsaWVudFgsIHBhcmFtcy5jbGllbnRZLFxuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KSgpLFxuXHR0b3VjaDogKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xuXHRcdGNvbnN0IHRvdWNoT2JqID0gbmV3IFRvdWNoKG1lcmdlT2JqKHtcblx0XHRcdGlkZW50aWZpZXI6IERhdGUubm93KCksXG5cdFx0XHR0YXJnZXQ6IGVsLFxuXHRcdFx0cmFkaXVzWDogMi41LFxuXHRcdFx0cmFkaXVzWTogMi41LFxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXG5cdFx0XHRmb3JjZTogMC41XG5cdFx0fSwgcGFyYW1zKSk7XG5cblx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBUb3VjaEV2ZW50KGV2ZW50VHlwZSwge1xuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRzaGlmdEtleTogdHJ1ZSxcblx0XHRcdHRvdWNoZXM6IFt0b3VjaE9ial0sXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcblx0XHRcdGNoYW5nZWRUb3VjaGVzOiBbdG91Y2hPYmpdXG5cdFx0fSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlICAmIHJldHVybiBib3VuZCBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cGwgVGVtcGxhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdHBsUHJvY2Vzcyh0cGw6IHN0cmluZywgZGF0YTogb2JqZWN0KTogc3RyaW5nIHtcblx0bGV0IHJlcyA9IHRwbDtcblxuXHRmb3IgKGNvbnN0IHggaW4gZGF0YSkge1xuXHRcdHJlcyA9IHJlcy5yZXBsYWNlKG5ldyBSZWdFeHAoYHs9JHt4fX1gLCBcImdcIiksIGRhdGFbeF0pO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcGFyc2VkIGRhdGUgdmFsdWVcbiAqIChJdCBtdXN0IGJlIGNhbGxlZCBpbiAnQ2hhcnRJbnRlcm5hbCcgY29udGV4dClcbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSBkYXRlIFZhbHVlIG9mIGRhdGUgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7RGF0ZX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgYW55KTogRGF0ZSB7XG5cdGxldCBwYXJzZWREYXRlO1xuXG5cdGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdHBhcnNlZERhdGUgPSBkYXRlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nKGRhdGUpKSB7XG5cdFx0Y29uc3Qge2NvbmZpZywgZm9ybWF0fSA9IHRoaXM7XG5cblx0XHRwYXJzZWREYXRlID0gZm9ybWF0LmRhdGFUaW1lKGNvbmZpZy5kYXRhX3hGb3JtYXQpKGRhdGUpO1xuXHR9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGUpICYmICFpc05hTihkYXRlKSkge1xuXHRcdHBhcnNlZERhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XG5cdH1cblxuXHRpZiAoIXBhcnNlZERhdGUgfHwgaXNOYU4oK3BhcnNlZERhdGUpKSB7XG5cdFx0Y29uc29sZSAmJiBjb25zb2xlLmVycm9yICYmXG5cdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgeCAnJHtkYXRlfScgdG8gRGF0ZSBvYmplY3RgKTtcblx0fVxuXG5cdHJldHVybiBwYXJzZWREYXRlO1xufVxuXG4vKipcbiAqIFJldHVybiBpZiB0aGUgY3VycmVudCBkb2MgaXMgdmlzaWJsZSBvciBub3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNUYWJWaXNpYmxlKCk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gIWRvY3VtZW50LmhpZGRlbjtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxuICogQHBhcmFtIHtib29sZWFufSBtb3VzZSBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS5tb3VzZVxuICogQHBhcmFtIHtib29sZWFufSB0b3VjaCBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS50b3VjaFxuICogQHJldHVybnMge3N0cmluZ30gXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY29udmVydElucHV0VHlwZShtb3VzZTogYm9vbGVhbiwgdG91Y2g6IGJvb2xlYW4pOiBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsIHtcblx0bGV0IGlzTW9iaWxlID0gZmFsc2U7XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9Ccm93c2VyX2RldGVjdGlvbl91c2luZ190aGVfdXNlcl9hZ2VudCNNb2JpbGVfVGFibGV0X29yX0Rlc2t0b3Bcblx0aWYgKC9Nb2JpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSAmJiB0b3VjaCkge1xuXHRcdC8vIFNvbWUgRWRnZSBkZXNrdG9wIHJldHVybiB0cnVlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8yMDQxNzA3NC9cblx0XHRjb25zdCBoYXNUb3VjaFBvaW50cyA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgXCJtYXhUb3VjaFBvaW50c1wiIGluIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XG5cblx0XHQvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy90b3VjaGV2ZW50cy5qc1xuXHRcdC8vIE9uIElFMTEgd2l0aCBJRTkgZW11bGF0aW9uIG1vZGUsICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIGlzIHJldHVybmluZyB0cnVlXG5cdFx0Y29uc3QgaGFzVG91Y2ggPSAoXCJvbnRvdWNobW92ZVwiIGluIHdpbmRvdyB8fCAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpO1xuXG5cdFx0aXNNb2JpbGUgPSBoYXNUb3VjaFBvaW50cyB8fCBoYXNUb3VjaDtcblx0fVxuXG5cdGNvbnN0IGhhc01vdXNlID0gbW91c2UgJiYgIWlzTW9iaWxlID8gKFwib25tb3VzZW92ZXJcIiBpbiB3aW5kb3cpIDogZmFsc2U7XG5cblx0cmV0dXJuIChoYXNNb3VzZSAmJiBcIm1vdXNlXCIpIHx8IChpc01vYmlsZSAmJiBcInRvdWNoXCIpIHx8IG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9