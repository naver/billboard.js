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
import {extend, getRandom, isNumber, capitalize} from "./util";

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
			.style("stroke", "none")
			.style("fill", d => $$.color(d))
			.style("fill-opacity", "0")
			.text((d, i, j) => $$.dataLabelFormat(d.id)(d.value, d.id, i, j));
	},

	/**
	 * Redraw chartText
	 * @private
	 * @param {Number} x Attribute
	 * @param {Number} y Attribute
	 * @param {Object} options.flow
	 * @param {Boolean} indicates transition is enabled
	 * @returns {Object} $$.mainText
	 */
	redrawText(xForText, yForText, forFlow, withTransition) {
		const $$ = this;
		const t = getRandom();
		const opacityForText = forFlow ? 0 : $$.opacityForText.bind($$);

		return [
			this.mainText.each(function() {
				const text = d3Select(this);

				// do not apply transition for newly added text elements
				(withTransition && text.attr("x") ? text.transition(t) : text)
					.attr("x", xForText)
					.attr("y", yForText)
					.style("fill", $$.color)
					.style("fill-opacity", opacityForText);
			})
		];
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
					rect = v.node().getBoundingClientRect();
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
		const points = {};
		const getter = forX ? $$.getXForText : $$.getYForText;

		Object.keys(indices).concat("radar")
			.forEach(v => {
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
		let xPos;
		let padding;

		if (config.axis_rotated) {
			padding = $$.isBarType(d) ? 4 : 6;
			xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
		} else {
			xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : points[0][0];
		}
		// show labels regardless of the domain if value is null
		if (d.value === null) {
			if (xPos > $$.width) {
				xPos = $$.width - textElement.getBoundingClientRect().width;
			} else if (xPos < 0) {
				xPos = 4;
			}
		}

		return xPos + (config.data_labels_position.x || 0);
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
		const r = config.point_r;
		let baseY = 3;
		let yPos;

		if (config.axis_rotated) {
			yPos = (points[0][0] + points[2][0] + textElement.getBoundingClientRect().height * 0.6) / 2;
		} else {
			yPos = points[2][1];

			if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
				baseY += config.point_r / 2.3;
			}

			if (d.value < 0 || (d.value === 0 && !$$.hasPositiveValue)) {
				yPos += textElement.getBoundingClientRect().height;

				if ($$.isBarType(d) && $$.isSafari()) {
					yPos -= baseY;
				} else if (!$$.isBarType(d) && $$.isChrome()) {
					yPos += baseY;
				}
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
		if (d.value === null && !config.axis_rotated) {
			const boxHeight = textElement.getBoundingClientRect().height;

			if (yPos < boxHeight) {
				yPos = boxHeight;
			} else if (yPos > this.height) {
				yPos = this.height - 4;
			}
		}

		return yPos + (config.data_labels_position.y || 0);
	}
});
