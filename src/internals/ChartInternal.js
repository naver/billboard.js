/**
 * Copyright (c) 2017 NAVER Corp.
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
import {extent as d3Extent} from "d3-array";
import {transition as d3Transition} from "d3-transition";

import Axis from "../axis/Axis";
import CLASS from "../config/classes";
import {notEmpty, asHalfPixel, getOption, isValue, isArray, isFunction, isString, isNumber, isObject, callFn} from "./util";

/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
*/
export default class ChartInternal {
	constructor(api) {
		const $$ = this;

		$$.api = api;
		$$.config = $$.getOptions();
		$$.data = {};
		$$.cache = {};
		$$.axes = {};
	}

	beforeInit() {
		const $$ = this;
		const config = $$.config;

		// can do something
		callFn(config.onbeforeinit, $$);
	}

	afterInit() {
		const $$ = this;
		const config = $$.config;

		// can do something
		callFn(config.onafterinit, $$);
	}

	init() {
		const $$ = this;
		const config = $$.config;
		let convertedData;

		$$.initParams();

		if (config.data_url) {
			$$.convertUrlToData(
				config.data_url,
				config.data_mimeType,
				config.data_headers,
				config.data_keys,
				$$.initWithData
			);
		} else if (config.data_json) {
			convertedData = $$.convertJsonToData(config.data_json, config.data_keys);
		} else if (config.data_rows) {
			convertedData = $$.convertRowsToData(config.data_rows);
		} else if (config.data_columns) {
			convertedData = $$.convertColumnsToData(config.data_columns);
		} else {
			throw Error("url or json or rows or columns is required.");
		}

		convertedData && $$.initWithData(convertedData);
	}

	initParams() {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		// datetime to be used for uniqueness
		$$.datetimeId = `bb-${+new Date()}`;

		// MEMO: clipId needs to be unique because it conflicts when multiple charts exist
		$$.clipId = `${$$.datetimeId}-clip`;
		$$.clipIdForXAxis = `${$$.clipId}-xaxis`;
		$$.clipIdForYAxis = `${$$.clipId}-yaxis`;
		$$.clipIdForGrid = `${$$.clipId}-grid`;
		$$.clipIdForSubchart = `${$$.clipId}-subchart`;

		// Define 'clip-path' attribute values
		$$.clipPath = $$.getClipPath($$.clipId);
		$$.clipPathForXAxis = $$.getClipPath($$.clipIdForXAxis);
		$$.clipPathForYAxis = $$.getClipPath($$.clipIdForYAxis);
		$$.clipPathForGrid = $$.getClipPath($$.clipIdForGrid);
		$$.clipPathForSubchart = $$.getClipPath($$.clipIdForSubchart);

		$$.dragStart = null;
		$$.dragging = false;
		$$.flowing = false;
		$$.cancelClick = false;
		$$.mouseover = false;
		$$.transiting = false;

		$$.color = $$.generateColor();
		$$.levelColor = $$.generateLevelColor();
		$$.point = $$.generatePoint();

		$$.extraLineClasses = $$.generateExtraLineClass();

		$$.dataTimeFormat = config.data_xLocaltime ? d3TimeParse : d3UtcParse;
		$$.axisTimeFormat = config.axis_x_localtime ? d3TimeFormat : d3UtcFormat;

		$$.defaultAxisTimeFormat = d => {
			const specifier = (d.getMilliseconds() && ".%L") ||
				(d.getSeconds() && ".:%S") ||
				(d.getMinutes() && "%I:%M") ||
				(d.getHours() && "%I %p") ||
				((d.getDay() && d.getDate() !== 1) && "%-m/%-d") ||
				(d.getDate() !== 1 && "%b %d") ||
				(d.getMonth() && "%-m/%-d") ||
				"%Y/%-m/%-d";

			return $$.axisTimeFormat(specifier)(d);
		};

		$$.hiddenTargetIds = [];
		$$.hiddenLegendIds = [];
		$$.focusedTargetIds = [];
		$$.defocusedTargetIds = [];

		$$.xOrient = isRotated ? "left" : "bottom";
		$$.yOrient = isRotated ?
			(config.axis_y_inner ? "top" : "bottom") : (config.axis_y_inner ? "right" : "left");
		$$.y2Orient = isRotated ?
			(config.axis_y2_inner ? "bottom" : "top") : (config.axis_y2_inner ? "left" : "right");
		$$.subXOrient = isRotated ? "left" : "bottom";

		$$.isLegendRight = config.legend_position === "right";
		$$.isLegendInset = config.legend_position === "inset";

		$$.isLegendTop = config.legend_inset_anchor === "top-left" ||
			config.legend_inset_anchor === "top-right";
		$$.isLegendLeft = config.legend_inset_anchor === "top-left" ||
			config.legend_inset_anchor === "bottom-left";

		$$.legendStep = 0;
		$$.legendItemWidth = 0;
		$$.legendItemHeight = 0;

		$$.currentMaxTickWidths = {
			x: 0, y: 0, y2: 0
		};

		$$.rotated_padding_left = 30;
		$$.rotated_padding_right = isRotated && !config.axis_x_show ? 0 : 30;
		$$.rotated_padding_top = 5;

		$$.withoutFadeIn = {};
		$$.inputType = $$.convertInputType();

		$$.axes.subx = d3SelectAll([]); // needs when excluding subchart.js
	}

	initWithData(data) {
		const $$ = this;
		const config = $$.config;

		$$.axis = new Axis($$);

		config.subchart_show && $$.initBrush();

		if (config.zoom_enabled) {
			$$.initZoom();
			$$.initZoomBehaviour();
		}

		const bindto = {
			element: config.bindto,
			classname: "bb"
		};

		if (isObject(config.bindto)) {
			bindto.element = config.bindto.element || "#chart";
			bindto.classname = config.bindto.classname || bindto.classname;
		}

		// select bind element
		$$.selectChart = isFunction(bindto.element.node) ?
			config.bindto.element : d3Select(!bindto.element ? [] : bindto.element);

		$$.selectChart.html("").classed(bindto.classname, true);

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

		// when gauge, hide legend // TODO: fix
		if ($$.hasType("gauge")) {
			config.legend_show = false;
		}

		// Init sizes and scales
		$$.updateSizes();
		$$.updateScales();

		// Set domains for each scale
		$$.x.domain(d3Extent($$.getXDomain($$.data.targets)));
		$$.y.domain($$.getYDomain($$.data.targets, "y"));
		$$.y2.domain($$.getYDomain($$.data.targets, "y2"));
		$$.subX.domain($$.x.domain());
		$$.subY.domain($$.y.domain());
		$$.subY2.domain($$.y2.domain());

		// Save original x domain for zoom update
		$$.orgXDomain = $$.x.domain();

		// -- Basic Elements --
		$$.svg = $$.selectChart.append("svg")
			.style("overflow", "hidden")
			.style("display", "block");

		if (config.interaction_enabled && $$.inputType) {
			const isTouch = $$.inputType === "touch";

			$$.svg
				.on(isTouch ? "touchstart" : "mouseenter", () => callFn(config.onover, $$))
				.on(isTouch ? "touchend" : "mouseleave", () => callFn(config.onout, $$));
		}

		config.svg_classname &&
			$$.svg.attr("class", config.svg_classname);

		// Define defs
		$$.defs = $$.svg.append("defs");

		$$.clipChart = $$.appendClip($$.defs, $$.clipId);
		$$.clipXAxis = $$.appendClip($$.defs, $$.clipIdForXAxis);
		$$.clipYAxis = $$.appendClip($$.defs, $$.clipIdForYAxis);
		$$.clipGrid = $$.appendClip($$.defs, $$.clipIdForGrid);
		$$.clipSubchart = $$.appendClip($$.defs, $$.clipIdForSubchart);

		// set color patterns
		if (isFunction(config.color_tiles) && $$.patterns) {
			$$.patterns.forEach(p => $$.defs.append(() => p.node));
		}

		$$.updateSvgSize();

		// Define regions
		const main = $$.svg.append("g").attr("transform", $$.getTranslate("main"));

		$$.main = main;

		// initialize subchart when subchart show option is set
		config.subchart_show &&
			$$.initSubchart &&
				$$.initSubchart();

		$$.initTooltip && $$.initTooltip();
		$$.initLegend && $$.initLegend();
		$$.initTitle && $$.initTitle();

		// -- Main Region --

		// text when empty
		main.append("text")
			.attr("class", `${CLASS.text} ${CLASS.empty}`)
			.attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
			.attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.

		// Regions
		$$.initRegion();

		// Grids
		$$.initGrid();

		// Add Axis here, when clipPath is 'false'
		!config.clipPath && $$.axis.init();

		// Define g for chart area
		main.append("g").attr("class", CLASS.chart)
			.attr("clip-path", $$.clipPath);

		// Grid lines
		config.grid_lines_front && $$.initGridLines();
		config.grid_front && $$.initXYFocusGrid();

		// Cover whole with rects for events
		$$.initEventRect();

		// Define g for chart
		$$.initChartElements();

		// if zoom privileged, insert rect to forefront
		// TODO: is this needed?
		main.insert("rect", config.zoom_privileged ? null : `g.${CLASS.regions}`)
			.attr("class", CLASS.zoomRect)
			.attr("width", $$.width)
			.attr("height", $$.height)
			.style("opacity", "0")
			.on("dblclick.zoom", null);

		// Set default extent if defined
		config.axis_x_extent &&
			$$.brush.scale($$.getDefaultExtent());

		// Add Axis here, when clipPath is 'true'
		config.clipPath && $$.axis.init();

		// Set targets
		$$.updateTargets($$.data.targets);

		// Draw with targets
		$$.updateDimension();

		// oninit callback
		config.oninit.call($$);

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
		$$.api.element = $$.selectChart.node();
	}

	initChartElements() {
		["Pie", "Bar", "Line", "Arc", "Gauge", "Bubble", "Radar", "Text"].forEach(v => {
			const method = `init${v}`;

			this[method] && this[method]();
		});
	}

	getChartElements() {
		const $$ = this;

		return {
			chart: $$.selectChart,
			svg: $$.svg,
			defs: $$.defs,
			main: $$.main,
			tooltip: $$.tooltip,
			legend: $$.legend,
			title: $$.title,
			grid: $$.grid,
			arc: $$.arcs,
			bar: {
				bars: $$.mainBar
			},
			line: {
				lines: $$.mainLine,
				areas: $$.mainArea,
				circles: $$.mainCircle
			},
			text: {
				texts: $$.texts
			}
		};
	}

	smoothLines(el, type) {
		if (type === "grid") {
			el.each(function() {
				const g = d3Select(this);
				const [x1, x2, y1, y2] = ["x1", "x2", "y1", "y2"]
					.map(v => Math.ceil(g.attr(v)));

				g.attr({x1, x2, y1, y2});
			});
		}
	}

	updateSizes() {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const hasArc = $$.hasArcType();

		const legendHeight = $$.legend ? $$.getLegendHeight() : 0;
		const legendWidth = $$.legend ? $$.getLegendWidth() : 0;
		const legendHeightForBottom = $$.isLegendRight || $$.isLegendInset ? 0 : legendHeight;
		const xAxisHeight = isRotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x");
		const subchartHeight = config.subchart_show && !hasArc ?
			(config.subchart_size_height + xAxisHeight) : 0;

		$$.currentWidth = $$.getCurrentWidth();
		$$.currentHeight = $$.getCurrentHeight();

		// for main
		$$.margin = isRotated ? {
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
		$$.margin2 = isRotated ? {
			top: $$.margin.top,
			right: NaN,
			bottom: 20 + legendHeightForBottom,
			left: $$.rotated_padding_left
		} : {
			top: $$.currentHeight - subchartHeight - legendHeightForBottom,
			right: NaN,
			bottom: xAxisHeight + legendHeightForBottom,
			left: $$.margin.left
		};

		// for legend
		$$.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		};

		$$.updateSizeForLegend &&
			$$.updateSizeForLegend(legendHeight, legendWidth);

		$$.width = $$.currentWidth - $$.margin.left - $$.margin.right;
		$$.height = $$.currentHeight - $$.margin.top - $$.margin.bottom;

		if ($$.width < 0) {
			$$.width = 0;
		}

		if ($$.height < 0) {
			$$.height = 0;
		}

		$$.width2 = isRotated ?
			$$.margin.left - $$.rotated_padding_left - $$.rotated_padding_right : $$.width;

		$$.height2 = isRotated ?
			$$.height : $$.currentHeight - $$.margin2.top - $$.margin2.bottom;

		if ($$.width2 < 0) {
			$$.width2 = 0;
		}

		if ($$.height2 < 0) {
			$$.height2 = 0;
		}

		// for arc
		$$.arcWidth = $$.width - ($$.isLegendRight ? legendWidth + 10 : 0);
		$$.arcHeight = $$.height - ($$.isLegendRight ? 0 : 10);

		if ($$.hasType("gauge") && !config.gauge_fullCircle) {
			$$.arcHeight += $$.height - $$.getGaugeLabelHeight();
		}

		$$.updateRadius && $$.updateRadius();

		if ($$.isLegendRight && hasArc) {
			$$.margin3.left = $$.arcWidth / 2 + $$.radiusExpanded * 1.1;
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

		$$.svg.selectAll(`.${CLASS.target}`)
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

	redraw(options = {}, transitionsValue) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const hasRadar = $$.hasType("radar");

		const areaIndices = $$.getShapeIndices($$.isAreaType);
		const barIndices = $$.getShapeIndices($$.isBarType);
		const lineIndices = $$.getShapeIndices($$.isLineType);

		const hideAxis = $$.hasArcType();
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);
		const xv = $$.xv.bind($$);

		let tickValues;
		let intervalForCulling;
		let xDomainForZoom;

		const wth = $$.getWithOption(options);
		const duration = wth.Transition ? config.transition_duration : 0;
		const durationForExit = wth.TransitionForExit ? duration : 0;
		const durationForAxis = wth.TransitionForAxis ? duration : 0;

		const transitions = transitionsValue || $$.axis.generateTransitions(durationForAxis);

		!(options.initializing && config.tooltip_init_show) &&
			$$.inputType === "touch" && $$.hideTooltip();

		// update legend and transform each g
		if (wth.Legend && config.legend_show && !config.legend_contents_bindto) {
			$$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
		} else if (wth.Dimension) {
			// need to update dimension (e.g. axis.y.tick.values) because y tick values should change
			// no need to update axis in it because they will be updated in redraw()
			$$.updateDimension(true);
		}

		// MEMO: needed for grids calculation
		if ($$.isCategorized() && targetsToShow.length === 0) {
			$$.x.domain([0, $$.axes.x.selectAll(".tick").size()]);
		}

		if (targetsToShow.length) {
			$$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain);

			if (!config.axis_x_tick_values) {
				tickValues = $$.axis.updateXAxisTickValues(targetsToShow);
			}
		} else {
			$$.xAxis.tickValues([]);
			$$.subXAxis.tickValues([]);
		}

		if (config.zoom_rescale && !options.flow) {
			xDomainForZoom = $$.x.orgDomain();
		}

		["y", "y2"].forEach(key => {
			const axis = $$[key];
			const tickValues = config[`axis_${key}_tick_values`];
			const tickCount = config[`axis_${key}_tick_count`];

			axis.domain($$.getYDomain(targetsToShow, key, xDomainForZoom));

			if (!tickValues && tickCount) {
				const domain = axis.domain();

				$$[`${key}Axis`].tickValues(
					$$.axis.generateTickValues(
						domain,
						domain.every(v => v === 0) ? 1 : tickCount,
						$$.isTimeSeriesY()
					)
				);
			}
		});

		// axes
		$$.axis.redraw(transitions, hideAxis);

		// Update axis label
		$$.axis.updateLabels(wth.Transition);

		// show/hide if manual culling needed
		if ((wth.UpdateXDomain || wth.UpdateXAxis) && targetsToShow.length) {
			if (config.axis_x_tick_culling && tickValues) {
				for (let i = 1; i < tickValues.length; i++) {
					if (tickValues.length / i < config.axis_x_tick_culling_max) {
						intervalForCulling = i;
						break;
					}
				}

				$$.svg.selectAll(`.${CLASS.axisX} .tick text`).each(function(e) {
					const index = tickValues.indexOf(e);

					index >= 0 &&
						d3Select(this).style("display", index % intervalForCulling ? "none" : "block");
				});
			} else {
				$$.svg.selectAll(`.${CLASS.axisX} .tick text`).style("display", "block");
			}
		}

		// setup drawer - MEMO: these must be called after axis updated
		const drawArea = $$.generateDrawArea ?
			$$.generateDrawArea(areaIndices, false) : undefined;

		const drawBar = $$.generateDrawBar ?
			$$.generateDrawBar(barIndices) : undefined;

		const drawLine = $$.generateDrawLine ?
			$$.generateDrawLine(lineIndices, false) : undefined;

		const xForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, true);
		const yForText = $$.generateXYForText(areaIndices, barIndices, lineIndices, false);

		// Update sub domain
		if (wth.Y) {
			$$.subY.domain($$.getYDomain(targetsToShow, "y"));
			$$.subY2.domain($$.getYDomain(targetsToShow, "y2"));
		}

		// xgrid focus
		$$.updateXgridFocus();

		// Data empty label positioning and text.
		main.select(`text.${CLASS.text}.${CLASS.empty}`)
			.attr("x", $$.width / 2)
			.attr("y", $$.height / 2)
			.text(config.data_empty_label_text)
			.transition()
			.style("opacity", targetsToShow.length ? 0 : 1);

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
		$$.redrawArc && $$.redrawArc(duration, durationForExit, wth.Transform);

		// radar
		hasRadar && $$.redrawRadar(duration, durationForExit);

		// subchart
		config.subchart_show && $$.redrawSubchart &&
			$$.redrawSubchart(
				wth.Subchart,
				transitions,
				duration,
				durationForExit,
				areaIndices,
				barIndices,
				lineIndices
			);

		// circles for select
		main.selectAll(`.${CLASS.selectedCircles}`)
			.filter($$.isBarType.bind($$))
			.selectAll("circle")
			.remove();

		// event rects will redrawn when flow called
		if (config.interaction_enabled && !options.flow && wth.EventRect) {
			$$.redrawEventRect();
			$$.bindZoomEvent();
		}

		// update circleY based on updated parameters
		$$.updateCircleY();

		// generate circle x/y functions depending on updated params
		const cx = (hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX)).bind($$);
		const cy = (hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY)).bind($$);

		// generate flow
		const flow = options.flow && $$.generateFlow({
			targets: targetsToShow,
			flow: options.flow,
			duration: options.flow.duration,
			drawBar,
			drawLine,
			drawArea,
			cx,
			cy,
			xv,
			xForText,
			yForText
		});

		const isTransition = (duration || flow) && $$.isTabVisible();

		// redraw list
		const redrawList = [
			$$.redrawBar(drawBar, isTransition),
			$$.redrawLine(drawLine, isTransition),
			$$.redrawArea(drawArea, isTransition),
			$$.redrawCircle(cx, cy, isTransition, flow),
			$$.redrawText(xForText, yForText, options.flow, isTransition),
			$$.redrawRegion(isTransition),
			$$.redrawGrid(isTransition)
		];

		// callback function after redraw ends
		const afterRedraw = flow || config.onrendered ? () => {
			flow && flow();
			callFn(config.onrendered, $$);
		} : null;

		if (afterRedraw) {
			// Only use transition when current tab is visible.
			if (isTransition) {
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
			} else {
				afterRedraw();
			}
		}

		// update fadein condition
		$$.mapToIds($$.data.targets).forEach(id => {
			$$.withoutFadeIn[id] = true;
		});
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

		// MEMO: this needs to be called before updateLegend and it means this ALWAYS needs to be called)
		$$.updateSizes();

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

	getTranslate(target) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		let x;
		let y;

		if (target === "main") {
			x = asHalfPixel($$.margin.left);
			y = asHalfPixel($$.margin.top);
		} else if (target === "context") {
			x = asHalfPixel($$.margin2.left);
			y = asHalfPixel($$.margin2.top);
		} else if (target === "legend") {
			x = $$.margin3.left;
			y = $$.margin3.top;
		} else if (target === "x") {
			x = 0;
			y = isRotated ? 0 : $$.height;
		} else if (target === "y") {
			x = 0;
			y = isRotated ? $$.height : 0;
		} else if (target === "y2") {
			x = isRotated ? 0 : $$.width;
			y = isRotated ? 1 : 0;
		} else if (target === "subx") {
			x = 0;
			y = isRotated ? 0 : $$.height2;
		} else if (target === "arc") {
			x = $$.arcWidth / 2;
			y = $$.arcHeight / 2;
		} else if (target === "radar") {
			const diff = ($$.arcWidth - $$.arcHeight) / 2;

			x = Math.max(diff, 0) + 4;
			y = diff < 0 ? Math.abs(diff) : asHalfPixel($$.margin.top);
		}

		return `translate(${x}, ${y})`;
	}

	initialOpacity(d) {
		return this.getBaseValue(d) !== null &&
			this.withoutFadeIn[d.id] ? "1" : "0";
	}

	initialOpacityForCircle(d) {
		return this.getBaseValue(d) !== null &&
			this.withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
	}

	opacityForCircle(d) {
		const opacity = this.config.point_show ? "1" : "0";

		return isValue(this.getBaseValue(d)) ?
			(this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity) : "0";
	}

	opacityForText() {
		return this.hasDataLabel() ? "1" : "0";
	}

	xx(d) {
		const fn = this.config.zoom_enabled && this.zoomScale ?
			this.zoomScale : this.x;

		return d ? fn(d.x) : null;
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
		let xAxis;
		let yAxis;
		let y2Axis;

		if (transitions && transitions.axisX) {
			xAxis = transitions.axisX;
		} else {
			xAxis = $$.main.select(`.${CLASS.axisX}`);

			if (withTransition) {
				xAxis = xAxis.transition();
			}
		}

		if (transitions && transitions.axisY) {
			yAxis = transitions.axisY;
		} else {
			yAxis = $$.main.select(`.${CLASS.axisY}`);

			if (withTransition) {
				yAxis = yAxis.transition();
			}
		}

		if (transitions && transitions.axisY2) {
			y2Axis = transitions.axisY2;
		} else {
			y2Axis = $$.main.select(`.${CLASS.axisY2}`);

			if (withTransition) {
				y2Axis = y2Axis.transition();
			}
		}

		(withTransition ? $$.main.transition() : $$.main)
			.attr("transform", $$.getTranslate("main"));

		xAxis.attr("transform", $$.getTranslate("x"));
		yAxis.attr("transform", $$.getTranslate("y"));
		y2Axis.attr("transform", $$.getTranslate("y2"));

		$$.main.select(`.${CLASS.chartArcs}`)
			.attr("transform", $$.getTranslate("arc"));
	}

	transformAll(withTransition, transitions) {
		const $$ = this;

		$$.transformMain(withTransition, transitions);

		$$.config.subchart_show &&
			$$.transformContext(withTransition, transitions);

		$$.legend &&
			$$.transformLegend(withTransition);
	}

	updateSvgSize() {
		const $$ = this;
		const brush = $$.svg.select(`.${CLASS.brush} .overlay`);
		const brushHeight = brush.size() ? brush.attr("height") : 0;

		$$.svg
			.attr("width", $$.currentWidth)
			.attr("height", $$.currentHeight);

		$$.svg.selectAll([`#${$$.clipId}`, `#${$$.clipIdForGrid}`])
			.select("rect")
			.attr("width", $$.width)
			.attr("height", $$.height);

		$$.svg.select(`#${$$.clipIdForXAxis}`)
			.select("rect")
			.attr("x", $$.getXAxisClipX.bind($$))
			.attr("y", $$.getXAxisClipY.bind($$))
			.attr("width", $$.getXAxisClipWidth.bind($$))
			.attr("height", $$.getXAxisClipHeight.bind($$));

		$$.svg.select(`#${$$.clipIdForYAxis}`)
			.select("rect")
			.attr("x", $$.getYAxisClipX.bind($$))
			.attr("y", $$.getYAxisClipY.bind($$))
			.attr("width", $$.getYAxisClipWidth.bind($$))
			.attr("height", $$.getYAxisClipHeight.bind($$));

		$$.svg.select(`#${$$.clipIdForSubchart}`)
			.select("rect")
			.attr("width", $$.width)
			.attr("height", brushHeight);

		$$.svg.select(`.${CLASS.zoomRect}`)
			.attr("width", $$.width)
			.attr("height", $$.height);

		$$.brush && $$.brush.scale($$.subX, brushHeight);
	}

	updateDimension(withoutAxis) {
		const $$ = this;

		if (!withoutAxis) {
			if ($$.config.axis_rotated) {
				$$.axes.x.call($$.xAxis);
				$$.axes.subx.call($$.subXAxis);
			} else {
				$$.axes.y.call($$.yAxis);
				$$.axes.y2.call($$.y2Axis);
			}
		}

		$$.updateSizes();

		// pass 'withoutAxis' param to not animate at the init rendering
		$$.updateScales(withoutAxis);

		$$.updateSvgSize();
		$$.transformAll(false);
	}

	bindResize() {
		const $$ = this;
		const config = $$.config;

		$$.resizeFunction = $$.generateResize();
		$$.resizeFunction.add(() => config.onresize.call($$));

		if (config.resize_auto) {
			$$.resizeFunction.add(() => {
				if ($$.resizeTimeout) {
					window.clearTimeout($$.resizeTimeout);
					$$.resizeTimeout = null;
				}

				$$.resizeTimeout = window.setTimeout($$.api.flush, 100);
			});
		}

		$$.resizeFunction.add(() => config.onresized.call($$));

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
		const f = function(transition, callback) {
			let timer;

			function loop() {
				let done = 0;

				transitionsToWait.forEach(t => {
					if (t.empty()) {
						done++;
						return;
					}

					try {
						t.transition();
					} catch (e) {
						done++;
					}
				});

				timer && clearTimeout(timer);

				if (done === transitionsToWait.length) {
					callback && callback();
				} else {
					timer = setTimeout(loop, 50);
				}
			}

			loop();
		};

		f.add = function(transition) {
			isArray(transition) ?
				(transitionsToWait = transitionsToWait.concat(transition)) :
				transitionsToWait.push(transition);
		};

		return f;
	}

	parseDate(date) {
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
		return !document[
			["hidden", "mozHidden", "msHidden", "webkitHidden"]
				.filter(v => v in document)[0]
		];
	}

	convertInputType() {
		const $$ = this;
		const config = $$.config;
		const isMobile = $$.isMobile();
		const hasMouse = config.interaction_inputType_mouse && !isMobile ? ("onmouseover" in window) : false;
		let hasTouch = false;

		if (config.interaction_inputType_touch) {
			// Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
			// On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
			hasTouch = ("ontouchmove" in window) || (window.DocumentTouch && document instanceof window.DocumentTouch);
		}

		return (hasMouse && "mouse") || (hasTouch && "touch") || null;
	}
}
