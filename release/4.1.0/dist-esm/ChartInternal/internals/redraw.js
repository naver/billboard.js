/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { notEmpty } from "../../module/util/type-checks.js";
import { callFn, capitalize, getOption } from "../../module/util/object.js";
import { isTabVisible } from "../../module/util/dom.js";
import { $COMMON, $SELECT, $TEXT } from "../../config/classes.js";
import { KEY } from "../../module/Cache.js";
import { generateWait } from "../../module/generator.js";
import { transition } from "d3-transition";
//#region src/ChartInternal/internals/redraw.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
var redraw_default = {
	redraw(options = {}) {
		const $$ = this;
		const { config, state, $el } = $$;
		const { main, treemap } = $el;
		state.redrawing = true;
		state.redrawGeneration++;
		if (state.dirty.data || state.dirty.visibility || options.initializing) state.dataGeneration++;
		if (options.initializing || state.dirty.size || state.dirty.data || !state.rendered) $$.cache.remove([KEY.svgLeft]);
		const targetsToShow = $$.filterTargetsToShow($$.data.targets);
		state._targetsToShow = targetsToShow;
		const dirtySnapshot = {
			data: state.dirty.data,
			visibility: state.dirty.visibility,
			size: state.dirty.size
		};
		state.dirty.data = false;
		state.dirty.visibility = false;
		state.dirty.size = false;
		const { flow, initializing } = options;
		const wth = $$.getWithOption(options);
		const duration = wth.Transition ? config.transition_duration : 0;
		const durationForExit = wth.TransitionForExit ? duration : 0;
		const transitions = $$.axis?.generateTransitions(wth.TransitionForAxis ? duration : 0);
		const needShapeUpdate = dirtySnapshot.data || dirtySnapshot.visibility || initializing;
		if (state.isCanvasMode) {
			$$.setContainerSize();
			$$.updateHtmlLegend?.();
		}
		$$.updateSizes(initializing);
		if (state.isCanvasMode) {
			const zoomScale = $$.scale.zoom;
			const zoomDomain = zoomScale?.domain();
			zoomScale && ($$.scale.zoom = null);
			$$.updateScales(initializing, wth.UpdateXDomain);
			if (zoomScale) {
				zoomScale.range($$.scale.x.range());
				zoomDomain && zoomScale.domain(zoomDomain);
				$$.scale.zoom = $$.getCustomizedXScale(zoomScale);
				$$.axis.x.scale($$.scale.zoom);
				$$.scale.x.domain(config.zoom_rescale ? zoomDomain : $$.org.xDomain);
				$$.scale.subX.domain($$.org.xDomain);
			}
			state.hasAxis && $$.axis.syncAxisDomains(targetsToShow, wth, flow);
			state.hasAxis && $$.applyCanvasSubchartDomain?.();
			const shape = needShapeUpdate ? $$.getDrawShape() : state._cachedDrawShape || $$.getDrawShape();
			if (needShapeUpdate) state._cachedDrawShape = shape;
			if (config.legend_show && $el.legend && !(config.legend_contents_bindto && config.legend_contents_template)) $$.positionHtmlLegend?.();
			$$.resizeCanvas?.();
			state.canvasFocusKey = null;
			$$.renderCanvasFrame(shape, null, true);
			initializing && $$.updateTypesElements();
			$$.callPluginHook("$redraw", options, 0);
			state.redrawing = false;
			state._targetsToShow = null;
			state._cachedDrawShape = null;
			$$.mapToIds($$.data.targets).forEach((id) => {
				state.withoutFadeIn[id] = true;
			});
			callFn(config.onrendered, $$.api);
			return;
		}
		if (wth.Legend && config.legend_show) {
			options.withTransition = !!duration;
			!treemap && $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
		} else if (wth.Dimension) $$.updateDimension(true);
		config.data_empty_label_text && main.select(`text.${$TEXT.text}.${$COMMON.empty}`).attr("x", state.width / 2).attr("y", state.height / 2).text(config.data_empty_label_text).style("display", targetsToShow.length ? "none" : null);
		$$.redrawTitle?.();
		if (state.hasAxis) {
			$$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);
			$$.hasGrid?.() && $$.updateGrid();
			config.regions.length && $$.updateRegion?.();
			[
				"bar",
				"candlestick",
				"line",
				"area"
			].forEach((v) => {
				const name = capitalize(v);
				if (/^(line|area)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) {
					if (needShapeUpdate) $$[`update${name}`](wth.TransitionForExit);
				}
			});
			$el.text && main.selectAll(`.${$SELECT.selectedCircles}`).filter($$.isBarType.bind($$)).selectAll("circle").remove();
			if (config.interaction_enabled && !flow && wth.EventRect) {
				$$.redrawEventRect();
				$$.bindZoomEvent?.();
			}
		} else {
			$el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);
			$el.radar && $$.redrawRadar();
			$el.polar && $$.redrawPolar();
			$el.funnel && $$.redrawFunnel();
			treemap && $$.updateTreemap(durationForExit);
		}
		if (!state.resizing && !treemap && ($$.hasPointType() || state.hasRadar)) {
			if (needShapeUpdate) $$.updateCircle();
		} else if ($$.hasLegendDefsPoint?.()) $$.data.targets.forEach($$.point("create", this));
		if ($$.hasDataLabel() && !$$.hasArcType(null, ["radar"])) {
			if (needShapeUpdate) $$.updateText();
		}
		initializing && $$.updateTypesElements();
		$$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart, needShapeUpdate);
		$$.updateTooltipOnRedraw();
		$$.callPluginHook("$redraw", options, duration);
	},
	/**
	* Generate redraw list
	* @param {object} targets targets data to be shown
	* @param {object} flow flow object
	* @param {number} duration duration value
	* @param {boolean} withSubchart whether or not to show subchart
	* @param {boolean} needShapeRegen whether to regenerate draw shape
	* @private
	*/
	generateRedrawList(targets, flow, duration, withSubchart, needShapeRegen = true) {
		const $$ = this;
		const { config, state } = $$;
		const shape = needShapeRegen ? $$.getDrawShape() : state._cachedDrawShape || $$.getDrawShape();
		if (needShapeRegen) state._cachedDrawShape = shape;
		if (state.hasAxis) config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
		const flowFn = flow && $$.generateFlow({
			targets,
			flow,
			duration: flow.duration,
			shape,
			xv: $$.xv.bind($$)
		});
		const withTransition = (duration || flowFn) && isTabVisible();
		const redrawList = $$.getRedrawList(shape, flow, flowFn, withTransition);
		const afterRedraw = () => {
			flowFn && flowFn();
			state.redrawing = false;
			state._targetsToShow = null;
			state._cachedDrawShape = null;
			callFn(config.onrendered, $$.api);
		};
		if (withTransition && redrawList.length) {
			const waitForDraw = generateWait();
			transition().duration(duration).each(() => {
				redrawList.flatMap((t1) => t1).forEach((t) => waitForDraw.add(t));
			}).call(waitForDraw, afterRedraw);
		} else if (!state.transiting) afterRedraw();
		$$.mapToIds($$.data.targets).forEach((id) => {
			state.withoutFadeIn[id] = true;
		});
	},
	getRedrawList(shape, flow, flowFn, withTransition) {
		const $$ = this;
		const { config, state: { hasAxis, hasRadar, hasTreemap }, $el: { grid } } = $$;
		const { cx, cy, xForText, yForText } = shape.pos;
		const list = [];
		if (hasAxis) {
			if ($$.redrawGrid && (config.grid_x_lines.length || config.grid_y_lines.length)) list.push($$.redrawGrid(withTransition));
			if ($$.redrawRegion && config.regions.length) list.push($$.redrawRegion(withTransition));
			for (const v in shape.type) {
				const name = capitalize(v);
				const drawFn = shape.type[v];
				if (/^(area|line)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) list.push($$[`redraw${name}`](drawFn, withTransition));
			}
			!flow && grid.main && $$.updateGridFocus && list.push($$.updateGridFocus());
		}
		if (!$$.hasArcType() || hasRadar) notEmpty(config.data_labels) && config.data_labels !== false && list.push($$.redrawText(xForText, yForText, flow, withTransition));
		if (($$.hasPointType() || hasRadar) && !$$.isPointFocusOnly()) $$.redrawCircle && list.push($$.redrawCircle(cx, cy, withTransition, flowFn));
		if (hasTreemap) list.push($$.redrawTreemap(withTransition));
		return list;
	},
	updateAndRedraw(options = {}) {
		const $$ = this;
		const { config, state } = $$;
		let transitions;
		options.withTransition = getOption(options, "withTransition", true);
		options.withTransform = getOption(options, "withTransform", false);
		options.withLegend = getOption(options, "withLegend", false);
		options.withUpdateXDomain = true;
		options.withUpdateOrgXDomain = true;
		options.withTransitionForExit = false;
		options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition);
		if (!(options.withLegend && config.legend_show)) {
			if (state.hasAxis) transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0);
			$$.updateScales();
			$$.updateSvgSize();
			$$.transformAll(options.withTransitionForTransform, transitions);
		}
		$$.redraw(options);
	}
};
//#endregion
export { redraw_default as default };
