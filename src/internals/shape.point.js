/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {isFunction, extend} from "./util";

const POINT_TYPES = ["circle", "rectangle"];

extend(ChartInternal.prototype, {
	hasValidPointType() {
		return POINT_TYPES.includes(this.config.point_type);
	},

	hasValidPointDrawMethods() {
		return this.config.point_type === "custom" &&
			isFunction(this.config.point_create) && isFunction(this.config.point_update);
	},

	circle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			return element.enter().append("circle")
				.attr("class", cssClassFn)
				.attr("r", sizeFn)
				.style("fill", fillStyleFn);
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			let mainCircles;

			if (withTransition) {
				const transitionName = Math.random().toString();

				if (flow) {
					mainCircles = element
						.attr("cx", xPosFn)
						.transition(transitionName)
						.attr("cx", xPosFn)
						.attr("cy", yPosFn)
						.transition(transitionName)
						.style("opacity", opacityStyleFn)
						.style("fill", fillStyleFn);
				} else {
					mainCircles = element
						.transition(transitionName)
						.attr("cx", xPosFn)
						.attr("cy", yPosFn)
						.transition(transitionName)
						.style("opacity", opacityStyleFn)
						.style("fill", fillStyleFn);
				}

				selectedCircles.transition(Math.random().toString());
			} else {
				mainCircles = element
					.attr("cx", xPosFn)
					.attr("cy", yPosFn)
					.style("opacity", opacityStyleFn)
					.style("fill", fillStyleFn);
			}

			return mainCircles;
		}
	},

	rectangle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			const rectSizeFn = d => sizeFn(d) * 2.0;

			return element.enter().append("rect")
				.attr("class", cssClassFn)
				.attr("width", rectSizeFn)
				.attr("height", rectSizeFn)
				.style("fill", fillStyleFn);
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const width = +element.attr("width");
			const height = +element.attr("height");
			const halfWidth = width * 0.5;
			const halfHeight = height * 0.5;
			const rectXPosFn = d => xPosFn(d) - halfWidth;
			const rectYPosFn = d => yPosFn(d) - halfHeight;

			let mainCircles;

			if (withTransition) {
				const transitionName = Math.random().toString();

				if (flow) {
					mainCircles = element
						.attr("x", rectXPosFn)
						.transition(transitionName)
						.attr("x", rectXPosFn)
						.attr("y", rectYPosFn)
						.transition(transitionName)
						.style("opacity", opacityStyleFn)
						.style("fill", fillStyleFn);
				} else {
					mainCircles = element
						.transition(transitionName)
						.attr("x", rectXPosFn)
						.attr("y", rectYPosFn)
						.transition(transitionName)
						.style("opacity", opacityStyleFn)
						.style("fill", fillStyleFn);
				}

				selectedCircles.transition(Math.random().toString());
			} else {
				mainCircles = element
					.attr("x", rectXPosFn)
					.attr("y", rectYPosFn)
					.style("opacity", opacityStyleFn)
					.style("fill", fillStyleFn);
			}
			return mainCircles;
		}
	}
});
