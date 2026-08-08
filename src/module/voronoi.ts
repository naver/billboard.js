/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * Bounded Voronoi cells, computed directly by half-plane clipping instead of
 * going through a Delaunay triangulation.
 *
 * A cell is the set of points closer to its site than to any other site, which
 * is exactly the intersection of the half-planes bounded by the perpendicular
 * bisectors between that site and every other one. Starting from the clip
 * rectangle and clipping it against each bisector (Sutherland-Hodgman) yields
 * the same polygons d3-delaunay's `voronoi().cellPolygon()` returns, without
 * the triangulation payload.
 *
 * The trade-off is O(n²) rather than O(n log n). That is the right trade for
 * the label-placement use case, which runs on tens to hundreds of points.
 *
 * Parity with d3-delaunay is asserted by test/module/voronoi-parity-spec.ts.
 */
type Point = [number, number];

// distance below which two sites are treated as coincident
const EPSILON = 1e-9;

/**
 * Clip a convex polygon by the half-plane of points at least as close to `a` as
 * to `b`, i.e. the side of the perpendicular bisector of `ab` that contains `a`.
 * @param {Array} polygon Convex polygon as an open ring of [x, y]
 * @param {Array} a Site kept by the half-plane
 * @param {Array} b Opposing site
 * @returns {Array} Clipped polygon, empty when fully outside
 * @private
 */
function clipByBisector(polygon: Point[], a: Point, b: Point): Point[] {
	const dx = b[0] - a[0];
	const dy = b[1] - a[1];

	// bisector as dx*x + dy*y = c, keeping the side where the expression is below c
	const c = (dx * (a[0] + b[0]) + dy * (a[1] + b[1])) / 2;
	const output: Point[] = [];
	const n = polygon.length;

	let prev = polygon[n - 1];
	let prevDist = dx * prev[0] + dy * prev[1] - c;

	for (let i = 0; i < n; i++) {
		const curr = polygon[i];
		const currDist = dx * curr[0] + dy * curr[1] - c;

		// the edge straddles the bisector: emit the crossing point
		if ((prevDist > 0) !== (currDist > 0)) {
			const t = prevDist / (prevDist - currDist);

			output.push([
				prev[0] + t * (curr[0] - prev[0]),
				prev[1] + t * (curr[1] - prev[1])
			]);
		}

		if (currDist <= 0) {
			output.push(curr);
		}

		prev = curr;
		prevDist = currDist;
	}

	return output;
}

/**
 * Compute bounded Voronoi cells for the given sites.
 *
 * Cells are returned in site order, closed (first vertex repeated last) as
 * d3-delaunay does. A site yields `null` when it has no cell: it lies outside
 * the bounds, or it coincides with an earlier site.
 * @param {Array} points Sites as [x, y]
 * @param {Array} bounds Clip extent as [xmin, ymin, xmax, ymax]
 * @returns {Array} Cell polygons in site order
 * @private
 */
export function voronoiCells(points: Point[], bounds: number[]): (Point[] | null)[] {
	const [x0, y0, x1, y1] = [
		Math.min(bounds[0], bounds[2]),
		Math.min(bounds[1], bounds[3]),
		Math.max(bounds[0], bounds[2]),
		Math.max(bounds[1], bounds[3])
	];
	const rect: Point[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
	const n = points.length;

	return points.map((site, i) => {
		let cell = rect;

		for (let j = 0; j < n && cell.length > 2; j++) {
			if (j === i) {
				continue;
			}

			const other = points[j];

			if (
				Math.abs(other[0] - site[0]) < EPSILON &&
				Math.abs(other[1] - site[1]) < EPSILON
			) {
				// coincident sites: the first one keeps the cell, as in d3-delaunay
				if (j < i) {
					return null;
				}

				continue;
			}

			cell = clipByBisector(cell, site, other);
		}

		return cell.length > 2 ? [...cell, cell[0]] as Point[] : null;
	});
}
