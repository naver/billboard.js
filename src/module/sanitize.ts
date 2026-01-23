/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */

/**
 * HTML/SVG Sanitization module
 * Pure whitelist approach - only explicitly allowed tags, attributes, and protocols pass through
 */

// Whitelist of allowed HTML/SVG tags
const ALLOWED_TAGS = new Set([
	// HTML tags for tooltip/legend templates
	"span",
	"div",
	"p",
	"br",
	"b",
	"i",
	"em",
	"strong",
	"u",
	"s",
	"sub",
	"sup",
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
	"a",
	"img",
	// SVG tags for point patterns
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

// Whitelist of allowed attributes
const ALLOWED_ATTRS = new Set([
	// Common attributes
	"class",
	"id",
	"style",
	"title",
	"lang",
	"dir",
	// HTML specific
	"href",
	"src",
	"alt",
	"width",
	"height",
	"colspan",
	"rowspan",
	"scope",
	"headers",
	// SVG presentation attributes
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

// Whitelist of allowed URI protocols
const ALLOWED_URI_PROTOCOLS = new Set([
	"http:",
	"https:",
	"mailto:"
]);

// Attributes that contain URIs
const URI_ATTRS = new Set(["href", "src", "xlink:href"]);

// Pre-compiled regex patterns for performance
const TAG_NAME_REGEX = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/;
const CLOSING_TAG_REGEX = /^<\/([a-zA-Z][a-zA-Z0-9]*)\s*>$/;
const OPENING_TAG_REGEX = /^<([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(\/?)>$/;
const ATTR_REGEX = /([a-zA-Z][\w:-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
const URL_IN_STYLE_REGEX = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi;

// Dangerous CSS patterns
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
function decodeHTMLEntities(str: string): string {
	return str
		// Named entities
		.replace(/&colon;/gi, ":")
		.replace(/&newline;/gi, "\n")
		.replace(/&tab;/gi, "\t")
		.replace(/&nbsp;/gi, " ")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, "\"")
		.replace(/&apos;/gi, "'")
		// Numeric entities (decimal)
		.replace(/&#(\d+);/gi, (_, code) => String.fromCharCode(parseInt(code, 10)))
		// Numeric entities (hex)
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/**
 * Check if a URI is safe (whitelist approach)
 * @param {string} uri URI to check
 * @returns {boolean} Whether the URI is safe
 * @private
 */
function isSafeURI(uri: string): boolean {
	// Decode HTML entities first to prevent bypass
	const decoded = decodeHTMLEntities(uri).trim();

	// Remove any whitespace/control characters that could be used for bypass
	// eslint-disable-next-line no-control-regex
	const normalized = decoded.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();

	// Empty or fragment-only URIs are safe
	if (!normalized || normalized.startsWith("#")) {
		return true;
	}

	// Relative paths are safe
	if (
		normalized.startsWith("/") ||
		normalized.startsWith("./") ||
		normalized.startsWith("../") ||
		!normalized.includes(":")
	) {
		return true;
	}

	// Check if protocol is in whitelist
	const colonIndex = normalized.indexOf(":");
	if (colonIndex > 0) {
		const protocol = normalized.substring(0, colonIndex + 1);
		return ALLOWED_URI_PROTOCOLS.has(protocol);
	}

	return false;
}

/**
 * Check if a style value is safe (whitelist approach)
 * @param {string} style Style attribute value
 * @returns {string|null} Sanitized style or null if unsafe
 * @private
 */
function sanitizeStyleValue(style: string): string | null {
	// Decode HTML entities first
	const decoded = decodeHTMLEntities(style);

	// Remove any control characters
	// eslint-disable-next-line no-control-regex
	const cleaned = decoded.replace(/[\u0000-\u001f]/g, "");

	// Check for url() - only allow safe URIs inside
	URL_IN_STYLE_REGEX.lastIndex = 0;
	let match;

	while ((match = URL_IN_STYLE_REGEX.exec(cleaned)) !== null) {
		if (!isSafeURI(match[1])) {
			return null;
		}
	}

	// Check for dangerous CSS patterns (expression, behavior, etc.)
	const normalizedLower = cleaned.toLowerCase().replace(/\s/g, "");

	for (const pattern of DANGEROUS_CSS_PATTERNS) {
		if (normalizedLower.includes(pattern)) {
			return null;
		}
	}

	return style;
}

// Lookup table for encoding dangerous characters in attribute values
const ATTR_ENCODE_MAP: Record<string, string> = {
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
function encodeAttrValue(value: string): string {
	return value.replace(ATTR_ENCODE_REGEX, char => ATTR_ENCODE_MAP[char]);
}

/**
 * Sanitize attribute value using whitelist approach
 * @param {string} name Attribute name
 * @param {string} value Attribute value
 * @param {boolean} wasUnquoted Whether the value was originally unquoted
 * @returns {string|null} Sanitized value if safe, null if should be removed
 * @private
 */
function sanitizeAttrValue(name: string, value: string, wasUnquoted: boolean = false):
	| string
	| null {
	// Check URI attributes with whitelist
	if (URI_ATTRS.has(name)) {
		if (!isSafeURI(value)) {
			return null;
		}
		// Encode dangerous characters in URI values to prevent attribute injection
		return wasUnquoted ? encodeAttrValue(value) : value;
	}

	// Check style attribute
	if (name === "style") {
		const sanitizedStyle = sanitizeStyleValue(value);
		if (sanitizedStyle === null) {
			return null;
		}
		// Encode dangerous characters in style values
		return wasUnquoted ? encodeAttrValue(sanitizedStyle) : sanitizedStyle;
	}

	// For other attributes, check for embedded event handlers
	const decoded = decodeHTMLEntities(value).toLowerCase().replace(/\s/g, "");
	if (/\bon\w+=/.test(decoded)) {
		return null;
	}

	// Encode dangerous characters to prevent attribute injection
	return wasUnquoted ? encodeAttrValue(value) : value;
}

/**
 * Extract tag name from a tag string
 * Returns null if not a valid tag format
 * @param {string} tag Tag string starting with <
 * @returns {string|null} Lowercase tag name or null
 * @private
 */
function extractTagName(tag: string): string | null {
	// Must start with < followed immediately by letter (no spaces allowed)
	const match = tag.match(TAG_NAME_REGEX);
	return match ? match[1].toLowerCase() : null;
}

/**
 * Check if a tag is in the whitelist
 * @param {string} tag Tag string
 * @returns {boolean} Whether tag is allowed
 * @private
 */
function isAllowedTag(tag: string): boolean {
	const tagName = extractTagName(tag);
	return tagName !== null && ALLOWED_TAGS.has(tagName);
}

/**
 * Sanitize a single HTML/SVG tag (only called for allowed tags)
 * @param {string} fullTag The full tag string including < and >
 * @returns {string} Sanitized tag
 * @private
 */
function sanitizeTag(fullTag: string): string {
	// Closing tag
	const closingMatch = fullTag.match(CLOSING_TAG_REGEX);
	if (closingMatch) {
		return `</${closingMatch[1].toLowerCase()}>`;
	}

	// Opening tag
	const openingMatch = fullTag.match(OPENING_TAG_REGEX);
	if (!openingMatch) {
		return "";
	}

	const [, tagName, attrString, selfClose] = openingMatch;
	const lowerTagName = tagName.toLowerCase();

	// Parse and filter attributes, preserving original quote style
	const allowedAttrs: string[] = [];
	ATTR_REGEX.lastIndex = 0;
	let attrMatch;

	while ((attrMatch = ATTR_REGEX.exec(attrString)) !== null) {
		const attrName = attrMatch[1].toLowerCase();
		const doubleQuotedValue = attrMatch[2];
		const singleQuotedValue = attrMatch[3];
		const unquotedValue = attrMatch[4];

		// Skip event handlers (on*)
		if (attrName.startsWith("on")) {
			continue;
		}

		// Determine original quote style and value
		let attrValue: string;
		let quoteChar: string;

		if (doubleQuotedValue !== undefined) {
			attrValue = doubleQuotedValue;
			quoteChar = "\"";
		} else if (singleQuotedValue !== undefined) {
			attrValue = singleQuotedValue;
			quoteChar = "'";
		} else if (unquotedValue !== undefined) {
			attrValue = unquotedValue;
			quoteChar = "\"";
		} else {
			// Boolean attribute (no value)
			if (ALLOWED_ATTRS.has(attrName)) {
				allowedAttrs.push(attrName);
			}
			continue;
		}

		if (ALLOWED_ATTRS.has(attrName)) {
			const wasUnquoted = unquotedValue !== undefined;
			const sanitizedValue = sanitizeAttrValue(attrName, attrValue, wasUnquoted);
			if (sanitizedValue !== null) {
				allowedAttrs.push(`${attrName}=${quoteChar}${sanitizedValue}${quoteChar}`);
			}
		}
	}

	const attrsStr = allowedAttrs.length > 0 ? ` ${allowedAttrs.join(" ")}` : "";
	const selfCloseStr = selfClose ? "/>" : ">";

	return `<${lowerTagName}${attrsStr}${selfCloseStr}`;
}

/**
 * Sanitize HTML string to prevent XSS attacks
 * Pure whitelist approach - allowed tags are sanitized, others are escaped
 * @param {string} str Target string value
 * @returns {string} Sanitized string with only allowed elements
 * @private
 */
export function sanitize(str: string): string {
	if (typeof str !== "string" || !str || str.indexOf("<") === -1) {
		return str;
	}

	// Single pass: sanitize allowed tags, escape disallowed ones
	// Also match orphaned fragments like "ipt>" from broken tags
	return str.replace(
		/<\/?[^>]*>|[^<>\s]+>/g,
		match => {
			// Remove HTML comments
			if (match.startsWith("<!--")) {
				return "";
			}

			// Orphaned fragment (e.g., "ipt>") → escape '>'
			if (!match.startsWith("<")) {
				return match.slice(0, -1) + "&gt;";
			}

			// Allowed tag → sanitize attributes
			if (isAllowedTag(match)) {
				return sanitizeTag(match);
			}

			// Disallowed tag → escape all '<' to prevent execution
			return match.replace(/</g, "&lt;");
		}
	);
}
