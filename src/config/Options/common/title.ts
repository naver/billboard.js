/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * title config options
 */
export default {
	/**
	 * Set title options
	 * @name title
	 * @memberof Options
	 * @type {object}
	 * @property {object} title Title object
	 * @property {string} [title.text] Title text. If contains `\n`, it's used as line break allowing multiline title.
	 * @property {number} [title.padding.top=0] Top padding value.
	 * @property {number} [title.padding.right=0] Right padding value.
	 * @property {number} [title.padding.bottom=0] Bottom padding value.
	 * @property {number} [title.padding.left=0] Left padding value.
	 * @property {string} [title.position=center] Available values are: 'center', 'right' and 'left'.
	 * @see [Demo](https://naver.github.io/billboard.js/demo/#Title.MultilinedTitle)
	 * @example
	 *  title: {
	 *      text: "Title Text",
	 *
	 *      // or Multiline title text
	 *      text: "Main title text\nSub title text",
	 *
	 *      padding: {
	 *          top: 10,
	 *          right: 10,
	 *          bottom: 10,
	 *          left: 10
	 *      },
	 *      position: "center"
	 *  }
	 */
	title_text: <string|undefined> undefined,
	title_padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	title_position: <"center"|"right"|"left"> "center"
};
