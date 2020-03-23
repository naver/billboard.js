/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	namespaces as d3Namespaces,
	select as d3Select
} from "d3-selection";
import CLASS from "../config/classes";
import ChartInternal from "../internals/ChartInternal";
import {document} from "../internals/browser";
import {getRandom, isFunction, isObject, isObjectType, toArray, extend, notEmpty} from "../internals/util";

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
		const copyAttr = (from, target) => {
			const attribs = from.attributes;

			for (let i = 0, name; (name = attribs[i]); i++) {
				name = name.name;
				target.setAttribute(name, from.getAttribute(name));
			}
		};

		const doc = new DOMParser().parseFromString(point, "image/svg+xml");
		const node = doc.documentElement;
		const clone = document.createElementNS(d3Namespaces.svg, node.nodeName.toLowerCase());

		clone.id = id;
		clone.style.fill = "inherit";
		clone.style.stroke = "inherit";

		copyAttr(node, clone);

		if (node.childNodes && node.childNodes.length) {
			const parent = d3Select(clone);

			if ("innerHTML" in clone) {
				parent.html(node.innerHTML);
			} else {
				toArray(node.childNodes).forEach(v => {
					copyAttr(v, parent.append(v.tagName).node());
				});
			}
		}

		$$.defs.node().appendChild(clone);
	},

	pointFromDefs(id) {
		return this.defs.select(`#${id}`);
	},

	updatePointClass(d) {
		const $$ = this;
		let pointClass = false;

		if (isObject(d) || $$.mainCircle) {
			pointClass = d === true ?
				$$.mainCircle.each(function(d) {
					let className = $$.classCircle.bind($$)(d);

					if (this.getAttribute("class").indexOf(CLASS.EXPANDED) > -1) {
						className += ` ${CLASS.EXPANDED}`;
					}

					this.setAttribute("class", className);
				}) : $$.classCircle(d);
		}

		return pointClass;
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

				ids.indexOf(id) < 0 && ids.push(id);

				let point = pattern[ids.indexOf(id) % pattern.length];

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
		return getRandom();
	},

	custom: {
		create(element, id, sizeFn, fillStyleFn) {
			return element.append("use")
				.attr("xlink:href", `#${id}`)
				.attr("class", this.updatePointClass.bind(this))
				.style("fill", fillStyleFn)
				.node();
		},

		update(element, xPosFn, yPosFn, opacityStyleFn, fillStyleFn,
			withTransition, flow, selectedCircles) {
			const $$ = this;
			const {width, height} = element.node().getBBox();

			const xPosFn2 = d => xPosFn(d) - width / 2;
			const yPosFn2 = d => yPosFn(d) - height / 2;
			let mainCircles = element;

			if (withTransition) {
				const transitionName = $$.getTransitionName();

				flow && mainCircles.attr("x", xPosFn2);

				mainCircles = mainCircles.transition(transitionName);
				selectedCircles.transition($$.getTransitionName());
			}

			return mainCircles
				.attr("x", xPosFn2)
				.attr("y", yPosFn2)
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	},

	// 'circle' data point
	circle: {
		create(element, sizeFn, fillStyleFn) {
			return element.append("circle")
				.attr("class", this.updatePointClass.bind(this))
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
				mainCircles.attr("r", $$.pointR.bind($$));
			}

			if (withTransition) {
				const transitionName = $$.getTransitionName();

				flow && mainCircles.attr("cx", xPosFn);

				if (mainCircles.attr("cx")) {
					mainCircles = mainCircles.transition(transitionName);
				}

				selectedCircles.transition($$.getTransitionName());
			}

			return mainCircles
				.attr("cx", xPosFn)
				.attr("cy", yPosFn)
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	},

	// 'rectangle' data point
	rectangle: {
		create(element, sizeFn, fillStyleFn) {
			const rectSizeFn = d => sizeFn(d) * 2.0;

			return element.append("rect")
				.attr("class", this.updatePointClass.bind(this))
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

				flow && mainCircles.attr("x", rectXPosFn);

				mainCircles = mainCircles.transition(transitionName);
				selectedCircles.transition($$.getTransitionName());
			}

			return mainCircles
				.attr("x", rectXPosFn)
				.attr("y", rectYPosFn)
				.style("opacity", opacityStyleFn)
				.style("fill", fillStyleFn);
		}
	}
});
