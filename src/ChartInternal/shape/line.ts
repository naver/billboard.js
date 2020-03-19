/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	area as d3Area,
	line as d3Line
} from "d3-shape";
import {
	mouse as d3Mouse,
	select as d3Select
} from "d3-selection";
import CLASS from "../../config/classes";
import {getRandom, isArray, isDefined, isFunction, isUndefined, isValue, parseDate} from "../../module/util";

export default {
	initLine(): void {
		const {$el} = this;

		$el.line = $el.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartLines);
	},

	updateTargetsForLine(targets): void {
		const $$ = this;
		const {$el} = $$;
		const classChartLine = $$.classChartLine.bind($$);
		const classLines = $$.classLines.bind($$);
		const classFocus = $$.classFocus.bind($$);

		if (!$el.line) {
			$$.initLine();
		}

		const mainLineUpdate = $el.main.select(`.${CLASS.chartLines}`)
			.selectAll(`.${CLASS.chartLine}`)
			.data(targets)
			.attr("class", d => classChartLine(d) + classFocus(d));

		const mainLineEnter = mainLineUpdate.enter().append("g")
			.attr("class", classChartLine)
			.style("opacity", "0")
			.style("pointer-events", "none");

		// Lines for each data
		mainLineEnter.append("g")
			.attr("class", classLines);

		// Areas
		if ($$.hasTypeOf("Area")) {
			mainLineEnter.append("g")
				.attr("class", $$.classAreas.bind($$));
		}

		// MEMO: can not keep same color...
		// mainLineUpdate.exit().remove();
	},

	updateLine(durationForExit): void {
		const $$ = this;
		const {format: {extraLineClasses}, $el} = $$;

		$el.line = $el.main
			.selectAll(`.${CLASS.lines}`)
			.selectAll(`.${CLASS.line}`)
			.data($$.lineData.bind($$));

		$el.line.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$el.line = $el.line.enter()
			.append("path")
			.attr("class", d => `${$$.classLine.bind($$)(d)} ${extraLineClasses(d) || ""}`)
			.style("stroke", $$.color)
			.merge($el.line)
			.style("opacity", $$.initialOpacity.bind($$))
			.style("shape-rendering", d => ($$.isStepType(d) ? "crispEdges" : ""))
			.attr("transform", null);
	},

	redrawLine(drawLine, withTransition?: boolean) {
		const {line} = this.$el;

		return [
			(withTransition ? line.transition(getRandom()) : line)
				.attr("d", drawLine)
				.style("stroke", this.color)
				.style("opacity", "1")
		];
	},

	/**
	 * Get the curve interpolate
	 * @param {Array} d Data object
	 * @returns {Function}
	 * @private
	 */
	getCurve(d): Function {
		const $$ = this;
		const isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);

		// when is step & rotated, should be computed in different way
		// https://github.com/naver/billboard.js/issues/471
		return isRotatedStepType ? context => {
			const step = $$.getInterpolate(d)(context);

			// keep the original method
			step.orgPoint = step.point;

			// to get rotated path data
			step.pointRotated = function(x, y) {
				this._point === 1 && (this._point = 2);

				const y1 = this._y * (1 - this._t) + y * this._t;

				this._context.lineTo(this._x, y1);
				this._context.lineTo(x, y1);

				this._x = x;
				this._y = y;
			};

			step.point = function(x, y) {
				this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
			};

			return step;
		} : $$.getInterpolate(d);
	},

	generateDrawLine(lineIndices, isSub?: boolean): (d) => string {
		const $$ = this;
		const {config, scale} = $$;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;

		const getPoints = $$.generateGetLinePoints(lineIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const yValue = (d, i) => (
			$$.isGrouped(d.id) ?
				getPoints(d, i)[0][1] :
				yScale(d.id, isSub)($$.getBaseValue(d))
		);

		let line = d3Line();

		line = isRotated ?
			line.x(yValue).y(xValue) : line.x(xValue).y(yValue);

		if (!lineConnectNull) {
			line = line.defined(d => $$.getBaseValue(d) !== null);
		}

		const x = isSub ? scale.subX : scale.x;

		return d => {
			const y = yScale(d.id, isSub);
			let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
			let x0 = 0;
			let y0 = 0;
			let path;

			if ($$.isLineType(d)) {
				const regions = config.data_regions[d.id];

				if (regions) {
					path = $$.lineWithRegions(values, x, y, regions);
				} else {
					if ($$.isStepType(d)) {
						values = $$.convertValuesToStep(values);
					}

					path = line.curve($$.getCurve(d))(values);
				}
			} else {
				if (values[0]) {
					x0 = x(values[0].x);
					y0 = y(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	generateGetLinePoints(lineIndices, isSubValue?: boolean):Function { // partial duplication of generateGetBarPoints
		const $$ = this;
		const {config} = $$;
		const isSub = !!isSubValue;
		const x = $$.getShapeX(0, lineIndices, isSub);
		const y = $$.getShapeY(isSub);
		const lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale(d.id, isSub)(0);
			const offset = lineOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 1 point that marks the line position
			const point = [posX, posY - (y0 - offset)];

			return [
				point,
				point, // from here and below, needed for compatibility
				point,
				point
			];
		};
	},

	lineWithRegions(d, x, y, _regions): string {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const isTimeSeries = $$.axis.isTimeSeries();
		const xOffset = $$.axis.isCategorized() ? 0.5 : 0;
		const regions: any[] = [];
		const dasharray = "2 2"; // default value

		let xp;
		let yp;
		let diff;
		let diffx2;

		// check weather data is within region
		const isWithinRegions = (withinX, withinRegions) => {
			for (let i = 0, reg; (reg = withinRegions[i]); i++) {
				if (reg.start < withinX && withinX <= reg.end) {
					return reg.style;
				}
			}

			return false;
		};

		// Check start/end of regions
		if (isDefined(_regions)) {
			const getValue = (v: Date | any, def: number): Date | any => (
				isUndefined(v) ? def : (isTimeSeries ? parseDate.call($$, v) : v)
			);

			for (let i = 0, reg; (reg = _regions[i]); i++) {
				const start = getValue(reg.start, d[0].x);
				const end = getValue(reg.end, d[d.length - 1].x);
				const style = reg.style || {dasharray};

				regions[i] = {start, end, style};
			}
		}

		// Set scales
		const xValue = isRotated ? dt => y(dt.value) : dt => x(dt.x);
		const yValue = isRotated ? dt => x(dt.x) : dt => y(dt.value);

		// Define svg generator function for region
		const generateM = points => `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;

		const sWithRegion = isTimeSeries ? (d0, d1, k, timeseriesDiff) => {
			const x0 = d0.x.getTime();
			const xDiff = d1.x - d0.x;
			const xv0 = new Date(x0 + xDiff * k);
			const xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));

			const points = isRotated ?
				[[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] :
				[[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];

			return generateM(points);
		} : (d0, d1, k, otherDiff) => {
			const points = isRotated ?
				[[y(yp(k), true), x(xp(k))], [y(yp(k + otherDiff), true), x(xp(k + otherDiff))]] :
				[[x(xp(k), true), y(yp(k))], [x(xp(k + otherDiff), true), y(yp(k + otherDiff))]];

			return generateM(points);
		};

		// Generate
		let path = "";

		for (let i = 0, data; (data = d[i]); i++) {
			const prevData = d[i - 1];
			const hasPrevData = prevData && isValue(prevData.value);
			let style = isWithinRegions(data.x, regions);

			// https://github.com/naver/billboard.js/issues/1172
			if (!isValue(data.value)) {
				continue;
			}

			// Draw as normal
			if (isUndefined(regions) || !style || !hasPrevData) {
				path += `${i && hasPrevData ? "L" : "M"}${xValue(data)},${yValue(data)}`;
			} else if (hasPrevData) {
				try {
					style = style.dasharray.split(" ");
				} catch (e) {
					style = dasharray.split(" ");
				}

				// Draw with region // TODO: Fix for horizotal charts
				xp = $$.getScale(prevData.x + xOffset, data.x + xOffset, isTimeSeries);
				yp = $$.getScale(prevData.value, data.value);

				const dx = x(data.x) - x(prevData.x);
				const dy = y(data.value) - y(prevData.value);
				const dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

				diff = style[0] / dd;
				diffx2 = diff * style[1];

				for (let j = diff; j <= 1; j += diffx2) {
					path += sWithRegion(prevData, data, j, diff);

					// to make sure correct line drawing
					if (j + diffx2 >= 1) {
						path += sWithRegion(prevData, data, 1, 0);
					}
				}
			}
		}

		return path;
	},

	updateAreaGradient(): void {
		const $$ = this;
		const {config, state: {datetimeId}, $el: {defs}} = $$;

		$$.data.targets.forEach(d => {
			const id = `${datetimeId}-areaGradient${$$.getTargetSelectorSuffix(d.id)}`;

			if ($$.isAreaType(d) && defs.select(`#${id}`).empty()) {
				const color = $$.color(d);
				const {
					x = [0, 0],
					y = [0, 1],
					stops = [[0, color, 1], [1, color, 0]]
				} = config.area_linearGradient;

				const linearGradient = defs.append("linearGradient")
					.attr("id", `${id}`)
					.attr("x1", x[0])
					.attr("x2", x[1])
					.attr("y1", y[0])
					.attr("y2", y[1]);

				stops.forEach(v => {
					const stopColor = isFunction(v[1]) ? v[1].bind($$.api)(d.id) : v[1];

					linearGradient.append("stop")
						.attr("offset", v[0])
						.attr("stop-color", stopColor || color)
						.attr("stop-opacity", v[2]);
				});
			}
		});
	},

	updateAreaColor(d): string {
		const $$ = this;

		return $$.config.area_linearGradient ?
			`url(#${$$.state.datetimeId}-areaGradient${$$.getTargetSelectorSuffix(d.id)})` :
			$$.color(d);
	},

	updateArea(durationForExit: number): void {
		const $$ = this;
		const {config, state, $el} = $$;

		config.area_linearGradient && $$.updateAreaGradient();

		$el.area = $el.main.selectAll(`.${CLASS.areas}`)
			.selectAll(`.${CLASS.area}`)
			.data($$.lineData.bind($$));

		$el.area.exit().transition()
			.duration(durationForExit)
			.style("opacity", "0")
			.remove();

		$el.area = $el.area.enter().append("path")
			.attr("class", $$.classArea.bind($$))
			.style("fill", $$.updateAreaColor.bind($$))
			.style("opacity", function() {
				state.orgAreaOpacity = d3Select(this).style("opacity");
				return "0";
			})
			.merge($el.area);

		$el.area
			.style("opacity", state.orgAreaOpacity);
	},

	redrawArea(drawArea, withTransition?: boolean) {
		const $$ = this;
		const {orgAreaOpacity} = $$.state;

		return [
			(withTransition ? $$.$el.area.transition(getRandom()) : $$.$el.area)
				.attr("d", drawArea)
				.style("fill", $$.updateAreaColor.bind($$))
				.style("opacity", d => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity))
		];
	},

	/**
	 * Generate area path data
	 * @param {object} areaIndices Indices
	 * @param {boolean} isSub Weather is sub axis
	 * @returns {Function}
	 * @private
	 */
	generateDrawArea(areaIndices, isSub?: boolean): (d) => string {
		const $$ = this;
		const {config} = $$;
		const lineConnectNull = config.line_connectNull;
		const isRotated = config.axis_rotated;

		const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
		const yScale = $$.getYScaleById.bind($$);

		const xValue = d => (isSub ? $$.subxx : $$.xx).call($$, d);
		const value0 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[0][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getAreaRangeData(d, "high") : 0
			));
		const value1 = (d, i) => ($$.isGrouped(d.id) ?
			getPoints(d, i)[1][1] :
			yScale(d.id, isSub)(
				$$.isAreaRangeType(d) ?
					$$.getAreaRangeData(d, "low") : d.value
			));

		return d => {
			let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
			let x0 = 0;
			let y0 = 0;
			let path;

			if ($$.isAreaType(d)) {
				let area = d3Area();

				area = isRotated ?
					area.y(xValue)
						.x0(value0)
						.x1(value1) :
					area.x(xValue)
						// @ts-ignore
						.y0(config.area_above ? 0 : value0)
						.y1(value1);

				if (!lineConnectNull) {
					area = area.defined(d => $$.getBaseValue(d) !== null);
				}

				if ($$.isStepType(d)) {
					values = $$.convertValuesToStep(values);
				}

				path = area.curve($$.getCurve(d))(values);
			} else {
				if (values[0]) {
					x0 = $$.scale.x(values[0].x);
					y0 = $$.getYScaleById(d.id)(values[0].value);
				}

				path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
			}

			return path || "M 0 0";
		};
	},

	generateGetAreaPoints(areaIndices, isSub?: boolean): Function {
		// partial duplication of generateGetBarPoints
		const $$ = this;
		const {config} = $$;
		const x = $$.getShapeX(0, areaIndices, !!isSub);
		const y = $$.getShapeY(!!isSub);
		const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return function(d, i) {
			const y0 = yScale(d.id, isSub)(0);
			const offset = areaOffset(d, i) || y0; // offset is for stacked area chart
			const posX = x(d);
			let posY = y(d);

			// fix posY not to overflow opposite quadrant
			if (config.axis_rotated && (
				(d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY)
			)) {
				posY = y0;
			}

			// 1 point that marks the area position
			return [
				[posX, offset],
				[posX, posY - (y0 - offset)],
				[posX, posY - (y0 - offset)], // needed for compatibility
				[posX, offset] // needed for compatibility
			];
		};
	},

	isWithinStep(that, y: number): boolean {
		return Math.abs(y - d3Mouse(that)[1]) < 30;
	},

	shouldDrawPointsForLine(d): boolean {
		const linePoint = this.config.line_point;

		return linePoint === true ||
			(isArray(linePoint) && linePoint.indexOf(d.id) !== -1);
	},
};
