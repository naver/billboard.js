/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {$TEXT} from "../../config/classes";
import {
	getBBox,
	getBoundingRect,
	isFunction,
	isNumber,
	parseShorthand,
	tplProcess
} from "../../module/util";
import type {IArcData, IData, IDataRow} from "../data/IData";

type TCoord = {x: number, y: number};
type TAnchor = "start" | "middle" | "end";
type TImage = {url: string, width: number, height: number, pos: {x: number, y: number}} | null;
type TLabelThresholdType = "bar" | "donut" | "gauge" | "pie" | "polar" | "treemap";

/**
 * Get text-anchor according text.labels.rotate angle
 * @param {number} angle Angle value
 * @returns {string} Anchor string value
 * @private
 */
function getRotateAnchor(angle: number): TAnchor {
	let anchor: TAnchor = "middle";

	if (angle > 0 && angle <= 170) {
		anchor = "end";
	} else if (angle > 190 && angle <= 360) {
		anchor = "start";
	}

	return anchor;
}

/**
 * Set rotated position coordinate according text.labels.rotate angle
 * @param {object} d Data object
 * @param {object} pos Position object
 * @param {object} pos.x x coordinate
 * @param {object} pos.y y coordinate
 * @param {string} anchor string value
 * @param {boolean} isRotated If axis is rotated
 * @param {boolean} isInverted If axis is inverted
 * @returns {object} x, y coordinate
 * @private
 */
function setRotatePos(
	d: IDataRow,
	pos: TCoord,
	anchor: TAnchor,
	isRotated: boolean,
	isInverted: boolean
): TCoord {
	const $$ = this;
	const {value} = d;
	const isCandlestickType = $$.isCandlestickType(d);
	const isNegative = (isNumber(value) && value < 0) || (
		isCandlestickType && !$$.getCandlestickData(d)?._isUp
	);

	let {x, y} = pos;
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

	return {x, y};
}

/**
 * Get data.labels.position value
 * @param {object} d Data object
 * @param {string} type x | y
 * @returns {number} Position value
 * @private
 */
function getTextPos(d: IDataRow, type: string): number {
	const position = this.config.data_labels_position;
	const {id, index, value} = d;

	return (
		isFunction(position) ?
			position.bind(this.api)(type, value, id, index, this.$el.text) :
			(id in position ? position[id] : position)[type]
	) ?? 0;
}

/**
 * Update text border
 * @param {SVGTextElement} text Text element
 * @param {Coord} pos Position object
 * @param {string} rectClass Class name
 * @private
 */
function updateTextBorder(text: SVGTextElement, pos: TCoord, rectClass: string): void {
	const $$ = this;
	const {config, $T} = $$;
	const isRotated = config.axis_rotated;
	const {
		border: {
			padding = "3 5",
			radius = 10,
			stroke = "#000",
			strokeWidth = 1,
			fill = "none"
		}
	} = config.data_labels;

	const borderPadding = parseShorthand(padding);
	const applyStyle = config.data_labels.border !== true;
	const textRect = getBBox(text);
	let borderRect = d3Select(text.previousElementSibling) as any;

	if (
		borderRect.empty() ||
		borderRect.node()?.tagName !== "rect" ||
		!borderRect.attr("class")?.includes(rectClass)
	) {
		borderRect = d3Select(text.parentNode as Element)
			.insert("rect", () => text)
			.attr("class", `${$TEXT.textBorderRect} ${rectClass}`)
			.attr("width",
				textRect.width + (applyStyle ? borderPadding.left + borderPadding.right : 0))
			.attr("height",
				textRect.height + (applyStyle ? borderPadding.top + borderPadding.bottom : 0));

		if (applyStyle) {
			borderRect
				.style("fill", fill)
				.style("stroke", stroke)
				.style("stroke-width", `${strokeWidth}px`)
				.attr("rx", radius)
				.attr("ry", radius);
		}
	}

	$T(borderRect)
		.attr("x",
			pos.x - (applyStyle ? borderPadding.left : 0) - (isRotated ? 0 : textRect.width / 2))
		.attr("y", pos.y - (applyStyle ? borderPadding.top : 0) - (textRect.height / 4 * 3.2));
}

/**
 * Check if meets the ratio to show data label text
 * @param {number} ratio ratio to meet
 * @param {string} type chart type
 * @returns {boolean}
 * @private
 */
function meetsLabelThreshold(ratio: number = 0, type: TLabelThresholdType): boolean {
	const $$ = this;
	const {config} = $$;
	const threshold = config[`${type}_label_threshold`] || 0;

	return ratio >= threshold;
}

/**
 * Update text image
 * @private
 */
function updateTextImage(): void {
	const $$ = this;
	const {$el: {text}, config} = $$;
	const isArc = $$.state.arcWidth;

	if (isArc ? $$.getArcLabelConfig("image") : config.data_labels.image) {
		text.filter(function() {
			const prev = this.previousElementSibling;

			if (prev) {
				return prev.tagName !== "image" || !prev.classList.contains($TEXT.textLabelImage);
			}

			return true;
		}).each(function(d) {
			const {url, width, height, pos} = getDataLabelImgUrl.call($$, d);

			if (url) {
				const parentNode = d3Select(this.parentNode);

				// Insert image before text
				parentNode?.insert("image",
					`${this.getAttribute("class")?.replace(/(?:^(.)|\s)/g, ".$1") ?? "text"}`)
					.style("opacity", "0")
					.attr("href", (d: IData | IArcData) =>
						tplProcess(url, {
							ID: ("id" in d) ? d.id : d.data.id
						}))
					.attr("class", $TEXT.textLabelImage)
					.style("pointer-events", "none")
					.attr("width", width)
					.attr("height", height)
					.attr("transform", pos ? `translate(${pos.x ?? 0} ${pos.y ?? 0})` : null);
			}
		});
	}
}

/**
 * Get image URL for data label
 * @param {object} d Data object
 * @returns {string|null} Image URL
 * @private
 */
function getDataLabelImgUrl(
	d: IDataRow
): TImage | null {
	const $$ = this;
	const {config, state} = $$;
	const image = state.arcWidth ? $$.getArcLabelConfig("image") : config.data_labels.image;

	if (isFunction(image)) {
		return image.call($$.api, d.value, d.id, d.index) ?? {
			url: "",
			width: 0,
			height: 0,
			pos: {x: 0, y: 0}
		};
	} else if (image) {
		const {url = "", width = 0, height = 0, pos} = image;

		return {
			url,
			width,
			height,
			pos
		};
	}

	return null;
}

/**
 * Update text image position
 * @param {SVGTextElement} textNode Text element
 * @param {object} pos Position object
 * @param {number} pos.x X coordinate
 * @param {number} pos.y Y coordinate
 * @private
 */
function updateTextImagePos(textNode: SVGTextElement, pos: {x: number, y: number}): void {
	const $$ = this;
	const {config, state: {arcWidth, hasTreemap}} = $$;
	const isRotated = config.axis_rotated;
	const image = d3Select(textNode.previousElementSibling);
	const isShown = textNode => {
		const isShown = textNode.style.opacity !== "0" && textNode.style.fillOpacity !== "0";

		return (arcWidth ? textNode.textContent : isShown) &&
			this.previousElementSibling?.tagName !== "image";
	};

	if (!image.empty() && image.node()?.tagName === "image") {
		const textRect = getBoundingRect(textNode);
		const w = +image.attr("width") / 2;
		const h = +image.attr("height") / 2;
		let x = pos.x - w;
		let y = pos.y - h - textRect.height / 2;

		if (isRotated) {
			pos.x += w;
		} else {
			if (hasTreemap) {
				x = -w;
				y = -(h * 2 + textRect.height);
			}

			// exclude pie & polar type
			if (!($$.hasType("pie") || $$.hasType("polar"))) {
				pos.y += h;
			}
		}

		$$.$T(image)
			.style("opacity", isShown(textNode) ? null : "0")
			.attr("x", x)
			.attr("y", y);
	}
}

export {
	getRotateAnchor,
	getTextPos,
	meetsLabelThreshold,
	setRotatePos,
	updateTextBorder,
	updateTextImage,
	updateTextImagePos
};
