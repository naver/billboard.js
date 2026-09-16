/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
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
export { sanitize };
