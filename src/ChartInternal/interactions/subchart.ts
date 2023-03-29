/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {
	brushX as d3BrushX,
	brushY as d3BrushY,
	brushSelection as d3BrushSelection
} from "d3-brush";
import CLASS from "../../config/classes";
import {brushEmpty, capitalize, isArray, isFunction, parseDate} from "../../module/util";

export default {
	/**
	 * Initialize the brush.
	 * @private
	 */
	initBrush(): void {
		const $$ = this;
		const {config, scale, $el: {subchart}} = $$;
		const isRotated = config.axis_rotated;
		let lastDomain;
		let timeout;

		// set the brush
		$$.brush = (
			isRotated ? d3BrushY() : d3BrushX()
		).handleSize(5);

		const getBrushSize = () => {
			const brush = $$.$el.svg.select(`.${CLASS.brush} .overlay`);
			const brushSize = {width: 0, height: 0};

			if (brush.size()) {
				brushSize.width = +brush.attr("width");
				brushSize.height = +brush.attr("height");
			}

			return brushSize[isRotated ? "width" : "height"];
		};

		// bind brush event
		$$.brush.on("start brush end", event => {
			const {selection, target, type} = event;

			if (type === "start") {
				$$.state.inputType === "touch" && $$.hideTooltip();
			}

			if (/(start|brush)/.test(type)) {
				$$.redrawForBrush();
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
							const pos = isRotated ?
								[33, selection[i] - (i === 0 ? 30 : 24)] : [selection[i], 3];

							return `translate(${pos})`;
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
			const h = config.subchart_size_height || getBrushSize();
			let extent = $$.getExtent();

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
		const path = isRotated ? [
			"M 5.2491724,29.749209 a 6,6 0 0 0 -5.50000003,-6.5 H -5.7508276 a 6,6 0 0 0 -6.0000004,6.5 z m -5.00000003,-2 H -6.7508276 m 6.99999997,-2 H -6.7508276Z",
			"M 5.2491724,23.249172 a 6,-6 0 0 1 -5.50000003,6.5 H -5.7508276 a 6,-6 0 0 1 -6.0000004,-6.5 z m -5.00000003,2 H -6.7508276 m 6.99999997,2 H -6.7508276Z"
		] : [
			"M 0 18 A 6 6 0 0 0 -6.5 23.5 V 29 A 6 6 0 0 0 0 35 Z M -2 23 V 30 M -4 23 V 30Z",
			"M 0 18 A 6 6 0 0 1 6.5 23.5 V 29 A 6 6 0 0 1 0 35 Z M 2 23 V 30 M 4 23 V 30Z"
		];

		$$.brush.handle = brush.selectAll(`.${customHandleClass}`)
			.data(isRotated ?
				[{type: "n"}, {type: "s"}] :
				[{type: "w"}, {type: "e"}]
			)
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

				!state.rendered && initRange && $$.brush.move(
					$$.brush.getSelection(),
					initRange.map($$.scale.x)
				);
			}
		}
	},

	/**
	 * Redraw the brush.
	 * @private
	 */
	redrawForBrush() {
		const $$ = this;
		const {config: {
			subchart_onbrush: onBrush, zoom_rescale: withY
		}, scale} = $$;

		$$.redraw({
			withTransition: false,
			withY,
			withSubchart: false,
			withUpdateXDomain: true,
			withDimension: false
		});

		onBrush.bind($$.api)(scale.x.orgDomain());
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
	},

	/**
	 * Get extent value
	 * @returns {Array} default extent
	 * @private
	 */
	getExtent(): number[] {
		const $$ = this;
		const {config, scale} = $$;
		let extent = config.axis_x_extent;

		if (extent) {
			if (isFunction(extent)) {
				extent = extent.bind($$.api)($$.getXDomain($$.data.targets), scale.subX);
			} else if ($$.axis.isTimeSeries() && extent.every(isNaN)) {
				const fn = parseDate.bind($$);

				extent = extent.map(v => scale.subX(fn(v)));
			}
		}

		return extent;
	}
};
