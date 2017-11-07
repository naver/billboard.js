/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {isFunction, extend} from "./util";

extend(ChartInternal.prototype, {
	hasValidPointType() {
		return /^(circle|rectangle|triangle)$/i.test(this.config.point_type);
	},

	hasValidPointDrawMethods() {
		return typeof this.config.point_type === "object" &&
			isFunction(this.config.point_type.create) && isFunction(this.config.point_type.update);
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
	},

	triangle: {
		create(element, cssClassFn, sizeFn, fillStyleFn) {
			return element.enter().append("polygon")
				.attr("class", cssClassFn)
				.style("fill", fillStyleFn);
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const triangleSize = 10;

			function getPoints(d) {
				const x1 = xPosFn(d);
				const y1 = yPosFn(d) - (triangleSize * 0.5);
				const x2 = x1 - (triangleSize * 0.5);
				const y2 = y1 + triangleSize;
				const x3 = x1 + (triangleSize * 0.5);
				const y3 = y2;

				return `${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
			}

			const mainCircles = element
				.attr("points", getPoints)
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);

			return mainCircles;
		}
	}
});
