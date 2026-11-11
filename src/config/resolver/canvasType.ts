/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import ChartInternal from "../../ChartInternal/ChartInternal";

/**
 * What the module of a chart type adds to the canvas drawing of the chart.
 * Unlike a custom type (one at most for a chart), more of these can be active in a chart:
 * the parts of every type the chart has are used.
 * The functions are called with the chart (ChartInternal) as `this`.
 * @private
 */
export interface ICanvasTypeParts {
	// the type is the whole chart: it is drawn and hit alone, and nothing else is (treemap)
	exclusive?: boolean;
	// draw the type: renderer is the CanvasRenderer
	draw?: (renderer, shape?, focusData?) => void;
	// add the hit items of the type: detector is the HitDetector
	hits?: (detector) => void;
}

/**
 * Register the canvas parts of a chart type, by the name of the type.
 * The parts of a type are kept apart from those of the others, so a bundle has the canvas code
 * of the types it imports only. Registering a name again adds to what is there.
 * @param {string} name Chart type name
 * @param {object} parts Canvas parts of the type
 * @private
 */
export function registerCanvasType(name: string, parts: ICanvasTypeParts): void {
	const proto: any = ChartInternal.prototype;
	const types = proto.canvasTypes || (proto.canvasTypes = {});

	types[name] = {...types[name], ...parts};
}
