/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$LINE} from "../../config/classes";
import {getPointer, getRandom, isArray, isUndefined, isValue} from "../../module/util";
import type {IDataRow} from "../data/IData";
import {getScale} from "../internals/scale";
import {getDataRegionStyle, normalizeDataRegions} from "./core/dataRegion";
import {generateDrawLinePath} from "./core/path";
import {initShapeElement, updateTargetsForShape} from "./shape";

/**
 * Get stroke dasharray style value
 * @param {number} start Start position in path length
 * @param {number} end End position in path length
 * @param {Array} pattern Dash array pattern
 * @param {boolean} isLastX Weather is last x tick
 * @returns {object} Stroke dasharray style value and its length
 * @private
 */
function _getStrokeDashArray(start: number, end: number, pattern: [number, number],
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

export default {
	initLine(): void {
		initShapeElement.call(this, {
			elKey: "line",
			className: $LINE.chartLines,
			cssRules: ["pointer-events:none"]
		});
	},

	updateTargetsForLine(t): void {
		const $$ = this;
		const {$el: {area, main}} = $$;
		const classLines = $$.getClass("lines", true);
		const targets = t.filter(d => !($$.isScatterType(d) || $$.isBubbleType(d)));

		const mainLineEnter = updateTargetsForShape.call($$, targets, {
			type: "Line",
			elKey: "line",
			containerClass: $LINE.chartLines,
			itemClass: $LINE.chartLine,
			initFn: $$.initLine
		});

		// Lines for each data
		mainLineEnter.append("g")
			.attr("class", classLines);

		// Areas
		if ($$.hasTypeOf("Area")) {
			const mainLineUpdate = main.select(`.${$LINE.chartLines}`)
				.selectAll(`.${$LINE.chartLine}`);
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

		if ($$.state.isCanvasMode) {
			return;
		}

		const {format: {extraLineClasses}, $el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;

		const line = $root.main.selectAll(`.${$LINE.lines}`)
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
	 * @param {function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 * @private
	 */
	redrawLine(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;

		if ($$.state.isCanvasMode) {
			return [];
		}

		const {$el, $T} = $$;
		const {line} = isSub ? $el.subchart : $el;

		return [
			$T(line, withTransition, getRandom())
				.attr("d", drawFn)
				.style("stroke", this.color)
				.style("opacity", null)
		];
	},

	generateDrawLine(lineIndices, isSub?: boolean): (d) => string {
		const $$ = this;

		return generateDrawLinePath($$, lineIndices, isSub) as (d) => string;
	},

	/**
	 * Set regions dasharray and get path
	 * @param {Array} d Data object
	 * @param {function} x x scale function
	 * @param {function} y y scale function
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
		const regions = normalizeDataRegions($$, d, _regions);

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

		// empty or all-null series has nothing to draw
		if (!d.length) {
			return path;
		}

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
					let points: number[][];
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

					const strokeDashArray = _getStrokeDashArray(
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
			// if not last x tick, then should draw rest of path that is not drawn yet
			!isLastX && dashArray.dash.push(getLength(tempNode, path));

			target.attr("stroke-dasharray", dashArray.dash.join(" "));
		}

		// make sure the cloned node is removed even when no dash segment was produced
		tempNode.remove();

		return path;
	},

	isWithinRegions(withinX, withinRegions) {
		return getDataRegionStyle(withinX, withinRegions);
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
