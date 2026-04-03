/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../../ChartInternal/ChartInternal";
import shapeArc from "../../../ChartInternal/shape/arc";
import shapePointCommon from "../../../ChartInternal/shape/point.common";
import {extend} from "../../../module/util";
import optPoint from "../../Options/common/point";
import Options from "../../Options/Options";

/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
export function extendArc(module?, option?): void {
	extend(ChartInternal.prototype, [shapeArc, shapePointCommon].concat(module || []));
	Options.setOptions([optPoint].concat(option || []));
}
