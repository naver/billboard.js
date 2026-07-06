/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.0.2
*/
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @see https://datatracker.ietf.org/doc/html/rfc4180
 */
const QUOTE = 34; // "
const NEWLINE = 10; // \n
const RETURN = 13; // \r
/**
 * Create a DSV parser for the specified delimiter.
 * @param {string} delimiter The delimiter character
 * @returns {object} DSV parser object with parse and parseRows methods
 * @private
 */
function dsv(delimiter) {
    const delimiterCode = delimiter.charCodeAt(0);
    /**
     * Parse DSV string into rows of string arrays.
     * @param {string} text DSV string to parse
     * @param {function} [callback] Optional row callback
     * @returns {Array} Parsed rows
     * @private
     */
    function parseRows(text, callback) {
        const rows = [];
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
        function token() {
            if (eof) {
                return null;
            }
            if (eol) {
                eol = false;
                return null;
            }
            const start = pos;
            let c, end;
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
                }
                else if ((c = text.charCodeAt(pos++)) === NEWLINE) {
                    eol = true;
                }
                else if (c === RETURN) {
                    eol = true;
                    text.charCodeAt(pos) === NEWLINE && ++pos;
                }
                return text.slice(start + 1, end).replace(/""/g, "\"");
            }
            // Unquoted value
            while (pos < len) {
                if ((c = text.charCodeAt(end = pos++)) === NEWLINE) {
                    eol = true;
                }
                else if (c === RETURN) {
                    eol = true;
                    text.charCodeAt(pos) === NEWLINE && ++pos;
                }
                else if (c !== delimiterCode) {
                    continue;
                }
                return text.slice(start, end);
            }
            eof = true;
            return text.slice(start, len);
        }
        let t;
        while ((t = token()) !== null) {
            const row = [];
            while (t !== null) {
                row.push(t);
                t = token();
            }
            if (callback) {
                const result = callback(row, rowNum++);
                result != null && rows.push(result);
            }
            else {
                rows.push(row);
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
    function parse(text, callback) {
        let columns = [];
        return parseRows(text, (row, i) => {
            if (i === 0) {
                columns = row;
                return null;
            }
            const obj = {};
            for (let j = 0; j < columns.length; j++) {
                obj[columns[j]] = row[j] ?? "";
            }
            return callback ? callback(obj, i - 1, columns) : obj;
        });
    }
    return { parse, parseRows };
}
const csv = dsv(",");
const tsv = dsv("\t");
const csvParse = csv.parse;
const csvParseRows = csv.parseRows;
const tsvParse = tsv.parse;
const tsvParseRows = tsv.parseRows;

export { csvParse, csvParseRows, tsvParse, tsvParseRows };
