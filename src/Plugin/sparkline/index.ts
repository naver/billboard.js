/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$COMMON} from "../../config/classes";
import Plugin from "../Plugin";
import Options from "./Options";
import type {IData} from "../../ChartInternal/data/IData";
import {loadConfig} from "../../config/config";

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
export default class Sparkline extends Plugin {
	static version = `0.0.1`;
	private config;
	private element;

	constructor(options) {
		super(options);
		this.config = new Options();

		return this;
	}

	$beforeInit(): void {
		loadConfig.call(this, this.options);

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

	validate(): void {
		const {$$, config} = this;
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

	overrideInternals(): void {
		const {$$} = this;
		const {getBarW, getIndices} = $$;

		// override internal methods to positioning bars
		$$.getIndices = function(indices, d, caller) {
			return caller === "getShapeX" ? {} : getIndices.call(this, indices, d);
		};

		$$.getBarW = function(type, axis) {
			return getBarW.call(this, type, axis, 1);
		};
	}

	overrideOptions(): void {
		const {config} = this.$$;

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
			config.tooltip_position = function(data, width, height) {
				const {internal: {state: {event}}} = this;
				let top = event.pageY - (height * 1.35);
				let left = event.pageX - (width / 2);

				if (top < 0) {
					top = 0;
				}

				if (left < 0) {
					left = 0;
				}

				return {top, left};
			};
		}
	}

	$init(): void {
		const {$$: {$el}} = this;

		// make disable-ish main chart element
		$el.chart
			.style("width", "0")
			.style("height", "0")
			.style("pointer-events", "none");

		$el.tooltip?.node() && document.body.appendChild($el.tooltip.node());
	}

	$afterInit(): void {
		const {$$} = this;

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
	bindEvents(bind = true): void {
		const {$$: {config}} = this;

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

	overHandler(e): void {
		const {$$} = this;
		const {state: {eventReceiver}} = $$;

		eventReceiver.rect = e.target.getBoundingClientRect();
	}

	moveHandler(e): void {
		const {$$} = this;
		const index = $$.getDataIndexFromEvent(e);
		const data = $$.api.data(e.target.__id)?.[0] as IData;
		const d = data?.values?.[index];

		if (d && !d.name) {
			d.name = d.id;
		}

		$$.state.event = e;

		if ($$.config.point_focus_only && d) {
			$$.showCircleFocus?.([d]);
		}

		$$.setExpand(index, data.id, true);
		$$.showTooltip([d], e.target);
	}

	outHandler(e): void {
		const {$$} = this;

		$$.state.event = e;

		$$.config.point_focus_only ?
			$$.hideCircleFocus() : $$.unexpandCircles();

		$$.hideTooltip();
	}

	$redraw(): void {
		const {$$} = this;
		const {$el} = $$;

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

	$willDestroy(): void {
		this.bindEvents(false);
		this.element
			.forEach(el => {
				el.innerHTML = "";
			});
	}
}
