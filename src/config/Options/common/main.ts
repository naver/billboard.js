/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * main config options
 */
export default {
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
	bindto: <string|{element: string; classname?: string}> "#chart",

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
	background: <{class?: string; color?: string; imgUrl?: string;}> {},

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
	svg_classname: <string|undefined> undefined,

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
	size_width: <number|undefined> undefined,
	size_height: <number|undefined> undefined,

	/**
	 * The padding of the chart element.
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
	padding_mode: <"fit"|undefined> undefined,
	padding_left: <number|undefined> undefined,
	padding_right: <number|undefined> undefined,
	padding_top: <number|undefined> undefined,
	padding_bottom: <number|undefined> undefined,

	/**
	 * Set chart resize options
	 * @name resize
	 * @memberof Options
	 * @type {object}
	 * @property {object} [resize] resize object
	 * @property {boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
	 * @property {boolean|number} [resize.timer=true] Set resize timer option.
	 * - **NOTE:**
	 *   - The resize function will be called using:
	 *     - true: `setTimeout()`
	 *     - false: `requestIdleCallback()`
	 *   - Given number(delay in ms) value, resize function will be triggered using `setTimer()` with given delay.
	 * @example
	 *  resize: {
	 *      auto: false,
	 *
	 *      // set resize function will be triggered using `setTimer()`
	 *      timer: true,
	 *
	 *      // set resize function will be triggered using `requestIdleCallback()`
	 *      timer: false,
	 *
	 *      // set resize function will be triggered using `setTimer()` with a delay of `100ms`.
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
	onclick: <(() => void)|undefined> undefined,

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
	onover: <(() => void)|undefined> undefined,

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
	onout: <(() => void)|undefined> undefined,

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
	onresize: <(() => void)|undefined> undefined,

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
	onresized: <(() => void)|undefined> undefined,

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
	onbeforeinit: <(() => void)|undefined> undefined,

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
	oninit: <(() => void)|undefined> undefined,

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
	onafterinit: <(() => void)|undefined> undefined,

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
	onrendered: <(() => void)|undefined> undefined,

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
	 * @property {boolean} [render.lazy=true] Make to not render at initialization (enabled by default when bind element's visibility is hidden).
	 * @property {boolean} [render.observe=true] Observe bind element's visibility(`display` or `visiblity` inline css property or class value) & render when is visible automatically (for IEs, only works IE11+). When set to **false**, call [`.flush()`](./Chart.html#flush) to render.
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
	render: <{lazy?: boolean; observe?: boolean;}> {},

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
	regions: <{axis?: string; start?: number; end?: number; class?: string;}[]> []
};
