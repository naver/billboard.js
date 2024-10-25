/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.14.0
*/
import { pointer, select, namespaces, selectAll } from 'd3-selection';
import { timeParse, utcParse, timeFormat, utcFormat } from 'd3-time-format';
import { brushSelection, brushY, brushX } from 'd3-brush';
import { csvParseRows, csvParse, tsvParseRows, tsvParse } from 'd3-dsv';
import { drag as drag$1 } from 'd3-drag';
import { scaleOrdinal, scaleLinear, scaleSymlog, scaleLog, scaleTime, scaleUtc } from 'd3-scale';
import { transition } from 'd3-transition';
import { curveBasis, curveBasisClosed, curveBasisOpen, curveBundle, curveCardinal, curveCardinalClosed, curveCardinalOpen, curveCatmullRom, curveCatmullRomClosed, curveCatmullRomOpen, curveMonotoneX, curveMonotoneY, curveNatural, curveLinearClosed, curveLinear, curveStep, curveStepAfter, curveStepBefore, pie as pie$1, arc, area as area$1, line as line$1 } from 'd3-shape';
import { axisLeft, axisBottom, axisTop, axisRight } from 'd3-axis';
import { easeLinear } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { treemap as treemap$1, treemapBinary, treemapDice, treemapSlice, treemapSliceDice, treemapSquarify, treemapResquarify, hierarchy } from 'd3-hierarchy';
import { zoomIdentity, zoomTransform, zoom as zoom$2 } from 'd3-zoom';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
var $COMMON = {
    button: "bb-button",
    chart: "bb-chart",
    empty: "bb-empty",
    main: "bb-main",
    target: "bb-target",
    EXPANDED: "_expanded_"
};
var $ARC = {
    arc: "bb-arc",
    arcLabelLine: "bb-arc-label-line",
    arcRange: "bb-arc-range",
    arcs: "bb-arcs",
    chartArc: "bb-chart-arc",
    chartArcs: "bb-chart-arcs",
    chartArcsBackground: "bb-chart-arcs-background",
    chartArcsTitle: "bb-chart-arcs-title",
    needle: "bb-needle"
};
var $AREA = {
    area: "bb-area",
    areas: "bb-areas"
};
var $AXIS = {
    axis: "bb-axis",
    axisX: "bb-axis-x",
    axisXLabel: "bb-axis-x-label",
    axisY: "bb-axis-y",
    axisY2: "bb-axis-y2",
    axisY2Label: "bb-axis-y2-label",
    axisYLabel: "bb-axis-y-label",
    axisXTooltip: "bb-axis-x-tooltip",
    axisYTooltip: "bb-axis-y-tooltip",
    axisY2Tooltip: "bb-axis-y2-tooltip"
};
var $BAR = {
    bar: "bb-bar",
    bars: "bb-bars",
    chartBar: "bb-chart-bar",
    chartBars: "bb-chart-bars"
};
var $CANDLESTICK = {
    candlestick: "bb-candlestick",
    candlesticks: "bb-candlesticks",
    chartCandlestick: "bb-chart-candlestick",
    chartCandlesticks: "bb-chart-candlesticks",
    valueDown: "bb-value-down",
    valueUp: "bb-value-up"
};
var $CIRCLE = {
    chartCircles: "bb-chart-circles",
    circle: "bb-circle",
    circles: "bb-circles"
};
var $COLOR = {
    colorPattern: "bb-color-pattern",
    colorScale: "bb-colorscale"
};
var $DRAG = {
    dragarea: "bb-dragarea",
    INCLUDED: "_included_"
};
var $FUNNEL = {
    funnel: "bb-funnel",
    chartFunnel: "bb-chart-funnel",
    chartFunnels: "bb-chart-funnels",
    funnelBackground: "bb-funnel-background"
};
var $GAUGE = {
    chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
    chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
    chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
    chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
    gaugeValue: "bb-gauge-value"
};
var $LEGEND = {
    legend: "bb-legend",
    legendBackground: "bb-legend-background",
    legendItem: "bb-legend-item",
    legendItemEvent: "bb-legend-item-event",
    legendItemHidden: "bb-legend-item-hidden",
    legendItemPoint: "bb-legend-item-point",
    legendItemTile: "bb-legend-item-tile"
};
var $LINE = {
    chartLine: "bb-chart-line",
    chartLines: "bb-chart-lines",
    line: "bb-line",
    lines: "bb-lines"
};
var $EVENT = {
    eventRect: "bb-event-rect",
    eventRects: "bb-event-rects",
    eventRectsMultiple: "bb-event-rects-multiple",
    eventRectsSingle: "bb-event-rects-single"
};
var $FOCUS = {
    focused: "bb-focused",
    defocused: "bb-defocused",
    legendItemFocused: "bb-legend-item-focused",
    xgridFocus: "bb-xgrid-focus",
    ygridFocus: "bb-ygrid-focus"
};
var $GRID = {
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
var $LEVEL = {
    level: "bb-level",
    levels: "bb-levels"
};
var $RADAR = {
    chartRadar: "bb-chart-radar",
    chartRadars: "bb-chart-radars"
};
var $REGION = {
    region: "bb-region",
    regions: "bb-regions"
};
var $SELECT = {
    selectedCircle: "bb-selected-circle",
    selectedCircles: "bb-selected-circles",
    SELECTED: "_selected_"
};
var $SHAPE = {
    shape: "bb-shape",
    shapes: "bb-shapes"
};
var $SUBCHART = {
    brush: "bb-brush",
    subchart: "bb-subchart"
};
var $TEXT = {
    chartText: "bb-chart-text",
    chartTexts: "bb-chart-texts",
    text: "bb-text",
    texts: "bb-texts",
    title: "bb-title",
    TextOverlapping: "text-overlapping"
};
var $TOOLTIP = {
    tooltip: "bb-tooltip",
    tooltipContainer: "bb-tooltip-container",
    tooltipName: "bb-tooltip-name"
};
var $TREEMAP = {
    treemap: "bb-treemap",
    chartTreemap: "bb-chart-treemap",
    chartTreemaps: "bb-chart-treemaps"
};
var $ZOOM = {
    buttonZoomReset: "bb-zoom-reset",
    zoomBrush: "bb-zoom-brush"
};
var CLASS = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, $COMMON), $ARC), $AREA), $AXIS), $BAR), $CANDLESTICK), $CIRCLE), $COLOR), $DRAG), $GAUGE), $LEGEND), $LINE), $EVENT), $FOCUS), $FUNNEL), $GRID), $RADAR), $REGION), $SELECT), $SHAPE), $SUBCHART), $TEXT), $TOOLTIP), $TREEMAP), $ZOOM);

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * boost config options
 */
var boost = {
    /**
     * Set boost options
     * @name boost
     * @memberof Options
     * @type {object}
     * @property {object} boost boost object
     * @property {boolean} [boost.useCssRule=false] Avoid setting inline styles for each shape elements.
     * - **NOTE:**
     *   - Will append &lt;style> to the head tag and will add shpes' CSS rules dynamically.
     *   - For now, covers colors related properties (fill, stroke, etc.) only.
     * @property {boolean} [boost.useWorker=false] Use Web Worker as possible for processing.
     * - **NOTE:**
     *   - For now, only applies for data conversion at the initial time.
     *   - As of Web Worker's async nature, handling chart instance synchrously is not recommended.
     * @example
     *  boost: {
     *      useCssRule: true,
     *      useWorker: false
     *  }
     */
    boost_useCssRule: false,
    boost_useWorker: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * color config options
 */
var color$1 = {
    /**
     * Set color of the data values
     * @name color
     * @memberof Options
     * @type {object}
     * @property {object} color color object
     * @property {string|object|Function} [color.onover] Set the color value for each data point when mouse/touch onover event occurs.
     * @property {Array|null} [color.pattern=[]] Set custom color pattern. Passing `null` will not set a color for these elements, which requires the usage of custom CSS-based theming to work.
     * @property {Function} [color.tiles] if defined, allows use svg's patterns to fill data area. It should return an array of [SVGPatternElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement).
     *  - **NOTE:** The pattern element's id will be defined as `bb-colorize-pattern-$COLOR-VALUE`.<br>
     *    ex. When color pattern value is `['red', '#fff']` and defined 2 patterns,then ids for pattern elements are:<br>
     *    - `bb-colorize-pattern-red`
     *    - `bb-colorize-pattern-fff`
     * @property {object} [color.threshold] color threshold for gauge and tooltip color
     * @property {string} [color.threshold.unit] If set to `value`, the threshold will be based on the data value. Otherwise it'll be based on equation of the `threshold.max` option value.
     * @property {Array} [color.threshold.values] Threshold values for each steps
     * @property {number} [color.threshold.max=100] The base value to determine threshold step value condition. When the given value is 15 and max 10, then the value for threshold is `15*100/10`.
     * @example
     *  color: {
     *      pattern: ["#1f77b4", "#aec7e8", ...],
     *
     *      // Set colors' patterns
     *      // it should return an array of SVGPatternElement
     *      tiles: function() {
     *         var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
     *         var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
     *         var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
     *
     *         pattern.setAttribute("patternUnits", "userSpaceOnUse");
     *         pattern.setAttribute("width", "32");
     *         pattern.setAttribute("height", "32");
     *
     *         g.style.fill = "#000";
     *         g.style.opacity = "0.2";
     *
     *         circle1.setAttribute("cx", "3");
     *         circle1.setAttribute("cy", "3");
     *         circle1.setAttribute("r", "3");
     *
     *         g.appendChild(circle1);
     *         pattern.appendChild(g);
     *
     *         return [pattern];
     *      },
     *
     *      // for threshold usage, pattern values should be set for each steps
     *      pattern: ["grey", "green", "yellow", "orange", "red"],
     *      threshold: {
     *          unit: "value",
     *
     *          // when value is 20 => 'green', value is 40 => 'orange' will be set.
     *          values: [10, 20, 30, 40, 50],
     *
     *          // the equation for max:
     *          // - unit == 'value': max => 30
     *          // - unit != 'value': max => value*100/30
     *          max: 30
     *      },
     *
     *      // set all data to 'red'
     *      onover: "red",
     *
     *      // set different color for data
     *      onover: {
     *          data1: "red",
     *          data2: "yellow"
     *      },
     *
     *      // will pass data object to the callback
     *      onover: function(d) {
     *          return d.id === "data1" ? "red" : "green";
     *      }
     *  }
     */
    color_pattern: [],
    color_tiles: undefined,
    color_threshold: {},
    color_onover: undefined
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * legend config options
 */
var legend$2 = {
    /**
     * Legend options
     * @name legend
     * @memberof Options
     * @type {object}
     * @property {object} legend Legend object
     * @property {boolean} [legend.show=true] Show or hide legend.
     * @property {boolean} [legend.hide=false] Hide legend
     *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
     * @property {string|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
     * - **NOTE:** Should be used along with `legend.contents.template`.
     * @property {string|Function} [legend.contents.template="<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>"] Set item's template.<br>
     *  - If set `string` value, within template the 'color' and 'title' can be replaced using template-like syntax string:
     *    - {=COLOR}: data color value
     *    - {=TITLE}: data title value
     *  - If set `function` value, will pass following arguments to the given function:
     *   - title {string}: data's id value
     *   - color {string}: color string
     *   - data {Array}: data array
     * @property {string} [legend.position=bottom] Change the position of legend.<br>
     *  Available values are: `bottom`, `right` and `inset` are supported.
     * @property {object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
     *  This option accepts object that has the keys `anchor`, `x`, `y` and `step`.
     *  - **anchor** decides the position of the legend:
     *   - top-left
     *   - top-right
     *   - bottom-left
     *   - bottom-right
     *  - **x** and **y**:
     *   - set the position of the legend based on the anchor.
     *  - **step**:
     *   - defines the max step the legend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
     * @property {boolean} [legend.equally=false] Set to all items have same width size.
     * @property {number} [legend.padding=0] Set padding value
     * @property {boolean} [legend.item.interaction=true] Set legend item interaction.
     *  - **NOTE:**
     *    - This setting will not have effect on `.toggle()` method.
     *    - `legend.item.onXXX` listener options will work if set, regardless of this option value.
     * @property {boolean} [legend.item.interaction.dblclick=false] Set legend item to interact on double click.
     *  - **NOTE:**
     *    - Double clicking will make focused clicked dataseries only, hiding all others.
     *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
     *    - To return initial state(which all dataseries are showing), double click current focused legend item again.
     *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
     *    - In this case, default `click` interaction will be disabled.
     * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
     *  - **NOTE:**
     *    - When set, default `click` interaction will be disabled.
     *    - When `interaction.dblclick=true` is set, will be called on double click.
     * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
     *  - **NOTE:** When set, default `mouseover` interaction will be disabled.
     * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
     *  - **NOTE:** When set, default `mouseout` interaction will be disabled.
     * @property {number} [legend.item.tile.width=10] Set width for 'rectangle' legend item tile element.
     * @property {number} [legend.item.tile.height=10] Set height for 'rectangle' legend item tile element.
     * @property {number} [legend.item.tile.r=5] Set the radius for 'circle' legend item tile type.
     * @property {string} [legend.item.tile.type="rectangle"] Set legend item shape type.<br>
     * - **Available Values:**
     *   - circle
     *   - rectangle
     * @property {boolean} [legend.format] Set formatter function for legend text.
     * The argument:<br>
     *  - `id`: Legend text value. When `data.names` is specified, will pass from it, otherwise will pass data id.
     *  - `dataId`: When `data.names` specified, will pass the original data id. Otherwise will be undefined.
     * @property {boolean} [legend.tooltip=false] Show full legend text value using system tooltip(via `<title>` element).
     * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
     * @see [Demo: format](https://naver.github.io/billboard.js/demo/#Legend.LegendFormat)
     * @see [Demo: item.interaction](https://naver.github.io/billboard.js/demo/#Legend.LegendItemInteraction)
     * @see [Demo: item.tile.type](https://naver.github.io/billboard.js/demo/#Legend.LegendItemTileType)
     * @see [Demo: position](https://naver.github.io/billboard.js/demo/#Legend.LegendPosition)
     * @see [Demo: contents.template](https://naver.github.io/billboard.js/demo/#Legend.LegendTemplate1)
     * @see [Demo: usePoint](https://naver.github.io/billboard.js/demo/#Legend.usePoint)
     * @example
     *  legend: {
     *      show: true,
     *      hide: true,
     *      //or hide: "data1"
     *      //or hide: ["data1", "data2"]
     *      contents: {
     *          bindto: "#legend",   // <ul id='legend'></ul>
     *
     *          // will be as: <li style='background-color:#1f77b4'>data1</li>
     *          template: "<li style='background-color:{=COLOR}'>{=TITLE}</li>"
     *
     *          // or using function
     *          template: function(id, color, data) {
     *               // if you want omit some legend, return falsy value
     *               if (id !== "data1") {
     *                    return "<li style='background-color:"+ color +">"+ id +"</li>";
     *               }
     *          }
     *      },
     *      position: "bottom",  // bottom, right, inset
     *      inset: {
     *          anchor: "top-right"  // top-left, top-right, bottom-left, bottom-right
     *          x: 20,
     *          y: 10,
     *          step: 2
     *      },
     *      equally: false,
     *      padding: 10,
     *      item: {
     *          // will disable default interaction
     *          interaction: false,
     *
     *          // set legend interact on double click
     *          // by double clicking, will make focused clicked dataseries only, hiding all others.
     *          interaction: {
     *            dblclick: true
     *          }
     *
     *          // when set below callback, will disable corresponding default interactions
     *          onclick: function(id, visible) {
     *           	// toggle based on the data visibility
     *           	this[visible ? "hide" : "show"](id);
     *          },
     *          onover: function(id, visible) { ... },
     *          onout: function(id, visible) { ... },
     *
     *          // set tile's size
     *          tile: {
     *              // set tile type
     *              type: "circle"  // or "rectangle" (default)
     *
     *              // width & height, are only applicable for 'rectangle' legend type
     *              width: 15,
     *              height: 15
     *
     *              // radis is only applicable for 'circle' legend type
     *              r: 10
     *          }
     *      },
     *      format: function(id, dataId) {
     *          // set ellipsis string when length is > 5
     *          // to get full legend value, combine with 'legend.tooltip=true'
     *          if (id.length > 5) {
     *            	id = id.substr(0, 5) + "...";
     *          }
     *
     *          return id;
     *      },
     *      tooltip: true,
     *      usePoint: true
     *  }
     */
    legend_contents_bindto: undefined,
    legend_contents_template: "<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>",
    legend_equally: false,
    legend_hide: false,
    legend_inset_anchor: "top-left",
    legend_inset_x: 10,
    legend_inset_y: 0,
    legend_inset_step: undefined,
    legend_item_interaction: true,
    legend_item_dblclick: false,
    legend_item_onclick: undefined,
    legend_item_onover: undefined,
    legend_item_onout: undefined,
    legend_item_tile_width: 10,
    legend_item_tile_height: 10,
    legend_item_tile_r: 5,
    legend_item_tile_type: "rectangle",
    legend_format: undefined,
    legend_padding: 0,
    legend_position: "bottom",
    legend_show: true,
    legend_tooltip: false,
    legend_usePoint: false
};

/**
 * main config options
 */
var main = {
    /**
     * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.<br>
     * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
     * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
     * @name bindto
     * @memberof Options
     * @property {string|HTMLElement|d3.selection|object} [bindto="#chart"] Specify the element where chart will be drawn.
     * @property {string|HTMLElement|d3.selection} bindto.element="#chart" Specify the element where chart will be drawn.
     * @property {string} [bindto.classname=bb] Specify the class name of bind element.<br>
     *     **NOTE:** When class name isn't `bb`, then you also need to update the default CSS to be rendered correctly.
     * @default #chart
     * @example
     * bindto: "#myContainer"
     *
     * // or HTMLElement
     * bindto: document.getElementById("myContainer")
     *
     * // or D3 selection object
     * bindto: d3.select("#myContainer")
     *
     * // or to change default classname
     * bindto: {
     *    element: "#chart",
     *    classname: "bill-board"  // ex) <div id='chart' class='bill-board'>
     * }
     */
    bindto: "#chart",
    /**
     * Set chart background.
     * @name background
     * @memberof Options
     * @property {object} background background object
     * @property {string} background.class Specify the class name for background element.
     * @property {string} background.color Specify the fill color for background element.<br>**NOTE:** Will be ignored if `imgUrl` option is set.
     * @property {string} background.imgUrl Specify the image url string for background.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.Background)
     * @example
     * background: {
     *    class: "myClass",
     *    color: "red",
     *
     *    // Set image url for background.
     *    // If specified, 'color' option will be ignored.
     *    imgUrl: "https://naver.github.io/billboard.js/img/logo/billboard.js.svg",
     * }
     */
    background: {},
    /**
     * Set 'clip-path' attribute for chart element
     * - **NOTE:**
     *  > When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
     *  > Is to make chart element positioned over axis element.
     * @name clipPath
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.clipPath)
     * @example
     * // don't set 'clip-path' attribute
     * clipPath: false
     */
    clipPath: true,
    /**
     * Set svg element's class name
     * @name svg
     * @memberof Options
     * @type {object}
     * @property {object} [svg] svg object
     * @property {string} [svg.classname] class name for svg element
     * @example
     * svg: {
     *   classname: "test_class"
     * }
     */
    svg_classname: undefined,
    /**
     * The desired size of the chart element.
     * If value is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
     * @name size
     * @memberof Options
     * @type {object}
     * @property {object} [size] size object
     * @property {number} [size.width] width of the chart element
     * @property {number} [size.height] height of the chart element
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.ChartSize)
     * @example
     * size: {
     *   width: 640,
     *   height: 480
     * }
     */
    size_width: undefined,
    size_height: undefined,
    /**
     * The padding of the chart element.
     * - **NOTE:** for more information, see the "[`Understanding padding`](https://github.com/naver/billboard.js/wiki/Understanding-padding)"" wiki documentaion.
     * @name padding
     * @memberof Options
     * @type {object}
     * @property {object|boolean} [padding=true] Set padding of chart, and accepts object or boolean type.
     * - `Object`: Specify each side's padding.
     * - `false`: Remove padding completely and make shape to fully occupy the container element.
     *   - In this case, axes and subchart will be hidden.
     *   - To adjust some padding from this state, use `axis.[x|y].padding` option.
     * @property {string} [padding.mode] padding mode
     * - `"fit"`: Reduce padding as much as possible to make chart fit to the container element for chart types w/axis.<br>When specified, all padding values will be relative from fitted value.
     * @property {number} [padding.top] padding on the top of chart
     * @property {number} [padding.right] padding on the right of chart
     * @property {number} [padding.bottom] padding on the bottom of chart
     * @property {number} [padding.left] padding on the left of chart
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.Padding)
     * @see [Demo: Fit padding](https://naver.github.io/billboard.js/demo/#ChartOptions.FitPadding)
     * @example
     * // remove padding completely.
     * padding: false,
     *
     * padding: {
     *   // specifying mode value, will reduce padding and make fit to the container element.
     *   mode: "fit"
     *
     *   // when mode is "fit", all padding values will be relative from fitted value.
     *   // so, 0 will be initial fitted value.
     *   top: 20,
     *   right: 20,
     *   bottom: 20,
     *   left: 20
     * }
     *
     * // or specify padding value for each side
     * padding: {
     *   top: 20,
     *   right: 20,
     *   bottom: 20,
     *   left: 20
     * }
     */
    padding: true,
    padding_mode: undefined,
    padding_left: undefined,
    padding_right: undefined,
    padding_top: undefined,
    padding_bottom: undefined,
    /**
     * Set chart resize options
     * @name resize
     * @memberof Options
     * @type {object}
     * @property {object} [resize] resize object
     * @property {boolean|string} [resize.auto=true] Set chart resize automatically on viewport changes.
     * - **NOTE:** Available options
     *   - true: Enables automatic resize.
     *   - false: Disables automatic resize.
     *   - "viewBox": Enables automatic resize, and size will be fixed based on the viewbox.
     * @property {boolean|number} [resize.timer=true] Set resize timer option.
     * - **NOTE:** Available options
     *   - The resize function will be called using:
     *     - true: `setTimeout()`
     *     - false: `requestIdleCallback()`
     *   - Given number(delay in ms) value, resize function will be triggered using `setTimeout()` with given delay.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.resizeViewBox)
     * @example
     *  resize: {
     *      auto: false,
     *
     *      // set resize based on viewBox value
     *      auto: "viewBox",
     *
     *      // set resize function will be triggered using `setTimeout()`
     *      timer: true,
     *
     *      // set resize function will be triggered using `requestIdleCallback()`
     *      timer: false,
     *
     *      // set resize function will be triggered using `setTimeout()` with a delay of `100ms`.
     *      timer: 100
     *  }
     */
    resize_auto: true,
    resize_timer: true,
    /**
     * Set a callback to execute when the chart is clicked.
     * @name onclick
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onclick: function(event) {
     *   this; // chart instance itself
     *   event; // native event object
     *   ...
     * }
     */
    onclick: undefined,
    /**
     * Set a callback to execute when mouse/touch enters the chart.
     * @name onover
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onover: function(event) {
     *   this; // chart instance itself
     *   event; // native event object
     *   ...
     * }
     */
    onover: undefined,
    /**
     * Set a callback to execute when mouse/touch leaves the chart.
     * @name onout
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onout: function(event) {
     *   this; // chart instance itself
     *   event; // native event object
     *   ...
     * }
     */
    onout: undefined,
    /**
     * Set a callback to execute when user resizes the screen.
     * @name onresize
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onresize: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    onresize: undefined,
    /**
     * Set a callback to execute when screen resize finished.
     * @name onresized
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onresized: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    onresized: undefined,
    /**
     * Set a callback to execute before the chart is initialized
     * @name onbeforeinit
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onbeforeinit: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    onbeforeinit: undefined,
    /**
     * Set a callback to execute when the chart is initialized.
     * @name oninit
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * oninit: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    oninit: undefined,
    /**
     * Set a callback to execute after the chart is initialized
     * @name onafterinit
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onafterinit: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    onafterinit: undefined,
    /**
     * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
     * @name onrendered
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * onrendered: function() {
     *   this; // chart instance itself
     *   ...
     * }
     */
    onrendered: undefined,
    /**
     * Set duration of transition (in milliseconds) for chart animation.<br><br>
     * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
     * @name transition
     * @memberof Options
     * @type {object}
     * @property {object} [transition] transition object
     * @property {number} [transition.duration=350] duration in milliseconds
     * @example
     * transition: {
     *    duration: 500
     * }
     */
    transition_duration: 250,
    /**
     * Set plugins
     * @name plugins
     * @memberof Options
     * @type {Array}
     * @example
     *  plugins: [
     *    new bb.plugin.stanford({ ... }),
     *    new PluginA(),
     *    ...
     * ]
     */
    plugins: [],
    /**
     * Control the render timing
     * @name render
     * @memberof Options
     * @type {object}
     * @property {object} [render] render object
     * @property {boolean} [render.lazy=true] Make to not render at initialization.
     * - **NOTE**:
     *   - Enabled by default when bind element's visibility is hidden.
     *   - When set to `false`, will initialize the chart regardless the bind element's visibility state, but in this case chart can't be guaranteed to be rendered properly.
     * @property {boolean} [render.observe=true] Observe bind element's visibility(`display` or `visiblity` inline css property or class value) & render when is visible automatically (for IEs, only works IE11+). When set to **false**, call [`.flush()`](./Chart.html#flush) to render.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.LazyRender)
     * @example
     *  render: {
     *    lazy: true,
     *    observe: true
     * }
     *
     * @example
     * 	// <!-- render.lazy will detect visibility defined -->
     *  // (a) <div id='chart' class='hide'></div>
     *  // (b) <div id='chart' style='display:none'></div>
     *
     *  // render.lazy enabled by default when element is hidden
     *  var chart = bb.generate({ ... });
     *
     *  // chart will be rendered automatically when element's visibility changes
     *  // Note: works only for inlined css property or class attribute changes
     *  document.getElementById('chart').classList.remove('hide')  // (a)
     *  document.getElementById('chart').style.display = 'block';  // (b)
     *
     * @example
     * 	// chart won't be rendered and not observing bind element's visiblity changes
     *  var chart = bb.generate({
     *     render: {
     *          lazy: true,
     *          observe: false
     *     }
     *  });
     *
     *  // call at any point when you want to render
     *  chart.flush();
     */
    render: {},
    /**
     * Show rectangles inside the chart.<br><br>
     * This option accepts array including object that has axis, start, end and class.
     * The keys start, end and class are optional.
     * axis must be x, y or y2. start and end should be the value where regions start and end.
     * If not specified, the edge values will be used.
     * If timeseries x axis, date string, Date object and unixtime integer can be used.
     * If class is set, the region element will have it as class.
     * @name regions
     * @memberof Options
     * @type {Array}
     * @default []
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Region.RegionLabel)
     * @example
     *  regions: [
     *    {
     *      axis: "x",
     *      start: 1,
     *      end: 4,
     *      class: "region-1-4",
     *      label: {
     *      	text: "Region Text",
     *      	x: 5,  // position relative of the initial x coordinate
     *      	y: 5,  // position relative of the initial y coordinate
     *      	color: "red",  // color string
     *      	rotated: true  // make text to show in vertical or horizontal
     *      }
     *    }
     *  ]
     */
    regions: []
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * title config options
 */
var title$1 = {
    /**
     * Set title options
     * @name title
     * @memberof Options
     * @type {object}
     * @property {object} title Title object
     * @property {string} [title.text] Title text. If contains `\n`, it's used as line break allowing multiline title.
     * @property {number} [title.padding.top=0] Top padding value.
     * @property {number} [title.padding.right=0] Right padding value.
     * @property {number} [title.padding.bottom=0] Bottom padding value.
     * @property {number} [title.padding.left=0] Left padding value.
     * @property {string} [title.position=center] Available values are: 'center', 'right' and 'left'.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Title.MultilinedTitle)
     * @example
     *  title: {
     *      text: "Title Text",
     *
     *      // or Multiline title text
     *      text: "Main title text\nSub title text",
     *
     *      padding: {
     *          top: 10,
     *          right: 10,
     *          bottom: 10,
     *          left: 10
     *      },
     *      position: "center"
     *  }
     */
    title_text: undefined,
    title_padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    title_position: "center"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * tooltip config options
 */
var tooltip$2 = {
    /**
     * Tooltip options
     * @name tooltip
     * @memberof Options
     * @type {object}
     * @property {object} tooltip Tooltip object
     * @property {boolean} [tooltip.show=true] Show or hide tooltip.
     * @property {boolean} [tooltip.doNotHide=false] Make tooltip keep showing not hiding on interaction.
     * @property {boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
     *   - **NOTE:** The overlapped data points will be displayed as grouped even if set false.
     * @property {boolean} [tooltip.linked=false] Set if tooltips on all visible charts with like x points are shown together when one is shown.
     * @property {string} [tooltip.linked.name=""] Groping name for linked tooltip.<br>If specified, linked tooltip will be groped interacting to be worked only with the same name.
     * @property {Function} [tooltip.format.title] Set format for the title of tooltip.<br>
     *  Specified function receives x of the data point to show.
     * @property {Function} [tooltip.format.name] Set format for the name of each data in tooltip.<br>
     *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
     * @property {Function} [tooltip.format.value] Set format for the value of each data value in tooltip. If undefined returned, the row of that value will be skipped to be called.
     *  - Will pass following arguments to the given function:
     *    - `value {string}`: Value of the data point. If data row contains multiple or ranged(ex. candlestick, area range, etc.) value, formatter will be called as value length.
     *    - `ratio {number}`: Ratio of the data point in the `pie/donut/gauge` and `area/bar` when contains grouped data. Otherwise is `undefined`.
     *    - `id {string}`: id of the data point
     *    - `index {number}`: Index of the data point
     * @property {Function} [tooltip.position] Set custom position function for the tooltip.<br>
     *  This option can be used to modify the tooltip position by returning object that has top and left.
     *  - Will pass following arguments to the given function:
     *    - `data {Array}`: Current selected data array object.
     *    - `width {number}`: Width of tooltip.
     *    - `height {number}`: Height of tooltip.
     *    - `element {SVGElement}`: Tooltip event bound element
     *    - `pos {object}`: Current position of the tooltip.
     * @property {Function|object} [tooltip.contents] Set custom HTML for the tooltip.<br>
     *  If tooltip.grouped is true, data includes multiple data points.<br><br>
     *  Specified function receives `data` array and `defaultTitleFormat`, `defaultValueFormat` and `color` functions of the data point to show.
     *  - **Note:**
     *    - defaultTitleFormat:
     *      - if `axis.x.tick.format` option will be used if set.
     *      - otherwise, will return function based on tick format type(category, timeseries).
     *    - defaultValueFormat:
     * 	    - for Arc type (except gauge, radar), the function will return value from `(ratio * 100).toFixed(1)`.
     * 	    - for Axis based types, will be used `axis.[y|y2].tick.format` option value if is set.
     * 	    - otherwise, will parse value and return as number.
     * @property {string|HTMLElement} [tooltip.contents.bindto=undefined] Set CSS selector or element reference to bind tooltip.
     *  - **NOTE:** When is specified, will not be updating tooltip's position.
     * @property {string} [tooltip.contents.template=undefined] Set tooltip's template.<br><br>
     *  Within template, below syntax will be replaced using template-like syntax string:
     *    - **{{ ... }}**: the doubly curly brackets indicate loop block for data rows.
     *    - **{=CLASS_TOOLTIP}**: default tooltip class name `bb-tooltip`.
     *    - **{=CLASS_TOOLTIP_NAME}**: default tooltip data class name (ex. `bb-tooltip-name-data1`)
     *    - **{=TITLE}**: title value.
     *    - **{=COLOR}**: data color.
     *    - **{=NAME}**: data id value.
     *    - **{=VALUE}**: data value.
     * @property {object} [tooltip.contents.text=undefined] Set additional text content within data loop, using template syntax.
     *  - **NOTE:** It should contain `{ key: Array, ... }` value
     *    - 'key' name is used as substitution within template as '{=KEY}'
     *    - The value array length should match with the data length
     * @property {boolean} [tooltip.init.show=false] Show tooltip at the initialization.
     * @property {number} [tooltip.init.x=0] Set x Axis index(or index for Arc(donut, gauge, pie) types) to be shown at the initialization.
     * @property {object} [tooltip.init.position] Set the position of tooltip at the initialization.
     * @property {Function} [tooltip.onshow] Set a callback that will be invoked before the tooltip is shown.
     * @property {Function} [tooltip.onhide] Set a callback that will be invoked before the tooltip is hidden.
     * @property {Function} [tooltip.onshown] Set a callback that will be invoked after the tooltip is shown
     * @property {Function} [tooltip.onhidden] Set a callback that will be invoked after the tooltip is hidden.
     * @property {string|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
     *  **Available Values:**
     *  - `desc`: In descending data value order
     *  - `asc`: In ascending data value order
     *  - `null`: It keeps the data display order<br>
     *     **NOTE:** When `data.groups` is set, the order will follow as the stacked graph order.<br>
     *      If want to order as data bound, set any value rather than asc, desc or null. (ex. empty string "")
     *  - `function(data1, data2) { ... }`: [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
     * @see [Demo: Hide Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.HideTooltip)
     * @see [Demo: Tooltip Grouping](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipGrouping)
     * @see [Demo: Tooltip Format](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipFormat)
     * @see [Demo: Linked Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.LinkedTooltips)
     * @see [Demo: Tooltip Position](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipPosition)
     * @see [Demo: Tooltip Template](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipTemplate)
     * @example
     *  tooltip: {
     *      show: true,
     *      doNotHide: true,
     *      grouped: false,
     *      format: {
     *          title: function(x) { return "Data " + x; },
     *          name: function(name, ratio, id, index) { return name; },
     *
     *          // If data row contains multiple or ranged(ex. candlestick, area range, etc.) value,
     *          // formatter will be called as value length times.
     *          value: function(value, ratio, id, index) { return ratio; }
     *      },
     *      position: function(data, width, height, element, pos) {
     *          // data: [{x, index, id, name, value}, ...]
     *          // width: Tooltip width
     *          // height: Tooltip height
     *          // element: Tooltip event bound element
     *          // pos: {
     *          //   x: Current mouse event x position,
     *          //   y: Current mouse event y position,
     *          //   xAxis: Current x Axis position (the value is given for axis based chart type only)
     *          //   yAxis: Current y Axis position value or function(the value is given for axis based chart type only)
     *          // }
     *
     *          // yAxis will work differently per data lenghts
     *          // - a) Single data: `yAxis` will return `number` value
     *          // - b) Multiple data: `yAxis` will return a function with property value
     *
     *          // a) Single data:
     *          // Get y coordinate
     *          pos.yAxis; // y axis coordinate value of current data point
     *
     *          // b) Multiple data:
     *          // Get y coordinate of value 500, where 'data1' scales(y or y2).
     *          // When 'data.axes' option is used, data can bound to different axes.
     *          // - when "data.axes={data1: 'y'}", wil return y value from y axis scale.
     *          // - when "data.axes={data1: 'y2'}", wil return y value from y2 axis scale.
     *          pos.yAxis(500, "data1"); // will return y coordinate value of data1
     *
     *          pos.yAxis(500); // get y coordinate with value of 500, using y axis scale
     *          pos.yAxis(500, null, "y2"); // get y coordinate with value of 500, using y2 axis scale
     *
     *          return {
     *            top: 0,
     *            left: 0
     *          }
     *      },
     *
     *      contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
     *          return ... // formatted html as you want
     *      },
     *
     *       // specify tooltip contents using template
     *       // - example of HTML returned:
     *       // <ul class="bb-tooltip">
     *       //   <li class="bb-tooltip-name-data1"><span>250</span><br><span style="color:#00c73c">data1</span></li>
     *       //   <li class="bb-tooltip-name-data2"><span>50</span><br><span style="color:#fa7171">data2</span></li>
     *       // </ul>
     *       contents: {
     *      	bindto: "#tooltip",
     *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
     *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span><br>' +
     *      			'<span style=color:{=COLOR}>{=NAME}</span></li>' +
     *      		'}}</ul>'
     *      }
     *
     *       // with additional text value
     *       // - example of HTML returned:
     *       // <ul class="bb-tooltip">
     *       //   <li class="bb-tooltip-name-data1"><span>250</span><br>comment1<span style="color:#00c73c">data1</span>text1</li>
     *       //   <li class="bb-tooltip-name-data2"><span>50</span><br>comment2<span style="color:#fa7171">data2</span>text2</li>
     *       // </ul>
     *       contents: {
     *      	bindto: "#tooltip",
     *      	text: {
     *      		// a) 'key' name is used as substitution within template as '{=KEY}'
     *      		// b) the length should match with the data length
     *      		VAR1: ["text1", "text2"],
     *      		VAR2: ["comment1", "comment2"],
     *      	},
     *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
     *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span>{=VAR2}<br>' +
     *      			'<span style=color:{=COLOR}>{=NAME}</span>{=VAR1}</li>' +
     *      		'}}</ul>'
     *      }
     *
     *      // sort tooltip data value display in ascending order
     *      order: "asc",
     *
     *      // specifying sort function
     *      order: function(a, b) {
     *         // param data passed format
     *         {x: 5, value: 250, id: "data1", index: 5, name: "data1"}
     *           ...
     *      },
     *
     *      // show at the initialization
     *      init: {
     *          show: true,
     *          x: 2, // x Axis index (or index for Arc(donut, gauge, pie) types)
     *          position: {
     *              top: "150px",  // specify as number or as string with 'px' unit string
     *              left: 250  // specify as number or as string with 'px' unit string
     *          }
     *      },
     *
     *      // fires prior tooltip is shown
     *      onshow: function(selectedData) {
     *      	// current dataset selected
     *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
     *      	selectedData;
     *      },
     *
     *      // fires prior tooltip is hidden
     *      onhide: function(selectedData) {
     *      	// current dataset selected
     *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
     *      	selectedData;
     *      },
     *
     *      // fires after tooltip is shown
     *      onshown: function(selectedData) {
     *      	// current dataset selected
     *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
     *      	selectedData;
     *      },
     *
     *      // fires after tooltip is hidden
     *      onhidden: function(selectedData) {
     *      	// current dataset selected
     *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
     *      	selectedData;
     *      },
     *
     *      // Link any tooltips when multiple charts are on the screen where same x coordinates are available
     *      // Useful for timeseries correlation
     *      linked: true,
     *
     *      // Specify name to interact those with the same name only.
     *      linked: {
     *          name: "some-group"
     *      }
     *  }
     */
    tooltip_show: true,
    tooltip_doNotHide: false,
    tooltip_grouped: true,
    tooltip_format_title: undefined,
    tooltip_format_name: undefined,
    tooltip_format_value: undefined,
    tooltip_position: undefined,
    tooltip_contents: {},
    tooltip_init_show: false,
    tooltip_init_x: 0,
    tooltip_init_position: undefined,
    tooltip_linked: false,
    tooltip_linked_name: "",
    tooltip_onshow: function () { },
    tooltip_onhide: function () { },
    tooltip_onshown: function () { },
    tooltip_onhidden: function () { },
    tooltip_order: null
};

/**
 * data config options
 */
var data$2 = {
    /**
     * Specify the key of x values in the data.<br><br>
     * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data on the key will be used for category names.
     * @name data․x
     * @memberof Options
     * @type {string}
     * @default undefined
     * @example
     * data: {
     *   x: "date"
     * }
     */
    data_x: undefined,
    /**
     * Converts data id value
     * @name data․idConverter
     * @memberof Options
     * @type {Function}
     * @default function(id) { return id; }
     * @example
     * data: {
     *    idConverter: function(id) {
     *       // when id is 'data1', converts to be 'data2'
     *       // 'data2' should be given as the initial data value
     *       if (id === "data1") {
     *          return "data2";
     *       } else {
     *          return id;
     *       }
     *    }
     * }
     */
    data_idConverter: function (id) { return id; },
    /**
     * Set custom data name.
     * If a name is set to `null`, the series is omitted from the legend.
     * @name data․names
     * @memberof Options
     * @type {object}
     * @default {}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataName)
     * @example
     * data: {
     *   names: {
     *     data1: "Data Name 1",
     *     data2: "Data Name 2"
     *   }
     * }
     */
    data_names: {},
    /**
     * Set custom data class.<br><br>
     * If this option is specified, the element g for the data has an additional class that has the prefix 'bb-target-' (eg. bb-target-additional-data1-class).
     * @name data․classes
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   classes: {
     *     data1: "additional-data1-class",
     *     data2: "additional-data2-class"
     *   }
     * }
     */
    data_classes: {},
    /**
     * Set chart type at once.<br><br>
     * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.<br><br>
     * **Available Values:**
     * - area
     * - area-line-range
     * - area-spline
     * - area-spline-range
     * - area-step
     * - area-step-range
     * - bar
     * - bubble
     * - candlestick
     * - donut
     * - funnel
     * - gauge
     * - line
     * - pie
     * - polar
     * - radar
     * - scatter
     * - spline
     * - step
     * - treemap
     * @name data․type
     * @memberof Options
     * @type {string}
     * @default "line"<br>NOTE: When importing shapes by ESM, `line()` should be specified for type.
     * @example
     * data: {
     *    type: "bar"
     * }
     * @example
     * // Generate chart by importing ESM
     * // Import types to be used only, where this will make smaller bundle size.
     * import bb, {
     *   area,
     *   areaLineRange,
     *   areaSpline,
     *   areaSplineRange,
     *   areaStep,
     *   areaStepRange,
     *   bar,
     *   bubble,
     *   candlestick,
     *   donut,
     *   funnel,
     *   gauge,
     *   line,
     *   pie,
     *   polar,
     *   radar,
     *   scatter,
     *   spline,
     *   step,
     *   treemap
     * }
     *
     * bb.generate({
     *   ...,
     *   data: {
     *     type: bar()
     *   }
     * });
     */
    data_type: undefined,
    /**
     * Set chart type for each data.<br>
     * This setting overwrites data.type setting.
     * - **NOTE:** `radar` and `treemap` type can't be combined with other types.
     * @name data․types
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   types: {
     *     data1: "bar",
     *     data2: "spline"
     *   }
     * }
     * @example
     * // Generate chart by importing ESM
     * // Import types to be used only, where this will make smaller bundle size.
     * import bb, {
     *   area,
     *   areaLineRange,
     *   areaSpline,
     *   areaSplineRange,
     *   areaStep,
     *   areaStepRange,
     *   bar,
     *   bubble,
     *   candlestick,
     *   donut,
     *   funnel,
     *   gauge,
     *   line,
     *   pie,
     *   polar,
     *   radar,
     *   scatter,
     *   spline,
     *   step,
     *   treemap
     * }
     *
     * bb.generate({
     *   ...,
     *   data: {
     *     types: {
     *       data1: bar(),
     *       data1: spline()
     *     }
     *   }
     * });
     */
    data_types: {},
    /**
     *  This option changes the order of stacking data and pieces of pie/donut.
     *  - If `null` specified, it will be the order the data loaded.
     *  - If function specified, it will be used as [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)<br><br>
     *
     *  **Available Values:**
     *  - `desc`: In descending order
     *  - `asc`: In ascending order
     *  - `null`: It keeps the data load order
     *  - `function(data1, data2) { ... }`: Array.sort compareFunction
     *
     *  **NOTE**: order function, only works for Axis based types & Arc types, except `Radar` type.
     * @name data․order
     * @memberof Options
     * @type {string|Function|null}
     * @default desc
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataOrder)
     * @example
     * data: {
     *   // in descending order (default)
     *   order: "desc"
     *
     *   // in ascending order
     *   order: "asc"
     *
     *   // keeps data input order
     *   order: null
     *
     *   // specifying sort function
     *   order: function(a, b) {
     *       // param data passed format
     *       // {
     *       //   id: "data1", id_org: "data1", values: [
     *       //      {x: 5, value: 250, id: "data1", index: 5, name: "data1"},
     *       //       ...
     *       //   ]
     *       // }
     *
     *       const reducer = (p, c) => p + Math.abs(c.value);
     *       const aSum = a.values.reduce(reducer, 0);
     *       const bSum = b.values.reduce(reducer, 0);
     *
     *       // ascending order
     *       return aSum - bSum;
     *
     *       // descending order
     *       // return bSum - aSum;
     *   }
     * }
     */
    data_order: "desc",
    /**
     * Set groups for the data for stacking.
     * @name data․groups
     * @memberof Options
     * @type {Array}
     * @default []
     * @example
     * data: {
     *   groups: [
     *     ["data1", "data2"],
     *     ["data3"]
     *   ]
     * }
     */
    data_groups: [],
    /**
     * Set how zero value will be treated on groups.<br>
     * Possible values:
     * - `zero`: 0 will be positioned at absolute axis zero point.
     * - `positive`: 0 will be positioned at the top of a stack.
     * - `negative`: 0 will be positioned at the bottom of a stack.
     * @name data․groupsZeroAs
     * @memberof Options
     * @type {string}
     * @default "positive"
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.Groups)
     * @example
     * data: {
     *   groupsZeroAs: "zero" // "positive" or "negative"
     * }
     */
    data_groupsZeroAs: "positive",
    /**
     * Set color converter function.<br><br>
     * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc. And it must return a string that represents color (e.g. '#00ff00').
     * @name data․color
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataColor)
     * @example
     * data: {
     *   color: function(color, d) { ... }
     * }
     */
    data_color: undefined,
    /**
     * Set color for each data.
     * @name data․colors
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   colors: {
     *     data1: "#ff0000",
     *     data2: function(d) {
     *        return "#000";
     *     }
     *     ...
     *   }
     * }
     */
    data_colors: {},
    /**
     * Set labels options
     * @name data․labels
     * @memberof Options
     * @type {object}
     * @property {object} data Data object
     * @property {boolean} [data.labels=false] Show or hide labels on each data points
     * @property {boolean} [data.labels.centered=false] Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
     * @property {Function} [data.labels.format] Set formatter function for data labels.<br>
     * The formatter function receives 4 arguments such as `v, id, i, texts` and it **must return a string** (`\n` character will be used as line break) that will be shown as the label.<br><br>
     * The arguments are:<br>
     *  - `v` is the value of the data point where the label is shown.
     *  - `id` is the id of the data where the label is shown.
     *  - `i` is the index of the data series point where the label is shown.
     *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
     * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
     * @property {string|object} [data.labels.backgroundColors] Set label text background colors.
     * @property {string|object|Function} [data.labels.colors] Set label text colors.
     * @property {object|Function} [data.labels.position] Set each dataset position, relative the original.<br><br>
     * When function is specified, will receives 5 arguments such as `type, v, id, i, texts` and it must return a position number.<br><br>
     * The arguments are:<br>
     *  - `type` coordinate type string, which will be 'x' or 'y'.
     *  - `v` is the value of the data point where the label is shown.
     *  - `id` is the id of the data where the label is shown.
     *  - `i` is the index of the data series point where the label is shown.
     *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
     * @property {number} [data.labels.position.x=0] x coordinate position, relative the original.
     * @property {number} [data.labels.position.y=0] y coordinate position, relative the original.
     * @property {object} [data.labels.rotate] Rotate label text. Specify degree value in a range of `0 ~ 360`.
     * - **NOTE:** Depend on rotate value, text position need to be adjusted manually(using `data.labels.position` option) to be shown nicely.
     * @memberof Options
     * @type {object}
     * @default {}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
     * @see [Demo: label colors](https://naver.github.io/billboard.js/demo/#Data.DataLabelColors)
     * @see [Demo: label format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
     * @see [Demo: label multiline](https://naver.github.io/billboard.js/demo/#Data.DataLabelMultiline)
     * @see [Demo: label overlap](https://naver.github.io/billboard.js/demo/#Data.DataLabelOverlap)
     * @see [Demo: label position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
     * @see [Demo: label rotate](https://naver.github.io/billboard.js/demo/#Data.DataLabelRotate)
     * @example
     * data: {
     *   labels: true,
     *
     *   // or set specific options
     *   labels: {
     *     format: function(v, id, i, texts) {
     *         ...
     *         // to multiline, return with '\n' character
     *         return "Line1\nLine2";
     *     },
     *
     *     // it's possible to set for each data
     *     format: {
     *         data1: function(v, id, i, texts) { ... },
     *         ...
     *     },
     *
     *     // align text to center of the 'bar' shape (works only for 'bar' type)
     *     centered: true,
     *
     *     // apply backgound color for label texts
     *     backgroundColors: "red",
     *
     *     // set differenct backround colors per dataset
     *     backgroundColors: {
     *          data1: "green",
     *          data2: "yellow"
     *     }
     *
     *     // apply for all label texts
     *     colors: "red",
     *
     *     // set different colors per dataset
     *     // for not specified dataset, will have the default color value
     *     colors: {
     *        data1: "yellow",
     *        data3: "green"
     *     },
     *
     *     // call back for label text color
     *     colors: function(color, d) {
     *         // color: the default data label color string
     *         // data: ex) {x: 0, value: 200, id: "data3", index: 0}
     *         ....
     *         return d.value > 200 ? "cyan" : color;
     *     },
     *
     *     // return x, y coordinate position
     *     // apt to handle each text position manually
     *     position: function(type, v, id, i, texts) {
     *         ...
     *         return type == "x" ? 10 : 20;
     *     },
     *
     *     // set x, y coordinate position
     *     position: {
     *        x: -10,
     *        y: 10
     *     },
     *
     *     // or set x, y coordinate position by each dataset
     *     position: {
     *        data1: {x: 5, y: 5},
     *        data2: {x: 10, y: -20}
     *     },
     *
     * 	   // rotate degree for label text
     *     rotate: 90
     *   }
     * }
     */
    data_labels: {},
    data_labels_backgroundColors: undefined,
    data_labels_colors: undefined,
    data_labels_position: {},
    /**
     * Hide each data when the chart appears.<br><br>
     * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
     * @name data․hide
     * @memberof Options
     * @type {boolean|Array}
     * @default false
     * @example
     * data: {
     *   // all of data will be hidden
     *   hide: true
     *
     *   // specified data will be hidden
     *   hide: ["data1", ...]
     * }
     */
    data_hide: false,
    /**
     * Filter values to be shown
     * The data value is the same as the returned by `.data()`.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @name data․filter
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * data: {
     *   // filter for id value
     *   filter: function(v) {
     *      // v: [{id: "data1", id_org: "data1", values: [
     *      //      {x: 0, value: 130, id: "data2", index: 0}, ...]
     *      //    }, ...]
     *      return v.id !== "data1";
     *   }
     */
    data_filter: undefined,
    /**
     * Set a callback for click event on each data point.<br><br>
     * This callback will be called when each data point clicked and will receive `d` and element as the arguments.
     * - `d` is the data clicked and element is the element clicked.
     * - `element` is the current interacting svg element.
     * - In this callback, `this` will be the Chart object.
     * @name data․onclick
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onclick: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
     *        // element - <circle>
     *        ...
     *     }
     * }
     */
    data_onclick: function () { },
    /**
     * Set a callback for mouse/touch over event on each data point.<br><br>
     * This callback will be called when mouse cursor or via touch moves onto each data point and will receive `d` and `element` as the argument.
     * - `d` is the data where mouse cursor moves onto.
     * - `element` is the current interacting svg element.
     * - In this callback, `this` will be the Chart object.
     * @name data․onover
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onover: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
     *        // element - <circle>
     *        ...
     *     }
     * }
     */
    data_onover: function () { },
    /**
     * Set a callback for mouse/touch out event on each data point.<br><br>
     * This callback will be called when mouse cursor or via touch moves out each data point and will receive `d` as the argument.
     * - `d` is the data where mouse cursor moves out.
     * - `element` is the current interacting svg element.
     * - In this callback, `this` will be the Chart object.
     * @name data․onout
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onout: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
     *        // element - <circle>
     *        ...
     *     }
     * }
     */
    data_onout: function () { },
    /**
     * Set a callback for when data is shown.<br>
     * The callback will receive shown data ids in array.
     * @name data․onshown
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     *  data: {
     *    onshown: function(ids) {
     *      // ids - ["data1", "data2", ...]
     *      ...
     *    }
     *  }
     */
    data_onshown: undefined,
    /**
     * Set a callback for when data is hidden.<br>
     * The callback will receive hidden data ids in array.
     * @name data․onhidden
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     *  data: {
     *    onhidden: function(ids) {
     *      // ids - ["data1", "data2", ...]
     *      ...
     *    }
     *  }
     */
    data_onhidden: undefined,
    /**
     * Set a callback for minimum data
     * - **NOTE:** For 'area-line-range', 'area-step-range' and 'area-spline-range', `mid` data will be taken for the comparison
     * @name data․onmin
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
     * @example
     *  onmin: function(data) {
     *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
     *    ...
     *  }
     */
    data_onmin: undefined,
    /**
     * Set a callback for maximum data
     * - **NOTE:** For 'area-line-range', 'area-step-range' and 'area-spline-range', `mid` data will be taken for the comparison
     * @name data․onmax
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
     * @example
     *  onmax: function(data) {
     *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
     *    ...
     *  }
     */
    data_onmax: undefined,
    /**
     * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
     * @name data․url
     * @memberof Options
     * @type {string}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.LoadData)
     * @example
     * data: {
     *     url: "/data/test.csv"
     * }
     */
    data_url: undefined,
    /**
     * XHR header value
     * - **NOTE:** Should be used with `data.url` option
     * @name data․headers
     * @memberof Options
     * @type {string}
     * @default undefined
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
     * @example
     * data: {
     *     url: "/data/test.csv",
     *     headers: {
     *        "Content-Type": "text/xml",
     *        ...
     *     }
     * }
     */
    data_headers: undefined,
    /**
     * Parse a JSON object for data. See also data.keys.
     * @name data․json
     * @memberof Options
     * @type {Array}
     * @default undefined
     * @see [data․keys](#.data%25E2%2580%25A4keys)
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.JSONData)
     * @example
     * data: {
     *     json: [
     *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
     *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
     *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
     *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
     *     ],
     *     keys: {
     *       // case 1: specify 'x' key for category axis
     *       x: "name", // 'name' key will be used as category x axis values
     *       value: ["upload", "download"]
     *
     *       // case 2: without 'x' key for non-category axis
     *       value: ["upload", "download"]
     *     }
     * }
     */
    data_json: undefined,
    /**
     * Load data from a multidimensional array, with the first element containing the data names, the following containing related data in that order.
     * @name data․rows
     * @memberof Options
     * @type {Array}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.RowOrientedData)
     * @example
     * data: {
     *   rows: [
     *     ["A", "B", "C"],
     *     [90, 120, 300],
     *     [40, 160, 240],
     *     [50, 200, 290],
     *     [120, 160, 230],
     *     [80, 130, 300],
     *     [90, 220, 320]
     *   ]
     * }
     *
     * // for 'bar' type, data can contain:
     * // - an array of [start, end] data following the order
     * data: {
     *   rows: [
     *      ["data1", "data2"],
     *      [[100, 150], 120],
     *      [[200, 300], 55],
     *      [[-400, 500], 60]
     *   ],
     *   type: "bar"
     * }
     *
     * // for 'range' types('area-line-range' or 'area-step-range' or 'area-spline-range'), data should contain:
     * // - an array of [high, mid, low] data following the order
     * // - or an object with 'high', 'mid' and 'low' key value
     * data: {
     *   rows: [
     *      ["data1", "data2"],
     *      [
     *        // or {high:150, mid: 140, low: 110}, 120
     *        [150, 140, 110], 120
     *      ],
     *      [[155, 130, 115], 55],
     *      [[160, 135, 120], 60]
     *   ],
     *   types: {
     *       data1: "area-line-range",
     *       data2: "line"
     *   }
     * }
     *
     * // for 'bubble' type, data can contain dimension value:
     * // - an array of [y, z] data following the order
     * // - or an object with 'y' and 'z' key value
     * // 'y' is for y axis coordination and 'z' is the bubble radius value
     * data: {
     *   rows: [
     *      ["data1", "data2"],
     *      [
     *        // or {y:10, z: 140}, 120
     *        [10, 140], 120
     *      ],
     *      [[100, 30], 55],
     *      [[50, 100], 60]
     *   ],
     *   types: {
     *       data1: "bubble",
     *       data2: "line"
     *   }
     * }
     *
     * // for 'canlestick' type, data should contain:
     * // - an array of [open, high, low, close, volume(optional)] data following the order
     * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
     * data: {
     *   rows: [
     *      ["data1", "data2"],
     * 		[
     * 			// open, high, low, close, volume (optional)
     * 			{open: 1300, high: 1369, low: 1200, close: 1339, volume: 100},
     * 			[1000, 1100, 850, 870]
     * 		],
     * 		[
     * 			{open: 1348, high: 1371, low: 1271, close: 1320},
     * 			[870, 1250, 830, 1200, 50]
     * 		]
     *   ],
     *   type: "candlestick"
     * }
     */
    data_rows: undefined,
    /**
     * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
     * @name data․columns
     * @memberof Options
     * @type {Array}
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.ColumnOrientedData)
     * @example
     * data: {
     *   columns: [
     *      ["data1", 30, 20, 50, 40, 60, 50],
     *      ["data2", 200, 130, 90, 240, 130, 220],
     *      ["data3", 300, 200, 160, 400, 250, 250]
     *   ]
     * }
     *
     * // for 'bar' type, data can contain:
     * // - an array of [start, end] data following the order
     * data: {
     *   columns: [
     *     ["data1", -100, 50, [100, 200], [200, 300]],
     *     ["data2", -200, 300, [-100, 100], [-50, -30]],
     *   ],
     *   type: "bar"
     * }
     *
     * // for 'range' types('area-line-range' or 'area-step-range' or 'area-spline-range'), data should contain:
     * // - an array of [high, mid, low] data following the order
     * // - or an object with 'high', 'mid' and 'low' key value
     * data: {
     *   columns: [
     *      ["data1",
     *          [150, 140, 110],  // or {high:150, mid: 140, low: 110}
     *          [150, 140, 110],
     *          [150, 140, 110]
     *      ]
     *   ],
     *   type: "area-line-range"
     * }
     *
     * // for 'bubble' type, data can contain dimension value:
     * // - an array of [y, z] data following the order
     * // - or an object with 'y' and 'z' key value
     * // 'y' is for y axis coordination and 'z' is the bubble radius value
     * data: {
     *   columns: [
     *      ["data1",
     *          [10, 140],  // or {y:10, z: 140}
     *          [100, 30],
     *          [50, 100]
     *      ]
     *   ],
     *   type: "bubble"
     * }
     *
     * // for 'canlestick' type, data should contain:
     * // - an array of [open, high, low, close, volume(optional)] data following the order
     * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
     * data: {
     *   columns: [
     *      ["data1",
     *          [1000, 1100, 850, 870, 100],  // or {open:1000, high: 1100, low: 870, volume: 100}
     *          [870, 1250, 830, 1200]  // 'volume' can be omitted
     *      ]
     *   ],
     *   type: "candlestick"
     * }
     */
    data_columns: undefined,
    /**
     * Used if loading JSON via data.url.
     * - **Available Values:**
     *   - json
     *   - csv
     *   - tsv
     * @name data․mimeType
     * @memberof Options
     * @type {string}
     * @default csv
     * @example
     * data: {
     *     mimeType: "json"
     * }
     */
    data_mimeType: "csv",
    /**
     * Choose which JSON object keys correspond to desired data.
     * - **NOTE:** Only for JSON object given as array.
     * @name data․keys
     * @memberof Options
     * @type {string}
     * @default undefined
     * @example
     * data: {
     *     json: [
     *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
     *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
     *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
     *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
     *     ],
     *     keys: {
     *       // case 1: specify 'x' key for category axis
     *       x: "name", // 'name' key will be used as category x axis values
     *       value: ["upload", "download"]
     *
     *       // case 2: without 'x' key for non-category axis
     *       value: ["upload", "download"]
     *     }
     * }
     */
    data_keys: undefined,
    /**
     * Set text label to be displayed when there's no data to show.
     * - ex. Toggling all visible data to not be shown, unloading all current data, etc.
     * @name data․empty․label․text
     * @memberof Options
     * @type {string}
     * @default ""
     * @example
     * data: {
     *   empty: {
     *     label: {
     *       text: "No Data"
     *     }
     *   }
     * }
     */
    data_empty_label_text: ""
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * interaction config options
 */
var interaction$1 = {
    /**
     * Interaction options
     * @name interaction
     * @memberof Options
     * @type {object}
     * @property {object} interaction Intersection object
     * @property {boolean} [interaction.enabled=true] Indicate if the chart should have interactions.<br>
     *     If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
     * @property {boolean} [interaction.brighten=true] Make brighter for the selected area (ex. 'pie' type data selected area)
     * @property {boolean} [interaction.inputType.mouse=true] enable or disable mouse interaction
     * @property {boolean} [interaction.inputType.touch=true] enable or disable  touch interaction
     * @property {boolean|number} [interaction.inputType.touch.preventDefault=false] enable or disable to call event.preventDefault on touchstart & touchmove event. It's usually used to prevent document scrolling.
     * @property {boolean} [interaction.onout=true] Enable or disable "onout" event.<br>
     * 		When is disabled, defocus(hiding tooltip, focused gridline, etc.) event won't work.
     * @see [Demo: touch.preventDefault](https://naver.github.io/billboard.js/demo/#Interaction.PreventScrollOnTouch)
     * @example
     * interaction: {
     *    enabled: false,
     *    brighten: false,
     *    inputType: {
     *        mouse: true,
     *        touch: false
     *
     *        // or declare preventDefault explicitly.
     *        // In this case touch inputType is enabled by default
     *        touch: {
     *            preventDefault: true
     *
     *            // or threshold pixel value (pixel moved from touchstart to touchmove)
     *            preventDefault: 5
     *        }
     *    },
     *
     *    // disable "onout" event
     *    onout: false
     * }
     */
    interaction_enabled: true,
    interaction_brighten: true,
    interaction_inputType_mouse: true,
    interaction_inputType_touch: {},
    interaction_onout: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */
/**
 * Get global object
 * @returns {object} window object
 * @private
 */
function getGlobal() {
    return (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object &&
        globalThis) ||
        (typeof global === "object" && global !== null && global.Object === Object && global) ||
        (typeof self === "object" && self !== null && self.Object === Object && self) ||
        Function("return this")();
}
/**
 * Get fallback object
 * @param {object} w global object
 * @returns {Array} fallback object array
 * @private
 */
function getFallback(w) {
    var hasRAF = typeof (w === null || w === void 0 ? void 0 : w.requestAnimationFrame) === "function" &&
        typeof (w === null || w === void 0 ? void 0 : w.cancelAnimationFrame) === "function";
    var hasRIC = typeof (w === null || w === void 0 ? void 0 : w.requestIdleCallback) === "function" &&
        typeof (w === null || w === void 0 ? void 0 : w.cancelIdleCallback) === "function";
    var request = function (cb) { return setTimeout(cb, 1); };
    var cancel = function (id) { return clearTimeout(id); };
    return [
        hasRAF ? w.requestAnimationFrame : request,
        hasRAF ? w.cancelAnimationFrame : cancel,
        hasRIC ? w.requestIdleCallback : request,
        hasRIC ? w.cancelIdleCallback : cancel
    ];
}
var win = getGlobal();
var doc = win === null || win === void 0 ? void 0 : win.document;
var _a = getFallback(win), requestAnimationFrame = _a[0], requestIdleCallback = _a[2];

var isValue = function (v) { return v || v === 0; };
var isFunction = function (v) { return typeof v === "function"; };
var isString = function (v) { return typeof v === "string"; };
var isNumber = function (v) { return typeof v === "number"; };
var isUndefined = function (v) { return typeof v === "undefined"; };
var isDefined = function (v) { return typeof v !== "undefined"; };
var isBoolean = function (v) { return typeof v === "boolean"; };
var ceil10 = function (v) { return Math.ceil(v / 10) * 10; };
var asHalfPixel = function (n) { return Math.ceil(n) + 0.5; };
var diffDomain = function (d) { return d[1] - d[0]; };
var isObjectType = function (v) { return typeof v === "object"; };
var isEmpty = function (o) { return (isUndefined(o) || o === null ||
    (isString(o) && o.length === 0) ||
    (isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0) ||
    (isNumber(o) && isNaN(o))); };
var notEmpty = function (o) { return !isEmpty(o); };
/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
var isArray = function (arr) { return Array.isArray(arr); };
/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
var isObject = function (obj) { return obj && !(obj === null || obj === void 0 ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj); };
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
    var found = false;
    Object.keys(dict).forEach(function (key) { return (dict[key] === value) && (found = true); });
    return found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} thisArg "this" value for fn
 * @param {*} args Arguments for fn
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */
function callFn(fn, thisArg) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var isFn = isFunction(fn);
    isFn && fn.call.apply(fn, __spreadArray([thisArg], args, false));
    return isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */
function endall(transition, cb) {
    var n = 0;
    var end = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        !--n && cb.apply.apply(cb, __spreadArray([this], args, false));
    };
    // if is transition selection
    if ("duration" in transition) {
        transition
            .each(function () { return ++n; })
            .on("end", end);
    }
    else {
        ++n;
        transition.call(end);
    }
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */
function sanitize(str) {
    return isString(str) ?
        str.replace(/<(script|img)?/ig, "&lt;").replace(/(script)?>/ig, "&gt;") :
        str;
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
    if (dy === void 0) { dy = [-1, 1]; }
    if (toMiddle === void 0) { toMiddle = false; }
    if (!node || !isString(text)) {
        return;
    }
    if (text.indexOf("\n") === -1) {
        node.text(text);
    }
    else {
        var diff = [node.text(), text].map(function (v) { return v.replace(/[\s\n]/g, ""); });
        if (diff[0] !== diff[1]) {
            var multiline = text.split("\n");
            var len_1 = toMiddle ? multiline.length - 1 : 1;
            // reset possible text
            node.html("");
            multiline.forEach(function (v, i) {
                node.append("tspan")
                    .attr("x", 0)
                    .attr("dy", "".concat(i === 0 ? dy[0] * len_1 : dy[1], "em"))
                    .text(v);
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
     */
    var _a = path.getBBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return [
        { x: x, y: y + height }, // seg0
        { x: x, y: y }, // seg1
        { x: x + width, y: y }, // seg2
        { x: x + width, y: y + height } // seg3
    ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */
function getPathBox(path) {
    var _a = path.getBoundingClientRect(), width = _a.width, height = _a.height;
    var items = getRectSegList(path);
    var x = items[0].x;
    var y = Math.min(items[0].y, items[1].y);
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
}
/**
 * Get event's current position coordinates
 * @param {object} event Event object
 * @param {SVGElement|HTMLElement} element Target element
 * @returns {Array} [x, y] Coordinates x, y array
 * @private
 */
function getPointer(event, element) {
    var _a;
    var touches = event &&
        ((_a = (event.touches || (event.sourceEvent && event.sourceEvent.touches))) === null || _a === void 0 ? void 0 : _a[0]);
    var pointer$1 = [0, 0];
    try {
        pointer$1 = pointer(touches || event, element);
    }
    catch (_b) { }
    return pointer$1.map(function (v) { return (isNaN(v) ? 0 : v); });
}
/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */
function getBrushSelection(ctx) {
    var event = ctx.event, $el = ctx.$el;
    var main = $el.subchart.main || $el.main;
    var selection;
    // check from event
    if (event && event.type === "brush") {
        selection = event.selection;
        // check from brush area selection
    }
    else if (main && (selection = main.select(".bb-brush").node())) {
        selection = brushSelection(selection);
    }
    return selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */
function getBoundingRect(node) {
    var needEvaluate = !("rect" in node) || ("rect" in node && node.hasAttribute("width") &&
        node.rect.width !== +node.getAttribute("width"));
    return needEvaluate ? (node.rect = node.getBoundingClientRect()) : node.rect;
}
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number|string}
 * @private
 */
function getRandom(asStr, min, max) {
    if (asStr === void 0) { asStr = true; }
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 10000; }
    var crpt = win.crypto || win.msCrypto;
    var rand = crpt ?
        min + crpt.getRandomValues(new Uint32Array(1))[0] % (max - min + 1) :
        Math.floor(Math.random() * (max - min) + min);
    return asStr ? String(rand) : rand;
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
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((start + end) / 2);
    var _a = arr[mid], x = _a.x, _b = _a.w, w = _b === void 0 ? 0 : _b;
    if (isRotated) {
        x = arr[mid].y;
        w = arr[mid].h;
    }
    if (v >= x && v <= x + w) {
        return mid;
    }
    return v < x ?
        findIndex(arr, v, start, mid - 1, isRotated) :
        findIndex(arr, v, mid + 1, end, isRotated);
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */
function brushEmpty(ctx) {
    var selection = getBrushSelection(ctx);
    if (selection) {
        // brush selected area
        // two-dimensional: [[x0, y0], [x1, y1]]
        // one-dimensional: [x0, x1] or [y0, y1]
        return selection[0] === selection[1];
    }
    return true;
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */
function deepClone() {
    var objectN = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objectN[_i] = arguments[_i];
    }
    var clone = function (v) {
        if (isObject(v) && v.constructor) {
            var r = new v.constructor();
            for (var k in v) {
                r[k] = clone(v[k]);
            }
            return r;
        }
        return v;
    };
    return objectN.map(function (v) { return clone(v); })
        .reduce(function (a, c) { return (__assign(__assign({}, a), c)); });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */
function extend(target, source) {
    if (target === void 0) { target = {}; }
    if (isArray(source)) {
        source.forEach(function (v) { return extend(target, v); });
    }
    // exclude name with only numbers
    for (var p in source) {
        if (/^\d+$/.test(p) || p in target) {
            continue;
        }
        target[p] = source[p];
    }
    return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */
var capitalize = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
/**
 * Camelize from kebob style string
 * @param {string} str Target string
 * @param {string} separator Separator string
 * @returns {string} camelized string
 * @private
 */
function camelize(str, separator) {
    if (separator === void 0) { separator = "-"; }
    return str.split(separator)
        .map(function (v, i) { return (i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()); })
        .join("");
}
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */
var toArray = function (v) { return [].slice.call(v); };
/**
 * Add CSS rules
 * @param {object} style Style object
 * @param {string} selector Selector string
 * @param {Array} prop Prps arrary
 * @returns {number} Newely added rule index
 * @private
 */
function addCssRules(style, selector, prop) {
    var _a = style.rootSelector, rootSelector = _a === void 0 ? "" : _a, sheet = style.sheet;
    var getSelector = function (s) {
        return s
            .replace(/\s?(bb-)/g, ".$1")
            .replace(/\.+/g, ".");
    };
    var rule = "".concat(rootSelector, " ").concat(getSelector(selector), " {").concat(prop.join(";"), "}");
    return sheet[sheet.insertRule ? "insertRule" : "addRule"](rule, sheet.cssRules.length);
}
/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
    var rules = [];
    styleSheets.forEach(function (sheet) {
        var _a;
        try {
            if (sheet.cssRules && sheet.cssRules.length) {
                rules = rules.concat(toArray(sheet.cssRules));
            }
        }
        catch (e) {
            (_a = win.console) === null || _a === void 0 ? void 0 : _a.warn("Error while reading rules from ".concat(sheet.href, ": ").concat(e.toString()));
        }
    });
    return rules;
}
/**
 * Get current window and container scroll position
 * @param {HTMLElement} node Target element
 * @returns {object} window scroll position
 * @private
 */
function getScrollPosition(node) {
    var _a, _b, _c, _d, _e, _f;
    return {
        x: ((_b = (_a = win.pageXOffset) !== null && _a !== void 0 ? _a : win.scrollX) !== null && _b !== void 0 ? _b : 0) + ((_c = node.scrollLeft) !== null && _c !== void 0 ? _c : 0),
        y: ((_e = (_d = win.pageYOffset) !== null && _d !== void 0 ? _d : win.scrollY) !== null && _e !== void 0 ? _e : 0) + ((_f = node.scrollTop) !== null && _f !== void 0 ? _f : 0)
    };
}
/**
 * Get translation string from screen <--> svg point
 * @param {SVGGraphicsElement} node graphics element
 * @param {number} x target x point
 * @param {number} y target y point
 * @param {boolean} inverse inverse flag
 * @returns {object}
 */
function getTransformCTM(node, x, y, inverse) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (inverse === void 0) { inverse = true; }
    var point = new DOMPoint(x, y);
    var screen = node.getScreenCTM();
    return point.matrixTransform(inverse ? screen === null || screen === void 0 ? void 0 : screen.inverse() : screen);
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */
function getTranslation(node) {
    var transform = node ? node.transform : null;
    var baseVal = transform && transform.baseVal;
    return baseVal && baseVal.numberOfItems ?
        baseVal.getItem(0).matrix :
        { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
}
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */
function getUnique(data) {
    var isDate = data[0] instanceof Date;
    var d = (isDate ? data.map(Number) : data)
        .filter(function (v, i, self) { return self.indexOf(v) === i; });
    return isDate ? d.map(function (v) { return new Date(v); }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */
function mergeArray(arr) {
    return arr && arr.length ? arr.reduce(function (p, c) { return p.concat(c); }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */
function mergeObj(target) {
    var objectN = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objectN[_i - 1] = arguments[_i];
    }
    if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
        return target;
    }
    var source = objectN.shift();
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var value = source[key];
            if (isObject(value)) {
                !target[key] && (target[key] = {});
                target[key] = mergeObj(target[key], value);
            }
            else {
                target[key] = isArray(value) ? value.concat() : value;
            }
        });
    }
    return mergeObj.apply(void 0, __spreadArray([target], objectN, false));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */
function sortValue(data, isAsc) {
    if (isAsc === void 0) { isAsc = true; }
    var fn;
    if (data[0] instanceof Date) {
        fn = isAsc ? function (a, b) { return a - b; } : function (a, b) { return b - a; };
    }
    else {
        if (isAsc && !data.every(isNaN)) {
            fn = function (a, b) { return a - b; };
        }
        else if (!isAsc) {
            fn = function (a, b) { return (a > b && -1) || (a < b && 1) || (a === b && 0); };
        }
    }
    return data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */
function getMinMax$1(type, data) {
    var res = data.filter(function (v) { return notEmpty(v); });
    if (res.length) {
        if (isNumber(res[0])) {
            res = Math[type].apply(Math, res);
        }
        else if (res[0] instanceof Date) {
            res = sortValue(res, type === "min")[0];
        }
    }
    else {
        res = undefined;
    }
    return res;
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
    if (step === void 0) { step = 1; }
    var res = [];
    var n = Math.max(0, Math.ceil((end - start) / step)) | 0;
    for (var i = start; i < n; i++) {
        res.push(start + i * step);
    }
    return res;
};
// emulate event
var emulateEvent = {
    mouse: (function () {
        var getParams = function () { return ({
            bubbles: false,
            cancelable: false,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0
        }); };
        try {
            // eslint-disable-next-line no-new
            new MouseEvent("t");
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                el.dispatchEvent(new MouseEvent(eventType, params));
            };
        }
        catch (_a) {
            // Polyfills DOM4 MouseEvent
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                var mouseEvent = doc.createEvent("MouseEvent");
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
                mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
                params.screenX, params.screenY, params.clientX, params.clientY, false, false, false, false, 0, null);
                el.dispatchEvent(mouseEvent);
            };
        }
    })(),
    touch: function (el, eventType, params) {
        var touchObj = new Touch(mergeObj({
            identifier: Date.now(),
            target: el,
            radiusX: 2.5,
            radiusY: 2.5,
            rotationAngle: 10,
            force: 0.5
        }, params));
        el.dispatchEvent(new TouchEvent(eventType, {
            cancelable: true,
            bubbles: true,
            shiftKey: true,
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj]
        }));
    }
};
/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
    var res = tpl;
    for (var x in data) {
        res = res.replace(new RegExp("{=".concat(x, "}"), "g"), data[x]);
    }
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
    var _a;
    var parsedDate;
    if (date instanceof Date) {
        parsedDate = date;
    }
    else if (isString(date)) {
        var _b = this, config = _b.config, format = _b.format;
        // if fails to parse, try by new Date()
        // https://github.com/naver/billboard.js/issues/1714
        parsedDate = (_a = format.dataTime(config.data_xFormat)(date)) !== null && _a !== void 0 ? _a : new Date(date);
    }
    else if (isNumber(date) && !isNaN(date)) {
        parsedDate = new Date(+date);
    }
    if (!parsedDate || isNaN(+parsedDate)) {
        console && console.error &&
            console.error("Failed to parse x '".concat(date, "' to Date object"));
    }
    return parsedDate;
}
/**
 * Check if svg element has viewBox attribute
 * @param {d3Selection} svg Target svg selection
 * @returns {boolean}
 */
function hasViewBox(svg) {
    var attr = svg.attr("viewBox");
    return attr ? /(\d+(\.\d+)?){3}/.test(attr) : false;
}
/**
 * Determine if given node has the specified style
 * @param {d3Selection|SVGElement} node Target node
 * @param {object} condition Conditional style props object
 * @param {boolean} all If true, all condition should be matched
 * @returns {boolean}
 */
function hasStyle(node, condition, all) {
    if (all === void 0) { all = false; }
    var isD3Node = !!node.node;
    var has = false;
    for (var _i = 0, _a = Object.entries(condition); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        has = isD3Node ? node.style(key) === value : node.style[key] === value;
        if (all === false && has) {
            break;
        }
    }
    return has;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */
function isTabVisible() {
    return (doc === null || doc === void 0 ? void 0 : doc.hidden) === false || (doc === null || doc === void 0 ? void 0 : doc.visibilityState) === "visible";
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */
function convertInputType(mouse, touch) {
    var DocumentTouch = win.DocumentTouch, matchMedia = win.matchMedia, navigator = win.navigator;
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer#coarse
    var hasPointerCoarse = matchMedia === null || matchMedia === void 0 ? void 0 : matchMedia("(pointer:coarse)").matches;
    var hasTouch = false;
    if (touch) {
        // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
        if (navigator && "maxTouchPoints" in navigator) {
            hasTouch = navigator.maxTouchPoints > 0;
            // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
            // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
        }
        else if ("ontouchmove" in win || (DocumentTouch && doc instanceof DocumentTouch)) {
            hasTouch = true;
        }
        else {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection
            if (hasPointerCoarse) {
                hasTouch = true;
            }
            else {
                // Only as a last resort, fall back to user agent sniffing
                var UA = navigator.userAgent;
                hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }
    }
    // For non-touch device, media feature condition is: '(pointer:coarse) = false' and '(pointer:fine) = true'
    // https://github.com/naver/billboard.js/issues/3854#issuecomment-2404183158
    var hasMouse = mouse && !hasPointerCoarse && (matchMedia === null || matchMedia === void 0 ? void 0 : matchMedia("(pointer:fine)").matches);
    // fallback to 'mouse' if no input type is detected.
    return (hasMouse && "mouse") || (hasTouch && "touch") || "mouse";
}
/**
 * Run function until given condition function return true
 * @param {Function} fn Function to be executed when condition is true
 * @param {Function} conditionFn Condition function to check if condition is true
 * @private
 */
function runUntil(fn, conditionFn) {
    if (conditionFn() === false) {
        requestAnimationFrame(function () { return runUntil(fn, conditionFn); });
    }
    else {
        fn();
    }
}

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
var Options = /** @class */ (function () {
    function Options() {
        return deepClone(main, boost, data$2, color$1, interaction$1, legend$2, title$1, tooltip$2, Options.data);
    }
    Options.setOptions = function (options) {
        this.data = options
            .reduce(function (a, c) { return (__assign(__assign({}, a), c)); }, this.data);
    };
    Options.data = {};
    return Options;
}());

/**
 * Elements class.
 * @class Elements
 * @ignore
 * @private
 */
var Element = /** @class */ (function () {
    function Element() {
        var element = {
            chart: null,
            main: null,
            svg: null,
            axis: {
                x: null,
                y: null,
                y2: null,
                subX: null
            },
            axisTooltip: {
                x: null,
                y: null,
                y2: null
            },
            defs: null,
            tooltip: null,
            legend: null,
            title: null,
            subchart: {
                main: null, // $$.context
                bar: null, // $$.contextBar
                line: null, // $$.contextLine
                area: null // $$.contextArea
            },
            arcs: null,
            bar: null, // mainBar,
            candlestick: null,
            line: null, // mainLine,
            area: null, // mainArea,
            circle: null, // mainCircle,
            radar: null,
            text: null, // mainText,
            grid: {
                main: null, // grid (also focus)
                x: null, // xgrid,
                y: null // ygrid,
            },
            gridLines: {
                main: null, // gridLines
                x: null, // xgridLines,
                y: null // ygridLines
            },
            region: {
                main: null, // region
                list: null // mainRegion
            },
            eventRect: null,
            zoomResetBtn: null // drag zoom reset button
        };
        return element;
    }
    return Element;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * State class.
 * @class State
 * @ignore
 * @private
 */
var State = /** @class */ (function () {
    function State() {
        return {
            // chart drawn area dimension, excluding axes
            width: 0,
            width2: 0,
            height: 0,
            height2: 0,
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            margin2: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            margin3: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            arcWidth: 0,
            arcHeight: 0,
            xAxisHeight: 0,
            hasAxis: false,
            hasFunnel: false,
            hasRadar: false,
            hasTreemap: false,
            // for data CSS rule index (used when boost.useCssRule is true)
            cssRule: {},
            current: {
                // current domain value. Assigned when is zoom is called
                domain: undefined,
                // chart whole dimension
                width: 0,
                height: 0,
                dataMax: 0,
                maxTickSize: {
                    x: {
                        width: 0,
                        height: 0,
                        ticks: [],
                        clipPath: 0,
                        domain: ""
                    },
                    y: { width: 0, height: 0, domain: "" },
                    y2: { width: 0, height: 0, domain: "" }
                },
                // current used chart type list
                types: [],
                needle: undefined // arc needle current value
            },
            // legend
            isLegendRight: false,
            isLegendInset: false,
            isLegendTop: false,
            isLegendLeft: false,
            legendStep: 0,
            legendItemWidth: 0,
            legendItemHeight: 0,
            legendHasRendered: false,
            eventReceiver: {
                currentIdx: -1, // current event interaction index
                rect: {}, // event rect's clientBoundingRect
                data: [], // event data bound of previoous eventRect
                coords: [] // coordination value of previous eventRect
            },
            axis: {
                x: {
                    padding: { left: 0, right: 0 },
                    tickCount: 0
                }
            },
            rotatedPadding: {
                left: 30,
                right: 0,
                top: 5
            },
            withoutFadeIn: {},
            inputType: "",
            datetimeId: "",
            // clip id string
            clip: {
                id: "",
                idXAxis: "",
                idYAxis: "",
                idXAxisTickTexts: "",
                idGrid: "",
                idSubchart: "", // clipIdForSubchart
                path: "",
                pathXAxis: "",
                pathYAxis: "",
                pathXAxisTickTexts: "",
                pathGrid: ""
            },
            // state
            event: null, // event object
            dragStart: null,
            dragging: false,
            flowing: false,
            cancelClick: false,
            mouseover: false,
            rendered: false,
            transiting: false,
            redrawing: false, // if redraw() is on process
            resizing: false, // resize event called
            toggling: false, // legend toggle
            zooming: false,
            hasNegativeValue: false,
            hasPositiveValue: true,
            orgAreaOpacity: "0.2",
            orgConfig: {}, // user original genration config
            // ID strings
            hiddenTargetIds: [],
            hiddenLegendIds: [],
            focusedTargetIds: [],
            defocusedTargetIds: [],
            // value for Arc
            radius: 0,
            innerRadius: 0,
            outerRadius: undefined,
            innerRadiusRatio: 0,
            gaugeArcWidth: 0,
            radiusExpanded: 0,
            // xgrid attribute
            xgridAttr: {
                x1: null,
                x2: null,
                y1: null,
                y2: null
            }
        };
    }
    return State;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// mapping
var classes = {
    element: Element,
    state: State
};
/**
 * Internal store class.
 * @class Store
 * @ignore
 * @private
 */
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        Object.keys(classes).forEach(function (v) {
            _this[v] = new classes[v]();
        });
    }
    Store.prototype.getStore = function (name) {
        return this[name];
    };
    return Store;
}());

/**
 * Constant for cache key
 * - NOTE: Prefixed with '$', will be resetted when .load() is called
 * @private
 */
var KEY = {
    bubbleBaseLength: "$baseLength",
    colorPattern: "__colorPattern__",
    dataMinMax: "$dataMinMax",
    dataTotalSum: "$dataTotalSum",
    dataTotalPerIndex: "$totalPerIndex",
    legendItemTextBox: "legendItemTextBox",
    radarPoints: "$radarPoints",
    radarTextWidth: "$radarTextWidth",
    setOverOut: "setOverOut",
    callOverOutForTouch: "callOverOutForTouch",
    textRect: "textRect"
};
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = {};
    }
    /**
     * Add cache
     * @param {string} key Cache key
     * @param {*} value Value to be stored
     * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
     * @returns {*} Added data value
     * @private
     */
    Cache.prototype.add = function (key, value, isDataType) {
        if (isDataType === void 0) { isDataType = false; }
        this.cache[key] = isDataType ? this.cloneTarget(value) : value;
        return this.cache[key];
    };
    /**
     * Remove cache
     * @param {string|Array} key Cache key
     * @private
     */
    Cache.prototype.remove = function (key) {
        var _this = this;
        (isString(key) ? [key] : key)
            .forEach(function (v) { return delete _this.cache[v]; });
    };
    /**
     * Get cahce
     * @param {string|Array} key Cache key
     * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
     * @returns {*}
     * @private
     */
    Cache.prototype.get = function (key, isDataType) {
        if (isDataType === void 0) { isDataType = false; }
        // when is isDataType, key should be string array
        if (isDataType && Array.isArray(key)) {
            var targets = [];
            for (var i = 0, id = void 0; (id = key[i]); i++) {
                if (id in this.cache) {
                    targets.push(this.cloneTarget(this.cache[id]));
                }
            }
            return targets;
        }
        else {
            var value = this.cache[key];
            return isValue(value) ? value : null;
        }
    };
    /**
     * Reset cached data
     * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
     * @private
     */
    Cache.prototype.reset = function (all) {
        var $$ = this;
        for (var x in $$.cache) {
            // reset the prefixed '$' key(which is internal use data) only.
            if (all || /^\$/.test(x)) {
                $$.cache[x] = null;
            }
        }
    };
    /**
     * Clone data target object
     * @param {object} target Data object
     * @returns {object}
     * @private
     */
    Cache.prototype.cloneTarget = function (target) {
        return {
            id: target.id,
            id_org: target.id_org,
            values: target.values.map(function (d) { return ({ x: d.x, value: d.value, id: d.id }); })
        };
    };
    return Cache;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Chart type constant
 * @private
 */
var TYPE = {
    AREA: "area",
    AREA_LINE_RANGE: "area-line-range",
    AREA_SPLINE: "area-spline",
    AREA_SPLINE_RANGE: "area-spline-range",
    AREA_STEP: "area-step",
    AREA_STEP_RANGE: "area-step-range",
    BAR: "bar",
    BUBBLE: "bubble",
    CANDLESTICK: "candlestick",
    DONUT: "donut",
    FUNNEL: "funnel",
    GAUGE: "gauge",
    LINE: "line",
    PIE: "pie",
    POLAR: "polar",
    RADAR: "radar",
    SCATTER: "scatter",
    SPLINE: "spline",
    STEP: "step",
    TREEMAP: "treemap"
};
/**
 * Chart type module and its method from ChartInternal class, needed to be initialized.
 * @private
 */
var TYPE_METHOD_NEEDED = {
    AREA: "initArea",
    AREA_LINE_RANGE: "initArea",
    AREA_SPLINE: "initArea",
    AREA_SPLINE_RANGE: "initArea",
    AREA_STEP: "initArea",
    AREA_STEP_RANGE: "initArea",
    BAR: "initBar",
    BUBBLE: "initCircle",
    CANDLESTICK: "initCandlestick",
    DONUT: "initArc",
    FUNNEL: "initFunnel",
    GAUGE: "initArc",
    LINE: "initLine",
    PIE: "initArc",
    POLAR: "initPolar",
    RADAR: "initCircle",
    SCATTER: "initCircle",
    SPLINE: "initLine",
    STEP: "initLine",
    TREEMAP: "initTreemap"
};
/**
 * chart types by category
 * @private
 */
var TYPE_BY_CATEGORY = {
    Area: [
        TYPE.AREA,
        TYPE.AREA_SPLINE,
        TYPE.AREA_SPLINE_RANGE,
        TYPE.AREA_LINE_RANGE,
        TYPE.AREA_STEP,
        TYPE.AREA_STEP_RANGE
    ],
    AreaRange: [
        TYPE.AREA_SPLINE_RANGE,
        TYPE.AREA_LINE_RANGE,
        TYPE.AREA_STEP_RANGE
    ],
    Arc: [
        TYPE.PIE,
        TYPE.DONUT,
        TYPE.GAUGE,
        TYPE.POLAR,
        TYPE.RADAR
    ],
    Line: [
        TYPE.LINE,
        TYPE.SPLINE,
        TYPE.AREA,
        TYPE.AREA_SPLINE,
        TYPE.AREA_SPLINE_RANGE,
        TYPE.AREA_LINE_RANGE,
        TYPE.STEP,
        TYPE.AREA_STEP,
        TYPE.AREA_STEP_RANGE
    ],
    Step: [
        TYPE.STEP,
        TYPE.AREA_STEP,
        TYPE.AREA_STEP_RANGE
    ],
    Spline: [
        TYPE.SPLINE,
        TYPE.AREA_SPLINE,
        TYPE.AREA_SPLINE_RANGE
    ]
};

/**
 * Check chart type module imports.
 * @param {ChartInternal} ctx Context
 * @private
 */
function checkModuleImport(ctx) {
    var $$ = ctx;
    var config = $$.config;
    var type = "";
    if (isEmpty(config.data_type || config.data_types) && !$$[TYPE_METHOD_NEEDED.LINE]) {
        type = "line";
    }
    else {
        for (var x in TYPE_METHOD_NEEDED) {
            var t = TYPE[x];
            if ($$.hasType(t) && !$$[TYPE_METHOD_NEEDED[x]]) {
                type = t;
                break;
            }
        }
    }
    type &&
        logError("Please, make sure if %c".concat(camelize(type)), "module has been imported and specified correctly.", "https://github.com/naver/billboard.js/wiki/CHANGELOG-v2#modularization-by-its-functionality");
}
/**
 * Log error and throw error
 * @param {string} head Message header
 * @param {string} tail Message tail
 * @param {string} info Info message
 * @private
 */
function logError(head, tail, info) {
    var _a;
    var prefix = "[billboard.js]";
    var hasConsole = (_a = win.console) === null || _a === void 0 ? void 0 : _a.error;
    if (hasConsole) {
        var tailMsg = ["background:red;color:white;display:block;font-size:15px", tail] ;
        console.error.apply(console, __spreadArray(["\u274C ".concat(prefix, " ").concat(head), "background:red;color:white;display:block;font-size:15px"], tailMsg, false));
        console.info("%cℹ️", "font-size:15px", info);
    }
    throw Error("".concat(prefix, " ").concat(head.replace(/\%c([a-z-]+)/i, "'$1' "), " ").concat(tail ));
}

var setTimeout$1 = win.setTimeout, clearTimeout$1 = win.clearTimeout;
/**
 * Generate resize queue function
 * @param {boolean|number} option Resize option
 * @returns {Fucntion}
 * @private
 */
function generateResize(option) {
    var fn = [];
    var timeout;
    var callResizeFn = function () {
        // Delay all resize functions call, to prevent unintended excessive call from resize event
        callResizeFn.clear();
        if (option === false) {
            requestIdleCallback(function () {
                fn.forEach(function (f) { return f(); });
            }, { timeout: 200 });
        }
        else {
            timeout = setTimeout$1(function () {
                fn.forEach(function (f) { return f(); });
            }, isNumber(option) ? option : 200);
        }
    };
    callResizeFn.clear = function () {
        if (timeout) {
            clearTimeout$1(timeout);
            timeout = null;
        }
    };
    callResizeFn.add = function (f) { return fn.push(f); };
    callResizeFn.remove = function (f) { return fn.splice(fn.indexOf(f), 1); };
    return callResizeFn;
}
/**
 * Generate transition queue function
 * @returns {Function}
 * @private
 */
function generateWait() {
    var transitionsToWait = [];
    // 'f' is called as selection.call(f, ...);
    var f = function (selection, callback) {
        /**
         * Check if transition is complete
         * @returns {boolean} Whether transition is complete
         * @private
         */
        function loop() {
            var _a;
            var done = 0;
            for (var i = 0, t = void 0; (t = transitionsToWait[i]); i++) {
                if (t === true || ((_a = t.empty) === null || _a === void 0 ? void 0 : _a.call(t))) {
                    done++;
                    continue;
                }
                // when tab isn't visible exit loop
                if (isTabVisible() === false) {
                    done = transitionsToWait.length;
                    break;
                }
                try {
                    t.transition();
                }
                catch (_b) {
                    done++;
                }
            }
            return done === transitionsToWait.length;
        }
        runUntil(function () {
            callback === null || callback === void 0 ? void 0 : callback();
        }, loop);
    };
    f.add = function (t) {
        isArray(t) ? (transitionsToWait = transitionsToWait.concat(t)) : transitionsToWait.push(t);
    };
    return f;
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Store blob in memory
var blob = {};
/**
 * Get Object URL
 * @param {Function} fn Function to be executed in worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {string}
 * @private
 */
function getObjectURL(fn, depsFn) {
    var _a;
    var fnString = fn.toString();
    var key = fnString.replace(/(function|[\s\W\n])/g, "").substring(0, 15);
    if (!(key in blob)) {
        // Web Worker body
        blob[key] = new win.Blob([
            "".concat((_a = depsFn === null || depsFn === void 0 ? void 0 : depsFn.map(String).join(";")) !== null && _a !== void 0 ? _a : "", "\n\n\t\t\tself.onmessage=function({data}) {\n\t\t\t\tconst result = (").concat(fnString, ").apply(null, data);\n\t\t\t\tself.postMessage(result);\n\t\t\t};")
        ], {
            type: "text/javascript"
        });
    }
    return win.URL.createObjectURL(blob[key]);
}
/**
 * Get WebWorker instance
 * @param {string} src URL object as string
 * @returns {object} WebWorker instance
 * @private
 */
function getWorker(src) {
    var worker = new win.Worker(src);
    // handle error
    worker.onerror = function (e) {
        // eslint-disable-next-line no-console
        console.error ? console.error(e) : console.log(e);
    };
    return worker;
}
/**
 * Create and run on Web Worker
 * @param {boolean} useWorker Use Web Worker
 * @param {Function} fn Function to be executed in worker
 * @param {Function} callback Callback function to receive result from worker
 * @param {Array} depsFn Dependency functions to run given function(fn).
 * @returns {object}
 * @example
 * 	const worker = runWorker(function(arg) {
 * 		  // do some tasks...
 * 		  console.log("param:", A(arg));
 *
 * 		  return 1234;
 * 	   }, function(data) {
 * 		  // callback after worker is done
 * 	 	  console.log("result:", data);
 * 	   },
 * 	   [function A(){}]
 * 	);
 *
 * 	worker(11111);
 * @private
 */
function runWorker(useWorker, fn, callback, depsFn) {
    if (useWorker === void 0) { useWorker = true; }
    var runFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var res = fn.apply(void 0, args);
        callback(res);
    };
    if (win.Worker && useWorker) {
        var src_1 = getObjectURL(fn, depsFn);
        var worker_1 = getWorker(src_1);
        runFn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // trigger worker
            worker_1.postMessage(args);
            // listen worker
            worker_1.onmessage = function (e) {
                // release object URL from memory
                win.URL.revokeObjectURL(src_1);
                return callback(e.data);
            };
            // return new Promise((resolve, reject) => {
            // 	worker.onmessage = ({data}) => resolve(data);
            // 	worker.onerror = reject;
            // });
        };
    }
    return runFn;
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
/***** Functions to be executed on Web Worker *****
 * NOTE: Don't allowed to use
 * - arrow function syntax
 * - Utils functions
 */
/**
 * Convert Columns data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function columns(columns) {
    var newRows = [];
    columns.forEach(function (col, i) {
        var key = col[0];
        col.forEach(function (v, j) {
            if (j > 0) {
                if (typeof newRows[j - 1] === "undefined") {
                    newRows[j - 1] = {};
                }
                if (typeof v === "undefined") {
                    throw new Error("Source data is missing a component at (".concat(i, ", ").concat(j, ")!"));
                }
                newRows[j - 1][key] = v;
            }
        });
    });
    return newRows;
}
/**
 * Convert Rows data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function rows(rows) {
    var keys = rows[0];
    var newRows = [];
    rows.forEach(function (row, i) {
        if (i > 0) {
            var newRow_1 = {};
            row.forEach(function (v, j) {
                if (typeof v === "undefined") {
                    throw new Error("Source data is missing a component at (".concat(i, ", ").concat(j, ")!"));
                }
                newRow_1[keys[j]] = v;
            });
            newRows.push(newRow_1);
        }
    });
    return newRows;
}
/**
 * Convert JSON data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function json(json, keysParam) {
    var newRows = [];
    var targetKeys;
    var data;
    if (Array.isArray(json)) {
        var findValueInJson_1 = function (object, path) {
            if (object[path] !== undefined) {
                return object[path];
            }
            var convertedPath = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties (replace [] with .)
            var pathArray = convertedPath.replace(/^\./, "").split("."); // strip a leading dot
            var target = object;
            pathArray.some(function (k) {
                return !(target = target && k in target ? target[k] : undefined);
            });
            return target;
        };
        if (keysParam.x) {
            targetKeys = keysParam.value.concat(keysParam.x);
        }
        else {
            targetKeys = keysParam.value;
        }
        newRows.push(targetKeys);
        json.forEach(function (o) {
            var newRow = targetKeys.map(function (key) {
                // convert undefined to null because undefined data will be removed in convertDataToTargets()
                var v = findValueInJson_1(o, key);
                if (typeof v === "undefined") {
                    v = null;
                }
                return v;
            });
            newRows.push(newRow);
        });
        data = rows(newRows);
    }
    else {
        Object.keys(json).forEach(function (key) {
            var _a;
            var tmp = json[key].concat();
            (_a = tmp.unshift) === null || _a === void 0 ? void 0 : _a.call(tmp, key);
            newRows.push(tmp);
        });
        data = columns(newRows);
    }
    return data;
}
/***** Functions can't be executed on Web Worker *****/
/**
 * Convert URL data
 * @param {string} url Remote URL
 * @param {string} mimeType MIME type string: json | csv | tsv
 * @param {object} headers Header object
 * @param {object} keys Key object
 * @param {Function} done Callback function
 * @private
 */
function url(url, mimeType, headers, keys, done) {
    if (mimeType === void 0) { mimeType = "csv"; }
    var req = new XMLHttpRequest();
    var converter = { csv: csv, tsv: tsv, json: json };
    req.open("GET", url);
    if (headers) {
        Object.keys(headers).forEach(function (key) {
            req.setRequestHeader(key, headers[key]);
        });
    }
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                var response = req.responseText;
                response && done.call(this, converter[mimeType](mimeType === "json" ? JSON.parse(response) : response, keys));
            }
            else {
                throw new Error("".concat(url, ": Something went wrong loading!"));
            }
        }
    };
    req.send();
}
/**
 * Convert CSV/TSV data
 * @param {object} parser Parser object
 * @param {object} xsv Data
 * @returns {object}
 * @private
 */
function convertCsvTsvToData(parser, xsv) {
    var rows = parser.rows(xsv);
    var d;
    if (rows.length === 1) {
        d = [{}];
        rows[0].forEach(function (id) {
            d[0][id] = null;
        });
    }
    else {
        d = parser.parse(xsv);
    }
    return d;
}
function csv(xsv) {
    return convertCsvTsvToData({
        rows: csvParseRows,
        parse: csvParse
    }, xsv);
}
function tsv(tsv) {
    return convertCsvTsvToData({
        rows: tsvParseRows,
        parse: tsvParse
    }, tsv);
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get data key for JSON
 * @param {string|object} keysParam Key params
 * @param {object} config Config object
 * @returns {string} Data key
 * @private
 */
function getDataKeyForJson(keysParam, config) {
    var keys = keysParam || (config === null || config === void 0 ? void 0 : config.data_keys);
    if (keys === null || keys === void 0 ? void 0 : keys.x) {
        config.data_x = keys.x;
    }
    return keys;
}
/**
 * Data convert
 * @memberof ChartInternal
 * @private
 */
var dataConvert = {
    /**
     * Convert data according its type
     * @param {object} args data object
     * @param {Function} [callback] callback for url(XHR) type loading
     * @private
     */
    convertData: function (args, callback) {
        var config = this.config;
        var useWorker = config.boost_useWorker;
        var data = args;
        if (args.bindto) {
            data = {};
            ["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"]
                .forEach(function (v) {
                var key = "data_".concat(v);
                if (key in args) {
                    data[v] = args[key];
                }
            });
        }
        if (data.url && callback) {
            url(data.url, data.mimeType, data.headers, getDataKeyForJson(data.keys, config), callback);
        }
        else if (data.json) {
            runWorker(useWorker, json, callback, [columns, rows])(data.json, getDataKeyForJson(data.keys, config));
        }
        else if (data.rows) {
            runWorker(useWorker, rows, callback)(data.rows);
        }
        else if (data.columns) {
            runWorker(useWorker, columns, callback)(data.columns);
        }
        else if (args.bindto) {
            throw Error("url or json or rows or columns is required.");
        }
    },
    convertDataToTargets: function (data, appendXs) {
        var _this = this;
        var $$ = this;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var chartType = config.data_type;
        var isCategorized = false;
        var isTimeSeries = false;
        var isCustomX = false;
        if (axis) {
            isCategorized = axis.isCategorized();
            isTimeSeries = axis.isTimeSeries();
            isCustomX = axis.isCustomX();
        }
        var dataKeys = Object.keys(data[0] || {});
        var ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [];
        var xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];
        var xsData;
        // save x for update data by load when custom x and bb.x API
        ids.forEach(function (id) {
            var xKey = _this.getXKey(id);
            if (isCustomX || isTimeSeries) {
                // if included in input data
                if (xs.indexOf(xKey) >= 0) {
                    xsData = ((appendXs && $$.data.xs[id]) || [])
                        .concat(data.map(function (d) { return d[xKey]; })
                        .filter(isValue)
                        .map(function (rawX, i) { return $$.generateTargetX(rawX, id, i); }));
                }
                else if (config.data_x) {
                    // if not included in input data, find from preloaded data of other id's x
                    xsData = _this.getOtherTargetXs();
                }
                else if (notEmpty(config.data_xs)) {
                    // if not included in input data, find from preloaded data
                    xsData = $$.getXValuesOfXKey(xKey, $$.data.targets);
                }
                // MEMO: if no x included, use same x of current will be used
            }
            else {
                xsData = data.map(function (d, i) { return i; });
            }
            xsData && (_this.data.xs[id] = xsData);
        });
        // check x is defined
        ids.forEach(function (id) {
            if (!_this.data.xs[id]) {
                throw new Error("x is not defined for id = \"".concat(id, "\"."));
            }
        });
        // convert to target
        var targets = ids.map(function (id, index) {
            var convertedId = config.data_idConverter.bind($$.api)(id);
            var xKey = $$.getXKey(id);
            var isCategory = isCustomX && isCategorized;
            var hasCategory = isCategory && data.map(function (v) { return v.x; })
                .every(function (v) { return config.axis_x_categories.indexOf(v) > -1; });
            // when .load() with 'append' option is used for indexed axis
            // @ts-ignore
            var isDataAppend = data.__append__;
            var xIndex = xKey === null && isDataAppend ? $$.api.data.values(id).length : 0;
            return {
                id: convertedId,
                id_org: id,
                values: data.map(function (d, i) {
                    var rawX = d[xKey];
                    var value = d[id];
                    var x;
                    value = value !== null && !isNaN(value) && !isObject(value) ?
                        +value :
                        (isArray(value) || isObject(value) ? value : null);
                    // use x as categories if custom x and categorized
                    if ((isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX)) {
                        if (!hasCategory && index === 0 && i === 0 && !isDataAppend) {
                            config.axis_x_categories = [];
                        }
                        x = config.axis_x_categories.indexOf(rawX);
                        if (x === -1) {
                            x = config.axis_x_categories.length;
                            config.axis_x_categories.push(rawX);
                        }
                    }
                    else {
                        x = $$.generateTargetX(rawX, id, xIndex + i);
                    }
                    // mark as x = undefined if value is undefined and filter to remove after mapped
                    if (isUndefined(value) || $$.data.xs[id].length <= i) {
                        x = undefined;
                    }
                    return {
                        x: x,
                        value: value,
                        id: convertedId,
                        index: -1
                    };
                }).filter(function (v) { return isDefined(v.x); })
            };
        });
        // finish targets
        targets.forEach(function (t) {
            var _a;
            // sort values by its x
            if (config.data_xSort) {
                t.values = t.values.sort(function (v1, v2) {
                    var x1 = v1.x || v1.x === 0 ? v1.x : Infinity;
                    var x2 = v2.x || v2.x === 0 ? v2.x : Infinity;
                    return x1 - x2;
                });
            }
            // indexing each value
            t.values.forEach(function (v, i) { return (v.index = i); });
            // this needs to be sorted because its index and value.index is identical
            (_a = $$.data.xs[t.id]) === null || _a === void 0 ? void 0 : _a.sort(function (v1, v2) { return v1 - v2; });
        });
        // cache information about values
        state.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
        state.hasPositiveValue = $$.hasPositiveValueInTargets(targets);
        // set target types
        if (chartType && $$.isValidChartType(chartType)) {
            var targetIds = $$.mapToIds(targets)
                .filter(function (id) {
                return !(id in config.data_types) || !$$.isValidChartType(config.data_types[id]);
            });
            $$.setTargetType(targetIds, chartType);
        }
        // cache as original id keyed
        targets.forEach(function (d) { return $$.cache.add(d.id_org, d, true); });
        return targets;
    }
};

var data$1 = {
    isX: function (key) {
        var $$ = this;
        var config = $$.config;
        var dataKey = config.data_x && key === config.data_x;
        var existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);
        return dataKey || existValue;
    },
    isNotX: function (key) {
        return !this.isX(key);
    },
    isStackNormalized: function () {
        var config = this.config;
        return !!(config.data_stack_normalize && config.data_groups.length);
    },
    /**
     * Check if given id is grouped data or has grouped data
     * @param {string} id Data id value
     * @returns {boolean} is grouped data or has grouped data
     * @private
     */
    isGrouped: function (id) {
        var groups = this.config.data_groups;
        return id ? groups.some(function (v) { return v.indexOf(id) >= 0 && v.length > 1; }) : groups.length > 0;
    },
    getXKey: function (id) {
        var $$ = this;
        var config = $$.config;
        return config.data_x ?
            config.data_x :
            (notEmpty(config.data_xs) ? config.data_xs[id] : null);
    },
    getXValuesOfXKey: function (key, targets) {
        var $$ = this;
        var ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];
        var xValues;
        ids.forEach(function (id) {
            if ($$.getXKey(id) === key) {
                xValues = $$.data.xs[id];
            }
        });
        return xValues;
    },
    /**
     * Get index number based on given x Axis value
     * @param {Date|number|string} x x Axis to be compared
     * @param {Array} basedX x Axis list to be based on
     * @returns {number} index number
     * @private
     */
    getIndexByX: function (x, basedX) {
        var $$ = this;
        return basedX ?
            basedX.indexOf(isString(x) ? x : +x) :
            ($$.filterByX($$.data.targets, x)[0] || { index: null }).index;
    },
    getXValue: function (id, i) {
        var $$ = this;
        return id in $$.data.xs &&
            $$.data.xs[id] &&
            isValue($$.data.xs[id][i]) ?
            $$.data.xs[id][i] :
            i;
    },
    getOtherTargetXs: function () {
        var $$ = this;
        var idsForX = Object.keys($$.data.xs);
        return idsForX.length ? $$.data.xs[idsForX[0]] : null;
    },
    getOtherTargetX: function (index) {
        var xs = this.getOtherTargetXs();
        return xs && index < xs.length ? xs[index] : null;
    },
    addXs: function (xs) {
        var $$ = this;
        var config = $$.config;
        Object.keys(xs).forEach(function (id) {
            config.data_xs[id] = xs[id];
        });
    },
    /**
     * Determine if x axis is multiple
     * @returns {boolean} true: multiple, false: single
     * @private
     */
    isMultipleX: function () {
        return !this.config.axis_x_forceAsSingle && (notEmpty(this.config.data_xs) ||
            this.hasType("bubble") ||
            this.hasType("scatter"));
    },
    addName: function (data) {
        var $$ = this;
        var config = $$.config;
        var name;
        if (data) {
            name = config.data_names[data.id];
            data.name = name !== undefined ? name : data.id;
        }
        return data;
    },
    /**
     * Get all values on given index
     * @param {number} index Index
     * @param {boolean} filterNull Filter nullish value
     * @returns {Array}
     * @private
     */
    getAllValuesOnIndex: function (index, filterNull) {
        if (filterNull === void 0) { filterNull = false; }
        var $$ = this;
        var value = $$.filterTargetsToShow($$.data.targets)
            .map(function (t) { return $$.addName($$.getValueOnIndex(t.values, index)); });
        if (filterNull) {
            value = value.filter(function (v) { return v && "value" in v && isValue(v.value); });
        }
        return value;
    },
    getValueOnIndex: function (values, index) {
        var valueOnIndex = values.filter(function (v) { return v.index === index; });
        return valueOnIndex.length ? valueOnIndex[0] : null;
    },
    updateTargetX: function (targets, x) {
        var $$ = this;
        targets.forEach(function (t) {
            t.values.forEach(function (v, i) {
                v.x = $$.generateTargetX(x[i], t.id, i);
            });
            $$.data.xs[t.id] = x;
        });
    },
    updateTargetXs: function (targets, xs) {
        var $$ = this;
        targets.forEach(function (t) {
            xs[t.id] && $$.updateTargetX([t], xs[t.id]);
        });
    },
    generateTargetX: function (rawX, id, index) {
        var $$ = this;
        var axis = $$.axis;
        var x = (axis === null || axis === void 0 ? void 0 : axis.isCategorized()) ? index : (rawX || index);
        if (axis === null || axis === void 0 ? void 0 : axis.isTimeSeries()) {
            var fn = parseDate.bind($$);
            x = rawX ? fn(rawX) : fn($$.getXValue(id, index));
        }
        else if ((axis === null || axis === void 0 ? void 0 : axis.isCustomX()) && !(axis === null || axis === void 0 ? void 0 : axis.isCategorized())) {
            x = isValue(rawX) ? +rawX : $$.getXValue(id, index);
        }
        return x;
    },
    updateXs: function (values) {
        if (values.length) {
            this.axis.xs = values.map(function (v) { return v.x; });
        }
    },
    getPrevX: function (i) {
        var x = this.axis.xs[i - 1];
        return isDefined(x) ? x : null;
    },
    getNextX: function (i) {
        var x = this.axis.xs[i + 1];
        return isDefined(x) ? x : null;
    },
    /**
     * Get base value isAreaRangeType
     * @param {object} data Data object
     * @returns {number}
     * @private
     */
    getBaseValue: function (data) {
        var $$ = this;
        var hasAxis = $$.state.hasAxis;
        var value = data.value;
        // In case of area-range, data is given as: [low, mid, high] or {low, mid, high}
        // will take the 'mid' as the base value
        if (value && hasAxis) {
            if ($$.isAreaRangeType(data)) {
                value = $$.getRangedData(data, "mid");
            }
            else if ($$.isBubbleZType(data)) {
                value = $$.getBubbleZData(value, "y");
            }
        }
        return value;
    },
    /**
     * Get min/max value from the data
     * @private
     * @param {Array} data array data to be evaluated
     * @returns {{min: {number}, max: {number}}}
     */
    getMinMaxValue: function (data) {
        var getBaseValue = this.getBaseValue.bind(this);
        var min;
        var max;
        (data || this.data.targets.map(function (t) { return t.values; }))
            .forEach(function (v, i) {
            var value = v.map(getBaseValue).filter(isNumber);
            min = Math.min.apply(Math, __spreadArray([i ? min : Infinity], value, false));
            max = Math.max.apply(Math, __spreadArray([i ? max : -Infinity], value, false));
        });
        return { min: min, max: max };
    },
    /**
     * Get the min/max data
     * @private
     * @returns {{min: Array, max: Array}}
     */
    getMinMaxData: function () {
        var $$ = this;
        var cacheKey = KEY.dataMinMax;
        var minMaxData = $$.cache.get(cacheKey);
        if (!minMaxData) {
            var data = $$.data.targets.map(function (t) { return t.values; });
            var minMax_1 = $$.getMinMaxValue(data);
            var min_1 = [];
            var max_1 = [];
            data.forEach(function (v) {
                var minData = $$.getFilteredDataByValue(v, minMax_1.min);
                var maxData = $$.getFilteredDataByValue(v, minMax_1.max);
                if (minData.length) {
                    min_1 = min_1.concat(minData);
                }
                if (maxData.length) {
                    max_1 = max_1.concat(maxData);
                }
            });
            // update the cached data
            $$.cache.add(cacheKey, minMaxData = { min: min_1, max: max_1 });
        }
        return minMaxData;
    },
    /**
     * Get sum of data per index
     * @private
     * @returns {Array}
     */
    getTotalPerIndex: function () {
        var $$ = this;
        var cacheKey = KEY.dataTotalPerIndex;
        var sum = $$.cache.get(cacheKey);
        if (($$.config.data_groups.length || $$.isStackNormalized()) && !sum) {
            sum = [];
            $$.data.targets.forEach(function (row) {
                row.values.forEach(function (v, i) {
                    if (!sum[i]) {
                        sum[i] = 0;
                    }
                    sum[i] += isNumber(v.value) ? v.value : 0;
                });
            });
        }
        return sum;
    },
    /**
     * Get total data sum
     * @param {boolean} subtractHidden Subtract hidden data from total
     * @returns {number}
     * @private
     */
    getTotalDataSum: function (subtractHidden) {
        var $$ = this;
        var cacheKey = KEY.dataTotalSum;
        var total = $$.cache.get(cacheKey);
        if (!isNumber(total)) {
            var sum = mergeArray($$.data.targets.map(function (t) { return t.values; }))
                .map(function (v) { return v.value; });
            total = sum.length ? sum.reduce(function (p, c) { return p + c; }) : 0;
            $$.cache.add(cacheKey, total);
        }
        if (subtractHidden) {
            total -= $$.getHiddenTotalDataSum();
        }
        return total;
    },
    /**
     * Get total hidden data sum
     * @returns {number}
     * @private
     */
    getHiddenTotalDataSum: function () {
        var $$ = this;
        var api = $$.api, hiddenTargetIds = $$.state.hiddenTargetIds;
        var total = 0;
        if (hiddenTargetIds.length) {
            total = api.data.values.bind(api)(hiddenTargetIds)
                .reduce(function (p, c) { return p + c; });
        }
        return total;
    },
    /**
     * Get filtered data by value
     * @param {object} data Data
     * @param {number} value Value to be filtered
     * @returns {Array} filtered array data
     * @private
     */
    getFilteredDataByValue: function (data, value) {
        var _this = this;
        return data.filter(function (t) { return _this.getBaseValue(t) === value; });
    },
    /**
     * Return the max length of the data
     * @returns {number} max data length
     * @private
     */
    getMaxDataCount: function () {
        return Math.max.apply(Math, __spreadArray(__spreadArray([], this.data.targets.map(function (t) { return t.values.length; }), false), [0], false));
    },
    getMaxDataCountTarget: function () {
        var target = this.filterTargetsToShow() || [];
        var length = target.length;
        var isInverted = this.config.axis_x_inverted;
        if (length > 1) {
            target = target.map(function (t) { return t.values; })
                .reduce(function (a, b) { return a.concat(b); })
                .map(function (v) { return v.x; });
            target = sortValue(getUnique(target))
                .map(function (x, index, array) { return ({
                x: x,
                index: isInverted ? array.length - index - 1 : index
            }); });
        }
        else if (length) {
            target = target[0].values.concat();
        }
        return target;
    },
    mapToIds: function (targets) {
        return targets.map(function (d) { return d.id; });
    },
    mapToTargetIds: function (ids) {
        var $$ = this;
        return ids ? (isArray(ids) ? ids.concat() : [ids]) : $$.mapToIds($$.data.targets);
    },
    hasTarget: function (targets, id) {
        var ids = this.mapToIds(targets);
        for (var i = 0, val = void 0; (val = ids[i]); i++) {
            if (val === id) {
                return true;
            }
        }
        return false;
    },
    isTargetToShow: function (targetId) {
        return this.state.hiddenTargetIds.indexOf(targetId) < 0;
    },
    isLegendToShow: function (targetId) {
        return this.state.hiddenLegendIds.indexOf(targetId) < 0;
    },
    filterTargetsToShow: function (targets) {
        var $$ = this;
        return (targets || $$.data.targets).filter(function (t) { return $$.isTargetToShow(t.id); });
    },
    mapTargetsToUniqueXs: function (targets) {
        var $$ = this;
        var axis = $$.axis;
        var xs = [];
        if (targets === null || targets === void 0 ? void 0 : targets.length) {
            xs = getUnique(mergeArray(targets.map(function (t) { return t.values.map(function (v) { return +v.x; }); })));
            xs = (axis === null || axis === void 0 ? void 0 : axis.isTimeSeries()) ? xs.map(function (x) { return new Date(+x); }) : xs.map(Number);
        }
        return sortValue(xs);
    },
    /**
     * Add to the state target Ids
     * @param {string} type State's prop name
     * @param {Array|string} targetIds Target ids array
     * @private
     */
    addTargetIds: function (type, targetIds) {
        var state = this.state;
        var ids = (isArray(targetIds) ? targetIds : [targetIds]);
        ids.forEach(function (v) {
            state[type].indexOf(v) < 0 &&
                state[type].push(v);
        });
    },
    /**
     * Remove from the state target Ids
     * @param {string} type State's prop name
     * @param {Array|string} targetIds Target ids array
     * @private
     */
    removeTargetIds: function (type, targetIds) {
        var state = this.state;
        var ids = (isArray(targetIds) ? targetIds : [targetIds]);
        ids.forEach(function (v) {
            var index = state[type].indexOf(v);
            index >= 0 && state[type].splice(index, 1);
        });
    },
    addHiddenTargetIds: function (targetIds) {
        this.addTargetIds("hiddenTargetIds", targetIds);
    },
    removeHiddenTargetIds: function (targetIds) {
        this.removeTargetIds("hiddenTargetIds", targetIds);
    },
    addHiddenLegendIds: function (targetIds) {
        this.addTargetIds("hiddenLegendIds", targetIds);
    },
    removeHiddenLegendIds: function (targetIds) {
        this.removeTargetIds("hiddenLegendIds", targetIds);
    },
    getValuesAsIdKeyed: function (targets) {
        var $$ = this;
        var hasAxis = $$.state.hasAxis;
        var ys = {};
        var isMultipleX = $$.isMultipleX();
        var xs = isMultipleX ?
            $$.mapTargetsToUniqueXs(targets)
                .map(function (v) { return (isString(v) ? v : +v); }) :
            null;
        targets.forEach(function (t) {
            var data = [];
            t.values
                .filter(function (_a) {
                var value = _a.value;
                return isValue(value) || value === null;
            })
                .forEach(function (v) {
                var value = v.value;
                // exclude 'volume' value to correct mis domain calculation
                if (value !== null && $$.isCandlestickType(v)) {
                    value = isArray(value) ?
                        value.slice(0, 4) :
                        [value.open, value.high, value.low, value.close];
                }
                if (isArray(value)) {
                    data.push.apply(data, value);
                }
                else if (isObject(value) && "high" in value) {
                    data.push.apply(data, Object.values(value));
                }
                else if ($$.isBubbleZType(v)) {
                    data.push(hasAxis && $$.getBubbleZData(value, "y"));
                }
                else {
                    if (isMultipleX) {
                        data[$$.getIndexByX(v.x, xs)] = value;
                    }
                    else {
                        data.push(value);
                    }
                }
            });
            ys[t.id] = data;
        });
        return ys;
    },
    checkValueInTargets: function (targets, checker) {
        var ids = Object.keys(targets);
        var values;
        for (var i = 0; i < ids.length; i++) {
            values = targets[ids[i]].values;
            for (var j = 0; j < values.length; j++) {
                if (checker(values[j].value)) {
                    return true;
                }
            }
        }
        return false;
    },
    hasMultiTargets: function () {
        return this.filterTargetsToShow().length > 1;
    },
    hasNegativeValueInTargets: function (targets) {
        return this.checkValueInTargets(targets, function (v) { return v < 0; });
    },
    hasPositiveValueInTargets: function (targets) {
        return this.checkValueInTargets(targets, function (v) { return v > 0; });
    },
    /**
     * Sort targets data
     * Note: For stacked bar, will sort from the total sum of data series, not for each stacked bar
     * @param {Array} targetsValue Target value
     * @returns {Array}
     * @private
     */
    orderTargets: function (targetsValue) {
        var $$ = this;
        var targets = __spreadArray([], targetsValue, true);
        var fn = $$.getSortCompareFn();
        fn && targets.sort(fn);
        return targets;
    },
    /**
     * Get data.order compare function
     * @param {boolean} isReversed for Arc & Treemap type sort order needs to be reversed
     * @returns {Function} compare function
     * @private
     */
    getSortCompareFn: function (isReversed) {
        if (isReversed === void 0) { isReversed = false; }
        var $$ = this;
        var config = $$.config;
        var order = config.data_order;
        var orderAsc = /asc/i.test(order);
        var orderDesc = /desc/i.test(order);
        var fn;
        if (orderAsc || orderDesc) {
            var reducer_1 = function (p, c) { return p + Math.abs(c.value); };
            var sum_1 = function (v) { return (isNumber(v) ? v : ("values" in v ? v.values.reduce(reducer_1, 0) : v.value)); };
            fn = function (t1, t2) {
                var t1Sum = sum_1(t1);
                var t2Sum = sum_1(t2);
                return isReversed ?
                    (orderAsc ? t1Sum - t2Sum : t2Sum - t1Sum) :
                    (orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum);
            };
        }
        else if (isFunction(order)) {
            fn = order.bind($$.api);
        }
        return fn || null;
    },
    filterByX: function (targets, x) {
        return mergeArray(targets.map(function (t) { return t.values; })).filter(function (v) { return v.x - x === 0; });
    },
    filterRemoveNull: function (data) {
        var _this = this;
        return data.filter(function (d) { return isValue(_this.getBaseValue(d)); });
    },
    filterByXDomain: function (targets, xDomain) {
        return targets.map(function (t) { return ({
            id: t.id,
            id_org: t.id_org,
            values: t.values.filter(function (v) { return xDomain[0] <= v.x && v.x <= xDomain[1]; })
        }); });
    },
    hasDataLabel: function () {
        var dataLabels = this.config.data_labels;
        return (isBoolean(dataLabels) && dataLabels) ||
            (isObjectType(dataLabels) && notEmpty(dataLabels));
    },
    /**
     * Determine if has null value
     * @param {Array} targets Data array to be evaluated
     * @returns {boolean}
     * @private
     */
    hasNullDataValue: function (targets) {
        return targets.some(function (_a) {
            var value = _a.value;
            return value === null;
        });
    },
    /**
     * Get data index from the event coodinates
     * @param {Event} event Event object
     * @returns {number}
     * @private
     */
    getDataIndexFromEvent: function (event) {
        var $$ = this;
        var $el = $$.$el, config = $$.config, _a = $$.state, hasRadar = _a.hasRadar, inputType = _a.inputType, _b = _a.eventReceiver, coords = _b.coords, rect = _b.rect;
        var index;
        if (hasRadar) {
            var target = event.target;
            // in case of multilined axis text
            if (/tspan/i.test(target.tagName)) {
                target = target.parentNode;
            }
            var d = select(target).datum();
            index = d && Object.keys(d).length === 1 ? d.index : undefined;
        }
        else {
            var isRotated = config.axis_rotated;
            var scrollPos = getScrollPosition($el.chart.node());
            // get data based on the mouse coords
            var e = inputType === "touch" && event.changedTouches ?
                event.changedTouches[0] :
                event;
            var point = isRotated ?
                e.clientY + scrollPos.y - rect.top :
                e.clientX + scrollPos.x - rect.left;
            if (hasViewBox($el.svg)) {
                var pos = [point, 0];
                isRotated && pos.reverse();
                point = getTransformCTM.apply(void 0, __spreadArray([$el.svg.node()], pos, false))[isRotated ? "y" : "x"];
            }
            index = findIndex(coords, point, 0, coords.length - 1, isRotated);
        }
        return index;
    },
    getDataLabelLength: function (min, max, key) {
        var $$ = this;
        var lengths = [0, 0];
        var paddingCoef = 1.3;
        $$.$el.chart.select("svg").selectAll(".dummy")
            .data([min, max])
            .enter()
            .append("text")
            .text(function (d) { return $$.dataLabelFormat(d.id)(d); })
            .each(function (d, i) {
            lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;
        })
            .remove();
        return lengths;
    },
    isNoneArc: function (d) {
        return this.hasTarget(this.data.targets, d.id);
    },
    isArc: function (d) {
        return "data" in d && this.hasTarget(this.data.targets, d.data.id);
    },
    findSameXOfValues: function (values, index) {
        var targetX = values[index].x;
        var sames = [];
        var i;
        for (i = index - 1; i >= 0; i--) {
            if (targetX !== values[i].x) {
                break;
            }
            sames.push(values[i]);
        }
        for (i = index; i < values.length; i++) {
            if (targetX !== values[i].x) {
                break;
            }
            sames.push(values[i]);
        }
        return sames;
    },
    findClosestFromTargets: function (targets, pos) {
        var $$ = this;
        var candidates = targets.map(function (target) { return $$.findClosest(target.values, pos); }); // map to array of closest points of each target
        // decide closest point and return
        return $$.findClosest(candidates, pos);
    },
    findClosest: function (values, pos) {
        var $$ = this;
        var main = $$.$el.main;
        var data = values.filter(function (v) { return v && isValue(v.value); });
        var minDist;
        var closest;
        // find mouseovering bar/candlestick
        // https://github.com/naver/billboard.js/issues/2434
        data
            .filter(function (v) { return $$.isBarType(v.id) || $$.isCandlestickType(v.id); })
            .forEach(function (v) {
            var selector = $$.isBarType(v.id) ?
                ".".concat($BAR.chartBar, ".").concat($COMMON.target).concat($$.getTargetSelectorSuffix(v.id), " .").concat($BAR.bar, "-").concat(v.index) :
                ".".concat($CANDLESTICK.chartCandlestick, ".").concat($COMMON.target).concat($$.getTargetSelectorSuffix(v.id), " .").concat($CANDLESTICK.candlestick, "-").concat(v.index, " path");
            if (!closest && $$.isWithinBar(main.select(selector).node())) {
                closest = v;
            }
        });
        // find closest point from non-bar/candlestick
        data
            .filter(function (v) { return !$$.isBarType(v.id) && !$$.isCandlestickType(v.id); })
            .forEach(function (v) {
            var d = $$.dist(v, pos);
            minDist = $$.getPointSensitivity(v);
            if (d < minDist) {
                minDist = d;
                closest = v;
            }
        });
        return closest;
    },
    dist: function (data, pos) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated, scale = $$.scale;
        var xIndex = +isRotated; // true: 1, false: 0
        var yIndex = +!isRotated; // true: 0, false: 1
        var y = $$.circleY(data, data.index);
        var x = (scale.zoom || scale.x)(data.x);
        return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
    },
    /**
     * Convert data for step type
     * @param {Array} values Object data values
     * @returns {Array}
     * @private
     */
    convertValuesToStep: function (values) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var stepType = config.line_step_type;
        var isCategorized = axis ? axis.isCategorized() : false;
        var converted = isArray(values) ? values.concat() : [values];
        if (!(isCategorized || /step\-(after|before)/.test(stepType))) {
            return values;
        }
        // when all datas are null, return empty array
        // https://github.com/naver/billboard.js/issues/3124
        if (converted.length) {
            // insert & append cloning first/last value to be fully rendered covering on each gap sides
            var head = converted[0];
            var tail = converted[converted.length - 1];
            var id = head.id;
            var x = head.x;
            // insert head
            converted.unshift({ x: --x, value: head.value, id: id });
            isCategorized && stepType === "step-after" &&
                converted.unshift({ x: --x, value: head.value, id: id });
            // append tail
            x = tail.x;
            converted.push({ x: ++x, value: tail.value, id: id });
            isCategorized && stepType === "step-before" &&
                converted.push({ x: ++x, value: tail.value, id: id });
        }
        return converted;
    },
    convertValuesToRange: function (values) {
        var converted = isArray(values) ? values.concat() : [values];
        var ranges = [];
        converted.forEach(function (range) {
            var x = range.x, id = range.id;
            ranges.push({
                x: x,
                id: id,
                value: range.value[0]
            });
            ranges.push({
                x: x,
                id: id,
                value: range.value[2]
            });
        });
        return ranges;
    },
    updateDataAttributes: function (name, attrs) {
        var $$ = this;
        var config = $$.config;
        var current = config["data_".concat(name)];
        if (isUndefined(attrs)) {
            return current;
        }
        Object.keys(attrs).forEach(function (id) {
            current[id] = attrs[id];
        });
        $$.redraw({ withLegend: true });
        return current;
    },
    getRangedData: function (d, key, type) {
        if (key === void 0) { key = ""; }
        if (type === void 0) { type = "areaRange"; }
        var value = d === null || d === void 0 ? void 0 : d.value;
        if (isArray(value)) {
            if (type === "bar") {
                return value.reduce(function (a, c) { return c - a; });
            }
            else {
                // @ts-ignore
                var index = {
                    areaRange: ["high", "mid", "low"],
                    candlestick: ["open", "high", "low", "close", "volume"]
                }[type].indexOf(key);
                return index >= 0 && value ? value[index] : undefined;
            }
        }
        else if (value && key) {
            return value[key];
        }
        return value;
    },
    /**
     * Set ratio for grouped data
     * @param {Array} data Data array
     * @private
     */
    setRatioForGroupedData: function (data) {
        var $$ = this;
        var config = $$.config;
        // calculate ratio if grouped data exists
        if (config.data_groups.length && data.some(function (d) { return $$.isGrouped(d.id); })) {
            var setter_1 = function (d) { return $$.getRatio("index", d, true); };
            data.forEach(function (v) {
                "values" in v ? v.values.forEach(setter_1) : setter_1(v);
            });
        }
    },
    /**
     * Get ratio value
     * @param {string} type Ratio for given type
     * @param {object} d Data value object
     * @param {boolean} asPercent Convert the return as percent or not
     * @returns {number} Ratio value
     * @private
     */
    getRatio: function (type, d, asPercent) {
        if (asPercent === void 0) { asPercent = false; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var api = $$.api;
        var ratio = 0;
        if (d && api.data.shown().length) {
            ratio = d.ratio || d.value;
            if (type === "arc") {
                // if has padAngle set, calculate rate based on value
                if ($$.pie.padAngle()()) {
                    ratio = d.value / $$.getTotalDataSum(true);
                    // otherwise, based on the rendered angle value
                }
                else {
                    var gaugeArcLength = config.gauge_fullCircle ?
                        $$.getArcLength() :
                        $$.getStartingAngle() * -2;
                    var arcLength = $$.hasType("gauge") ? gaugeArcLength : Math.PI * 2;
                    ratio = (d.endAngle - d.startAngle) / arcLength;
                }
            }
            else if (type === "index") {
                var dataValues = api.data.values.bind(api);
                var total = this.getTotalPerIndex();
                if (state.hiddenTargetIds.length) {
                    var hiddenSum_1 = dataValues(state.hiddenTargetIds, false);
                    if (hiddenSum_1.length) {
                        hiddenSum_1 = hiddenSum_1
                            .reduce(function (acc, curr) {
                            return acc.map(function (v, i) { return (isNumber(v) ? v : 0) + curr[i]; });
                        });
                        total = total.map(function (v, i) { return v - hiddenSum_1[i]; });
                    }
                }
                var divisor = total[d.index];
                d.ratio = isNumber(d.value) && total && divisor ? d.value / divisor : 0;
                ratio = d.ratio;
            }
            else if (type === "radar") {
                ratio = (parseFloat(String(Math.max(d.value, 0))) / state.current.dataMax) * config.radar_size_ratio;
            }
            else if (type === "bar") {
                var yScale = $$.getYScaleById.bind($$)(d.id);
                var max = yScale.domain().reduce(function (a, c) { return c - a; });
                // when all data are 0, return 0
                ratio = max === 0 ? 0 : Math.abs($$.getRangedData(d, null, type) / max);
            }
            else if (type === "treemap") {
                ratio /= $$.getTotalDataSum(true);
            }
        }
        return asPercent && ratio ? ratio * 100 : ratio;
    },
    /**
     * Sort data index to be aligned with x axis.
     * @param {Array} tickValues Tick array values
     * @private
     */
    updateDataIndexByX: function (tickValues) {
        var $$ = this;
        var tickValueMap = tickValues.reduce(function (out, tick, index) {
            out[Number(tick.x)] = index;
            return out;
        }, {});
        $$.data.targets.forEach(function (t) {
            t.values.forEach(function (value, valueIndex) {
                var index = tickValueMap[Number(value.x)];
                if (index === undefined) {
                    index = valueIndex;
                }
                value.index = index;
            });
        });
    },
    /**
     * Determine if bubble has dimension data
     * @param {object|Array} d data value
     * @returns {boolean}
     * @private
     */
    isBubbleZType: function (d) {
        var $$ = this;
        return $$.isBubbleType(d) && ((isObject(d.value) && ("z" in d.value || "y" in d.value)) ||
            (isArray(d.value) && d.value.length >= 2));
    },
    /**
     * Determine if bar has ranged data
     * @param {Array} d data value
     * @returns {boolean}
     * @private
     */
    isBarRangeType: function (d) {
        var $$ = this;
        var value = d.value;
        return $$.isBarType(d) && isArray(value) && value.length >= 2 &&
            value.every(function (v) { return isNumber(v); });
    },
    /**
     * Get data object by id
     * @param {string} id data id
     * @returns {object}
     * @private
     */
    getDataById: function (id) {
        var _a;
        var d = this.cache.get(id) || this.api.data(id);
        return (_a = d === null || d === void 0 ? void 0 : d[0]) !== null && _a !== void 0 ? _a : d;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Call done callback with resize after transition
 * @param {Function} fn Callback function
 * @param {boolean} resizeAfter Weather to resize chart after the load
 * @private
 */
function callDone(fn, resizeAfter) {
    if (resizeAfter === void 0) { resizeAfter = false; }
    var $$ = this;
    var api = $$.api;
    resizeAfter && $$.api.flush(true);
    fn === null || fn === void 0 ? void 0 : fn.call(api);
}
var dataLoad = {
    load: function (rawTargets, args) {
        var $$ = this;
        var axis = $$.axis, data = $$.data, org = $$.org, scale = $$.scale;
        var append = args.append;
        var zoomState = {
            domain: null,
            currentDomain: null,
            x: null
        };
        var targets = rawTargets;
        if (targets) {
            // filter loading targets if needed
            if (args.filter) {
                targets = targets.filter(args.filter);
            }
            // set type if args.types || args.type specified
            if (args.type || args.types) {
                targets.forEach(function (t) {
                    var _a;
                    var type = ((_a = args.types) === null || _a === void 0 ? void 0 : _a[t.id]) || args.type;
                    $$.setTargetType(t.id, type);
                });
            }
            // Update/Add data
            data.targets.forEach(function (d) {
                for (var i = 0; i < targets.length; i++) {
                    if (d.id === targets[i].id) {
                        d.values = append ? d.values.concat(targets[i].values) : targets[i].values;
                        targets.splice(i, 1);
                        break;
                    }
                }
            });
            data.targets = data.targets.concat(targets); // add remained
        }
        // Set targets
        $$.updateTargets(data.targets);
        if (scale.zoom) {
            zoomState.x = axis.isCategorized() ?
                scale.x.orgScale() :
                (org.xScale || scale.x).copy();
            zoomState.domain = $$.getXDomain(data.targets); // get updated xDomain
            zoomState.x.domain(zoomState.domain);
            zoomState.currentDomain = $$.zoom.getDomain(); // current zoomed domain
            // reset zoom state when new data loaded is out of range
            if (!$$.withinRange(zoomState.currentDomain, undefined, zoomState.domain)) {
                scale.x.domain(zoomState.domain);
                scale.zoom = null;
                $$.$el.eventRect.property("__zoom", null);
            }
        }
        // Redraw with new targets
        $$.redraw({
            withUpdateOrgXDomain: true,
            withUpdateXDomain: true,
            withLegend: true
        });
        // when load happens on zoom state
        if (scale.zoom) {
            // const x = (axis.isCategorized() ? scale.x.orgScale() : (org.xScale || scale.x)).copy();
            org.xDomain = zoomState.domain;
            org.xScale = zoomState.x;
            if (axis.isCategorized()) {
                zoomState.currentDomain = $$.getZoomDomainValue(zoomState.currentDomain);
                org.xDomain = $$.getZoomDomainValue(org.xDomain);
                org.xScale = zoomState.x.domain(org.xDomain);
            }
            $$.updateCurrentZoomTransform(zoomState.x, zoomState.currentDomain);
            // https://github.com/naver/billboard.js/issues/3878
        }
        else if (org.xScale) {
            org.xScale.domain(org.xDomain);
        }
        // Update current state chart type and elements list after redraw
        $$.updateTypesElements();
        callDone.call($$, args.done, args.resizeAfter);
    },
    loadFromArgs: function (args) {
        var $$ = this;
        // prevent load when chart is already destroyed
        if (!$$.config) {
            return;
        }
        // reset internally cached data
        $$.cache.reset();
        $$.convertData(args, function (d) {
            var data = args.data || d;
            args.append && (data.__append__ = true);
            data && $$.load($$.convertDataToTargets(data), args);
        });
    },
    unload: function (rawTargetIds, customDoneCb) {
        var _a;
        var $$ = this;
        var state = $$.state, $el = $$.$el, $T = $$.$T;
        var hasLegendDefsPoint = !!((_a = $$.hasLegendDefsPoint) === null || _a === void 0 ? void 0 : _a.call($$));
        var done = customDoneCb;
        var targetIds = rawTargetIds;
        // reset internally cached data
        $$.cache.reset();
        if (!done) {
            done = function () { };
        }
        // filter existing target
        targetIds = targetIds.filter(function (id) { return $$.hasTarget($$.data.targets, id); });
        // If no target, call done and return
        if (!targetIds || targetIds.length === 0) {
            done();
            return;
        }
        var targets = $el.svg.selectAll(targetIds.map(function (id) { return $$.selectorTarget(id); }));
        $T(targets)
            .style("opacity", "0")
            .remove()
            .call(endall, done);
        targetIds.forEach(function (id) {
            var _a;
            var suffixId = $$.getTargetSelectorSuffix(id);
            // Reset fadein for future load
            state.withoutFadeIn[id] = false;
            // Remove target's elements
            if ($el.legend) {
                $el.legend.selectAll(".".concat($LEGEND.legendItem).concat(suffixId)).remove();
            }
            // Remove target
            $$.data.targets = $$.data.targets.filter(function (t) { return t.id !== id; });
            // Remove custom point def element
            hasLegendDefsPoint && ((_a = $el.defs) === null || _a === void 0 ? void 0 : _a.select("#".concat($$.getDefsPointId(suffixId))).remove());
        });
        // since treemap uses different data types, it needs to be transformed
        state.hasFunnel && $$.updateFunnel($$.data.targets);
        // since treemap uses different data types, it needs to be transformed
        state.hasTreemap && $$.updateTargetsForTreemap($$.data.targets);
        // Update current state chart type and elements list after redraw
        $$.updateTypesElements();
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var interaction = {
    /**
     * Expand data shape/point
     * @param {number} index Index number
     * @param {string} id Data id
     * @param {boolean} reset Reset expand state
     * @private
     */
    setExpand: function (index, id, reset) {
        var $$ = this;
        var config = $$.config, circle = $$.$el.circle;
        circle && config.point_focus_expand_enabled &&
            $$.expandCircles(index, id, reset);
        // bar, candlestick
        $$.expandBarTypeShapes(true, index, id, reset);
    },
    /**
     * Expand/Unexpand bar type shapes
     * @param {boolean} expand Expand or unexpand
     * @param {number} i Shape index
     * @param {string} id Data id
     * @param {boolean} reset Reset expand style
     * @private
     */
    expandBarTypeShapes: function (expand, i, id, reset) {
        if (expand === void 0) { expand = true; }
        var $$ = this;
        ["bar", "candlestick"]
            .filter(function (v) { return $$.$el[v]; })
            .forEach(function (v) {
            reset && $$.$el[v].classed($COMMON.EXPANDED, false);
            $$.getShapeByIndex(v, i, id).classed($COMMON.EXPANDED, expand);
        });
    },
    /**
     * Handle data.onover/out callback options
     * @param {boolean} isOver Over or not
     * @param {number|object} d data object
     * @private
     */
    setOverOut: function (isOver, d) {
        var $$ = this;
        var config = $$.config, _a = $$.state, hasFunnel = _a.hasFunnel, hasRadar = _a.hasRadar, hasTreemap = _a.hasTreemap, main = $$.$el.main;
        var isArcishData = isObject(d);
        // Call event handler
        if (isArcishData || d !== -1) {
            var callback_1 = config[isOver ? "data_onover" : "data_onout"].bind($$.api);
            config.color_onover && $$.setOverColor(isOver, d, isArcishData);
            if (isArcishData && "id") {
                var suffix = $$.getTargetSelectorSuffix(d.id);
                var selector = hasFunnel || hasTreemap ?
                    "".concat($COMMON.target + suffix, " .").concat($SHAPE.shape) :
                    $ARC.arc + suffix;
                callback_1(d, main.select(".".concat(selector)).node());
            }
            else if (!config.tooltip_grouped) {
                var last_1 = $$.cache.get(KEY.setOverOut) || [];
                // select based on the index
                var shapesAtIndex = main.selectAll(".".concat($SHAPE.shape, "-").concat(d))
                    .filter(function (d) {
                    return $$.isWithinShape(this, d);
                });
                // filter if has new selection
                var shape = shapesAtIndex.filter(function () {
                    var _this = this;
                    return last_1.every(function (v) { return v !== _this; });
                });
                // call onout callback
                if (!isOver || shapesAtIndex.empty() || (last_1.length === shape.size() && shape.nodes().every(function (v, i) { return v !== last_1[i]; }))) {
                    while (last_1.length) {
                        var target = last_1.pop();
                        config.data_onout.bind($$.api)(select(target).datum(), target);
                    }
                }
                // call onover callback
                shape.each(function () {
                    if (isOver) {
                        callback_1(select(this).datum(), this);
                        last_1.push(this);
                    }
                });
                $$.cache.add(KEY.setOverOut, last_1);
            }
            else {
                if (isOver) {
                    hasRadar && $$.isPointFocusOnly() ?
                        $$.showCircleFocus($$.getAllValuesOnIndex(d, true)) :
                        $$.setExpand(d, null, true);
                }
                !$$.isMultipleX() && main.selectAll(".".concat($SHAPE.shape, "-").concat(d))
                    .each(function (d) {
                    callback_1(d, this);
                });
            }
        }
    },
    /**
     * Call data.onover/out callback for touch event
     * @param {number|object} d target index or data object for Arc type
     * @private
     */
    callOverOutForTouch: function (d) {
        var $$ = this;
        var last = $$.cache.get(KEY.callOverOutForTouch);
        if (isObject(d) && last ? d.id !== last.id : (d !== last)) {
            (last || isNumber(last)) && $$.setOverOut(false, last);
            (d || isNumber(d)) && $$.setOverOut(true, d);
            $$.cache.add(KEY.callOverOutForTouch, d);
        }
    },
    /**
     * Return draggable selection function
     * @returns {Function}
     * @private
     */
    getDraggableSelection: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        return config.interaction_enabled && config.data_selection_draggable && $$.drag ?
            drag$1()
                .on("drag", function (event) {
                state.event = event;
                $$.drag(getPointer(event, this));
            })
                .on("start", function (event) {
                state.event = event;
                $$.dragstart(getPointer(event, this));
            })
                .on("end", function (event) {
                state.event = event;
                $$.dragend();
            }) :
            function () { };
    },
    /**
     * Dispatch a mouse event.
     * @private
     * @param {string} type event type
     * @param {number} index Index of eventRect
     * @param {Array} mouse x and y coordinate value
     */
    dispatchEvent: function (type, index, mouse) {
        var _a, _b;
        var $$ = this;
        var config = $$.config, _c = $$.state, eventReceiver = _c.eventReceiver, hasAxis = _c.hasAxis, hasFunnel = _c.hasFunnel, hasRadar = _c.hasRadar, hasTreemap = _c.hasTreemap, _d = $$.$el, eventRect = _d.eventRect, funnel = _d.funnel, radar = _d.radar, svg = _d.svg, treemap = _d.treemap;
        var element = (_b = (((hasFunnel || hasTreemap) && eventReceiver.rect) ||
            (hasRadar && radar.axes.select(".".concat($AXIS.axis, "-").concat(index, " text"))) || (eventRect || ((_a = $$.getArcElementByIdOrIndex) === null || _a === void 0 ? void 0 : _a.call($$, index))))) === null || _b === void 0 ? void 0 : _b.node();
        if (element) {
            var isMultipleX = $$.isMultipleX();
            var isRotated = config.axis_rotated;
            var _e = element.getBoundingClientRect(), width = _e.width, left = _e.left, top_1 = _e.top;
            if (hasAxis && !hasRadar && !isMultipleX) {
                var coords = eventReceiver.coords[index];
                if (coords) {
                    width = coords.w;
                    left += coords.x;
                    top_1 += coords.y;
                }
                else {
                    width = 0;
                    left = 0;
                    top_1 = 0;
                }
            }
            var x = left + (mouse ? mouse[0] : 0) + (isMultipleX || isRotated ? 0 : (width / 2));
            // value 4, is to adjust coordinate value set from: scale.ts - updateScales(): $$.getResettedPadding(1)
            var y = top_1 + (mouse ? mouse[1] : 0) + (isRotated ? 4 : 0);
            if (hasViewBox(svg)) {
                var ctm = getTransformCTM($$.$el.svg.node(), x, y, false);
                x = ctm.x;
                y = ctm.y;
            }
            var params = {
                screenX: x,
                screenY: y,
                clientX: x,
                clientY: y,
                bubbles: hasRadar // radar type needs to bubble up event
            };
            // for funnel and treemap event bound to <g> node
            if (hasFunnel || hasTreemap) {
                element = (funnel !== null && funnel !== void 0 ? funnel : treemap).node();
            }
            emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](element, type, params);
        }
    },
    setDragStatus: function (isDragging) {
        this.state.dragging = isDragging;
    },
    /**
     * Unbind zoom events
     * @private
     */
    unbindZoomEvent: function () {
        var $$ = this;
        var _a = $$.$el, eventRect = _a.eventRect, zoomResetBtn = _a.zoomResetBtn;
        eventRect === null || eventRect === void 0 ? void 0 : eventRect.on(".zoom wheel.zoom .drag", null);
        zoomResetBtn === null || zoomResetBtn === void 0 ? void 0 : zoomResetBtn.on("click", null).style("display", "none");
    },
    /**
     * Unbind all attached events
     * @private
     */
    unbindAllEvents: function () {
        var _a;
        var $$ = this;
        var _b = $$.$el, arcs = _b.arcs, eventRect = _b.eventRect, legend = _b.legend, region = _b.region, svg = _b.svg, treemap = _b.treemap, brush = $$.brush;
        var list = [
            "wheel",
            "click",
            "mouseover",
            "mousemove",
            "mouseout",
            "touchstart",
            "touchmove",
            "touchend",
            "touchstart.eventRect",
            "touchmove.eventRect",
            "touchend.eventRect",
            ".brush",
            ".drag",
            ".zoom",
            "wheel.zoom",
            "dblclick.zoom"
        ].join(" ");
        // detach all possible event types
        [
            svg,
            eventRect,
            region === null || region === void 0 ? void 0 : region.list,
            brush === null || brush === void 0 ? void 0 : brush.getSelection(),
            arcs === null || arcs === void 0 ? void 0 : arcs.selectAll("path"),
            legend === null || legend === void 0 ? void 0 : legend.selectAll("g"),
            treemap
        ]
            .forEach(function (v) { return v === null || v === void 0 ? void 0 : v.on(list, null); });
        (_a = $$.unbindZoomEvent) === null || _a === void 0 ? void 0 : _a.call($$);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var category = {
    /**
     * Category Name
     * @param {number} i Index number
     * @returns {string} category Name
     * @private
     */
    categoryName: function (i) {
        var _a;
        var axis_x_categories = this.config.axis_x_categories;
        return (_a = axis_x_categories === null || axis_x_categories === void 0 ? void 0 : axis_x_categories[i]) !== null && _a !== void 0 ? _a : i;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var classModule = {
    generateClass: function (prefix, targetId) {
        return " ".concat(prefix, " ").concat(prefix + this.getTargetSelectorSuffix(targetId));
    },
    /**
     * Get class string
     * @param {string} type Shape type
     * @param {boolean} withShape Get with shape prefix
     * @returns {string} Class string
     * @private
     */
    getClass: function (type, withShape) {
        var _this = this;
        var isPlural = /s$/.test(type);
        var useIdKey = /^(area|arc|line|funnel|treemap)s?$/.test(type);
        var key = isPlural ? "id" : "index";
        return function (d) {
            var data = d.data || d;
            var result = (withShape ? _this.generateClass(CLASS[isPlural ? "shapes" : "shape"], data[key]) : "") + _this.generateClass(CLASS[type], data[useIdKey ? "id" : key]);
            return result.trim();
        };
    },
    /**
     * Get chart class string
     * @param {string} type Shape type
     * @returns {string} Class string
     * @private
     */
    getChartClass: function (type) {
        var _this = this;
        return function (d) { return CLASS["chart".concat(type)] + _this.classTarget((d.data ? d.data : d).id); };
    },
    generateExtraLineClass: function () {
        var $$ = this;
        var classes = $$.config.line_classes || [];
        var ids = [];
        return function (d) {
            var _a;
            var id = d.id || ((_a = d.data) === null || _a === void 0 ? void 0 : _a.id) || d;
            if (ids.indexOf(id) < 0) {
                ids.push(id);
            }
            return classes[ids.indexOf(id) % classes.length];
        };
    },
    classRegion: function (d, i) {
        return "".concat(this.generateClass(CLASS.region, i), " ").concat("class" in d ? d.class : "");
    },
    classTarget: function (id) {
        var additionalClassSuffix = this.config.data_classes[id];
        var additionalClass = "";
        if (additionalClassSuffix) {
            additionalClass = " ".concat(CLASS.target, "-").concat(additionalClassSuffix);
        }
        return this.generateClass(CLASS.target, id) + additionalClass;
    },
    classFocus: function (d) {
        return this.classFocused(d) + this.classDefocused(d);
    },
    classFocused: function (d) {
        return " ".concat(this.state.focusedTargetIds.indexOf(d.id) >= 0 ? CLASS.focused : "");
    },
    classDefocused: function (d) {
        return " ".concat(this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? CLASS.defocused : "");
    },
    getTargetSelectorSuffix: function (targetId) {
        var targetStr = targetId || targetId === 0 ? "-".concat(targetId) : "";
        // replace control ascii(0 ~ 32) and extended ascii(127 ~ 160)
        return targetStr
            .replace(/[\x00-\x20\x7F-\xA0\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-"); // eslint-disable-line no-control-regex
    },
    selectorTarget: function (id, prefix, postfix) {
        if (prefix === void 0) { prefix = ""; }
        if (postfix === void 0) { postfix = ""; }
        var target = this.getTargetSelectorSuffix(id);
        // select target & circle
        return "".concat(prefix, ".").concat(CLASS.target + target, " ").concat(postfix, ", ").concat(prefix, ".").concat(CLASS.circles + target, " ").concat(postfix);
    },
    selectorTargets: function (idsValue, prefix) {
        var _this = this;
        var ids = idsValue || [];
        return ids.length ? ids.map(function (id) { return _this.selectorTarget(id, prefix); }) : null;
    },
    selectorLegend: function (id) {
        return ".".concat(CLASS.legendItem + this.getTargetSelectorSuffix(id));
    },
    selectorLegends: function (ids) {
        var _this = this;
        return (ids === null || ids === void 0 ? void 0 : ids.length) ? ids.map(function (id) { return _this.selectorLegend(id); }) : null;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Set pattern's background color
 * (it adds a <rect> element to simulate bg-color)
 * @param {SVGPatternElement} pattern SVG pattern element
 * @param {string} color Color string
 * @param {string} id ID to be set
 * @returns {{id: string, node: SVGPatternElement}}
 * @private
 */
var colorizePattern = function (pattern, color, id) {
    var node = select(pattern.cloneNode(true));
    node
        .attr("id", id)
        .insert("rect", ":first-child")
        .attr("width", node.attr("width"))
        .attr("height", node.attr("height"))
        .style("fill", color);
    return {
        id: id,
        node: node.node()
    };
};
/**
 * Get color pattern from CSS file
 * CSS should be defined as: background-image: url("#00c73c;#fa7171; ...");
 * @param {d3Selection} element Chart element
 * @returns {Array}
 * @private
 */
function getColorFromCss(element) {
    var cacheKey = KEY.colorPattern;
    var body = doc.body;
    var pattern = body[cacheKey];
    if (!pattern) {
        var delimiter = ";";
        var content = element
            .classed($COLOR.colorPattern, true)
            .style("background-image");
        element.classed($COLOR.colorPattern, false);
        if (content.indexOf(delimiter) > -1) {
            pattern = content
                .replace(/url[^#]*|["'()]|(\s|%20)/g, "")
                .split(delimiter)
                .map(function (v) { return v.trim().replace(/[\"'\s]/g, ""); })
                .filter(Boolean);
            body[cacheKey] = pattern;
        }
    }
    return pattern;
}
// Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)
var schemeCategory10 = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf"
];
var color = {
    generateColor: function () {
        var $$ = this;
        var $el = $$.$el, config = $$.config;
        var colors = config.data_colors;
        var callback = config.data_color;
        var ids = [];
        var pattern = notEmpty(config.color_pattern) ?
            config.color_pattern :
            scaleOrdinal(getColorFromCss($el.chart) || schemeCategory10).range();
        var originalColorPattern = pattern;
        if (isFunction(config.color_tiles)) {
            var tiles_1 = config.color_tiles.bind($$.api)();
            // Add background color to patterns
            var colorizedPatterns = pattern.map(function (p, index) {
                var color = p.replace(/[#\(\)\s,]/g, "");
                var id = "".concat($$.state.datetimeId, "-pattern-").concat(color, "-").concat(index);
                return colorizePattern(tiles_1[index % tiles_1.length], p, id);
            });
            pattern = colorizedPatterns.map(function (p) { return "url(#".concat(p.id, ")"); });
            $$.patterns = colorizedPatterns;
        }
        return function (d) {
            var _a;
            var id = d.id ||
                ((_a = d.data) === null || _a === void 0 ? void 0 : _a.id) ||
                d;
            var isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !config.data_types[id];
            var color;
            // if callback function is provided
            if (isFunction(colors[id])) {
                color = colors[id].bind($$.api)(d);
                // if specified, choose that color
            }
            else if (colors[id]) {
                color = colors[id];
                // if not specified, choose from pattern
            }
            else {
                if (ids.indexOf(id) < 0) {
                    ids.push(id);
                }
                color = isLine ?
                    originalColorPattern[ids.indexOf(id) % originalColorPattern.length] :
                    pattern[ids.indexOf(id) % pattern.length];
                colors[id] = color;
            }
            return isFunction(callback) ? callback.bind($$.api)(color, d) : color;
        };
    },
    generateLevelColor: function () {
        var $$ = this;
        var config = $$.config;
        var colors = config.color_pattern;
        var threshold = config.color_threshold;
        var asValue = threshold.unit === "value";
        var max = threshold.max || 100;
        var values = threshold.values &&
            threshold.values.length ?
            threshold.values :
            [];
        return notEmpty(threshold) ?
            function (value) {
                var v = asValue ? value : (value * 100 / max);
                var color = colors[colors.length - 1];
                for (var i = 0, l = values.length; i < l; i++) {
                    if (v <= values[i]) {
                        color = colors[i];
                        break;
                    }
                }
                return color;
            } :
            null;
    },
    /**
     * Append data backgound color filter definition
     * @param {string|object} color Color string
     * @param {object} attr filter attribute
     * @private
     */
    generateTextBGColorFilter: function (color, attr) {
        if (attr === void 0) { attr = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        }; }
        var $$ = this;
        var $el = $$.$el, state = $$.state;
        if (color) {
            var ids = [];
            if (isString(color)) {
                ids.push("");
            }
            else if (isObject(color)) {
                ids = Object.keys(color);
            }
            ids.forEach(function (v) {
                var id = "".concat(state.datetimeId, "-labels-bg").concat($$.getTargetSelectorSuffix(v)).concat(isString(color) ? $$.getTargetSelectorSuffix(color) : "");
                $el.defs.append("filter")
                    .attr("x", attr.x)
                    .attr("y", attr.y)
                    .attr("width", attr.width)
                    .attr("height", attr.height)
                    .attr("id", id)
                    .html("<feFlood flood-color=\"".concat(v === "" ? color : color[v], "\" />\n\t\t\t\t\t\t<feComposite in=\"SourceGraphic\" />"));
            });
        }
    },
    /**
     * Get data gradient color url
     * @param {string} id Data id
     * @returns {string}
     * @private
     */
    getGradienColortUrl: function (id) {
        return "url(#".concat(this.state.datetimeId, "-gradient").concat(this.getTargetSelectorSuffix(id), ")");
    },
    /**
     * Update linear/radial gradient definition
     * - linear: area & bar only
     * - radial: type which has data points only
     * @private
     */
    updateLinearGradient: function () {
        var $$ = this;
        var config = $$.config, targets = $$.data.targets, datetimeId = $$.state.datetimeId, defs = $$.$el.defs;
        targets.forEach(function (d) {
            var id = "".concat(datetimeId, "-gradient").concat($$.getTargetSelectorSuffix(d.id));
            var radialGradient = $$.hasPointType() && config.point_radialGradient;
            var supportedType = ($$.isAreaType(d) && "area") || ($$.isBarType(d) && "bar");
            if ((radialGradient || supportedType) && defs.select("#".concat(id)).empty()) {
                var color_1 = $$.color(d);
                var gradient_1 = {
                    defs: null,
                    stops: []
                };
                if (radialGradient) {
                    var _a = radialGradient.cx, cx = _a === void 0 ? 0.3 : _a, _b = radialGradient.cy, cy = _b === void 0 ? 0.3 : _b, _c = radialGradient.r, r = _c === void 0 ? 0.7 : _c, _d = radialGradient.stops, stops = _d === void 0 ? [[0.1, color_1, 0], [0.9, color_1, 1]] : _d;
                    gradient_1.stops = stops;
                    gradient_1.defs = defs.append("radialGradient")
                        .attr("id", "".concat(id))
                        .attr("cx", cx)
                        .attr("cy", cy)
                        .attr("r", r);
                }
                else {
                    var isRotated = config.axis_rotated;
                    var _e = config["".concat(supportedType, "_linearGradient")], _f = _e.x, x = _f === void 0 ? isRotated ? [1, 0] : [0, 0] : _f, _g = _e.y, y = _g === void 0 ? isRotated ? [0, 0] : [0, 1] : _g, _h = _e.stops, stops = _h === void 0 ? [[0, color_1, 1], [1, color_1, 0]] : _h;
                    gradient_1.stops = stops;
                    gradient_1.defs = defs.append("linearGradient")
                        .attr("id", "".concat(id))
                        .attr("x1", x[0])
                        .attr("x2", x[1])
                        .attr("y1", y[0])
                        .attr("y2", y[1]);
                }
                gradient_1.stops.forEach(function (v) {
                    var offset = v[0], stopColor = v[1], stopOpacity = v[2];
                    var colorValue = isFunction(stopColor) ?
                        stopColor.bind($$.api)(d.id) :
                        stopColor;
                    gradient_1.defs && gradient_1.defs.append("stop")
                        .attr("offset", offset)
                        .attr("stop-color", colorValue || color_1)
                        .attr("stop-opacity", stopOpacity);
                });
            }
        });
    },
    /**
     * Set the data over color.
     * When is out, will restate in its previous color value
     * @param {boolean} isOver true: set overed color, false: restore
     * @param {number|object} d target index or data object for Arc type
     * @private
     */
    setOverColor: function (isOver, d) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var onover = config.color_onover;
        var color = isOver ? onover : $$.color;
        if (isObject(color)) {
            color = function (_a) {
                var id = _a.id;
                return (id in onover ? onover[id] : $$.color(id));
            };
        }
        else if (isString(color)) {
            color = function () { return onover; };
        }
        else if (isFunction(onover)) {
            color = color.bind($$.api);
        }
        main.selectAll(isObject(d) ?
            // when is Arc type
            ".".concat($ARC.arc).concat($$.getTargetSelectorSuffix(d.id)) :
            ".".concat($SHAPE.shape, "-").concat(d)).style("fill", color);
    }
};

var domain = {
    getYDomainMinMax: function (targets, type) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var isMin = type === "min";
        var dataGroups = config.data_groups;
        var ids = $$.mapToIds(targets);
        var ys = $$.getValuesAsIdKeyed(targets);
        if (dataGroups.length > 0) {
            var hasValue_1 = $$["has".concat(isMin ? "Negative" : "Positive", "ValueInTargets")](targets);
            dataGroups.forEach(function (groupIds) {
                // Determine baseId
                var idsInGroup = groupIds
                    .filter(function (v) { return ids.indexOf(v) >= 0; });
                if (idsInGroup.length) {
                    var baseId_1 = idsInGroup[0];
                    var baseAxisId_1 = axis.getId(baseId_1);
                    // Initialize base value. Set to 0 if not match with the condition
                    if (hasValue_1 && ys[baseId_1]) {
                        ys[baseId_1] = ys[baseId_1]
                            .map(function (v) { return ((isMin ? v < 0 : v > 0) ? v : 0); });
                    }
                    idsInGroup
                        .filter(function (v, i) { return i > 0; })
                        .forEach(function (id) {
                        if (ys[id]) {
                            var axisId_1 = axis.getId(id);
                            ys[id].forEach(function (v, i) {
                                var val = +v;
                                var meetCondition = isMin ? val > 0 : val < 0;
                                if (axisId_1 === baseAxisId_1 && !(hasValue_1 && meetCondition)) {
                                    ys[baseId_1][i] += val;
                                }
                            });
                        }
                    });
                }
            });
        }
        return getMinMax$1(type, Object.keys(ys).map(function (key) { return getMinMax$1(type, ys[key]); }));
    },
    /**
     * Check if hidden targets bound to the given axis id
     * @param {string} id ID to be checked
     * @returns {boolean}
     * @private
     */
    isHiddenTargetWithYDomain: function (id) {
        var $$ = this;
        return $$.state.hiddenTargetIds
            .some(function (v) { return $$.axis.getId(v) === id; });
    },
    getYDomain: function (targets, axisId, xDomain) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, scale = $$.scale;
        var pfx = "axis_".concat(axisId);
        if ($$.isStackNormalized()) {
            return [0, 100];
        }
        var isLog = (scale === null || scale === void 0 ? void 0 : scale[axisId]) && scale[axisId].type === "log";
        var targetsByAxisId = targets.filter(function (t) { return axis.getId(t.id) === axisId; });
        var yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;
        if (yTargets.length === 0) { // use domain of the other axis if target of axisId is none
            if ($$.isHiddenTargetWithYDomain(axisId)) {
                return scale[axisId].domain();
            }
            else {
                return axisId === "y2" ?
                    scale.y.domain() : // When all data bounds to y2, y Axis domain is called prior y2.
                    // So, it needs to call to get y2 domain here
                    $$.getYDomain(targets, "y2", xDomain);
            }
        }
        var yMin = config["".concat(pfx, "_min")];
        var yMax = config["".concat(pfx, "_max")];
        var center = config["".concat(pfx, "_center")];
        var isInverted = config["".concat(pfx, "_inverted")];
        var showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated;
        var showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;
        var yDomainMin = $$.getYDomainMinMax(yTargets, "min");
        var yDomainMax = $$.getYDomainMinMax(yTargets, "max");
        var isZeroBased = __spreadArray([TYPE.BAR, TYPE.BUBBLE, TYPE.SCATTER], TYPE_BY_CATEGORY.Line, true).some(function (v) {
            var type = v.indexOf("area") > -1 ? "area" : v;
            return $$.hasType(v, yTargets, true) && config["".concat(type, "_zerobased")];
        });
        // MEMO: avoid inverting domain unexpectedly
        yDomainMin = isValue(yMin) ? yMin : (isValue(yMax) ?
            (yDomainMin <= yMax ? yDomainMin : yMax - 10) :
            yDomainMin);
        yDomainMax = isValue(yMax) ? yMax : (isValue(yMin) ?
            (yMin <= yDomainMax ? yDomainMax : yMin + 10) :
            yDomainMax);
        if (isNaN(yDomainMin)) { // set minimum to zero when not number
            yDomainMin = 0;
        }
        if (isNaN(yDomainMax)) { // set maximum to have same value as yDomainMin
            yDomainMax = yDomainMin;
        }
        if (yDomainMin === yDomainMax) {
            yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
        }
        var isAllPositive = yDomainMin >= 0 && yDomainMax >= 0;
        var isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;
        // Cancel zerobased if axis_*_min / axis_*_max specified
        if ((isValue(yMin) && isAllPositive) || (isValue(yMax) && isAllNegative)) {
            isZeroBased = false;
        }
        // Bar/Area chart should be 0-based if all positive|negative
        if (isZeroBased) {
            isAllPositive && (yDomainMin = 0);
            isAllNegative && (yDomainMax = 0);
        }
        var domainLength = Math.abs(yDomainMax - yDomainMin);
        var padding = { top: domainLength * 0.1, bottom: domainLength * 0.1 };
        if (isDefined(center)) {
            var yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
            yDomainMax = center + yDomainAbs;
            yDomainMin = center - yDomainAbs;
        }
        // add padding for data label
        if (showHorizontalDataLabel) {
            var diff_1 = diffDomain(scale.y.range());
            var ratio_1 = $$.getDataLabelLength(yDomainMin, yDomainMax, "width")
                .map(function (v) { return v / diff_1; });
            ["bottom", "top"].forEach(function (v, i) {
                padding[v] += domainLength * (ratio_1[i] / (1 - ratio_1[0] - ratio_1[1]));
            });
        }
        else if (showVerticalDataLabel) {
            var lengths_1 = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");
            ["bottom", "top"].forEach(function (v, i) {
                padding[v] += $$.convertPixelToScale("y", lengths_1[i], domainLength);
            });
        }
        padding = $$.getResettedPadding(padding);
        // if padding is set, the domain will be updated relative the current domain value
        // ex) $$.height=300, padding.top=150, domainLength=4  --> domain=6
        var p = config["".concat(pfx, "_padding")];
        if (notEmpty(p)) {
            ["bottom", "top"].forEach(function (v) {
                padding[v] = axis.getPadding(p, v, padding[v], domainLength);
            });
        }
        // Bar/Area chart should be 0-based if all positive|negative
        if (isZeroBased) {
            isAllPositive && (padding.bottom = yDomainMin);
            isAllNegative && (padding.top = -yDomainMax);
        }
        var domain = isLog ?
            [yDomainMin, yDomainMax].map(function (v) { return (v < 0 ? 0 : v); }) :
            [yDomainMin - padding.bottom, yDomainMax + padding.top];
        return isInverted ? domain.reverse() : domain;
    },
    getXDomainMinMax: function (targets, type) {
        var _a;
        var $$ = this;
        var configValue = $$.config["axis_x_".concat(type)];
        var dataValue = getMinMax$1(type, targets.map(function (t) { return getMinMax$1(type, t.values.map(function (v) { return v.x; })); }));
        var value = isObject(configValue) ? configValue.value : configValue;
        value = isDefined(value) && ((_a = $$.axis) === null || _a === void 0 ? void 0 : _a.isTimeSeries()) ? parseDate.bind(this)(value) : value;
        if (isObject(configValue) && configValue.fit && ((type === "min" && value < dataValue) || (type === "max" && value > dataValue))) {
            value = undefined;
        }
        return isDefined(value) ? value : dataValue;
    },
    /**
     * Get x Axis padding
     * @param {Array} domain x Axis domain
     * @param {number} tickCount Tick count
     * @returns {object} Padding object values with 'left' & 'right' key
     * @private
     */
    getXDomainPadding: function (domain, tickCount) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var padding = config.axis_x_padding;
        var isTimeSeriesTickCount = axis.isTimeSeries() && tickCount;
        var diff = diffDomain(domain);
        var defaultValue;
        // determine default padding value
        if (axis.isCategorized() || isTimeSeriesTickCount) {
            defaultValue = 0;
        }
        else if ($$.hasType("bar")) {
            var maxDataCount = $$.getMaxDataCount();
            defaultValue = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
        }
        else {
            defaultValue = $$.getResettedPadding(diff * 0.01);
        }
        var _a = isNumber(padding) ?
            { left: padding, right: padding } :
            padding, _b = _a.left, left = _b === void 0 ? defaultValue : _b, _c = _a.right, right = _c === void 0 ? defaultValue : _c;
        // when the unit is pixel, convert pixels to axis scale value
        if (padding.unit === "px") {
            var domainLength = Math.abs(diff + (diff * 0.2));
            left = axis.getPadding(padding, "left", defaultValue, domainLength);
            right = axis.getPadding(padding, "right", defaultValue, domainLength);
        }
        else {
            var range = diff + left + right;
            if (isTimeSeriesTickCount && range) {
                var relativeTickWidth = (diff / tickCount) / range;
                left = left / range / relativeTickWidth;
                right = right / range / relativeTickWidth;
            }
        }
        return { left: left, right: right };
    },
    /**
     * Get x Axis domain
     * @param {Array} targets targets
     * @returns {Array} x Axis domain
     * @private
     */
    getXDomain: function (targets) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, x = $$.scale.x;
        var isInverted = config.axis_x_inverted;
        var domain = [
            $$.getXDomainMinMax(targets, "min"),
            $$.getXDomainMinMax(targets, "max")
        ];
        var _a = domain[0], min = _a === void 0 ? 0 : _a, _b = domain[1], max = _b === void 0 ? 0 : _b;
        if (x.type !== "log") {
            var isCategorized = axis.isCategorized();
            var isTimeSeries = axis.isTimeSeries();
            var padding = $$.getXDomainPadding(domain);
            var firstX = domain[0], lastX = domain[1];
            // show center of x domain if min and max are the same
            if ((firstX - lastX) === 0 && !isCategorized) {
                if (isTimeSeries) {
                    firstX = new Date(firstX.getTime() * 0.5);
                    lastX = new Date(lastX.getTime() * 1.5);
                }
                else {
                    firstX = firstX === 0 ? 1 : (firstX * 0.5);
                    lastX = lastX === 0 ? -1 : (lastX * 1.5);
                }
            }
            if (firstX || firstX === 0) {
                min = isTimeSeries ?
                    new Date(firstX.getTime() - padding.left) :
                    firstX - padding.left;
            }
            if (lastX || lastX === 0) {
                max = isTimeSeries ?
                    new Date(lastX.getTime() + padding.right) :
                    lastX + padding.right;
            }
        }
        return isInverted ? [max, min] : [min, max];
    },
    updateXDomain: function (targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
        var _a;
        var $$ = this;
        var config = $$.config, org = $$.org, _b = $$.scale, x = _b.x, subX = _b.subX;
        var zoomEnabled = config.zoom_enabled;
        if (withUpdateOrgXDomain) {
            x.domain(domain || sortValue($$.getXDomain(targets), !config.axis_x_inverted));
            org.xDomain = x.domain();
            // zoomEnabled && $$.zoom.updateScaleExtent();
            subX.domain(x.domain());
            (_a = $$.brush) === null || _a === void 0 ? void 0 : _a.scale(subX);
        }
        if (withUpdateXDomain) {
            var domainValue = domain || (!$$.brush || brushEmpty($$)) ?
                org.xDomain :
                getBrushSelection($$).map(subX.invert);
            x.domain(domainValue);
            // zoomEnabled && $$.zoom.updateScaleExtent();
        }
        if (withUpdateOrgXDomain || withUpdateXDomain) {
            zoomEnabled && $$.zoom.updateScaleExtent();
        }
        // Trim domain when too big by zoom mousemove event
        withTrim && x.domain($$.trimXDomain(x.orgDomain()));
        return x.domain();
    },
    /**
     * Trim x domain when given domain surpasses the range
     * @param {Array} domain Domain value
     * @returns {Array} Trimed domain if given domain is out of range
     * @private
     */
    trimXDomain: function (domain) {
        var $$ = this;
        var isInverted = $$.config.axis_x_inverted;
        var zoomDomain = $$.getZoomDomain();
        var min = zoomDomain[0], max = zoomDomain[1];
        if (isInverted ? domain[0] >= min : domain[0] <= min) {
            domain[1] = +domain[1] + (min - domain[0]);
            domain[0] = min;
        }
        if (isInverted ? domain[1] <= max : domain[1] >= max) {
            domain[0] = +domain[0] - (domain[1] - max);
            domain[1] = max;
        }
        return domain;
    },
    /**
     * Get subchart/zoom domain
     * @param {string} type "subX" or "zoom"
     * @param {boolean} getCurrent Get current domain if true
     * @returns {Array} zoom domain
     * @private
     */
    getZoomDomain: function (type, getCurrent) {
        if (type === void 0) { type = "zoom"; }
        if (getCurrent === void 0) { getCurrent = false; }
        var $$ = this;
        var config = $$.config, scale = $$.scale, org = $$.org;
        var _a = getCurrent && scale[type] ? scale[type].domain() : org.xDomain, min = _a[0], max = _a[1];
        if (type === "zoom") {
            if (isDefined(config.zoom_x_min)) {
                min = getMinMax$1("min", [min, config.zoom_x_min]);
            }
            if (isDefined(config.zoom_x_max)) {
                max = getMinMax$1("max", [max, config.zoom_x_max]);
            }
        }
        return [min, max];
    },
    /**
     * Return zoom domain from given domain
     * - 'category' type need to add offset to original value
     * @param {Array} domainValue domain value
     * @returns {Array} Zoom domain
     * @private
     */
    getZoomDomainValue: function (domainValue) {
        var $$ = this;
        var config = $$.config, axis = $$.axis;
        if (axis.isCategorized() && Array.isArray(domainValue)) {
            var isInverted_1 = config.axis_x_inverted;
            // need to add offset to original value for 'category' type
            var domain = domainValue.map(function (v, i) {
                return Number(v) + (i === 0 ? +isInverted_1 : +!isInverted_1);
            });
            return domain;
        }
        return domainValue;
    },
    /**
     * Converts pixels to axis' scale values
     * @param {string} type Axis type
     * @param {number} pixels Pixels
     * @param {number} domainLength Domain length
     * @returns {number}
     * @private
     */
    convertPixelToScale: function (type, pixels, domainLength) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var length;
        if (type === "x") {
            length = isRotated ? "height" : "width";
        }
        else {
            length = isRotated ? "width" : "height";
        }
        return domainLength * (pixels / state[length]);
    },
    /**
     * Check if the given domain is within subchart/zoom range
     * @param {Array} domain Target domain value
     * @param {Array} current Current subchart/zoom domain value
     * @param {Array} range subchart/zoom range value
     * @returns {boolean}
     * @private
     */
    withinRange: function (domain, current, range) {
        if (current === void 0) { current = [0, 0]; }
        var $$ = this;
        var isInverted = $$.config.axis_x_inverted;
        var _a = range, min = _a[0], max = _a[1];
        if (Array.isArray(domain)) {
            var target = __spreadArray([], domain, true);
            isInverted && target.reverse();
            if (target[0] < target[1]) {
                return domain.every(function (v, i) {
                    return (i === 0 ?
                        (isInverted ? +v <= min : +v >= min) :
                        (isInverted ? +v >= max : +v <= max)) && !(domain.every(function (v, i) { return v === current[i]; }));
                });
            }
        }
        return false;
    }
};

/**
 * Get formatted
 * @param {object} $$ Context
 * @param {string} typeValue Axis type
 * @param {number} v Value to be formatted
 * @returns {number | string}
 * @private
 */
function getFormat($$, typeValue, v) {
    var config = $$.config;
    var type = "axis_".concat(typeValue, "_tick_format");
    var format = config[type] ? config[type] : $$.defaultValueFormat;
    return format.call($$.api, v);
}
var format = {
    yFormat: function (v) {
        return getFormat(this, "y", v);
    },
    y2Format: function (v) {
        return getFormat(this, "y2", v);
    },
    /**
     * Get default value format function
     * @returns {Function} formatter function
     * @private
     */
    getDefaultValueFormat: function () {
        var $$ = this;
        var defaultArcValueFormat = $$.defaultArcValueFormat, yFormat = $$.yFormat, y2Format = $$.y2Format;
        var hasArc = $$.hasArcType(null, ["gauge", "polar", "radar"]);
        return function (v, ratio, id) {
            var format = hasArc ? defaultArcValueFormat : ($$.axis && $$.axis.getId(id) === "y2" ? y2Format : yFormat);
            return format.call($$, v, ratio);
        };
    },
    defaultValueFormat: function (v) {
        return isArray(v) ? v.join("~") : (isValue(v) ? +v : "");
    },
    defaultArcValueFormat: function (v, ratio) {
        return "".concat((ratio * 100).toFixed(1), "%");
    },
    defaultPolarValueFormat: function (v) {
        return "".concat(v);
    },
    dataLabelFormat: function (targetId) {
        var $$ = this;
        var dataLabels = $$.config.data_labels;
        var defaultFormat = function (v) {
            var delimiter = "~";
            var res = v;
            if (isArray(v)) {
                res = v.join(delimiter);
            }
            else if (isObject(v)) {
                res = Object.values(v).join(delimiter);
            }
            return res;
        };
        var format = defaultFormat;
        // find format according to axis id
        if (isFunction(dataLabels.format)) {
            format = dataLabels.format;
        }
        else if (isObjectType(dataLabels.format)) {
            if (dataLabels.format[targetId]) {
                format = dataLabels.format[targetId] === true ?
                    defaultFormat :
                    dataLabels.format[targetId];
            }
            else {
                format = function () { return ""; };
            }
        }
        return format.bind($$.api);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get color string for given data id
 * @param {string} id Data id
 * @returns {string} Color string
 * @private
 */
function getLegendColor(id) {
    var $$ = this;
    var data = $$.getDataById(id);
    var color = $$.levelColor ? $$.levelColor(data.values[0].value) : $$.color(data);
    return color;
}
/**
 * Get formatted text value
 * @param {string} id Legend text id
 * @param {boolean} formatted Whether or not to format the text
 * @returns {string} Formatted legend text
 */
function getFormattedText(id, formatted) {
    var _a;
    if (formatted === void 0) { formatted = true; }
    var config = this.config;
    var text = (_a = config.data_names[id]) !== null && _a !== void 0 ? _a : id;
    if (formatted && isFunction(config.legend_format)) {
        text = config.legend_format(text, id !== text ? id : undefined);
    }
    return text;
}
var legend$1 = {
    /**
     * Initialize the legend.
     * @private
     */
    initLegend: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        $$.legendItemTextBox = {};
        $$.state.legendHasRendered = false;
        if (config.legend_show) {
            if (!config.legend_contents_bindto) {
                $el.legend = $$.$el.svg.append("g")
                    .classed($LEGEND.legend, true)
                    .attr("transform", $$.getTranslate("legend"));
            }
            // MEMO: call here to update legend box and translate for all
            // MEMO: translate will be updated by this, so transform not needed in updateLegend()
            $$.updateLegend();
        }
        else {
            $$.state.hiddenLegendIds = $$.mapToIds($$.data.targets);
        }
    },
    /**
     * Update legend element
     * @param {Array} targetIds ID's of target
     * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
     * @param {object} transitions Return value of the generateTransitions
     * @private
     */
    updateLegend: function (targetIds, options, transitions) {
        var _a;
        var $$ = this;
        var config = $$.config, state = $$.state, scale = $$.scale, $el = $$.$el;
        var optionz = options || {
            withTransform: false,
            withTransitionForTransform: false,
            withTransition: false
        };
        optionz.withTransition = getOption(optionz, "withTransition", true);
        optionz.withTransitionForTransform = getOption(optionz, "withTransitionForTransform", true);
        if (config.legend_contents_bindto && config.legend_contents_template) {
            $$.updateLegendTemplate();
        }
        else if (!state.hasTreemap) {
            $$.updateLegendElement(targetIds || $$.mapToIds($$.data.targets), optionz, transitions);
        }
        // toggle legend state
        (_a = $el.legend) === null || _a === void 0 ? void 0 : _a.selectAll(".".concat($LEGEND.legendItem)).classed($LEGEND.legendItemHidden, function (id) {
            var hide = !$$.isTargetToShow(id);
            if (hide) {
                this.style.opacity = null;
            }
            return hide;
        });
        // Update size and scale
        $$.updateScales(false, !scale.zoom);
        $$.updateSvgSize();
        // Update g positions
        $$.transformAll(optionz.withTransitionForTransform, transitions);
        state.legendHasRendered = true;
    },
    /**
     * Update legend using template option
     * @private
     */
    updateLegendTemplate: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var wrapper = select(config.legend_contents_bindto);
        var template = config.legend_contents_template;
        if (!wrapper.empty()) {
            var targets = $$.mapToIds($$.data.targets);
            var ids_1 = [];
            var html_1 = "";
            targets.forEach(function (v) {
                var content = isFunction(template) ?
                    template.bind($$.api)(v, $$.color(v), $$.api.data(v)[0].values) :
                    tplProcess(template, {
                        COLOR: $$.color(v),
                        TITLE: v
                    });
                if (content) {
                    ids_1.push(v);
                    html_1 += content;
                }
            });
            var legendItem = wrapper.html(html_1)
                .selectAll(function () {
                return this.childNodes;
            })
                .data(ids_1);
            $$.setLegendItem(legendItem);
            $el.legend = wrapper;
        }
    },
    /**
     * Update the size of the legend.
     * @param {Obejct} size Size object
     * @private
     */
    updateSizeForLegend: function (size) {
        var $$ = this;
        var config = $$.config, _a = $$.state, isLegendTop = _a.isLegendTop, isLegendLeft = _a.isLegendLeft, isLegendRight = _a.isLegendRight, isLegendInset = _a.isLegendInset, current = _a.current;
        var width = size.width, height = size.height;
        var insetLegendPosition = {
            top: isLegendTop ?
                $$.getCurrentPaddingByDirection("top") + config.legend_inset_y + 5.5 :
                current.height - height - $$.getCurrentPaddingByDirection("bottom") -
                    config.legend_inset_y,
            left: isLegendLeft ?
                $$.getCurrentPaddingByDirection("left") + config.legend_inset_x + 0.5 :
                current.width - width - $$.getCurrentPaddingByDirection("right") -
                    config.legend_inset_x + 0.5
        };
        $$.state.margin3 = {
            top: isLegendRight ?
                0 :
                isLegendInset ?
                    insetLegendPosition.top :
                    current.height - height,
            right: NaN,
            bottom: 0,
            left: isLegendRight ?
                current.width - width :
                isLegendInset ?
                    insetLegendPosition.left :
                    0
        };
    },
    /**
     * Transform Legend
     * @param {boolean} withTransition whether or not to transition.
     * @private
     */
    transformLegend: function (withTransition) {
        var $$ = this;
        var legend = $$.$el.legend, $T = $$.$T;
        $T(legend, withTransition)
            .attr("transform", $$.getTranslate("legend"));
    },
    /**
     * Update the legend step
     * @param {number} step Step value
     * @private
     */
    updateLegendStep: function (step) {
        this.state.legendStep = step;
    },
    /**
     * Update legend item width
     * @param {number} width Width value
     * @private
     */
    updateLegendItemWidth: function (width) {
        this.state.legendItemWidth = width;
    },
    /**
     * Update legend item height
     * @param {number} height Height value
     * @private
     */
    updateLegendItemHeight: function (height) {
        this.state.legendItemHeight = height;
    },
    /**
     * Update legend item color
     * @param {string} id Corresponding data ID value
     * @param {string} color Color value
     * @private
     */
    updateLegendItemColor: function (id, color) {
        var legend = this.$el.legend;
        if (legend) {
            legend.select(".".concat($LEGEND.legendItem, "-").concat(id, " line"))
                .style("stroke", color);
        }
    },
    /**
     * Get the width of the legend
     * @returns {number} width
     * @private
     */
    getLegendWidth: function () {
        var $$ = this;
        var _a = $$.state, width = _a.current.width, isLegendRight = _a.isLegendRight, isLegendInset = _a.isLegendInset, legendItemWidth = _a.legendItemWidth, legendStep = _a.legendStep;
        return $$.config.legend_show ?
            (isLegendRight || isLegendInset ? legendItemWidth * (legendStep + 1) : width) :
            0;
    },
    /**
     * Get the height of the legend
     * @returns {number} height
     * @private
     */
    getLegendHeight: function () {
        var _a;
        var $$ = this;
        var _b = $$.state, current = _b.current, isLegendRight = _b.isLegendRight, legendItemHeight = _b.legendItemHeight, legendStep = _b.legendStep;
        var isFitPadding = ((_a = $$.config.padding) === null || _a === void 0 ? void 0 : _a.mode) === "fit";
        var height = $$.config.legend_show ?
            (isLegendRight ? current.height : (Math.max(isFitPadding ? 10 : 20, legendItemHeight)) * (legendStep + 1)) :
            0;
        return height;
    },
    /**
     * Get the opacity of the legend that is unfocused
     * @param {d3.selection} legendItem Legend item node
     * @returns {string|null} opacity
     * @private
     */
    opacityForUnfocusedLegend: function (legendItem) {
        return legendItem.classed($LEGEND.legendItemHidden) ? null : "0.3";
    },
    /**
     * Toggles the focus of the legend
     * @param {Array} targetIds ID's of target
     * @param {boolean} focus whether or not to focus.
     * @private
     */
    toggleFocusLegend: function (targetIds, focus) {
        var $$ = this;
        var legend = $$.$el.legend, $T = $$.$T;
        var targetIdz = $$.mapToTargetIds(targetIds);
        legend && $T(legend.selectAll(".".concat($LEGEND.legendItem))
            .filter(function (id) { return targetIdz.indexOf(id) >= 0; })
            .classed($FOCUS.legendItemFocused, focus))
            .style("opacity", function () {
            return focus ? null : $$.opacityForUnfocusedLegend.call($$, select(this));
        });
    },
    /**
     * Revert the legend to its default state
     * @private
     */
    revertLegend: function () {
        var $$ = this;
        var legend = $$.$el.legend, $T = $$.$T;
        legend && $T(legend.selectAll(".".concat($LEGEND.legendItem))
            .classed($FOCUS.legendItemFocused, false))
            .style("opacity", null);
    },
    /**
     * Shows the legend
     * @param {Array} targetIds ID's of target
     * @private
     */
    showLegend: function (targetIds) {
        var $$ = this;
        var config = $$.config, $el = $$.$el, $T = $$.$T;
        if (!config.legend_show) {
            config.legend_show = true;
            $el.legend ? $el.legend.style("visibility", null) : $$.initLegend();
            !$$.state.legendHasRendered && $$.updateLegend();
        }
        $$.removeHiddenLegendIds(targetIds);
        $T($el.legend.selectAll($$.selectorLegends(targetIds))
            .style("visibility", null)).style("opacity", null);
    },
    /**
     * Hide the legend
     * @param {Array} targetIds ID's of target
     * @private
     */
    hideLegend: function (targetIds) {
        var $$ = this;
        var config = $$.config, legend = $$.$el.legend;
        if (config.legend_show && isEmpty(targetIds)) {
            config.legend_show = false;
            legend.style("visibility", "hidden");
        }
        $$.addHiddenLegendIds(targetIds);
        legend.selectAll($$.selectorLegends(targetIds))
            .style("opacity", "0")
            .style("visibility", "hidden");
    },
    /**
     * Get legend item textbox dimension
     * @param {string} id Data ID
     * @param {HTMLElement|d3.selection} textElement Text node element
     * @returns {object} Bounding rect
     * @private
     */
    getLegendItemTextBox: function (id, textElement) {
        var $$ = this;
        var cache = $$.cache, state = $$.state;
        var data;
        // do not prefix w/'$', to not be resetted cache in .load() call
        var cacheKey = KEY.legendItemTextBox;
        if (id) {
            data = (!state.redrawing && cache.get(cacheKey)) || {};
            if (!data[id]) {
                data[id] = $$.getTextRect(textElement, $LEGEND.legendItem);
                cache.add(cacheKey, data);
            }
            data = data[id];
        }
        return data;
    },
    /**
     * Set legend item style & bind events
     * @param {d3.selection} item Item node
     * @private
     */
    setLegendItem: function (item) {
        var $$ = this;
        var $el = $$.$el, api = $$.api, config = $$.config, state = $$.state;
        var isTouch = state.inputType === "touch";
        var hasGauge = $$.hasType("gauge");
        var useCssRule = config.boost_useCssRule;
        var interaction = config.legend_item_interaction;
        item
            .attr("class", function (id) {
            var node = select(this);
            var itemClass = (!node.empty() && node.attr("class")) || "";
            return itemClass + $$.generateClass($LEGEND.legendItem, id);
        })
            .style("visibility", function (id) { return ($$.isLegendToShow(id) ? null : "hidden"); });
        if (config.interaction_enabled) {
            if (useCssRule) {
                [
                    [".".concat($LEGEND.legendItem), "cursor:pointer"],
                    [".".concat($LEGEND.legendItem, " text"), "pointer-events:none"],
                    [".".concat($LEGEND.legendItemPoint, " text"), "pointer-events:none"],
                    [".".concat($LEGEND.legendItemTile), "pointer-events:none"],
                    [".".concat($LEGEND.legendItemEvent), "fill-opacity:0"]
                ].forEach(function (v) {
                    var selector = v[0], props = v[1];
                    $$.setCssRule(false, selector, [props])($el.legend);
                });
            }
            item
                .on(interaction.dblclick ? "dblclick" : "click", interaction || isFunction(config.legend_item_onclick) ?
                function (event, id) {
                    if (!callFn(config.legend_item_onclick, api, id, !state.hiddenTargetIds.includes(id))) {
                        var altKey = event.altKey, target = event.target, type = event.type;
                        if (type === "dblclick" || altKey) {
                            // when focused legend is clicked(with altKey or double clicked), reset all hiding.
                            if (state.hiddenTargetIds.length &&
                                target.parentNode.getAttribute("class").indexOf($LEGEND.legendItemHidden) === -1) {
                                api.show();
                            }
                            else {
                                api.hide();
                                api.show(id);
                            }
                        }
                        else {
                            api.toggle(id);
                            select(this)
                                .classed($FOCUS.legendItemFocused, false);
                        }
                    }
                    isTouch && $$.hideTooltip();
                } :
                null);
            !isTouch && item
                .on("mouseout", interaction || isFunction(config.legend_item_onout) ?
                function (event, id) {
                    if (!callFn(config.legend_item_onout, api, id, !state.hiddenTargetIds.includes(id))) {
                        select(this).classed($FOCUS.legendItemFocused, false);
                        if (hasGauge) {
                            $$.undoMarkOverlapped($$, ".".concat($GAUGE.gaugeValue));
                        }
                        $$.api.revert();
                    }
                } :
                null)
                .on("mouseover", interaction || isFunction(config.legend_item_onover) ?
                function (event, id) {
                    if (!callFn(config.legend_item_onover, api, id, !state.hiddenTargetIds.includes(id))) {
                        select(this).classed($FOCUS.legendItemFocused, true);
                        if (hasGauge) {
                            $$.markOverlapped(id, $$, ".".concat($GAUGE.gaugeValue));
                        }
                        if (!state.transiting && $$.isTargetToShow(id)) {
                            api.focus(id);
                        }
                    }
                } :
                null);
            // set cursor when has some interaction
            !item.empty() && item.on("click mouseout mouseover") &&
                item.style("cursor", $$.getStylePropValue("pointer"));
        }
    },
    /**
     * Update the legend
     * @param {Array} targetIds ID's of target
     * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
     * @private
     */
    updateLegendElement: function (targetIds, options) {
        var $$ = this;
        var config = $$.config, state = $$.state, legend = $$.$el.legend, $T = $$.$T;
        var legendType = config.legend_item_tile_type;
        var isRectangle = legendType !== "circle";
        var legendItemR = config.legend_item_tile_r;
        var itemTileSize = {
            width: isRectangle ? config.legend_item_tile_width : legendItemR * 2,
            height: isRectangle ? config.legend_item_tile_height : legendItemR * 2
        };
        var dimension = {
            padding: {
                top: 4,
                right: 10
            },
            max: {
                width: 0,
                height: 0
            },
            posMin: 10,
            step: 0,
            tileWidth: itemTileSize.width + 5,
            totalLength: 0
        };
        var sizes = {
            offsets: {},
            widths: {},
            heights: {},
            margins: [0],
            steps: {}
        };
        var xForLegend;
        var yForLegend;
        var background;
        // Skip elements when their name is set to null
        var targetIdz = targetIds
            .filter(function (id) { return !isDefined(config.data_names[id]) || config.data_names[id] !== null; });
        var withTransition = options.withTransition;
        var updatePositions = $$.getUpdateLegendPositions(targetIdz, dimension, sizes);
        if (state.isLegendInset) {
            dimension.step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
            $$.updateLegendStep(dimension.step);
        }
        if (state.isLegendRight) {
            xForLegend = function (id) { return dimension.max.width * sizes.steps[id]; };
            yForLegend = function (id) { return sizes.margins[sizes.steps[id]] + sizes.offsets[id]; };
        }
        else if (state.isLegendInset) {
            xForLegend = function (id) { return dimension.max.width * sizes.steps[id] + 10; };
            yForLegend = function (id) { return sizes.margins[sizes.steps[id]] + sizes.offsets[id]; };
        }
        else {
            xForLegend = function (id) { return sizes.margins[sizes.steps[id]] + sizes.offsets[id]; };
            yForLegend = function (id) { return dimension.max.height * sizes.steps[id]; };
        }
        var posFn = {
            xText: function (id, i) { return xForLegend(id, i) + 4 + itemTileSize.width; },
            xRect: function (id, i) { return xForLegend(id, i); },
            x1Tile: function (id, i) { return xForLegend(id, i) - 2; },
            x2Tile: function (id, i) { return xForLegend(id, i) - 2 + itemTileSize.width; },
            yText: function (id, i) { return yForLegend(id, i) + 9; },
            yRect: function (id, i) { return yForLegend(id, i) - 5; },
            yTile: function (id, i) { return yForLegend(id, i) + 4; }
        };
        $$.generateLegendItem(targetIdz, itemTileSize, updatePositions, posFn);
        // Set background for inset legend
        background = legend.select(".".concat($LEGEND.legendBackground, " rect"));
        if (state.isLegendInset && dimension.max.width > 0 && background.size() === 0) {
            background = legend.insert("g", ".".concat($LEGEND.legendItem))
                .attr("class", $LEGEND.legendBackground)
                .append("rect");
        }
        if (config.legend_tooltip) {
            legend.selectAll("title")
                .data(targetIdz)
                .text(function (id) { return getFormattedText.bind($$)(id, false); });
        }
        var texts = legend.selectAll("text")
            .data(targetIdz)
            .text(function (id) { return getFormattedText.bind($$)(id); }) // MEMO: needed for update
            .each(function (id, i) {
            updatePositions(this, id, i);
        });
        $T(texts, withTransition)
            .attr("x", posFn.xText)
            .attr("y", posFn.yText);
        var rects = legend.selectAll("rect.".concat($LEGEND.legendItemEvent))
            .data(targetIdz);
        $T(rects, withTransition)
            .attr("width", function (id) { return sizes.widths[id]; })
            .attr("height", function (id) { return sizes.heights[id]; })
            .attr("x", posFn.xRect)
            .attr("y", posFn.yRect);
        // update legend items position
        $$.updateLegendItemPos(targetIdz, withTransition, posFn);
        if (background) {
            $T(background, withTransition)
                .attr("height", $$.getLegendHeight() - 12)
                .attr("width", dimension.max.width * (dimension.step + 1) + 10);
        }
        // Update all to reflect change of legend
        $$.updateLegendItemWidth(dimension.max.width);
        $$.updateLegendItemHeight(dimension.max.height);
        $$.updateLegendStep(dimension.step);
    },
    /**
     * Get position update function
     * @param {Array} targetIdz Data ids
     * @param {object} dimension Dimension object
     * @param {object} sizes Size object
     * @returns {Function} Update position function
     * @private
     */
    getUpdateLegendPositions: function (targetIdz, dimension, sizes) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isLegendRightOrInset = state.isLegendRight || state.isLegendInset;
        return function (textElement, id, index) {
            var reset = index === 0;
            var isLast = index === targetIdz.length - 1;
            var box = $$.getLegendItemTextBox(id, textElement);
            var itemWidth = box.width + dimension.tileWidth +
                (isLast && !isLegendRightOrInset ? 0 : dimension.padding.right) +
                config.legend_padding;
            var itemHeight = box.height + dimension.padding.top;
            var itemLength = isLegendRightOrInset ? itemHeight : itemWidth;
            var areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
            var margin;
            // MEMO: care about condifion of step, totalLength
            var updateValues = function (id2, withoutStep) {
                if (!withoutStep) {
                    margin = (areaLength - dimension.totalLength - itemLength) / 2;
                    if (margin < dimension.posMin) {
                        margin = (areaLength - itemLength) / 2;
                        dimension.totalLength = 0;
                        dimension.step++;
                    }
                }
                sizes.steps[id2] = dimension.step;
                sizes.margins[dimension.step] = state.isLegendInset ? 10 : margin;
                sizes.offsets[id2] = dimension.totalLength;
                dimension.totalLength += itemLength;
            };
            if (reset) {
                dimension.totalLength = 0;
                dimension.step = 0;
                dimension.max.width = 0;
                dimension.max.height = 0;
            }
            if (config.legend_show && !$$.isLegendToShow(id)) {
                sizes.widths[id] = 0;
                sizes.heights[id] = 0;
                sizes.steps[id] = 0;
                sizes.offsets[id] = 0;
                return;
            }
            sizes.widths[id] = itemWidth;
            sizes.heights[id] = itemHeight;
            if (!dimension.max.width || itemWidth >= dimension.max.width) {
                dimension.max.width = itemWidth;
            }
            if (!dimension.max.height || itemHeight >= dimension.max.height) {
                dimension.max.height = itemHeight;
            }
            var maxLength = isLegendRightOrInset ? dimension.max.height : dimension.max.width;
            if (config.legend_equally) {
                Object.keys(sizes.widths).forEach(function (id2) { return (sizes.widths[id2] = dimension.max.width); });
                Object.keys(sizes.heights).forEach(function (id2) { return (sizes.heights[id2] = dimension.max.height); });
                margin = (areaLength - maxLength * targetIdz.length) / 2;
                if (margin < dimension.posMin) {
                    dimension.totalLength = 0;
                    dimension.step = 0;
                    targetIdz.forEach(function (id2) { return updateValues(id2); });
                }
                else {
                    updateValues(id, true);
                }
            }
            else {
                updateValues(id);
            }
        };
    },
    /**
     * Generate legend item elements
     * @param {Array} targetIdz Data ids
     * @param {object} itemTileSize Item tile size {width, height}
     * @param {Function} updatePositions Update position function
     * @param {object} posFn Position functions
     * @private
     */
    generateLegendItem: function (targetIdz, itemTileSize, updatePositions, posFn) {
        var $$ = this;
        var config = $$.config, state = $$.state, legend = $$.$el.legend;
        var usePoint = config.legend_usePoint;
        var legendItemR = config.legend_item_tile_r;
        var legendType = config.legend_item_tile_type;
        var isRectangle = legendType !== "circle";
        var isLegendRightOrInset = state.isLegendRight || state.isLegendInset;
        var pos = -200;
        // Define g for legend area
        var l = legend.selectAll(".".concat($LEGEND.legendItem))
            .data(targetIdz)
            .enter()
            .append("g");
        $$.setLegendItem(l);
        if (config.legend_tooltip) {
            l.append("title").text(function (id) { return id; });
        }
        l.append("text")
            .text(function (id) { return getFormattedText.bind($$)(id); })
            .each(function (id, i) {
            updatePositions(this, id, i);
        })
            .style("pointer-events", $$.getStylePropValue("none"))
            .attr("x", isLegendRightOrInset ? posFn.xText : pos)
            .attr("y", isLegendRightOrInset ? pos : posFn.yText);
        l.append("rect")
            .attr("class", $LEGEND.legendItemEvent)
            .style("fill-opacity", $$.getStylePropValue("0"))
            .attr("x", isLegendRightOrInset ? posFn.xRect : pos)
            .attr("y", isLegendRightOrInset ? pos : posFn.yRect);
        if (usePoint) {
            var ids_2 = [];
            l.append(function (d) {
                var pattern = notEmpty(config.point_pattern) ?
                    config.point_pattern :
                    [config.point_type];
                ids_2.indexOf(d) === -1 && ids_2.push(d);
                var point = pattern[ids_2.indexOf(d) % pattern.length];
                if (point === "rectangle") {
                    point = "rect";
                }
                return doc.createElementNS(namespaces.svg, ("hasValidPointType" in $$) && $$.hasValidPointType(point) ? point : "use");
            })
                .attr("class", $LEGEND.legendItemPoint)
                .style("fill", getLegendColor.bind($$))
                .style("pointer-events", $$.getStylePropValue("none"))
                .attr("href", function (data, idx, selection) {
                var node = selection[idx];
                var nodeName = node.nodeName.toLowerCase();
                var id = $$.getTargetSelectorSuffix(data);
                return nodeName === "use" ? "#".concat(state.datetimeId, "-point").concat(id) : undefined;
            });
        }
        else {
            l.append(isRectangle ? "line" : legendType)
                .attr("class", $LEGEND.legendItemTile)
                .style("stroke", getLegendColor.bind($$))
                .style("pointer-events", $$.getStylePropValue("none"))
                .call(function (selection) {
                if (legendType === "circle") {
                    selection
                        .attr("r", legendItemR)
                        .style("fill", getLegendColor.bind($$))
                        .attr("cx", isLegendRightOrInset ? posFn.x2Tile : pos)
                        .attr("cy", isLegendRightOrInset ? pos : posFn.yTile);
                }
                else if (isRectangle) {
                    selection
                        .attr("stroke-width", itemTileSize.height)
                        .attr("x1", isLegendRightOrInset ? posFn.x1Tile : pos)
                        .attr("y1", isLegendRightOrInset ? pos : posFn.yTile)
                        .attr("x2", isLegendRightOrInset ? posFn.x2Tile : pos)
                        .attr("y2", isLegendRightOrInset ? pos : posFn.yTile);
                }
            });
        }
    },
    /**
     * Update legend item position
     * @param {Array} targetIdz Data ids
     * @param {boolean} withTransition Whether or not to apply transition
     * @param {object} posFn Position functions
     * @private
     */
    updateLegendItemPos: function (targetIdz, withTransition, posFn) {
        var $$ = this;
        var config = $$.config, legend = $$.$el.legend, $T = $$.$T;
        var usePoint = config.legend_usePoint;
        var legendType = config.legend_item_tile_type;
        var isRectangle = legendType !== "circle";
        if (usePoint) {
            var tiles = legend.selectAll(".".concat($LEGEND.legendItemPoint))
                .data(targetIdz);
            $T(tiles, withTransition)
                .each(function () {
                var nodeName = this.nodeName.toLowerCase();
                var pointR = config.point_r;
                var x = "x";
                var y = "y";
                var xOffset = 2;
                var yOffset = 2.5;
                var radius = null;
                var width = null;
                var height = null;
                if (nodeName === "circle") {
                    var size = pointR * 0.2;
                    x = "cx";
                    y = "cy";
                    radius = pointR + size;
                    xOffset = pointR * 2;
                    yOffset = -size;
                }
                else if (nodeName === "rect") {
                    var size = pointR * 2.5;
                    width = size;
                    height = size;
                    yOffset = 3;
                }
                select(this)
                    .attr(x, function (d) { return posFn.x1Tile(d) + xOffset; })
                    .attr(y, function (d) { return posFn.yTile(d) - yOffset; })
                    .attr("r", radius)
                    .attr("width", width)
                    .attr("height", height);
            });
        }
        else {
            var tiles = legend.selectAll(".".concat($LEGEND.legendItemTile))
                .data(targetIdz);
            $T(tiles, withTransition)
                .style("stroke", getLegendColor.bind($$))
                .call(function (selection) {
                if (legendType === "circle") {
                    selection
                        .attr("cx", function (d) {
                        var x2 = posFn.x2Tile(d);
                        return x2 - ((x2 - posFn.x1Tile(d)) / 2);
                    })
                        .attr("cy", posFn.yTile);
                }
                else if (isRectangle) {
                    selection
                        .attr("x1", posFn.x1Tile)
                        .attr("y1", posFn.yTile)
                        .attr("x2", posFn.x2Tile)
                        .attr("y2", posFn.yTile);
                }
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var redraw = {
    redraw: function (options) {
        var _a, _b, _c, _d;
        if (options === void 0) { options = {}; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var main = $el.main, treemap = $el.treemap;
        state.redrawing = true;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        var flow = options.flow, initializing = options.initializing;
        var wth = $$.getWithOption(options);
        var duration = wth.Transition ? config.transition_duration : 0;
        var durationForExit = wth.TransitionForExit ? duration : 0;
        var durationForAxis = wth.TransitionForAxis ? duration : 0;
        var transitions = (_a = $$.axis) === null || _a === void 0 ? void 0 : _a.generateTransitions(durationForAxis);
        $$.updateSizes(initializing);
        // update legend and transform each g
        if (wth.Legend && config.legend_show) {
            options.withTransition = !!duration;
            !treemap && $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
        }
        else if (wth.Dimension) {
            // need to update dimension (e.g. axis.y.tick.values) because y tick values should change
            // no need to update axis in it because they will be updated in redraw()
            $$.updateDimension(true);
        }
        // Data empty label positioning and text.
        config.data_empty_label_text && main.select("text.".concat($TEXT.text, ".").concat($COMMON.empty))
            .attr("x", state.width / 2)
            .attr("y", state.height / 2)
            .text(config.data_empty_label_text)
            .style("display", targetsToShow.length ? "none" : null);
        // update axis
        if (state.hasAxis) {
            // @TODO: Make 'init' state to be accessible everywhere not passing as argument.
            $$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);
            // grid
            $$.hasGrid() && $$.updateGrid();
            // rect for regions
            config.regions.length && $$.updateRegion();
            ["bar", "candlestick", "line", "area"].forEach(function (v) {
                var name = capitalize(v);
                if ((/^(line|area)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    $$["update".concat(name)](wth.TransitionForExit);
                }
            });
            // circles for select
            $el.text && main.selectAll(".".concat($SELECT.selectedCircles))
                .filter($$.isBarType.bind($$))
                .selectAll("circle")
                .remove();
            // event rects will redrawn when flow called
            if (config.interaction_enabled && !flow && wth.EventRect) {
                $$.redrawEventRect();
                (_b = $$.bindZoomEvent) === null || _b === void 0 ? void 0 : _b.call($$);
            }
        }
        else {
            // arc
            $el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);
            // radar
            $el.radar && $$.redrawRadar();
            // polar
            $el.polar && $$.redrawPolar();
            // funnel
            $el.funnel && $$.redrawFunnel();
            // treemap
            treemap && $$.updateTreemap(durationForExit);
        }
        if (!state.resizing && !treemap && ($$.hasPointType() || state.hasRadar)) {
            $$.updateCircle();
        }
        else if ((_c = $$.hasLegendDefsPoint) === null || _c === void 0 ? void 0 : _c.call($$)) {
            $$.data.targets.forEach($$.point("create", this));
        }
        // text
        $$.hasDataLabel() && !$$.hasArcType(null, ["radar"]) && $$.updateText();
        // title
        (_d = $$.redrawTitle) === null || _d === void 0 ? void 0 : _d.call($$);
        initializing && $$.updateTypesElements();
        $$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart);
        $$.updateTooltipOnRedraw();
        $$.callPluginHook("$redraw", options, duration);
    },
    /**
     * Generate redraw list
     * @param {object} targets targets data to be shown
     * @param {object} flow flow object
     * @param {number} duration duration value
     * @param {boolean} withSubchart whether or not to show subchart
     * @private
     */
    generateRedrawList: function (targets, flow, duration, withSubchart) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var shape = $$.getDrawShape();
        if (state.hasAxis) {
            // subchart
            config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
        }
        // generate flow
        var flowFn = flow && $$.generateFlow({
            targets: targets,
            flow: flow,
            duration: flow.duration,
            shape: shape,
            xv: $$.xv.bind($$)
        });
        var withTransition = (duration || flowFn) && isTabVisible();
        // redraw list
        var redrawList = $$.getRedrawList(shape, flow, flowFn, withTransition);
        // callback function after redraw ends
        var afterRedraw = function () {
            flowFn && flowFn();
            state.redrawing = false;
            callFn(config.onrendered, $$.api);
        };
        if (afterRedraw) {
            // Only use transition when current tab is visible.
            if (withTransition && redrawList.length) {
                // Wait for end of transitions for callback
                var waitForDraw_1 = generateWait();
                // transition should be derived from one transition
                transition().duration(duration)
                    .each(function () {
                    redrawList
                        .reduce(function (acc, t1) { return acc.concat(t1); }, [])
                        .forEach(function (t) { return waitForDraw_1.add(t); });
                })
                    .call(waitForDraw_1, afterRedraw);
            }
            else if (!state.transiting) {
                afterRedraw();
            }
        }
        // update fadein condition
        $$.mapToIds($$.data.targets).forEach(function (id) {
            state.withoutFadeIn[id] = true;
        });
    },
    getRedrawList: function (shape, flow, flowFn, withTransition) {
        var $$ = this;
        var config = $$.config, _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar, hasTreemap = _a.hasTreemap, grid = $$.$el.grid;
        var _b = shape.pos, cx = _b.cx, cy = _b.cy, xForText = _b.xForText, yForText = _b.yForText;
        var list = [];
        if (hasAxis) {
            if (config.grid_x_lines.length || config.grid_y_lines.length) {
                list.push($$.redrawGrid(withTransition));
            }
            if (config.regions.length) {
                list.push($$.redrawRegion(withTransition));
            }
            Object.keys(shape.type).forEach(function (v) {
                var name = capitalize(v);
                var drawFn = shape.type[v];
                if ((/^(area|line)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    list.push($$["redraw".concat(name)](drawFn, withTransition));
                }
            });
            !flow && grid.main && list.push($$.updateGridFocus());
        }
        if (!$$.hasArcType() || hasRadar) {
            notEmpty(config.data_labels) && config.data_labels !== false &&
                list.push($$.redrawText(xForText, yForText, flow, withTransition));
        }
        if (($$.hasPointType() || hasRadar) && !$$.isPointFocusOnly()) {
            $$.redrawCircle && list.push($$.redrawCircle(cx, cy, withTransition, flowFn));
        }
        if (hasTreemap) {
            list.push($$.redrawTreemap(withTransition));
        }
        return list;
    },
    updateAndRedraw: function (options) {
        if (options === void 0) { options = {}; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var transitions;
        // same with redraw
        options.withTransition = getOption(options, "withTransition", true);
        options.withTransform = getOption(options, "withTransform", false);
        options.withLegend = getOption(options, "withLegend", false);
        // NOT same with redraw
        options.withUpdateXDomain = true;
        options.withUpdateOrgXDomain = true;
        options.withTransitionForExit = false;
        options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition);
        // MEMO: called in updateLegend in redraw if withLegend
        if (!(options.withLegend && config.legend_show)) {
            if (state.hasAxis) {
                transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0);
            }
            // Update scales
            $$.updateScales();
            $$.updateSvgSize();
            // Update g positions
            $$.transformAll(options.withTransitionForTransform, transitions);
        }
        // Draw with new sizes & scales
        $$.redraw(options, transitions);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get scale
 * @param {string} [type='linear'] Scale type
 * @param {number|Date} [min] Min range
 * @param {number|Date} [max] Max range
 * @returns {d3.scaleLinear|d3.scaleTime} scale
 * @private
 */
function getScale(type, min, max) {
    if (type === void 0) { type = "linear"; }
    var scale = ({
        linear: scaleLinear,
        log: scaleSymlog,
        _log: scaleLog,
        time: scaleTime,
        utc: scaleUtc
    })[type]();
    scale.type = type;
    /_?log/.test(type) && scale.clamp(true);
    return scale.range([min !== null && min !== void 0 ? min : 0, max !== null && max !== void 0 ? max : 1]);
}
var scale = {
    /**
     * Get x Axis scale function
     * @param {number} min Min range value
     * @param {number} max Max range value
     * @param {Array} domain Domain value
     * @param {Function} offset The offset getter to be sum
     * @returns {Function} scale
     * @private
     */
    getXScale: function (min, max, domain, offset) {
        var $$ = this;
        var scale = ($$.state.loading !== "append" && $$.scale.zoom) ||
            getScale($$.axis.getAxisType("x"), min, max);
        return $$.getCustomizedXScale(domain ? scale.domain(domain) : scale, offset);
    },
    /**
     * Get y Axis scale function
     * @param {string} id Axis id: 'y' or 'y2'
     * @param {number} min Min value
     * @param {number} max Max value
     * @param {Array} domain Domain value
     * @returns {Function} Scale function
     * @private
     */
    getYScale: function (id, min, max, domain) {
        var $$ = this;
        var scale = getScale($$.axis.getAxisType(id), min, max);
        domain && scale.domain(domain);
        return scale;
    },
    /**
     * Get y Axis scale
     * @param {string} id Axis id
     * @param {boolean} isSub Weather is sub Axis
     * @returns {Function} Scale function
     * @private
     */
    getYScaleById: function (id, isSub) {
        var _a;
        if (isSub === void 0) { isSub = false; }
        var isY2 = ((_a = this.axis) === null || _a === void 0 ? void 0 : _a.getId(id)) === "y2";
        var key = isSub ? (isY2 ? "subY2" : "subY") : (isY2 ? "y2" : "y");
        return this.scale[key];
    },
    /**
     * Get customized x axis scale
     * @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
     * @param {Function} offsetValue Offset getter to be sum
     * @returns {Function} Scale function
     * @private
     */
    getCustomizedXScale: function (scaleValue, offsetValue) {
        var $$ = this;
        var offset = offsetValue || (function () { return $$.axis.x.tickOffset(); });
        var isInverted = $$.config.axis_x_inverted;
        /**
         * Get scaled value
         * @param {object} d Data object
         * @returns {number}
         * @private
         */
        var scale = function (d) {
            return scaleValue(d) + offset();
        };
        // copy original scale methods
        for (var key in scaleValue) {
            scale[key] = scaleValue[key];
        }
        scale.orgDomain = function () { return scaleValue.domain(); };
        scale.orgScale = function () { return scaleValue; };
        // define custom domain() for categorized axis
        if ($$.axis.isCategorized()) {
            scale.domain = function (domainValue) {
                var domain = domainValue;
                if (!arguments.length) {
                    domain = this.orgDomain();
                    return isInverted ? [domain[0] + 1, domain[1]] : [domain[0], domain[1] + 1];
                }
                scaleValue.domain(domain);
                return scale;
            };
        }
        return scale;
    },
    /**
     * Update scale
     * @param {boolean} isInit Param is given at the init rendering
     * @param {boolean} updateXDomain If update x domain
     * @private
     */
    updateScales: function (isInit, updateXDomain) {
        var _a, _b;
        if (updateXDomain === void 0) { updateXDomain = true; }
        var $$ = this;
        var axis = $$.axis, config = $$.config, format = $$.format, org = $$.org, scale = $$.scale, _c = $$.state, current = _c.current, width = _c.width, height = _c.height, width2 = _c.width2, height2 = _c.height2, hasAxis = _c.hasAxis, hasTreemap = _c.hasTreemap;
        if (hasAxis) {
            var isRotated = config.axis_rotated;
            var resettedPadding = $$.getResettedPadding(1);
            // update edges
            var min = {
                x: isRotated ? resettedPadding : 0,
                y: isRotated ? 0 : height,
                subX: isRotated ? 1 : 0,
                subY: isRotated ? 0 : height2
            };
            var max = {
                x: isRotated ? height : width,
                y: isRotated ? width : resettedPadding,
                subX: isRotated ? height : width,
                subY: isRotated ? width2 : 1
            };
            // update scales
            // x Axis
            var xDomain = updateXDomain && ((_a = scale.x) === null || _a === void 0 ? void 0 : _a.orgDomain());
            var xSubDomain = updateXDomain && org.xDomain;
            scale.x = $$.getXScale(min.x, max.x, xDomain, function () { return axis.x.tickOffset(); });
            scale.subX = $$.getXScale(min.x, max.x, xSubDomain, function (d) {
                var _a;
                return (d % 1 ? 0 : ((_a = axis.subX) !== null && _a !== void 0 ? _a : axis.x).tickOffset());
            });
            format.xAxisTick = axis.getXAxisTickFormat();
            format.subXAxisTick = axis.getXAxisTickFormat(true);
            axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);
            if (config.subchart_show) {
                axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
            }
            // y Axis
            scale.y = $$.getYScale("y", min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default);
            scale.subY = $$.getYScale("y", min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default);
            axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);
            // y2 Axis
            if (config.axis_y2_show) {
                scale.y2 = $$.getYScale("y2", min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default);
                scale.subY2 = $$.getYScale("y2", min.subY, max.subY, scale.subY2 ? scale.subY2.domain() : config.axis_y2_default);
                axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
            }
        }
        else if (hasTreemap) {
            var padding = $$.getCurrentPadding();
            scale.x = scaleLinear().rangeRound([padding.left, current.width - padding.right]);
            scale.y = scaleLinear().rangeRound([padding.top, current.height - padding.bottom]);
        }
        else {
            // update for arc
            (_b = $$.updateArc) === null || _b === void 0 ? void 0 : _b.call($$);
        }
    },
    /**
     * Get the zoom or unzoomed scaled value
     * @param {Date|number|object} d Data value
     * @returns {number|null}
     * @private
     */
    xx: function (d) {
        var $$ = this;
        var config = $$.config, _a = $$.scale, x = _a.x, zoom = _a.zoom;
        var fn = config.zoom_enabled && zoom ? zoom : x;
        return d ? fn(isValue(d.x) ? d.x : d) : null;
    },
    xv: function (d) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, _a = $$.scale, x = _a.x, zoom = _a.zoom;
        var fn = config.zoom_enabled && zoom ? zoom : x;
        var value = $$.getBaseValue(d);
        if (axis.isTimeSeries()) {
            value = parseDate.call($$, value);
        }
        else if (axis.isCategorized() && isString(value)) {
            value = config.axis_x_categories.indexOf(value);
        }
        return fn(value);
    },
    yv: function (d) {
        var $$ = this;
        var _a = $$.scale, y = _a.y, y2 = _a.y2;
        var yScale = d.axis && d.axis === "y2" ? y2 : y;
        return yScale($$.getBaseValue(d));
    },
    subxx: function (d) {
        return d ? this.scale.subX(d.x) : null;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var size = {
    /**
     * Update container size
     * @private
     */
    setContainerSize: function () {
        var $$ = this;
        var state = $$.state;
        state.current.width = $$.getCurrentWidth();
        state.current.height = $$.getCurrentHeight();
    },
    getCurrentWidth: function () {
        var $$ = this;
        return $$.config.size_width || $$.getParentWidth();
    },
    getCurrentHeight: function () {
        var $$ = this;
        var config = $$.config;
        var h = config.size_height || $$.getParentHeight();
        return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
    },
    /**
     * Get the parent rect element's size
     * @param {string} key property/attribute name
     * @returns {number}
     * @private
     */
    getParentRectValue: function (key) {
        var offsetName = "offset".concat(capitalize(key));
        var parent = this.$el.chart.node();
        var v = 0;
        while (v < 30 && parent && parent.tagName !== "BODY") {
            try {
                v = parent.getBoundingClientRect()[key];
            }
            catch (_a) {
                if (offsetName in parent) {
                    // In IE in certain cases getBoundingClientRect
                    // will cause an "unspecified error"
                    v = parent[offsetName];
                }
            }
            parent = parent.parentNode;
        }
        // Sometimes element's dimension value is incorrect(ex. flex container)
        // In this case, use body's offset instead.
        var bodySize = doc.body[offsetName];
        v > bodySize && (v = bodySize);
        return v;
    },
    getParentWidth: function () {
        return this.getParentRectValue("width");
    },
    getParentHeight: function () {
        var h = this.$el.chart.style("height");
        var height = 0;
        if (h) {
            height = /px$/.test(h) ? parseInt(h, 10) : this.getParentRectValue("height");
        }
        return height;
    },
    getSvgLeft: function (withoutRecompute) {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis, $el = $$.$el;
        var isRotated = config.axis_rotated;
        var hasLeftAxisRect = isRotated || (!isRotated && !config.axis_y_inner);
        var leftAxisClass = isRotated ? $AXIS.axisX : $AXIS.axisY;
        var leftAxis = $el.main.select(".".concat(leftAxisClass)).node();
        var leftLabel = hasAxis && config["axis_".concat(isRotated ? "x" : "y", "_label")];
        var labelWidth = 0;
        // if axis label position set to inner, exclude from the value
        if (hasAxis && (isString(leftLabel) || isString(leftLabel.text) ||
            /^inner-/.test(leftLabel === null || leftLabel === void 0 ? void 0 : leftLabel.position))) {
            var label = $el.main.select(".".concat(leftAxisClass, "-label"));
            if (!label.empty()) {
                labelWidth = label.node().getBoundingClientRect().left;
            }
        }
        var svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : { right: 0 };
        var chartRectLeft = $el.chart.node().getBoundingClientRect().left + labelWidth;
        var hasArc = $$.hasArcType();
        var svgLeft = svgRect.right - chartRectLeft -
            (hasArc ? 0 : $$.getCurrentPaddingByDirection("left", withoutRecompute));
        return svgLeft > 0 ? svgLeft : 0;
    },
    updateDimension: function (withoutAxis) {
        var _a;
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis, $el = $$.$el;
        if (hasAxis && !withoutAxis && $$.axis.x && config.axis_rotated) {
            (_a = $$.axis.subX) === null || _a === void 0 ? void 0 : _a.create($el.axis.subX);
        }
        // pass 'withoutAxis' param to not animate at the init rendering
        $$.updateScales(withoutAxis);
        $$.updateSvgSize();
        $$.transformAll(false);
    },
    updateSvgSize: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, clip = _a.clip, current = _a.current, hasAxis = _a.hasAxis, width = _a.width, height = _a.height, svg = $$.$el.svg;
        if (config.resize_auto === "viewBox") {
            svg
                .attr("viewBox", "0 0 ".concat(current.width, " ").concat(current.height));
        }
        else {
            svg
                .attr("width", current.width)
                .attr("height", current.height);
        }
        if (hasAxis) {
            var brush = svg.select(".".concat($SUBCHART.brush, " .overlay"));
            var brushSize = { width: 0, height: 0 };
            if (brush.size()) {
                brushSize.width = +brush.attr("width");
                brushSize.height = +brush.attr("height");
            }
            svg.selectAll(["#".concat(clip.id), "#".concat(clip.idGrid)])
                .select("rect")
                .attr("width", width)
                .attr("height", height);
            svg.select("#".concat(clip.idXAxis))
                .select("rect")
                .call($$.setXAxisClipPath.bind($$));
            svg.select("#".concat(clip.idYAxis))
                .select("rect")
                .call($$.setYAxisClipPath.bind($$));
            clip.idSubchart && svg.select("#".concat(clip.idSubchart))
                .select("rect")
                .attr("width", width)
                .attr("height", brushSize.height);
        }
    },
    /**
     * Get padding by the direction.
     * @param {string} type "top" | "bottom" | "left" | "right"
     * @param {boolean} [withoutRecompute=false] If set true, do not recompute the padding value.
     * @param {boolean} [withXAxisTickTextOverflow=false] If set true, calculate x axis tick text overflow.
     * @returns {number} padding value
     * @private
     */
    getCurrentPaddingByDirection: function (type, withoutRecompute, withXAxisTickTextOverflow) {
        var _a;
        if (withoutRecompute === void 0) { withoutRecompute = false; }
        if (withXAxisTickTextOverflow === void 0) { withXAxisTickTextOverflow = false; }
        var $$ = this;
        var config = $$.config, $el = $$.$el, hasAxis = $$.state.hasAxis;
        var isRotated = config.axis_rotated;
        var isFitPadding = ((_a = config.padding) === null || _a === void 0 ? void 0 : _a.mode) === "fit";
        var paddingOption = isNumber(config["padding_".concat(type)]) ?
            config["padding_".concat(type)] :
            undefined;
        var axisId = hasAxis ?
            {
                top: isRotated ? "y2" : null,
                bottom: isRotated ? "y" : "x",
                left: isRotated ? "x" : "y",
                right: isRotated ? null : "y2"
            }[type] :
            null;
        var isLeftRight = /^(left|right)$/.test(type);
        var isAxisInner = axisId && config["axis_".concat(axisId, "_inner")];
        var isAxisShow = axisId && config["axis_".concat(axisId, "_show")];
        var axesLen = axisId ? config["axis_".concat(axisId, "_axes")].length : 0;
        var axisSize = axisId ?
            (isLeftRight ?
                $$.getAxisWidthByAxisId(axisId, withoutRecompute) :
                $$.getHorizontalAxisHeight(axisId)) :
            0;
        var defaultPadding = 20;
        var gap = 0;
        if (!isFitPadding && isLeftRight) {
            axisSize = ceil10(axisSize);
        }
        var padding = hasAxis && isLeftRight && (isAxisInner || (isUndefined(paddingOption) && !isAxisShow)) ?
            0 :
            (isFitPadding ? (isAxisShow ? axisSize : 0) + (paddingOption !== null && paddingOption !== void 0 ? paddingOption : 0) : (isUndefined(paddingOption) ? axisSize : paddingOption));
        if (isLeftRight && hasAxis) {
            if (axisId && (isFitPadding || isAxisInner) && config["axis_".concat(axisId, "_label")].text) {
                padding += $$.axis.getAxisLabelPosition(axisId).isOuter ? defaultPadding : 0;
            }
            if (type === "right") {
                padding += isRotated ?
                    (!isFitPadding && isUndefined(paddingOption) ? 10 : 2) :
                    !isAxisShow || isAxisInner ?
                        (isFitPadding ? 2 : 1) :
                        0;
                padding += withXAxisTickTextOverflow ?
                    $$.axis.getXAxisTickTextY2Overflow(defaultPadding) :
                    0;
            }
            else if (type === "left" && isRotated && isUndefined(paddingOption)) {
                padding = !config.axis_x_show ?
                    1 :
                    (isFitPadding ? axisSize : Math.max(axisSize, 40));
            }
        }
        else {
            if (type === "top") {
                if ($el.title && $el.title.node()) {
                    padding += $$.getTitlePadding();
                }
                gap = isRotated && !isAxisInner ? axesLen : 0;
            }
            else if (type === "bottom" && hasAxis && isRotated && !isAxisShow) {
                padding += 1;
            }
        }
        // console.log(type, padding + (axisSize * axesLen) - gap)
        return padding + (axisSize * axesLen) - gap;
    },
    getCurrentPadding: function (withXAxisTickTextOverflow) {
        if (withXAxisTickTextOverflow === void 0) { withXAxisTickTextOverflow = false; }
        var $$ = this;
        var _a = ["top", "bottom", "left", "right"]
            .map(function (v) { return $$.getCurrentPaddingByDirection(v, null, withXAxisTickTextOverflow); }), top = _a[0], bottom = _a[1], left = _a[2], right = _a[3];
        return { top: top, bottom: bottom, left: left, right: right };
    },
    /**
     * Get resetted padding values when 'padding=false' option is set
     * https://github.com/naver/billboard.js/issues/2367
     * @param {number|object} v Padding values to be resetted
     * @returns {number|object} Padding value
     * @private
     */
    getResettedPadding: function (v) {
        var $$ = this;
        var config = $$.config;
        var isNum = isNumber(v);
        var p = isNum ? 0 : {};
        if (config.padding === false) {
            !isNum && Object.keys(v).forEach(function (key) {
                // when data.lables=true, do not reset top padding
                p[key] = (!isEmpty(config.data_labels) &&
                    config.data_labels !== false &&
                    key === "top") ?
                    v[key] :
                    0;
            });
        }
        else {
            p = v;
        }
        return p;
    },
    /**
     * Update size values
     * @param {boolean} isInit If is called at initialization
     * @private
     */
    updateSizes: function (isInit) {
        var _a, _b, _c, _d, _e;
        var $$ = this;
        var config = $$.config, state = $$.state, legend = $$.$el.legend;
        var isRotated = config.axis_rotated;
        var isNonAxis = $$.hasArcType() || state.hasFunnel || state.hasTreemap;
        var isFitPadding = ((_a = config.padding) === null || _a === void 0 ? void 0 : _a.mode) === "fit";
        !isInit && $$.setContainerSize();
        var currLegend = {
            width: legend ? $$.getLegendWidth() : 0,
            height: legend ? $$.getLegendHeight() : 0
        };
        if (!isNonAxis && config.axis_x_show && config.axis_x_tick_autorotate) {
            $$.updateXAxisTickClip();
        }
        var legendSize = {
            right: config.legend_show && state.isLegendRight ?
                $$.getLegendWidth() + (isFitPadding ? 0 : 20) :
                0,
            bottom: !config.legend_show || state.isLegendRight || state.isLegendInset ?
                0 :
                currLegend.height
        };
        var xAxisHeight = isRotated || isNonAxis ? 0 : $$.getHorizontalAxisHeight("x");
        var subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ? xAxisHeight : 30;
        var subchartHeight = config.subchart_show && !isNonAxis ?
            (config.subchart_size_height + subchartXAxisHeight) :
            0;
        // when needle is shown with legend, it need some bottom space to not overlap with legend text
        var gaugeHeight = $$.hasType("gauge") && config.arc_needle_show &&
            !config.gauge_fullCircle && !config.gauge_label_show ?
            10 :
            0;
        var padding = $$.getCurrentPadding(true);
        // for main
        state.margin = !isNonAxis && isRotated ?
            {
                top: padding.top,
                right: isNonAxis ? 0 : padding.right + legendSize.right,
                bottom: legendSize.bottom + padding.bottom,
                left: subchartHeight + (isNonAxis ? 0 : padding.left)
            } :
            {
                top: (isFitPadding ? 0 : 4) + padding.top, // for top tick text
                right: isNonAxis ? 0 : padding.right + legendSize.right,
                bottom: gaugeHeight + subchartHeight + legendSize.bottom + padding.bottom,
                left: isNonAxis ? 0 : padding.left
            };
        state.margin = $$.getResettedPadding(state.margin);
        // for subchart
        state.margin2 = isRotated ?
            {
                top: state.margin.top,
                right: NaN,
                bottom: 20 + legendSize.bottom,
                left: $$.state.rotatedPadding.left
            } :
            {
                top: state.current.height - subchartHeight - legendSize.bottom,
                right: NaN,
                bottom: subchartXAxisHeight + legendSize.bottom,
                left: state.margin.left
            };
        // for legend
        state.margin3 = {
            top: 0,
            right: NaN,
            bottom: 0,
            left: 0
        };
        (_b = $$.updateSizeForLegend) === null || _b === void 0 ? void 0 : _b.call($$, currLegend);
        state.width = state.current.width - state.margin.left - state.margin.right;
        state.height = state.current.height - state.margin.top - state.margin.bottom;
        if (state.width < 0) {
            state.width = 0;
        }
        if (state.height < 0) {
            state.height = 0;
        }
        state.width2 = isRotated ?
            state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right :
            state.width;
        state.height2 = isRotated ?
            state.height :
            state.current.height - state.margin2.top - state.margin2.bottom;
        if (state.width2 < 0) {
            state.width2 = 0;
        }
        if (state.height2 < 0) {
            state.height2 = 0;
        }
        // for arc
        if ($$.hasArcType()) {
            var hasGauge = $$.hasType("gauge");
            var isLegendRight = config.legend_show && state.isLegendRight;
            var textWidth = (_c = (state.hasRadar && $$.cache.get(KEY.radarTextWidth))) !== null && _c !== void 0 ? _c : 0;
            state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0) - textWidth;
            state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10);
            if ((_d = config.arc_rangeText_values) === null || _d === void 0 ? void 0 : _d.length) {
                if (hasGauge) {
                    state.arcWidth -= 25;
                    state.arcHeight -= 10;
                    state.margin.left += 10;
                }
                else {
                    state.arcHeight -= 20;
                    state.margin.top += 10;
                }
            }
            if (hasGauge && !config.gauge_fullCircle) {
                state.arcHeight += state.height - $$.getPaddingBottomForGauge();
            }
            (_e = $$.updateRadius) === null || _e === void 0 ? void 0 : _e.call($$);
        }
        if (state.isLegendRight && isNonAxis) {
            state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
        }
    }
};

var style = {
    /**
     * Add props color css rule to given selector
     * @param {boolean} withShape Set shpes' prefix class
     * @param {string} selector CSS selector
     * @param {Array} props CSS props list
     * @param {Function} propsFn Function to retrieve value or determine for props
     * @returns {Function}
     * @private
     */
    setCssRule: function (withShape, selector, props, propsFn) {
        var $$ = this;
        var config = $$.config, _a = $$.state, cssRule = _a.cssRule, style = _a.style;
        return config.boost_useCssRule ?
            function (selection) {
                selection.each(function (d) {
                    var res = propsFn && (propsFn === null || propsFn === void 0 ? void 0 : propsFn.call($$, d));
                    var shapeSelector = "".concat(withShape ? ".".concat($SHAPE.shapes + $$.getTargetSelectorSuffix(d.id)) : "").concat(selector);
                    (selector in cssRule) && style.sheet.deleteRule(cssRule[shapeSelector]);
                    $$.state.cssRule[shapeSelector] = addCssRules(style, shapeSelector, props.filter(Boolean).map(function (v) { return (isString(res) && v.indexOf(":") === -1 ? "".concat(v, ": ").concat(res) : (v || "")); }));
                });
            } :
            function () { };
    },
    /**
     * Get style prop value
     * @param {Function|string} v Value
     * @returns {string|null}
     * @private
     */
    getStylePropValue: function (v) {
        var useCssRule = this.config.boost_useCssRule;
        return useCssRule ? null : isFunction(v) ? v.bind(this) : v;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get text-anchor according text.labels.rotate angle
 * @param {number} angle Angle value
 * @returns {string} Anchor string value
 * @private
 */
function getRotateAnchor(angle) {
    var anchor = "middle";
    if (angle > 0 && angle <= 170) {
        anchor = "end";
    }
    else if (angle > 190 && angle <= 360) {
        anchor = "start";
    }
    return anchor;
}
/**
 * Set rotated position coordinate according text.labels.rotate angle
 * @param {object} d Data object
 * @param {object} pos Position object
 * @param {object} pos.x x coordinate
 * @param {object} pos.y y coordinate
 * @param {string} anchor string value
 * @param {boolean} isRotated If axis is rotated
 * @param {boolean} isInverted If axis is inverted
 * @returns {object} x, y coordinate
 * @private
 */
function setRotatePos(d, pos, anchor, isRotated, isInverted) {
    var _a;
    var $$ = this;
    var value = d.value;
    var isCandlestickType = $$.isCandlestickType(d);
    var isNegative = (isNumber(value) && value < 0) || (isCandlestickType && !((_a = $$.getCandlestickData(d)) === null || _a === void 0 ? void 0 : _a._isUp));
    var x = pos.x, y = pos.y;
    var gap = 4;
    var doubleGap = gap * 2;
    if (isRotated) {
        if (anchor === "start") {
            x += isNegative ? 0 : doubleGap;
            y += gap;
        }
        else if (anchor === "middle") {
            x += doubleGap;
            y -= doubleGap;
        }
        else if (anchor === "end") {
            isNegative && (x -= doubleGap);
            y += gap;
        }
    }
    else {
        if (anchor === "start") {
            x += gap;
            isNegative && (y += doubleGap * 2);
        }
        else if (anchor === "middle") {
            y -= doubleGap;
        }
        else if (anchor === "end") {
            x -= gap;
            isNegative && (y += doubleGap * 2);
        }
        if (isInverted) {
            y += isNegative ? -17 : (isCandlestickType ? 13 : 7);
        }
    }
    return { x: x, y: y };
}
/**
 * Get data.labels.position value
 * @param {object} d Data object
 * @param {string} type x | y
 * @returns {number} Position value
 * @private
 */
function getTextPos(d, type) {
    var _a;
    var position = this.config.data_labels_position;
    var id = d.id, index = d.index, value = d.value;
    return (_a = (isFunction(position) ?
        position.bind(this.api)(type, value, id, index, this.$el.text) :
        (id in position ? position[id] : position)[type])) !== null && _a !== void 0 ? _a : 0;
}
var text = {
    opacityForText: function (d) {
        var $$ = this;
        return $$.isBarType(d) && !$$.meetsLabelThreshold(Math.abs($$.getRatio("bar", d)), "bar") ?
            "0" :
            ($$.hasDataLabel ? null : "0");
    },
    /**
     * Initializes the text
     * @private
     */
    initText: function () {
        var $el = this.$el;
        $el.main.select(".".concat($COMMON.chart)).append("g")
            .attr("class", $TEXT.chartTexts)
            .style("pointer-events", $el.funnel || $el.treemap ? "none" : null);
    },
    /**
     * Update chartText
     * @param {object} targets $$.data.targets
     * @private
     */
    updateTargetsForText: function (targets) {
        var $$ = this;
        var classChartText = $$.getChartClass("Text");
        var classTexts = $$.getClass("texts", "id");
        var classFocus = $$.classFocus.bind($$);
        var mainTextUpdate = $$.$el.main.select(".".concat($TEXT.chartTexts))
            .selectAll(".".concat($TEXT.chartText))
            .data(targets)
            .attr("class", function (d) { return "".concat(classChartText(d)).concat(classFocus(d)).trim(); });
        var mainTextEnter = mainTextUpdate.enter().append("g")
            .style("opacity", "0")
            .attr("class", classChartText)
            .call($$.setCssRule(true, " .".concat($TEXT.text), ["fill", "pointer-events:none"], $$.updateTextColor));
        mainTextEnter.append("g")
            .attr("class", classTexts);
    },
    /**
     * Update text
     * @private
     */
    updateText: function () {
        var $$ = this;
        var $el = $$.$el, $T = $$.$T, config = $$.config, axis = $$.axis;
        var classText = $$.getClass("text", "index");
        var labelsCentered = config.data_labels.centered;
        var text = $el.main.selectAll(".".concat($TEXT.texts))
            .selectAll(".".concat($TEXT.text))
            .data($$.labelishData.bind($$));
        $T(text.exit())
            .style("fill-opacity", "0")
            .remove();
        $el.text = text.enter()
            .append("text")
            .merge(text)
            .attr("class", classText)
            .attr("text-anchor", function (d) {
            var isInverted = config["axis_".concat(axis === null || axis === void 0 ? void 0 : axis.getId(d.id), "_inverted")];
            // when value is negative or
            var isEndAnchor = isInverted ? d.value > 0 : d.value < 0;
            if ($$.isCandlestickType(d)) {
                var data = $$.getCandlestickData(d);
                isEndAnchor = !(data === null || data === void 0 ? void 0 : data._isUp);
            }
            else if ($$.isTreemapType(d)) {
                return labelsCentered ? "middle" : "start";
            }
            return (config.axis_rotated ? (isEndAnchor ? "end" : "start") : "middle");
        })
            .style("fill", $$.getStylePropValue($$.updateTextColor))
            .style("fill-opacity", "0")
            .each(function (d, i, texts) {
            var node = select(this);
            var value = d.value;
            if ($$.isBubbleZType(d)) {
                value = $$.getBubbleZData(value, "z");
            }
            else if ($$.isCandlestickType(d)) {
                var data = $$.getCandlestickData(d);
                if (data) {
                    value = data.close;
                }
            }
            value = $$.isTreemapType(d) ?
                $$.treemapDataLabelFormat(d)(node) :
                $$.dataLabelFormat(d.id)(value, d.id, d.index, texts);
            if (isNumber(value)) {
                this.textContent = value;
            }
            else {
                setTextValue(node, value);
            }
        });
    },
    updateTextColor: function (d) {
        var $$ = this;
        var config = $$.config;
        var labelColors = config.data_labels_colors;
        var defaultColor = ($$.isArcType(d) && !$$.isRadarType(d)) || $$.isFunnelType(d) || $$.isTreemapType(d) ?
            null :
            $$.color(d);
        var color;
        if (isString(labelColors)) {
            color = labelColors;
        }
        else if (isObject(labelColors)) {
            var id = (d.data || d).id;
            color = labelColors[id];
        }
        else if (isFunction(labelColors)) {
            color = labelColors.bind($$.api)(defaultColor, d);
        }
        if ($$.isCandlestickType(d) && !isFunction(labelColors)) {
            var value = $$.getCandlestickData(d);
            if (!(value === null || value === void 0 ? void 0 : value._isUp)) {
                var downColor = config.candlestick_color_down;
                color = isObject(downColor) ? downColor[d.id] : downColor;
            }
        }
        return color || defaultColor;
    },
    /**
     * Update data label text background color
     * @param {object} d Data object
     * @param {object|string} option option object
     * @returns {string|null}
     * @private
     */
    updateTextBGColor: function (d, option) {
        var $$ = this;
        var $el = $$.$el;
        var color = "";
        if (isString(option) || isObject(option)) {
            var id = isString(option) ?
                "" :
                $$.getTargetSelectorSuffix("id" in d ? d.id : d.data.id);
            var filter = $el.defs.select(["filter[id*='labels-bg", "']"].join(id));
            if (filter.size()) {
                color = "url(#".concat(filter.attr("id"), ")");
            }
        }
        return color || null;
    },
    /**
     * Redraw chartText
     * @param {Function} getX Positioning function for x
     * @param {Function} getY Positioning function for y
     * @param {boolean} forFlow Weather is flow
     * @param {boolean} withTransition transition is enabled
     * @returns {Array}
     * @private
     */
    redrawText: function (getX, getY, forFlow, withTransition) {
        var $$ = this;
        var $T = $$.$T, axis = $$.axis, config = $$.config, hasTreemap = $$.state.hasTreemap;
        var t = getRandom(true);
        var isRotated = config.axis_rotated;
        var angle = config.data_labels.rotate;
        var anchorString = getRotateAnchor(angle);
        var rotateString = angle ? "rotate(".concat(angle, ")") : "";
        $$.$el.text
            .style("fill", $$.getStylePropValue($$.updateTextColor))
            .attr("filter", function (d) { return $$.updateTextBGColor.bind($$)(d, config.data_labels_backgroundColors); })
            .style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$))
            .each(function (d, i) {
            // do not apply transition for newly added text elements
            var node = $T(hasTreemap && this.childElementCount ? this.parentNode : this, !!(withTransition && this.getAttribute("x")), t);
            var isInverted = config["axis_".concat(axis === null || axis === void 0 ? void 0 : axis.getId(d.id), "_inverted")];
            var pos = {
                x: getX.bind(this)(d, i),
                y: getY.bind(this)(d, i)
            };
            if (angle) {
                pos = setRotatePos.bind($$)(d, pos, anchorString, isRotated, isInverted);
                node.attr("text-anchor", anchorString);
            }
            // when is multiline
            if (this.childElementCount || angle) {
                node.attr("transform", "translate(".concat(pos.x, " ").concat(pos.y, ") ").concat(rotateString));
            }
            else {
                node.attr("x", pos.x).attr("y", pos.y);
            }
        });
        // need to return 'true' as of being pushed to the redraw list
        // ref: getRedrawList()
        return true;
    },
    /**
     * Gets the getBoundingClientRect value of the element
     * @param {HTMLElement|d3.selection} element Target element
     * @param {string} className Class name
     * @returns {object} value of element.getBoundingClientRect()
     * @private
     */
    getTextRect: function (element, className) {
        var $$ = this;
        var base = element.node ? element.node() : element;
        if (!/text/i.test(base.tagName)) {
            base = base.querySelector("text");
        }
        var text = base.textContent;
        var cacheKey = "".concat(KEY.textRect, "-").concat(text.replace(/\W/g, "_"));
        var rect = $$.cache.get(cacheKey);
        if (!rect) {
            $$.$el.svg.append("text")
                .style("visibility", "hidden")
                .style("font", select(base).style("font"))
                .classed(className, true)
                .text(text)
                .call(function (v) {
                rect = getBoundingRect(v.node());
            })
                .remove();
            $$.cache.add(cacheKey, rect);
        }
        return rect;
    },
    /**
     * Gets the x or y coordinate of the text
     * @param {object} indices Indices values
     * @param {boolean} forX whether or not to x
     * @returns {number} coordinates
     * @private
     */
    generateXYForText: function (indices, forX) {
        var $$ = this;
        var _a = $$.state, hasRadar = _a.hasRadar, hasFunnel = _a.hasFunnel, hasTreemap = _a.hasTreemap;
        var types = Object.keys(indices);
        var points = {};
        var getter = forX ? $$.getXForText : $$.getYForText;
        hasFunnel && types.push("funnel");
        hasRadar && types.push("radar");
        hasTreemap && types.push("treemap");
        types.forEach(function (v) {
            points[v] = $$["generateGet".concat(capitalize(v), "Points")](indices[v], false);
        });
        return function (d, i) {
            var type = ($$.isAreaType(d) && "area") ||
                ($$.isBarType(d) && "bar") ||
                ($$.isCandlestickType(d) && "candlestick") ||
                ($$.isFunnelType(d) && "funnel") ||
                ($$.isRadarType(d) && "radar") ||
                ($$.isTreemapType(d) && "treemap") || "line";
            return getter.call($$, points[type](d, i), d, this);
        };
    },
    /**
     * Get centerized text position for bar type data.label.text
     * @param {object} d Data object
     * @param {Array} points Data points position
     * @param {HTMLElement} textElement Data label text element
     * @param {string} type 'x' or 'y'
     * @returns {number} Position value
     * @private
     */
    getCenteredTextPos: function (d, points, textElement, type) {
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isBarType = $$.isBarType(d);
        var isTreemapType = $$.isTreemapType(d);
        if (config.data_labels.centered && (isBarType || isTreemapType)) {
            var rect = getBoundingRect(textElement);
            if (isBarType) {
                var isPositive = $$.getRangedData(d, null, "bar") >= 0;
                if (isRotated) {
                    var w = (isPositive ?
                        points[1][1] - points[0][1] :
                        points[0][1] - points[1][1]) / 2 + (rect.width / 2);
                    return isPositive ? -w - 3 : w + 2;
                }
                else {
                    var h = (isPositive ?
                        points[0][1] - points[1][1] :
                        points[1][1] - points[0][1]) / 2 + (rect.height / 2);
                    return isPositive ? h : -h - 2;
                }
            }
            else if (isTreemapType) {
                return type === "x" ?
                    (points[1][0] - points[0][0]) / 2 :
                    (points[1][1] - points[0][1]) / 2 + (rect.height / 2);
            }
        }
        return 0;
    },
    /**
     * Gets the x coordinate of the text
     * @param {object} points Data points position
     * @param {object} d Data object
     * @param {HTMLElement} textElement Data label text element
     * @returns {number} x coordinate
     * @private
     */
    getXForText: function (points, d, textElement) {
        var _a;
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isFunnelType = $$.isFunnelType(d);
        var isTreemapType = $$.isTreemapType(d);
        var xPos = points ? points[0][0] : 0;
        if ($$.isCandlestickType(d)) {
            if (isRotated) {
                xPos = ((_a = $$.getCandlestickData(d)) === null || _a === void 0 ? void 0 : _a._isUp) ? points[2][2] + 4 : points[2][1] - 4;
            }
            else {
                xPos += (points[1][0] - xPos) / 2;
            }
        }
        else if (isFunnelType) {
            xPos += $$.state.current.width / 2;
        }
        else if (isTreemapType) {
            xPos += config.data_labels.centered ? 0 : 5;
        }
        else {
            if (isRotated) {
                var isInverted = config["axis_".concat($$.axis.getId(d.id), "_inverted")];
                var padding = $$.isBarType(d) ? 4 : 6;
                var value = d.value;
                xPos = points[2][1];
                if (isInverted) {
                    xPos -= padding * (value > 0 ? 1 : -1);
                }
                else {
                    xPos += padding * (value < 0 ? -1 : 1);
                }
            }
            else {
                xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos;
            }
        }
        if (isRotated || isTreemapType) {
            xPos += $$.getCenteredTextPos(d, points, textElement, "x");
        }
        return xPos + getTextPos.call(this, d, "x");
    },
    /**
     * Gets the y coordinate of the text
     * @param {object} points Data points position
     * @param {object} d Data object
     * @param {HTMLElement} textElement Data label text element
     * @returns {number} y coordinate
     * @private
     */
    getYForText: function (points, d, textElement) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var isInverted = config["axis_".concat(axis === null || axis === void 0 ? void 0 : axis.getId(d.id), "_inverted")];
        var isBarType = $$.isBarType(d);
        var isFunnelType = $$.isFunnelType(d);
        var isTreemapType = $$.isTreemapType(d);
        var r = config.point_r;
        var rect = getBoundingRect(textElement);
        var value = d.value;
        var baseY = 3;
        var yPos;
        if ($$.isCandlestickType(d)) {
            value = $$.getCandlestickData(d);
            if (isRotated) {
                yPos = points[0][0];
                yPos += ((points[1][0] - yPos) / 2) + baseY;
            }
            else {
                yPos = value && value._isUp ? points[2][2] - baseY : points[2][1] + (baseY * 4);
                if (isInverted) {
                    yPos += 15 * (value._isUp ? 1 : -1);
                }
            }
        }
        else if (isFunnelType) {
            yPos = points ?
                points[0][1] + ((points[1][1] - points[0][1]) / 2) + rect.height / 2 - 3 :
                0;
        }
        else if (isTreemapType) {
            yPos = points[0][1] + (config.data_labels.centered ? 0 : rect.height + 5);
        }
        else {
            if (isRotated) {
                yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
            }
            else {
                yPos = points[2][1];
                if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
                    baseY += config.point_r / 2.3;
                }
                if (value < 0 || (value === 0 && !state.hasPositiveValue && state.hasNegativeValue)) {
                    yPos += isInverted ? (isBarType ? -3 : -5) : (rect.height + (isBarType ? -baseY : baseY));
                }
                else {
                    var diff = -baseY * 2;
                    if (isBarType) {
                        diff = -baseY;
                    }
                    else if ($$.isBubbleType(d)) {
                        diff = baseY;
                    }
                    if (isInverted) {
                        diff = isBarType ? 10 : 15;
                    }
                    yPos += diff;
                }
            }
        }
        if (!isRotated || isTreemapType) {
            yPos += $$.getCenteredTextPos(d, points, textElement, "y");
        }
        return yPos + getTextPos.call(this, d, "y");
    },
    /**
     * Calculate if two or more text nodes are overlapping
     * Mark overlapping text nodes with "text-overlapping" class
     * @param {string} id Axis id
     * @param {ChartInternal} $$ ChartInternal context
     * @param {string} selector Selector string
     * @private
     */
    markOverlapped: function (id, $$, selector) {
        var textNodes = $$.$el.arcs.selectAll(selector);
        var filteredTextNodes = textNodes.filter(function (node) { return node.data.id !== id; });
        var textNode = textNodes.filter(function (node) { return node.data.id === id; });
        var translate = getTranslation(textNode.node());
        // Calculates the length of the hypotenuse
        var calcHypo = function (x, y) { return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); };
        textNode.node() && filteredTextNodes.each(function () {
            var coordinate = getTranslation(this);
            var filteredTextNode = select(this);
            var nodeForWidth = calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ?
                textNode :
                filteredTextNode;
            var overlapsX = Math.ceil(Math.abs(translate.e - coordinate.e)) <
                Math.ceil(nodeForWidth.node().getComputedTextLength());
            var overlapsY = Math.ceil(Math.abs(translate.f - coordinate.f)) <
                parseInt(textNode.style("font-size"), 10);
            filteredTextNode.classed($TEXT.TextOverlapping, overlapsX && overlapsY);
        });
    },
    /**
     * Calculate if two or more text nodes are overlapping
     * Remove "text-overlapping" class on selected text nodes
     * @param {ChartInternal} $$ ChartInternal context
     * @param {string} selector Selector string
     * @private
     */
    undoMarkOverlapped: function ($$, selector) {
        $$.$el.arcs.selectAll(selector)
            .each(function () {
            selectAll([this, this.previousSibling])
                .classed($TEXT.TextOverlapping, false);
        });
    },
    /**
     * Check if meets the ratio to show data label text
     * @param {number} ratio ratio to meet
     * @param {string} type chart type
     * @returns {boolean}
     * @private
     */
    meetsLabelThreshold: function (ratio, type) {
        if (ratio === void 0) { ratio = 0; }
        var $$ = this;
        var config = $$.config;
        var threshold = config["".concat(type, "_label_threshold")] || 0;
        return ratio >= threshold;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get the text position
 * @param {string} pos right, left or center
 * @param {number} width chart width
 * @returns {string|number} text-anchor value or position in pixel
 * @private
 */
function getTextXPos(pos, width) {
    if (pos === void 0) { pos = "left"; }
    var isNum = isNumber(width);
    var position;
    if (pos.indexOf("center") > -1) {
        position = isNum ? width / 2 : "middle";
    }
    else if (pos.indexOf("right") > -1) {
        position = isNum ? width : "end";
    }
    else {
        position = isNum ? 0 : "start";
    }
    return position;
}
var title = {
    /**
     * Initializes the title
     * @private
     */
    initTitle: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        if (config.title_text) {
            $el.title = $el.svg.append("g");
            var text = $el.title
                .append("text")
                .style("text-anchor", getTextXPos(config.title_position))
                .attr("class", $TEXT.title);
            setTextValue(text, config.title_text, [0.3, 1.5]);
        }
    },
    /**
     * Redraw title
     * @private
     */
    redrawTitle: function () {
        var $$ = this;
        var config = $$.config, current = $$.state.current, title = $$.$el.title;
        if (title) {
            var x = getTextXPos(config.title_position, current.width);
            var y = (config.title_padding.top || 0) +
                $$.getTextRect($$.$el.title, $TEXT.title).height;
            title.attr("transform", "translate(".concat(x, ", ").concat(y, ")"));
        }
    },
    /**
     * Get title padding
     * @returns {number} padding value
     * @private
     */
    getTitlePadding: function () {
        var $$ = this;
        var title = $$.$el.title, config = $$.config;
        return (config.title_padding.top || 0) +
            (title ? $$.getTextRect(title, $TEXT.title).height : 0) +
            (config.title_padding.bottom || 0);
    }
};

var tooltip$1 = {
    /**
     * Initializes the tooltip
     * @private
     */
    initTooltip: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        $el.tooltip = select(config.tooltip_contents.bindto);
        if ($el.tooltip.empty()) {
            $el.tooltip = $el.chart
                .append("div")
                .attr("class", $TOOLTIP.tooltipContainer)
                .style("position", "absolute")
                .style("pointer-events", "none")
                .style("display", "none");
        }
        $$.bindTooltipResizePos();
    },
    /**
     * Show tooltip at initialization.
     * Is called only when tooltip.init.show=true option is set
     * @private
     */
    initShowTooltip: function () {
        var _a;
        var _b;
        var $$ = this;
        var config = $$.config, $el = $$.$el, _c = $$.state, hasAxis = _c.hasAxis, hasRadar = _c.hasRadar;
        // Show tooltip if needed
        if (config.tooltip_init_show) {
            var isArc = !(hasAxis || hasRadar);
            if (((_b = $$.axis) === null || _b === void 0 ? void 0 : _b.isTimeSeries()) && isString(config.tooltip_init_x)) {
                config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);
            }
            $$.api.tooltip.show({
                data: (_a = {},
                    _a[isArc ? "index" : "x"] = config.tooltip_init_x,
                    _a)
            });
            var position = config.tooltip_init_position;
            if (!config.tooltip_contents.bindto && !isEmpty(position)) {
                var _d = position.top, top_1 = _d === void 0 ? 0 : _d, _e = position.left, left = _e === void 0 ? 50 : _e;
                $el.tooltip.style("top", isString(top_1) ? top_1 : "".concat(top_1, "px"))
                    .style("left", isString(left) ? left : "".concat(left, "px"))
                    .style("display", null);
            }
        }
    },
    /**
     * Get the tooltip HTML string
     * @param  {Array} args Arguments
     * @returns {string} Formatted HTML string
     * @private
     */
    getTooltipHTML: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var $$ = this;
        var api = $$.api, config = $$.config;
        return isFunction(config.tooltip_contents) ? config.tooltip_contents.bind(api).apply(void 0, args) : $$.getTooltipContent.apply($$, args);
    },
    /**
     * Returns the tooltip content(HTML string)
     * @param {object} d data
     * @param {Function} defaultTitleFormat Default title format
     * @param {Function} defaultValueFormat Default format for each data value in the tooltip.
     * @param {Function} color Color function
     * @returns {string} html
     * @private
     */
    getTooltipContent: function (d, defaultTitleFormat, defaultValueFormat, color) {
        var _a;
        var $$ = this;
        var api = $$.api, config = $$.config, state = $$.state, $el = $$.$el;
        // get formatter function
        var _b = ["title", "name", "value"].map(function (v) {
            var fn = config["tooltip_format_".concat(v)];
            return isFunction(fn) ? fn.bind(api) : fn;
        }), titleFn = _b[0], nameFn = _b[1], valueFn = _b[2];
        // determine fotmatter function with sanitization
        var titleFormat = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return sanitize((titleFn || defaultTitleFormat).apply(void 0, arg));
        };
        var nameFormat = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return sanitize((nameFn || (function (name) { return name; })).apply(void 0, arg));
        };
        var valueFormat = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var fn = valueFn || (state.hasTreemap || $$.isStackNormalized() ?
                function (v, ratio) { return "".concat((ratio * 100).toFixed(2), "%"); } :
                defaultValueFormat);
            return sanitize(fn.apply(void 0, arg));
        };
        var order = config.tooltip_order;
        var getRowValue = function (row) { return ($$.axis && $$.isBubbleZType(row) ?
            $$.getBubbleZData(row.value, "z") :
            $$.getBaseValue(row)); };
        var getBgColor = $$.levelColor ? function (row) { return $$.levelColor(row.value); } : function (row) { return color(row); };
        var contents = config.tooltip_contents;
        var tplStr = contents.template;
        var targetIds = $$.mapToTargetIds();
        if (order === null && config.data_groups.length) {
            // for stacked data, order should aligned with the visually displayed data
            var ids_1 = $$.orderTargets($$.data.targets)
                .map(function (i2) { return i2.id; })
                .reverse();
            d.sort(function (a, b) {
                var v1 = a ? a.value : null;
                var v2 = b ? b.value : null;
                if (v1 > 0 && v2 > 0) {
                    v1 = a.id ? ids_1.indexOf(a.id) : null;
                    v2 = b.id ? ids_1.indexOf(b.id) : null;
                }
                return v1 - v2;
            });
        }
        else if (/^(asc|desc)$/.test(order)) {
            var isAscending_1 = order === "asc";
            d.sort(function (a, b) {
                var v1 = a ? getRowValue(a) : null;
                var v2 = b ? getRowValue(b) : null;
                return isAscending_1 ? v1 - v2 : v2 - v1;
            });
        }
        else if (isFunction(order)) {
            d.sort(order.bind(api));
        }
        var tpl = $$.getTooltipContentTemplate(tplStr);
        var len = d.length;
        var text;
        var row;
        var param;
        var value;
        var i;
        var _loop_1 = function () {
            row = d[i];
            if (!row || !(getRowValue(row) || getRowValue(row) === 0)) {
                return "continue";
            }
            if (isUndefined(text)) {
                var title = (state.hasAxis || state.hasRadar) && titleFormat(row.x);
                text = tplProcess(tpl[0], {
                    CLASS_TOOLTIP: $TOOLTIP.tooltip,
                    TITLE: isValue(title) ?
                        (tplStr ? title : "<tr><th colspan=\"2\">".concat(title, "</th></tr>")) :
                        ""
                });
            }
            if (!row.ratio && $el.arcs) {
                param = ["arc", $$.$el.arcs.select("path.".concat($ARC.arc, "-").concat(row.id)).data()[0]];
                row.ratio = $$.getRatio.apply($$, param);
            }
            // arrange param to be passed to formatter
            param = [row.ratio, row.id, row.index];
            if ($$.isAreaRangeType(row)) {
                var _c = ["high", "low"].map(function (v) {
                    return valueFormat.apply(void 0, __spreadArray([$$.getRangedData(row, v)], param, false));
                }), high = _c[0], low = _c[1];
                var mid = valueFormat.apply(void 0, __spreadArray([getRowValue(row)], param, false));
                value = "<b>Mid:</b> ".concat(mid, " <b>High:</b> ").concat(high, " <b>Low:</b> ").concat(low);
            }
            else if ($$.isCandlestickType(row)) {
                var _d = ["open", "high", "low", "close", "volume"]
                    .map(function (v) {
                    var value = $$.getRangedData(row, v, "candlestick");
                    return value ? valueFormat.apply(void 0, __spreadArray([$$.getRangedData(row, v, "candlestick")], param, false)) :
                        undefined;
                }), open_1 = _d[0], high = _d[1], low = _d[2], close_1 = _d[3], volume = _d[4];
                value =
                    "<b>Open:</b> ".concat(open_1, " <b>High:</b> ").concat(high, " <b>Low:</b> ").concat(low, " <b>Close:</b> ").concat(close_1).concat(volume ? " <b>Volume:</b> ".concat(volume) : "");
            }
            else if ($$.isBarRangeType(row)) {
                var rangeValue = row.value, id = row.id, index = row.index;
                value = "".concat(valueFormat(rangeValue, undefined, id, index));
            }
            else {
                value = valueFormat.apply(void 0, __spreadArray([getRowValue(row)], param, false));
            }
            if (value !== undefined) {
                // Skip elements when their name is set to null
                if (row.name === null) {
                    return "continue";
                }
                var name_1 = nameFormat.apply(void 0, __spreadArray([(_a = row.name) !== null && _a !== void 0 ? _a : row.id], param, false));
                var color_1 = getBgColor(row);
                var contentValue_1 = {
                    CLASS_TOOLTIP_NAME: $TOOLTIP.tooltipName + $$.getTargetSelectorSuffix(row.id),
                    COLOR: (tplStr || !$$.patterns) ?
                        color_1 :
                        "<svg><rect style=\"fill:".concat(color_1, "\" width=\"10\" height=\"10\"></rect></svg>"),
                    NAME: name_1,
                    VALUE: value
                };
                if (tplStr && isObject(contents.text)) {
                    var index_1 = targetIds.indexOf(row.id);
                    Object.keys(contents.text).forEach(function (key) {
                        contentValue_1[key] = contents.text[key][index_1];
                    });
                }
                text += tplProcess(tpl[1], contentValue_1);
            }
        };
        for (i = 0; i < len; i++) {
            _loop_1();
        }
        return "".concat(text, "</table>");
    },
    /**
     * Get the content template string
     * @param {string} tplStr Tempalte string
     * @returns {Array} Template string
     * @private
     */
    getTooltipContentTemplate: function (tplStr) {
        return (tplStr || "<table class=\"{=CLASS_TOOLTIP}\"><tbody>\n\t\t\t\t{=TITLE}\n\t\t\t\t{{<tr class=\"{=CLASS_TOOLTIP_NAME}\">\n\t\t\t\t\t<td class=\"name\">".concat(this.patterns ? "{=COLOR}" : "<span style=\"background-color:{=COLOR}\"></span>", "{=NAME}</td>\n\t\t\t\t\t<td class=\"value\">{=VALUE}</td>\n\t\t\t\t</tr>}}\n\t\t\t</tbody></table>"))
            .replace(/(\r?\n|\t)/g, "")
            .split(/{{(.*)}}/);
    },
    /**
     * Update tooltip position coordinate
     * @param {object} dataToShow Data object
     * @param {SVGElement} eventTarget Event element
     * @private
     */
    setTooltipPosition: function (dataToShow, eventTarget) {
        var _a, _b;
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, _c = $$.$el, eventRect = _c.eventRect, tooltip = _c.tooltip, svg = _c.svg;
        var bindto = config.tooltip_contents.bindto;
        var isRotated = config.axis_rotated;
        var datum = tooltip === null || tooltip === void 0 ? void 0 : tooltip.datum();
        if (!bindto && datum) {
            var data = dataToShow !== null && dataToShow !== void 0 ? dataToShow : JSON.parse(datum.current);
            var _d = getPointer(state.event, eventTarget !== null && eventTarget !== void 0 ? eventTarget : eventRect === null || eventRect === void 0 ? void 0 : eventRect.node()), x = _d[0], y = _d[1]; // get mouse event position
            var currPos = { x: x, y: y };
            if (state.hasAxis && scale.x && datum && "x" in datum) {
                var getYPos = function (value, id, axisId) {
                    var _a;
                    if (value === void 0) { value = 0; }
                    if (axisId === void 0) { axisId = "y"; }
                    var scaleFn = scale[id ? (_a = $$.axis) === null || _a === void 0 ? void 0 : _a.getId(id) : axisId];
                    return scaleFn ?
                        scaleFn(value) + (isRotated ? state.margin.left : state.margin.top) :
                        0;
                };
                currPos.xAxis = scale.x(datum.x) + (
                // add margin only when user specified tooltip.position function
                config.tooltip_position ? (isRotated ? state.margin.top : state.margin.left) : 0);
                if (data.length === 1) {
                    currPos.yAxis = getYPos(data[0].value, data[0].id);
                }
                else {
                    currPos.yAxis = getYPos;
                }
            }
            var _e = datum.width, width = _e === void 0 ? 0 : _e, _f = datum.height, height = _f === void 0 ? 0 : _f;
            // Get tooltip position
            var pos_1 = (_b = (_a = config.tooltip_position) === null || _a === void 0 ? void 0 : _a.bind($$.api)(data, width, height, eventRect === null || eventRect === void 0 ? void 0 : eventRect.node(), currPos)) !== null && _b !== void 0 ? _b : (hasViewBox(svg) ?
                $$.getTooltipPositionViewBox.bind($$)(width, height, currPos) :
                $$.getTooltipPosition.bind($$)(width, height, currPos));
            ["top", "left"].forEach(function (v) {
                var value = pos_1[v];
                tooltip.style(v, "".concat(value, "px"));
                // Remember left pos in percentage to be used on resize call
                if (v === "left" && !datum.xPosInPercent) {
                    datum.xPosInPercent = value / state.current.width * 100;
                }
            });
        }
    },
    getTooltipPositionViewBox: function (tWidth, tHeight, currPos) {
        var _a, _b;
        var $$ = this;
        var _c = $$.$el, eventRect = _c.eventRect, main = _c.main, config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var hasArcType = $$.hasArcType(undefined, ["radar"]) || state.hasFunnel ||
            state.hasTreemap;
        var target = (_b = (_a = (state.hasRadar ? main : eventRect)) === null || _a === void 0 ? void 0 : _a.node()) !== null && _b !== void 0 ? _b : state.event.target;
        var size = 38; // getTransformCTM($el.svg.node(), 10, 0, false).x;
        var x = currPos.x, y = currPos.y;
        if (state.hasAxis) {
            x = isRotated ? x : currPos.xAxis;
            y = isRotated ? currPos.xAxis : y;
        }
        // currPos는 SVG 좌표계 기준으로 전달됨
        var ctm = getTransformCTM(target, x, y, false);
        var top = ctm.y;
        var left = ctm.x + size;
        if (hasArcType) {
            top += tHeight;
            left -= size; // (tWidth / 2);
        }
        var rect = (hasArcType ? main.node() : target).getBoundingClientRect();
        if (left + tWidth > rect.right) {
            left = rect.right - tWidth - size;
        }
        if (top + tHeight > rect.bottom) {
            top -= tHeight + size;
        }
        return {
            top: top,
            left: left
        };
    },
    /**
     * Returns the position of the tooltip
     * @param {string} tWidth Width value of tooltip element
     * @param {string} tHeight Height value of tooltip element
     * @param {object} currPos Current mouse position
     * @returns {object} top, left value
     * @private
     */
    getTooltipPosition: function (tWidth, tHeight, currPos) {
        var _a, _b, _c;
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var width = state.width, height = state.height, current = state.current, hasFunnel = state.hasFunnel, hasRadar = state.hasRadar, hasTreemap = state.hasTreemap, isLegendRight = state.isLegendRight, inputType = state.inputType;
        var hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
        var isRotated = config.axis_rotated;
        var hasArcType = $$.hasArcType();
        var svgLeft = $$.getSvgLeft(true);
        var chartRight = svgLeft + current.width - $$.getCurrentPaddingByDirection("right");
        var size = 20;
        var x = currPos.x, y = currPos.y;
        // Determine tooltip position
        if (hasRadar) {
            x += x >= (width / 2) ? 15 : -(tWidth + 15);
            y += 15;
        }
        else if (hasArcType) {
            var notTouch = inputType !== "touch";
            if (notTouch) {
                var titlePadding = (_b = (_a = $$.getTitlePadding) === null || _a === void 0 ? void 0 : _a.call($$)) !== null && _b !== void 0 ? _b : 0;
                if (titlePadding && hasGauge && ((_c = config.arc_rangeText_values) === null || _c === void 0 ? void 0 : _c.length)) {
                    titlePadding += 10;
                }
                x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
                y += (hasGauge ? height : (height / 2) + tHeight) + titlePadding;
            }
        }
        else if (hasFunnel || hasTreemap) {
            y += tHeight;
        }
        else {
            var padding = {
                top: $$.getCurrentPaddingByDirection("top", true),
                left: $$.getCurrentPaddingByDirection("left", true)
            };
            if (isRotated) {
                x += svgLeft + padding.left + size;
                y = padding.top + currPos.xAxis + size;
                chartRight -= svgLeft;
            }
            else {
                x = svgLeft + padding.left + size + (scale.zoom ? x : currPos.xAxis);
                y += padding.top - 5;
            }
        }
        // when tooltip left + tWidth > chart's width
        if ((x + tWidth + 15) > chartRight) {
            x -= tWidth + (hasFunnel || hasTreemap || hasArcType ? 0 : (isRotated ? size * 2 : 38));
        }
        if (y + tHeight > current.height) {
            var gap = hasTreemap ? tHeight + 10 : 30;
            y -= hasGauge ? tHeight * 1.5 : tHeight + gap;
        }
        var pos = { top: y, left: x };
        // make sure to not be positioned out of viewport
        Object.keys(pos).forEach(function (v) {
            if (pos[v] < 0) {
                pos[v] = 0;
            }
        });
        return pos;
    },
    /**
     * Show the tooltip
     * @param {object} selectedData Data object
     * @param {SVGElement} eventTarget Event element
     * @private
     */
    showTooltip: function (selectedData, eventTarget) {
        var $$ = this;
        var config = $$.config, tooltip = $$.$el.tooltip;
        var dataToShow = selectedData.filter(function (d) { return d && isValue($$.getBaseValue(d)); });
        if (!tooltip || dataToShow.length === 0 || !config.tooltip_show) {
            return;
        }
        var datum = tooltip.datum();
        var dataStr = JSON.stringify(selectedData);
        if (!datum || datum.current !== dataStr) {
            var _a = selectedData.concat().sort()[0], index = _a.index, x = _a.x;
            callFn(config.tooltip_onshow, $$.api, selectedData);
            // set tooltip content
            tooltip
                .html($$.getTooltipHTML(selectedData, // data
            $$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$), // defaultTitleFormat
            $$.getDefaultValueFormat(), // defaultValueFormat
            $$.color // color
            ))
                .style("display", null)
                .style("visibility", null) // for IE9
                .datum(datum = {
                index: index,
                x: x,
                current: dataStr,
                width: tooltip.property("offsetWidth"),
                height: tooltip.property("offsetHeight")
            });
            callFn(config.tooltip_onshown, $$.api, selectedData);
            $$._handleLinkedCharts(true, index);
        }
        $$.setTooltipPosition(dataToShow, eventTarget);
    },
    /**
     * Adjust tooltip position on resize event
     * @private
     */
    bindTooltipResizePos: function () {
        var $$ = this;
        var resizeFunction = $$.resizeFunction, state = $$.state, tooltip = $$.$el.tooltip;
        resizeFunction.add(function () {
            if (tooltip.style("display") === "block") {
                var current = state.current;
                var _a = tooltip.datum(), width = _a.width, xPosInPercent = _a.xPosInPercent;
                var value = current.width / 100 * xPosInPercent;
                var diff = current.width - (value + width);
                // if tooltip size overs current viewport size
                if (diff < 0) {
                    value += diff;
                }
                tooltip.style("left", "".concat(value, "px"));
            }
        });
    },
    /**
     * Hide the tooltip
     * @param {boolean} force Force to hide
     * @private
     */
    hideTooltip: function (force) {
        var _a;
        var $$ = this;
        var api = $$.api, config = $$.config, tooltip = $$.$el.tooltip;
        if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
            var selectedData = JSON.parse((_a = tooltip.datum().current) !== null && _a !== void 0 ? _a : {});
            callFn(config.tooltip_onhide, api, selectedData);
            // hide tooltip
            tooltip
                .style("display", "none")
                .style("visibility", "hidden") // for IE9
                .datum(null);
            callFn(config.tooltip_onhidden, api, selectedData);
        }
    },
    /**
     * Toggle display for linked chart instances
     * @param {boolean} show true: show, false: hide
     * @param {number} index x Axis index
     * @private
     */
    _handleLinkedCharts: function (show, index) {
        var $$ = this;
        var charts = $$.charts, config = $$.config, event = $$.state.event;
        // Prevent propagation among instances if isn't instantiated from the user's event
        // https://github.com/naver/billboard.js/issues/1979
        if ((event === null || event === void 0 ? void 0 : event.isTrusted) && config.tooltip_linked && charts.length > 1) {
            var linkedName_1 = config.tooltip_linked_name;
            charts
                .filter(function (c) { return c !== $$.api; })
                .forEach(function (c) {
                var _a = c.internal, config = _a.config, $el = _a.$el;
                var isLinked = config.tooltip_linked;
                var name = config.tooltip_linked_name;
                var isInDom = doc.body.contains($el.chart.node());
                if (isLinked && linkedName_1 === name && isInDom) {
                    var data = $el.tooltip.data()[0];
                    var isNotSameIndex = index !== (data === null || data === void 0 ? void 0 : data.index);
                    try {
                        c.tooltip[show && isNotSameIndex ? "show" : "hide"]({ index: index });
                    }
                    catch (_b) { }
                }
            });
        }
    },
    /**
     * Update tooltip content on redraw
     * - In a situation where tooltip is displayed and data load happens, it should reflect loaded data to tooltip
     * @param {d3Selection} context Event rect element
     * @param {number} index Data index
     * @private
     */
    updateTooltipOnRedraw: function (context, index) {
        var _a;
        var $$ = this;
        var config = $$.config, _b = $$.$el, eventRect = _b.eventRect, svg = _b.svg, tooltip = _b.tooltip, _c = $$.state, event = _c.event, hasAxis = _c.hasAxis, hasRadar = _c.hasRadar, hasTreemap = _c.hasTreemap;
        // Update tooltip, when tooltip is in shown state
        if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.style("display")) === "block" && event) {
            var rect = context !== null && context !== void 0 ? context : (_a = (hasRadar ? svg : eventRect)) === null || _a === void 0 ? void 0 : _a.node();
            // for Axis based & Radar
            if (hasAxis || hasRadar) {
                if ($$.isMultipleX()) {
                    $$.selectRectForMultipleXs(rect, false);
                }
                else {
                    var idx = index !== null && index !== void 0 ? index : $$.getDataIndexFromEvent(event);
                    if (index === -1) {
                        $$.api.tooltip.hide();
                    }
                    else {
                        $$.selectRectForSingle(rect, idx);
                        $$.setExpand(idx, null, true);
                    }
                }
                // for Arc & Treemap
            }
            else {
                var clientX_1 = event.clientX, clientY_1 = event.clientY;
                setTimeout(function () {
                    var target = doc.elementFromPoint(clientX_1, clientY_1);
                    var data = select(target).datum();
                    if (data) {
                        var d = $$.hasArcType() ?
                            $$.convertToArcData($$.updateAngle(data)) :
                            data === null || data === void 0 ? void 0 : data.data;
                        hasTreemap && (target = svg.node());
                        d && $$.showTooltip([d], target);
                    }
                    else {
                        $$.api.tooltip.hide();
                    }
                }, config.transition_duration);
            }
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var transform = {
    getTranslate: function (target, index) {
        var _a;
        if (index === void 0) { index = 0; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var padding = 0;
        var x;
        var y;
        if (index && /^(x|y2?)$/.test(target)) {
            padding = $$.getAxisSize(target) * index;
        }
        if (target === "main") {
            x = asHalfPixel(state.margin.left);
            y = asHalfPixel(state.margin.top);
        }
        else if (target === "context") {
            x = asHalfPixel(state.margin2.left);
            y = asHalfPixel(state.margin2.top);
        }
        else if (target === "legend") {
            x = state.margin3.left;
            y = state.margin3.top;
        }
        else if (target === "x") {
            x = isRotated ? -padding : 0;
            y = isRotated ? 0 : state.height + padding;
        }
        else if (target === "y") {
            x = isRotated ? 0 : -padding;
            y = isRotated ? state.height + padding : 0;
        }
        else if (target === "y2") {
            x = isRotated ? 0 : state.width + padding;
            y = isRotated ? -padding - 1 : 0;
        }
        else if (target === "subX") {
            x = 0;
            y = isRotated ? 0 : state.height2;
        }
        else if (target === "arc") {
            x = state.arcWidth / 2;
            y = state.arcHeight / 2;
            if ((_a = config.arc_rangeText_values) === null || _a === void 0 ? void 0 : _a.length) {
                y += 5 + ($$.hasType("gauge") && config.title_text ? 10 : 0);
            }
        }
        else if (target === "polar") {
            x = state.arcWidth / 2;
            y = state.arcHeight / 2;
        }
        else if (target === "radar") {
            var _b = $$.getRadarSize(), width = _b[0], height = _b[1];
            x = state.width / 2 - width;
            y = state.height / 2 - height;
        }
        return "translate(".concat(x, ", ").concat(y, ")");
    },
    transformMain: function (withTransition, transitions) {
        var $$ = this;
        var main = $$.$el.main, $T = $$.$T;
        var xAxis = (transitions === null || transitions === void 0 ? void 0 : transitions.axisX) ?
            transitions.axisX :
            $T(main.select(".".concat($AXIS.axisX)), withTransition);
        var yAxis = (transitions === null || transitions === void 0 ? void 0 : transitions.axisY) ?
            transitions.axisY :
            $T(main.select(".".concat($AXIS.axisY)), withTransition);
        var y2Axis = (transitions === null || transitions === void 0 ? void 0 : transitions.axisY2) ?
            transitions.axisY2 :
            $T(main.select(".".concat($AXIS.axisY2)), withTransition);
        $T(main, withTransition)
            .attr("transform", $$.getTranslate("main"));
        xAxis.attr("transform", $$.getTranslate("x"));
        yAxis.attr("transform", $$.getTranslate("y"));
        y2Axis.attr("transform", $$.getTranslate("y2"));
        main.select(".".concat($ARC.chartArcs))
            .attr("transform", $$.getTranslate("arc"));
    },
    transformAll: function (withTransition, transitions) {
        var $$ = this;
        var config = $$.config, _a = $$.state, hasAxis = _a.hasAxis, hasFunnel = _a.hasFunnel, hasTreemap = _a.hasTreemap, $el = $$.$el;
        !hasFunnel && !hasTreemap && $$.transformMain(withTransition, transitions);
        hasAxis && config.subchart_show &&
            $$.transformContext(withTransition, transitions);
        $el.legend && $$.transformLegend(withTransition);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var typeInternals = {
    /**
     * Check if the given chart type is valid
     * @param {string} type Chart type string
     * @returns {boolean}
     * @private
     */
    isValidChartType: function (type) {
        return !!(type && Object.values(TYPE).indexOf(type) > -1);
    },
    setTargetType: function (targetIds, type) {
        var $$ = this;
        var config = $$.config, withoutFadeIn = $$.state.withoutFadeIn;
        $$.mapToTargetIds(targetIds).forEach(function (id) {
            withoutFadeIn[id] = type === config.data_types[id];
            config.data_types[id] = type;
        });
        if (!targetIds) {
            config.data_type = type;
        }
    },
    /**
     * Updte current used chart types
     * @private
     */
    updateTypesElements: function () {
        var $$ = this;
        var current = $$.state.current;
        Object.keys(TYPE).forEach(function (v) {
            var t = TYPE[v];
            var has = $$.hasType(t, null, true);
            var idx = current.types.indexOf(t);
            if (idx === -1 && has) {
                current.types.push(t);
            }
            else if (idx > -1 && !has) {
                current.types.splice(idx, 1);
            }
        });
        // Update current chart elements reference
        $$.setChartElements();
    },
    /**
     * Check if given chart types exists
     * @param {string} type Chart type
     * @param {Array} targetsValue Data array
     * @param {boolean} checkFromData Force to check type cotains from data targets
     * @returns {boolean}
     * @private
     */
    hasType: function (type, targetsValue, checkFromData) {
        var _a;
        if (checkFromData === void 0) { checkFromData = false; }
        var $$ = this;
        var config = $$.config, current = $$.state.current;
        var types = config.data_types;
        var targets = targetsValue || $$.data.targets;
        var has = false;
        if (!checkFromData && ((_a = current.types) === null || _a === void 0 ? void 0 : _a.indexOf(type)) > -1) {
            has = true;
        }
        else if (targets === null || targets === void 0 ? void 0 : targets.length) {
            targets.forEach(function (target) {
                var t = types[target.id];
                if (t === type || (!t && type === "line")) {
                    has = true;
                }
            });
        }
        else if (Object.keys(types).length) {
            Object.keys(types).forEach(function (id) {
                if (types[id] === type) {
                    has = true;
                }
            });
        }
        else {
            has = config.data_type === type;
        }
        return has;
    },
    /**
     * Check if contains given chart types
     * @param {string} type Type key
     * @param {object} targets Target data
     * @param {Array} exclude Excluded types
     * @returns {boolean}
     * @private
     */
    hasTypeOf: function (type, targets, exclude) {
        var _this = this;
        if (exclude === void 0) { exclude = []; }
        if (type in TYPE_BY_CATEGORY) {
            return !TYPE_BY_CATEGORY[type]
                .filter(function (v) { return exclude.indexOf(v) === -1; })
                .every(function (v) { return !_this.hasType(v, targets); });
        }
        return false;
    },
    /**
     * Check if given data is certain chart type
     * @param {object} d Data object
     * @param {string|Array} type chart type
     * @returns {boolean}
     * @private
     */
    isTypeOf: function (d, type) {
        var _a;
        var id = isString(d) ? d : d.id;
        var dataType = this.config && (((_a = this.config.data_types) === null || _a === void 0 ? void 0 : _a[id]) || this.config.data_type);
        return isArray(type) ? type.indexOf(dataType) >= 0 : dataType === type;
    },
    hasPointType: function () {
        var $$ = this;
        return $$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter");
    },
    /**
     * Check if contains arc types chart
     * @param {object} targets Target data
     * @param {Array} exclude Excluded types
     * @returns {boolean}
     * @private
     */
    hasArcType: function (targets, exclude) {
        return this.hasTypeOf("Arc", targets, exclude);
    },
    hasMultiArcGauge: function () {
        return this.hasType("gauge") && this.config.gauge_type === "multi";
    },
    isLineType: function (d) {
        var id = isString(d) ? d : d.id;
        return !this.config.data_types[id] ||
            this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
    },
    isStepType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
    },
    isSplineType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
    },
    isAreaType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
    },
    isAreaRangeType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
    },
    isBarType: function (d) {
        return this.isTypeOf(d, "bar");
    },
    isBubbleType: function (d) {
        return this.isTypeOf(d, "bubble");
    },
    isCandlestickType: function (d) {
        return this.isTypeOf(d, "candlestick");
    },
    isScatterType: function (d) {
        return this.isTypeOf(d, "scatter");
    },
    isTreemapType: function (d) {
        return this.isTypeOf(d, "treemap");
    },
    isPieType: function (d) {
        return this.isTypeOf(d, "pie");
    },
    isFunnelType: function (d) {
        return this.isTypeOf(d, "funnel");
    },
    isGaugeType: function (d) {
        return this.isTypeOf(d, "gauge");
    },
    isDonutType: function (d) {
        return this.isTypeOf(d, "donut");
    },
    isPolarType: function (d) {
        return this.isTypeOf(d, "polar");
    },
    isRadarType: function (d) {
        return this.isTypeOf(d, "radar");
    },
    isArcType: function (d) {
        return this.isPieType(d) ||
            this.isDonutType(d) ||
            this.isGaugeType(d) ||
            this.isPolarType(d) ||
            this.isRadarType(d);
    },
    // determine if is 'circle' data point
    isCirclePoint: function (node) {
        var config = this.config;
        var pattern = config.point_pattern;
        var isCircle = false;
        if ((node === null || node === void 0 ? void 0 : node.tagName) === "circle") {
            isCircle = true;
        }
        else {
            isCircle = config.point_type === "circle" &&
                (!pattern || (isArray(pattern) && pattern.length === 0));
        }
        return isCircle;
    },
    lineData: function (d) {
        return this.isLineType(d) ? [d] : [];
    },
    arcData: function (d) {
        return this.isArcType(d.data) ? [d] : [];
    },
    /**
     * Get data adapt for data label showing
     * @param {object} d Data object
     * @returns {Array}
     * @private
     */
    labelishData: function (d) {
        return this.isBarType(d) ||
            this.isLineType(d) ||
            this.isScatterType(d) ||
            this.isBubbleType(d) ||
            this.isCandlestickType(d) ||
            this.isFunnelType(d) ||
            this.isRadarType(d) ||
            this.isTreemapType(d) ?
            d.values.filter(function (v) { return isNumber(v.value) || Boolean(v.value); }) :
            [];
    },
    barLineBubbleData: function (d) {
        return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
    },
    // https://github.com/d3/d3-shape#curves
    isInterpolationType: function (type) {
        return [
            "basis",
            "basis-closed",
            "basis-open",
            "bundle",
            "cardinal",
            "cardinal-closed",
            "cardinal-open",
            "catmull-rom",
            "catmull-rom-closed",
            "catmull-rom-open",
            "linear",
            "linear-closed",
            "monotone-x",
            "monotone-y",
            "natural"
        ].indexOf(type) >= 0;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get grouped data point function for y coordinate
 * - Note: Grouped(stacking) works only for line and bar types
 * @param {object} d data vlaue
 * @returns {Function|undefined}
 * @private
 */
function getGroupedDataPointsFn(d) {
    var $$ = this;
    var fn;
    if ($$.isLineType(d)) {
        fn = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType));
    }
    else if ($$.isBarType(d)) {
        fn = $$.generateGetBarPoints($$.getShapeIndices($$.isBarType));
    }
    return fn;
}
var shape = {
    /**
     * Get the shape draw function
     * @returns {object}
     * @private
     */
    getDrawShape: function () {
        var $$ = this;
        var isRotated = $$.config.axis_rotated;
        var _a = $$.state, hasRadar = _a.hasRadar, hasTreemap = _a.hasTreemap;
        var shape = { type: {}, indices: {}, pos: {} };
        !hasTreemap && ["bar", "candlestick", "line", "area"].forEach(function (v) {
            var name = capitalize(/^(bubble|scatter)$/.test(v) ? "line" : v);
            if ($$.hasType(v) || $$.hasTypeOf(name) || (v === "line" &&
                ($$.hasType("bubble") || $$.hasType("scatter")))) {
                var indices = $$.getShapeIndices($$["is".concat(name, "Type")]);
                var drawFn = $$["generateDraw".concat(name)];
                shape.indices[v] = indices;
                shape.type[v] = drawFn ? drawFn.bind($$)(indices, false) : undefined;
            }
        });
        if (!$$.hasArcType() || hasRadar || hasTreemap) {
            var cx = void 0;
            var cy = void 0;
            // generate circle x/y functions depending on updated params
            if (!hasTreemap) {
                cx = hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX);
                cy = hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY);
            }
            shape.pos = {
                xForText: $$.generateXYForText(shape.indices, true),
                yForText: $$.generateXYForText(shape.indices, false),
                cx: (cx || function () { }).bind($$),
                cy: (cy || function () { }).bind($$)
            };
        }
        return shape;
    },
    /**
     * Get shape's indices according it's position within each axis tick.
     *
     * From the below example, indices will be:
     * ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
     *
     * 	data1 data3   data1 data3
     * 	data2 data4   data2 data4
     * 	-------------------------
     * 		 0             1
     * @param {Function} typeFilter Chart type filter function
     * @returns {object} Indices object with its position
     */
    getShapeIndices: function (typeFilter) {
        var $$ = this;
        var config = $$.config;
        var xs = config.data_xs;
        var hasXs = notEmpty(xs);
        var indices = {};
        var i = hasXs ? {} : 0;
        if (hasXs) {
            getUnique(Object.keys(xs).map(function (v) { return xs[v]; }))
                .forEach(function (v) {
                i[v] = 0;
                indices[v] = {};
            });
        }
        $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))
            .forEach(function (d) {
            var _a;
            var xKey = d.id in xs ? xs[d.id] : "";
            var ind = xKey ? indices[xKey] : indices;
            for (var j = 0, groups = void 0; (groups = config.data_groups[j]); j++) {
                if (groups.indexOf(d.id) < 0) {
                    continue;
                }
                for (var k = 0, key = void 0; (key = groups[k]); k++) {
                    if (key in ind) {
                        ind[d.id] = ind[key];
                        break;
                    }
                    // for same grouped data, add other data to same indices
                    if (d.id !== key && xKey) {
                        ind[key] = (_a = ind[d.id]) !== null && _a !== void 0 ? _a : i[xKey];
                    }
                }
            }
            if (isUndefined(ind[d.id])) {
                ind[d.id] = xKey ? i[xKey]++ : i++;
                ind.__max__ = (xKey ? i[xKey] : i) - 1;
            }
        });
        return indices;
    },
    /**
     * Get indices value based on data ID value
     * @param {object} indices Indices object
     * @param {object} d Data row
     * @param {string} caller Caller function name (Used only for 'sparkline' plugin)
     * @returns {object} Indices object
     * @private
     */
    getIndices: function (indices, d, caller) {
        var $$ = this;
        var _a = $$.config, xs = _a.data_xs, removeNull = _a.bar_indices_removeNull;
        var id = d.id, index = d.index;
        if ($$.isBarType(id) && removeNull) {
            var ind_1 = {};
            // redefine bar indices order
            $$.getAllValuesOnIndex(index, true)
                .forEach(function (v, i) {
                ind_1[v.id] = i;
                ind_1.__max__ = i;
            });
            return ind_1;
        }
        return notEmpty(xs) ? indices[xs[id]] : indices;
    },
    /**
     * Get indices max number
     * @param {object} indices Indices object
     * @returns {number} Max number
     * @private
     */
    getIndicesMax: function (indices) {
        return notEmpty(this.config.data_xs) ?
            // if is multiple xs, return total sum of xs' __max__ value
            Object.keys(indices)
                .map(function (v) { return indices[v].__max__ || 0; })
                .reduce(function (acc, curr) { return acc + curr; }) :
            indices.__max__;
    },
    getShapeX: function (offset, indices, isSub) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var currScale = isSub ? scale.subX : (scale.zoom || scale.x);
        var barOverlap = config.bar_overlap;
        var barPadding = config.bar_padding;
        var sum = function (p, c) { return p + c; };
        // total shapes half width
        var halfWidth = isObjectType(offset) && (offset._$total.length ? offset._$total.reduce(sum) / 2 : 0);
        return function (d) {
            var ind = $$.getIndices(indices, d, "getShapeX");
            var index = d.id in ind ? ind[d.id] : 0;
            var targetsNum = (ind.__max__ || 0) + 1;
            var x = 0;
            if (notEmpty(d.x)) {
                var xPos = currScale(d.x, true);
                if (halfWidth) {
                    var offsetWidth = offset[d.id] || offset._$width;
                    x = barOverlap ? xPos - offsetWidth / 2 : xPos - offsetWidth +
                        offset._$total.slice(0, index + 1).reduce(sum) -
                        halfWidth;
                }
                else {
                    x = xPos - (isNumber(offset) ? offset : offset._$width) *
                        (targetsNum / 2 - (barOverlap ? 1 : index));
                }
            }
            // adjust x position for bar.padding option
            if (offset && x && targetsNum > 1 && barPadding) {
                if (index) {
                    x += barPadding * index;
                }
                if (targetsNum > 2) {
                    x -= (targetsNum - 1) * barPadding / 2;
                }
                else if (targetsNum === 2) {
                    x -= barPadding / 2;
                }
            }
            return x;
        };
    },
    getShapeY: function (isSub) {
        var $$ = this;
        var isStackNormalized = $$.isStackNormalized();
        return function (d) {
            var value = d.value;
            if (isNumber(d)) {
                value = d;
            }
            else if ($$.isAreaRangeType(d)) {
                value = $$.getBaseValue(d, "mid");
            }
            else if (isStackNormalized) {
                value = $$.getRatio("index", d, true);
            }
            else if ($$.isBubbleZType(d)) {
                value = $$.getBubbleZData(d.value, "y");
            }
            else if ($$.isBarRangeType(d)) {
                // TODO use range.getEnd() like method
                value = value[1];
            }
            return $$.getYScaleById(d.id, isSub)(value);
        };
    },
    /**
     * Get shape based y Axis min value
     * @param {string} id Data id
     * @returns {number}
     * @private
     */
    getShapeYMin: function (id) {
        var $$ = this;
        var axisId = $$.axis.getId(id);
        var scale = $$.scale[axisId];
        var yMin = scale.domain()[0];
        var inverted = $$.config["axis_".concat(axisId, "_inverted")];
        return !$$.isGrouped(id) && !inverted && yMin > 0 ? yMin : 0;
    },
    /**
     * Get Shape's offset data
     * @param {Function} typeFilter Type filter function
     * @returns {object}
     * @private
     */
    getShapeOffsetData: function (typeFilter) {
        var $$ = this;
        var targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)));
        var isStackNormalized = $$.isStackNormalized();
        var shapeOffsetTargets = targets.map(function (target) {
            var rowValues = target.values;
            var values = {};
            if ($$.isStepType(target)) {
                rowValues = $$.convertValuesToStep(rowValues);
            }
            var rowValueMapByXValue = rowValues.reduce(function (out, d) {
                var key = Number(d.x);
                out[key] = d;
                values[key] = isStackNormalized ? $$.getRatio("index", d, true) : d.value;
                return out;
            }, {});
            return {
                id: target.id,
                rowValues: rowValues,
                rowValueMapByXValue: rowValueMapByXValue,
                values: values
            };
        });
        var indexMapByTargetId = targets.reduce(function (out, _a, index) {
            var id = _a.id;
            out[id] = index;
            return out;
        }, {});
        return { indexMapByTargetId: indexMapByTargetId, shapeOffsetTargets: shapeOffsetTargets };
    },
    getShapeOffset: function (typeFilter, indices, isSub) {
        var $$ = this;
        var _a = $$.getShapeOffsetData(typeFilter), shapeOffsetTargets = _a.shapeOffsetTargets, indexMapByTargetId = _a.indexMapByTargetId;
        var groupsZeroAs = $$.config.data_groupsZeroAs;
        return function (d, idx) {
            var id = d.id, value = d.value, x = d.x;
            var ind = $$.getIndices(indices, d);
            var scale = $$.getYScaleById(id, isSub);
            if ($$.isBarRangeType(d)) {
                // TODO use range.getStart()
                return scale(value[0]);
            }
            var dataXAsNumber = Number(x);
            var y0 = scale(groupsZeroAs === "zero" ? 0 : $$.getShapeYMin(id));
            var offset = y0;
            shapeOffsetTargets
                .filter(function (t) { return t.id !== id && ind[t.id] === ind[id]; })
                .forEach(function (t) {
                var tid = t.id, rowValueMapByXValue = t.rowValueMapByXValue, rowValues = t.rowValues, tvalues = t.values;
                // for same stacked group (ind[tid] === ind[id])
                if (indexMapByTargetId[tid] < indexMapByTargetId[id]) {
                    var rValue = tvalues[dataXAsNumber];
                    var row = rowValues[idx];
                    // check if the x values line up
                    if (!row || Number(row.x) !== dataXAsNumber) {
                        row = rowValueMapByXValue[dataXAsNumber];
                    }
                    if ((row === null || row === void 0 ? void 0 : row.value) * value >= 0 && isNumber(rValue)) {
                        var addOffset = value === 0 ?
                            ((groupsZeroAs === "positive" &&
                                rValue > 0) ||
                                (groupsZeroAs === "negative" && rValue < 0)) :
                            true;
                        if (addOffset) {
                            offset += scale(rValue) - y0;
                        }
                    }
                }
            });
            return offset;
        };
    },
    /**
     * Get data's y coordinate
     * @param {object} d Target data
     * @param {number} i Index number
     * @returns {number} y coordinate
     * @private
     */
    circleY: function (d, i) {
        var $$ = this;
        var id = d.id;
        var points;
        if ($$.isGrouped(id)) {
            points = getGroupedDataPointsFn.bind($$)(d);
        }
        return points ? points(d, i)[0][1] : $$.getYScaleById(id)($$.getBaseValue(d));
    },
    getBarW: function (type, axis, targetsNum) {
        var _a, _b, _c, _d, _e;
        var $$ = this;
        var config = $$.config, org = $$.org, scale = $$.scale, state = $$.state;
        var maxDataCount = $$.getMaxDataCount();
        var isGrouped = type === "bar" && ((_a = config.data_groups) === null || _a === void 0 ? void 0 : _a.length);
        var configName = "".concat(type, "_width");
        var k = ((_c = (_b = $$.getZoomTransform) === null || _b === void 0 ? void 0 : _b.call($$)) !== null && _c !== void 0 ? _c : { k: 1 }).k;
        var xMinMax = [
            (_d = config.axis_x_min) !== null && _d !== void 0 ? _d : org.xDomain[0],
            (_e = config.axis_x_max) !== null && _e !== void 0 ? _e : org.xDomain[1]
        ].map($$.axis.isTimeSeries() ? parseDate.bind($$) : Number);
        var tickInterval = axis.tickInterval(maxDataCount);
        if (scale.zoom && !$$.axis.isCategorized() && k > 1) {
            var isSameMinMax_1 = xMinMax.every(function (v, i) { return v === org.xDomain[i]; });
            tickInterval = org.xDomain.map(function (v, i) {
                var value = isSameMinMax_1 ? v : v - Math.abs(xMinMax[i]);
                return scale.zoom(value);
            }).reduce(function (a, c) { return Math.abs(a) + c; }) / maxDataCount;
        }
        var getWidth = function (id) {
            var width = id ? config[configName][id] : config[configName];
            var ratio = id ? width.ratio : config["".concat(configName, "_ratio")];
            var max = id ? width.max : config["".concat(configName, "_max")];
            var w = isNumber(width) ? width : (isFunction(width) ?
                width.call($$, state.width, targetsNum, maxDataCount) :
                (targetsNum ? (tickInterval * ratio) / targetsNum : 0));
            return max && w > max ? max : w;
        };
        var result = getWidth();
        if (!isGrouped && isObjectType(config[configName])) {
            result = { _$width: result, _$total: [] };
            $$.filterTargetsToShow($$.data.targets).forEach(function (v) {
                if (config[configName][v.id]) {
                    result[v.id] = getWidth(v.id);
                    result._$total.push(result[v.id] || result._$width);
                }
            });
        }
        return result;
    },
    /**
     * Get shape element
     * @param {string} shapeName Shape string
     * @param {number} i Index number
     * @param {string} id Data series id
     * @returns {d3Selection}
     * @private
     */
    getShapeByIndex: function (shapeName, i, id) {
        var $$ = this;
        var $el = $$.$el;
        var suffix = isValue(i) ? "-".concat(i) : "";
        var shape = $el[shapeName];
        // filter from shape reference if has
        if (shape && !shape.empty()) {
            shape = shape
                .filter(function (d) { return (id ? d.id === id : true); })
                .filter(function (d) { return (isValue(i) ? d.index === i : true); });
        }
        else {
            shape = (id ?
                $el.main
                    .selectAll(".".concat(CLASS["".concat(shapeName, "s")]).concat($$.getTargetSelectorSuffix(id))) :
                $el.main)
                .selectAll(".".concat(CLASS[shapeName]).concat(suffix));
        }
        return shape;
    },
    isWithinShape: function (that, d) {
        var _a;
        var $$ = this;
        var shape = select(that);
        var isWithin;
        if (!$$.isTargetToShow(d.id)) {
            isWithin = false;
        }
        else if ((_a = $$.hasValidPointType) === null || _a === void 0 ? void 0 : _a.call($$, that.nodeName)) {
            isWithin = $$.isStepType(d) ?
                $$.isWithinStep(that, $$.getYScaleById(d.id)($$.getBaseValue(d))) :
                $$.isWithinCircle(that, $$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0);
        }
        else if (that.nodeName === "path") {
            isWithin = shape.classed(CLASS.bar) ? $$.isWithinBar(that) : true;
        }
        return isWithin;
    },
    getInterpolate: function (d) {
        var $$ = this;
        var interpolation = $$.getInterpolateType(d);
        return {
            basis: curveBasis,
            "basis-closed": curveBasisClosed,
            "basis-open": curveBasisOpen,
            bundle: curveBundle,
            cardinal: curveCardinal,
            "cardinal-closed": curveCardinalClosed,
            "cardinal-open": curveCardinalOpen,
            "catmull-rom": curveCatmullRom,
            "catmull-rom-closed": curveCatmullRomClosed,
            "catmull-rom-open": curveCatmullRomOpen,
            "monotone-x": curveMonotoneX,
            "monotone-y": curveMonotoneY,
            natural: curveNatural,
            "linear-closed": curveLinearClosed,
            linear: curveLinear,
            step: curveStep,
            "step-after": curveStepAfter,
            "step-before": curveStepBefore
        }[interpolation];
    },
    getInterpolateType: function (d) {
        var $$ = this;
        var config = $$.config;
        var type = config.spline_interpolation_type;
        var interpolation = $$.isInterpolationType(type) ? type : "cardinal";
        return $$.isSplineType(d) ? interpolation : ($$.isStepType(d) ? config.line_step_type : "linear");
    },
    isWithinBar: function (that) {
        var mouse = getPointer(this.state.event, that);
        var list = getRectSegList(that);
        var seg0 = list[0], seg1 = list[1];
        var x = Math.min(seg0.x, seg1.x);
        var y = Math.min(seg0.y, seg1.y);
        var offset = this.config.bar_sensitivity;
        var _a = that.getBBox(), width = _a.width, height = _a.height;
        var sx = x - offset;
        var ex = x + width + offset;
        var sy = y + height + offset;
        var ey = y - offset;
        var isWithin = sx < mouse[0] &&
            mouse[0] < ex &&
            ey < mouse[1] &&
            mouse[1] < sy;
        return isWithin;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
 */
var ChartInternal = /** @class */ (function () {
    function ChartInternal(api) {
        // data object
        this.data = {
            xs: {},
            targets: []
        };
        // scales
        this.scale = {
            x: null,
            y: null,
            y2: null,
            subX: null,
            subY: null,
            subY2: null,
            zoom: null
        };
        // original values
        this.org = {
            xScale: null,
            xDomain: null
        };
        // format function
        this.format = {
            extraLineClasses: null,
            xAxisTick: null,
            dataTime: null, // dataTimeFormat
            defaultAxisTime: null, // defaultAxisTimeFormat
            axisTime: null // axisTimeFormat
        };
        var $$ = this;
        $$.api = api; // Chart class instance alias
        $$.config = new Options();
        $$.cache = new Cache();
        var store = new Store();
        $$.$el = store.getStore("element");
        $$.state = store.getStore("state");
        $$.$T = $$.$T.bind($$);
    }
    /**
     * Get the selection based on transition config
     * @param {SVGElement|d3Selection} selection Target selection
     * @param {boolean} force Force transition
     * @param {string} name Transition name
     * @returns {d3Selection}
     * @private
     */
    ChartInternal.prototype.$T = function (selection, force, name) {
        var _a = this, config = _a.config, state = _a.state;
        var duration = config.transition_duration;
        var subchart = config.subchart_show;
        var t = selection;
        if (t) {
            // in case of non d3 selection, wrap with d3 selection
            if ("tagName" in t) {
                t = select(t);
            }
            // do not transit on:
            // - wheel zoom (state.zooming = true)
            // - when has no subchart
            // - initialization
            // - resizing
            var transit = ((force !== false && duration) || force) &&
                (!state.zooming || state.dragging) &&
                !state.resizing &&
                state.rendered &&
                !subchart;
            // @ts-ignore
            t = (transit ? t.transition(name).duration(duration) : t);
        }
        return t;
    };
    ChartInternal.prototype.beforeInit = function () {
        var $$ = this;
        $$.callPluginHook("$beforeInit");
        // can do something
        callFn($$.config.onbeforeinit, $$.api);
    };
    ChartInternal.prototype.afterInit = function () {
        var $$ = this;
        $$.callPluginHook("$afterInit");
        // can do something
        callFn($$.config.onafterinit, $$.api);
    };
    ChartInternal.prototype.init = function () {
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var useCssRule = config.boost_useCssRule;
        checkModuleImport($$);
        state.hasRadar = !state.hasAxis && $$.hasType("radar");
        state.hasFunnel = !state.hasAxis && $$.hasType("funnel");
        state.hasTreemap = !state.hasAxis && $$.hasType("treemap");
        state.hasAxis = !$$.hasArcType() && !state.hasFunnel && !state.hasTreemap;
        // datetime to be used for uniqueness
        state.datetimeId = "bb-".concat(+new Date() * getRandom());
        if (useCssRule) {
            // append style element
            var styleEl = doc.createElement("style");
            // styleEl.id = styleId;
            styleEl.type = "text/css";
            doc.head.appendChild(styleEl);
            state.style = {
                rootSelctor: ".".concat(state.datetimeId),
                sheet: styleEl.sheet
            };
            // used on .destroy()
            $el.style = styleEl;
        }
        var bindto = {
            element: config.bindto,
            classname: "bb"
        };
        if (isObject(config.bindto)) {
            bindto.element = config.bindto.element || "#chart";
            bindto.classname = config.bindto.classname || bindto.classname;
        }
        // select bind element
        $el.chart = isFunction(bindto.element.node) ?
            config.bindto.element :
            select(bindto.element || []);
        if ($el.chart.empty()) {
            $el.chart = select(doc.body.appendChild(doc.createElement("div")));
        }
        $el.chart.html("")
            .classed(bindto.classname, true)
            .classed(state.datetimeId, useCssRule)
            .style("position", "relative");
        $$.initParams();
        $$.initToRender();
    };
    /**
     * Initialize the rendering process
     * @param {boolean} forced Force to render process
     * @private
     */
    ChartInternal.prototype.initToRender = function (forced) {
        var $$ = this;
        var config = $$.config, state = $$.state, chart = $$.$el.chart;
        var isHidden = function () { return hasStyle(chart, { display: "none", visibility: "hidden" }); };
        var isLazy = config.render.lazy === false ? false : config.render.lazy || isHidden();
        var MutationObserver = win.MutationObserver;
        if (isLazy && MutationObserver && config.render.observe !== false && !forced) {
            new MutationObserver(function (mutation, observer) {
                if (!isHidden()) {
                    observer.disconnect();
                    !state.rendered && $$.initToRender(true);
                }
            }).observe(chart.node(), {
                attributes: true,
                attributeFilter: ["class", "style"]
            });
        }
        if (!isLazy || forced) {
            $$.convertData(config, function (res) {
                $$.initWithData(res);
                $$.afterInit();
            });
        }
    };
    ChartInternal.prototype.initParams = function () {
        var _a;
        var $$ = this;
        var config = $$.config, format = $$.format, state = $$.state;
        var isRotated = config.axis_rotated;
        // color settings
        $$.color = $$.generateColor();
        $$.levelColor = $$.generateLevelColor();
        // when 'padding=false' is set, disable axes and subchart. Because they are useless.
        if (config.padding === false) {
            config.axis_x_show = false;
            config.axis_y_show = false;
            config.axis_y2_show = false;
            config.subchart_show = false;
        }
        if ($$.hasPointType() || ((_a = $$.hasLegendDefsPoint) === null || _a === void 0 ? void 0 : _a.call($$))) {
            $$.point = $$.generatePoint();
        }
        if (state.hasAxis) {
            $$.initClip();
            format.extraLineClasses = $$.generateExtraLineClass();
            format.dataTime = config.data_xLocaltime ? timeParse : utcParse;
            format.axisTime = config.axis_x_localtime ? timeFormat : utcFormat;
            var isDragZoom_1 = $$.config.zoom_enabled && $$.config.zoom_type === "drag";
            format.defaultAxisTime = function (d) {
                var _a = $$.scale, x = _a.x, zoom = _a.zoom;
                var isZoomed = isDragZoom_1 ?
                    zoom :
                    zoom && x.orgDomain().toString() !== zoom.domain().toString();
                var specifier = (d.getMilliseconds() && ".%L") ||
                    (d.getSeconds() && ".:%S") ||
                    (d.getMinutes() && "%I:%M") ||
                    (d.getHours() && "%I %p") ||
                    (d.getDate() !== 1 && "%b %d") ||
                    (isZoomed && d.getDate() === 1 && "%b'%y") ||
                    (d.getMonth() && "%-m/%-d") || "%Y";
                return format.axisTime(specifier)(d);
            };
        }
        state.isLegendRight = config.legend_position === "right";
        state.isLegendInset = config.legend_position === "inset";
        state.isLegendTop = config.legend_inset_anchor === "top-left" ||
            config.legend_inset_anchor === "top-right";
        state.isLegendLeft = config.legend_inset_anchor === "top-left" ||
            config.legend_inset_anchor === "bottom-left";
        state.rotatedPadding.top = $$.getResettedPadding(state.rotatedPadding.top);
        state.rotatedPadding.right = isRotated && !config.axis_x_show ? 0 : 30;
        state.inputType = convertInputType(config.interaction_inputType_mouse, config.interaction_inputType_touch);
    };
    ChartInternal.prototype.initWithData = function (data) {
        var _a, _b, _c;
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, $el = $$.$el, org = $$.org;
        var hasAxis = state.hasAxis, hasFunnel = state.hasFunnel, hasTreemap = state.hasTreemap;
        var hasInteraction = config.interaction_enabled;
        var hasPolar = $$.hasType("polar");
        var labelsBGColor = config.data_labels_backgroundColors;
        // for arc type, set axes to not be shown
        // $$.hasArcType() && ["x", "y", "y2"].forEach(id => (config[`axis_${id}_show`] = false));
        if (hasAxis) {
            $$.axis = $$.getAxisInstance();
            config.zoom_enabled && $$.initZoom();
        }
        // Init data as targets
        $$.data.xs = {};
        $$.data.targets = $$.convertDataToTargets(data);
        if (config.data_filter) {
            $$.data.targets = $$.data.targets.filter(config.data_filter.bind($$.api));
        }
        // Set targets to hide if needed
        if (config.data_hide) {
            $$.addHiddenTargetIds(config.data_hide === true ? $$.mapToIds($$.data.targets) : config.data_hide);
        }
        if (config.legend_hide) {
            $$.addHiddenLegendIds(config.legend_hide === true ? $$.mapToIds($$.data.targets) : config.legend_hide);
        }
        // Init sizes and scales
        $$.updateSizes();
        $$.updateScales(true);
        // retrieve scale after the 'updateScales()' is called
        if (hasAxis) {
            var x = scale.x, y = scale.y, y2 = scale.y2, subX = scale.subX, subY = scale.subY, subY2 = scale.subY2;
            // Set domains for each scale
            if (x) {
                x.domain(sortValue($$.getXDomain($$.data.targets), !config.axis_x_inverted));
                subX.domain(x.domain());
                // Save original x domain for zoom update
                org.xDomain = x.domain();
            }
            if (y) {
                y.domain($$.getYDomain($$.data.targets, "y"));
                subY.domain(y.domain());
            }
            if (y2) {
                y2.domain($$.getYDomain($$.data.targets, "y2"));
                subY2 && subY2.domain(y2.domain());
            }
        }
        // -- Basic Elements --
        $el.svg = $el.chart.append("svg")
            .style("overflow", "hidden")
            .style("display", "block");
        if (hasInteraction && state.inputType) {
            var isTouch = state.inputType === "touch";
            var onclick_1 = config.onclick, onover = config.onover, onout = config.onout;
            $el.svg
                .on("click", (onclick_1 === null || onclick_1 === void 0 ? void 0 : onclick_1.bind($$.api)) || null)
                .on(isTouch ? "touchstart" : "mouseenter", (onover === null || onover === void 0 ? void 0 : onover.bind($$.api)) || null)
                .on(isTouch ? "touchend" : "mouseleave", (onout === null || onout === void 0 ? void 0 : onout.bind($$.api)) || null);
        }
        config.svg_classname && $el.svg.attr("class", config.svg_classname);
        // Define defs
        var hasColorPatterns = isFunction(config.color_tiles) && $$.patterns;
        if (hasAxis || hasColorPatterns || hasPolar || hasTreemap ||
            labelsBGColor || ((_a = $$.hasLegendDefsPoint) === null || _a === void 0 ? void 0 : _a.call($$))) {
            $el.defs = $el.svg.append("defs");
            if (hasAxis) {
                ["id", "idXAxis", "idYAxis", "idGrid"].forEach(function (v) {
                    $$.appendClip($el.defs, state.clip[v]);
                });
            }
            // Append data background color filter definition
            $$.generateTextBGColorFilter(labelsBGColor);
            // set color patterns
            if (hasColorPatterns) {
                $$.patterns.forEach(function (p) { return $el.defs.append(function () { return p.node; }); });
            }
        }
        $$.updateSvgSize();
        // Bind resize event
        $$.bindResize();
        // Define regions
        var main = $el.svg.append("g")
            .classed($COMMON.main, true)
            .attr("transform", hasFunnel || hasTreemap ? null : $$.getTranslate("main"));
        $el.main = main;
        // initialize subchart when subchart show option is set
        config.subchart_show && $$.initSubchart();
        config.tooltip_show && $$.initTooltip();
        config.title_text && $$.initTitle();
        !hasTreemap && config.legend_show && $$.initLegend();
        // -- Main Region --
        // text when empty
        if (config.data_empty_label_text) {
            main.append("text")
                .attr("class", "".concat($TEXT.text, " ").concat($COMMON.empty))
                .attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
                .attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.
        }
        if (hasAxis) {
            // Regions
            config.regions.length && $$.initRegion();
            // Add Axis here, when clipPath is 'false'
            !config.clipPath && $$.axis.init();
        }
        // Define g for chart area
        main.append("g")
            .classed($COMMON.chart, true)
            .attr("clip-path", hasAxis ? state.clip.path : null);
        $$.callPluginHook("$init");
        $$.initChartElements();
        if (hasAxis) {
            // Cover whole with rects for events
            hasInteraction && ((_b = $$.initEventRect) === null || _b === void 0 ? void 0 : _b.call($$));
            // Grids
            $$.initGrid();
            // Add Axis here, when clipPath is 'true'
            config.clipPath && ((_c = $$.axis) === null || _c === void 0 ? void 0 : _c.init());
        }
        // Set targets
        $$.updateTargets($$.data.targets);
        // Draw with targets
        $$.updateDimension();
        // oninit callback
        callFn(config.oninit, $$.api);
        // Set background
        $$.setBackground();
        $$.redraw({
            withTransition: false,
            withTransform: true,
            withUpdateXDomain: true,
            withUpdateOrgXDomain: true,
            withTransitionForAxis: false,
            initializing: true
        });
        // data.onmin/max callback
        if (config.data_onmin || config.data_onmax) {
            var minMax = $$.getMinMaxData();
            callFn(config.data_onmin, $$.api, minMax.min);
            callFn(config.data_onmax, $$.api, minMax.max);
        }
        config.tooltip_show && $$.initShowTooltip();
        state.rendered = true;
    };
    /**
     * Initialize chart elements
     * @private
     */
    ChartInternal.prototype.initChartElements = function () {
        var $$ = this;
        var _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar, hasTreemap = _a.hasTreemap;
        var types = [];
        if (hasAxis) {
            var shapes = ["bar", "bubble", "candlestick", "line"];
            if ($$.config.bar_front) {
                shapes.push(shapes.shift());
            }
            shapes.forEach(function (v) {
                var name = capitalize(v);
                if ((v === "line" && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    types.push(name);
                }
            });
        }
        else if (hasTreemap) {
            types.push("Treemap");
        }
        else if ($$.hasType("funnel")) {
            types.push("Funnel");
        }
        else {
            var hasPolar = $$.hasType("polar");
            if (!hasRadar) {
                types.push("Arc", "Pie");
            }
            if ($$.hasType("gauge")) {
                types.push("Gauge");
            }
            else if (hasRadar) {
                types.push("Radar");
            }
            else if (hasPolar) {
                types.push("Polar");
            }
        }
        types.forEach(function (v) {
            $$["init".concat(v)]();
        });
        notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"]) && $$.initText();
    };
    /**
     * Set chart elements
     * @private
     */
    ChartInternal.prototype.setChartElements = function () {
        var $$ = this;
        var _a = $$.$el, chart = _a.chart, svg = _a.svg, defs = _a.defs, main = _a.main, tooltip = _a.tooltip, legend = _a.legend, title = _a.title, grid = _a.grid, needle = _a.needle, arc = _a.arcs, circles = _a.circle, bars = _a.bar, candlestick = _a.candlestick, lines = _a.line, areas = _a.area, texts = _a.text;
        // public
        $$.api.$ = {
            chart: chart,
            svg: svg,
            defs: defs,
            main: main,
            tooltip: tooltip,
            legend: legend,
            title: title,
            grid: grid,
            arc: arc,
            circles: circles,
            bar: { bars: bars },
            candlestick: candlestick,
            line: { lines: lines, areas: areas },
            needle: needle,
            text: { texts: texts }
        };
    };
    /**
     * Set background element/image
     * @private
     */
    ChartInternal.prototype.setBackground = function () {
        var $$ = this;
        var bg = $$.config.background, state = $$.state, svg = $$.$el.svg;
        if (notEmpty(bg)) {
            var element = svg.select("g")
                .insert(bg.imgUrl ? "image" : "rect", ":first-child");
            if (bg.imgUrl) {
                element.attr("href", bg.imgUrl);
            }
            else if (bg.color) {
                element
                    .style("fill", bg.color)
                    .attr("clip-path", state.clip.path);
            }
            element
                .attr("class", bg.class || null)
                .attr("width", "100%")
                .attr("height", "100%");
        }
    };
    /**
     * Update targeted element with given data
     * @param {object} targets Data object formatted as 'target'
     * @private
     */
    ChartInternal.prototype.updateTargets = function (targets) {
        var _a;
        var $$ = this;
        var _b = $$.state, hasAxis = _b.hasAxis, hasFunnel = _b.hasFunnel, hasRadar = _b.hasRadar, hasTreemap = _b.hasTreemap;
        var helper = function (type) {
            return $$["updateTargetsFor".concat(type)](targets.filter($$["is".concat(type, "Type")].bind($$)));
        };
        // Text
        $$.updateTargetsForText(targets);
        if (hasAxis) {
            ["bar", "candlestick", "line"].forEach(function (v) {
                var name = capitalize(v);
                if ((v === "line" && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    helper(name);
                }
            });
            // Sub Chart
            $$.updateTargetsForSubchart &&
                $$.updateTargetsForSubchart(targets);
            // Arc, Polar, Radar
        }
        else if ($$.hasArcType(targets)) {
            var type = "Arc";
            if (hasRadar) {
                type = "Radar";
            }
            else if ($$.hasType("polar")) {
                type = "Polar";
            }
            helper(type);
        }
        else if (hasFunnel) {
            helper("Funnel");
        }
        else if (hasTreemap) {
            helper("Treemap");
        }
        // Point types
        var hasPointType = $$.hasType("bubble") || $$.hasType("scatter");
        if (hasPointType) {
            (_a = $$.updateTargetForCircle) === null || _a === void 0 ? void 0 : _a.call($$);
        }
        // Fade-in each chart
        $$.filterTargetsToShowAtInit(hasPointType);
    };
    /**
     * Display targeted elements at initialization
     * @param {boolean} hasPointType whether has point type(bubble, scatter) or not
     * @private
     */
    ChartInternal.prototype.filterTargetsToShowAtInit = function (hasPointType) {
        if (hasPointType === void 0) { hasPointType = false; }
        var $$ = this;
        var svg = $$.$el.svg, $T = $$.$T;
        var selector = ".".concat($COMMON.target);
        if (hasPointType) {
            selector += ", .".concat($CIRCLE.chartCircles, " > .").concat($CIRCLE.circles);
        }
        $T(svg.selectAll(selector)
            .filter(function (d) { return $$.isTargetToShow(d.id); })).style("opacity", null);
    };
    ChartInternal.prototype.getWithOption = function (options) {
        var withOptions = {
            Dimension: true,
            EventRect: true,
            Legend: false,
            Subchart: true,
            Transform: false,
            Transition: true,
            TrimXDomain: true,
            UpdateXAxis: "UpdateXDomain",
            UpdateXDomain: false,
            UpdateOrgXDomain: false,
            TransitionForExit: "Transition",
            TransitionForAxis: "Transition",
            Y: true
        };
        Object.keys(withOptions).forEach(function (key) {
            var defVal = withOptions[key];
            if (isString(defVal)) {
                defVal = withOptions[defVal];
            }
            withOptions[key] = getOption(options, "with".concat(key), defVal);
        });
        return withOptions;
    };
    ChartInternal.prototype.initialOpacity = function (d) {
        var $$ = this;
        var withoutFadeIn = $$.state.withoutFadeIn;
        var r = $$.getBaseValue(d) !== null &&
            withoutFadeIn[d.id] ?
            null :
            "0";
        return r;
    };
    ChartInternal.prototype.bindResize = function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var resizeFunction = generateResize(config.resize_timer);
        var list = [];
        list.push(function () { return callFn(config.onresize, $$.api); });
        if (config.resize_auto === true) {
            list.push(function () {
                state.resizing = true;
                // https://github.com/naver/billboard.js/issues/2650
                if (config.legend_show) {
                    $$.updateSizes();
                    $$.updateLegend();
                }
                $$.api.flush(false);
            });
        }
        list.push(function () {
            callFn(config.onresized, $$.api);
            state.resizing = false;
        });
        // add resize functions
        list.forEach(function (v) { return resizeFunction.add(v); });
        $$.resizeFunction = resizeFunction;
        // attach resize event
        win.addEventListener("resize", $$.resizeFunction = resizeFunction);
    };
    /**
     * Call plugin hook
     * @param {string} phase The lifecycle phase
     * @param {Array} args Arguments
     * @private
     */
    ChartInternal.prototype.callPluginHook = function (phase) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.config.plugins.forEach(function (v) {
            if (phase === "$beforeInit") {
                v.$$ = _this;
                _this.api.plugins.push(v);
            }
            v[phase].apply(v, args);
        });
    };
    return ChartInternal;
}());
extend(ChartInternal.prototype, [
    // common
    dataConvert,
    data$1,
    dataLoad,
    category,
    classModule,
    color,
    domain,
    interaction,
    format,
    legend$1,
    redraw,
    scale,
    shape,
    size,
    style,
    text,
    title,
    tooltip$1,
    transform,
    typeInternals
]);

/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
    var thisConfig = this.config;
    var target;
    var keys;
    var read;
    var find = function () {
        var key = keys.shift();
        if (key && target && isObjectType(target) && key in target) {
            target = target[key];
            return find();
        }
        else if (!key) {
            return target;
        }
        return undefined;
    };
    Object.keys(thisConfig).forEach(function (key) {
        target = config;
        keys = key.split("_");
        read = find();
        if (isDefined(read)) {
            thisConfig[key] = read;
        }
    });
    // only should run in the ChartInternal context
    if (this.api) {
        this.state.orgConfig = config;
    }
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiChart = {
    /**
     * Resize the chart.
     * @function resize
     * @instance
     * @memberof Chart
     * @param {object} size This argument should include width and height in pixels.
     * @param {number} [size.width] width value
     * @param {number} [size.height] height value
     * @example
     * // Resize to 640x480
     * chart.resize({
     *    width: 640,
     *    height: 480
     * });
     */
    resize: function (size) {
        var $$ = this.internal;
        var config = $$.config, state = $$.state;
        if (state.rendered) {
            config.size_width = size ? size.width : null;
            config.size_height = size ? size.height : null;
            state.resizing = true;
            this.flush(false);
            $$.resizeFunction();
        }
    },
    /**
     * Force to redraw.
     * - **NOTE:** When zoom/subchart is used, the zoomed state will be resetted.
     * @function flush
     * @instance
     * @memberof Chart
     * @param {boolean} [soft] For soft redraw.
     * @example
     * chart.flush();
     *
     * // for soft redraw
     * chart.flush(true);
     */
    flush: function (soft) {
        var _a, _b;
        var $$ = this.internal;
        var state = $$.state, zoomResetBtn = $$.$el.zoomResetBtn;
        if (state.rendered) {
            // reset possible zoom scale when is called from resize event
            if (state.resizing) { // arguments[1] is given when is called from resize
                (_a = $$.brush) === null || _a === void 0 ? void 0 : _a.updateResize();
            }
            else {
                // re-update config info
                (_b = $$.axis) === null || _b === void 0 ? void 0 : _b.setOrient();
            }
            // hide possible reset zoom button
            // https://github.com/naver/billboard.js/issues/2201
            zoomResetBtn === null || zoomResetBtn === void 0 ? void 0 : zoomResetBtn.style("display", "none");
            $$.scale.zoom = null;
            soft ?
                $$.redraw({
                    withTransform: true,
                    withUpdateXDomain: true,
                    withUpdateOrgXDomain: true,
                    withLegend: true
                }) :
                $$.updateAndRedraw({
                    withLegend: true,
                    withTransition: false,
                    withTransitionForTransform: false
                });
            // reset subchart selection & selection state
            if (!state.resizing && $$.brush) {
                $$.brush.getSelection().call($$.brush.move);
                $$.unselectRect();
            }
        }
        else {
            $$.initToRender(true);
        }
    },
    /**
     * Reset the chart object and remove element and events completely.
     * @function destroy
     * @instance
     * @memberof Chart
     * @returns {null}
     * @example
     * chart.destroy();
     */
    destroy: function () {
        var _this = this;
        var $$ = this.internal;
        var _a = $$.$el, chart = _a.chart, style = _a.style, svg = _a.svg;
        if (notEmpty($$)) {
            $$.callPluginHook("$willDestroy");
            $$.charts.splice($$.charts.indexOf(this), 1);
            // detach events
            $$.unbindAllEvents();
            // clear timers && pending transition
            svg.select("*").interrupt();
            $$.resizeFunction.clear();
            win.removeEventListener("resize", $$.resizeFunction);
            chart.classed("bb", false)
                .style("position", null)
                .selectChildren()
                .remove();
            // remove <style> element added by boost.useCssRule option
            style && style.parentNode.removeChild(style);
            // releasing own references
            Object.keys(this).forEach(function (key) {
                key === "internal" && Object.keys($$).forEach(function (k) {
                    $$[k] = null;
                });
                _this[key] = null;
                delete _this[key];
            });
            // release prototype chains
            for (var key in this) {
                this[key] = function () { };
            }
        }
        return null;
    },
    /**
     * Get or set config option value.
     * - **NOTE**
     *  - The option key name must be specified as the last level.
     *  - when no argument is given, will return all specified generation options object only. (will exclude any other options not specified at the initialization)
     * @function config
     * @instance
     * @memberof Chart
     * @param {string} name The option key name.
     * @param {*} [value] The value accepted for indicated option.
     * @param {boolean} [redraw] Set to redraw with the new option changes.
     * - **NOTE:** Doesn't guarantee work in all circumstances. It can be applied for limited options only.
     * @returns {*}
     * @example
     *
     * // Getter
     * chart.config("gauge.max");
     *
     * // Getter specified with top level key name will not work.
     * // The option key name must be specified as the last level.
     * // chart.config("gauge"); // will not work
     *
     * // without any arguments, it returns generation config object
     * chart.config();  // {data: { ... }, axis: { ... }, ...}
     *
     * // Setter
     * chart.config("gauge.max", 100);
     *
     * // Setter specified with top level key name will not work.
     * // The option key name must be specified as the last level.
     * // chart.config("gauge", {min: 10, max: 20}); // will not work
     *
     * // Setter & redraw with the new option
     * chart.config("gauge.max", 100, true);
     */
    config: function (name, value, redraw) {
        var $$ = this.internal;
        var config = $$.config, state = $$.state;
        var key = name === null || name === void 0 ? void 0 : name.replace(/\./g, "_");
        var res;
        if (name && key in config) {
            if (isDefined(value)) {
                config[key] = value;
                res = value;
                redraw && this.flush();
            }
            else {
                res = config[key];
            }
        }
        else if (arguments.length === 0 || isEmpty(name)) {
            res = state.orgConfig;
        }
        return res;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiColor = {
    /**
     * Get the color
     * @function color
     * @instance
     * @memberof Chart
     * @param {string} id id to get the color
     * @returns {string}
     * @example
     * chart.color("data1");
     */
    color: function (id) {
        return this.internal.color(id); // more patterns
    }
};

/**
 * Get data loaded in the chart.
 * @function data
 * @instance
 * @memberof Chart
 * @param {string|Array} targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
 * @returns {Array} Data objects
 * @example
 * // Get only data1 data
 * chart.data("data1");
 * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
 *
 * // Get data1 and data2 data
 * chart.data(["data1", "data2"]);
 *
 * // Get all data
 * chart.data();
 */
var data = function (targetIds) {
    var targets = this.internal.data.targets;
    if (!isUndefined(targetIds)) {
        var ids_1 = isArray(targetIds) ? targetIds : [targetIds];
        return targets.filter(function (t) { return ids_1.some(function (v) { return v === t.id; }); });
    }
    return targets;
};
extend(data, {
    /**
     * Get data shown in the chart.
     * @function data․shown
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
     * @returns {Array} Data objects
     * @example
     * // Get shown data by filtering to include only data1 data
     * chart.data.shown("data1");
     * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
     *
     * // Get shown data by filtering to include data1 and data2 data
     * chart.data.shown(["data1", "data2"]);
     *
     * // Get all shown data
     * chart.data.shown();
     */
    shown: function (targetIds) {
        return this.internal.filterTargetsToShow(this.data(targetIds));
    },
    /**
     * Get values of the data loaded in the chart.
     * @function data․values
     * @instance
     * @memberof Chart
     * @param {string|Array|null} targetIds This API returns the values of specified target. If this argument is not given, null will be retruned
     * @param {boolean} [flat=true] Get flatten values
     * @returns {Array} Data values
     * @example
     * // Get data1 values
     * chart.data.values("data1");
     * // --> [10, 20, 30, 40]
     */
    values: function (targetIds, flat) {
        if (flat === void 0) { flat = true; }
        var values = null;
        if (targetIds) {
            var targets = this.data(targetIds);
            if (isArray(targets)) {
                values = [];
                targets.forEach(function (v) {
                    var dataValue = v.values.map(function (d) { return d.value; });
                    flat ? (values = values.concat(dataValue)) : values.push(dataValue);
                });
            }
        }
        return values;
    },
    /**
     * Get and set names of the data loaded in the chart.
     * @function data․names
     * @instance
     * @memberof Chart
     * @param {object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as [data.names](./Options.html#.data%25E2%2580%25A4names).
     * @returns {object} Corresponding names according its key value, if specified names values.
     * @example
     * // Get current names
     * chart.data.names();
     * // --> {data1: "test1", data2: "test2"}
     *
     * // Update names
     * chart.data.names({
     *  data1: "New Name 1",
     *  data2: "New Name 2"
     * });
     */
    names: function (names) {
        var $$ = this.internal;
        return $$.updateDataAttributes("names", names);
    },
    /**
     * Get and set colors of the data loaded in the chart.
     * @function data․colors
     * @instance
     * @memberof Chart
     * @param {object} colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as [data.colors](./Options.html#.data%25E2%2580%25A4colors).
     * @returns {object} Corresponding data color value according its key value.
     * @example
     * // Get current colors
     * chart.data.colors();
     * // --> {data1: "#00c73c", data2: "#fa7171"}
     *
     * // Update colors
     * chart.data.colors({
     *  data1: "#FFFFFF",
     *  data2: "#000000"
     * });
     */
    colors: function (colors) {
        return this.internal.updateDataAttributes("colors", colors);
    },
    /**
     * Get and set axes of the data loaded in the chart.
     * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
     * @function data․axes
     * @instance
     * @memberof Chart
     * @param {object} axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as
     * @returns {object} Corresponding axes value for data, if specified axes value.
     * @example
     * // Get current axes
     * chart.data.axes();
     * // --> {data1: "y"}
     *
     * // Update axes
     * chart.data.axes({
     *  data1: "y",
     *  data2: "y2"
     * });
     */
    axes: function (axes) {
        return this.internal.updateDataAttributes("axes", axes);
    },
    /**
     * Get the minimum data value bound to the chart
     * @function data․min
     * @instance
     * @memberof Chart
     * @returns {Array} Data objects
     * @example
     * // Get current axes
     * chart.data.min();
     * // --> [{x: 0, value: 30, id: "data1", index: 0}, ...]
     */
    min: function () {
        return this.internal.getMinMaxData().min;
    },
    /**
     * Get the maximum data value bound to the chart
     * @function data․max
     * @instance
     * @memberof Chart
     * @returns {Array} Data objects
     * @example
     * // Get current axes
     * chart.data.max();
     * // --> [{x: 3, value: 400, id: "data1", index: 3}, ...]
     */
    max: function () {
        return this.internal.getMinMaxData().max;
    }
});
var apiData = { data: data };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Encode to base64
 * @param {string} str string to be encoded
 * @returns {string}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
var b64EncodeUnicode = function (str) {
    var _a;
    return (_a = win.btoa) === null || _a === void 0 ? void 0 : _a.call(win, encodeURIComponent(str)
        .replace(/%([0-9A-F]{2})/g, function (match, p) { return String.fromCharCode(Number("0x".concat(p))); }));
};
/**
 * Convert svg node to data url
 * @param {HTMLElement} node target node
 * @param {object} option object containing {width, height, preserveAspectRatio}
 * @param {object} orgSize object containing {width, height}
 * @returns {string}
 * @private
 */
function nodeToSvgDataUrl(node, option, orgSize) {
    var _a = option || orgSize, width = _a.width, height = _a.height;
    var serializer = new XMLSerializer();
    var clone = node.cloneNode(true);
    var cssText = getCssRules(toArray(doc.styleSheets))
        .filter(function (r) { return r.cssText; })
        .map(function (r) { return r.cssText; });
    clone.setAttribute("xmlns", namespaces.xhtml);
    // remove padding & margin
    clone.style.margin = "0";
    clone.style.padding = "0";
    // remove text nodes
    if (option.preserveFontStyle) {
        clone.querySelectorAll("text").forEach(function (t) {
            t.innerHTML = "";
        });
    }
    var nodeXml = serializer.serializeToString(clone);
    // escape css for XML
    var style = doc.createElement("style");
    style.appendChild(doc.createTextNode(cssText.join("\n")));
    var styleXml = serializer.serializeToString(style);
    // foreignObject not supported in IE11 and below
    // https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx
    var dataStr = "<svg xmlns=\"".concat(namespaces.svg, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" \n\t\tviewBox=\"0 0 ").concat(orgSize.width, " ").concat(orgSize.height, "\" \n\t\tpreserveAspectRatio=\"").concat((option === null || option === void 0 ? void 0 : option.preserveAspectRatio) === false ? "none" : "xMinYMid meet", "\">\n\t\t\t<foreignObject width=\"100%\" height=\"100%\">\n\t\t\t\t").concat(styleXml, "\n\t\t\t\t").concat(nodeXml.replace(/(url\()[^#]+/g, "$1"), "\n\t\t\t</foreignObject></svg>");
    return "data:image/svg+xml;base64,".concat(b64EncodeUnicode(dataStr));
}
/**
 * Get coordinate of the element
 * @param {SVGElement} elem Target element
 * @param {object} svgOffset SVG offset
 * @returns {object}
 * @private
 */
function getCoords(elem, svgOffset) {
    var top = svgOffset.top, left = svgOffset.left;
    var _a = elem.getBBox(), x = _a.x, y = _a.y;
    var _b = elem.getScreenCTM(), a = _b.a, b = _b.b, c = _b.c, d = _b.d, e = _b.e, f = _b.f;
    var _c = elem.getBoundingClientRect(), width = _c.width, height = _c.height;
    return {
        x: (a * x) + (c * y) + e - left,
        y: (b * x) + (d * y) + f - top + (height - Math.round(height / 4)),
        width: width,
        height: height
    };
}
/**
 * Get text glyph
 * @param {SVGTextElement} svg Target svg node
 * @returns {Array}
 * @private
 */
function getGlyph(svg) {
    var _a = svg.getBoundingClientRect(), left = _a.left, top = _a.top;
    var filterFn = function (t) { return t.textContent || t.childElementCount; };
    var glyph = [];
    toArray(svg.querySelectorAll("text"))
        .filter(filterFn)
        .forEach(function (t) {
        var getStyleFn = function (ts) {
            var _a;
            var _b = win.getComputedStyle(ts), fill = _b.fill, fontFamily = _b.fontFamily, fontSize = _b.fontSize, textAnchor = _b.textAnchor, transform = _b.transform;
            var _c = getCoords(ts, { left: left, top: top }), x = _c.x, y = _c.y, width = _c.width, height = _c.height;
            return _a = {},
                _a[ts.textContent] = {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    fill: fill,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    textAnchor: textAnchor,
                    transform: transform
                },
                _a;
        };
        if (t.childElementCount > 1) {
            var text = [];
            toArray(t.querySelectorAll("tspan"))
                .filter(filterFn)
                .forEach(function (ts) {
                glyph.push(getStyleFn(ts));
            });
            return text;
        }
        else {
            glyph.push(getStyleFn(t));
        }
    });
    return glyph;
}
/**
 * Render text glyph
 * - NOTE: Called when the 'preserveFontStyle' option is true
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Array} glyph Text glyph array
 * @private
 */
function renderText(ctx, glyph) {
    glyph.forEach(function (g) {
        Object.keys(g).forEach(function (key) {
            var _a = g[key], x = _a.x, y = _a.y, width = _a.width, height = _a.height, fill = _a.fill, fontFamily = _a.fontFamily, fontSize = _a.fontSize, transform = _a.transform;
            ctx.save();
            ctx.font = "".concat(fontSize, " ").concat(fontFamily);
            ctx.fillStyle = fill;
            if (transform === "none") {
                ctx.fillText(key, x, y);
            }
            else {
                var args = transform
                    .replace(/(matrix|\(|\))/g, "")
                    .split(",");
                if (args.splice(4).every(function (v) { return +v === 0; })) {
                    args.push(x + width - (width / 4));
                    args.push(y - height + (height / 3));
                }
                else {
                    args.push(x);
                    args.push(y);
                }
                ctx.transform.apply(ctx, args);
                ctx.fillText(key, 0, 0);
            }
            ctx.restore();
        });
    });
}
var apiExport = {
    /**
     * Export chart as an image.
     * - **NOTE:**
     *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
     *   - Every style applied to the chart & the basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
     * @function export
     * @instance
     * @memberof Chart
     * @param {object} option Export option
     * @param {string} [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
     * @param {number} [option.width={currentWidth}] width
     * @param {number} [option.height={currentHeigth}] height
     * @param {boolean} [option.preserveAspectRatio=true] Preserve aspect ratio on given size
     * @param {boolean} [option.preserveFontStyle=false] Preserve font style(font-family).<br>
     * **NOTE:**
     *   - This option is useful when outlink web font style's `font-family` are applied to chart's text element.
     *   - Text element's position(especially "transformed") can't be preserved correctly according the page's layout condition.
     *   - If need to preserve accurate text position, embed the web font data within to the page and set `preserveFontStyle=false`.
     *     - Checkout the embed example: <a href="https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html">https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html</a>
     * @param {Function} [callback] The callback to be invoked when export is ready.
     * @returns {string} dataURI
     * @example
     *  chart.export();
     *  // --> "data:image/svg+xml;base64,PHN..."
     *
     *  // Initialize the download automatically
     *  chart.export({mimeType: "image/png"}, dataUrl => {
     *     const link = document.createElement("a");
     *
     *     link.download = `${Date.now()}.png`;
     *     link.href = dataUrl;
     *     link.innerHTML = "Download chart as image";
     *
     *     document.body.appendChild(link);
     *  });
     *
     *  // Resize the exported image
     *  chart.export(
     *    {
     *      width: 800,
     *      height: 600,
     *      preserveAspectRatio: false,
     *      preserveFontStyle: false,
     *      mimeType: "image/png"
     *    },
     *    dataUrl => { ... }
     *  );
     */
    export: function (option, callback) {
        var _this = this;
        var $$ = this.internal;
        var state = $$.state, _a = $$.$el, chart = _a.chart, svg = _a.svg;
        var _b = state.current, width = _b.width, height = _b.height;
        var opt = mergeObj({
            width: width,
            height: height,
            preserveAspectRatio: true,
            preserveFontStyle: false,
            mimeType: "image/png"
        }, option);
        var svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, { width: width, height: height });
        var glyph = opt.preserveFontStyle ? getGlyph(svg.node()) : [];
        if (callback && isFunction(callback)) {
            var img_1 = new Image();
            img_1.crossOrigin = "Anonymous";
            img_1.onload = function () {
                var canvas = doc.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = opt.width || width;
                canvas.height = opt.height || height;
                ctx.drawImage(img_1, 0, 0);
                if (glyph.length) {
                    renderText(ctx, glyph);
                    // release glyph array
                    glyph.length = 0;
                }
                callback.bind(_this)(canvas.toDataURL(opt.mimeType));
            };
            img_1.src = svgDataUrl;
        }
        return svgDataUrl;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiFocus = {
    /**
     * This API highlights specified targets and fade out the others.<br><br>
     * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
     * @function focus
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIdsValue Target ids to be highlighted.
     * @example
     *  // data1 will be highlighted and the others will be faded out
     *  chart.focus("data1");
     *
     * // data1 and data2 will be highlighted and the others will be faded out
     * chart.focus(["data1", "data2"]);
     *
     * // all targets will be highlighted
     * chart.focus();
     */
    focus: function (targetIdsValue) {
        var $$ = this.internal;
        var state = $$.state;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
        this.revert();
        this.defocus();
        candidates.classed($FOCUS.focused, true).classed($FOCUS.defocused, false);
        if ($$.hasArcType() && !state.hasRadar) {
            $$.expandArc(targetIds);
            $$.hasType("gauge") &&
                $$.markOverlapped(targetIdsValue, $$, ".".concat($GAUGE.gaugeValue));
        }
        $$.toggleFocusLegend(targetIds, true);
        state.focusedTargetIds = targetIds;
        state.defocusedTargetIds = state.defocusedTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
    },
    /**
     * This API fades out specified targets and reverts the others.<br><br>
     * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
     * @function defocus
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIdsValue Target ids to be faded out.
     * @example
     * // data1 will be faded out and the others will be reverted.
     * chart.defocus("data1");
     *
     * // data1 and data2 will be faded out and the others will be reverted.
     * chart.defocus(["data1", "data2"]);
     *
     * // all targets will be faded out.
     * chart.defocus();
     */
    defocus: function (targetIdsValue) {
        var $$ = this.internal;
        var state = $$.state;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
        candidates.classed($FOCUS.focused, false).classed($FOCUS.defocused, true);
        if ($$.hasArcType(null, ["polar"])) {
            $$.unexpandArc(targetIds);
            $$.hasType("gauge") &&
                $$.undoMarkOverlapped($$, ".".concat($GAUGE.gaugeValue));
        }
        $$.toggleFocusLegend(targetIds, false);
        state.focusedTargetIds = state.focusedTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
        state.defocusedTargetIds = targetIds;
    },
    /**
     * Revert focused or defocused state to initial state.<br><br>
     * You can specify multiple targets by giving an array that includes id as string. If no argument is given, all of targets will be reverted.
     * @function revert
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIdsValue Target ids to be reverted
     * @example
     * // 'data1' will be reverted.
     * chart.revert("data1");
     *
     * // 'data1' and 'data2' will be reverted.
     * chart.revert(["data1", "data2"]);
     *
     * // all targets will be reverted.
     * chart.revert();
     */
    revert: function (targetIdsValue) {
        var $$ = this.internal;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $el.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets
        candidates.classed($FOCUS.focused, false).classed($FOCUS.defocused, false);
        $$.hasArcType(null, ["polar"]) && $$.unexpandArc(targetIds);
        if (config.legend_show) {
            $$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
            $el.legend.selectAll($$.selectorLegends(targetIds))
                .filter(function () {
                return select(this).classed($FOCUS.legendItemFocused);
            })
                .classed($FOCUS.legendItemFocused, false);
        }
        state.focusedTargetIds = [];
        state.defocusedTargetIds = [];
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Define legend
 * @ignore
 */
var legend = {
    /**
     * Show legend for each target.
     * - **NOTE:** Legend APIs aren't supported for `treemap` type.
     * @function legend․show
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIds
     * - If targetIds is given, specified target's legend will be shown.
     * - If only one target is the candidate, String can be passed.
     * - If no argument is given, all of target's legend will be shown.
     * @example
     * // Show legend for data1.
     * chart.legend.show("data1");
     *
     * // Show legend for data1 and data2.
     * chart.legend.show(["data1", "data2"]);
     *
     * // Show all legend.
     * chart.legend.show();
     */
    show: function (targetIds) {
        var $$ = this.internal;
        $$.showLegend($$.mapToTargetIds(targetIds));
        $$.updateAndRedraw({ withLegend: true });
    },
    /**
     * Hide legend for each target.
     * @function legend․hide
     * @instance
     * @memberof Chart
     * @param {string|Array} targetIds
     * - If targetIds is given, specified target's legend will be hidden.
     * - If only one target is the candidate, String can be passed.
     * - If no argument is given, all of target's legend will be hidden.
     * @example
     * // Hide legend for data1.
     * chart.legend.hide("data1");
     *
     * // Hide legend for data1 and data2.
     * chart.legend.hide(["data1", "data2"]);
     *
     * // Hide all legend.
     * chart.legend.hide();
     */
    hide: function (targetIds) {
        var $$ = this.internal;
        $$.hideLegend($$.mapToTargetIds(targetIds));
        $$.updateAndRedraw({ withLegend: true });
    }
};
var apiLegend = { legend: legend };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiLoad = {
    /**
     * Load data to the chart.<br><br>
     * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
     * - <b>Note:</b>
     *   - unload should be used if some data needs to be unloaded simultaneously.
     *     If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
     *   - done will be called after data loaded, but it's not after rendering.
     *     It's because rendering will finish after some transition and there is some time lag between loading and rendering
     * @function load
     * @instance
     * @memberof Chart
     * @param {object} args The object can consist with following members:<br>
     *
     *    | Key | Type | Description |
     *    | --- | --- | --- |
     *    | columns | Array | The `columns` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
     *    | json | Array | The `json` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
     *    | rows | Array | The `rows` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
     *    | url | string | The data from `url` will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
     *    | &nbsp; | | |
     *    | append | boolean | Load data appending it to the current dataseries.<br>If the existing chart has`x` value, should provide with corresponding `x` value for newly loaded data.  |
     *    | axes | Object | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
     *    | categories | Array | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
     *    | classes | Object | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
     *    | colors | Object | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
     *    | data | Obejct | Data objects to be loaded. Checkout the example. |
     *    | done | Function | The specified function will be called after data loaded.|
     *    | headers | string |  Set request header if loading via `data.url`.<br>@see [data․headers](Options.html#.data%25E2%2580%25A4headers) |
     *    | keys | Object |  Choose which JSON objects keys correspond to desired data.<br>**NOTE:** Only for JSON object given as array.<br>@see [data․keys](Options.html#.data%25E2%2580%25A4keys) |
     *    | mimeType | string |  Set 'json' if loading JSON via url.<br>@see [data․mimeType](Options.html#.data%25E2%2580%25A4mimeType) |
     *    | names | Object | Same as data.names() |
     *    | resizeAfter | boolean | Resize after the load. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of load. |
     *    | type | string | The type of targets will be updated. |
     *    | types | Object | The types of targets will be updated. |
     *    | unload | Array | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
     *    | xs | string | Same as data.xs option  |
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataFromURL)
     * @example
     * // Load data1 and unload data2 and data3
     * chart.load({
     *     columns: [
     *        ["data1", 100, 200, 150, ...],
     *        ...
     *    ],
     *    unload: ["data2", "data3"],
     *    url: "...",
     *    done: function() { ... }
     *    resizeAfter: true  // will resize after load
     * });
     * @example
     * const chart = bb.generate({
     *   data: {
     *     columns: [
     *       ["data1", 20, 30, 40]
     *     ]
     *   }
     * });
     *
     * chart.load({
     *    columns: [
     *        // with 'append' option, the 'data1' will have `[20,30,40,50,60]`.
     *        ["data1", 50, 60]
     *    ],
     *    append: true
     * });
     * @example
     * const chart = bb.generate({
     *   data: {
     *     x: "x",
     *     xFormat: "%Y-%m-%dT%H:%M:%S",
     *     columns: [
     *       ["x", "2021-01-03T03:00:00", "2021-01-04T12:00:00", "2021-01-05T21:00:00"],
     *       ["data1", 36, 30, 24]
     *     ]
     *   },
     *   axis: {
     *     x: {
     *       type: "timeseries"
     *     }
     *   }
     * };
     *
     * chart.load({
     *   columns: [
     *     // when existing chart has `x` value, should provide correponding 'x' value.
     *     // with 'append' option, the 'data1' will have `[36,30,24,37]`.
     *     ["x", "2021-02-01T08:00:00"],
     *     ["data1", 37]
     *   ],
     *   append: true
     * });
     * @example
     * // myAPI.json
     * // {
     * //   "data1": [220, 240, 270, 250, 280],
     * //   "data2": [180, 150, 300, 70, 120]
     * // }
     *
     * chart.load({
     *     url: './data/myAPI.json',
     *     mimeType: "json",
     *
     *     // set request header if is needed
     *     headers: {
     *       "Content-Type": "text/json"
     *     }
     * });
     * @example
     * chart.load({
     *     data: [
     *       // equivalent as: columns: [["data1", 30, 200, 100]]
     *       {"data1": 30}, {"data1": 200}, {"data1": 100}
     *
     *       // or
     *       // equivalent as: columns: [["data1", 10, 20], ["data2", 13, 30]]
     *       // {"data1": 10, "data2": 13}, {"data1": 20, "data2": 30}}
     *     ]
     * });
     * @example
     * chart.load({
     *     json: [
     *          {name: "www.site1.com", upload: 800, download: 500, total: 400},
     *     ],
     *     keys: {
     *         x: "name",
     *         value: ["upload", "download"]
     *     }
     * });
     * @example
     * chart.load({
     *   json: {
     *       data1:[30, 20, 50, 40, 60, 50],
     *       data2:[200, 130, 90, 240, 130, 220],
     *   }
     * });
     */
    load: function (args) {
        var $$ = this.internal;
        var config = $$.config;
        // update xs if specified
        args.xs && $$.addXs(args.xs);
        // update names if exists
        "names" in args && this.data.names(args.names);
        // update classes if exists
        "classes" in args && Object.keys(args.classes).forEach(function (id) {
            config.data_classes[id] = args.classes[id];
        });
        // update categories if exists
        if ("categories" in args && $$.axis.isCategorized()) {
            config.axis_x_categories = args.categories;
        }
        // update axes if exists
        "axes" in args && Object.keys(args.axes).forEach(function (id) {
            config.data_axes[id] = args.axes[id];
        });
        // update colors if exists
        "colors" in args && Object.keys(args.colors).forEach(function (id) {
            config.data_colors[id] = args.colors[id];
        });
        // unload if needed
        if ("unload" in args && args.unload !== false) {
            // TODO: do not unload if target will load (included in url/rows/columns)
            $$.unload($$.mapToTargetIds(args.unload === true ? null : args.unload), function () {
                // to mitigate improper rendering for multiple consecutive calls
                // https://github.com/naver/billboard.js/issues/2121
                requestIdleCallback(function () { return $$.loadFromArgs(args); });
            });
        }
        else {
            $$.loadFromArgs(args);
        }
    },
    /**
     * Unload data to the chart.<br><br>
     * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
     * - <b>Note:</b>
     * If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.<br>
     * `done` will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
     * @function unload
     * @instance
     * @memberof Chart
     * @param {object} argsValue
     *  | key | Type | Description |
     *  | --- | --- | --- |
     *  | ids | String &vert; Array | Target id data to be unloaded. If not given, all data will be unloaded. |
     *  | done | Fuction | Callback after data is unloaded. |
     *  | resizeAfter | boolean | Resize after the unload. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of unload. |
     * @example
     *  // Unload data2 and data3
     *  chart.unload({
     *    ids: ["data2", "data3"],
     *    done: function() {
     *       // called after the unloaded
     *    },
     *    resizeAfter: true  // will resize after unload
     *  });
     */
    unload: function (argsValue) {
        var $$ = this.internal;
        var args = argsValue || {};
        // hide possible tooltip display when data is completely unloaded
        isEmpty(args) && this.tooltip.hide();
        if (isArray(args)) {
            args = { ids: args };
        }
        else if (isString(args)) {
            args = { ids: [args] };
        }
        var ids = $$.mapToTargetIds(args.ids);
        $$.unload(ids, function () {
            $$.redraw({
                withUpdateOrgXDomain: true,
                withUpdateXDomain: true,
                withLegend: true
            });
            $$.cache.remove(ids);
            callDone.call($$, args.done, args.resizeAfter);
        });
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Show/Hide data series
 * @param {boolean} show Show or hide
 * @param {Array} targetIdsValue Target id values
 * @param {object} options Options
 * @private
 */
function showHide(show, targetIdsValue, options) {
    var _this = this;
    var $$ = this.internal;
    var targetIds = $$.mapToTargetIds(targetIdsValue);
    var hiddenIds = $$.state.hiddenTargetIds
        .map(function (v) { return targetIds.indexOf(v) > -1 && v; })
        .filter(Boolean);
    $$.state.toggling = true;
    $$["".concat(show ? "remove" : "add", "HiddenTargetIds")](targetIds);
    var targets = $$.$el.svg.selectAll($$.selectorTargets(targetIds));
    var opacity = show ? null : "0";
    if (show && hiddenIds.length) {
        targets.style("display", null);
        callFn($$.config.data_onshown, this, hiddenIds);
    }
    $$.$T(targets)
        .style("opacity", opacity, "important")
        .call(endall, function () {
        var _a;
        // https://github.com/naver/billboard.js/issues/1758
        if (!show && hiddenIds.length === 0) {
            targets.style("display", "none");
            callFn((_a = $$.config) === null || _a === void 0 ? void 0 : _a.data_onhidden, _this, targetIds);
        }
        targets.style("opacity", opacity);
    });
    options.withLegend && $$["".concat(show ? "show" : "hide", "Legend")](targetIds);
    $$.redraw({
        withUpdateOrgXDomain: true,
        withUpdateXDomain: true,
        withLegend: true
    });
    $$.state.toggling = false;
}
var apiShow = {
    /**
     * Show data series on chart
     * @function show
     * @instance
     * @memberof Chart
     * @param {string|Array} [targetIdsValue] The target id value.
     * @param {object} [options] The object can consist with following members:<br>
     *
     *    | Key | Type | default | Description |
     *    | --- | --- | --- | --- |
     *    | withLegend | boolean | false | whether or not display legend |
     *
     * @example
     * // show 'data1'
     * chart.show("data1");
     *
     * // show 'data1' and 'data3'
     * chart.show(["data1", "data3"]);
     */
    show: function (targetIdsValue, options) {
        if (options === void 0) { options = {}; }
        showHide.call(this, true, targetIdsValue, options);
    },
    /**
     * Hide data series from chart
     * @function hide
     * @instance
     * @memberof Chart
     * @param {string|Array} [targetIdsValue] The target id value.
     * @param {object} [options] The object can consist with following members:<br>
     *
     *    | Key | Type | default | Description |
     *    | --- | --- | --- | --- |
     *    | withLegend | boolean | false | whether or not display legend |
     *
     * @example
     * // hide 'data1'
     * chart.hide("data1");
     *
     * // hide 'data1' and 'data3'
     * chart.hide(["data1", "data3"]);
     */
    hide: function (targetIdsValue, options) {
        if (options === void 0) { options = {}; }
        showHide.call(this, false, targetIdsValue, options);
    },
    /**
     * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
     * @function toggle
     * @instance
     * @memberof Chart
     * @param {string|Array} [targetIds] The target id value.
     * @param {object} [options] The object can consist with following members:<br>
     *
     *    | Key | Type | default | Description |
     *    | --- | --- | --- | --- |
     *    | withLegend | boolean | false | whether or not display legend |
     *
     * @example
     * // toggle 'data1'
     * chart.toggle("data1");
     *
     * // toggle 'data1' and 'data3'
     * chart.toggle(["data1", "data3"]);
     */
    toggle: function (targetIds, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var $$ = this.internal;
        var targets = { show: [], hide: [] };
        // sort show & hide target ids
        $$.mapToTargetIds(targetIds)
            .forEach(function (id) { return targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id); });
        // perform show & hide task separately
        // https://github.com/naver/billboard.js/issues/454
        targets.show.length && this.show(targets.show, options);
        targets.hide.length && setTimeout(function () { return _this.hide(targets.hide, options); }, 0);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Define tooltip
 * @ignore
 */
var tooltip = {
    /**
     * Show tooltip
     * @function tooltip․show
     * @instance
     * @memberof Chart
     * @param {object} args The object can consist with following members:<br>
     *
     *    | Key | Type | Description |
     *    | --- | --- | --- |
     *    | index | Number | Determine focus by index |
     *    | x | Number &vert; Date | Determine focus by x Axis index |
     *    | mouse | Array | Determine x and y coordinate value relative the targeted '.bb-event-rect' x Axis.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
     *    | data | Object | When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is used or [tooltip.grouped](Options.html#.tooltip) set to 'false', `should be used giving this param`.<br><br>**Key:**<br>- x {number &verbar; Date}: x Axis value<br>- index {number}: x Axis index (useless for data.xs)<br>- id {string}: data id<br>- value {number}: The corresponding value for tooltip. |
     *
     * @example
     *  // show the 2nd x Axis coordinate tooltip
     *  // for Arc(gauge, donut & pie) and radar type, approch showing tooltip by using "index" number.
     *  chart.tooltip.show({
     *    index: 1
     *  });
     *
     *  // show tooltip for the 3rd x Axis in x:50 and y:100 coordinate of '.bb-event-rect' of the x Axis.
     *  chart.tooltip.show({
     *    x: 2,
     *    mouse: [50, 100]
     *  });
     *
     *  // show tooltip for timeseries x axis
     *  chart.tooltip.show({
     *    x: new Date("2018-01-02 00:00")
     *  });
     *
     *  // treemap type can be shown by using "id" only.
     *  chart.tooltip.show({
     *    data: {
     *        id: "data1"  // data id
     *    }
     *  });
     *
     *  // for Arc types, specify 'id' or 'index'
     *  chart.tooltip.show({ data: { id: "data2" }});
     *  chart.tooltip.show({ data: { index: 2 }});
     *
     *  // when data.xs is used
     *  chart.tooltip.show({
     *    data: {
     *        x: 3,  // x Axis value
     *        id: "data1",  // data id
     *        value: 500  // data value
     *    }
     *  });
     *
     *  // when data.xs isn't used, but tooltip.grouped=false is set
     *  chart.tooltip.show({
     *    data: {
     *        index: 3,  // or 'x' key value
     *        id: "data1",  // data id
     *        value: 500  // data value
     *    }
     *  });
     */
    show: function (args) {
        var _a, _b, _c;
        var $$ = this.internal;
        var $el = $$.$el, config = $$.config, _d = $$.state, eventReceiver = _d.eventReceiver, hasFunnel = _d.hasFunnel, hasTreemap = _d.hasTreemap, inputType = _d.inputType;
        var index;
        var mouse;
        // determine mouse position on the chart
        if (args.mouse) {
            mouse = args.mouse;
        }
        // determine focus data
        if (args.data) {
            var data = args.data;
            var y = (_a = $$.getYScaleById(data.id)) === null || _a === void 0 ? void 0 : _a(data.value);
            if ((hasFunnel || hasTreemap) && data.id) {
                var selector = $$.selectorTarget(data.id, undefined, ".".concat($SHAPE.shape));
                eventReceiver.rect = $el.main.select(selector);
            }
            else if ($$.isMultipleX()) {
                // if multiple xs, target point will be determined by mouse
                mouse = [$$.xx(data), y];
            }
            else {
                if (!config.tooltip_grouped) {
                    mouse = [0, y];
                }
                index = (_b = data.index) !== null && _b !== void 0 ? _b : ($$.hasArcType() && data.id ?
                    (_c = $$.getArcElementByIdOrIndex(data.id)) === null || _c === void 0 ? void 0 : _c.datum().index :
                    $$.getIndexByX(data.x));
            }
        }
        else if (isDefined(args.x)) {
            index = $$.getIndexByX(args.x);
        }
        else if (isDefined(args.index)) {
            index = args.index;
        }
        (inputType === "mouse" ? ["mouseover", "mousemove"] : ["touchstart"]).forEach(function (eventName) {
            $$.dispatchEvent(eventName, index, mouse);
        });
    },
    /**
     * Hide tooltip
     * @function tooltip․hide
     * @instance
     * @memberof Chart
     */
    hide: function () {
        var _a, _b, _c;
        var $$ = this.internal;
        var inputType = $$.state.inputType, tooltip = $$.$el.tooltip;
        var data = tooltip === null || tooltip === void 0 ? void 0 : tooltip.datum();
        if (data) {
            var index_1 = JSON.parse(data.current)[0].index;
            // make to finalize, possible pending event flow set from '.tooltip.show()' call
            (inputType === "mouse" ? ["mouseout"] : ["touchend"]).forEach(function (eventName) {
                $$.dispatchEvent(eventName, index_1);
            });
        }
        // reset last touch point index
        inputType === "touch" && $$.callOverOutForTouch();
        $$.hideTooltip(true);
        (_a = $$.hideGridFocus) === null || _a === void 0 ? void 0 : _a.call($$);
        (_b = $$.unexpandCircles) === null || _b === void 0 ? void 0 : _b.call($$);
        (_c = $$.expandBarTypeShapes) === null || _c === void 0 ? void 0 : _c.call($$, false);
    }
};
var apiTooltip = { tooltip: tooltip };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Main chart class.
 * - Note: Instantiated via `bb.generate()`.
 * @class Chart
 * @example
 * var chart = bb.generate({
 *  data: {
 *    columns: [
 *        ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
 *        ["count1", 11, 8, 7, 6, 5 ],
 *        ["count2", 9, 3, 6, 2, 8 ]
 *   ]}
 * }
 * @see {@link bb.generate} for the initialization.
 */
/**
 * Access instance's primary node elements
 * @member {object} $
 * @property {object} $ Access instance's primary node elements
 * @property {d3.selection} $.chart Wrapper element
 * @property {d3.selection} $.svg Main svg element
 * @property {d3.selection} $.defs Definition element
 * @property {d3.selection} $.main Main grouping element
 * @property {d3.selection} $.needle Needle element
 *  - **NOTE:**
 *    - The element will have `bb-needle` as class name.
 *    - Will provide speical helper `.updateHelper(value: number, updateConfig: boolean)` method to facilitate needle position update.
 * @property {d3.selection} $.tooltip Tooltip element
 * @property {d3.selection} $.legend Legend element
 * @property {d3.selection} $.title Title element
 * @property {d3.selection} $.grid Grid element
 * @property {d3.selection} $.arc Arc element
 * @property {d3.selection} $.circles Data point circle elements
 * @property {object} $.bar Bar element object
 * @property {d3.selection} $.bar.bars Bar elements
 * @property {d3.selection} $.candlestick Candlestick elements
 * @property {object} $.line Line element object
 * @property {d3.selection} $.line.lines Line elements
 * @property {d3.selection} $.line.areas Areas elements
 * @property {object} $.text Text element object
 * @property {d3.selection} $.text.texts Data label text elements
 * @memberof Chart
 * @example
 * const chart = bb.generate({ ... });
 *
 * chart.$.chart; // wrapper element
 * chart.$.line.circles;  // all data point circle elements
 * @example
 * // Update arc needle position
 * const chart = bb.generate({
 *   data: {
 *     type: "donut"
 *   },
 *   arc: {
 *     needle: {
 *       show: true,
 *       ...
 *     }
 *   }
 * });
 *
 * chart.$.needle.updateHelper(70);  // update needle position to point value 70.
 *
 * // update needle position to point value 70 and the config value.
 * // NOTE: updating config value, will update needle pointer initial value too.
 * chart.$.needle.updateHelper(70, true);
 *
 * // update needle point position every 1 second
 * let i = 0;
 * setInterval(() => {
 *   chart.$.needle.updateHelper(i += 10);
 * }, 1000)
 */
/**
 * Plugin instance array
 * @member {Array} plugins
 * @memberof Chart
 * @example
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({ ... }),
 *        new PluginA()
 *     ]
 *  });
 *
 *  chart.plugins; // [Stanford, PluginA] - instance array
 */
var Chart = /** @class */ (function () {
    function Chart(options) {
        this.plugins = [];
        var $$ = new ChartInternal(this);
        // let hook = () => {};
        this.internal = $$;
        // bind to namespaced APIs
        (function bindThis(fn, target, argThis) {
            Object.keys(fn).forEach(function (key) {
                var isFunc = isFunction(fn[key]);
                var isChild = target !== argThis;
                var isNotNil = notEmpty(fn[key]);
                var hasChild = isNotNil && Object.keys(fn[key]).length > 0;
                // const hookFn = function(...params) {
                // 	hook();
                // 	return fn[key].bind(argThis)(...params);
                // }
                if (isFunc && ((!isChild && hasChild) || isChild)) {
                    target[key] = fn[key].bind(argThis);
                }
                else if (isNotNil && !isFunc) {
                    target[key] = {};
                }
                else {
                    target[key] = fn[key];
                }
                hasChild && bindThis(fn[key], target[key], argThis);
            });
        })(Chart.prototype, this, this);
        loadConfig.call($$, options);
        $$.beforeInit();
        $$.init();
        // if ($$.config.render.lazy !== false && hasStyle($$.$el.chart, {"display": "none", "visibility": "hidden"})) {
        // 	hook = () => {
        // 		logError(`The call of APIs won't work. Please, make sure if chart element is %cvisible.`);
        // 	};
        // }
    }
    return Chart;
}());
// extend common APIs as part of Chart class
extend(Chart.prototype, [
    apiChart,
    apiColor,
    apiData,
    apiExport,
    apiFocus,
    apiLegend,
    apiLoad,
    apiShow,
    apiTooltip
]);

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Set the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @param {object} value Value to be set
 * @private
 */
function setMinMax($$, type, value) {
    var config = $$.config;
    var helper = function (key, value) {
        var v = isNumber(value) ? value : (value === false ? undefined : null);
        if (v !== null) {
            config["axis_".concat(key, "_").concat(type)] = v;
        }
    };
    if (isDefined(value)) {
        if (isObjectType(value)) {
            Object.keys(value).forEach(function (key) {
                helper(key, value[key]);
            });
        }
        else if (isNumber(value) || value === false) {
            // shorthand values affects only y and y2.
            ["y", "y2"].forEach(function (key) {
                helper(key, value);
            });
        }
        $$.redraw({
            withUpdateOrgXDomain: true,
            withUpdateXDomain: true
        });
    }
}
/**
 * Get the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @returns {{x, y, y2}}
 * @private
 */
function getMinMax($$, type) {
    var config = $$.config;
    return {
        x: config["axis_x_".concat(type)],
        y: config["axis_y_".concat(type)],
        y2: config["axis_y2_".concat(type)]
    };
}
/**
 * Define axis
 * @ignore
 */
var axis$1 = {
    /**
     * Get and set axis labels.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
     * @function axis․labels
     * @instance
     * @memberof Chart
     * @param {object} labels specified axis' label to be updated.
     * @param {string} [labels.x] x Axis string
     * @param {string} [labels.y] y Axis string
     * @param {string} [labels.y2] y2 Axis string
     * @returns {object|undefined} axis labels text object
     * @example
     * // Update axis' label
     * chart.axis.labels({
     *   x: "New X Axis Label",
     *   y: "New Y Axis Label",
     *   y2: "New Y2 Axis Label"
     * });
     *
     * chart.axis.labels();
     * // --> {
     * //  x: "New X Axis Label",
     * //  y: "New Y Axis Label",
     * //  y2: "New Y2 Axis Label"
     * // }
     */
    labels: function (labels) {
        var $$ = this.internal;
        var labelText;
        if (labels) {
            Object.keys(labels).forEach(function (axisId) {
                $$.axis.setLabelText(axisId, labels[axisId]);
            });
            $$.axis.updateLabels();
        }
        ["x", "y", "y2"].forEach(function (v) {
            var text = $$.axis.getLabelText(v);
            if (text) {
                !labelText && (labelText = {});
                labelText[v] = text;
            }
        });
        return labelText;
    },
    /**
     * Get and set axis min value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
     * @function axis․min
     * @instance
     * @memberof Chart
     * @param {object} min If min is given, specified axis' min value will be updated.<br>
     *   If no argument is given, the min values set on generating option for each axis will be returned.
     *   If not set any min values on generation, it will return `undefined`.<br>
     *   To unset specific axis max, set `false` to each of them.
     * @returns {object|undefined}
     * @example
     * // Update axis' min
     * chart.axis.min({
     *   x: -10,
     *   y: 1000,
     *   y2: 100
     * });
     *
     * // To unset specific axis min, set false to each of them.
     * chart.axis.min({
     *   x: false,
     *   y: false,
     *   y2: false
     * });
     *
     * // shorthand (only affects y and y2 axis)
     * chart.axis.min(-50);
     * chart.axis.min(false);
     */
    min: function (min) {
        var $$ = this.internal;
        return isValue(min) || min === false ?
            setMinMax($$, "min", min) :
            getMinMax($$, "min");
    },
    /**
     * Get and set axis max value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
     * @function axis․max
     * @instance
     * @memberof Chart
     * @param {object} max If max is given, specified axis' max value will be updated.<br>
     *   If no argument is given, the max values set on generating option for each axis will be returned.
     *   If not set any max values on generation, it will return `undefined`.<br>
     *   To unset specific axis max, set `false` to each of them.
     * @returns {object|undefined}
     * @example
     * // Update axis' label
     * chart.axis.max({
     *    x: 100,
     *    y: 1000,
     *    y2: 10000
     * });
     *
     * // To unset specific axis max, set false to each of them.
     * chart.axis.max({
     *   x: false,
     *   y: false,
     *   y2: false
     * });
     *
     * // shorthand (only affects y and y2 axis)
     * chart.axis.max(10);
     * chart.axis.max(false);
     */
    max: function (max) {
        var $$ = this.internal;
        return isValue(max) || max === false ?
            setMinMax($$, "max", max) :
            getMinMax($$, "max");
    },
    /**
     * Get and set axis min and max value.
     * - **NOTE:** Only applicable for chart types which has x and y axes.
     * @function axis․range
     * @instance
     * @memberof Chart
     * @param {object} range If range is given, specified axis' min and max value will be updated.
     *   If no argument is given, the current min and max values for each axis will be returned.<br>
     *   To unset specific axis max, set `false` to each of them.
     * @returns {object|undefined}
     * @example
     * // Update axis' label
     * chart.axis.range({
     *   min: {
     *     x: -10,
     *     y: -1000,
     *     y2: -10000
     *   },
     *   max: {
     *     x: 100,
     *     y: 1000,
     *     y2: 10000
     *   },
     * });
     *
     * // To unset specific axis max, set false to each of them.
     * chart.axis.range({
     *   min: {
     *     x: false,
     *     y: false,
     *     y2: false
     *   },
     *   max: {
     *     x: false,
     *     y: false,
     *     y2: false
     *   },
     * });
     *
     * // shorthand (only affects y and y2 axis)
     * chart.axis.range({ min: -50, max: 1000 });
     * chart.axis.range({ min: false, max: false });
     */
    range: function (range) {
        var axis = this.axis;
        if (arguments.length) {
            var min = range.min, max = range.max;
            isDefined(max) && axis.max(max);
            isDefined(min) && axis.min(min);
        }
        else {
            return {
                max: axis.max(),
                min: axis.min()
            };
        }
        return undefined;
    }
};
var apiAxis = { axis: axis$1 };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiCategory = {
    /**
     * Set specified category name on category axis.
     * @function category
     * @instance
     * @memberof Chart
     * @param {number} i index of category to be changed
     * @param {string} category category value to be changed
     * @returns {string}
     * @example
     * chart.category(2, "Category 3");
     */
    category: function (i, category) {
        var $$ = this.internal;
        var config = $$.config;
        if (arguments.length > 1) {
            config.axis_x_categories[i] = category;
            $$.redraw();
        }
        return config.axis_x_categories[i];
    },
    /**
     * Set or get category names on category axis.
     * @function categories
     * @instance
     * @memberof Chart
     * @param {Array} categories This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
     * @returns {Array}
     * @example
     * chart.categories([
     *      "Category 1", "Category 2", ...
     * ]);
     */
    categories: function (categories) {
        var $$ = this.internal;
        var config = $$.config;
        if (!categories || !Array.isArray(categories)) {
            var cat = config.axis_x_categories;
            return isEmpty(cat) ? Object.values($$.data.xs)[0] : cat;
        }
        config.axis_x_categories = categories;
        $$.redraw();
        return config.axis_x_categories;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiFlow = {
    /**
     * Flow data to the chart.<br><br>
     * By this API, you can append new data points to the chart.
     * @function flow
     * @instance
     * @memberof Chart
     * @param {object} args The object can consist with following members:<br>
     *
     *    | Key | Type | Description |
     *    | --- | --- | --- |
     *    | json | Object | Data as JSON format (@see [data․json](Options.html#.data%25E2%2580%25A4json)) |
     *    | rows | Array | Data in array as row format (@see [data․rows](Options.html#.data%25E2%2580%25A4json)) |
     *    | columns | Array | Data in array as column format (@see [data․columns](Options.html#.data%25E2%2580%25A4columns)) |
     *    | to | String | The lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points |
     *    | length | Number | The lower x edge will move by the number of this argument |
     *    | duration | Number | The duration of the transition will be specified value. If not given, transition.duration will be used as default |
     *    | done | Function | The specified function will be called when flow ends |
     *
     * - **NOTE:**
     *   - If json, rows and columns given, the data will be loaded.
     *   - If data that has the same target id is given, the chart will be appended.
     *   - Otherwise, new target will be added. One of these is required when calling.
     *   - If json specified, keys is required as well as data.json.
     * 	 - If tab isn't visible(by evaluating `document.hidden`), will not be executed to prevent unnecessary work.
     * @example
     * // 2 data points will be apprended to the tail and popped from the head.
     * // After that, 4 data points will be appended and no data points will be poppoed.
     * chart.flow({
     *  columns: [
     *    ["x", "2018-01-11", "2018-01-21"],
     *    ["data1", 500, 200],
     *    ["data2", 100, 300],
     *    ["data3", 200, 120]
     *  ],
     *  to: "2013-01-11",
     *  done: function () {
     *    chart.flow({
     *      columns: [
     *        ["x", "2018-02-11", "2018-02-12", "2018-02-13", "2018-02-14"],
     *        ["data1", 200, 300, 100, 250],
     *        ["data2", 100, 90, 40, 120],
     *        ["data3", 100, 100, 300, 500]
     *      ],
     *      length: 2,
     *      duration: 1500
     *    });
     *  }
     * });
     */
    flow: function (args) {
        var $$ = this.internal;
        var data;
        if (args.json || args.rows || args.columns) {
            $$.convertData(args, function (res) {
                data = res;
                _();
            });
        }
        /**
         * Process flows
         * @private
         */
        function _() {
            var domain;
            var length = 0;
            var tail = 0;
            var diff;
            var to;
            if ($$.state.redrawing || !data || !isTabVisible()) {
                return;
            }
            var notfoundIds = [];
            var orgDataCount = $$.getMaxDataCount();
            var targets = $$.convertDataToTargets(data, true);
            var isTimeSeries = $$.axis.isTimeSeries();
            // Update/Add data
            $$.data.targets.forEach(function (t) {
                var found = false;
                for (var i = 0; i < targets.length; i++) {
                    if (t.id === targets[i].id) {
                        found = true;
                        if (t.values[t.values.length - 1]) {
                            tail = t.values[t.values.length - 1].index + 1;
                        }
                        length = targets[i].values.length;
                        for (var j = 0; j < length; j++) {
                            targets[i].values[j].index = tail + j;
                            if (!isTimeSeries) {
                                targets[i].values[j].x = tail + j;
                            }
                        }
                        t.values = t.values.concat(targets[i].values);
                        targets.splice(i, 1);
                        break;
                    }
                }
                !found && notfoundIds.push(t.id);
            });
            // Append null for not found targets
            $$.data.targets.forEach(function (t) {
                for (var i = 0; i < notfoundIds.length; i++) {
                    if (t.id === notfoundIds[i]) {
                        tail = t.values[t.values.length - 1].index + 1;
                        for (var j = 0; j < length; j++) {
                            t.values.push({
                                id: t.id,
                                index: tail + j,
                                x: isTimeSeries ? $$.getOtherTargetX(tail + j) : tail + j,
                                value: null
                            });
                        }
                    }
                }
            });
            // Generate null values for new target
            if ($$.data.targets.length) {
                targets.forEach(function (t) {
                    var missing = [];
                    for (var i = $$.data.targets[0].values[0].index; i < tail; i++) {
                        missing.push({
                            id: t.id,
                            index: i,
                            x: isTimeSeries ? $$.getOtherTargetX(i) : i,
                            value: null
                        });
                    }
                    t.values.forEach(function (v) {
                        v.index += tail;
                        if (!isTimeSeries) {
                            v.x += tail;
                        }
                    });
                    t.values = missing.concat(t.values);
                });
            }
            $$.data.targets = $$.data.targets.concat(targets); // add remained
            // check data count because behavior needs to change when it"s only one
            // const dataCount = $$.getMaxDataCount();
            var baseTarget = $$.data.targets[0];
            var baseValue = baseTarget.values[0];
            // Update length to flow if needed
            if (isDefined(args.to)) {
                length = 0;
                to = isTimeSeries ? parseDate.call($$, args.to) : args.to;
                baseTarget.values.forEach(function (v) {
                    v.x < to && length++;
                });
            }
            else if (isDefined(args.length)) {
                length = args.length;
            }
            // If only one data, update the domain to flow from left edge of the chart
            if (!orgDataCount) {
                if (isTimeSeries) {
                    diff = baseTarget.values.length > 1 ?
                        baseTarget.values[baseTarget.values.length - 1].x - baseValue.x :
                        baseValue.x - $$.getXDomain($$.data.targets)[0];
                }
                else {
                    diff = 1;
                }
                domain = [baseValue.x - diff, baseValue.x];
            }
            else if (orgDataCount === 1 && isTimeSeries) {
                diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
                domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
            }
            domain && $$.updateXDomain(null, true, true, false, domain);
            // Set targets
            $$.updateTargets($$.data.targets);
            // Redraw with new targets
            $$.redraw({
                flow: {
                    index: baseValue.index,
                    length: length,
                    duration: isValue(args.duration) ?
                        args.duration :
                        $$.config.transition_duration,
                    done: args.done,
                    orgDataCount: orgDataCount
                },
                withLegend: true,
                withTransition: orgDataCount > 1,
                withTrimXDomain: false,
                withUpdateXAxis: true
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Update grid lines.
 * @param {Array} grids grid lines to update
 * @param {string} axisId axis' id: "x" or "y"
 * @returns {Array}
 * @private
 */
function grid$1(grids, axisId) {
    var $$ = this.internal;
    var config = $$.config;
    var withTransition = config.transition_duration && isTabVisible();
    var gridPropLines = "grid_".concat(axisId, "_lines");
    if (!grids) {
        return config[gridPropLines];
    }
    config[gridPropLines] = grids;
    $$.updateGrid();
    $$.redrawGrid(withTransition);
    return config[gridPropLines];
}
/**
 * Add grid lines.
 * @param {Array|object} grids grid lines to add
 * @param {string} axisId axis' id: "x" or "y"
 * @returns {Array}
 * @private
 */
function add(grids, axisId) {
    var gridPropLines = "grid_".concat(axisId, "_lines");
    return grid$1.bind(this)(this.internal.config[gridPropLines].concat(grids || []), axisId);
}
/**
 * Remove grid lines.
 * @param {object} grids grid lines to remove
 * @param {boolean} isXAxis weather is x axis or not
 * @private
 */
function remove(grids, isXAxis) {
    this.internal.removeGridLines(grids, isXAxis);
}
/**
 * Update x grid lines.
 * @function xgrids
 * @instance
 * @memberof Chart
 * @param {Array} grids X grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines.
 * @returns {Array}
 * @example
 *  // Show 2 x grid lines
 * chart.xgrids([
 *    {value: 1, text: "Label 1"},
 *    {value: 4, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 1, text: "Label 1"}, {value: 4, text: "Label 4"}]
 */
var xgrids = function (grids) {
    return grid$1.bind(this)(grids, "x");
};
extend(xgrids, {
    /**
     * Add x grid lines.<br>
     * This API adds new x grid lines instead of replacing like xgrids.
     * @function xgrids․add
     * @instance
     * @memberof Chart
     * @param {Array|object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
     * @returns {Array}
     * @example
     *  // Add a new x grid line
     * chart.xgrids.add(
     *   {value: 4, text: "Label 4"}
     * );
     *
     * // Add new x grid lines
     * chart.xgrids.add([
     *   {value: 2, text: "Label 2"},
     *   {value: 4, text: "Label 4"}
     * ]);
     */
    add: function (grids) {
        return add.bind(this)(grids, "x");
    },
    /**
     * Remove x grid lines.<br>
     * This API removes x grid lines.
     * @function xgrids․remove
     * @instance
     * @memberof Chart
     * @param {object} grids This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
     * @param {number} [grids.value] target value
     * @param {string} [grids.class] target class
     * @returns {void}
     * @example
     * // x grid line on x = 2 will be removed
     * chart.xgrids.remove({value: 2});
     *
     * // x grid lines that have 'grid-A' will be removed
     * chart.xgrids.remove({
     *   class: "grid-A"
     * });
     *
     * // all of x grid lines will be removed
     * chart.xgrids.remove();
     */
    remove: function (grids) {
        return remove.bind(this)(grids, true);
    }
});
/**
 * Update y grid lines.
 * @function ygrids
 * @instance
 * @memberof Chart
 * @param {Array} grids Y grid lines will be replaced with this argument. The format of this argument is the same as grid.y.lines.
 * @returns {object}
 * @example
 *  // Show 2 y grid lines
 * chart.ygrids([
 *    {value: 100, text: "Label 1"},
 *    {value: 400, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 100, text: "Label 1"}, {value: 400, text: "Label 4"}]
 */
var ygrids = function (grids) {
    return grid$1.bind(this)(grids, "y");
};
extend(ygrids, {
    /**
     * Add y grid lines.<br>
     * This API adds new y grid lines instead of replacing like ygrids.
     * @function ygrids․add
     * @instance
     * @memberof Chart
     * @param {Array|object} grids New y grid lines will be added. The format of this argument is the same as grid.y.lines and it's possible to give an Object if only one line will be added.
     * @returns {object}
     * @example
     *  // Add a new x grid line
     * chart.ygrids.add(
     *   {value: 400, text: "Label 4"}
     * );
     *
     * // Add new x grid lines
     * chart.ygrids.add([
     *   {value: 200, text: "Label 2"},
     *   {value: 400, text: "Label 4"}
     * ]);
     */
    add: function (grids) {
        return add.bind(this)(grids, "y");
    },
    /**
     * Remove y grid lines.<br>
     * This API removes x grid lines.
     * @function ygrids․remove
     * @instance
     * @memberof Chart
     * @param {object} grids This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
     * @param {number} [grids.value] target value
     * @param {string} [grids.class] target class
     * @returns {void}
     * @example
     * // y grid line on y = 200 will be removed
     * chart.ygrids.remove({value: 200});
     *
     * // y grid lines that have 'grid-A' will be removed
     * chart.ygrids.remove({
     *   class: "grid-A"
     * });
     *
     * // all of y grid lines will be removed
     * chart.ygrids.remove();
     */
    remove: function (grids) {
        return remove.bind(this)(grids, false);
    }
});
var apiGrid = { xgrids: xgrids, ygrids: ygrids };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiGroup = {
    /**
     * Update groups for the targets.
     * @function groups
     * @instance
     * @memberof Chart
     * @param {Array} groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
     * @returns {Array} Grouped data names array
     * @example
     *  // data1 and data2 will be a new group.
     *  chart.groups([
     *     ["data1", "data2"]
     *  ]);
     */
    groups: function (groups) {
        var $$ = this.internal;
        var config = $$.config;
        if (isUndefined(groups)) {
            return config.data_groups;
        }
        config.data_groups = groups;
        $$.redraw();
        return config.data_groups;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Region add/update function
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @param {boolean} isAdd If true, add new regions, otherwise update regions
 * @returns {Array} regions
 * @private
 */
function regionsFn(regions, isAdd) {
    if (isAdd === void 0) { isAdd = false; }
    var $$ = this.internal;
    var config = $$.config;
    var withTransition = config.transition_duration && isTabVisible();
    if (!regions) {
        return config.regions;
    }
    config.regions = isAdd ? config.regions.concat(regions) : regions;
    $$.updateRegion();
    $$.redrawRegion(withTransition);
    return isAdd ? config.regions : regions;
}
/**
 * Update regions.
 * @function regions
 * @instance
 * @memberof Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @returns {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {
 *      axis: "y", end: 50, class: "regionY",
 *      label: {
 *      	text: "Region Text",
 *      	x: 5,  // position relative of the initial x coordinate
 *      	y: 5,  // position relative of the initial y coordinate
 *      	color: "red",  // color string
 *      	rotated: true  // make text to show in vertical or horizontal
 *      }
 *    }
 * ]);
 */
var regions = function (regions) {
    return regionsFn.bind(this)(regions);
};
extend(regions, {
    /**
     * Add new region.<br><br>
     * This API adds new region instead of replacing like regions.
     * @function regions․add
     * @instance
     * @memberof Chart
     * @param {Array|object} regions New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
     * @returns {Array} regions
     * @example
     * // Add a new region
     * chart.regions.add(
     *    {
     *      axis: "x", start: 5, class: "regionX",
     *      label: {
     *      	text: "Region Text",
     *      	color: "red"  // color string
     *      }
     *    }
     * );
     *
     * // Add new regions
     * chart.regions.add([
     *    {axis: "x", start: 5, class: "regionX"},
     *    {
     *      axis: "y", end: 50, class: "regionY",
     *      label: {
     *      	text: "Region Text",
     *      	x: 5,  // position relative of the initial x coordinate
     *      	y: 5,  // position relative of the initial y coordinate
     *      	color: "red",  // color string
     *      	rotated: true  // make text to show in vertical or horizontal
     *      }
     *    }
     * ]);
     */
    add: function (regions) {
        return regionsFn.bind(this)(regions, true);
    },
    /**
     * Remove regions.<br><br>
     * This API removes regions.
     * @function regions․remove
     * @instance
     * @memberof Chart
     * @param {object} optionsValue This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be removed.
     * @returns {Array} regions Removed regions
     * @example
     * // regions that have 'region-A' or 'region-B' will be removed.
     * chart.regions.remove({
     *   classes: [
     *     "region-A", "region-B"
     *   ]
     * });
     *
     * // all of regions will be removed.
     * chart.regions.remove();
     */
    remove: function (optionsValue) {
        var $$ = this.internal;
        var config = $$.config, $T = $$.$T;
        var options = optionsValue || {};
        var classes = getOption(options, "classes", [$REGION.region]);
        var regions = $$.$el.main.select(".".concat($REGION.regions))
            .selectAll(classes.map(function (c) { return ".".concat(c); }));
        $T(regions)
            .style("opacity", "0")
            .remove();
        regions = config.regions;
        if (Object.keys(options).length) {
            regions = regions.filter(function (region) {
                var found = false;
                if (!region.class) {
                    return true;
                }
                region.class.split(" ").forEach(function (c) {
                    if (classes.indexOf(c) >= 0) {
                        found = true;
                    }
                });
                return !found;
            });
            config.regions = regions;
        }
        else {
            config.regions = [];
        }
        return regions;
    }
});
var apiRegion = { regions: regions };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiX = {
    /**
     * Get and set x values for the chart.
     * @function x
     * @instance
     * @memberof Chart
     * @param {Array} x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
     * @returns {object} xs
     * @example
     *  // Get current x values
     *  chart.x();
     *
     *  // Update x values for all targets
     *  chart.x([100, 200, 300, 400, ...]);
     */
    x: function (x) {
        var $$ = this.internal;
        var axis = $$.axis, data = $$.data;
        var isCategorized = axis.isCustomX() && axis.isCategorized();
        if (isArray(x)) {
            if (isCategorized) {
                this.categories(x);
            }
            else {
                $$.updateTargetX(data.targets, x);
                $$.redraw({
                    withUpdateOrgXDomain: true,
                    withUpdateXDomain: true
                });
            }
        }
        return isCategorized ? this.categories() : data.xs;
    },
    /**
     * Get and set x values for the chart.
     * @function xs
     * @instance
     * @memberof Chart
     * @param {Array} xs If xs is given, specified target's x values will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
     * @returns {object} xs
     * @example
     *  // Get current x values
     *  chart.xs();
     *
     *  // Update x values for all targets
     *  chart.xs({
     *    data1: [10, 20, 30, 40, ...],
     *    data2: [100, 200, 300, 400, ...]
     *  });
     */
    xs: function (xs) {
        var $$ = this.internal;
        if (isObject(xs)) {
            $$.updateTargetXs($$.data.targets, xs);
            $$.redraw({
                withUpdateOrgXDomain: true,
                withUpdateXDomain: true
            });
        }
        return $$.data.xs;
    }
};

var AxisRendererHelper = /** @class */ (function () {
    function AxisRendererHelper(owner) {
        var scale = getScale();
        var config = owner.config, params = owner.params;
        this.owner = owner;
        this.config = config;
        this.scale = scale;
        if (config.noTransition || !params.config.transition_duration) {
            config.withoutTransition = true;
        }
        // set range
        config.range = this.scaleExtent((params.orgXScale || scale).range());
    }
    /**
     * Compute a character dimension
     * @param {d3.selection} text SVG text selection
     * @param {boolean} memoize memoize the calculated size
     * @returns {{w: number, h: number}}
     * @private
     */
    AxisRendererHelper.getSizeFor1Char = function (text, memoize) {
        if (memoize === void 0) { memoize = true; }
        // default size for one character
        var size = {
            w: 5.5,
            h: 11.5
        };
        !text.empty() && text
            .text("0")
            .call(function (el) {
            try {
                var _a = el.node().getBBox(), width = _a.width, height = _a.height;
                if (width && height) {
                    size.w = width;
                    size.h = height;
                }
            }
            finally {
                el.text("");
            }
        });
        if (memoize) {
            this.getSizeFor1Char = function () { return size; };
        }
        return size;
    };
    /**
     * Get tick transform setter function
     * @param {string} id Axis id
     * @returns {Function} transfrom setter function
     * @private
     */
    AxisRendererHelper.prototype.getTickTransformSetter = function (id) {
        var config = this.config;
        var fn = id === "x" ?
            function (value) { return "translate(".concat(value + config.tickOffset, ",0)"); } :
            function (value) { return "translate(0,".concat(value, ")"); };
        return function (selection, scale) {
            selection.attr("transform", function (d) {
                var x = scale(d);
                return isValue(d) ? fn(x) : null;
            });
        };
    };
    AxisRendererHelper.prototype.scaleExtent = function (domain) {
        var start = domain[0];
        var stop = domain[domain.length - 1];
        return start < stop ? [start, stop] : [stop, start];
    };
    AxisRendererHelper.prototype.generateTicks = function (scale, isYAxes) {
        var tickStepSize = this.owner.params.tickStepSize;
        var _a = scale.domain(), start = _a[0], end = _a[1];
        var ticks = [];
        // When 'axis[y|y2].tick.stepSize' option is set
        if (isYAxes && tickStepSize) {
            var interval = Math.round(start);
            while (interval <= end) {
                ticks.push(interval);
                interval += tickStepSize;
            }
        }
        else if (scale.ticks) {
            var tickArguments = this.config.tickArguments;
            // adjust excessive tick count show
            if (scale.type === "log" && !tickArguments) {
                // nicer symlog ticks didn't implemented yet: https://github.com/d3/d3-scale/issues/162
                // get ticks values from logScale
                var s = getScale("_log")
                    .domain([start > 0 ? start : 1, end])
                    .range(scale.range());
                ticks = s.ticks();
                for (var cnt = end.toFixed().length; ticks.length > 15; cnt--) {
                    ticks = s.ticks(cnt);
                }
                ticks.splice(0, 1, start);
                ticks.splice(ticks.length - 1, 1, end);
            }
            else {
                ticks = scale
                    .ticks.apply(scale, (this.config.tickArguments || []));
            }
            ticks = ticks
                .map(function (v) {
                // round the tick value if is number
                var r = (isString(v) && isNumber(v) && !isNaN(v) &&
                    Math.round(v * 10) / 10) || v;
                return r;
            });
        }
        return ticks;
    };
    AxisRendererHelper.prototype.copyScale = function () {
        var newScale = this.scale.copy();
        if (!newScale.domain().length) {
            newScale.domain(this.scale.domain());
        }
        newScale.type = this.scale.type;
        return newScale;
    };
    AxisRendererHelper.prototype.textFormatted = function (v) {
        var tickFormat = this.config.tickFormat;
        // to round float numbers from 'binary floating point'
        // https://en.wikipedia.org/wiki/Double-precision_floating-point_format
        // https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand
        var value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
        var formatted = tickFormat ? tickFormat(value) : value;
        return isDefined(formatted) ? formatted : "";
    };
    AxisRendererHelper.prototype.transitionise = function (selection) {
        var config = this.config;
        var transitionSelection = selection;
        if (config.withoutTransition) {
            transitionSelection = selection.interrupt();
        }
        else if (config.transition || !this.owner.params.noTransition) {
            // prevent for 'transition not found' case
            // https://github.com/naver/billboard.js/issues/2140
            try {
                transitionSelection = selection.transition(config.transition);
            }
            catch (_a) { }
        }
        return transitionSelection;
    };
    return AxisRendererHelper;
}());

var AxisRenderer = /** @class */ (function () {
    function AxisRenderer(params) {
        if (params === void 0) { params = {}; }
        var config = {
            innerTickSize: 6,
            outerTickSize: params.outerTick ? 6 : 0,
            orient: "bottom",
            range: [],
            tickArguments: null,
            tickCentered: null,
            tickCulling: true,
            tickFormat: null,
            tickLength: 9,
            tickOffset: 0,
            tickPadding: 3,
            tickValues: null,
            transition: null,
            noTransition: params.noTransition
        };
        config.tickLength = Math.max(config.innerTickSize, 0) + config.tickPadding;
        this.config = config;
        this.params = params;
        this.helper = new AxisRendererHelper(this);
    }
    /**
     * Create axis element
     * @param {d3.selection} g Axis selection
     * @private
     */
    AxisRenderer.prototype.create = function (g) {
        var ctx = this;
        var config = ctx.config, helper = ctx.helper, params = ctx.params;
        var scale = helper.scale;
        var orient = config.orient;
        var splitTickText = this.splitTickText.bind(ctx);
        var isLeftRight = /^(left|right)$/.test(orient);
        var isTopBottom = /^(top|bottom)$/.test(orient);
        // line/text enter and path update
        var tickTransform = helper.getTickTransformSetter(isTopBottom ? "x" : "y");
        var axisPx = tickTransform === helper.axisX ? "y" : "x";
        var sign = /^(top|left)$/.test(orient) ? -1 : 1;
        // tick text helpers
        var rotate = params.tickTextRotate;
        this.config.range = scale.rangeExtent ?
            scale.rangeExtent() :
            helper.scaleExtent((params.orgXScale || scale).range());
        var innerTickSize = config.innerTickSize, tickLength = config.tickLength, range = config.range;
        // // get the axis' tick position configuration
        var id = params.id;
        var tickTextPos = id && /^(x|y|y2)$/.test(id) ?
            params.config["axis_".concat(id, "_tick_text_position")] :
            { x: 0, y: 0 };
        // tick visiblity
        var prefix = id === "subX" ? "subchart_axis_x" : "axis_".concat(id);
        var axisShow = params.config["".concat(prefix, "_show")];
        var tickShow = {
            tick: axisShow ? params.config["".concat(prefix, "_tick_show")] : false,
            text: axisShow ? params.config["".concat(prefix, "_tick_text_show")] : false
        };
        var evalTextSize = params.config.axis_evalTextSize;
        var $g;
        g.each(function () {
            var g = select(this);
            var scale0 = this.__chart__ || scale;
            var scale1 = helper.copyScale();
            $g = g;
            this.__chart__ = scale1;
            config.tickOffset = params.isCategory ? (scale1(1) - scale1(0)) / 2 : 0;
            // update selection - data join
            var path = g.selectAll(".domain").data([0]);
            // enter + update selection
            path.enter().append("path")
                .attr("class", "domain")
                // https://observablehq.com/@d3/d3-selection-2-0
                .merge(path)
                .attr("d", function () {
                var outerTickSized = config.outerTickSize * sign;
                return isTopBottom ?
                    "M".concat(range[0], ",").concat(outerTickSized, "V0H").concat(range[1], "V").concat(outerTickSized) :
                    "M".concat(outerTickSized, ",").concat(range[0], "H0V").concat(range[1], "H").concat(outerTickSized);
            });
            if (tickShow.tick || tickShow.text) {
                // count of tick data in array
                var ticks_1 = config.tickValues || helper.generateTicks(scale1, isLeftRight);
                // set generated ticks
                ctx.generatedTicks = ticks_1;
                // update selection
                var tick = g.selectAll(".tick")
                    .data(ticks_1, scale1);
                // enter selection
                var tickEnter = tick
                    .enter()
                    .insert("g", ".domain")
                    .attr("class", "tick");
                // MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
                var tickExit = tick.exit().remove();
                // enter + update selection
                tick = tickEnter.merge(tick);
                tickShow.tick && tickEnter.append("line");
                tickShow.text && tickEnter.append("text");
                var tickText = tick.select("text");
                var sizeFor1Char_1 = isFunction(evalTextSize) ?
                    evalTextSize.bind(ctx.params.owner.api)(tickText.node()) :
                    AxisRendererHelper.getSizeFor1Char(tickText, evalTextSize);
                var counts_1 = [];
                var tspan = tickText
                    .selectAll("tspan")
                    .data(function (d, index) {
                    var split = params.tickMultiline ?
                        splitTickText(d, scale1, ticks_1, isLeftRight, sizeFor1Char_1.w) :
                        (isArray(helper.textFormatted(d)) ?
                            helper.textFormatted(d).concat() :
                            [helper.textFormatted(d)]);
                    counts_1[index] = split.length;
                    return split.map(function (splitted) { return ({ index: index, splitted: splitted }); });
                });
                tspan.exit().remove();
                tspan = tspan
                    .enter()
                    .append("tspan")
                    .merge(tspan)
                    .text(function (d) { return d.splitted; });
                // set <tspan>'s position
                tspan
                    .attr("x", isTopBottom ? 0 : tickLength * sign)
                    .attr("dx", (function () {
                    var dx = 0;
                    if (/(top|bottom)/.test(orient) && rotate) {
                        dx = 8 * Math.sin(Math.PI * (rotate / 180)) *
                            (orient === "top" ? -1 : 1);
                    }
                    return dx + (tickTextPos.x || 0);
                })())
                    .attr("dy", function (d, i) {
                    var defValue = ".71em";
                    var dy = 0;
                    if (orient !== "top") {
                        dy = sizeFor1Char_1.h;
                        if (i === 0) {
                            dy = isLeftRight ?
                                -((counts_1[d.index] - 1) * (sizeFor1Char_1.h / 2) - 3) :
                                (tickTextPos.y === 0 ? defValue : 0);
                        }
                    }
                    return isNumber(dy) && tickTextPos.y ? dy + tickTextPos.y : dy || defValue;
                });
                var lineUpdate = tick.select("line");
                var textUpdate = tick.select("text");
                tickEnter.select("line").attr("".concat(axisPx, "2"), innerTickSize * sign);
                tickEnter.select("text").attr(axisPx, tickLength * sign);
                ctx.setTickLineTextPosition(lineUpdate, textUpdate);
                // Append <title> for tooltip display
                if (params.tickTitle) {
                    var title = textUpdate.select("title");
                    (title.empty() ? textUpdate.append("title") : title)
                        .text(function (index) { return params.tickTitle[index]; });
                }
                if (scale1.bandwidth) {
                    var x_1 = scale1;
                    var dx_1 = x_1.bandwidth() / 2;
                    scale0 = function (d) { return x_1(d) + dx_1; };
                    scale1 = scale0;
                }
                else if (scale0.bandwidth) {
                    scale0 = scale1;
                }
                else {
                    tickTransform(tickExit, scale1);
                }
                // when .flow(), it should follow flow's transition config
                // otherwise make to use ChartInternals.$T()
                tick = params.owner.state.flowing ?
                    helper.transitionise(tick) :
                    params.owner.$T(tick);
                tickTransform(tickEnter, scale0);
                tickTransform(tick.style("opacity", null), scale1);
            }
        });
        this.g = $g;
    };
    /**
     * Get generated ticks
     * @param {number} count Count of ticks
     * @returns {Array} Generated ticks
     * @private
     */
    AxisRenderer.prototype.getGeneratedTicks = function (count) {
        var _a;
        var len = ((_a = this.generatedTicks) === null || _a === void 0 ? void 0 : _a.length) - 1;
        var res = this.generatedTicks;
        if (len > count) {
            var interval_1 = Math.round((len / count) + 0.1);
            res = this.generatedTicks
                .map(function (v, i) { return (i % interval_1 === 0 ? v : null); })
                .filter(function (v) { return v !== null; })
                .splice(0, count);
        }
        return res;
    };
    /**
     * Get tick x/y coordinate
     * @returns {{x: number, y: number}}
     * @private
     */
    AxisRenderer.prototype.getTickXY = function () {
        var config = this.config;
        var pos = { x: 0, y: 0 };
        if (this.params.isCategory) {
            pos.x = config.tickCentered ? 0 : config.tickOffset;
            pos.y = config.tickCentered ? config.tickOffset : 0;
        }
        return pos;
    };
    /**
     * Get tick size
     * @param {object} d data object
     * @returns {number}
     * @private
     */
    AxisRenderer.prototype.getTickSize = function (d) {
        var scale = this.helper.scale;
        var config = this.config;
        var innerTickSize = config.innerTickSize, range = config.range;
        var tickPosition = scale(d) +
            (config.tickCentered ? 0 : config.tickOffset);
        return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
    };
    /**
     * Set tick's line & text position
     * @param {d3.selection} lineUpdate Line selection
     * @param {d3.selection} textUpdate Text selection
     * @private
     */
    AxisRenderer.prototype.setTickLineTextPosition = function (lineUpdate, textUpdate) {
        var tickPos = this.getTickXY();
        var _a = this.config, innerTickSize = _a.innerTickSize, orient = _a.orient, tickLength = _a.tickLength, tickOffset = _a.tickOffset;
        var rotate = this.params.tickTextRotate;
        var textAnchorForText = function (r) {
            var value = ["start", "end"];
            orient === "top" && value.reverse();
            return !r ? "middle" : value[r > 0 ? 0 : 1];
        };
        var textTransform = function (r) { return (r ? "rotate(".concat(r, ")") : null); };
        var yForText = function (r) {
            var r2 = r / (orient === "bottom" ? 15 : 23);
            return r ? 11.5 - 2.5 * r2 * (r > 0 ? 1 : -1) : tickLength;
        };
        var _b = this.params.owner.config, isRotated = _b.axis_rotated, inner = _b.axis_x_tick_text_inner;
        switch (orient) {
            case "bottom":
                lineUpdate
                    .attr("x1", tickPos.x)
                    .attr("x2", tickPos.x)
                    .attr("y2", this.getTickSize.bind(this));
                textUpdate
                    .attr("x", 0)
                    .attr("y", yForText(rotate))
                    .style("text-anchor", textAnchorForText(rotate))
                    .style("text-anchor", function (d, i, _a) {
                    var length = _a.length;
                    if (!isRotated && i === 0 && (inner === true || inner.first)) {
                        return "start";
                    }
                    else if (!isRotated && i === length - 1 && (inner === true || inner.last)) {
                        return "end";
                    }
                    return textAnchorForText(rotate);
                })
                    .attr("transform", textTransform(rotate));
                break;
            case "top":
                lineUpdate
                    .attr("x2", 0)
                    .attr("y2", -innerTickSize);
                textUpdate
                    .attr("x", 0)
                    .attr("y", -yForText(rotate) * 2)
                    .style("text-anchor", textAnchorForText(rotate))
                    .attr("transform", textTransform(rotate));
                break;
            case "left":
                lineUpdate
                    .attr("x2", -innerTickSize)
                    .attr("y1", tickPos.y)
                    .attr("y2", tickPos.y);
                textUpdate
                    .attr("x", -tickLength)
                    .attr("y", tickOffset)
                    .style("text-anchor", "end");
                break;
            case "right":
                lineUpdate
                    .attr("x2", innerTickSize)
                    .attr("y2", 0);
                textUpdate
                    .attr("x", tickLength)
                    .attr("y", 0)
                    .style("text-anchor", "start");
        }
    };
    // this should be called only when category axis
    AxisRenderer.prototype.splitTickText = function (d, scale, ticks, isLeftRight, charWidth) {
        var params = this.params;
        var tickText = this.helper.textFormatted(d);
        var splitted = isString(tickText) && tickText.indexOf("\n") > -1 ?
            tickText.split("\n") :
            [];
        if (splitted.length) {
            return splitted;
        }
        if (isArray(tickText)) {
            return tickText;
        }
        var tickWidth = params.tickWidth;
        if (!tickWidth || tickWidth <= 0) {
            tickWidth = isLeftRight ? 95 : (params.isCategory ?
                (params.isInverted ?
                    scale(ticks[0]) - scale(ticks[1]) :
                    scale(ticks[1]) - scale(ticks[0])) - 12 :
                110);
        }
        // split given text by tick width size
        // eslint-disable-next-line
        function split(splitted, text) {
            var subtext;
            var spaceIndex;
            var textWidth;
            for (var i = 1; i < text.length; i++) {
                if (text.charAt(i) === " ") {
                    spaceIndex = i;
                }
                subtext = text.substr(0, i + 1);
                textWidth = charWidth * subtext.length;
                // if text width gets over tick width, split by space index or current index
                if (tickWidth < textWidth) {
                    return split(splitted.concat(text.substr(0, spaceIndex || i)), text.slice(spaceIndex ? spaceIndex + 1 : i));
                }
            }
            return splitted.concat(text);
        }
        return split(splitted, String(tickText));
    };
    AxisRenderer.prototype.scale = function (x) {
        if (!arguments.length) {
            return this.helper.scale;
        }
        this.helper.scale = x;
        return this;
    };
    AxisRenderer.prototype.orient = function (x) {
        if (!arguments.length) {
            return this.config.orient;
        }
        this.config.orient = x in {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        } ?
            String(x) :
            "bottom";
        return this;
    };
    AxisRenderer.prototype.tickFormat = function (format) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickFormat;
        }
        config.tickFormat = format;
        return this;
    };
    AxisRenderer.prototype.tickCentered = function (isCentered) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickCentered;
        }
        config.tickCentered = isCentered;
        return this;
    };
    /**
     * Return tick's offset value.
     * The value will be set for 'category' axis type.
     * @returns {number}
     * @private
     */
    AxisRenderer.prototype.tickOffset = function () {
        return this.config.tickOffset;
    };
    /**
     * Get tick interval count
     * @private
     * @param {number} size Total data size
     * @returns {number}
     */
    AxisRenderer.prototype.tickInterval = function (size) {
        var _a;
        var _b = this.config, outerTickSize = _b.outerTickSize, tickOffset = _b.tickOffset, tickValues = _b.tickValues;
        var interval;
        if (this.params.isCategory) {
            interval = tickOffset * 2;
        }
        else {
            var scale_1 = (_a = this.params.owner.scale.zoom) !== null && _a !== void 0 ? _a : this.helper.scale;
            var length_1 = this.g.select("path.domain")
                .node()
                .getTotalLength() - outerTickSize * 2;
            interval = length_1 / (size || this.g.selectAll("line").size());
            // get the interval by its values
            var intervalByValue = tickValues ?
                tickValues
                    .map(function (v, i, arr) {
                    var next = i + 1;
                    return next < arr.length ? scale_1(arr[next]) - scale_1(v) : null;
                }).filter(Boolean) :
                [];
            interval = Math.min.apply(Math, __spreadArray(__spreadArray([], intervalByValue, false), [interval], false));
        }
        return interval === Infinity ? 0 : interval;
    };
    AxisRenderer.prototype.ticks = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var config = this.config;
        if (!args.length) {
            return config.tickArguments;
        }
        config.tickArguments = toArray(args);
        return this;
    };
    AxisRenderer.prototype.tickCulling = function (culling) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickCulling;
        }
        config.tickCulling = culling;
        return this;
    };
    AxisRenderer.prototype.tickValues = function (x) {
        var _this = this;
        var config = this.config;
        if (isFunction(x)) {
            config.tickValues = function () { return x(_this.helper.scale.domain()); };
        }
        else {
            if (!arguments.length) {
                return config.tickValues;
            }
            config.tickValues = x;
        }
        return this;
    };
    AxisRenderer.prototype.setTransition = function (t) {
        this.config.transition = t;
        return this;
    };
    return AxisRenderer;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var axis = {
    getAxisInstance: function () {
        return this.axis || new Axis(this);
    }
};
var Axis = /** @class */ (function () {
    function Axis(owner) {
        this.axesList = {};
        this.tick = {
            x: null,
            y: null,
            y2: null
        };
        this.xs = [];
        this.orient = {
            x: "bottom",
            y: "left",
            y2: "right",
            subX: "bottom"
        };
        this.owner = owner;
        this.setOrient();
    }
    Axis.prototype.getAxisClassName = function (id) {
        return "".concat($AXIS.axis, " ").concat($AXIS["axis".concat(capitalize(id))]);
    };
    Axis.prototype.isHorizontal = function ($$, forHorizontal) {
        var isRotated = $$.config.axis_rotated;
        return forHorizontal ? isRotated : !isRotated;
    };
    Axis.prototype.isCategorized = function () {
        var _a = this.owner, config = _a.config, state = _a.state;
        return config.axis_x_type.indexOf("category") >= 0 || state.hasRadar;
    };
    Axis.prototype.isCustomX = function () {
        var config = this.owner.config;
        return !this.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
    };
    Axis.prototype.isTimeSeries = function (id) {
        if (id === void 0) { id = "x"; }
        return this.owner.config["axis_".concat(id, "_type")] === "timeseries";
    };
    Axis.prototype.isLog = function (id) {
        if (id === void 0) { id = "x"; }
        return this.owner.config["axis_".concat(id, "_type")] === "log";
    };
    Axis.prototype.isTimeSeriesY = function () {
        return this.isTimeSeries("y");
    };
    Axis.prototype.getAxisType = function (id) {
        if (id === void 0) { id = "x"; }
        var type = "linear";
        if (this.isTimeSeries(id)) {
            type = this.owner.config.axis_x_localtime ? "time" : "utc";
        }
        else if (this.isLog(id)) {
            type = "log";
        }
        return type;
    };
    Axis.prototype.init = function () {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, _a = $$.$el, main = _a.main, axis = _a.axis, clip = $$.state.clip;
        var isRotated = config.axis_rotated;
        var target = ["x", "y"];
        config.axis_y2_show && target.push("y2");
        target.forEach(function (v) {
            var classAxis = _this.getAxisClassName(v);
            var classLabel = $AXIS["axis".concat(v.toUpperCase(), "Label")];
            axis[v] = main.append("g")
                .attr("class", classAxis)
                .attr("clip-path", function () {
                var res = null;
                if (v === "x") {
                    res = clip.pathXAxis;
                }
                else if (v === "y") { // || v === "y2") {
                    res = clip.pathYAxis;
                }
                return res;
            })
                .attr("transform", $$.getTranslate(v))
                .style("visibility", config["axis_".concat(v, "_show")] ? null : "hidden");
            axis[v].append("text")
                .attr("class", classLabel)
                .attr("transform", ["rotate(-90)", null][v === "x" ? +!isRotated : +isRotated])
                .style("text-anchor", function () { return _this.textAnchorForAxisLabel(v); });
            _this.generateAxes(v);
        });
        config.axis_tooltip && this.setAxisTooltip();
    };
    /**
     * Set axis orient according option value
     * @private
     */
    Axis.prototype.setOrient = function () {
        var $$ = this.owner;
        var _a = $$.config, isRotated = _a.axis_rotated, yInner = _a.axis_y_inner, y2Inner = _a.axis_y2_inner;
        this.orient = {
            x: isRotated ? "left" : "bottom",
            y: isRotated ? (yInner ? "top" : "bottom") : (yInner ? "right" : "left"),
            y2: isRotated ? (y2Inner ? "bottom" : "top") : (y2Inner ? "left" : "right"),
            subX: isRotated ? "left" : "bottom"
        };
    };
    /**
     * Generate axes
     * It's used when axis' axes option is set
     * @param {string} id Axis id
     * @private
     */
    Axis.prototype.generateAxes = function (id) {
        var $$ = this.owner;
        var config = $$.config;
        var axes = [];
        var axesConfig = config["axis_".concat(id, "_axes")];
        var isRotated = config.axis_rotated;
        var d3Axis;
        if (id === "x") {
            d3Axis = isRotated ? axisLeft : axisBottom;
        }
        else if (id === "y") {
            d3Axis = isRotated ? axisBottom : axisLeft;
        }
        else if (id === "y2") {
            d3Axis = isRotated ? axisTop : axisRight;
        }
        if (axesConfig.length) {
            axesConfig.forEach(function (v) {
                var tick = v.tick || {};
                var scale = $$.scale[id].copy();
                v.domain && scale.domain(v.domain);
                axes.push(d3Axis(scale)
                    .ticks(tick.count)
                    .tickFormat(isFunction(tick.format) ? tick.format.bind($$.api) : (function (x) { return x; }))
                    .tickValues(tick.values)
                    .tickSizeOuter(tick.outer === false ? 0 : 6));
            });
        }
        this.axesList[id] = axes;
    };
    /**
     * Update axes nodes
     * @private
     */
    Axis.prototype.updateAxes = function () {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, main = $$.$el.main, $T = $$.$T;
        Object.keys(this.axesList).forEach(function (id) {
            var axesConfig = config["axis_".concat(id, "_axes")];
            var scale = $$.scale[id].copy();
            var range = scale.range();
            _this.axesList[id].forEach(function (v, i) {
                var axisRange = v.scale().range();
                // adjust range value with the current
                // https://github.com/naver/billboard.js/issues/859
                if (!range.every(function (v, i) { return v === axisRange[i]; })) {
                    v.scale().range(range);
                }
                var className = "".concat(_this.getAxisClassName(id), "-").concat(i + 1);
                var g = main.select(".".concat(className.replace(/\s/, ".")));
                if (g.empty()) {
                    g = main.append("g")
                        .attr("class", className)
                        .style("visibility", config["axis_".concat(id, "_show")] ? null : "hidden")
                        .call(v);
                }
                else {
                    axesConfig[i].domain && scale.domain(axesConfig[i].domain);
                    $T(g).call(v.scale(scale));
                }
                g.attr("transform", $$.getTranslate(id, i + 1));
            });
        });
    };
    /**
     * Set Axis & tick values
     * called from: updateScales()
     * @param {string} id Axis id string
     * @param {d3Scale} scale Scale
     * @param {boolean} outerTick If show outer tick
     * @param {boolean} noTransition If with no transition
     * @private
     */
    Axis.prototype.setAxis = function (id, scale, outerTick, noTransition) {
        var $$ = this.owner;
        if (id !== "subX") {
            this.tick[id] = this.getTickValues(id);
        }
        // @ts-ignore
        this[id] = this.getAxis(id, scale, outerTick, 
        // do not transit x Axis on zoom and resizing
        // https://github.com/naver/billboard.js/issues/1949
        id === "x" && ($$.scale.zoom || $$.config.subchart_show || $$.state.resizing) ?
            true :
            noTransition);
    };
    // called from : getMaxTickSize()
    Axis.prototype.getAxis = function (id, scale, outerTick, noTransition, noTickTextRotate) {
        var $$ = this.owner;
        var config = $$.config;
        var isX = /^(x|subX)$/.test(id);
        var type = isX ? "x" : id;
        var isCategory = isX && this.isCategorized();
        var orient = this.orient[id];
        var tickTextRotate = noTickTextRotate ? 0 : $$.getAxisTickRotate(type);
        var tickFormat;
        if (isX) {
            tickFormat = (id === "subX") ? $$.format.subXAxisTick : $$.format.xAxisTick;
        }
        else {
            var fn = config["axis_".concat(id, "_tick_format")];
            if (isFunction(fn)) {
                tickFormat = fn.bind($$.api);
            }
        }
        var tickValues = this.tick[type];
        var axisParams = mergeObj({
            outerTick: outerTick,
            noTransition: noTransition,
            config: config,
            id: id,
            tickTextRotate: tickTextRotate,
            owner: $$
        }, isX && {
            isCategory: isCategory,
            isInverted: config.axis_x_inverted,
            tickMultiline: config.axis_x_tick_multiline,
            tickWidth: config.axis_x_tick_width,
            tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
            orgXScale: $$.scale.x
        });
        if (!isX) {
            axisParams.tickStepSize = config["axis_".concat(type, "_tick_stepSize")];
        }
        var axis = new AxisRenderer(axisParams)
            .scale((isX && $$.scale.zoom) || scale)
            .orient(orient);
        if (isX && this.isTimeSeries() && tickValues && !isFunction(tickValues)) {
            var fn_1 = parseDate.bind($$);
            tickValues = tickValues.map(function (v) { return fn_1(v); });
        }
        else if (!isX && this.isTimeSeriesY()) {
            // https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
            axis.ticks(config.axis_y_tick_time_value);
            tickValues = null;
        }
        tickValues && axis.tickValues(tickValues);
        // Set tick
        axis.tickFormat(tickFormat || (!isX && ($$.isStackNormalized() && (function (x) { return "".concat(x, "%"); }))));
        if (isCategory) {
            axis.tickCentered(config.axis_x_tick_centered);
            if (isEmpty(config.axis_x_tick_culling)) {
                config.axis_x_tick_culling = false;
            }
        }
        var tickCount = config["axis_".concat(type, "_tick_count")];
        tickCount && axis.ticks(tickCount);
        return axis;
    };
    Axis.prototype.updateXAxisTickValues = function (targets, axis) {
        var _a;
        var $$ = this.owner;
        var config = $$.config;
        var fit = config.axis_x_tick_fit;
        var count = config.axis_x_tick_count;
        var values;
        if (fit || (count && fit)) {
            values = $$.mapTargetsToUniqueXs(targets);
            // if given count is greater than the value length, then limit the count.
            if (this.isCategorized() && count > values.length) {
                count = values.length;
            }
            values = this.generateTickValues(values, count, this.isTimeSeries());
        }
        if (axis) {
            axis.tickValues(values);
        }
        else if (this.x) {
            this.x.tickValues(values);
            (_a = this.subX) === null || _a === void 0 ? void 0 : _a.tickValues(values);
        }
        return values;
    };
    Axis.prototype.getId = function (id) {
        var _a = this.owner, config = _a.config, scale = _a.scale;
        var axis = config.data_axes[id];
        // when data.axes option has 'y2', but 'axis.y2.show=true' isn't set will return 'y'
        if (!axis || !scale[axis]) {
            axis = "y";
        }
        return axis;
    };
    Axis.prototype.getXAxisTickFormat = function (forSubchart) {
        var $$ = this.owner;
        var config = $$.config, format = $$.format;
        // enable different tick format for x and subX - subX format defaults to x format if not defined
        var tickFormat = forSubchart ?
            config.subchart_axis_x_tick_format || config.axis_x_tick_format :
            config.axis_x_tick_format;
        var isTimeSeries = this.isTimeSeries();
        var isCategorized = this.isCategorized();
        var currFormat;
        if (tickFormat) {
            if (isFunction(tickFormat)) {
                currFormat = tickFormat.bind($$.api);
            }
            else if (isTimeSeries) {
                currFormat = function (date) { return (date ? format.axisTime(tickFormat)(date) : ""); };
            }
        }
        else {
            currFormat = isTimeSeries ? format.defaultAxisTime : (isCategorized ? $$.categoryName : function (v) { return (v < 0 ? v.toFixed(0) : v); });
        }
        return isFunction(currFormat) ?
            function (v) { return currFormat.apply($$, isCategorized ? [v, $$.categoryName(v)] : [v]); } :
            currFormat;
    };
    Axis.prototype.getTickValues = function (id) {
        var $$ = this.owner;
        var tickValues = $$.config["axis_".concat(id, "_tick_values")];
        var axis = $$["".concat(id, "Axis")];
        return (isFunction(tickValues) ? tickValues.call($$.api) : tickValues) ||
            (axis ? axis.tickValues() : undefined);
    };
    Axis.prototype.getLabelOptionByAxisId = function (id) {
        return this.owner.config["axis_".concat(id, "_label")];
    };
    Axis.prototype.getLabelText = function (id) {
        var option = this.getLabelOptionByAxisId(id);
        return isString(option) ? option : (option ? option.text : null);
    };
    Axis.prototype.setLabelText = function (id, text) {
        var $$ = this.owner;
        var config = $$.config;
        var option = this.getLabelOptionByAxisId(id);
        if (isString(option)) {
            config["axis_".concat(id, "_label")] = text;
        }
        else if (option) {
            option.text = text;
        }
    };
    Axis.prototype.getLabelPosition = function (id, defaultPosition) {
        var isRotated = this.owner.config.axis_rotated;
        var option = this.getLabelOptionByAxisId(id);
        var position = (isObjectType(option) && option.position) ?
            option.position :
            defaultPosition[+!isRotated];
        var has = function (v) { return !!~position.indexOf(v); };
        return {
            isInner: has("inner"),
            isOuter: has("outer"),
            isLeft: has("left"),
            isCenter: has("center"),
            isRight: has("right"),
            isTop: has("top"),
            isMiddle: has("middle"),
            isBottom: has("bottom")
        };
    };
    Axis.prototype.getAxisLabelPosition = function (id) {
        return this.getLabelPosition(id, id === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]);
    };
    Axis.prototype.getLabelPositionById = function (id) {
        return this.getAxisLabelPosition(id);
    };
    Axis.prototype.xForAxisLabel = function (id) {
        var $$ = this.owner;
        var _a = $$.state, width = _a.width, height = _a.height;
        var position = this.getAxisLabelPosition(id);
        var x = position.isMiddle ? -height / 2 : 0;
        if (this.isHorizontal($$, id !== "x")) {
            x = position.isLeft ? 0 : (position.isCenter ? width / 2 : width);
        }
        else if (position.isBottom) {
            x = -height;
        }
        return x;
    };
    Axis.prototype.dxForAxisLabel = function (id) {
        var $$ = this.owner;
        var position = this.getAxisLabelPosition(id);
        var dx = position.isBottom ? "0.5em" : "0";
        if (this.isHorizontal($$, id !== "x")) {
            dx = position.isLeft ? "0.5em" : (position.isRight ? "-0.5em" : "0");
        }
        else if (position.isTop) {
            dx = "-0.5em";
        }
        return dx;
    };
    Axis.prototype.textAnchorForAxisLabel = function (id) {
        var $$ = this.owner;
        var position = this.getAxisLabelPosition(id);
        var anchor = position.isMiddle ? "middle" : "end";
        if (this.isHorizontal($$, id !== "x")) {
            anchor = position.isLeft ? "start" : (position.isCenter ? "middle" : "end");
        }
        else if (position.isBottom) {
            anchor = "start";
        }
        return anchor;
    };
    Axis.prototype.dyForAxisLabel = function (id) {
        var $$ = this.owner;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isInner = this.getAxisLabelPosition(id).isInner;
        var tickRotate = config["axis_".concat(id, "_tick_rotate")] ? $$.getHorizontalAxisHeight(id) : 0;
        var maxTickWidth = this.getMaxTickSize(id).width;
        var dy;
        if (id === "x") {
            var xHeight = config.axis_x_height;
            if (isRotated) {
                dy = isInner ? "1.2em" : -25 - maxTickWidth;
            }
            else if (isInner) {
                dy = "-0.5em";
            }
            else if (xHeight) {
                dy = xHeight - 10;
            }
            else if (tickRotate) {
                dy = tickRotate - 10;
            }
            else {
                dy = "3em";
            }
        }
        else {
            dy = {
                y: ["-0.5em", 10, "3em", "1.2em", 10],
                y2: ["1.2em", -20, "-2.2em", "-0.5em", 15]
            }[id];
            if (isRotated) {
                if (isInner) {
                    dy = dy[0];
                }
                else if (tickRotate) {
                    dy = tickRotate * (id === "y2" ? -1 : 1) - dy[1];
                }
                else {
                    dy = dy[2];
                }
            }
            else {
                dy = isInner ? dy[3] : (dy[4] + (config["axis_".concat(id, "_inner")] ? 0 : (maxTickWidth + dy[4]))) * (id === "y" ? -1 : 1);
            }
        }
        return dy;
    };
    /**
     * Get max tick size
     * @param {string} id axis id string
     * @param {boolean} withoutRecompute wheather or not to recompute
     * @returns {object} {width, height}
     * @private
     */
    Axis.prototype.getMaxTickSize = function (id, withoutRecompute) {
        var $$ = this.owner;
        var config = $$.config, current = $$.state.current, _a = $$.$el, svg = _a.svg, chart = _a.chart;
        var currentTickMax = current.maxTickSize[id];
        var configPrefix = "axis_".concat(id);
        var max = {
            width: 0,
            height: 0
        };
        if (withoutRecompute || !config["".concat(configPrefix, "_show")] || (currentTickMax.width > 0 && $$.filterTargetsToShow().length === 0)) {
            return currentTickMax;
        }
        if (svg) {
            var isYAxis_1 = /^y2?$/.test(id);
            var targetsToShow = $$.filterTargetsToShow($$.data.targets);
            var scale = $$.scale[id].copy().domain($$["get".concat(isYAxis_1 ? "Y" : "X", "Domain")](targetsToShow, id));
            var domain = scale.domain();
            var isDomainSame = domain[0] === domain[1] && domain.every(function (v) { return v > 0; });
            var isCurrentMaxTickDomainSame = isArray(currentTickMax.domain) &&
                currentTickMax.domain[0] === currentTickMax.domain[1] &&
                currentTickMax.domain.every(function (v) { return v > 0; });
            // do not compute if domain or currentMaxTickDomain is same
            if (isDomainSame || isCurrentMaxTickDomainSame) {
                return currentTickMax.size;
            }
            else {
                currentTickMax.domain = domain;
            }
            // reset old max state value to prevent from new data loading
            if (!isYAxis_1) {
                currentTickMax.ticks.splice(0);
            }
            var axis = this.getAxis(id, scale, false, false, true);
            var tickRotate = config["".concat(configPrefix, "_tick_rotate")];
            var tickCount = config["".concat(configPrefix, "_tick_count")];
            var tickValues = config["".concat(configPrefix, "_tick_values")];
            // Make to generate the final tick text to be rendered
            // https://github.com/naver/billboard.js/issues/920
            // Do not generate if 'tick values' option is given
            // https://github.com/naver/billboard.js/issues/1251
            if (!tickValues && tickCount) {
                axis.tickValues(this.generateTickValues(domain, tickCount, isYAxis_1 ? this.isTimeSeriesY() : this.isTimeSeries()));
            }
            !isYAxis_1 && this.updateXAxisTickValues(targetsToShow, axis);
            var dummy = chart.append("svg")
                .style("visibility", "hidden")
                .style("position", "fixed")
                .style("top", "0")
                .style("left", "0");
            axis.create(dummy);
            dummy.selectAll("text")
                .attr("transform", isNumber(tickRotate) ? "rotate(".concat(tickRotate, ")") : null)
                .each(function (d, i) {
                var _a = this.getBoundingClientRect(), width = _a.width, height = _a.height;
                max.width = Math.max(max.width, width);
                max.height = Math.max(max.height, height);
                // cache tick text width for getXAxisTickTextY2Overflow()
                if (!isYAxis_1) {
                    currentTickMax.ticks[i] = width;
                }
            });
            dummy.remove();
        }
        Object.keys(max).forEach(function (key) {
            if (max[key] > 0) {
                currentTickMax[key] = max[key];
            }
        });
        return currentTickMax;
    };
    Axis.prototype.getXAxisTickTextY2Overflow = function (defaultPadding) {
        var $$ = this.owner;
        var axis = $$.axis, config = $$.config, _a = $$.state, current = _a.current, isLegendRight = _a.isLegendRight, legendItemWidth = _a.legendItemWidth;
        var xAxisTickRotate = $$.getAxisTickRotate("x");
        var positiveRotation = xAxisTickRotate > 0 && xAxisTickRotate < 90;
        if ((axis.isCategorized() || axis.isTimeSeries()) &&
            config.axis_x_tick_fit &&
            (!config.axis_x_tick_culling || isEmpty(config.axis_x_tick_culling)) &&
            !config.axis_x_tick_multiline &&
            positiveRotation) {
            var y2AxisWidth = (config.axis_y2_show && current.maxTickSize.y2.width) || 0;
            var legendWidth = (isLegendRight && legendItemWidth) || 0;
            var widthWithoutCurrentPaddingLeft = current.width -
                $$.getCurrentPaddingByDirection("left");
            var maxOverflow = this.getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft - defaultPadding) - y2AxisWidth - legendWidth;
            var xAxisTickTextY2Overflow = Math.max(0, maxOverflow) +
                defaultPadding; // for display inconsistencies between browsers
            return Math.min(xAxisTickTextY2Overflow, widthWithoutCurrentPaddingLeft / 2);
        }
        return 0;
    };
    Axis.prototype.getXAxisTickMaxOverflow = function (xAxisTickRotate, widthWithoutCurrentPaddingLeft) {
        var $$ = this.owner;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var isTimeSeries = axis.isTimeSeries();
        var tickTextWidths = state.current.maxTickSize.x.ticks;
        var tickCount = tickTextWidths.length;
        var _a = state.axis.x.padding, left = _a.left, right = _a.right;
        var maxOverflow = 0;
        var remaining = tickCount - (isTimeSeries && config.axis_x_tick_fit ? 0.5 : 0);
        for (var i = 0; i < tickCount; i++) {
            var tickIndex = i + 1;
            var rotatedTickTextWidth = Math.cos(Math.PI * xAxisTickRotate / 180) *
                tickTextWidths[i];
            var ticksBeforeTickText = tickIndex - (isTimeSeries ? 1 : 0.5) + left;
            // Skip ticks if there are no ticks before them
            if (ticksBeforeTickText <= 0) {
                continue;
            }
            var xAxisLengthWithoutTickTextWidth = widthWithoutCurrentPaddingLeft -
                rotatedTickTextWidth;
            var tickLength = xAxisLengthWithoutTickTextWidth / ticksBeforeTickText;
            var remainingTicks = remaining - tickIndex;
            var paddingRightLength = right * tickLength;
            var remainingTickWidth = (remainingTicks * tickLength) + paddingRightLength;
            var overflow = rotatedTickTextWidth - (tickLength / 2) - remainingTickWidth;
            maxOverflow = Math.max(maxOverflow, overflow);
        }
        var filteredTargets = $$.filterTargetsToShow($$.data.targets);
        var tickOffset = 0;
        if (!isTimeSeries &&
            config.axis_x_tick_count <= filteredTargets.length && filteredTargets[0].values.length) {
            var scale = getScale($$.axis.getAxisType("x"), 0, widthWithoutCurrentPaddingLeft - maxOverflow)
                .domain([
                left * -1,
                $$.getXDomainMax($$.data.targets) + 1 + right
            ]);
            tickOffset = (scale(1) - scale(0)) / 2;
        }
        return maxOverflow + tickOffset;
    };
    Axis.prototype.updateLabels = function (withTransition) {
        var _this = this;
        var $$ = this.owner;
        var main = $$.$el.main, $T = $$.$T;
        var labels = {
            x: main.select(".".concat($AXIS.axisX, " .").concat($AXIS.axisXLabel)),
            y: main.select(".".concat($AXIS.axisY, " .").concat($AXIS.axisYLabel)),
            y2: main.select(".".concat($AXIS.axisY2, " .").concat($AXIS.axisY2Label))
        };
        Object.keys(labels).filter(function (id) { return !labels[id].empty(); })
            .forEach(function (v) {
            var node = labels[v];
            // @check $$.$T(node, withTransition)
            $T(node, withTransition)
                .attr("x", function () { return _this.xForAxisLabel(v); })
                .attr("dx", function () { return _this.dxForAxisLabel(v); })
                .attr("dy", function () { return _this.dyForAxisLabel(v); })
                .text(function () { return _this.getLabelText(v); });
        });
    };
    /**
     * Get axis padding value
     * @param {number|object} padding Padding object
     * @param {string} key Key string of padding
     * @param {Date|number} defaultValue Default value
     * @param {number} domainLength Domain length
     * @returns {number} Padding value in scale
     * @private
     */
    Axis.prototype.getPadding = function (padding, key, defaultValue, domainLength) {
        var p = isNumber(padding) ? padding : padding[key];
        if (!isValue(p)) {
            return defaultValue;
        }
        return this.owner.convertPixelToScale(/(bottom|top)/.test(key) ? "y" : "x", p, domainLength);
    };
    Axis.prototype.generateTickValues = function (values, tickCount, forTimeSeries) {
        var tickValues = values;
        if (tickCount) {
            var targetCount = isFunction(tickCount) ? tickCount() : tickCount;
            // compute ticks according to tickCount
            if (targetCount === 1) {
                tickValues = [values[0]];
            }
            else if (targetCount === 2) {
                tickValues = [values[0], values[values.length - 1]];
            }
            else if (targetCount > 2) {
                var isCategorized = this.isCategorized();
                var count = targetCount - 2;
                var start = values[0];
                var end = values[values.length - 1];
                var interval = (end - start) / (count + 1);
                var tickValue = void 0;
                // re-construct unique values
                tickValues = [start];
                for (var i = 0; i < count; i++) {
                    tickValue = +start + interval * (i + 1);
                    tickValues.push(forTimeSeries ? new Date(tickValue) : (isCategorized ? Math.round(tickValue) : tickValue));
                }
                tickValues.push(end);
            }
        }
        if (!forTimeSeries) {
            tickValues = tickValues.sort(function (a, b) { return a - b; });
        }
        return tickValues;
    };
    Axis.prototype.generateTransitions = function (withTransition) {
        var $$ = this.owner;
        var axis = $$.$el.axis, $T = $$.$T;
        var _a = ["x", "y", "y2", "subX"]
            .map(function (v) { return $T(axis[v], withTransition); }), axisX = _a[0], axisY = _a[1], axisY2 = _a[2], axisSubX = _a[3];
        return { axisX: axisX, axisY: axisY, axisY2: axisY2, axisSubX: axisSubX };
    };
    Axis.prototype.redraw = function (transitions, isHidden, isInit) {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, $el = $$.$el;
        var opacity = isHidden ? "0" : null;
        ["x", "y", "y2", "subX"].forEach(function (id) {
            var axis = _this[id];
            var $axis = $el.axis[id];
            if (axis && $axis) {
                if (!isInit && !config.transition_duration) {
                    axis.config.withoutTransition = true;
                }
                $axis.style("opacity", opacity);
                axis.create(transitions["axis".concat(capitalize(id))]);
            }
        });
        this.updateAxes();
    };
    /**
     * Redraw axis
     * @param {Array} targetsToShow targets data to be shown
     * @param {object} wth option object
     * @param {d3.Transition} transitions Transition object
     * @param {object} flow flow object
     * @param {boolean} isInit called from initialization
     * @private
     */
    Axis.prototype.redrawAxis = function (targetsToShow, wth, transitions, flow, isInit) {
        var _this = this;
        var _a, _b, _c;
        var $$ = this.owner;
        var config = $$.config, scale = $$.scale, $el = $$.$el;
        var hasZoom = !!scale.zoom;
        var xDomainForZoom;
        if (!hasZoom && this.isCategorized() && targetsToShow.length === 0) {
            scale.x.domain([0, $el.axis.x.selectAll(".tick").size()]);
        }
        if (scale.x && targetsToShow.length) {
            !hasZoom &&
                $$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain);
            if (!config.axis_x_tick_values) {
                this.updateXAxisTickValues(targetsToShow);
            }
        }
        else if (this.x) {
            this.x.tickValues([]);
            (_a = this.subX) === null || _a === void 0 ? void 0 : _a.tickValues([]);
        }
        if (config.zoom_rescale && !flow) {
            xDomainForZoom = scale.x.orgDomain();
        }
        ["y", "y2"].forEach(function (key) {
            var prefix = "axis_".concat(key, "_");
            var axisScale = scale[key];
            if (axisScale) {
                var tickValues = config["".concat(prefix, "tick_values")];
                var tickCount = config["".concat(prefix, "tick_count")];
                axisScale.domain($$.getYDomain(targetsToShow, key, xDomainForZoom));
                if (!tickValues && tickCount) {
                    var axis = $$.axis[key];
                    var domain = axisScale.domain();
                    axis.tickValues(_this.generateTickValues(domain, domain.every(function (v) { return v === 0; }) ? 1 : tickCount, _this.isTimeSeriesY()));
                }
            }
        });
        // axes
        this.redraw(transitions, $$.hasArcType(), isInit);
        // Update axis label
        this.updateLabels(wth.Transition);
        // show/hide if manual culling needed
        if ((wth.UpdateXDomain || wth.UpdateXAxis || wth.Y) && targetsToShow.length) {
            this.setCulling();
        }
        // Update sub domain
        if (wth.Y) {
            (_b = scale.subY) === null || _b === void 0 ? void 0 : _b.domain($$.getYDomain(targetsToShow, "y"));
            (_c = scale.subY2) === null || _c === void 0 ? void 0 : _c.domain($$.getYDomain(targetsToShow, "y2"));
        }
    };
    /**
     * Set manual culling
     * @private
     */
    Axis.prototype.setCulling = function () {
        var $$ = this.owner;
        var config = $$.config, _a = $$.state, clip = _a.clip, current = _a.current, $el = $$.$el;
        ["subX", "x", "y", "y2"].forEach(function (type) {
            var axis = $el.axis[type];
            // subchart x axis should be aligned with x axis culling
            var id = type === "subX" ? "x" : type;
            var cullingOptionPrefix = "axis_".concat(id, "_tick_culling");
            var toCull = config[cullingOptionPrefix];
            if (axis && toCull) {
                var tickNodes = axis.selectAll(".tick");
                var tickValues_1 = sortValue(tickNodes.data());
                var tickSize = tickValues_1.length;
                var cullingMax = config["".concat(cullingOptionPrefix, "_max")];
                var lines_1 = config["".concat(cullingOptionPrefix, "_lines")];
                var intervalForCulling_1;
                if (tickSize) {
                    for (var i = 1; i < tickSize; i++) {
                        if (tickSize / i < cullingMax) {
                            intervalForCulling_1 = i;
                            break;
                        }
                    }
                    tickNodes
                        .each(function (d) {
                        var node = lines_1 ? this.querySelector("text") : this;
                        if (node) {
                            node.style.display = tickValues_1.indexOf(d) % intervalForCulling_1 ?
                                "none" :
                                null;
                        }
                    });
                }
                else {
                    tickNodes.style("display", null);
                }
                // set/unset x_axis_tick_clippath
                if (type === "x") {
                    var clipPath = current.maxTickSize.x.clipPath ?
                        clip.pathXAxisTickTexts :
                        null;
                    $el.svg.selectAll(".".concat($AXIS.axisX, " .tick text"))
                        .attr("clip-path", clipPath);
                }
            }
        });
    };
    /**
     * Set axis tooltip
     * @private
     */
    Axis.prototype.setAxisTooltip = function () {
        var _a;
        var $$ = this.owner;
        var _b = $$.config, isRotated = _b.axis_rotated, axis_tooltip = _b.axis_tooltip, _c = $$.$el, axis = _c.axis, axisTooltip = _c.axisTooltip;
        var bgColor = (_a = axis_tooltip.backgroundColor) !== null && _a !== void 0 ? _a : "black";
        $$.generateTextBGColorFilter(bgColor, {
            x: -0.15,
            y: -0.2,
            width: 1.3,
            height: 1.3
        });
        ["x", "y", "y2"].forEach(function (v) {
            var _a, _b, _c;
            axisTooltip[v] = (_a = axis[v]) === null || _a === void 0 ? void 0 : _a.append("text").classed($AXIS["axis".concat(v.toUpperCase(), "Tooltip")], true).attr("filter", $$.updateTextBGColor({ id: v }, bgColor));
            if (isRotated) {
                var pos = v === "x" ? "x" : "y";
                var val = v === "y" ? "1.15em" : (v === "x" ? "-0.3em" : "-0.4em");
                (_b = axisTooltip[v]) === null || _b === void 0 ? void 0 : _b.attr(pos, val).attr("d".concat(v === "x" ? "y" : "x"), v === "x" ? "0.4em" : "-1.3em").style("text-anchor", v === "x" ? "end" : null);
            }
            else {
                var pos = v === "x" ? "y" : "x";
                var val = v === "x" ? "1.15em" : "".concat(v === "y" ? "-" : "", "0.4em");
                (_c = axisTooltip[v]) === null || _c === void 0 ? void 0 : _c.attr(pos, val).attr("d".concat(v === "x" ? "x" : "y"), v === "x" ? "-1em" : "0.3em").style("text-anchor", v === "y" ? "end" : null);
            }
        });
    };
    return Axis;
}());

var eventrect = {
    /**
     * Initialize the area that detects the event.
     * Add a container for the zone that detects the event.
     * @private
     */
    initEventRect: function () {
        var $$ = this;
        $$.$el.main.select(".".concat($COMMON.chart))
            .append("g")
            .attr("class", $EVENT.eventRects)
            .style("fill-opacity", "0");
    },
    /**
     * Redraws the area that detects the event.
     * @private
     */
    redrawEventRect: function () {
        var _a;
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var isMultipleX = $$.isMultipleX();
        var isInverted = config.axis_x_inverted;
        if ($el.eventRect) {
            $$.updateEventRect($el.eventRect, true);
            // do not initialize eventRect when data is empty
        }
        else if ($$.data.targets.length) {
            var eventRects = $$.$el.main.select(".".concat($EVENT.eventRects))
                .style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ?
                (config.axis_rotated ? "ns-resize" : "ew-resize") :
                null)
                .classed($EVENT.eventRectsMultiple, isMultipleX)
                .classed($EVENT.eventRectsSingle, !isMultipleX);
            // append event <rect>
            var eventRectUpdate = eventRects.selectAll(".".concat($EVENT.eventRect))
                .data([0])
                .enter()
                .append("rect");
            $$.updateEventRect(eventRectUpdate);
            // bind event to <rect> element
            $$.updateEventType(eventRectUpdate);
            // bind draggable selection
            eventRectUpdate.call($$.getDraggableSelection());
            $el.eventRect = eventRectUpdate;
            if ($$.state.inputType === "touch" && !$el.svg.on("touchstart.eventRect") &&
                !$$.hasArcType()) {
                $$.bindTouchOnEventRect();
            }
            // when initilazed with empty data and data loaded later, need to update eventRect
            state.rendered && $$.updateEventRect($el.eventRect, true);
        }
        if (!isMultipleX) {
            // Set data and update eventReceiver.data
            var xAxisTickValues = $$.getMaxDataCountTarget();
            if (!config.data_xSort || isInverted) {
                xAxisTickValues.sort(function (a, b) { return (isInverted ? b.x - a.x : a.x - b.x); });
            }
            // update data's index value to be alinged with the x Axis
            $$.updateDataIndexByX(xAxisTickValues);
            $$.updateXs(xAxisTickValues);
            (_a = $$.updatePointClass) === null || _a === void 0 ? void 0 : _a.call($$, true);
            state.eventReceiver.data = xAxisTickValues;
        }
        $$.updateEventRectData();
    },
    bindTouchOnEventRect: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, eventRect = _a.eventRect, svg = _a.svg;
        var selectRect = function (context) {
            if ($$.isMultipleX()) {
                $$.selectRectForMultipleXs(context);
            }
            else {
                var index = $$.getDataIndexFromEvent(state.event);
                $$.callOverOutForTouch(index);
                index === -1 ? $$.unselectRect() : $$.selectRectForSingle(context, index);
            }
        };
        var unselectRect = function () {
            $$.unselectRect();
            $$.callOverOutForTouch();
        };
        // call event.preventDefault()
        // according 'interaction.inputType.touch.preventDefault' option
        var preventDefault = config.interaction_inputType_touch.preventDefault;
        var isPrevented = (isBoolean(preventDefault) && preventDefault) || false;
        var preventThreshold = (!isNaN(preventDefault) && preventDefault) || null;
        var startPx;
        var preventEvent = function (event) {
            var eventType = event.type;
            var touch = event.changedTouches[0];
            var currentXY = touch["client".concat(config.axis_rotated ? "Y" : "X")];
            // prevent document scrolling
            if (eventType === "touchstart") {
                if (isPrevented) {
                    event.preventDefault();
                }
                else if (preventThreshold !== null) {
                    startPx = currentXY;
                }
            }
            else if (eventType === "touchmove") {
                if (isPrevented || startPx === true || (preventThreshold !== null &&
                    Math.abs(startPx - currentXY) >= preventThreshold)) {
                    // once prevented, keep prevented during whole 'touchmove' context
                    startPx = true;
                    event.preventDefault();
                }
            }
        };
        // bind touch events
        eventRect
            .on("touchstart", function (event) {
            state.event = event;
            $$.updateEventRect();
        })
            .on("touchstart.eventRect touchmove.eventRect", function (event) {
            state.event = event;
            if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
                // if touch points are > 1, means doing zooming interaction. In this case do not execute tooltip codes.
                if (state.dragging || state.flowing || $$.hasArcType() ||
                    event.touches.length > 1) {
                    return;
                }
                preventEvent(event);
                selectRect(eventRect.node());
            }
            else {
                unselectRect();
            }
        }, true)
            .on("touchend.eventRect", function (event) {
            state.event = event;
            if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
                if ($$.hasArcType() || !$$.toggleShape || state.cancelClick) {
                    state.cancelClick && (state.cancelClick = false);
                }
            }
        }, true);
        svg.on("touchstart", function (event) {
            state.event = event;
            var target = event.target;
            if (target && target !== eventRect.node()) {
                unselectRect();
            }
        });
    },
    /**
     * Update event rect size
     * @param {d3Selection} eventRect Event <rect> element
     * @param {boolean} force Force to update
     * @private
     */
    updateEventRect: function (eventRect, force) {
        if (force === void 0) { force = false; }
        var $$ = this;
        var state = $$.state, $el = $$.$el;
        var eventReceiver = state.eventReceiver, width = state.width, height = state.height, rendered = state.rendered, resizing = state.resizing;
        var rectElement = eventRect || $el.eventRect;
        var updateClientRect = function () {
            if (eventReceiver) {
                var scrollPos = getScrollPosition($el.chart.node());
                eventReceiver.rect = rectElement.node()
                    .getBoundingClientRect()
                    .toJSON();
                eventReceiver.rect.top += scrollPos.y;
                eventReceiver.rect.left += scrollPos.x;
            }
        };
        if (!rendered || resizing || force) {
            rectElement
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", height);
            // only for init
            if (!rendered || force) {
                rectElement.classed($EVENT.eventRect, true);
            }
        }
        updateClientRect();
    },
    /**
     * Update event type (single or multiple x)
     * @param {d3Selection | boolean} target Target element or boolean to rebind event
     */
    updateEventType: function (target) {
        var $$ = this;
        var isRebindCall = isBoolean(target);
        var eventRect = isRebindCall ? $$.$el.eventRect : target;
        var unbindEvent = isRebindCall ? target !== (eventRect === null || eventRect === void 0 ? void 0 : eventRect.datum().multipleX) : false;
        if (eventRect) {
            // release previous event listeners
            unbindEvent && (eventRect === null || eventRect === void 0 ? void 0 : eventRect.on("mouseover mousemove mouseout click", null));
            $$.isMultipleX() ?
                $$.generateEventRectsForMultipleXs(eventRect) :
                $$.generateEventRectsForSingleX(eventRect);
        }
    },
    /**
     * Updates the location and size of the eventRect.
     * @private
     */
    updateEventRectData: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var xScale = scale.zoom || scale.x;
        var isRotated = config.axis_rotated;
        var isMultipleX = $$.isMultipleX();
        var x;
        var y;
        var w;
        var h;
        $$.updateEventType(isMultipleX);
        if (isMultipleX) {
            // TODO: rotated not supported yet
            x = 0;
            y = 0;
            w = state.width;
            h = state.height;
        }
        else {
            var rectW_1;
            var rectX = void 0;
            if ($$.axis.isCategorized()) {
                rectW_1 = $$.getEventRectWidth();
                rectX = function (d) { return xScale(d.x) - (rectW_1 / 2); };
            }
            else {
                var getPrevNextX_1 = function (_a) {
                    var index = _a.index;
                    return ({
                        prev: $$.getPrevX(index),
                        next: $$.getNextX(index)
                    });
                };
                rectW_1 = function (d) {
                    var x = getPrevNextX_1(d);
                    var xDomain = xScale.domain();
                    var val;
                    // if there this is a single data point make the eventRect full width (or height)
                    if (x.prev === null && x.next === null) {
                        val = isRotated ? state.height : state.width;
                    }
                    else if (x.prev === null) {
                        val = (xScale(x.next) + xScale(d.x)) / 2;
                    }
                    else if (x.next === null) {
                        val = xScale(xDomain[1]) - ((xScale(x.prev) + xScale(d.x)) / 2);
                    }
                    else {
                        Object.keys(x).forEach(function (key, i) {
                            var _a;
                            x[key] = (_a = x[key]) !== null && _a !== void 0 ? _a : xDomain[i];
                        });
                        val = Math.max(0, (xScale(x.next) - xScale(x.prev)) / 2);
                    }
                    return val;
                };
                rectX = function (d) {
                    var x = getPrevNextX_1(d);
                    var val;
                    // if there this is a single data point position the eventRect at 0
                    if (x.prev === null && x.next === null) {
                        val = 0;
                    }
                    else if (x.prev === null) {
                        val = xScale(xScale.domain()[0]);
                    }
                    else {
                        val = (xScale(d.x) + xScale(x.prev)) / 2;
                    }
                    return val;
                };
            }
            x = isRotated ? 0 : rectX;
            y = isRotated ? rectX : 0;
            w = isRotated ? state.width : rectW_1;
            h = isRotated ? rectW_1 : state.height;
        }
        var eventReceiver = state.eventReceiver;
        var call = function (fn, v) { return (isFunction(fn) ? fn(v) : fn); };
        // reset for possible remains coords data before the data loading
        eventReceiver.coords.splice(eventReceiver.data.length);
        eventReceiver.data.forEach(function (d, i) {
            eventReceiver.coords[i] = {
                x: call(x, d),
                y: call(y, d),
                w: call(w, d),
                h: call(h, d)
            };
        });
    },
    /**
     * Seletct rect for single x value
     * @param {d3Selection} context Event rect element
     * @param {number} index x Axis index
     * @private
     */
    selectRectForSingle: function (context, index) {
        var _a, _b;
        var $$ = this;
        var config = $$.config, _c = $$.$el, main = _c.main, circle = _c.circle;
        var isSelectionEnabled = config.data_selection_enabled;
        var isSelectionGrouped = config.data_selection_grouped;
        var isSelectable = config.data_selection_isselectable;
        var isTooltipGrouped = config.tooltip_grouped;
        var selectedData = $$.getAllValuesOnIndex(index);
        if (isTooltipGrouped) {
            $$.showTooltip(selectedData, context);
            (_a = $$.showGridFocus) === null || _a === void 0 ? void 0 : _a.call($$, selectedData);
            if (!isSelectionEnabled || isSelectionGrouped) {
                return;
            }
        }
        // remove possible previous focused state
        !circle &&
            main.selectAll(".".concat($COMMON.EXPANDED, ":not(.").concat($SHAPE.shape, "-").concat(index, ")")).classed($COMMON.EXPANDED, false);
        var shapeAtIndex = main.selectAll(".".concat($SHAPE.shape, "-").concat(index))
            .classed($COMMON.EXPANDED, true)
            .style("cursor", isSelectable ? "pointer" : null)
            .filter(function (d) {
            return $$.isWithinShape(this, d);
        });
        if (shapeAtIndex.empty() && !isTooltipGrouped && config.interaction_onout) {
            (_b = $$.hideGridFocus) === null || _b === void 0 ? void 0 : _b.call($$);
            $$.hideTooltip();
            !isSelectionGrouped && $$.setExpand(index);
        }
        shapeAtIndex
            .call(function (selected) {
            var _a, _b;
            var d = selected.data();
            if (isSelectionEnabled &&
                (isSelectionGrouped || (isSelectable === null || isSelectable === void 0 ? void 0 : isSelectable.bind($$.api)(d)))) {
                context.style.cursor = "pointer";
            }
            if (!isTooltipGrouped) {
                $$.showTooltip(d, context);
                (_a = $$.showGridFocus) === null || _a === void 0 ? void 0 : _a.call($$, d);
                (_b = $$.unexpandCircles) === null || _b === void 0 ? void 0 : _b.call($$);
                selected.each(function (d) { return $$.setExpand(index, d.id); });
            }
        });
    },
    /**
     * Select rect for multiple x values
     * @param {d3Selection} context Event rect element
     * @param {boolean} [triggerEvent=true] Whether trigger event or not
     * @private
     */
    selectRectForMultipleXs: function (context, triggerEvent) {
        if (triggerEvent === void 0) { triggerEvent = true; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        // do nothing when dragging
        if (state.dragging || $$.hasArcType(targetsToShow)) {
            return;
        }
        var mouse = getPointer(state.event, context);
        var closest = $$.findClosestFromTargets(targetsToShow, mouse);
        if (triggerEvent && state.mouseover && (!closest || closest.id !== state.mouseover.id)) {
            config.data_onout.call($$.api, state.mouseover);
            state.mouseover = undefined;
        }
        if (!closest) {
            $$.unselectRect();
            return;
        }
        var sameXData = ($$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped) ?
            [closest] :
            $$.filterByX(targetsToShow, closest.x);
        // show tooltip when cursor is close to some point
        var selectedData = sameXData.map(function (d) { return $$.addName(d); });
        $$.showTooltip(selectedData, context);
        // expand points
        $$.setExpand(closest.index, closest.id, true);
        // Show xgrid focus line
        $$.showGridFocus(selectedData);
        var dist = $$.dist(closest, mouse);
        // Show cursor as pointer if point is close to mouse position
        if ($$.isBarType(closest.id) || dist < $$.getPointSensitivity(closest)) {
            $$.$el.svg.select(".".concat($EVENT.eventRect)).style("cursor", "pointer");
            if (triggerEvent && !state.mouseover) {
                config.data_onover.call($$.api, closest);
                state.mouseover = closest;
            }
        }
    },
    /**
     * Unselect EventRect.
     * @private
     */
    unselectRect: function () {
        var $$ = this;
        var _a = $$.$el, circle = _a.circle, tooltip = _a.tooltip;
        $$.$el.svg.select(".".concat($EVENT.eventRect)).style("cursor", null);
        $$.hideGridFocus();
        if (tooltip) {
            $$.hideTooltip();
            $$._handleLinkedCharts(false);
        }
        circle && !$$.isPointFocusOnly() && $$.unexpandCircles();
        $$.expandBarTypeShapes(false);
    },
    /**
     * Create eventRect for each data on the x-axis.
     * Register touch and drag events.
     * @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
     * @returns {object} d3.select($EVENT.eventRects) object.
     * @private
     */
    generateEventRectsForSingleX: function (eventRectEnter) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var eventReceiver = state.eventReceiver;
        var rect = eventRectEnter
            .style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)
            .on("click", function (event) {
            state.event = event;
            var currentIdx = eventReceiver.currentIdx, data = eventReceiver.data;
            var d = data[currentIdx === -1 ? $$.getDataIndexFromEvent(event) : currentIdx];
            $$.clickHandlerForSingleX.bind(this)(d, $$);
        })
            .datum({ multipleX: false });
        if (state.inputType === "mouse") {
            var getData_1 = function (event) {
                var index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;
                return index > -1 ? eventReceiver.data[index] : null;
            };
            rect
                .on("mouseover", function (event) {
                state.event = event;
                $$.updateEventRect();
                Object.values($$.$el.axisTooltip)
                    .forEach(function (v) { return v === null || v === void 0 ? void 0 : v.style("display", null); });
            })
                .on("mousemove", function (event) {
                var d = getData_1(event);
                state.event = event;
                if (!d) {
                    return;
                }
                var index = d.index;
                var stepType = config.line_step_type;
                // tooltip position match for step-before & step-after
                if (config.line_step_tooltipMatch && $$.hasType("step") &&
                    /^step\-(before|after)$/.test(stepType)) {
                    var scale = $$.scale.zoom || $$.scale.x;
                    var xs = $$.axis.xs[index];
                    var inverted = scale.invert(getPointer(event, this)[0]);
                    if (stepType === "step-after" && inverted < xs) {
                        index -= 1;
                    }
                    else if (stepType === "step-before" && inverted > xs) {
                        index += 1;
                    }
                }
                $$.showAxisGridFocus();
                var eventOnSameIdx = config.tooltip_grouped &&
                    index === eventReceiver.currentIdx;
                // do nothing while dragging/flowing
                if (state.dragging || state.flowing || $$.hasArcType() || eventOnSameIdx) {
                    config.tooltip_show && eventOnSameIdx && $$.setTooltipPosition();
                    return;
                }
                if (index !== eventReceiver.currentIdx) {
                    $$.setOverOut(false, eventReceiver.currentIdx);
                    eventReceiver.currentIdx = index;
                }
                index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, index);
                // As of individual data point(or <path>) element can't bind mouseover/out event
                // to determine current interacting element, so use 'mousemove' event instead.
                $$.setOverOut(index !== -1, index);
            })
                .on("mouseout", function (event) {
                state.event = event;
                // chart is destroyed
                if (!config || $$.hasArcType() || eventReceiver.currentIdx === -1 ||
                    !config.interaction_onout) {
                    return;
                }
                $$.hideAxisGridFocus();
                $$.unselectRect();
                $$.setOverOut(false, eventReceiver.currentIdx);
                // reset the event current index
                eventReceiver.currentIdx = -1;
            });
        }
        return rect;
    },
    clickHandlerForSingleX: function (d, ctx) {
        var $$ = ctx;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        if (!d || $$.hasArcType() || state.cancelClick) {
            state.cancelClick && (state.cancelClick = false);
            return;
        }
        var index = d.index;
        main.selectAll(".".concat($SHAPE.shape, "-").concat(index))
            .each(function (d2) {
            var _a;
            if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
                (_a = $$.toggleShape) === null || _a === void 0 ? void 0 : _a.call($$, this, d2, index);
                config.data_onclick.bind($$.api)(d2, this);
            }
        });
    },
    /**
     * Create an eventRect,
     * Register touch and drag events.
     * @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
     * @private
     */
    generateEventRectsForMultipleXs: function (eventRectEnter) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        eventRectEnter
            .on("click", function (event) {
            state.event = event;
            $$.clickHandlerForMultipleXS.bind(this)($$);
        })
            .datum({ multipleX: true });
        if (state.inputType === "mouse") {
            eventRectEnter
                .on("mouseover mousemove", function (event) {
                state.event = event;
                $$.selectRectForMultipleXs(this);
            })
                .on("mouseout", function (event) {
                state.event = event;
                // chart is destroyed
                if (!$$.config || $$.hasArcType() || !config.interaction_onout) {
                    return;
                }
                $$.unselectRect();
            });
        }
    },
    clickHandlerForMultipleXS: function (ctx) {
        var $$ = ctx;
        var config = $$.config, state = $$.state;
        var pointSensitivity = config.point_sensitivity;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        if ($$.hasArcType(targetsToShow)) {
            return;
        }
        var mouse = getPointer(state.event, this);
        var closest = $$.findClosestFromTargets(targetsToShow, mouse);
        var sensitivity = pointSensitivity === "radius" ? closest === null || closest === void 0 ? void 0 : closest.r : (isFunction(pointSensitivity) ? closest && pointSensitivity(closest) : pointSensitivity);
        if (!closest) {
            return;
        }
        // select if selection enabled
        if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < sensitivity) {
            $$.$el.main.selectAll(".".concat($SHAPE.shapes).concat($$.getTargetSelectorSuffix(closest.id)))
                .selectAll(".".concat($SHAPE.shape, "-").concat(closest.index))
                .each(function () {
                var _a;
                if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
                    (_a = $$.toggleShape) === null || _a === void 0 ? void 0 : _a.call($$, this, closest, closest.index);
                    config.data_onclick.bind($$.api)(closest, this);
                }
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var flow = {
    /**
     * Generate flow
     * @param {object} args option object
     * @returns {Function}
     * @private
     */
    generateFlow: function (args) {
        var $$ = this;
        var data = $$.data, state = $$.state, $el = $$.$el;
        return function () {
            var flowLength = args.flow.length;
            // set flag
            state.flowing = true;
            // remove head data after rendered
            data.targets.forEach(function (d) {
                d.values.splice(0, flowLength);
            });
            // update elements related to x scale
            if ($$.updateXGrid) {
                $$.updateXGrid(true);
            }
            // target elements
            var elements = {};
            [
                "axis.x",
                "grid.x",
                "gridLines.x",
                "region.list",
                "text",
                "bar",
                "line",
                "area",
                "circle"
            ]
                .forEach(function (v) {
                var name = v.split(".");
                var node = $el[name[0]];
                if (node && name.length > 1) {
                    node = node[name[1]];
                }
                if (node === null || node === void 0 ? void 0 : node.size()) {
                    elements[v] = node;
                }
            });
            $$.hideGridFocus();
            $$.setFlowList(elements, args);
        };
    },
    /**
     * Set flow list
     * @param {object} elements Target elements
     * @param {object} args option object
     * @private
     */
    setFlowList: function (elements, args) {
        var $$ = this;
        var flow = args.flow, targets = args.targets;
        var _a = flow.duration, duration = _a === void 0 ? args.duration : _a, flowIndex = flow.index, flowLength = flow.length, orgDataCount = flow.orgDataCount;
        var transform = $$.getFlowTransform(targets, orgDataCount, flowIndex, flowLength);
        var wait = generateWait();
        var n;
        wait.add(Object.keys(elements).map(function (v) {
            n = elements[v]
                .transition()
                .ease(easeLinear)
                .duration(duration);
            if (v === "axis.x") {
                n = n.call(function (g) {
                    $$.axis.x.setTransition(g).create(g);
                });
            }
            else if (v === "region.list") {
                n = n.filter($$.isRegionOnX)
                    .attr("transform", transform);
            }
            else {
                n = n.attr("transform", transform);
            }
            return n;
        }));
        n.call(wait, function () {
            $$.cleanUpFlow(elements, args);
        });
    },
    /**
     * Clean up flow
     * @param {object} elements Target elements
     * @param {object} args option object
     * @private
     */
    cleanUpFlow: function (elements, args) {
        var $$ = this;
        var config = $$.config, state = $$.state, svg = $$.$el.svg;
        var isRotated = config.axis_rotated;
        var flow = args.flow, shape = args.shape, xv = args.xv;
        var _a = shape.pos, cx = _a.cx, cy = _a.cy, xForText = _a.xForText, yForText = _a.yForText;
        var _b = flow.done, done = _b === void 0 ? function () { } : _b, flowLength = flow.length;
        // Remove flowed elements
        if (flowLength) {
            ["circle", "text", "shape", "eventRect"].forEach(function (v) {
                var target = [];
                for (var i = 0; i < flowLength; i++) {
                    target.push(".".concat(CLASS[v], "-").concat(i));
                }
                svg.selectAll(".".concat(CLASS["".concat(v, "s")])) // circles, shapes, texts, eventRects
                    .selectAll(target)
                    .remove();
            });
            svg.select(".".concat(CLASS.xgrid))
                .remove();
        }
        // draw again for removing flowed elements and reverting attr
        Object.keys(elements).forEach(function (v) {
            var n = elements[v];
            if (v !== "axis.x") {
                n.attr("transform", null);
            }
            if (v === "grid.x") {
                n.attr(state.xgridAttr);
            }
            else if (v === "gridLines.x") {
                n.attr("x1", isRotated ? 0 : xv)
                    .attr("x2", isRotated ? state.width : xv);
                n.select("text")
                    .attr("x", isRotated ? state.width : 0)
                    .attr("y", xv);
            }
            else if (/^(area|bar|line)$/.test(v)) {
                n.attr("d", shape.type[v]);
            }
            else if (v === "text") {
                n.attr("x", xForText)
                    .attr("y", yForText)
                    .style("fill-opacity", $$.opacityForText.bind($$));
            }
            else if (v === "circle") {
                if ($$.isCirclePoint()) {
                    n.attr("cx", cx).attr("cy", cy);
                }
                else {
                    var xFunc = function (d) { return cx(d) - config.point_r; };
                    var yFunc = function (d) { return cy(d) - config.point_r; };
                    n.attr("x", xFunc).attr("y", yFunc);
                }
            }
            else if (v === "region.list") {
                n.select("rect").filter($$.isRegionOnX)
                    .attr("x", $$.regionX.bind($$))
                    .attr("width", $$.regionWidth.bind($$));
            }
        });
        config.interaction_enabled && $$.redrawEventRect();
        // callback for end of flow
        done.call($$.api);
        state.flowing = false;
    },
    /**
     * Get flow transform value
     * @param {object} targets target
     * @param {number} orgDataCount original data count
     * @param {number} flowIndex flow index
     * @param {number} flowLength flow length
     * @returns {string}
     * @private
     */
    getFlowTransform: function (targets, orgDataCount, flowIndex, flowLength) {
        var $$ = this;
        var data = $$.data, x = $$.scale.x;
        var dataValues = data.targets[0].values;
        var flowStart = $$.getValueOnIndex(dataValues, flowIndex);
        var flowEnd = $$.getValueOnIndex(dataValues, flowIndex + flowLength);
        var translateX;
        // update x domain to generate axis elements for flow
        var orgDomain = x.domain();
        var domain = $$.updateXDomain(targets, true, true);
        // generate transform to flow
        if (!orgDataCount) { // if empty
            if (dataValues.length !== 1) {
                translateX = x(orgDomain[0]) - x(domain[0]);
            }
            else {
                if ($$.axis.isTimeSeries()) {
                    flowStart = $$.getValueOnIndex(dataValues, 0);
                    flowEnd = $$.getValueOnIndex(dataValues, dataValues.length - 1);
                    translateX = x(flowStart.x) - x(flowEnd.x);
                }
                else {
                    translateX = diffDomain(domain) / 2;
                }
            }
        }
        else if (orgDataCount === 1 || (flowStart === null || flowStart === void 0 ? void 0 : flowStart.x) === (flowEnd === null || flowEnd === void 0 ? void 0 : flowEnd.x)) {
            translateX = x(orgDomain[0]) - x(domain[0]);
        }
        else {
            translateX = $$.axis.isTimeSeries() ?
                x(orgDomain[0]) - x(domain[0]) :
                x((flowStart === null || flowStart === void 0 ? void 0 : flowStart.x) || 0) - x(flowEnd.x);
        }
        var scaleX = diffDomain(orgDomain) / diffDomain(domain);
        return "translate(".concat(translateX, ",0) scale(").concat(scaleX, ",1)");
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var clip = {
    initClip: function () {
        var $$ = this;
        var _a = $$.state, clip = _a.clip, datetimeId = _a.datetimeId;
        // MEMO: clipId needs to be unique because it conflicts when multiple charts exist
        clip.id = "".concat(datetimeId, "-clip");
        clip.idXAxis = "".concat(clip.id, "-xaxis");
        clip.idYAxis = "".concat(clip.id, "-yaxis");
        clip.idGrid = "".concat(clip.id, "-grid");
        // Define 'clip-path' attribute values
        clip.path = $$.getClipPath(clip.id);
        clip.pathXAxis = $$.getClipPath(clip.idXAxis);
        clip.pathYAxis = $$.getClipPath(clip.idYAxis);
        clip.pathGrid = $$.getClipPath(clip.idGrid);
    },
    getClipPath: function (id) {
        var $$ = this;
        var config = $$.config;
        if ((!config.clipPath && /-clip$/.test(id)) ||
            (!config.axis_x_clipPath && /-clip-xaxis$/.test(id)) ||
            (!config.axis_y_clipPath && /-clip-yaxis$/.test(id))) {
            return null;
        }
        return "url(#".concat(id, ")");
    },
    appendClip: function (parent, id) {
        id && parent.append("clipPath")
            .attr("id", id)
            .append("rect");
    },
    /**
     * Set x Axis clipPath dimension
     * @param {d3Selecton} node clipPath <rect> selection
     * @private
     */
    setXAxisClipPath: function (node) {
        var $$ = this;
        var config = $$.config, _a = $$.state, margin = _a.margin, width = _a.width, height = _a.height;
        var isRotated = config.axis_rotated;
        var left = Math.max(30, margin.left) - (isRotated ? 0 : 20);
        // less than 20 is not enough to show the axis label 'outer' without legend
        var h = (isRotated ? (margin.top + height) + 10 : margin.bottom) + 20;
        var x = isRotated ? -(1 + left) : -(left - 1);
        var y = -15; // -Math.max(15, margin.top);
        var w = isRotated ? margin.left + 20 : width + 10 + left;
        node
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h);
    },
    /**
     * Set y Axis clipPath dimension
     * @param {d3Selection} node clipPath <rect> selection
     * @private
     */
    setYAxisClipPath: function (node) {
        var $$ = this;
        var config = $$.config, _a = $$.state, margin = _a.margin, width = _a.width, height = _a.height;
        var isRotated = config.axis_rotated;
        var left = Math.max(30, margin.left) - (isRotated ? 20 : 0);
        var isInner = config.axis_y_inner;
        var x = isInner && !isRotated ?
            (config.axis_y_label.text ? -20 : -1) :
            (isRotated ? -(1 + left) : -(left - 1));
        var y = -(isRotated ? 20 : margin.top);
        var w = (isRotated ? width + 15 + left : margin.left + 20) + (isInner ? 20 : 0);
        var h = (isRotated ? margin.bottom + 10 : (margin.top + height)) + 10;
        node
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h);
    },
    updateXAxisTickClip: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, clip = _a.clip, xAxisHeight = _a.xAxisHeight, defs = $$.$el.defs;
        var newXAxisHeight = $$.getHorizontalAxisHeight("x");
        if (defs && !clip.idXAxisTickTexts) {
            var clipId = "".concat(clip.id, "-xaxisticktexts");
            $$.appendClip(defs, clipId);
            clip.pathXAxisTickTexts = $$.getClipPath(clip.idXAxisTickTexts);
            clip.idXAxisTickTexts = clipId;
        }
        if (!config.axis_x_tick_multiline &&
            $$.getAxisTickRotate("x") &&
            newXAxisHeight !== xAxisHeight) {
            $$.setXAxisTickClipWidth();
            $$.setXAxisTickTextClipPathWidth();
        }
        $$.state.xAxisHeight = newXAxisHeight;
    },
    setXAxisTickClipWidth: function () {
        var $$ = this;
        var config = $$.config, maxTickSize = $$.state.current.maxTickSize;
        var xAxisTickRotate = $$.getAxisTickRotate("x");
        if (!config.axis_x_tick_multiline && xAxisTickRotate) {
            var sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));
            maxTickSize.x.clipPath = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
        }
        else {
            maxTickSize.x.clipPath = null;
        }
    },
    setXAxisTickTextClipPathWidth: function () {
        var $$ = this;
        var _a = $$.state, clip = _a.clip, current = _a.current, svg = $$.$el.svg;
        if (svg) {
            svg.select("#".concat(clip.idXAxisTickTexts, " rect"))
                .attr("width", current.maxTickSize.x.clipPath)
                .attr("height", 30);
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Grid position and text anchor helpers
var getGridTextAnchor = function (d) { return isValue(d.position) || "end"; };
var getGridTextDx = function (d) { return (d.position === "start" ? 4 : (d.position === "middle" ? 0 : -4)); };
/**
 * Get grid text x value getter function
 * @param {boolean} isX Is x Axis
 * @param {number} width Width value
 * @param {number} height Height value
 * @returns {Function}
 * @private
 */
function getGridTextX(isX, width, height) {
    return function (d) {
        var x = isX ? 0 : width;
        if (d.position === "start") {
            x = isX ? -height : 0;
        }
        else if (d.position === "middle") {
            x = (isX ? -height : width) / 2;
        }
        return x;
    };
}
/**
 * Update coordinate attributes value
 * @param {d3.selection} el Target node
 * @param {string} type Type
 * @private
 */
function smoothLines(el, type) {
    {
        el.each(function () {
            var g = select(this);
            ["x1", "x2", "y1", "y2"]
                .forEach(function (v) { return g.attr(v, +g.attr(v)); });
        });
    }
}
var grid = {
    hasGrid: function () {
        var config = this.config;
        return ["x", "y"]
            .some(function (v) { return config["grid_".concat(v, "_show")] || config["grid_".concat(v, "_lines")].length; });
    },
    initGrid: function () {
        var $$ = this;
        $$.hasGrid() && $$.initGridLines();
        $$.initFocusGrid();
    },
    initGridLines: function () {
        var $$ = this;
        var config = $$.config, clip = $$.state.clip, $el = $$.$el;
        if (config.grid_x_lines.length || config.grid_y_lines.length) {
            $el.gridLines.main = $el.main.insert("g", ".".concat($COMMON.chart).concat(config.grid_lines_front ? " + *" : ""))
                .attr("clip-path", clip.pathGrid)
                .attr("class", "".concat($GRID.grid, " ").concat($GRID.gridLines));
            $el.gridLines.main.append("g").attr("class", $GRID.xgridLines);
            $el.gridLines.main.append("g").attr("class", $GRID.ygridLines);
            $el.gridLines.x = selectAll([]);
        }
    },
    updateXGrid: function (withoutUpdate) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, _a = $$.$el, main = _a.main, grid = _a.grid;
        var isRotated = config.axis_rotated;
        var xgridData = $$.generateGridData(config.grid_x_type, scale.x);
        var tickOffset = $$.axis.isCategorized() ? $$.axis.x.tickOffset() : 0;
        var pos = function (d) {
            return (scale.zoom || scale.x)(d) + (tickOffset * (isRotated ? -1 : 1));
        };
        state.xgridAttr = isRotated ?
            {
                x1: 0,
                x2: state.width,
                y1: pos,
                y2: pos
            } :
            {
                x1: pos,
                x2: pos,
                y1: 0,
                y2: state.height
            };
        grid.x = main.select(".".concat($GRID.xgrids))
            .selectAll(".".concat($GRID.xgrid))
            .data(xgridData);
        grid.x.exit().remove();
        grid.x = grid.x.enter()
            .append("line")
            .attr("class", $GRID.xgrid)
            .merge(grid.x);
        if (!withoutUpdate) {
            grid.x.each(function () {
                var grid = select(this);
                Object.keys(state.xgridAttr).forEach(function (id) {
                    grid.attr(id, state.xgridAttr[id])
                        .style("opacity", function () { return (grid.attr(isRotated ? "y1" : "x1") === (isRotated ? state.height : 0) ?
                        "0" :
                        null); });
                });
            });
        }
    },
    updateYGrid: function () {
        var $$ = this;
        var axis = $$.axis, config = $$.config, scale = $$.scale, state = $$.state, _a = $$.$el, grid = _a.grid, main = _a.main;
        var isRotated = config.axis_rotated;
        var pos = function (d) { return scale.y(d); };
        var gridValues = axis.y.getGeneratedTicks(config.grid_y_ticks) ||
            $$.scale.y.ticks(config.grid_y_ticks);
        grid.y = main.select(".".concat($GRID.ygrids))
            .selectAll(".".concat($GRID.ygrid))
            .data(gridValues);
        grid.y.exit().remove();
        grid.y = grid.y
            .enter()
            .append("line")
            .attr("class", $GRID.ygrid)
            .merge(grid.y);
        grid.y.attr("x1", isRotated ? pos : 0)
            .attr("x2", isRotated ? pos : state.width)
            .attr("y1", isRotated ? 0 : pos)
            .attr("y2", isRotated ? state.height : pos);
        smoothLines(grid.y);
    },
    updateGrid: function () {
        var $$ = this;
        var _a = $$.$el, grid = _a.grid, gridLines = _a.gridLines;
        !gridLines.main && $$.initGridLines();
        // hide if arc type
        grid.main.style("visibility", $$.hasArcType() ? "hidden" : null);
        $$.hideGridFocus();
        $$.updateGridLines("x");
        $$.updateGridLines("y");
    },
    /**
     * Update Grid lines
     * @param {string} type x | y
     * @private
     */
    updateGridLines: function (type) {
        var $$ = this;
        var config = $$.config, _a = $$.$el, gridLines = _a.gridLines, main = _a.main, $T = $$.$T;
        var isRotated = config.axis_rotated;
        var isX = type === "x";
        config["grid_".concat(type, "_show")] && $$["update".concat(type.toUpperCase(), "Grid")]();
        var lines = main.select(".".concat($GRID["".concat(type, "gridLines")]))
            .selectAll(".".concat($GRID["".concat(type, "gridLine")]))
            .data(config["grid_".concat(type, "_lines")]);
        // exit
        $T(lines.exit())
            .style("opacity", "0")
            .remove();
        // enter
        var gridLine = lines.enter().append("g");
        gridLine.append("line")
            .style("opacity", "0");
        lines = gridLine.merge(lines);
        lines.each(function (d) {
            var g = select(this);
            if (g.select("text").empty() && d.text) {
                g.append("text")
                    .style("opacity", "0");
            }
        });
        $T(lines
            .attr("class", function (d) { return "".concat($GRID["".concat(type, "gridLine")], " ").concat(d.class || "").trim(); })
            .select("text")
            .attr("text-anchor", getGridTextAnchor)
            .attr("transform", function () { return (isX ?
            (isRotated ? null : "rotate(-90)") :
            (isRotated ? "rotate(-90)" : null)); })
            .attr("dx", getGridTextDx)
            .attr("dy", -5))
            .text(function (d) {
            var _a;
            return (_a = d.text) !== null && _a !== void 0 ? _a : this.remove();
        });
        gridLines[type] = lines;
    },
    redrawGrid: function (withTransition) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated, _a = $$.state, width = _a.width, height = _a.height, gridLines = $$.$el.gridLines, $T = $$.$T;
        var xv = $$.xv.bind($$);
        var yv = $$.yv.bind($$);
        var xLines = gridLines.x.select("line");
        var xTexts = gridLines.x.select("text");
        var yLines = gridLines.y.select("line");
        var yTexts = gridLines.y.select("text");
        xLines = $T(xLines, withTransition)
            .attr("x1", isRotated ? 0 : xv)
            .attr("x2", isRotated ? width : xv)
            .attr("y1", isRotated ? xv : 0)
            .attr("y2", isRotated ? xv : height);
        xTexts = $T(xTexts, withTransition)
            .attr("x", getGridTextX(!isRotated, width, height))
            .attr("y", xv);
        yLines = $T(yLines, withTransition)
            .attr("x1", isRotated ? yv : 0)
            .attr("x2", isRotated ? yv : width)
            .attr("y1", isRotated ? 0 : yv)
            .attr("y2", isRotated ? height : yv);
        yTexts = $T(yTexts, withTransition)
            .attr("x", getGridTextX(isRotated, width, height))
            .attr("y", yv);
        return [
            xLines.style("opacity", null),
            xTexts.style("opacity", null),
            yLines.style("opacity", null),
            yTexts.style("opacity", null)
        ];
    },
    initFocusGrid: function () {
        var $$ = this;
        var config = $$.config, clip = $$.state.clip, $el = $$.$el;
        var isFront = config.grid_front;
        var className = ".".concat(isFront && $el.gridLines.main ? $GRID.gridLines : $COMMON.chart).concat(isFront ? " + *" : "");
        var grid = $el.main.insert("g", className)
            .attr("clip-path", clip.pathGrid)
            .attr("class", $GRID.grid);
        $el.grid.main = grid;
        config.grid_x_show &&
            grid.append("g").attr("class", $GRID.xgrids);
        config.grid_y_show &&
            grid.append("g").attr("class", $GRID.ygrids);
        if (config.axis_tooltip) {
            var axis = grid.append("g").attr("class", "bb-axis-tooltip");
            axis.append("line").attr("class", "bb-axis-tooltip-x");
            axis.append("line").attr("class", "bb-axis-tooltip-y");
        }
        if (config.interaction_enabled && config.grid_focus_show && !config.axis_tooltip) {
            grid.append("g")
                .attr("class", $FOCUS.xgridFocus)
                .append("line")
                .attr("class", $FOCUS.xgridFocus);
            // to show xy focus grid line, should be 'tooltip.grouped=false'
            if (config.grid_focus_y && !config.tooltip_grouped) {
                grid.append("g")
                    .attr("class", $FOCUS.ygridFocus)
                    .append("line")
                    .attr("class", $FOCUS.ygridFocus);
            }
        }
    },
    showAxisGridFocus: function () {
        var _a, _b;
        var $$ = this;
        var config = $$.config, format = $$.format, _c = $$.state, event = _c.event, width = _c.width, height = _c.height;
        var isRotated = config.axis_rotated;
        // get mouse event position
        var _d = getPointer(event, (_a = $$.$el.eventRect) === null || _a === void 0 ? void 0 : _a.node()), x = _d[0], y = _d[1];
        var pos = { x: x, y: y };
        for (var _i = 0, _e = Object.entries($$.$el.axisTooltip); _i < _e.length; _i++) {
            var _f = _e[_i], axis = _f[0], node = _f[1];
            var attr = (axis === "x" && !isRotated) || (axis !== "x" && isRotated) ? "x" : "y";
            var value = pos[attr];
            var scaleText = (_b = $$.scale[axis]) === null || _b === void 0 ? void 0 : _b.invert(value);
            if (scaleText) {
                scaleText = axis === "x" && $$.axis.isTimeSeries() ?
                    format.xAxisTick(scaleText) :
                    scaleText === null || scaleText === void 0 ? void 0 : scaleText.toFixed(2);
                // set position & its text value based on position
                node === null || node === void 0 ? void 0 : node.attr(attr, value).text(scaleText);
            }
        }
        $$.$el.main.selectAll("line.bb-axis-tooltip-x, line.bb-axis-tooltip-y").style("visibility", null)
            .each(function (d, i) {
            var line = select(this);
            if (i === 0) {
                line
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", i ? 0 : height)
                    .attr("y2", i ? height : 0);
            }
            else {
                line
                    .attr("x1", i ? 0 : width)
                    .attr("x2", i ? width : 0)
                    .attr("y1", y)
                    .attr("y2", y);
            }
        });
    },
    hideAxisGridFocus: function () {
        var $$ = this;
        $$.$el.main.selectAll("line.bb-axis-tooltip-x, line.bb-axis-tooltip-y").style("visibility", "hidden");
        Object.values($$.$el.axisTooltip)
            .forEach(function (v) { return v === null || v === void 0 ? void 0 : v.style("display", "none"); });
    },
    /**
     * Show grid focus line
     * @param {Array} data Selected data
     * @private
     */
    showGridFocus: function (data) {
        var _a;
        var $$ = this;
        var config = $$.config, _b = $$.state, width = _b.width, height = _b.height;
        var isRotated = config.axis_rotated;
        var focusEl = $$.$el.main.selectAll("line.".concat($FOCUS.xgridFocus, ", line.").concat($FOCUS.ygridFocus));
        var dataToShow = (data || [focusEl.datum()]).filter(function (d) {
            return d && isValue($$.getBaseValue(d));
        });
        // Hide when bubble/scatter/stanford plot exists
        if (!config.tooltip_show || dataToShow.length === 0 || (!config.axis_x_forceAsSingle && $$.hasType("bubble")) || $$.hasArcType()) {
            return;
        }
        var isEdge = config.grid_focus_edge && !config.tooltip_grouped;
        var xx = $$.xx.bind($$);
        focusEl
            .style("visibility", null)
            .data(dataToShow.concat(dataToShow))
            .each(function (d) {
            var el = select(this);
            var pos = {
                x: xx(d),
                y: $$.getYScaleById(d.id)(d.value)
            };
            var xy;
            if (el.classed($FOCUS.xgridFocus)) {
                // will contain 'x1, y1, x2, y2' order
                xy = isRotated ?
                    [
                        null, // x1
                        pos.x, // y1
                        isEdge ? pos.y : width, // x2
                        pos.x // y2
                    ] :
                    [
                        pos.x,
                        isEdge ? pos.y : null,
                        pos.x,
                        height
                    ];
            }
            else {
                var isY2 = $$.axis.getId(d.id) === "y2";
                xy = isRotated ?
                    [
                        pos.y, // x1
                        isEdge && !isY2 ? pos.x : null, // y1
                        pos.y, // x2
                        isEdge && isY2 ? pos.x : height // y2
                    ] :
                    [
                        isEdge && isY2 ? pos.x : null,
                        pos.y,
                        isEdge && !isY2 ? pos.x : width,
                        pos.y
                    ];
            }
            ["x1", "y1", "x2", "y2"]
                .forEach(function (v, i) { return el.attr(v, xy[i]); });
        });
        smoothLines(focusEl);
        (_a = $$.showCircleFocus) === null || _a === void 0 ? void 0 : _a.call($$, data);
    },
    hideGridFocus: function () {
        var _a;
        var $$ = this;
        var _b = $$.state, inputType = _b.inputType, resizing = _b.resizing, main = $$.$el.main;
        if (inputType === "mouse" || !resizing) {
            main.selectAll("line.".concat($FOCUS.xgridFocus, ", line.").concat($FOCUS.ygridFocus))
                .style("visibility", "hidden");
            (_a = $$.hideCircleFocus) === null || _a === void 0 ? void 0 : _a.call($$);
        }
    },
    updateGridFocus: function () {
        var _a;
        var $$ = this;
        var _b = $$.state, inputType = _b.inputType, width = _b.width, height = _b.height, resizing = _b.resizing, grid = $$.$el.grid;
        var xgridFocus = grid.main.select("line.".concat($FOCUS.xgridFocus));
        if (inputType === "touch") {
            if (xgridFocus.empty()) {
                resizing && ((_a = $$.showCircleFocus) === null || _a === void 0 ? void 0 : _a.call($$));
            }
            else {
                $$.showGridFocus();
            }
        }
        else {
            var isRotated = $$.config.axis_rotated;
            xgridFocus
                .attr("x1", isRotated ? 0 : -10)
                .attr("x2", isRotated ? width : -10)
                .attr("y1", isRotated ? -10 : 0)
                .attr("y2", isRotated ? -10 : height);
        }
        // need to return 'true' as of being pushed to the redraw list
        // ref: getRedrawList()
        return true;
    },
    generateGridData: function (type, scale) {
        var $$ = this;
        var tickNum = $$.$el.main.select(".".concat($AXIS.axisX))
            .selectAll(".tick")
            .size();
        var gridData = [];
        if (type === "year") {
            var xDomain = $$.getXDomain();
            var _a = xDomain.map(function (v) { return v.getFullYear(); }), firstYear = _a[0], lastYear = _a[1];
            for (var i = firstYear; i <= lastYear; i++) {
                gridData.push(new Date("".concat(i, "-01-01 00:00:00")));
            }
        }
        else {
            gridData = scale.ticks(10);
            if (gridData.length > tickNum) { // use only int
                gridData = gridData.filter(function (d) { return String(d).indexOf(".") < 0; });
            }
        }
        return gridData;
    },
    getGridFilterToRemove: function (params) {
        return params ?
            function (line) {
                var found = false;
                (isArray(params) ? params.concat() : [params]).forEach(function (param) {
                    if ((("value" in param && line.value === param.value) ||
                        ("class" in param && line.class === param.class))) {
                        found = true;
                    }
                });
                return found;
            } :
            function () { return true; };
    },
    removeGridLines: function (params, forX) {
        var $$ = this;
        var config = $$.config, $T = $$.$T;
        var toRemove = $$.getGridFilterToRemove(params);
        var toShow = function (line) { return !toRemove(line); };
        var classLines = forX ? $GRID.xgridLines : $GRID.ygridLines;
        var classLine = forX ? $GRID.xgridLine : $GRID.ygridLine;
        $T($$.$el.main.select(".".concat(classLines))
            .selectAll(".".concat(classLine))
            .filter(toRemove))
            .style("opacity", "0")
            .remove();
        var gridLines = "grid_".concat(forX ? "x" : "y", "_lines");
        config[gridLines] = config[gridLines].filter(toShow);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var region = {
    initRegion: function () {
        var $$ = this;
        var $el = $$.$el;
        $el.region.main = $el.main
            .insert("g", ":first-child")
            .attr("clip-path", $$.state.clip.path)
            .attr("class", $REGION.regions);
    },
    updateRegion: function () {
        var $$ = this;
        var config = $$.config, region = $$.$el.region, $T = $$.$T;
        if (!region.main) {
            $$.initRegion();
        }
        // hide if arc type
        region.main.style("visibility", $$.hasArcType() ? "hidden" : null);
        // select <g> element
        var regions = region.main
            .selectAll(".".concat($REGION.region))
            .data(config.regions);
        $T(regions.exit())
            .style("opacity", "0")
            .remove();
        var regionsEnter = regions
            .enter()
            .append("g");
        regionsEnter
            .append("rect")
            .style("fill-opacity", "0");
        region.list = regionsEnter
            .merge(regions)
            .attr("class", $$.classRegion.bind($$));
        region.list.each(function (d) {
            var _a;
            var g = select(this);
            if (g.select("text").empty() && ((_a = d.label) === null || _a === void 0 ? void 0 : _a.text)) {
                select(this).append("text")
                    .style("opacity", "0");
            }
        });
    },
    redrawRegion: function (withTransition) {
        var $$ = this;
        var region = $$.$el.region, $T = $$.$T;
        var regions = region.list.select("rect");
        var label = region.list.selectAll("text");
        regions = $T(regions, withTransition)
            .attr("x", $$.regionX.bind($$))
            .attr("y", $$.regionY.bind($$))
            .attr("width", $$.regionWidth.bind($$))
            .attr("height", $$.regionHeight.bind($$));
        label = $T(label, withTransition)
            .attr("transform", function (d) {
            var _a;
            var _b = (_a = d.label) !== null && _a !== void 0 ? _a : {}, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d, _e = _b.rotated, rotated = _e === void 0 ? false : _e;
            return "translate(".concat($$.regionX.bind($$)(d) + x, ", ").concat($$.regionY.bind($$)(d) + y, ")").concat(rotated ? " rotate(-90)" : "");
        })
            .attr("text-anchor", function (d) { var _a; return (((_a = d.label) === null || _a === void 0 ? void 0 : _a.rotated) ? "end" : null); })
            .attr("dy", "1em")
            .style("fill", function (d) { var _a, _b; return (_b = (_a = d.label) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : null; })
            .text(function (d) { var _a; return (_a = d.label) === null || _a === void 0 ? void 0 : _a.text; });
        return [
            regions
                .style("fill-opacity", function (d) { return (isValue(d.opacity) ? d.opacity : null); })
                .on("end", function () {
                // remove unnecessary rect after transition
                select(this.parentNode)
                    .selectAll("rect:not([x])")
                    .remove();
            }),
            label.style("opacity", null)
        ];
    },
    getRegionXY: function (type, d) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var isRotated = config.axis_rotated;
        var isX = type === "x";
        var key = "start";
        var currScale;
        var pos = 0;
        if (d.axis === "y" || d.axis === "y2") {
            if (!isX) {
                key = "end";
            }
            if ((isX ? isRotated : !isRotated) && key in d) {
                currScale = scale[d.axis];
                pos = currScale(d[key]);
            }
        }
        else if ((isX ? !isRotated : isRotated) && key in d) {
            currScale = scale.zoom || scale.x;
            pos = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
        }
        return pos;
    },
    regionX: function (d) {
        return this.getRegionXY("x", d);
    },
    regionY: function (d) {
        return this.getRegionXY("y", d);
    },
    getRegionSize: function (type, d) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var isRotated = config.axis_rotated;
        var isWidth = type === "width";
        var start = $$[isWidth ? "regionX" : "regionY"](d);
        var currScale;
        var key = "end";
        var end = state[type];
        if (d.axis === "y" || d.axis === "y2") {
            if (!isWidth) {
                key = "start";
            }
            if ((isWidth ? isRotated : !isRotated) && key in d) {
                currScale = scale[d.axis];
                end = currScale(d[key]);
            }
        }
        else if ((isWidth ? !isRotated : isRotated) && key in d) {
            currScale = scale.zoom || scale.x;
            end = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
        }
        return end < start ? 0 : end - start;
    },
    regionWidth: function (d) {
        return this.getRegionSize("width", d);
    },
    regionHeight: function (d) {
        return this.getRegionSize("height", d);
    },
    isRegionOnX: function (d) {
        return !d.axis || d.axis === "x";
    }
};

var sizeAxis = {
    /**
     * Get Axis size according its position
     * @param {string} id Axis id value - x, y or y2
     * @returns {number} size Axis size value
     * @private
     */
    getAxisSize: function (id) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated;
        return (isRotated && id === "x") || (!isRotated && /y2?/.test(id)) ?
            $$.getAxisWidthByAxisId(id, true) :
            $$.getHorizontalAxisHeight(id);
    },
    getAxisWidthByAxisId: function (id, withoutRecompute) {
        var _a, _b;
        var $$ = this;
        if ($$.axis) {
            var position = (_a = $$.axis) === null || _a === void 0 ? void 0 : _a.getLabelPositionById(id);
            var width = $$.axis.getMaxTickSize(id, withoutRecompute).width;
            var gap = width === 0 ? 0.5 : 0;
            return width + (((_b = $$.config.padding) === null || _b === void 0 ? void 0 : _b.mode) === "fit" ?
                position.isInner ? (10 + gap) : 10 :
                position.isInner ?
                    (20 + gap) :
                    40);
        }
        else {
            return 40;
        }
    },
    getHorizontalAxisHeight: function (id) {
        var _a, _b;
        var $$ = this;
        var config = $$.config, state = $$.state;
        var rotatedPadding = state.rotatedPadding, isLegendRight = state.isLegendRight, isLegendInset = state.isLegendInset;
        var isRotated = config.axis_rotated;
        var isFitPadding = ((_a = config.padding) === null || _a === void 0 ? void 0 : _a.mode) === "fit";
        var isInner = config["axis_".concat(id, "_inner")];
        var hasLabelText = config["axis_".concat(id, "_label")].text;
        var defaultHeight = 13;
        var h = ((_b = config.padding) === null || _b === void 0 ? void 0 : _b.mode) === "fit" ?
            (isInner && !hasLabelText ? (id === "y" ? 1 : 0) : 20) :
            30;
        if (id === "x" && !config.axis_x_show) {
            return 8;
        }
        if (id === "x" && isNumber(config.axis_x_height)) {
            return config.axis_x_height;
        }
        if (id === "y" && !config.axis_y_show) {
            return config.legend_show &&
                !isLegendRight &&
                !isLegendInset ?
                10 :
                1;
        }
        if (id === "y2" && !config.axis_y2_show) {
            return isFitPadding ? 0 : rotatedPadding.top;
        }
        var maxtickSize = $$.axis.getMaxTickSize(id);
        var isXAxisTickRotated = Math.abs(config.axis_x_tick_rotate) > 0 && (!config.axis_x_tick_autorotate || $$.needToRotateXAxisTickTexts());
        if ((config.axis_x_tick_multiline || isXAxisTickRotated) &&
            maxtickSize.height > defaultHeight) {
            h += maxtickSize.height - defaultHeight;
        }
        return h +
            ($$.axis.getLabelPositionById(id).isInner ? 0 : 10) +
            (id === "y2" && !isRotated ? -10 : 0);
    },
    getEventRectWidth: function () {
        var $$ = this;
        var config = $$.config, axis = $$.axis;
        var isInverted = config.axis_x_inverted;
        var tickInterval = axis.x.tickInterval();
        return Math.max(0, isInverted ? Math.abs(tickInterval) : tickInterval);
    },
    /**
     * Get axis tick test rotate value
     * @param {string} id Axis id
     * @returns {number} rotate value
     * @private
     */
    getAxisTickRotate: function (id) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, state = $$.state, $el = $$.$el;
        var rotate = config["axis_".concat(id, "_tick_rotate")];
        if (id === "x") {
            var allowedXAxisTypes = axis.isCategorized() || axis.isTimeSeries();
            if (config.axis_x_tick_fit && allowedXAxisTypes) {
                var xTickCount = config.axis_x_tick_count;
                var currentXTicksLength = state.current.maxTickSize.x.ticks.length;
                var tickCount = 0;
                if (xTickCount) {
                    tickCount = xTickCount > currentXTicksLength ? currentXTicksLength : xTickCount;
                }
                else if (currentXTicksLength) {
                    tickCount = currentXTicksLength;
                }
                if (tickCount !== state.axis.x.tickCount) {
                    var targets = $$.data.targets;
                    state.axis.x.padding = $$.getXDomainPadding([
                        $$.getXDomainMinMax(targets, "min"),
                        $$.getXDomainMinMax(targets, "max")
                    ], tickCount);
                }
                state.axis.x.tickCount = tickCount;
            }
            if ($el.svg &&
                config.axis_x_tick_autorotate &&
                config.axis_x_tick_fit &&
                !config.axis_x_tick_multiline &&
                !config.axis_x_tick_culling &&
                allowedXAxisTypes) {
                rotate = $$.needToRotateXAxisTickTexts() ? config.axis_x_tick_rotate : 0;
            }
        }
        return rotate;
    },
    /**
     * Check weather axis tick text needs to be rotated
     * @returns {boolean}
     * @private
     */
    needToRotateXAxisTickTexts: function () {
        var $$ = this;
        var _a = $$.state, axis = _a.axis, current = _a.current, isLegendRight = _a.isLegendRight, legendItemWidth = _a.legendItemWidth;
        var legendWidth = isLegendRight && legendItemWidth;
        var xAxisLength = current.width - legendWidth -
            $$.getCurrentPaddingByDirection("left") - $$.getCurrentPaddingByDirection("right");
        var tickCountWithPadding = axis.x.tickCount +
            axis.x.padding.left + axis.x.padding.right;
        var width = $$.axis.getMaxTickSize("x").width;
        var tickLength = tickCountWithPadding ? xAxisLength / tickCountWithPadding : 0;
        return width > tickLength;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var x = {
    /**
     * Set clip-path attribute for x axis element
     * @name axis․x․clipPath
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo]()
     * @example
     * // don't set 'clip-path' attribute
     * clipPath: false
     */
    axis_x_clipPath: true,
    /**
     * Show or hide x axis.
     * @name axis․x․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   x: {
     *     show: false
     *   }
     * }
     */
    axis_x_show: true,
    /**
     * Force the x axis to interact as single rather than multiple x axes.
     * - **NOTE:** The tooltip event will be triggered nearing each data points(for multiple xs) rather than x axis based(as single x does) in below condition:
     *   - for `bubble` & `scatter` type
     *   - when `data.xs` is set
     *   - when `tooltip.grouped=false` is set
     *     - `tooltip.grouped` options will take precedence over `axis.forceSingleX` option.
     * @name axis․x․forceAsSingle
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.ForceAsSingle)
     * @example
     * axis: {
     *   x: {
     *      // will work as single x axis
     *      forceAsSingle: true
     *   }
     * }
     */
    axis_x_forceAsSingle: false,
    /**
     * Set type of x axis.<br><br>
     * **Available Values:**
     * - category
     * - indexed
     * - log
     * - timeseries
     *
     * **NOTE:**<br>
     * - **log** type:
     *   - the x values specified by [`data.x`](#.data%25E2%2580%25A4x)(or by any equivalent option), must be exclusively-positive.
     *   - x axis min value should be >= 0.
     *   - for 'category' type, `data.xs` option isn't supported.
     * @name axis․x․type
     * @memberof Options
     * @type {string}
     * @default indexed
     * @see [Demo: indexed](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
     * @see [Demo: timeseries](https://naver.github.io/billboard.js/demo/#Chart.TimeseriesChart)
     * @see [Demo: category](https://naver.github.io/billboard.js/demo/#Data.CategoryData)
     * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
     * @example
     * axis: {
     *   x: {
     *     type: "timeseries"
     *   }
     * }
     */
    axis_x_type: "indexed",
    /**
     * Set how to treat the timezone of x values.<br>
     * If true, treat x value as localtime. If false, convert to UTC internally.
     * @name axis․x․localtime
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   x: {
     *     localtime: false
     *   }
     * }
     */
    axis_x_localtime: true,
    /**
     * Set category names on category axis.
     * This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
     * @name axis․x․categories
     * @memberof Options
     * @type {Array}
     * @default []
     * @example
     * axis: {
     *   x: {
     *     categories: ["Category 1", "Category 2", ...]
     *   }
     * }
     */
    axis_x_categories: [],
    /**
     * centerize ticks on category axis.
     * @name axis․x․tick․centered
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       centered: true
     *     }
     *   }
     * }
     */
    axis_x_tick_centered: false,
    /**
     * A function to format tick value. Format string is also available for timeseries data.
     * @name axis․x․tick․format
     * @memberof Options
     * @type {Function|string}
     * @default undefined
     * @see [D3's time specifier](https://d3js.org/d3-time-format#locale_format)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *        // for timeseries, a 'datetime' object is given as parameter
     *       format: function(x) {
     *           return x.getFullYear();
     *       }
     *
     *       // for category, index(Number) and categoryName(String) are given as parameter
     *       format: function(index, categoryName) {
     *           return categoryName.substr(0, 10);
     *       },
     *
     *        // for timeseries format specifier
     *        format: "%Y-%m-%d %H:%M:%S"
     *     }
     *   }
     * }
     */
    axis_x_tick_format: undefined,
    /**
     * Setting for culling ticks.
     * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
     *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.x.tick.culling.lines=false`.
     * - `false`: all of ticks will be shown.<br><br>
     * The number of ticks to be shown can be chaned by `axis.x.tick.culling.max`.
     * @name axis․x․tick․culling
     * @memberof Options
     * @type {boolean}
     * @default
     * `true` for indexed axis and timeseries axis, `false` for category axis
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       culling: false
     *     }
     *   }
     * }
     */
    axis_x_tick_culling: {},
    /**
     * The number of tick texts will be adjusted to less than this value.
     * @name axis․x․tick․culling․max
     * @memberof Options
     * @type {number}
     * @default 10
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       culling: {
     *           max: 5
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_culling_max: 10,
    /**
     * Control visibility of tick lines within culling option, along with tick text.
     * @name axis․x․tick․culling․lines
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       culling: {
     *           lines: false,
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_culling_lines: true,
    /**
     * The number of x axis ticks to show.<br><br>
     * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will have rough second value).
     * @name axis․x․tick․count
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       count: 5
     *     }
     *   }
     * }
     */
    axis_x_tick_count: undefined,
    /**
     * Show or hide x axis tick line.
     * @name axis․x․tick․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       show: false
     *     }
     *   }
     * }
     */
    axis_x_tick_show: true,
    /**
     * Show or hide x axis tick text.
     * @name axis․x․tick․text․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       text: {
     *           show: false
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_text_show: true,
    /**
     * Set the first/last axis tick text to be positioned inside of the chart on non-rotated axis.
     * @name axis․x․tick․text․inner
     * @memberof Options
     * @type {boolean|object}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickInner)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       text: {
     *          inner: true,
     *
     *          // or specify each position of the first and last tick text
     *          inner: {
     *       	   first: true,
     *       	   last: true
     *       	}
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_text_inner: false,
    /**
     * Set the x Axis tick text's position relatively its original position
     * @name axis․x․tick․text․position
     * @memberof Options
     * @type {object}
     * @default {x: 0, y:0}
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       text: {
     *         position: {
     *           x: 10,
     *           y: 10
     *         }
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_text_position: { x: 0, y: 0 },
    /**
     * Fit x axis ticks.
     * - **true**: ticks will be shown according to x value of the data points.
     * - **false**: ticks will be shown as to have same intervals.
     * @name axis․x․tick․fit
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickFitting)
     * @see [Demo: for timeseries zoom](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickTimeseries)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       fit: false
     *     }
     *   }
     * }
     */
    axis_x_tick_fit: true,
    /**
     * Set the x values of ticks manually.<br><br>
     * If this option is provided, the position of the ticks will be determined based on those values.<br>
     * This option works with `timeseries` data and the x values will be parsed accoding to the type of the value and data.xFormat option.
     * @name axis․x․tick․values
     * @memberof Options
     * @type {Array|Function}
     * @default null
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       values: [1, 2, 4, 8, 16, 32, ...],
     *
     *       // an Array value should be returned
     *       values: function() {
     *       	return [ ... ];
     *       }
     *     }
     *   }
     * }
     */
    axis_x_tick_values: null,
    /**
     * Rotate x axis tick text if there is not enough space for 'category' and 'timeseries' type axis.
     * - **NOTE:** The conditions where `autorotate` is enabled are:
     *   - axis.x.type='category' or 'timeseries
     *   - axis.x.tick.multiline=false
     *   - axis.x.tick.culling=false
     *   - axis.x.tick.fit=true
     * - **NOTE:** axis.x.tick.clippath=false is necessary for calculating the overflow padding between the end of x axis and the width of the SVG
     * @name axis․x․tick․autorotate
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickAutorotate)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       rotate: 15,
     *       autorotate: true,
     *       multiline: false,
     *       culling: false,
     *       fit: true
     *     },
     *     clipPath: false
     *   }
     * }
     */
    axis_x_tick_autorotate: false,
    /**
     * Rotate x axis tick text.
     * - If you set negative value, it will rotate to opposite direction.
     * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `false`.
     * - As long as `axis_x_tick_fit` is set to `true` it will calculate an overflow for the y2 axis and add this value to the right padding.
     * @name axis․x․tick․rotate
     * @memberof Options
     * @type {number}
     * @default 0
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.RotateXAxisTickText)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       rotate: 60
     *     }
     *   }
     * }
     */
    axis_x_tick_rotate: 0,
    /**
     * Show x axis outer tick.
     * @name axis․x․tick․outer
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       outer: false
     *     }
     *   }
     * }
     */
    axis_x_tick_outer: true,
    /**
     * Set tick text to be multiline
     * - **NOTE:**
     *  > When x tick text contains `\n`, it's used as line break and 'axis.x.tick.width' option is ignored.
     * @name axis․x․tick․multiline
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickMultiline)
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       multiline: false
     *     }
     *   }
     * }
     * @example
     * // example of line break with '\n'
     * // In this case, 'axis.x.tick.width' is ignored
     * data: {
     *    x: "x",
     *    columns: [
     *        ["x", "long\ntext", "Another\nLong\nText"],
     *        ...
     *    ],
     * }
     */
    axis_x_tick_multiline: true,
    /**
     * Set tick width
     * - **NOTE:**
     *  > When x tick text contains `\n`, this option is ignored.
     * @name axis․x․tick․width
     * @memberof Options
     * @type {number}
     * @default null
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       width: 50
     *     }
     *   }
     * }
     */
    axis_x_tick_width: null,
    /**
     * Set to display system tooltip(via `<title>` element) for tick text
     * - **NOTE:** Only available for category axis type (`axis.x.type='category'`)
     * @name axis․x․tick․tooltip
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   x: {
     *     tick: {
     *       tooltip: true
     *     }
     *   }
     * }
     */
    axis_x_tick_tooltip: false,
    /**
     * Set max value of x axis range.
     * @name axis․x․max
     * @memberof Options
     * @property {number} max Set the max value
     * @property {boolean} [max.fit=false] When specified `max.value` is greater than the bound data value, setting `true` will make x axis max to be fitted to the bound data max value.
     * - **NOTE:** If the bound data max value is greater than the `max.value`, the x axis max will be limited as the given `max.value`.
     * @property {number} [max.value] Set the max value
     * @example
     * axis: {
     *   x: {
     *     max: 100,
     *
     *     max: {
     *       // 'fit=true' will make x axis max to be limited as the bound data value max when 'max.value' is greater.
     *       // - when bound data max is '10' and max.value: '100' ==>  x axis max will be '10'
     *       // - when bound data max is '1000' and max.value: '100' ==> x axis max will be '100'
     *       fit: true,
     *       value: 100
     *     }
     *   }
     * }
     */
    axis_x_max: undefined,
    /**
     * Set min value of x axis range.
     * @name axis․x․min
     * @memberof Options
     * @property {number} min Set the min value
     * @property {boolean} [min.fit=false] When specified `min.value` is lower than the bound data value, setting `true` will make x axis min to be fitted to the bound data min value.
     * - **NOTE:** If the bound data min value is lower than the `min.value`, the x axis min will be limited as the given `min.value`.
     * @property {number} [min.value] Set the min value
     * @example
     * axis: {
     *   x: {
     *     min: -100,
     *
     *     min: {
     *       // 'fit=true' will make x axis min to be limited as the bound data value min when 'min.value' is lower.
     *       // - when bound data min is '-10' and min.value: '-100' ==>  x axis min will be '-10'
     *       // - when bound data min is '-1000' and min.value: '-100' ==> x axis min will be '-100'
     *       fit: true,
     *       value: -100
     *     }
     *   }
     * }
     */
    axis_x_min: undefined,
    /**
     * Change the direction of x axis.<br><br>
     * If true set, the direction will be `right -> left`.
     * @name axis․x․inverted
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
     * @example
     * axis: {
     *   x: {
     *     inverted: true
     *   }
     * }
     */
    axis_x_inverted: false,
    /**
     * Set padding for x axis.<br><br>
     * If this option is set, the range of x axis will increase/decrease according to the values.
     * If no padding is needed in the rage of x axis, 0 should be set.
     * By default, left/right padding are set depending on x axis type or chart types.
     * - **NOTE:**
     *   - The meaning of padding values, differs according axis types:<br>
     *     - **category/indexed:** The unit of tick value
     *       ex. the given value `1`, is same as the width of 1 tick width
     *     - **timeseries:** Numeric time value
     *       ex. the given value `1000*60*60*24`, which is numeric time equivalent of a day, is same as the width of 1 tick width
     *   - If want values to be treated as pixels, specify `unit:"px"`.
     *     - The pixel value will be convered based on the scale values. Hence can not reflect accurate padding result.
     * @name axis․x․padding
     * @memberof Options
     * @type {object|number}
     * @default {}
     * @example
     * axis: {
     *   x: {
     *     padding: {
     *       // when axis type is 'category'
     *       left: 1,  // set left padding width of equivalent value of a tick's width
     *       right: 0.5  // set right padding width as half of equivalent value of tick's width
     *
     *       // when axis type is 'timeseries'
     *       left: 1000*60*60*24,  // set left padding width of equivalent value of a day tick's width
     *       right: 1000*60*60*12   // set right padding width as half of equivalent value of a day tick's width
     *     },
     *
     *     // or set both values at once.
     *     padding: 10,
     *
     *     // or set padding values as pixel unit.
     *     padding: {
     *       left: 100,
     *       right: 50,
     *       unit: "px"
     *     },
     *   }
     * }
     */
    axis_x_padding: {},
    /**
     * Set height of x axis.<br><br>
     * The height of x axis can be set manually by this option. If you need more space for x axis, please use this option for that. The unit is pixel.
     * @name axis․x․height
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   x: {
     *     height: 20
     *   }
     * }
     */
    axis_x_height: undefined,
    /**
     * Set default extent for subchart and zoom. This can be an array or function that returns an array.
     * @name axis․x․extent
     * @memberof Options
     * @type {Array|Function}
     * @default undefined
     * @example
     * axis: {
     *   x: {
     *     // extent range as a pixel value
     *     extent: [0, 200],
     *
     *     // when axis is 'timeseries', parsable datetime string
     *     extent: ["2019-03-01", "2019-03-05"],
     *
     *     // return extent value
     *     extent: function(domain, scale) {
     *    	 var extent = domain.map(function(v) {
     *     	    return scale(v);
     *     	 });
     *
     *   	 // it should return a format of array
     *   	 // ex) [0, 584]
     *     	 return extent;
     *     }
     *   }
     * }
     */
    axis_x_extent: undefined,
    /**
     * Set label on x axis.<br><br>
     * You can set x axis label and change its position by this option.
     * `string` and `object` can be passed and we can change the poisiton by passing object that has position key.<br>
     * Available position differs according to the axis direction (vertical or horizontal).
     * If string set, the position will be the default.
     *
     *  - **If it's horizontal axis:**
     *    - inner-right [default]
     *    - inner-center
     *    - inner-left
     *    - outer-right
     *    - outer-center
     *    - outer-left
     *  - **If it's vertical axis:**
     *    - inner-top [default]
     *    - inner-middle
     *    - inner-bottom
     *    - outer-top
     *    - outer-middle
     *    - outer-bottom
     * @name axis․x․label
     * @memberof Options
     * @type {string|object}
     * @default undefined
     * @example
     * axis: {
     *   x: {
     *     label: "Your X Axis"
     *   }
     * }
     *
     * axis: {
     *   x: {
     *     label: {
     *        text: "Your X Axis",
     *        position: "outer-center"
     *     }
     *   }
     * }
     */
    axis_x_label: {},
    /**
     * Set additional axes for x Axis.
     * - **NOTE:** Axis' scale is based on x Axis value if domain option isn't set.
     *
     * Each axis object should consist with following options:
     *
     * | Name | Type | Default | Description |
     * | --- | --- | --- | --- |
     * | domain | Array | - | Set the domain value |
     * | tick.outer | boolean | true | Show outer tick |
     * | tick.format | Function | - | Set formatter for tick text |
     * | tick.count | Number | - | Set the number of y axis ticks |
     * | tick.values | Array | - | Set tick values manually |
     * @name axis․x․axes
     * @memberof Options
     * @type {Array}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
     * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
     * @example
     * x: {
     *    axes: [
     *      {
     *        // if set, will not be correlated with the main x Axis domain value
     *        domain: [0, 1000],
     *        tick: {
     *          outer: false,
     *          format: function(x) {
     *             return x + "%";
     *          },
     *          count: 2,
     *          values: [10, 20, 30]
     *        }
     *      },
     *      ...
     *    ]
     * }
     */
    axis_x_axes: []
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * y Axis  config options
 */
var y = {
    /**
     * Set clip-path attribute for y axis element
     * - **NOTE**: `clip-path` attribute for y Axis is set only when `axis.y.inner` option is true.
     * @name axis․y․clipPath
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * // don't set 'clip-path' attribute
     * clipPath: false
     */
    axis_y_clipPath: true,
    /**
     * Show or hide y axis.
     * @name axis․y․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   y: {
     *     show: false
     *   }
     * }
     */
    axis_y_show: true,
    /**
     * Set type of y axis.<br><br>
     * **Available Values:**
     *  - indexed
     *  - log
     *  - timeseries
     *
     * **NOTE:**<br>
     * - **log** type:
     *   - the bound data values must be exclusively-positive.
     *   - y axis min value should be >= 0.
     *   - [`data.groups`](#.data%25E2%2580%25A4groups)(stacked data) option aren't supported.
     *
     * @name axis․y․type
     * @memberof Options
     * @type {string}
     * @default "indexed"
     * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
     * @example
     * axis: {
     *   y: {
     *     type: "log"
     *   }
     * }
     */
    axis_y_type: "indexed",
    /**
     * Set max value of y axis.
     * - **NOTE:** Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
     * @name axis․y․max
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     max: 1000
     *   }
     * }
     */
    axis_y_max: undefined,
    /**
     * Set min value of y axis.
     * - **NOTE:**
     *   Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
     * @name axis․y․min
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     min: 1000
     *   }
     * }
     */
    axis_y_min: undefined,
    /**
     * Change the direction of y axis.<br><br>
     * If true set, the direction will be `top -> bottom`.
     * @name axis․y․inverted
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
     * @example
     * axis: {
     *   y: {
     *     inverted: true
     *   }
     * }
     */
    axis_y_inverted: false,
    /**
     * Set center value of y axis.
     * @name axis․y․center
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     center: 0
     *   }
     * }
     */
    axis_y_center: undefined,
    /**
     * Show y axis inside of the chart.
     * @name axis․y․inner
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   y: {
     *     inner: true
     *   }
     * }
     */
    axis_y_inner: false,
    /**
     * Set label on y axis.<br><br>
     * You can set y axis label and change its position by this option. This option works in the same way as [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label).
     * @name axis․y․label
     * @memberof Options
     * @type {string|object}
     * @default {}
     * @see [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label) for position string value.
     * @example
     * axis: {
     *   y: {
     *     label: "Your Y Axis"
     *   }
     * }
     *
     * axis: {
     *   y: {
     *     label: {
     *        text: "Your Y Axis",
     *        position: "outer-middle"
     *     }
     *   }
     * }
     */
    axis_y_label: {},
    /**
     * Set formatter for y axis tick text.<br><br>
     * This option accepts d3.format object as well as a function you define.
     * @name axis․y․tick․format
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       format: function(x) {
     *           return x.getFullYear();
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_format: undefined,
    /**
     * Setting for culling ticks.
     * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
     *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.y.tick.culling.lines=false`.
     * - `false`: all of ticks will be shown.<br><br>
     * The number of ticks to be shown can be chaned by `axis.y.tick.culling.max`.
     * @name axis․y․tick․culling
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       culling: false
     *     }
     *   }
     * }
     */
    axis_y_tick_culling: false,
    /**
     * The number of tick texts will be adjusted to less than this value.
     * @name axis․y․tick․culling․max
     * @memberof Options
     * @type {number}
     * @default 5
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       culling: {
     *           max: 5
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_culling_max: 5,
    /**
     * Control visibility of tick lines within culling option, along with tick text.
     * @name axis․y․tick․culling․lines
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       culling: {
     *           lines: false,
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_culling_lines: true,
    /**
     * Show y axis outer tick.
     * @name axis․y․tick․outer
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       outer: false
     *     }
     *   }
     * }
     */
    axis_y_tick_outer: true,
    /**
     * Set y axis tick values manually.
     * @name axis․y․tick․values
     * @memberof Options
     * @type {Array|Function}
     * @default null
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       values: [100, 1000, 10000],
     *
     *       // an Array value should be returned
     *       values: function() {
     *       	return [ ... ];
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_values: null,
    /**
     * Rotate y axis tick text.
     * - If you set negative value, it will rotate to opposite direction.
     * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `true`.
     * @name axis․y․tick․rotate
     * @memberof Options
     * @type {number}
     * @default 0
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       rotate: 60
     *     }
     *   }
     * }
     */
    axis_y_tick_rotate: 0,
    /**
     * Set the number of y axis ticks.<br><br>
     * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
     * @name axis․y․tick․count
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       count: 5
     *     }
     *   }
     * }
     */
    axis_y_tick_count: undefined,
    /**
     * Show or hide y axis tick line.
     * @name axis․y․tick․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       show: false
     *     }
     *   }
     * }
     */
    axis_y_tick_show: true,
    /**
     * Set axis tick step(interval) size.
     * - **NOTE:** Will be ignored if `axis.y.tick.count` or `axis.y.tick.values` options are set.
     * @name axis․y․tick․stepSize
     * @memberof Options
     * @type {number}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.StepSizeForYAxis)
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       // tick value will step as indicated interval value.
     *       // ex) 'stepSize=15' ==> [0, 15, 30, 45, 60]
     *       stepSize: 15
     *     }
     *   }
     * }
     */
    axis_y_tick_stepSize: null,
    /**
     * Show or hide y axis tick text.
     * @name axis․y․tick․text․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       text: {
     *           show: false
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_text_show: true,
    /**
     * Set the y Axis tick text's position relatively its original position
     * @name axis․y․tick․text․position
     * @memberof Options
     * @type {object}
     * @default {x: 0, y:0}
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       text: {
     *         position: {
     *           x: 10,
     *           y: 10
     *         }
     *       }
     *     }
     *   }
     * }
     */
    axis_y_tick_text_position: { x: 0, y: 0 },
    /**
     * Set the number of y axis ticks.<br><br>
     * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
     * @name axis․y․tick․time
     * @memberof Options
     * @private
     * @type {object}
     * @property {object} time time object
     * @property {Function} [time.value] D3's time interval function (https://github.com/d3/d3-time#intervals)
     * @example
     * axis: {
     *   y: {
     *     tick: {
     *       time: {
     *          // ticks at 15-minute intervals
     *          // https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
     *          value: d3.timeMinute.every(15)
     *       }
     *     }
     *   }
     * }
     */
    // @TODO: not fully implemented yet
    axis_y_tick_time_value: undefined,
    /**
     * Set padding for y axis.<br><br>
     * You can set padding for y axis to create more space on the edge of the axis.
     * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
     *
     * - **NOTE:**
     *   - Given values are translated relative to the y Axis domain value for padding
     *   - For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
     * @name axis․y․padding
     * @memberof Options
     * @type {object|number}
     * @default {}
     * @example
     * axis: {
     *   y: {
     *     padding: {
     *       top: 0,
     *       bottom: 0
     *     },
     *
     *     // or set both values at once.
     *     padding: 10
     *   }
     * }
     */
    axis_y_padding: {},
    /**
     * Set default range of y axis.<br><br>
     * This option set the default value for y axis when there is no data on init.
     * @name axis․y․default
     * @memberof Options
     * @type {Array}
     * @default undefined
     * @example
     * axis: {
     *   y: {
     *     default: [0, 1000]
     *   }
     * }
     */
    axis_y_default: undefined,
    /**
     * Set additional axes for y Axis.
     * - **NOTE:** Axis' scale is based on y Axis value if domain option isn't set.
     *
     * Each axis object should consist with following options:
     *
     * | Name | Type | Default | Description |
     * | --- | --- | --- | --- |
     * | domain | Array | - | Set the domain value |
     * | tick.outer | boolean | true | Show outer tick |
     * | tick.format | Function | - | Set formatter for tick text |
     * | tick.count | Number | - | Set the number of y axis ticks |
     * | tick.values | Array | - | Set tick values manually |
     * @name axis․y․axes
     * @memberof Options
     * @type {Array}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
     * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
     * @example
     * y: {
     *    axes: [
     *      {
     *        // if set, will not be correlated with the main y Axis domain value
     *        domain: [0, 1000],
     *        tick: {
     *          outer: false,
     *          format: function(x) {
     *             return x + "%";
     *          },
     *          count: 2,
     *          values: [10, 20, 30]
     *        }
     *      },
     *      ...
     *    ]
     * }
     */
    axis_y_axes: []
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * y2 Axis  config options
 */
var y2 = {
    /**
     * Show or hide y2 axis.
     * - **NOTE**:
     *   - When set to `false` will not generate y2 axis node. In this case, all 'y2' axis related functionality won't work properly.
     *   - If need to use 'y2' related options while y2 isn't visible, set the value `true` and control visibility by css display property.
     * @name axis․y2․show
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   y2: {
     *     show: true
     *   }
     * }
     */
    axis_y2_show: false,
    /**
     * Set type of y2 axis.<br><br>
     * **Available Values:**
     *  - indexed
     *  - log
     *  - timeseries
     *
     * **NOTE:**<br>
     * - **log** type:
     *   - the bound data values must be exclusively-positive.
     *   - y2 axis min value should be >= 0.
     *   - [`data.groups`](#.data%25E2%2580%25A4groups)(stacked data) option aren't supported.
     *
     * @name axis․y2․type
     * @memberof Options
     * @type {string}
     * @default "indexed"
     * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
     * @example
     * axis: {
     *   y2: {
     *     type: "indexed"
     *   }
     * }
     */
    axis_y2_type: "indexed",
    /**
     * Set max value of y2 axis.
     * @name axis․y2․max
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     max: 1000
     *   }
     * }
     */
    axis_y2_max: undefined,
    /**
     * Set min value of y2 axis.
     * @name axis․y2․min
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     min: -1000
     *   }
     * }
     */
    axis_y2_min: undefined,
    /**
     * Change the direction of y2 axis.<br><br>
     * If true set, the direction will be `top -> bottom`.
     * @name axis․y2․inverted
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
     * @example
     * axis: {
     *   y2: {
     *     inverted: true
     *   }
     * }
     */
    axis_y2_inverted: false,
    /**
     * Set center value of y2 axis.
     * @name axis․y2․center
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     center: 0
     *   }
     * }
     */
    axis_y2_center: undefined,
    /**
     * Show y2 axis inside of the chart.
     * @name axis․y2․inner
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   y2: {
     *     inner: true
     *   }
     * }
     */
    axis_y2_inner: false,
    /**
     * Set label on y2 axis.<br><br>
     * You can set y2 axis label and change its position by this option. This option works in the same way as [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label).
     * @name axis․y2․label
     * @memberof Options
     * @type {string|object}
     * @default {}
     * @see [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label) for position string value.
     * @example
     * axis: {
     *   y2: {
     *     label: "Your Y2 Axis"
     *   }
     * }
     *
     * axis: {
     *   y2: {
     *     label: {
     *        text: "Your Y2 Axis",
     *        position: "outer-middle"
     *     }
     *   }
     * }
     */
    axis_y2_label: {},
    /**
     * Set formatter for y2 axis tick text.<br><br>
     * This option works in the same way as axis.y.format.
     * @name axis․y2․tick․format
     * @memberof Options
     * @type {Function}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       format: d3.format("$,")
     *       //or format: function(d) { return "$" + d; }
     *     }
     *   }
     * }
     */
    axis_y2_tick_format: undefined,
    /**
     * Setting for culling ticks.
     * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
     *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.y2.tick.culling.lines=false`.
     * - `false`: all of ticks will be shown.<br><br>
     * The number of ticks to be shown can be chaned by `axis.y2.tick.culling.max`.
     * @name axis․y2․tick․culling
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       culling: false
     *     }
     *   }
     * }
     */
    axis_y2_tick_culling: false,
    /**
     * The number of tick texts will be adjusted to less than this value.
     * @name axis․y2․tick․culling․max
     * @memberof Options
     * @type {number}
     * @default 5
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       culling: {
     *           max: 5
     *       }
     *     }
     *   }
     * }
     */
    axis_y2_tick_culling_max: 5,
    /**
     * Control visibility of tick lines within culling option, along with tick text.
     * @name axis․y2․tick․culling․lines
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       culling: {
     *           lines: false,
     *       }
     *     }
     *   }
     * }
     */
    axis_y2_tick_culling_lines: true,
    /**
     * Show or hide y2 axis outer tick.
     * @name axis․y2․tick․outer
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       outer: false
     *     }
     *   }
     * }
     */
    axis_y2_tick_outer: true,
    /**
     * Set y2 axis tick values manually.
     * @name axis․y2․tick․values
     * @memberof Options
     * @type {Array|Function}
     * @default null
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       values: [100, 1000, 10000],
     *
     *       // an Array value should be returned
     *       values: function() {
     *       	return [ ... ];
     *       }
     *     }
     *   }
     * }
     */
    axis_y2_tick_values: null,
    /**
     * Rotate y2 axis tick text.
     * - If you set negative value, it will rotate to opposite direction.
     * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `true`.
     * @name axis․y2․tick․rotate
     * @memberof Options
     * @type {number}
     * @default 0
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       rotate: 60
     *     }
     *   }
     * }
     */
    axis_y2_tick_rotate: 0,
    /**
     * Set the number of y2 axis ticks.
     * - **NOTE:** This works in the same way as axis.y.tick.count.
     * @name axis․y2․tick․count
     * @memberof Options
     * @type {number}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       count: 5
     *     }
     *   }
     * }
     */
    axis_y2_tick_count: undefined,
    /**
     * Show or hide y2 axis tick line.
     * @name axis․y2․tick․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       show: false
     *     }
     *   }
     * }
     */
    axis_y2_tick_show: true,
    /**
     * Set axis tick step(interval) size.
     * - **NOTE:** Will be ignored if `axis.y2.tick.count` or `axis.y2.tick.values` options are set.
     * @name axis․y2․tick․stepSize
     * @memberof Options
     * @type {number}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.StepSizeForYAxis)
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       // tick value will step as indicated interval value.
     *       // ex) 'stepSize=15' ==> [0, 15, 30, 45, 60]
     *       stepSize: 15
     *     }
     *   }
     * }
     */
    axis_y2_tick_stepSize: null,
    /**
     * Show or hide y2 axis tick text.
     * @name axis․y2․tick․text․show
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       text: {
     *           show: false
     *       }
     *     }
     *   }
     * }
     */
    axis_y2_tick_text_show: true,
    /**
     * Set the y2 Axis tick text's position relatively its original position
     * @name axis․y2․tick․text․position
     * @memberof Options
     * @type {object}
     * @default {x: 0, y:0}
     * @example
     * axis: {
     *   y2: {
     *     tick: {
     *       text: {
     *         position: {
     *           x: 10,
     *           y: 10
     *         }
     *       }
     *     }
     *   }
     * }
     */
    axis_y2_tick_text_position: { x: 0, y: 0 },
    /**
     * Set padding for y2 axis.<br><br>
     * You can set padding for y2 axis to create more space on the edge of the axis.
     * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
     *
     * - **NOTE:**
     *   - Given values are translated relative to the y2 Axis domain value for padding
     *   - For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
     * @name axis․y2․padding
     * @memberof Options
     * @type {object|number}
     * @default {}
     * @example
     * axis: {
     *   y2: {
     *     padding: {
     *       top: 100,
     *       bottom: 100
     *     }
     *
     *     // or set both values at once.
     *     padding: 10
     * }
     */
    axis_y2_padding: {},
    /**
     * Set default range of y2 axis.<br><br>
     * This option set the default value for y2 axis when there is no data on init.
     * @name axis․y2․default
     * @memberof Options
     * @type {Array}
     * @default undefined
     * @example
     * axis: {
     *   y2: {
     *     default: [0, 1000]
     *   }
     * }
     */
    axis_y2_default: undefined,
    /**
     * Set additional axes for y2 Axis.
     * - **NOTE:** Axis' scale is based on y2 Axis value if domain option isn't set.
     *
     * Each axis object should consist with following options:
     *
     * | Name | Type | Default | Description |
     * | --- | --- | --- | --- |
     * | domain | Array | - | Set the domain value |
     * | tick.outer | boolean | true | Show outer tick |
     * | tick.format | Function | - | Set formatter for tick text |
     * | tick.count | Number | - | Set the number of y axis ticks |
     * | tick.values | Array | - | Set tick values manually |
     * @name axis․y2․axes
     * @memberof Options
     * @type {Array}
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
     * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
     * @example
     * y2: {
     *    axes: [
     *      {
     *        // if set, will not be correlated with the main y2 Axis domain value
     *        domain: [0, 1000],
     *        tick: {
     *          outer: false,
     *          format: function(x) {
     *             return x + "%";
     *          },
     *          count: 2,
     *          values: [10, 20, 30]
     *        }
     *      },
     *      ...
     *    ]
     * }
     */
    axis_y2_axes: []
};

/**
 * y Axis  config options
 */
var optAxis = __assign(__assign(__assign({ 
    /**
     * Setup the way to evaluate tick text size.
     * - **NOTE:**
     *   - Setting `false` or custom evaluator, highly recommended to memoize evaluated text dimension value to not degrade performance.
     * @name axis․evalTextSize
     * @memberof Options
     * @type {boolean|Function}
     * @default true
     * @example
     * axis: {
     *   // will evaluate getting text size every time.
     *   evalTextSize: false.
     *
     *   // set a custom evaluator
     *   evalTextSize: function(textElement) {
     *     // set some character to be evaluated
     *     text.textContent = "0";
     *
     *     // get the size
     *      const box = text.getBBox();
     *
     *     // clear text
     *     text.textContent = "";
     *
     *     return { w: 7, h: 12};
     *   }
     * }
     */
    axis_evalTextSize: true, 
    /**
     * Switch x and y axis position.
     * @name axis․rotated
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * axis: {
     *   rotated: true
     * }
     */
    axis_rotated: false, 
    /**
     * Set axis tooltip.
     * - **NOTE:**
     *   - When enabled, will disable default focus grid line.
     *   - For `timeseries` x Axis, tootlip will be formatted using x Axis' tick format.
     *   - For `category` x Axis, tootlip will be displaying scales' value text.
     * @name axis․tooltip
     * @memberof Options
     * @type {boolean}
     * @default false
     * @property {object} axis Axis object
     * @property {boolean} [axis.tooltip=false] Show tooltip or not.
     * @property {string|object} [axis.tooltip.backgroundColor] Set axis tooltip text background colors.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.AxisTooltip)
     * @example
     * axis: {
     *     tooltip: true, // default background color is
     *
     *     // set backgound color for axis tooltip texts
     *     tooltip: {
     *          backgroundColor: "red",
     *
     *          // set differenct backround colors per axes
     *          // NOTE: In this case, only specified axes tooltip will appear.
     *          backgroundColor: {
     *               x: "green",
     *               y: "yellow",
     *               y2: "red"
     *          }
     *     }
     * }
     */
    axis_tooltip: false }, x), y), y2);

var optGrid = {
    /**
     * Set related options
     * @name grid
     * @memberof Options
     * @type {object}
     * @property {boolean} [front=false] Set 'grid & focus lines' to be positioned over grid lines and chart elements.
     * @property {object} x Grid x object
     * @property {boolean} [x.show=false] Show grids along x axis.
     * @property {Array} [x.lines=[]] Show additional grid lines along x axis.<br>
     *  This option accepts array including object that has value, text, position and class. text, position and class are optional. For position, start, middle and end (default) are available.
     *  If x axis is category axis, value can be category name. If x axis is timeseries axis, value can be date string, Date object and unixtime integer.
     * @property {object} y Grid y object
     * @property {boolean} [y.show=false] Show grids along x axis.
     * @property {Array} [y.lines=[]] Show additional grid lines along y axis.<br>
     *  This option accepts array including object that has value, text, position and class.
     * @property {number} [y.ticks=undefined] Number of y grids to be shown.
     * @property {object} focus Grid focus object
     * @property {boolean} [focus.edge=false] Show edged focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
     * @property {boolean} [focus.show=true] Show grid line when focus.
     * @property {boolean} [focus.y=false] Show y coordinate focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
     * @property {object} lines Grid lines object
     * @property {boolean} [lines.front=true] Set grid lines to be positioned over chart elements.
     * @default undefined
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Grid.GridLines)
     * @see [Demo: X Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalXGridLines)
     * @see [Demo: Y Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalYGridLines)
     * @example
     * grid: {
     *   x: {
     *     show: true,
     *     lines: [
     *       {value: 2, text: "Label on 2"},
     *       {value: 5, text: "Label on 5", class: "label-5"},
     *       {value: 6, text: "Label on 6", position: "start"}
     *     ]
     *   },
     *   y: {
     *     show: true,
     *     lines: [
     *       {value: 100, text: "Label on 100"},
     *       {value: 200, text: "Label on 200", class: "label-200"},
     *       {value: 300, text: "Label on 300", position: 'middle'}
     *     ],
     *     ticks: 5
     *   },
     *   front: true,
     *   focus: {
     *      show: false,
     *
     *      // Below options are available when 'tooltip.grouped=false' option is set
     *      edge: true,
     *      y: true
     *   },
     *   lines: {
     *      front: false
     *   }
     * }
     */
    grid_x_show: false,
    grid_x_type: "tick",
    grid_x_lines: [],
    grid_y_show: false,
    grid_y_lines: [],
    grid_y_ticks: undefined,
    grid_focus_edge: false,
    grid_focus_show: true,
    grid_focus_y: false,
    grid_front: false,
    grid_lines_front: true
};

/**
 * Axis based chart data config options
 */
var optDataAxis = {
    /**
     * Specify the keys of the x values for each data.<br><br>
     * This option can be used if we want to show the data that has different x values.
     * @name data․xs
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   xs: {
     *      data1: "x1",
     *      data2: "x2"
     *   }
     * }
     */
    data_xs: {},
    /**
     * Set a format specifier to parse string specifed as x.
     * @name data․xFormat
     * @memberof Options
     * @type {string}
     * @default %Y-%m-%d
     * @example
     * data: {
     *    x: "x",
     *    columns: [
     *        ["x", "01012019", "02012019", "03012019"],
     *        ["data1", 30, 200, 100]
     *    ],
     *    // Format specifier to parse as datetime for given 'x' string value
     *    xFormat: "%m%d%Y"
     * },
     * axis: {
     *    x: {
     *        type: "timeseries"
     *    }
     * }
     * @see [D3's time specifier](https://d3js.org/d3-time-format#locale_format)
     */
    data_xFormat: "%Y-%m-%d",
    /**
     * Set localtime format to parse x axis.
     * @name data․xLocaltime
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * data: {
     *   xLocaltime: false
     * }
     */
    data_xLocaltime: true,
    /**
     * Sort on x axis.
     * - **NOTE:** This option works for lineish(area/line/spline/step) types only.
     * @name data․xSort
     * @memberof Options
     * @type {boolean}
     * @default true
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataXSort)
     * @example
     * data: {
     *   xSort: false,
     *   x: "x",
     *   columns: [
     *     // The line graph will start to be drawn following the x axis sequence
     *     // Below data, wil start drawing x=1: 200, x=2: 300, x=3: 100
     *     ["x", 3, 1, 2],
     *     ["data1", 100, 200, 300]
     *   ]
     * }
     */
    data_xSort: true,
    /**
     * Set y axis the data related to. y and y2 can be used.
     * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
     * @name data․axes
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   axes: {
     *     data1: "y",
     *     data2: "y2"
     *   }
     * }
     */
    data_axes: {},
    /**
     * Define regions for each data.<br>
     * The values must be an array for each data and it should include an object that has `start`, `end` and `style`.
     * - The object type should be as:
     *   - start {number}: Start data point number. If not set, the start will be the first data point.
     *   - [end] {number}: End data point number. If not set, the end will be the last data point.
     *   - [style.dasharray="2 2"] {string}: The first number specifies a distance for the filled area, and the second a distance for the unfilled area.
     * - **NOTE:**
     *   - Supports only line type.
     *   - `start` and `end` values should be in the exact x value range.
     *   - Dashes will be applied using `stroke-dasharray` css property when data doesn't contain nullish value(or nullish value with `line.connectNull=true` set).
     *   - Dashes will be applied via path command when data contains nullish value.
     * @name data․regions
     * @memberof Options
     * @type {object}
     * @default {}
     * @example
     * data: {
     *   regions: {
     *     data1: [{
     *         start: 1,
     *         end: 2,
     *         style: {
     *             dasharray: "5 2"
     *         }
     *     }, {
     *         start: 3
     *     }],
     *     ...
     *   }
     * }
     */
    data_regions: {},
    /**
     * Set the stacking to be normalized
     * - **NOTE:**
     *   - For stacking, '[data.groups](#.data%25E2%2580%25A4groups)' option should be set
     *   - y Axis will be set in percentage value (0 ~ 100%)
     *   - Must have postive values
     * @name data․stack․normalize
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataStackNormalized)
     * @example
     * data: {
     *   stack: {
     *      normalize: true
     *   }
     * }
     */
    data_stack_normalize: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Modules exports for Axis based chart
 */
// Chart
var api = [
    apiAxis,
    apiCategory,
    apiFlow,
    apiGrid,
    apiGroup,
    apiRegion,
    apiX
];
var internal = {
    axis: axis,
    clip: clip,
    eventrect: eventrect,
    flow: flow,
    grid: grid,
    region: region,
    sizeAxis: sizeAxis
};
var options = {
    optDataAxis: optDataAxis,
    optAxis: optAxis,
    optGrid: optGrid
};

/**
 * Get radius functions
 * @param {number} expandRate Expand rate number.
 *   - If 0, means for "normal" radius.
 *   - If > 0, means for "expanded" radius.
 * @returns {object} radius functions
 * @private
 */
function getRadiusFn(expandRate) {
    if (expandRate === void 0) { expandRate = 0; }
    var $$ = this;
    var config = $$.config, state = $$.state;
    var hasMultiArcGauge = $$.hasMultiArcGauge();
    var singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
    var expandWidth = expandRate ?
        (Math.min(state.radiusExpanded * expandRate - state.radius, singleArcWidth * 0.8 - (1 - expandRate) * 100)) :
        0;
    return {
        /**
         * Getter of arc innerRadius value
         * @param {IArcData} d Data object
         * @returns {number} innerRadius value
         * @private
         */
        inner: function (d) {
            var innerRadius = $$.getRadius(d).innerRadius;
            return hasMultiArcGauge ?
                state.radius - singleArcWidth * (d.index + 1) :
                isNumber(innerRadius) ?
                    innerRadius :
                    0;
        },
        /**
         * Getter of arc outerRadius value
         * @param {IArcData} d Data object
         * @returns {number} outerRadius value
         * @private
         */
        outer: function (d) {
            var outerRadius = $$.getRadius(d).outerRadius;
            var radius;
            if (hasMultiArcGauge) {
                radius = state.radius - singleArcWidth * d.index + expandWidth;
            }
            else if ($$.hasType("polar") && !expandRate) {
                radius = $$.getPolarOuterRadius(d, outerRadius);
            }
            else {
                radius = outerRadius;
                if (expandRate) {
                    var radiusExpanded = state.radiusExpanded;
                    if (state.radius !== outerRadius) {
                        radiusExpanded -= Math.abs(state.radius - outerRadius);
                    }
                    radius = radiusExpanded * expandRate;
                }
            }
            return radius;
        },
        /**
         * Getter of arc cornerRadius value
         * @param {IArcData} d Data object
         * @param {number} outerRadius outer radius value
         * @returns {number} cornerRadius value
         * @private
         */
        corner: function (d, outerRadius) {
            var _a = config.arc_cornerRadius_ratio, ratio = _a === void 0 ? 0 : _a, _b = config.arc_cornerRadius, cornerRadius = _b === void 0 ? 0 : _b;
            var id = d.data.id, value = d.value;
            var corner = 0;
            if (ratio) {
                corner = ratio * outerRadius;
            }
            else {
                corner = isNumber(cornerRadius) ?
                    cornerRadius :
                    cornerRadius.call($$.api, id, value, outerRadius);
            }
            return corner;
        }
    };
}
/**
 * Get attrTween function to get interpolated value on transition
 * @param {Function} fn Arc function to execute
 * @returns {Function} attrTween function
 * @private
 */
function getAttrTweenFn(fn) {
    return function (d) {
        var getAngleKeyValue = function (_a) {
            var _b = _a.startAngle, startAngle = _b === void 0 ? 0 : _b, _c = _a.endAngle, endAngle = _c === void 0 ? 0 : _c, _d = _a.padAngle, padAngle = _d === void 0 ? 0 : _d;
            return ({
                startAngle: startAngle,
                endAngle: endAngle,
                padAngle: padAngle
            });
        };
        // d3.interpolate interpolates id value, if id is given as color string(ex. gold, silver, etc)
        // to avoid unexpected behavior, interpolate only angle values
        // https://github.com/naver/billboard.js/issues/3321
        var interpolate$1 = interpolate(getAngleKeyValue(this._current), getAngleKeyValue(d));
        this._current = d;
        return function (t) {
            var interpolated = interpolate$1(t);
            var data = d.data, index = d.index, value = d.value;
            return fn(__assign(__assign({}, interpolated), { data: data, index: index, value: value }));
        };
    };
}
var shapeArc = {
    initPie: function () {
        var $$ = this;
        var config = $$.config;
        var dataType = config.data_type;
        var padding = config["".concat(dataType, "_padding")];
        var startingAngle = config["".concat(dataType, "_startingAngle")] || 0;
        var padAngle = (padding ? padding * 0.01 : config["".concat(dataType, "_padAngle")]) || 0;
        $$.pie = pie$1()
            .startAngle(startingAngle)
            .endAngle(startingAngle + (2 * Math.PI))
            .padAngle(padAngle)
            .value(function (d) { var _a, _b; return (_b = (_a = d.values) === null || _a === void 0 ? void 0 : _a.reduce(function (a, b) { return a + b.value; }, 0)) !== null && _b !== void 0 ? _b : d; })
            .sort($$.getSortCompareFn.bind($$)(true));
    },
    updateRadius: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var dataType = config.data_type;
        var padding = config["".concat(dataType, "_padding")];
        var w = config.gauge_width || config.donut_width;
        var gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length *
            config.gauge_arcs_minWidth;
        // determine radius
        state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * ($$.hasMultiArcGauge() && config.gauge_label_show ? 0.85 : 1);
        state.radius = state.radiusExpanded * 0.95;
        state.innerRadiusRatio = w ? (state.radius - w) / state.radius : 0.6;
        state.gaugeArcWidth = w || (gaugeArcWidth <= state.radius - state.innerRadius ?
            state.radius - state.innerRadius :
            (gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius));
        var innerRadius = config.pie_innerRadius || (padding ? padding * (state.innerRadiusRatio + 0.1) : 0);
        // NOTE: inner/outerRadius can be an object by user setting, only for 'pie' type
        state.outerRadius = config.pie_outerRadius;
        state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ?
            state.radius * state.innerRadiusRatio :
            innerRadius;
    },
    /**
     * Get pie's inner & outer radius value
     * @param {object|undefined} d Data object
     * @returns {object}
     * @private
     */
    getRadius: function (d) {
        var $$ = this;
        var data = d === null || d === void 0 ? void 0 : d.data;
        var _a = $$.state, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius;
        if (!isNumber(innerRadius) && data) {
            innerRadius = innerRadius[data.id] || 0;
        }
        if (isObject(outerRadius) && data && data.id in outerRadius) {
            outerRadius = outerRadius[data.id];
        }
        else if (!isNumber(outerRadius)) {
            outerRadius = $$.state.radius;
        }
        return { innerRadius: innerRadius, outerRadius: outerRadius };
    },
    updateArc: function () {
        var $$ = this;
        $$.updateRadius();
        $$.svgArc = $$.getSvgArc();
        $$.svgArcExpanded = $$.getSvgArcExpanded();
    },
    getArcLength: function () {
        var $$ = this;
        var config = $$.config;
        var arcLengthInPercent = config.gauge_arcLength * 3.6;
        var len = 2 * (arcLengthInPercent / 360);
        if (arcLengthInPercent < -360) {
            len = -2;
        }
        else if (arcLengthInPercent > 360) {
            len = 2;
        }
        return len * Math.PI;
    },
    getStartingAngle: function () {
        var $$ = this;
        var config = $$.config;
        var dataType = config.data_type;
        var isFullCircle = $$.hasType("gauge") ? config.gauge_fullCircle : false;
        var defaultStartAngle = -1 * Math.PI / 2;
        var defaultEndAngle = Math.PI / 2;
        var startAngle = config["".concat(dataType, "_startingAngle")] || 0;
        if (!isFullCircle && startAngle <= defaultStartAngle) {
            startAngle = defaultStartAngle;
        }
        else if (!isFullCircle && startAngle >= defaultEndAngle) {
            startAngle = defaultEndAngle;
        }
        else if (startAngle > Math.PI || startAngle < -1 * Math.PI) {
            startAngle = Math.PI;
        }
        return startAngle;
    },
    /**
     * Update angle data
     * @param {object} dValue Data object
     * @param {boolean} forRange Weather is for ranged text option(arc.rangeText.values)
     * @returns {object|null} Updated angle data
     * @private
     */
    updateAngle: function (dValue, forRange) {
        var _a;
        if (forRange === void 0) { forRange = false; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var hasGauge = forRange && $$.hasType("gauge");
        // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
        // const totalSum = $$.getTotalDataSum(state.rendered);
        var pie = $$.pie;
        var d = dValue;
        var found = false;
        if (!config) {
            return null;
        }
        var gStart = $$.getStartingAngle();
        var radius = config.gauge_fullCircle || (forRange && !hasGauge) ?
            $$.getArcLength() :
            gStart * -2;
        if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
            var gMin = config.gauge_min, gMax = config.gauge_max;
            // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
            var totalSum = $$.getTotalDataSum(state.rendered);
            // https://github.com/naver/billboard.js/issues/2123
            var gEnd = radius * ((totalSum - gMin) / (gMax - gMin));
            pie = pie
                .startAngle(gStart)
                .endAngle(gEnd + gStart);
        }
        if (forRange === false) {
            pie($$.filterTargetsToShow())
                .forEach(function (t, i) {
                var _a;
                if (!found && t.data.id === ((_a = d.data) === null || _a === void 0 ? void 0 : _a.id)) {
                    found = true;
                    d = t;
                    d.index = i;
                }
            });
        }
        if (isNaN(d.startAngle)) {
            d.startAngle = 0;
        }
        if (isNaN(d.endAngle)) {
            d.endAngle = d.startAngle;
        }
        if (forRange || (d.data && (config.gauge_enforceMinMax || $$.hasMultiArcGauge()))) {
            var gMin = config.gauge_min, gMax = config.gauge_max;
            var max = forRange && !hasGauge ? $$.getTotalDataSum(state.rendered) : gMax;
            var gTic = radius / (max - gMin);
            var value = (_a = d.value) !== null && _a !== void 0 ? _a : 0;
            var gValue = value < gMin ? 0 : value < max ? value - gMin : (max - gMin);
            d.startAngle = gStart;
            d.endAngle = gStart + gTic * gValue;
        }
        return found || forRange ? d : null;
    },
    getSvgArc: function () {
        var $$ = this;
        var _a = getRadiusFn.call($$), inner = _a.inner, outer = _a.outer, corner = _a.corner;
        var arc$1 = arc()
            .innerRadius(inner)
            .outerRadius(outer);
        var newArc = function (d, withoutUpdate) {
            var _a;
            var path = "M 0 0";
            if (d.value || d.data) {
                var data = withoutUpdate ? d : (_a = $$.updateAngle(d)) !== null && _a !== void 0 ? _a : null;
                if (data) {
                    path = arc$1.cornerRadius(corner(data, outer(data)))(data);
                }
            }
            return path;
        };
        // TODO: extends all function
        newArc.centroid = arc$1.centroid;
        return newArc;
    },
    /**
     * Get expanded arc path function
     * @param {number} rate Expand rate
     * @returns {Function} Expanded arc path getter function
     * @private
     */
    getSvgArcExpanded: function (rate) {
        if (rate === void 0) { rate = 1; }
        var $$ = this;
        var _a = getRadiusFn.call($$, rate), inner = _a.inner, outer = _a.outer, corner = _a.corner;
        var arc$1 = arc()
            .innerRadius(inner)
            .outerRadius(outer);
        return function (d) {
            var updated = $$.updateAngle(d);
            var outerR = outer(updated);
            var cornerR = 0;
            if (updated) {
                cornerR = corner(updated, outerR);
            }
            return updated ? arc$1.cornerRadius(cornerR)(updated) : "M 0 0";
        };
    },
    getArc: function (d, withoutUpdate, force) {
        return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
    },
    /**
     * Render range value text
     * @private
     */
    redrawArcRangeText: function () {
        var $$ = this;
        var config = $$.config, arcs = $$.$el.arcs, state = $$.state, $T = $$.$T;
        var format = config.arc_rangeText_format;
        var fixed = $$.hasType("gauge") && config.arc_rangeText_fixed;
        var values = config.arc_rangeText_values;
        if (values === null || values === void 0 ? void 0 : values.length) {
            var isPercent_1 = config.arc_rangeText_unit === "%";
            var totalSum_1 = $$.getTotalDataSum(state.rendered);
            if (isPercent_1) {
                values = values.map(function (v) { return totalSum_1 / 100 * v; });
            }
            var pieData_1 = $$.pie(values).map(function (d, i) { return ((d.index = i), d); });
            var rangeText = arcs.selectAll(".".concat($ARC.arcRange))
                .data(values);
            rangeText.exit();
            rangeText = $T(rangeText.enter()
                .append("text")
                .attr("class", $ARC.arcRange)
                .style("text-anchor", "middle")
                .style("pointer-events", "none")
                .style("opacity", "0")
                .text(function (v) {
                var range = isPercent_1 ? (v / totalSum_1 * 100) : v;
                return isFunction(format) ? format(range) : ("".concat(range).concat(isPercent_1 ? "%" : ""));
            })
                .merge(rangeText));
            if ((!state.rendered || (state.rendered && !fixed)) && totalSum_1 > 0) {
                rangeText.attr("transform", function (d, i) { return $$.transformForArcLabel(pieData_1[i], true); });
            }
            rangeText.style("opacity", function (d) { return (!fixed && (d > totalSum_1 || totalSum_1 === 0) ? "0" : null); });
        }
    },
    /**
     * Set transform attributes to arc label text
     * @param {object} d Data object
     * @param {boolean} forRange Weather is for ranged text option(arc.rangeText.values)
     * @returns {string} Translate attribute string
     * @private
     */
    transformForArcLabel: function (d, forRange) {
        var _a, _b, _c;
        if (forRange === void 0) { forRange = false; }
        var $$ = this;
        var config = $$.config, radiusExpanded = $$.state.radiusExpanded;
        var updated = $$.updateAngle(d, forRange);
        var translate = "";
        if (updated) {
            if (forRange || $$.hasMultiArcGauge()) {
                var y1 = Math.sin(updated.endAngle - Math.PI / 2);
                var rangeTextPosition = config.arc_rangeText_position;
                var x = Math.cos(updated.endAngle - Math.PI / 2) *
                    (radiusExpanded + (forRange ? 5 : 25));
                var y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;
                if (forRange && rangeTextPosition) {
                    var rangeValues = config.arc_rangeText_values;
                    var pos = isFunction(rangeTextPosition) ?
                        rangeTextPosition(rangeValues[d.index]) :
                        rangeTextPosition;
                    x += (_a = pos === null || pos === void 0 ? void 0 : pos.x) !== null && _a !== void 0 ? _a : 0;
                    y += (_b = pos === null || pos === void 0 ? void 0 : pos.y) !== null && _b !== void 0 ? _b : 0;
                }
                translate = "translate(".concat(x, ",").concat(y, ")");
            }
            else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
                var outerRadius = $$.getRadius(d).outerRadius;
                if ($$.hasType("polar")) {
                    outerRadius = $$.getPolarOuterRadius(d, outerRadius);
                }
                var c = this.svgArc.centroid(updated);
                var _d = c.map(function (v) { return (isNaN(v) ? 0 : v); }), x = _d[0], y = _d[1];
                var h = Math.sqrt(x * x + y * y);
                var ratio = (_c = ["donut", "gauge", "pie", "polar"]
                    .filter($$.hasType.bind($$))
                    .map(function (v) { return config["".concat(v, "_label_ratio")]; })) === null || _c === void 0 ? void 0 : _c[0];
                if (ratio) {
                    ratio = isFunction(ratio) ? ratio.bind($$.api)(d, outerRadius, h) : ratio;
                }
                else {
                    ratio = outerRadius && (h ?
                        (36 / outerRadius > 0.375 ? 1.175 - 36 / outerRadius : 0.8) *
                            outerRadius / h :
                        0);
                }
                translate = "translate(".concat(x * ratio, ",").concat(y * ratio, ")");
            }
        }
        return translate;
    },
    convertToArcData: function (d) {
        return this.addName({
            id: "data" in d ? d.data.id : d.id,
            value: d.value,
            ratio: this.getRatio("arc", d),
            index: d.index
        });
    },
    textForArcLabel: function (selection) {
        var $$ = this;
        var hasGauge = $$.hasType("gauge");
        if ($$.shouldShowArcLabel()) {
            selection
                .style("fill", $$.updateTextColor.bind($$))
                .attr("filter", function (d) {
                return $$.updateTextBGColor.bind($$)(d, $$.config.data_labels_backgroundColors);
            })
                .each(function (d) {
                var _a;
                var node = select(this);
                var updated = $$.updateAngle(d);
                var ratio = $$.getRatio("arc", updated);
                var isUnderThreshold = $$.meetsLabelThreshold(ratio, (_a = ["donut", "gauge", "pie", "polar"].filter($$.hasType.bind($$))) === null || _a === void 0 ? void 0 : _a[0]);
                if (isUnderThreshold) {
                    var value = (updated || d).value;
                    var text = ($$.getArcLabelFormat() || $$.defaultArcValueFormat)(value, ratio, d.data.id).toString();
                    setTextValue(node, text, [-1, 1], hasGauge);
                }
                else {
                    node.text("");
                }
            });
        }
    },
    expandArc: function (targetIds) {
        var $$ = this;
        var transiting = $$.state.transiting, $el = $$.$el;
        // MEMO: avoid to cancel transition
        if (transiting) {
            var interval_1 = setInterval(function () {
                if (!transiting) {
                    clearInterval(interval_1);
                    $el.legend.selectAll(".".concat($FOCUS.legendItemFocused)).size() > 0 &&
                        $$.expandArc(targetIds);
                }
            }, 10);
            return;
        }
        var newTargetIds = $$.mapToTargetIds(targetIds);
        $el.svg.selectAll($$.selectorTargets(newTargetIds, ".".concat($ARC.chartArc)))
            .each(function (d) {
            if (!$$.shouldExpand(d.data.id)) {
                return;
            }
            var expandDuration = $$.getExpandConfig(d.data.id, "duration");
            var svgArcExpandedSub = $$.getSvgArcExpanded($$.getExpandConfig(d.data.id, "rate"));
            select(this).selectAll("path")
                // @ts-ignore
                .transition()
                .duration(expandDuration)
                .attrTween("d", getAttrTweenFn($$.svgArcExpanded.bind($$)))
                .transition()
                .duration(expandDuration * 2)
                .attrTween("d", getAttrTweenFn(svgArcExpandedSub.bind($$)));
        });
    },
    unexpandArc: function (targetIds) {
        var $$ = this;
        var transiting = $$.state.transiting, svg = $$.$el.svg;
        if (transiting) {
            return;
        }
        var newTargetIds = $$.mapToTargetIds(targetIds);
        svg.selectAll($$.selectorTargets(newTargetIds, ".".concat($ARC.chartArc)))
            .selectAll("path")
            .transition()
            .duration(function (d) { return $$.getExpandConfig(d.data.id, "duration"); })
            .attrTween("d", getAttrTweenFn($$.svgArc.bind($$)));
        svg.selectAll("".concat($ARC.arc))
            .style("opacity", null);
    },
    /**
     * Get expand config value
     * @param {string} id data ID
     * @param {string} key config key: 'duration | rate'
     * @returns {number}
     * @private
     */
    getExpandConfig: function (id, key) {
        var $$ = this;
        var config = $$.config;
        var def = {
            duration: 50,
            rate: 0.98
        };
        var type;
        if ($$.isDonutType(id)) {
            type = "donut";
        }
        else if ($$.isGaugeType(id)) {
            type = "gauge";
        }
        else if ($$.isPieType(id)) {
            type = "pie";
        }
        return type ? config["".concat(type, "_expand_").concat(key)] : def[key];
    },
    shouldExpand: function (id) {
        var $$ = this;
        var config = $$.config;
        return ($$.isDonutType(id) && config.donut_expand) ||
            ($$.isGaugeType(id) && config.gauge_expand) ||
            ($$.isPieType(id) && config.pie_expand);
    },
    shouldShowArcLabel: function () {
        var $$ = this;
        var config = $$.config;
        return ["donut", "gauge", "pie", "polar"]
            .some(function (v) { return $$.hasType(v) && config["".concat(v, "_label_show")]; });
    },
    getArcLabelFormat: function () {
        var $$ = this;
        var config = $$.config;
        var format = function (v) { return v; };
        ["donut", "gauge", "pie", "polar"]
            .filter($$.hasType.bind($$))
            .forEach(function (v) {
            format = config["".concat(v, "_label_format")];
        });
        return isFunction(format) ? format.bind($$.api) : format;
    },
    updateTargetsForArc: function (targets) {
        var $$ = this;
        var $el = $$.$el;
        var hasGauge = $$.hasType("gauge");
        var classChartArc = $$.getChartClass("Arc");
        var classArcs = $$.getClass("arcs", true);
        var classFocus = $$.classFocus.bind($$);
        var chartArcs = $el.main.select(".".concat($ARC.chartArcs));
        var mainPieUpdate = chartArcs
            .selectAll(".".concat($ARC.chartArc))
            .data($$.pie(targets))
            .attr("class", function (d) { return classChartArc(d) + classFocus(d.data); });
        var mainPieEnter = mainPieUpdate.enter().append("g")
            .attr("class", classChartArc)
            .call(this.setCssRule(false, ".".concat($ARC.chartArcs, " text"), [
            "pointer-events:none",
            "text-anchor:middle"
        ]));
        mainPieEnter.append("g")
            .attr("class", classArcs)
            .merge(mainPieUpdate);
        mainPieEnter.append("text")
            .attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em")
            .style("opacity", "0")
            .style("text-anchor", $$.getStylePropValue("middle"))
            .style("pointer-events", $$.getStylePropValue("none"));
        $el.text = chartArcs.selectAll(".".concat($COMMON.target, " text"));
        // MEMO: can not keep same color..., but not bad to update color in redraw
        // mainPieUpdate.exit().remove();
    },
    initArc: function () {
        var $$ = this;
        var $el = $$.$el;
        $el.arcs = $el.main.select(".".concat($COMMON.chart))
            .append("g")
            .attr("class", $ARC.chartArcs)
            .attr("transform", $$.getTranslate("arc"));
        $$.setArcTitle();
    },
    /**
     * Set arc title text
     * @param {string} str Title text
     * @private
     */
    setArcTitle: function (str) {
        var $$ = this;
        var title = str || $$.getArcTitle();
        var hasGauge = $$.hasType("gauge");
        if (title) {
            var className = hasGauge ? $GAUGE.chartArcsGaugeTitle : $ARC.chartArcsTitle;
            var text = $$.$el.arcs.select(".".concat(className));
            if (text.empty()) {
                text = $$.$el.arcs.append("text")
                    .attr("class", className)
                    .style("text-anchor", "middle");
            }
            hasGauge && text.attr("dy", "-0.3em");
            setTextValue(text, title, hasGauge ? undefined : [-0.6, 1.35], true);
        }
    },
    /**
     * Return arc title text
     * @returns {string} Arc title text
     * @private
     */
    getArcTitle: function () {
        var $$ = this;
        var type = ($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge");
        return type ? $$.config["".concat(type, "_title")] : "";
    },
    /**
     * Get arc title text with needle value
     * @returns {string|boolean} When title contains needle template string will return processed string, otherwise false
     * @private
     */
    getArcTitleWithNeedleValue: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var title = $$.getArcTitle();
        if (title && $$.config.arc_needle_show && /{=[A-Z_]+}/.test(title)) {
            var value = state.current.needle;
            if (!isNumber(value)) {
                value = config.arc_needle_value;
            }
            return tplProcess(title, {
                NEEDLE_VALUE: isNumber(value) ? value : 0
            });
        }
        return false;
    },
    redrawArc: function (duration, durationForExit, withTransform) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        var hasInteraction = config.interaction_enabled;
        var isSelectable = hasInteraction && config.data_selection_isselectable;
        var mainArc = main.selectAll(".".concat($ARC.arcs))
            .selectAll(".".concat($ARC.arc))
            .data($$.arcData.bind($$));
        mainArc.exit()
            .transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        mainArc = mainArc.enter()
            .append("path")
            .attr("class", $$.getClass("arc", true))
            .style("fill", function (d) { return $$.color(d.data); })
            .style("cursor", function (d) { var _a; return (((_a = isSelectable === null || isSelectable === void 0 ? void 0 : isSelectable.bind) === null || _a === void 0 ? void 0 : _a.call(isSelectable, $$.api)(d)) ? "pointer" : null); })
            .style("opacity", "0")
            .each(function (d) {
            if ($$.isGaugeType(d.data)) {
                d.startAngle = config.gauge_startingAngle;
                d.endAngle = config.gauge_startingAngle;
            }
            this._current = d;
        })
            .merge(mainArc);
        if ($$.hasType("gauge")) {
            $$.updateGaugeMax();
            $$.hasMultiArcGauge() && $$.redrawArcGaugeLine();
        }
        mainArc
            .attr("transform", function (d) { return (!$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""); })
            .style("opacity", function (d) {
            return d === this._current ? "0" : null;
        })
            .each(function () {
            state.transiting = true;
        })
            .transition()
            .duration(duration)
            .attrTween("d", function (d) {
            var updated = $$.updateAngle(d);
            if (!updated) {
                return function () { return "M 0 0"; };
            }
            if (isNaN(this._current.startAngle)) {
                this._current.startAngle = 0;
            }
            if (isNaN(this._current.endAngle)) {
                this._current.endAngle = this._current.startAngle;
            }
            var interpolate$1 = interpolate(this._current, updated);
            this._current = interpolate$1(0);
            return function (t) {
                var interpolated = interpolate$1(t);
                interpolated.data = d.data; // data.id will be updated by interporator
                return $$.getArc(interpolated, true);
            };
        })
            .attr("transform", withTransform ? "scale(1)" : "")
            .style("fill", function (d) {
            var color;
            if ($$.levelColor) {
                color = $$.levelColor(d.data.values[0].value);
                // update data's color
                config.data_colors[d.data.id] = color;
            }
            else {
                color = $$.color(d.data);
            }
            return color;
        })
            // Where gauge reading color would receive customization.
            .style("opacity", null)
            .call(endall, function () {
            if ($$.levelColor) {
                var path = select(this);
                var d = path.datum(this._current);
                $$.updateLegendItemColor(d.data.id, path.style("fill"));
            }
            state.transiting = false;
            callFn(config.onrendered, $$.api);
        });
        // bind arc events
        hasInteraction && $$.bindArcEvent(mainArc);
        $$.hasType("polar") && $$.redrawPolar();
        $$.hasType("gauge") && $$.redrawBackgroundArcs();
        config.arc_needle_show && $$.redrawNeedle();
        $$.redrawArcText(duration);
        $$.redrawArcRangeText();
    },
    /**
     * Update needle element
     * @private
     */
    redrawNeedle: function () {
        var $$ = this;
        var $el = $$.$el, config = $$.config, _a = $$.state, hiddenTargetIds = _a.hiddenTargetIds, radius = _a.radius;
        var length = (radius - 1) / 100 * config.arc_needle_length;
        var hasDataToShow = hiddenTargetIds.length !== $$.data.targets.length;
        var needle = $$.$el.arcs.select(".".concat($ARC.needle));
        // needle options
        var pathFn = config.arc_needle_path;
        var baseWidth = config.arc_needle_bottom_width / 2;
        var topWidth = config.arc_needle_top_width / 2;
        var topRx = config.arc_needle_top_rx;
        var topRy = config.arc_needle_top_ry;
        var bottomLen = config.arc_needle_bottom_len;
        var bottomRx = config.arc_needle_bottom_rx;
        var bottomRy = config.arc_needle_bottom_ry;
        var needleAngle = $$.getNeedleAngle();
        var updateNeedleValue = function () {
            var title = $$.getArcTitleWithNeedleValue();
            title && $$.setArcTitle(title);
        };
        updateNeedleValue();
        if (needle.empty()) {
            needle = $el.arcs
                .append("path")
                .classed($ARC.needle, true);
            $el.needle = needle;
            /**
             * Function to be exposed as public to facilitate updating needle
             * @param {number} v Value to be updated
             * @param {boolean} updateConfig Weather update config's value
             * @private
             */
            $el.needle.updateHelper = function (v, updateConfig) {
                if (updateConfig === void 0) { updateConfig = false; }
                if ($el.needle.style("display") !== "none") {
                    $$.$T($el.needle)
                        .style("transform", "rotate(".concat($$.getNeedleAngle(v), "deg)"))
                        .call(endall, function () {
                        updateConfig && (config.arc_needle_value = v);
                        updateNeedleValue();
                    });
                }
            };
        }
        if (hasDataToShow) {
            var path = isFunction(pathFn) ?
                pathFn.call($$, length) :
                "M-".concat(baseWidth, " ").concat(bottomLen, " A").concat(bottomRx, " ").concat(bottomRy, " 0 0 0 ").concat(baseWidth, " ").concat(bottomLen, " L").concat(topWidth, " -").concat(length, " A").concat(topRx, " ").concat(topRy, " 0 0 0 -").concat(topWidth, " -").concat(length, " L-").concat(baseWidth, " ").concat(bottomLen, " Z");
            $$.$T(needle)
                .attr("d", path)
                .style("fill", config.arc_needle_color)
                .style("display", null)
                .style("transform", "rotate(".concat(needleAngle, "deg)"));
        }
        else {
            needle.style("display", "none");
        }
    },
    /**
     * Get needle angle value relative given value
     * @param {number} v Value to be calculated angle
     * @returns {number} angle value
     * @private
     */
    getNeedleAngle: function (v) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var arcLength = $$.getArcLength();
        var hasGauge = $$.hasType("gauge");
        var total = $$.getTotalDataSum(true);
        var value = isDefined(v) ? v : config.arc_needle_value;
        var startingAngle = config["".concat(config.data_type, "_startingAngle")] || 0;
        var radian = 0;
        if (!isNumber(value)) {
            value = hasGauge && $$.data.targets.length === 1 ? total : 0;
        }
        state.current.needle = value;
        if (hasGauge) {
            startingAngle = $$.getStartingAngle();
            var radius = config.gauge_fullCircle ? arcLength : startingAngle * -2;
            var min = config.gauge_min, max = config.gauge_max;
            radian = radius * ((value - min) / (max - min));
        }
        else {
            radian = arcLength * (value / total);
        }
        return (startingAngle + radian) * (180 / Math.PI);
    },
    redrawBackgroundArcs: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var isFullCircle = config.gauge_fullCircle;
        var showEmptyTextLabel = $$.filterTargetsToShow($$.data.targets).length === 0 &&
            !!config.data_empty_label_text;
        var startAngle = $$.getStartingAngle();
        var endAngle = isFullCircle ? startAngle + $$.getArcLength() : startAngle * -1;
        var backgroundArc = $$.$el.arcs.select("".concat(hasMultiArcGauge ? "g" : "", ".").concat($ARC.chartArcsBackground));
        if (hasMultiArcGauge) {
            var index_1 = 0;
            backgroundArc = backgroundArc
                .selectAll("path.".concat($ARC.chartArcsBackground))
                .data($$.data.targets);
            backgroundArc.enter()
                .append("path")
                .attr("class", function (d, i) {
                return "".concat($ARC.chartArcsBackground, " ").concat($ARC.chartArcsBackground, "-").concat(i);
            })
                .merge(backgroundArc)
                .style("fill", (config.gauge_background) || null)
                .attr("d", function (_a) {
                var id = _a.id;
                if (showEmptyTextLabel || state.hiddenTargetIds.indexOf(id) >= 0) {
                    return "M 0 0";
                }
                var d = {
                    data: [{ value: config.gauge_max }],
                    startAngle: startAngle,
                    endAngle: endAngle,
                    index: index_1++
                };
                return $$.getArc(d, true, true);
            });
            backgroundArc.exit().remove();
        }
        else {
            backgroundArc.attr("d", showEmptyTextLabel ? "M 0 0" : function () {
                var d = {
                    data: [{ value: config.gauge_max }],
                    startAngle: startAngle,
                    endAngle: endAngle
                };
                return $$.getArc(d, true, true);
            });
        }
    },
    bindArcEvent: function (arc) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isTouch = state.inputType === "touch";
        var isMouse = state.inputType === "mouse";
        // eslint-disable-next-line
        function selectArc(_this, arcData, id) {
            // transitions
            $$.expandArc(id);
            $$.api.focus(id);
            $$.toggleFocusLegend(id, true);
            $$.showTooltip([arcData], _this);
        }
        // eslint-disable-next-line
        function unselectArc(arcData) {
            var id = undefined;
            $$.unexpandArc(id);
            $$.api.revert();
            $$.revertLegend();
            $$.hideTooltip();
        }
        arc
            .on("click", function (event, d, i) {
            var _a;
            var updated = $$.updateAngle(d);
            var arcData;
            if (updated) {
                arcData = $$.convertToArcData(updated);
                (_a = $$.toggleShape) === null || _a === void 0 ? void 0 : _a.call($$, this, arcData, i);
                config.data_onclick.bind($$.api)(arcData, this);
            }
        });
        // mouse events
        if (isMouse) {
            arc
                .on("mouseover", function (event, d) {
                if (state.transiting) { // skip while transiting
                    return;
                }
                state.event = event;
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                var id = (arcData === null || arcData === void 0 ? void 0 : arcData.id) || undefined;
                selectArc(this, arcData, id);
                $$.setOverOut(true, arcData);
            })
                .on("mouseout", function (event, d) {
                if (state.transiting || !config.interaction_onout) { // skip while transiting
                    return;
                }
                state.event = event;
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                unselectArc();
                $$.setOverOut(false, arcData);
            })
                .on("mousemove", function (event, d) {
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                state.event = event;
                $$.showTooltip([arcData], this);
            });
        }
        // touch events
        if (isTouch && $$.hasArcType() && !$$.radars) {
            var getEventArc_1 = function (event) {
                var _a, _b;
                var _c = (_b = (_a = event.changedTouches) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { clientX: 0, clientY: 0 }, clientX = _c.clientX, clientY = _c.clientY;
                var eventArc = select(doc.elementFromPoint(clientX, clientY));
                return eventArc;
            };
            $$.$el.svg
                .on("touchstart touchmove", function (event) {
                if (state.transiting) { // skip while transiting
                    return;
                }
                state.event = event;
                var eventArc = getEventArc_1(event);
                var datum = eventArc.datum();
                var updated = ((datum === null || datum === void 0 ? void 0 : datum.data) && datum.data.id) ? $$.updateAngle(datum) : null;
                var arcData = updated ? $$.convertToArcData(updated) : null;
                var id = (arcData === null || arcData === void 0 ? void 0 : arcData.id) || undefined;
                $$.callOverOutForTouch(arcData);
                isUndefined(id) ? unselectArc() : selectArc(this, arcData, id);
            });
        }
    },
    redrawArcText: function (duration) {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, main = _a.main, arcs = _a.arcs;
        var hasGauge = $$.hasType("gauge");
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var text;
        // for gauge type, update text when has no title & multi data
        if (!(hasGauge && $$.data.targets.length === 1 && config.gauge_title)) {
            text = main.selectAll(".".concat($ARC.chartArc))
                .select("text")
                .style("opacity", "0")
                .attr("class", function (d) { return ($$.isGaugeType(d.data) ? $GAUGE.gaugeValue : null); })
                .call($$.textForArcLabel.bind($$))
                .attr("transform", function (d) { return $$.transformForArcLabel.bind($$)(d); })
                .style("font-size", function (d) { return ($$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ?
                "".concat(Math.round(state.radius / 5), "px") :
                null); })
                .transition()
                .duration(duration)
                .style("opacity", function (d) { return ($$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? null : "0"); });
            hasMultiArcGauge && text.attr("dy", "-.1em");
        }
        main.select(".".concat($ARC.chartArcsTitle))
            .style("opacity", $$.hasType("donut") || hasGauge ? null : "0");
        if (hasGauge) {
            var isFullCircle = config.gauge_fullCircle;
            isFullCircle &&
                (text === null || text === void 0 ? void 0 : text.attr("dy", "".concat(hasMultiArcGauge ? 0 : Math.round(state.radius / 14))));
            if (config.gauge_label_show) {
                arcs.select(".".concat($GAUGE.chartArcsGaugeUnit))
                    .attr("dy", "".concat(isFullCircle ? 1.5 : 0.75, "em"))
                    .text(config.gauge_units);
                arcs.select(".".concat($GAUGE.chartArcsGaugeMin))
                    .attr("dx", "".concat(-1 *
                    (state.innerRadius +
                        ((state.radius - state.innerRadius) / (isFullCircle ? 1 : 2))), "px"))
                    .attr("dy", "1.2em")
                    .text($$.textForGaugeMinMax(config.gauge_min, false));
                // show max text when isn't fullCircle
                !isFullCircle && arcs.select(".".concat($GAUGE.chartArcsGaugeMax))
                    .attr("dx", "".concat(state.innerRadius + ((state.radius - state.innerRadius) / 2), "px"))
                    .attr("dy", "1.2em")
                    .text($$.textForGaugeMinMax(config.gauge_max, true));
            }
        }
    },
    /**
     * Get Arc element by id or index
     * @param {string|number} value id or index of Arc
     * @returns {d3Selection} Arc path element
     * @private
     */
    getArcElementByIdOrIndex: function (value) {
        var $$ = this;
        var arcs = $$.$el.arcs;
        var filterFn = isNumber(value) ? function (d) { return d.index === value; } : function (d) { return d.data.id === value; };
        return arcs === null || arcs === void 0 ? void 0 : arcs.selectAll(".".concat($COMMON.target, " path")).filter(filterFn);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeArea = {
    initArea: function (mainLine) {
        var $$ = this;
        var config = $$.config;
        mainLine
            .insert("g", ".".concat(config.area_front ? $CIRCLE.circles : $LINE.lines))
            .attr("class", $$.getClass("areas", true));
    },
    /**
     * Update area color
     * @param {object} d Data object
     * @returns {string} Color string
     * @private
     */
    updateAreaColor: function (d) {
        var $$ = this;
        return $$.config.area_linearGradient ? $$.getGradienColortUrl(d.id) : $$.color(d);
    },
    /**
     * Generate/Update elements
     * @param {boolean} withTransition Transition for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateArea: function (withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el, $T = $$.$T;
        var $root = isSub ? $el.subchart : $el;
        config.area_linearGradient && $$.updateLinearGradient();
        var area = $root.main.selectAll(".".concat($AREA.areas))
            .selectAll(".".concat($AREA.area))
            .data($$.lineData.bind($$));
        $T(area.exit(), withTransition)
            .style("opacity", "0")
            .remove();
        $root.area = area.enter().append("path")
            .attr("class", $$.getClass("area", true))
            .style("fill", $$.updateAreaColor.bind($$))
            .style("opacity", function () {
            state.orgAreaOpacity = select(this).style("opacity");
            return "0";
        })
            .merge(area);
        area.style("opacity", state.orgAreaOpacity);
        // calculate ratio if grouped data exists
        $$.setRatioForGroupedData($root.area.data());
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawArea: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var area = (isSub ? this.$el.subchart : this.$el).area;
        var orgAreaOpacity = $$.state.orgAreaOpacity;
        return [
            $$.$T(area, withTransition, getRandom())
                .attr("d", drawFn)
                .style("fill", $$.updateAreaColor.bind($$))
                .style("opacity", function (d) { return String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity); })
        ];
    },
    /**
     * Generate area path data
     * @param {object} areaIndices Indices
     * @param {boolean} isSub Weather is sub axis
     * @returns {Function}
     * @private
     */
    generateDrawArea: function (areaIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var lineConnectNull = config.line_connectNull;
        var isRotated = config.axis_rotated;
        var getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        var xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); };
        var value0 = function (d, i) { return ($$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "high") : $$.getShapeYMin(d.id))); };
        var value1 = function (d, i) { return ($$.isGrouped(d.id) ? getPoints(d, i)[1][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "low") : d.value)); };
        return function (d) {
            var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
            var x0 = 0;
            var y0 = 0;
            var path;
            if ($$.isAreaType(d)) {
                var area = area$1();
                area = isRotated ?
                    area.y(xValue)
                        .x0(value0)
                        .x1(value1) :
                    area.x(xValue)
                        .y0(config.area_above ? 0 : (config.area_below ? $$.state.height : value0))
                        .y1(value1);
                if (!lineConnectNull) {
                    area = area.defined(function (d) { return $$.getBaseValue(d) !== null; });
                }
                if ($$.isStepType(d)) {
                    values = $$.convertValuesToStep(values);
                }
                path = area.curve($$.getCurve(d))(values);
            }
            else {
                if (values[0]) {
                    x0 = $$.scale.x(values[0].x);
                    y0 = $$.getYScaleById(d.id)(values[0].value);
                }
                path = isRotated ? "M ".concat(y0, " ").concat(x0) : "M ".concat(x0, " ").concat(y0);
            }
            return path || "M 0 0";
        };
    },
    generateGetAreaPoints: function (areaIndices, isSub) {
        // partial duplication of generateGetBarPoints
        var $$ = this;
        var config = $$.config;
        var x = $$.getShapeX(0, areaIndices, isSub);
        var y = $$.getShapeY(!!isSub);
        var areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = areaOffset(d, i) || y0; // offset is for stacked area chart
            var posX = x(d);
            var value = d.value;
            var posY = y(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && ((value > 0 && posY < y0) || (value < 0 && y0 < posY))) {
                posY = y0;
            }
            // 1 point that marks the area position
            return [
                [posX, offset],
                [posX, posY - (y0 - offset)],
                [posX, posY - (y0 - offset)], // needed for compatibility
                [posX, offset] // needed for compatibility
            ];
        };
    }
};

var shapeBar = {
    initBar: function () {
        var _a = this, $el = _a.$el, config = _a.config, clip = _a.state.clip;
        $el.bar = $el.main.select(".".concat($COMMON.chart));
        $el.bar = config.bar_front ? $el.bar.append("g") : $el.bar.insert("g", ":first-child");
        $el.bar
            .attr("class", $BAR.chartBars)
            .call(this.setCssRule(false, ".".concat($BAR.chartBars), ["pointer-events:none"]));
        // set clip-path attribute when condition meet
        // https://github.com/naver/billboard.js/issues/2421
        if (config.clipPath === false && (config.bar_radius || config.bar_radius_ratio)) {
            $el.bar.attr("clip-path", clip.pathXAxis.replace(/#[^)]*/, "#".concat(clip.id)));
        }
    },
    updateTargetsForBar: function (targets) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var classChartBar = $$.getChartClass("Bar");
        var classBars = $$.getClass("bars", true);
        var classFocus = $$.classFocus.bind($$);
        var isSelectable = config.interaction_enabled && config.data_selection_isselectable;
        if (!$el.bar) {
            $$.initBar();
        }
        var mainBarUpdate = $el.main.select(".".concat($BAR.chartBars))
            .selectAll(".".concat($BAR.chartBar))
            .data(
        // remove
        targets.filter(function (v) { return v.values.some(function (d) { return (isNumber(d.value) || $$.isBarRangeType(d)); }); }))
            .attr("class", function (d) { return classChartBar(d) + classFocus(d); });
        var mainBarEnter = mainBarUpdate.enter().append("g")
            .attr("class", classChartBar)
            .style("opacity", "0")
            .style("pointer-events", $$.getStylePropValue("none"));
        // Bars for each data
        mainBarEnter.append("g")
            .attr("class", classBars)
            .style("cursor", function (d) { var _a; return (((_a = isSelectable === null || isSelectable === void 0 ? void 0 : isSelectable.bind) === null || _a === void 0 ? void 0 : _a.call(isSelectable, $$.api)(d)) ? "pointer" : null); })
            .call($$.setCssRule(true, " .".concat($BAR.bar), ["fill"], $$.color));
    },
    /**
     * Generate/Update elements
     * @param {boolean} withTransition Transition for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateBar: function (withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config, $el = $$.$el, $T = $$.$T;
        var $root = isSub ? $el.subchart : $el;
        var classBar = $$.getClass("bar", true);
        var initialOpacity = $$.initialOpacity.bind($$);
        config.bar_linearGradient && $$.updateLinearGradient();
        var bar = $root.main.selectAll(".".concat($BAR.bars))
            .selectAll(".".concat($BAR.bar))
            .data($$.labelishData.bind($$));
        $T(bar.exit(), withTransition)
            .style("opacity", "0")
            .remove();
        $root.bar = bar.enter().append("path")
            .attr("class", classBar)
            .style("fill", $$.updateBarColor.bind($$))
            .merge(bar)
            .style("opacity", initialOpacity);
        // calculate ratio if grouped data exists
        $$.setRatioForGroupedData($root.bar.data());
    },
    /**
     * Update bar color
     * @param {object} d Data object
     * @returns {string} Color string
     * @private
     */
    updateBarColor: function (d) {
        var $$ = this;
        var fn = $$.getStylePropValue($$.color);
        return $$.config.bar_linearGradient ? $$.getGradienColortUrl(d.id) : (fn ? fn(d) : null);
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned function from .getDrawShape() => .generateDrawBar()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     * @private
     */
    redrawBar: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var bar = (isSub ? $$.$el.subchart : $$.$el).bar;
        return [
            $$.$T(bar, withTransition, getRandom())
                .attr("d", function (d) { return (isNumber(d.value) || $$.isBarRangeType(d)) && drawFn(d); })
                .style("fill", $$.updateBarColor.bind($$))
                .style("clip-path", function (d) { return d.clipPath; })
                .style("opacity", null)
        ];
    },
    /**
     * Generate draw function
     * @param {object} barIndices data order within x axis.
     * barIndices ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
     *
     * When gropus given as:
     *  groups: [
     * 		["data1", "data2"],
     * 		["data3", "data4"]
     * 	],
     *
     * Will be rendered as:
     * 		data1 data3   data1 data3
     * 		data2 data4   data2 data4
     * 		-------------------------
     * 			 0             1
     * @param {boolean} isSub If is for subchart
     * @returns {Function}
     * @private
     */
    generateDrawBar: function (barIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var getPoints = $$.generateGetBarPoints(barIndices, isSub);
        var isRotated = config.axis_rotated;
        var barRadius = config.bar_radius;
        var barRadiusRatio = config.bar_radius_ratio;
        // get the bar radius
        var getRadius = isNumber(barRadius) && barRadius > 0 ? function () { return barRadius; } : (isNumber(barRadiusRatio) ? function (w) { return w * barRadiusRatio; } : null);
        return function (d, i) {
            // 4 points that make a bar
            var points = getPoints(d, i);
            // switch points if axis is rotated, not applicable for sub chart
            var indexX = +isRotated;
            var indexY = +!indexX;
            var isUnderZero = d.value < 0;
            var isInverted = config["axis_".concat($$.axis.getId(d.id), "_inverted")];
            var isNegative = (!isInverted && isUnderZero) || (isInverted && !isUnderZero);
            var pathRadius = ["", ""];
            var isGrouped = $$.isGrouped(d.id);
            var isRadiusData = getRadius && isGrouped ? $$.isStackingRadiusData(d) : false;
            var init = [
                points[0][indexX],
                points[0][indexY]
            ];
            var radius = 0;
            // initialize as null to not set attribute if isn't needed
            d.clipPath = null;
            if (getRadius) {
                var index = isRotated ? indexY : indexX;
                var barW = points[2][index] - points[0][index];
                radius = !isGrouped || isRadiusData ? getRadius(barW) : 0;
                var arc = "a".concat(radius, " ").concat(radius, " ").concat(isNegative ? "1 0 0" : "0 0 1", " ");
                pathRadius[+!isRotated] = "".concat(arc).concat(radius, ",").concat(radius);
                pathRadius[+isRotated] = "".concat(arc).concat([-radius, radius][isRotated ? "sort" : "reverse"]());
                isNegative && pathRadius.reverse();
            }
            var pos = isRotated ?
                points[1][indexX] + (isNegative ? radius : -radius) :
                points[1][indexY] + (isNegative ? -radius : radius);
            // Apply clip-path in case of radius angle surpass the bar shape
            // https://github.com/naver/billboard.js/issues/3903
            if (radius) {
                var clipPath = "";
                if (isRotated) {
                    if (isNegative && init[0] < pos) {
                        clipPath = "0 ".concat(pos - init[0], "px 0 0");
                    }
                    else if (!isNegative && init[0] > pos) {
                        clipPath = "0 0 0 ".concat(init[0] - pos, "px");
                    }
                }
                else {
                    if (isNegative && init[1] > pos) {
                        clipPath = "".concat(init[1] - pos, "px 0 0 0");
                    }
                    else if (!isNegative && init[1] < pos) {
                        clipPath = "0 0 ".concat(pos - init[1], "px 0");
                    }
                }
                if (clipPath) {
                    d.clipPath = "inset(".concat(clipPath, ")");
                }
            }
            // path string data shouldn't be containing new line chars
            // https://github.com/naver/billboard.js/issues/530
            var path = isRotated ?
                "H".concat(pos, " ").concat(pathRadius[0], "V").concat(points[2][indexY] - radius, " ").concat(pathRadius[1], "H").concat(points[3][indexX]) :
                "V".concat(pos, " ").concat(pathRadius[0], "H").concat(points[2][indexX] - radius, " ").concat(pathRadius[1], "V").concat(points[3][indexY]);
            return "M".concat(points[0][indexX], ",").concat(points[0][indexY]).concat(path, "z");
        };
    },
    /**
     * Determine if given stacking bar data is radius type
     * @param {object} d Data row
     * @returns {boolean}
     */
    isStackingRadiusData: function (d) {
        var $$ = this;
        var $el = $$.$el, config = $$.config, data = $$.data, state = $$.state;
        var id = d.id, index = d.index, value = d.value;
        // when the data is hidden, check if has rounded edges
        if (state.hiddenTargetIds.indexOf(id) > -1) {
            var target = $el.bar.filter(function (d) { return d.id === id && d.value === value; });
            return !target.empty() && /a\d+/i.test(target.attr("d"));
        }
        // Find same grouped ids
        var keys = config.data_groups.find(function (v) { return v.indexOf(id) > -1; });
        // Get sorted list
        var sortedList = $$.orderTargets($$.filterTargetsToShow(data.targets.filter($$.isBarType, $$))).filter(function (v) { return keys.indexOf(v.id) > -1; });
        // Get sorted Ids. Filter positive or negative values Ids from given value
        var sortedIds = sortedList
            .map(function (v) {
            return v.values.filter(function (v2) {
                return v2.index === index && (isNumber(value) && value > 0 ? v2.value > 0 : v2.value < 0);
            })[0];
        })
            .filter(Boolean)
            .map(function (v) { return v.id; });
        // If the given id stays in the last position, then radius should be applied.
        return value !== 0 && (sortedIds.indexOf(id) === sortedIds.length - 1);
    },
    /**
     * Generate bar coordinate points data
     * @param {object} barIndices Data order within x axis.
     * @param {boolean} isSub If is for subchart
     * @returns {Array} Array of coordinate points
     * @private
     */
    generateGetBarPoints: function (barIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var axis = isSub ? $$.axis.subX : $$.axis.x;
        var barTargetsNum = $$.getIndicesMax(barIndices) + 1;
        var barW = $$.getBarW("bar", axis, barTargetsNum);
        var barX = $$.getShapeX(barW, barIndices, !!isSub);
        var barY = $$.getShapeY(!!isSub);
        var barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var id = d.id;
            var y0 = yScale.call($$, id, isSub)($$.getShapeYMin(id));
            var offset = barOffset(d, i) || y0; // offset is for stacked bar chart
            var width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
            var isInverted = config["axis_".concat($$.axis.getId(id), "_inverted")];
            var value = d.value;
            var posX = barX(d);
            var posY = barY(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && !isInverted && ((value > 0 && posY < y0) || (value < 0 && y0 < posY))) {
                posY = y0;
            }
            if (!$$.isBarRangeType(d)) {
                posY -= y0 - offset;
            }
            var startPosX = posX + width;
            // 4 points that make a bar
            return [
                [posX, offset],
                [posX, posY],
                [startPosX, posY],
                [startPosX, offset]
            ];
        };
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeBubble = {
    /**
     * Initializer
     * @private
     */
    initBubble: function () {
        var $$ = this;
        var config = $$.config;
        if ($$.hasType("bubble")) {
            config.point_show = true;
            config.point_type = "circle";
        }
    },
    /**
     * Get user agent's computed value
     * @returns {number}
     * @private
     */
    getBaseLength: function () {
        var $$ = this;
        var _a = $$.state, width = _a.width, height = _a.height;
        var cacheKey = KEY.bubbleBaseLength;
        var baseLength = $$.cache.get(cacheKey);
        if (!baseLength) {
            $$.cache.add(cacheKey, baseLength = getMinMax$1("min", [width, height]));
        }
        return baseLength;
    },
    /**
     * Get the radius value for bubble circle
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    getBubbleR: function (d) {
        var $$ = this;
        var maxR = $$.config.bubble_maxR;
        if (isFunction(maxR)) {
            maxR = maxR.bind($$.api)(d);
        }
        else if (!isNumber(maxR)) {
            maxR = ($$.getBaseLength() / ($$.getMaxDataCount() * 2)) + 12;
        }
        var max = getMinMax$1("max", $$.getMinMaxData().max.map(function (d) { return ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "y") : (isObject(d.value) ? d.value.mid : d.value)); }));
        var maxArea = maxR * maxR * Math.PI;
        var area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) *
            (maxArea / max);
        return Math.sqrt(area / Math.PI);
    },
    /**
     * Get bubble dimension data
     * @param {object|Array} d data value
     * @param {string} type - y or z
     * @returns {number}
     * @private
     */
    getBubbleZData: function (d, type) {
        return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
    }
};

var shapeCandlestick = {
    initCandlestick: function () {
        var $el = this.$el;
        $el.candlestick = $el.main.select(".".concat($COMMON.chart))
            // should positioned at the beginning of the shape node to not overlap others
            .append("g")
            .attr("class", $CANDLESTICK.chartCandlesticks);
    },
    /**
     * Update targets by its data
     * called from: ChartInternal.updateTargets()
     * @param {Array} targets Filtered target by type
     * @private
     */
    updateTargetsForCandlestick: function (targets) {
        var $$ = this;
        var $el = $$.$el;
        var classChart = $$.getChartClass("Candlestick");
        if (!$el.candlestick) {
            $$.initCandlestick();
        }
        var mainUpdate = $$.$el.main.select(".".concat($CANDLESTICK.chartCandlesticks))
            .selectAll(".".concat($CANDLESTICK.chartCandlestick))
            .data(targets);
        mainUpdate.enter().append("g")
            .attr("class", classChart)
            .style("pointer-events", "none");
    },
    /**
     * Generate/Update elements
     * @param {boolean} withTransition Transition for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateCandlestick: function (withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var $el = $$.$el, $T = $$.$T;
        var $root = isSub ? $el.subchart : $el;
        var classSetter = $$.getClass("candlestick", true);
        var initialOpacity = $$.initialOpacity.bind($$);
        var candlestick = $root.main.selectAll(".".concat($CANDLESTICK.chartCandlestick))
            .selectAll(".".concat($CANDLESTICK.candlestick))
            .data($$.labelishData.bind($$));
        $T(candlestick.exit(), withTransition)
            .style("opacity", "0")
            .remove();
        var candlestickEnter = candlestick.enter()
            .filter(function (d) { return d.value; })
            .append("g")
            .attr("class", classSetter);
        candlestickEnter.append("line");
        candlestickEnter.append("path");
        $root.candlestick = candlestick.merge(candlestickEnter)
            .style("opacity", initialOpacity);
    },
    /**
     * Get draw function
     * @param {object} indices Indice data
     * @param {boolean} isSub Subchart draw
     * @returns {Function}
     * @private
     */
    generateDrawCandlestick: function (indices, isSub) {
        var $$ = this;
        var config = $$.config;
        var getPoints = $$.generateGetCandlestickPoints(indices, isSub);
        var isRotated = config.axis_rotated;
        var downColor = config.candlestick_color_down;
        return function (d, i, g) {
            var points = getPoints(d, i);
            var value = $$.getCandlestickData(d);
            var isUp = value === null || value === void 0 ? void 0 : value._isUp;
            // switch points if axis is rotated, not applicable for sub chart
            var indexX = +isRotated;
            var indexY = +!indexX;
            if (g.classed) {
                g.classed($CANDLESTICK[isUp ? "valueUp" : "valueDown"], true);
            }
            var path = isRotated ?
                "H".concat(points[1][1], " V").concat(points[1][0], " H").concat(points[0][1]) :
                "V".concat(points[1][1], " H").concat(points[1][0], " V").concat(points[0][1]);
            g.select("path")
                .attr("d", "M".concat(points[0][indexX], ",").concat(points[0][indexY]).concat(path, "z"))
                .style("fill", function (d) {
                var color = isUp ? $$.color(d) : (isObject(downColor) ? downColor[d.id] : downColor);
                return color || $$.color(d);
            });
            // set line position
            var line = g.select("line");
            var pos = isRotated ?
                {
                    x1: points[2][1],
                    x2: points[2][2],
                    y1: points[2][0],
                    y2: points[2][0]
                } :
                {
                    x1: points[2][0],
                    x2: points[2][0],
                    y1: points[2][1],
                    y2: points[2][2]
                };
            for (var x in pos) {
                line.attr(x, pos[x]);
            }
        };
    },
    /**
     * Generate shape drawing points
     * @param {object} indices Indice data
     * @param {boolean} isSub Subchart draw
     * @returns {Function}
     */
    generateGetCandlestickPoints: function (indices, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var axis = isSub ? $$.axis.subX : $$.axis.x;
        var targetsNum = $$.getIndicesMax(indices) + 1;
        var barW = $$.getBarW("candlestick", axis, targetsNum);
        var x = $$.getShapeX(barW, indices, !!isSub);
        var y = $$.getShapeY(!!isSub);
        var shapeOffset = $$.getShapeOffset($$.isBarType, indices, !!isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = shapeOffset(d, i) || y0; // offset is for stacked bar chart
            var width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
            var value = $$.getCandlestickData(d);
            var points;
            if (value && isNumber(value.open) && isNumber(value.close)) {
                var posX = {
                    start: x(d),
                    end: 0
                };
                posX.end = posX.start + width;
                var posY = {
                    start: y(value.open),
                    end: y(value.close)
                };
                var posLine = {
                    x: posX.start + (width / 2),
                    high: y(value.high),
                    low: y(value.low)
                };
                posY.start -= y0 - offset;
                points = [
                    [posX.start, posY.start],
                    [posX.end, posY.end],
                    [posLine.x, posLine.low, posLine.high]
                ];
            }
            else {
                points = [[0, 0], [0, 0], [0, 0, 0]];
            }
            return points;
        };
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawCandlestick: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var $el = $$.$el, $T = $$.$T;
        var candlestick = (isSub ? $el.subchart : $el).candlestick;
        var rand = getRandom(true);
        return [
            candlestick
                .each(function (d, i) {
                var g = $T(select(this), withTransition, rand);
                drawFn(d, i, g);
            })
                .style("opacity", null)
        ];
    },
    /**
     * Get candlestick data as object
     * @param {object} param Data object
     * @param {Array|object} param.value Data value
     * @returns {object|null} Converted data object
     * @private
     */
    getCandlestickData: function (_a) {
        var value = _a.value;
        var d;
        if (isArray(value)) {
            var open_1 = value[0], high = value[1], low = value[2], close_1 = value[3], _b = value[4], volume = _b === void 0 ? false : _b;
            d = { open: open_1, high: high, low: low, close: close_1 };
            if (volume !== false) {
                d.volume = volume;
            }
        }
        else if (isObject(value)) {
            d = __assign({}, value);
        }
        if (d) {
            d._isUp = d.close >= d.open;
        }
        return d || null;
    }
};

/**
 * Get current size value
 * @param {boolean} checkNeck Determine if container width to not be less than neck width
 * @returns {object} size object
 * @private
 */
function getSize(checkNeck) {
    if (checkNeck === void 0) { checkNeck = false; }
    var $$ = this;
    var config = $$.config, _a = $$.state.current, width = _a.width, height = _a.height;
    var padding = $$.getCurrentPadding();
    var size = __assign({ width: width - (padding.left + padding.right), height: height - (config.legend_show ? $$.getLegendHeight() + 10 : 0) -
            (padding.top + padding.bottom) }, padding);
    // determine if container width to not be less than neck width
    if (checkNeck) {
        var _b = getNecklSize.call($$, {
            width: size.width,
            height: size.height
        }), neckWidth = _b.width, neckHeight = _b.height;
        // prevent neck size to not exceeed funnel size
        if (size.width < neckWidth) {
            size.width = neckWidth;
        }
        if (size.height < neckHeight) {
            size.height = neckHeight;
        }
    }
    return size;
}
/**
 * Return neck size in pixels
 * @param {object} current Current size object
 * @returns {object} size object
 * @private
 */
function getNecklSize(current) {
    var _a;
    var $$ = this;
    var config = $$.config;
    var width = config.funnel_neck_width;
    var height = config.funnel_neck_height;
    _a = [width, height].map(function (v, i) {
        var size = v;
        if (isObject(v)) {
            size = current[i ? "height" : "width"] * v.ratio;
        }
        return size;
    }), width = _a[0], height = _a[1];
    return {
        width: width,
        height: height
    };
}
/**
 * Get coordinate points
 * @param {Array} d Data object
 * @returns {Array} Coordinate points
 * @private
 */
function getCoord(d) {
    var $$ = this;
    var _a = getSize.call($$, true), top = _a.top, left = _a.left, width = _a.width;
    var coords = [];
    d.forEach(function (d, i) {
        var ratio = d.ratio;
        var y = i > 0 ? coords[i - 1][2][1] : top;
        // (M)(4) ------------> (1)
        //   ˄                   |
        //   |                   |
        //   |                   ˅
        //  (3) <-------------- (2)
        coords.push(d.coords = [
            [left, y], // M
            [left + width, y], // 1
            [left + width, i > 0 ? ratio + y : ratio + top], // 2
            [left, i > 0 ? ratio + y : ratio + top], // 3
            [left, y] // 4
        ]);
    });
    return coords;
}
/**
 * Get clip path
 * @param {boolean} forBackground Determine if clip path for background
 * @returns {string} path
 * @private
 */
function getClipPath(forBackground) {
    if (forBackground === void 0) { forBackground = false; }
    var $$ = this;
    var _a = getSize.call($$, true), width = _a.width, height = _a.height, top = _a.top, left = _a.left;
    var neck = getNecklSize.call($$, { width: width, height: height });
    var leftX = (width - neck.width) / 2;
    var rightX = (width + neck.width) / 2;
    var bodyHeigth = height - neck.height;
    var coords = [
        [0, 0], // M
        [width, 0], // 1
        [rightX, bodyHeigth], // 2
        [rightX, height], // 3
        [leftX, height], // 4
        [leftX, bodyHeigth], // 5
        [0, 0] // 6
    ];
    if (forBackground) {
        coords.forEach(function (d) {
            d[0] += left;
            d[1] += top;
        });
    }
    return "M".concat(coords.join("L"), "z");
}
/**
 * Get funnel data
 * @param {object} d data object
 * @returns {Array}
 * @private
 */
function getFunnelData(d) {
    var $$ = this;
    var config = $$.config;
    var data = d.map(function (d) { return ({
        id: d.id,
        value: d.values.reduce(function (a, b) { return a + b.value; }, 0)
    }); });
    if (config.data_order) {
        data.sort($$.getSortCompareFn.bind($$)(true));
    }
    return updateRatio.call($$, data);
}
/**
 * Update ratio value
 * @param {Array} data Data object
 * @returns {Array} Updated data object
 * @private
 */
function updateRatio(data) {
    var $$ = this;
    var height = getSize.call($$).height;
    var total = $$.getTotalDataSum(true);
    data.forEach(function (d) {
        // ratio = shape's height
        d.ratio = (d.value / total) * height;
    });
    return data;
}
var shapeFunnel = {
    /**
     * Initialize polar
     * @private
     */
    initFunnel: function () {
        var $$ = this;
        var $el = $$.$el;
        $el.funnel = $el.main.select(".".concat($COMMON.chart))
            .append("g")
            .classed($FUNNEL.chartFunnels, true);
        // define background to prevent shape overflow
        $el.funnel.background = $el.funnel.append("path")
            .classed($FUNNEL.funnelBackground, true);
        $$.bindFunnelEvent();
    },
    /**
     * Bind events
     * @private
     */
    bindFunnelEvent: function () {
        var $$ = this;
        var funnel = $$.$el.funnel, config = $$.config, state = $$.state;
        var getTarget = function (event) {
            var _a;
            var target = event.isTrusted ? event.target : (_a = state.eventReceiver.rect) === null || _a === void 0 ? void 0 : _a.node();
            var data;
            if (/^path$/i.test(target.tagName)) {
                state.event = event;
                data = select(target).datum();
            }
            return data;
        };
        if (config.interaction_enabled) {
            var isTouch = state.inputType === "touch";
            funnel
                .on(isTouch ? "touchstart" : "mouseover mousemove", function (event) {
                var data = getTarget(event);
                if (data) {
                    $$.showTooltip([data], event.target);
                    /^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
                }
            })
                .on(isTouch ? "touchend" : "mouseout", function (event) {
                var data = getTarget(event);
                if (config.interaction_onout) {
                    $$.hideTooltip();
                    $$.setOverOut(false, data);
                }
            });
        }
    },
    /**
     * Update polar based on given data array
     * @param {object} t Data object
     * @private
     */
    updateTargetsForFunnel: function (t) {
        var $$ = this;
        var funnel = $$.$el.funnel;
        var classChartFunnel = $$.getChartClass("Funnel");
        var classFunnel = $$.getClass("funnel", true);
        if (!funnel) {
            $$.initFunnel();
        }
        var targets = getFunnelData.call($$, t.filter($$.isFunnelType.bind($$)));
        var mainFunnelUpdate = funnel
            .selectAll(".".concat($FUNNEL.chartFunnel))
            .data(targets);
        mainFunnelUpdate.exit().remove();
        var mainFunnelEnter = mainFunnelUpdate
            .enter()
            .insert("g", ".".concat($FUNNEL.funnelBackground));
        mainFunnelEnter
            .append("path");
        funnel.path = mainFunnelEnter
            .merge(mainFunnelUpdate)
            .attr("class", function (d) { return classChartFunnel(d); })
            .select("path")
            .attr("class", classFunnel)
            .style("opacity", "0")
            .style("fill", $$.color);
    },
    /**
     * Update funnel path selection
     * @param {object} targets Updated target data
     * @private
     */
    updateFunnel: function (targets) {
        var $$ = this;
        var funnel = $$.$el.funnel;
        var targetIds = targets.map(function (_a) {
            var id = _a.id;
            return id;
        });
        funnel.path = funnel.path.filter(function (d) { return targetIds.indexOf(d.id) >= 0; });
    },
    /**
     * Generate treemap coordinate points data
     * @returns {Array} Array of coordinate points
     * @private
     */
    generateGetFunnelPoints: function () {
        var $$ = this;
        var funnel = $$.$el.funnel;
        var targets = $$.filterTargetsToShow(funnel.path);
        var _a = getSize.call($$), top = _a.top, left = _a.left, right = _a.right;
        var center = (left - right) / 2;
        var points = {};
        var accumulatedHeight = top !== null && top !== void 0 ? top : 0;
        targets.each(function (d, i) {
            var _a;
            points[d.id] = [
                [center, accumulatedHeight],
                [center, accumulatedHeight += ((_a = targets === null || targets === void 0 ? void 0 : targets[i]) !== null && _a !== void 0 ? _a : d).ratio]
            ];
        });
        return function (d) { return points[d.id]; };
    },
    /**
     * Called whenever redraw happens
     * @private
     */
    redrawFunnel: function () {
        var $$ = this;
        var $T = $$.$T, funnel = $$.$el.funnel;
        var targets = $$.filterTargetsToShow(funnel.path);
        var coords = getCoord.call($$, updateRatio.call($$, targets.data()));
        // set neck path
        funnel.attr("clip-path", "path('".concat(getClipPath.bind($$)(), "')"));
        funnel.background.attr("d", getClipPath.call($$, true));
        $T(targets)
            .attr("d", function (d, i) { return "M".concat(coords[i].join("L"), "z"); })
            .style("opacity", "1");
        funnel.selectAll("g").style("opacity", null);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeGauge = {
    initGauge: function () {
        var $$ = this;
        var config = $$.config, arcs = $$.$el.arcs;
        var appendText = function (className, value) {
            if (className === void 0) { className = null; }
            if (value === void 0) { value = ""; }
            arcs.append("text")
                .attr("class", className)
                .style("text-anchor", "middle")
                .style("pointer-events", "none")
                .text(value);
        };
        if ($$.hasType("gauge")) {
            var hasMulti = $$.hasMultiArcGauge();
            arcs.append(hasMulti ? "g" : "path")
                .attr("class", $ARC.chartArcsBackground)
                .style("fill", (!hasMulti && config.gauge_background) || null);
            config.gauge_units && appendText($GAUGE.chartArcsGaugeUnit);
            // append min/max value text
            if (config.gauge_label_show) {
                appendText($GAUGE.chartArcsGaugeMin);
                !config.gauge_fullCircle && appendText($GAUGE.chartArcsGaugeMax);
            }
        }
    },
    updateGaugeMax: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var hasMultiGauge = $$.hasMultiArcGauge();
        // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
        var max = hasMultiGauge ?
            $$.getMinMaxData().max[0].value :
            $$.getTotalDataSum(state.rendered);
        // if gauge_max less than max, make max to max value
        if (!config.gauge_enforceMinMax && (max + config.gauge_min * (config.gauge_min > 0 ? -1 : 1) > config.gauge_max)) {
            config.gauge_max = max - config.gauge_min;
        }
    },
    redrawArcGaugeLine: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var hiddenTargetIds = $$.state.hiddenTargetIds;
        var arcLabelLines = $el.main.selectAll(".".concat($ARC.arcs))
            .selectAll(".".concat($ARC.arcLabelLine))
            .data($$.arcData.bind($$));
        var mainArcLabelLine = arcLabelLines.enter()
            .append("rect")
            .attr("class", function (d) { return "".concat($ARC.arcLabelLine, " ").concat($COMMON.target, " ").concat($COMMON.target, "-").concat(d.data.id); })
            .merge(arcLabelLines);
        mainArcLabelLine
            .style("fill", function (d) { return ($$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data)); })
            .style("display", config.gauge_label_show ? null : "none")
            .each(function (d) {
            var lineLength = 0;
            var lineThickness = 2;
            var x = 0;
            var y = 0;
            var transform = "";
            if (hiddenTargetIds.indexOf(d.data.id) < 0) {
                var updated = $$.updateAngle(d);
                var innerLineLength = state.gaugeArcWidth /
                    $$.filterTargetsToShow($$.data.targets).length *
                    (updated.index + 1);
                var lineAngle = updated.endAngle - Math.PI / 2;
                var arcInnerRadius = state.radius - innerLineLength;
                var linePositioningAngle = lineAngle -
                    (arcInnerRadius === 0 ? 0 : (1 / arcInnerRadius));
                lineLength = state.radiusExpanded - state.radius + innerLineLength;
                x = Math.cos(linePositioningAngle) * arcInnerRadius;
                y = Math.sin(linePositioningAngle) * arcInnerRadius;
                transform = "rotate(".concat(lineAngle * 180 / Math.PI, ", ").concat(x, ", ").concat(y, ")");
            }
            select(this)
                .attr("x", x)
                .attr("y", y)
                .attr("width", lineLength)
                .attr("height", lineThickness)
                .attr("transform", transform)
                .style("stroke-dasharray", "0, ".concat(lineLength + lineThickness, ", 0"));
        });
    },
    textForGaugeMinMax: function (value, isMax) {
        var $$ = this;
        var config = $$.config;
        var format = config.gauge_label_extents;
        return isFunction(format) ? format.bind($$.api)(value, isMax) : value;
    },
    getGaugeLabelHeight: function () {
        var config = this.config;
        return this.config.gauge_label_show && !config.gauge_fullCircle ? 20 : 0;
    },
    getPaddingBottomForGauge: function () {
        var $$ = this;
        return $$.getGaugeLabelHeight() * ($$.config.gauge_label_show ? 2 : 2.5);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get stroke dasharray style value
 * @param {number} start Start position in path length
 * @param {number} end End position in path length
 * @param {Array} pattern Dash array pattern
 * @param {boolean} isLastX Weather is last x tick
 * @returns {object} Stroke dasharray style value and its length
 * @private
 */
function getStrokeDashArray(start, end, pattern, isLastX) {
    if (isLastX === void 0) { isLastX = false; }
    var dash = start ? [start, 0] : pattern;
    var _loop_1 = function (i) {
        pattern.forEach(function (v) {
            if (i + v <= end) {
                dash.push(v);
            }
            i += v;
        });
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = start ? start : pattern.reduce(function (a, c) { return a + c; }); i <= end;) {
        _loop_1(i);
        i = out_i_1;
    }
    // make sure to have even length
    dash.length % 2 !== 0 && dash.push(isLastX ? pattern[1] : 0);
    return {
        dash: dash.join(" "),
        length: dash.reduce(function (a, b) { return a + b; }, 0)
    };
}
/**
 * Get regions data
 * @param {Array} d Data object
 * @param {object} _regions regions to be set
 * @param {boolean} isTimeSeries whether is time series
 * @returns {object} Regions data
 * @private
 */
function getRegions(d, _regions, isTimeSeries) {
    var $$ = this;
    var regions = [];
    var dasharray = "2 2"; // default value
    // Check start/end of regions
    if (isDefined(_regions)) {
        var getValue = function (v, def) { return (isUndefined(v) ? def : (isTimeSeries ? parseDate.call($$, v) : v)); };
        for (var i = 0, reg = void 0; (reg = _regions[i]); i++) {
            var start = getValue(reg.start, d[0].x);
            var end = getValue(reg.end, d[d.length - 1].x);
            var style = reg.style || { dasharray: dasharray };
            regions[i] = { start: start, end: end, style: style };
        }
    }
    return regions;
}
var shapeLine = {
    initLine: function () {
        var $el = this.$el;
        $el.line = $el.main.select(".".concat($COMMON.chart)).append("g")
            .attr("class", $LINE.chartLines)
            .call(this.setCssRule(false, ".".concat($LINE.chartLines), ["pointer-events:none"]));
    },
    updateTargetsForLine: function (t) {
        var $$ = this;
        var _a = $$.$el, area = _a.area, line = _a.line, main = _a.main;
        var classChartLine = $$.getChartClass("Line");
        var classLines = $$.getClass("lines", true);
        var classFocus = $$.classFocus.bind($$);
        if (!line) {
            $$.initLine();
        }
        var targets = t.filter(function (d) { return !($$.isScatterType(d) || $$.isBubbleType(d)); });
        var mainLineUpdate = main.select(".".concat($LINE.chartLines))
            .selectAll(".".concat($LINE.chartLine))
            .data(targets)
            .attr("class", function (d) { return classChartLine(d) + classFocus(d); });
        var mainLineEnter = mainLineUpdate.enter().append("g")
            .attr("class", classChartLine)
            .style("opacity", "0")
            .style("pointer-events", $$.getStylePropValue("none"));
        // Lines for each data
        mainLineEnter.append("g")
            .attr("class", classLines);
        // Areas
        if ($$.hasTypeOf("Area")) {
            var mainLine = (!area && mainLineEnter.empty() ? mainLineUpdate : mainLineEnter).filter($$.isAreaType.bind($$));
            $$.initArea(mainLine);
        }
        $$.updateTargetForCircle(targets, mainLineEnter);
    },
    /**
     * Generate/Update elements
     * @param {boolean} withTransition Transition for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateLine: function (withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var extraLineClasses = $$.format.extraLineClasses, $el = $$.$el, $T = $$.$T;
        var $root = isSub ? $el.subchart : $el;
        var line = $root.main
            .selectAll(".".concat($LINE.lines))
            .selectAll(".".concat($LINE.line))
            .data($$.lineData.bind($$));
        $T(line.exit(), withTransition)
            .style("opacity", "0")
            .remove();
        $root.line = line.enter()
            .append("path")
            .attr("class", function (d) { return "".concat($$.getClass("line", true)(d), " ").concat(extraLineClasses(d) || ""); })
            .style("stroke", $$.color)
            .merge(line)
            .style("opacity", $$.initialOpacity.bind($$))
            .attr("transform", null);
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     * @private
     */
    redrawLine: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var $el = $$.$el, $T = $$.$T;
        var line = (isSub ? $el.subchart : $el).line;
        return [
            $T(line, withTransition, getRandom())
                .attr("d", drawFn)
                .style("stroke", this.color)
                .style("opacity", null)
        ];
    },
    /**
     * Get the curve interpolate
     * @param {Array} d Data object
     * @returns {Function}
     * @private
     */
    getCurve: function (d) {
        var $$ = this;
        var isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);
        // when is step & rotated, should be computed in different way
        // https://github.com/naver/billboard.js/issues/471
        return isRotatedStepType ?
            function (context) {
                var step = $$.getInterpolate(d)(context);
                // keep the original method
                step.orgPoint = step.point;
                // to get rotated path data
                step.pointRotated = function (x, y) {
                    this._point === 1 && (this._point = 2);
                    var y1 = this._y * (1 - this._t) + y * this._t;
                    this._context.lineTo(this._x, y1);
                    this._context.lineTo(x, y1);
                    this._x = x;
                    this._y = y;
                };
                step.point = function (x, y) {
                    this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
                };
                return step;
            } :
            $$.getInterpolate(d);
    },
    generateDrawLine: function (lineIndices, isSub) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var lineConnectNull = config.line_connectNull;
        var isRotated = config.axis_rotated;
        var getPoints = $$.generateGetLinePoints(lineIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        var xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); };
        var yValue = function (d, i) { return ($$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.getBaseValue(d))); };
        var line = line$1();
        line = isRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);
        if (!lineConnectNull) {
            line = line.defined(function (d) { return $$.getBaseValue(d) !== null; });
        }
        var x = isSub ? scale.subX : scale.x;
        return function (d) {
            var y = yScale(d.id, isSub);
            var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
            var x0 = 0;
            var y0 = 0;
            var path;
            if ($$.isLineType(d)) {
                var regions = config.data_regions[d.id];
                if (regions) {
                    path = $$.lineWithRegions(values, scale.zoom || x, y, regions);
                }
                else {
                    if ($$.isStepType(d)) {
                        values = $$.convertValuesToStep(values);
                    }
                    path = line.curve($$.getCurve(d))(values);
                }
            }
            else {
                if (values[0]) {
                    x0 = x(values[0].x);
                    y0 = y(values[0].value);
                }
                path = isRotated ? "M ".concat(y0, " ").concat(x0) : "M ".concat(x0, " ").concat(y0);
            }
            return path || "M 0 0";
        };
    },
    /**
     * Set regions dasharray and get path
     * @param {Array} d Data object
     * @param {Function} x x scale function
     * @param {Function} y y scale function
     * @param {object} _regions regions to be set
     * @returns {stirng} Path string
     * @private
     */
    lineWithRegions: function (d, x, y, _regions) {
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isTimeSeries = $$.axis.isTimeSeries();
        var dasharray = "2 2"; // default value
        var regions = getRegions.bind($$)(d, _regions, isTimeSeries);
        // when contains null data, can't apply style dashed
        var hasNullDataValue = $$.hasNullDataValue(d);
        var xp;
        var yp;
        var diff;
        var diffx2;
        // Set scales
        var xValue = isRotated ? function (dt) { return y(dt.value); } : function (dt) { return x(dt.x); };
        var yValue = isRotated ? function (dt) { return x(dt.x); } : function (dt) { return y(dt.value); };
        // Define svg generator function for region
        var generateM = function (points) {
            return "M".concat(points[0][0], ",").concat(points[0][1], "L").concat(points[1][0], ",").concat(points[1][1]);
        };
        var sWithRegion = isTimeSeries ?
            function (d0, d1, k, timeseriesDiff) {
                var x0 = d0.x.getTime();
                var xDiff = d1.x - d0.x;
                var xv0 = new Date(x0 + xDiff * k);
                var xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));
                var points = isRotated ?
                    [[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] :
                    [[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];
                return generateM(points);
            } :
            function (d0, d1, k, otherDiff) {
                var x0 = x(d1.x, !isRotated);
                var y0 = y(d1.value, isRotated);
                var gap = k + otherDiff;
                var xValue = x(xp(k), !isRotated);
                var yValue = y(yp(k), isRotated);
                var xDiff = x(xp(gap), !isRotated);
                var yDiff = y(yp(gap), isRotated);
                // fix diff values not to overflow
                if (xDiff > x0) {
                    xDiff = x0;
                }
                if (d0.value > d1.value && (isRotated ? yDiff < y0 : yDiff > y0)) {
                    yDiff = y0;
                }
                var points = [
                    [xValue, yValue],
                    [xDiff, yDiff]
                ];
                isRotated && points.forEach(function (v) { return v.reverse(); });
                return generateM(points);
            };
        // Generate
        var axisType = { x: $$.axis.getAxisType("x"), y: $$.axis.getAxisType("y") };
        var path = "";
        // clone the line path to be used to get length value
        var target = $$.$el.line.filter(function (_a) {
            var id = _a.id;
            return id === d[0].id;
        });
        var tempNode = target.clone().style("display", "none");
        var getLength = function (node, path) { return node.attr("d", path).node().getTotalLength(); };
        var dashArray = {
            dash: [],
            lastLength: 0
        };
        var isLastX = false;
        for (var i = 0, data = void 0; (data = d[i]); i++) {
            var prevData = d[i - 1];
            var hasPrevData = prevData && isValue(prevData.value);
            var style = $$.isWithinRegions(data.x, regions);
            // https://github.com/naver/billboard.js/issues/1172
            if (!isValue(data.value)) {
                continue;
            }
            // Draw as normal
            if (isUndefined(regions) || !style || !hasPrevData) {
                path += "".concat(i && hasPrevData ? "L" : "M").concat(xValue(data), ",").concat(yValue(data));
            }
            else if (hasPrevData) {
                style = ((style === null || style === void 0 ? void 0 : style.dasharray) || dasharray).split(" ").map(Number);
                // Draw with region // TODO: Fix for horizotal charts
                xp = getScale(axisType.x, prevData.x, data.x);
                yp = getScale(axisType.y, prevData.value, data.value);
                // when it contains null data, dash can't be applied with style
                if (hasNullDataValue) {
                    var dx = x(data.x) - x(prevData.x);
                    var dy = y(data.value) - y(prevData.value);
                    var dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    diff = style[0] / dd; // dash
                    diffx2 = diff * style[1]; // gap
                    for (var j = diff; j <= 1; j += diffx2) {
                        path += sWithRegion(prevData, data, j, diff);
                        // to make sure correct line drawing
                        if (j + diffx2 >= 1) {
                            path += sWithRegion(prevData, data, 1, 0);
                        }
                    }
                }
                else {
                    var points = [];
                    isLastX = data.x === d[d.length - 1].x;
                    if (isTimeSeries) {
                        var x0 = +prevData.x;
                        var xv0 = new Date(x0);
                        var xv1 = new Date(x0 + (+data.x - x0));
                        points = [
                            [x(xv0), y(yp(0))], // M
                            [x(xv1), y(yp(1))] // L
                        ];
                    }
                    else {
                        points = [
                            [x(xp(0)), y(yp(0))], // M
                            [x(xp(1)), y(yp(1))] // L
                        ];
                    }
                    isRotated && points.forEach(function (v) { return v.reverse(); });
                    var startLength = getLength(tempNode, path);
                    var endLength = getLength(tempNode, path += "L".concat(points[1].join(",")));
                    var strokeDashArray = getStrokeDashArray(startLength - dashArray.lastLength, endLength - dashArray.lastLength, style, isLastX);
                    dashArray.lastLength += strokeDashArray.length;
                    dashArray.dash.push(strokeDashArray.dash);
                }
            }
        }
        if (dashArray.dash.length) {
            // if not last x tick, then should draw rest of path that is not drawed yet
            !isLastX && dashArray.dash.push(getLength(tempNode, path));
            tempNode.remove();
            target.attr("stroke-dasharray", dashArray.dash.join(" "));
        }
        return path;
    },
    isWithinRegions: function (withinX, withinRegions) {
        for (var i = 0, reg = void 0; (reg = withinRegions[i]); i++) {
            if (reg.start < withinX && withinX <= reg.end) {
                return reg.style;
            }
        }
        return false;
    },
    isWithinStep: function (that, y) {
        return Math.abs(y - getPointer(this.state.event, that)[1]) < 30;
    },
    shouldDrawPointsForLine: function (d) {
        var linePoint = this.config.line_point;
        return linePoint === true ||
            (isArray(linePoint) && linePoint.indexOf(d.id) !== -1);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var getTransitionName = function () { return getRandom(); };
var shapePoint = {
    initialOpacityForCircle: function (d) {
        var _a = this, config = _a.config, withoutFadeIn = _a.state.withoutFadeIn;
        var opacity = config.point_opacity;
        if (isUndefined(opacity)) {
            opacity = this.getBaseValue(d) !== null &&
                withoutFadeIn[d.id] ?
                this.opacityForCircle(d) :
                "0";
        }
        return opacity;
    },
    opacityForCircle: function (d) {
        var _a;
        var config = this.config;
        var opacity = config.point_opacity;
        if (isUndefined(opacity)) {
            opacity = config.point_show && !((_a = this.isPointFocusOnly) === null || _a === void 0 ? void 0 : _a.call(this)) ? null : "0";
            opacity = isValue(this.getBaseValue(d)) ?
                (this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity) :
                "0";
        }
        return opacity;
    },
    initCircle: function () {
        var $$ = this;
        var main = $$.$el.main;
        !$$.point && ($$.point = $$.generatePoint());
        if (($$.hasType("bubble") || $$.hasType("scatter")) &&
            main.select(".".concat($COMMON.chart, " > .").concat($CIRCLE.chartCircles)).empty()) {
            main.select(".".concat($COMMON.chart))
                .append("g")
                .attr("class", $CIRCLE.chartCircles);
        }
    },
    updateTargetForCircle: function (targetsValue, enterNodeValue) {
        var _this = this;
        var $$ = this;
        var config = $$.config, data = $$.data, $el = $$.$el;
        var selectionEnabled = config.interaction_enabled && config.data_selection_enabled;
        var isSelectable = selectionEnabled && config.data_selection_isselectable;
        var classCircles = $$.getClass("circles", true);
        if (!config.point_show) {
            return;
        }
        $$.initCircle();
        var targets = targetsValue;
        var enterNode = enterNodeValue;
        // only for scatter & bubble type should generate seprate <g> node
        if (!targets) {
            targets = data.targets
                .filter(function (d) { return _this.isScatterType(d) || _this.isBubbleType(d); });
            var mainCircle = $el.main.select(".".concat($CIRCLE.chartCircles))
                .style("pointer-events", "none")
                .selectAll(".".concat($CIRCLE.circles))
                .data(targets);
            mainCircle.exit().remove();
            enterNode = mainCircle.enter();
        }
        // Circles for each data point on lines
        selectionEnabled && enterNode.append("g")
            .attr("class", function (d) { return $$.generateClass($SELECT.selectedCircles, d.id); });
        enterNode.append("g")
            .attr("class", classCircles)
            .call(function (selection) {
            $$.setCssRule(true, ".".concat($CIRCLE.circles), ["cursor:pointer"], isSelectable)(selection);
            $$.setCssRule(true, " .".concat($CIRCLE.circle), ["fill", "stroke"], $$.color)(selection);
        })
            .style("opacity", function () {
            var parent = select(this.parentNode);
            // if the parent node is .bb-chart-circles (bubble, scatter), initialize <g bb-circles> with opacity "0"
            return parent.attr("class").indexOf($CIRCLE.chartCircles) > -1 ? "0" : null;
        });
        // Update date for selected circles
        selectionEnabled && targets.forEach(function (t) {
            $el.main.selectAll(".".concat($SELECT.selectedCircles).concat($$.getTargetSelectorSuffix(t.id)))
                .selectAll("".concat($SELECT.selectedCircle))
                .each(function (d) {
                d.value = t.values[d.index].value;
            });
        });
    },
    updateCircle: function (isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var focusOnly = $$.isPointFocusOnly();
        var $root = isSub ? $el.subchart : $el;
        if (config.point_show && !state.toggling) {
            config.point_radialGradient && $$.updateLinearGradient();
            var circles = $root.main.selectAll(".".concat($CIRCLE.circles))
                .selectAll(".".concat($CIRCLE.circle))
                .data(function (d) { return (($$.isLineType(d) && $$.shouldDrawPointsForLine(d)) ||
                $$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ?
                (focusOnly ? [d.values[0]] : d.values) :
                []); });
            circles.exit().remove();
            circles.enter()
                .filter(Boolean)
                .append($$.point("create", this, $$.pointR.bind($$), $$.updateCircleColor.bind($$)));
            $root.circle = $root.main.selectAll(".".concat($CIRCLE.circles, " .").concat($CIRCLE.circle))
                .style("stroke", $$.getStylePropValue($$.color))
                .style("opacity", $$.initialOpacityForCircle.bind($$));
        }
    },
    /**
     * Update circle color
     * @param {object} d Data object
     * @returns {string} Color string
     * @private
     */
    updateCircleColor: function (d) {
        var $$ = this;
        var fn = $$.getStylePropValue($$.color);
        return $$.config.point_radialGradient ? $$.getGradienColortUrl(d.id) : (fn ? fn(d) : null);
    },
    redrawCircle: function (cx, cy, withTransition, flow, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var rendered = $$.state.rendered, $el = $$.$el, $T = $$.$T;
        var $root = isSub ? $el.subchart : $el;
        var selectedCircles = $root.main.selectAll(".".concat($SELECT.selectedCircle));
        if (!$$.config.point_show) {
            return [];
        }
        var fn = $$.point("update", $$, cx, cy, $$.updateCircleColor.bind($$), withTransition, flow, selectedCircles);
        var posAttr = $$.isCirclePoint() ? "c" : "";
        var t = getRandom();
        var opacityStyleFn = $$.opacityForCircle.bind($$);
        var mainCircles = [];
        $root.circle.each(function (d) {
            var result = fn.bind(this)(d);
            result = $T(result, withTransition || !rendered, t)
                .style("opacity", opacityStyleFn);
            mainCircles.push(result);
        });
        return [
            mainCircles,
            $T(selectedCircles, withTransition)
                .attr("".concat(posAttr, "x"), cx)
                .attr("".concat(posAttr, "y"), cy)
        ];
    },
    /**
     * Show focused data point circle
     * @param {object} d Selected data
     * @private
     */
    showCircleFocus: function (d) {
        var $$ = this;
        var _a = $$.state, hasRadar = _a.hasRadar, resizing = _a.resizing, toggling = _a.toggling, transiting = _a.transiting, $el = $$.$el;
        var circle = $el.circle;
        if (transiting === false && circle && $$.isPointFocusOnly()) {
            var cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
            var cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
            var withTransition = toggling || isUndefined(d);
            var fn_1 = $$.point("update", $$, cx, cy, $$.getStylePropValue($$.color), resizing ? false : withTransition);
            if (d) {
                circle = circle
                    .filter(function (t) {
                    var _a;
                    var data = (_a = d.filter) === null || _a === void 0 ? void 0 : _a.call(d, function (v) { return v.id === t.id; });
                    return data.length ? select(this).datum(data[0]) : false;
                });
            }
            circle
                .attr("class", this.updatePointClass.bind(this))
                .style("opacity", null)
                .each(function (d) {
                var id = d.id, index = d.index, value = d.value;
                var visibility = "hidden";
                if (isValue(value)) {
                    fn_1.bind(this)(d);
                    $$.expandCircles(index, id);
                    visibility = "";
                }
                this.style.visibility = visibility;
            });
        }
    },
    /**
     * Hide focused data point circle
     * @private
     */
    hideCircleFocus: function () {
        var $$ = this;
        var circle = $$.$el.circle;
        if ($$.isPointFocusOnly() && circle) {
            $$.unexpandCircles();
            circle.style("visibility", "hidden");
        }
    },
    circleX: function (d) {
        return this.xx(d);
    },
    updateCircleY: function (isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var getPoints = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType), isSub);
        return function (d, i) {
            var id = d.id;
            return $$.isGrouped(id) ?
                getPoints(d, i)[0][1] :
                $$.getYScaleById(id, isSub)($$.getBaseValue(d));
        };
    },
    expandCircles: function (i, id, reset) {
        var $$ = this;
        var r = $$.pointExpandedR.bind($$);
        reset && $$.unexpandCircles();
        var circles = $$.getShapeByIndex("circle", i, id).classed($COMMON.EXPANDED, true);
        var scale = r(circles) / $$.config.point_r;
        var ratio = 1 - scale;
        if ($$.isCirclePoint()) {
            circles.attr("r", r);
        }
        else {
            // transform must be applied to each node individually
            circles.each(function () {
                var point = select(this);
                if (this.tagName === "circle") {
                    point.attr("r", r);
                }
                else {
                    var _a = this.getBBox(), width = _a.width, height = _a.height;
                    var x = ratio * (+point.attr("x") + width / 2);
                    var y = ratio * (+point.attr("y") + height / 2);
                    point.attr("transform", "translate(".concat(x, " ").concat(y, ") scale(").concat(scale, ")"));
                }
            });
        }
    },
    unexpandCircles: function (i) {
        var $$ = this;
        var r = $$.pointR.bind($$);
        var circles = $$.getShapeByIndex("circle", i)
            .filter(function () {
            return select(this).classed($COMMON.EXPANDED);
        })
            .classed($COMMON.EXPANDED, false);
        circles.attr("r", r);
        if (!$$.isCirclePoint()) {
            var scale = r(circles) / $$.config.point_r;
            circles.attr("transform", scale !== 1 ? "scale(".concat(scale, ")") : null);
        }
    },
    pointR: function (d) {
        var $$ = this;
        var config = $$.config;
        var pointR = config.point_r;
        var r = pointR;
        if ($$.isBubbleType(d)) {
            r = $$.getBubbleR(d);
        }
        else if (isFunction(pointR)) {
            r = pointR.bind($$.api)(d);
        }
        d.r = r;
        return r;
    },
    pointExpandedR: function (d) {
        var $$ = this;
        var config = $$.config;
        var scale = $$.isBubbleType(d) ? 1.15 : 1.75;
        return config.point_focus_expand_enabled ?
            (config.point_focus_expand_r || $$.pointR(d) * scale) :
            $$.pointR(d);
    },
    pointSelectR: function (d) {
        var $$ = this;
        var selectR = $$.config.point_select_r;
        return isFunction(selectR) ? selectR(d) : (selectR || $$.pointR(d) * 4);
    },
    /**
     * Check if point.focus.only option can be applied.
     * @returns {boolean}
     * @private
     */
    isPointFocusOnly: function () {
        var $$ = this;
        return $$.config.point_focus_only &&
            !$$.hasType("bubble") && !$$.hasType("scatter") && !$$.hasArcType(null, ["radar"]);
    },
    isWithinCircle: function (node, r) {
        var _a = this, config = _a.config, state = _a.state;
        var mouse = getPointer(state.event, node);
        var element = select(node);
        var prefix = this.isCirclePoint(node) ? "c" : "";
        var sensitivity = config.point_sensitivity === "radius" ?
            node.getAttribute("r") :
            config.point_sensitivity;
        var cx = +element.attr("".concat(prefix, "x"));
        var cy = +element.attr("".concat(prefix, "y"));
        // if node don't have cx/y or x/y attribute value
        if (!(cx || cy) && node.nodeType === 1) {
            var _b = getBoundingRect(node), x = _b.x, y = _b.y;
            cx = x;
            cy = y;
        }
        return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < (r || sensitivity);
    },
    /**
     * Get data point sensitivity radius
     * @param {object} d Data point object
     * @returns {number} return the sensitivity value
     */
    getPointSensitivity: function (d) {
        var $$ = this;
        var sensitivity = $$.config.point_sensitivity;
        if (isFunction(sensitivity)) {
            sensitivity = sensitivity.call($$.api, d);
        }
        else if (sensitivity === "radius") {
            sensitivity = d.r;
        }
        return sensitivity;
    },
    updatePointClass: function (d) {
        var $$ = this;
        var circle = $$.$el.circle;
        var pointClass = false;
        if (isObject(d) || circle) {
            pointClass = d === true ?
                circle.each(function (d) {
                    var className = $$.getClass("circle", true)(d);
                    if (this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1) {
                        className += " ".concat($COMMON.EXPANDED);
                    }
                    this.setAttribute("class", className);
                }) :
                $$.getClass("circle", true)(d);
        }
        return pointClass;
    },
    generateGetLinePoints: function (lineIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var x = $$.getShapeX(0, lineIndices, isSub);
        var y = $$.getShapeY(isSub);
        var lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = lineOffset(d, i) || y0; // offset is for stacked area chart
            var posX = x(d);
            var posY = y(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && ((d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY))) {
                posY = y0;
            }
            // 1 point that marks the line position
            var point = [posX, posY - (y0 - offset)];
            return [
                point,
                point, // from here and below, needed for compatibility
                point,
                point
            ];
        };
    },
    custom: {
        create: function (element, id, fillStyleFn) {
            return element.append("use")
                .attr("xlink:href", "#".concat(id))
                .attr("class", this.updatePointClass.bind(this))
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var $$ = this;
            var _a = element.node().getBBox(), width = _a.width, height = _a.height;
            var xPosFn2 = function (d) { return (isValue(d.value) ? xPosFn(d) - width / 2 : 0); };
            var yPosFn2 = function (d) { return (isValue(d.value) ? yPosFn(d) - height / 2 : 0); };
            var mainCircles = element;
            if (withTransition) {
                flow && mainCircles.attr("x", xPosFn2);
                mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
                selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
            }
            return mainCircles
                .attr("x", xPosFn2)
                .attr("y", yPosFn2)
                .style("fill", fillStyleFn);
        }
    },
    // 'circle' data point
    circle: {
        create: function (element, sizeFn, fillStyleFn) {
            return element.append("circle")
                .attr("class", this.updatePointClass.bind(this))
                .attr("r", sizeFn)
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var $$ = this;
            var mainCircles = element;
            // when '.load()' called, bubble size should be updated
            if ($$.hasType("bubble")) {
                mainCircles.attr("r", $$.pointR.bind($$));
            }
            if (withTransition) {
                flow && mainCircles.attr("cx", xPosFn);
                if (mainCircles.attr("cx")) {
                    mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
                }
                selectedCircles && $$.$T(mainCircles, withTransition, getTransitionName());
            }
            return mainCircles
                .attr("cx", xPosFn)
                .attr("cy", yPosFn)
                .style("fill", fillStyleFn);
        }
    },
    // 'rectangle' data point
    rectangle: {
        create: function (element, sizeFn, fillStyleFn) {
            var rectSizeFn = function (d) { return sizeFn(d) * 2.0; };
            return element.append("rect")
                .attr("class", this.updatePointClass.bind(this))
                .attr("width", rectSizeFn)
                .attr("height", rectSizeFn)
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var $$ = this;
            var r = $$.config.point_r;
            var rectXPosFn = function (d) { return xPosFn(d) - r; };
            var rectYPosFn = function (d) { return yPosFn(d) - r; };
            var mainCircles = element;
            if (withTransition) {
                flow && mainCircles.attr("x", rectXPosFn);
                mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
                selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
            }
            return mainCircles
                .attr("x", rectXPosFn)
                .attr("y", rectYPosFn)
                .style("fill", fillStyleFn);
        }
    }
};

/**
 * Check if point draw methods are valid
 * @param {string} point point type
 * @returns {boolean}
 * @private
 */
function hasValidPointDrawMethods(point) {
    return isObjectType(point) &&
        isFunction(point.create) && isFunction(point.update);
}
/**
 * Insert point info defs element
 * @param {string} point Point element
 * @param {string} id Point id
 * @private
 */
function insertPointInfoDefs(point, id) {
    var _a;
    var $$ = this;
    var copyAttr = function (from, target) {
        var attribs = from.attributes;
        for (var i = 0, name_1; (name_1 = attribs[i]); i++) {
            name_1 = name_1.name;
            target.setAttribute(name_1, from.getAttribute(name_1));
        }
    };
    var doc$1 = new DOMParser().parseFromString(point, "image/svg+xml");
    var node = doc$1.documentElement;
    var clone = doc.createElementNS(namespaces.svg, node.nodeName.toLowerCase());
    clone.id = id;
    clone.style.fill = "inherit";
    clone.style.stroke = "inherit";
    copyAttr(node, clone);
    if ((_a = node.childNodes) === null || _a === void 0 ? void 0 : _a.length) {
        var parent_1 = select(clone);
        if ("innerHTML" in clone) {
            parent_1.html(node.innerHTML);
        }
        else {
            toArray(node.childNodes).forEach(function (v) {
                copyAttr(v, parent_1.append(v.tagName).node());
            });
        }
    }
    $$.$el.defs.node().appendChild(clone);
}
var shapePointCommon = {
    /**
     * Check if point type option is valid
     * @param {string} type point type
     * @returns {boolean}
     * @private
     */
    hasValidPointType: function (type) {
        return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
    },
    /**
     * Check if pattern point is set to be used on legend
     * @returns {boolean}
     * @private
     */
    hasLegendDefsPoint: function () {
        var _a;
        var config = this.config;
        return config.legend_show && ((_a = config.point_pattern) === null || _a === void 0 ? void 0 : _a.length) && config.legend_usePoint;
    },
    getDefsPointId: function (id) {
        var datetimeId = this.state.datetimeId;
        return "".concat(datetimeId, "-point").concat(id);
    },
    /**
     * Get generate point function
     * @returns {Function}
     * @private
     */
    generatePoint: function () {
        var $$ = this;
        var $el = $$.$el, config = $$.config;
        var ids = [];
        var pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
        return function (method, context) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return function (d) {
                var _a, _b, _c, _d;
                var id = $$.getTargetSelectorSuffix(d.id || ((_a = d.data) === null || _a === void 0 ? void 0 : _a.id) || d);
                var element = select(this);
                ids.indexOf(id) < 0 && ids.push(id);
                var point = pattern[ids.indexOf(id) % pattern.length];
                if ($$.hasValidPointType(point)) {
                    point = $$[point];
                }
                else if (!hasValidPointDrawMethods(point || config.point_type)) {
                    var pointId = $$.getDefsPointId(id);
                    var defsPoint = $el.defs.select("#".concat(pointId));
                    if (defsPoint.size() < 1) {
                        insertPointInfoDefs.bind($$)(point, pointId);
                    }
                    if (method === "create") {
                        return (_b = $$.custom) === null || _b === void 0 ? void 0 : _b.create.bind(context).apply(void 0, __spreadArray([element, pointId], args, false));
                    }
                    else if (method === "update") {
                        return (_c = $$.custom) === null || _c === void 0 ? void 0 : _c.update.bind(context).apply(void 0, __spreadArray([element], args, false));
                    }
                }
                return (_d = point[method]) === null || _d === void 0 ? void 0 : _d.bind(context).apply(void 0, __spreadArray([element], args, false));
            };
        };
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get data max value
 * @param {object} $$ ChartInternal instance
 * @returns {number} max value
 * @private
 */
function getDataMax($$) {
    var levelMax = $$.config.polar_level_max;
    var dataMax = $$.getMinMaxData().max[0].value;
    // Apply level max only when is greater than the data max value
    if (levelMax && levelMax > dataMax) {
        dataMax = levelMax;
    }
    return dataMax;
}
var shapePolar = {
    /**
     * Initialize polar
     * @private
     */
    initPolar: function () {
        var $$ = this;
        var arcs = $$.$el.arcs, config = $$.config;
        var levelTextShow = config.polar_level_text_show;
        var levelTextBgColor = config.polar_level_text_backgroundColor;
        // append <g> for level
        arcs.levels = arcs.append("g")
            .attr("class", $LEVEL.levels);
        // set level text background color
        if (levelTextShow && levelTextBgColor) {
            $$.generateTextBGColorFilter(levelTextBgColor);
        }
    },
    /**
     * Get polar outer radius according to the data value
     * @param {object} d Data object
     * @param {numbet} outerRadius Outer radius
     * @returns {number} outer radius
     * @private
     */
    getPolarOuterRadius: function (d, outerRadius) {
        var _a;
        var dataMax = getDataMax(this);
        return (((_a = d === null || d === void 0 ? void 0 : d.data.values[0].value) !== null && _a !== void 0 ? _a : 0) / dataMax) * outerRadius;
    },
    /**
     * Update polar based on given data array
     * @param {object} targets Data object
     * @private
     */
    updateTargetsForPolar: function (targets) {
        // borrow from Arc
        this.updateTargetsForArc(targets);
    },
    /**
     * Called whenever redraw happens
     * @private
     */
    redrawPolar: function () {
        var $$ = this;
        var config = $$.config;
        config.polar_level_show && $$.updatePolarLevel();
    },
    /**
     * Update polar level circle
     * @private
     */
    updatePolarLevel: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, levels = $$.$el.arcs.levels;
        var depth = config.polar_level_depth;
        var dataMax = getDataMax($$);
        var levelData = getRange(0, depth);
        var outerRadius = state.radius;
        var levelRatio = levelData.map(function (l) { return outerRadius * ((l + 1) / depth); });
        var levelTextFormat = (config.polar_level_text_format || function () { }).bind($$.api);
        var level = levels
            .selectAll(".".concat($LEVEL.level))
            .data(levelData);
        level.exit().remove();
        var levelEnter = level.enter().append("g")
            .attr("class", function (d, i) { return "".concat($LEVEL.level, " ").concat($LEVEL.level, "-").concat(i); });
        // cx, cy, translate: Set center as origin (0,0) so that it can share same center with arcs
        levelEnter.append("circle");
        levelEnter
            .merge(level)
            .selectAll("circle")
            .style("visibility", config.polar_level_show ? null : "hidden")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", function (d) { return levelRatio[d]; });
        if (config.polar_level_text_show) {
            var levelTextBackgroundColor = config.polar_level_text_backgroundColor;
            var defsId = "#".concat(state.datetimeId, "-labels-bg").concat($$.getTargetSelectorSuffix(levelTextBackgroundColor));
            levelEnter.append("text")
                .style("text-anchor", "middle");
            levelEnter
                .merge(level)
                .selectAll("text")
                .attr("dy", function (d) { return -levelRatio[d] + 5; })
                .attr("filter", levelTextBackgroundColor ? "url(".concat(defsId, ")") : null)
                .text(function (d) { return levelTextFormat(dataMax / levelData.length * (d + 1)); });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get the position value
 * @param {boolean} isClockwise If the direction is clockwise
 * @param {string} type Coordinate type 'x' or 'y'
 * @param {number} edge Number of edge
 * @param {number} pos The indexed position
 * @param {number} range Range value
 * @param {number} ratio Ratio value
 * @returns {number}
 * @private
 */
function getPosition(isClockwise, type, edge, pos, range, ratio) {
    var index = isClockwise && pos > 0 ? edge - pos : pos;
    var r = 2 * Math.PI;
    var func = type === "x" ? Math.sin : Math.cos;
    return range * (1 - ratio * func(index * r / edge));
}
// cache key
var cacheKeyPoints = KEY.radarPoints;
var cacheKeyTextWidth = KEY.radarTextWidth;
var shapeRadar = {
    initRadar: function () {
        var $$ = this;
        var config = $$.config, current = $$.state.current, $el = $$.$el;
        if ($$.hasType("radar")) {
            $el.radar = $el.main.select(".".concat($COMMON.chart)).append("g")
                .attr("class", $RADAR.chartRadars);
            // level
            $el.radar.levels = $el.radar.append("g")
                .attr("class", $LEVEL.levels);
            // axis
            $el.radar.axes = $el.radar.append("g")
                .attr("class", $AXIS.axis);
            // shapes
            $el.radar.shapes = $el.radar.append("g")
                .attr("class", $SHAPE.shapes);
            current.dataMax = config.radar_axis_max || $$.getMinMaxData().max[0].value;
            if (config.radar_axis_text_show) {
                config.interaction_enabled && $$.bindRadarEvent();
                // it needs to calculate dimension at the initialization
                $$.updateRadarLevel();
                $$.updateRadarAxes();
            }
        }
    },
    getRadarSize: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, arcWidth = _a.arcWidth, arcHeight = _a.arcHeight;
        var padding = config.axis_x_categories.length < 4 ? -20 : 10;
        var size = (Math.min(arcWidth, arcHeight) - padding) / 2;
        return [size, size];
    },
    updateTargetsForRadar: function (targets) {
        var $$ = this;
        var config = $$.config;
        if (isEmpty(config.axis_x_categories)) {
            config.axis_x_categories = getRange(0, getMinMax$1("max", targets.map(function (v) {
                return v.values.length;
            })));
        }
        $$.generateRadarPoints();
    },
    getRadarPosition: function (type, index, range, ratio) {
        var $$ = this;
        var config = $$.config;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var edge = config.axis_x_categories.length;
        var isClockwise = config.radar_direction_clockwise;
        var pos = toArray(type).map(function (v) {
            return getPosition(isClockwise, v, edge, index, isDefined(range) ? range : (type === "x" ? width : height), isNumber(ratio) ? ratio : config.radar_size_ratio);
        });
        return pos.length === 1 ? pos[0] : pos;
    },
    /**
     * Generate data points
     * @private
     */
    generateRadarPoints: function () {
        var $$ = this;
        var targets = $$.data.targets;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var points = $$.cache.get(cacheKeyPoints) || {};
        var size = points._size;
        // recalculate position only when the previous dimension has been changed
        if (!size || (size.width !== width && size.height !== height)) {
            targets.forEach(function (d) {
                points[d.id] = d.values.map(function (v, i) { return ($$.getRadarPosition(["x", "y"], i, undefined, $$.getRatio("radar", v))); });
            });
            points._size = { width: width, height: height };
            $$.cache.add(cacheKeyPoints, points);
        }
    },
    redrawRadar: function () {
        var $$ = this;
        var _a = $$.$el, radar = _a.radar, main = _a.main;
        var translate = $$.getTranslate("radar");
        // Adjust radar, circles and texts' position
        if (translate) {
            radar.attr("transform", translate);
            main.select(".".concat($TEXT.chartTexts)).attr("transform", translate);
            $$.generateRadarPoints();
            $$.updateRadarLevel();
            $$.updateRadarAxes();
            $$.updateRadarShape();
        }
    },
    generateGetRadarPoints: function () {
        var points = this.cache.get(cacheKeyPoints);
        return function (d, i) {
            var point = points[d.id][i];
            return [
                point,
                point,
                point,
                point
            ];
        };
    },
    updateRadarLevel: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, radar = $$.$el.radar;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var depth = config.radar_level_depth;
        var edge = config.axis_x_categories.length;
        var showText = config.radar_level_text_show;
        var radarLevels = radar.levels;
        var levelData = getRange(0, depth);
        var radius = config.radar_size_ratio * Math.min(width, height);
        var levelRatio = levelData.map(function (l) { return radius * ((l + 1) / depth); });
        var levelTextFormat = (config.radar_level_text_format || function () { }).bind($$.api);
        // Generate points
        var points = levelData.map(function (v) {
            var range = levelRatio[v];
            var pos = getRange(0, edge).map(function (i) {
                return ($$.getRadarPosition(["x", "y"], i, range, 1)).join(",");
            });
            return pos.join(" ");
        });
        var level = radarLevels
            .selectAll(".".concat($LEVEL.level))
            .data(levelData);
        level.exit().remove();
        var levelEnter = level.enter().append("g")
            .attr("class", function (d, i) { return "".concat($LEVEL.level, " ").concat($LEVEL.level, "-").concat(i); });
        levelEnter.append("polygon")
            .style("visibility", config.radar_level_show ? null : "hidden");
        if (showText) {
            if (radarLevels.select("text").empty()) {
                radarLevels
                    .append("text")
                    .attr("dx", "-.5em")
                    .attr("dy", "-.7em")
                    .style("text-anchor", "end")
                    .text(function () { return levelTextFormat(0); });
            }
            levelEnter.append("text")
                .attr("dx", "-.5em")
                .style("text-anchor", "end")
                .text(function (d) {
                return levelTextFormat(state.current.dataMax / levelData.length * (d + 1));
            });
        }
        levelEnter
            .merge(level)
            .attr("transform", function (d) { return "translate(".concat(width - levelRatio[d], ", ").concat(height - levelRatio[d], ")"); })
            .selectAll("polygon")
            .attr("points", function (d) { return points[d]; });
        // update level text position
        if (showText) {
            radarLevels.selectAll("text")
                .attr("x", function (d) { return (isUndefined(d) ? width : points[d].split(",")[0]); })
                .attr("y", function (d) { return (isUndefined(d) ? height : 0); });
        }
    },
    updateRadarAxes: function () {
        var $$ = this;
        var config = $$.config, radar = $$.$el.radar;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var categories = config.axis_x_categories;
        var axis = radar.axes.selectAll("g")
            .data(categories);
        axis.exit().remove();
        var axisEnter = axis.enter().append("g")
            .attr("class", function (d, i) { return "".concat($AXIS.axis, "-").concat(i); });
        config.radar_axis_line_show && axisEnter.append("line");
        config.radar_axis_text_show && axisEnter.append("text");
        axis = axisEnter.merge(axis);
        // axis line
        if (config.radar_axis_line_show) {
            axis.select("line")
                .attr("x1", width)
                .attr("y1", height)
                .attr("x2", function (d, i) { return $$.getRadarPosition("x", i); })
                .attr("y2", function (d, i) { return $$.getRadarPosition("y", i); });
        }
        // axis text
        if (config.radar_axis_text_show) {
            var _b = config.radar_axis_text_position, _c = _b.x, x_1 = _c === void 0 ? 0 : _c, _d = _b.y, y_1 = _d === void 0 ? 0 : _d;
            var textWidth = $$.cache.get(cacheKeyTextWidth) || 0;
            axis.select("text")
                .style("text-anchor", "middle")
                .attr("dy", ".5em")
                .call(function (selection) {
                selection.each(function (d) {
                    setTextValue(select(this), String(d), [-0.6, 1.2]);
                });
            })
                .datum(function (d, i) { return ({ index: i }); })
                .attr("transform", function (d) {
                if (isUndefined(this.width)) {
                    // cache evaluated axis text width
                    this.width = this.getBoundingClientRect().width / 2;
                }
                var posX = $$.getRadarPosition("x", d.index, undefined, 1);
                var posY = Math.round($$.getRadarPosition("y", d.index, undefined, 1));
                if (posX > width) {
                    posX += this.width + x_1;
                }
                else if (Math.round(posX) < width) {
                    posX -= this.width + x_1;
                }
                if (posY > height) {
                    // update vertical centered edge axis text dy position
                    if (posY / 2 === height && this.firstChild.tagName === "tspan") {
                        this.firstChild.setAttribute("dy", "0em");
                    }
                    posY += y_1;
                }
                else if (posY < height) {
                    posY -= y_1;
                }
                return "translate(".concat(posX, " ").concat(posY, ")");
            });
            if (!textWidth) {
                var widths = [radar.axes, radar.levels].map(function (v) { return getPathBox(v.node()).width; });
                if (widths.every(function (v) { return v > 0; })) {
                    $$.cache.add(cacheKeyTextWidth, widths[0] - widths[1]);
                }
            }
        }
    },
    bindRadarEvent: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, radar = _a.radar, svg = _a.svg;
        var focusOnly = $$.isPointFocusOnly();
        var inputType = state.inputType, transiting = state.transiting;
        var isMouse = inputType === "mouse";
        var hide = function (event) {
            state.event = event;
            if (!config.interaction_onout) {
                return;
            }
            // const index = getIndex(event);
            var index = $$.getDataIndexFromEvent(event);
            var noIndex = isUndefined(index);
            if (isMouse || noIndex) {
                $$.hideTooltip();
                focusOnly ? $$.hideCircleFocus() : $$.unexpandCircles();
                if (isMouse) {
                    $$.setOverOut(false, index);
                }
                else if (noIndex) {
                    $$.callOverOutForTouch();
                }
            }
        };
        radar.axes
            .on(isMouse ? "mouseover " : "touchstart", function (event) {
            if (transiting) { // skip while transiting
                return;
            }
            state.event = event;
            var index = $$.getDataIndexFromEvent(event);
            $$.selectRectForSingle(svg.node(), index);
            isMouse ? $$.setOverOut(true, index) : $$.callOverOutForTouch(index);
        })
            .on("mouseout", isMouse ? hide : null);
        if (!isMouse) {
            svg.on("touchstart", hide);
        }
    },
    updateRadarShape: function () {
        var $$ = this;
        var targets = $$.data.targets.filter(function (d) { return $$.isRadarType(d); });
        var points = $$.cache.get(cacheKeyPoints);
        var areas = $$.$el.radar.shapes
            .selectAll("polygon")
            .data(targets);
        var areasEnter = areas.enter().append("g")
            .attr("class", $$.getChartClass("Radar"));
        $$.$T(areas.exit())
            .remove();
        areasEnter
            .append("polygon")
            .merge(areas)
            .style("fill", $$.color)
            .style("stroke", $$.color)
            .attr("points", function (d) { return points[d.id].join(" "); });
        $$.updateTargetForCircle(targets, areasEnter);
    },
    /**
     * Get data point x coordinate
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    radarCircleX: function (d) {
        return this.cache.get(cacheKeyPoints)[d.id][d.index][0];
    },
    /**
     * Get data point y coordinate
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    radarCircleY: function (d) {
        return this.cache.get(cacheKeyPoints)[d.id][d.index][1];
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Get treemap elements' position
 * @param {d3Selection} group Root selection
 * @param {object} root Root data
 * @private
 */
function position(group, root) {
    var $$ = this;
    var _a = $$.scale, x = _a.x, y = _a.y, width = $$.state.width;
    group.selectAll("g")
        .attr("transform", function (d) { return ("translate(".concat(d === root ? "0,0" : "".concat(x(d.x0), ",").concat(y(d.y0)), ")")); })
        .select("rect")
        .attr("width", function (d) { return (d === root ? width : x(d.x1) - x(d.x0)); })
        .attr("height", function (d) { return (d === root ? 0 : y(d.y1) - y(d.y0)); });
}
/**
 * Convert data for treemap hierarchy
 * @param {object} data Data object
 * @returns {Array} Array of data for treemap hierarchy
 * @private
 */
function convertDataToTreemapData(data) {
    var $$ = this;
    return data.map(function (d) {
        var id = d.id, values = d.values;
        var value = values[0].value;
        return {
            name: id,
            id: id, // needed to keep compatibility on whole code logic
            value: value,
            ratio: $$.getRatio("treemap", values[0])
        };
    });
}
/**
 * Get hierarchy data
 * @param {object} data Data object
 * @returns {Array} Array of hierarchy data
 * @private
 */
function getHierachyData(data) {
    var $$ = this;
    var hierarchyData = hierarchy(data).sum(function (d) { return d.value; });
    var sortFn = $$.getSortCompareFn(true);
    return [
        $$.treemap(sortFn ? hierarchyData.sort(sortFn) : hierarchyData)
    ];
}
var shapeTreemap = {
    initTreemap: function () {
        var $$ = this;
        var $el = $$.$el, _a = $$.state, _b = _a.current, width = _b.width, height = _b.height, clip = _a.clip, datetimeId = _a.datetimeId;
        clip.id = "".concat(datetimeId, "-clip");
        $$.treemap = treemap$1()
            .tile($$.getTreemapTile());
        $el.defs
            .append("clipPath")
            .attr("id", clip.id)
            .append("rect")
            .attr("width", width)
            .attr("height", height);
        $el.treemap = $el.main.select(".".concat($COMMON.chart))
            .attr("clip-path", "url(#".concat(clip.id, ")"))
            .append("g")
            .classed($TREEMAP.chartTreemaps, true);
        $$.bindTreemapEvent();
    },
    /**
     * Bind events
     * @private
     */
    bindTreemapEvent: function () {
        var $$ = this;
        var $el = $$.$el, config = $$.config, state = $$.state;
        var getTarget = function (event) {
            var _a;
            var target = event.isTrusted ? event.target : (_a = state.eventReceiver.rect) === null || _a === void 0 ? void 0 : _a.node();
            var data;
            if (/^rect$/i.test(target.tagName)) {
                state.event = event;
                data = select(target).datum();
            }
            return data === null || data === void 0 ? void 0 : data.data;
        };
        if (config.interaction_enabled) {
            var isTouch = state.inputType === "touch";
            $el.treemap
                .on(isTouch ? "touchstart" : "mouseover mousemove", function (event) {
                var data = getTarget(event);
                if (data) {
                    $$.showTooltip([data], event.currentTarget);
                    /^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
                }
            })
                .on(isTouch ? "touchend" : "mouseout", function (event) {
                var data = getTarget(event);
                if (config.interaction_onout) {
                    $$.hideTooltip();
                    $$.setOverOut(false, data);
                }
            });
        }
    },
    /**
     * Get tiling function
     * @returns {Function}
     * @private
     */
    getTreemapTile: function () {
        var _a, _b;
        var $$ = this;
        var config = $$.config, _c = $$.state.current, width = _c.width, height = _c.height;
        var tile = (_b = {
            binary: treemapBinary,
            dice: treemapDice,
            slice: treemapSlice,
            sliceDice: treemapSliceDice,
            squarify: treemapSquarify,
            resquarify: treemapResquarify
        }[(_a = config.treemap_tile) !== null && _a !== void 0 ? _a : "binary"]) !== null && _b !== void 0 ? _b : treemapBinary;
        return function (node, x0, y0, x1, y1) {
            tile(node, 0, 0, width, height);
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.x0 = x0 + child.x0 / width * (x1 - x0);
                child.x1 = x0 + child.x1 / width * (x1 - x0);
                child.y0 = y0 + child.y0 / height * (y1 - y0);
                child.y1 = y0 + child.y1 / height * (y1 - y0);
            }
        };
    },
    /**
     * Get treemap hierarchy data
     * @param {Array} targets Data targets
     * @returns {object}
     * @private
     */
    getTreemapData: function (targets) {
        var $$ = this;
        return {
            name: "root",
            children: convertDataToTreemapData.bind($$)($$.filterTargetsToShow(targets.filter($$.isTreemapType, $$)))
        };
    },
    /**
     * Update treemap data
     * @param {Array} targets Data targets
     * @private
     */
    updateTargetsForTreemap: function (targets) {
        var $$ = this;
        var treemap = $$.$el.treemap;
        var treemapData = getHierachyData.call($$, $$.getTreemapData(targets !== null && targets !== void 0 ? targets : $$.data.targets));
        // using $el.treemap reference can alter data, so select treemap <g> again
        treemap.data(treemapData);
    },
    /**
     * Render treemap
     * @param {number} durationForExit Duration for exit transition
     * @private
     */
    updateTreemap: function (durationForExit) {
        var $$ = this;
        var $el = $$.$el, $T = $$.$T;
        var data = $el.treemap.datum();
        var classChartTreemap = $$.getChartClass("Treemap");
        var classTreemap = $$.getClass("treemap", true);
        var treemap = $el.treemap
            .selectAll("g")
            .data(data.children);
        $T(treemap.exit(), durationForExit)
            .style("opacity", "0")
            .remove();
        treemap.enter()
            .append("g")
            .append("rect");
        $el.treemap.selectAll("g")
            .attr("class", classChartTreemap)
            .select("rect")
            .attr("class", classTreemap)
            .attr("fill", function (d) { return $$.color(d.data.name); });
    },
    /**
     * Generate treemap coordinate points data
     * @returns {Array} Array of coordinate points
     * @private
     */
    generateGetTreemapPoints: function () {
        var $$ = this;
        var $el = $$.$el, _a = $$.scale, x = _a.x, y = _a.y;
        var points = {};
        $el.treemap.selectAll("g").each(function (d) {
            points[d.data.name] = [
                [x(d.x0), y(d.y0)],
                [x(d.x1), y(d.y1)]
            ];
        });
        return function (d) { return points[d.id]; };
    },
    /**
     * Redraw treemap
     * @param {boolean} withTransition With or without transition
     * @returns {Array} Selections
     * @private
     */
    redrawTreemap: function (withTransition) {
        var $$ = this;
        var $el = $$.$el, _a = $$.state.current, width = _a.width, height = _a.height;
        // update defs
        $el.defs.select("rect")
            .attr("width", width)
            .attr("height", height);
        return [
            $$.$T($el.treemap, withTransition, getRandom())
                .call(position.bind($$), $el.treemap.datum())
        ];
    },
    /**
     * Get treemap data label format function
     * @param {object} d Data object
     * @returns {Function}
     * @private
     */
    treemapDataLabelFormat: function (d) {
        var $$ = this;
        var config = $$.config;
        var id = d.id, value = d.value;
        var format = config.treemap_label_format;
        var ratio = $$.getRatio("treemap", d);
        var percentValue = (ratio * 100).toFixed(2);
        var meetLabelThreshold = config.treemap_label_show && $$.meetsLabelThreshold(ratio, "treemap") ?
            null :
            "0";
        return function (node) {
            node.style("opacity", meetLabelThreshold);
            return isFunction(format) ?
                format.bind($$.api)(value, ratio, id) :
                "".concat(id, "\n").concat(percentValue, "%");
        };
    }
};

/**
 * point config options
 */
var optPoint = {
    /**
     * Set point options
     * @name point
     * @memberof Options
     * @type {object}
     * @property {object} point Point object
     * @property {boolean} [point.show=true] Whether to show each point in line.
     * @property {number|Function} [point.r=2.5] The radius size of each point.
     *  - **NOTE:** Disabled for 'bubble' type
     * @property {boolean|object} [point.radialGradient=false] Set the radial gradient on point.<br><br>
     * Or customize by giving below object value:
     *  - cx {number}: `cx` value (default: `0.3`)
     *  - cy {number}: `cy` value (default: `0.3`)
     *  - r {number}: `r` value (default: `0.7`)
     *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
     *    - (default: `[[0.1, $DATA_COLOR, 1], [0.9, $DATA_COLOR, 0]]`)
     * @property {boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
     * @property {number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
     *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
     * @property {boolean} [point.focus.only=false] Show point only when is focused.
     * @property {number|null} [point.opacity=undefined] Set point opacity value.
     * - **NOTE:**
     * 	- `null` will make to not set inline 'opacity' css prop.
     * 	- when no value(or undefined) is set, it defaults to set opacity value according its chart types.
     * @property {number|string|Function} [point.sensitivity=10] The senstivity value for interaction boundary.
     * - **Available Values:**
     *   - {number}: Absolute sensitivity value which is the distance from the data point in pixel.
     *   - "radius": sensitivity based on point's radius
     *   - Function: callback for each point to determine the sensitivity<br>
     *    	```js
     *   	sensitivity: function(d) {
     * 	  // ex. of argument d:
     * 	  // ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
     *
     * 	  // returning d.r, will make sensitivity same as point's radius value.
     *  	  return d.r;
     * 	}
     * 	```
     * @property {number} [point.select.r=point.r*4] The radius size of each point on selected.
     * @property {string} [point.type="circle"] The type of point to be drawn
     * - **NOTE:**
     *   - If chart has 'bubble' type, only circle can be used.
     *   - For IE, non circle point expansions are not supported due to lack of transform support.
     * - **Available Values:**
     *   - circle
     *   - rectangle
     * @property {Array} [point.pattern=[]] The type of point or svg shape as string, to be drawn for each line
     * - **NOTE:**
     *   - This is an `experimental` feature and can have some unexpected behaviors.
     *   - If chart has 'bubble' type, only circle can be used.
     *   - For IE, non circle point expansions are not supported due to lack of transform support.
     * - **Available Values:**
     *   - circle
     *   - rectangle
     *   - svg shape tag interpreted as string<br>
     *     (ex. `<polygon points='2.5 0 0 5 5 5'></polygon>`)
     * @see [Demo: point type](https://naver.github.io/billboard.js/demo/#Point.RectanglePoints)
     * @see [Demo: point focus only](https://naver.github.io/billboard.js/demo/#Point.FocusOnly)
     * @see [Demo: point radialGradient](https://naver.github.io/billboard.js/demo/#Point.RadialGradientPoint)
     * @see [Demo: point sensitivity](https://naver.github.io/billboard.js/demo/#Point.PointSensitivity)
     * @example
     *  point: {
     *      show: false,
     *      r: 5,
     *
     *      // or customize the radius
     *      r: function(d) {
     *          ...
     *          return r;
     *      },
     *
     *      // will generate follwing radialGradient:
     *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
     *      // <radualGradient cx="0.3" cy="0.3" r="0.7">
     *      //    <stop offset="0.1" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
     *      //    <stop offset="0.9" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
     *      // </radialrGradient>
     *      radialGradient: true,
     *
     *      // Or customized gradient
     *      radialGradient: {
     *      	cx: 0.3,  // cx attributes
     *      	cy: 0.5,  // cy attributes
     *      	r: 0.7,  // r attributes
     *      	stops: [
     *      	  // offset, stop-color, stop-opacity
     *      	  [0, "#7cb5ec", 1],
     *
     *      	  // setting 'null' for stop-color, will set its original data color
     *      	  [0.5, null, 0],
     *
     *      	  // setting 'function' for stop-color, will pass data id as argument.
     *      	  // It should return color string or null value
     *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
     *      	]
     *      },
     *
     *      focus: {
     *          expand: {
     *              enabled: true,
     *              r: 1
     *          },
     *          only: true
     *      },
     *
     *      // do not set inline 'opacity' css prop setting
     *      opacity: null,
     *
     *      // set every data point's opacity value
     *      opacity: 0.7,
     *
     *      select: {
     *          r: 3
     *      },
     *
     *      // having lower value, means how closer to be for interaction
     *      sensitivity: 3,
     *
     *      // sensitivity based on point's radius
     *      sensitivity: "radius",
     *
     *      // callback for each point to determine the sensitivity
     *      sensitivity: function(d) {
     * 	// ex. of argument d:
     * 	// ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
     *
     * 	// returning d.r, will make sensitivity same as point's radius value.
     * 	return d.r;
     *      }
     *
     *      // valid values are "circle" or "rectangle"
     *      type: "rectangle",
     *
     *      // or indicate as pattern
     *      pattern: [
     *        "circle",
     *        "rectangle",
     *        "<polygon points='0 6 4 0 -4 0'></polygon>"
     *     ],
     *  }
     */
    point_show: true,
    point_r: 2.5,
    point_radialGradient: false,
    point_sensitivity: 10,
    point_focus_expand_enabled: true,
    point_focus_expand_r: undefined,
    point_focus_only: false,
    point_opacity: undefined,
    point_pattern: [],
    point_select_r: undefined,
    point_type: "circle"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * area config options
 */
var optArea = {
    /**
     * Set area options
     * @name area
     * @memberof Options
     * @type {object}
     * @property {object} area Area object
     * @property {boolean} [area.above=false] Set background area `above` the data chart line.
     * @property {boolean} [area.below=false] Set background area `below` the data chart line.
     *  - **NOTE**: Can't be used along with `above` option. When above & below options are set to true, `above` will be prioritized.
     * @property {boolean} [area.front=true] Set area node to be positioned over line node.
     * @property {boolean|object} [area.linearGradient=false] Set the linear gradient on area.<br><br>
     * Or customize by giving below object value:
     *  - x {Array}: `x1`, `x2` value (default: `[0, 0]`)
     *  - y {Array}: `y1`, `y2` value (default: `[0, 1]`)
     *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
     *    - (default: `[[0, $DATA_COLOR, 1], [1, $DATA_COLOR, 0]]`)
     * @property {boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
     * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient), [&lt;stop>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop)
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
     * @see [Demo: above](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Above)
     * @see [Demo: below](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Below)
     * @see [Demo: linearGradient](https://naver.github.io/billboard.js/demo/#AreaChartOptions.LinearGradient)
     * @example
     *  area: {
     *      above: true,
     *      below: false,
     *      zerobased: false,
     *
     *      // <g class='bb-areas'> will be positioned behind the line <g class='bb-lines'> in stacking order
     *      front: false,
     *
     *      // will generate follwing linearGradient:
     *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
     *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
     *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
     *      // </linearGradient>
     *      linearGradient: true,
     *
     *      // Or customized gradient
     *      linearGradient: {
     *      	x: [0, 0],  // x1, x2 attributes
     *      	y: [0, 0],  // y1, y2 attributes
     *      	stops: [
     *      	  // offset, stop-color, stop-opacity
     *      	  [0, "#7cb5ec", 1],
     *
     *      	  // setting 'null' for stop-color, will set its original data color
     *      	  [0.5, null, 0],
     *
     *      	  // setting 'function' for stop-color, will pass data id as argument.
     *      	  // It should return color string or null value
     *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
     *      	]
     *      }
     *  }
     */
    area_above: false,
    area_below: false,
    area_front: true,
    area_linearGradient: false,
    area_zerobased: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bar config options
 */
var optBar = {
    /**
     * Set bar options
     * @name bar
     * @memberof Options
     * @type {object}
     * @property {object} bar Bar object
     * @property {boolean} [bar.front=false] Set 'bar' to be positioned over(on the top) other shapes elements.
     * @property {number} [bar.indices.removeNull=false] Remove nullish data on bar indices positions.
     * @property {number} [bar.label.threshold=0] Set threshold ratio to show/hide labels.
     * @property {boolean|object} [bar.linearGradient=false] Set the linear gradient on bar.<br><br>
     * Or customize by giving below object value:
     *  - x {Array}: `x1`, `x2` value (default: `[0, 0]`)
     *  - y {Array}: `y1`, `y2` value (default: `[0, 1]`)
     *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
     *    - (default: `[[0, $DATA_COLOR, 1], [1, $DATA_COLOR, 0]]`)
     * @property {boolean} [bar.overlap=false] Bars will be rendered at same position, which will be overlapped each other. (for non-grouped bars only)
     * @property {number} [bar.padding=0] The padding pixel value between each bar.
     * @property {number} [bar.radius] Set the radius of bar edge in pixel.
     * @property {number} [bar.radius.ratio] Set the radius ratio of bar edge in relative the bar's width.
     * @property {number} [bar.sensitivity=2] The senstivity offset value for interaction boundary.
     * @property {number|Function|object} [bar.width] Change the width of bar chart.
     * @property {number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
     * - **NOTE:** Criteria for ratio.
     *   - When x ticks count is same with the data count, the baseline for ratio is the minimum interval value of x ticks.
     * 	   - ex. when timeseries x values are: [2024-01-01, 2024-02-01, 2024-03-01], the minimum interval will be `2024-02-01 ~ 2024-03-01`
     *     - if the minimum interval is 30px, then ratio=1 means 30px.
     *   - When x ticks count is lower than the data count, the baseline will be calculated as `chart width / data count`.
     * 	   - ex. when chart width is 500, data count is 5, then ratio=1 means 100px.
     * @property {number} [bar.width.max] The maximum width value for ratio.
     * @property {number} [bar.width.dataname] Change the width of bar for indicated dataset only.
     * @property {number} [bar.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
     *  - **NOTE:**
     *   - Works only for non-stacked bar
     * @property {number} [bar.width.dataname.max] The maximum width value for ratio.
     * @property {boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
     * @see [Demo: bar front](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarFront)
     * @see [Demo: bar indices](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarIndices)
     * @see [Demo: bar overlap](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarOverlap)
     * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
     * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
     * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
     * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
     * @example
     *  bar: {
     *      // make bar shape to be positioned over the other shape elements
     *      front: true,
     *
     *      // remove nullish data on bar indices postions
     *      indices: {
     *          removeNull: true
     *      },
     *
     *      // will generate follwing linearGradient:
     *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
     *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
     *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
     *      // </linearGradient>
     *      linearGradient: true,
     *
     *      // Or customized gradient
     *      linearGradient: {
     *      	x: [0, 0],  // x1, x2 attributes
     *      	y: [0, 0],  // y1, y2 attributes
     *      	stops: [
     *      	  // offset, stop-color, stop-opacity
     *      	  [0, "#7cb5ec", 1],
     *
     *      	  // setting 'null' for stop-color, will set its original data color
     *      	  [0.5, null, 0],
     *
     *      	  // setting 'function' for stop-color, will pass data id as argument.
     *      	  // It should return color string or null value
     *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
     *      	]
     *      },
     *
     *      // remove nullish da
     *      overlap: true,
     *
     *      padding: 1,
     *
     *      // bar radius
     *      radius: 10,
     *      // or
     *      radius: {
     *          ratio: 0.5
     *      }
     *
     *      label: {
     *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the y Axis domain range value.
     *          // if data value is below than 0.1, text label will be hidden.
     *          threshold: 0.1,
     *      },
     *
     *      // will not have offset between each bar elements for interaction
     *      sensitivity: 0,
     *
     *      width: 10,
     *
     *      // or specify width callback. The callback will receive width, targetsNum, maxDataCount as arguments.
     *      // - width: chart area width
     *      // - targetsNum: number of targets
     *      // - maxDataCount: maximum data count among targets
     *      width: function(width, targetsNum, maxDataCount) {
     *            return width / (targetsNum * maxDataCount);
     *      }
     *
     *      // or specify ratio & max
     *      width: {
     *          ratio: 0.2,
     *          max: 20
     *      },
     *
     *      // or specify width per dataset
     *      width: {
     *          data1: 20,
     *          data2: {
     *              ratio: 0.2,
     *              max: 20
     *          }
     *      },
     *
     *      zerobased: false
     *  }
     */
    bar_front: false,
    bar_indices_removeNull: false,
    bar_label_threshold: 0,
    bar_linearGradient: false,
    bar_overlap: false,
    bar_padding: 0,
    bar_radius: undefined,
    bar_radius_ratio: undefined,
    bar_sensitivity: 2,
    bar_width: undefined,
    bar_width_ratio: 0.6,
    bar_width_max: undefined,
    bar_zerobased: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bubble config options
 */
var optBubble = {
    /**
     * Set bubble options
     * @name bubble
     * @memberof Options
     * @type {object}
     * @property {object} bubble bubble object
     * @property {number|Function} [bubble.maxR=35] Set the max bubble radius value
     * @property {boolean} [bubble.zerobased=false] Set if min or max value will be 0 on bubble chart.
     * @example
     *  bubble: {
     *      // ex) If 100 is the highest value among data bound, the representation bubble of 100 will have radius of 50.
     *      // And the lesser will have radius relatively from tha max value.
     *      maxR: 50,
     *
     *      // or set radius callback
     *      maxR: function(d) {
     *          // ex. of d param - {x: Fri Oct 06 2017 00:00:00 GMT+0900, value: 80, id: "data2", index: 5}
     *          ...
     *          return Math.sqrt(d.value * 2);
     *      },
     *      zerobased: false
     *  }
     */
    bubble_maxR: 35,
    bubble_zerobased: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * candlestick config options
 */
var optCandlestick = {
    /**
     * Set candlestick options
     * @name candlestick
     * @memberof Options
     * @type {object}
     * @property {object} candlestick Candlestick object
     * @property {number} [candlestick.width] Change the width.
     * @property {number} [candlestick.width.ratio=0.6] Change the width by ratio.
     * @property {number} [candlestick.width.max] The maximum width value for ratio.
     * @property {number} [candlestick.width.dataname] Change the width for indicated dataset only.
     * @property {number} [candlestick.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
     * @property {number} [candlestick.width.dataname.max] The maximum width value for ratio.
     * @property {object} [candlestick.color] Color setting.
     * @property {string|object} [candlestick.color.down] Change down(bearish) value color.
     * @property {string} [candlestick.color.down.dataname] Change down value color for indicated dataset only.
     *
     * @see [Demo](https://naver.github.io/billboard.js/demo/##Chart.CandlestickChart)
     * @example
     *  candlestick: {
     *      width: 10,
     *
     *      // or
     *      width: {
     *         	ratio: 0.2,
     *         	max: 20
     *      },
     *
     *      // or specify width per dataset
     *      width: {
     *         	data1: 20,
     *         	data2: {
     *         	    ratio: 0.2,
     *         		max: 20
     *         	}
     *      },
     *      color: {
     *  	  	// spcify bearish color
     *  	  	down: "red",
     *
     *  	  	// or specify color per dataset
     *  	  	down: {
     *  	  		data1: "red",
     *  	  		data2: "blue",
     *  	  	}
     *      }
     *  }
     */
    candlestick_width: undefined,
    candlestick_width_ratio: 0.6,
    candlestick_width_max: undefined,
    candlestick_color_down: "red"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * line config options
 */
var optLine = {
    /**
     * Set line options
     * @name line
     * @memberof Options
     * @type {object}
     * @property {object} line Line object
     * @property {boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
     *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
     * @property {Array}   [line.classes=undefined] If set, used to set a css class on each line.
     * @property {boolean} [line.step.type=step] Change step type for step chart.<br>
     * **Available values:**
     * - step
     * - step-before
     * - step-after
     * @property {boolean} [line.step.tooltipMatch=false] Set to `true` for `step-before` and `step-after` types to have cursor/tooltip match to hovered step's point instead of nearest point.
     * @property {boolean|Array} [line.point=true] Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
     * @property {boolean} [line.zerobased=false] Set if min or max value will be 0 on line chart.
     * @example
     *  line: {
     *      connectNull: true,
     *      classes: [
     *          "line-class1",
     *          "line-class2"
     *      ],
     *      step: {
     *          type: "step-after",
     *
     *          // to have cursor/tooltip match to hovered step's point instead of nearest point.
     *          tooltipMatch: true
     *      },
     *
     *      // hide all data points ('point.show=false' also has similar effect)
     *      point: false,
     *
     *      // show data points for only indicated datas
     *      point: [
     *          "data1", "data3"
     *      ],
     *
     *      zerobased: false
     *  }
     */
    line_connectNull: false,
    line_step_type: "step",
    line_step_tooltipMatch: false,
    line_zerobased: false,
    line_classes: undefined,
    line_point: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * scatter config options
 */
var optScatter = {
    /**
     * Set scatter options
     * @name scatter
     * @memberof Options
     * @type {object}
     * @property {object} [scatter] scatter object
     * @property {boolean} [scatter.zerobased=false] Set if min or max value will be 0 on scatter chart.
     * @example
     *  scatter: {
     *      connectNull: true,
     *      step: {
     *          type: "step-after"
     *      },
     *
     *      // hide all data points ('point.show=false' also has similar effect)
     *      point: false,
     *
     *      // show data points for only indicated datas
     *      point: [
     *          "data1", "data3"
     *      ],
     *
     *      zerobased: false
     *  }
     */
    scatter_zerobased: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * spline config options
 */
var optSpline = {
    /**
     * Set spline options
     * - **Available interpolation type values:**
     *  - basis (d3.curveBasis)
     *  - basis-closed (d3.curveBasisClosed)
     *  - basis-open (d3.curveBasisOpen)
     *  - bundle (d3.curveBundle)
     *  - cardinal (d3.curveCardinal)
     *  - cardinal-closed (d3.curveCardinalClosed)
     *  - cardinal-open (d3.curveCardinalOpen)
     *  - catmull-rom (d3.curveCatmullRom)
     *  - catmull-rom-closed (d3.curveCatmullRomClosed)
     *  - catmull-rom-open (d3.curveCatmullRomOpen)
     *  - monotone-x (d3.curveMonotoneX)
     *  - monotone-y (d3.curveMonotoneY)
     *  - natural (d3.curveNatural)
     *  - linear-closed (d3.curveLinearClosed)
     *  - linear (d3.curveLinear)
     *  - step (d3.curveStep)
     *  - step-after (d3.curveStepAfter)
     *  - step-before (d3.curveStepBefore)
     * @name spline
     * @memberof Options
     * @type {object}
     * @property {object} spline Spline object
     * @property {object} spline.interpolation Spline interpolation object
     * @property {string} [spline.interpolation.type="cardinal"] Interpolation type
     * @see [Interpolation (d3 v4)](http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502)
     * @example
     *  spline: {
     *      interpolation: {
     *          type: "cardinal"
     *      }
     *  }
     */
    spline_interpolation_type: "cardinal"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * arc config options
 */
var optArc = {
    /**
     * Set arc options
     * @name arc
     * @memberof Options
     * @type {object}
     * @property {object} arc Arc object
     * @property {number|Function} [arc.cornerRadius=0] Set corner radius of Arc(donut/gauge/pie/polar) shape.
     *  - **NOTE:**
     * 	  - Corner radius can't surpass the `(outerRadius - innerRadius) /2` of indicated shape.
     * @property {number} [arc.cornerRadius.ratio=0] Set ratio relative of outer radius.
     * @property {object} [arc.needle] Set needle options.
     * @property {boolean} [arc.needle.show=false] Show or hide needle.
     * @property {string} [arc.needle.color] Set needle filled color.
     * @property {Function} [arc.needle.path] Set custom needle path function.
     *  - **NOTE:**
     *   - The path should be starting from 0,0 (which is center) to top center coordinate.
     *   - The function will receive, `length`{number} parameter which indicating the needle length in pixel relative to radius.
     * @property {number} [arc.needle.value] Set needle value.
     *  - **NOTE:**
     *   - For single gauge chart, needle will point the data value by default, otherwise will point 0(zero).
     * @property {number} [arc.needle.length=100] Set needle length in percentages relative to radius.
     * @property {object} [arc.needle.top] Set needle top options.
     * @property {number} [arc.needle.top.rx=0] Set needle top [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
     * @property {number} [arc.needle.top.ry=0] Set needle top [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
     * @property {number} [arc.needle.top.width=0] Set needle top width in pixel.
     * @property {object} [arc.needle.bottom] Set needle bottom options.
     * @property {number} [arc.needle.bottom.rx=1] Set needle bottom [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
     * @property {number} [arc.needle.bottom.ry=1] Set needle bottom [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
     * @property {number} [arc.needle.bottom.width=15] Set needle bottom width in pixel.
     * @property {number} [arc.needle.bottom.len=0] Set needle bottom length in pixel. Setting this value, will make bottom larger starting from center.
     * @property {object} [arc.rangeText] Set rangeText options.
     * @property {Array} [arc.rangeText.values] Set range text values to be shown around Arc.
     * - When `unit: 'absolute'`: Given values are treated as absolute values.
     * - When `unit: '%'`: Given values are treated as percentages.
     * @property {string} [arc.rangeText.unit="absolute"] Specify the range text unit.
     * - "absolute": Show absolute value
     * - "%": Show percentage value
     * @property {boolean} [arc.rangeText.fiexed=false] Set if range text shown will be fixed w/o data toggle update. Only available for gauge chart.
     * @property {Function} [arc.rangeText.format] Set format function for the range text.
     * @property {number} [arc.rangeText.position] Set position function or object for the range text.
     * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutCornerRadius)
     * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#PieChartOptions.CornerRadius)
     * @see [Demo: Donut needle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutNeedle)
     * @see [Demo: Donut RangeText](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutRangeText)
     * @see [Demo: Gauge corner radius](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeCornerRadius)
     * @see [Demo: Gauge needle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeNeedle)
     * @see [Demo: Gauge RangeText](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeRangeText)
     * @example
     *  arc: {
     *      cornerRadius: 12,
     *
     *      // can customize corner radius for each data with function callback
     *      //
     *      // The function will receive:
     *      // - id {string}: Data id
     *      // - value {number}: Data value
     *      // - outerRadius {number}: Outer radius value
     *      cornerRadius: function(id, value, outerRadius) {
     *          return (id === "data1" && value > 10) ?
     *          	50 : outerRadius * 1.2;
     *      },
     *
     *      // set ratio relative of outer radius
     *      cornerRadius: {
     *          ratio: 0.5
     *      },
     *
     *      needle: {
     *       	show: true,
     *       	color: "red", // any valid CSS color
     *       	path: function(length) {
     *       	  const len = length - 20;
     *
     *       	  // will return upper arrow shape path
     *       	  // Note: The path should begun from '0,0' coordinate to top center.
     *       	  const path = `M 0 -${len + 20}
     *       		L -12 -${len}
     *       		L -5 -${len}
     *       		L -5 0
     *       		A 1 1 0 0 0 5 0
     *       		L 5 -${len}
     *       		L 12 -${len} Z`;
     *
     *       	  return path;
     *       	},
     *       	value: 40,  // will make needle to point value 40.
     *       	length: 80, // needle length in percentages relative to radius.
     *
     *       	top: {
     *       	  // rx and ry are the two radii of the ellipse;
     *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
     *       	  rx: 1,
     *       	  ry: 1,
     *       	  width: 5
     *       	},
     *       	bottom: {
     *       	  // rx and ry are the two radii of the ellipse;
     *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
     *       	  rx: 1,
     *       	  ry: 1,
     *       	  width: 10
     *       	  len: 10
     *       	}
     *      },
     *
     *      rangeText: {
     *       	values: [15, 30, 50, 75, 95],
     *       	unit: "%",
     *       	fixed: false, // only available for gauge chart
     *       	format: function(v) {
     *       	  return v === 15 ? "Fifteen" : v;
     *       	},
     *
     *       	position: function(v) {
     *       	  return v === 15 ? {x: 20, y: 10} : null; // can return one props value also.
     *       	},
     *       	position: {x: 10, y: 15},
     *       	position: {x: 10}
     *      }
     *  }
     */
    arc_cornerRadius: 0,
    arc_cornerRadius_ratio: 0,
    arc_needle_show: false,
    arc_needle_color: undefined,
    arc_needle_value: undefined,
    arc_needle_path: undefined,
    arc_needle_length: 100,
    arc_needle_top_rx: 0,
    arc_needle_top_ry: 0,
    arc_needle_top_width: 0,
    arc_needle_bottom_rx: 1,
    arc_needle_bottom_ry: 1,
    arc_needle_bottom_width: 15,
    arc_needle_bottom_len: 0,
    arc_rangeText_values: undefined,
    arc_rangeText_unit: "absolute",
    arc_rangeText_fixed: false,
    arc_rangeText_format: undefined,
    arc_rangeText_position: undefined
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * donut config options
 */
var optDonut = {
    /**
     * Set donut options
     * @name donut
     * @memberof Options
     * @type {object}
     * @property {object} donut Donut object
     * @property {boolean} [donut.label.show=true] Show or hide label on each donut piece.
     * @property {Function} [donut.label.format] Set formatter for the label on each donut piece.
     * @property {number} [donut.label.threshold=0.05] Set threshold ratio to show/hide labels.
     * @property {number|Function} [donut.label.ratio=undefined] Set ratio of labels position.
     * @property {boolean} [donut.expand=true] Enable or disable expanding donut pieces.
     * @property {number} [donut.expand.rate=0.98] Set expand rate.
     * @property {number} [donut.expand.duration=50] Set expand transition time in ms.
     * @property {number} [donut.width] Set width of donut chart.
     * @property {string} [donut.title=""] Set title of donut chart. Use `\n` character for line break.
     *  - **NOTE:**
     *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
     * @property {number} [donut.padAngle=0] Set padding between data.
     * @property {number} [donut.startingAngle=0] Set starting angle where data draws.
     * @example
     *  donut: {
     *      label: {
     *          show: false,
     *          format: function(value, ratio, id) {
     *              return d3.format("$")(value);
     *
     *              // to multiline, return with '\n' character
     *              // return value +"%\nLine1\n2Line2";
     *          },
     *
     *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
     *          // if data value is below than 0.1, text label will be hidden.
     *          threshold: 0.1,
     *
     *          // set ratio callback. Should return ratio value
     *          ratio: function(d, radius, h) {
     *          	...
     *          	return ratio;
     *          },
     *          // or set ratio number
     *          ratio: 0.5
     *      },
     *
     *      // disable expand transition for interaction
     *      expand: false,
     *
     *      expand: {
     *      	// set duration of expand transition to 500ms.
     *          duration: 500,
     *
     *      	// set expand area rate
     *          rate: 1
     *      },
     *
     *      width: 10,
     *      padAngle: 0.2,
     *      startingAngle: 1,
     *      title: "Donut Title"
     *
     *      // when 'arc.needle.show=true' is set, can show current needle value.
     *      title: "Needle value:\n{=NEEDLE_VALUE}",
     *
     *      // title with line break
     *      title: "Title1\nTitle2"
     *  }
     */
    donut_label_show: true,
    donut_label_format: undefined,
    donut_label_threshold: 0.05,
    donut_label_ratio: undefined,
    donut_width: undefined,
    donut_title: "",
    donut_expand: {},
    donut_expand_rate: 0.98,
    donut_expand_duration: 50,
    donut_padAngle: 0,
    donut_startingAngle: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * funnel config options
 */
var optFunnel = {
    /**
     * Set funnel options
     * @name funnel
     * @memberof Options
     * @type {object}
     * @property {object} funnel Funnel object
     * @property {number} [funnel.neck.width=0] Set funnel neck width.
     * @property {number} [funnel.neck.height=0] Set funnel neck height.
     * @property {number} [funnel.neck.width.ratio] Set funnel neck width in ratio.
     * @property {number} [funnel.neck.height.ratio] Set funnel neck height in ratio.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
     * @example
     *  funnel: {
     *      neck: {
     *          width: 200,
     *          height: 100,
     *
     *          // or specify as ratio value (relative to the chart size)
     *          width: {
     *            ratio: 0.5
     *          },
     *          height: {
     *            ratio: 0.5
     *          }
     *      }
     *  }
     */
    funnel_neck_width: 0,
    funnel_neck_height: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * gauge config options
 */
var optGauge = {
    /**
     * Set gauge options
     * @name gauge
     * @memberof Options
     * @type {object}
     * @property {object} gauge Gauge object
     * @property {boolean} [gauge.background=""] Set background color. (The `.bb-chart-arcs-background` element)
     * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
     * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
     * @property {Function} [gauge.label.extents] Set customized min/max label text.
     * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.<br>
     * Will pass following arguments to the given function:
     * - value {number}: absolute value
     * - ratio {number}: value's ratio
     * - id {string}: data's id value
     * @property {number|Function} [gauge.label.ratio=undefined] Set ratio of labels position.
     * @property {number} [gauge.label.threshold=0] Set threshold ratio to show/hide labels.
     * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
     * @property {number} [gauge.expand.rate=0.98] Set expand rate.
     * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
     * @property {boolean} [gauge.enforceMinMax=false] Enforce to given min/max value.
     * - When `gauge.min=50` and given value is `30`, gauge will render as empty value.
     * - When `gauge.max=100` and given value is `120`, gauge will render till 100, not surpassing max value.
     * @property {number} [gauge.min=0] Set min value of the gauge.
     * @property {number} [gauge.max=100] Set max value of the gauge.
     * @property {number} [gauge.startingAngle=-1 * Math.PI / 2] Set starting angle where data draws.
     *
     * **Limitations:**
     * - when `gauge.fullCircle=false`:
     *   - -1 * Math.PI / 2 <= startingAngle <= Math.PI / 2
     *   - `startingAngle <= -1 * Math.PI / 2` defaults to `-1 * Math.PI / 2`
     *   - `startingAngle >= Math.PI / 2` defaults to `Math.PI / 2`
     * - when `gauge.fullCircle=true`:
     *   - -1 * Math.PI < startingAngle < Math.PI
     *   - `startingAngle < -1 * Math.PI` defaults to `Math.PI`
     *   - `startingAngle >  Math.PI` defaults to `Math.PI`
     * @property {number} [gauge.arcLength=100] Set the length of the arc to be drawn in percent from -100 to 100.<br>
     * Negative value will draw the arc **counterclockwise**. Need to be used in conjunction with `gauge.fullCircle=true`.
     *
     * **Limitations:**
     * - -100 <= arcLength (in percent) <= 100
     * - 'arcLength < -100' defaults to -100
     * - 'arcLength > 100' defaults to 100
     * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character for line break.
     *  - **NOTE:**
     *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
     * @property {string} [gauge.units] Set units of the gauge.
     * @property {number} [gauge.width] Set width of gauge chart.
     * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
     * **Available Values:**
     * - single
     * - multi
     * @property {number} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
     * @see [Demo: enforceMinMax, min/max](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeMinMax)
     * @see [Demo: archLength](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeArcLength)
     * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeStartingAngle)
     * @see [Demo: labelRatio](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeLabelRatio)
     * @example
     *  gauge: {
     *      background: "#eee", // will set 'fill' css prop for '.bb-chart-arcs-background' classed element.
     *      fullCircle: false,
     *      label: {
     *          show: false,
     *          format: function(value, ratio, id) {
     *              return value;
     *
     *              // to multiline, return with '\n' character
     *              // return value +"%\nLine1\n2Line2";
     *          },
     *
     *           extents: function(value, isMax) {
     *              return (isMax ? "Max:" : "Min:") + value;
     *          },
     *
     *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
     *          // if data value is below than 0.1, text label will be hidden.
     *          threshold: 0.1,
     *
     *          // set ratio callback. Should return ratio value
     *          ratio: function(d, radius, h) {
     *              ...
     *              return ratio;
     *          },
     *          // or set ratio number
     *          ratio: 0.5
     *      },
     *
     *      // disable expand transition for interaction
     *      expand: false,
     *
     *      expand: {
     *      	// set duration of expand transition to 500ms.
     *          duration: 500,
     *
     *      	// set expand area rate
     *          rate: 1
     *      },
     *
     *      // enforce min/max value.
     * 		// when given value < min, will render as empty value.
     * 		// when value > max, will render to given max value not surpassing it.
     *      enforceMinMax: true,
     *
     *      min: -100,
     *      max: 200,
     *      type: "single"  // or 'multi'
     *      title: "Title Text",
     *
     *      // when 'arc.needle.show=true' is set, can show current needle value.
     *      title: "Needle value:\n{=NEEDLE_VALUE}",
     *
     *      units: "%",
     *      width: 10,
     *      startingAngle: -1 * Math.PI / 2,
     *      arcLength: 100,
     *      arcs: {
     *          minWidth: 5
     *      }
     *  }
     */
    gauge_background: "",
    gauge_fullCircle: false,
    gauge_label_show: true,
    gauge_label_extents: undefined,
    gauge_label_format: undefined,
    gauge_label_ratio: undefined,
    gauge_label_threshold: 0,
    gauge_enforceMinMax: false,
    gauge_min: 0,
    gauge_max: 100,
    gauge_type: "single",
    gauge_startingAngle: -1 * Math.PI / 2,
    gauge_arcLength: 100,
    gauge_title: "",
    gauge_units: undefined,
    gauge_width: undefined,
    gauge_arcs_minWidth: 5,
    gauge_expand: {},
    gauge_expand_rate: 0.98,
    gauge_expand_duration: 50
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * pie config options
 */
var optPie = {
    /**
     * Set pie options
     * @name pie
     * @memberof Options
     * @type {object}
     * @property {object} pie Pie object
     * @property {boolean} [pie.label.show=true] Show or hide label on each pie piece.
     * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
     * @property {number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
     * @property {number} [pie.label.threshold=0.05] Set threshold ratio to show/hide labels.
     * @property {boolean|object} [pie.expand=true] Enable or disable expanding pie pieces.
     * @property {number} [pie.expand.rate=0.98] Set expand rate.
     * @property {number} [pie.expand.duration=50] Set expand transition time in ms.
     * @property {number|object} [pie.innerRadius=0] Sets the inner radius of pie arc.
     * @property {number|object|undefined} [pie.outerRadius=undefined] Sets the outer radius of pie arc.
     * @property {number} [pie.padAngle=0] Set padding between data.
     * @property {number} [pie.padding=0] Sets the gap between pie arcs.
     * @property {number} [pie.startingAngle=0] Set starting angle where data draws.
     * @see [Demo: expand.rate](https://naver.github.io/billboard.js/demo/#PieChartOptions.ExpandRate)
     * @see [Demo: innerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.InnerRadius)
     * @see [Demo: outerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.OuterRadius)
     * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#PieChartOptions.StartingAngle)
     * @example
     *  pie: {
     *      label: {
     *          show: false,
     *          format: function(value, ratio, id) {
     *              return d3.format("$")(value);
     *
     *              // to multiline, return with '\n' character
     *              // return value +"%\nLine1\n2Line2";
     *          },
     *
     *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
     *          // if data value is below than 0.1, text label will be hidden.
     *          threshold: 0.1,
     *
     *          // set ratio callback. Should return ratio value
     *          ratio: function(d, radius, h) {
     *              ...
     *              return ratio;
     *          },
     *          // or set ratio number
     *          ratio: 0.5
     *      },
     *
     *      // disable expand transition for interaction
     *      expand: false,
     *
     *      expand: {
     *      	// set duration of expand transition to 500ms.
     *          duration: 500,
     *
     *      	// set expand area rate
     *          rate: 1
     *      },
     *
     *      innerRadius: 0,
     *
     *      // set different innerRadius for each data
     *      innerRadius: {
     *      	data1: 10,
     *      	data2: 0
     *      },
     *
     *      outerRadius: 100,
     *
     *      // set different outerRadius for each data
     *      outerRadius: {
     *      	data1: 50,
     *      	data2: 100
     *      }
     *
     *      padAngle: 0.1,
     *      padding: 0,
     *      startingAngle: 1
     *  }
     */
    pie_label_show: true,
    pie_label_format: undefined,
    pie_label_ratio: undefined,
    pie_label_threshold: 0.05,
    pie_expand: {},
    pie_expand_rate: 0.98,
    pie_expand_duration: 50,
    pie_innerRadius: 0,
    pie_outerRadius: undefined,
    pie_padAngle: 0,
    pie_padding: 0,
    pie_startingAngle: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * polar config options
 */
var optPolar = {
    /**
     * Set polar options
     * @name polar
     * @memberof Options
     * @type {object}
     * @property {object} polar Polar object
     * @property {boolean} [polar.label.show=true] Show or hide label on each polar piece.
     * @property {Function} [polar.label.format] Set formatter for the label on each polar piece.
     * @property {number} [polar.label.threshold=0.05] Set threshold ratio to show/hide labels.
     * @property {number|Function} [polar.label.ratio=undefined] Set ratio of labels position.
     * @property {number} [polar.level.depth=3] Set the level depth.
     * @property {boolean} [polar.level.show=true] Show or hide level.
     * @property {string} [polar.level.text.backgroundColor="#fff"] Set label text's background color.
     * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
     * @property {boolean} [polar.level.text.show=true] Show or hide level text.
     * @property {number} [polar.padAngle=0] Set padding between data.
     * @property {number} [polar.padding=0] Sets the gap between pie arcs.
     * @property {number} [polar.startingAngle=0] Set starting angle where data draws.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
     * @example
     *  polar: {
     *      label: {
     *          show: false,
     *          format: function(value, ratio, id) {
     *              return d3.format("$")(value);
     *
     *              // to multiline, return with '\n' character
     *              // return value +"%\nLine1\n2Line2";
     *          },
     *
     *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
     *          // if data value is below than 0.1, text label will be hidden.
     *          threshold: 0.1,
     *
     *          // set ratio callback. Should return ratio value
     *          ratio: function(d, radius, h) {
     *              ...
     *              return ratio;
     *          },
     *          // or set ratio number
     *          ratio: 0.5
     *      },
     *      level: {
     *          depth: 3,
     *          max: 500,
     *          show: true,
     *          text: {
     *              format: function(x) {
     *                  return x + "%";
     *              },
     *              show: true,
     *              backgroundColor: "red"
     *          }
     *      },
     *      padAngle: 0.1,
     *      padding: 0,
     *      startingAngle: 1
     *  }
     */
    polar_label_show: true,
    polar_label_format: undefined,
    polar_label_threshold: 0.05,
    polar_label_ratio: undefined,
    polar_level_depth: 3,
    polar_level_max: undefined,
    polar_level_show: true,
    polar_level_text_backgroundColor: "#fff",
    polar_level_text_format: function (x) { return (x % 1 === 0 ? x : x.toFixed(2)); },
    polar_level_text_show: true,
    polar_padAngle: 0,
    polar_padding: 0,
    polar_startingAngle: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * radar config options
 */
var optRadar = {
    /**
     * Set radar options
     * - **NOTE:**
     *  > When x tick text contains `\n`, it's used as line break.
     * @name radar
     * @memberof Options
     * @type {object}
     * @property {object} radar Radar object
     * @property {number} [radar.axis.max=undefined] The max value of axis. If not given, it'll take the max value from the given data.
     * @property {boolean} [radar.axis.line.show=true] Show or hide axis line.
     * @property {number} [radar.axis.text.position.x=0] x coordinate position, relative the original.
     * @property {number} [radar.axis.text.position.y=0] y coordinate position, relative the original.
     * @property {boolean} [radar.axis.text.show=true] Show or hide axis text.
     * @property {boolean} [radar.direction.clockwise=false] Set the direction to be drawn.
     * @property {number} [radar.level.depth=3] Set the level depth.
     * @property {boolean} [radar.level.show=true] Show or hide level.
     * @property {Function} [radar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
     * @property {boolean} [radar.level.text.show=true] Show or hide level text.
     * @property {number} [radar.size.ratio=0.87] Set size ratio.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.RadarChart)
     * @see [Demo: radar axis](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxis)
     * @see [Demo: radar level](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarLevel)
     * @see [Demo: radar size](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarSize)
     * @see [Demo: radar axis multiline](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxisMultiline)
     * @example
     *  radar: {
     *      axis: {
     *          max: 50,
     *          line: {
     *              show: false
     *          },
     *          text: {
     *              position: {
     *              	x: 0,
     *              	y: 0
     *              },
     *              show: false
     *          }
     *      },
     *      direction: {
     *          clockwise: true
     *      },
     *      level: {
     *          show: false,
     *          text: {
     *              format: function(x) {
     *                  return x + "%";
     *              },
     *              show: true
     *          }
     *      },
     *      size: {
     *          ratio: 0.7
     *      }
     *  }
     */
    radar_axis_max: undefined,
    radar_axis_line_show: true,
    radar_axis_text_show: true,
    radar_axis_text_position: {},
    radar_level_depth: 3,
    radar_level_show: true,
    radar_level_text_format: function (x) { return (x % 1 === 0 ? x : x.toFixed(2)); },
    radar_level_text_show: true,
    radar_size_ratio: 0.87,
    radar_direction_clockwise: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * treemap config options
 */
var optTreemap = {
    /**
     * Set treemap options
     * @name treemap
     * @memberof Options
     * @type {object}
     * @property {object} treemap Treemap object
     * @property {string} [treemap.tile="binary"] Treemap tile type
     * - **Available tile type values:**
     * 	- binary ([d3.treemapBinary](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapBinary))
     * 	- dice ([d3.treemapDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapDice))
     * 	- slice ([d3.treemapSlice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSlice))
     * 	- sliceDice ([d3.treemapSliceDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSliceDice))
     * 	- squrify ([d3.treemapSquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSquarify))
     * 	- resquarify ([d3.treemapResquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapResquarify))
     * @property {Function} [treemap.label.format] Set formatter for the label text.
     * @property {number} [treemap.label.threshold=0.05] Set threshold ratio to show/hide labels text.
     * @property {number} [treemap.label.show=true] Show or hide label text.
     * @see [Demo: treemap](https://naver.github.io/billboard.js/demo/#Chart.TreemapChart)
     * @example
     *  treemap: {
     *      // "binary", "dice", "slice", "sliceDice", "squrify", "resquarify"
     *      tile: "dice",
     *
     *      label: {
     *          // show or hide label text
     *          show: false,
     *
     *          // set label text formatter
     *          format: function(value, ratio, id) {
     *              return d3.format("$")(value);
     *
     *              // to multiline, return with '\n' character
     *              // return value +"%\nLine1\n2Line2";
     *          },
     *
     *          // set ratio number
     *          ratio: 0.05
     *      }
     *  }
     */
    treemap_tile: "binary",
    treemap_label_format: undefined,
    treemap_label_threshold: 0.05,
    treemap_label_show: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendAxis(module, option) {
    extend(ChartInternal.prototype, Object.values(internal).concat(module));
    extend(Chart.prototype, api);
    Options.setOptions(Object.values(options).concat(option || []));
}
/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendLine(module, option) {
    extendAxis([shapePointCommon, shapePoint, shapeLine].concat(module || []));
    Options.setOptions([optPoint, optLine].concat(option || []));
}
/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendArc(module, option) {
    extend(ChartInternal.prototype, [shapeArc, shapePointCommon].concat(module || []));
    Options.setOptions([optPoint].concat(option || []));
}
// Area types
var area = function () { return (extendLine(shapeArea, [optArea]), (area = function () { return TYPE.AREA; })()); };
var areaLineRange = function () { return (extendLine(shapeArea, [optArea]), (areaLineRange = function () { return TYPE.AREA_LINE_RANGE; })()); };
var areaStepRange = function () { return (extendLine(shapeArea, [optArea]), (areaStepRange = function () { return TYPE.AREA_STEP_RANGE; })()); };
var areaSpline = function () { return (extendLine(shapeArea, [optArea, optSpline]), (areaSpline = function () { return TYPE.AREA_SPLINE; })()); };
var areaSplineRange = function () { return (extendLine(shapeArea, [optArea, optSpline]), (areaSplineRange = function () { return TYPE.AREA_SPLINE_RANGE; })()); };
var areaStep = function () { return (extendLine(shapeArea, [optArea]), (areaStep = function () { return TYPE.AREA_STEP; })()); };
// Line types
var line = function () { return (extendLine(), (line = function () { return TYPE.LINE; })()); };
var spline = function () { return (extendLine(undefined, [optSpline]), (spline = function () { return TYPE.SPLINE; })()); };
var step = function () { return (extendLine(), (step = function () { return TYPE.STEP; })()); };
// Arc types
var donut = function () { return (extendArc(undefined, [optArc, optDonut]), (donut = function () { return TYPE.DONUT; })()); };
var gauge = function () { return (extendArc([shapeGauge], [optArc, optGauge]), (gauge = function () { return TYPE.GAUGE; })()); };
var pie = function () { return (extendArc(undefined, [optArc, optPie]), (pie = function () { return TYPE.PIE; })()); };
var polar = function () { return (extendArc([shapePolar], [optArc, optPolar]), (polar = function () { return TYPE.POLAR; })()); };
var radar = function () { return (extendArc([internal.eventrect, shapePoint, shapeRadar], [optPoint, optRadar, { axis_x_categories: options.optAxis.axis_x_categories }]), (radar = function () { return TYPE.RADAR; })()); };
// Axis based types
var bar = function () { return (extendAxis([shapeBar, shapePointCommon], [optBar, optPoint]), (bar = function () { return TYPE.BAR; })()); };
var bubble = function () { return (extendAxis([shapePointCommon, shapePoint, shapeBubble], [optBubble, optPoint]), (bubble = function () { return TYPE.BUBBLE; })()); };
var candlestick = function () { return (extendAxis([shapeCandlestick, shapePointCommon], [optCandlestick, optPoint]), (candlestick = function () { return TYPE.CANDLESTICK; })()); };
var scatter = function () { return (extendAxis([shapePointCommon, shapePoint], [optPoint, optScatter]), (scatter = function () { return TYPE.SCATTER; })()); };
// Non Axis based types
var funnel = function () { return (extendArc([shapeFunnel], [optFunnel]), (funnel = function () { return TYPE.FUNNEL; })()); };
var treemap = function () { return (extendAxis([shapeTreemap], [optTreemap]), (treemap = function () { return TYPE.TREEMAP; })()); };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Toggler function to select or unselect
 * @param {boolean} isSelection Weather select or unselect
 * @param {Array} ids Target ids
 * @param {Array} indices Indices number
 * @param {boolean} resetOther Weather reset other selected points (only for selection)
 * @private
 */
function setSelection(isSelection, ids, indices, resetOther) {
    if (isSelection === void 0) { isSelection = false; }
    var $$ = this;
    var config = $$.config, main = $$.$el.main;
    var selectionGrouped = config.data_selection_grouped;
    var isSelectable = config.data_selection_isselectable.bind($$.api);
    if (!config.data_selection_enabled) {
        return;
    }
    main.selectAll(".".concat($SHAPE.shapes))
        .selectAll(".".concat($SHAPE.shape))
        .each(function (d) {
        var shape = select(this);
        var _a = d.data ? d.data : d, id = _a.id, index = _a.index;
        var toggle = $$.getToggle(this, d).bind($$);
        var isTargetId = selectionGrouped || !ids || ids.indexOf(id) >= 0;
        var isTargetIndex = !indices || indices.indexOf(index) >= 0;
        var isSelected = shape.classed($SELECT.SELECTED);
        // line/area selection not supported yet
        if (shape.classed($LINE.line) || shape.classed($AREA.area)) {
            return;
        }
        if (isSelection) {
            if (isTargetId && isTargetIndex && isSelectable(d) && !isSelected) {
                toggle(true, shape.classed($SELECT.SELECTED, true), d, index);
            }
            else if (isDefined(resetOther) && resetOther && isSelected) {
                toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
            }
        }
        else {
            if (isTargetId && isTargetIndex && isSelectable(d) && isSelected) {
                toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
            }
        }
    });
}
var apiSelection = {
    /**
     * Get selected data points.<br><br>
     * By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
     * @function selected
     * @instance
     * @memberof Chart
     * @param {string} [targetId] You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
     * @returns {Array} dataPoint Array of the data points.<br>ex.) `[{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ...]`
     * @example
     *  // all selected data points will be returned.
     *  chart.selected();
     *  // --> ex.) [{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ... ]
     *
     *  // all selected data points of data1 will be returned.
     *  chart.selected("data1");
     */
    selected: function (targetId) {
        var $$ = this.internal;
        var dataPoint = [];
        $$.$el.main.selectAll(".".concat($SHAPE.shapes + $$.getTargetSelectorSuffix(targetId)))
            .selectAll(".".concat($SHAPE.shape))
            .filter(function () {
            return select(this).classed($SELECT.SELECTED);
        })
            .each(function (d) { return dataPoint.push(d); });
        return dataPoint;
    },
    /**
     * Set data points to be selected. ([`data.selection.enabled`](Options.html#.data%25E2%2580%25A4selection%25E2%2580%25A4enabled) option should be set true to use this method)
     * @function select
     * @instance
     * @memberof Chart
     * @param {string|Array} [ids] id value to get selected.
     * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
     * @param {boolean} [resetOther] Unselect already selected.
     * @example
     *  // select all data points
     *  chart.select();
     *
     *  // select all from 'data2'
     *  chart.select("data2");
     *
     *  // select all from 'data1' and 'data2'
     *  chart.select(["data1", "data2"]);
     *
     *  // select from 'data1', indices 2 and unselect others selected
     *  chart.select("data1", [2], true);
     *
     *  // select from 'data1', indices 0, 3 and 5
     *  chart.select("data1", [0, 3, 5]);
     */
    select: function (ids, indices, resetOther) {
        var $$ = this.internal;
        setSelection.bind($$)(true, ids, indices, resetOther);
    },
    /**
     * Set data points to be un-selected.
     * @function unselect
     * @instance
     * @memberof Chart
     * @param {string|Array} [ids] id value to be unselected.
     * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
     * @example
     *  // unselect all data points
     *  chart.unselect();
     *
     *  // unselect all from 'data1'
     *  chart.unselect("data1");
     *
     *  // unselect from 'data1', indices 2
     *  chart.unselect("data1", [2]);
     */
    unselect: function (ids, indices) {
        var $$ = this.internal;
        setSelection.bind($$)(false, ids, indices);
    }
};

/**
 * Select subchart by giving x domain range.
 * - **ℹ️ NOTE:**
 *  - Due to the limitations of floating point precision, domain value may not be exact returning approximately values.
 * @function subchart
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain range is given, the subchart will be seleted to the given domain. If no argument is given, the current subchart selection domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Specify domain for subchart selection
 *  chart.subchart([1, 2]);
 *
 *  // Get the current subchart selection domain range
 *  // Domain value may not be exact returning approximately values.
 *  chart.subchart();
 */
// NOTE: declared funciton assigning to variable to prevent duplicated method generation in JSDoc.
var subchart$1 = function (domainValue) {
    var _a;
    var $$ = this.internal;
    var axis = $$.axis, brush = $$.brush, config = $$.config, _b = $$.scale, x = _b.x, subX = _b.subX, state = $$.state;
    var domain;
    if (config.subchart_show) {
        domain = domainValue;
        if (Array.isArray(domain)) {
            if (axis.isTimeSeries()) {
                domain = domain.map(function (x) { return parseDate.bind($$)(x); });
            }
            var isWithinRange = $$.withinRange(domain, $$.getZoomDomain("subX", true), $$.getZoomDomain("subX"));
            if (isWithinRange) {
                state.domain = domain;
                brush.move(brush.getSelection(), domain.map(subX));
            }
        }
        else {
            domain = (_a = state.domain) !== null && _a !== void 0 ? _a : x.orgDomain();
        }
    }
    return domain;
};
extend(subchart$1, {
    /**
     * Show subchart
     * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
     * @function subchart․show
     * @instance
     * @memberof Chart
     * @example
     * // for ESM imports, needs to import 'subchart' and must be instantiated first to enable subchart's API.
     * import {subchart} from "billboard.js";
     *
     * const chart = bb.generate({
     *   ...
     *   subchart: {
     *      // need to be instantiated by calling 'subchart()'
     *      enabled: subchart()
     *
     *      // in case don't want subchart to be shown at initialization, instantiate with '!subchart()'
     *      enabled: !subchart()
     *   }
     * });
     *
     * chart.subchart.show();
     */
    show: function () {
        var _a, _b;
        var $$ = this.internal;
        var subchart = $$.$el.subchart, config = $$.config;
        var show = config.subchart_show;
        if (!show) {
            // unbind zoom event bound to chart rect area
            $$.unbindZoomEvent();
            config.subchart_show = !show;
            !subchart.main && $$.initSubchart();
            var $target = subchart.main.selectAll(".".concat($COMMON.target));
            // need to cover when new data has been loaded
            if ($$.data.targets.length !== $target.size()) {
                $$.updateSizes();
                $$.updateTargetsForSubchart($$.data.targets);
                $target = (_a = subchart.main) === null || _a === void 0 ? void 0 : _a.selectAll(".".concat($COMMON.target));
            }
            $target === null || $target === void 0 ? void 0 : $target.style("opacity", null);
            (_b = subchart.main) === null || _b === void 0 ? void 0 : _b.style("display", null);
            this.resize();
        }
    },
    /**
     * Hide generated subchart
     * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
     * @function subchart․hide
     * @instance
     * @memberof Chart
     * @example
     *  chart.subchart.hide();
     */
    hide: function () {
        var $$ = this.internal;
        var main = $$.$el.subchart.main, config = $$.config;
        if (config.subchart_show && (main === null || main === void 0 ? void 0 : main.style("display")) !== "none") {
            config.subchart_show = false;
            main.style("display", "none");
            this.resize();
        }
    },
    /**
     * Toggle the visiblity of subchart
     * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
     * @function subchart․toggle
     * @instance
     * @memberof Chart
     * @example
     * // When subchart is hidden, will be shown
     * // When subchart is shown, will be hidden
     * chart.subchart.toggle();
     */
    toggle: function () {
        var $$ = this.internal;
        var config = $$.config;
        this.subchart[config.subchart_show ? "hide" : "show"]();
    },
    /**
     * Reset subchart selection
     * @function subchart․reset
     * @instance
     * @memberof Chart
     * @example
     * // Reset subchart selection
     * chart.subchart.reset();
     */
    reset: function () {
        var $$ = this.internal;
        var brush = $$.brush;
        brush.clear(brush.getSelection());
    }
});
var apiSubchart = {
    subchart: subchart$1
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Zoom by giving x domain range.
 * - **ℹ️ NOTE:**
 *  - For `wheel` type zoom, the minimum zoom range will be set as the given domain range. To get the initial state, [.unzoom()](#unzoom) should be called.
 *  - To be used [zoom.enabled](Options.html#.zoom) option should be set as `truthy`.
 *  - When x axis type is `category`, domain range should be specified as index numbers.
 *  - Due to the limitations of floating point precision, domain value may not be exact returning approximately values.
 * @function zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain range is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Zoom to specified domain range
 *  chart.zoom([10, 20]);
 *
 *  // For timeseries x axis, the domain value can be string, but the format should match with the 'data.xFormat' option.
 *  chart.zoom(["2021-02-03", "2021-02-08"]);
 *
 *  // For category x axis, the domain value should be index number.
 *  chart.zoom([0, 3]);
 *
 *  // Get the current zoomed domain range
 *  // Domain value may not be exact returning approximately values.
 *  chart.zoom();
 */
// NOTE: declared funciton assigning to variable to prevent duplicated method generation in JSDoc.
var zoom$1 = function (domainValue) {
    var _a;
    var $$ = this.internal;
    var axis = $$.axis, config = $$.config, org = $$.org, scale = $$.scale, state = $$.state;
    var isCategorized = axis.isCategorized();
    var domain;
    if (config.zoom_enabled) {
        domain = domainValue;
        if (Array.isArray(domain)) {
            if (axis.isTimeSeries()) {
                domain = domain.map(function (x) { return parseDate.bind($$)(x); });
            }
            var isWithinRange = $$.withinRange(domain, $$.getZoomDomain("zoom", true), $$.getZoomDomain("zoom"));
            if (isWithinRange) {
                state.domain = domain;
                domain = $$.getZoomDomainValue(domain);
                // hide any possible tooltip show before the zoom
                $$.api.tooltip.hide();
                if (config.subchart_show) {
                    var x = scale.zoom || scale.x;
                    $$.brush.getSelection().call($$.brush.move, domain.map(x));
                    // resultDomain = domain;
                }
                else {
                    // in case of 'config.zoom_rescale=true', use org.xScale
                    var x = isCategorized ? scale.x.orgScale() : (org.xScale || scale.x);
                    $$.updateCurrentZoomTransform(x, domain);
                }
                $$.setZoomResetButton();
            }
        }
        else {
            domain = $$.zoom.getDomain();
        }
    }
    return (_a = state.domain) !== null && _a !== void 0 ? _a : domain;
};
extend(zoom$1, {
    /**
     * Enable and disable zooming.
     * @function zoom․enable
     * @instance
     * @memberof Chart
     * @param {string|boolean} enabled Possible string values are "wheel" or "drag". If enabled is true, "wheel" will be used. If false is given, zooming will be disabled.<br>When set to false, the current zooming status will be reset.
     * @example
     *  // Enable zooming using the mouse wheel
     *  chart.zoom.enable(true);
     *  // Or
     *  chart.zoom.enable("wheel");
     *
     *  // Enable zooming by dragging
     *  chart.zoom.enable("drag");
     *
     *  // Disable zooming
     *  chart.zoom.enable(false);
     */
    enable: function (enabled) {
        var $$ = this.internal;
        var config = $$.config;
        if (/^(drag|wheel)$/.test(enabled)) {
            config.zoom_type = enabled;
        }
        config.zoom_enabled = !!enabled;
        if (!$$.zoom) {
            $$.initZoom();
            $$.bindZoomEvent();
        }
        else if (enabled === false) {
            $$.bindZoomEvent(false);
        }
        $$.updateAndRedraw();
    },
    /**
     * Set or get x Axis maximum zoom range value
     * @function zoom․max
     * @instance
     * @memberof Chart
     * @param {number} [max] maximum value to set for zoom
     * @returns {number} zoom max value
     * @example
     *  // Set maximum range value
     *  chart.zoom.max(20);
     */
    max: function (max) {
        var $$ = this.internal;
        var config = $$.config, xDomain = $$.org.xDomain;
        if (max === 0 || max) {
            config.zoom_x_max = getMinMax$1("max", [xDomain[1], max]);
        }
        return config.zoom_x_max;
    },
    /**
     * Set or get x Axis minimum zoom range value
     * @function zoom․min
     * @instance
     * @memberof Chart
     * @param {number} [min] minimum value to set for zoom
     * @returns {number} zoom min value
     * @example
     *  // Set minimum range value
     *  chart.zoom.min(-1);
     */
    min: function (min) {
        var $$ = this.internal;
        var config = $$.config, xDomain = $$.org.xDomain;
        if (min === 0 || min) {
            config.zoom_x_min = getMinMax$1("min", [xDomain[0], min]);
        }
        return config.zoom_x_min;
    },
    /**
     * Set zoom range
     * @function zoom․range
     * @instance
     * @memberof Chart
     * @param {object} [range] zoom range
     * @returns {object} zoom range value
     * {
     *   min: 0,
     *   max: 100
     * }
     * @example
     *  chart.zoom.range({
     *      min: 10,
     *      max: 100
     *  });
     */
    range: function (range) {
        var zoom = this.zoom;
        if (isObject(range)) {
            var min = range.min, max = range.max;
            isDefined(min) && zoom.min(min);
            isDefined(max) && zoom.max(max);
        }
        return {
            min: zoom.min(),
            max: zoom.max()
        };
    }
});
var apiZoom = {
    zoom: zoom$1,
    /**
     * Unzoom zoomed area
     * - **NOTE:** Calling .unzoom() will not trigger zoom events.
     * @function unzoom
     * @instance
     * @memberof Chart
     * @example
     *  chart.unzoom();
     */
    unzoom: function () {
        var $$ = this.internal;
        var config = $$.config, _a = $$.$el, eventRect = _a.eventRect, zoomResetBtn = _a.zoomResetBtn, zoom = $$.scale.zoom, state = $$.state;
        if (zoom) {
            config.subchart_show ?
                $$.brush.getSelection().call($$.brush.move, null) :
                $$.zoom.updateTransformScale(zoomIdentity);
            $$.updateZoom(true);
            zoomResetBtn === null || zoomResetBtn === void 0 ? void 0 : zoomResetBtn.style("display", "none");
            // reset transform
            if (zoomTransform(eventRect.node()) !== zoomIdentity) {
                $$.zoom.transform(eventRect, zoomIdentity);
            }
            state.domain = undefined;
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var subchart = {
    /**
     * Initialize the brush.
     * @private
     */
    initBrush: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale, subchart = $$.$el.subchart, state = $$.state;
        var isRotated = config.axis_rotated;
        var height = config.subchart_size_height;
        var lastDomain;
        var lastSelection;
        var timeout;
        // set the brush
        $$.brush = (isRotated ? brushY() : brushX()).handleSize(5);
        // bind brush event
        $$.brush.on("start brush end", function (event) {
            var selection = event.selection, sourceEvent = event.sourceEvent, target = event.target, type = event.type;
            if (type === "start") {
                $$.state.inputType === "touch" && $$.hideTooltip();
                lastSelection = sourceEvent ? selection : null;
                // sourceEvent && (state.domain = null);
            }
            // if (type === "brush") {
            if (/(start|brush)/.test(type)) {
                // when brush selection updates happens on one edge, update only chainging edge and
                // is only for adjustment of given domain range to be used to return current domain range.
                type === "brush" && sourceEvent && state.domain &&
                    (lastSelection === null || lastSelection === void 0 ? void 0 : lastSelection.forEach(function (v, i) {
                        if (v !== selection[i]) {
                            state.domain[i] = scale.x.orgDomain()[i];
                        }
                    }));
                $$.redrawForBrush(type !== "start");
            }
            if (type === "end") {
                lastDomain = scale.x.orgDomain();
            }
            // handle brush's handle position & visibility
            if (target === null || target === void 0 ? void 0 : target.handle) {
                if (selection === null) {
                    $$.brush.handle.attr("display", "none");
                }
                else {
                    $$.brush.handle.attr("display", null)
                        .attr("transform", function (d, i) {
                        var pos = [selection[i], height / 2];
                        return "translate(".concat(isRotated ? pos.reverse() : pos, ")");
                    });
                }
            }
        });
        $$.brush.updateResize = function () {
            var _this = this;
            timeout && clearTimeout(timeout);
            timeout = setTimeout(function () {
                var selection = _this.getSelection();
                lastDomain && brushSelection(selection.node()) &&
                    _this.move(selection, lastDomain.map(scale.subX.orgScale()));
            }, 0);
        };
        $$.brush.update = function () {
            var _a;
            var extent = this.extent()();
            if (extent[1].filter(function (v) { return isNaN(v); }).length === 0) {
                (_a = subchart.main) === null || _a === void 0 ? void 0 : _a.select(".".concat(CLASS.brush)).call(this);
            }
            return this;
        };
        // set the brush extent
        $$.brush.scale = function (scale) {
            var h = config.subchart_size_height;
            var extent = $$.getExtent();
            if (!extent && scale.range) {
                extent = [[0, 0], [scale.range()[1], h]];
            }
            else if (isArray(extent)) {
                extent = extent.map(function (v, i) { return [v, i > 0 ? h : i]; });
            }
            // [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner
            isRotated && extent[1].reverse();
            this.extent(extent);
            // when extent updates, brush selection also be re-applied
            // https://github.com/d3/d3/issues/2918
            this.update();
        };
        $$.brush.getSelection = function () { return (
        // @ts-ignore
        subchart.main ? subchart.main.select(".".concat(CLASS.brush)) : select([])); };
    },
    /**
     * Initialize the subchart.
     * @private
     */
    initSubchart: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, clip = _a.clip, hasAxis = _a.hasAxis, _b = $$.$el, defs = _b.defs, svg = _b.svg, subchart = _b.subchart, axis = _b.axis;
        if (!hasAxis) {
            return;
        }
        var visibility = config.subchart_show ? null : "hidden";
        var clipId = "".concat(clip.id, "-subchart");
        var clipPath = $$.getClipPath(clipId);
        clip.idSubchart = clipId;
        $$.appendClip(defs, clipId);
        $$.initBrush();
        subchart.main = svg.append("g")
            .classed(CLASS.subchart, true)
            .attr("transform", $$.getTranslate("context"));
        var main = subchart.main;
        main.style("visibility", visibility);
        // Define g for chart area
        main.append("g")
            .attr("clip-path", clipPath)
            .attr("class", CLASS.chart);
        // Define g for chart types area
        ["bar", "line", "bubble", "candlestick", "scatter"].forEach(function (v) {
            var type = capitalize(/^(bubble|scatter)$/.test(v) ? "circle" : v);
            if ($$.hasType(v) || $$.hasTypeOf(type)) {
                var chart = main.select(".".concat(CLASS.chart));
                var chartClassName = CLASS["chart".concat(type, "s")];
                if (chart.select(".".concat(chartClassName)).empty()) {
                    chart
                        .append("g")
                        .attr("class", chartClassName);
                }
            }
        });
        // Add extent rect for Brush
        var brush = main.append("g")
            .attr("clip-path", clipPath)
            .attr("class", CLASS.brush)
            .call($$.brush);
        config.subchart_showHandle && $$.addBrushHandle(brush);
        // ATTENTION: This must be called AFTER chart added
        // Add Axis
        axis.subX = main.append("g")
            .attr("class", CLASS.axisX)
            .attr("transform", $$.getTranslate("subX"))
            .attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis)
            .style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
    },
    /**
     * Add brush handle
     * Enabled when: subchart.showHandle=true
     * @param {d3Selection} brush Brush selection
     * @private
     */
    addBrushHandle: function (brush) {
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var initRange = config.subchart_init_range;
        var customHandleClass = "handle--custom";
        // brush handle shape's path
        var path = isRotated ?
            [
                "M8.5 0 a6 6 0 0 0 -6 -6.5 H-2.5 a 6 6 0 0 0 -6 6.5 z m-5 -2 H-3.5 m7 -2 H-3.5z",
                "M8.5 0 a6 -6 0 0 1 -6 6.5 H-2.5 a 6 -6 0 0 1 -6 -6.5z m-5 2 H-3.5 m7 2 H-3.5z"
            ] :
            [
                "M0 -8.5 A6 6 0 0 0 -6.5 -3.5 V2.5 A6 6 0 0 0 0 8.5 Z M-2 -3.5 V3.5 M-4 -3.5 V3.5z",
                "M0 -8.5 A6 6 0 0 1 6.5 -3.5 V2.5 A6 6 0 0 1 0 8.5 Z M2 -3.5 V3.5 M4 -3.5 V3.5z"
            ];
        $$.brush.handle = brush.selectAll(".".concat(customHandleClass))
            .data(isRotated ? [{ type: "n" }, { type: "s" }] : [{ type: "w" }, { type: "e" }])
            .enter()
            .append("path")
            .attr("class", customHandleClass)
            .attr("cursor", "".concat(isRotated ? "ns" : "ew", "-resize"))
            .attr("d", function (d) { return path[+/[se]/.test(d.type)]; })
            .attr("display", initRange ? null : "none");
    },
    /**
     * Update sub chart
     * @param {object} targets $$.data.targets
     * @private
     */
    updateTargetsForSubchart: function (targets) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.subchart.main;
        if (config.subchart_show) {
            ["bar", "line", "bubble", "candlestick", "scatter"]
                .filter(function (v) { return $$.hasType(v) || $$.hasTypeOf(capitalize(v)); })
                .forEach(function (v) {
                var isPointType = /^(bubble|scatter)$/.test(v);
                var name = capitalize(isPointType ? "circle" : v);
                var chartClass = $$.getChartClass(name, true);
                var shapeClass = $$.getClass(isPointType ? "circles" : "".concat(v, "s"), true);
                var shapeChart = main.select(".".concat(CLASS["chart".concat("".concat(name, "s"))]));
                if (isPointType) {
                    var circle = shapeChart
                        .selectAll(".".concat(CLASS.circles))
                        .data(targets.filter($$["is".concat(capitalize(v), "Type")].bind($$)))
                        .attr("class", shapeClass);
                    circle.exit().remove();
                    circle.enter().append("g")
                        .attr("class", shapeClass);
                }
                else {
                    var shapeUpdate = shapeChart
                        .selectAll(".".concat(CLASS["chart".concat(name)]))
                        .attr("class", chartClass)
                        .data(targets.filter($$["is".concat(name, "Type")].bind($$)));
                    var shapeEnter = shapeUpdate.enter()
                        .append("g")
                        .style("opacity", "0")
                        .attr("class", chartClass)
                        .append("g")
                        .attr("class", shapeClass);
                    shapeUpdate.exit().remove();
                    // Area
                    v === "line" && $$.hasTypeOf("Area") &&
                        shapeEnter.append("g").attr("class", $$.getClass("areas", true));
                }
            });
            // -- Brush --//
            main.selectAll(".".concat(CLASS.brush, " rect"))
                .attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? state.width2 : state.height2);
        }
    },
    /**
     * Redraw subchart.
     * @private
     * @param {boolean} withSubchart whether or not to show subchart
     * @param {number} duration duration
     * @param {object} shape Shape's info
     */
    redrawSubchart: function (withSubchart, duration, shape) {
        var _a;
        var $$ = this;
        var config = $$.config, main = $$.$el.subchart.main, state = $$.state;
        var withTransition = !!duration;
        main.style("visibility", config.subchart_show ? null : "hidden");
        // subchart
        if (config.subchart_show) {
            // reflect main chart to extent on subchart if zoomed
            if (((_a = state.event) === null || _a === void 0 ? void 0 : _a.type) === "zoom") {
                $$.brush.update();
            }
            // update subchart elements if needed
            if (withSubchart) {
                var initRange = config.subchart_init_range;
                // extent rect
                !brushEmpty($$) && $$.brush.update();
                Object.keys(shape.type).forEach(function (v) {
                    var name = capitalize(v);
                    var drawFn = $$["generateDraw".concat(name)](shape.indices[v], true);
                    // call shape's update & redraw method
                    $$["update".concat(name)](withTransition, true);
                    $$["redraw".concat(name)](drawFn, withTransition, true);
                });
                if ($$.hasType("bubble") || $$.hasType("scatter")) {
                    var cx = shape.pos.cx;
                    var cy = $$.updateCircleY(true);
                    $$.updateCircle(true);
                    $$.redrawCircle(cx, cy, withTransition, undefined, true);
                }
                if (!state.rendered && initRange) {
                    state.domain = initRange;
                    $$.brush.move($$.brush.getSelection(), initRange.map($$.scale.x));
                }
            }
        }
    },
    /**
     * Redraw the brush.
     * @param {boolean} [callCallbck=true] Call 'onbrush' callback or not.
     * @private
     */
    redrawForBrush: function (callCallbck) {
        var _a;
        if (callCallbck === void 0) { callCallbck = true; }
        var $$ = this;
        var _b = $$.config, onBrush = _b.subchart_onbrush, withY = _b.zoom_rescale, scale = $$.scale, state = $$.state;
        $$.redraw({
            withTransition: false,
            withY: withY,
            withSubchart: false,
            withUpdateXDomain: true,
            withDimension: false
        });
        callCallbck && state.rendered &&
            onBrush.bind($$.api)((_a = state.domain) !== null && _a !== void 0 ? _a : scale.x.orgDomain());
    },
    /**
     * Transform context
     * @param {boolean} withTransition indicates transition is enabled
     * @param {object} transitions The return value of the generateTransitions method of Axis.
     * @private
     */
    transformContext: function (withTransition, transitions) {
        var $$ = this;
        var subchart = $$.$el.subchart, $T = $$.$T;
        var subXAxis = (transitions === null || transitions === void 0 ? void 0 : transitions.axisSubX) ?
            transitions.axisSubX :
            $T(subchart.main.select(".".concat(CLASS.axisX)), withTransition);
        subchart.main.attr("transform", $$.getTranslate("context"));
        subXAxis.attr("transform", $$.getTranslate("subX"));
    },
    /**
     * Get extent value
     * @returns {Array} default extent
     * @private
     */
    getExtent: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var extent = config.axis_x_extent;
        if (extent) {
            if (isFunction(extent)) {
                extent = extent.bind($$.api)($$.getXDomain($$.data.targets), scale.subX);
            }
            else if ($$.axis.isTimeSeries() && extent.every(isNaN)) {
                var fn_1 = parseDate.bind($$);
                extent = extent.map(function (v) { return scale.subX(fn_1(v)); });
            }
        }
        return extent;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var zoom = {
    /**
     * Initialize zoom.
     * @private
     */
    initZoom: function () {
        var $$ = this;
        $$.scale.zoom = null;
        $$.generateZoom();
        $$.config.zoom_type === "drag" &&
            $$.initZoomBehaviour();
    },
    /**
     * Bind zoom event
     * @param {boolean} bind Weather bind or unbound
     * @private
     */
    bindZoomEvent: function (bind) {
        if (bind === void 0) { bind = true; }
        var $$ = this;
        var config = $$.config;
        var zoomEnabled = config.zoom_enabled;
        if (zoomEnabled && bind) {
            // Do not bind zoom event when subchart is shown
            !config.subchart_show &&
                $$.bindZoomOnEventRect();
        }
        else if (bind === false) {
            $$.api.unzoom();
            $$.unbindZoomEvent();
        }
    },
    /**
     * Generate zoom
     * @private
     */
    generateZoom: function () {
        var $$ = this;
        var config = $$.config, org = $$.org, scale = $$.scale;
        var zoom = zoom$2().duration(0)
            .on("start", $$.onZoomStart.bind($$))
            .on("zoom", $$.onZoom.bind($$))
            .on("end", $$.onZoomEnd.bind($$));
        // get zoom extent
        // @ts-ignore
        zoom.orgScaleExtent = function () {
            var extent = config.zoom_extent || [1, 10];
            return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
        };
        // @ts-ignore
        zoom.updateScaleExtent = function () {
            var ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
            var extent = this.orgScaleExtent();
            // https://d3js.org/d3-zoom#zoom_scaleExtent
            this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
            return this;
        };
        /**
         * Update scale according zoom transform value
         * @param {object} transform transform object
         * @param {boolean} correctTransform if the d3 transform should be updated after rescaling
         * @private
         */
        // @ts-ignore
        zoom.updateTransformScale = function (transform, correctTransform) {
            var _a;
            var isRotated = config.axis_rotated;
            // in case of resize, update range of orgXScale
            (_a = org.xScale) === null || _a === void 0 ? void 0 : _a.range(scale.x.range());
            // rescale from the original scale
            var newScale = transform[isRotated ? "rescaleY" : "rescaleX"](org.xScale || scale.x);
            // prevent drag zoom to be out of range
            if (newScale.domain().some(function (v) { return /(Invalid Date|NaN)/.test(v.toString()); })) {
                return;
            }
            var domain = $$.trimXDomain(newScale.domain());
            var rescale = config.zoom_rescale;
            newScale.domain(domain, org.xDomain);
            // prevent chart from panning off the edge and feeling "stuck"
            // https://github.com/naver/billboard.js/issues/2588
            if (correctTransform) {
                var t = newScale(scale.x.domain()[0]);
                var tX = isRotated ? transform.x : t;
                var tY = isRotated ? t : transform.y;
                $$.$el.eventRect.property("__zoom", zoomIdentity.translate(tX, tY).scale(transform.k));
            }
            if (!$$.state.xTickOffset) {
                $$.state.xTickOffset = $$.axis.x.tickOffset();
            }
            scale.zoom = $$.getCustomizedXScale(newScale);
            $$.axis.x.scale(scale.zoom);
            if (rescale) {
                // copy current initial x scale in case of rescale option is used
                !org.xScale && (org.xScale = scale.x.copy());
                scale.x.domain(domain);
            }
            else if (org.xScale) {
                scale.x.domain(org.xScale.domain());
                org.xScale = null;
            }
        };
        /**
         * Get zoom domain
         * @returns {Array} zoom domain
         * @private
         */
        // @ts-ignore
        zoom.getDomain = function () {
            var domain = scale[scale.zoom ? "zoom" : "subX"].domain();
            var isCategorized = $$.axis.isCategorized();
            if (isCategorized) {
                domain[1] -= 2;
            }
            return domain;
        };
        $$.zoom = zoom;
    },
    /**
     * 'start' event listener
     * @param {object} event Event object
     * @private
     */
    onZoomStart: function (event) {
        var $$ = this;
        var sourceEvent = event.sourceEvent;
        if (sourceEvent) {
            $$.zoom.startEvent = sourceEvent;
            $$.state.zooming = true;
            callFn($$.config.zoom_onzoomstart, $$.api, event);
        }
    },
    /**
     * 'zoom' event listener
     * @param {object} event Event object
     * @private
     */
    onZoom: function (event) {
        var _a;
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, org = $$.org;
        var sourceEvent = event.sourceEvent;
        var isUnZoom = (event === null || event === void 0 ? void 0 : event.transform) === zoomIdentity;
        if (!config.zoom_enabled ||
            $$.filterTargetsToShow($$.data.targets).length === 0 ||
            (!scale.zoom && (sourceEvent === null || sourceEvent === void 0 ? void 0 : sourceEvent.type.indexOf("touch")) > -1 &&
                (sourceEvent === null || sourceEvent === void 0 ? void 0 : sourceEvent.touches.length) === 1)) {
            return;
        }
        if (event.sourceEvent) {
            state.zooming = true;
            state.domain = undefined;
        }
        var isMousemove = (sourceEvent === null || sourceEvent === void 0 ? void 0 : sourceEvent.type) === "mousemove";
        var isZoomOut = (sourceEvent === null || sourceEvent === void 0 ? void 0 : sourceEvent.wheelDelta) < 0;
        var transform = event.transform;
        if (!isMousemove && isZoomOut && scale.x.domain().every(function (v, i) { return v !== org.xDomain[i]; })) {
            scale.x.domain(org.xDomain);
        }
        $$.zoom.updateTransformScale(transform, config.zoom_type === "wheel" && sourceEvent);
        // do zoom transiton when:
        // - zoom type 'drag'
        // - when .unzoom() is called (event.transform === d3ZoomIdentity)
        var doTransition = config.transition_duration > 0 &&
            !config.subchart_show && (state.dragging || isUnZoom || !event.sourceEvent);
        $$.redraw({
            withTransition: doTransition,
            withY: config.zoom_rescale,
            withSubchart: false,
            withEventRect: false,
            withDimension: false
        });
        $$.state.cancelClick = isMousemove;
        // do not call event cb when is .unzoom() is called
        !isUnZoom && callFn(config.zoom_onzoom, $$.api, (_a = $$.state.domain) !== null && _a !== void 0 ? _a : $$.zoom.getDomain());
    },
    /**
     * 'end' event listener
     * @param {object} event Event object
     * @private
     */
    onZoomEnd: function (event) {
        var _a, _b;
        var $$ = this;
        var config = $$.config, state = $$.state;
        var startEvent = $$.zoom.startEvent;
        var e = event === null || event === void 0 ? void 0 : event.sourceEvent;
        var isUnZoom = (event === null || event === void 0 ? void 0 : event.transform) === zoomIdentity;
        if ((startEvent === null || startEvent === void 0 ? void 0 : startEvent.type.indexOf("touch")) > -1) {
            startEvent = startEvent.changedTouches[0];
            e = (_a = e === null || e === void 0 ? void 0 : e.changedTouches) === null || _a === void 0 ? void 0 : _a[0];
        }
        // if click, do nothing. otherwise, click interaction will be canceled.
        if (config.zoom_type === "drag" && (e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY)) {
            return;
        }
        state.zooming = false;
        $$.redrawEventRect();
        $$.updateZoom();
        // do not call event cb when is .unzoom() is called
        !isUnZoom && (e || state.dragging) && callFn(config.zoom_onzoomend, $$.api, (_b = $$.state.domain) !== null && _b !== void 0 ? _b : $$.zoom.getDomain());
    },
    /**
     * Update zoom
     * @param {boolean} force Force unzoom
     * @private
     */
    updateZoom: function (force) {
        var $$ = this;
        var _a = $$.scale, subX = _a.subX, x = _a.x, zoom = _a.zoom;
        if (zoom) {
            var zoomDomain = zoom.domain();
            var xDomain = subX.domain();
            var delta = 0.015; // arbitrary value
            var isfullyShown = $$.config.axis_x_inverted ?
                (zoomDomain[0] >= xDomain[0] || (zoomDomain[0] + delta) >= xDomain[0]) && (xDomain[1] >= zoomDomain[1] || xDomain[1] >= (zoomDomain[1] + delta)) :
                (zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) && (xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta));
            // check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
            if (force || isfullyShown) {
                $$.axis.x.scale(subX);
                x.domain(subX.orgDomain());
                $$.scale.zoom = null;
            }
        }
    },
    /**
     * Set zoom transform to event rect
     * @param {Function} x x Axis scale function
     * @param {Array} domain Domain value to be set
     * @private
     */
    updateCurrentZoomTransform: function (x, domain) {
        var _a;
        var $$ = this;
        var eventRect = $$.$el.eventRect, config = $$.config;
        var isRotated = config.axis_rotated;
        // Get transform from given domain value
        // https://github.com/d3/d3-zoom/issues/57#issuecomment-246434951
        var translate = [-x(domain[0]), 0];
        var transform = (_a = zoomIdentity
            .scale(x.range()[1] / (x(domain[1]) - x(domain[0]))))
            .translate.apply(_a, (isRotated ? translate.reverse() : translate));
        eventRect.call($$.zoom.transform, transform);
    },
    /**
     * Attach zoom event on <rect>
     * @private
     */
    bindZoomOnEventRect: function () {
        var _a;
        var $$ = this;
        var config = $$.config, _b = $$.$el, eventRect = _b.eventRect, svg = _b.svg;
        var behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;
        // On Safari, event can't be built inside the svg content
        // for workaround, register wheel event on <svg> element first
        // https://bugs.webkit.org/show_bug.cgi?id=226683#c3
        // https://stackoverflow.com/questions/67836886/wheel-event-is-not-fired-on-a-svg-group-element-in-safari
        if (win.GestureEvent &&
            /^((?!chrome|android|mobile).)*safari/i.test((_a = win.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)) {
            svg.on("wheel", function () { });
        }
        eventRect === null || eventRect === void 0 ? void 0 : eventRect.call(behaviour).on("dblclick.zoom", null);
    },
    /**
     * Initialize the drag behaviour used for zooming.
     * @private
     */
    initZoomBehaviour: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var start = 0;
        var end = 0;
        var zoomRect;
        var prop = {
            axis: isRotated ? "y" : "x",
            attr: isRotated ? "height" : "width",
            index: isRotated ? 1 : 0
        };
        $$.zoomBehaviour = drag$1()
            .clickDistance(4)
            .on("start", function (event) {
            state.event = event;
            $$.setDragStatus(true);
            $$.unselectRect();
            if (!zoomRect) {
                zoomRect = $$.$el.main.append("rect")
                    .attr("clip-path", state.clip.path)
                    .attr("class", $ZOOM.zoomBrush)
                    .attr("width", isRotated ? state.width : 0)
                    .attr("height", isRotated ? 0 : state.height);
            }
            start = getPointer(event, this)[prop.index];
            end = start;
            zoomRect
                .attr(prop.axis, start)
                .attr(prop.attr, 0);
            $$.onZoomStart(event);
        })
            .on("drag", function (event) {
            end = getPointer(event, this)[prop.index];
            zoomRect
                .attr(prop.axis, Math.min(start, end))
                .attr(prop.attr, Math.abs(end - start));
        })
            .on("end", function (event) {
            var _a;
            var scale = $$.scale.zoom || $$.scale.x;
            state.event = event;
            zoomRect
                .attr(prop.axis, 0)
                .attr(prop.attr, 0);
            if (start > end) {
                _a = [end, start], start = _a[0], end = _a[1];
            }
            if (start < 0) {
                end += Math.abs(start);
                start = 0;
            }
            if (start !== end) {
                $$.api.zoom([start, end].map(function (v) { return scale.invert(v); }));
            }
            $$.setDragStatus(false);
        });
    },
    setZoomResetButton: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var resetButton = config.zoom_resetButton;
        if (resetButton && config.zoom_type === "drag") {
            if (!$el.zoomResetBtn) {
                $el.zoomResetBtn = $$.$el.chart.append("div")
                    .classed($COMMON.button, true)
                    .append("span")
                    .on("click", function () {
                    isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
                    $$.api.unzoom();
                })
                    .classed($ZOOM.buttonZoomReset, true)
                    .text(resetButton.text || "Reset Zoom");
            }
            else {
                $el.zoomResetBtn.style("display", null);
            }
        }
    },
    getZoomTransform: function () {
        var $$ = this;
        var eventRect = $$.$el.eventRect;
        return (eventRect === null || eventRect === void 0 ? void 0 : eventRect.node()) ? zoomTransform(eventRect.node()) : { k: 1 };
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Module used for data.selection.draggable option
 */
var drag = {
    /**
     * Called when dragging.
     * Data points can be selected.
     * @private
     * @param {object} mouse Object
     */
    drag: function (mouse) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        var isSelectionGrouped = config.data_selection_grouped;
        var isSelectable = config.interaction_enabled && config.data_selection_isselectable;
        if ($$.hasArcType() ||
            !config.data_selection_enabled || // do nothing if not selectable
            (config.zoom_enabled && !$$.zoom.altDomain) || // skip if zoomable because of conflict drag behavior
            !config.data_selection_multiple // skip when single selection because drag is used for multiple selection
        ) {
            return;
        }
        var _a = state.dragStart || [0, 0], sx = _a[0], sy = _a[1];
        var mx = mouse[0], my = mouse[1];
        var minX = Math.min(sx, mx);
        var maxX = Math.max(sx, mx);
        var minY = isSelectionGrouped ? state.margin.top : Math.min(sy, my);
        var maxY = isSelectionGrouped ? state.height : Math.max(sy, my);
        main.select(".".concat($DRAG.dragarea))
            .attr("x", minX)
            .attr("y", minY)
            .attr("width", maxX - minX)
            .attr("height", maxY - minY);
        // TODO: binary search when multiple xs
        main.selectAll(".".concat($SHAPE.shapes))
            .selectAll(".".concat($SHAPE.shape))
            .filter(function (d) { return isSelectable === null || isSelectable === void 0 ? void 0 : isSelectable.bind($$.api)(d); })
            .each(function (d, i) {
            var shape = select(this);
            var isSelected = shape.classed($SELECT.SELECTED);
            var isIncluded = shape.classed($DRAG.INCLUDED);
            var isWithin = false;
            var toggle;
            if (shape.classed($CIRCLE.circle)) {
                var x = +shape.attr("cx") * 1;
                var y = +shape.attr("cy") * 1;
                toggle = $$.togglePoint;
                isWithin = minX < x && x < maxX && minY < y && y < maxY;
            }
            else if (shape.classed($BAR.bar)) {
                var _a = getPathBox(this), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                toggle = $$.togglePath;
                isWithin = !(maxX < x || x + width < minX) && !(maxY < y || y + height < minY);
            }
            else {
                // line/area selection not supported yet
                return;
            }
            // @ts-ignore
            if (isWithin ^ isIncluded) {
                shape.classed($DRAG.INCLUDED, !isIncluded);
                // TODO: included/unincluded callback here
                shape.classed($SELECT.SELECTED, !isSelected);
                toggle.call($$, !isSelected, shape, d, i);
            }
        });
    },
    /**
     * Called when the drag starts.
     * Adds and Shows the drag area.
     * @private
     * @param {object} mouse Object
     */
    dragstart: function (mouse) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        if ($$.hasArcType() || !config.data_selection_enabled) {
            return;
        }
        state.dragStart = mouse;
        main.select(".".concat($COMMON.chart))
            .append("rect")
            .attr("class", $DRAG.dragarea)
            .style("opacity", "0.1");
        $$.setDragStatus(true);
    },
    /**
     * Called when the drag finishes.
     * Removes the drag area.
     * @private
     */
    dragend: function () {
        var $$ = this;
        var config = $$.config, main = $$.$el.main, $T = $$.$T;
        if ($$.hasArcType() || !config.data_selection_enabled) { // do nothing if not selectable
            return;
        }
        $T(main.select(".".concat($DRAG.dragarea)))
            .style("opacity", "0")
            .remove();
        main.selectAll(".".concat($SHAPE.shape))
            .classed($DRAG.INCLUDED, false);
        $$.setDragStatus(false);
    }
};

var selection = __assign(__assign({}, drag), { 
    /**
     * Select a point
     * @param {object} target Target point
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    selectPoint: function (target, d, i) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main, $T = $$.$T;
        var isRotated = config.axis_rotated;
        var cx = (isRotated ? $$.circleY : $$.circleX).bind($$);
        var cy = (isRotated ? $$.circleX : $$.circleY).bind($$);
        var r = $$.pointSelectR.bind($$);
        callFn(config.data_onselected, $$.api, d, target.node());
        // add selected-circle on low layer g
        $T(main.select(".".concat($SELECT.selectedCircles).concat($$.getTargetSelectorSuffix(d.id)))
            .selectAll(".".concat($SELECT.selectedCircle, "-").concat(i))
            .data([d])
            .enter()
            .append("circle")
            .attr("class", function () { return $$.generateClass($SELECT.selectedCircle, i); })
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("stroke", $$.color)
            .attr("r", function (d2) { return $$.pointSelectR(d2) * 1.4; })).attr("r", r);
    }, 
    /**
     * Unelect a point
     * @param {object} target Target point
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    unselectPoint: function (target, d, i) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main, $T = $$.$T;
        callFn(config.data_onunselected, $$.api, d, target === null || target === void 0 ? void 0 : target.node());
        // remove selected-circle from low layer g
        $T(main.select(".".concat($SELECT.selectedCircles).concat($$.getTargetSelectorSuffix(d.id)))
            .selectAll(".".concat($SELECT.selectedCircle, "-").concat(i)))
            .attr("r", 0)
            .remove();
    }, 
    /**
     * Toggles the selection of points
     * @param {boolean} selected whether or not to select.
     * @param {object} target Target object
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    togglePoint: function (selected, target, d, i) {
        var method = "".concat(selected ? "" : "un", "selectPoint");
        this[method](target, d, i);
    }, 
    /**
     * Select a path
     * @param {object} target Target path
     * @param {object} d Data object
     * @private
     */
    selectPath: function (target, d) {
        var $$ = this;
        var config = $$.config;
        callFn(config.data_onselected, $$.api, d, target.node());
        if (config.interaction_brighten) {
            target.style("filter", "brightness(1.25)");
        }
    }, 
    /**
     * Unelect a path
     * @private
     * @param {object} target Target path
     * @param {object} d Data object
     */
    unselectPath: function (target, d) {
        var $$ = this;
        var config = $$.config;
        callFn(config.data_onunselected, $$.api, d, target.node());
        if (config.interaction_brighten) {
            target.style("filter", null);
        }
    }, 
    /**
     * Toggles the selection of lines
     * @param {boolean} selected whether or not to select.
     * @param {object} target Target object
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    togglePath: function (selected, target, d, i) {
        this["".concat(selected ? "" : "un", "selectPath")](target, d, i);
    }, 
    /**
     * Returns the toggle method of the target
     * @param {object} that shape
     * @param {object} d Data object
     * @returns {Function} toggle method
     * @private
     */
    getToggle: function (that, d) {
        var $$ = this;
        return that.nodeName === "path" ? $$.togglePath : ($$.isStepType(d) ?
            function () { } : // circle is hidden in step chart, so treat as within the click area
            $$.togglePoint);
    }, 
    /**
     * Toggles the selection of shapes
     * @param {object} that shape
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    toggleShape: function (that, d, i) {
        var _a;
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        if (config.data_selection_enabled && config.data_selection_isselectable.bind($$.api)(d)) {
            var shape = select(that);
            var isSelected = shape.classed($SELECT.SELECTED);
            var toggle_1 = $$.getToggle(that, d).bind($$);
            var toggledShape_1;
            if (!config.data_selection_multiple) {
                var focusOnly = (_a = $$.isPointFocusOnly) === null || _a === void 0 ? void 0 : _a.call($$);
                var selector = ".".concat(focusOnly ? $SELECT.selectedCircles : $SHAPE.shapes);
                if (config.data_selection_grouped) {
                    selector += $$.getTargetSelectorSuffix(d.id);
                }
                main.selectAll(selector)
                    .selectAll(focusOnly ?
                    ".".concat($SELECT.selectedCircle) :
                    ".".concat($SHAPE.shape, ".").concat($SELECT.SELECTED))
                    .classed($SELECT.SELECTED, false)
                    .each(function (d) {
                    var shape = select(this);
                    toggledShape_1 = shape;
                    toggle_1(false, shape, d, d.index);
                });
            }
            if (!toggledShape_1 || toggledShape_1.node() !== shape.node()) {
                shape.classed($SELECT.SELECTED, !isSelected);
                toggle_1(!isSelected, shape, d, i);
            }
        }
    } });

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * data.selection config options
 */
var optDataSelection = {
    /**
     * Set data selection enabled<br><br>
     * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
     *  - **NOTE:** for ESM imports, needs to import 'selection' exports and instantiate it by calling `selection()`.
     *    - `enabled: selection()`
     * @name data․selection․enabled
     * @memberof Options
     * @type {boolean}
     * @default false
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataSelection)
     * @example
     * data: {
     *    selection: {
     *       enabled: true
     *    }
     * }
     * @example
     * // importing ESM
     * import bb, {selection} from "billboard.js";
     *
     * data: {
     *    selection: {
     *       enabled: selection(),
     *       ...
     *    }
     * }
     */
    data_selection_enabled: false,
    /**
     * Set grouped selection enabled.<br><br>
     * If this option set true, multiple data points that have same x value will be selected by one selection.
     * @name data․selection․grouped
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * data: {
     *    selection: {
     *       grouped: true
     *    }
     * }
     */
    data_selection_grouped: false,
    /**
     * Set a callback for each data point to determine if it's selectable or not.<br><br>
     * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
     * @name data․selection․isselectable
     * @memberof Options
     * @type {Function}
     * @default function() { return true; }
     * @example
     * data: {
     *    selection: {
     *       isselectable: function(d) { ... }
     *    }
     * }
     */
    data_selection_isselectable: function () { return true; },
    /**
     * Set multiple data points selection enabled.<br><br>
     * If this option set true, multile data points can have the selected state at the same time. If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
     * @name data․selection․multiple
     * @memberof Options
     * @type {boolean}
     * @default true
     * @example
     * data: {
     *    selection: {
     *       multiple: false
     *    }
     * }
     */
    data_selection_multiple: true,
    /**
     * Enable to select data points by dragging.
     * If this option set true, data points can be selected by dragging.
     * - **NOTE:** If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
     * @name data․selection․draggable
     * @memberof Options
     * @type {boolean}
     * @default false
     * @example
     * data: {
     *    selection: {
     *       draggable: true
     *   }
     * }
     */
    data_selection_draggable: false,
    /**
     * Set a callback for on data selection.
     * @name data․onselected
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onselected: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
     *        // element - <circle>
     *        ...
     *    }
     * }
     */
    data_onselected: function () { },
    /**
     * Set a callback for on data un-selection.
     * @name data․onunselected
     * @memberof Options
     * @type {Function}
     * @default function() {}
     * @example
     * data: {
     *     onunselected: function(d, element) {
     *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
     *        // element - <circle>
     *        ...
     *    }
     * }
     */
    data_onunselected: function () { }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var optSubchart = {
    /**
     * Set subchart options.
     * - **NOTE:** Not supported for `bubble`, `scatter` and non-Axis based(pie, donut, gauge, radar) types.
     * @name subchart
     * @memberof Options
     * @type {object}
     * @property {object} subchart Subchart object
     * @property {boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
     *  - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
     *    - `show: subchart()`
     * @property {boolean} [subchart.showHandle=false] Show sub chart's handle.
     * @property {boolean} [subchart.axis.x.show=true] Show or hide x axis.
     * @property {boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
     * @property {Function|string} [subchart.axis.x.tick.format] Use custom format for x axis ticks - see [axis.x.tick.format](#.axis․x․tick․format) for details.
     * @property {boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
     * @property {Array} [subchart.init.range] Set initial selection domain range.
     * @property {number} [subchart.size.height] Change the height of the subchart.
     * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
     *  Specified function receives the current zoomed x domain.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
     * @example
     *  subchart: {
     *      show: true,
     *      showHandle: true,
     *      size: {
     *          height: 20
     *      },
     *      init: {
     *          // specify initial range domain selection
     *          range: [1, 2]
     *      },
     *      axis: {
     *      	x: {
     *      	  show: true,
     *      	    tick: {
     *      	      show: true,
     *      	      format: (x) => d3Format(".1f")(x)
     *      	      text: {
     *      	        show: false
     *      	      }
     *      	    }
     *      	}
     *      },
     *      onbrush: function(domain) { ... }
     *  }
     * @example
     * // importing ESM
     * import bb, {subchart} from "billboard.js";
     *
     * subchart: {
     *      show: subchart(),
     *      ...
     * }
     */
    subchart_show: false,
    subchart_showHandle: false,
    subchart_size_height: 60,
    subchart_axis_x_show: true,
    subchart_axis_x_tick_show: true,
    subchart_axis_x_tick_format: undefined,
    subchart_axis_x_tick_text_show: true,
    subchart_init_range: undefined,
    subchart_onbrush: function () { }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * zoom config options
 */
var optZoom = {
    /**
     * Set zoom options
     * @name zoom
     * @memberof Options
     * @type {object}
     * @property {object} zoom Zoom object
     * @property {boolean} [zoom.enabled=false] Enable zooming.
     *  - **NOTE:** for ESM imports, needs to import 'zoom' exports and instantiate it by calling `zoom()`.
     *    - `enabled: zoom()`
     * @property {string} [zoom.type='wheel'] Set zoom interaction type.
     *  - **Available types:**
     *    - wheel
     *    - drag
     * @property {boolean} [zoom.rescale=false] Enable to rescale after zooming.<br>
     *  If true set, y domain will be updated according to the zoomed region.
     * @property {Array} [zoom.extent=[1, 10]] Change zoom extent.
     * @property {number|Date} [zoom.x.min] Set x Axis minimum zoom range
     * @property {number|Date} [zoom.x.max] Set x Axis maximum zoom range
     * @property {Function} [zoom.onzoomstart=undefined] Set callback that is called when zooming starts.<br>
     *  Specified function receives the zoom event.
     * @property {Function} [zoom.onzoom=undefined] Set callback that is called when the chart is zooming.<br>
     *  Specified function receives the zoomed domain.
     * @property {Function} [zoom.onzoomend=undefined] Set callback that is called when zooming ends.<br>
     *  Specified function receives the zoomed domain.
     * @property {boolean|object} [zoom.resetButton=true] Set to display zoom reset button for 'drag' type zoom
     * @property {Function} [zoom.resetButton.onclick] Set callback when clicks the reset button. The callback will receive reset button element reference as argument.
     * @property {string} [zoom.resetButton.text='Reset Zoom'] Text value for zoom reset button.
     * @see [Demo:zoom](https://naver.github.io/billboard.js/demo/#Interaction.Zoom)
     * @see [Demo:drag zoom](https://naver.github.io/billboard.js/demo/#Interaction.DragZoom)
     * @example
     *  zoom: {
     *      enabled: true,
     *      type: "drag",
     *      rescale: true,
     *      extent: [1, 100]  // enable more zooming
     *      x: {
     *          min: -1,  // set min range
     *          max: 10  // set max range
     *      },
     *      onzoomstart: function(event) { ... },
     *      onzoom: function(domain) { ... },
     *      onzoomend: function(domain) { ... },
     *
     *      // show reset button when is zoomed-in
     *      resetButton: true,
     *
     *      resetButton: {
     *          // onclick callback when reset button is clicked
     *          onclick: function(button) {
     *            button; // Reset button element reference
     *            ...
     *          },
     *
     *          // customized text value for reset zoom button
     *          text: "Unzoom"
     *      }
     *  }
     * @example
     * // importing ESM
     * import bb, {zoom} from "billboard.js";
     *
     * zoom: {
     *      enabled: zoom(),
     *      ...
     * }
     */
    zoom_enabled: false,
    zoom_type: "wheel",
    zoom_extent: undefined,
    zoom_privileged: false,
    zoom_rescale: false,
    zoom_onzoom: undefined,
    zoom_onzoomstart: undefined,
    zoom_onzoomend: undefined,
    zoom_resetButton: true,
    zoom_x_min: undefined,
    zoom_x_max: undefined
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var selectionModule = function () {
    extend(ChartInternal.prototype, selection);
    extend(Chart.prototype, apiSelection);
    Options.setOptions([optDataSelection]);
    return (selectionModule = function () { return true; })();
};
var subchartModule = function () {
    extend(ChartInternal.prototype, subchart);
    extend(Chart.prototype, apiSubchart);
    Options.setOptions([optSubchart]);
    return (subchartModule = function () { return true; })();
};
var zoomModule = function () {
    extend(ChartInternal.prototype, zoom);
    extend(Chart.prototype, apiZoom);
    Options.setOptions([optZoom]);
    return (zoomModule = function () { return true; })();
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
var defaults = {};
/**
 * @namespace bb
 * @version 3.14.0
 */
var bb = {
    /**
     * Version information
     * @property {string} version version
     * @example
     *    bb.version;  // "1.0.0"
     * @memberof bb
     */
    version: "3.14.0",
    /**
     * Generate chart
     * - **NOTE:** Bear in mind for the possiblity of ***throwing an error***, during the generation when:
     *   - Unused option value is given.
     *     - ex) For `data.type="pie"` option, setting 'axis' option can cause unexpected generation error.
     *   - Insufficient value is given for certain option used.
     *     - ex) `data: { x: "x", columns: [["x"], ["data1", 30, 200, 100]] }`
     * @param {Options} config chart options
     * @memberof bb
     * @returns {Chart}
     * @see {@link Options} for different generation options
     * @see {@link Chart} for different methods API
     * @example
     *  <!-- chart holder -->
     * <div id="LineChart"></div>
     * @example
     *  // Generate chart with options
     *  var chart = bb.generate({
     *      "bindto": "#LineChart"
     *      "data": {
     *          "columns": [
     *              ["data1", 30, 200, 100, 400, 150, 250],
     *              ["data2", 50, 20, 10, 40, 15, 25]
     *           ],
     *          "type": "line"
     *      }
     *  });
     *
     *  // call some API
     *  // ex) get the data of 'data1'
     *  chart.data("data1");
     * @example
     * // Generate chart by importing ESM
     * // Import types to be used only, where this will make smaller bundle size.
     * import bb, {
     *   area,
     *   areaLineRange,
     *   areaSpline,
     *   areaSplineRange,
     *   areaStep,
     *   bar,
     *   bubble,
     *   donut,
     *   gauge,
     *   line,
     *   pie,
     *   polar,
     *   radar,
     *   scatter,
     *   spline,
     *   step
     * }
     *
     * bb.generate({
     *      "bindto": "#LineChart"
     *      "data": {
     *          "columns": [
     *              ["data1", 30, 200, 100, 400, 150, 250],
     *              ["data2", 50, 20, 10, 40, 15, 25]
     *           ]
     *      },
     *      type: line(),
     *
     *      // or
     *      types: {
     *        data1: bar(),
     *        data2: step()
     *      }
     * });
     */
    generate: function (config) {
        var options = mergeObj({}, defaults, config);
        var inst = new Chart(options);
        inst.internal.charts = this.instance;
        this.instance.push(inst);
        return inst;
    },
    /**
     * Set or get global default options.
     * - **NOTE:**
     *   - The options values settings are valid within page context only.
     *   - If is called multiple times, will override the last value.
     * @param {Options} options chart options
     * @memberof bb
     * @returns {Options}
     * @see {@link Options}
     * @example
     * // Set same option value as for `.generate()`
     * bb.defaults({
     *   data: {
     *     type: "bar"
     *   }
     * });
     *
     * bb.defaults();  // {data:{type: "bar"}}
     *
     * // data.type defaults to 'bar'
     * var chart = bb.generate({ ... });
     */
    defaults: function (options) {
        if (isObject(options)) {
            defaults = options;
        }
        return defaults;
    },
    /**
     * An array containing instance created
     * @property {Array} instance instance array
     * @example
     *  // generate charts
     *  var chart1 = bb.generate(...);
     *  var chart2 = bb.generate(...);
     *
     *  bb.instance;  // [ chart1, chart2, ... ]
     * @memberof bb
     */
    instance: [],
    /**
     * Namespace for plugins
     * @property {object} plugin plugin namespace
     * @example
     *  // Stanford diagram plugin
     *  bb.plugin.stanford;
     * @memberof bb
     */
    plugin: {}
};

export { area, areaLineRange, areaSpline, areaSplineRange, areaStep, areaStepRange, bar, bb, bubble, candlestick, bb as default, donut, funnel, gauge, line, pie, polar, radar, scatter, selectionModule as selection, spline, step, subchartModule as subchart, treemap, zoomModule as zoom };
