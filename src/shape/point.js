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

				// If no valid point is found, default to "circle"
				} else if (!$$.hasValidPointDrawMethods(point)) {
					point = $$.circle;
				}

				return point[method].bind(context)(d3Select(this), ...args);
			};
		};
	},

	getTransitionName() {
		return Math.random().toString();
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
