/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @see https://datatracker.ietf.org/doc/html/rfc4180
 */
const QUOTE = 34; // "
const NEWLINE = 10; // \n
const RETURN = 13; // \r

type RowCallback<T> = (row: string[], index: number) => T | undefined | null;
type ObjectCallback<T> = (d: Record<string, string>, index: number, columns: string[]) => T;

/**
 * Create a DSV parser for the specified delimiter.
 * @param {string} delimiter The delimiter character
 * @returns {object} DSV parser object with parse and parseRows methods
 * @private
 */
function dsv(delimiter: string) {
	const delimiterCode = delimiter.charCodeAt(0);

	/**
	 * Parse DSV string into rows of string arrays.
	 * @param {string} text DSV string to parse
	 * @param {function} [callback] Optional row callback
	 * @returns {Array} Parsed rows
	 * @private
	 */
	function parseRows<T = string[]>(text: string, callback?: RowCallback<T>): T[] {
		const rows: T[] = [];
		let len = text.length;
		let pos = 0;
		let rowNum = 0;
		let eof = len <= 0;
		let eol = false;

		// Strip BOM
		text.charCodeAt(0) === 0xfeff && pos++;

		// Strip trailing newline
		text.charCodeAt(len - 1) === NEWLINE && --len;
		text.charCodeAt(len - 1) === RETURN && --len;

		/**
		 * Get next token from DSV string.
		 * @returns {string|null} Next field value, or null for EOL/EOF
		 */
		function token(): string | null {
			if (eof) {
				return null;
			}

			if (eol) {
				eol = false;
				return null;
			}

			const start = pos;
			let c: number, end: number;

			// Quoted value
			if (text.charCodeAt(start) === QUOTE) {
				while (++pos < len) {
					if (text.charCodeAt(pos) === QUOTE) {
						if (text.charCodeAt(pos + 1) !== QUOTE) {
							break;
						}

						pos++;
					}
				}

				if ((end = pos++) >= len) {
					eof = true;
				} else if ((c = text.charCodeAt(pos++)) === NEWLINE) {
					eol = true;
				} else if (c === RETURN) {
					eol = true;
					text.charCodeAt(pos) === NEWLINE && ++pos;
				}

				return text.slice(start + 1, end).replace(/""/g, "\"");
			}

			// Unquoted value
			while (pos < len) {
				if ((c = text.charCodeAt(end = pos++)) === NEWLINE) {
					eol = true;
				} else if (c === RETURN) {
					eol = true;
					text.charCodeAt(pos) === NEWLINE && ++pos;
				} else if (c !== delimiterCode) {
					continue;
				}

				return text.slice(start, end);
			}

			eof = true;

			return text.slice(start, len);
		}

		let t: string | null;

		while ((t = token()) !== null) {
			const row: string[] = [];

			while (t !== null) {
				row.push(t);
				t = token();
			}

			if (callback) {
				const result = callback(row, rowNum++);

				result != null && rows.push(result);
			} else {
				rows.push(row as T);
			}
		}

		return rows;
	}

	/**
	 * Parse DSV string into array of objects using first row as headers.
	 * @param {string} text DSV string to parse
	 * @param {function} [callback] Optional row callback
	 * @returns {Array} Array of objects
	 * @private
	 */
	function parse<T = Record<string, string>>(text: string, callback?: ObjectCallback<T>): T[] {
		let columns: string[] = [];

		return parseRows(text, (row, i) => {
			if (i === 0) {
				columns = row;
				return null;
			}

			const obj: Record<string, string> = {};

			for (let j = 0; j < columns.length; j++) {
				obj[columns[j]] = row[j] ?? "";
			}

			return callback ? callback(obj, i - 1, columns) : obj as T;
		});
	}

	return {parse, parseRows};
}

const csv = dsv(",");
const tsv = dsv("\t");

export const csvParse = csv.parse;
export const csvParseRows = csv.parseRows;
export const tsvParse = tsv.parse;
export const tsvParseRows = tsv.parseRows;
