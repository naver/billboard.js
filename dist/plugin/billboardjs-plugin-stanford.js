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
__webpack_require__.r(__webpack_exports__);

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

var Elements_Elements =
/*#__PURE__*/
function () {
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

var ColorScale_ColorScale =
/*#__PURE__*/
function () {
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
    }), this.colorScale.attr("transform", "translate(" + ($$.state.currentWidth - this.xForColorScale()) + ", 0)");
  }, _proto.xForColorScale = function xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  }, _proto.getColorScalePadding = function getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  }, ColorScale;
}();


// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stanford_Stanford; });




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
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */

var stanford_Stanford =
/*#__PURE__*/
function (_Plugin) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwicmVhZCIsInRoaXNDb25maWciLCJmaW5kIiwic2hpZnQiLCJpc09iamVjdFR5cGUiLCJ1bmRlZmluZWQiLCJzcGxpdCIsImlzRGVmaW5lZCIsIk9wdGlvbnMiLCJjb2xvcnMiLCJlcG9jaHMiLCJzY2FsZV9taW4iLCJzY2FsZV9tYXgiLCJzY2FsZV93aWR0aCIsInNjYWxlX2Zvcm1hdCIsInBhZGRpbmdfdG9wIiwicGFkZGluZ19yaWdodCIsInBhZGRpbmdfYm90dG9tIiwicGFkZGluZ19sZWZ0IiwicG9pbnRJblJlZ2lvbiIsInBvaW50IiwieCIsInkiLCJ2YWx1ZSIsImluc2lkZSIsImkiLCJqIiwibGVuZ3RoIiwieGkiLCJ5aSIsInhqIiwieWoiLCJjb21wYXJlRXBvY2hzIiwiYSIsImIiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiZiIsIkVsZW1lbnRzIiwib3duZXIiLCJlbGVtZW50cyIsIiQkIiwiJGVsIiwibWFpbiIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudFdpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsIndpZHRoIiwiZ2V0Q29sb3JTY2FsZVBhZGRpbmciLCJTdGFuZm9yZCIsImRhdGFfeFNvcnQiLCJpc011bHRpcGxlWCIsInNob3dHcmlkRm9jdXMiLCJsYWJlbGlzaERhdGEiLCJ2YWx1ZXMiLCJvcGFjaXR5Rm9yQ2lyY2xlIiwiZ2V0Q3VycmVudFBhZGRpbmdSaWdodCIsImNvbG9yIiwiZ2V0U3RhbmZvcmRQb2ludENvbG9yIiwiY29udmVydERhdGEiLCJpbml0U3RhbmZvcmREYXRhIiwic2V0U3RhbmZvcmRUb29sdGlwIiwiZ2V0T3B0aW9ucyIsInYiLCJjb2xvcnNjYWxlIiwic29ydCIsImlzTmFOIiwibWluIiwibWF4IiwiZDNJbnRlcnBvbGF0ZUhzbExvbmciLCJkM0hzbCIsImQzU2NhbGVTZXF1ZW50aWFsTG9nIiwiaXNFbXB0eSIsInRvb2x0aXBfY29udGVudHMiLCJkZWZhdWx0VGl0bGVGb3JtYXQiLCJkZWZhdWx0VmFsdWVGb3JtYXQiLCJodG1sIiwiZGF0YV94IiwiaWQiLCJ0b3RhbCIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiY3VycmVudFZhbHVlIiwidG9GaXhlZCIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJEYXRlIiwibm90RW1wdHkiLCJpc0FycmF5IiwiYXJyIiwiQXJyYXkiLCJpc09iamVjdCIsIm9iaiIsIm5vZGVUeXBlIiwiZ2V0T3B0aW9uIiwiZGVmYXVsdFZhbHVlIiwiaGFzVmFsdWUiLCJkaWN0IiwiZm91bmQiLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiZW5kYWxsIiwiY2IiLCJlYWNoIiwib24iLCJhcHBseSIsInNhbml0aXNlIiwic3RyIiwicmVwbGFjZSIsInNldFRleHRWYWx1ZSIsImR5IiwidG9NaWRkbGUiLCJkaWZmIiwibXVsdGlsaW5lIiwibGVuIiwiZ2V0UmVjdFNlZ0xpc3QiLCJwYXRoIiwiZ2V0UGF0aEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1zIiwiZ2V0QnJ1c2hTZWxlY3Rpb24iLCJzZWxlY3Rpb24iLCJldmVudCIsImQzRXZlbnQiLCJzdWJjaGFydCIsInR5cGUiLCJkM0JydXNoU2VsZWN0aW9uIiwiZ2V0Qm91bmRpbmdSZWN0IiwicmVjdCIsImdldFJhbmRvbSIsImFzU3RyIiwicmFuZCIsInJhbmRvbSIsImJydXNoRW1wdHkiLCJjdHgiLCJleHRlbmQiLCJzb3VyY2UiLCJwIiwidGVzdCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJjIiwiZ2V0VW5pcXVlIiwiaXNEYXRlIiwiTnVtYmVyIiwibWVyZ2VBcnJheSIsIm1lcmdlT2JqIiwib2JqZWN0TiIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJnZXRNaW5NYXgiLCJyZXMiLCJzdGFydCIsImVuZCIsInN0ZXAiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJ0b3VjaCIsInRvdWNoT2JqIiwiVG91Y2giLCJpZGVudGlmaWVyIiwibm93IiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbkFuZ2xlIiwiZm9yY2UiLCJUb3VjaEV2ZW50Iiwic2hpZnRLZXkiLCJ0b3VjaGVzIiwidGFyZ2V0VG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwidHBsUHJvY2VzcyIsInRwbCIsIlJlZ0V4cCIsImRhdGUiLCJwYXJzZWREYXRlIiwiZm9ybWF0IiwiZGF0YVRpbWUiLCJkYXRhX3hGb3JtYXQiLCJpc1RhYlZpc2libGUiLCJoaWRkZW4iLCJjb252ZXJ0SW5wdXRUeXBlIiwiaXNNb2JpbGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJoYXNUb3VjaFBvaW50cyIsIm1heFRvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJEb2N1bWVudFRvdWNoIiwiaGFzTW91c2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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MkosYUFONUMsRUFJckQ7QUFDQTs7QUFHQU4sWUFBUSxHQUFHRyxjQUFjLElBQUlFLFFBUndCO0FBU3JEOztBQUVELE1BQU1FLFFBQVEsS0FBRyxDQUFBaEQsS0FBSyxJQUFLeUMsUUFBYixLQUF5QixpQkFBaUJySixHQUF4RDtBQUVBLFNBQVE0SixRQUFRLElBQUksT0FBYixJQUEwQlAsUUFBUSxJQUFJLE9BQXRDLElBQWtELElBQXpEO0FBQ0EsQyIsImZpbGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJzdGFuZm9yZFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1pbnRlcnBvbGF0ZVwiLCBcImQzLWNvbG9yXCIsIFwiZDMtc2NhbGVcIiwgXCJkMy1icnVzaFwiLCBcImQzLWF4aXNcIiwgXCJkMy1mb3JtYXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3RhbmZvcmRcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE2KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxyXG4gKiBAY2xhc3MgUGx1Z2luXHJcbiAqL1xyXG4vKipcclxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXHJcbiAqIEBuYW1lIHZlcnNpb25cclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyb2YgUGx1Z2luXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBleGFtcGxlXHJcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XHJcblx0cHVibGljICQkO1xyXG5cdHB1YmxpYyBvcHRpb25zO1xyXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuMC1hbHBoYVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGJlZm9yZUluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkYWZ0ZXJJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHJlZHJhdygpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHdpbGxEZXN0cm95KCkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fN19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0YXJjOiBcImJiLWFyY1wiLFxyXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxyXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxyXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxyXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXHJcblx0YXhpczogXCJiYi1heGlzXCIsXHJcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXHJcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcclxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcclxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxyXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcclxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxyXG5cdGJhcjogXCJiYi1iYXJcIixcclxuXHRiYXJzOiBcImJiLWJhcnNcIixcclxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxyXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcclxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxyXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXHJcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXHJcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcclxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcclxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXHJcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxyXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxyXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXHJcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcclxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxyXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcclxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXHJcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXHJcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcclxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXHJcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxyXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxyXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXHJcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXHJcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxyXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXHJcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcclxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxyXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcclxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcclxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxyXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxyXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcclxuXHRncmlkOiBcImJiLWdyaWRcIixcclxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxyXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcclxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXHJcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXHJcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxyXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXHJcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXHJcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxyXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXHJcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxyXG5cdGxpbmU6IFwiYmItbGluZVwiLFxyXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXHJcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxyXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXHJcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcclxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXHJcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxyXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXHJcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxyXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxyXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXHJcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxyXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxyXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXHJcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcclxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcclxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXHJcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXHJcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcclxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXHJcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcclxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXHJcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxyXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXHJcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxyXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXHJcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxyXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcclxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxyXG5cdHpvb21SZWN0OiBcImJiLXpvb20tcmVjdFwiLFxyXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcclxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXHJcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxyXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XHJcblxyXG4vKipcclxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XHJcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xyXG5cdGxldCB0YXJnZXQ7XHJcblx0bGV0IGtleXM7XHJcblx0bGV0IHJlYWQ7XHJcblxyXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XHJcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XHJcblxyXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcclxuXHRcdFx0cmV0dXJuIGZpbmQoKTtcclxuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fTtcclxuXHJcblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xyXG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XHJcblx0XHRyZWFkID0gZmluZCgpO1xyXG5cclxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcclxuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBvcHRpb24gY2xhc3NcclxuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xyXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7U3RhbmZvcmRPcHRpb25zfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXHJcblx0XHRcdCAqIEBuYW1lIGNvbG9yc1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cclxuXHRcdFx0ICogQGRlZmF1bHQgdW5kZWZpbmVkXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXHJcblx0XHRcdCAqICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcclxuXHRcdFx0ICogICApXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRjb2xvcnM6IHVuZGVmaW5lZCxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTcGVjaWZ5IHRoZSBrZXkgb2YgZXBvY2hzIHZhbHVlcyBpbiB0aGUgZGF0YS5cclxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcclxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxyXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiBcdGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0ZXBvY2hzOiA8bnVtYmVyW10+IFtdLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXHJcblx0XHRcdCAqIC0gRWFjaCBsaW5lIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxyXG5cdFx0XHQgKlxyXG5cdFx0XHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XHJcblx0XHRcdCAqIHwgLS0tIHwgLS0tIHwgLS0tIHxcclxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxyXG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XHJcblx0XHRcdCAqIHwgeDIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyAgfFxyXG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxyXG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XHJcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxyXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgIGxpbmVzOiBbXHJcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxyXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cclxuXHRcdFx0ICogICBdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRsaW5lczogW10sXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IHNjYWxlIHZhbHVlc1xyXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbc2NhbGVdIHNjYWxlIG9iamVjdFxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUubWF4PXVuZGVmaW5lZF0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGhpZ2hlc3QgdmFsdWUgaW4gZXBvY2hzXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxyXG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogIHNjYWxlOiB7XHJcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXHJcblx0XHRcdCAqICAgIG1pbjogMSxcclxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcclxuXHRcdFx0ICpcclxuXHRcdFx0ICogICAgLy8gc3BlY2lmeSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTBcclxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXHJcblx0XHRcdCAqXHJcblx0XHRcdCAqICAgIC8vIG9yIHNwZWNpZnkgYSBmb3JtYXQgZnVuY3Rpb25cclxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XHJcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xyXG5cdFx0XHQgKiAgICB9XHJcblx0XHRcdCAqICB9LFxyXG5cdFx0XHQgKi9cclxuXHRcdFx0c2NhbGVfbWluOiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxyXG5cdFx0XHRzY2FsZV9tYXg6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXHJcblx0XHRcdHNjYWxlX3dpZHRoOiA8bnVtYmVyfHVuZGVmaW5lZD4gMjAsXHJcblx0XHRcdHNjYWxlX2Zvcm1hdDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBUaGUgcGFkZGluZyBmb3IgY29sb3Igc2NhbGUgZWxlbWVudFxyXG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcclxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cclxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtwYWRkaW5nXSBwYWRkaW5nIG9iamVjdFxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcucmlnaHQ9MF0gUmlnaHQgcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgcGFkZGluZzoge1xyXG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcclxuXHRcdFx0ICogICAgIHJpZ2h0OiAwLFxyXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxyXG5cdFx0XHQgKiAgICAgbGVmdDogMFxyXG5cdFx0XHQgKiAgfSxcclxuXHRcdFx0ICovXHJcblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxyXG5cdFx0XHRwYWRkaW5nX3JpZ2h0OiAwLFxyXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcclxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cclxuXHRcdFx0ICogLSBFYWNoIHJlZ2lvbiBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcclxuXHRcdFx0ICpcclxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcclxuXHRcdFx0ICogICB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8XHJcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XHJcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XHJcblx0XHRcdCAqICAgfCB0ZXh0IHwgRnVuY3Rpb24gfCAgfCAmbHQ7b3B0aW9uYWw+IHwgVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGFuZCBwZXJjZW50YWdlIG9mIHRoZSBudW1iZXIgb2YgZXBvY2hzIGluIHRoaXMgcmVnaW9uLjxicj5SZXR1cm4gYSBzdHJpbmcgdG8gcGxhY2UgdGV4dCBpbiB0aGUgbWlkZGxlIG9mIHRoZSByZWdpb24uIHxcclxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcclxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdFx0ICogQGRlZmF1bHQgW11cclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogICByZWdpb25zOiBbXHJcblx0XHRcdCAqICAgICAgIHtcclxuXHRcdFx0ICogICAgICAgICAgIHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXHJcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXHJcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcclxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDQwIH0sXHJcblx0XHRcdCAqICAgICAgICAgICBdLFxyXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XHJcblx0XHRcdCAqICAgICAgICAgICAgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XHJcblx0XHRcdCAqICAgICAgICAgICB9LFxyXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcclxuXHRcdFx0ICogICAgICAgICAgIGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxyXG5cdFx0XHQgKiAgICAgICB9LFxyXG5cdFx0XHQgKiAgICAgICAuLi5cclxuXHRcdFx0ICogICBdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRyZWdpb25zOiBbXVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcclxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXHJcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcclxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXHJcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXHJcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Z2V0UmFuZ2UsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuLi8uLi9tb2R1bGUvdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHBvaW50IGlzIGluIHJlZ2lvblxyXG4gKiBAcGFyYW0ge29iamVjdH0gcG9pbnQgUG9pbnRcclxuICogQHBhcmFtIHtBcnJheX0gcmVnaW9uIFJlZ2lvblxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbik6IGJvb2xlYW4geyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcclxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cclxuXHQvLyBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXHJcblx0Y29uc3QgeCA9IHBvaW50Lng7XHJcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xyXG5cdGxldCBpbnNpZGUgPSBmYWxzZTtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcclxuXHRcdGNvbnN0IHhpID0gcmVnaW9uW2ldLng7XHJcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xyXG5cclxuXHRcdGNvbnN0IHhqID0gcmVnaW9uW2pdLng7XHJcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xyXG5cclxuXHRcdGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XHJcblxyXG5cdFx0aWYgKGludGVyc2VjdCkge1xyXG5cdFx0XHRpbnNpZGUgPSAhaW5zaWRlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGluc2lkZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgZXBvY2hzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhIFRhcmdldFxyXG4gKiBAcGFyYW0ge29iamVjdH0gYiBTb3VyY2VcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYik6IG51bWJlciB7XHJcblx0aWYgKGEuZXBvY2hzIDwgYi5lcG9jaHMpIHtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblxyXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XHJcblx0XHRyZXR1cm4gMTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAwO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHJlZ2lvbiBhcmVhXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKTogbnVtYmVyIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxyXG5cdGxldCBhcmVhID0gMDtcclxuXHRsZXQgcG9pbnQxO1xyXG5cdGxldCBwb2ludDI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xyXG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xyXG5cdFx0cG9pbnQyID0gcG9pbnRzW2pdO1xyXG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xyXG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xyXG5cdH1cclxuXHJcblx0YXJlYSAvPSAyO1xyXG5cclxuXHRyZXR1cm4gYXJlYTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBjZW50cm9pZFxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgUG9pbnRzXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcclxuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xyXG5cclxuXHRsZXQgeCA9IDA7XHJcblx0bGV0IHkgPSAwO1xyXG5cdGxldCBmO1xyXG5cclxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcclxuXHRcdGNvbnN0IHBvaW50MSA9IHBvaW50c1tpXTtcclxuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcclxuXHJcblx0XHRmID0gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50Mi54ICogcG9pbnQxLnk7XHJcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XHJcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XHJcblx0fVxyXG5cclxuXHRmID0gYXJlYSAqIDY7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHR4OiB4IC8gZixcclxuXHRcdHk6IHkgLyBmXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuXHRjb21wYXJlRXBvY2hzLFxyXG5cdGdldENlbnRyb2lkLFxyXG5cdGdldFJhbmdlLFxyXG5cdGdldFJlZ2lvbkFyZWEsXHJcblx0aXNFbXB0eSxcclxuXHRpc0Z1bmN0aW9uLFxyXG5cdGlzU3RyaW5nLFxyXG5cdHBhcnNlRGF0ZSxcclxuXHRwb2ludEluUmVnaW9uXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLy8gQHRzLW5vY2hlY2tcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IHtnZXRDZW50cm9pZCwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGVsZW1lbnQgY2xhc3NcclxuICogQGNsYXNzIENvbG9yU2NhbGVcclxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcclxuXHRwcml2YXRlIG93bmVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xyXG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xyXG5cclxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxyXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBvd25lci4kJC4kZWwubWFpbi5zZWxlY3QoXCIuYmItY2hhcnRcIilcclxuXHRcdFx0LmFwcGVuZChcImdcIilcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcclxuXHJcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcclxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XHJcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xyXG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cclxuXHRcdC8vIFN0YW5mb3JkLUxpbmVzXHJcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxyXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcclxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lfWApXHJcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcclxuXHJcblx0XHQvLyBleGl0XHJcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXHJcblx0XHRcdC5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyBlbnRlclxyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkTGluZUVudGVyLmFwcGVuZChcImxpbmVcIilcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcblxyXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXJcclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxyXG5cdFx0XHQuc2VsZWN0KFwibGluZVwiKVxyXG5cdFx0XHQudHJhbnNpdGlvbigpXHJcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcclxuXHRcdFx0LmF0dHIoXCJ4MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkxXCIpIDogeHZDdXN0b20oZCwgXCJ4MVwiKSkpXHJcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxyXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcclxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngyXCIpIDogeXZDdXN0b20oZCwgXCJ5MlwiKSkpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XHJcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcclxuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XHJcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XHJcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XHJcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xyXG5cclxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcclxuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcclxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb259YClcclxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XHJcblxyXG5cdFx0Ly8gZXhpdFxyXG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXHJcblx0XHRcdC5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyBlbnRlclxyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcclxuXHJcblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInBvbHlnb25cIilcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcblxyXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJ0ZXh0XCIpXHJcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XHJcblxyXG5cdFx0Ly8gdXBkYXRlXHJcblx0XHRzdGFuZm9yZFJlZ2lvblxyXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcclxuXHRcdFx0LnNlbGVjdChcInBvbHlnb25cIilcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5hdHRyKFwicG9pbnRzXCIsIGQgPT4gZC5wb2ludHMubWFwKHZhbHVlID0+IFtcclxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcclxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxyXG5cdFx0XHRdLmpvaW4oXCIsXCIpKS5qb2luKFwiIFwiKSlcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xyXG5cclxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcclxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxyXG5cdFx0XHQudGV4dChkID0+IHtcclxuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XHJcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxyXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uID0gMCk6IHZvaWQge1xyXG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcclxuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcclxuXHR9XHJcblxyXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xyXG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcclxuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xyXG5cclxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XHJcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcclxuXHRcdH0gZWxzZSBpZiAoYXhpcy5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XHJcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnNjYWxlLnkyIDogJCQuc2NhbGUueTtcclxuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcclxuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcclxuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWwgYXMgZDNTY2FsZVNlcXVlbnRpYWwsIHNjYWxlTG9nIGFzIGQzU2NhbGVMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG4vKipcclxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcclxuICogQGNsYXNzIENvbG9yU2NhbGVcclxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xyXG5cdHByaXZhdGUgb3duZXI7XHJcblx0cHJpdmF0ZSBjb2xvclNjYWxlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xyXG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xyXG5cdH1cclxuXHJcblx0ZHJhd0NvbG9yU2NhbGUoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7JCQsIGNvbmZpZ30gPSB0aGlzLm93bmVyO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xyXG5cdFx0Y29uc3QgaGVpZ2h0ID0gJCQuc3RhdGUuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmdfYm90dG9tIC0gY29uZmlnLnBhZGRpbmdfdG9wO1xyXG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XHJcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xyXG5cdFx0Y29uc3QgcG9pbnRzID0gZ2V0UmFuZ2UoY29uZmlnLnBhZGRpbmdfYm90dG9tLCBoZWlnaHQsIGJhckhlaWdodCk7XHJcblxyXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcclxuXHRcdFx0LmRvbWFpbihbcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSwgcG9pbnRzWzBdXSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xyXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUucmVtb3ZlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gJCQuJGVsLnN2Zy5hcHBlbmQoXCJnXCIpXHJcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXHJcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5jb2xvclNjYWxlKTtcclxuXHJcblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxyXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7Y29uZmlnLnBhZGRpbmdfdG9wfSlgKVxyXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxyXG5cdFx0XHQuZGF0YShwb2ludHMpXHJcblx0XHRcdC5lbnRlcigpXHJcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXHJcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJ4XCIsIDApXHJcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXHJcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJmaWxsXCIsIGQgPT4gaW52ZXJzZVNjYWxlKGQpKTtcclxuXHJcblx0XHQvLyBMZWdlbmQgQXhpc1xyXG5cdFx0Y29uc3QgYXhpc1NjYWxlID0gZDNTY2FsZUxvZygpXHJcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxyXG5cdFx0XHQucmFuZ2UoW1xyXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcCArIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gKyBiYXJIZWlnaHQgLSAxLFxyXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxyXG5cdFx0XHRdKTtcclxuXHJcblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcclxuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcclxuXHJcblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xyXG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XHJcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2NhbGVGb3JtYXQpKSB7XHJcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoZDNGb3JtYXQoXCJkXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IEF4aXNcclxuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxyXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcclxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke2JhcldpZHRofSwwKWApXHJcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xyXG5cclxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XHJcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxyXG5cdFx0XHRcdC50ZXh0KG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihkID0+IGQgLyBNYXRoLnBvdygxMCwgTWF0aC5jZWlsKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwIC0gMWUtMTIpKSA9PT0gMSkgLy8gUG93ZXIgb2YgVGVuXHJcblx0XHRcdFx0LnRleHQoMTApXHJcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXHJcblx0XHRcdFx0LmF0dHIoXCJkeVwiLCBcIi0uN2VtXCIpIC8vIGh0dHBzOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svNjczODIyOVxyXG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5zdGF0ZS5jdXJyZW50V2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xyXG5cdH1cclxuXHJcblx0eEZvckNvbG9yU2NhbGUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX3JpZ2h0ICtcclxuXHRcdFx0dGhpcy5jb2xvclNjYWxlLm5vZGUoKS5nZXRCQm94KCkud2lkdGg7XHJcblx0fVxyXG5cclxuXHRnZXRDb2xvclNjYWxlUGFkZGluZygpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMueEZvckNvbG9yU2NhbGUoKSArIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfbGVmdCArIDIwO1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8vIEB0cy1ub2NoZWNrXHJcbmltcG9ydCB7aW50ZXJwb2xhdGVIc2xMb25nIGFzIGQzSW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcclxuaW1wb3J0IHtoc2wgYXMgZDNIc2x9IGZyb20gXCJkMy1jb2xvclwiO1xyXG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbExvZyBhcyBkM1NjYWxlU2VxdWVudGlhbExvZ30gZnJvbSBcImQzLXNjYWxlXCI7XHJcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vLi4vY29uZmlnL2NsYXNzZXNcIjtcclxuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xyXG5pbXBvcnQgUGx1Z2luIGZyb20gXCIuLi9QbHVnaW5cIjtcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xyXG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcclxuaW1wb3J0IENvbG9yU2NhbGUgZnJvbSBcIi4vQ29sb3JTY2FsZVwiO1xyXG5pbXBvcnQge2NvbXBhcmVFcG9jaHMsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGUsIHBvaW50SW5SZWdpb259IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbi8qKlxyXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpblxyXG4gKiAtICoqTk9URToqKlxyXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXHJcbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxyXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxyXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxyXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcclxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxyXG4gKiAgIC0gW2QzLWNvbG9yXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtY29sb3IpXHJcbiAqICAgLSBbZDMtc2NhbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZSlcclxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxyXG4gKiAgIC0gW2QzLWF4aXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1heGlzKVxyXG4gKiAgIC0gW2QzLWZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWZvcm1hdClcclxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxyXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXHJcbiAqIEByZXF1aXJlcyBkMy1pbnRlcnBvbGF0ZVxyXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcclxuICogQHJlcXVpcmVzIGQzLXNjYWxlXHJcbiAqIEByZXF1aXJlcyBkMy1icnVzaFxyXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xyXG4gKiBAcmVxdWlyZXMgZDMtZm9ybWF0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXHJcbiAqIEBhdWdtZW50cyBQbHVnaW5cclxuICogQHJldHVybnMge1N0YW5mb3JkfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xyXG4gKiAgICAgZGF0YToge1xyXG4gKiAgICAgICAgY29sdW1uczogWyAuLi4gXSxcclxuICogICAgICAgIHR5cGU6IFwic2NhdHRlclwiXHJcbiAqICAgICB9XHJcbiAqICAgICAuLi5cclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xyXG4gKiAgICAgICAgICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXHJcbiAqICAgICAgICAgICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxyXG4gKiAgICAgICAgICAgKSxcclxuICogICAgICAgICAgIGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXSxcclxuICogICAgICAgICAgIGxpbmVzOiBbXHJcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXHJcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XHJcbiAqICAgICAgICAgICBdLFxyXG4gKiAgICAgICAgICAgc2NhbGU6IHtcclxuICogICAgICAgICAgIFx0bWF4OiAxMDAwMCxcclxuICogICAgICAgICAgICAgXHRtaW46IDEsXHJcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXHJcbiAqICAgICAgICAgICAgIFx0Zm9ybWF0OiAncG93MTAnLFxyXG4gKiAgICAgICAgICAgfSxcclxuICogICAgICAgICAgIHBhZGRpbmc6IHtcclxuICogICAgICAgICAgIFx0dG9wOiAxNSxcclxuICogICAgICAgICAgIFx0cmlnaHQ6IDAsXHJcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcclxuICogICAgICAgICAgIFx0bGVmdDogMFxyXG4gKiAgICAgICAgICAgfSxcclxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcclxuICogICAgICAgICAgIFx0e1xyXG4gKiAgICAgICAgICAgICAgIFx0cG9pbnRzOiBbIC8vIGFkZCBwb2ludHMgY291bnRlci1jbG9ja3dpc2VcclxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcclxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDQwLCB5OiA0MCB9LFxyXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHsgeDogMCwgeTogNDAgfVxyXG4gKiAgICAgICAgICAgICAgIFx0XSxcclxuICogICAgICAgICAgICAgICBcdHRleHQ6IGZ1bmN0aW9uICh2YWx1ZSwgcGVyY2VudGFnZSkge1xyXG4gKiAgICAgICAgICAgICAgIFx0ICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xyXG4gKiAgICAgICAgICAgICAgIFx0fSxcclxuICogICAgICAgICAgICAgICBcdG9wYWNpdHk6IDAuMiwgLy8gMCB0byAxXHJcbiAqICAgICAgICAgICAgICAgXHRjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcclxuICogICAgICAgICAgICAgIH0sXHJcbiAqICAgICAgICAgICAgIFx0Li4uXHJcbiAqICAgICAgICAgICBdXHJcbiAqICAgICAgICB9XHJcbiAqICAgICBdXHJcbiAqICB9KTtcclxuICogQGV4YW1wbGVcclxuICpcdGltcG9ydCB7YmJ9IGZyb20gXCJiaWxsYm9hcmQuanNcIjtcclxuICogaW1wb3J0IFN0YW5mb3JkIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmRcIjtcclxuICpcclxuICogYmIuZ2VuZXJhdGUoe1xyXG4gKiAgICAgcGx1Z2luczogW1xyXG4gKiAgICAgICAgbmV3IFN0YW5mb3JkKHsgLi4uIH0pXHJcbiAqICAgICBdXHJcbiAqIH0pXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZm9yZCBleHRlbmRzIFBsdWdpbiB7XHJcblx0cHJpdmF0ZSBjb25maWc7XHJcblx0cHJpdmF0ZSBjb2xvclNjYWxlO1xyXG5cdHByaXZhdGUgZWxlbWVudHM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHRcdHN1cGVyKG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0JGJlZm9yZUluaXQoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcclxuXHJcblx0XHQvLyBvdmVycmlkZSBvbiBjb25maWcgdmFsdWVzICYgbWV0aG9kc1xyXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcclxuXHRcdCQkLmlzTXVsdGlwbGVYID0gKCkgPT4gdHJ1ZTtcclxuXHRcdCQkLnNob3dHcmlkRm9jdXMgPSAoKSA9PiB7fTtcclxuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XHJcblx0XHQkJC5vcGFjaXR5Rm9yQ2lyY2xlID0gKCkgPT4gMTtcclxuXHJcblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcclxuXHJcblx0XHQkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gKCkgPT4gKFxyXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXHJcblx0XHRcdFx0dGhpcy5jb2xvclNjYWxlID8gdGhpcy5jb2xvclNjYWxlLmdldENvbG9yU2NhbGVQYWRkaW5nKCkgOiAwXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHQkaW5pdCgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xyXG5cclxuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xyXG5cdFx0JCQuY29sb3IgPSB0aGlzLmdldFN0YW5mb3JkUG9pbnRDb2xvci5iaW5kKCQkKTtcclxuXHJcblx0XHR0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JTY2FsZSh0aGlzKTtcclxuXHRcdHRoaXMuZWxlbWVudHMgPSBuZXcgRWxlbWVudHModGhpcyk7XHJcblxyXG5cdFx0dGhpcy5jb252ZXJ0RGF0YSgpO1xyXG5cdFx0dGhpcy5pbml0U3RhbmZvcmREYXRhKCk7XHJcblx0XHR0aGlzLnNldFN0YW5mb3JkVG9vbHRpcCgpO1xyXG5cdFx0dGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XHJcblxyXG5cdFx0dGhpcy4kcmVkcmF3KCk7XHJcblx0fVxyXG5cclxuXHQkcmVkcmF3KGR1cmF0aW9uPzogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLmNvbG9yU2NhbGUgJiYgdGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XHJcblx0XHR0aGlzLmVsZW1lbnRzICYmIHRoaXMuZWxlbWVudHMudXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbik7XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0T3B0aW9ucygpOiBPcHRpb25zIHtcclxuXHRcdHJldHVybiBuZXcgT3B0aW9ucygpO1xyXG5cdH1cclxuXHJcblx0Y29udmVydERhdGEoKTogdm9pZCB7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy4kJC5kYXRhLnRhcmdldHM7XHJcblx0XHRjb25zdCBlcG9jaHMgPSB0aGlzLm9wdGlvbnMuZXBvY2hzO1xyXG5cclxuXHRcdGRhdGEuZm9yRWFjaChkID0+IHtcclxuXHRcdFx0ZC52YWx1ZXMuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG5cdFx0XHRcdHYuZXBvY2hzID0gZXBvY2hzW2ldO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGQubWluRXBvY2hzID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRkLm1heEVwb2NocyA9IHVuZGVmaW5lZDtcclxuXHRcdFx0ZC5jb2xvcnMgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGQuY29sb3JzY2FsZSA9IHVuZGVmaW5lZDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0eHZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XHJcblx0XHRjb25zdCAkJCA9IHRoaXM7XHJcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xyXG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XHJcblxyXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcclxuXHRcdFx0dmFsdWUgPSBwYXJzZURhdGUuY2FsbCgkJCwgdmFsdWUpO1xyXG5cdFx0fSBlbHNlIGlmIChheGlzLmlzQ2F0ZWdvcml6ZWQoKSAmJiBpc1N0cmluZyh2YWx1ZSkpIHtcclxuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xyXG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xyXG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gc2NhbGUueTIgOiBzY2FsZS55O1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xyXG5cdH1cclxuXHJcblx0aW5pdFN0YW5mb3JkRGF0YSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcztcclxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuJCQuZGF0YS50YXJnZXRzWzBdO1xyXG5cclxuXHRcdC8vIFRPRE8gU1RBTkZPUkQgc2VlIGlmIChkYXRhLmpzIC0+IG9yZGVyVGFyZ2V0cykrIGNhbiBiZSB1c2VkIGluc3RlYWRcclxuXHRcdC8vIE1ha2UgbGFyZ2VyIHZhbHVlcyBhcHBlYXIgb24gdG9wXHJcblx0XHR0YXJnZXQudmFsdWVzLnNvcnQoY29tcGFyZUVwb2Nocyk7XHJcblxyXG5cdFx0Ly8gR2V0IGFycmF5IG9mIGVwb2Noc1xyXG5cdFx0Y29uc3QgZXBvY2hzID0gdGFyZ2V0LnZhbHVlcy5tYXAoYSA9PiBhLmVwb2Nocyk7XHJcblxyXG5cdFx0dGFyZ2V0Lm1pbkVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWluKSA/IGNvbmZpZy5zY2FsZV9taW4gOiBNYXRoLm1pbiguLi5lcG9jaHMpO1xyXG5cdFx0dGFyZ2V0Lm1heEVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWF4KSA/IGNvbmZpZy5zY2FsZV9tYXggOiBNYXRoLm1heCguLi5lcG9jaHMpO1xyXG5cclxuXHRcdHRhcmdldC5jb2xvcnMgPSBpc0Z1bmN0aW9uKGNvbmZpZy5jb2xvcnMpID9cclxuXHRcdFx0Y29uZmlnLmNvbG9ycyA6IGQzSW50ZXJwb2xhdGVIc2xMb25nKGQzSHNsKDI1MCwgMSwgMC41KSwgZDNIc2woMCwgMSwgMC41KSk7XHJcblxyXG5cdFx0dGFyZ2V0LmNvbG9yc2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbExvZyh0YXJnZXQuY29sb3JzKVxyXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSk7XHJcblx0fVxyXG5cclxuXHRnZXRTdGFuZm9yZFBvaW50Q29sb3IoZCkge1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhLnRhcmdldHNbMF07XHJcblxyXG5cdFx0cmV0dXJuIHRhcmdldC5jb2xvcnNjYWxlKGQuZXBvY2hzKTtcclxuXHR9XHJcblxyXG5cdHNldFN0YW5mb3JkVG9vbHRpcCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzLiQkO1xyXG5cclxuXHRcdGlmIChpc0VtcHR5KGNvbmZpZy50b29sdGlwX2NvbnRlbnRzKSkge1xyXG5cdFx0XHRjb25maWcudG9vbHRpcF9jb250ZW50cyA9IGZ1bmN0aW9uKGQsIGRlZmF1bHRUaXRsZUZvcm1hdCwgZGVmYXVsdFZhbHVlRm9ybWF0LCBjb2xvcikge1xyXG5cdFx0XHRcdGxldCBodG1sID0gYDx0YWJsZSBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcH1cIj48dGJvZHk+YDtcclxuXHJcblx0XHRcdFx0ZC5mb3JFYWNoKHYgPT4ge1xyXG5cdFx0XHRcdFx0aHRtbCArPSBgPHRyPlxyXG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdChjb25maWcuZGF0YV94KX08L3RoPlxyXG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi54KX08L3RoPlxyXG5cdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KHYuaWQpfTwvdGg+XHJcblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LnZhbHVlKX08L3RoPlxyXG5cdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHQ8dHIgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXBOYW1lfS0ke3YuaWR9XCI+XHJcblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwibmFtZVwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2NvbG9yKHYpfVwiPjwvc3Bhbj4ke2RlZmF1bHRUaXRsZUZvcm1hdChcIkVwb2Noc1wiKX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XHJcblx0XHRcdFx0XHRcdDwvdHI+YDtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGAke2h0bWx9PC90Ym9keT48L3RhYmxlPmA7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbik6IHt2YWx1ZTogbnVtYmVyLCBwZXJjZW50YWdlOiBudW1iZXJ9IHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHRhcmdldCA9ICQkLmRhdGEudGFyZ2V0c1swXTtcclxuXHJcblx0XHRjb25zdCB0b3RhbCA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PlxyXG5cdFx0XHRhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKSwgMCk7XHJcblxyXG5cdFx0Y29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4ge1xyXG5cdFx0XHRpZiAocG9pbnRJblJlZ2lvbihjdXJyZW50VmFsdWUsIHJlZ2lvbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gYWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2Nocyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcclxuXHRcdH0sIDApO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZhbHVlLFxyXG5cdFx0XHRwZXJjZW50YWdlOiB2YWx1ZSAhPT0gMCA/ICsodmFsdWUgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgxKSA6IDBcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIFdpbmRvdyBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xyXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XHJcblxyXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xyXG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcclxuXHJcblx0cmV0dXJuIGRlZihzZWxmKSB8fCBkZWYod2luZG93KSB8fCBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xyXG59KSgpO1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xyXG5cclxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xyXG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xyXG5pbXBvcnQge2QzU2VsZWN0aW9ufSBmcm9tIFwiLi4vLi4vdHlwZXMvdHlwZXNcIjtcclxuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XHJcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0YXNIYWxmUGl4ZWwsXHJcblx0YnJ1c2hFbXB0eSxcclxuXHRjYWxsRm4sXHJcblx0Y2FwaXRhbGl6ZSxcclxuXHRjZWlsMTAsXHJcblx0Y29udmVydElucHV0VHlwZSxcclxuXHRkaWZmRG9tYWluLFxyXG5cdGVuZGFsbCxcclxuXHRlbXVsYXRlRXZlbnQsXHJcblx0ZXh0ZW5kLFxyXG5cdGdldEJydXNoU2VsZWN0aW9uLFxyXG5cdGdldEJvdW5kaW5nUmVjdCxcclxuXHRnZXRDc3NSdWxlcyxcclxuXHRnZXRNaW5NYXgsXHJcblx0Z2V0T3B0aW9uLFxyXG5cdGdldFBhdGhCb3gsXHJcblx0Z2V0UmFuZG9tLFxyXG5cdGdldFJhbmdlLFxyXG5cdGdldFJlY3RTZWdMaXN0LFxyXG5cdGdldFRyYW5zbGF0aW9uLFxyXG5cdGdldFVuaXF1ZSxcclxuXHRoYXNWYWx1ZSxcclxuXHRpc0FycmF5LFxyXG5cdGlzYm9vbGVhbixcclxuXHRpc0RlZmluZWQsXHJcblx0aXNFbXB0eSxcclxuXHRpc0Z1bmN0aW9uLFxyXG5cdGlzTnVtYmVyLFxyXG5cdGlzT2JqZWN0LFxyXG5cdGlzT2JqZWN0VHlwZSxcclxuXHRpc1N0cmluZyxcclxuXHRpc1RhYlZpc2libGUsXHJcblx0aXNVbmRlZmluZWQsXHJcblx0aXNWYWx1ZSxcclxuXHRtZXJnZUFycmF5LFxyXG5cdG1lcmdlT2JqLFxyXG5cdG5vdEVtcHR5LFxyXG5cdHBhcnNlRGF0ZSxcclxuXHRzYW5pdGlzZSxcclxuXHRzZXRUZXh0VmFsdWUsXHJcblx0c29ydFZhbHVlLFxyXG5cdHRvQXJyYXksXHJcblx0dHBsUHJvY2Vzc1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWx1ZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHYgfHwgdiA9PT0gMDtcclxuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XHJcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XHJcbmNvbnN0IGlzTnVtYmVyID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XHJcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XHJcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xyXG5jb25zdCBpc2Jvb2xlYW4gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XHJcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcclxuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcclxuY29uc3QgZGlmZkRvbWFpbiA9IChkOiBudW1iZXJbXSk6IG51bWJlciA9PiBkWzFdIC0gZFswXTtcclxuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XHJcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXHJcblx0aXNVbmRlZmluZWQobykgfHwgbyA9PT0gbnVsbCB8fFxyXG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcclxuXHQoaXNOdW1iZXIobykgJiYgaXNOYU4obykpXHJcbik7XHJcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaXMgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBpc09iamVjdCA9IChvYmo6IGFueSk6IGJvb2xlYW4gPT4gb2JqICYmICFvYmoubm9kZVR5cGUgJiYgaXNPYmplY3RUeXBlKG9iaikgJiYgIWlzQXJyYXkob2JqKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgc3BlY2lmaWVkIGtleSB2YWx1ZSBmcm9tIG9iamVjdFxyXG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdmFsdWVcclxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xyXG5cdHJldHVybiBpc0RlZmluZWQob3B0aW9uc1trZXldKSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRWYWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG5cdGxldCBmb3VuZCA9IGZhbHNlO1xyXG5cclxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xyXG5cclxuXHRyZXR1cm4gZm91bmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxyXG4gKiBAcGFyYW0geyp9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XHJcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xyXG5cclxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XHJcblx0cmV0dXJuIGlzRm47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsIGZ1bmN0aW9uIGFmdGVyIGFsbCB0cmFuc2l0aW9ucyBlbmRzXHJcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXHJcbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblx0bGV0IG4gPSAwO1xyXG5cclxuXHR0cmFuc2l0aW9uXHJcblx0XHQuZWFjaCgoKSA9PiArK24pXHJcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xyXG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2FuaXRpc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cclxuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCB0ZXh0IHZhbHVlLiBJZiB0aGVyZSdzIG11bHRpbGluZSBhZGQgbm9kZXMuXHJcbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGR5IGR5IHZhbHVlIGZvciBtdWx0aWxpbmVkIHRleHRcclxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxyXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxyXG5cdHRleHQ6IHN0cmluZyxcclxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxyXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2VcclxuKSB7XHJcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcclxuXHRcdG5vZGUudGV4dCh0ZXh0KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XHJcblxyXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcclxuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcclxuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XHJcblxyXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XHJcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcclxuXHJcblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXHJcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcclxuXHRcdFx0XHRcdC50ZXh0KHYpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJlY3RTZWdMaXN0KHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudCk6IHt4OiBudW1iZXIsIHk6IG51bWJlcn1bXSB7XHJcblx0LypcclxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXHJcblx0ICogKi9cclxuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcclxuXHJcblx0cmV0dXJuIFtcclxuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxyXG5cdFx0e3gsIHl9LCAvLyBzZWcxXHJcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xyXG5cdF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcclxuICogQHJldHVybnMge29iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFBhdGhCb3goXHJcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XHJcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcclxuXHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XHJcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XHJcblx0Y29uc3QgeSA9IE1hdGgubWluKGl0ZW1zWzBdLnksIGl0ZW1zWzFdLnkpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0eCwgeSwgd2lkdGgsIGhlaWdodFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSAkZWwgU2VsZWN0aW9uIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xyXG5cdGNvbnN0IGV2ZW50ID0gZDNFdmVudDtcclxuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XHJcblx0bGV0IHNlbGVjdGlvbjtcclxuXHJcblx0Ly8gY2hlY2sgZnJvbSBldmVudFxyXG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcclxuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcclxuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXHJcblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xyXG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNlbGVjdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXHJcbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRhcmdldCBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSAobm9kZSk6IHtcclxuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcclxuXHR4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJcclxufSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xyXG5cclxuLyoqXHJcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcnxzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSYW5kb20oYXNTdHI6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcclxuXHJcblx0cmV0dXJuIGFzU3RyID8gU3RyaW5nKHJhbmQpIDogcmFuZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdHggQnVyc2ggY29udGV4dFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XHJcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcclxuXHJcblx0aWYgKHNlbGVjdGlvbikge1xyXG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxyXG5cdFx0Ly8gdHdvLWRpbWVuc2lvbmFsOiBbW3gwLCB5MF0sIFt4MSwgeTFdXVxyXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxyXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmQgdGFyZ2V0IGZyb20gc291cmNlIG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0ID0ge30sIHNvdXJjZSk6IG9iamVjdCB7XHJcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xyXG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XHJcblx0fVxyXG5cclxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcclxuXHRmb3IgKGNvbnN0IHAgaW4gc291cmNlKSB7XHJcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSkge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHRvIGFycmF5XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB2IFRhcmdldCB0byBiZSBjb252ZXJ0ZWRcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XHJcblxyXG4vKipcclxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q3NzUnVsZXMoc3R5bGVTaGVldHM6IGFueVtdKSB7XHJcblx0bGV0IHJ1bGVzID0gW107XHJcblxyXG5cdHN0eWxlU2hlZXRzLmZvckVhY2goc2hlZXQgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJ1bGVzID0gcnVsZXMuY29uY2F0KHRvQXJyYXkoc2hlZXQuY3NzUnVsZXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciB3aGlsZSByZWFkaW5nIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfTogJHtlLnRvU3RyaW5nKCl9YCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBydWxlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtTVkdNYXRyaXh9IG1hdHJpeFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcclxuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xyXG5cdGNvbnN0IGJhc2VWYWwgPSB0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtLmJhc2VWYWw7XHJcblxyXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XHJcblx0XHRiYXNlVmFsLmdldEl0ZW0oMCkubWF0cml4IDpcclxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBTb3VyY2UgZGF0YVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xyXG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xyXG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXHJcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xyXG5cclxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2UgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XHJcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcclxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcclxuXHRpZiAoIW9iamVjdE4ubGVuZ3RoIHx8IChvYmplY3ROLmxlbmd0aCA9PT0gMSAmJiAhb2JqZWN0TlswXSkpIHtcclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fVxyXG5cclxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XHJcblxyXG5cdGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcclxuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xyXG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZU9iaih0YXJnZXRba2V5XSwgdmFsdWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xyXG5cdFx0XHRcdFx0dmFsdWUuY29uY2F0KCkgOiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNvcnQgdmFsdWVcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcclxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfERhdGV9IHNvcnRlZCBkYXRlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBzb3J0VmFsdWUoZGF0YTogYW55W10sIGlzQXNjID0gdHJ1ZSk6IGFueVtdIHtcclxuXHRsZXQgZm47XHJcblxyXG5cdGlmIChkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYgKGlzQXNjICYmICFkYXRhLmV2ZXJ5KGlzTmFOKSkge1xyXG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcclxuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XHJcblx0XHRcdGZuID0gKGEsIGIpID0+IChhID4gYiAmJiAtMSkgfHwgKGEgPCBiICYmIDEpIHx8IChhID09PSBiICYmIDApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgbWluL21heCB2YWx1ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcclxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcclxuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XHJcblxyXG5cdGlmIChyZXMubGVuZ3RoKSB7XHJcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xyXG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XHJcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcyA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcmFuZ2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBudW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xyXG5cdGNvbnN0IHJlczogbnVtYmVyW10gPSBbXTtcclxuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xyXG5cclxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcclxuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8vIGVtdWxhdGUgZXZlbnRcclxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xyXG5cdG1vdXNlOiAoKCkgPT4ge1xyXG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcclxuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXHJcblx0XHR9KTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XHJcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcclxuXHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XHJcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgbW91c2VFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcclxuXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcclxuXHRcdFx0XHRtb3VzZUV2ZW50LmluaXRNb3VzZUV2ZW50KFxyXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxyXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXHJcblx0XHRcdFx0XHRwYXJhbXMuY2FuY2VsYWJsZSxcclxuXHRcdFx0XHRcdHdpbmRvdyxcclxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XHJcblx0XHRcdFx0XHRwYXJhbXMuc2NyZWVuWCwgcGFyYW1zLnNjcmVlblksXHJcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXHJcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSkoKSxcclxuXHR0b3VjaDogKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xyXG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxyXG5cdFx0XHR0YXJnZXQ6IGVsLFxyXG5cdFx0XHRyYWRpdXNYOiAyLjUsXHJcblx0XHRcdHJhZGl1c1k6IDIuNSxcclxuXHRcdFx0cm90YXRpb25BbmdsZTogMTAsXHJcblx0XHRcdGZvcmNlOiAwLjVcclxuXHRcdH0sIHBhcmFtcykpO1xyXG5cclxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XHJcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxyXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxyXG5cdFx0XHR0YXJnZXRUb3VjaGVzOiBbXSxcclxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cclxuXHRcdH0pKTtcclxuXHR9XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSBEYXRhIHZhbHVlIHRvIGJlIHJlcGxhY2VkXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xyXG5cdGxldCByZXMgPSB0cGw7XHJcblxyXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XHJcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgcGFyc2VkIGRhdGUgdmFsdWVcclxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxyXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxyXG4gKiBAcmV0dXJucyB7RGF0ZX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlRGF0ZShkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyIHwgYW55KTogRGF0ZSB7XHJcblx0bGV0IHBhcnNlZERhdGU7XHJcblxyXG5cdGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XHJcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgZm9ybWF0fSA9IHRoaXM7XHJcblxyXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcclxuXHR9IGVsc2UgaWYgKGlzTnVtYmVyKGRhdGUpICYmICFpc05hTihkYXRlKSkge1xyXG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcclxuXHR9XHJcblxyXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcclxuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcGFyc2UgeCAnJHtkYXRlfScgdG8gRGF0ZSBvYmplY3RgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJzZWREYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gIWRvY3VtZW50LmhpZGRlbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcclxuICogQHBhcmFtIHtib29sZWFufSB0b3VjaCBDb25maWcgdmFsdWU6IGludGVyYWN0aW9uLmlucHV0VHlwZS50b3VjaFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xyXG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5cclxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxyXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcclxuXHRcdC8vIFNvbWUgRWRnZSBkZXNrdG9wIHJldHVybiB0cnVlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8yMDQxNzA3NC9cclxuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcclxuXHJcblx0XHQvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy90b3VjaGV2ZW50cy5qc1xyXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcclxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcclxuXHJcblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcclxuXHJcblx0cmV0dXJuIChoYXNNb3VzZSAmJiBcIm1vdXNlXCIpIHx8IChpc01vYmlsZSAmJiBcInRvdWNoXCIpIHx8IG51bGw7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==