/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../ChartInternal/ChartInternal";

/**
 * What the module of a chart type of its own adds to the chart.
 * - hooks: how the shared code works with the type (labels, tooltip)
 * - canvas: how the type is drawn on canvas (`draw`, `hits`) and styled (`theme`)
 * @private
 */
export interface ICustomTypeParts {
	hooks?: Record<string, any>;
	canvas?: {draw?: (renderer) => void, hits?: (detector) => void, theme?: Record<string, any>};
}

/**
 * Register the parts of a chart type of its own module, by the name of the type.
 * The parts of a type are kept apart from those of the others, so a bundle can have more than one
 * of these modules. Registering a name again adds to what is there: the svg part and the canvas
 * part of a type are registered by their own resolvers.
 * @param {string} name Chart type name
 * @param {object} parts Parts of the type
 * @private
 */
export function registerCustomType(name: string, parts: ICustomTypeParts): void {
	const proto: any = ChartInternal.prototype;
	const types = proto.customTypes || (proto.customTypes = {});

	types[name] = {...types[name], ...parts};
}
