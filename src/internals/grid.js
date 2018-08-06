/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isArray, isValue} from "./util";

// Grid position and text anchor helpers
const getGridTextAnchor = d => isValue(d.position) || "end";
const getGridTextDx = d => (d.position === "start" ? 4 : (d.position === "middle" ? 0 : -4));
const getGridTextX = (isX, width, height) => d => {
	let x = isX ? 0 : width;

	if (d.position === "start") {
		x = isX ? -height : 0;
	} else if (d.position === "middle") {
		x = (isX ? -height : width) / 2;
	}

	return x;
};

extend(ChartInternal.prototype, {
	initGrid() {
		const $$ = this;
		const config = $$.config;

		$$.xgrid = d3SelectAll([]);

		!config.grid_lines_front && $$.initGridLines();
		!config.grid_front && $$.initXYFocusGrid();
	},

	initGridLines() {
		const $$ = this;

		$$.gridLines = $$.main.append("g")
			.attr("clip-path", $$.clipPathForGrid)
			.attr("class", `${CLASS.grid} ${CLASS.gridLines}`);

		$$.gridLines.append("g").attr("class", CLASS.xgridLines);
		$$.gridLines.append("g").attr("class", CLASS.ygridLines);

		$$.xgridLines = d3SelectAll([]);
	},

	updateXGrid(withoutUpdate) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const xgridData = $$.generateGridData(config.grid_x_type, $$.x);
		const tickOffset = $$.isCategorized() ? $$.xAxis.tickOffset() : 0;

		$$.xgridAttr = isRotated ? {
			"x1": 0,
			"x2": $$.width,
			"y1": d => $$.x(d) - tickOffset,
			"y2": d => $$.x(d) - tickOffset,
		} : {
			"x1": d => $$.x(d) + tickOffset,
			"x2": d => $$.x(d) + tickOffset,
			"y1": 0,
			"y2": $$.height,
		};

		$$.xgrid = $$.main.select(`.${CLASS.xgrids}`)
			.selectAll(`.${CLASS.xgrid}`)
			.data(xgridData);

		$$.xgrid.exit().remove();

		$$.xgrid = $$.xgrid.enter()
			.append("line")
			.attr("class", CLASS.xgrid)
			.merge($$.xgrid);

		if (!withoutUpdate) {
			$$.xgrid.each(function() {
				const grid = d3Select(this);

				Object.keys($$.xgridAttr).forEach(id => {
					grid.attr(id, $$.xgridAttr[id])
						.style("opacity", () => (
							grid.attr(isRotated ? "y1" : "x1") === (isRotated ? $$.height : 0) ?
								"0" : "1"
						));
				});
			});
		}
	},

	updateYGrid() {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const gridValues = $$.yAxis.tickValues() || $$.y.ticks(config.grid_y_ticks);

		$$.ygrid = $$.main.select(`.${CLASS.ygrids}`)
			.selectAll(`.${CLASS.ygrid}`)
			.data(gridValues);

		$$.ygrid.exit().remove();

		$$.ygrid = $$.ygrid
			.enter()
			.append("line")
			.attr("class", CLASS.ygrid)
			.merge($$.ygrid);

		$$.ygrid.attr("x1", isRotated ? $$.y : 0)
			.attr("x2", isRotated ? $$.y : $$.width)
			.attr("y1", isRotated ? 0 : $$.y)
			.attr("y2", isRotated ? $$.height : $$.y);

		$$.smoothLines($$.ygrid, "grid");
	},

	updateGrid(duration) {
		const $$ = this;

		// hide if arc type
		$$.grid.style("visibility", $$.hasArcType() ? "hidden" : "visible");

		$$.main.select(`line.${CLASS.xgridFocus}`)
			.style("visibility", "hidden");

		$$.updateXGridLines(duration);
		$$.updateYGridLines(duration);
	},

	/**
	 * Update X Grid lines
	 * @param {Number} duration
	 * @private
	 */
	updateXGridLines(duration) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		config.grid_x_show && $$.updateXGrid();

		$$.xgridLines = main.select(`.${CLASS.xgridLines}`)
			.selectAll(`.${CLASS.xgridLine}`)
			.data(config.grid_x_lines);

		// exit
		$$.xgridLines.exit().transition()
			.duration(duration)
			.style("opacity", "0")
			.remove();

		// enter
		const xgridLine = $$.xgridLines.enter().append("g");

		xgridLine.append("line")
			.style("opacity", "0");

		xgridLine.append("text")
			.attr("transform", isRotated ? "" : "rotate(-90)")
			.attr("dy", -5)
			.style("opacity", "0");

		$$.xgridLines = xgridLine.merge($$.xgridLines);

		$$.xgridLines
			.attr("class", d => `${CLASS.xgridLine} ${d.class || ""}`.trim())
			.select("text")
			.attr("text-anchor", getGridTextAnchor)
			.attr("dx", getGridTextDx)
			.transition()
			.duration(duration)
			.text(d => d.text)
			.transition()
			.style("opacity", "1");
	},

	/**
	 * Update Y Grid lines
	 * @param {Number} duration
	 * @private
	 */
	updateYGridLines(duration) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;
		const isRotated = config.axis_rotated;

		config.grid_y_show && $$.updateYGrid();

		$$.ygridLines = main.select(`.${CLASS.ygridLines}`)
			.selectAll(`.${CLASS.ygridLine}`)
			.data(config.grid_y_lines);

		// exit
		$$.ygridLines.exit()
			.transition()
			.duration(duration)
			.style("opacity", "0")
			.remove();

		// enter
		const ygridLine = $$.ygridLines.enter().append("g");

		ygridLine.append("line")
			.style("opacity", "0");

		ygridLine.append("text")
			.attr("transform", isRotated ? "rotate(-90)" : "")
			.style("opacity", "0");

		$$.ygridLines = ygridLine.merge($$.ygridLines);

		// update
		const yv = $$.yv.bind($$);

		$$.ygridLines
			.attr("class", d => `${CLASS.ygridLine} ${d.class || ""}`.trim())
			.select("line")
			.transition()
			.duration(duration)
			.attr("x1", isRotated ? yv : 0)
			.attr("x2", isRotated ? yv : $$.width)
			.attr("y1", isRotated ? 0 : yv)
			.attr("y2", isRotated ? $$.height : yv)
			.transition()
			.style("opacity", "1");

		$$.ygridLines.select("text")
			.attr("text-anchor", getGridTextAnchor)
			.attr("dx", getGridTextDx)
			.transition()
			.duration(duration)
			.attr("dy", -5)
			.attr("x", getGridTextX(isRotated, $$.width, $$.height))
			.attr("y", yv)
			.text(d => d.text)
			.transition()
			.style("opacity", "1");
	},

	redrawGrid(withTransition) {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;
		const xv = $$.xv.bind($$);

		let lines = $$.xgridLines.select("line");
		let texts = $$.xgridLines.select("text");

		lines = (withTransition ? lines.transition() : lines)
			.attr("x1", isRotated ? 0 : xv)
			.attr("x2", isRotated ? $$.width : xv)
			.attr("y1", isRotated ? xv : 0)
			.attr("y2", isRotated ? xv : $$.height);

		texts = (withTransition ? texts.transition() : texts)
			.attr("x", getGridTextX(!isRotated, $$.width, $$.height))
			.attr("y", xv)
			.text(d => d.text);

		return [
			(withTransition ? lines.transition() : lines).style("opacity", "1"),
			(withTransition ? texts.transition() : texts).style("opacity", "1")
		];
	},

	initXYFocusGrid() {
		const $$ = this;
		const config = $$.config;

		$$.grid = $$.main.append("g")
			.attr("clip-path", $$.clipPathForGrid)
			.attr("class", CLASS.grid);

		config.grid_x_show &&
			$$.grid.append("g").attr("class", CLASS.xgrids);

		config.grid_y_show &&
			$$.grid.append("g").attr("class", CLASS.ygrids);

		if (config.grid_focus_show) {
			$$.grid.append("g")
				.attr("class", CLASS.xgridFocus)
				.append("line")
				.attr("class", CLASS.xgridFocus);
		}
	},

	showXGridFocus(selectedData) {
		const $$ = this;
		const config = $$.config;
		const isRotated = config.axis_rotated;
		const dataToShow = selectedData.filter(d => d && isValue($$.getBaseValue(d)));
		const focusEl = $$.main.selectAll(`line.${CLASS.xgridFocus}`);
		const xx = $$.xx.bind($$);

		if (!config.tooltip_show) {
			return;
		}

		// Hide when bubble/scatter plot exists
		if ($$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType()) {
			return;
		}

		focusEl
			.style("visibility", "visible")
			.data([dataToShow[0]])
			.attr(isRotated ? "y1" : "x1", xx)
			.attr(isRotated ? "y2" : "x2", xx);

		$$.smoothLines(focusEl, "grid");
	},

	hideXGridFocus() {
		this.main.select(`line.${CLASS.xgridFocus}`).style("visibility", "hidden");
	},

	updateXgridFocus() {
		const $$ = this;
		const isRotated = $$.config.axis_rotated;

		$$.main.select(`line.${CLASS.xgridFocus}`)
			.attr("x1", isRotated ? 0 : -10)
			.attr("x2", isRotated ? $$.width : -10)
			.attr("y1", isRotated ? -10 : 0)
			.attr("y2", isRotated ? -10 : $$.height);
	},

	generateGridData(type, scale) {
		const $$ = this;
		const tickNum = $$.main.select(`.${CLASS.axisX}`)
			.selectAll(".tick")
			.size();
		let gridData = [];

		if (type === "year") {
			const xDomain = $$.getXDomain();
			const firstYear = xDomain[0].getFullYear();
			const lastYear = xDomain[1].getFullYear();

			for (let i = firstYear; i <= lastYear; i++) {
				gridData.push(new Date(`${i}-01-01 00:00:00`));
			}
		} else {
			gridData = scale.ticks(10);

			if (gridData.length > tickNum) { // use only int
				gridData = gridData.filter(d => String(d).indexOf(".") < 0);
			}
		}

		return gridData;
	},

	getGridFilterToRemove(params) {
		return params ? line => {
			let found = false;

			(isArray(params) ? params.concat() : [params]).forEach(param => {
				if ((("value" in param && line.value === param.value) || ("class" in param && line.class === param.class))) {
					found = true;
				}
			});

			return found;
		} : () => true;
	},

	removeGridLines(params, forX) {
		const $$ = this;
		const config = $$.config;
		const toRemove = $$.getGridFilterToRemove(params);
		const toShow = line => !toRemove(line);
		const classLines = forX ? CLASS.xgridLines : CLASS.ygridLines;
		const classLine = forX ? CLASS.xgridLine : CLASS.ygridLine;

		$$.main.select(`.${classLines}`)
			.selectAll(`.${classLine}`)
			.filter(toRemove)
			.transition()
			.duration(config.transition_duration)
			.style("opacity", "0")
			.remove();

		const gridLines = `grid_${forX ? "x" : "y"}_lines`;

		config[gridLines] = config[gridLines].filter(toShow);
	},
});
