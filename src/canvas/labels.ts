/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isFunction, isNumber, isObject, isString, parseShorthand, tplProcess} from "../module/util";
import CanvasPainter, {CanvasRect} from "./CanvasPainter";
import {
	getFontSize,
	isCanvasBubbleType,
	isCanvasCandlestickType,
	isCanvasLineType,
	isCanvasScatterType
} from "./util";

// Canvas text has no DOM line box/getBBox. Use the common 1.2 line-height ratio so
// multiline data label decoration boxes stay close to SVG/CSS layout.
const LABEL_LINE_HEIGHT_RATIO = 1.2;

export type LabelDecorationBox = CanvasRect & {radius?: number};
export type LabelImageOption = {
	url: string,
	width: number,
	height: number,
	pos?: {x?: number, y?: number}
};
export type LabelImageCacheEntry = {image: HTMLImageElement, loaded: boolean, loading: boolean};
export type LabelImagePosition = {x: number, y: number, textX: number, textY: number};
export type LabelRotateAnchor = "start" | "middle" | "end";

/**
 * Get the data label value matching SVG label formatter input.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {number|object|Array|null} Data label value
 * @private
 */
export function getLabelValue($$, d) {
	let {value} = d;

	if ($$.isBubbleZType?.(d)) {
		value = $$.getBubbleZData(value, "z");
	} else if ($$.isCandlestickType?.(d)) {
		const data = $$.getCandlestickData?.(d);

		if (data) {
			value = data.close;
		}
	}

	return value;
}

/**
 * Convert a data label value into drawable text.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {string|null} Label text
 * @private
 */
export function getLabelText($$, d): string | null {
	const value = $$.dataLabelFormat(d.id)(getLabelValue($$, d), d.id, d.index, []);

	return value === null || value === undefined ? null : String(value);
}

/**
 * Get a stable key for data label caches.
 * @param {object} d Data row
 * @returns {string} Label key
 * @private
 */
export function getLabelRowKey(d): string {
	return `${d.id}:${d.index}`;
}

/**
 * Build a matcher for SVG-like _expanded_ bar type focus.
 * @param {object} $$ ChartInternal instance
 * @param {Array} selectedData Focused data rows
 * @param {function} typeFilter Canvas type filter
 * @returns {function} Focus matcher
 * @private
 */
export function getExpandedFocusMatcher($$, selectedData, typeFilter): (d) => boolean {
	if (!selectedData?.length) {
		return () => false;
	}

	if ($$.config.tooltip_grouped && selectedData.length > 1) {
		const index = selectedData[0]?.index;

		return d => index !== undefined && d.index === index && typeFilter($$, d);
	}

	const keys = new Set(
		selectedData
			.filter(d => d && typeFilter($$, d))
			.map(getLabelRowKey)
	);

	return d => keys.has(getLabelRowKey(d));
}

/**
 * Get data label position offset.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @param {string} type Coordinate type
 * @param {object} texts SVG-compatible text collection facade
 * @returns {number} Offset value
 * @private
 */
export function getLabelPosition($$, d, type: "x" | "y", texts): number {
	const position = $$.config.data_labels_position;
	let value;

	if (isFunction(position)) {
		value = position.bind($$.api)(type, getLabelValue($$, d), d.id, d.index, texts);
	} else if (position) {
		const targetPosition = d.id in position ? position[d.id] : position;

		value = targetPosition?.[type];
	}

	return isNumber(value) ? value : 0;
}

/**
 * Get image option for data label.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {object|null} Image option
 * @private
 */
export function getLabelImageOption($$, d): LabelImageOption | null {
	const option = $$.config.data_labels?.image;

	if (isFunction(option)) {
		return option.call($$.api, getLabelValue($$, d), d.id, d.index) ?? null;
	} else if (option) {
		const {url = "", width = 0, height = 0, pos} = option;

		return {url, width, height, pos};
	}

	return null;
}

/**
 * Get resolved image URL for a data label row.
 * @param {object} option Image option
 * @param {object} d Data row
 * @returns {string} Resolved image URL
 * @private
 */
export function getLabelImageUrl(option: LabelImageOption, d): string {
	return tplProcess(option.url, {
		ID: d.id
	});
}

/**
 * Get image and adjusted text position matching SVG label image placement.
 * @param {object} $$ ChartInternal instance
 * @param {object} option Image option
 * @param {string} text Label text
 * @param {number} x Text x coordinate
 * @param {number} y Text y coordinate
 * @param {object} d Data row
 * @returns {object} Image and text positions
 * @private
 */
export function getLabelImagePosition($$, option: LabelImageOption, text: string, x: number,
	y: number, d?): LabelImagePosition {
	const {width = 0, height = 0, pos} = option;
	const w = width / 2;
	const h = height / 2;
	const textHeight = getLabelDecorationBox($$.canvasEngine.ctx, text, x, y).h;
	const fontSize = getFontSize($$.canvasEngine.ctx.font);
	const imageX = x - w;
	const imageY = y - h - (
		$$.isTreemapType?.(d) ? fontSize * 0.7 : textHeight / 2
	);
	let textX = x;
	let textY = y;

	if ($$.config.axis_rotated) {
		textX += w;
	} else {
		textY += h;
	}

	return {
		x: imageX + (pos?.x ?? 0),
		y: imageY + (pos?.y ?? 0),
		textX,
		textY
	};
}

/**
 * Get canvas fill style for data label text.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @param {string} fallback Fallback color
 * @returns {string} Canvas fill style
 * @private
 */
export function getLabelColor($$, d, fallback: string): string {
	const color = $$.updateTextColor?.(d);

	return typeof color === "string" ?
		color :
		($$.isTreemapType?.(d) ? fallback : ($$.color?.(d) || fallback));
}

/**
 * Get canvas fill style for data label background.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @returns {string|null} Canvas fill style
 * @private
 */
export function getLabelBackgroundColor($$, d): string | null {
	const option = $$.config.data_labels_backgroundColors;

	if (!option) {
		return null;
	}

	if (isString(option)) {
		return option;
	}

	if (isFunction(option)) {
		const defaultColor = $$.color?.(d);
		const color = option.bind($$.api)(defaultColor, d);

		return color === null || color === undefined ? null : String(color);
	}

	const color = option[d.id];

	return color === null || color === undefined ? null : String(color);
}

/**
 * Get normalized canvas data label border option.
 * @param {object|boolean} border Border option
 * @returns {object|null} Border option
 * @private
 */
export function getLabelBorderOption(border) {
	if (!border) {
		return null;
	}

	const option = isObject(border) ? border : {};

	return {
		padding: parseShorthand(option.padding ?? "3 5"),
		radius: isNumber(option.radius) ? option.radius : 10,
		stroke: option.stroke ?? "#000",
		strokeWidth: isNumber(option.strokeWidth) ? option.strokeWidth : 1,
		fill: option.fill ?? "none"
	};
}

/**
 * Measure the canvas rectangle needed behind a data label.
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {string} text Label text
 * @param {number} x Label x coordinate
 * @param {number} y Label y coordinate
 * @param {object} padding Padding values
 * @returns {object} Canvas rectangle
 * @private
 */
export function getLabelDecorationBox(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	padding = {top: 0, right: 0, bottom: 0, left: 0}
): LabelDecorationBox {
	const lines = text.split("\n");
	const metrics = lines.map(line => ctx.measureText(line));
	const width = Math.max(...metrics.map(metric => metric.width), 0);
	const fontSize = getFontSize(ctx.font);
	const lineHeight = fontSize * LABEL_LINE_HEIGHT_RATIO;
	const fontBoundingHeight = metrics[0] ?
		(metrics[0].fontBoundingBoxAscent || 0) + (metrics[0].fontBoundingBoxDescent || 0) :
		0;
	const baselineDescent = metrics[0] ?
		metrics[0].fontBoundingBoxDescent || metrics[0].actualBoundingBoxDescent || 0 :
		0;
	const height = lines.length > 1 ? lineHeight * lines.length : Math.max(
		fontSize,
		fontBoundingHeight,
		metrics[0]?.actualBoundingBoxAscent + metrics[0]?.actualBoundingBoxDescent || 0
	);
	let textX = x;
	let textY = y;

	if (ctx.textAlign === "center") {
		textX -= width / 2;
	} else if (ctx.textAlign === "right" || ctx.textAlign === "end") {
		textX -= width;
	}

	if (ctx.textBaseline === "middle") {
		textY -= height / 2;
	} else if (ctx.textBaseline === "alphabetic") {
		textY -= height - baselineDescent;
	} else if (
		ctx.textBaseline === "bottom" ||
		ctx.textBaseline === "ideographic"
	) {
		textY -= height;
	}

	return {
		x: textX - padding.left,
		y: textY - padding.top,
		w: width + padding.left + padding.right,
		h: height + padding.top + padding.bottom
	};
}

/**
 * Draw data label background and border before drawing text.
 * @param {object} $$ ChartInternal instance
 * @param {CanvasPainter} painter Canvas painter
 * @param {object} d Data row
 * @param {string} text Label text
 * @param {number} x Label x coordinate
 * @param {number} y Label y coordinate
 * @private
 */
export function drawLabelDecorations($$, painter: CanvasPainter, d, text: string, x: number,
	y: number): void {
	const ctx = painter.context;
	const backgroundColor = getLabelBackgroundColor($$, d);
	const border = getLabelBorderOption($$.config.data_labels?.border);
	const padding = border?.padding ?? {top: 0, right: 0, bottom: 0, left: 0};
	const box = getLabelDecorationBox(ctx, text, x, y, padding);
	const angle = $$.config.data_labels.rotate;

	painter.withState(canvas => {
		if (angle) {
			canvas.translate(x, y);
			canvas.rotate(angle * Math.PI / 180);
			box.x -= x;
			box.y -= y;
		}

		if (backgroundColor) {
			painter.fillRoundRect(box, border?.radius ?? 0, {fill: backgroundColor});
		}

		if (border) {
			if (border.fill !== "none") {
				painter.fillRoundRect(box, border.radius, {fill: border.fill});
			}

			painter.strokeRoundRect(box, border.radius, {
				stroke: border.stroke,
				lineWidth: border.strokeWidth
			});
		}
	});
}

/**
 * Get SVG-compatible text anchor for rotated data labels.
 * @param {number} angle Rotation angle
 * @returns {string} Anchor string
 * @private
 */
export function getLabelRotateAnchor(angle: number): LabelRotateAnchor {
	let anchor: LabelRotateAnchor = "middle";

	if (angle > 0 && angle <= 170) {
		anchor = "end";
	} else if (angle > 190 && angle <= 360) {
		anchor = "start";
	}

	return anchor;
}

/**
 * Map SVG text-anchor to canvas text alignment.
 * @param {string} anchor SVG-compatible anchor
 * @returns {string} Canvas text alignment
 * @private
 */
export function getCanvasTextAlign(anchor: LabelRotateAnchor): CanvasTextAlign {
	return anchor === "start" ? "left" : (anchor === "end" ? "right" : "center");
}

/**
 * Resolve rotated data label position using the same offset rules as SVG text.
 * @param {object} $$ ChartInternal instance
 * @param {object} d Data row
 * @param {number} x Label x coordinate
 * @param {number} y Label y coordinate
 * @returns {object} Adjusted label position and alignment
 * @private
 */
export function getRotatedLabelPosition($$, d, x: number,
	y: number): {x: number, y: number, textAlign: CanvasTextAlign} {
	const anchor = getLabelRotateAnchor($$.config.data_labels.rotate);
	const isRotated = $$.config.axis_rotated;
	const isInverted = $$.config[`axis_${$$.axis?.getId(d.id)}_inverted`];
	const isCandlestickType = isCanvasCandlestickType($$, d);
	const {value} = d;
	const isNegative = (isNumber(value) && value < 0) || (
		isCandlestickType && !$$.getCandlestickData?.(d)?._isUp
	);
	const gap = 4;
	const doubleGap = gap * 2;

	if (isRotated) {
		if (anchor === "start") {
			x += isNegative ? 0 : doubleGap;
			y += gap;
		} else if (anchor === "middle") {
			x += doubleGap;
			y -= doubleGap;
		} else if (anchor === "end") {
			isNegative && (x -= doubleGap);
			y += gap;
		}
	} else {
		if (anchor === "start") {
			x += gap;
			isNegative && (y += doubleGap * 2);
		} else if (anchor === "middle") {
			y -= doubleGap;
		} else if (anchor === "end") {
			x -= gap;
			isNegative && (y += doubleGap * 2);
		}

		if (isInverted) {
			y += isNegative ? -17 : (isCandlestickType ? 13 : 7);
		}
	}

	return {
		x,
		y,
		textAlign: getCanvasTextAlign(anchor)
	};
}

/**
 * Resolve point-like data label anchor and canvas text alignment.
 * @param {object} $$ ChartInternal instance
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {object} d Data row
 * @param {number} x Point x coordinate
 * @param {number} y Point y coordinate
 * @returns {object} Label anchor
 * @private
 */
export function getPointLabelAnchor($$, ctx: CanvasRenderingContext2D, d, x: number,
	y: number): {x: number, y: number} {
	if ($$.config.axis_rotated) {
		x += 6;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
	} else if (isCanvasBubbleType($$, d)) {
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
	} else {
		const {config, state} = $$;
		const isInverted = config[`axis_${$$.axis?.getId(d.id)}_inverted`];
		const isNegative = d.value < 0 ||
			(d.value === 0 && !state.hasPositiveValue && state.hasNegativeValue);
		let baseY = 3;

		if (
			isNumber(config.point_r) &&
			config.point_r > 5 &&
			(isCanvasLineType($$, d) || isCanvasScatterType($$, d))
		) {
			baseY += config.point_r / 2.3;
		}

		ctx.textAlign = "center";

		if (isInverted ? !isNegative : isNegative) {
			y += baseY;
			ctx.textBaseline = "top";
		} else {
			y -= baseY * 2;
			ctx.textBaseline = "bottom";
		}
	}

	return {x, y};
}
