/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.18.0-nightly-20260404005528
 * @requires billboard.js
 * @summary billboard.js plugin
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
const $COMMON = {
    target: "bb-target"};

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
    static version = "3.18.0-nightly-20260404005528";
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
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Sparkline plugin option class
 * @class SparklineOptions
 * @param {Options} options Sparkline plugin options
 * @augments Plugin
 * @returns {TableviewOptions}
 * @private
 */
class Options {
    constructor() {
        return {
            /**
             * Specify sparkline charts holder selector.
             * - **NOTE:** The amount of holder should match with the amount of data. If has less, will append necessaray amount nodes as sibling of main chart.
             * @name selector
             * @memberof plugin-sparkline
             * @type {string}
             * @default undefined
             * @example
             *   selector: ".sparkline"
             */
            selector: undefined
        };
    }
}

/**
 * Sparkline plugin.<br>
 * Generates sparkline charts
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *
 * - **Bear in mind:**
 * - Use this plugin to visualize multiple tiny chart only and chart APIs won't work properly.
 * - Sparkline chart size will be based on the main chart element size. To control spakrline charts, is highly recommended to set `size` option.
 * - Bubble, scatter and Arc(pie, donut, ratdar) types aren't supported.
 * - Some options will be stricted to be:
 *   - `resize.auto = false`
 *   - `axis.x.show = false`
 *   - `axis.y.show = false`
 *   - `axis.y.padding = 10`
 *   - `legend.show = false`
 *
 * @class plugin-sparkline
 * @param {object} options sparkline plugin options
 * @augments Plugin
 * @returns {Sparkline}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-sparkline.js"></script>
 *
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        	new bb.plugin.sparkline({
 *        	  selector: ".sparkline"
 *        	}),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import Sparkline from "billboard.js/dist/billboardjs-plugin-sparkline";
 *
 * bb.generate({
 *     ...
 *     plugins: [
 *        new Sparkline({ ... })
 *     ]
 * })
 */
class Sparkline extends Plugin {
    static version = `0.0.1`;
    element;
    constructor(options) {
        super(options);
        this.config = new Options();
        return this;
    }
    $beforeInit() {
        this.loadConfig();
        this.validate();
        this.element = [].slice.call(document.querySelectorAll(this.config.selector));
        // override internal methods
        this.overrideInternals();
        // override options
        this.overrideOptions();
        // bind event handlers's context
        this.overHandler = this.overHandler.bind(this);
        this.moveHandler = this.moveHandler.bind(this);
        this.outHandler = this.outHandler.bind(this);
    }
    validate() {
        const { $$, config } = this;
        let msg = "";
        if (!config.selector || !document.querySelector(config.selector)) {
            msg = "No holder elements found from given selector option.";
        }
        if ($$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType($$.data.targets)) {
            msg = "Contains non supported chart types.";
        }
        if (msg) {
            throw new Error(`[Sparkline plugin] ${msg}`);
        }
    }
    overrideInternals() {
        const { $$ } = this;
        const { getBarW, getIndices } = $$;
        // override internal methods to positioning bars
        $$.getIndices = function (indices, d, caller) {
            return caller === "getShapeX" ? {} : getIndices.call(this, indices, d);
        };
        $$.getBarW = function (type, axis) {
            return getBarW.call(this, type, axis, 1);
        };
    }
    overrideOptions() {
        const { config } = this.$$;
        config.legend_show = false;
        config.resize_auto = false;
        config.axis_x_show = false;
        // set default axes padding
        if (config.padding !== false) {
            const hasOption = o => Object.keys(o || {}).length > 0;
            if (hasOption(config.axis_x_padding)) {
                config.axis_x_padding = {
                    left: 15,
                    right: 15,
                    unit: "px"
                };
            }
            if (hasOption(config.axis_y_padding)) {
                config.axis_y_padding = 5;
            }
        }
        config.axis_y_show = false;
        if (!config.tooltip_position) {
            config.tooltip_position = function (data, width, height) {
                const { internal: { state: { event } } } = this;
                let top = event.pageY - (height * 1.35);
                let left = event.pageX - (width / 2);
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }
                return { top, left };
            };
        }
    }
    $init() {
        const { $$: { $el } } = this;
        // make disable-ish main chart element
        $el.chart
            .style("width", "0")
            .style("height", "0")
            .style("pointer-events", "none");
        $el.tooltip?.node() && document.body.appendChild($el.tooltip.node());
    }
    $afterInit() {
        const { $$ } = this;
        $$.$el.svg.attr("style", null)
            .style("width", "0")
            .style("height", "0");
        this.bindEvents(true);
    }
    /**
     * Bind tooltip event handlers for each sparkline elements.
     * @param {boolean} bind or unbind
     * @private
     */
    bindEvents(bind = true) {
        const { $$: { config } } = this;
        if (config.interaction_enabled && config.tooltip_show) {
            const method = `${bind ? "add" : "remove"}EventListener`;
            this.element
                .forEach(el => {
                const svg = el.querySelector("svg");
                svg[method]("mouseover", this.overHandler);
                svg[method]("mousemove", this.moveHandler);
                svg[method]("mouseout", this.outHandler);
            });
        }
    }
    overHandler(e) {
        const { $$ } = this;
        const { state: { eventReceiver } } = $$;
        eventReceiver.rect = e.target.getBoundingClientRect();
    }
    moveHandler(e) {
        const { $$ } = this;
        const index = $$.getDataIndexFromEvent(e);
        const data = $$.api.data(e.target.__id)?.[0];
        const d = data?.values?.[index];
        if (d && !d.name) {
            d.name = d.id;
        }
        $$.state.event = e;
        if ($$.isPointFocusOnly?.() && d) {
            $$.showCircleFocus?.([d]);
        }
        $$.setExpand(index, data.id, true);
        $$.showTooltip([d], e.target);
    }
    outHandler(e) {
        const { $$ } = this;
        $$.state.event = e;
        $$.isPointFocusOnly() ? $$.hideCircleFocus() : $$.unexpandCircles();
        $$.hideTooltip();
    }
    $redraw() {
        const { $$ } = this;
        const { $el } = $$;
        let el = this.element;
        const data = $$.api.data();
        const svgWrapper = $el.chart.html().match(/<svg[^>]*>/)?.[0];
        // append sparkline holder if is less than the data length
        if (el.length < data.length) {
            const chart = $el.chart.node();
            for (let i = data.length - el.length; i > 0; i--) {
                chart.parentNode.insertBefore(el[0].cloneNode(), chart.nextSibling);
            }
            this.element = document.querySelectorAll(this.config.selector);
            el = this.element;
        }
        data.map(v => v.id)
            .forEach((id, i) => {
            const selector = `.${$COMMON.target}-${id}`;
            const shape = $el.main.selectAll(selector);
            let svg = el[i].querySelector("svg");
            if (!svg) {
                el[i].innerHTML = `${svgWrapper}</svg>`;
                svg = el[i].querySelector("svg");
                svg.__id = id;
            }
            if (!svg.querySelector(selector)) {
                shape.style("opacity", null);
            }
            shape
                .style("fill", "none")
                .style("opacity", null);
            svg.innerHTML = "";
            svg.appendChild(shape.node());
        });
    }
    $willDestroy() {
        this.bindEvents(false);
        this.element
            .forEach(el => {
            el.innerHTML = "";
        });
    }
}

export { Sparkline as default };
