/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {window} from "../internals/browser";
import {removeEvent, extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Resize the chart.
	 * @method resize
	 * @instance
	 * @memberOf Chart
	 * @param {Object} size This argument should include width and height in pixels.
	 * @example
	 * // Resize to 640x480
	 * chart.resize({
	 *    width: 640,
	 *    height: 480
	 * });
	 */
	resize(size) {
		const config = this.internal.config;

		config.size_width = size ? size.width : null;
		config.size_height = size ? size.height : null;

		this.flush();
	},

	/**
	 * Force to redraw.
	 * @method flush
	 * @instance
	 * @memberOf Chart
	 * @example
	 * chart.flush();
	 */
	flush() {
		this.internal.updateAndRedraw({
			withLegend: true,
			withTransition: false,
			withTransitionForTransform: false,
		});
	},

	/**
	 * Reset the chart object and remove element and events completely.
	 * @method destroy
	 * @instance
	 * @memberOf Chart
	 * @example
	 * chart.destroy();
	 */
	destroy() {
		const $$ = this.internal;

		window.clearInterval($$.intervalForObserveInserted);

		if ($$.resizeTimeout !== undefined) {
			window.clearTimeout($$.resizeTimeout);
		}

		removeEvent(window, "resize", $$.resizeFunction);
		// if (window.detachEvent) {
		//     window.detachEvent('onresize', $$.resizeFunction);
		// } else if (window.removeEventListener) {
		//     window.removeEventListener('resize', $$.resizeFunction);
		// } else {
		//     var wrapper = window.onresize;
		//     // check if no one else removed our wrapper and remove our resizeFunction from it
		//     if (wrapper && wrapper.add && wrapper.remove) {
		//         wrapper.remove($$.resizeFunction);
		//     }
		// }

		$$.selectChart.classed("bb", false).html("");

		// MEMO: this is needed because the reference of some elements will not be released, then memory leak will happen.
		Object.keys($$).forEach(key => {
			$$[key] = null;
		});

		return null;
	}
});
