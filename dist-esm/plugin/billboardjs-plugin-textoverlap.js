/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3-nightly-20260808004624
 * @requires billboard.js
 * @summary billboard.js plugin
*/
//#region src/module/polygon.ts
/**
* Compute the signed area of a polygon using the Shoelace formula.
* @param {Array} polygon Array of [x, y] coordinates
* @returns {number} Signed area of the polygon
* @see https://en.wikipedia.org/wiki/Shoelace_formula
*/
function polygonArea(polygon) {
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
function polygonCentroid(polygon) {
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
//#endregion
//#region src/module/voronoi.ts
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
function clipByBisector(polygon, a, b) {
	const dx = b[0] - a[0];
	const dy = b[1] - a[1];
	const c = (dx * (a[0] + b[0]) + dy * (a[1] + b[1])) / 2;
	const output = [];
	const n = polygon.length;
	let prev = polygon[n - 1];
	let prevDist = dx * prev[0] + dy * prev[1] - c;
	for (let i = 0; i < n; i++) {
		const curr = polygon[i];
		const currDist = dx * curr[0] + dy * curr[1] - c;
		if (prevDist > 0 !== currDist > 0) {
			const t = prevDist / (prevDist - currDist);
			output.push([prev[0] + t * (curr[0] - prev[0]), prev[1] + t * (curr[1] - prev[1])]);
		}
		if (currDist <= 0) output.push(curr);
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
function voronoiCells(points, bounds) {
	const [x0, y0, x1, y1] = [
		Math.min(bounds[0], bounds[2]),
		Math.min(bounds[1], bounds[3]),
		Math.max(bounds[0], bounds[2]),
		Math.max(bounds[1], bounds[3])
	];
	const rect = [
		[x0, y0],
		[x1, y0],
		[x1, y1],
		[x0, y1]
	];
	const n = points.length;
	return points.map((site, i) => {
		let cell = rect;
		for (let j = 0; j < n && cell.length > 2; j++) {
			if (j === i) continue;
			const other = points[j];
			if (Math.abs(other[0] - site[0]) < EPSILON && Math.abs(other[1] - site[1]) < EPSILON) {
				if (j < i) return null;
				continue;
			}
			cell = clipByBisector(cell, site, other);
		}
		return cell.length > 2 ? [...cell, cell[0]] : null;
	});
}
//#endregion
//#region src/module/util/type-checks.ts
const isDefined = (v) => typeof v !== "undefined";
const isObjectType = (v) => typeof v === "object";
//#endregion
//#region src/config/config.ts
/**
* Load configuration option
* @param {object} config User's generation config value
* @private
*/
function loadConfig(config) {
	const thisConfig = this.config;
	let target;
	let keys;
	let read;
	const find = () => {
		const key = keys.shift();
		if (key && target && isObjectType(target) && key in target) {
			target = target[key];
			return find();
		} else if (!key) return target;
	};
	Object.keys(thisConfig).forEach((key) => {
		target = config;
		keys = key.split("_");
		read = find();
		if (isDefined(read)) thisConfig[key] = read;
	});
	if (this.api) this.state.orgConfig = config;
}
//#endregion
//#region src/Plugin/Plugin.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Base class to generate billboard.js plugin
* @class Plugin
*/
/**
* Version info string for plugin
* @name version
* @static
* @memberof Plugin
* @type {string}
* @example
*   bb.plugin.stanford.version;  // ex) 1.9.0
*/
var Plugin = class {
	$$;
	options;
	config;
	static version = "4.0.3-nightly-20260808004624";
	/**
	* Constructor
	* @param {Any} options config option object
	* @private
	*/
	constructor(options = {}) {
		this.options = options;
	}
	/**
	* Load plugin config from options
	* @private
	*/
	loadConfig() {
		loadConfig.call(this, this.options);
	}
	/**
	* Lifecycle hook for 'beforeInit' phase.
	* @private
	*/
	$beforeInit() {}
	/**
	* Lifecycle hook for 'init' phase.
	* @private
	*/
	$init() {}
	/**
	* Lifecycle hook for 'afterInit' phase.
	* @private
	*/
	$afterInit() {}
	/**
	* Lifecycle hook for 'redraw' phase.
	* @private
	*/
	$redraw() {}
	/**
	* Lifecycle hook for 'willDestroy' phase.
	* @private
	*/
	$willDestroy() {
		Object.keys(this).forEach((key) => {
			this[key] = null;
			delete this[key];
		});
	}
};
//#endregion
//#region src/Plugin/textoverlap/Options.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* TextOverlap plugin option class
* @class TextOverlapOptions
* @param {Options} options TextOverlap plugin options
* @augments Plugin
* @returns {TextOverlapOptions}
* @private
*/
var Options = class {
	constructor() {
		return {
			/**
			* Selector string for target text nodes within chart element.
			* - **NOTE:** If no value is given, defaults to data label text elements.
			* @name selector
			* @memberof plugin-textoverlap
			* @type {string}
			* @default undefined
			* @example
			*  // selector for data label text nodes
			* selector: ".bb-texts text"
			*/
			selector: void 0,
			/**
			* Extent of label overlap prevention.
			* @name extent
			* @memberof plugin-textoverlap
			* @type {number}
			* @default 1
			* @example
			* 	extent: 1
			*/
			extent: 1,
			/**
			* Minimum area needed to show a data label.
			* @name area
			* @memberof plugin-textoverlap
			* @type {number}
			* @default 0
			* @example
			* 	area: 0
			*/
			area: 0
		};
	}
};
//#endregion
//#region src/Plugin/textoverlap/index.ts
/**
* TextOverlap plugin<br>
* Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
* - **NOTE:**
*   - Plugins aren't built-in. Need to be loaded or imported to be used.
*   - Appropriate and works for axis based chart.
* @class plugin-textoverlap
* @param {object} options TextOverlap plugin options
* @augments Plugin
* @returns {TextOverlap}
* @example
* // Plugin must be loaded before the use.
* <script src="$YOUR_PATH/plugin/billboardjs-plugin-textoverlap.js"><\/script>
*
*  var chart = bb.generate({
*     data: {
*     	  columns: [ ... ]
*     },
*     ...
*     plugins: [
*        new bb.plugin.textoverlap({
*          selector: ".bb-texts text",
*          extent: 8,
*          area: 3
*        })
*     ]
*  });
* @example
* 	import {bb} from "billboard.js";
* import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
*
* bb.generate({
*     plugins: [
*        new TextOverlap({ ... })
*     ]
* })
*/
var TextOverlap = class extends Plugin {
	constructor(options) {
		super(options);
		this.config = new Options();
		return this;
	}
	$init() {
		this.loadConfig();
	}
	$redraw() {
		const { $$: { $el }, config: { selector } } = this;
		const text = selector ? $el.main.selectAll(selector) : $el.text;
		if (!text.empty()) this.preventLabelOverlap(text);
	}
	/**
	* Generates the voronoi layout for data labels
	* @param {Array} points Indices values
	* @returns {Array} Voronoi cell polygons, in point order
	* @private
	*/
	generateVoronoi(points) {
		const { $$ } = this;
		const { scale } = $$;
		const [min, max] = ["x", "y"].map((v) => scale[v].domain());
		[min[1], max[0]] = [max[0], min[1]];
		return voronoiCells(points, [...min, ...max]);
	}
	/**
	* Set text label's position to preventg overlap.
	* @param {d3Selection} text target text selection
	* @private
	*/
	preventLabelOverlap(text) {
		const { extent, area } = this.config;
		const points = text.data().map((v) => [v.index, v.value]);
		const cells = this.generateVoronoi(points);
		let i = 0;
		text.each(function() {
			const cell = cells[i];
			if (cell && this) {
				const [x, y] = points[i];
				const [cx, cy] = polygonCentroid(cell);
				const cellArea = Math.abs(polygonArea(cell));
				const angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);
				const xTranslate = extent * (angle === 0 ? 1 : -1);
				const yTranslate = angle === -1 ? -extent : extent + 5;
				const txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";
				this.style.display = cellArea < area ? "none" : "";
				this.setAttribute("text-anchor", txtAnchor);
				this.setAttribute("dy", `0.${angle === 1 ? 71 : 35}em`);
				this.setAttribute("transform", `translate(${xTranslate}, ${yTranslate})`);
			}
			i++;
		});
	}
};
//#endregion
export { TextOverlap as default };
