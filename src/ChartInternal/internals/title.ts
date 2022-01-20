/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isNumber, setTextValue} from "../../module/util";
import {$TEXT} from "../../config/classes";

/**
 * Get the text position
 * @param {string} pos right, left or center
 * @param {number} width chart width
 * @returns {string|number} text-anchor value or position in pixel
 * @private
 */
function getTextPos(pos = "left", width?: number | any): number | "start" | "middle" | "end" {
	const isNum = isNumber(width);
	let position;

	if (pos.indexOf("center") > -1) {
		position = isNum ? width / 2 : "middle";
	} else if (pos.indexOf("right") > -1) {
		position = isNum ? width : "end";
	} else {
		position = isNum ? 0 : "start";
	}

	return position;
}

export default {
	/**
	 * Initializes the title
	 * @private
	 */
	initTitle(): void {
		const $$ = this;
		const {config, $el} = $$;

		if (config.title_text) {
			$el.title = $el.svg.append("g");

			const text = $el.title
				.append("text")
				.style("text-anchor", getTextPos(config.title_position))
				.attr("class", $TEXT.title);

			setTextValue(text, config.title_text, [0.3, 1.5]);
		}
	},

	/**
	 * Redraw title
	 * @private
	 */
	redrawTitle(): void {
		const $$ = this;
		const {config, state: {current}, $el: {title}} = $$;

		if (title) {
			const y = $$.yForTitle.call($$);

			if (/g/i.test(title.node().tagName)) {
				title.attr("transform", `translate(${getTextPos(config.title_position, current.width)}, ${y})`);
			} else {
				title.attr("x", $$.xForTitle.call($$)).attr("y", y);
			}
		}
	},

	/**
	 * Returns the x attribute value of the title
	 * @returns {number} x attribute value
	 * @private
	 */
	xForTitle(): number {
		const $$ = this;
		const {config, state: {current}} = $$;
		const position = config.title_position || "left";
		const textRectWidth = $$.getTextRect($$.$el.title, $TEXT.title).width;
		let x;

		if (/(right|center)/.test(position)) {
			x = current.width - textRectWidth;

			if (position.indexOf("right") >= 0) {
				x = current.width - textRectWidth - config.title_padding.right;
			} else if (position.indexOf("center") >= 0) {
				x = (current.width - textRectWidth) / 2;
			}
		} else { // left
			x = (config.title_padding.left || 0);
		}

		return x;
	},

	/**
	 * Returns the y attribute value of the title
	 * @returns {number} y attribute value
	 * @private
	 */
	yForTitle(): number {
		const $$ = this;

		return ($$.config.title_padding.top || 0) +
			$$.getTextRect($$.$el.title, $TEXT.title).height;
	},

	/**
	 * Get title padding
	 * @returns {number} padding value
	 * @private
	 */
	getTitlePadding(): number {
		const $$ = this;

		return $$.yForTitle() + ($$.config.title_padding.bottom || 0);
	},
};
