/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { window as win } from "../../module/browser.js";
import { isDefined, isEmpty, notEmpty } from "../../module/util/type-checks.js";
import { cleanupWorkers } from "../../module/worker.js";
//#region src/Chart/api/chart.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
var chart_default = {
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
	resize(size) {
		const $$ = this.internal;
		const { config, state } = $$;
		if (state.rendered) {
			config.size_width = size ? size.width : null;
			config.size_height = size ? size.height : null;
			state.resizing = true;
			state.dirty.size = true;
			this.flush(false);
			$$.resizeFunction();
		}
	},
	/**
	* Force to redraw.
	* - **NOTE:** When zoom/subchart is used, the zoomed state will be reset.
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
	flush(soft) {
		const $$ = this.internal;
		const { state, $el: { zoomResetBtn } } = $$;
		if (state.rendered) {
			if (state.resizing) $$.brush?.updateResize();
			else $$.axis?.setOrient();
			zoomResetBtn?.style("display", "none");
			if ($$.scale.zoom) state.current.zoomDomain = $$.scale.zoom.domain();
			$$.scale.zoom = null;
			if (!state.resizing) state.dirty.data = true;
			soft ? $$.redraw({
				withTransform: true,
				withUpdateXDomain: true,
				withUpdateOrgXDomain: true,
				withLegend: true
			}) : $$.updateAndRedraw({
				withLegend: true,
				withTransition: false,
				withTransitionForTransform: false
			});
			if (!state.resizing && $$.brush) {
				$$.brush.getSelection().call($$.brush.move);
				$$.unselectRect();
			}
			if (state.current.zoomDomain) {
				$$.api.zoom(state.current.zoomDomain);
				state.current.zoomDomain = null;
			}
		} else $$.initToRender(true);
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
	destroy() {
		const $$ = this.internal;
		const { state, $el: { chart, style, svg } } = $$;
		if (notEmpty($$)) {
			$$.callPluginHook("$willDestroy");
			$$.cache?.remove(["setOverOut", "callOverOutForTouch"]);
			$$.charts.splice($$.charts.indexOf(this), 1);
			$$.charts.length === 0 && cleanupWorkers();
			$$.unbindAllEvents();
			svg?.select("*").interrupt();
			state.canvasFlowFrame !== null && win.cancelAnimationFrame?.(state.canvasFlowFrame);
			state.canvasFlowFrame = null;
			state.canvasFlowFinish = null;
			state.pendingRaf !== null && win.cancelAnimationFrame?.(state.pendingRaf);
			state.pendingRaf = null;
			$$.canvasRenderer?.destroy();
			$$.canvasEngine?.destroy();
			$$.resizeFunction?.clear();
			$$.resizeFunction?.clearLive?.();
			$$.resizeFunction?.resizeObserver?.disconnect();
			$$.resizeFunction && win.removeEventListener("resize", $$.resizeFunction);
			chart.classed("bb", false).style("position", null);
			if (state.isCanvasMode) chart.style("min-height", state.canvasInlineStyle.minHeight || null);
			chart.selectChildren().remove();
			style && style.parentNode.removeChild(style);
			Object.keys(this).forEach((key) => {
				key === "internal" && Object.keys($$).forEach((k) => {
					$$[k] = null;
				});
				this[key] = null;
				delete this[key];
			});
			for (const key in this) this[key] = () => {};
		}
		return null;
	},
	/**
	* Get or set config option value.
	* - **NOTE**
	*  - The option key name must be specified as the last level.
	*  - When no argument is given, it will return all specified generation options object only. (will exclude any other options not specified at the initialization)
	* @function config
	* @instance
	* @memberof Chart
	* @param {string} name The option key name.
	* @param {string|number|boolean|object|Array} [value] The value accepted for indicated option.
	* @param {boolean} [redraw] Set to redraw with the new option changes.
	* - **NOTE:** Doesn't guarantee to work in all circumstances. It can be applied for limited options only.
	* @returns {string|number|boolean|object|Array} The option value or all options object
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
	config(name, value, redraw) {
		const { config, state } = this.internal;
		const key = name?.replace(/\./g, "_");
		let res;
		if (name && key in config) {
			if (isDefined(value)) {
				config[key] = value;
				res = value;
				redraw && this.flush();
			} else res = config[key];
		} else if (arguments.length === 0 || isEmpty(name)) res = state.orgConfig;
		return res;
	}
};
//#endregion
export { chart_default as default };
