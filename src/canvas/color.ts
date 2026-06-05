/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "../module/browser";
import {isNumber} from "../module/util";

let colorParserContext: CanvasRenderingContext2D | null | undefined;

/**
 * Apply opacity to CSS color values canvas can parse directly.
 * @param {string} color CSS color value
 * @param {number} opacity Stop opacity
 * @returns {string} Color with alpha when convertible
 * @private
 */
export function withOpacity(color: string, opacity: number): string {
	if (!isNumber(opacity) || opacity >= 1) {
		return color;
	}

	const hex = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i);

	if (hex) {
		const value = hex[1].length === 3 ? hex[1].split("").map(v => v + v).join("") : hex[1];
		const matches = value.match(/.{2}/g);

		if (!matches) {
			return color;
		}

		const rgb = matches.map(v => parseInt(v, 16));

		return `rgba(${rgb.join(",")},${opacity})`;
	}

	if (/^rgb\(/i.test(color)) {
		return color.replace(/^rgb\((.*)\)$/i, `rgba($1,${opacity})`);
	}

	if (/^rgba\(/i.test(color)) {
		return color.replace(
			/^rgba\((.*),\s*([\d.]+)\)$/i,
			(_, rgb, alpha) => `rgba(${rgb},${Number(alpha) * opacity})`
		);
	}

	const parsed = parseCanvasColor(color);

	if (parsed && parsed !== color) {
		return withOpacity(parsed, opacity);
	}

	return color;
}

/**
 * Parse any CSS color value that canvas can understand.
 * @param {string} color CSS color value
 * @returns {string|null} Normalized canvas color
 * @private
 */
export function parseCanvasColor(color: string): string | null {
	if (!window.document) {
		return null;
	}

	if (colorParserContext === undefined) {
		colorParserContext = window.document.createElement("canvas").getContext("2d");
	}

	if (!colorParserContext) {
		return null;
	}

	colorParserContext.fillStyle = "#000";
	colorParserContext.fillStyle = color;
	const parsedOnBlack = colorParserContext.fillStyle;

	colorParserContext.fillStyle = "#fff";
	colorParserContext.fillStyle = color;
	const parsedOnWhite = colorParserContext.fillStyle;

	return parsedOnBlack === parsedOnWhite ? parsedOnBlack : null;
}
