/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {easeLinear as d3EaseLinear} from "d3-ease";
import {generateWait} from "../../module/generator";
import {diffDomain} from "../../module/util";
import CLASS from "../../config/classes";

export default {
	/**
	 * Generate flow
	 * @param {object} args option object
	 * @returns {Function}
	 * @private
	 */
	generateFlow(args): Function {
		const $$ = this;
		const {data, state, $el} = $$;

		return function() {
			const flowLength = args.flow.length;

			// set flag
			state.flowing = true;

			// remove head data after rendered
			data.targets.forEach(d => {
				d.values.splice(0, flowLength);
			});

			// update elements related to x scale
			if ($$.updateXGrid) {
				$$.updateXGrid(true);
			}

			// target elements
			const elements = {};

			["axis.x", "grid.x", "gridLines.x", "region.list", "text", "bar", "line", "area", "circle"]
				.forEach(v => {
					const name = v.split(".");
					let node = $el[name[0]];

					if (node && name.length > 1) {
						node = node[name[1]];
					}

					if (node?.size()) {
						elements[v] = node;
					}
				});

			$$.hideGridFocus();
			$$.setFlowList(elements, args);
		};
	},

	/**
	 * Set flow list
	 * @param {object} elements Target elements
	 * @param {object} args option object
	 * @private
	 */
	setFlowList(elements, args): void {
		const $$ = this;
		const {flow, targets} = args;
		const {
			duration = args.duration,
			index: flowIndex,
			length: flowLength,
			orgDataCount,
		} = flow;

		const transform = $$.getFlowTransform(targets, orgDataCount, flowIndex, flowLength);
		const wait = generateWait();
		let n;

		wait.add(Object.keys(elements).map(v => {
			n = elements[v]
				.transition()
				.ease(d3EaseLinear)
				.duration(duration);

			if (v === "axis.x") {
				n = n.call(g => {
					$$.axis.x.setTransition(g).create(g);
				});
			} else if (v === "region.list") {
				n = n.filter($$.isRegionOnX)
					.attr("transform", transform);
			} else {
				n = n.attr("transform", transform);
			}

			return n;
		}));

		n.call(wait, () => {
			$$.cleanUpFlow(elements, args);
		});
	},

	/**
	 * Clean up flow
	 * @param {object} elements Target elements
	 * @param {object} args option object
	 * @private
	 */
	cleanUpFlow(elements, args): void {
		const $$ = this;
		const {config, state, $el: {svg}} = $$;
		const isRotated = config.axis_rotated;

		const {flow, shape, xv} = args;
		const {cx, cy, xForText, yForText} = shape.pos;
		const {
			done = () => {},
			length: flowLength
		} = flow;

		// Remove flowed elements
		if (flowLength) {
			["circle", "text", "shape", "eventRect"].forEach(v => {
				const target: string[] = [];

				for (let i = 0; i < flowLength; i++) {
					target.push(`.${CLASS[v]}-${i}`);
				}

				svg.selectAll(`.${CLASS[`${v}s`]}`) // circles, shapes, texts, eventRects
					.selectAll(target)
					.remove();
			});

			svg.select(`.${CLASS.xgrid}`)
				.remove();
		}

		// draw again for removing flowed elements and reverting attr
		Object.keys(elements).forEach(v => {
			const n = elements[v];

			if (v !== "axis.x") {
				n.attr("transform", null);
			}

			if (v === "grid.x") {
				n.attr(state.xgridAttr);
			} else if (v === "gridLines.x") {
				n.attr("x1", isRotated ? 0 : xv)
					.attr("x2", isRotated ? state.width : xv);
			} else if (v === "gridLines.x") {
				n.select("line").attr("x1", isRotated ? 0 : xv)
					.attr("x2", isRotated ? state.width : xv);

				n.select("text")
					.attr("x", isRotated ? state.width : 0)
					.attr("y", xv);
			} else if (/^(area|bar|line)$/.test(v)) {
				n.attr("d", shape.type[v]);
			} else if (v === "text") {
				n.attr("x", xForText)
					.attr("y", yForText)
					.style("fill-opacity", $$.opacityForText.bind($$));
			} else if (v === "circle") {
				if ($$.isCirclePoint()) {
					n.attr("cx", cx).attr("cy", cy);
				} else {
					const xFunc = d => cx(d) - config.point_r;
					const yFunc = d => cy(d) - config.point_r;

					n.attr("x", xFunc)
						.attr("y", yFunc)
						.attr("cx", cx) // when pattern is used, it possibly contain 'circle' also.
						.attr("cy", cy);
				}
			} else if (v === "region.list") {
				n.select("rect").filter($$.isRegionOnX)
					.attr("x", $$.regionX.bind($$))
					.attr("width", $$.regionWidth.bind($$));
			}
		});

		config.interaction_enabled && $$.redrawEventRect();

		// callback for end of flow
		done.call($$.api);

		state.flowing = false;
	},

	/**
	 * Get flow transform value
	 * @param {object} targets target
	 * @param {number} orgDataCount original data count
	 * @param {number} flowIndex flow index
	 * @param {number} flowLength flow length
	 * @returns {string}
	 * @private
	 */
	getFlowTransform(targets, orgDataCount, flowIndex, flowLength): string {
		const $$ = this;
		const {data, scale: {x}} = $$;
		const dataValues = data.targets[0].values;

		let flowStart = $$.getValueOnIndex(dataValues, flowIndex);
		let flowEnd = $$.getValueOnIndex(dataValues, flowIndex + flowLength);
		let translateX;

		// update x domain to generate axis elements for flow
		const orgDomain = x.domain();
		const domain = $$.updateXDomain(targets, true, true);

		// generate transform to flow
		if (!orgDataCount) { // if empty
			if (dataValues.length !== 1) {
				translateX = x(orgDomain[0]) - x(domain[0]);
			} else {
				if ($$.axis.isTimeSeries()) {
					flowStart = $$.getValueOnIndex(dataValues, 0);
					flowEnd = $$.getValueOnIndex(dataValues, dataValues.length - 1);
					translateX = x(flowStart.x) - x(flowEnd.x);
				} else {
					translateX = diffDomain(domain) / 2;
				}
			}
		} else if (orgDataCount === 1 || flowStart?.x === flowEnd?.x) {
			translateX = x(orgDomain[0]) - x(domain[0]);
		} else {
			translateX = $$.axis.isTimeSeries() ?
				x(orgDomain[0]) - x(domain[0]) :
				x(flowStart?.x || 0) - x(flowEnd.x);
		}

		const scaleX = (diffDomain(orgDomain) / diffDomain(domain));

		return `translate(${translateX},0) scale(${scaleX},1)`;
	}
};
