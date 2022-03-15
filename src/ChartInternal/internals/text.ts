/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import {KEY} from "../../module/Cache";
import {$COMMON, $TEXT} from "../../config/classes";
import {capitalize, getBoundingRect, getRandom, isFunction, isNumber, isObject, isString, getTranslation, setTextValue} from "../../module/util";
import {IDataRow, IArcData} from "../data/IData";
import {AxisType} from "../../../types/types";

export default {
	opacityForText(d): null | "0" {
		const $$ = this;

		return $$.isBarType(d) && !$$.meetsLabelThreshold(
			Math.abs($$.getRatio("bar", d)), "bar"
		) ? "0" : ($$.hasDataLabel ? null : "0");
	},

	/**
	 * Initializes the text
	 * @private
	 */
	initText(): void {
		const {$el} = this;

		$el.main.select(`.${$COMMON.chart}`).append("g")
			.attr("class", $TEXT.chartTexts);
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
		const mainTextUpdate = $$.$el.main.select(`.${$TEXT.chartTexts}`).selectAll(`.${$TEXT.chartText}`)
			.data(targets)
			.attr("class", d => classChartText(d) + classFocus(d));

		const mainTextEnter = mainTextUpdate.enter().append("g")
			.style("opacity", "0")
			.attr("class", classChartText)
			.style("pointer-events", "none");

		mainTextEnter.append("g")
			.attr("class", classTexts);
	},

	/**
	 * Update text
	 * @private
	 */
	updateText(): void {
		const $$ = this;
		const {$el, $T, config} = $$;
		const classText = $$.getClass("text", "index");

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
				// when value is negative or
				let isEndAnchor = d.value < 0;

				if ($$.isCandlestickType(d)) {
					const data = $$.getCandlestickData(d);

					isEndAnchor = !data?._isUp;
				}

				return (config.axis_rotated ? (isEndAnchor ? "end" : "start") : "middle");
			})
			.style("fill", $$.updateTextColor.bind($$))
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

				value = $$.dataLabelFormat(d.id)(value, d.id, i, texts);

				if (isNumber(value)) {
					this.textContent = value;
				} else {
					setTextValue(node, value);
				}
			});
	},

	updateTextColor(d): null | object | string {
		const $$ = this;
		const {config} = $$;
		const labelColors = config.data_labels_colors;
		const defaultColor = $$.isArcType(d) && !$$.isRadarType(d) ? null : $$.color(d);
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
	 * @returns {string|null}
	 * @private
	 */
	updateTextBacgroundColor(d: IDataRow | IArcData): string | null {
		const $$ = this;
		const {$el, config} = $$;
		const backgroundColor = config.data_labels_backgroundColors;
		let color: string = "";

		if (isString(backgroundColor) || isObject(backgroundColor)) {
			const id = isString(backgroundColor) ? "" : $$.getTargetSelectorSuffix(("id" in d ? d.id : d.data.id));
			const filter = $el.defs.select(["filter[id*='labels-bg", "']"].join(id));

			if (filter.size()) {
				color = `url(#${filter.attr("id")})`;
			}
		}

		return color || null;
	},

	/**
	 * Redraw chartText
	 * @param {Function} x Positioning function for x
	 * @param {Function} y Positioning function for y
	 * @param {boolean} forFlow Weather is flow
	 * @param {boolean} withTransition transition is enabled
	 * @returns {Array}
	 * @private
	 */
	redrawText(x, y, forFlow?: boolean, withTransition?: boolean): true {
		const $$ = this;
		const {$T} = $$;
		const t = <string>getRandom(true);

		$$.$el.text
			.style("fill", $$.updateTextColor.bind($$))
			.attr("filter", $$.updateTextBacgroundColor.bind($$))
			.style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$))
			.each(function(d, i) {
				// do not apply transition for newly added text elements
				const node = $T(this, !!(withTransition && this.getAttribute("x")), t);

				const posX = x.bind(this)(d, i);
				const posY = y.bind(this)(d, i);

				// when is multiline
				if (this.childElementCount) {
					node.attr("transform", `translate(${posX} ${posY})`);
				} else {
					node.attr("x", posX).attr("y", posY);
				}
			});

		// need to return 'true' as of being pushed to the redraw list
		// ref: getRedrawList()
		return true;
	},

	/**
	 * Gets the getBoundingClientRect value of the element
	 * @param {HTMLElement|d3.selection} element Target element
	 * @param {string} className Class name
	 * @returns {object} value of element.getBoundingClientRect()
	 * @private
	 */
	getTextRect(element, className: string): object {
		const $$ = this;
		let base = (element.node ? element.node() : element);

		if (!/text/i.test(base.tagName)) {
			base = base.querySelector("text");
		}

		const text = base.textContent;
		const cacheKey = `${KEY.textRect}-${text.replace(/\W/g, "_")}`;
		let rect = $$.cache.get(cacheKey);

		if (!rect) {
			$$.$el.svg.append("text")
				.style("visibility", "hidden")
				.style("font", d3Select(base).style("font"))
				.classed(className, true)
				.text(text)
				.call(v => {
					rect = getBoundingRect(v.node());
				})
				.remove();

			$$.cache.add(cacheKey, rect);
		}

		return rect;
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
		const types = Object.keys(indices);
		const points = {};
		const getter = forX ? $$.getXForText : $$.getYForText;

		$$.hasType("radar") && types.push("radar");

		types.forEach(v => {
			points[v] = $$[`generateGet${capitalize(v)}Points`](indices[v], false);
		});

		return function(d, i) {
			const type = ($$.isAreaType(d) && "area") ||
				($$.isBarType(d) && "bar") ||
				($$.isCandlestickType(d) && "candlestick") ||
				($$.isRadarType(d) && "radar") || "line";

			return getter.call($$, points[type](d, i), d, this);
		};
	},

	/**
	 * Get centerized text position for bar type data.label.text
	 * @param {object} d Data object
	 * @param {Array} points Data points position
	 * @param {HTMLElement} textElement Data label text element
	 * @returns {number} Position value
	 * @private
	 */
	getCenteredTextPos(d, points, textElement): number {
		const $$ = this;
		const {config} = $$;
		const isRotated = config.axis_rotated;

		if (config.data_labels.centered && $$.isBarType(d)) {
			const rect = getBoundingRect(textElement);
			const isPositive = d.value >= 0;

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
		}

		return 0;
	},

	/**
	 * Get data.labels.position value
	 * @param {string} id Data id value
	 * @param {string} type x | y
	 * @returns {number} Position value
	 * @private
	 */
	getTextPos(id, type): number {
		const pos = this.config.data_labels_position;

		return (id in pos ? pos[id] : pos)[type] || 0;
	},

	/**
	 * Gets the x coordinate of the text
	 * @param {object} points Data points position
	 * @param {object} d Data object
	 * @param {HTMLElement} textElement Data label text element
	 * @returns {number} x coordinate
	 * @private
	 */
	getXForText(points, d, textElement): number {
		const $$ = this;
		const {config, state} = $$;
		const isRotated = config.axis_rotated;
		let xPos = points[0][0];


		if ($$.isCandlestickType(d)) {
			if (isRotated) {
				xPos = $$.getCandlestickData(d)?._isUp ?
					points[2][2] + 4 : points[2][1] - 4;
			} else {
				xPos += (points[1][0] - xPos) / 2;
			}
		} else {
			if (isRotated) {
				const padding = $$.isBarType(d) ? 4 : 6;

				xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
			} else {
				xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos;
			}
		}

		// show labels regardless of the domain if value is null
		if (d.value === null) {
			if (xPos > state.width) {
				const {width} = getBoundingRect(textElement);

				xPos = state.width - width;
			} else if (xPos < 0) {
				xPos = 4;
			}
		}

		if (isRotated) {
			xPos += $$.getCenteredTextPos(d, points, textElement);
		}

		return xPos + $$.getTextPos(d.id, "x");
	},

	/**
	 * Gets the y coordinate of the text
	 * @param {object} points Data points position
	 * @param {object} d Data object
	 * @param {HTMLElement} textElement Data label text element
	 * @returns {number} y coordinate
	 * @private
	 */
	getYForText(points, d, textElement): number {
		const $$ = this;
		const {config, state} = $$;
		const isRotated = config.axis_rotated;
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
				yPos = value && value._isUp ?
					points[2][2] - baseY :
					points[2][1] + (baseY * 4);
			}
		} else {
			if (isRotated) {
				yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
			} else {
				yPos = points[2][1];

				if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
					baseY += config.point_r / 2.3;
				}

				if (value < 0 || (value === 0 && !state.hasPositiveValue && state.hasNegativeValue)) {
					yPos += rect.height + ($$.isBarType(d) ? -baseY : baseY);
				} else {
					let diff = -baseY * 2;

					if ($$.isBarType(d)) {
						diff = -baseY;
					} else if ($$.isBubbleType(d)) {
						diff = baseY;
					}

					yPos += diff;
				}
			}
		}

		// show labels regardless of the domain if value is null
		if (d.value === null && !isRotated) {
			const boxHeight = rect.height;

			if (yPos < boxHeight) {
				yPos = boxHeight;
			} else if (yPos > state.height) {
				yPos = state.height - 4;
			}
		}

		if (!isRotated) {
			yPos += $$.getCenteredTextPos(d, points, textElement);
		}

		return yPos + $$.getTextPos(d.id, "y");
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
			const nodeForWidth = calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ?
				textNode : filteredTextNode;

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
	},

	/**
	 * Check if meets the ratio to show data label text
	 * @param {number} ratio ratio to meet
	 * @param {string} type chart type
	 * @returns {boolean}
	 * @private
	 */
	meetsLabelThreshold(ratio: number = 0, type: "bar" | "donut" | "gauge" | "pie" | "polar"): boolean {
		const $$ = this;
		const {config} = $$;
		const threshold = config[`${type}_label_threshold`] || 0;

		return ratio >= threshold;
	}
};
