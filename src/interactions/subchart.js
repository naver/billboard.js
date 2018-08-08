/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	event as d3Event
} from "d3-selection";
import {
	brushX as d3BrushX,
	brushY as d3BrushY
} from "d3-brush";
import ChartInternal from "../internals/ChartInternal";
import CLASS from "../config/classes";
import {extend, brushEmpty, isFunction} from "../internals/util";

extend(ChartInternal.prototype, {
	/**
	 * Initialize the brush.
	 * @private
	 */
	initBrush() {
		const $$ = this;

		// set the brush
		$$.brush = $$.config.axis_rotated ? d3BrushY() : d3BrushX();

		// set "brush" event
		const brushHandler = () => {
			$$.redrawForBrush();
		};

		$$.brush
			.on("start", () => {
				$$.inputType === "touch" && $$.hideTooltip();
				brushHandler();
			})
			.on("brush", brushHandler);

		$$.brush.update = function() {
			const extent = this.extent()();

			if (extent[1].filter(v => isNaN(v)).length === 0) {
				$$.context && $$.context.select(`.${CLASS.brush}`).call(this);
			}

			return this;
		};

		// set the brush extent
		$$.brush.scale = function(scale, height) {
			const overlay = $$.svg.select(".bb-brush .overlay");
			const extent = [[0, 0]];

			if (scale.range) {
				extent.push([
					scale.range()[1],
					((height || !overlay.empty()) && ~~overlay.attr("height")) || 60
				]);
			} else if (scale.constructor === Array) {
				extent.push(scale);
			}

			$$.config.axis_rotated && extent.reverse();
			this.extent($$.config.axis_x_extent || extent);

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

		$$.context = $$.svg.append("g").attr("transform", $$.getTranslate("context"));

		const context = $$.context;

		context.style("visibility", visibility);

		// Define g for chart area
		context.append("g")
			.attr("clip-path", $$.clipPathForSubchart)
			.attr("class", CLASS.chart);

		// Define g for bar chart area
		context.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartBars);

		// Define g for line chart area
		context.select(`.${CLASS.chart}`)
			.append("g")
			.attr("class", CLASS.chartLines);

		// Add extent rect for Brush
		context.append("g")
			.attr("clip-path", $$.clipPath)
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
			contextLineEnter.append("g")
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
		let contextBar;

		if (withTransition) {
			contextBar = this.contextBar.transition(Math.random().toString()).duration(duration);
		} else {
			contextBar = this.contextBar;
		}

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

		$$.contextLine = $$.context.selectAll(`.${CLASS.lines}`).selectAll(`.${CLASS.line}`)
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
		let contextLine;

		if (withTransition) {
			contextLine = this.contextLine.transition(Math.random().toString()).duration(duration);
		} else {
			contextLine = this.contextLine;
		}

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
		let contextArea;

		if (withTransition) {
			contextArea = this.contextArea.transition(Math.random().toString()).duration(duration);
		} else {
			contextArea = this.contextArea;
		}

		contextArea.attr("d", drawAreaOnSub)
			.style("fill", this.color)
			.style("opacity", this.orgAreaOpacity);
	},

	/**
	 * Redraw subchart.
	 * @private
	 * @param {Boolean} whether or not to show subchart
	 * @param Do not use.
	 * @param {Number} transition duration
	 * @param Do not use.
	 * @param {Object} area Indices
	 * @param {Object} bar Indices
	 * @param {Object} line Indices
	 */
	redrawSubchart(withSubchart, transitions, duration,
		durationForExit, areaIndices, barIndices, lineIndices) {
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

				// setup drawer - MEMO: this must be called after axis updated
				const drawAreaOnSub = $$.generateDrawArea(areaIndices, true);
				const drawBarOnSub = $$.generateDrawBar(barIndices, true);
				const drawLineOnSub = $$.generateDrawLine(lineIndices, true);

				$$.updateBarForSubchart(duration);
				$$.updateLineForSubchart(duration);
				$$.updateAreaForSubchart(duration);

				$$.redrawBarForSubchart(drawBarOnSub, duration, duration);
				$$.redrawLineForSubchart(drawLineOnSub, duration, duration);
				$$.redrawAreaForSubchart(drawAreaOnSub, duration, duration);
			}
		}
	},
	/**
	 * Redraw the brush.
	 * @private
	 */
	redrawForBrush() {
		const $$ = this;
		const x = $$.x;

		$$.redraw({
			withTransition: false,
			withY: $$.config.zoom_rescale,
			withSubchart: false,
			withUpdateXDomain: true,
			withDimension: false
		});

		$$.config.subchart_onbrush.call($$.api, x.orgDomain());
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
	 * Get default extent
	 * @private
	 * @returns {Array} default extent
	 */
	getDefaultExtent() {
		const $$ = this;
		const config = $$.config;
		let extent = isFunction(config.axis_x_extent) ?
			config.axis_x_extent($$.getXDomain($$.data.targets)) : config.axis_x_extent;

		if ($$.isTimeSeries()) {
			extent = [$$.parseDate(extent[0]), $$.parseDate(extent[1])];
		}

		return extent;
	},
});
