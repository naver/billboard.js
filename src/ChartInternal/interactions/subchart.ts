/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	event as d3Event
} from "d3-selection";
import {
	brushX as d3BrushX,
	brushY as d3BrushY,
	brushSelection as d3BrushSelection
} from "d3-brush";
import CLASS from "../../config/classes";
import {brushEmpty, capitalize, isArray, isFunction, getRandom, parseDate} from "../../module/util";

export default {
	/**
	 * Initialize the brush.
	 * @private
	 */
	initBrush() {
		const $$ = this;
		const {config, scale, $el: {subchart}} = $$;
		const isRotated = config.axis_rotated;

		// set the brush
		$$.brush = isRotated ? d3BrushY() : d3BrushX();

		// set "brush" event
		const brushHandler = () => {
			$$.redrawForBrush();
		};
		const getBrushSize = () => {
			const brush = $$.$el.svg.select(`.${CLASS.brush} .overlay`);
			const brushSize = {width: 0, height: 0};

			if (brush.size()) {
				brushSize.width = +brush.attr("width");
				brushSize.height = +brush.attr("height");
			}

			return brushSize[isRotated ? "width" : "height"];
		};

		let lastDomain;
		let timeout;

		$$.brush
			.on("start", () => {
				$$.state.inputType === "touch" && $$.hideTooltip();
				brushHandler();
			})
			.on("brush", brushHandler)
			.on("end", () => {
				lastDomain = scale.x.orgDomain();
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
				subchart.main && subchart.main.select(`.${CLASS.brush}`).call(this);
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
	initSubchart() {
		const $$ = this;
		const {config, state: {clip, hasAxis}, $el: {defs, svg, subchart, axis}} = $$;

		if (!hasAxis) {
			return;
		}

		const visibility = config.subchart_show ? "visible" : "hidden";
		const clipId = `${clip.id}-subchart`;
		const clipPath = $$.getClipPath(clipId);

		clip.idSubchart = clipId;
		$$.appendClip(defs, clipId);
		$$.initBrush();

		subchart.main = svg.append("g").attr("transform", $$.getTranslate("context"));

		const {main} = subchart;

		main.style("visibility", visibility);

		// Define g for chart area
		main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.chart);

		// Define g for bar chart area
		$$.hasType("bar") && main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartBars);

		// Define g for line chart area
		main.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartLines);

		// Add extent rect for Brush
		main.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.brush)
			.call($$.brush);

		// ATTENTION: This must be called AFTER chart added
		// Add Axis
		axis.subX = main.append("g")
			.attr("class", CLASS.axisX)
			.attr("transform", $$.getTranslate("subX"))
			.attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis)
			.style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
	},

	/**
	 * Update sub chart
	 * @private
	 * @param {Object} $$.data.targets
	 */
	updateTargetsForSubchart(targets) {
		const $$ = this;
		const {config, state, $el: {subchart: {main}}} = $$;
		const classChartBar = $$.classChartBar.bind($$);
		const classBars = $$.classBars.bind($$);
		const classChartLine = $$.classChartLine.bind($$);
		const classLines = $$.classLines.bind($$);
		const classAreas = $$.classAreas.bind($$);

		if (config.subchart_show) {
			// -- Bar --//
			const barUpdate = main.select(`.${CLASS.chartBars}`)
				.selectAll(`.${CLASS.chartBar}`)
				.data(targets)
				.attr("class", classChartBar);
			const barEnter = barUpdate.enter()
				.append("g")
				.style("opacity", "0")
				.attr("class", classChartBar)
				.merge(barUpdate);

			// Bars for each data
			barEnter.append("g")
				.attr("class", classBars);

			// -- Line --//
			const lineUpdate = main.select(`.${CLASS.chartLines}`)
				.selectAll(`.${CLASS.chartLine}`)
				.data(targets)
				.attr("class", classChartLine);
			const lineEnter = lineUpdate.enter().append("g")
				.style("opacity", "0")
				.attr("class", classChartLine)
				.merge(lineUpdate);

			// Lines for each data
			lineEnter.append("g")
				.attr("class", classLines);

			// Area
			$$.hasType("area") && lineEnter.append("g")
				.attr("class", classAreas);

			// -- Brush --//
			main.selectAll(`.${CLASS.brush} rect`)
				.attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? state.width2 : state.height2);
		}
	},

	/**
	 * Update the bar of the sub chart
	 * @private
	 * @param {Object} durationForExit
	 */
	updateBarForSubchart(durationForExit) {
		const $$ = this;
		const {$el: {subchart}} = $$;

		subchart.bar = subchart.main.selectAll(`.${CLASS.bars}`).selectAll(`.${CLASS.bar}`)
			.data($$.barData.bind($$));

		subchart.bar
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		subchart.bar = subchart.bar
			.enter()
			.append("path")
			.attr("class", $$.classBar.bind($$))
			.style("stroke", "none")
			.style("fill", $$.color)
			.merge(subchart.bar)
			.style("opacity", $$.initialOpacity.bind($$));
	},

	/**
	 * Redraw the bar of the subchart
	 * @private
	 * @param {String} path in subchart bar
	 * @param {Boolean} whether or not to transition.
	 * @param {Number} transition duration
	 */
	redrawBarForSubchart(drawBarOnSub, withTransition, duration) {
		const {bar} = this.$el.subchart;

		(withTransition ? bar.transition(getRandom()).duration(duration) : bar)
			.attr("d", drawBarOnSub)
			.style("opacity", "1");
	},

	/**
	 * Update the line of the sub chart
	 * @private
	 * @param {Number} Fade-out transition duration
	 */
	updateLineForSubchart(durationForExit) {
		const $$ = this;
		const {$el: {subchart}} = $$;

		subchart.line = subchart.main.selectAll(`.${CLASS.lines}`)
			.selectAll(`.${CLASS.line}`)
			.data($$.lineData.bind($$));

		subchart.line
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		subchart.line = subchart.line
			.enter()
			.append("path")
			.attr("class", $$.classLine.bind($$))
			.style("stroke", $$.color)
			.merge(subchart.line)
			.style("opacity", $$.initialOpacity.bind($$));
	},

	/**
	 * Redraw the line of the subchart
	 * @private
	 * @param {String} path in subchart line
	 * @param {Boolean} whether or not to transition
	 * @param {Number} transition duration
	 */
	redrawLineForSubchart(drawLineOnSub, withTransition, duration) {
		const {line} = this.$el.subchart;

		(withTransition ? line.transition(getRandom()).duration(duration) : line)
			.attr("d", drawLineOnSub)
			.style("opacity", "1");
	},

	/**
	 * Update the area of the sub chart
	 * @private
	 * @param {Number} Fade-out transition duration
	 */
	updateAreaForSubchart(durationForExit) {
		const $$ = this;
		const {$el: {subchart}} = $$;

		subchart.area = subchart.main.selectAll(`.${CLASS.areas}`)
			.selectAll(`.${CLASS.area}`)
			.data($$.lineData.bind($$));

		subchart.area
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		subchart.area = subchart.area
			.enter()
			.append("path")
			.attr("class", $$.classArea.bind($$))
			.style("fill", $$.color)
			.style("opacity", function() {
				$$.state.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge(subchart.area)
			.style("opacity", "0");
	},
	/**
	 * Redraw the area of the subchart
	 * @private
	 * @param {String} path in subchart line
	 * @param {Boolean} whether or not to transition
	 * @param {Number} transition duration
	 */
	redrawAreaForSubchart(drawAreaOnSub, withTransition, duration) {
		const {area} = this.$el.subchart;

		(withTransition ? area.transition(getRandom()).duration(duration) : area)
			.attr("d", drawAreaOnSub)
			.style("fill", this.color)
			.style("opacity", this.state.orgAreaOpacity);
	},

	/**
	 * Redraw subchart.
	 * @private
	 * @param {Boolean} withSubchart whether or not to show subchart
	 * @param {Number} duration duration
	 * @param {Object} shape Shape's info
	 */
	redrawSubchart(withSubchart, duration, shape) {
		const $$ = this;
		const {config, $el: {subchart: {main}}} = $$;

		main.style("visibility", config.subchart_show ? "visible" : "hidden");

		// subchart
		if (config.subchart_show) {
			// reflect main chart to extent on subchart if zoomed
			if (d3Event && d3Event.type === "zoom") {
				$$.brush.update();
			}

			// update subchart elements if needed
			if (withSubchart) {
				// extent rect
				!brushEmpty($$) && $$.brush.update();

				Object.keys(shape.type).forEach(v => {
					const name = capitalize(v);
					const draw = $$[`generateDraw${name}`](shape.indices[v], true);

					$$[`update${name}ForSubchart`](duration);
					$$[`redraw${name}ForSubchart`](draw, duration, duration);
				});
			}
		}
	},

	/**
	 * Redraw the brush.
	 * @private
	 */
	redrawForBrush() {
		const $$ = this;
		const {config: {subchart_onbrush: onBrush, zoom_rescale: withY}, scale} = $$;

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
	 * @private
	 * @param {Boolean} indicates transition is enabled
	 * @param {Object} The return value of the generateTransitions method of Axis.
	 */
	transformContext(withTransition, transitions) {
		const $$ = this;
		const {main} = $$.$el.subchart;
		let subXAxis;

		if (transitions && transitions.axisSubX) {
			subXAxis = transitions.axisSubX;
		} else {
			subXAxis = main.select(`.${CLASS.axisX}`);

			if (withTransition) {
				subXAxis = subXAxis.transition();
			}
		}

		main.attr("transform", $$.getTranslate("context"));
		subXAxis.attr("transform", $$.getTranslate("subX"));
	},

	/**
	 * Get extent value
	 * @private
	 * @returns {Array} default extent
	 */
	getExtent() {
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
