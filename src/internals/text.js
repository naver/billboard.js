/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {capitalize, extend, getBoundingRect, getRandom, isNumber, isObject, isString, getTranslation} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Initializes the text
	 * @private
	 */
	initText() {
		const $$ = this;

		$$.main.select(`.${CLASS.chart}`).append("g")
			.attr("class", CLASS.chartTexts);

		$$.mainText = d3SelectAll([]);
	},

	/**
	 * Update chartText
	 * @private
	 * @param {Object} $$.data.targets
	 */
	updateTargetsForText(targets) {
		const $$ = this;
		const classChartText = $$.classChartText.bind($$);
		const classTexts = $$.classTexts.bind($$);
		const classFocus = $$.classFocus.bind($$);
		const mainTextUpdate = $$.main.select(`.${CLASS.chartTexts}`).selectAll(`.${CLASS.chartText}`)
			.data(targets)
			.attr("class", d => classChartText(d) + classFocus(d));

		const mainTextEnter = mainTextUpdate.enter().append("g")
			.attr("class", classChartText)
			.style("opacity", "0")
			.style("pointer-events", "none");

		mainTextEnter.append("g")
			.attr("class", classTexts);
	},

	/**
	 * Update text
	 * @private
	 * @param {Number} Fade-out transition duration
	 */
	updateText(durationForExit) {
		const $$ = this;
		const config = $$.config;
		const dataFn = $$.labelishData.bind($$);
		const classText = $$.classText.bind($$);

		$$.mainText = $$.main.selectAll(`.${CLASS.texts}`).selectAll(`.${CLASS.text}`)
			.data(d => (this.isRadarType(d) ? d.values : dataFn(d)));

		$$.mainText.exit()
			.transition()
			.duration(durationForExit)
			.style("fill-opacity", "0")
			.remove();

		$$.mainText = $$.mainText.enter()
			.append("text")
			.merge($$.mainText)
			.attr("class", classText)
			.attr("text-anchor", d => (config.axis_rotated ? (d.value < 0 ? "end" : "start") : "middle"))
			.style("fill", $$.updateTextColor.bind($$))
			.style("fill-opacity", "0")
			.text((d, i, j) => {
				const value = $$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value;

				return $$.dataLabelFormat(d.id)(value, d.id, i, j);
			});
	},

	updateTextColor(d) {
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
	 * @param {Boolean} forFlow
	 * @param {Boolean} withTransition transition is enabled
	 * @private
	 */
	redrawText(x, y, forFlow, withTransition) {
		const $$ = this;
		const t = getRandom();
		const opacityForText = forFlow ? 0 : $$.opacityForText.bind($$);

		$$.mainText.each(function(d, i) {
			const text = d3Select(this);

			// do not apply transition for newly added text elements
			(withTransition && text.attr("x") ? text.transition(t) : text)
				.attr("x", x.bind(this)(d, i))
				.attr("y", y.bind(this)(d, i))
				.style("fill", $$.updateTextColor.bind($$))
				.style("fill-opacity", opacityForText);
		});

		// need to return 'true' as of being pushed to the redraw list
		// ref: getRedrawList()
		return true;
	},

	/**
	 * Gets the getBoundingClientRect value of the element
	 * @private
	 * @param {HTMLElement|d3.selection} element
	 * @param {String} className
	 * @returns {Object} value of element.getBoundingClientRect()
	 */
	getTextRect(element, className) {
		const $$ = this;
		let base = (element.node ? element.node() : element);

		if (!/text/i.test(base.tagName)) {
			base = base.querySelector("text");
		}

		const text = base.textContent;
		const cacheKey = `$${text.replace(/\W/g, "_")}`;
		let rect = $$.getCache(cacheKey);

		if (!rect) {
			$$.svg.append("text")
				.style("visibility", "hidden")
				.style("font", d3Select(base).style("font"))
				.classed(className, true)
				.text(text)
				.call(v => {
					rect = getBoundingRect(v.node());
				})
				.remove();

			$$.addCache(cacheKey, rect);
		}

		return rect;
	},

	/**
	 * Gets the x or y coordinate of the text
	 * @param {Object} indices Indices values
	 * @param {Boolean} forX whether or not to x
	 * @returns {Number} coordinates
	 * @private
	 */
	generateXYForText(indices, forX) {
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
	 * @private
	 * @param {Object} d Data object
	 * @param {Array} points Data points position
	 * @param {HTMLElement} textElement Data label text element
	 * @returns {Number} Position value
	 */
	getCenteredTextPos(d, points, textElement) {
		const $$ = this;
		const config = $$.config;
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
	 * @param {String} id Data id value
	 * @param {String} type x | y
	 * @return {Number} Position value
	 * @private
	 */
	getTextPos(id, type) {
		const pos = this.config.data_labels_position;

		return (id in pos ? pos[id] : pos)[type] || 0;
	},

	/**
	 * Gets the x coordinate of the text
	 * @private
	 * @param {Object} points
	 * @param {Object} data
	 * @param {HTMLElement} element
	 * @returns {Number} x coordinate
	 */
	getXForText(points, d, textElement) {
		const $$ = this;
		const config = $$.config;
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
			if (xPos > $$.width) {
				const {width} = getBoundingRect(textElement);

				xPos = $$.width - width;
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
	 * @private
	 * @param {Object} points
	 * @param {Object} data
	 * @param {HTMLElement} element
	 * @returns {Number} y coordinate
	 */
	getYForText(points, d, textElement) {
		const $$ = this;
		const config = $$.config;
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

			if (d.value < 0 || (d.value === 0 && !$$.hasPositiveValue && $$.hasNegativeValue)) {
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
			} else if (yPos > this.height) {
				yPos = this.height - 4;
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
	 * @private
	 * @param {number} id
	 * @param {ChartInternal} $$
	 * @param {string} selector
	 */
	markOverlapped(id, $$, selector) {
		const textNodes = $$.arcs.selectAll(selector);
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
	 * @private
	 * @param {ChartInternal} $$
	 * @param {string} selector
	 */
	undoMarkOverlapped($$, selector) {
		$$.arcs.selectAll(selector)
			.each(function() {
				d3SelectAll([this, this.previousSibling])
					.classed(CLASS.TextOverlapping, false);
			});
	}
});
