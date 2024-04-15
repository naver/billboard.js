/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {namespaces as d3Namespaces, select as d3Select} from "d3-selection";
import {document} from "../../module/browser";
import {isFunction, isObjectType, notEmpty, toArray} from "../../module/util";

/**
 * Check if point draw methods are valid
 * @param {string} point point type
 * @returns {boolean}
 * @private
 */
function hasValidPointDrawMethods(point: string): boolean {
	return isObjectType(point) &&
		isFunction(point.create) && isFunction(point.update);
}

/**
 * Insert point info defs element
 * @param {string} point Point element
 * @param {string} id Point id
 * @private
 */
function insertPointInfoDefs(point: string, id: string): void {
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

	if (node.childNodes?.length) {
		const parent = d3Select(clone);

		if ("innerHTML" in clone) {
			parent.html(node.innerHTML);
		} else {
			toArray(node.childNodes).forEach(v => {
				copyAttr(v, parent.append(v.tagName).node());
			});
		}
	}

	$$.$el.defs.node().appendChild(clone);
}

export default {
	/**
	 * Check if point type option is valid
	 * @param {string} type point type
	 * @returns {boolean}
	 * @private
	 */
	hasValidPointType(type?: string): boolean {
		return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
	},

	/**
	 * Check if pattern point is set to be used on legend
	 * @returns {boolean}
	 * @private
	 */
	hasLegendDefsPoint(): boolean {
		const {config} = this;

		return config.legend_show && config.point_pattern?.length && config.legend_usePoint;
	},

	getDefsPointId(id: string): string {
		const {state: {datetimeId}} = this;

		return `${datetimeId}-point${id}`;
	},

	/**
	 * Get generate point function
	 * @returns {Function}
	 * @private
	 */
	generatePoint(): Function {
		const $$ = this;
		const {$el, config} = $$;
		const ids: string[] = [];
		const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];

		return function(method, context, ...args) {
			return function(d) {
				const id: string = $$.getTargetSelectorSuffix(d.id || d.data?.id || d);
				const element = d3Select(this);

				ids.indexOf(id) < 0 && ids.push(id);

				let point = pattern[ids.indexOf(id) % pattern.length];

				if ($$.hasValidPointType(point)) {
					point = $$[point];
				} else if (!hasValidPointDrawMethods(point || config.point_type)) {
					const pointId = $$.getDefsPointId(id);
					const defsPoint = $el.defs.select(`#${pointId}`);

					if (defsPoint.size() < 1) {
						insertPointInfoDefs.bind($$)(point, pointId);
					}

					if (method === "create") {
						return $$.custom?.create.bind(context)(element, pointId, ...args);
					} else if (method === "update") {
						return $$.custom?.update.bind(context)(element, ...args);
					}
				}

				return point[method]?.bind(context)(element, ...args);
			};
		};
	}
};
