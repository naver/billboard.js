/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {select as d3Select} from "d3-selection";
import {drag as d3Drag} from "d3-drag";
import {zoom as d3Zoom} from "d3-zoom";
import {document} from "../../module/browser";
import CLASS from "../../config/classes";
import {callFn, diffDomain, getMinMax, getPointer, isDefined, isFunction} from "../../module/util";

export default {
	/**
	 * Initialize zoom.
	 * @private
	 */
	initZoom(): void {
		const $$ = this;

		$$.scale.zoom = null;

		$$.generateZoom();
		$$.initZoomBehaviour();
	},

	/**
	 * Bind zoom event
	 * @param {boolean} bind Weather bind or unbound
	 * @private
	 */
	bindZoomEvent(bind = true): void {
		const $$ = this;
		const {config, $el: {main}} = $$;
		const zoomEnabled = config.zoom_enabled;
		const eventRects = main.select(`.${CLASS.eventRects}`);

		if (zoomEnabled && bind) {
			// Do not bind zoom event when subchart is shown
			!config.subchart_show &&
				$$.bindZoomOnEventRect(eventRects, config.zoom_type);
		} else if (bind === false) {
			$$.api.unzoom();

			eventRects
				.on(".zoom", null)
				.on(".drag", null);
		}
	},

	/**
	 * Generate zoom
	 * @private
	 */
	generateZoom(): void {
		const $$ = this;
		const {config, org, scale} = $$;

		const zoom = d3Zoom().duration(0)
			.on("start", $$.onZoomStart.bind($$))
			.on("zoom", $$.onZoom.bind($$))
			.on("end", $$.onZoomEnd.bind($$));

		// get zoom extent
		// @ts-ignore
		zoom.orgScaleExtent = (): [number, number] => {
			const extent = config.zoom_extent || [1, 10];

			return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
		};

		// @ts-ignore
		zoom.updateScaleExtent = function() {
			const ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
			const extent = this.orgScaleExtent();

			this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);

			return this;
		};

		/**
		 * Update scale according zoom transform value
		 * @param {object} transform transform object
		 * @private
		 */
		// @ts-ignore
		zoom.updateTransformScale = (transform: object): void => {
			// in case of resize, update range of orgXScale
			org.xScale && org.xScale.range(scale.x.range());

			// rescale from the original scale
			const newScale = transform[
				config.axis_rotated ? "rescaleY" : "rescaleX"
			](org.xScale || scale.x);

			const domain = $$.trimXDomain(newScale.domain());
			const rescale = config.zoom_rescale;

			newScale.domain(domain, org.xDomain);

			scale.zoom = $$.getCustomizedScale(newScale);
			$$.axis.x.scale(scale.zoom);

			if (rescale) {
				// copy current initial x scale in case of rescale option is used
				!org.xScale && (org.xScale = scale.x.copy());
				scale.x.domain(domain);
			}
		};

		$$.zoom = zoom;
	},

	/**
	 * 'start' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoomStart(event): void {
		const $$ = this;
		const {sourceEvent} = event;

		if (!sourceEvent) {
			return;
		}

		$$.zoom.startEvent = sourceEvent;
		$$.state.zooming = true;
		callFn($$.config.zoom_onzoomstart, $$.api, event);
	},

	/**
	 * 'zoom' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoom(event): void {
		const $$ = this;
		const {config, scale, org} = $$;
		const {sourceEvent} = event;

		if (
			!config.zoom_enabled ||
			!event.sourceEvent ||
			$$.filterTargetsToShow($$.data.targets).length === 0 ||
			(!scale.zoom && sourceEvent.type.indexOf("touch") > -1 && sourceEvent.touches.length === 1)
		) {
			return;
		}

		const isMousemove = sourceEvent.type === "mousemove";
		const isZoomOut = sourceEvent.wheelDelta < 0;
		const {transform} = event;

		if (!isMousemove && isZoomOut && scale.x.domain().every((v, i) => v !== org.xDomain[i])) {
			scale.x.domain(org.xDomain);
		}

		$$.zoom.updateTransformScale(transform);

		if ($$.axis.isCategorized() && scale.x.orgDomain()[0] === org.xDomain[0]) {
			scale.x.domain([org.xDomain[0] - 1e-10, scale.x.orgDomain()[1]]);
		}

		$$.redraw({
			withTransition: false,
			withY: config.zoom_rescale,
			withSubchart: false,
			withEventRect: false,
			withDimension: false
		});

		$$.state.cancelClick = isMousemove;
		callFn(config.zoom_onzoom, $$.api, scale.zoom.domain());
	},

	/**
	 * 'end' event listener
	 * @param {object} event Event object
	 * @private
	 */
	onZoomEnd(event): void {
		const $$ = this;
		const {config, scale} = $$;
		let {startEvent} = $$.zoom;
		let e = event && event.sourceEvent;

		if ((startEvent && startEvent.type.indexOf("touch") > -1)) {
			startEvent = startEvent.changedTouches[0];
			e = e.changedTouches[0];
		}

		// if click, do nothing. otherwise, click interaction will be canceled.
		if (!startEvent ||
			(e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY)
		) {
			return;
		}

		$$.redrawEventRect();
		$$.updateZoom();

		$$.state.zooming = false;
		callFn(config.zoom_onzoomend, $$.api, scale[scale.zoom ? "zoom" : "subX"].domain());
	},

	/**
	 * Get zoom domain
	 * @returns {Array} zoom domain
	 * @private
	 */
	getZoomDomain(): [number, number] {
		const $$ = this;
		const {config, org} = $$;
		let [min, max] = org.xDomain;

		if (isDefined(config.zoom_x_min)) {
			min = getMinMax("min", [min, config.zoom_x_min]);
		}

		if (isDefined(config.zoom_x_max)) {
			max = getMinMax("max", [max, config.zoom_x_max]);
		}

		return [min, max];
	},

	/**
	 * Update zoom
	 * @param {boolean} force Force unzoom
	 * @private
	 */
	updateZoom(force: boolean): void {
		const $$ = this;
		const {subX, x, zoom} = $$.scale;

		if (zoom) {
			const zoomDomain = zoom.domain();
			const xDomain = subX.domain();
			const delta = 0.015; // arbitrary value

			const isfullyShown = (zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) &&
				(xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta));

			// check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
			if (force || isfullyShown) {
				$$.axis.x.scale(subX);
				x.domain(subX.orgDomain());
				$$.scale.zoom = null;
			}
		}
	},

	/**
	 * Attach zoom event on <rect>
	 * @param {d3.selection} eventRects evemt <rect> element
	 * @param {string} type zoom type
	 * @private
	 */
	bindZoomOnEventRect(eventRects, type: "drag" | "wheel"): void {
		const $$ = this;
		const behaviour = type === "drag" ? $$.zoomBehaviour : $$.zoom;

		// Since Chrome 89, wheel zoom not works properly
		// Applying the workaround: https://github.com/d3/d3-zoom/issues/231#issuecomment-802305692
		$$.$el.svg.on("wheel", () => {});

		eventRects
			.call(behaviour)
			.on("dblclick.zoom", null);
	},

	/**
	 * Initialize the drag behaviour used for zooming.
	 * @private
	 */
	initZoomBehaviour(): void {
		const $$ = this;
		const {config, state} = $$;
		const isRotated = config.axis_rotated;
		let start = 0;
		let end = 0;
		let zoomRect;

		const prop = {
			axis: isRotated ? "y" : "x",
			attr: isRotated ? "height" : "width",
			index: isRotated ? 1 : 0
		};

		$$.zoomBehaviour = d3Drag()
			.clickDistance(4)
			.on("start", function(event) {
				state.event = event;
				$$.setDragStatus(true);
				$$.unselectRect();

				if (!zoomRect) {
					zoomRect = $$.$el.main.append("rect")
						.attr("clip-path", state.clip.path)
						.attr("class", CLASS.zoomBrush)
						.attr("width", isRotated ? state.width : 0)
						.attr("height", isRotated ? 0 : state.height);
				}

				start = getPointer(event, this)[prop.index];
				end = start;

				zoomRect
					.attr(prop.axis, start)
					.attr(prop.attr, 0);

				$$.onZoomStart(event);
			})
			.on("drag", function(event) {
				end = getPointer(event, this)[prop.index];

				zoomRect
					.attr(prop.axis, Math.min(start, end))
					.attr(prop.attr, Math.abs(end - start));
			})
			.on("end", function(event) {
				const scale = $$.scale.zoom || $$.scale.x;

				state.event = event;
				$$.setDragStatus(false);

				zoomRect
					.attr(prop.axis, 0)
					.attr(prop.attr, 0);

				if (start > end) {
					[start, end] = [end, start];
				}

				if (start < 0) {
					end += Math.abs(start);
					start = 0;
				}

				if (start !== end) {
					$$.api.zoom([start, end].map(v => scale.invert(v)));
					$$.onZoomEnd(event);
				} else {
					if ($$.isMultipleX()) {
						$$.clickHandlerForMultipleXS.bind(this)($$);
					} else {
						const [x, y] = getPointer(event);
						const target = document.elementFromPoint(x, y);

						$$.clickHandlerForSingleX.bind(target)(d3Select(target).datum(), $$);
					}
				}
			});
	},

	setZoomResetButton(): void {
		const $$ = this;
		const {config} = $$;
		const resetButton = config.zoom_resetButton;

		if (resetButton && config.zoom_type === "drag") {
			if (!$$.zoom.resetBtn) {
				$$.zoom.resetBtn = $$.$el.chart.append("div")
					.classed(CLASS.button, true)
					.append("span")
					.on("click", function() {
						isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
						$$.api.unzoom();
					})
					.classed(CLASS.buttonZoomReset, true)
					.text(resetButton.text || "Reset Zoom");
			} else {
				$$.zoom.resetBtn.style("display", null);
			}
		}
	}
};
