/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {line as d3Line} from "d3-shape";
import {$COMMON, $LINE} from "../../config/classes";
import {
	getPointer,
	getRandom,
	isArray,
	isDefined,
	isUndefined,
	isValue,
	parseDate
} from "../../module/util";
import type {IDataRow} from "../data/IData";
import {getScale} from "../internals/scale";

/**
 * Get stroke dasharray style value
 * @param {number} start Start position in path length
 * @param {number} end End position in path length
 * @param {Array} pattern Dash array pattern
 * @param {boolean} isLastX Weather is last x tick
 * @returns {object} Stroke dasharray style value and its length
 * @private
 */
function getStrokeDashArray(start: number, end: number, pattern: [number, number],
	isLastX = false): {dash: string, length: number} {
	const dash = start ? [start, 0] : pattern;

	for (let i = start ? start : pattern.reduce((a, c) => a + c); i <= end;) {
		pattern.forEach(v => {
			if (i + v <= end) {
				dash.push(v);
			}

			i += v;
		});
	}

	// make sure to have even length
	dash.length % 2 !== 0 && dash.push(isLastX ? pattern[1] : 0);

	return {
		dash: dash.join(" "),
		length: dash.reduce((a, b) => a + b, 0)
	};
}

/**
 * Get regions data
 * @param {Array} d Data object
 * @param {object} _regions regions to be set
 * @param {boolean} isTimeSeries whether is time series
 * @returns {object} Regions data
 * @private
 */
function getRegions(d, _regions, isTimeSeries) {
	const $$ = this;
	const regions: {start: number | string, end: number | string, style: string}[] = [];
	const dasharray = "2 2"; // default value

	// Check start/end of regions
	if (isDefined(_regions)) {
		const getValue = (v: Date | any, def: number | Date): Date | any => (
			isUndefined(v) ? def : (isTimeSeries ? parseDate.call($$, v) : v)
		);

		for (let i = 0, reg; (reg = _regions[i]); i++) {
			const start = getValue(reg.start, d[0].x);
			const end = getValue(reg.end, d[d.length - 1].x);
			const style = reg.style || {dasharray};

			regions[i] = {start, end, style};
		}
	}

	return regions;
}

export default {
	initLine(): void {
		const {$el} = this;

		$el.line = $el.main.select(`.${$COMMON.chart}`).append("g")
			.attr("class", $LINE.chartLines)
			.call(this.setCssRule(false, `.${$LINE.chartLines}`, ["pointer-events:none"]));
	},

	updateTargetsForLine(t): void {
		const $$ = this;
		const {$el: {area, line, main}} = $$;
		const classChartLine = $$.getChartClass("Line");
		const classLines = $$.getClass("lines", true);
		const classFocus = $$.classFocus.bind($$);

		if (!line) {
			$$.initLine();
		}

		const targets = t.filter(d => !($$.isScatterType(d) || $$.isBubbleType(d)));

		const mainLineUpdate = main.select(`.${$LINE.chartLines}`)
			.selectAll(`.${$LINE.chartLine}`)
			.data(targets)
			.attr("class", d => classChartLine(d) + classFocus(d));

		const mainLineEnter = mainLineUpdate.enter().append("g")
			.attr("class", classChartLine)
			.style("opacity", "0")
			.style("pointer-events", $$.getStylePropValue("none"));

		// Lines for each data
		mainLineEnter.append("g")
			.attr("class", classLines);

		// Areas
		if ($$.hasTypeOf("Area")) {
			const mainLine = (
				!area && mainLineEnter.empty() ? mainLineUpdate : mainLineEnter
			).filter($$.isAreaType.bind($$));

			$$.initArea(mainLine);
		}

		$$.updateTargetForCircle(targets, mainLineEnter);
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateLine(withTransition: boolean, isSub = false): void {
		const $$ = this;
		const {format: {extraLineClasses}, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;

		const line = $root.main
			.selectAll(`.${$LINE.lines}`)
			.selectAll(`.${$LINE.line}`)
			.data($$.lineData.bind($$));

		$T(line.exit(), withTransition)
			.style("opacity", "0")
			.remove();

		$root.line = line.enter()
			.append("path")
			.attr("class", d => `${$$.getClass("line", true)(d)} ${extraLineClasses(d) || ""}`)
			.style("stroke", $$.color)
			.merge(line)
			.style("opacity", $$.initialOpacity.bind($$))
			.attr("transform", null);
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 * @private
	 */
	redrawLine(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;
		const {$el, $T} = $$;
		const {line} = isSub ? $el.subchart : $el;

		return [
			$T(line, withTransition, getRandom())
				.attr("d", drawFn)
				.style("stroke", this.color)
				.style("opacity", null)
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
		return isRotatedStepType ?
			context => {
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
			} :
			$$.getInterpolate(d);
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
			$$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.getBaseValue(d))
		);

		let line = d3Line();

		line = isRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);

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
					path = $$.lineWithRegions(values, scale.zoom || x, y, regions);
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

	/**
	 * Set regions dasharray and get path
	 * @param {Array} d Data object
	 * @param {Function} x x scale function
	 * @param {Function} y y scale function
	 * @param {object} _regions regions to be set
	 * @returns {stirng} Path string
	 * @private
	 */
	lineWithRegions(d: IDataRow[], x, y, _regions): string {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const isTimeSeries = $$.axis.isTimeSeries();
		const dasharray = "2 2"; // default value
		const regions = getRegions.bind($$)(d, _regions, isTimeSeries);

		// when contains null data, can't apply style dashed
		const hasNullDataValue = $$.hasNullDataValue(d);

		let xp;
		let yp;
		let diff;
		let diffx2;

		// Set scales
		const xValue = isRotated ? dt => y(dt.value) : dt => x(dt.x);
		const yValue = isRotated ? dt => x(dt.x) : dt => y(dt.value);

		// Define svg generator function for region
		const generateM = points =>
			`M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;
		const sWithRegion = isTimeSeries ?
			(d0, d1, k, timeseriesDiff) => {
				const x0 = d0.x.getTime();
				const xDiff = d1.x - d0.x;
				const xv0 = new Date(x0 + xDiff * k);
				const xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));

				const points = isRotated ?
					[[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] :
					[[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];

				return generateM(points);
			} :
			(d0, d1, k, otherDiff) => {
				const x0 = x(d1.x, !isRotated);
				const y0 = y(d1.value, isRotated);

				const gap = k + otherDiff;
				const xValue = x(xp(k), !isRotated);
				const yValue = y(yp(k), isRotated);

				let xDiff = x(xp(gap), !isRotated);
				let yDiff = y(yp(gap), isRotated);

				// fix diff values not to overflow
				if (xDiff > x0) {
					xDiff = x0;
				}

				if (d0.value > d1.value && (isRotated ? yDiff < y0 : yDiff > y0)) {
					yDiff = y0;
				}

				const points = [
					[xValue, yValue],
					[xDiff, yDiff]
				];

				isRotated && points.forEach(v => v.reverse());

				return generateM(points);
			};

		// Generate
		const axisType = {x: $$.axis.getAxisType("x"), y: $$.axis.getAxisType("y")};
		let path = "";

		// clone the line path to be used to get length value
		const target = $$.$el.line.filter(({id}) => id === d[0].id);
		const tempNode = target.clone().style("display", "none");
		const getLength = (node, path) => node.attr("d", path).node().getTotalLength();
		const dashArray = {
			dash: <string[]>[],
			lastLength: 0
		};
		let isLastX = false;

		for (let i = 0, data; (data = d[i]); i++) {
			const prevData = d[i - 1];
			const hasPrevData = prevData && isValue(prevData.value);
			let style = $$.isWithinRegions(data.x, regions);

			// https://github.com/naver/billboard.js/issues/1172
			if (!isValue(data.value)) {
				continue;
			}

			// Draw as normal
			if (isUndefined(regions) || !style || !hasPrevData) {
				path += `${i && hasPrevData ? "L" : "M"}${xValue(data)},${yValue(data)}`;
			} else if (hasPrevData) {
				style = (style?.dasharray || dasharray).split(" ").map(Number);

				// Draw with region // TODO: Fix for horizotal charts
				xp = getScale(axisType.x, prevData.x, data.x);
				yp = getScale(axisType.y, prevData.value, data.value);

				// when it contains null data, dash can't be applied with style
				if (hasNullDataValue) {
					const dx = x(data.x) - x(prevData.x);
					const dy = y(data.value) - y(prevData.value);
					const dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

					diff = style[0] / dd; // dash
					diffx2 = diff * style[1]; // gap

					for (let j = diff; j <= 1; j += diffx2) {
						path += sWithRegion(prevData, data, j, diff);

						// to make sure correct line drawing
						if (j + diffx2 >= 1) {
							path += sWithRegion(prevData, data, 1, 0);
						}
					}
				} else {
					let points = <number[][]>[];
					isLastX = data.x === d[d.length - 1].x;

					if (isTimeSeries) {
						const x0 = +prevData.x;
						const xv0 = new Date(x0);
						const xv1 = new Date(x0 + (+data.x - x0));

						points = [
							[x(xv0), y(yp(0))], // M
							[x(xv1), y(yp(1))] // L
						];
					} else {
						points = [
							[x(xp(0)), y(yp(0))], // M
							[x(xp(1)), y(yp(1))] // L
						];
					}

					isRotated && points.forEach(v => v.reverse());

					const startLength = getLength(tempNode, path);
					const endLength = getLength(tempNode, path += `L${points[1].join(",")}`);

					const strokeDashArray = getStrokeDashArray(
						startLength - dashArray.lastLength,
						endLength - dashArray.lastLength,
						style,
						isLastX
					);

					dashArray.lastLength += strokeDashArray.length;
					dashArray.dash.push(strokeDashArray.dash);
				}
			}
		}

		if (dashArray.dash.length) {
			// if not last x tick, then should draw rest of path that is not drawed yet
			!isLastX && dashArray.dash.push(getLength(tempNode, path));

			tempNode.remove();
			target.attr("stroke-dasharray", dashArray.dash.join(" "));
		}

		return path;
	},

	isWithinRegions(withinX, withinRegions): boolean {
		for (let i = 0, reg; (reg = withinRegions[i]); i++) {
			if (reg.start < withinX && withinX <= reg.end) {
				return reg.style;
			}
		}

		return false;
	},

	isWithinStep(that, y: number): boolean {
		return Math.abs(y - getPointer(this.state.event, that)[1]) < 30;
	},

	shouldDrawPointsForLine(d): boolean {
		const linePoint = this.config.line_point;

		return linePoint === true ||
			(isArray(linePoint) && linePoint.indexOf(d.id) !== -1);
	}
};
