/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	select as d3Select
} from "d3";

import ChartInternal from "../internals/ChartInternal";
import {isFunction, isObjectType, extend, notEmpty} from "../internals/util";

extend(ChartInternal.prototype, {
	hasValidPointType(type) {
		return /^(circle|rect(angle)?|polygon|ellipse)$/i.test(type || this.config.point_type);
	},

	hasValidPointDrawMethods(type) {
		const pointType = type || this.config.point_type;

		return isObjectType(pointType) &&
			isFunction(pointType.create) && isFunction(pointType.update);
	},

	insertPointInfoDefs(point, id) {
		const $$ = this;
		const defs = $$.svg.select("defs");

		if (defs.size < 1) {
			return;
		}

		const html = defs.html();

		// Add the point node into <defs>
		defs.html(`${html}${point}`);

		const node = defs.node().lastChild;

		node.setAttribute("id", id);
	},

	pointFromDefs(id) {
		const $$ = this;
		const defs = $$.svg.select("defs");

		return defs.select(`#${id}`);
	},

	generatePoint() {
		const $$ = this;
		const config = $$.config;
		const ids = [];
		const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];

		return function(method, context, ...args) {
			return function(d) {
				const id = d.id || (d.data && d.data.id) || d;
				let point;

				if (ids.indexOf(id) < 0) {
					ids.push(id);
				}
				point = pattern[ids.indexOf(id) % pattern.length];

				if ($$.hasValidPointType(point)) {
					point = $$[point];
				} else if (!$$.hasValidPointDrawMethods(point)) {
					const pointId = `bb-point-${id}`;
					const pointFromDefs = $$.pointFromDefs(pointId);

					if (pointFromDefs.size() < 1) {
						$$.insertPointInfoDefs(point, pointId);
					}

					if (method === "create") {
						return $$.custom.create.bind(context)(d3Select(this), pointId);
					} else if (method === "update") {
						return $$.custom.update.bind(context)(d3Select(this), ...args);
					}
				}

				return point[method].bind(context)(d3Select(this), ...args);
			};
		};
	},

	getTransitionName() {
		return Math.random().toString();
	},

	custom: {
		create(element, id) {
			return element.append("use")
				.attr("xlink:href", `#${id}`)
				.node();
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const size = this.pointR(element) * 3;
			const halfSize = size * 0.5;

			function getPoints(d) {
				const x1 = xPosFn(d);
				const y1 = yPosFn(d) - halfSize;
				const x2 = x1 - halfSize;
				const y2 = y1 + size;
				const x3 = x1 + halfSize;
				const y3 = y2;

				return [x1, y1, x2, y2, x3, y3].join(" ");
			}

			// The attribute should be set on the element's
			// first child and not "element" itself.
			const mainCircles = element
				.attr("points", getPoints);

			return mainCircles
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	},

	// 'circle' data point
	circle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			return element.append("circle")
				.attr("class", cssClassFn)
				.attr("r", sizeFn)
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			let mainCircles;

			if (withTransition) {
				const transitionName = this.getTransitionName();

				if (flow) {
					mainCircles = element
						.attr("cx", xPosFn)
						.transition(transitionName)
						.attr("cx", xPosFn)
						.attr("cy", yPosFn)
						.transition(transitionName);
				} else {
					mainCircles = element
						.transition(transitionName)
						.attr("cx", xPosFn)
						.attr("cy", yPosFn)
						.transition(transitionName);
				}

				selectedCircles.transition(this.getTransitionName());
			} else {
				mainCircles = element
					.attr("cx", xPosFn)
					.attr("cy", yPosFn);
			}

			return mainCircles
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	},

	// 'rectangle' data point
	rectangle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			const rectSizeFn = d => sizeFn(d) * 2.0;

			return element.append("rect")
				.attr("class", cssClassFn)
				.attr("width", rectSizeFn)
				.attr("height", rectSizeFn)
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const r = this.config.point_r;
			const rectXPosFn = d => xPosFn(d) - r;
			const rectYPosFn = d => yPosFn(d) - r;

			let mainCircles;

			if (withTransition) {
				const transitionName = this.getTransitionName();

				if (flow) {
					mainCircles = element
						.attr("x", rectXPosFn)
						.transition(transitionName)
						.attr("x", rectXPosFn)
						.attr("y", rectYPosFn)
						.transition(transitionName);
				} else {
					mainCircles = element
						.transition(transitionName)
						.attr("x", rectXPosFn)
						.attr("y", rectYPosFn)
						.transition(transitionName);
				}

				selectedCircles.transition(this.getTransitionName());
			} else {
				mainCircles = element
					.attr("x", rectXPosFn)
					.attr("y", rectYPosFn);
			}

			return mainCircles
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	}
});
