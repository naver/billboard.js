/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend, isArray, isValue} from "./util";

extend(ChartInternal.prototype, {
	initGrid() {
		const $$ = this;
		const config = $$.config;

		$$.grid = $$.main.append("g")
			.attr("clip-path", $$.clipPathForGrid)
			.attr("class", CLASS.grid);

		if (config.grid_x_show) {
			$$.grid.append("g").attr("class", CLASS.xgrids);
		}

		if (config.grid_y_show) {
			$$.grid.append("g").attr("class", CLASS.ygrids);
		}

		if (config.grid_focus_show) {
			$$.grid.append("g")
				.attr("class", CLASS.xgridFocus)
				.append("line")
				.attr("class", CLASS.xgridFocus);
		}

		$$.xgrid = d3SelectAll([]);

		if (!config.grid_lines_front) {
			$$.initGridLines();
		}
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
		const xgridData = $$.generateGridData(config.grid_x_type, $$.x);
		const tickOffset = $$.isCategorized() ? $$.xAxis.tickOffset() : 0;

		$$.xgridAttr = config.axis_rotated ? {
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
							grid.attr(config.axis_rotated ? "y1" : "x1") === (config.axis_rotated ? $$.height : 0) ?
								"0" : "1"
						));
				});
			});
		}
	},

	updateYGrid() {
		const $$ = this;
		const config = $$.config;
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

		$$.ygrid.attr("x1", config.axis_rotated ? $$.y : 0)
			.attr("x2", config.axis_rotated ? $$.y : $$.width)
			.attr("y1", config.axis_rotated ? 0 : $$.y)
			.attr("y2", config.axis_rotated ? $$.height : $$.y);

		$$.smoothLines($$.ygrid, "grid");
	},

	gridTextAnchor(d) {
		return d.position ? d.position : "end";
	},

	gridTextDx(d) {
		return d.position === "start" ? 4 : d.position === "middle" ? 0 : -4;
	},

	xGridTextX(d) {
		return d.position === "start" ? -this.height : d.position === "middle" ? -this.height / 2 : 0;
	},

	yGridTextX(d) {
		return d.position === "start" ? 0 : d.position === "middle" ? this.width / 2 : this.width;
	},

	updateGrid(duration) {
		const $$ = this;
		const main = $$.main;
		const config = $$.config;

		// hide if arc type
		$$.grid.style("visibility", $$.hasArcType() ? "hidden" : "visible");

		main.select(`line.${CLASS.xgridFocus}`)
			.style("visibility", "hidden");

		if (config.grid_x_show) {
			$$.updateXGrid();
		}

		$$.xgridLines = main.select(`.${CLASS.xgridLines}`)
			.selectAll(`.${CLASS.xgridLine}`)
			.data(config.grid_x_lines);

		// exit
		$$.xgridLines.exit().transition()
			.duration(duration)
			.style("opacity", "0")
			.remove();

		// enter
		const xgridLine = $$.xgridLines.enter().append("g")
			.attr("class", d => CLASS.xgridLine + (d.class ? ` ${d.class}` : ""));

		xgridLine.append("line")
			.style("opacity", "0");

		xgridLine.append("text")
			.attr("text-anchor", $$.gridTextAnchor)
			.attr("transform", config.axis_rotated ? "" : "rotate(-90)")
			.attr("dx", $$.gridTextDx)
			.attr("dy", -5)
			.style("opacity", "0");

		$$.xgridLines = xgridLine.merge($$.xgridLines);

		// Y-Grid
		if (config.grid_y_show) {
			$$.updateYGrid();
		}
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
		const ygridLine = $$.ygridLines.enter().append("g")
			.attr("class", d => CLASS.ygridLine + (d.class ? ` ${d.class}` : ""));

		ygridLine.append("line")
			.style("opacity", "0");

		ygridLine.append("text")
			.attr("text-anchor", $$.gridTextAnchor)
			.attr("transform", config.axis_rotated ? "rotate(-90)" : "")
			.attr("dx", $$.gridTextDx)
			.attr("dy", -5)
			.style("opacity", "0");

		$$.ygridLines = ygridLine.merge($$.ygridLines);

		// update
		const yv = $$.yv.bind($$);

		$$.ygridLines.select("line")
			.transition()
			.duration(duration)
			.attr("x1", config.axis_rotated ? yv : 0)
			.attr("x2", config.axis_rotated ? yv : $$.width)
			.attr("y1", config.axis_rotated ? 0 : yv)
			.attr("y2", config.axis_rotated ? $$.height : yv)
			.transition()
			.style("opacity", "1");

		$$.ygridLines.select("text")
			.transition()
			.duration(duration)
			.attr("x", config.axis_rotated ? $$.xGridTextX.bind($$) : $$.yGridTextX.bind($$))
			.attr("y", yv)
			.text(d => d.text)
			.transition()
			.style("opacity", "1");
	},

	redrawGrid(withTransition) {
		const $$ = this;
		const rotated = $$.config.axis_rotated;
		const xv = $$.xv.bind($$);

		let lines = $$.xgridLines.select("line");
		let texts = $$.xgridLines.select("text");

		lines = (withTransition ? lines.transition() : lines)
			.attr("x1", rotated ? 0 : xv)
			.attr("x2", rotated ? $$.width : xv)
			.attr("y1", rotated ? xv : 0)
			.attr("y2", rotated ? xv : $$.height);

		texts = (withTransition ? texts.transition() : texts)
			.attr("x", rotated ? $$.yGridTextX.bind($$) : $$.xGridTextX.bind($$))
			.attr("y", xv)
			.text(d => d.text);

		return [
			(withTransition ? lines.transition() : lines).style("opacity", "1"),
			(withTransition ? texts.transition() : texts).style("opacity", "1")
		];
	},

	showXGridFocus(selectedData) {
		const $$ = this;
		const config = $$.config;
		const dataToShow = selectedData.filter(d => d && isValue(d.value));
		const focusEl = $$.main.selectAll(`line.${CLASS.xgridFocus}`);
		const xx = $$.xx.bind($$);

		if (!config.tooltip_show) {
			return;
		}

		// Hide when scatter plot exists
		if ($$.hasType("scatter") || $$.hasArcType()) {
			return;
		}

		focusEl
			.style("visibility", "visible")
			.data([dataToShow[0]])
			.attr(config.axis_rotated ? "y1" : "x1", xx)
			.attr(config.axis_rotated ? "y2" : "x2", xx);

		$$.smoothLines(focusEl, "grid");
	},

	hideXGridFocus() {
		this.main.select(`line.${CLASS.xgridFocus}`).style("visibility", "hidden");
	},

	updateXgridFocus() {
		const $$ = this;
		const config = $$.config;

		$$.main.select(`line.${CLASS.xgridFocus}`)
			.attr("x1", config.axis_rotated ? 0 : -10)
			.attr("x2", config.axis_rotated ? $$.width : -10)
			.attr("y1", config.axis_rotated ? -10 : 0)
			.attr("y2", config.axis_rotated ? -10 : $$.height);
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
		return params ? function(line) {
			let found = false;

			(isArray(params) ? params.concat() : [params]).forEach(param => {
				if ((("value" in param && line.value === param.value) || ("class" in param && line.class === param.class))) {
					found = true;
				}
			});

			return found;
		} : function() { return true; };
	},

	removeGridLines(params, forX) {
		const $$ = this;
		const config = $$.config;
		const toRemove = $$.getGridFilterToRemove(params);
		const toShow = function(line) {
			return !toRemove(line);
		};
		const classLines = forX ? CLASS.xgridLines : CLASS.ygridLines;
		const classLine = forX ? CLASS.xgridLine : CLASS.ygridLine;

		$$.main.select(`.${classLines}`)
			.selectAll(`.${classLine}`)
			.filter(toRemove)
			.transition()
			.duration(config.transition_duration)
			.style("opacity", "0")
			.remove();

		if (forX) {
			config.grid_x_lines = config.grid_x_lines.filter(toShow);
		} else {
			config.grid_y_lines = config.grid_y_lines.filter(toShow);
		}
	},
});
