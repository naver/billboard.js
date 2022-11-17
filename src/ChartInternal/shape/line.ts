/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {line as d3Line} from "d3-shape";
import {getScale} from "../internals/scale";
import {$COMMON, $LINE} from "../../config/classes";
import {getPointer, getRandom, isArray, isDefined, isUndefined, isValue, parseDate} from "../../module/util";

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
			.style("shape-rendering", d => ($$.isStepType(d) ? "crispEdges" : ""))
			.attr("transform", null);
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 */
	redrawLine(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;
		const {$el, $T} = $$;
		const {line} = (isSub ? $el.subchart : $el);

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

	lineWithRegions(d, x, y, _regions): string {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const isTimeSeries = $$.axis.isTimeSeries();
		const regions: any[] = [];
		const dasharray = "2 2"; // default value

		let xp;
		let yp;
		let diff;
		let diffx2;

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
		const axisType = {x: $$.axis.getAxisType("x"), y: $$.axis.getAxisType("y")};
		let path = "";

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
				try {
					style = style.dasharray.split(" ");
				} catch (e) {
					style = dasharray.split(" ");
				}

				// Draw with region // TODO: Fix for horizotal charts
				xp = getScale(axisType.x, prevData.x, data.x);
				yp = getScale(axisType.y, prevData.value, data.value);

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
	},
};
