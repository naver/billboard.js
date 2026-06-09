/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

export type RenderPoint = [number, number];
export type RenderRect = {x: number, y: number, w: number, h: number};
export type CandlestickGeometry = {body: RenderRect, wickStart: RenderPoint, wickEnd: RenderPoint};

/**
 * Convert shared shape point coordinates into renderer coordinates.
 * Shared geometry keeps the x-index coordinate first and value coordinate second.
 * Rotated axes swap those on screen.
 * @param {object} $$ ChartInternal instance
 * @param {Array} point Shared shape point
 * @returns {Array} Render x/y point
 * @private
 */
export function getRenderPoint($$, point: number[]): RenderPoint {
	return $$.config.axis_rotated ? [point[1], point[0]] : [point[0], point[1]];
}

/**
 * Get a render rectangle from shared shape points.
 * @param {object} $$ ChartInternal instance
 * @param {Array} points Shared shape points
 * @param {number} minSize Minimum rendered width/height
 * @returns {object} Render rectangle
 * @private
 */
export function getRenderRect($$, points: number[][], minSize = 1): RenderRect {
	const renderPoints = points.map(point => getRenderPoint($$, point));
	const xs = renderPoints.map(([x]) => x);
	const ys = renderPoints.map(([, y]) => y);
	const rawX = Math.min(...xs);
	const rawY = Math.min(...ys);
	const rawW = Math.max(...xs) - rawX;
	const rawH = Math.max(...ys) - rawY;
	const w = Math.max(minSize, rawW);
	const h = Math.max(minSize, rawH);

	return {
		x: rawX - ((w - rawW) / 2),
		y: rawY - ((h - rawH) / 2),
		w,
		h
	};
}

/**
 * Get renderer coordinates for a data point.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {object} Render x/y point
 * @private
 */
export function getRenderDataPoint($$, d): {x: number, y: number} {
	const value = $$.isGrouped?.(d.id) && $$.circleY ?
		$$.circleY(d, d.index) :
		$$.getYScaleById(d.id)($$.getBaseValue(d));
	const index = $$.xx(d) ?? NaN;

	return $$.config.axis_rotated ? {x: value, y: index} : {x: index, y: value};
}

/**
 * Get point coordinates from shared shape position accessors.
 * @param {object} pos Shape position accessors
 * @param {object} d Data row
 * @param {number} i Data index
 * @returns {object} Render x/y point
 * @private
 */
export function getShapePoint(pos, d, i: number): {x: number, y: number} {
	return {
		x: pos.cx(d, i),
		y: pos.cy(d, i)
	};
}

/**
 * Get candlestick body and wick coordinates from shared points.
 * @param {object} $$ ChartInternal instance
 * @param {Array} points Shared candlestick points
 * @returns {object} Candlestick render geometry
 * @private
 */
export function getCandlestickGeometry($$, points: number[][]): CandlestickGeometry {
	return {
		body: getRenderRect($$, [points[0], points[1]]),
		wickStart: getRenderPoint($$, [points[2][0], points[2][1]]),
		wickEnd: getRenderPoint($$, [points[2][0], points[2][2]])
	};
}

/**
 * Get treemap node rectangle.
 * @param {object} $$ ChartInternal instance
 * @param {object} node Treemap hierarchy node
 * @param {object} root Root hierarchy node
 * @param {boolean} clamp Whether negative dimensions should be clamped to zero
 * @returns {object} Treemap render rectangle
 * @private
 */
export function getTreemapNodeRect($$, node, root?, clamp = false): RenderRect {
	if (node === root) {
		return {
			x: 0,
			y: 0,
			w: $$.state.width,
			h: 0
		};
	}

	const {scale: {x, y}} = $$;
	const left = x(node.x0);
	const top = y(node.y0);
	const w = x(node.x1) - left;
	const h = y(node.y1) - top;

	return {
		x: left,
		y: top,
		w: clamp ? Math.max(0, w) : w,
		h: clamp ? Math.max(0, h) : h
	};
}

/**
 * Get treemap label text.
 * @param {object} $$ ChartInternal instance
 * @param {object} data Treemap node data
 * @param {number} width Tile width
 * @param {number} height Tile height
 * @returns {string|null} Label text
 * @private
 */
export function getTreemapLabelText($$, data, width: number, height: number): string | null {
	const {config} = $$;
	const {id, value, ratio = 0} = data;
	const format = config.treemap_label_format;
	const text = typeof format === "function" ?
		format.bind($$.api)(value, ratio, id, {width, height}) :
		`${id}\n${(ratio * 100).toFixed(2)}%`;

	return text === null || text === undefined ? null : String(text);
}
