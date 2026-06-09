/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isArray, isNumber, isObject} from "../../../module/util";
import type {IOffset} from "../IShape";

/**
 * Parsed candlestick OHLC data.
 * @private
 */
interface ICandlestickData {
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
	_isUp?: boolean;
}

export default {
	/**
	 * Generate shape drawing points
	 * @param {object} indices Indice data
	 * @param {boolean} isSub Subchart draw
	 * @returns {function}
	 */
	generateGetCandlestickPoints(indices, isSub = false): (d, i) => number[][] {
		const $$ = this;
		const axis = isSub ? $$.axis.subX : $$.axis.x;
		const targetsNum = $$.getIndicesMax(indices) + 1;
		const barW: IOffset = $$.getBarW("candlestick", axis, targetsNum);
		const x = $$.getShapeX(barW, indices, !!isSub);
		const y = $$.getShapeY(!!isSub);
		const shapeOffset = $$.getShapeOffset($$.isCandlestickType, indices, !!isSub);
		const yScale = $$.getYScaleById.bind($$);

		return (d, i) => {
			const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
			const offset = shapeOffset(d, i) || y0; // offset is for stacked bar chart
			const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
			const value = $$.getCandlestickData(d);
			let points;

			if (value && isNumber(value.open) && isNumber(value.close)) {
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
				const offsetDelta = y0 - offset;

				posY.start -= offsetDelta;
				posY.end -= offsetDelta;
				posLine.high -= offsetDelta;
				posLine.low -= offsetDelta;

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
