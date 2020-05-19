/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";

export default {
	generateClass(prefix: string, targetId: string): string {
		return ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
	},

	classText(d): string {
		return this.generateClass(CLASS.text, d.index);
	},

	classTexts(d): string {
		return this.generateClass(CLASS.texts, d.id);
	},

	classShape(d): string {
		return this.generateClass(CLASS.shape, d.index);
	},

	classShapes(d): string {
		return this.generateClass(CLASS.shapes, d.id);
	},

	generateExtraLineClass(): Function {
		const $$ = this;
		const classes = $$.config.line_classes || [];
		const ids: string[] = [];

		return function(d) {
			const id: string = d.id || (d.data && d.data.id) || d;

			if (ids.indexOf(id) < 0) {
				ids.push(id);
			}

			return classes[ids.indexOf(id) % classes.length];
		};
	},

	classLine(d): string {
		return this.classShape(d) + this.generateClass(CLASS.line, d.id);
	},

	classLines(d): string {
		return this.classShapes(d) + this.generateClass(CLASS.lines, d.id);
	},

	classCircle(d): string {
		return this.classShape(d) + this.generateClass(CLASS.circle, d.index);
	},

	classCircles(d): string {
		return this.classShapes(d) + this.generateClass(CLASS.circles, d.id);
	},

	classBar(d): string {
		return this.classShape(d) + this.generateClass(CLASS.bar, d.index);
	},

	classBars(d): string {
		return this.classShapes(d) + this.generateClass(CLASS.bars, d.id);
	},

	classArc(d): string {
		return this.classShape(d.data) + this.generateClass(CLASS.arc, d.data.id);
	},

	classArcs(d): string {
		return this.classShapes(d.data) + this.generateClass(CLASS.arcs, d.data.id);
	},

	classArea(d): string {
		return this.classShape(d) + this.generateClass(CLASS.area, d.id);
	},

	classAreas(d): string {
		return this.classShapes(d) + this.generateClass(CLASS.areas, d.id);
	},

	classRegion(d, i: number): string {
		return `${this.generateClass(CLASS.region, i)} ${"class" in d ? d.class : ""}`;
	},

	classEvent(d) {
		return this.generateClass(CLASS.eventRect, d.index);
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

	classChartText(d): string {
		return CLASS.chartText + this.classTarget(d.id);
	},

	classChartLine(d): string {
		return CLASS.chartLine + this.classTarget(d.id);
	},

	classChartBar(d): string {
		return CLASS.chartBar + this.classTarget(d.id);
	},

	classChartArc(d): string {
		return CLASS.chartArc + this.classTarget(d.data.id);
	},

	classChartRadar(d): string {
		return CLASS.chartRadar + this.classTarget(d.id);
	},

	getTargetSelectorSuffix(targetId?: string | number): string {
		return targetId || targetId === 0 ?
			`-${targetId}`.replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : "";
	},

	selectorTarget(id: string, prefix?: string): string {
		const pfx = prefix || "";
		const target = this.getTargetSelectorSuffix(id);

		// select target & circle
		return `${pfx}.${CLASS.target + target}, ${pfx}.${CLASS.circles + target}`;
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
		return ids && ids.length ?
			ids.map(id => this.selectorLegend(id)) : null;
	},
};
