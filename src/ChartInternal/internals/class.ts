/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";

export default {
	generateClass(prefix: string, targetId: string): string {
		return ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
	},

	/**
	 * Get class string
	 * @param {string} type Shape type
	 * @param {boolean} withShape Get with shape prefix
	 * @returns {string} Class string
	 * @private
	 */
	getClass(type: string, withShape: boolean): Function {
		const isPlural = /s$/.test(type);
		const useIdKey = /^(area|arc|line|treemap)s?$/.test(type);
		const key = isPlural ? "id" : "index";

		return (d): string => {
			const data = d.data || d;
			const result = (
				withShape ? this.generateClass(CLASS[isPlural ? "shapes" : "shape"], data[key]) : ""
			) + this.generateClass(CLASS[type], data[useIdKey ? "id" : key]);

			return result.trim();
		};
	},

	/**
	 * Get chart class string
	 * @param {string} type Shape type
	 * @returns {string} Class string
	 * @private
	 */
	getChartClass(type: string) {
		return (d): string => CLASS[`chart${type}`] + this.classTarget((d.data ? d.data : d).id);
	},

	generateExtraLineClass(): Function {
		const $$ = this;
		const classes = $$.config.line_classes || [];
		const ids: string[] = [];

		return function(d) {
			const id: string = d.id || d.data?.id || d;

			if (ids.indexOf(id) < 0) {
				ids.push(id);
			}

			return classes[ids.indexOf(id) % classes.length];
		};
	},

	classRegion(d, i: number): string {
		return `${this.generateClass(CLASS.region, i)} ${"class" in d ? d.class : ""}`;
	},

	classTarget(id: string): string {
		const additionalClassSuffix = this.config.data_classes[id];
		let additionalClass = "";

		if (additionalClassSuffix) {
			additionalClass = ` ${CLASS.target}-${additionalClassSuffix}`;
		}

		return this.generateClass(CLASS.target, id) + additionalClass;
	},

	classFocus(d): string {
		return this.classFocused(d) + this.classDefocused(d);
	},

	classFocused(d): string {
		return ` ${this.state.focusedTargetIds.indexOf(d.id) >= 0 ? CLASS.focused : ""}`;
	},

	classDefocused(d): string {
		return ` ${this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? CLASS.defocused : ""}`;
	},

	getTargetSelectorSuffix(targetId?: string | number): string {
		const targetStr = targetId || targetId === 0 ? `-${targetId}` : "";

		return targetStr.replace(/([\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\])/g, "-");
	},

	selectorTarget(id: string, prefix = "", postfix = ""): string {
		const target = this.getTargetSelectorSuffix(id);

		// select target & circle
		return `${prefix}.${CLASS.target + target} ${postfix}, ${prefix}.${CLASS.circles + target} ${postfix}`;
	},

	selectorTargets(idsValue, prefix: string): string[] | null {
		const ids = idsValue || [];

		return ids.length ?
			ids.map(id => this.selectorTarget(id, prefix)) : null;
	},

	selectorLegend(id: string): string {
		return `.${CLASS.legendItem + this.getTargetSelectorSuffix(id)}`;
	},

	selectorLegends(ids): string[] | null {
		return ids?.length ?
			ids.map(id => this.selectorLegend(id)) : null;
	}
};
