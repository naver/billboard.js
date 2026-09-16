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
import { diffDomain, isFunction } from "../../module/util/type-checks.js";
import { callFn } from "../../module/util/object.js";
import { getPointer, scheduleRAFUpdate } from "../../module/util/dom.js";
import { $COMMON, $ZOOM } from "../../config/classes.js";
import { drag } from "d3-drag";
import { zoom, zoomIdentity, zoomTransform } from "d3-zoom";
//#region src/ChartInternal/interactions/zoom.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Get the element that owns zoom interaction state.
* @param {object} $$ ChartInternal instance
* @returns {object} d3 selection
* @private
*/
function getZoomTarget($$) {
	return $$.state.isCanvasMode ? $$.$el.canvas : $$.$el.eventRect;
}
/**
* Convert a canvas-space transform to plot-space transform.
* @param {object} $$ ChartInternal instance
* @param {object} transform d3 zoom transform
* @returns {object} Plot-space transform
* @private
*/
function toPlotZoomTransform($$, transform) {
	if (!$$.state.isCanvasMode) return transform;
	const { margin } = $$.state;
	return zoomIdentity.translate(transform.x + (transform.k - 1) * margin.left, transform.y + (transform.k - 1) * margin.top).scale(transform.k);
}
/**
* Convert a plot-space transform to canvas-space transform.
* @param {object} $$ ChartInternal instance
* @param {object} transform d3 zoom transform
* @returns {object} Canvas-space transform
* @private
*/
function toCanvasZoomTransform($$, transform) {
	if (!$$.state.isCanvasMode) return transform;
	const { margin } = $$.state;
	return zoomIdentity.translate(transform.x - (transform.k - 1) * margin.left, transform.y - (transform.k - 1) * margin.top).scale(transform.k);
}
/**
* Get plot-local pointer coordinates for zoom drag.
* @param {object} $$ ChartInternal instance
* @param {object} event Event object
* @param {HTMLElement|SVGElement} element Event element
* @returns {Array} Plot-local pointer
* @private
*/
function getZoomDragPointer($$, event, element) {
	const pointer = getPointer(event, element);
	if ($$.state.isCanvasMode) {
		const { margin } = $$.state;
		pointer[0] -= margin.left;
		pointer[1] -= margin.top;
	}
	return pointer;
}
var zoom_default = {
	/**
	* Initialize zoom.
	* @private
	*/
	initZoom() {
		const $$ = this;
		$$.scale.zoom = null;
		$$.generateZoom();
		$$.config.zoom_type === "drag" && $$.initZoomBehaviour();
	},
	/**
	* Bind zoom event
	* @param {boolean} bind Weather bind or unbound
	* @private
	*/
	bindZoomEvent(bind = true) {
		const $$ = this;
		const { config } = $$;
		if (config.zoom_enabled && bind) !config.subchart_show && $$.bindZoomOnEventRect();
		else if (bind === false) {
			$$.api.unzoom();
			$$.unbindZoomEvent();
		}
	},
	/**
	* Generate zoom
	* @private
	*/
	generateZoom() {
		const $$ = this;
		const { config, org, scale } = $$;
		const zoom$1 = zoom().duration(0).on("start", $$.onZoomStart.bind($$)).on("zoom", $$.onZoom.bind($$)).on("end", $$.onZoomEnd.bind($$));
		zoom$1.orgScaleExtent = () => {
			const extent = config.zoom_extent || [1, 10];
			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		};
		zoom$1.updateScaleExtent = function() {
			const ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
			const extent = this.orgScaleExtent();
			this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
			return this;
		};
		/**
		* Update scale according zoom transform value
		* @param {object} transform transform object
		* @param {boolean} correctTransform if the d3 transform should be updated after rescaling
		* @private
		*/
		zoom$1.updateTransformScale = (transform, correctTransform) => {
			const isRotated = config.axis_rotated;
			const transformForScale = toPlotZoomTransform($$, transform);
			org.xScale?.range(scale.x.range());
			const newScale = transformForScale[isRotated ? "rescaleY" : "rescaleX"](org.xScale || scale.x);
			if (newScale.domain().some((v) => /(Invalid Date|NaN)/.test(v.toString()))) return;
			const domain = $$.trimXDomain(newScale.domain());
			const rescale = config.zoom_rescale;
			newScale.domain(domain, org.xDomain);
			if (correctTransform) {
				const t = newScale(scale.x.domain()[0]);
				const targetTransform = toCanvasZoomTransform($$, zoomIdentity.translate(isRotated ? transformForScale.x : t, isRotated ? t : transformForScale.y).scale(transform.k));
				getZoomTarget($$)?.property("__zoom", targetTransform);
			}
			scale.zoom = $$.getCustomizedXScale(newScale);
			$$.axis.x.scale(scale.zoom);
			if (rescale) {
				!org.xScale && (org.xScale = scale.x.copy());
				scale.x.domain(domain);
			} else if (org.xScale) {
				scale.x.domain(org.xScale.domain());
				org.xScale = null;
			}
		};
		/**
		* Get zoom domain
		* @returns {Array} zoom domain
		* @private
		*/
		zoom$1.getDomain = () => {
			const domain = scale[scale.zoom ? "zoom" : "subX"].domain();
			if ($$.axis.isCategorized()) domain[1] -= 2;
			return domain;
		};
		$$.zoom = zoom$1;
	},
	/**
	* 'start' event listener
	* @param {object} event Event object
	* @private
	*/
	onZoomStart(event) {
		const $$ = this;
		const { sourceEvent } = event;
		if (sourceEvent) {
			$$.zoom.startEvent = sourceEvent;
			$$.state.zooming = true;
			callFn($$.config.zoom_onzoomstart, $$.api, event);
		}
	},
	/**
	* 'zoom' event listener
	* @param {object} event Event object
	* @private
	*/
	onZoom(event) {
		const $$ = this;
		const { config, scale, state, org } = $$;
		const { sourceEvent } = event;
		const isUnZoom = event?.transform === zoomIdentity;
		if (!config.zoom_enabled || $$.filterTargetsToShow($$.data.targets).length === 0 || !scale.zoom && sourceEvent?.type.indexOf("touch") > -1 && sourceEvent?.touches.length === 1) return;
		if (event.sourceEvent) {
			state.zooming = true;
			state.domain = void 0;
		}
		const isMousemove = sourceEvent?.type === "mousemove";
		const isZoomOut = sourceEvent?.wheelDelta < 0;
		const { transform } = event;
		if (!isMousemove && isZoomOut && scale.x.domain().every((v, i) => v !== org.xDomain[i])) scale.x.domain(org.xDomain);
		$$.zoom.updateTransformScale(transform, config.zoom_type === "wheel" && sourceEvent);
		const doTransition = config.transition_duration > 0 && !config.subchart_show && (state.dragging || isUnZoom || !event.sourceEvent);
		const useRAF = sourceEvent && isMousemove && config.zoom_type !== "wheel";
		const executeRedraw = () => {
			if (!$$.config) return;
			$$.redraw({
				withTransition: doTransition,
				withY: config.zoom_rescale,
				withSubchart: false,
				withEventRect: false,
				withDimension: false
			});
			$$.state.cancelClick = isMousemove;
			!isUnZoom && callFn(config.zoom_onzoom, $$.api, $$.state.domain ?? $$.zoom.getDomain());
		};
		useRAF ? scheduleRAFUpdate($$.state, executeRedraw) : executeRedraw();
	},
	/**
	* 'end' event listener
	* @param {object} event Event object
	* @private
	*/
	onZoomEnd(event) {
		const $$ = this;
		const { config, state } = $$;
		const zoom = $$.zoom;
		if (!zoom) return;
		let { startEvent } = zoom;
		let e = event?.sourceEvent;
		const isUnZoom = event?.transform === zoomIdentity;
		if (startEvent?.type.indexOf("touch") > -1) {
			startEvent = startEvent.changedTouches[0];
			e = e?.changedTouches?.[0];
		}
		if (config.zoom_type === "drag" && e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY) return;
		state.zooming = false;
		!state.isCanvasMode && $$.redrawEventRect();
		$$.updateZoom();
		!isUnZoom && (e || state.dragging) && callFn(config.zoom_onzoomend, $$.api, $$.state.domain ?? $$.zoom.getDomain());
	},
	/**
	* Update zoom
	* @param {boolean} force Force unzoom
	* @private
	*/
	updateZoom(force) {
		const $$ = this;
		const { subX, x, zoom } = $$.scale;
		if (zoom) {
			const zoomDomain = zoom.domain();
			const xDomain = subX.domain();
			const delta = .015;
			const isfullyShown = $$.config.axis_x_inverted ? (zoomDomain[0] >= xDomain[0] || zoomDomain[0] + delta >= xDomain[0]) && (xDomain[1] >= zoomDomain[1] || xDomain[1] >= zoomDomain[1] + delta) : (zoomDomain[0] <= xDomain[0] || zoomDomain[0] - delta <= xDomain[0]) && (xDomain[1] <= zoomDomain[1] || xDomain[1] <= zoomDomain[1] - delta);
			if (force || isfullyShown) {
				$$.axis.x.scale(subX);
				x.domain(subX.orgDomain());
				$$.scale.zoom = null;
			}
		}
	},
	/**
	* Set zoom transform to event rect
	* @param {function} x x Axis scale function
	* @param {Array} domain Domain value to be set
	* @private
	*/
	updateCurrentZoomTransform(x, domain) {
		const $$ = this;
		const { config } = $$;
		const isRotated = config.axis_rotated;
		const translate = [-x(domain[0]), 0];
		const transform = zoomIdentity.scale(x.range()[1] / (x(domain[1]) - x(domain[0]))).translate(...isRotated ? translate.reverse() : translate);
		getZoomTarget($$)?.call($$.zoom.transform, toCanvasZoomTransform($$, transform));
	},
	/**
	* Attach zoom event on <rect>
	* @private
	*/
	bindZoomOnEventRect() {
		const $$ = this;
		const { config, $el: { svg } } = $$;
		const target = getZoomTarget($$);
		const behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;
		$$.state.isCanvasMode && behaviour?.touchable?.(() => config.interaction_inputType_touch !== false);
		if (!$$.state.isCanvasMode && win.GestureEvent && /^((?!chrome|android|mobile).)*safari/i.test(win.navigator?.userAgent)) svg.on("wheel", () => {});
		target?.call(behaviour).on("dblclick.zoom", null);
	},
	/**
	* Initialize the drag behaviour used for zooming.
	* @private
	*/
	initZoomBehaviour() {
		const $$ = this;
		const { config, state } = $$;
		const isRotated = config.axis_rotated;
		let start = 0;
		let end = 0;
		let zoomRect;
		let extent;
		const prop = {
			axis: isRotated ? "y" : "x",
			attr: isRotated ? "height" : "width",
			index: isRotated ? 1 : 0
		};
		const clampPointer = (v) => {
			const [lo, hi] = extent ?? [0, isRotated ? state.height : state.width];
			return Math.min(Math.max(v, lo), hi);
		};
		$$.zoomBehaviour = drag().touchable(() => !state.isCanvasMode || config.interaction_inputType_touch !== false).clickDistance(4).on("start", function(event) {
			extent = $$.scale.zoom ? null : $$.axis.getExtent();
			state.event = event;
			$$.setDragStatus(true);
			$$.unselectRect();
			if (!state.isCanvasMode && !zoomRect) zoomRect = $$.$el.main.append("rect").attr("clip-path", state.clip.path).attr("class", $ZOOM.zoomBrush).attr("width", isRotated ? state.width : 0).attr("height", isRotated ? 0 : state.height);
			zoomRect?.attr(isRotated ? "width" : "height", isRotated ? state.width : state.height);
			start = clampPointer(getZoomDragPointer($$, event, this)[prop.index]);
			end = start;
			state.isCanvasMode ? $$.renderCanvasZoomBrush?.(start, end) : zoomRect.attr(prop.axis, start).attr(prop.attr, 0);
			$$.onZoomStart(event);
		}).on("drag", function(event) {
			end = clampPointer(getZoomDragPointer($$, event, this)[prop.index]);
			state.isCanvasMode ? $$.renderCanvasZoomBrush?.(start, end) : zoomRect.attr(prop.axis, Math.min(start, end)).attr(prop.attr, Math.abs(end - start));
		}).on("end", (event) => {
			const scale = $$.scale.zoom || $$.scale.x;
			state.event = event;
			end = clampPointer(end);
			state.isCanvasMode ? $$.clearCanvasZoomBrush?.() : zoomRect.attr(prop.axis, 0).attr(prop.attr, 0);
			if (start > end) [start, end] = [end, start];
			if (start < 0) {
				end += Math.abs(start);
				start = 0;
			}
			if (start !== end) $$.api.zoom([start, end].map((v) => scale.invert(v)));
			$$.setDragStatus(false);
		});
	},
	setZoomResetButton() {
		const $$ = this;
		const { config, $el } = $$;
		const resetButton = config.zoom_resetButton;
		if (resetButton && config.zoom_type === "drag") {
			if (!$el.zoomResetBtn) $el.zoomResetBtn = $$.$el.chart.append("div").classed($COMMON.button, true).append("span").on("click", function() {
				isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
				$$.api.unzoom();
			}).classed($ZOOM.buttonZoomReset, true).text(resetButton.text || "Reset Zoom");
			else $el.zoomResetBtn.style("display", null);
		}
	},
	getZoomTransform() {
		const $$ = this;
		const node = getZoomTarget($$)?.node();
		return node ? toPlotZoomTransform($$, zoomTransform(node)) : { k: 1 };
	}
};
//#endregion
export { zoom_default as default };
