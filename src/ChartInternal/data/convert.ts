/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {TYPE} from "../../config/const";
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
 * Cell count from which `boost.useWorker: "auto"` offloads conversion.
 *
 * Below this, structured cloning the payload to the worker and back costs more
 * than the parsing it saves.
 * @private
 */
const WORKER_CELL_THRESHOLD = 5000;

/**
 * Chart types whose rows can be thinned out without changing what they show.
 * @private
 */
const DOWNSAMPLE_TYPES: string[] = [
	TYPE.LINE,
	TYPE.SPLINE,
	TYPE.STEP,
	TYPE.AREA,
	TYPE.AREA_SPLINE,
	TYPE.AREA_STEP,
	TYPE.SCATTER
];

/**
 * Select rows with the Largest-Triangle-Three-Buckets algorithm over all series at once.
 * x is the row index. The area of a triangle is the sum of each series' area, scaled by
 * the value range of that series, so that every series has the same weight.
 * @param {Array} ys Values of each series (null allowed)
 * @param {number} threshold Number of rows to select
 * @returns {number[]} Selected indices in ascending order
 * @private
 */
function _lttb(ys: (number | null)[][], threshold: number): number[] {
	const len = ys[0].length;
	const bucketSize = (len - 2) / (threshold - 2);
	const scales = ys.map(y => {
		let min = Infinity;
		let max = -Infinity;

		y.forEach(v => {
			if (v !== null) {
				min = Math.min(min, v);
				max = Math.max(max, v);
			}
		});

		return max > min ? 1 / (max - min) : 1;
	});
	const picked = [0];
	let a = 0;

	for (let b = 0; b < threshold - 2; b++) {
		// average of the next bucket
		const nextStart = Math.floor((b + 1) * bucketSize) + 1;
		const nextEnd = Math.min(Math.floor((b + 2) * bucketSize) + 1, len);
		const count = nextEnd - nextStart;
		const avgX = (nextStart + nextEnd - 1) / 2;
		const avgY = ys.map(y => {
			let sum = 0;

			for (let i = nextStart; i < nextEnd; i++) {
				sum += y[i] ?? 0;
			}

			return sum / count;
		});

		// the row of the current bucket making the largest triangle
		const start = Math.floor(b * bucketSize) + 1;
		let maxArea = -1;
		let maxIndex = start;

		for (let i = start; i < nextStart; i++) {
			let area = 0;

			for (let k = 0; k < ys.length; k++) {
				const y = ys[k];
				const ya = y[a] ?? 0;

				area += Math.abs(
					(a - avgX) * ((y[i] ?? 0) - ya) - (a - i) * (avgY[k] - ya)
				) * scales[k];
			}

			if (area > maxArea) {
				maxArea = area;
				maxIndex = i;
			}
		}

		picked.push(maxIndex);
		a = maxIndex;
	}

	picked.push(len - 1);

	return picked;
}

/**
 * Select rows to keep by LTTB, keeping series aligned on the same rows.
 * Every kept row keeps the original value of every series. Rows where a series
 * enters or leaves null are kept in addition, to preserve gaps.
 * @param {object[]} data Rows
 * @param {string[]} ids Series ids
 * @param {number} threshold Maximum number of rows to keep
 * @returns {number[]|null} Indices of the rows to keep, or null when they can't be reduced
 * @private
 */
function _downsample(
	data: Record<string, any>[],
	ids: string[],
	threshold: number
): number[] | null {
	const len = data.length;

	if (threshold < 3 || len <= threshold || !ids.length) {
		return null;
	}

	const keep = new Uint8Array(len);
	const ys: (number | null)[][] = [];

	for (const id of ids) {
		const y: (number | null)[] = new Array(len);

		for (let i = 0; i < len; i++) {
			const v = data[i][id];

			if (v !== null && v !== undefined && typeof v !== "number") {
				return null;
			}

			y[i] = v ?? null;

			if (i && (y[i] === null) !== (y[i - 1] === null)) {
				keep[i] = keep[i - 1] = 1;
			}
		}

		ys.push(y);
	}

	// rows null in every series are kept only where a gap starts or ends (above)
	_lttb(ys, threshold).forEach(i => ys.some(y => y[i] !== null) && (keep[i] = 1));

	return Array.from({length: len}, (_, i) => i).filter(i => keep[i]);
}

/**
 * Estimate the number of data cells to be converted.
 * @param {Array} data Raw json(array form)/rows/columns data
 * @returns {number} Approximate cell count
 * @private
 */
function _getCellCount(data): number {
	const first = data[0];

	// rows/columns: array of arrays
	if (isArray(first)) {
		let count = 0;

		for (let i = 0, len = data.length; i < len; i++) {
			count += data[i]?.length ?? 0;
		}

		return count;
	}

	// json: array of objects
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
 * @param {(i: number) => number} params.rowIndex Position of a row in the original rows
 * @param {boolean} params.appendXs Whether to append xs
 * @param {string[]} params.xs X keys to set xs from
 * @param {boolean} params.categorized Whether the axis is categorized
 * @param {boolean} params.timeSeries Whether the axis is time series
 * @param {boolean} params.customX Whether the x is custom
 * @private
 */
function _setXS(
	ids: string[],
	data: Record<string, number | null>[],
	params: {
		rowIndex: (i: number) => number,
		appendXs,
		xs,
		categorized: boolean,
		timeSeries: boolean,
		customX: boolean
	}
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
							const rawX = d[xKey];
							return isValue(rawX) ?
								$$.generateTargetX(rawX, id, params.rowIndex(i)) :
								false;
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
			xsData = data.map((d, i) => params.rowIndex(i));
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
		const useWorker = d => {
			if (!d?.length || isEmpty(d[0])) {
				return false;
			}

			// "auto": offloading small payloads costs more in structured cloning than
			// it saves, so only hand over datasets past the threshold
			return config.boost_useWorker === "auto" ?
				_getCellCount(d) >= WORKER_CELL_THRESHOLD :
				!!config.boost_useWorker;
		};
		const workerOptions = config.boost_workerUrl ?
			{
				workerUrl: config.boost_workerUrl
			} :
			undefined;
		let data = args;

		if (args.bindto) {
			data = {};

			["url", "mimeType", "headers", "keys", "json", "rows", "columns"]
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
			runWorker(useWorker(data.json), "json", json, callback, workerOptions)(
				data.json,
				_getDataKeyForJson(data.keys, config)
			);
		} else if (data.rows) {
			runWorker(useWorker(data.rows), "rows", rows, callback, workerOptions)(data.rows);
		} else if (data.columns) {
			runWorker(useWorker(data.columns), "columns", columns, callback, workerOptions)(
				data.columns
			);
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
	convertDataToTargets(data: Record<string, number | null>[], appendXs: boolean): IData[] {
		const $$ = this;
		const {axis, config, state} = $$;
		const chartType = config.data_type;
		const dataKeys = Object.keys(data[0] || {});

		// Extract ids and xs from data keys to handle x and non-x values
		const {ids, xs} = dataKeys.length ?
			dataKeys.reduce((acc, key) => {
				if ($$.isX.call($$, key)) {
					acc.xs.push(key);
				} else {
					acc.ids.push(key);
				}

				return acc;
			}, {ids: [] as string[], xs: [] as string[]}) :
			{ids: [], xs: []};

		// thin out dense rows for lineish types, when series share the same x
		let rowIndex = (i: number): number => i;
		const downsample = config.data_downsample;

		if (
			downsample && !appendXs && !(data as any).__append__ && xs.length < 2 &&
			[chartType, ...Object.values(config.data_types)].every(v =>
				!v || DOWNSAMPLE_TYPES.includes(v)
			)
		) {
			const kept = _downsample(data, ids, downsample);

			if (kept) {
				// x of an indexed axis is the position in the original rows
				rowIndex = i => kept[i];
				data = kept.map(i => data[i]);
			}
		}

		const params = {
			rowIndex,
			appendXs,
			xs,
			categorized: axis?.isCategorized(),
			timeSeries: axis?.isTimeSeries(),
			customX: axis?.isCustomX()
		};

		// save x for update data by load when custom x and bb.x API
		_setXS.bind($$)(ids, data, params);

		// Build a Map for O(1) category-to-index lookups
		const categoryIndexMap =
			(params.customX && params.categorized && config.axis_x_categories.length) ?
				new Map<string, number>(config.axis_x_categories.map((cat, i) => [cat, i])) :
				null;

		// convert to target
		const idConverter = config.data_idConverter.bind($$.api);
		const targets = ids.map((id, index) => {
			const convertedId = idConverter(id);
			const xKey = $$.getXKey(id);
			const isCategory = params.customX && params.categorized;
			const hasCategory = isCategory && index === 0 && (() => {
				const categorySet = toSet(config.axis_x_categories);
				return data.every(v => categorySet.has(v[xKey]));
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
						if (!hasCategory && i === 0 && !isDataAppend) {
							config.axis_x_categories = [];

							if (categoryIndexMap) {
								categoryIndexMap.clear();
							}
						}

						const rawXStr = String(rawX);

						x = categoryIndexMap?.get(rawXStr) ?? -1;

						if (x === -1) {
							x = config.axis_x_categories.length;
							config.axis_x_categories.push(rawX);
							categoryIndexMap?.set(rawXStr, x);
						}
					} else {
						x = $$.generateTargetX(rawX, id, xIndex + rowIndex(i));
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
		state.hasNegativeValue = targets.some(t =>
			t.values.some(v => v.value !== null && v.value < 0)
		);
		state.hasPositiveValue = targets.some(t =>
			t.values.some(v => v.value !== null && v.value > 0)
		);

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
