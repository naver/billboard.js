/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {window} from "../../module/browser";
import {isDefined, isEmpty, notEmpty} from "../../module/util";

export default {
	/**
	 * Resize the chart.
	 * @function resize
	 * @instance
	 * @memberof Chart
	 * @param {object} size This argument should include width and height in pixels.
	 * @param {number} [size.width] width value
	 * @param {number} [size.height] height value
	 * @example
	 * // Resize to 640x480
	 * chart.resize({
	 *    width: 640,
	 *    height: 480
	 * });
	 */
	resize(size?: {width?: number, height?: number}): void {
		const $$ = this.internal;
		const {config, state} = $$;

		if (state.rendered) {
			config.size_width = size ? size.width : null;
			config.size_height = size ? size.height : null;

			state.resizing = true;

			this.flush(false);
			$$.resizeFunction();
		}
	},

	/**
	 * Force to redraw.
	 * - **NOTE:** When zoom/subchart is used, the zoomed state will be resetted.
	 * @function flush
	 * @instance
	 * @memberof Chart
	 * @param {boolean} [soft] For soft redraw.
	 * @example
	 * chart.flush();
	 *
	 * // for soft redraw
	 * chart.flush(true);
	 */
	flush(soft?: boolean): void {
		const $$ = this.internal;
		const {state, $el: {zoomResetBtn}} = $$;

		if (state.rendered) {
			// reset possible zoom scale when is called from resize event
			// eslint-disable-next-line prefer-rest-params
			if (state.resizing) { // arguments[1] is given when is called from resize
				$$.brush?.updateResize();
			} else {
				// re-update config info
				$$.axis?.setOrient();
			}

			// hide possible reset zoom button
			// https://github.com/naver/billboard.js/issues/2201
			zoomResetBtn?.style("display", "none");
			$$.scale.zoom = null;

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

			// reset subchart selection & selection state
			if (!state.resizing && $$.brush) {
				$$.brush.getSelection().call($$.brush.move);
				$$.unselectRect();
			}
		} else {
			$$.initToRender(true);
		}
	},

	/**
	 * Reset the chart object and remove element and events completely.
	 * @function destroy
	 * @instance
	 * @memberof Chart
	 * @returns {null}
	 * @example
	 * chart.destroy();
	 */
	destroy(): null {
		const $$ = this.internal;
		const {$el: {chart, style, svg}} = $$;

		if (notEmpty($$)) {
			$$.callPluginHook("$willDestroy");
			$$.charts.splice($$.charts.indexOf(this), 1);

			// detach events
			$$.unbindAllEvents();

			// clear timers && pending transition
			svg.select("*").interrupt();
			$$.resizeFunction.clear();

			window.removeEventListener("resize", $$.resizeFunction);
			chart.classed("bb", false)
				.style("position", null)
				.selectChildren()
				.remove();

			// remove <style> element added by boost.useCssRule option
			style && style.parentNode.removeChild(style);

			// releasing own references
			Object.keys(this).forEach(key => {
				key === "internal" && Object.keys($$).forEach(k => {
					$$[k] = null;
				});

				this[key] = null;
				delete this[key];
			});

			// release prototype chains
			for (const key in this) {
				this[key] = () => {};
			}
		}

		return null;
	},

	/**
	 * Get or set config option value.
	 * - **NOTE**
	 *  - The option key name must be specified as the last level.
	 *  - when no argument is given, will return all specified generation options object only. (will exclude any other options not specified at the initialization)
	 * @function config
	 * @instance
	 * @memberof Chart
	 * @param {string} name The option key name.
	 * @param {*} [value] The value accepted for indicated option.
	 * @param {boolean} [redraw] Set to redraw with the new option changes.
	 * - **NOTE:** Doesn't guarantee work in all circumstances. It can be applied for limited options only.
	 * @returns {*}
	 * @example
	 *
	 * // Getter
	 * chart.config("gauge.max");
	 *
	 * // Getter specified with top level key name will not work.
	 * // The option key name must be specified as the last level.
	 * // chart.config("gauge"); // will not work
	 *
	 * // without any arguments, it returns generation config object
	 * chart.config();  // {data: { ... }, axis: { ... }, ...}
	 *
	 * // Setter
	 * chart.config("gauge.max", 100);
	 *
	 * // Setter specified with top level key name will not work.
	 * // The option key name must be specified as the last level.
	 * // chart.config("gauge", {min: 10, max: 20}); // will not work
	 *
	 * // Setter & redraw with the new option
	 * chart.config("gauge.max", 100, true);
	 */
	config(name: string, value?: any, redraw?: boolean): any {
		const $$ = this.internal;
		const {config, state} = $$;
		const key = name?.replace(/\./g, "_");
		let res;

		if (name && key in config) {
			if (isDefined(value)) {
				config[key] = value;
				res = value;

				redraw && this.flush();
			} else {
				res = config[key];
			}
		} else if (arguments.length === 0 || isEmpty(name)) {
			res = state.orgConfig;
		}

		return res;
	}
};
