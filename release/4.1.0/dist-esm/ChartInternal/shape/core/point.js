/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { document as doc } from "../../../module/browser.js";
import { isFunction, isObjectType, notEmpty } from "../../../module/util/type-checks.js";
import { sanitize } from "../../../module/sanitize.js";
import { toArray } from "../../../module/util/object.js";
import { namespaces, select } from "d3-selection";
//#region src/ChartInternal/shape/core/point.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Check if point draw methods are valid
* @param {string} point point type
* @returns {boolean}
* @private
*/
function _hasValidPointDrawMethods(point) {
	return isObjectType(point) && isFunction(point.create) && isFunction(point.update);
}
/**
* Insert point info defs element
* @param {string} point Point element
* @param {string} id Point id
* @private
*/
function _insertPointInfoDefs(point, id) {
	const $$ = this;
	const copyAttr = (from, target) => {
		const attribs = from.attributes;
		for (let i = 0, name; name = attribs[i]; i++) {
			name = name.name;
			target.setAttribute(name, from.getAttribute(name));
		}
	};
	const node = new DOMParser().parseFromString(sanitize(point), "image/svg+xml").documentElement;
	const clone = doc.createElementNS(namespaces.svg, node.nodeName.toLowerCase());
	clone.id = id;
	clone.style.fill = "inherit";
	clone.style.stroke = "inherit";
	copyAttr(node, clone);
	if (node.childNodes?.length) {
		const parent = select(clone);
		if ("innerHTML" in clone) parent.html(sanitize(node.innerHTML));
		else toArray(node.childNodes).forEach((v) => {
			copyAttr(v, parent.append(v.tagName).node());
		});
	}
	$$.$el.defs.node().appendChild(clone);
}
var point_default = {
	/**
	* Check if point type option is valid
	* @param {string} type point type
	* @returns {boolean}
	* @private
	*/
	hasValidPointType(type) {
		return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
	},
	/**
	* Check if pattern point is set to be used on legend
	* @returns {boolean}
	* @private
	*/
	hasLegendDefsPoint() {
		const { config } = this;
		return config.legend_show && config.point_pattern?.length && config.legend_usePoint;
	},
	getDefsPointId(id) {
		const { state: { datetimeId } } = this;
		return `${datetimeId}-point${id}`;
	},
	/**
	* Get validated point pattern array
	* @returns {Array} Array of point types
	* @private
	*/
	getValidPointPattern() {
		const { config } = this;
		const validPointType = /^(circle|rect(angle)?)$/i.test(config.point_type) ? config.point_type : "circle";
		return notEmpty(config.point_pattern) ? config.point_pattern : [validPointType];
	},
	/**
	* Get generate point function
	* @returns {function}
	* @private
	*/
	generatePoint() {
		const $$ = this;
		const { $el, config } = $$;
		const ids = [];
		const pattern = $$.getValidPointPattern();
		return function(method, context, ...args) {
			return function(d) {
				const id = $$.getTargetSelectorSuffix(d.id || d.data?.id || d);
				const element = select(this);
				ids.indexOf(id) < 0 && ids.push(id);
				let point = pattern[ids.indexOf(id) % pattern.length];
				if ($$.hasValidPointType(point)) point = $$[point];
				else if (!_hasValidPointDrawMethods(point || config.point_type)) {
					const pointId = $$.getDefsPointId(id);
					if ($el.defs.select(`#${pointId}`).size() < 1) _insertPointInfoDefs.call($$, point, pointId);
					if (method === "create") return $$.custom?.create.bind(context)(element, pointId, ...args);
					else if (method === "update") return $$.custom?.update.bind(context)(element, ...args);
				}
				return point[method]?.bind(context)(element, ...args);
			};
		};
	}
};
//#endregion
export { point_default as default };
