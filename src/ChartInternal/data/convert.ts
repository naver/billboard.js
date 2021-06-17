/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import {
	csvParse as d3CsvParse,
	tsvParse as d3TsvParse,
	csvParseRows as d3CsvParseRows,
	tsvParseRows as d3TsvParseRows,
} from "d3-dsv";
import {isUndefined, isDefined, isObject, isValue, notEmpty, isArray, capitalize} from "../../module/util";

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
	 * @returns {object}
	 * @private
	 */
	convertData(args, callback: Function): object {
		let data;

		if (args.bindto) {
			data = {};

			["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"]
				.forEach(v => {
					const key = `data_${v}`;

					if (key in args) {
						data[v] = args[key];
					}
				});
		} else {
			data = args;
		}

		if (data.url && callback) {
			this.convertUrlToData(data.url, data.mimeType, data.headers, data.keys, callback);
		} else if (data.json) {
			data = this.convertJsonToData(data.json, data.keys);
		} else if (data.rows) {
			data = this.convertRowsToData(data.rows);
		} else if (data.columns) {
			data = this.convertColumnsToData(data.columns);
		} else if (args.bindto) {
			throw Error("url or json or rows or columns is required.");
		}

		return isArray(data) && data;
	},

	/**
	 * Convert URL data
	 * @param {string} url Remote URL
	 * @param {string} mimeType MIME type string: json | csv | tsv
	 * @param {object} headers Header object
	 * @param {object} keys Key object
	 * @param {Function} done Callback function
	 * @private
	 */
	convertUrlToData(url: string, mimeType = "csv", headers: object, keys: object, done: Function): void {
		const req = new XMLHttpRequest();

		req.open("GET", url);

		if (headers) {
			Object.keys(headers).forEach(key => {
				req.setRequestHeader(key, headers[key]);
			});
		}

		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				if (req.status === 200) {
					const response = req.responseText;

					response && done.call(this,
						this[`convert${capitalize(mimeType)}ToData`](
							mimeType === "json" ? JSON.parse(response) : response,
							keys
						));
				} else {
					throw new Error(`${url}: Something went wrong loading!`);
				}
			}
		};

		req.send();
	},

	/**
	 * Convert CSV/TSV data
	 * @param {object} parser Parser object
	 * @param {object} xsv Data
	 * @private
	 * @returns {object}
	 */
	convertCsvTsvToData(parser, xsv) {
		const rows = parser.rows(xsv);
		let d;

		if (rows.length === 1) {
			d = [{}];

			rows[0].forEach(id => {
				d[0][id] = null;
			});
		} else {
			d = parser.parse(xsv);
		}

		return d;
	},

	convertCsvToData(xsv) {
		return this.convertCsvTsvToData({
			rows: d3CsvParseRows,
			parse: d3CsvParse
		}, xsv);
	},

	convertTsvToData(tsv) {
		return this.convertCsvTsvToData({
			rows: d3TsvParseRows,
			parse: d3TsvParse
		}, tsv);
	},

	convertJsonToData(json, keysParam) {
		const {config} = this;
		const newRows: string[][] = [];
		let targetKeys: string[];
		let data;

		if (isArray(json)) {
			const keys = keysParam || config.data_keys;

			if (keys.x) {
				targetKeys = keys.value.concat(keys.x);
				config.data_x = keys.x;
			} else {
				targetKeys = keys.value;
			}

			newRows.push(targetKeys);

			json.forEach(o => {
				const newRow = targetKeys.map(key => {
					// convert undefined to null because undefined data will be removed in convertDataToTargets()
					let v = this.findValueInJson(o, key);

					if (isUndefined(v)) {
						v = null;
					}

					return v;
				});

				newRows.push(newRow);
			});

			data = this.convertRowsToData(newRows);
		} else {
			Object.keys(json).forEach(key => {
				const tmp = json[key].concat();

				tmp.unshift(key);
				newRows.push(tmp);
			});

			data = this.convertColumnsToData(newRows);
		}

		return data;
	},

	findValueInJson(object, path) {
		if (object[path] !== undefined) {
			return object[path];
		}

		const convertedPath = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties (replace [] with .)
		const pathArray = convertedPath.replace(/^\./, "").split("."); // strip a leading dot
		let target = object;

		pathArray.some(k => !(
			target = target && k in target ?
				target[k] : undefined
		));

		return target;
	},

	convertRowsToData(rows) {
		const keys = rows[0];
		const newRows: any[] = [];

		rows.forEach((row, i) => {
			if (i > 0) {
				const newRow = {};

				row.forEach((v, j) => {
					if (isUndefined(v)) {
						throw new Error(`Source data is missing a component at (${i}, ${j})!`);
					}

					newRow[keys[j]] = v;
				});

				newRows.push(newRow);
			}
		});

		return newRows;
	},

	convertColumnsToData(columns) {
		const newRows: any[] = [];

		columns.forEach((col, i) => {
			const key = col[0];

			col.forEach((v, j) => {
				if (j > 0) {
					if (isUndefined(newRows[j - 1])) {
						newRows[j - 1] = {};
					}

					if (isUndefined(v)) {
						throw new Error(`Source data is missing a component at (${i}, ${j})!`);
					}

					newRows[j - 1][key] = v;
				}
			});
		});

		return newRows;
	},

	convertDataToTargets(data, appendXs) {
		const $$ = this;
		const {axis, config, state} = $$;
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

					return {x, value, id: convertedId};
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
			$$.data.xs[t.id].sort((v1, v2) => v1 - v2);
		});

		// cache information about values
		state.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
		state.hasPositiveValue = $$.hasPositiveValueInTargets(targets);

		// set target types
		if (config.data_type) {
			$$.setTargetType($$.mapToIds(targets)
				.filter(id => !(id in config.data_types)), config.data_type);
		}

		// cache as original id keyed
		targets.forEach(d => $$.cache.add(d.id_org, d, true));

		return targets;
	}
};
