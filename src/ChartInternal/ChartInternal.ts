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
import {select as d3Select} from "d3-selection";
import {transition as d3Transition} from "d3-transition";
import CLASS from "../config/classes";
import Store from "../config/Store";
import Options from "../config/Options/Options";
import {document, window} from "../module/browser";
import Cache from "../module/Cache";
import {extend, notEmpty, convertInputType, getOption, isArray, isFunction, isObject, isString, isTabVisible, isValue, callFn, parseDate, sortValue} from "../module/util";

// for Types
import {d3Selection} from "../../types/types";

// Axis
import Axis from "./Axis/Axis";

// data
import dataConvert from "./data/data.convert";
import data from "./data/data";
import dataLoad from "./data/data.load";

// interactions
import interaction from "./interactions/interaction";

// internals
import classModule from "./internals/class";
import color from "./internals/color";
import domain from "./internals/domain";
import format from "./internals/format";
import legend from "./internals/legend";
import scale from "./internals/scale";
import size from "./internals/size";
import text from "./internals/text";
import title from "./internals/title";
import tooltip from "./internals/tooltip";
import transform from "./internals/transform";
import type from "./internals/type";

import moduleAxis from "../config/resolver/axis";
import moduleArc from "../config/resolver/arc";

type N = d3Selection|null;
type F = Function|null;

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
	public isArc = false; // if is Arc type chart

	// data object
	public data = {
		xs: {},
		targets: []
	};

	// selections
	public $el: {
		[key: string]: N | {[key: string]: N}
	} = {
		chart: null,
		main: null,
		svg: null,
		axis: {  // axes
			x: null,
			y: null,
			y2: null,
			subX: null
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
		bar: null, //mainBar,
		line: null, //mainLine,
		area: null, //mainArea,
		circle: null, //mainCircle,
		text: null, //mainText,
		grid: {
			main: null,  // grid (also focus)
			x: null, // xgrid,
			y: null, // ygrid,
		},
		gridLines: {
			main: null,  // gridLines
			x: null, // xgridLines,
			y: null, // ygridLines
		},
		region: {
			main: null, //region
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

	// original values
	public org = {
		xScale: null,
		xDomain: null
	};

	// formatter function
	public color;
	public patterns;
	public levelColor;
	public point;
	public brush;

	// format function
	public format = {
		extraLineClasses: null,
		xAxisTick: null,
		dataTime: null, // dataTimeFormat
		defaultAxisTime: null, // defaultAxisTimeFormat
		axisTime: null // axisTimeFormat
	};

	constructor(api) {
		const $$ = this;

		$$.api = api; // Chart instance
		$$.config = new Options();
		$$.cache = new Cache();
		$$.state = new Store(); // status variables
	}

	beforeInit() {
		const $$ = this;

		$$.callPluginHook("$beforeInit");

		// can do something
		callFn($$.config.onbeforeinit, $$.api);
	}

	afterInit() {
		const $$ = this;

		$$.callPluginHook("$afterInit");

		// can do something
		callFn($$.config.onafterinit, $$.api);
	}

	init() {
		const $$ = this;
		const {config, state, $el} = $$;

		state.hasAxis = !$$.hasArcType();
		state.hasRadar = !state.hasAxis && $$.hasType("radar");

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
		const {config, state, $el: {chart}} = $$;
		const isHidden = () => chart.style("display") === "none" || chart.style("visibility") === "hidden";

		const isLazy = config.render.lazy || isHidden();
		const MutationObserver = window.MutationObserver;

		if (isLazy && MutationObserver && config.render.observe !== false && !forced) {
			new MutationObserver((mutation, observer) => {
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
			const convertedData = $$.convertData(config, $$.initWithData);

			convertedData && $$.initWithData(convertedData);
		}
	}

	initParams() {
		const $$ = this;
		const {config, format, state} = $$;
		const isRotated = config.axis_rotated;

		// datetime to be used for uniqueness
		state.datetimeId = `bb-${+new Date()}`;

		$$.color = $$.generateColor();
		$$.levelColor = $$.generateLevelColor();

		if ($$.hasPointType()) {
			$$.point = $$.generatePoint();
		}

		if (state.hasAxis) {
			$$.initClip();

			format.extraLineClasses = $$.generateExtraLineClass();
			format.dataTime = config.data_xLocaltime ? d3TimeParse : d3UtcParse;
			format.axisTime = config.axis_x_localtime ? d3TimeFormat : d3UtcFormat;

			const isDragZoom = $$.config.zoom_enabled && $$.config.zoom_enabled.type === "drag";

			format.defaultAxisTime = d => {
				const {x, zoom} = $$.scale;
				const isZoomed = isDragZoom ? zoom :
					zoom && x.orgDomain().toString() !== zoom.domain().toString();

				const specifier: string = (d.getMilliseconds() && ".%L") ||
					(d.getSeconds() && ".:%S") ||
					(d.getMinutes() && "%I:%M") ||
					(d.getHours() && "%I %p") ||
					(d.getDate() !== 1 && "%b %d") ||
					(isZoomed && d.getDate() === 1 && "%b\'%y") ||
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

		state.rotatedPaddingRight = isRotated && !config.axis_x_show ? 0 : 30;

		state.inputType = convertInputType(
			config.interaction_inputType_mouse,
			config.interaction_inputType_touch
		);
	}

	initWithData(data) {
		const $$ = this;
		const {
			config, state, $el,
			scale: {
				x, y, y2, subX, subY, subY2
			},
			org
		} = $$;
		const {hasAxis} = state;

		// for arc type, set axes to not be shown
		// $$.hasArcType() && ["x", "y", "y2"].forEach(id => (config[`axis_${id}_show`] = false));

		if (hasAxis) {
			$$.axis = new Axis($$);
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
		if (x) {
			x.domain(sortValue($$.getXDomain($$.data.targets)));
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

		// -- Basic Elements --
		$el.svg = $el.chart.append("svg")
			.style("overflow", "hidden")
			.style("display", "block");

		if (config.interaction_enabled && state.inputType) {
			const isTouch = state.inputType === "touch";

			$el.svg.on(isTouch ? "touchstart" : "mouseenter", () => callFn(config.onover, $$.api))
				.on(isTouch ? "touchend" : "mouseleave", () => callFn(config.onout, $$.api));
		}

		config.svg_classname && $el.svg.attr("class", config.svg_classname);

		// Define defs
		const hasColorPatterns = (isFunction(config.color_tiles) && $$.patterns);

		if (hasAxis || hasColorPatterns) {
			$el.defs = $el.svg.append("defs");

			if (hasAxis) {
				["id", "idXAxis", "idYAxis", "idGrid"].forEach(v => {
					$$.appendClip($el.defs, state.clip[v]);
				});
			}

			// set color patterns
			if (hasColorPatterns) {
				$$.patterns.forEach(p => $el.defs.append(() => p.node));
			}
		}

		$$.updateSvgSize();

		// Bind resize event
		$$.bindResize();

		// Define regions
		const main = $el.svg.append("g").attr("transform", $$.getTranslate("main"));

		$el.main = main;

		// initialize subchart when subchart show option is set
		config.subchart_show && $$.initSubchart();

		config.tooltip_show && $$.initTooltip();
		config.title_text && $$.initTitle();
		config.legend_show && $$.initLegend();

		// -- Main Region --

		// text when empty
		if (config.data_empty_label_text) {
			main.append("text")
				.attr("class", `${CLASS.text} ${CLASS.empty}`)
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
		main.append("g").attr("class", CLASS.chart)
			.attr("clip-path", state.clip.path);

		$$.callPluginHook("$init");

		if (hasAxis) {
			// Cover whole with rects for events
			$$.initEventRect && $$.initEventRect();

			// Grids
			$$.initGrid();

			// if zoom privileged, insert rect to forefront
			// if (config.zoom_enabled) {
			// 	main.insert("rect", config.zoom_privileged ? null : `g.${CLASS.regions}`)
			// 		.attr("class", CLASS.zoomRect)
			// 		.attr("width", $$.state.width)
			// 		.attr("height", $$.state.height)
			// 		.style("opacity", "0")
			// 		.on("dblclick.zoom", null);
			// }

			// Add Axis here, when clipPath is 'true'
			config.clipPath && $$.axis && $$.axis.init();
		}

		$$.initChartElements();

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
			const minMax = $$.getMinMaxData();

			callFn(config.data_onmin, $$.api, minMax.min);
			callFn(config.data_onmax, $$.api, minMax.max);
		}

		// export element of the chart
		$$.api.element = $el.chart.node();

		state.rendered = true;
	}

	initChartElements() {
		const $$ = this;
		const {hasAxis, hasRadar} = $$.state;
		const types = [];

		if (hasAxis) {
			$$.hasType("bar") && types.push("Bar");
			$$.hasType("bubble") && types.push("Bubble");
			$$.hasTypeOf("Line") && types.push("Line");
		} else {
			if (!hasRadar) {
				types.push("Arc", "Pie");
			}

			if ($$.hasType("gauge")) {
				types.push("Gauge");
			} else if (hasRadar) {
				types.push("Radar");
			}
		}

		types.forEach(v => {
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
			grid: $el.grid,
			arc: $el.arcs,
			circles: $el.circle,
			bar: {
				bars: $el.bar
			},
			line: {
				lines: $el.line,
				areas: $el.area
			},
			text: {
				texts: $el.text
			}
		};
	}

	/**
	 * Set background element/image
	 * @private
	 */
	setBackground() {
		const $$ = this;
		const {config: {background: bg}, $el: {svg}} = $$;

		if (notEmpty(bg)) {
			const element = svg.select(`.${CLASS[$$.hasArcType() ? "chart" : "regions"]}`)
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

	/**
	 * Update targeted element with given data
	 * @param {Object} targets Data object formatted as 'target'
	 * @private
	 */
	updateTargets(targets) {
		const $$ = this;
		const {hasAxis, hasRadar} = $$.state;

		// Text
		$$.updateTargetsForText(targets);

		// circle
		if ($$.hasPointType() || hasRadar) {
			$$.updateTargetForCircle();
		}

		if (hasAxis) {
			$$.hasType("bar") && $$.updateTargetsForBar(targets); // Bar
			$$.hasTypeOf("Line") && $$.updateTargetsForLine(targets); // Line

			// Sub Chart
			$$.updateTargetsForSubchart &&
				$$.updateTargetsForSubchart(targets);
		} else {
			// Arc & Radar
			$$.hasArcType(targets) && (
				hasRadar ?
					$$.updateTargetsForRadar(targets) :
					$$.updateTargetsForArc(targets)
			);
		}

		// Fade-in each chart
		$$.showTargets();
	}

	/**
	 * Display targeted elements
	 * @private
	 */
	showTargets() {
		const $$ = this;
		const {config, $el: {svg}} = $$;

		svg.selectAll(`.${CLASS.target}`)
			.filter(d => $$.isTargetToShow(d.id))
			.transition()
			.duration(config.transition_duration)
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
		const {config, state, $el} = $$;
		const {main} = $el;
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);

		const initializing = options.initializing;
		const flow = options.flow;
		const wth = $$.getWithOption(options);
		const duration = wth.Transition ? config.transition_duration : 0;
		const durationForExit = wth.TransitionForExit ? duration : 0;
		const durationForAxis = wth.TransitionForAxis ? duration : 0;
		const transitions = transitionsValue || $$.axis && $$.axis.generateTransitions(durationForAxis);

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

		// text
		$$.hasDataLabel() && $$.updateText(durationForExit);

		// update circleY based on updated parameters
		if (!$$.hasArcType() || state.hasRadar) {
			$$.updateCircleY();
		}

		//@TODO: Axis & Radar type
		if ($$.hasPointType() || state.hasRadar) {
			$$.updateCircle();
		}

		// update axis
		if (state.hasAxis) {
			// @TODO: Make 'init' state to be accessible everywhere not passing as argument.
			$$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);

			// xgrid focus
			$$.updategridFocus();

			// Data empty label positioning and text.
			config.data_empty_label_text && main.select(`text.${CLASS.text}.${CLASS.empty}`)
				.attr("x", state.width / 2)
				.attr("y", state.height / 2)
				.text(config.data_empty_label_text)
				.style("display", targetsToShow.length ? "none" : null);

			// grid
			$$.hasGrid() && $$.updateGrid(duration);

			// rect for regions
			config.regions.length && $$.updateRegion(duration);

			// bars
			$$.hasType("bar") && $$.updateBar(durationForExit);

			// lines, areas and circles
			if ($$.hasTypeOf("Line")) {
				$$.updateLine(durationForExit);
			}

			if ($$.hasTypeOf("Area")) {
				$$.updateArea(durationForExit);
			}

			// circles for select
			$el.text && main.selectAll(`.${CLASS.selectedCircles}`)
				.filter($$.isBarType.bind($$))
				.selectAll("circle")
				.remove();

			// event rects will redrawn when flow called
			if (config.interaction_enabled && !flow && wth.EventRect) {
				$$.bindZoomEvent();
			}
		} else {
			// arc
			$el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);

			// radar
			$$.radars && $$.redrawRadar(durationForExit);
		}

		// title
		$$.redrawTitle && $$.redrawTitle();

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
		const {config, state} = $$;
		const shape = $$.getDrawShape();

		if (state.hasAxis) {
			// subchart
			config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
		}

		// generate flow
		const flowFn = flow && $$.generateFlow({
			targets,
			flow,
			duration: flow.duration,
			shape,
			xv: $$.xv.bind($$)
		});
		const isTransition = (duration || flowFn) && isTabVisible();

		// redraw list
		const redrawList = $$.getRedrawList(shape, flow, flowFn, isTransition);

		// callback function after redraw ends
		const afterRedraw = flow || config.onrendered ? () => {
			flowFn && flowFn();
			callFn(config.onrendered, $$.api);
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

	getRedrawList(shape, flow, flowFn, isTransition) {
		const $$ = this;
		const {config, state: {hasAxis, hasRadar}} = $$;
		const {cx, cy, xForText, yForText} = shape.pos;
		const list = [];

		if (hasAxis) {
			const {area, bar, line} = shape.type;

			if (config.grid_x_lines.length || config.grid_y_lines.length) {
				list.push($$.redrawGrid(isTransition));
			}

			if (config.regions.length) {
				list.push($$.redrawRegion(isTransition));
			}

			$$.hasTypeOf("Line") && list.push($$.redrawLine(line, isTransition));
			$$.hasTypeOf("Area") && list.push($$.redrawArea(area, isTransition));
			$$.hasType("bar") && list.push($$.redrawBar(bar, isTransition));
		}

		if (!$$.hasArcType() || hasRadar) {
			notEmpty(config.data_labels) &&
				list.push($$.redrawText(xForText, yForText, flow, isTransition));
		}

		if ($$.hasPointType() || hasRadar) {
			list.push($$.redrawCircle(cx, cy, isTransition, flowFn));
		}

		return list;
	}

	updateAndRedraw(options = {}) {
		const $$ = this;
		const {config, state} = $$;
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
			if (state.hasAxis) {
				transitions = $$.axis.generateTransitions(
					options.withTransitionForAxis ? config.transition_duration : 0
				);
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

	redrawWithoutRescale() {
		this.redraw({
			withY: false,
			withSubchart: false,
			withEventRect: false,
			withTransitionForAxis: false
		});
	}

	isCategorized() {
		return this.config.axis_x_type.indexOf("category") >= 0 || this.state.hasRadar;
	}

	isCustomX() {
		const $$ = this;
		const {config} = $$;

		return !$$.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
	}

	isTimeSeries(id = "x") {
		return this.config[`axis_${id}_type`] === "timeseries";
	}

	isTimeSeriesY() {
		return this.isTimeSeries("y");
	}

	initialOpacity(d) {
		const {withoutFadeIn} = this.state;

		return this.getBaseValue(d) !== null &&
			withoutFadeIn[d.id] ? "1" : "0";
	}

	/**
	 * Get the zoom or unzoomed scaled value
	 * @param {Date|Number|Object} d Data value
	 * @private
	 */
	xx(d) {
		const $$ = this;
		const {config, scale: {x, zoom}} = $$;
		const fn = config.zoom_enabled && zoom ?
			zoom : x;

		return d ? fn(isValue(d.x) ? d.x : d) : null;
	}

	xv(d) {
		const $$ = this;
		const {config, scale: {x}} = $$;
		let value = $$.getBaseValue(d);

		if ($$.isTimeSeries()) {
			value = parseDate.call($$, value);
		} else if ($$.isCategorized() && isString(value)) {
			value = config.axis_x_categories.indexOf(value);
		}

		return Math.ceil(x(value));
	}

	yv(d) {
		const $$ = this;
		const {scale: {y, y2}} = $$;
		const yScale = d.axis && d.axis === "y2" ? y2 : y;

		return Math.ceil(yScale($$.getBaseValue(d)));
	}

	subxx(d) {
		return d ? this.scale.subX(d.x) : null;
	}

	bindResize() {
		const $$ = this;
		const config = $$.config;
		const resizeFunction = $$.generateResize();
		const list = [];

		list.push(() => callFn(config.onresize, $$, $$.api));

		if (config.resize_auto) {
			list.push(() => $$.api.flush(false, true));
		}

		list.push(() => callFn(config.onresized, $$, $$.api));

		// add resize functions
		list.forEach(v => resizeFunction.add(v));

		// attach resize event
		window.addEventListener("resize", $$.resizeFunction = resizeFunction);
	}

	generateResize() {
		const fn = [];

		function callResizeFn() {
			// Delay all resize functions call, to prevent unintended excessive call from resize event
			if (callResizeFn.timeout) {
				window.clearTimeout(callResizeFn.timeout);
				callResizeFn.timeout = null;
			}

			callResizeFn.timeout = window.setTimeout(() => {
				fn.forEach(f => f());
			}, 200);
		}

		callResizeFn.add = f => fn.push(f);
		callResizeFn.remove = f => fn.splice(fn.indexOf(f), 1);

		return callResizeFn;
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
	// common
	dataConvert,
	data,
	dataLoad,
	classModule,
	color,
	domain,
	interaction,
	format,
	legend,
	scale,
	size,
	text,
	title,
	tooltip,
	transform,
	type,
	...moduleArc.internal,
	...moduleAxis.internal
]);
