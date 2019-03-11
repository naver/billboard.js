/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../internals/Chart";
import {window} from "../internals/browser";
import {notEmpty, isDefined, extend} from "../internals/util";

extend(Chart.prototype, {
	/**
	 * Resize the chart.
	 * @method resize
	 * @instance
	 * @memberof Chart
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

		this.flush(false, true);
	},

	/**
	 * Force to redraw.
	 * @method flush
	 * @instance
	 * @memberof Chart
	 * @param {Boolean} [soft] For soft redraw.
	 * @param {Boolean} [isFromResize] For soft redraw.
	 * @example
	 * chart.flush();
	 *
	 * // for soft redraw
	 * chart.flush(true);
	 */
	flush(soft, isFromResize) {
		const $$ = this.internal;

		// reset possible zoom scale
		if (isFromResize) {
			$$.brush && $$.brush.updateResize();
		} else {
			// re-update config info
			$$.axis && $$.axis.setOrient();
		}

		$$.zoomScale = null;

		soft ? $$.redraw({
			withTransform: true,
			withUpdateXDomain: true,
			withUpdateOrgXDomain: true,
			withLegend: true
		}) : $$.updateAndRedraw({
			withLegend: true,
			withTransition: false,
			withTransitionForTransform: false,
		});
	},

	/**
	 * Reset the chart object and remove element and events completely.
	 * @method destroy
	 * @instance
	 * @memberof Chart
	 * @example
	 * chart.destroy();
	 */
	destroy() {
		const $$ = this.internal;

		if (notEmpty($$)) {
			$$.charts.splice($$.charts.indexOf(this), 1);

			// clear timers && pending transition
			$$.svg.select("*").interrupt();
			isDefined($$.resizeTimeout) && window.clearTimeout($$.resizeTimeout);

			window.removeEventListener("resize", $$.resizeFunction);
			$$.selectChart.classed("bb", false).html("");

			// releasing references
			Object.keys(this).forEach(key => {
				key === "internal" && Object.keys($$).forEach(k => {
					$$[k] = null;
				});

				this[key] = null;
				delete this[key];
			});
		}

		return null;
	},

	/**
	 * Get or set single config option value.
	 * @method config
	 * @instance
	 * @memberof Chart
	 * @param {String} name The option key name.
	 * @param {*} [value] The value accepted for indicated option.
	 * @param {Boolean} [redraw] Set to redraw with the new option changes.
	 * - **NOTE:** Doesn't guarantee work in all circumstances. It can be applied for limited options only.
	 * @example
	 * // Getter
	 * chart.config("gauge.max");
	 *
	 * // Setter
	 * chart.config("gauge.max", 100);
	 *
	 * // Setter & redraw with the new option
	 * chart.config("gauge.max", 100, true);
	 */
	config(name, value, redraw) {
		const $$ = this.internal;
		const key = name && name.replace(/\./g, "_");
		let res;

		if (key in $$.config) {
			if (isDefined(value)) {
				$$.config[key] = value;
				res = value;

				redraw && this.flush();
			} else {
				res = $$.config[key];
			}
		}

		return res;
	}
});
