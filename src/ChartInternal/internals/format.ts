/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isValue, isFunction, isObjectType} from "../../module/util";

function getFormat($$, typeValue, v) {
	const {config} = $$;
	const type = `axis_${typeValue}_tick_format`;
	const format = config[type] ?
		config[type] : $$.defaultValueFormat;

	return format(v);
}

export default {
	getYFormat(forArc) {
		const $$ = this;
		let {yFormat, y2Format} = $$;

		if (forArc && !$$.hasType("gauge")) {
			yFormat = $$.defaultArcValueFormat;
			y2Format = $$.defaultArcValueFormat;
		}

		return function(v, ratio, id) {
			const format = $$.axis && $$.axis.getId(id) === "y2" ?
				y2Format : yFormat;

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
				format = dataLabels.format[targetId] === true ?
					defaultFormat : dataLabels.format[targetId];
			} else {
				format = () => "";
			}
		}

		return format;
	}
};
