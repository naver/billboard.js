/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
import { isArray, isDefined, isEmpty, isObject, isUndefined, isValue, notEmpty } from "../../module/util/type-checks.js";
import { toSet } from "../../module/util/object.js";
import { runWorker } from "../../module/worker.js";
import { columns, json, rows, url } from "./convert.helper.js";
//#region src/ChartInternal/data/convert.ts
/**
* Copyright (c) 2017 ~ present NAVER Corp.
* billboard.js project is licensed under the MIT license
*/
/**
* Cell count from which `boost.useWorker: "auto"` offloads conversion.
*
* Below this, structured cloning the payload to the worker and back costs more
* than the parsing it saves.
* @private
*/
const WORKER_CELL_THRESHOLD = 5e3;
/**
* Estimate the number of data cells to be converted.
* @param {Array} data Raw json(array form)/rows/columns data
* @returns {number} Approximate cell count
* @private
*/
function _getCellCount(data) {
	const first = data[0];
	if (isArray(first)) {
		let count = 0;
		for (let i = 0, len = data.length; i < len; i++) count += data[i]?.length ?? 0;
		return count;
	}
	return data.length * Object.keys(first ?? {}).length;
}
/**
* Get data key for JSON
* @param {string|object} keysParam Key params
* @param {object} config Config object
* @returns {string} Data key
* @private
*/
function _getDataKeyForJson(keysParam, config) {
	const keys = keysParam || config?.data_keys;
	if (keys?.x) config.data_x = keys.x;
	return keys;
}
/**
* Set `xs` for each id
* @param {string[]} ids Ids to set xs
* @param {object[]} data Data to set xs from
* @param {object} params Parameters for setting xs
* @param {boolean} params.appendXs Whether to append xs
* @param {string[]} params.xs X keys to set xs from
* @param {boolean} params.categorized Whether the axis is categorized
* @param {boolean} params.timeSeries Whether the axis is time series
* @param {boolean} params.customX Whether the x is custom
* @private
*/
function _setXS(ids, data, params) {
	const $$ = this;
	const { config } = $$;
	let xsData;
	ids.forEach((id) => {
		const xKey = $$.getXKey(id);
		if (params.customX || params.timeSeries) {
			if (params.xs.indexOf(xKey) >= 0) xsData = (params.appendXs && $$.data.xs[id] || []).concat(data.map((d, i) => {
				const rawX = d[xKey];
				return isValue(rawX) ? $$.generateTargetX(rawX, id, i) : false;
			}).filter((v) => v !== false));
			else if (config.data_x) xsData = this.getOtherTargetXs();
			else if (notEmpty(config.data_xs)) xsData = $$.getXValuesOfXKey(xKey, $$.data.targets);
		} else xsData = data.map((d, i) => i);
		if (xsData) $$.data.xs[id] = xsData;
		else throw new Error(`x is not defined for id = "${id}".`);
	});
}
/**
* Data convert
* @memberof ChartInternal
* @private
*/
var convert_default = {
	/**
	* Convert data according its type
	* @param {object} args data object
	* @param {function} [callback] callback for url(XHR) type loading
	* @private
	*/
	convertData(args, callback) {
		const { config } = this;
		const useWorker = (d) => {
			if (!d?.length || isEmpty(d[0])) return false;
			return config.boost_useWorker === "auto" ? _getCellCount(d) >= WORKER_CELL_THRESHOLD : !!config.boost_useWorker;
		};
		const workerOptions = config.boost_workerUrl ? { workerUrl: config.boost_workerUrl } : void 0;
		let data = args;
		if (args.bindto) {
			data = {};
			[
				"url",
				"mimeType",
				"headers",
				"keys",
				"json",
				"rows",
				"columns"
			].forEach((v) => {
				const key = `data_${v}`;
				if (key in args) data[v] = args[key];
			});
		}
		if (data.url && callback) url(data.url, data.mimeType, data.headers, _getDataKeyForJson(data.keys, config), callback);
		else if (data.json) runWorker(useWorker(data.json), "json", json, callback, workerOptions)(data.json, _getDataKeyForJson(data.keys, config));
		else if (data.rows) runWorker(useWorker(data.rows), "rows", rows, callback, workerOptions)(data.rows);
		else if (data.columns) runWorker(useWorker(data.columns), "columns", columns, callback, workerOptions)(data.columns);
		else if (args.bindto) throw Error("url or json or rows or columns is required.");
	},
	/**
	* Convert data to targets
	* @param {object[]} data Data to convert
	* @param {boolean} appendXs Whether to append xs
	* @returns {IData[]} Converted targets
	* @private
	*/
	convertDataToTargets(data, appendXs) {
		const $$ = this;
		const { axis, config, state } = $$;
		const chartType = config.data_type;
		const dataKeys = Object.keys(data[0] || {});
		const { ids, xs } = dataKeys.length ? dataKeys.reduce((acc, key) => {
			if ($$.isX.call($$, key)) acc.xs.push(key);
			else acc.ids.push(key);
			return acc;
		}, {
			ids: [],
			xs: []
		}) : {
			ids: [],
			xs: []
		};
		const params = {
			appendXs,
			xs,
			categorized: axis?.isCategorized(),
			timeSeries: axis?.isTimeSeries(),
			customX: axis?.isCustomX()
		};
		_setXS.bind($$)(ids, data, params);
		const categoryIndexMap = params.customX && params.categorized && config.axis_x_categories.length ? new Map(config.axis_x_categories.map((cat, i) => [cat, i])) : null;
		const idConverter = config.data_idConverter.bind($$.api);
		const targets = ids.map((id, index) => {
			const convertedId = idConverter(id);
			const xKey = $$.getXKey(id);
			const isCategory = params.customX && params.categorized;
			const hasCategory = isCategory && index === 0 && (() => {
				const categorySet = toSet(config.axis_x_categories);
				return data.every((v) => categorySet.has(v[xKey]));
			})();
			const isDataAppend = data.__append__;
			const xIndex = xKey === null && isDataAppend ? $$.api.data.values(id).length : 0;
			return {
				id: convertedId,
				id_org: id,
				values: data.map((d, i) => {
					const rawX = d[xKey];
					let value = d[id];
					let x;
					value = value !== null && !isNaN(value) && !isObject(value) ? +value : isArray(value) || isObject(value) ? value : null;
					if ((isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX)) {
						if (!hasCategory && i === 0 && !isDataAppend) {
							config.axis_x_categories = [];
							if (categoryIndexMap) categoryIndexMap.clear();
						}
						const rawXStr = String(rawX);
						x = categoryIndexMap?.get(rawXStr) ?? -1;
						if (x === -1) {
							x = config.axis_x_categories.length;
							config.axis_x_categories.push(rawX);
							categoryIndexMap?.set(rawXStr, x);
						}
					} else x = $$.generateTargetX(rawX, id, xIndex + i);
					if (isUndefined(value) || $$.data.xs[id].length <= i) x = void 0;
					return {
						x,
						value,
						id: convertedId,
						index: -1
					};
				}).filter((v) => isDefined(v.x))
			};
		});
		targets.forEach((t) => {
			if (config.data_xSort) t.values = t.values.sort((v1, v2) => {
				return (v1.x || v1.x === 0 ? v1.x : Infinity) - (v2.x || v2.x === 0 ? v2.x : Infinity);
			});
			t.values.forEach((v, i) => v.index = i);
			$$.data.xs[t.id]?.sort((v1, v2) => v1 - v2);
		});
		state.hasNegativeValue = targets.some((t) => t.values.some((v) => v.value !== null && v.value < 0));
		state.hasPositiveValue = targets.some((t) => t.values.some((v) => v.value !== null && v.value > 0));
		if (chartType && $$.isValidChartType(chartType)) {
			const targetIds = $$.mapToIds(targets).filter((id) => !(id in config.data_types) || !$$.isValidChartType(config.data_types[id]));
			$$.setTargetType(targetIds, chartType);
		}
		targets.forEach((d) => $$.cache.add(d.id_org, d, true));
		return targets;
	}
};
//#endregion
export { convert_default as default };
