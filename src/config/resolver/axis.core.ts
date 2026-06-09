/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../../Chart/Chart";
import ChartInternal from "../../ChartInternal/ChartInternal";
import {extend} from "../../module/util";
import Options from "../Options/Options";
import {api as axisAPI, internal as axisInternal, options as axisOptions} from "./axis";

/**
 * Get object values without requiring Object.values().
 * @param {object} obj Source object
 * @returns {Array} Object values
 * @private
 */
function getValues(obj): any[] {
	return Object.keys(obj).map(key => obj[key]);
}

/**
 * Extend shared axis modules without importing renderer-specific shape modules.
 * @param {Array} module Internal modules
 * @param {Array} option Option modules
 * @private
 */
export function extendAxisModules(module: any[] = [], option: any[] = []): void {
	extend(ChartInternal.prototype, getValues(axisInternal).concat(module));
	extend(Chart.prototype, axisAPI);
	Options.setOptions(getValues(axisOptions).concat(option));
}
