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
import ChartInternal from "../internals/ChartInternal";
import {isUndefined, isDefined, isObject, isValue, notEmpty, extend, isArray, capitalize} from "../internals/util";

/**
 * Convert CSV/TSV data
 * @param {Object} parser Parser object
 * @param {Object} xsv Data
 * @private
 * @return {Object}
 */
const convertCsvTsvToData = (parser, xsv) => {
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
};

extend(ChartInternal.prototype, {
	/**
	 * Convert data according its type
	 * @param {Object} args data object
	 * @param {Function} [callback] callback for url(XHR) type loading
	 * @return {Object}
	 * @private
	 */
	convertData(args, callback) {
		const $$ = this;
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
			$$.convertUrlToData(data.url, data.mimeType, data.headers, data.keys, callback);
		} else if (data.json) {
			data = $$.convertJsonToData(data.json, data.keys);
		} else if (data.rows) {
			data = $$.convertRowsToData(data.rows);
		} else if (data.columns) {
			data = $$.convertColumnsToData(data.columns);
		} else if (args.bindto) {
			throw Error("url or json or rows or columns is required.");
		}

		return isArray(data) && data;
	},

	/**
	 * Convert URL data
	 * @param {String} url Remote URL
	 * @param {String} mimeType MIME type string: json | csv | tsv
	 * @param {Object} headers Header object
	 * @param {Object} keys Key object
	 * @param {Function} done Callback function
	 * @private
	 */
	convertUrlToData(url, mimeType = "csv", headers, keys, done) {
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

	convertCsvToData(xsv) {
		return convertCsvTsvToData({
			rows: d3CsvParseRows,
			parse: d3CsvParse
		}, xsv);
	},

	convertTsvToData(tsv) {
		return convertCsvTsvToData({
			rows: d3TsvParseRows,
			parse: d3TsvParse
		}, tsv);
	},

	convertJsonToData(json, keysParam) {
		const config = this.config;
		const newRows = [];
		let targetKeys;
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
		const newRows = [];

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
		const newRows = [];

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
		const config = $$.config;
		const isTimeSeries = $$.isTimeSeries();

		const dataKeys = Object.keys(data[0] || {});
		const ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [];
		const xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];

		let xsData;

		// save x for update data by load when custom x and bb.x API
		ids.forEach(id => {
			const xKey = this.getXKey(id);

			if (this.isCustomX() || isTimeSeries) {
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
			const convertedId = config.data_idConverter(id);
			const xKey = $$.getXKey(id);
			const isCategorized = $$.isCustomX() && $$.isCategorized();
			const hasCategory = isCategorized && data.map(v => v.x)
				.every(v => config.axis_x_categories.indexOf(v) > -1);

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
					if (isCategorized && index === 0 && !isUndefined(rawX)) {
						if (!hasCategory && index === 0 && i === 0) {
							config.axis_x_categories = [];
						}

						x = config.axis_x_categories.indexOf(rawX);

						if (x === -1) {
							x = config.axis_x_categories.length;
							config.axis_x_categories.push(rawX);
						}
					} else {
						x = $$.generateTargetX(rawX, id, i);
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
		$$.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
		$$.hasPositiveValue = $$.hasPositiveValueInTargets(targets);

		// set target types
		if (config.data_type) {
			$$.setTargetType($$.mapToIds(targets)
				.filter(id => !(id in config.data_types)), config.data_type);
		}

		// cache as original id keyed
		targets.forEach(d => $$.addCache(d.id_org, d, true));

		return targets;
	}
});
