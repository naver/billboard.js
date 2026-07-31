/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {d3Selection} from "../../../types/types";
import {polygonArea, polygonCentroid} from "../../module/polygon";
import Plugin from "../Plugin";
import Options from "./Options";

let d3Delaunay: Promise<typeof import("d3-delaunay").Delaunay> | null = null;

/**
 * Load d3-delaunay only when the plugin actually needs Voronoi layout.
 * @returns {Promise} Delaunay constructor
 * @private
 */
function getDelaunay() {
	return d3Delaunay ?? (
		d3Delaunay = import("d3-delaunay")
			.then(({Delaunay}) => Delaunay)
	);
}

/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Appropriate and works for axis based chart.
 * - **Required modules:**
 *   - [d3-delaunay](https://github.com/d3/d3-delaunay)
 * @class plugin-textoverlap
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
 * 	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */
export default class TextOverlap extends Plugin {
	private redrawId = 0;

	constructor(options?: Options) {
		super(options);
		this.config = new Options();

		return this;
	}

	$init(): void {
		this.loadConfig();
	}

	$redraw(): void {
		const {$$: {$el}, config: {selector}} = this;
		const text = selector ? $el.main.selectAll(selector) : $el.text;
		const redrawId = ++this.redrawId;

		if (!text.empty()) {
			void this.preventLabelOverlap(text, redrawId);
		}
	}

	/**
	 * Generates the voronoi layout for data labels
	 * @param {Array} points Indices values
	 * @returns {object} Voronoi layout points and corresponding Data points
	 * @private
	 */
	async generateVoronoi(points: [number, number][]) {
		const {$$} = this;
		const {scale} = $$;
		const [min, max] = ["x", "y"].map(v => scale[v].domain());
		const Delaunay = await getDelaunay();

		[min[1], max[0]] = [max[0], min[1]];

		return Delaunay
			.from(points)
			.voronoi([
				...min as [number, number],
				...max as [number, number]
			]); // bounds = [xmin, ymin, xmax, ymax], default value: [0, 0, 960, 500]
	}

	/**
	 * Set text label's position to preventg overlap.
	 * @param {d3Selection} text target text selection
	 * @param {number} redrawId Redraw request identifier
	 * @private
	 */
	async preventLabelOverlap(text: d3Selection, redrawId = this.redrawId): Promise<void> {
		const {extent, area} = this.config;
		const points = text.data().map(v => [v.index, v.value]) as [number, number][];
		const voronoi = await this.generateVoronoi(points).catch(() => null);
		let i = 0;

		if (!voronoi || redrawId !== this.redrawId) {
			return;
		}

		text.each(function() {
			const cell = voronoi.cellPolygon(i);

			if (cell && this) {
				const [x, y] = points[i];
				const [cx, cy] = polygonCentroid(cell);
				const cellArea = Math.abs(polygonArea(cell));

				const angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);
				const xTranslate = extent * (angle === 0 ? 1 : -1);
				const yTranslate = angle === -1 ? -extent : extent + 5;

				const txtAnchor = Math.abs(angle) === 1 ?
					"middle" :
					(angle === 0 ? "start" : "end");

				this.style.display = cellArea < area ? "none" : "";
				this.setAttribute("text-anchor", txtAnchor);
				this.setAttribute("dy", `0.${angle === 1 ? 71 : 35}em`);
				this.setAttribute("transform", `translate(${xTranslate}, ${yTranslate})`);
			}

			i++;
		});
	}
}
