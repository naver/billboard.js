/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * interaction config options
 */
export default {
	/**
	 * Interaction options
	 * @name interaction
	 * @memberof Options
	 * @type {object}
	 * @property {object} interaction Intersection object
	 * @property {boolean} [interaction.enabled=true] Indicate if the chart should have interactions.<br>
	 *     If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
	 * @property {boolean} [interaction.brighten=true] Make brighter for the selected area (ex. 'pie' type data selected area)
	 * @property {boolean} [interaction.inputType.mouse=true] enable or disable mouse interaction
	 * @property {boolean} [interaction.inputType.touch=true] enable or disable  touch interaction
	 * @property {boolean|number} [interaction.inputType.touch.preventDefault=false] enable or disable to call event.preventDefault on touchstart & touchmove event. It's usually used to prevent document scrolling.
	 * @see [Demo: touch.preventDefault](https://naver.github.io/billboard.js/demo/#Interaction.PreventScrollOnTouch)
	 * @example
	 * interaction: {
	 *    enabled: false,
	 *    brighten: false,
	 *    inputType: {
	 *        mouse: true,
	 *        touch: false
	 *
	 *        // or declare preventDefault explicitly.
	 *        // In this case touch inputType is enabled by default
	 *        touch: {
	 *            preventDefault: true
	 *
	 *            // or threshold pixel value (pixel moved from touchstart to touchmove)
	 *            preventDefault: 5
	 *        }
	 *    }
	 * }
	 */
	interaction_enabled: true,
	interaction_brighten: true,
	interaction_inputType_mouse: true,
	interaction_inputType_touch: <boolean|{preventDefault?: boolean|number}> {}
};
