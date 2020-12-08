/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 2.1.4-nightly-20201208172529
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-voronoi"), require("d3-polygon"), require("d3-selection"), require("d3-brush"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-voronoi", "d3-polygon", "d3-selection", "d3-brush"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-voronoi"), require("d3-polygon"), require("d3-selection"), require("d3-brush"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["textoverlap"] = factory(root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__6__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ TextOverlap
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
// EXTERNAL MODULE: external {"commonjs":"d3-voronoi","commonjs2":"d3-voronoi","amd":"d3-voronoi","root":"d3"}
var external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_ = __webpack_require__(10);
// EXTERNAL MODULE: external {"commonjs":"d3-polygon","commonjs2":"d3-polygon","amd":"d3-polygon","root":"d3"}
var external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_ = __webpack_require__(11);
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
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
    return typeof o !== "undefined" && o;
  }; // Prioritize referencing Node.js global first to prevent refence error
  // https://github.com/naver/billboard.js/issues/1778


  return def(global) || def(globalThis) || def(self) || def(window) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
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

;// CONCATENATED MODULE: ./src/Plugin/textoverlap/Options.ts
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


;// CONCATENATED MODULE: ./src/Plugin/textoverlap/index.ts



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
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-textoverlap.js"></script>
 *
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
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */

var TextOverlap = /*#__PURE__*/function (_Plugin) {
  function TextOverlap(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.config = void 0, _this.config = new Options(), _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(TextOverlap, _Plugin);

  var _proto = TextOverlap.prototype;
  return _proto.$init = function $init() {
    loadConfig.call(this, this.options);
  }, _proto.$redraw = function $redraw() {
    var text = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.selectAll)(this.config.selector);
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

    return min[1] = _ref[0], max[0] = _ref[1], (0,external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_.voronoi)().extent([min, max]).polygons(data);
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
            _d3PolygonCentroid = (0,external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_.polygonCentroid)(cell),
            cx = _d3PolygonCentroid[0],
            cy = _d3PolygonCentroid[1],
            angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2),
            xTranslate = extent * (angle === 0 ? 1 : -1),
            yTranslate = angle === -1 ? -extent : extent + 5,
            txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";

        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this) // @ts-ignore
        .attr("display", (0,external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_.polygonArea)(cell) < area ? "none" : null).attr("text-anchor", txtAnchor).attr("dy", "0." + (angle === 1 ? 71 : 35) + "em").attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")");
      }
    });
  }, TextOverlap;
}(Plugin);



/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

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
/******/ 	return __webpack_require__(9);
/******/ })()
.default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zZWxlY3Rpb25cIixcImNvbW1vbmpzMlwiOlwiZDMtc2VsZWN0aW9uXCIsXCJhbWRcIjpcImQzLXNlbGVjdGlvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL2Jyb3dzZXIudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS91dGlsLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvY29uZmlnL2NvbmZpZy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy12b3Jvbm9pXCIsXCJjb21tb25qczJcIjpcImQzLXZvcm9ub2lcIixcImFtZFwiOlwiZDMtdm9yb25vaVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtcG9seWdvblwiLFwiY29tbW9uanMyXCI6XCJkMy1wb2x5Z29uXCIsXCJhbWRcIjpcImQzLXBvbHlnb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIndpbiIsImRlZiIsIm8iLCJnbG9iYWwiLCJnbG9iYWxUaGlzIiwic2VsZiIsIndpbmRvdyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJhcmMiLCJhcmNMYWJlbExpbmUiLCJhcmNzIiwiYXJlYSIsImFyZWFzIiwiYXhpcyIsImF4aXNYIiwiYXhpc1hMYWJlbCIsImF4aXNZIiwiYXhpc1kyIiwiYXhpc1kyTGFiZWwiLCJheGlzWUxhYmVsIiwiYmFyIiwiYmFycyIsImJydXNoIiwiYnV0dG9uIiwiYnV0dG9uWm9vbVJlc2V0IiwiY2hhcnQiLCJjaGFydEFyYyIsImNoYXJ0QXJjcyIsImNoYXJ0QXJjc0JhY2tncm91bmQiLCJjaGFydEFyY3NHYXVnZU1heCIsImNoYXJ0QXJjc0dhdWdlTWluIiwiY2hhcnRBcmNzR2F1Z2VVbml0IiwiY2hhcnRBcmNzVGl0bGUiLCJjaGFydEFyY3NHYXVnZVRpdGxlIiwiY2hhcnRCYXIiLCJjaGFydEJhcnMiLCJjaGFydENpcmNsZXMiLCJjaGFydExpbmUiLCJjaGFydExpbmVzIiwiY2hhcnRSYWRhciIsImNoYXJ0UmFkYXJzIiwiY2hhcnRUZXh0IiwiY2hhcnRUZXh0cyIsImNpcmNsZSIsImNpcmNsZXMiLCJjb2xvclBhdHRlcm4iLCJjb2xvclNjYWxlIiwiZGVmb2N1c2VkIiwiZHJhZ2FyZWEiLCJlbXB0eSIsImV2ZW50UmVjdCIsImV2ZW50UmVjdHMiLCJldmVudFJlY3RzTXVsdGlwbGUiLCJldmVudFJlY3RzU2luZ2xlIiwiZm9jdXNlZCIsImdhdWdlVmFsdWUiLCJncmlkIiwiZ3JpZExpbmVzIiwibGVnZW5kIiwibGVnZW5kQmFja2dyb3VuZCIsImxlZ2VuZEl0ZW0iLCJsZWdlbmRJdGVtRXZlbnQiLCJsZWdlbmRJdGVtRm9jdXNlZCIsImxlZ2VuZEl0ZW1IaWRkZW4iLCJsZWdlbmRJdGVtUG9pbnQiLCJsZWdlbmRJdGVtVGlsZSIsImxldmVsIiwibGV2ZWxzIiwibGluZSIsImxpbmVzIiwibWFpbiIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInN1YmNoYXJ0IiwidGFyZ2V0IiwidGV4dCIsInRleHRzIiwidGl0bGUiLCJ0b29sdGlwIiwidG9vbHRpcENvbnRhaW5lciIsInRvb2x0aXBOYW1lIiwieGdyaWQiLCJ4Z3JpZEZvY3VzIiwieGdyaWRMaW5lIiwieGdyaWRMaW5lcyIsInhncmlkcyIsInlncmlkIiwieWdyaWRGb2N1cyIsInlncmlkTGluZSIsInlncmlkTGluZXMiLCJ5Z3JpZHMiLCJ6b29tQnJ1c2giLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJpc1ZhbHVlIiwidiIsImlzRnVuY3Rpb24iLCJpc1N0cmluZyIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc0RlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJNYXRoIiwiY2VpbCIsImFzSGFsZlBpeGVsIiwibiIsImRpZmZEb21haW4iLCJkIiwiaXNPYmplY3RUeXBlIiwiaXNFbXB0eSIsImxlbmd0aCIsIkRhdGUiLCJPYmplY3QiLCJrZXlzIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJvcHRpb25zIiwia2V5IiwiZGVmYXVsdFZhbHVlIiwiaGFzVmFsdWUiLCJkaWN0IiwidmFsdWUiLCJmb3VuZCIsImZvckVhY2giLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsImVuZGFsbCIsInRyYW5zaXRpb24iLCJjYiIsImVhY2giLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm1hcCIsIm11bHRpbGluZSIsInNwbGl0IiwibGVuIiwiaHRtbCIsImkiLCJhcHBlbmQiLCJhdHRyIiwiZ2V0UmVjdFNlZ0xpc3QiLCJwYXRoIiwiZ2V0QkJveCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJtaW4iLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInR5cGUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJuZWVkRXZhbHVhdGUiLCJoYXNBdHRyaWJ1dGUiLCJyZWN0IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kIiwicmFuZG9tIiwiZmluZEluZGV4Iiwic3RhcnQiLCJlbmQiLCJpc1JvdGF0ZWQiLCJtaWQiLCJmbG9vciIsInciLCJoIiwiYnJ1c2hFbXB0eSIsImN0eCIsImRlZXBDbG9uZSIsImNsb25lIiwiY29uc3RydWN0b3IiLCJyIiwiayIsIm9iamVjdE4iLCJyZWR1Y2UiLCJhIiwiYyIsImV4dGVuZCIsInNvdXJjZSIsInAiLCJ0ZXN0IiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0FycmF5IiwiZ2V0Q3NzUnVsZXMiLCJzdHlsZVNoZWV0cyIsInJ1bGVzIiwic2hlZXQiLCJjc3NSdWxlcyIsImNvbmNhdCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJocmVmIiwidG9TdHJpbmciLCJnZXRUcmFuc2xhdGlvbiIsInRyYW5zZm9ybSIsImJhc2VWYWwiLCJudW1iZXJPZkl0ZW1zIiwiZ2V0SXRlbSIsIm1hdHJpeCIsImIiLCJmIiwiZ2V0VW5pcXVlIiwiZGF0YSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJtZXJnZU9iaiIsInNoaWZ0Iiwic29ydFZhbHVlIiwiaXNBc2MiLCJldmVyeSIsInNvcnQiLCJnZXRNaW5NYXgiLCJyZXMiLCJ1bmRlZmluZWQiLCJnZXRSYW5nZSIsInN0ZXAiLCJtYXgiLCJwdXNoIiwiZW11bGF0ZUV2ZW50IiwibW91c2UiLCJnZXRQYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJNb3VzZUV2ZW50IiwiZWwiLCJldmVudFR5cGUiLCJwYXJhbXMiLCJkaXNwYXRjaEV2ZW50IiwibW91c2VFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJwYXJzZURhdGUiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImNvbmZpZyIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwiaGFzVG91Y2hQb2ludHMiLCJoYXNUb3VjaCIsImhhc01vdXNlIiwibG9hZENvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsIlBsdWdpbiIsIiQkIiwiJGJlZm9yZUluaXQiLCIkaW5pdCIsIiRhZnRlckluaXQiLCIkcmVkcmF3IiwiJHdpbGxEZXN0cm95IiwidmVyc2lvbiIsIk9wdGlvbnMiLCJzZWxlY3RvciIsImV4dGVudCIsIlRleHRPdmVybGFwIiwiZDNTZWxlY3RBbGwiLCJwcmV2ZW50TGFiZWxPdmVybGFwIiwiZ2VuZXJhdGVWb3Jvbm9pIiwic2NhbGUiLCJkb21haW4iLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwiY2VsbCIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwicm91bmQiLCJhdGFuMiIsIlBJIiwieFRyYW5zbGF0ZSIsInlUcmFuc2xhdGUiLCJ0eHRBbmNob3IiLCJhYnMiLCJkM1NlbGVjdCIsImQzUG9seWdvbkFyZWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBbUQ7QUFDbEYsQ0FBQztBQUNELE87Ozs7Ozs7QUNWQSxnRDs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7Ozs7Ozs7QUNBZTtBQUNmO0FB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LHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXZvcm9ub2lcIiksIHJlcXVpcmUoXCJkMy1wb2x5Z29uXCIpLCByZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYlwiLCBbXCJkMy12b3Jvbm9pXCIsIFwiZDMtcG9seWdvblwiLCBcImQzLXNlbGVjdGlvblwiLCBcImQzLWJydXNoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJiXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIiksIHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYmJcIl0gPSByb290W1wiYmJcIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSA9IHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdW1widGV4dG92ZXJsYXBcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzZfXykge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tbmV3LWZ1bmMsIG5vLXVuZGVmICovXG5leHBvcnQge3dpbiBhcyB3aW5kb3csIGRvYyBhcyBkb2N1bWVudH07XG5cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHQvLyBQcmlvcml0aXplIHJlZmVyZW5jaW5nIE5vZGUuanMgZ2xvYmFsIGZpcnN0IHRvIHByZXZlbnQgcmVmZW5jZSBlcnJvclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vbmF2ZXIvYmlsbGJvYXJkLmpzL2lzc3Vlcy8xNzc4XG5cdHJldHVybiBkZWYoZ2xvYmFsKSB8fCBkZWYoZ2xvYmFsVGhpcykgfHwgZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHRzdWJjaGFydDogXCJiYi1zdWJjaGFydFwiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBAaWdub3JlXG4gKi9cbmltcG9ydCB7ZXZlbnQgYXMgZDNFdmVudH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHticnVzaFNlbGVjdGlvbiBhcyBkM0JydXNoU2VsZWN0aW9ufSBmcm9tIFwiZDMtYnJ1c2hcIjtcbmltcG9ydCB7ZDNTZWxlY3Rpb259IGZyb20gXCIuLi8uLi90eXBlcy90eXBlc1wiO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XG5cbmV4cG9ydCB7XG5cdGFzSGFsZlBpeGVsLFxuXHRicnVzaEVtcHR5LFxuXHRjYWxsRm4sXG5cdGNhcGl0YWxpemUsXG5cdGNlaWwxMCxcblx0Y29udmVydElucHV0VHlwZSxcblx0ZGVlcENsb25lLFxuXHRkaWZmRG9tYWluLFxuXHRlbmRhbGwsXG5cdGVtdWxhdGVFdmVudCxcblx0ZXh0ZW5kLFxuXHRmaW5kSW5kZXgsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc2Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1RhYlZpc2libGUsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHBhcnNlRGF0ZSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG4vKipcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxuICogQHJldHVybnMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xuXHRsZXQgbiA9IDA7XG5cblx0dHJhbnNpdGlvblxuXHRcdC5lYWNoKCgpID0+ICsrbilcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XG59XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxuXHRub2RlOiBkM1NlbGVjdGlvbixcblx0dGV4dDogc3RyaW5nLFxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn1cblxuLyoqXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEJveChcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHt9IFNlbGVjdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fS4kZWwgU2VsZWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge2QzLmJydXNoU2VsZWN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0QnJ1c2hTZWxlY3Rpb24oeyRlbH0pIHtcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XG5cdGxldCBzZWxlY3Rpb247XG5cblx0Ly8gY2hlY2sgZnJvbSBldmVudFxuXHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufVxuXG4vKipcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXG4gKiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ1JlY3Qobm9kZSk6IHtcblx0bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxufSB7XG5cdGNvbnN0IG5lZWRFdmFsdWF0ZSA9ICEoXCJyZWN0XCIgaW4gbm9kZSkgfHwgKFxuXHRcdFwicmVjdFwiIGluIG5vZGUgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoXCJ3aWR0aFwiKSAmJiBub2RlLnJlY3Qud2lkdGggIT09ICtub2RlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpXG5cdCk7XG5cblx0cmV0dXJuIG5lZWRFdmFsdWF0ZSA/XG5cdFx0KG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpIDogbm9kZS5yZWN0O1xufVxuXG4vKipcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzU3RyIENvbnZlcnQgcmV0dXJuZWQgdmFsdWUgYXMgc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcblxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xufVxuXG4vKipcbiAqIEZpbmQgaW5kZXggYmFzZWQgb24gYmluYXJ5IHNlYXJjaFxuICogQHBhcmFtIHtBcnJheX0gYXJyIERhdGEgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IFRhcmdldCBudW1iZXIgdG8gZmluZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IGluZGV4IG9mIGRhdGEgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIGluZGV4IG9mIGRhdGEgYXJyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm90YXRlZCBXZWF0aGVyIGlzIHJvdGVkIGF4aXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEluZGV4IG51bWJlclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgdjogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgaXNSb3RhdGVkOiBib29sZWFuKTogbnVtYmVyIHtcblx0aWYgKHN0YXJ0ID4gZW5kKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0Y29uc3QgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG5cdGxldCB7eCwgdyA9IDB9ID0gYXJyW21pZF07XG5cblx0aWYgKGlzUm90YXRlZCkge1xuXHRcdHggPSBhcnJbbWlkXS55O1xuXHRcdHcgPSBhcnJbbWlkXS5oO1xuXHR9XG5cblx0aWYgKHYgPj0geCAmJiB2IDw9IHggKyB3KSB7XG5cdFx0cmV0dXJuIG1pZDtcblx0fVxuXG5cdHJldHVybiB2IDwgeCA/XG5cdFx0ZmluZEluZGV4KGFyciwgdiwgc3RhcnQsIG1pZCAtIDEsIGlzUm90YXRlZCkgOlxuXHRcdGZpbmRJbmRleChhcnIsIHYsIG1pZCArIDEsIGVuZCwgaXNSb3RhdGVkKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBicnVzaCBpcyBlbXB0eVxuICogQHBhcmFtIHtvYmplY3R9IGN0eCBCdXJzaCBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGJydXNoRW1wdHkoY3R4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIERlZXAgY29weSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IENsb25lZCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlZXBDbG9uZSguLi5vYmplY3ROKSB7XG5cdGNvbnN0IGNsb25lID0gdiA9PiB7XG5cdFx0aWYgKGlzT2JqZWN0KHYpICYmIHYuY29uc3RydWN0b3IpIHtcblx0XHRcdGNvbnN0IHIgPSBuZXcgdi5jb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGsgaW4gdikge1xuXHRcdFx0XHRyW2tdID0gY2xvbmUodltrXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByO1xuXHRcdH1cblxuXHRcdHJldHVybiB2O1xuXHR9O1xuXG5cdHJldHVybiBvYmplY3ROLm1hcCh2ID0+IGNsb25lKHYpKVxuXHRcdC5yZWR1Y2UoKGEsIGMpID0+IChcblx0XHRcdHsuLi5hLCAuLi5jfVxuXHRcdCkpO1xufVxuXG4vKipcbiAqIEV4dGVuZCB0YXJnZXQgZnJvbSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fEFycmF5fSBzb3VyY2UgU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgPSB7fSwgc291cmNlKTogb2JqZWN0IHtcblx0aWYgKGlzQXJyYXkoc291cmNlKSkge1xuXHRcdHNvdXJjZS5mb3JFYWNoKHYgPT4gZXh0ZW5kKHRhcmdldCwgdikpO1xuXHR9XG5cblx0Ly8gZXhjbHVkZSBuYW1lIHdpdGggb25seSBudW1iZXJzXG5cdGZvciAoY29uc3QgcCBpbiBzb3VyY2UpIHtcblx0XHRpZiAoL15cXGQrJC8udGVzdChwKSB8fCBwIGluIHRhcmdldCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W3BdID0gc291cmNlW3BdO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhcGl0YWxpemVkIHN0cmluZ1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG5cbi8qKlxuICogQ29udmVydCB0byBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHYgVGFyZ2V0IHRvIGJlIGNvbnZlcnRlZFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9ICh2OiBDU1NTdHlsZURlY2xhcmF0aW9uIHwgYW55KTogYW55ID0+IFtdLnNsaWNlLmNhbGwodik7XG5cbi8qKlxuICogR2V0IGNzcyBydWxlcyBmb3Igc3BlY2lmaWVkIHN0eWxlc2hlZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdHlsZVNoZWV0cyBUaGUgc3R5bGVzaGVldHMgdG8gZ2V0IHRoZSBydWxlcyBmcm9tXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDc3NSdWxlcyhzdHlsZVNoZWV0czogYW55W10pIHtcblx0bGV0IHJ1bGVzID0gW107XG5cblx0c3R5bGVTaGVldHMuZm9yRWFjaChzaGVldCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0cnVsZXMgPSBydWxlcy5jb25jYXQodG9BcnJheShzaGVldC5jc3NSdWxlcykpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgcnVsZXMgZnJvbSAke3NoZWV0LmhyZWZ9OiAke2UudG9TdHJpbmcoKX1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBydWxlcztcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHRWxlbWVudH0gbm9kZSBOb2RlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIFNvdXJjZSBkYXRhXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVuaXF1ZSBhcnJheSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlKGRhdGE6IGFueVtdKTogYW55W10ge1xuXHRjb25zdCBpc0RhdGUgPSBkYXRhWzBdIGluc3RhbmNlb2YgRGF0ZTtcblx0Y29uc3QgZCA9IChpc0RhdGUgPyBkYXRhLm1hcChOdW1iZXIpIDogZGF0YSlcblx0XHQuZmlsdGVyKCh2LCBpLCBzZWxmKSA9PiBzZWxmLmluZGV4T2YodikgPT09IGkpO1xuXG5cdHJldHVybiBpc0RhdGUgPyBkLm1hcCh2ID0+IG5ldyBEYXRlKHYpKSA6IGQ7XG59XG5cbi8qKlxuICogTWVyZ2UgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBTb3VyY2UgYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcblx0cmV0dXJuIGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW107XG59XG5cbi8qKlxuICogTWVyZ2Ugb2JqZWN0IHJldHVybmluZyBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0IFRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3ROIFNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtZXJnZU9iaih0YXJnZXQ6IG9iamVjdCwgLi4ub2JqZWN0Tik6IGFueSB7XG5cdGlmICghb2JqZWN0Ti5sZW5ndGggfHwgKG9iamVjdE4ubGVuZ3RoID09PSAxICYmICFvYmplY3ROWzBdKSkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCBzb3VyY2UgPSBvYmplY3ROLnNoaWZ0KCk7XG5cblx0aWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlT2JqKHRhcmdldFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGlzQXJyYXkodmFsdWUpID9cblx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG1lcmdlT2JqKHRhcmdldCwgLi4ub2JqZWN0Tik7XG59XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybnMge251bWJlcnxzdHJpbmd8RGF0ZX0gc29ydGVkIGRhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvcnRWYWx1ZShkYXRhOiBhbnlbXSwgaXNBc2MgPSB0cnVlKTogYW55W10ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59XG5cbi8qKlxuICogR2V0IG1pbi9tYXggdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlICdtaW4nIG9yICdtYXgnXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIEFycmF5IGRhdGEgdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNaW5NYXgodHlwZTogXCJtaW5cIiB8IFwibWF4XCIsIGRhdGE6IG51bWJlcltdIHwgRGF0ZVtdIHwgYW55KTogbnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCB8IGFueSB7XG5cdGxldCByZXMgPSBkYXRhLmZpbHRlcih2ID0+IG5vdEVtcHR5KHYpKTtcblxuXHRpZiAocmVzLmxlbmd0aCkge1xuXHRcdGlmIChpc051bWJlcihyZXNbMF0pKSB7XG5cdFx0XHRyZXMgPSBNYXRoW3R5cGVdKC4uLnJlcyk7XG5cdFx0fSBlbHNlIGlmIChyZXNbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXMgPSBzb3J0VmFsdWUocmVzLCB0eXBlID09PSBcIm1pblwiKVswXTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBHZXQgcmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgU3RlcCBudW1iZXJcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFJhbmdlID0gKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBzdGVwID0gMSk6IG51bWJlcltdID0+IHtcblx0Y29uc3QgcmVzOiBudW1iZXJbXSA9IFtdO1xuXHRjb25zdCBuID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSkgfCAwO1xuXG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHRcdHJlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0ZXApO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbi8vIGVtdWxhdGUgZXZlbnRcbmNvbnN0IGVtdWxhdGVFdmVudCA9IHtcblx0bW91c2U6ICgoKSA9PiB7XG5cdFx0Y29uc3QgZ2V0UGFyYW1zID0gKCkgPT4gKHtcblx0XHRcdGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgc2NyZWVuWDogMCwgc2NyZWVuWTogMCwgY2xpZW50WDogMCwgY2xpZW50WTogMFxuXHRcdH0pO1xuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXdcblx0XHRcdG5ldyBNb3VzZUV2ZW50KFwidFwiKTtcblxuXHRcdFx0cmV0dXJuIChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRjb25zdCBtb3VzZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Nb3VzZUV2ZW50L2luaXRNb3VzZUV2ZW50XG5cdFx0XHRcdG1vdXNlRXZlbnQuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0ZXZlbnRUeXBlLFxuXHRcdFx0XHRcdHBhcmFtcy5idWJibGVzLFxuXHRcdFx0XHRcdHBhcmFtcy5jYW5jZWxhYmxlLFxuXHRcdFx0XHRcdHdpbmRvdyxcblx0XHRcdFx0XHQwLCAvLyB0aGUgZXZlbnQncyBtb3VzZSBjbGljayBjb3VudFxuXHRcdFx0XHRcdHBhcmFtcy5zY3JlZW5YLCBwYXJhbXMuc2NyZWVuWSxcblx0XHRcdFx0XHRwYXJhbXMuY2xpZW50WCwgcGFyYW1zLmNsaWVudFksXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGxcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pKCksXG5cdHRvdWNoOiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG5cdFx0Y29uc3QgdG91Y2hPYmogPSBuZXcgVG91Y2gobWVyZ2VPYmooe1xuXHRcdFx0aWRlbnRpZmllcjogRGF0ZS5ub3coKSxcblx0XHRcdHRhcmdldDogZWwsXG5cdFx0XHRyYWRpdXNYOiAyLjUsXG5cdFx0XHRyYWRpdXNZOiAyLjUsXG5cdFx0XHRyb3RhdGlvbkFuZ2xlOiAxMCxcblx0XHRcdGZvcmNlOiAwLjVcblx0XHR9LCBwYXJhbXMpKTtcblxuXHRcdGVsLmRpc3BhdGNoRXZlbnQobmV3IFRvdWNoRXZlbnQoZXZlbnRUeXBlLCB7XG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdHNoaWZ0S2V5OiB0cnVlLFxuXHRcdFx0dG91Y2hlczogW3RvdWNoT2JqXSxcblx0XHRcdHRhcmdldFRvdWNoZXM6IFtdLFxuXHRcdFx0Y2hhbmdlZFRvdWNoZXM6IFt0b3VjaE9ial1cblx0XHR9KSk7XG5cdH1cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0aGUgdGVtcGxhdGUgICYgcmV0dXJuIGJvdW5kIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHRwbCBUZW1wbGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIERhdGEgdmFsdWUgdG8gYmUgcmVwbGFjZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0cGxQcm9jZXNzKHRwbDogc3RyaW5nLCBkYXRhOiBvYmplY3QpOiBzdHJpbmcge1xuXHRsZXQgcmVzID0gdHBsO1xuXG5cdGZvciAoY29uc3QgeCBpbiBkYXRhKSB7XG5cdFx0cmVzID0gcmVzLnJlcGxhY2UobmV3IFJlZ0V4cChgez0ke3h9fWAsIFwiZ1wiKSwgZGF0YVt4XSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCBwYXJzZWQgZGF0ZSB2YWx1ZVxuICogKEl0IG11c3QgYmUgY2FsbGVkIGluICdDaGFydEludGVybmFsJyBjb250ZXh0KVxuICogQHBhcmFtIHtEYXRlfHN0cmluZ3xudW1iZXJ9IGRhdGUgVmFsdWUgb2YgZGF0ZSB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtEYXRlfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEYXRlKGRhdGU6IERhdGUgfCBzdHJpbmcgfCBudW1iZXIgfCBhbnkpOiBEYXRlIHtcblx0bGV0IHBhcnNlZERhdGU7XG5cblx0aWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IGRhdGU7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmcoZGF0ZSkpIHtcblx0XHRjb25zdCB7Y29uZmlnLCBmb3JtYXR9ID0gdGhpcztcblxuXHRcdHBhcnNlZERhdGUgPSBmb3JtYXQuZGF0YVRpbWUoY29uZmlnLmRhdGFfeEZvcm1hdCkoZGF0ZSk7XG5cdH0gZWxzZSBpZiAoaXNOdW1iZXIoZGF0ZSkgJiYgIWlzTmFOKGRhdGUpKSB7XG5cdFx0cGFyc2VkRGF0ZSA9IG5ldyBEYXRlKCtkYXRlKTtcblx0fVxuXG5cdGlmICghcGFyc2VkRGF0ZSB8fCBpc05hTigrcGFyc2VkRGF0ZSkpIHtcblx0XHRjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IgJiZcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBwYXJzZSB4ICcke2RhdGV9JyB0byBEYXRlIG9iamVjdGApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlZERhdGU7XG59XG5cbi8qKlxuICogUmV0dXJuIGlmIHRoZSBjdXJyZW50IGRvYyBpcyB2aXNpYmxlIG9yIG5vdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1RhYlZpc2libGUoKTogYm9vbGVhbiB7XG5cdHJldHVybiAhZG9jdW1lbnQuaGlkZGVuO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBpbnB1dCB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG1vdXNlIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLm1vdXNlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRvdWNoIENvbmZpZyB2YWx1ZTogaW50ZXJhY3Rpb24uaW5wdXRUeXBlLnRvdWNoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcIm1vdXNlXCIgfCBcInRvdWNoXCIgfCBudWxsXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0SW5wdXRUeXBlKG1vdXNlOiBib29sZWFuLCB0b3VjaDogYm9vbGVhbik6IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGwge1xuXHRsZXQgaXNNb2JpbGUgPSBmYWxzZTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jyb3dzZXJfZGV0ZWN0aW9uX3VzaW5nX3RoZV91c2VyX2FnZW50I01vYmlsZV9UYWJsZXRfb3JfRGVza3RvcFxuXHRpZiAoL01vYmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpICYmIHRvdWNoKSB7XG5cdFx0Ly8gU29tZSBFZGdlIGRlc2t0b3AgcmV0dXJuIHRydWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzIwNDE3MDc0L1xuXHRcdGNvbnN0IGhhc1RvdWNoUG9pbnRzID0gd2luZG93Lm5hdmlnYXRvciAmJiBcIm1heFRvdWNoUG9pbnRzXCIgaW4gd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcblxuXHRcdC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL3RvdWNoZXZlbnRzLmpzXG5cdFx0Ly8gT24gSUUxMSB3aXRoIElFOSBlbXVsYXRpb24gbW9kZSwgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgaXMgcmV0dXJuaW5nIHRydWVcblx0XHRjb25zdCBoYXNUb3VjaCA9IChcIm9udG91Y2htb3ZlXCIgaW4gd2luZG93IHx8ICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSk7XG5cblx0XHRpc01vYmlsZSA9IGhhc1RvdWNoUG9pbnRzIHx8IGhhc1RvdWNoO1xuXHR9XG5cblx0Y29uc3QgaGFzTW91c2UgPSBtb3VzZSAmJiAhaXNNb2JpbGUgPyAoXCJvbm1vdXNlb3ZlclwiIGluIHdpbmRvdykgOiBmYWxzZTtcblxuXHRyZXR1cm4gKGhhc01vdXNlICYmIFwibW91c2VcIikgfHwgKGlzTW9iaWxlICYmIFwidG91Y2hcIikgfHwgbnVsbDtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XG5cbi8qKlxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XG5cdGxldCB0YXJnZXQ7XG5cdGxldCBrZXlzO1xuXHRsZXQgcmVhZDtcblxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcblxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xuXHRcdFx0cmV0dXJuIGZpbmQoKTtcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xuXHRcdHJlYWQgPSBmaW5kKCk7XG5cblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjEuNFwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb24gY2xhc3NcbiAqIEBjbGFzcyBUZXh0T3ZlcmxhcE9wdGlvbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1RleHRPdmVybGFwT3B0aW9uc31cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2VsZWN0b3Igc3RyaW5nIGZvciB0YXJnZXQgdGV4dCBub2Rlc1xuXHRcdFx0ICogQG5hbWUgc2VsZWN0b3Jcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtzdHJpbmd9XG5cdFx0XHQgKiBAZGVmYXVsdCBcIi5iYi10ZXh0cyB0ZXh0XCJcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgLy8gc2VsZWN0b3IgZm9yIGRhdGEgbGFiZWwgdGV4dCBub2Rlc1xuXHRcdFx0ICogc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIlxuXHRcdFx0ICovXG5cdFx0XHRzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBleHRlbnQgb2YgbGFiZWwgb3ZlcmxhcCBwcmV2ZW50aW9uXG5cdFx0XHQgKiBAbmFtZSBleHRlbnRcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0XHQgKiBAZGVmYXVsdCAxXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRleHRlbnQ6IDFcblx0XHRcdCAqL1xuXHRcdFx0ZXh0ZW50OiAxLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBtaW5pbXVtIGFyZWEgbmVlZGVkIHRvIHNob3cgYSBkYXRhIGxhYmVsXG5cdFx0XHQgKiBAbmFtZSBhcmVhXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdFx0ICogQGRlZmF1bHQgMFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0YXJlYTogMFxuXHRcdFx0ICovXG5cdFx0XHRhcmVhOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt2b3Jvbm9pIGFzIGQzVm9yb25vaX0gZnJvbSBcImQzLXZvcm9ub2lcIjtcbmltcG9ydCB7XG5cdHBvbHlnb25DZW50cm9pZCBhcyBkM1BvbHlnb25DZW50cm9pZCxcblx0cG9seWdvbkFyZWEgYXMgZDNQb2x5Z29uQXJlYVxufSBmcm9tIFwiZDMtcG9seWdvblwiO1xuaW1wb3J0IHtcblx0c2VsZWN0IGFzIGQzU2VsZWN0LFxuXHRzZWxlY3RBbGwgYXMgZDNTZWxlY3RBbGxcbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5cbi8qKlxuICogVGV4dE92ZXJsYXAgcGx1Z2luPGJyPlxuICogUHJldmVudHMgbGFiZWwgb3ZlcmxhcCB1c2luZyBbVm9yb25vaSBsYXlvdXRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zvcm9ub2lfZGlhZ3JhbSkuXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiAgIC0gW2QzLXBvbHlnb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1wb2x5Z29uKVxuICogICAtIFtkMy12b3Jvbm9pXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdm9yb25vaSlcbiAqIEBjbGFzcyBwbHVnaW4tdGV4dG92ZXJsYXBcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1wb2x5Z29uXG4gKiBAcmVxdWlyZXMgZDMtdm9yb25vaVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcH1cbiAqIEBleGFtcGxlXG4gKiAvLyBQbHVnaW4gbXVzdCBiZSBsb2FkZWQgYmVmb3JlIHRoZSB1c2UuXG4gKiA8c2NyaXB0IHNyYz1cIiRZT1VSX1BBVEgvcGx1Z2luL2JpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5qc1wiPjwvc2NyaXB0PlxuICpcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgIFx0ICBjb2x1bW5zOiBbIC4uLiBdXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLnRleHRvdmVybGFwKHtcbiAqICAgICAgICAgIHNlbGVjdG9yOiBcIi5iYi10ZXh0cyB0ZXh0XCIsXG4gKiAgICAgICAgICBleHRlbnQ6IDgsXG4gKiAgICAgICAgICBhcmVhOiAzXG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgVGV4dE92ZXJsYXAgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi10ZXh0b3ZlcmxhcC5lc21cIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBUZXh0T3ZlcmxhcCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRPdmVybGFwIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XG5cdH1cblxuXHQkcmVkcmF3KCk6IHZvaWQge1xuXHRcdGNvbnN0IHRleHQgPSBkM1NlbGVjdEFsbCh0aGlzLmNvbmZpZy5zZWxlY3Rvcik7XG5cblx0XHQhdGV4dC5lbXB0eSgpICYmIHRoaXMucHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgdGhlIHZvcm9ub2kgbGF5b3V0IGZvciBkYXRhIGxhYmVsc1xuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBJbmRpY2VzIHZhbHVlc1xuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBWb3Jvbm9pIGxheW91dCBwb2ludHMgYW5kIGNvcnJlc3BvbmRpbmcgRGF0YSBwb2ludHNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGdlbmVyYXRlVm9yb25vaShkYXRhKSB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IFttaW4sIG1heF0gPSBbXCJ4XCIsIFwieVwiXS5tYXAodiA9PiBzY2FsZVt2XS5kb21haW4oKSk7XG5cblx0XHRbbWluWzFdLCBtYXhbMF1dID0gW21heFswXSwgbWluWzFdXTtcblxuXHRcdHJldHVybiBkM1Zvcm9ub2koKVxuXHRcdFx0LmV4dGVudChbbWluLCBtYXhdKVxuXHRcdFx0LnBvbHlnb25zKGRhdGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0ZXh0IGxhYmVsJ3MgcG9zaXRpb24gdG8gcHJldmVudGcgb3ZlcmxhcC5cblx0ICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gdGV4dCB0YXJnZXQgdGV4dCBzZWxlY3Rpb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk6IHZvaWQge1xuXHRcdGNvbnN0IHtleHRlbnQsIGFyZWF9ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgY2VsbHMgPSB0aGlzLmdlbmVyYXRlVm9yb25vaSh0ZXh0LmRhdGEoKS5tYXAodiA9PiBbdi54LCB2LnZhbHVlXSkpO1xuXHRcdGxldCBpID0gMDtcblxuXHRcdHRleHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IGNlbGwgPSBjZWxsc1tpKytdO1xuXG5cdFx0XHRpZiAoY2VsbCAmJiB0aGlzKSB7XG5cdFx0XHRcdGNvbnN0IFt4LCB5XSA9IGNlbGwuZGF0YTtcblx0XHRcdFx0Y29uc3QgW2N4LCBjeV0gPSBkM1BvbHlnb25DZW50cm9pZChjZWxsKTtcblx0XHRcdFx0Y29uc3QgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIoY3kgLSB5LCBjeCAtIHgpIC8gTWF0aC5QSSAqIDIpO1xuXG5cdFx0XHRcdGNvbnN0IHhUcmFuc2xhdGUgPSBleHRlbnQgKiAoYW5nbGUgPT09IDAgPyAxIDogLTEpO1xuXHRcdFx0XHRjb25zdCB5VHJhbnNsYXRlID0gYW5nbGUgPT09IC0xID8gLWV4dGVudCA6IGV4dGVudCArIDU7XG5cblx0XHRcdFx0Y29uc3QgdHh0QW5jaG9yID0gTWF0aC5hYnMoYW5nbGUpID09PSAxID9cblx0XHRcdFx0XHRcIm1pZGRsZVwiIDogKGFuZ2xlID09PSAwID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG5cblx0XHRcdFx0ZDNTZWxlY3QodGhpcylcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0LmF0dHIoXCJkaXNwbGF5XCIsIGQzUG9seWdvbkFyZWEoY2VsbCkgPCBhcmVhID8gXCJub25lXCIgOiBudWxsKVxuXHRcdFx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgdHh0QW5jaG9yKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYDAuJHthbmdsZSA9PT0gMSA/IDcxIDogMzV9ZW1gKVxuXHRcdFx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt4VHJhbnNsYXRlfSwgJHt5VHJhbnNsYXRlfSlgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oOSk7XG4iXSwic291cmNlUm9vdCI6IiJ9