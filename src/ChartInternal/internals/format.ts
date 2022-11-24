/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isValue, isFunction, isObjectType} from "../../module/util";
import type {AxisType} from "../../../types/types";

/**
 * Get formatted
 * @param {object} $$ Context
 * @param {string} typeValue Axis type
 * @param {number} v Value to be formatted
 * @returns {number | string}
 * @private
 */
function getFormat($$, typeValue: AxisType, v: number): number | string {
	const {config} = $$;
	const type = `axis_${typeValue}_tick_format`;
	const format = config[type] ?
		config[type] : $$.defaultValueFormat;

	return format.call($$.api, v);
}

export default {
	yFormat(v: number): number | string {
		return getFormat(this, "y", v);
	},

	y2Format(v: number): number | string {
		return getFormat(this, "y2", v);
	},

	/**
	 * Get default value format function
	 * @returns {Function} formatter function
	 * @private
	 */
	getDefaultValueFormat(): Function {
		const $$ = this;
		const {defaultArcValueFormat, yFormat, y2Format} = $$;
		const hasArc = $$.hasArcType(null, ["gauge", "polar", "radar"]);

		return function(v, ratio, id) {
			const format = hasArc ? defaultArcValueFormat : (
				$$.axis && $$.axis.getId(id) === "y2" ? y2Format : yFormat
			);

			return format.call($$, v, ratio);
		};
	},

	defaultValueFormat(v): number|string {
		return isValue(v) ? +v : "";
	},

	defaultArcValueFormat(v, ratio): string {
		return `${(ratio * 100).toFixed(1)}%`;
	},

	defaultPolarValueFormat(v): string {
		return `${v}`;
	},

	dataLabelFormat(targetId: string): Function {
		const $$ = this;
		const dataLabels = $$.config.data_labels;
		const defaultFormat = v => (isValue(v) ? +v : "");
		let format = defaultFormat;

		// find format according to axis id
		if (isFunction(dataLabels.format)) {
			format = dataLabels.format;
		} else if (isObjectType(dataLabels.format)) {
			if (dataLabels.format[targetId]) {
				format = dataLabels.format[targetId] === true ?
					defaultFormat : dataLabels.format[targetId];
			} else {
				format = () => "";
			}
		}

		return format.bind($$.api);
	}
};
