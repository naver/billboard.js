/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.18.0-nightly-20260331005932
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { Delaunay } from 'd3-delaunay';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
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

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
const isDefined = (v) => typeof v !== "undefined";
const isObjectType = (v) => typeof v === "object";

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
        }
        else if (!key) {
            return target;
        }
        return undefined;
    };
    Object.keys(thisConfig).forEach(key => {
        target = config;
        keys = key.split("_");
        read = find();
        if (isDefined(read)) {
            thisConfig[key] = read;
        }
    });
    // only should run in the ChartInternal context
    if (this.api) {
        this.state.orgConfig = config;
    }
}

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
class Plugin {
    $$;
    options;
    config;
    static version = "3.18.0-nightly-20260331005932";
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
    $beforeInit() { }
    /**
     * Lifecycle hook for 'init' phase.
     * @private
     */
    $init() { }
    /**
     * Lifecycle hook for 'afterInit' phase.
     * @private
     */
    $afterInit() { }
    /**
     * Lifecycle hook for 'redraw' phase.
     * @private
     */
    $redraw() { }
    /**
     * Lifecycle hook for 'willDestroy' phase.
     * @private
     */
    $willDestroy() {
        Object.keys(this).forEach(key => {
            this[key] = null;
            delete this[key];
        });
    }
}

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
class Options {
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
            selector: undefined,
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
class TextOverlap extends Plugin {
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
        !text.empty() && this.preventLabelOverlap(text);
    }
    /**
     * Generates the voronoi layout for data labels
     * @param {Array} points Indices values
     * @returns {object} Voronoi layout points and corresponding Data points
     * @private
     */
    generateVoronoi(points) {
        const { $$ } = this;
        const { scale } = $$;
        const [min, max] = ["x", "y"].map(v => scale[v].domain());
        [min[1], max[0]] = [max[0], min[1]];
        return Delaunay
            .from(points)
            .voronoi([
            ...min,
            ...max
        ]); // bounds = [xmin, ymin, xmax, ymax], default value: [0, 0, 960, 500]
    }
    /**
     * Set text label's position to preventg overlap.
     * @param {d3Selection} text target text selection
     * @private
     */
    preventLabelOverlap(text) {
        const { extent, area } = this.config;
        const points = text.data().map(v => [v.index, v.value]);
        const voronoi = this.generateVoronoi(points);
        let i = 0;
        text.each(function () {
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

export { TextOverlap as default };
