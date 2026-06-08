/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {getCandlestickGeometry, getRenderRect} from "../ChartInternal/shape/core/geometry";
import type {CanvasRect} from "./CanvasPainter";
import {isFiniteCanvasCoordinate} from "./util";

export type CanvasBarGeometry = {points: any, rect: CanvasRect};
export type CanvasCandlestickGeometry = {
	body: CanvasRect,
	points: any,
	wickEnd: number[],
	wickStart: number[]
};

/**
 * Get drawable canvas bar geometry from common SVG shape points.
 * @param {object} $$ ChartInternal instance
 * @param {function} getPoints Shape point resolver
 * @param {object} d Data row
 * @param {number} index Data index
 * @returns {object|null} Drawable bar geometry
 * @private
 */
export function getCanvasBarGeometry($$, getPoints, d, index: number): CanvasBarGeometry | null {
	const points = getPoints(d, index);
	const rect = getRenderRect($$, points);

	return isFiniteCanvasCoordinate(rect.x, rect.y) &&
			isFiniteCanvasCoordinate(rect.x + rect.w, rect.y + rect.h) ?
		{points, rect} :
		null;
}

/**
 * Get drawable canvas candlestick geometry from common SVG shape points.
 * @param {object} $$ ChartInternal instance
 * @param {function} getPoints Shape point resolver
 * @param {object} d Data row
 * @param {number} index Data index
 * @returns {object|null} Drawable candlestick geometry
 * @private
 */
export function getCanvasCandlestickGeometry(
	$$,
	getPoints,
	d,
	index: number
): CanvasCandlestickGeometry | null {
	const points = getPoints(d, index);
	const {body, wickStart, wickEnd} = getCandlestickGeometry($$, points);

	return isFiniteCanvasCoordinate(body.x, body.y) &&
			isFiniteCanvasCoordinate(body.x + body.w, body.y + body.h) &&
			isFiniteCanvasCoordinate(wickStart[0], wickStart[1]) &&
			isFiniteCanvasCoordinate(wickEnd[0], wickEnd[1]) ?
		{body, points, wickStart, wickEnd} :
		null;
}
