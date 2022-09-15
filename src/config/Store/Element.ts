/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import type {d3Selection} from "../../../types/types";

type T = d3Selection | null;

/**
 * Elements class.
 * @class Elements
 * @ignore
 * @private
 */
export default class Element {
	constructor() {
		const element: {
			[key: string]: T | {[key: string]: T}
		} = {
			chart: null,
			main: null,
			svg: null,
			axis: { // axes
				x: null,
				y: null,
				y2: null,
				subX: null
			},
			defs: null,
			tooltip: null,
			legend: null,
			title: null,
			subchart: {
				main: null, // $$.context
				bar: null, // $$.contextBar
				line: null, // $$.contextLine
				area: null // $$.contextArea
			},

			arcs: null,
			bar: null, // mainBar,
			candlestick: null,
			line: null, // mainLine,
			area: null, // mainArea,
			circle: null, // mainCircle,
			radar: null,
			text: null, // mainText,
			grid: {
				main: null, // grid (also focus)
				x: null, // xgrid,
				y: null, // ygrid,
			},
			gridLines: {
				main: null, // gridLines
				x: null, // xgridLines,
				y: null, // ygridLines
			},
			region: {
				main: null, // region
				list: null // mainRegion
			},
			eventRect: null,
			zoomResetBtn: null // drag zoom reset button
		};

		return element;
	}
}
