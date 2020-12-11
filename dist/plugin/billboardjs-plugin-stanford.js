/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 2.1.4-nightly-20201211180830
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-interpolate", "d3-color", "d3-scale", "d3-selection", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ Stanford
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(3);
// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(4);
// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(5);
;// CONCATENATED MODULE: ./src/config/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ const classes = ({
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
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(6);
;// CONCATENATED MODULE: ./src/module/browser.ts
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
    return typeof o === "object" && o !== null && o.Object === Object && o;
  },
      freeGlobal = def(global); // Prioritize referencing Node.js global first to prevent refence error
  // https://github.com/naver/billboard.js/issues/1778


  try {
    freeGlobal || (freeGlobal = def(globalThis) || def(self) || def(window));
  } catch (e) {}

  return freeGlobal || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
;// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

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
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.event,
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes.brush).node()) && (selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection)), selection;
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
 * @private
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
;// CONCATENATED MODULE: ./src/config/config.ts
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
    return key && target && isObjectType(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), isDefined(read) && (thisConfig[key] = read);
  });
}
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
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
    options === void 0 && (options = {}), this.$$ = void 0, this.options = void 0, this.options = options;
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

Plugin.version = "2.1.4";

;// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ const stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
;// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts
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

var Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    this.owner = void 0, this.owner = owner;
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
    return axis.isTimeSeries() ? value = parseDate.call($$, value) : axis.isCategorized() && isString(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(7);
// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(8);
;// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts
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

var ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    this.owner = void 0, this.colorScale = void 0, this.owner = owner;
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
        points = getRange(config.padding_bottom, height, barHeight),
        inverseScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequential)(target.colors).domain([points[points.length - 1], points[0]]);
    this.colorScale && this.colorScale.remove(), this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      return i * barHeight;
    }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
      return inverseScale(d);
    });
    // Legend Axis
    var axisScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLog)().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
        legendAxis = (0,external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight)(axisScale),
        scaleFormat = config.scale_format;
    scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : isFunction(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat((0,external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_.format)("d"));
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


;// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts



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

var Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.config = void 0, _this.colorScale = void 0, _this.elements = void 0, _this.config = new Options(), _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(Stanford, _Plugin);

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
    loadConfig.call(this, this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale(this), this.elements = new Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
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
    return axis.isTimeSeries() ? value = parseDate.call($$, value) : axis.isCategorized() && isString(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
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
    target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, epochs) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, epochs) : config.scale_max, target.colors = isFunction(config.colors) ? config.colors : (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolateHslLong)((0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(250, 1, .5), (0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(0, 1, .5)), target.colorscale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequentialLog)(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }, _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }, _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    isEmpty(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
      var html = "<table class=\"" + classes.tooltip + "\"><tbody>";
      return d.forEach(function (v) {
        html += "<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(config.data_x) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(v.id) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + classes.tooltipName + "-" + v.id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>" + defaultTitleFormat("Epochs") + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(v.epochs) + "</td>\n\t\t\t\t\t\t</tr>";
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
}(Plugin);



/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(2);
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zZWxlY3Rpb25cIixcImNvbW1vbmpzMlwiOlwiZDMtc2VsZWN0aW9uXCIsXCJhbWRcIjpcImQzLXNlbGVjdGlvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvY29uZmlnL2NsYXNzZXMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL1BsdWdpbi50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9PcHRpb25zLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL2NsYXNzZXMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvdXRpbC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9FbGVtZW50cy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9Db2xvclNjYWxlLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL2luZGV4LnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWludGVycG9sYXRlXCIsXCJjb21tb25qczJcIjpcImQzLWludGVycG9sYXRlXCIsXCJhbWRcIjpcImQzLWludGVycG9sYXRlXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1jb2xvclwiLFwiY29tbW9uanMyXCI6XCJkMy1jb2xvclwiLFwiYW1kXCI6XCJkMy1jb2xvclwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2NhbGVcIixcImNvbW1vbmpzMlwiOlwiZDMtc2NhbGVcIixcImFtZFwiOlwiZDMtc2NhbGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWJydXNoXCIsXCJjb21tb25qczJcIjpcImQzLWJydXNoXCIsXCJhbWRcIjpcImQzLWJydXNoXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1heGlzXCIsXCJjb21tb25qczJcIjpcImQzLWF4aXNcIixcImFtZFwiOlwiZDMtYXhpc1wiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtZm9ybWF0XCIsXCJjb21tb25qczJcIjpcImQzLWZvcm1hdFwiLFwiYW1kXCI6XCJkMy1mb3JtYXRcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImFyYyIsImFyY0xhYmVsTGluZSIsImFyY3MiLCJhcmVhIiwiYXJlYXMiLCJheGlzIiwiYXhpc1giLCJheGlzWExhYmVsIiwiYXhpc1kiLCJheGlzWTIiLCJheGlzWTJMYWJlbCIsImF4aXNZTGFiZWwiLCJiYXIiLCJiYXJzIiwiYnJ1c2giLCJidXR0b24iLCJidXR0b25ab29tUmVzZXQiLCJjaGFydCIsImNoYXJ0QXJjIiwiY2hhcnRBcmNzIiwiY2hhcnRBcmNzQmFja2dyb3VuZCIsImNoYXJ0QXJjc0dhdWdlTWF4IiwiY2hhcnRBcmNzR2F1Z2VNaW4iLCJjaGFydEFyY3NHYXVnZVVuaXQiLCJjaGFydEFyY3NUaXRsZSIsImNoYXJ0QXJjc0dhdWdlVGl0bGUiLCJjaGFydEJhciIsImNoYXJ0QmFycyIsImNoYXJ0Q2lyY2xlcyIsImNoYXJ0TGluZSIsImNoYXJ0TGluZXMiLCJjaGFydFJhZGFyIiwiY2hhcnRSYWRhcnMiLCJjaGFydFRleHQiLCJjaGFydFRleHRzIiwiY2lyY2xlIiwiY2lyY2xlcyIsImNvbG9yUGF0dGVybiIsImNvbG9yU2NhbGUiLCJkZWZvY3VzZWQiLCJkcmFnYXJlYSIsImVtcHR5IiwiZXZlbnRSZWN0IiwiZXZlbnRSZWN0cyIsImV2ZW50UmVjdHNNdWx0aXBsZSIsImV2ZW50UmVjdHNTaW5nbGUiLCJmb2N1c2VkIiwiZ2F1Z2VWYWx1ZSIsImdyaWQiLCJncmlkTGluZXMiLCJsZWdlbmQiLCJsZWdlbmRCYWNrZ3JvdW5kIiwibGVnZW5kSXRlbSIsImxlZ2VuZEl0ZW1FdmVudCIsImxlZ2VuZEl0ZW1Gb2N1c2VkIiwibGVnZW5kSXRlbUhpZGRlbiIsImxlZ2VuZEl0ZW1Qb2ludCIsImxlZ2VuZEl0ZW1UaWxlIiwibGV2ZWwiLCJsZXZlbHMiLCJsaW5lIiwibGluZXMiLCJtYWluIiwicmVnaW9uIiwicmVnaW9ucyIsInNlbGVjdGVkQ2lyY2xlIiwic2VsZWN0ZWRDaXJjbGVzIiwic2hhcGUiLCJzaGFwZXMiLCJzdGFuZm9yZEVsZW1lbnRzIiwic3RhbmZvcmRMaW5lIiwic3RhbmZvcmRMaW5lcyIsInN0YW5mb3JkUmVnaW9uIiwic3RhbmZvcmRSZWdpb25zIiwic3ViY2hhcnQiLCJ0YXJnZXQiLCJ0ZXh0IiwidGV4dHMiLCJ0aXRsZSIsInRvb2x0aXAiLCJ0b29sdGlwQ29udGFpbmVyIiwidG9vbHRpcE5hbWUiLCJ4Z3JpZCIsInhncmlkRm9jdXMiLCJ4Z3JpZExpbmUiLCJ4Z3JpZExpbmVzIiwieGdyaWRzIiwieWdyaWQiLCJ5Z3JpZEZvY3VzIiwieWdyaWRMaW5lIiwieWdyaWRMaW5lcyIsInlncmlkcyIsInpvb21CcnVzaCIsIkVYUEFOREVEIiwiU0VMRUNURUQiLCJJTkNMVURFRCIsIlRleHRPdmVybGFwcGluZyIsIndpbiIsImRlZiIsIm8iLCJPYmplY3QiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsInNlbGYiLCJ3aW5kb3ciLCJlIiwiRnVuY3Rpb24iLCJkb2MiLCJkb2N1bWVudCIsImlzVmFsdWUiLCJ2IiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzRGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsIk1hdGgiLCJjZWlsIiwiYXNIYWxmUGl4ZWwiLCJuIiwiZGlmZkRvbWFpbiIsImQiLCJpc09iamVjdFR5cGUiLCJpc0VtcHR5IiwibGVuZ3RoIiwiRGF0ZSIsImtleXMiLCJpc05hTiIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsIm9wdGlvbnMiLCJrZXkiLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJ2YWx1ZSIsImZvdW5kIiwiZm9yRWFjaCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJjYWxsIiwiZW5kYWxsIiwidHJhbnNpdGlvbiIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJub2RlIiwiZHkiLCJ0b01pZGRsZSIsImluZGV4T2YiLCJkaWZmIiwibWFwIiwibXVsdGlsaW5lIiwic3BsaXQiLCJsZW4iLCJodG1sIiwiaSIsImFwcGVuZCIsImF0dHIiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsIm1pbiIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiJGVsIiwiZXZlbnQiLCJkM0V2ZW50IiwidHlwZSIsInNlbGVjdCIsIkNMQVNTIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsIm5lZWRFdmFsdWF0ZSIsImhhc0F0dHJpYnV0ZSIsInJlY3QiLCJnZXRBdHRyaWJ1dGUiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJmaW5kSW5kZXgiLCJzdGFydCIsImVuZCIsImlzUm90YXRlZCIsIm1pZCIsImZsb29yIiwidyIsImgiLCJicnVzaEVtcHR5IiwiY3R4IiwiZGVlcENsb25lIiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsInIiLCJrIiwib2JqZWN0TiIsInJlZHVjZSIsImEiLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJiIiwiZiIsImdldFVuaXF1ZSIsImRhdGEiLCJpc0RhdGUiLCJOdW1iZXIiLCJmaWx0ZXIiLCJtZXJnZUFycmF5IiwibWVyZ2VPYmoiLCJzaGlmdCIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJzb3J0IiwiZ2V0TWluTWF4IiwicmVzIiwidW5kZWZpbmVkIiwiZ2V0UmFuZ2UiLCJzdGVwIiwibWF4IiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsInRvdWNoIiwidG91Y2hPYmoiLCJUb3VjaCIsImlkZW50aWZpZXIiLCJub3ciLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uQW5nbGUiLCJmb3JjZSIsIlRvdWNoRXZlbnQiLCJzaGlmdEtleSIsInRvdWNoZXMiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cGxQcm9jZXNzIiwidHBsIiwiUmVnRXhwIiwicGFyc2VEYXRlIiwiZGF0ZSIsInBhcnNlZERhdGUiLCJjb25maWciLCJmb3JtYXQiLCJkYXRhVGltZSIsImRhdGFfeEZvcm1hdCIsImlzVGFiVmlzaWJsZSIsImNvbnZlcnRJbnB1dFR5cGUiLCJpc01vYmlsZSIsImhhc1RvdWNoUG9pbnRzIiwiaGFzVG91Y2giLCJoYXNNb3VzZSIsImxvYWRDb25maWciLCJyZWFkIiwidGhpc0NvbmZpZyIsImZpbmQiLCJQbHVnaW4iLCIkJCIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsInZlcnNpb24iLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsImluc2lkZSIsImoiLCJ4aSIsInlpIiwieGoiLCJ5aiIsImNvbXBhcmVFcG9jaHMiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiRWxlbWVudHMiLCJvd25lciIsImVsZW1lbnRzIiwidXBkYXRlU3RhbmZvcmRMaW5lcyIsImR1cmF0aW9uIiwiYXhpc19yb3RhdGVkIiwieHZDdXN0b20iLCJiaW5kIiwieXZDdXN0b20iLCJzdHlsZSIsInNlbGVjdEFsbCIsImV4aXQiLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJjbGFzcyIsInVwZGF0ZVN0YW5mb3JkUmVnaW9ucyIsImNvdW50UG9pbnRzSW5SZWdpb24iLCJjb3VudEVwb2Noc0luUmVnaW9uIiwic3RhbmZvcmRSZWdpb25FbnRlciIsImpvaW4iLCJvcGFjaXR5IiwicGVyY2VudGFnZSIsInVwZGF0ZVN0YW5mb3JkRWxlbWVudHMiLCJ4eVZhbHVlIiwiZ2V0QmFzZVZhbHVlIiwiaXNUaW1lU2VyaWVzIiwiaXNDYXRlZ29yaXplZCIsImF4aXNfeF9jYXRlZ29yaWVzIiwic2NhbGUiLCJ5U2NhbGUiLCJ5MiIsIkNvbG9yU2NhbGUiLCJkcmF3Q29sb3JTY2FsZSIsInRhcmdldHMiLCJzdGF0ZSIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJ0aWNrRm9ybWF0IiwiZDNGb3JtYXQiLCJwb3ciLCJsb2ciLCJMTjEwIiwicm91bmQiLCJjdXJyZW50IiwieEZvckNvbG9yU2NhbGUiLCJnZXRDb2xvclNjYWxlUGFkZGluZyIsIlN0YW5mb3JkIiwiZGF0YV94U29ydCIsImlzTXVsdGlwbGVYIiwic2hvd0dyaWRGb2N1cyIsImxhYmVsaXNoRGF0YSIsInZhbHVlcyIsIm9wYWNpdHlGb3JDaXJjbGUiLCJnZXRDdXJyZW50UGFkZGluZ1JpZ2h0IiwiY29sb3IiLCJnZXRTdGFuZm9yZFBvaW50Q29sb3IiLCJjb252ZXJ0RGF0YSIsImluaXRTdGFuZm9yZERhdGEiLCJzZXRTdGFuZm9yZFRvb2x0aXAiLCJnZXRPcHRpb25zIiwiY29sb3JzY2FsZSIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsInRvb2x0aXBfY29udGVudHMiLCJkZWZhdWx0VGl0bGVGb3JtYXQiLCJkZWZhdWx0VmFsdWVGb3JtYXQiLCJkYXRhX3giLCJpZCIsInRvdGFsIiwiYWNjdW11bGF0b3IiLCJjdXJyZW50VmFsdWUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPOzs7Ozs7O0FDVkEsZ0Q7Ozs7Ozs7Ozs7Ozs7QUNBZTtBQUNmO0FB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RUFBY0MsWUFBZDtBQUFBLGFBQ2xDRCxXQUFXLElBQVVDLFlBQVksQ0FBQzlHLE1BREE7QUFBQSxLQUFyQixFQUM4QixDQUQ5QixDQUprRDtBQUFBLFFBTzFEekwsS0FBSyxHQUFHckUsTUFBTSxDQUFDd1YsTUFBUCxDQUFjdk0sTUFBZCxDQUFxQixVQUFDME4sV0FBRCxFQUFjQyxZQUFkLEVBQStCO0FBQUEsYUFDN0RyRyxhQUFhLENBQUNxRyxZQUFELEVBQWV4WCxNQUFmLENBRGdELEdBRXpEdVgsV0FBVyxJQUFVQyxZQUFZLENBQUM5RyxNQUZ1QixHQUsxRDZHLFdBTDBEO0FBTWpFLEtBTmEsRUFNWCxDQU5XLENBUGtEO0FBZWhFLFdBQU87QUFDTnRTLFdBQUssRUFBTEEsS0FETTtBQUVOd08sZ0JBQVUsRUFBRXhPLEtBQUssS0FBSyxDQUFWLEdBQWtELENBQWxELEdBQWMsQ0FBQyxDQUFDQSxLQUFLLEdBQUdxUyxLQUFSLEdBQWdCLEdBQWpCLEVBQXNCRyxPQUF0QixDQUE4QixDQUE5QjtBQUZyQixLQUFQO0FBSUEsRztFQTFLb0N6SCxNOzs7Ozs7OztBQ3JHdEMsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmJcIiwgW1wiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtc2VsZWN0aW9uXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJiXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX181X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXykge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0YXJjOiBcImJiLWFyY1wiLFxuXHRhcmNMYWJlbExpbmU6IFwiYmItYXJjLWxhYmVsLWxpbmVcIixcblx0YXJjczogXCJiYi1hcmNzXCIsXG5cdGFyZWE6IFwiYmItYXJlYVwiLFxuXHRhcmVhczogXCJiYi1hcmVhc1wiLFxuXHRheGlzOiBcImJiLWF4aXNcIixcblx0YXhpc1g6IFwiYmItYXhpcy14XCIsXG5cdGF4aXNYTGFiZWw6IFwiYmItYXhpcy14LWxhYmVsXCIsXG5cdGF4aXNZOiBcImJiLWF4aXMteVwiLFxuXHRheGlzWTI6IFwiYmItYXhpcy15MlwiLFxuXHRheGlzWTJMYWJlbDogXCJiYi1heGlzLXkyLWxhYmVsXCIsXG5cdGF4aXNZTGFiZWw6IFwiYmItYXhpcy15LWxhYmVsXCIsXG5cdGJhcjogXCJiYi1iYXJcIixcblx0YmFyczogXCJiYi1iYXJzXCIsXG5cdGJydXNoOiBcImJiLWJydXNoXCIsXG5cdGJ1dHRvbjogXCJiYi1idXR0b25cIixcblx0YnV0dG9uWm9vbVJlc2V0OiBcImJiLXpvb20tcmVzZXRcIixcblx0Y2hhcnQ6IFwiYmItY2hhcnRcIixcblx0Y2hhcnRBcmM6IFwiYmItY2hhcnQtYXJjXCIsXG5cdGNoYXJ0QXJjczogXCJiYi1jaGFydC1hcmNzXCIsXG5cdGNoYXJ0QXJjc0JhY2tncm91bmQ6IFwiYmItY2hhcnQtYXJjcy1iYWNrZ3JvdW5kXCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWF4OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWF4XCIsXG5cdGNoYXJ0QXJjc0dhdWdlTWluOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtbWluXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVW5pdDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXVuaXRcIixcblx0Y2hhcnRBcmNzVGl0bGU6IFwiYmItY2hhcnQtYXJjcy10aXRsZVwiLFxuXHRjaGFydEFyY3NHYXVnZVRpdGxlOiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdGl0bGVcIixcblx0Y2hhcnRCYXI6IFwiYmItY2hhcnQtYmFyXCIsXG5cdGNoYXJ0QmFyczogXCJiYi1jaGFydC1iYXJzXCIsXG5cdGNoYXJ0Q2lyY2xlczogXCJiYi1jaGFydC1jaXJjbGVzXCIsXG5cdGNoYXJ0TGluZTogXCJiYi1jaGFydC1saW5lXCIsXG5cdGNoYXJ0TGluZXM6IFwiYmItY2hhcnQtbGluZXNcIixcblx0Y2hhcnRSYWRhcjogXCJiYi1jaGFydC1yYWRhclwiLFxuXHRjaGFydFJhZGFyczogXCJiYi1jaGFydC1yYWRhcnNcIixcblx0Y2hhcnRUZXh0OiBcImJiLWNoYXJ0LXRleHRcIixcblx0Y2hhcnRUZXh0czogXCJiYi1jaGFydC10ZXh0c1wiLFxuXHRjaXJjbGU6IFwiYmItY2lyY2xlXCIsXG5cdGNpcmNsZXM6IFwiYmItY2lyY2xlc1wiLFxuXHRjb2xvclBhdHRlcm46IFwiYmItY29sb3ItcGF0dGVyblwiLFxuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0ZGVmb2N1c2VkOiBcImJiLWRlZm9jdXNlZFwiLFxuXHRkcmFnYXJlYTogXCJiYi1kcmFnYXJlYVwiLFxuXHRlbXB0eTogXCJiYi1lbXB0eVwiLFxuXHRldmVudFJlY3Q6IFwiYmItZXZlbnQtcmVjdFwiLFxuXHRldmVudFJlY3RzOiBcImJiLWV2ZW50LXJlY3RzXCIsXG5cdGV2ZW50UmVjdHNNdWx0aXBsZTogXCJiYi1ldmVudC1yZWN0cy1tdWx0aXBsZVwiLFxuXHRldmVudFJlY3RzU2luZ2xlOiBcImJiLWV2ZW50LXJlY3RzLXNpbmdsZVwiLFxuXHRmb2N1c2VkOiBcImJiLWZvY3VzZWRcIixcblx0Z2F1Z2VWYWx1ZTogXCJiYi1nYXVnZS12YWx1ZVwiLFxuXHRncmlkOiBcImJiLWdyaWRcIixcblx0Z3JpZExpbmVzOiBcImJiLWdyaWQtbGluZXNcIixcblx0bGVnZW5kOiBcImJiLWxlZ2VuZFwiLFxuXHRsZWdlbmRCYWNrZ3JvdW5kOiBcImJiLWxlZ2VuZC1iYWNrZ3JvdW5kXCIsXG5cdGxlZ2VuZEl0ZW06IFwiYmItbGVnZW5kLWl0ZW1cIixcblx0bGVnZW5kSXRlbUV2ZW50OiBcImJiLWxlZ2VuZC1pdGVtLWV2ZW50XCIsXG5cdGxlZ2VuZEl0ZW1Gb2N1c2VkOiBcImJiLWxlZ2VuZC1pdGVtLWZvY3VzZWRcIixcblx0bGVnZW5kSXRlbUhpZGRlbjogXCJiYi1sZWdlbmQtaXRlbS1oaWRkZW5cIixcblx0bGVnZW5kSXRlbVBvaW50OiBcImJiLWxlZ2VuZC1pdGVtLXBvaW50XCIsXG5cdGxlZ2VuZEl0ZW1UaWxlOiBcImJiLWxlZ2VuZC1pdGVtLXRpbGVcIixcblx0bGV2ZWw6IFwiYmItbGV2ZWxcIixcblx0bGV2ZWxzOiBcImJiLWxldmVsc1wiLFxuXHRsaW5lOiBcImJiLWxpbmVcIixcblx0bGluZXM6IFwiYmItbGluZXNcIixcblx0bWFpbjogXCJiYi1tYWluXCIsXG5cdHJlZ2lvbjogXCJiYi1yZWdpb25cIixcblx0cmVnaW9uczogXCJiYi1yZWdpb25zXCIsXG5cdHNlbGVjdGVkQ2lyY2xlOiBcImJiLXNlbGVjdGVkLWNpcmNsZVwiLFxuXHRzZWxlY3RlZENpcmNsZXM6IFwiYmItc2VsZWN0ZWQtY2lyY2xlc1wiLFxuXHRzaGFwZTogXCJiYi1zaGFwZVwiLFxuXHRzaGFwZXM6IFwiYmItc2hhcGVzXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIixcblx0c3ViY2hhcnQ6IFwiYmItc3ViY2hhcnRcIixcblx0dGFyZ2V0OiBcImJiLXRhcmdldFwiLFxuXHR0ZXh0OiBcImJiLXRleHRcIixcblx0dGV4dHM6IFwiYmItdGV4dHNcIixcblx0dGl0bGU6IFwiYmItdGl0bGVcIixcblx0dG9vbHRpcDogXCJiYi10b29sdGlwXCIsXG5cdHRvb2x0aXBDb250YWluZXI6IFwiYmItdG9vbHRpcC1jb250YWluZXJcIixcblx0dG9vbHRpcE5hbWU6IFwiYmItdG9vbHRpcC1uYW1lXCIsXG5cdHhncmlkOiBcImJiLXhncmlkXCIsXG5cdHhncmlkRm9jdXM6IFwiYmIteGdyaWQtZm9jdXNcIixcblx0eGdyaWRMaW5lOiBcImJiLXhncmlkLWxpbmVcIixcblx0eGdyaWRMaW5lczogXCJiYi14Z3JpZC1saW5lc1wiLFxuXHR4Z3JpZHM6IFwiYmIteGdyaWRzXCIsXG5cdHlncmlkOiBcImJiLXlncmlkXCIsXG5cdHlncmlkRm9jdXM6IFwiYmIteWdyaWQtZm9jdXNcIixcblx0eWdyaWRMaW5lOiBcImJiLXlncmlkLWxpbmVcIixcblx0eWdyaWRMaW5lczogXCJiYi15Z3JpZC1saW5lc1wiLFxuXHR5Z3JpZHM6IFwiYmIteWdyaWRzXCIsXG5cdHpvb21CcnVzaDogXCJiYi16b29tLWJydXNoXCIsXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFdpbmRvdyBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuZXhwb3J0IHt3aW4gYXMgd2luZG93LCBkb2MgYXMgZG9jdW1lbnR9O1xuXG5jb25zdCB3aW4gPSAoKCkgPT4ge1xuXHRjb25zdCBkZWYgPSBvID0+IHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmIG8gIT09IG51bGwgJiYgby5PYmplY3QgPT09IE9iamVjdCAmJiBvO1xuXG5cdC8vIFByaW9yaXRpemUgcmVmZXJlbmNpbmcgTm9kZS5qcyBnbG9iYWwgZmlyc3QgdG8gcHJldmVudCByZWZlbmNlIGVycm9yXG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXZlci9iaWxsYm9hcmQuanMvaXNzdWVzLzE3Nzhcblx0bGV0IGZyZWVHbG9iYWwgPSBkZWYoZ2xvYmFsKTtcblxuXHR0cnkge1xuXHRcdGlmICghZnJlZUdsb2JhbCkge1xuXHRcdFx0ZnJlZUdsb2JhbCA9IGRlZihnbG9iYWxUaGlzKSB8fCBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7fVxuXG5cdHJldHVybiBmcmVlR2xvYmFsIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRjb252ZXJ0SW5wdXRUeXBlLFxuXHRkZWVwQ2xvbmUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGZpbmRJbmRleCxcblx0Z2V0QnJ1c2hTZWxlY3Rpb24sXG5cdGdldEJvdW5kaW5nUmVjdCxcblx0Z2V0Q3NzUnVsZXMsXG5cdGdldE1pbk1heCxcblx0Z2V0T3B0aW9uLFxuXHRnZXRQYXRoQm94LFxuXHRnZXRSYW5kb20sXG5cdGdldFJhbmdlLFxuXHRnZXRSZWN0U2VnTGlzdCxcblx0Z2V0VHJhbnNsYXRpb24sXG5cdGdldFVuaXF1ZSxcblx0aGFzVmFsdWUsXG5cdGlzQXJyYXksXG5cdGlzYm9vbGVhbixcblx0aXNEZWZpbmVkLFxuXHRpc0VtcHR5LFxuXHRpc0Z1bmN0aW9uLFxuXHRpc051bWJlcixcblx0aXNPYmplY3QsXG5cdGlzT2JqZWN0VHlwZSxcblx0aXNTdHJpbmcsXG5cdGlzVGFiVmlzaWJsZSxcblx0aXNVbmRlZmluZWQsXG5cdGlzVmFsdWUsXG5cdG1lcmdlQXJyYXksXG5cdG1lcmdlT2JqLFxuXHRub3RFbXB0eSxcblx0cGFyc2VEYXRlLFxuXHRzYW5pdGlzZSxcblx0c2V0VGV4dFZhbHVlLFxuXHRzb3J0VmFsdWUsXG5cdHRvQXJyYXksXG5cdHRwbFByb2Nlc3Ncbn07XG5cbmNvbnN0IGlzVmFsdWUgPSAodjogYW55KTogYm9vbGVhbiA9PiB2IHx8IHYgPT09IDA7XG5jb25zdCBpc0Z1bmN0aW9uID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzU3RyaW5nID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc051bWJlciA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcIm51bWJlclwiO1xuY29uc3QgaXNVbmRlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzRGVmaW5lZCA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNib29sZWFuID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwiYm9vbGVhblwiO1xuY29uc3QgY2VpbDEwID0gKHY6IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwodiAvIDEwKSAqIDEwO1xuY29uc3QgYXNIYWxmUGl4ZWwgPSAobjogYW55KTogbnVtYmVyID0+IE1hdGguY2VpbChuKSArIDAuNTtcbmNvbnN0IGRpZmZEb21haW4gPSAoZDogbnVtYmVyW10pOiBudW1iZXIgPT4gZFsxXSAtIGRbMF07XG5jb25zdCBpc09iamVjdFR5cGUgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIjtcbmNvbnN0IGlzRW1wdHkgPSAobzogYW55KTogYm9vbGVhbiA9PiAoXG5cdGlzVW5kZWZpbmVkKG8pIHx8IG8gPT09IG51bGwgfHxcblx0KGlzU3RyaW5nKG8pICYmIG8ubGVuZ3RoID09PSAwKSB8fFxuXHQoaXNPYmplY3RUeXBlKG8pICYmICEobyBpbnN0YW5jZW9mIERhdGUpICYmIE9iamVjdC5rZXlzKG8pLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzTnVtYmVyKG8pICYmIGlzTmFOKG8pKVxuKTtcbmNvbnN0IG5vdEVtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gIWlzRW1wdHkobyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNBcnJheSA9IChhcnI6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheShhcnIpO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iaiBEYXRhIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpOiBib29sZWFuID0+IG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIGlzT2JqZWN0VHlwZShvYmopICYmICFpc0FycmF5KG9iaik7XG5cbi8qKlxuICogR2V0IHNwZWNpZmllZCBrZXkgdmFsdWUgZnJvbSBvYmplY3RcbiAqIElmIGRlZmF1bHQgdmFsdWUgaXMgZ2l2ZW4sIHdpbGwgcmV0dXJuIGlmIGdpdmVuIGtleSB2YWx1ZSBub3QgZm91bmRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IHZhbHVlXG4gKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZSBEZWZhdWx0IHZhbHVlXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE9wdGlvbihvcHRpb25zOiBvYmplY3QsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWUpOiBhbnkge1xuXHRyZXR1cm4gaXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFsdWUgZXhpc3QgaW4gdGhlIGdpdmVuIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IGRpY3QgVGFyZ2V0IG9iamVjdCB0byBiZSBjaGVja2VkXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGJlIGNoZWNrZWRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaGFzVmFsdWUoZGljdDogb2JqZWN0LCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGxldCBmb3VuZCA9IGZhbHNlO1xuXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XG5cblx0cmV0dXJuIGZvdW5kO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gd2l0aCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICogQHBhcmFtIHsqfSBhcmdzIEFyZ3VtZW50c1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxsRm4oZm4sIC4uLmFyZ3MpOiBib29sZWFuIHtcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xuXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcblx0cmV0dXJuIGlzRm47XG59XG5cbi8qKlxuICogQ2FsbCBmdW5jdGlvbiBhZnRlciBhbGwgdHJhbnNpdGlvbnMgZW5kc1xuICogQHBhcmFtIHtkMy50cmFuc2l0aW9ufSB0cmFuc2l0aW9uIFRyYW5zaXRpb25cbiAqIEBwYXJhbSB7RnVjbnRpb259IGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmRhbGwodHJhbnNpdGlvbiwgY2I6IEZ1bmN0aW9uKTogdm9pZCB7XG5cdGxldCBuID0gMDtcblxuXHR0cmFuc2l0aW9uXG5cdFx0LmVhY2goKCkgPT4gKytuKVxuXHRcdC5vbihcImVuZFwiLCBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdFx0XHQhLS1uICYmIGNiLmFwcGx5KHRoaXMsIC4uLmFyZ3MpO1xuXHRcdH0pO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZyB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhbml0aXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHN0cikgP1xuXHRcdHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKSA6IHN0cjtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXRUZXh0VmFsdWUoXG5cdG5vZGU6IGQzU2VsZWN0aW9uLFxuXHR0ZXh0OiBzdHJpbmcsXG5cdGR5OiBudW1iZXJbXSA9IFstMSwgMV0sXG5cdHRvTWlkZGxlOiBib29sZWFuID0gZmFsc2Vcbikge1xuXHRpZiAoIW5vZGUgfHwgIWlzU3RyaW5nKHRleHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRleHQuaW5kZXhPZihcIlxcblwiKSA9PT0gLTEpIHtcblx0XHRub2RlLnRleHQodGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZGlmZiA9IFtub2RlLnRleHQoKSwgdGV4dF0ubWFwKHYgPT4gdi5yZXBsYWNlKC9bXFxzXFxuXS9nLCBcIlwiKSk7XG5cblx0XHRpZiAoZGlmZlswXSAhPT0gZGlmZlsxXSkge1xuXHRcdFx0Y29uc3QgbXVsdGlsaW5lID0gdGV4dC5zcGxpdChcIlxcblwiKTtcblx0XHRcdGNvbnN0IGxlbiA9IHRvTWlkZGxlID8gbXVsdGlsaW5lLmxlbmd0aCAtIDEgOiAxO1xuXG5cdFx0XHQvLyByZXNldCBwb3NzaWJsZSB0ZXh0XG5cdFx0XHRub2RlLmh0bWwoXCJcIik7XG5cblx0XHRcdG11bHRpbGluZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdG5vZGUuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0XHQuYXR0cihcInhcIiwgMClcblx0XHRcdFx0XHQuYXR0cihcImR5XCIsIGAke2kgPT09IDAgPyBkeVswXSAqIGxlbiA6IGR5WzFdfWVtYClcblx0XHRcdFx0XHQudGV4dCh2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFN1YnN0aXR1dGlvbiBvZiBTVkdQYXRoU2VnIEFQSSBwb2x5ZmlsbFxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRSZWN0U2VnTGlzdChwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnQpOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9W10ge1xuXHQvKlxuXHQgKiBzZWcxIC0tLS0tLS0tLS0gc2VnMlxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiBzZWcwIC0tLS0tLS0tLS0gc2VnM1xuXHQgKiAqL1xuXHRjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBwYXRoLmdldEJCb3goKTtcblxuXHRyZXR1cm4gW1xuXHRcdHt4LCB5OiB5ICsgaGVpZ2h0fSwgLy8gc2VnMFxuXHRcdHt4LCB5fSwgLy8gc2VnMVxuXHRcdHt4OiB4ICsgd2lkdGgsIHl9LCAvLyBzZWcyXG5cdFx0e3g6IHggKyB3aWR0aCwgeTogeSArIGhlaWdodH0gLy8gc2VnM1xuXHRdO1xufVxuXG4vKipcbiAqIEdldCBzdmcgYm91bmRpbmcgcGF0aCBib3ggZGltZW5zaW9uXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gcGF0aCBUYXJnZXQgc3ZnIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRQYXRoQm94KFxuXHRwYXRoOiBTVkdHcmFwaGljc0VsZW1lbnRcbik6IHt4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcblx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgaXRlbXMgPSBnZXRSZWN0U2VnTGlzdChwYXRoKTtcblx0Y29uc3QgeCA9IGl0ZW1zWzBdLng7XG5cdGNvbnN0IHkgPSBNYXRoLm1pbihpdGVtc1swXS55LCBpdGVtc1sxXS55KTtcblxuXHRyZXR1cm4ge1xuXHRcdHgsIHksIHdpZHRoLCBoZWlnaHRcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0ge30gU2VsZWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHt9LiRlbCBTZWxlY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7ZDMuYnJ1c2hTZWxlY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCcnVzaFNlbGVjdGlvbih7JGVsfSkge1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSAkZWwuc3ViY2hhcnQubWFpbiB8fCAkZWwubWFpbjtcblx0bGV0IHNlbGVjdGlvbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC50eXBlID09PSBcImJydXNoXCIpIHtcblx0XHRzZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb247XG5cdC8vIGNoZWNrIGZyb20gYnJ1c2ggYXJlYSBzZWxlY3Rpb25cblx0fSBlbHNlIGlmIChtYWluICYmIChzZWxlY3Rpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1MuYnJ1c2h9YCkubm9kZSgpKSkge1xuXHRcdHNlbGVjdGlvbiA9IGQzQnJ1c2hTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblx0fVxuXG5cdHJldHVybiBzZWxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nQ2xpZW50UmVjdC5cbiAqIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUYXJnZXQgZWxlbWVudFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdChub2RlKToge1xuXHRsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcixcblx0eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyXG59IHtcblx0Y29uc3QgbmVlZEV2YWx1YXRlID0gIShcInJlY3RcIiBpbiBub2RlKSB8fCAoXG5cdFx0XCJyZWN0XCIgaW4gbm9kZSAmJiBub2RlLmhhc0F0dHJpYnV0ZShcIndpZHRoXCIpICYmIG5vZGUucmVjdC53aWR0aCAhPT0gK25vZGUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIilcblx0KTtcblxuXHRyZXR1cm4gbmVlZEV2YWx1YXRlID9cblx0XHQobm9kZS5yZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkgOiBub2RlLnJlY3Q7XG59XG5cbi8qKlxuICogUmV0cnVuIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXNTdHIgQ29udmVydCByZXR1cm5lZCB2YWx1ZSBhcyBzdHJpbmdcbiAqIEByZXR1cm5zIHtudW1iZXJ8c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmFuZG9tKGFzU3RyOiBib29sZWFuID0gdHJ1ZSk6IG51bWJlciB8IHN0cmluZyB7XG5cdGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdHJldHVybiBhc1N0ciA/IFN0cmluZyhyYW5kKSA6IHJhbmQ7XG59XG5cbi8qKlxuICogRmluZCBpbmRleCBiYXNlZCBvbiBiaW5hcnkgc2VhcmNoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IHYgVGFyZ2V0IG51bWJlciB0byBmaW5kXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgaW5kZXggb2YgZGF0YSBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgaW5kZXggb2YgZGF0YSBhcnJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSb3RhdGVkIFdlYXRoZXIgaXMgcm90ZWQgYXhpc1xuICogQHJldHVybnMge251bWJlcn0gSW5kZXggbnVtYmVyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCB2OiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBpc1JvdGF0ZWQ6IGJvb2xlYW4pOiBudW1iZXIge1xuXHRpZiAoc3RhcnQgPiBlbmQpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRjb25zdCBtaWQgPSBNYXRoLmZsb29yKChzdGFydCArIGVuZCkgLyAyKTtcblx0bGV0IHt4LCB3ID0gMH0gPSBhcnJbbWlkXTtcblxuXHRpZiAoaXNSb3RhdGVkKSB7XG5cdFx0eCA9IGFyclttaWRdLnk7XG5cdFx0dyA9IGFyclttaWRdLmg7XG5cdH1cblxuXHRpZiAodiA+PSB4ICYmIHYgPD0geCArIHcpIHtcblx0XHRyZXR1cm4gbWlkO1xuXHR9XG5cblx0cmV0dXJuIHYgPCB4ID9cblx0XHRmaW5kSW5kZXgoYXJyLCB2LCBzdGFydCwgbWlkIC0gMSwgaXNSb3RhdGVkKSA6XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgbWlkICsgMSwgZW5kLCBpc1JvdGF0ZWQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogRGVlcCBjb3B5IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcblx0Y29uc3QgY2xvbmUgPSB2ID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHY7XG5cdH07XG5cblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXG5cdFx0LnJlZHVjZSgoYSwgYykgPT4gKFxuXHRcdFx0ey4uLmEsIC4uLmN9XG5cdFx0KSk7XG59XG5cbi8qKlxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R8QXJyYXl9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XG5cdH1cblxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn1cblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn1cblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge0RhdGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xuXHRsZXQgcGFyc2VkRGF0ZTtcblxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xuXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xuXHR9XG5cblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XG5cdH1cblxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcblxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XG5cdH1cblxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xuXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIGlzT2JqZWN0VHlwZX0gZnJvbSBcIi4uL21vZHVsZS91dGlsXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zL09wdGlvbnNcIjtcblxuLyoqXG4gKiBMb2FkIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFVzZXIncyBnZW5lcmF0aW9uIGNvbmZpZyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnOiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IHRoaXNDb25maWc6IE9wdGlvbnMgPSB0aGlzLmNvbmZpZztcblx0bGV0IHRhcmdldDtcblx0bGV0IGtleXM7XG5cdGxldCByZWFkO1xuXG5cdGNvbnN0IGZpbmQgPSAoKSA9PiB7XG5cdFx0Y29uc3Qga2V5ID0ga2V5cy5zaGlmdCgpO1xuXG5cdFx0aWYgKGtleSAmJiB0YXJnZXQgJiYgaXNPYmplY3RUeXBlKHRhcmdldCkgJiYga2V5IGluIHRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0W2tleV07XG5cdFx0XHRyZXR1cm4gZmluZCgpO1xuXHRcdH0gZWxzZSBpZiAoIWtleSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdE9iamVjdC5rZXlzKHRoaXNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcblx0XHR0YXJnZXQgPSBjb25maWc7XG5cdFx0a2V5cyA9IGtleS5zcGxpdChcIl9cIik7XG5cdFx0cmVhZCA9IGZpbmQoKTtcblxuXHRcdGlmIChpc0RlZmluZWQocmVhZCkpIHtcblx0XHRcdHRoaXNDb25maWdba2V5XSA9IHJlYWQ7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbi8qKlxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG4gKiBAbmFtZSB2ZXJzaW9uXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUGx1Z2luXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcblx0cHVibGljICQkO1xuXHRwdWJsaWMgb3B0aW9ucztcblx0c3RhdGljIHZlcnNpb24gPSBcIjIuMS40XCI7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7QW55fSBvcHRpb25zIGNvbmZpZyBvcHRpb24gb2JqZWN0XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYmVmb3JlSW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYmVmb3JlSW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnaW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkaW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnYWZ0ZXJJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRhZnRlckluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3JlZHJhdycgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkcmVkcmF3KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICd3aWxsRGVzdHJveScgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkd2lsbERlc3Ryb3koKSB7XG5cdFx0T2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0dGhpc1trZXldID0gbnVsbDtcblx0XHRcdGRlbGV0ZSB0aGlzW2tleV07XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gb3B0aW9uIGNsYXNzXG4gKiBAY2xhc3MgU3RhbmZvcmRPcHRpb25zXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZE9wdGlvbnN9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHRoZSBjb2xvciBvZiB0aGUgY29sb3Igc2NhbGUuIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGFuZCBzaG91bGQgcmV0dXJuIGEgY29sb3IuXG5cdFx0XHQgKiBAbmFtZSBjb2xvcnNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtGdW5jdGlvbn1cblx0XHRcdCAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgY29sb3JzOiBkMy5pbnRlcnBvbGF0ZUhzbExvbmcoXG5cdFx0XHQgKiAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG5cdFx0XHQgKiAgIClcblx0XHRcdCAqL1xuXHRcdFx0Y29sb3JzOiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU3BlY2lmeSB0aGUga2V5IG9mIGVwb2NocyB2YWx1ZXMgaW4gdGhlIGRhdGEuXG5cdFx0XHQgKiBAbmFtZSBlcG9jaHNcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF1cblx0XHRcdCAqL1xuXHRcdFx0ZXBvY2hzOiA8bnVtYmVyW10+IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCBsaW5lcyBhbnl3aGVyZSBvbiB0aGUgY2hhcnQuXG5cdFx0XHQgKiAtIEVhY2ggbGluZSBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiB8IEtleSB8IFR5cGUgfCBEZXNjcmlwdGlvbiB8XG5cdFx0XHQgKiB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiB8IHgxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyB8XG5cdFx0XHQgKiB8IHkxIHwgTnVtYmVyIHwgU3RhcnRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IHgyIHwgTnVtYmVyIHwgRW5kaW5nIHBvc2l0aW9uIG9uIHRoZSB4IGF4aXMgIHxcblx0XHRcdCAqIHwgeTIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHkgYXhpcyB8XG5cdFx0XHQgKiB8IGNsYXNzIHwgU3RyaW5nIHwgT3B0aW9uYWwgdmFsdWUuIFNldCBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyBsaW5lLiB8XG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgbGluZXM6IFtcblx0XHRcdCAqICAgICAgIHsgeDE6IDAsIHkxOiAwLCB4MjogNjUsIHkyOiA2NSwgY2xhc3M6IFwibGluZTFcIiB9LFxuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeDI6IDY1LCB5MTogNDAsIHkyOiA0MCwgY2xhc3M6IFwibGluZTJcIiB9XG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0bGluZXM6IFtdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBzY2FsZSB2YWx1ZXNcblx0XHRcdCAqIEBuYW1lIHNjYWxlXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByb3BlcnR5IHtvYmplY3R9IFtzY2FsZV0gc2NhbGUgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1pbj11bmRlZmluZWRdIE1pbmltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBsb3dlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLm1heD11bmRlZmluZWRdIE1heGltdW0gdmFsdWUgb2YgdGhlIGNvbG9yIHNjYWxlLiBEZWZhdWx0OiBoaWdoZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtzY2FsZS53aWR0aD0yMF0gV2lkdGggb2YgdGhlIGNvbG9yIHNjYWxlXG5cdFx0XHQgKiBAcHJvcGVydHkge3N0cmluZ3xGdW5jdGlvbn0gW3NjYWxlLmZvcm1hdD11bmRlZmluZWRdIEZvcm1hdCBvZiB0aGUgYXhpcyBvZiB0aGUgY29sb3Igc2NhbGUuIFVzZSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTAgb3IgYSBjdXN0b20gZnVuY3Rpb24uIEV4YW1wbGU6IGQzLmZvcm1hdChcImRcIilcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgc2NhbGU6IHtcblx0XHRcdCAqICAgIG1heDogMTAwMDAsXG5cdFx0XHQgKiAgICBtaW46IDEsXG5cdFx0XHQgKiAgICB3aWR0aDogNTAwLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIHNwZWNpZnkgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwXG5cdFx0XHQgKiAgICBmb3JtYXQ6IFwicG93MTBcIixcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBvciBzcGVjaWZ5IGEgZm9ybWF0IGZ1bmN0aW9uXG5cdFx0XHQgKiAgICBmb3JtYXQ6IGZ1bmN0aW9uKHgpIHtcblx0XHRcdCAqICAgIFx0cmV0dXJuIHggK1wiJVwiO1xuXHRcdFx0ICogICAgfVxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHNjYWxlX21pbjogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX21heDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX3dpZHRoOiA8bnVtYmVyfHVuZGVmaW5lZD4gMjAsXG5cdFx0XHRzY2FsZV9mb3JtYXQ6IDxudW1iZXJ8dW5kZWZpbmVkPiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIHBhZGRpbmcgZm9yIGNvbG9yIHNjYWxlIGVsZW1lbnRcblx0XHRcdCAqIEBuYW1lIHBhZGRpbmdcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gW3BhZGRpbmddIHBhZGRpbmcgb2JqZWN0XG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLnJpZ2h0PTBdIFJpZ2h0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcuYm90dG9tPTBdIEJvdHRvbSBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtudW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBwYWRkaW5nOiB7XG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcblx0XHRcdCAqICAgICByaWdodDogMCxcblx0XHRcdCAqICAgICBib3R0b206IDAsXG5cdFx0XHQgKiAgICAgbGVmdDogMFxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxuXHRcdFx0cGFkZGluZ19yaWdodDogMCxcblx0XHRcdHBhZGRpbmdfYm90dG9tOiAwLFxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCByZWdpb24gb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqICAgfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogICB8IHBvaW50cyB8IEFycmF5IHwgIHwgfCBBY2NlcHRzIGEgZ3JvdXAgb2Ygb2JqZWN0cyB0aGF0IGhhcyB4IGFuZCB5Ljxicj5UaGVzZSBwb2ludHMgc2hvdWxkIGJlIGFkZGVkIGluIGEgY291bnRlci1jbG9ja3dpc2UgZmFzaGlvbiB0byBtYWtlIGEgY2xvc2VkIHBvbHlnb24uIHxcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XG5cdFx0XHQgKiAgIHwgdGV4dCB8IEZ1bmN0aW9uIHwgIHwgJmx0O29wdGlvbmFsPiB8IFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBhbmQgcGVyY2VudGFnZSBvZiB0aGUgbnVtYmVyIG9mIGVwb2NocyBpbiB0aGlzIHJlZ2lvbi48YnI+UmV0dXJuIGEgc3RyaW5nIHRvIHBsYWNlIHRleHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcmVnaW9uLiB8XG5cdFx0XHQgKiAgIHwgY2xhc3MgfCBTdHJpbmcgfCB8ICZsdDtvcHRpb25hbD4gfCBTZSBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyByZWdpb24sIHVzZSB0aGUgZmlsbCBwcm9wZXJ0eSBpbiBjc3MgdG8gc2V0IGEgYmFja2dyb3VuZCBjb2xvci4gfFxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIHJlZ2lvbnM6IFtcblx0XHRcdCAqICAgICAgIHtcblx0XHRcdCAqICAgICAgICAgICBwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgIF0sXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG5cdFx0XHQgKiAgICAgICAgICAgICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuXHRcdFx0ICogICAgICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcblx0XHRcdCAqICAgICAgICAgICBjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcblx0XHRcdCAqICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAuLi5cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRyZWdpb25zOiBbXVxuXHRcdH07XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQ1NTIGNsYXNzIG5hbWVzIGRlZmluaXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdHN0YW5mb3JkRWxlbWVudHM6IFwiYmItc3RhbmZvcmQtZWxlbWVudHNcIixcblx0c3RhbmZvcmRMaW5lOiBcImJiLXN0YW5mb3JkLWxpbmVcIixcblx0c3RhbmZvcmRMaW5lczogXCJiYi1zdGFuZm9yZC1saW5lc1wiLFxuXHRzdGFuZm9yZFJlZ2lvbjogXCJiYi1zdGFuZm9yZC1yZWdpb25cIixcblx0c3RhbmZvcmRSZWdpb25zOiBcImJiLXN0YW5mb3JkLXJlZ2lvbnNcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cblxuaW1wb3J0IHtnZXRSYW5nZSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4uLy4uL21vZHVsZS91dGlsXCI7XG5cbi8qKlxuICogQ2hlY2sgaWYgcG9pbnQgaXMgaW4gcmVnaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gcG9pbnQgUG9pbnRcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZ2lvbiBSZWdpb25cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcG9pbnRJblJlZ2lvbihwb2ludCwgcmVnaW9uKTogYm9vbGVhbiB7IC8vIHRoYW5rcyB0bzogaHR0cDovL2JsLm9ja3Mub3JnL2J5Y29mZmUvNTU3NTkwNFxuXHQvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cblx0Ly8gaHR0cDovL3d3dy5lY3NlLnJwaS5lZHUvSG9tZXBhZ2VzL3dyZi9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuXHRjb25zdCB4ID0gcG9pbnQueDtcblx0Y29uc3QgeSA9IHBvaW50LnZhbHVlO1xuXHRsZXQgaW5zaWRlID0gZmFsc2U7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGogPSByZWdpb24ubGVuZ3RoIC0gMTsgaSA8IHJlZ2lvbi5sZW5ndGg7IGogPSBpKyspIHtcblx0XHRjb25zdCB4aSA9IHJlZ2lvbltpXS54O1xuXHRcdGNvbnN0IHlpID0gcmVnaW9uW2ldLnk7XG5cblx0XHRjb25zdCB4aiA9IHJlZ2lvbltqXS54O1xuXHRcdGNvbnN0IHlqID0gcmVnaW9uW2pdLnk7XG5cblx0XHRjb25zdCBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJiAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG5cdFx0aWYgKGludGVyc2VjdCkge1xuXHRcdFx0aW5zaWRlID0gIWluc2lkZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaW5zaWRlO1xufVxuXG4vKipcbiAqIENvbXBhcmUgZXBvY2hzXG4gKiBAcGFyYW0ge29iamVjdH0gYSBUYXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBiIFNvdXJjZVxuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYik6IG51bWJlciB7XG5cdGlmIChhLmVwb2NocyA8IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0aWYgKGEuZXBvY2hzID4gYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufVxuXG4vKipcbiAqIEdldCByZWdpb24gYXJlYVxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJlZ2lvbkFyZWEocG9pbnRzKTogbnVtYmVyIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxuXHRsZXQgYXJlYSA9IDA7XG5cdGxldCBwb2ludDE7XG5cdGxldCBwb2ludDI7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdHBvaW50MiA9IHBvaW50c1tqXTtcblx0XHRhcmVhICs9IHBvaW50MS54ICogcG9pbnQyLnk7XG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xuXHR9XG5cblx0YXJlYSAvPSAyO1xuXG5cdHJldHVybiBhcmVhO1xufVxuXG4vKipcbiAqIEdldCBjZW50cm9pZFxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIFBvaW50c1xuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRyb2lkKHBvaW50cykge1xuXHRjb25zdCBhcmVhID0gZ2V0UmVnaW9uQXJlYShwb2ludHMpO1xuXG5cdGxldCB4ID0gMDtcblx0bGV0IHkgPSAwO1xuXHRsZXQgZjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRjb25zdCBwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0Y29uc3QgcG9pbnQyID0gcG9pbnRzW2pdO1xuXG5cdFx0ZiA9IHBvaW50MS54ICogcG9pbnQyLnkgLSBwb2ludDIueCAqIHBvaW50MS55O1xuXHRcdHggKz0gKHBvaW50MS54ICsgcG9pbnQyLngpICogZjtcblx0XHR5ICs9IChwb2ludDEueSArIHBvaW50Mi55KSAqIGY7XG5cdH1cblxuXHRmID0gYXJlYSAqIDY7XG5cblx0cmV0dXJuIHtcblx0XHR4OiB4IC8gZixcblx0XHR5OiB5IC8gZlxuXHR9O1xufVxuXG5leHBvcnQge1xuXHRjb21wYXJlRXBvY2hzLFxuXHRnZXRDZW50cm9pZCxcblx0Z2V0UmFuZ2UsXG5cdGdldFJlZ2lvbkFyZWEsXG5cdGlzRW1wdHksXG5cdGlzRnVuY3Rpb24sXG5cdGlzU3RyaW5nLFxuXHRwYXJzZURhdGUsXG5cdHBvaW50SW5SZWdpb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7Z2V0Q2VudHJvaWQsIGlzU3RyaW5nLCBwYXJzZURhdGV9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBlbGVtZW50IGNsYXNzXG4gKiBAY2xhc3MgQ29sb3JTY2FsZVxuICogQHBhcmFtIHtTdGFuZm9yZH0gb3duZXIgU3RhbmZvcmQgaW5zdGFuY2VcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRzIHtcblx0cHJpdmF0ZSBvd25lcjtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblxuXHRcdC8vIE1FTU86IEF2b2lkIGJsb2NraW5nIGV2ZW50UmVjdFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gb3duZXIuJCQuJGVsLm1haW4uc2VsZWN0KFwiLmJiLWNoYXJ0XCIpXG5cdFx0XHQuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZEVsZW1lbnRzKTtcblxuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkTGluZXMpO1xuXHRcdGVsZW1lbnRzLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkUmVnaW9ucyk7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB7Y29uZmlnLCAkZWw6IHttYWlufX0gPSAkJDtcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1MaW5lc1xuXHRcdGNvbnN0IHN0YW5mb3JkTGluZSA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZExpbmVzfWApXG5cdFx0XHQuc3R5bGUoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJnZW9tZXRyaWNwcmVjaXNpb25cIilcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkTGluZX1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcubGluZXMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkTGluZS5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZExpbmVFbnRlciA9IHN0YW5mb3JkTGluZS5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlci5hcHBlbmQoXCJsaW5lXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyXG5cdFx0XHQubWVyZ2Uoc3RhbmZvcmRMaW5lKVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkTGluZSArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcImxpbmVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieDFcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MVwiKSA6IHh2Q3VzdG9tKGQsIFwieDFcIikpKVxuXHRcdFx0LmF0dHIoXCJ4MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkyXCIpIDogeHZDdXN0b20oZCwgXCJ4MlwiKSkpXG5cdFx0XHQuYXR0cihcInkxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDFcIikgOiB5dkN1c3RvbShkLCBcInkxXCIpKSlcblx0XHRcdC5hdHRyKFwieTJcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MlwiKSA6IHl2Q3VzdG9tKGQsIFwieTJcIikpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHtjb25maWcsICRlbDoge21haW59fSA9ICQkO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCBjb3VudFBvaW50c0luUmVnaW9uID0gdGhpcy5vd25lci5jb3VudEVwb2Noc0luUmVnaW9uLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtUmVnaW9uc1xuXHRcdGxldCBzdGFuZm9yZFJlZ2lvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbnN9YClcblx0XHRcdC5zZWxlY3RBbGwoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9ufWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5yZWdpb25zKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZFJlZ2lvbi5leGl0KCkudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuXHRcdFx0LnJlbW92ZSgpO1xuXG5cdFx0Ly8gZW50ZXJcblx0XHRjb25zdCBzdGFuZm9yZFJlZ2lvbkVudGVyID0gc3RhbmZvcmRSZWdpb24uZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJwb2x5Z29uXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgaXNSb3RhdGVkID8gXCJyb3RhdGUoLTkwKVwiIDogXCJcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24gPSBzdGFuZm9yZFJlZ2lvbkVudGVyLm1lcmdlKHN0YW5mb3JkUmVnaW9uKTtcblxuXHRcdC8vIHVwZGF0ZVxuXHRcdHN0YW5mb3JkUmVnaW9uXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRSZWdpb24gKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJwb2x5Z29uXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInBvaW50c1wiLCBkID0+IGQucG9pbnRzLm1hcCh2YWx1ZSA9PiBbXG5cdFx0XHRcdGlzUm90YXRlZCA/IHl2Q3VzdG9tKHZhbHVlLCBcInlcIikgOiB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpLFxuXHRcdFx0XHRpc1JvdGF0ZWQgPyB4dkN1c3RvbSh2YWx1ZSwgXCJ4XCIpIDogeXZDdXN0b20odmFsdWUsIFwieVwiKVxuXHRcdFx0XS5qb2luKFwiLFwiKSkuam9pbihcIiBcIikpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIGQgPT4gU3RyaW5nKGQub3BhY2l0eSA/IGQub3BhY2l0eSA6IDAuMikpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb24uc2VsZWN0KFwidGV4dFwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4XCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpIDogeHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikpKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpIDogeXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikpKVxuXHRcdFx0LnRleHQoZCA9PiB7XG5cdFx0XHRcdGlmIChkLnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCB7dmFsdWUsIHBlcmNlbnRhZ2V9ID0gY291bnRQb2ludHNJblJlZ2lvbihkLnBvaW50cyk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZC50ZXh0KHZhbHVlLCBwZXJjZW50YWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0fSlcblx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcblx0XHRcdC5hdHRyKFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJtaWRkbGVcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbiA9IDApOiB2b2lkIHtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb24pO1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC5zY2FsZS55MiA6ICQkLnNjYWxlLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7YXhpc1JpZ2h0IGFzIGQzQXhpc1JpZ2h0fSBmcm9tIFwiZDMtYXhpc1wiO1xuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsIGFzIGQzU2NhbGVTZXF1ZW50aWFsLCBzY2FsZUxvZyBhcyBkM1NjYWxlTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gY29sb3Igc2NhbGUgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTY2FsZSB7XG5cdHByaXZhdGUgb3duZXI7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcikge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0fVxuXG5cdGRyYXdDb2xvclNjYWxlKCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJCwgY29uZmlnfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXHRcdGNvbnN0IGhlaWdodCA9ICQkLnN0YXRlLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nX2JvdHRvbSAtIGNvbmZpZy5wYWRkaW5nX3RvcDtcblx0XHRjb25zdCBiYXJXaWR0aCA9IGNvbmZpZy5zY2FsZV93aWR0aDtcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xuXHRcdGNvbnN0IHBvaW50cyA9IGdldFJhbmdlKGNvbmZpZy5wYWRkaW5nX2JvdHRvbSwgaGVpZ2h0LCBiYXJIZWlnaHQpO1xuXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIHBvaW50c1swXV0pO1xuXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9ICQkLiRlbC5zdmcuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCA1MClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1MuY29sb3JTY2FsZSk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXBwZW5kKFwiZ1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke2NvbmZpZy5wYWRkaW5nX3RvcH0pYClcblx0XHRcdC5zZWxlY3RBbGwoXCJiYXJzXCIpXG5cdFx0XHQuZGF0YShwb2ludHMpXG5cdFx0XHQuZW50ZXIoKVxuXHRcdFx0LmFwcGVuZChcInJlY3RcIilcblx0XHRcdC5hdHRyKFwieVwiLCAoZCwgaSkgPT4gaSAqIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0LmF0dHIoXCJ3aWR0aFwiLCBiYXJXaWR0aClcblx0XHRcdC5hdHRyKFwiaGVpZ2h0XCIsIGJhckhlaWdodClcblx0XHRcdC5hdHRyKFwiZmlsbFwiLCBkID0+IGludmVyc2VTY2FsZShkKSk7XG5cblx0XHQvLyBMZWdlbmQgQXhpc1xuXHRcdGNvbnN0IGF4aXNTY2FsZSA9IGQzU2NhbGVMb2coKVxuXHRcdFx0LmRvbWFpbihbdGFyZ2V0Lm1pbkVwb2NocywgdGFyZ2V0Lm1heEVwb2Noc10pXG5cdFx0XHQucmFuZ2UoW1xuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3AgKyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdICsgYmFySGVpZ2h0IC0gMSxcblx0XHRcdFx0cG9pbnRzWzBdICsgY29uZmlnLnBhZGRpbmdfdG9wXG5cdFx0XHRdKTtcblxuXHRcdGNvbnN0IGxlZ2VuZEF4aXMgPSBkM0F4aXNSaWdodChheGlzU2NhbGUpO1xuXHRcdGNvbnN0IHNjYWxlRm9ybWF0ID0gY29uZmlnLnNjYWxlX2Zvcm1hdDtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tWYWx1ZXMoWzEsIDEwLCAxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDAsIDEwMDAwMDAwXSk7XG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKHNjYWxlRm9ybWF0KSkge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KHNjYWxlRm9ybWF0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVnZW5kQXhpcy50aWNrRm9ybWF0KGQzRm9ybWF0KFwiZFwiKSk7XG5cdFx0fVxuXG5cdFx0Ly8gRHJhdyBBeGlzXG5cdFx0Y29uc3QgYXhpcyA9IHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIFwibGVnZW5kIGF4aXNcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHtiYXJXaWR0aH0sMClgKVxuXHRcdFx0LmNhbGwobGVnZW5kQXhpcyk7XG5cblx0XHRpZiAoc2NhbGVGb3JtYXQgPT09IFwicG93MTBcIikge1xuXHRcdFx0YXhpcy5zZWxlY3RBbGwoXCIudGljayB0ZXh0XCIpXG5cdFx0XHRcdC50ZXh0KG51bGwpXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiBkIC8gTWF0aC5wb3coMTAsIE1hdGguY2VpbChNYXRoLmxvZyhkKSAvIE1hdGguTE4xMCAtIDFlLTEyKSkgPT09IDEpIC8vIFBvd2VyIG9mIFRlblxuXHRcdFx0XHQudGV4dCgxMClcblx0XHRcdFx0LmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdC5hdHRyKFwiZHlcIiwgXCItLjdlbVwiKSAvLyBodHRwczovL2JsLm9ja3Mub3JnL21ib3N0b2NrLzY3MzgyMjlcblx0XHRcdFx0LnRleHQoZCA9PiBNYXRoLnJvdW5kKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgkeyQkLnN0YXRlLmN1cnJlbnQud2lkdGggLSB0aGlzLnhGb3JDb2xvclNjYWxlKCl9LCAwKWApO1xuXHR9XG5cblx0eEZvckNvbG9yU2NhbGUoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5vd25lci5jb25maWcucGFkZGluZ19yaWdodCArXG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUubm9kZSgpLmdldEJCb3goKS53aWR0aDtcblx0fVxuXG5cdGdldENvbG9yU2NhbGVQYWRkaW5nKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMueEZvckNvbG9yU2NhbGUoKSArIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfbGVmdCArIDIwO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vLyBAdHMtbm9jaGVja1xuaW1wb3J0IHtpbnRlcnBvbGF0ZUhzbExvbmcgYXMgZDNJbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtoc2wgYXMgZDNIc2x9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWxMb2cgYXMgZDNTY2FsZVNlcXVlbnRpYWxMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuLi8uLi9jb25maWcvY2xhc3Nlc1wiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSBcIi4vRWxlbWVudHNcIjtcbmltcG9ydCBDb2xvclNjYWxlIGZyb20gXCIuL0NvbG9yU2NhbGVcIjtcbmltcG9ydCB7Y29tcGFyZUVwb2NocywgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIHBhcnNlRGF0ZSwgcG9pbnRJblJlZ2lvbn0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAgIC0gSXMgcHJlZmVyYWJsZSB1c2UgYHNjYXR0ZXJgIGFzIGRhdGEudHlwZVxuICogLSAqKlJlcXVpcmVkIG1vZHVsZXM6KipcbiAqICAgLSBbZDMtc2VsZWN0aW9uXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2VsZWN0aW9uKVxuICogICAtIFtkMy1pbnRlcnBvbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWludGVycG9sYXRlKVxuICogICAtIFtkMy1jb2xvcl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWNvbG9yKVxuICogICAtIFtkMy1zY2FsZV0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNjYWxlKVxuICogICAtIFtkMy1icnVzaF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWJydXNoKVxuICogICAtIFtkMy1heGlzXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYXhpcylcbiAqICAgLSBbZDMtZm9ybWF0XShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtZm9ybWF0KVxuICogQGNsYXNzIHBsdWdpbi1zdGFuZm9yZFxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHJlcXVpcmVzIGQzLWludGVycG9sYXRlXG4gKiBAcmVxdWlyZXMgZDMtY29sb3JcbiAqIEByZXF1aXJlcyBkMy1zY2FsZVxuICogQHJlcXVpcmVzIGQzLWJydXNoXG4gKiBAcmVxdWlyZXMgZDMtYXhpc1xuICogQHJlcXVpcmVzIGQzLWZvcm1hdFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgU3RhbmZvcmQgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtTdGFuZm9yZH1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5qc1wiPjwvc2NyaXB0PlxuICpcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJzY2F0dGVyXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuICogICAgICAgICAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG4gKiAgICAgICAgICAgKSxcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXG4gKiAgICAgICAgICAgbGluZXM6IFtcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuICogICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgc2NhbGU6IHtcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXG4gKiAgICAgICAgICAgICBcdG1pbjogMSxcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHBhZGRpbmc6IHtcbiAqICAgICAgICAgICBcdHRvcDogMTUsXG4gKiAgICAgICAgICAgXHRyaWdodDogMCxcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICBcdHtcbiAqICAgICAgICAgICAgICAgXHRwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiA0MCB9XG4gKiAgICAgICAgICAgICAgIFx0XSxcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcbiAqICAgICAgICAgICAgICAgXHQgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG4gKiAgICAgICAgICAgICAgIFx0fSxcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuICogICAgICAgICAgICAgICBcdGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuICogICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICBcdC4uLlxuICogICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgU3RhbmZvcmQgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZC5lc21cIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBTdGFuZm9yZCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5mb3JkIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cdHByaXZhdGUgY29sb3JTY2FsZTtcblx0cHJpdmF0ZSBlbGVtZW50cztcblxuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkYmVmb3JlSW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdC8vIG92ZXJyaWRlIG9uIGNvbmZpZyB2YWx1ZXMgJiBtZXRob2RzXG5cdFx0JCQuY29uZmlnLmRhdGFfeFNvcnQgPSBmYWxzZTtcblx0XHQkJC5pc011bHRpcGxlWCA9ICgpID0+IHRydWU7XG5cdFx0JCQuc2hvd0dyaWRGb2N1cyA9ICgpID0+IHt9O1xuXHRcdCQkLmxhYmVsaXNoRGF0YSA9IGQgPT4gZC52YWx1ZXM7XG5cdFx0JCQub3BhY2l0eUZvckNpcmNsZSA9ICgpID0+IDE7XG5cblx0XHRjb25zdCBnZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gJCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodC5iaW5kKCQkKTtcblxuXHRcdCQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAoKSA9PiAoXG5cdFx0XHRnZXRDdXJyZW50UGFkZGluZ1JpZ2h0KCkgKyAoXG5cdFx0XHRcdHRoaXMuY29sb3JTY2FsZSA/IHRoaXMuY29sb3JTY2FsZS5nZXRDb2xvclNjYWxlUGFkZGluZygpIDogMFxuXHRcdFx0KVxuXHRcdCk7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdGxvYWRDb25maWcuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMpO1xuXHRcdCQkLmNvbG9yID0gdGhpcy5nZXRTdGFuZm9yZFBvaW50Q29sb3IuYmluZCgkJCk7XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUgPSBuZXcgQ29sb3JTY2FsZSh0aGlzKTtcblx0XHR0aGlzLmVsZW1lbnRzID0gbmV3IEVsZW1lbnRzKHRoaXMpO1xuXG5cdFx0dGhpcy5jb252ZXJ0RGF0YSgpO1xuXHRcdHRoaXMuaW5pdFN0YW5mb3JkRGF0YSgpO1xuXHRcdHRoaXMuc2V0U3RhbmZvcmRUb29sdGlwKCk7XG5cdFx0dGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cblx0XHR0aGlzLiRyZWRyYXcoKTtcblx0fVxuXG5cdCRyZWRyYXcoZHVyYXRpb24/OiBudW1iZXIpOiB2b2lkIHtcblx0XHR0aGlzLmNvbG9yU2NhbGUgJiYgdGhpcy5jb2xvclNjYWxlLmRyYXdDb2xvclNjYWxlKCk7XG5cdFx0dGhpcy5lbGVtZW50cyAmJiB0aGlzLmVsZW1lbnRzLnVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24pO1xuXHR9XG5cblxuXHRnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xuXHRcdHJldHVybiBuZXcgT3B0aW9ucygpO1xuXHR9XG5cblx0Y29udmVydERhdGEoKTogdm9pZCB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzO1xuXHRcdGNvbnN0IGVwb2NocyA9IHRoaXMub3B0aW9ucy5lcG9jaHM7XG5cblx0XHRkYXRhLmZvckVhY2goZCA9PiB7XG5cdFx0XHRkLnZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdHYuZXBvY2hzID0gZXBvY2hzW2ldO1xuXHRcdFx0fSk7XG5cblx0XHRcdGQubWluRXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5tYXhFcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9ycyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzY2FsZSA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7YXhpcywgY29uZmlnfSA9ICQkO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKGF4aXMuaXNUaW1lU2VyaWVzKCkpIHtcblx0XHRcdHZhbHVlID0gcGFyc2VEYXRlLmNhbGwoJCQsIHZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKGF4aXMuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSBjb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLnNjYWxlLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpOiBudW1iZXIge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB7c2NhbGV9ID0gJCQ7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gc2NhbGUueTIgOiBzY2FsZS55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG5cblx0aW5pdFN0YW5mb3JkRGF0YSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29uZmlnfSA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy4kJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHQvLyBUT0RPIFNUQU5GT1JEIHNlZSBpZiAoZGF0YS5qcyAtPiBvcmRlclRhcmdldHMpKyBjYW4gYmUgdXNlZCBpbnN0ZWFkXG5cdFx0Ly8gTWFrZSBsYXJnZXIgdmFsdWVzIGFwcGVhciBvbiB0b3Bcblx0XHR0YXJnZXQudmFsdWVzLnNvcnQoY29tcGFyZUVwb2Nocyk7XG5cblx0XHQvLyBHZXQgYXJyYXkgb2YgZXBvY2hzXG5cdFx0Y29uc3QgZXBvY2hzID0gdGFyZ2V0LnZhbHVlcy5tYXAoYSA9PiBhLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQubWluRXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9taW4pID8gY29uZmlnLnNjYWxlX21pbiA6IE1hdGgubWluKC4uLmVwb2Nocyk7XG5cdFx0dGFyZ2V0Lm1heEVwb2NocyA9ICFpc05hTihjb25maWcuc2NhbGVfbWF4KSA/IGNvbmZpZy5zY2FsZV9tYXggOiBNYXRoLm1heCguLi5lcG9jaHMpO1xuXG5cdFx0dGFyZ2V0LmNvbG9ycyA9IGlzRnVuY3Rpb24oY29uZmlnLmNvbG9ycykgP1xuXHRcdFx0Y29uZmlnLmNvbG9ycyA6IGQzSW50ZXJwb2xhdGVIc2xMb25nKGQzSHNsKDI1MCwgMSwgMC41KSwgZDNIc2woMCwgMSwgMC41KSk7XG5cblx0XHR0YXJnZXQuY29sb3JzY2FsZSA9IGQzU2NhbGVTZXF1ZW50aWFsTG9nKHRhcmdldC5jb2xvcnMpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSk7XG5cdH1cblxuXHRnZXRTdGFuZm9yZFBvaW50Q29sb3IoZCkge1xuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0cmV0dXJuIHRhcmdldC5jb2xvcnNjYWxlKGQuZXBvY2hzKTtcblx0fVxuXG5cdHNldFN0YW5mb3JkVG9vbHRpcCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcy4kJDtcblxuXHRcdGlmIChpc0VtcHR5KGNvbmZpZy50b29sdGlwX2NvbnRlbnRzKSkge1xuXHRcdFx0Y29uZmlnLnRvb2x0aXBfY29udGVudHMgPSBmdW5jdGlvbihkLCBkZWZhdWx0VGl0bGVGb3JtYXQsIGRlZmF1bHRWYWx1ZUZvcm1hdCwgY29sb3IpIHtcblx0XHRcdFx0bGV0IGh0bWwgPSBgPHRhYmxlIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwfVwiPjx0Ym9keT5gO1xuXG5cdFx0XHRcdGQuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0XHRodG1sICs9IGA8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdChjb25maWcuZGF0YV94KX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYueCl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdDx0aD4ke2RlZmF1bHRUaXRsZUZvcm1hdCh2LmlkKX08L3RoPlxuXHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYudmFsdWUpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyIGNsYXNzPVwiJHtDTEFTUy50b29sdGlwTmFtZX0tJHt2LmlkfVwiPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJuYW1lXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7Y29sb3Iodil9XCI+PC9zcGFuPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KFwiRXBvY2hzXCIpfTwvdGQ+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi5lcG9jaHMpfTwvdGQ+XG5cdFx0XHRcdFx0XHQ8L3RyPmA7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBgJHtodG1sfTwvdGJvZHk+PC90YWJsZT5gO1xuXHRcdFx0fTtcblx0XHR9XG5cdH1cblxuXHRjb3VudEVwb2Noc0luUmVnaW9uKHJlZ2lvbik6IHt2YWx1ZTogbnVtYmVyLCBwZXJjZW50YWdlOiBudW1iZXJ9IHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Y29uc3QgdG90YWwgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT5cblx0XHRcdGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpLCAwKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcblx0XHRcdGlmIChwb2ludEluUmVnaW9uKGN1cnJlbnRWYWx1ZSwgcmVnaW9uKSkge1xuXHRcdFx0XHRyZXR1cm4gYWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2Nocyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdHBlcmNlbnRhZ2U6IHZhbHVlICE9PSAwID8gKyh2YWx1ZSAvIHRvdGFsICogMTAwKS50b0ZpeGVkKDEpIDogMFxuXHRcdH07XG5cdH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fM19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fN19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fOF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5yZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=