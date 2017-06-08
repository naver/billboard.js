/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {isString, extend} from "./util";

extend(ChartInternal.prototype, {
	setTargetType(targetIds, type) {
		const $$ = this;
		const config = $$.config;

		$$.mapToTargetIds(targetIds).forEach(id => {
			$$.withoutFadeIn[id] = (type === config.data_types[id]);
			config.data_types[id] = type;
		});

		if (!targetIds) {
			config.data_type = type;
		}
	},

	hasType(type, targetsValue) {
		const $$ = this;
		const types = $$.config.data_types;
		const targets = targetsValue || $$.data.targets;
		let has = false;

		if (targets && targets.length) {
			targets.forEach(target => {
				const t = types[target.id];

				if ((t && t.indexOf(type) >= 0) || (!t && type === "line")) {
					has = true;
				}
			});
		} else if (Object.keys(types).length) {
			Object.keys(types).forEach(id => {
				if (types[id] === type) {
					has = true;
				}
			});
		} else {
			has = $$.config.data_type === type;
		}

		return has;
	},

	hasArcType(targets) {
		return this.hasType("pie", targets) ||
			this.hasType("donut", targets) ||
			this.hasType("gauge", targets);
	},

	isLineType(d) {
		const config = this.config;
		const id = isString(d) ? d : d.id;

		return !config.data_types[id] ||
			["line", "spline", "area", "area-spline", "step", "area-step"]
				.indexOf(config.data_types[id]) >= 0;
	},

	isStepType(d) {
		const id = isString(d) ? d : d.id;

		return ["step", "area-step"]
			.indexOf(this.config.data_types[id]) >= 0;
	},

	isSplineType(d) {
		const id = isString(d) ? d : d.id;

		return ["spline", "area-spline"]
			.indexOf(this.config.data_types[id]) >= 0;
	},

	isAreaType(d) {
		const id = isString(d) ? d : d.id;

		return ["area", "area-spline", "area-step"]
			.indexOf(this.config.data_types[id]) >= 0;
	},

	isBarType(d) {
		const id = isString(d) ? d : d.id;

		return this.config.data_types[id] === "bar";
	},

	isScatterType(d) {
		const id = isString(d) ? d : d.id;

		return this.config.data_types[id] === "scatter";
	},

	isPieType(d) {
		const id = isString(d) ? d : d.id;

		return this.config.data_types[id] === "pie";
	},

	isGaugeType(d) {
		const id = isString(d) ? d : d.id;

		return this.config.data_types[id] === "gauge";
	},

	isDonutType(d) {
		const id = isString(d) ? d : d.id;

		return this.config.data_types[id] === "donut";
	},

	isArcType(d) {
		return this.isPieType(d) ||
			this.isDonutType(d) ||
			this.isGaugeType(d);
	},

	lineData(d) {
		return this.isLineType(d) ? [d] : [];
	},

	arcData(d) {
		return this.isArcType(d.data) ? [d] : [];
	},

	barData(d) {
		return this.isBarType(d) ? d.values : [];
	},

	lineOrScatterData(d) {
		return this.isLineType(d) ||
			this.isScatterType(d) ? d.values : [];
	},

	barOrLineData(d) {
		return this.isBarType(d) ||
			this.isLineType(d) ? d.values : [];
	},

	// https://github.com/d3/d3-shape#curves
	isInterpolationType(type) {
		return [
			"basis",
			"basis-closed",
			"basis-open",
			"bundle",
			"cardinal",
			"cardinal-closed",
			"cardinal-open",
			"catmull-rom",
			"catmull-rom-closed",
			"catmull-rom-open",
			"linear",
			"linear-closed",
			"monotone-x",
			"monotone-y",
			"natural"
		].indexOf(type) >= 0;
	}
});
