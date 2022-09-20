/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$CANDLESTICK, $COMMON} from "../../config/classes";
import {getRandom, isArray, isNumber, isObject} from "../../module/util";
import type {IOffset} from "./shape";

interface ICandlestickData {
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
}

export default {
	initCandlestick(): void {
		const {$el} = this;

		$el.candlestick = $el.main.select(`.${$COMMON.chart}`)
			// should positioned at the beginning of the shape node to not overlap others
			.append("g")
			.attr("class", $CANDLESTICK.chartCandlesticks);
	},

	/**
	 * Update targets by its data
	 * called from: ChartInternal.updateTargets()
	 * @param {Array} targets Filtered target by type
	 * @private
	 */
	updateTargetsForCandlestick(targets): void {
		const $$ = this;
		const {$el} = $$;
		const classChart = $$.getChartClass("Candlestick");
		const classFocus = $$.classFocus.bind($$);

		if (!$el.candlestick) {
			$$.initCandlestick();
		}

		const mainUpdate = $$.$el.main.select(`.${$CANDLESTICK.chartCandlesticks}`)
			.selectAll(`.${$CANDLESTICK.chartCandlestick}`)
			.data(targets)
			.attr("class", d => classChart(d) + classFocus(d));

		mainUpdate.enter().append("g")
			.attr("class", classChart)
			.style("pointer-events", "none");
	},

	/**
	 * Generate/Update elements
	 * @param {boolean} withTransition Transition for exit elements
	 * @param {boolean} isSub Subchart draw
	 * @private
	 */
	updateCandlestick(withTransition: boolean, isSub = false): void {
		const $$ = this;
		const {$el, $T} = $$;
		const $root = isSub ? $el.subchart : $el;
		const classSetter = $$.getClass("candlestick", true);
		const initialOpacity = $$.initialOpacity.bind($$);

		const candlestick = $root.main.selectAll(`.${$CANDLESTICK.chartCandlestick}`)
			.selectAll(`.${$CANDLESTICK.candlestick}`)
			.data($$.labelishData.bind($$));

		$T(candlestick.exit(), withTransition)
			.style("opacity", "0")
			.remove();

		const candlestickEnter = candlestick.enter()
			.filter(d => d.value)
			.append("g")
			.attr("class", classSetter);

		candlestickEnter.append("line");
		candlestickEnter.append("path");

		if (!$root.candlestick) {
			$root.candlestick = {};
		}

		$root.candlestick = candlestick.merge(candlestickEnter)
			.style("opacity", initialOpacity);
	},

	/**
	 * Get draw function
	 * @param {object} indices Indice data
	 * @param {boolean} isSub Subchart draw
	 * @returns {Function}
	 * @private
	 */
	generateDrawCandlestick(indices, isSub) {
		const $$ = this;
		const {config} = $$;
		const getPoints = $$.generateGetCandlestickPoints(indices, isSub);
		const isRotated = config.axis_rotated;
		const downColor = config.candlestick_color_down;

		return (d, i, g) => {
			const points = getPoints(d, i);
			const value = $$.getCandlestickData(d);
			const isUp = value?._isUp;

			// switch points if axis is rotated, not applicable for sub chart
			const indexX = +isRotated;
			const indexY = +!indexX;

			if (g.classed) {
				g.classed($CANDLESTICK[isUp ? "valueUp" : "valueDown"], true);
			}

			const path = isRotated ?
				`H${points[1][1]} V${points[1][0]} H${points[0][1]}` :
				`V${points[1][1]} H${points[1][0]} V${points[0][1]}`;

			g.select("path")
				.attr("d", `M${points[0][indexX]},${points[0][indexY]}${path}z`)
				.style("fill", d => {
					const color = isUp ? $$.color(d) : (
						isObject(downColor) ? downColor[d.id] : downColor
					);

					return color || $$.color(d);
				});

			// set line position
			const line = g.select("line");
			const pos = isRotated ? {
				x1: points[2][1],
				x2: points[2][2],
				y1: points[2][0],
				y2: points[2][0]
			} : {
				x1: points[2][0],
				x2: points[2][0],
				y1: points[2][1],
				y2: points[2][2]
			};

			for (const x in pos) {
				line.attr(x, pos[x]);
			}
		};
	},

	/**
	 * Generate shape drawing points
	 * @param {object} indices Indice data
	 * @param {boolean} isSub Subchart draw
	 * @returns {Function}
	 */
	generateGetCandlestickPoints(indices, isSub = false): (d, i) => number[][] {
		const $$ = this;
		const {config} = $$;

		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const targetsNum = $$.getIndicesMax(indices) + 1;
		const barW: IOffset = $$.getBarW("candlestick", axis, targetsNum);
		const x = $$.getShapeX(barW, indices, !!isSub);
		const y = $$.getShapeY(!!isSub);
		const shapeOffset = $$.getShapeOffset($$.isBarType, indices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = shapeOffset(d, i) || y0; // offset is for stacked bar chart
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const value = $$.getCandlestickData(d);
			let points;

			if (value) {
				const posX = {
					start: x(d),
					end: 0
				};

				posX.end = posX.start + width;

				const posY = {
					start: y(value.open),
					end: y(value.close)
				};
				const posLine = {
					x: posX.start + (width / 2),
					high: y(value.high),
					low: y(value.low)
				};

				// fix posY not to overflow opposite quadrant
				if (config.axis_rotated && (
					(d.value > 0 && posY.start < y0) || (d.value < 0 && y0 < posY.start)
				)) {
					posY.start = y0;
				}

				posY.start -= (y0 - offset);

				points = [
					[posX.start, posY.start],
					[posX.end, posY.end],
					[posLine.x, posLine.low, posLine.high]
				];
			} else {
				points = [[0, 0], [0, 0], [0, 0, 0]];
			}

			return points;
		};
	},

	/**
	 * Redraw function
	 * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
	 * @param {boolean} withTransition With or without transition
	 * @param {boolean} isSub Subchart draw
	 * @returns {Array}
	 */
	redrawCandlestick(drawFn, withTransition?: boolean, isSub = false) {
		const $$ = this;
		const {$el, $T} = $$;
		const {candlestick} = (isSub ? $el.subchart : $el);
		const rand = getRandom(true);

		return [
			candlestick
				.each(function(d, i) {
					const g = $T(d3Select(this), withTransition, rand);

					drawFn(d, i, g);
				})
				.style("opacity", null)
		];
	},

	/**
	 * Get candlestick data as object
	 * @param {object} param Data object
	 * @param {Array|object} param.value Data value
	 * @returns {object|null} Converted data object
	 * @private
	 */
	getCandlestickData({value}): ICandlestickData | null {
		let d;

		if (isArray(value)) {
			const [open, high, low, close, volume = false] = value;

			d = {open, high, low, close};

			if (volume !== false) {
				d.volume = volume;
			}
		} else if (isObject(value)) {
			d = {...value};
		}

		if (d) {
			d._isUp = d.close >= d.open;
		}

		return d || null;
	}
};
