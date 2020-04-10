/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import {KEY} from "../../module/Cache";
import CLASS from "../../config/classes";
import {capitalize, getBoundingRect, getRandom, isNumber, isObject, isString, getTranslation} from "../../module/util";
import {AxisType} from "../../../types/types";


export default {
	opacityForText(): "1" | "0" {
		return this.hasDataLabel() ? "1" : "0";
	},

	/**
	 * Initializes the text
	 * @private
	 */
	initText(): void {
		const {$el} = this;

		$el.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartTexts);
	},

	/**
	 * Update chartText
	 * @param {object} targets $$.data.targets
	 * @private
	 */
	updateTargetsForText(targets): void {
		const $$ = this;
		const classChartText = $$.classChartText.bind($$);
		const classTexts = $$.classTexts.bind($$);
		const classFocus = $$.classFocus.bind($$);
		const mainTextUpdate = $$.$el.main.select(`.${CLASS.chartTexts}`).selectAll(`.${CLASS.chartText}`)
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
	 * @param {number} durationForExit Fade-out transition duration
	 * @private
	 */
	updateText(durationForExit): void {
		const $$ = this;
		const {config, $el} = $$;
		const dataFn = $$.labelishData.bind($$);
		const classText = $$.classText.bind($$);

		$el.text = $el.main.selectAll(`.${CLASS.texts}`).selectAll(`.${CLASS.text}`)
			.data(d => (this.isRadarType(d) ? d.values : dataFn(d)));

		$el.text.exit()
			.transition()
			.duration(durationForExit)
			.style("fill-opacity", "0")
			.remove();

		$el.text = $el.text.enter()
			.append("text")
			.merge($$.$el.text)
			.attr("class", classText)
			.attr("text-anchor", d => (config.axis_rotated ? (d.value < 0 ? "end" : "start") : "middle"))
			.style("fill", $$.updateTextColor.bind($$))
			.style("fill-opacity", "0")
			.text((d, i, j) => {
				const value = $$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value;

				return $$.dataLabelFormat(d.id)(value, d.id, i, j);
			});
	},

	updateTextColor(d): object | string {
		const $$ = this;
		const labelColors = $$.config.data_labels_colors;
		let color;

		if (isString(labelColors)) {
			color = labelColors;
		} else if (isObject(labelColors)) {
			color = labelColors[d.id];
		}

		return color || $$.color(d);
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
	redrawText(x, y, forFlow?: boolean, withTransition?: boolean) {
		const $$ = this;
		const t: any = getRandom();
		const opacityForText = forFlow ? 0 : $$.opacityForText.bind($$);

		return [
			$$.$el.text.each(function(d, i: number) {
				const text = d3Select(this);

				// do not apply transition for newly added text elements
				(withTransition && text.attr("x") ? text.transition(t) : text)
					.attr("x", x.bind(this)(d, i))
					.attr("y", d => y.bind(this)(d, i))
					.style("fill", $$.updateTextColor.bind($$))
					.style("fill-opacity", opacityForText);
			})
		];
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
		let xPos;
		let padding;

		if (isRotated) {
			padding = $$.isBarType(d) ? 4 : 6;
			xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
		} else {
			xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : points[0][0];
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
		let baseY = 3;
		let yPos;

		if (isRotated) {
			yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
		} else {
			yPos = points[2][1];

			if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
				baseY += config.point_r / 2.3;
			}

			if (d.value < 0 || (d.value === 0 && !state.hasPositiveValue && state.hasNegativeValue)) {
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
				parseInt(textNode.style("font-size"), 0);

			filteredTextNode.classed(CLASS.TextOverlapping, overlapsX && overlapsY);
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
					.classed(CLASS.TextOverlapping, false);
			});
	}
};
