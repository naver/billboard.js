/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select, selectAll as d3SelectAll} from "d3-selection";
import type {AxisType, d3Selection} from "../../../types/types";
import {$COMMON, $TEXT} from "../../config/classes";
import {KEY} from "../../module/Cache";
import {
	capitalize,
	getBBox,
	getBoundingRect,
	getRandom,
	getTranslation,
	isFunction,
	isNumber,
	isObject,
	isString,
	setTextValue
} from "../../module/util";
import type {IArcData, IDataRow} from "../data/IData";
import {
	batchGetBBox,
	getRotateAnchor,
	getTextPos,
	meetsLabelThreshold,
	setRotatePos,
	updateTextBorder,
	updateTextImage,
	updateTextImagePos
} from "./text.util";

export default {
	opacityForText(d): null | "0" {
		const $$ = this;

		return $$.isBarType(d) &&
				!meetsLabelThreshold.call($$, Math.abs($$.getRatio("bar", d)), "bar") ?
			"0" :
			($$.hasDataLabel ? null : "0");
	},

	/**
	 * Initializes the text
	 * @private
	 */
	initText(): void {
		const {$el} = this;

		$el.main.select(`.${$COMMON.chart}`).append("g")
			.attr("class", $TEXT.chartTexts)
			.style("pointer-events", $el.funnel || $el.treemap ? "none" : null);
	},

	/**
	 * Update chartText
	 * @param {object} targets $$.data.targets
	 * @private
	 */
	updateTargetsForText(targets): void {
		const $$ = this;
		const classChartText = $$.getChartClass("Text");
		const classTexts = $$.getClass("texts", "id");

		const classFocus = $$.classFocus.bind($$);
		const mainTextUpdate = $$.$el.main.select(`.${$TEXT.chartTexts}`)
			.selectAll(`.${$TEXT.chartText}`)
			.data($$.filterNullish(targets))
			.attr("class", d => `${classChartText(d)}${classFocus(d)}`.trim());

		const mainTextEnter = mainTextUpdate.enter().append("g")
			.style("opacity", "0")
			.attr("class", classChartText)
			.call(
				$$.setCssRule(true, ` .${$TEXT.text}`, ["fill", "pointer-events:none"],
					$$.updateTextColor)
			);

		mainTextEnter.append("g")
			.attr("class", classTexts);
	},

	/**
	 * Update text
	 * @private
	 */
	updateText(): void {
		const $$ = this;
		const {$el, $T, config, axis} = $$;
		const classText = $$.getClass("text", "index");
		const labelsCentered = config.data_labels.centered;

		const text = $el.main.selectAll(`.${$TEXT.texts}`)
			.selectAll(`.${$TEXT.text}`)
			.data($$.labelishData.bind($$));

		$T(text.exit())
			.style("fill-opacity", "0")
			.remove();

		$el.text = text.enter()
			.append("text")
			.merge(text)
			.attr("class", classText)
			.attr("text-anchor", d => {
				const isInverted = config[`axis_${axis?.getId(d.id)}_inverted`];

				// when value is negative or
				let isEndAnchor = isInverted ? d.value > 0 : d.value < 0;

				if ($$.isCandlestickType(d)) {
					const data = $$.getCandlestickData(d);

					isEndAnchor = !data?._isUp;
				} else if ($$.isTreemapType(d)) {
					return labelsCentered ? "middle" : "start";
				}

				return (config.axis_rotated ? (isEndAnchor ? "end" : "start") : "middle");
			})
			.style("fill", $$.getStylePropValue($$.updateTextColor))
			.style("fill-opacity", "0")
			.each(function(d, i, texts) {
				const node = d3Select(this);
				let {value} = d;

				if ($$.isBubbleZType(d)) {
					value = $$.getBubbleZData(value, "z");
				} else if ($$.isCandlestickType(d)) {
					const data = $$.getCandlestickData(d);

					if (data) {
						value = data.close;
					}
				}

				value = $$.isTreemapType(d) ?
					$$.treemapDataLabelFormat(d)(node) :
					$$.dataLabelFormat(d.id)(value, d.id, d.index, texts);

				if (isNumber(value)) {
					this.textContent = value;
				} else {
					setTextValue(node, value, undefined, true);
				}
			});

		// Add images if imgUrl is specified
		updateTextImage.call($$);
	},

	updateTextColor(d): null | object | string {
		const $$ = this;
		const {config} = $$;
		const labelColors = config.data_labels_colors;
		const defaultColor =
			($$.isArcType(d) && !$$.isRadarType(d)) || $$.isFunnelType(d) || $$.isTreemapType(d) ?
				null :
				$$.color(d);
		let color;

		if (isString(labelColors)) {
			color = labelColors;
		} else if (isObject(labelColors)) {
			const {id} = d.data || d;

			color = labelColors[id];
		} else if (isFunction(labelColors)) {
			color = labelColors.bind($$.api)(defaultColor, d);
		}

		if ($$.isCandlestickType(d) && !isFunction(labelColors)) {
			const value = $$.getCandlestickData(d);

			if (!value?._isUp) {
				const downColor = config.candlestick_color_down;

				color = isObject(downColor) ? downColor[d.id] : downColor;
			}
		}

		return color || defaultColor;
	},

	/**
	 * Update data label text background color
	 * @param {object} d Data object
	 * @param {object|string|function} option option object
	 * @returns {string|null}
	 * @private
	 */
	updateTextBGColor(d: IDataRow | IArcData, option): string | null {
		const $$ = this;
		const {$el: {defs}} = $$;
		let color: string = "";

		if (option) {
			const id = isString(option) ?
				"" :
				$$.getTargetSelectorSuffix("id" in d ? d.id : d.data.id);
			const filter = defs.select(["filter[id*='labels-bg", "']"].join(id));

			if (filter.size()) {
				color = `url(#${filter.attr("id")})`;
			}

			if (isFunction(option)) {
				$$.generateTextBGColorFilter(option);

				// Get default color and call function
				const defaultColor = $$.color(d);
				const bgColor = option.bind($$.api)(defaultColor, d);

				if (bgColor) {
					filter.select("feFlood").attr("flood-color", bgColor);
				} else {
					color = "";
				}
			}
		}

		return color || null;
	},

	/**
	 * Redraw chartText
	 * @param {function} getX Positioning function for x
	 * @param {function} getY Positioning function for y
	 * @param {boolean} forFlow Weather is flow
	 * @param {boolean} withTransition transition is enabled
	 * @returns {Array}
	 * @private
	 */
	redrawText(getX, getY, forFlow?: boolean, withTransition?: boolean): true {
		const $$ = this;
		const {$T, axis, config, state: {hasTreemap}} = $$;
		const t = <string>getRandom(true);
		const isRotated = config.axis_rotated;
		const angle = config.data_labels.rotate;
		const anchorString = getRotateAnchor(angle);
		const rotateString = angle ? `rotate(${angle})` : "";

		// Phase 1: Batch getBBox() calls to avoid layout thrashing
		// Pre-compute all text bounding boxes in a single read phase
		let bboxCache = new Map();

		if (config.data_labels.centered) {
			// Collect all elements that need bbox measurement
			const elementsToMeasure: SVGTextElement[] = [];

			$$.$el.text.each(function(d) {
				if (($$.isBarType(d) || $$.isTreemapType(d))) {
					elementsToMeasure.push(this as SVGTextElement);
				}
			});

			// Batch all getBBox() calls together in a single read phase
			if (elementsToMeasure.length > 0) {
				bboxCache = batchGetBBox(elementsToMeasure);
			}
		}

		// Phase 2: Apply cached bbox values during position calculation
		$$.$el.text
			.style("fill", $$.getStylePropValue($$.updateTextColor))
			.attr("filter",
				d => $$.updateTextBGColor.bind($$)(d, config.data_labels_backgroundColors))
			.style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$))
			.each(function(d: IDataRow, i: number) {
				// Get cached bbox for this element (undefined if not cached)
				const cachedBbox = bboxCache.get(this);
				// do not apply transition for newly added text elements
				const node = $T(hasTreemap && this.childElementCount ? this.parentNode : this,
					!!(withTransition &&
						(this.getAttribute("x") || this.getAttribute("transform"))), t);
				const isInverted = config[`axis_${axis?.getId(d.id)}_inverted`];
				let pos = {
					x: getX.bind(this)(d, i, cachedBbox),
					y: getY.bind(this)(d, i, cachedBbox)
				};

				if (angle) {
					pos = setRotatePos.bind($$)(d, pos, anchorString, isRotated, isInverted);
					node.attr("text-anchor", anchorString);
				}

				updateTextImagePos.call($$, this, pos);

				// when is multiline
				if (this.childElementCount || angle) {
					node.attr("transform", `translate(${pos.x} ${pos.y}) ${rotateString}`);
				} else {
					node.attr("x", pos.x).attr("y", pos.y);
				}

				config.data_labels.border &&
					updateTextBorder.call($$, node.node(), pos, `${$TEXT.textBorderRect}-${i}`);
			});

		// need to return 'true' as of being pushed to the redraw list
		// ref: getRedrawList()
		return true;
	},

	/**
	 * Gets the getBoundingClientRect value of the element
	 * @param {HTMLElement|d3.selection|Array} source Target element
	 * @param {string} className Class name
	 * @returns {object} value of element.getBoundingClientRect()
	 * @private
	 */
	getTextRect(source: d3Selection | SVGElement | number[], className: string): DOMRect[] {
		const $$ = this;
		let cacheKey;
		let base;
		let text;

		if (Array.isArray(source)) {
			cacheKey = `${KEY.textRect}-${source.join("_")}`;
		} else {
			base = (source as d3Selection).node?.() ?? source as SVGElement;

			if (!/text/i.test(base.tagName)) {
				base = base.querySelector("text");
			}

			text = base.textContent;
			cacheKey = `${KEY.textRect}-${text.replace(/\W/g, "_")}`;
		}

		const rect = $$.cache.get(cacheKey) || [];

		if (rect.length === 0) {
			($$.$el.svg || $$.$el.chart.select("svg"))
				.selectAll(`.${$COMMON.dummy}`)
				.data(text ? [text] : source)
				.enter()
				.append("text")
				.style("visibility", "hidden")
				.style("font", base ? d3Select(base).style("font") : null)
				.classed(className || $COMMON.dummy, true)
				.text(d => d)
				.each(function(v, i) {
					rect[i] = getBoundingRect(this);
				})
				.remove();

			$$.cache.add(cacheKey, rect);
		}

		return rect.length > 1 ? rect : rect[0];
	},

	/**
	 * Gets the x or y coordinate of the text
	 * @param {object} indices Indices values
	 * @param {boolean} forX whether or not to x
	 * @returns {number} coordinates
	 * @private
	 */
	generateXYForText(indices, forX?: boolean): (d, i) => number {
		const $$ = this;
		const {state: {hasRadar, hasFunnel, hasTreemap}} = $$;
		const types = Object.keys(indices);
		const points = {};
		const getter = forX ? $$.getXForText : $$.getYForText;

		hasFunnel && types.push("funnel");
		hasRadar && types.push("radar");
		hasTreemap && types.push("treemap");

		types.forEach(v => {
			points[v] = $$[`generateGet${capitalize(v)}Points`](indices[v], false);
		});

		return function(d, i) {
			const type = ($$.isAreaType(d) && "area") ||
				($$.isBarType(d) && "bar") ||
				($$.isCandlestickType(d) && "candlestick") ||
				($$.isFunnelType(d) && "funnel") ||
				($$.isRadarType(d) && "radar") ||
				($$.isTreemapType(d) && "treemap") || "line";

			return getter.call($$, points[type](d, i), d, this);
		};
	},

	/**
	 * Get centerized text position for bar type data.label.text
	 * @param {object} d Data object
	 * @param {Array} points Data points position
	 * @param {HTMLElement} textElement Data label text element
	 * @param {string} type 'x' or 'y'
	 * @param {DOMRect} cachedBbox Optional cached bounding box (from getBBox batching)
	 * @returns {number} Position value
	 * @private
	 */
	getCenteredTextPos(d, points, textElement: SVGTextElement, type: "x" | "y",
		cachedBbox?: DOMRect): number {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const isBarType = $$.isBarType(d);
		const isTreemapType = $$.isTreemapType(d);

		if (config.data_labels.centered && (isBarType || isTreemapType)) {
			// Use cached bbox from parameter to avoid layout thrashing, fallback to getBBox if not provided
			const rect = cachedBbox || getBBox(textElement);

			if (isBarType) {
				const isPositive = $$.getRangedData(d, null, "bar") >= 0;

				if (isRotated) {
					const w = (
								isPositive ?
									points[1][1] - points[0][1] :
									points[0][1] - points[1][1]
							) / 2 + (rect.width / 2);

					return isPositive ? -w - 3 : w + 2;
				} else {
					const h = (
								isPositive ?
									points[0][1] - points[1][1] :
									points[1][1] - points[0][1]
							) / 2 + (rect.height / 2);

					return isPositive ? h : -h - 2;
				}
			} else if (isTreemapType) {
				return type === "x" ?
					(points[1][0] - points[0][0]) / 2 : // X: Move to horizontal center of rect
					(points[1][1] - points[0][1]) / 2 - rect.y - rect.height / 2; // Y: Calculate true vertical center
			}
		}

		return 0;
	},

	/**
	 * Gets the x coordinate of the text
	 * @param {object} points Data points position
	 * @param {object} d Data object
	 * @param {HTMLElement} textElement Data label text element
	 * @param {DOMRect} cachedBbox Optional cached bounding box (from getBBox batching)
	 * @returns {number} x coordinate
	 * @private
	 */
	getXForText(points, d: IDataRow, textElement, cachedBbox?: DOMRect): number {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;
		const isFunnelType = $$.isFunnelType(d);
		const isTreemapType = $$.isTreemapType(d);
		let xPos = points ? points[0][0] : 0;

		if ($$.isCandlestickType(d)) {
			if (isRotated) {
				xPos = $$.getCandlestickData(d)?._isUp ? points[2][2] + 4 : points[2][1] - 4;
			} else {
				xPos += (points[1][0] - xPos) / 2;
			}
		} else if (isFunnelType) {
			xPos += $$.state.current.width / 2;
		} else if (isTreemapType) {
			xPos += config.data_labels.centered ? 0 : 5;
		} else {
			if (isRotated) {
				const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
				const padding = $$.isBarType(d) ? 4 : 6;
				const value = d.value as number;

				xPos = points[2][1];

				if (isInverted) {
					xPos -= padding * (value > 0 ? 1 : -1);
				} else {
					xPos += padding * (value < 0 ? -1 : 1);
				}
			} else {
				xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos;
			}
		}

		if (isRotated || isTreemapType) {
			xPos += $$.getCenteredTextPos(d, points, textElement, "x", cachedBbox);
		}

		return xPos + getTextPos.call(this, d, "x");
	},

	/**
	 * Gets the y coordinate of the text
	 * @param {object} points Data points position
	 * @param {object} d Data object
	 * @param {HTMLElement} textElement Data label text element
	 * @param {DOMRect} cachedBbox Optional cached bounding box (from getBBox batching)
	 * @returns {number} y coordinate
	 * @private
	 */
	getYForText(points, d, textElement, cachedBbox?: DOMRect): number {
		const $$ = this;
		const {axis, config, state} = $$;
		const isRotated = config.axis_rotated;
		const isInverted = config[`axis_${axis?.getId(d.id)}_inverted`];
		const isBarType = $$.isBarType(d);
		const isFunnelType = $$.isFunnelType(d);
		const isTreemapType = $$.isTreemapType(d);
		const r = config.point_r;
		const rect = getBoundingRect(textElement);
		let {value} = d;
		let baseY = 3;
		let yPos;

		if ($$.isCandlestickType(d)) {
			value = $$.getCandlestickData(d);

			if (isRotated) {
				yPos = points[0][0];
				yPos += ((points[1][0] - yPos) / 2) + baseY;
			} else {
				yPos = value && value._isUp ? points[2][2] - baseY : points[2][1] + (baseY * 4);

				if (isInverted) {
					yPos += 15 * (value._isUp ? 1 : -1);
				}
			}
		} else if (isFunnelType) {
			yPos = points ?
				points[0][1] + ((points[1][1] - points[0][1]) / 2) + rect.height / 2 - 3 :
				0;
		} else if (isTreemapType) {
			yPos = points[0][1] + (config.data_labels.centered ? 0 : rect.height + 5);
		} else {
			if (isRotated) {
				yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
			} else {
				yPos = points[2][1];

				if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
					baseY += config.point_r / 2.3;
				}

				if (
					value < 0 || (value === 0 && !state.hasPositiveValue && state.hasNegativeValue)
				) {
					yPos += isInverted ? (isBarType ? -3 : -5) : (
						rect.height + (isBarType ? -baseY : baseY)
					);
				} else {
					let diff = -baseY * 2;

					if (isBarType) {
						diff = -baseY;
					} else if ($$.isBubbleType(d)) {
						diff = baseY;
					}

					if (isInverted) {
						diff = isBarType ? 10 : 15;
					}

					yPos += diff;
				}
			}
		}

		if (!isRotated || isTreemapType) {
			yPos += $$.getCenteredTextPos(d, points, textElement, "y", cachedBbox);
		}

		return yPos + getTextPos.call(this, d, "y");
	},

	/**
	 * Calculate if two or more text nodes are overlapping
	 * Mark overlapping text nodes with "text-overlapping" class
	 * @param {string} id Axis id
	 * @param {ChartInternal} $$ ChartInternal context
	 * @param {string} selector Selector string
	 * @private
	 */
	markOverlapped(id: AxisType, $$, selector: string): void {
		const textNodes = $$.$el.arcs.selectAll(selector);
		const filteredTextNodes = textNodes.filter(node => node.data.id !== id);
		const textNode = textNodes.filter(node => node.data.id === id);
		const translate = getTranslation(textNode.node());

		// Calculates the length of the hypotenuse
		const calcHypo = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

		textNode.node() && filteredTextNodes.each(function() {
			const coordinate = getTranslation(this);
			const filteredTextNode = d3Select(this);
			const nodeForWidth =
				calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ?
					textNode :
					filteredTextNode;

			const overlapsX = Math.ceil(Math.abs(translate.e - coordinate.e)) <
				Math.ceil(nodeForWidth.node().getComputedTextLength());
			const overlapsY = Math.ceil(Math.abs(translate.f - coordinate.f)) <
				parseInt(textNode.style("font-size"), 10);

			filteredTextNode.classed($TEXT.TextOverlapping, overlapsX && overlapsY);
		});
	},

	/**
	 * Calculate if two or more text nodes are overlapping
	 * Remove "text-overlapping" class on selected text nodes
	 * @param {ChartInternal} $$ ChartInternal context
	 * @param {string} selector Selector string
	 * @private
	 */
	undoMarkOverlapped($$, selector): void {
		$$.$el.arcs.selectAll(selector)
			.each(function() {
				d3SelectAll([this, this.previousSibling])
					.classed($TEXT.TextOverlapping, false);
			});
	}
};
