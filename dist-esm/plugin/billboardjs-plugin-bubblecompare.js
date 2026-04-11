/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.18.0-nightly-20260411005800
 * @requires billboard.js
 * @summary billboard.js plugin
*/
import { select } from 'd3-selection';

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
    static version = "3.18.0-nightly-20260411005800";
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
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */
class BubbleCompare extends Plugin {
    static version = `0.0.1`;
    $$;
    constructor(options) {
        super(options);
        return this;
    }
    $init() {
        const { $$ } = this;
        $$.findClosest = this.findClosest.bind(this);
        $$.getBubbleR = this.getBubbleR.bind(this);
        $$.pointExpandedR = this.pointExpandedR.bind(this);
    }
    pointExpandedR(d) {
        const baseR = this.getBubbleR(d);
        const { expandScale = 1 } = this.options;
        BubbleCompare.raiseFocusedBubbleLayer(d);
        this.changeCursorPoint();
        return baseR * expandScale;
    }
    static raiseFocusedBubbleLayer(d) {
        d.raise && select(d.node().parentNode.parentNode).raise();
    }
    changeCursorPoint() {
        this.$$.$el.eventRect.style("cursor", "pointer");
    }
    findClosest(values, pos) {
        const { $$ } = this;
        return values
            .filter(v => v && !$$.isBarType(v.id))
            .reduce((acc, cur) => {
            const d = $$.dist(cur, pos);
            return d < this.getBubbleR(cur) ? cur : acc;
        }, 0);
    }
    getBubbleR(d) {
        const { minR, maxR } = this.options;
        const curVal = this.getZData(d);
        if (!curVal)
            return minR;
        const [min, max] = this.$$.data.targets.reduce(([accMin, accMax], cur) => {
            const val = this.getZData(cur.values[0]);
            return [Math.min(accMin, val), Math.max(accMax, val)];
        }, [10000, 0]);
        const size = min > 0 && max === min ? 0 : curVal / max;
        return Math.abs(size) * (maxR - minR) + minR;
    }
    getZData(d) {
        return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
    }
}

export { BubbleCompare as default };
