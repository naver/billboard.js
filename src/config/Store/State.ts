/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * State class.
 * @class State
 * @ignore
 * @private
 */
export default class State {
	constructor() {
		return {
			// chart drawn area dimension, excluding axes
			width: 0,
			width2: 0,
			height: 0,
			height2: 0,
			margin: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			margin2: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			margin3: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			},
			arcWidth: 0,
			arcHeight: 0,
			xAxisHeight: 0,

			hasAxis: false,
			hasRadar: false,
			hasTreemap: false,

			// for data CSS rule index (used when boost.useCssRule is true)
			cssRule: {},

			current: {
				// chart whole dimension
				width: 0,
				height: 0,
				dataMax: 0,

				maxTickWidths: {
					x: {size: 0, ticks: <number[]> [], clipPath: 0, domain: ""},
					y: {size: 0, domain: ""},
					y2: {size: 0, domain: ""}
				},

				// current used chart type list
				types: <string[]> [],
			},

			// legend
			isLegendRight: false,
			isLegendInset: false,
			isLegendTop: false,
			isLegendLeft: false,
			legendStep: 0,
			legendItemWidth: 0,
			legendItemHeight: 0,
			legendHasRendered: false,

			eventReceiver: {
				currentIdx: -1, // current event interaction index
				rect: {}, // event rect's clientBoundingRect
				data: [], // event data bound of previoous eventRect
				coords: [] // coordination value of previous eventRect
			},

			axis: {
				x: {
					padding: {left: 0, right: 0},
					tickCount: 0
				}
			},

			rotatedPadding: {
				left: 30,
				right: 0,
				top: 5
			},

			withoutFadeIn: {},
			inputType: "",

			datetimeId: "",

			// clip id string
			clip: {
				id: "",
				idXAxis: "",
				idYAxis: "",
				idXAxisTickTexts: "",
				idGrid: "",
				idSubchart: "", // clipIdForSubchart
				path: "",
				pathXAxis: "",
				pathYAxis: "",
				pathXAxisTickTexts: "",
				pathGrid: ""
			},

			// status
			event: null, // event object
			dragStart: null,
			dragging: false,
			flowing: false,
			cancelClick: false,
			mouseover: false,
			rendered: false,
			transiting: false,
			redrawing: false, // if redraw() is on process
			resizing: false, // resize event called
			toggling: false, // legend toggle
			zooming: false,
			hasNegativeValue: false,
			hasPositiveValue: true,

			orgAreaOpacity: "0.2",
			orgConfig: {}, // user original genration config

			// ID strings
			hiddenTargetIds: <string[]> [],
			hiddenLegendIds: <string[]> [],
			focusedTargetIds: <string[]> [],
			defocusedTargetIds: <string[]> [],

			// value for Arc
			radius: 0,
			innerRadius: <{[key: string]: number}|number> 0,
			outerRadius: <{[key: string]: number}|number|undefined> undefined,
			innerRadiusRatio: 0,
			gaugeArcWidth: 0,
			radiusExpanded: 0,

			// xgrid attribute
			xgridAttr: {
				x1: <number | null> null,
				x2: <number | null> null,
				y1: <number | null> null,
				y2: <number | null> null
			}
		};
	}
}
