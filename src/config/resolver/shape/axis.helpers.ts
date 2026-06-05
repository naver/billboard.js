/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import shapePointCommon from "../../../ChartInternal/shape/core/point";
import shapeLine from "../../../ChartInternal/shape/line";
import shapePoint from "../../../ChartInternal/shape/point";
import optPoint from "../../Options/common/point";
import optLine from "../../Options/shape/line";
import {extendAxisModules} from "../axis.core";

type ModuleValue = any | any[];

/**
 * Extend Axis
 * @param {Array<object>} module Module to be extended
 * @param {Array<object>} option Option object to be extended
 * @private
 */
export function extendAxis(module: any[] = [], option: any[] = []): void {
	extendAxisModules(module, option);
}

/**
 * Extend Line type modules
 * @param {object|Array<object>} module Module to be extended
 * @param {Array<object>} option Option object to be extended
 * @private
 */
export function extendLine(module?: ModuleValue, option: any[] = []): void {
	const modules = Array.isArray(module) ? module : (module ? [module] : []);

	extendAxisModules(
		[shapePointCommon, shapePoint, shapeLine].concat(modules),
		[optPoint, optLine].concat(option)
	);
}
