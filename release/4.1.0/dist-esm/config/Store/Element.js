/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 4.1.0
*/
//#region src/config/Store/Element.ts
/**
* Elements class.
* @class Elements
* @ignore
* @private
*/
var Element = class {
	constructor() {
		return {
			chart: null,
			main: null,
			svg: null,
			axis: {
				x: null,
				y: null,
				y2: null,
				subX: null,
				subY: null,
				subY2: null
			},
			axisTooltip: {
				x: null,
				y: null,
				y2: null
			},
			defs: null,
			tooltip: null,
			legend: null,
			title: null,
			subchart: {
				main: null,
				bar: null,
				line: null,
				area: null
			},
			arcs: null,
			bar: null,
			candlestick: null,
			line: null,
			area: null,
			circle: null,
			radar: null,
			text: null,
			grid: {
				main: null,
				x: null,
				y: null
			},
			gridLines: {
				main: null,
				x: null,
				y: null
			},
			region: {
				main: null,
				list: null
			},
			eventRect: null,
			zoomResetBtn: null
		};
	}
};
//#endregion
export { Element as default };
