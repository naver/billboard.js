/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/* eslint-disable */
import {
	csvParse as d3CsvParse,
	tsvParse as d3TsvParse,
	csvParseRows as d3CsvParseRows,
	tsvParseRows as d3TsvParseRows,
} from "d3-dsv";

export {columns, json, jsonTreemap, rows, url, csv, tsv};

/***** Functions to be executed on Web Worker *****
 * NOTE: Don't allowed to use
 * - arrow function syntax
 * - Utils functions
 */
/**
 * Convert Columns data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function columns(columns) {
	const newRows: any[] = [];

	columns.forEach(function(col, i) {
		const key = col[0];

		col.forEach(function(v, j) {
			if (j > 0) {
				if (typeof newRows[j - 1] === "undefined") {
					newRows[j - 1] = {};
				}

				if (typeof v === "undefined") {
					throw new Error(`Source data is missing a component at (${i}, ${j})!`);
				}

				newRows[j - 1][key] = v;
			}
		});
	});

	return newRows;
}

/**
 * Convert Rows data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function rows(rows) {
	const keys = rows[0];
	const newRows: any[] = [];

	rows.forEach(function(row, i) {
		if (i > 0) {
			const newRow = {};

			row.forEach(function(v, j) {
				if (typeof v === "undefined") {
					throw new Error(`Source data is missing a component at (${i}, ${j})!`);
				}

				newRow[keys[j]] = v;
			});

			newRows.push(newRow);
		}
	});

	return newRows;
}

/**
 * Convert JSON data
 * @param {object} columns
 * @returns {Array}
 * @private
 */
function json(json, keysParam) {
    const newRows: string[][] = [];
    let targetKeys: string[];
    let data;

    if (Array.isArray(json)) {
		const findValueInJson = function(object, path) {
			if (object[path] !== undefined) {
				return object[path];
			}
	
			const convertedPath = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties (replace [] with .)
			const pathArray = convertedPath.replace(/^\./, "").split("."); // strip a leading dot
			let target = object;
	
			pathArray.some(function(k) {
				return !(
					target = target && k in target ?
						target[k] : undefined
				);
			});
	
			return target;
		};

        if (keysParam.x) {
            targetKeys = keysParam.value.concat(keysParam.x);
        } else {
            targetKeys = keysParam.value;
        }

        newRows.push(targetKeys);

        json.forEach(function(o) {
            const newRow = targetKeys.map(function(key) {
                // convert undefined to null because undefined data will be removed in convertDataToTargets()
                let v = findValueInJson(o, key);

                if (typeof v === "undefined") {
                    v = null;
                }

                return v;
            });

            newRows.push(newRow);
        });

        data = rows(newRows);
    } else {
        Object.keys(json).forEach(function(key) {
            const tmp = json[key].concat();

            tmp.unshift?.(key);
            newRows.push(tmp);
        });

        data = columns(newRows);
    }

    return data;
}

function jsonTreemap(json) {
	const convertKey = v => {
		if (v.children) {
			v.children.forEach(convertKey);
		}

		v.name = v.id;
	}

	json.forEach(convertKey);

	return json;
}

/***** Functions can't be executed on Web Worker *****/
/**
 * Convert URL data
 * @param {string} url Remote URL
 * @param {string} mimeType MIME type string: json | csv | tsv
 * @param {object} headers Header object
 * @param {object} keys Key object
 * @param {Function} done Callback function
 * @private
 */
function url(url: string, mimeType = "csv", headers: object, keys: object, done: Function): void {
    const req = new XMLHttpRequest();
    const converter = {csv, tsv, json};

    req.open("GET", url);

    if (headers) {
        Object.keys(headers).forEach(function(key) {
            req.setRequestHeader(key, headers[key]);
        });
    }

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const response = req.responseText;

				response && done.call(this,
					converter[mimeType](
						mimeType === "json" ? JSON.parse(response) : response,
						keys
					));
            } else {
                throw new Error(`${url}: Something went wrong loading!`);
            }
        }
    };

    req.send();
}

/**
 * Convert CSV/TSV data
 * @param {object} parser Parser object
 * @param {object} xsv Data
 * @returns {object}
 * @private
 */
 function convertCsvTsvToData(parser, xsv) {
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
}

function csv(xsv) {
	return convertCsvTsvToData({
		rows: d3CsvParseRows,
		parse: d3CsvParse
	}, xsv);
}

function tsv(tsv) {
	return convertCsvTsvToData({
		rows: d3TsvParseRows,
		parse: d3TsvParse
	}, tsv);
}
