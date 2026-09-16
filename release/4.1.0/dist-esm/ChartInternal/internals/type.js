/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { TYPE, TYPE_BY_CATEGORY } from "../../config/const.js";
import { isArray, isNumber, isString } from "../../module/util/type-checks.js";
//#region src/ChartInternal/internals/type.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
const INTERPOLATION_TYPES = /* @__PURE__ */ new Set([
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
]);
var type_default = {
	/**
	* Check if the given chart type is valid
	* @param {string} type Chart type string
	* @returns {boolean}
	* @private
	*/
	isValidChartType(type) {
		return !!(type && Object.values(TYPE).indexOf(type) > -1);
	},
	/**
	* Get the chart type to use for the subchart target.
	* subchart.types > subchart.type > data.types > data.type > line
	* @param {object|string} d Target data or id
	* @returns {string}
	* @private
	*/
	getSubchartTargetType(d) {
		const $$ = this;
		const { config } = $$;
		const id = isString(d) ? d : d?.id;
		const subchartTypes = config.subchart_types || {};
		const subchartType = config.subchart_type;
		const dataTypes = config.data_types || {};
		const targetSubchartType = id && subchartTypes[id];
		if (targetSubchartType && $$.isValidChartType(targetSubchartType)) return targetSubchartType;
		else if (subchartType && $$.isValidChartType(subchartType)) return subchartType;
		return id && dataTypes[id] || config.data_type || TYPE.LINE;
	},
	/**
	* Get the regular chart type configured for the target.
	* @param {object|string} d Target data or id
	* @returns {string}
	* @private
	*/
	getTargetType(d) {
		const { config } = this;
		const id = isString(d) ? d : d?.id;
		return id && config.data_types?.[id] || config.data_type || TYPE.LINE;
	},
	/**
	* Get the target's original chart type while subchart.type context is active.
	* @param {object|string} d Target data or id
	* @returns {string}
	* @private
	*/
	getSubchartSourceTargetType(d) {
		const { state } = this;
		const id = isString(d) ? d : d?.id;
		return id && state.subchartSourceTypes?.[id] || this.getTargetType(d);
	},
	/**
	* Check whether a target had the given source type before subchart.type remapping.
	* @param {object|string} d Target data or id
	* @param {string|Array} type chart type
	* @returns {boolean}
	* @private
	*/
	isSubchartSourceTypeOf(d, type) {
		const sourceType = this.getSubchartSourceTargetType(d);
		return isArray(type) ? type.indexOf(sourceType) >= 0 : sourceType === type;
	},
	/**
	* Run a callback while regular type helpers resolve using subchart.type/types.
	* @param {function(): unknown} callback Callback to run
	* @returns {unknown} Callback return value
	* @private
	*/
	withSubchartTypeContext(callback) {
		const $$ = this;
		const { config, data, state } = $$;
		const dataType = config.data_type;
		const dataTypes = config.data_types;
		const currentTypes = state.current.types;
		const sourceTypes = state.subchartSourceTypes;
		const subchartTypes = {};
		const subchartSourceTypes = {};
		const subchartType = config.subchart_type;
		$$.mapToIds(data.targets).forEach((id) => {
			subchartSourceTypes[id] = $$.getTargetType(id);
			subchartTypes[id] = $$.getSubchartTargetType(id);
		});
		config.data_type = subchartType && $$.isValidChartType(subchartType) ? subchartType : dataType;
		config.data_types = subchartTypes;
		state.current.types = [];
		state.subchartSourceTypes = subchartSourceTypes;
		try {
			return callback();
		} finally {
			config.data_type = dataType;
			config.data_types = dataTypes;
			state.current.types = currentTypes;
			state.subchartSourceTypes = sourceTypes;
		}
	},
	setTargetType(targetIds, type) {
		const $$ = this;
		const { config, state: { withoutFadeIn } } = $$;
		$$.mapToTargetIds(targetIds).forEach((id) => {
			withoutFadeIn[id] = type === config.data_types[id];
			config.data_types[id] = type;
		});
		if (!targetIds) config.data_type = type;
	},
	/**
	* Updte current used chart types
	* @private
	*/
	updateTypesElements() {
		const $$ = this;
		const { state: { current } } = $$;
		Object.keys(TYPE).forEach((v) => {
			const t = TYPE[v];
			const has = $$.hasType(t, null, true);
			const idx = current.types.indexOf(t);
			if (idx === -1 && has) current.types.push(t);
			else if (idx > -1 && !has) current.types.splice(idx, 1);
		});
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
	hasType(type, targetsValue, checkFromData = false) {
		const $$ = this;
		const { config, state: { current } } = $$;
		const types = config.data_types;
		const targets = targetsValue || $$.data.targets;
		if (!checkFromData && current.types?.indexOf(type) > -1) return true;
		else if (targets?.length) return targets.some((target) => {
			const t = types[target.id];
			return t === type || !t && type === "line";
		});
		else if (Object.keys(types).length) return Object.values(types).some((t) => t === type);
		return config.data_type === type;
	},
	/**
	* Check if contains given chart types
	* @param {string} type Type key
	* @param {object} targets Target data
	* @param {Array} exclude Excluded types
	* @returns {boolean}
	* @private
	*/
	hasTypeOf(type, targets, exclude = []) {
		if (type in TYPE_BY_CATEGORY) return !TYPE_BY_CATEGORY[type].filter((v) => exclude.indexOf(v) === -1).every((v) => !this.hasType(v, targets));
		return false;
	},
	/**
	* Check if given data is certain chart type
	* @param {object} d Data object
	* @param {string|Array} type chart type
	* @returns {boolean}
	* @private
	*/
	isTypeOf(d, type) {
		const id = isString(d) ? d : d.id;
		const dataType = this.config && this.getTargetType(id);
		return isArray(type) ? type.indexOf(dataType) >= 0 : dataType === type;
	},
	hasPointType() {
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
	hasArcType(targets, exclude) {
		return this.hasTypeOf("Arc", targets, exclude);
	},
	hasMultiArcGauge() {
		return this.hasType("gauge") && this.config.gauge_type === "multi";
	},
	isLineType(d) {
		const id = isString(d) ? d : d.id;
		return !this.config.data_types[id] || this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
	},
	isStepType(d) {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
	},
	isSplineType(d) {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
	},
	isAreaType(d) {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
	},
	isAreaRangeType(d) {
		return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
	},
	isBarType(d) {
		return this.isTypeOf(d, "bar");
	},
	isBubbleType(d) {
		return this.isTypeOf(d, "bubble");
	},
	isCandlestickType(d) {
		return this.isTypeOf(d, "candlestick");
	},
	isScatterType(d) {
		return this.isTypeOf(d, "scatter");
	},
	isTreemapType(d) {
		return this.isTypeOf(d, "treemap");
	},
	isPieType(d) {
		return this.isTypeOf(d, "pie");
	},
	isFunnelType(d) {
		return this.isTypeOf(d, "funnel");
	},
	isGaugeType(d) {
		return this.isTypeOf(d, "gauge");
	},
	isDonutType(d) {
		return this.isTypeOf(d, "donut");
	},
	isPolarType(d) {
		return this.isTypeOf(d, "polar");
	},
	isRadarType(d) {
		return this.isTypeOf(d, "radar");
	},
	isArcType(d) {
		return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d) || this.isPolarType(d) || this.isRadarType(d);
	},
	isCirclePoint(node) {
		const { config } = this;
		const pattern = config.point_pattern;
		return node?.tagName === "circle" || config.point_type === "circle" && (!pattern || isArray(pattern) && pattern.length === 0);
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
		return this.isBarType(d) || this.isLineType(d) || this.isScatterType(d) || this.isBubbleType(d) || this.isCandlestickType(d) || this.isFunnelType(d) || this.isRadarType(d) || this.isTreemapType(d) ? d.values.filter((v) => isNumber(v.value) || Boolean(v.value)) : [];
	},
	barLineBubbleData(d) {
		return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
	},
	isInterpolationType(type) {
		return INTERPOLATION_TYPES.has(type);
	}
};
//#endregion
export { type_default as default };
