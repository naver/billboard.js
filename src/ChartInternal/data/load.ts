/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {$LEGEND} from "../../config/classes";
import {endall} from "../../module/util";

export default {
	load(rawTargets, args): void {
		const $$ = this;
		const {append} = args;
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
			$$.data.targets.forEach(d => {
				for (let i = 0; i < targets.length; i++) {
					if (d.id === targets[i].id) {
						d.values = append ?
							d.values.concat(targets[i].values) : targets[i].values;

						targets.splice(i, 1);
						break;
					}
				}
			});

			$$.data.targets = $$.data.targets.concat(targets); // add remained
		}

		// Set targets
		$$.updateTargets($$.data.targets);

		// Redraw with new targets
		$$.redraw({
			withUpdateOrgXDomain: true,
			withUpdateXDomain: true,
			withLegend: true
		});

		// Update current state chart type and elements list after redraw
		$$.updateTypesElements();

		args.done?.call($$.api);
	},

	loadFromArgs(args): void {
		const $$ = this;

		// prevent load when chart is already destroyed
		if (!$$.config) {
			return;
		}

		// reset internally cached data
		$$.cache.reset();

		const data = args.data || $$.convertData(args, d => $$.load($$.convertDataToTargets(d), args));

		args.append && (data.__append__ = true);

		data && $$.load($$.convertDataToTargets(data), args);
	},

	unload(rawTargetIds, customDoneCb): void {
		const $$ = this;
		const {state, $el, $T} = $$;
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
			// Reset fadein for future load
			state.withoutFadeIn[id] = false;

			// Remove target's elements
			if ($el.legend) {
				$el.legend.selectAll(`.${$LEGEND.legendItem}${$$.getTargetSelectorSuffix(id)}`).remove();
			}

			// Remove target
			$$.data.targets = $$.data.targets.filter(t => t.id !== id);
		});

		// Update current state chart type and elements list after redraw
		$$.updateTypesElements();
	}
};
