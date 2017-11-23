/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../internals/ChartInternal";
import {isFunction, isObjectType, extend} from "../internals/util";

extend(ChartInternal.prototype, {
	hasValidPointType(type) {
		return /^(circle|rect(angle)?|polygon|ellipse)$/i.test(type || this.config.point_type);
	},

	hasValidPointDrawMethods() {
		const pointType = this.config.point_type;

		return isObjectType(pointType) &&
			isFunction(pointType.create) && isFunction(pointType.update);
	},

	getTransitionName() {
		return Math.random().toString();
	},

	// 'circle' data point
	circle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			return (element.empty() ? element.enter().append("circle") : element)
				.attr("class", cssClassFn)
				.attr("r", sizeFn)
				.style("fill", fillStyleFn);
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

			return element.enter().append("rect")
				.attr("class", cssClassFn)
				.attr("width", rectSizeFn)
				.attr("height", rectSizeFn)
				.style("fill", fillStyleFn);
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
