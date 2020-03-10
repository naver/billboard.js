/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
export default class state {
	constructor() {
		return {
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
			currentWidth: 0,
			currentHeight: 0,

			currentData: {
				max: 0
			},

			hasAxis: false,
			hasRadar: false,

			// legend
			isLegendRight: false,
			isLegendInset: false,
			isLegendTop: false,
			isLegendLeft: false,
			legendStep: 0,
			legendItemWidth: 0,
			legendItemHeight: 0,
			legendHasRendered: false,

			axis: {
				x: {
					padding: {left: 0, right: 0},
					tickCount: 0
				}
			},

			currentMaxTickWidths: {
				x: {size: 0, ticks: [], clipPath: 0, domain: ""},
				y: {size: 0, domain: ""},
				y2: {size: 0, domain: ""}
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
				pathGrid: ""
			},

			// status
			dragStart: null,
			dragging: false,
			flowing: false,
			cancelClick: false,
			mouseover: false,
			rendered: false,
			transiting: false,
			hasNegativeValue: false,
			hasPositiveValue: true,

			orgAreaOpacity: "0.2",

			// ID strings
			hiddenTargetIds: [],
			hiddenLegendIds: [],
			focusedTargetIds: [],
			defocusedTargetIds: [],

			// value for Arc
			radius: 0,
			innerRadius: 0,
			innerRadiusRatio: 0,
			gaugeArcWidth: 0,
			radiusExpanded: 0,

			// xgrid attribute
			xgridAttr: {
				x1: null,
				x2: null,
				y1: null,
				y2: null
			}
		};
	}
}
