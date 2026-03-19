/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import Chart from "../../../Chart/Chart";
import ChartInternal from "../../../ChartInternal/ChartInternal";
import shapeLine from "../../../ChartInternal/shape/line";
import shapePoint from "../../../ChartInternal/shape/point";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {extend} from "../../../module/util";
import optPoint from "../../Options/common/point";
import Options from "../../Options/Options";
import optLine from "../../Options/shape/line";
import {api as axisAPI, internal as axisInternal, options as axisOptions} from "../axis";

/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
export function extendAxis(module, option?): void {
	extend(ChartInternal.prototype, Object.values(axisInternal).concat(module));
	extend(Chart.prototype, axisAPI);
	Options.setOptions(Object.values(axisOptions).concat(option || []));
}

/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
export function extendLine(module?, option?): void {
	extendAxis([shapePointCommon, shapePoint, shapeLine].concat(module || []));
	Options.setOptions([optPoint, optLine].concat(option || []));
}
