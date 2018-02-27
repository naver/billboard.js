/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select,
	selectAll as d3SelectAll
} from "d3-selection";
import ChartInternal from "./ChartInternal";
import CLASS from "../config/classes";
import {extend} from "./util";

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
		const barLineBubbleData = $$.barLineBubbleData.bind($$);
		const classText = $$.classText.bind($$);

		$$.mainText = $$.main.selectAll(`.${CLASS.texts}`).selectAll(`.${CLASS.text}`)
			.data(barLineBubbleData);

		$$.mainText.exit()
			.transition()
			.duration(durationForExit)
			.style("fill-opacity", "0")
			.remove();

		$$.mainText = $$.mainText.enter()
			.append("text")
			.attr("class", classText)
			.attr("text-anchor", d => (config.axis_rotated ? (d.value < 0 ? "end" : "start") : "middle"))
			.style("stroke", "none")
			.style("fill", d => $$.color(d))
			.style("fill-opacity", "0")
			.merge($$.mainText)
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
		return [
			(withTransition ? this.mainText.transition() : this.mainText)
				.attr("x", xForText)
				.attr("y", yForText)
				.style("fill", this.color)
				.style("fill-opacity", forFlow ? 0 : this.opacityForText.bind(this))
		];
	},

	/**
	 * Gets the getBoundingClientRect value of the element
	 * @private
	 * @param {String} text
	 * @param {String} class
	 * @param {HTMLElement} element
	 * @returns {Object} value of element.getBoundingClientRect()
	 */
	getTextRect(text, cls, element) {
		const dummy = d3Select("body").append("div")
			.classed("bb", true);

		const svg = dummy.append("svg")
			.style("visibility", "hidden")
			.style("position", "fixed")
			.style("top", "0px")
			.style("left", "0px");

		const font = d3Select(element).style("font");
		let rect;

		svg.selectAll(".dummy")
			.data([text])
			.enter()
			.append("text")
			.classed(!cls ? "" : cls, true)
			.style("font", font)
			.text(text)
			.each(function() {
				rect = this.getBoundingClientRect();
			});

		dummy.remove();

		return rect;
	},

	/**
	 * Gets the x or y coordinate of the text
	 * @private
	 * @param {Object} area Indices
	 * @param {Object} bar Indices
	 * @param {Object} line Indices
	 * @param {Boolean} whether or not to x
	 * @returns {Number} coordinates
	 */
	generateXYForText(areaIndices, barIndices, lineIndices, forX) {
		const $$ = this;
		const getAreaPoints = $$.generateGetAreaPoints(areaIndices, false);
		const getBarPoints = $$.generateGetBarPoints(barIndices, false);
		const getLinePoints = $$.generateGetLinePoints(lineIndices, false);
		const getter = forX ? $$.getXForText : $$.getYForText;

		return function(d, i) {
			const getPoints = ($$.isAreaType(d) && getAreaPoints) ||
				($$.isBarType(d) && getBarPoints) ||
				getLinePoints;

			return getter.call($$, getPoints(d, i), d, this);
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
		let yPos;

		if (config.axis_rotated) {
			yPos = (points[0][0] + points[2][0] + textElement.getBoundingClientRect().height * 0.6) / 2;
		} else {
			yPos = points[2][1];

			if (d.value < 0 || (d.value === 0 && !$$.hasPositiveValue)) {
				yPos += textElement.getBoundingClientRect().height;

				if ($$.isBarType(d) && $$.isSafari()) {
					yPos -= 3;
				} else if (!$$.isBarType(d) && $$.isChrome()) {
					yPos += 3;
				}
			} else {
				let diff = -6;

				if ($$.isBarType(d)) {
					diff = -3;
				} else if ($$.isBubbleType(d)) {
					diff = 3;
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
