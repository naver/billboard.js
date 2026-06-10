/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {document, window} from "../module/browser";
import {mergeObj} from "../module/util";

/**
 * Resolved canvas drawing style.
 * @private
 */
export interface CanvasThemeStyle {
	axis: {
		lineColor: string,
		lineWidth: number,
		tickColor: string,
		tickWidth: number,
		labelFont: string,
		xTickFont: string,
		yTickFont: string,
		y2TickFont: string,
		labelColor: string,
		xLabelColor: string,
		yLabelColor: string,
		y2LabelColor: string,
		activeLabelColor: string
	};
	grid: {
		lineColor: string,
		lineWidth: number,
		dashArray: number[],
		labelFont: string,
		labelColor: string
	};
	focusGrid: {lineColor: string, lineWidth: number, dashArray: number[]};
	emptyLabel: {font: string, color: string};
	region: {fill: string, opacity: number, labelFont: string, labelColor: string};
	shape: {
		barOpacity: number,
		barExpandedOpacity: number,
		barStrokeColor: string,
		barLineWidth: number,
		barConnectLineColor: string,
		barConnectLineWidth: number,
		candlestickStrokeColor: string,
		candlestickLineWidth: number,
		candlestickExpandedOpacity: number,
		lineWidth: number,
		lineFocusedWidth: number,
		areaOpacity: number,
		targetDefocusedOpacity: number,
		pointFillColor?: string,
		pointStrokeColor?: string,
		pointLineWidth?: number
	};
	selectedPoint: {fill: string, stroke?: string, lineWidth: number};
	focusPoint: {fill?: string, stroke?: string, lineWidth: number};
	zoomBrush: {fill: string, opacity: number};
	subchartBrush: {
		fill: string,
		opacity: number,
		handleFill: string,
		handleOpacity: number,
		handleStroke: string,
		handleLineWidth: number
	};
	treemap: {stroke: string, lineWidth: number};
	label: {font: string, color: string};
	title: {font: string, color: string};
}

type CanvasThemeDeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? CanvasThemeDeepPartial<T[P]> : T[P];
};

export type CanvasThemeSelectorStyle = Record<
	string,
	string | number | number[] | null | undefined
>;

export type CanvasThemeSelectorMap = Record<string, CanvasThemeSelectorStyle>;

export type CanvasThemeOverride = CanvasThemeDeepPartial<CanvasThemeStyle> & {
	selectors?: CanvasThemeSelectorMap
};

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Parse CSS numeric value.
 * @param {string|number} value CSS value
 * @param {number} fallback Fallback value
 * @returns {number} Parsed number
 * @private
 */
function toNumber(value: string | number | null | undefined, fallback: number): number {
	const parsed = typeof value === "number" ? value : parseFloat(value ?? "");

	return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Resolve effective SVG paint opacity from element opacity and fill-opacity.
 * @param {object} value Computed opacity values
 * @param {number} fallback Fallback opacity
 * @returns {number} Effective opacity
 * @private
 */
function toPaintOpacity(value: Record<string, string>, fallback: number): number {
	const opacity = toNumber(value.opacity, 1);
	const fillOpacity = toNumber(value["fill-opacity"], 1);
	const result = opacity * fillOpacity;

	return Number.isFinite(result) ? result : fallback;
}

/**
 * Parse CSS color value.
 * @param {string} value CSS color value
 * @param {string} fallback Fallback value
 * @returns {string} CSS color
 * @private
 */
function toColor(value: string | null | undefined, fallback: string): string {
	const color = value?.trim();

	return color && !/^(none|transparent|rgba\(0,\s*0,\s*0,\s*0\))$/i.test(color) ?
		color :
		fallback;
}

/**
 * Parse CSS color value only when it is different from an ignored baseline.
 * @param {string} value CSS color value
 * @param {string} ignored Ignored baseline color
 * @returns {string|undefined} CSS color
 * @private
 */
function toOptionalColor(
	value: string | null | undefined,
	ignored?: string | null | undefined
): string | undefined {
	const color = toColor(value, "");
	const ignoredColor = ignored ? toColor(ignored, "") : "";

	return color && color !== ignoredColor ? color : undefined;
}

/**
 * Parse CSS numeric value only when it is different from an ignored baseline.
 * @param {string|number} value CSS value
 * @param {number} ignored Ignored baseline value
 * @returns {number|undefined} Parsed number
 * @private
 */
function toOptionalNumber(
	value: string | number | null | undefined,
	ignored?: string | number | null | undefined
): number | undefined {
	const parsed = typeof value === "number" ? value : parseFloat(value ?? "");
	const ignoredParsed = typeof ignored === "number" ? ignored : parseFloat(ignored ?? "");

	return Number.isFinite(parsed) &&
			(!Number.isFinite(ignoredParsed) || parsed !== ignoredParsed) ?
		parsed :
		undefined;
}

/**
 * Parse CSS dash array value.
 * @param {string|Array} value CSS stroke-dasharray value
 * @returns {Array} Dash array
 * @private
 */
function toDashArray(value: string | number[] | null | undefined): number[] {
	if (Array.isArray(value)) {
		return value.filter(v => Number.isFinite(v) && v > 0);
	}

	return (value || "")
		.split(/[,\s]+/)
		.map(v => parseFloat(v))
		.filter(v => Number.isFinite(v) && v > 0);
}

/**
 * Get CSS font shorthand usable by canvas.
 * @param {CSSStyleDeclaration} style Computed style
 * @param {string} fallback Fallback value
 * @returns {string} Font shorthand
 * @private
 */
function toFont(style: CSSStyleDeclaration, fallback: string): string {
	const font = style.getPropertyValue("font").trim();

	if (font) {
		return font;
	}

	const fontSize = style.getPropertyValue("font-size").trim();
	const fontFamily = style.getPropertyValue("font-family").trim();

	if (!fontSize || !fontFamily) {
		return fallback;
	}

	const fontStyle = style.getPropertyValue("font-style").trim();
	const fontVariant = style.getPropertyValue("font-variant").trim();
	const fontWeight = style.getPropertyValue("font-weight").trim();
	const lineHeight = style.getPropertyValue("line-height").trim();
	const size = lineHeight && lineHeight !== "normal" ? `${fontSize}/${lineHeight}` : fontSize;

	return [
		fontStyle && fontStyle !== "normal" ? fontStyle : "",
		fontVariant && fontVariant !== "normal" ? fontVariant : "",
		fontWeight && !/^(normal|400)$/.test(fontWeight) ? fontWeight : "",
		size,
		fontFamily
	].filter(Boolean).join(" ");
}

/**
 * Get style declaration value by CSS property name.
 * @param {object} style Style declaration object
 * @param {string} prop CSS property name
 * @returns {string|number|Array|undefined} Style value
 * @private
 */
function getStyleValue(
	style: CanvasThemeSelectorStyle,
	prop: string
): string | number | number[] | null | undefined {
	const camelProp = prop.replace(/-([a-z])/g, (all, chr) => chr.toUpperCase());

	return style[prop] ?? style[camelProp];
}

/**
 * Read color from selector style declaration.
 * @param {object} style Style declaration object
 * @param {string} prop CSS property name
 * @returns {string|undefined} Color value
 * @private
 */
function readColorValue(style: CanvasThemeSelectorStyle, prop: string): string | undefined {
	const value = getStyleValue(style, prop);
	const color = value == null ? "" : toColor(String(value), "");

	return color || undefined;
}

/**
 * Read numeric value from selector style declaration.
 * @param {object} style Style declaration object
 * @param {string} prop CSS property name
 * @returns {number|undefined} Numeric value
 * @private
 */
function readNumberValue(style: CanvasThemeSelectorStyle, prop: string): number | undefined {
	const value = getStyleValue(style, prop);
	const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));

	return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * Read paint opacity from selector style declaration.
 * @param {object} style Style declaration object
 * @returns {number|undefined} Paint opacity
 * @private
 */
function readPaintOpacityValue(style: CanvasThemeSelectorStyle): number | undefined {
	const opacity = readNumberValue(style, "opacity");
	const fillOpacity = readNumberValue(style, "fill-opacity");

	return opacity === undefined && fillOpacity === undefined ?
		undefined :
		(opacity ?? 1) * (fillOpacity ?? 1);
}

/**
 * Read dash array from selector style declaration.
 * @param {object} style Style declaration object
 * @returns {Array|undefined} Dash array
 * @private
 */
function readDashArrayValue(style: CanvasThemeSelectorStyle): number[] | undefined {
	const value = getStyleValue(style, "stroke-dasharray");
	const dashArray = value == null ? [] : toDashArray(value as string | number[]);

	return dashArray.length ? dashArray : undefined;
}

/**
 * Read font shorthand from selector style declaration.
 * @param {object} style Style declaration object
 * @returns {string|undefined} Font shorthand
 * @private
 */
function readFontValue(style: CanvasThemeSelectorStyle): string | undefined {
	const font = getStyleValue(style, "font");

	if (font != null && String(font).trim()) {
		return String(font).trim();
	}

	const fontSize = getStyleValue(style, "font-size");
	const fontFamily = getStyleValue(style, "font-family");

	if (fontSize == null || fontFamily == null) {
		return undefined;
	}

	const size = String(fontSize).trim();
	const family = String(fontFamily).trim();

	if (!size || !family) {
		return undefined;
	}

	const fontStyle = String(getStyleValue(style, "font-style") ?? "").trim();
	const fontVariant = String(getStyleValue(style, "font-variant") ?? "").trim();
	const fontWeight = String(getStyleValue(style, "font-weight") ?? "").trim();
	const lineHeight = String(getStyleValue(style, "line-height") ?? "").trim();

	return [
		fontStyle && fontStyle !== "normal" ? fontStyle : "",
		fontVariant && fontVariant !== "normal" ? fontVariant : "",
		fontWeight && !/^(normal|400)$/.test(fontWeight) ? fontWeight : "",
		lineHeight && lineHeight !== "normal" ? `${size}/${lineHeight}` : size,
		family
	].filter(Boolean).join(" ");
}

/**
 * Merge selector style values to a canvas theme section.
 * @param {object} target Theme override target
 * @param {string} section Theme section name
 * @param {object} values Theme section values
 * @private
 */
function mergeThemeSection(
	target: CanvasThemeDeepPartial<CanvasThemeStyle>,
	section: keyof CanvasThemeStyle,
	values: Record<string, any>
): void {
	const override = Object.keys(values).reduce((acc, key) => {
		values[key] !== undefined && (acc[key] = values[key]);
		return acc;
	}, {});

	if (Object.keys(override).length) {
		target[section] = mergeObj(target[section] ?? {}, override);
	}
}

/**
 * Normalize a supported SVG selector for canvas theme matching.
 * @param {string} selector SVG selector
 * @returns {Array} Normalized selector list
 * @private
 */
function normalizeThemeSelectors(selector: string): string[] {
	return selector.split(",")
		.map(value =>
			value.trim()
				.replace(/\s*>\s*/g, " ")
				.replace(/\s+/g, " ")
				.replace(/^(?:svg)?\.bb\s+/, "")
				.replace(/(^|\s)(?:g|path|rect|line|text|circle)\./g, "$1.")
		)
		.filter(Boolean);
}

/**
 * Apply one selector style declaration to canvas theme override.
 * @param {object} target Theme override target
 * @param {string} selector SVG selector
 * @param {object} style Style declaration object
 * @private
 */
function applySelectorStyle(
	target: CanvasThemeDeepPartial<CanvasThemeStyle>,
	selector: string,
	style: CanvasThemeSelectorStyle
): void {
	switch (selector) {
		case ".bb-axis path.domain":
		case ".bb-axis .domain":
		case ".bb-axis-x path.domain":
		case ".bb-axis-x .domain":
		case ".bb-axis-y path.domain":
		case ".bb-axis-y .domain":
		case ".bb-axis-y2 path.domain":
		case ".bb-axis-y2 .domain":
			mergeThemeSection(target, "axis", {
				lineColor: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-axis line":
		case ".bb-axis .tick line":
		case ".bb-axis-x line":
		case ".bb-axis-x .tick line":
		case ".bb-axis-y line":
		case ".bb-axis-y .tick line":
		case ".bb-axis-y2 line":
		case ".bb-axis-y2 .tick line":
			mergeThemeSection(target, "axis", {
				tickColor: readColorValue(style, "stroke"),
				tickWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-axis text":
		case ".bb-axis .tick text": {
			const font = readFontValue(style);

			mergeThemeSection(target, "axis", {
				labelColor: readColorValue(style, "fill"),
				xTickFont: font,
				yTickFont: font,
				y2TickFont: font
			});
			break;
		}
		case ".bb-axis-x text":
		case ".bb-axis-x .tick text":
			mergeThemeSection(target, "axis", {
				labelColor: readColorValue(style, "fill"),
				xTickFont: readFontValue(style)
			});
			break;
		case ".bb-axis-y text":
		case ".bb-axis-y .tick text":
			mergeThemeSection(target, "axis", {
				labelColor: readColorValue(style, "fill"),
				yTickFont: readFontValue(style)
			});
			break;
		case ".bb-axis-y2 text":
		case ".bb-axis-y2 .tick text":
			mergeThemeSection(target, "axis", {
				labelColor: readColorValue(style, "fill"),
				y2TickFont: readFontValue(style)
			});
			break;
		case ".tick._active_ text":
		case ".bb-axis .tick._active_ text":
		case ".bb-axis-x .tick._active_ text":
			mergeThemeSection(target, "axis", {
				activeLabelColor: readColorValue(style, "fill")
			});
			break;
		case ".bb-axis-x-label":
		case ".bb-axis-x .bb-axis-x-label":
			mergeThemeSection(target, "axis", {
				labelFont: readFontValue(style),
				xLabelColor: readColorValue(style, "fill")
			});
			break;
		case ".bb-axis-y-label":
		case ".bb-axis-y .bb-axis-y-label":
			mergeThemeSection(target, "axis", {
				labelFont: readFontValue(style),
				yLabelColor: readColorValue(style, "fill")
			});
			break;
		case ".bb-axis-y2-label":
		case ".bb-axis-y2 .bb-axis-y2-label":
			mergeThemeSection(target, "axis", {
				labelFont: readFontValue(style),
				y2LabelColor: readColorValue(style, "fill")
			});
			break;
		case ".bb-grid line":
		case ".bb-grid .bb-xgrid":
		case ".bb-grid .bb-ygrid":
		case ".bb-xgrid":
		case ".bb-ygrid":
			mergeThemeSection(target, "grid", {
				lineColor: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width"),
				dashArray: readDashArrayValue(style)
			});
			break;
		case ".bb-grid text":
			mergeThemeSection(target, "grid", {
				labelColor: readColorValue(style, "fill"),
				labelFont: readFontValue(style)
			});
			break;
		case ".bb-xgrid-focus line":
		case ".bb-grid .bb-xgrid-focus line":
		case ".bb-grid .bb-xgrid-focus":
			mergeThemeSection(target, "focusGrid", {
				lineColor: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width"),
				dashArray: readDashArrayValue(style)
			});
			break;
		case ".bb-region rect":
		case ".bb-region":
			mergeThemeSection(target, "region", {
				fill: readColorValue(style, "fill"),
				opacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-region text":
			mergeThemeSection(target, "region", {
				labelColor: readColorValue(style, "fill"),
				labelFont: readFontValue(style)
			});
			break;
		case ".bb-bar":
			mergeThemeSection(target, "shape", {
				barOpacity: readPaintOpacityValue(style),
				barStrokeColor: readColorValue(style, "stroke"),
				barLineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-bar._expanded_":
			mergeThemeSection(target, "shape", {
				barExpandedOpacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-candlestick":
			mergeThemeSection(target, "shape", {
				candlestickStrokeColor: readColorValue(style, "stroke"),
				candlestickLineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-candlestick._expanded_":
			mergeThemeSection(target, "shape", {
				candlestickExpandedOpacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-line":
			mergeThemeSection(target, "shape", {
				barConnectLineColor: readColorValue(style, "stroke"),
				barConnectLineWidth: readNumberValue(style, "stroke-width"),
				lineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-target.bb-focused .bb-line":
		case ".bb-target.bb-focused path.bb-line":
			mergeThemeSection(target, "shape", {
				lineFocusedWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-target.bb-defocused":
			mergeThemeSection(target, "shape", {
				targetDefocusedOpacity: readNumberValue(style, "opacity")
			});
			break;
		case ".bb-area":
			mergeThemeSection(target, "shape", {
				areaOpacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-circle":
			mergeThemeSection(target, "shape", {
				pointFillColor: readColorValue(style, "fill"),
				pointStrokeColor: readColorValue(style, "stroke"),
				pointLineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-selected-circle":
			mergeThemeSection(target, "selectedPoint", {
				fill: readColorValue(style, "fill"),
				stroke: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-circle._expanded_":
			mergeThemeSection(target, "focusPoint", {
				fill: readColorValue(style, "fill"),
				stroke: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-zoom-brush":
			mergeThemeSection(target, "zoomBrush", {
				fill: readColorValue(style, "fill"),
				opacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-brush .extent":
		case ".bb-brush .selection":
			mergeThemeSection(target, "subchartBrush", {
				fill: readColorValue(style, "fill"),
				opacity: readPaintOpacityValue(style)
			});
			break;
		case ".bb-brush .handle--custom":
			mergeThemeSection(target, "subchartBrush", {
				handleFill: readColorValue(style, "fill"),
				handleOpacity: readPaintOpacityValue(style),
				handleStroke: readColorValue(style, "stroke"),
				handleLineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-chart-treemaps rect":
		case ".bb-chart-treemaps":
			mergeThemeSection(target, "treemap", {
				stroke: readColorValue(style, "stroke"),
				lineWidth: readNumberValue(style, "stroke-width")
			});
			break;
		case ".bb-text.bb-empty":
		case ".bb-text .bb-empty":
		case ".bb-empty":
			mergeThemeSection(target, "emptyLabel", {
				color: readColorValue(style, "fill"),
				font: readFontValue(style)
			});
			break;
		case ".bb-text":
			mergeThemeSection(target, "label", {
				color: readColorValue(style, "fill"),
				font: readFontValue(style)
			});
			break;
		case ".bb-title":
			mergeThemeSection(target, "title", {
				color: readColorValue(style, "fill"),
				font: readFontValue(style)
			});
			break;
	}
}

/**
 * Convert selector based canvas theme overrides to renderer theme slots.
 * @param {object} selectors Selector style declarations
 * @returns {object} Canvas theme override
 * @private
 */
function getSelectorThemeOverride(
	selectors?: CanvasThemeSelectorMap
): CanvasThemeDeepPartial<CanvasThemeStyle> {
	const override: CanvasThemeDeepPartial<CanvasThemeStyle> = {};

	Object.keys(selectors ?? {}).forEach(selector => {
		normalizeThemeSelectors(selector).forEach(normalizedSelector => {
			applySelectorStyle(override, normalizedSelector, selectors![selector]);
		});
	});

	return override;
}

/**
 * Resolve user canvas theme override.
 * @param {object} userOverride Canvas theme override
 * @returns {object} Canvas theme override
 * @private
 */
function getThemeOverride(
	userOverride?: CanvasThemeOverride
): CanvasThemeDeepPartial<CanvasThemeStyle> {
	if (!userOverride) {
		return {};
	}

	const {selectors, ...styleOverride} = userOverride;

	return mergeObj({}, getSelectorThemeOverride(selectors), styleOverride);
}

/**
 * Build a stable enough cache key for theme reloads.
 * @param {HTMLElement} container Chart container
 * @param {object} userOverride Canvas theme override
 * @returns {string|null} Cache key
 * @private
 */
function getThemeCacheKey(
	container: HTMLElement,
	userOverride?: CanvasThemeOverride
): string | null {
	try {
		return JSON.stringify({
			className: container.className,
			style: container.getAttribute("style") || "",
			override: userOverride || null
		});
	} catch {
		return null;
	}
}

/**
 * Resolve canvas drawing styles from the existing SVG CSS theme.
 * @private
 */
export default class CanvasTheme {
	public style!: CanvasThemeStyle;
	private cacheContainer: HTMLElement | null = null;
	private cacheKey: string | null = null;

	/**
	 * Read theme values from temporary SVG probes.
	 * @param {HTMLElement} container Chart container
	 * @param {object} userOverride Canvas theme override
	 * @private
	 */
	load(container: HTMLElement, userOverride?: CanvasThemeOverride): void {
		const svg = document.createElementNS(SVG_NS, "svg");

		svg.setAttribute("class", "bb");
		svg.style.cssText =
			"position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;overflow:hidden";
		container.appendChild(svg);

		const read = (el: SVGElement, props: string[]): Record<string, string> => {
			const style = window.getComputedStyle(el);
			const values: Record<string, string> = {};

			for (const prop of props) {
				values[prop] = prop === "font" ?
					toFont(style, "") :
					style.getPropertyValue(prop).trim();
			}

			return values;
		};

		const probe = (tag: string, cls: string, props: string[]): Record<string, string> => {
			const el = document.createElementNS(SVG_NS, tag);

			el.setAttribute("class", cls);
			svg.appendChild(el);

			const value = read(el, props);

			svg.removeChild(el);

			return value;
		};

		const probeIn = (
			parentCls: string,
			tag: string,
			cls: string,
			props: string[]
		): Record<string, string> => {
			const parent = document.createElementNS(SVG_NS, "g");
			const el = document.createElementNS(SVG_NS, tag);

			parent.setAttribute("class", parentCls);
			cls && el.setAttribute("class", cls);
			parent.appendChild(el);
			svg.appendChild(parent);

			const value = read(el, props);

			svg.removeChild(parent);

			return value;
		};

		const probeInNested = (
			parentCls: string,
			groupCls: string,
			tag: string,
			cls: string,
			props: string[]
		): Record<string, string> => {
			const parent = document.createElementNS(SVG_NS, "g");
			const group = document.createElementNS(SVG_NS, "g");
			const el = document.createElementNS(SVG_NS, tag);

			parent.setAttribute("class", parentCls);
			group.setAttribute("class", groupCls);
			cls && el.setAttribute("class", cls);
			group.appendChild(el);
			parent.appendChild(group);
			svg.appendChild(parent);

			const value = read(el, props);

			svg.removeChild(parent);

			return value;
		};

		const probeTick = (
			axisCls: string,
			tag: string,
			props: string[],
			tickCls = ""
		): Record<string, string> => {
			const axis = document.createElementNS(SVG_NS, "g");
			const tick = document.createElementNS(SVG_NS, "g");
			const el = document.createElementNS(SVG_NS, tag);

			axis.setAttribute("class", `bb-axis ${axisCls}`);
			tick.setAttribute("class", ["tick", tickCls].filter(Boolean).join(" "));
			el.textContent = tag === "text" ? "0" : "";
			tick.appendChild(el);
			axis.appendChild(tick);
			svg.appendChild(axis);

			const value = read(el, props);

			svg.removeChild(axis);

			return value;
		};
		const targetPointPaint = "rgb(1, 2, 3)";
		const probeTargetPoint = (
			cls: string,
			props: string[]
		): Record<string, string> => {
			const style = document.createElement("style");

			style.textContent = `
				.bb-shapes-canvas-probe .bb-circle {
					fill: ${targetPointPaint};
					stroke: ${targetPointPaint};
				}
			`;
			document.head.appendChild(style);

			try {
				return probeIn("bb-shapes bb-shapes-canvas-probe", "circle", cls, props);
			} finally {
				style.remove();
			}
		};

		const axisLine = probeIn("bb-axis bb-axis-x", "path", "domain", ["stroke", "stroke-width"]);
		const tickLine = probeTick("bb-axis-x", "line", ["stroke", "stroke-width"]);
		const xAxisText = probeTick("bb-axis-x", "text", ["fill", "font"]);
		const activeAxisText = probeTick("bb-axis-x", "text", ["fill"], "_active_");
		const axisText = probeTick("bb-axis-y", "text", ["fill", "font"]);
		const y2AxisText = probeTick("bb-axis-y2", "text", ["fill", "font"]);
		const xAxisLabel = probeIn(
			"bb-axis bb-axis-x",
			"text",
			"bb-axis-x-label",
			["fill", "font"]
		);
		const yAxisLabel = probeIn(
			"bb-axis bb-axis-y",
			"text",
			"bb-axis-y-label",
			["fill", "font"]
		);
		const y2AxisLabel = probeIn(
			"bb-axis bb-axis-y2",
			"text",
			"bb-axis-y2-label",
			["fill", "font"]
		);
		const plainCircle = probe("circle", "", ["fill", "stroke", "stroke-width"]);
		const gridLine = probeIn(
			"bb-grid",
			"line",
			"bb-ygrid",
			["stroke", "stroke-width", "stroke-dasharray"]
		);
		const gridText = probeIn("bb-grid", "text", "", ["fill", "font"]);
		const focusGridLine = probeInNested(
			"bb-grid",
			"bb-xgrid-focus",
			"line",
			"bb-xgrid-focus",
			["stroke", "stroke-width", "stroke-dasharray"]
		);
		const emptyLabel = probe("text", "bb-text bb-empty", ["fill", "font"]);
		const regionRect = probeIn("bb-region", "rect", "", ["fill", "fill-opacity"]);
		const regionLabel = probeIn("bb-region", "text", "", ["fill", "font"]);
		const bar = probe("path", "bb-bar", ["opacity", "fill-opacity", "stroke", "stroke-width"]);
		const barExpanded = probe("path", "bb-bar _expanded_", ["opacity", "fill-opacity"]);
		const candlestick = probe("path", "bb-candlestick", ["stroke", "stroke-width"]);
		const candlestickExpanded = probe("path", "bb-candlestick _expanded_", [
			"opacity",
			"fill-opacity"
		]);
		const line = probe("path", "bb-line", ["stroke-width"]);
		const focusedLine = probeIn("bb-target bb-focused", "path", "bb-line", ["stroke-width"]);
		const defocusedTarget = probe("g", "bb-target bb-defocused", ["opacity"]);
		const area = probe("path", "bb-area", ["opacity", "fill-opacity"]);
		const point = probe("circle", "bb-circle", ["fill", "stroke", "stroke-width"]);
		const selectedPoint = probe("circle", "bb-selected-circle", [
			"fill",
			"stroke",
			"stroke-width"
		]);
		const focusPoint = probeTargetPoint(
			"bb-circle _expanded_",
			["fill", "stroke", "stroke-width"]
		);
		const zoomBrush = probe("rect", "bb-zoom-brush", ["fill", "fill-opacity", "opacity"]);
		const subchartBrushExtent = probeIn("bb-brush", "rect", "extent", [
			"fill",
			"fill-opacity",
			"opacity"
		]);
		const subchartBrushSelection = probeIn("bb-brush", "rect", "selection", [
			"fill",
			"fill-opacity",
			"opacity"
		]);
		const subchartBrushHandle = probeIn("bb-brush", "path", "handle--custom", [
			"fill",
			"fill-opacity",
			"opacity",
			"stroke",
			"stroke-width"
		]);
		const treemap = probeIn("bb-chart-treemaps", "rect", "", ["stroke", "stroke-width"]);
		const label = probe("text", "bb-text", ["fill", "font"]);
		const title = probeIn("", "text", "bb-title", ["fill", "font"]);
		const zoomBrushFill = toColor(zoomBrush.fill, "#000");
		const zoomBrushOpacity = toNumber(zoomBrush["fill-opacity"] || zoomBrush.opacity, 0.1);
		const subchartBrushFill = toColor(
			subchartBrushSelection.fill,
			toColor(subchartBrushExtent.fill, zoomBrushFill)
		);
		const subchartBrushOpacity = toOptionalNumber(subchartBrushSelection["fill-opacity"], 1) ??
			toOptionalNumber(subchartBrushSelection.opacity, 1) ??
			toOptionalNumber(subchartBrushExtent["fill-opacity"], 1) ??
			toOptionalNumber(subchartBrushExtent.opacity, 1) ??
			zoomBrushOpacity;
		const subchartBrushHandleStroke = toColor(subchartBrushHandle.stroke, "transparent");
		const defaultStyle = {
			axis: {
				lineColor: toColor(axisLine.stroke, "#000"),
				lineWidth: toNumber(axisLine["stroke-width"], 1),
				tickColor: toColor(tickLine.stroke, toColor(axisLine.stroke, "#000")),
				tickWidth: toNumber(tickLine["stroke-width"],
					toNumber(axisLine["stroke-width"], 1)),
				labelFont: yAxisLabel.font || axisText.font || "10px sans-serif",
				xTickFont: xAxisText.font || axisText.font || "10px sans-serif",
				yTickFont: axisText.font || "10px sans-serif",
				y2TickFont: y2AxisText.font || axisText.font || "10px sans-serif",
				labelColor: toColor(axisText.fill, "#000"),
				xLabelColor: toColor(xAxisLabel.fill, toColor(xAxisText.fill, "#000")),
				yLabelColor: toColor(yAxisLabel.fill, toColor(axisText.fill, "#000")),
				y2LabelColor: toColor(y2AxisLabel.fill,
					toColor(yAxisLabel.fill, toColor(axisText.fill, "#000"))),
				activeLabelColor: toOptionalColor(activeAxisText.fill, xAxisText.fill) ||
					toColor(axisText.fill, "#000")
			},
			grid: {
				lineColor: toColor(gridLine.stroke, "#aaa"),
				lineWidth: toNumber(gridLine["stroke-width"], 1),
				dashArray: toDashArray(gridLine["stroke-dasharray"]),
				labelFont: gridText.font || axisText.font || "10px sans-serif",
				labelColor: toColor(gridText.fill, "#aaa")
			},
			focusGrid: {
				lineColor: toColor(focusGridLine.stroke, toColor(gridLine.stroke, "#aaa")),
				lineWidth: toNumber(
					focusGridLine["stroke-width"],
					toNumber(gridLine["stroke-width"], 1)
				),
				dashArray: toDashArray(
					focusGridLine["stroke-dasharray"] || gridLine["stroke-dasharray"]
				)
			},
			emptyLabel: {
				font: emptyLabel.font || label.font || axisText.font || "20px sans-serif",
				color: toColor(emptyLabel.fill, "#808080")
			},
			region: {
				fill: toColor(regionRect.fill, "steelblue"),
				opacity: toNumber(regionRect["fill-opacity"], 0.1),
				labelFont: regionLabel.font || axisText.font || "10px sans-serif",
				labelColor: toColor(regionLabel.fill, "#000")
			},
			shape: {
				barOpacity: toPaintOpacity(bar, 1),
				barExpandedOpacity: toNumber(
					toPaintOpacity(barExpanded, toPaintOpacity(bar, 1)),
					toPaintOpacity(bar, 1)
				),
				barStrokeColor: toColor(bar.stroke, "#000"),
				barLineWidth: toNumber(bar["stroke-width"], 0),
				barConnectLineColor: toColor(line.stroke, "#000"),
				barConnectLineWidth: toNumber(line["stroke-width"], 1),
				candlestickStrokeColor: toColor(candlestick.stroke, "#000"),
				candlestickLineWidth: toNumber(candlestick["stroke-width"], 1),
				candlestickExpandedOpacity: toNumber(
					toPaintOpacity(candlestickExpanded, 1),
					1
				),
				lineWidth: toNumber(line["stroke-width"], 1),
				lineFocusedWidth: toNumber(focusedLine["stroke-width"], 2),
				areaOpacity: toPaintOpacity(area, 0.2),
				targetDefocusedOpacity: toNumber(defocusedTarget.opacity, 0.3),
				pointFillColor: toOptionalColor(point.fill, plainCircle.fill),
				pointStrokeColor: toOptionalColor(point.stroke, plainCircle.stroke),
				pointLineWidth: toOptionalNumber(point["stroke-width"], plainCircle["stroke-width"])
			},
			selectedPoint: {
				fill: toColor(selectedPoint.fill, "#fff"),
				stroke: toOptionalColor(selectedPoint.stroke),
				lineWidth: toNumber(selectedPoint["stroke-width"], 2)
			},
			focusPoint: {
				fill: toOptionalColor(focusPoint.fill, targetPointPaint),
				stroke: toOptionalColor(focusPoint.stroke, targetPointPaint),
				lineWidth: toNumber(focusPoint["stroke-width"], 1)
			},
			zoomBrush: {
				fill: zoomBrushFill,
				opacity: zoomBrushOpacity
			},
			subchartBrush: {
				fill: subchartBrushFill,
				opacity: subchartBrushOpacity,
				handleFill: toColor(subchartBrushHandle.fill, "transparent"),
				handleOpacity: toPaintOpacity(subchartBrushHandle, 1),
				handleStroke: subchartBrushHandleStroke,
				handleLineWidth: toNumber(
					subchartBrushHandle["stroke-width"],
					subchartBrushHandleStroke === "transparent" ? 0 : 1
				)
			},
			treemap: {
				stroke: toColor(treemap.stroke, "#fff"),
				lineWidth: toNumber(treemap["stroke-width"], 1)
			},
			label: {
				font: label.font || axisText.font || "10px sans-serif",
				color: toColor(label.fill, "#000")
			},
			title: {
				font: title.font || label.font || axisText.font || "14px sans-serif",
				color: toColor(title.fill, "#000")
			}
		};
		const themeOverride = getThemeOverride(userOverride);
		const style = mergeObj(defaultStyle, themeOverride);
		const userAxisOverride = userOverride?.axis as
			| CanvasThemeDeepPartial<CanvasThemeStyle["axis"]>
			| undefined;
		const hasUserAxisLabelColor = !!userAxisOverride &&
			Object.prototype.hasOwnProperty.call(userAxisOverride, "labelColor");
		const hasUserAxisLabelFont = !!userAxisOverride &&
			Object.prototype.hasOwnProperty.call(userAxisOverride, "labelFont");

		style.axis.lineWidth = toNumber(style.axis.lineWidth, defaultStyle.axis.lineWidth);
		style.axis.tickWidth = toNumber(style.axis.tickWidth, style.axis.lineWidth);
		if (hasUserAxisLabelFont) {
			const axisOverride = userAxisOverride!;
			const labelFont = style.axis.labelFont;

			axisOverride.xTickFont === undefined && (style.axis.xTickFont = labelFont);
			axisOverride.yTickFont === undefined && (style.axis.yTickFont = labelFont);
			axisOverride.y2TickFont === undefined && (style.axis.y2TickFont = labelFont);
		}
		style.axis.labelFont = style.axis.labelFont || defaultStyle.axis.labelFont;
		style.axis.xTickFont = style.axis.xTickFont || style.axis.labelFont;
		style.axis.yTickFont = style.axis.yTickFont || style.axis.labelFont;
		style.axis.y2TickFont = style.axis.y2TickFont || style.axis.yTickFont;
		style.axis.labelColor = toColor(style.axis.labelColor, defaultStyle.axis.labelColor);
		if (hasUserAxisLabelColor) {
			const labelColor = style.axis.labelColor;

			userAxisOverride.xLabelColor === undefined && (style.axis.xLabelColor = labelColor);
			userAxisOverride.yLabelColor === undefined && (style.axis.yLabelColor = labelColor);
			userAxisOverride.y2LabelColor === undefined && (style.axis.y2LabelColor = labelColor);
		}
		style.axis.xLabelColor = toColor(style.axis.xLabelColor, style.axis.labelColor);
		style.axis.yLabelColor = toColor(style.axis.yLabelColor, style.axis.labelColor);
		style.axis.y2LabelColor = toColor(style.axis.y2LabelColor, style.axis.yLabelColor);
		style.axis.activeLabelColor = toColor(style.axis.activeLabelColor, style.axis.labelColor);
		style.grid.lineWidth = toNumber(style.grid.lineWidth, defaultStyle.grid.lineWidth);
		style.grid.dashArray = toDashArray(style.grid.dashArray);
		style.focusGrid.lineWidth = toNumber(
			style.focusGrid.lineWidth,
			defaultStyle.focusGrid.lineWidth
		);
		style.focusGrid.dashArray = toDashArray(style.focusGrid.dashArray);
		style.region.opacity = toNumber(style.region.opacity, defaultStyle.region.opacity);
		style.shape.barOpacity = toNumber(style.shape.barOpacity, defaultStyle.shape.barOpacity);
		style.shape.barExpandedOpacity = toNumber(
			style.shape.barExpandedOpacity,
			style.shape.barOpacity
		);
		style.shape.barLineWidth = toNumber(
			style.shape.barLineWidth,
			defaultStyle.shape.barLineWidth
		);
		style.shape.barConnectLineWidth = toNumber(
			style.shape.barConnectLineWidth,
			defaultStyle.shape.barConnectLineWidth
		);
		style.shape.candlestickLineWidth = toNumber(
			style.shape.candlestickLineWidth,
			defaultStyle.shape.candlestickLineWidth
		);
		style.shape.candlestickStrokeColor = toColor(
			style.shape.candlestickStrokeColor,
			defaultStyle.shape.candlestickStrokeColor
		);
		style.shape.candlestickExpandedOpacity = toNumber(
			style.shape.candlestickExpandedOpacity,
			defaultStyle.shape.candlestickExpandedOpacity
		);
		style.shape.lineWidth = toNumber(style.shape.lineWidth, defaultStyle.shape.lineWidth);
		style.shape.lineFocusedWidth = toNumber(
			style.shape.lineFocusedWidth,
			defaultStyle.shape.lineFocusedWidth
		);
		style.shape.areaOpacity = toNumber(style.shape.areaOpacity, defaultStyle.shape.areaOpacity);
		style.shape.targetDefocusedOpacity = toNumber(
			style.shape.targetDefocusedOpacity,
			defaultStyle.shape.targetDefocusedOpacity
		);
		style.shape.pointLineWidth = toOptionalNumber(style.shape.pointLineWidth);
		style.selectedPoint.lineWidth = toNumber(
			style.selectedPoint.lineWidth,
			defaultStyle.selectedPoint.lineWidth
		);
		style.focusPoint.lineWidth = toNumber(
			style.focusPoint.lineWidth,
			defaultStyle.focusPoint.lineWidth
		);
		style.zoomBrush.opacity = toNumber(style.zoomBrush.opacity, defaultStyle.zoomBrush.opacity);
		style.subchartBrush.opacity = toNumber(
			style.subchartBrush.opacity,
			defaultStyle.subchartBrush.opacity
		);
		style.subchartBrush.handleOpacity = toNumber(
			style.subchartBrush.handleOpacity,
			defaultStyle.subchartBrush.handleOpacity
		);
		style.subchartBrush.handleLineWidth = toNumber(
			style.subchartBrush.handleLineWidth,
			defaultStyle.subchartBrush.handleLineWidth
		);
		style.treemap.lineWidth = toNumber(style.treemap.lineWidth, defaultStyle.treemap.lineWidth);

		this.style = style;
		this.cacheContainer = container;
		this.cacheKey = getThemeCacheKey(container, userOverride);

		svg.remove();
	}

	/**
	 * Reload theme values after resize or option changes.
	 * @param {HTMLElement} container Chart container
	 * @param {object} userOverride Canvas theme override
	 * @private
	 */
	reload(container: HTMLElement, userOverride?: CanvasThemeOverride): void {
		const key = getThemeCacheKey(container, userOverride);

		if (
			key !== null &&
			this.style &&
			this.cacheContainer === container &&
			this.cacheKey === key
		) {
			return;
		}

		this.load(container, userOverride);
	}
}
