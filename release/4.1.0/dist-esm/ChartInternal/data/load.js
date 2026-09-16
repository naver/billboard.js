/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { endall } from "../../module/util/object.js";
import { $LEGEND } from "../../config/classes.js";
import { KEY } from "../../module/Cache.js";
//#region src/ChartInternal/data/load.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Call done callback with resize after transition
* @param {function} fn Callback function
* @param {boolean} resizeAfter Weather to resize chart after the load
* @private
*/
function callDone(fn, resizeAfter = false) {
	const $$ = this;
	const { api } = $$;
	resizeAfter && $$.api.flush(true);
	fn?.call(api);
}
var load_default = {
	load(rawTargets, args) {
		const $$ = this;
		const { axis, data, org, scale } = $$;
		const { append } = args;
		const zoomState = {
			domain: null,
			currentDomain: null,
			x: null
		};
		let targets = rawTargets;
		if (targets) {
			if (args.filter) targets = targets.filter(args.filter);
			if (args.type || args.types) targets.forEach((t) => {
				$$.setTargetType(t.id, args.types?.[t.id] || args.type);
			});
			const incoming = new Map(targets.map((t) => [t.id, t]));
			data.targets.forEach((d) => {
				const t = incoming.get(d.id);
				if (t) {
					if (append) {
						const values = t.values;
						for (let j = 0; j < values.length; j++) d.values.push(values[j]);
					} else d.values = t.values;
					incoming.delete(d.id);
				}
			});
			incoming.forEach((t) => data.targets.push(t));
		}
		if ($$.state.isCanvasMode) {
			$$.redraw({
				withUpdateOrgXDomain: true,
				withUpdateXDomain: true,
				withLegend: true
			});
			$$.updateTypesElements();
			callDone.call($$, args.done, args.resizeAfter);
			return;
		}
		$$.updateTargets(data.targets);
		if (scale.zoom) {
			zoomState.x = axis.isCategorized() ? scale.x.orgScale() : (org.xScale || scale.x).copy();
			zoomState.domain = $$.getXDomain(data.targets);
			zoomState.x.domain(zoomState.domain);
			zoomState.currentDomain = $$.zoom.getDomain();
			if (!$$.withinRange(zoomState.currentDomain, void 0, zoomState.domain)) {
				scale.x.domain(zoomState.domain);
				scale.zoom = null;
				$$.$el.eventRect.property("__zoom", null);
			}
		}
		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});
		if (scale.zoom) {
			org.xDomain = zoomState.domain;
			org.xScale = zoomState.x;
			if (axis.isCategorized()) {
				zoomState.currentDomain = $$.getZoomDomainValue(zoomState.currentDomain);
				org.xDomain = $$.getZoomDomainValue(org.xDomain);
				org.xScale = zoomState.x.domain(org.xDomain);
			}
			$$.updateCurrentZoomTransform(zoomState.x, zoomState.currentDomain);
		} else if (org.xScale) org.xScale.domain(org.xDomain);
		$$.updateTypesElements();
		callDone.call($$, args.done, args.resizeAfter);
	},
	loadFromArgs(args) {
		const $$ = this;
		if (!$$.config) return;
		$$.cache.reset(false, [
			KEY.filteredTargets,
			KEY.maxDataCountTarget,
			KEY.valuesXIndexMap,
			KEY.maxTickSize
		]);
		$$.convertData(args, (d) => {
			const data = args.data || d;
			args.append && (data.__append__ = true);
			data && $$.load($$.convertDataToTargets.call($$, data), args);
		});
	},
	unload(rawTargetIds, customDoneCb) {
		const $$ = this;
		const { state, $el, $T } = $$;
		const hasLegendDefsPoint = !!$$.hasLegendDefsPoint?.();
		let done = customDoneCb;
		let targetIds = rawTargetIds;
		$$.cache.reset(false, [
			KEY.filteredTargets,
			KEY.maxDataCountTarget,
			KEY.valuesXIndexMap,
			KEY.maxTickSize
		]);
		if (!done) done = () => {};
		targetIds = targetIds.filter((id) => $$.hasTarget($$.data.targets, id));
		if (targetIds.length === 0) {
			done();
			return;
		}
		const unloadIds = new Set(targetIds);
		if (state.isCanvasMode) {
			targetIds.forEach((id) => {
				state.withoutFadeIn[id] = false;
			});
			$$.data.targets = $$.data.targets.filter((t) => !unloadIds.has(t.id));
			$$.removeHiddenTargetIds(targetIds);
			$$.removeHiddenLegendIds(targetIds);
			$$.updateTypesElements();
			done();
			return;
		}
		targetIds.forEach((id) => {
			const suffixId = $$.getTargetSelectorSuffix(id);
			state.withoutFadeIn[id] = false;
			if ($el.legend) $el.legend.selectAll(`.${$LEGEND.legendItem}${suffixId}`).remove();
			hasLegendDefsPoint && $el.defs?.select(`#${$$.getDefsPointId(suffixId)}`).remove();
		});
		$$.data.targets = $$.data.targets.filter((t) => !unloadIds.has(t.id));
		state.hasFunnel && $$.updateFunnel($$.data.targets);
		state.hasTreemap && $$.updateTargetsForTreemap($$.data.targets);
		$$.updateTypesElements();
		$T($el.svg.selectAll(targetIds.map((id) => $$.selectorTarget(id)))).style("opacity", "0").remove().call(endall, done);
	}
};
//#endregion
export { callDone, load_default as default };
