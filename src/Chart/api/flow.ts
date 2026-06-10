/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isDefined, isTabVisible, isValue, parseDate} from "../../module/util";

export default {
	/**
	 * Flow data to the chart.<br><br>
	 * By this API, you can append new data points to the chart.
	 * @function flow
	 * @instance
	 * @memberof Chart
	 * @param {object} args The object can consist with following members:<br>
	 *
	 *    | Key | Type | Description |
	 *    | --- | --- | --- |
	 *    | json | Object | Data as JSON format (@see [data․json](Options.html#.data%25E2%2580%25A4json)) |
	 *    | rows | Array | Data in array as row format (@see [data․rows](Options.html#.data%25E2%2580%25A4json)) |
	 *    | columns | Array | Data in array as column format (@see [data․columns](Options.html#.data%25E2%2580%25A4columns)) |
	 *    | to | String | The lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points |
	 *    | length | Number | The lower x edge will move by the number of this argument |
	 *    | duration | Number | The duration of the transition will be specified value. If not given, transition.duration will be used as default |
	 *    | done | Function | The specified function will be called when flow ends |
	 *
	 * - **NOTE:**
	 *   - If json, rows and columns given, the data will be loaded.
	 *   - If data that has the same target id is given, the chart will be appended.
	 *   - Otherwise, new target will be added. One of these is required when calling.
	 *   - If json specified, keys is required as well as data.json.
	 * 	 - If tab isn't visible(by evaluating `document.hidden`), will not be executed to prevent unnecessary work.
	 * @example
	 * // 2 data points will be appended to the tail and popped from the head.
	 * // After that, 4 data points will be appended and no data points will be poppoed.
	 * chart.flow({
	 *  columns: [
	 *    ["x", "2018-01-11", "2018-01-21"],
	 *    ["data1", 500, 200],
	 *    ["data2", 100, 300],
	 *    ["data3", 200, 120]
	 *  ],
	 *  to: "2013-01-11",
	 *  done: function () {
	 *    chart.flow({
	 *      columns: [
	 *        ["x", "2018-02-11", "2018-02-12", "2018-02-13", "2018-02-14"],
	 *        ["data1", 200, 300, 100, 250],
	 *        ["data2", 100, 90, 40, 120],
	 *        ["data3", 100, 100, 300, 500]
	 *      ],
	 *      length: 2,
	 *      duration: 1500
	 *    });
	 *  }
	 * });
	 */
	flow(args): void {
		const $$ = this.internal;
		let data;

		if (args.json || args.rows || args.columns) {
			$$.convertData(args, res => {
				data = res;
				_();
			});
		}

		/**
		 * Process flows
		 * @private
		 */
		function _(): void {
			let domain;
			let length: number = 0;
			let tail = 0;
			let diff;
			let to;

			if ($$.state.redrawing || !data || !isTabVisible()) {
				return;
			}

			$$.flushCanvasFlow?.();

			const notfoundIds: string[] = [];
			const orgDataCount = $$.getMaxDataCount();
			const targets = $$.convertDataToTargets(data, true);
			const isTimeSeries = $$.axis.isTimeSeries();

			// Update/Add data
			$$.data.targets.forEach(t => {
				let found = false;

				for (let i = 0; i < targets.length; i++) {
					if (t.id === targets[i].id) {
						found = true;

						if (t.values[t.values.length - 1]) {
							tail = t.values[t.values.length - 1].index + 1;
						}

						const values = targets[i].values;

						length = values.length;

						for (let j = 0; j < length; j++) {
							values[j].index = tail + j;

							if (!isTimeSeries) {
								values[j].x = tail + j;
							}

							t.values.push(values[j]);
						}

						targets.splice(i, 1);
						break;
					}
				}

				!found && notfoundIds.push(t.id);
			});

			// Append null for not found targets
			$$.data.targets.forEach(t => {
				for (let i = 0; i < notfoundIds.length; i++) {
					if (t.id === notfoundIds[i]) {
						// target can have no values when fully flowed out
						if (!t.values[t.values.length - 1]) {
							continue;
						}

						tail = t.values[t.values.length - 1].index + 1;

						for (let j = 0; j < length; j++) {
							t.values.push({
								id: t.id,
								index: tail + j,
								x: isTimeSeries ? $$.getOtherTargetX(tail + j) : tail + j,
								value: null
							});
						}
					}
				}
			});

			// Generate null values for new target
			if ($$.data.targets.length) {
				targets.forEach(t => {
					const firstIndex = $$.data.targets[0].values[0].index;
					const values = t.values;
					const valueLength = values.length;
					const missingLength = Math.max(tail - firstIndex, 0);

					if (missingLength) {
						values.length = valueLength + missingLength;

						for (let i = valueLength - 1; i >= 0; i--) {
							values[i + missingLength] = values[i];
						}

						for (let i = 0; i < missingLength; i++) {
							const index = firstIndex + i;

							values[i] = {
								id: t.id,
								index,
								x: isTimeSeries ? $$.getOtherTargetX(index) : index,
								value: null
							};
						}
					}

					for (let i = missingLength; i < values.length; i++) {
						const v = values[i];

						v.index += tail;

						if (!isTimeSeries) {
							v.x += tail;
						}
					}
				});
			}

			for (let i = 0; i < targets.length; i++) {
				$$.data.targets.push(targets[i]); // add remained
			}

			// check data count because behavior needs to change when it"s only one
			// const dataCount = $$.getMaxDataCount();
			const baseTarget = $$.data.targets[0];
			const baseValue = baseTarget.values[0];

			// Update length to flow if needed
			if (isDefined(args.to)) {
				length = 0;
				to = isTimeSeries ? parseDate.call($$, args.to) : args.to;

				baseTarget.values.forEach(v => {
					v.x < to && length++;
				});
			} else if (isDefined(args.length)) {
				length = args.length;
			}

			// If only one data, update the domain to flow from left edge of the chart
			if (!orgDataCount) {
				if (isTimeSeries) {
					diff = baseTarget.values.length > 1 ?
						baseTarget.values[baseTarget.values.length - 1].x - baseValue.x :
						baseValue.x - $$.getXDomain($$.data.targets)[0];
				} else {
					diff = 1;
				}

				domain = [baseValue.x - diff, baseValue.x];
			} else if (orgDataCount === 1 && isTimeSeries) {
				diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
				domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
			}

			domain && $$.updateXDomain(null, true, true, false, domain);

			if ($$.state.isCanvasMode) {
				const duration = isValue(args.duration) ?
					args.duration :
					$$.config.transition_duration;
				const animated = $$.animateCanvasFlow?.({
					done: args.done,
					duration,
					length,
					orgDataCount
				});

				if (animated) {
					return;
				}

				// Canvas mode has no retained SVG nodes to transition. Mutate the data to the
				// post-flow state, then redraw the final frame.
				if (length && orgDataCount) {
					$$.data.targets.forEach(d => {
						d.values.splice(0, length);
					});
				}

				$$.state.dirty.data = true;
				$$.state._eventRectFingerprint = null;

				$$.redraw({
					withLegend: true,
					withTransition: false,
					withTrimXDomain: false,
					withUpdateOrgXDomain: true,
					withUpdateXAxis: true,
					withUpdateXDomain: true
				});
				$$.updateTypesElements();
				args.done?.call($$.api);
				return;
			}

			// Set targets
			$$.updateTargets($$.data.targets);
			$$.state.dirty.data = true;
			$$.state._eventRectFingerprint = null;

			// Redraw with new targets
			$$.redraw({
				flow: {
					index: baseValue.index,
					length: length,
					duration: isValue(args.duration) ?
						args.duration :
						$$.config.transition_duration,
					done: args.done,
					orgDataCount: orgDataCount
				},
				withLegend: true,
				withTransition: orgDataCount > 1,
				withTrimXDomain: false,
				withUpdateXAxis: true
			});
		}
	}
};
