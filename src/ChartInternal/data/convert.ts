/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {isUndefined, isDefined, isObject, isValue, notEmpty, isArray} from "../../module/util";
import {runWorker} from "../../module/worker";
import {columns, json, rows, url} from "./convert.helper";
import type {IData} from "../data/IData";

/**
 * Get data key for JSON
 * @param {string|object} keysParam Key params
 * @param {object} config Config object
 * @returns {string} Data key
 * @private
 */
function getDataKeyForJson(keysParam, config) {
	const keys = keysParam || config?.data_keys;

	if (keys?.x) {
		config.data_x = keys.x;
	}

	return keys;
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
	 * @param {Function} [callback] callback for url(XHR) type loading
	 * @private
	 */
	convertData(args, callback: Function): void {
		const {config} = this;
		const useWorker = config.boost_useWorker;
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
			url(data.url, data.mimeType, data.headers,
				getDataKeyForJson(data.keys, config),
				callback
			);
		} else if (data.json) {
			runWorker(useWorker, json, callback, [columns, rows])(
				data.json,
				getDataKeyForJson(data.keys, config)
			);
		} else if (data.rows) {
			runWorker(useWorker, rows, callback)(data.rows);
		} else if (data.columns) {
			runWorker(useWorker, columns, callback)(data.columns);
		} else if (args.bindto) {
			throw Error("url or json or rows or columns is required.");
		}
	},

	convertDataToTargets(data: {[key:string]: number|null}[], appendXs: boolean): IData[] {
		const $$ = this;
		const {axis, config, state} = $$;
		const chartType = config.data_type;
		let isCategorized = false;
		let isTimeSeries = false;
		let isCustomX = false;

		if (axis) {
			isCategorized = axis.isCategorized();
			isTimeSeries = axis.isTimeSeries();
			isCustomX = axis.isCustomX();
		}

		const dataKeys = Object.keys(data[0] || {});
		const ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [];
		const xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];

		let xsData;

		// save x for update data by load when custom x and bb.x API
		ids.forEach(id => {
			const xKey = this.getXKey(id);

			if (isCustomX || isTimeSeries) {
				// if included in input data
				if (xs.indexOf(xKey) >= 0) {
					xsData = ((appendXs && $$.data.xs[id]) || [])
						.concat(
							data.map(d => d[xKey])
								.filter(isValue)
								.map((rawX, i) => $$.generateTargetX(rawX, id, i))
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

			xsData && (this.data.xs[id] = xsData);
		});

		// check x is defined
		ids.forEach(id => {
			if (!this.data.xs[id]) {
				throw new Error(`x is not defined for id = "${id}".`);
			}
		});

		// convert to target
		const targets = ids.map((id, index) => {
			const convertedId = config.data_idConverter.bind($$.api)(id);
			const xKey = $$.getXKey(id);
			const isCategory = isCustomX && isCategorized;
			const hasCategory = isCategory && data.map(v => v.x)
				.every(v => config.axis_x_categories.indexOf(v) > -1);

			// when .load() with 'append' option is used for indexed axis
			// @ts-ignore
			const isDataAppend = data.__append__;
			const xIndex = xKey === null && isDataAppend ?
				$$.api.data.values(id).length : 0;

			return {
				id: convertedId,
				id_org: id,
				values: data.map((d, i) => {
					const rawX = d[xKey];
					let value = d[id];
					let x;

					value = value !== null && !isNaN(value) && !isObject(value) ?
						+value : (isArray(value) || isObject(value) ? value : null);

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
				.filter(id => !(id in config.data_types) || !$$.isValidChartType(config.data_types[id]));

			$$.setTargetType(targetIds, chartType);
		}

		// cache as original id keyed
		targets.forEach(d => $$.cache.add(d.id_org, d, true));

		return targets as IData[];
	}
};
