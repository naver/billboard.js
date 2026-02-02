/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$TEXT} from "../../config/classes";
import {getBBox, getElementPos, isNumber, setTextValue} from "../../module/util";

/**
 * Get the text position
 * @param {string} pos right, left or center
 * @param {number} width chart width
 * @returns {string|number} text-anchor value or position in pixel
 * @private
 */
function _getTextXPos(pos = "left", width?: number): number | "start" | "middle" | "end" {
	const isNum = isNumber(width);

	if (pos.includes("center")) {
		return isNum ? width / 2 : "middle";
	}
	if (pos.includes("right")) {
		return isNum ? width : "end";
	}
	return isNum ? 0 : "start";
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
				.style("text-anchor", _getTextXPos(config.title_position))
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
			const x = _getTextXPos(config.title_position, current.width);
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
		const paddingTop = config.title_padding.top || 0;
		const paddingBottom = config.title_padding.bottom || 0;

		if (!title?.node()) {
			return paddingTop + paddingBottom;
		}

		const titleNode = title.node() as SVGGElement;
		const translateY = getElementPos(titleNode, "y");

		// If title has been positioned, use actual bounding box for accurate calculation
		if (translateY) {
			const bbox = getBBox(titleNode);

			// Calculate actual bottom of title text
			// translateY is the baseline position, bbox.y is negative (above baseline),
			// bbox.y + bbox.height gives the extent below baseline
			return translateY + bbox.y + bbox.height + paddingBottom;
		}

		// Fallback: title not yet positioned, use text rect estimation
		return paddingTop +
			$$.getTextRect(title, $TEXT.title).height +
			paddingBottom;
	}
};
