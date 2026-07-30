/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {brushSelection as d3BrushSelection, brushX as d3BrushX, brushY as d3BrushY} from "d3-brush";
import {select as d3Select} from "d3-selection";
import CLASS from "../../config/classes";
import {SUBCHART_BRUSH_HANDLE_PATH} from "../../config/const";
import {window} from "../../module/browser";
import {
	brushEmpty,
	capitalize,
	emulateEvent,
	getBoundingRect,
	getPointer,
	isArray
} from "../../module/util";
import {
	getMainCoordFromSubchartCoord,
	isContinuousGridFocusEnabled
} from "../internals/subchart.util";

const SUBCHART_TYPES = ["bar", "line", "bubble", "candlestick", "scatter"];
const FOCUS_GRID_STYLE_PROPS = [
	"opacity",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke-width"
];

/**
 * Copy main focus grid computed styles to the subchart focus grid line.
 * @param {object} $$ ChartInternal instance
 * @param {object} line Subchart focus grid line selection
 * @private
 */
function syncSubchartGridFocusStyle($$, line): void {
	const source = $$.$el.grid?.main?.select(`line.${CLASS.xgridFocus}`).node();

	if (!source || !window.getComputedStyle) {
		return;
	}

	const style = window.getComputedStyle(source);

	FOCUS_GRID_STYLE_PROPS.forEach(prop => {
		const value = style.getPropertyValue(prop);

		value && line.style(prop, value);
	});
}

/**
 * Convert an SVG attr value to finite number with fallback.
 * @param {string|null} value Attribute value
 * @param {number} fallback Fallback value
 * @returns {number} Numeric value
 * @private
 */
function getFiniteAttr(value: string | null, fallback: number): number {
	const parsed = Number(value);

	return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Show a single clipped-free x focus grid line spanning main chart and subchart.
 * @param {object} $$ ChartInternal instance
 * @returns {boolean} Whether continuous focus line was rendered
 * @private
 */
function showContinuousSubchartGridFocus($$): boolean {
	if (!isContinuousGridFocusEnabled($$)) {
		return false;
	}

	const {config, state, $el} = $$;
	const mainLine = $el.grid?.main?.select(
		`line.${CLASS.xgridFocus}:not(.${CLASS.xgridFocusContinuous})`
	);
	const line = $el.main.select(`line.${CLASS.xgridFocusContinuous}`);

	if (!mainLine?.node() || !line.node()) {
		return false;
	}

	const x2 = state.margin2.left - state.margin.left + state.width2;
	const y2 = state.margin2.top - state.margin.top + state.height2;

	syncSubchartGridFocusStyle($$, line);

	config.axis_rotated ?
		line
			.attr("x1", getFiniteAttr(mainLine.attr("x1"), 0))
			.attr("x2", x2)
			.attr("y1", getFiniteAttr(mainLine.attr("y1"), -10))
			.attr("y2", getFiniteAttr(mainLine.attr("y2"), -10)) :
		line
			.attr("x1", getFiniteAttr(mainLine.attr("x1"), -10))
			.attr("x2", getFiniteAttr(mainLine.attr("x2"), -10))
			.attr("y1", getFiniteAttr(mainLine.attr("y1"), 0))
			.attr("y2", y2);

	line.style("visibility", null);
	mainLine.style("visibility", "hidden");

	return true;
}

/**
 * Hide continuous subchart focus grid line.
 * @param {object} $$ ChartInternal instance
 * @private
 */
function hideContinuousSubchartGridFocus($$): void {
	$$.$el.main
		?.select(`line.${CLASS.xgridFocusContinuous}`)
		.style("visibility", "hidden");
}

/**
 * Get main chart pointer coordinates that correspond to a subchart pointer event.
 * @param {object} $$ ChartInternal instance
 * @param {Event} event Input event
 * @param {SVGElement} context Subchart event rect
 * @returns {Array|null} Main chart local coordinates
 * @private
 */
function getMainPointFromSubchartEvent($$, event, context): [number, number] | null {
	const {config, state} = $$;
	const [x, y] = getPointer(event, context);
	const mainCoord = getMainCoordFromSubchartCoord($$, config.axis_rotated ? y : x);

	if (mainCoord === null) {
		return null;
	}

	return config.axis_rotated ? [state.width / 2, mainCoord] : [mainCoord, state.height / 2];
}

/**
 * Dispatch a subchart pointer event through the main chart event rect.
 * @param {object} $$ ChartInternal instance
 * @param {string} type Event type
 * @param {Event} event Input event
 * @param {SVGElement} context Subchart event rect
 * @private
 */
function dispatchSubchartEvent($$, type: string, event, context): void {
	const mainEventRect = $$.$el.eventRect?.node?.();

	if (!mainEventRect) {
		return;
	}

	const point = getMainPointFromSubchartEvent($$, event, context) || [0, 0];
	const rect = getBoundingRect(mainEventRect, true);
	const clientX = rect.left + point[0];
	const clientY = rect.top + point[1];
	const params = {
		bubbles: true,
		cancelable: true,
		screenX: clientX,
		screenY: clientY,
		clientX,
		clientY
	};

	/^touch/.test(type) ?
		emulateEvent.touch(mainEventRect, type, params) :
		emulateEvent.mouse(mainEventRect, type, params);
}

export default {
	/**
	 * Whether subchart brush interaction is enabled.
	 * @returns {boolean}
	 * @private
	 */
	isSubchartBrushEnabled(): boolean {
		const {config} = this;

		return config.subchart_show && config.subchart_brush_enabled !== false;
	},

	/**
	 * Bind event rect handlers for subchart hover interactions.
	 * @param {d3Selection} eventRect Subchart event rect selection
	 * @private
	 */
	bindSubchartEventRect(eventRect): void {
		const $$ = this;
		const {config, state} = $$;

		eventRect.on("mouseover mousemove mouseout touchstart touchmove touchend", null);

		if (!config.interaction_enabled) {
			return;
		}

		if (state.inputType === "mouse") {
			eventRect
				.on("mouseover mousemove", function(event) {
					if ($$.isSubchartBrushEnabled()) {
						return;
					}

					dispatchSubchartEvent($$, event.type, event, this);
				})
				.on("mouseout", function(event) {
					if ($$.isSubchartBrushEnabled()) {
						return;
					}

					dispatchSubchartEvent($$, "mouseout", event, this);
				});
		} else if (state.inputType === "touch") {
			eventRect
				.on("touchstart touchmove touchend", function(event) {
					if ($$.isSubchartBrushEnabled() || event.touches?.length > 1) {
						return;
					}

					dispatchSubchartEvent($$, event.type, event, this);
				});
		}
	},

	/**
	 * Initialize the brush.
	 * @private
	 */
	initBrush(): void {
		const $$ = this;
		const {config, scale, $el: {subchart}, state} = $$;
		const isRotated = config.axis_rotated;
		const height = config.subchart_size_height;
		let lastDomain;
		let lastSelection;
		let timeout;

		// set the brush
		$$.brush = (
			isRotated ? d3BrushY() : d3BrushX()
		).handleSize(5);

		// bind brush event
		$$.brush.on("start brush end", event => {
			const {selection, sourceEvent, target, type} = event;

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
					lastSelection?.forEach((v, i) => {
						if (v !== selection[i]) {
							state.domain[i] = scale.x.orgDomain()[i];
						}
					});

				$$.redrawForBrush(type !== "start");
			}

			if (type === "end") {
				lastDomain = scale.x.orgDomain();
			}

			// handle brush's handle position & visibility
			if (target?.handle) {
				if (selection === null) {
					$$.brush.handle.attr("display", "none");
				} else {
					$$.brush.handle.attr("display", null)
						.attr("transform", (d, i) => {
							const pos = [selection[i], height / 2];

							return `translate(${isRotated ? pos.reverse() : pos})`;
						});
				}
			}
		});

		$$.brush.updateResize = function() {
			timeout && clearTimeout(timeout);
			timeout = setTimeout(() => {
				const selection = this.getSelection();

				lastDomain && d3BrushSelection(selection.node()) &&
					this.move(selection, lastDomain.map(scale.subX.orgScale()));
			}, 0);
		};

		$$.brush.update = function() {
			const extent = this.extent()();

			if (extent[1].filter(v => isNaN(v)).length === 0) {
				subchart.main?.select(`.${CLASS.brush}`).call(this);
			}

			return this;
		};

		// set the brush extent
		$$.brush.scale = function(scale) {
			const h = config.subchart_size_height;
			let extent = $$.axis.getExtent();

			if (!extent && scale.range) {
				extent = [[0, 0], [scale.range()[1], h]];
			} else if (isArray(extent)) {
				extent = extent.map((v, i) => [v, i > 0 ? h : i]);
			}

			// [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner
			isRotated && extent[1].reverse();
			this.extent(extent);

			// when extent updates, brush selection also be re-applied
			// https://github.com/d3/d3/issues/2918
			this.update();
		};

		$$.brush.getSelection = () => (
			// @ts-ignore
			subchart.main ? subchart.main.select(`.${CLASS.brush}`) : d3Select([])
		);
	},

	/**
	 * Initialize the subchart.
	 * @private
	 */
	initSubchart(): void {
		const $$ = this;
		const {config, state: {clip, hasAxis}, $el: {defs, svg, subchart, axis}} = $$;

		if (!hasAxis) {
			return;
		}

		const visibility = config.subchart_show ? null : "hidden";
		const clipId = `${clip.id}-subchart`;
		const clipPath = $$.getClipPath(clipId);

		clip.idSubchart = clipId;
		$$.appendClip(defs, clipId);
		$$.initBrush();

		subchart.main = svg.append("g")
			.classed(CLASS.subchart, true)
			.attr("transform", $$.getTranslate("context"));

		const {main} = subchart;

		main.style("visibility", visibility);

		// Define g for chart area
		main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.chart);

		$$.withSubchartTypeContext(() => {
			// Define g for chart types area
			SUBCHART_TYPES.forEach(v => {
				const type = capitalize(/^(bubble|scatter)$/.test(v) ? "circle" : v);

				if ($$.hasType(v) || $$.hasTypeOf(type)) {
					const chart = main.select(`.${CLASS.chart}`);
					const chartClassName = CLASS[`chart${type}s`];

					if (chart.select(`.${chartClassName}`).empty()) {
						chart
							.append("g")
							.attr("class", chartClassName);
					}
				}
			});
		});

		// Add extent rect for Brush
		const brush = main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.brush)
			.style("pointer-events", $$.isSubchartBrushEnabled() ? null : "none")
			.call($$.brush);

		config.subchart_showHandle && $$.addBrushHandle(brush);

		subchart.eventRect = main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", `${CLASS.eventRects} ${CLASS.eventRects}-subchart`)
			.style("fill-opacity", "0")
			.style("pointer-events", $$.isSubchartBrushEnabled() ? "none" : "all")
			.append("rect")
			.attr("class", `${CLASS.eventRect} ${CLASS.eventRect}-subchart`)
			.attr("width", $$.state.width2)
			.attr("height", $$.state.height2);

		$$.bindSubchartEventRect(subchart.eventRect);

		main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.xgridFocus)
			.append("line")
			.attr("class", CLASS.xgridFocus)
			.style("visibility", "hidden");

		// ATTENTION: This must be called AFTER chart added
		// Add Axis
		axis.subX = main.append("g")
			.attr("class", CLASS.axisX)
			.attr("transform", $$.getTranslate("subX"))
			.attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis)
			.style("visibility", config.subchart_axis_x_show ? visibility : "hidden");

		axis.subY = main.append("g")
			.attr("class", CLASS.axisY)
			.attr("transform", $$.getTranslate("subY"))
			.style("visibility", config.subchart_axis_y_show ? visibility : "hidden");

		axis.subY2 = main.append("g")
			.attr("class", CLASS.axisY2)
			.attr("transform", $$.getTranslate("subY2"))
			.style("visibility", config.subchart_axis_y2_show ? visibility : "hidden");
	},

	/**
	 * Add brush handle
	 * Enabled when: subchart.showHandle=true
	 * @param {d3Selection} brush Brush selection
	 * @private
	 */
	addBrushHandle(brush): void {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const initRange = config.subchart_init_range;
		const customHandleClass = "handle--custom";

		const path = SUBCHART_BRUSH_HANDLE_PATH[isRotated ? "y" : "x"];

		$$.brush.handle = brush.selectAll(`.${customHandleClass}`)
			.data(isRotated ? [{type: "n"}, {type: "s"}] : [{type: "w"}, {type: "e"}])
			.enter()
			.append("path")
			.attr("class", customHandleClass)
			.attr("cursor", `${isRotated ? "ns" : "ew"}-resize`)
			.attr("d", d => path[/[se]/.test(d.type) ? "end" : "start"])
			.attr("display", initRange ? null : "none");
	},

	/**
	 * Update sub chart
	 * @param {object} targets $$.data.targets
	 * @private
	 */
	updateTargetsForSubchart(targets): void {
		const $$ = this;
		const {config, state, $el: {subchart: {main}}} = $$;

		if (config.subchart_show) {
			$$.withSubchartTypeContext(() => {
				SUBCHART_TYPES
					.filter(v => $$.hasType(v) || $$.hasTypeOf(capitalize(v)))
					.forEach(v => {
						const isPointType = /^(bubble|scatter)$/.test(v);
						const name = capitalize(isPointType ? "circle" : v);
						const chartClass = $$.getChartClass(name, true);
						const shapeClass = $$.getClass(isPointType ? "circles" : `${v}s`, true);

						const shapeChart = main.select(`.${CLASS[`chart${`${name}s`}`]}`);

						if (isPointType) {
							const circle = shapeChart
								.selectAll(`.${CLASS.circles}`)
								.data(targets.filter($$[`is${capitalize(v)}Type`].bind($$)))
								.attr("class", shapeClass);

							circle.exit().remove();
							circle.enter().append("g")
								.attr("class", shapeClass);
						} else {
							const shapeUpdate = shapeChart
								.selectAll(`.${CLASS[`chart${name}`]}`)
								.attr("class", chartClass)
								.data(targets.filter($$[`is${name}Type`].bind($$)));

							const shapeEnter = shapeUpdate.enter()
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
			});

			// -- Brush --//
			main.selectAll(`.${CLASS.brush} rect`)
				.attr(config.axis_rotated ? "width" : "height",
					config.axis_rotated ? state.width2 : state.height2);

			$$.$el.subchart.eventRect
				?.attr("width", state.width2)
				.attr("height", state.height2)
				.style("pointer-events", $$.isSubchartBrushEnabled() ? "none" : "all");
		}
	},

	/**
	 * Update subchart y domains using subchart type options.
	 * @param {object} targets Targets to show
	 * @private
	 */
	updateSubchartYDomain(targets): void {
		const $$ = this;
		const {scale} = $$;
		const targetsToShow = targets || $$.filterTargetsToShow($$.data.targets);

		scale.subY?.domain($$.getYDomain(targetsToShow, "y"));
		scale.subY2?.domain($$.getYDomain(targetsToShow, "y2"));
	},

	/**
	 * Redraw subchart.
	 * @private
	 * @param {boolean} withSubchart whether or not to show subchart
	 * @param {number} duration duration
	 */
	redrawSubchart(withSubchart: boolean, duration: number): void {
		const $$ = this;
		const {config, $el: {subchart: {main}}, state} = $$;
		const withTransition = !!duration;

		main.style("visibility", config.subchart_show ? null : "hidden");
		main.select(`.${CLASS.brush}`)
			.style("pointer-events", $$.isSubchartBrushEnabled() ? null : "none");
		$$.$el.subchart.eventRect
			?.style("pointer-events", $$.isSubchartBrushEnabled() ? "none" : "all");
		$$.$el.axis.subY
			?.style("visibility", config.subchart_axis_y_show ? null : "hidden");
		$$.$el.axis.subY2
			?.style("visibility", config.subchart_axis_y2_show ? null : "hidden");

		// subchart
		if (config.subchart_show) {
			// reflect main chart to extent on subchart if zoomed
			if (state.event?.type === "zoom") {
				$$.brush.update();
			}

			// update subchart elements if needed
			if (withSubchart) {
				const initRange = config.subchart_init_range;

				// extent rect
				!brushEmpty($$) && $$.brush.update();

				$$.withSubchartTypeContext(() => {
					const targetsToShow = state._targetsToShow ||
						$$.filterTargetsToShow($$.data.targets);

					$$.updateSubchartYDomain(targetsToShow);

					const subchartShape = $$.getDrawShape();

					Object.keys(subchartShape.type).forEach(v => {
						const name = capitalize(v);
						const drawFn = $$[`generateDraw${name}`](subchartShape.indices[v], true);

						// call shape's update & redraw method
						$$[`update${name}`](withTransition, true);
						$$[`redraw${name}`](drawFn, withTransition, true);
					});

					if ($$.hasType("bubble") || $$.hasType("scatter")) {
						const {cx} = subchartShape.pos;
						const cy = $$.updateCircleY(true);

						$$.updateCircle(true);
						$$.redrawCircle(cx, cy, withTransition, undefined, true);
					}
				});

				if (!state.rendered && initRange) {
					state.domain = initRange;

					$$.brush.move(
						$$.brush.getSelection(),
						initRange.map($$.scale.x)
					);
				}
			}
		}
	},

	/**
	 * Show a focus grid line on subchart following main chart focus.
	 * @param {Array} data Selected data
	 * @private
	 */
	showSubchartGridFocus(data): void {
		const $$ = this;
		const {config, state, $el: {subchart: {main}}} = $$;

		if (
			!main ||
			!config.subchart_show ||
			$$.isSubchartBrushEnabled() ||
			config.grid_focus_show === false ||
			!config.tooltip_show ||
			config.axis_tooltip
		) {
			return;
		}

		const focusData = Array.isArray(data) ? data : [data];
		const focus = focusData.find(d => d && $$.getBaseValue(d) != null);

		if (!focus) {
			$$.hideSubchartGridFocus();
			return;
		}

		const pos = $$.scale.subX(focus.x);

		if (!Number.isFinite(pos)) {
			$$.hideSubchartGridFocus();
			return;
		}

		const line = main.select(`g.${CLASS.xgridFocus} line.${CLASS.xgridFocus}`);

		if (showContinuousSubchartGridFocus($$)) {
			line.style("visibility", "hidden");
			return;
		}

		syncSubchartGridFocusStyle($$, line);

		config.axis_rotated ?
			line
				.attr("x1", 0)
				.attr("x2", state.width2)
				.attr("y1", pos)
				.attr("y2", pos) :
			line
				.attr("x1", pos)
				.attr("x2", pos)
				.attr("y1", 0)
				.attr("y2", state.height2);

		line.style("visibility", null);
	},

	/**
	 * Hide subchart focus grid line.
	 * @private
	 */
	hideSubchartGridFocus(): void {
		hideContinuousSubchartGridFocus(this);

		this.$el.subchart.main
			?.select(`g.${CLASS.xgridFocus} line.${CLASS.xgridFocus}`)
			.style("visibility", "hidden");
	},

	/**
	 * Redraw the brush.
	 * @param {boolean} [callCallbck=true] Call 'onbrush' callback or not.
	 * @private
	 */
	redrawForBrush(callCallbck = true): void {
		const $$ = this;
		const {
			config: {
				subchart_onbrush: onBrush,
				zoom_rescale: withY
			},
			scale,
			state
		} = $$;

		$$.redraw({
			withTransition: false,
			withY,
			withSubchart: false,
			withUpdateXDomain: true,
			withDimension: false
		});

		callCallbck && state.rendered &&
			onBrush.bind($$.api)(state.domain ?? scale.x.orgDomain());
	},

	/**
	 * Transform context
	 * @param {boolean} withTransition indicates transition is enabled
	 * @param {object} transitions The return value of the generateTransitions method of Axis.
	 * @private
	 */
	transformContext(withTransition, transitions): void {
		const $$ = this;
		const {$el: {subchart}, $T} = $$;

		const subXAxis = transitions?.axisSubX ?
			transitions.axisSubX :
			$T(subchart.main.select(`.${CLASS.axisX}`), withTransition);
		const subYAxis = transitions?.axisSubY ?
			transitions.axisSubY :
			$T(subchart.main.select(`.${CLASS.axisY}`), withTransition);
		const subY2Axis = transitions?.axisSubY2 ?
			transitions.axisSubY2 :
			$T(subchart.main.select(`.${CLASS.axisY2}`), withTransition);

		subchart.main.attr("transform", $$.getTranslate("context"));
		subXAxis.attr("transform", $$.getTranslate("subX"));
		subYAxis.attr("transform", $$.getTranslate("subY"));
		subY2Axis.attr("transform", $$.getTranslate("subY2"));
	}
};
