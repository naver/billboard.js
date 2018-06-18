/**
 * Copyright (c) 2017 NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "./ChartInternal";
import {isValue, isFunction, isObjectType, extend} from "./util";

const getFormat = ($$, typeValue, v) => {
	const config = $$.config;
	const type = `axis_${typeValue}_tick_format`;
	const format = config[type] ?
		config[type] : $$.defaultValueFormat;

	return format(v);
};

extend(ChartInternal.prototype, {
	getYFormat(forArc) {
		const $$ = this;
		let formatForY = $$.yFormat;
		let formatForY2 = $$.y2Format;

		if (forArc && !$$.hasType("gauge")) {
			formatForY = $$.defaultArcValueFormat;
			formatForY2 = $$.defaultArcValueFormat;
		}

		return function(v, ratio, id) {
			const format = $$.axis.getId(id) === "y2" ?
				formatForY2 : formatForY;

			return format.call($$, v, ratio);
		};
	},

	yFormat(v) {
		return getFormat(this, "y", v);
	},

	y2Format(v) {
		return getFormat(this, "y2", v);
	},

	defaultValueFormat(v) {
		return isValue(v) ? +v : "";
	},

	defaultArcValueFormat(v, ratio) {
		return `${(ratio * 100).toFixed(1)}%`;
	},

	dataLabelFormat(targetId) {
		const $$ = this;
		const dataLabels = $$.config.data_labels;
		const defaultFormat = v => (isValue(v) ? +v : "");
		let format = defaultFormat;

		// find format according to axis id
		if (isFunction(dataLabels.format)) {
			format = dataLabels.format;
		} else if (isObjectType(dataLabels.format)) {
			if (dataLabels.format[targetId]) {
				format = dataLabels.format[targetId] === true ? defaultFormat : dataLabels.format[targetId];
			} else {
				format = () => "";
			}
		}

		return format;
	}
});
