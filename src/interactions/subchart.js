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
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, brushEmpty, capitalize, isArray, isFunction, getRandom} from "../internals/util";

extend(ChartInternal.prototype, {
	/**
	 * Initialize the brush.
	 * @private
	 */
	initBrush() {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		// set the brush
		$$.brush = isRotated ? d3BrushY() : d3BrushX();

		// set "brush" event
		const brushHandler = () => {
			$$.redrawForBrush();
		};
		const getBrushSize = () => {
			const brush = $$.svg.select(`.${CLASS.brush} .overlay`);
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
				$$.inputType === "touch" && $$.hideTooltip();
				brushHandler();
			})
			.on("brush", brushHandler)
			.on("end", () => {
				lastDomain = $$.x.orgDomain();
			});

		$$.brush.updateResize = function() {
			timeout && clearTimeout(timeout);
			timeout = setTimeout(() => {
				const selection = this.getSelection();

				lastDomain && d3BrushSelection(selection.node()) &&
					this.move(selection, lastDomain.map($$.subX.orgScale()));
			}, 0);
		};

		$$.brush.update = function() {
			const extent = this.extent()();

			if (extent[1].filter(v => isNaN(v)).length === 0) {
				$$.context && $$.context.select(`.${CLASS.brush}`).call(this);
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
			$$.context ? $$.context.select(`.${CLASS.brush}`) : d3Select([])
		);
	},

	/**
	 * Initialize the subchart.
	 * @private
	 */
	initSubchart() {
		const $$ = this;
		const config = $$.config;
		const visibility = config.subchart_show ? "visible" : "hidden";
		const clipId = `${$$.clipId}-subchart`;
		const clipPath = $$.getClipPath(clipId);

		$$.clipIdForSubchart = clipId;
		$$.appendClip($$.defs, clipId);
		$$.initBrush();

		$$.context = $$.svg.append("g").attr("transform", $$.getTranslate("context"));

		const context = $$.context;

		context.style("visibility", visibility);

		// Define g for chart area
		context.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.chart);

		// Define g for bar chart area
		$$.hasType("bar") && context.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartBars);

		// Define g for line chart area
		context.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartLines);

		// Add extent rect for Brush
		context.append("g")
			.attr("clip-path", clipPath)
			.attr("class", CLASS.brush)
			.call($$.brush);

		// ATTENTION: This must be called AFTER chart added
		// Add Axis
		$$.axes.subx = context.append("g")
			.attr("class", CLASS.axisX)
			.attr("transform", $$.getTranslate("subx"))
			.attr("clip-path", config.axis_rotated ? "" : $$.clipPathForXAxis)
			.style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
	},

	/**
	 * Update sub chart
	 * @private
	 * @param {Object} $$.data.targets
	 */
	updateTargetsForSubchart(targets) {
		const $$ = this;
		const context = $$.context;
		const config = $$.config;
		const classChartBar = $$.classChartBar.bind($$);
		const classBars = $$.classBars.bind($$);
		const classChartLine = $$.classChartLine.bind($$);
		const classLines = $$.classLines.bind($$);
		const classAreas = $$.classAreas.bind($$);

		if (config.subchart_show) {
			// -- Bar --//
			const contextBarUpdate = context.select(`.${CLASS.chartBars}`)
				.selectAll(`.${CLASS.chartBar}`)
				.data(targets)
				.attr("class", classChartBar);
			const contextBarEnter = contextBarUpdate.enter()
				.append("g")
				.style("opacity", "0")
				.attr("class", classChartBar)
				.merge(contextBarUpdate);

			// Bars for each data
			contextBarEnter.append("g")
				.attr("class", classBars);

			// -- Line --//
			const contextLineUpdate = context.select(`.${CLASS.chartLines}`)
				.selectAll(`.${CLASS.chartLine}`)
				.data(targets)
				.attr("class", classChartLine);
			const contextLineEnter = contextLineUpdate.enter().append("g")
				.style("opacity", "0")
				.attr("class", classChartLine)
				.merge(contextLineUpdate);

			// Lines for each data
			contextLineEnter.append("g")
				.attr("class", classLines);

			// Area
			$$.hasType("area") && contextLineEnter.append("g")
				.attr("class", classAreas);

			// -- Brush --//
			context.selectAll(`.${CLASS.brush} rect`)
				.attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? $$.width2 : $$.height2);
		}
	},

	/**
	 * Update the bar of the sub chart
	 * @private
	 * @param {Object} durationForExit
	 */
	updateBarForSubchart(durationForExit) {
		const $$ = this;

		$$.contextBar = $$.context.selectAll(`.${CLASS.bars}`).selectAll(`.${CLASS.bar}`)
			.data($$.barData.bind($$));

		$$.contextBar
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.contextBar = $$.contextBar
			.enter()
			.append("path")
			.attr("class", $$.classBar.bind($$))
			.style("stroke", "none")
			.style("fill", $$.color)
			.merge($$.contextBar)
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
		const contextBar = withTransition ?
			this.contextBar.transition(getRandom()).duration(duration) :
			this.contextBar;

		contextBar.attr("d", drawBarOnSub)
			.style("opacity", "1");
	},

	/**
	 * Update the line of the sub chart
	 * @private
	 * @param {Number} Fade-out transition duration
	 */
	updateLineForSubchart(durationForExit) {
		const $$ = this;

		$$.contextLine = $$.context.selectAll(`.${CLASS.lines}`)
			.selectAll(`.${CLASS.line}`)
			.data($$.lineData.bind($$));

		$$.contextLine
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.contextLine = $$.contextLine
			.enter()
			.append("path")
			.attr("class", $$.classLine.bind($$))
			.style("stroke", $$.color)
			.merge($$.contextLine)
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
		const contextLine = withTransition ?
			this.contextLine.transition(getRandom()).duration(duration) :
			this.contextLine;

		contextLine.attr("d", drawLineOnSub)
			.style("opacity", "1");
	},

	/**
	 * Update the area of the sub chart
	 * @private
	 * @param {Number} Fade-out transition duration
	 */
	updateAreaForSubchart(durationForExit) {
		const $$ = this;

		$$.contextArea = $$.context.selectAll(`.${CLASS.areas}`)
			.selectAll(`.${CLASS.area}`)
			.data($$.lineData.bind($$));

		$$.contextArea
			.exit()
			.transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$$.contextArea = $$.contextArea
			.enter()
			.append("path")
			.attr("class", $$.classArea.bind($$))
			.style("fill", $$.color)
			.style("opacity", function() {
				$$.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge($$.contextArea)
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
		const contextArea = withTransition ?
			this.contextArea.transition(getRandom()).duration(duration) :
			this.contextArea;

		contextArea.attr("d", drawAreaOnSub)
			.style("fill", this.color)
			.style("opacity", this.orgAreaOpacity);
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
		const config = $$.config;

		$$.context.style("visibility", config.subchart_show ? "visible" : "hidden");

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

		$$.redraw({
			withTransition: false,
			withY: $$.config.zoom_rescale,
			withSubchart: false,
			withUpdateXDomain: true,
			withDimension: false
		});

		$$.config.subchart_onbrush.call($$.api, $$.x.orgDomain());
	},

	/**
	 * Transform context
	 * @private
	 * @param {Boolean} indicates transition is enabled
	 * @param {Object} The return value of the generateTransitions method of Axis.
	 */
	transformContext(withTransition, transitions) {
		const $$ = this;
		let subXAxis;

		if (transitions && transitions.axisSubX) {
			subXAxis = transitions.axisSubX;
		} else {
			subXAxis = $$.context.select(`.${CLASS.axisX}`);
			if (withTransition) { subXAxis = subXAxis.transition(); }
		}

		$$.context.attr("transform", $$.getTranslate("context"));
		subXAxis.attr("transform", $$.getTranslate("subx"));
	},

	/**
	 * Get extent value
	 * @private
	 * @returns {Array} default extent
	 */
	getExtent() {
		const $$ = this;
		let extent = $$.config.axis_x_extent;

		if (extent) {
			if (isFunction(extent)) {
				extent = extent($$.getXDomain($$.data.targets), $$.subX);
			} else if ($$.isTimeSeries() && extent.every(isNaN)) {
				extent = extent.map(v => $$.subX($$.parseDate(v)));
			}
		}

		return extent;
	}
});
