/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {
	timeParse as d3TimeParse,
	timeFormat as d3TimeFormat,
	utcParse as d3UtcParse,
	utcFormat as d3UtcFormat
} from "d3-time-format";
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import {transition as d3Transition} from "d3-transition";
import CLASS from "../config/classes";
import Store from "../config/Store";
import Options from "../config/Options/Options";
import {document, window} from "../module/browser";
import Cache from "../module/Cache";
import {extend, notEmpty, asHalfPixel, getOption, isArray, isFunction, isNumber, isObject, isString, isValue, callFn, sortValue} from "../module/util";

// Axis
import Axis from "./Axis/Axis";

// data
import dataConvert from "./data/data.convert";
import data from "./data/data";
import dataLoad from "./data/data.load";

// interactions
import drag from "./interactions/drag";
import flow from "./interactions/flow";
import interaction from "./interactions/interaction";
import subchart from "./interactions/subchart";
import zoom from "./interactions/zoom";

// internals
import category from "./internals/category";
import classModule from "./internals/class";
import clip from "./internals/clip";
import color from "./internals/color";
import domain from "./internals/domain";
import format from "./internals/format";
import grid from "./internals/grid";
import legend from "./internals/legend";
import region from "./internals/region";
import scale from "./internals/scale";
import selection from "./internals/selection";
import size from "./internals/size";
import text from "./internals/text";
import title from "./internals/title";
import tooltip from "./internals/tooltip";
import type from "./internals/type";

// shape
import arc from "./shape/arc";
import bar from "./shape/bar";
import bubble from "./shape/bubble";
import line from "./shape/line";
import point from "./shape/point";
import radar from "./shape/radar";
import shape from "./shape/shape";

/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
 */
export default class ChartInternal {
	public api;	   // API interface
	public config; // config object
	public cache;  // cache instance
	public state;  // state variables
	public charts; // all Chart instances array within page (equivalent of 'bb.instances')

	// data object
	public data = {
		xs: {},
		targets: []
	};

	// selections
	public $el = {
		chart: null, //$el.chart,
		main: null,
		svg: null,
		axis: {  // axes
			x: null,
			y: null,
			y2: null,
			subX: d3SelectAll([])
		},
		defs: null,
		tooltip: null,
		legend: null,
		title: null,

		arcs: null,
		bar: d3SelectAll([]), //mainBar,
		line: d3SelectAll([]), //mainLine,
		area: d3SelectAll([]), //mainArea,
		circle: d3SelectAll([]), //mainCircle,
		text: d3SelectAll([]), //mainText,
		grid: {
			main: d3SelectAll([]),  //grid
			x: d3SelectAll([]), //xgrid,
			y: d3SelectAll([]), //ygrid,
			xLines: d3SelectAll([]), //xgridLines,
			yLines: d3SelectAll([]), //ygridLines,
		},
		region: {
			main: d3SelectAll([]), //region
			list: null // mainRegion
		},
		eventRect: null
	};

	// Axis
	public axis; // Axis

	// scales
	public scale = {
		x: null,
		y: null,
		y2: null,
		subX: null,
		subY: null,
		subY2: null,
		zoom: null
	}
	public x;
	public y;
	public y2;
	public subX;
	public subY;
	public subY2;
	public zoomScale;

	// domain
	public orgXDomain;

	// format function
	public color;
	public patterns;
	public levelColor;
	public point;
	public extraLineClasses;

	public xAxisTickValues
	public yAxisTickValues
	public xAxisTickFormat
	public dataTimeFormat;
	public axisTimeFormat;

	public xgridAttr;

	constructor(api) {
		const $$ = this;

		$$.api = api;
		$$.config = new Options();
		$$.cache = new Cache();
		$$.state = new Store(); // status variables
	}

	beforeInit() {
		const $$ = this;

		$$.callPluginHook("$beforeInit");

		// can do something
		callFn($$.config.onbeforeinit, $$, $$.api);
	}

	afterInit() {
		const $$ = this;

		$$.callPluginHook("$afterInit");

		// can do something
		callFn($$.config.onafterinit, $$, $$.api);
	}

	init() {
		const $$ = this;
		const {$el} = $$;
		const config = $$.config;

		$$.initParams();

		const bindto = {
			element: config.bindto,
			classname: "bb"
		};

		if (isObject(config.bindto)) {
			bindto.element = config.bindto.element || "#chart";
			bindto.classname = config.bindto.classname || bindto.classname;
		}

		// select bind element
		$el.chart = isFunction(bindto.element.node) ?
			config.bindto.element : d3Select(bindto.element || []);

		if ($el.chart.empty()) {
			$el.chart = d3Select(document.body.appendChild(document.createElement("div")));
		}

		$el.chart.html("").classed(bindto.classname, true);
		$$.initToRender();
	}

	/**
	 * Initialize the rendering process
	 * @param {Boolean} forced Force to render process
	 * @private
	 */
	initToRender(forced?: boolean) {
		const $$ = this;
		const config = $$.config;
		const state = $$.state;
		const target = $$.$el.chart;
		const isHidden = () => target.style("display") === "none" || target.style("visibility") === "hidden";

		const isLazy = config.render.lazy || isHidden();
		const MutationObserver = window.MutationObserver;

		if (isLazy && MutationObserver && config.render.observe !== false && !forced) {
			new MutationObserver((mutation, observer) => {
				if (!isHidden()) {
					observer.disconnect();
					!state.rendered && $$.initToRender(true);
				}
			}).observe(target.node(), {
				attributes: true,
				attributeFilter: ["class", "style"]
			});
		}

		if (!isLazy || forced) {
			const convertedData = $$.convertData(config, $$.initWithData);

			convertedData && $$.initWithData(convertedData);
		}
	}

	initParams() {
		const $$ = this;
		const config = $$.config;
		const state = $$.state;
		const isRotated = config.axis_rotated;

		// datetime to be used for uniqueness
		state.datetimeId = `bb-${+new Date()}`;
		$$.initClip();

		$$.color = $$.generateColor();
		$$.levelColor = $$.generateLevelColor();
		$$.point = $$.generatePoint();

		$$.extraLineClasses = $$.generateExtraLineClass();

		$$.dataTimeFormat = config.data_xLocaltime ? d3TimeParse : d3UtcParse;
		$$.axisTimeFormat = config.axis_x_localtime ? d3TimeFormat : d3UtcFormat;

		const isDragZoom = $$.config.zoom_enabled && $$.config.zoom_enabled.type === "drag";

		$$.defaultAxisTimeFormat = d => {
			const isZoomed = isDragZoom ? this.zoomScale :
				this.zoomScale && $$.x.orgDomain().toString() !== this.zoomScale.domain().toString();

			const specifier = (d.getMilliseconds() && ".%L") ||
				(d.getSeconds() && ".:%S") ||
				(d.getMinutes() && "%I:%M") ||
				(d.getHours() && "%I %p") ||
				(d.getDate() !== 1 && "%b %d") ||
				(isZoomed && d.getDate() === 1 && "%b\'%y") ||
				(d.getMonth() && "%-m/%-d") || "%Y";

			return $$.axisTimeFormat(specifier)(d);
		};

		state.isLegendRight = config.legend_position === "right";
		state.isLegendInset = config.legend_position === "inset";

		state.isLegendTop = config.legend_inset_anchor === "top-left" ||
			config.legend_inset_anchor === "top-right";
		state.isLegendLeft = config.legend_inset_anchor === "top-left" ||
			config.legend_inset_anchor === "bottom-left";

		state.rotatedPaddingRight = isRotated && !config.axis_x_show ? 0 : 30;
		state.inputType = $$.convertInputType();
	}

	initWithData(data) {
		const $$ = this;
		const {$el} = $$;
		const config = $$.config;
		const state = $$.state;

		// for arc type, set axes to not be shown
		// $$.hasArcType() && ["x", "y", "y2"].forEach(id => (config[`axis_${id}_show`] = false));

		$$.axis = new Axis($$);
		config.zoom_enabled && $$.initZoom();

		// Init data as targets
		$$.data.xs = {};
		$$.data.targets = $$.convertDataToTargets(data);

		if (config.data_filter) {
			$$.data.targets = $$.data.targets.filter(config.data_filter);
		}

		// Set targets to hide if needed
		if (config.data_hide) {
			$$.addHiddenTargetIds(
				config.data_hide === true ?
					$$.mapToIds($$.data.targets) : config.data_hide
			);
		}
		if (config.legend_hide) {
			$$.addHiddenLegendIds(
				config.legend_hide === true ?
					$$.mapToIds($$.data.targets) : config.legend_hide
			);
		}

		// Init sizes and scales
		$$.updateSizes();
		$$.updateScales(true);

		// Set domains for each scale
		if ($$.x) {
			$$.x.domain(sortValue($$.getXDomain($$.data.targets)));
			$$.subX.domain($$.x.domain());

			// Save original x domain for zoom update
			$$.orgXDomain = $$.x.domain();
		}

		if ($$.y) {
			$$.y.domain($$.getYDomain($$.data.targets, "y"));
			$$.subY.domain($$.y.domain());
		}

		if ($$.y2) {
			$$.y2.domain($$.getYDomain($$.data.targets, "y2"));
			$$.subY2 && $$.subY2.domain($$.y2.domain());
		}

		// -- Basic Elements --
		$el.svg = $el.chart.append("svg")
			.style("overflow", "hidden")
			.style("display", "block");

		if (config.interaction_enabled && state.inputType) {
			const isTouch = state.inputType === "touch";

			$el.svg
				.on(isTouch ? "touchstart" : "mouseenter", () => callFn(config.onover, $$, $$.api))
				.on(isTouch ? "touchend" : "mouseleave", () => callFn(config.onout, $$, $$.api));
		}

		config.svg_classname && $$.$el.svg.attr("class", config.svg_classname);

		// Define defs
		$el.defs = $el.svg.append("defs");

		$$.appendClip($el.defs, state.clip.id);
		$$.appendClip($el.defs, state.clip.idXAxis);
		$$.appendClip($el.defs, state.clipYAxis);
		$$.appendClip($el.defs, state.clip.idGrid);

		// set color patterns
		if (isFunction(config.color_tiles) && $$.patterns) {
			$$.patterns.forEach(p => $el.defs.append(() => p.node));
		}

		$$.updateSvgSize();

		// Define regions
		const main = $el.svg.append("g").attr("transform", $$.getTranslate("main"));

		$el.main = main;

		// initialize subchart when subchart show option is set
		config.subchart_show && $$.initSubchart();

		$$.initTooltip && $$.initTooltip();
		$$.initLegend && $$.initLegend();
		$$.initTitle && $$.initTitle();

		// -- Main Region --

		// text when empty
		if (config.data_empty_label_text) {
			main.append("text")
				.attr("class", `${CLASS.text} ${CLASS.empty}`)
				.attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
				.attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.
		}

		// Regions
		$$.initRegion();

		// Add Axis here, when clipPath is 'false'
		!config.clipPath && $$.axis.init();

		// Define g for chart area
		main.append("g").attr("class", CLASS.chart)
			.attr("clip-path", state.clip.path);

		$$.callPluginHook("$init");

		// Cover whole with rects for events
		$$.initEventRect();

		// Define g for chart
		$$.initChartElements();

		// Grids
		$$.initGrid();

		// if zoom privileged, insert rect to forefront
		// TODO: is this needed?
		main.insert("rect", config.zoom_privileged ? null : `g.${CLASS.regions}`)
			.attr("class", CLASS.zoomRect)
			.attr("width", $$.state.width)
			.attr("height", $$.state.height)
			.style("opacity", "0")
			.on("dblclick.zoom", null);

		// Add Axis here, when clipPath is 'true'
		config.clipPath && $$.axis.init();

		// Set targets
		$$.updateTargets($$.data.targets);

		// Draw with targets
		$$.updateDimension();

		// oninit callback
		callFn(config.oninit, $$, $$.api);

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
			const minMax = $$.getMinMaxData();

			callFn(config.data_onmin, $$, minMax.min);
			callFn(config.data_onmax, $$, minMax.max);
		}

		// Bind resize event
		$$.bindResize();

		// export element of the chart
		$$.api.element = $el.chart.node();

		state.rendered = true;
	}

	initChartElements() {
		const $$ = this;

		["Bar", "Radar", "Line", "Bubble", "Arc", "Gauge", "Pie"].forEach(v => {
			$$[`init${v}`]();
		});

		notEmpty($$.config.data_labels) && $$.initText();
	}

	setChartElements() {
		const $$ = this;
		const {$el} = $$;

		$$.api.$ = {
			chart: $el.chart,
			svg: $el.svg,
			defs: $el.defs,
			main: $el.main,
			tooltip: $el.tooltip,
			legend: $el.legend,
			title: $el.title,
			grid: $$.grid,
			arc: $$.$el.arcs,
			bar: {
				bars: $$.$el.bar
			},
			line: {
				lines: $el.line,
				areas: $$.$el.area,
				circles: $$.$el.circle
			},
			text: {
				texts: $$.$el.text
			}
		};
	}

	/**
	 * Set background element/image
	 * @private
	 */
	setBackground() {
		const $$ = this;
		const bg = $$.config.background;

		if (notEmpty(bg)) {
			const element = $$.$el.svg.select(`.${CLASS[$$.hasArcType() ? "chart" : "regions"]}`)
				.insert(bg.imgUrl ? "image" : "rect", ":first-child");

			if (bg.imgUrl) {
				element.attr("href", bg.imgUrl);
			} else if (bg.color) {
				element.style("fill", bg.color);
			}

			element
				.attr("class", bg.class || null)
				.attr("width", "100%")
				.attr("height", "100%");
		}
	}

	smoothLines(el, type) {
		if (type === "grid") {
			el.each(function() {
				const g = d3Select(this);

				["x1", "x2", "y1", "y2"]
					.forEach(v => g.attr(v, Math.ceil(+g.attr(v))));
			});
		}
	}

	/**
	 * Update size values
	 * @param {Boolean} isInit If is called at initialization
	 * @private
	 */
	updateSizes(isInit) {
		const $$ = this;
		const state = $$.state;
		const config = $$.config;
		const $legend = $$.$el.legend;
		const isRotated = config.axis_rotated;
		const hasArc = $$.hasArcType();

		const legend = {
			width: $legend ? $$.getLegendWidth() : 0,
			height: $legend ? $$.getLegendHeight() : 0
		};

		const legendHeightForBottom = state.isLegendRight || state.isLegendInset ? 0 : legend.height;
		const xAxisHeight = isRotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x");

		const subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ?
			xAxisHeight : 30;
		const subchartHeight = config.subchart_show && !hasArc ?
			(config.subchart_size_height + subchartXAxisHeight) : 0;

		!isInit && $$.setContainerSize();

		// for main
		state.margin = isRotated ? {
			top: $$.getHorizontalAxisHeight("y2") + $$.getCurrentPaddingTop(),
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())
		} : {
			top: 4 + $$.getCurrentPaddingTop(), // for top tick text
			right: hasArc ? 0 : $$.getCurrentPaddingRight(),
			bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),
			left: hasArc ? 0 : $$.getCurrentPaddingLeft()
		};

		// for subchart
		state.margin2 = isRotated ? {
			top: state.margin.top,
			right: NaN,
			bottom: 20 + legendHeightForBottom,
			left: $$.state.rotatedPadding.left
		} : {
			top: state.currentHeight - subchartHeight - legendHeightForBottom,
			right: NaN,
			bottom: subchartXAxisHeight + legendHeightForBottom,
			left: state.margin.left
		};

		// for legend
		state.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		};

		$$.updateSizeForLegend && $$.updateSizeForLegend(legend);

		state.width = state.currentWidth - state.margin.left - state.margin.right;
		state.height = state.currentHeight - state.margin.top - state.margin.bottom;

		if (state.width < 0) {
			state.width = 0;
		}

		if (state.height < 0) {
			state.height = 0;
		}

		state.width2 = isRotated ?
			state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right : state.width;

		state.height2 = isRotated ?
			state.height : state.currentHeight - state.margin2.top - state.margin2.bottom;

		if (state.width2 < 0) {
			state.width2 = 0;
		}

		if (state.height2 < 0) {
			state.height2 = 0;
		}

		// for arc
		state.arcWidth = state.width - (state.isLegendRight ? legend.width + 10 : 0);
		state.arcHeight = state.height - (state.isLegendRight ? 0 : 10);

		if ($$.hasType("gauge") && !config.gauge_fullCircle) {
			state.arcHeight += state.height - $$.getGaugeLabelHeight();
		}

		$$.updateRadius && $$.updateRadius();

		if (state.isLegendRight && hasArc) {
			state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
		}
	}

	/**
	 * Update targeted element with given data
	 * @param {Object} targets Data object formatted as 'target'
	 * @private
	 */
	updateTargets(targets) {
		const $$ = this;

		// Text
		$$.updateTargetsForText(targets);

		// Bar
		$$.updateTargetsForBar(targets);

		// Line
		$$.updateTargetsForLine(targets);

		// Arc & Radar
		$$.hasArcType(targets) && (
			$$.hasType("radar") ?
				$$.updateTargetsForRadar(targets) :
				$$.updateTargetsForArc(targets)
		);

		// Sub Chart
		$$.updateTargetsForSubchart &&
			$$.updateTargetsForSubchart(targets);

		// Fade-in each chart
		$$.showTargets();
	}

	/**
	 * Display targeted elements
	 * @private
	 */
	showTargets() {
		const $$ = this;

		$$.$el.svg.selectAll(`.${CLASS.target}`)
			.filter(d => $$.isTargetToShow(d.id))
			.transition()
			.duration($$.config.transition_duration)
			.style("opacity", "1");
	}

	getWithOption(options) {
		const withOptions = {
			Y: true,
			Subchart: true,
			Transition: true,
			EventRect: true,
			Dimension: true,
			TrimXDomain: true,
			Transform: false,
			UpdateXDomain: false,
			UpdateOrgXDomain: false,
			Legend: false,
			UpdateXAxis: "UpdateXDomain",
			TransitionForExit: "Transition",
			TransitionForAxis: "Transition"
		};

		Object.keys(withOptions).forEach(key => {
			let defVal = withOptions[key];

			if (isString(defVal)) {
				defVal = withOptions[defVal];
			}

			withOptions[key] = getOption(options, `with${key}`, defVal);
		});

		return withOptions;
	}

	redraw(options = {}, transitionsValue?) {
		const $$ = this;
		const {$el} = $$;
		const state = $$.state;
		const main = $el.main;
		const config = $$.config;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		const initializing = options.initializing;
		const flow = options.flow;
		const wth = $$.getWithOption(options);
		const duration = wth.Transition ? config.transition_duration : 0;
		const durationForExit = wth.TransitionForExit ? duration : 0;
		const durationForAxis = wth.TransitionForAxis ? duration : 0;
		const transitions = transitionsValue || $$.axis.generateTransitions(durationForAxis);

		!(initializing && config.tooltip_init_show) &&
			state.inputType === "touch" && $$.hideTooltip();

		$$.updateSizes(initializing);

		// update legend and transform each g

		if (wth.Legend && config.legend_show) {
			$$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
		} else if (wth.Dimension) {
			// need to update dimension (e.g. axis.y.tick.values) because y tick values should change
			// no need to update axis in it because they will be updated in redraw()
			$$.updateDimension(true);
		}

		// update axis
		// @TODO: Make 'init' state to be accessible everywhere not passing as argument.
		$$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);

		// update circleY based on updated parameters
		$$.updateCircleY();

		// xgrid focus
		$$.updategridFocus();

		// Data empty label positioning and text.
		config.data_empty_label_text && main.select(`text.${CLASS.text}.${CLASS.empty}`)
			.attr("x", state.width / 2)
			.attr("y", state.height / 2)
			.text(config.data_empty_label_text)
			.style("display", targetsToShow.length ? "none" : null);

		// grid
		$$.updateGrid(duration);

		// rect for regions
		$$.updateRegion(duration);

		// bars
		$$.updateBar(durationForExit);

		// lines, areas and circles
		$$.updateLine(durationForExit);
		$$.updateArea(durationForExit);
		$$.updateCircle();

		// text
		$$.hasDataLabel() && $$.updateText(durationForExit);

		// title
		$$.redrawTitle && $$.redrawTitle();

		// arc
		$el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);

		// radar
		$$.radars && $$.redrawRadar(duration, durationForExit);

		// circles for select
		$el.text && main.selectAll(`.${CLASS.selectedCircles}`)
			.filter($$.isBarType.bind($$))
			.selectAll("circle")
			.remove();

		// event rects will redrawn when flow called
		if (config.interaction_enabled && !flow && wth.EventRect) {
			$$.bindZoomEvent();
		}

		initializing && $$.setChartElements();

		$$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart);
		$$.callPluginHook("$redraw", options, duration);
	}

	/**
	 * Generate redraw list
	 * @param {Object} targets targets data to be shown
	 * @param {Object} flow
	 * @param {Object} duration
	 * @param {Boolean} withSubchart whether or not to show subchart
	 * @private
	 */
	generateRedrawList(targets, flow, duration, withSubchart) {
		const $$ = this;
		const config = $$.config;
		const state = $$.state;
		const shape = $$.getDrawShape();

		// subchart
		config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);

		// generate flow
		const flowFn = flow && $$.generateFlow({
			targets,
			flow,
			duration: flow.duration,
			shape,
			xv: $$.xv.bind($$)
		});
		const isTransition = (duration || flowFn) && $$.isTabVisible();

		// redraw list
		const redrawList = $$.getRedrawList(shape, flow, flowFn, isTransition);

		// callback function after redraw ends
		const afterRedraw = flow || config.onrendered ? () => {
			flowFn && flowFn();
			callFn(config.onrendered, $$, $$.api);
		} : null;

		if (afterRedraw) {
			// Only use transition when current tab is visible.
			if (isTransition && redrawList.length) {
				// Wait for end of transitions for callback
				const waitForDraw = $$.generateWait();

				// transition should be derived from one transition
				d3Transition().duration(duration)
					.each(() => {
						redrawList
							.reduce((acc, t1) => acc.concat(t1), [])
							.forEach(t => waitForDraw.add(t));
					})
					.call(waitForDraw, afterRedraw);
			} else if (!state.transiting) {
				afterRedraw();
			}
		}

		// update fadein condition
		$$.mapToIds($$.data.targets).forEach(id => {
			state.withoutFadeIn[id] = true;
		});
	}

	/**
	 * Get the shape draw function
	 * @return {Object}
	 * @private
	 */
	getDrawShape() {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;
		const hasRadar = $$.hasType("radar");
		const shape = {type: {}, indices: {}, pos: {}};

		// setup drawer - MEMO: these must be called after axis updated
		if ($$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter")) {
			const indices = $$.getShapeIndices($$.isLineType);

			shape.indices.line = indices;
			shape.type.line = $$.generateDrawLine ? $$.generateDrawLine(indices, false) : undefined;

			if ($$.hasTypeOf("Area")) {
				const indices = $$.getShapeIndices($$.isAreaType);

				shape.indices.area = indices;
				shape.type.area = $$.generateDrawArea ? $$.generateDrawArea(indices, false) : undefined;
			}
		}

		if ($$.hasType("bar")) {
			const indices = $$.getShapeIndices($$.isBarType);

			shape.indices.bar = indices;
			shape.type.bar = $$.generateDrawBar ? $$.generateDrawBar(indices) : undefined;
		}

		shape.pos = {
			xForText: $$.generateXYForText(shape.indices, true),
			yForText: $$.generateXYForText(shape.indices, false),

			// generate circle x/y functions depending on updated params
			cx: (hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX)).bind($$),
			cy: (hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY)).bind($$)
		};

		return shape;
	}

	getRedrawList(shape, flow, flowFn, isTransition) {
		const $$ = this;
		const config = $$.config;
		const hasArcType = $$.hasArcType();
		const {cx, cy, xForText, yForText} = shape.pos;
		const list = [];

		if (!hasArcType) {
			const {area, bar, line} = shape.type;

			if (config.grid_x_lines.length || config.grid_y_lines.length) {
				list.push($$.redrawGrid(isTransition));
			}

			if (config.regions.length) {
				list.push($$.redrawRegion(isTransition));
			}

			if ($$.hasTypeOf("Line")) {
				list.push($$.redrawLine(line, isTransition));
				$$.hasTypeOf("Area") && list.push($$.redrawArea(area, isTransition));
			}

			$$.hasType("bar") && list.push($$.redrawBar(bar, isTransition));

			notEmpty(config.data_labels) &&
				list.push($$.redrawText(xForText, yForText, flow, isTransition));
		}

		(!hasArcType || $$.hasType("radar")) && list.push($$.redrawCircle(cx, cy, isTransition, flowFn));

		return list;
	}

	updateAndRedraw(options = {}) {
		const $$ = this;
		const config = $$.config;
		let transitions;

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
			transitions = $$.axis.generateTransitions(
				options.withTransitionForAxis ? config.transition_duration : 0
			);

			// Update scales
			$$.updateScales();
			$$.updateSvgSize();

			// Update g positions
			$$.transformAll(options.withTransitionForTransform, transitions);
		}

		// Draw with new sizes & scales
		$$.redraw(options, transitions);
	}

	redrawWithoutRescale() {
		this.redraw({
			withY: false,
			withSubchart: false,
			withEventRect: false,
			withTransitionForAxis: false
		});
	}

	isTimeSeries() {
		return this.config.axis_x_type === "timeseries";
	}

	isCategorized() {
		return this.config.axis_x_type.indexOf("category") >= 0 || this.hasType("radar");
	}

	isCustomX() {
		const $$ = this;
		const config = $$.config;

		return !$$.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
	}

	isTimeSeriesY() {
		return this.config.axis_y_type === "timeseries";
	}

	getTranslate(target, index = 0) {
		const $$ = this;
		const config = $$.config;
		const state = $$.state;
		const isRotated = config.axis_rotated;
		const hasGauge = $$.hasType("gauge");
		let padding = 0;
		let x;
		let y;

		if (index && /^(x|y2?)$/.test(target)) {
			padding = $$.getAxisSize(target) * index;
		}

		if (target === "main") {
			x = asHalfPixel(state.margin.left);
			y = asHalfPixel(state.margin.top);
		} else if (target === "context") {
			x = asHalfPixel(state.margin2.left);
			y = asHalfPixel(state.margin2.top);
		} else if (target === "legend") {
			x = state.margin3.left;
			y = state.margin3.top + (hasGauge ? 10 : 0);
		} else if (target === "x") {
			x = isRotated ? -padding : 0;
			y = isRotated ? 0 : state.height + padding;
		} else if (target === "y") {
			x = isRotated ? 0 : -padding;
			y = isRotated ? state.height + padding : 0;
		} else if (target === "y2") {
			x = isRotated ? 0 : state.width + padding;
			y = isRotated ? 1 - padding : 0;
		} else if (target === "subX") {
			x = 0;
			y = isRotated ? 0 : state.height2;
		} else if (target === "arc") {
			x = state.arcWidth / 2;
			y = state.arcHeight / 2;
		} else if (target === "radar") {
			const [width] = $$.getRadarSize();

			x = state.width / 2 - width;
			y = asHalfPixel(state.margin.top);
		}

		return `translate(${x}, ${y})`;
	}

	initialOpacity(d) {
		const {withoutFadeIn} = this.state;

		return this.getBaseValue(d) !== null &&
			withoutFadeIn[d.id] ? "1" : "0";
	}

	initialOpacityForCircle(d) {
		const {withoutFadeIn} = this.state;

		return this.getBaseValue(d) !== null &&
			withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
	}

	opacityForCircle(d) {
		const opacity = this.config.point_show ? "1" : "0";

		return isValue(this.getBaseValue(d)) ?
			(this.isBubbleType(d) || this.isScatterType(d) ?
				"0.5" : opacity) : "0";
	}

	opacityForText() {
		return this.hasDataLabel() ? "1" : "0";
	}

	/**
	 * Get the zoom or unzoomed scaled value
	 * @param {Date|Number|Object} d Data value
	 * @private
	 */
	xx(d) {
		const $$ = this;
		const fn = $$.config.zoom_enabled && $$.zoomScale ?
			$$.zoomScale : this.x;

		return d ? fn(isValue(d.x) ? d.x : d) : null;
	}

	xv(d) {
		const $$ = this;
		let value = $$.getBaseValue(d);

		if ($$.isTimeSeries()) {
			value = $$.parseDate(value);
		} else if ($$.isCategorized() && isString(value)) {
			value = $$.config.axis_x_categories.indexOf(value);
		}

		return Math.ceil($$.x(value));
	}

	yv(d) {
		const $$ = this;
		const yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y;

		return Math.ceil(yScale($$.getBaseValue(d)));
	}

	subxx(d) {
		return d ? this.subX(d.x) : null;
	}

	transformMain(withTransition, transitions) {
		const $$ = this;
		const {main} = $$.$el;
		let xAxis;
		let yAxis;
		let y2Axis;

		if (transitions && transitions.axisX) {
			xAxis = transitions.axisX;
		} else {
			xAxis = main.select(`.${CLASS.axisX}`);

			if (withTransition) {
				xAxis = xAxis.transition();
			}
		}

		if (transitions && transitions.axisY) {
			yAxis = transitions.axisY;
		} else {
			yAxis = main.select(`.${CLASS.axisY}`);

			if (withTransition) {
				yAxis = yAxis.transition();
			}
		}

		if (transitions && transitions.axisY2) {
			y2Axis = transitions.axisY2;
		} else {
			y2Axis = main.select(`.${CLASS.axisY2}`);

			if (withTransition) {
				y2Axis = y2Axis.transition();
			}
		}

		(withTransition ? main.transition() : main)
			.attr("transform", $$.getTranslate("main"));

		xAxis.attr("transform", $$.getTranslate("x"));
		yAxis.attr("transform", $$.getTranslate("y"));
		y2Axis.attr("transform", $$.getTranslate("y2"));

		main.select(`.${CLASS.chartArcs}`)
			.attr("transform", $$.getTranslate("arc"));
	}

	transformAll(withTransition, transitions) {
		const $$ = this;

		$$.transformMain(withTransition, transitions);

		$$.config.subchart_show &&
			$$.transformContext(withTransition, transitions);

		$$.$el.legend && $$.transformLegend(withTransition);
	}

	updateSvgSize() {
		const $$ = this;
		const state = $$.state;
		const {svg} = $$.$el;
		const brush = svg.select(`.${CLASS.brush} .overlay`);
		const brushSize = {width: 0, height: 0};

		if (brush.size()) {
			brushSize.width = +brush.attr("width");
			brushSize.height = +brush.attr("height");
		}

		svg
			.attr("width", state.currentWidth)
			.attr("height", state.currentHeight);

		svg.selectAll([`#${state.clip.id}`, `#${state.clip.idGrid}`])
			.select("rect")
			.attr("width", state.width)
			.attr("height", state.height);

		svg.select(`#${state.clip.idXAxis}`)
			.select("rect")
			.attr("x", $$.getXAxisClipX.bind($$))
			.attr("y", $$.getXAxisClipY.bind($$))
			.attr("width", $$.getXAxisClipWidth.bind($$))
			.attr("height", $$.getXAxisClipHeight.bind($$));

		svg.select(`#${state.clip.idYAxis}`)
			.select("rect")
			.attr("x", $$.getYAxisClipX.bind($$))
			.attr("y", $$.getYAxisClipY.bind($$))
			.attr("width", $$.getYAxisClipWidth.bind($$))
			.attr("height", $$.getYAxisClipHeight.bind($$));

		state.clip.idSubchart && svg.select(`#${state.clip.idSubchart}`)
			.select("rect")
			.attr("width", state.width)
			.attr("height", brushSize.height);

		svg.select(`.${CLASS.zoomRect}`)
			.attr("width", state.width)
			.attr("height", state.height);
	}

	updateDimension(withoutAxis) {
		const $$ = this;
		const {axis} = $$.$el;

		if (!withoutAxis) {
			if ($$.axis.x && $$.config.axis_rotated) {
				$$.axis.x.create(axis.x);
				$$.axis.subX.create(axis.subX);
			} else {
				$$.axis.y && $$.axis.y.create(axis.y);
				$$.axis.y2 && $$.axis.y2.create(axis.y2);
			}
		}

		// pass 'withoutAxis' param to not animate at the init rendering
		$$.updateScales(withoutAxis);
		$$.updateSvgSize();
		$$.transformAll(false);
	}

	bindResize() {
		const $$ = this;
		const config = $$.config;

		$$.resizeFunction = $$.generateResize();
		$$.resizeFunction.add(() => callFn(config.onresize, $$, $$.api));

		if (config.resize_auto) {
			$$.resizeFunction.add(() => {
				if ($$.resizeTimeout) {
					window.clearTimeout($$.resizeTimeout);
					$$.resizeTimeout = null;
				}

				$$.resizeTimeout = window.setTimeout(() => {
					$$.api.flush(false, true);
				}, 200);
			});
		}

		$$.resizeFunction.add(() => callFn(config.onresized, $$, $$.api));

		// attach resize event
		window.addEventListener("resize", $$.resizeFunction);
	}

	generateResize() {
		const resizeFunctions = [];

		function callResizeFunctions() {
			resizeFunctions.forEach(f => f());
		}

		callResizeFunctions.add = f => resizeFunctions.push(f);
		callResizeFunctions.remove = f => resizeFunctions.splice(resizeFunctions.indexOf(f), 1);

		return callResizeFunctions;
	}

	endall(transition, callback) {
		let n = 0;

		transition
			.each(() => ++n)
			.on("end", function(...args) {
				!--n && callback.apply(this, ...args);
			});
	}

	generateWait() {
		let transitionsToWait = [];
		const f = function(t, callback) {
			let timer;

			function loop() {
				let done = 0;

				for (let i = 0, t; (t = transitionsToWait[i]); i++) {
					if (t.empty()) {
						done++;
						continue;
					}

					try {
						t.transition();
					} catch (e) {
						done++;
					}
				}

				timer && clearTimeout(timer);

				if (done === transitionsToWait.length) {
					callback && callback();
				} else {
					timer = setTimeout(loop, 50);
				}
			}

			loop();
		};

		f.add = function(t) {
			isArray(t) ?
				(transitionsToWait = transitionsToWait.concat(t)) :
				transitionsToWait.push(t);
		};

		return f;
	}

	parseDate(date: Date | string | number): Date {
		const $$ = this;
		let parsedDate;

		if (date instanceof Date) {
			parsedDate = date;
		} else if (isString(date)) {
			parsedDate = $$.dataTimeFormat($$.config.data_xFormat)(date);
		} else if (isNumber(date) && !isNaN(date)) {
			parsedDate = new Date(+date);
		}

		if (!parsedDate || isNaN(+parsedDate)) {
			console && console.error &&
				console.error(`Failed to parse x '${date}' to Date object`);
		}

		return parsedDate;
	}

	isTabVisible() {
		return !document.hidden;
	}

	convertInputType() {
		const $$ = this;
		const config = $$.config;
		let isMobile = false;

		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
		if (/Mobi/.test(window.navigator.userAgent) && config.interaction_inputType_touch) {
			// Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
			const hasTouchPoints = window.navigator && "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0;

			// Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
			// On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
			const hasTouch = ("ontouchmove" in window || (window.DocumentTouch && document instanceof window.DocumentTouch));

			isMobile = hasTouchPoints || hasTouch;
		}

		const hasMouse = config.interaction_inputType_mouse && !isMobile ? ("onmouseover" in window) : false;

		return (hasMouse && "mouse") || (isMobile && "touch") || null;
	}

	/**
	 * Call plugin hook
	 * @param {String} phase The lifecycle phase
	 * @private
	 */
	callPluginHook(phase, ...args) {
		this.config.plugins.forEach(v => {
			if (phase === "$beforeInit") {
				v.$$ = this;
				this.api.plugins.push(v);
			}

			v[phase](...args);
		});
	}
}

extend(ChartInternal.prototype, [
	dataConvert,
	data,
	dataLoad,
	drag,
	flow,
	interaction,
	subchart,
	zoom,
	category,
	classModule,
	clip,
	color,
	domain,
	format,
	grid,
	legend,
	region,
	scale,
	selection,
	size,
	text,
	title,
	tooltip,
	type,
	arc,
	bar,
	bubble,
	line,
	point,
	radar,
	shape
]);
