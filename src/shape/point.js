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
			return element.enter().append("circle")
				.attr("class", cssClassFn)
				.attr("r", sizeFn)
				.style("fill", fillStyleFn);
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const $$ = this;
			let mainCircles = element;

			// when '.load()' called, bubble size should be updated
			if ($$.hasType("bubble")) {
				mainCircles = mainCircles
					.attr("r", $$.pointR.bind($$));
			}

			if (withTransition) {
				const transitionName = $$.getTransitionName();

				if (flow) {
					mainCircles = mainCircles
						.attr("cx", xPosFn);
				}

				mainCircles = mainCircles
					.transition(transitionName)
					.attr("cx", xPosFn)
					.attr("cy", yPosFn)
					.transition(transitionName);

				selectedCircles.transition($$.getTransitionName());
			} else {
				mainCircles = mainCircles
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
			const $$ = this;
			const r = $$.config.point_r;
			const rectXPosFn = d => xPosFn(d) - r;
			const rectYPosFn = d => yPosFn(d) - r;

			let mainCircles = element;

			if (withTransition) {
				const transitionName = $$.getTransitionName();

				if (flow) {
					mainCircles = mainCircles
						.attr("x", rectXPosFn);
				}

				mainCircles = mainCircles
					.transition(transitionName)
					.attr("x", rectXPosFn)
					.attr("y", rectYPosFn)
					.transition(transitionName);

				selectedCircles.transition($$.getTransitionName());
			} else {
				mainCircles = mainCircles
					.attr("x", rectXPosFn)
					.attr("y", rectYPosFn);
			}

			return mainCircles
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	}
});
