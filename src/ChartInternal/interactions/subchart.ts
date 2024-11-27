/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {brushSelection as d3BrushSelection, brushX as d3BrushX, brushY as d3BrushY} from "d3-brush";
import {select as d3Select} from "d3-selection";
import CLASS from "../../config/classes";
import {brushEmpty, capitalize, isArray} from "../../module/util";

export default {
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

		// Define g for chart types area
		["bar", "line", "bubble", "candlestick", "scatter"].forEach(v => {
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

		// Add extent rect for Brush
		const brush = main.append("g")
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
	addBrushHandle(brush): void {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const initRange = config.subchart_init_range;
		const customHandleClass = "handle--custom";

		// brush handle shape's path
		const path = isRotated ?
			[
				"M8.5 0 a6 6 0 0 0 -6 -6.5 H-2.5 a 6 6 0 0 0 -6 6.5 z m-5 -2 H-3.5 m7 -2 H-3.5z",
				"M8.5 0 a6 -6 0 0 1 -6 6.5 H-2.5 a 6 -6 0 0 1 -6 -6.5z m-5 2 H-3.5 m7 2 H-3.5z"
			] :
			[
				"M0 -8.5 A6 6 0 0 0 -6.5 -3.5 V2.5 A6 6 0 0 0 0 8.5 Z M-2 -3.5 V3.5 M-4 -3.5 V3.5z",
				"M0 -8.5 A6 6 0 0 1 6.5 -3.5 V2.5 A6 6 0 0 1 0 8.5 Z M2 -3.5 V3.5 M4 -3.5 V3.5z"
			];

		$$.brush.handle = brush.selectAll(`.${customHandleClass}`)
			.data(isRotated ? [{type: "n"}, {type: "s"}] : [{type: "w"}, {type: "e"}])
			.enter()
			.append("path")
			.attr("class", customHandleClass)
			.attr("cursor", `${isRotated ? "ns" : "ew"}-resize`)
			.attr("d", d => path[+/[se]/.test(d.type)])
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
			["bar", "line", "bubble", "candlestick", "scatter"]
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

			// -- Brush --//
			main.selectAll(`.${CLASS.brush} rect`)
				.attr(config.axis_rotated ? "width" : "height",
					config.axis_rotated ? state.width2 : state.height2);
		}
	},

	/**
	 * Redraw subchart.
	 * @private
	 * @param {boolean} withSubchart whether or not to show subchart
	 * @param {number} duration duration
	 * @param {object} shape Shape's info
	 */
	redrawSubchart(withSubchart: boolean, duration: number, shape): void {
		const $$ = this;
		const {config, $el: {subchart: {main}}, state} = $$;
		const withTransition = !!duration;

		main.style("visibility", config.subchart_show ? null : "hidden");

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

				Object.keys(shape.type).forEach(v => {
					const name = capitalize(v);
					const drawFn = $$[`generateDraw${name}`](shape.indices[v], true);

					// call shape's update & redraw method
					$$[`update${name}`](withTransition, true);
					$$[`redraw${name}`](drawFn, withTransition, true);
				});

				if ($$.hasType("bubble") || $$.hasType("scatter")) {
					const {cx} = shape.pos;
					const cy = $$.updateCircleY(true);

					$$.updateCircle(true);
					$$.redrawCircle(cx, cy, withTransition, undefined, true);
				}

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

		subchart.main.attr("transform", $$.getTranslate("context"));
		subXAxis.attr("transform", $$.getTranslate("subX"));
	}
};
