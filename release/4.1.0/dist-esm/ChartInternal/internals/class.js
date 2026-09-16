/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import classes_default from "../../config/classes.js";
//#region src/ChartInternal/internals/class.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
const RE_SELECTOR_SUFFIX = /[\x00-\x20\x7F-\xA0\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g;
var class_default = {
	generateClass(prefix, targetId) {
		const cache = this.state.generateClassCache;
		const key = `${prefix}\0${targetId}`;
		let cls = cache.get(key);
		if (!cls) {
			cls = ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
			cache.set(key, cls);
		}
		return cls;
	},
	/**
	* Get class string
	* @param {string} type Shape type
	* @param {boolean} withShape Get with shape prefix
	* @returns {string} Class string
	* @private
	*/
	getClass(type, withShape) {
		const isPlural = /s$/.test(type);
		const useIdKey = /^(area|arc|line|funnel|treemap)s?$/.test(type);
		const key = isPlural ? "id" : "index";
		return (d) => {
			const data = d.data || d;
			return ((withShape ? this.generateClass(classes_default[isPlural ? "shapes" : "shape"], data[key]) : "") + this.generateClass(classes_default[type], data[useIdKey ? "id" : key])).trim();
		};
	},
	/**
	* Get chart class string
	* @param {string} type Shape type
	* @returns {string} Class string
	* @private
	*/
	getChartClass(type) {
		return (d) => classes_default[`chart${type}`] + this.classTarget((d.data ? d.data : d).id);
	},
	generateExtraLineClass() {
		const classes = this.config.line_classes || [];
		const ids = [];
		return function(d) {
			const id = d.id || d.data?.id || d;
			if (ids.indexOf(id) < 0) ids.push(id);
			return classes[ids.indexOf(id) % classes.length];
		};
	},
	classRegion(d, i) {
		return `${this.generateClass(classes_default.region, i)} ${"class" in d ? d.class : ""}`;
	},
	classTarget(id) {
		const additionalClassSuffix = this.config.data_classes[id];
		let additionalClass = "";
		if (additionalClassSuffix) additionalClass = ` ${classes_default.target}-${additionalClassSuffix}`;
		return this.generateClass(classes_default.target, id) + additionalClass;
	},
	classFocus(d) {
		return this.classFocused(d) + this.classDefocused(d);
	},
	classFocused(d) {
		return ` ${this.state.focusedTargetIds.has(d.id) ? classes_default.focused : ""}`;
	},
	classDefocused(d) {
		return ` ${this.state.defocusedTargetIds.has(d.id) ? classes_default.defocused : ""}`;
	},
	getTargetSelectorSuffix(targetId) {
		return (targetId || targetId === 0 ? `-${targetId}` : "").replace(RE_SELECTOR_SUFFIX, "-");
	},
	selectorTarget(id, prefix = "", postfix = "") {
		const target = this.getTargetSelectorSuffix(id);
		return `${prefix}.${classes_default.target + target} ${postfix}, ${prefix}.${classes_default.circles + target} ${postfix}`;
	},
	selectorTargets(idsValue, prefix) {
		const ids = idsValue || [];
		return ids.length ? ids.map((id) => this.selectorTarget(id, prefix)) : null;
	},
	selectorLegend(id) {
		return `.${classes_default.legendItem + this.getTargetSelectorSuffix(id)}`;
	},
	selectorLegends(ids) {
		return ids?.length ? ids.map((id) => this.selectorLegend(id)) : null;
	}
};
//#endregion
export { class_default as default };
