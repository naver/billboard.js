/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	isArray,
	isBoolean,
	isFunction,
	isNumber,
	isObjectType,
	isString,
	tplProcess
} from "../../module/util";
import Plugin from "../Plugin";
import {defaultStyle, tpl} from "./const";
import Options from "./Options";

export interface TableViewOptions {
	selector?: string;
	categoryTitle?: string;
	categoryFormat?: (v: Date | number | string) => string;
	class?: string;
	style?: boolean;
	title?: string;
	updateOnToggle?: boolean;
	nullString?: string;
	numberFormat?: (v: number | string) => string;
}

/**
 * Expected value type for each supported option, used to validate user input.
 * Acts as the single source of truth for the set of allowed option keys.
 * @private
 */
const optionValidators: { [key in keyof Required<TableViewOptions>]: (v: unknown) => boolean } = {
	selector: isString,
	categoryTitle: isString,
	categoryFormat: isFunction,
	class: isString,
	style: isBoolean,
	title: isString,
	updateOnToggle: isBoolean,
	nullString: isString,
	numberFormat: isFunction
};

/**
 * Check whether the given value is a valid TableView options object.
 * An empty object is valid (every option falls back to its default) and
 * unknown keys are ignored, so only a known option holding a value of the
 * wrong type makes the object invalid. An explicit `undefined` value is
 * allowed so a consumer can opt out of an option and let it fall back to
 * the default.
 * @param {unknown} options Value given to the TableView constructor
 * @returns {boolean} `true` when `options` is a valid TableView options object
 * @private
 */
export function isValidTableViewOptions(options: unknown): options is TableViewOptions {
	if (!isObjectType(options) || isArray(options) || options === null) {
		return false;
	}

	return Object.entries(options).every(([key, value]) => {
		const validate = optionValidators[key];

		// unknown keys are ignored; known keys must match their expected type
		return !isFunction(validate) || value === undefined || validate(value);
	});
}

/**
 * Table view plugin.<br>
 * Generates table view for bound dataset.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * @class plugin-tableview
 * @param {object} options table view plugin options
 * @augments Plugin
 * @returns {TableView}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-tableview.js"></script>
 *
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        new bb.plugin.tableview({
 *          selector: "#my-table-view",
 *          categoryTitle: "Category",
 *          categoryFormat: function(v) {
 *              // do some transformation
 *              ...
 *              return v;
 *          },
 *          class: "my-class-name",
 *          style: true,
 *          title: "My Data List",
 *          updateOnToggle: false,
 *          nullString: "N/A",
 *          numberFormat: function(v) {
 *              // do some transformation like number formatting
 *              // return typeof v === "number" ? v.toFixed(2) : v;
 *              // or use d3.format
 *              // return typeof v === "number" ? d3.format(".2f")(v) : v;
 *              // or use Intl.NumberFormat
 *              // return typeof v === "number" ? new Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(v) : v;
 *              // or any other number formatting library
 *              ...
 *              return v;
 *          }
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import TableView from "billboard.js/dist/billboardjs-plugin-tableview";
 *
 * bb.generate({
 *     ...
 *     plugins: [
 *        new TableView({ ... })
 *     ]
 * })
 */
export default class TableView extends Plugin {
	private element;

	constructor(options: TableViewOptions = {}) {
		super(options);

		// warn (but don't throw) on invalid options so that unsupported values
		// simply fall back to their defaults, keeping behavior non-breaking.
		if (!isValidTableViewOptions(options)) {
			console?.error?.(
				"[billboard.js] TableView plugin received invalid options; unsupported values will be ignored.",
				options
			);
		}

		this.config = new Options();

		return this;
	}

	$beforeInit(): void {
		this.loadConfig();
	}

	$init(): void {
		const {class: className, selector, style} = this.config;
		let element = document.querySelector(
			selector || `.${className || defaultStyle.class}`
		);

		if (!element) {
			const chart = this.$$.$el.chart.node();

			element = document.createElement("table");
			chart.parentNode.insertBefore(element, chart.nextSibling);
		}

		if (element.tagName !== "TABLE") {
			const table = document.createElement("table");

			element.appendChild(table);
			element = table;
		}

		// append default css style
		if (style && !document.getElementById(defaultStyle.id)) {
			const s = document.createElement("style");

			s.id = defaultStyle.id;
			s.innerHTML = defaultStyle.rule;

			(document.head || document.getElementsByTagName("head")[0])
				.appendChild(s);
		}

		element.classList.add(...[style && defaultStyle.class, className].filter(Boolean));

		this.element = element;
	}

	/**
	 * Generate table
	 * @private
	 */
	generateTable(): void {
		const {$$, config, element} = this;
		const dataToShow = $$.filterTargetsToShow($$.data.targets);

		let thead = tplProcess(tpl.thead, {
			title: dataToShow.length ? this.config.categoryTitle : ""
		});
		let tbody = "";
		const rows: (number | string)[][] = [];

		dataToShow.forEach(v => {
			thead += tplProcess(tpl.thead, {title: v.id});

			// make up value rows
			v.values.forEach((d, i: number) => {
				if (!rows[i]) {
					rows[i] = [d.x];
				}

				rows[i].push(d.value);
			});
		});

		rows.forEach(v => {
			tbody += `<tr>${
				v.map((d, i) =>
					tplProcess(i ? tpl.tbody : tpl.tbodyHeader, {
						value: i === 0 ?
							config.categoryFormat.bind(this)(d) :
							(isNumber(d) ? config.numberFormat.bind(this)(d) : config.nullString)
					})
				).join("")
			}</tr>`;
		});

		element.innerHTML = tplProcess(tpl.body, {
			...config,
			title: config.title || $$.config.title_text || "",
			thead,
			tbody
		});
	}

	$redraw(): void {
		const {state} = this.$$;
		const doNotUpdate = state.resizing || (!this.config.updateOnToggle && state.toggling);

		!doNotUpdate && this.generateTable();
	}

	$willDestroy(): void {
		this.element.parentNode?.removeChild(this.element);

		// remove default css style when left one chart instance
		if (this.$$.charts.length === 1) {
			const s = document.getElementById(defaultStyle.id);

			s?.parentNode?.removeChild(s);
		}
	}
}
