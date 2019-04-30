/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
function pointInRegion(point, region) { // thanks to: http://bl.ocks.org/bycoffe/5575904
	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	const x = point.x;
	const y = point.value;
	let inside = false;

	for (let i = 0, j = region.length - 1; i < region.length; j = i++) {
		const xi = region[i].x;
		const yi = region[i].y;

		const xj = region[j].x;
		const yj = region[j].y;

		const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

		if (intersect) {
			inside = !inside;
		}
	}

	return inside;
}

function compareEpochs(a, b) {
	if (a.epochs < b.epochs) {
		return -1;
	}

	if (a.epochs > b.epochs) {
		return 1;
	}

	return 0;
}

function getRegionArea(points) { // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
	let area = 0;
	let point1;
	let point2;

	for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
		point1 = points[i];
		point2 = points[j];
		area += point1.x * point2.y;
		area -= point1.y * point2.x;
	}

	area /= 2;

	return area;
}

function getCentroid(points) {
	const area = getRegionArea(points);

	let x = 0;
	let y = 0;
	let f;

	for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
		const point1 = points[i];
		const point2 = points[j];

		f = point1.x * point2.y - point2.x * point1.y;
		x += (point1.x + point2.x) * f;
		y += (point1.y + point2.y) * f;
	}

	f = area * 6;

	return {
		x: x / f,
		y: y / f
	};
}

export {
	compareEpochs,
	getCentroid,
	getRegionArea,
	pointInRegion
};
