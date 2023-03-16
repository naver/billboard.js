/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isArray, isNumber, isString} from "../../module/util";
import {TYPE, TYPE_BY_CATEGORY} from "../../config/const";

export default {
	/**
	 * Check if the given chart type is valid
	 * @param {string} type Chart type string
	 * @returns {boolean}
	 * @private
	 */
	isValidChartType(type: string): boolean {
		return !!(type && Object.values(TYPE).indexOf(type) > -1);
	},

	setTargetType(targetIds: string[], type: string): void {
		const $$ = this;
		const {config, state: {withoutFadeIn}} = $$;

		$$.mapToTargetIds(targetIds).forEach(id => {
			withoutFadeIn[id] = (type === config.data_types[id]);
			config.data_types[id] = type;
		});

		if (!targetIds) {
			config.data_type = type;
		}
	},

	/**
	 * Updte current used chart types
	 * @private
	 */
	updateTypesElements(): void {
		const $$ = this;
		const {state: {current}} = $$;

		Object.keys(TYPE).forEach(v => {
			const t = TYPE[v];
			const has = $$.hasType(t, null, true);
			const idx = current.types.indexOf(t);

			if (idx === -1 && has) {
				current.types.push(t);
			} else if (idx > -1 && !has) {
				current.types.splice(idx, 1);
			}
		});

		// Update current chart elements reference
		$$.setChartElements();
	},

	/**
	 * Check if given chart types exists
	 * @param {string} type Chart type
	 * @param {Array} targetsValue Data array
	 * @param {boolean} checkFromData Force to check type cotains from data targets
	 * @returns {boolean}
	 * @private
	 */
	hasType(type: string, targetsValue?, checkFromData = false): boolean {
		const $$ = this;
		const {config, state: {current}} = $$;
		const types = config.data_types;
		const targets = targetsValue || $$.data.targets;
		let has = false;

		if (!checkFromData && current.types?.indexOf(type) > -1) {
			has = true;
		} else if (targets?.length) {
			targets.forEach(target => {
				const t = types[target.id];

				if (t === type || (!t && type === "line")) {
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
			has = config.data_type === type;
		}

		return has;
	},

	/**
	 * Check if contains given chart types
	 * @param {string} type Type key
	 * @param {object} targets Target data
	 * @param {Array} exclude Excluded types
	 * @returns {boolean}
	 * @private
	 */
	hasTypeOf(type, targets, exclude: string[] = []): boolean {
		if (type in TYPE_BY_CATEGORY) {
			return !TYPE_BY_CATEGORY[type]
				.filter((v: string) => exclude.indexOf(v) === -1)
				.every((v: string) => !this.hasType(v, targets));
		}

		return false;
	},

	/**
	 * Check if given data is certain chart type
	 * @param {object} d Data object
	 * @param {string|Array} type chart type
	 * @returns {boolean}
	 * @private
	 */
	isTypeOf(d, type): boolean {
		const id = isString(d) ? d : d.id;
		const dataType = this.config.data_types[id] || this.config.data_type;

		return isArray(type) ?
			type.indexOf(dataType) >= 0 : dataType === type;
	},

	hasPointType(): boolean {
		const $$ = this;

		return $$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter");
	},

	/**
	 * Check if contains arc types chart
	 * @param {object} targets Target data
	 * @param {Array} exclude Excluded types
	 * @returns {boolean}
	 * @private
	 */
	hasArcType(targets, exclude): boolean {
		return this.hasTypeOf("Arc", targets, exclude);
	},

	hasMultiArcGauge(): boolean {
		return this.hasType("gauge") && this.config.gauge_type === "multi";
	},

	isLineType(d): boolean {
		const id = isString(d) ? d : d.id;

		return !this.config.data_types[id] ||
			this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
	},

	isStepType(d): boolean {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
	},

	isSplineType(d): boolean {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
	},

	isAreaType(d): boolean {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
	},

	isAreaRangeType(d): boolean {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
	},

	isBarType(d): boolean {
		return this.isTypeOf(d, "bar");
	},

	isBubbleType(d): boolean {
		return this.isTypeOf(d, "bubble");
	},

	isCandlestickType(d): boolean {
		return this.isTypeOf(d, "candlestick");
	},

	isScatterType(d): boolean {
		return this.isTypeOf(d, "scatter");
	},

	isTreemapType(d): boolean {
		return this.isTypeOf(d, "treemap");
	},

	isPieType(d): boolean {
		return this.isTypeOf(d, "pie");
	},

	isGaugeType(d): boolean {
		return this.isTypeOf(d, "gauge");
	},

	isDonutType(d): boolean {
		return this.isTypeOf(d, "donut");
	},

	isPolarType(d): boolean {
		return this.isTypeOf(d, "polar");
	},

	isRadarType(d): boolean {
		return this.isTypeOf(d, "radar");
	},

	isArcType(d): boolean {
		return this.isPieType(d) ||
			this.isDonutType(d) ||
			this.isGaugeType(d) ||
			this.isPolarType(d) ||
			this.isRadarType(d);
	},

	// determine if is 'circle' data point
	isCirclePoint(node?): boolean {
		const {config} = this;
		const pattern = config.point_pattern;
		let isCircle = false;

		if (node?.tagName === "circle") {
			isCircle = true;
		} else {
			isCircle = config.point_type === "circle" &&
				(!pattern || (
					isArray(pattern) && pattern.length === 0
				));
		}

		return isCircle;
	},

	lineData(d) {
		return this.isLineType(d) ? [d] : [];
	},

	arcData(d) {
		return this.isArcType(d.data) ? [d] : [];
	},

	/**
	 * Get data adapt for data label showing
	 * @param {object} d Data object
	 * @returns {Array}
	 * @private
	 */
	labelishData(d) {
		return this.isBarType(d) ||
			this.isLineType(d) ||
			this.isScatterType(d) ||
			this.isBubbleType(d) ||
			this.isCandlestickType(d) ||
			this.isRadarType(d) ||
			this.isTreemapType(d) ? d.values.filter(v => isNumber(v.value) || Boolean(v.value)) : [];
	},

	barLineBubbleData(d) {
		return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ?
			d.values : [];
	},

	// https://github.com/d3/d3-shape#curves
	isInterpolationType(type: string): boolean {
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
};
