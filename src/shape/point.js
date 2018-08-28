/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	namespaces as d3Namespaces,
	select as d3Select
} from "d3-selection";
import ChartInternal from "../internals/ChartInternal";
import {isFunction, isObjectType, toArray, extend, notEmpty} from "../internals/util";

extend(ChartInternal.prototype, {
	hasValidPointType(type) {
		return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
	},

	hasValidPointDrawMethods(type) {
		const pointType = type || this.config.point_type;

		return isObjectType(pointType) &&
			isFunction(pointType.create) && isFunction(pointType.update);
	},

	insertPointInfoDefs(point, id) {
		const $$ = this;
		const parser = new DOMParser();
		const doc = parser.parseFromString(point, "image/svg+xml");
		const node = doc.firstChild;
		const clone = document.createElementNS(d3Namespaces.svg, node.nodeName.toLowerCase());
		const attribs = node.attributes;

		for (let i = 0, name; (name = attribs[i]); i++) {
			name = name.name;
			clone.setAttribute(name, node.getAttribute(name));
		}

		clone.id = id;
		clone.style.fill = "inherit";
		clone.style.stroke = "inherit";

		// when has child nodes
		if (node.children.length) {
			clone.innerHTML = toArray(node.children)
				.map(v => v.outerHTML)
				.join("");
		}

		$$.defs.node().appendChild(clone);
	},

	pointFromDefs(id) {
		return this.defs.select(`#${id}`);
	},

	generatePoint() {
		const $$ = this;
		const config = $$.config;
		const ids = [];
		const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];

		return function(method, context, ...args) {
			return function(d) {
				const id = d.id || (d.data && d.data.id) || d;
				const element = d3Select(this);
				let point;

				if (ids.indexOf(id) < 0) {
					ids.push(id);
				}
				point = pattern[ids.indexOf(id) % pattern.length];

				if ($$.hasValidPointType(point)) {
					point = $$[point];
				} else if (!$$.hasValidPointDrawMethods(point)) {
					const pointId = `${$$.datetimeId}-point-${id}`;
					const pointFromDefs = $$.pointFromDefs(pointId);

					if (pointFromDefs.size() < 1) {
						$$.insertPointInfoDefs(point, pointId);
					}

					if (method === "create") {
						return $$.custom.create.bind(context)(element, pointId, ...args);
					} else if (method === "update") {
						return $$.custom.update.bind(context)(element, ...args);
					}
				}

				return point[method].bind(context)(element, ...args);
			};
		};
	},

	getTransitionName() {
		return Math.random().toString();
	},

	custom: {
		create(element, id, cssClassFn, sizeFn, fillStyleFn) {
			return element.append("use")
				.attr("xlink:href", `#${id}`)
				.attr("class", cssClassFn)
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const $$ = this;
			const box = element.node().getBBox();

			box.width /= 2;
			box.height /= 2;

			const xPosFn2 = d => xPosFn(d) - box.width;
			const yPosFn2 = d => yPosFn(d) - box.height;
			let mainCircles = element;

			if (withTransition) {
				const transitionName = $$.getTransitionName();

				if (flow) {
					mainCircles = element
						.attr("x", xPosFn2);
				}

				mainCircles = element
					.transition(transitionName)
					.attr("x", xPosFn2)
					.attr("y", yPosFn2)
					.transition(transitionName);

				selectedCircles.transition($$.getTransitionName());
			} else {
				mainCircles = element
					.attr("x", xPosFn2)
					.attr("y", yPosFn2);
			}

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

			return element.append("rect")
				.attr("class", cssClassFn)
				.attr("width", rectSizeFn)
				.attr("height", rectSizeFn)
				.style("fill", fillStyleFn)
				.node();
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
