/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend, isNumber} from "./util";
import CLASS from "../config/classes";

/**
 * Get the text position
 * @param {String} pos right, left or center
 * @param {Number} width chart width
 * @return {String|Number} text-anchor value or position in pixel
 * @private
 */
const getTextPos = (pos = "left", width) => {
	let position;
	const isNum = isNumber(width);

	if (pos.indexOf("center") > -1) {
		position = isNum ? width / 2 : "middle";
	} else if (pos.indexOf("right") > -1) {
		position = isNum ? width : "end";
	} else {
		position = isNum ? 0 : "start";
	}

	return position;
};

extend(ChartInternal.prototype, {
	/**
	 * Initializes the title
	 * @private
	 */
	initTitle() {
		const $$ = this;

		if ($$.config.title_text) {
			$$.title = $$.svg.append("g");

			const text = $$.title
				.append("text")
				.style("text-anchor", getTextPos($$.config.title_position))
				.attr("class", CLASS.title);

			$$.config.title_text.split("\n").forEach((v, i) => {
				text.append("tspan")
					.attr("x", 0)
					.attr("dy", `${i ? "1.5" : ".3"}em`)
					.text(v);
			});
		}
	},

	/**
	 * Redraw title
	 * @private
	 */
	redrawTitle() {
		const $$ = this;

		if ($$.title) {
			const y = $$.yForTitle.call($$);

			if (/g/i.test($$.title.node().tagName)) {
				$$.title.attr("transform", `translate(${getTextPos($$.config.title_position, $$.currentWidth)}, ${y})`);
			} else {
				$$.title.attr("x", $$.xForTitle.call($$)).attr("y", y);
			}
		}
	},

	/**
	 * Returns the x attribute value of the title
	 * @private
	 * @returns {Number} x attribute value
	 */
	xForTitle() {
		const $$ = this;
		const config = $$.config;
		const position = config.title_position || "left";
		let x;

		if (/(right|center)/.test(position)) {
			x = $$.currentWidth - $$.getTextRect($$.title, CLASS.title).width;

			if (position.indexOf("right") >= 0) {
				x -= (config.title_padding.right || 0);
			} else if (position.indexOf("center") >= 0) {
				x /= 2;
			}
		} else { // left
			x = (config.title_padding.left || 0);
		}

		return x;
	},

	/**
	 * Returns the y attribute value of the title
	 * @private
	 * @returns {Number} y attribute value
	 */
	yForTitle() {
		const $$ = this;

		return ($$.config.title_padding.top || 0) +
			$$.getTextRect($$.title, CLASS.title).height;
	},

	/**
	 * Get title padding
	 * @private
	 * @returns {Number} padding value
	 */
	getTitlePadding() {
		const $$ = this;

		return $$.yForTitle() + ($$.config.title_padding.bottom || 0);
	},
});
