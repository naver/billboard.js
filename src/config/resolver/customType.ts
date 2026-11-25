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

/**
 * Register a chart type of its own module that is drawn on the axes (the type of the chart
 * keeps its axes, unlike the types of registerCustomType()).
 * The shared code reaches the type by name: the lists of shapes of the axes, the hit of the
 * pointer (`hit`) and the rows of the tooltip (`tooltipRows`).
 * @param {string} name Chart type name
 * @param {object} parts Hooks of the type
 * @param {boolean} parts.padded Whether the x axis gets the room of a bar at each end
 * @param {function} parts.domainValues Get the values of a data row that the y domain has to cover
 * @param {function} parts.hit Get the selector of the shape of a data row, to check the pointer on it
 * @param {function} parts.tooltipRows Get the [name, value] pairs of a data row
 * @param {object} parts.canvas Canvas parts of the type
 * @param {function} parts.canvas.draw Draw the shapes of the type
 * @param {function} parts.canvas.hits Add the hit items of the shapes
 * @param {function} parts.canvas.theme Get the canvas theme of the type
 * @private
 */
export function registerAxisType(
	name: string,
	parts: {
		padded?: boolean,
		domainValues?: ($$, row) => number[],
		hit?: ($$, d) => string,
		tooltipRows?: ($$, row, format, param) => string[][],
		canvas?: {
			draw?: (renderer, shape) => void,
			hits?: (detector, context) => void,
			theme?: Record<string, any>
		}
	}
): void {
	const proto: any = ChartInternal.prototype;
	const types = proto.axisTypes || (proto.axisTypes = {});

	types[name] = {...types[name], ...parts};
}
