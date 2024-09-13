/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$LEGEND} from "../../config/classes";
import {endall} from "../../module/util";

/**
 * Call done callback with resize after transition
 * @param {Function} fn Callback function
 * @param {boolean} resizeAfter Weather to resize chart after the load
 * @private
 */
export function callDone(fn, resizeAfter = false) {
	const $$ = this;
	const {api} = $$;

	resizeAfter && $$.api.flush(true);
	fn?.call(api);
}

export default {
	load(rawTargets, args): void {
		const $$ = this;
		const {axis, data, org, scale} = $$;
		const {append} = args;
		const zoomState = {
			domain: <any>null,
			currentDomain: <any>null,
			x: <any>null
		};
		let targets = rawTargets;

		if (targets) {
			// filter loading targets if needed
			if (args.filter) {
				targets = targets.filter(args.filter);
			}

			// set type if args.types || args.type specified
			if (args.type || args.types) {
				targets.forEach(t => {
					const type = args.types?.[t.id] || args.type;

					$$.setTargetType(t.id, type);
				});
			}

			// Update/Add data
			data.targets.forEach(d => {
				for (let i = 0; i < targets.length; i++) {
					if (d.id === targets[i].id) {
						d.values = append ? d.values.concat(targets[i].values) : targets[i].values;

						targets.splice(i, 1);
						break;
					}
				}
			});

			data.targets = data.targets.concat(targets); // add remained
		}

		// Set targets
		$$.updateTargets(data.targets);

		if (scale.zoom) {
			zoomState.x = axis.isCategorized() ?
				scale.x.orgScale() :
				(org.xScale || scale.x).copy();
			zoomState.domain = $$.getXDomain(data.targets); // get updated xDomain

			zoomState.x.domain(zoomState.domain);
			zoomState.currentDomain = $$.zoom.getDomain(); // current zoomed domain

			// reset zoom state when new data loaded is out of range
			if (!$$.withinRange(zoomState.currentDomain, undefined, zoomState.domain)) {
				scale.x.domain(zoomState.domain);
				scale.zoom = null;
				$$.$el.eventRect.property("__zoom", null);
			}
		}

		// Redraw with new targets
		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});

		// when load happens on zoom state
		if (scale.zoom) {
			// const x = (axis.isCategorized() ? scale.x.orgScale() : (org.xScale || scale.x)).copy();

			org.xDomain = zoomState.domain;
			org.xScale = zoomState.x;

			if (axis.isCategorized()) {
				zoomState.currentDomain = $$.getZoomDomainValue(zoomState.currentDomain);
				org.xDomain = $$.getZoomDomainValue(org.xDomain);
				org.xScale = zoomState.x.domain(org.xDomain);
			}

			$$.updateCurrentZoomTransform(zoomState.x, zoomState.currentDomain);

			// https://github.com/naver/billboard.js/issues/3878
		} else if (org.xScale) {
			org.xScale.domain(org.xDomain);
		}

		// Update current state chart type and elements list after redraw
		$$.updateTypesElements();

		callDone.call($$, args.done, args.resizeAfter);
	},

	loadFromArgs(args): void {
		const $$ = this;

		// prevent load when chart is already destroyed
		if (!$$.config) {
			return;
		}

		// reset internally cached data
		$$.cache.reset();

		$$.convertData(args, d => {
			const data = args.data || d;

			args.append && (data.__append__ = true);
			data && $$.load($$.convertDataToTargets(data), args);
		});
	},

	unload(rawTargetIds, customDoneCb): void {
		const $$ = this;
		const {state, $el, $T} = $$;
		const hasLegendDefsPoint = !!$$.hasLegendDefsPoint?.();
		let done = customDoneCb;
		let targetIds = rawTargetIds;

		// reset internally cached data
		$$.cache.reset();

		if (!done) {
			done = () => {};
		}

		// filter existing target
		targetIds = targetIds.filter(id => $$.hasTarget($$.data.targets, id));

		// If no target, call done and return
		if (!targetIds || targetIds.length === 0) {
			done();
			return;
		}

		const targets = $el.svg.selectAll(targetIds.map(id => $$.selectorTarget(id)));

		$T(targets)
			.style("opacity", "0")
			.remove()
			.call(endall, done);

		targetIds.forEach(id => {
			const suffixId = $$.getTargetSelectorSuffix(id);

			// Reset fadein for future load
			state.withoutFadeIn[id] = false;

			// Remove target's elements
			if ($el.legend) {
				$el.legend.selectAll(`.${$LEGEND.legendItem}${suffixId}`).remove();
			}

			// Remove target
			$$.data.targets = $$.data.targets.filter(t => t.id !== id);

			// Remove custom point def element
			hasLegendDefsPoint && $el.defs?.select(`#${$$.getDefsPointId(suffixId)}`).remove();
		});

		// since treemap uses different data types, it needs to be transformed
		state.hasFunnel && $$.updateFunnel($$.data.targets);

		// since treemap uses different data types, it needs to be transformed
		state.hasTreemap && $$.updateTargetsForTreemap($$.data.targets);

		// Update current state chart type and elements list after redraw
		$$.updateTypesElements();
	}
};
