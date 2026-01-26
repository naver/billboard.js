/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

type Point = [number, number];

/**
 * Compute the signed area of a polygon using the Shoelace formula.
 * @param {Array} polygon Array of [x, y] coordinates
 * @returns {number} Signed area of the polygon
 * @see https://en.wikipedia.org/wiki/Shoelace_formula
 */
export function polygonArea(polygon: Point[]): number {
	const n = polygon.length;
	let area = 0;
	let b = polygon[n - 1];

	for (let i = 0; i < n; i++) {
		const a = b;

		b = polygon[i];
		area += a[1] * b[0] - a[0] * b[1];
	}

	return area / 2;
}

/**
 * Compute the centroid of a polygon.
 * @param {Array} polygon Array of [x, y] coordinates
 * @returns {Array} Centroid [x, y] of the polygon
 */
export function polygonCentroid(polygon: Point[]): Point {
	const n = polygon.length;
	let x = 0;
	let y = 0;
	let k = 0;
	let b = polygon[n - 1];

	for (let i = 0; i < n; i++) {
		const a = b;

		b = polygon[i];
		const c = a[0] * b[1] - b[0] * a[1];

		k += c;
		x += (a[0] + b[0]) * c;
		y += (a[1] + b[1]) * c;
	}

	k *= 3;

	return [x / k, y / k];
}
