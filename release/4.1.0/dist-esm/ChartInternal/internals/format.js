/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isArray, isFunction, isObject, isObjectType, isValue } from "../../module/util/type-checks.js";
//#region src/ChartInternal/internals/format.ts
/**
* Get formatted
* @param {object} $$ Context
* @param {string} typeValue Axis type
* @param {number} v Value to be formatted
* @returns {number | string}
* @private
*/
function _getFormat($$, typeValue, v) {
	const { config } = $$;
	const type = `axis_${typeValue}_tick_format`;
	return (config[type] ? config[type] : $$.defaultValueFormat).call($$.api, v);
}
var format_default = {
	yFormat(v) {
		return _getFormat(this, "y", v);
	},
	y2Format(v) {
		return _getFormat(this, "y2", v);
	},
	/**
	* Get default value format function
	* @returns {function} formatter function
	* @private
	*/
	getDefaultValueFormat() {
		const $$ = this;
		const { defaultArcValueFormat, yFormat, y2Format } = $$;
		const hasArc = $$.hasArcType(null, [
			"gauge",
			"polar",
			"radar"
		]);
		return function(v, ratio, id) {
			return (hasArc ? defaultArcValueFormat : $$.axis && $$.axis.getId(id) === "y2" ? y2Format : yFormat).call($$, v, ratio);
		};
	},
	defaultValueFormat(v) {
		return isArray(v) ? v.join("~") : isValue(v) ? +v : "";
	},
	defaultArcValueFormat(v, ratio) {
		return `${(ratio * 100).toFixed(1)}%`;
	},
	defaultPolarValueFormat(v) {
		return `${v}`;
	},
	dataLabelFormat(targetId) {
		const $$ = this;
		const dataLabels = $$.config.data_labels;
		const defaultFormat = (v) => {
			const delimiter = "~";
			let res = v;
			if (isArray(v)) res = v.join(delimiter);
			else if (isObject(v)) res = Object.values(v).join(delimiter);
			return res;
		};
		let format = defaultFormat;
		if (isFunction(dataLabels.format)) format = dataLabels.format;
		else if (isObjectType(dataLabels.format)) {
			if (dataLabels.format[targetId]) format = dataLabels.format[targetId] === true ? defaultFormat : dataLabels.format[targetId];
			else format = () => "";
		}
		return format.bind($$.api);
	}
};
//#endregion
export { format_default as default };
