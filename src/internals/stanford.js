import {
	min as d3Min,
	max as d3Max
} from "d3-array";
import {interpolateHslLong as d3InterpolateHslLong} from "d3-interpolate";
import {hsl as d3Hsl} from "d3-color";
import {scaleSequentialLog as d3ScaleSequentialLog} from "d3-scale";
import {extend, isFunction, sanitise} from "./util";
import ChartInternal from "./ChartInternal";

function getRegionArea(points) { // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
	let area = 0;
	let point1;
	let point2;

	for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
		point1 = points[i];
		point2 = points[j];
		area += point1.x * point2.y;
		area -= point1.y * point2.x;
	}

	area /= 2;

	return area;
}

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

function getCentroid(points) {
	const area = getRegionArea(points);

	let x = 0;
	let y = 0;
	let f;

	for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
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

extend(ChartInternal.prototype, {
	initStanfordData() {
		const $$ = this;
		const config = $$.config;
		const target = $$.data.targets[0];

		// TODO STANFORD see if (data.js -> orderTargets) can be used instead
		// Make larger values appear on top
		target.values.sort(compareEpochs);

		// Get array of epochs
		const epochs = target.values.map(a => a.epochs);

		target.minEpochs = !isNaN(config.stanford_scaleMin) ? config.stanford_scaleMin : d3Min(epochs);
		target.maxEpochs = !isNaN(config.stanford_scaleMax) ? config.stanford_scaleMax : d3Max(epochs);

		target.colors = isFunction(config.stanford_colors) ?
			config.stanford_colors : d3InterpolateHslLong(d3Hsl(250, 1, 0.5), d3Hsl(0, 1, 0.5));

		target.colorscale = d3ScaleSequentialLog(target.colors)
			.domain([target.minEpochs, target.maxEpochs]);
	},
	getStanfordPointColor(d) {
		const $$ = this;
		const target = $$.data.targets[0];

		return target.colorscale(d.epochs);
	},
	getStanfordTooltipTitle(d) {
		const $$ = this;
		const labelX = $$.axis.getLabelText("x");
		const labelY = $$.axis.getLabelText("y");

		return `
		  <tr><th>${labelX ? sanitise(labelX) : "x"}</th><th class='value'>${d.x}</th></tr>
		  <tr><th>${labelY ? sanitise(labelY) : "y"}</th><th class='value'>${d.value}</th></tr>
		`;
	},
	getStanfordTooltipTitleValues(d) {
		const $$ = this;
		const labelX = $$.axis.getLabelText("x");
		const labelY = $$.axis.getLabelText("y");

		return {labelX, labelY, x: d.x, y: d.value};
	},
	countEpochsInRegion(region) {
		const $$ = this;

		const target = $$.data.targets[0];

		const total = target.values.reduce((accumulator, currentValue) =>
			accumulator + Number(currentValue.epochs), 0);

		const count = target.values.reduce((accumulator, currentValue) => {
			if (pointInRegion(currentValue, region)) {
				return accumulator + Number(currentValue.epochs);
			}

			return accumulator;
		}, 0);

		return {
			value: count,
			percentage: count !== 0 ? (count / total * 100).toFixed(1) : 0
		};
	}
});

export {
	getRegionArea,
	pointInRegion,
	compareEpochs,
	getCentroid
};
