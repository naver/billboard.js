/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$TEXT} from "../../config/classes";
import {isNumber, setTextValue} from "../../module/util";

/**
 * Get the text position
 * @param {string} pos right, left or center
 * @param {number} width chart width
 * @returns {string|number} text-anchor value or position in pixel
 * @private
 */
function getTextXPos(pos = "left", width?: number | any): number | "start" | "middle" | "end" {
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
				.style("text-anchor", getTextXPos(config.title_position))
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
			const x = getTextXPos(config.title_position, current.width);
			const y = (config.title_padding.top || 0) +
				$$.getTextRect($$.$el.title, $TEXT.title).height;

			title.attr("transform", `translate(${x}, ${y})`);
		}
	},

	/**
	 * Get title padding
	 * @returns {number} padding value
	 * @private
	 */
	getTitlePadding(): number {
		const $$ = this;
		const {$el: {title}, config} = $$;

		return (config.title_padding.top || 0) +
			(title ? $$.getTextRect(title, $TEXT.title).height : 0) +
			(config.title_padding.bottom || 0);
	}
};
