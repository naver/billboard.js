/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
import {select as d3Select} from "d3-selection";
import {
	timeFormat as d3TimeFormat,
	timeParse as d3TimeParse,
	utcFormat as d3UtcFormat,
	utcParse as d3UtcParse
} from "d3-time-format";
import type {d3Selection, d3Transition} from "../../types/types";
import {$CIRCLE, $COMMON, $TEXT} from "../config/classes";
import Options from "../config/Options/Options";
import Store from "../config/Store/Store";
import {document, window} from "../module/browser";
import Cache from "../module/Cache";
import {checkModuleImport} from "../module/error";
import {generateResize} from "../module/generator";
import {
	callFn,
	capitalize,
	convertInputType,
	extend,
	getOption,
	getRandom,
	hasStyle,
	isFunction,
	isObject,
	isString,
	notEmpty,
	sortValue
} from "../module/util";

// data
import dataConvert from "./data/convert";
import data from "./data/data";
import dataLoad from "./data/load";

// interactions
import interaction from "./interactions/interaction";

// internals
import category from "./internals/category"; // used to retrieve radar Axis name
import classModule from "./internals/class";
import color from "./internals/color";
import domain from "./internals/domain";
import format from "./internals/format";
import legend from "./internals/legend";
import redraw from "./internals/redraw";
import scale from "./internals/scale";
import size from "./internals/size";
import style from "./internals/style";
import text from "./internals/text";
import title from "./internals/title";
import tooltip from "./internals/tooltip";
import transform from "./internals/transform";
import typeInternals from "./internals/type";
import shape from "./shape/shape";

/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
 */
export default class ChartInternal {
	public api; // API interface
	public config; // config object
	public cache; // cache instance
	public $el; // elements
	public state; // state variables
	public charts; // all Chart instances array within page (equivalent of 'bb.instances')

	// data object
	public data = {
		xs: {},
		targets: []
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
	};

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

		$$.api = api; // Chart class instance alias
		$$.config = new Options();
		$$.cache = new Cache();

		const store = new Store();

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
	$T(selection: SVGElement | d3Selection | d3Transition, force?: boolean,
		name?: string): d3Selection {
		const {config, state} = this;
		const duration = config.transition_duration;
		const subchart = config.subchart_show;
		let t = selection;

		if (t) {
			// in case of non d3 selection, wrap with d3 selection
			if ("tagName" in t) {
				t = d3Select(t);
			}

			// do not transit on:
			// - wheel zoom (state.zooming = true)
			// - when has no subchart
			// - initialization
			// - resizing
			const transit = ((force !== false && duration) || force) &&
				(!state.zooming || state.dragging) &&
				!state.resizing &&
				state.rendered &&
				!subchart;

			// @ts-ignore
			t = (transit ? t.transition(name).duration(duration) : t) as d3Selection;
		}

		return t;
	}

	beforeInit(): void {
		const $$ = this;

		$$.callPluginHook("$beforeInit");

		// can do something
		callFn($$.config.onbeforeinit, $$.api);
	}

	afterInit(): void {
		const $$ = this;

		$$.callPluginHook("$afterInit");

		// can do something
		callFn($$.config.onafterinit, $$.api);
	}

	init(): void {
		const $$ = <any>this;
		const {config, state, $el} = $$;
		const {boost_useCssRule, bindto} = config;

		checkModuleImport($$);

		const hasArcType = $$.hasArcType();
		state.hasRadar = !state.hasAxis && $$.hasType("radar");
		state.hasFunnel = !state.hasAxis && $$.hasType("funnel");
		state.hasTreemap = !state.hasAxis && $$.hasType("treemap");
		state.hasAxis = !hasArcType && !state.hasFunnel && !state.hasTreemap;

		// datetime to be used for uniqueness
		state.datetimeId = `bb-${+new Date() * (getRandom() as number)}`;

		if (boost_useCssRule) {
			// append style element
			const styleEl = document.createElement("style");

			// styleEl.id = styleId;
			styleEl.type = "text/css";
			document.head.appendChild(styleEl);

			state.style = {
				rootSelctor: `.${state.datetimeId}`,
				sheet: styleEl.sheet
			};

			// used on .destroy()
			$el.style = styleEl;
		}

		const bindConfig = {
			element: bindto,
			classname: "bb"
		};

		if (isObject(bindto)) {
			bindConfig.element = bindto.element || "#chart";
			bindConfig.classname = bindto.classname || bindConfig.classname;
		}

		// select bind element
		$el.chart = isFunction(bindConfig.element.node) ?
			bindto.element :
			d3Select(bindConfig.element || []);

		if ($el.chart.empty()) {
			$el.chart = d3Select(document.body.appendChild(document.createElement("div")));
		}

		$el.chart.html("")
			.classed(bindConfig.classname, true)
			.classed(state.datetimeId, boost_useCssRule)
			.style("position", "relative");

		$$.initParams();
		$$.initToRender();
	}

	/**
	 * Initialize the rendering process
	 * @param {boolean} forced Force to render process
	 * @private
	 */
	initToRender(forced?: boolean): void {
		const $$ = <any>this;
		const {config, state, $el: {chart}} = $$;
		const isHidden = () => hasStyle(chart, {display: "none", visibility: "hidden"});

		const isLazy = config.render.lazy === false ? false : config.render.lazy || isHidden();
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
			$$.convertData(config, res => {
				$$.initWithData(res);
				$$.afterInit();
			});
		}
	}

	initParams(): void {
		const $$ = <any>this;
		const {config, format, state} = $$;

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

		if ($$.hasPointType() || $$.hasLegendDefsPoint?.()) {
			$$.point = $$.generatePoint();
		}

		if (state.hasAxis) {
			$$.initClip();

			format.extraLineClasses = $$.generateExtraLineClass();
			format.dataTime = config.data_xLocaltime ? d3TimeParse : d3UtcParse;
			format.axisTime = config.axis_x_localtime ? d3TimeFormat : d3UtcFormat;

			const isDragZoom = config.zoom_enabled && config.zoom_type === "drag";

			format.defaultAxisTime = d => {
				const {x, zoom} = $$.scale;
				const isZoomed = isDragZoom ?
					zoom :
					zoom && x.orgDomain().toString() !== zoom.domain().toString();

				const specifier: string = (d.getMilliseconds() && ".%L") ||
					(d.getSeconds() && ".:%S") ||
					(d.getMinutes() && "%I:%M") ||
					(d.getHours() && "%I %p") ||
					(d.getDate() !== 1 && "%b %d") ||
					(isZoomed && d.getDate() === 1 && "%b'%y") ||
					(d.getMonth() && "%-m/%-d") || "%Y";

				return format.axisTime(specifier)(d);
			};
		}

		const {legend_position, legend_inset_anchor, axis_rotated} = config;

		state.isLegendRight = legend_position === "right";
		state.isLegendInset = legend_position === "inset";
		state.isLegendTop = legend_inset_anchor === "top-left" ||
			legend_inset_anchor === "top-right";
		state.isLegendLeft = legend_inset_anchor === "top-left" ||
			legend_inset_anchor === "bottom-left";

		state.rotatedPadding.top = $$.getResettedPadding(state.rotatedPadding.top);
		state.rotatedPadding.right = axis_rotated && !config.axis_x_show ? 0 : 30;

		state.inputType = convertInputType(
			config.interaction_inputType_mouse,
			config.interaction_inputType_touch
		);
	}

	initWithData(data): void {
		const $$ = <any>this;
		const {config, scale, state, $el, org} = $$;
		const {hasAxis, hasFunnel, hasTreemap} = state;
		const hasInteraction = config.interaction_enabled;
		const hasPolar = $$.hasType("polar");
		const labelsBGColor = config.data_labels_backgroundColors;

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
			$$.addHiddenTargetIds(
				config.data_hide === true ? $$.mapToIds($$.data.targets) : config.data_hide
			);
		}

		if (config.legend_hide) {
			$$.addHiddenLegendIds(
				config.legend_hide === true ? $$.mapToIds($$.data.targets) : config.legend_hide
			);
		}

		// Init sizes and scales
		$$.updateSizes();
		$$.updateScales(true);

		// retrieve scale after the 'updateScales()' is called
		if (hasAxis) {
			const {x, y, y2, subX, subY, subY2} = scale;

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
			const isTouch = state.inputType === "touch";
			const {onclick, onover, onout} = config;

			$el.svg
				.on("click", onclick?.bind($$.api) || null)
				.on(isTouch ? "touchstart" : "mouseenter", onover?.bind($$.api) || null)
				.on(isTouch ? "touchend" : "mouseleave", onout?.bind($$.api) || null);
		}

		config.svg_classname && $el.svg.attr("class", config.svg_classname);

		// Define defs
		const hasColorPatterns = isFunction(config.color_tiles) && $$.patterns;

		if (
			hasAxis || hasColorPatterns || hasPolar || hasTreemap ||
			labelsBGColor || $$.hasLegendDefsPoint?.()
		) {
			$el.defs = $el.svg.append("defs");

			if (hasAxis) {
				["id", "idXAxis", "idYAxis", "idGrid"].forEach(v => {
					$$.appendClip($el.defs, state.clip[v]);
				});
			}

			// Append data background color filter definition
			$$.generateTextBGColorFilter(labelsBGColor);

			// set color patterns
			if (hasColorPatterns) {
				$$.patterns.forEach(p => $el.defs.append(() => p.node));
			}
		}

		$$.updateSvgSize();

		// Bind resize event
		$$.bindResize();

		// Define regions
		const main = $el.svg.append("g")
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
				.attr("class", `${$TEXT.text} ${$COMMON.empty}`)
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
			hasInteraction && $$.initEventRect?.();

			// Grids
			$$.initGrid();

			// Add Axis here, when clipPath is 'true'
			config.clipPath && $$.axis?.init();
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
			const minMax = $$.getMinMaxData();

			callFn(config.data_onmin, $$.api, minMax.min);
			callFn(config.data_onmax, $$.api, minMax.max);
		}

		config.tooltip_show && $$.initShowTooltip();
		state.rendered = true;
	}

	/**
	 * Initialize chart elements
	 * @private
	 */
	initChartElements(): void {
		const $$ = <any>this;
		const {hasAxis, hasRadar, hasTreemap} = $$.state;
		const types: string[] = [];

		if (hasAxis) {
			const shapes = ["bar", "bubble", "candlestick", "line"];

			if ($$.config.bar_front) {
				shapes.push(shapes.shift() as string);
			}

			for (const shape of shapes) {
				const name = capitalize(shape);
				if ((shape === "line" && $$.hasTypeOf(name)) || $$.hasType(shape)) {
					types.push(name);
				}
			}
		} else if (hasTreemap) {
			types.push("Treemap");
		} else if ($$.hasType("funnel")) {
			types.push("Funnel");
		} else {
			const hasPolar = $$.hasType("polar");
			const hasGauge = $$.hasType("gauge");

			if (!hasRadar) {
				types.push("Arc", "Pie");
			}

			if (hasGauge) {
				types.push("Gauge");
			} else if (hasRadar) {
				types.push("Radar");
			} else if (hasPolar) {
				types.push("Polar");
			}
		}

		for (const type of types) {
			$$[`init${type}`]();
		}

		if (notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"])) {
			$$.initText();
		}
	}

	/**
	 * Set chart elements
	 * @private
	 */
	setChartElements(): void {
		const $$ = this;
		const {
			$el: {
				chart,
				svg,
				defs,
				main,
				tooltip,
				legend,
				title,
				grid,
				needle,
				arcs: arc,
				circle: circles,
				bar: bars,
				candlestick,
				line: lines,
				area: areas,
				text: texts
			}
		} = $$;

		// public
		$$.api.$ = {
			chart,
			svg,
			defs,
			main,
			tooltip,
			legend,
			title,
			grid,
			arc,
			circles,
			bar: {bars},
			candlestick,
			line: {lines, areas},
			needle,
			text: {texts}
		};
	}

	/**
	 * Set background element/image
	 * @private
	 */
	setBackground(): void {
		const $$ = this;
		const {config: {background: bg}, state, $el: {svg}} = $$;

		if (notEmpty(bg)) {
			const element = svg.select("g")
				.insert(bg.imgUrl ? "image" : "rect", ":first-child");

			if (bg.imgUrl) {
				element.attr("href", bg.imgUrl);
			} else if (bg.color) {
				element
					.style("fill", bg.color)
					.attr("clip-path", state.clip.path);
			}

			element
				.attr("class", bg.class || null)
				.attr("width", "100%")
				.attr("height", "100%");
		}
	}

	/**
	 * Update targeted element with given data
	 * @param {object} targets Data object formatted as 'target'
	 * @private
	 */
	updateTargets(targets): void {
		const $$ = <any>this;
		const {hasAxis, hasFunnel, hasRadar, hasTreemap} = $$.state;
		const helper = type =>
			$$[`updateTargetsFor${type}`](
				targets.filter($$[`is${type}Type`].bind($$))
			);

		// Text
		$$.updateTargetsForText(targets);

		if (hasAxis) {
			const shapes = ["bar", "candlestick", "line"];
			for (const shape of shapes) {
				const name = capitalize(shape);
				if ((shape === "line" && $$.hasTypeOf(name)) || $$.hasType(shape)) {
					helper(name);
				}
			}

			// Sub Chart
			$$.updateTargetsForSubchart?.(targets);

			// Arc, Polar, Radar
		} else if ($$.hasArcType(targets)) {
			let type = "Arc";

			if (hasRadar) {
				type = "Radar";
			} else if ($$.hasType("polar")) {
				type = "Polar";
			}

			helper(type);
		} else if (hasFunnel) {
			helper("Funnel");
		} else if (hasTreemap) {
			helper("Treemap");
		}

		// Point types
		const hasPointType = $$.hasType("bubble") || $$.hasType("scatter");

		if (hasPointType) {
			$$.updateTargetForCircle?.();
		}

		// Fade-in each chart
		$$.filterTargetsToShowAtInit(hasPointType);
	}

	/**
	 * Display targeted elements at initialization
	 * @param {boolean} hasPointType whether has point type(bubble, scatter) or not
	 * @private
	 */
	filterTargetsToShowAtInit(hasPointType: boolean = false): void {
		const $$ = <any>this;
		const {$el: {svg}, $T} = $$;
		let selector = `.${$COMMON.target}`;

		if (hasPointType) {
			selector += `, .${$CIRCLE.chartCircles} > .${$CIRCLE.circles}`;
		}

		$T(svg.selectAll(selector)
			.filter(d => $$.isTargetToShow(d.id))).style("opacity", null);
	}

	getWithOption(options) {
		const withOptions = {
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

		for (const [key, defVal] of Object.entries(withOptions)) {
			const value = isString(defVal) ? withOptions[defVal] : defVal;
			withOptions[key] = getOption(options, `with${key}`, value);
		}

		return withOptions;
	}

	initialOpacity(d): null | "0" {
		const $$ = <any>this;
		const {withoutFadeIn} = $$.state;

		return $$.getBaseValue(d) !== null && withoutFadeIn[d.id] ? null : "0";
	}

	bindResize(): void {
		const $$ = <any>this;
		const {$el, config, state} = $$;
		const resizeFunction = generateResize(config.resize_timer);
		const {resize_auto} = config;
		const list: (() => void)[] = [];

		list.push(() => callFn(config.onresize, $$.api));

		if (/^(true|parent)$/.test(resize_auto)) {
			list.push(() => {
				state.resizing = true;

				// https://github.com/naver/billboard.js/issues/2650
				if (config.legend_show) {
					$$.updateSizes();
					$$.updateLegend();
				}

				$$.api.flush(false);
			});
		}

		list.push(() => {
			callFn(config.onresized, $$.api);
			state.resizing = false;
		});

		// add resize functions
		list.forEach(v => resizeFunction.add(v));
		$$.resizeFunction = resizeFunction;

		// attach resize event
		if (resize_auto === "parent") {
			($$.resizeFunction.resizeObserver = new ResizeObserver($$.resizeFunction.bind($$)))
				.observe($el.chart.node().parentNode);
		} else {
			window.addEventListener("resize", $$.resizeFunction);
		}
	}

	/**
	 * Call plugin hook
	 * @param {string} phase The lifecycle phase
	 * @param {Array} args Arguments
	 * @private
	 */
	callPluginHook(phase, ...args): void {
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
	category,
	classModule,
	color,
	domain,
	interaction,
	format,
	legend,
	redraw,
	scale,
	shape,
	size,
	style,
	text,
	title,
	tooltip,
	transform,
	typeInternals
]);
