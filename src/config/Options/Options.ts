/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import data from "./data/data";
import axis from "./axis/axis";

// common
import color from "./common/color";
import grid from "./common/grid";
import interaction from "./common/interaction";
import legend from "./common/legend";
import point from "./common/point";
import subchart from "./common/subchart";
import title from "./common/title";
import tooltip from "./common/tooltip";
import zoom from "./common/zoom";

// shape
import area from "./shape/area";
import bar from "./shape/bar";
import bubble from "./shape/bubble";
import donut from "./shape/donut";
import gauge from "./shape/gauge";
import line from "./shape/line";
import pie from "./shape/pie";
import radar from "./shape/radar";
import spline from "./shape/spline";

import {mergeObj} from "../../module/util";

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
export default class Options {
	constructor() {
		const commonConfig = mergeObj({}, data, axis, color, grid, interaction, legend, point, subchart, title, tooltip, zoom);
		const shapeConfig = mergeObj({}, area, bar, bubble, donut, gauge, line, pie, radar, spline);

		return mergeObj({
			/**
			 * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.<br>
			 * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
			 * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
			 * @name bindto
			 * @memberof Options
			 * @property {String|HTMLElement|d3.selection} bindto=#chart Specify the element where chart will be drawn.
			 * @property {String|HTMLElement|d3.selection} bindto.element=#chart Specify the element where chart will be drawn.
			 * @property {String} [bindto.classname=bb] Specify the class name of bind element.<br>
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
			 * @property {String} background.class Specify the class name for background element.
			 * @property {String} background.color Specify the fill color for background element.<br>**NOTE:** Will be ignored if `imgUrl` option is set.
			 * @property {String} background.imgUrl Specify the image url string for background.
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
			 * @type {Boolean}
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
			 * @type {Object}
			 * @property {String} [svg.classname] class name for svg element
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
			 * @type {Object}
			 * @property {Number} [size.width] width of the chart element
			 * @property {Number} [size.height] height of the chart element
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
			 * @name padding
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [padding.top] padding on the top of chart
			 * @property {Number} [padding.right] padding on the right of chart
			 * @property {Number} [padding.bottom] padding on the bottom of chart
			 * @property {Number} [padding.left] padding on the left of chart
			 * @example
			 * padding: {
             *   top: 20,
             *   right: 20,
             *   bottom: 20,
             *   left: 20
			 * }
			 */
			padding_left: undefined,
			padding_right: undefined,
			padding_top: undefined,
			padding_bottom: undefined,

			/**
			 * Set chart resize options
			 * @name resize
			 * @memberof Options
			 * @type {Object}
			 * @property {Boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
			 * @example
			 *  resize: {
			 *      auto: false
			 *  }
			 */
			resize_auto: true,

			/**
			 * Set a callback to execute when mouse/touch enters the chart.
			 * @name onover
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * // @param {Chart} ctx - Instance itself
			 * onover: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onout: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onresize: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onresized: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onbeforeinit: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * oninit: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onafterinit: function(ctx) {
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
			 * // @param {Chart} ctx - Instance itself
			 * onrendered: function(ctx) {
			 *   ...
			 * }
			 */
			onrendered: undefined,

			/**
			 * Set duration of transition (in milliseconds) for chart animation.<br><br>
			 * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
			 * @name transition
			 * @memberof Options
			 * @type {Object}
			 * @property {Number} [transition.duration=350] duration in milliseconds
			 * @example
			 * transition: {
			 *    duration: 500
			 * }
			 */
			transition_duration: 350,

			/**
				* Set scatter options
				* @name scatter
				* @memberof Options
				* @type {Object}
				* @property {Boolean} [scatter.zerobased=false] Set if min or max value will be 0 on scatter chart.
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
			scatter_zerobased: false,

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
			 * @type {Object}
			 * @property {Boolean} [render.lazy=true] Make to not render at initialization (enabled by default when bind element's visibility is hidden).
			 * @property {Boolean} [render.observe=true] Observe bind element's visibility(`display` or `visiblity` inline css property or class value) & render when is visible automatically (for IEs, only works IE11+). When set to **false**, call [`.flush()`](./Chart.html#flush) to render.
			 * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.LazyRender)
			 * @example
			 *  render: {
			 *    lazy: true,
			 *    observe: true
			 * }
			 *
			 * @example
			 *	// <!-- render.lazy will detect visibility defined -->
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
			 *	// chart won't be rendered and not observing bind element's visiblity changes
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
			 * @example
			 *  regions: [
			 *    {
			 *      axis: "x",
			 *      start: 1,
			 *      end: 4,
			 *      class: "region-1-4"
			 *    }
			 *  ]
			 */
			regions: []
		}, commonConfig, shapeConfig);
	}
}
