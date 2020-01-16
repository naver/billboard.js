/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {voronoi as d3Voronoi} from "d3-voronoi";
import {
	polygonCentroid as d3PolygonCentroid,
	polygonArea as d3PolygonArea
} from "d3-polygon";
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import Plugin from "../Plugin";
import Options from "./Options";

/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-voronoi](https://github.com/d3/d3-voronoi)
 * @class plugin-textoverlap
 * @requires d3-selection
 * @requires d3-polygon
 * @requires d3-voronoi
 * @param {Object} options TextOverlap plugin options
 * @extends Plugin
 * @return {TextOverlap}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *     	  columns: [ ... ]
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.textoverlap({
 *          selector: ".bb-texts text",
 *          extent: 8,
 *          area: 3
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
	constructor(options) {
		super(options);
		this.config = new Options();

		return this;
	}

	$init() {
		const $$ = this.$$;

		$$.loadConfig.bind(this)(this.options);
	}

	$redraw() {
		const text = d3SelectAll(this.config.selector);

		!text.empty() && this.preventLabelOverlap(text);
	}

	/**
	 * Generates the voronoi layout for data labels
	 * @param {Object} data Indices values
	 * @returns {Object} Voronoi layout points and corresponding Data points
	 * @private
	 */
	generateVoronoi(data) {
		const $$ = this.$$;
		const [min, max] = ["x", "y"].map(v => $$[v].domain());

		[min[1], max[0]] = [max[0], min[1]];

		return d3Voronoi()
			.extent([min, max])
			.polygons(data);
	}

	/**
	 * Set text label's position to preventg overlap.
	 * @param {d3Selection} text target text selection
	 * @private
	 */
	preventLabelOverlap(text) {
		const {extent, area} = this.config;
		const cells = this.generateVoronoi(text.data().map(v => [v.x, v.value]));
		let i = 0;

		text.each(function() {
			const cell = cells[i++];

			if (cell && this) {
				const [x, y] = cell.data;
				const [cx, cy] = d3PolygonCentroid(cell);
				const angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2);

				const xTranslate = extent * (angle === 0 ? 1 : -1);
				const yTranslate = angle === -1 ? -extent : extent + 5;

				const txtAnchor = Math.abs(angle) === 1 ?
					"middle" : (angle === 0 ? "start" : "end");

				d3Select(this)
					.attr("display", d3PolygonArea(cell) < area ? "none" : null)
					.attr("text-anchor", txtAnchor)
					.attr("dy", `0.${angle === 1 ? 71 : 35}em`)
					.attr("transform", `translate(${xTranslate}, ${yTranslate})`);
			}
		});
	}
}
