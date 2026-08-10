/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
import {Delaunay} from "d3-delaunay";
import {describe, expect, it} from "vitest";

import {polygonArea, polygonCentroid} from "../../src/module/polygon";
import {voronoiCells} from "../../src/module/voronoi";

/**
 * Golden parity suite: the in-tree half-plane Voronoi must agree with
 * d3-delaunay on the cells the textoverlap plugin consumes. d3-delaunay is kept
 * as a devDependency for exactly this comparison.
 */

type Point = [number, number];

// deterministic LCG so failures are reproducible
function seeded(seed: number) {
	let state = seed;

	return () => {
		state = (state * 1103515245 + 12345) % 2147483648;

		return state / 2147483648;
	};
}

function randomPoints(count: number, seed: number, bounds: number[]): Point[] {
	const rand = seeded(seed);
	const [x0, y0, x1, y1] = bounds;

	return Array.from({length: count}, () => [
		x0 + rand() * (x1 - x0),
		y0 + rand() * (y1 - y0)
	] as Point);
}

// d3-delaunay reaches the cells through circumcenters, so its rings carry two
// artifacts this comparison must see past: float noise on the order of 1e-5,
// and redundant vertices sitting mid-edge on a bisector. Neither changes the
// polygon, and neither is visible to the plugin, which only reads centroid and
// area.
const TOLERANCE = 1e-4;

/**
 * Normalize a cell to an open ring: consistent winding, no near-duplicate and
 * no collinear vertices.
 */
function simplify(cell: Point[] | null): Point[] | null {
	if (!cell) {
		return null;
	}

	const ring: Point[] = [];

	// the ring is closed; drop the repeated vertex and any near-duplicates
	cell.slice(0, -1).forEach(p => {
		const last = ring[ring.length - 1];

		if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) > TOLERANCE) {
			ring.push(p);
		}
	});

	while (
		ring.length > 1 &&
		Math.hypot(ring[0][0] - ring[ring.length - 1][0], ring[0][1] - ring[ring.length - 1][1]) <=
			TOLERANCE
	) {
		ring.pop();
	}

	// drop vertices that lie on the segment between their neighbors
	const pruned: Point[] = [];

	ring.forEach((b, i) => {
		const a = ring[(i - 1 + ring.length) % ring.length];
		const c = ring[(i + 1) % ring.length];
		const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

		// twice the triangle area: a mid-edge vertex contributes none
		if (Math.abs(cross) > TOLERANCE) {
			pruned.push(b);
		}
	});

	if (pruned.length < 3) {
		return null;
	}

	if (polygonArea(pruned) < 0) {
		pruned.reverse();
	}

	return pruned;
}

/**
 * Compare two normalized rings, which may start at any vertex.
 */
function expectSameRing(own: Point[] | null, d3: Point[] | null, label: string) {
	expect(!!own, `${label}: cell presence`).to.be.equal(!!d3);

	if (!own || !d3) {
		return;
	}

	expect(own.length, `${label}: vertex count (${JSON.stringify(own)} vs ${JSON.stringify(d3)})`)
		.to.be.equal(d3.length);

	// align on the d3 vertex nearest our first one
	let offset = 0;
	let best = Infinity;

	d3.forEach((p, i) => {
		const d = Math.hypot(p[0] - own[0][0], p[1] - own[0][1]);

		if (d < best) {
			best = d;
			offset = i;
		}
	});

	own.forEach((p, i) => {
		const q = d3[(offset + i) % d3.length];

		expect(p[0], `${label}: vertex ${i} x`).to.be.closeTo(q[0], TOLERANCE);
		expect(p[1], `${label}: vertex ${i} y`).to.be.closeTo(q[1], TOLERANCE);
	});
}

function d3Cells(points: Point[], bounds: number[]): (Point[] | null)[] {
	const voronoi = Delaunay.from(points).voronoi(bounds as [number, number, number, number]);

	return points.map((_, i) => voronoi.cellPolygon(i) as Point[] | null);
}

function compareCells(points: Point[], bounds: number[], label: string) {
	const own = voronoiCells(points, bounds);
	const d3 = d3Cells(points, bounds);

	expect(own.length, `${label}: cell count`).to.be.equal(d3.length);

	own.forEach((cell, i) => {
		expectSameRing(
			simplify(cell),
			simplify(d3[i]),
			`${label}: cell ${i} of ${JSON.stringify(points[i])}`
		);
	});
}

describe("VORONOI parity with d3-delaunay", () => {
	const BOUNDS = [0, 0, 960, 500];

	describe("random point sets", () => {
		[3, 4, 8, 25, 60].forEach(count => {
			[1, 7, 4242].forEach(seed => {
				it(`${count} points, seed ${seed}`, () => {
					compareCells(
						randomPoints(count, seed, BOUNDS),
						BOUNDS,
						`${count}/${seed}`
					);
				});
			});
		});
	});

	describe("degenerate layouts", () => {
		it("two points", () => {
			compareCells([[100, 100], [800, 400]], BOUNDS, "two points");
		});

		it("collinear points (a Delaunay triangulation degenerate case)", () => {
			compareCells(
				[[100, 250], [300, 250], [500, 250], [700, 250], [900, 250]],
				BOUNDS,
				"collinear"
			);
		});

		it("grid points (many cocircular quadruples)", () => {
			const points: Point[] = [];

			for (let x = 100; x <= 700; x += 200) {
				for (let y = 100; y <= 400; y += 100) {
					points.push([x, y]);
				}
			}

			compareCells(points, BOUNDS, "grid");
		});

		it("points on the bounds edge", () => {
			compareCells(
				[[0, 0], [960, 0], [0, 500], [960, 500], [480, 250]],
				BOUNDS,
				"edges"
			);
		});
	});

	describe("the shape the textoverlap plugin builds", () => {
		// [index, value] pairs clipped to the x/y scale domains
		it("index/value points over a data domain", () => {
			const bounds = [0, 0, 9, 400];
			const points: Point[] = [
				[0, 130], [1, 340], [2, 200], [3, 500], [4, 250],
				[5, 350], [6, 90], [7, 380], [8, 120], [9, 300]
			];

			compareCells(points, bounds, "textoverlap");
		});
	});

	describe("cells the plugin actually reads", () => {
		it("centroid and area match d3-delaunay", () => {
			const points = randomPoints(40, 99, BOUNDS);
			const own = voronoiCells(points, BOUNDS);
			const d3 = d3Cells(points, BOUNDS);

			own.forEach((cell, i) => {
				const other = d3[i];

				expect(!!cell, `cell ${i} presence`).to.be.equal(!!other);

				if (cell && other) {
					const [cx, cy] = polygonCentroid(cell);
					const [dx, dy] = polygonCentroid(other);

					expect(cx, `cell ${i} centroid x`).to.be.closeTo(dx, 1e-3);
					expect(cy, `cell ${i} centroid y`).to.be.closeTo(dy, 1e-3);
					expect(Math.abs(polygonArea(cell)), `cell ${i} area`)
						.to.be.closeTo(Math.abs(polygonArea(other)), 1e-3);
				}
			});
		});

		it("returns null for duplicated sites, as d3-delaunay does", () => {
			const points: Point[] = [[100, 100], [500, 300], [100, 100]];
			const own = voronoiCells(points, BOUNDS);
			const d3 = d3Cells(points, BOUNDS);

			expect(own.map(c => !!c)).to.be.deep.equal(d3.map(c => !!c));
		});
	});
});
