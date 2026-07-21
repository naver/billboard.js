/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.3-nightly-20260721005847
 * @requires billboard.js
 * @summary billboard.js plugin
*/
//#region src/module/util/type-checks.ts
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const isObjectType = (v) => typeof v === "object";
/**
* Check if is array
* @param {Array} arr Data to be checked
* @returns {boolean}
* @private
*/
const isArray = (arr) => Array.isArray(arr);
//#endregion
//#region src/module/sanitize.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
* @ignore
*/
/**
* HTML/SVG Sanitization module
* Pure whitelist approach - only explicitly allowed tags, attributes, and protocols pass through
*/
const ALLOWED_TAGS = /* @__PURE__ */ new Set([
	"span",
	"div",
	"p",
	"br",
	"b",
	"i",
	"em",
	"small",
	"strong",
	"mark",
	"u",
	"s",
	"sub",
	"sup",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"ul",
	"ol",
	"li",
	"dl",
	"dt",
	"dd",
	"table",
	"thead",
	"tbody",
	"tfoot",
	"tr",
	"th",
	"td",
	"caption",
	"colgroup",
	"col",
	"hr",
	"pre",
	"code",
	"blockquote",
	"abbr",
	"ins",
	"del",
	"a",
	"img",
	"figure",
	"figcaption",
	"svg",
	"g",
	"path",
	"circle",
	"ellipse",
	"rect",
	"line",
	"polyline",
	"polygon",
	"text",
	"tspan",
	"textPath",
	"use",
	"defs",
	"symbol",
	"clipPath",
	"mask",
	"linearGradient",
	"radialGradient",
	"stop",
	"pattern",
	"marker",
	"title",
	"desc"
]);
const ALLOWED_ATTRS = /* @__PURE__ */ new Set([
	"class",
	"id",
	"style",
	"title",
	"lang",
	"dir",
	"href",
	"src",
	"alt",
	"width",
	"height",
	"colspan",
	"rowspan",
	"scope",
	"headers",
	"d",
	"points",
	"x",
	"y",
	"x1",
	"x2",
	"y1",
	"y2",
	"cx",
	"cy",
	"r",
	"rx",
	"ry",
	"dx",
	"dy",
	"viewBox",
	"preserveAspectRatio",
	"transform",
	"fill",
	"fill-opacity",
	"fill-rule",
	"stroke",
	"stroke-width",
	"stroke-opacity",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-dasharray",
	"stroke-dashoffset",
	"opacity",
	"clip-path",
	"clip-rule",
	"mask",
	"font-family",
	"font-size",
	"font-weight",
	"font-style",
	"text-anchor",
	"dominant-baseline",
	"offset",
	"stop-color",
	"stop-opacity",
	"gradientUnits",
	"gradientTransform",
	"spreadMethod",
	"patternUnits",
	"patternTransform",
	"marker-start",
	"marker-mid",
	"marker-end",
	"markerWidth",
	"markerHeight",
	"refX",
	"refY",
	"xlink:href"
]);
const TAG_CASE_MAP = /* @__PURE__ */ new Map();
ALLOWED_TAGS.forEach((tag) => TAG_CASE_MAP.set(tag.toLowerCase(), tag));
const ATTR_CASE_MAP = /* @__PURE__ */ new Map();
ALLOWED_ATTRS.forEach((attr) => ATTR_CASE_MAP.set(attr.toLowerCase(), attr));
const ALLOWED_URI_PROTOCOLS = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:"
]);
const URI_ATTRS = /* @__PURE__ */ new Set([
	"href",
	"src",
	"xlink:href"
]);
const TAG_NAME_REGEX = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/;
const CLOSING_TAG_REGEX = /^<\/([a-zA-Z][a-zA-Z0-9]*)\s*>$/;
const OPENING_TAG_REGEX = /^<([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(\/?)>$/;
const ATTR_REGEX = /([a-zA-Z][\w:-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
const URL_IN_STYLE_REGEX = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi;
const DANGEROUS_CSS_PATTERNS = [
	"expression(",
	"behavior:",
	"binding:",
	"@import",
	"@charset",
	"-moz-binding:"
];
/**
* Decode HTML entities in a string
* @param {string} str String with potential HTML entities
* @returns {string} Decoded string
* @private
*/
function decodeHTMLEntities(str) {
	return str.replace(/&colon;/gi, ":").replace(/&newline;/gi, "\n").replace(/&tab;/gi, "	").replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&apos;/gi, "'").replace(/&#(\d+);?/gi, (_, code) => String.fromCharCode(parseInt(code, 10))).replace(/&#x([0-9a-f]+);?/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}
/**
* Check if a URI is safe (whitelist approach)
* @param {string} uri URI to check
* @returns {boolean} Whether the URI is safe
* @private
*/
function isSafeURI(uri) {
	const normalized = decodeHTMLEntities(uri).trim().replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
	if (!normalized || normalized.startsWith("#")) return true;
	const schemeMatch = normalized.match(/^[^/?#]*:/);
	if (schemeMatch) return ALLOWED_URI_PROTOCOLS.has(schemeMatch[0]);
	return true;
}
/**
* Check if a style value is safe (whitelist approach)
* @param {string} style Style attribute value
* @returns {string|null} Sanitized style or null if unsafe
* @private
*/
function sanitizeStyleValue(style) {
	const cleaned = decodeHTMLEntities(style).replace(/[\u0000-\u001f]/g, "");
	URL_IN_STYLE_REGEX.lastIndex = 0;
	let match;
	while ((match = URL_IN_STYLE_REGEX.exec(cleaned)) !== null) if (!isSafeURI(match[1])) return null;
	const normalizedLower = cleaned.toLowerCase().replace(/\s/g, "");
	for (const pattern of DANGEROUS_CSS_PATTERNS) if (normalizedLower.includes(pattern)) return null;
	return style;
}
const ATTR_ENCODE_MAP = {
	"\"": "&quot;",
	"'": "&#39;",
	"`": "&#96;"
};
const ATTR_ENCODE_REGEX = /["'`]/g;
/**
* Encode dangerous characters in attribute values to HTML entities
* This prevents attribute injection attacks where quotes/backticks break out of the attribute context
* @param {string} value Attribute value
* @returns {string} Encoded value
* @private
*/
function encodeAttrValue(value) {
	return value.replace(ATTR_ENCODE_REGEX, (char) => ATTR_ENCODE_MAP[char]);
}
/**
* Sanitize attribute value using whitelist approach
* @param {string} name Attribute name
* @param {string} value Attribute value
* @param {boolean} wasUnquoted Whether the value was originally unquoted
* @returns {string|null} Sanitized value if safe, null if should be removed
* @private
*/
function sanitizeAttrValue(name, value, wasUnquoted = false) {
	if (URI_ATTRS.has(name)) {
		if (!isSafeURI(value)) return null;
		return wasUnquoted ? encodeAttrValue(value) : value;
	}
	if (name === "style") {
		const sanitizedStyle = sanitizeStyleValue(value);
		if (sanitizedStyle === null) return null;
		return wasUnquoted ? encodeAttrValue(sanitizedStyle) : sanitizedStyle;
	}
	const decoded = decodeHTMLEntities(value).toLowerCase().replace(/\s/g, "");
	if (/\bon\w+=/.test(decoded)) return null;
	return wasUnquoted ? encodeAttrValue(value) : value;
}
/**
* Extract tag name from a tag string
* Returns null if not a valid tag format
* @param {string} tag Tag string starting with <
* @returns {string|null} Lowercase tag name or null
* @private
*/
function extractTagName(tag) {
	const match = tag.match(TAG_NAME_REGEX);
	return match ? match[1].toLowerCase() : null;
}
/**
* Check if a tag is in the whitelist
* @param {string} tag Tag string
* @returns {boolean} Whether tag is allowed
* @private
*/
function isAllowedTag(tag) {
	const tagName = extractTagName(tag);
	return tagName !== null && TAG_CASE_MAP.has(tagName);
}
/**
* Sanitize a single HTML/SVG tag (only called for allowed tags)
* @param {string} fullTag The full tag string including < and >
* @returns {string} Sanitized tag
* @private
*/
function sanitizeTag(fullTag) {
	const closingMatch = fullTag.match(CLOSING_TAG_REGEX);
	if (closingMatch) {
		const lowerName = closingMatch[1].toLowerCase();
		return `</${TAG_CASE_MAP.get(lowerName) ?? lowerName}>`;
	}
	const openingMatch = fullTag.match(OPENING_TAG_REGEX);
	if (!openingMatch) return "";
	const [, tagName, attrString, selfClose] = openingMatch;
	const lowerTagName = tagName.toLowerCase();
	const canonicalTagName = TAG_CASE_MAP.get(lowerTagName) ?? lowerTagName;
	const allowedAttrs = [];
	ATTR_REGEX.lastIndex = 0;
	let attrMatch;
	while ((attrMatch = ATTR_REGEX.exec(attrString)) !== null) {
		const lowerAttrName = attrMatch[1].toLowerCase();
		const doubleQuotedValue = attrMatch[2];
		const singleQuotedValue = attrMatch[3];
		const unquotedValue = attrMatch[4];
		if (lowerAttrName.startsWith("on")) continue;
		const canonicalAttrName = ATTR_CASE_MAP.get(lowerAttrName) ?? lowerAttrName;
		let attrValue;
		let quoteChar;
		if (doubleQuotedValue !== void 0) {
			attrValue = doubleQuotedValue;
			quoteChar = "\"";
		} else if (singleQuotedValue !== void 0) {
			attrValue = singleQuotedValue;
			quoteChar = "'";
		} else if (unquotedValue !== void 0) {
			attrValue = unquotedValue;
			quoteChar = "\"";
		} else {
			if (ATTR_CASE_MAP.has(lowerAttrName)) allowedAttrs.push(canonicalAttrName);
			continue;
		}
		if (ATTR_CASE_MAP.has(lowerAttrName)) {
			const sanitizedValue = sanitizeAttrValue(lowerAttrName, attrValue, unquotedValue !== void 0);
			if (sanitizedValue !== null) allowedAttrs.push(`${canonicalAttrName}=${quoteChar}${sanitizedValue}${quoteChar}`);
		}
	}
	return `<${canonicalTagName}${allowedAttrs.length > 0 ? ` ${allowedAttrs.join(" ")}` : ""}${selfClose ? "/>" : ">"}`;
}
/**
* Sanitize HTML string to prevent XSS attacks
* Pure whitelist approach - allowed tags are sanitized, others are escaped
* @param {string} str Target string value
* @returns {string} Sanitized string with only allowed elements
* @private
*/
function sanitize(str) {
	if (typeof str !== "string" || !str || str.indexOf("<") === -1) return str;
	return str.replace(/<\/?[^>]*>|[^<>\s]+>/g, (match) => {
		if (match.startsWith("<!--")) return "";
		if (!match.startsWith("<")) return match.slice(0, -1) + "&gt;";
		if (isAllowedTag(match)) return sanitizeTag(match);
		return match.replace(/</g, "&lt;");
	});
}
//#endregion
//#region src/module/util/object.ts
/**
* Process the template  & return bound string
* @param {string} tpl Template string
* @param {object} data Data value to be replaced
* @returns {string}
* @private
*/
function tplProcess(tpl, data) {
	return sanitize(tpl.replace(/\{=([^}]+)\}/g, (_, key) => data[key] ?? ""));
}
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
	static version = "4.0.3-nightly-20260721005847";
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
//#region src/Plugin/tableview/const.ts
const defaultStyle = {
	id: "__tableview-style__",
	class: "bb-tableview",
	rule: `.bb-tableview {
		border-collapse:collapse;
		border-spacing:0;
		background:#fff;
		min-width:100%;
		margin-top:10px;
		font-family:sans-serif;
		font-size:.9em;
	}
	.bb-tableview tr:hover {
		background:#eef7ff;
	}
	.bb-tableview thead tr {
		background:#f8f8f8;
	}
	.bb-tableview caption,.bb-tableview td,.bb-tableview th {
		text-align: center;
		border:1px solid silver;
		padding:.5em;
	}
	.bb-tableview caption {
		font-size:1.1em;
		font-weight:700;
		margin-bottom: -1px;
	}`
};
const tpl = {
	body: `<caption>{=title}</caption>
		<thead><tr>{=thead}</tr></thead>
		<tbody>{=tbody}</tbody>`,
	thead: `<th scope="col">{=title}</th>`,
	tbodyHeader: `<th scope="row">{=value}</th>`,
	tbody: `<td>{=value}</td>`
};
//#endregion
//#region src/Plugin/tableview/Options.ts
/**
* Copyright (c) 2021 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* TableView plugin option class
* @class TableviewOptions
* @param {Options} options TableView plugin options
* @augments Plugin
* @returns {TableviewOptions}
* @private
*/
var Options = class {
	constructor() {
		return {
			/**
			* Set tableview holder selector.
			* - **NOTE:** If not set, will append new holder element dynamically right after chart element.
			* @name selector
			* @memberof plugin-tableview
			* @type {string}
			* @default undefined
			* @example
			*   selector: "#table-holder"
			*/
			selector: void 0,
			/**
			* Set category title text
			* @name categoryTitle
			* @memberof plugin-tableview
			* @type {string}
			* @default "Category"
			* @example
			*   categoryTitle: "#table-holder"
			*/
			categoryTitle: "Category",
			/**
			* Set category text format function.
			* @name categoryFormat
			* @memberof plugin-tableview
			* @type {function}
			* @returns {string}
			* @default function(v) { // will return formatted value according x Axis type }}
			* @example
			*   categoryFormat: "#table-holder"
			*/
			categoryFormat: function(v) {
				let category = v;
				if (this.$$.axis.isCategorized()) category = this.$$.categoryName(v);
				else if (this.$$.axis.isTimeSeries()) category = v.toLocaleDateString();
				return category;
			},
			/**
			* Set tableview holder class name.
			* @name class
			* @memberof plugin-tableview
			* @type {string}
			* @default undefined
			* @example
			*   class: "table-class-name"
			*/
			class: void 0,
			/**
			* Set to apply default style(`.bb-tableview`) to tableview element.
			* @name style
			* @memberof plugin-tableview
			* @type {boolean}
			* @default true
			* @example
			*   style: false
			*/
			style: true,
			/**
			* Set tableview title text.
			* - **NOTE:** If set [title.text](https://naver.github.io/billboard.js/release/latest/doc/Options.html#.title), will be used when this option value is empty.
			* @name title
			* @memberof plugin-tableview
			* @type {string}
			* @default undefined
			* @example
			*   title: "Table Title Text"
			*/
			title: void 0,
			/**
			* Update tableview from data visibility update(ex. legend toggle).
			* @name updateOnToggle
			* @memberof plugin-tableview
			* @type {boolean}
			* @default true
			* @example
			*   legendToggleUpdate: false
			*/
			updateOnToggle: true,
			/**
			* Set how null value to be shown.
			* @name nullString
			* @memberof plugin-tableview
			* @type {string}
			* @default "-"
			* @example
			*   nullString: "N/A"
			*/
			nullString: "-",
			/**
			* Set number format function.
			* @name numberFormat
			* @memberof plugin-tableview
			* @type {function}
			* @returns {string}
			* @default function(v) { // will return formatted value according to locale settings }
			* @example
			*   numberFormat: function(v) {
			*     return v.toLocaleString();
			*   }
			*/
			numberFormat: function(v) {
				return v.toLocaleString();
			}
		};
	}
};
//#endregion
//#region src/Plugin/tableview/index.ts
/**
* Copyright (c) 2021 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Expected value type for each supported option, used to validate user input.
* Acts as the single source of truth for the set of allowed option keys.
* @private
*/
const optionValidators = {
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
function isValidTableViewOptions(options) {
	if (!isObjectType(options) || isArray(options) || options === null) return false;
	return Object.entries(options).every(([key, value]) => {
		const validate = optionValidators[key];
		return !isFunction(validate) || value === void 0 || validate(value);
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
* <script src="$YOUR_PATH/plugin/billboardjs-plugin-tableview.js"><\/script>
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
var TableView = class extends Plugin {
	constructor(options = {}) {
		super(options);
		if (!isValidTableViewOptions(options)) console?.error?.("[billboard.js] TableView plugin received invalid options; unsupported values will be ignored.", options);
		this.config = new Options();
		return this;
	}
	$beforeInit() {
		this.loadConfig();
	}
	$init() {
		const { class: className, selector, style } = this.config;
		let element = document.querySelector(selector || `.${className || defaultStyle.class}`);
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
		if (style && !document.getElementById(defaultStyle.id)) {
			const s = document.createElement("style");
			s.id = defaultStyle.id;
			s.innerHTML = defaultStyle.rule;
			(document.head || document.getElementsByTagName("head")[0]).appendChild(s);
		}
		element.classList.add(...[style && defaultStyle.class, className].filter(Boolean));
		this.element = element;
	}
	/**
	* Generate table
	* @private
	*/
	generateTable() {
		const { $$, config, element } = this;
		const dataToShow = $$.filterTargetsToShow($$.data.targets);
		let thead = tplProcess(tpl.thead, { title: dataToShow.length ? this.config.categoryTitle : "" });
		let tbody = "";
		const rows = [];
		dataToShow.forEach((v) => {
			thead += tplProcess(tpl.thead, { title: v.id });
			v.values.forEach((d, i) => {
				if (!rows[i]) rows[i] = [d.x];
				rows[i].push(d.value);
			});
		});
		rows.forEach((v) => {
			tbody += `<tr>${v.map((d, i) => tplProcess(i ? tpl.tbody : tpl.tbodyHeader, { value: i === 0 ? config.categoryFormat.bind(this)(d) : isNumber(d) ? config.numberFormat.bind(this)(d) : config.nullString })).join("")}</tr>`;
		});
		element.innerHTML = tplProcess(tpl.body, {
			...config,
			title: config.title || $$.config.title_text || "",
			thead,
			tbody
		});
	}
	$redraw() {
		const { state } = this.$$;
		!(state.resizing || !this.config.updateOnToggle && state.toggling) && this.generateTable();
	}
	$willDestroy() {
		this.element.parentNode?.removeChild(this.element);
		if (this.$$.charts.length === 1) {
			const s = document.getElementById(defaultStyle.id);
			s?.parentNode?.removeChild(s);
		}
	}
};
//#endregion
export { TableView as default, isValidTableViewOptions };
