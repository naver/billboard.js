/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { document as doc, window as win } from "../module/browser.js";
import { isBoolean, isFunction, isObject, isString, notEmpty } from "../module/util/type-checks.js";
import { callFn, capitalize, extend, getOption, getRandom, sortValue } from "../module/util/object.js";
import { convertInputType, hasStyle } from "../module/util/dom.js";
import { checkModuleImport } from "../module/error.js";
import { $CIRCLE, $COMMON, $TEXT } from "../config/classes.js";
import Options from "../config/Options/Options.js";
import Store from "../config/Store/Store.js";
import Cache from "../module/Cache.js";
import { generateResize } from "../module/generator.js";
import convert_default from "./data/convert.js";
import data_default from "./data/data.js";
import load_default from "./data/load.js";
import interaction_default from "./interactions/interaction.js";
import category_default from "./internals/category.js";
import class_default from "./internals/class.js";
import color_default from "./internals/color.js";
import domain_default from "./internals/domain.js";
import format_default from "./internals/format.js";
import legend_default from "./internals/legend.js";
import redraw_default from "./internals/redraw.js";
import scale_default from "./internals/scale.js";
import size_default from "./internals/size.js";
import style_default from "./internals/style.js";
import text_default from "./internals/text.js";
import title_default from "./internals/title.js";
import tooltip_default from "./internals/tooltip.js";
import transform_default from "./internals/transform.js";
import type_default from "./internals/type.js";
import shape_default from "./shape/shape.js";
import { select } from "d3-selection";
import { timeFormat, timeParse, utcFormat, utcParse } from "d3-time-format";
//#region src/ChartInternal/ChartInternal.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
* @ignore
*/
/**
* Get the current time in ms.
* @returns {number} Timestamp
* @private
*/
function getTime() {
	return win.performance?.now?.() ?? Date.now();
}
/**
* Get SVG-only chart type reason for canvas render fallback.
* @param {object} $$ ChartInternal instance
* @returns {string|null} Unsupported chart type reason
* @private
*/
function getUnsupportedCanvasRenderType($$) {
	if ($$.hasArcType()) return "arc charts";
	if ($$.hasType("funnel")) return "funnel chart";
	return null;
}
/**
* Fall back to SVG when canvas mode is requested for unsupported chart types.
* @param {object} $$ ChartInternal instance
* @private
*/
function fallbackUnsupportedCanvasRenderMode($$) {
	const { config } = $$;
	const unsupportedType = config.render_mode === "canvas" ? getUnsupportedCanvasRenderType($$) : null;
	if (!unsupportedType) return;
	win.console?.warn?.(`[billboard.js] render.mode='canvas' is ignored for ${unsupportedType}; falling back to SVG.`);
	config.render_mode = "svg";
}
/**
* Internal chart class.
* - Note: Instantiated internally, not exposed for public.
* @class ChartInternal
* @ignore
* @private
*/
var ChartInternal = class {
	api;
	config;
	cache;
	$el;
	state;
	charts;
	data = {
		xs: {},
		targets: []
	};
	axis;
	scale = {
		x: null,
		y: null,
		y2: null,
		subX: null,
		subY: null,
		subY2: null,
		zoom: null
	};
	org = {
		xScale: null,
		xDomain: null
	};
	color;
	patterns;
	levelColor;
	point;
	brush;
	format = {
		extraLineClasses: null,
		xAxisTick: null,
		dataTime: null,
		defaultAxisTime: null,
		axisTime: null
	};
	constructor(api) {
		const $$ = this;
		$$.api = api;
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
	$T(selection, force, name) {
		const { config, state } = this;
		const duration = config.transition_duration;
		const subchart = config.subchart_show;
		let t = selection;
		if (t) {
			if ("tagName" in t) t = select(t);
			t = (force !== false && duration || force) && (!state.zooming || state.dragging) && !state.resizing && state.rendered && !subchart ? t.transition(name).duration(duration) : t;
		}
		return t;
	}
	beforeInit() {
		const $$ = this;
		$$.callPluginHook("$beforeInit");
		callFn($$.config.onbeforeinit, $$.api);
	}
	afterInit() {
		const $$ = this;
		$$.callPluginHook("$afterInit");
		callFn($$.config.onafterinit, $$.api);
	}
	init() {
		const $$ = this;
		const { config, state, $el } = $$;
		const { boost_useCssRule, bindto } = config;
		checkModuleImport($$);
		fallbackUnsupportedCanvasRenderMode($$);
		const hasArcType = $$.hasArcType();
		state.hasRadar = !state.hasAxis && $$.hasType("radar");
		state.hasFunnel = !state.hasAxis && $$.hasType("funnel");
		state.hasTreemap = !state.hasAxis && $$.hasType("treemap");
		state.hasAxis = !hasArcType && !state.hasFunnel && !state.hasTreemap;
		state.datetimeId = `bb-${+/* @__PURE__ */ new Date() * getRandom()}`;
		if (boost_useCssRule) {
			const styleEl = doc.createElement("style");
			styleEl.type = "text/css";
			doc.head.appendChild(styleEl);
			state.style = {
				rootSelector: `.${state.datetimeId}`,
				sheet: styleEl.sheet
			};
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
		$el.chart = isFunction(bindConfig.element.node) ? bindto.element : select(bindConfig.element || []);
		if ($el.chart.empty()) $el.chart = select(doc.body.appendChild(doc.createElement("div")));
		$el.chart.html("").classed(bindConfig.classname, true).classed(state.datetimeId, boost_useCssRule).style("position", "relative");
		$$.initParams();
		$$.initToRender();
	}
	/**
	* Initialize the rendering process
	* @param {boolean} forced Force to render process
	* @private
	*/
	initToRender(forced) {
		const $$ = this;
		const { config, state, $el: { chart } } = $$;
		const isHidden = () => hasStyle(chart, {
			display: "none",
			visibility: "hidden"
		});
		const isLazy = config.render.lazy === false ? false : config.render.lazy || isHidden();
		const MutationObserver = win.MutationObserver;
		if (isLazy && MutationObserver && config.render.observe !== false && !forced) new MutationObserver((mutation, observer) => {
			if (!isHidden()) {
				observer.disconnect();
				!state.rendered && $$.initToRender(true);
			}
		}).observe(chart.node(), {
			attributes: true,
			attributeFilter: ["class", "style"]
		});
		if (!isLazy || forced) $$.convertData(config, (res) => {
			$$.initWithData(res);
			$$.afterInit();
		});
	}
	initParams() {
		const $$ = this;
		const { config, format, state } = $$;
		if (config.render_mode === "canvas") $$.prepareCanvasConfig?.();
		$$.color = $$.generateColor();
		$$.levelColor = $$.generateLevelColor();
		if (config.padding === false) {
			config.axis_x_show = false;
			config.axis_y_show = false;
			config.axis_y2_show = false;
			config.subchart_show = false;
		}
		if (config.render_mode !== "canvas" && ($$.hasPointType() || $$.hasLegendDefsPoint?.())) $$.point = $$.generatePoint();
		if (state.hasAxis) {
			$$.initClip();
			format.extraLineClasses = $$.generateExtraLineClass();
			format.dataTime = config.data_xLocaltime ? timeParse : utcParse;
			format.axisTime = config.axis_x_localtime ? timeFormat : utcFormat;
			const isDragZoom = config.zoom_enabled && config.zoom_type === "drag";
			format.defaultAxisTime = (d) => {
				const { x, zoom } = $$.scale;
				const isZoomed = isDragZoom ? zoom : zoom && x.orgDomain().toString() !== zoom.domain().toString();
				const specifier = d.getMilliseconds() && ".%L" || d.getSeconds() && ".:%S" || d.getMinutes() && "%I:%M" || d.getHours() && "%I %p" || d.getDate() !== 1 && "%b %d" || isZoomed && d.getDate() === 1 && "%b'%y" || d.getMonth() && "%-m/%-d" || "%Y";
				return format.axisTime(specifier)(d);
			};
		}
		const { legend_position, legend_inset_anchor, axis_rotated } = config;
		state.isLegendRight = legend_position === "right";
		state.isLegendInset = legend_position === "inset";
		state.isLegendTop = legend_inset_anchor === "top-left" || legend_inset_anchor === "top-right";
		state.isLegendLeft = legend_inset_anchor === "top-left" || legend_inset_anchor === "bottom-left";
		state.rotatedPadding.top = $$.getResettedPadding(state.rotatedPadding.top);
		state.rotatedPadding.right = axis_rotated && !config.axis_x_show ? 0 : 30;
		state.inputType = convertInputType(config.interaction_inputType_mouse, config.interaction_inputType_touch);
	}
	initWithData(data) {
		const $$ = this;
		const { config, scale, state, $el, org } = $$;
		const { hasAxis, hasFunnel, hasTreemap } = state;
		const hasInteraction = config.interaction_enabled;
		const hasPolar = $$.hasType("polar");
		const labelsBGColor = config.data_labels_backgroundColors;
		if (hasAxis) {
			$$.axis = $$.getAxisInstance();
			config.zoom_enabled && $$.initZoom();
		}
		$$.data.xs = {};
		$$.data.targets = $$.convertDataToTargets(data);
		if (config.data_filter) $$.data.targets = $$.data.targets.filter(config.data_filter.bind($$.api));
		if (config.data_hide) $$.addHiddenTargetIds(config.data_hide === true ? $$.mapToIds($$.data.targets) : config.data_hide);
		if (config.legend_hide) $$.addHiddenLegendIds(config.legend_hide === true ? $$.mapToIds($$.data.targets) : config.legend_hide);
		$$.updateSizes();
		$$.updateScales(true);
		if (hasAxis) {
			const { x, y, y2, subX, subY, subY2 } = scale;
			if (x) {
				x.domain(sortValue($$.getXDomain($$.data.targets), !config.axis_x_inverted));
				subX.domain(x.domain());
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
		if (config.render_mode === "canvas") {
			if (!$$.initCanvas) throw Error("[billboard.js] Please import and call canvas() to use render.mode='canvas'.");
			$$.bindResize();
			$$.initCanvas();
			config.tooltip_show && $$.initTooltip();
			$$.callPluginHook("$init");
			callFn(config.oninit, $$.api);
			$$.redraw({
				withTransition: false,
				withTransform: true,
				withUpdateXDomain: true,
				withUpdateOrgXDomain: true,
				withTransitionForAxis: false,
				initializing: true
			});
			if (config.data_onmin || config.data_onmax) {
				const minMax = $$.getMinMaxData();
				callFn(config.data_onmin, $$.api, minMax.min);
				callFn(config.data_onmax, $$.api, minMax.max);
			}
			state.rendered = true;
			return;
		}
		$el.svg = $el.chart.append("svg").style("overflow", "hidden").style("display", "block");
		if (hasInteraction && state.inputType) {
			const isTouch = state.inputType === "touch";
			const { onclick, onover, onout } = config;
			const preventDefault = config.interaction_inputType_touch?.preventDefault;
			const isPrevented = isBoolean(preventDefault) && preventDefault || false;
			const touchOption = isTouch ? { passive: !isPrevented && (!isNaN(preventDefault) && preventDefault || null) === null } : void 0;
			$el.svg.on("click", onclick?.bind($$.api) || null).on(isTouch ? "touchstart" : "mouseenter", onover?.bind($$.api) || null, touchOption).on(isTouch ? "touchend" : "mouseleave", onout?.bind($$.api) || null);
		}
		config.svg_classname && $el.svg.attr("class", config.svg_classname);
		const hasColorPatterns = isFunction(config.color_tiles) && $$.patterns;
		if (hasAxis || hasColorPatterns || hasPolar || hasTreemap || labelsBGColor || $$.hasLegendDefsPoint?.()) {
			$el.defs = $el.svg.append("defs");
			if (hasAxis) [
				"id",
				"idXAxis",
				"idYAxis",
				"idGrid"
			].forEach((v) => {
				$$.appendClip($el.defs, state.clip[v]);
			});
			$$.generateTextBGColorFilter(labelsBGColor);
			if (hasColorPatterns) $$.patterns.forEach((p) => $el.defs.append(() => p.node));
		}
		$$.updateSvgSize();
		$$.bindResize();
		const main = $el.svg.append("g").classed($COMMON.main, true).attr("transform", hasFunnel || hasTreemap ? null : $$.getTranslate("main"));
		$el.main = main;
		config.subchart_show && $$.initSubchart();
		config.tooltip_show && $$.initTooltip();
		config.title_text && $$.initTitle();
		!hasTreemap && config.legend_show && $$.initLegend();
		if (config.data_empty_label_text) main.append("text").attr("class", `${$TEXT.text} ${$COMMON.empty}`).attr("text-anchor", "middle").attr("dominant-baseline", "middle");
		if (hasAxis) {
			config.regions.length && $$.initRegion?.();
			!config.clipPath && $$.axis.init();
		}
		main.append("g").classed($COMMON.chart, true).attr("clip-path", hasAxis ? state.clip.path : null);
		$$.callPluginHook("$init");
		$$.initChartElements();
		if (hasAxis) {
			hasInteraction && $$.initEventRect?.();
			$$.initGrid?.();
			config.clipPath && $$.axis?.init();
		}
		$$.updateTargets($$.data.targets);
		$$.updateDimension();
		callFn(config.oninit, $$.api);
		$$.setBackground();
		$$.redraw({
			withTransition: false,
			withTransform: true,
			withUpdateXDomain: true,
			withUpdateOrgXDomain: true,
			withTransitionForAxis: false,
			initializing: true
		});
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
	initChartElements() {
		const $$ = this;
		const { hasAxis, hasRadar, hasTreemap } = $$.state;
		const types = [];
		if (hasAxis) {
			const shapes = [
				"bar",
				"bubble",
				"candlestick",
				"line"
			];
			if ($$.config.bar_front) shapes.push(shapes.shift());
			for (const shape of shapes) {
				const name = capitalize(shape);
				if (shape === "line" && $$.hasTypeOf(name) || $$.hasType(shape)) types.push(name);
			}
		} else if (hasTreemap) types.push("Treemap");
		else if ($$.hasType("funnel")) types.push("Funnel");
		else {
			const hasPolar = $$.hasType("polar");
			const hasGauge = $$.hasType("gauge");
			if (!hasRadar) types.push("Arc", "Pie");
			if (hasGauge) types.push("Gauge");
			else if (hasRadar) types.push("Radar");
			else if (hasPolar) types.push("Polar");
		}
		for (const type of types) $$[`init${type}`]();
		if (notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"])) $$.initText();
	}
	/**
	* Set chart elements
	* @private
	*/
	setChartElements() {
		const $$ = this;
		const { $el: { chart, svg, defs, main, tooltip, legend, title, canvas, eventOverlay, grid, needle, arcs: arc, circle: circles, bar: bars, candlestick, line: lines, area: areas, text: texts } } = $$;
		$$.api.$ = {
			chart,
			svg,
			canvas,
			eventOverlay,
			defs,
			main,
			tooltip,
			legend,
			title,
			grid,
			arc,
			circles,
			bar: { bars },
			candlestick,
			line: {
				lines,
				areas
			},
			needle,
			text: { texts }
		};
	}
	/**
	* Set background element/image
	* @private
	*/
	setBackground() {
		const { config: { background: bg }, state, $el: { svg } } = this;
		if (notEmpty(bg)) {
			const element = svg.select("g").insert(bg.imgUrl ? "image" : "rect", ":first-child");
			if (bg.imgUrl) element.attr("href", bg.imgUrl);
			else if (bg.color) element.style("fill", bg.color).attr("clip-path", state.clip.path);
			element.attr("class", bg.class || null).attr("width", "100%").attr("height", "100%");
		}
	}
	/**
	* Update targeted element with given data
	* @param {object} targets Data object formatted as 'target'
	* @private
	*/
	updateTargets(targets) {
		const $$ = this;
		const { hasAxis, hasFunnel, hasRadar, hasTreemap } = $$.state;
		const helper = (type) => $$[`updateTargetsFor${type}`](targets.filter($$[`is${type}Type`].bind($$)));
		$$.updateTargetsForText(targets);
		if (hasAxis) {
			for (const shape of [
				"bar",
				"candlestick",
				"line"
			]) {
				const name = capitalize(shape);
				if (shape === "line" && $$.hasTypeOf(name) || $$.hasType(shape)) helper(name);
			}
			$$.updateTargetsForSubchart?.(targets);
		} else if ($$.hasArcType(targets)) {
			let type = "Arc";
			if (hasRadar) type = "Radar";
			else if ($$.hasType("polar")) type = "Polar";
			helper(type);
		} else if (hasFunnel) helper("Funnel");
		else if (hasTreemap) helper("Treemap");
		const hasPointType = $$.hasType("bubble") || $$.hasType("scatter");
		if (hasPointType) $$.updateTargetForCircle?.();
		$$.filterTargetsToShowAtInit(hasPointType);
	}
	/**
	* Display targeted elements at initialization
	* @param {boolean} hasPointType whether has point type(bubble, scatter) or not
	* @private
	*/
	filterTargetsToShowAtInit(hasPointType = false) {
		const $$ = this;
		const { $el: { svg }, $T } = $$;
		let selector = `.${$COMMON.target}`;
		if (hasPointType) selector += `, .${$CIRCLE.chartCircles} > .${$CIRCLE.circles}`;
		$T(svg.selectAll(selector).filter((d) => $$.isTargetToShow(d.id))).style("opacity", null);
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
	initialOpacity(d) {
		const $$ = this;
		const { withoutFadeIn } = $$.state;
		return $$.getBaseValue(d) !== null && withoutFadeIn[d.id] ? null : "0";
	}
	bindResize() {
		const $$ = this;
		const { $el, config, state } = $$;
		const { resize_auto, resize_live } = config;
		const isAutoResize = /^(true|parent)$/.test(resize_auto);
		const list = [];
		const redrawOnResize = () => {
			const prevWidth = state.current.width;
			const prevHeight = state.current.height;
			$$.setContainerSize();
			if (!state.resizePreview && prevWidth === state.current.width && prevHeight === state.current.height) return false;
			state.resizing = true;
			state.dirty.size = true;
			if (config.legend_show) {
				$$.updateSizes();
				state.isCanvasMode ? $$.updateHtmlLegend?.() : $$.updateLegend();
			}
			$$.api.flush(false);
			return true;
		};
		const liveResize = () => {
			if (state.resizeLiveScale === null) state.resizeLiveScale = state.resizeRedrawTime > 16;
			if (state.resizeLiveScale) {
				$$.previewResize();
				return;
			}
			const start = getTime();
			if (redrawOnResize()) {
				state.resizeRedrawTime = getTime() - start;
				state.resizeLiveScale = state.resizeRedrawTime > 16;
			}
		};
		const resizeFunction = generateResize(config.resize_timer, isAutoResize && resize_live ? liveResize : void 0);
		list.push(() => callFn(config.onresize, $$.api));
		isAutoResize && list.push(redrawOnResize);
		list.push(() => {
			callFn(config.onresized, $$.api);
			state.resizing = false;
			state.resizeLiveScale = null;
		});
		list.forEach((v) => resizeFunction.add(v));
		$$.resizeFunction = resizeFunction;
		if (resize_auto === "parent" && win.ResizeObserver) ($$.resizeFunction.resizeObserver = new win.ResizeObserver($$.resizeFunction.bind($$))).observe($el.chart.node().parentNode);
		else {
			if (resize_auto === "parent") win.console?.warn?.("[billboard.js] resize.auto='parent' requires ResizeObserver; falling back to window resize.");
			win.addEventListener("resize", $$.resizeFunction);
		}
	}
	/**
	* Call plugin hook
	* @param {string} phase The lifecycle phase
	* @param {Array} args Arguments
	* @private
	*/
	callPluginHook(phase, ...args) {
		this.config.plugins.forEach((v) => {
			if (phase === "$beforeInit") {
				v.$$ = this;
				this.api.plugins.push(v);
			}
			v[phase](...args);
		});
	}
};
extend(ChartInternal.prototype, [
	convert_default,
	data_default,
	load_default,
	category_default,
	class_default,
	color_default,
	domain_default,
	interaction_default,
	format_default,
	legend_default,
	redraw_default,
	scale_default,
	shape_default,
	size_default,
	style_default,
	text_default,
	title_default,
	tooltip_default,
	transform_default,
	type_default
]);
//#endregion
export { ChartInternal as default };
