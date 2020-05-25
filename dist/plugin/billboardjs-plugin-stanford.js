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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwicmVhZCIsInRoaXNDb25maWciLCJmaW5kIiwic2hpZnQiLCJpc09iamVjdFR5cGUiLCJ1bmRlZmluZWQiLCJzcGxpdCIsImlzRGVmaW5lZCIsIk9wdGlvbnMiLCJjb2xvcnMiLCJlcG9jaHMiLCJzY2FsZV9taW4iLCJzY2FsZV9tYXgiLCJzY2FsZV93aWR0aCIsInNjYWxlX2Zvcm1hdCIsInBhZGRpbmdfdG9wIiwicGFkZGluZ19yaWdodCIsInBhZGRpbmdfYm90dG9tIiwicGFkZGluZ19sZWZ0IiwicG9pbnRJblJlZ2lvbiIsInBvaW50IiwieCIsInkiLCJ2YWx1ZSIsImluc2lkZSIsImkiLCJqIiwibGVuZ3RoIiwieGkiLCJ5aSIsInhqIiwieWoiLCJjb21wYXJlRXBvY2hzIiwiYSIsImIiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiZiIsIkVsZW1lbnRzIiwib3duZXIiLCJlbGVtZW50cyIsIiQkIiwiJGVsIiwibWFpbiIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50Iiwic3ViY2hhcnQiLCJ0eXBlIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiYyIsImdldFVuaXF1ZSIsImlzRGF0ZSIsIk51bWJlciIsIm1lcmdlQXJyYXkiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzb3J0VmFsdWUiLCJpc0FzYyIsImV2ZXJ5IiwiZ2V0TWluTWF4IiwicmVzIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiaGlkZGVuIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGFzVG91Y2hQb2ludHMiLCJtYXhUb3VjaFBvaW50cyIsImhhc1RvdWNoIiwiRG9jdW1lbnRUb3VjaCIsImhhc01vdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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bGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tc3RhbmZvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJzdGFuZm9yZFwiLCBbXCJkMy1zZWxlY3Rpb25cIiwgXCJkMy1pbnRlcnBvbGF0ZVwiLCBcImQzLWNvbG9yXCIsIFwiZDMtc2NhbGVcIiwgXCJkMy1icnVzaFwiLCBcImQzLWF4aXNcIiwgXCJkMy1mb3JtYXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wic3RhbmZvcmRcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1pbnRlcnBvbGF0ZVwiKSwgcmVxdWlyZShcImQzLWNvbG9yXCIpLCByZXF1aXJlKFwiZDMtc2NhbGVcIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLWF4aXNcIiksIHJlcXVpcmUoXCJkMy1mb3JtYXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xM19fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE2KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxyXG4gKiBAY2xhc3MgUGx1Z2luXHJcbiAqL1xyXG4vKipcclxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXHJcbiAqIEBuYW1lIHZlcnNpb25cclxuICogQHN0YXRpY1xyXG4gKiBAbWVtYmVyb2YgUGx1Z2luXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBleGFtcGxlXHJcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XHJcblx0cHVibGljICQkO1xyXG5cdHB1YmxpYyBvcHRpb25zO1xyXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuMC1hbHBoYVwiO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvclxyXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGJlZm9yZUluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JGluaXQoKSB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQkYWZ0ZXJJbml0KCkge31cclxuXHJcblx0LyoqXHJcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHJlZHJhdygpIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0JHdpbGxEZXN0cm95KCkge1xyXG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xyXG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fN19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLyoqXHJcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0YXJjOiBcImJiLWFyY1wiLFxyXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxyXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxyXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxyXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXHJcblx0YXhpczogXCJiYi1heGlzXCIsXHJcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXHJcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcclxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcclxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxyXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcclxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxyXG5cdGJhcjogXCJiYi1iYXJcIixcclxuXHRiYXJzOiBcImJiLWJhcnNcIixcclxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxyXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcclxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxyXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXHJcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXHJcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcclxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXHJcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcclxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXHJcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxyXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxyXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxyXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXHJcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcclxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxyXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcclxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXHJcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXHJcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcclxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXHJcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxyXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxyXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXHJcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXHJcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxyXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXHJcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcclxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxyXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcclxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcclxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxyXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxyXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcclxuXHRncmlkOiBcImJiLWdyaWRcIixcclxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxyXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcclxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXHJcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXHJcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxyXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXHJcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXHJcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxyXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXHJcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxyXG5cdGxpbmU6IFwiYmItbGluZVwiLFxyXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXHJcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxyXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxyXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXHJcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcclxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXHJcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxyXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXHJcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxyXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxyXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXHJcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxyXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxyXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXHJcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcclxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcclxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXHJcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXHJcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcclxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXHJcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcclxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXHJcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxyXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXHJcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxyXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXHJcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxyXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcclxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxyXG5cdHpvb21SZWN0OiBcImJiLXpvb20tcmVjdFwiLFxyXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcclxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXHJcblx0SU5DTFVERUQ6IFwiX2luY2x1ZGVkX1wiLFxyXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcclxuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XHJcblxyXG4vKipcclxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XHJcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xyXG5cdGxldCB0YXJnZXQ7XHJcblx0bGV0IGtleXM7XHJcblx0bGV0IHJlYWQ7XHJcblxyXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XHJcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XHJcblxyXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcclxuXHRcdFx0cmV0dXJuIGZpbmQoKTtcclxuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fTtcclxuXHJcblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xyXG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XHJcblx0XHRyZWFkID0gZmluZCgpO1xyXG5cclxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcclxuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXzsiLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBvcHRpb24gY2xhc3NcclxuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xyXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcclxuICogQGF1Z21lbnRzIFBsdWdpblxyXG4gKiBAcmV0dXJucyB7U3RhbmZvcmRPcHRpb25zfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXHJcblx0XHRcdCAqIEBuYW1lIGNvbG9yc1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cclxuXHRcdFx0ICogQGRlZmF1bHQgdW5kZWZpbmVkXHJcblx0XHRcdCAqIEBleGFtcGxlXHJcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXHJcblx0XHRcdCAqICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcclxuXHRcdFx0ICogICApXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRjb2xvcnM6IHVuZGVmaW5lZCxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBTcGVjaWZ5IHRoZSBrZXkgb2YgZXBvY2hzIHZhbHVlcyBpbiB0aGUgZGF0YS5cclxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcclxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxyXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiBcdGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXVxyXG5cdFx0XHQgKi9cclxuXHRcdFx0ZXBvY2hzOiA8bnVtYmVyW10+IFtdLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXHJcblx0XHRcdCAqIC0gRWFjaCBsaW5lIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxyXG5cdFx0XHQgKlxyXG5cdFx0XHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XHJcblx0XHRcdCAqIHwgLS0tIHwgLS0tIHwgLS0tIHxcclxuXHRcdFx0ICogfCB4MSB8IE51bWJlciB8IFN0YXJ0aW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgfFxyXG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XHJcblx0XHRcdCAqIHwgeDIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyAgfFxyXG5cdFx0XHQgKiB8IHkyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB5IGF4aXMgfFxyXG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XHJcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxyXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgIGxpbmVzOiBbXHJcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxyXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cclxuXHRcdFx0ICogICBdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRsaW5lczogW10sXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0ICogU2V0IHNjYWxlIHZhbHVlc1xyXG5cdFx0XHQgKiBAbmFtZSBzY2FsZVxyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbc2NhbGVdIHNjYWxlIG9iamVjdFxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUubWF4PXVuZGVmaW5lZF0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGhpZ2hlc3QgdmFsdWUgaW4gZXBvY2hzXHJcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxyXG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogIHNjYWxlOiB7XHJcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXHJcblx0XHRcdCAqICAgIG1pbjogMSxcclxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcclxuXHRcdFx0ICpcclxuXHRcdFx0ICogICAgLy8gc3BlY2lmeSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTBcclxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXHJcblx0XHRcdCAqXHJcblx0XHRcdCAqICAgIC8vIG9yIHNwZWNpZnkgYSBmb3JtYXQgZnVuY3Rpb25cclxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XHJcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xyXG5cdFx0XHQgKiAgICB9XHJcblx0XHRcdCAqICB9LFxyXG5cdFx0XHQgKi9cclxuXHRcdFx0c2NhbGVfbWluOiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxyXG5cdFx0XHRzY2FsZV9tYXg6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXHJcblx0XHRcdHNjYWxlX3dpZHRoOiA8bnVtYmVyfHVuZGVmaW5lZD4gMjAsXHJcblx0XHRcdHNjYWxlX2Zvcm1hdDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQgKiBUaGUgcGFkZGluZyBmb3IgY29sb3Igc2NhbGUgZWxlbWVudFxyXG5cdFx0XHQgKiBAbmFtZSBwYWRkaW5nXHJcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcclxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cclxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtwYWRkaW5nXSBwYWRkaW5nIG9iamVjdFxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxyXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcucmlnaHQ9MF0gUmlnaHQgcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmJvdHRvbT0wXSBCb3R0b20gcGFkZGluZyB2YWx1ZS5cclxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxyXG5cdFx0XHQgKiBAZXhhbXBsZVxyXG5cdFx0XHQgKiAgcGFkZGluZzoge1xyXG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcclxuXHRcdFx0ICogICAgIHJpZ2h0OiAwLFxyXG5cdFx0XHQgKiAgICAgYm90dG9tOiAwLFxyXG5cdFx0XHQgKiAgICAgbGVmdDogMFxyXG5cdFx0XHQgKiAgfSxcclxuXHRcdFx0ICovXHJcblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxyXG5cdFx0XHRwYWRkaW5nX3JpZ2h0OiAwLFxyXG5cdFx0XHRwYWRkaW5nX2JvdHRvbTogMCxcclxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxyXG5cclxuXHRcdFx0LyoqXHJcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cclxuXHRcdFx0ICogLSBFYWNoIHJlZ2lvbiBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcclxuXHRcdFx0ICpcclxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcclxuXHRcdFx0ICogICB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8XHJcblx0XHRcdCAqICAgfCBwb2ludHMgfCBBcnJheSB8ICB8IHwgQWNjZXB0cyBhIGdyb3VwIG9mIG9iamVjdHMgdGhhdCBoYXMgeCBhbmQgeS48YnI+VGhlc2UgcG9pbnRzIHNob3VsZCBiZSBhZGRlZCBpbiBhIGNvdW50ZXItY2xvY2t3aXNlIGZhc2hpb24gdG8gbWFrZSBhIGNsb3NlZCBwb2x5Z29uLiB8XHJcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XHJcblx0XHRcdCAqICAgfCB0ZXh0IHwgRnVuY3Rpb24gfCAgfCAmbHQ7b3B0aW9uYWw+IHwgVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGFuZCBwZXJjZW50YWdlIG9mIHRoZSBudW1iZXIgb2YgZXBvY2hzIGluIHRoaXMgcmVnaW9uLjxicj5SZXR1cm4gYSBzdHJpbmcgdG8gcGxhY2UgdGV4dCBpbiB0aGUgbWlkZGxlIG9mIHRoZSByZWdpb24uIHxcclxuXHRcdFx0ICogICB8IGNsYXNzIHwgU3RyaW5nIHwgfCAmbHQ7b3B0aW9uYWw+IHwgU2UgYSBjdXN0b20gY3NzIGNsYXNzIHRvIHRoaXMgcmVnaW9uLCB1c2UgdGhlIGZpbGwgcHJvcGVydHkgaW4gY3NzIHRvIHNldCBhIGJhY2tncm91bmQgY29sb3IuIHxcclxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xyXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXHJcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdFx0ICogQGRlZmF1bHQgW11cclxuXHRcdFx0ICogQGV4YW1wbGVcclxuXHRcdFx0ICogICByZWdpb25zOiBbXHJcblx0XHRcdCAqICAgICAgIHtcclxuXHRcdFx0ICogICAgICAgICAgIHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXHJcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiAwIH0sXHJcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcclxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDQwIH0sXHJcblx0XHRcdCAqICAgICAgICAgICBdLFxyXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XHJcblx0XHRcdCAqICAgICAgICAgICAgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XHJcblx0XHRcdCAqICAgICAgICAgICB9LFxyXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcclxuXHRcdFx0ICogICAgICAgICAgIGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxyXG5cdFx0XHQgKiAgICAgICB9LFxyXG5cdFx0XHQgKiAgICAgICAuLi5cclxuXHRcdFx0ICogICBdXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRyZWdpb25zOiBbXVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vKipcclxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcclxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXHJcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcclxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXHJcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXHJcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogQGlnbm9yZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Z2V0UmFuZ2UsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuLi8uLi9tb2R1bGUvdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHBvaW50IGlzIGluIHJlZ2lvblxyXG4gKiBAcGFyYW0ge29iamVjdH0gcG9pbnQgUG9pbnRcclxuICogQHBhcmFtIHtBcnJheX0gcmVnaW9uIFJlZ2lvblxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHBvaW50SW5SZWdpb24ocG9pbnQsIHJlZ2lvbik6IGJvb2xlYW4geyAvLyB0aGFua3MgdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9ieWNvZmZlLzU1NzU5MDRcclxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cclxuXHQvLyBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXHJcblx0Y29uc3QgeCA9IHBvaW50Lng7XHJcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xyXG5cdGxldCBpbnNpZGUgPSBmYWxzZTtcclxuXHJcblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcclxuXHRcdGNvbnN0IHhpID0gcmVnaW9uW2ldLng7XHJcblx0XHRjb25zdCB5aSA9IHJlZ2lvbltpXS55O1xyXG5cclxuXHRcdGNvbnN0IHhqID0gcmVnaW9uW2pdLng7XHJcblx0XHRjb25zdCB5aiA9IHJlZ2lvbltqXS55O1xyXG5cclxuXHRcdGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XHJcblxyXG5cdFx0aWYgKGludGVyc2VjdCkge1xyXG5cdFx0XHRpbnNpZGUgPSAhaW5zaWRlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGluc2lkZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgZXBvY2hzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhIFRhcmdldFxyXG4gKiBAcGFyYW0ge29iamVjdH0gYiBTb3VyY2VcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYik6IG51bWJlciB7XHJcblx0aWYgKGEuZXBvY2hzIDwgYi5lcG9jaHMpIHtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblxyXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XHJcblx0XHRyZXR1cm4gMTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAwO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHJlZ2lvbiBhcmVhXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBQb2ludHNcclxuICogQHJldHVybnMge251bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKTogbnVtYmVyIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxyXG5cdGxldCBhcmVhID0gMDtcclxuXHRsZXQgcG9pbnQxO1xyXG5cdGxldCBwb2ludDI7XHJcblxyXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xyXG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xyXG5cdFx0cG9pbnQyID0gcG9pbnRzW2pdO1xyXG5cdFx0YXJlYSArPSBwb2ludDEueCAqIHBvaW50Mi55O1xyXG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xyXG5cdH1cclxuXHJcblx0YXJlYSAvPSAyO1xyXG5cclxuXHRyZXR1cm4gYXJlYTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCBjZW50cm9pZFxyXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgUG9pbnRzXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcclxuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xyXG5cclxuXHRsZXQgeCA9IDA7XHJcblx0bGV0IHkgPSAwO1xyXG5cdGxldCBmO1xyXG5cclxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcclxuXHRcdGNvbnN0IHBvaW50MSA9IHBvaW50c1tpXTtcclxuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcclxuXHJcblx0XHRmID0gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50Mi54ICogcG9pbnQxLnk7XHJcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XHJcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XHJcblx0fVxyXG5cclxuXHRmID0gYXJlYSAqIDY7XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHR4OiB4IC8gZixcclxuXHRcdHk6IHkgLyBmXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuXHRjb21wYXJlRXBvY2hzLFxyXG5cdGdldENlbnRyb2lkLFxyXG5cdGdldFJhbmdlLFxyXG5cdGdldFJlZ2lvbkFyZWEsXHJcblx0aXNFbXB0eSxcclxuXHRpc0Z1bmN0aW9uLFxyXG5cdGlzU3RyaW5nLFxyXG5cdHBhcnNlRGF0ZSxcclxuXHRwb2ludEluUmVnaW9uXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKi9cclxuLy8gQHRzLW5vY2hlY2tcclxuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IHtnZXRDZW50cm9pZCwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGVsZW1lbnQgY2xhc3NcclxuICogQGNsYXNzIENvbG9yU2NhbGVcclxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcclxuXHRwcml2YXRlIG93bmVyO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xyXG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xyXG5cclxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxyXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBvd25lci4kJC4kZWwubWFpbi5zZWxlY3QoXCIuYmItY2hhcnRcIilcclxuXHRcdFx0LmFwcGVuZChcImdcIilcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcclxuXHJcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcclxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xyXG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XHJcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xyXG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xyXG5cclxuXHRcdC8vIFN0YW5mb3JkLUxpbmVzXHJcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxyXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcclxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lfWApXHJcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcclxuXHJcblx0XHQvLyBleGl0XHJcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXHJcblx0XHRcdC5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyBlbnRlclxyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkTGluZUVudGVyLmFwcGVuZChcImxpbmVcIilcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcblxyXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXJcclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxyXG5cdFx0XHQuc2VsZWN0KFwibGluZVwiKVxyXG5cdFx0XHQudHJhbnNpdGlvbigpXHJcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcclxuXHRcdFx0LmF0dHIoXCJ4MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkxXCIpIDogeHZDdXN0b20oZCwgXCJ4MVwiKSkpXHJcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxyXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcclxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngyXCIpIDogeXZDdXN0b20oZCwgXCJ5MlwiKSkpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XHJcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcclxuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XHJcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XHJcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XHJcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xyXG5cclxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcclxuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcclxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb259YClcclxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XHJcblxyXG5cdFx0Ly8gZXhpdFxyXG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXHJcblx0XHRcdC5yZW1vdmUoKTtcclxuXHJcblx0XHQvLyBlbnRlclxyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcclxuXHJcblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInBvbHlnb25cIilcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcblxyXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJ0ZXh0XCIpXHJcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXHJcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xyXG5cclxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XHJcblxyXG5cdFx0Ly8gdXBkYXRlXHJcblx0XHRzdGFuZm9yZFJlZ2lvblxyXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcclxuXHRcdFx0LnNlbGVjdChcInBvbHlnb25cIilcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5hdHRyKFwicG9pbnRzXCIsIGQgPT4gZC5wb2ludHMubWFwKHZhbHVlID0+IFtcclxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcclxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxyXG5cdFx0XHRdLmpvaW4oXCIsXCIpKS5qb2luKFwiIFwiKSlcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xyXG5cclxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcclxuXHRcdFx0LnRyYW5zaXRpb24oKVxyXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXHJcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcclxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxyXG5cdFx0XHQudGV4dChkID0+IHtcclxuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XHJcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxyXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXHJcblx0XHRcdC50cmFuc2l0aW9uKClcclxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uID0gMCk6IHZvaWQge1xyXG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcclxuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcclxuXHR9XHJcblxyXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xyXG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcclxuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xyXG5cclxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XHJcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcclxuXHRcdH0gZWxzZSBpZiAoYXhpcy5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XHJcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnNjYWxlLnkyIDogJCQuc2NhbGUueTtcclxuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG5pbXBvcnQge2F4aXNSaWdodCBhcyBkM0F4aXNSaWdodH0gZnJvbSBcImQzLWF4aXNcIjtcclxuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcclxuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWwgYXMgZDNTY2FsZVNlcXVlbnRpYWwsIHNjYWxlTG9nIGFzIGQzU2NhbGVMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG4vKipcclxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcclxuICogQGNsYXNzIENvbG9yU2NhbGVcclxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2NhbGUge1xyXG5cdHByaXZhdGUgb3duZXI7XHJcblx0cHJpdmF0ZSBjb2xvclNjYWxlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xyXG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xyXG5cdH1cclxuXHJcblx0ZHJhd0NvbG9yU2NhbGUoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7JCQsIGNvbmZpZ30gPSB0aGlzLm93bmVyO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xyXG5cdFx0Y29uc3QgaGVpZ2h0ID0gJCQuc3RhdGUuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmdfYm90dG9tIC0gY29uZmlnLnBhZGRpbmdfdG9wO1xyXG5cdFx0Y29uc3QgYmFyV2lkdGggPSBjb25maWcuc2NhbGVfd2lkdGg7XHJcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xyXG5cdFx0Y29uc3QgcG9pbnRzID0gZ2V0UmFuZ2UoY29uZmlnLnBhZGRpbmdfYm90dG9tLCBoZWlnaHQsIGJhckhlaWdodCk7XHJcblxyXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcclxuXHRcdFx0LmRvbWFpbihbcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSwgcG9pbnRzWzBdXSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xyXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUucmVtb3ZlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gJCQuJGVsLnN2Zy5hcHBlbmQoXCJnXCIpXHJcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgNTApXHJcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5jb2xvclNjYWxlKTtcclxuXHJcblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxyXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7Y29uZmlnLnBhZGRpbmdfdG9wfSlgKVxyXG5cdFx0XHQuc2VsZWN0QWxsKFwiYmFyc1wiKVxyXG5cdFx0XHQuZGF0YShwb2ludHMpXHJcblx0XHRcdC5lbnRlcigpXHJcblx0XHRcdC5hcHBlbmQoXCJyZWN0XCIpXHJcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJ4XCIsIDApXHJcblx0XHRcdC5hdHRyKFwid2lkdGhcIiwgYmFyV2lkdGgpXHJcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcclxuXHRcdFx0LmF0dHIoXCJmaWxsXCIsIGQgPT4gaW52ZXJzZVNjYWxlKGQpKTtcclxuXHJcblx0XHQvLyBMZWdlbmQgQXhpc1xyXG5cdFx0Y29uc3QgYXhpc1NjYWxlID0gZDNTY2FsZUxvZygpXHJcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKVxyXG5cdFx0XHQucmFuZ2UoW1xyXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcCArIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gKyBiYXJIZWlnaHQgLSAxLFxyXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcFxyXG5cdFx0XHRdKTtcclxuXHJcblx0XHRjb25zdCBsZWdlbmRBeGlzID0gZDNBeGlzUmlnaHQoYXhpc1NjYWxlKTtcclxuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcclxuXHJcblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xyXG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XHJcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2NhbGVGb3JtYXQpKSB7XHJcblx0XHRcdGxlZ2VuZEF4aXMudGlja0Zvcm1hdChzY2FsZUZvcm1hdCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoZDNGb3JtYXQoXCJkXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEcmF3IEF4aXNcclxuXHRcdGNvbnN0IGF4aXMgPSB0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxyXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcclxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke2JhcldpZHRofSwwKWApXHJcblx0XHRcdC5jYWxsKGxlZ2VuZEF4aXMpO1xyXG5cclxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XHJcblx0XHRcdGF4aXMuc2VsZWN0QWxsKFwiLnRpY2sgdGV4dFwiKVxyXG5cdFx0XHRcdC50ZXh0KG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihkID0+IGQgLyBNYXRoLnBvdygxMCwgTWF0aC5jZWlsKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwIC0gMWUtMTIpKSA9PT0gMSkgLy8gUG93ZXIgb2YgVGVuXHJcblx0XHRcdFx0LnRleHQoMTApXHJcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXHJcblx0XHRcdFx0LmF0dHIoXCJkeVwiLCBcIi0uN2VtXCIpIC8vIGh0dHBzOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svNjczODIyOVxyXG5cdFx0XHRcdC50ZXh0KGQgPT4gTWF0aC5yb3VuZChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29sb3JTY2FsZS5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHskJC5zdGF0ZS5jdXJyZW50LndpZHRoIC0gdGhpcy54Rm9yQ29sb3JTY2FsZSgpfSwgMClgKTtcclxuXHR9XHJcblxyXG5cdHhGb3JDb2xvclNjYWxlKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5vd25lci5jb25maWcucGFkZGluZ19yaWdodCArXHJcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xyXG5cdH1cclxuXHJcblx0Z2V0Q29sb3JTY2FsZVBhZGRpbmcoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLnhGb3JDb2xvclNjYWxlKCkgKyB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX2xlZnQgKyAyMDtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cclxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4vLyBAdHMtbm9jaGVja1xyXG5pbXBvcnQge2ludGVycG9sYXRlSHNsTG9uZyBhcyBkM0ludGVycG9sYXRlSHNsTG9uZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XHJcbmltcG9ydCB7aHNsIGFzIGQzSHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcclxuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWxMb2cgYXMgZDNTY2FsZVNlcXVlbnRpYWxMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xyXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uLy4uL2NvbmZpZy9jbGFzc2VzXCI7XHJcbmltcG9ydCB7bG9hZENvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbmZpZy9jb25maWdcIjtcclxuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XHJcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIjtcclxuaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XHJcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcclxuaW1wb3J0IHtjb21wYXJlRXBvY2hzLCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgcGFyc2VEYXRlLCBwb2ludEluUmVnaW9ufSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG4vKipcclxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW5cclxuICogLSAqKk5PVEU6KipcclxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxyXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cclxuICogICAtIElzIHByZWZlcmFibGUgdXNlIGBzY2F0dGVyYCBhcyBkYXRhLnR5cGVcclxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcclxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXHJcbiAqICAgLSBbZDMtaW50ZXJwb2xhdGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1pbnRlcnBvbGF0ZSlcclxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxyXG4gKiAgIC0gW2QzLXNjYWxlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2NhbGUpXHJcbiAqICAgLSBbZDMtYnJ1c2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1icnVzaClcclxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcclxuICogICAtIFtkMy1mb3JtYXRdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1mb3JtYXQpXHJcbiAqIEBjbGFzcyBwbHVnaW4tc3RhbmZvcmRcclxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxyXG4gKiBAcmVxdWlyZXMgZDMtaW50ZXJwb2xhdGVcclxuICogQHJlcXVpcmVzIGQzLWNvbG9yXHJcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxyXG4gKiBAcmVxdWlyZXMgZDMtYnJ1c2hcclxuICogQHJlcXVpcmVzIGQzLWF4aXNcclxuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTdGFuZm9yZCBwbHVnaW4gb3B0aW9uc1xyXG4gKiBAYXVnbWVudHMgUGx1Z2luXHJcbiAqIEByZXR1cm5zIHtTdGFuZm9yZH1cclxuICogQGV4YW1wbGVcclxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcclxuICogICAgIGRhdGE6IHtcclxuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXHJcbiAqICAgICAgICB0eXBlOiBcInNjYXR0ZXJcIlxyXG4gKiAgICAgfVxyXG4gKiAgICAgLi4uXHJcbiAqICAgICBwbHVnaW5zOiBbXHJcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnN0YW5mb3JkKHtcclxuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxyXG4gKiAgICAgICAgICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcclxuICogICAgICAgICAgICksXHJcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXHJcbiAqICAgICAgICAgICBsaW5lczogW1xyXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxyXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxyXG4gKiAgICAgICAgICAgXSxcclxuICogICAgICAgICAgIHNjYWxlOiB7XHJcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXHJcbiAqICAgICAgICAgICAgIFx0bWluOiAxLFxyXG4gKiAgICAgICAgICAgXHR3aWR0aDogNTAwLFxyXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcclxuICogICAgICAgICAgIH0sXHJcbiAqICAgICAgICAgICBwYWRkaW5nOiB7XHJcbiAqICAgICAgICAgICBcdHRvcDogMTUsXHJcbiAqICAgICAgICAgICBcdHJpZ2h0OiAwLFxyXG4gKiAgICAgICAgICAgXHRib3R0b206IDAsXHJcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcclxuICogICAgICAgICAgIH0sXHJcbiAqICAgICAgICAgICByZWdpb25zOiBbXHJcbiAqICAgICAgICAgICBcdHtcclxuICogICAgICAgICAgICAgICBcdHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXHJcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiAwIH0sXHJcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcclxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDQwIH1cclxuICogICAgICAgICAgICAgICBcdF0sXHJcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcclxuICogICAgICAgICAgICAgICBcdCAgICByZXR1cm4gYE5vcm1hbCBPcGVyYXRpb25zOiAke3ZhbHVlfSAoJHtwZXJjZW50YWdlfSUpYDtcclxuICogICAgICAgICAgICAgICBcdH0sXHJcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxyXG4gKiAgICAgICAgICAgICAgIFx0Y2xhc3M6IFwidGVzdC1wb2x5Z29uMVwiXHJcbiAqICAgICAgICAgICAgICB9LFxyXG4gKiAgICAgICAgICAgICBcdC4uLlxyXG4gKiAgICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgXVxyXG4gKiAgfSk7XHJcbiAqIEBleGFtcGxlXHJcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XHJcbiAqIGltcG9ydCBTdGFuZm9yZCBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkXCI7XHJcbiAqXHJcbiAqIGJiLmdlbmVyYXRlKHtcclxuICogICAgIHBsdWdpbnM6IFtcclxuICogICAgICAgIG5ldyBTdGFuZm9yZCh7IC4uLiB9KVxyXG4gKiAgICAgXVxyXG4gKiB9KVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmZvcmQgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHByaXZhdGUgY29uZmlnO1xyXG5cdHByaXZhdGUgY29sb3JTY2FsZTtcclxuXHRwcml2YXRlIGVsZW1lbnRzO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblx0XHRzdXBlcihvcHRpb25zKTtcclxuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdCRiZWZvcmVJbml0KCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gb3ZlcnJpZGUgb24gY29uZmlnIHZhbHVlcyAmIG1ldGhvZHNcclxuXHRcdCQkLmNvbmZpZy5kYXRhX3hTb3J0ID0gZmFsc2U7XHJcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XHJcblx0XHQkJC5zaG93R3JpZEZvY3VzID0gKCkgPT4ge307XHJcblx0XHQkJC5sYWJlbGlzaERhdGEgPSBkID0+IGQudmFsdWVzO1xyXG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XHJcblxyXG5cdFx0Y29uc3QgZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQuYmluZCgkJCk7XHJcblxyXG5cdFx0JCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICgpID0+IChcclxuXHRcdFx0Z2V0Q3VycmVudFBhZGRpbmdSaWdodCgpICsgKFxyXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0JGluaXQoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcclxuXHJcblx0XHRsb2FkQ29uZmlnLmNhbGwodGhpcywgdGhpcy5vcHRpb25zKTtcclxuXHRcdCQkLmNvbG9yID0gdGhpcy5nZXRTdGFuZm9yZFBvaW50Q29sb3IuYmluZCgkJCk7XHJcblxyXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gbmV3IENvbG9yU2NhbGUodGhpcyk7XHJcblx0XHR0aGlzLmVsZW1lbnRzID0gbmV3IEVsZW1lbnRzKHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuY29udmVydERhdGEoKTtcclxuXHRcdHRoaXMuaW5pdFN0YW5mb3JkRGF0YSgpO1xyXG5cdFx0dGhpcy5zZXRTdGFuZm9yZFRvb2x0aXAoKTtcclxuXHRcdHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xyXG5cclxuXHRcdHRoaXMuJHJlZHJhdygpO1xyXG5cdH1cclxuXHJcblx0JHJlZHJhdyhkdXJhdGlvbj86IG51bWJlcik6IHZvaWQge1xyXG5cdFx0dGhpcy5jb2xvclNjYWxlICYmIHRoaXMuY29sb3JTY2FsZS5kcmF3Q29sb3JTY2FsZSgpO1xyXG5cdFx0dGhpcy5lbGVtZW50cyAmJiB0aGlzLmVsZW1lbnRzLnVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24pO1xyXG5cdH1cclxuXHJcblxyXG5cdGdldE9wdGlvbnMoKTogT3B0aW9ucyB7XHJcblx0XHRyZXR1cm4gbmV3IE9wdGlvbnMoKTtcclxuXHR9XHJcblxyXG5cdGNvbnZlcnREYXRhKCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzO1xyXG5cdFx0Y29uc3QgZXBvY2hzID0gdGhpcy5vcHRpb25zLmVwb2NocztcclxuXHJcblx0XHRkYXRhLmZvckVhY2goZCA9PiB7XHJcblx0XHRcdGQudmFsdWVzLmZvckVhY2goKHYsIGkpID0+IHtcclxuXHRcdFx0XHR2LmVwb2NocyA9IGVwb2Noc1tpXTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkLm1pbkVwb2NocyA9IHVuZGVmaW5lZDtcclxuXHRcdFx0ZC5tYXhFcG9jaHMgPSB1bmRlZmluZWQ7XHJcblx0XHRcdGQuY29sb3JzID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRkLmNvbG9yc2NhbGUgPSB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xyXG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xyXG5cdFx0Y29uc3Qge2F4aXMsIGNvbmZpZ30gPSAkJDtcclxuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xyXG5cclxuXHRcdGlmIChheGlzLmlzVGltZVNlcmllcygpKSB7XHJcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcclxuXHRcdH0gZWxzZSBpZiAoYXhpcy5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XHJcblx0XHRcdHZhbHVlID0gY29uZmlnLmF4aXNfeF9jYXRlZ29yaWVzLmluZGV4T2YoZC52YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCgkJC5zY2FsZS54KHZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHR5dkN1c3RvbShkLCB4eVZhbHVlKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0ICQkID0gdGhpcztcclxuXHRcdGNvbnN0IHtzY2FsZX0gPSAkJDtcclxuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/IHNjYWxlLnkyIDogc2NhbGUueTtcclxuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdGluaXRTdGFuZm9yZERhdGEoKTogdm9pZCB7XHJcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXM7XHJcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLiQkLmRhdGEudGFyZ2V0c1swXTtcclxuXHJcblx0XHQvLyBUT0RPIFNUQU5GT1JEIHNlZSBpZiAoZGF0YS5qcyAtPiBvcmRlclRhcmdldHMpKyBjYW4gYmUgdXNlZCBpbnN0ZWFkXHJcblx0XHQvLyBNYWtlIGxhcmdlciB2YWx1ZXMgYXBwZWFyIG9uIHRvcFxyXG5cdFx0dGFyZ2V0LnZhbHVlcy5zb3J0KGNvbXBhcmVFcG9jaHMpO1xyXG5cclxuXHRcdC8vIEdldCBhcnJheSBvZiBlcG9jaHNcclxuXHRcdGNvbnN0IGVwb2NocyA9IHRhcmdldC52YWx1ZXMubWFwKGEgPT4gYS5lcG9jaHMpO1xyXG5cclxuXHRcdHRhcmdldC5taW5FcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21pbikgPyBjb25maWcuc2NhbGVfbWluIDogTWF0aC5taW4oLi4uZXBvY2hzKTtcclxuXHRcdHRhcmdldC5tYXhFcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21heCkgPyBjb25maWcuc2NhbGVfbWF4IDogTWF0aC5tYXgoLi4uZXBvY2hzKTtcclxuXHJcblx0XHR0YXJnZXQuY29sb3JzID0gaXNGdW5jdGlvbihjb25maWcuY29sb3JzKSA/XHJcblx0XHRcdGNvbmZpZy5jb2xvcnMgOiBkM0ludGVycG9sYXRlSHNsTG9uZyhkM0hzbCgyNTAsIDEsIDAuNSksIGQzSHNsKDAsIDEsIDAuNSkpO1xyXG5cclxuXHRcdHRhcmdldC5jb2xvcnNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWxMb2codGFyZ2V0LmNvbG9ycylcclxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pO1xyXG5cdH1cclxuXHJcblx0Z2V0U3RhbmZvcmRQb2ludENvbG9yKGQpIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YS50YXJnZXRzWzBdO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXQuY29sb3JzY2FsZShkLmVwb2Nocyk7XHJcblx0fVxyXG5cclxuXHRzZXRTdGFuZm9yZFRvb2x0aXAoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcy4kJDtcclxuXHJcblx0XHRpZiAoaXNFbXB0eShjb25maWcudG9vbHRpcF9jb250ZW50cykpIHtcclxuXHRcdFx0Y29uZmlnLnRvb2x0aXBfY29udGVudHMgPSBmdW5jdGlvbihkLCBkZWZhdWx0VGl0bGVGb3JtYXQsIGRlZmF1bHRWYWx1ZUZvcm1hdCwgY29sb3IpIHtcclxuXHRcdFx0XHRsZXQgaHRtbCA9IGA8dGFibGUgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXB9XCI+PHRib2R5PmA7XHJcblxyXG5cdFx0XHRcdGQuZm9yRWFjaCh2ID0+IHtcclxuXHRcdFx0XHRcdGh0bWwgKz0gYDx0cj5cclxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQoY29uZmlnLmRhdGFfeCl9PC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cclxuXHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxyXG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi52YWx1ZSl9PC90aD5cclxuXHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxyXG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5hbWVcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtjb2xvcih2KX1cIj48L3NwYW4+JHtkZWZhdWx0VGl0bGVGb3JtYXQoXCJFcG9jaHNcIil9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYuZXBvY2hzKX08L3RkPlxyXG5cdFx0XHRcdFx0XHQ8L3RyPmA7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y291bnRFcG9jaHNJblJlZ2lvbihyZWdpb24pOiB7dmFsdWU6IG51bWJlciwgcGVyY2VudGFnZTogbnVtYmVyfSB7XHJcblx0XHRjb25zdCAkJCA9IHRoaXM7XHJcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XHJcblxyXG5cdFx0Y29uc3QgdG90YWwgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT5cclxuXHRcdFx0YWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2NocyksIDApO1xyXG5cclxuXHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcclxuXHRcdFx0aWYgKHBvaW50SW5SZWdpb24oY3VycmVudFZhbHVlLCByZWdpb24pKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYWNjdW11bGF0b3I7XHJcblx0XHR9LCAwKTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR2YWx1ZSxcclxuXHRcdFx0cGVyY2VudGFnZTogdmFsdWUgIT09IDAgPyArKHZhbHVlIC8gdG90YWwgKiAxMDApLnRvRml4ZWQoMSkgOiAwXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxyXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICovXHJcbi8qKlxyXG4gKiBXaW5kb3cgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cclxuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xyXG5cclxuY29uc3Qgd2luID0gKCgpID0+IHtcclxuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvICE9PSBcInVuZGVmaW5lZFwiICYmIG87XHJcblxyXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcclxufSkoKTtcclxuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cclxuXHJcbmNvbnN0IGRvYyA9IHdpbiAmJiB3aW4uZG9jdW1lbnQ7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXHJcbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5pbXBvcnQge2V2ZW50IGFzIGQzRXZlbnR9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcclxuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcclxuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XHJcbmltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSBcIi4vYnJvd3NlclwiO1xyXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdGFzSGFsZlBpeGVsLFxyXG5cdGJydXNoRW1wdHksXHJcblx0Y2FsbEZuLFxyXG5cdGNhcGl0YWxpemUsXHJcblx0Y2VpbDEwLFxyXG5cdGNvbnZlcnRJbnB1dFR5cGUsXHJcblx0ZGlmZkRvbWFpbixcclxuXHRlbmRhbGwsXHJcblx0ZW11bGF0ZUV2ZW50LFxyXG5cdGV4dGVuZCxcclxuXHRnZXRCcnVzaFNlbGVjdGlvbixcclxuXHRnZXRCb3VuZGluZ1JlY3QsXHJcblx0Z2V0Q3NzUnVsZXMsXHJcblx0Z2V0TWluTWF4LFxyXG5cdGdldE9wdGlvbixcclxuXHRnZXRQYXRoQm94LFxyXG5cdGdldFJhbmRvbSxcclxuXHRnZXRSYW5nZSxcclxuXHRnZXRSZWN0U2VnTGlzdCxcclxuXHRnZXRUcmFuc2xhdGlvbixcclxuXHRnZXRVbmlxdWUsXHJcblx0aGFzVmFsdWUsXHJcblx0aXNBcnJheSxcclxuXHRpc2Jvb2xlYW4sXHJcblx0aXNEZWZpbmVkLFxyXG5cdGlzRW1wdHksXHJcblx0aXNGdW5jdGlvbixcclxuXHRpc051bWJlcixcclxuXHRpc09iamVjdCxcclxuXHRpc09iamVjdFR5cGUsXHJcblx0aXNTdHJpbmcsXHJcblx0aXNUYWJWaXNpYmxlLFxyXG5cdGlzVW5kZWZpbmVkLFxyXG5cdGlzVmFsdWUsXHJcblx0bWVyZ2VBcnJheSxcclxuXHRtZXJnZU9iaixcclxuXHRub3RFbXB0eSxcclxuXHRwYXJzZURhdGUsXHJcblx0c2FuaXRpc2UsXHJcblx0c2V0VGV4dFZhbHVlLFxyXG5cdHNvcnRWYWx1ZSxcclxuXHR0b0FycmF5LFxyXG5cdHRwbFByb2Nlc3NcclxufTtcclxuXHJcbmNvbnN0IGlzVmFsdWUgPSAodjogYW55KTogYm9vbGVhbiA9PiB2IHx8IHYgPT09IDA7XHJcbmNvbnN0IGlzRnVuY3Rpb24gPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiO1xyXG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xyXG5jb25zdCBpc051bWJlciA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xyXG5jb25zdCBpc1VuZGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInVuZGVmaW5lZFwiO1xyXG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcclxuY29uc3QgaXNib29sZWFuID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xyXG5jb25zdCBjZWlsMTAgPSAodjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XHJcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XHJcbmNvbnN0IGRpZmZEb21haW4gPSAoZDogbnVtYmVyW10pOiBudW1iZXIgPT4gZFsxXSAtIGRbMF07XHJcbmNvbnN0IGlzT2JqZWN0VHlwZSA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xyXG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxyXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcclxuXHQoaXNTdHJpbmcobykgJiYgby5sZW5ndGggPT09IDApIHx8XHJcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XHJcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxyXG4pO1xyXG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGlzIGFycmF5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIHRvIGJlIGNoZWNrZWRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5jb25zdCBpc0FycmF5ID0gKGFycjogYW55KTogYm9vbGVhbiA9PiBBcnJheS5pc0FycmF5KGFycik7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaXMgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpOiBib29sZWFuID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XHJcblxyXG4vKipcclxuICogR2V0IHNwZWNpZmllZCBrZXkgdmFsdWUgZnJvbSBvYmplY3RcclxuICogSWYgZGVmYXVsdCB2YWx1ZSBpcyBnaXZlbiwgd2lsbCByZXR1cm4gaWYgZ2l2ZW4ga2V5IHZhbHVlIG5vdCBmb3VuZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IHZhbHVlXHJcbiAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWVcclxuICogQHJldHVybnMgeyp9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcclxuXHRyZXR1cm4gaXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB2YWx1ZSBleGlzdCBpbiB0aGUgZ2l2ZW4gb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxyXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGJlIGNoZWNrZWRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBoYXNWYWx1ZShkaWN0OiBvYmplY3QsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuXHRsZXQgZm91bmQgPSBmYWxzZTtcclxuXHJcblx0T2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChrZXkgPT4gKGRpY3Rba2V5XSA9PT0gdmFsdWUpICYmIChmb3VuZCA9IHRydWUpKTtcclxuXHJcblx0cmV0dXJuIGZvdW5kO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsbCBmdW5jdGlvbiB3aXRoIGFyZ3VtZW50c1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcclxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZTogZm4gaXMgZnVuY3Rpb24sIGZhbHNlOiBmbiBpcyBub3QgZnVuY3Rpb25cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGNhbGxGbihmbiwgLi4uYXJncyk6IGJvb2xlYW4ge1xyXG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcclxuXHJcblx0aXNGbiAmJiBmbi5jYWxsKC4uLmFyZ3MpO1xyXG5cdHJldHVybiBpc0ZuO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsbCBmdW5jdGlvbiBhZnRlciBhbGwgdHJhbnNpdGlvbnMgZW5kc1xyXG4gKiBAcGFyYW0ge2QzLnRyYW5zaXRpb259IHRyYW5zaXRpb24gVHJhbnNpdGlvblxyXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xyXG5cdGxldCBuID0gMDtcclxuXHJcblx0dHJhbnNpdGlvblxyXG5cdFx0LmVhY2goKCkgPT4gKytuKVxyXG5cdFx0Lm9uKFwiZW5kXCIsIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcclxuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVwbGFjZSB0YWcgc2lnbiB0byBodG1sIGVudGl0eVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHNhbml0aXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRyZXR1cm4gaXNTdHJpbmcoc3RyKSA/XHJcblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxyXG4gKiBAcGFyYW0ge2QzU2VsZWN0aW9ufSBub2RlIFRleHQgbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG9NaWRkbGUgVG8gYmUgYWxpbmduZWQgdmVydGljYWxseSBtaWRkbGVcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIHNldFRleHRWYWx1ZShcclxuXHRub2RlOiBkM1NlbGVjdGlvbixcclxuXHR0ZXh0OiBzdHJpbmcsXHJcblx0ZHk6IG51bWJlcltdID0gWy0xLCAxXSxcclxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXHJcbikge1xyXG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XHJcblx0XHRub2RlLnRleHQodGV4dCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xyXG5cclxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XHJcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XHJcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xyXG5cclxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxyXG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XHJcblxyXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcclxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxyXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXHJcblx0XHRcdFx0XHQudGV4dCh2KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogU3Vic3RpdHV0aW9uIG9mIFNWR1BhdGhTZWcgQVBJIHBvbHlmaWxsXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRSZWN0U2VnTGlzdChwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnQpOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9W10ge1xyXG5cdC8qXHJcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcclxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XHJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcclxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xyXG5cdCAqICovXHJcblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XHJcblxyXG5cdHJldHVybiBbXHJcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcclxuXHRcdHt4LCB5fSwgLy8gc2VnMVxyXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcclxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcclxuXHRdO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHN2ZyBib3VuZGluZyBwYXRoIGJveCBkaW1lbnNpb25cclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXRoQm94KFxyXG5cdHBhdGg6IFNWR0dyYXBoaWNzRWxlbWVudFxyXG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XHJcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRjb25zdCBpdGVtcyA9IGdldFJlY3RTZWdMaXN0KHBhdGgpO1xyXG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xyXG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcclxuXHR9O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxyXG4gKiBAcGFyYW0ge29iamVjdH0gJGVsIFNlbGVjdGlvbiBvYmplY3RcclxuICogQHJldHVybnMge2QzLmJydXNoU2VsZWN0aW9ufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QnJ1c2hTZWxlY3Rpb24oeyRlbH0pIHtcclxuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XHJcblx0Y29uc3QgbWFpbiA9ICRlbC5zdWJjaGFydC5tYWluIHx8ICRlbC5tYWluO1xyXG5cdGxldCBzZWxlY3Rpb247XHJcblxyXG5cdC8vIGNoZWNrIGZyb20gZXZlbnRcclxuXHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSB7XHJcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XHJcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxyXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcclxuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzZWxlY3Rpb247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYm91bmRpbmdDbGllbnRSZWN0LlxyXG4gKiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgZ2V0Qm91bmRpbmdSZWN0ID0gKG5vZGUpOiB7XHJcblx0bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsXHJcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXHJcbn0gPT4gbm9kZS5yZWN0IHx8IChub2RlLnJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcclxuXHJcbi8qKlxyXG4gKiBSZXRydW4gcmFuZG9tIG51bWJlclxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzU3RyIENvbnZlcnQgcmV0dXJuZWQgdmFsdWUgYXMgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XHJcblx0Y29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxyXG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBicnVzaEVtcHR5KGN0eCk6IGJvb2xlYW4ge1xyXG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XHJcblxyXG5cdGlmIChzZWxlY3Rpb24pIHtcclxuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcclxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cclxuXHRcdC8vIG9uZS1kaW1lbnNpb25hbDogW3gwLCB4MV0gb3IgW3kwLCB5MV1cclxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcclxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCBUYXJnZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzb3VyY2UgU291cmNlIG9iamVjdFxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xyXG5cdGlmIChpc0FycmF5KHNvdXJjZSkpIHtcclxuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXHJcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xyXG5cdFx0aWYgKC9eXFxkKyQvLnRlc3QocCkpIHtcclxuXHRcdFx0Y29udGludWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUYXJnZXQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XHJcblxyXG4vKipcclxuICogQ29udmVydCB0byBhcnJheVxyXG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IHRvQXJyYXkgPSAodjogQ1NTU3R5bGVEZWNsYXJhdGlvbiB8IGFueSk6IGFueSA9PiBbXS5zbGljZS5jYWxsKHYpO1xyXG5cclxuLyoqXHJcbiAqIEdldCBjc3MgcnVsZXMgZm9yIHNwZWNpZmllZCBzdHlsZXNoZWV0c1xyXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xyXG5cdGxldCBydWxlcyA9IFtdO1xyXG5cclxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gcnVsZXM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcclxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7U1ZHTWF0cml4fSBtYXRyaXhcclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGdldFRyYW5zbGF0aW9uID0gbm9kZSA9PiB7XHJcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcclxuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xyXG5cclxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xyXG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XHJcblx0XHR7YTogMCwgYjogMCwgYzogMCwgZDogMCwgZTogMCwgZjogMH07XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcclxuICogQHJldHVybnMge0FycmF5fSBVbmlxdWUgYXJyYXkgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFVuaXF1ZShkYXRhOiBhbnlbXSk6IGFueVtdIHtcclxuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcclxuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxyXG5cdFx0LmZpbHRlcigodiwgaSwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHYpID09PSBpKTtcclxuXHJcblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlIGFycmF5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xyXG5cdHJldHVybiBhcnIgJiYgYXJyLmxlbmd0aCA/IGFyci5yZWR1Y2UoKHAsIGMpID0+IHAuY29uY2F0KGMpKSA6IFtdO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxyXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0TiBTb3VyY2Ugb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XHJcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XHJcblx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdH1cclxuXHJcblx0Y29uc3Qgc291cmNlID0gb2JqZWN0Ti5zaGlmdCgpO1xyXG5cclxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XHJcblx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuXHJcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcclxuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cclxuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTb3J0IHZhbHVlXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgdmFsdWUgdG8gYmUgc29ydGVkXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XHJcblx0bGV0IGZuO1xyXG5cclxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdGZuID0gaXNBc2MgPyAoYSwgYikgPT4gYSAtIGIgOiAoYSwgYikgPT4gYiAtIGE7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcclxuXHRcdFx0Zm4gPSAoYSwgYikgPT4gYSAtIGI7XHJcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xyXG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhLmNvbmNhdCgpLnNvcnQoZm4pO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IG1pbi9tYXggdmFsdWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBkYXRhIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XHJcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xyXG5cclxuXHRpZiAocmVzLmxlbmd0aCkge1xyXG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcclxuXHRcdFx0cmVzID0gTWF0aFt0eXBlXSguLi5yZXMpO1xyXG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XHJcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXMgPSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHJhbmdlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIFN0ZXAgbnVtYmVyXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcclxuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XHJcblx0Y29uc3QgbiA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCkpIHwgMDtcclxuXHJcblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XHJcblx0XHRyZXMucHVzaChzdGFydCArIGkgKiBzdGVwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn07XHJcblxyXG4vLyBlbXVsYXRlIGV2ZW50XHJcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcclxuXHRtb3VzZTogKCgpID0+IHtcclxuXHRcdGNvbnN0IGdldFBhcmFtcyA9ICgpID0+ICh7XHJcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xyXG5cdFx0XHRuZXcgTW91c2VFdmVudChcInRcIik7XHJcblxyXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xyXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMpKTtcclxuXHRcdFx0fTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gUG9seWZpbGxzIERPTTQgTW91c2VFdmVudFxyXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XHJcblxyXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XHJcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcclxuXHRcdFx0XHRcdGV2ZW50VHlwZSxcclxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxyXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXHJcblx0XHRcdFx0XHR3aW5kb3csXHJcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxyXG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxyXG5cdFx0XHRcdFx0cGFyYW1zLmNsaWVudFgsIHBhcmFtcy5jbGllbnRZLFxyXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0pKCksXHJcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdGNvbnN0IHRvdWNoT2JqID0gbmV3IFRvdWNoKG1lcmdlT2JqKHtcclxuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcclxuXHRcdFx0dGFyZ2V0OiBlbCxcclxuXHRcdFx0cmFkaXVzWDogMi41LFxyXG5cdFx0XHRyYWRpdXNZOiAyLjUsXHJcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxyXG5cdFx0XHRmb3JjZTogMC41XHJcblx0XHR9LCBwYXJhbXMpKTtcclxuXHJcblx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBUb3VjaEV2ZW50KGV2ZW50VHlwZSwge1xyXG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRzaGlmdEtleTogdHJ1ZSxcclxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcclxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXHJcblx0XHRcdGNoYW5nZWRUb3VjaGVzOiBbdG91Y2hPYmpdXHJcblx0XHR9KSk7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgdGhlIHRlbXBsYXRlICAmIHJldHVybiBib3VuZCBzdHJpbmdcclxuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gdHBsUHJvY2Vzcyh0cGw6IHN0cmluZywgZGF0YTogb2JqZWN0KTogc3RyaW5nIHtcclxuXHRsZXQgcmVzID0gdHBsO1xyXG5cclxuXHRmb3IgKGNvbnN0IHggaW4gZGF0YSkge1xyXG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXHJcbiAqIChJdCBtdXN0IGJlIGNhbGxlZCBpbiAnQ2hhcnRJbnRlcm5hbCcgY29udGV4dClcclxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcclxuICogQHJldHVybnMge0RhdGV9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xyXG5cdGxldCBwYXJzZWREYXRlO1xyXG5cclxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuXHRcdHBhcnNlZERhdGUgPSBkYXRlO1xyXG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcclxuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xyXG5cclxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XHJcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcclxuXHRcdHBhcnNlZERhdGUgPSBuZXcgRGF0ZSgrZGF0ZSk7XHJcblx0fVxyXG5cclxuXHRpZiAoIXBhcnNlZERhdGUgfHwgaXNOYU4oK3BhcnNlZERhdGUpKSB7XHJcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcclxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybiBpZiB0aGUgY3VycmVudCBkb2MgaXMgdmlzaWJsZSBvciBub3RcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XHJcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcclxuICogQHJldHVybnMge3N0cmluZ30gXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gY29udmVydElucHV0VHlwZShtb3VzZTogYm9vbGVhbiwgdG91Y2g6IGJvb2xlYW4pOiBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsIHtcclxuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcclxuXHJcblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9Ccm93c2VyX2RldGVjdGlvbl91c2luZ190aGVfdXNlcl9hZ2VudCNNb2JpbGVfVGFibGV0X29yX0Rlc2t0b3BcclxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XHJcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXHJcblx0XHRjb25zdCBoYXNUb3VjaFBvaW50cyA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgXCJtYXhUb3VjaFBvaW50c1wiIGluIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XHJcblxyXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcclxuXHRcdC8vIE9uIElFMTEgd2l0aCBJRTkgZW11bGF0aW9uIG1vZGUsICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIGlzIHJldHVybmluZyB0cnVlXHJcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XHJcblxyXG5cdFx0aXNNb2JpbGUgPSBoYXNUb3VjaFBvaW50cyB8fCBoYXNUb3VjaDtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGhhc01vdXNlID0gbW91c2UgJiYgIWlzTW9iaWxlID8gKFwib25tb3VzZW92ZXJcIiBpbiB3aW5kb3cpIDogZmFsc2U7XHJcblxyXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=