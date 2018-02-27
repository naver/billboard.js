/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {selectAll as d3SelectAll} from "d3-selection";
import {easeLinear as d3EaseLinear} from "d3-ease";
import {transition as d3Transition} from "d3-transition";
import Chart from "../internals/Chart";
import ChartInternal from "../internals/ChartInternal";
import {isDefined, isValue, diffDomain, extend} from "../internals/util";
import CLASS from "../config/classes";

extend(Chart.prototype, {
	/**
	 * Flow data to the chart.<br><br>
	 * By this API, you can append new data points to the chart.
	 * @method flow
	 * @instance
	 * @memberOf Chart
	 * @param {Object} args The object can consist with following members:<br>
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
	 *   If json, rows and columns given, the data will be loaded.<br>
	 *   If data that has the same target id is given, the chart will be appended.<br>
	 *   Otherwise, new target will be added. One of these is required when calling.<br>
	 *   If json specified, keys is required as well as data.json.
	 * @example
	 * // 2 data points will be apprended to the tail and popped from the head.
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
	flow(args) {
		const $$ = this.internal;
		const notfoundIds = [];
		const orgDataCount = $$.getMaxDataCount();

		let data;
		let domain;
		let length = 0;
		let tail = 0;
		let diff;
		let to;

		if (args.json) {
			data = $$.convertJsonToData(args.json, args.keys);
		} else if (args.rows) {
			data = $$.convertRowsToData(args.rows);
		} else if (args.columns) {
			data = $$.convertColumnsToData(args.columns);
		} else {
			return;
		}

		const targets = $$.convertDataToTargets(data, true);

		// Update/Add data
		$$.data.targets.forEach(t => {
			let found = false;

			for (let i = 0; i < targets.length; i++) {
				if (t.id === targets[i].id) {
					found = true;

					if (t.values[t.values.length - 1]) {
						tail = t.values[t.values.length - 1].index + 1;
					}

					length = targets[i].values.length;

					for (let j = 0; j < length; j++) {
						targets[i].values[j].index = tail + j;

						if (!$$.isTimeSeries()) {
							targets[i].values[j].x = tail + j;
						}
					}

					t.values = t.values.concat(targets[i].values);
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
					tail = t.values[t.values.length - 1].index + 1;

					for (let j = 0; j < length; j++) {
						t.values.push({
							id: t.id,
							index: tail + j,
							x: $$.isTimeSeries() ? $$.getOtherTargetX(tail + j) : tail + j,
							value: null
						});
					}
				}
			}
		});

		// Generate null values for new target
		if ($$.data.targets.length) {
			targets.forEach(t => {
				const missing = [];

				for (let i = $$.data.targets[0].values[0].index; i < tail; i++) {
					missing.push({
						id: t.id,
						index: i,
						x: $$.isTimeSeries() ? $$.getOtherTargetX(i) : i,
						value: null
					});
				}

				t.values.forEach(v => {
					v.index += tail;

					if (!$$.isTimeSeries()) {
						v.x += tail;
					}
				});

				t.values = missing.concat(t.values);
			});
		}

		$$.data.targets = $$.data.targets.concat(targets); // add remained

		// check data count because behavior needs to change when it"s only one
		// const dataCount = $$.getMaxDataCount();
		const baseTarget = $$.data.targets[0];
		const baseValue = baseTarget.values[0];

		// Update length to flow if needed
		if (isDefined(args.to)) {
			length = 0;
			to = $$.isTimeSeries() ? $$.parseDate(args.to) : args.to;
			baseTarget.values.forEach(v => {
				v.x < to && length++;
			});
		} else if (isDefined(args.length)) {
			length = args.length;
		}

		// If only one data, update the domain to flow from left edge of the chart
		if (!orgDataCount) {
			if ($$.isTimeSeries()) {
				diff = baseTarget.values.length > 1 ?
					baseTarget.values[baseTarget.values.length - 1].x - baseValue.x :
					baseValue.x - $$.getXDomain($$.data.targets)[0];
			} else {
				diff = 1;
			}

			domain = [baseValue.x - diff, baseValue.x];
			$$.updateXDomain(null, true, true, false, domain);
		} else if (orgDataCount === 1) {
			if ($$.isTimeSeries()) {
				diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
				domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
				$$.updateXDomain(null, true, true, false, domain);
			}
		}

		// Set targets
		$$.updateTargets($$.data.targets);

		// Redraw with new targets
		$$.redraw({
			flow: {
				index: baseValue.index,
				length: length,
				duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,
				done: args.done,
				orgDataCount: orgDataCount,
			},
			withLegend: true,
			withTransition: orgDataCount > 1,
			withTrimXDomain: false,
			withUpdateXAxis: true
		});
	}
});

extend(ChartInternal.prototype, {
	/**
	 * Generate flow
	 * @memberOf ChartInternal
	 * @private
	 * @param {Object} args
	 * @return {Function}
	 */
	generateFlow(args) {
		const $$ = this;
		const config = $$.config;

		return function() {
			const targets = args.targets;
			const flow = args.flow;
			const drawBar = args.drawBar;
			const drawLine = args.drawLine;
			const drawArea = args.drawArea;
			const cx = args.cx;
			const cy = args.cy;
			const xv = args.xv;
			const xForText = args.xForText;
			const yForText = args.yForText;
			const duration = args.duration;

			let translateX;
			let scaleX = 1;
			const flowIndex = flow.index;
			const flowLength = flow.length;
			let flowStart = $$.getValueOnIndex($$.data.targets[0].values, flowIndex);
			let flowEnd = $$.getValueOnIndex($$.data.targets[0].values, flowIndex + flowLength);
			const orgDomain = $$.x.domain();
			const durationForFlow = flow.duration || duration;
			const done = flow.done || function() {};
			const wait = $$.generateWait();

			const xgrid = $$.xgrid || d3SelectAll([]);
			const xgridLines = $$.xgridLines || d3SelectAll([]);
			const mainRegion = $$.mainRegion || d3SelectAll([]);
			const mainText = $$.mainText || d3SelectAll([]);
			const mainBar = $$.mainBar || d3SelectAll([]);
			const mainLine = $$.mainLine || d3SelectAll([]);
			const mainArea = $$.mainArea || d3SelectAll([]);
			const mainCircle = $$.mainCircle || d3SelectAll([]);

			// set flag
			$$.flowing = true;

			// remove head data after rendered
			$$.data.targets.forEach(d => {
				d.values.splice(0, flowLength);
			});

			// update x domain to generate axis elements for flow
			const domain = $$.updateXDomain(targets, true, true);

			// update elements related to x scale
			if ($$.updateXGrid) { $$.updateXGrid(true); }

			// generate transform to flow
			if (!flow.orgDataCount) { // if empty
				if ($$.data.targets[0].values.length !== 1) {
					translateX = $$.x(orgDomain[0]) - $$.x(domain[0]);
				} else {
					if ($$.isTimeSeries()) {
						flowStart = $$.getValueOnIndex($$.data.targets[0].values, 0);
						flowEnd = $$.getValueOnIndex($$.data.targets[0].values, $$.data.targets[0].values.length - 1);
						translateX = $$.x(flowStart.x) - $$.x(flowEnd.x);
					} else {
						translateX = diffDomain(domain) / 2;
					}
				}
			} else if (flow.orgDataCount === 1 || (flowStart && flowStart.x) === (flowEnd && flowEnd.x)) {
				translateX = $$.x(orgDomain[0]) - $$.x(domain[0]);
			} else {
				if ($$.isTimeSeries()) {
					translateX = ($$.x(orgDomain[0]) - $$.x(domain[0]));
				} else {
					translateX = ($$.x(flowStart.x) - $$.x(flowEnd.x));
				}
			}

			scaleX = (diffDomain(orgDomain) / diffDomain(domain));
			const transform = `translate(${translateX},0) scale(${scaleX},1)`;

			$$.hideXGridFocus();

			const gt = d3Transition().ease(d3EaseLinear)
				.duration(durationForFlow);

			wait.add([
				$$.axes.x
					.transition(gt)
					.call($$.xAxis.setTransition(gt)),

				mainBar
					.transition(gt)
					.attr("transform", transform),

				mainLine
					.transition(gt)
					.attr("transform", transform),

				mainArea
					.transition(gt)
					.attr("transform", transform),

				mainCircle
					.transition(gt)
					.attr("transform", transform),

				mainText
					.transition(gt)
					.attr("transform", transform),

				mainRegion
					.filter($$.isRegionOnX)
					.transition(gt)
					.attr("transform", transform),

				xgrid
					.transition(gt)
					.attr("transform", transform),

				xgridLines
					.transition(gt)
					.attr("transform", transform),
			]);

			gt.call(wait, () => {
				const shapes = [];
				const texts = [];
				const eventRects = [];

				// remove flowed elements
				if (flowLength) {
					for (let i = 0; i < flowLength; i++) {
						const index = flowIndex + i;

						shapes.push(`.${CLASS.shape}-${index}`);
						texts.push(`.${CLASS.text}-${index}`);
						eventRects.push(`.${CLASS.eventRect}-${index}`);
					}

					$$.svg.selectAll(`.${CLASS.shapes}`)
						.selectAll(shapes)
						.remove();

					$$.svg.selectAll(`.${CLASS.texts}`)
						.selectAll(texts)
						.remove();

					$$.svg.selectAll(`.${CLASS.eventRects}`)
						.selectAll(eventRects)
						.remove();

					$$.svg.select(`.${CLASS.xgrid}`)
						.remove();
				}

				// draw again for removing flowed elements and reverting attr
				xgrid.size() && xgrid
					.attr("transform", null)
					.attr($$.xgridAttr);

				xgridLines
					.attr("transform", null);

				xgridLines.select("line")
					.attr("x1", config.axis_rotated ? 0 : xv)
					.attr("x2", config.axis_rotated ? $$.width : xv);

				xgridLines.select("text")
					.attr("x", config.axis_rotated ? $$.width : 0)
					.attr("y", xv);

				mainBar
					.attr("transform", null)
					.attr("d", drawBar);

				mainLine
					.attr("transform", null)
					.attr("d", drawLine);

				mainArea
					.attr("transform", null)
					.attr("d", drawArea);

				mainCircle
					.attr("transform", null);

				if ($$.isCirclePoint()) {
					mainCircle
						.attr("cx", cx)
						.attr("cy", cy);
				} else {
					const xFunc = d => cx(d) - config.point_r;
					const yFunc = d => cy(d) - config.point_r;

					mainCircle
						.attr("x", xFunc)
						.attr("y", yFunc)
						.attr("cx", cx) // when pattern is used, it possibly contain 'circle' also.
						.attr("cy", cy);
				}

				mainText
					.attr("transform", null)
					.attr("x", xForText)
					.attr("y", yForText)
					.style("fill-opacity", $$.opacityForText.bind($$));

				mainRegion
					.attr("transform", null);

				mainRegion.select("rect").filter($$.isRegionOnX)
					.attr("x", $$.regionX.bind($$))
					.attr("width", $$.regionWidth.bind($$));

				config.interaction_enabled && $$.redrawEventRect();

				// callback for end of flow
				done();

				$$.flowing = false;
			});
		};
	}
});
