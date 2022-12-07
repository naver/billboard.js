/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import {$AXIS, $COMMON, $FOCUS, $GRID} from "../../config/classes";
import {isArray, isValue} from "../../module/util";

// Grid position and text anchor helpers
const getGridTextAnchor = d => isValue(d.position) || "end";
const getGridTextDx = d => (d.position === "start" ? 4 : (d.position === "middle" ? 0 : -4));

/**
 * Get grid text x value getter function
 * @param {boolean} isX Is x Axis
 * @param {number} width Width value
 * @param {number} height Height value
 * @returns {Function}
 * @private
 */
function getGridTextX(isX, width, height): Function {
	return d => {
		let x = isX ? 0 : width;

		if (d.position === "start") {
			x = isX ? -height : 0;
		} else if (d.position === "middle") {
			x = (isX ? -height : width) / 2;
		}

		return x;
	};
}

/**
 * Update coordinate attributes value
 * @param {d3.selection} el Target node
 * @param {string} type Type
 * @private
 */
function smoothLines(el, type: string): void {
	if (type === "grid") {
		el.each(function() {
			const g = d3Select(this);

			["x1", "x2", "y1", "y2"]
				.forEach(v => g.attr(v, Math.ceil(+g.attr(v))));
		});
	}
}

export default {
	hasGrid(): boolean {
		const {config} = this;

		return ["x", "y"]
			.some(v => config[`grid_${v}_show`] || config[`grid_${v}_lines`].length);
	},

	initGrid() {
		const $$ = this;

		$$.hasGrid() && $$.initGridLines();
		$$.initFocusGrid();
	},

	initGridLines(): void {
		const $$ = this;
		const {config, state: {clip}, $el} = $$;

		if (config.grid_x_lines.length || config.grid_y_lines.length) {
			$el.gridLines.main = $el.main.insert("g", `.${$COMMON.chart}${config.grid_lines_front ? " + *" : ""}`)
				.attr("clip-path", clip.pathGrid)
				.attr("class", `${$GRID.grid} ${$GRID.gridLines}`);

			$el.gridLines.main.append("g").attr("class", $GRID.xgridLines);
			$el.gridLines.main.append("g").attr("class", $GRID.ygridLines);

			$el.gridLines.x = d3SelectAll([]);
		}
	},

	updateXGrid(withoutUpdate): void {
		const $$ = this;
		const {config, scale, state, $el: {main, grid}} = $$;
		const isRotated = config.axis_rotated;
		const xgridData = $$.generateGridData(config.grid_x_type, scale.x);
		const tickOffset = $$.axis.isCategorized() ? $$.axis.x.tickOffset() : 0;
		const pos = d => (scale.zoom || scale.x)(d) + (
			tickOffset * (isRotated ? -1 : 1)
		);

		state.xgridAttr = isRotated ? {
			"x1": 0,
			"x2": state.width,
			"y1": pos,
			"y2": pos,
		} : {
			"x1": pos,
			"x2": pos,
			"y1": 0,
			"y2": state.height,
		};

		grid.x = main.select(`.${$GRID.xgrids}`)
			.selectAll(`.${$GRID.xgrid}`)
			.data(xgridData);

		grid.x.exit().remove();

		grid.x = grid.x.enter()
			.append("line")
			.attr("class", $GRID.xgrid)
			.merge(grid.x);

		if (!withoutUpdate) {
			grid.x.each(function() {
				const grid = d3Select(this);

				Object.keys(state.xgridAttr).forEach(id => {
					grid.attr(id, state.xgridAttr[id])
						.style("opacity", () => (
							grid.attr(isRotated ? "y1" : "x1") === (isRotated ? state.height : 0) ?
								"0" : null
						));
				});
			});
		}
	},

	updateYGrid(): void {
		const $$ = this;
		const {axis, config, scale, state, $el: {grid, main}} = $$;
		const isRotated = config.axis_rotated;
		const pos = d => Math.ceil(scale.y(d));
		const gridValues =
			axis.y.getGeneratedTicks(config.grid_y_ticks) || $$.scale.y.ticks(config.grid_y_ticks);

		grid.y = main.select(`.${$GRID.ygrids}`)
			.selectAll(`.${$GRID.ygrid}`)
			.data(gridValues);

		grid.y.exit().remove();

		grid.y = grid.y
			.enter()
			.append("line")
			.attr("class", $GRID.ygrid)
			.merge(grid.y);

		grid.y.attr("x1", isRotated ? pos : 0)
			.attr("x2", isRotated ? pos : state.width)
			.attr("y1", isRotated ? 0 : pos)
			.attr("y2", isRotated ? state.height : pos);

		smoothLines(grid.y, "grid");
	},

	updateGrid() {
		const $$ = this;
		const {$el: {grid, gridLines}} = $$;

		!gridLines.main && $$.initGridLines();

		// hide if arc type
		grid.main.style("visibility", $$.hasArcType() ? "hidden" : null);

		$$.hideGridFocus();
		$$.updateXGridLines();
		$$.updateYGridLines();
	},

	/**
	 * Update X Grid lines
	 * @private
	 */
	updateXGridLines(): void {
		const $$ = this;
		const {config, $el: {gridLines, main}, $T} = $$;
		const isRotated = config.axis_rotated;

		config.grid_x_show && $$.updateXGrid();

		let xLines = main.select(`.${$GRID.xgridLines}`)
			.selectAll(`.${$GRID.xgridLine}`)
			.data(config.grid_x_lines);

		// exit
		$T(xLines.exit())
			.style("opacity", "0")
			.remove();

		// enter
		const xgridLine = xLines.enter().append("g");

		xgridLine.append("line")
			.style("opacity", "0");

		xgridLine.append("text")
			.attr("transform", isRotated ? null : "rotate(-90)")
			.attr("dy", -5)
			.style("opacity", "0");

		xLines = xgridLine.merge(xLines);

		$T(xLines
			.attr("class", d => `${$GRID.xgridLine} ${d.class || ""}`.trim())
			.select("text")
			.attr("text-anchor", getGridTextAnchor)
			.attr("dx", getGridTextDx)
		)
			.text(d => d.text)
			.style("opacity", null);

		gridLines.x = xLines;
	},

	/**
	 * Update Y Grid lines
	 * @private
	 */
	updateYGridLines(): void {
		const $$ = this;
		const {config, state: {width, height}, $el, $T} = $$;
		const isRotated = config.axis_rotated;

		config.grid_y_show && $$.updateYGrid();

		let ygridLines = $el.main.select(`.${$GRID.ygridLines}`)
			.selectAll(`.${$GRID.ygridLine}`)
			.data(config.grid_y_lines);

		// exit
		$T(ygridLines.exit())
			.style("opacity", "0")
			.remove();

		// enter
		const ygridLine = ygridLines.enter().append("g");

		ygridLine.append("line")
			.style("opacity", "0");

		ygridLine.append("text")
			.attr("transform", isRotated ? "rotate(-90)" : "")
			.style("opacity", "0");

		ygridLines = ygridLine.merge(ygridLines);

		// update
		const yv = $$.yv.bind($$);

		$T(ygridLines
			.attr("class", d => `${$GRID.ygridLine} ${d.class || ""}`.trim())
			.select("line"))
			.attr("x1", isRotated ? yv : 0)
			.attr("x2", isRotated ? yv : width)
			.attr("y1", isRotated ? 0 : yv)
			.attr("y2", isRotated ? height : yv)
			.style("opacity", null);

		$T(ygridLines.select("text")
			.attr("text-anchor", getGridTextAnchor)
			.attr("dx", getGridTextDx))
			.attr("dy", -5)
			.attr("x", getGridTextX(isRotated, width, height))
			.attr("y", yv)
			.text(d => d.text)
			.style("opacity", null);

		$el.gridLines.y = ygridLines;
	},

	redrawGrid(withTransition: boolean): any[] {
		const $$ = this;
		const {
			config: {axis_rotated: isRotated},
			state: {width, height},
			$el: {gridLines},
			$T
		} = $$;
		const xv = $$.xv.bind($$);

		let lines = gridLines.x.select("line");
		let texts = gridLines.x.select("text");

		lines = $T(lines, withTransition)
			.attr("x1", isRotated ? 0 : xv)
			.attr("x2", isRotated ? width : xv)
			.attr("y1", isRotated ? xv : 0)
			.attr("y2", isRotated ? xv : height);

		texts = $T(texts, withTransition)
			.attr("x", getGridTextX(!isRotated, width, height))
			.attr("y", xv)
			.text(d => d.text);

		return [
			lines.style("opacity", null),
			texts.style("opacity", null)
		];
	},

	initFocusGrid(): void {
		const $$ = this;
		const {config, state: {clip}, $el} = $$;
		const isFront = config.grid_front;
		const className = `.${isFront && $el.gridLines.main ? $GRID.gridLines : $COMMON.chart}${isFront ? " + *" : ""}`;

		const grid = $el.main.insert("g", className)
			.attr("clip-path", clip.pathGrid)
			.attr("class", $GRID.grid);

		$el.grid.main = grid;

		config.grid_x_show &&
			grid.append("g").attr("class", $GRID.xgrids);

		config.grid_y_show &&
			grid.append("g").attr("class", $GRID.ygrids);

		if (config.interaction_enabled && config.grid_focus_show) {
			grid.append("g")
				.attr("class", $FOCUS.xgridFocus)
				.append("line")
				.attr("class", $FOCUS.xgridFocus);

			// to show xy focus grid line, should be 'tooltip.grouped=false'
			if (config.grid_focus_y && !config.tooltip_grouped) {
				grid.append("g")
					.attr("class", $FOCUS.ygridFocus)
					.append("line")
					.attr("class", $FOCUS.ygridFocus);
			}
		}
	},

	/**
	 * Show grid focus line
	 * @param {Array} data Selected data
	 * @private
	 */
	showGridFocus(data?): void {
		const $$ = this;
		const {config, state: {width, height}} = $$;
		const isRotated = config.axis_rotated;
		const focusEl = $$.$el.main.selectAll(`line.${$FOCUS.xgridFocus}, line.${$FOCUS.ygridFocus}`);

		const dataToShow = (data || [focusEl.datum()]).filter(d => d && isValue($$.getBaseValue(d)));

		// Hide when bubble/scatter/stanford plot exists
		if (!config.tooltip_show || dataToShow.length === 0 || $$.hasType("bubble") || $$.hasArcType()) {
			return;
		}

		const isEdge = config.grid_focus_edge && !config.tooltip_grouped;
		const xx = $$.xx.bind($$);

		focusEl
			.style("visibility", null)
			.data(dataToShow.concat(dataToShow))
			.each(function(d) {
				const el = d3Select(this);
				const pos = {
					x: xx(d),
					y: $$.getYScaleById(d.id)(d.value)
				};
				let xy;

				if (el.classed($FOCUS.xgridFocus)) {
					// will contain 'x1, y1, x2, y2' order
					xy = isRotated ?
						[
							null, // x1
							pos.x, // y1
							isEdge ? pos.y : width, // x2
							pos.x // y2
						] : [
							pos.x,
							isEdge ? pos.y : null,
							pos.x,
							height
						];
				} else {
					const isY2 = $$.axis.getId(d.id) === "y2";

					xy = isRotated ?
						[
							pos.y, // x1
							isEdge && !isY2 ? pos.x : null, // y1
							pos.y, // x2
							isEdge && isY2 ? pos.x : height // y2
						] : [
							isEdge && isY2 ? pos.x : null,
							pos.y,
							isEdge && !isY2 ? pos.x : width,
							pos.y
						];
				}

				["x1", "y1", "x2", "y2"]
					.forEach((v, i) => el.attr(v, xy[i]));
			});

		smoothLines(focusEl, "grid");
		$$.showCircleFocus?.(data);
	},

	hideGridFocus(): void {
		const $$ = this;
		const {state: {inputType, resizing}, $el: {main}} = $$;

		if (inputType === "mouse" || !resizing) {
			main.selectAll(`line.${$FOCUS.xgridFocus}, line.${$FOCUS.ygridFocus}`)
				.style("visibility", "hidden");

			$$.hideCircleFocus?.();
		}
	},

	updateGridFocus(): boolean {
		const $$ = this;
		const {state: {inputType, width, height, resizing}, $el: {grid}} = $$;
		const xgridFocus = grid.main.select(`line.${$FOCUS.xgridFocus}`);

		if (inputType === "touch") {
			if (xgridFocus.empty()) {
				resizing && $$.showCircleFocus?.();
			} else {
				$$.showGridFocus();
			}
		} else {
			const isRotated = $$.config.axis_rotated;

			xgridFocus
				.attr("x1", isRotated ? 0 : -10)
				.attr("x2", isRotated ? width : -10)
				.attr("y1", isRotated ? -10 : 0)
				.attr("y2", isRotated ? -10 : height);
		}

		// need to return 'true' as of being pushed to the redraw list
		// ref: getRedrawList()
		return true;
	},

	generateGridData(type: string, scale) {
		const $$ = this;
		const tickNum = $$.$el.main.select(`.${$AXIS.axisX}`)
			.selectAll(".tick")
			.size();
		let gridData: Date[] = [];

		if (type === "year") {
			const xDomain = $$.getXDomain();
			const [firstYear, lastYear] = xDomain.map(v => v.getFullYear());

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

	getGridFilterToRemove(params): Function {
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

	removeGridLines(params, forX?: boolean): void {
		const $$ = this;
		const {config, $T} = $$;
		const toRemove = $$.getGridFilterToRemove(params);
		const toShow = line => !toRemove(line);
		const classLines = forX ? $GRID.xgridLines : $GRID.ygridLines;
		const classLine = forX ? $GRID.xgridLine : $GRID.ygridLine;

		$T($$.$el.main.select(`.${classLines}`)
			.selectAll(`.${classLine}`)
			.filter(toRemove))
			.style("opacity", "0")
			.remove();

		const gridLines = `grid_${forX ? "x" : "y"}_lines`;

		config[gridLines] = config[gridLines].filter(toShow);
	},
};
