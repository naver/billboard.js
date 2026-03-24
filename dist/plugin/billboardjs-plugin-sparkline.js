/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.18.0-nightly-20260324005043
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bb", [], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory();
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["sparkline"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Sparkline; }
});

;// ./src/config/classes.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const $COMMON = {
  button: "bb-button",
  chart: "bb-chart",
  empty: "bb-empty",
  main: "bb-main",
  target: "bb-target",
  EXPANDED: "_expanded_",
  dummy: "_dummy_"
};
const $ARC = {
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcLabelLineText: "bb-arc-label-line-text",
  arcRange: "bb-arc-range",
  arcs: "bb-arcs",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsTitle: "bb-chart-arcs-title",
  needle: "bb-needle"
};
const $AREA = {
  area: "bb-area",
  areas: "bb-areas"
};
const $AXIS = {
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  axisXTooltip: "bb-axis-x-tooltip",
  axisYTooltip: "bb-axis-y-tooltip",
  axisY2Tooltip: "bb-axis-y2-tooltip",
  axisTooltipX: "bb-axis-tooltip-x",
  axisTooltipY: "bb-axis-tooltip-y"
};
const $BAR = {
  bar: "bb-bar",
  bars: "bb-bars",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  barConnectLine: "bb-bar-connectLine"
};
const $CANDLESTICK = {
  candlestick: "bb-candlestick",
  candlesticks: "bb-candlesticks",
  chartCandlestick: "bb-chart-candlestick",
  chartCandlesticks: "bb-chart-candlesticks",
  valueDown: "bb-value-down",
  valueUp: "bb-value-up"
};
const $CIRCLE = {
  chartCircles: "bb-chart-circles",
  circle: "bb-circle",
  circles: "bb-circles"
};
const $COLOR = {
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale"
};
const $DRAG = {
  dragarea: "bb-dragarea",
  INCLUDED: "_included_"
};
const $FUNNEL = {
  funnel: "bb-funnel",
  chartFunnel: "bb-chart-funnel",
  chartFunnels: "bb-chart-funnels",
  funnelBackground: "bb-funnel-background"
};
const $GAUGE = {
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  gaugeValue: "bb-gauge-value"
};
const $LEGEND = {
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile"
};
const $LINE = {
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  line: "bb-line",
  lines: "bb-lines"
};
const $EVENT = {
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single"
};
const $FOCUS = {
  focused: "bb-focused",
  defocused: "bb-defocused",
  legendItemFocused: "bb-legend-item-focused",
  xgridFocus: "bb-xgrid-focus",
  ygridFocus: "bb-ygrid-focus"
};
const $GRID = {
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  xgrid: "bb-xgrid",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids"
};
const $LEVEL = {
  level: "bb-level",
  levels: "bb-levels"
};
const $RADAR = {
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars"
};
const $REGION = {
  region: "bb-region",
  regions: "bb-regions"
};
const $SELECT = {
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  SELECTED: "_selected_"
};
const $SHAPE = {
  shape: "bb-shape",
  shapes: "bb-shapes"
};
const $SUBCHART = {
  brush: "bb-brush",
  subchart: "bb-subchart"
};
const $TEXT = {
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  textBorderRect: "bb-text-border",
  textLabelImage: "bb-text-label-image",
  TextOverlapping: "text-overlapping"
};
const $TOOLTIP = {
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name"
};
const $TREEMAP = {
  treemap: "bb-treemap",
  chartTreemap: "bb-chart-treemap",
  chartTreemaps: "bb-chart-treemaps"
};
const $ZOOM = {
  buttonZoomReset: "bb-zoom-reset",
  zoomBrush: "bb-zoom-brush"
};
/* harmony default export */ var classes = (__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, $COMMON), $ARC), $AREA), $AXIS), $BAR), $CANDLESTICK), $CIRCLE), $COLOR), $DRAG), $GAUGE), $LEGEND), $LINE), $EVENT), $FOCUS), $FUNNEL), $GRID), $RADAR), $REGION), $SELECT), $SHAPE), $SUBCHART), $TEXT), $TOOLTIP), $TREEMAP), $ZOOM));

;// ./src/module/util/type-checks.ts
const isValue = (v) => v || v === 0;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const ceil10 = (v) => Math.ceil(v / 10) * 10;
const asHalfPixel = (n) => Math.ceil(n) + 0.5;
const diffDomain = (d) => d[1] - d[0];
const isObjectType = (v) => typeof v === "object";
const isEmptyObject = (obj) => {
  for (const x in obj) {
    return false;
  }
  return true;
};
const isEmpty = (o) => isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && isEmptyObject(o) || isNumber(o) && isNaN(o);
const notEmpty = (o) => !isEmpty(o);
const isArray = (arr) => Array.isArray(arr);
const isObject = (obj) => obj && !(obj == null ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj);


;// ./src/config/config.ts

function loadConfig(config) {
  const thisConfig = this.config;
  let target;
  let keys;
  let read;
  const find = () => {
    const key = keys.shift();
    if (key && target && isObjectType(target) && key in target) {
      target = target[key];
      return find();
    } else if (!key) {
      return target;
    }
    return void 0;
  };
  Object.keys(thisConfig).forEach((key) => {
    target = config;
    keys = key.split("_");
    read = find();
    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  });
  if (this.api) {
    this.state.orgConfig = config;
  }
}

;// ./src/Plugin/Plugin.ts
var Plugin_defProp = Object.defineProperty;
var Plugin_defNormalProp = (obj, key, value) => key in obj ? Plugin_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => Plugin_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

class Plugin {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  constructor(options = {}) {
    __publicField(this, "$$");
    __publicField(this, "options");
    __publicField(this, "config");
    this.options = options;
  }
  /**
   * Load plugin config from options
   * @private
   */
  loadConfig() {
    loadConfig.call(this, this.options);
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */
  $beforeInit() {
  }
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  $init() {
  }
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  $afterInit() {
  }
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  $redraw() {
  }
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  $willDestroy() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
      delete this[key];
    });
  }
}
__publicField(Plugin, "version", "3.18.0-nightly-20260324005043");

;// ./src/Plugin/sparkline/Options.ts
class Options {
  constructor() {
    return {
      /**
       * Specify sparkline charts holder selector.
       * - **NOTE:** The amount of holder should match with the amount of data. If has less, will append necessaray amount nodes as sibling of main chart.
       * @name selector
       * @memberof plugin-sparkline
       * @type {string}
       * @default undefined
       * @example
       *   selector: ".sparkline"
       */
      selector: void 0
    };
  }
}

;// ./src/Plugin/sparkline/index.ts
var sparkline_defProp = Object.defineProperty;
var sparkline_defNormalProp = (obj, key, value) => key in obj ? sparkline_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var sparkline_publicField = (obj, key, value) => sparkline_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);



class Sparkline extends Plugin {
  constructor(options) {
    super(options);
    sparkline_publicField(this, "element");
    this.config = new Options();
    return this;
  }
  $beforeInit() {
    this.loadConfig();
    this.validate();
    this.element = [].slice.call(document.querySelectorAll(this.config.selector));
    this.overrideInternals();
    this.overrideOptions();
    this.overHandler = this.overHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.outHandler = this.outHandler.bind(this);
  }
  validate() {
    const { $$, config } = this;
    let msg = "";
    if (!config.selector || !document.querySelector(config.selector)) {
      msg = "No holder elements found from given selector option.";
    }
    if ($$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType($$.data.targets)) {
      msg = "Contains non supported chart types.";
    }
    if (msg) {
      throw new Error(`[Sparkline plugin] ${msg}`);
    }
  }
  overrideInternals() {
    const { $$ } = this;
    const { getBarW, getIndices } = $$;
    $$.getIndices = function(indices, d, caller) {
      return caller === "getShapeX" ? {} : getIndices.call(this, indices, d);
    };
    $$.getBarW = function(type, axis) {
      return getBarW.call(this, type, axis, 1);
    };
  }
  overrideOptions() {
    const { config } = this.$$;
    config.legend_show = false;
    config.resize_auto = false;
    config.axis_x_show = false;
    if (config.padding !== false) {
      const hasOption = (o) => Object.keys(o || {}).length > 0;
      if (hasOption(config.axis_x_padding)) {
        config.axis_x_padding = {
          left: 15,
          right: 15,
          unit: "px"
        };
      }
      if (hasOption(config.axis_y_padding)) {
        config.axis_y_padding = 5;
      }
    }
    config.axis_y_show = false;
    if (!config.tooltip_position) {
      config.tooltip_position = function(data, width, height) {
        const { internal: { state: { event } } } = this;
        let top = event.pageY - height * 1.35;
        let left = event.pageX - width / 2;
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        return { top, left };
      };
    }
  }
  $init() {
    var _a;
    const { $$: { $el } } = this;
    $el.chart.style("width", "0").style("height", "0").style("pointer-events", "none");
    ((_a = $el.tooltip) == null ? void 0 : _a.node()) && document.body.appendChild($el.tooltip.node());
  }
  $afterInit() {
    const { $$ } = this;
    $$.$el.svg.attr("style", null).style("width", "0").style("height", "0");
    this.bindEvents(true);
  }
  /**
   * Bind tooltip event handlers for each sparkline elements.
   * @param {boolean} bind or unbind
   * @private
   */
  bindEvents(bind = true) {
    const { $$: { config } } = this;
    if (config.interaction_enabled && config.tooltip_show) {
      const method = `${bind ? "add" : "remove"}EventListener`;
      this.element.forEach((el) => {
        const svg = el.querySelector("svg");
        svg[method]("mouseover", this.overHandler);
        svg[method]("mousemove", this.moveHandler);
        svg[method]("mouseout", this.outHandler);
      });
    }
  }
  overHandler(e) {
    const { $$ } = this;
    const { state: { eventReceiver } } = $$;
    eventReceiver.rect = e.target.getBoundingClientRect();
  }
  moveHandler(e) {
    var _a, _b, _c, _d;
    const { $$ } = this;
    const index = $$.getDataIndexFromEvent(e);
    const data = (_a = $$.api.data(e.target.__id)) == null ? void 0 : _a[0];
    const d = (_b = data == null ? void 0 : data.values) == null ? void 0 : _b[index];
    if (d && !d.name) {
      d.name = d.id;
    }
    $$.state.event = e;
    if (((_c = $$.isPointFocusOnly) == null ? void 0 : _c.call($$)) && d) {
      (_d = $$.showCircleFocus) == null ? void 0 : _d.call($$, [d]);
    }
    $$.setExpand(index, data.id, true);
    $$.showTooltip([d], e.target);
  }
  outHandler(e) {
    const { $$ } = this;
    $$.state.event = e;
    $$.isPointFocusOnly() ? $$.hideCircleFocus() : $$.unexpandCircles();
    $$.hideTooltip();
  }
  $redraw() {
    var _a;
    const { $$ } = this;
    const { $el } = $$;
    let el = this.element;
    const data = $$.api.data();
    const svgWrapper = (_a = $el.chart.html().match(/<svg[^>]*>/)) == null ? void 0 : _a[0];
    if (el.length < data.length) {
      const chart = $el.chart.node();
      for (let i = data.length - el.length; i > 0; i--) {
        chart.parentNode.insertBefore(el[0].cloneNode(), chart.nextSibling);
      }
      this.element = document.querySelectorAll(this.config.selector);
      el = this.element;
    }
    data.map((v) => v.id).forEach((id, i) => {
      const selector = `.${$COMMON.target}-${id}`;
      const shape = $el.main.selectAll(selector);
      let svg = el[i].querySelector("svg");
      if (!svg) {
        el[i].innerHTML = `${svgWrapper}</svg>`;
        svg = el[i].querySelector("svg");
        svg.__id = id;
      }
      if (!svg.querySelector(selector)) {
        shape.style("opacity", null);
      }
      shape.style("fill", "none").style("opacity", null);
      svg.innerHTML = "";
      svg.appendChild(shape.node());
    });
  }
  $willDestroy() {
    this.bindEvents(false);
    this.element.forEach((el) => {
      el.innerHTML = "";
    });
  }
}
sparkline_publicField(Sparkline, "version", `0.0.1`);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});