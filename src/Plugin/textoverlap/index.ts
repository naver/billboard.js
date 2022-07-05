/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {d3Selection} from "billboard.js/types/types";
import {Delaunay as d3Delaunay} from "d3-delaunay";
import {
	polygonCentroid as d3PolygonCentroid,
	polygonArea as d3PolygonArea
} from "d3-polygon";
import {loadConfig} from "../../config/config";
import Plugin from "../Plugin";
import Options from "./Options";

/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Appropriate and works for axis based chart.
 * - **Required modules:**
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-delaunay](https://github.com/d3/d3-delaunay)
 * @class plugin-textoverlap
 * @requires d3-polygon
 * @requires d3-delaunay
 * @param {object} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlap}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-textoverlap.js"></script>
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
 *	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */
export default class TextOverlap extends Plugin {
	private config;

	constructor(options?: Options) {
		super(options);
		this.config = new Options();

		return this;
	}

	$init(): void {
		loadConfig.call(this, this.options);
	}

	$redraw(): void {
		const {$$: {$el}, config: {selector}} = this;
		const text = selector ? $el.main.selectAll(selector) : $el.text;

		!text.empty() && this.preventLabelOverlap(text);
	}

	/**
	 * Generates the voronoi layout for data labels
	 * @param {Array} points Indices values
	 * @returns {object} Voronoi layout points and corresponding Data points
	 * @private
	 */
	generateVoronoi(points: [number, number][]) {
		const {$$} = this;
		const {scale} = $$;
		const [min, max] = ["x", "y"].map(v => scale[v].domain());

		[min[1], max[0]] = [max[0], min[1]];

		return d3Delaunay
			.from(points)
			.voronoi([
				...min as [number, number],
				...max as [number, number]
			]); // bounds = [xmin, ymin, xmax, ymax], default value: [0, 0, 960, 500]
	}

	/**
	 * Set text label's position to preventg overlap.
	 * @param {d3Selection} text target text selection
	 * @private
	 */
	preventLabelOverlap(text: d3Selection): void {
		const {extent, area} = this.config;
		const points = text.data().map(v => [v.index, v.value]) as [number, number][];
		const voronoi = this.generateVoronoi(points);
		let i = 0;

		text.each(function() {
			const cell = voronoi.cellPolygon(i);

			if (cell && this) {
				const [x, y] = points[i];
				// @ts-ignore wrong type definiton for d3PolygonCentroid
				const [cx, cy] = d3PolygonCentroid(cell);

				// @ts-ignore wrong type definiton for d3PolygonArea
				const polygonArea = Math.abs(d3PolygonArea(cell));

				const angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);
				const xTranslate = extent * (angle === 0 ? 1 : -1);
				const yTranslate = angle === -1 ? -extent : extent + 5;

				const txtAnchor = Math.abs(angle) === 1 ?
					"middle" : (angle === 0 ? "start" : "end");

				this.style.display = polygonArea < area ? "none" : "";
				this.setAttribute("text-anchor", txtAnchor);
				this.setAttribute("dy", `0.${angle === 1 ? 71 : 35}em`);
				this.setAttribute("transform", `translate(${xTranslate}, ${yTranslate})`);
			}

			i++;
		});
	}
}
