/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	isArray,
	isDefined,
	isEmpty,
	isObject,
	isUndefined,
	isValue,
	notEmpty,
	toSet
} from "../../module/util";
import {runWorker} from "../../module/worker";
import type {IData} from "../data/IData";
import {columns, json, rows, url} from "./convert.helper";

/**
 * Get data key for JSON
 * @param {string|object} keysParam Key params
 * @param {object} config Config object
 * @returns {string} Data key
 * @private
 */
function _getDataKeyForJson(keysParam, config) {
	const keys = keysParam || config?.data_keys;

	if (keys?.x) {
		config.data_x = keys.x;
	}

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
function _setXS(
	ids: string[],
	data: {[key: string]: number | null}[],
	params: {appendXs, xs, categorized: boolean, timeSeries: boolean, customX: boolean}
): void {
	const $$ = this;
	const {config} = $$;
	let xsData;

	ids.forEach(id => {
		const xKey = $$.getXKey(id);

		if (params.customX || params.timeSeries) {
			// if included in input data
			if (params.xs.indexOf(xKey) >= 0) {
				xsData = ((params.appendXs && $$.data.xs[id]) || [])
					.concat(
						data.map((d, i) => {
							const rawX = isValue(d[xKey]);
							return rawX ? $$.generateTargetX(rawX, id, i) : false;
						}).filter(v => v !== false)
					);
			} else if (config.data_x) {
				// if not included in input data, find from preloaded data of other id's x
				xsData = this.getOtherTargetXs();
			} else if (notEmpty(config.data_xs)) {
				// if not included in input data, find from preloaded data
				xsData = $$.getXValuesOfXKey(xKey, $$.data.targets);
			}
			// MEMO: if no x included, use same x of current will be used
		} else {
			xsData = data.map((d, i) => i);
		}

		if (xsData) {
			$$.data.xs[id] = xsData;
		} else {
			throw new Error(`x is not defined for id = "${id}".`);
		}
	});
}

/**
 * Data convert
 * @memberof ChartInternal
 * @private
 */
export default {
	/**
	 * Convert data according its type
	 * @param {object} args data object
	 * @param {function} [callback] callback for url(XHR) type loading
	 * @private
	 */
	convertData(args, callback: Function): void {
		const {config} = this;
		const useWorker = d => d?.length && !isEmpty(d[0]) ? config.boost_useWorker : false;
		let data = args;

		if (args.bindto) {
			data = {};

			["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"]
				.forEach(v => {
					const key = `data_${v}`;

					if (key in args) {
						data[v] = args[key];
					}
				});
		}

		if (data.url && callback) {
			url(data.url, data.mimeType, data.headers, _getDataKeyForJson(data.keys, config),
				callback);
		} else if (data.json) {
			runWorker(useWorker(data.json), json, callback, [columns, rows])(
				data.json,
				_getDataKeyForJson(data.keys, config)
			);
		} else if (data.rows) {
			runWorker(useWorker(data.rows), rows, callback)(data.rows);
		} else if (data.columns) {
			runWorker(useWorker(data.columns), columns, callback)(data.columns);
		} else if (args.bindto) {
			throw Error("url or json or rows or columns is required.");
		}
	},

	/**
	 * Convert data to targets
	 * @param {object[]} data Data to convert
	 * @param {boolean} appendXs Whether to append xs
	 * @returns {IData[]} Converted targets
	 * @private
	 */
	convertDataToTargets(data: {[key: string]: number | null}[], appendXs: boolean): IData[] {
		const $$ = this;
		const {axis, config, state} = $$;
		const chartType = config.data_type;
		const dataKeys = Object.keys(data[0] || {});

		// Extract ids and xs from data keys to handle x and non-x values
		const {ids, xs} = dataKeys.length ?
			dataKeys.reduce((acc, key) => {
				if ($$.isX.call($$, key)) {
					acc.xs.push(key);
				} else if ($$.isNotX.call($$, key)) {
					acc.ids.push(key);
				}

				return acc;
			}, {ids: [] as string[], xs: [] as string[]}) :
			{ids: [], xs: []};

		const params = {
			appendXs,
			xs,
			idConverter: config.data_idConverter.bind($$.api),
			categorized: axis?.isCategorized(),
			timeSeries: axis?.isTimeSeries(),
			customX: axis?.isCustomX()
		};

		// save x for update data by load when custom x and bb.x API
		_setXS.bind($$)(ids, data, params);

		// convert to target
		const targets = ids.map((id, index) => {
			const convertedId = config.data_idConverter.bind($$.api)(id);
			const xKey = $$.getXKey(id);
			const isCategory = params.customX && params.categorized;
			const hasCategory = isCategory && (() => {
				const categorySet = toSet(config.axis_x_categories);
				return data.every(v => categorySet.has(v.x));
			})();

			// when .load() with 'append' option is used for indexed axis
			// @ts-ignore
			const isDataAppend = data.__append__;
			const xIndex = xKey === null && isDataAppend ? $$.api.data.values(id).length : 0;

			return {
				id: convertedId,
				id_org: id,
				values: data.map((d, i) => {
					const rawX = d[xKey];
					let value = d[id];
					let x;

					value = value !== null && !isNaN(value) && !isObject(value) ?
						+value :
						(isArray(value) || isObject(value) ? value : null);

					// use x as categories if custom x and categorized
					if ((isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX)) {
						if (!hasCategory && index === 0 && i === 0 && !isDataAppend) {
							config.axis_x_categories = [];
						}

						x = config.axis_x_categories.indexOf(rawX);

						if (x === -1) {
							x = config.axis_x_categories.length;
							config.axis_x_categories.push(rawX);
						}
					} else {
						x = $$.generateTargetX(rawX, id, xIndex + i);
					}

					// mark as x = undefined if value is undefined and filter to remove after mapped
					if (isUndefined(value) || $$.data.xs[id].length <= i) {
						x = undefined;
					}

					return {
						x,
						value,
						id: convertedId,
						index: -1
					};
				}).filter(v => isDefined(v.x))
			};
		});

		// finish targets
		targets.forEach(t => {
			// sort values by its x
			if (config.data_xSort) {
				t.values = t.values.sort((v1, v2) => {
					const x1 = v1.x || v1.x === 0 ? v1.x : Infinity;
					const x2 = v2.x || v2.x === 0 ? v2.x : Infinity;

					return x1 - x2;
				});
			}

			// indexing each value
			t.values.forEach((v, i) => (v.index = i));

			// this needs to be sorted because its index and value.index is identical
			$$.data.xs[t.id]?.sort((v1, v2) => v1 - v2);
		});

		// cache information about values
		state.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
		state.hasPositiveValue = $$.hasPositiveValueInTargets(targets);

		// set target types
		if (chartType && $$.isValidChartType(chartType)) {
			const targetIds = $$.mapToIds(targets)
				.filter(id =>
					!(id in config.data_types) || !$$.isValidChartType(config.data_types[id])
				);

			$$.setTargetType(targetIds, chartType);
		}

		// cache as original id keyed
		targets.forEach(d => $$.cache.add(d.id_org, d, true));

		return targets as IData[];
	}
};
