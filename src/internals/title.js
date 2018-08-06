/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {extend} from "./util";

extend(ChartInternal.prototype, {
	/**
	 * Initializes the title
	 * @private
	 */
	initTitle() {
		const $$ = this;

		$$.title = $$.svg.append("text")
			.text($$.config.title_text)
			.attr("class", $$.CLASS.title);
	},

	/**
	 * Redraw title
	 * @private
	 */
	redrawTitle() {
		const $$ = this;

		$$.title.attr("x", $$.xForTitle.bind($$))
			.attr("y", $$.yForTitle.bind($$));
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

		if (position.indexOf("right") >= 0) {
			x = $$.currentWidth -
				$$.getTextRect($$.title, $$.CLASS.title, $$.title).width -
				config.title_padding.right;
		} else if (position.indexOf("center") >= 0) {
			x = ($$.currentWidth -
				$$.getTextRect($$.title, $$.CLASS.title, $$.title).width) / 2;
		} else { // left
			x = config.title_padding.left;
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

		return $$.config.title_padding.top +
			$$.getTextRect($$.title, $$.CLASS.title, $$.title).height;
	},

	/**
	 * Get title padding
	 * @private
	 * @returns {Number} padding value
	 */
	getTitlePadding() {
		const $$ = this;

		return $$.yForTitle() + $$.config.title_padding.bottom;
	},
});
