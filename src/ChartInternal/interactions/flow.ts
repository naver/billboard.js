/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {easeLinear as d3EaseLinear} from "d3-ease";
import {transition as d3Transition} from "d3-transition";
import {diffDomain} from "../../module/util";
import CLASS from "../../config/classes";

export default {
	/**
	 * Generate flow
	 * @memberof ChartInternal
	 * @private
	 * @param {Object} args
	 * @return {Function}
	 */
	generateFlow(args) {
		const $$ = this;
		const {config, state, $el} = $$;

		return function() {
			const targets = args.targets;
			const flow = args.flow;

			const {bar: drawBar, line: drawLine, area: drawArea} = args.shape.type;
			const {cx, cy, xForText, yForText} = args.shape.pos;
			const xv = args.xv;
			const duration = args.duration;

			let translateX;
			let scaleX = 1;
			const flowIndex = flow.index;
			const flowLength = flow.length;
			let flowStart = $$.getValueOnIndex($$.data.targets[0].values, flowIndex);
			let flowEnd = $$.getValueOnIndex($$.data.targets[0].values, flowIndex + flowLength);
			const orgDomain = $$.scale.x.domain();
			const durationForFlow = flow.duration || duration;
			const done = flow.done || function() {};
			const wait = $$.generateWait();

			const xgrid = $el.grid.x;
			const xgridLines = $el.gridLines.x;
			const mainRegion = $el.region.list;
			const mainText = $el.text;
			const mainBar = $el.bar;
			const mainLine = $el.line;
			const mainArea = $el.area;
			const mainCircle = $el.circle;

			// set flag
			state.flowing = true;

			// remove head data after rendered
			$$.data.targets.forEach(d => {
				d.values.splice(0, flowLength);
			});

			// update x domain to generate axis elements for flow
			const domain = $$.updateXDomain(targets, true, true);

			// update elements related to x scale
			if ($$.updateXGrid) { $$.updateXGrid(true); }

			const {x} = $$.scale;

			// generate transform to flow
			if (!flow.orgDataCount) { // if empty
				if ($$.data.targets[0].values.length !== 1) {
					translateX = x(orgDomain[0]) - x(domain[0]);
				} else {
					if ($$.isTimeSeries()) {
						flowStart = $$.getValueOnIndex($$.data.targets[0].values, 0);
						flowEnd = $$.getValueOnIndex($$.data.targets[0].values, $$.data.targets[0].values.length - 1);
						translateX = x(flowStart.x) - x(flowEnd.x);
					} else {
						translateX = diffDomain(domain) / 2;
					}
				}
			} else if (flow.orgDataCount === 1 || (flowStart && flowStart.x) === (flowEnd && flowEnd.x)) {
				translateX = x(orgDomain[0]) - x(domain[0]);
			} else {
				if ($$.isTimeSeries()) {
					translateX = (x(orgDomain[0]) - x(domain[0]));
				} else {
					translateX = (x(flowStart.x) - x(flowEnd.x));
				}
			}

			scaleX = (diffDomain(orgDomain) / diffDomain(domain));
			const transform = `translate(${translateX},0) scale(${scaleX},1)`;

			$$.hideGridFocus();

			const gt = d3Transition().ease(d3EaseLinear)
				.duration(durationForFlow);

			wait.add([
				$$.$el.axis.x
					.transition(gt)
					.call(g => $$.axis.x.setTransition(gt).create(g)),

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
				const isRotated = config.axis_rotated;

				// remove flowed elements
				if (flowLength) {
					const target: any = {
						shapes: [],
						texts: [],
						eventRects: []
					};

					for (let i = 0; i < flowLength; i++) {
						target.shapes.push(`.${CLASS.shape}-${i}`);
						target.texts.push(`.${CLASS.text}-${i}`);
						target.eventRects.push(`.${CLASS.eventRect}-${i}`);
					}

					["shapes", "texts", "eventRects"].forEach(v => {
						$el.svg.selectAll(`.${CLASS[v]}`)
							.selectAll(target[v])
							.remove();
					});

					$el.svg.select(`.${CLASS.xgrid}`)
						.remove();
				}

				// draw again for removing flowed elements and reverting attr
				xgrid.size() && xgrid
					.attr("transform", null)
					.attr(state.xgridAttr);

				xgridLines
					.attr("transform", null);

				xgridLines.select("line")
					.attr("x1", isRotated ? 0 : xv)
					.attr("x2", isRotated ? state.width : xv);

				xgridLines.select("text")
					.attr("x", isRotated ? state.width : 0)
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

				state.flowing = false;
			});
		};
	}
};
